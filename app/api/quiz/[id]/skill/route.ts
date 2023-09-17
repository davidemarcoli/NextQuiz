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

    const skills = await prisma.skill.findMany({
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
    const {quizWordId, proficiency} = await req.json();
    const session = (await getServerSession(authOptions)) as any;

    console.log(quizWordId, proficiency)
    console.log(session?.user?.id)

    const newSkill = await prisma.skill.create({
        data: {
            quizWord: {
                connect: {
                    id: quizWordId
                }
            },
            proficiency,
            // userId: session?.user?.id
            user: {
                connect: {
                    id: session?.user?.id
                },
            }
        }
    })

    console.log(newSkill)

    return NextResponse.json(newSkill);
}