import{_ as o,j as p,o as l,g as e,k as n,Q as s}from"./chunks/framework.e0c66c3f.js";const _=JSON.parse('{"title":"作用 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/分布式链路追踪实战_文档/(4337) 16  指标体系：Prometheu 如何更完美地显示指标体系？.md","filePath":"posts/backEnd/分布式链路追踪实战_文档/(4337) 16  指标体系：Prometheu 如何更完美地显示指标体系？.md","lastUpdated":1696338709000}'),t={name:"posts/backEnd/分布式链路追踪实战_文档/(4337) 16  指标体系：Prometheu 如何更完美地显示指标体系？.md"},r=s('<p>在上一节，我带你了解了日志系统的基本原理和 ELK 是如何进行日志收集和展示的。在本节课，我将带你了解 Prometheus 是如何收集和展示统计指标数据的。</p><h3 id="作用" tabindex="-1">作用 <a class="header-anchor" href="#作用" aria-label="Permalink to &quot;作用&quot;">​</a></h3><p>我在介绍统计指标时讲过指标数据的重要性和它所能帮助我们做的事情。统计指标可以帮你了解系统当前的执行情况，并通过可视化的形式展现出来。它还可以和告警相结合，在出现异常时及时反馈。</p><p>对于监控系统而言，指标体系是其中不可缺少的一环。那么，在一个比较完整的监控系统中，指标究竟发挥了哪些作用呢？</p><ol><li><p><strong>通过查看指标数据了解指标的走向，从而更好地优化系统、流量等内容</strong>。以流量为例，假如有人在爬取你的数据，此时请求量指标可能会出现有规律的突增突降，这时你就可以结合访问日志分析出对方爬取的方式，然后结合具体的业务场景来处理。</p></li><li><p><strong>通过导出或者查询已有数据，将一段时间内的数据以 dashboard 的形式进行展示，这个也是目前主流的一个使用场景</strong>，比如&quot;双十一&quot;淘宝的销售额。</p></li><li><p><strong>基于预先配置好的告警规则，定时检测数据是否符合规则，并对其进行告警处理</strong>。这也是我们在指标监控中最为重要的一个目的。</p></li></ol><h3 id="原理" tabindex="-1">原理 <a class="header-anchor" href="#原理" aria-label="Permalink to &quot;原理&quot;">​</a></h3><p>与讲解 ELK 时相同，这里我同样以原理为切入点，介绍目前大多数的监控系统中是如何监控的。它们底层基本都分为 4 个步骤：<strong>数据收集</strong> 、<strong>指标存储</strong> 、<strong>指标查询</strong> 、<strong>规则告警</strong>。</p><h4 id="数据收集" tabindex="-1">数据收集 <a class="header-anchor" href="#数据收集" aria-label="Permalink to &quot;数据收集&quot;">​</a></h4><p><strong>监控系统从服务器或者服务中获取数据，并将其统一收集到监控系统中</strong>。</p><p>由于统计指标是变化的，并且变化的频率较高，所以实时发送数据是不现实的，一般我们会将数据内容缓存在组件中，定期收集数据。目前主流的数据收集方式有两种。</p><p>一种是<strong>push，推送模式</strong>。定期主动将数据内容发送给收集器端。</p><p>另一种是<strong>pull，拉取模式</strong>。业务系统主动暴露相关的数据指标信息，收集器端利用服务发现能力感知所有可能的服务列表，并定期通过发送请求的方式获取数据内容。</p><p>两者没有好坏之分，我从以下 5 个方面对它们做出了区分，让你对在不同的场景中应该选择哪种模式有一个更好的认识。</p><ol><li><p>数据采集：对于推送模式来说，业务系统一旦启动，便会定期主动将数据信息上报；拉取模式则是暴露指标，由收集器决定是否获取数据。</p></li><li><p>可扩展性：推送模式可以随时扩展新的节点信息，实现线性增长；拉取模式的工作负载由业务系统的数量决定，如果业务系统数量不断增加，收集器系统也只需要动态增加机器。</p></li><li><p>安全性：推送模式本身就是安全的，业务系统可以防止遭受到远程攻击；拉取模式一般采用轮训协议，可能有潜在的访问攻击。</p></li><li><p>灵活性：推送模式相对不灵活，因为它只能定期发送数据；拉取模式则可以随时获取数据。</p></li><li><p>系统耦合：推送模式对于系统耦合性相对较高，因为它需要获取到收集器列表，并对其进行发送数据处理，如果收集系统出现问题，数据可能会丢失；拉取模式的耦合性则相对较低。</p></li></ol><h4 id="指标聚合" tabindex="-1">指标聚合 <a class="header-anchor" href="#指标聚合" aria-label="Permalink to &quot;指标聚合&quot;">​</a></h4><p>收集指标数据之后，收集器就可以对已有的数据内容聚合，然后保存。我在<strong>13 | 告警质量：如何更好地创建告警规则和质量？</strong> 这一课时中，介绍了时序数据库的基本概念。</p><p>指标聚合也是<strong>将数据按照主体部分，以时间维度进行按照秒或者分钟级别来聚合，然后根据不同的数据类型计算相应的数值</strong> ，比如仪表盘类型的数据只保存最近一次的值。<strong>最后将得到的数据存储到数据库中</strong>。</p><h4 id="指标查询" tabindex="-1">指标查询 <a class="header-anchor" href="#指标查询" aria-label="Permalink to &quot;指标查询&quot;">​</a></h4><p><strong>数据存储到了相对应的数据库之后，就可以通过界面或者类似 SQL 的形式查询数据</strong>。</p><p>通常在查询时还会涉及时间范围和指标计算的工作。一个指标监控系统中最为重要的，是其<strong>数据查询的灵活度</strong> 和<strong>支持聚合函数的种类</strong>，比如常见的分位值、最大值、平均值等方式的数值计算。</p><p>我们可以把这些数值与图表结合，定义自己的 dashboard，从而更快了解系统当前的运行情况。</p><h4 id="规则告警" tabindex="-1">规则告警 <a class="header-anchor" href="#规则告警" aria-label="Permalink to &quot;规则告警&quot;">​</a></h4><p>最后一个关键点是告警规则。<strong>监控系统可以通过统一的配置来进行告警</strong>，其中包含以下几个维度的数据信息。</p><ul><li><p><strong>检测时间</strong> ：<strong>多长时间检测一次告警内容，时间越短说明检测的周期越密集</strong>。通常可以指定为 1 分钟，如果业务系统对于数据比较敏感，则可以适当降低时间，比如 30 秒。</p></li><li><p><strong>告警规则</strong> ：<strong>进行告警规则的配置，通常会包含统计指标的名称、查询方式和阈值构成</strong>。检测的时候会判断当前指标查询出的结果值是否符合告警规则，如果符合则说明达到了告警条件。</p></li><li><p><strong>通知方式</strong> ：<strong>符合告警规则后会进行相关的告警操作</strong>。比如通过 HTTP 的回调方式告知业务系统，或者通过钉钉或者企业微信这样信息推送的方式告知业务研发人员。</p></li></ul><p>通过收集数据，将数据指标聚合存储后，我们可以制定相关的规则。告警系统会查询相关的指标，判断是否符合告警的条件，如果符合，则会进行告警。能完成这样一个流程，就算是一个相对完整的指标监控系统。</p><h3 id="prometheus" tabindex="-1">Prometheus <a class="header-anchor" href="#prometheus" aria-label="Permalink to &quot;Prometheus&quot;">​</a></h3><p>Prometheus 是一个开源的服务监控系统和时间序列数据库，它是一款基于统计指标的服务监控系统，可以很方便地进行统计指标的存储、查询与告警。</p><p>我会先依据我刚才讲的指标系统的原理，对 Prometheus 的系统架构做详细说明，然后讲解其中的 4 个常见功能。</p><h4 id="系统架构" tabindex="-1">系统架构 <a class="header-anchor" href="#系统架构" aria-label="Permalink to &quot;系统架构&quot;">​</a></h4><p>我们先来看一张 Prometheus 的架构图：</p>',30),c=s(`<p>根据我在原理中讲到的数据收集、指标聚合、指标查询和规则告警，我们也可以通过这 4 个步骤来了解 Prometheus。</p><p>我们可以从图中看到，Prometheus 主要是采取拉取模式获取数据的，它提供了完善的服务发现机制，结合 K8s 的 API 可以动态感知服务的创建与销毁。通过可配置的方式，定期拉取服务列表的数据。对于一些短期存在的任务，Prometheus 同样提供了 PushGateway，让业务程序能够推送数据，再由收集系统来收集。</p><p>其次是 Prometheus 的指标聚合。Prometheus 服务器接收到数据之后，会通过 TSDB 存储引擎聚合数据，然后存储到磁盘上。TSDB 中的数据结构和我在**13 | 告警质量：如何更好地创建告警规则和质量？**这一课时中，讲到的时序数据库的结构一样。</p><p>在指标查询方面，Prometheus 提供了一套完整的查询语言 PromQL，通过 HTTP 服务的形式对外提供查询接口和基础的展示界面。通过接口，我们可以将数据与 Grafana 界面相结合。</p><p>Grafana 是一个强大的可视化监控指标展示工具，我们可以自定义页面中所需要展示的内容，来定制属于自己业务中的关键指标的 Dashboard。</p><p>最后，基于 Prometheus 中的配置方式来管理所有的告警内容。符合条件时，会通过 Alertmanager 来推送相应的告警内容给业务系统，比如图中的 Email、paperduty 等；也可以通过 HTTP 的方式发送给业务系统，让业务系统自行处理告警信息。</p><h4 id="业务数据收集" tabindex="-1">业务数据收集 <a class="header-anchor" href="#业务数据收集" aria-label="Permalink to &quot;业务数据收集&quot;">​</a></h4><p>介绍完 Prometheus 的系统架构之后，我再来带你了解如何将业务系统中的相关指标接入到 Prometheus 中。</p><p>一般我们会选择 Micrometer 作为接入 Prometheus 的首选 SDK。Micrometer 有点像我在日志系统中介绍的 slf4j。它通过一套统一的 API 集成多种指标系统，比如 Prometheus、Elastic、Datadog 等。我会通过一个例子来说明。</p><p>如果你的项目是基于 Java 语言和 Spring Boot 系统开发的，那么你就可以通过声明 Spring-boot-starter-actuator 和 micrometer-registry-prometheus 这两个依赖，分别引入后，会自动加入一些基础的指标内容，比如 HTTP 层调用次数，本机的 CPU、内存等资源的使用情况。</p><p>完成配置后，你的系统就可以对外暴露统计指标信息了。其中 Spring 中的 actuator 是一个完整的监控组件，除了收集的统计指标信息，你还可以上传服务相关的信息。合理利用这两部分信息，可以让你的系统更具有可观测性。</p><p>对外暴露统计指标信息后，你可以在代码中声明<strong>MeterRegistry</strong>这个对象，使用它声明自定义的统计指标，然后发送到 Prometheus 中统计。</p><p>你是否还记得我在&quot;<strong>04 统计指标：&#39;五个九&#39;对系统稳定的意义？</strong>&quot;中介绍的指标类型？下面这段代码展现了比较常见的 4 种统计指标的声明方式。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 创建计数器，并且增加 1</span></span>
<span class="line"><span style="color:#E1E4E8;">meterRegistry.</span><span style="color:#B392F0;">counter</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;counter&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">increment</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#6A737D;">// 创建仪表盘，监控线程池的活跃线程数</span></span>
<span class="line"><span style="color:#E1E4E8;">ThreadPoolExecutor threadPool </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ThreadPoolExecutor</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, TimeUnit.MILLISECONDS, </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> LinkedBlockingDeque&lt;&gt;());</span></span>
<span class="line"><span style="color:#E1E4E8;">meterRegistry.</span><span style="color:#B392F0;">gauge</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;thread_pool_active&quot;</span><span style="color:#E1E4E8;">, threadPool, (pool) </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">double</span><span style="color:#E1E4E8;">) threadPool.</span><span style="color:#B392F0;">getActiveCount</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#6A737D;">// 创建摘要和直方图</span></span>
<span class="line"><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> DistributionSummary summary </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> DistributionSummary.</span><span style="color:#B392F0;">builder</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;summary&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#6A737D;">// 规定 bucket 列表</span></span>
<span class="line"><span style="color:#E1E4E8;">   .</span><span style="color:#B392F0;">serviceLevelObjectives</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#6A737D;">// 规定分位值</span></span>
<span class="line"><span style="color:#E1E4E8;">   .</span><span style="color:#B392F0;">publishPercentiles</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0.90</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0.95</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">   .</span><span style="color:#B392F0;">register</span><span style="color:#E1E4E8;">(meterRegistry);</span></span>
<span class="line"><span style="color:#E1E4E8;">summary.</span><span style="color:#B392F0;">record</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 创建计数器，并且增加 1</span></span>
<span class="line"><span style="color:#24292E;">meterRegistry.</span><span style="color:#6F42C1;">counter</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;counter&quot;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">increment</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#6A737D;">// 创建仪表盘，监控线程池的活跃线程数</span></span>
<span class="line"><span style="color:#24292E;">ThreadPoolExecutor threadPool </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ThreadPoolExecutor</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, TimeUnit.MILLISECONDS, </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> LinkedBlockingDeque&lt;&gt;());</span></span>
<span class="line"><span style="color:#24292E;">meterRegistry.</span><span style="color:#6F42C1;">gauge</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;thread_pool_active&quot;</span><span style="color:#24292E;">, threadPool, (pool) </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">double</span><span style="color:#24292E;">) threadPool.</span><span style="color:#6F42C1;">getActiveCount</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#6A737D;">// 创建摘要和直方图</span></span>
<span class="line"><span style="color:#D73A49;">final</span><span style="color:#24292E;"> DistributionSummary summary </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> DistributionSummary.</span><span style="color:#6F42C1;">builder</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;summary&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#6A737D;">// 规定 bucket 列表</span></span>
<span class="line"><span style="color:#24292E;">   .</span><span style="color:#6F42C1;">serviceLevelObjectives</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">100</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#6A737D;">// 规定分位值</span></span>
<span class="line"><span style="color:#24292E;">   .</span><span style="color:#6F42C1;">publishPercentiles</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0.90</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0.95</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">   .</span><span style="color:#6F42C1;">register</span><span style="color:#24292E;">(meterRegistry);</span></span>
<span class="line"><span style="color:#24292E;">summary.</span><span style="color:#6F42C1;">record</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">10</span><span style="color:#24292E;">);</span></span></code></pre></div><p>Spring 也为我们提供了一些注解和第三方框架的适配，来辅助我们创建自己的指标内容，比如 Timed 注解。</p><h4 id="promql" tabindex="-1">PromQL <a class="header-anchor" href="#promql" aria-label="Permalink to &quot;PromQL&quot;">​</a></h4><p>PromeQL 是在 Prometheus 查询指标数据中最重要的内容，通过它提供的数据内容你可以更方便地进行表格绘制、内容告警。</p><p>我们可以来看一段代码：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">http_error_requests{job</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;apiserver&quot;</span><span style="color:#E1E4E8;">}[5m]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">http_error_requests{job</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;apiserver&quot;</span><span style="color:#24292E;">}[5m]</span></span></code></pre></div><p>这段代码可以查询出http_error_requests这个统计指标中，代表了 HTTP 请求错误的次数，主体中 job 值等于 apiserver 的所有统计指标中，最近 5 分钟的数据值。我们可以通过这样的数据内容绘制柱状图或折线图。</p><p>我们可以使用很多的指标函数，比如下面代码就表示的是 http_error_requests 这个统计指标的当前值，和前 5 分钟相比较的增速值。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">rate</span><span style="color:#E1E4E8;">(http_error_requests[5m])</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">rate</span><span style="color:#24292E;">(http_error_requests[5m])</span></span></code></pre></div><p>PromQL 还支持很多的计算函数，这里你可以参考<a href="https://prometheus.io/docs/prometheus/latest/querying/basics/" target="_blank" rel="noreferrer">官网的教程</a>进行更细致的学习。</p><h4 id="告警规则" tabindex="-1">告警规则 <a class="header-anchor" href="#告警规则" aria-label="Permalink to &quot;告警规则&quot;">​</a></h4><p><strong>告警规则就是定期执行 PromeQL 中的语句，当符合条件时进行告警</strong>。下面的代码就是创建了一个告警规则：当 HTTP 请求错误数据的错误数超过 20 个，并且持续了一分钟，就会告警。</p><div class="language-dart vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> alert</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">RequestErrorAlert</span></span>
<span class="line"><span style="color:#E1E4E8;"># 表达式，代表触发什么样子的条件，这里代表了请求错误次数超过了 </span><span style="color:#79B8FF;">20</span><span style="color:#E1E4E8;"> 个</span></span>
<span class="line"><span style="color:#E1E4E8;">expr</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">http_requests_total{job</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;apiserver&quot;</span><span style="color:#E1E4E8;">} </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">20</span></span>
<span class="line"><span style="color:#E1E4E8;"># 持续时间。 表示持续一分钟都出现请求错误数超过 </span><span style="color:#79B8FF;">20</span><span style="color:#E1E4E8;"> 个，则触发报警。</span></span>
<span class="line"><span style="color:#F97583;">for:</span><span style="color:#E1E4E8;"> 1m</span></span>
<span class="line"><span style="color:#E1E4E8;"> # 当符合条件时进行告警通知信息</span></span>
<span class="line"><span style="color:#E1E4E8;">annotations</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">#摘要，支持通过模板的形式定制当前统计指标中的信息</span></span>
<span class="line"><span style="color:#E1E4E8;">summary</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Instance { { $</span><span style="color:#79B8FF;">labels</span><span style="color:#9ECBFF;">.instance  }}请求错误数过高&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">description</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;{ { $</span><span style="color:#79B8FF;">labels</span><span style="color:#9ECBFF;">.instance  }} 实例中的请求错误数超过 20 个(当前值：{ { $</span><span style="color:#79B8FF;">value</span><span style="color:#9ECBFF;"> }})&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">-</span><span style="color:#24292E;"> alert</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">RequestErrorAlert</span></span>
<span class="line"><span style="color:#24292E;"># 表达式，代表触发什么样子的条件，这里代表了请求错误次数超过了 </span><span style="color:#005CC5;">20</span><span style="color:#24292E;"> 个</span></span>
<span class="line"><span style="color:#24292E;">expr</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">http_requests_total{job</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;apiserver&quot;</span><span style="color:#24292E;">} </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">20</span></span>
<span class="line"><span style="color:#24292E;"># 持续时间。 表示持续一分钟都出现请求错误数超过 </span><span style="color:#005CC5;">20</span><span style="color:#24292E;"> 个，则触发报警。</span></span>
<span class="line"><span style="color:#D73A49;">for:</span><span style="color:#24292E;"> 1m</span></span>
<span class="line"><span style="color:#24292E;"> # 当符合条件时进行告警通知信息</span></span>
<span class="line"><span style="color:#24292E;">annotations</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">#摘要，支持通过模板的形式定制当前统计指标中的信息</span></span>
<span class="line"><span style="color:#24292E;">summary</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Instance { { $</span><span style="color:#005CC5;">labels</span><span style="color:#032F62;">.instance  }}请求错误数过高&quot;</span></span>
<span class="line"><span style="color:#24292E;">description</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;{ { $</span><span style="color:#005CC5;">labels</span><span style="color:#032F62;">.instance  }} 实例中的请求错误数超过 20 个(当前值：{ { $</span><span style="color:#005CC5;">value</span><span style="color:#032F62;"> }})&quot;</span></span></code></pre></div><p>上述代码声明了一个告警规则，接下来就可以通过 Alertmanager 组件进行更详细的通知方式配置。这部分内容十分简单，你可以通过<a href="https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/" target="_blank" rel="noreferrer">官方提供的文档</a>学习。</p><h4 id="grafana" tabindex="-1">Grafana <a class="header-anchor" href="#grafana" aria-label="Permalink to &quot;Grafana&quot;">​</a></h4><p>最后我带你简单认识一下 Grafana，它是<strong>一个通过可视化的形式查看指标数据的展示系统</strong>。通过它，你可以快速构建出 dashboard。其数据源就是依赖 Prometheus，通过 PromQL 的查询实现的。如下图所示：</p>`,29),i=s('<p>这张图是官方 demo 所提供的展示内容，可以点击<a href="http://demo.robustperception.io:3000/d/KyOBFkuik/host-stats-prometheus-node-exporter?orgId=1" target="_blank" rel="noreferrer">这里</a>访问。</p><p>Grafana是依赖于 Prometheus 提供的数据搭建而成的。其中，<strong>最上面一行分别展示了当前的展示模板和对应查询时间范围</strong> ，这个和我介绍的 Kibana 十分类似。<strong>下方的每一个模块展示的是通过 PromQL 所查询出数据的结果</strong>，这个部分可以选择不同的展示方式，例如柱状图、折线图、列表等。</p><p>Grafana 还支持导入和导出展示模板，你可以下载一些已经很成熟的模板信息来使用。·</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>本节我向你介绍了 Prometheus 的功能和使用方法，它是在业务中统计指标时必不可少的系统。那么，你都是如何根据指标来进行告警的，在线上告警时又出现过哪些棘手的问题呢？欢迎你在留言区分享你的故事。</p>',5);function y(E,u,h,d,g,m){const a=p("Image");return l(),e("div",null,[r,n(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/55/1D/Ciqc1F9pyTGATVArAAFB6U7Uslw981.png"}),c,n(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/55/28/CgqCHl9pyVSAaRiNAAFaF113VPU106.png"}),i])}const b=o(t,[["render",y]]);export{_ as __pageData,b as default};
