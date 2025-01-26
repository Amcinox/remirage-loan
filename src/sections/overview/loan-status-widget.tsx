import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Loan } from "@prisma/client"

export function LoanStatusWidget({ loans }: { loans: Loan[] }) {
    const statusCounts = loans.reduce(
        (acc, loan) => {
            acc[loan.status] = (acc[loan.status] || 0) + 1
            return acc
        },
        {} as Record<string, number>,
    )

    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Loan Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {Object.entries(statusCounts).map(([status, count]) => (
                        <div key={status} className="flex justify-between items-center">
                            <span className="text-sm capitalize">{status.toLowerCase()}</span>
                            <span className="text-sm font-semibold">{count}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

