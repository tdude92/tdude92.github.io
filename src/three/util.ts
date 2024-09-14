import * as THREE from "three";

export function disposeMesh(mesh: THREE.Mesh) {
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
