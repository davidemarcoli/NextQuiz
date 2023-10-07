"use client";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut
} from "@/components/ui/command";
import {
    Calculator,
    Calendar,
    CreditCard,
    LayoutList,
    LogIn,
    LogOut,
    PlusSquare,
    Settings,
    Smile,
    User
} from "lucide-react";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import {Quiz, Skill} from "@prisma/client";
import {getSession, signIn, signOut} from "next-auth/react";
import { Session } from "next-auth";

async function getAllQuizzes(): Promise<Quiz[]> {
    return await fetch('/api/quiz')
        .then(response => response.json())
        .then(data => data);
}

export function CommandMenu() {
    const [open, setOpen] = React.useState(false)
    const [quizzes, setQuizzes] = React.useState<Quiz[]>([]);
    const [session, setSession] = React.useState<Session | null>(null);

    const router = useRouter();

    useEffect(() => {
        getSession().then((session) => {
            setSession(session);
        });
        getAllQuizzes().then((data) => {
            setQuizzes(data);
        });
    }, []);

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const navigate = (path: string) => {
        router.push(path);
        setOpen(false);
    }

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search..."/>
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Actions">
                    <CommandItem onSelect={() => navigate('/quiz/create')}>
                        <PlusSquare className="mr-2 h-4 w-4"/>
                        <span>Create Quiz</span>
                    </CommandItem>
                    <CommandItem onSelect={() => navigate('/quiz/list')}>
                        <LayoutList className="mr-2 h-4 w-4"/>
                        <span>Quiz List</span>
                    </CommandItem>
                </CommandGroup>
                <CommandGroup heading="User">
                    {!session && <CommandItem onSelect={() => signIn()}>
                        <LogIn className="mr-2 h-4 w-4"></LogIn>
                        <span>Sign In</span>
                    </CommandItem>}
                    {session && <CommandItem onSelect={() => signOut()}>
                        <LogOut className="mr-2 h-4 w-4"></LogOut>
                        <span>Sign Out</span>
                    </CommandItem>}
                </CommandGroup>
                {quizzes.length > 0 && <CommandGroup heading="Quizzes">
                    {quizzes.map((quiz) => (
                        <CommandItem key={quiz.id} onSelect={() => navigate(`/quiz/${quiz.id}`)}>
                            <span>{quiz.name}</span>
                        </CommandItem>
                    ))}
                    {/*<CommandItem>*/}
                    {/*    <User className="mr-2 h-4 w-4"/>*/}
                    {/*    <span>Profile</span>*/}
                    {/*    <CommandShortcut>⌘P</CommandShortcut>*/}
                    {/*</CommandItem>*/}
                    {/*<CommandItem>*/}
                    {/*    <CreditCard className="mr-2 h-4 w-4"/>*/}
                    {/*    <span>Billing</span>*/}
                    {/*    <CommandShortcut>⌘B</CommandShortcut>*/}
                    {/*</CommandItem>*/}
                    {/*<CommandItem>*/}
                    {/*    <Settings className="mr-2 h-4 w-4"/>*/}
                    {/*    <span>Settings</span>*/}
                    {/*    <CommandShortcut>⌘S</CommandShortcut>*/}
                    {/*</CommandItem>*/}
                </CommandGroup>}
            </CommandList>
        </CommandDialog>
    )
}