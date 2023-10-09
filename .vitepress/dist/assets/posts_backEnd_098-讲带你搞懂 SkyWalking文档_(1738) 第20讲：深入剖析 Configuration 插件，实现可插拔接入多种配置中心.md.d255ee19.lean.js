import{_ as l,j as p,o as r,h as t,k as n,f as e,s,Q as o}from"./chunks/framework.d3daa342.js";const V=JSON.parse('{"title":"第20讲：深入剖析Configuration插件，实现可插拔接入多种配置中心","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1738) 第20讲：深入剖析 Configuration 插件，实现可插拔接入多种配置中心.md","filePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1738) 第20讲：深入剖析 Configuration 插件，实现可插拔接入多种配置中心.md","lastUpdated":1696682708000}'),i={name:"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1738) 第20讲：深入剖析 Configuration 插件，实现可插拔接入多种配置中心.md"},c=s("h1",{id:"第20讲-深入剖析configuration插件-实现可插拔接入多种配置中心",tabindex:"-1"},[e("第20讲：深入剖析Configuration插件，实现可插拔接入多种配置中心 "),s("a",{class:"header-anchor",href:"#第20讲-深入剖析configuration插件-实现可插拔接入多种配置中心","aria-label":'Permalink to "第20讲：深入剖析Configuration插件，实现可插拔接入多种配置中心"'},"​")],-1),y=s("p",null,"在前面的课时中，我们深入介绍了 SkyWalking OAP 服务的核心架构和启动流程，以及 Module、ModuleProvider、Service 等核心接口的功能。SkyWalking OAP 采用了微内核 + 插件的架构，各个插件模块的开发、接入非常方便，只需实现 ModuleDefine 以及 ModuleProvider 即可，然后由微内核通过 SPI 技术扫描加载并实例化使用。",-1),E=s("p",null,"在本课时，将重点介绍 Configuration 模块的基本原理，还会分析依赖 ZooKeeper 作为配置中心的相关插件实现。",-1),g=s("h3",{id:"configuration-api-模块",tabindex:"-1"},[e("configuration-api 模块 "),s("a",{class:"header-anchor",href:"#configuration-api-模块","aria-label":'Permalink to "configuration-api 模块"'},"​")],-1),d=s("p",null,"configuration-api 模块定义了 Configuration 模块的核心功能和扩展框架，位于 server-configuration 模块之中，具体位置如下图所示：",-1),h=s("p",null,"上图可以看到，除了 configuration-api 模块之外，server-configuration 中还有支持各种配置中心的子模块，例如，configuration-zookeeper 依赖 ZooKeeper 管理配置信息，configuration-etcd 依赖 etcd 管理配置信息等。",-1),C=s("p",null,"在默认 application.yml 配置文件中可以看到 Configuration 插件模块的相关配置信息，如下图所示：",-1),u=s("p",null,"首先来看 configuration-api 模块，在其 resource 目录下有两个 SPI 配置文件，分别指定 ModuleDefine 实现类和 ModuleProvider 实现类，如下图所示：",-1),_=o("",5),f=s("p",null,'NoneConfigurationProvider 是 configuration-api 模块中提供的 ModuleProvider 实现类，也是 configuration-api 模块在 SPI 文件中指定的 ModuleProvider 实现类，其 name() 方法返回的 ModuleProvider 名称为 "none"，其余方法都是空实现。',-1),A=s("p",null,"所以，按照 application.yml 的默认配置，OAP 使用的就是 NoneConfigurationProvider，在 OAP 服务启动之后，没有任何监听配置修改的能力。",-1),F=s("h3",{id:"zookeeper-基础速读",tabindex:"-1"},[e("Zookeeper 基础速读 "),s("a",{class:"header-anchor",href:"#zookeeper-基础速读","aria-label":'Permalink to "Zookeeper 基础速读"'},"​")],-1),v=s("p",null,"在开始分析 configuration-zookeeper 模块之前，我们需要先了解一些 ZooKeeper 的基础知识。Apache ZooKeeper 是一个针对分布式系统的、可靠的、可扩展的协调服务，通常作为统一命名服务、统一配置管理、分布式集群管理（注册中心）、分布式锁服务、Leader 选举服务等角色出现。",-1),m=s("h4",{id:"基本概念",tabindex:"-1"},[e("基本概念 "),s("a",{class:"header-anchor",href:"#基本概念","aria-label":'Permalink to "基本概念"'},"​")],-1),k=s("p",null,"ZooKeeper 本身也是一个分布式应用程序，下图展示了 ZooKeeper 集群的核心架构。",-1),Z=s("ul",null,[s("li",null,[s("strong",null,"Client"),e("：分布式应用中的一个节点，通过 ZkClient 或是其他 ZooKeeper 客户端与 ZooKeeper 集群中的一个 Server 实例维持长连接，并定时发送心跳。Client 可以主动查询或操作 ZooKeeper 集群中的数据，也可以在某些 ZooKeeper 节点上添加监听，当被监听的节点发生变化时，会通过长连接通知 Client。")]),s("li",null,[s("strong",null,"Leader 节点"),e("：负责整个 ZooKeeper 集群的写操作，保证集群内事务处理的顺序性。同时，还要负责整个集群中所有 Follower 节点与 Observer 节点的数据同步。")]),s("li",null,[s("strong",null,"Follower 节点"),e("：用于接收 Client 读请求并向 Client 返回结果。Follower 节点并不处理写请求，而是转发到 Leader 节点完成写入操作。Follower 节点还会参与 Leader 节点的选举。")]),s("li",null,[s("strong",null,"Observer"),e("：Observer 节点不会参与 Leader 节点的选举，其他功能与 Follower 节点相同。引入Observer 角色的目的是增加 ZooKeeper 集群读操作的吞吐量，如果单纯依靠增加 Follower 节点，那么 ZooKeeper 集群的写能力会大大降低，因为 ZooKeeper 写数据时需要Leader 将写操作同步给半数以上的 Follower 节点。引入 Observer 节点使得 ZooKeeper 集群在写能力不降低的情况下，大大提升了读操作的吞吐量。")])],-1),P=s("p",null,'下图展示了 ZooKeeper 树型的存储结构。ZooKeeper 节点称为 ZNode 。每个 ZNode 有一个名称标识，并用 "/" 分隔，这与文件系统的目录树一样。ZooKeeper 树中的每个节点可以拥有子节点。',-1),D=o("",3),K=o("",7),W=o("",18),S=s("p",null,"在下一课时介绍 configuration-zookeeper 模块实现时，就会使用到 Apache Curator 的相关内容。",-1),b=s("h3",{id:"基于-zookeeper-的配置管理",tabindex:"-1"},[e("基于 ZooKeeper 的配置管理 "),s("a",{class:"header-anchor",href:"#基于-zookeeper-的配置管理","aria-label":'Permalink to "基于 ZooKeeper 的配置管理"'},"​")],-1),T=s("p",null,"虽然 configuration-api 模块提供的 NoneConfigurationProvider 没有监听配置变更的能力，但却定义了 ConfigWatcherRegister 以及 AbstractConfigurationProvider 两个抽象类，方便依赖其他配置中心的模块进行扩展。",-1),w=s("p",null,"ConfigWatcherRegister 继承了DynamicConfigurationService 接口，如下图所示，依赖 ZooKeeper、Nacos 等配置中心的实现都继承了该抽象类。",-1),L=o("",6),R=o("",9);function B(M,x,I,N,q,z){const a=p("Image");return r(),t("div",null,[c,y,E,g,d,n(a,{alt:"image.png",src:"https://s0.lgstatic.com/i/image/M00/09/D7/CgqCHl688siAJ017AABzT6xvdZs551.png"}),e(),h,C,n(a,{alt:"image (1).png",src:"https://s0.lgstatic.com/i/image/M00/09/D7/CgqCHl688tKAUWu8AApG54vhCNQ135.png"}),e(),u,n(a,{alt:"image (2).png",src:"https://s0.lgstatic.com/i/image/M00/09/D7/CgqCHl688tuAWXXyAAIN0mNeddY662.png"}),e(),_,n(a,{alt:"image (3).png",src:"https://s0.lgstatic.com/i/image/M00/09/D7/CgqCHl688viAJ8OZAABFqb4k60Q765.png"}),e(),f,A,F,v,m,k,n(a,{alt:"image (4).png",src:"https://s0.lgstatic.com/i/image/M00/09/D7/CgqCHl688u-AVrZ3AAHsBQjob44191.png"}),e(),Z,P,n(a,{alt:"image (5).png",src:"https://s0.lgstatic.com/i/image/M00/09/D7/Ciqc1F688wqAJsJtAAHIFtKaGSg850.png"}),e(),D,n(a,{alt:"image (6).png",src:"https://s0.lgstatic.com/i/image/M00/09/D8/Ciqc1F688xKAHcQCAAU-W9Rr--g899.png"}),e(),K,n(a,{alt:"image (7).png",src:"https://s0.lgstatic.com/i/image/M00/09/D8/CgqCHl688x6Ab-hWAAPUPfOGKLE909.png"}),e(),W,n(a,{alt:"sw.png",src:"https://s0.lgstatic.com/i/image/M00/09/D8/CgqCHl6888eAY4NZAADf6Jd0NXg990.png"}),e(),S,b,T,w,n(a,{alt:"ConfigWatcherRegister.png",src:"https://s0.lgstatic.com/i/image/M00/09/D8/Ciqc1F688y-AT0Y0AAGEZhYxBWc264.png"}),e(),L,n(a,{alt:"AbstractConfigurationProvider继承关系.png",src:"https://s0.lgstatic.com/i/image/M00/09/D8/Ciqc1F688zqAE5J_AAGK-TTe0o8616.png"}),e(),R])}const H=l(i,[["render",B]]);export{V as __pageData,H as default};
