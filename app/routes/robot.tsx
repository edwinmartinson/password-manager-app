import { PlusIcon, ArrowsUpDownIcon } from "@heroicons/react/24/outline";

import Button from "~/components/Button";
import type { Route } from "./+types/robot";

export default function robot({}: Route.ComponentProps) {
  return (
    <main className="h-full px-4 py-10">
      <div className="max-w-[504px] mx-auto ">
        <div className="flex justify-between">
          <Button variant="rounded">
            <PlusIcon className="size-6 stroke-2" />
          </Button>
          <Button variant="rounded">
            <ArrowsUpDownIcon className="size-6 stroke-2" />
          </Button>
        </div>
      </div>
    </main>
  );
}
