import{_ as o,j as e,o as t,h as c,k as l,f as a,s,Q as p}from"./chunks/framework.d3daa342.js";const O=JSON.parse('{"title":"15如何基于JVM分析内存使用对象？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/047_说透性能测试/(6166) 15  如何基于 JVM 分析内存使用对象？.md","filePath":"posts/devops/047_说透性能测试/(6166) 15  如何基于 JVM 分析内存使用对象？.md","lastUpdated":1696682708000}'),r={name:"posts/devops/047_说透性能测试/(6166) 15  如何基于 JVM 分析内存使用对象？.md"},E=s("h1",{id:"_15如何基于jvm分析内存使用对象",tabindex:"-1"},[a("15如何基于JVM分析内存使用对象？ "),s("a",{class:"header-anchor",href:"#_15如何基于jvm分析内存使用对象","aria-label":'Permalink to "15如何基于JVM分析内存使用对象？"'},"​")],-1),y=s("p",null,"上一讲我带你学习了基于 JVM 的线程分析，相信你已经可以通过热点线程分析出哪些方法在消耗 CPU，拿到这些方法之后你就可以和研发人员讨论后续的优化方案了。那这一讲我们就来重点学习 JVM 内存是如何管理的，有哪些手段可以分析内存对象，并帮助你定位内存的瓶颈。",-1),i=s("p",null,"提到分析 JVM 的内存对象，可能你会问我，之前讲过如何判断服务器内存瓶颈，那 JVM 内存和服务器内存有什么联系呢。我们先来看下这两者的关系，如下图所示：",-1),C=s("p",null,"图 1：内存关系示意图",-1),F=s("p",null,"其实二者的关系很简单，对于服务器系统而言，JVM 只是其中的一部分。当操作系统内存出现瓶颈时，我们便会重点排查哪些应用会占用内存。不过对于更深一步分析内存的使用，并不仅仅是统计使用、空闲等这些数值，我们需要进一步去了解内存结构，以及内存如何分配、如何回收，这样你才能更好地确定内存的问题。",-1),d=s("h3",{id:"jvm-内存分配",tabindex:"-1"},[a("JVM 内存分配 "),s("a",{class:"header-anchor",href:"#jvm-内存分配","aria-label":'Permalink to "JVM 内存分配"'},"​")],-1),h=s("p",null,"通过第 14 讲的学习你可以知道，Java 文件一般是先编译成 class 结尾的文件，然后通过类加载器到 JVM 内存中。接着我们来看看 JVM 内存结构图，这样能够对它有个全局的了解。",-1),m=p("",12),g=s("p",null,"图 3：GC 示意对比图",-1),_=s("p",null,"通过图 3 可以看到新生代和老年代的对比，Minor GC 发生在新生代，而 Full GC 发生在老年代。新生代分为三个区，一个 Eden 区和两个 Survivor 区。",-1),u=s("p",null,"先来看下 Eden 区的作用，大部分新生成的对象都是在 Eden 区，Eden 区满了之后便没有内存给新对象使用，Eden 区便会 Minor GC 回收无用内存，剩下的存活对象便会转移到 Survivor 区。",-1),v=s("p",null,"那两个 Survivor 区的作用分别是什么呢？两者其实是对称分布的，一个是 From 区，一个是 To 区。从 Eden 区存活下来的对象首先会被复制到 From 区，当 From 区满时，此时还存活的对象会被转移到 To 区，经历了多次的 Minor GC 后，还存活的对象就会被复制到老年代，老年代的 GC 一般叫作 FullGC 或者 MajorGC。",-1),A=s("p",null,"我们对比下新生代垃圾回收和老年代垃圾回收的区别，如下表所示：",-1),B=p("",35),j=s("p",null,"我们再配置相应的 jmx 连接，如下图所示：",-1),D=s("p",null,"如果出现如下图所示的界面，就证明连接成功了。",-1),b=s("p",null,"这样我们就能够概览 JVM 的 CPU 和内存的使用情况，如下图所示，通过点击抽样器，你可以分别获得对象在 CPU 和内存的占用。值得注意的是很多初学者把这部分 CPU 监控或者内存监控认为是服务器硬件级别的，这是不对的，这些都是基于 JVM 的监控。",-1),J=s("p",null,"按照内存占用进行排序是非常清晰的，你可以看到随着性能测试的进行，User 类字节占用比例越来越高，如下图所示：",-1),M=s("h3",{id:"总结",tabindex:"-1"},[a("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),k=s("p",null,"通过本讲的学习，你了解了 JVM 的内存结构，知道了 Java 内存对象经常活动的区域，同时列举了常见的排查手段诊断内存问题。",-1),S=s("p",null,"在本讲中有一个名词叫作 GC 频繁，那在你的实际工作当中，年轻代或者老年代一般多久回收一次算频繁呢？或者什么样的场景让你认为 GC 可能是有问题的呢？欢迎在评论区分享你的观点。",-1),G=s("p",null,"下一讲我将带你一起探讨一款阿里巴巴的监控工具------Arthas，到时见。",-1);function T(V,P,U,f,x,q){const n=e("Image");return t(),c("div",null,[E,y,i,l(n,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image6/M00/09/FA/Cgp9HWA2u5SAFtvHAABjYpky-g8347.png"}),a(),C,F,d,h,l(n,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M00/09/FA/Cgp9HWA2u6iAHNxJAACTuTJQcko749.png"}),a(),m,l(n,{alt:"4.png",src:"https://s0.lgstatic.com/i/image6/M00/09/F7/CioPOWA2vFqAaIvdAAChz7EIEu0014.png"}),a(),g,_,u,v,A,l(n,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M00/09/F7/CioPOWA2vG2AJj5oAACm26T__YI787.png"}),a(),B,l(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M00/07/73/Cgp9HWAze7uAY4i0AAIY8AO0bo0055.png"}),a(),j,l(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M00/07/70/CioPOWAze8GAEEsIAALCNqd4FCQ080.png"}),a(),D,l(n,{alt:"image (2).jpeg",src:"https://s0.lgstatic.com/i/image6/M00/09/FA/Cgp9HWA2vMaASqv3AAJ2rG-zf3U45.jpeg"}),a(),b,l(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image6/M00/07/70/CioPOWAze9CAShx_AAG7jwD3hwI714.png"}),a(),J,l(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M00/07/70/CioPOWAze9aAZifIAANlYUMJTPQ367.png"}),a(),M,k,S,G])}const H=o(r,[["render",T]]);export{O as __pageData,H as default};
