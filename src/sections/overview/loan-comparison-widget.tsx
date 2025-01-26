"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import type { Loan } from "@prisma/client"
import { formatCurrency } from "@/utils/helper"

export function LoanComparisonWidget({ loans }: { loans: Loan[] }) {
    const data = loans.map((loan) => ({
        name: loan.name,
        totalAmount: loan.totalAmount,
        monthlyPayment: loan.monthlyPayment,
    }))

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Loan Comparison</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                            <Tooltip formatter={(value) => formatCurrency(value as number, loans[0]?.currency || "USD")} />
                            <Legend />
                            <Bar yAxisId="left" dataKey="totalAmount" fill="#8884d8" name="Total Amount" />
                            <Bar yAxisId="right" dataKey="monthlyPayment" fill="#82ca9d" name="Monthly Payment" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}

