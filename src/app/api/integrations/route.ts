import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { WhatsAPI } from "@/lib/whatsapi";
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

    if (provider !== "WHATSAPI" && provider !== "META") {
        return NextResponse.json({ error: "Invalid provider" }, { status: 400 });
    }

    let verifyResult: { success: boolean; error?: unknown };

    if (provider === "WHATSAPI") {
        const { baseUrl, instanceId, token } = body;
        if (!instanceId || !token) {
            return NextResponse.json({ error: "Instance ID and Token are required" }, { status: 400 });
        }
        const client = new WhatsAPI(baseUrl, instanceId, token);
        const status = await client.getStatus(instanceId, token);
        verifyResult = { success: status?.success !== false, error: status?.success === false ? status.error : undefined };

        const integration = await db.integration.upsert({
            where: { provider: "WHATSAPI" },
            create: {
                provider: "WHATSAPI",
                baseUrl,
                instanceId,
                token,
                status: verifyResult.success ? "connected" : "error",
                lastCheckedAt: new Date(),
                lastError: verifyResult.success ? null : String(verifyResult.error ?? "Connection failed"),
            },
            update: {
                baseUrl,
                instanceId,
                token,
                status: verifyResult.success ? "connected" : "error",
                lastCheckedAt: new Date(),
                lastError: verifyResult.success ? null : String(verifyResult.error ?? "Connection failed"),
            },
        });

        return NextResponse.json({ integration: { ...integration, token: "••••••••" }, verified: verifyResult.success });
    }

    // META
    const { accessToken, phoneNumberId } = body;
    if (!accessToken || !phoneNumberId) {
        return NextResponse.json({ error: "Access Token and Phone Number ID are required" }, { status: 400 });
    }
    const result = await metaWhatsApp.verify(accessToken, phoneNumberId);
    verifyResult = { success: result.success, error: result.success ? undefined : (result.data ?? result.error) };

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
