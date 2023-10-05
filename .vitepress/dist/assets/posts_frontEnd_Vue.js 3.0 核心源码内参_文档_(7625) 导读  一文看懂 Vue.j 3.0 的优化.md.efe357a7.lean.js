import{_ as l,j as o,o as e,g as t,k as n,Q as a,s as p}from"./chunks/framework.4e7d56ce.js";const k=JSON.parse('{"title":"源码优化 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Vue.js 3.0 核心源码内参_文档/(7625) 导读  一文看懂 Vue.j 3.0 的优化.md","filePath":"posts/frontEnd/Vue.js 3.0 核心源码内参_文档/(7625) 导读  一文看懂 Vue.j 3.0 的优化.md","lastUpdated":1696417798000}'),c={name:"posts/frontEnd/Vue.js 3.0 核心源码内参_文档/(7625) 导读  一文看懂 Vue.j 3.0 的优化.md"},r=a("",8),E=p("p",null,"而到了 Vue.js 3.0 ，整个源码是通过 monorepo 的方式维护的，根据功能将不同的模块拆分到 packages 目录下面不同的子目录中：",-1),i=a("",28),y=a("",12),u=p("p",null,"这是 Vue.js 2.x 从 new Vue 开始渲染成 DOM 的流程，上面说过的响应式过程就发生在图中的 init 阶段，另外 template compile to render function 的流程是可以借助 vue-loader 在 webpack 编译阶段离线完成，并非一定要在运行时完成。",-1),d=p("p",null,"所以想优化整个 Vue.js 的运行时，除了数据劫持部分的优化，我们可以在耗时相对较多的 patch 阶段想办法，Vue.js 3.0 也是这么做的，并且它通过在编译阶段优化编译的结果，来实现运行时 patch 过程的优化。",-1),g=p("p",null,"我们知道，通过数据劫持和依赖收集，Vue.js 2.x 的数据更新并触发重新渲染的粒度是组件级的：",-1),h=a("",3),m=a("",13),_=p("p",null,"Vue.js 3.0 提供了一种新的 API：Composition API，它有一个很好的机制去解决这样的问题，就是将某个逻辑关注点相关的代码全都放在一个函数里，这样当需要修改一个功能时，就不再需要在文件中跳来跳去。",-1),F=p("p",null,"通过下图，我们可以很直观地感受到 Composition API 在逻辑组织方面的优势：",-1),A=a("",31);function x(v,C,j,D,b,f){const s=o("Image");return e(),t("div",null,[r,n(s,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/2C/DC/Ciqc1F8Cn6mAHaUrAACzRBFsL1g844.png"}),E,n(s,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/2C/DC/Ciqc1F8Cn7KAELkqAAJkxFes1zw593.png"}),i,n(s,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/2C/FF/CgqCHl8CudyAJc3tAAGkPxYyp9k501.png"}),y,n(s,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/2C/FF/CgqCHl8Cuf2AZw70AAEFU2EMA50521.png"}),u,d,g,n(s,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/2C/F4/Ciqc1F8CuhCADiJ1AAGMYHdzHa0498.png"}),h,n(s,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image/M00/6E/CE/Ciqc1F-zmN-AbAP_AAEJ0vicgdA415.png"}),m,n(s,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/2C/DD/Ciqc1F8CoIeAToThAAG5J8trLZc593.png"}),_,F,n(s,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/2C/E9/CgqCHl8CoI-ACOXEAAM5NZiddQs980.png"}),A])}const P=l(c,[["render",x]]);export{k as __pageData,P as default};
