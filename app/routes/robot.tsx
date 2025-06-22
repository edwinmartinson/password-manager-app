import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import "robot3/debug";

import type { Route } from "./+types/robot";
import Button from "~/components/Button";
import Password from "~/components/Password";
import AddPassword from "~/components/AddPassword";
import { useRobot } from "~/context/robot.context";
import NoPassword from "~/components/NoPassword";
import type { Password as PasswordType } from "~/type.app";

export default function robot({}: Route.ComponentProps) {
  const { current, send } = useRobot();
  const passwords = current.context.passwords;

  const handle = {
    toggleAddMode: () => send("ADD_PASSWORD"),
    toggleViewMode: () => send("VIEW_PASSWORD"),
    addPassword: (entry: PasswordType) => {
      // console.log(entry);
      send({ type: "NEW_PASSWORD", value: entry });
    },
  };

  // console.log(passwords);

  return (
    <main className="h-full px-4 py-10">
      <section className="mx-auto flex h-full max-w-[504px] flex-col gap-6">
        <div className="flex justify-between">
          <AddPassword
            toggleAddMode={handle.toggleAddMode}
            toggleViewMode={handle.toggleViewMode}
            addPassword={handle.addPassword}
          />
          <Button variant="rounded" size="lg">
            <ArrowsUpDownIcon className="size-6 stroke-2" />
          </Button>
        </div>

        <div className="scrollbar h-full space-y-3 overflow-y-auto p-0.5">
          {passwords.length > 0 ? (
            passwords.map((password) => (
              <Password key={password.id} item={password} />
            ))
          ) : (
            <NoPassword />
          )}
        </div>

        <div className="text-center">
          <p className="text-content-secondary">
            Powered by <a href="https://thisrobot.life/">🤖 robot</a>
          </p>
        </div>
      </section>
    </main>
  );
}
