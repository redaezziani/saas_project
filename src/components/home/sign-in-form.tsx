import SignInForm from "../auth/sign-in";



const SignInWrapper = () => {
  
  return (
    <div className=" w-full max-w-lg  z-10 flex-col flex justify-start bg-white  items-start  p-6 space-y-2 ">
      <div className="flex mb-14 gap-3 justify-start items-center">
        <img
        className="w-8 h-8"
        src="/icon.svg"
        alt="icon"
        />
        <h1 className="text-2xl font-bold text-slate-800">
        Talent <span
        className="   text-primary"
        >Track</span>
        </h1>
      </div>
      <h2 className="text-2xl font-bold text-slate-700 text-center">
        Sign in to your account
      </h2>
      <p
      className=" text-slate-500 text-sm w-full"
      >
       Please sign in to your account to continue
      </p>
      <SignInForm />
    </div>
  );
};

export default SignInWrapper;
