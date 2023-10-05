import{_ as p,j as n,o,g as s,k as t,h as i,Q as a,s as e}from"./chunks/framework.4e7d56ce.js";const q=JSON.parse('{"title":"Spring 5 中的响应式编程技术栈 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring 响应式编程实战_文档/(6986) 04  案例驱动：如何基于 Spring 框架来学习响应式编程？.md","filePath":"posts/backEnd/Spring 响应式编程实战_文档/(6986) 04  案例驱动：如何基于 Spring 框架来学习响应式编程？.md","lastUpdated":1696417798000}'),S={name:"posts/backEnd/Spring 响应式编程实战_文档/(6986) 04  案例驱动：如何基于 Spring 框架来学习响应式编程？.md"},c=a('<p>在前面的课时中，我除了对响应式概念和应用场景为你进行了普及以外，还提到了响应式流规范以及响应式编程所包含的一些底层核心组件。相信你也发现了，在现实中，通常不会直接使用这些底层组件来开发应用程序，而是借助特定的开发框架。</p><p>而我们每天都在使用的 Spring 就是这样一款支持响应式编程的开发框架。在今天这一讲中，我将为你梳理 Spring 框架中的响应式编程技术栈，并引出贯穿整个课程的案例系统。</p><h3 id="spring-5-中的响应式编程技术栈" tabindex="-1">Spring 5 中的响应式编程技术栈 <a class="header-anchor" href="#spring-5-中的响应式编程技术栈" aria-label="Permalink to &quot;Spring 5 中的响应式编程技术栈&quot;">​</a></h3><p>2017 年，Spring 发布了新版本 Spring 5，这是从 Spring 4 发布以来将近 4 年的时间中所发布的一个全新版本。Spring 5 引入了很多核心功能，这其中重要的就是全面拥抱了响应式编程的设计思想和实践。</p><p>Spring 5 的响应式编程模型以 Project Reactor 库为基础，而后者则实现了响应式流规范。事实上，Spring Boot 从 2.x 版本开始也是全面依赖 Spring 5。</p><p>针对响应式编程技术栈，有一点你需要注意，即响应式编程并不是只针对系统中的某一部分组件，而是需要适用于调用链路上的所有组件。无论是 Web 层、服务层还是处于下游的数据访问层，只要有一个环节不是响应式的，那么这个环节就会出现同步阻塞，从而导致 02 讲中所介绍的背压机制无法生效。这就是所谓的全栈式响应式编程的设计理念。</p><p>因此，Spring 5 也针对响应式编程构建了全栈式的开发组件。对于常见的应用程序而言，Web 服务层和数据访问层构成了最基本的请求链路。而 Spring 5 也提供了针对 Web 服务层开发的响应式 Web 框架 WebFlux，以及支持响应式数据访问的 Spring Data Reactive 框架。让我们一起来看一下。</p><h4 id="spring-webflux" tabindex="-1">Spring WebFlux <a class="header-anchor" href="#spring-webflux" aria-label="Permalink to &quot;Spring WebFlux&quot;">​</a></h4><p>在 Spring Boot 的基础上，我们将引入全新的 Spring WebFlux 框架。WebFlux 框架名称中的 Flux 一词就来源于 Project Reactor 框架中的 Flux 组件，我会在&quot;06 | 流式操作：如何使用 Flux 和 Mono 高效构建响应式数据流&quot;中对该组件和你展开详细的讨论。</p><p>WebFlux 功能非常强大，不仅包含了对创建和访问响应式 HTTP 端点的支持，还可以用来实现服务器推送事件以及 WebSocket。我们无意对该框架的所有功能做全面介绍，对于应用程序而言，开发人员的主要工作是基于 HTTP 协议的响应式服务的开发，这也是本课程内容的一大重点。</p><p>下图展示了 spring-boot-starter-webflux 2.2.4 RELEASE 版本的依赖组件，可以看到该版本在 spring-boot-starter 2.2.4 RELEASE 版本的基础上依赖于 spring-webflux 5.2.3.RELEASE 版本，而后者同样依赖 spring-web 5.2.3.RELEASE 版本以及 3.2.3.RELEASE 版本的 reactor-core 组件。</p>',11),g=e("p",null,"图 1 spring-boot-starter-webflux 的依赖组件",-1),_=e("p",null,"Spring WebFlux 提供了完整的支持响应式开发的服务端技术栈，Spring WebFlux 的整体架构如下图所示。",-1),l=e("p",null,"图 2 Spring WebFlux 架构图（来自 Spring 官网）",-1),u=e("p",null,"上图针对传统 spring-webmvc 技术栈和新型的 spring-webflux 技术栈做了一个对比。我们从上往下看，位于最上层所提供的实际上是面向开发人员的开发模式，注意左上部分两者存在一个交集，即 Spring WebFlux 既支持基于 @Controller、@RequestMapping 等注解的传统开发模式，又支持基于 Router Functions 的函数式开发模式。本课程后续内容将分别使用这两个模式来创建响应式 RESTful 服务。",-1),d=e("p",null,"关于框架背后的实现原理，传统的 Spring MVC 构建在 Java EE 的 Servlet 标准之上，该标准本身就是阻塞和同步的。在最新版本的 Servlet 中虽然也添加了异步支持，但是在等待请求的过程中，Servlet 仍然在线程池中保持着线程。而 Spring WebFlux 则是构建在响应式流以及它的实现框架 Reactor 的基础之上的一个开发框架，因此可以基于 HTTP 协议用来构建异步非阻塞的 Web 服务。",-1),b=e("p",null,"最后，我们来看一下位于底部的容器支持。显然，Spring MVC 是运行在传统的 Servlet 容器之上，而 Spring WebFlux 则需要支持异步的运行环境，比如 Netty、Undertow 以及 Servlet 3.1 版本以上的 Tomcat 和 Jetty，因为在 Servlet 3.1 中引入了异步 I/O 支持。",-1),h=e("p",null,"由于 WebFlux 提供了异步非阻塞的 I/O 特性，因此非常适合用来开发 I/O 密集型服务。而在使用 Spring MVC 就能满足的场景下，就不需要更改为 WebFlux。通常，我也不大建议你将 WebFlux 和 Spring MVC 混合使用，因为这种开发方式显然无法保证全栈式的响应式流。",-1),v=e("h4",{id:"spring-data-reactive",tabindex:"-1"},[i("Spring Data Reactive "),e("a",{class:"header-anchor",href:"#spring-data-reactive","aria-label":'Permalink to "Spring Data Reactive"'},"​")],-1),R=e("p",null,"我们知道 Spring Data 是 Spring 家族中专门针对数据访问而开发的一个框架，针对各种数据存储媒介抽象了一批 Repository 接口以简化开发过程。而在 Spring Data 的基础上，Spring 5 也全面提供了一组响应式数据访问模型。",-1),C=e("p",null,"在介绍如何使用 Spring Data 实现响应式数据访问模型之前，我们再来看一下关于 Spring Boot 2 的另一张官网架构图，如下所示。",-1),m=a('<p>图 3 Spring Boot 2 架构图（来自 Spring 官网）</p><p>可以看到，上图底部明确把 Spring Data 划分为两大类型，一类是支持 JDBC、JPA 和部分 NoSQL 的传统 Spring Data Repository，而另一类则是支持 Mongo、Cassandra、Redis、Couchbase 等的响应式 Spring Data Reactive Repository。</p><h3 id="案例驱动-reactivespringcss" tabindex="-1">案例驱动：ReactiveSpringCSS <a class="header-anchor" href="#案例驱动-reactivespringcss" aria-label="Permalink to &quot;案例驱动：ReactiveSpringCSS&quot;">​</a></h3><p>介绍完 Spring 5 中所提供的响应式编程技术栈之后，我们将引出本课程的案例系统 ReactiveSpringCSS，这里的 CSS 是对客户服务系统 Customer Service System 的简称。客户服务是电商、健康类业务场景中非常常见的一种业务场景，我们将通过构建一个精简但又完整的系统来展示 Spring 5 中响应式编程相关的设计理念和各项技术组件。</p><p>现实场景下的客户服务业务逻辑一般都非常复杂，而案例系统的目的在于演示技术实现过程，不在于介绍具体业务逻辑。所以，我们对案例的业务流程做了高度的简化，但会包含 Spring 中所提供的各项响应式编程组件。</p><h4 id="reactivespringcss-整体架构" tabindex="-1">ReactiveSpringCSS 整体架构 <a class="header-anchor" href="#reactivespringcss-整体架构" aria-label="Permalink to &quot;ReactiveSpringCSS 整体架构&quot;">​</a></h4><p>在 ReactiveSpringCSS 中，存在一个 customer-service，这是一个 Spring Boot 应用程序，也是整个案例系统中的主体服务。该服务将采用经典的分层架构，即将服务分成 Web 层、Service 层和 Repository 层。</p><p>我们知道在客服系统中，核心业务是生成客户工单。围绕客户工单的生成过程，ReactiveSpringCSS 的整个系统交互过程如下图所示。</p>',8),x=a('<p>图 4 ReactiveSpringCSS 系统的整体架构图</p><p>可以看到，customer-service 一般会与用户账户服务 account-service 进行交互以获取生成工单所需的用户账户信息，但因为用户账户信息的更新属于低频时间，所以我们设计的实现方式是 account-service 通过消息中间件的方式将用户账户变更信息主动推送给 customer-service，从而完成用户信息的获取操作。而针对 order-service，其定位是订单服务，customer-service 也需要从该服务中查询订单信息。</p><h4 id="reactivespringcss-响应式技术组件" tabindex="-1">ReactiveSpringCSS 响应式技术组件 <a class="header-anchor" href="#reactivespringcss-响应式技术组件" aria-label="Permalink to &quot;ReactiveSpringCSS 响应式技术组件&quot;">​</a></h4><p>在 ReactiveSpringCSS 的整体架构图中，引出了构建一个响应式系统所需的多项技术组件。</p><p>针对 Web 层，我们将使用 Spring WebFlux 组件来分别为 ReactiveSpringCSS 系统中的三个服务构建响应式 RESTful 端点，并通过支持响应式请求的 WebClient 客户端组件来消费这些端点。</p><p>在 Service 层，除了完成 Web 层和数据访问层的衔接作用之外，核心逻辑在于完成事件处理和消息通信相关的业务场景。account-service 充当了消息的发布者，而 customer-service 则是它的消费者。为了实现消息通信机制，就需要引入 Spring Cloud 家族中的 Spring Cloud Stream 组件。同样，在 Spring 5 中，也针对 Spring Cloud Stream 做了响应式升级，并提供了对应的响应式编程组件。</p><p>最后是 Repository 层，我们将引入 MongoDB 和 Redis 这两款支持响应式流的 NoSQL 数据库。其中 MongoDB 用于为各个服务存储业务数据，而 Redis 则主要用在 customer-service 中，我们把从 account-service 中传入的消息数据缓存在 Redis 中以便提升数据访问的性能。针对这两款 NoSQL，我们将分别引入 Spring 5 中的 Spring Data MongoDB Reactive 和 Spring Data Redis Reactive 进行整合。</p><p>当然，对于响应式编程全栈中的各个技术组件，都需要采用有效的测试手段确保其正确性。因此，我们将引入响应式测试组件分别针对响应式流、响应式 Web、响应式消息通信以及响应式数据访问进行全面的测试。</p><p>基于以上讨论，ReactiveSpringCSS 所采用的各项响应式编程技术及其应用方式如下图所示。</p>',9),T=a('<p>图 5 ReactiveSpringCSS 系统的响应式技术组件图</p><p>我将在后续的课程中对上图中的各个技术组件做专题介绍。</p><h3 id="小结与预告" tabindex="-1">小结与预告 <a class="header-anchor" href="#小结与预告" aria-label="Permalink to &quot;小结与预告&quot;">​</a></h3><p>案例分析是掌握一个框架应用方式的最好方法。本课程是一款以案例驱动的响应式应用程序开发课程，今天我们就针对 Spring 5 中所提供的响应式编程组件进行了展开，并引出了贯穿整个课程体系的 ReactiveSpringCSS 案例系统。构建 ReactiveSpringCSS 需要全栈式的响应式编程组件，包括响应式 Web、响应式消息通信以及响应式数据访问。</p><p>这里给你留一道思考题：Spring WebFlux 和 Spring MVC 有哪些不同点？</p><p>从下一讲开始，我将基于 ReactiveSpringCSS 案例来解析 Spring 5 中的响应式编程技术，首当其冲的是实现了响应式流的开发框架 Project Reactor。到时候见。</p><blockquote><p>点击链接，获取课程相关代码↓↓↓<br><a href="https://github.com/lagoueduCol/ReactiveProgramming-jianxiang.git?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">https://github.com/lagoueduCol/ReactiveProgramming-jianxiang.git</a></p></blockquote>',7);function A(W,P,f,D,E,F){const r=n("Image");return o(),s("div",null,[c,t(r,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M01/21/3A/Cgp9HWBUIkiAV-sbAABUZLGbKGw167.png"}),i(),g,_,t(r,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M01/21/37/CioPOWBUIk-ACq-RAACQeZA8Cyk312.png"}),i(),l,u,d,b,h,v,R,C,t(r,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M01/21/3A/Cgp9HWBUIlmAPXzcAACWjgTTFkY994.png"}),i(),m,t(r,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M01/21/3A/Cgp9HWBUImGAJDTfAABpy3ZSzWs199.png"}),i(),x,t(r,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M01/21/3A/Cgp9HWBUImuAJdzJAADUPzZXTjQ358.png"}),i(),T])}const B=p(S,[["render",A]]);export{q as __pageData,B as default};
