import{_ as o,j as p,o as i,g as s,k as n,h as e,Q as r,s as a}from"./chunks/framework.4e7d56ce.js";const f=JSON.parse('{"title":"33如何追踪分布式系统调用链路的问题？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Go 微服务实战 38 讲_文档/(3828) 33  如何追踪分布式系统调用链路的问题？.md","filePath":"posts/backEnd/Go 微服务实战 38 讲_文档/(3828) 33  如何追踪分布式系统调用链路的问题？.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/Go 微服务实战 38 讲_文档/(3828) 33  如何追踪分布式系统调用链路的问题？.md"},l=r("",17),g=r("",13),_=a("p",null,"Trace 树",-1),d=a("p",null,"对于每个 Trace 树，Trace 都要定义一个全局唯一的 TraceID，在这个跟踪中的所有 Span 都将获取到这个TraceID。每个 Span 都有一个 ParentID 和它自己的 SpanID。上面图中 Frontend Request 调用的 ParentID 为空，SpanID 为 1；然后 Backend Call 的 ParentID 为 1，SpanID 为 2；Backend DoSomething 调用的 ParentID 也为 1，SpanID 为 3，其内部还有两个调用，Helper Call 的 ParentID 为 3，SpanID 为 4，以此类推。",-1),h=a("p",null,[a("strong",null,"Span 表示一个服务调用的开始和结束时间，即执行的时间段"),e("。分布式链路追踪组件记录了 Span 的名称以及每个 SpanID 的 ParentID，如果一个 Span 没有 ParentID 则被称为 Root Span，当前节点的 ParentID 即为调用链路上游的 SpanID，所有的 Span 都属于一个特定的 Trace，共用一个 TraceID。")],-1),S=a("h3",{id:"小结",tabindex:"-1"},[e("小结 "),a("a",{class:"header-anchor",href:"#小结","aria-label":'Permalink to "小结"'},"​")],-1),T=a("p",null,"分布式链路追踪组件主要用来追踪分布式系统调用链路的问题。",-1),u=a("p",null,"本课时我们主要介绍了分布式链路追踪组件产生的背景，以及分布式链路追踪的相关概念。分布式链路追踪组件对于快速解决线上问题、发现性能瓶颈并优化分布式系统的性能、合理部署服务器资源具有重要的作用。在接下来的课时中，我们将具体介绍几种业界流行的分布式链路追踪组件，并选择其中的一款进行实践。",-1),m=a("p",null,"关于分布式链路追踪，你有什么经验和踩坑的经历呢？欢迎你在留言区和我分享。",-1);function D(I,P,b,C,k,q){const t=p("Image");return i(),s("div",null,[l,n(t,{alt:"image (4).png",src:"https://s0.lgstatic.com/i/image/M00/5E/73/Ciqc1F-GvOSAV_BRAAEKN28KEAQ070.png"}),e(),g,n(t,{alt:"image (5).png",src:"https://s0.lgstatic.com/i/image/M00/5E/7F/CgqCHl-GvPCASsTBAACuOCx60p8798.png"}),e(),_,d,h,S,T,u,m])}const A=o(c,[["render",D]]);export{f as __pageData,A as default};
