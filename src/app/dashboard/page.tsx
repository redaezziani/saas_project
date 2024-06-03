'use client';
import ToasterTest from '@/components/home/toaster-test'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ClipboardList, MoveRight } from 'lucide-react'
import { Toaster } from "@/components/ui/toaster"

import React from 'react'
import CreateEmploayee from '@/components/dashbaord/employees/create-emploayee';
import NumberTicker from '@/components/dashbaord/globals/counter';
const DashboardPage = () => {
   
    return (
        <div
            className=' relative z-30 gap-2   px-6 flex flex-col justify-start items-start w-full  overflow-x-hidden'
        >
          <Toaster />
          <div className="w-full text-slate-500 mt-14  flex gap-2">
            <p>
                Dashbaord / users / ... / home 
            </p>
          </div>
            <div className=" w-full border rounded    divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700 bg-white py-2  mt-3  grid grid-cols-1 md:grid-cols-4 gap-4">
               <div className="w-full border-r border-border p-2 h-32">
                
                </div>
               <div className="w-full border-r border-border p-2 h-32"/>
               <div className="w-full border-r border-border p-2 h-32"/>
               <div className="w-full border-r border-border p-2 h-32"/>

            </div>
            <div className="w-full   grid col-span-1 md:grid-cols-3 gap-2">
                <div className="w-full gap-2 grid grid-cols-1">
                    <Card
                        className=' w-full flex justify-center items-center gap-3 flex-col max-h-96 aspect-square' >
                            <ClipboardList className=' size-8 text-slate-700' />
                            <h1
                            className='text-slate-500  '
                            >
                                you have no expenses yet
                            </h1>
                            <p
                            className='text-slate-400 text-sm'
                            >
                                Add your first expense to see data 
                            </p>
                            <CreateEmploayee/>
                    </Card>
                </div>
                <div className="w-full gap-2 grid grid-cols-1 md:col-span-2 ">
                    <Card
                        className=' w-full max-h-96 aspect-square' />
                </div>
            </div>
        </div>
       
    )
}

export default DashboardPage