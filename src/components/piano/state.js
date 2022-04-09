import {ref} from 'vue'
export const insIndex = ref(40) //乐器序号

export function getIns(id){
  let url = `https://static-db46e7bd-69d3-4f40-b4a6-53a94cd18f8c.bspapp.com/audiofont/a${id}.js`
  return new Promise((resolve,reject)=>{
    fetch(url).then(res=>res.text()).then(res=>{
      resolve({zones:eval(res)})
    })
  })
}
