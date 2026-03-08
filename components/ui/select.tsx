import React from "react";
import { Select as SelectPrimitive } from "radix-ui";
import { ChevronDownIcon, CheckIcon } from "lucide-react";

type Option = { value: string, label: string };

type SelectProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> & {
  options: Option[];
}

export function Select({
  options,
  ...props
}: SelectProps) {
  return (
    <SelectPrimitive.Root
      {...props}
    >
      <SelectPrimitive.Trigger
        className="flex w-full items-center justify-between rounded-xl bg-white px-3 py-2 text-sm font-medium ring-1 ring-slate-700 focus-within:ring-indigo-400 dark:bg-zinc-950/60 dark:ring-zinc-800 hover:cursor-pointer"
      >
        <SelectPrimitive.Value />
        <SelectPrimitive.Icon>
          <ChevronDownIcon />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className="z-50 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-slate-700 dark:bg-zinc-950">
          <SelectPrimitive.Viewport className="p-1">
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                className="relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2 text-sm outline-none hover:bg-zinc-100 dark:hover:bg-slate-900"
              >
                <SelectPrimitive.ItemText>
                  {option.label}
                </SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="absolute right-2">
                  <CheckIcon />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
