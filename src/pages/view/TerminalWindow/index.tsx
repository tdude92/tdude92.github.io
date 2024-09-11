import { TitleBar } from "./TitleBar";
import { TerminalBody } from "./TerminalBody";

import style from "@/styles/TerminalWindow.module.css";

export function TerminalWindow() {
  return (
    <div className={style.root}>
      <TitleBar />
      <TerminalBody />
    </div>
  );
}
