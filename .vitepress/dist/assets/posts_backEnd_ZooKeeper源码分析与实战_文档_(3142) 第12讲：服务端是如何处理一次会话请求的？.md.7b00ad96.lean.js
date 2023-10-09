import{_ as p,j as l,o as t,h as r,k as o,f as e,s,Q as n}from"./chunks/framework.d3daa342.js";const k=JSON.parse('{"title":"第12讲：服务端是如何处理一次会话请求的？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/ZooKeeper源码分析与实战_文档/(3142) 第12讲：服务端是如何处理一次会话请求的？.md","filePath":"posts/backEnd/ZooKeeper源码分析与实战_文档/(3142) 第12讲：服务端是如何处理一次会话请求的？.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/ZooKeeper源码分析与实战_文档/(3142) 第12讲：服务端是如何处理一次会话请求的？.md"},i=s("h1",{id:"第12讲-服务端是如何处理一次会话请求的",tabindex:"-1"},[e("第12讲：服务端是如何处理一次会话请求的？ "),s("a",{class:"header-anchor",href:"#第12讲-服务端是如何处理一次会话请求的","aria-label":'Permalink to "第12讲：服务端是如何处理一次会话请求的？"'},"​")],-1),E=s("p",null,"在进阶篇中，我们主要学习的内容是 ZooKeeper 客户端与服务器端的通信机制，以及会话的底层实现原理。而本课时是 ZooKeeper 会话相关知识点的最后一节课，我们将重点讲解 ZooKeeper 服务端在收到一次会话请求时其内部的处理过程。",-1),y=s("h3",{id:"服务端处理过程",tabindex:"-1"},[e("服务端处理过程 "),s("a",{class:"header-anchor",href:"#服务端处理过程","aria-label":'Permalink to "服务端处理过程"'},"​")],-1),u=s("p",null,"在之前的课程中，我们提过会话的创建过程，当客户端需要和 ZooKeeper 服务端进行相互协调通信时，首先要建立该客户端与服务端的连接会话，在会话成功创建后，ZooKeeper 服务端就可以接收来自客户端的请求操作了。",-1),d=s("p",null,"ZooKeeper 服务端在处理一次客户端发起的会话请求时，所采用的处理过程很像是一条工厂中的流水生产线。比如在一个毛绒玩具加工厂中，一条生产线上的工人可能只负责给玩具上色这一个具体的工作。",-1),q=n("",12),h=n("",15);function P(_,m,R,C,g,F){const a=l("Image");return t(),r("div",null,[i,E,y,u,d,o(a,{alt:"image (8).png",src:"https://s0.lgstatic.com/i/image/M00/1E/0A/CgqCHl7jHYCAACUBAABVIt47Rxg107.png"}),e(),q,o(a,{alt:"image (9).png",src:"https://s0.lgstatic.com/i/image/M00/1D/FE/Ciqc1F7jHaCAXeh5AAAg5bIKooo221.png"}),e(),h])}const v=p(c,[["render",P]]);export{k as __pageData,v as default};
