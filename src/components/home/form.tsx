import { signIn } from "@/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GoogleButton } from "./google-button"

const Credentials = async () => {
  return (
      <div className="w-full bg-white z-10 max-w-lg  p-6 space-y-8  ">
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        <form
          className="space-y-6"
          action={async (formData) => {
            "use server"
            await signIn("credentials", formData)
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <Button
          variant="gradient"
          type="submit" className="w-full">
            Sign In
          </Button>
        </form>
        <GoogleButton />
      </div>
  )
}

export default Credentials
