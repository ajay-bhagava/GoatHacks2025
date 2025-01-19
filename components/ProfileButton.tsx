"use client"

import React, { useEffect } from "react"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/dropdown";
import pb, { logoutUser } from "@/lib/pocketbase"
import { Bookmark, CircleUserRound, HelpCircle, List, LogOut, Settings } from "lucide-react";
import Link from "next/link";

export default function ProfileButton({ loggedIn }: any) {

    return (
        loggedIn ?
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
                        <Link href="/about">
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
            :
            <Link href="/login" className="btn btm-nav-sm btn-ghost">Log In</Link>
    )


}
