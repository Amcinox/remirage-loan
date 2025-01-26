import prisma from "@/lib/prisma";
import { LoanStatisticsWidgets } from "@/sections/loans/loan/loan-statistics-widgets";
import MakePaymentModal from "@/sections/loans/loan/make-payment";
import PaymentRecordsTable from "@/sections/loans/loan/payment-history-table";
import { PageProps } from "@/types";


export default async function LoanDetailPage({
    params,
}: PageProps<{ loan_id: string }>) {
    const { loan_id } = await params;
    const loan = await prisma.loan.findUnique({
        where: { id: parseInt(loan_id) },
        include: { paymentRecords: { orderBy: { monthNumber: 'asc' } } },
    });

    if (!loan) {
        return <div className="p-6 text-red-500">Loan not found</div>;
    }

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">{loan.name} {loan.icon}</h1>
                <MakePaymentModal loan={loan} />
            </div>

            <LoanStatisticsWidgets loan={loan} />

            <PaymentRecordsTable
                paymentRecords={loan.paymentRecords}
                currency={loan.currency}
            />
        </div>
    );
}