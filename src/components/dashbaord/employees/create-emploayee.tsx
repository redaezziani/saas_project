'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import React, { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DatePicker } from '../globals/date-piker';
import useSWR from 'swr';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { EmployeeIcon } from './icons';
//@ts-ignore
const fetcher = (url) => fetch(url).then((res) => res.json());

export const EmployeeSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(50, 'First name cannot exceed 50 characters').nullable(),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50, 'Last name cannot exceed 50 characters').nullable(),
  phone: z.string().regex(/^\d{10}$/, 'Please enter a valid 10-digit phone number').nullable(),
  daySalary: z.number().nonnegative('Day salary cannot be negative').nullable(),
  monthSalary: z.number().nonnegative('Month salary cannot be negative').nullable(),
  hireDate: z.date({ required_error: 'Hire date is required' }),  
  jobTitle: z.string().nonempty('Please enter a job title'),
});

export type Employee = z.infer<typeof EmployeeSchema>;



const CreateEmployee = () => {
  const [isOpened, setIsOpened] = React.useState(false);
  const {data:users} = useSWR('/api/admin/users', fetcher);
  const [userId , setUserId ] = React.useState('')
  const [laoding, setLoading] = React.useState(false)
  const {toast} = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<Employee>({
    resolver: zodResolver(EmployeeSchema),
  });

  const handleDateChange = (date: Date | undefined) => {
    setValue('hireDate', date || undefined)
  }

  const onSubmit = async (data: Employee) => {
   

    try {
      setLoading(true)
      const response = await fetch('/api/admin/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          userId,
        }),
      });
      const json = await response.json();
      console.log(json)
      if (json.status === 200) {
        toast({
          variant: "success",
          title: " open toast",
          description: "the toast are opened",
      })
        setIsOpened(false)
      }
  
      else {
        toast({
          variant: "error",
          title: " open toast",
          description: "the toast are opened",
      })
      }
    } catch (error) {
      console.error(error);

    }
    finally {
      setLoading(false)
    }

  };

  useEffect(() => {
    // lest add a key down event to close the modal and the modal is opened if ctr + e is pressed
    // lets dispaly the browser key envet
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'e') {
        setIsOpened(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };


  }, []);

  return (
    <Sheet open={isOpened} onOpenChange={setIsOpened}>
      <SheetTrigger asChild>
        <Button  className="flex justify-center items-center gap-2">
          <EmployeeIcon />
          <span className="">New employee</span>
        </Button>
      </SheetTrigger>
      <SheetContent side={'right'} className="w-full p-3">
        <div className="w-full flex mt-10 flex-col gap-4 justify-start items-start">
          <div className="w-full space-y-2 justify-start items-start">
            <h2 className="text-lg font-semibold text-slate-700">Create a new Employee</h2>
            <p className="text-sm text-slate-400 font-normal">
              Fill the form below to create a new employee
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
            <div
            className=' flex flex-col gap-3  '
            >
              <Label htmlFor="firstName">First Name</Label>
              <Input
                type="text"
                id="firstName"
                {...register('firstName')}
                className={errors.firstName ? 'border-red-500' : ''}
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
            </div>
            <div
            className=' flex flex-col gap-3  '
            >
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                type="text"
                id="lastName"
                {...register('lastName')}
                className={errors.lastName ? 'border-red-500' : ''}
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
            </div>
            <div
            className=' flex flex-col gap-3  '
            >
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                type="tel"
                id="phone"
                {...register('phone')}
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>
            <div
            className=' flex flex-col gap-3  '
            >
              <Label htmlFor="daySalary">Day Salary</Label>
              <Input
                type="number"
                id="daySalary"
                {...register('daySalary', { valueAsNumber: true })}
                className={errors.daySalary ? 'border-red-500' : ''}
              />
              {errors.daySalary && <p className="text-red-500 text-sm mt-1">{errors.daySalary.message}</p>}
            </div>
            <div
            className=' flex flex-col gap-3  '
            >
              <Label htmlFor="monthSalary">Month Salary</Label>
              <Input
                type="number"
                id="monthSalary"
                {...register('monthSalary', { valueAsNumber: true })}
                className={errors.monthSalary ? 'border-red-500' : ''}
              />
              {errors.monthSalary && <p className="text-red-500 text-sm mt-1">{errors.monthSalary.message}</p>}
            </div>
            <div
            className=' flex flex-col gap-3  '
            >
              <Label htmlFor="hireDate">Hire Date</Label>
              <DatePicker onDateChange={handleDateChange} />
              {errors.hireDate && <p className="text-red-500 text-sm mt-1">{errors.hireDate.message}</p>}
            </div>
            <div
            className=' flex flex-col gap-3  '
            >
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                type="text"
                id="jobTitle"
                {...register('jobTitle')}
                className={errors.jobTitle ? 'border-red-500' : ''}
              />
              {errors.jobTitle && <p className="text-red-500 text-sm mt-1">{errors.jobTitle.message}</p>}
            </div>
            <div
            className=' flex flex-col gap-3  '
            >
              <Label htmlFor="userId">User</Label>
              
                  <Select
                    className={errors.userId ? 'border-red-500' : ''}
                    value={userId}
                      //@ts-ignore   
                      onValueChange={(e) =>setUserId(e)}
                  >
                    <SelectTrigger
                    
                    
                    >
                      <SelectValue
                      placeholder='Select a user'
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup >
                      {users?.data?.map((user) => (
                          <SelectItem
                          key={user.id}
                          value={user.id}>{user.name}</SelectItem>
                      ))}
                        </SelectGroup>
                    </SelectContent>
                  </Select>
              
              {errors.userId && <p className="text-red-500 text-sm mt-1">{errors.userId.message}</p>}
            </div>
            <Button
            disabled={laoding}
            loading={laoding}
            type="submit"
            className="w-full justify-center items-center gap-x-2 font-semibold mt-5">
                <EmployeeIcon />
                Create Employee
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateEmployee;
