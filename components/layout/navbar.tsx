"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import {useSignInModal} from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import {Session} from "next-auth";
import {ModeToggle} from "@/components/mode-toggle";
import {Button} from "@/components/ui/button";
import {Sheet, SheetContent, SheetTrigger} from "../ui/sheet";
import {Menu} from "lucide-react";

export default function NavBar({session}: { session: Session | null }) {
    const {SignInModal, setShowSignInModal} = useSignInModal();
    const scrolled = useScroll(50);

    return (
        <header>
            <div
                className={`fixed top-0 w-full flex justify-center ${
                    scrolled
                        ? "backdrop-blur-xl"
                        : "bg-white/0"
                } z-30 transition-all`}
            >
                <div className="flex items-center">

                    <Sheet>
                        <SheetTrigger>
                            <Menu className="h-6 md:hidden w-6"/>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                            <nav className="flex flex-col gap-4">
                                <Link href={`/quiz/create`} className="block px-2 py-1 text-lg">
                                    Create Quiz
                                </Link>
                                <Link href={`/quiz/list`} className="block px-2 py-1 text-lg">
                                    Quiz List
                                </Link>

                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
                <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full">
                    <Link href="/" className="flex items-center font-display text-2xl">
                        <Image
                            src="/logo.png"
                            alt="Precedent logo"
                            width="30"
                            height="30"
                            className="mr-2 rounded-sm"
                        ></Image>
                        <p>Next Quiz</p>
                    </Link>
                    <Link href={`/quiz/create`}>
                        <Button variant={"ghost"}>Create Quiz</Button>
                    </Link>
                    <Link href={`/quiz/list`}>
                        <Button variant={"ghost"}>Quiz List</Button>
                    </Link>
                    <ModeToggle/>
                    <div>
                        {session ? (
                            <UserDropdown session={session}/>
                        ) : (
                            <SignInModal/>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
