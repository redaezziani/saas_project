'use client';
import { Button } from '@/components/ui/button'
import MobileNavBar from './mobile-nav-bar'
import UserAvatar from './user-avatar'
import { Bell } from 'lucide-react';
import { Input } from '@/components/ui/input'
import {  Search, SearchSlashIcon } from 'lucide-react';



const NavBar =  () => {
    return (
        <nav
            className='sticky top-0 border-b bg-white  border-border   bg-transparent backdrop-blur-md w-full  justify-between items-center  flex gap-4 px-4 py-2  z-50 '
        >
            <div className="flex  gap-3 justify-start items-center">
        <img
        className="w-6 h-6"
        src="/saas-logo.png"
        alt="icon"
        />
        <h1 className="text-md font-bold text-slate-800">
        Talent <span
        className="   text-primary"
        >Track</span>
        </h1>
      </div>
            <div className=" hidden md:flex relative w-full max-w-lg justify-start items-center ">
                <Search className=' text-slate-400 absolute right-3 w-5 h-5'/>
                <Input
                   
                placeholder=' search for somthing...'
                />
            </div>
            <div className="flex gap-3 justify-start items-center">
                <div className="md:flex hidden ">
                  
                </div>
                <Button
                    variant='icon'
                    className='text-slate-500'
                >
                    <Bell
                    size={18}
                    />
                </Button>
                <UserAvatar />
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