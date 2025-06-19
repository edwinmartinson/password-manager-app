import { Popover, PopoverPanel } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";

import Button from "./Button";
import { Form } from "react-router";
import InputField from "./InputField";

export default function AddPassword() {
  return (
    <Popover>
      <Button variant="rounded" size="lg" className="group" isPopoverBtn>
        <PlusIcon className="size-6 stroke-2 transition-transform duration-200 ease-in-out group-data-open:rotate-45" />
      </Button>

      <PopoverPanel
        className="bg-surface-primary/80 border-surface-tertiary w-85 rounded-xl border p-4 backdrop-blur-lg transition duration-200 ease-in-out [--anchor-gap:--spacing(4)] data-closed:translate-y-[-16px] data-closed:opacity-0"
        anchor="bottom"
        transition
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-lg">Add password</p>
            <p className="text-content-secondary">
              Complete the form to add new password
            </p>
          </div>

          <Form autoComplete="false" className="space-y-3">
            <InputField
              required
              type="url"
              label="url"
              placeholder="eg: https://placeholder.example"
            />
            <InputField
              required
              type="email"
              label="email"
              placeholder="eg: placeholder@example.com"
            />
            <InputField
              required
              type="password"
              label="password"
              placeholder="eg: ****"
            />
          </Form>
        </div>

        <Button className="mt-8">Add password</Button>
      </PopoverPanel>
    </Popover>
  );
}
