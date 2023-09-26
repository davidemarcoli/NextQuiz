import {LearnedWord, Quiz, QuizWord, User} from "@prisma/client";
import prisma from "@/lib/prisma";
import {Suspense} from "react";
import {Card, CardContent, CardHeader, CardTitle,} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

async function getQuiz(id: string): Promise<Quiz & {user: User} | null> {
    return await prisma.quiz.findFirst({where: {id: id}, include: {user: true}});
}

async function getQuizWithWords(
    id: string,
): Promise<(Quiz & { words: QuizWord[] }) | null> {
    const quiz = await prisma.quiz.findFirst({
        where: {id: id},
        include: {
            words: true,
        },
    });
    return quiz;
}

async function getLearnedWords(quizId: string, userId: string): Promise<LearnedWord[] | null> {
    return await prisma.learnedWord.findMany({
        where: {
            quizWord: {
                quizId,
            },
            userId
        },
    });
}

export default async function Page({params}: { params: { id: string } }) {
    const quiz = await getQuiz(params.id);

    if (!quiz) {
        return <div>Quiz not found</div>;
    }

    return (
        <>
            <h1 className={"text-3xl mb-2"}>{quiz.name}<span className="text-sm ml-2">by {quiz.user.name}</span></h1>
            <Suspense fallback={<div>Loading Words...</div>}>
                {/* @ts-expect-error Server Component */}
                <ShowQuiz params={params}/>
            </Suspense>
        </>
    );
}

async function ShowQuiz({params}: { params: { id: string } }) {
    const session = await getServerSession(authOptions)
    const fullQuiz = await getQuizWithWords(params.id);
    const learnedWords = await getLearnedWords(params.id, session?.user?.id || "");

    const allWords = fullQuiz?.words || [];
    const groupedWords = {
        learned: fullQuiz?.words.filter((word) => learnedWords?.find((learnedWord) => learnedWord.quizWordId === word.id && learnedWord.learned)) || [],
        notLearned: fullQuiz?.words.filter((word) => learnedWords?.find((learnedWord) => learnedWord.quizWordId === word.id && !learnedWord.learned)) || [],
        notSeen: fullQuiz?.words.filter((word) => !learnedWords?.find((learnedWord) => learnedWord.quizWordId === word.id)) || []
    }

    if (!fullQuiz) {
        return <div>Quiz Words not found</div>;
    }

    return (
        <>
            <Link className="mr-4" href={`/quiz/${params.id}/cards`}>
                <Button>Cards</Button>
            </Link>
            <Link className="mr-4" href={`/quiz/${params.id}/learn`}>
                <Button>Learn</Button>
            </Link>
            <Link href={`/quiz/${params.id}/evaluation`}>
                <Button>Evaluation</Button>
            </Link>
            {!session &&
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {fullQuiz.words.map((word) => {
                        return (
                            <Card key={word.id}>
                                <CardHeader>
                                    <CardTitle>{word.term}</CardTitle>
                                    {/*<CardDescription>Card Description</CardDescription>*/}
                                </CardHeader>
                                <CardContent>
                                    <p>{word.definition}</p>
                                </CardContent>
                                {/*<CardFooter>*/}
                                {/*    <p>Card Footer</p>*/}
                                {/*</CardFooter>*/}
                            </Card>
                        );
                    })}
                </div>
            }

            {session &&
                <>
                    {groupedWords.notLearned.length > 0 && <>
                        <div className={"my-4"}/>
                        <h2 className={"text-2xl text-red-500"}>Not learned</h2></>}
                    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                        {groupedWords.notLearned.map((word) => {
                                return (
                                    <Card key={word.id}>
                                        <CardHeader>
                                            <CardTitle>{word.term}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p>{word.definition}</p>
                                        </CardContent>
                                    </Card>
                                );
                            }
                        )}
                    </div>

                    {groupedWords.learned.length > 0 && <>
                        <div className={"my-4"}/>
                        <h2 className={"text-2xl text-green-500"}>Learned</h2></>}
                    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                        {groupedWords.learned.map((word) => {
                                return (
                                    <Card key={word.id}>
                                        <CardHeader>
                                            <CardTitle>{word.term}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p>{word.definition}</p>
                                        </CardContent>
                                    </Card>
                                );
                            }
                        )}
                    </div>

                    {groupedWords.notSeen.length > 0 && <>
                        <div className={"my-4"}/>
                        <h2 className={"text-2xl"}>Not seen</h2></>}
                    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                        {groupedWords.notSeen.map((word) => {
                                return (
                                    <Card key={word.id}>
                                        <CardHeader>
                                            <CardTitle>{word.term}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p>{word.definition}</p>
                                        </CardContent>
                                    </Card>
                                );
                            }
                        )}
                    </div>
                </>
            }
        </>
    );
}
