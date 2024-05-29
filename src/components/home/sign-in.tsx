import { signIn } from "@/auth"
import { Button } from '../ui/button'


const SignIn = () => {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <Button
        type="submit"
      >
        sign in
      </Button>
    </form>
  )
}

export default SignIn