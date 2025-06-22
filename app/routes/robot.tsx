import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import "robot3/debug";

import type { Route } from "./+types/robot";
import Button from "~/components/Button";
import Password from "~/components/Password";
import AddPassword from "~/components/AddPassword";
import { useRobot } from "~/context/robot.context";
import NoPassword from "~/components/NoPassword";
import type { Password as PasswordType } from "~/type.app";
import type { MachineState } from "~/machine/robot.machine";

export default function robot({}: Route.ComponentProps) {
  const { current, send } = useRobot();
  const state = current.name as MachineState;
  const passwords = current.context.passwords;

  const handle = {
    toggleAddMode: () => send("ADD_MODE"),
    toggleViewMode: () => send("VIEW_MODE"),
    toggleDeleteMode: () => send("DELETE_MODE"),
    addPassword: (entry: PasswordType) => {
      send({ type: "ADD_PASSWORD", value: entry });
    },
    deletePassword: (id: string) => {
      send({ type: "DELETE_PASSWORD", value: id });
    },
    copyEmail: (id: string) => {
      send({ type: "COPY_EMAIL", value: id });
    },
    copyPassword: (id: string) => {
      send({ type: "COPY_PASSWORD", value: id });
    },
    delete: () => {
      if (state === "viewMode") send("DELETE_MODE");
      if (state === "deleteMode") send("VIEW_MODE");
    },
  };

  return (
    <main className="h-full px-4 py-10">
      <section className="mx-auto flex h-full max-w-[504px] flex-col gap-6">
        <div className="flex justify-between">
          <AddPassword
            disabled={state !== "viewMode"}
            toggleAddMode={handle.toggleAddMode}
            toggleViewMode={handle.toggleViewMode}
            addPassword={handle.addPassword}
          />

          <Button
            variant="rounded"
            size="lg"
            onClick={handle.delete}
            disabled={state !== "viewMode" && state !== "deleteMode"}
          >
            {state === "deleteMode" ? (
              <XMarkIcon className="size-6 stroke-2" />
            ) : (
              <TrashIcon className="size-6 stroke-2" />
            )}
          </Button>
        </div>

        <div className="scrollbar h-full space-y-3 overflow-y-auto p-0.5">
          {passwords.length > 0 ? (
            passwords.map((password) => (
              <Password
                appState={state}
                key={password.id}
                item={password}
                copyEmail={handle.copyEmail}
                copyPassword={handle.copyPassword}
                deletePassword={handle.deletePassword}
              />
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
