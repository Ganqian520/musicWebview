import * as THREE from "three";
import { player } from "../../util/Player.js";
import { R, N, A, AXES, FFT, COLOR, H } from './const.js'

export class Sphere {
  sphereGroup;

  init() {
    this.sphereGroup = new THREE.Group();
    for (let i = 0; i < N; i++) {
      let minGroup = new THREE.Group();
      let box = new THREE.SphereGeometry(A);
      let material = new THREE.MeshPhongMaterial({
        color: COLOR,
      }); // 材质对象
      let mesh = new THREE.Mesh(box, material);

      mesh.position.y = 0.5;
      minGroup.add(mesh);
      let angle = ((Math.PI * 2) / N) * i + Math.PI / 2;
      let x = Math.sin(angle) * R;
      let z = Math.cos(angle) * R;
      minGroup.position.set(x, H, z);
      this.sphereGroup.add(minGroup);
    }
  }

  update() {
    this.sphereGroup.children.forEach((v, i) => {
      v.position.y = H + player.fft[i] * (FFT / 256);
    });
  }
}