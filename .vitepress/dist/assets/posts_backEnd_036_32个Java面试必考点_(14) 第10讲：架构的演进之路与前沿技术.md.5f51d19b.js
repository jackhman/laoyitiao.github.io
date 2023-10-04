import{_ as o,j as r,o as i,g as l,k as p,Q as t,s as e,h as s}from"./chunks/framework.e0c66c3f.js";const J=JSON.parse('{"title":"系统架构演进 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/036_32个Java面试必考点/(14) 第10讲：架构的演进之路与前沿技术.md","filePath":"posts/backEnd/036_32个Java面试必考点/(14) 第10讲：架构的演进之路与前沿技术.md","lastUpdated":1696338709000}'),c={name:"posts/backEnd/036_32个Java面试必考点/(14) 第10讲：架构的演进之路与前沿技术.md"},n=t('<p>本课时会讲解分布式系统架构以及面试中做项目介绍的技巧，重点有如下三部分。</p><ol><li><p>介绍系统架构的演进：包括微服务架构、云原生以及业界最新趋势 ServiceMesh。</p></li><li><p>讲解微服务的基础知识点：Docker 和 K8s。</p></li><li><p>面试技巧，教你如何更有效地做项目介绍。</p></li></ol><h6 id="系统架构演进" tabindex="-1">系统架构演进 <a class="header-anchor" href="#系统架构演进" aria-label="Permalink to &quot;系统架构演进&quot;">​</a></h6><p>首先以演进的方式来了解不同的系统架构。</p><h6 id="单体架构" tabindex="-1">单体架构 <a class="header-anchor" href="#单体架构" aria-label="Permalink to &quot;单体架构&quot;">​</a></h6><p>最简单的系统架构是单体服务，如下图所示。</p><br>',7),_=t('<p>一个项目中的多个服务，混合部署在一个进程内，服务之间的交互都是通过进程内调用完成的，正如图中 Service 之间的红色箭头所示。这样做的好处是可以快速开发、部署服务，服务之间调用的性能也最好。</p><p>当然，这种架构缺点也非常多，比如：</p><ul><li><p>随着业务的增长，项目越来越臃肿；</p></li><li><p>服务之间因为 JAR 包引用导致频繁的依赖冲突；</p></li><li><p>服务资源变更困难，因为一个服务可能被多个不同的业务引用，升级资源需要多个业务方同时升级；</p></li><li><p>因为不同业务方都可以直连服务的数据资源，这个架构也存在明显的数据安全风险；</p></li><li><p>修改代码后回归困难、架构难以调整等等。</p></li></ul><p>以上所有问题都是因为服务耦合在一起导致的。在服务规模不大的情况下，比较适合采用单体架构，方便快速迭代。但是当服务规模变大时，单体架构就不是一个好的选择。</p><h6 id="微服务架构" tabindex="-1">微服务架构 <a class="header-anchor" href="#微服务架构" aria-label="Permalink to &quot;微服务架构&quot;">​</a></h6><p>当服务的规模变大时，为了解决服务耦合的问题，出现了 SOA 就是面向服务架构，它的起源是为了解决企业应用问题，随着不断演进，发展到目前业界普遍采用的微服务架构，微服务架构如下所示。</p>',6),h=e("p",null,"微服务架构的思想就是让服务尽可能做到高内聚、低耦合，不同的服务单独开发、单独测试、单独部署。服务之间通过 RPC 或者 HTTP 进行远程交互，如图中的蓝色加粗箭头所示。",-1),d=e("p",null,"微服务架构解决了单体架构的耦合问题，但同时也带来了新的问题。因为服务部署在不同的进程或服务器中，要使用服务前需要先找到服务，即所谓的服务发现。",-1),u=e("p",null,"一般微服务使用两种发现方式，一种是前面课程介绍过的 RPC 方式，通过注册中心进行服务的注册和订阅，来完成服务发现，比如图中间灰色的 Registry 模块。这种方式由服务的调用端获得到全部可用服务节点，由 Client 侧进行负载均衡，调用服务。另外一种是通过 HTTP 协议调用服务端提供的 RESTful 接口，这种方式不需要 Client 侧做服务发现，而是在 Server 端通过 Nignx 这样的反向代理来提供 Server 侧的负载均衡。",-1),A=e("p",null,"不论哪种方式，服务的交互都从进程内通信变成了远程通信，所以性能必然会受到一些影响。此外由于很多不确定性的因素，例如网络拥塞、Server 端服务器宕机、挖掘机铲断机房光纤等等，需要许多额外的功能和措施才能保证微服务流畅稳定的工作。前面在 Spring Cloud 内容中提到的 Hystrix 熔断器、Ribbon客户端负载均衡器、Eureka注册中心等等都是用来解决这些问题的微服务组件。",-1),S=e("h6",{id:"cap-原则与-base-理论",tabindex:"-1"},[s("CAP 原则与 BASE 理论 "),e("a",{class:"header-anchor",href:"#cap-原则与-base-理论","aria-label":'Permalink to "CAP 原则与 BASE 理论"'},"​")],-1),b=e("p",null,"在微服务架构中，有必要了解一下分布式系统中的 CAP 原则与 BASE 理论。如下图所示，CAP 原则指的是在一个分布式系统中，Consistency 一致性、 Availability 可用性、Partition tolerance 分区容错性，这三个特性最多只能同时满足两个，三者不可兼得。",-1),k=e("br",null,null,-1),P=t('<p>其中一致性指所有节点在同一时间的数据完全一致；可用性指任何时候对分布式系统总是可以成功读和写；分区容错性是指当某些节点或网络分区故障的时候，仍然能够提供满足一致性和可用性的服务。</p><p>既然无法同时满足三个特征，那就会有三种取舍。</p><p>第一个选择是 CA，就是放弃分区容错，这也就等同于放弃了分布式系统，所以 CA 只存在于单机系统。</p><p>第二个选择是 CP，也就是选择强一致和分区容错，允许极端情况下出现短时的服务不可用。采用 CP 原则实现的分布式系统比如 ZooKeeper。ZooKeeper是一个分布式协调系统，强一致性是 ZK 的主要目标，允许出现短时的系统不可用。也正是因为这个原因，ZK 其实并不适合用来做微服务的注册中心。其他选择 CP 实现的系统还有 Consul、etcd 等。</p><p>第三个选择是 AP，也就是选择分区容错和高可用，允许数据出现短时间不一致。采用 AP 原则的分布式系统有 Eureka、Nacos。在服务注册的场景，短期的不一致一般不会对服务交互产生影响，因此采用 AP 原则的注册中心才是微服务比较适合的选择。</p><p>然后，介绍一下 BASE 理论，如上图底部的词汇所示，BASE 是指 Basically Available 基本可用，Soft-state 软状态，Eventual Consistency 最终一致性，它是对 CAP 中一致性和可用性权衡的结果。BASE 的核心思想是即使无法做到强一致性，也可以根据系统特点，采用适当的方式达到最终一致性。</p><h6 id="云原生服务" tabindex="-1">云原生服务 <a class="header-anchor" href="#云原生服务" aria-label="Permalink to &quot;云原生服务&quot;">​</a></h6><p>继续讲解系统架构的演进。微服务架构的思路是服务解耦合，这会导致一个大的业务拆分成众多小的服务，每个服务的部署需要考虑单点问题，需要多机房多节点部署，会造成系统资源的浪费。</p><p>另外在服务扩容时需要重新整理服务运行依赖的环境，对微服务的普及有一定阻碍。容器化技术把服务的运行环境进行打包管理，解决了服务扩缩容时对运行环境的管理问题以及服务器的利用率问题。因此随着容器技术逐渐成熟，微服务架构也快速普及。</p><p>云原生架构由微服务组成，它不是一种业务系统架构，而是一种能够快速、持续、可靠、规模化地交付业务服务的模式。</p><p>如下图所示，图上部列出了云原生的三个特征：</p><ul><li><p>容器化的微服务，这是云原生的主体；</p></li><li><p>Devops，是对微服务的动态管理；</p></li><li><p>持续交付能力，这是云原生的目的。</p></li></ul><br>',13),C=e("p",null,"云原生服务需要底层的云服务提供 IaaS 基础设施或者 PaaS 平台设施来运行，IaaS 可以理解为提供了服务器资源，PaaS 平台可以理解为提供了运行环境。",-1),m=e("p",null,"常见的实现方式有两种：自建的私有云和云厂商提供的公有云。公有云比如阿里云、AWS、腾讯云等等，像新浪微博内部使用的是私有云与公有云结合的混合云模式。",-1),T=e("p",null,"接下来看云原生应用开发的最佳实践原则：12 要素，如下图所示。",-1),g=e("br",null,null,-1),D=t('<p>12 要素定义了设计 SaaS 应用时需要遵循的一些基本原则，SaaS 是软件即服务的缩写，通过云原生应用来提供服务。</p><p>第 1 个要素是基准代码，是指代码由版本管理工具来管理，一个应用只有一份基准代码，运行时有多个的部署实例。</p><p>第 2 个要素依赖，是指要在应用中显示的声明依赖，方便服务进行构建。</p><p>第 3 个要素配置，指要在环境中存储配置，而不是写在代码配置文件中。也就是说，配置与代码要分开管理，从代码外部进行加载，例如测试环境的配置、仿真环境的配置以及生产环境的配置都应该从对应的环境中进行加载。</p><p>第 4 个要素后端服务，是指要把依赖的后端服务统一看作资源来对待。不论是 DB、缓存还是 HTTP 服务。</p><p>第 5 个要素是构建、发布、运行，是指要严格区分应用的构建、发布、运行这三个步骤，并且必须按顺序进行。</p><p>第 6 个要素进程，是指应用以一个或多个进程运行，要保证应用的无状态性。</p><p>第 7 个要素端口绑定，是指不同的应用使用不同的端口提供服务。应用与端口是绑定的，不是指具体的某个端口号，而是指一旦服务启动确定了端口，那么这个端口就能够提供对应的服务，直到应用进程停止。</p><p>第 8 个要素并发，是指应用进程之间可以并发处理，因此可以通过多进程方式进行水平扩展。</p><p>第 9 个要素易处理，是指应用应该容易被管理，可以通过优雅停机和快速启动，构建最健壮的服务。</p><p>第 10 个要素开发/生产等价，是指要保证在开发、预览、生产等不同环境下的应用，尽可能一致。</p><p>第 11 个要素日志，是指要合理记录应用的运行日志，并把日志当作一种事件流来对待，方便对日志的收集和处理。</p><p>第 12 个要素管理进程，是指要把后台管理任务当作一次性进程来运行，而不是常驻后台进程的方式。</p><p>以上 12 要素是对设计云原生服务的指导原则，在实际项目中可以结合实际业务场景进行架构设计，不一定完全照搬。</p><h6 id="service-mesh" tabindex="-1">Service Mesh <a class="header-anchor" href="#service-mesh" aria-label="Permalink to &quot;Service Mesh&quot;">​</a></h6><p>云原生应用是目前大部分互联网公司的服务架构推进方向，那么下一代的服务架构是什么样呢？这里介绍一个最新的服务化趋势，它离实际应用可能还有些遥远，我们可以静待它的发展。</p><p>Service Mesh 是 2017 年逐渐在国内进入大家视野的一种架构方式，被誉为下一代的微服务。Service Mesh 在微服务的基础上引入了一个 Sidecar 边车的概念，如图中左下方的放大图所示，每个服务会伴生着部署一个 Sidecar，服务之间的交互不再由服务自身来完成，服务所有的出、入请求都交由这个 Sidecar 来进行处理，通过管理平面对所有的 Sidecar 进行统一管理，由 Sidecar 来实现服务发现、负载均衡、流量调度等能力。</p><br>',18),q=e("p",null,"目前最有代表性的 Service Mesh 开源实现，是由 Google、IBM、Lyft 三家一起维护的 Istio，有兴趣的话可以持续关注，这里就不详细展开了。",-1),v=e("p",null,"那么 Service Mesh 与微服务的区别是什么呢？Service Mesh 又可以解决哪些问题呢？如下图所示。",-1),M=e("br",null,null,-1),K=t('<p>微服务的出现是为了解决多个服务之间耦合的问题，如图中绿色的竖线，就是微服务架构做的事情，把 Service A、B、C 进行了解耦，服务单独部署、单独管理。这时每个服务都需要实现例如服务发现、服务的远程交互、交互过程中的负载均衡、高可用策略、服务熔断等等一系列的功能，这些功能与服务自身的业务逻辑没有任何关系。</p><p>Service Mesh 的思路是把业务逻辑与业务无关的功能进行解耦，如图中红色的线，对服务进行横切，把与服务交互相关的功能从服务中剥离出来，统一交给 Sidecar 去实现，让服务更聚焦于业务逻辑，提高研发效率。同时由于功能相对独立，Sidecar 可以更专注于服务的交互与管理，更方便实现极致的功能与性能。</p><p>所以，Service Mesh 不是一个全新的技术，它对业务与服务交互、管理进行了拆分，提供统一、强大的服务管理能力，是在微服务基础上的演进。</p><p>另外，Service Mesh 由于使用独立的 Sidecar 进程，天然适合为不同语言的服务提供统一的服务治理能力，因此跨语言服务治理也是 Service Mesh 的一个重要特点，像微博基于 Motan 研发的 Weibo Mesh，初衷就是为了解决内部不同语言之间服务化的问题。</p><p>由于引入了额外的 Sidecar，Service Mesh 的架构复杂度更高，也会带来额外的可用性和性能问题，这也是 Service Mesh 架构需要努力解决的问题。</p><h6 id="架构设计的意义" tabindex="-1">架构设计的意义 <a class="header-anchor" href="#架构设计的意义" aria-label="Permalink to &quot;架构设计的意义&quot;">​</a></h6><p>通过了解系统架构的演进，我们发现，从单体架构到微服务架构，实现了服务之间解耦，但带来了额外的服务发现与交互问题；从微服务到 Service Mesh，实现了业务与服务治理功能的解耦，但是引入了额外的可用性和性能问题，架构复杂度也随之提高。那么这样做的意义在哪里？</p><p>系统架构的设计从来就是一个权衡的艺术，很多情况下，我们只是让问题进行了转移，方便对问题进行集中整治和处理，让服务更聚焦业务研发，不同的功能就交给专门的组件来处理，正所谓术业有专攻。通过架构的演进，虽然当下没有消灭复杂度，但可以成功的让问题变的透明化，变的业务无感知，提升服务整体的开发效率与扩展能力，拓宽服务能力的上限。</p><h6 id="容器化基础" tabindex="-1">容器化基础 <a class="header-anchor" href="#容器化基础" aria-label="Permalink to &quot;容器化基础&quot;">​</a></h6><p>微服务之所以能够快速发展，很重要的一个原因就是：容器化技术的发展和容器管理系统的成熟。所以接下来学习微服务架构的基础，容器化技术 Docker 和容器集群管理系统 Kubernetes。</p><h6 id="docker-作用" tabindex="-1">Docker 作用 <a class="header-anchor" href="#docker-作用" aria-label="Permalink to &quot;Docker 作用&quot;">​</a></h6><p>Docker 的作用主要是快速的构建、部署、运行服务，通过服务镜像能够为服务提供版本管理。</p><p>通过容器化技术可以屏蔽不同运行环境的差异，让服务在任何 Docker 环境中运行，就像 Java 的一次编译到处运行。</p><p>Docker 是轻量虚拟化技术，可以在一台宿主机上运行多个服务，对运行的服务之间进行了有效的隔离，提高宿主机的资源利用率。</p><h2 id="docker-特点" tabindex="-1">Docker 特点 <a class="header-anchor" href="#docker-特点" aria-label="Permalink to &quot;Docker 特点&quot;">​</a></h2><ol><li><p>开源，意味着可以免费使用 Docker 容器技术。</p></li><li><p>基于 LXC 实现的轻量虚拟化，Docker 容器直接运行进程，不需要模拟，运行效率非常高。</p></li><li><p>能够支持大规模构建。</p></li><li><p>Docker 的架构十分灵活，可扩展不同的实现，例如支持不同存储驱动实现。</p></li><li><p>Docker 提供可视化 UI，管理非常简单。</p></li></ol><h6 id="docker-主要概念" tabindex="-1">Docker 主要概念 <a class="header-anchor" href="#docker-主要概念" aria-label="Permalink to &quot;Docker 主要概念&quot;">​</a></h6><ol><li><p>镜像，就是服务代码和运行环境的封装，服务的版本管理就是通过镜像来实现的，镜像是部署的基础。</p></li><li><p>容器，就是 Container，容器是基于镜像的服务运行状态，可以基于一个镜像运行多个容器。</p></li><li><p>守护进程是运行在宿主机上的管理进程，用户通过 Client 与守护进程进行交互。</p></li><li><p>客户端是用来和守护进程交互的命令行工具，也可以通过 Socket 或者 RESTful API 访问远程的 Docker 守护进程。</p></li><li><p>镜像仓库，类似我们的 Git 代码仓库，镜像仓库用来保存、管理不同服务不同版本的镜像。服务部署时会从镜像仓库拉取对应版本的镜像进行部署。</p></li></ol><h6 id="docker-实现原理" tabindex="-1">Docker 实现原理 <a class="header-anchor" href="#docker-实现原理" aria-label="Permalink to &quot;Docker 实现原理&quot;">​</a></h6><p>Docker 是通过对不同运行进程进行隔离来实现虚拟化，主要利用三种方式来实现服务的隔离，如下图所示。</p>',20),N=t('<p>首先是利用 Linux 的 Namespace 命名空间，来隔离进程之间的可见性，不同的服务进程彼此属于不同的 Namespace，互相无法感知对方的存在。</p><p>Docker 实现了 Host、Container、None 和 Bridge 四种网络模式，默认使用 Bridge 桥接模式。每一个容器在创建时都会创建一对虚拟网卡，两个虚拟网卡组成了数据的通道，其中一个会放在容器中，另一个会加入到 Docker0 的网桥中。Docker0 网桥通过 iptables 中的配置与宿主机上的网卡相连，所有符合条件的请求都会通过 iptables 转发到 Docker0 并由网桥分发给对应的容器网卡。为了防止容器进程修改宿主机的文件目录，Docker 通过改变进程访问文件目录的根节点，结合 Namespace 来隔离不同容器进程可以访问的文件目录。</p><p>然后，通过 Namespace，Docker 隔离了进程、网络和文件目录，但是在进程运行中的 CPU 和内存等还是共享状态。Docker 通过 Control Groups 也就是 Cgroups 来对进程使用的资源进行限制，包括 CPU、内存和网络带宽等。</p><p>那么，Docker 是如何把镜像运行起来的呢？Docker 的镜像是分层结构，例如一个服务镜像可以由操作系统层、基础环境层、Web 容器层、服务代码层，层层依赖构成。通过 UnionFS 就是联合文件系统把 Image 中的不同分层作为不同的只读目录，而 Container 是在只读的镜像目录上创建的可读可写的目录，通过这种方式来把镜像运行起来的。Docker 提供了 AUFS、Overlay、Devicemapper、ZFS 等多种不同存储驱动实现。</p><h6 id="kubernetes-作用" tabindex="-1">Kubernetes 作用 <a class="header-anchor" href="#kubernetes-作用" aria-label="Permalink to &quot;Kubernetes 作用&quot;">​</a></h6><p>Kubernetes 也叫 K8s，因为 K 与 s 之间一共有 8 个字母。K8s 是一个容器集群管理系统，不是一个 PaaS 平台，PaaS 平台是可以运行在 K8s 之上的。</p><p>K8s 的作用是进行容器集群管理，它只针对容器管理，不部署源码不编译应用。它能够实现服务容器的自动部署与按指定条件进行自动扩缩容服务，来实现对应用的管理，支持应用的负载均衡、滚动更新、资源监控等等。</p><h6 id="kubernetes-特点" tabindex="-1">Kubernetes 特点 <a class="header-anchor" href="#kubernetes-特点" aria-label="Permalink to &quot;Kubernetes 特点&quot;">​</a></h6><ol><li><p>可移植，支持在公有云，私有云，混合云中运行；</p></li><li><p>可扩展，K8s 采用模块化实现方式，插件化的架构，可挂载，可组合；</p></li><li><p>自动化，支持服务的自动部署，自动重启，自动复制，自动伸缩。</p></li></ol><h6 id="kubernetes-重要概念" tabindex="-1">Kubernetes 重要概念 <a class="header-anchor" href="#kubernetes-重要概念" aria-label="Permalink to &quot;Kubernetes 重要概念&quot;">​</a></h6><p>K8s 中的概念非常的多，这里列出了比较重要的几个。</p><p>K8s 是容器集群管理系统，容器首先需要运行在宿主机上，因此，K8s 首先要管理宿主机集群，K8s 分为 Master 节点和 Node 节点，也叫 Worker Node。</p><p>Master 负责管理节点，管理 K8s 集群。Master 协调集群中的所有行为/活动，例如应用的运行、修改、更新等。</p><p>Node 节点用来运行容器。Node 上可以运行多个 Pod，Pod 是 K8s 创建或部署的基本单位，Pod 中可以运行多个 Container，一个 Container 就是一个运行中的服务镜像。</p><p>Pod 中的 Container 共享网络与存储。</p><p>Service 是 K8s 中的一个逻辑概念，通过对不同的 Pod 添加标签，来划分为不同的 Service。</p><p>Deployment 表示用户对 K8s 集群的一次更新操作，可以是创建一个新的服务，更新一个新的服务，也可以是滚动升级一个服务。</p><h6 id="kubernetes-架构" tabindex="-1">Kubernetes 架构 <a class="header-anchor" href="#kubernetes-架构" aria-label="Permalink to &quot;Kubernetes 架构&quot;">​</a></h6><p>下图是 K8s 架构图，图左侧绿色的模块代表 Master 节点，右侧蓝色的模块代表运行容器的Worker Node 节点。</p>',19),I=t('<p>先来看 Master 节点中的架构，灰色的部分是 Master 中的模块，其中 API Server 是用户对 K8s 中资源操作的唯一入口，创建应用部署、管理部署状态等都需要通过 api server 进行。API Server 提供了认证、授权、访问控制、API 注册和发现等机制。</p><p>Controller Manager 负责维护集群的状态，比如故障检测、自动扩展、滚动更新等，Controller Manager 包含多个可以扩展 Controller，例如 Node Controller 负责初始化 Node 节点，获取运行中的 Node 信息、Route Controller 负责配置集群间通信的路由信息、Service Controller 负责监听服务创建、更新、删除等事件来调整负载均衡信息等等。</p><p>Scheduler 负责资源的调度，按照预定的调度策略选择哪个 Pod 运行在哪个节点上。</p><p>另外图下方的绿色模块是用来保存整个集群的状态的 etcd。</p><p>图最左侧的 kubectl 是用于运行 K8s 命令的管理工具，kubectl 与 API Server 进行交互，通过 API Server 下发对 K8s 集群的指令。</p><p>再来看图右侧的 Worker Node。刚才介绍概念时提过，Node 用来运行应用容器，所以 Node 中必须要有一个容器运行时，可以是 Docker，也可以是其他的容器技术，例如 Rkt。</p><p>Node 中部署应用时，每个应用都由一个 Pod 组成，可以把 Pod 看作一个虚拟服务器，上面可以运行一个或多个 Container 容器。当应用服务需要多个进程共同协作时，可以把这些协作的镜像打包放在一个 Pod 中，共享 Pod 的存储和网络。比如 istio 中的 Sidecar 代理模式，就是通过在服务的 Pod 中注入一个 Sidecar 镜像来实现与服务 IP 绑定，进行流量控制的。</p><p>看到右面图中灰色的两个 Node 模块，kubelet 负责与 Master 通信，它周期性地访问 APIcontroller 进行检查和报告、执行容器的操作，维护容器的生命周期，也负责 Volume（CVI）和网络（CNI）的管理。</p><p>kube-proxy 处理网络代理和每个容器的负载均衡，它通过改变 iptables 规则来控制在容器上的 TCP 和 UDP 包。</p><p>K8s 把所有被管理的资源看作对象，对资源的管理就变成了对对象属性的设置。K8s 对对象的配置采用 YAML 格式进行描述。K8s 中的对象概念非常多，大致可以分为四类：</p><ul><li><p>资源对象，例如 Pod、Job；</p></li><li><p>配置对象，例如 Node、Namespace、Service；</p></li><li><p>存储对象，例如 Volume、PresidentVolume；</p></li><li><p>策略对象，例如 SecurityContext、ResourceQuota、LimitRange 等等。</p></li></ul><br><p>如果感兴趣，可以在课后练习。比如最简单的，可以在单机环境中，使用 Minikube 来部署 K8s 进行练习。</p><h6 id="考察点与加分项" tabindex="-1">考察点与加分项 <a class="header-anchor" href="#考察点与加分项" aria-label="Permalink to &quot;考察点与加分项&quot;">​</a></h6><h6 id="考察点" tabindex="-1">考察点 <a class="header-anchor" href="#考察点" aria-label="Permalink to &quot;考察点&quot;">​</a></h6><p>系统架构主要看一个人的综合能力和发展潜力怎么样，考察点有这几个方面：</p><p>第一，要对分布式架构有自己的理解。比如系统可用性、扩展性，比如故障的应对方法，包括熔断、容灾、流量迁移、多机房多活；再比如架构设计中的解耦合等等。</p><p>第二，要了解系统架构优化的常用方法。比如：并行、异步、水平扩展和垂直扩展、预处理、缓存、分区（Sharding）等等。</p><p>第三，会考察对负责的工作了解程度、是否有责任⼼。如果连自己负责的服务的部署规模，调用量级都不清楚，怎么能有很强的责任心呢？</p><p>最后一个是解决问题能力，是否能灵活运用各种知识。</p><h6 id="加分项" tabindex="-1">加分项 <a class="header-anchor" href="#加分项" aria-label="Permalink to &quot;加分项&quot;">​</a></h6><p>加分点主要在于表现出面试者的学习能力和思考能力。</p><p>第一个，了解业界最新趋势，比如 Service Mesh 的思路和要解决的问题。</p><p>第二个，在介绍项目时，如果有不同方案的选型或对比会更好。比如在介绍项目架构时，有两个方案，一个是同步方案，一个是异步方案，这两个方案各有什么优缺点，最后结合业务场景、实际需求、请求量级 选择了某一种。</p><h6 id="面试技巧" tabindex="-1">面试技巧 <a class="header-anchor" href="#面试技巧" aria-label="Permalink to &quot;面试技巧&quot;">​</a></h6><h6 id="介绍项目" tabindex="-1">介绍项目 <a class="header-anchor" href="#介绍项目" aria-label="Permalink to &quot;介绍项目&quot;">​</a></h6><p>面试时，一定会遇到介绍项目这个问题。我见过的大多数人在里表现的并不好：要么讲不清楚项目的结构与交互流程；要么不能理解项目架构为什么要这样设计；要么没有思考过项目存在哪些问题，有哪些可以改进的地方。不仅是针对面试，在工作中我们更应该搞清楚这些问题，尤其是工作 1～3 年的工程师们。</p><p>那么，在面试中如何更好地介绍自己负责的项目？如下所示，图中这些方法是根据面试考察点总结的，并且会提示每个方法要重点体现哪些能力。</p><br>',29),f=t('<p>第一步，要简单交代项目背景，让面试官可以快速进入到项目上下文，更容易理解项目架构。一般采用 STAR 法则来进行介绍：</p><ul><li><p>Situation 介绍项目背景，比如这个项目是研发一个短视频 APP，配合公司主客户端来交叉提高用户量与活跃度；</p></li><li><p>Task 介绍自己的任务，比如我在这个项目中负责后端服务的架构设计与研发；</p></li><li><p>Action 介绍自己做了哪些工作，比如当时用了 2 周时间做架构设计，4 周时间做研发，2 周时间测试上线；</p></li><li><p>Result 介绍结果，这个也是大部分人容易忽视的部分，比如项目上线后 2 个月用户数 100w，后端服务接口总量峰值 50000qps，主要接口服务 SLA p99 小于 50ms。</p></li></ul><br><p>注意背景介绍是为后面详细介绍做铺垫，简洁明了即可。这一步主要体现你的表达能力。</p><p>第二步，重点介绍项目的架构，这也是面试官最想了解的部分。</p><p>务必要结合架构图、交互流程图来介绍，避免对一些关键问题理解歧义。架构图要注意边界清晰，就是你的服务与其他依赖的外部服务之间的边界，以及你服务内部模块之间的边界都要描述清晰。这有利于你下一步介绍自己做了哪些内容。这一步要体现出你对项目架构的理解。</p><p>第三步，介绍你在这个项目中具体做了哪些内容，例如我设计了整个架构，或者我实现了架构图中的某几个模块。注意这一步是你面试的绝对加分点，必须要把握住。</p><p>这里要突出你在项目中做的最有挑战的点、优雅的架构设计、或者独特有效的解决方案。比如在数据量非常大的场景下，通过优化 Redis 存储结构，减少了 70% 的 Redis 使用容量；比如对查询接口应用双发功能使 p999 降低了 60%；再比如使用了 Trace 功能来快速定位问题，等等。这一步要体现出你的实现能力与亮点。</p><p>第四步，要为第三步介绍的优秀架构或解决方案提供证明，比如前面介绍了系统架构中使用模块化来提高扩展性，那这里就可以说系统上线后，通过模块化方式支持了 7 个新业务的接入来体现你设计的架构的优点。</p><p>这里要注意，所有的结果必须是可以量化的，不要用性能大幅提升，极大提高灵活性这类很虚的描述。好一点的表述可以是这样：通过增加二级缓存，对后端服务的调用请求从 7000qps 降低到 600qps。这一步要体现出你对项目的掌握能力和了解程度。</p><p>第五步，思考项目存在哪些问题，或者还有哪些可以进行优化的点。</p><p>例如，现在项目 QPS 不高，某些任务是同步处理的，会有一定效率问题，这些处理步骤是可以异步执行的，如果请求量级增加，可以考虑使用 kafka 进行异步处理。处理时还应该考虑消息重复的问题，可以把处理逻辑设计成幂等性的。这一步要体现你对项目的思考以及总结反思能力。</p><p>如果我作为面试官，遇到一位按照上面 5 个方向来交流的候选人，一定会非常看好他。</p><h6 id="面试技巧-1" tabindex="-1">面试技巧 <a class="header-anchor" href="#面试技巧-1" aria-label="Permalink to &quot;面试技巧&quot;">​</a></h6><p>再来介绍几个备战面试的小技巧。</p><p>第一点，肯定要提前思考、提前准备。</p><p>像项目架构图怎么画更容易理解，项目中到底哪个设计最有亮点，项目还存在哪些可以改进的地方等等问题，可能要花很多时间才能找到比较理想的答案，在面试现场临时回答难度非常大。一定要根据我前面的方法，提前准备。</p><p>第二点，要记住项目在精不在多。</p><p>有的人在介绍项目时，会抛出好几个项目，但每个项目介绍的都很潦草。在面试中，面试官是想通过项目介绍来考察你的各方面能力，一个重点的项目就足够了。一定要选你最了解、最能代表你能力的来介绍。</p><p>第三点，我了解的，就是我的。</p><p>有的同学可能因为机遇的原因，没有负责过重点的项目，不过项目介绍这么重要的考察点，也不能白白在这里丢分。你可以多了解一下其他同事或团队负责的项目，只要你能把细节搞明白，把架构理解透，那么知识就是你的，依然可以拿来进行介绍。</p><p>第四点，要重点体现对架构的理解，对设计的思考。</p><p>这会让面试官觉得你会很有潜力。你可以在介绍项目设计思路时做适当的延伸。例如你可以说：在我的业务场景下，可以容忍低概率的消息丢失，所以基于性能优先考虑，去掉了 Kafka 的 ACK 应答。如果是严格要求不丢消息的场景，我会使用同步应答，并且使用最高消息可靠性等级。</p><p>至此，《32个Java面试必考点》的所有内容结束，感谢支持。</p><br><br>',26);function x(V,B,E,R,y,F){const a=r("Image");return i(),l("div",null,[n,p(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/D0/CgoB5l14t26AT0v9AAA3LTeoU0M334.png"}),_,p(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/D0/CgoB5l14t2-AampFAABOMvCkZTY259.png"}),h,d,u,A,S,b,k,p(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/F0/CgotOV14t2-AX2xjAAA6NVyInt4809.png"}),P,p(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/F0/CgotOV14t2-ATjILAABouqvKvNo468.png"}),C,m,T,g,p(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/D0/CgoB5l14t2-AYqk4AACYtQ3JDlo689.png"}),D,p(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/F0/CgotOV14t2-APAInAABdqBn3mnA260.png"}),q,v,M,p(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/F0/CgotOV14t3CASIe1AABQuqlcN6s135.png"}),K,p(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/D0/CgoB5l14t3CAaXLZAABMHz7Fi9Y296.png"}),N,p(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/D0/CgoB5l14t3CAWVztAACDUQTq8AE725.png"}),I,p(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/F0/CgotOV14t3CABPyUAAAzZ_1uj5c565.png"}),f])}const L=o(c,[["render",x]]);export{J as __pageData,L as default};
