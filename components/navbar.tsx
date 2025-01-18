import Image from "next/image";
import {CircleUserRound, DiamondPlus, MessageCircle} from "lucide-react";
import Link from "next/link";

export default function NavBar() {
    return <div className={"p-3 flex justify-between items-center drop-shadow-md bg-white"}>
        <div className="flex items-center gap-2">
            <Image src={"/techtrade.png"} alt={"techtrade"} width={45} height={45} className={""} />
            <div className="text-2xl font-bold flex items-center">
                <span className="text-red-600">Tech</span>
                <span className="text-black">Trade</span>
            </div>
        </div>
        <div className={"gap-x-3 flex"}>
            <Link href={"/post"}><DiamondPlus className={"w-9 h-9"} /></Link>
            <MessageCircle className={"w-9 h-9"} />
            <CircleUserRound className={"w-9 h-9"} />
        </div>
    </div>
}