"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { Loan, PaymentRecord } from "@prisma/client"
import { formatCurrency } from "@/utils/helper"

type LoanWithPayments = Loan & { paymentRecords: PaymentRecord[] }

export function MonthlyPaymentTrendWidget({ loans }: { loans: LoanWithPayments[] }) {
    const monthlyData = loans
        .flatMap((loan) =>
            loan.paymentRecords.map((record) => ({
                month: record.monthNumber,
                amount: record.amountPaid,
                loanName: loan.name,
            })),
        )
        .sort((a, b) => a.month - b.month)

    const aggregatedData = monthlyData.reduce(
        (acc, { month, amount }) => {
            const existingMonth = acc.find((item) => item.month === month)
            if (existingMonth) {
                existingMonth.totalAmount += amount
            } else {
                acc.push({ month, totalAmount: amount })
            }
            return acc
        },
        [] as { month: number; totalAmount: number }[],
    )

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Monthly Payment Trend</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={aggregatedData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip formatter={(value) => formatCurrency(value as number, loans[0]?.currency || "USD")} />
                            <Line type="monotone" dataKey="totalAmount" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}

