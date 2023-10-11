import{_ as a,D as r,o as n,g as P,J as o,h as e,Q as p}from"./chunks/framework.f67d7268.js";const h=JSON.parse('{"title":"开篇词提效工具or耗能摆设？落地APM要做好这三点","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/应用性能分析实战_文档/(7049) 开篇词  提效工具 or 耗能摆设？落地 APM 要做好这三点.md","filePath":"posts/backEnd/应用性能分析实战_文档/(7049) 开篇词  提效工具 or 耗能摆设？落地 APM 要做好这三点.md","lastUpdated":1696682708000}'),A={name:"posts/backEnd/应用性能分析实战_文档/(7049) 开篇词  提效工具 or 耗能摆设？落地 APM 要做好这三点.md"},s=p('<h1 id="开篇词提效工具or耗能摆设-落地apm要做好这三点" tabindex="-1">开篇词提效工具or耗能摆设？落地APM要做好这三点 <a class="header-anchor" href="#开篇词提效工具or耗能摆设-落地apm要做好这三点" aria-label="Permalink to &quot;开篇词提效工具or耗能摆设？落地APM要做好这三点&quot;">​</a></h1><p>你好，我是赵禹光，欢迎来到我的《应用性能分析实战》专栏。正式开讲前，我先介绍一下我自己，以及我们这个专栏的主角 APM。</p><p>我是贝壳找房 APM 架构师，目前在贝壳找房从事了三年的 APM 研发工作。我从 0 到 1 设计搭建的 APM 平台，在贝壳找房内部监控着数千个应用服务，并支撑着二手房、新房、租房、装修等多个核心业务线。</p><p>这套 APM 系统线上接入了近万个应用节点，并实现了快速定位、准确定位的目标：50% 故障在 5 分钟内能被定位、诊断，80% 故障在 10 分钟内便能定位、收敛至 1 个责任团队。</p><h3 id="微服务时代-你必须学会高阶工具" tabindex="-1">微服务时代，你必须学会高阶工具 <a class="header-anchor" href="#微服务时代-你必须学会高阶工具" aria-label="Permalink to &quot;微服务时代，你必须学会高阶工具&quot;">​</a></h3><p>说到 APM，可能你会感到陌生。但提到 SkyWalking、CAT 等分布式链路追踪利器，你一定会有所了解。而这些利器都有一个统一的名字，那就是 APM（Application Performance Management），也称应用性能分析系统。</p><p>从宏观（应用领域）角度看：面向解决产品（对用户）体验不好的行为，都可以称为 APM 系统。因此 APM 涉及的范畴非常广泛，大到专栏 Part 1 所讲述的 APM 各个领域的优秀开源产品，小到一线开发人员通过规范应用日志来提升定位问题的效率，都是在进行 APM 系统的建设。</p><p><strong>由此可见，APM 是工具，却又不限于工具本身，其背后有许多高阶方法论、技能、思想值得学习。</strong></p><p>从微观（业务作用）角度看：APM 可以根据一个机器节点打印的 TraceId，回看这个请求在所有微服务集群的流转信息；当一个服务节点出现性能问题时，它不仅可以快速定位出自身哪些资源故障引发了这个问题，还可以诊断出由此又引起了哪些上下游问题。</p><p>相比传统的查日志等方式，它最大的不同就是<strong>提效，让参与产品建设的每一个开发者都具备定位全局的能力</strong>。尤其在这个微服务时代，对以下角色赋能尤为突出。</p><ul><li><p><strong>一线开发</strong>：每周定期值班时，不可避免会遇到问题定位、故障修复等问题。具备 APM 技能可以让你排查性能问题的能力发生质的飞跃；闲暇之余，将自己使用 APM 的定位经验总结出方法论，不仅是自己的实践总结，更是自身具备高维能力的证明，可以在面试晋升时先人一步。</p></li><li><p><strong>业务负责人</strong>：每个业务线负责人都想保证&quot;四个九&quot;，乃至&quot;五个九&quot;的高可用，换言之就是保障基本服务没有问题，一旦出了问题能快速解决问题。那动员团队学习 APM 再合适不过了，APM 不仅仅有各个维度的指标，便于检测线上服务的运行状况；更能在问题发生时，具备全链路追踪和在线剖析问题的能力。</p></li></ul><p><strong>所以对于你来说，学习高阶工具不仅在于提效，更在于能在学习过程中，了解更新的思想、更先进的理念，能对业务问题有更深刻的认知。从而在每次弯道超车时，都能知他人之不懂，擅他人不所长。</strong></p><p>那么，关于 APM 及其背后的性能定位、分布式链路追踪，你对它们的了解有多深呢？下面我来看一下它们的应用情况和学习方法。</p><h3 id="apm-不会用、不好用" tabindex="-1">APM 不会用、不好用？ <a class="header-anchor" href="#apm-不会用、不好用" aria-label="Permalink to &quot;APM 不会用、不好用？&quot;">​</a></h3><p>APM 对追踪、定位性能问题非常高效，但在许多公司却面临着被&quot;架空&quot;的情况，为什么呢？</p><ul><li><p>APM 的学习门槛较高；</p></li><li><p>APM 系统落地公司业务时容易&quot;水土不服&quot;。</p></li></ul><p>两者共同导致了对 APM &quot;不会用，不好用&quot; 的误解，下面我结合业务场景再解释一下。</p><p>APM 系统与其他系统有一个本质上的差异，比如大多只有在线上应用服务出现问题时才会被使用，但一开始企业很难意识到这点。所以，很多企业就把各大 APM 产品在线上通通部署了一套，认为只要针对场景部署相应的 APM 系统，线上服务就具备了&quot;银弹&quot;，一次投入终身受益。</p><blockquote><p>例如：企业进行微服务化改造后，发现定位分布式问题更加困难了，那就部署分布性链路跟踪系统 SkyWalking；一线程序员反馈线上定位问题困难，就部署在线剖析工具 Arthas；发现流量管控存在缺失，就部署 Sentinel。</p></blockquote><p>但我们忘了这么一点，即每个企业的产品体系，以及所衍生出的服务架构千差万别，而 APM 在不同场景、不同业务下会需要不同的标准、监控指标/对象、虚拟环境和工具，也就容易在落地过程中导致&quot;水土不服&quot;了。</p><p>APM &quot;<strong>不好用</strong>&quot;的局面也是这样发生的：全体动员部署后，由于没有系统学习，一线程序员都没得到相应的技能，让定位问题变得更困难。而能够主导解决的更是凤毛麟角，导致怨声一片。</p><p>再加上 APM 并不是个可以立刻上手的工具，而是个<strong>稍有学习门槛</strong> 的系统。如果只部署，不演练，团队整体都忽视对 APM 系统的学习，APM 就会逐渐成为<strong>耗费进程性能的摆设</strong>。</p><p>刚加入贝壳时，我们也遇到过这种坑。那时，我也是埋头苦干研发 APM，但很快就发现收效甚微，经过问卷调查，发现原来许多一线开发者完全不知道我的团队在做什么。出现问题收到报警时，很多一线开发者还是用很原始的方式（如搜日志）去定位问题，导致整体投入产出比非常低，同时也浪费了资源。</p><p><strong>对&quot;工具&quot;的放弃，是对&quot;低效&quot;的一次妥协，那么应该如何破局，掌握好 APM 这一高效工具呢？其实非常简单，这里我先给出以下三个要点。</strong></p><ul><li><p><strong>找到最短、最高效的学习路径</strong>。直接从原理、实践角度学习最主流、好用的 APM 工具，而不要去&quot;啃&quot;官方使用文档和解析源码。</p></li><li><p><strong>不止步&quot;会用&quot;，更要让工具&quot;好用&quot;</strong>。你可以通过了解 APM 协议、数据，以及关键模块落地实战，解决 APM 落地业务时的&quot;水土不服&quot;问题。</p></li><li><p><strong>工具之外，业务之内</strong>。通过学会使用、改造 APM 工具，了解其背后的性能定位、分布式链路追踪技能。</p></li></ul><p>我知道即使有了方法，但没有领路人提供资源和道具，学习之旅也很难进行下去。所以，接下来就看看我为你打造的全套 APM 落地秘籍吧。</p><h3 id="apm-落地秘籍" tabindex="-1">APM 落地秘籍 <a class="header-anchor" href="#apm-落地秘籍" aria-label="Permalink to &quot;APM 落地秘籍&quot;">​</a></h3><p>该专栏，意在交付给你一套通用的 APM 方法论，适用于 APM 产品在绝大多数企业的落地，而非仅限于某种领域的某种 APM 产品。</p><p>我会从最主流的七大 APM 产品入手，从产品开始盘点，到 APM 工具的设计思想与设计原则，带你由浅入深掌握工具的使用与落地，然后再进行关键功能落地和 APM 软技能进阶。</p><p><strong>Part 1. APM 产品落地实战</strong></p><p>工具是 APM 的基础和重点，我会讲述各个 APM 领域 TOP 1 的开源产品。无论是现在走在前沿、社区非常强大的，还是企业背书，迭代较慢但存量较大的 APM 工具，我都会详解其产品功能、业务特色，及其学习路径和落地方法。让你在线上问题出现时，能不犹豫地选择适当工具剖析问题，定位故障。</p>',31),M=p('<p><strong>Part 2. 不读源码学原理</strong></p><p>很多开发者奉行&quot;源码面前无秘密&quot;，面对消息队列、RPC 框架等业务强依赖组件，确实需要不停地精进源码；但对于学习 APM，解读源码只会浪费时间，它更需要你懂原理和标准，然后横向对比同类的技术实现，有章法地根据自身特点进行落地实践。</p><p>像线程追踪模型、Opentracing 的设计、无侵入实现等这些 APM 核心原理，大量文献处在外文翻译、源码行级解读的阶段，这对初中级工程师难度极大。所以如果直接上手这些知识，只会让你更&quot;云里雾里&quot;。所以，我将以 SkyWalking 和 Sentinel 核心作者的视角，带你&quot;不读源码学原理&quot;，发掘设计思想的意义，高维度学习源码。</p><p><strong>Part 3. APM 协议与数据精讲</strong></p><p>原理的设计都是基于<strong>标准</strong>的，有了标准才能有更多人共同参与生态建设。所以，我会讲解通用的规范化日志标准、跨语言协议标准、监控数据的存储模型标准，及其有代表性的标准实现。</p><p>通过对标准的学习，你会发现百花齐放的 APM 工具实则如出一辙，以后再学习新的 APM 工具时，一点也不费劲了。并能够巧妙结合多个 APM 工具，对问题场景打出&quot;组合拳&quot;，实现 1+1&gt;2 的效应，避免眉毛胡子一把抓的状况。</p><p><strong>Part 4. 关键功能落地</strong></p><p>开源的 APM 产品都是在预想场景下解决通用问题，所以针对 APM 特定模块的二次开发和自建也在所难免，这也是&quot;水土不服&quot;问题的高发区。</p><p>基于我多年经验以及与社区伙伴的大量讨论分享，我挑选以下 4 个关键功能进行讲解：采样设计，实现数据的低损耗、高收集；BI 监控，指导应用场景的快速落地；链路训练，让开发者具备分布式问题定位能力；望火楼建设，对故障资产进行持续积累。这些场景是企业落地 APM 的必经之路，也是影响一线开发业务进展的关键所在。</p><p><strong>Part 5. APM 软技能提升</strong></p><p>硬实力要发挥出来，绝对离不开与之相应的软实力。通过这部分内容，我将讲解排查故障时固定套路的&quot;三板斧&quot;招式，让你在排查故障时更有头绪；我还将通过几个非典型的监控实例带你高维思考，彻底参透 OpenTracing；最后，一起展望开放分布式追踪及 APM 的未来，在趋势到来之前做好备战。</p><p>换一种思考角度实现 之前那些无处不在的 OpenTracing 难题。</p><h3 id="讲师寄语" tabindex="-1">讲师寄语 <a class="header-anchor" href="#讲师寄语" aria-label="Permalink to &quot;讲师寄语&quot;">​</a></h3><p>这一专栏的主题是 APM 这个性能监控系统，但我想交付你的绝不是工具本身，而是 APM 背后彻底颠覆我们解决线上问题的思考方式。过去三年对 APM 的落地探究，至少对我来讲是受益良多的，无论是技术视野、提效能力、社区影响力都上了一个台阶。</p><p>一个人可能走得很快，但一群人必然走得更远。在这里，我们一起学习讨论 APM 的发展趋势、设计理念、落地实践和经验心得，让 APM 落地到每位 RD 的内心。</p><p>最后希望这个《应用性能分析实战》专栏，能够帮助更多 APM 使用者，拨云见日，成为解决问题的专家，实现解决问题的正向循环。</p>',16);function _(i,l,u,g,q,c){const t=r("Image");return n(),P("div",null,[s,o(t,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/27/BC/CioPOWBdpX2AGGVvAAMJn3ATN2U215.png"}),e(),M,o(t,{alt:"应用性能分析实战金句-开篇词.png",src:"https://s0.lgstatic.com/i/image6/M00/29/AE/Cgp9HWBhkMWAK31sAAE7pLNtneE876.png"})])}const m=a(A,[["render",_]]);export{h as __pageData,m as default};
