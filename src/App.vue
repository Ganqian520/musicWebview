<template>
  <index />
</template>

<script setup>
import { toRaw } from "vue";
import index from "./components/index/index.vue";
import { state, show } from "@/util/state.js";
import { instance } from "@/api/index.js";
import axios from "axios";

let url = "https://ca448d14-fda5-4d8f-9279-3f4896d8f854.bspapp.com/all/video"


// document.body.addEventListener('click',()=>{
//   try {
//     document.body.requestFullscreen()
//   }catch(err){

//   }
// })
</script>
