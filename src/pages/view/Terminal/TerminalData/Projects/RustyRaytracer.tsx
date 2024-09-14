import { Theme } from "@/util/Theme";
import TerminalData from "../";
import { EmphasizedText, Link, Text } from "../../style";

const getCommand = (
  _: Theme // eslint-disable-line @typescript-eslint/no-unused-vars
) => (
  <>
    git clone&nbsp;
    <Link
      href="https://github.com/tdude92/rusty-raytracer"
      target="_blank"
      style={{ textDecoration: "underline" }}
    >
      https://github.com/tdude92/rusty-raytracer.git
    </Link>
  </>
);

const getBody = (theme: Theme) => (
  <>
    <EmphasizedText $theme={theme} style={{ fontSize: "17pt" }}>
      Rusty Raytracer
    </EmphasizedText>
    <EmphasizedText $theme={theme}>-------------------</EmphasizedText>
    <Text $theme={theme}>
      A raytracer based on{" "}
      <Link
        href="https://raytracing.github.io/books/RayTracingInOneWeekend.html"
        target="_blank"
        style={{ textDecoration: "underline" }}
      >
        Ray Tracing in One Weekend
      </Link>
      . Translated from C++ into Rust and featuring intuitive scene, object, and
      material abstractions.
    </Text>
    <br />
    <Text $theme={theme}>
      My{" "}
      <Link
        href="https://github.com/tdude92/raytracer"
        target="_blank"
        style={{ textDecoration: "underline" }}
      >
        old raytracing project
      </Link>{" "}
      was pretty awful, so I decided to rebuild it, applying new software
      development experience.
    </Text>
    <br />
    <Text $theme={theme}>
      Give it a look! There are demo scenes that render pretty quickly given
      that it&#39;s a CPU software raytracer.
    </Text>
  </>
);

export default function RustyRaytracer(startX?: number, startY?: number) {
  return new TerminalData(
    "/RustyRaytracer.png",
    "~",
    "Raytraced spheres",
    getCommand,
    getBody,
    startX,
    startY
  );
}
