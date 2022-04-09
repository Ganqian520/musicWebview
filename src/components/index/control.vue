<template>
  <div class="control">
    <div class="song">
      <span class="span" @dblclick="addLike">{{music.name}}</span>
    </div>
    <div class="progress">
      <div class="time">
        <span class="time_span">{{leftTime}}</span>
      </div>
      <div class="slider">
        <input class="range" type="range"
        :value="value"
        min="1" max="100" step="0.1"
        @input="input"
        @change="change"
        :style="{background: `linear-gradient(to right,rgba(0,255,255,1) 0%,rgba(0,255,255,1) ${value}%,rgba(0,255,255,0.4) ${value}%,rgba(0,255,255,0.4) 100%)`}" />
      </div>
      <div class="time">
        <span class="time_span">{{rightTime}}</span>
      </div>
    </div>
    <div class="button">
      <div class="icon_">
          <span :class="['icon','iconfont',['icon-shunxubofang','icon-suijibofang','icon-danquxunhuan'][order]]"
          @click="orderChange"></span>
      </div>
      <div class="icon_">
        <span class="icon iconfont icon-shangyishoushangyige" @click="player.last"></span>
      </div>
      <div class="icon_" @click="play">
        <span :class="['icon','iconfont',isPlay ? 'icon-pause' :'icon-bofang1']"></span>
      </div>
      <div class="icon_">
        <span class="icon iconfont icon-xiayigexiayishou" @click="player.next"></span>
      </div>
      <div class="icon_">
        <span class="icon iconfont icon-qingchu" @click="()=>player.listWant=[]"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref,watchEffect} from "vue";
import {player} from '@/util/Player.js'
import {timeTo} from '@/util/index.js'
import {addNetLike} from '@/api/request.js'

const value = ref(1)
const music = player.music
const isPlay = player.isPlay
const leftTime = ref('00:00')
const rightTime = ref('00:00')
const order = ref(player.order)

player.updateProgressCb = ()=>{
  let current = player.audio.currentTime
  let duration = player.audio.duration
  if(isNaN(duration)) duration = 0
  value.value = current/duration * 100
  leftTime.value = timeTo(Math.floor(current))
  rightTime.value = timeTo(Math.floor(duration)) 
}

//添加我喜欢
function addLike(){
  if(music.value.platform=='net'){
    addNetLike(music.value.id)
  }
}

//进度条改变中
function input(e){
  if(!player.music.value.name) return
  value.value = e.target.value
  player.isUserSlide = true
  leftTime.value = timeTo(Math.floor(player.audio.duration*value.value/100))
}

//进度条改变后
function change(e){
  if(!player.music.value.name) return
  value.value = e.target.value
  player.isUserSlide = false
  let time = player.audio.duration*value.value/100
  player.audio.currentTime = time
}

//播放顺序
function orderChange(){
  let order_ = order.value
  player.order = order_ < 2 ? order_+1 : 0
  order.value = player.order
}

//播放/暂停
function play(){
  if(!music.value.name) return
  player.isPlay.value ? player.pause() : player.resume()
}

</script>

<style scoped lang="less">
.control {
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100px;
  .song {
    width: 100%;
    flex: 1;
    display: flex;
    span {
      margin: auto;
      white-space: nowrap;
      overflow: hidden;
    }
  }
  .progress {
    display: flex;
    width: 100%;
    flex: 1;
    .time {
      display: flex;
      flex: 3;
      height: 100%;
      .time_span {
        margin: auto;
        font-size: 0.8rem;
      }
    }
    .slider {
      flex: 10;
      display: flex;
      .range {
        width: 100%;
        height: 2px;
        margin: auto;
        border-radius: 1px;
        -webkit-appearance: none;
        background:none;
      }
      .range::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: rgba(0,255,255,1);
      }
    }
  }
  .button {
    display: flex;
    flex: 1;
    .icon_{
      flex: 1;
      height: 100%;
      display: flex;
      .icon-shunxubofang {
        font-size: 13px;
      }
      .icon-qingchu {
        font-size: 14px ;
      }
      .icon-pause {
        font-size: 18px;
      }
      .icon{
        margin: auto;
      }
    }
  }
}
</style>