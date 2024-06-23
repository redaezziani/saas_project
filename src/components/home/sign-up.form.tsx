import SignInForm from "../auth/sign-in"

const SignUpWrapper = () => {
    return (
        <div className="relative z-10 flex w-full max-w-lg flex-col items-start justify-start space-y-2 bg-white p-6">
            <div className="mb-10 flex items-center justify-start gap-3">
                <img className="h-8 w-8" src="/saas-logo.png" alt="icon" />
                <h1 className="text-xl font-bold text-slate-800">
                    Talent <span className="text-primary">Track</span>
                </h1>
            </div>
            <h2 className="text-center text-2xl font-bold text-slate-700">
                Sign in to your account
            </h2>
            <p className="w-full text-sm text-slate-500">
                Please sign in to your account to continue
            </p>
            <SignInForm />
        </div>
    )
}

export default SignUpWrapper
