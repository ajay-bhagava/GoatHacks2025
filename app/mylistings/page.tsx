import Image from "next/image";
import { CircleUserRound, DiamondPlus, MessageCircle } from "lucide-react";
import Content from "@/app/mylistings/Content";
import NavBar from "@/components/navbar";

export default function page() {
    return (
        <>
            <NavBar/>
            <Content />
        </>
    );
}