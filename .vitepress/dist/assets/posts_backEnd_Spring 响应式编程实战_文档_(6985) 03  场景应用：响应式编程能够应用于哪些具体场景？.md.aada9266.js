import{_ as p,j as o,o as e,g as t,k as n,h as l,Q as s}from"./chunks/framework.4e7d56ce.js";const _=JSON.parse('{"title":"03场景应用：响应式编程能够应用于哪些具体场景？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring 响应式编程实战_文档/(6985) 03  场景应用：响应式编程能够应用于哪些具体场景？.md","filePath":"posts/backEnd/Spring 响应式编程实战_文档/(6985) 03  场景应用：响应式编程能够应用于哪些具体场景？.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/Spring 响应式编程实战_文档/(6985) 03  场景应用：响应式编程能够应用于哪些具体场景？.md"},c=s('<h1 id="_03场景应用-响应式编程能够应用于哪些具体场景" tabindex="-1">03场景应用：响应式编程能够应用于哪些具体场景？ <a class="header-anchor" href="#_03场景应用-响应式编程能够应用于哪些具体场景" aria-label="Permalink to &quot;03场景应用：响应式编程能够应用于哪些具体场景？&quot;">​</a></h1><p>通过上一讲的学习，相信你已经掌握了响应式编程中的几个核心概念，即响应式流、背压机制以及响应式流规范，这些概念是理解后续课程内容的基础。</p><p>而在介绍基于 Spring 框架的响应式编程技术之前，你可能会有疑问：响应式编程能够应用到那些具体的场景呢？目前有哪些框架中使用到了这一新型的技术体系呢？这一讲我将为你解答这些疑问。</p><h3 id="响应式编程的应用场景分析" tabindex="-1">响应式编程的应用场景分析 <a class="header-anchor" href="#响应式编程的应用场景分析" aria-label="Permalink to &quot;响应式编程的应用场景分析&quot;">​</a></h3><p>本质上，我们可以认为响应式编程并不仅仅是一种编程技术，而更是一种架构设计的系统方法，因此可以应用于任何地方。它既可以用于简单的 Web 应用系统，也可以用于大型企业解决方案。当然，对于响应式数据流，我们也完全可以基于它来构建流式系统或大数据系统。</p><p>数据流处理是响应式编程的一大应用场景。流式系统的主要特点是低延迟和高吞吐量。对于这类系统，大多数数据是从服务器端传出的，因此客户端扮演消费者的角色。这个时候，通过使用非阻塞式通信可以确保资源得到高效的利用，从而实现低延迟和高吞吐量。流式系统的表现形式也可以有很多，日常的日志埋点和分析、服务运行时的状态采集等都属于这种类型。</p><p>针对高并发流量，通常涉及大量的 I/O 操作。相较于传统的同步阻塞式 I/O 模型，响应式编程所具备的异步非阻塞式 I/O 模型非常适合应对处理高并发流量的业务场景。这类场景中比较典型的一种表现形式就是微服务架构中的 API 网关，因为网关的作用就是用来响应来自前端系统的流量并将其转发到后端服务。</p><p>讲到微服务架构，如何构建一个具有异步非阻塞式的请求处理流程的 Web 服务也是核心诉求，我们需要高效处理跨服务之间的网络请求。针对这种场景，响应式编程及其相关技术体系同样也是一种非常有效的解决方案。</p><h3 id="响应式编程在主流开源框架中的应用" tabindex="-1">响应式编程在主流开源框架中的应用 <a class="header-anchor" href="#响应式编程在主流开源框架中的应用" aria-label="Permalink to &quot;响应式编程在主流开源框架中的应用&quot;">​</a></h3><p>响应式编程在日常开发过程中日益得到广泛的应用，结合上文所分析的三种典型应用场景，这里我们以对应的 Netflix Hystrix、Spring Cloud Gateway 以及 Spring WebFlux 这三款主流的开源框架为例，解析这些框架背后所应用的响应式编程技术。</p><h4 id="netflix-hystrix-中的滑动窗口" tabindex="-1">Netflix Hystrix 中的滑动窗口 <a class="header-anchor" href="#netflix-hystrix-中的滑动窗口" aria-label="Permalink to &quot;Netflix Hystrix 中的滑动窗口&quot;">​</a></h4><p>在 Spring Cloud 微服务开发框架中，存在一个 Spring Cloud Netflix Hystrix 组件，该组件基于 Netflix Hystrix 实现了服务熔断功能。Netflix Hystrix 是 Netflix 开源的一款容错库，使用了 HystrixCircuitBreaker 类来实现熔断器。该类通过一个 circuitOpen 状态位控制着整个熔断判断流程，而这个状态位本身的状态值则取决于系统目前的执行数据和健康指标。</p><p>那么，HystrixCircuitBreaker 如何动态获取系统运行时的各项数据呢？这里就使用到了一个 HealthCountsStream 类，从命名上不难看出，这就是一种数据流。HealthCountsStream 在设计上采用了一种特定的机制，即滑动窗口（Rolling Window）机制，而 Hystrix 在实现这一机制时大量采用了数据流处理方面的技术以及 RxJava 这个响应式编程框架。</p><p>Hystrix 以秒为单位来统计系统中所有请求的处理情况，然后每次取最近 10 秒的数据来进行计算。如果失败率超过一定阈值，就进行熔断。这里的 10 秒就是一个滑动窗口，参考其官网的一幅图，如下所示。</p>',14),E=s(`<p>图 1 Hystrix 滑动窗口效果图（来自 Hystrix 官网）</p><p>上图演示了 Hystrix 滑动窗口策略，把 10 秒时间拆分成了 10 个格子，我们把这种格子称为桶 Bucket。每个桶中的数据就是这一秒中所处理的请求数量，并针对处理结果的状态做了分类。然后每当收集好一个新的桶后，就会丢弃掉最旧的一个桶，所以窗口是滑动的。</p><p>那么如何来实现这个滑动窗口呢？我们转换一下思路，可以把系统运行时所产生的所有数据都视为一个个的事件，这样滑动窗口中每个桶的数据都来自源源不断的事件。同时，对于这些生成的事件，我们通常需要对其进行转换以便进行后续的操作。这两点构成了实现滑动窗口的设计目标和方法。</p><p>在技术实现的选型上，Hystrix 采用了基于响应式编程思想的 RxJava。与其他响应式编程框架一样，RxJava 同样实现了上一讲中介绍的响应式流规范。使用 RxJava 的一大好处是可以通过 RxJava 的一系列操作符来实现滑动窗口，包括 window、flatMap 和 reduce 等。其中 window 操作符是把当前流中的元素收集到另外的流序列；flatMap 操作符把流中的每个元素转换成一个流，再把转换之后得到的所有流中的元素进行合并。而后 reduce 操作符对流中包含的所有元素进行累积操作，得到一个包含计算结果的流。这些操作符我会在&quot;07 | Reactor 操作符（上）：如何快速转换响应式流&quot;中详细为你介绍。</p><p>在 Hystrix 中，HealthCountsStream 的子类 BucketedCounterStream 将基础数据事件流汇总成 Bucket，如下所示。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.bucketedStream </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Observable.</span><span style="color:#B392F0;">defer</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> Func0&lt;Observable&lt;</span><span style="color:#F97583;">Bucket</span><span style="color:#E1E4E8;">&gt;&gt;() {</span></span>
<span class="line"><span style="color:#E1E4E8;">            @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> Observable&lt;</span><span style="color:#F97583;">Bucket</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#B392F0;">call</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> inputEventStream</span></span>
<span class="line"><span style="color:#E1E4E8;">                        .</span><span style="color:#B392F0;">observe</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">// 使用window操作符收集一个Bucket时间内的数据</span></span>
<span class="line"><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">window</span><span style="color:#E1E4E8;">(bucketSizeInMs, TimeUnit.MILLISECONDS) </span></span>
<span class="line"><span style="color:#6A737D;">// 将每个window内聚集起来的事件集合汇总成Bucket</span></span>
<span class="line"><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">flatMap</span><span style="color:#E1E4E8;">(reduceBucketToSummary).</span><span style="color:#B392F0;">startWith</span><span style="color:#E1E4E8;">(emptyEventCountsToStart);                       }</span></span>
<span class="line"><span style="color:#E1E4E8;">	        });</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">this</span><span style="color:#24292E;">.bucketedStream </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Observable.</span><span style="color:#6F42C1;">defer</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> Func0&lt;Observable&lt;</span><span style="color:#D73A49;">Bucket</span><span style="color:#24292E;">&gt;&gt;() {</span></span>
<span class="line"><span style="color:#24292E;">            @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> Observable&lt;</span><span style="color:#D73A49;">Bucket</span><span style="color:#24292E;">&gt; </span><span style="color:#6F42C1;">call</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> inputEventStream</span></span>
<span class="line"><span style="color:#24292E;">                        .</span><span style="color:#6F42C1;">observe</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">// 使用window操作符收集一个Bucket时间内的数据</span></span>
<span class="line"><span style="color:#24292E;">.</span><span style="color:#6F42C1;">window</span><span style="color:#24292E;">(bucketSizeInMs, TimeUnit.MILLISECONDS) </span></span>
<span class="line"><span style="color:#6A737D;">// 将每个window内聚集起来的事件集合汇总成Bucket</span></span>
<span class="line"><span style="color:#24292E;">.</span><span style="color:#6F42C1;">flatMap</span><span style="color:#24292E;">(reduceBucketToSummary).</span><span style="color:#6F42C1;">startWith</span><span style="color:#24292E;">(emptyEventCountsToStart);                       }</span></span>
<span class="line"><span style="color:#24292E;">	        });</span></span></code></pre></div><p>可以看到，这里分别使用了前面介绍的 window 和 flatMap 操作符来完成 Bucket 的构建。请注意，该方法返回的是一个 Observable<code>&lt;Bucket&gt;</code> 对象。在 RxJava 中，Observable 代表的就是一个无限流对象。</p><p>我们再来看 BucketedCounterStream 的子类 BucketedRollingCounterStream 类，该类的构造函数中同样存在一个类似的方法，如下所示（为了避免过于复杂，裁剪了部分代码）。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.sourceStream </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> bucketedStream</span></span>
<span class="line"><span style="color:#E1E4E8;">	 </span><span style="color:#6A737D;">//将N个Bucket进行汇总</span></span>
<span class="line"><span style="color:#E1E4E8;">	.</span><span style="color:#B392F0;">window</span><span style="color:#E1E4E8;">(numBuckets, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#6A737D;">//汇总成一个窗口</span></span>
<span class="line"><span style="color:#E1E4E8;">	.</span><span style="color:#B392F0;">flatMap</span><span style="color:#E1E4E8;">(reduceWindowToSummary) </span></span>
<span class="line"><span style="color:#E1E4E8;">     ...</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#6A737D;">//添加背压控制</span></span>
<span class="line"><span style="color:#E1E4E8;">	.</span><span style="color:#B392F0;">onBackpressureDrop</span><span style="color:#E1E4E8;">();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">this</span><span style="color:#24292E;">.sourceStream </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> bucketedStream</span></span>
<span class="line"><span style="color:#24292E;">	 </span><span style="color:#6A737D;">//将N个Bucket进行汇总</span></span>
<span class="line"><span style="color:#24292E;">	.</span><span style="color:#6F42C1;">window</span><span style="color:#24292E;">(numBuckets, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6A737D;">//汇总成一个窗口</span></span>
<span class="line"><span style="color:#24292E;">	.</span><span style="color:#6F42C1;">flatMap</span><span style="color:#24292E;">(reduceWindowToSummary) </span></span>
<span class="line"><span style="color:#24292E;">     ...</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#6A737D;">//添加背压控制</span></span>
<span class="line"><span style="color:#24292E;">	.</span><span style="color:#6F42C1;">onBackpressureDrop</span><span style="color:#24292E;">();</span></span></code></pre></div><p>上述方法中基于父类 BucketedCounterStream 已经汇总的 bucketedStream 进行开窗处理，从而获取一个 sourceStream，这个 sourceStream 就是滑动窗口的最终形态。最后的 onBackpressureDrop() 语句是 RxJava 中提供的一种背压机制。我们在上一讲中讨论了背压机制的概念和作用，而在这里就看到了这一机制的具体应用。</p><p>作为总结，Hystrix 巧妙地运用了 RxJava 中的 window、flatMap 等操作符来将单位窗口时间内的事件，以及将一个窗口大小内的 Bucket 聚集到一起形成滑动窗口，并基于滑动窗口集成指标数据。这个设计思想非常巧妙，值得我们深入研究并对基于流的处理过程加以尝试和应用。</p><h4 id="spring-cloud-gateway-中的过滤器" tabindex="-1">Spring Cloud Gateway 中的过滤器 <a class="header-anchor" href="#spring-cloud-gateway-中的过滤器" aria-label="Permalink to &quot;Spring Cloud Gateway 中的过滤器&quot;">​</a></h4><p>Spring Cloud Gateway 是 Spring Cloud 微服务开发框架中的另一个核心组件，是 Spring 官方自己开发的一款 API 网关。在技术体系上，Spring Cloud Gateway 基于最新的 Spring 5 和 Spring Boot 2，以及用于响应式编程的 Project Reactor 框架，提供的是响应式、非阻塞式 I/O 模型。所以性能上比 Netflix 中的 Zuul 网关要更胜一筹。</p><p>Spring Cloud Gateway 中的核心概念就是过滤器（Filter），围绕过滤器的请求处理流程如下图所示。</p>`,14),y=s(`<p>图 2 Spring Cloud Gateway 中的过滤器架构</p><p>过滤器用于在响应 HTTP 请求之前或之后修改请求本身及对应的响应结果。Spring Cloud Gateway 中提供了一个全局过滤器（GlobalFilter）的概念，对所有路由都生效。我们来演示一下如何使用全局过滤器来对所有 HTTP 请求进行拦截，具体做法是实现 GlobalFilter 接口，示例代码如下所示。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Configuration</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">JWTAuthFilter</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">GlobalFilter</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> Mono&lt;</span><span style="color:#F97583;">Void</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#B392F0;">filter</span><span style="color:#E1E4E8;">(ServerWebExchange </span><span style="color:#FFAB70;">exchange</span><span style="color:#E1E4E8;">, GatewayFilterChain </span><span style="color:#FFAB70;">chain</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        ServerHttpRequest.Builder builder </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> exchange.</span><span style="color:#B392F0;">getRequest</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">mutate</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        builder.</span><span style="color:#B392F0;">header</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Authorization&quot;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&quot;Token&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> chain.</span><span style="color:#B392F0;">filter</span><span style="color:#E1E4E8;">(exchange.</span><span style="color:#B392F0;">mutate</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">request</span><span style="color:#E1E4E8;">(builder.</span><span style="color:#B392F0;">build</span><span style="color:#E1E4E8;">()).</span><span style="color:#B392F0;">build</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Configuration</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">JWTAuthFilter</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">GlobalFilter</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> Mono&lt;</span><span style="color:#D73A49;">Void</span><span style="color:#24292E;">&gt; </span><span style="color:#6F42C1;">filter</span><span style="color:#24292E;">(ServerWebExchange </span><span style="color:#E36209;">exchange</span><span style="color:#24292E;">, GatewayFilterChain </span><span style="color:#E36209;">chain</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        ServerHttpRequest.Builder builder </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> exchange.</span><span style="color:#6F42C1;">getRequest</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">mutate</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        builder.</span><span style="color:#6F42C1;">header</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Authorization&quot;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&quot;Token&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> chain.</span><span style="color:#6F42C1;">filter</span><span style="color:#24292E;">(exchange.</span><span style="color:#6F42C1;">mutate</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">request</span><span style="color:#24292E;">(builder.</span><span style="color:#6F42C1;">build</span><span style="color:#24292E;">()).</span><span style="color:#6F42C1;">build</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>以上代码展示了如何利用全局过滤器在所有的请求中添加 Header 的实现方法。在这个示例中，我们对所有经过 API 网关的 HTTP 请求添加了一个消息头，用来设置与访问 Token 相关的安全认证信息。</p><p>请注意，这里的 filter 方法返回了一个 Mono 对象，你可能会问这个 Mono 对象究竟是什么呢？事实上，这是在响应式编程框架 Project Reactor 中代表单个返回值的流式对象。我们将在&quot;05 | 顶级框架：Spring 为什么选择 Reactor 作为响应式编程框架&quot;对 Mono 对象进行详细的探讨。</p><p>我们再来看一个使用过滤器的场景。以下代码展示了一个用于处理响应的 PostGatewayFilter 的实现方式，其中首先继承一个 AbstractGatewayFilterFactory 类，然后可以通过覆写 apply 方法来提供针对 ServerHttpResponse 对象的任何操作。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PostGatewayFilterFactory</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AbstractGatewayFilterFactory</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PostGatewayFilterFactory</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">(Config.class);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> GatewayFilter </span><span style="color:#B392F0;">apply</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">apply</span><span style="color:#E1E4E8;">(o </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        });</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> GatewayFilter </span><span style="color:#B392F0;">apply</span><span style="color:#E1E4E8;">(Config </span><span style="color:#FFAB70;">config</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (exchange, chain) </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> chain.</span><span style="color:#B392F0;">filter</span><span style="color:#E1E4E8;">(exchange).</span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">(Mono.</span><span style="color:#B392F0;">fromRunnable</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">              ServerHttpResponse response </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> exchange.</span><span style="color:#B392F0;">getResponse</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#6A737D;">//针对Response的各种处理</span></span>
<span class="line"><span style="color:#E1E4E8;">            }));</span></span>
<span class="line"><span style="color:#E1E4E8;">          };</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Config</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PostGatewayFilterFactory</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AbstractGatewayFilterFactory</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PostGatewayFilterFactory</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">(Config.class);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> GatewayFilter </span><span style="color:#6F42C1;">apply</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">apply</span><span style="color:#24292E;">(o </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        });</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> GatewayFilter </span><span style="color:#6F42C1;">apply</span><span style="color:#24292E;">(Config </span><span style="color:#E36209;">config</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (exchange, chain) </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> chain.</span><span style="color:#6F42C1;">filter</span><span style="color:#24292E;">(exchange).</span><span style="color:#6F42C1;">then</span><span style="color:#24292E;">(Mono.</span><span style="color:#6F42C1;">fromRunnable</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">              ServerHttpResponse response </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> exchange.</span><span style="color:#6F42C1;">getResponse</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#6A737D;">//针对Response的各种处理</span></span>
<span class="line"><span style="color:#24292E;">            }));</span></span>
<span class="line"><span style="color:#24292E;">          };</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Config</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>同样，注意这里使用了 Reactor 框架中的 then 操作符，该操作符的含义是等到上一个操作完成再做下一个。所以，我们在过滤器链执行完对 exchange 对象的过滤之后，再通过 Mono.fromRunnable 方法创建一个新的线程，可以在这里添加各种针对 Response 对象的处理过程。</p><h4 id="spring-webflux-中的请求处理流程" tabindex="-1">Spring WebFlux 中的请求处理流程 <a class="header-anchor" href="#spring-webflux-中的请求处理流程" aria-label="Permalink to &quot;Spring WebFlux 中的请求处理流程&quot;">​</a></h4><p>Spring WebFlux 是 Spring 5 中引入的全新的响应式 Web 服务开发框架。针对涉及大量 I/O 操作的服务化架构，WebFlux 也是一种非常有效的解决方案，能够在复杂的流程中集成非阻塞、异步通信机制，从而实现高效处理跨服务之间的网络请求。</p><p>在 WebFlux 中，对 HTTP 请求的处理过程涉及了 HandlerMapping、HandlerAdapter、HandlerResultHandler 类之间的交互，整个流程如下图所示。</p>`,11),i=s(`<p>图 3 WebFlux 处理 HTTP 请求的流程图</p><p>我们直接来看用于完成上图流程的 Handle 方法定义，该方法实现了流式处理请求机制，如下所示。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> Mono</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">Void</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">handle</span><span style="color:#E1E4E8;">(ServerWebExchange exchange) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.handlerMappings </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createNotFoundError</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> Flux.</span><span style="color:#B392F0;">fromIterable</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.handlerMappings)</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">//从handlerMapping这个map中获取HandlerMapping</span></span>
<span class="line"><span style="color:#E1E4E8;">                .</span><span style="color:#B392F0;">concatMap</span><span style="color:#E1E4E8;">(mapping </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> mapping.</span><span style="color:#B392F0;">getHandler</span><span style="color:#E1E4E8;">(exchange))</span></span>
<span class="line"><span style="color:#E1E4E8;">                .</span><span style="color:#B392F0;">next</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">//如果没有找到HandlerMapping，则抛出异常</span></span>
<span class="line"><span style="color:#E1E4E8;">                .</span><span style="color:#B392F0;">switchIfEmpty</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">createNotFoundError</span><span style="color:#E1E4E8;">())</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">//触发HandlerAdapter的handle方法</span></span>
<span class="line"><span style="color:#E1E4E8;">                .</span><span style="color:#B392F0;">flatMap</span><span style="color:#E1E4E8;">(handler </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">invokeHandler</span><span style="color:#E1E4E8;">(exchange, handler))</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">//触发HandlerResultHandler 的handleResult方法</span></span>
<span class="line"><span style="color:#E1E4E8;">                .</span><span style="color:#B392F0;">flatMap</span><span style="color:#E1E4E8;">(result </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">handleResult</span><span style="color:#E1E4E8;">(exchange, result));</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> Mono</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">Void</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">handle</span><span style="color:#24292E;">(ServerWebExchange exchange) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.handlerMappings </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createNotFoundError</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> Flux.</span><span style="color:#6F42C1;">fromIterable</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.handlerMappings)</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">//从handlerMapping这个map中获取HandlerMapping</span></span>
<span class="line"><span style="color:#24292E;">                .</span><span style="color:#6F42C1;">concatMap</span><span style="color:#24292E;">(mapping </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> mapping.</span><span style="color:#6F42C1;">getHandler</span><span style="color:#24292E;">(exchange))</span></span>
<span class="line"><span style="color:#24292E;">                .</span><span style="color:#6F42C1;">next</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">//如果没有找到HandlerMapping，则抛出异常</span></span>
<span class="line"><span style="color:#24292E;">                .</span><span style="color:#6F42C1;">switchIfEmpty</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">createNotFoundError</span><span style="color:#24292E;">())</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">//触发HandlerAdapter的handle方法</span></span>
<span class="line"><span style="color:#24292E;">                .</span><span style="color:#6F42C1;">flatMap</span><span style="color:#24292E;">(handler </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">invokeHandler</span><span style="color:#24292E;">(exchange, handler))</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">//触发HandlerResultHandler 的handleResult方法</span></span>
<span class="line"><span style="color:#24292E;">                .</span><span style="color:#6F42C1;">flatMap</span><span style="color:#24292E;">(result </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">handleResult</span><span style="color:#24292E;">(exchange, result));</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>在这个核心方法中，我们看到了 concatMap、switchIfEmpty 和 flatMap 等响应式操作符。其中的 flatMap 操作符我们在前面已经讨论过。关于这些操作符的具体使用方法，我同样会在第 7 讲为你详细介绍。</p><h3 id="小结与预告" tabindex="-1">小结与预告 <a class="header-anchor" href="#小结与预告" aria-label="Permalink to &quot;小结与预告&quot;">​</a></h3><p>那么今天就先聊到这里了。在这一讲中，我们通过理论联系实际，讨论了响应式编程的具体应用场景。通过今天内容的介绍，你不难发现响应式编程技术已经应用到了日常开发的很多开源框架中，包括 Netflix Hystrix、Spring Cloud Gateway 以及 Spring WebFlux 等。这些框架在分布式系统和微服务架构中得到了广泛的应用，而响应式编程在这些框架中发挥着重要作用。</p><p>这里同样给你留一道思考题：你能简要阐述一下 Netflix Hystrix 中基于响应式流的滑动窗口实现机制吗？</p><p>在了解了响应式编程的应用场景之后，下一讲让我们回到 Spring 框架，讨论 Spring 框架中的响应式编程技术，以及如何通过案例来学习响应式 Spring。到时见。</p><blockquote><p>点击链接，获取课程相关代码↓↓↓<br><a href="https://github.com/lagoueduCol/ReactiveProgramming-jianxiang.git?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">https://github.com/lagoueduCol/ReactiveProgramming-jianxiang.git</a></p></blockquote>`,9);function u(d,F,g,h,b,C){const a=o("Image");return e(),t("div",null,[c,n(a,{alt:"图片0.png",src:"https://s0.lgstatic.com/i/image6/M00/24/07/Cgp9HWBYDkqAfjLrAAImzCk-l7s672.png"}),l(),E,n(a,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M00/24/07/Cgp9HWBYDj6AFo0eAACtCU1brX4578.png"}),l(),y,n(a,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image6/M00/24/04/CioPOWBYDjGAP5oHAADrAy1HQHE514.png"}),l(),i])}const x=p(r,[["render",u]]);export{_ as __pageData,x as default};
