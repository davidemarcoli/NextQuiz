import {Quiz, QuizWord} from "@prisma/client";
import Balancer from "react-wrap-balancer";
import prisma from "@/lib/prisma";
import {Suspense} from "react";

async function getQuiz(id: string): Promise<Quiz | null> {
    console.log(`Getting small quiz with id ${id}`)
    return await prisma.quiz.findFirst({where: {id: id}});
}

async function getQuizWithWords(id: string): Promise<Quiz & {words: QuizWord[]} | null> {
    // return await prisma.quiz.findFirst({
    //     where: {id: id}, include: {
    //         words: true
    //     }
    // });

    console.log(`Getting quiz with id ${id}`)

    console.time('quiz');
    const quiz = await prisma.quiz.findFirst({
        where: {id: id},
        include: {
            words: true
        }
    });
    console.timeEnd('quiz');
    console.log(`This quiz has ${quiz?.words.length} words`);
    return quiz;
}

export default async function Page({params}: { params: { id: string } }) {
    console.log(params)
    const quiz = await getQuiz(params.id);

    if (!quiz) {
        return <div>Quiz not found</div>
    }

    return (
        <>
            <h1 className={'text-3xl'}>{quiz.name}</h1>
            <Suspense fallback={<div>Loading Words...</div>}>
                {/* @ts-expect-error Server Component */}
                <ShowQuiz params={params} />
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
            <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2">
                {fullQuiz.words.map((word) => {
                    return (
                        <div
                            key={word.id}
                            className={`relative col-span-1 h-96 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md md:col-span-2 flex flex-col justify-between`}
                        >
                            <p><b>{word.term}</b></p>
                            <p>{word.definition}</p>
                        </div>
                    );
                })};
            </div>
        </>
    );
}
