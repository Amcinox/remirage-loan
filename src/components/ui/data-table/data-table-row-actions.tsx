"use client";

import * as React from "react";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Copy, Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface LabelOptions {
  value: string;
  label: string;
  icon: React.ElementType;
}
interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  label_options?: LabelOptions[]
  actions?: {
    label: string;
    icon: React.ElementType;
    onClick: (row: Row<TData>, router: AppRouterInstance) => void;
    separator?: boolean;
    className?: string;
  }[]
}

export function DataTableRowActions<TData>({
  row,
  label_options,
  actions
}: DataTableRowActionsProps<TData>) {
  const router = useRouter()

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
          >
            <MoreHorizontal className='h-4 w-4' />
            <span className='sr-only'>Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[200px]'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {actions?.map((action, index) => {
            return (
              <React.Fragment key={index}>
                <DropdownMenuItem
                  onClick={() => action.onClick(row, router)}
                  className={action.className}
                >

                  {action.icon && (
                    <action.icon className='mr-2 h-4 w-4' />
                  )}
                  {action.label}
                </DropdownMenuItem>
                {action.separator && <DropdownMenuSeparator />}
              </React.Fragment>
            )
          })}
          {label_options && label_options?.length > 0 && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup value={""}>
                    {label_options.map((label) => (
                      <DropdownMenuRadioItem key={label.value} value={label.value}>
                        <label.icon className="w-4 h-4 mr-2" />
                        {label.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </>
          )
          }
        </DropdownMenuContent>
      </DropdownMenu>

    </Dialog>
  );
}
