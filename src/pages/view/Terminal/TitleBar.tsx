import style from "@/styles/Terminal.module.css";

export default function TitleBar() {
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
      <p>trevor@PersonalSite: ~</p>
    </div>
  );
}
