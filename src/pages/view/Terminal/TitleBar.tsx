import { useContext } from "react";
import { ThemeContext } from "@/pages/ThemeProvider";
import style from "@/styles/Terminal.module.css";

export default function TitleBar() {
  const theme = useContext(ThemeContext).theme.terminalTheme;

  return (
    <div className={style.titleBar}>
      <div
        className={style.titleBarButton}
        style={{
          backgroundColor: theme.titleBarButton1Color.getStyle(),
        }}
      ></div>
      <div
        className={style.titleBarButton}
        style={{
          backgroundColor: theme.titleBarButton2Color.getStyle(),
        }}
      ></div>
      <div
        className={style.titleBarButton}
        style={{
          backgroundColor: theme.titleBarButton3Color.getStyle(),
        }}
      ></div>
      <p>trevor@PersonalSite: ~</p>
    </div>
  );
}
