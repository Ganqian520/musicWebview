

//blob转arraybuffer
export function blobToBuffer(blob) {
  return new Promise((resolve) => {
    let reader = new FileReader()
    reader.readAsArrayBuffer(blob)
    reader.onload = ()=>{
      resolve(reader.result)
    }
  })
}

//分钟字符串互转秒数
export function timeTo(e) {
  if (typeof e == 'number') {
    let min = parseInt(e / 60);
    let second = parseInt(e - min * 60);
    min = min < 10 ? `0${min}` : min;
    second = second < 10 ? `0${second}` : second;
    return `${min}:${second}`;
  } else  {
    return parseInt(e.slice(0, 2)) * 60 + parseInt(e.slice(3, 5));
  }
}

//处理歌单
export function handleNetSongs(arr) {
  return arr.map(v => {
    return {
      name: v.name,
      id: v.id,
      author: v.ar.map(v => v.name).join('/'),
      time: Math.floor(v.dt / 1000),
      platform: 'net',
    }
  })
}