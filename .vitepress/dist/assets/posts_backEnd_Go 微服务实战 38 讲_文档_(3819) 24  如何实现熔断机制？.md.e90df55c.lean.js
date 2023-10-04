import{_ as o,j as e,o as t,g as r,k as p,h as s,s as n,Q as l}from"./chunks/framework.e0c66c3f.js";const b=JSON.parse('{"title":"分布式系统中的服务雪崩 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Go 微服务实战 38 讲_文档/(3819) 24  如何实现熔断机制？.md","filePath":"posts/backEnd/Go 微服务实战 38 讲_文档/(3819) 24  如何实现熔断机制？.md","lastUpdated":1696338709000}'),c={name:"posts/backEnd/Go 微服务实战 38 讲_文档/(3819) 24  如何实现熔断机制？.md"},E=n("p",null,[s("在第 22 课时中，我们已经了解了熔断的基本原理和断路器在服务高可用架构中的重要性。那本课时我们继续往下剖析，来详细介绍熔断主要预防的"),n("strong",null,"服务雪崩现象的形成和危害"),s(" ，以及推荐使用的断路器中间件"),n("strong",null,"Hystrix 的使用方法和相关原理"),s("。")],-1),y=n("h3",{id:"分布式系统中的服务雪崩",tabindex:"-1"},[s("分布式系统中的服务雪崩 "),n("a",{class:"header-anchor",href:"#分布式系统中的服务雪崩","aria-label":'Permalink to "分布式系统中的服务雪崩"'},"​")],-1),i=n("p",null,[s("在分布式系统中，由于业务上的划分，一次完整的请求可能需要借助好几个不同的模块协力完成，在微服务架构中就是需要多个服务实例协力完成。请求会在这些服务实例中传递，服务之间的调用会产生新的请求，它们共同组成一次"),n("strong",null,"服务调用链"),s("，关系如下图所示：")],-1),u=n("p",null,"微服务服务调用链示意图",-1),d=n("p",null,"通过该时序图，我们可以看到：客户端（Client）发起了一次请求 Request1，网关（Gateway）在接收到请求后将它转发（标记为 Request2）给 Service-A；由于这次请求涉及 Service-B 中的数据，所以 Service-A 又向 Service-B 发起了一次 Request3 获取对应的数据；处理结束后，将结果返回给网关，由网关将结果返回给客户端。这里的 Request2 和 Request3 就共同组成了这次调用的调用链。",-1),F=n("p",null,[s("至于服务雪崩，我们在第 22 课时曾讲解过，"),n("strong",null,"服务雪崩是指当调用链的某个环节（特别是服务提供方服务）不可用时，将会导致其上游环节不可用，并最终将这种影响扩大到整个系统中，导致整个系统的不可用"),s("。如下图所示：")],-1),q=l("",6),h=l("",13),m=l("",17),C=l("",6);function g(_,A,v,D,B,x){const a=e("Image");return t(),r("div",null,[E,y,i,p(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/4F/F7/CgqCHl9hoYyAd7J7AAAu6XVpTzE568.png"}),s(),u,d,F,p(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/4F/F7/CgqCHl9hoZqAaUmRAABYO2_cRvk414.png"}),s(),q,p(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/4F/EC/Ciqc1F9hoaiANJYgAAA_xMaFiWc181.png"}),s(),h,p(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/4F/F8/CgqCHl9hobqAJ0fBAABU7XC4gtY397.png"}),s(),m,p(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/4F/EC/Ciqc1F9hodmASLFTAADzDRuBp1g798.png"}),s(),C])}const f=o(c,[["render",g]]);export{b as __pageData,f as default};
