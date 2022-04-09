import axios from 'axios' 
import { state } from '@/util/state.js'

export const instance = axios.create({
  baseURL: 'https://ganqian1.vercel.app/',
  timeout: 18000,
  withCredentials: true
})


instance.interceptors.request.use(config => {
  state.msg.value = 1
  return config;
})

instance.interceptors.response.use(res => {
  state.msg.value = 0
  return res
}, err => {
  state.msg.value = 0
  return err
});