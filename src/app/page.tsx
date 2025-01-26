import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import prisma from "@/lib/prisma";
import { LoanComparisonWidget } from "@/sections/overview/loan-comparison-widget";
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
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Loan Dashboardd</h1>
      <div className="grid gap-4 grid-cols-12">
        <Suspense fallback={<Skeleton className="h-[120px] col-span-3" />}>
          <div className=" col-span-3">
            <TotalLoanAmountWidget loans={loans} />
          </div>
        </Suspense>
        <Suspense fallback={<Skeleton className="h-[120px] col-span-3" />}>
          <div className="h-full col-span-3">
            <LoanStatusWidget loans={loans} />
          </div>
        </Suspense>
        <Suspense fallback={<Skeleton className="h-[120px] col-span-3" />}>
          <div className=" col-span-3">
            <LoanTermWidget loans={loans} />
          </div>
        </Suspense>
        <Suspense fallback={<Skeleton className="h-[120px] col-span-3" />}>
          <div className="col-span-3">
            <TotalInterestWidget loans={loans} />
          </div>
        </Suspense>
        <Suspense fallback={<Skeleton className="h-[300px] col-span-6" />}>
          <div className="col-span-6">
            <LoanDistributionWidget loans={loans} />
          </div>
        </Suspense>
        <Suspense fallback={<Skeleton className="h-[300px] col-span-6" />}>
          <div className=" col-span-6">
            <LoanComparisonWidget loans={loans} />
          </div>
        </Suspense>
        <Suspense fallback={<Skeleton className="h-[300px] col-span-6" />}>
          <div className=" col-span-6">
            <UpcomingPaymentsWidget loans={loans} />
          </div>
        </Suspense>
        <Suspense fallback={<Skeleton className="h-[300px] col-span-6" />}>
          <div className=" col-span-6">
            <LoanProgressWidget loans={loans} />
          </div>
        </Suspense>
        <Suspense fallback={<Skeleton className="h-[300px] col-span-12" />}>
          <div className=" col-span-12">
            <MonthlyPaymentTrendWidget loans={loans} />
          </div>
        </Suspense>
      </div>
    </div>
  )
}



