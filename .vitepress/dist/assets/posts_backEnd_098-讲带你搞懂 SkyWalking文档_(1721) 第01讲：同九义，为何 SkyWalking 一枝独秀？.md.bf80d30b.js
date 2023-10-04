import{_ as a,j as s,o as e,g as o,k as n,s as i,h as p,Q as t}from"./chunks/framework.e0c66c3f.js";const w=JSON.parse('{"title":"Logging&Metrics&Tracing","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1721) 第01讲：同九义，为何 SkyWalking 一枝独秀？.md","filePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1721) 第01讲：同九义，为何 SkyWalking 一枝独秀？.md","lastUpdated":1696338709000}'),r={name:"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1721) 第01讲：同九义，为何 SkyWalking 一枝独秀？.md"},g=i("p",null,"随着互联网时代的发展，很多企业为了快速响应业务的变化，开始使用微服务架构。微服务架构的系统常常被切分为多个独立的子系统并以集群的方式部署在数十甚至成百上千的机器上。",-1),_=i("br",null,null,-1),c=i("p",null,"虽然微服务架构带来更大的灵活性、更高的开发效率等等一系列好处，但是同样也面临着很多问题。为掌握系统的运行状态，确保系统正常对外提供服务，需要一些手段去监控系统，以了解系统行为，分析系统的性能，或在系统出现故障时，能发现问题、记录问题并发出告警，从而帮助运维人员发现问题、定位问题。也可以根据监控数据发现系统瓶颈，提前感知故障，预判系统负载能力等。",-1),k=i("br",null,null,-1),S=i("p",null,"这里简单以一个电商网站的单机架构与微服务架构进行对比，说明微服务架构中需要解决的一些问题。",-1),u=i("br",null,null,-1),A=i("br",null,null,-1),d=i("p",null,"图中展示了单机架构下的电商平台，用户使用浏览器发起请求访问电商系统，电商系统会直接从后端的数据库存储中查询相应的用户数据、订单数据、商品信息，以及库存数据等进行展示。当系统出现性能下降、异常信息的问题时，运维人员可以直接去电商系统中查看相应的日志或是系统监控，就基本可以定位到问题。",-1),h=i("br",null,null,-1),P=i("p",null,"下图展示了现实中微服务架构下的电商系统，整个电商系统被拆分成了很多子服务，每个子服务都是以集群的方式对外提供服务。当用户通过浏览器/手机 App 浏览商城的时候，请求会首先到达接入层 API 集群中的一个实例，该实例会通过 RPC 请求库存服务、商品服务、订单服务、用户服务，查询底层的存储，获取相应的数据，最终形成完整的响应结果返回给用户。",-1),b=i("br",null,null,-1),y=i("br",null,null,-1),T=i("p",null,"群无法支撑现在的访问量时，整个电商系统对外表现的性能就会下降，而用户请求涉及的服务和服务实例比较多，要查找到这个问题就需要浏览多个服务和机器的日志，步骤非常繁琐，所以说微服务架构下的问题定位变得比较困难。",-1),M=i("br",null,null,-1),m=i("p",null,"在定位到这个问题之后，我们可能考虑要给商品服务集群进行扩容，计算扩容多少台机器、新增部署多少个实例，都是需要相应的数据做支撑的，而不是凭开发和运维人员的直觉。为了解决微服务架构系统面临的上述挑战，APM 系统应运而生。",-1),W=i("h1",{id:"logging-metrics-tracing",tabindex:"-1"},[p("Logging&Metrics&Tracing "),i("a",{class:"header-anchor",href:"#logging-metrics-tracing","aria-label":'Permalink to "Logging\\&Metrics\\&Tracing"'},"​")],-1),C=i("p",null,"微服务系统的监控主要包含以下三个方面：",-1),E=i("br",null,null,-1),I=t("<br><ul><li><p><strong>Logging</strong> 就是记录系统行为的离散事件，例如，服务在处理某个请求时打印的错误日志，我们可以将这些日志信息记录到 ElasticSearch 或是其他存储中，然后通过 Kibana 或是其他工具来分析这些日志了解服务的行为和状态。大多数情况下，日志记录的数据很分散，并且相互独立，比如错误日志、请求处理过程中关键步骤的日志等等。</p></li><li><p><strong>Metrics</strong> 是系统在一段时间内某一方面的某个度量，例如，电商系统在一分钟内的请求次数。我们常见的监控系统中记录的数据都属于这个范畴，例如 Promethus、Open-Falcon 等，这些监控系统最终给运维人员展示的是一张张二维的折线图。Metrics 是可以聚合的，例如，为电商系统中每个 HTTP 接口添加一个计数器，计算每个接口的 QPS，之后我们就可以通过简单的加和计算得到系统的总负载情况。</p></li><li><p><strong>Tracing</strong> 即我们常说的分布式链路追踪。在微服务架构系统中一个请求会经过很多服务处理，调用链路会非常长，要确定中间哪个服务出现异常是非常麻烦的一件事。通过分布式链路追踪，运维人员就可以构建一个请求的视图，这个视图上展示了一个请求从进入系统开始到返回响应的整个流程。这样，就可以从中了解到所有服务的异常情况、网络调用，以及系统的性能瓶颈等。</p></li></ul><p>另外，还能够迅速应对需求变化也是微服务架构的特点之一，这就会导致各个服务之间的调用关系发生频繁的变化，人工维护这种关系成本很高，通过分布式链路追踪即可掌握系统中各个服务的调用关系。</p><p>谷歌在 2010 年 4 月发表了一篇论文《Dapper, a Large-Scale Distributed Systems Tracing Infrastructure》介绍了分布式追踪的概念，之后很多互联网公司都开始根据这篇论文打造自己的分布式链路追踪系统。前面提到的 APM 系统的核心技术就是分布式链路追踪。下面通过官方的一个示例简单介绍说明什么是 Tracing。</p><br><p>在一个分布式系统中，追踪一个事务或者调用流一般如上图所示。虽然这种图对于看清各组件的组合关系很有用，但是，它不能很好显示组件的调用时间，是串行调用还是并行调用，如果展现更复杂的调用关系，会更加复杂，甚至无法画出这样的图。</p><br>",7),f=i("br",null,null,-1),v=i("p",null,"一种更有效的展现方式就是下图这样，这是一个典型的 trace 视图，这种展现方式增加显示了执行时间的上下文，相关服务间的层次关系，进程或者任务的串行或并行调用关系。这样的视图有助于发现系统调用的关键路径。通过关注关键路径的执行过程，开发团队就可以专注于优化路径中的关键服务，最大幅度的提升系统性能。例如下图中，我们可以看到请求串行的调用了授权服务、订单服务以及资源服务，在资源服务中又并行的执行了三个子任务。我们还可以看到，在这整个请求的生命周期中，资源服务耗时是最长的。",-1),O=i("br",null,null,-1),q=t('<h1 id="常见-apm-系统" tabindex="-1">常见 APM 系统 <a class="header-anchor" href="#常见-apm-系统" aria-label="Permalink to &quot;常见 APM 系统&quot;">​</a></h1><p>APM 系统（Application Performance Management，即应用性能管理）是对企业的应用系统进行实时监控，实现对应用性能管理和故障定位的系统化解决方案。APM 作为系统运维管理和网络管理的一个重要方向，能够对关键服务进行监控、追踪以及告警，帮助开发和运维人员轻松地在复杂的应用系统中找到故障点，提高服务的稳定性，保证用户得到良好的服务，降低 IT 运维的成本。 当下成熟的互联网公司都已经建立了全方位监控系统，力求及时发现故障，并为优化系统提供性能数据支持。</p><br><p>国内比较常见的 APM 如下：</p><ul><li><p><strong>CAT：</strong> 由国内美团点评开源的，基于 Java 语言开发，目前提供 Java、C/C++、Node.js、Python、Go 等语言的客户端，监控数据会全量统计。国内很多公司在用，例如美团点评、携程、拼多多等。CAT 需要开发人员手动在应用程序中埋点，对代码侵入性比较强。</p></li><li><p><strong>Zipkin：</strong> 由 Twitter 公司开发并开源，Java 语言实现。侵入性相对于 CAT 要低一点，需要对web.xml 等相关配置文件进行修改，但依然对系统有一定的侵入性。Zipkin 可以轻松与 Spring Cloud 进行集成，也是 Spring Cloud 推荐的 APM 系统。</p></li><li><p><strong>Pinpoint：</strong> 韩国团队开源的 APM 产品，运用了字节码增强技术，只需要在启动时添加启动参数即可实现 APM 功能，对代码无侵入。目前支持 Java 和 PHP 语言，底层采用 HBase 来存储数据，探针收集的数据粒度非常细，但性能损耗较大，因其出现的时间较长，完成度也很高，文档也较为丰富，应用的公司较多。</p></li><li><p><strong>SkyWalking：</strong> 国人开源的产品，2019 年 4 月 17 日 SkyWalking 从 Apache 基金会的孵化器毕业成为顶级项目。目前 SkyWalking 支持 Java、.Net、Node.js 等探针，数据存储支持MySQL、ElasticSearch等。 SkyWalking 与 Pinpoint 相同，Java 探针采用字节码增强技术实现，对业务代码无侵入。探针采集数据粒度相较于 Pinpoint 来说略粗，但性能表现优秀。目前，SkyWalking 增长势头强劲，社区活跃，中文文档齐全，没有语言障碍，支持多语言探针，这些都是 SkyWalking 的优势所在，还有就是 SkyWalking 支持很多框架，包括很多国产框架，例如，Dubbo、gRPC、SOFARPC 等等，也有很多开发者正在不断向社区提供更多插件以支持更多组件无缝接入 SkyWalking。</p></li><li><p>还有很多不开源的 APM 系统，例如，淘宝鹰眼、Google Dapper 等等，不再展开介绍了。</p></li></ul><h1 id="skywalking-整体架构与核心概念" tabindex="-1">SkyWalking 整体架构与核心概念 <a class="header-anchor" href="#skywalking-整体架构与核心概念" aria-label="Permalink to &quot;SkyWalking 整体架构与核心概念&quot;">​</a></h1><p>SkyWalking 是一个基于 OpenTracing 规范的、开源的 APM 系统，它是专门为微服务架构以及云原生架构而设计的。从 SkyWalking 6.0 开始，SkyWalking 将自身定义为一个观测性分析平台（Observability Analysis Platform，OAP）。SkyWalking 的核心功能有：</p><ul><li><p>服务、服务实例、端点指标分析。</p></li><li><p>服务拓扑图分析</p></li><li><p>服务、服务实例和端点（Endpoint）SLA 分析</p></li><li><p>慢查询检测</p></li><li><p>告警</p></li></ul><p>SkyWalking 如下特点：</p><ul><li><p>多语言自动探针，支持 Java、.NET Code 等多种语言。</p></li><li><p>为多种开源项目提供了插件，为 Tomcat、 HttpClient、Spring、RabbitMQ、MySQL 等常见基础设施和组件提供了自动探针。</p></li><li><p>微内核 + 插件的架构，存储、集群管理、使用插件集合都可以进行自由选择。</p></li><li><p>支持告警。</p></li><li><p>优秀的可视化效果。</p></li></ul><p>SkyWalking 的架构图如下所示：</p><br>',12),V=t("<br><p>SkyWalking 分为三个核心部分：</p><ul><li><p><strong>Agent（探针）</strong> ：Agent 运行在各个服务实例中，负责采集服务实例的 Trace 、Metrics 等数据，然后通过 gRPC 方式上报给 SkyWalking 后端。</p></li><li><p><strong>OAP</strong> ：SkyWalking 的后端服务，其主要责任有两个。</p><ul><li><p>一个是负责接收 Agent 上报上来的 Trace、Metrics 等数据，交给 Analysis Core （涉及 SkyWalking OAP 中的多个模块）进行流式分析，最终将分析得到的结果写入持久化存储中。SkyWalking 可以使用 ElasticSearch、H2、MySQL 等作为其持久化存储，一般线上使用 ElasticSearch 集群作为其后端存储。</p></li><li><p>另一个是负责响应 SkyWalking UI 界面发送来的查询请求，将前面持久化的数据查询出来，组成正确的响应结果返回给 UI 界面进行展示。</p></li></ul></li><li><p><strong>UI 界面</strong> ：SkyWalking 前后端进行分离，该 UI 界面负责将用户的查询操作封装为 GraphQL 请求提交给 OAP 后端触发后续的查询操作，待拿到查询结果之后会在前端负责展示。</p></li></ul><p>这里通过电商系统中的一个接口（请求 path 为&quot;/query/userInfo&quot;），来介绍一下 SkyWalking 中的三个核心概念，如下图所示：</p><br>",5),L=t("<br><ul><li><p><strong>Service（服务）</strong>：用户服务是一个提供独立功能的模块，单独部署成一个集群并对外提供服务，这就是 SkyWalking 中的 Service（服务），这与微服务架构中的一个服务几乎是一样的。</p></li><li><p><strong>ServiceInstance（服务实例）</strong>：用户服务的集群是由多个部署了同一套代码的 JVM 节点构成的，对外提供了相同的处理能力，当请求进入系统时，由接入层进行负载均衡选择一个节点处理请求。用户服务中一个 JVM 节点即为一个 ServiceInstance（服务实例）。</p></li><li><p><strong>Endpoint（端点）</strong>：服务对外暴露的接口，例如这里的 &quot;/query/userInfo&quot; 接口，或是其他的 RPC 接口，就是 SkyWalking 中的 Endpoint（端点）。</p></li></ul><p>在后面的课程中，这三个概念会频繁的出现，希望你仔细理解这三个概念之后，再开始后续的学习。</p><p><strong>总结</strong></p><p>本课时首先通过电商系统的演进，介绍了微服务架构在实际运维和优化工作中遇到的各种问题，然后介绍了 Logging、Metrics、Tracing 等基本概念，并了解了 Trace 系统的由来。随后介绍了APM 系统的概念以及目前市面上常见的 APM 实现。</p><br><p>SkyWalking 作为 APM 系统中的佼佼者，我们介绍了 SkyWalking 的整体架构以及 Service、Endpoint、ServiceInstance 等核心概念。</p>",7);function N(J,x,R,D,F,B){const l=s("Image");return e(),o("div",null,[g,_,c,k,S,u,n(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6E/3E/CgpOIF5fMbaAYJFNAACF5FQCSZg598.png"}),A,d,h,P,b,n(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6E/3E/Cgq2xl5fMbaARPc6AAF9cLLO7pM785.png"}),y,T,M,m,W,C,E,n(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6E/3E/CgpOIF5fMbeAVBbiAAKBOtXrJgg411.png"}),I,n(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6E/3E/Cgq2xl5fMbeAIKO2AABvAar2e5E122.png"}),f,v,O,n(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6E/3E/CgpOIF5fMbeACGYWAABqbqP7vns698.png"}),q,n(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6E/3E/Cgq2xl5fMbiAd3tdAAa1Trt-kIg886.png"}),V,n(l,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6E/3E/CgpOIF5fMbiAIwXlAADOeLbrwsU997.png"}),L])}const U=a(r,[["render",N]]);export{w as __pageData,U as default};
