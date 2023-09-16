import {NextRequest, NextResponse} from "next/server";

import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, context: { params: { id: string } }) {
    const id  = context.params.id;

    const quiz = await prisma.quiz.findUnique({
        where: {
            id
        },
        include: {
            words: true
        }
    });
    console.log("loaded quiz with id: " + id)
    return NextResponse.json(quiz)
}