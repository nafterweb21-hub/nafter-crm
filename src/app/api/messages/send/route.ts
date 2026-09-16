import { NextResponse } from "next/server";
import { sendOutboundMessage } from "@/lib/messaging";

export async function POST(req: Request) {
    const body = await req.json();
    const { phone, name, text } = body;

    if (!phone || !text) {
        return NextResponse.json({ error: "phone and text are required" }, { status: 400 });
    }

    const result = await sendOutboundMessage(phone, name, text);

    return NextResponse.json({
        message: result.message,
        delivered: result.delivered,
        error: result.delivered ? undefined : String(result.error ?? "No connected WhatsApp integration"),
    }, { status: result.delivered ? 200 : 502 });
}
