'use client';
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ClipboardList, MoveRight } from 'lucide-react'

import React from 'react'
import CreateEmploayee from '@/components/dashbaord/employees/create-emploayee';
import NumberTicker from '@/components/dashbaord/globals/counter';
import EmployeesTable from '@/components/dashbaord/employees/table-employee';
const DashboardPage = () => {
   
    return (
        <div
            className=' relative z-30 gap-2   px-6 flex flex-col justify-start items-start w-full  overflow-x-hidden'
        > 
          <div className="flex mt-20 justify-start items-start flex-col gap-1">
            <h1
            className=' text-xl font-semibold text-slate-700'
            >
                Employees
            </h1>
            <p
            className=' text-slate-400 text-sm'
            >
                Manage all employees in the company
                
            </p>

          </div>
            <div className=" w-full border rounded-lg    dark:border-neutral-700 dark:divide-neutral-700 bg-white  mt-3   gap-4">
               <EmployeesTable />
            </div>
           
        </div>
       
    )
}

export default DashboardPage