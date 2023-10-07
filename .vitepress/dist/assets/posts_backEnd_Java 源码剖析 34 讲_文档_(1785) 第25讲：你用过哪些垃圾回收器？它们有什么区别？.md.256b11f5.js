import{_ as r,j as s,o as i,g as n,k as t,h as e,s as a,Q as o}from"./chunks/framework.4e7d56ce.js";const v=JSON.parse('{"title":"第25讲：你用过哪些垃圾回收器？它们有什么区别？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Java 源码剖析 34 讲_文档/(1785) 第25讲：你用过哪些垃圾回收器？它们有什么区别？.md","filePath":"posts/backEnd/Java 源码剖析 34 讲_文档/(1785) 第25讲：你用过哪些垃圾回收器？它们有什么区别？.md","lastUpdated":1696417798000}'),_={name:"posts/backEnd/Java 源码剖析 34 讲_文档/(1785) 第25讲：你用过哪些垃圾回收器？它们有什么区别？.md"},p=a("h1",{id:"第25讲-你用过哪些垃圾回收器-它们有什么区别",tabindex:"-1"},[e("第25讲：你用过哪些垃圾回收器？它们有什么区别？ "),a("a",{class:"header-anchor",href:"#第25讲-你用过哪些垃圾回收器-它们有什么区别","aria-label":'Permalink to "第25讲：你用过哪些垃圾回收器？它们有什么区别？"'},"​")],-1),c=a("p",null,"上一课时我们讲了垃圾回收的理论知识，而本课时将介绍这些理论知识的具体实践。垃圾回收器也叫垃圾收集器，不同的厂商对垃圾收集器的实现也是不同的，这里主要介绍目前使用最广泛的 OracleJDK 中自带的 HotSpot 虚拟机中的几个垃圾收集器。",-1),d=a("p",null,"我们本课时的面试题是，你用过哪些垃圾回收器？它们有什么区别？",-1),C=a("h3",{id:"典型回答",tabindex:"-1"},[e("典型回答 "),a("a",{class:"header-anchor",href:"#典型回答","aria-label":'Permalink to "典型回答"'},"​")],-1),S=a("p",null,"《Java 虚拟机规范》并没有对垃圾收集器的具体实现做任何的规定，因此每家垃圾收集器的实现方式都不同，但比较常用的垃圾回收器是 OracleJDK 中自带的 HotSpot 虚拟机。HotSpot 中使用的垃圾收集器主要包括 7 个：Serial、ParNew、Parallel Scavenge、Serial Old、Parallel Old、CMS 和 G1（Garbage First）收集器。",-1),h=a("p",null,"其中 Serial 收集器属于最早期的垃圾收集器，也是 JDK 1.3 版本之前唯一的垃圾收集器。它是单线程运行的垃圾收集器，其单线程是指在进行垃圾回收时所有的工作线程必须暂停，直到垃圾回收结束为止，如下图所示：",-1),g=a("p",null,"Serial 收集器的特点是简单和高效，并且本身的运行对内存要求不高，因此它在客户端模式下使用的比较多。",-1),u=a("p",null,"ParNew 收集器实际上是 Serial 收集器的多线程并行版本，运行示意图如下图所示：",-1),m=o('<p>Parallel Scavenge 收集器和 ParNew 收集器类似，它也是一个并行运行的垃圾回收器；不同的是，该收集器关注的侧重点是实现一个可以控制的吞吐量。而这个吞吐量计算的也很奇怪，它的计算公式是：用户运行代码的时间 / （用户运行代码的时间 + 垃圾回收执行的时间）。比如用户运行的时间是 8 分钟，垃圾回收运行的时间是 2 分钟，那么吞吐量就是 80%。Parallel Scavenge 收集器追求的目标就是将这个吞吐量的值，控制在一定的范围内。</p><p>Parallel Scavenge 收集器有两个重要的参数：</p><ul><li><p><strong>-XX:MaxGCPauseMillis 参数</strong>：它是用来控制垃圾回收的最大停顿时间；</p></li><li><p><strong>-XX:GCTimeRatio 参数</strong>：它是用来直接设置吞吐量的值的。</p></li></ul><p>Serial Old 收集器为 Serial 收集器的老年代版本，而 Parallel Old 收集器是 Parallel Scavenge 收集器的老年代版本。</p><p>CMS（Concurrent Mark Sweep）收集器与以吞吐量为目标的 Parallel Scavenge 收集器不同，它强调的是提供最短的停顿时间，因此可能会牺牲一定的吞吐量。它主要应用在 Java Web 项目中，它满足了系统需要短时间停顿的要求，以此来提高用户的交互体验。</p><p>Garbage First（简称 G1）收集器是历史发展的产物，也是一款更先进的垃圾收集器，主要面向服务端应用的垃圾收集器。它将内存划分为多个 Region 分区，回收时则以分区为单位进行回收，这样它就可以用相对较少的时间优先回收包含垃圾最多区块。从 JDK 9 之后也成了官方默认的垃圾收集器，官方也推荐使用 G1 来代替选择 CMS 收集器。</p><h3 id="考点分析" tabindex="-1">考点分析 <a class="header-anchor" href="#考点分析" aria-label="Permalink to &quot;考点分析&quot;">​</a></h3><p>JVM 内存布局和垃圾回收算法是面试中常考的题目，也是我们理解并优化 Java 程序的理论基础，而对于垃圾收集器来说除了目前主流版本（JDK 8）常用的 CMS 之外，其他的垃圾收集器都属于面试中的加分项。对于 G1 和 JDK 11 中的 ZGC 的理解代表了你对技术的热爱和新技术的敏感程度，也属于面试中的重要加分项。</p><p>和此知识点相关的面试题还有以下这些：</p><ul><li><p>讲一下分代收集理论？</p></li><li><p>CMS 收集器的具体执行流程是什么？</p></li><li><p>讲一下 JDK 11 中的 ZGC 收集器？</p></li></ul><h3 id="知识扩展" tabindex="-1">知识扩展 <a class="header-anchor" href="#知识扩展" aria-label="Permalink to &quot;知识扩展&quot;">​</a></h3><h4 id="_1-分代收集" tabindex="-1">1. 分代收集 <a class="header-anchor" href="#_1-分代收集" aria-label="Permalink to &quot;1. 分代收集&quot;">​</a></h4><p>说到垃圾收集器不得不提的一个理论就是&quot;分代收集&quot;，因为目前商用虚拟机的垃圾收集器都是基于分代收集的理论进行设计的，它是指将不同&quot;年龄&quot;的数据分配到不同的内存区域中进行存储，所谓的&quot;年龄&quot;指的是经历过垃圾收集的次数。这样我们就可以把那些朝生暮死的对象集中分配到一起，把不容易消亡的对象分配到一起，对于不容易死亡的对象我们就可以设置较短的垃圾收集频率，这样就能消耗更少的资源来实现更理想的功能了。</p><p>通常情况下分代收集算法会分为两个区域：新生代（Young Generation）和老年代（OldGeneration），其中新生代用于存储刚刚创建的对象，这个区域内的对象存活率不高，而对于经过了一定次数的 GC 之后还存活下来的对象，就可以成功晋级到老生代了。</p><p>对于上面介绍的 7 个垃圾收集器来说，新生代垃圾收集器有：Serial、ParNew、Parallel Scavenge，老生代的垃圾收集器有：Serial Old、Parallel Old、CMS，而 G1 属于混合型的垃圾收集器，如下图所示：</p>',15),M=o('<h4 id="_2-cms-收集器的具体执行流程" tabindex="-1">2. CMS 收集器的具体执行流程 <a class="header-anchor" href="#_2-cms-收集器的具体执行流程" aria-label="Permalink to &quot;2. CMS 收集器的具体执行流程&quot;">​</a></h4><p>CMS 收集器是基于标记-清除算法实现的，我们之前有讲过关于标记-清除的算法，这里简单地回顾一下。标记-清除的算法是由标记阶段和清除阶段构成的，标记阶段会给所有的存活对象做上标记；而清除阶段会把被标记为死亡的对象进行回收，而死亡对象的判断是通过引用计数法或者是目前主流的可达性分析算法实现的。但是 CMS 的实现稍微复杂一些，它的整个过程可以分为四个阶段：</p><ul><li><p>初始标记（CMS initial mark）</p></li><li><p>并发标记（CMS concurrent mark）</p></li><li><p>重新标记（CMS remark）</p></li><li><p>并发清除（CMS concurrent sweep）</p></li></ul><p>首先，<strong>初始标记阶段</strong> 的执行时间很短，它只是标记一下 GC Roots 的关联对象；<strong>并发阶段</strong> 是从 GC Roots 关联的对象进行遍历判断并标识死亡对象，这个过程比较慢，但不需要停止用户线程，用户的线程可以和垃圾收集线程并发执行；而<strong>重新标记阶段</strong> 则是为了判断并标记，刚刚并发阶段用户继续运行的那一部分对象，所以此阶段的执行时间也比较短；最后是<strong>并发清除阶段</strong>，也就是清除上面标记的死亡对象，由于 CMS 使用的是标记-清除算法，而非标记-整理算法，因此无须移动存活的对象，这个阶段垃圾收集线程也可以和用户线程并发执行。</p><p>CMS 的整个执行过程中只有执行时间很短的初始标记和重新标记需要 Stop The World（全局停顿）的，执行过程如下图所示：</p>',5),P=o('<p>因为 CMS 是一款基于标记清除算法实现的垃圾收集器，因此会在收集时产生大量的空间碎片，为了解决这个问题，CMS 收集器提供了一个 -XX:+UseCMS-CompactAtFullCollection 的参数（默认是开启的，此参数从 JDK9 开始废弃），用于在 CMS 收集器进行 Full GC 时开启内存碎片的合并和整理。</p><p>但又因为碎片整理的过程必须移动存活的对象，所以它和用户线程是无法并发执行的，为了解决这个问题 CMS 收集器又提供了另外一个参数 -XX:CMSFullGCsBefore-Compaction，用于规定多少次（根据此参数的值决定）之后再进行一次碎片整理。</p><h4 id="_3-zgc" tabindex="-1">3. ZGC <a class="header-anchor" href="#_3-zgc" aria-label="Permalink to &quot;3. ZGC&quot;">​</a></h4><p>ZGC 收集器是 JDK 11 中新增的垃圾收集器，它是由 Oracle 官方开发的，并且支持 TB 级别的堆内存管理，而且 ZGC 收集器也非常高效，可以做到 10ms 以内完成垃圾收集。</p><p>在 ZGC 收集器中没有新生代和老生代的概念，它只有一代。ZGC 收集器采用的着色指针技术，利用指针中多余的信息位来实现着色标记，并且 ZGC 使用了读屏障来解决 GC 线程和应用线程可能存在的并发（修改对象状态的）问题，从而避免了Stop The World（全局停顿），因此使得 GC 的性能大幅提升。</p><p>ZGC 的执行流程和 CMS 比较相似，首先是进行 GC Roots 标记，然后再通过指针进行并发着色标记，之后便是对标记为死亡的对象进行回收（被标记为橘色的对象），最后是重定位，将 GC 之后存活的对象进行移动，以解决内存碎片的问题。</p><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3><p>本课时我们介绍了 JDK 11 之前的 7 种垃圾收集器：Serial、Serial Old、ParNew、Parallel Scavenge、Parallel Old、CMS、G1，其中 CMS 收集器是 JDK 8 之前的主流收集器，而 JDK 9 之后的默认收集器为 G1，并且在文章的最后，介绍了性能更加强悍、综合表现更好的 ZGC 收集器，希望本课时的内容可以切实的帮助到你。</p><p>OK，这节课就讲到这里啦，下一课时我将分享&quot;生产环境如何排查和优化 JVM？&quot;，记得按时来听课哈。</p>',9);function G(b,q,A,T,J,k){const l=s("Image");return i(),n("div",null,[p,c,d,C,S,h,t(l,{alt:"01.png",src:"https://s0.lgstatic.com/i/image/M00/17/AE/CgqCHl7XWkeAU3MTAABRHyoLxbg882.png"}),e(),g,u,t(l,{alt:"02.png",src:"https://s0.lgstatic.com/i/image/M00/17/AE/CgqCHl7XWleAa2zYAABZIIXs59w872.png"}),e(),m,t(l,{alt:"image (2).png",src:"https://s0.lgstatic.com/i/image/M00/17/58/CgqCHl7XFo-AYbIbAABPIp2dreY362.png"}),e(),M,t(l,{alt:"image (3).png",src:"https://s0.lgstatic.com/i/image/M00/17/59/CgqCHl7XFp6AUeOUAABc9H0WHNw254.png"}),e(),P])}const D=r(_,[["render",G]]);export{v as __pageData,D as default};
