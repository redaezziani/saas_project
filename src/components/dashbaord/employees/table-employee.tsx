'use client';
import * as React from 'react';
import { DataTable, ColumnDef } from '@/components/dashbaord/globals/table';
import useSWR from 'swr';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';
import CreateEmployee from './create-emploayee';
import { ActionsWrapper } from './actions-wrapper';
// import CreateEmployee from './create-employee';
// import DeleteEmployees from './delete-employees';
// import UpdateEmployee from './update-employee';

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
  const [selected, setSelected] = React.useState<string[]>([]);

  console.log(res);

  const handleSelect = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((i) => i !== id));
    } else {
      setSelected([...selected, id]);
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
          />
        </div>
      ),
    },
  ];

  if (error) return <div>Failed to load</div>;
  if (!res) return (
    <div className="w-full flex h-96 justify-center gap-2 items-center mt-10 text-slate-400">
      <Loader2 size="20" className="animate-spin duration-300 ease-out text-slate-400" />
      <p>Loading...</p>
    </div>
  );

  return (
    <div className="w-full flex justify-start items-start gap-2 flex-col">
      <DataTable
        //@ts-ignore
        columns={!error && columns}
        data={!error && res.data}
        element={
          <>
            {/* <DeleteEmployees selected={selected} />
            <CreateEmployee /> */}
            <CreateEmployee />
          </>
        }
      />
    </div>
  );
};

export default EmployeesTable;
