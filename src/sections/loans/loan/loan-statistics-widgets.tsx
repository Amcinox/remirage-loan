"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart"
import { Bar, BarChart, XAxis, ResponsiveContainer } from "recharts"
import { formatCurrency } from '@/utils/helper'
import { Loan, PaymentRecord } from '@prisma/client'
import { ArrowDownIcon, ArrowUpIcon, CalendarIcon, CreditCardIcon } from 'lucide-react'

interface LoanStatisticsWidgetsProps {
  loan: Loan & {
    paymentRecords: PaymentRecord[]
  }
}

export function LoanStatisticsWidgets({ loan }: LoanStatisticsWidgetsProps) {
  const calculateMonthsLeft = () => {
    const totalPaid = loan.paymentRecords.reduce(
      (sum, record) => sum + record.amountPaid,
      0
    );
    const totalExpectedPayment = loan.monthlyPayment * loan.duration;
    const remainingBalance = Math.max(0, totalExpectedPayment - totalPaid);
    const remainingMonths = Math.ceil(remainingBalance / loan.monthlyPayment);
    return remainingMonths;
  };

  const totalPaid = loan.paymentRecords.reduce(
    (sum, record) => sum + record.amountPaid,
    0
  );
  const monthsLeft = calculateMonthsLeft();
  const remainingBalance = loan.totalAmount - totalPaid;
  const progressPercentage = (totalPaid / loan.totalAmount) * 100

  const chartData = [
    { name: 'Paid', amount: totalPaid, color: 'var(--color-paid)' },
    { name: 'Remaining', amount: remainingBalance, color: 'var(--color-remaining)' }
  ]

  const chartConfig = {
    paid: {
      label: "Amount Paid",
      color: "hsl(var(--success))"
    },
    remaining: {
      label: "Remaining Balance",
      color: "hsl(var(--warning))"
    }
  } satisfies ChartConfig

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Loan Amount</CardTitle>
          <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(loan.totalAmount, loan.currency)}</div>
          <Progress value={progressPercentage} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-1">
            {progressPercentage.toFixed(1)}% Paid
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Amount Paid</CardTitle>
          <ArrowUpIcon className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalPaid, loan.currency)}</div>
          <p className="text-xs text-muted-foreground">
            {((totalPaid / loan.totalAmount) * 100).toFixed(1)}% of total
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Remaining Balance</CardTitle>
          <ArrowDownIcon className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(remainingBalance, loan.currency)}</div>
          <p className="text-xs text-muted-foreground">
            {((remainingBalance / loan.totalAmount) * 100).toFixed(1)}% of total
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Loan Progress</CardTitle>
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{monthsLeft} months</div>
          <p className="text-xs text-muted-foreground">
            {((monthsLeft / loan.duration) * 100).toFixed(1)}% remaining
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
