// "use client";
//
// import Image from "next/image";
// import Link from "next/link";
// import useScroll from "@/lib/hooks/use-scroll";
// import { useSignInModal } from "./sign-in-modal";
// import UserDropdown from "./user-dropdown";
// import { Session } from "next-auth";
// import {ModeToggle} from "@/components/mode-toggle";
// import {Button} from "@/components/ui/button";
//
// export default function NavBar({ session }: { session: Session | null }) {
//   const { SignInModal, setShowSignInModal } = useSignInModal();
//   const scrolled = useScroll(50);
//
//   return (
//     <>
//       <div
//         className={`fixed top-0 w-full flex justify-center ${
//           scrolled
//             ? "backdrop-blur-xl"
//             : "bg-white/0"
//         } z-30 transition-all`}
//       >
//         <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between w-full">
//           <Link href="/" className="flex items-center font-display text-2xl">
//             <Image
//               src="/logo.png"
//               alt="Next Quiz Logo"
//               width="30"
//               height="30"
//               className="mr-2 rounded-sm"
//             ></Image>
//             <p>Next Quiz</p>
//           </Link>
//             <Link href={`/quiz/create`}>
//                 <Button>Create Quiz</Button>
//             </Link>
//             <Link href={`/quiz/list`}>
//                 <Button>Quiz List</Button>
//             </Link>
//             <ModeToggle />
//           <div>
//             {session ? (
//               <UserDropdown session={session} />
//             ) : (
//                 <SignInModal />
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Session } from "next-auth";
import UserDropdown from "./user-dropdown";
import { useSignInModal } from "./sign-in-modal";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import useScroll from "@/lib/hooks/use-scroll";

const Header = ({ session }: { session: Session | null }) => {
  const scrolled = useScroll(50);
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const routes = [
    {
      href: "quiz/create",
      label: "Create Quiz",
    },
    {
      href: "quiz/list",
      label: "Quiz List",
    },
  ];

  return (
    <header className="sm:flex sm:justify-between">
      <div
        className={`fixed top-0 flex w-full justify-center ${
          scrolled ? "backdrop-blur-xl" : "bg-white/0"
        } z-30 px-4 transition-all`}
      >
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger>
              <Menu className="h-6 w-6 md:hidden" />
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                {routes.map((route, i) => (
                  <Link
                    key={i}
                    href={route.href}
                    className="block px-2 py-1 text-lg"
                  >
                    {route.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <div className="mx-5 flex h-16 w-full max-w-screen-xl items-center justify-between">
          <Link href="/" className="font-display flex items-center text-2xl">
            <Image
              src="/logo.png"
              alt="Next Quiz Logo"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            ></Image>
            <p>Next Quiz</p>
          </Link>
          <nav className="mx-6 flex hidden items-center space-x-4 md:block lg:space-x-6">
            {routes.map((route, i) => (
              <Link href={route.href} key={i}>
                <Button variant={"ghost"}>{route.label}</Button>
              </Link>
            ))}
          </nav>
          <ModeToggle />
          <div>
            {session ? <UserDropdown session={session} /> : <SignInModal />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
