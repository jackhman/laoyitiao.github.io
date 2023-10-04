import{_ as p,j as _,o as i,g as e,k as l,h as o,s as t,Q as n}from"./chunks/framework.e0c66c3f.js";const z=JSON.parse('{"title":"案例背景 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/架构设计面试精讲_文档/(6065) 15  如何向面试官证明你做的系统是高可用的？.md","filePath":"posts/backEnd/架构设计面试精讲_文档/(6065) 15  如何向面试官证明你做的系统是高可用的？.md","lastUpdated":1696338709000}'),a={name:"posts/backEnd/架构设计面试精讲_文档/(6065) 15  如何向面试官证明你做的系统是高可用的？.md"},c=t("p",null,"我们已经用了五个模块分别讲了架构原理、分布式技术、中间件、数据库，以及缓存，这些都是面试中必考的技术领域和技术点，又因为我们处在大数据和互联网时代，所以高可用高性能这些非功能性需求的考察，也是你需要了解的，所以在最后一个模块，我会带你打卡高可用高性能的架构设计面试实战。",-1),u=t("p",null,"我在 01 讲中说过，高级研发工程师和架构师的区别不在于掌握了多少技术，而在于你所能驾驭系统的边界。这其实也反映了一个研发工程师的成长历程，起初独立负责一个功能，然后负责一个系统模块，再负责一个系统，最后负责多个系统或业务条线。",-1),r=t("p",null,"但是不管你在哪个阶段，有一个问题你肯定逃不开：怎么证明自己负责的系统是高可用的？因为任何一个系统架构初衷，最基本的诉求是要保证系统的稳定性和可用性，然后才是基于高流量的场景下，保证系统的并发承载能力。",-1),g=t("h3",{id:"案例背景",tabindex:"-1"},[o("案例背景 "),t("a",{class:"header-anchor",href:"#案例背景","aria-label":'Permalink to "案例背景"'},"​")],-1),A=t("p",null,"一般来讲，面试官在考察你系统架构的设计能力时，经常会让你说一下你在上一家公司是怎么设计系统架构的，以此了解你的设计能力和思路。",-1),d=t("p",null,"而你在讲解架构设计时，也是在向面试官逐步证明，自己负责的系统是如何做到高可用的。这会涉及一个公认的论证------SLA。服务等级协议（Service-Level Agreement，SLA）最根本的形式是协议双方（服务提供者和用户）签订的一个合约或协议。这个合约规范了双方的商务关系或部分商务关系。简单点儿说，你可以认为 SLA 是服务可用性一个重要衡量指标。",-1),h=t("p",null,"业界一般用几个 9 的 SLA 服务等级来衡量互联网应用的可用性。比如京东的可用性是 4 个 9（京东的服务 99.99% 可用）：京东的服务要保证在所有的运行时间里只有 0.01% 不可用，也就是说一年大概有 52.6 分钟不可用，这个 99.99% 就叫作系统的可用性指标。",-1),m=t("p",null,"52.6 分钟是怎么计算出来的呢？",-1),S=t("p",null,"SLA 的计算公式",-1),C=t("p",null,"从公式中可以看出， SLA 等于 4 个 9，也就是可用时长达到了 99.99% ，不可用时长则为是0.01%，一年是 365 天， 8760 个小时，一年的不可用时长就是 52.6 分钟，那么：",-1),P=t("ul",null,[t("li",null,[t("p",null,"SLA 等于 3 个 9，就相当于一年不可用时长等于 526 分钟；")]),t("li",null,[t("p",null,"SLA 等于 5 个 9，就相当于一年不可用时长等于 5.26 分钟。")])],-1),q=t("p",null,"可以发现，用 SLA 等于 4 个9 作为参照物，少个 9 相当于小数点往后移一位，多个 9 相当于小数点往前移一位（我把系统可用性指标总结成一张表格）。",-1),T=n("",9),L=n("",13),b=t("p",null,"监控报警指标",-1),k=t("p",null,[t("strong",null,"监控工具常用的有"),o("ZABBIX（Alexei Vladishev 开源的监控系统，覆盖市场最多的老牌监控系统，资料很多）、Open-Falcon（小米开源的监控系统，小米、滴滴、美团等公司内部都在用）、Prometheus（SoundCloud 开源监控系统，对 K8S 的监控支持更好）。这些工具基本都能监控所有系统的 CPU、内存、磁盘、网络带宽、网络 I/O 等基础关键指标，再结合一些运营商提供的监控平台，就可以覆盖整个基础设施监控。")],-1),D=t("p",null,[t("strong",null,"监控报警策略一般由时间维度"),o(" 、"),t("strong",null,"报警级别"),o(" 、"),t("strong",null,"阈值设定三部分组成"),o("。")],-1),N=t("p",null,"监控报警策略",-1),E=t("p",null,"为了方便你理解监控报警策略，我举个例子。假设系统的监控指标有CPU、内存和磁盘，监控的时间维度是分钟级，监控的阈值设置为占比。那么你可以定义出如下的监控报警策略：",-1),V=t("p",null,'为了第一时间监测到指标的健康度，报警级别可以分为紧急、重要，以及一般。当 CPU、内存，以及磁盘使用率这三项指标的每分钟采集的指标达到 90% 使用率时，就触发"紧急报警"；达到 80% 触发"重要报警"；70% 触发"一般报警"。',-1),f=t("ul",null,[t("li",null,[t("strong",null,"系统应用监控")])],-1),I=t("p",null,"业务状态监控报警，关注点在于系统自身状态的监控报警。和基础设施监控一样，它也是由监控指标，监控工具，报警策略组成，不同的是，系统应用监控报警的核心监控指标主要有流量、耗时、错误、心跳、客户端数、连接数等 6 个核心指标，监控工具有 CAT、SkyWalking、Pinpoint、Zipkin 等。",-1),M=n("",8),W=t("h3",{id:"总结",tabindex:"-1"},[o("总结 "),t("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),O=t("p",null,"我们来回顾一下今天的重点内容。",-1),x=t("p",null,'为了在面试中更好地回答怎么评估系统高可用，我们讲解了 SLA 的概念以及评估方法，并得出"以停机时间影响的系统请求量作为评估指标"比较科学。',-1),B=t("p",null,"为了确保线上服务的稳定运行，在设计监控系统时，要考虑三个核心点，基础设施监控、系统应用监控，以及存储服务监控。",-1),U=t("p",null,"另外，我强调了故障处理是研发工程师在进阶过程中必须经历的，而故障处理能力也是面试官最为看重的能力之一，所以对于怎么处理各类故障，你要形成一套体系化的知识框架。",-1),Y=t("p",null,"为了方便你的记忆，我将今天的内容总结如下。",-1),v=t("p",null,"最后，留一个话题我们来讨论吧：在你所处了领域中，你设计系统架构时，更关注哪些可用性指标？感谢你的阅读，我们下一讲见。",-1);function K(R,j,w,H,J,Q){const s=_("Image");return i(),e("div",null,[c,u,r,g,A,d,h,m,l(s,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M01/04/84/CioPOWAs3d-AU1jSAAAJ1V9HKdE826.png"}),o(),S,C,P,q,l(s,{alt:"1.png",src:"https://s0.lgstatic.com/i/image6/M00/04/CD/Cgp9HWAuYU2ANzYsAADiIW0-zW8205.png"}),o(),T,l(s,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M01/04/84/CioPOWAs3f-ARcGTAAAKDhhS0CU196.png"}),L,l(s,{alt:"2.png",src:"https://s0.lgstatic.com/i/image6/M00/04/CD/Cgp9HWAuYWyATkxVAABau7vw5jQ035.png"}),o(),b,k,D,l(s,{alt:"3.png",src:"https://s0.lgstatic.com/i/image6/M00/04/CA/CioPOWAuYX-APgb5AABCnrQ8zLc613.png"}),o(),N,E,l(s,{alt:"4.png",src:"https://s0.lgstatic.com/i/image6/M00/04/CA/CioPOWAuYZKAaViEAACdg3MBCqE160.png"}),V,f,I,l(s,{alt:"5.png",src:"https://s0.lgstatic.com/i/image6/M00/04/CD/Cgp9HWAuYaSAOg3MAABlYMloePk508.png"}),o(),M,l(s,{alt:"6.png",src:"https://s0.lgstatic.com/i/image6/M00/04/CA/CioPOWAuYbuAaS3EAAFIiTdJNEg195.png"}),W,O,x,B,U,Y,l(s,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M00/04/84/CioPOWAs3luAbbhpAAEjKaU8JLg460.png"}),v])}const Z=p(a,[["render",K]]);export{z as __pageData,Z as default};
