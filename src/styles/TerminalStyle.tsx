import styled from "styled-components";
import { Theme } from "@/util/Theme";

export const UsernameTextSpan = styled.span<{ $theme: Theme }>`
  color: ${(props) =>
    props.$theme.terminalTheme.bodyUsernameTextColor.getStyle()};
`;

export const CWDTextSpan = styled.span<{ $theme: Theme }>`
  color: ${(props) => props.$theme.terminalTheme.bodyCWDTextColor.getStyle()};
`;

export const Text = styled.p<{ $theme: Theme }>`
  color: ${(props) => props.$theme.terminalTheme.bodyTextColor.getStyle()};
  font-size: 13.5pt;
  line-height: 1.2;
`;

export const EmphasizedText = styled.p<{ $theme: Theme }>`
  color: ${(props) =>
    props.$theme.terminalTheme.bodyEmphasizedTextColor.getStyle()};
  font-size: 13.5pt;
  line-height: 1.2;
`;

export const EmphasizedTextSpan = styled.span<{ $theme: Theme }>`
  color: ${(props) =>
    props.$theme.terminalTheme.bodyEmphasizedTextColor.getStyle()};
`;

export const Link = styled.a`
  &:hover {
    background-color: rgba(79, 75, 78, 0.75);
    text-decoration: underline;
  }
`;

export const UWLink = styled(Link)`
  color: #c2a951;
`;

export const ArupLink = styled(Link)`
  color: #e61e28;
`;

export const DropbaseLink = styled(Link)`
  color: #729fcf;
`;

export const SuperComLink = styled(Link)`
  color: #ff0099;
`;
