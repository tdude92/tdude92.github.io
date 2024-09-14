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

    // waves
    for (let i = 0; i < nWaves; ++i) {
      const color = gradientPalette[i];
      const yPerturbation = theme.wallpaperTheme.yPerturbation.getFloat();
      const amplitude = theme.wallpaperTheme.waveAmplitude.getFloat();
      const frequency = theme.wallpaperTheme.waveFrequency.getFloat();
      const period = (2 * Math.PI) / frequency;

      const waveShape = new THREE.Shape();
      waveShape.moveTo(0, 0);

      const waveWidth = Math.ceil(2 / period);
      const nSamples = 100;
      for (let i = 0; i < nSamples; ++i) {
        // TODO scale number of samples based on frequency?
        const x = (waveWidth / (nSamples - 1)) * i;
        const y = amplitude * Math.sin(frequency * x);
        waveShape.lineTo(x, y);
        console.log(x, y);
      }

      waveShape.lineTo(waveWidth, -1);
      waveShape.lineTo(0, -1);

      const geometry = new THREE.ShapeGeometry(waveShape);
      const material = new THREE.MeshBasicMaterial({
        color: color.getHex(),
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(-1, (2 / nWaves) * (i + 0.5) - 1 + yPerturbation, -i);
      this.shapes.push(mesh);
    }

    // background
    const bgGeometry = new THREE.PlaneGeometry(2, 2);
    const bgMaterial = new THREE.MeshBasicMaterial({
      color: gradientPalette.at(-1),
      side: THREE.DoubleSide,
    });
    this.background = new THREE.Mesh(bgGeometry, bgMaterial);
    this.background.position.set(0, 0, -100);

    for (const shape of this.shapes) {
      scene.add(shape);
    }
    if (this.background) {
      scene.add(this.background);
    }
  }

  shapes: THREE.Mesh[];
  background?: THREE.Mesh;
}
