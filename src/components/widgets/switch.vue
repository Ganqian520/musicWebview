<template>
  <div class='switch' @click="click" :style="{backgroundColor:flag?'rgba(0,255,255,0.6)':'transparent'}">
    <div class="circle" :style="{transform:flag ? 'translateX(15px)':'translateX(1px)'}"></div>
  </div>
</template>

<script setup>
  import {ref} from 'vue'

  const props = defineProps({
    flag:Boolean,
    index:Number
  })

  const emits = defineEmits(['change'])

  const flag = ref(props.flag)

  function click(){
    flag.value = !flag.value
    let obj = {flag:flag.value,index:props.index}
    emits('change',obj)
  }
</script>

<style scoped lang="less">
  .switch {
    width: 30px;
    height: 16px;
    border-radius: 16px;
    border: cyan solid 2px;
    position: relative;
    display: flex;
    align-items: center;
    transition: background-color 300ms linear;
    .circle{
      position: absolute;
      background-color: cyan;
      width: 14px;
      height: 14px;
      // top: 50%;
      // transform: translateY(-50%);
      border-radius: 50%;
      transition: transform 300ms linear;
    }
  }
</style>