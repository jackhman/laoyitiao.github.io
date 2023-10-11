import{_ as o,D as s,o as l,g as n,J as a,h as e,Q as d,m as t}from"./chunks/framework.f67d7268.js";const W=JSON.parse('{"title":"01核心概念：etcd到底是一款什么样的组件？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/etcd 原理与实践_文档/(6395) 01  核心概念：etcd 到底是一款什么样的组件？.md","filePath":"posts/backEnd/etcd 原理与实践_文档/(6395) 01  核心概念：etcd 到底是一款什么样的组件？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/etcd 原理与实践_文档/(6395) 01  核心概念：etcd 到底是一款什么样的组件？.md"},p=d("",14),i=t("p",null,"从定义上你也可以发现，etcd 归根结底是一个存储组件，且可以实现配置共享和服务发现。",-1),_=t("p",null,[e("在分布式系统中，各种服务配置信息的管理共享和服务发现是一个很基本也是很重要的问题，无论你调用服务还是调度容器，都需要知道对应的服务实例和容器节点地址信息。etcd 就是这样一款"),t("strong",null,"实现了元数据信息可靠存储的组件"),e("。")],-1),h=t("p",null,[t("strong",null,"etcd 可集中管理配置信息"),e("。服务端将配置信息存储于 etcd，客户端通过 etcd 得到服务配置信息，etcd 监听配置信息的改变，发现改变通知客户端。")],-1),g=t("p",null,"而 etcd 满足 CAP 理论中的 CP（一致性和分区容错性） 指标，由此我们知道，etcd 解决了分布式系统中一致性存储的问题。",-1),u=t("h3",{id:"etcd-中常用的术语",tabindex:"-1"},[e("etcd 中常用的术语 "),t("a",{class:"header-anchor",href:"#etcd-中常用的术语","aria-label":'Permalink to "etcd 中常用的术语"'},"​")],-1),A=t("p",null,"为了我们接下来更好地学习 etcd，我在这里给你列举了常用的 etcd 术语，尽快熟悉它们也会对接下来的学习有所助益。",-1),m=d("",13),C=t("p",null,"消息发布与订阅流程图",-1),P=t("p",null,"通过构建 etcd 消息中间件，服务提供者发布对应主题的消息，消费者则订阅他们关心的主题，一旦对应的主题有消息发布，就会产生订阅事件，消息中间件就会通知该主题所有的订阅者。",-1),f=t("ul",null,[t("li",null,[t("strong",null,"分布式锁")])],-1),b=t("p",null,"分布式系统中涉及多个服务实例，存在跨进程之间资源调用，对于资源的协调分配，单体架构中的锁已经无法满足需要，需要引入分布式锁的概念。etcd 基于 Raft 算法，实现分布式集群的一致性，存储到 etcd 集群中的值必然是全局一致的，因此基于 etcd 很容易实现分布式锁。",-1),k=t("h3",{id:"etcd-的核心架构",tabindex:"-1"},[e("etcd 的核心架构 "),t("a",{class:"header-anchor",href:"#etcd-的核心架构","aria-label":'Permalink to "etcd 的核心架构"'},"​")],-1),V=t("p",null,"etcd 作为一个如此重要的部件，我们只有深入理解其架构设计才能更好地学习。下面还是先来看看 etcd 总体的架构图。",-1),T=d("",11),q=t("p",null,"下一讲我将开始讲解 etcd 的安装部署，手把手教你玩转 etcd 搭建。",-1),S=t("p",null,"在学习今天的内容之前，你有没有使用过 etcd，你理解的 etcd 功能是什么样的？欢迎你在留言区和我分享。",-1),R=t("hr",null,null,-1),v=t("p",null,"[",-1),x=t("p",null,[e("]("),t("a",{href:"https://shenceyun.lagou.com/t/Mka",target:"_blank",rel:"noreferrer"},"https://shenceyun.lagou.com/t/Mka"),e(")")],-1),I=t("p",null,[t("a",{href:"https://shenceyun.lagou.com/t/Mka",target:"_blank",rel:"noreferrer"},"拉勾背书内推 + 硬核实战技术干货，帮助每位 Java 工程师达到阿里 P7 技术能力。点此链接，快来领取！")],-1);function M(D,N,B,E,y,K){const c=s("Image");return l(),n("div",null,[p,a(c,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image2/M01/0A/30/CgpVE2ARCbqAU6OoAADfCRp3xrM594.png"}),e(),i,_,h,g,u,A,a(c,{alt:"Lark20210127-143306.png",src:"https://s0.lgstatic.com/i/image/M00/92/44/CgqCHmARCcmANlKJAAHkVwh99Nk525.png"}),e(),m,a(c,{alt:"Lark20210127-143312.png",src:"https://s0.lgstatic.com/i/image/M00/92/44/CgqCHmARCdyAckB8AADPPIJvk8M166.png"}),e(),C,P,f,b,k,V,a(c,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/92/39/Ciqc1GARCeeAadU3AAAioFsPKBs142.png"}),e(),T,a(c,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image2/M01/0A/30/CgpVE2ARCfKAXv9_AAHI9IPYpzA635.png"}),e(),q,S,R,v,a(c,{alt:"java_高薪训练营.png",src:"https://s0.lgstatic.com/i/image/M00/8B/BD/Ciqc1F_gEFiAcnCNAAhXSgFweBY589.png"}),e(),x,I])}const H=o(r,[["render",M]]);export{W as __pageData,H as default};
