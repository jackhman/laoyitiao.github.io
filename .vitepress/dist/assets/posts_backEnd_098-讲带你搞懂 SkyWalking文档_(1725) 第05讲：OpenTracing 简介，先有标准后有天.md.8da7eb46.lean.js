import{_ as p,D as o,o as s,g as r,J as e,h as n,m as a,Q as l}from"./chunks/framework.f67d7268.js";const v=JSON.parse('{"title":"第05讲：OpenTracing简介，先有标准后有天","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1725) 第05讲：OpenTracing 简介，先有标准后有天.md","filePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1725) 第05讲：OpenTracing 简介，先有标准后有天.md","lastUpdated":1696682708000}'),i={name:"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1725) 第05讲：OpenTracing 简介，先有标准后有天.md"},g=a("h1",{id:"第05讲-opentracing简介-先有标准后有天",tabindex:"-1"},[n("第05讲：OpenTracing简介，先有标准后有天 "),a("a",{class:"header-anchor",href:"#第05讲-opentracing简介-先有标准后有天","aria-label":'Permalink to "第05讲：OpenTracing简介，先有标准后有天"'},"​")],-1),c=a("p",null,"自从 Google Dapper 的论文发布之后，各大互联网公司和开源社区开发的分布式链路追踪产品百花齐放，同时也给使用者带来了一个问题，各个分布式链路追踪产品的 API 并不兼容，如果用户在各个产品之间进行切换，成本非常高。",-1),_=a("br",null,null,-1),S=a("p",null,"而 OpenTracing 就完美的解决了这个问题，OpenTracing 通过提供平台无关、厂商无关的 API，帮助开发人员能够方便地添加（或更换）追踪系统。",-1),h=a("h1",{id:"trace-简介",tabindex:"-1"},[n("Trace 简介 "),a("a",{class:"header-anchor",href:"#trace-简介","aria-label":'Permalink to "Trace 简介"'},"​")],-1),d=a("p",null,"一个 Trace 代表一个事务、请求或是流程在分布式系统中的执行过程。OpenTracing 中的一条 Trace 被认为是一个由多个 Span 组成的有向无环图（ DAG 图），一个 Span 代表系统中具有开始时间和执行时长的逻辑单元，Span 一般会有一个名称，一条 Trace 中 Span 是首尾连接的。",-1),u=a("br",null,null,-1),T=a("br",null,null,-1),b=a("p",null,"上图展示了分布式系统中一次客户端请求的全过程，虽然这种可视化图形对于查看各组件的组合关系是有用的，但是它不能很好显示组件的调用时间、先后关系、是串行还是并行等信息，如果想要展现更复杂的调用关系，该图会更加复杂。",-1),m=a("br",null,null,-1),C=a("p",null,"如果将此次客户端请求的处理流程看作一条 Trace，其中每一次调用，无论是 HTTP 调用、RPC 调用、存储访问还是我们比较关注的本地方法调用，都可以成为一个 Span，通常如下图所示：",-1),x=a("br",null,null,-1),A=l("",14),O=a("br",null,null,-1),f=a("ul",null,[a("li",null,[a("strong",null,"FollowsFrom 关系"),n(" **：**在分布式系统中，一些上游系统（父节点）不以任何方式依赖下游系统（子节点）的执行结果，例如，上游系统通过消息队列向下游系统发送消息。这种情况下，下游系统对应的子 Span 和上游系统对应的父级 Span 之间是 FollowsFrom 关系。下图展示了一些可能的 FollowsFrom 关系：")])],-1),I=a("br",null,null,-1),k=a("br",null,null,-1),F=a("p",null,"下面的示例 Trace 是由 8 个 Span 组成，其中 Span A 和 Span C 之间是 ChildOf 关系，Span F 和 Span G 之间是 FollowsFrom 关系：",-1),P=a("br",null,null,-1),B=a("h1",{id:"logs-简介",tabindex:"-1"},[n("Logs 简介 "),a("a",{class:"header-anchor",href:"#logs-简介","aria-label":'Permalink to "Logs 简介"'},"​")],-1),E=a("p",null,[n("每个 Span 可以进行多次 Logs 操作，每一次 Logs 操作，都需要带一个时间戳，以及一个可选的附加信息。在前文搭建的环境中，请求 "),a("a",{href:"http://localhost:8000/err",target:"_blank",rel:"noreferrer"},"http://localhost:8000/err"),n(" 得到的 Trace 中就会通过 Logs 记录异常堆栈信息，如下图所示，其中不仅包括异常的堆栈信息，还包括了一些说明性的键值对信息：")],-1),L=a("br",null,null,-1),q=a("h1",{id:"tags-简介",tabindex:"-1"},[n("Tags 简介 "),a("a",{class:"header-anchor",href:"#tags-简介","aria-label":'Permalink to "Tags 简介"'},"​")],-1),V=a("p",null,"每个 Span 可以有多个键值对形式的 Tags，Tags 是没有时间戳的，只是为 Span 添加一些简单解释和补充信息。下图展示了前文示例中 Tags 的信息：",-1),z=a("br",null,null,-1),D=l("",19);function M(R,N,y,W,w,G){const t=o("Image");return s(),r("div",null,[g,c,_,S,h,d,u,e(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/77/FE/Cgq2xl5zIEeAIG1BAABPpgHQZkc045.png"}),n(),T,b,m,C,x,e(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/77/FD/CgpOIF5zIEeAHos0AAAZLZRufhU976.png"}),n(),A,e(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/77/FD/CgpOIF5zIEeANSJ1AAAvjIyS4ac173.png"}),n(),O,f,I,e(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/77/FE/Cgq2xl5zIEeAP7J6AAAieIn1LW8813.png"}),n(),k,F,P,e(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/77/FD/CgpOIF5zIEiACY7bAAHw5sz9rVs412.png"}),n(),B,E,L,e(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/77/FE/Cgq2xl5zIEiAGoMzAAVtWur3mGc633.png"}),n(),q,V,z,e(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/77/FD/CgpOIF5zIEiAOAr-AAH8CUUmFf8447.png"}),n(),D])}const U=p(i,[["render",M]]);export{v as __pageData,U as default};
