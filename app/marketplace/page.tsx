import Image from "next/image";
import {CircleUserRound, MessageCircle} from "lucide-react";
import Content from "@/app/marketplace/Content";

export default function page() {
    return (
        <>
            <div className={"p-5 flex justify-between items-center"}>
                <Image src={"/techtrade.png"} alt={"techtrade"} width={45} height={45}/>
                <div className={"gap-x-3 flex"}>
                    <MessageCircle className={"w-10 h-10"}/>
                    <CircleUserRound className={"w-10 h-10"}/>
                </div>
            </div>
            <Content/>
        </>

    )
}