import{_ as a,j as i,o as s,h as p,k as e,f as n,Q as r,s as t}from"./chunks/framework.d3daa342.js";const q=JSON.parse('{"title":"开篇词响应式编程：紧跟技术趋势，提升系统弹性","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring 响应式编程实战_文档/(6982) 开篇词  响应式编程：紧跟技术趋势，提升系统弹性.md","filePath":"posts/backEnd/Spring 响应式编程实战_文档/(6982) 开篇词  响应式编程：紧跟技术趋势，提升系统弹性.md","lastUpdated":1696682708000}'),_={name:"posts/backEnd/Spring 响应式编程实战_文档/(6982) 开篇词  响应式编程：紧跟技术趋势，提升系统弹性.md"},g=r('<h1 id="开篇词响应式编程-紧跟技术趋势-提升系统弹性" tabindex="-1">开篇词响应式编程：紧跟技术趋势，提升系统弹性 <a class="header-anchor" href="#开篇词响应式编程-紧跟技术趋势-提升系统弹性" aria-label="Permalink to &quot;开篇词响应式编程：紧跟技术趋势，提升系统弹性&quot;">​</a></h1><p>你好，我是鉴湘，拥有 10 年以上大型 Java EE 和分布式系统的构建和优化经验，曾带领百人团队完成基于 Spring 家族技术体系的亿级用户规模互联网应用系统的建设工作，对基于 Spring 框架进行系统开发和维护有着丰富的实战经验，目前在一家创业企业任 CTO。</p><p>从业生涯中，我曾经带过不少项目。无论是传统电商类系统，还是智能终端平台，都面临着大流量、高并发的访问请求。在各种请求压力下，系统可能会出现一系列可用性问题，但作为系统的设计者，我们需要保证其拥有即时的响应性，如何时刻确保系统具有应对请求压力的弹性，成为一个非常现实且棘手的问题。</p><p>经典的服务隔离、限流、降级以及熔断等机制，能够在一定程度上实现系统的弹性。但我通过对比了更多可选的技术体系之后，发现了构建系统弹性的一种崭新的解决方案，那就是<strong>响应式编程</strong>。</p><h3 id="响应式编程具有什么技术优势" tabindex="-1">响应式编程具有什么技术优势？ <a class="header-anchor" href="#响应式编程具有什么技术优势" aria-label="Permalink to &quot;响应式编程具有什么技术优势？&quot;">​</a></h3><p><strong>响应式编程打破了传统的同步阻塞式编程模型，基于响应式数据流和背压机制实现了异步非阻塞式的网络通信、数据访问和事件驱动架构，能够减轻服务器资源之间的竞争关系，从而提高服务的响应能力</strong>。</p><p>可以设想一下，当系统中存在的服务 A 需要访问服务 B 时，在服务 A 发出请求之后，执行线程会等待服务 B 的返回，这段时间该线程就是阻塞的，整个过程的 CPU 利用效率低下，很多时间线程被浪费在了 I/O 阻塞上，见下图：</p>',7),l=t("p",null,"服务 A 和服务 B 的交互过程图",-1),c=t("p",null,"更进一步，当你执行数据访问时，数据库的执行操作也面临着同样的阻塞式问题，整个请求链路的各个环节都会导致资源的浪费，从而降低系统弹性。而引入响应式编程技术，可以很好地解决这种问题。",-1),d=t("p",null,"说到这里，你可能会问，如何来应用响应式编程技术呢？它的开发过程是不是很有难度？",-1),h=t("p",null,[n("完全不用担心，因为 Spring 5 的正式发布，带来了响应式编程的全新发展时期。"),t("strong",null,"响应式编程是Spring 5版本中引入的最大变革，也是 Spring 目前重点推广的技术体系"),n("。Spring 5 中内嵌了响应式 Web 框架、响应式数据访问、响应式消息通信等多种响应式组件，从而极大简化了响应式应用程序的开发过程和难度。")],-1),S=t("h3",{id:"你为什么需要学习这门课程",tabindex:"-1"},[n("你为什么需要学习这门课程？ "),t("a",{class:"header-anchor",href:"#你为什么需要学习这门课程","aria-label":'Permalink to "你为什么需要学习这门课程？"'},"​")],-1),u=t("p",null,"当下，随着微服务架构的不断发展以及各种中间件技术的日益成熟，响应式编程所提供的异步非阻塞式编程模型非常适合用来构建技术驱动的服务化架构体系。",-1),m=t("p",null,"同时，各种新型互联网应用得到了高速发展，在各种流量压力之下，掌握应对这种压力相关技术的开发人员和架构师成为稀缺人才，被行业争抢。",-1),b=r('<p>图片来自拉勾网</p><p><strong>对于开发人员而言，需要熟练使用这些基于响应式编程技术所构建的开源框架，来应对业务发展的需求</strong>。例如，在目前主流微服务开发框架 Spring Cloud 中的一个网关工具 Spring Cloud Gateway，相比 Netflix 中提供的基于同步阻塞式模型的 Zuul 网关，其性能显著提升，原因就是采用了异步非阻塞式的实现机制，而这一机制的实现正是借助响应式编程框架 Project Reactor 以及 Spring 5 中所内嵌的相关开发技术。开发人员在使用 Spring Cloud Gateway 时通常会涉及开发各种过滤器组件，这就需要掌握响应式编程的技术体系，才能更好地应用这个框架，从而满足系统构建的需求。</p><p><strong>对于架构师而言，需要熟练掌握这些开源框架和中间件的核心原理，以便更好地对框架进行维护、优化，甚至二次开发</strong>。再举个例子，我们知道在 Spring Cloud 中存在一个 Netflix Hystrix 组件，这是专门用来实现服务限流的熔断器组件。在这个组件中，有一个 HealthCountsStream 类来提供滑动窗口机制，从而完成对运行时请求数据的动态收集和处理。Hystrix 在实现这一机制时大量采用了数据流处理方面的技术以及 RxJava 这个响应式编程框架。只有熟练掌握响应式编程技术体系，你才更能读懂 Hystrix 的源码并深入剖析其背后的实现机制。</p><p>基于响应式编程自身的特点，以及在现实中越来越多的应用，可以说<strong>它代表了一种新型的编程模型，代表了一种技术发展和演进的趋势。紧跟这一趋势，对于提升你的职业门槛是一个很好的加分项</strong>。</p><h3 id="这门课程是如何设计的" tabindex="-1">这门课程是如何设计的？ <a class="header-anchor" href="#这门课程是如何设计的" aria-label="Permalink to &quot;这门课程是如何设计的？&quot;">​</a></h3><p>这会是<strong>首个系统化课程，旨在弥补此前基于 Spring 5 的响应式编程系统化学习的空白</strong>。</p><p>我结合个人多年的架构经验，以及对响应式编程技术体系的理解，整理出了一套<strong>系统化、由浅入深</strong> 的学习路径，<strong>不仅可以带你掌握响应式编程的全局，而且可以从实战角度出发，高效掌握基于 Spring 框架的响应式编程使用方法和开发技巧</strong>。</p><p>在响应式编程领域存在一个核心的理念，即全栈式响应式编程，也就是响应式开发方式的有效性取决于在整个请求链路的各个环节是否都采用了响应式编程模型。基于这一理念，我结合常见的分布式服务架构中的完整请求链路来设计了课程体系。</p>',8),A=r("<p>分布式服务架构的请求链路</p><p>基于如上图所示的分布式系统中 Web 服务的拆分维度，我将整个课程设计为 6 大部分，并结合 Spring 框架，向你介绍如何从零构建一个响应式的应用程序。</p><ul><li><p><strong>基本概念篇</strong>，介绍响应式编程的核心组件与技术体系，分析其应用场景，并提供一个 ReactiveSpringCSS 案例来贯穿整个响应式 Spring 的学习过程。</p></li><li><p><strong>编程框架篇</strong>，介绍 Spring 5 中内置的响应式编程框架 Project Reactor，给出基于该框架高效构建响应式数据流，以及基于各种操作符来处理响应式数据流的系统方法。只有掌握了 Project Reactor 编程框架，才能进一步学习 Spring 中所提供的各项响应式编程组件。</p></li><li><p><strong>技术组件之响应式 Web 服务篇</strong>，介绍基于 Spring 构建响应式 Web 服务的系统方法，以及实现多个 Web 服务之间的非阻塞式交互和集成过程。同时，我也将对 RSocket 这款高性能网络通信协议展开讨论，使你掌握构建 Web 服务的系统方法，并学会创建响应式系统中的 Web 层组件。</p></li><li><p><strong>技术组件之响应式数据访问篇</strong>，将针对 MongoDB 和 Redis 这两款提供了响应式数据驱动的 NoSQL，讨论实现响应式数据访问的系统方法，并探讨在传统关系型数据库中引入响应式编程技术的可行性。希望这个模块能够帮助你掌握实现数据访问层的系统方法，并在响应式系统中嵌入 MongoDB、Redis 等主流 NoSQL 技术。</p></li><li><p><strong>技术组件之响应式消息通信篇</strong>，介绍消息通信的基本概念，以及基于 Spring Cloud Stream 所提供的响应式编程组件来完成与 RabbitMQ 等主流消息中间件之间的集成。我会带你一起探究实用的开发技巧，实现跨服务之间的响应式消息通信。</p></li><li><p><strong>技术组件之响应式测试篇</strong>，介绍针对案例系统中各层响应式组件进行有效测试的解决方案，重点关注如何实施针对响应式数据访问层和服务集成层的系统化测试方法和工程实践。这是一个&quot;收&quot;的模块，是对前几个模块成果的检验。</p></li></ul>",3),C=t("p",null,[n("此外，各个响应式编程核心组件以及基于 Spring 框架的实现方式，我都会按照完整的案例分析给出详细的代码实现方案，方便你进行学习和改造。课程配套代码，你可以在"),t("a",{href:"https://github.com/lagoueduCol/ReactiveProgramming-jianxiang.git?fileGuid=xxQTRXtVcqtHK6j8",target:"_blank",rel:"noreferrer"},"https://github.com/lagoueduCol/ReactiveProgramming-jianxiang.git"),n("进行下载。")],-1),P=t("h3",{id:"讲师寄语",tabindex:"-1"},[n("讲师寄语 "),t("a",{class:"header-anchor",href:"#讲师寄语","aria-label":'Permalink to "讲师寄语"'},"​")],-1),T=t("p",null,"在现代互联网应用系统开发过程中，即时响应是可用性和实用性的基石。如何使得系统具有弹性和伸缩性是一大挑战，我们需要引入新的架构模式和编程技术，以满足不断增长的对便捷高效服务的需求。而响应式编程代表的就是这样一种全新的编程模型，也是目前 Spring 家族框架中主推的一项技术体系。",-1),f=t("p",null,'对于开发者来说，掌握响应式编程将成为你实现自我提升的一个"契机"，能够让你脱颖而出，获取更多从事系统架构和优化，以及获取心仪大厂的 Offer 的机会。',-1),x=t("p",null,"最后，欢迎你在留言区分享相关经历和经验，我也将和你共同探讨，一起向前！",-1);function R(k,V,N,B,W,D){const o=i("Image");return s(),p("div",null,[g,e(o,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M01/21/30/CioPOWBUG6KATK1_AACXEb1VXVw840.png"}),n(),l,c,d,h,S,u,m,e(o,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M00/21/34/Cgp9HWBUG7WAFLQMAApLFtP4RU8441.png"}),n(),b,e(o,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M01/21/31/CioPOWBUG8GANZDnAAEppRV0il4397.png"}),n(),A,e(o,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image6/M00/21/34/Cgp9HWBUG8uALiz3AAQqPoZFejk244.png"}),n(),C,P,T,f,x])}const I=a(_,[["render",R]]);export{q as __pageData,I as default};
