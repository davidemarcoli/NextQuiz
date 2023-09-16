"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import {LayoutDashboard, LogOut, Moon, Sun} from "lucide-react";
import Popover from "@/components/shared/popover";
import Image from "next/image";
import { Session } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import * as React from "react";

export default function UserDropdown({ session }: { session: Session }) {
  // console.log("session", session)
  const { email, image } = session?.user || {};
  const [openPopover, setOpenPopover] = useState(false);
  
  return (
    <div className="relative inline-block text-left">
      {/*<Popover*/}
      {/*  content={*/}
      {/*    <div className="w-full rounded-md bg-white p-2 sm:w-56">*/}
      {/*      /!* <Link*/}
      {/*        className="flex items-center justify-start space-x-2 relative w-full rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"*/}
      {/*        href="/dashboard"*/}
      {/*      >*/}
      {/*        <LayoutDashboard className="h-4 w-4" />*/}
      {/*        <p className="text-sm">Dashboard</p>*/}
      {/*      </Link> *!/*/}
      {/*      <button*/}
      {/*        className="relative flex w-full cursor-not-allowed items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"*/}
      {/*        disabled*/}
      {/*      >*/}
      {/*        <LayoutDashboard className="h-4 w-4" />*/}
      {/*        <p className="text-sm">Dashboard</p>*/}
      {/*      </button>*/}
      {/*      <button*/}
      {/*        className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"*/}
      {/*        onClick={() => signOut()}*/}
      {/*      >*/}
      {/*        <LogOut className="h-4 w-4" />*/}
      {/*        <p className="text-sm">Logout</p>*/}
      {/*      </button>*/}
      {/*    </div>*/}
      {/*  }*/}
      {/*  align="end"*/}
      {/*  openPopover={openPopover}*/}
      {/*  setOpenPopover={setOpenPopover}*/}
      {/*>*/}
      {/*  <button*/}
      {/*    onClick={() => setOpenPopover(!openPopover)}*/}
      {/*    className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-gray-300 transition-all duration-75 focus:outline-none active:scale-95 sm:h-9 sm:w-9"*/}
      {/*  >*/}
      {/*    <Image*/}
      {/*      alt={email || "User"}*/}
      {/*      src={image || `https://avatars.dicebear.com/api/micah/${email}.svg`}*/}
      {/*      width={40}*/}
      {/*      height={40}*/}
      {/*    />*/}
      {/*  </button>*/}
      {/*</Popover>*/}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {/*<Button variant="outline" size="icon">*/}
          {/*  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />*/}
          {/*  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />*/}
          {/*  <span className="sr-only">Toggle theme</span>*/}
          {/*</Button>*/}
            <button
              onClick={() => setOpenPopover(!openPopover)}
              className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border transition-all duration-75 focus:outline-none active:scale-95 sm:h-9 sm:w-9"
            >
              <Image
                alt={email || "User"}
                src={image || `https://avatars.dicebear.com/api/micah/${email}.svg`}
                width={40}
                height={40}
              />
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            {/*<Button onClick={() => signOut()}>*/}
              <LogOut className="mr-2 h-4 w-4"  />
              <span>Logout</span>
            {/*</Button>*/}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
