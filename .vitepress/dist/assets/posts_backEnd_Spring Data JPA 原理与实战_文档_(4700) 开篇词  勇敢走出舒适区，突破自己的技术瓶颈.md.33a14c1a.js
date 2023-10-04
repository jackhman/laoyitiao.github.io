import{_ as e,j as i,o,g as s,k as n,Q as p,s as a,h as r}from"./chunks/framework.e0c66c3f.js";const C=JSON.parse('{"title":"我是如何学习 Spring Data JPA 的？ ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Data JPA 原理与实战_文档/(4700) 开篇词  勇敢走出舒适区，突破自己的技术瓶颈.md","filePath":"posts/backEnd/Spring Data JPA 原理与实战_文档/(4700) 开篇词  勇敢走出舒适区，突破自己的技术瓶颈.md","lastUpdated":1696338709000}'),g={name:"posts/backEnd/Spring Data JPA 原理与实战_文档/(4700) 开篇词  勇敢走出舒适区，突破自己的技术瓶颈.md"},_=p('<p>你好，我是张振华，在 Java 领域从业已有十几年，也算是一个&quot;Java 老兵&quot;，我曾先后在驴妈妈、携程等互联公司分别担任 Java 架构师、开发主管等职务。在电商公司工作期间，我负责过后端服务的平台架构、实现过微服务的升级，同时写过公司的很多核心框架，经历了很多人都会遇到的一些常见问题，积累并总结了一些可以复用和迁移的经验。</p><h3 id="我是如何学习-spring-data-jpa-的" tabindex="-1">我是如何学习 Spring Data JPA 的？ <a class="header-anchor" href="#我是如何学习-spring-data-jpa-的" aria-label="Permalink to &quot;我是如何学习 Spring Data JPA 的？&quot;">​</a></h3><p>大概 4、5 年前，公司入职了一些架构师，引入了 Spring Data JPA 框架，起初接触时我很排斥，心想：这么复杂的框架真不如 MyBatis 简单，我写个简单的 SQL 就好了，为什么要学习 JPA 呢？</p><p>而且还要学习一大堆相关联的东西（比如要了解 Session 原理），这么复杂，它有什么好处呀？加上那时候我对框架 JPA 的理解还不是很深入，没有研究背后原理，写的代码会遇见各种 Bug......</p><p>但当我冷静下来，意识到其实是自己的舒适区在作怪，既然公司的一些资深架构师引入了这门技术，它肯定是有好处的，不如我先用着，详细掌握了才能知道它到底好不好。做技术的嘛，总要有点追求，有点极客的精神，否则就容易跟不上技术发展的速度。</p><p>于是，我决心研究一番。而那时候，大神们只负责引入 Spring Data JPA 技术，不负责讲解原因，所以自己摸索着用起来比较吃力，确实走了不少弯路。我在一开始只掌握了 Spring Data JPA 的基本用法时遇到了一些问题（比如一个最常见的动态 SQL 问题），由于研究得不太多，用起来别手别脚的，虽然功能实现了，但总感觉不是最佳实践，反而降低了开发效率。</p><p>后来我通过参考官方文档、网上搜索零星的资料，逐渐掌握了一些高级用法。但遇到一些复杂的场景，比如在多线程、高并发情况下发现问题时，还是不知道怎么回事。这时我发现 JPA 协议的最佳实现者是 Hibernate，于是我又读了 Hibernate 的文档，发现 Hibernate 已经发展好几代了，远不像我们之前想得那么复杂，这才了解了一些基本原理。懂了原理后，就基本可以套用来解决很多异常问题了，同时发生的怪异问题也可以轻松解决了。</p><p>随着自己对 JPA 使用得越来越熟练，Bug 没有那么多了，开发效率确实提升了，我明显感觉自己的技术能力也提升了很多，如对 Session、事务、连接池理解得更深入了。并且我发现 Spring Data JPA 框架里面有很多优秀的思想，比如乐观锁的处理、分页和排序统一处理、语义化的方法名、动态代理、策略模式等，这些可以为我们自己写框架的时候做知识储备，这些思想和方法都是值得去学习和借鉴的。</p><p>为了让自己更加熟悉这门技术，也为避免在工作中给别人讲解的时候误导他人，后来我抽时间看了官方的 Java Persistence API 约定和规范，又找了一些业内的大牛沟通讨论，知道了哪些 Hibernate 设计得比较好、哪些设计得不好，以及我们在实际开发中最好避免使用的技术点。</p><p>再后来我为了一探究竟，抽空写文章、写书，利用简单的案例去 Debug Spring Data JPA 的源码，去思考为什么会有这种语法，具体是怎么写的。通过这一系列动作，我又收获了运行原理和用法的最佳实践。</p><p>这些经验都让我得到了一些技术层面的提升，通过公司内部分享也让身边的同事眼前一亮，并顺利实现了公司框架的升级，从而也顺利地升职和加薪。因为我在其中真正受益了，所以如今我想把自己的这份经历和经验系统整理后分享给你，希望可以帮助你少走一些弯路。</p><h3 id="spring-data-jpa-有啥优势" tabindex="-1">Spring Data JPA 有啥优势？ <a class="header-anchor" href="#spring-data-jpa-有啥优势" aria-label="Permalink to &quot;Spring Data JPA 有啥优势？&quot;">​</a></h3><p>至今，我所在公司的大部分项目都在用 Spring Data JPA，究其原因，我认为主要缘于它具有以下 4 点优势。</p><p><strong>第一，大势所趋，大厂必备技能。</strong> 近两年由于 Spring Cloud、Spring Boot 逐渐统一 Java 的框架江湖，而与 Spring Boot 天然集成的 Spring Data JPA 也逐渐走进了 Java 开发者的视野，大量尝鲜者享受到了这门技术带来的便利与功能。JPA 可以使团队在框架约定下进行开发，几乎很难出现有性能瓶颈的 SQL。因此你会发现很多大厂，如阿里、腾讯、抖音等公司，近几年在招聘的时候写明了要熟悉 JPA，这些大厂以及业内很多开源的新项目都在使用 JPA。</p><p><strong>第二，提升开发效率</strong>。现在有很多人知道什么是 Spring Data JPA，但是却觉得 JPA 很难用，使用中发现 Bug 不知道原因，本来用 JPA 是为了提升开发效率的，不会使用反倒踩了很多坑，所以我们需要体系化地学习。当你遇到复杂问题，比如平时你可能要花几个小时去想方法名、SQL 逻辑，如果你可以熟练使用 JPA，那么半小时甚至几分钟就可以写好查询方法了；再配合测试用例，你的开发质量也会明显提高很多，系统地学习可以让你少走很多弯路。</p><p><strong>第三，提高技术水平。</strong> Spring Data 对数据操作进行了大统一，统一了抽象关系型数据库和非关系型数据的接口、公共的部分，你会发现当掌握了 Spring Data JPA 框架后，你的开发水平几乎可以达到------轻易实现 Redis、MongoDB 等 NoSQL 的操作，因为它们都有统一的 Spring Data Common。如下图所示，从中你可以看到 Spring Data 和 JPA 的全景位置关系，这样一来，你可以清楚地知道 JPA 的重要作用，方便你了解 JPA 的脉络，从而更好地学习。</p>',16),A=a("p",null,[a("strong",null,"第四，求职加分项"),r("。如果简历中突出 Spring Data JPA 框架的使用，面试官会眼前一亮。因为掌握了 JPA，就意味着掌握了很多原理，比如 Session 原理、事务原理、PersistenceContext 原理等，而掌握了底层原理对于技术人员来说可以在开发中解决很多问题。因此，公司可以由此更好地过滤和筛选人才，也能从侧面看出求职者是否对技术足够感兴趣、有追求。我认为未来 3~5 年使用 Spring Data JPA 的人会越来越多，你可以在拉勾招聘网站上看到，很多招聘信息都要求熟练掌握 Spring Data JPA。")],-1),P=p('<h3 id="为什么写作这门课" tabindex="-1">为什么写作这门课？ <a class="header-anchor" href="#为什么写作这门课" aria-label="Permalink to &quot;为什么写作这门课？&quot;">​</a></h3><p>不仅是因为我经历了上述那些曲折的实践，还因为我看到不少朋友在学习 Spring Data JPA 的过程中，存在不同的困惑和难点，这让我有了分享自身经验，给人帮助的想法。</p><p>当我们刚开始学习 Spring Data JPA 的时候，往往都会想到直接去看它的官方文档，但是发现其描述得太简单，经常会&quot;知其然而不知其所以然&quot;。有时候照着官方例子来操作，发现有问题又不知道错在哪里，这是因为不了解其精髓和背后原理，所以不容易上手。</p><p>而 Spring Data JPA 是对 Hibernate 的封装和增强，但由于之前国内用 Hibernate 的人不是特别多，导致中文资料特别少，大部分都是直接翻译过来的，比较散且不太系统，没办法纵览全局，导致我们对原理掌握不是特别清楚。</p><p>所以，当我们遇到比如 Session、事务、Lazy 异常等各种问题时，发现官方没有详细介绍，只能自己 Debug、硬啃源码才能解决问题，这时就需要花费大量时间来研究源码，但又找不到可以参考的资料，而且不是每个公司都有大神愿意教你，此时多么希望有点经验可以参考呀。</p><p>于是我带着多年的实战经验来了，在这里我想告诉你，其实 Spring Data JPA 不难，只要你静下心来，花时间研究，跟着我的节奏，把这门课程按顺序都看完，你就会觉得这门技术原来如此简单，在解决实际问题的时候就会游刃有余，你会觉得 JPA 真的被行业低估了！</p><h3 id="课程设计" tabindex="-1">课程设计 <a class="header-anchor" href="#课程设计" aria-label="Permalink to &quot;课程设计&quot;">​</a></h3><p>本课程即我多年来的经验总结，我以&quot;语法 + 源码 + 原理 + 实战经验&quot;的形式全面介绍 Spring Data JPA，可以帮助你节省 3 年左右自己研究的时间。当你深入研究和理解了之后，就会发现这真是个好东西，从而真正掌握和发掘出 Spring Data JPA 的实践价值。</p><p>课程主要分为 <strong>4 个模块，共 31 课时</strong>。</p><p><strong>模块一：基础知识</strong> ，主要从基本语法的视角，来详细介绍 Spring Data JPA 的语法糖有哪些，包括相关的源码剖析、实际工作中的经验分享 <s>等</s>。内容涵盖你在工作中会用到的 Repository、Defining Query Methods、@Query 的语法，以及实体（Entity）的注解等内容，让你全面掌握 JPA 的基本用法。</p><p><strong>模块二：高级用法与实战</strong>，从实际工作中的复杂应用场景开始，为你讲解 Repository 自定义场景，MVC 参数的扩展，以及数据源、事务、连接之间的关系等，帮助你解决实践中可能会遇到的问题，让你学会独立思考、稳妥解决。</p><p><strong>模块三：原理与问题排查</strong>，掌握了基础知识和复杂使用场景后，再来了解其背后的原理： Entity 如何判断 Dirty、Entity 什么时机提交到数据库、Lazy 发生的原因是什么、N+1 SQL 如何优化等。针对实际工作中踩过的坑，为你讲解我的解决思路和方法。</p><p><strong>模块四：思路扩展</strong>，课程的最后我从 Spring Data Rest、测试用例、Spring Data ES 的角度来带你扩展下思路，了解一下发展方向，因为这三块内容深挖了一下生态关系，可以为你打开思路，更好地帮助你掌握前面所学，做到举一反三，同时也会大大提高你的开发效率，使你的代码质量更有保障。当你掌握了之后，就不是天天忙着&quot;救火&quot;，而是想着如何排除失火的隐患。</p>',13),c=a("h3",{id:"讲师寄语",tabindex:"-1"},[r("讲师寄语 "),a("a",{class:"header-anchor",href:"#讲师寄语","aria-label":'Permalink to "讲师寄语"'},"​")],-1),S=a("p",null,"希望你能节省一顿饭的钱，来学习这门课程，因为这门专栏不仅告诉你这是什么、怎么用的，还会教会你学习步骤、学习方法，希望你能成为技术极客。",-1),l=a("p",null,"相信能把整个课程认认真真看完的同学，你的技术和思考方式一定会达到质的飞越。也欢迎你在留言区发表你的学习感悟以及遇到的困难和挑战，大家一起讨论学习，共同进步。",-1),J=a("p",null,"最后希望你在学习本课程的时候，保持空杯心态（不只是这门课程，在看其他技术文章时也一样），因为只有空杯，我们才能装下更多的东西。接下来，让我们开始吧！",-1);function d(D,h,u,m,b,q){const t=i("Image");return o(),s("div",null,[_,n(t,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/4E/AE/Ciqc1F9fAliAcpl2AACAK63J0Dc405.png"}),A,n(t,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/4E/B9/CgqCHl9fAl-AYftPAACBn5kSPMA660.png"}),P,n(t,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/4E/B9/CgqCHl9fAm6AedztAAR7hPRrkeA104.png"}),c,S,l,J])}const E=e(g,[["render",d]]);export{C as __pageData,E as default};
