import{_ as o,j as p,o as r,h as t,k as e,f as n,s,Q as l}from"./chunks/framework.d3daa342.js";const as=JSON.parse('{"title":"第22讲：深入剖析regiter-receiver-plugin插件（上）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1740) 第22讲：深入剖析 regiter-receiver-plugin 插件（上）.md","filePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1740) 第22讲：深入剖析 regiter-receiver-plugin 插件（上）.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1740) 第22讲：深入剖析 regiter-receiver-plugin 插件（上）.md"},E=s("h1",{id:"第22讲-深入剖析regiter-receiver-plugin插件-上",tabindex:"-1"},[n("第22讲：深入剖析regiter-receiver-plugin插件（上） "),s("a",{class:"header-anchor",href:"#第22讲-深入剖析regiter-receiver-plugin插件-上","aria-label":'Permalink to "第22讲：深入剖析regiter-receiver-plugin插件（上）"'},"​")],-1),y=s("p",null,"在上一课时中，重点介绍了 SkyWalking 存储层的框架设计以及核心接口。从本节课开始，我们将深入 SkyWalking OAP 的 receiver 模块，分析其中的各类插件是如何接收 SkyWalking Agent 上报请求、处理数据以及持久化数据的。",-1),i=s("p",null,"本课时介绍的是 register-receiver-plugin 模块，它负责接收 SkyWalking Agent 发送的各类注册请求以及同步请求，处理的数据都是 RegisterSource 抽象类的子类，如下图所示。",-1),g=l("",9),d=s("p",null,"其中 doServiceRegister() 方法负责处理服务注册请求，具体实现就是从服务注册请求（即 Register.proto 文件中定义的 messsage Services）中拿出 ServiceName，然后交给 IServiceInventoryRegister 生成对应的 ServiceId，然后返回给 Agent。核心流程如下图所示：",-1),u=s("p",null,"IServiceInventoryRegister 接口以及实现位于 servier-core 模块中，如下图所示：",-1),C=s("p",null,"这里对于不同的 RegisterSource 实现提供了不同的 Register 接口以及实现类，如下图所示。",-1),m=l("",12),A=l("",4),D=s("p",null,"从名字就可以看出，StreamAnnotationListener 就是处理 @Stream 注解的 AnnotationListener 实现类。",-1),F=s("p",null,"@Stream 注解中有四个字段：",-1),v=s("ul",null,[s("li",null,[s("strong",null,"name"),n("：对应的索引名称。这里的 ServiceInventory 指定的就是 service_inventory 索引，如果是 Metrics 等与时间相关数据，则 name 只是对应 ES 索引的前缀。")]),s("li",null,[s("strong",null,"builder"),n("：前面提到每个 StorageData 实现类都关联了一个 StorageBuilder 实现类（多数为 StorageData 实现的内部类），两者就是通过该字段进行关联的。StorageBuilder 负责 StorageData 对象与 Map<String，Object> 之间的转换。ServiceInventory 关联的就是其自身的内部类 ------ ServiceInventory.Builder。")]),s("li",null,[s("strong",null,"processor"),n("：含义是收到该类型的数据时会交给 processor 指定的处理器进行处理。processor 指定的处理器都是 StreamProcessor 类型的，下图展示了 StreamProcessor 接口以及全部实现类，四个不同的实现类负责处理不同类型的数据。")])],-1),S=s("ul",null,[s("li",null,[s("strong",null,"InventoryStreamProcessor"),n("：负责处理 RegisterSource 类型的数据。ServiceInventory 关联的就是 InventoryStreamProcessor。")]),s("li",null,[s("strong",null,"MetricsStreamProcessor"),n("：负责处理 Metrics 类型的数据。")]),s("li",null,[s("strong",null,"RecordStreamProcessor"),n("：负责处理 Record 类型的数据。")]),s("li",null,[s("strong",null,"TopNStreamProcessor"),n("：负责处理 TopN 类型的数据，TopN 抽象类扩展了 Record 抽象类。")])],-1),k=s("p",null,"StreamAnnotationListener 的核心逻辑 ------ notify() 方法，就是为各个 StorageData 关联相应的 StreamProcessor 处理器，核心代码如下：",-1),h=l("",8),I=s("p",null,"StreamDataMapping 底层维护了两个 Map，维护了 StreamData 与唯一 ID 之间的双向映射，也是基于这两个 Map 实现了 StreamDataMappingGetter 的双向查询接口。StreamData 映射的唯一 ID 将在后面介绍跨 OAP 节点交互时看到其具体作用。",-1),_=s("p",null,"create() 方法要做的第三件事就是为每个 StorageData 类型初始化 Worker 处理链。前面提到的四个 StreamProcessor 都是单例的，每个 StreamProcessor 中都维护了一个 entryWorkers 集合，其中的 Key 是具体的 StorageData 实现类型， Value 是相应 Worker 处理链的入口 Worker 实例。处理数据的逻辑一般会比较复杂，包含了多个有清晰边界、相对独立的步骤，Worker 链中的每个 Worker 对象都只负责实现一个步骤，将它们依次串联即可得到一个完整的处理流程。",-1),R=s("p",null,"InventoryStreamProcessor 中的 entryWorks 集合的 Key 为 RegisterSource 子类，Value 为 RegisterDistinctWorker 类型：",-1),B=l("",3),P=s("h3",{id:"abstractworker",tabindex:"-1"},[n("AbstractWorker "),s("a",{class:"header-anchor",href:"#abstractworker","aria-label":'Permalink to "AbstractWorker"'},"​")],-1),b=s("p",null,"在 CoreModuleProvider 中会初始化一个 WorkerInstancesService 服务，它负责为不同的 AbstractWorker 实例对象分配唯一 ID，并维护了一个 Map 记录两者关系，这一操作是在 AbstractWorker 构造方法中完成的。",-1),W=s("p",null,"回到 InventoryStreamProcessor，处理 ServiceInventory 的 Worker 链中包含了三个 Worker，具体的执行顺序如下图所示：",-1),f=s("h4",{id:"registerdistinctworker",tabindex:"-1"},[n("RegisterDistinctWorker "),s("a",{class:"header-anchor",href:"#registerdistinctworker","aria-label":'Permalink to "RegisterDistinctWorker"'},"​")],-1),M=s("p",null,"先来看 RegisterDistinctWorker ，它主要负责对 RegisterSource 进行去重，为什么会出现重复请求呢？以 ServiceInventory 为例：",-1),N=s("ol",null,[s("li",null,"如果一个服务以集群形式部署，该服务集群中就会启动多个 ServiceName 相同的服务实例。这些服务实例一起通过 SkyWalking Agent 向 Skywalking OAP 集群进行服务注册时，就可能导致在短时间内收到多条服务注册请求。"),s("li",null,"在 Skywalking Agent 服务注册逻辑中可以看到，当服务注册请求失败时，会进行重试，也可能导致 OAP 集群在短时间内收到多条相同的服务注册请求。")],-1),O=s("p",null,"RegisterDistinctWorker 的模型如下图所示：",-1),q=l("",27),x=s("p",null,"RemoteClientManager 初始化时会启动一个后台线程，定期通过 ClusterNodesQuery 拉取 OAP 集群中的节点信息，如果 OAP 集群中的节点变化，则会调用 reBuildRemoteClients() 方法更新 usingClients 集合。",-1),L=s("p",null,"这里通过一个具体的示例介绍更新逻辑，例如：OAP 集群中目前有 1、2、3、4 四个节点，此时，节点 1 的 usingClients 集合指向 clientsA，如下图所示，其中 Client 1 是 SelfRemoteClient 类型的 Client 表示节点 1 自身，Client 2、3、4 都是 GRPCRemoteClient 类型的 Client，通过网络连接对应的 OAP 节点。",-1),T=s("p",null,"假设某一时间点，OAP 集群发生变化，节点 2 下线，节点 5 上线，在 Zookeeper 中注册 RemoteInstance 也会随之发生变化，从而触发 usingClients 集合的更新。如下图所示，此时的Zookeeper 中包括节点 1、3、4、5 这四个节点的信息，通过与 clientsA 集合比较可知，节点 5 是新上线的，对应的 Client 5 需要进行初始化；节点 2 是要下线的，对应的 Client 2 需要关闭；其余的节点没有变化，对应的 Client 全部复用，拷贝到 clientsB 集合中。最后更新 usingClients 字段，指向 clientsB 集合即可。",-1),w=s("p",null,"使用双 Client 集合可以保证在更新 clientsB 集合的过程中，不影响上层调用方继续使用 clientsA 集合。在 clientsB 集合更新之后，通过 volatile 修饰的 usingClients 字段切换，上层调用方就可以立即使用 clientsB 集合中的 Client 了。",-1),H=s("h4",{id:"remoteclient",tabindex:"-1"},[n("RemoteClient "),s("a",{class:"header-anchor",href:"#remoteclient","aria-label":'Permalink to "RemoteClient"'},"​")],-1),G=s("p",null,"RemoteClient 接口中定义的 push() 方法表示向 OAP 节点发送数据 ，这里涉及两个实现类，如下图所示：",-1),j=s("p",null,"SelfRemoteClient 对应当前节点自身，其 push() 方法中会直接根据 nextWorkerId 参数查找下一个 Worker 实例来处理 StreamData 数据，不涉及任何网络请求。",-1),V=s("p",null,"GRPCRemoteClient 对应一个远端的 OAP 节点，其 push() 方法会将 nextWorkerId 等信息封装成 RemoteMessage 对象，然后写入 DataCarrier 缓冲区，然后由后台独立的 Consumer 线程通过 GRPCClient 将 DataCarrier 缓冲区中的 RemoteMessage 发送给远端 OAP 节点。这里的 DataCarrier 缓冲区以及 Consumer 线程都是 GRPCRemoteClient 独占的，整体的结构图如下：",-1),K=s("h4",{id:"registerpersistentworker",tabindex:"-1"},[n("RegisterPersistentWorker "),s("a",{class:"header-anchor",href:"#registerpersistentworker","aria-label":'Permalink to "RegisterPersistentWorker"'},"​")],-1),U=s("p",null,'RegisterPersistentWorker 是处理 ServiceInventory 最后一个 Worker ，主要负责二次聚合操作以及持久化操作，属于前文介绍的" L2 级别聚合"。RegisterPersistentWorker 的核心结构与RegisterDistinctWorker 基本一致，核心结构如下图所示。首先，ServiceInventory 实例会进入一个 DataCarrier 缓存，然后由 BulkConsumerPool 中的消费线程完成聚合以及持久化操作。这里的 DataCarrier 是每个 RegisterPersistentWorker 对象独占的，BulkConsumerPool 线程池是全局共享的，注册在 ConsumerPoolFactory 中的名称为"REGISTER_L2"。',-1),z=l("",5);function J(Q,Z,X,Y,$,ss){const a=p("Image");return r(),t("div",null,[E,y,i,e(a,{alt:"image001.png",src:"https://s0.lgstatic.com/i/image/M00/13/BD/Ciqc1F7PkEKAKK6lAAF6WcTGXXU722.png"}),n(),g,e(a,{alt:"image003.png",src:"https://s0.lgstatic.com/i/image/M00/13/C8/CgqCHl7PkEyAGPg5AAPkW2R-quM844.png"}),n(),d,e(a,{alt:"image005.png",src:"https://s0.lgstatic.com/i/image/M00/13/C8/CgqCHl7PkFOAIDDLAAE21B-7DJQ258.png"}),n(),u,e(a,{alt:"image007.png",src:"https://s0.lgstatic.com/i/image/M00/13/C8/CgqCHl7PkFqAdvyxAAHxgz_olVE671.png"}),n(),C,e(a,{alt:"image009.png",src:"https://s0.lgstatic.com/i/image/M00/13/BD/Ciqc1F7PkGOAFvRXAAFUkChUCBE068.png"}),n(),m,e(a,{alt:"image011.png",src:"https://s0.lgstatic.com/i/image/M00/13/C8/CgqCHl7PkHKAch62ABCOeHi1PmI006.png"}),n(),A,e(a,{alt:"image013.png",src:"https://s0.lgstatic.com/i/image/M00/13/BD/Ciqc1F7PkHuAL-IrAADVxgjoSQM699.png"}),n(),D,F,v,e(a,{alt:"image015.png",src:"https://s0.lgstatic.com/i/image/M00/13/C8/CgqCHl7PkIuAVQGmAADxp_xR4Yg365.png"}),n(),S,k,e(a,{alt:"image017.png",src:"https://s0.lgstatic.com/i/image/M00/13/BD/Ciqc1F7PkJ-ALvUSAAFXBPgFILQ073.png"}),n(),h,e(a,{alt:"image019.png",src:"https://s0.lgstatic.com/i/image/M00/13/BD/Ciqc1F7PkK6AZmcSAAA7OnJZChM497.png"}),n(),I,_,R,e(a,{alt:"image021.png",src:"https://s0.lgstatic.com/i/image/M00/13/C9/CgqCHl7PkLaAeB2tAAA05mZdfLA098.png"}),n(),B,e(a,{alt:"image023.png",src:"https://s0.lgstatic.com/i/image/M00/13/C9/CgqCHl7PkL6ATU7LAAFFIIhucdY966.png"}),n(),P,b,W,e(a,{alt:"image025.png",src:"https://s0.lgstatic.com/i/image/M00/13/C9/CgqCHl7PkMeAcbnnAADlzfEUJUs797.png"}),n(),f,M,N,O,e(a,{alt:"image027.png",src:"https://s0.lgstatic.com/i/image/M00/13/C9/CgqCHl7PkNGAIfMBAAKLevDoMcM794.png"}),n(),q,e(a,{alt:"image029.png",src:"https://s0.lgstatic.com/i/image/M00/13/BD/Ciqc1F7PkOGALBZaAADIkvKIxRk791.png"}),n(),x,L,e(a,{alt:"image031.png",src:"https://s0.lgstatic.com/i/image/M00/13/C9/CgqCHl7PkOiAFx85AAC1YVJi368187.png"}),n(),T,e(a,{alt:"image033.png",src:"https://s0.lgstatic.com/i/image/M00/13/BD/Ciqc1F7PkO-AD6VOAAG8IcM-tew372.png"}),n(),w,H,G,e(a,{alt:"image035.png",src:"https://s0.lgstatic.com/i/image/M00/13/C9/CgqCHl7PkPeAD80SAAGxevzW4-Y972.png"}),n(),j,V,e(a,{alt:"image037.png",src:"https://s0.lgstatic.com/i/image/M00/13/C9/CgqCHl7PkP-AWdpoAAI3RpMlQy4440.png"}),n(),K,U,e(a,{alt:"image039.png",src:"https://s0.lgstatic.com/i/image/M00/13/C9/CgqCHl7PkQaAOsx2AAJhu4VD5Sc586.png"}),n(),z])}const es=o(c,[["render",J]]);export{as as __pageData,es as default};
