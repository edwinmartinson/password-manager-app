import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Button from "./Button";
import InputField from "./InputField";
import { Form } from "react-router";
import { CloseButton } from "@headlessui/react";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import type { Password } from "~/type.app";

type EditPasswordProps = {
  item: Password;
};

export default function EditPassword(props: EditPasswordProps) {
  return (
    <div className="p-4">
      <div className="space-y-4.5">
        <div className="flex justify-between">
          <Button variant="rounded" size="lg">
            <TrashIcon className="size-6 stroke-2" />
          </Button>
          <Button variant="rounded" size="lg" element={CloseButton}>
            <XMarkIcon className="size-6 stroke-2" />
          </Button>
        </div>

        <div className="space-y-2">
          <p className="text-lg font-medium">Edit password</p>
          <p className="text-content-secondary text-sm">
            Modify the fields below to update the password
          </p>
        </div>

        <Form autoComplete="false">
          <InputField
            required
            type="url"
            label="url"
            placeholder="eg: https://placeholder.example"
            defaultValue={props.item.url}
            render={() => (
              <Button variant="rounded" size="sm">
                <ClipboardIcon className="size-4 stroke-2" />
              </Button>
            )}
          />
          <InputField
            required
            type="email"
            label="email"
            placeholder="eg: placeholder@example.com"
            defaultValue={props.item.email}
            render={() => (
              <Button variant="rounded" size="sm">
                <ClipboardIcon className="size-4 stroke-2" />
              </Button>
            )}
          />
          <InputField
            required
            type="password"
            label="password"
            placeholder="eg: ****"
            defaultValue={props.item.password}
            render={() => (
              <Button variant="rounded" size="sm">
                <ClipboardIcon className="size-4 stroke-2" />
              </Button>
            )}
          />
        </Form>
      </div>

      <Button className="mt-8">save changes</Button>
    </div>
  );
}
