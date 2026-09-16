import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const body = await req.json();

    const flow = await db.flow.update({
        where: { id },
        data: {
            ...(body.name !== undefined ? { name: body.name } : {}),
            ...(body.status !== undefined ? { status: body.status } : {}),
            ...(body.nodes !== undefined ? { nodes: JSON.stringify(body.nodes) } : {}),
            ...(body.edges !== undefined ? { edges: JSON.stringify(body.edges) } : {}),
        },
    });

    return NextResponse.json({
        flow: { ...flow, nodes: JSON.parse(flow.nodes), edges: JSON.parse(flow.edges) },
    });
}
