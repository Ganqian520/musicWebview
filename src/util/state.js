import { ref } from 'vue'

export const state = {
  isLogin: ref(false),
  msg: ref(0), //提示文字的序号
  isOpenAnchor: ref(false),//定位器
}

export const show = ref({
  effect: true,
  comments: true,
  piano: true,
  dou: true,
  net: true,
  lyric: true,
  control: true,
  three: true,
})

export const log = ref(["打印台"])

export const position = ref({
  comments: { x: 470, y: 323 },
  control: { x: 874, y: 595 },
  dou: { x: 1094, y: 35 },
  effect: { x: 1254, y: 491 },
  lyric: { x: 584, y: 35 },
  net: { x: 100, y: 35 },
  piano: { x: 36, y: 425 },
})