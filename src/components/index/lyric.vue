<template>
  <div class="lyric">
    <canvas ref="canvas_" id="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";
import { player } from "@/util/Player.js";
import { getLyric } from "@/api/request.js";
import { Animator } from "@/util/Animator.js";

const canvas_ = ref(null);
const w = 400;
const h = 200;

const initY = h / 2; //初始的y坐标
let y = h / 2; //实时的y坐标
let interval = h / 6;
let canvas, ctx, gradient;
let list = []; //歌词数据

let index = 0; //当前中间项序号
let indexShould = 0; //应该的序号

onMounted(() => {
  initCtx();
});

watchEffect(() => {
  //监听歌曲切换
  handleSongChange(player.music.value);
});

function handleSongChange(music) {
  if (music.name) {
    //说明不是第一次的自动触发
    index = 0;
    indexShould = 0;
    y = initY;
    list = [];
    draw();
    if (music.platform == "net") {
      getLyric(music.id).then((res) => {
        list = res;
        draw();
        player.updateNetCb = cb;
      });
    }
  }
}

function cb() {
  //进度更新回调回调
  let current = player.audio.currentTime;
  for (let i in list) {
    //每次循环找出应该处于的位置
    if (current < list[i].second) {
      indexShould = i - 1 < 0 ? 0 : i - 1;
      if (indexShould != index) {
        let addY = (index - indexShould) * interval;
        let lastY = initY - index * interval;
        index = indexShould;
        let animator = new Animator(300);
        animator.updateCb = (current) => {
          y = lastY + addY * (current / 300);
          draw();
        };
        animator.endedCb = () => {};
        animator.start();
      }
      break;
    }
  }
}

function initCtx() {
  canvas = canvas_.value;
  ctx = canvas.getContext("2d");
  gradient = ctx.createLinearGradient(0, 0, 0, h);
  gradient.addColorStop("0", "rgba(0,255,255,0)");
  gradient.addColorStop("0.5", "rgba(0,255,255,1)");
  gradient.addColorStop("1.0", "rgba(0,255,255,0)");
}

function draw() {
  canvas.width = w;
  canvas.height = h;
  ctx.fillStyle = gradient;
  ctx.font = "17px ''";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  // ctx.shadowColor = "rgba(0,255,255,1)";
  // ctx.shadowBlur = 40;
  for (let i = 0; i < list.length; i++) {
    ctx.fillText(list[i].content, w / 2, interval * i + y);
  }
}
</script>

<style scoped lang="less">
.lyric {
  width: 400px;
  height: 200px;
}
</style>