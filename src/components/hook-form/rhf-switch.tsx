import { Switch } from "@/components/ui/switch"
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"

interface FormSwitchProps {
  name: string
  label: string
  description?: string
}

export function RHFSwitch({ name, label, description, ...props }: FormSwitchProps) {

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <FormLabel className="text-base">{label}</FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              {...props}
            />
          </FormControl>
        </FormItem>
      )}
    />
  )
}

