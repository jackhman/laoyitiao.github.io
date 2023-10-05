import{_ as r,j as a,o as s,g as n,k as e,s as l,h as t,Q as i}from"./chunks/framework.4e7d56ce.js";const _l=JSON.parse('{"title":"配置中心 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/041_300分钟搞懂 Spring Cloud/(95) 第07讲：分布式配置中心-Apollo.md","filePath":"posts/backEnd/041_300分钟搞懂 Spring Cloud/(95) 第07讲：分布式配置中心-Apollo.md","lastUpdated":1696417798000}'),p={name:"posts/backEnd/041_300分钟搞懂 Spring Cloud/(95) 第07讲：分布式配置中心-Apollo.md"},g=l("p",null,"本课时我们主要讲解：配置中心解决的业务痛点、Apollo 基础知识以及如何使用、Apollo 架构设计，以及核心源码分析等内容。",-1),c=l("h6",{id:"配置中心",tabindex:"-1"},[t("配置中心 "),l("a",{class:"header-anchor",href:"#配置中心","aria-label":'Permalink to "配置中心"'},"​")],-1),u=l("p",null,"配置中心是用来统一管理配置信息的产品，配置中心可以在微服务等场景下极大地减轻配置管理的工作量，增强配置管理的服务能力。",-1),d=l("p",null,"目前主流的配置中心有 Apollo、Spring Cloud Config、Nacos 等开源产品，每款配置中心都能满足统一管理配置的需求，不同的点在于是否能够快速让用户使用，部署难度，功能细节，扩展方法做的是否足够友好。",-1),A=l("h6",{id:"产生的必然原因",tabindex:"-1"},[t("产生的必然原因 "),l("a",{class:"header-anchor",href:"#产生的必然原因","aria-label":'Permalink to "产生的必然原因"'},"​")],-1),_=l("p",null,"在没有使用配置中管理配置的时候，我们的配置文件都是跟着项目走的，也就是存放在项目中的目录下，一个项目中可能有多个配置文件。",-1),h=l("p",null,"当项目发布的时候，会先编译打包，同时配置文件也会被打包进去，也就是配置文件会跟着项目一起发布。这样存在的问题是当我们需求修改配置的时候，需要重新在本地修改，然后重新发布才可以让新的配置生效，当请求压力越来越大，你的项目也会从 1 个节点变成多个节点，这个时候如果配置需要发生变化，对应的修改操作也是相同的，只需要在项目中修改一次即可，但对于发布操作工作量就比之前大了很多，因为要发布多个节点。",-1),C=l("p",null,"修改这些配置，发布的工作降低了整体的工作效率，为了能够提升工作效率，配置中心应运而生了，我们可以将配置统一存放在配置中心来进行管理。",-1),m=l("h6",{id:"配置中心管理配置",tabindex:"-1"},[t("配置中心管理配置 "),l("a",{class:"header-anchor",href:"#配置中心管理配置","aria-label":'Permalink to "配置中心管理配置"'},"​")],-1),S=l("p",null,"使用配置中心管理配置后，我们就可以将配置信息从项目中转移到配置中心，一般一个项目会有一个唯一的标识 ID, 也就是身份信息，通过这个 ID 从配置中心获取对应的配置内容。",-1),f=i('<p>主要的流程分为两个步骤，一个是拉取，一个是推送。拉取是在项目启动的时候通过配置中心拉取配置信息，推送则是配置中心必须要有的功能，如果没有推送功能，配置中心就没那么重要了。</p><p>之所以说推送是必须要有的功能，是因为我们在配置中心修改配置之后，可以将配置实时地推送给客户端进行更新，这样项目不用重启，修改配置实时生效，延迟较低。如果没有推送功能，手动将数据存在数据库中，写个定时任务去拉取配置，也同样可以做到配置统一管理，当然这是最简单的方式。</p><p>配置中心除了配置修改实时生效，还有很多其他的功能点，能帮助我们解决经常碰到的问题，后面会仔细分析。</p><h6 id="解决的痛点" tabindex="-1">解决的痛点 <a class="header-anchor" href="#解决的痛点" aria-label="Permalink to &quot;解决的痛点&quot;">​</a></h6><p>配置中心可以解决工作中的很多痛点，我在这里总结了几个给大家分享下。</p><ul><li>每个节点都要重启</li></ul><p>这个前面已经提到过了，没有使用配置中心之前，配置是跟着项目走的，会和项目一起发布，当部署多个节点以后，就需要修改配置，然后每个节点都需要重新发布，费时费力。</p><ul><li>格式不规范</li></ul><p>这个问题也是很常见的，我见过在很多项目中既有属性配置，也有 JSON 配置，甚至还有 TXT 的文本配置，五花八门。当然这个问题就算使用了配置中心还是有可能会存在，本质上是一个规范问题，配置中心也是支持多种配置文件类型的，尽量在使用时进行统一，但是配置中心的好处在于可以进行统一管理。</p><ul><li>容易被错改</li></ul><p>当配置文件跟着项目走的时候，为了区分多环境，一个配置文件对应一个环境，但配置文件容易被错改，比如线上的配置很有可能被改成线下的配置，配置文件都在项目中，大家都可以修改。</p><ul><li>没有历史记录</li></ul><p>没有历史记录指的是对配置的修改没有很直观的可以查看操作记录的地方，比如你的项目用 Git 管理，那么只能通过查找 Git 的修改记录来查看是谁修改的配置，改成了什么样，要恢复的话还得重新修改配置并提交，在配置中心里面可以直接在 Web 管理界面查看配置的修改记录，也可以直接一键回退到某个修改的版本。</p><ul><li>安全性不高</li></ul><p>配置跟代码是存储在一起的，一旦代码泄露就会导致你的配置信息也被别人知道了，比如数据库，一些比较敏感的信息是绝对不能泄露的，如果我们的配置在配置中心里，就算源代码泄露了，别人也无法获取到这个项目的配置信息，配置仍旧是安全的，当然在配置中心里我们也可以将敏感的配置进行加密存储来提高安全性。</p><h6 id="apollo-基础知识" tabindex="-1">Apollo 基础知识 <a class="header-anchor" href="#apollo-基础知识" aria-label="Permalink to &quot;Apollo 基础知识&quot;">​</a></h6><p>了解了什么是配置中心，以及配置中心能够解决的痛点，我们接下来主要学习如何使用 Apollo 进行配置。</p><p>Apollo（阿波罗）是携程框架部门研发的分布式配置中心，能够集中化管理应用不同环境、</p><p>不同集群的配置，配置修改后能够实时推送到应用端，并且具备规范的权限、流程治理等特性，</p><p>适用于微服务配置管理场景。</p><h6 id="主要功能" tabindex="-1">主要功能 <a class="header-anchor" href="#主要功能" aria-label="Permalink to &quot;主要功能&quot;">​</a></h6><p>下面来看下 Apollo 的主要功能点。</p><ul><li>统一管理不同环境、不同集群的配置</li></ul><p>在 Apollo 中可以对配置进行环境的隔离，不同环境下的配置是不一样的，比如测试环境和线上环境。除了环境隔离还支持对集群的隔离，功能非常强大。</p><ul><li>配置修改实时生效，也就是热发布功能</li></ul><p>这点很重要，如果修改后不能实时生效，那么还需要重启程序，使用配置中心就没有意义了。</p><ul><li>版本发布管理</li></ul><p>在 Apollo 中修改任何配置都会生成对应的操作版本，当配置出现问题后，可以选择指定的版本进行回退。</p><ul><li>灰度发布</li></ul><p>通过灰度发布，我们可以在修改配置的时候，先指定某个节点进行发布，然后观察这个节点的配置更新后，有没有生效，或者说有没有异常。如果一切正常，那么就可以将需要更新的配置在所有节点发布，如果有问题就回退到这个灰度发布的节点配置信息即可，这样影响面就小很多了。</p><ul><li>权限管理、发布审核、操作审计</li></ul><p>对于配置的操作都有相应的权限控制，这样能防止生产环境的配置不被乱改。</p><ul><li><p>提供 Java 和 .Net 原生客户端。轻松集成，操作简单。</p></li><li><p>提供开放平台 API</p></li></ul><p>如果你的项目不是使用 Java 和 .Net 语言，可以使用开放平台 API 进行配置的操作。</p><ul><li>部署简单</li></ul><p>这点非常重要，很多框架在部署层面非常复杂，依赖各种环境和组件。Apollo 在这方面做的非常好，提供了部署安装包和脚本，部署简单，对外部的依赖也少，目前只需要依赖 MySQL 即可，用于存储配置数据。</p><h6 id="apollo-和-spring-cloud-config-对比" tabindex="-1">Apollo 和 Spring Cloud Config 对比 <a class="header-anchor" href="#apollo-和-spring-cloud-config-对比" aria-label="Permalink to &quot;Apollo 和 Spring Cloud Config 对比&quot;">​</a></h6><p>Spring Cloud 体系中自带的配置中心是 Spring Cloud Config，那为什么我会推荐大家使用 Apollo 来替代 Spring Cloud Config 呢？下面我们来分析下它们各自的特点。</p>',38),P=i('<ul><li>统一配置管理</li></ul><p>Spring Cloud Config 的配置一般都是直接对接 Git 进行存储和管理，Apollo 中的配置信息是存储在 MySQL 中的，前面介绍 Apollo 的时候也讲到过，Apollo 依赖 MySQL。</p><ul><li>多环境区分</li></ul><p>Apollo 和 Spring Cloud Config 都可以在客户端进行指定，Apollo 中还支持对集群的区分。</p><ul><li>实时更新的话</li></ul><p>Spring Cloud Config 还要集成 Bus 消息总线来实现，Apollo 中则是用 HTTP 长连接实现的，不用依赖额外的组件。</p><ul><li>定时拉取</li></ul><p>假如推送失败了，Apollo 还会有拉取的逻辑来更新配置。Spring Cloud Config 我们可以自己扩展来支持定时拉取功能。</p><ul><li>权限控制</li></ul><p>Spring Cloud Config 只能依赖 Git 的控制，Apollo 中有完整的权限控制。</p><ul><li>版本管理</li></ul><p>Spring Cloud Config 也只能依赖 Git，Apollo 有完整的功能实现。</p><ul><li>Web 管理后台</li></ul><p>Spring Cloud Config 没有 Web 管理后台，可以使用 Git 的 Web 界面来修改配置，Apollo 有单独的后台来管理配置信息，非常方便。</p><p>总体来说，之所以选择 Apollo 给大家讲解，是因为 Apollo 有携程线上的业务实践，有 Web 后台管理，可以通过 Web 页面方便的管理配置，用起来也很方便。其实最重要的还是 Web 管理后台，使用 Spring Cloud Config 要么在本地修改，然后提交到 Git，要么就用 Git 的 Web 页面，其实非常不方便。</p><h6 id="概念介绍" tabindex="-1">概念介绍 <a class="header-anchor" href="#概念介绍" aria-label="Permalink to &quot;概念介绍&quot;">​</a></h6><ul><li><strong>应用</strong></li></ul><p>应用就是指我们的项目，Apollo 客户端在运行时需要知道应用的标识，从而可以根据这个标识去配置中心获取对应的配置。</p><p>应用的标识用 appId 来指定，指定 appId 的方式有多种，Spring Boot 项目中建议直接配置在 application.properties 中，跟着项目走。</p><ul><li><strong>环境</strong></li></ul><p>环境就是指常见的开发、测试、生产等，不同的环境对应的配置内容是不一样的。Apollo 客户端在运行时除了需要知道项目当前的身份标识，还需要知道当前项目对应的环境，从而可以根据环境去配置中心获取对应的配置。</p><p>指定项目当前环境的方式有多种，可以通过 Java System Property 或者配置文件来指定。目前支持的环境有 Local（本地环境，加载本地配置）、DEV（开发环境）、FAT（测试环境）、UAT（集成环境）、PRO（生产环境）。</p><ul><li><strong>集群</strong></li></ul><p>在多机房的环境下，针对不同的机房，我们可以划分出不同的集群，集群可以有不同的配置。指定项目对应集群的方式有多种，可以通过 Java System Property 或者配置文件来指定。</p><ul><li><strong>命名空间</strong></li></ul><p>命名空间可以用来对配置做分类，不同类型的配置存放在不同的命名空间中，如数据库配置文件、消息队列配置、业务相关的配置等。命名空间还有公共的一个特性，可以让多个项目共用同一份配置，比如 Redis 集群配置。</p><ul><li><strong>权限控制</strong></li></ul><p>通过权限控制可以防止配置被不相干的人误操作，比如对于开发人员，可以只分配测试环境的修改权限和发布权限，只有项目负责人才能有正式环境的权限。</p><h6 id="apollo-使用" tabindex="-1">Apollo 使用 <a class="header-anchor" href="#apollo-使用" aria-label="Permalink to &quot;Apollo 使用&quot;">​</a></h6><h6 id="快速体验" tabindex="-1">快速体验 <a class="header-anchor" href="#快速体验" aria-label="Permalink to &quot;快速体验&quot;">​</a></h6><p>官方为了方便大家了解 Apollo 的功能点，提供了快速体验的演示环境，我们可以通过演示环境（106.12.23.204：8070，账户/密码：apollo/admin）来熟悉 Apollo 的功能。</p><p>当然官方也提供了本地快速启动包，可以在 GitHub 上进行下载，下载后是一个压缩包，需要将 SQL 目录的脚本导入数据库中，然后修改 demo.sh 中的脚本，修改数据库的地址，最后执行 demo.sh start 来启动所有的服务。</p><h6 id="spring-boot-集成-apollo" tabindex="-1"><strong>Spring Boot 集成 Apollo</strong> <a class="header-anchor" href="#spring-boot-集成-apollo" aria-label="Permalink to &quot;**Spring Boot 集成 Apollo**&quot;">​</a></h6>',33),b=l("p",null,"我们接下来学习如何在 Spring Boot 中集成 Apollo，首先在 pom 中加入 apollo-client 的依赖，然后在 application 属性文件中增加 Apollo 的配置信息，app.id 是项目的唯一标识，跟 Apollo 中的项目一一对应，apollo.meta 就是 meta Server 的地址，namespaces 是我们需要加载的命名空间。这边少了环境的配置，也就是当前的配置读取哪个环境下的信息，是开发环境，还是测试环境，或是生产环境。",-1),v=l("p",null,"Apollo 中环境的指定有多种方式，在实际使用中，我推荐将环境和 meta Server 的地址配置在本地磁盘中，Linux 下配置路径是 /opt/settings/server.properties。这边为了演示方式，直接在启动的时候通过 System.setProperty 来指定对应的环境，在启动类中可以看到指定了 DEV 环境。",-1),M=l("p",null,"然后我们来演示下配置的读取，首先来看直接注入 Config 接口，通过接口的 getProperty",-1),B=l("p",null,"方法来获取配置信息，这边获取了配置 key 为 username 的配置，并指定了默认值。当配置中心无此配置时才会用默认值，访问接口可以看到输出的配置内容，然后我们在后台将配置的值修改一下，然后再次访问，可以看到值变成了最新修改的内容，秒级实时生效。",-1),T=l("p",null,"第二种方式是通过 Spring 的 @Value 注解来读取配置信息，冒号后是默认值，同样的访问接口进行测试。",-1),k=l("p",null,"第三种方式是创建一个配置类，通过 @ConfigurationProperties 来读取，可以指定配置的前缀，将一组配置统一读取，在使用时直接注入这个自定义的配置类，然后访问配置类的 get 方法获取对应的配置信息。",-1),V=l("p",null,"第四种是 @ApolloJsonValue 注解的使用，可以将配置的值存储成 JSON 格式，在读取的时候使用 @ApolloJsonValue 将 JSON 格式的值直接转换成对应的实体对象，非常方便。",-1),D=l("p",null,"最后来看下配置变更监听的使用方式，同样的只需要加一个 @ApolloConfigChangeListener",-1),R=l("p",null,"注解就可以对配置的变更进行监听了，ConfigChangeEvent 可以获取变更的 key，监听可以用来实现很多扩展工作，比如动态刷新日志级别，动态控制限流速度等场景。",-1),E=l("h6",{id:"apollo-架构设计",tabindex:"-1"},[t("Apollo 架构设计 "),l("a",{class:"header-anchor",href:"#apollo-架构设计","aria-label":'Permalink to "Apollo 架构设计"'},"​")],-1),y=i('<p>接下来，我们来介绍下在 Apollo 架构中的一些概念：</p><ul><li><strong>Config Service</strong></li></ul><p>服务于 Client（项目中的 Apollo 客户端）对配置的操作，提供配置的查询接口，提供配置更新推送接口（基于Http long polling）。</p><ul><li><strong>Admin Service</strong></li></ul><p>服务于后台 Portal（Web 管理端），提供配置管理接口。</p><ul><li><strong>Meta Server</strong></li></ul><p>Meta Server 是对 Eureka 的一个封装，提供了 HTTP 接口获取 Admin Service 和 Config Service 的服务信息。部署时和 Config Service 是在一个 JVM 进程中的，所以 IP、端口和 Config Service 一致。</p><ul><li><strong>Eureka</strong></li></ul><p>用于提供服务注册和发现，Config Service 和 Admin Service 会向 Eureka 注册服务。为了简化部署流程，Eureka 在部署时和 Config Service 是在一个 JVM 进程中，也就是说 Config Service 同时包含了 Eureka 和 Meta Server。</p><ul><li><strong>Portal</strong></li></ul><p>后台 Web 界面管理配置，通过 Meta Server 获取 Admin Service 服务列表（IP + Port）进行配置的管理，客户端内做负载均衡。</p><ul><li><strong>Client</strong></li></ul><p>Apollo 提供的客户端，用于项目中对配置的获取、更新。通过 Meta Server 获取 Config Service 服务列表（IP + Port）进行配置的管理，客户端内做负载均衡。</p><p>然后我们根据架构图来分析下 Apollo 的工作流程。</p><ol><li><p>注册、续约、取消，也就是服务注册的操作，在 Eureka 课时中我们讲解过，Config Service 和 Admin Service 都会注册到 Eureka 中。</p></li><li><p>服务发现的逻辑，Client 需要知道所有的 Config Service，Portal 需要知道所有的 Admin Service，然后才能发起对应的操作。查找服务列表是通过负载进行转发到 Meta Server。</p></li><li><p>Meta Server 去 Eureka 中获取对应的服务列表了。</p></li><li><p>当获取到对应的服务信息后，就可以直接发起远程调用了。</p></li></ol><h6 id="推送设计" tabindex="-1">推送设计 <a class="header-anchor" href="#推送设计" aria-label="Permalink to &quot;推送设计&quot;">​</a></h6><p>配置中心最重要的一个特性就是实时推送了，正因为有这个特性，我们可以依赖配置中心做很多事情。如图简要描述了配置发布的大致过程。</p>',17),x=l("p",null,"用户会在 Portal 中进行配置的编辑和发布操作，Portal 会调用 Admin Service 提供的接口进行发布操作。Admin Service 收到请求后，发送 ReleaseMessage 给各个 Config Service，通知 Config Service 配置发生了变化。Config Service 收到 ReleaseMessage 后，通知对应的客户端，基于 HTTP 长连接实现。",-1),N=l("h6",{id:"消息设计",tabindex:"-1"},[t("消息设计 "),l("a",{class:"header-anchor",href:"#消息设计","aria-label":'Permalink to "消息设计"'},"​")],-1),I=l("p",null,"ReleaseMessage 消息是通过 MySQL 实现了一个简单的消息队列。之所有没有采用消息中间件，是为了让 Apollo 在部署的时候尽量简单，尽可能减少外部依赖，多一个依赖就多一份维护的工作，同时也就多了一份故障的风险。",-1),q=l("p",null,"如图简要描述了发送 ReleaseMessage 的大致过程。",-1),W=l("p",null,"Admin Service 在配置发布后会往 ReleaseMessage 表插入一条消息记录，Config Service 会启动一个线程定时扫描 ReleaseMessage 表，去查看是否有新的消息记录。Config Service 发现有新的消息记录，那么就会通知所有的消息监听器，消息监听器得到配置发布的信息后，则会通知对应的客户端。",-1),O=l("h6",{id:"客户端设计",tabindex:"-1"},[t("客户端设计 "),l("a",{class:"header-anchor",href:"#客户端设计","aria-label":'Permalink to "客户端设计"'},"​")],-1),F=l("p",null,"如图简要描述了 Apollo 客户端的实现原理。",-1),L=l("p",null,"客户端和服务端保持了一个长连接，编译配置的实时更新推送。定时拉取配置是客户端本地的一个定时任务，默认每 5 分钟拉取一次，也可以通过在运行时指定 System Property: apollo.refreshInterval 来进行覆盖，单位是分钟，采用推送 + 定时拉取的方式就等于双保险。",-1),J=l("p",null,"客户端从 Apollo 配置中心服务端获取到应用的最新配置后，会保存在内存中。客户端会把从服务端获取到的配置在本地文件系统中缓存一份，当服务或者网络不可用时可以使用本地的配置，也就是我们的本地开发模式 env=Local。",-1),Q=l("h6",{id:"集成-spring",tabindex:"-1"},[t("集成 Spring "),l("a",{class:"header-anchor",href:"#集成-spring","aria-label":'Permalink to "集成 Spring"'},"​")],-1),Y=l("p",null,"Apollo 除了支持 API 方式获取配置，也支持和 Spring/Spring Boot 集成，集成后可以直接通过 Spring 的 @Value 注解获取配置，我们来分析下集成的原理。",-1),G=l("p",null,"Spring 从 3.1 版本开始增加了 ConfigurableEnvironment 和 PropertySource：",-1),H=l("ul",null,[l("li",null,[l("p",null,"ConfigurableEnvironment 实现了 Environment 接口，并且包含了多个 PropertySource。")]),l("li",null,[l("p",null,"PropertySource 可以理解为很多个 Key - Value 的属性配置。")])],-1),K=l("p",null,"在运行时的结构如图所示，需要注意的是，PropertySource 之间是有优先级顺序的，如果有一个 Key 在多个 PropertySource 中都存在，那么在前面的 PropertySource 优先级高。",-1),z=l("p",null,"集成的原理就是在应用启动阶段，Apollo 从远端获取配置，然后组装成 PropertySource 并插入到第一个即可。",-1),j=l("h6",{id:"可用性设计",tabindex:"-1"},[t("可用性设计 "),l("a",{class:"header-anchor",href:"#可用性设计","aria-label":'Permalink to "可用性设计"'},"​")],-1),U=i('<p>Apollo 在高可用设计这块下了很大的功夫，下面我们来简单的分析下。</p><ul><li><strong>某台</strong> <strong>Config Service</strong> <strong>下线</strong></li></ul><p>无影响，Config Service 可用部署多个节点。</p><ul><li><strong>所有</strong> <strong>Config Service</strong> <strong>下线</strong></li></ul><p>所有 Config Service 下线会影响客户端的使用，无法读取最新的配置。可以采用读取本地缓存的配置文件来过渡。</p><ul><li><strong>某台</strong> <strong>Admin Service</strong> <strong>下线</strong></li></ul><p>无影响，Admin Service 可用部署多个节点。</p><ul><li><strong>所有</strong> <strong>Admin Service</strong> <strong>下线</strong></li></ul><p>Admin Service 服务于 Portal，所有 Admin Service 下线之后只会影响 Portal 的操作，不会影响客户端，客户端是依赖 Config Service 的。</p><ul><li><strong>某台</strong> <strong>Portal</strong> <strong>下线</strong></li></ul><p>Portal 可用部署多台，通过 Nginx 做负载，某台 Portal 下线之后不影响使用。</p><ul><li><strong>全部</strong> <strong>Portal</strong> <strong>下线</strong></li></ul><p>对客户端读取配置是没有影响的，只是不能通过 Portal 去查看，修改配置。</p><ul><li><strong>数据库宕机</strong></li></ul><p>当配置的数据库宕机之后，对客户端是没有影响的，但是会导致 Portal 中无法更新配置。 如果客户端重启，这个时候需要重新拉取配置，就会有影响，可用采取开启配置缓存的选项来避免数据库宕机带来的影响。</p><p>通过上面的分析，我们可以看出 Apollo 在可用性这块做的确实不错，各种场景会发生的问题都有应对方案，基本上不会有太大问题，大家可以放心大胆的使用。</p><h6 id="核心源码分析" tabindex="-1">核心源码分析 <a class="header-anchor" href="#核心源码分析" aria-label="Permalink to &quot;核心源码分析&quot;">​</a></h6><p>最后我们来剖析下 Apollo 的源码，Apollo 推送这块的代码比较多，就不一一分析了，我把推送这块的代码稍微简化了，给大家进行讲解，这样理解起来会更容易。当然这样会比较简单，很多细节就不再考虑了，只是为了能够让大家明白 Apollo 推送的核心原理。</p><p>我总结了下，Apollo 的长连接主要分为四个步骤：</p><ol><li><p>客户端向 Config Service 发起请求；</p></li><li><p>服务端通过 DeferredResult 异步方式，保持这个请求的同时释放容器线程；</p></li><li><p>如果这个时候配置有变更，直接返回 DeferredResult 结果；</p></li><li><p>如果配置没有变更，将 DeferredResult 存储到 map，并给 DeferredResult 设置超时时间，不响应结果，如果超时了给客户端返回超时，客户端重新发起请求，如果中途发生了变更，从 map 中取出 DeferredResult，并通过 setResult 返回结果给客户端。</p></li></ol><br><p>以上就是 Apollo 长连接推送的核心原理。下面我们来分析下代码。</p>',22),Z=l("p",null,"打开 NotificationControllerV2 类，定义了一个 AddMsg 的方法，发送 ReleaseMessage 的逻辑基于 AddMsg 接口，用于队列存储，测试的时候就调用这个接口模拟配置有更新的情况，发送 ReleaseMessage 消息。",-1),$=l("p",null,"消息发送后，Config Service 会启动一个线程定时扫描 ReleaseMessage 表，去查看是否有新的消息记录，然后通知客户端，这里我们也启动一个线程去扫描 ReleaseMessage 表。打开 ReleaseMessageScanner 类，这里用了一个线程一直负责读取队列，如果读到了数据就调用 NotificationControllerV2 中的 handleMessage 方法。handleMessage 就是当配置发生变化的时候，通知对应的客户端。",-1),w=l("p",null,"Apollo 的实时推送是基于 Spring DeferredResult 实现的，在 handleMessage() 方法中可以看到是通过 deferredResults 获取 DeferredResult，deferredResults 就是第一行的 Multimap，Key 其实就是消息内容，Value 就是 DeferredResult 的业务包装类 DeferredResultWrapper。",-1),X=l("p",null,"客户端接入流程：NotificationControllerV2 中提供了一个 /getConfig 的接口，客户端在启动的时候会调用这个接口，这个时候会执行 getApolloConfigNotifications() 方法获取是否有配置变更的信息，如果有的话证明配置修改过，直接就通过 deferredResultWrapper.setResult(newNotifications); 返回结果给客户端了，客户端收到结果后重新拉取配置的信息进行覆盖本地的配置。",-1),ll=l("p",null,"如果 getApolloConfigNotifications() 方法没有返回配置修改的信息，证明配置没有发生修改，就将 DeferredResultWrapper 对象添加到 deferredResults 中，等待后续配置发生变化时消息监听器进行通知。",-1),ol=l("p",null,"在创建 DeferredResult 对象的时候指定了超时的时间和超时后返回的响应码，请求会挂起，如果 60 秒内没有消息监听器进行通知，那么这个请求就会超时，超时后客户端就收到的响应码就是 304。",-1),el=l("p",null,"打开 ClientTest，首先启动 /getConfig 接口所在的服务，然后启动客户端，客户端就会发起注册请求，如果有修改直接获取结果，进行配置的更新操作。如果无修改，请求会挂起，这边客户端设置的读取超时时间是 90 秒，大于服务端的 60 秒超时时间。",-1),tl=l("p",null,"每次收到结果后，无论是否有修改，都必须重新进行注册，通过这样的方式就可以达到配置实时推送的效果。我们可以调用之前写的 /addMsg 接口来模拟配置发生变化的情况，可以看到调用之后客户端就能马上得到返回结果。",-1),il=l("br",null,null,-1),rl=l("p",null,"本课时主要学习了什么是配置中心及配置中心解决的业务痛点然后对比了 Apollo 和 Spring Cloud Config 的优缺点，介绍了 Apollo 的基本概念及如何使用，重点分析了 Apollo 的架构设计，最后分析了 Apollo 的核心源码，希望你在课后能够熟练掌握本课时的内容。",-1),al=l("br",null,null,-1);function sl(nl,pl,gl,cl,ul,dl){const o=a("Image");return s(),n("div",null,[g,c,u,d,A,_,e(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A2/D1/CgoB5l28B1SAeUNlAACArRLtcVE240.png"}),h,C,m,S,e(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A2/F1/CgotOV28B1WAF4S2AACIYGiePW0196.png"}),f,e(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A2/D1/CgoB5l28B1WASOkYAAA7y7Kuj4o675.png"}),P,e(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A2/F1/CgotOV28B1WADhfnAB8q0bmRRTo125.gif"}),b,e(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A2/D1/CgoB5l28B1WALZEnAAxQ0fjk4zw209.gif"}),v,e(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A2/F1/CgotOV28B1WAKNDDAB_aoNBv2HE107.gif"}),M,B,e(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A2/D1/CgoB5l28B1aAG317AAzM665afCY996.gif"}),T,e(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A2/F1/CgotOV28B1aAZEtlAB8bZLHtO8E954.gif"}),k,e(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A2/D1/CgoB5l28B1eAPvH2ACNIdFxKCQE837.gif"}),V,e(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A2/F1/CgotOV28B1eARWYpACY4cb3myAE618.gif"}),D,R,E,e(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A2/D1/CgoB5l28B1eAT_QKAAIrr-cSeiQ864.png"}),y,e(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A2/F1/CgotOV28B1eAVl80AADzD_Lkc-w754.png"}),x,N,I,q,e(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A2/D1/CgoB5l28B1iAJa9tAACfTre4O3g300.png"}),W,O,F,e(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A2/F1/CgotOV28B1iAHJTnAAFK5jsOc0Q150.png"}),L,J,Q,Y,e(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A2/D1/CgoB5l28B1iAJYdPAAC-xjP6WLY903.png"}),G,H,e(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A2/F1/CgotOV28B1iASfMgAAC9F683nHQ059.png"}),K,z,j,e(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A2/D1/CgoB5l28B1iAUjSmAACLZzn0M5k680.png"}),U,e(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A2/F1/CgotOV28B1iAWyxDABkOCzxySSk513.gif"}),Z,e(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A2/D1/CgoB5l28B1mAE2PEACNyf_DgdlM536.gif"}),$,e(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A2/F1/CgotOV28B1mABbzLACEV1Y3rpmc397.gif"}),w,e(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A2/D1/CgoB5l28B1mAY3zKACn0z-Qllgc346.gif"}),X,e(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A2/F1/CgotOV28B1qAWg5yABKC0bm7mpY637.gif"}),ll,e(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A2/D1/CgoB5l28B1qANYhRAA5S_s3eu2Q160.gif"}),ol,e(o,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/A2/F1/CgotOV28B1qAdAIIACT9ajneUpY998.gif"}),el,tl,il,rl,al])}const hl=r(p,[["render",sl]]);export{_l as __pageData,hl as default};
