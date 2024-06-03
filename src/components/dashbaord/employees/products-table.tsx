'use client';
import * as React from 'react';
import { DataTable, ColumnDef } from './table';
import useSWR from 'swr';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';

import CreateProducts from './create-products';
import DeleteProducts from './delete-products';
import UpdateProduct from './update-product';
import ActiveBadge from './badges/active';
import InActiveBadge from './badges/in-active';
import { Switch } from '@/components/ui/switch';
import SwitchActive from './update-active';

interface ProductType {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  currency: string;
}
//@ts-ignore
const fetcher = (url) => fetch(url).then((res) => res.json());
const ProductsTable = () => {
  const { data: res, error } = useSWR('/api/products', fetcher, { refreshInterval: 5000 });
  const [selected, setSelected] = React.useState<string[]>([]);

  const handleSelect = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((i) => i !== id));
    } else {
      setSelected([...selected, id]);
    }
  }

  const columns: ColumnDef<ProductType>[] = [
    {
      accessorKey: 'id',
      header: 'معرف',
      cell: ({ row }) => <div
        className=''
      >{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'ckeckbox',
      header: 'التحديد',
      cell: ({ row }) => <div
        className='px-4'
      >
        <Checkbox

          checked={selected.includes(row.getValue('id'))}
          onCheckedChange={(e) =>
            handleSelect(row.getValue('id'))
          }

        />
      </div>,
    },
    {
      accessorKey: 'name',
      header: 'الاسم',
      cell: ({ row }) => <div
        className='line-clamp-1 text-slate-600 dark:text-slate-100'
      >{row.getValue('name')}</div>,
    },
    {
      accessorKey: 'description',
      header: 'الوصف',
      cell: ({ row }) =>
        <div
          className=' line-clamp-1 text-slate-600 dark:text-slate-100 max-w-lg'
        >{row.getValue('description')}</div>,
    },
    {
      accessorKey: 'price',
      header: 'السعر',
      cell: ({ row }) => <div
        className=' text-slate-600 dark:text-slate-100'
      >{row.getValue('price')}</div>,
    },
    {
      accessorKey: 'image',
      header: 'الصورة',
      cell: ({ row }) => <img
        src={row.getValue('image')}
        alt={row.getValue('name')}
        className=' h-10 w-10 object-cover rounded-full'
      />,
    },
    {
      accessorKey: 'isActive',
      header: 'الوضع',
      cell: ({ row }) => <div
        className=' text-slate-600 dark:text-slate-100'
      >
        <SwitchActive
          id={row.getValue('id')}
          isActive={row.getValue('isActive')}
        />
      </div>,
    },
    {
      accessorKey: 'stock',
      header: 'المخزون',
      cell: ({ row }) => <div
        className=' text-slate-600 dark:text-slate-100'
      >{row.getValue('stock')}</div>,
    },
    {
      accessorKey: 'currency',
      header: 'العملة',
      cell: ({ row }) =>
      <div className='text-slate-600 dark:text-slate-100'>
       {row.getValue("currency")==='USD' ? 'دولار' : row.getValue("currency")==='EUR' ? 'يورو' : row.getValue("currency")==='MAD' ? 'درهم' : row.getValue("currency")==='AED' ? 'درهم' : row.getValue("currency")==='SAR' ? 'ريال' : row.getValue("currency")==='QAR' ? 'ريال' : row.getValue("currency")==='KWD' ? 'دينار' : row.getValue("currency")==='BHD' ? 'دينار' : row.getValue("currency")==='OMR' ? 'ريال' : 'غير معروف'}
      </div>,
    },
    {
      accessorKey: 'none',
      header: 'حالة المنتج',
      cell: ({ row }) => (
        <>
        
        {
          //@ts-ignore
        row.getValue('stock') > 0 ? <ActiveBadge /> : <InActiveBadge />}
        </>
      ),

    },
    {
      accessorKey: 'none',
      header: 'الإجراءات',
      cell: ({ row }) =>
        <div>
          <UpdateProduct
            id={row.getValue('id')}
            name={row.getValue('name')}
            stock={row.getValue('stock')}
            description={row.getValue('description')}
            price={row.getValue('price')}
            currency={row.getValue('currency')}
            image={row.getValue('image')}
          />
        </div>,
    },

  ];
  if (error) return <div>failed to load</div>
  if (!res) return (
    <div
      className=' w-full flex h-96 justify-center gap-2 items-center mt-10 text-slate-400'
    >
      <Loader2
        size='20'
        className=' animate-spin duration-300 ease-out text-slate-400'
      />
      <p>
        Loading...
      </p>
    </div>)
  return (
    <div className="w-full flex justify-start items-start gap-2 flex-col">


      <DataTable
        //@ts-ignore
        columns={!error && columns}
        data={!error && res.data}
        element={<>
          <DeleteProducts selected={selected} />
          <CreateProducts />
        </>}
      />
    </div>
  );
};


export default ProductsTable;
