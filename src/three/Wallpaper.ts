import { Theme } from "@/util/Theme";
import * as THREE from "three";
import { disposeMesh } from "@/three/util";

export class Wallpaper {
  constructor() {
    this.shapes = [];
  }

  generate(scene: THREE.Scene, theme: Theme) {
    for (const shape of this.shapes) {
      disposeMesh(shape);
    }
    this.shapes = [];

    const nWaves = theme.wallpaperTheme.nWaves.getInteger();
    const gradientPalette =
      theme.wallpaperTheme.getResampledGradientPalette(nWaves);
    for (let i = 0; i < nWaves; ++i) {
      const color = gradientPalette[i];
      //const amplitude = theme.wallpaperTheme.waveAmplitude.getFloat();
      //const frequency = theme.wallpaperTheme.waveFrequency.getFloat();

      const geometry = new THREE.PlaneGeometry(2, 2 / nWaves);
      const material = new THREE.MeshBasicMaterial({
        color: color.getHex(),
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(0, (2 / nWaves) * (i + 0.5) - 1, 0);
      this.shapes.push(mesh);
    }

    for (const shape of this.shapes) {
      scene.add(shape);
    }
  }

  shapes: THREE.Mesh[];
}
