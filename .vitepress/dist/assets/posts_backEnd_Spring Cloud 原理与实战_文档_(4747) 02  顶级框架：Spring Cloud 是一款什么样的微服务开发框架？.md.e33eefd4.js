import{_ as l,j as e,o as a,g as s,k as r,h as i,Q as t,s as n}from"./chunks/framework.4e7d56ce.js";const z=JSON.parse('{"title":"02顶级框架：SpringCloud是一款什么样的微服务开发框架？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4747) 02  顶级框架：Spring Cloud 是一款什么样的微服务开发框架？.md","filePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4747) 02  顶级框架：Spring Cloud 是一款什么样的微服务开发框架？.md","lastUpdated":1696417798000}'),p={name:"posts/backEnd/Spring Cloud 原理与实战_文档/(4747) 02  顶级框架：Spring Cloud 是一款什么样的微服务开发框架？.md"},g=t('<h1 id="_02顶级框架-springcloud是一款什么样的微服务开发框架" tabindex="-1">02顶级框架：SpringCloud是一款什么样的微服务开发框架？ <a class="header-anchor" href="#_02顶级框架-springcloud是一款什么样的微服务开发框架" aria-label="Permalink to &quot;02顶级框架：SpringCloud是一款什么样的微服务开发框架？&quot;">​</a></h1><p>实现微服务架构的第一步是进行技术选型，也就是选择一个合适的开发框架来实现上一课时中所介绍的各个微服务技术体系。目前市面上并没有一个严格意义上的微服务架构开发工具，但还是存在一些可供参考的框架。本课程将使用 Spring Cloud 作为实现微服务的主体框架。</p><h3 id="从-spring-boot-到-spring-cloud" tabindex="-1">从 Spring Boot 到 Spring Cloud <a class="header-anchor" href="#从-spring-boot-到-spring-cloud" aria-label="Permalink to &quot;从 Spring Boot 到 Spring Cloud&quot;">​</a></h3><p>Spring Cloud 具备一个天生的优势，因为它是 Spring 家庭的一员，而 Spring 在 Java EE 开发领域的强大地位，给 Spring Cloud 起到很好的推动作用。同时，Spring Cloud 所基于的 Spring Boot，已经成为 Java EE 领域中最流行的开发框架，用来简化 Spring 应用程序的框架搭建和开发过程。</p><p>在微服务架构中，我们将通过 Spring Boot 来开发<strong>单个微服务</strong>。同样作为 Spring 家族的新成员，Spring Boot 提供了令人兴奋的特性，这些特性主要体现在开发过程的简单化，包括支持快速构建项目、不依赖外部容器独立运行、开发部署效率高，以及与云平台天然集成等。而在微服务架构中，Spring Cloud 构建在 Spring Boot 之上，继承了 Spring Boot 的多项功能特性，使得开发微服务变得简单而高效。</p><p>在设计思想上，Spring Boot 充分利用约定优于配置（Convention over Configuration）的<strong>自动化配置机制</strong> 。与传统的 Spring 应用程序相比， Spring Boot 在<strong>启动依赖项自动管理、简化部署并提供应用监控等方面</strong>对开发过程做了优化。关于 Spring Boot 的全面介绍不是课程的重点，我们会在后续的课程中结合案例分析来穿插介绍相关的各项功能特性。</p><h3 id="spring-cloud-中的核心组件" tabindex="-1">Spring Cloud 中的核心组件 <a class="header-anchor" href="#spring-cloud-中的核心组件" aria-label="Permalink to &quot;Spring Cloud 中的核心组件&quot;">​</a></h3><p>技术组件的完备性是我们选择 Spring Cloud 的主要原因。Spring Cloud 中包含了<strong>开发一个完整的微服务系统所需的几乎所有技术组件</strong>，包括服务注册和发现、API 网关、配置中心、消息处理、负载均衡、熔断器、数据监控等常见技术组件都可以基于 Spring Boot 快速集成到业务系统中。</p><p>在对微服务的各项技术组件进行设计和实现的过程中，Spring Cloud 也有自己的一些特色。一方面，它对微服务架构开发所需的技术组件进行了抽象，提供了符合开发需求的<strong>独立组件</strong> ，包括用于配置中心的 Spring Cloud Config、用于 API 网关的 Spring Cloud Gateway 等。另一方面，Spring Cloud 也非常崇尚博采众长，它将目前各家公司现有的适合于微服务系统开发的<strong>多款服务框架</strong>组合起来，通过 Spring Boot 开发风格进行了封装和优化。这部分主要指的是 Spring Cloud Netflix 组件，其中集成了 Netflix OSS 的 Eureka 注册中心、Zuul 网关、Hystrix 熔断器等工具，如下图所示：</p>',9),d=n("p",null,"Spring Cloud、Spring Cloud Netflix 与 Netflix OSS之间的关系",-1),u=n("p",null,[i("Spring Cloud 中的组件非常多，我们无意对所有组件都进行详细展开，而是梳理了开发一个微服务系统所必需的"),n("strong",null,"八大核心组件"),i("，如下图所示：")],-1),c=n("p",null,"Spring Cloud 核心功能组件",-1),_=n("p",null,"接下来，我们对上图中的 Spring Cloud 核心技术组件进行一一展开。",-1),S=n("h4",{id:"_1-spring-cloud-netflix-eureka-与服务治理",tabindex:"-1"},[i("1. Spring Cloud Netflix Eureka 与服务治理 "),n("a",{class:"header-anchor",href:"#_1-spring-cloud-netflix-eureka-与服务治理","aria-label":'Permalink to "1. Spring Cloud Netflix Eureka 与服务治理"'},"​")],-1),C=n("p",null,"Spring Cloud Netflix 基于 Spring Boot 集成了 Netflix OSS 中的诸多核心组件，与服务治理相关的除了用于服务注册和发现的 Eureka 之外，实际上还有用于实现客户端负载均衡的 Ribbon：",-1),h=n("p",null,"服务治理组件交互示意图",-1),m=n("p",null,"在服务治理场景下，这些组件构成了一个完整的从服务注册、服务发现到服务调用的流程。",-1),A=n("h4",{id:"_2-spring-cloud-gateway-与服务网关",tabindex:"-1"},[i("2. Spring Cloud Gateway 与服务网关 "),n("a",{class:"header-anchor",href:"#_2-spring-cloud-gateway-与服务网关","aria-label":'Permalink to "2. Spring Cloud Gateway 与服务网关"'},"​")],-1),f=n("p",null,[i("针对服务网关，Spring Cloud 中提供了 Spring 家族自建的 Spring Cloud Gateway。Spring Cloud Gateway 构建在最新版本的 Spring 5 和响应式编程框架 Project Reactor 之上，提供了非阻塞的 I/O 通信机制。通过提供一系列的"),n("strong",null,"谓词（Predicate）"),i(" 和"),n("strong",null,"过滤器（Filter）"),i(" 的组合，我们可以通过 Spring Cloud Gateway 实现灵活的服务路由。同时，Spring Cloud Gateway 也可以集成前面介绍的 Netfix Hystrix 熔断器，以及服务限流等常见的服务容错机制。")],-1),B=n("p",null,"Spring Cloud Gateway 结构示意图",-1),b=n("p",null,"当然，我们也可以使用 Netflix 中的 Zuul 来构建服务网关，这是 Spring Cloud 中集成的另一种常见的网关实现机制。",-1),k=n("h4",{id:"_3-spring-cloud-circuit-breaker-与服务容错",tabindex:"-1"},[i("3. Spring Cloud Circuit Breaker 与服务容错 "),n("a",{class:"header-anchor",href:"#_3-spring-cloud-circuit-breaker-与服务容错","aria-label":'Permalink to "3. Spring Cloud Circuit Breaker 与服务容错"'},"​")],-1),x=n("p",null,[i("Spring Cloud Circuit Breaker 是对熔断器实现方案的一种抽象。在该组件的内部，Spring Cloud Circuit Breaker 集成了"),n("strong",null,"Netfix Hystrix、Resilience4J、Sentinel、Spring Retry"),i("这四种熔断器实现工具。")],-1),P=n("p",null,"Spring Cloud Circuit Breaker 中的四种熔断器实现机制",-1),T=n("p",null,"对外，它提供了一个一致的 API 供应用程序使用，允许开发人员选择最适合应用程序需求的熔断器实现。熔断器在 Spring Cloud 框架中应用广泛，尤其是在与 Spring Cloud Gateway 等服务网关的集成过程中。",-1),y=n("h4",{id:"_4-spring-cloud-config-与配置中心",tabindex:"-1"},[i("4. Spring Cloud Config 与配置中心 "),n("a",{class:"header-anchor",href:"#_4-spring-cloud-config-与配置中心","aria-label":'Permalink to "4. Spring Cloud Config 与配置中心"'},"​")],-1),q=n("p",null,"微服务架构中，我们通常需要构建一个集中化的配置仓库来保存各种配置信息。同时，我们也需要构建一个配置服务器来访问配置仓库并提供对外的访问入口，如下图所示。",-1),N=n("p",null,"配置中心结构示意图",-1),E=n("p",null,[i("在 Spring Cloud 中，集中化配置中心服务器的实现依赖于 Spring Cloud Config，而配置仓库的实现方案除了本地文件系统之外，还支持"),n("strong",null,"Git、SVN"),i("等常见的版本控制工具。")],-1),w=n("h4",{id:"_5-spring-cloud-stream-与事件驱动",tabindex:"-1"},[i("5. Spring Cloud Stream 与事件驱动 "),n("a",{class:"header-anchor",href:"#_5-spring-cloud-stream-与事件驱动","aria-label":'Permalink to "5. Spring Cloud Stream 与事件驱动"'},"​")],-1),I=n("p",null,[i("Spring Cloud 中的 Spring Cloud Stream 对整个消息发布和消费过程做了高度抽象，并提供了 Source/Sink、Channel 和 Binder 等一系列"),n("strong",null,"核心组件"),i("，如下图所示。")],-1),V=t('<p>Spring Cloud Stream 结构示意图</p><p>Spring Cloud Stream 中的 Source 组件是真正生成消息的组件，然后消息通过 Channel 传送到 Binder，这里的 Binder 是一个中间层组件，通过 Binder 可以与特定的消息中间件进行通信。在 Spring Cloud Stream 中，目前已经内置集成的消息中间件包括 RabbitMQ 和 Kafka。消息消费者则同样通过 Binder 从消息传递系统中获取消息，消息通过 Channel 将流转到 Sink 组件。</p><h4 id="_6-spring-cloud-security-与服务安全" tabindex="-1">6. Spring Cloud Security 与服务安全 <a class="header-anchor" href="#_6-spring-cloud-security-与服务安全" aria-label="Permalink to &quot;6. Spring Cloud Security 与服务安全&quot;">​</a></h4><p>我们知道在 Spring 中存在一个用来应对安全需求的<strong>Spring Security 框架</strong>。对应的，在 Spring Cloud 中也提供了 Spring Cloud Security 专门处理微服务环境下的服务安全访问需求。</p><p>微服务架构的安全性本质上是<strong>服务访问的安全性</strong> ，作为 Spring Cloud 中的一员，Spring Cloud Security 是对微服务架构中所面临的安全性问题进行抽象并实现的工具。Spring Cloud Security 具备众多特点，包括基于流行的<strong>OAuth2 协议</strong> 的授权机制，以及<strong>基于 Token</strong>的资源访问保护机制。</p>',5),D=n("p",null,"基于 OAuth2 协议的服务访问安全控制示意图",-1),M=n("h4",{id:"_7-spring-cloud-sleuth-与链路跟踪",tabindex:"-1"},[i("7. Spring Cloud Sleuth 与链路跟踪 "),n("a",{class:"header-anchor",href:"#_7-spring-cloud-sleuth-与链路跟踪","aria-label":'Permalink to "7. Spring Cloud Sleuth 与链路跟踪"'},"​")],-1),H=n("p",null,[i("Spring Cloud Sleuth 是 Spring Cloud 的组成部分之一，对于分布式环境下的服务调用链路，我们可以通过"),n("strong",null,"Spring Cloud Sleuth"),i("自动完成服务调用链路的构建。任何通过 HTTP 端点接收到的请求或使用 RestTemplate 发出的请求都可以被 Spring Cloud Sleuth 自动收集日志，同时它也能无缝支持通过由 API 网关 Zuul 发送的请求，以及基于 Spring Cloud Stream 等消息传递技术发送的请求。并且，正如我们已经了解到的，Spring Cloud Sleuth 也兼容了 Zipkin、HTrace 等第三方工具的应用和集成，从而实现对服务依赖关系、服务调用时序，以及服务调用数据的可视化，如下图所示。")],-1),G=t('<p>Spring Cloud Sleuth 与 Zipkin 集成示意图</p><h4 id="_8-spring-cloud-contracts-与服务测试" tabindex="-1">8. Spring Cloud Contracts 与服务测试 <a class="header-anchor" href="#_8-spring-cloud-contracts-与服务测试" aria-label="Permalink to &quot;8. Spring Cloud Contracts 与服务测试&quot;">​</a></h4><p>作为 Spring Cloud 中我们将要介绍的最后一个核心组件，服务测试本质上不属于微服务架构的技术组件，而只是一种辅助工具。但对于软件中的任何功能，我们都需要进行测试。对于微服务而言，测试是一个难点，也是经常被忽略的一点，这也是本课程专门把服务测试作为一个专题来讲解的原因所在。通常，我们会使用单元测试和集成测试来分别对一个类的内部，以及数据访问等涉及多个类交互的场景分别进行测试。而在微服务架构中，当不同服务之间进行交互和集成时，测试的关注点就变成如何确保服务定义和协议级别的正确性和稳定性，也就是所谓的端到端测试。</p><p>Spring 框架本身就提供了<strong>Spring Test 模块</strong> 来满足<strong>单元测试</strong> 与<strong>集成测试</strong> 的实施需求。但对微服务架构而言，我们将重点介绍特有的消费者驱动的契约测试框架，这种测试解决方案能够有效应对服务与服务之间交互场景下的端到端测试需求。在 Spring Cloud 中，满足这种端到端测试需求的就是 Spring Cloud Contract 框架。Spring Cloud Contract 框架采用了<strong>服务桩（Stub）</strong> 实现机制来确保特定服务版本的各个服务之间交互过程的正确性，如下所示：</p>',4),F=n("p",null,"基于 Spring Cloud Contract 的端到端测试方案",-1),O=n("h3",{id:"小结与预告",tabindex:"-1"},[i("小结与预告 "),n("a",{class:"header-anchor",href:"#小结与预告","aria-label":'Permalink to "小结与预告"'},"​")],-1),R=n("p",null,"从本课时开始，我们正式引入了 Spring 家族中的微服务开发框架 Spring Cloud，我们明确了 Spring Cloud 是构建在 Spring Boot 之上，且提供了一系列的核心组件用来满足微服务系统的开发需求。",-1),v=n("p",null,"这里给你留一道思考题：你能简要描述 Spring Cloud 中有哪些核心组件以及对应的功能吗？",-1),J=n("p",null,"在接下来的课程中，我们将逐一对 Spring Cloud 中提供的各个技术组件进行详细的展开。但在此之前，我们希望能有一个完整的案例来演示这些技术组件的使用方法，这就是下一课时要讨论的内容。",-1);function L(Z,K,Q,$,j,W){const o=e("Image");return a(),s("div",null,[g,r(o,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/56/AD/Ciqc1F9sBgaAb7YQAAA653_HTog401.png"}),i(),d,u,r(o,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/56/AD/Ciqc1F9sBg6AWtz9AABxSM2101E981.png"}),i(),c,_,S,C,r(o,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/56/AE/Ciqc1F9sBiKAds9sAABElqpa-7s336.png"}),i(),h,m,A,f,r(o,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/56/AE/Ciqc1F9sBlKAJBPNAAA-ia2bpBY143.png"}),i(),B,b,k,x,r(o,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/56/B9/CgqCHl9sBmOAWNhSAAA6Vx5KyiE277.png"}),i(),P,T,y,q,r(o,{alt:"Lark20200925-142541.png",src:"https://s0.lgstatic.com/i/image/M00/57/C7/CgqCHl9tjbeACpS2AAJIaPx7Mq0892.png"}),i(),N,E,w,I,r(o,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/56/B9/CgqCHl9sBn-AAkFbAAA_BemmaAQ215.png"}),i(),V,r(o,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/57/C2/Ciqc1F9tlDOASNyLAALedVeBHLo293.png"}),i(),D,M,H,r(o,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/57/C2/Ciqc1F9tlEiATn4nAALLyuxpf0E499.png"}),i(),G,r(o,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/57/C2/Ciqc1F9tlCaAVTmJAAHSTqddh7A697.png"}),i(),F,O,R,v,J])}const U=l(p,[["render",L]]);export{z as __pageData,U as default};
