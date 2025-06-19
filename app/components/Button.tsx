import type React from "react";
import { Button as Btn } from "@headlessui/react";
import { cva, type VariantProps } from "class-variance-authority";
import { PopoverButton } from "@headlessui/react";
import { cn } from "~/lib/utils";

const variants = cva("font-medium cursor-pointer", {
  variants: {
    variant: {
      primary:
        "w-full py-3 px-4 bg-surface-white text-content-black rounded-sm hover:bg-surface-white/95 active:bg-surface-white/90",
      rounded:
        "bg-surface-secondary rounded-full flex items-center justify-center shrink-0 ring ring-transparent hover:ring-surface-tertiary active:bg-surface-tertiary",
    },
    size: {
      lg: "size-12.5",
      sm: "size-9",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof variants> & {
    isPopoverBtn?: boolean;
  };

export default function Button({
  variant,
  size,
  className,
  isPopoverBtn,
  ...props
}: ButtonProps) {
  return isPopoverBtn ? (
    <PopoverButton
      {...props}
      className={cn(variants({ variant, size }), className)}
    >
      {props.children}
    </PopoverButton>
  ) : (
    <Btn {...props} className={cn(variants({ variant, size }), className)}>
      {props.children}
    </Btn>
  );
}
