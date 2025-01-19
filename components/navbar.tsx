import Image from "next/image";
import {Info, DiamondPlus, MessageCircle} from "lucide-react";
import Link from "next/link";

export default function NavBar() {
    return <div className={"p-3 flex justify-between items-center drop-shadow-md bg-white z-30"}>
        <Link href={"/marketplace"}>
            <div className="flex items-center gap-2">
                <Image src={"/techtrade.png"} alt={"techtrade"} width={45} height={45} className={""}/>
                <div className="text-2xl font-bold flex items-center">
                    <span className="text-red-600">Tech</span>
                    <span className="text-black">Trade</span>
                </div>
            </div>
        </Link>
        <div className={"gap-x-3 flex"}>
            <Link href={"/post"}><DiamondPlus className={"w-9 h-9"}/></Link>
            <MessageCircle className={"w-9 h-9"}/>
            <Link href={"/about"}><Info className={"w-9 h-9"}/></Link>
        </div>
    </div>
}