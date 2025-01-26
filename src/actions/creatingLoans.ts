"use server";

import prisma from "@/lib/prisma";
import { CreateLoan, CreateLoanSchema } from "@/lib/schemas";
import { ServerActionResult } from "@/types";
import { handleServerActionError } from "@/utils/errorHandlers";
import { revalidatePath } from "next/cache";

export async function createLoan(data: CreateLoan): Promise<ServerActionResult<any>> {

    try {
        const validatedData = CreateLoanSchema.parse(data)
        const loan = await prisma.loan.create({
            data: validatedData
        });
        revalidatePath("/");
        return { data: loan };
    } catch (error) {
        console.dir({ error }, { depth: null });
        return { error: handleServerActionError("Failed to create loan") };
    }
}

