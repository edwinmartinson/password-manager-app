import {
  action,
  createMachine,
  interpret,
  reduce,
  state,
  transition,
  type SendFunction,
} from "robot3";
import { copyToClipboard, logError } from "~/lib/utils";
import type { Password } from "~/type.app";

// Types
type CTX = {
  passwords: Password[];
};

type EV<T> = {
  type: Event;
  value: T;
};

type Event =
  | "VIEW_MODE"
  | "ADD_MODE"
  | "DELETE_MODE"
  | "EDIT_MODE"
  | "ADD_PASSWORD"
  | "EDIT_PASSWORD"
  | "DELETE_PASSWORD"
  | "COPY_EMAIL"
  | "COPY_PASSWORD";

export type MachineState = "viewMode" | "addMode" | "editMode" | "deleteMode";

// Context
const context = (): CTX => ({
  passwords: [],
});

// Reducers
const reduceAddPassword = reduce<CTX, EV<Password>>((ctx, ev) => ({
  passwords: [...ctx.passwords, ev.value],
}));

const reduceEditPassword = reduce<CTX, EV<Password>>((ctx, ev) => ({
  passwords: ctx.passwords.map((item) =>
    item.id === ev.value.id ? { ...item, ...ev.value } : item,
  ),
}));

const reduceDeletePassword = reduce<CTX, EV<string>>((ctx, ev) => ({
  passwords: ctx.passwords.filter((item) => item.id !== ev.value),
}));

// Actions
const actionLogState = action<CTX, Event>((ctx, ev) => {
  console.log("switching to: ", ev);
});

const actionCopyEmail = action<CTX, EV<string>>((ctx, ev) => {
  const item = ctx.passwords.find((item) => item.id == ev.value);

  if (item) {
    copyToClipboard(item.email).catch(logError);
  }
});

const actionCopyPassword = action<CTX, EV<string>>((ctx, ev) => {
  const item = ctx.passwords.find((item) => item.id == ev.value);

  if (item) {
    copyToClipboard(item.password).catch(logError);
  }
});

const RobotMachine = createMachine(
  {
    viewMode: state(
      transition("ADD_MODE", "addMode", actionLogState),
      transition("EDIT_MODE", "editMode", actionLogState),
      transition("DELETE_MODE", "deleteMode", actionLogState),
      transition("COPY_EMAIL", "viewMode", actionCopyEmail),
      transition("COPY_PASSWORD", "viewMode", actionCopyPassword),
    ),
    addMode: state(
      transition("VIEW_MODE", "viewMode", actionLogState),
      transition("ADD_PASSWORD", "addMode", reduceAddPassword),
    ),
    editMode: state(
      transition("VIEW_MODE", "viewMode", actionLogState),
      transition("EDIT_PASSWORD", "viewMode", reduceEditPassword),
    ),
    deleteMode: state(
      transition("VIEW_MODE", "viewMode", actionLogState),
      transition("DELETE_PASSWORD", "viewMode", reduceDeletePassword),
    ),
  },
  context,
);

const RobotService = interpret(RobotMachine);

type RobotServiceTypes = typeof RobotService;

type RobotMachineContext = {
  current: {
    context: RobotServiceTypes["machine"]["context"];
    name: RobotServiceTypes["machine"]["state"]["name"];
    value: RobotServiceTypes["machine"]["state"]["value"];
  };
  send: SendFunction<Event>;
};

export { RobotMachine, type RobotMachineContext };
