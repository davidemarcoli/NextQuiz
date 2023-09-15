"use client"

import {useState} from "react";

export default function CreateQuiz() {

    const [formData, setFormData] = useState({
        quizName: "",
        csvWords: "",
        separator: "\t",
    });

    function handleInput(event: any) {
        const {name, value} = event.target;
        setFormData((prev) => ({...prev, [name]: value}));
    }

    function handleSeparator(newSeparator: string) {
        setFormData((prev) => ({...prev, separator: newSeparator}));
    }

    function onSubmit() {
        console.log("submit");
        console.log(formData);

        // formData.csvWords is a csv string which is split by a tab
        // each line is a word and its definition
        const lines = formData.csvWords.split("\n");
        console.log(lines);
        const words = lines.map((line: string) => {
            const [term, definition] = line.split(formData.separator);
            return {
                term,
                definition,
            };
        });

        console.table(words);

        fetch("/quiz", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: formData.quizName,
                words
            })
        }).then(r => r.json()).then(r => console.log(r));
    }

    return (
        <>
            <div className="z-10 w-full max-w-xl px-5 xl:px-0">
                <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                    <h1 className="text-6xl font-bold">
                        Welcome to <a className="text-blue-600">Next Quiz!</a>
                    </h1>
                    <p className="mt-3 text-2xl">
                        Get started by creating a quiz
                    </p>

                    <input placeholder="Quiz Name" name="quizName" onChange={handleInput}
                           className={`border border-black rounded-full px-2 py-1 mt-4`}/>

                    <div className="flex flex-row gap-4">
                        Separator:
                        <button className={`border border-black rounded-full px-2 py-1 ${
                            formData.separator === "\t" ? "bg-black text-white" : ""
                        }`} onClick={() => handleSeparator("\t")}>
                            Tab
                        </button>
                        <button className={`border border-black rounded-full px-2 py-1 ${
                            formData.separator === "," ? "bg-black text-white" : ""
                        }`} onClick={() => handleSeparator(",")}>
                            Comma
                        </button>
                        <button className={`border border-black rounded-full px-2 py-1 ${
                            formData.separator === ";" ? "bg-black text-white" : ""
                        }`} onClick={() => handleSeparator(";")}>
                            Semicolon
                        </button>
                    </div>

                    <textarea placeholder="CSV Words" name="csvWords" onChange={handleInput}/>
                    <button
                        className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                        onClick={onSubmit}>
                        Create Quiz
                    </button>
                </main>
            </div>
        </>
    );
}