import{_ as p,j as o,o as e,g as t,k as l,s,h as n,Q as c}from"./chunks/framework.4e7d56ce.js";const b=JSON.parse('{"title":"响应式对象的实现差异 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Vue.js 3.0 核心源码内参_文档/(7631) 05  响应式：响应式内部的实现原理是怎样的？（上）.md","filePath":"posts/frontEnd/Vue.js 3.0 核心源码内参_文档/(7631) 05  响应式：响应式内部的实现原理是怎样的？（上）.md","lastUpdated":1696417798000}'),r={name:"posts/frontEnd/Vue.js 3.0 核心源码内参_文档/(7631) 05  响应式：响应式内部的实现原理是怎样的？（上）.md"},E=s("p",null,"上一节课我们学习了 Composition API 的核心 setup 函数的实现，在 setup 函数中，我们多次使用一些 API 让数据变成响应式，那么这节课我们就来深入学习响应式内部的实现原理。",-1),y=s("p",null,[n("除了组件化，Vue.js 另一个核心设计思想就是"),s("strong",null,"响应式"),n(" 。它的本质是当数据变化后会自动执行某个函数，映射到组件的实现就是，当数据变化后，会自动触发组件的重新渲染。"),s("strong",null,"响应式是 Vue.js 组件化更新渲染的一个核心机制"),n("。")],-1),i=s("p",null,"在介绍 Vue.js 3.0 响应式实现之前，我们先来回顾一下 Vue.js 2.x 响应式实现的部分： 它在内部通过 Object.defineProperty API 劫持数据的变化，在数据被访问的时候收集依赖，然后在数据被修改的时候通知依赖更新。我们用一张图可以直观地看清这个流程。",-1),F=c("",58),d=s("p",null,"所以每次 track ，就是把当前激活的副作用函数 activeEffect 作为依赖，然后收集到 target 相关的 depsMap 对应 key 下的依赖集合 dep 中。",-1),g=s("p",null,"了解完依赖收集的过程，下节课我们来分析派发通知的过程。",-1),A=s("blockquote",null,[s("p",null,[s("strong",null,"本节课的相关代码在源代码中的位置如下：")]),s("p",null,"packages/reactivity/src/baseHandlers.ts"),s("p",null,"packages/reactivity/src/effect.ts"),s("p",null,"packages/reactivity/src/reactive.ts")],-1);function v(u,D,_,C,m,f){const a=o("Image");return e(),t("div",null,[E,y,i,l(a,{alt:"6.png",src:"https://s0.lgstatic.com/i/image/M00/36/C0/CgqCHl8YAPSAYotsAAG17TKWHiQ421.png"}),F,l(a,{alt:"7.png",src:"https://s0.lgstatic.com/i/image/M00/36/B5/Ciqc1F8YAL6Afvr-AAEj_nQbDuE332.png"}),d,g,A])}const h=p(r,[["render",v]]);export{b as __pageData,h as default};
