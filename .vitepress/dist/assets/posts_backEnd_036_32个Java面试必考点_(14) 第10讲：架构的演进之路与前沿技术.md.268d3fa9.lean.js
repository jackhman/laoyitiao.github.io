import{_ as o,j as r,o as i,g as l,k as p,Q as t,s as e,h as s}from"./chunks/framework.4e7d56ce.js";const J=JSON.parse('{"title":"系统架构演进 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/036_32个Java面试必考点/(14) 第10讲：架构的演进之路与前沿技术.md","filePath":"posts/backEnd/036_32个Java面试必考点/(14) 第10讲：架构的演进之路与前沿技术.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/036_32个Java面试必考点/(14) 第10讲：架构的演进之路与前沿技术.md"},n=t("",7),_=t("",6),h=e("p",null,"微服务架构的思想就是让服务尽可能做到高内聚、低耦合，不同的服务单独开发、单独测试、单独部署。服务之间通过 RPC 或者 HTTP 进行远程交互，如图中的蓝色加粗箭头所示。",-1),d=e("p",null,"微服务架构解决了单体架构的耦合问题，但同时也带来了新的问题。因为服务部署在不同的进程或服务器中，要使用服务前需要先找到服务，即所谓的服务发现。",-1),u=e("p",null,"一般微服务使用两种发现方式，一种是前面课程介绍过的 RPC 方式，通过注册中心进行服务的注册和订阅，来完成服务发现，比如图中间灰色的 Registry 模块。这种方式由服务的调用端获得到全部可用服务节点，由 Client 侧进行负载均衡，调用服务。另外一种是通过 HTTP 协议调用服务端提供的 RESTful 接口，这种方式不需要 Client 侧做服务发现，而是在 Server 端通过 Nignx 这样的反向代理来提供 Server 侧的负载均衡。",-1),A=e("p",null,"不论哪种方式，服务的交互都从进程内通信变成了远程通信，所以性能必然会受到一些影响。此外由于很多不确定性的因素，例如网络拥塞、Server 端服务器宕机、挖掘机铲断机房光纤等等，需要许多额外的功能和措施才能保证微服务流畅稳定的工作。前面在 Spring Cloud 内容中提到的 Hystrix 熔断器、Ribbon客户端负载均衡器、Eureka注册中心等等都是用来解决这些问题的微服务组件。",-1),S=e("h6",{id:"cap-原则与-base-理论",tabindex:"-1"},[s("CAP 原则与 BASE 理论 "),e("a",{class:"header-anchor",href:"#cap-原则与-base-理论","aria-label":'Permalink to "CAP 原则与 BASE 理论"'},"​")],-1),b=e("p",null,"在微服务架构中，有必要了解一下分布式系统中的 CAP 原则与 BASE 理论。如下图所示，CAP 原则指的是在一个分布式系统中，Consistency 一致性、 Availability 可用性、Partition tolerance 分区容错性，这三个特性最多只能同时满足两个，三者不可兼得。",-1),k=e("br",null,null,-1),P=t("",13),C=e("p",null,"云原生服务需要底层的云服务提供 IaaS 基础设施或者 PaaS 平台设施来运行，IaaS 可以理解为提供了服务器资源，PaaS 平台可以理解为提供了运行环境。",-1),m=e("p",null,"常见的实现方式有两种：自建的私有云和云厂商提供的公有云。公有云比如阿里云、AWS、腾讯云等等，像新浪微博内部使用的是私有云与公有云结合的混合云模式。",-1),T=e("p",null,"接下来看云原生应用开发的最佳实践原则：12 要素，如下图所示。",-1),g=e("br",null,null,-1),D=t("",18),q=e("p",null,"目前最有代表性的 Service Mesh 开源实现，是由 Google、IBM、Lyft 三家一起维护的 Istio，有兴趣的话可以持续关注，这里就不详细展开了。",-1),v=e("p",null,"那么 Service Mesh 与微服务的区别是什么呢？Service Mesh 又可以解决哪些问题呢？如下图所示。",-1),M=e("br",null,null,-1),K=t("",20),N=t("",19),I=t("",29),f=t("",26);function x(V,B,E,R,y,F){const a=r("Image");return i(),l("div",null,[n,p(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/D0/CgoB5l14t26AT0v9AAA3LTeoU0M334.png"}),_,p(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/D0/CgoB5l14t2-AampFAABOMvCkZTY259.png"}),h,d,u,A,S,b,k,p(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/F0/CgotOV14t2-AX2xjAAA6NVyInt4809.png"}),P,p(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/F0/CgotOV14t2-ATjILAABouqvKvNo468.png"}),C,m,T,g,p(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/D0/CgoB5l14t2-AYqk4AACYtQ3JDlo689.png"}),D,p(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/F0/CgotOV14t2-APAInAABdqBn3mnA260.png"}),q,v,M,p(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/F0/CgotOV14t3CASIe1AABQuqlcN6s135.png"}),K,p(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/D0/CgoB5l14t3CAaXLZAABMHz7Fi9Y296.png"}),N,p(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/D0/CgoB5l14t3CAWVztAACDUQTq8AE725.png"}),I,p(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/F0/CgotOV14t3CABPyUAAAzZ_1uj5c565.png"}),f])}const L=o(c,[["render",x]]);export{J as __pageData,L as default};
