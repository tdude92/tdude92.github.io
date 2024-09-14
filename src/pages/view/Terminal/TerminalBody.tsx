import React, { useContext } from "react";
import Image from "next/image";
import style from "@/styles/Terminal.module.css";
import { ThemeContext } from "@/pages/ThemeProvider";
import TerminalData from "./TerminalData";
import { CWDTextSpan, Text, UsernameTextSpan } from "@/styles/TerminalStyle";

interface TerminalBodyProps {
  data: TerminalData;
}

export default function TerminalBody(props: TerminalBodyProps) {
  const theme = useContext(ThemeContext).theme;

  return (
    <div
      className={style.body}
      style={{
        backgroundColor: theme.terminalTheme.bodyBackgroundColor.getStyle(),
      }}
    >
      <Text $theme={theme}>
        <UsernameTextSpan $theme={theme}>trevor@PersonalSite</UsernameTextSpan>:
        <CWDTextSpan $theme={theme}>{props.data.terminalPath}</CWDTextSpan>${" "}
        {props.data.getCommand(theme)}
      </Text>
      <br />
      <div className={style.neofetchOutput}>
        <Image
          src={props.data.imagePath}
          width={274}
          height={274}
          alt={props.data.imageAltText}
          priority
        />
        <div style={{ marginTop: "-4px" }}>{props.data.getBody(theme)}</div>
      </div>
    </div>
  );
}
