import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Button from "./Button";
import InputField from "./InputField";
import { Form } from "react-router";

export default function EditPassword() {
  return (
    <div className="p-4">
      <div className="space-y-4.5">
        <div className="flex justify-between">
          <Button variant="rounded" size="lg">
            <TrashIcon className="size-6 stroke-2" />
          </Button>
          <Button variant="rounded" size="lg" isPopoverBtn>
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
            showCopy
          />
          <InputField
            required
            type="email"
            label="email"
            placeholder="eg: placeholder@example.com"
            showCopy
          />
          <InputField
            required
            type="password"
            label="password"
            placeholder="eg: ****"
            showCopy
          />
        </Form>
      </div>

      <Button className="mt-8">save changes</Button>
    </div>
  );
}
