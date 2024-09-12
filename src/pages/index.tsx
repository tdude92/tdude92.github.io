import Head from "next/head";
import { Ubuntu_Mono } from "next/font/google";
import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

import style from "@/styles/Home.module.css";
import Terminal from "./view/Terminal";
import { ThemeProvider } from "./ThemeProvider";

const ubuntuMonoFont = Ubuntu_Mono({
  weight: "700",
  subsets: ["latin"],
});

function Background(properties: any) {
  const mesh = useRef<THREE.Mesh>(null!);

  return (
    <mesh {...properties} ref={mesh}>
      <planeGeometry args={[1920, 1080]} />
      <meshStandardMaterial color={"#333333"} />
    </mesh>
  );
}

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
          <Canvas orthographic={true} resize={{ scroll: false }}>
            <ambientLight intensity={Math.PI / 2} />
            <Html position={[-400, 225, 0]}>
              <Terminal />
            </Html>
            <Background />
          </Canvas>
        </main>
      </ThemeProvider>
    </>
  );
}
