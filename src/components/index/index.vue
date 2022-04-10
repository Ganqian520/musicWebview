<template>
  <div class="index">
    <three class="three_" v-if="show.three" />

    
    <div class="anchor_" v-if="show.control" :style="{left:position.control.x+'px',top:position.control.y+'px'}">
      <control />
      <anchor from='control' />
    </div>
    
    <div class="anchor_" v-if="show.dou" :style="{left:position.dou.x+'px',top:position.dou.y+'px'}">
      <dou />
      <anchor from="dou" />
    </div>
    
    <div class="anchor_" v-if="show.net && state.isLogin.value" :style="{left:position.net.x+'px',top:position.net.y+'px'}">
      <netgq />
      <anchor from="net" />
    </div>
    
    <div class="anchor_" v-if="show.lyric" :style="{left:position.lyric.x+'px',top:position.lyric.y+'px'}">
      <lyric />
      <anchor from="lyric" />
    </div>
    
    <div class="anchor_" v-if="show.effect" :style="{left:position.effect.x+'px',top:position.effect.y+'px'}">
      <effect />
      <anchor from="effect" />
    </div>
    
    <div class="anchor_" v-if="show.comments" :style="{left:position.comments.x+'px',top:position.comments.y+'px'}">
      <comments />
      <anchor from="comments" />
    </div>
    
    <div class="anchor_" v-if="show.piano" :style="{left:position.piano.x+'px',top:position.piano.y+'px'}">
      <piano />
      <anchor from="piano" />
    </div>


    <login class="login_" v-if="!state.isLogin.value" />

    <menugq class="menu_" @mouseleave="()=>isOpenMenu=false" 
      :style="{transform: isOpenMenu ? 'translate(0px,0)' : 'translate(-200px,0)'}"/>

    <span class="setting iconfont icon-shezhi" @mouseenter="()=>isOpenMenu=true"></span>
    <span class="msg">{{msgs[state.msg.value]}}</span>

    <div class="log bg">
      <div class="log_item" v-for="(item,index) in log" :key="index">{{item}}</div>
    </div>
  </div>
</template>

<script setup>
import { ref ,defineAsyncComponent} from "vue";


import menugq from "@/components/index/menu.vue";
import anchor from '@/components/widgets/anchor.vue'
const three = defineAsyncComponent(()=>import('@/components/threeD/index.vue'))
const lyric = defineAsyncComponent(()=>import('@/components/index/lyric.vue'))
const netgq = defineAsyncComponent(()=>import('@/components/songList/net.vue'))
const control = defineAsyncComponent(()=>import('@/components/index/control.vue'))
const dou = defineAsyncComponent(()=>import('@/components/songList/dou.vue'))
const effect = defineAsyncComponent(()=> import('@/components/index/effect.vue'))
const login = defineAsyncComponent(()=> import('@/components/index/login.vue'))
const comments = defineAsyncComponent(()=> import('@/components/index/comments.vue'))
const piano = defineAsyncComponent(()=>import('@/components/piano/index.vue'))

import {state,position,show,log} from '@/util/state.js'

const isOpenMenu = ref(false)

const msgs = ['','拼命加载中...']

let user = localStorage.getItem('user')
state.isLogin.value = user ? true : false

let positionStr = localStorage.getItem('position')
positionStr ? position.value = JSON.parse(positionStr) : null

let show_ = localStorage.getItem('show')
show_ ? show.value = JSON.parse(show_) : null

log.value.push(innerWidth,innerHeight)

</script>

<style scoped lang="less">
.index {
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;

  .log {
    position: absolute;
    top: 50vh;
    left: 50%;
    width: 20vw;
    height: 20%;
  }

  .anchor_ {
    position: absolute;
    z-index: 1;
  }
  .msg {
    position: absolute;
    z-index: 2;
    left: 60px;
    top: 20px;
    font-size: 0.8rem;
  }
  .setting {
    position: absolute;
    z-index: 2;
    left: 20px;
    top: 20px;
    font-size: 1.5rem;
  }
  .menu_ {
    position: absolute;
    z-index: 3;
    transition: transform 300ms linear;
  }
  .login_ {
    position: absolute;
    left: 100px;
    top: 100px;
  }
}
</style>