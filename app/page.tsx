'use client';
"use client"
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useRef } from "react";

import './globals.css';

export default function Home() {
    const imageVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    // Animation configuration for text
    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const arrowVariants = {
        bounce: {
            y: [0, -10, 0],
            transition: {
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    };
    const smoothScrollTo = (target: HTMLElement, duration: number) => {
        const startPosition = window.pageYOffset; // Current scroll position
        const targetPosition = target.getBoundingClientRect().top + startPosition; // Target position
        const distance = targetPosition - startPosition; // Total distance to scroll
        let startTime: number | null = null; // Initialize start time

        const animation = (currentTime: number) => {
            if (startTime === null) startTime = currentTime; // Set start time

            const timeElapsed = currentTime - startTime; // Calculate elapsed time
            const progress = Math.min(timeElapsed / duration, 1); // Calculate progress

            // Easing function (easeInOut)
            const ease = (t: number) => {
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            };

            // Scroll to position
            window.scrollTo(0, startPosition + distance * ease(progress));

            if (progress < 1) {
                requestAnimationFrame(animation); // Continue animation
            }
        };

        requestAnimationFrame(animation); // Start animation
    };
    // Ref for the next section
    const nextSectionRef = useRef(null);
    // Handle scroll to next section
    const handleArrowClick = () => {
        const targetElement = document.getElementById("about");
        if (targetElement) {
            smoothScrollTo(targetElement, 1000); // Adjust the duration as needed (in milliseconds)
        }
    };

    return (
        <section
            id="/"
            className="relative h-screen overflow-hidden flex"
        >
            <div className="relative">
                <div className="absolute bg-[rgba(0,0,0,0.5)] w-full h-full" />
                <div className="grid grid-rows-3 grid-cols-4 gap-2 p-2 h-full w-full">
                    <div className="w-full h-full rounded-xl"><img src="/image1.jpg" className="rounded-xl object-cover max-h-full w-full" /></div>
                    <div className="w-full h-full rounded-xl"><img src="/image1.jpg" className="rounded-xl object-cover max-h-full w-full" /></div>
                    <div className="w-full h-full rounded-xl"><img src="/image1.jpg" className="rounded-xl object-cover max-h-full w-full" /></div>
                    <div className="w-full h-full rounded-xl"><img src="/image1.jpg" className="rounded-xl object-cover max-h-full w-full" /></div>
                    <div className="w-full h-full rounded-xl"><img src="/image1.jpg" className="rounded-xl object-cover max-h-full w-full" /></div>
                    <div className="w-full h-full rounded-xl"><img src="/image1.jpg" className="rounded-xl object-cover max-h-full w-full" /></div>
                    <div className="w-full h-full rounded-xl"><img src="/image1.jpg" className="rounded-xl object-cover max-h-full w-full" /></div>
                    <div className="w-full h-full rounded-xl"><img src="/image1.jpg" className="rounded-xl object-cover max-h-full w-full" /></div>
                    <div className="w-full h-full rounded-xl"><img src="/image1.jpg" className="rounded-xl object-cover max-h-full w-full" /></div>
                    <div className="w-full h-full rounded-xl"><img src="/image1.jpg" className="rounded-xl object-cover max-h-full w-full" /></div>
                    <div className="w-full h-full rounded-xl"><img src="/image1.jpg" className="rounded-xl object-cover max-h-full w-full" /></div>
                    <div className="w-full h-full rounded-xl"><img src="/image1.jpg" className="rounded-xl object-cover max-h-full w-full" /></div>
                </div></div>
            <div className="top-1/2 left-1/2 absolute translate-y-[-50%] translate-x-[-50%]">
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
                <motion.p className="flex justify-center items-center">

                    <button className="flex items-center space-x-2 bg-red-600 text-white p-4 rounded-md hover:bg-red-700">
                        <span>Get Started</span>
                        <ArrowRight />
                    </button>
                </motion.p>


            </div>


            <div className="absolute inset-0 pointer-events-none" />
            <section ref={nextSectionRef} className="h-screen bg-gray-200 flex items-center justify-center">

            </section>

        </section>
        //test
    );
}
