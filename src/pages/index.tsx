import Head from "next/head";
import { Ubuntu_Mono } from "next/font/google";

import style from "@/styles/Home.module.css";
import Scene from "@/components/Scene";
import ThemeProvider from "@/components/ThemeProvider";
import WindowProvider from "@/components/WindowManager";
import Windows from "@/components/Windows";
import Desktop from "@/components/Desktop";

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
        <WindowProvider>
          <main className={`${style.main} ${ubuntuMonoFont.className}`}>
            <Desktop />
            <Windows />
            <Scene />
          </main>
        </WindowProvider>
      </ThemeProvider>
    </>
  );
}
