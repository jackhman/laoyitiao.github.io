import{_ as r,j as a,o as i,g as l,k as o,h as s,s as t,Q as n}from"./chunks/framework.4e7d56ce.js";const W=JSON.parse('{"title":"为什么要实现服务容错？ ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4757) 12  服务容错：如何理解服务消费者容错思想和模式？.md","filePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4757) 12  服务容错：如何理解服务消费者容错思想和模式？.md","lastUpdated":1696417798000}'),_={name:"posts/backEnd/Spring Cloud 原理与实战_文档/(4757) 12  服务容错：如何理解服务消费者容错思想和模式？.md"},p=t("p",null,[s("在介绍完 API 网关之后，我们继续讨论微服务架构中的一个核心话题，即"),t("strong",null,"服务容错"),s(" 。相较传统单体系统中的函数级调用，跨进程的远程调用要复杂很多，也更容易出错。今天的内容关注服务容错的"),t("strong",null,"设计理念"),s(" 和与其相关的"),t("strong",null,"架构模式"),s("。")],-1),c=t("h3",{id:"为什么要实现服务容错",tabindex:"-1"},[s("为什么要实现服务容错？ "),t("a",{class:"header-anchor",href:"#为什么要实现服务容错","aria-label":'Permalink to "为什么要实现服务容错？"'},"​")],-1),g=t("p",null,"我们知道，在微服务架构中，服务之间通过跨进程的远程调用来完成交互。假设系统中存在两个微服务，分别是服务 A 和服务 B，其中服务 B 会调用服务 A，如下图所示：",-1),d=t("p",null,"服务 B 调用服务 A 示意图",-1),h=t("p",null,"现在，系统出现故障了。首先，服务 A 因为某种原因发生了宕机而变得不可用，这是故障的第一阶段。如下图所示：",-1),u=t("p",null,"服务 A 变得不可用示意图",-1),C=t("p",null,"服务 A 不可用的原因有很多，包括服务器硬件等环境问题，也包括服务自身存在 Bug 等因素。而当访问服务 A 得不到正常的响应时，服务 B 的常见处理方式是通过重试机制来进一步加大对服务 A 的访问流量。这样，服务 B 每进行一次重试就会启动一批线程。我们知道线程的不断创建是需要消耗系统资源的，一旦系统资源被耗尽，服务 B 本身也将变得不可用，这就是事故的第二个阶段：",-1),A=n("",6),m=n("",5),S=n("",6),k=t("p",null,"三个微服务共享线程池的场景示意图",-1),B=t("p",null,"在上图中，如果其中的 user-service 不可用, 就会出现线程池里所有线程被这个服务消耗殆尽 从而造成服务雪崩，如下图所示：",-1),T=t("p",null,"没有使用线程池隔离造成的服务雪崩场景示意图",-1),b=t("p",null,"现在，系统中的 300 个线程都被 user-service 所占用，device-service 和 intevention-service 已经分不到任何线程来响应请求。",-1),F=t("p",null,"线程隔离机制的实现方法也很简单，就是为每个服务分配独立的线程池以实现资源隔离，例如我们可以为 3 个服务平均分配 100 个线程，见下图：",-1),f=t("p",null,"使用线程池隔离的场景示意图",-1),v=t("p",null,"在上图中, 当 user-service 不可用时, 最差的情况也就是消耗分配给它的 100 个线程，而其他的线程都还是属于各个微服务中，不会受它的影响。",-1),P=t("p",null,"从服务隔离的角度讲，线程隔离是一种比较细粒度的处理机制。而 Spring Cloud Circuit Breaker 同样对服务隔离提供了不同维度和粒度的支持。",-1),q=t("h4",{id:"服务熔断",tabindex:"-1"},[s("服务熔断 "),t("a",{class:"header-anchor",href:"#服务熔断","aria-label":'Permalink to "服务熔断"'},"​")],-1),x=t("p",null,'讲完服务隔离，接下来我们来看服务熔断。服务熔断的概念来源于日常生活中的电路系统，在电路系统中存在一种熔断器（Circuit Breaker），它的作用就是在电流过大时自动切断电路。在微服务架构中，也存在类似的"熔断器"：当系统中出现某一个异常情况时，能够直接熔断整个服务的请求处理过程。这样可以避免一直等到请求处理完毕或超时，从而避免浪费。',-1),I=t("p",null,"从设计理念上讲，服务熔断也是快速失败的一种具体表现。当服务消费者向服务提供者发起远程调用时，服务熔断器会监控该次调用，如果调用的响应时间过长，服务熔断器就会中断本次调用并直接返回。请注意服务熔断器判断本次调用是否应该快速失败是有状态的，也就是说服务熔断器会把所有的调用结果都记录下来，如果发生异常的调用次数达到一定的阈值，那么服务熔断机制才会被触发，快速失败就会生效；反之，将按照正常的流程执行远程调用。",-1),M=t("p",null,"我们对以上过程进行抽象和提炼，可以得到服务熔断器的基本结构，如下图所示：",-1),D=n("",10),E=t("p",null,"Spring Cloud Circuit Breaker 中的四种熔断器实现机制",-1),N=t("p",null,"针对以上四种熔断器，Spring Cloud Circuit Breaker 提供了统一的 API。其中 Netflix Hystrix 显然来自 Netflix OSS；Resilience4j 是受 Hystrix 项目启发所诞生的一款新型的容错库；Sentinel 从定位上讲是一款包含了熔断降级功能的高可用流量防护组件；而最后的 Spring Retry 是 Spring 自研的重试和熔断框架。",-1),V=t("h3",{id:"小结与预告",tabindex:"-1"},[s("小结与预告 "),t("a",{class:"header-anchor",href:"#小结与预告","aria-label":'Permalink to "小结与预告"'},"​")],-1),H=t("p",null,"服务容错是微服务架构中值得深入探讨的一个核心话题，本节的内容关注服务容错的一些理论知识，包括服务容错的设计思想，以及相关的实现模式。今天，我们详细探讨了四种服务容错的实现模式，并结合 Spring Cloud 中的 Spring Cloud Circuit Breaker 框架给出了对应的解决方案。",-1),R=t("p",null,"这里给你留一道思考题：在 Spring Cloud Circuit Breaker 中，分别提供了哪些可以用于实现服务容错的实现技术？",-1),O=t("p",null,"在引入了 Spring Cloud Circuit Breaker 框架之后，下一课时我们先来关注第一种服务容错实现框架，即 Netflix 中的 Hystrix。",-1);function y(z,G,J,$,j,Q){const e=a("Image");return i(),l("div",null,[p,c,g,o(e,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image/M00/65/3C/Ciqc1F-aaAaAF-pdAAC-S7CthIM956.png"}),s(),d,h,o(e,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image/M00/65/48/CgqCHl-aaBGARyczAAGrk2396FY269.png"}),s(),u,C,o(e,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image/M00/65/3D/Ciqc1F-aaB6AOI9LAAKNbr6vP8w792.png"}),s(),A,o(e,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image/M00/65/3D/Ciqc1F-aaCqAdX5XAACeZuy60tk400.png"}),s(),m,o(e,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image/M00/65/3D/Ciqc1F-aaDWAJ6C3AAGFMtzWjWs730.png"}),s(),S,o(e,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image/M00/65/48/CgqCHl-aaD6AREizAAFmbRDmQDg090.png"}),s(),k,B,o(e,{alt:"图片7.png",src:"https://s0.lgstatic.com/i/image/M00/65/48/CgqCHl-aaESAQUZRAACteK33CYI791.png"}),s(),T,b,F,o(e,{alt:"图片8.png",src:"https://s0.lgstatic.com/i/image/M00/65/3D/Ciqc1F-aaEuAM1zFAAHUJoAmO-8574.png"}),s(),f,v,P,q,x,I,M,o(e,{alt:"图片9.png",src:"https://s0.lgstatic.com/i/image/M00/65/48/CgqCHl-aaFaAbhF4AAJes3EgGT8670.png"}),s(),D,o(e,{alt:"图片10.png",src:"https://s0.lgstatic.com/i/image/M00/65/48/CgqCHl-aaF6AMmIgAAChEAOZvc0229.png"}),s(),E,N,V,H,R,O])}const Z=r(_,[["render",y]]);export{W as __pageData,Z as default};
