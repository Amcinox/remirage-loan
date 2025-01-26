"use client"
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Column } from "@/components/ui/data-table/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { DataTableRowActions } from "@/components/ui/data-table/data-table-row-actions";
import { Paths } from "@/routes/paths";
import { formatCurrency } from "@/utils/helper";
import { PaymentRecord } from "@prisma/client";
import { Copy, Eye, Pencil, Trash2 } from "lucide-react";
import moment from "moment";
import Link from "next/link";





export const columns: Column<PaymentRecord>[] = [
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
        accessorKey: "monthNumber",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Month' />
        ),
        cell: ({ row }) => {

            return (
                <div className='flex space-x-2'>
                    <span className='max-w-[500px] truncate font-medium'>
                        {row.getValue("monthNumber")}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "amountPaid",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='amountPaid' />
        ),
        cell: ({ row }) => {

            return (
                <div className='flex space-x-2'>
                    <span className='max-w-[500px] truncate font-medium'>
                        {formatCurrency(row.getValue("amountPaid"))}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "paymentDate",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='paymentDate' />
        ),
        cell: ({ row }) => {

            return (
                <div className='flex space-x-2'>
                    <span className='max-w-[500px] truncate font-medium'>

                        {moment(row.getValue("paymentDate")).format("YYYY-MM-DD")}

                    </span>
                </div>
            );
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