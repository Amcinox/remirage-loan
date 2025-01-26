"use client"

import { format } from "date-fns"
import { FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { DateRangePicker } from "@/components/ui/date-range-picker"

interface FormDatePickerProps {
  name: string
  label: string
  description?: string
}


export function RHFDateRangePickerForm({
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
          <DateRangePicker
            selected={field.value}
            onSelect={field.onChange}
            mode="range"
            label={field.value?.from ? (
              field.value.to ? (
                <>
                  {format(field.value.from, "LLL dd, y")} -{" "}
                  {format(field.value.to, "LLL dd, y")}
                </>
              ) : (
                format(field.value.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
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
