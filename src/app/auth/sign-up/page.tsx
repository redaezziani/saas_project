import { MoveLeft } from "lucide-react"
import Link from "next/link"
import SignUpForm from "@/components/auth/sign-up"
import Image from "next/image"
import { SVGLineGlowAnimateContainer } from "@/components/dashbaord/globals/three-lines"
export default function SignUpPage() {
    return (
        <section className="relative grid h-screen w-full grid-cols-1 gap-3 overflow-hidden md:grid-cols-2">
            <div className="relative col-span-1 flex h-screen w-full items-center justify-center">
                <div className="absolute left-5 top-4 flex w-full items-start justify-start">
                    <Link
                        href="/"
                        className="flex cursor-pointer items-center gap-1 text-slate-400 transition-colors duration-200 ease-in-out hover:text-slate-500"
                    >
                        <MoveLeft className="" size={18} />
                        Back to home
                    </Link>
                </div>
                <SignUpForm />
            </div>
            <div className="relative col-span-1 hidden h-screen w-full items-center justify-center overflow-hidden border-l border-neutral-400/25 bg-neutral-950 md:flex">
                <div className="absolute -top-80 h-72 w-[580px] rounded-s-full bg-[#1B8EF2]/70 blur-[200px]" />
                <img
                    src="/c.png"
                    className="absolute -top-96 w-[70%] opacity-10"
                    alt=""
                />
                <SVGLineGlowAnimateContainer />
            </div>
        </section>
    )
}
