import { player } from '@/util/Player.js'


export class Round {
  listener = null
  panner = null

  //x,y表示相对于播放器panner的listener的位置
  move(x,y){
    this.panner.positionX.value = parseInt(x)
    this.panner.positionZ.value = parseInt(y)
  }

  init() {
    this.listener = player.ctx.listener
    this.listener.positionX.value = 100;
    this.listener.positionY.value = 0;
    this.listener.positionZ.value = 100;
    this.listener.forwardX.value = 0;
    this.listener.forwardY.value = 0;
    this.listener.forwardZ.value = -1;
    this.listener.upX.value = 0;
    this.listener.upY.value = 1;
    this.listener.upZ.value = 0;
    this.panner = new PannerNode(player.ctx, {
      panningModel: 'HRTF',//在弄清楚声音的位置时，会考虑人脑（对声音的处理）
      distanceModel: 'linear',//这些是不同的算法，用于在音频源远离收听者时减小音频源的音量。我们将使用linear，因为它很简单
      positionX: 0,
      positionY: 0,
      positionZ: 0,
      orientationX: 0.0,
      orientationY: 0.0,
      orientationZ: -1.0,
      refDistance: 1,//参考距离 (refDistance)，由距离模型使用
      maxDistance: 200,//如果源距离此点更远，则音量将不再减小
      rolloffFactor: 100000,//描述随着panner远离收听者，音量减小的速度有多快
      coneInnerAngle: 360,//指定音量发出的位F置。默认情况下，两者都是360度。我们可以定义音箱扬声器拥有较小的锥体。        
      coneOuterAngle: 360,//内锥是总是模拟增益（音量）最大值的地方，外锥是增益开始下降的地方。
      coneOuterGain: 0.1,//增益通过 coneOuterGain 值来减少
    })
    this.connect()
  }

  connect(){
    player.analyser.disconnect(player.ctx.destination)
    player.analyser.connect(this.panner).connect(player.ctx.destination)
  }

  dispose(){
    player.analyser.disconnect(this.panner)
    this.panner.disconnect(player.ctx.destination)
    player.analyser.connect(player.ctx.destination)
  }
}