"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import type { Loan } from "@prisma/client"
import { formatCurrency } from "@/utils/helper"
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function LoanComparisonWidget({ loans }: { loans: Loan[] }) {
    const chartData = loans.map((loan) => ({
        name: loan.name, // Loan name for the X-axis
        totalAmount: loan.totalAmount, // Total loan amount
        monthlyPayment: loan.monthlyPayment, // Monthly payment
        interest: loan.totalAmount * loan.fees, // Example: Calculate interest as 10% of total amount
    }));

    const chartConfig = {
        totalAmount: {
            label: "Total Amount",
            color: "#2563eb", // Blue
        },
        monthlyPayment: {
            label: "Monthly Payment",
            color: "#60a5fa", // Light Blue
        },
        interest: {
            label: "Interest",
            color: "#f87171", // Red
        },
    } satisfies ChartConfig;


    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Loan Comparison</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="name" // Use loan names for the X-axis
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <YAxis
                            tickFormatter={(value) => `$${value}`} // Format Y-axis values as currency
                        />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Legend content={<ChartLegendContent />} />
                        <Bar
                            dataKey="totalAmount"
                            fill="var(--color-totalAmount)"
                            radius={4}
                            name="Total Amount"
                        />
                        <Bar
                            dataKey="monthlyPayment"
                            fill="var(--color-monthlyPayment)"
                            radius={4}
                            name="Monthly Payment"
                        />
                        <Bar
                            dataKey="interest"
                            fill="var(--color-interest)"
                            radius={4}
                            name="Interest"
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}