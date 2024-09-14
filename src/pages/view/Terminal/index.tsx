import { Rnd } from "react-rnd";
import { useState, useEffect } from "react";

import style from "@/styles/Terminal.module.css";
import TitleBar from "./TitleBar";
import TerminalBody from "./TerminalBody";
import TerminalData from "./TerminalData";

interface TerminalProps {
  data: TerminalData;
}

export default function Terminal(props: TerminalProps) {
  const [terminalPositionX, setTerminalPositionX] = useState(0);
  const [terminalPositionY, setTerminalPositionY] = useState(0);

  useEffect(() => {
    setTerminalPositionX(window.innerWidth / 2 - 400);
    setTerminalPositionY(window.innerHeight / 2 - 225);
  }, []);

  return (
    <Rnd
      position={{ x: terminalPositionX, y: terminalPositionY }}
      onDragStop={(e, d) => {
        setTerminalPositionX(d.x);
        setTerminalPositionY(d.y);
      }}
      enableResizing={false}
    >
      <div className={style.root}>
        <TitleBar data={props.data} />
        <TerminalBody data={props.data} />
      </div>
    </Rnd>
  );
}
