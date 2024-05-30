import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ClipboardList, MoveRight } from 'lucide-react'
import React from 'react'

const DashboardPage = () => {
    return (
        <div
            className=' relative z-30 gap-4  bg-slate-50 h-screen px-6 flex flex-col justify-start items-start w-full  overflow-x-hidden'
        >
            <div className=" w-full mt-14  grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card
                    className=' h-36'
                />
                <Card
                    className=' h-36'
                />
                <Card
                    className=' h-36'
                />
            </div>
            <div className="w-full   grid col-span-1 md:grid-cols-3 gap-4">
                <div className="w-full gap-2 grid grid-cols-1">
                    <Card
                        className=' w-full flex justify-center items-center gap-3 flex-col max-h-96 aspect-square' >
                            <ClipboardList className='w-14 h-14' />
                            <h1
                            className='text-slate-800 capitalize'
                            >
                                you have no expenses yet
                            </h1>
                            <p
                            className='text-slate-400 text-sm'
                            >
                                Add your first expense
                            </p>
                            <Button
                            variant={'outline'}
                            className='flex gap-2 justify-center items-center'
                            >
                                Add Expense <MoveRight className='w-4 h-4' />
                            </Button>
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