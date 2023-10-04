import{_ as o,j as e,o as t,g as c,k as l,h as n,Q as p,s}from"./chunks/framework.e0c66c3f.js";const b=JSON.parse('{"title":"Consul 集群 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Go 微服务实战 38 讲_文档/(3811) 13  案例：如何基于 Conul 给微服务添加服务注册与发现？.md","filePath":"posts/backEnd/Go 微服务实战 38 讲_文档/(3811) 13  案例：如何基于 Conul 给微服务添加服务注册与发现？.md","lastUpdated":1696338709000}'),r={name:"posts/backEnd/Go 微服务实战 38 讲_文档/(3811) 13  案例：如何基于 Conul 给微服务添加服务注册与发现？.md"},E=p("",7),y=p("",14),i=p("",7),F=p("",23),u=s("p",null,"register 服务注册到 Consul",-1),C=s("br",null,null,-1),d=s("p",null,"进入到 register 服务所在的 Pod，通过 curl 访问 /discovery/name?serviceName={serviceName} 即可根据服务名获取注册到 Consul 中的服务实例信息列表。",-1),A=s("h3",{id:"小结",tabindex:"-1"},[n("小结 "),s("a",{class:"header-anchor",href:"#小结","aria-label":'Permalink to "小结"'},"​")],-1),D=s("p",null,[s("strong",null,"在微服务架构中，服务注册与发现能够管理集群中大量动态变化的服务实例，有效提高服务治理的效率。")],-1),v=s("p",null,"本课时我们主要介绍了如何结合 Consul 给 Go 微服务整合服务注册与发现能力。首先。我们借助 Kubernetes 搭建了具备 3 个 Consul Server 的 Consul 集群；接着，我们又基于 Consul Client 提供的 HTTP API 完成了 Go 微服务与 Consul 的服务注册与发现。",-1),g=s("p",null,"希望通过本课时能够加深你对 Consul 的理解，并掌握如何为 Go 微服务添加服务注册与发现能力，在下一课时我们将介绍更多关于 Go 微服务服务注册与发现的实践，比如基于 Service Mesh 进行服务注册与发现等。",-1),m=s("p",null,"最后，关于 Consul 和 Go 微服务的服务注册与发现，你有什么其他的见解？欢迎在评论区与我分享。",-1);function h(q,B,P,S,_,f){const a=e("Image");return t(),c("div",null,[E,l(a,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/40/CB/Ciqc1F8zngqAbS-SAAF6iFt7jEw242.png"}),n(),y,l(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/40/CB/Ciqc1F8znluACJ3GAAEJfZ-XRZ8007.png"}),n(),i,l(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/40/D7/CgqCHl8znnKARYXJAAEo3aSRZ1o062.png"}),n(),F,l(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/40/D7/CgqCHl8znpOAUpWzAAHjz85ST4g127.png"}),n(),u,C,d,A,D,v,g,m])}const T=o(r,[["render",h]]);export{b as __pageData,T as default};
