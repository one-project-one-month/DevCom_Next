import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

export function Checkbox({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        className,
        "grid h-5 w-5 place-items-center rounded-md ring-1 ring-inset transition",
        "data-[state=checked]:bg-indigo-600 data-[state=checked]:text-white data-[state=checked]:ring-indigo-600 dark:data-[state=checked]:bg-indigo-500 dark:data-[state=checked]:ring-indigo-500",
        "data-[state=indeterminate]:bg-indigo-600 data-[state=indeterminate]:text-white data-[state=indeterminate]:ring-indigo-600 dark:data-[state=indeterminate]:bg-indigo-500 dark:data-[state=indeterminate]:ring-indigo-500",
        "data-[state=unchecked]:bg-white data-[state=unchecked]:text-transparent data-[state=unchecked]:ring-zinc-300 data-[state=unchecked]:hover:ring-zinc-400 dark:data-[state=unchecked]:bg-slate-950 dark:data-[state=unchecked]:ring-zinc-700 dark:data-[state=unchecked]:hover:ring-zinc-600"
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="group">
        <Check className="hidden h-3.5 w-3.5 group-data-[state=checked]:block" />
        <Minus className="h-3.5 w-3.5 group-data-[state=checked]:hidden" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
