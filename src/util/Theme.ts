import { Color } from "three";

class TerminalTheme {
  constructor(options: {
    bodyBackgroundColor: Color;
    bodyTextColor: Color;
    bodyEmphasizedTextColor: Color;
    bodyUsernameTextColor: Color;
    bodyCWDTextColor: Color;
    bodyLinkHoverHighlightColor: Color;
    titleBarBackgroundColor: Color;
    titleBarTextColor: Color;
    titleBarButton1Color: Color;
    titleBarButton2Color: Color;
    titleBarButton3Color: Color;
  }) {
    this.bodyBackgroundColor = options.bodyBackgroundColor;
    this.bodyTextColor = options.bodyTextColor;
    this.bodyEmphasizedTextColor = options.bodyEmphasizedTextColor;
    this.bodyUsernameTextColor = options.bodyUsernameTextColor;
    this.bodyCWDTextColor = options.bodyCWDTextColor;
    this.bodyLinkHoverHighlightColor = options.bodyLinkHoverHighlightColor;
    this.titleBarBackgroundColor = options.titleBarBackgroundColor;
    this.titleBarTextColor = options.titleBarTextColor;
    this.titleBarButton1Color = options.titleBarButton1Color;
    this.titleBarButton2Color = options.titleBarButton2Color;
    this.titleBarButton3Color = options.titleBarButton3Color;
  }

  bodyBackgroundColor: Color;
  bodyTextColor: Color;
  bodyEmphasizedTextColor: Color;
  bodyUsernameTextColor: Color;
  bodyCWDTextColor: Color;
  bodyLinkHoverHighlightColor: Color;
  titleBarBackgroundColor: Color;
  titleBarTextColor: Color;
  titleBarButton1Color: Color;
  titleBarButton2Color: Color;
  titleBarButton3Color: Color;
}

export class Theme {
  constructor(terminalTheme: TerminalTheme) {
    this.terminalTheme = terminalTheme;
  }

  terminalTheme: TerminalTheme;
}

namespace TerminalTheme {
  export const LIGHT_MODE = new TerminalTheme({
    bodyBackgroundColor: new Color("#2c001e"),
    bodyTextColor: new Color("#c9c0c6"),
    bodyEmphasizedTextColor: new Color("#e1bbc9"),
    bodyUsernameTextColor: new Color("#8ae234"),
    bodyCWDTextColor: new Color("#729fcf"),
    bodyLinkHoverHighlightColor: new Color("rgba(79, 75, 78, 0.75)"),
    titleBarBackgroundColor: new Color("#c9c0c6"),
    titleBarTextColor: new Color("#605557"),
    titleBarButton1Color: new Color("#cc304e"),
    titleBarButton2Color: new Color("#ba7d00"),
    titleBarButton3Color: new Color("#4ea202"),
  });

  export const DARK_MODE = new TerminalTheme({
    bodyBackgroundColor: new Color("#2e3440"),
    bodyTextColor: new Color("#d8dee9"),
    bodyEmphasizedTextColor: new Color("#88c0d0"),
    bodyUsernameTextColor: new Color("#a3be8c"),
    bodyCWDTextColor: new Color("#5e81ac"),
    bodyLinkHoverHighlightColor: new Color("#434c5e"),
    titleBarBackgroundColor: new Color("#d8dee9"),
    titleBarTextColor: new Color("#4c566a"),
    titleBarButton1Color: new Color("#bf616a"),
    titleBarButton2Color: new Color("#d7b470"),
    titleBarButton3Color: new Color("#a3be8c"),
  });
}

export const LIGHT_MODE = new Theme(TerminalTheme.LIGHT_MODE);
export const DARK_MODE = new Theme(TerminalTheme.DARK_MODE);
