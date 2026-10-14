import { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "@/components/ThemeProvider";
import { Theme } from "@/util/Theme";
import { WindowContext } from "@/components/WindowManager";

const TitleBarDiv = styled.div<{ $theme: Theme }>`
  background-color: ${(props) =>
    props.$theme.terminalTheme.titleBarBackgroundColor.getStyle()};
  width: 100%;
  height: 10%;
  border-radius: 12px 12px 0px 0px;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  gap: 10px;
`;

const Text = styled.p<{ $theme: Theme }>`
  color: ${(props) => props.$theme.terminalTheme.titleBarTextColor.getStyle()};
  font-size: 13.5pt;
  white-space: nowrap;

  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const WindowButton = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 10px;

  &:hover {
    opacity: 75%;
    cursor: pointer;
  }
`;

const CloseButton = styled(WindowButton)<{ $theme: Theme }>`
  background-color: ${(props) =>
    props.$theme.terminalTheme.titleBarButton1Color.getStyle()};
`;

const MinimizeButton = styled(WindowButton)<{ $theme: Theme }>`
  background-color: ${(props) =>
    props.$theme.terminalTheme.titleBarButton2Color.getStyle()};
`;

const MaximizeButton = styled(WindowButton)<{ $theme: Theme }>`
  background-color: ${(props) =>
    props.$theme.terminalTheme.titleBarButton3Color.getStyle()};
`;

interface TitleBarProps {
  id: string;
  title: string;
}

export default function TitleBar(props: TitleBarProps) {
  const { theme } = useContext(ThemeContext);
  const { closeWindow, minimizeWindow } = useContext(WindowContext);

  const handleCloseButtonClicked = () => {
    closeWindow(props.id);
  };

  const handleMinimizeButtonClicked = () => {
    minimizeWindow(props.id);
  };

  return (
    <TitleBarDiv $theme={theme}>
      <CloseButton $theme={theme} onClick={handleCloseButtonClicked} />
      <MinimizeButton $theme={theme} onClick={handleMinimizeButtonClicked} />
      <MaximizeButton $theme={theme} />
      <Text $theme={theme}>{props.title}</Text>
    </TitleBarDiv>
  );
}
