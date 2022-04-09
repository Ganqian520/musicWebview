import { createVNode, render } from 'vue'
import instruments from '@/components/piano/instruments.vue'

export function openPop() {
  const div = document.createElement('div')
  div.setAttribute('class', 'globpop')
  document.body.appendChild(div)
  const close = () => {
    const animate = document.getElementById("pop").animate([
      { opacity: '1' },
      { opacity: '0' }
    ], {
      duration: 500,
    });
    animate.onfinish = () => {
      render(null, div)
      document.body.removeChild(div)
    }

  }
  const vnode = createVNode(instruments, { close })
  render(vnode, div)
  document.getElementById("pop").animate([
    { opacity: '0' },
    { opacity: '1' }
  ], {
    duration: 300,
  });
}