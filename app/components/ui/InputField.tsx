import { Input, Field, Label } from "@headlessui/react";

import type React from "react";
import { cn } from "~/lib/utils";

type InputFieldProps = React.ComponentProps<"input"> & {
  label: string;
  showSecBtn?: boolean;
  render?: () => React.ReactNode;
};

export default function InputField({
  label,
  className,
  required,
  render,
  ...props
}: InputFieldProps) {
  return (
    <Field className="space-y-2">
      <Label className="block text-sm font-light">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      <div className="flex gap-2">
        <Input
          {...props}
          className={cn(
            "bg-surface-secondary hover:ring-surface-tertiary focus:ring-surface-white block w-full rounded-sm px-4 py-2 ring ring-transparent focus:outline-0",
            className,
          )}
          required={required}
        />

        {render && render()}
      </div>
    </Field>
  );
}
