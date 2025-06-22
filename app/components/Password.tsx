import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
  PopoverGroup,
  CloseButton,
} from "@headlessui/react";
import { KeyIcon } from "@heroicons/react/24/solid";
import { ClipboardIcon, TrashIcon } from "@heroicons/react/24/outline";
import EditPassword from "./EditPassword";
import Button from "./Button";
import type { Password } from "~/type.app";
import { extractDomain } from "~/lib/utils";
import type { MachineState } from "~/machine/robot.machine";

type PasswordProps = {
  item: Password;
  appState: MachineState;
  copyEmail: (id: string) => void;
  copyPassword: (id: string) => void;
  deletePassword: (id: string) => void;
};

export default function Password(props: PasswordProps) {
  return (
    <PopoverGroup className="bg-surface-secondary hover:ring-surface-tertiary flex items-center gap-4 rounded-xl px-4 py-3 text-left ring ring-transparent">
      <Popover className="w-full">
        <PopoverButton
          disabled={props.appState !== "viewMode"}
          className="flex w-full cursor-pointer items-center gap-4 text-left"
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
        </PopoverButton>

        <PopoverBackdrop className="bg-surface-primary/50 fixed inset-0 backdrop-blur-sm" />

        <PopoverPanel
          transition
          className="bg-surface-primary ring-surface-tertiary absolute top-0 right-0 h-full w-[400px] ring transition duration-300 ease-in-out data-closed:translate-x-[400px] max-[500px]:w-[80%]"
        >
          <EditPassword item={props.item} />
        </PopoverPanel>
      </Popover>

      {props.appState === "deleteMode" ? (
        <Button
          variant="raw"
          onClick={() => props.deletePassword(props.item.id)}
          className="text-red-500 hover:text-red-500/80 active:text-red-500/90"
        >
          <TrashIcon className="size-7 stroke-2" />
        </Button>
      ) : (
        <Popover>
          <Button
            variant="raw"
            element={PopoverButton}
            disabled={props.appState !== "viewMode"}
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
              onClick={() => props.copyEmail(props.item.id)}
            >
              Copy Email
            </Button>
            <Button
              element={CloseButton}
              variant="secondary"
              onClick={() => props.copyPassword(props.item.id)}
            >
              Copy Password
            </Button>
          </PopoverPanel>
        </Popover>
      )}
    </PopoverGroup>
  );
}
