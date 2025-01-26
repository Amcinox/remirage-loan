// app/actions/makePayment.ts
"use server";

import prisma from "@/lib/prisma";
import { MakePaymentSchema, MakePayment } from "@/lib/schemas";
import { ServerActionResult } from "@/types";
import { handleServerActionError } from "@/utils/errorHandlers";
import { revalidatePath } from "next/cache";

export async function makePayment(loanId: number, data: MakePayment): Promise<ServerActionResult<any>> {


    try {
        const validatedData = MakePaymentSchema.parse(data)
        const paymentRecord = await prisma.paymentRecord.create({
            data: {
                loanId,
                monthNumber: (await prisma.paymentRecord.count({ where: { loanId } })) + 1,
                amountPaid: validatedData.amount,
                paymentDate: new Date(),
            },
        });
        revalidatePath(`/loans/${loanId}`);
        return { data: paymentRecord };
    } catch (error) {
        return { error: handleServerActionError(error) };
    }
}