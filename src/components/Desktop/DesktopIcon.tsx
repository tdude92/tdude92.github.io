import { useContext } from "react";
import { Rnd } from "react-rnd";
import styled from "styled-components";
import { ThemeContext } from "@/components/ThemeProvider";
import { App, appearance } from "@/apps";
import { Theme } from "@/util/Theme";

const IconDiv = styled.div<{ $theme: Theme; $selected: boolean }>`
  width: 80px;
  height: 80px;

  // Like Windows: hovered, selected and selected-and-hovered icons each
  // get their own highlight.
  background-color: ${(props) =>
    props.$selected ? props.$theme.fileTheme.selectedColor : "transparent"};
  box-shadow: ${(props) =>
    props.$selected ? "inset 0 0 0 1px rgba(255, 255, 255, 0.35)" : "none"};

  &:hover {
    background-color: ${(props) =>
      props.$selected
        ? props.$theme.fileTheme.selectedHoverColor
        : props.$theme.fileTheme.highlightColor};
    cursor: pointer;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0px;
`;

const IconName = styled.div<{ $theme: Theme }>`
  color: ${(props) => props.$theme.fileTheme.nameColor.getStyle()};
`;

interface DesktopIconProps {
  app: App;
  selected: boolean;
  x: number;
  y: number;
  onOpen: () => void;
}

export default function DesktopIcon(props: DesktopIconProps) {
  const { theme } = useContext(ThemeContext);
  const { name, icon: Icon } = appearance(props.app, theme);

  return (
    <Rnd
      default={{ x: props.x, y: props.y, width: "auto", height: "auto" }}
      enableResizing={false}
    >
      <IconDiv
        $theme={theme}
        $selected={props.selected}
        // Read by Desktop to tell which icon was pressed.
        data-desktop-icon={props.app.id}
        onDoubleClick={props.onOpen}
      >
        <Icon size="60px" color={theme.fileTheme.iconColor.getStyle()} />
        <IconName $theme={theme}>{name}</IconName>
      </IconDiv>
    </Rnd>
  );
}
