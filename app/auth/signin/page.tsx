"use client";

import {useSignInModal} from "@/components/layout/sign-in-modal";
import { getServerSession } from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";
import {signIn} from "next-auth/react";
import {Github, Google } from "@/components/shared/icons";
import {useRouter} from "next/navigation";

export default async function SignIn() {
    // const { SignInModal, setShowSignInModal } = useSignInModal();

    return (
        <>
            {/*<SignInModal />*/}
            {/*/!*{Object.values(providers).map((provider) => (*!/*/}
            {/*/!*    <div key={provider.name}>*!/*/}
            {/*/!*        <button onClick={() => signIn(provider.id)}>*!/*/}
            {/*/!*            Sign in with {provider.name}*!/*/}
            {/*/!*        </button>*!/*/}
            {/*/!*    </div>*!/*/}
            {/*/!*))}*!/*/}
            <div className={"flex flex-col gap-2 items-center justify-center h-fit"}>
                <h1 className={"text-3xl mb-2"}>Sign In</h1>
                <h3 className={"text-xl mb-2"}>The requested page requires you to sign in.</h3>
                <Button
                    onClick={() => {
                        signIn("google");
                    }}
                >
                    <Google className="h-5 w-5"/>
                    <p>&nbsp;Sign In with Google</p>

                </Button>
                <Button
                    onClick={() => {
                        signIn("github");
                    }}
                >
                    <Github className="h-5 w-5"/>
                    <p>&nbsp;Sign In with Github</p>

                </Button>
            </div>

            {/*<Dialog open={true}>*/}
            {/*    <DialogContent>*/}
            {/*        <DialogHeader>*/}
            {/*            <DialogTitle>Sign In</DialogTitle>*/}
            {/*            /!*<DialogDescription>*!/*/}
            {/*            /!*  This action cannot be undone. This will permanently delete your account*!/*/}
            {/*            /!*  and remove your data from our servers.*!/*/}
            {/*            /!*</DialogDescription>*!/*/}
            {/*        </DialogHeader>*/}
            {/*        <Button*/}
            {/*            onClick={() => {*/}
            {/*                signIn("google");*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            <Google className="h-5 w-5"/>*/}
            {/*            <p>&nbsp;Sign In with Google</p>*/}
            {/*        </Button>*/}
            {/*        <Button*/}
            {/*            onClick={() => {*/}
            {/*                signIn("github");*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            <Github className="h-5 w-5"/>*/}
            {/*            <p>&nbsp;Sign In with Github</p>*/}
            {/*        </Button>*/}
            {/*    </DialogContent>*/}
            {/*</Dialog>*/}
        </>
    )
}