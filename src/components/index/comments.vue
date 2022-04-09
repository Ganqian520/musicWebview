<template>
  <div class="comments scroll_no_bar">
    <span class="longstr" ref="span">{{ longstr }}</span>
  </div>
</template>

<script setup>
import { ref, watchEffect, nextTick } from "vue";
import { getComments } from "@/api/request.js";
import { player } from "@/util/Player.js";

const longstr = ref("");
const width = ref(0);
const span = ref(null);
const v = 150;

watchEffect(() => {
  //监听歌曲切换
  handleSongChange(player.music.value);
});

async function handleSongChange(music) {
  if(!player.ctx) return
  await nextTick();
  longstr.value = "";
  // span.value.style.animation = "none";
  await nextTick();
  if (music.name && music.platform == "net") {
    getComments(music.id).then(async (res) => {
      longstr.value = res;
      await nextTick();
      width.value = span.value.scrollWidth;
      // span.value.style.animation = `kf_loopcomments infinite linear ${
      //   width.value / v
      // }s`;
      // let cssRule = `@keyframes kf_loopcomments {0% {transform:translateX(500px);}100% {transform:translateX(${-width.value}px);}}`;
      // let sheet = document.styleSheets[0];
      // sheet.insertRule(cssRule, sheet.cssRules.length);
      span.value.animate([
        {transform:'translateX(600px)'},
        {transform:`translateX(${-width.value}px)`}
      ],{
        duration:width.value / v*1000,
        iterations: Infinity
      })
    });
  }
}
</script>

<style scoped lang="less">
.comments {
  width: 600px;
  height: 60px;
  display: flex;
  // position: relative;
  .longstr {
    height: 60px;
    line-height: 60px;
    white-space: nowrap;
    // position: absolute;
  }
}
</style>