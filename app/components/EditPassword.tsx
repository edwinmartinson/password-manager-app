import { useRef } from "react";
import { Form } from "react-router";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CloseButton, DialogBackdrop, DialogPanel } from "@headlessui/react";

import type { Password } from "~/type.app";
import Button from "./ui/Button";
import InputField from "./ui/InputField";
import { useRobot } from "~/context/robot.context";

type EditPasswordProps = {
  item: Password;
};

export default function EditPassword(props: EditPasswordProps) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const { send } = useRobot();

  const editPassword = (entry: Password) => {
    send({ type: "EDIT_PASSWORD", value: entry });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const url = formData.get("url") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const id = props.item.id;

    editPassword({ id, url, email, password });
    if (closeBtnRef.current) closeBtnRef.current.click();
  };

  return (
    <>
      <DialogBackdrop className="bg-surface-primary/50 fixed inset-0 backdrop-blur-sm" />

      <div className="fixed inset-0 w-screen">
        <DialogPanel
          transition
          className="bg-surface-primary ring-surface-tertiary absolute top-0 right-0 h-full w-[400px] p-4 ring transition duration-300 ease-in-out data-closed:translate-x-[400px] max-[500px]:w-[80%]"
        >
          <div className="space-y-3">
            <div className="flex justify-end">
              <Button
                ref={closeBtnRef}
                variant="rounded"
                size="sm"
                element={CloseButton}
              >
                <XMarkIcon className="size-4.5 stroke-2" />
              </Button>
            </div>

            <div className="space-y-2">
              <p className="text-lg font-medium">Edit password</p>
              <p className="text-content-secondary text-sm">
                Modify the fields below to update the password
              </p>
            </div>

            <Form
              onSubmit={handleSubmit}
              id="edit-password-form"
              autoComplete="false"
            >
              <InputField
                required
                type="url"
                label="url"
                name="url"
                placeholder="eg: https://placeholder.example"
                defaultValue={props.item.url}
              />
              <InputField
                required
                type="email"
                label="email"
                name="email"
                placeholder="eg: placeholder@example.com"
                defaultValue={props.item.email}
              />
              <InputField
                required
                type="password"
                label="password"
                name="password"
                placeholder="eg: ****"
                defaultValue={props.item.password}
              />
            </Form>
          </div>

          <Button form="edit-password-form" type="submit" className="mt-8">
            save changes
          </Button>
        </DialogPanel>
      </div>
    </>
  );
}
