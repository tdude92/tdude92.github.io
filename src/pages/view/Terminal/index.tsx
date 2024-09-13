import { Rnd } from "react-rnd";
import { useState, useEffect } from "react";

import TitleBar from "./TitleBar";
import TerminalBody from "./TerminalBody";

import style from "@/styles/Terminal.module.css";

export default function Terminal() {
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
    >
      <div className={style.root}>
        <TitleBar />
        <TerminalBody />
      </div>
    </Rnd>
  );
}
