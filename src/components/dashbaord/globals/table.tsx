import * as React from "react";
import {
    DotsHorizontalIcon
} from "@radix-ui/react-icons";
import {
    SortingState,
    ColumnFiltersState,
    VisibilityState,
    flexRender,
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    ColumnDef,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoveLeft, SearchIcon } from "lucide-react";
import { FilterIcon } from "../employees/icons";

export type DataItem = Record<string, any>;

// The element prop is used to render a custom element in the table
interface DataTableProps {
    data: DataItem[];
    columns: ColumnDef<DataItem>[];
    loading?: boolean;
    total?: number;
    element?: React.ReactNode;
}

export type Cell<T = any> = {
    id: string;
    column: {
        id: string;
        columnDef: ColumnDef<T>;
        getCanHide: () => boolean;
        getIsVisible: () => boolean;
        toggleVisibility: (isVisible: boolean) => void;
    };
    getCellProps: () => Record<string, any>;
    getCellState: () => Record<string, any>;
    getIsSelected: () => boolean;
    getValue: () => T[keyof T];
    getContext: () => {
        row: Row<T>;
    };
};

export type Row<T = any> = {
    id: string;
    original: T;
    getIsSelected: () => boolean;
    getVisibleCells: () => Cell<T>[];
    getValue: (accessorKey: keyof T) => T[keyof T];
};

export function DataTable({ data, columns, loading = false, total = 0, element }: DataTableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState(
        data.reduce((acc, item, index) => {
            acc[index] = false;
            return acc;
        }, {} as Record<number, boolean>)
    );

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel({ pageSize: 7 }),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
          sorting,
          columnFilters,
          columnVisibility,
          rowSelection,
        },
      });
      

    return (
        <div className="w-full   rounded-lg bg-background">
            <div className="flex p-2 bg-slate-300/15  items-center flex-wrap justify-between gap-3 md:py-4 lowercase">
                <div className=" max-w-xs w-full flex justify-center items-start relative ">
                    <SearchIcon
                        className=" absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-50 size-5"
                    />
                    <Input
                        placeholder="Search..."

                        value={(table.getColumn(columns[2]?.accessorKey)?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn(columns[2]?.accessorKey)?.setFilterValue(event.target.value)
                        }
                        className=" w-full bg-white border-slate-400/35"
                    />
                </div>
                <div className="flex gap-4 justify-between items-center">
                    {element}
                    <DropdownMenu>
                        <DropdownMenuTrigger className="rounded-md" asChild>
                            <Button
                                variant={'outline'}
                                className="flex gap-2 justify-center items-center border-slate-400/35 text-slate-600 px-2">
                                <FilterIcon />
                                Filter Columns
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="border-t">
                <Table className="min-h-48 rounded-lg">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            className={`text-sm  bg-slate-300/15 truncate text-slate-900 dark:text-slate-50 capitalize font-semibold ${header.column.id === 'id' ? 'hidden' : ''}`}
                                            key={header.id}>
                                            <div className="flex gap-2  text-slate-500 dark:text-slate-50">
                                                {
                                                    header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )
                                                }
                                            </div>
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            className={`h-10 capitalize ${cell.column.id === 'id' ? 'hidden' : ''}`}
                                            key={cell.id}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow className="w-full  absolute p-5 touch-none hover:bg-transparent flex gap-2 justify-center items-center text-slate-400">
                               <img
                               
                               src="/no-data-icon.png" 
                               alt="no data"
                               className="w-80 grayscale aspect-auto"
                               srcset="" />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex p-2 items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-xs lg:text-sm text-muted-foreground">
                    Showing {table.getFilteredSelectedRowModel().rows.length + 1} to {table.getFilteredSelectedRowModel().rows.length + 5} of {table.getFilteredRowModel().rows.length} entries
                </div>

                <Pagination table={table} />
            </div>
        </div>
    );
}


const Pagination = ({ table }: any) => {
    return (
        <div className=" flex gap-2 justify-center items-center">
            <Button
                variant="outline"
                size="sm"
                className=" size-8 p-1 border-slate-400/35 text-slate-500 font-semibold"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
                <MoveLeft
                    className=" text-slate-800 size-4"
                />
            </Button>
            {table.getPageOptions().map((page: any) => (
                page >= 4 ? (
                    <Button
                        key={page}
                        variant='ghost'
                        size="sm"
                        className=" size-8 border-slate-400/35 text-slate-500 font-semibold"
                    >
                        ...
                    </Button>
                ) :
                    <Button
                        key={page}
                        variant="outline"
                        size="sm"
                        className=" size-8 border-slate-400/35 text-slate-500 font-semibold"
                        onClick={() => table.setPageIndex(page)}
                        disabled={table.getPageCount() === page}
                    >
                        {page + 1}
                    </Button>
            ))}
            <Button
                variant="outline"
                size="sm"
                className=" size-8 p-1 border-slate-400/35 text-slate-500 font-semibold"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                <MoveLeft
                    className=" text-slate-800 size-4 transform rotate-180"
                />
            </Button>
        </div>
    )
}
export type { ColumnDef };
