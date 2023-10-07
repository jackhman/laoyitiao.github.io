import{_ as p,j as e,o,g as t,k as a,h as n,Q as l,s as c}from"./chunks/framework.4e7d56ce.js";const C=JSON.parse('{"title":"加餐4：trace-receiver插件番外篇——慢查询的处理","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(3679) 加餐4：trace-receiver 插件番外篇——慢查询的处理.md","filePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(3679) 加餐4：trace-receiver 插件番外篇——慢查询的处理.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(3679) 加餐4：trace-receiver 插件番外篇——慢查询的处理.md"},E=l(`<h1 id="加餐4-trace-receiver插件番外篇——慢查询的处理" tabindex="-1">加餐4：trace-receiver插件番外篇——慢查询的处理 <a class="header-anchor" href="#加餐4-trace-receiver插件番外篇——慢查询的处理" aria-label="Permalink to &quot;加餐4：trace-receiver插件番外篇——慢查询的处理&quot;">​</a></h1><p>在这一课时，我们重点来介绍 trace-receiver-plugin 插件对慢查询相关信息的处理。</p><p>这里先来简单回顾一下，在 mysql-8.x-plugin 插件中会拦截 preparedStatement.execute() 方法创建 Database 类型的 ExitSpan，并在 execute() 方法调用完成之后结束 ExitSpan。</p><p>除了前面介绍的对 ExitSpan 的基本处理之外，multiScopesSpanListener.parseExit() 方法还会针对 Database 类型的 ExitSpan 进行特殊处理，该处理主要用于统计慢查询。这里的慢查询统计不仅是 DB 的慢查询，还包括其他常见的存储，例如：Redis、MongoDB 等等。</p><p>parseExit() 方法相关的代码片段如下，其核心是将请求存储的时间与 application.yml 配置文件中指定的慢查询阈值（slowDBAccessThreshold 配置项）进行比较，超过阈值的请求会创建相应的 DatabaseSlowStatement 对象并记录到 slowDatabaseAccesses 集合中。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">DatabaseSlowStatement statement </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">DatabaseSlowStatement</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#6A737D;">// 记录发生此次慢查询的 traceId</span></span>
<span class="line"><span style="color:#E1E4E8;">statement.</span><span style="color:#B392F0;">setTraceId</span><span style="color:#E1E4E8;">(traceId); </span></span>
<span class="line"><span style="color:#6A737D;">// 由 TraceSegment.id 以及 Span.id 构成的唯一标识</span></span>
<span class="line"><span style="color:#E1E4E8;">statement.</span><span style="color:#B392F0;">setId</span><span style="color:#E1E4E8;">(segmentCoreInfo.</span><span style="color:#B392F0;">getSegmentId</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;-&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> spanDecorator.</span><span style="color:#B392F0;">getSpanId</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#6A737D;">// 记录存储对应的 ServiceId</span></span>
<span class="line"><span style="color:#E1E4E8;">statement.</span><span style="color:#B392F0;">setDatabaseServiceId</span><span style="color:#E1E4E8;">(sourceBuilder.</span><span style="color:#B392F0;">getDestServiceId</span><span style="color:#E1E4E8;">()); </span></span>
<span class="line"><span style="color:#6A737D;">// 此次慢查询的实际耗时</span></span>
<span class="line"><span style="color:#E1E4E8;">statement.</span><span style="color:#B392F0;">setLatency</span><span style="color:#E1E4E8;">(sourceBuilder.</span><span style="color:#B392F0;">getLatency</span><span style="color:#E1E4E8;">()); </span></span>
<span class="line"><span style="color:#6A737D;">// 秒级时间窗口</span></span>
<span class="line"><span style="color:#E1E4E8;">statement.</span><span style="color:#B392F0;">setTimeBucket</span><span style="color:#E1E4E8;">(TimeBucket.</span><span style="color:#B392F0;">getSecondTimeBucket</span><span style="color:#E1E4E8;">(segmentCoreInfo.</span><span style="color:#B392F0;">getStartTime</span><span style="color:#E1E4E8;">()));</span></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (KeyStringValuePair tag </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> spanDecorator.</span><span style="color:#B392F0;">getAllTags</span><span style="color:#E1E4E8;">()) { </span><span style="color:#6A737D;">// 遍历ExitSpan 携带的 Tag 信息</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (SpanTags.DB_STATEMENT.</span><span style="color:#B392F0;">equals</span><span style="color:#E1E4E8;">(tag.</span><span style="color:#B392F0;">getKey</span><span style="color:#E1E4E8;">())) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 具体执行的操作，例如，访问 DB 的话，就是 SQL 语句</span></span>
<span class="line"><span style="color:#E1E4E8;">        statement.</span><span style="color:#B392F0;">setStatement</span><span style="color:#E1E4E8;">(tag.</span><span style="color:#B392F0;">getValue</span><span style="color:#E1E4E8;">()); </span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (SpanTags.DB_TYPE.</span><span style="color:#B392F0;">equals</span><span style="color:#E1E4E8;">(tag.</span><span style="color:#B392F0;">getKey</span><span style="color:#E1E4E8;">())) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 在 application.yml 配置文件中配置了不同存储的慢查询阈值上限，</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 这里会根据 dbType（其值可以为 sql、Redis、MongoDB 等）查找其阈值</span></span>
<span class="line"><span style="color:#E1E4E8;">        String dbType </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> tag.</span><span style="color:#B392F0;">getValue</span><span style="color:#E1E4E8;">(); </span></span>
<span class="line"><span style="color:#E1E4E8;">        DBLatencyThresholdsAndWatcher thresholds </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> config.</span><span style="color:#B392F0;">getDbLatencyThresholdsAndWatcher</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> threshold </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> thresholds.</span><span style="color:#B392F0;">getThreshold</span><span style="color:#E1E4E8;">(dbType);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (sourceBuilder.</span><span style="color:#B392F0;">getLatency</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> threshold) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            isSlowDBAccess </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">// 判断此次请求存储的操作是否为慢查询</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (isSlowDBAccess) { </span><span style="color:#6A737D;">// 将慢查询记录到 slowDatabaseAccesses 集合中</span></span>
<span class="line"><span style="color:#E1E4E8;">    slowDatabaseAccesses.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(statement);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">DatabaseSlowStatement statement </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">DatabaseSlowStatement</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#6A737D;">// 记录发生此次慢查询的 traceId</span></span>
<span class="line"><span style="color:#24292E;">statement.</span><span style="color:#6F42C1;">setTraceId</span><span style="color:#24292E;">(traceId); </span></span>
<span class="line"><span style="color:#6A737D;">// 由 TraceSegment.id 以及 Span.id 构成的唯一标识</span></span>
<span class="line"><span style="color:#24292E;">statement.</span><span style="color:#6F42C1;">setId</span><span style="color:#24292E;">(segmentCoreInfo.</span><span style="color:#6F42C1;">getSegmentId</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;-&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> spanDecorator.</span><span style="color:#6F42C1;">getSpanId</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#6A737D;">// 记录存储对应的 ServiceId</span></span>
<span class="line"><span style="color:#24292E;">statement.</span><span style="color:#6F42C1;">setDatabaseServiceId</span><span style="color:#24292E;">(sourceBuilder.</span><span style="color:#6F42C1;">getDestServiceId</span><span style="color:#24292E;">()); </span></span>
<span class="line"><span style="color:#6A737D;">// 此次慢查询的实际耗时</span></span>
<span class="line"><span style="color:#24292E;">statement.</span><span style="color:#6F42C1;">setLatency</span><span style="color:#24292E;">(sourceBuilder.</span><span style="color:#6F42C1;">getLatency</span><span style="color:#24292E;">()); </span></span>
<span class="line"><span style="color:#6A737D;">// 秒级时间窗口</span></span>
<span class="line"><span style="color:#24292E;">statement.</span><span style="color:#6F42C1;">setTimeBucket</span><span style="color:#24292E;">(TimeBucket.</span><span style="color:#6F42C1;">getSecondTimeBucket</span><span style="color:#24292E;">(segmentCoreInfo.</span><span style="color:#6F42C1;">getStartTime</span><span style="color:#24292E;">()));</span></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (KeyStringValuePair tag </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> spanDecorator.</span><span style="color:#6F42C1;">getAllTags</span><span style="color:#24292E;">()) { </span><span style="color:#6A737D;">// 遍历ExitSpan 携带的 Tag 信息</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (SpanTags.DB_STATEMENT.</span><span style="color:#6F42C1;">equals</span><span style="color:#24292E;">(tag.</span><span style="color:#6F42C1;">getKey</span><span style="color:#24292E;">())) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 具体执行的操作，例如，访问 DB 的话，就是 SQL 语句</span></span>
<span class="line"><span style="color:#24292E;">        statement.</span><span style="color:#6F42C1;">setStatement</span><span style="color:#24292E;">(tag.</span><span style="color:#6F42C1;">getValue</span><span style="color:#24292E;">()); </span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (SpanTags.DB_TYPE.</span><span style="color:#6F42C1;">equals</span><span style="color:#24292E;">(tag.</span><span style="color:#6F42C1;">getKey</span><span style="color:#24292E;">())) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 在 application.yml 配置文件中配置了不同存储的慢查询阈值上限，</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 这里会根据 dbType（其值可以为 sql、Redis、MongoDB 等）查找其阈值</span></span>
<span class="line"><span style="color:#24292E;">        String dbType </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> tag.</span><span style="color:#6F42C1;">getValue</span><span style="color:#24292E;">(); </span></span>
<span class="line"><span style="color:#24292E;">        DBLatencyThresholdsAndWatcher thresholds </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> config.</span><span style="color:#6F42C1;">getDbLatencyThresholdsAndWatcher</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> threshold </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> thresholds.</span><span style="color:#6F42C1;">getThreshold</span><span style="color:#24292E;">(dbType);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (sourceBuilder.</span><span style="color:#6F42C1;">getLatency</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> threshold) {</span></span>
<span class="line"><span style="color:#24292E;">            isSlowDBAccess </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">// 判断此次请求存储的操作是否为慢查询</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (isSlowDBAccess) { </span><span style="color:#6A737D;">// 将慢查询记录到 slowDatabaseAccesses 集合中</span></span>
<span class="line"><span style="color:#24292E;">    slowDatabaseAccesses.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(statement);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>在 multiScopesSpanListener.build() 方法中会将 slowDatabaseAccesses 集合中记录的全部DatabaseSlowStatement 对象交给 SourceReceiver 处理，这里 DatabaseSlowStatement 对应的 SourceDispatcher 实现是 DatabaseStatementDispatcher。在 DatabaseStatementDispatcher 中会将 DatabaseSlowStatement 转换成 TopNDatabaseStatement，并交给 TopNStreamProcessor 进行处理。</p><p>TopNDatabaseStatement 的继承关系如下所示：</p>`,8),y=l(`<p>抽象类 Record 前面介绍过其 timeBucket 字段对应 Document 中的 time_bucket 字段。抽象类 TopN 中的四个核心字段如下，正好对应 DatabaseSlowStatement 中记录的慢查询核心信息：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Getter</span><span style="color:#E1E4E8;"> @</span><span style="color:#F97583;">Setter</span><span style="color:#E1E4E8;"> @</span><span style="color:#F97583;">Column</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">columnName</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;statement&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">content</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> String statement;</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Getter</span><span style="color:#E1E4E8;"> @</span><span style="color:#F97583;">Setter</span><span style="color:#E1E4E8;"> @</span><span style="color:#F97583;">Column</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">columnName</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;latency&quot;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> latency;</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Getter</span><span style="color:#E1E4E8;"> @</span><span style="color:#F97583;">Setter</span><span style="color:#E1E4E8;"> @</span><span style="color:#F97583;">Column</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">columnName</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;trace_id&quot;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> String traceId;</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Getter</span><span style="color:#E1E4E8;"> @</span><span style="color:#F97583;">Setter</span><span style="color:#E1E4E8;"> @</span><span style="color:#F97583;">Column</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">columnName</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;service_id&quot;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> serviceId;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Getter</span><span style="color:#24292E;"> @</span><span style="color:#D73A49;">Setter</span><span style="color:#24292E;"> @</span><span style="color:#D73A49;">Column</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">columnName</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;statement&quot;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">content</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> String statement;</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Getter</span><span style="color:#24292E;"> @</span><span style="color:#D73A49;">Setter</span><span style="color:#24292E;"> @</span><span style="color:#D73A49;">Column</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">columnName</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;latency&quot;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> latency;</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Getter</span><span style="color:#24292E;"> @</span><span style="color:#D73A49;">Setter</span><span style="color:#24292E;"> @</span><span style="color:#D73A49;">Column</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">columnName</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;trace_id&quot;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> String traceId;</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Getter</span><span style="color:#24292E;"> @</span><span style="color:#D73A49;">Setter</span><span style="color:#24292E;"> @</span><span style="color:#D73A49;">Column</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">columnName</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;service_id&quot;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> serviceId;</span></span></code></pre></div><p>有些场景中，超越慢查询阈值的操作可能会比较多，全部记录下来的意义不大，一般针对每个存储服务只会记录耗时最大的前几个慢查询，正如 TopN 这个抽象类的名字所示 。SkyWalking 只会记录耗时最大的 N 个慢查询，topN.compareTo() 方法会比较 latency 字段，从而实现按照耗时的排序。</p><p>TopNDatabaseStatement 是 TopN 的唯一实现类，其中需要注意的是 equals() 方法，比较的是 serviceId。TopNDatabaseStatement 对应 Index 名称的前缀是&quot;top_n_database_statement&quot;，Document Id 就是前面介绍的 DatabaseSlowStatement 的 Id，即 TraceSegmentId + SpanId 构成。</p><h3 id="topnworker" tabindex="-1">TopNWorker <a class="header-anchor" href="#topnworker" aria-label="Permalink to &quot;TopNWorker&quot;">​</a></h3><p>TopNStreamProcessor 为每个 TopN 类型（其实只有 TopNDatabaseStatement）提供的 Worker 链中只有一个 Worker ------ TopNWorker。与前文介绍的 MetricsPersistentWorker 以及 RecordPersistentWorker 类似，TopNWorker 也继承了 PersistenceWorker 抽象类，其结构如下图所示，TopNWorker 也是先将 TopNDatabaseStatement 暂存到 DataCarrier，然后由后台 Consumer 线程定期读取并调用 onWork() 方法进行处理。</p>`,6),i=c("p",null,"在 TopNWorker.onWorker() 方法中会将 TopNDatabaseStatement 暂存到 LimitedSizeDataCache 中进行排序。LimitedSizeDataCache 使用双队列模式，继承了 Windows 抽象类，与前文介绍的 MergeDataCache 类似。LimitedSizeDataCache 底层的队列实现是 LimitedSizeDataCollection，其 data 字段（Map 类型）中维护了每个存储服务的慢查询（即 TopNDatabaseStatement）列表，每个列表都是定长的（由 limitedSize 字段指定，默认 50），在调用 limitedSizeDataCollection.put() 方法写入的时候会按照 latency 从大到小排列，并只保留最多 50 个元素，如下图所示：",-1),d=l(`<p>可见，在 LimitedSizeDataCache 中缓存的慢查询是按照存储服务的维度进行分类、排序以及计算 TopN 的。</p><p>回到 TopNWorker，它覆盖了 PersistenceWorker 的 onWork() 方法，如下所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"></span>
<span class="line"><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">onWork</span><span style="color:#E1E4E8;">(TopN data) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    limitedSizeDataCache.</span><span style="color:#B392F0;">writing</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        limitedSizeDataCache.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(data);</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">finally</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        limitedSizeDataCache.</span><span style="color:#B392F0;">finishWriting</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"></span>
<span class="line"><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">onWork</span><span style="color:#24292E;">(TopN data) {</span></span>
<span class="line"><span style="color:#24292E;">    limitedSizeDataCache.</span><span style="color:#6F42C1;">writing</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        limitedSizeDataCache.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(data);</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">finally</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        limitedSizeDataCache.</span><span style="color:#6F42C1;">finishWriting</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="persistencetimer" tabindex="-1">PersistenceTimer <a class="header-anchor" href="#persistencetimer" aria-label="Permalink to &quot;PersistenceTimer&quot;">​</a></h3><p>在 PersistenceWorker 的三个实现类中，MetricsPersistentWorker 和 RecordPersistentWorker 启动的 Consumer 直接使用了继承自 PersistenceWorker 的 onWork() 方法 ，该实现只会在 DataCache 缓存的数据到达一定阈值时，才会触发 ElasticSearch 的写入。如果缓存量长时间达不到阈值，就会导致监控数据和 Trace 数据写入延迟。另外，前面的介绍 TopNWorker.onWork() 实现只有写入 LimitedSizeDataCache 的逻辑，没有读取的逻辑。</p><p>为了解决上述问题，在各个模块初始化完成之后，会在 coreModuleProvider.notifyAfterCompleted() 方法中启动 PersistenceTimer（前面介绍的 GRPCServer 也是在此处启动的）。</p><p>PersistenceTimer 中会启动一个后台线程定期（初始延迟为 1s，后续间隔为 3s）将三个 PersistenceWorker 实现中缓存的数据持久化到 ElasticSearch 中，大致实现如下所示（省略 Debug 级别的日志输出以及部分 try/catch 代码）：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">extractDataAndSave</span><span style="color:#E1E4E8;">(IBatchDAO batchDAO) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 三个 PersistenceWorker 实现构成的列表</span></span>
<span class="line"><span style="color:#E1E4E8;">    List&lt;</span><span style="color:#F97583;">PersistenceWorker</span><span style="color:#E1E4E8;">&gt; persistenceWorkers </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> ArrayList&lt;&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">    persistenceWorkers.</span><span style="color:#B392F0;">addAll</span><span style="color:#E1E4E8;">(MetricsStreamProcessor.</span><span style="color:#B392F0;">getInstance</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">getPersistentWorkers</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">    persistenceWorkers.</span><span style="color:#B392F0;">addAll</span><span style="color:#E1E4E8;">(RecordStreamProcessor.</span><span style="color:#B392F0;">getInstance</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">getPersistentWorkers</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">    persistenceWorkers.</span><span style="color:#B392F0;">addAll</span><span style="color:#E1E4E8;">(TopNStreamProcessor.</span><span style="color:#B392F0;">getInstance</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">getPersistentWorkers</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">    persistenceWorkers.</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">(worker </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 逐个 PersistenceWorker 实现的 flushAndSwitch()方法，</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 其中主要是对 DataCache 队列的切换</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (worker.</span><span style="color:#B392F0;">flushAndSwitch</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 调用 PersistenceWorker.buildBatchCollection()为 DataCache中每个元素创建相应的 IndexRequest 以及 UpdateRequest 请求</span></span>
<span class="line"><span style="color:#E1E4E8;">            List&lt;</span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;">&gt; batchCollection </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> worker.</span><span style="color:#B392F0;">buildBatchCollection</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            batchAllCollection.</span><span style="color:#B392F0;">addAll</span><span style="color:#E1E4E8;">(batchCollection);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 执行三个 PersistenceWorker 生成的全部 ElasticSearch 请求</span></span>
<span class="line"><span style="color:#E1E4E8;">    batchDAO.</span><span style="color:#B392F0;">batchPersistence</span><span style="color:#E1E4E8;">(batchAllCollection);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">extractDataAndSave</span><span style="color:#24292E;">(IBatchDAO batchDAO) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 三个 PersistenceWorker 实现构成的列表</span></span>
<span class="line"><span style="color:#24292E;">    List&lt;</span><span style="color:#D73A49;">PersistenceWorker</span><span style="color:#24292E;">&gt; persistenceWorkers </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> ArrayList&lt;&gt;();</span></span>
<span class="line"><span style="color:#24292E;">    persistenceWorkers.</span><span style="color:#6F42C1;">addAll</span><span style="color:#24292E;">(MetricsStreamProcessor.</span><span style="color:#6F42C1;">getInstance</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">getPersistentWorkers</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">    persistenceWorkers.</span><span style="color:#6F42C1;">addAll</span><span style="color:#24292E;">(RecordStreamProcessor.</span><span style="color:#6F42C1;">getInstance</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">getPersistentWorkers</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">    persistenceWorkers.</span><span style="color:#6F42C1;">addAll</span><span style="color:#24292E;">(TopNStreamProcessor.</span><span style="color:#6F42C1;">getInstance</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">getPersistentWorkers</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">    persistenceWorkers.</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">(worker </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 逐个 PersistenceWorker 实现的 flushAndSwitch()方法，</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 其中主要是对 DataCache 队列的切换</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (worker.</span><span style="color:#6F42C1;">flushAndSwitch</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 调用 PersistenceWorker.buildBatchCollection()为 DataCache中每个元素创建相应的 IndexRequest 以及 UpdateRequest 请求</span></span>
<span class="line"><span style="color:#24292E;">            List&lt;</span><span style="color:#D73A49;">?</span><span style="color:#24292E;">&gt; batchCollection </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> worker.</span><span style="color:#6F42C1;">buildBatchCollection</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            batchAllCollection.</span><span style="color:#6F42C1;">addAll</span><span style="color:#24292E;">(batchCollection);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 执行三个 PersistenceWorker 生成的全部 ElasticSearch 请求</span></span>
<span class="line"><span style="color:#24292E;">    batchDAO.</span><span style="color:#6F42C1;">batchPersistence</span><span style="color:#24292E;">(batchAllCollection);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这里需要特别说明是：MetricsPersistentWorker 和 RecordPersistentWorker 中的 flushAndSwitch() 方法都继承自 PersistenceWorker，其主要功能是切换底层 DataCache 的 current 队列，这与 persistenceWorker.onWorker() 方法中的核心逻辑类似。</p><p>而 TopNWorker 覆盖了 flushAndSwitch() 方法，其中添加了执行频率的控制，大致实现如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">flushAndSwitch</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> now </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> System.</span><span style="color:#B392F0;">currentTimeMillis</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (now </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> lastReportTimestamp </span><span style="color:#F97583;">&lt;=</span><span style="color:#E1E4E8;"> reportCycle) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">// 默认 10min 执行一次</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    lastReportTimestamp </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> now; </span><span style="color:#6A737D;">// 重置 lastReportTimestamp</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">flushAndSwitch</span><span style="color:#E1E4E8;">(); </span><span style="color:#6A737D;">// 调用 PersistenceWorker 实现</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">flushAndSwitch</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> now </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> System.</span><span style="color:#6F42C1;">currentTimeMillis</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (now </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> lastReportTimestamp </span><span style="color:#D73A49;">&lt;=</span><span style="color:#24292E;"> reportCycle) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">// 默认 10min 执行一次</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    lastReportTimestamp </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> now; </span><span style="color:#6A737D;">// 重置 lastReportTimestamp</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">flushAndSwitch</span><span style="color:#24292E;">(); </span><span style="color:#6A737D;">// 调用 PersistenceWorker 实现</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>到此为止，trace-receiver-plugin 插件核心的工作原理及实现就介绍完了。</p>`,12);function D(F,m,A,h,g,u){const s=e("Image");return o(),t("div",null,[E,a(s,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/20/59/CgqCHl7oY-2AXRtrAAFtUKJ2T34195.png"}),n(),y,a(s,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/20/4D/Ciqc1F7oZASAZ822AAEjgROFXtk196.png"}),n(),i,a(s,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/20/4D/Ciqc1F7oZCCAdh83AAKfFxpviaQ344.png"}),n(),d])}const k=p(r,[["render",D]]);export{C as __pageData,k as default};
