'use client';
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ClipboardList, MoveRight } from 'lucide-react'
import React from 'react'
import CreateEmploayee from '@/components/dashbaord/employees/create-emploayee';
import NumberTicker from '@/components/dashbaord/globals/counter';
import { CreateCompany } from '@/components/dashbaord/company/create-company';
import LineChar from '@/components/dashbaord/dashbaord/line-char';
import SingleBarChart from '@/components/dashbaord/dashbaord/bar-chart';
const DashboardPage = () => {
    return (
        <div
            className=' relative z-30 gap-2   px-3 flex flex-col justify-start items-start w-full  overflow-x-hidden'
        >
            <div className="w-full mt-24 relative grid grid-cols-1 md:grid-cols-2 gap-3">
                <LineChar/>
                <SingleBarChart/>
            </div>
        </div>

    )
}

export default DashboardPage