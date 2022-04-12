<template>
  <div class="net">
    <div class="head">
      <div
        class="list_name"
        @mouseenter="() => (isOpenSongs = true)"
        @mouseleave="() => (isOpenSongs = false)"
        @dblclick="refreshLike"
      >
        <!-- <div class="span_"> -->
          <div
            class="first"
            :style="{ fontWeight: choice == 0 ? '900' : '400' }"
            >{{
              listSongs.length != 0 ? listSongs[indexSongs].name : "我喜欢"
            }}</div
          >
        <!-- </div> -->
        <div class="pop scroll_no_bar" v-if="isOpenSongs">
          <div
            class="name black_text hover"
            v-for="(item, index) in listSongs"
            :key="index"
            @click="changeList(index)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="fm_">
        <span
          class="center"
          @click="getDay"
          :style="{ fontWeight: choice == 1 ? '900' : '400' }"
          >日推</span
        >
      </div>
      <div class="fm_">
        <span
          class="center"
          @click="handleFM"
          :style="{ fontWeight: choice == 2 ? '900' : '400' }"
          >FM</span
        >
      </div>
      <!-- 搜索 -->
      <div
        class="search"
        @mouseenter="() => (isOpenSearch = true)"
        @mouseleave="() => (isOpenSearch = false)"
      >
        <div class="span_">
          <span class="center iconfont icon-sousuo"></span>
        </div>
        <div class="pop_search pop" v-if="isOpenSearch">
          <input class="input" type="text" v-model="keywords" />
          <span
            class="icon iconfont icon-sousuo"
            @click="search"
            :style="{ fontWeight: choice == 3 ? '900' : '400' }"
          ></span>
        </div>
      </div>
    </div>
    <list1 :list="player.listNet" :index_="player.indexNet" />
  </div>
</template>

<script setup>
import { ref, onMounted, toRaw } from "vue";
import { timeTo } from "@/util/index.js";
import {
  getSongList,
  getSongsList,
  getNetDay,
  searchNet,
  getFM,
} from "@/api/request.js";
import list1 from "@/components/songList/list1.vue";
import { player } from "@/util/Player.js";

const current = ref(0); //当前播放序号
const listSongs = ref([]); //歌单列表
const indexSongs = ref(0); //当前歌单序号
const isOpenSongs = ref(false); //是否打开歌单
const isOpenSearch = ref(false); //打开搜索
const choice = ref(0); //0歌单 1日推 2私人fm 3搜索
const keywords = ref("");

onMounted(async () => {
  listSongs.value = await getSongsList();
  getSongList(toRaw(listSongs.value)[0].id).then((res) => {
    player.listNet.value = res;
  });
});

//刷新我喜欢
function refreshLike() {
  localStorage.setItem(`songListNet${toRaw(listSongs.value)[0].id}`, "");
  getSongList(toRaw(listSongs.value)[0].id).then((res) => {
    if (indexSongs.value == 0 && choice.value == 0) {
      player.listNet.value = res;
    }
  });
}

//fm
function handleFM() {
  getFM().then((res) => {
    player.listNet.value = res;
    player.indexNet.value = 0;
    choice.value = 2;
  });
}

//搜索
function search() {
  searchNet(keywords.value).then((res) => {
    player.listNet.value = res;
    player.indexNet.value = 0;
    isOpenSearch.value = false;
    choice.value = 3;
  });
}

//日推
function getDay() {
  getNetDay().then((res) => {
    player.listNet.value = res;
    player.indexNet.value = 0;
    choice.value = 1;
  });
}

//歌单
function changeList(index) {
  if (indexSongs.value == index && choice.value == 0) return;
  getSongList(toRaw(listSongs.value)[index].id).then((res) => {
    player.listNet.value = res;
    player.indexNet.value = 0;
    indexSongs.value = index;
    isOpenSongs.value = false;
    choice.value = 0;
  });
}
</script>

<style scoped lang="less">
.net {
  width: 350px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  .span_ {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .span {
    height: 40px;
    line-height: 40px;
    width: 100%;
    text-align: center;
  }
  .head {
    width: 100%;
    height: 40px;
    display: flex;
    .first {
      width: 150px;
      height: 40px;
      line-height: 40px;
    }
    .search {
      width: 60px;
      height: 100%;
      .pop_search {
        width: 200px;
        height: 30px;
        position: relative;
        z-index: 999;
        display: flex;
        .input {
          margin-left: 15px;
          width: 80%;
          height: 30px;
          line-height: 30px;
          color: black;
        }
        .icon {
          width: 20%;
          height: 30px;
          line-height: 30px;
          color: black;
          text-align: right;
          margin-right: 15px;
        }
      }
    }
    .fm_ {
      position: relative;
      flex: 1;
      height: 100%;
    }
    .list_name {
      width: 150px;
      height: 100%;
      .pop {
        width: 150px;
        height: 200px;
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