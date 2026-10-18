import { useContext, useEffect, useState } from "react";
import DesktopIcon from "./DesktopIcon";
import { WindowContext } from "@/components/WindowManager";
import { HOME, STARTUP_APPS } from "@/apps";

export default function Desktop() {
  const { openApp } = useContext(WindowContext);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Pressing on an icon selects it; pressing anywhere else (a window, the
  // task bar, the wallpaper) clears the selection.
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const icon =
        e.target instanceof Element
          ? e.target.closest<HTMLElement>("[data-desktop-icon]")
          : null;
      setSelectedId(icon?.dataset.desktopIcon ?? null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  useEffect(() => {
    // Opening an app that is already open only focuses it, so this is safe
    // to run twice under React strict mode.
    STARTUP_APPS.forEach((app) => openApp(app, [HOME]));
  }, [openApp]);

  return (
    <>
      {HOME.children.map((app, i) => (
        <DesktopIcon
          key={app.id}
          app={app}
          selected={app.id === selectedId}
          x={10}
          y={10 + i * 90}
          onOpen={() => openApp(app, [HOME])}
        />
      ))}
    </>
  );
}
