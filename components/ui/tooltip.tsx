"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

export function TooltipProvider(
  props: React.ComponentProps<typeof TooltipPrimitive.Provider>,
) {
  return <TooltipPrimitive.Provider delayDuration={0} {...props} />;
}

export function Tooltip(
  props: React.ComponentProps<typeof TooltipPrimitive.Root>,
) {
  return <TooltipPrimitive.Root {...props} />;
}

export function TooltipTrigger(
  props: React.ComponentProps<typeof TooltipPrimitive.Trigger>,
) {
  return <TooltipPrimitive.Trigger {...props} />;
}

export function TooltipContent({
  className,
  sideOffset = 6,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        sideOffset={sideOffset}
        className={cn(
          "z-50 rounded-md px-3 py-1.5 text-xs shadow-md",
          "bg-black text-slate-900",
          className,
        )}
        {...props}
      >
        {children}

        {/* ✅ PRAVI ARROW */}
        <TooltipPrimitive.Arrow
          width={10}
          height={5}
          className="fill-ring"
        />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}
