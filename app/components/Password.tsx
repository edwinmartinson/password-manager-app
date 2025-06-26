import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { KeyIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";

import type { Password } from "~/type.app";
import type { MachineState } from "~/robot/machine";
import { extractDomain } from "~/lib/utils";
import Button from "./ui/Button";
import EditPassword from "./EditPassword";
import CopyPassword from "./CopyPassword";
import { useRobot } from "~/context/robot.context";

type PasswordProps = {
  item: Password;
};

export default function Password(props: PasswordProps) {
  let [isOpen, setIsOpen] = useState(false);

  const { current, send } = useRobot();
  const state = current.name as MachineState;

  const handle = {
    toggleViewMode: () => send("VIEW_MODE"),
    toggleEditMode: () => send("EDIT_MODE"),
    deletePassword: (id: string) => {
      send({ type: "DELETE_PASSWORD", value: id });
    },
    open: () => {
      setIsOpen(true);
      handle.toggleEditMode();
    },
    close: () => {
      setIsOpen(false);
      handle.toggleViewMode();
    },
  };

  return (
    <div className="bg-surface-secondary hover:ring-surface-tertiary flex items-center gap-4 rounded-xl px-4 py-3 text-left ring ring-transparent">
      <Button
        variant="raw"
        disabled={state !== "viewMode"}
        onClick={handle.open}
        className="flex w-full cursor-pointer items-center gap-4 text-left"
      >
        <div className="bg-surface-tertiary flex size-10 shrink-0 items-center justify-center rounded-full">
          <KeyIcon className="size-4" />
        </div>

        <div className="w-full">
          <p className="truncate text-lg">{extractDomain(props.item.url)}</p>
          <p className="text-content-secondary truncate">{props.item.email}</p>
        </div>
      </Button>

      <Dialog open={isOpen} onClose={handle.close}>
        <EditPassword item={props.item} />
      </Dialog>

      {state === "deleteMode" ? (
        <Button
          variant="raw"
          onClick={() => handle.deletePassword(props.item.id)}
          className="text-red-500 hover:text-red-500/80 active:text-red-500/90"
        >
          <TrashIcon className="size-7 stroke-2" />
        </Button>
      ) : (
        <CopyPassword id={props.item.id} />
      )}
    </div>
  );
}
