import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";

import type { Route } from "./+types/robot";
import Button from "~/components/Button";
import Password from "~/components/Password";
import AddPassword from "~/components/AddPassword";

export default function robot({}: Route.ComponentProps) {
  return (
    <main className="h-full px-4 py-10">
      <section className="mx-auto flex h-full max-w-[504px] flex-col gap-6">
        <div className="flex justify-between">
          <AddPassword />
          <Button variant="rounded" size="lg">
            <ArrowsUpDownIcon className="size-6 stroke-2" />
          </Button>
        </div>

        <div className="scrollbar h-full space-y-3 overflow-y-auto p-0.5">
          <Password />
          <Password />
          <Password />
        </div>

        <div className="text-center">
          <p className="text-content-secondary">Powered by 🤖 robot</p>
        </div>
      </section>
    </main>
  );
}
