import{_ as s,j as o,o as a,g as u,k as t,h as r,Q as n}from"./chunks/framework.4e7d56ce.js";const q=JSON.parse('{"title":"为什么要学习 Kubernetes ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/113-Kubernetes 原理剖析与实战应用文档/(4517) 开篇词  如何深入掌握 Kubernete？.md","filePath":"posts/backEnd/113-Kubernetes 原理剖析与实战应用文档/(4517) 开篇词  如何深入掌握 Kubernete？.md","lastUpdated":1696417798000}'),l={name:"posts/backEnd/113-Kubernetes 原理剖析与实战应用文档/(4517) 开篇词  如何深入掌握 Kubernete？.md"},p=n('<p>你好，我是正范，曾任 IBM 资深工程师，目前在国内某一线大厂任架构师。我平时非常喜欢研究工作中遇到的技术难题，积极参与各大开源项目。比如在云原生方面，我深度参与了<a href="http://github.com/kubernetes/kubernetes" target="_blank" rel="noreferrer">Kubernetes</a>、Helm、Prometheus 等开源项目，并贡献了诸多核心代码。</p><h3 id="为什么要学习-kubernetes" tabindex="-1">为什么要学习 Kubernetes <a class="header-anchor" href="#为什么要学习-kubernetes" aria-label="Permalink to &quot;为什么要学习 Kubernetes&quot;">​</a></h3><p>不知道你有没有发现，周围的人在越来越多地谈论容器、Kubernetes，以及云原生。作为云原生的&quot;基石&quot;，Kubernetes 从开源到现在也已经走过了 6 个年头，可以说它的出现推开了云原生的大幕，加速了云原生时代的到来。</p><p>目前，国内诸多大厂都已经在<strong>生产环境</strong> 中<strong>大规模</strong> 使用容器以及Kubernetes，像淘宝双十一、京东618等互联网大促活动，其实很多<strong>核心业务系统</strong>都运行在Kubernetes上。而且，无数中小企业也都在进行业务容器化探索以及云原生化改造。在这场云原生浪潮中，Kubernetes无疑是最重要也绕不开的一个话题。</p><p>掌握 Kubernetes 的人才，自然成为各大公司争抢的对象。国外<a href="https://www.techrepublic.com/article/why-kubernetes-job-searches-grew-by-more-than-2000-in-4-years/" target="_blank" rel="noreferrer">一篇报道</a>称， 2015 到 2019 的短短 4 年时间，Kubernetes 职位搜索频率增长了 2125%，Kubernetes 相关岗位同期增长了 2141%。增长率就是这么夸张和惊人。</p><p>转头再来看国内，不管是阿里、头条这些互联网大厂，还是小米等以硬件为主的厂商，以及快手、Shopee 等后起之秀，都在大量招聘 Kubernetes 相关人才，而且起薪还不低。</p>',6),b=n('<p>（来源：拉勾网 Kubernetes 相关职位）</p><h3 id="如何学习-kubernetes" tabindex="-1">如何学习 Kubernetes <a class="header-anchor" href="#如何学习-kubernetes" aria-label="Permalink to &quot;如何学习 Kubernetes&quot;">​</a></h3><p>但是，Kuberbetes的复杂性以及过于陡峭的学习曲线，对学习和实践者来说是一座高墙，想要学习好、掌握好Kubernetes，并不是一件容易的事情。InfoWorld 曾经发表一篇文章&quot;<a href="https://www.infoworld.com/article/3409980/will-complexity-kill-kubernetes.html" target="_blank" rel="noreferrer">Will complexity kill Kubernetes?</a>&quot;（复杂性会杀死 Kubernetes 吗？），就连大名鼎鼎的出品过 Jira 和代码库 Bitbucket 的 Atlassian 公司都表示：<strong>部署和使用 Kubernetes 的过程没有想象中那么容易，如果打开方式不正确，很容易让自己摔个大跟头</strong>。</p><p>在学习和实践上的难点与困惑，在我看来主要源于以下几点：</p><ul><li><p>网上检索大量资料来学习，往往会一头雾水，找不到正确的切入点；而官方文档像工具书一样晦涩难懂，往往<strong>学起来不得其法，事倍功半。</strong></p></li><li><p>大部分图书更为体系化，但<strong>重理论多于实践</strong>，而实践经验才是帮助你在工作中快速上手，真正落地到自己的项目中的助推剂。</p></li><li><p>自己&quot;硬啃&quot;Kubernetes源码，但这注定是一条非常非常非常难的路。别问我为什么知道，因为我就是这么死磕代码过来的。</p></li></ul><p>事实上，Kubernetes 这样的框架在设计之初就做了很多抽象，更别提还有那么多专有的对象定义了。如果我们不能理顺各个组件工作模式，以及各个对象之间的串联关系，一个个地学习&quot;单点&quot;的理论知识、&quot;硬啃&quot;代码，进步都会比较缓慢。即便是你钻到代码里，也只能是管中窥豹，可见一斑。</p><p>而我自己在实践 Kubernetes 的同时，也为社区贡献了很多代码和功能，可以说对 Kubernetes 在业内各大公司的使用场景都有比较深刻的认识。这几年，我也经常受邀参加 KubeCon 大会发表演讲，分享自己在大厂一线工作的实践经验，通过交流进一步加深了自己对国内外应用情况的了解和看法。</p><p>我希望以先行者的身份，结合实际案例来分享我的经验心得，让你的 Kubernetes 学习探险之路走得更快，也更稳，不只绕过我们踩过的一些&quot;坑&quot;，也能够吸取大家的一些好的学习方法，了解大家的一些最佳实践。</p><h3 id="课程设计" tabindex="-1">课程设计 <a class="header-anchor" href="#课程设计" aria-label="Permalink to &quot;课程设计&quot;">​</a></h3><p>这个课程，从基础入门到使用进阶，从日志监控到安全技巧，再到深入剖析底层运行原理，分 5 个模块，来循序渐进带你构建完整的知识体系：</p><ul><li><p><strong>构建 Kubernetes 体系框架</strong>，介绍 Kubernetes 的前世今生、基本架构，以及设计哲学。通过边看示例边学习的方法，带你高效快速地学会如何搭建满足业务需求的 Kubernetes 集群，让集群搭建不再是难事。最后，我还会通过示例详解 Kubernetes 中最核心的 Pod 对象，以及一些最佳实践。</p></li><li><p><strong>进阶高可用业务</strong>，讲解 Kubernetes 中的一些高级对象，帮助你理解如何部署高可用的业务应用。但这块不限于理论介绍，我将通过可复用的案例为你注入实践思想，你只需结合实际需求稍作修改即将其应用到自己的项目中去。</p></li><li><p><strong>打造系统守护神</strong>，教你围绕 Kubernetes 构建日志和监控系统，让你能够在系统故障时从容应对，同时确保关键指标可追溯、可排查，不放过任何一个细小的疑点，打造高达&quot;5个9&quot;的系统可靠性。</p></li><li><p><strong>构筑安全无忧的系统</strong>，介绍大量 Kubernetes 安全技巧及最佳实践，教你避免 Kuberentes 集群因为误配置导致的风险，比如恶意删除、信息泄漏、资源 OOM（内存溢出） 等，减少整个集群的风险部分。</p></li><li><p><strong>深入实现原理，感受高阶使用技巧</strong>。如果想要针对公司业务扩展新的功能，了解Kubernetes实现原理是必不可少的环节。在这里，我还会通过介绍 CRD 以及 Operator，让你可以&quot;站在巨人的肩膀上&quot;对 Kubernetes 进行&quot;二次&quot;开发，助力未来发展。</p></li></ul><h3 id="适合人群" tabindex="-1">适合人群 <a class="header-anchor" href="#适合人群" aria-label="Permalink to &quot;适合人群&quot;">​</a></h3><p>我希望这个专栏，能够让不同岗位的同学有不同视角下的收获，包括但不限于：</p><ul><li><p><strong>刚接触容器的开发者</strong>：容器底层知识体系比较复杂、晦涩，初学者刚接触很容易头大。因此，我会给你展示一些案例和最佳实践，让你少走弯路，并且解决大多数开发者更为关心的如何&quot;使用好&quot;的问题。</p></li><li><p><strong>运维工程师</strong>：我会结合实践场景，帮你重现运维工作中会遇到的实际案例，帮你提高快速定位问题的能力；同时还会告诉你如何增强集群安全性，保障集群稳定、高效运维。</p></li><li><p><strong>向云原生转型的应用开发者及架构师</strong>：如何进行业务容器化探索以及云原生化改造，是摆在应用开发者以及架构师面前的一个难题。云原生架构相比传统架构，是一个崭新的技术体系，我会告诉你该怎么去设计和改造，为你提供可行的建议和方案。</p></li></ul><h3 id="作者寄语" tabindex="-1">作者寄语 <a class="header-anchor" href="#作者寄语" aria-label="Permalink to &quot;作者寄语&quot;">​</a></h3><p>每一次技术浪潮来临，都有观望者、淘汰者，也有很多人抓住了机会成为乘风破浪的那群人。云计算技术发展迅速的这几年，我们必须承认并面对 Kubernetes 这股浪潮。</p><p>希望这个专栏，可以带你入局，让你不仅掌握 Kubernetes 并能够落地到自己的项目中，还可以感悟一些学习方法。接下来，我们一起更新自己的技术栈，迎接技术带来的新的机遇。</p><p>另外，欢迎你和我交流关于 Kubernetes、云原生的各种话题，或者你实践中的困惑与经验，我在留言区等你。</p>',18);function i(_,c,g,h,K,d){const e=o("Image");return a(),u("div",null,[p,t(e,{alt:"image (5).png",src:"https://s0.lgstatic.com/i/image/M00/45/B0/Ciqc1F9DXw2AbVbEAAUV0CqQDuQ392.png"}),r(),t(e,{alt:"image (6).png",src:"https://s0.lgstatic.com/i/image/M00/45/BB/CgqCHl9DXyGAXmmqAAHDUqw7jCo427.png"}),r(),b])}const k=s(l,[["render",i]]);export{q as __pageData,k as default};
