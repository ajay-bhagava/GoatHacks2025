"use client"

import Image from "next/image";
import Link from "next/link";
import pb from "@/lib/pocketbase"
import {
    DiamondPlus,
    MessageCircle,
} from "lucide-react";
import ProfileButton from "./ProfileButton";

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
                <ProfileButton loggedIn={pb.authStore.isValid} />
            </div>
        </div>
    );
}

