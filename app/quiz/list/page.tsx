import ComponentGrid from "@/components/home/component-grid";
import Card from "@/components/home/card";
import {Quiz} from "@prisma/client";
import Balancer from "react-wrap-balancer";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import prisma from "@/lib/prisma";

async function getQuizzes(): Promise<Quiz[]> {
    const quizzes = await prisma.quiz.findMany();
    console.log('quizzes', quizzes);
    return quizzes;
}

export default async function CreateQuiz() {

    const quizzes = await getQuizzes();

    return (
        <>
            {quizzes.map(value =>  {
                return <>
                {/*    <Card*/}
                {/*    key={value.id}*/}
                {/*    title={value.name}*/}
                {/*    description={"blubblub"}*/}
                {/*    demo={<></>}*/}
                {/*    large={true}*/}
                {/*/>*/}
                    <Link href={"/quiz/" + value.id}>
                    <div
                        className={`relative col-span-1 h-96 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md md:col-span-2 flex flex-col justify-between`}
                    >
                            <h2 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display text-xl font-bold text-transparent md:text-3xl md:font-normal">
                                <Balancer>{value.name}</Balancer>
                            </h2>
                    </div>
                    </Link>
                </>
            })}
        </>
    );
}