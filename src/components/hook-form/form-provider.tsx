"use client"
import { UseFormReturn, FormProvider as Form, SubmitHandler } from 'react-hook-form';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  form: UseFormReturn<any>;
  onSubmit: SubmitHandler<any>;
};

export default function FormProvider({ children, onSubmit, form }: Props) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {children}
      </form>
    </Form>
  );
}
