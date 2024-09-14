import { Theme } from "@/util/Theme";
import TerminalData from "../";
import { EmphasizedText, Link, Text } from "@/styles/TerminalStyle";

const getCommand = (
  _: Theme // eslint-disable-line @typescript-eslint/no-unused-vars
) => (
  <>
    wget&nbsp;
    <Link
      href="https://devpost.com/software/garbage-wrangler"
      target="_blank"
      style={{ textDecoration: "underline" }}
    >
      https://devpost.com/software/garbage-wrangler
    </Link>
  </>
);

const getBody = (theme: Theme) => (
  <>
    <EmphasizedText $theme={theme} style={{ fontSize: "17pt" }}>
      Garbage Wrangler
    </EmphasizedText>
    <EmphasizedText $theme={theme}>---------------------</EmphasizedText>
    <EmphasizedText $theme={theme}>
      Hack the Earth 2021 Winner 🎉🎉🎉
    </EmphasizedText>
    <br />
    <Text $theme={theme}>
      Cooperated with small group of sofware developers to architect and build a
      minimally-playable Unity game.
    </Text>
    <br />
    <Text $theme={theme}>
      I implemented the{" "}
      <Link
        href="https://en.wikipedia.org/wiki/Boids"
        target="_blank"
        style={{ textDecoration: "underline" }}
      >
        boids algorithm
      </Link>{" "}
      for our fish, a smooth random walk for the floating garbage to simulate
      drifting in the water, and added randomly generated environmental features
      to the seafloor.
    </Text>
  </>
);

export default function GarbageWrangler(startX?: number, startY?: number) {
  return new TerminalData(
    "/GarbageWrangler.png",
    "~",
    "In-game screenshot of Garbage Wrangler",
    getCommand,
    getBody,
    startX,
    startY
  );
}
