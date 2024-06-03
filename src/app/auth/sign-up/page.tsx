import {  MoveLeft } from "lucide-react";
import Link from "next/link";
import SignUpForm from "@/components/auth/sign-up";
export default function SignUpPage() {
  return (
    <section
      className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 relative  h-screen overflow-hidden"
    >
      <div className="w-full  col-span-1 flex h-screen relative justify-center items-center">
        <div className="w-full absolute top-4 left-5  flex justify-start items-start">
          <Link
            href="/"
            className="flex gap-1 cursor-pointer text-slate-400 hover:text-slate-500 transition-colors duration-200 ease-in-out items-center"
          >
            <MoveLeft
              className=""
              size={18} />
              Back to home 
          </Link>
        </div>
        <SignUpForm />
      </div>
      <div className="w-full h-screen pt-3 col-span-1 hidden overflow-hidden md:block">
        <img
          alt="Image"
          className="object-cover border border-border rounded-tl-xl w-full h-full"
          src="/image.png"
        />
      </div>
    </section>
  );
}
