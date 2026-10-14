import React, { useContext } from "react";
import { Rnd } from "react-rnd";

import style from "@/styles/Window.module.css";
import TitleBar from "./TitleBar";
import { WindowContext, WindowState } from "@/components/WindowManager";

interface WindowProps {
  state: WindowState;
  title: string;
  children: React.ReactNode;
}

export default function Window(props: WindowProps) {
  const { focusWindow } = useContext(WindowContext);
  const { id, x, y, z } = props.state;

  return (
    <Rnd
      default={{ x, y, width: "auto", height: "auto" }}
      style={{ zIndex: z }}
      onMouseDown={() => focusWindow(id)}
      enableResizing={false}
    >
      <div
        className={style.root}
        // Block the browser's native drag-and-drop of images and links. It
        // swallows the mouseup, which left the window stuck to the cursor.
        onDragStart={(e) => e.preventDefault()}
      >
        <TitleBar id={id} title={props.title} />
        {props.children}
      </div>
    </Rnd>
  );
}
