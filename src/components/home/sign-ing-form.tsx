import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Credentials from "../auth/credentials";
import { GoogleButton } from "../auth/google-button";
import { GitHubButton } from "../auth/github.button";

const SignInForm = () => {
  
  return (
    <div className=" w-full max-w-lg  z-10 flex-col flex justify-start bg-white  items-start  p-6 space-y-4 ">
      <h2 className="text-2xl font-bold text-center">Sign In</h2>
      <p
      className=" text-slate-500 text-sm w-full"
      >
        Sign in to your account to continue
      </p>
      <Credentials />
      <h1
      className="text-center text-slate-500 text-sm w-full"
      >
        Or
      </h1>
      <GoogleButton />
      <GitHubButton />
    </div>
  );
};

export default SignInForm;
