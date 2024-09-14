import { Theme } from "@/util/Theme";
import TerminalData from ".";
import {
  ArupLink,
  DropbaseLink,
  EmphasizedText,
  EmphasizedTextSpan,
  Link,
  SuperComLink,
  Text,
  UWLink,
} from "@/styles/TerminalStyle";

const getCommand = (_: Theme) => <>neofetch</>; // eslint-disable-line @typescript-eslint/no-unused-vars

const getBody = (theme: Theme) => (
  <>
    <EmphasizedText $theme={theme} style={{ fontSize: "17pt" }}>
      Trevor Du
    </EmphasizedText>
    <EmphasizedText $theme={theme}>------------</EmphasizedText>
    <Text $theme={theme}>
      <EmphasizedTextSpan $theme={theme}>Github:&nbsp;</EmphasizedTextSpan>
      <Link href="https://github.com/tdude92" target="_blank">
        tdude92
      </Link>
    </Text>
    <Text $theme={theme}>
      <EmphasizedTextSpan $theme={theme}>LinkedIn:&nbsp;</EmphasizedTextSpan>
      <Link href="https://www.linkedin.com/in/trevor-du/" target="_blank">
        linkedin.com/in/trevor-du/
      </Link>
    </Text>
    <Text $theme={theme}>
      <EmphasizedTextSpan $theme={theme}>Email:&nbsp;</EmphasizedTextSpan>
      <Link href="mailto: t34du@uwaterloo.ca" target="_blank">
        t34du@uwaterloo.ca
      </Link>
    </Text>
    <Text $theme={theme}>
      <EmphasizedTextSpan $theme={theme}>Résumé:&nbsp;</EmphasizedTextSpan>
      <Link href="/resume.pdf" target="_blank">
        tdude92.github.io/resume.pdf
      </Link>
    </Text>
    <br />
    <Text $theme={theme}>
      <EmphasizedTextSpan $theme={theme}>Education:&nbsp;</EmphasizedTextSpan>
      3B software engineering student
    </Text>
    <Text $theme={theme}>
      {"\u00A0".repeat(11)}
      at the&nbsp;
      <UWLink href="https://uwaterloo.ca/" target="_blank">
        University of Waterloo
      </UWLink>
      .
    </Text>
    <br />
    <Text $theme={theme}>
      <EmphasizedTextSpan $theme={theme}>Experience:&nbsp;</EmphasizedTextSpan>
      Previously @&nbsp;
      <ArupLink
        href="https://www.arup.com/services/digital-solutions-and-tools/massmotion/"
        target="_blank"
      >
        Arup
      </ArupLink>
      ,&nbsp;
      <DropbaseLink href="https://www.dropbase.io/" target="_blank">
        Dropbase
      </DropbaseLink>
      ,&nbsp;
      <SuperComLink href="https://www.super.com/" target="_blank">
        Super.com
      </SuperComLink>
    </Text>
    <br />
    <EmphasizedText $theme={theme}>
      Seeking ☃️W2025 + 🏖️S2025 Internships
    </EmphasizedText>
  </>
);

export default function AboutMe() {
  return new TerminalData(
    "/TVs_400x400.jpg",
    "Photograph of television artwork",
    getCommand,
    getBody
  );
}
