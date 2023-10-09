import{_ as n,j as o,o as p,h as i,k as s,f as a,s as e,Q as r}from"./chunks/framework.d3daa342.js";const x=JSON.parse('{"title":"25内存管理单元：什么情况下使用大内存分页？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/重学操作系统_文档/(4634) 25  内存管理单元： 什么情况下使用大内存分页？.md","filePath":"posts/backEnd/重学操作系统_文档/(4634) 25  内存管理单元： 什么情况下使用大内存分页？.md","lastUpdated":1696682708000}'),l={name:"posts/backEnd/重学操作系统_文档/(4634) 25  内存管理单元： 什么情况下使用大内存分页？.md"},c=e("h1",{id:"_25内存管理单元-什么情况下使用大内存分页",tabindex:"-1"},[a("25内存管理单元：什么情况下使用大内存分页？ "),e("a",{class:"header-anchor",href:"#_25内存管理单元-什么情况下使用大内存分页","aria-label":'Permalink to "25内存管理单元：什么情况下使用大内存分页？"'},"​")],-1),_=e("p",null,[a("今天我们的学习目标是：了解如何通过内存，提升你的程序性能。"),e("strong",null,"这一讲我带来了一道和内存优化相关的面试题：什么情况下使用大内存分页"),a("？")],-1),g=e("p",null,"这道题目属于一个实用技巧，可以作为你积累高并发处理技能的一个小小的组成部分。要理解和解决这个问题，我们还需要在上一讲的基础上，继续挖掘虚拟内存和内存管理单元更底层的工作原理，以及了解转置检测缓冲区（TLB）的作用。",-1),d=e("p",null,"那么接下来就请你带着这个优化问题，和我一起开始学习今天的内容。",-1),h=e("h3",{id:"内存管理单元",tabindex:"-1"},[a("内存管理单元 "),e("a",{class:"header-anchor",href:"#内存管理单元","aria-label":'Permalink to "内存管理单元"'},"​")],-1),m=e("p",null,"上一讲我们学习了虚拟地址到物理地址的转换过程。如下图所示：",-1),u=e("p",null,"你可以把虚拟地址看成由页号和偏移量组成，把物理地址看成由 Frame Number 和偏移量组成。在 CPU 中有一个完成虚拟地址到物理地址转换的小型设备，叫作内存管理单元（Memory Management Unit(MMU）。",-1),L=e("p",null,"在程序执行的时候，指令中的地址都是虚拟地址，虚拟地址会通过 MMU，MMU 会查询页表，计算出对应的 Frame Number，然后偏移量不变，组装成真实地址。然后 MMU 通过地址总线直接去访问内存。所以 MMU 承担了虚拟地址到物理地址的转换以及 CPU 对内存的操作这两件事情。",-1),M=e("p",null,"如下图所示，从结构上 MMU 在 CPU 内部，并且直接和地址总线连接。因此 MMU 承担了 CPU 和内存之间的代理。对操作系统而言，MMU 是一类设备，有多种型号，就好比显卡有很多型号一样。操作系统需要理解这些型号，会使用 MMU。",-1),b=e("h3",{id:"tlb-和-mmu-的性能问题",tabindex:"-1"},[a("TLB 和 MMU 的性能问题 "),e("a",{class:"header-anchor",href:"#tlb-和-mmu-的性能问题","aria-label":'Permalink to "TLB 和 MMU 的性能问题"'},"​")],-1),T=e("p",null,"上面的过程，会产生一个问题：指令的执行速度非常快，而 MMU 还需要从内存中查询页表。最快的内存查询页需要从 CPU 的缓存中读取，假设缓存有 95% 的命中率，比如读取到 L2 缓存，那么每次操作也需要几个 CPU 周期。你可以回顾一下 CPU 的指令周期，如下图所示，有 fetch/decode/execute 和 store。",-1),B=r("",34),P=e("p",null,"从上图中你可以看到我总共有 2048 个大内存页，每个大小是 2048KB。具体这个大小是不可以调整的，这个和机器用的 MMU 相关。",-1),U=e("p",null,[a("打开大内存分页后如果有应用需要使用，就会去申请大内存分页。比如 Java 应用可以用"),e("code",null,"-XX:+UseLargePages"),a("开启使用大内存分页。 下图是我通过一个 Java 程序加上 UseLargePages 参数的结果。")],-1),C=r("",7);function A(N,v,f,k,F,q){const t=o("Image");return p(),i("div",null,[c,_,g,d,h,m,s(t,{alt:"Lark20201204-183520.png",src:"https://s0.lgstatic.com/i/image/M00/78/84/Ciqc1F_KEYiAGIk6AABN2sQtqqo988.png"}),a(),u,L,M,s(t,{alt:"Lark20201204-183533.png",src:"https://s0.lgstatic.com/i/image/M00/78/90/CgqCHl_KEZGAB4tfAAA_7O1Ajlg766.png"}),a(),b,T,s(t,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/78/7D/Ciqc1F_KDJ2AakpwAABJqXjoKBc358.png"}),a(),B,s(t,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/78/89/CgqCHl_KDLaAK0LFAAJ42-0NGSQ136.png"}),a(),P,U,s(t,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/78/7E/Ciqc1F_KDLyAboRvAAJ45v4qI3g629.png"}),a(),C])}const E=n(l,[["render",A]]);export{x as __pageData,E as default};
