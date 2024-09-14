import { Theme } from "@/util/Theme";
import TerminalData from "../";
import { EmphasizedText, EmphasizedTextSpan, Link, Text } from "../../style";

const getCommand = (_: Theme) => (
  <>
    wget&nbsp;
    <Link
      href="https://devpost.com/software/acreagecontour"
      target="_blank"
      style={{ textDecoration: "underline" }}
    >
      https://devpost.com/software/acreagecontour
    </Link>
  </>
);

const getBody = (theme: Theme) => (
  <>
    <EmphasizedText $theme={theme} style={{ fontSize: "17pt" }}>
      Acreage Contour
    </EmphasizedText>
    <EmphasizedText $theme={theme}>-------------------</EmphasizedText>
    <Text $theme={theme}>
      I implemented a deep convolutional U-Net using Pytorch and a popular
      Kaggle dataset to segment satellite images into natural land and land
      dedicated to artificial structures.
    </Text>
    <br />
    <Text $theme={theme}>
      With all the AI fear going around, this project served to me as a reminder
      that deep neural networks can and are still being used for ethically
      unambiguous applications. For example, projects such as this can help
      ecologists monitor human encroachment on the habitats of endangered
      species.
    </Text>
  </>
);

export default function AcreageContour(startX?: number, startY?: number) {
  return new TerminalData(
    "/AcreageContour.jpg",
    "~",
    "Land use image segmentation output",
    getCommand,
    getBody,
    startX,
    startY
  );
}
