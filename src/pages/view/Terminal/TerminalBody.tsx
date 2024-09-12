import style from "@/styles/Terminal.module.css";
import Image from "next/image";

export default function TerminalBody() {
  return (
    <div className={style.body}>
      <p>
        <span style={{ color: "#8AE234" }}>trevor@PersonalSite</span>:
        <span style={{ color: "#729FCF" }}>~</span>$ neofetch
      </p>
      <br />
      <div className={style.neofetchOutput}>
        <Image
          src="/TVs_400x400.jpg"
          width={274}
          height={274}
          alt="Photograph of televisions"
        />
        <div style={{ marginTop: "-4px" }}>
          <p style={{ fontSize: "17pt", color: "#E1BBC9" }}>Trevor Du</p>
          <p style={{ color: "#E1BBC9" }}>------------</p>
          <p>
            <span style={{ color: "#E1BBC9" }}>Github: </span>
            <a href="https://github.com/tdude92" target="_blank">
              tdude92
            </a>
          </p>
          <p>
            <span style={{ color: "#E1BBC9" }}>LinkedIn: </span>
            <a href="https://www.linkedin.com/in/trevor-du/" target="_blank">
              linkedin.com/in/trevor-du/
            </a>
          </p>
          <p>
            <span style={{ color: "#E1BBC9" }}>Email: </span>
            <a href="mailto: t34du@uwaterloo.ca" target="_blank">
              t34du@uwaterloo.ca
            </a>
          </p>
          <p>
            <span style={{ color: "#E1BBC9" }}>Resume: </span>
            <a href="/resume.pdf" target="_blank">
              tdude92.github.io/resume.pdf
            </a>
          </p>
          <br />
          <p>
            <span style={{ color: "#E1BBC9" }}>Education:</span> 3B software
            engineering student
          </p>
          <p>
            {"\u00A0".repeat(11)}
            at the{" "}
            <a
              href="https://uwaterloo.ca/"
              target="_blank"
              style={{ color: "#C2A951" }}
            >
              University of Waterloo
            </a>
            .
          </p>
          <br />
          <p>
            <span style={{ color: "#E1BBC9" }}>Experience:</span> Previously
            @&nbsp;
            <a
              href="https://www.arup.com/services/digital-solutions-and-tools/massmotion/"
              target="_blank"
              style={{ color: "#E61E28" }}
            >
              Arup
            </a>
            ,&nbsp;
            <a
              href="https://www.dropbase.io/"
              target="_blank"
              style={{ color: "#729FCF" }}
            >
              Dropbase
            </a>
            ,&nbsp;
            <a
              href="https://www.super.com/"
              target="_blank"
              style={{ color: "#FF0099" }}
            >
              Super.com
            </a>
          </p>
          <br />
          <p style={{ color: "#E1BBC9" }}>
            Seeking ☃️W2025 + 🏖️S2025 Internships
          </p>
        </div>
      </div>
    </div>
  );
}
