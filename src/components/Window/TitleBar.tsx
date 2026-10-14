import { useContext } from "react";
import styled from "styled-components";
import { LuMoonStar, LuSun } from "react-icons/lu";
import { ThemeContext } from "@/components/ThemeProvider";
import { DARK_MODE, LIGHT_MODE, Theme } from "@/util/Theme";
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

const DarkModeButton = styled(LuMoonStar)<{ $theme: Theme }>`
  color: ${(props) => props.$theme.terminalTheme.titleBarTextColor.getStyle()};
  margin-left: auto;

  // disable text selection on fast click
  user-select: none; /* standard syntax */
  -webkit-user-select: none; /* webkit (safari, chrome) browsers */
  -moz-user-select: none; /* mozilla browsers */
  -khtml-user-select: none; /* webkit (konqueror) browsers */
  -ms-user-select: none; /* IE10+ */

  &:hover {
    color: #ffffff;
    cursor: pointer;
  }
`;

const LightModeButton = styled(LuSun)<{ $theme: Theme }>`
  color: ${(props) => props.$theme.terminalTheme.titleBarTextColor.getStyle()};
  margin-left: auto;

  // disable text selection on fast click
  user-select: none; /* standard syntax */
  -webkit-user-select: none; /* webkit (safari, chrome) browsers */
  -moz-user-select: none; /* mozilla browsers */
  -khtml-user-select: none; /* webkit (konqueror) browsers */
  -ms-user-select: none; /* IE10+ */

  &:hover {
    color: #ffffff;
    cursor: pointer;
  }
`;

interface TitleBarProps {
  id: string;
  title: string;
}

export default function TitleBar(props: TitleBarProps) {
  const { theme, setTheme } = useContext(ThemeContext);
  const { closeWindow } = useContext(WindowContext);

  const handleCloseButtonClicked = () => {
    closeWindow(props.id);
  };

  const handleMinimizeButtonClicked = () => {
    closeWindow(props.id);
  };

  const useToggleThemeButton = (theme: Theme) => {
    switch (theme) {
      case LIGHT_MODE: {
        return (
          <DarkModeButton
            $theme={theme}
            size="1.5em"
            onClick={() => {
              setTheme(DARK_MODE);
            }}
          />
        );
      }
      case DARK_MODE: {
        return (
          <LightModeButton
            $theme={theme}
            size="1.5em"
            onClick={() => {
              setTheme(LIGHT_MODE);
            }}
          />
        );
      }
      default: {
        <div />;
      }
    }
  };

  return (
    <TitleBarDiv $theme={theme}>
      <CloseButton $theme={theme} onClick={handleCloseButtonClicked} />
      <MinimizeButton $theme={theme} onClick={handleMinimizeButtonClicked} />
      <MaximizeButton $theme={theme} />
      <Text $theme={theme}>{props.title}</Text>
      {useToggleThemeButton(theme)}
    </TitleBarDiv>
  );
}
