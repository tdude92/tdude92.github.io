import { Theme } from "@/util/Theme";
import TerminalData from "../";
import { EmphasizedText, Link, Text } from "../@/styles/TerminalStyle";

const getCommand = (
  _: Theme // eslint-disable-line @typescript-eslint/no-unused-vars
) => (
  <>
    git clone&nbsp;
    <Link
      href="https://github.com/tdude92/NEAT_Cars"
      target="_blank"
      style={{ textDecoration: "underline" }}
    >
      https://github.com/tdude92/NEAT_Cars.git
    </Link>
  </>
);

const getBody = (theme: Theme) => (
  <>
    <EmphasizedText $theme={theme} style={{ fontSize: "17pt" }}>
      NEAT Cars
    </EmphasizedText>
    <EmphasizedText $theme={theme}>------------</EmphasizedText>
    <Text $theme={theme}>
      Implemented{" "}
      <Link
        href="https://nn.cs.utexas.edu/?stanley:ec02"
        target="_blank"
        style={{ textDecoration: "underline" }}
      >
        NeuroEvolution of Augmenting Topologies (Stanley and Miikkulainen 2002)
      </Link>
      , training 2D simulated cars to drive around a racetrack. EVerything
      implemented from scratch.
    </Text>
    <br />
    <Text $theme={theme}>
      I found this algorithm to be really cool because it involved the evolution
      of neural network topology on top of adjusting/mutating the weights.
    </Text>
  </>
);

export default function NEATCars(startX?: number, startY?: number) {
  return new TerminalData(
    "/NEATCars.gif",
    "~",
    "Car driving around racetrack",
    getCommand,
    getBody,
    startX,
    startY
  );
}
