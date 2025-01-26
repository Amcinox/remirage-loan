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
        <Container>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <Suspense> <CreateLoanModal /></Suspense>
            </div>
            <Card className="max-w-7xl ">
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
        </Container>
    )


}