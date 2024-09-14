import { useContext } from "react";
import Terminal from "./view/Terminal";
import { WindowContext } from "./WindowManager";

export default function Windows() {
  const { windows } = useContext(WindowContext);
  return (
    <>
      {windows.map((terminalData, idx) => (
        <Terminal
          key={idx}
          data={terminalData}
          x={terminalData.startX}
          y={terminalData.startY}
        />
      ))}
    </>
  );
}
