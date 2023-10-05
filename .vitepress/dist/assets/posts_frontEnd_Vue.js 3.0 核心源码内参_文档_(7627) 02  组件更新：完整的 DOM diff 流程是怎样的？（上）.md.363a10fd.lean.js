import{_ as l,j as o,o as e,g as t,k as p,Q as c,s,h as n}from"./chunks/framework.4e7d56ce.js";const S=JSON.parse('{"title":"副作用渲染函数更新组件的过程 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Vue.js 3.0 核心源码内参_文档/(7627) 02  组件更新：完整的 DOM diff 流程是怎样的？（上）.md","filePath":"posts/frontEnd/Vue.js 3.0 核心源码内参_文档/(7627) 02  组件更新：完整的 DOM diff 流程是怎样的？（上）.md","lastUpdated":1696417798000}'),r={name:"posts/frontEnd/Vue.js 3.0 核心源码内参_文档/(7627) 02  组件更新：完整的 DOM diff 流程是怎样的？（上）.md"},E=c("",46),y=s("p",null,[n("接下来看一下"),s("strong",null,"旧子节点是空"),n("的情况：")],-1),i=s("ul",null,[s("li",null,[s("p",null,"如果新子节点是纯文本，那么在旧子节点的父容器下添加新文本节点即可；")]),s("li",null,[s("p",null,"如果新子节点也是空，那么什么都不需要做；")]),s("li",null,[s("p",null,"如果新子节点是 vnode 数组，那么直接去旧子节点的父容器下添加多个新子节点即可。")])],-1),d=s("p",null,[n("最后来看一下"),s("strong",null,"旧子节点是 vnode 数组"),n("的情况：")],-1),F=s("ul",null,[s("li",null,[s("p",null,"如果新子节点是纯文本，那么先删除旧子节点，再去旧子节点的父容器下添加新文本节点；")]),s("li",null,[s("p",null,"如果新子节点是空，那么删除旧子节点即可；")]),s("li",null,[s("p",null,"如果新子节点也是 vnode 数组，那么就需要做完整的 diff 新旧子节点了，这是最复杂的情况，内部运用了核心 diff 算法。")])],-1),D=s("p",null,"下节课我们就来深入探究一下这个复杂的 diff 算法。",-1),A=s("blockquote",null,[s("p",null,[s("strong",null,"本节课的相关代码在源代码中的位置如下：")]),s("p",null,"packages/runtime-core/src/renderer.ts"),s("p",null,"packages/runtime-core/src/componentRenderUtils.ts")],-1);function g(m,u,C,h,v,f){const a=o("Image");return e(),t("div",null,[E,p(a,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/31/18/Ciqc1F8MBDWAfUAXAADe59XvjHY701.png"}),y,i,p(a,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/31/23/CgqCHl8MBEOANnFmAADYr-_R5mM894.png"}),d,F,p(a,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/31/23/CgqCHl8MBCuAUZksAADplAU2718113.png"}),D,A])}const _=l(r,[["render",g]]);export{S as __pageData,_ as default};
