import{_ as o,j as e,o as t,g as c,k as n,Q as l,s,h as p}from"./chunks/framework.e0c66c3f.js";const q=JSON.parse('{"title":"Watch 机制是如何实现的 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/ZooKeeper源码分析与实战_文档/(3132) 第02讲：发布订阅模式：如何使用 Watch 机制实现分布式通知.md","filePath":"posts/backEnd/ZooKeeper源码分析与实战_文档/(3132) 第02讲：发布订阅模式：如何使用 Watch 机制实现分布式通知.md","lastUpdated":1696338709000}'),r={name:"posts/backEnd/ZooKeeper源码分析与实战_文档/(3132) 第02讲：发布订阅模式：如何使用 Watch 机制实现分布式通知.md"},E=l("",12),y=s("p",null,"上图中列出了客户端在不同会话状态下，相应的在服务器节点所能支持的事件类型。例如在客户端连接服务端的时候，可以对数据节点的创建、删除、数据变更、子节点的更新等操作进行监控。",-1),i=s("p",null,"现在我们已经从应用层的角度了解了 ZooKeeper 中的 Watch 机制，而学习 ZooKeeper 过程中一个大问题就是入门容易精通难，像上边我们通过几个简单的 API 调用就可以对服务器的节点状态变更进行监控，但是在实际生产环境中我们会遇到很多意想不到的问题，要想解决好这些问题就要深入理解 Watch 的底层实现机制。",-1),h=s("h3",{id:"watch-机制的底层原理",tabindex:"-1"},[p("Watch 机制的底层原理 "),s("a",{class:"header-anchor",href:"#watch-机制的底层原理","aria-label":'Permalink to "Watch 机制的底层原理"'},"​")],-1),d=s("p",null,"现在我们就深入底层了解其背后的实现原理。与上个课时直接通过底层代码的调用过程来分析不同，在 Watch 底层实现的分析阶段，由于 Watch 机制涉及了客户端和服务端的多个函数和操作节点，单单按照程序执行流程分析跳跃性对整体实现机制的理解难度大，这也是我在学习 Watch 这部分底层实现遇到的问题。为了更好地阐述 Watch 机制，我们另辟蹊径，从设计模式角度出发来分析其底层实现：",-1),F=s("p",null,'最初我在开始学习 Watch 机制的时候，它给我的第一印象是，其结构很像设计模式中的"观察者模式"，一个对象或者数据节点可能会被多个客户端监控，当对应事件被触发时，会通知这些对象或客户端。我们可以将 Watch 机制理解为是分布式环境下的观察者模式。所以接下来我们就以观察者模式的角度点来看看 ZooKeeper 底层 Watch 是如何实现的。',-1),g=l("",42),u=s("p",null,[p("我们使用 Watch 机制实现了一个分布式环境下的配置管理功能，通过对 ZooKeeper 服务器节点添加数据变更事件，实现当数据库配置项信息变更后，集群中的各个客户端能接收到该变更事件的通知，并获取最新的配置信息。"),s("strong",null,"要注意一点是，我们提到 Watch 具有一次性，所以当我们获得服务器通知后要再次添加 Watch 事件。")],-1),v=s("h3",{id:"结束语",tabindex:"-1"},[p("结束语 "),s("a",{class:"header-anchor",href:"#结束语","aria-label":'Permalink to "结束语"'},"​")],-1),W=s("p",null,"本课时我们学习了 ZooKeeper 中非常重要的基础知识------Watch 监控机制。详细分析了 ZooKeeper 在处理 Watch 事件的底层实现，并通过我们掌握的知识实现了一个集群环境下的配置管理功能。",-1),D=s("p",null,'现在我有一个思考题留给你："当服务端某一节点发生数据变更操作时，所有曾经设置了该节点监控事件的客户端都会收到服务器的通知吗？答案是否定的，通过本课时对 ZooKeeper 内部实现机制的解析可以知道，Watch 事件的触发机制取决于会话的连接状态和客户端注册事件的类型，所以当客户端会话状态或数据节点发生改变时，都会触发对应的 Watch 事件。',-1);function A(C,b,w,k,_,B){const a=e("Image");return t(),c("div",null,[E,n(a,{alt:"image.png",src:"https://s0.lgstatic.com/i/image/M00/05/28/Ciqc1F61ILaAb7sQAAC6T3wMHDU651.png"}),y,i,h,d,n(a,{alt:"image (1).png",src:"https://s0.lgstatic.com/i/image/M00/05/28/Ciqc1F61IL-AEQuUAABdpaAsy2k628.png"}),F,n(a,{alt:"image (2).png",src:"https://s0.lgstatic.com/i/image/M00/05/28/Ciqc1F61IMWAbWW9AABzXk9xuOs953.png"}),g,n(a,{alt:"image (3).png",src:"https://s0.lgstatic.com/i/image/M00/05/28/CgqCHl61INaAJeAEAAA8lZ8lpbE688.png"}),u,v,W,D])}const P=o(r,[["render",A]]);export{q as __pageData,P as default};
