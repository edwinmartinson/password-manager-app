import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
  PopoverGroup,
} from "@headlessui/react";
import { KeyIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import EditPassword from "./EditPassword";
import Button from "./ui/Button";
import type { Password } from "~/type.app";
import { extractDomain } from "~/lib/utils";
import type { MachineState } from "~/robot/machine";
import { useRef } from "react";
import { useMutationObserver } from "~/hooks/useMutationObserver";
import CopyPassword from "./CopyPassword";
import { useRobot } from "~/context/robot.context";

type PasswordProps = {
  item: Password;
};

export default function Password(props: PasswordProps) {
  const popoverRef = useRef<HTMLDivElement | null>(null);

  const { current, send } = useRobot();
  const state = current.name as MachineState;

  const handle = {
    toggleViewMode: () => send("VIEW_MODE"),
    toggleEditMode: () => send("EDIT_MODE"),
    deletePassword: (id: string) => {
      send({ type: "DELETE_PASSWORD", value: id });
    },
  };

  useMutationObserver(popoverRef, { attributes: true }, (mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === "data-headlessui-state") {
        const target = mutation.target as HTMLElement;

        if (target.getAttribute("data-headlessui-state") === "") {
          handle.toggleViewMode();
        }
      }
    });
  });

  return (
    <PopoverGroup className="bg-surface-secondary hover:ring-surface-tertiary flex items-center gap-4 rounded-xl px-4 py-3 text-left ring ring-transparent">
      <Popover id="xtarget" ref={popoverRef} className="w-full">
        <Button
          variant="raw"
          disabled={state !== "viewMode"}
          onClick={handle.toggleEditMode}
          className="flex w-full cursor-pointer items-center gap-4 text-left"
          element={PopoverButton}
        >
          <div className="bg-surface-tertiary flex size-10 shrink-0 items-center justify-center rounded-full">
            <KeyIcon className="size-4" />
          </div>

          <div className="w-full">
            <p className="truncate text-lg">{extractDomain(props.item.url)}</p>
            <p className="text-content-secondary truncate">
              {props.item.email}
            </p>
          </div>
        </Button>

        <PopoverBackdrop className="bg-surface-primary/50 fixed inset-0 backdrop-blur-sm" />

        <PopoverPanel
          transition
          className="bg-surface-primary ring-surface-tertiary absolute top-0 right-0 h-full w-[400px] ring transition duration-300 ease-in-out data-closed:translate-x-[400px] max-[500px]:w-[80%]"
        >
          <EditPassword item={props.item} />
        </PopoverPanel>
      </Popover>

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
    </PopoverGroup>
  );
}
