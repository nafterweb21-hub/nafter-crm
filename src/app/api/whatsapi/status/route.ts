import { NextResponse } from "next/server";
import { getBridgeState } from "@/lib/whatsapi-bridge";

export async function GET() {
    return NextResponse.json(getBridgeState());
}
