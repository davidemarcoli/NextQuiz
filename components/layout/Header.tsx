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
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Session } from "next-auth";
import UserDropdown from "./user-dropdown";
import { useSignInModal } from "./sign-in-modal";
import { ModeToggle } from "@/components/mode-toggle";

const Header = ({ session }: { session: Session | null }) => {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const { theme, setTheme } = useTheme();
  const routes = [
    {
      href: "/",
      label: "Products",
    },
    {
      href: "/",
      label: "Categories",
    },
    {
      href: "/",
      label: "On Sale",
    },
  ];

  return (
    <header className="border-b px-4 py-3 sm:flex sm:justify-between">
      <div>
        <div className="relative flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
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
            <Link href="/" className="ml-4 lg:ml-0">
              <h1 className="text-xl font-bold">STORE NAME</h1>
            </Link>
          </div>
          <nav className="mx-6 flex hidden items-center space-x-4 md:block lg:space-x-6">
            {routes.map((route, i) => (
              <Button key={i} asChild variant="ghost">
                <Link
                  href={route.href}
                  className="text-sm font-medium transition-colors"
                >
                  {route.label}
                </Link>
              </Button>
            ))}
          </nav>
          <div className="flex items-center">
            {/*<Button*/}
            {/*    variant="ghost"*/}
            {/*    size="icon"*/}
            {/*    className="mr-2"*/}
            {/*    aria-label="Shopping Cart"*/}
            {/*>*/}
            {/*    <ShoppingCart className="h-6 w-6" />*/}
            {/*    <span className="sr-only">Shopping Cart</span>*/}
            {/*</Button>*/}
            {/*<Button*/}
            {/*    variant="ghost"*/}
            {/*    size="icon"*/}
            {/*    aria-label="Toggle Theme"*/}
            {/*    className="mr-6"*/}
            {/*    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}*/}
            {/*>*/}
            {/*    <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />*/}
            {/*    <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />*/}
            {/*    <span className="sr-only">Toggle Theme</span>*/}
            {/*</Button>*/}
            <ModeToggle />
            <div>
              {" "}
              {session ? <UserDropdown session={session} /> : <SignInModal />}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
