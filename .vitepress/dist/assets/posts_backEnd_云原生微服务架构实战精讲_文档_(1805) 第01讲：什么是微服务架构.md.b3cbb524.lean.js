import{_ as r,j as e,o as a,g as p,k as s,h as n,s as t,Q as l}from"./chunks/framework.e0c66c3f.js";const U=JSON.parse('{"title":"单体应用的问题 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/云原生微服务架构实战精讲_文档/(1805) 第01讲：什么是微服务架构.md","filePath":"posts/backEnd/云原生微服务架构实战精讲_文档/(1805) 第01讲：什么是微服务架构.md","lastUpdated":1696338709000}'),_={name:"posts/backEnd/云原生微服务架构实战精讲_文档/(1805) 第01讲：什么是微服务架构.md"},i=t("br",null,null,-1),c=t("p",null,"本课时我们将介绍微服务架构。",-1),u=t("br",null,null,-1),d=t("p",null,"相信你也听说过微服务（MicroService）这个词，微服务架构是一种流行的架构设计风格，通常用作单体（Monolith）架构的一种替代方案。市面上关于微服务的图书、教程和资料层出不穷，这在很大程度归功于大厂商的市场推广，微服务和很多年之前的 SOA 一样，注定会成为一个广泛讨论的话题。从好的方面来说，这保证了微服务相关的技术有足够大的市场，不会被轻易淘汰；从坏的方面来说，错综复杂的信息会让人无所适从，不知道从何入手开始学习微服务架构中与技术相关的内容。",-1),h=t("br",null,null,-1),b=t("p",null,[n("目前，我们开发的大部分应用都是"),t("strong",null,"单体应用"),n("。当单体应用的复杂度增加时，会出现一系列的问题。微服务架构吸引人的地方在于它"),t("strong",null,"对复杂应用的开发提供了一种新的解决方法"),n("。微服务架构的核心思想是把应用按照功能划分成多个独立的服务，每个服务都是独立运行的应用。")],-1),g=t("br",null,null,-1),m=t("p",null,"如下图所示，外部的边框是应用的边界，不同的形状表示不同的单元。图中左侧表示的是单体应用，所有单元在同一个应用的边界内。在进行扩展时，单体应用只能整体扩展；右侧表示的是微服务架构的应用，每个单元在自己的应用边界内。在进行扩展时，微服务架构的应用以服务为单位进行扩展。不同服务在运行时的实例数量可以根据负载动态进行调整。",-1),A=t("br",null,null,-1),P=l("",25),S=t("br",null,null,-1),C=t("p",null,[t("strong",null,"微服务架构的开发团队围绕业务能力来组织"),n("**。**单体应用的开发团队通常按照技能来划分，一个典型的 3 层应用开发团队可能分成前端开发、后端开发和数据库管理等小组。微服务架构的开发团队以服务为单元来组织，每个服务与特定的业务需求相对应。服务的开发团队规模较小，包含开发、测试和 DevOps 相关的全部人员，负责该微服务的团队对该微服务的实现可以全权负责。较小的开发团队意味着更少的沟通成本和更高的开发效率。")],-1),T=t("br",null,null,-1),x=t("p",null,[t("strong",null,"微服务架构使用去中心化的管理模式"),n("**。**单体应用的开发团队通常会对使用的技术栈做出限制，要求整个团队使用统一的技术栈。这种方式的弊端在于，没有一种技术栈适用于解决所有的问题。微服务架构中的服务都可以独立部署，这就意味着每个服务在实现时可以选择最适合的技术栈，只需要满足服务的 API 契约即可。每个团队自主管理所负责的服务，不但负责构建，还同样负责运行和维护，这在无形中提高了团队的主观能动性，同时降低了管理的开销。")],-1),I=t("br",null,null,-1),f=t("p",null,"如下图所示，每个微服务都有对应的团队，而每个团队中都有各种角色的人员。",-1),q=t("br",null,null,-1),v=t("br",null,null,-1),N=t("p",null,[t("strong",null,"微服务架构使用去中心的数据存储"),n("**。**单体应用通常使用单一数据库来存储数据，微服务架构中的服务通常有自己专有的数据存储，如下图所示。这些存储方式的实现可能各不相同，只包含服务所需的数据。")],-1),k=t("br",null,null,-1),E=l("",26),V=l("",15);function O(D,M,B,K,R,J){const o=e("Image");return a(),p("div",null,[i,c,u,d,h,b,g,m,A,s(o,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/77/00/CgpOIF5xmoGAUTfzAABPx3pECpY054.png"}),P,s(o,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/77/01/CgpOIF5xmxeANVsbAAArVXlsN5E454.png"}),n(),S,C,T,x,I,f,q,s(o,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/77/00/CgpOIF5xmoKAEPAGAABYbCCx_OI186.png"}),v,N,k,s(o,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/77/00/Cgq2xl5xmoKAdBzdAAB1algcLv0278.png"}),E,s(o,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/77/02/Cgq2xl5xm_GASo6gAAChFHBVYTw388.png"}),n(),V])}const $=r(_,[["render",O]]);export{U as __pageData,$ as default};
