<template>
    <canvas ref="canvas_"></canvas>
</template>

<script setup>
import { ref, onMounted} from "vue";
import { player } from "@/util/Player.js";
let canvas, ctx;
const canvas_ = ref(null);
let w = 700;
let h = 700;
let r = 200
let r1 = 50 //最大弹起距离
let r2 = 20 //线点间隔距离
let scaleMin = 0.6 //缩放范围
let scaleMax = 1.2
let fft = new Uint8Array(64) //fft数据
let arr = [] //固定圆上点的坐标
onMounted(() => {
  canvas = canvas_.value;
  ctx = canvas.getContext("2d");
  canvas.width = w;
  canvas.height = h;
  initArr()
  draw()
});
function initArr(){
  for(let i=0;i<fft.length;i++){
    let angle = Math.PI*2/fft.length*i
    let x = Math.cos(angle)*r
    let y = Math.sin(angle)*r
    arr.push({x,y})
  }
}
function draw() {
  window.requestAnimationFrame(draw)
  player.analyser?.getByteFrequencyData(fft);
  ctx.clearRect(0, 0, w, h);
  canvas.width = w
  canvas.height = h
  ctx.lineWidth = 1
  ctx.translate(w/2,h/2)
  let averageFFT = fft.reduce((a,b)=>a+b)/fft.length
  let scale = scaleMin + (scaleMax-scaleMin)*(averageFFT/255)
  let color = 100 + averageFFT
  ctx.scale(scale,scale)
  // ctx.strokeStyle = `rgb(${color},${color},${color})`
  //外圈
  for(let i=0;i<fft.length;i++){
    let rate1 = r1*(fft[i]/255)/r
    if(i==0){
      ctx.moveTo(arr[i].x*(1+rate1),arr[i].y*(1+rate1))
    }else{
      ctx.lineTo(arr[i].x*(1+rate1),arr[i].y*(1+rate1))
    }
  } 
  ctx.closePath()
  ctx.stroke()
  //内圈
  for(let i=0;i<fft.length;i++){
    let rate1 = r1*(fft[i]/255)/r
    if(i==0){
      ctx.moveTo(arr[i].x*(1-rate1),arr[i].y*(1-rate1))
    }else{
      ctx.lineTo(arr[i].x*(1-rate1),arr[i].y*(1-rate1))
    }
  } 
  ctx.closePath()
  ctx.stroke()
  //中间线
  for(let i=0;i<fft.length;i++){
      let r2_ = r1*(fft[i]/255)-r2
      if(r2_<0) continue
      let rate2 = r2_/r
      ctx.moveTo(arr[i].x*(1+rate2),arr[i].y*(1+rate2))
      ctx.lineTo(arr[i].x*(1-rate2),arr[i].y*(1-rate2))
      ctx.stroke()
    }
}
</script>


<style scoped lang="less">

</style>