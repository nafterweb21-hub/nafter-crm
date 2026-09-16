import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
    const conversations = await db.conversation.findMany({
        orderBy: { lastMessageAt: "desc" },
        include: {
            lead: true,
            messages: { orderBy: { createdAt: "asc" } },
        },
    });

    return NextResponse.json({ conversations });
}
