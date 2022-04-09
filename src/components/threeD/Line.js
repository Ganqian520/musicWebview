import * as THREE from "three";
import { player } from "../../util/Player.js";
import {R,FFT_} from './const.js'
import { materialLine } from "./material.js";

export class Line {

  outLine; //外线模型
  inLine;
  midLines = []; //中间线模型集合
  points = []; //线需要的点集
  lineGroup = new THREE.Group()


  update() {
    let arrOut = [];
    let arrIn = [];
    for (let i = 0; i < player.fft.length; i++) {
      let angle = ((Math.PI * 2) / player.fft.length) * i;
      let x_ = Math.cos(angle) * player.fft[i] * (FFT_ / 256);
      let z_ = Math.sin(angle) * player.fft[i] * (FFT_ / 256);
      let arr_mid = [
        this.points[i * 3] - x_,
        0,
        this.points[i * 3 + 2] - z_,
        this.points[i * 3] + x_,
        0,
        this.points[i * 3 + 2] + z_,
      ];
      this.midLines[i].geometry.getAttribute("position").set(arr_mid, 0);
      this.midLines[i].geometry.getAttribute("position").needsUpdate = true;
      arrOut.push(this.points[i * 3] + x_);
      arrOut.push(0);
      arrOut.push(this.points[i * 3 + 2] + z_);
      arrIn.push(this.points[i * 3] - x_);
      arrIn.push(0);
      arrIn.push(this.points[i * 3 + 2] - z_);
    }
    this.outLine.geometry.getAttribute("position").set(arrOut, 0);
    this.inLine.geometry.getAttribute("position").set(arrIn, 0);
    this.outLine.geometry.getAttribute("position").needsUpdate = true;
    this.inLine.geometry.getAttribute("position").needsUpdate = true;
  }

  init() {
    player.fft.forEach((v, i) => {
      let angle = ((Math.PI * 2) / player.fft.length) * i;
      let x = Math.cos(angle) * R;
      let y = 0;
      let z = Math.sin(angle) * R;
      this.points.push(x, y, z);
      let geometry = new THREE.BufferGeometry();
      geometry.attributes.position = new THREE.BufferAttribute(
        new Float32Array([x, y, z, x, y, z]),
        3
      );
      let line = new THREE.Line(geometry, materialLine);
      this.midLines.push(line);
      this.lineGroup.add(line);
    });
    let geometryOut = new THREE.BufferGeometry();
    let geometryIn = new THREE.BufferGeometry();
    geometryOut.attributes.position = new THREE.BufferAttribute(
      new Float32Array(this.points),
      3
    );
    geometryIn.attributes.position = new THREE.BufferAttribute(
      new Float32Array(this.points),
      3
    );
    this.outLine = new THREE.LineLoop(geometryOut, materialLine);
    this.inLine = new THREE.LineLoop(geometryIn, materialLine);
    this.lineGroup.add(this.outLine, this.inLine);
  }

}
