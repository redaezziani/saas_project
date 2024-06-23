import { MoveLeft } from "lucide-react"
import Link from "next/link"
import SignInForm from "@/components/home/sign-in-form"
import Image from "next/image"
export default function SignInPage() {
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
                <SignInForm />
            </div>
            <div className="relative col-span-1 hidden h-screen w-full items-center justify-center overflow-hidden md:flex">
                <div className="absolute bottom-10 z-10 flex w-full max-w-[90%] flex-col items-start justify-start rounded-md bg-white/15 p-3 backdrop-blur-sm">
                    <h1 className="text-white">
                        Experience a new era of productivity and collaboration
                        with our cutting-edge SaaS app. Designed to streamline
                        your workflow and empower your team, our platform offers
                        a suite of intuitive tools and features that will
                        revolutionize the way you work.
                    </h1>
                </div>
                <Image
                    fill
                    alt="Image"
                    className="h-full w-full object-cover"
                    src="/auth-img.jpg"
                    placeholder="blur"
                    blurDataURL="/auth-img.jpg"
                />
            </div>
        </section>
    )
}
