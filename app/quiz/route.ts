// import {NextApiRequest, NextApiResponse} from "next";
// import prisma from "@/lib/prisma";
// import { getSession } from "next-auth/react";
//
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     const requestMethod = req.method;
//     const body = JSON.parse(req.body);
//     const session = await getSession({ req });
//     console.log(session)
//
//     // const quiz = await prisma.quiz.create({
//     //     data: {
//     //         name: req.body.quizName,
//     //         words: {
//     //             create: req.body.words
//     //         },
//     //         userId: req.body.userId
//     //     }
//     // });
// }

import {NextRequest, NextResponse} from "next/server";

import prisma from "@/lib/prisma";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {Session} from "next-auth";

export async function POST(req: NextRequest) {
    const { name, words } = await req.json();
    const session = await getServerSession(authOptions) as any;
    // console.log(session)

    if (!session) {
        return NextResponse.json("Unauthorized", {
            status: 401
        })
    }

    console.log(session.user.id)
    const newQuiz = await prisma.quiz.create({
        data: {
            name,
            words: {
                create: words
            },
            user: {
                connect: {
                    id: session.user.id
                }
            }
        }
    });

    return NextResponse.json(newQuiz)
    // return NextResponse.json({})
}

export async function GET() {
    const quizzes = await prisma.quiz.findMany();
    return NextResponse.json(quizzes)
}