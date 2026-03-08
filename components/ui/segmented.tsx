import { ToggleGroup } from "radix-ui";
import React from "react";

type SegmentedProps<TValue extends string> = React.ComponentPropsWithoutRef<typeof ToggleGroup.Root> & {
  options: { value: TValue; label: string }[];
};

export function Segmented<TValue extends string>({
  options,
  ...props
}: SegmentedProps<TValue>) {
  return (
    <ToggleGroup.Root
      className="inline-flex rounded-xl bg-zinc-100 p-1 dark:bg-zinc-950/60"
      {...props}
    >
      {options.map((option) => (
        <ToggleGroup.Item
          key={option.value}
          value={option.value}
          className="rounded-lg px-3 py-1.5 text-xs font-semibold data-[state=on]:bg-white data-[state=on]:shadow dark:data-[state=on]:bg-slate-900 hover:cursor-pointer"
        >
          {option.label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
}
