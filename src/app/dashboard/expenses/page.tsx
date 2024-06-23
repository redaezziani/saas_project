'use client'

import { Card } from '@/components/ui/card';
import React from 'react'
import useSWR from 'swr'

interface Expense {
    id: string;
    name: string;
    amount: number;
    createdAt: string;
}

interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    jobTitle: string;
    hireDate: string;
}

interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: string;
}

interface Project {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    budget: number;
}

interface Company {
    name: string;
    companyEmail: string;
    compnayPhone: string;
    companyAddress: string;
    companyCity: string;
    expenses: Expense[];
    employees: Employee[];
    notes: Note[];
    projects: Project[];
}

interface Expenses {
    status: number;
    message: string;
    data: {
        company: Company;
        totalExpenses: number;
        totalEmployees: number;
        totalAmount: number;
    };
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const ExpensesPage = () => {
    const { data: expenses, error } = useSWR("/api/admin/expenses", fetcher) as { data: Expenses, error: any }

    if (error) return <div>failed to load</div>
    if (!expenses) return <div>loading...</div>
    console.log(expenses)

    const { company } = expenses.data;

    return (
        <div className="relative z-30 flex w-full flex-col items-start justify-start gap-2 overflow-x-hidden px-6">
            <div className="mt-20 flex flex-col items-start justify-start gap-1">
                <h1 className="text-xl font-semibold text-slate-700">
                    Expenses 
                </h1>
                <p className="text-sm text-slate-400">
                    Manage all expenses in the company
                </p>
            </div>
            <div className="mt-3 w-full gap-4 flex flex-col justify-start items-start">
               <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-3">
                   <Card
                       className='bg-white border border-slate-400/35 flex flex-col gap-3 justify-start items-start relative w-full p-6 rounded-lg  col-span-1'
                       title="Total Expenses">
                       <div className="flex flex-col items-start justify-start gap-1">
                           <p className="text-sm text-slate-400">
                               Total Expenses
                           </p>
                           <p className="text-lg md:text-xl text-slate-600 font-medium">
                               {expenses.data.totalExpenses} 
                           </p>
                       </div>
                   </Card>
                   <Card
                       className='bg-white border border-slate-400/35 flex flex-col gap-3 justify-start items-start relative w-full p-6 rounded-lg  col-span-1'
                       title="Total Employees">
                       <div className="flex flex-col items-start justify-start gap-1">
                           <p className="text-sm text-slate-400">
                               Total Employees
                           </p>
                           <p className="text-lg md:text-xl text-slate-600 font-medium">
                               {expenses.data.totalEmployees}
                           </p>
                       </div>
                   </Card>
                   <Card
                       className='bg-white border border-slate-400/35 flex flex-col gap-3 justify-start items-start relative w-full p-6 rounded-lg  col-span-1'
                       title="Total Amount">
                       <div className="flex flex-col items-start justify-start gap-1">
                           <p className="text-sm text-slate-400">
                               Total Amount
                           </p>
                           <p className="text-lg md:text-xl text-slate-600 font-medium">
                               {expenses.data.totalAmount} DH
                           </p>
                       </div>
                   </Card>
               </div>
               <div className="w-full mt-6">
                   <h2 className="text-lg font-semibold text-slate-700">Expenses Details</h2>
                   {company.expenses.map(expense => (
                       <div key={expense.id} className="border-b border-slate-200 py-2">
                           <p className="text-sm text-slate-400">Name: {expense.name}</p>
                           <p className="text-sm text-slate-400">Amount: {expense.amount}</p>
                           <p className="text-sm text-slate-400">Date: {expense.createdAt}</p>
                       </div>
                   ))}
               </div>
            </div>
        </div>
    )
}

export default ExpensesPage
