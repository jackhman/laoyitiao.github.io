import{_ as l,j as o,o as t,g as r,k as p,h as n,s,Q as e}from"./chunks/framework.4e7d56ce.js";const M=JSON.parse('{"title":"15ZooKeeper注册中心实现，官方推荐注册中心实践","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Dubbo源码解读与实战_文档/(4267) 15  ZooKeeper 注册中心实现，官方推荐注册中心实践.md","filePath":"posts/backEnd/Dubbo源码解读与实战_文档/(4267) 15  ZooKeeper 注册中心实现，官方推荐注册中心实践.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/Dubbo源码解读与实战_文档/(4267) 15  ZooKeeper 注册中心实现，官方推荐注册中心实践.md"},E=s("h1",{id:"_15zookeeper注册中心实现-官方推荐注册中心实践",tabindex:"-1"},[n("15ZooKeeper注册中心实现，官方推荐注册中心实践 "),s("a",{class:"header-anchor",href:"#_15zookeeper注册中心实现-官方推荐注册中心实践","aria-label":'Permalink to "15ZooKeeper注册中心实现，官方推荐注册中心实践"'},"​")],-1),y=s("p",null,"Dubbo 支持 ZooKeeper 作为注册中心服务，这也是 Dubbo 推荐使用的注册中心。为了让你能更好地理解 ZooKeeper 在 Dubbo 中的应用，接下来我们就先简单回顾下 ZooKeeper。",-1),i=s("p",null,[n("Dubbo 本身是一个分布式的 RPC 开源框架，各个依赖于 Dubbo 的服务节点都是单独部署的，为了让 Provider 和 Consumer 能够实时获取彼此的信息，就得依赖于一个"),s("strong",null,"一致性的服务发现组件"),n("实现注册和订阅。Dubbo 可以接入多种服务发现组件，例如，ZooKeeper、etcd、Consul、Eureka 等。其中，Dubbo 特别推荐使用 ZooKeeper。")],-1),d=s("p",null,[s("strong",null,"ZooKeeper 是为分布式应用所设计的高可用且一致性的开源协调服务"),n("。它是一个树型的目录服务，支持变更推送，非常适合应用在生产环境中。")],-1),C=s("p",null,"下面是 Dubbo 官方文档中的一张图，展示了 Dubbo 在 Zookeeper 中的节点层级结构：",-1),u=s("p",null,"Zookeeper 存储的 Dubbo 数据",-1),F=s("p",null,'图中的"dubbo"节点是 Dubbo 在 Zookeeper 中的根节点，"dubbo"是这个根节点的默认名称，当然我们也可以通过配置进行修改。',-1),h=s("p",null,'图中 Service 这一层的节点名称是服务接口的全名，例如 demo 示例中，该节点的名称为"org.apache.dubbo.demo.DemoService"。',-1),g=s("p",null,"图中 Type 这一层的节点是 URL 的分类，一共有四种分类，分别是：providers（服务提供者列表）、consumers（服务消费者列表）、routes（路由规则列表）和 configurations（配置规则列表）。",-1),D=s("p",null,"根据不同的 Type 节点，图中 URL 这一层中的节点包括：Provider URL 、Consumer URL 、Routes URL 和 Configurations URL。",-1),k=s("h3",{id:"zookeeperregistryfactory",tabindex:"-1"},[n("ZookeeperRegistryFactory "),s("a",{class:"header-anchor",href:"#zookeeperregistryfactory","aria-label":'Permalink to "ZookeeperRegistryFactory"'},"​")],-1),A=s("p",null,[n("在前面第 13 课时介绍 Dubbo 注册中心核心概念的时候，我们讲解了 RegistryFactory 这个工厂接口以及其子类 AbstractRegistryFactory，AbstractRegistryFactory 仅仅是提供了缓存 Registry 对象的功能，并未真正实现 Registry 的创建，具体的创建逻辑是由子类完成的。在 dubbo-registry-zookeeper 模块中的 SPI 配置文件（目录位置如下图所示）中，指定了"),s("strong",null,"RegistryFactory 的实现类------ ZookeeperRegistryFactory"),n("。")],-1),b=e("",10),L=e("",16),Z=s("ul",null,[s("li",null,[s("strong",null,"DataListener"),n("：主要监听某个节点存储的数据变化。")])],-1),v=s("ul",null,[s("li",null,"**ChildListener：**主要监听某个 ZNode 节点下的子节点变化。")],-1),_=e("",19),m=s("p",null,"doSubscribe() 方法的核心是通过 ZookeeperClient 在指定的 path 上添加 ChildListener 监听器，当订阅的节点发现变化的时候，会通过 ChildListener 监听器触发 notify() 方法，在 notify() 方法中会触发传入的 NotifyListener 监听器。",-1),T=s("p",null,"从 doSubscribe() 方法的代码结构可看出，doSubscribe() 方法的逻辑分为了两个大的分支。",-1),B=s("p",null,"一个分支是处理：订阅 URL 中明确指定了 Service 层接口的订阅请求。该分支会从 URL 拿到 Consumer 关注的 category 节点集合，然后在每个 category 节点上添加 ChildListener 监听器。下面是 Demo 示例中 Consumer 订阅的三个 path，图中展示了构造 path 各个部分的相关方法：",-1),S=e("",12);function R(f,N,P,q,I,U){const a=o("Image");return t(),r("div",null,[E,y,i,d,C,p(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/4F/67/Ciqc1F9gay-AdrWMAAGjEWP00aQ382.png"}),n(),u,F,h,g,D,k,A,p(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/4F/72/CgqCHl9ga02AUesuAABPhgP1Voc406.png"}),n(),b,p(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/4F/73/CgqCHl9ga2CAVhNZAACNo2yx1q4384.png"}),n(),L,p(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/4F/73/CgqCHl9ga4GAQmYSAAAtjyGIDtE504.png"}),n(),Z,p(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/4F/67/Ciqc1F9ga4qAVm-6AAAzoshbsio688.png"}),n(),v,p(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/4F/73/CgqCHl9ga4-Aa-4IAABLF9PT8ls256.png"}),n(),_,p(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/4F/67/Ciqc1F9ga6qAOzWsAAGn7w4zPbo192.png"}),n(),m,T,B,p(a,{alt:"Lark20200915-155646.png",src:"https://s0.lgstatic.com/i/image/M00/4F/6F/Ciqc1F9gc_WAYTGzAAEKDnK-16Q791.png"}),n(),S])}const w=l(c,[["render",R]]);export{M as __pageData,w as default};
