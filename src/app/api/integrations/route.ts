import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { metaWhatsApp } from "@/lib/whatsapp-meta";

export async function GET() {
    const integrations = await db.integration.findMany();
    const redacted = integrations.map((i) => ({
        ...i,
        token: i.token ? "••••••••" : null,
        accessToken: i.accessToken ? "••••••••" : null,
    }));
    return NextResponse.json({ integrations: redacted });
}

export async function POST(req: Request) {
    const body = await req.json();
    const { provider } = body;

    if (provider !== "META") {
        return NextResponse.json({ error: "Invalid provider. WhatsAPI connects via /api/whatsapi/connect (QR pairing)." }, { status: 400 });
    }

    // META
    const { accessToken, phoneNumberId } = body;
    if (!accessToken || !phoneNumberId) {
        return NextResponse.json({ error: "Access Token and Phone Number ID are required" }, { status: 400 });
    }
    const result = await metaWhatsApp.verify(accessToken, phoneNumberId);
    const verifyResult = { success: result.success, error: result.success ? undefined : (result.data ?? result.error) };

    const integration = await db.integration.upsert({
        where: { provider: "META" },
        create: {
            provider: "META",
            accessToken,
            phoneNumberId,
            status: verifyResult.success ? "connected" : "error",
            lastCheckedAt: new Date(),
            lastError: verifyResult.success ? null : JSON.stringify(verifyResult.error ?? "Connection failed"),
        },
        update: {
            accessToken,
            phoneNumberId,
            status: verifyResult.success ? "connected" : "error",
            lastCheckedAt: new Date(),
            lastError: verifyResult.success ? null : JSON.stringify(verifyResult.error ?? "Connection failed"),
        },
    });

    return NextResponse.json({ integration: { ...integration, accessToken: "••••••••" }, verified: verifyResult.success });
}
