import{_ as o,j as s,o as l,h as n,k as a,f as e,Q as d,s as t}from"./chunks/framework.d3daa342.js";const W=JSON.parse('{"title":"01核心概念：etcd到底是一款什么样的组件？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/etcd 原理与实践_文档/(6395) 01  核心概念：etcd 到底是一款什么样的组件？.md","filePath":"posts/backEnd/etcd 原理与实践_文档/(6395) 01  核心概念：etcd 到底是一款什么样的组件？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/etcd 原理与实践_文档/(6395) 01  核心概念：etcd 到底是一款什么样的组件？.md"},p=d('<h1 id="_01核心概念-etcd到底是一款什么样的组件" tabindex="-1">01核心概念：etcd到底是一款什么样的组件？ <a class="header-anchor" href="#_01核心概念-etcd到底是一款什么样的组件" aria-label="Permalink to &quot;01核心概念：etcd到底是一款什么样的组件？&quot;">​</a></h1><p>近几年，云原生越来越火，你在各种大会或博客的标题里都可以见到&quot;云原生&quot;的字样，我们这次要学习的 etcd 也是云原生架构中重要的基础组件，因为etcd 项目是 Kubernetes 内部的一大关键组件，目前有很多项目都依赖 etcd 进行可靠的分布式数据存储。</p><p>etcd 是 CoreOS 团队于 2013 年 6 月发起的开源项目，2018 年底正式加入云原生计算基金会（CNCF）。etcd 组件基于 Go 语言实现，目前最新版本为 V3.4.9。</p><h3 id="为什么需要-etcd" tabindex="-1">为什么需要 etcd <a class="header-anchor" href="#为什么需要-etcd" aria-label="Permalink to &quot;为什么需要 etcd&quot;">​</a></h3><p>在具体讲解 etcd 前，我们还是先谈谈分布式系统存在的问题。</p><p>从本质上来讲，云原生中的微服务应用属于分布式系统的一种落地实践。在分布式环境中，由于网络的复杂性、不确定性以及节点故障等情况，会产生一系列的问题。最常见的、最大的难点就是<strong>数据存储不一致</strong>的问题，即多个服务实例自身的数据或者获取到的数据各不相同。因此我们需要基于一致性的存储组件构建可靠的分布式系统。</p><h4 id="分布式中的-cap-理论" tabindex="-1">分布式中的 CAP 理论 <a class="header-anchor" href="#分布式中的-cap-理论" aria-label="Permalink to &quot;分布式中的 CAP 理论&quot;">​</a></h4><p>CAP 原理是描述分布式系统下节点数据同步的基本定理，分别指<strong>Consistency（一致性）、Availability（可用性）和 Partition tolerance（分区容错性）</strong>，这三个要素最多只能同时实现两点，不能三者兼顾。</p><p>基于分布式系统的基本特质，P（分区容错性）是必须要满足的，所以接下来需要考虑满足 C（一致性）还是 A（可用性）。</p><p>在类似银行之类对金额数据要求强一致性的系统中，要优先考虑满足数据一致性；而在大众网页之类的系统中，用户对网页版本的新旧不会有特别的要求，在这种场景下服务可用性会高于数据一致性。</p><p>了解了分布式系统中的问题，接下来让我们结合官网中的定义，看看为什么在分布式系统中需要 etcd？</p><h4 id="etcd-是什么" tabindex="-1">etcd 是什么 <a class="header-anchor" href="#etcd-是什么" aria-label="Permalink to &quot;etcd 是什么&quot;">​</a></h4><p>根据 <a href="https://etcd.io/" target="_blank" rel="noreferrer">etcd 官网</a>的介绍，我找到了如下定义：</p><blockquote><p>A highly-available key value store for shared configuration and service discovery.</p><p>即一个用于配置共享和服务发现的键值存储系统。</p></blockquote>',14),i=t("p",null,"从定义上你也可以发现，etcd 归根结底是一个存储组件，且可以实现配置共享和服务发现。",-1),_=t("p",null,[e("在分布式系统中，各种服务配置信息的管理共享和服务发现是一个很基本也是很重要的问题，无论你调用服务还是调度容器，都需要知道对应的服务实例和容器节点地址信息。etcd 就是这样一款"),t("strong",null,"实现了元数据信息可靠存储的组件"),e("。")],-1),h=t("p",null,[t("strong",null,"etcd 可集中管理配置信息"),e("。服务端将配置信息存储于 etcd，客户端通过 etcd 得到服务配置信息，etcd 监听配置信息的改变，发现改变通知客户端。")],-1),g=t("p",null,"而 etcd 满足 CAP 理论中的 CP（一致性和分区容错性） 指标，由此我们知道，etcd 解决了分布式系统中一致性存储的问题。",-1),u=t("h3",{id:"etcd-中常用的术语",tabindex:"-1"},[e("etcd 中常用的术语 "),t("a",{class:"header-anchor",href:"#etcd-中常用的术语","aria-label":'Permalink to "etcd 中常用的术语"'},"​")],-1),A=t("p",null,"为了我们接下来更好地学习 etcd，我在这里给你列举了常用的 etcd 术语，尽快熟悉它们也会对接下来的学习有所助益。",-1),m=d('<p>下面我们具体了解一下 etcd 的相关特性、架构和使用场景。</p><h3 id="etcd-的特性" tabindex="-1">etcd 的特性 <a class="header-anchor" href="#etcd-的特性" aria-label="Permalink to &quot;etcd 的特性&quot;">​</a></h3><p>etcd 可以用来构建高可用的分布式键值数据库，总结来说有如下特点。</p><ul><li><p><strong>简单</strong>：etcd 的安装简单，且为用户提供了 HTTP API，使用起来也很简单。</p></li><li><p><strong>存储</strong>：etcd 的基本功能，数据分层存储在文件目录中，类似于我们日常使用的文件系统。</p></li><li><p><strong>Watch 机制</strong>：Watch 指定的键、前缀目录的更改，并对更改时间进行通知。</p></li><li><p><strong>安全通信</strong>：支持 SSL 证书验证。</p></li><li><p><strong>高性能</strong>：etcd 单实例可以支持 2K/s 读操作，官方也有提供基准测试脚本。</p></li><li><p><strong>一致可靠</strong>：基于 Raft 共识算法，实现分布式系统内部数据存储、服务调用的一致性和高可用性。</p></li></ul><p>etcd 是一个实现了分布式一致性键值对存储的中间件，支持跨平台，拥有活跃用户的技术社区。etcd 集群中的节点基于 Raft 算法进行通信，Raft 算法保证了微服务实例或机器集群所访问的数据的可靠一致性。</p><p>在分布式系统或者 Kubernetes 集群中，etcd 可以<strong>作为服务注册与发现和键值对存储组件</strong>。不管是简单应用程序，还是复杂的容器集群，都可以很方便地从 etcd 中读取数据，满足了各种场景的需求。</p><h3 id="etcd-的应用场景" tabindex="-1">etcd 的应用场景 <a class="header-anchor" href="#etcd-的应用场景" aria-label="Permalink to &quot;etcd 的应用场景&quot;">​</a></h3><p>etcd 在稳定性、可靠性和可伸缩性上表现极佳，同时也为云原生应用系统提供了协调机制。etcd 经常用于服务注册与发现的场景，此外还有键值对存储、消息发布与订阅、分布式锁等场景。</p><ul><li><strong>键值对存储</strong></li></ul><p>etcd 是一个用于<strong>键值存储</strong>的组件，存储是 etcd 最基本的功能，其他应用场景都建立在 etcd 的可靠存储上。比如 Kubernetes 将一些元数据存储在 etcd 中，将存储状态数据的复杂工作交给 etcd，Kubernetes 自身的功能和架构就能更加稳定。</p><p>etcd 基于 Raft 算法，能够有力地保证分布式场景中的一致性。各个服务启动时注册到 etcd 上，同时为这些服务配置键的 TTL 时间。注册到 etcd 上面的各个服务实例通过心跳的方式定期续租，实现服务实例的状态监控。</p><ul><li><strong>消息发布与订阅</strong></li></ul><p>在分布式系统中，服务之间还可以通过消息通信，即消息的发布与订阅，如下图所示：</p>',13),C=t("p",null,"消息发布与订阅流程图",-1),P=t("p",null,"通过构建 etcd 消息中间件，服务提供者发布对应主题的消息，消费者则订阅他们关心的主题，一旦对应的主题有消息发布，就会产生订阅事件，消息中间件就会通知该主题所有的订阅者。",-1),f=t("ul",null,[t("li",null,[t("strong",null,"分布式锁")])],-1),b=t("p",null,"分布式系统中涉及多个服务实例，存在跨进程之间资源调用，对于资源的协调分配，单体架构中的锁已经无法满足需要，需要引入分布式锁的概念。etcd 基于 Raft 算法，实现分布式集群的一致性，存储到 etcd 集群中的值必然是全局一致的，因此基于 etcd 很容易实现分布式锁。",-1),k=t("h3",{id:"etcd-的核心架构",tabindex:"-1"},[e("etcd 的核心架构 "),t("a",{class:"header-anchor",href:"#etcd-的核心架构","aria-label":'Permalink to "etcd 的核心架构"'},"​")],-1),V=t("p",null,"etcd 作为一个如此重要的部件，我们只有深入理解其架构设计才能更好地学习。下面还是先来看看 etcd 总体的架构图。",-1),T=d('<p>etcd 总体架构图</p><p>从上图可知，etcd 有 etcd Server、gRPC Server、存储相关的 MVCC 、Snapshot、WAL，以及 Raft 模块。</p><p>其中：</p><ul><li><p>etcd Server 用于对外接收和处理客户端的请求；</p></li><li><p>gRPC Server 则是 etcd 与其他 etcd 节点之间的通信和信息同步；</p></li><li><p>MVCC，即多版本控制，etcd 的存储模块，键值对的每一次操作行为都会被记录存储，这些数据底层存储在 BoltDB 数据库中；</p></li><li><p>WAL，预写式日志，etcd 中的数据提交前都会记录到日志；</p></li><li><p>Snapshot 快照，以防 WAL 日志过多，用于存储某一时刻 etcd 的所有数据；</p></li><li><p>Snapshot 和 WAL 相结合，etcd 可以有效地进行数据存储和节点故障恢复等操作。</p></li></ul><p>虽然 etcd 内部实现机制复杂，但对外提供了简单的 API 接口，方便客户端调用。我们可以通过<strong>etcdctl 客户端命令行</strong> 操作和访问 etcd 中的数据，或者通过<strong>HTTP API</strong>接口直接访问 etcd。</p><p>etcd 中的数据结构很简单，它的数据存储其实就是键值对的有序映射。etcd 还提供了一种键值对监测机制，即 Watch 机制，客户端通过订阅相关的键值对，获取其更改的事件信息。Watch 机制实时获取 etcd 中的增量数据更新，使数据与 etcd 同步。</p><p>etcd 目前有 V2.x 和 V3.x 两个大版本。etcd V2 和 V3 是在底层使用同一套 Raft 算法的两个独立应用，但相互之间实现原理和使用方法上差别很大，接口不一样、存储不一样，两个版本的数据互相隔离。</p><p>至于由 etcd V2 升级到 etcd V3 的情况，原有数据只能通过 etcd V2 接口访问，V3 接口创建的数据只能通过新的 V3 的接口访问。我们的专栏重点讲解<strong>当前常用且主流的 V3 版本</strong>。</p><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3><p>这一讲我主要介绍了 etcd 相关的概念。关于 etcd 你需要记住以下三点：</p><ul><li><p>etcd 是云原生架构中的存储基石，可以有效保证存储数据的一致性和可靠性；</p></li><li><p>etcd 内部实现机制复杂，但是对外提供了简单直接的 API 接口；</p></li><li><p>使用 etcd 的常见分布式场景包括键值对存储、服务注册与发现、消息订阅与发布、分布式锁等。</p></li></ul>',11),q=t("p",null,"下一讲我将开始讲解 etcd 的安装部署，手把手教你玩转 etcd 搭建。",-1),S=t("p",null,"在学习今天的内容之前，你有没有使用过 etcd，你理解的 etcd 功能是什么样的？欢迎你在留言区和我分享。",-1),R=t("hr",null,null,-1),v=t("p",null,"[",-1),x=t("p",null,[e("]("),t("a",{href:"https://shenceyun.lagou.com/t/Mka",target:"_blank",rel:"noreferrer"},"https://shenceyun.lagou.com/t/Mka"),e(")")],-1),I=t("p",null,[t("a",{href:"https://shenceyun.lagou.com/t/Mka",target:"_blank",rel:"noreferrer"},"拉勾背书内推 + 硬核实战技术干货，帮助每位 Java 工程师达到阿里 P7 技术能力。点此链接，快来领取！")],-1);function M(N,D,B,E,y,K){const c=s("Image");return l(),n("div",null,[p,a(c,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image2/M01/0A/30/CgpVE2ARCbqAU6OoAADfCRp3xrM594.png"}),e(),i,_,h,g,u,A,a(c,{alt:"Lark20210127-143306.png",src:"https://s0.lgstatic.com/i/image/M00/92/44/CgqCHmARCcmANlKJAAHkVwh99Nk525.png"}),e(),m,a(c,{alt:"Lark20210127-143312.png",src:"https://s0.lgstatic.com/i/image/M00/92/44/CgqCHmARCdyAckB8AADPPIJvk8M166.png"}),e(),C,P,f,b,k,V,a(c,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/92/39/Ciqc1GARCeeAadU3AAAioFsPKBs142.png"}),e(),T,a(c,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image2/M01/0A/30/CgpVE2ARCfKAXv9_AAHI9IPYpzA635.png"}),e(),q,S,R,v,a(c,{alt:"java_高薪训练营.png",src:"https://s0.lgstatic.com/i/image/M00/8B/BD/Ciqc1F_gEFiAcnCNAAhXSgFweBY589.png"}),e(),x,I])}const H=o(r,[["render",M]]);export{W as __pageData,H as default};
