import{_ as p,j as l,o as c,g as o,k as n,h as s,Q as t,s as a}from"./chunks/framework.4e7d56ce.js";const I=JSON.parse('{"title":"08纵览全局：etcd的架构是什么样的？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/etcd 原理与实践_文档/(6402) 08  纵览全局：etcd 的架构是什么样的？.md","filePath":"posts/backEnd/etcd 原理与实践_文档/(6402) 08  纵览全局：etcd 的架构是什么样的？.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/etcd 原理与实践_文档/(6402) 08  纵览全局：etcd 的架构是什么样的？.md"},i=t("",7),d=a("p",null,[s("etcd 核心的模块有 lease、mvcc、raft、etcdserver，其余都是辅助的功能。其中 "),a("strong",null,"etcdserver 是其他模块的整合"),s("。")],-1),E=a("h3",{id:"etcd-整体架构",tabindex:"-1"},[s("etcd 整体架构 "),a("a",{class:"header-anchor",href:"#etcd-整体架构","aria-label":'Permalink to "etcd 整体架构"'},"​")],-1),_=a("p",null,"接下来，我们看看etcd 的整体架构。我在上面的etcd 项目总览中提到了 etcd 中核心的几个模块，我们使用分层的方式来描绘 etcd 的架构图，如下所示：",-1),g=t("",6),y=t("",5),u=t("",3),h=t("",7),f=a("p",null,"本课时通过总览 etcd 的架构，将其重要的模块标识出来，如 etcd raft 模块、WAL、applierV3、Quota 等模块，也为我们下面具体介绍 etcd 的原理做一个铺垫。",-1),A=a("p",null,"学习完本课时，从上述 etcd 各个模块的交互过程，你知道有哪些方式保证了 etcd 写请求保证分布式一致性？欢迎你在留言区和我分享你的学习收获。",-1),m=a("p",null,"下一讲，我们将开始学习 etcd 的 API 接口层，看看 etcd 定义了哪些 API 接口并进行实践。",-1);function v(S,T,b,C,P,V){const e=l("Image");return c(),o("div",null,[i,n(e,{alt:"2021218-16644.png",src:"https://s0.lgstatic.com/i/image6/M00/04/BD/CioPOWAuMueATk02AAE0xMg7j9w742.png"}),s(),d,E,_,n(e,{alt:"2021218-16649.png",src:"https://s0.lgstatic.com/i/image6/M00/04/C0/Cgp9HWAuMvWARHxgAACMKTNJgfw845.png"}),s(),g,n(e,{alt:"2021222-135212.png",src:"https://s0.lgstatic.com/i/image6/M00/07/3C/Cgp9HWAzS5qAINI_AAE7hCmxS4Q375.png"}),s(),y,n(e,{alt:"2021218-16654.png",src:"https://s0.lgstatic.com/i/image6/M01/04/BD/CioPOWAuMxqAE23xAAG11qxl4bc031.png"}),s(),u,n(e,{alt:"2021218-16657.png",src:"https://s0.lgstatic.com/i/image6/M01/04/BD/CioPOWAuMyOAayYSAAIQ_bDBEtQ032.png"}),s(),h,n(e,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M01/04/C0/Cgp9HWAuM0GALYYpAAE6O5BEmoM273.png"}),s(),f,A,m])}const R=p(r,[["render",v]]);export{I as __pageData,R as default};
