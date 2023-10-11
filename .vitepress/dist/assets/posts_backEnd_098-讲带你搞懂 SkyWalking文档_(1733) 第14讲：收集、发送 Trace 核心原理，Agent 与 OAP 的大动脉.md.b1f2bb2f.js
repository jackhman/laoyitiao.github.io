import{_ as l,D as o,o as t,g as r,J as e,h as s,m as n,Q as p}from"./chunks/framework.f67d7268.js";const D=JSON.parse('{"title":"第14讲：收集、发送Trace核心原理，Agent与OAP的大动脉","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1733) 第14讲：收集、发送 Trace 核心原理，Agent 与 OAP 的大动脉.md","filePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1733) 第14讲：收集、发送 Trace 核心原理，Agent 与 OAP 的大动脉.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1733) 第14讲：收集、发送 Trace 核心原理，Agent 与 OAP 的大动脉.md"},E=n("h1",{id:"第14讲-收集、发送trace核心原理-agent与oap的大动脉",tabindex:"-1"},[s("第14讲：收集、发送Trace核心原理，Agent与OAP的大动脉 "),n("a",{class:"header-anchor",href:"#第14讲-收集、发送trace核心原理-agent与oap的大动脉","aria-label":'Permalink to "第14讲：收集、发送Trace核心原理，Agent与OAP的大动脉"'},"​")],-1),i=n("p",null,"在前面的课时中，我们深入介绍了 SkyWalking 对 Trace 基本概念的实现。本课时我们将继续深入学习 Trace 相关的 BootService 接口实现类以及 Trace 收集和发送的核心逻辑。Trace 相关的 BootService 接口实现类如下图所示：",-1),y=p(`<h4 id="contextmanager" tabindex="-1">ContextManager <a class="header-anchor" href="#contextmanager" aria-label="Permalink to &quot;ContextManager&quot;">​</a></h4><p>ContextManager 的主要职责就是管理前文介绍的 TracingContext，它会通过 ThreadLocal 将 TracingContext 对象与当前线程进行绑定，这样就实现了 TraceSegment、TracingContext 和 线程三方之间的关联。</p><p>ContextManager 有三个核心字段：</p><ul><li><strong>CONTEXT（ThreadLocal 类型）</strong><br> ：通过该字段可以将一个 TracingContext 对象与一个线程进行关联。</li><li><strong>RUNTIME_CONTEXT（ThreadLocal 类型）</strong><br> ：RuntimeContext 底层封装了一个 ConcurrentHashMap 集合，可以为当前 TracingContext 记录一些附加信息。</li><li><strong>EXTEND_SERVICE（ContextManagerExtendService 类型）</strong>：ContextManagerExtendService 也实现了 BootService 接口，它主要负责创建 TracingContext 对象。</li></ul><p>虽然 ContextManager 实现了 BootService 接口，但是其 prepare()、boot()、onComplete() 方法都为空实现。ContextManager 提供了与 TracingContext 对应的几乎所有方法，基本实现都是委托给当前线程绑定的 TracingContext 对象，这里以 createEntrySpan() 方法为例进行介绍：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> AbstractSpan </span><span style="color:#B392F0;">createEntrySpan</span><span style="color:#E1E4E8;">(String operationName,</span></span>
<span class="line"><span style="color:#E1E4E8;">         ContextCarrier carrier) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    SamplingService samplingService </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> ServiceManager.INSTANCE</span></span>
<span class="line"><span style="color:#E1E4E8;">            .</span><span style="color:#B392F0;">findService</span><span style="color:#E1E4E8;">(SamplingService.class);     </span><span style="color:#6A737D;">// 采样相关</span></span>
<span class="line"><span style="color:#E1E4E8;">    AbstractSpan span;</span></span>
<span class="line"><span style="color:#E1E4E8;">    AbstractTracerContext context;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 检测ContextCarrier是否合法，其实就是检查它的核心字段是否已填充好</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (carrier </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> carrier.</span><span style="color:#B392F0;">isValid</span><span style="color:#E1E4E8;">()) { </span></span>
<span class="line"><span style="color:#E1E4E8;">        samplingService.</span><span style="color:#B392F0;">forceSampled</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 获取当前线程绑定的TracingContext</span></span>
<span class="line"><span style="color:#E1E4E8;">        context </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getOrCreate</span><span style="color:#E1E4E8;">(operationName, </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">); </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 委托给当前线程绑定的TracingContext来创建EntrySpan</span></span>
<span class="line"><span style="color:#E1E4E8;">        span </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> context.</span><span style="color:#B392F0;">createEntrySpan</span><span style="color:#E1E4E8;">(operationName); </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 从ContextCarrier提取上游服务传播过来的Trace信息</span></span>
<span class="line"><span style="color:#E1E4E8;">        context.</span><span style="color:#B392F0;">extract</span><span style="color:#E1E4E8;">(carrier); </span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> { </span><span style="color:#6A737D;">// 没有上游服务的场景</span></span>
<span class="line"><span style="color:#E1E4E8;">        context </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getOrCreate</span><span style="color:#E1E4E8;">(operationName, </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        span </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> context.</span><span style="color:#B392F0;">createEntrySpan</span><span style="color:#E1E4E8;">(operationName);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> span;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> AbstractSpan </span><span style="color:#6F42C1;">createEntrySpan</span><span style="color:#24292E;">(String operationName,</span></span>
<span class="line"><span style="color:#24292E;">         ContextCarrier carrier) {</span></span>
<span class="line"><span style="color:#24292E;">    SamplingService samplingService </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> ServiceManager.INSTANCE</span></span>
<span class="line"><span style="color:#24292E;">            .</span><span style="color:#6F42C1;">findService</span><span style="color:#24292E;">(SamplingService.class);     </span><span style="color:#6A737D;">// 采样相关</span></span>
<span class="line"><span style="color:#24292E;">    AbstractSpan span;</span></span>
<span class="line"><span style="color:#24292E;">    AbstractTracerContext context;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 检测ContextCarrier是否合法，其实就是检查它的核心字段是否已填充好</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (carrier </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> carrier.</span><span style="color:#6F42C1;">isValid</span><span style="color:#24292E;">()) { </span></span>
<span class="line"><span style="color:#24292E;">        samplingService.</span><span style="color:#6F42C1;">forceSampled</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 获取当前线程绑定的TracingContext</span></span>
<span class="line"><span style="color:#24292E;">        context </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getOrCreate</span><span style="color:#24292E;">(operationName, </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">); </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 委托给当前线程绑定的TracingContext来创建EntrySpan</span></span>
<span class="line"><span style="color:#24292E;">        span </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> context.</span><span style="color:#6F42C1;">createEntrySpan</span><span style="color:#24292E;">(operationName); </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 从ContextCarrier提取上游服务传播过来的Trace信息</span></span>
<span class="line"><span style="color:#24292E;">        context.</span><span style="color:#6F42C1;">extract</span><span style="color:#24292E;">(carrier); </span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> { </span><span style="color:#6A737D;">// 没有上游服务的场景</span></span>
<span class="line"><span style="color:#24292E;">        context </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getOrCreate</span><span style="color:#24292E;">(operationName, </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        span </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> context.</span><span style="color:#6F42C1;">createEntrySpan</span><span style="color:#24292E;">(operationName);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> span;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>getOrCreate() 方法会从 CONTEXT 字段中获取当前线程绑定的 TracingContext 对象，如果当前线程没有关联 TracingContext 上下文，则会通过 ContextManagerExtendService 新建并绑定。</p><p>stopSpan() 方法在关闭 Span 的同时，还会检查当前 TraceSegment 是否结束，TraceSegment 结束时会将存储在 CONTEXT 中的 TracingContext 对象以及 RUNTIME_CONTEXT 中的附加信息一并清除，这也是为了防止内存泄露的一步重要操作。</p><h4 id="context-生成与采样" tabindex="-1">Context 生成与采样 <a class="header-anchor" href="#context-生成与采样" aria-label="Permalink to &quot;Context 生成与采样&quot;">​</a></h4><p>如果不做任何限制，每个请求都应该生成一条完整的 Trace。在面对海量请求时如果也同时产生海量 Trace，就会给网络和存储带来双倍的压力，浪费很多资源。为了解决这个问题，几乎所有的 Trace 系统都会支持采样的功能。SamplingService 就是用来实现采样功能的 BootService 实现。</p><p>SamplingService 的采样逻辑依赖 samplingFactorHolder 字段（AtomicInteger 类型）的自增。ContextManagerExtendService 是负责创建 TracingContext 的 BootService 实现，在 ContextManagerExtendService 创建 TracingContext 时，会调用 SamplingService 的 trySampling() 方法递增 samplingFactorHolder 字段（CAS 操作），当增加到阈值（默认值为 3，可以通过 agent.sample_n_per_3_secs 配置进行修改）时会返回 false，表示采样失败，这时 ContextManagerExtendService 就会生成 IgnoredTracerContext，IgnoredTracerContext 是个空 Context 实现，不会记录 Trace 信息。</p><p>另外，SamplingService 中会启动一个定时任务，每秒都会将 samplingFactorHolder 字段清零，这样就实现了每秒采样指定条数的 Trace 数据，如下图所示：</p>`,12),g=p(`<h4 id="trace-的收集" tabindex="-1">Trace 的收集 <a class="header-anchor" href="#trace-的收集" aria-label="Permalink to &quot;Trace 的收集&quot;">​</a></h4><p>这里我们先来回顾一个知识点，当 TracingContext 通过 stopSpan() 方法关闭最后一个 Span 时，会调用 finish() 方法关闭相应的 TraceSegment，与此同时，还会调用 TracingContext.ListenerManager.notifyFinish() 方法通知所有监听 TracingContext 关闭事件的监听器 ------ TracingContextListener。TracingContext.finish() 方法的相关实现如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">finish</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    TraceSegment finishedSegment </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">          segment.</span><span style="color:#B392F0;">finish</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">isLimitMechanismWorking</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">    TracingContext.ListenerManager.</span><span style="color:#B392F0;">notifyFinish</span><span style="color:#E1E4E8;">(finishedSegment);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">finish</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    TraceSegment finishedSegment </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">          segment.</span><span style="color:#6F42C1;">finish</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">isLimitMechanismWorking</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">    TracingContext.ListenerManager.</span><span style="color:#6F42C1;">notifyFinish</span><span style="color:#24292E;">(finishedSegment);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>TraceSegmentServiceClient 是 TracingContextListener 接口的唯一实现，其主要功能就是在 TraceSegment 结束时对其进行收集，并发送到后端的 OAP 集群。</p><p>下图展示了 TraceSegmentServiceClient 的核心结构：</p>`,5),m=p(`<p>TraceSegmentServiceClient 底层维护了一个 DataCarrier 对象，其底层 Channels 默认有 5 个 Buffer，每个 Buffer 长度为 300，使用的是 IF_POSSIBLE 阻塞写入策略，底层会启动一个 ConsumerThread 线程。</p><p>TraceSegmentServiceClient 作为一个 TracingContextListener 接口的实现，会在 notifyFinish() 方法中，将刚刚结束的 TraceSegment 写入到 DataCarrier 中缓存。同时，TraceSegmentServiceClient 实现了前面介绍的 IConsumer 接口，封装了消费 Channels 中数据的逻辑，在 consume() 方法中会首先将消费到的 TraceSegment 对象序列化，然后通过 gRPC 请求发送到后端 OAP 集群。该过程涉及的 gRPC 接口定义如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">service TraceSegmentReportService {</span></span>
<span class="line"><span style="color:#E1E4E8;">    rpc </span><span style="color:#B392F0;">collect</span><span style="color:#E1E4E8;"> (stream UpstreamSegment) </span><span style="color:#B392F0;">returns</span><span style="color:#E1E4E8;"> (Commands) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">service TraceSegmentReportService {</span></span>
<span class="line"><span style="color:#24292E;">    rpc </span><span style="color:#6F42C1;">collect</span><span style="color:#24292E;"> (stream UpstreamSegment) </span><span style="color:#6F42C1;">returns</span><span style="color:#24292E;"> (Commands) {</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>该 gRPC 请求中用到的 UpstreamSegment 结构体包含了 Trace ID 以及 TraceSegment 序列化之后的字节数组，定义如下所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">message UpstreamSegment {</span></span>
<span class="line"><span style="color:#E1E4E8;">    repeated UniqueId globalTraceIds </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    bytes segment </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">// TraceSegment信息</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">message UpstreamSegment {</span></span>
<span class="line"><span style="color:#24292E;">    repeated UniqueId globalTraceIds </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    bytes segment </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">// TraceSegment信息</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这个过程中，TraceSegment 对象会转换成相应的 proto 结构体实例，下图展示了 UpstreamSegment 中包含的具体信息：</p>`,6),C=p(`<p>既然要发送 gRPC 请求，就必然要依赖网络连接，TraceSegmentServiceClient 实现了 GRPCChannelListener 接口，可以监听底层网络连接的变化情况。在 prepare() 方法中可将其作为 Listener 注册到前文介绍的 GRPCChannelManager 中。</p><p>明确了发送 Trace 时的具体数据，以及其涉及的 gRPC 请求和接口定义，我们再来看 consume() 方法的具体实现：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">consume</span><span style="color:#E1E4E8;">(List</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">TraceSegment</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> data) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (CONNECTED.</span><span style="color:#B392F0;">equals</span><span style="color:#E1E4E8;">(status)) { </span><span style="color:#6A737D;">// 根据底层网络连接的状态决定是否发送</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 创建GRPCStreamServiceStatus对象</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> GRPCStreamServiceStatus status </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">             </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">GRPCStreamServiceStatus</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        StreamObserver</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">UpstreamSegment</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> upstreamSegmentStreamObserver</span></span>
<span class="line"><span style="color:#E1E4E8;">               </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> serviceStub.</span><span style="color:#B392F0;">collect</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> StreamObserver&lt;</span><span style="color:#F97583;">Commands</span><span style="color:#E1E4E8;">&gt;() {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">onNext</span><span style="color:#E1E4E8;">(Commands </span><span style="color:#FFAB70;">commands</span><span style="color:#E1E4E8;">) {}</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">onError</span><span style="color:#E1E4E8;">(Throwable </span><span style="color:#FFAB70;">throwable</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">// 发生异常会调用 finished()方法，停止等待</span></span>
<span class="line"><span style="color:#E1E4E8;">                status.</span><span style="color:#B392F0;">finished</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">// 通知GRPCChannelManager重新创建网络连接</span></span>
<span class="line"><span style="color:#E1E4E8;">                ServiceManager.INSTANCE.</span><span style="color:#B392F0;">findService</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">                   GRPCChannelManager.class).</span><span style="color:#B392F0;">reportError</span><span style="color:#E1E4E8;">(throwable);</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">onCompleted</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">// 发送成功之后，会调用finished()方法结束等待</span></span>
<span class="line"><span style="color:#E1E4E8;">                status.</span><span style="color:#B392F0;">finished</span><span style="color:#E1E4E8;">(); </span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        });</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (TraceSegment segment </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> data) { </span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 将TraceSegment转换成UpstreamSegment对象，然后才能进行序列化以</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 及发送操作transform()方法实现的转换逻辑并不复杂，填充字段而已</span></span>
<span class="line"><span style="color:#E1E4E8;">            UpstreamSegment upstreamSegment </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> segment.</span><span style="color:#B392F0;">transform</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            upstreamSegmentStreamObserver.</span><span style="color:#B392F0;">onNext</span><span style="color:#E1E4E8;">(upstreamSegment);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        upstreamSegmentStreamObserver.</span><span style="color:#B392F0;">onCompleted</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        status.</span><span style="color:#B392F0;">wait4Finish</span><span style="color:#E1E4E8;">(); </span><span style="color:#6A737D;">// 等待全部TraceSegment数据发送结束</span></span>
<span class="line"><span style="color:#E1E4E8;">        segmentUplinkedCounter </span><span style="color:#F97583;">+=</span><span style="color:#E1E4E8;"> data.</span><span style="color:#B392F0;">size</span><span style="color:#E1E4E8;">(); </span><span style="color:#6A737D;">// 统计发送的数据量</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> { </span><span style="color:#6A737D;">// 网络连接断开时，只进行简单统计，数据将被直接抛弃</span></span>
<span class="line"><span style="color:#E1E4E8;">        segmentAbandonedCounter </span><span style="color:#F97583;">+=</span><span style="color:#E1E4E8;"> data.</span><span style="color:#B392F0;">size</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">printUplinkStatus</span><span style="color:#E1E4E8;">(); </span><span style="color:#6A737D;">// 每隔 30s打印一下发送日志</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">consume</span><span style="color:#24292E;">(List</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">TraceSegment</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> data) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (CONNECTED.</span><span style="color:#6F42C1;">equals</span><span style="color:#24292E;">(status)) { </span><span style="color:#6A737D;">// 根据底层网络连接的状态决定是否发送</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 创建GRPCStreamServiceStatus对象</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> GRPCStreamServiceStatus status </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">             </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">GRPCStreamServiceStatus</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">false</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        StreamObserver</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">UpstreamSegment</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> upstreamSegmentStreamObserver</span></span>
<span class="line"><span style="color:#24292E;">               </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> serviceStub.</span><span style="color:#6F42C1;">collect</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> StreamObserver&lt;</span><span style="color:#D73A49;">Commands</span><span style="color:#24292E;">&gt;() {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">onNext</span><span style="color:#24292E;">(Commands </span><span style="color:#E36209;">commands</span><span style="color:#24292E;">) {}</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">onError</span><span style="color:#24292E;">(Throwable </span><span style="color:#E36209;">throwable</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">// 发生异常会调用 finished()方法，停止等待</span></span>
<span class="line"><span style="color:#24292E;">                status.</span><span style="color:#6F42C1;">finished</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">// 通知GRPCChannelManager重新创建网络连接</span></span>
<span class="line"><span style="color:#24292E;">                ServiceManager.INSTANCE.</span><span style="color:#6F42C1;">findService</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">                   GRPCChannelManager.class).</span><span style="color:#6F42C1;">reportError</span><span style="color:#24292E;">(throwable);</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">onCompleted</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">// 发送成功之后，会调用finished()方法结束等待</span></span>
<span class="line"><span style="color:#24292E;">                status.</span><span style="color:#6F42C1;">finished</span><span style="color:#24292E;">(); </span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        });</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (TraceSegment segment </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> data) { </span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 将TraceSegment转换成UpstreamSegment对象，然后才能进行序列化以</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 及发送操作transform()方法实现的转换逻辑并不复杂，填充字段而已</span></span>
<span class="line"><span style="color:#24292E;">            UpstreamSegment upstreamSegment </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> segment.</span><span style="color:#6F42C1;">transform</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            upstreamSegmentStreamObserver.</span><span style="color:#6F42C1;">onNext</span><span style="color:#24292E;">(upstreamSegment);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        upstreamSegmentStreamObserver.</span><span style="color:#6F42C1;">onCompleted</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        status.</span><span style="color:#6F42C1;">wait4Finish</span><span style="color:#24292E;">(); </span><span style="color:#6A737D;">// 等待全部TraceSegment数据发送结束</span></span>
<span class="line"><span style="color:#24292E;">        segmentUplinkedCounter </span><span style="color:#D73A49;">+=</span><span style="color:#24292E;"> data.</span><span style="color:#6F42C1;">size</span><span style="color:#24292E;">(); </span><span style="color:#6A737D;">// 统计发送的数据量</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> { </span><span style="color:#6A737D;">// 网络连接断开时，只进行简单统计，数据将被直接抛弃</span></span>
<span class="line"><span style="color:#24292E;">        segmentAbandonedCounter </span><span style="color:#D73A49;">+=</span><span style="color:#24292E;"> data.</span><span style="color:#6F42C1;">size</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">printUplinkStatus</span><span style="color:#24292E;">(); </span><span style="color:#6A737D;">// 每隔 30s打印一下发送日志</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>注意，TraceSegmentServiceClient 在批量发送完 UpstreamSegment 数据之后，会通过 GRPCStreamServiceStatus 进行自旋等待，直至该批 UpstreamSegment 全部发送完毕。</p><p>最后总结一下，TraceSegmentServiceClient 同时实现了 BootService、IConsumer、GRPCChannelListener、TracingContextListener 四个接口，如下图所示，这四个接口的实现相互依赖，共同完成 Trace 数据的收集和发送：</p>`,5),S=n("h4",{id:"总结",tabindex:"-1"},[s("总结 "),n("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),d=n("p",null,"本课时我们重点介绍了 Trace 相关的 BootService 接口实现。首先介绍了 ContextManager 的核心实现，理清了它是如何将 TracingContext 与当前线程关联起来的。接下来介绍了 SamplingService 实现客户端 Trace 采样的逻辑。最后介绍了上报 Trace 的 gRPC 接口，深入分析了 TraceSegmentServiceClient 收集和上报 Trace 数据的核心逻辑。",-1);function T(A,F,h,v,_,u){const a=o("Image");return t(),r("div",null,[E,i,e(a,{alt:"sw0.png",src:"https://s0.lgstatic.com/i/image3/M01/14/4A/Ciqah16hMVaAatgbAABGB3yEwak805.png"}),s(),y,e(a,{alt:"sw1.png",src:"https://s0.lgstatic.com/i/image3/M01/14/49/Ciqah16hMHmAT7-VAALHNKUBOhU815.png"}),s(),g,e(a,{alt:"sw2.png",src:"https://s0.lgstatic.com/i/image3/M01/14/4A/Ciqah16hMNGAO2HOAAEZleWtX24011.png"}),s(),m,e(a,{alt:"sw3.png",src:"https://s0.lgstatic.com/i/image3/M01/14/4A/Ciqah16hMPmAaAOWAAPeM8ggypA230.png"}),s(),C,e(a,{alt:"sw4.png",src:"https://s0.lgstatic.com/i/image3/M01/07/1B/CgoCgV6hMS2AQpyZAAFcVM04dCk973.png"}),s(),S,d])}const b=l(c,[["render",T]]);export{D as __pageData,b as default};
