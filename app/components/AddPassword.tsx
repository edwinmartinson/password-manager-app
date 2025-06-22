import { Popover, PopoverPanel, useClose } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";

import Button from "./Button";
import { Form } from "react-router";
import InputField from "./InputField";
import { useRef } from "react";
import { useMutationObserver } from "~/hooks/useMutationObserver";
import type { Password } from "~/type.app";
import { nanoid } from "nanoid";
import { generateSecurePassword } from "~/lib/utils";

type AddPasswordProps = {
  toggleAddMode: () => void;
  toggleViewMode: () => void;
  addPassword: (entry: Password) => void;
};

export default function AddPassword(props: AddPasswordProps) {
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleState = () => {
    if (popoverRef.current?.getAttribute("data-headlessui-state") === "") {
      props.toggleAddMode();
    } else {
      props.toggleViewMode();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const url = formData.get("url") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const id = nanoid();

    props.addPassword({ id, url, email, password });
    buttonRef.current?.click();
  };

  const handleGenerate = () => {
    if (passwordRef.current) {
      passwordRef.current.type = "text";
      passwordRef.current.value = generateSecurePassword(12);
    }
  };

  useMutationObserver(popoverRef, { attributes: true }, (mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === "data-headlessui-state") {
        const target = mutation.target as HTMLElement;

        if (target.getAttribute("data-headlessui-state") === "") {
          props.toggleViewMode();
        }
      }
    });
  });

  return (
    <Popover ref={popoverRef}>
      <Button
        variant="rounded"
        size="lg"
        className="group"
        isPopoverBtn
        onClick={handleState}
        ref={buttonRef}
      >
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

          <Form
            id="add-password-form"
            name="add-password"
            autoComplete="false"
            className="space-y-3"
            onSubmit={handleSubmit}
          >
            <InputField
              name="url"
              required
              type="url"
              label="url"
              placeholder="eg: https://placeholder.example"
            />
            <InputField
              name="email"
              required
              type="email"
              label="email"
              placeholder="eg: placeholder@example.com"
            />
            <InputField
              name="password"
              required
              type="password"
              label="password"
              placeholder="eg: ****"
              ref={passwordRef}
            />
          </Form>
        </div>

        <div className="mt-8 flex gap-2">
          <Button variant="secondary" onClick={handleGenerate}>
            Generate
          </Button>
          <Button type="submit" form="add-password-form">
            Add password
          </Button>
        </div>
      </PopoverPanel>
    </Popover>
  );
}
