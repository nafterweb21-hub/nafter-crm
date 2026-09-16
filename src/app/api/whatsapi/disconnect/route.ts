import { NextResponse } from "next/server";
import { logoutBridge } from "@/lib/whatsapi-bridge";

export async function POST() {
    await logoutBridge();
    return NextResponse.json({ status: "idle" });
}
