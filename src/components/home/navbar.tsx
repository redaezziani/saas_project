import { Button } from '../ui/button'
import MobileNavBar from './mobile-nav-bar'
import UserAvatar from './user-avatar'
import SignIn from './sign-in'
import { auth } from '@/auth'

const NavBar = async () => {
    const session = await auth();
    return (
        <nav
            className='sticky top-0 border-b bg-white  border-border   bg-transparent backdrop-blur-md w-full  justify-between items-center  flex gap-4 px-4 py-2  z-50 '
        >
            <div className="flex gap-2 justify-start items-center font-semibold ">
                <img
                    className=" size-11"
                    src="/icon.png"
                    alt="logo"
                />
                <p
                    className=' text-slate-600'
                >
                    Nexsus
                </p>
            </div>
            <div className="flex gap-3 justify-start items-center">
                <div className="md:flex hidden ">
                  
                </div>
                {session && <UserAvatar />}
                {!session && <SignIn />}
                <div
                    className='md:hidden flex gap-4 justify-end items-center'
                >
                    <MobileNavBar />
                </div>
            </div>
        </nav>
    )
}

export default NavBar