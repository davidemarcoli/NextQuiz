"use client";

import {Quiz, QuizWord, Skill} from "@prisma/client";
import {useEffect, useState} from "react";
import {useToast} from "@/components/ui/use-toast";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

async function getQuizWithWords(
    id: string,
): Promise<(Quiz & { words: QuizWord[] }) | null> {
    // return await prisma.quiz.findFirst({
    //     where: {id: id}, include: {
    //         words: true
    //     }
    // });

    console.log(`Getting quiz with id ${id}`);
    return await fetch("/api/quiz/" + id, {
        method: "GET",
        cache: "no-cache",
    }).then((value) => {
        console.log("value", value.ok);
        return value.json();
    });
}

async function getAllSkills(id: string): Promise<Skill[]> {
    return await fetch("/api/quiz/" + id + "/skill", {
        method: "GET",
        cache: "no-cache",
    }).then((value) => {
        console.log("value", value.ok);
        return value.json();
    });
}

// function WordCard({cardData, isFlipped}: { cardData: QuizWord, isFlipped: boolean }) {
//     return (
//         // <div className="card">test</div>
//         // <div onClick={() => setIsFlipped(!isFlipped)} style={{ width: '200px', height: '300px', border: '1px solid black', cursor: 'pointer' }}>
//         //     {isFlipped ? cardData.term : cardData.definition}
//         // </div>
//
//         <Card className="w-full h-full select-none">
//             <CardContent>
//                 <CardTitle>{isFlipped ? cardData.term : cardData.definition}</CardTitle>
//             </CardContent>
//         </Card>
//     );
// }

export default function Page({params}: { params: { id: string } }) {
    /*export default async function Cards({params}: any) {
      console.log(params)
      * */

    const toasts = useToast();

    const [currentCard, setCurrentCard] = useState(0);
    const [fullQuiz, setFullQuiz] = useState<
        (Quiz & { words: QuizWord[] }) | null
    >(null);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [currentInput, setCurrentInput] = useState("");
    const [timesTried, setTimesTried] = useState(0);

    useEffect(() => {
        console.log("useEffect", params.id);

        getQuizWithWords(params.id)
            .then((value) => {
                console.log("quiz value", value);
                setFullQuiz(value);
                setLoading(false);
            })
            .catch((reason) => {
                console.log("quiz reason", reason);
            });

        getAllSkills(params.id)
            .then((value) => {
                console.log("skill value", value);
                setSkills(value);
            })
            .catch((reason) => {
                console.log("skill reason", reason);
            });
    }, []);

    useEffect(() => {
        // sort words by proficiency
        const sortedWords = fullQuiz?.words.sort((a, b) => {
            const aSkill = skills.find((skill) => skill.quizWordId === a.id);
            const bSkill = skills.find((skill) => skill.quizWordId === b.id);

            if (!aSkill || !bSkill) return 0;

            return bSkill.proficiency - aSkill.proficiency;
        });
        // @ts-ignore
        setFullQuiz({...fullQuiz, words: sortedWords || []});
    }, [skills]);


    // console.log(isLoading);
    if (isLoading) return <p>Loading...</p>;
    if (!fullQuiz) return <p>Quiz Words not found</p>;

    return (
        <>
            <Table>
                <TableCaption>A list of all your skill</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Term</TableHead>
                        <TableHead>Definition</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {fullQuiz.words.map((word) => (
                        <TableRow key={word.id}>
                            <TableCell>{word.term}</TableCell>
                            <TableCell>{word.definition}</TableCell>
                            <TableCell className="text-right">
                                {skills.find((skill) => skill.quizWordId === word.id)?.proficiency || 0}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}
