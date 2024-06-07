'use client';
import * as React from 'react';
import { DataTable, ColumnDef } from '@/components/dashbaord/globals/table';
import useSWR from 'swr';
import { Checkbox } from '@/components/ui/checkbox';
import { Download, RefreshCcw, SquareDashedMousePointer, Trash } from 'lucide-react';
import CreateEmployee from './create-emploayee';
import { ActionsWrapper } from './actions-wrapper';
import { Button } from '@/components/ui/button';
import { mutate } from 'swr';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SaveEmployee } from './save-employee-data';
import { useToast } from '@/components/ui/use-toast';

interface EmployeeType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  hireDate: string;
  jobTitle: string;
  department: string;
  monthSalary: number;
  status: string;
}


//@ts-ignore
const fetcher = (url) => fetch(url).then((res) => res.json());

const EmployeesTable = () => {
  const { data: res, error } = useSWR('/api/admin/employees', fetcher);
  const [selected, setSelected] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const { toast } = useToast();
  const [isRefresh, setIsRefresh] = useState(false);

  const selectedEmployees = res?.data.filter((employee: EmployeeType) => selected.includes(employee.id));

  const handleSelect = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((i) => i !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelected(selectAll ? [] : res.data.map(employee => employee.id));
  };

  const handleRefresh = () => {
   try {
    setIsRefresh(true);
    mutate('/api/admin/employees');
    setTimeout(() => {
      setIsRefresh(false);
    }, 1000);
   } catch (error) {
    console.error('An unexpected error happened:', error);
   }
   finally {
    setIsRefresh(false);
   }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch('/api/admin/employees', {
        method: 'DELETE',
        body: JSON.stringify({ arrayId: selected }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        mutate('/api/admin/employees');
        setSelected([]);
        toast({
          variant: "success",
          title: "Employee created",
          description: "The employee has been created successfully",
        });
      }


    } catch (error) {
      console.error('An unexpected error happened:', error);
    }
  }

  const columns: ColumnDef<EmployeeType>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => <div>{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'checkbox',
      header: 'Select',
      cell: ({ row }) => (
        <div className="px-4">
          <Checkbox
            checked={selected.includes(row.getValue('id'))}
            onCheckedChange={() => handleSelect(row.getValue('id'))}
          />
        </div>
      ),
    },
    {
      accessorKey: 'firstName',
      header: 'First Name',
      cell: ({ row }) => <div className="text-slate-600 dark:text-slate-100">{row.getValue('firstName')}</div>,
    },
    {
      accessorKey: 'lastName',
      header: 'Last Name',
      cell: ({ row }) => <div className="text-slate-600 dark:text-slate-100">{row.getValue('lastName')}</div>,
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
      cell: ({ row }) => <div className="text-slate-600 dark:text-slate-100">+ {row.getValue('phone')}</div>,
    },

    {
      accessorKey: 'jobTitle',
      header: 'Job Title',
      cell: ({ row }) => <div className="text-slate-600 dark:text-slate-100">{row.getValue('jobTitle')}</div>,
    },

    {
      accessorKey: 'monthSalary',
      header: 'Salary',
      cell: ({ row }) => <div className="text-slate-600 dark:text-slate-100">{row.getValue('monthSalary')} DH</div>,
    },

    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div>
          <ActionsWrapper
            id={row.getValue('id')}
          />
        </div>
      ),
    },
  ];

  if (error) return <div>Failed to load</div>;
  if (!res) return (
    <div className="w-full flex h-96 flex-col  justify-center gap-2 items-center mt-10 text-slate-400">
      <img
      className=' w-32 aspect-auto'
      src="/make-you-a-neat-lil-gif.gif"
      alt="loading" 
      srcset="" />
      <p
      className=' text-slate-500'
      >
        loading ...
      </p>
       
    </div>
  );

  return (
    <div className="w-full flex justify-start items-start gap-2 flex-col">
      <DataTable
        //@ts-ignore
        columns={!error && columns}
        data={!error && res.data}
        element={
          <
          >
            {selected.length > 1 && (
             
              <Button
                onClick={handleDelete}
        
                variant={'outline'}
                className='flex items-center text-red-500 hover:text-red-600  gap-2'
              >
                <Trash size={18} className="mr-2" />
                Delete
              </Button>
            )}
            {selected.length > 0 && (<SaveEmployee
              employees={selectedEmployees}
            />)}
            <Button
              variant={'outline'}
              className='flex items-center  text-slate-500 '
            onClick={handleSelectAll}>
              <SquareDashedMousePointer size={18}  />
            </Button>
            <Button 
            variant={'outline'}
            disabled={isRefresh}
            className={`flex items-center text-slate-500 ${isRefresh && 'cursor-not-allowed text-slate-800'}`}
            onClick={handleRefresh}>
              <RefreshCcw size={18} 
              className={` ${isRefresh && 'animate-spin'}`}
              />
            </Button>
            <CreateEmployee />
          </>
        }
      />
    </div>
  );
};


export default EmployeesTable;
