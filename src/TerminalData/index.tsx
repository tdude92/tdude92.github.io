import { Theme } from "@/util/Theme";

export default class TerminalData {
  constructor(
    imagePath: string = "",
    imageAltText: string = "",
    getCommand: (theme: Theme) => React.ReactNode = () => <></>,
    getBody: (theme: Theme) => React.ReactNode = () => <></>,
    startX?: number,
    startY?: number
  ) {
    this.imagePath = imagePath;
    this.imageAltText = imageAltText;
    this.getCommand = getCommand;
    this.getBody = getBody;
    this.startX = startX;
    this.startY = startY;
  }

  imagePath: string;
  imageAltText: string;
  getCommand: (theme: Theme) => React.ReactNode;
  getBody: (theme: Theme) => React.ReactNode;
  startX?: number;
  startY?: number;
}
