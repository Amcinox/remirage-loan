"use client";

import { useRouter } from "next/navigation";
import { createLoan } from "@/actions/creatingLoans";
import { useState, useTransition } from "react";
import FormProvider from "@/components/hook-form/form-provider";
import { useForm } from "react-hook-form";
import { RHFTextField } from "@/components/hook-form/rhf-text-field";
import { RHFTextarea } from "@/components/hook-form/rhf-text-area";
import { RHFSelect } from "@/components/hook-form/rhf-select";
import { LoanStatus } from "@/sections/loans/columns";
import { RHFDatePickerForm } from "@/components/hook-form/rhf-date-picker";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateLoan, CreateLoanSchema } from "@/lib/schemas";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, X, Check, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { parseAsBoolean, useQueryState } from 'nuqs'


export default function CreateLoanModal() {
    const router = useRouter();
    const [error, setError] = useState<string>();
    const [loading, startTransition] = useTransition();

    const [open, setOpen] = useQueryState("create", parseAsBoolean.withOptions({
        clearOnDefault: true,
        startTransition,
        scroll: false,
    }).withDefault(false)
    );




    const form = useForm({
        resolver: zodResolver(CreateLoanSchema),
        defaultValues: {
            name: "",
            description: "",
            icon: "",
            status: "",
            totalAmount: 0,
            fees: 0,
            duration: 0,
            monthlyPayment: 0,
            startDate: new Date(),
        },
    });

    const handleSubmit = async (data: CreateLoan) => {
        startTransition(async () => {
            const { error } = await createLoan(data);
            if (error) {
                setError(error.message);
            } else {
                router.push("/loans");
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={(val) => setOpen(val)}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Create Loan
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Create New Loan</DialogTitle>
                    <DialogDescription>
                        Fill in the form below to create a new loan.
                    </DialogDescription>
                </DialogHeader>

                {error && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                <FormProvider form={form} onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">

                            <RHFTextField name="name" placeholder="Enter loan name" label="Name"
                            />
                        </div>
                        <div className="space-y-2">
                            <RHFTextField name="description" placeholder="Enter loan description" label="Description" />
                        </div>
                        <div className="space-y-2">
                            <RHFSelect
                                label="Status"
                                name="status"
                                options={Object.entries(LoanStatus).map(([value, label]) => ({ value, label }))}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <RHFSelect
                                label="Icon"
                                name="icon"
                                options={[
                                    { value: "💰", label: "💰 Money Bag" },
                                    { value: "🏦", label: "🏦 Bank" },
                                    { value: "🏠", label: "🏠 House" },
                                    { value: "🚗", label: "🚗 Car" },
                                    { value: "📦", label: "📦 Box" },
                                ]}
                            />
                        </div>
                        <div className="space-y-2">
                            <RHFTextField
                                label="Total Amount"
                                name="totalAmount"
                                type="number"
                                placeholder="Enter total amount"
                            />
                        </div>
                        <div className="space-y-2">

                            <RHFTextField
                                label="Fees"
                                name="fees"
                                type="number"
                                placeholder="Enter fees"
                            />
                        </div>
                        <div className="space-y-2">
                            <RHFTextField
                                label="Duration (months)"
                                name="duration"
                                type="number"
                                placeholder="Enter duration"
                            />
                        </div>
                        <div className="space-y-2">
                            <RHFTextField
                                label="Monthly Payment"
                                name="monthlyPayment"
                                type="number"
                                placeholder="Enter monthly payment"
                            />
                        </div>
                        <div className="space-y-2">
                            <RHFDatePickerForm name="startDate" label="Start Date" />
                        </div>
                    </div>
                    <CardFooter className="flex justify-end gap-2 mt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.push("/loans")}
                            disabled={loading}
                        >
                            <X className="mr-2 h-4 w-4" /> Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Check className="mr-2 h-4 w-4" />
                            )}
                            Create Loan
                        </Button>
                    </CardFooter>
                </FormProvider>
            </DialogContent>
        </Dialog>

    );
}