import { Theme } from "@/util/Theme";
import TerminalData from "..";
import { EmphasizedText, Link, Text } from "@/styles/TerminalStyle";

const getCommand = (
  _: Theme // eslint-disable-line @typescript-eslint/no-unused-vars
) => (
  <>
    git clone&nbsp;
    <Link
      href="https://github.com/tdude92/nbody-tool"
      target="_blank"
      style={{ textDecoration: "underline" }}
    >
      https://github.com/tdude92/nbody-tool.git
    </Link>
  </>
);

const getBody = (theme: Theme) => (
  <>
    <EmphasizedText $theme={theme} style={{ fontSize: "17pt" }}>
      N-Body Tool
    </EmphasizedText>
    <EmphasizedText $theme={theme}>--------------</EmphasizedText>
    <Text $theme={theme}>
      A modular and extensible C++ library for running gravitational particle
      simulations.
    </Text>
    <br />
    <Text $theme={theme}>
      In brute-force gravity sims, each particle must be compared with every
      other particles, which results in quadratic running time. I used the{" "}
      <Link
        href="https://en.wikipedia.org/wiki/Barnes%E2%80%93Hut_simulation"
        target="_blank"
        style={{ textDecoration: "underline" }}
      >
        Barnes-Hut approximation
      </Link>{" "}
      to reduce this to linearithmic time.
    </Text>
    <br />
    <Text $theme={theme}>
      On top of that, I implemented SIMD using the Eigen library and
      multithreading from scratch to enable simulations of more than 10 million
      particles on limited hardware.
    </Text>
  </>
);

export default function NBodyTool(startX?: number, startY?: number) {
  return new TerminalData(
    "/NBodyTool.gif",
    "Gravitational simualation of a rotating galaxy",
    getCommand,
    getBody,
    startX,
    startY
  );
}
