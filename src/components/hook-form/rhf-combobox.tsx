"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"



interface FormComboboxProps {
  name: string
  label: string
  options: { value: string; label: string }[]
  description?: string,
  noOptionsMessage?: string
}


export function RHFCombobox({ name, label, options, description, noOptionsMessage }: FormComboboxProps) {

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-[200px] justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? options.find(
                      (language) => language.value === field.value
                    )?.label
                    : "Select language"}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search framework..."
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>{noOptionsMessage}</CommandEmpty>
                  <CommandGroup>
                    {options.map((language) => (
                      <CommandItem
                        value={language.label}
                        key={language.value}
                        onSelect={() => {
                          field.onChange(language.value)
                        }}
                      >
                        {language.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            language.value === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormDescription>
            {description}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
