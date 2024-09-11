import style from "@/styles/Terminal.module.css";
import { Ubuntu_Mono } from "next/font/google";

const ubuntuMonoFont = Ubuntu_Mono({
  weight: "700",
  subsets: ["latin"],
});

export default function TitleBar() {
  return (
    <div className={`${style.titleBar} ${ubuntuMonoFont.className}`}>
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
