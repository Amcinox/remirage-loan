import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/utils/helper"
import type { Loan } from "@prisma/client"

export function TotalLoanAmountWidget({ loans }: { loans: Loan[] }) {
    const totalAmount = loans.reduce((sum, loan) => sum + loan.totalAmount, 0)

    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Loan Amount</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalAmount, loans[0]?.currency)}</div>
                <p className="text-xs text-muted-foreground">Across {loans.length} loans</p>
            </CardContent>
        </Card>
    )
}

