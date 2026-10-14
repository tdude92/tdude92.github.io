import { useContext, useEffect } from "react";
import DesktopIcon from "./DesktopIcon";
import { WindowContext } from "@/components/WindowManager";
import { HOME, STARTUP_APPS } from "@/apps";

export default function Desktop() {
  const { openApp } = useContext(WindowContext);

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
          x={10}
          y={10 + i * 90}
          onOpen={() => openApp(app, [HOME])}
        />
      ))}
    </>
  );
}
