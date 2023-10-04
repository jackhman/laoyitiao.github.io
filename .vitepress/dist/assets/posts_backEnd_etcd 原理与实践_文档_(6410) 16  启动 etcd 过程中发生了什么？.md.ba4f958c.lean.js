import{_ as o,j as e,o as t,g as r,k as a,h as l,s,Q as p}from"./chunks/framework.e0c66c3f.js";const b=JSON.parse('{"title":"etcd Server 启动总览 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/etcd 原理与实践_文档/(6410) 16  启动 etcd 过程中发生了什么？.md","filePath":"posts/backEnd/etcd 原理与实践_文档/(6410) 16  启动 etcd 过程中发生了什么？.md","lastUpdated":1696338709000}'),c={name:"posts/backEnd/etcd 原理与实践_文档/(6410) 16  启动 etcd 过程中发生了什么？.md"},E=s("p",null,"etcd 服务端是一个综合的模块，整合了我们前面所讲的 Raft、存储、WAL 等功能。etcd 服务端启动时，需要经过初始化创建 etcdServer 实例，接着依次启动 Raft 和 rafthttp 模块，最后启动 etcd 服务端，实现集群内部通信，此时就可以处理客户端的请求了。这一讲我们就结合源码介绍 etcd 服务端启动的具体实现。",-1),y=s("h3",{id:"etcd-server-启动总览",tabindex:"-1"},[l("etcd Server 启动总览 "),s("a",{class:"header-anchor",href:"#etcd-server-启动总览","aria-label":'Permalink to "etcd Server 启动总览"'},"​")],-1),i=s("p",null,"我们使用分层的方式来描绘 etcd 的架构，etcd 可分为 Client 客户端层、API 网络接口层、etcd Raft 算法层、逻辑层和 etcd 存储层。如下图所示：",-1),d=p("",5),F=p("",66),f=s("p",null,"学习完这一讲，我想给大家留一个问题，你经历过哪些 etcd 启动时的异常场景，又是如何解决的它们呢？欢迎你在留言区和我分享你的经历。下一讲，我们将介绍服务端处理客户端请求的步骤和原理。",-1);function g(C,A,D,u,h,v){const n=e("Image");return t(),r("div",null,[E,y,i,a(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M01/1F/69/CioPOWBR2CSAJizEAAA4DvAJkFg782.png"}),l(),d,a(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/1F/6C/Cgp9HWBR2C-AQGgaAABQ5Am9QKc164.png"}),l(),F,a(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M01/1F/69/CioPOWBR2EmAOOQyAAFlIjNTnK0497.png"}),f])}const B=o(c,[["render",g]]);export{b as __pageData,B as default};
