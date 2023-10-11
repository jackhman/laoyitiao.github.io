import{_ as s,D as n,o as c,g as i,J as a,h as r,Q as t,m as e}from"./chunks/framework.f67d7268.js";const L=JSON.parse('{"title":"38容器编排技术：如何利用K8和DockerSwarm管理微服务？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/重学操作系统_文档/(4650) 38  容器编排技术：如何利用 K8 和 Docker Swarm 管理微服务？.md","filePath":"posts/backEnd/重学操作系统_文档/(4650) 38  容器编排技术：如何利用 K8 和 Docker Swarm 管理微服务？.md","lastUpdated":1696682708000}'),_={name:"posts/backEnd/重学操作系统_文档/(4650) 38  容器编排技术：如何利用 K8 和 Docker Swarm 管理微服务？.md"},p=t("",11),l=t("",8),d=e("p",null,"在我们为一个微服务扩容的时候，首选并不是去增加 Worker 节点。可以增加这个微服务的容器数量，也可以提升每个容器占用的 CPU、内存存储资源。只有当整个集群的资源不够用的时候，才会考虑增加机器、添加节点。",-1),h=e("p",null,"Master 节点至少需要 2 个，但并不是越多越好。Master 节点主要是管理集群的状态数据，不需要很大的内存和存储空间。Worker 节点根据集群的整体负载决定，一些大型网站还有弹性扩容的手段，也可以通过 K8s 实现。",-1),k=e("h4",{id:"单点架构",tabindex:"-1"},[r("单点架构 "),e("a",{class:"header-anchor",href:"#单点架构","aria-label":'Permalink to "单点架构"'},"​")],-1),m=e("p",null,"接下来我们讨论一下 Worker 节点的架构。所有的 Worker 节点上必须安装 kubelet，它是节点的管理程序，负责在节点上管理容器。",-1),g=e("p",null,"Pod 是 K8s 对容器的一个轻量级的封装，每个 Pod 有自己独立的、随机分配的 IP 地址。Pod 内部是容器，可以 1 个或多个容器。目前，Pod 内部的容器主要是 Docker，但是今后可能还会有其他的容器被大家使用，主要原因是 K8s 和 Docker 的生态也存在着竞争关系。总的来说，如下图所示，kubelet 管理 Pod，Pod 管理容器。当用户创建一个容器的时候，实际上在创建 Pod。",-1),u=e("p",null,"虽然 K8s 允许同样的应用程序（比如微服务），在一个节点上创建多个 Pod。但是为了保证可用性，通常我们会考虑将微服务分散到不同的节点中去。如下图所示，如果其中一个节点宕机了，微服务 A，微服务 B 还能正常工作。当然，有一些微服务。因为程序架构或者编程语言的原因，只能使用单进程。这个时候，我们也可能会在单一的节点上部署多个相同的服务，去利用更多的 CPU 资源。",-1),P=e("h4",{id:"负载均衡",tabindex:"-1"},[r("负载均衡 "),e("a",{class:"header-anchor",href:"#负载均衡","aria-label":'Permalink to "负载均衡"'},"​")],-1),A=e("p",null,"Pod 的 IP 地址是动态的，如果要将 Pod 作为内部或者外部的服务，那么就需要一个能拥有静态 IP 地址的节点，这种节点我们称为服务（Service），服务不是一个虚拟机节点，而是一个虚拟的概念------或者理解成一段程序、一个组件。请求先到达服务，然后再到达 Pod，服务在这之间还提供负载均衡。当有新的 Pod 加入或者旧的 Pod 被删除，服务可以捕捉到这些状态，这样就大大降低了分布式应用架构的复杂度。",-1),b=e("p",null,"如上图所示，当我们要提供服务给外部使用时，对安全的考虑、对性能的考量是超过内部服务的。 K8s 解决方案：在服务的上方再提供薄薄的一层控制程序，为外部提供服务------这就是 Ingress。",-1),D=e("p",null,[r("以上，就是 K8s 的整体架构。 在使用的过程当中，相信你会感受到这个工具的魅力。比如说组件非常齐全，有数据加密、网络安全、单机调试、API 服务器等。如果你想了解更多的内容，可以查看"),e("a",{href:"https://kubernetes.io/docs/concepts/overview/",target:"_blank",rel:"noreferrer"},"这些资料"),r("。")],-1),S=e("h3",{id:"docker-swarm",tabindex:"-1"},[r("Docker Swarm "),e("a",{class:"header-anchor",href:"#docker-swarm","aria-label":'Permalink to "Docker Swarm"'},"​")],-1),T=e("p",null,"Docker Swarm 是 Docker 团队基于 Docker 生态打造的容器编排引擎。下图是 Docker Swarm 整体架构图。",-1),K=e("p",null,"和 K8s 非常相似，节点被分成了 Manager 和 Worker。Manager 之间的状态数据通过 Raft 算法保证数据的一致性，Worker 内部是 Docker 容器。",-1),w=e("p",null,"和 K8s 的 Pod 类似，Docker Swarm 对容器进行了一层轻量级的封装------任务（Task），然后多个Task 通过服务进行负载均衡。",-1),f=t("",15);function C(q,M,x,I,E,V){const o=n("Image");return c(),i("div",null,[p,a(o,{alt:"Lark20210129-190005.png",src:"https://s0.lgstatic.com/i/image/M00/93/22/Ciqc1GAT7LeAJznRAAKOxTSise8097.png"}),r(),l,a(o,{alt:"Lark20210129-190008.png",src:"https://s0.lgstatic.com/i/image/M00/93/2E/CgqCHmAT7M-Af_RTAAKzmD-Lpm0018.png"}),r(),d,h,k,m,g,a(o,{alt:"Lark20210129-190011.png",src:"https://s0.lgstatic.com/i/image/M00/93/22/Ciqc1GAT7NyAI0-5AAEh6UfvPpY109.png"}),r(),u,a(o,{alt:"Lark20210129-190014.png",src:"https://s0.lgstatic.com/i/image/M00/93/2E/CgqCHmAT7OaAeadYAAJEm88_Xg8398.png"}),r(),P,A,a(o,{alt:"Lark20210129-190001.png",src:"https://s0.lgstatic.com/i/image/M00/93/2E/CgqCHmAT7PeAZRvoAACjdnGXVe0743.png"}),r(),b,D,S,T,a(o,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/93/2E/CgqCHmAT7QaAcwO7AAJWW_dhVAU264.png"}),r(),K,w,a(o,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/93/22/Ciqc1GAT7RCAYw67AAGVRE-fcmY185.png"}),r(),f])}const v=s(_,[["render",C]]);export{L as __pageData,v as default};
