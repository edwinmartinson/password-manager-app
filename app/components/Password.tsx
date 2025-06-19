import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
  PopoverGroup,
} from "@headlessui/react";
import { KeyIcon } from "@heroicons/react/24/solid";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import EditPassword from "./EditPassword";
import Button from "./Button";

export default function Password() {
  return (
    <PopoverGroup className="bg-surface-secondary hover:ring-surface-tertiary flex items-center gap-4 rounded-xl px-4 py-3 text-left ring ring-transparent">
      <Popover className="w-full">
        <PopoverButton className="flex w-full cursor-pointer items-center gap-4 text-left">
          <div className="bg-surface-tertiary flex size-10 shrink-0 items-center justify-center rounded-full">
            <KeyIcon className="size-4" />
          </div>

          <div className="w-full">
            <p className="truncate text-lg">example.com</p>
            <p className="text-content-secondary truncate">example@email.com</p>
          </div>
        </PopoverButton>

        <PopoverBackdrop className="bg-surface-primary/50 fixed inset-0 backdrop-blur-sm" />

        <PopoverPanel
          transition
          className="bg-surface-primary ring-surface-tertiary absolute top-0 right-0 h-full w-[400px] ring transition duration-300 ease-in-out data-closed:translate-x-[400px] max-[500px]:w-[80%]"
        >
          <EditPassword />
        </PopoverPanel>
      </Popover>

      <Popover>
        <PopoverButton className="cursor-pointer">
          <div role="button">
            <ClipboardIcon className="size-7 stroke-2" />
          </div>
        </PopoverButton>

        <PopoverPanel
          className="bg-surface-primary/80 ring-surface-tertiary w-65 space-y-2 rounded-xl p-3 ring backdrop-blur-lg transition duration-200 ease-in-out [--anchor-gap:--spacing(4)] data-closed:translate-y-[-16px] data-closed:opacity-0"
          transition
          anchor="bottom"
        >
          <div className="flex w-full items-center justify-between gap-2">
            <p className="truncate">placeholder@example.com</p>
            <Button variant="rounded" size="sm">
              <ClipboardIcon className="size-4 stroke-2" />
            </Button>
          </div>

          <div className="flex w-full items-center justify-between gap-2">
            <p className="truncates">************</p>
            <Button variant="rounded" size="sm">
              <ClipboardIcon className="size-4 stroke-2" />
            </Button>
          </div>
        </PopoverPanel>
      </Popover>
    </PopoverGroup>
  );
}
