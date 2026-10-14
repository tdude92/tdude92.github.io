import { IconType } from "react-icons";
import {
  TbBrandDiscord,
  TbBrandRust,
  TbCar,
  TbFish,
  TbFolderFilled,
  TbGalaxy,
  TbHomeFilled,
  TbMoonFilled,
  TbSatellite,
  TbSunFilled,
  TbUserFilled,
} from "react-icons/tb";
import { DARK_MODE, Theme } from "@/util/Theme";
import TerminalData from "@/TerminalData";
import AboutMe from "@/TerminalData/AboutMe";
import AcreageContour from "@/TerminalData/Projects/AcreageContour";
import DiscordDistances from "@/TerminalData/Projects/DiscordDistances";
import GarbageWrangler from "@/TerminalData/Projects/GarbageWrangler";
import NBodyTool from "@/TerminalData/Projects/NBodyTool";
import NEATCars from "@/TerminalData/Projects/NEATCars";
import RustyRaytracer from "@/TerminalData/Projects/RustyRaytracer";

// Everything that shows up as an icon on the desktop or in a File Explorer.
// `icon` takes any react-icons component (https://react-icons.github.io).

interface BaseApp {
  // Must be unique across the whole tree; doubles as the window id.
  id: string;
  name: string;
  icon: IconType;
}

// Opens a Terminal window.
export interface TerminalApp extends BaseApp {
  type: "terminal";
  terminal: () => TerminalData;
}

// Opens a File Explorer window showing its children.
export interface FolderApp extends BaseApp {
  type: "folder";
  children: App[];
}

// Switches between day and night mode instead of opening a window. Its name
// and icon change with the mode.
export interface ThemeApp {
  type: "theme";
  id: string;
  day: Pick<BaseApp, "name" | "icon">; // shown in day mode
  night: Pick<BaseApp, "name" | "icon">; // shown in night mode
}

export type App = TerminalApp | FolderApp | ThemeApp;

// The name and icon to show for an app in the current theme.
export const appearance = (app: App, theme: Theme) =>
  app.type === "theme" ? (theme === DARK_MODE ? app.night : app.day) : app;

const aboutMe: TerminalApp = {
  type: "terminal",
  id: "about-me",
  name: "About Me",
  icon: TbUserFilled,
  terminal: AboutMe,
};

const projects: FolderApp = {
  type: "folder",
  id: "projects",
  name: "Projects",
  icon: TbFolderFilled,
  children: [
    {
      type: "terminal",
      id: "acreage-contour",
      name: "Acreage Contour",
      icon: TbSatellite,
      terminal: AcreageContour,
    },
    {
      type: "terminal",
      id: "discord-distances",
      name: "Discord Distances",
      icon: TbBrandDiscord,
      terminal: DiscordDistances,
    },
    {
      type: "terminal",
      id: "neat-cars",
      name: "NEAT Cars",
      icon: TbCar,
      terminal: NEATCars,
    },
    {
      type: "terminal",
      id: "garbage-wrangler",
      name: "Garbage Wrangler",
      icon: TbFish,
      terminal: GarbageWrangler,
    },
    {
      type: "terminal",
      id: "rusty-raytracer",
      name: "Rusty Raytracer",
      icon: TbBrandRust,
      terminal: RustyRaytracer,
    },
    {
      type: "terminal",
      id: "nbody-tool",
      name: "N-Body Tool",
      icon: TbGalaxy,
      terminal: NBodyTool,
    },
  ],
};

// Shows the mode a double-click switches to.
const themeToggle: ThemeApp = {
  type: "theme",
  id: "theme-toggle",
  day: { name: "Night Mode", icon: TbMoonFilled },
  night: { name: "Day Mode", icon: TbSunFilled },
};

// The root folder ("~"). Its children are the icons on the desktop.
export const HOME: FolderApp = {
  type: "folder",
  id: "home",
  name: "Home",
  icon: TbHomeFilled,
  children: [aboutMe, projects, themeToggle],
};

// Opened when the page loads.
export const STARTUP_APPS: App[] = [aboutMe];
