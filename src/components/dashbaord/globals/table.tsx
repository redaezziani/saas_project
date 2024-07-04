import * as React from "react"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
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
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { MoveLeft, SearchIcon } from "lucide-react"
import { FilterIcon } from "../employees/icons"

export type DataItem = Record<string, any>

// The element prop is used to render a custom element in the table
interface DataTableProps {
    data: DataItem[]
    columns: ColumnDef<DataItem>[]
    loading?: boolean
    total?: number
    element?: React.ReactNode
}

export type Cell<T = any> = {
    id: string
    column: {
        id: string
        columnDef: ColumnDef<T>
        getCanHide: () => boolean
        getIsVisible: () => boolean
        toggleVisibility: (isVisible: boolean) => void
    }
    getCellProps: () => Record<string, any>
    getCellState: () => Record<string, any>
    getIsSelected: () => boolean
    getValue: () => T[keyof T]
    getContext: () => {
        row: Row<T>
    }
}

export type Row<T = any> = {
    id: string
    original: T
    getIsSelected: () => boolean
    getVisibleCells: () => Cell<T>[]
    getValue: (accessorKey: keyof T) => T[keyof T]
}

export function DataTable({
    data,
    columns,
    loading = false,
    total = 0,
    element,
}: DataTableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState(
        data.reduce(
            (acc, item, index) => {
                acc[index] = false
                return acc
            },
            {} as Record<number, boolean>,
        ),
    )

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

        initialState: {
            pagination: {
                pageIndex: 0, //custom initial page index
                pageSize: 9, //custom default page size
            },
        },
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full rounded-lg bg-background">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-300/15 p-2 lowercase md:py-4">
                <div className="relative flex w-full max-w-xs items-start justify-center">
                    <SearchIcon className="absolute right-3 top-1/2 size-5 -translate-y-1/2 transform text-slate-400 dark:text-slate-50" />
                    <Input
                        placeholder="Search..."
                        value={
                            (table
                                .getColumn(columns[2]?.accessorKey)
                                ?.getFilterValue() as string) ?? ""
                        }
                        onChange={(event) =>
                            table
                                .getColumn(columns[2]?.accessorKey)
                                ?.setFilterValue(event.target.value)
                        }
                        className="w-full border-slate-400/35 bg-white"
                    />
                </div>
                <div className="flex items-center flex-wrap justify-between gap-4">
                    {element}
                    <DropdownMenu>
                        <DropdownMenuTrigger className="rounded-md" asChild>
                            <Button
                                variant={"outline"}
                                className="flex items-center justify-center gap-2 border-dashed border-slate-400/35 px-2 text-slate-600"
                            >
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
                                    )
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
                                            className={`truncate bg-slate-300/15 text-sm font-semibold capitalize text-slate-900 dark:text-slate-50 ${header.column.id === "id" ? "hidden" : ""}`}
                                            key={header.id}
                                        >
                                            <div className="flex gap-2 text-slate-500 dark:text-slate-50">
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext(),
                                                      )}
                                            </div>
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            className={`h-10 capitalize ${cell.column.id === "id" ? "hidden" : ""}`}
                                            key={cell.id}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow className="absolute flex w-full touch-none items-center justify-center gap-2 p-5 text-slate-400 hover:bg-transparent">
                                <img
                                    src="/no-data-icon.png"
                                    alt="no data"
                                    className="aspect-auto w-80 grayscale"
                                    srcset=""
                                />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-end space-x-2 p-2 py-4">
                <div className="flex-1 text-xs text-muted-foreground lg:text-sm">
                    Showing{" "}
                    {table.getFilteredSelectedRowModel().rows.length + 1} to{" "}
                    {table.getFilteredSelectedRowModel().rows.length + 5} page
                </div>

                <Pagination table={table} />
            </div>
        </div>
    )
}

const Pagination = ({ table }) => {
    const pageCount = table.getPageCount()
    const currentPage = table.getState().pagination.pageIndex

    const getVisiblePages = () => {
        const pages = []
        if (pageCount <= 4) {
            for (let i = 0; i < pageCount; i++) {
                pages.push(i)
            }
        } else {
            pages.push(0)
            if (currentPage < 3) {
                for (let i = 1; i < 3; i++) {
                    pages.push(i)
                }
                pages.push("right-ellipsis")
                pages.push(pageCount - 1)
            } else if (currentPage >= 3 && currentPage < pageCount - 3) {
                pages.push("left-ellipsis")
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i)
                }
                pages.push("right-ellipsis")
                pages.push(pageCount - 1)
            } else {
                pages.push("left-ellipsis")
                for (let i = pageCount - 3; i < pageCount - 1; i++) {
                    pages.push(i)
                }
                pages.push(pageCount - 1)
            }
        }
        return pages
    }

    return (
        <div className="flex items-center justify-center gap-2">
            <Button
                variant="outline"
                size="sm"
                className="size-8 border-slate-400/35 p-1 font-semibold text-slate-500"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                <MoveLeft className="size-4 text-slate-800" />
            </Button>
            {getVisiblePages().map((page, index) =>
                typeof page === "string" ? (
                    <span
                        key={index}
                        className="size-8 border-slate-400/35 font-semibold text-slate-500"
                    >
                        ...
                    </span>
                ) : (
                    <Button
                        key={page}
                        variant={page === currentPage ? "solid" : "outline"}
                        size="sm"
                        className="size-8 border-slate-400/35 font-semibold text-slate-500"
                        onClick={() => table.setPageIndex(page)}
                        disabled={page === currentPage}
                    >
                        {page + 1}
                    </Button>
                ),
            )}
            <Button
                variant="outline"
                size="sm"
                className="size-8 border-slate-400/35 p-1 font-semibold text-slate-500"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
                <MoveLeft className="size-4 rotate-180 transform text-slate-800" />
            </Button>
        </div>
    )
}

export type { ColumnDef }
