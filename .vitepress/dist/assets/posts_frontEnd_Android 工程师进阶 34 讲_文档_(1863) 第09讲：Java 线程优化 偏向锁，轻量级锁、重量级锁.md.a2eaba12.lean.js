import{_ as s,j as r,o as i,g as c,k as a,s as t,Q as n,h as e}from"./chunks/framework.e0c66c3f.js";const Q=JSON.parse('{"title":"synchronized 实现原理 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1863) 第09讲：Java 线程优化 偏向锁，轻量级锁、重量级锁.md","filePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1863) 第09讲：Java 线程优化 偏向锁，轻量级锁、重量级锁.md","lastUpdated":1696338709000}'),l={name:"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1863) 第09讲：Java 线程优化 偏向锁，轻量级锁、重量级锁.md"},_=t("p",null,"我目前所在的公司是一家跨国企业，总部在瑞典。前段时间公司新开发的一个应用准备发布到应用宝平台。但是在发布之前，需要准备一系列软著相关的证明材料。而这些所有的证明材料只有总部才有资格去办理。因此上海的同事只能以邮件方式告知总部，后续所有的工作重心就全部转移到瑞典，我们只能等待总部的处理结果。",-1),p=t("p",null,'经过这么一通跨国操作之后，本来上海分部内部处理很容易很迅速的事情，也变得遥遥无期，困难重重。且不说这中间 10 多个小时的时差，还相当于无缘无故给瑞典的同事增加"额外工作"。在一个敏捷至上的团队中，这种"额外工作"很容易就被安排到后续的档期中。',-1),h=t("p",null,"每当想起这件事，我总是能联想到 Java 中的线程。Java 的线程是映射到操作系统原生线程之上的，如果要阻塞或唤醒一个线程就需要操作系统的帮忙，这就要从用户态转换到核心态，就相当于工作从上海分部转换到瑞典总部的操作一样，因此状态转换需要花费很多的处理器时间。",-1),d=t("p",null,"比如如下代码：",-1),g=n("",6),m=t("p",null,"其中 _mark 和 _metadata 一起组成了对象头。_metadata 主要保存了类元数据，不需要做过多介绍。这里重点看下 _mark 属性，_mark 是 markOop 类型数据，一般称它为标记字段（Mark Word），其中主要存储了对象的 hashCode、分代年龄、锁标志位，是否偏向锁等。",-1),u=t("p",null,"用一张图来表示 32 位 Java 虚拟机的 Mark Word 的默认存储结构如下：",-1),A=t("p",null,"默认情况下，没有线程进行加锁操作，所以锁对象中的 Mark Word 处于无锁状态。但是考虑到 JVM 的空间效率，Mark Word 被设计成为一个非固定的数据结构，以便存储更多的有效数据，它会根据对象本身的状态复用自己的存储空间，如 32 位 JVM 下，除了上述列出的 Mark Word 默认存储结构外，还有如下可能变化的结构：",-1),k=t("p",null,'从图中可以看出，根据"锁标志位"以及"是否为偏向锁"，Java 中的锁可以分为以下几种状态：',-1),M=t("p",null,'在 Java 6 之前，并没有轻量级锁和偏向锁，只有重量级锁，也就是通常所说 synchronized 的对象锁，锁标志位为 10。从图中的描述可以看出：当锁是重量级锁时，对象头中 Mark Word 会用 30 bit 来指向一个"互斥量"，而这个互斥量就是 Monitor。',-1),q=t("h4",{id:"monitor",tabindex:"-1"},[e("Monitor "),t("a",{class:"header-anchor",href:"#monitor","aria-label":'Permalink to "Monitor"'},"​")],-1),C=t("p",null,"Monitor 可以把它理解为一个同步工具，也可以描述为一种同步机制。实际上，它是一个保存在对象头中的一个对象。在 markOop 中有如下代码：",-1),b=t("p",null,"通过 monitor() 方法创建一个 ObjectMonitor 对象，而 ObjectMonitor 就是 Java 虚拟机中的 Monitor 的具体实现。因此 Java 中每个对象都会有一个对应的 ObjectMonitor 对象，这也是 Java 中所有的 Object 都可以作为锁对象的原因。",-1),v=t("p",null,"那 ObjectMonitor 是如何实现同步机制的呢？",-1),J=t("p",null,"首先看下 ObjectMonitor 的结构：",-1),f=t("p",null,"其中有几个比较关键的属性：",-1),x=t("p",null,"当多个线程同时访问一段同步代码时，首先会进入 _EntryList 队列中，当某个线程通过竞争获取到对象的 monitor 后，monitor 会把 _owner 变量设置为当前线程，同时 monitor 中的计数器 _count 加 1，即获得对象锁。",-1),P=t("p",null,"若持有 monitor 的线程调用 wait() 方法，将释放当前持有的 monitor，_owner 变量恢复为 null， _count 自减 1，同时该线程进入 _WaitSet 集合中等待被唤醒。若当前线程执行完毕也将释放 monitor（锁）并复位变量的值，以便其他线程进入获取 monitor（锁）。",-1),y=t("h4",{id:"实例演示",tabindex:"-1"},[e("实例演示 "),t("a",{class:"header-anchor",href:"#实例演示","aria-label":'Permalink to "实例演示"'},"​")],-1),B=t("p",null,"比如以下代码通过 3 个线程分别执行以下同步代码块：",-1),T=t("p",null,"锁对象是 lock 对象，在 JVM 中会有一个 ObjectMonitor 对象与之对应。如下图所示：",-1),V=t("p",null,"分别使用 3 个线程来执行以上同步代码块。默认情况下，3 个线程都会先进入 ObjectMonitor 中的 EntrySet 队列中，如下所示：",-1),O=t("p",null,"假设线程 2 首先通过竞争获取到了锁对象，则 ObjectMonitor 中的 Owner 指向线程 2，并将 count 加 1。结果如下：",-1),S=t("p",null,"上图中 Owner 指向线程 2 表示它已经成功获取到锁（Monitor）对象，其他线程只能处于阻塞（blocking）状态。如果线程 2 在执行过程中调用 wait() 操作，则线程 2 会释放锁（Monitor）对象，以便其他线程进入获取锁（Monitor）对象，Owner 变量恢复为 null，count 做减 1 操作，同时线程 2 会添加到 WaitSet 集合，进入等待（waiting）状态并等待被唤醒。结果如下：",-1),E=t("p",null,"然后线程 1 和线程 3 再次通过竞争获取到锁（Monitor）对象，则重新将 Owner 指向成功获取到锁的线程。假设线程 1 获取到锁，如下：",-1),W=t("p",null,"如果在线程 1 执行过程中调用 notify 操作将线程 2 唤醒，则当前处于 WaitSet 中的线程 2 会被重新添加到 EntrySet 集合中，并尝试重新获取竞争锁（Monitor）对象。但是 notify 操作并不会是使程 1 释放锁（Monitor）对象。结果如下：",-1),z=n("",12),j=t("p",null,"然后 Java 虚拟机会尝试使用 CAS（Compare And Swap）操作，将锁对象的 Mark Word 拷贝到这块空间中，并且将锁记录中的 owner 指向 Mark Word。结果如下：",-1),w=n("",9);function I(D,N,F,L,U,R){const o=r("Image");return i(),c("div",null,[_,p,h,d,a(o,{alt:"1.png",src:"https://s0.lgstatic.com/i/image3/M01/8B/CD/Cgq2xl6ekDSAPp5xAABUzEZWxpw390.png"}),g,a(o,{alt:"2.png",src:"https://s0.lgstatic.com/i/image3/M01/05/88/CgoCgV6ekFmAT_MRAAF5oEVoyMU852.png"}),m,u,a(o,{alt:"3.png",src:"https://s0.lgstatic.com/i/image3/M01/05/89/CgoCgV6ekH2APD6oAADF-S0ti4g112.png"}),A,a(o,{alt:"4.png",src:"https://s0.lgstatic.com/i/image3/M01/12/B8/Ciqah16ekKGAFBIfAAFvVAWQ_js924.png"}),k,a(o,{alt:"5.png",src:"https://s0.lgstatic.com/i/image3/M01/12/B8/Ciqah16ekLmANGZfAABKhV79kOU625.png"}),M,q,C,a(o,{alt:"6.png",src:"https://s0.lgstatic.com/i/image3/M01/05/89/CgoCgV6ekM2AL8knAACkN10EBo8887.png"}),b,v,J,a(o,{alt:"7.png",src:"https://s0.lgstatic.com/i/image3/M01/8B/CE/Cgq2xl6ekOGAQJO7AAFPRBhLNTQ519.png"}),f,a(o,{alt:"8.png",src:"https://s0.lgstatic.com/i/image3/M01/8B/CE/Cgq2xl6ekPOAF03ZAACOUNhQATA372.png"}),x,P,y,B,a(o,{alt:"9.png",src:"https://s0.lgstatic.com/i/image3/M01/8B/CE/Cgq2xl6ekRGAK9fRAABP5lXAo2s895.png"}),T,a(o,{alt:"10.png",src:"https://s0.lgstatic.com/i/image3/M01/8B/CE/Cgq2xl6ekSKAZJPCAAPzbJfy9JI528.png"}),V,a(o,{alt:"11.png",src:"https://s0.lgstatic.com/i/image3/M01/12/B8/Ciqah16ekTCAFQHhAAYxffknpfQ912.png"}),O,a(o,{alt:"12.png",src:"https://s0.lgstatic.com/i/image3/M01/8B/CE/Cgq2xl6ekT6AGVz9AAX2toLtUi4255.png"}),S,a(o,{alt:"13.png",src:"https://s0.lgstatic.com/i/image3/M01/8B/CE/Cgq2xl6ekWeALK00ADBnDWEfxrk052.png"}),E,a(o,{alt:"14.png",src:"https://s0.lgstatic.com/i/image3/M01/8B/CE/Cgq2xl6ekX-AByO6AAXZQMdSC0E286.png"}),W,a(o,{alt:"15.png",src:"https://s0.lgstatic.com/i/image3/M01/12/B8/Ciqah16ekY6ABhvhAC7y3FnGiFM721.png"}),z,a(o,{alt:"17.png",src:"https://s0.lgstatic.com/i/image3/M01/05/8A/CgoCgV6ekiKAPruLAADBBqAFhRY858.png"}),j,a(o,{alt:"18.png",src:"https://s0.lgstatic.com/i/image3/M01/05/8A/CgoCgV6eki2ALuVBAADp64Sok_0397.png"}),w])}const K=s(l,[["render",I]]);export{Q as __pageData,K as default};
