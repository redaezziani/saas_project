
import { signIn } from "@/auth"

export function GoogleButton() {
    return (
        <form
            action={async () => {
                "use server"
                await signIn("google",{ redirectTo: "/" })
            }}
            className="w-full"
        >
            <button
                type="submit"
                className="inline-flex rounded-lg h-10 w-full items-center justify-center gap-2  border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"><img
                    src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google"
                    className="h-[18px] w-[18px]" />Continue with
                Google
            </button>
        </form>
    )
} 