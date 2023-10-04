import{_ as e,j as l,o as i,g as o,k as p,Q as t,s as r}from"./chunks/framework.e0c66c3f.js";const M=JSON.parse('{"title":"设计模式知识点 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/036_32个Java面试必考点/(4) 第02讲（下）：Java语言特性与设计模式.md","filePath":"posts/backEnd/036_32个Java面试必考点/(4) 第02讲（下）：Java语言特性与设计模式.md","lastUpdated":1696338709000}'),_={name:"posts/backEnd/036_32个Java面试必考点/(4) 第02讲（下）：Java语言特性与设计模式.md"},s=t('<h6 id="设计模式知识点" tabindex="-1">设计模式知识点 <a class="header-anchor" href="#设计模式知识点" aria-label="Permalink to &quot;设计模式知识点&quot;">​</a></h6><p>前面说了操作系统和网络知识，接下来是设计模式的考察点，一般有两个：</p><ul><li><p>常用设计模式的实现；</p></li><li><p>设计模式的使用场景。</p></li></ul><br><p>设计模式分为 3 大类型共 23 种：</p><ol><li><p>创建型：工厂方法模式、抽象工厂模式、单例模式、建造者模式、原型模式。</p></li><li><p>结构型：适配器模式、装饰器模式、代理模式、外观模式、桥接模式、组合模式、享元模式。</p></li><li><p>行为型：策略模式、模板方法模式、观察者模式、迭代子模式、责任链模式、命令模式、备忘录模式、状态模式、访问者模式、中介者模式、解释器模式。</p></li></ol><br><p>最常见的设计模式有：单例模式、工厂模式、代理模式、构造者模式、责任链模式、适配器模式、观察者模式等，如下图所示。</p>',8),h=t('<p>面试中对于设计模式，你应该明白不同的设计用来解决什么场景问题，对于常用的设计模式能够灵活运用。下面重点介绍几种常用的设计模式。</p><h6 id="单例模式" tabindex="-1">单例模式 <a class="header-anchor" href="#单例模式" aria-label="Permalink to &quot;单例模式&quot;">​</a></h6><p>首先是单例模式，这个模式在实际业务中会经常用到，也是设计模式中的主要考察点。这里介绍线程安全的单例模式实现方式。</p><br><p>单例模式常见的实现方式有三种。</p><ul><li><p>第一种是静态初始化方式，也叫作饿汉方式。实现的思路就是在类初始化时完成单例实例的创建，因此不会产生并发问题，在这种方式下不管是否会使用到这个单例，都会创建这个单例。</p></li><li><p>第二种实现方式是双重检查，也叫作懒汉方式，只有在真正用到这个单例实例的时候才会去创建，如果没有使用就不会创建。这个方式必然会面对多个线程同时使用实例时的并发问题。为了解决并发访问问题，通过 synchronized 或者 lock 进行双重检查，保证只有一个线程能够创建实例。这里要注意内存可见性引起的并发问题，必须使用 volatile 关键字修饰单例变量。</p></li><li><p>第三种是单例注册表方式，Spring 中 Bean 的单例模式就是通过单例注册表方式实现的。</p></li></ul><br><p>下面结合设计模式的实际应用，来介绍常用的设计模式，如下图所示。在面试时遇到类似问题，记得要将设计模式与实际业务场景进行结合，来体现对设计模式的理解和应用能力。</p>',8),n=t('<h6 id="工厂模式" tabindex="-1">工厂模式 <a class="header-anchor" href="#工厂模式" aria-label="Permalink to &quot;工厂模式&quot;">​</a></h6><p>工厂模式是创建不同类型实例时常用的方式，例如 Spring 中的各种 Bean 是有不同 Bean 工厂类进行创建的。</p><h6 id="代理模式" tabindex="-1">代理模式 <a class="header-anchor" href="#代理模式" aria-label="Permalink to &quot;代理模式&quot;">​</a></h6><p>代理模式，主要用在不适合或者不能直接引用另一个对象的场景，可以通过代理模式对被代理对象的访问行为进行控制。Java 的代理模式分为静态代理和动态代理。静态代理指在编译时就已经创建好了代理类，例如在源代码中编写的类；动态代理指在 JVM 运行过程中动态创建的代理类，使用动态代理的方法有 JDK 动态代理、CGLIB、Javassist 等。面试时遇到这个问题可以举个动态代理的例子，比如在 Motan RPC 中，是使用 JDK 的动态代理，通过反射把远程请求进行封装，使服务看上去就像在使用本地的方法。</p><h6 id="责任链模式" tabindex="-1">责任链模式 <a class="header-anchor" href="#责任链模式" aria-label="Permalink to &quot;责任链模式&quot;">​</a></h6><p>责任链模式有点像工厂的流水线，链上每一个节点完成对对象的某一种处理，例如 Netty 框架在处理消息时使用的 Pipeline 就是一种责任链模式。</p><h6 id="适配器模式" tabindex="-1">适配器模式 <a class="header-anchor" href="#适配器模式" aria-label="Permalink to &quot;适配器模式&quot;">​</a></h6><p>适配器模式，类似于我们常见的转接头，把两种不匹配的对象来进行适配，也可以起到对两个不同的对象进行解藕的作用。例如我们常用的日志处理框架 SLF4J，如果我们使用了 SLF4J 就可以跟 Log4j 或者 Logback 等具体的日志实现框架进行解藕。通过不同适配器将 SLF4J 与 Log4j 等实现框架进行适配，完成日志功能的使用。</p><h6 id="观察者模式" tabindex="-1">观察者模式 <a class="header-anchor" href="#观察者模式" aria-label="Permalink to &quot;观察者模式&quot;">​</a></h6><p>观察者模式也被称作发布订阅模式，适用于一个对象的某个行为需要触发一系列事件的场景，例如 gRPC 中的 Stream 流式请求的处理就是通过观察者模式实现的。</p><h6 id="构造者模式" tabindex="-1">构造者模式 <a class="header-anchor" href="#构造者模式" aria-label="Permalink to &quot;构造者模式&quot;">​</a></h6><p>构造者模式，适用于一个对象有很多复杂的属性，需要根据不同情况创建不同的具体对象，例如创建一个 PB 对象时使用的 builder 方式。</p><h6 id="java-语言特性知识点" tabindex="-1">Java 语言特性知识点 <a class="header-anchor" href="#java-语言特性知识点" aria-label="Permalink to &quot;Java 语言特性知识点&quot;">​</a></h6><p>Java 语言特性的知识点汇总如下图所示。</p>',14),c=t('<p>常用集合类实现与 Java 并发工具包 JUC 是常见考点，JUC 会在后面的多线程课程中进行详细讲解。</p><p>Java 的集合类中部分需要重点了解类的实现。例如，HashMap、TreeMap 是如何实现的等。</p><p>动态代理与反射是 Java 语言的特色，需要掌握动态代理与反射的使用场景，例如在 ORM 框架中会大量使用代理类。而 RPC 调用时会使用到反射机制调用实现类方法。</p><p>Java 基础数据类型也常常会在面试中被问到，例如各种数据类型占用多大的内存空间、数据类型的自动转型与强制转型、基础数据类型与 wrapper 数据类型的自动装箱与拆箱等。</p><p>Java 对对象的引用分为强引用、软引用、弱引用、虚引用四种，这些引用在 GC 时的处理策略不同，强引用不会被 GC 回收；软引用内存空间不足时会被 GC 回收；弱引用则在每次 GC 时被回收；虚引用必须和引用队列联合使用，主要用于跟踪一个对象被垃圾回收的过程。</p><p>Java 的异常处理机制就是 try-catch-finally 机制，需要知道异常时在 try catch 中的处理流程；需要了解 Error 和 Exception 的区别。</p><p>最后 Java 的注解机制和 SPI 扩展机制可以作为扩展点适当了解。</p><h6 id="详解-map" tabindex="-1">详解 Map <a class="header-anchor" href="#详解-map" aria-label="Permalink to &quot;详解 Map&quot;">​</a></h6><p>关于 Java 的基础知识重点讲解最常考察点 HashMap 和 ConcurrentHashMap，以及 Java 的不同版本新技术特性，如下图所示。</p>',9),d=t('<p>面试中，Map 的实现这个题目能够考察到数据结构、Java 基础实现以及对并发问题处理思路的掌握程度。</p><ol><li><p>HashMap</p><ol><li><p>先来看 HashMap 的实现，简单来说，Java 的 HashMap 就是数组加链表实现的，数组中的每一项是一个链表。通过计算存入对象的 HashCode，来计算对象在数组中要存入的位置，用链表来解决散列冲突，链表中的节点存储的是键值对。</p></li><li><p>除了实现的方式，我们还需要知道填充因子的作用与 Map 扩容时的 rehash 机制，需要知道 HashMap 的容量都是 2 的幂次方，是因为可以通过按位与操作来计算余数，比求模要快。另外需要知道 HashMap 是非线程安全的，在多线程 put 的情况下，有可能在容量超过填充因子时进行 rehash，因为 HashMap 为了避免尾部遍历，在链表插入元素时使用头插法，多线程的场景下有可能会产生死循环。</p></li></ol></li><li><p>ConcurrentHashMap</p><ol><li>从 HashMap 的非线程安全，面试官很自然地就会问到线程安全的 ConcurrentHashMap。ConcurrentHashMap 采用分段锁的思想来降低并发场景下的锁定发生频率，在 JDK1.7 与 1.8 中的实现差异非常大，1.7 中使用 Segment 进行分段加锁，降低并发锁定；1.8 中使用 CAS 自旋锁的乐观锁来提高性能，但是在并发度较高时性能会比较一般。另外 1.8 中的 ConcurrentHashMap 引入了红黑树来解决 Hash 冲突时链表顺序查找的问题。红黑树的启用条件与链表的长度和 Map 的总容量有关，默认是链表大于 8 且容量大于 64 时转为红黑树。这部分内容建议详细阅读源码进行学习。</li></ol></li></ol><h6 id="详解-java-版本特性" tabindex="-1">详解 Java 版本特性 <a class="header-anchor" href="#详解-java-版本特性" aria-label="Permalink to &quot;详解 Java 版本特性&quot;">​</a></h6>',3),u=t('<p>Java 近些年一改以往的版本发布风格，发布频率提高了很多。目前大部分公司的生产环境使用的还是 1.8 版本，一少部分升级到 1.9 或 1.10 版本，Java 的 1.8 版本是一个长期支持的版本，最新发布的 1.11 版本也是一个长期支持的版本，1.11 版本中已经包含了 1.9、1.10 版本的功能，所以 1.8 和 1.11 版本是我们要重点关注的版本。</p><p>在 1.8 版本中 Java 增加了对 lambda 表达式的支持，使 Java 代码的编写可以更简洁，也更方便支持并行计算。并且提供了很多 Stream 流式处理的 API。1.8 版本还支持了方法引用的能力，可以进一步简化 lambda 表达式的写法。</p><p>在 1.8 版本中，接口可以提供默认方法了，这样可以简化一些简单的抽象类。最后在 1.8 版本中对方法区进行调整，使用 Metaspace 替换掉了 PermGen 的永久代。Metaspace 与 PermGen 之间最大的区别在于：Metaspace 并不在虚拟机中，而是使用本地内存。替换的目的一方面是可以提升对元数据的管理同时提升 GC 效率，另一方面是方便后续 HotSpot 与 JRockit 合并</p><p>在 1.9、1.10 版本中的主要特性是增加了模块系统，将 G1 设为默认垃圾回收器、支持局部变量推断等功能。这些功能都已经包含在 1.11 版本中。</p><br><p>1.11 版本是 Java 最新的长期支持版本，也将会是未来一段时间的主要版本，1.11 版本中提供的最激动人心的功能是 ZGC 这个新的垃圾回收器，ZGC 为大内存堆设计，有着非常强悍的性能，能够实现 10ms 以下的 GC 暂停时间。关于 ZGC 会在下一课中进一步介绍。除此之外，1.11 版本对字符串处理 API 进行了增强，提供了字符复制等功能。1.11 版本还内置了 HttpClient。</p><h6 id="考察点和加分项" tabindex="-1">考察点和加分项 <a class="header-anchor" href="#考察点和加分项" aria-label="Permalink to &quot;考察点和加分项&quot;">​</a></h6><h6 id="面试考察点" tabindex="-1">面试考察点 <a class="header-anchor" href="#面试考察点" aria-label="Permalink to &quot;面试考察点&quot;">​</a></h6><p>从面试官角度出发，总结本课时对于计算机基础和 Java 语言特性的考察点如下。</p><ol><li><p>第一考察点就是对基本概念和基本原理的考察。要求对这两项的理解必须是正确的，清晰的。例如网络协议的 4/7 层模型的概念，TCP 协议流量控制的实现原理等。</p></li><li><p>第二个考察点是常用工具、模型的实现方式和使用姿势，例如 HashMap 在 JDK 1.8 中的实现方式是怎样的？单例模式有几种实现方式？什么场景下该使用懒汉式单例实现，什么场景下该使用饿汉式单例实现等。</p></li><li><p>第三个考察点是经常使用到的一些知识点，例如你常用的 Linux 命令有哪些，都用来解决什么问题？</p></li><li><p>第四个考察点是实际应用中容易犯错的点，例如 == 与 equals 的区别，例如对象的强引用使用不当可能导致内存泄露，主要考察候选人对于不同对象引用方式的作用和理解。</p></li><li><p>第五个考察点是与面试方向相关的知识点。例如面试的岗位是中间件研发，面试时可能会涉及更多的存储、网络相关的知识的考察。</p></li></ol><h6 id="加分项" tabindex="-1">加分项 <a class="header-anchor" href="#加分项" aria-label="Permalink to &quot;加分项&quot;">​</a></h6><p>前面提到的考察点是面试通过的必要条件，回答出问题并不一定能保证通过面试，所以如何做到比其他竞争者更优秀，给面试官留下更好的印象，是成功的关键。你需要一些 buff。这些加分能力不仅仅针对这一课的内容，后续课程也有一定的通用性。</p><br><ol><li><p>能将面试考察点与实际业务场景结合，或者与实际使用经验结合。</p><p>这样能够更好的体现对知识点的理解，突出实践能力。例如，在回答 &quot;你知道哪几种设计模式&quot; 这个问题时，不但能说出几种设计模式，以及适合哪类场景，而且还能指出哪些著名的框架在处理什么问题时使用了哪种设计模式，或者自己在处理某个项目的什么场景时，使用了哪种设计模式，取得了什么效果，这样肯定会给面试官留下非常好的印象。</p></li><li><p>用反例来描述在实际场景中，误用某些功能会带来的问题。</p><p>例如，介绍反射机制时，除了介绍反射机制的实现方式、应用场景外，还可以提到大量使用反射会对性能产生影响，应避免滥用。</p></li><li><p>知道与考察知识点相关的优化点。</p><p>例如在介绍 TCP 建连与断连时，最好能够指出线上如果出现大量 time_wait 时，可以通过调整系统参数加快连接的回收与复用。</p></li><li><p>了解与知识点相关的最新技术趋势。</p><p>例如介绍 ConcurrentHashMap 的实现时，能够知道 1.8 版本的改进细节。或者在介绍 HTTP 时能够说出 HTTP2 和 QUIC 的特点与实现等。</p></li><li><p>回答面试问题时，在比较了解的前提下，尽量增加回答内容的深度。例如在介绍 TCP 的滑动窗口时，能讲到流量和拥塞控制，近一步能指出不同的解决拥塞的算法等。</p><p>这里要注意，面试官一般会沿着候选人的回答继续追问，如果对细节不太了解可能会适得其反。</p></li></ol><h6 id="真题汇总" tabindex="-1">真题汇总 <a class="header-anchor" href="#真题汇总" aria-label="Permalink to &quot;真题汇总&quot;">​</a></h6><p>真题汇总如下图所示。</p>',16),T=t("<p>解题思路如下。</p><ul><li><p>第一题：线程、进程的区别和联系，主要从资源占用、切换效率、通信方式等方面进行解答；</p></li><li><p>第二题：线程的切换过程主要考察上下文切换，需要保存寄存器、栈等现场，需要由用户态切换到内核态。最后通过 vmstat 命令查看上下文切换的情况；</p></li><li><p>第三题：常用的 Linux 命令可以参考前面操作系统汇总提到的命令；</p></li><li><p>第四题、第五题，知识点详解中已经介绍过了，务必要掌握；</p></li><li><p>第六题：大致包括 DNS 解析、TCP 建连、HTTP 请求、HTTP 响应等，实际回答时，可以画个简单的交互图来说明。</p></li></ul><br><p>再汇总一些真题，包括基础概念，以及前面介绍过的知识点，如下图所示。</p>",4),m=r("p",null,"下一课时的主题为 JVM 原理。",-1);function C(P,A,J,b,v,g){const a=l("Image");return i(),o("div",null,[s,p(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/2D/CgotOV1412GAIvkDAAIBtlkYfqo038.png"}),h,p(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/10/CgoB5l142ISAAe_XAAISBI_gX4I754.png"}),n,p(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/60/CgotOV13doqAUZwdAAJtuA27fL4326.png"}),c,p(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/2E/CgotOV1413iANCl1AAG3aLAzQ6M654.png"}),d,p(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/0E/CgoB5l1414OAPPHoAAHK9xyeUdE686.png"}),u,p(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/2E/CgotOV1414uAQSHlAAH_rsNrJqI449.png"}),T,p(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/0E/CgoB5l1415GALUZ6AAHoxTPQ0mw023.png"}),m])}const q=e(_,[["render",C]]);export{M as __pageData,q as default};
