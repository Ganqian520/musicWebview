<template>
  <div class="dou">
    <div class="head">
      <div
        class="list_name"
        @mouseenter="() => (isOpenSongs = true)"
        @mouseleave="() => (isOpenSongs = false)"
        @dblclick="refresh"
      >
        <span class="span">{{ listName }}</span>
        <div class="pop scroll_no_bar" v-if="isOpenSongs">
          <div
            class="name black_text hover"
            v-for="(item, index) in tags"
            :key="index"
            @click="changeList(index)"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
    <list1 :list="player.listDou" :index_="player.indexDou" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getDou } from "@/api/request.js";
import { timeTo } from "@/util/index.js";
import { player } from "@/util/Player.js";
import list1 from "@/components/songList/list1.vue";

let all = [];
const current = ref(0); //当前播放序号
const listName = ref("抖音");
const isOpenSongs = ref(false);
const tags = ["抖音", "无人声", "有人声"];

onMounted(() => {
  getDou().then((res) => {
    all = res;
    player.listDou.value = res;
  });
});

function refresh(){
  localStorage.setItem('douList','')
  getDou().then((res) => {
    all = res;
    if(listName.value==tags[0]){
      player.listDou.value = res;
    } 
  });
}

function changeList(index) {
  listName.value = tags[index];
  player.listDou.value = index==0 ? all : all.filter((v) => v.tag == index);
  player.indexDou.value = 0
  isOpenSongs.value = false
}
</script>

<style scoped lang="less">
.dou {
  width: 350px;
  height: 350px;
  display: flex;
  flex-direction: column;
  .head {
    width: 100%;
    height: 40px;
    display: flex;
    .list_name {
      width: 20%;
      height: 100%;
      .span {
        height: 40px;
        line-height: 40px;
      }
      .pop {
        width: 10vw;
        overflow: auto;
        position: relative;
        z-index: 999;
        .name {
          height: 50px;
          line-height: 50px;
          padding-left: 10px;
        }
      }
    }
  }
}
</style>