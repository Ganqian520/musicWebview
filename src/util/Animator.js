export class Animator {
  constructor(duration) { //ms
    this.duration = duration
    this.updateCb = ()=>{}
    this.endedCb = ()=>{}
    this.startTime = 0
  }
  start() {
    this.startTime = new Date().getTime()
    this.recursion()
  }
  recursion() {
    let current = new Date().getTime() - this.startTime //据开始的毫秒数
    if (current < this.duration) {
      requestAnimationFrame(this.recursion.bind(this))
      this.updateCb(current)
    } else {
      this.endedCb()
    }
  }
}