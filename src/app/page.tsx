import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import prisma from "@/lib/prisma";
import LoanComparisonWidget from "@/sections/overview/loan-comparison-widget";
import { LoanDistributionWidget } from "@/sections/overview/loan-distribution-widget";
import { LoanProgressWidget } from "@/sections/overview/loan-progress-widget";
import { LoanStatusWidget } from "@/sections/overview/loan-status-widget";
import { LoanTermWidget } from "@/sections/overview/loan-term-widget";
import { MonthlyPaymentTrendWidget } from "@/sections/overview/monthly-payment-trend-widget";
import { TotalInterestWidget } from "@/sections/overview/total-interest-widget";
import { TotalLoanAmountWidget } from "@/sections/overview/total-loanAmount-widget";
import { UpcomingPaymentsWidget } from "@/sections/overview/upcoming-payments-widget";

export default async function DashboardPage() {
  const loans = await prisma.loan.findMany({
    include: {
      paymentRecords: {
        orderBy: { monthNumber: "asc" },
      },
    },
  })

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Loan Dashboard</h1>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Compact Widgets */}
        <Suspense fallback={<Skeleton className="h-[120px] w-full" />}>
          <TotalLoanAmountWidget loans={loans} />
        </Suspense>

        <Suspense fallback={<Skeleton className="h-[120px] w-full" />}>
          <LoanStatusWidget loans={loans} />
        </Suspense>

        <Suspense fallback={<Skeleton className="h-[120px] w-full" />}>
          <LoanTermWidget loans={loans} />
        </Suspense>

        <Suspense fallback={<Skeleton className="h-[120px] w-full" />}>
          <TotalInterestWidget loans={loans} />
        </Suspense>
      </div>

      {/* Larger Visualization Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
          <LoanDistributionWidget loans={loans} />
        </Suspense>

        <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
          <LoanComparisonWidget loans={loans} />
        </Suspense>

        <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
          <UpcomingPaymentsWidget loans={loans} />
        </Suspense>

        <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
          <LoanProgressWidget loans={loans} />
        </Suspense>
      </div>

      {/* Full-width Trend Widget */}
      <div className="w-full">
        <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
          <MonthlyPaymentTrendWidget loans={loans} />
        </Suspense>
      </div>
    </div>
  )
}