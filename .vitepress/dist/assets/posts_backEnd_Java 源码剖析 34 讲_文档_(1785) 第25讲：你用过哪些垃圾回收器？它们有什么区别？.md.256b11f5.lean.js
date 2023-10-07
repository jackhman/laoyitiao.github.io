import{_ as r,j as s,o as i,g as n,k as t,h as e,s as a,Q as o}from"./chunks/framework.4e7d56ce.js";const v=JSON.parse('{"title":"第25讲：你用过哪些垃圾回收器？它们有什么区别？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Java 源码剖析 34 讲_文档/(1785) 第25讲：你用过哪些垃圾回收器？它们有什么区别？.md","filePath":"posts/backEnd/Java 源码剖析 34 讲_文档/(1785) 第25讲：你用过哪些垃圾回收器？它们有什么区别？.md","lastUpdated":1696417798000}'),_={name:"posts/backEnd/Java 源码剖析 34 讲_文档/(1785) 第25讲：你用过哪些垃圾回收器？它们有什么区别？.md"},p=a("h1",{id:"第25讲-你用过哪些垃圾回收器-它们有什么区别",tabindex:"-1"},[e("第25讲：你用过哪些垃圾回收器？它们有什么区别？ "),a("a",{class:"header-anchor",href:"#第25讲-你用过哪些垃圾回收器-它们有什么区别","aria-label":'Permalink to "第25讲：你用过哪些垃圾回收器？它们有什么区别？"'},"​")],-1),c=a("p",null,"上一课时我们讲了垃圾回收的理论知识，而本课时将介绍这些理论知识的具体实践。垃圾回收器也叫垃圾收集器，不同的厂商对垃圾收集器的实现也是不同的，这里主要介绍目前使用最广泛的 OracleJDK 中自带的 HotSpot 虚拟机中的几个垃圾收集器。",-1),d=a("p",null,"我们本课时的面试题是，你用过哪些垃圾回收器？它们有什么区别？",-1),C=a("h3",{id:"典型回答",tabindex:"-1"},[e("典型回答 "),a("a",{class:"header-anchor",href:"#典型回答","aria-label":'Permalink to "典型回答"'},"​")],-1),S=a("p",null,"《Java 虚拟机规范》并没有对垃圾收集器的具体实现做任何的规定，因此每家垃圾收集器的实现方式都不同，但比较常用的垃圾回收器是 OracleJDK 中自带的 HotSpot 虚拟机。HotSpot 中使用的垃圾收集器主要包括 7 个：Serial、ParNew、Parallel Scavenge、Serial Old、Parallel Old、CMS 和 G1（Garbage First）收集器。",-1),h=a("p",null,"其中 Serial 收集器属于最早期的垃圾收集器，也是 JDK 1.3 版本之前唯一的垃圾收集器。它是单线程运行的垃圾收集器，其单线程是指在进行垃圾回收时所有的工作线程必须暂停，直到垃圾回收结束为止，如下图所示：",-1),g=a("p",null,"Serial 收集器的特点是简单和高效，并且本身的运行对内存要求不高，因此它在客户端模式下使用的比较多。",-1),u=a("p",null,"ParNew 收集器实际上是 Serial 收集器的多线程并行版本，运行示意图如下图所示：",-1),m=o("",15),M=o("",5),P=o("",9);function G(b,q,A,T,J,k){const l=s("Image");return i(),n("div",null,[p,c,d,C,S,h,t(l,{alt:"01.png",src:"https://s0.lgstatic.com/i/image/M00/17/AE/CgqCHl7XWkeAU3MTAABRHyoLxbg882.png"}),e(),g,u,t(l,{alt:"02.png",src:"https://s0.lgstatic.com/i/image/M00/17/AE/CgqCHl7XWleAa2zYAABZIIXs59w872.png"}),e(),m,t(l,{alt:"image (2).png",src:"https://s0.lgstatic.com/i/image/M00/17/58/CgqCHl7XFo-AYbIbAABPIp2dreY362.png"}),e(),M,t(l,{alt:"image (3).png",src:"https://s0.lgstatic.com/i/image/M00/17/59/CgqCHl7XFp6AUeOUAABc9H0WHNw254.png"}),e(),P])}const D=r(_,[["render",G]]);export{v as __pageData,D as default};
