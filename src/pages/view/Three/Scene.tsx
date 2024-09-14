import { useContext, useEffect, useRef } from "react";
import * as THREE from "three";
import {
  animate,
  createCamera,
  createRenderer,
  createScene,
  createWallpaper,
  onWindowResize,
  Wallpaper,
} from "@/three";
import { ThemeContext } from "@/pages/ThemeProvider";

export default function Scene() {
  const mountRef = useRef<HTMLDivElement>(null!);
  const sceneRef = useRef<THREE.Scene>(null!);
  const wallpaperRef = useRef<Wallpaper>(null!);

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const scene = createScene();
    const camera = createCamera();
    const renderer = createRenderer(mountRef.current);
    const wallpaper = createWallpaper();

    sceneRef.current = scene;
    wallpaperRef.current = wallpaper;

    wallpaperRef.current.generate(scene, theme);
    const frameId = animate(renderer, scene, camera, wallpaper);

    window.addEventListener("resize", () => {
      onWindowResize(renderer);
    });

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    if (sceneRef.current && wallpaperRef.current) {
      wallpaperRef.current.generate(sceneRef.current, theme);
    }
  }, [theme]);

  return <div ref={mountRef} />;
}
