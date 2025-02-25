'use client';
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { useEffect, useRef } from "react";
import { logoutUser } from "@/lib/pocketbase";
import './globals.css';
import Link from "next/link";
import pb  from "@/lib/pocketbase"
import {useRouter} from "next/navigation"

export default function Home() {
    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

	const router = useRouter()
	if (pb.authStore.isValid) {
		router.replace("/marketplace")
	}


    return (
        <section
            id="/"
            className="relative h-screen overflow-hidden flex"
        >
            <div className="relative">
                <div className="absolute bg-[rgba(0,0,0,0.5)] w-screen h-full" />
                <div className="grid grid-rows-3 grid-cols-4 gap-2 p-2 h-full w-screen">
                    <div className="w-full h-full rounded-xl"><img src="/example_items/example1.jpg" className="rounded-xl object-cover max-h-full w-full" /></div>
                    <div className="w-full h-full rounded-xl"><img src="/example_items/example2.png" className="rounded-xl object-cover max-h-full w-full" /></div>
                    <div className="w-full h-full rounded-xl"><img src="/example_items/example3.jpg" className="rounded-xl object-cover max-h-full w-full" /></div>
                    <div className="w-full h-full rounded-xl"><img src="/example_items/example4.jpg" className="rounded-xl object-cover max-h-full w-full" /></div>
                    <div className="w-full h-full rounded-xl"><img src="/example_items/example5.jpg" className="rounded-xl object-cover max-h-full w-full" /></div>
                    <div className="w-full h-full rounded-xl"><img src="/example_items/example6.png" className="rounded-xl object-cover max-h-full w-full" /></div>
                    <div className="w-full h-full rounded-xl"><img src="/example_items/example7.png" className="rounded-xl object-cover max-h-full w-full" /></div>
                    <div className="w-full h-full rounded-xl"><img src="/example_items/example8.png" className="rounded-xl object-cover max-h-full w-full" /></div>
                    <div className="w-full h-full rounded-xl"><img src="/example_items/example9.png" className="rounded-xl object-cover max-h-full w-full" /></div>
                    <div className="w-full h-full rounded-xl"><img src="/example_items/example10.png" className="rounded-xl object-cover max-h-full w-full" /></div>
                    <div className="w-full h-full rounded-xl"><img src="/example_items/example11.png" className="rounded-xl object-cover max-h-full w-full" /></div>
                    <div className="w-full h-full rounded-xl"><img src="/example_items/example12.png" className="rounded-xl object-cover max-h-full w-full" /></div>
                </div></div>
            <div className="top-1/2 left-1/2 bg-white p-6 py-8 rounded-lg absolute translate-y-[-50%] translate-x-[-50%] ">
                <div className={"absolute  size-full  -z-10 rounded-2xl"}/>
                <motion.h1
                    className="font-[600] text-5xl lg:text-6xl text-center mb-4"
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: 0 }}
                >
                    Learning, made affordable
                </motion.h1>
                <motion.p
                    className="text-gray-400 font-[500] font-semibold text-md lg:text-xl text-center"
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: 1 }}
                >
                    Buy and sell with the WPI community.
                    <br />Fast, simple, and right on campus
                </motion.p>
                <motion.p
                    className="text-gray-400 font-[500]  text-md lg:text-xl text-center"
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: 1.5 }}
                >
                    <br /> Ready to trade?
                </motion.p>
                <motion.p className="flex justify-center items-center mt-4">

                    <Link href="/marketplace" className="flex w-fit gap-2 btn btn-primary items-center">
                        <span>Get Started</span>
                        <ArrowRight />
                    </Link>
                </motion.p>


            </div>


            <div className="absolute inset-0 pointer-events-none" />

        </section>
    );
}
