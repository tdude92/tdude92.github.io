import TitleBar from "./TitleBar";
import TerminalBody from "./TerminalBody";

import style from "@/styles/Terminal.module.css";

export default function Terminal() {
  return (
    <div className={style.root}>
      <TitleBar />
      <TerminalBody />
    </div>
  );
}
