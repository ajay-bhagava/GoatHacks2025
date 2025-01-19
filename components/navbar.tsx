"use client"

import Image from "next/image";
import Link from "next/link";
import {
  Info,
  CircleUserRound,
  DiamondPlus,
  MessageCircle,
  List,
  Bookmark,
  HelpCircle,
  Settings,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/dropdown";

import {logoutUser} from "@/lib/pocketbase"

export default function NavBar() {
  return (
    <div className="p-3 flex justify-between items-center drop-shadow-md bg-white">
      <Link href={"/marketplace"}>
        <div className="flex items-center gap-2">
          <Image
            src={"/techtrade.png"}
            alt={"techtrade"}
            width={45}
            height={45}
            className=""
          />
          <div className="text-2xl font-bold flex items-center">
            <span className="text-red-600">Tech</span>
            <span className="text-black">Trade</span>
          </div>
        </div>
      </Link>
      <div className="gap-x-3 flex items-center">
        <Link href={"/post"}>
          <DiamondPlus className="w-9 h-9" />
        </Link>
        <MessageCircle className="w-9 h-9" />
          <Link href={"/about"}><Info className={"w-9 h-9"}/></Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <CircleUserRound className="w-9 h-9 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link href="/mylistings">
                <List className="mr-2" />
                My Listings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/saved">
                <Bookmark className="mr-2" />
                Saved
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/help">
                <HelpCircle className="mr-2" />
                Help and Support
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <Settings className="mr-2" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href='/' onClick={logoutUser}>
                <LogOut className="mr-2" />
                Log Out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
