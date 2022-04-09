<template>
  <canvas class="canvas" ref="canvas"></canvas>
</template>

<script setup>
import { onMounted, ref } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// import { GUI } from "three/examples/jsm/libs/lil-gui.module.min";

// import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
// import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
// import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
// import Stats from "three/examples/jsm/libs/stats.module.js";

import { player } from "@/util/Player.js";
import {Line} from '@/components/threeD/Line.js'
import {Sphere} from '@/components/threeD/Sphere.js'
import { materialLine } from "@/components/threeD/material.js";
import { Triangles } from "@/components/threeD/Triangle.js";
import {R,N,A,AXES,FFT,COLOR,H} from '@/components/threeD/const.js'
import {state} from '@/util/state.js'

const canvas = ref(null);
let renderer, scene, camera,  composer;
let orbitControl 
let clock = new THREE.Clock();
// const stats = new Stats()
// document.body.appendChild(stats.domElement)
let gui = {
  //参数控制
  threshold: 0.2,
  strength: 1,
  radius: 0,
};

let all

let line
let sphere
let traingle 

onMounted(() => {
  init();
  animate();
});

//初始化
function init() {
  initThree();
  initControl();
  // initBloomPass();
  initLight();
  // initGui();
  addWindowListener();

  all = new THREE.Group()
  scene.add(all)
  line = new Line()
  line.init()
  sphere = new Sphere()
  sphere.init()
  traingle = new Triangles()
  scene.add(traingle.traingleGroup)
  traingle.init()
}
//递归
function animate() {
  requestAnimationFrame(animate);
  player.analyser?.getByteFrequencyData(player.fft);
  orbitControl.update()
  // stats.update()
  all.rotateY(0.003)
  if(!player.isPlay.value && all.children.length==2){
    all.children = []
  }else if(player.isPlay.value){
    if(all.children.length==0){
      all.add(sphere.sphereGroup)
      all.add(line.lineGroup)
    }
    sphere.update()
    line.update()
  }  
  traingle.update()
  // composer.render();
  renderer.render(scene,camera)
}

//控制器
function initControl() {
  orbitControl = new OrbitControls(camera, renderer.domElement);
  orbitControl.enablePan = false;
  orbitControl.enableDamping = true; //惯性
  orbitControl.enableZoom = true; //缩放
  orbitControl.minDistance = 0; //相机到原点最近距离
  orbitControl.maxDistance = 1000; //最远距离
}
//初始化gui
function initGui() {
  let datGui = new GUI();
  datGui.add(gui, "threshold", 0, 1).onChange(() => {
    bloomPass.threshold = gui.threshold;
  });
  datGui
    .add(gui, "strength", 0, 1)
    .onChange(() => (bloomPass.strength = gui.strength));
  datGui
    .add(gui, "radius", 0, 1)
    .onChange(() => (bloomPass.radius = gui.radius));
}

//窗口重置
function addWindowListener() {
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // composer.setSize(window.innerWidth, window.innerHeight);
  });
}

// 环境光和平行光
function initLight() {
  scene.add(new THREE.AmbientLight(0x00ffff));
  let light = new THREE.PointLight(0x00ffff);
  light.position.set(0, 100, 0);
  light.castShadow = true;
  // scene.add(light);
}
//辉光
let bloomPass;
function initBloomPass() {
  let renderScene = new RenderPass(scene, camera);
  bloomPass = new UnrealBloomPass();
  bloomPass.threshold = gui.threshold;
  bloomPass.strength = gui.strength;
  bloomPass.radius = gui.radius;
  composer = new EffectComposer(renderer);
  composer.addPass(renderScene);
  composer.addPass(bloomPass);
}
//初始化场景，相机等
function initThree() {
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas: canvas.value,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  scene = new THREE.Scene();
  scene.background = new THREE.CubeTextureLoader().load(getImg());
  camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 1, 10000);
  camera.position.set(-80, 20, -50);
  camera.lookAt(0, 0, 0);
  let axesHelper = new THREE.AxesHelper(AXES);
  // scene.add(axesHelper);
}
//获取天空盒
function getImg() {
  let arr = [
    "right.jpg",
    "left.jpg",
    "top.jpg",
    "bottom.jpg",
    "front.jpg",
    "back.jpg",
  ];
  return arr.map((v) => {
    return new URL(`../../assets/skybox/${v}`, import.meta.url).href;
  });
}

</script>

<style scoped >
</style>