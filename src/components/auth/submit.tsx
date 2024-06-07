'use client'
import { LogIn, MoveLeft, MoveRight } from 'lucide-react'
import { Button } from '../ui/button'
const SubmitButton: React.FC<{ ispending?: boolean, children: React.ReactNode }> = ({ ispending = false, children }) => {
  return (
    <Button
      className='w-full bg-custom-blue-600 rounded-lg mt-5'
      type="submit"
      loading={ispending}
      disabled={ispending}
    >
     <div className=" w-28 flex font-semibold justify-center gap-1 items-center">
       {children}
      <MoveRight className="w-4 h-4" />
     </div>
    </Button>
  )
}

export default SubmitButton