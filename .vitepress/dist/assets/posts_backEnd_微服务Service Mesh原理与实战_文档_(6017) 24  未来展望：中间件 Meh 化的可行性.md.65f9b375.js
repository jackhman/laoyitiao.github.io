import{_ as n,j as o,o as p,g as r,k as t,h as a,Q as i,s as e}from"./chunks/framework.e0c66c3f.js";const B=JSON.parse('{"title":"中间件 Mesh 化 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/微服务Service Mesh原理与实战_文档/(6017) 24  未来展望：中间件 Meh 化的可行性.md","filePath":"posts/backEnd/微服务Service Mesh原理与实战_文档/(6017) 24  未来展望：中间件 Meh 化的可行性.md","lastUpdated":1696338709000}'),l={name:"posts/backEnd/微服务Service Mesh原理与实战_文档/(6017) 24  未来展望：中间件 Meh 化的可行性.md"},c=i('<p>在前面的章节中，我们讲解了 Service Mesh 如何进一步在生产中落地，以及它的最佳实践。这一讲我们继续来看 Service Mesh 的未来发展趋势。</p><p>从整个开源社区的角度来看，随着云原生和 Kubernetes 的发展，Service Mesh 逐步成为微服务架构的基础组件。</p><p>结合前面讲解过的内容，我们已经知道 Service Mesh 主要接管服务间的流量，包括边缘网关的南北向流量和内部通信的东西向流量。在微服务架构中，除了服务间的流量，服务和中间件通信的流量也非常重要，这块流量的代理也是未来整个微服务 Mesh 化中重要的一环。</p><p>另外随着微服务架构的进一步发展，FaaS（Function as a Service）也是未来微服务架构重要的演进方向之一，在 FaaS 架构中，Service Mesh 同样可以<strong>作为底层基础设施接管服务间的流量</strong>。</p><p>接下来，我们就来看看 Service Mesh 对于数据中间件的支持。</p><h3 id="中间件-mesh-化" tabindex="-1">中间件 Mesh 化 <a class="header-anchor" href="#中间件-mesh-化" aria-label="Permalink to &quot;中间件 Mesh 化&quot;">​</a></h3><p>著名的数据面已经支持了诸多数据库和队列中间件，例如 MySQL、MongoDB、PostgreSQL、Redis、Kafka 等。下面就让我们以 Redis 为例子，看看 Envoy 对于数据中间件的支持。</p><h4 id="redis-代理" tabindex="-1">Redis 代理 <a class="header-anchor" href="#redis-代理" aria-label="Permalink to &quot;Redis 代理&quot;">​</a></h4><p>Envoy 可以作为 Redis 的代理，部署在每个服务的节点上，这样就无须传统的 Redis 中间件负责 Redis 集群的代理工作，也不需要传统 Redis 官方提供的 Smart Client。Envoy 可以替代这部分功能，控制 Redis 集群，路由到正确的 hash 分片节点上。</p><p>使用 Envoy 做 Redis 代理，<strong>既避免了传统的 Smart Client 的升级维护问题，也避免了传统的 Redis 中间件中心化</strong>的问题。通过 Mesh 的架构、Metrics 注入等方式，可以看到到底是哪个服务调用的 Redis，再配合服务间的链路调用图，这样整个内网间所有流量的链路调用图就可以绘制出来了。</p><p>目前 Envoy 的 Redis 代理支持以下功能：</p><ul><li><p>Redis 协议的编解码；</p></li><li><p>基于哈希的分片；</p></li><li><p>Ketama 一致性哈希算法；</p></li><li><p>详细的数据统计信息；</p></li><li><p>对于 Redis 节点的主动和被动健康检查；</p></li><li><p>上游代理和下游代理分别进行身份认证。</p></li></ul><p>通过上述功能，我们可以看到 Envoy 对于 Redis 的支持相对比较简单，当然未来社区也在规划支持更多的功能，包括熔断、链路追踪、重试等。</p><p>数据库中间件产品（比如 Redis 集群中间件、MySQL 集群中间件）的功能主要是对数据做分片处理，以解决单个 Redis 或者 MySQL 节点无法处理的负载。<strong>这些功能最早也在 SDK 中，因为维护升级不方便，所以演进成了数据库中间件</strong>。随着 Mesh 化架构的流行，在服务本地部署一个 Sidecar，就可以解决数据库中间件产品中心化的问题。</p><p>数据库中间件的 Mesh 化和传统的服务 Mesh 化，关注的点略有不同：<strong>数据库的中间件产品更关注的是对于数据的分片处理</strong>，比如 MySQL 的分库分表等算法、Redis 集群的分片算法等。但也有很多功能是通用的，比如限流熔断等治理功能、链路追踪、Metrics 监控，甚至服务发现等功能。</p><p>现在，我们已经了解了数据库中间件产品 Mesh 化的发展方向，接下来我们继续学习在 FaaS 中 Service Mesh 架构到底能发挥什么样的作用。</p><h3 id="faas" tabindex="-1">FaaS <a class="header-anchor" href="#faas" aria-label="Permalink to &quot;FaaS&quot;">​</a></h3><p>FaaS（Function as a Service）是一种在无状态容器中运行的事件驱动模型。简单来说，Function 是比 Service 更小的程序单元，如果要进行标准化的 FaaS 化改造，就需要进一步拆分，<strong>将微服务中的每个方法都拆成一个单独的服务</strong>。</p><p>虽然到目前为止，FaaS 依然是一种非常理想化的架构，比如在服务 0 节点的情况下要消耗大量的时间等待服务启动，但 FaaS 中的一些核心思想，依然是微服务架构的发展趋势，或者说它们可以直接落地，比如强大的自动扩缩容能力、基于异步的事件驱动模型等。</p><p>FaaS 的开源方案有 Knative、OpenFaaS、Fission、Kubeless 等，下面我们简单介绍一下这几种常见的开源方案。</p><ul><li>Knative</li></ul><p>Knative 是谷歌牵头发起的 Serverless 项目，是基于 Kubernetes 和 Istio 的 Serverless 解决方案。</p><ul><li>OpenFaaS</li></ul><p>OpenFaaS 是一个使用 Docker 构建无服务器（Serverless）功能的框架，可以部署在 Kubernetes 或者 Swarm 平台。通过 Watchdog 启动进程的方式进行函数式调用。</p><ul><li>Fission</li></ul><p>Fission 是一款基于 Kubernetes 的 FaaS 框架，通过 Fission 可以轻而易举地将函数发布成 HTTP 服务。它的主要特点是 Fission 维护一个容器池，可以做到函数 100ms 冷启动。</p><ul><li>Kubeless</li></ul><p>Kubeless 是基于 Kubernetes 的 Serverless 框架，借助 Kubernetes 提供自动扩缩容、API 路由、监控的功能。</p><p>这里我们针对 Knative 做具体分析，它借助了 Istio 的强大能力，是未来 FaaS 架构发展的趋势。</p><h4 id="knative" tabindex="-1">Knative <a class="header-anchor" href="#knative" aria-label="Permalink to &quot;Knative&quot;">​</a></h4><p>Knative 包含三个核心组件，分别是负责服务处理的 Serving、事件处理的 Eventing，以及负责云原生 CI/CD 构建的 Tekton。</p><ul><li>Serving</li></ul><p>Knative Serving 组件依托于 Kubernetes 平台和 Istio，提供服务自动扩缩容、服务路由、流量代理、容器部署等功能。</p><ul><li>Eventing</li></ul><p>Eventing 主要由事件源（EventSource）、事件处理（Flow）以及事件消费者（EventConsumer）三部分构成，定义了 CloudEvent 的通用事件标准。</p><ul><li>Tekton</li></ul><p>Tekton 是一个功能强大且灵活的 Kubernetes 云原生 CI/CD 开源框架。</p><p>接下来，我们结合一张 Knative 架构图，进一步讲解 FaaS 的核心原理。</p><p>下图中的 Route 可以理解为 Istio Gateway 的角色。实际上，大多数 FaaS 架构，都有一个类似 API Gateway 的角色，主要用来处理流量的转发，在 Pod 数量为 0 时，也会做一些特殊处理，比如此时要 hold 住流量，等待 Pod 启动。</p>',39),h=i('<p>Knative 架构图</p><p>从上图可以看到，流量经过 Gateway（Route）后，会有两个分支，一个是服务的 Pod 存在的时候，流量会直接路由到 Pod 上面；另外一个在 Pod 缩容到 0 的情况下，会转发到一个 Activator 的组件中，这个组件的主要功能是对容器资源的调度。</p><p>当有流量被转发到 Activator 组件时，它会主动通知 Autoscaler 组件进行<strong>扩容</strong>操作，这时 Autoscaler 会创建新的 Pod，提供服务。此时 Activator 对启动的 Pod 进行健康检查，检查通过后，将流量转发到相应的 Pod 上面。</p><p>后面的流程就清晰了， Activator 组件处理完流量后，会将结果返回给 Gateway。至此，整个流程就结束了。</p><p>在流量被转发到 Activator 组件这个分支的过程中，如果 Pod 数量为 0，本次流量处理的时间在很大程度上就取决于 Pod 启动的时间，而这个时间大概率是秒级别的。但在实际生产中，一般的请求<strong>需要毫秒级别返回结果</strong> ，秒级别的响应速度很难接受，这也是 FaaS 架构目前在落地中面临的最大问题，<strong>大部分对响应速度要求比较高的场景，Pod 缩容为 0 都是难以接受的</strong>。</p><p>所以 Knative 也提供了 Pod 是否缩容到 0 的选项，这样更有利于 FaaS 架构的落地。尽管没有做到完全的 Serverless，但能够拥有强大的扩缩容能力已经非常有诱惑力了。</p><p>至此，Knative 的核心架构就讲完了。下面我们再来看看在 OpenFaaS 中，一个相较于其他 FaaS 架构的改进部分，这部分改进让 FaaS 相较于传统的队列系统更具优势。</p><h4 id="openfaas" tabindex="-1">OpenFaaS <a class="header-anchor" href="#openfaas" aria-label="Permalink to &quot;OpenFaaS&quot;">​</a></h4><p><strong>同步</strong></p><p>下图是一个传统的 FaaS 调用，或者你也可以理解为传统的微服务调用。在这张图片中，我们的需求是从数据库中读取数据，并根据获取的数据生成一个 PDF 文件上传到 S3 服务器中。但是这个场景消耗的时间会比较长，大概是 2 分钟左右，而且下图的同步架构，会阻塞程序进程，前端的响应也会等待很长时间。</p><p>在传统的微服务架构中，一般我们也不会采用下图的同步系统，而是采用异步队列系统解决：将生成 PDF 作为事件存入队列中，通过队列消费生成 PDF 并上传到 S3 服务器，这样就可以大大提高微服务的同步响应速度了。</p>',11),_=e("p",null,"同步 OpenFaaS 调用图",-1),S=e("p",null,"那么，在 FaaS 中有没有更好的解决方案呢？我们来看 OpenFaaS 中的异步方案。",-1),d=e("p",null,[e("strong",null,"异步")],-1),u=e("p",null,[a("在 OpenFaaS 中， OpenFaaS 将请求作为事件直接放入 NATS 这个队列系统中，对于使用者来说，他并不需要关心这是否是一个异步调用。这个调用的编程方式，依然是 HTTP 的方式，只是 OpenFaaS Gateway 自动将此次 HTTP 调用放入了 NATS 队列中，通过 queue-worker这个进程进行队列消费，再通过 HTTP 请求 Generate Statement 服务的方式触发此次服务调用，"),e("strong",null,"用看起来同步的方式完成了整个异步调用"),a("。")],-1),v=e("p",null,"OpenFaaS 异步调用图",-1),g=e("p",null,"通过下图我们可以更直观地了解整个运行过程。",-1),F=e("p",null,[a("在这个架构中，使用者无须关心甚至无须感知 NATS 队列系统，对于使用者来说，这看起来就是一次普通的 HTTP 服务调用。而 PDF 生成服务的编写者，也不需要处理复杂的队列消费，对于他来说，也和其他同步服务一样，提供一个简单的 HTTP 服务接口就可以了。FaaS 架构"),e("strong",null,"让队列系统和业务解耦"),a("，可以让队列系统完全交给基础架构团队维护，甚至未来可以随意更换其他的开源队列系统。")],-1),M=e("p",null,"至此，Service Mesh 在 FaaS 场景中的应用我们就讲完了。下面我们来做一个简单的总结。",-1),m=e("h3",{id:"总结",tabindex:"-1"},[a("总结 "),e("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),P=e("p",null,"这一讲我介绍了 Service Mesh 在未来的展望，包括中间件 Mesh 化和 FaaS 中 Service Mesh 的作用。在云原生的大趋势下， Service Mesh 已经成为云原生的基础组件，未来云原生架构中的很多场景都会看到 Service Mesh 的应用。",-1),A=e("p",null,"本讲内容总结如下：",-1),T=e("p",null,"通过这一讲，相信你已经了解了 Envoy 在数据库中间件 Mesh 化中做出的一些尝试，也清楚了 FaaS 的开源架构之一------Knative 就是通过集成 Istio 来为 FaaS 产品提供强大的路由转发能力。",-1),b=e("p",null,"结合今天的内容，你能谈一谈自己对 Service Mesh 未来的发展方向和演进趋势吗？欢迎在留言区和我分享你的观点。",-1),K=e("p",null,"今天内容到这里就结束了，下一讲我们将迎来专栏的结束语 ：Service Mesh 会是微服务演进的终极方向吗？作为结束语，我除了讲解相关知识，也想和你分享一下自己的心路历程。我们下一讲再见。",-1);function R(k,f,I,E,C,O){const s=o("Image");return p(),r("div",null,[c,t(s,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M00/16/B7/Cgp9HWBG4P-AFQzZAAFOLVdbxMk069.png"}),a(),h,t(s,{alt:"image (7).png",src:"https://s0.lgstatic.com/i/image6/M00/17/F4/CioPOWBIXc-AQeVHAAO1JrBGh-k128.png"}),a(),_,S,d,u,t(s,{alt:"image (8).png",src:"https://s0.lgstatic.com/i/image6/M00/17/F8/Cgp9HWBIXeSAIKrRAAW1muIBZHo599.png"}),a(),v,g,t(s,{alt:"image (11).png",src:"https://s0.lgstatic.com/i/image6/M01/17/F4/CioPOWBIXfqANn-vAAObuUHa1s0115.png"}),F,M,m,P,A,t(s,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M00/16/B7/Cgp9HWBG4SqAPJUBAAGt3f2z_2M257.png"}),T,b,K])}const D=n(l,[["render",R]]);export{B as __pageData,D as default};
