import { useContext } from "react";
import { ThemeContext } from "@/pages/ThemeProvider";
import styled from "styled-components";

export default function TitleBar() {
  const theme = useContext(ThemeContext).theme.terminalTheme;

  const TitleBarDiv = styled.div`
    background-color: ${theme.titleBarBackgroundColor.getStyle()};

    width: 100%;
    height: 10%;
    border-radius: 12px 12px 0px 0px;

    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 20px;
    gap: 10px;
  `;

  const Text = styled.p`
    color: ${theme.titleBarTextColor.getStyle()};
    font-size: 13.5pt;
    margin-left: 180px;
  `;

  const WindowButton = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 10px;
  `;

  const CloseButton = styled(WindowButton)`
    background-color: ${theme.titleBarButton1Color.getStyle()};
  `;

  const MinimizeButton = styled(WindowButton)`
    background-color: ${theme.titleBarButton2Color.getStyle()};
  `;

  const MaximizeButton = styled(WindowButton)`
    background-color: ${theme.titleBarButton3Color.getStyle()};
  `;

  return (
    <TitleBarDiv>
      <CloseButton />
      <MinimizeButton />
      <MaximizeButton />
      <Text>trevor@PersonalSite: ~</Text>
    </TitleBarDiv>
  );
}
