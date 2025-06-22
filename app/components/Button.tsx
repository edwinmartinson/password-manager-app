import type React from "react";
import { Button as Btn } from "@headlessui/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const variants = cva("font-medium cursor-pointer", {
  variants: {
    variant: {
      primary:
        "w-full py-3 px-4 bg-surface-white text-content-black rounded-sm hover:bg-surface-white/95 active:bg-surface-white/90",
      secondary:
        "w-full py-3 px-4 bg-surface-secondary text-content-primary rounded-sm hover:bg-surface-tertiary active:bg-surface-tertiary/80",
      rounded:
        "bg-surface-secondary rounded-full flex items-center justify-center shrink-0 ring ring-transparent hover:ring-surface-tertiary active:bg-surface-tertiary",
      delete:
        "bg-red-500/20 text-red-500 rounded-full flex items-center justify-center shrink-0  active:bg-red-500/30",
      raw: "",
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
    element?: React.ElementType;
  };

export default function Button({
  variant,
  size,
  className,
  element: Element,
  ...props
}: ButtonProps) {
  return Element ? (
    <Element className={cn(variants({ variant, size }), className)} {...props}>
      {props.children}
    </Element>
  ) : (
    <Btn {...props} className={cn(variants({ variant, size }), className)}>
      {props.children}
    </Btn>
  );
}
