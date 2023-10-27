import "./globals.css";
import {Analytics} from "@vercel/analytics/react";
import Nav from "@/components/layout/nav";
import React from "react";
import {ThemeProvider} from "@/components/theme-provider";
import {inter, sfPro} from "@/app/fonts";
import {cx} from "class-variance-authority";
import {Toaster} from "@/components/ui/toaster";
import {CommandMenu} from "@/components/command-menu";
import {Changelog} from "@/components/changelog";

export const metadata = {
    title: "NextQuiz",
    description:
        "NextQuiz is a quiz app built with Next.js, Prisma, and Tailwind CSS.",
    twitter: {
        card: "summary_large_image",
        title: "NextQuiz",
        description:
            "NextQuiz is a quiz app built with Next.js, Prisma, and Tailwind CSS.",
        creator: "@davide_marcoli",
    },
    manifest: '/manifest.webmanifest',
    keywords: ['NextQuiz', 'Quiz', 'Davide Marcoli'],
    metadataBase: new URL("https://next-quiz.davidemarcoli.dev"),
    themeColor: "#000000",
};

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {
    return (
        <>
            <html lang="en">
            <body className={cx(sfPro.variable, inter.variable)}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                {/*<Suspense fallback="...">*/}
                {/* @ts-expect-error Server Component */}
                <Nav/>
                {/*</Suspense>*/}
                <main className={"mx-4 mt-16"}>{children}</main>
                <Toaster/>
                <Analytics/>
                <CommandMenu/>
                <Changelog/>
            </ThemeProvider>
            </body>
            </html>
        </>
    );
}
