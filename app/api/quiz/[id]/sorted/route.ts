import {NextRequest, NextResponse} from "next/server";

import prisma from "@/lib/prisma";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {Quiz, QuizWord} from "@prisma/client";

export async function GET(
    req: NextRequest,
    context: { params: { id: string } },
) {
    const id = context.params.id;

    const quiz = await prisma.quiz.findUnique({
        where: {
            id,
        },
        include: {
            words: true,
        },
    });

    if (!quiz) {
        return new NextResponse(null, {status: 404});
    }

    const sortedQuiz = await sortQUizWordsBySkills(quiz);

    return NextResponse.json(sortedQuiz);
}

async function sortQUizWordsBySkills(quiz: Quiz & { words: QuizWord[] }) {
    const session = (await getServerSession(authOptions)) as any;

    const words = quiz.words;
    const skills = await prisma.skill.findMany({
        where: {
            quizWord: {
                quizId: {
                    equals: quiz.id
                }
            },
            userId: session?.user?.id
        }
    });

    const sortedWords = words.sort((a, b) => {
        const skillA = skills.find(skill => skill.quizWordId === a.id);
        const skillB = skills.find(skill => skill.quizWordId === b.id);

        if (!skillA && skillB && skillB.proficiency > 0) return -1;
        if (skillA && !skillB && skillA.proficiency > 0) return 1;
        if (!skillA || !skillB) return 0;

        return skillA!.proficiency - skillB!.proficiency;
    });

    return {
        ...quiz,
        words: sortedWords
    }
}