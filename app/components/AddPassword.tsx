import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/outline";

import Button from "./ui/Button";
import { Form } from "react-router";
import InputField from "./ui/InputField";
import { useRef, useState } from "react";
import type { Password } from "~/type.app";
import { nanoid } from "nanoid";
import { generateSecurePassword } from "~/lib/utils";
import { useRobot } from "~/context/robot.context";
import type { MachineState } from "~/robot/machine";

type AddPasswordProps = {};

export default function AddPassword(props: AddPasswordProps) {
  let [isOpen, setIsOpen] = useState(false);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const { current, send } = useRobot();
  const state = current.name as MachineState;

  const handle = {
    toggleViewMode: () => send("VIEW_MODE"),
    toggleAddMode: () => send("ADD_MODE"),
    addPassword: (entry: Password) => {
      send({ type: "ADD_PASSWORD", value: entry });
    },
    open: () => {
      setIsOpen(true);
      handle.toggleAddMode();
    },
    close: () => {
      setIsOpen(false);
      handle.toggleViewMode();
    },
    gen: () => {
      if (passwordRef.current) {
        passwordRef.current.type = "text";
        passwordRef.current.value = generateSecurePassword(12);
      }
    },
    submit: (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const url = formData.get("url") as string;
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const id = nanoid();

      handle.addPassword({ id, url, email, password });
      handle.close();
    },
  };

  return (
    <>
      <Button
        variant="rounded"
        size="lg"
        className="group"
        onClick={handle.open}
        disabled={state !== "viewMode"}
      >
        <PlusIcon className="size-6 stroke-2 transition-transform duration-200 ease-in-out group-data-open:rotate-45" />
      </Button>

      <Dialog open={isOpen} onClose={handle.close}>
        <DialogBackdrop className="bg-surface-primary/50 fixed inset-0 backdrop-blur-sm" />

        <div className="fixed inset-0 flex w-screen items-center justify-center">
          <DialogPanel
            transition
            className="bg-surface-primary ring-surface-tertiary w-85 rounded-2xl p-4 ring transition duration-200 ease-in [--anchor-gap:--spacing(4)] data-closed:translate-y-[16px] data-closed:scale-90 data-closed:opacity-0"
          >
            <section className="space-y-4">
              <div className="space-y-2">
                <DialogTitle className="text-lg">Add password</DialogTitle>
                <Description className="text-content-secondary">
                  Complete the form to add new password
                </Description>
              </div>

              <Form
                id="add-password-form"
                name="add-password"
                autoComplete="false"
                className="space-y-3"
                onSubmit={handle.submit}
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
                  render={() => (
                    <Button variant="rounded" size="sm" onClick={handle.gen}>
                      <SparklesIcon className="size-4 stroke-2" />
                    </Button>
                  )}
                />
              </Form>
            </section>

            <section className="mt-8 flex gap-2">
              <Button variant="secondary" onClick={handle.close}>
                Cancel
              </Button>
              <Button type="submit" form="add-password-form">
                Add password
              </Button>
            </section>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
