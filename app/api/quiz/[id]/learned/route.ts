import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } },
) {
  const id = context.params.id;
  const session = (await getServerSession(authOptions)) as any;

    const skills = await prisma.learnedWord.findMany({
        where: {
            quizWord: {
               quizId: {
                     equals: id
               }
            },
            userId: session?.user?.id
        }
    });

    return NextResponse.json(skills);
}

export async function POST(req: NextRequest) {
    const {quizWordId, learned} = await req.json();
    const session = (await getServerSession(authOptions)) as any;

    const newLearnedWord = await prisma.learnedWord.create({
        data: {
            quizWord: {
                connect: {
                    id: quizWordId
                }
            },
            learned,
            // userId: session?.user?.id
            user: {
                connect: {
                    id: session?.user?.id
                },
            }
        }
    })

    return NextResponse.json(newLearnedWord);
}