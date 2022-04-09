import{r as x,o as i,c as _,a as y,n as m,b as l,u as e,F as C,d as T,p as q,e as B,t as V,f as J,g as d,h as f,i as S,j as M}from"./vendor.cf001842.js";const F=function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}};F();const X="modulepreload",A={},j="./",v=function(a,n){return!n||n.length===0?a():Promise.all(n.map(s=>{if(s=`${j}${s}`,s in A)return;A[s]=!0;const t=s.endsWith(".css"),o=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${s}"]${o}`))return;const r=document.createElement("link");if(r.rel=t?"stylesheet":X,t||(r.as="script",r.crossOrigin=""),r.href=s,document.head.appendChild(r),t)return new Promise((h,k)=>{r.addEventListener("load",h),r.addEventListener("error",()=>k(new Error(`Unable to preload CSS for ${s}`)))})})).then(()=>a())};var I=(u,a)=>{const n=u.__vccOpts||u;for(const[s,t]of a)n[s]=t;return n};const z={props:{flag:Boolean,index:Number},emits:["change"],setup(u,{emit:a}){const n=u,s=x(n.flag);function t(){s.value=!s.value;let o={flag:s.value,index:n.index};a("change",o)}return(o,r)=>(i(),_("div",{class:"switch",onClick:t,style:m({backgroundColor:s.value?"rgba(0,255,255,0.6)":"transparent"})},[y("div",{class:"circle",style:m({transform:s.value?"translateX(15px)":"translateX(1px)"})},null,4)],4))}};var P=I(z,[["__scopeId","data-v-dcb7cb72"]]);const E={isLogin:x(!1),msg:x(0),isOpenAnchor:x(!1)},p=x({effect:!0,comments:!0,piano:!0,dou:!0,net:!0,lyric:!0,control:!0,three:!0}),c=x({comments:{x:470,y:323},control:{x:874,y:595},dou:{x:1094,y:35},effect:{x:1254,y:491},lyric:{x:584,y:35},net:{x:100,y:35},piano:{x:36,y:425}});const D=u=>(q("data-v-68bfa3a5"),u=u(),B(),u),K={class:"menu"},U={class:"item"},W=D(()=>y("span",{class:"tip"},"\u81EA\u5B9A\u4E49\u4F4D\u7F6E",-1)),Y={class:"right"},G={class:"tip"},H={class:"right"},Q=D(()=>y("span",{class:"msg"}," \u5982\u6709\u95EE\u9898\u6B22\u8FCE\u53D1\u9001\u5230\u90AE\u7BB1\uFF1A2282227679@qq.com ",-1)),Z={setup(u){let a=["\u94A2\u7434","\u73AF\u7ED5\u97F3\u6548","3D\u80CC\u666F","\u6296\u97F3\u5217\u8868","\u7F51\u6613\u4E91\u5217\u8868","\u6B4C\u8BCD","\u8BC4\u8BBA","\u64AD\u653E\u63A7\u5236"],n=["piano","effect","three","dou","net","lyric","comments","control"];function s(t){p.value[n[t.index]]=t.flag,localStorage.setItem("show",JSON.stringify(J(p.value)))}return(t,o)=>(i(),_("div",K,[y("div",U,[W,y("div",Y,[l(P,{class:"switch_",flag:!1,onChange:o[0]||(o[0]=r=>e(E).isOpenAnchor.value=r.flag)})])]),(i(!0),_(C,null,T(e(a),(r,h)=>(i(),_("div",{class:"item",key:h},[y("span",G,V(r),1),y("div",H,[l(P,{class:"switch_",flag:e(p)[e(n)[h]],index:h,onChange:s},null,8,["flag","index"])])]))),128)),Q]))}};var ee=I(Z,[["__scopeId","data-v-68bfa3a5"]]);const te={props:{from:String},setup(u){const a=u;function n(){document.body.onmousemove=o=>s(o),document.body.onmouseup=t}function s(o){c.value[a.from].x+=o.movementX,c.value[a.from].y+=o.movementY}function t(){document.body.onmousemove=null,document.body.onmouseup=null,localStorage.setItem("position",JSON.stringify(c.value))}return(o,r)=>e(E).isOpenAnchor.value?(i(),_("div",{key:0,class:"anchor bg",onMousedown:n},null,32)):d("",!0)}};var g=I(te,[["__scopeId","data-v-48624fe9"]]);const oe={class:"index"},se={class:"msg"},ne={setup(u){const a=f(()=>v(()=>import("./index.510561ad.js"),["assets/index.510561ad.js","assets/Player.d6745c92.js","assets/request.d90be21b.js","assets/vendor.cf001842.js"])),n=f(()=>v(()=>import("./lyric.145df5f7.js"),["assets/lyric.145df5f7.js","assets/lyric.90b6dae2.css","assets/Player.d6745c92.js","assets/request.d90be21b.js","assets/vendor.cf001842.js","assets/Animator.194adef1.js"])),s=f(()=>v(()=>import("./net.8e9412f2.js"),["assets/net.8e9412f2.js","assets/net.a6f7b61a.css","assets/vendor.cf001842.js","assets/request.d90be21b.js","assets/list1.8398a2b4.js","assets/list1.ddb9c7e7.css","assets/Player.d6745c92.js","assets/Animator.194adef1.js"])),t=f(()=>v(()=>import("./control.70f69c6e.js"),["assets/control.70f69c6e.js","assets/control.539d1257.css","assets/Player.d6745c92.js","assets/request.d90be21b.js","assets/vendor.cf001842.js"])),o=f(()=>v(()=>import("./dou.71b75266.js"),["assets/dou.71b75266.js","assets/dou.be620a1c.css","assets/request.d90be21b.js","assets/Player.d6745c92.js","assets/vendor.cf001842.js","assets/list1.8398a2b4.js","assets/list1.ddb9c7e7.css","assets/Animator.194adef1.js"])),r=f(()=>v(()=>import("./effect.978f9ee7.js"),["assets/effect.978f9ee7.js","assets/effect.6cd3eb68.css","assets/Player.d6745c92.js","assets/request.d90be21b.js","assets/vendor.cf001842.js"])),h=f(()=>v(()=>import("./login.d1ca0cc8.js"),["assets/login.d1ca0cc8.js","assets/login.00e9ef09.css","assets/vendor.cf001842.js","assets/request.d90be21b.js"])),k=f(()=>v(()=>import("./comments.fcf10865.js"),["assets/comments.fcf10865.js","assets/comments.9915b8ea.css","assets/request.d90be21b.js","assets/Player.d6745c92.js","assets/vendor.cf001842.js"])),N=f(()=>v(()=>import("./index.c0cf96eb.js"),["assets/index.c0cf96eb.js","assets/index.708a4d29.css","assets/vendor.cf001842.js"])),L=x(!1),R=["","\u62FC\u547D\u52A0\u8F7D\u4E2D..."];let $=localStorage.getItem("user");E.isLogin.value=!!$;let b=localStorage.getItem("position");b&&(c.value=JSON.parse(b));let w=localStorage.getItem("show");return w&&(p.value=JSON.parse(w)),(ce,O)=>(i(),_("div",oe,[e(p).three?(i(),S(e(a),{key:0,class:"three_"})):d("",!0),e(p).control?(i(),_("div",{key:1,class:"anchor_",style:m({left:e(c).control.x+"px",top:e(c).control.y+"px"})},[l(e(t)),l(g,{from:"control"})],4)):d("",!0),e(p).dou?(i(),_("div",{key:2,class:"anchor_",style:m({left:e(c).dou.x+"px",top:e(c).dou.y+"px"})},[l(e(o)),l(g,{from:"dou"})],4)):d("",!0),e(p).net&&e(E).isLogin.value?(i(),_("div",{key:3,class:"anchor_",style:m({left:e(c).net.x+"px",top:e(c).net.y+"px"})},[l(e(s)),l(g,{from:"net"})],4)):d("",!0),e(p).lyric?(i(),_("div",{key:4,class:"anchor_",style:m({left:e(c).lyric.x+"px",top:e(c).lyric.y+"px"})},[l(e(n)),l(g,{from:"lyric"})],4)):d("",!0),e(p).effect?(i(),_("div",{key:5,class:"anchor_",style:m({left:e(c).effect.x+"px",top:e(c).effect.y+"px"})},[l(e(r)),l(g,{from:"effect"})],4)):d("",!0),e(p).comments?(i(),_("div",{key:6,class:"anchor_",style:m({left:e(c).comments.x+"px",top:e(c).comments.y+"px"})},[l(e(k)),l(g,{from:"comments"})],4)):d("",!0),e(p).piano?(i(),_("div",{key:7,class:"anchor_",style:m({left:e(c).piano.x+"px",top:e(c).piano.y+"px"})},[l(e(N)),l(g,{from:"piano"})],4)):d("",!0),e(E).isLogin.value?d("",!0):(i(),S(e(h),{key:8,class:"login_"})),l(ee,{class:"menu_",onMouseleave:O[0]||(O[0]=()=>L.value=!1),style:m({transform:L.value?"translate(0px,0)":"translate(-200px,0)"})},null,8,["style"]),y("span",{class:"setting iconfont icon-shezhi",onMouseenter:O[1]||(O[1]=()=>L.value=!0)},null,32),y("span",se,V(R[e(E).msg.value]),1)]))}};var re=I(ne,[["__scopeId","data-v-926e5424"]]);const ae={setup(u){return(a,n)=>(i(),S(re))}};M(ae).mount("#app");export{I as _,E as s};