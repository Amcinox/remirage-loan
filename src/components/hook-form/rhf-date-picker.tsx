"use client"

import { format } from "date-fns"
import { FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { DatePicker } from "@/components/ui/date-picker"

interface FormDatePickerProps {
  name: string
  label: string
  description?: string
}


export function RHFDatePickerForm({
  name,
  label,
  description
}: FormDatePickerProps) {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <DatePicker
            label={
              field.value ? (
                format(field.value, "PPP")
              ) : (
                <span>Pick a date</span>
              )
            }
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus
          />
          <FormDescription>
            {description}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
