import { NextResponse } from "next/server";
import { startBridge } from "@/lib/whatsapi-bridge";

export async function POST() {
    const status = await startBridge();
    return NextResponse.json(status);
}
