import Head from "next/head";
import { Ubuntu_Mono } from "next/font/google";

import style from "@/styles/Home.module.css";
import Terminal from "./view/Terminal";
import { ThemeProvider } from "./ThemeProvider";

const ubuntuMonoFont = Ubuntu_Mono({
  weight: "700",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Trevor Du</title>
        <meta name="description" content="Trevor Du's personal site" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider>
        <main className={`${style.main} ${ubuntuMonoFont.className}`}>
          <Terminal />
        </main>
      </ThemeProvider>
    </>
  );
}
