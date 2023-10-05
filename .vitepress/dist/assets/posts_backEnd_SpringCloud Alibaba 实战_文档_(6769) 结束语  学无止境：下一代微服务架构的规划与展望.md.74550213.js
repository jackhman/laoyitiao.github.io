import{_ as p,j as n,o,g as t,k as l,h as e,s as i,Q as r}from"./chunks/framework.4e7d56ce.js";const T=JSON.parse('{"title":"Spring Cloud Alibaba 的构成 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/SpringCloud Alibaba 实战_文档/(6769) 结束语  学无止境：下一代微服务架构的规划与展望.md","filePath":"posts/backEnd/SpringCloud Alibaba 实战_文档/(6769) 结束语  学无止境：下一代微服务架构的规划与展望.md","lastUpdated":1696417798000}'),s={name:"posts/backEnd/SpringCloud Alibaba 实战_文档/(6769) 结束语  学无止境：下一代微服务架构的规划与展望.md"},_=i("p",null,"终于到了课程的最后一讲，本讲我们将对整个微服务架构和 Spring Cloud Alibaba 进行总结和展望。Spring Cloud Alibaba 是优秀的国产微服务架构解决方案，在基于 Spring Cloud 的基础上，提供了更多可用组件和更优秀的产品设计。咱们先来回顾本课程讲解的重要内容，再去展望下一代微服务架构的发展。",-1),c=i("h3",{id:"spring-cloud-alibaba-的构成",tabindex:"-1"},[e("Spring Cloud Alibaba 的构成 "),i("a",{class:"header-anchor",href:"#spring-cloud-alibaba-的构成","aria-label":'Permalink to "Spring Cloud Alibaba 的构成"'},"​")],-1),d=i("p",null,"Spring Cloud Alibaba 是国产的微服务开发一站式解决方案，与原有 Spring Cloud 兼容的同时对微服务生态进行扩展，通过添加少量的配置注解，便可实现更符合国情的微服务架构。",-1),S=r('<p>Spring Cloud Alibaba 生态</p><p>下面我们按学习顺序依次来梳理 Spring Cloud Alibaba 的核心组件。</p><ol><li><p>注册/配置中心 Nacos：Nacos 是 Spring Cloud Alibaba 最重要的组件，它提供了一组简单易用的特性集，帮助我们快速实现动态服务发现、服务配置、服务元数据及流量管理，可以说没有 Nacos 就没有 Spring Cloud Alibaba。</p></li><li><p>负载均衡 Netflix Ribbon：Netfilx Ribbon 是 Netflix 公司开源的一个负载均衡组件，属于客户端负载均衡器。目前 Ribbon 已被 Spring Cloud 官方技术生态整合，运行时以 SDK 形式内嵌到每一个微服务实例中，为微服务间通信提供负载均衡与高可用支持。</p></li><li><p>服务间通信 OpenFeign：OpenFeign 是在 Netflix Feign 的基础上进行封装，结合原有 Spring MVC 的注解，对 Spring Cloud 微服务间 RESTful 通信提供了良好的支持。</p></li><li><p>RPC 调用 Dubbo：作为 Alibaba 著名的 RPC 框架，提供了客户端/服务端结构的跨进程 RPC 二进制通信方案。</p></li><li><p>API 网关 Spring Cloud Gateway：Spring Cloud Gateway 是 Spring 自己开发的新一代 API 网关产品。Spring Cloud Gateway 在保持了简单高效的同时，也拥有良好的扩展性，提供了动态路由、修改请求响应等高级特性。</p></li><li><p>系统保护 Sentinel：Sentinel 以流量为切入点，从流量控制、熔断降级、系统负载保护等多个维度保护服务的稳定性。Sentinel 的典型特点有：支持超高并发场景、内置实时监控、广泛的开源生态与完善的扩展机制，这一切使得我们可以在代价极小的前提下低侵入的整合各项系统保护功能。</p></li><li><p>链路追踪 Sleuth &amp; Zipkin：在 Spring Cloud 标准生态下内置了 Sleuth 这个组件，它通过扩展 Logging 日志的方式实现微服务的链路追踪，而 Zipkin 是推特的一个开源项目，它能收集各个服务实例上的链路追踪数据并可视化展现。</p></li><li><p>APM 性能监控 SkyWalking：SkyWalking 是中国人吴晟（华为）开源的应用性能管理系统（APM）工具，使用 Java 语言开发，现在已属于 Apache 旗下顶级开源项目。SkyWalking 提供了分布式追踪、服务网格遥测分析、度量聚合和可视化一体化解决方案。相比 Sleuth &amp; Zipkin 方案，SkyWalking 基于 Java Agent 技术可以从更多监控点获取数据，生成更详细的监控图表，无论是设计还是 UI 界面 SkyWalking 更为优秀。</p></li><li><p>分布式事务 Seata：Alibaba Seata 是开源的分布式事务解决方案，致力于在微服务架构下提供高性能和简单易用的分布式事务服务。最新版本已迭代到 1.4.0。Seata 内置了 AT、TCC 与 Saga 模式实现不同场景的分布式事务，其中 AT 是 Seata 首选模式，通过自动生成反向 SQL 配合 TC 实现分布式事务的最终一致性。</p></li><li><p>消息队列 RocketMQ：RocketMQ 是一款分布式消息队列中间件，RocketMQ 最初设计是为了满足阿里巴巴自身业务对异步消息传递的需要，在 3.X 版本后正式开源并捐献给Apache，目前已孵化为 Apache 顶级项目。RocketMQ 经历过多次双11的考验，从可靠性到性能都能满足绝大多数系统对于异步消息可靠性投递的需求。</p></li></ol><p>以上 10 个组件是 Spring Cloud Alibaba 在微服务架构落地过程中的技术选型，我们可以根据项目实际情况进行取舍。</p><p>在课程的后半部分，我们还介绍了一些微服务架构的成熟经验，比如：微服务架构中的多级缓存设计、老项目升级到微服务的重构策略、基于网关的统一用户认证方案、微服务架构下的数据一致性解决方案、微服务与DevOps方案。希望这些实战经验可以为你的工作提供一些帮助。</p><p>在本文的结尾，咱们有必要进行一下技术展望，了解下一代微服务架构：服务网格 Service Mesh 到底是什么？</p><h3 id="服务网格-service-mesh" tabindex="-1">服务网格 Service Mesh <a class="header-anchor" href="#服务网格-service-mesh" aria-label="Permalink to &quot;服务网格 Service Mesh&quot;">​</a></h3><p>目前，以 Spring Cloud 为代表的微服务开发框架非常普及和受欢迎。然而基于这些传统微服务框架构建的应用系统在享受其优势的同时，痛点也越加明显。这些痛点包括但不限于以下几点：侵入性强、升级成本高、版本碎片化、组件繁多、学习门槛高等。</p><p>为了解决以上这些问题，2017 年，随着 Linkerd 的传入，Service Mesh 进入国内社区的视野，并且翻译为&quot;服务网格&quot;。</p><p>服务网格从总体架构上来讲比较简单，服务网格是一个专用的基础设施层，旨在&quot;在微服务架构中实现可靠、快速和安全的服务间调用&quot;。服务网格通过部署独立的代理程序，屏蔽微服务底层的网络复杂度，实现服务间通信的简化。在典型的服务网格中，这些代理作为一个 sidecar（边车）被注入每个服务部署中。微服务间通信时，不再直接产生通信，而是由 sidecar 代理转发，通信过程中的复杂度被 Sideca r进行封装，使用者无须过多关注通信细节就能实现服务间数据传递。</p>',10),g=i("p",null,"Service Mesh Sidecar",-1),b=i("p",null,"相比当前的 Spring Cloud 体系，下一代 Service Mesh 带来了最大的变化是微服务治理与业务逻辑的解耦。服务网格把 SDK 中的大部分能力从应用中剥离出来，拆解为独立进程，以 sidecar 的模式进行部署。服务网格通过将服务通信及相关管控功能从业务程序中分离并下沉到基础设施层，使其和业务系统完全解耦。在未来基于服务网格架构的研发工程师，无须过多了解微服务实现细节，重点专注当前的业务逻辑，使得让软件交付周期和技术风险更为可控。",-1),u=i("p",null,"当下，服务网格 Service Mesh 还是一个时髦的技术，国内已有少量公司开始试点开发，在未来很长一段时间内，基于 Spring Cloud 的微服务架构与 Service Mesh 是并驾齐驱的，现在提早接触 Service Mesh 的相关技术，相信会给你职场提升带来不小的帮助。",-1),C=i("p",null,"至此，整个《Spring Cloud Alibaba实战》课程全部讲解完毕。最后，祝未来的架构师们技术精进，年入百万。",-1);function h(A,k,m,M,v,f){const a=n("Image");return o(),t("div",null,[_,c,d,l(a,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M01/3A/F3/Cgp9HWCCLoeAGhTCAAi5zl4o8Dg848.png"}),e(),S,l(a,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M01/3A/F3/Cgp9HWCCLpKAT1fiAALJjtRPb74486.png"}),e(),g,b,u,C])}const N=p(s,[["render",h]]);export{T as __pageData,N as default};
