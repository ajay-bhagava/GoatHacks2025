"use client"
import NavBar from "@/components/navbar";
import Image from 'next/image';
import { motion } from 'framer-motion';
import {AnimatedTooltip} from "@/components/animatedToolTip";

const people = [
    {
        id: 1,
        name: "Jeremy Kurtz",
        designation: "Front End CS '26",
        image:"/profiles/jmkurtz.jpg",
    },
    {
        id: 2,
        name: "Chris Lam",
        designation: "Front End CS '26",
        image:
            "/profiles/Clam.jpg"
    },
    {
        id: 3,
        name: "Arnav Mishra",
        designation: "Back End CS '25",
        image:"/profiles/AMishra.jpg"

    },
    {
        id: 4,
        name: "Brandon Yeu",
        designation: "Back End CS '26",
        image:"/profiles/Byeu.jpg",
    },
    {
        id: 5,
        name: "Ajay Bhagavatula",
        designation: "Back End BS-CS DS-MS '26",
        image:"/profiles/Ajay.jpeg",
    },
];

export default function Page() {
    return (
        <div className="h-full flex flex-col">
            <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
                <NavBar/>
            </div>
            <div className="flex h-full -z-20 overflow-hidden">

                <Image
                    width={1080}
                    height={540}
                    className="hidden lg:block lg:w-1/2 lg:h-full absolute object-cover"
                    aria-label="A picture of kaven hall at WPI in autumn"
                    src='/kaven.png'
                    alt="kaven hall"
                />

                <div className="fixed top-0 right-0 bg-white w-full lg:w-1/2 h-full overflow-y-auto">
                    <div className="pt-28 px-14 text-xl">
                         <span className="font-bold  text-3xl lg:text-4xl inline-block pb-5">
                            What is
                            <span className="text-red-600 inline"> Tech</span>
                            Trade?
                        </span>
                        <h1 className="font-bold mb-2">General Information</h1>
                        <p>
                            TechTrade was developed in January 2025 for WPI's annual Goathacks Hackathon.
                            The goal of this project was to create a platform for WPI Students to buy and sell their
                            belongings. Inspired by Facebook Marketplace, the team wanted a place to sell their unwanted
                            WPI related belongings, such as textbooks, toolkits, school supplies and more.
                        </p>
                        <br/>
                        <h1 className="font-bold mb-2">Future Ideas for TechTrade</h1>
                        <p>
                            In the future we would want to implement chat functionality so that people can communicate
                            within the platform instead of contacting them through an email. Verify users are WPI students
                            by using their WPI email.
                        </p>
                        <p className="pt-5 font-bold">Meet our Team Behind this Project</p>
                        <div className="flex flex-row items-center justify-center pt-10 w-full">
                            <AnimatedTooltip items={people}/>
                        </div>
                        <motion.div className="inline-flex items-center pt-5 gap-2">
                            <p className="inline">Thank you from the <span className="text-red-600 font-bold">TechTrade team</span>
                            </p>
                            <motion.div
                                className="size-fit inline"
                                animate={{rotate: 360}}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            >
                            </motion.div>
                        </motion.div>

                        <p>Jeremy Kurtz, Chris Lam, Arnav Mishra, Brandon Yeu, Ajay Bhagavatula</p>
                        <br/>
                        <br/>
                    </div>
                </div>
            </div>
        </div>
    );
}
