import{_ as i,j as s,o as l,g as _,k as a,Q as e,s as t,h as o}from"./chunks/framework.4e7d56ce.js";const N=JSON.parse('{"title":"计算密集型和 I/O 密集型 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/重学操作系统_文档/(4631) 23  分析服务的特性：我的服务应该开多少个进程、多少个线程？.md","filePath":"posts/backEnd/重学操作系统_文档/(4631) 23  分析服务的特性：我的服务应该开多少个进程、多少个线程？.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/重学操作系统_文档/(4631) 23  分析服务的特性：我的服务应该开多少个进程、多少个线程？.md"},n=e("",8),c=t("p",null,[o("很多情况下我们没法使用 DMA，比如说你想把一个数组拷贝到另一个数组内，执行的 memcpy 函数内部实现就是一个个 byte 拷贝，这种情况也是一种"),t("strong",null,"CPU 密集的操作"),o("。")],-1),d=t("p",null,"可见，区分是计算密集型还是 I/O 密集型这件事比较复杂。按说查询数据库是一件 I/O 密集型的事情，但是如果存储设备足够好，比如用了最好的固态硬盘阵列，I/O 速度很快，反而瓶颈会在计算上（对缓存的搜索耗时成为主要部分）。因此，需要一些可衡量指标，来帮助我们确认应用的特性。",-1),P=t("h3",{id:"衡量-cpu-的工作情况的指标",tabindex:"-1"},[o("衡量 CPU 的工作情况的指标 "),t("a",{class:"header-anchor",href:"#衡量-cpu-的工作情况的指标","aria-label":'Permalink to "衡量 CPU 的工作情况的指标"'},"​")],-1),C=t("p",null,"我们先来看一下 CPU 关联的指标。如下图所示：CPU 有 2 种状态，忙碌和空闲。此外，CPU 的时间还有一种被偷走的情况。",-1),g=e("",6),h=e("",3),U=e("",8),I=e("",7),u=t("p",null,"上图中是磁盘当前的读写速度以及排行较靠前的进程情况。",-1),A=t("p",null,[o("另外，如果磁盘空间不足，可以用"),t("code",null,"df"),o("指令：")],-1),m=e("",24);function O(T,f,b,S,q,k){const p=s("Image");return l(),_("div",null,[n,a(p,{alt:"5.png",src:"https://s0.lgstatic.com/i/image/M00/71/6A/Ciqc1F--MyKAQSfQAABs29xFyFQ392.png"}),c,d,P,C,a(p,{alt:"7.png",src:"https://s0.lgstatic.com/i/image/M00/71/6A/Ciqc1F--MyyAGUJkAACsJU_MgVg506.png"}),g,a(p,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/71/76/CgqCHl--MzuAVvG-AAMVu_JwSyA231.png"}),h,a(p,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/71/6A/Ciqc1F--M0uAGZ1pAAmKNbPhB9A282.png"}),U,a(p,{alt:"4.png",src:"https://s0.lgstatic.com/i/image/M00/71/76/CgqCHl--M1aALjSiAALKG4QzX18230.png"}),I,a(p,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/71/76/CgqCHl--M2OAJezyAAkRwbdJVmk356.png"}),u,A,a(p,{alt:"6.png",src:"https://s0.lgstatic.com/i/image/M00/71/76/CgqCHl--M22AY0VPAAaPk8du-CY254.png"}),m])}const V=i(r,[["render",O]]);export{N as __pageData,V as default};
