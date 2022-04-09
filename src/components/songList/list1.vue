<template>
  <div class="list scroll" ref="list_">
    <div
      class="item hover"
      v-for="(item, index) in list.value"
      key="index"
      @click="play(index)"
      :style="{ fontWeight: index_.value == index ? '900' : '400' }"
    >
      <div class="item_index">
        <span class="mid">{{ list.value.length - index }}</span>
      </div>
      <div class="item_name">
        <div class="name_">
          <span class="name">{{ item.name }}</span>
        </div>
        <div class="author_">
          <span class="author">{{ item.author }}</span>
        </div>
      </div>
      <div class="item_index">
        <span class="mid">{{ timeTo(item.time) }}</span>
      </div>
      <div class="item_index" @click.stop="add($event, item)">
        <span class="mid add">+</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, toRaw } from "vue";
import { timeTo } from "@/util/index.js";
import { player } from "@/util/Player.js";
import { Animator } from "@/util/Animator.js";

const props = defineProps({
  list: Object,
  index_: Object,
});
const list_ = ref(null);

function add(e, item) {
  player.listWant.push(toRaw(item));
  let list = list_.value;
  let top = e.srcElement.offsetTop;
  let left = e.srcElement.offsetLeft;
  let tempDom = document.createElement("div");
  tempDom.style.left = `${left}px`;
  tempDom.style.top = top + "px";
  tempDom.style.position = "absolute";
  tempDom.style.pointerEvents = "none";
  tempDom.style.fontSize = "25px";
  tempDom.innerHTML = "+";
  let animator = new Animator(1000); //传入动画时长1s
  animator.updateCb = (t) => {
    t = t / 1000;
    let vx = -100;
    let vy = -300;
    let a = 1500;
    let leftNew = left + vx * t;
    let topNew = top + vy * t + 0.5 * a * t ** 2;
    tempDom.style.left = leftNew + "px";
    tempDom.style.top = topNew + "px";
  };
  animator.endedCb = () => {
    list.removeChild(tempDom);
  };
  animator.start();
  list.appendChild(tempDom);
}

function play(index) {
  props.index_.value = index;
  player.start(props.list.value[index], index);
}
</script>

<style scoped lang="less">
.list {
  width: 100%;
  flex: 1;
  overflow: auto;
  overflow-x: hidden;
  font-size: 0.9rem;
  position: relative;
  .item {
    width: 100%;
    height: 50px;
    display: flex;
    padding-top: 5px;
    padding-bottom: 5px;
    box-sizing: border-box;
    .item_index {
      display: flex;
      height: 100%;
      flex: 1;
      .mid {
        margin: auto;
      }
      .add {
        font-size: 25px;
      }
    }
    .item_name {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 60%;
      .name_ {
        flex: 3;
        font-size: 0.9rem;
        position: relative;
        .name {
          position: absolute;
          transform: translateY(-50%);
          top: 50%;
          font-size: 0.9rem;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .author_ {
        flex: 2;
        position: relative;
        .author {
          position: absolute;
          transform: translateY(-50%);
          top: 50%;
          font-size: 0.6rem;
          color: rgba(0, 255, 255, 0.5);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>