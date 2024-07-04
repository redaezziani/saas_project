'use client'
import React from 'react'
import { ConfettiFireworks } from './confetti'

const page = () => {

    return (
        <div className="w-full flex bg-neutral-50/75  flex-col justify-start items-center min-h-screen overflow-hidden relative">
            <ConfettiFireworks/>
            <div className="w-full bg-white absolute top-0 left-0 px-5 h-14  border-b border-slate-400/35 flex justify-between items-center">
                <div className="flex justify-start items-center gap-1">
                    <div className=" size-10 p-1">
                        <img src="/saas-logo.png" alt="logo" className="w-full" />
                    </div>
                    <div className="flex flex-col  justify-start items-start">
                        <h1 className=" text-sm font-medium text-slate-700">
                            SaaS
                        </h1>
                        <p className="text-xs text-slate-400">
                            Checkout the success page
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-32 flex  flex-col gap-2 justify-center items-center text-center">
                <svg
                    className='text-green-500'
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={32} height={32} fill={"none"}>
                    <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M8 12.5L10.5 15L16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h1
                    className='text-lg md:text-xl  mt-2 text-slate-700'
                >
                    Payment Success
                </h1>
                <p
                    className='text-sm max-w-[30rem] text-slate-400'
                >
                    Your payment has been successfully processed injoy with your subscription and feel free to contact us if you have any questions.

                </p>
                <span
                    className=' flex mt-5 justify-center items-center gap-1 text-slate-500 hover:text-slate-600 transition-all ease-in-out duration-300'
                >
                    Continue to dashboard
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={17} height={17} fill={"none"}>
                        <path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
            </div>
            <hr
            className='w-[90%] border-t border-dashed  border-slate-400/35 mt-10'
            />
            <div className="flex mt-5 flex-col gap-3 justify-center items-center text-center">
                <img
                className='w-28 h-28'
                src="/barcode.svg" alt="bar-code" />
            </div>

        </div>
    )
}

export default page