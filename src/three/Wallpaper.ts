import { Theme } from "@/util/Theme";
import * as THREE from "three";
import { disposeMesh } from "@/three/util";

class Wave {
  constructor(mesh: THREE.Mesh, period: number, x: number, xVelocity: number) {
    this.mesh = mesh;
    this.period = period;
    this.x = 0;
    this.phaseShift(x);
    this.xVelocity = xVelocity;
  }

  update() {
    this.phaseShift(this.xVelocity);
  }

  phaseShift(x: number) {
    this.x += x;

    // wrap wave around if mesh is too far right
    if (this.x > -1) {
      this.x -= this.period;
    }

    this.mesh.position.setX(this.x);
  }

  mesh: THREE.Mesh;
  period: number;
  x: number;
  xVelocity: number;
}

export class Wallpaper {
  constructor() {
    this.waves = [];
  }

  generate(scene: THREE.Scene, theme: Theme) {
    for (const wave of this.waves) {
      disposeMesh(wave.mesh);
    }
    this.waves = [];

    const nWaves = theme.wallpaperTheme.nWaves.getInteger();
    const gradientPalette =
      theme.wallpaperTheme.getResampledGradientPalette(nWaves);

    // waves
    for (let i = 0; i < nWaves; ++i) {
      const color = gradientPalette[i];
      const xVelocity = theme.wallpaperTheme.xVelocity.getFloat();
      const yPerturbation = theme.wallpaperTheme.yPerturbation.getFloat();
      const amplitude = theme.wallpaperTheme.waveAmplitude.getFloat();
      const frequency = theme.wallpaperTheme.waveFrequency.getFloat();
      const period = (2 * Math.PI) / frequency;

      const waveShape = new THREE.Shape();
      waveShape.moveTo(0, 0);

      const waveWidth = Math.ceil(2 / period) * 2;
      const nSamples = 200;
      for (let i = 0; i < nSamples; ++i) {
        // TODO scale number of samples based on frequency?
        const x = (waveWidth / (nSamples - 1)) * i;
        const y = amplitude * Math.sin(frequency * x);
        waveShape.lineTo(x, y);
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
      this.waves.push(
        new Wave(mesh, period, -1 + Math.random() * period, xVelocity)
      );
    }

    // background
    const bgGeometry = new THREE.PlaneGeometry(2, 2);
    const bgMaterial = new THREE.MeshBasicMaterial({
      color: gradientPalette.at(-1),
      side: THREE.DoubleSide,
    });
    this.background = new THREE.Mesh(bgGeometry, bgMaterial);
    this.background.position.set(0, 0, -100);

    for (const wave of this.waves) {
      scene.add(wave.mesh);
    }
    if (this.background) {
      scene.add(this.background);
    }
  }

  waves: Wave[];
  background?: THREE.Mesh;
}
