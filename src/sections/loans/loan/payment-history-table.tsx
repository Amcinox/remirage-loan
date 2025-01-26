"use client"
import React from "react"
import type { PaymentRecord } from "@prisma/client"
import { DataTable } from "@/components/ui/data-table/data-table"
import { columns } from "./columns"

interface PaymentRecordsTableProps {
    paymentRecords: PaymentRecord[]
    currency: string
}


export default function PaymentRecordsTable({ paymentRecords, currency }: PaymentRecordsTableProps) {

    return (
        <div>
            <DataTable
                data={paymentRecords}
                columns={columns}
            />
        </div>
    )
}

