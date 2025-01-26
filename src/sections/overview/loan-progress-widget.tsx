"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Loan, PaymentRecord } from "@prisma/client"

type LoanWithPayments = Loan & { paymentRecords: PaymentRecord[] }

export function LoanProgressWidget({ loans }: { loans: LoanWithPayments[] }) {
    const calculateProgress = (loan: LoanWithPayments) => {
        const totalPaid = loan.paymentRecords.reduce((sum, record) => sum + record.amountPaid, 0)
        return (totalPaid / loan.totalAmount) * 100
    }

    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Loan Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {loans.map((loan) => (
                    <div key={loan.id} className="space-y-1">
                        <div className="flex justify-between text-sm">
                            <span>{loan.name}</span>
                            <span>{calculateProgress(loan).toFixed(1)}%</span>
                        </div>
                        <Progress value={calculateProgress(loan)} className="h-2" />
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

