import { NextResponse } from "next/server";
import { recordInboundMessage } from "@/lib/messaging";

/**
 * WhatsAPI Unofficial Gateway Webhook Handler
 */

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Standard unofficial gateway payload often includes data in 'data' or 'payload'
        const payload = body.data || body.payload || body;

        console.log("🌐 WhatsAPI Webhook Payload:", JSON.stringify(payload, null, 2));

        const from = payload.from || payload.sender || payload.number;
        const text = payload.text || payload.message || payload.body;

        if (from && text) {
            await recordInboundMessage(String(from), String(text), "WHATSAPI");
        }

        return NextResponse.json({
            success: true,
            message: "Webhook received and logged by Nafter CRM"
        });

    } catch (error) {
        console.error("❌ WhatsAPI Webhook Error:", error);
        return NextResponse.json({
            success: false,
            error: "Failed to process WhatsAPI payload"
        }, { status: 500 });
    }
}

// Verification GET for some providers
export async function GET() {
    return new Response("WhatsAPI Webhook Active", { status: 200 });
}
