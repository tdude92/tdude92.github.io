import * as THREE from "three";
import { Wallpaper } from "./Wallpaper";

export { Wallpaper } from "./Wallpaper";

export function createScene() {
  return new THREE.Scene();
}

export function createCamera() {
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);
  camera.position.z = 5;
  return camera;
}

export function createRenderer(mount: HTMLDivElement) {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  mount.appendChild(renderer.domElement);
  return renderer;
}

export function createCube() {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  return new THREE.Mesh(geometry, material);
}

export function createWallpaper() {
  return new Wallpaper();
}

export function animate(
  renderer: THREE.Renderer,
  scene: THREE.Scene,
  camera: THREE.Camera
  //wallpaper: Wallpaper
) {
  function animation() {
    const frameId = requestAnimationFrame(animation);

    // Manipulate wallpaper here

    renderer.render(scene, camera);

    return frameId;
  }
  return animation();
}
