import { NextResponse } from "next/server"
import { recordInboundMessage } from "@/lib/messaging"

/**
 * WhatsApp Webhook: Handling Challenges (GET) and Incoming Messages (POST)
 */

const WHATSAPP_VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || "antigravity_token_123"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const mode = searchParams.get("hub.mode")
    const token = searchParams.get("hub.verify_token")
    const challenge = searchParams.get("hub.challenge")

    if (mode === "subscribe" && token === WHATSAPP_VERIFY_TOKEN) {
        console.log("✅ WhatsApp Webhook Verified!")
        return new Response(challenge, { status: 200 })
    }

    return new Response("Forbidden", { status: 403 })
}

export async function POST(req: Request) {
    try {
        const body = await req.json()

        // Log the incoming message (In production, replace with DB write)
        console.log("📩 New WhatsApp Payload:", JSON.stringify(body, null, 2))

        const entry = body.entry?.[0]
        const changes = entry?.changes?.[0]
        const value = changes?.value
        const message = value?.messages?.[0]

        if (message) {
            const from = message.from
            const text = message.text?.body || "Non-text message"
            const referral = message.referral // This is the key for Click-to-WhatsApp Ads!

            // Source Intelligence
            const source = referral ? "facebook_ads" : "whatsapp_button"

            console.log(`🤖 Processing message from ${from}: "${text}" [Source: ${source}]`)

            await recordInboundMessage(String(from), String(text), "META")
        }

        return NextResponse.json({ status: "ok" })
    } catch (error) {
        console.error("❌ Error processing WhatsApp webhook:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
