import{_ as o,j as e,o as t,g as c,k as l,s,h as a,Q as p}from"./chunks/framework.4e7d56ce.js";const $=JSON.parse('{"title":"什么是垃圾 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1856) 第02讲：GC 回收机制与分代回收策略.md","filePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1856) 第02讲：GC 回收机制与分代回收策略.md","lastUpdated":1696417798000}'),r={name:"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1856) 第02讲：GC 回收机制与分代回收策略.md"},E=p("",8),y=p("",48),i=s("ul",null,[s("li",null,[s("strong",null,"优点"),a("：实现简单，不需要将对象进行移动。")]),s("li",null,[s("strong",null,"缺点"),a("：这个算法需要中断进程内其他组件的执行（stop the world），并且可能产生内存碎片，提高了垃圾回收的频率。")])],-1),F=s("h4",{id:"复制算法-copying",tabindex:"-1"},[a("复制算法（Copying） "),s("a",{class:"header-anchor",href:"#复制算法-copying","aria-label":'Permalink to "复制算法（Copying）"'},"​")],-1),C=s("p",null,"将现有的内存空间分为两快，每次只使用其中一块，在垃圾回收时将正在使用的内存中的存活对象复制到未被使用的内存块中。之后，清除正在使用的内存块中的所有对象，交换两个内存的角色，完成垃圾回收。",-1),u=s("ol",null,[s("li",null,"复制算法之前，内存分为 A/B 两块，并且当前只使用内存 A，内存的状况如下图所示：")],-1),d=s("ol",{start:"2"},[s("li",null,"标记完之后，所有可达对象都被按次序复制到内存 B 中，并设置 B 为当前使用中的内存。内存状况如下图所示：")],-1),A=s("ul",null,[s("li",null,[s("strong",null,"优点"),a("：按顺序分配内存即可，实现简单、运行高效，不用考虑内存碎片。")]),s("li",null,[s("strong",null,"缺点"),a("：可用的内存大小缩小为原来的一半，对象存活率高时会频繁进行复制。")])],-1),g=s("h4",{id:"标记-压缩算法-mark-compact",tabindex:"-1"},[a("标记-压缩算法 (Mark-Compact) "),s("a",{class:"header-anchor",href:"#标记-压缩算法-mark-compact","aria-label":'Permalink to "标记-压缩算法 (Mark-Compact)"'},"​")],-1),m=s("p",null,"需要先从根节点开始对所有可达对象做一次标记，之后，它并不简单地清理未标记的对象，而是将所有的存活对象压缩到内存的一端。最后，清理边界外所有的空间。因此标记压缩也分两步完成：",-1),h=s("li",null,[s("strong",null,"Mark 标记阶段"),a("：找到内存中的所有 GC Root 对象，只要是和 GC Root 对象直接或者间接相连则标记为灰色（也就是存活对象），否则标记为黑色（也就是垃圾对象）。")],-1),b=s("strong",null,"Compact 压缩阶段",-1),B=p("",8),D=s("p",null,[a("当 "),s("strong",null,"Eden"),a(" 区第一次满的时候，会进行垃圾回收。首先将 "),s("strong",null,"Eden"),a(" 区的垃圾对象回收清除，并将存活的对象复制到 "),s("strong",null,"S0"),a(" ，此时 "),s("strong",null,"S1"),a(" 是空的。如图所示：")],-1),M=s("p",null,[a("下一次 "),s("strong",null,"Eden"),a(" 区满时，再执行一次垃圾回收。此次会将 "),s("strong",null,"Eden"),a(" 和 "),s("strong",null,"S0"),a(" 区中所有垃圾对象清除，并将存活对象复制到 "),s("strong",null,"S1"),a(" ，此时 "),s("strong",null,"S0"),a("变为空。如图所示：")],-1),_=s("p",null,[a("如此反复在 "),s("strong",null,"S0"),a(" 和 "),s("strong",null,"S1"),a("之间切换几次（默认 15 次）之后，如果还有存活对象。说明这些对象的生命周期较长，则将它们转移到老年代中。如图所示：")],-1),v=p("",10),q=p("",5),G=p("",8),f=s("p",null,"平时项目中，尤其是Android项目，因为有大量的图像(Bitmap)对象，使用软引用的场景较多。所以重点看下软引用SoftReference的使用，不当的使用软引用有时也会导致系统异常。",-1),S=s("h4",{id:"软引用常规使用",tabindex:"-1"},[a("软引用常规使用 "),s("a",{class:"header-anchor",href:"#软引用常规使用","aria-label":'Permalink to "软引用常规使用"'},"​")],-1),R=s("p",null,"常规使用代码如下：",-1),k=s("p",null,"执行上述代码，打印日志如下：",-1),x=s("p",null,"首先通过-Xmx将堆最大内存设置为200M。从日志中可以看出，当第一次GC时，内存中还有剩余可用内存，所以软引用并不会被GC回收。但是当我们再次创建一个120M的强引用时，JVM可用内存已经不够，所以会尝试将软引用给回收掉。",-1),K=s("h4",{id:"软引用隐藏问题",tabindex:"-1"},[a("软引用隐藏问题 "),s("a",{class:"header-anchor",href:"#软引用隐藏问题","aria-label":'Permalink to "软引用隐藏问题"'},"​")],-1),V=s("p",null,"需要注意的是，被软引用对象关联的对象会自动被垃圾回收器回收，但是软引用对象本身也是一个对象，这些创建的软引用并不会自动被垃圾回收器回收掉。比如如下代码：",-1),T=s("p",null,"上述代码，虽然每一个SoftObject都被一个软引用所引用，在内存紧张时，GC会将SoftObject所占用的1KB回收。但是每一个SoftReference又都被Set所引用(强引用)。执行上述代码结果如下：",-1),P=s("p",null,'限制堆内存大小为4M，最终程序崩溃，但是异常的原因并不是普通的堆内存溢出，而是"GC overhead"。之所以会抛出这个错误，是由于虚拟机一直在不断回收软引用，回收进行的速度过快，占用的cpu过大(超过98%)，并且每次回收掉的内存过小(小于2%)，导致最终抛出了这个错误。',-1),w=s("p",null,"这里需要做优化，合适的处理方式是注册一个引用队列，每次循环之后将引用队列中出现的软引用对象从cache中移除。如下所示：",-1),J=s("p",null,"再次运行修改后的代码，结果如下：",-1),j=s("p",null,"可以看出优化后，程序可以正常执行完。并且在执行过程中会动态的将集合中的软引用删除。",-1),X=s("p",null,[a("更多详细 SoftReference 的介绍，可以参考 、"),s("a",{href:"https://mp.weixin.qq.com/s/XRCq3IDdGJt3Nq9Mu23U5g",target:"_blank",rel:"noreferrer"},"Java虚拟机究竟是如何处理SoftReference的"),a(" 。")],-1),I=s("h3",{id:"总结",tabindex:"-1"},[a("总结： "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结："'},"​")],-1),O=s("p",null,"本课时着重讲解了 JVM 中有关垃圾回收的相关知识点，其中重点介绍了使用可达性分析来判断对象是否可以被回收，以及 3 种垃圾回收算法。最后通过分析 GC Log 验证了 Java 虚拟机中内存分配及分代策略的一些细节。",-1),Y=s("p",null,"虚拟机垃圾回收机制很多时候都是影响系统性能、并发能力的主要因素之一。尤其是对于从事 Android 开发的工程师来说，有时候垃圾回收会很大程度上影响 UI 线程，并造成界面卡顿现象。因此理解垃圾回收机制并学会分析 GC Log 也是一项必不可少的技能。后续我会在 DVM 课时中，详细介绍 Android 虚拟机中对垃圾回收所做的优化。",-1);function L(N,z,H,U,Q,W){const n=e("Image");return t(),c("div",null,[E,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7C/9B/Cgq2xl58leGAIoKxAAEZWYE_v08477.png"}),y,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/81/Ciqah158kR-AFqC0AACRJFj-tqc381.png"}),i,F,C,u,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7C/97/Cgq2xl58kR-AfKs5AABx53v9UCk063.png"}),d,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/81/Ciqah158kR-AQa1cAABq_Yx6zyw527.png"}),A,g,m,s("ol",null,[h,s("li",null,[b,a(" ：将剩余存活对象按顺序压缩到内存的某一端。"),l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7C/97/Cgq2xl58kR-AQb0SAAAl99yZMSc183.png"})])]),B,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/81/Ciqah158kSCACECoAABYMXWFYtY758.png"}),D,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7C/97/Cgq2xl58kSGACeimAABTArM3xYk676.png"}),M,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/81/Ciqah158kSGAXW6uAABTZbbBBQU172.png"}),_,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7C/97/Cgq2xl58kSGAIFsJAABiXFUZ3JU251.png"}),v,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7C/9B/Cgq2xl58lmeAAsp5AABwifdCuEw841.png"}),q,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/85/Ciqah158lqGAOkbpAAAvHYLJUt0639.png"}),G,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/85/Ciqah158ltqAHyEHAACoLz2II_g092.png"}),f,S,R,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/05/F7/Ciqah16B6smATzkwAAL0Suw9ZmQ406.png"}),k,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7C/97/Cgq2xl58kSGAFUHRAACFBaOn7hI672.png"}),x,K,V,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/81/Ciqah158kSKACYQrAAHi5SOybBQ812.png"}),T,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7C/97/Cgq2xl58kSKANSWJAADApye5msQ014.png"}),P,w,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/81/Ciqah158kSOAcJtVAAMtvCkCXt0643.png"}),J,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7C/97/Cgq2xl58kSOAMcDMAADVGDMKO7w664.png"}),j,X,I,O,Y])}const ss=o(r,[["render",L]]);export{$ as __pageData,ss as default};
