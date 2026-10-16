import { useContext } from "react";
import { Rnd } from "react-rnd";
import styled from "styled-components";
import { ThemeContext } from "@/components/ThemeProvider";
import { App, appearance } from "@/apps";
import { Theme } from "@/util/Theme";

const IconDiv = styled.div<{ $theme: Theme }>`
  width: 80px;
  height: 80px;

  &:hover {
    background-color: ${(props) => props.$theme.fileTheme.highlightColor};
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
      <IconDiv $theme={theme} onDoubleClick={props.onOpen}>
        <Icon size="60px" color={theme.fileTheme.iconColor.getStyle()} />
        <IconName $theme={theme}>{name}</IconName>
      </IconDiv>
    </Rnd>
  );
}
