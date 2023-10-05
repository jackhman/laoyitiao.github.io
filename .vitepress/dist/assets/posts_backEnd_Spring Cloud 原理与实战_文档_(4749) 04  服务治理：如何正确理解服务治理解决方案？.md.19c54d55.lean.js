import{_ as a,j as r,o as l,g as _,k as e,h as o,Q as s,s as t}from"./chunks/framework.4e7d56ce.js";const v=JSON.parse('{"title":"如何理解服务治理的基本需求？ ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4749) 04  服务治理：如何正确理解服务治理解决方案？.md","filePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4749) 04  服务治理：如何正确理解服务治理解决方案？.md","lastUpdated":1696417798000}'),i={name:"posts/backEnd/Spring Cloud 原理与实战_文档/(4749) 04  服务治理：如何正确理解服务治理解决方案？.md"},p=s("",4),g=s("",6),c=t("p",null,"注册中心客户端与注册中心交互示意图",-1),d=t("p",null,"同时，为了提高服务路由的效率和容错性，服务消费者可以配备缓存机制以加速服务路由。更重要的是，当服务注册中心不可用时，服务消费者可以利用本地缓存路由实现对现有服务的可靠调用。上图中也展示了这一设计思路。",-1),u=t("h3",{id:"如何理解服务治理的实现策略",tabindex:"-1"},[o("如何理解服务治理的实现策略？ "),t("a",{class:"header-anchor",href:"#如何理解服务治理的实现策略","aria-label":'Permalink to "如何理解服务治理的实现策略？"'},"​")],-1),h=t("p",null,"基于前面的讨论内容，我们可以得知，对于服务治理工具而言，在实现上的主要难度在于在服务提供者实例状态发生变更时如何同步到服务的消费者。",-1),C=t("p",null,[o("从架构设计上讲，状态变更管理可以采用"),t("strong",null,"发布-订阅模式"),o("，体现在服务提供者可以根据服务定义发布服务，而服务消费者则通过对自己感兴趣的服务进行订阅并获取包括服务地址在内的各项元数据。发布-订阅功能还体现在状态变更推送，即当注册中心服务定义发生变化时，主动推送变更到该服务的消费者。")],-1),A=t("p",null,"基于发布-订阅设计思想，就诞生了一种服务监听机制。服务监听机制确保服务消费者能够实时监控服务更新状态，是一种被动接收变更通知的实现方案，通常采用监听器以及回调机制，如下图所示。",-1),T=t("p",null,"服务监听机制效果图",-1),m=t("p",null,[o("我们假定以一种分层结构来展示"),t("strong",null,"注册中心的内部组成"),o("，可以看到这里有三个服务，每个服务有两个实例节点。服务消费者可以对这些具体的服务定义节点添加监听器，当这些节点发生变化时（例如图中服务 A 的第二个实例变得不可用），注册中心就能触发监听器中的回调函数确保更新通知到每一个服务消费者。显然，使用监听和通知机制具备实时的数据同步效果。")],-1),k=t("p",null,[o("另外一种确保状态信息同步的方式是采用"),t("strong",null,"轮询机制"),o("。轮询机制是一种主动拉取策略，即服务的消费者定期调用注册中心提供的服务获取接口获取最新的服务列表并更新本地缓存，如下图所示：")],-1),S=s("",5),E=t("p",null,"基于 ZooKeeper 的监听机制示意图",-1),b=t("p",null,[o("而对于本课程将要介绍的 "),t("strong",null,"Netflix Eureka"),o(' 而言，采用的就是典型的"'),t("strong",null,"轮询机制"),o('"来实现服务实例状态的同步，默认的同步频率是 30 秒。')],-1),f=t("h3",{id:"如何理解服务治理与负载均衡之间的关系",tabindex:"-1"},[o("如何理解服务治理与负载均衡之间的关系？ "),t("a",{class:"header-anchor",href:"#如何理解服务治理与负载均衡之间的关系","aria-label":'Permalink to "如何理解服务治理与负载均衡之间的关系？"'},"​")],-1),x=t("p",null,"现在，我们来关注服务治理的另一个话题，我们知道对于服务注册而言，一般都是将服务自身的实例信息实时同步到注册中心即可。而关于服务发现环节，业界也有两种不同的实现方式，**一种是客户端发现机制，一种则是服务器端发现机制。**在微服务架构中，主流的是采用客户端发现机制，即在每个服务消费者内部保存着一个服务列表：",-1),N=t("p",null,"客户端发现机制示意图",-1),P=t("p",null,[o("当服务消费者真正对"),t("strong",null,"某一个服务"),o("提供者发起远程调用时，就需要决定具体的服务提供者实例，这时候就需要集成负载均衡机制。同样，这时候的负载均衡也是一种客户端行为，被称为客户端负载均衡：")],-1),q=t("p",null,"客户端负载均衡示意图",-1),R=t("h3",{id:"如何理解spring-cloud中的服务治理解决方案",tabindex:"-1"},[o("如何理解Spring Cloud中的服务治理解决方案？ "),t("a",{class:"header-anchor",href:"#如何理解spring-cloud中的服务治理解决方案","aria-label":'Permalink to "如何理解Spring Cloud中的服务治理解决方案？"'},"​")],-1),V=t("p",null,[o("此外，Spring Cloud 中提供了对微服务架构中"),t("strong",null,"服务治理工作"),o("的强大支持，其整体服务治理方案如下图所示：")],-1),D=s("",8);function I(M,H,Z,K,L,w){const n=r("Image");return l(),_("div",null,[p,e(n,{alt:"Lark20200927-162759.png",src:"https://s0.lgstatic.com/i/image/M00/58/E4/CgqCHl9wTXmAJq3iAABEhvI7id4435.png"}),o(),g,e(n,{alt:"Lark20200927-162806.png",src:"https://s0.lgstatic.com/i/image/M00/58/D9/Ciqc1F9wTZaAMmeJAABWOZtRyDM235.png"}),o(),c,d,u,h,C,A,e(n,{alt:"Lark20200927-162809.png",src:"https://s0.lgstatic.com/i/image/M00/58/D9/Ciqc1F9wTaaAHQ7xAADoZToYX9A586.png"}),o(),T,m,k,e(n,{alt:"Lark20200927-162817.png",src:"https://s0.lgstatic.com/i/image/M00/58/E5/CgqCHl9wTa-AaaAhAADXjCF7Nx8460.png"}),o(),S,e(n,{alt:"Lark20200927-162821.png",src:"https://s0.lgstatic.com/i/image/M00/58/E5/CgqCHl9wTcKAXS2DAABX6iKOH9g653.png"}),o(),E,b,f,x,e(n,{alt:"Lark20200927-162824.png",src:"https://s0.lgstatic.com/i/image/M00/58/E5/CgqCHl9wTc6AZx9UAACo08eSfFg174.png"}),o(),N,P,e(n,{alt:"Lark20200927-162826.png",src:"https://s0.lgstatic.com/i/image/M00/58/E5/CgqCHl9wTdaAMx5-AAC_2kggVBo758.png"}),o(),q,R,V,e(n,{alt:"Lark20200927-162829.png",src:"https://s0.lgstatic.com/i/image/M00/58/E5/CgqCHl9wTd-AW-jLAACEFEl1hKU817.png"}),o(),D])}const F=a(i,[["render",I]]);export{v as __pageData,F as default};
