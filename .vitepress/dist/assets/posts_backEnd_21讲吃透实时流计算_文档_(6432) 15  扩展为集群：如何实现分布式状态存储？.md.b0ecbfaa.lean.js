import{_ as o,j as i,o as n,h as r,k as p,f as t,Q as s,s as e}from"./chunks/framework.d3daa342.js";const V=JSON.parse('{"title":"15扩展为集群：如何实现分布式状态存储？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/21讲吃透实时流计算_文档/(6432) 15  扩展为集群：如何实现分布式状态存储？.md","filePath":"posts/backEnd/21讲吃透实时流计算_文档/(6432) 15  扩展为集群：如何实现分布式状态存储？.md","lastUpdated":1696682708000}'),l={name:"posts/backEnd/21讲吃透实时流计算_文档/(6432) 15  扩展为集群：如何实现分布式状态存储？.md"},c=s("",16),_=s("",12),d=s("",9),h=e("p",null,"在上面的图 3 中，当请求发起时，将请求提交给队列后获取一个 CompletableFuture 对象。而另外一个线程，等着从这个队列中取出请求。当该线程取出的请求达到一定数量或者等待超过一定时间时，将取出的这批请求封装成批次请求，发送给请求处理服务器。当批次请求返回后，将批次结果拆解开，再依次使用 CompletableFuture 的 complete 函数将结果交给各个请求发起者。这样就实现了请求的批次化处理。",-1),u=e("p",null,"批次化处理的好处，在于提高了请求处理的吞吐量，降低了每条请求的平均响应时间。但是因为使用了队列和异步的方案，所以也有可能会提高特定某条请求的响应时间。因此在实际开发中，需要你根据具体的使用场景，选择最合适的方案。",-1),g=e("p",null,"基于 Redis 的集群方案到此就介绍完了。现在，我们来看第二种状态集群方案。",-1),m=e("h3",{id:"基于-apache-ignite-的状态集群",tabindex:"-1"},[t("基于 Apache Ignite 的状态集群 "),e("a",{class:"header-anchor",href:"#基于-apache-ignite-的状态集群","aria-label":'Permalink to "基于 Apache Ignite 的状态集群"'},"​")],-1),q=e("p",null,"下面的图 4 是 Apache Ignite 集群用于状态存储和管理的原理图。",-1),A=e("p",null,"从该原理图可以看出，当采用 Apache Ignite 来存储和管理状态时，计算节点和数据节点是耦合在一起的，它们运行在相同的 JVM 内。每个 Apache Ignite 节点会保存全部集群数据中的一部分，流计算节点通过其嵌入的 Apache Ignite 节点来访问状态数据。而 Apache Ignite 作为一种数据网格，其自身的设计和实现机制，会尽可能让计算只需要访问节点本地的数据，从而减少了数据在网络之间的流动。",-1),k=e("p",null,"这种设计方案充分利用了 Apache Ignite 提供的数据网格能力，是一种典型的网格计算架构。",-1),I=e("p",null,"采用 Apache Ignite 数据网格的方案，可以让我们不必过多考虑数据分区问题。Apache Ignite 会自行处理数据局部性以及计算和数据之间亲和性的问题。另外，Apache Ignite 提供的各种计算和查询接口，屏蔽了分布式数据和分布式计算的复杂性，也为我们开发分布式系统带来极大的便利性。网格计算中所有节点都是平等的，当需要水平扩展集群时，只需要将新的节点添加到网格中即可。",-1),R=e("p",null,"不过这种使用数据网格的方案，其成功的地方也是其失败的地方。将计算节点和数据节点耦合在同一个 JVM 后，增加了单一节点的复杂性，同时也使计算资源的分配、管理和监控等变得更加复杂。这点需要你在做方案选型时根据具体场景自行定夺。",-1),b=e("h3",{id:"基于分布式文件系统的状态集群",tabindex:"-1"},[t("基于分布式文件系统的状态集群 "),e("a",{class:"header-anchor",href:"#基于分布式文件系统的状态集群","aria-label":'Permalink to "基于分布式文件系统的状态集群"'},"​")],-1),T=e("p",null,"第三种状态集群方案，是一种基于分布式文件系统的状态存储和管理集群。这也是一种非常典型的分布式状态存储和管理方案。比如，Flink 的状态存储和管理使用的就是这种方案。下面的图 5 就描述了采用分布式文件系统进行状态存储和管理的方案。",-1),f=s("",12);function C(P,y,S,E,F,w){const a=i("Image");return n(),r("div",null,[c,p(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/1A/32/Cgp9HWBLFvWAVxchAAKrYjmZt4o979.png"}),t(),_,p(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M00/1A/32/Cgp9HWBLFwWAU76UAAMyVj2WjIE117.png"}),t(),d,p(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M00/1A/32/Cgp9HWBLFxGAZnp5AALZHu5speg282.png"}),t(),h,u,g,m,q,p(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M01/1A/2E/CioPOWBLFyGAYDTJAALeiLYHXYY458.png"}),t(),A,k,I,R,b,T,p(a,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image6/M00/1A/32/Cgp9HWBLFyqAC4bNAANRsY_fIMs094.png"}),t(),f,p(a,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image6/M00/1A/2E/CioPOWBLFzaAFclbAAPJGX66gyY406.png"})])}const N=o(l,[["render",C]]);export{V as __pageData,N as default};
