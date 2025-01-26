import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/utils/helper"
import type { Loan, PaymentRecord } from "@prisma/client"
import moment from "moment"

type LoanWithPayments = Loan & { paymentRecords: PaymentRecord[] }

export function UpcomingPaymentsWidget({ loans }: { loans: LoanWithPayments[] }) {
    const upcomingPayments = loans
        .flatMap((loan) => {
            const lastPayment = loan.paymentRecords[loan.paymentRecords.length - 1]
            const nextPaymentDate = lastPayment ? new Date(lastPayment.paymentDate!) : new Date(loan.startDate)
            nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1)

            return {
                loanName: loan.name,
                amount: loan.monthlyPayment,
                dueDate: nextPaymentDate,
                currency: loan.currency,
            }
        })
        .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
        .slice(0, 5)

    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Payments</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {upcomingPayments.map((payment, index) => (
                        <div key={index} className="flex justify-between items-center">
                            <span className="text-sm">{payment.loanName}</span>
                            <span className="text-sm font-semibold">{formatCurrency(payment.amount, payment.currency)}</span>
                            <span className="text-xs text-muted-foreground">{moment(payment.dueDate).format("YYYY-MM-DD")}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

