import * as THREE from 'three'


class Triangle {
  speedT = range(0.1, 0.2) //移动速度
  distance = 0 //当前移动距离
  lifeDistance = 300 //消失时的距离
  loopLine = null //模型

  constructor() {
    const MAX = 1 //随机点距离最大值
    const R = 5 //圆环半径
    this.angle = Math.random() * Math.PI * 2  //角度
    this.x = Math.cos(this.angle) * R  //初始坐标
    this.y = 0
    this.z = Math.sin(this.angle) * R
    let points = []
    for (let i = 0; i < 3; i++) {
      points.push(range(-MAX, MAX))
      points.push(range(-MAX, MAX))
      points.push(range(-MAX, MAX))
    }
    this.geometry = new THREE.BufferGeometry();
    this.geometry.attributes.position = new THREE.BufferAttribute(
      new Float32Array(points),
      3
    );
    this.material = new THREE.LineBasicMaterial({
      color: 0x00ffff,
    });
    this.material.transparent = true
    this.loopLine = new THREE.LineLoop(this.geometry, this.material)
    this.loopLine.position.set(this.x, this.y, this.z)
  }
  update() {
    this.x += this.speedT * Math.cos(this.angle)
    this.z += this.speedT * Math.sin(this.angle)
    this.distance += this.speedT
    this.loopLine.position.set(this.x, this.y, this.z)
    // this.material.opcity = 1 - this.distance/this.lifeDistance
  }
}

export class Triangles {
  intervelCount = 0 //加到60说明过了一秒
  traingles = []; //三角形
  traingleGroup = new THREE.Group()
  init() {
    for (let i = 0; i < 10; i++) {
      let triangle = new Triangle();
      this.traingles.push(triangle);
      this.traingleGroup.add(triangle.loopLine);
    }
  }
  update() {
    this.intervelCount++
    if (this.intervelCount > 20) {
      for (let i = 0; i < 3; i++) {
        let triangle = new Triangle();
        this.traingles.push(triangle);
        this.traingleGroup.add(triangle.loopLine);
      }
      this.intervelCount = 0
    }
    for (let i = 0; i < this.traingles.length; i++) {
      let v = this.traingles[i];
      v.update();
      if (v.distance > v.lifeDistance) {
        this.traingleGroup.remove(v.loopLine);
        v.geometry.dispose();
        v.material.dispose()
        this.traingles.splice(i--, 1);
      }
    }
  }
}

function range(a, b) {
  return Math.random() * (b - a) + a
}