import { Theme } from "@/util/Theme";
import * as THREE from "three";

function disposeMesh(mesh: THREE.Mesh) {
  mesh.geometry.dispose();
  if (mesh.material instanceof Array) {
    mesh.material.forEach((m) => {
      m.dispose();
    });
  } else {
    mesh.material.dispose();
  }
  mesh.removeFromParent();
}

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

export const createScene = () => new THREE.Scene();

export const createCamera = () => {
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);
  camera.position.z = 5;
  return camera;
};

export const createRenderer = (mount: HTMLDivElement) => {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  mount.appendChild(renderer.domElement);
  return renderer;
};

export const createCube = () => {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  return new THREE.Mesh(geometry, material);
};

export const createWallpaper = () => {
  return new Wallpaper();
};

export const animate = (
  renderer: THREE.Renderer,
  scene: THREE.Scene,
  camera: THREE.Camera
  //wallpaper: Wallpaper
) => {
  function animation() {
    const frameId = requestAnimationFrame(animation);

    // Manipulate wallpaper here

    renderer.render(scene, camera);

    return frameId;
  }
  return animation();
};
