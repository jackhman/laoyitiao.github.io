import{_ as o,j as s,o as _,g as r,k as l,h as a,Q as i,s as e}from"./chunks/framework.4e7d56ce.js";const I=JSON.parse('{"title":"加餐2：分布式事务考点梳理+高频面试题","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/分布式技术原理与实战45讲_文档/(1911) 加餐2：分布式事务考点梳理 + 高频面试题.md","filePath":"posts/backEnd/分布式技术原理与实战45讲_文档/(1911) 加餐2：分布式事务考点梳理 + 高频面试题.md","lastUpdated":1696417798000}'),p={name:"posts/backEnd/分布式技术原理与实战45讲_文档/(1911) 加餐2：分布式事务考点梳理 + 高频面试题.md"},n=i('<h1 id="加餐2-分布式事务考点梳理-高频面试题" tabindex="-1">加餐2：分布式事务考点梳理+高频面试题 <a class="header-anchor" href="#加餐2-分布式事务考点梳理-高频面试题" aria-label="Permalink to &quot;加餐2：分布式事务考点梳理+高频面试题&quot;">​</a></h1><p>本课时我将和你一起梳理一下面试中分布式事务的高频考点，做到温故知新。</p><h3 id="如何考察分布式事务" tabindex="-1">如何考察分布式事务 <a class="header-anchor" href="#如何考察分布式事务" aria-label="Permalink to &quot;如何考察分布式事务&quot;">​</a></h3><p>数据一致性和分布式事务是互联网分布式系统设计中必须要考虑的，所以对分布式事务的考察是中高级工程师面试必须跨过的一道门槛。</p><p>面试官通常会通过一个实际的系统设计题来展开提问，以考察候选人对分布式基础理论的理解、对各种数据一致性模型的掌握，以及对分布式下事务实现的原理、机制和各种实现手段的熟悉程度。</p><p>下面我模拟一个实际的面试场景，面试官可能会对你提出以下一连串的问题，你可以检测一下自己在学习中的掌握程度：</p><ul><li><p>请说说你对分布式系统 CAP 理论的理解，CAP 分别代表什么含义？</p></li><li><p>为什么分布式系统的一致性和可用性不能同时满足？</p></li><li><p>你是如何理解数据一致性的？数据一致性有哪几种模型？</p></li><li><p>你在做系统设计时，如何选择实现强一致性还是弱一致性？</p></li><li><p>在你的项目里，是如何设计分布式事务，实现最终一致性的？</p></li><li><p>你了解数据库的 binlog 和 redolog 吗？是如何实现一致性的呢？</p></li></ul><p>需要说明的是，面试并不是应试考试，很多问题并没有标准答案，不过这里的问题，很多都可以在&quot;模块二：分布式事务&quot;中找到思路。</p><h3 id="分布式事务高频考点" tabindex="-1">分布式事务高频考点 <a class="header-anchor" href="#分布式事务高频考点" aria-label="Permalink to &quot;分布式事务高频考点&quot;">​</a></h3><p>在分布式事务的面试中，主要会围绕分布式理论、一致性算法、分布式事务及其应用来展开提问。下面我进行了简单梳理，这里有一张分布式事务的知识点思维导图，你可以对照这张图片，查漏补缺进行分析。</p>',10),c=e("p",null,"分布式理论部分的主要内容包括 CAP 理论、Base 理论、各种数据一致性模型的应用等。在工作中应用比较多的是 ZooKeeper，需要了解 ZooKeeper 的原理和实现、应用场景等。",-1),d=e("p",null,"一致性算法部分，希望你能够对经典的数据一致性算法，比如 Paxos 算法等有自己的理解，并不是要做到对算法细节倒背如流，而是要能够通过自己的描述，把算法的整体流程讲清楚。",-1),h=e("p",null,"分布式事务的应用是日常开发中打交道最多的部分，如果你在工作中实践过分布式事务的实现是最好的，若没有，可以去了解一些开源的分布式事务中间件。比如我在专栏中多次介绍过的 Alibaba Seata 等组件，通过学习开源组件设计思路，你也可以对这一部分内容有个整体的把握。",-1),u=e("p",null,[a("在专栏的第 "),e("a",{href:"https://kaiwu.lagou.com/course/courseInfo.htm?courseId=69#/detail/pc?id=1909",target:"_blank",rel:"noreferrer"},"10"),a("、"),e("a",{href:"https://kaiwu.lagou.com/course/courseInfo.htm?courseId=69#/detail/pc?id=1910",target:"_blank",rel:"noreferrer"},"11"),a(" 课时我们一起讨论了分布式锁的应用场景和实现细节，你可以回顾一下，使用 Redis 实现分布式锁，需要注意哪些细节呢？不同的实现方式，又存在哪些缺陷呢？")],-1),m=e("p",null,"另外，除了专栏的内容，我推荐你结合一些经典的公开课程去学习，以加深印象，建议关注拉勾教育直播课哦，有许多分布式相关的主题分享。",-1);function f(b,g,k,P,A,q){const t=s("Image");return _(),r("div",null,[n,l(t,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/4D/49/Ciqc1F9Z42uAP8aiAAGiixfdARo703.png"}),a(),c,d,h,u,m])}const C=o(p,[["render",f]]);export{I as __pageData,C as default};
