import { Quiz } from "@prisma/client";
import Balancer from "react-wrap-balancer";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import prisma from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

async function getQuizzes(): Promise<Quiz[]> {
  return await prisma.quiz.findMany();
}

export default async function ListQuiz() {
  const quizzes = await getQuizzes();

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
      {quizzes.map((value) => {
        return (
          <>
            {/*    <Card*/}
            {/*    key={value.id}*/}
            {/*    title={value.name}*/}
            {/*    description={"blubblub"}*/}
            {/*    demo={<></>}*/}
            {/*    large={true}*/}
            {/*/>*/}
            <Link href={"/quiz/" + value.id}>
              {/*<div*/}
              {/*    className={`relative col-span-1 h-96 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md md:col-span-2 flex flex-col justify-between`}*/}
              {/*>*/}
              {/*        <h2 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display text-xl font-bold text-transparent md:text-3xl md:font-normal">*/}
              {/*            <Balancer>{value.name}</Balancer>*/}
              {/*        </h2>*/}
              {/*</div>*/}
              <Card>
                <CardHeader>
                  <CardTitle>{value.name}</CardTitle>
                  {/*<CardDescription>Card Description</CardDescription>*/}
                </CardHeader>
                {/*<CardContent>*/}
                {/*    <p>Card Content</p>*/}
                {/*</CardContent>*/}
                {/*<CardFooter>*/}
                {/*    <p>Card Footer</p>*/}
                {/*</CardFooter>*/}
              </Card>
            </Link>
          </>
        );
      })}
    </div>
  );
}
