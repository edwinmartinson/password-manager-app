import {
  Popover,
  PopoverButton,
  PopoverPanel,
  CloseButton,
} from "@headlessui/react";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import Button from "./ui/Button";
import { useRobot } from "~/context/robot.context";
import type { MachineState } from "~/robot/machine";

type CopyPasswordProps = {
  id: string;
};

export default function CopyPassword(props: CopyPasswordProps) {
  const { current, send } = useRobot();
  const state = current.name as MachineState;

  const handle = {
    copyEmail: (id: string) => {
      send({ type: "COPY_EMAIL", value: id });
    },
    copyPassword: (id: string) => {
      send({ type: "COPY_PASSWORD", value: id });
    },
  };

  return (
    <Popover>
      <Button
        variant="raw"
        element={PopoverButton}
        disabled={state !== "viewMode"}
        className="hover:text-content-primary/80 active:text-content-primary/90"
      >
        <ClipboardIcon className="size-7 stroke-2" />
      </Button>

      <PopoverPanel
        className="bg-surface-primary/80 ring-surface-tertiary w-65 space-y-2 rounded-xl p-3 ring backdrop-blur-lg transition duration-200 ease-in-out [--anchor-gap:--spacing(4)] data-closed:translate-y-[-16px] data-closed:opacity-0"
        transition
        anchor="bottom"
      >
        <Button
          element={CloseButton}
          variant="secondary"
          onClick={() => handle.copyEmail(props.id)}
        >
          Copy Email
        </Button>
        <Button
          element={CloseButton}
          variant="secondary"
          onClick={() => handle.copyPassword(props.id)}
        >
          Copy Password
        </Button>
      </PopoverPanel>
    </Popover>
  );
}
