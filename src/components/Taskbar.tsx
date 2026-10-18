import { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "@/components/ThemeProvider";
import {
  activeWindowId,
  isTaskbarVisible,
  TASKBAR_HEIGHT,
  WindowContext,
  windowApp,
} from "@/components/WindowManager";
import { Theme } from "@/util/Theme";

const Bar = styled.nav<{ $theme: Theme; $hidden: boolean }>`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: ${TASKBAR_HEIGHT}px;
  // Window z-indexes count up from 1 each time one is focused.
  z-index: 2147483647;

  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0px 8px;

  background-color: ${(props) =>
    `#${props.$theme.terminalTheme.bodyBackgroundColor.getHexString()}cc`};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-top: 1px solid rgba(255, 255, 255, 0.12);

  // Slides off the bottom of the screen when no windows are open.
  transform: translateY(${(props) => (props.$hidden ? "100%" : "0%")});
  transition: transform 0.2s ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Entry = styled.button<{
  $theme: Theme;
  $active: boolean;
  $minimized: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 38px;
  min-width: 0;
  max-width: 200px;
  padding: 0px 12px;
  border: none;
  border-radius: 6px;

  font: inherit;
  font-size: 12pt;
  color: ${(props) => props.$theme.terminalTheme.bodyTextColor.getStyle()};
  opacity: ${(props) => (props.$minimized ? 0.6 : 1)};
  background-color: ${(props) =>
    props.$active
      ? props.$theme.terminalTheme.bodyTextHighlightColor.getStyle()
      : "transparent"};
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.$active
        ? props.$theme.terminalTheme.bodyTextHighlightColor.getStyle()
        : props.$theme.fileTheme.highlightColor};
  }

  // Underline marking the active window.
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 2px;
    width: 16px;
    height: 3px;
    border-radius: 2px;
    transform: translateX(-50%);
    background-color: ${(props) =>
      props.$theme.terminalTheme.bodyCWDTextColor.getStyle()};
    opacity: ${(props) => (props.$active ? 1 : 0)};
  }
`;

const Label = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export default function Taskbar() {
  const { theme } = useContext(ThemeContext);
  const { windows, toggleWindow } = useContext(WindowContext);
  const activeId = activeWindowId(windows);

  return (
    <Bar
      $theme={theme}
      $hidden={!isTaskbarVisible(windows)}
      aria-label="Taskbar"
    >
      {windows.map((w) => {
        const app = windowApp(w);
        return (
          <Entry
            key={w.id}
            $theme={theme}
            $active={w.id === activeId}
            $minimized={w.minimized}
            title={app.name}
            onClick={() => toggleWindow(w.id)}
          >
            <app.icon
              size="1.3em"
              color={theme.fileTheme.iconColor.getStyle()}
              style={{ flexShrink: 0 }}
            />
            <Label>{app.name}</Label>
          </Entry>
        );
      })}
    </Bar>
  );
}
