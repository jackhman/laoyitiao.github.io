import{_ as l,j as r,o as e,g,k as s,h as a,s as t,Q as n}from"./chunks/framework.4e7d56ce.js";const U=JSON.parse('{"title":"开篇词：由点及面，搭建你的Java并发知识网","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/096-Java 并发编程文档/(238) 开篇词： 由点及面，搭建你的 Java 并发知识网.md","filePath":"posts/backEnd/096-Java 并发编程文档/(238) 开篇词： 由点及面，搭建你的 Java 并发知识网.md","lastUpdated":1696417798000}'),_={name:"posts/backEnd/096-Java 并发编程文档/(238) 开篇词： 由点及面，搭建你的 Java 并发知识网.md"},i=t("h1",{id:"开篇词-由点及面-搭建你的java并发知识网",tabindex:"-1"},[a("开篇词：由点及面，搭建你的Java并发知识网 "),t("a",{class:"header-anchor",href:"#开篇词-由点及面-搭建你的java并发知识网","aria-label":'Permalink to "开篇词：由点及面，搭建你的Java并发知识网"'},"​")],-1),c=t("p",null,"你好，欢迎学习《Java 并发编程核心 78 讲》，我是讲师星星，一线互联网公司资深研发工程师，参与过集团内多个重点项目的设计与开发。",-1),p=t("h6",{id:"扎实的理论基础-宝贵的并发实践经验",tabindex:"-1"},[t("strong",null,"扎实的理论基础，宝贵的并发实践经验"),a(),t("a",{class:"header-anchor",href:"#扎实的理论基础-宝贵的并发实践经验","aria-label":'Permalink to "**扎实的理论基础，宝贵的并发实践经验**"'},"​")],-1),A=t("p",null,"工作期间，因为业务需要，我所开发和负责的场景大多数都是大流量和高并发的，其中有很多是对 Java 并发知识的实际应用。学习如逆旅，从小白成长为并发大神，困难重重，既然不能逃避，那么唯有改变对它的态度。",-1),h=t("p",null,"从一开始面对线程池导致的 OOM 问题的不知所措，到后来可以深入剖析 JUC 源码，并精准定位、复现、修复线上的并发问题，再到现在可以应对千万级流量的业务场景，并预判和发现隐藏在其中的线程安全隐患，这期间，我走过一些弯路，踩过一些坑，也积累了很多宝贵的并发经验。",-1),u=t("p",null,"此外，在对并发问题的逐个解决过程中，在系统的设计和实施过程中，我详细研读了大量的国内外经典并发书籍和资料，把涉及的代码一一落实、验证，并应用到业务里，这期间让我逐渐建立起了完善的 Java 并发知识体系。",-1),d=t("h6",{id:"为什么并发编程这么重要呢",tabindex:"-1"},[t("strong",null,"为什么并发编程这么重要呢"),a(),t("a",{class:"header-anchor",href:"#为什么并发编程这么重要呢","aria-label":'Permalink to "**为什么并发编程这么重要呢**"'},"​")],-1),m=t("p",null,'随着接触和负责的系统越来越复杂，我逐渐发现，无论是对于优秀的系统设计，还是对于程序员的成长提高、职业发展，并发编程都是必须要跨过去的"坎"，而一旦你跨过了这道"坎"，便会豁然开朗，原来一切都如此简单，职业发展也会更上一层楼。',-1),C=n("<ul><li><strong>并发已经逐渐成为基本技能</strong></li></ul><p>流量稍大的系统，随着数据和用户量的不断增加，并发量轻松过万，如果不使用并发编程，那么性能很快就会成为瓶颈。而随着近年来服务器 CPU 性能和核心数的不断提高，又给并发编程带来了广阔的施展拳脚的空间。可谓是<strong>有需求，同时又有资源</strong> <strong>保障</strong> ，兼具<strong>天时地利</strong>。</p><br><ul><li><strong>并发几乎是</strong> <strong>Java</strong> <strong>面试必考的内容</strong></li></ul><p>而随着互联网进入下半场，好公司对程序员的要求也水涨船高，各大互联网公司的岗位描述中，并发几乎是逃不掉的关键词，我们举几个来自拉勾网的 JD 实例。</p>",5),v=t("br",null,null,-1),J=t("p",null,"你会发现，Java 高级工程师岗位要求中并发编程几乎成为了必须掌握的技能点，而在面经里涉及的并发编程的知识也数不胜数，本专栏各课时涉及的知识点，也正是各大厂 Java 高级工程师面试的高频考题。",-1),D=t("h6",{id:"如何学好并发编程",tabindex:"-1"},[a("如何学好并发编程 "),t("a",{class:"header-anchor",href:"#如何学好并发编程","aria-label":'Permalink to "如何学好并发编程"'},"​")],-1),T=t("p",null,"在此邀请你做一个小测试，看看目录里的问题，你能否回答全面？相信你看到问题后大部分会感觉很熟悉，但要组织答案却又模棱两可，不敢太确定，那么接下来就带你了解如何学好 Java 高并发并攻克这些难题。",-1),L=n("<ul><li><strong>Java</strong> <strong>编程是众多框架的原理和基础</strong></li></ul><p>无论是 Spring、tomcat 中对线程池的应用、数据库中的乐观锁思想，还是 Log4j2 对阻塞队列的应用等，无不体现着并发编程的思想，并发编程应用广泛，各大框架都和并发编程有着千丝万缕的联系。</p><p>并发编程就像是<strong>地基</strong> ，掌握好以后，可以做到<strong>一通百通</strong>。</p><p><strong>不过，要想学好并发编程，却不是一件容易的事，你有没有以下的感受？</strong></p><ul><li><strong>并发的知识太多、太杂了</strong></li></ul>",5),E=t("p",null,"常见的并发工具类数不尽数：例如，线程池、各种 Lock、synchronized 关键字、ConcurrentHashMap、CopyOnWriteArrayList、ArrayBlockingQueue、ThreadLocal、原子类、CountDownLatch、Semaphore，等等，而它们的原理又包括 CAS、AQS、Java 内存模型等等。",-1),S=t("p",null,"从刚才那一长串的名字中可以看出，并发工具的数量很多，而且功能也不尽相同，不容易完全掌握。确实，并发涉及的知识点太琐碎了，大家或多或少都学习过一些并发的知识，但是总感觉一直学不完，东一榔头西一棒槌，很零散，也不知道尽头在哪里，导致学完以后，真正能记住的内容却很少。而且如果学到并发底层原理，就不只涉及 Java 语言，更涉及 JVM、JMM、操作系统、内存、CPU 指令等，令人一头雾水。",-1),b=t("ul",null,[t("li",null,[t("strong",null,"不容易找到清晰易懂的学习资料")])],-1),O=t("p",null,"在我学习的过程中，我总是有一种感受，那就是较少有资料能够把 Java 并发编程讲得非常清楚，例如我们学习一个工具类，希望了解它的诞生背景、使用场景，用法、注意点，最后理解原理，以及它和其他工具类的联系，这一系列的内容其实都是我们需要掌握的。",-1),M=t("p",null,"反观现有的网络相关资料，往往水平参差不齐，真伪难辨，而且经常含有错误，如果我们先入为主地接受了错误的观点，那就得不偿失了。",-1),q=n('<p>我希望本门课程可以把 Java 并发编程的这些复杂、难理解的概念，用通俗易懂、丰富的图示和例子的方式和大家分享出来，不仅知道怎么用，还能知道背后的原理。</p><p>利用**&quot;全局思维+单点突破&quot;**的理念，建立起并发的知识体系，同时又对各种常见的工具类有深刻认识，以后我们的知识就可以从点到线，从线到面，浑然一体。</p><h6 id="学习了本门课-你会有以下收获" tabindex="-1"><strong>学习了本门课，你会有以下收获</strong> <a class="header-anchor" href="#学习了本门课-你会有以下收获" aria-label="Permalink to &quot;**学习了本门课，你会有以下收获**&quot;">​</a></h6><ul><li><strong>你可以建立完整的</strong> <strong>Java</strong> <strong>并发知识网</strong></li></ul><p>通过这门课程，你可以系统地学习 Java 并发编程知识，而不再是碎片化获取，建立起知识脉络后，每一个工具类在我们心中就不再高高在上，而仅仅是我们并发知识体系中的一块块&quot;拼图&quot;，相信你对并发的理解会更深入一个层次。</p>',5),V=n("<p>建立完整的知识网络后，今后即便是遇到新推出的并发工具类，也可以迅速定位到它应处的位置，并且结合已有的知识，很快就能把它掌握。</p><ul><li><strong>你可以掌握常用的并发工具类：</strong></li></ul><p>课程中包含了实际生产中常用的大多数并发工具类所对应的并发知识，包括线程池、synchronized、Lock 锁，悲观锁和乐观锁、可重入锁、公平锁和非公平锁、读写锁、ConcurrentHashMap、CopyOnWriteArrayList、ThreadLocal、6 种原子类、CAS 原理、线程协作的 CountDownLatch、CyclicBarrier、Semaphore、AQS 框架、Java 内存模型、happens-before 原则、volatile 关键字、线程创建和停止的正确方法、线程的 6 种状态、如何解决死锁等问题。从用法到原理，再到面试常见问题，一次性掌握透彻。</p><ul><li><strong>面试中获取</strong> <strong>Offer</strong> <strong>的利</strong> <strong>器</strong></li></ul><p>本课程的各小节，都是从高频常考的面试问题出发，首先给出对应的参考解答，然后引申出背后所关联的知识。不但能够让你回答好面试官的问题，而且还可以在面试问题的基础上，做进一步的升华，让面试官眼前一亮。</p><p>我还会和你分享面试经验和技巧，如何把面试官往我们的思路上&quot;引导&quot;，最终帮助你拿到心仪的Offer，向更高阶的岗位迈进。</p><p>可以说并发编程是成为 Java 高级、资深工程师的必经之路。现在几乎所有的程序都或多或少的需要用到并发和多线程，如果你平时只能接触到 CRUD 的项目，想要进一步提高技术水平；或者是长期一线，只是不断地把业务逻辑&quot;翻译&quot;成代码；想要跳槽加薪，面试却屡屡碰壁，那么学习并发将会帮助你突破&quot;瓶颈&quot;，进阶到下一个层级。</p><p>希望这个专栏可以让 Java 并发编程这个非常难啃的老大难问题，变得&quot;平易近人&quot;、&quot;通俗易懂&quot;、&quot;一点就通&quot;，希望可以让你体会到&quot;哦，原来如此简单！&quot;的感觉，体会到久违的学习的快乐。</p><br><blockquote><p>本专栏在写作时参考了前辈们的优秀作品，具体的参考点已统一整理至专栏最后一小节的《参考文献》，内有详细说明，在此对前辈们表示敬意和感谢。</p></blockquote><br><br>",12);function f(k,P,B,I,x,N){const o=r("Image");return e(),g("div",null,[i,c,p,s(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A5/3E/CgoB5l3DgLOAN9TxAADOl2eK1YA757.png"}),a(),A,s(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A5/3E/CgoB5l3DgLOABnQDAAIty53kLZs981.png"}),a(),h,s(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A5/5E/CgotOV3DgLOAELhuAACPIXhX2bY626.png"}),a(),u,d,m,s(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A5/3E/CgoB5l3DgLOAEMv7AABnabGYURQ993.png"}),a(),C,s(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A5/3E/CgoB5l3DgLOAJbveAAHrokwEb7Y378.png"}),a(),s(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A5/5E/CgotOV3DgLOAXz5wAAG5iaGUShs303.png"}),a(),s(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A5/5E/CgotOV3DgLOALZydAAE1RSJ3cV0452.png"}),a(),s(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A5/3E/CgoB5l3DgLOAU2pxAAGWghflKDM777.png"}),a(),v,s(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A5/5E/CgotOV3DgLOAOLUXAADh5hjW9Ao521.png"}),a(),s(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A5/3E/CgoB5l3DgLOAe7dXAAGloBkIUlw875.png"}),a(),J,D,T,s(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A5/5E/CgotOV3DgLSAHP18AACWVfXCugg682.png"}),a(),L,s(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A5/3E/CgoB5l3DgLSABWlnAAAr88J9c9A926.png"}),a(),E,s(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A5/5E/CgotOV3DgLSABkjiAADTiPdaGcM233.png"}),a(),S,b,O,M,s(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A5/3E/CgoB5l3DgLSAein_AADNovsebTk325.png"}),a(),q,s(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A5/5E/CgotOV3DgLSAGmEWAADo6Lxf6ww652.png"}),a(),V])}const w=l(_,[["render",f]]);export{U as __pageData,w as default};
