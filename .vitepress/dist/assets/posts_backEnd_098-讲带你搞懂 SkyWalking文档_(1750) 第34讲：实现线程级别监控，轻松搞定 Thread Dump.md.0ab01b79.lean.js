import{_ as l,j as o,o as e,g as t,k as n,s,h as r,Q as p}from"./chunks/framework.e0c66c3f.js";const I=JSON.parse('{"title":"背景 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1750) 第34讲：实现线程级别监控，轻松搞定 Thread Dump.md","filePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1750) 第34讲：实现线程级别监控，轻松搞定 Thread Dump.md","lastUpdated":1696338709000}'),c={name:"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1750) 第34讲：实现线程级别监控，轻松搞定 Thread Dump.md"},E=s("p",null,"本课时我们来学习 Thread Dump 功能。",-1),y=s("h3",{id:"背景",tabindex:"-1"},[r("背景 "),s("a",{class:"header-anchor",href:"#背景","aria-label":'Permalink to "背景"'},"​")],-1),i=s("p",null,"通过前面课时的介绍我们知道，SkyWalking 提供的 Agent 可以收集服务的 Metrics、Trace、Log 等维度的数据，然后发送到后端的 OAP 进行分析并进行持久化存储，我们可以使用 SkyWalking Rocketbot UI（或是直接使用 GraphQL）​ 从不同的维度查询上述数据，评估系统的各项性能和某些具体行为。",-1),d=s("p",null,"例如，我们可以通过 ServiceRespTimeMetrics、ServiceP99Metrics、ServiceCpmMetrics 等 Metrics 了解一个服务的整体吞吐量；可以通过 Trace 信息了解某个具体请求经过的核心组件和服务，以及在这些组件和服务上的耗时情况；可以通过 Trace 上携带的 Log 信息了解相应的异常信息；还可以根据 Trace 信息分析得到 Relation 信息，画出整个服务架构的拓扑图，了解各个服务之间的调用关系以及拓扑图每条调用边上的响应时间、SLA 等信息。这就可以帮助开发和运维人员更好地管理整个服务集群，更快地定位系统的热点和瓶颈，降低运维和问题定位的成本。",-1),u=s("p",null,"SkyWalking 已经满足了我们日常监控和运维的绝大多数需求，但是并没有覆盖到所有运维场景。假设我们发现请求在某个服务中的耗时特别长，远远超过了预期，例如开篇示例中的 demo-webapp ，如下图所示，在 HelloWorldController 在开始调用 Dubbo 服务的前后，会有耗时超过 1s 以上情况：",-1),F=p("",7),g=p("",5),C=p("",8),h=p("",46),m=s("ul",null,[s("li",null,[s("p",null,"Http 请求进入 demo-webapp 之后，tomcat-7.x-8.x-plugin 插件会从其 Header 中查找 ENABLE_DUMP_FLAG 标记并记录到 RuntimeContext 中。之后通过 ContextManager 创建此次请求对应的 TracingContext 对象以及 EntrySpan，在完成 TracingContext 的初始化之后会触发 TracingContextPostConstructListener，即 ThreadDumpManager，记录需要进行 dump 的线程 ID。后续请求执行过程中会调用 create*Span() 方法创建 Span，同时 ThreadDumpManager 中的后台线程也会定时 dump 线程信息，如图中（3）和（4）处所示。")]),s("li",null,[s("p",null,"接下来，在 demo-webapp 通过 Dubbo 调用 demo-provider 服务的时候，会将生成的 ContextCarrier 对象（包含 ENABLE_DUMP_FLAG 标记）序列化成字符串添加到 RpcContext 中，随 Dubbo 请求发送到下游的 demo-provider。在 demo-provider 服务的 dubbo-plugin 插件中会处理 ContextCarrier，当然也会处理 ENABLE_DUMP_FLAG 标记。")]),s("li",null,[s("p",null,"回到（5）处，demo-webapp 处理完请求后会关闭 TracingContext，同时会触发所有 TraceContextListener 监听器，其中 ThreadDumpManager 会根据记录的线程 ID 关联 ThreadDump 与 TraceSegment，TraceSegmentServiceClient 则负责通过 gRPC 将序列化后的 TraceSegment 数据发送到后端的 OAP 集群。")]),s("li",null,[s("p",null,"OAP 服务中的 trace-receiver-plugin 负责接收 Agent 发送的 TraceSegment 数据，解析之后会由 RecordStreamProcessor 存储到 ElasticSearch 中。")]),s("li",null,[s("p",null,"OAP 服务中的 query-graphql-plugin 插件负责处理查询 Trace 的请求，这里会从 SegmentObject 中获取全部 ThreadDump 填充到 Trace 中返回给用户。")])],-1),D=s("p",null,"好了，本专栏的全部内容就讲完了，最后的彩蛋我将带你回顾 SkyWalking 架构并展望未来。",-1);function T(A,B,v,b,S,x){const a=o("Image");return e(),t("div",null,[E,y,i,d,u,n(a,{alt:"耗时高Trace截图.png",src:"https://s0.lgstatic.com/i/image/M00/32/07/CgqCHl8NcY-AR8DqAAE4jw3ZU4w560.png"}),F,n(a,{alt:"image (16).png",src:"https://s0.lgstatic.com/i/image/M00/32/07/CgqCHl8NcbiATQCtAAFX5iKjEXQ354.png"}),g,n(a,{alt:"image (17).png",src:"https://s0.lgstatic.com/i/image/M00/32/07/CgqCHl8NcdWAM9Y7AAHmR7mU2eY385.png"}),C,n(a,{alt:"ThreadDumpManager继承关系图.png",src:"https://s0.lgstatic.com/i/image/M00/31/FC/Ciqc1F8NcZ6AU8e4AABDtSvDmRA656.png"}),h,n(a,{alt:"image (18).png",src:"https://s0.lgstatic.com/i/image/M00/31/FD/Ciqc1F8NcpiAEXK3AANCpmKvbm8849.png"}),m,D])}const L=l(c,[["render",T]]);export{I as __pageData,L as default};
