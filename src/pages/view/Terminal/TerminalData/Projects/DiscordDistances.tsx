import { Theme } from "@/util/Theme";
import TerminalData from "../";
import { EmphasizedText, Link, Text } from "../@/styles/TerminalStyle";

const getCommand = (
  _: Theme // eslint-disable-line @typescript-eslint/no-unused-vars
) => (
  <>
    git clone&nbsp;
    <Link
      href="https://github.com/tdude92/discord-distances"
      target="_blank"
      style={{ textDecoration: "underline" }}
    >
      https://github.com/tdude92/discord-distances.git
    </Link>
  </>
);

const getBody = (theme: Theme) => (
  <>
    <EmphasizedText $theme={theme} style={{ fontSize: "17pt" }}>
      Discord Distances
    </EmphasizedText>
    <EmphasizedText $theme={theme}>----------------------</EmphasizedText>
    <Text $theme={theme}>
      The motivation behind this project is based on how{" "}
      <Link
        href="https://en.wikipedia.org/wiki/Word2vec"
        target="_blank"
        style={{ textDecoration: "underline" }}
      >
        word2vec
      </Link>{" "}
      finetuning takes unlabelled corpora of text and uses them to
      &#34;learn&#34; the embeddings for words contained within the texts.
    </Text>
    <br />
    <Text $theme={theme}>
      By taking datasets of the text messages sent by an individual, a word2vec
      model can learn the meanings that a specific individual assigns to each
      English word. And from there, we can create fun charts displaying how
      close or how far any two people are in terms of language use and texting
      style.
    </Text>
  </>
);

export default function DiscordDistances(startX?: number, startY?: number) {
  return new TerminalData(
    "/DiscordDistances.png",
    "~",
    "Graph of Discord user texting style distances",
    getCommand,
    getBody,
    startX,
    startY
  );
}
