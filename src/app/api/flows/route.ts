import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
    let flow = await db.flow.findFirst({ orderBy: { createdAt: "asc" } });

    if (!flow) {
        flow = await db.flow.create({
            data: {
                name: "Shopify Auto-Pilot",
                status: "draft",
                nodes: JSON.stringify([]),
                edges: JSON.stringify([]),
            },
        });
    }

    return NextResponse.json({
        flow: {
            ...flow,
            nodes: JSON.parse(flow.nodes),
            edges: JSON.parse(flow.edges),
        },
    });
}

export async function POST(req: Request) {
    const body = await req.json();
    const flow = await db.flow.create({
        data: {
            name: body.name || "New Flow",
            status: "draft",
            nodes: JSON.stringify(body.nodes ?? []),
            edges: JSON.stringify(body.edges ?? []),
        },
    });

    return NextResponse.json({
        flow: { ...flow, nodes: JSON.parse(flow.nodes), edges: JSON.parse(flow.edges) },
    });
}
