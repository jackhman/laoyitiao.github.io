import{_ as l,j as p,o as t,g as r,k as a,h as n,s,Q as o}from"./chunks/framework.4e7d56ce.js";const R=JSON.parse('{"title":"第23讲：深入剖析regiter-receiver-plugin插件（下）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1741) 第23讲：深入剖析 regiter-receiver-plugin 插件（下）.md","filePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1741) 第23讲：深入剖析 regiter-receiver-plugin 插件（下）.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1741) 第23讲：深入剖析 regiter-receiver-plugin 插件（下）.md"},i=s("h1",{id:"第23讲-深入剖析regiter-receiver-plugin插件-下",tabindex:"-1"},[n("第23讲：深入剖析regiter-receiver-plugin插件（下） "),s("a",{class:"header-anchor",href:"#第23讲-深入剖析regiter-receiver-plugin插件-下","aria-label":'Permalink to "第23讲：深入剖析regiter-receiver-plugin插件（下）"'},"​")],-1),E=s("p",null,"本课时将紧接上一课时的内容，继续介绍服务实例注册请求、EndpointName 以及 NetworkAddress 同步请求的处理。",-1),y=s("h3",{id:"iregisterlockdao原理分析",tabindex:"-1"},[n("IRegisterLockDAO原理分析 "),s("a",{class:"header-anchor",href:"#iregisterlockdao原理分析","aria-label":'Permalink to "IRegisterLockDAO原理分析"'},"​")],-1),d=s("p",null,"紧接上一课时，当一个服务的注册请求首次到达 RegisterPersistentWorker 时，会通过 IRegisterLockDAO 为其生成全局唯一 ID 。IRegisterLockDAO 接口有两个实现类，如下图所示：",-1),g=s("p",null,"这里要重点分析的是 RegisterLockDAOImpl 这个实现类，其底层是依赖 ElasticSearch 的 version 机制实现的乐观锁。",-1),v=s("p",null,"RegisterLockDAOImpl 这个分布式乐观锁底层使用的索引名称是 register_lock，它为每个 RegisterSource 都分配了一个单独的 Document。Document ID 就是 @Stream 注解中的 scopeId 的值，例如，ServiceInventory 的 scopeId 就是 14，ServiceInstanceInventory 的 scopeId 就是 15，如下所示：",-1),I=o(`<p>在 register_lock 索引中只有一个 sequence 字段，它是一个 int 值，初始值为 0，RegisterLockDAOImpl 就是通过自增该字段来分配唯一 ID。</p><p>在 getId() 方法中，RegisterLockDAOImpl 会根据 RegisterSource 查找相应的 Document，并获取 sequence 字段值以及 Document Version，然后递增 sequence 值，写回到对应的 Document 中。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getId</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> scopeId, RegisterSource registerSource) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    String id </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> scopeId </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;&quot;</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">// Document Id</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> sequence </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Const.NONE;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 发送GetRequest请求，获取对应的Document</span></span>
<span class="line"><span style="color:#E1E4E8;">    GetResponse response </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getClient</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;register_lock&quot;</span><span style="color:#E1E4E8;">, id);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (response.</span><span style="color:#B392F0;">isExists</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Map&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">Object</span><span style="color:#E1E4E8;">&gt; source </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> response.</span><span style="color:#B392F0;">getSource</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 获取sequence字段的值</span></span>
<span class="line"><span style="color:#E1E4E8;">        sequence </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ((Number)source.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;sequence&quot;</span><span style="color:#E1E4E8;">)).</span><span style="color:#B392F0;">intValue</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 获取ServiceInventory对应 Document的版本号</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> version </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> response.</span><span style="color:#B392F0;">getVersion</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        sequence</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">// 递增sequence，即为该 ServiceInventory分配的唯一ID</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">lock</span><span style="color:#E1E4E8;">(id, sequence, version); </span><span style="color:#6A737D;">// 更新sequence字段值</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> sequence; </span><span style="color:#6A737D;">// 更新成功，返回该sequence值</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getId</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> scopeId, RegisterSource registerSource) {</span></span>
<span class="line"><span style="color:#24292E;">    String id </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> scopeId </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;&quot;</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">// Document Id</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> sequence </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Const.NONE;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 发送GetRequest请求，获取对应的Document</span></span>
<span class="line"><span style="color:#24292E;">    GetResponse response </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getClient</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;register_lock&quot;</span><span style="color:#24292E;">, id);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (response.</span><span style="color:#6F42C1;">isExists</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">        Map&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">Object</span><span style="color:#24292E;">&gt; source </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> response.</span><span style="color:#6F42C1;">getSource</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 获取sequence字段的值</span></span>
<span class="line"><span style="color:#24292E;">        sequence </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ((Number)source.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;sequence&quot;</span><span style="color:#24292E;">)).</span><span style="color:#6F42C1;">intValue</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 获取ServiceInventory对应 Document的版本号</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> version </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> response.</span><span style="color:#6F42C1;">getVersion</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        sequence</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">// 递增sequence，即为该 ServiceInventory分配的唯一ID</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">lock</span><span style="color:#24292E;">(id, sequence, version); </span><span style="color:#6A737D;">// 更新sequence字段值</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> sequence; </span><span style="color:#6A737D;">// 更新成功，返回该sequence值</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>lock() 方法写回 sequence 值时，会发送一个带 version 的 UpdateRequest 请求，ElasticSearch 集群会比较该 version 是否发生变化，如果 version 发生变化，表示有其他线程并发操作，占用了该 sequence 值，就会抛出异常，后续 Agent 会重新为该服务发起注册请求。如果 version 未发生变化，表示无并发操作，即可将该 sequence 值分配给该服务，由 RegisterPersistentWorker 持久化该映射关系，具体实现过程不再重复。</p><blockquote><p>在高版本的 ElasticSearch 中，不再推荐使用 version 的方式实现乐观锁，而是使用 _seq_no 和 _primary_term 两个字段来实现乐观锁，具体的实现方式与使用 version 的方式类似。这里简单介绍一下这两个字段：_primary_term 主要用于记录 Document 所在的主分片，每当主分片发生重新分配时，比如重启、Primary 选举等，_primary_term 会递增 1。_seq_no 字段和旧版本中的 _version 字段作用类似，是严格递增的顺序号，每个 Document 在分片级别内对应一个，且严格递增，以保证后写入的 Document 的 _seq_no 值大于先写入的 Document 的 _seq_no 值。 加上 _primary_term 这个字段可以提高并发的性能，但由于一个 Document 只会位于某一个特定的主分片中，所以由所在主分片分配序列号比之前通过 ElasticSearch 集群全局统一管理 _version 的性能会更高效。</p><p>更多相关内容，可以参考：<a href="https://github.com/elastic/elasticsearch/issues/19269#issuecomment-488598561" target="_blank" rel="noreferrer">https://github.com/elastic/elasticsearch/issues/19269#issuecomment-488598561</a><br><a href="https://www.elastic.co/guide/en/elasticsearch/reference/7.x/optimistic-concurrency-control.html" target="_blank" rel="noreferrer">https://www.elastic.co/guide/en/elasticsearch/reference/7.x/optimistic-concurrency-control.html</a></p></blockquote><p>最后，给你留一个思考题：在一些极端情况下，同一个服务会被 OAP 集群分配两个不同的ServiceId 吗？</p><h3 id="服务实例注册" tabindex="-1">服务实例注册 <a class="header-anchor" href="#服务实例注册" aria-label="Permalink to &quot;服务实例注册&quot;">​</a></h3><p>通过本课程第二部分的介绍可知，SkyWalking Agent 在完成服务注册之后，会立即进行服务实例的注册。 SkyWalking OAP 处理服务实例注册请求的大致流程与前文介绍的服务注册处理流程基本类似，如下图所示。</p>`,8),u=o("<p>服务实例注册的 gRPC 请求由 RegisterServiceHandler.doServiceInstanceRegister() 方法进行处理：</p><ol><li>根据请求中携带的 ServiceId，从 ServiceInventoryCache 中获取 Service 的相关信息，主要获取的是服务名称，它将是构成服务实例名称的一部分。</li><li>处理请求携带的服务实例的附加信息，例如，系统名称、HostName、IP、进程 ID 等。</li><li>生成服务实例名称。服务实例名称一般是由服务名称、进程 ID、HostName 三部分构成。</li><li>将上述服务实例信息交给 ServiceInstanceInventoryRegister 进行处理。</li><li>返回 ServiceInstance UUID 与 ServiceInstanceId 的映射关系。</li></ol><p>ServiceInstanceInventoryRegister 处理服务实例注册请求的逻辑与前文介绍的 ServiceInventoryRegister 核心逻辑基本一致：</p><ol><li>先查询该 ServiceInstanceName 是否已分配了 ServiceInstanceId。这里同样是先查缓存、缓存 miss ，再查底层持久化存储。</li><li>如果已分配 ServiceInstanceId，直接将其返回。</li><li>如果未分配 ServiceInstanceId，则将 ServiceInstance 相关信息封装成 ServiceInstanceInventory 对象交给 InventoryStreamProcessor 进行处理。</li><li>在 InventoryStreamProcessor 中会为 ServiceInstanceInventory 数据分配相应的 Worker 链以完成 L1 、L2 聚合以及持久化存储。</li></ol><p>在上述过程中，使用到的 Worker、Cache、DAO 实现都与 ServiceInventory 一致，这里就不再展开分析了，如果你感兴趣可以翻看一下源码。</p><p>最后，我们一起来看一下 ServiceInstanceInventory 中的核心字段，以及与相应 ES 索引字段的映射关系，如下图所示：</p>",6),_=s("h3",{id:"networkaddress、endpointname-同步",tabindex:"-1"},[n("NetWorkAddress、EndpointName 同步 "),s("a",{class:"header-anchor",href:"#networkaddress、endpointname-同步","aria-label":'Permalink to "NetWorkAddress、EndpointName 同步"'},"​")],-1),m=s("p",null,"在前面分析 Skywalking Agent 时曾提到，Agent 将 Trace 数据中用到的 NetworkAddress、EndpointName 等字符串信息定时同步到后端 OAP，然后由后端 OAP 集群为其统一分配全局唯一的 ID。之后，在 Agent 上报数据时，会使用这些全局唯一 ID 替换相应的字符串，从而提高上报消息的有效负载，提高传输效率。",-1),A=s("p",null,"你可以先回忆一下，当 Agent 在使用 NetworkAddress 时，例如，创建 Exitpan 的时候会记录 remotePeer 信息，remotePeer 一般是 Host + Port 或 URL等字符串数据，该信息会暂存在 NetworkAddressDictionary 中，并定期发送 NetworkAddress 同步请求与 OAP 同步。",-1),D=s("p",null,"NetworkAddress 同步请求的处理流程如下：",-1),h=o(`<p>NetworkAddressInventoryRegister.getOrCreate() 方法的处理步骤如下：</p><ol><li>查找指定 NetworkAddress 字符串在 network_address_inventory 索引中的对应 ID（addressId）。查询时先查询 NetworkAddressInventoryCache 缓存，再查询底层的 ElasticSearch 索引。若查找失败，会通过 InventoryStreamProcessor在 network_address_inventory 索引中为该 NetworkAddress 字符串生成相应 ID，此时getOrCreate() 方法返回 0；若查找 addressId 成功，继续执行步骤 2。</li><li>根据步骤 1 得到的 addressId 以及 NetworkAddress 字符串，在 service_inventory 索引中查找 NetworkAddress 与服务之间的绑定关系。若查找失败，则通过 InventoryStreamProcessor 创建这个绑定关系；若查询成功，则继续执行步骤 3。</li><li>根据步骤 2 查询到的 ServiceId 以及 addressId，在 service_instance_inventory 索引中查找该 NetworkAddress 与服务实例的绑定关系。若查询失败，则由 InventoryStreamProcessor 创建该绑定关系；若查询成功，则返回步骤 1 中得到的addressId。</li></ol><p>从上述流程来看，一个 NetworkAddress 字符串除了在 network_address_inventory 索引中分配唯一对应的 addressId 外，还会在 service_inventory 和 service_instance_inventory 两个索引中创建与服务、服务实例的绑定。</p><p>处理 EndpointName同步请求的流程与处理服务注册请求的逻辑类似，不再展开分析。</p><h3 id="心跳请求" tabindex="-1">心跳请求 <a class="header-anchor" href="#心跳请求" aria-label="Permalink to &quot;心跳请求&quot;">​</a></h3><p>完成服务注册以及服务实例的注册之后，Agent 会定时调用 ServiceInstancePing.doPing() 这个 gRPC 接口发送心跳请求，以通知后端 OAP 集群当前 Agent 的在线状态。Agent 的心跳逻辑在前面介绍过了，所以这里重点来看后端 OAP 中心跳请求的处理逻辑。</p><p>你可以先来看一下 RegisterModuleProvider.start() 方法，它不仅将前面分析的 RegisterServiceHandler 注册到 GRPCServer 上，同时还会将处理心跳请求的 ServiceInstancePingServiceHandler 注册上去。</p><p>ServiceInstancePingServiceHandler.doPing() 方法会从心跳请求中解析出客户端对应的 ServiceId 以及 ServiceInstanceId，然后更新服务和服务实例的 heartbeat_time 字段，大致实现如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">doPing</span><span style="color:#E1E4E8;">(ServiceInstancePingPkg request, </span></span>
<span class="line"><span style="color:#E1E4E8;">         StreamObserver</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">Commands</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> responseObserver) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 从心跳请求中获取 serviceInstanceId</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> serviceInstanceId </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> request.</span><span style="color:#B392F0;">getServiceInstanceId</span><span style="color:#E1E4E8;">(); </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 心跳请求的发送时间</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> heartBeatTime </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> request.</span><span style="color:#B392F0;">getTime</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 更新服务实例的心跳时间(service_instance_inventory索引中相应Document</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 的heartbeat_time字段） </span></span>
<span class="line"><span style="color:#E1E4E8;">    serviceInstanceInventoryRegister.</span><span style="color:#B392F0;">heartbeat</span><span style="color:#E1E4E8;">(serviceInstanceId, </span></span>
<span class="line"><span style="color:#E1E4E8;">        heartBeatTime);</span></span>
<span class="line"><span style="color:#E1E4E8;">    ServiceInstanceInventory serviceInstanceInventory </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">        serviceInstanceInventoryCache.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(serviceInstanceId);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (Objects.</span><span style="color:#B392F0;">nonNull</span><span style="color:#E1E4E8;">(serviceInstanceInventory)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 更新相应服务的心跳时间(service_inventory索引中相应Document的</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// heartbeat_time字段）</span></span>
<span class="line"><span style="color:#E1E4E8;">        serviceInventoryRegister.</span><span style="color:#B392F0;">heartbeat</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">          serviceInstanceInventory.</span><span style="color:#B392F0;">getServiceId</span><span style="color:#E1E4E8;">(), heartBeatTime);</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        logger.</span><span style="color:#B392F0;">warn</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;...&quot;</span><span style="color:#E1E4E8;">, serviceInstanceId);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    responseObserver.</span><span style="color:#B392F0;">onNext</span><span style="color:#E1E4E8;">(Commands.</span><span style="color:#B392F0;">getDefaultInstance</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">    responseObserver.</span><span style="color:#B392F0;">onCompleted</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"> </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">doPing</span><span style="color:#24292E;">(ServiceInstancePingPkg request, </span></span>
<span class="line"><span style="color:#24292E;">         StreamObserver</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">Commands</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> responseObserver) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 从心跳请求中获取 serviceInstanceId</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> serviceInstanceId </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> request.</span><span style="color:#6F42C1;">getServiceInstanceId</span><span style="color:#24292E;">(); </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 心跳请求的发送时间</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> heartBeatTime </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> request.</span><span style="color:#6F42C1;">getTime</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 更新服务实例的心跳时间(service_instance_inventory索引中相应Document</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 的heartbeat_time字段） </span></span>
<span class="line"><span style="color:#24292E;">    serviceInstanceInventoryRegister.</span><span style="color:#6F42C1;">heartbeat</span><span style="color:#24292E;">(serviceInstanceId, </span></span>
<span class="line"><span style="color:#24292E;">        heartBeatTime);</span></span>
<span class="line"><span style="color:#24292E;">    ServiceInstanceInventory serviceInstanceInventory </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">        serviceInstanceInventoryCache.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(serviceInstanceId);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (Objects.</span><span style="color:#6F42C1;">nonNull</span><span style="color:#24292E;">(serviceInstanceInventory)) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 更新相应服务的心跳时间(service_inventory索引中相应Document的</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// heartbeat_time字段）</span></span>
<span class="line"><span style="color:#24292E;">        serviceInventoryRegister.</span><span style="color:#6F42C1;">heartbeat</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">          serviceInstanceInventory.</span><span style="color:#6F42C1;">getServiceId</span><span style="color:#24292E;">(), heartBeatTime);</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        logger.</span><span style="color:#6F42C1;">warn</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;...&quot;</span><span style="color:#24292E;">, serviceInstanceId);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    responseObserver.</span><span style="color:#6F42C1;">onNext</span><span style="color:#24292E;">(Commands.</span><span style="color:#6F42C1;">getDefaultInstance</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">    responseObserver.</span><span style="color:#6F42C1;">onCompleted</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>本课时紧接上一课时的内容，首先通过介绍 RegisterLockDAOImpl 的核心原理，完成了对整个服务注册流程的介绍，接下来，又介绍了服务实例注册请求、NetworkAddress 同步请求以及心跳请求的处理流程。</p>`,11);function S(F,k,q,C,b,P){const e=p("Image");return t(),r("div",null,[i,E,y,d,a(e,{alt:"image (13).png",src:"https://s0.lgstatic.com/i/image/M00/16/D1/Ciqc1F7WHyuAehevAADKLauus4I955.png"}),n(),g,v,a(e,{alt:"image (14).png",src:"https://s0.lgstatic.com/i/image/M00/16/DD/CgqCHl7WHzWAQfHPAAYFXpVpP-Y709.png"}),n(),I,a(e,{alt:"image (15).png",src:"https://s0.lgstatic.com/i/image/M00/16/DD/CgqCHl7WHz-AadgsAAFmWx71MBY433.png"}),n(),u,a(e,{alt:"image (16).png",src:"https://s0.lgstatic.com/i/image/M00/16/D1/Ciqc1F7WH0mAIjcKAAefOW_jMVc517.png"}),n(),_,m,A,D,a(e,{alt:"image (17).png",src:"https://s0.lgstatic.com/i/image/M00/16/DD/CgqCHl7WH1KASBKJAAH06v4jr4g358.png"}),n(),h])}const B=l(c,[["render",S]]);export{R as __pageData,B as default};
