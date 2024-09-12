import { useContext, useEffect } from "react";
import styled from "styled-components";
import { ThemeContext } from "@/pages/ThemeProvider";
import { Theme } from "@/util/Theme";

const TitleBarDiv = styled.div<{ $theme: Theme }>`
  background-color: ${(props) =>
    props.$theme.terminalTheme.titleBarBackgroundColor.getStyle()};
  width: 100%;
  height: 10%;
  border-radius: 12px 12px 0px 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
  gap: 10px;
`;

const Text = styled.p<{ $theme: Theme }>`
  color: ${(props) => props.$theme.terminalTheme.titleBarTextColor.getStyle()};
  font-size: 13.5pt;
  margin-left: 180px;
`;

const WindowButton = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 10px;
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

export default function TitleBar() {
  const theme = useContext(ThemeContext).theme;

  return (
    <TitleBarDiv $theme={theme}>
      <CloseButton $theme={theme} />
      <MinimizeButton $theme={theme} />
      <MaximizeButton $theme={theme} />
      <Text $theme={theme}>trevor@PersonalSite: ~</Text>
    </TitleBarDiv>
  );
}
