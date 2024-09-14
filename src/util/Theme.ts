import { Color } from "three";
import { NormalRandomVariable, UniformRandomVariable } from "./Random";

class TerminalTheme {
  constructor(options: {
    bodyBackgroundColor: Color;
    bodyTextColor: Color;
    bodyEmphasizedTextColor: Color;
    bodyUsernameTextColor: Color;
    bodyCWDTextColor: Color;
    bodyTextHighlightColor: Color;
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
    this.bodyTextHighlightColor = options.bodyTextHighlightColor;
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
  bodyTextHighlightColor: Color;
  titleBarBackgroundColor: Color;
  titleBarTextColor: Color;
  titleBarButton1Color: Color;
  titleBarButton2Color: Color;
  titleBarButton3Color: Color;
}

class WallpaperTheme {
  constructor(options: {
    nWaves: NormalRandomVariable;
    yPerturbation: UniformRandomVariable;
    waveAmplitude: NormalRandomVariable;
    waveFrequency: NormalRandomVariable;
    gradientPalette: Color[];
  }) {
    this.nWaves = options.nWaves;
    this.yPerturbation = options.yPerturbation;
    this.waveAmplitude = options.waveAmplitude;
    this.waveFrequency = options.waveFrequency;
    this.gradientPalette = options.gradientPalette;
  }

  getResampledGradientPalette(nColors: number): Color[] {
    const resampledGradientPalette = [];
    for (let i = 0; i < nColors; ++i) {
      const iResampled =
        (i / (nColors - 1)) * (this.gradientPalette.length - 1);
      const j = Math.floor(iResampled);
      const alpha = iResampled - j;
      if (j >= this.gradientPalette.length - 1) {
        resampledGradientPalette.push(this.gradientPalette.at(-1)!);
      } else {
        const sampledColor = new Color();
        sampledColor.lerpColors(
          this.gradientPalette[j],
          this.gradientPalette[j + 1],
          alpha
        );
        resampledGradientPalette.push(sampledColor);
      }
    }
    return resampledGradientPalette;
  }

  nWaves: NormalRandomVariable;
  yPerturbation: UniformRandomVariable;
  waveAmplitude: NormalRandomVariable;
  waveFrequency: NormalRandomVariable;
  gradientPalette: Color[];
}

export class Theme {
  constructor(terminalTheme: TerminalTheme, wallpaperTheme: WallpaperTheme) {
    this.terminalTheme = terminalTheme;
    this.wallpaperTheme = wallpaperTheme;
  }

  terminalTheme: TerminalTheme;
  wallpaperTheme: WallpaperTheme;
}

namespace TerminalTheme {
  export const LIGHT_MODE = new TerminalTheme({
    bodyBackgroundColor: new Color("#2c001e"),
    bodyTextColor: new Color("#c9c0c6"),
    bodyEmphasizedTextColor: new Color("#e1bbc9"),
    bodyUsernameTextColor: new Color("#8ae234"),
    bodyCWDTextColor: new Color("#729fcf"),
    bodyTextHighlightColor: new Color("rgba(79, 75, 78, 0.75)"),
    titleBarBackgroundColor: new Color("#c9c0c6"),
    titleBarTextColor: new Color("#605557"),
    titleBarButton1Color: new Color("#cc304e"),
    titleBarButton2Color: new Color("#ba7d00"),
    titleBarButton3Color: new Color("#4ea202"),
  });

  export const DARK_MODE = new TerminalTheme({
    bodyBackgroundColor: new Color("#1e1a1d"),
    bodyTextColor: new Color("#e3d8dd"),
    bodyEmphasizedTextColor: new Color("#d5b4c0"),
    bodyUsernameTextColor: new Color("#b6d094"),
    bodyCWDTextColor: new Color("#5e81ac"),
    bodyTextHighlightColor: new Color("#434c5e"),
    titleBarBackgroundColor: new Color("#e0d5dc"),
    titleBarTextColor: new Color("#484953"),
    titleBarButton1Color: new Color("#bc424e"),
    titleBarButton2Color: new Color("#e0aa3f"),
    titleBarButton3Color: new Color("#56a775"),
  });
}

namespace WallpaperTheme {
  export const LIGHT_MODE = new WallpaperTheme({
    nWaves: new NormalRandomVariable(12, 8),
    yPerturbation: new UniformRandomVariable(0, 0.1),
    waveAmplitude: new NormalRandomVariable(0.05, 0.1),
    waveFrequency: new NormalRandomVariable(5, 10),
    gradientPalette: [
      new Color("#ea6e56"),
      new Color("#c82662"),
      new Color("#78216f"),
    ],
  });

  export const DARK_MODE = new WallpaperTheme({
    nWaves: new NormalRandomVariable(6, 4),
    yPerturbation: new UniformRandomVariable(0.2, 0.3),
    waveAmplitude: new NormalRandomVariable(0.1, 0.1),
    waveFrequency: new NormalRandomVariable(3, 6),
    gradientPalette: [
      new Color("#683a68"),
      new Color("#412752"),
      new Color("#2d162c"),
    ],
  });
}

export const LIGHT_MODE = new Theme(
  TerminalTheme.LIGHT_MODE,
  WallpaperTheme.LIGHT_MODE
);

export const DARK_MODE = new Theme(
  TerminalTheme.DARK_MODE,
  WallpaperTheme.DARK_MODE
);
