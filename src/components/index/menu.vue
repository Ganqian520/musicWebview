<template>
  <div class='menu'>

    <div class="item">
      <span class="tip">自定义位置</span>
      <div class="right">
        <mswitch class="switch_" :flag="false"  @change="(e)=>state.isOpenAnchor.value = e.flag  "/>
      </div>
    </div>

    <div class="item" v-for="(v,i) in list" :key="i">
      <span class="tip">{{v}}</span>
      <div class="right">
        <mswitch class="switch_" :flag="show[attr[i]]" :index="i" @change="showChange"/>
      </div>
    </div>

    <span class="msg">
      如有问题欢迎发送到邮箱：2282227679@qq.com
    </span>
  </div>
</template>

<script setup>
import { ref,toRaw } from "vue";
import mswitch from '@/components/widgets/switch.vue'
import {state,show} from '@/util/state.js'

let list = ['钢琴','环绕音效','3D背景','抖音列表','网易云列表','歌词','评论','播放控制']
let attr = ['piano','effect','three','dou','net','lyric','comments','control']

function showChange(e){
  show.value[attr[e.index]] = e.flag
  localStorage.setItem('show',JSON.stringify(toRaw(show.value)))
}
</script>

<style scoped lang="less">
.menu {
  width: 200px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: rgb(37, 37, 37);
  position: relative;
  .item {
    display: flex;
    height: 45px;
    line-height: 45px;
    padding-left: 10px;
    .tip {
      flex: 3;
      line-height: 45px;
    }
    .right{
      flex: 1;
      height: 100%;
      display: flex;
      .switch_{
        margin: auto;
      }
    }
  }
  .msg {
    margin: 10px;
    position: absolute;
    bottom: 0px;
    color: rgba(0,255,255,0.5);
    font-size: 0.7rem;
    user-select: text;
  }
}
</style>