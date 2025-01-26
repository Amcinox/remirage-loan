"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import FormProvider from "@/components/hook-form/form-provider";
import { useForm } from "react-hook-form";
import { RHFTextField } from "@/components/hook-form/rhf-text-field";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { MakePayment, MakePaymentSchema } from "@/lib/schemas";
import { CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, X, Check, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { parseAsBoolean, useQueryState } from 'nuqs'
import { makePayment } from "@/actions/makePayment";
import { Paths } from "@/routes/paths";
import { Loan } from "@prisma/client";


interface MakePaymentModalProps {
    loan: Loan
}
export default function MakePaymentModal({ loan }: MakePaymentModalProps) {
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
        resolver: zodResolver(MakePaymentSchema),
        defaultValues: {
            amount: loan.monthlyPayment,
        },
    });





    const handleSubmit = async (data: MakePayment) => {
        startTransition(async () => {
            const { error } = await makePayment(loan.id, data);
            if (error) {
                setError(error.message);
                return
            }
            router.push(Paths.dashboard.loans.view(String(loan.id)));
        });
    };

    return (
        <Dialog open={open} onOpenChange={(val) => setOpen(val)}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />  Make Payment
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Make Loan Payment</DialogTitle>
                    <DialogDescription>
                        Make a payment for your loan
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

                            <RHFTextField name="amount" placeholder="Enter Amount" label="Amount" type="number"
                            />
                        </div>

                    </div>
                    <CardFooter className="flex justify-end gap-2 mt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.push(Paths.dashboard.loans.view(String(loan.id)))}
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
                            Make Payment
                        </Button>
                    </CardFooter>
                </FormProvider>
            </DialogContent>
        </Dialog>

    );
}