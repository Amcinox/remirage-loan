// lib/schemas.ts
import { z } from "zod";

// Schema for creating a loan
export const CreateLoanSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    icon: z.string().optional(),
    totalAmount: z.number().positive("Total amount must be positive"),
    fees: z.number().nonnegative("Fees cannot be negative"),
    duration: z.number().positive("Duration must be positive"),
    monthlyPayment: z.number().positive("Monthly payment must be positive"),
    startDate: z.date()
});

// Schema for making a payment
export const MakePaymentSchema = z.object({
    amount: z.number().positive("Amount must be positive"),
});


export const LoanSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().optional(),
    icon: z.string().optional(),
    totalAmount: z.number(),
    fees: z.number(),
    duration: z.number(),
    monthlyPayment: z.number(),
    startDate: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});


export type CreateLoan = z.infer<typeof CreateLoanSchema>;
export type MakePayment = z.infer<typeof MakePaymentSchema>;

export type Loan = z.infer<typeof LoanSchema>;
