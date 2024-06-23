"use client"
import {
    HomeIcon,
    GearIcon,
    MagnifyingGlassIcon,
    EnvelopeClosedIcon,
    HeartIcon,
} from "@radix-ui/react-icons"
import { motion } from "framer-motion"
import React, { useState } from "react"

const TABS = [
    { icon: HomeIcon, label: "Home" },
    { icon: GearIcon, label: "Settings" },
    { icon: MagnifyingGlassIcon, label: "Search" },
    { icon: EnvelopeClosedIcon, label: "Messages" },
    { icon: HeartIcon, label: "Favorites" },
]

const linePath = "M0,40 Q172,10 344,40"
const motionPath = `path("M0,40 Q172,10 344,40")`
const motionHorizontalPadding = 12

export default function CurvedTabBar() {
    const [activeTab, setActiveTab] = useState(1)
    const offsetDistance = `${
        motionHorizontalPadding +
        (activeTab / (TABS.length - 1)) * (100 - motionHorizontalPadding * 2)
    }%`

    return (
        <div className="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden">
            <div
                className="bg-mauve-dark-2 relative -mt-[150%] w-full overflow-hidden sm:-mt-[100%]"
                style={{
                    height: "704px",
                    borderRadius: "54px",
                    width: "344px",
                    boxShadow: "0 0 0 12px #000",
                }}
            >
                <div className="absolute bottom-0 flex h-[100px] w-full flex-col justify-between overflow-hidden">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="344"
                        height="50"
                        preserveAspectRatio="none"
                        viewBox="0 0 344 50"
                    >
                        <path
                            d={linePath}
                            fill="none"
                            className="stroke-mauve-dark-4"
                            strokeWidth="1"
                        />
                    </svg>
                    <motion.div
                        style={{
                            width: "40px",
                            height: "4px",
                            borderRadius: "4px",
                            position: "absolute",
                            left: 0,
                            bottom: "calc(50% - 4px)",
                            background: "white",
                            boxShadow:
                                "rgba(255, 255, 255, 0.4) 0px 0px 20px 10px",
                            zIndex: 10,
                            offsetPath: motionPath,
                        }}
                        initial={{
                            offsetDistance: "0%",
                        }}
                        animate={{
                            offsetDistance,
                        }}
                        transition={{
                            duration: 0.6,
                            ease: [0.32, 0.72, 0, 1],
                        }}
                    />
                    {TABS.map((tab, index) => {
                        const tabDistance = `${
                            motionHorizontalPadding +
                            (index / (TABS.length - 1)) *
                                (100 - motionHorizontalPadding * 2)
                        }%`

                        return (
                            <button
                                className="absolute p-5"
                                style={{
                                    offsetPath: motionPath,
                                    offsetDistance: tabDistance,
                                    top: "28%",
                                }}
                                onClick={() => setActiveTab(index)}
                            >
                                <tab.icon className="text-mauve-dark-12 h-5 w-5" />
                            </button>
                        )
                    })}
                    <div
                        className="pointer-events-none relative z-10 overflow-hidden"
                        style={{
                            filter: "drop-shadow(rgba(0,0,0, 0.5) 0px 3px 10px)",
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="344"
                            height="50"
                            preserveAspectRatio="none"
                            viewBox="0 0 344 50"
                        >
                            <path
                                d="M 0 40 Q 172 10 344 40 V 68 L 0 68 L 0 40"
                                className="fill-mauve-dark-2"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}
