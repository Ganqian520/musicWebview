<template>
  <div class="piano">
    <div class="head">
      <span class="ins pointer" @click="openPop"> {{ insName }}</span>
      <div
        class="diao_"
        @mouseenter="() => (isOpenDiaos = true)"
        @mouseleave="isOpenDiaos = false"
      >
        <span class="diao">
          {{ diaos[diao] }}
        </span>
        <div class="pop_diao scroll pop" v-if="isOpenDiaos">
          <span
            class="diaos_item black_text hover"
            v-for="(v, index) in diaos"
            @click="diaoChange(index)"
            >{{ diaos[index] }}</span
          >
        </div>
      </div>
    </div>

    <div class="keyboard">
      <!-- 滚动限制容器 -->
      <div class="wb" ref="wb" @mouseup="wbAllUp">
        <!-- 白键 -->
        <div class="white">
          <div
            class="white_item"
            v-for="(v, index) in whites"
            :key="index"
            @mousedown="wbDown('white', index, $event)"
            @mouseenter="wbEnter('white', index)"
            @mouseleave="wbLeave('white', index)"
            @mouseup="wbUp('white', index, $event)"
            :style="{
              backgroundColor: v.isActive
                ? 'rgba(0,255,255,0.4)'
                : 'rgba(0,255,255,0.1)',
            }"
          >
            <div class="msg_white">
              <div class="dot_" style="transform: scaleY(-1)">
                <div class="dot" v-if="v.dot > 0">
                  <span
                    class="dot_span"
                    v-for="(dot, index) in Array(v.dot)"
                    :key="index"
                    >·</span
                  >
                </div>
              </div>
              <span class="number">{{ v.tip }}</span>
              <div class="dot_">
                <div class="dot" v-if="v.dot < 0">
                  <span
                    class="dot_span"
                    v-for="(dot, index) in Array(-v.dot)"
                    :key="index"
                    >·</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 黑键 -->
        <div class="black">
          <div
            class="black_item"
            v-for="(v, index) in blacks"
            :key="index"
            @mousedown="wbDown('black', index, $event)"
            @mouseenter="wbEnter('black', index)"
            @mouseleave="wbLeave('black', index)"
            @mouseup="wbUp('black', index, $event)"
            :style="{
              backgroundColor: v.isActive
                ? 'rgba(0,255,255,0.7)'
                : 'rgba(0,255,255,0.3)',
              left: calBlacLeft(index) + 'px',
            }"
          >
            <div class="msg_black">
              <div class="dot_" style="transform: scaleY(-1)">
                <div class="dot" v-if="v.dot > 0">
                  <span
                    class="dot_span"
                    v-for="(dot, index) in Array(v.dot)"
                    :key="index"
                    >·</span
                  >
                </div>
              </div>
              <span class="number">{{ v.tip }}</span>
              <div class="dot_">
                <div class="dot" v-if="v.dot < 0">
                  <span
                    class="dot_span"
                    v-for="(dot, index) in Array(-v.dot)"
                    :key="index"
                    >·</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="keyword">
        <span class="key" v-for="(item, index) in keys" :key="index">{{
          item
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, toRaw, onMounted, defineAsyncComponent, watchEffect } from "vue";
import { openPop } from "@/util/pop.js";
import { insIndex, getIns } from "./state.js";
import { instruments } from "@/lib/instruments.js";
import { WebAudioFontPlayer } from "@/lib/audiofont/player.js";
// import {player} from '@/util/Player.js'

const keys = ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter"];
const diaos = [
  "C大调",
  "#C大调",
  "D大调",
  "#D大调",
  "E大调",
  "F大调",
  "#F大调",
  "G大调",
  "#G大调",
  "A大调",
  "#A大调",
  "B大调",
  "c小调",
  "#c小调",
  "d小调",
  "e小调",
  "#e小调",
  "f小调",
  "#f小调",
  "g小调",
  "a小调",
  "#a小调",
  "b小调",
  "#b小调",
];
const diao = ref(0); //调号的序号
const isOpenDiaos = ref(false);
const insName = ref("加载中...");
const whites = ref([]); //白键
const blacks = ref([]);
const wb = ref(null); //滚动限制容器
let indexLeft = 26; //当前最左白键的序号
let isWbDown = false; //鼠标点击黑白键按下
let ctx = new AudioContext();
// let ctx = player.ctx
let preset  //乐器资源对象
const player_ = new WebAudioFontPlayer();

onMounted(() => {
  calKeyTip(diao.value);
  setTimeout(() => {
    wb.value.scrollTo({
      top: 0,
      left: indexLeft * 60,
    });
  }, 0);
});
watchEffect(() => {
  loadIns(insIndex.value)
});

window.addEventListener("keydown", (e) => {
  if (keys.indexOf(e.key) != -1) {
    let indexWhite = keys.indexOf(e.key) + indexLeft;
    if (!whites.value[indexWhite].gainNode) {
      play("white", indexWhite);
    }
  }
});
window.addEventListener("keyup", (e) => {
  if (keys.indexOf(e.key) != -1) {
    let indexWhite = keys.indexOf(e.key) + indexLeft;
    stop("white", indexWhite);
  }
});

//wb区域的鼠标事件
function wbDown(color, i, e) {
  if (e.button == 0) {
    isWbDown = true;
    play(color, i);
    document.body.onmouseup = () => {
      isWbDown = false;
      document.body.onmouseup = null;
    };
  }
}
function wbEnter(color, i) {
  if (isWbDown) {
    play(color, i);
  }
}
function wbLeave(color, i) {
  if (isWbDown) {
    stop(color, i);
  }
}
function wbUp(color, i, e) {
  if (isWbDown && e.button == 0) {
    stop(color, i);
  }
}

//播放
function play(color, index) {
  if (color == "white" && !whites.value[index].isActive) {
    whites.value[index].isActive = true;
    whites.value[index].gainNode = player_.queueWaveTable(
      ctx,
      ctx.destination,
      preset,
      0,
      whites.value[index].index + 21 - 12,
      999
    );
  } else if (color == "black" && !blacks.value[index].isActive) {
    blacks.value[index].isActive = true;
    blacks.value[index].gainNode = player_.queueWaveTable(
      ctx,
      ctx.destination,
      preset,
      0,
      blacks.value[index].index + 21 - 12,
      999
    );
  }
}

//暂停
function stop(color, index) {
  if (color == "white") {
    whites.value[index].isActive = false;
    whites.value[index].gainNode?.cancel();
    whites.value[index].gainNode = null;
  } else {
    blacks.value[index].isActive = false;
    blacks.value[index].gainNode?.cancel();
    blacks.value[index].gainNode = null;
  }
}

//加载乐器
function loadIns(id) {
  getIns(id).then((res) => {
    insName.value = instruments[id].cn;
    player_.adjustPreset(ctx, res);
    preset = res;
  });
}

//监听wb容器的鼠标抬起，动画对齐
function wbAllUp() {
  if (isWbDown) return;
  wb.value.scrollBy({
    top: 0,
    left: -wb.value.scrollLeft % 60,
    behavior: "smooth",
  });
  setTimeout(() => {
    indexLeft = wb.value.scrollLeft / 60;
  }, 300);
}

//计算黑白键上的标识
function calKeyTip(diao) {
  let arr = [
    "1",
    "#1",
    "2",
    "#2",
    "3",
    "4",
    "#4",
    "5",
    "#5",
    "6",
    "#6",
    "7",
    "1",
    "#1",
    "2",
    "3",
    "#3",
    "4",
    "#4",
    "5",
    "6",
    "#6",
    "7",
    "#7",
  ];
  for (let i = 0; i < 63; i++) {
    let quotient = Math.floor(i / 7);
    let remainder = i % 7;
    let arr1 = [0, 2, 4, 5, 7, 9, 11];
    let index = quotient * 12 + arr1[remainder] + diao;
    remainder = index % 12;
    quotient = Math.floor(index/12)
    if (diao > 11) remainder += 11;
    whites.value[i] = {
      index,
      dot: quotient - 4,
      tip: arr[remainder],
      isActive: ref(false),
    };
  }
  for (let i = 0; i < 45; i++) {
    let quotient = Math.floor(i / 5);
    let remainder = i % 5;
    let arr1 = [1, 3, 6, 8, 10];
    let index = quotient * 12 + arr1[remainder] + diao;
    remainder = index % 12;
    quotient = Math.floor(index/12)
    if (diao > 11) remainder += 11;
    blacks.value[i] = {
      index,
      dot: quotient - 4,
      tip: arr[remainder],
      isActive: ref(false),
    };
  }
}

//计算黑键在页面上的位置  白宽60，黑宽40
function calBlacLeft(index) {
  let group = Math.floor(index / 5);
  let remainder = index % 5;
  let arr = [40, 100, 220, 280, 340];
  return group * 60 * 7 + arr[remainder];
}

//调号变化
function diaoChange(index) {
  diao.value = index;
  isOpenDiaos.value = false;
  calKeyTip(index);
}
</script>

<style scoped lang="less">
.piano {
  width: 720px;
  height: 270px;
  .head {
    width: 100%;
    height: 50px;
    display: flex;
    .ins {
      width: 200px;
      height: 50px;
      line-height: 50px;
      text-align: center;
    }
    .diao_ {
      width: 200px;
      height: 50px;
      .diao {
        width: 200px;
        height: 50px;
        line-height: 50px;
        text-align: center;
      }
      .pop_diao {
        width: 100px;
        height: 300px;
        display: flex;
        flex-direction: column;
        .diaos_item {
          height: 40px;
          line-height: 40px;
          padding-left: 5px;
        }
      }
    }
  }
  .keyboard {
    width: 720px;
    height: 220px;
    position: relative;
    .wb {
      width: 720px;
      height: 220px;
      position: absolute;
      overflow: auto;
      transform: scaleY(-1);

      .white {
        display: flex;
        transform: scaleY(-1);
        .white_item {
          width: 60px;
          height: 200px;
          flex-shrink: 0;
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
          box-sizing: border-box;
          border: rgba(94, 161, 161, 0.5) 1px solid;
          position: relative;
          .msg_white {
            width: 60px;
            display: flex;
            flex-direction: column;
            position: absolute;
            bottom: 30px;
            .dot_ {
              height: 20px;
              .dot {
                display: flex;
                flex-direction: column;
                .dot_span {
                  width: 60px;
                  height: 5px;
                  line-height: 5px;
                  text-align: center;
                }
              }
            }
            .number {
              width: 60px;
              text-align: center;
            }
          }
        }
      }
      .black {
        display: flex;
        transform: scaleY(-1);
        position: absolute;
        bottom: 0px;
        .black_item {
          width: 40px;
          height: 100px;
          position: absolute;
          flex-shrink: 0;
          background-color: rgba(0, 255, 255, 0.3);
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
          box-sizing: border-box;
          .msg_black {
            width: 40px;
            display: flex;
            flex-direction: column;
            position: absolute;
            bottom: 30px;
            .dot_ {
              height: 20px;
              .dot {
                display: flex;
                flex-direction: column;
                .dot_span {
                  width: 40px;
                  height: 5px;
                  line-height: 5px;
                  text-align: center;
                }
              }
            }
            .number {
              width: 40px;
              text-align: center;
            }
          }
        }
      }
    }
    .wb::-webkit-scrollbar {
      width: 0px;
      height: 20px;
      background-color: rgba(0,255,255,0.2);
      border-bottom-right-radius: 10px;
      border-bottom-left-radius: 10px;
    }
    .wb::-webkit-scrollbar-thumb {
      background-color: rgba(0, 255, 255, 0.5);
      border-radius: 10px;
    }
    .keyword {
      display: flex;
      position: absolute;
      bottom: 10px;
      z-index: -1;
      .key {
        width: 60px;
        height: 20px;
        line-height: 20px;
        text-align: center;
      }
    }
  }
}
</style>