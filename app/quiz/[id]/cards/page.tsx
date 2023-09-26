"use client";

import {LearnedWord, Quiz, QuizWord, User} from "@prisma/client";
import {useEffect, useState} from "react";
import {Card, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Shuffle} from "lucide-react";
import {useSwipeable} from "react-swipeable";

async function getQuizWithWords(
    id: string,
): Promise<(Quiz & { words: QuizWord[], user: User }) | null> {
    return await fetch("/api/quiz/" + id, {
        method: "GET",
        cache: "no-cache",
    }).then((value) => {
        return value.json();
    });
}

async function getLearnedWords(
    id: string,
): Promise<LearnedWord[] | null> {
    return await fetch("/api/quiz/" + id + "/learned", {
        method: "GET",
        cache: "no-cache",
    }).then((value) => {
        return value.json();
    });
}

async function getSession() {
    return await fetch("/api/auth/session", {
        method: "GET",
    }).then((value) => {
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

    let swipeHandlers = useSwipeable({
        onSwiped: (eventData) => console.log("User Swiped!", eventData),
        onSwipedLeft: (eventData) => {
            console.log("User Swiped Left!", eventData)
            updateLearnedWord(false);
            changeCard(1)
        },
        onSwipedRight: (eventData) => {
            console.log("User Swiped Right!", eventData)
            updateLearnedWord(true);
            changeCard(1);
        },
        swipeDuration: 250 // only swipes under 250ms will trigger callbacks
    });

    const [currentCard, setCurrentCard] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [fullQuiz, setFullQuiz] = useState<
        (Quiz & { words: QuizWord[], user: User }) | null
    >(null);
    const [learnedWords, setLearnedWords] = useState<LearnedWord[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [animateFlip, setAnimateFlip] = useState(true);
    const [session, setSession] = useState<any>(null);

    useEffect(() => {
        getQuizWithWords(params.id)
            .then((value) => {
                setFullQuiz(value);
                setLoading(false);
            })
            .catch((reason) => {
                console.error("reason", reason);
            });
        getLearnedWords(params.id)
            .then((value) => {
                setLearnedWords(value || []);
            })
            .catch((reason) => {
                console.error("reason", reason);
            });
        getSession()
            .then((value) => {
                if (value && value.user)
                    setSession(value);
            })
            .catch((reason) => {
                console.error("reason", reason);
            });
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (!fullQuiz) return <p>Quiz Words not found</p>;

    function changeCard(indexChange: number) {
        setAnimateFlip(false); // Disable flip animation
        setIsFlipped(false);

        if (currentCard + indexChange < 0) {
            setCurrentCard(fullQuiz!.words.length - 1);
        } else if (currentCard + indexChange >= fullQuiz!.words.length) {
            setCurrentCard(0);
        } else {
            setCurrentCard(currentCard + indexChange);
        }
    }

    async function updateLearnedWord(correct: boolean) {
        const currentLearnedWord = learnedWords.find((learnedWord) => learnedWord.quizWordId === fullQuiz?.words[currentCard].id);
        if (currentLearnedWord) {
            const newLearnedWord = await fetch("/api/quiz/" + params.id + "/learned/" + currentLearnedWord.id, {
                method: "PATCH",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    learned: correct,
                }),
            }).then((value) => {
                return value.json();
            });


        } else {
            const newLearnedWord = await fetch("/api/quiz/" + params.id + "/learned", {
                method: "POST",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    quizWordId: fullQuiz?.words[currentCard].id,
                    learned: false,
                }),
            }).then((value) => {
                return value.json();
            });

            setLearnedWords([...learnedWords, newLearnedWord])
        }
    }

    function getLearnedStatus() {
        const currentLearnedWord = learnedWords.find((learnedWord) => learnedWord.quizWordId === fullQuiz?.words[currentCard].id);
        if (currentLearnedWord) {
            return currentLearnedWord.learned ? "Learned" : "Not yet learned";
        } else {
            return "Not yet seen";
        }
    }

    return (
        <>
            <h1 className={"text-3xl mb-2"}>{fullQuiz.name}<span className="text-sm ml-2">by {fullQuiz.user.name}</span></h1>
            <div
                className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2"
                onClick={() => {
                    setIsFlipped(!isFlipped);
                    setAnimateFlip(true); // Enable flip animation
                }}
                {...(session ? swipeHandlers : {})}
            >
                {/*<WordCard cardData={fullQuiz.words[currentCard]} isFlipped={isFlipped}/>*/}
                <Card
                    className={`relative flex h-full w-full select-none items-center justify-center p-8 ${
                        animateFlip
                            ? `transition-all duration-500 [transform-style:preserve-3d] ${
                                isFlipped
                                    ? "[transform:rotateY(180deg)]"
                                    : "[transform:rotateY(0deg)]"
                            }`
                            : ""
                    }`}
                >
                    {/*<CardContent>*/}
                    <CardTitle
                        className={"absolute h-fit text-center [transform:rotateY(180deg)]"}
                        style={{backfaceVisibility: "hidden"}}
                    >
                        {fullQuiz.words[currentCard].term}
                    </CardTitle>
                    <CardTitle
                        className={"absolute h-fit text-center [transform:rotateY(0deg)]"}
                        style={{backfaceVisibility: "hidden"}}
                    >
                        {fullQuiz.words[currentCard].definition}
                    </CardTitle>
                    {/*</CardContent>*/}
                </Card>
            </div>
            <Button className="mr-4 mt-4" onClick={() => changeCard(-1)}>
                Previous
            </Button>
            <Button className="mr-4 mt-4" onClick={() => changeCard(1)}>
                Next
            </Button>
            <Button
                className="mr-4 mt-4"
                onClick={() => {
                    const newQuiz = {...fullQuiz};
                    newQuiz.words = newQuiz.words.sort(() => Math.random() - 0.5);
                    setFullQuiz(newQuiz);
                    setIsFlipped(false);
                    animateFlip && setAnimateFlip(false);
                }}
            >
                <Shuffle className="mr-2 h-3 w-3"/>
                Shuffle Words
            </Button>
            {session && <span className={`font-bold ${
                getLearnedStatus() === "Learned" ? "text-green-500" : getLearnedStatus() === "Not yet learned" ? "text-red-500" : ""
            }`}>{getLearnedStatus()}</span>}
        </>
    );
}
