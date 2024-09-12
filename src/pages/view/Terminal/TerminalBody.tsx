import { useContext } from "react";
import Image from "next/image";
import styled from "styled-components";
import style from "@/styles/Terminal.module.css";
import { ThemeContext } from "@/pages/ThemeProvider";
import { Theme } from "@/util/Theme";

const UsernameTextSpan = styled.span<{ $theme: Theme }>`
  color: ${(props) =>
    props.$theme.terminalTheme.bodyUsernameTextColor.getStyle()};
`;

const CWDTextSpan = styled.span<{ $theme: Theme }>`
  color: ${(props) => props.$theme.terminalTheme.bodyCWDTextColor.getStyle()};
`;

const Text = styled.p<{ $theme: Theme }>`
  color: ${(props) => props.$theme.terminalTheme.bodyTextColor.getStyle()};
  font-size: 13.5pt;
  line-height: 1.2;
`;

const EmphasizedText = styled.p<{ $theme: Theme }>`
  color: ${(props) =>
    props.$theme.terminalTheme.bodyEmphasizedTextColor.getStyle()};
  font-size: 13.5pt;
  line-height: 1.2;
`;

const EmphasizedTextSpan = styled.span<{ $theme: Theme }>`
  color: ${(props) =>
    props.$theme.terminalTheme.bodyEmphasizedTextColor.getStyle()};
`;

const Link = styled.a`
  &:hover {
    background-color: rgba(79, 75, 78, 0.75);
    text-decoration: underline;
  }
`;

const UWLink = styled(Link)`
  color: #c2a951;
`;

const ArupLink = styled(Link)`
  color: #e61e28;
`;

const DropbaseLink = styled(Link)`
  color: #729fcf;
`;

const SuperComLink = styled(Link)`
  color: #ff0099;
`;

export default function TerminalBody() {
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
        <CWDTextSpan $theme={theme}>~</CWDTextSpan>$ neofetch
      </Text>
      <br />
      <div className={style.neofetchOutput}>
        <Image
          src="/TVs_400x400.jpg"
          width={274}
          height={274}
          alt="Photograph of televisions"
        />
        <div style={{ marginTop: "-4px" }}>
          <EmphasizedText $theme={theme} style={{ fontSize: "17pt" }}>
            Trevor Du
          </EmphasizedText>
          <EmphasizedText $theme={theme}>------------</EmphasizedText>
          <Text $theme={theme}>
            <EmphasizedTextSpan $theme={theme}>
              Github:&nbsp;
            </EmphasizedTextSpan>
            <Link href="https://github.com/tdude92" target="_blank">
              tdude92
            </Link>
          </Text>
          <Text $theme={theme}>
            <EmphasizedTextSpan $theme={theme}>
              LinkedIn:&nbsp;
            </EmphasizedTextSpan>
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
            <EmphasizedTextSpan $theme={theme}>
              Résumé:&nbsp;
            </EmphasizedTextSpan>
            <Link href="/resume.pdf" target="_blank">
              tdude92.github.io/resume.pdf
            </Link>
          </Text>
          <br />
          <Text $theme={theme}>
            <EmphasizedTextSpan $theme={theme}>
              Education:&nbsp;
            </EmphasizedTextSpan>
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
            <EmphasizedTextSpan $theme={theme}>
              Experience:&nbsp;
            </EmphasizedTextSpan>
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
        </div>
      </div>
    </div>
  );
}
