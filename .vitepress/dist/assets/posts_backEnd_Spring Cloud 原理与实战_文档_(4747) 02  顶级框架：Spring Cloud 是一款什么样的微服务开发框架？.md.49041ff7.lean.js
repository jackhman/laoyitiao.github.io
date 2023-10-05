import{_ as l,j as e,o as a,g as s,k as r,h as i,Q as t,s as n}from"./chunks/framework.4e7d56ce.js";const z=JSON.parse('{"title":"从 Spring Boot 到 Spring Cloud ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4747) 02  顶级框架：Spring Cloud 是一款什么样的微服务开发框架？.md","filePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4747) 02  顶级框架：Spring Cloud 是一款什么样的微服务开发框架？.md","lastUpdated":1696417798000}'),p={name:"posts/backEnd/Spring Cloud 原理与实战_文档/(4747) 02  顶级框架：Spring Cloud 是一款什么样的微服务开发框架？.md"},g=t("",8),d=n("p",null,"Spring Cloud、Spring Cloud Netflix 与 Netflix OSS之间的关系",-1),u=n("p",null,[i("Spring Cloud 中的组件非常多，我们无意对所有组件都进行详细展开，而是梳理了开发一个微服务系统所必需的"),n("strong",null,"八大核心组件"),i("，如下图所示：")],-1),c=n("p",null,"Spring Cloud 核心功能组件",-1),S=n("p",null,"接下来，我们对上图中的 Spring Cloud 核心技术组件进行一一展开。",-1),_=n("h4",{id:"_1-spring-cloud-netflix-eureka-与服务治理",tabindex:"-1"},[i("1. Spring Cloud Netflix Eureka 与服务治理 "),n("a",{class:"header-anchor",href:"#_1-spring-cloud-netflix-eureka-与服务治理","aria-label":'Permalink to "1. Spring Cloud Netflix Eureka 与服务治理"'},"​")],-1),C=n("p",null,"Spring Cloud Netflix 基于 Spring Boot 集成了 Netflix OSS 中的诸多核心组件，与服务治理相关的除了用于服务注册和发现的 Eureka 之外，实际上还有用于实现客户端负载均衡的 Ribbon：",-1),h=n("p",null,"服务治理组件交互示意图",-1),m=n("p",null,"在服务治理场景下，这些组件构成了一个完整的从服务注册、服务发现到服务调用的流程。",-1),A=n("h4",{id:"_2-spring-cloud-gateway-与服务网关",tabindex:"-1"},[i("2. Spring Cloud Gateway 与服务网关 "),n("a",{class:"header-anchor",href:"#_2-spring-cloud-gateway-与服务网关","aria-label":'Permalink to "2. Spring Cloud Gateway 与服务网关"'},"​")],-1),B=n("p",null,[i("针对服务网关，Spring Cloud 中提供了 Spring 家族自建的 Spring Cloud Gateway。Spring Cloud Gateway 构建在最新版本的 Spring 5 和响应式编程框架 Project Reactor 之上，提供了非阻塞的 I/O 通信机制。通过提供一系列的"),n("strong",null,"谓词（Predicate）"),i(" 和"),n("strong",null,"过滤器（Filter）"),i(" 的组合，我们可以通过 Spring Cloud Gateway 实现灵活的服务路由。同时，Spring Cloud Gateway 也可以集成前面介绍的 Netfix Hystrix 熔断器，以及服务限流等常见的服务容错机制。")],-1),f=n("p",null,"Spring Cloud Gateway 结构示意图",-1),b=n("p",null,"当然，我们也可以使用 Netflix 中的 Zuul 来构建服务网关，这是 Spring Cloud 中集成的另一种常见的网关实现机制。",-1),k=n("h4",{id:"_3-spring-cloud-circuit-breaker-与服务容错",tabindex:"-1"},[i("3. Spring Cloud Circuit Breaker 与服务容错 "),n("a",{class:"header-anchor",href:"#_3-spring-cloud-circuit-breaker-与服务容错","aria-label":'Permalink to "3. Spring Cloud Circuit Breaker 与服务容错"'},"​")],-1),x=n("p",null,[i("Spring Cloud Circuit Breaker 是对熔断器实现方案的一种抽象。在该组件的内部，Spring Cloud Circuit Breaker 集成了"),n("strong",null,"Netfix Hystrix、Resilience4J、Sentinel、Spring Retry"),i("这四种熔断器实现工具。")],-1),T=n("p",null,"Spring Cloud Circuit Breaker 中的四种熔断器实现机制",-1),P=n("p",null,"对外，它提供了一个一致的 API 供应用程序使用，允许开发人员选择最适合应用程序需求的熔断器实现。熔断器在 Spring Cloud 框架中应用广泛，尤其是在与 Spring Cloud Gateway 等服务网关的集成过程中。",-1),y=n("h4",{id:"_4-spring-cloud-config-与配置中心",tabindex:"-1"},[i("4. Spring Cloud Config 与配置中心 "),n("a",{class:"header-anchor",href:"#_4-spring-cloud-config-与配置中心","aria-label":'Permalink to "4. Spring Cloud Config 与配置中心"'},"​")],-1),N=n("p",null,"微服务架构中，我们通常需要构建一个集中化的配置仓库来保存各种配置信息。同时，我们也需要构建一个配置服务器来访问配置仓库并提供对外的访问入口，如下图所示。",-1),E=n("p",null,"配置中心结构示意图",-1),q=n("p",null,[i("在 Spring Cloud 中，集中化配置中心服务器的实现依赖于 Spring Cloud Config，而配置仓库的实现方案除了本地文件系统之外，还支持"),n("strong",null,"Git、SVN"),i("等常见的版本控制工具。")],-1),w=n("h4",{id:"_5-spring-cloud-stream-与事件驱动",tabindex:"-1"},[i("5. Spring Cloud Stream 与事件驱动 "),n("a",{class:"header-anchor",href:"#_5-spring-cloud-stream-与事件驱动","aria-label":'Permalink to "5. Spring Cloud Stream 与事件驱动"'},"​")],-1),I=n("p",null,[i("Spring Cloud 中的 Spring Cloud Stream 对整个消息发布和消费过程做了高度抽象，并提供了 Source/Sink、Channel 和 Binder 等一系列"),n("strong",null,"核心组件"),i("，如下图所示。")],-1),V=t("",5),D=n("p",null,"基于 OAuth2 协议的服务访问安全控制示意图",-1),M=n("h4",{id:"_7-spring-cloud-sleuth-与链路跟踪",tabindex:"-1"},[i("7. Spring Cloud Sleuth 与链路跟踪 "),n("a",{class:"header-anchor",href:"#_7-spring-cloud-sleuth-与链路跟踪","aria-label":'Permalink to "7. Spring Cloud Sleuth 与链路跟踪"'},"​")],-1),H=n("p",null,[i("Spring Cloud Sleuth 是 Spring Cloud 的组成部分之一，对于分布式环境下的服务调用链路，我们可以通过"),n("strong",null,"Spring Cloud Sleuth"),i("自动完成服务调用链路的构建。任何通过 HTTP 端点接收到的请求或使用 RestTemplate 发出的请求都可以被 Spring Cloud Sleuth 自动收集日志，同时它也能无缝支持通过由 API 网关 Zuul 发送的请求，以及基于 Spring Cloud Stream 等消息传递技术发送的请求。并且，正如我们已经了解到的，Spring Cloud Sleuth 也兼容了 Zipkin、HTrace 等第三方工具的应用和集成，从而实现对服务依赖关系、服务调用时序，以及服务调用数据的可视化，如下图所示。")],-1),G=t("",4),F=n("p",null,"基于 Spring Cloud Contract 的端到端测试方案",-1),O=n("h3",{id:"小结与预告",tabindex:"-1"},[i("小结与预告 "),n("a",{class:"header-anchor",href:"#小结与预告","aria-label":'Permalink to "小结与预告"'},"​")],-1),R=n("p",null,"从本课时开始，我们正式引入了 Spring 家族中的微服务开发框架 Spring Cloud，我们明确了 Spring Cloud 是构建在 Spring Boot 之上，且提供了一系列的核心组件用来满足微服务系统的开发需求。",-1),v=n("p",null,"这里给你留一道思考题：你能简要描述 Spring Cloud 中有哪些核心组件以及对应的功能吗？",-1),J=n("p",null,"在接下来的课程中，我们将逐一对 Spring Cloud 中提供的各个技术组件进行详细的展开。但在此之前，我们希望能有一个完整的案例来演示这些技术组件的使用方法，这就是下一课时要讨论的内容。",-1);function L(Z,K,Q,$,j,W){const o=e("Image");return a(),s("div",null,[g,r(o,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/56/AD/Ciqc1F9sBgaAb7YQAAA653_HTog401.png"}),d,u,r(o,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/56/AD/Ciqc1F9sBg6AWtz9AABxSM2101E981.png"}),i(),c,S,_,C,r(o,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/56/AE/Ciqc1F9sBiKAds9sAABElqpa-7s336.png"}),i(),h,m,A,B,r(o,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/56/AE/Ciqc1F9sBlKAJBPNAAA-ia2bpBY143.png"}),i(),f,b,k,x,r(o,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/56/B9/CgqCHl9sBmOAWNhSAAA6Vx5KyiE277.png"}),i(),T,P,y,N,r(o,{alt:"Lark20200925-142541.png",src:"https://s0.lgstatic.com/i/image/M00/57/C7/CgqCHl9tjbeACpS2AAJIaPx7Mq0892.png"}),i(),E,q,w,I,r(o,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/56/B9/CgqCHl9sBn-AAkFbAAA_BemmaAQ215.png"}),i(),V,r(o,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/57/C2/Ciqc1F9tlDOASNyLAALedVeBHLo293.png"}),i(),D,M,H,r(o,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/57/C2/Ciqc1F9tlEiATn4nAALLyuxpf0E499.png"}),i(),G,r(o,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/57/C2/Ciqc1F9tlCaAVTmJAAHSTqddh7A697.png"}),i(),F,O,R,v,J])}const U=l(p,[["render",L]]);export{z as __pageData,U as default};
