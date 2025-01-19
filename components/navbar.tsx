'use client';

import Image from "next/image";
import { CircleUserRound, DiamondPlus, MessageCircle } from "lucide-react";
import Link from "next/link";
import pb, { logoutUser } from "@/lib/pocketbase.js"
import { useRouter } from "next/navigation";

export default function NavBar() {
    const loggedIn = pb.authStore.isValid
    const router = useRouter()

    return <div className={"p-3 flex justify-between items-center drop-shadow-md bg-white"}>
        <Link href="/">
            <div className="flex items-center gap-2">
                <Image src={"/techtrade.png"} alt={"techtrade"} width={45} height={45} className={""} />
                <div className="text-2xl font-bold flex items-center">
                    <span className="text-red-600">Tech</span>
                    <span className="text-black">Trade</span>
                </div>
            </div>
        </Link>
        {
            loggedIn ?
                (<div className={"gap-x-3 flex items-center"}>
                    <Link href={"/post"}><DiamondPlus className={"w-9 h-9"} /></Link>
                    <MessageCircle className="w-9 h-9 flex-shrink-0" />
                    <Link href="/mylistings"><CircleUserRound className={"w-9 h-9"} /></Link>
                    <button className="w-9 h-9" onClick={() => {logoutUser(); router.push("/")}}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4 18H6V20H18V4H6V6H4V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V18ZM6 11H13V13H6V16L1 12L6 8V11Z"></path>
                        </svg>
                    </button>
                </div>)
                : (<div className={"gap-x-3 flex"}>
                    <Link href="/login" className="btn btn-primary btm-nav-sm">Log In or Sign Up!</Link>
                </div>)
        }
    </div>
}
