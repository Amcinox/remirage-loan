import prisma from "@/lib/prisma";
import { DataTable } from "@/components/ui/data-table/data-table";
import { columns, LoanStatus } from "@/sections/loans/columns";
import _ from "lodash";
import Container from "@/layout/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateLoanModal from "@/sections/loans/create-loan";
import { Suspense } from "react";
const filters = [
    {
        title: "Status",
        dataIndex: "status",
        options: Object.values(LoanStatus).map((status) => {
            return {
                value: status,
                label: _.startCase(status),
            }
        })
    }
]


export default async function LoansPage() {
    const loans = await prisma.loan.findMany();


    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <Suspense> <CreateLoanModal /></Suspense>
            </div>
            <div className="grid  gap-4 grid-cols-12">

                <Card className="col-span-12 " >
                    <CardHeader>
                        <CardTitle>Loans</CardTitle>
                    </CardHeader>
                    <CardContent >
                        <DataTable
                            data={loans}
                            columns={columns}
                            filters={filters}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    )


}