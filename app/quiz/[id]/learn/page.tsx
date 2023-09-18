"use client";

import {Quiz, QuizWord, Skill} from "@prisma/client";
import {useEffect, useState} from "react";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useToast} from "@/components/ui/use-toast";
import {cn} from "@/lib/utils";

async function getQuizWithWords(
    id: string,
): Promise<(Quiz & {
    words: QuizWord[]
}) | null> {
    // return await prisma.quiz.findFirst({
    //     where: {id: id}, include: {
    //         words: true
    //     }
    // });

    console.log(`Getting quiz with id ${id}`);
    return await fetch("/api/quiz/" + id + "/sorted", {
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

function getPercentComplete(quizWords: QuizWord[], skills: Skill[]) {
    let totalProficiency = 0;
    for (const quizWord of quizWords) {
        const skill = skills.find((skill) => skill.quizWordId === quizWord.id);
        if (skill) {
            totalProficiency += Math.max(Math.min(skill.proficiency, 0), 5);
        }
    }
    return totalProficiency / (quizWords.length * 5);
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

export default function Page({params}: {
    params: {
        id: string
    }
}) {
    /*export default async function Cards({params}: any) {
      console.log(params)
      * */

    const toasts = useToast();

    const [currentCard, setCurrentCard] = useState(0);
    const [fullQuiz, setFullQuiz] = useState<
        (Quiz & {
            words: QuizWord[]
        }) | null
    >(null);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [currentInput, setCurrentInput] = useState("");
    const [timesTried, setTimesTried] = useState(0);
    const [isSorted, setIsSorted] = useState(false);

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

    // console.log(isLoading);
    if (isLoading) return <p>Loading...</p>;
    if (!fullQuiz) return <p>Quiz Words not found</p>;

    function changeCard(indexChange: number) {
        console.log("changeCard", indexChange);
        if (currentCard + indexChange < 0) {
            setCurrentCard(fullQuiz!.words.length - 1);
        } else if (currentCard + indexChange >= fullQuiz!.words.length) {
            setCurrentCard(0);
        } else {
            setCurrentCard(currentCard + indexChange);
        }
        setCurrentInput("")
        setTimesTried(0)
    }

    function checkAnswer() {
        const trimmedInput = currentInput.trim();
        console.log("checkAnswer", trimmedInput, fullQuiz!.words[currentCard].term)

        if (trimmedInput === fullQuiz!.words[currentCard].term) {
            console.log("Correct!");
            toasts.toast({
                title: "Correct!",
                description: "You got it right!",
                className: cn(
                    'bottom-0 right-0 flex fixed md:max-w-[420px] md:bottom-4 md:right-4'
                ),
            })
            setCurrentInput("")
            changeCard(1);
            updateSkill(1);
            setTimesTried(0)
        } else {
            console.log("Incorrect!");
            toasts.toast({
                title: "Incorrect!",
                description: "You got it wrong!",
                className: cn(
                    'bottom-0 right-0 flex fixed md:max-w-[420px] md:bottom-4 md:right-4'
                ),
            });
            updateSkill(-1);
            setTimesTried(timesTried + 1);
        }
    }

    async function updateSkill(correction: number) {
        if (timesTried > 0) return;

        const currentSkill = skills.filter((skill) => skill.quizWordId === fullQuiz?.words[currentCard].id)[0];
        console.log("currentSkill", currentSkill);
        if (currentSkill) {
            const newSkill = await fetch("/api/quiz/" + params.id + "/skill/" + currentSkill.id, {
                method: "PATCH",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    proficiency: currentSkill.proficiency + correction,
                }),
            }).then((value) => {
                console.log("value", value.ok);
                return value.json();
            });

            setSkills(skills.map((skill) => {
                if (skill.id === newSkill.id) {
                    return newSkill;
                } else {
                    return skill;
                }
            }));
        } else {
            console.log("new skill")
            const newSkill = await fetch("/api/quiz/" + params.id + "/skill", {
                method: "POST",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    quizWordId: fullQuiz?.words[currentCard].id,
                    proficiency: correction > 0 ? 1 : 0,
                }),
            }).then((value) => {
                console.log("value", value.ok);
                return value.json();
            });

            setSkills([...skills, newSkill]);
        }
    }

    // function sortWordsByProficiency() {
    //     // sort words by proficiency
    //     console.log("sortWordsByProficiency", skills)
    //     const sortedWords = fullQuiz?.words.sort((a, b) => {
    //         const aSkill = skills.find((skill) => skill.quizWordId === a.id);
    //         const bSkill = skills.find((skill) => skill.quizWordId === b.id);
    //
    //         if (!aSkill && bSkill && bSkill.proficiency > 0) return 1;
    //         if (aSkill && !bSkill && aSkill.proficiency > 0) return -1;
    //         if (!aSkill || !bSkill) return 0;
    //
    //         return aSkill!.proficiency - bSkill!.proficiency;
    //     });
    //     console.log("sortedWords", sortedWords);
    //     // @ts-ignore
    //     setFullQuiz({...fullQuiz, words: sortedWords || []});
    // }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>{fullQuiz.words[currentCard].definition}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="mb-2">Your
                        Skill: {skills.filter((skill) => skill.quizWordId === fullQuiz.words[currentCard].id)[0]?.proficiency || 'Not yet ranked'}</p>
                    <Input value={currentInput} onChange={(e) => setCurrentInput(e.target.value)} onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            checkAnswer();
                        }
                    }}/>
                </CardContent>
                <CardFooter>
                    <Button className="mr-4" onClick={checkAnswer}>Check</Button>
                    <Button className="mr-4" onClick={() => changeCard(1)}>Skip</Button>
                    <p>{(getPercentComplete(fullQuiz.words, skills) * 100).toFixed(2)}% Complete</p>
                    {/*<Button onClick={sortWordsByProficiency}>Sort</Button>*/}
                </CardFooter>
            </Card>
        </>
    );
}
