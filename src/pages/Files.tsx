import { useContext, useState } from "react";
import File from "./File";
import { WindowContext } from "./WindowManager";
import AboutMe from "./view/Terminal/TerminalData/AboutMe";

export default function Files() {
  const { windows, setWindows } = useContext(WindowContext);

  const handleAboutMeDoubleClick = () => {
    setWindows(windows.concat([AboutMe()]));
  };

  const handleProjectsDoubleClick = () => {};

  return (
    <>
      <File
        fileName="About Me"
        x={10}
        y={10}
        onDoubleClick={handleAboutMeDoubleClick}
      />
      <File
        fileName="Projects"
        x={10}
        y={100}
        onDoubleClick={handleProjectsDoubleClick}
      />
    </>
  );
}
