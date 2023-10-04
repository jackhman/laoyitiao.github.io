import{_ as l,j as o,o as e,g as t,k as p,s,h as n,Q as c}from"./chunks/framework.e0c66c3f.js";const B=JSON.parse('{"title":"会话管理策略 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/ZooKeeper源码分析与实战_文档/(3141) 第11讲：分桶策略：如何实现高效的会话管理？.md","filePath":"posts/backEnd/ZooKeeper源码分析与实战_文档/(3141) 第11讲：分桶策略：如何实现高效的会话管理？.md","lastUpdated":1696338709000}'),r={name:"posts/backEnd/ZooKeeper源码分析与实战_文档/(3141) 第11讲：分桶策略：如何实现高效的会话管理？.md"},E=s("p",null,"前几个课时我们一直围绕会话这个主题进行讲解，今天这节课我们依然还要学习会话的相关知识，本节课我们从 ZooKeeper 会话管理的角度来深入探索一下 ZooKeeper 会话管理的方式。",-1),y=s("p",null,"我们知道 ZooKeeper 作为分布式系统的核心组件，在一个分布式系统运行环境中经常要处理大量的会话请求，而 ZooKeeper 之所以能够快速响应客户端操作，这与它自身的会话管理策略密不可分。",-1),i=s("h3",{id:"会话管理策略",tabindex:"-1"},[n("会话管理策略 "),s("a",{class:"header-anchor",href:"#会话管理策略","aria-label":'Permalink to "会话管理策略"'},"​")],-1),u=s("p",null,[n("通过前面的学习，我们知道在 ZooKeeper 中为了保证一个会话的存活状态，客户端需要向服务器周期性地发送心跳信息。而客户端所发送的心跳信息可以是一个 ping 请求，也可以是一个普通的业务请求。ZooKeeper 服务端接收请求后，会更新会话的过期时间，来保证会话的存活状态。从中也能看出，"),s("strong",null,"在 ZooKeeper 的会话管理中，最主要的工作就是管理会话的过期时间。")],-1),d=s("p",null,'ZooKeeper 中采用了独特的会话管理方式来管理会话的过期时间，网络上也给这种方式起了一个比较形象的名字："分桶策略"。我将结合下图给你讲解"分桶策略"的原理。如下图所示，在 ZooKeeper 中，会话将按照不同的时间间隔进行划分，超时时间相近的会话将被放在同一个间隔区间中，这种方式避免了 ZooKeeper 对每一个会话进行检查，而是采用分批次的方式管理会话。这就降低了会话管理的难度，因为每次小批量的处理会话过期也提高了会话处理的效率。',-1),F=s("p",null,"通过上面的介绍，我们对 ZooKeeper 中的会话管理策略有了一个比较形象的理解。而为了能够在日常开发中使用好 ZooKeeper，面对高并发的客户端请求能够开发出更加高效稳定的服务，根据服务器日志判断客户端与服务端的会话异常等。下面我们从技术角度去说明 ZooKeeper 会话管理的策略，进一步加强对会话管理的理解。",-1),g=s("h3",{id:"底层实现",tabindex:"-1"},[n("底层实现 "),s("a",{class:"header-anchor",href:"#底层实现","aria-label":'Permalink to "底层实现"'},"​")],-1),_=s("p",null,"说到 ZooKeeper 底层实现的原理，核心的一点就是过期队列这个数据结构。所有会话过期的相关操作都是围绕这个队列进行的。可以说 ZooKeeper 底层就是采用这个队列结构来管理会话过期的。",-1),h=s("p",null,"而在讲解会话过期队列之前，我们首先要知道什么是 bucket。简单来说，一个会话过期队列是由若干个 bucket 组成的。而 bucket 是一个按照时间划分的区间。在 ZooKeeper 中，通常以 expirationInterval 为单位进行时间区间的划分，它是 ZooKeeper 分桶策略中用于划分时间区间的最小单位。",-1),v=s("p",null,"在 ZooKeeper 中，一个过期队列由不同的 bucket 组成。每个 bucket 中存放了在某一时间内过期的会话。将会话按照不同的过期时间段分别维护到过期队列之后，在 ZooKeeper 服务运行的过程中，具体的执行过程如下图所示。首先，ZooKeeper 服务会开启一个线程专门用来检索过期队列，找出要过期的 bucket，而 ZooKeeper 每次只会让一个 bucket 的会话过期，每当要进行会话过期操作时，ZooKeeper 会唤醒一个处于休眠状态的线程进行会话过期操作，之后会按照上面介绍的操作检索过期队列，取出过期的会话后会执行过期操作。",-1),m=c("",13);function C(A,b,Z,K,D,k){const a=o("Image");return e(),t("div",null,[E,y,i,u,d,p(a,{alt:"image (9).png",src:"https://s0.lgstatic.com/i/image/M00/1C/78/Ciqc1F7gfSCAGDAIAABZCSkfyB0372.png"}),F,g,_,h,v,p(a,{alt:"image (10).png",src:"https://s0.lgstatic.com/i/image/M00/1C/84/CgqCHl7gfSqADJ72AAA2hG45T-M370.png"}),m])}const I=l(r,[["render",C]]);export{B as __pageData,I as default};
