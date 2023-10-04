import{_ as a,o as l,g as i,Q as e}from"./chunks/framework.e0c66c3f.js";const h=JSON.parse('{"title":"Spring Cloud Alibaba 简介 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/041_300分钟搞懂 Spring Cloud/(101) 彩蛋：第二代微服务架构Spring Cloud Alibaba.md","filePath":"posts/backEnd/041_300分钟搞懂 Spring Cloud/(101) 彩蛋：第二代微服务架构Spring Cloud Alibaba.md","lastUpdated":1696338709000}'),o={name:"posts/backEnd/041_300分钟搞懂 Spring Cloud/(101) 彩蛋：第二代微服务架构Spring Cloud Alibaba.md"},r=e('<p>你好，我是你的 Spring Cloud 讲师尹吉欢，欢迎来到彩蛋：Spring Cloud Alibaba。</p><h3 id="spring-cloud-alibaba-简介" tabindex="-1">Spring Cloud Alibaba 简介 <a class="header-anchor" href="#spring-cloud-alibaba-简介" aria-label="Permalink to &quot;Spring Cloud Alibaba 简介&quot;">​</a></h3><p>我们先来简单了解下什么是 Spring Cloud Alibaba？Spring Cloud Alibaba 是由一些阿里巴巴的开源组件和云产品组成的。</p><p>Spring Cloud Alibaba 致力于提供微服务开发的一站式解决方案。此项目包含开发分布式应用微服务的必需组件，方便开发者通过 Spring Cloud 编程模型轻松使用这些组件来开发分布式应用服务。</p><p>依托 Spring Cloud Alibaba，你只需要添加一些注解和少量配置，就可以将 Spring Cloud 应用接入阿里微服务解决方案，通过阿里中间件来迅速搭建分布式应用系统。</p><h3 id="spring-cloud-alibaba-主要功能" tabindex="-1">Spring Cloud Alibaba 主要功能 <a class="header-anchor" href="#spring-cloud-alibaba-主要功能" aria-label="Permalink to &quot;Spring Cloud Alibaba 主要功能&quot;">​</a></h3><h4 id="服务限流降级" tabindex="-1">服务限流降级 <a class="header-anchor" href="#服务限流降级" aria-label="Permalink to &quot;服务限流降级&quot;">​</a></h4><p>Spring Cloud Alibaba 默认支持 WebServlet、WebFlux、OpenFeign、RestTemplate、Spring Cloud Gateway、Zuul、Dubbo 和 RocketMQ 限流降级功能的接入，可以在运行时通过控制台实时修改限流降级规则，还支持查看限流降级 Metrics 监控。</p><h4 id="服务注册与发现" tabindex="-1">服务注册与发现 <a class="header-anchor" href="#服务注册与发现" aria-label="Permalink to &quot;服务注册与发现&quot;">​</a></h4><p>Spring Cloud Alibaba 适配 Spring Cloud 服务注册与发现标准，默认集成了 Ribbon 的支持。</p><h4 id="分布式配置管理" tabindex="-1">分布式配置管理 <a class="header-anchor" href="#分布式配置管理" aria-label="Permalink to &quot;分布式配置管理&quot;">​</a></h4><p>Spring Cloud Alibaba 支持分布式系统中的外部化配置，配置更改时自动刷新。</p><h4 id="消息驱动能力" tabindex="-1">消息驱动能力 <a class="header-anchor" href="#消息驱动能力" aria-label="Permalink to &quot;消息驱动能力&quot;">​</a></h4><p>Spring Cloud Alibaba 基于 Spring Cloud Stream 为微服务应用构建消息驱动能力。</p><h4 id="分布式事务" tabindex="-1">分布式事务 <a class="header-anchor" href="#分布式事务" aria-label="Permalink to &quot;分布式事务&quot;">​</a></h4><p>Spring Cloud Alibaba 使用 @GlobalTransactional 注解， 高效并且对业务零侵入地解决分布式事务问题。</p><h3 id="spring-cloud-alibaba-主要组件" tabindex="-1">Spring Cloud Alibaba 主要组件 <a class="header-anchor" href="#spring-cloud-alibaba-主要组件" aria-label="Permalink to &quot;Spring Cloud Alibaba 主要组件&quot;">​</a></h3><p>Spring Cloud Alibaba 主要包含 Sentinel、Nacos、RocketMQ、Dubbo、Seata 等组件。</p><h4 id="sentinel" tabindex="-1">Sentinel <a class="header-anchor" href="#sentinel" aria-label="Permalink to &quot;Sentinel&quot;">​</a></h4><p>Sentinel 把流量作为切入点，从流量控制、熔断降级、系统负载保护等多个维度保障服务的稳定性。</p><p>Sentinel 目前在 GitHub 的关注超过了 1 万，接入使用的公司也比较多，Sentinel 主要分为两部分，一部分是客户端，也就是在我们的程序中集成，对 Dubbo/Spring Cloud 等框架也有较好的支持。另一部分是控制台，基于 Spring Boot 开发，打包后可以直接运行，不需要额外的 Tomcat 等应用容器。</p><p>利用 Sentinel 流量控制功能可以对网关，服务进行过载保护，像电商的秒杀场景就非常需要限流功能。另一个核心功能是熔断降级，这功能跟 Hystrix 的效果是一致的。</p><p>Sentinel 另一个优势在于控制台，在控制台中看到接入应用的单台机器秒级数据，数据监控的可视化做的非常好。同时提供简单易用、完善的 SPI 扩展接口。你可以通过实现扩展接口来快速的定制逻辑。例如定制限流规则，规则可以对接不同的存储，比如 Nacos、Apollo。</p><h4 id="nacos" tabindex="-1">Nacos <a class="header-anchor" href="#nacos" aria-label="Permalink to &quot;Nacos&quot;">​</a></h4><p>Nacos 是一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。主要的功能有注册中心和配置中心。也就是说你可以用 Nacos 代替 Eureka 和 Apollo 两个组件，这也是它的优势。</p><p>目前的 Nacos 还在高速发展中，版本更新很快，目前最新的版本是 1.1.4 版本，可以直接用于生产，我自己所在公司目前生产环境也在使用 Nacos。</p><h4 id="rocketmq" tabindex="-1">RocketMQ <a class="header-anchor" href="#rocketmq" aria-label="Permalink to &quot;RocketMQ&quot;">​</a></h4><p>RocketMQ 是一款开源的分布式消息系统，基于高可用分布式集群技术，提供低延时的、高可靠的消息发布与订阅服务。</p><p>消息队列在工作中你或多或少都会接触到，有用 Kafka 的，也有用 RabbitMQ 的。在 Spring Cloud Alibaba 体系中，推荐使用的就是 RocketMQ 了。</p><p>使用消息队列可以让服务之间更加解耦，可以进行流量消峰，还有一个场景就是利用事务消息来实现分布式事务。</p><h4 id="dubbo" tabindex="-1">Dubbo <a class="header-anchor" href="#dubbo" aria-label="Permalink to &quot;Dubbo&quot;">​</a></h4><p>Apache Dubbo™ 是一款高性能 Java RPC 框架。在国内已被各大互联网公司用于生产环境，在Spring Cloud Alibaba 体系中，服务之间的通信可以使用 Dubbo 来进行远程调用。大家都知道Spring Cloud 中服务之间的通信是 Rest 风格的 API，是通过 Feign 来调用的。Rest 的优势在于通用性较强，无语言限制，调试也非常方便，美中不足的就是性能没有 Dubbo 好，Dubbo 是二进制传输的，而 Rest 一般都是 JSON 格式，报文较大。</p><p>Spring Cloud Alibaba 中可以将 Dubbo 和 Feign 结合使用，也就是你的服务可以暴露 Dubbo 协议，也可以暴露 Rest 协议，调用方可以选择对应的协议进行调用，对于性能有极高要求的场景可以使用 Dubbo，其他的可以使用 Rest。</p><h4 id="seata" tabindex="-1">Seata <a class="header-anchor" href="#seata" aria-label="Permalink to &quot;Seata&quot;">​</a></h4><p>Seata 是一款开源的分布式事务解决方案，致力于提供高性能和简单易用的分布式事务服务。Seata 将为用户提供了 AT、TCC 等事务模式，为用户打造一站式的分布式解决方案。</p><p>分布式事务一向是微服务架构中的难题，其中最简单的是使用消息队列来实现最终一致性，但某些场景还是存在强一致性的需求，所以 Seata 的出现为我们解决了困扰了很久的分布式事务问题。</p><h3 id="spring-cloud-二代架构" tabindex="-1">Spring Cloud 二代架构 <a class="header-anchor" href="#spring-cloud-二代架构" aria-label="Permalink to &quot;Spring Cloud 二代架构&quot;">​</a></h3><p>Spirng Cloud 二代架构在一代架构的基础上替换了几个组件，主要是 Eureka 替换成了 Nacos，二代架构引入了 Spring Cloud Alibaba，Nacos 就是其中比较重要的一个组件。Eureka 之前官方也宣布了暂停了 2.X 版本的开发，1.X 的版本还会维护。其实对于一般的服务规模，目前的 Eureka 完全够用了。而 Nacos 作为后起之秀，目前更新频率很高，社区也更活跃，使用 Nacos 是一个正确的选择。</p><p>Apollo 也替换成了 Nacos，Nacos 是既可以做注册中心，又可以做配置中心，替换的原因在于既然我们都用 Nacos 做注册中心了，顺便就用它的配置功能，这样我们就可以少维护一个组件。</p><p>网关从 Zuul 替换成 Spring Cloud Gateway，在 Spring Cloud Gateway 出现之前，网关都是用 Zuul 构建的，虽然 Netflix 开源了 Zuul2，由于各种原因，官方并没有打算将 Zuul2 集成到 Spring Cloud 体系中。</p><p>而是自己研发了一个全新的网关 Spring Cloud Gateway，由于 Zuul1 基于 Servlet 构建，使用的是阻塞的 IO，性能并不是很理想。Spring Cloud Gateway 则基于 Spring 5、Spring boot 2 和 Reactor 构建，使用 Netty 作为运行时环境，比较完美的支持异步非阻塞编程。</p><p>官方提供的压测报告显示 Spring Cloud Gateway 的性能是 Zuul 的 1.5 倍，Spring Cloud Gateway 刚出不久，稳定性有待验证，主要是缺乏大规模流量的验证，而 Zuul 开源的时间较长，同时在 Netflix 内部经过了大规模流量的验证，比较稳定。长期发展来说，Spring Cloud Gateway 的优势比较大，毕竟官方主推。</p><p>Hystrix 替换成了 Sentinel，Hystrix 也停止了开发，这个时候 Spring Cloud Alibaba 中的 Sentinel 的优势就很明显了，Sentinel 支持多样化的流量控制，熔断降级等功能，完全可以替代 Hystrix。</p><p>Spring Cloud Alibaba 的出现，对于社区，对于开发者都是福音，意味着我们在 Spring Cloud 体系中又多了一种选择，可以选择一开始的 Netflix 中的组件，也可以选择 Alibaba 中的组件。</p><h3 id="技术选型推荐" tabindex="-1">技术选型推荐 <a class="header-anchor" href="#技术选型推荐" aria-label="Permalink to &quot;技术选型推荐&quot;">​</a></h3><p>最后，总结使用 Spring Cloud 来构建微服务架构时我们可以使用哪些框架，为大家做技术选型提供一个参考：</p><ul><li><p>服务注册与发现：Nacos</p></li><li><p>服务熔断限流：Sentinel</p></li><li><p>服务通信调用：Feign</p></li><li><p>配置中心：Nacos</p></li><li><p>服务网关：Spring Cloud Gateway</p></li><li><p>分布式事务：Seata</p></li><li><p>消息队列：RocketMQ</p></li><li><p>调用链监控：Sleuth+Zipkin</p></li><li><p>分布式任务调度：XXL-JOB</p></li></ul><p>好了，到这里本专栏的全部内容就讲完了，希望你可以在项目中结合所学的知识，融会贯通，也感谢你对本专栏的支持，谢谢。</p>',48),n=[r];function p(t,b,u,d,s,c){return l(),i("div",null,n)}const g=a(o,[["render",p]]);export{h as __pageData,g as default};
