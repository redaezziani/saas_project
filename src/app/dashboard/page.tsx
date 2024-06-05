'use client';
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ClipboardList, MoveRight } from 'lucide-react'

import React from 'react'
import CreateEmploayee from '@/components/dashbaord/employees/create-emploayee';
import NumberTicker from '@/components/dashbaord/globals/counter';
import { CreateCompany } from '@/components/dashbaord/company/create-company';
import useSWR from 'swr';
//@ts-ignore
const fetcher = (url) => fetch(url).then((res) => res.json());
const DashboardPage = () => {
    const { data: company } = useSWR('/api/admin/settings', fetcher);
    return (
        <div
            className=' relative z-30 gap-2   px-6 flex flex-col justify-start items-start w-full  overflow-x-hidden'
        >
            {company?.data && (
                <div className="w-full items-center justify-center   h-screen   flex gap-2">
                    <div className="w-full p-3 aspect-video flex justify-center items-center flex-col gap-3  max-w-4xl rounded-lg border border-slate-400/35 bg-white">
                        <img
                            className='w-32  rounded-full'
                            src="/Animation.gif"
                            alt=""
                            srcset=""
                        />
                        <h1
                            className='text-2xl font-semibold text-slate-600'
                        >
                            Welcome to your dashboard
                        </h1>
                        <p
                            className='text-sm text-slate-500'
                        >
                            Here you can manage your company and employees
                        </p>
                        <CreateCompany />
                    </div>
                </div>
            )
            }
            
        </div>

    )
}

export default DashboardPage