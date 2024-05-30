import Credentials from "@/components/home/sign-ing-form";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import SignInForm from "@/components/home/sign-ing-form";
export default function SignInPage() {
  return (
    <section
      className=" w-full grid grid-cols-1 md:grid-cols-2 gap-3 relative  h-screen overflow-hidden"
    >
      <div className="w-full  col-span-1 flex h-screen relative justify-center items-center">
        <div className="w-full absolute top-4 left-5  flex justify-start items-start">
          <Link
            href="/"
            className="flex cursor-pointer text-slate-500 hover:text-slate-600 transition-colors duration-200 ease-in-out items-center"
          >
            <ChevronLeft
              className=""
              size={18} />
              back to home 
          </Link>
        </div>
        <SignInForm />
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
