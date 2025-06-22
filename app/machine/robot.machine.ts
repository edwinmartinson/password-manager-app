import {
  action,
  createMachine,
  immediate,
  interpret,
  reduce,
  state,
  transition,
  type SendFunction,
} from "robot3";
import type { Password } from "~/type.app";

type CTX = {
  passwords: Password[];
};

type EV<T> = {
  type: string;
  value: T;
};

type Event = "ADD_PASSWORD" | "VIEW_PASSWORD" | "NEW_PASSWORD";

const context = (): CTX => ({
  passwords: [],
});

const RobotMachine = createMachine(
  {
    viewMode: state(
      transition(
        "ADD_PASSWORD",
        "addMode",
        action(() => console.log("Switching to addMode")),
      ),
    ),
    addMode: state(
      transition(
        "VIEW_PASSWORD",
        "viewMode",
        action(() => console.log("Switching to viewMode")),
      ),
      transition(
        "NEW_PASSWORD",
        "addMode",
        reduce<CTX, EV<Password>>((ctx, ev) => ({
          passwords: [...ctx.passwords, ev.value],
        })),
      ),
    ),
    editMode: state(),
    deleteMode: state(),
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
