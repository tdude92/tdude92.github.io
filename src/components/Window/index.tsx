import React, { useContext, useLayoutEffect, useRef } from "react";
import { Rnd } from "react-rnd";

import style from "@/styles/Window.module.css";
import TitleBar from "./TitleBar";
import {
  isTaskbarVisible,
  TASKBAR_HEIGHT,
  WindowContext,
  WindowState,
} from "@/components/WindowManager";

interface WindowProps {
  state: WindowState;
  title: string;
  children: React.ReactNode;
}

export default function Window(props: WindowProps) {
  const { windows, focusWindow } = useContext(WindowContext);
  const { id, x, y, z, minimized, maximized } = props.state;

  const rnd = useRef<Rnd>(null);
  // Where the window was before it was maximized, to put it back on restore.
  const restorePosition = useRef<{ x: number; y: number } | null>(null);

  // The window's position is owned by Rnd (it's only set on mount and by
  // dragging), so move it to the corner and back by hand. The size is
  // handled in CSS.
  useLayoutEffect(() => {
    const draggable = rnd.current;
    if (!draggable) {
      return;
    }
    if (maximized) {
      restorePosition.current = draggable.getDraggablePosition();
      draggable.updatePosition({ x: 0, y: 0 });
    } else if (restorePosition.current) {
      draggable.updatePosition(restorePosition.current);
      restorePosition.current = null;
    }
  }, [maximized]);

  const className = [
    style.window,
    minimized && style.minimized,
    maximized && style.maximized,
  ]
    .filter(Boolean)
    .join(" ");
  const taskbarHeight = isTaskbarVisible(windows) ? TASKBAR_HEIGHT : 0;

  return (
    <Rnd
      ref={rnd}
      default={{ x, y, width: "auto", height: "auto" }}
      // Minimized windows stay mounted so they keep their position and state.
      className={className}
      style={
        {
          zIndex: z,
          "--taskbar-height": `${taskbarHeight}px`,
        } as React.CSSProperties
      }
      onMouseDown={() => focusWindow(id)}
      disableDragging={maximized}
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
