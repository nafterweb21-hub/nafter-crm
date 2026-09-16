import { db } from "@/lib/db";
import { WhatsAPI } from "@/lib/whatsapi";
import { MetaWhatsApp } from "@/lib/whatsapp-meta";

export async function getActiveIntegration() {
    const integrations = await db.integration.findMany({ where: { status: "connected" } });
    return integrations.find((i) => i.provider === "WHATSAPI") ?? integrations.find((i) => i.provider === "META") ?? null;
}

export async function sendOutboundMessage(phone: string, name: string | undefined, text: string) {
    const lead = await db.lead.upsert({
        where: { phone },
        create: { phone, name, source: "manual" },
        update: name ? { name } : {},
    });

    const integration = await getActiveIntegration();

    let conversation = await db.conversation.findFirst({ where: { leadId: lead.id } });
    if (!conversation) {
        conversation = await db.conversation.create({ data: { leadId: lead.id, provider: integration?.provider ?? "WHATSAPI" } });
    }

    let sendResult: { success: boolean; error?: unknown } = { success: false, error: "No connected WhatsApp integration" };

    if (integration?.provider === "WHATSAPI") {
        const client = new WhatsAPI(integration.baseUrl ?? undefined, integration.instanceId ?? undefined, integration.token ?? undefined);
        const result = await client.sendMessage({ number: phone, message: text });
        sendResult = { success: result.success, error: result.success ? undefined : result.data ?? result.error };
    } else if (integration?.provider === "META") {
        const client = new MetaWhatsApp(integration.accessToken ?? undefined, integration.phoneNumberId ?? undefined);
        const result = await client.sendTextMessage({ to: phone, text });
        sendResult = { success: result.success, error: result.success ? undefined : result.data ?? result.error };
    }

    const message = await db.message.create({
        data: {
            conversationId: conversation.id,
            direction: "outbound",
            text,
            status: sendResult.success ? "sent" : "failed",
        },
    });

    await db.conversation.update({ where: { id: conversation.id }, data: { lastMessageAt: new Date() } });

    return { message, lead, conversation, delivered: sendResult.success, error: sendResult.error };
}

export async function recordInboundMessage(phone: string, text: string, provider: "WHATSAPI" | "META", name?: string) {
    const lead = await db.lead.upsert({
        where: { phone },
        create: { phone, name, source: provider === "WHATSAPI" ? "whatsapi_webhook" : "whatsapp_webhook" },
        update: {},
    });

    let conversation = await db.conversation.findFirst({ where: { leadId: lead.id } });
    if (!conversation) {
        conversation = await db.conversation.create({ data: { leadId: lead.id, provider } });
    }

    const message = await db.message.create({
        data: {
            conversationId: conversation.id,
            direction: "inbound",
            text,
            status: "delivered",
        },
    });

    await db.conversation.update({ where: { id: conversation.id }, data: { lastMessageAt: new Date() } });

    return { message, lead, conversation };
}
