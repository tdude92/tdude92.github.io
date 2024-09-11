import style from "@/styles/TerminalWindow.module.css";

export function TitleBar() {
  return (
    <div className={style.titleBar}>
      <div
        className={style.titleBarButton}
        id={style.titleBarCloseButton}
      ></div>
      <div
        className={style.titleBarButton}
        id={style.titleBarMinimizeButton}
      ></div>
      <div
        className={style.titleBarButton}
        id={style.titleBarExpandButton}
      ></div>
    </div>
  );
}
