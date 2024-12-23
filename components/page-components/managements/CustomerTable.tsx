"use client";

import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Customer } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const columns = (handleShowCustomerInfo: (customer: Customer) => void, handleEditCustomer: (customer: Customer) => void, handleDeleteCustomer: (customer: Customer) => void): ColumnDef<Customer>[] => [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: "serial",
        header: "No",
        cell: ({ row }) => <div className="text-left">{row.index + 1}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => <div onClick={() => handleShowCustomerInfo(row.original)} className="cursor-pointer">{row.getValue("name")}</div>,
    },
    {
        accessorKey: "address",
        header: "Address",
        cell: ({ row }) => <div onClick={() => handleShowCustomerInfo(row.original)} className="cursor-pointer">{row.getValue("address")}</div>,
    },
    {
        accessorKey: "mobile",
        header: "Mobile",
        cell: ({ row }) => <div onClick={() => handleShowCustomerInfo(row.original)} className="cursor-pointer">{row.getValue("mobile")}</div>,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className="text-left">
                <Badge className={cn(row.getValue("status") === "active" ? "bg-green-700/20 text-green-700" : "bg-red-500/20 text-red-600", 'uppercase border')}>
                    {row.getValue("status")}
                </Badge>
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "amount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
            const amount = row.getValue("amount") as string;
            return <div onClick={() => handleShowCustomerInfo(row.original)} className="text-right font-medium cursor-pointer">{amount}</div>;
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const handleDelete = () => handleDeleteCustomer(row.original);
            const handleEdit = () => handleEditCustomer(row.original);
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>

                        <DropdownMenuItem
                            onClick={handleEdit}
                            className="cursor-pointer">
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={handleDelete}
                            className="cursor-pointer text-red-500 hover:!bg-red-500/10 hover:!text-red-500">
                            Delete
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                            Duplicate
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export function CustomerTable({
    customers = [],
    handleAddCustomer,
    handleDeleteCustomer,
    handleEditCustomer,
    handleShowCustomerInfo
}: {
    customers: Customer[];
    handleAddCustomer: () => void;
    handleDeleteCustomer: (customer: Customer) => void;
    handleEditCustomer: (customer: Customer) => void;
    handleShowCustomerInfo: (customer: Customer) => void;
}) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data: customers,
        columns: columns(handleShowCustomerInfo, handleEditCustomer, handleDeleteCustomer),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
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

    const totalCustomers = customers.length;
    const totalAmount = customers.reduce(
        (sum, customer) => sum + Number(customer.amount),
        0
    );

    return (
        <div className="w-full relative pb-10">
            <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    Total: <span className="font-bold">{totalCustomers} Customers</span>
                    {Object.keys(rowSelection).length > 0 && (
                        <span className="ml-2">
                            ( {Object.keys(rowSelection).length} selected )
                        </span>
                    )}
                </p>
                <Button onClick={handleAddCustomer}>Add Customer</Button>
            </div>
            <div className="flex items-center py-4 space-x-3  bg-white ">
                <Input
                    placeholder="Filter Name..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <Input
                    placeholder="Filter Address..."
                    value={(table.getColumn("address")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("address")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm ml-2"
                />
                <Input
                    placeholder="Filter Mobile..."
                    value={(table.getColumn("mobile")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("mobile")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm ml-2"
                />
                <Select
                    onValueChange={(value) =>
                        table.getColumn("status")?.setFilterValue(value === "all" ? "" : value)
                    }
                    value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue defaultValue={'all'} placeholder="Filter Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem className="text-capitalize text-green-700 hover:!text-green-700/80" value="active">Active</SelectItem>
                        <SelectItem className="text-capitalize text-red-600 hover:!text-red-600/80" value="closed">Closed</SelectItem>
                    </SelectContent>
                </Select>
                <div className="w-[1px] h-8 bg-border mx-2" />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown />
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
            <div className="w-full rounded-md border overflow-y-auto">
                <Table>
                    <TableHeader className="sticky top-0 bg-white z-20">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
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
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}

                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            {Object.keys(rowSelection).length > 0 && (
                                <div className="font-medium">
                                    Selected customers:{" "}
                                    {table
                                        .getSelectedRowModel()
                                        .rows.map((row) => row.original.name)
                                        .join(", ")}
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="font-bold">Total Amount:</div>
                            <div className="font-bold">{totalAmount.toFixed(2)} Taka</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
