import{_ as n,D as l,o as t,g as r,J as e,h as a,Q as p,m as s}from"./chunks/framework.f67d7268.js";const D=JSON.parse('{"title":"第24讲：ZooKeeper在Kafka和Dubbo中的工业级实现案例分析","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/ZooKeeper源码分析与实战_文档/(3154) 第24讲：ZooKeeper 在 Kafka 和 Dubbo 中的工业级实现案例分析.md","filePath":"posts/backEnd/ZooKeeper源码分析与实战_文档/(3154) 第24讲：ZooKeeper 在 Kafka 和 Dubbo 中的工业级实现案例分析.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/ZooKeeper源码分析与实战_文档/(3154) 第24讲：ZooKeeper 在 Kafka 和 Dubbo 中的工业级实现案例分析.md"},i=p("",8),E=s("h4",{id:"zookeeper-注册中心",tabindex:"-1"},[a("ZooKeeper 注册中心 "),s("a",{class:"header-anchor",href:"#zookeeper-注册中心","aria-label":'Permalink to "ZooKeeper 注册中心"'},"​")],-1),y=s("p",null,[a("通过上面的介绍，我们不难发现在整个 Dubbo 框架的实现过程中，"),s("strong",null,"注册中心是其中最为关键的一点，它保证了整个 PRC 过程中服务对外的透明性"),a("。而 Dubbo 的注册中心也是通过 ZooKeeper 来实现的。")],-1),d=s("p",null,"如下图所示，在整个 Dubbo 服务的启动过程中，服务提供者会在启动时向 /dubbo/com.foo.BarService/providers 目录写入自己的 URL 地址，这个操作可以看作是一个 ZooKeeper 客户端在 ZooKeeper 服务器的数据模型上创建一个数据节点。服务消费者在启动时订阅 /dubbo/com.foo.BarService/providers 目录下的提供者 URL 地址，并向 /dubbo/com.foo.BarService/consumers 目录写入自己的 URL 地址。该操作是通过 ZooKeeper 服务器在 /consumers 节点路径下创建一个子数据节点，然后再在请求会话中发起对 /providers 节点的 watch 监控。",-1),g=s("h3",{id:"kafka-与-zookeeper",tabindex:"-1"},[a("Kafka 与 ZooKeeper "),s("a",{class:"header-anchor",href:"#kafka-与-zookeeper","aria-label":'Permalink to "Kafka 与 ZooKeeper"'},"​")],-1),k=s("p",null,"接下来我们再看一下 ZooKeeper 在另一个开源框架 Kafka 中的应用。Kafka 是一种高吞吐量的分布式发布订阅消息系统，它可以处理消费者在网站中的所有动作流数据，经常用来解决大量数据日志的实时收集以及 Web 网站上用户 PV 数统计和访问记录等。我们可以把 Kafka 看作是一个数据的高速公路，利用这条公路，数据可以低延迟、高效地从一个地点到达另一个地点。",-1),u=s("h4",{id:"kafka-实现过程",tabindex:"-1"},[a("Kafka 实现过程 "),s("a",{class:"header-anchor",href:"#kafka-实现过程","aria-label":'Permalink to "Kafka 实现过程"'},"​")],-1),h=s("p",null,"在介绍 ZooKeeper 在 Kafka 中如何使用之前，我们先来简单地了解一下 Kafka 的一些关键概念，以便之后的学习。如下图所示，整个 Kafka 的系统架构主要由 Broker、Topic、Partition、Producer、Consumer、Consumer Group 这几个核心概念组成，下面我们来分别进行介绍。",-1),b=p("",13),K=p("",22);function _(f,C,Z,m,v,z){const o=l("Image");return t(),r("div",null,[i,e(o,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/37/B6/Ciqc1F8ah0qASFC-AAELMLv7sPQ672.png"}),a(),E,y,d,e(o,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/37/B6/Ciqc1F8ah1WAW9KEAAIW9hNPw3Y360.png"}),a(),g,k,e(o,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/37/C1/CgqCHl8ah16Ac117AAKJOqYuJ28381.png"}),a(),u,h,e(o,{alt:"4.png",src:"https://s0.lgstatic.com/i/image/M00/37/B6/Ciqc1F8ah26APMkMAAH5xDJ2qz0508.png"}),a(),b,e(o,{alt:"5.png",src:"https://s0.lgstatic.com/i/image/M00/37/C1/CgqCHl8ah3iASZ2-AAEGN0oprwQ428.png"}),a(),K])}const B=n(c,[["render",_]]);export{D as __pageData,B as default};
