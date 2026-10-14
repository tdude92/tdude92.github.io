import { useContext } from "react";
import FileExplorer from "./FileExplorer";
import Terminal from "./Terminal";
import { WindowContext } from "./WindowManager";

export default function Windows() {
  const { windows } = useContext(WindowContext);
  return (
    <>
      {windows.map((state) =>
        state.kind === "terminal" ? (
          <Terminal key={state.id} state={state} />
        ) : (
          <FileExplorer key={state.id} state={state} />
        )
      )}
    </>
  );
}
