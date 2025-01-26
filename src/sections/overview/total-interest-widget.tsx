import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/utils/helper"
import type { Loan } from "@prisma/client"

export function TotalInterestWidget({ loans }: { loans: Loan[] }) {
    const totalInterest = loans.reduce((sum, loan) => sum + loan.fees, 0);



    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="text-sm font-medium">Total Interest</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalInterest, loans[0]?.currency || "USD")}</div>
                <p className="text-xs text-muted-foreground">Across all loans</p>
            </CardContent>
        </Card>
    )
}

