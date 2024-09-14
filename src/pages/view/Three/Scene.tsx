import { useContext, useEffect, useRef } from "react";
import * as THREE from "three";
import {
  animate,
  createCamera,
  createCube,
  createRenderer,
  createScene,
} from "./ThreeSetup";
import { ThemeContext } from "@/pages/ThemeProvider";

export default function Scene() {
  const mountRef = useRef<HTMLDivElement>(null!);
  const cubeRef = useRef<THREE.Mesh>(null!);

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const scene = createScene();
    const camera = createCamera();
    const renderer = createRenderer(mountRef.current);
    const cube = createCube();

    cubeRef.current = cube;
    scene.add(cube);
    const frameId = animate(renderer, scene, camera, cube);

    return () => {
      mountRef.current.removeChild(renderer.domElement);
      cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    if (cubeRef.current) {
      (cubeRef.current.material as THREE.MeshBasicMaterial).color.set(
        theme.terminalTheme.bodyBackgroundColor
      );
    }
  }, [theme]);

  return <div ref={mountRef} />;
}
