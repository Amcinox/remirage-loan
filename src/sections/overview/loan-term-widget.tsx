import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Loan } from "@prisma/client"

export function LoanTermWidget({ loans }: { loans: Loan[] }) {
    const averageTerm = loans.reduce((sum, loan) => sum + loan.duration, 0) / loans.length

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="text-sm font-medium">Average Loan Term</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{averageTerm.toFixed(1)} months</div>
                <p className="text-xs text-muted-foreground">Across {loans.length} loans</p>
            </CardContent>
        </Card>
    )
}

