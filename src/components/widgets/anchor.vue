<template>
  <div class="anchor bg" v-if="state.isOpenAnchor.value" @mousedown="down">
  </div>
</template>

<script setup>
import { ref, toRaw } from "vue";
import { position ,state} from "@/util/state.js";
const props = defineProps({
  from: String,
});
let isDown = false;
function down() {
  isDown = true;
  document.body.onmousemove = (e) => move(e);
  document.body.onmouseup = up;
}
function move(e) {
  position.value[props.from].x += e.movementX;
  position.value[props.from].y += e.movementY;
}
function up() {
  isDown = false;
  document.body.onmousemove = null;
  document.body.onmouseup = null;
  localStorage.setItem("position", JSON.stringify(position.value));
}
</script>

<style scoped lang="less">
.anchor {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  z-index: 999;
}
</style>