"use client"
import { LogIn, MoveLeft, MoveRight } from "lucide-react"
import { Button } from "../ui/button"
const SubmitButton: React.FC<{
    ispending?: boolean
    children: React.ReactNode
}> = ({ ispending = false, children }) => {
    return (
        <Button
            className="mt-5 w-full rounded-lg py-5"
            type="submit"
            variant={"gradient"}
            loading={ispending}
            disabled={ispending}
        >
            <div className="flex w-28 items-center justify-center gap-1 font-semibold">
                {children}
                <MoveRight className="h-4 w-4" />
            </div>
        </Button>
    )
}

export default SubmitButton
