<template>
  <div class='instruments center' id="pop" @mouseleave="props.close" >
    <div class="left">
      <span class="left_item" v-for="(v,i) in classify" :key="i">{{v}}：</span>
    </div>
    <div class="right">
      <span class="right_item hover" v-for="(v,i) in instruments" :key="i" @click="select(i)">{{v.cn}}</span>
    </div>
  </div>
</template>

<script setup>
  import {ref,defineProps} from 'vue'
  import {instruments ,classify} from '@/lib/instruments.js'
  import {insIndex} from './state.js'
  const props = defineProps({
    close:Function
  })
  function select(i){
    if(insIndex.value!=i) insIndex.value=i
    props.close()
  }
</script>

<style scoped lang="less">
  .instruments {
    height: 640px;
    background-color: rgb(43, 43, 43);
    border-radius: 10px;
    display: flex;
    .left {
      width: 140px;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      .left_item{
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: left;
        padding-left: 10px;
        font-weight: 800;
        color: rgba(0,255,255,0.7);
      }
    }
    .right {
      width: 1120px;
      display: flex;
      flex-wrap: wrap;
      .right_item {
        width: 140px;
        height: 40px;
        line-height: 40px;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 0.9rem;
        color: rgba(0,255,255,0.6);
      }
    }
  }
</style>