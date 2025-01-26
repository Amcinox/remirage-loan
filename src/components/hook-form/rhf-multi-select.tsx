import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MultiSelect } from "@/components/ui/multi-select";

import React from "react";

interface RHFMultiSelectProps {
  name: string
  label: string
  placeholder?: string
  options: { value: string; label: string, icon?: React.ComponentType<{ className?: string }> }[]
  description?: string,
  noOptionsMessage?: string
}


export default function RHFMultiSelect({ name, options, label, placeholder, description }: RHFMultiSelectProps) {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <MultiSelect
              options={options}
              onValueChange={field.onChange}
              defaultValue={field.value}
              placeholder={placeholder}
              variant="inverted"
              animation={2}
              maxCount={3}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
