import {NextRequest, NextResponse} from "next/server";

import prisma from "@/lib/prisma";

export async function PATCH(req: NextRequest, context: { params: { learnedWordId: string } }) {
    const {learned} = await req.json();

    await prisma.learnedWord.update({
        where: {
            id: context.params.learnedWordId
        },
        data: {
            learned
        }
    });

    return NextResponse.json({});
}