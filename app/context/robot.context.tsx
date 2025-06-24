import { createContext, useContext } from "react";
import { useMachine } from "react-robot";
import { RobotMachine, type RobotMachineContext } from "~/robot/machine";

const RobotContext = createContext<RobotMachineContext | undefined>(undefined);

function RobotProvider({ children }: { children: React.ReactNode }) {
  const [current, send] = useMachine(RobotMachine);

  return (
    <RobotContext.Provider value={{ current, send }}>
      {children}
    </RobotContext.Provider>
  );
}

function useRobot() {
  const context = useContext(RobotContext);
  if (!context) {
    throw new Error("useRobot must be used within a RobotProvider");
  }
  return context;
}

export { RobotContext, RobotProvider, useRobot };
