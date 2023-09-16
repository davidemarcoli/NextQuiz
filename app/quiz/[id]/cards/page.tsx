"use client";

import {Quiz, QuizWord} from "@prisma/client";
import {useEffect, useState} from "react";
import {Card, CardContent, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

async function getQuizWithWords(id: string): Promise<Quiz & { words: QuizWord[] } | null> {
    // return await prisma.quiz.findFirst({
    //     where: {id: id}, include: {
    //         words: true
    //     }
    // });

    console.log(`Getting quiz with id ${id}`)
    return await fetch('http://localhost:3000/api/quiz/' + id, {
        method: 'GET',
        cache: 'no-cache',
    }).then(value => {
        console.log('value', value.ok)
        return value.json()
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

export default async function Cards({params}: { params: { id: string } }) {

    /*export default async function Cards({params}: any) {
    console.log(params)
    * */

    const [currentCard, setCurrentCard] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [fullQuiz, setFullQuiz] = useState<Quiz & { words: QuizWord[] } | null>(null);
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        console.log('useEffect', params.id)
        getQuizWithWords(params.id).then(value => {
            console.log('value 2', value);
            setLoading(false);
            setFullQuiz(value);
        }).catch(reason => {
            console.log('reason', reason);
        });
    }, []);

    console.log(isLoading)
    if (isLoading) return <p>Loading...</p>
    if (!fullQuiz) return <p>Quiz Words not found</p>

    function changeCard(indexChange: number) {
        setIsFlipped(false);

        console.log('changeCard', indexChange);
        if (currentCard + indexChange < 0) {
            setCurrentCard(fullQuiz!.words.length - 1);
        } else if (currentCard + indexChange >= fullQuiz!.words.length) {
            setCurrentCard(0);
        } else {
            setCurrentCard(currentCard + indexChange);
        }
    }

    return (
        <>
            <h1 className={'text-3xl'}>{fullQuiz.name}</h1>
            <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2" onClick={() => setIsFlipped(!isFlipped)}>
                {/*<WordCard cardData={fullQuiz.words[currentCard]} isFlipped={isFlipped}/>*/}
                <Card className="w-full h-full select-none">
                    <CardContent>
                        <CardTitle>{isFlipped ? fullQuiz.words[currentCard].term : fullQuiz.words[currentCard].definition}</CardTitle>
                    </CardContent>
                </Card>
            </div>
            <Button className="mt-4" onClick={() => changeCard(-1)}>Previous</Button>
            <Button className="mt-4" onClick={() => changeCard(1)}>Next</Button>
        </>
    );
}
