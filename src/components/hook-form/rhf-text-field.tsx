import { Input } from "@/components/ui/input"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

interface FormInputProps extends React.ComponentProps<"input"> {
  name: string
  label: string
  description?: string
}

export function RHFTextField({ name, label, description, ...props }: FormInputProps) {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem >
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} {...props}

              onChange={(e) => {
                field.onChange(props.type === "number" ? Number(e.target.value) : e.target.value)

              }}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
