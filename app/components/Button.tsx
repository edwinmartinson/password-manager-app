import type React from "react";
import { Button as Btn } from "@headlessui/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const variants = cva("font-medium", {
  variants: {
    variant: {
      default:
        "w-full py-3 px-4 bg-surface-white text-content-black rounded-sm hover:bg-surface-white/95 active:bg-surface-white/90",
      rounded:
        "size-12.5 bg-surface-secondary rounded-full flex items-center justify-center shrink-0 ring ring-transparent hover:ring-surface-tertiary active:bg-surface-tertiary",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof variants>;

export default function Button({ variant, className, ...props }: ButtonProps) {
  return (
    <Btn {...props} className={cn(variants({ variant }), className)}>
      {props.children}
    </Btn>
  );
}
