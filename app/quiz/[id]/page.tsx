import {Quiz, QuizWord} from "@prisma/client";
import Balancer from "react-wrap-balancer";
import prisma from "@/lib/prisma";
import {Suspense} from "react";

async function getQuiz(id: string): Promise<Quiz | null> {
    return await prisma.quiz.findFirst({where: {id: id}});
}

async function getQuizWithWords(id: string): Promise<Quiz & {words: QuizWord[]} | null> {
    return await prisma.quiz.findFirst({
        where: {id: id}, include: {
            words: true
        }
    });
}

export default async function Page({params}: { params: { id: string } }) {
    const quiz = await getQuiz(params.id);

    if (!quiz) {
        return <div>Quiz not found</div>
    }

    return (
        <>
            <h1 className={'text-3xl'}>{quiz.name}</h1>
            <Suspense fallback={<div>Loading Words...</div>}>
                {/* @ts-expect-error Server Component */}
                <ShowQuiz params={params.id} />
            </Suspense>
        </>
    )
}

async function ShowQuiz({params}: { params: { id: string } }) {


    const fullQuiz = await getQuizWithWords(params.id);

    if (!fullQuiz) {
        return <div>Quiz Words not found</div>
    }

    return (
        <>
            <h1>{fullQuiz.name}</h1>
            <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2">
                {fullQuiz.words.map((word) => {
                    return (
                        <div
                            key={word.id}
                            className={`relative col-span-1 h-96 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md md:col-span-2 flex flex-col justify-between`}
                        >
                            <h2 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display text-xl font-bold text-transparent md:text-3xl md:font-normal">
                                <Balancer>{word.term}</Balancer>
                            </h2>
                            <p className="text-gray-500">
                                <Balancer>{word.definition}</Balancer>
                            </p>
                        </div>
                    );
                })};
            </div>
        </>
    );
}
