import{_ as l,j as e,o as t,g as c,k as p,h as a,s,Q as o}from"./chunks/framework.e0c66c3f.js";const b=JSON.parse('{"title":"etcd 整体分析 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/etcd 原理与实践_文档/(6401) 07  集群调优：如何使 etcd 集群处于最佳状态？.md","filePath":"posts/backEnd/etcd 原理与实践_文档/(6401) 07  集群调优：如何使 etcd 集群处于最佳状态？.md","lastUpdated":1696338709000}'),r={name:"posts/backEnd/etcd 原理与实践_文档/(6401) 07  集群调优：如何使 etcd 集群处于最佳状态？.md"},d=s("p",null,"我们在日常工作中经常会遇到各种服务调优，同样，对于 etcd 集群来说，也需要对其进行调优，使其处于最佳的状态。",-1),i=s("p",null,"这一讲我将通过分析 etcd 的架构，结合其核心部分对 etcd 集群进行优化。",-1),E=s("h3",{id:"etcd-整体分析",tabindex:"-1"},[a("etcd 整体分析 "),s("a",{class:"header-anchor",href:"#etcd-整体分析","aria-label":'Permalink to "etcd 整体分析"'},"​")],-1),y=s("p",null,"在对 etcd 进行调优之前，我们先来看看 etcd 集群的架构图，如下图所示：",-1),g=o("",35),F=o("",20),C=s("p",null,[a("除了服务端的优化，我们在日常使用过程中还要注意客户端的使用，正确的用法对于一个组件来说很重要。从实践角度来说，etcd 多用于"),s("strong",null,"读多写少"),a("的场景，读写的开销不一样，我们应该尽量避免频繁更新键值对数据。除此之外，我们还应该尽可能地复用 lease，避免重复创建 lease。对于相同 TTL 失效时间的键值对，绑定到相同的 lease 租约上也可以避免大量重复创建 lease。")],-1),h=s("p",null,"对于 etcd 集群调优，你还有哪些踩坑的经验，欢迎你在留言区和我分享。接下来，我们将开始第二模块------实现原理及关键技术的学习，下一讲就让我们从 etcd 的整体架构开始学习，从整体上了解 etcd 到底是一个什么样的架构。",-1);function f(u,_,v,m,A,D){const n=e("Image");return t(),c("div",null,[d,i,E,y,p(n,{alt:"2021214-133659.png",src:"https://s0.lgstatic.com/i/image6/M00/04/50/Cgp9HWAotx6AJs3YAADYPPDPLCY732.png"}),a(),g,p(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/02/FF/CioPOWAeXZOAZo74AAFZDxwMHG8511.png"}),F,p(n,{alt:"2021214-13377.png",src:"https://s0.lgstatic.com/i/image6/M00/04/50/Cgp9HWAotzmACWkdAALDTMnuiwE899.png"}),C,h])}const B=l(r,[["render",f]]);export{b as __pageData,B as default};
