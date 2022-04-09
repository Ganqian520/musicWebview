<template>
  <!-- 环绕，混响 -->
  <div class="effect">
    <div class="circle">
      <span
        class="listener iconfont icon-yinxiang"
        :style="{ left: x + 'px', top: y + 'px' }"
        >音</span
      >
      <div
        class="mask"
        @mousemove="mousemove"
        @mouseleave="()=>isUserMove=false"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref,onMounted,onBeforeUnmount} from "vue";
import { Round } from "@/util/effect.js";
import {player} from '@/util/Player.js'

let round;

const R = 100;
const x = ref(100);
const y = ref(100);
let angle = 0;
const isUserMove = ref(false);
let raf = null

onMounted(()=>{
  recursion()
})

onBeforeUnmount(()=>{
  round?.dispose()
  cancelAnimationFrame(raf)
})

function recursion() {
  raf = window.requestAnimationFrame(recursion);
  if(!player.ctx){
    return
  }else {
    if(!round){
      round=new Round()
      round.init()
    }
  }
  if (!isUserMove.value) {
    angle = angle + 0.05 > Math.PI * 2 ? 0 : angle + 0.05;
    x.value = Math.cos(angle) * R + R;
    y.value = Math.sin(angle) * R + R;
    round.move(x.value, y.value);
  }
}

function mousemove(e) {
  if(!round) return
  isUserMove.value = true;
  x.value = e.offsetX;
  y.value = e.offsetY;
  round.move(e.offsetX, e.offsetY);
}

</script>

<style scoped lang="less">
.effect {
  width: 200px;
  height: 200px;
  border: cyan solid 1px;
  border-radius: 50%;
  .circle {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    position: relative;
    display: flex;
    .listener {
      position: absolute;
      transform: translate(-50%, -50%);
    }
    .mask {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 1;
    }
  }
}
</style>