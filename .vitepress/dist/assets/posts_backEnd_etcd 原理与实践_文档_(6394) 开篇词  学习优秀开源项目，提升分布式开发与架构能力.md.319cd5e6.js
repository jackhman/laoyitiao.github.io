import{_ as p,j as r,o as s,g as d,k as o,h as e,Q as c,s as t}from"./chunks/framework.4e7d56ce.js";const A=JSON.parse('{"title":"开篇词学习优秀开源项目，提升分布式开发与架构能力","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/etcd 原理与实践_文档/(6394) 开篇词  学习优秀开源项目，提升分布式开发与架构能力.md","filePath":"posts/backEnd/etcd 原理与实践_文档/(6394) 开篇词  学习优秀开源项目，提升分布式开发与架构能力.md","lastUpdated":1696417798000}'),n={name:"posts/backEnd/etcd 原理与实践_文档/(6394) 开篇词  学习优秀开源项目，提升分布式开发与架构能力.md"},_=c('<h1 id="开篇词学习优秀开源项目-提升分布式开发与架构能力" tabindex="-1">开篇词学习优秀开源项目，提升分布式开发与架构能力 <a class="header-anchor" href="#开篇词学习优秀开源项目-提升分布式开发与架构能力" aria-label="Permalink to &quot;开篇词学习优秀开源项目，提升分布式开发与架构能力&quot;">​</a></h1><p>你好，我是 aoho（朱荣鑫），曾在美团等一线互联网公司就职，现为源图信息有限公司架构负责人，负责公司整体的系统架构工作。我也是拉勾教育专栏《Go 微服务实战 38 讲》作者，这是我的第 2 个专栏。</p><p>我很早就关注了微服务架构，对云原生、微服务、容器化、分布式中间件等都有过深入的研究，同时带领公司团队从零开始，基于 Kubernetes 搭建较为完善的开发、运维部署和容器调度的平台。目前公司的整体业务都在基于这一套架构运行，这让我在 etcd 作为服务注册与发现中心、分布式键值对存储等场景中，积累了大量的实践经验。</p><h3 id="etcd-在分布式架构和云原生时代的落地" tabindex="-1">etcd 在分布式架构和云原生时代的落地 <a class="header-anchor" href="#etcd-在分布式架构和云原生时代的落地" aria-label="Permalink to &quot;etcd 在分布式架构和云原生时代的落地&quot;">​</a></h3><p>互联网应用经历了从早期单一架构到垂直架构，再到分布式架构的技术发展过程。在业务体系不断发展变化，用户体量和性能要求远非传统行业所能比拟的当下，越来越多的公司跨入了分布式、云原生架构的行列，<strong>分布式架构成为主流趋势</strong>。</p><p>但分布式架构系统面临着一些与生俱来的问题，比如部署复杂、响应时间慢、运维复杂等，其中最根本的是多个节点之间的数据共享问题。面对这个问题，你可以选择自己实现一个可靠的共享存储来同步信息，或者是依赖一个可靠的共享存储服务。</p><p>至于可靠的共享存储服务，etcd 是一个优秀的可选项。etcd 是一款分布式存储中间件，使用 Go 语言编写，并通过 Raft 一致性算法处理和确保分布式一致性，<strong>解决了分布式系统中数据一致性的问题</strong>。</p><p>而且作为一款分布式、可靠的键值存储组件，etcd 常用于微服务架构中的服务注册与发现中心，相较于 ZooKeeper 部署更简单，而且具有数据持久化、支持 SSL 客户端安全认证的独特优势。</p><p>此外，由于 etcd 中涉及了数据一致性、多版本并发控制、watch 监控、磁盘 IO 读写等知识点，深入学习 etcd 可以帮助我们<strong>从开源项目中学习底层原理，进一步提高分布式架构设计的能力</strong>。</p><p>除了分布式架构中的应用，etcd 还是目前非常热门的云原生存储组件，它自 2018 年底作为孵化项目加入 CNCF（云原生计算基金会） ，并于 2020 年 11 月成功毕业。</p><p>我们都知道，上&quot;云&quot;的过程必然是曲折的。以我所在的在线教育行业为例，从原有的单体业务改造到逐步替换成云原生架构，其中花费的人力、时间成本都很大，这不仅与实际的业务复杂度、升级的决心有关，更关乎技术复杂度，在线课程直播场景甚至要求架构实现高性能、高并发和高可用性，这些都远远超出传统单体应用的设计和开发要求。</p><p>etcd 作为云原生架构中重要的基础组件，各个微服务之间通过 etcd 保证调用的可用性和正确性。它的成功，在其他许多知名项目（包括 <strong>Kubernetes、CoreDNS 和 TiKV</strong> 等）也都依赖 etcd 来实现可靠的分布式数据存储上，可见一斑。</p><p>IBM 开放技术高级软件工程师兼 etcd 维护者 Sahdev Zala 也指出：&quot;etcd 在提供分布式键-值存储方面发挥着关键作用。其存储功能不仅具有很高的可用性，而且能够满足大规模 Kubernetes 集群所提出的强一致性要求。&quot;</p><p><strong>etcd 不断提高的普及率、开放的治理、完善的功能成熟度，这使它在云原生时代大放异彩</strong>，也因此被越来越多的公司在系统服务中引入，甚至替代原有的类似组件（如 ZooKeeper、Consul、Eureka 等）。目前，etcd 已被许多公司用于生产，包括阿里巴巴、亚马逊、百度、Google 等。</p><h3 id="为什么有这门课" tabindex="-1">为什么有这门课？ <a class="header-anchor" href="#为什么有这门课" aria-label="Permalink to &quot;为什么有这门课？&quot;">​</a></h3><p>当然，作为分布式开发从业者，你可能会在学习和实践分布式组件的过程中遇到各类问题：</p><ul><li><p>不知道如何进行不同场景下技术组件的选型，比如如何选择对应的分布式组件来实现分布式锁；</p></li><li><p>本身缺少分布式场景的实践环境，知道一些理论概念，但不知道如何深入学习分布式组件；</p></li><li><p>仅仅是了解简单的基础用法，对于深层次的原理缺乏理解，工作中遇到问题不知道从何处开始排查；</p></li><li><p>分布式知识点多且复杂，其中包括进程间通信、文件 IO、数据结构算法和事务并发控制等，对其中的一块不熟悉就容易产生畏难情绪。</p></li></ul><p>遇到这些问题不用担心，就像我在前面提到的，etcd 是分布式和云原生架构下的重要组件，从学习 etcd 开始，在其基础上学习分布式，可以帮助你快速熟悉分布式系统实现的一些细节和原理。</p><p>现如今，企业对分布式开发人才的需求越来越多，通过搜索招聘网站你可以了解到这些岗位都属于稀缺的高薪岗位。正因为这样，掌握相关分布式组件和技能将为你在日常工作和面试晋升的考核中加分，甚至有助于提升你合理设计业务系统架构的能力。</p>',19),l=c('<p>（数据来自拉勾网招聘）</p><p>etcd 作为一个<strong>可信赖的分布式键值存储服务</strong>，它能够为整个分布式集群存储一些关键数据，协助分布式集群的正常运转。而如何正确部署和运维 etcd 集群，并对集群进行优化，以及在开发层面如何正确调用 etcd 客户端 API 接口实现一致性存储等功能，变得越来越重要。</p><p>因此，我和拉勾教育平台一起合作了这门课程，希望带你深入学习 etcd 原理与实战。</p><h3 id="课程设计" tabindex="-1">课程设计 <a class="header-anchor" href="#课程设计" aria-label="Permalink to &quot;课程设计&quot;">​</a></h3><p>本课程从基础知识点到底层原理全面深入地展开介绍，分为 3 个模块，合计 21 讲。</p><p><strong>基础概念与操作篇</strong>：介绍 etcd 是一款什么样的组件、etcd 相关的特性、应用场景、单机和集群部署的方式，还包括了客户端命令行工具的使用，以及 etcd 通信加密 TLS。初步了解 etcd 的这些基本使用，可以为你后面的学习打下基础。</p><p>除此之外，我还将介绍集群的动态重配置、参数调优、故障恢复及 etcd 网关模式等。生产环境中为了高可用，不可能单机部署 etcd 这样的重要组件，因此 etcd 集群的部署和应用非常重要。通过进阶学习 etcd 的这些知识点，会使我们的系统更加健壮。</p><p><strong>etcd 实现原理及关键技术篇</strong>：介绍 etcd 的工作方式及内部实现原理，并重点介绍 etcd 的 etcd-raft 模块、WAL 日志与快照备份、多版本控制 MVCC、backend 存储、事务实现、watch 和 lease 机制等，最后梳理 etcd server 的启动流程，以及如何处理客户端请求。</p><p>通过这一模块的学习，你可以从原理层面深入了解 etcd 的工作机制以及整体架构，同时将有助于你<strong>后续二次开发或者排查遇到的问题</strong>。</p><p><strong>实践案例篇</strong>：在掌握了 etcd 相关知识点的情况下，在应用实践部分我会带你学习 etcd ClientV3 的具体应用，包括如何基于 etcd 实现分布式锁、etcd 主从选举在统一定时任务中的应用，以及如何在微服务中集成 etcd 作为服务注册与发现中心。最后我将带你分析在 Kubernetes 中如何基于 etcd 完成容器的调度。</p><h3 id="讲师寄语" tabindex="-1">讲师寄语 <a class="header-anchor" href="#讲师寄语" aria-label="Permalink to &quot;讲师寄语&quot;">​</a></h3><p>当前，云原生架构逐步成为系统架构的主流，由于可以大大提升产品的开发迭代效率、降低运维和硬件成本，企业要不要上&quot;云&quot;已不再是一个艰难的选择题，而成为必然趋势。etcd 作为分布式架构下的一款优秀组件，在云原生时代更是大放光彩，成为 Kubernetes 平台默认的容器注册与发现组件。</p><p>如果你具有分布式基础，且正在从事分布式系统开发的工作，这个专栏的内容很适合你学习；对于微服务开发者、分布式系统的架构师和运维人员，特别是基于 etcd 进行相关实践的工程师来说，你将因此在工作中获益；而对云原生架构感兴趣的同学，也可以在这里领悟分布式系统的原理与实践。</p><p>我希望你通过 etcd 学习分布式组件的 &quot;道&quot;，掌握学习之道会在你后续的自我提升中发挥长期价值。无论在将来的面试还是开发中，你都能够切中分布式系统开发的要点，将原理和应用结合起来，充分体现个人的核心竞争力，更好地实现个人价值。</p><p>教学相长，希望在 etcd 以及分布式开发的学习成长过程中，我们一起进步！我在留言区等你。</p><hr><p>[</p>',17),i=t("p",null,[e("]("),t("a",{href:"https://shenceyun.lagou.com/t/Mka",target:"_blank",rel:"noreferrer"},"https://shenceyun.lagou.com/t/Mka"),e(")")],-1),h=t("p",null,[t("a",{href:"https://shenceyun.lagou.com/t/Mka",target:"_blank",rel:"noreferrer"},"拉勾背书内推 + 硬核实战技术干货，帮助每位 Java 工程师达到阿里 P7 技术能力。点此链接，快来领取！")],-1);function g(u,m,b,q,f,k){const a=r("Image");return s(),d("div",null,[_,o(a,{alt:"image.png",src:"https://s0.lgstatic.com/i/image2/M01/0A/2D/Cip5yGARCX6ABXLKAACL88OqmTI483.png"}),e(),l,o(a,{alt:"java_高薪训练营.png",src:"https://s0.lgstatic.com/i/image/M00/8B/BD/Ciqc1F_gEFiAcnCNAAhXSgFweBY589.png"}),e(),i,h])}const T=p(n,[["render",g]]);export{A as __pageData,T as default};
