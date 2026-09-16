import path from "node:path";
import makeWASocket, { useMultiFileAuthState as loadMultiFileAuthState, DisconnectReason, type WASocket } from "baileys";
import { Boom } from "@hapi/boom";
import QRCode from "qrcode";
import { db } from "@/lib/db";
import { recordInboundMessage } from "@/lib/messaging";

export type BridgeStatus = "idle" | "connecting" | "qr" | "connected" | "error";

interface BridgeState {
    socket: WASocket | null;
    status: BridgeStatus;
    qr: string | null;
    error: string | null;
    starting: boolean;
}

const globalForBridge = globalThis as unknown as { whatsapiBridge?: BridgeState };

const state: BridgeState = globalForBridge.whatsapiBridge ?? {
    socket: null,
    status: "idle",
    qr: null,
    error: null,
    starting: false,
};
globalForBridge.whatsapiBridge = state;

const AUTH_DIR = path.join(process.cwd(), "whatsapi-auth");

export function getBridgeState() {
    return { status: state.status, qr: state.qr, error: state.error };
}

async function markDbStatus(status: "connected" | "disconnected" | "error", error?: string) {
    await db.integration.upsert({
        where: { provider: "WHATSAPI" },
        create: { provider: "WHATSAPI", status, lastCheckedAt: new Date(), lastError: error ?? null },
        update: { status, lastCheckedAt: new Date(), lastError: error ?? null },
    });
}

export async function startBridge() {
    if (state.starting || state.status === "connected") return getBridgeState();
    state.starting = true;
    state.error = null;

    try {
        const { state: authState, saveCreds } = await loadMultiFileAuthState(AUTH_DIR);
        const socket = makeWASocket({ auth: authState });
        state.socket = socket;
        state.status = "connecting";

        socket.ev.on("creds.update", saveCreds);

        socket.ev.on("connection.update", async (update) => {
            const { connection, lastDisconnect, qr } = update;

            if (qr) {
                state.qr = await QRCode.toDataURL(qr);
                state.status = "qr";
            }

            if (connection === "open") {
                state.status = "connected";
                state.qr = null;
                await markDbStatus("connected");
            }

            if (connection === "close") {
                const statusCode = (lastDisconnect?.error as Boom | undefined)?.output?.statusCode;
                if (statusCode === DisconnectReason.loggedOut) {
                    state.status = "idle";
                    state.socket = null;
                    state.qr = null;
                    await markDbStatus("disconnected");
                } else {
                    state.status = "connecting";
                    state.starting = false;
                    startBridge();
                }
            }
        });

        socket.ev.on("messages.upsert", async ({ messages }) => {
            for (const msg of messages) {
                if (msg.key.fromMe) continue;
                const jid = msg.key.remoteJid;
                if (!jid || jid.endsWith("@g.us")) continue;

                const text =
                    msg.message?.conversation ||
                    msg.message?.extendedTextMessage?.text ||
                    "";
                if (!text) continue;

                const phone = jid.split("@")[0];
                const name = msg.pushName || undefined;
                await recordInboundMessage(phone, text, "WHATSAPI", name);
            }
        });
    } catch (err) {
        state.status = "error";
        state.error = String(err);
        await markDbStatus("error", state.error);
    } finally {
        state.starting = false;
    }

    return getBridgeState();
}

export async function sendViaBridge(phone: string, text: string) {
    if (!state.socket || state.status !== "connected") {
        return { success: false, error: "WhatsAPI bridge is not connected. Scan the QR code in Settings first." };
    }

    const jid = `${phone.replace(/[^0-9]/g, "")}@s.whatsapp.net`;
    try {
        await state.socket.sendMessage(jid, { text });
        return { success: true };
    } catch (err) {
        return { success: false, error: String(err) };
    }
}

export async function logoutBridge() {
    if (state.socket) {
        try {
            await state.socket.logout();
        } catch {
            // ignore — socket may already be closed
        }
    }
    state.socket = null;
    state.status = "idle";
    state.qr = null;
    await markDbStatus("disconnected");
}
