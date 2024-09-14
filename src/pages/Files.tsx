import { useContext, useState } from "react";
import File from "./File";
import { WindowContext } from "./WindowManager";
import AboutMe from "./view/Terminal/TerminalData/AboutMe";
import AcreageContour from "./view/Terminal/TerminalData/Projects/AcreageContour";
import DiscordDistances from "./view/Terminal/TerminalData/Projects/DiscordDistances";
import GarbageWrangler from "./view/Terminal/TerminalData/Projects/GarbageWrangler";
import NBodyTool from "./view/Terminal/TerminalData/Projects/NBodyTool";
import NEATCars from "./view/Terminal/TerminalData/Projects/NEATCars";
import RustyRaytracer from "./view/Terminal/TerminalData/Projects/RustyRaytracer";

export default function Files() {
  const { windows, setWindows } = useContext(WindowContext);

  const handleAboutMeDoubleClick = () => {
    setWindows(windows.concat([AboutMe()]));
  };

  const handleProjectsDoubleClick = () => {
    const centerX = window.innerWidth / 2 - 400;
    const centerY = window.innerHeight / 2 - 225;
    setWindows(
      windows.concat([
        AcreageContour(centerX + 20, centerY - 20),
        DiscordDistances(centerX + 10, centerY - 10),
        NEATCars(centerX, centerY),
        GarbageWrangler(centerX - 10, centerY + 10),
        RustyRaytracer(centerX - 20, centerY + 20),
        NBodyTool(centerX - 30, centerY + 30),
      ])
    );
  };

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
