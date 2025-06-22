import { KeyIcon } from "@heroicons/react/24/solid";

export default function NoPassword() {
  return (
    <div className="text-content-secondary flex flex-col items-center gap-6">
      <KeyIcon className="size-10" />
      <p className="text-lg">No passwords saved.</p>
    </div>
  );
}
