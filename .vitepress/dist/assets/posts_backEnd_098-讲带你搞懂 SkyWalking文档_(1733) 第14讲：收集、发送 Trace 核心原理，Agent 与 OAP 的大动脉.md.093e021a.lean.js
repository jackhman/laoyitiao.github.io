import{_ as p,j as l,o,g as t,k as n,s as a,Q as e,h as r}from"./chunks/framework.e0c66c3f.js";const x=JSON.parse('{"title":"ContextManager ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1733) 第14讲：收集、发送 Trace 核心原理，Agent 与 OAP 的大动脉.md","filePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1733) 第14讲：收集、发送 Trace 核心原理，Agent 与 OAP 的大动脉.md","lastUpdated":1696338709000}'),c={name:"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1733) 第14讲：收集、发送 Trace 核心原理，Agent 与 OAP 的大动脉.md"},E=a("p",null,"在前面的课时中，我们深入介绍了 SkyWalking 对 Trace 基本概念的实现。本课时我们将继续深入学习 Trace 相关的 BootService 接口实现类以及 Trace 收集和发送的核心逻辑。Trace 相关的 BootService 接口实现类如下图所示：",-1),y=e("",12),i=e("",5),g=e("",6),m=e("",5),C=a("h4",{id:"总结",tabindex:"-1"},[r("总结 "),a("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),S=a("p",null,"本课时我们重点介绍了 Trace 相关的 BootService 接口实现。首先介绍了 ContextManager 的核心实现，理清了它是如何将 TracingContext 与当前线程关联起来的。接下来介绍了 SamplingService 实现客户端 Trace 采样的逻辑。最后介绍了上报 Trace 的 gRPC 接口，深入分析了 TraceSegmentServiceClient 收集和上报 Trace 数据的核心逻辑。",-1);function d(T,A,F,h,v,_){const s=l("Image");return o(),t("div",null,[E,n(s,{alt:"sw0.png",src:"https://s0.lgstatic.com/i/image3/M01/14/4A/Ciqah16hMVaAatgbAABGB3yEwak805.png"}),y,n(s,{alt:"sw1.png",src:"https://s0.lgstatic.com/i/image3/M01/14/49/Ciqah16hMHmAT7-VAALHNKUBOhU815.png"}),i,n(s,{alt:"sw2.png",src:"https://s0.lgstatic.com/i/image3/M01/14/4A/Ciqah16hMNGAO2HOAAEZleWtX24011.png"}),g,n(s,{alt:"sw3.png",src:"https://s0.lgstatic.com/i/image3/M01/14/4A/Ciqah16hMPmAaAOWAAPeM8ggypA230.png"}),m,n(s,{alt:"sw4.png",src:"https://s0.lgstatic.com/i/image3/M01/07/1B/CgoCgV6hMS2AQpyZAAFcVM04dCk973.png"}),C,S])}const D=p(c,[["render",d]]);export{x as __pageData,D as default};
