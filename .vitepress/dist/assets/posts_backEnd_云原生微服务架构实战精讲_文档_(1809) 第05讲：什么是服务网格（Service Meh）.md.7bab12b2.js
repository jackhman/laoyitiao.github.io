import{_ as r,j as n,o as s,g as i,k as a,Q as o,s as e,h as l}from"./chunks/framework.4e7d56ce.js";const F=JSON.parse('{"title":"边车模式 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/云原生微服务架构实战精讲_文档/(1809) 第05讲：什么是服务网格（Service Meh）.md","filePath":"posts/backEnd/云原生微服务架构实战精讲_文档/(1809) 第05讲：什么是服务网格（Service Meh）.md","lastUpdated":1696417798000}'),p={name:"posts/backEnd/云原生微服务架构实战精讲_文档/(1809) 第05讲：什么是服务网格（Service Meh）.md"},h=o('<p>本课时我将带你学习&quot;服务网格&quot;的相关内容。</p><br><p>服务网格（Service Mesh）是随着 Kubernetes 和微服务架构的流行而出现的新技术，它的目的是<strong>解决微服务架构的服务之间相互调用时可能存在的各种问题</strong> **。**微服务架构的服务之间采用进程间的通讯方式进行交互，比如 REST 或 gRPC 等。在第 01 课时介绍微服务架构的时候，我提到过影响微服务架构复杂度的一个重要因素就是微服务之间的相互调用，这使得应用需要对服务调用时产生的错误进行处理。比如，当调用一个服务出现超时错误时，应该进行重试；如果对某个服务的调用在一段时间内频繁出错，说明该服务可能已经崩溃或是负载过大，没有必要再继续进行尝试下去了。</p><br><p>除了错误处理之外，我们还可能需要对服务之间的调用添加一些策略，比如限制服务被调用的速率，或是添加安全相关的访问控制规则等。这些需求从服务之间的调用而来，并且所有微服务架构的应用都有同样的需求，这些横切的需求，应该由平台或工具来处理，而不需要应用来实现，应用要做的只是提供相关的配置即可。</p><br><p>在 Kubernetes 出现之前，微服务架构已经在很多企业内部得到了应用。同样的，在服务网格之前也有相似的工具来解决服务调用相关的问题，比如 Netflix OSS 栈中的 Hystrix，但服务网格技术是在已有工具上的升级，它提供了一个更完整的解决方案。</p><br><p>严格说来，服务网格并不直接依赖 Kubernetes，但绝大部分服务网格实现都支持 Kubernetes，有些实现甚至只支持 Kubernetes。这是因为 Kubernetes 平台提供的功能可以简化服务网格的使用。下面我来为你介绍 Kubernetes 中的<strong>边车模式</strong>（Sidecar）。</p><h2 id="边车模式" tabindex="-1">边车模式 <a class="header-anchor" href="#边车模式" aria-label="Permalink to &quot;边车模式&quot;">​</a></h2><p>在 Kubernetes 中，Pod 中的容器通常是紧密耦合的，它们共同完成应用的功能。如果需要实现横切功能，则需要在 Pod 中添加与应用无关的容器，这是因为横切功能的实现离不开对应用使用的存储和网络的访问，而 Pod 中的容器之间共享存储和网络。当我们把横切服务的容器添加到 Pod 中后，Pod中就多了与应用无关的容器，这种部署模式称为边车模式，这些容器被称为边车容器，下图是现实世界中的边车。</p><br>',12),d=e("br",null,null,-1),_=e("p",null,"日志收集是边车模式的一个常见应用，它利用了 Pod 中容器共享存储的特性：应用容器往某个持久卷中写入日志，而日志收集工具的边车容器则监控同一个持久卷中的文件来读取日志。",-1),c=e("br",null,null,-1),u=e("p",null,"边车容器在服务网格实现中至关重要。服务网格实现会在每个 Pod 上增加一个新的边车容器来作为其中应用服务的代理，这个容器的代理程序会作为外部调用者和实际服务提供者之间的桥梁。",-1),b=e("br",null,null,-1),g=e("p",null,"如下图所示，Pod 某个端口上的请求，首先会被服务代理处理，然后再转发给实际的应用服务；同样的，应用服务对外的请求，也会先被服务代理处理，然后再转发给实际的接收者。代理边车容器的出现，为解决服务调用相关的问题提供了一种新的方案：服务调用的自动重试和断路器模式的实现，都可以由服务代理来完成，从而简化应用服务的实现。",-1),m=e("br",null,null,-1),P=e("br",null,null,-1),A=e("p",null,"如果仅从最基本的实现方式上来说，服务网格技术并不复杂。打个比方，如果一个 Pod 提供某个应用服务，只需要在该 Pod 中部署一个服务代理的边车容器，由该代理来处理应用容器发送和接收的数据，就实现了服务网格。",-1),q=e("br",null,null,-1),k=e("p",null,"但是，服务网格实际上的解决方案非常复杂，我会在下面进行具体的介绍。",-1),x=e("br",null,null,-1),f=e("p",null,"值得一提的是，边车模式并不是服务代理的唯一部署方式。有些服务网格实现可以在Kubernetes的节点上部署服务代理来处理该节点上的全部请求。",-1),I=e("h2",{id:"服务代理",tabindex:"-1"},[l("服务代理 "),e("a",{class:"header-anchor",href:"#服务代理","aria-label":'Permalink to "服务代理"'},"​")],-1),S=e("p",null,"服务代理是服务网格技术实现的核心，可以说，服务代理决定了服务网格能力的上限。从作用上来说，服务代理与我们所熟悉的 Nginx 和 HAProxy 这类代理并没有太大区别。实际上， Nginx 和 HAProxy 同样可以作为服务代理来使用，但服务网格通常使用专门为服务间调用开发的服务代理实现。在下图所示的 OSI 七层模型中，服务代理一般工作在第 3/4 层和第 7 层。",-1),T=e("br",null,null,-1),C=e("br",null,null,-1),L=e("p",null,"下表列出了常见的服务代理，其中 Envoy、Traefix 和 Linkerd 2 都是新出现的服务代理实现。",-1),E=e("br",null,null,-1),M=e("br",null,null,-1),K=e("p",null,"服务发出和接收的所有调用都需要经过服务代理。服务代理的功能都与服务之间的调用相关，其主要方面如下表所示。",-1),N=e("br",null,null,-1),y=o('<br><p>代理可以在请求层上工作。当服务 A 调用服务 B 时，服务 A 的代理可以使用负载均衡来动态选择实际调用的服务 B 实例，如果对服务 B 的调用失败，并且该调用是幂等的，则代理可以自动进行重试。服务 A 的代理还可以记录与调用相关的指标数据，服务 B 的代理可以根据访问控制的策略决定是否允许该请求，如果服务 B 当前所接收的请求过多，那么它的代理可以拒绝其中某些请求。</p><br><p>代理同样可以工作在连接层，服务 A 和服务 B 的代理之间可以建立 TLS 连接，并验证对方的身份。</p><br><p>由于服务代理需要处理服务所有接收和发送的请求，这对服务代理的性能要求很高，不能增加过长的延迟，这也是 Envoy 等服务代理流行的原因，这些新开发的服务代理对服务之间的调用进行了优化。除了性能之外，服务代理只占用很少的 CPU 和内存资源，这是因为每个服务实例的 Pod 上都可能运行着一个服务代理的容器，当服务数量增加时，服务代理自身的资源开销也会增加。</p><h2 id="服务网格" tabindex="-1">服务网格 <a class="header-anchor" href="#服务网格" aria-label="Permalink to &quot;服务网格&quot;">​</a></h2><p>服务网格技术起源于 Linkerd 项目，从架构上来说，服务网格的实现很简单，它<strong>由服务代理和管理进程组成</strong> 。服务代理称为服务网格的<strong>数据平面</strong> （Data Plane），负责拦截服务之间的调用并进行处理；管理进程称为服务网格的<strong>控制平面</strong>（Control Plane），负责协调代理并提供 API 来管理和监控服务网格。服务网格的能力由这两个平面的能力共同决定。</p><br><p>下图给出了服务网格的基本架构。</p><br>',11),B=o('<br><p>服务网格在数据平面的处理能力取决于所使用的服务代理，而服务网格实现通常使用已有的服务代理，因此它们在数据平面方面的能力差别并不大。服务网格实现的价值更多来源于它所提供的控制平面，比如，服务网格实现是否提供了 API 来更新配置，是否提供了图形化界面来查看服务状态，在 Kubernetes 上，是否可以使用自定义资源定义（Custom Resource Definition，CRD）来进行声明式配置。</p><br><p>服务网格技术的优势有以下几个方面。</p><br><p>第 1 个优势在于它与服务实现使用的技术栈无关。服务代理工作在服务调用这个层次上。不论服务采用什么编程语言或框架来实现，服务代理都可以产生作用。Kubernetes 的流行，使得在微服务架构实现中使用多语言开发变得更简单。一个微服务应用的不同服务可以使用完全不同的技术栈来实现，这些服务之间的调用都可以由服务代理来处理。</p><br><p>第 2 个优势在于服务网格技术与应用代码是解耦的，这意味着当我们需要对服务调用相关的策略进行调整时，并不需要修改应用的代码。以服务的访问频率为例，当需要控制对某个服务的调用频率时，可以通过服务网格的控制平面提供的 API 直接进行修改，并不需要对应用做任何改动。这种解耦使得服务网格成为应用运行平台所提供的能力之一，进而促成了新的开源项目和商业产品的出现。</p><br><p>对于大型项目，可以由专门的团队来负责管理服务网格的配置，进行更新和日常维护；对于小型项目，可以从开源社区选择合适的产品。</p><h2 id="服务网格功能" tabindex="-1">服务网格功能 <a class="header-anchor" href="#服务网格功能" aria-label="Permalink to &quot;服务网格功能&quot;">​</a></h2><p>服务网格所能提供的功能非常多。每个服务网格实现所提供的功能也各有不同。下面我将对服务网格中的重要功能进行介绍。</p><h3 id="自动代理注入" tabindex="-1">自动代理注入 <a class="header-anchor" href="#自动代理注入" aria-label="Permalink to &quot;自动代理注入&quot;">​</a></h3><p>为了使用服务网格提供的功能，应用服务的 Pod 需要添加服务代理容器，服务网格提供了自动的代理注入机制。在 Kubernetes 上，如果 Pod 或控制器对象中添加了某个特定的注解，则服务网格可以自动在 Pod 中添加服务代理容器并完成相关的配置。</p><h3 id="流量管理" tabindex="-1">流量管理 <a class="header-anchor" href="#流量管理" aria-label="Permalink to &quot;流量管理&quot;">​</a></h3><p>流量管理指的是管理服务之间的相互调用，由一系列的子功能组成。</p><br><p>（1）服务发现</p><br><p>服务发现指的是发现系统中存在的服务及其对应的访问地址，服务网格会在内部维护一个注册表，包含所有发现的服务及其对应的服务端点。</p><br><p>（2）负载均衡</p><br><p>每个服务通常都有多个运行的实例，在进行调用时，需要根据某些策略选择处理请求的实例。负载均衡的算法可以很简单，比如循环制（round robin）；也可以很复杂，比如根据被调用服务的各个实例的负载情况来动态选择。</p><br><p>（3）流量控制</p><br><p>微服务架构的应用强调持续集成和持续部署，应用的每个服务都可以被单独部署。一个常见的需求是在进行更新时，让小部分用户使用新的版本，而大部分用户仍然使用当前的旧版本，这样的更新方式称为<strong>金丝雀部署</strong>（Canary Deployment）。为了支持这样的更新方式，我们可以同时部署服务的两个版本，并通过服务网格把调用请求分配到两个版本，比如，20% 的请求分配到新版本，剩下 80% 的请求分配到当前版本，经过一段时间的测试之后，再逐步把更多的请求分配到新版本，直到全部请求分配至新版本。</p><br><p>（4）超时处理</p><br><p>服务网格对服务调用添加了超时处理机制。如果调用在设置的时间之后仍然没有返回，则会直接出错，这样就避免了在被调用的服务出现问题时，进行不必要的等待。不过，超时时间也不能设置得过短，否则会有大量相对耗时的调用产生不必要的错误，针对这一点，服务网格提供了基于配置的方式来调整服务的超时时间。</p><br><p>（5）重试</p><br><p>当服务的调用出现错误时，服务网格可以选择进行重试，服务重试看似简单，但要正确的实现并不容易。简单的重试策略，比如固定时间间隔和最大重试次数的做法，很容易产生重试风暴（Retry Storm）。如果某些请求因为服务负载的原因而失败，简单的重试策略会在固定的时间间隔之后，重试全部失败请求，这些请求在重试时又会因为负载过大的原因而再次失败。所造成的结果就是产生大量失败的重试请求，影响整体的性能，有效的重试机制应该避免出现重试风暴。</p><br><p>（6）断路器</p><br><p>断路器（Circuit Breaker）是微服务架构中的一种常见模式。通过断路器，可以在服务的每个实例上设置限制，比如同时允许的最大连接数量，或是调用失败的次数。当设定的限制达到时，断路器会自动断开，禁止对该实例的连接。</p><br><p>断路器的存在，使得服务调用可以快速失败，而不用尝试连接一个已经失败或过载的实例，所以它的一个重要作用是避免服务的级联失败。如果一个服务出现错误，可能导致它的调用者因为超时而积压很多未处理的请求，进而导致它的调用者也由于负载过大而崩溃，这样的级联效应，有可能导致整个应用的崩溃。使用断路器之后，出现错误的服务实例被自动隔离，不会影响系统中的其他服务。</p><br><p>（7）错误注入</p><br><p>在使用服务网格配置了服务的错误处理策略之后，一个重要的需求是对这些策略进行测试。错误注入指的是往系统中引入错误来测试应用的故障恢复能力，比如，错误注入可以在服务调用时自动添加延迟，或是直接返回错误给调用者。</p><h3 id="安全" tabindex="-1">安全 <a class="header-anchor" href="#安全" aria-label="Permalink to &quot;安全&quot;">​</a></h3><p>安全相关的功能解决应用的 3 个 A 需求，分别是认证（Authentication）、授权（Authorization）和审计（Audit）。这3个需求的英文名称都以字母A开头，所以称为3个A需求。</p><br><p><strong>双向 TLS</strong>（mutual TLS，mTLS）指的是在服务调用者和被调用者的服务代理之间建立双向 TLS 连接，这个连接意味着客户端和服务器都需要认证对方的身份。通过 TLS 连接可以对通信进行加密，防止中间人攻击。</p><br><p><strong>用户认证</strong>：服务网格应该可以和不同的用户认证服务进行集成，常用的认证方式包括 JWT 令牌认证，以及与 OpenID Connect 提供者进行集成。</p><h3 id="访问策略" tabindex="-1">访问策略 <a class="header-anchor" href="#访问策略" aria-label="Permalink to &quot;访问策略&quot;">​</a></h3><p>访问策略用来描述服务调用时的策略。</p><ul><li><p>访问速率控制：通过访问速率控制，可以限制服务的调用速度，防止服务因请求过多而崩溃。</p></li><li><p>服务访问控制：服务访问控制用来限制对服务的访问，限制的方式包括禁止服务、黑名单和白名单等。</p></li></ul><h3 id="可观察性" tabindex="-1">可观察性 <a class="header-anchor" href="#可观察性" aria-label="Permalink to &quot;可观察性&quot;">​</a></h3><p>服务网格可以收集与服务之间通信相关的遥测数据，这些数据使得运维人员可以观察服务的行为，发现服务可能存在的问题，并对服务进行优化。</p><br><p><strong>性能指标</strong>：是指服务网格收集与服务调用相关的性能指标数据，包括延迟、访问量、错误和饱和度。除此之外，服务网格还收集与自身的控制平面相关的数据。</p><br><p><strong>分布式追踪</strong>：可以查看单个请求在服务网格中的处理流程，在微服务架构中，应用接收到的请求可能由多个服务协同处理。在请求延迟过高时，需要查看请求在不同服务之间的调用流程，以及每个服务所带来的延迟。分布式追踪是服务网格提供的工具，可以用来收集相关的调用信息。</p><br><p><strong>访问日志</strong>：用来记录每个服务实例所接收到的请求。</p><h3 id="用户界面" tabindex="-1">用户界面 <a class="header-anchor" href="#用户界面" aria-label="Permalink to &quot;用户界面&quot;">​</a></h3><p>服务网格提供图形化的用户界面，可以查看服务相关的信息，包括收集的性能指标数据、服务调用关系的拓扑图。</p><h2 id="服务网格产品介绍" tabindex="-1">服务网格产品介绍 <a class="header-anchor" href="#服务网格产品介绍" aria-label="Permalink to &quot;服务网格产品介绍&quot;">​</a></h2><p>目前有不少开源的服务网格产品，下面将着重对 Istio、Linkerd 和 Maesh 进行介绍。</p><h3 id="istio" tabindex="-1">Istio <a class="header-anchor" href="#istio" aria-label="Permalink to &quot;Istio&quot;">​</a></h3><p>Istio 项目由 Google、IBM 和 Lyft 共同发起。由于有大公司的支持，Istio 项目目前所提供的功能是最完备的，这也意味着 Istio 是最复杂的。Istio 所包含的组件非常多，对应的配置也非常复杂，它的学习曲线很陡，上手并不容易。值得一提的是，Lyft 的 Envoy 团队与 Istio 有很好的合作，这就保证了 Istio 有最好的 Envoy 支持。本专栏将使用 Istio 来作为服务网格的实现。</p><h3 id="linkerd" tabindex="-1">Linkerd <a class="header-anchor" href="#linkerd" aria-label="Permalink to &quot;Linkerd&quot;">​</a></h3><p>Linkerd 是最早的服务网格实现，目前作为 CNCF 的项目来开发。相对 Istio 而言，Linkerd 提供的功能较少，但是也更简单易用。对很多应用来说，Linkerd 所提供的功能已经足够好。</p><h3 id="maesh" tabindex="-1">Maesh <a class="header-anchor" href="#maesh" aria-label="Permalink to &quot;Maesh&quot;">​</a></h3><p>Maesh 是 Containous 提供的服务网格实现。Maesh 使用 Traefik 作为服务代理。相对于 Istio 和 Linkerd，Maesh 还是一个比较新的项目，需要更多的时间来考察。</p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>服务网格技术在本专栏的微服务架构解决方案中非常重要，它解决了服务调用的相关问题。本课时首先介绍了Kubernetes上的边车模式，接着对服务代理和服务网格进行了介绍，然后介绍了服务网格所能提供的功能，最后对常见的服务网格产品进行了介绍。</p>',75);function v(V,D,R,z,H,W){const t=n("Image");return s(),i("div",null,[h,a(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/07/7C/Ciqah16EWzmAG8FwAAQIjFU18IM285.jpg"}),d,_,c,u,b,g,m,a(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/80/92/Cgq2xl6EWzqAbHmNAAAnsVP83YI995.png"}),P,A,q,k,x,f,I,S,T,a(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/80/92/Cgq2xl6EWzqAAeOxAAA7aLAJu78701.png"}),C,L,E,a(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/80/92/Cgq2xl6EWzqAZaH-AABx1CEZm6Y181.png"}),M,K,N,a(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/07/7C/Ciqah16EWzuAdQYKAABNHPHr3lY521.png"}),y,a(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/07/7C/Ciqah16EWzuAVF1oAAA5gLyLSfk718.png"}),B])}const Y=r(p,[["render",v]]);export{F as __pageData,Y as default};
