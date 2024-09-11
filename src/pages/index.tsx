import Head from "next/head";

import Terminal from "./view/Terminal";

import styles from "@/styles/Home.module.css";

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
      <main className={styles.main}>
        <Terminal />
      </main>
    </>
  );
}
