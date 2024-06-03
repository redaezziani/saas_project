import SignInForm from "../auth/sign-in";



const SignUpWrapper = () => {
  
  return (
    <div className=" w-full max-w-lg relative  z-10 flex-col flex justify-start bg-white  items-start  p-6 space-y-2 ">
      <h2 className="text-2xl font-bold text-center">
       Create an account 🚀
      </h2>
      <p
      className=" text-slate-500 text-sm w-full"
      >
        Sign up to get started with our services
      </p>
      <SignInForm />
    </div>
  );
};

export default SignUpWrapper;
