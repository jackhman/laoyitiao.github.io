import{_ as o,j as p,o as t,h as r,k as e,f as n,s,Q as l}from"./chunks/framework.d3daa342.js";const N=JSON.parse('{"title":"第21讲：Cluter插件剖析，你想要的集群模式它都有","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1739) 第21讲：Cluter 插件剖析，你想要的集群模式它都有.md","filePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1739) 第21讲：Cluter 插件剖析，你想要的集群模式它都有.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1739) 第21讲：Cluter 插件剖析，你想要的集群模式它都有.md"},i=s("h1",{id:"第21讲-cluter插件剖析-你想要的集群模式它都有",tabindex:"-1"},[n("第21讲：Cluter插件剖析，你想要的集群模式它都有 "),s("a",{class:"header-anchor",href:"#第21讲-cluter插件剖析-你想要的集群模式它都有","aria-label":'Permalink to "第21讲：Cluter插件剖析，你想要的集群模式它都有"'},"​")],-1),y=s("p",null,"在上一课时中介绍的 ConfigurationModule 是一个非常基础的 Module，在后续介绍 CoreModule、TraceModule 时，都会看到它们的 requireModule 集合都包含了 ConfigurationModule。",-1),E=s("p",null,"本课时将介绍 Cluster 模块，该模块也是非常基础的模块，被很多其他模块依赖。我们重点介绍支持单机模式 cluster-standalone-plugin 模块，以及依赖 Zookeeper 的 cluster-zookeeper-plugin 模块。",-1),d=s("h4",{id:"clustermodule",tabindex:"-1"},[n("ClusterModule "),s("a",{class:"header-anchor",href:"#clustermodule","aria-label":'Permalink to "ClusterModule"'},"​")],-1),u=s("p",null,"在 application.yml 配置文件中，我们可以看到 ClusterModule 相关的配置，如下图所示，其中包含了多个 Cluster 实现模块的配置。",-1),g=s("p",null,"全部 Cluster 模块使用的 ModuleDefine 实现类 ------ ClusterModule 位于在 server-core 这个模块中，如下图所示，在 server-core 模块的 SPI 文件中指定了多个 ModuleDefine 实现，其中就包含 ClusterModule。",-1),C=l(`<p>毫无疑问，ClusterModule 的 name() 方法固定返回 &quot;cluster&quot; 字符串，与上图展示的 application.yml 配置文件相对应。其 services() 方法中返回了两个 Service 接口的子接口类型 ------ ClusterRegister、ClusterNodesQuery，所以，ClusterModule 底层的 ModuleProvider 实现需要提供它们的实现类。如上图所示，这两个接口与 ClusterModule 在同一个包下。</p><p>ClusterRegister 接口中定义了注册集群中一个节点地址的方法：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ClusterRegister</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Service</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">registerRemote</span><span style="color:#E1E4E8;">(RemoteInstance </span><span style="color:#FFAB70;">remoteInstance</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ClusterRegister</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Service</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">registerRemote</span><span style="color:#24292E;">(RemoteInstance </span><span style="color:#E36209;">remoteInstance</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这里的参数 RemoteInstance 表示了 OAP 集群中的一个节点，有三个关键信息：host 地址、port 端口以及 isSelf 标识，其中 isSelf 标识该 RemoteInstance 对象是否表示当前 OAP 节点本身。</p><p>在 ClusterNodesQuery 接口中定义了查询集群中所有远端节点地址的方法：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ClusterNodesQuery</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Service</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    List&lt;</span><span style="color:#F97583;">RemoteInstance</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#B392F0;">queryRemoteNodes</span><span style="color:#E1E4E8;">(); </span><span style="color:#6A737D;">// 查询集群中全部节点</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ClusterNodesQuery</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Service</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    List&lt;</span><span style="color:#D73A49;">RemoteInstance</span><span style="color:#24292E;">&gt; </span><span style="color:#6F42C1;">queryRemoteNodes</span><span style="color:#24292E;">(); </span><span style="color:#6A737D;">// 查询集群中全部节点</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="cluster-standalone-plugin-模块" tabindex="-1">cluster-standalone-plugin 模块 <a class="header-anchor" href="#cluster-standalone-plugin-模块" aria-label="Permalink to &quot;cluster-standalone-plugin 模块&quot;">​</a></h4><p>在 server-cluster-plugin 模块下有多个子模块实现了 ClusterModule 的功能，如下图所示：</p>`,8),v=s("p",null,'这里的 cluster-standalone-plugin 模块实现了单机模式，在其 ModuleProvider SPI 文件中指定的实现类是 ClusterModuleStandaloneProvider，其 name() 方法固定返回 "standalone" 字符串，与 application.yml 配置文件对应。requireModules() 方法返回空数组，表示不依赖其他任何 Module。',-1),F=s("p",null,"在 prepare() 方法中，ClusterModuleStandaloneProvider 会创建 StandaloneManager 实例。StandaloneManager 同时实现了 ClusterNodesQuery 接口和 ClusterRegister 接口，如下图所示：",-1),m=s("p",null,"StandaloneManager 中只有一个 RemoteInstance 类型字段（isSelf 标识始终为 true，表示当前 OAP 服务本身），其 registerRemote() 方法和 queryRemoteNodes() 方法都是操作这一个 RemoteInstance 字段，这样就实现了简单的单机模式。",-1),h=s("h4",{id:"curator-x-discovery-扩展库",tabindex:"-1"},[n("curator-x-discovery 扩展库 "),s("a",{class:"header-anchor",href:"#curator-x-discovery-扩展库","aria-label":'Permalink to "curator-x-discovery 扩展库"'},"​")],-1),A=s("p",null,"在开始介绍 cluster-zookeeper-plugin 模块之前，需要先了解其中使用到的 curator-x-discovery 依赖的功能。",-1),D=s("p",null,"为了避免 curator-recipes 包过于膨胀，Curator 将很多其他解决方案都拆出来了，作为单独的一个包，命名方式就是 curator-x-*，例如：curator-x-discovery、curator-x-rpc。",-1),S=s("p",null,"在 SkyWalking 中的 cluster-zookeeper-plugin 模块就使用了 curator-x-discovery 这个包。curator-x-discovery 扩展包是一个服务发现的解决方案。在 ZooKeeper 中，我们可以使用临时节点（Ephemeral Node）实现一个服务注册机制。当服务启动后在 ZooKeeper 的指定 Path 下创建临时节点，服务断掉与 ZooKeeper 的会话之后，其相应的临时节点就会被删除。这个 curator-x-discovery 扩展包抽象了这种功能，并提供了一套简单的 API 来实现服务发现机制。curator-x-discovery 扩展包的核心概念如下：",-1),_=s("ul",null,[s("li",null,[s("strong",null,"ServiceInstance"),n("：ServiceInstance 是 curator-x-discovery 扩展包对服务实例的抽象，ServiceInstance 由 name、id、address、port 以及一个可选的 payload 属性构成。ServiceInstance 序列化并存储在 ZooKeeper 中的方式如下：")])],-1),I=l(`<ul><li><strong>ServiceProvider</strong>：ServiceProvider 是 curator-x-discovery 扩展包的核心，它提供了多种不同策略的服务发现方式，具体策略有：轮询调度、随机和黏性（总是选择相同的一个）。得到 ServiceProvider 对象之后，我们可以调用其 getInstance() 方法，按照指定策略获取 ServiceInstance 对象（即发现可用服务实例）；还可以调用 getAllInstances() 方法，获取所有 ServiceInstance 对象（即获取全部可用服务实例）。</li><li><strong>ServiceDiscovery</strong>：ServiceDiscovery 是 curator-x-discovery 扩展包的入口类。开始必须调用 start() 方法，当使用完成应该调用 close() 方法进行销毁。</li><li><strong>ServiceCache</strong>：如果程序中会频繁地查询 ServiceInstance 对象、添加 ServiceCache 缓存，ServiceCache 会在内存中缓存 ServiceInstance 实例的列表，并且添加相应的 Watcher 来同步更新缓存。查询 ServiceCache 的方式也是 getInstances() 方法。另外，ServiceCache 上还可以添加 Listener 来监听缓存变化。</li></ul><h4 id="cluster-zookeeper-plugin-模块" tabindex="-1">cluster-zookeeper-plugin 模块 <a class="header-anchor" href="#cluster-zookeeper-plugin-模块" aria-label="Permalink to &quot;cluster-zookeeper-plugin 模块&quot;">​</a></h4><p>在前面课时介绍 OAP 启动流程时看到，OAP 会先从 application.yml 配置文件中读取配置信息，存入 ApplicationConfiguration、ModuleConfiguration、ProviderConfiguration 之中，最后将这些配置信息转换成 Java Bean（即 ModuleProvider 对应的 ModuleConfig 实现类）。</p><p>cluster-zookeeper-plugin 模块中的 ModuleProvider SPI 文件中指定的实现类是 ClusterModuleZookeeperProvider，其对应的 ModuleConfig 实现类是</p><p>ClusterModuleZookeeperConfig 类，该类的字段如下，与 application.yml 配置文件中的字段一一对应：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> String nameSpace; </span><span style="color:#6A737D;">// 命名空间，即Zk节点的路径，默认值为&quot;/skywalking&quot;</span></span>
<span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> String hostPort; </span><span style="color:#6A737D;">//  Zookeeper集群地址</span></span>
<span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> baseSleepTimeMs; </span><span style="color:#6A737D;">// 两次重试之间的初始间隔时间，后面间隔会指数增长</span></span>
<span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> maxRetries; </span><span style="color:#6A737D;">// 最大重试次数</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> String nameSpace; </span><span style="color:#6A737D;">// 命名空间，即Zk节点的路径，默认值为&quot;/skywalking&quot;</span></span>
<span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> String hostPort; </span><span style="color:#6A737D;">//  Zookeeper集群地址</span></span>
<span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> baseSleepTimeMs; </span><span style="color:#6A737D;">// 两次重试之间的初始间隔时间，后面间隔会指数增长</span></span>
<span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> maxRetries; </span><span style="color:#6A737D;">// 最大重试次数</span></span></code></pre></div><p>ClusterModuleZookeeperProvider 的 name() 方法固定返回 &quot;zookeeper&quot; 字符串，与 application.yml 配置文件对应。requireModules() 方法返回空数组，表示不依赖任何其他 Module。</p><p>在 prepare() 方法中，ClusterModuleZookeeperProvider 会初始化前文介绍的 curator-x-discovery 扩展库，下面是具体实现，其中同时展示了 curator-x-discovery 扩展库的基础使用：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">prepare</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">    RetryPolicy retryPolicy </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 重试策略</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ExponentialBackoffRetry</span><span style="color:#E1E4E8;">(config.</span><span style="color:#B392F0;">getBaseSleepTimeMs</span><span style="color:#E1E4E8;">(),       </span></span>
<span class="line"><span style="color:#E1E4E8;">            config.</span><span style="color:#B392F0;">getMaxRetries</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 创建Curator客户端</span></span>
<span class="line"><span style="color:#E1E4E8;">    client </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> CuratorFrameworkFactory.</span><span style="color:#B392F0;">newClient</span><span style="color:#E1E4E8;">(config.</span><span style="color:#B392F0;">getHostPort</span><span style="color:#E1E4E8;">(), </span></span>
<span class="line"><span style="color:#E1E4E8;">        retryPolicy);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 存储ServiceInstance实例的节点路径</span></span>
<span class="line"><span style="color:#E1E4E8;">    String path </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> BASE_PATH </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> (StringUtil.</span><span style="color:#B392F0;">isEmpty</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">        config.</span><span style="color:#B392F0;">getNameSpace</span><span style="color:#E1E4E8;">()) </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;/&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> config.</span><span style="color:#B392F0;">getNameSpace</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 创建ServiceDiscovery</span></span>
<span class="line"><span style="color:#E1E4E8;">    serviceDiscovery </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ServiceDiscoveryBuilder.</span><span style="color:#B392F0;">builder</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">            RemoteInstance.class).</span><span style="color:#B392F0;">client</span><span style="color:#E1E4E8;">(client) </span><span style="color:#6A737D;">// 依赖Curator客户端</span></span>
<span class="line"><span style="color:#E1E4E8;">        .</span><span style="color:#B392F0;">basePath</span><span style="color:#E1E4E8;">(path) </span><span style="color:#6A737D;">// 管理的Zk路径</span></span>
<span class="line"><span style="color:#E1E4E8;">        .</span><span style="color:#B392F0;">watchInstances</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">) </span><span style="color:#6A737D;">// 当ServiceInstance加载</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#6A737D;">// 这里的SWInstanceSerializer是将RemoteInstance序列化成Json</span></span>
<span class="line"><span style="color:#E1E4E8;">        .</span><span style="color:#B392F0;">serializer</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SWInstanceSerializer</span><span style="color:#E1E4E8;">()).</span><span style="color:#B392F0;">build</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    client.</span><span style="color:#B392F0;">start</span><span style="color:#E1E4E8;">(); </span><span style="color:#6A737D;">// 启动Curator客户端</span></span>
<span class="line"><span style="color:#E1E4E8;">    client.</span><span style="color:#B392F0;">blockUntilConnected</span><span style="color:#E1E4E8;">(); </span><span style="color:#6A737D;">// 阻塞当前线程，等待连接成功</span></span>
<span class="line"><span style="color:#E1E4E8;">    serviceDiscovery.</span><span style="color:#B392F0;">start</span><span style="color:#E1E4E8;">(); </span><span style="color:#6A737D;">// 启动ServiceDiscovery</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 创建ZookeeperCoordinator对象</span></span>
<span class="line"><span style="color:#E1E4E8;">    ZookeeperCoordinator coordinator </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ZookeeperCoordinator</span><span style="color:#E1E4E8;">(config, serviceDiscovery);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 注册ClusterRegister、ClusterNodesQuery实现</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">registerServiceImplementation</span><span style="color:#E1E4E8;">(ClusterRegister.class, </span></span>
<span class="line"><span style="color:#E1E4E8;">        coordinator);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">registerServiceImplementation</span><span style="color:#E1E4E8;">(ClusterNodesQuery.class, </span></span>
<span class="line"><span style="color:#E1E4E8;">        coordinator);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">prepare</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">    RetryPolicy retryPolicy </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 重试策略</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ExponentialBackoffRetry</span><span style="color:#24292E;">(config.</span><span style="color:#6F42C1;">getBaseSleepTimeMs</span><span style="color:#24292E;">(),       </span></span>
<span class="line"><span style="color:#24292E;">            config.</span><span style="color:#6F42C1;">getMaxRetries</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 创建Curator客户端</span></span>
<span class="line"><span style="color:#24292E;">    client </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> CuratorFrameworkFactory.</span><span style="color:#6F42C1;">newClient</span><span style="color:#24292E;">(config.</span><span style="color:#6F42C1;">getHostPort</span><span style="color:#24292E;">(), </span></span>
<span class="line"><span style="color:#24292E;">        retryPolicy);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 存储ServiceInstance实例的节点路径</span></span>
<span class="line"><span style="color:#24292E;">    String path </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> BASE_PATH </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> (StringUtil.</span><span style="color:#6F42C1;">isEmpty</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">        config.</span><span style="color:#6F42C1;">getNameSpace</span><span style="color:#24292E;">()) </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;/&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> config.</span><span style="color:#6F42C1;">getNameSpace</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 创建ServiceDiscovery</span></span>
<span class="line"><span style="color:#24292E;">    serviceDiscovery </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ServiceDiscoveryBuilder.</span><span style="color:#6F42C1;">builder</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">            RemoteInstance.class).</span><span style="color:#6F42C1;">client</span><span style="color:#24292E;">(client) </span><span style="color:#6A737D;">// 依赖Curator客户端</span></span>
<span class="line"><span style="color:#24292E;">        .</span><span style="color:#6F42C1;">basePath</span><span style="color:#24292E;">(path) </span><span style="color:#6A737D;">// 管理的Zk路径</span></span>
<span class="line"><span style="color:#24292E;">        .</span><span style="color:#6F42C1;">watchInstances</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">true</span><span style="color:#24292E;">) </span><span style="color:#6A737D;">// 当ServiceInstance加载</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#6A737D;">// 这里的SWInstanceSerializer是将RemoteInstance序列化成Json</span></span>
<span class="line"><span style="color:#24292E;">        .</span><span style="color:#6F42C1;">serializer</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SWInstanceSerializer</span><span style="color:#24292E;">()).</span><span style="color:#6F42C1;">build</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    client.</span><span style="color:#6F42C1;">start</span><span style="color:#24292E;">(); </span><span style="color:#6A737D;">// 启动Curator客户端</span></span>
<span class="line"><span style="color:#24292E;">    client.</span><span style="color:#6F42C1;">blockUntilConnected</span><span style="color:#24292E;">(); </span><span style="color:#6A737D;">// 阻塞当前线程，等待连接成功</span></span>
<span class="line"><span style="color:#24292E;">    serviceDiscovery.</span><span style="color:#6F42C1;">start</span><span style="color:#24292E;">(); </span><span style="color:#6A737D;">// 启动ServiceDiscovery</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 创建ZookeeperCoordinator对象</span></span>
<span class="line"><span style="color:#24292E;">    ZookeeperCoordinator coordinator </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ZookeeperCoordinator</span><span style="color:#24292E;">(config, serviceDiscovery);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 注册ClusterRegister、ClusterNodesQuery实现</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">registerServiceImplementation</span><span style="color:#24292E;">(ClusterRegister.class, </span></span>
<span class="line"><span style="color:#24292E;">        coordinator);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">registerServiceImplementation</span><span style="color:#24292E;">(ClusterNodesQuery.class, </span></span>
<span class="line"><span style="color:#24292E;">        coordinator);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>ZookeeperCoordinator 同时实现了 ClusterRegister、ClusterNodesQuery 两个接口，如下图所示：</p>`,10),k=l(`<p>在 registerRemote() 方法中会将 RemoteInstance 实例转换成 curator-x-discovery 扩展库中的 ServiceInstance 对象，并注册到 ZooKeeper。注意，这里传入的 RemoteInstance 实例中的 isSelf 标识都是 true，因为每个 OAP 服务只会暴露自身的地址（也只知道自身的地址）。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">synchronized</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">registerRemote</span><span style="color:#E1E4E8;">(RemoteInstance remoteInstance){</span></span>
<span class="line"><span style="color:#E1E4E8;">    String remoteNamePath </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;remote&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 将RemoteInstance对象转换成ServiceInstance对象</span></span>
<span class="line"><span style="color:#E1E4E8;">    ServiceInstance&lt;</span><span style="color:#F97583;">RemoteInstance</span><span style="color:#E1E4E8;">&gt; thisInstance </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ServiceInstance.</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">RemoteInstance</span><span style="color:#F97583;">&gt;</span><span style="color:#B392F0;">builder</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">name</span><span style="color:#E1E4E8;">(remoteNamePath)</span></span>
<span class="line"><span style="color:#E1E4E8;">        .</span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;">(UUID.</span><span style="color:#B392F0;">randomUUID</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">toString</span><span style="color:#E1E4E8;">()) </span><span style="color:#6A737D;">// id是随机生成的UUID</span></span>
<span class="line"><span style="color:#E1E4E8;">        .</span><span style="color:#B392F0;">address</span><span style="color:#E1E4E8;">(remoteInstance.</span><span style="color:#B392F0;">getAddress</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">getHost</span><span style="color:#E1E4E8;">())</span></span>
<span class="line"><span style="color:#E1E4E8;">        .</span><span style="color:#B392F0;">port</span><span style="color:#E1E4E8;">(remoteInstance.</span><span style="color:#B392F0;">getAddress</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">getPort</span><span style="color:#E1E4E8;">())</span></span>
<span class="line"><span style="color:#E1E4E8;">        .</span><span style="color:#B392F0;">payload</span><span style="color:#E1E4E8;">(remoteInstance).</span><span style="color:#B392F0;">build</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 将ServiceInstance写入到Zookeeper中</span></span>
<span class="line"><span style="color:#E1E4E8;">    serviceDiscovery.</span><span style="color:#B392F0;">registerService</span><span style="color:#E1E4E8;">(thisInstance);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 创建ServiceCache，监Zookeeper相应节点的变化，也方便后续的读取</span></span>
<span class="line"><span style="color:#E1E4E8;">    serviceCache </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> serviceDiscovery.</span><span style="color:#B392F0;">serviceCacheBuilder</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">        .</span><span style="color:#B392F0;">name</span><span style="color:#E1E4E8;">(remoteNamePath).</span><span style="color:#B392F0;">build</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    serviceCache.</span><span style="color:#B392F0;">start</span><span style="color:#E1E4E8;">(); </span><span style="color:#6A737D;">// 启动ServiceCache</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">synchronized</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">registerRemote</span><span style="color:#24292E;">(RemoteInstance remoteInstance){</span></span>
<span class="line"><span style="color:#24292E;">    String remoteNamePath </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;remote&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 将RemoteInstance对象转换成ServiceInstance对象</span></span>
<span class="line"><span style="color:#24292E;">    ServiceInstance&lt;</span><span style="color:#D73A49;">RemoteInstance</span><span style="color:#24292E;">&gt; thisInstance </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ServiceInstance.</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">RemoteInstance</span><span style="color:#D73A49;">&gt;</span><span style="color:#6F42C1;">builder</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">name</span><span style="color:#24292E;">(remoteNamePath)</span></span>
<span class="line"><span style="color:#24292E;">        .</span><span style="color:#6F42C1;">id</span><span style="color:#24292E;">(UUID.</span><span style="color:#6F42C1;">randomUUID</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">toString</span><span style="color:#24292E;">()) </span><span style="color:#6A737D;">// id是随机生成的UUID</span></span>
<span class="line"><span style="color:#24292E;">        .</span><span style="color:#6F42C1;">address</span><span style="color:#24292E;">(remoteInstance.</span><span style="color:#6F42C1;">getAddress</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">getHost</span><span style="color:#24292E;">())</span></span>
<span class="line"><span style="color:#24292E;">        .</span><span style="color:#6F42C1;">port</span><span style="color:#24292E;">(remoteInstance.</span><span style="color:#6F42C1;">getAddress</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">getPort</span><span style="color:#24292E;">())</span></span>
<span class="line"><span style="color:#24292E;">        .</span><span style="color:#6F42C1;">payload</span><span style="color:#24292E;">(remoteInstance).</span><span style="color:#6F42C1;">build</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 将ServiceInstance写入到Zookeeper中</span></span>
<span class="line"><span style="color:#24292E;">    serviceDiscovery.</span><span style="color:#6F42C1;">registerService</span><span style="color:#24292E;">(thisInstance);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 创建ServiceCache，监Zookeeper相应节点的变化，也方便后续的读取</span></span>
<span class="line"><span style="color:#24292E;">    serviceCache </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> serviceDiscovery.</span><span style="color:#6F42C1;">serviceCacheBuilder</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">        .</span><span style="color:#6F42C1;">name</span><span style="color:#24292E;">(remoteNamePath).</span><span style="color:#6F42C1;">build</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    serviceCache.</span><span style="color:#6F42C1;">start</span><span style="color:#24292E;">(); </span><span style="color:#6A737D;">// 启动ServiceCache</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>所有 OAP 实例在启动过程中都会通过 registerRemote() 方法将自身地址注册到 ZooKeeper 集群。在需要获取所有 OAP 实例地址的时候，就可以通过 ZookeeperCoordinator 的queryRemoteNodes() 方法进行查询。</p><p>在 queryRemoteNodes() 方法中会查询 ServiceCache 获取全部的 ServiceInstance 对象，然后从每个 ServiceInstance 对象的 playload 字段中反序列化得到 RemoteInstance 实例（如果其中地址与当前 OAP 服务一致会将其 isSelf 字段设置为 true，标识本地 OAP 服务的地址）返回。</p><h4 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h4><p>本课时重点介绍了 SkyWalking 中提供的 Cluster 相关模块。首先介绍了ClusterModule 的相关内容，然后介绍了 cluster-standalone-plugin 模块对单机模式的支持，最后介绍了 cluster-zookeeper-plugin 模块如何依赖 Apache Curator 扩展包 curator-x-discovery 以及 ZooKeeper 集群实现 OAP 集群的功能。</p>`,6);function B(P,b,f,R,M,q){const a=p("Image");return t(),r("div",null,[i,y,E,d,u,e(a,{alt:"image.png",src:"https://s0.lgstatic.com/i/image/M00/0D/1C/CgqCHl7DfzqATV7pAAh1tLrZ7LM755.png"}),n(),g,e(a,{alt:"image (1).png",src:"https://s0.lgstatic.com/i/image/M00/0D/1C/CgqCHl7Df0WAE6O_AAD50Wj3J5s903.png"}),n(),C,e(a,{alt:"image (2).png",src:"https://s0.lgstatic.com/i/image/M00/0D/1C/CgqCHl7Df0-AR9JyAACONLeNTKc436.png"}),n(),v,F,e(a,{alt:"Stand继承关系.png",src:"https://s0.lgstatic.com/i/image/M00/0D/1C/CgqCHl7Df1eAfuKAAACNtX-84Gk841.png"}),n(),m,h,A,D,S,_,e(a,{alt:"image (3).png",src:"https://s0.lgstatic.com/i/image/M00/0D/1C/CgqCHl7Df3eAbSd8AADHccHcE1Q389.png"}),n(),I,e(a,{alt:"image (4).png",src:"https://s0.lgstatic.com/i/image/M00/0D/1C/CgqCHl7Df4SAOjbZAACJzD-Vox4797.png"}),n(),k])}const Z=o(c,[["render",B]]);export{N as __pageData,Z as default};
