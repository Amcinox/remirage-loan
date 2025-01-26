"use client"
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Column } from "@/components/ui/data-table/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { DataTableRowActions } from "@/components/ui/data-table/data-table-row-actions";
import { Paths } from "@/routes/paths";
import { formatCurrency } from "@/utils/helper";
import { Loan } from "@prisma/client";
import { Clock, Copy, Eye, Pencil, ShieldCheck, ShieldX, Trash2 } from "lucide-react";
import moment from "moment";
import Link from "next/link";
export enum LoanStatus {
    PENDING = "Pending",
    APPROVED = "Approved",
    REJECTED = "Rejected",
    CLOSED = "Closed",
}

// create a function that take status and render badge with color and text based on status
export const status_badge = (status: LoanStatus) => {
    switch (status) {
        case LoanStatus.APPROVED:
            return <Badge variant="success">Approved</Badge>
        case LoanStatus.REJECTED:
            return <Badge variant="destructive">Rejected</Badge>
        case LoanStatus.PENDING:
            return <Badge variant="warning">Pending</Badge>
        case LoanStatus.CLOSED:
            return <Badge variant="danger">Closed</Badge>
    }
}


export const status_options = [
    {
        value: LoanStatus.APPROVED,
        label: "Approved",
        icon: <ShieldCheck className="mr-2 h-4 w-4 text-muted-foreground text-green-500" />,
    },
    {
        value: LoanStatus.REJECTED,
        label: "Rejected",
        icon: <ShieldX className="mr-2 h-4 w-4 text-muted-foreground text-red-500" />,
    },
    {
        value: LoanStatus.PENDING,
        label: "Pending",
        icon: <Clock className="mr-2 h-4 w-4 text-muted-foreground text-yellow-500" />,
    },
];




export const columns: Column<Loan>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value: any) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label='Select all'
                className='translate-y-[2px]'
            />
        ),
        cell: ({ row, table }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value: any) => row.toggleSelected(!!value)}
                aria-label='Select row'
                className='translate-y-[2px]'
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='ID' />
        ),
        cell: ({ row }) => <div className='w-[80px]'>
            <Link href={Paths.dashboard.loans.view(String(row.getValue("id")))}>
                {row.getValue("id")}
            </Link>
        </div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Name' />
        ),
        cell: ({ row }) => {
            console.log({ row })
            // const icon = row.getValue("icon")!
            return (
                <div className='flex space-x-2'>
                    {/* {icon ? <Badge variant='outline'>{row.getValue("icon")}</Badge> : null} */}
                    <span className='max-w-[500px] truncate font-medium'>
                        {row.getValue("name")}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "description",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Description' />
        ),
        cell: ({ row }) => {

            return (
                <div className='flex space-x-2'>
                    <span className='max-w-[500px] truncate font-medium'>
                        {row.getValue("description")}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "currency",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Currency' />
        ),
        cell: ({ row }) => {

            return (
                <div className='flex space-x-2'>
                    <span className='max-w-[500px] truncate font-medium'>
                        {row.getValue("currency")}

                    </span>
                </div>
            );
        },
    },



    {
        accessorKey: "totalAmount",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='totalAmount' />
        ),
        cell: ({ row }) => {

            return (
                <div className='flex space-x-2'>
                    <span className='max-w-[500px] truncate font-medium'>

                        {formatCurrency(row.getValue("totalAmount"), row.getValue("currency"))}
                    </span>
                </div>
            );
        },
    },


    {
        accessorKey: "fees",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='fees' />
        ),
        cell: ({ row }) => {

            return (
                <div className='flex space-x-2'>
                    <span className='max-w-[500px] truncate font-medium'>
                        {row.getValue("fees")}%
                    </span>
                </div>
            );
        },
    },



    {
        accessorKey: "duration",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='duration' />
        ),
        cell: ({ row }) => {

            return (
                <div className='flex space-x-2'>
                    <span className='max-w-[500px] truncate font-medium'>
                        {row.getValue("duration")} months
                    </span>
                </div>
            );
        },
    },


    {
        accessorKey: "monthlyPayment",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Monthly Payment' />
        ),
        cell: ({ row }) => {

            return (
                <div className='flex space-x-2'>
                    <span className='max-w-[500px] truncate font-medium'>

                        {formatCurrency(row.getValue("monthlyPayment"), row.getValue("currency"))}
                    </span>
                </div>
            );
        },
    },







    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Status' />
        ),
        cell: ({ row }) => {



            return (
                <div className='flex w-[100px] items-center'>
                    {status_badge(row.getValue("status"))}
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "startDate",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='startDate' />
        ),
        cell: ({ row }) => {
            const field = row.getValue("startDate") as Date
            return (<div>{moment(field).format("YYYY-MM-DD")}</div>);
        },
    },


    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='createdAt' />
        ),
        cell: ({ row }) => {
            const field = row.getValue("createdAt") as Date
            return (<div>{moment(field).format("YYYY-MM-DD")}</div>);
        },
    },


    {
        accessorKey: "updatedAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='updatedAt' />
        ),
        cell: ({ row }) => {
            const field = row.getValue("updatedAt") as Date
            return (<div>{moment(field).format("YYYY-MM-DD")}</div>);
        },
    },
    {
        id: "actions",
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Actions' />
        ),
        cell: ({ row }) => <DataTableRowActions
            row={row}
            actions={[{
                label: "Copy Loan ID",
                onClick: (row) => navigator.clipboard.writeText(String(row.original.id)),
                icon: Copy,
                separator: true,
            },
            {
                label: "View Loan",
                onClick: (row, router) => {
                    router.push(Paths.dashboard.loans.view(String(row.original.id)));
                },
                icon: Eye,
            },
            {
                label: "Edit Loan",
                onClick: (row) => { },
                icon: Pencil,
                separator: true,
            },
            {
                label: "Delete Loan",
                onClick: (row) => { },
                icon: Trash2,
                className: "text-red-600",
            }
            ]}

        />,
    },
];