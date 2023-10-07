import{_ as o,j as n,o as p,g as l,k as s,h as a,Q as t,s as r}from"./chunks/framework.4e7d56ce.js";const M=JSON.parse('{"title":"11可观测性之监控告警：利用Prometheu和Grafana收集监控数据","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/微服务Service Mesh原理与实战_文档/(6004) 11  可观测性之监控告警：利用 Prometheu 和 Grafana 收集监控数据.md","filePath":"posts/backEnd/微服务Service Mesh原理与实战_文档/(6004) 11  可观测性之监控告警：利用 Prometheu 和 Grafana 收集监控数据.md","lastUpdated":1696417798000}'),i={name:"posts/backEnd/微服务Service Mesh原理与实战_文档/(6004) 11  可观测性之监控告警：利用 Prometheu 和 Grafana 收集监控数据.md"},c=t('<h1 id="_11可观测性之监控告警-利用prometheu和grafana收集监控数据" tabindex="-1">11可观测性之监控告警：利用Prometheu和Grafana收集监控数据 <a class="header-anchor" href="#_11可观测性之监控告警-利用prometheu和grafana收集监控数据" aria-label="Permalink to &quot;11可观测性之监控告警：利用Prometheu和Grafana收集监控数据&quot;">​</a></h1><p>今天我要和你分享的内容是提供可观测性的另一个组件：Metrics 监控指标。</p><p>在上一讲中，我们学习了可观测性组件之一：Trace，Trace 丰富了微服务的排障手段和可观测性。今天介绍的 Metrics 主要可以解决微服务的实时监控和告警问题。</p><p>为了更好地理解 Metrics 监控指标的作用和不同之处，我们先来看一下传统的监控告警系统。</p><h3 id="传统监控系统" tabindex="-1">传统监控系统 <a class="header-anchor" href="#传统监控系统" aria-label="Permalink to &quot;传统监控系统&quot;">​</a></h3><p>监控系统通常由指标采集子系统和数据处理子系统组成。指标采集子系统主要负责信息采集、过滤、汇总和存储；数据处理子系统主要负责数据分析、展现、预警和告警等。传统的监控系统一般有ELK 和 Nagios &amp; Zabbix，下面我们就来详细了解一下。</p><h4 id="elk" tabindex="-1">ELK <a class="header-anchor" href="#elk" aria-label="Permalink to &quot;ELK&quot;">​</a></h4><p>ELK 是 Elastic 公司推出的监控系统，包含了 Elasticsearch、Logstash 和 Kibana，分别作为存储引擎、日志收集和前端展示系统。其中<strong>Elasticsearch 是核心</strong>，其他两个都可以替换，较常见的替换方案是 Filebeat 和 Graylog。</p><p>其中<strong>Filebeat 是由 Go 语言编写的轻量级日志收集工具</strong> 。日志可以直接传输到 Elasticsearch 中，可以传输到 Logstash 进行一些数据处理。而<strong>Graylog 是一套代替 ELK 的日志收集分析系统</strong>，其中保留了 Elasticsearch 的存储部分，提供了 collector-sidecar 用于日志收集，并继承了 Web 图形界面，用于搜索和图形化展示。</p><p>总体来说，ELK 是一套传统的可观测性系统，主要利用我们之前提到的可观测性组件之一------<strong>日志来提供监控功能</strong> ，优点是<strong>数据准确性高</strong>，但由于日志需要存储和建立索引，成本会比较高。这套系统在互联网的中期使用非常多，因为对原有系统没有任何侵入性，也非常容易接入。</p><h4 id="nagios-zabbix" tabindex="-1">Nagios &amp; Zabbix <a class="header-anchor" href="#nagios-zabbix" aria-label="Permalink to &quot;Nagios \\&amp; Zabbix&quot;">​</a></h4><p>Nagios 和 Zabbix 都是传统的运维监控工具，主要监控主机、网络，以及业务进程端口的信息和状态。主要<strong>以插件的方式进行扩展</strong>，通过插件扩展可以检测主机的 CPU、内存、硬盘等信息，也可以检测各种不同的网络协议，但对于检测微服务应用程序内的信息几乎是无能为力的。</p><p>随着微服务架构和云原生系统的发展，大家对应用程序内的可观测性提出了更高的要求，不仅仅是系统级别的监控，包括应用自身的黄金指标（<strong>延时、通信量、饱和度、错误率</strong>）和一些业务级别的指标都需要实时的可观测。</p><h3 id="现代化常用的-metrics-系统" tabindex="-1">现代化常用的 Metrics 系统 <a class="header-anchor" href="#现代化常用的-metrics-系统" aria-label="Permalink to &quot;现代化常用的 Metrics 系统&quot;">​</a></h3><p>Metrics 主要是用<strong>时序性数据库</strong> 记录每个时间点的监控数据，通过主动拉取或者程序上报的方式记录，然后实时计算一段时间的数据，并通过<strong>图形界面</strong>的方式展现出来。它的特点是实时性强、可观测指标丰富，适合查看一段时间内的指标趋势。</p><h4 id="statsd-graphite" tabindex="-1">StatsD+Graphite <a class="header-anchor" href="#statsd-graphite" aria-label="Permalink to &quot;StatsD+Graphite&quot;">​</a></h4><p>StatsD 是 Node.js 编写的一个<strong>Metrics 指标采集系统</strong>，通过 UDP 协议将信息传输到后端程序，聚合后存储到 Graphite。</p><p>StatsD 包含三个组成部分，分别是：</p><ul><li><p>Client，各种语言使用的 SDK，用于将 Metrics 信息通过 UDP 的方式传送到 Server。</p></li><li><p>Server，收集客户端传输的 Metrics 信息，聚合后发送到 Backend，也就是 Graphite。</p></li><li><p>Backend，也就是上面提到的 Graphite，Graphite 是一个时序数据库，负责存储 Metrics 信息。</p></li></ul><h4 id="influxdb-telegraf" tabindex="-1">InfluxDB+Telegraf <a class="header-anchor" href="#influxdb-telegraf" aria-label="Permalink to &quot;InfluxDB+Telegraf&quot;">​</a></h4><p>InfluxDB 是一个时序数据库，负责 Metrics 信息的存储；Telegraf 是一套 Metrics 收集系统，默认自带非常丰富的插件，用于采集系统级别的信息，如果要采集应用维度的信息，则需要编写插件。</p><h4 id="prometheus" tabindex="-1">Prometheus <a class="header-anchor" href="#prometheus" aria-label="Permalink to &quot;Prometheus&quot;">​</a></h4><p>Prometheus 是 Cloud Native Computing Foundation（简称：CNCF）生态圈的一员，也是整个 Kubernetes 生态中重要的一环，现已经广泛用于 Kubernetes 集群监控中。Prometheus 与上面的两个 Metrics 系统最大的不同，是<strong>提供了一整套完整的监控告警解决方案</strong> ，包含了<strong>数据采集、数据存储和告警</strong>。</p><p>另外还有两个非常重要的特性，也是现代化监控系统的必要标志：</p><ul><li><p>采用了 pull 拉取的模型采集数据，简化了客户端的代码编写成本，并且 HTTP 协议非常利于调试。</p></li><li><p>支持服务发现，默认支持了 Consul 和 Kubernetes 原生发现系统，避免了繁杂的机器信息配置。</p></li></ul><p>至此，我们介绍了常见的 Metrics 指标监控系统，下面针对现在最流行的 Prometheus 展开做详细的讲解。</p><h3 id="prometheus-组成和架构" tabindex="-1">Prometheus 组成和架构 <a class="header-anchor" href="#prometheus-组成和架构" aria-label="Permalink to &quot;Prometheus 组成和架构&quot;">​</a></h3><p>Prometheus 架构由以下模块构成。</p><ul><li><p><strong>Prometheus Server</strong>：用于收集和存储 Metrics 数据。</p></li><li><p><strong>Service Disvovery</strong>：用于服务发现，获取服务对应的 EndPoint 用于数据采集，默认支持 DNS、Consul、Kubernestes 等多种发现方案。</p></li><li><p><strong>PushGateway</strong>：提供推送的方式采集数据，主要用于 Job 类，Job 类程序可能存活时间比较短，不适合采用拉取的方式。另外一些非常驻进程的脚本语言，比如 PHP，也需要使用此种方式。</p></li><li><p><strong>Exporters</strong>：用于一些第三方服务，通过转换提供符合 Prometheus 规范的 Metrics 信息，比如 Node Exporter 提供节点相关的信息。BlackBox 方便用户使用 HTTP、TCP 等方式对应用进程探活，以监控应用状态。</p></li><li><p><strong>Client Library</strong>：为各种语言提供的客户端库，提供 HTTP 服务的 Metrics 接口，当 Prometheus Server 拉取时，提供实时的 Metrics 数据。</p></li><li><p><strong>Alertmanager</strong>：告警管理器，接收 Prometheus Server 发来的告警信息，去除重复信息，分组后发送给相应的人员。通知方式支持 Email 和 WebHook 自定义等，一般会通过 WebHook 接入钉钉或者企业微信以达到实时报警的目的。</p></li></ul>',29),h=t('<p>Prometheus 架构图</p><h4 id="prometheus-数据模型" tabindex="-1">Prometheus 数据模型 <a class="header-anchor" href="#prometheus-数据模型" aria-label="Permalink to &quot;Prometheus 数据模型&quot;">​</a></h4><p>下面，我们通过一条简单的 Metrics 数据，来了解它由哪些模块组成：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">negri_http_request_total{client</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;serviceA&quot;</span><span style="color:#E1E4E8;">,code</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;200&quot;</span><span style="color:#E1E4E8;">,exported_service</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;serviceB&quot;</span><span style="color:#E1E4E8;">,path</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;/ping&quot;</span><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">negri_http_request_total{client</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;serviceA&quot;</span><span style="color:#24292E;">,code</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;200&quot;</span><span style="color:#24292E;">,exported_service</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;serviceB&quot;</span><span style="color:#24292E;">,path</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;/ping&quot;</span><span style="color:#24292E;">}</span></span></code></pre></div><p>Metrics 名字：首先是 Metrics 的名称，Metrics 的名称表明了这条数据的用途，比如上面这个数据是 Negri Sidecar 统计的总的请求数量。</p><p>Label 标签：这条数据中的 client、code、exported_service 和 path 都是标签，通过标签可以组成不同的查询语句，从不同维度获取数据。</p><h4 id="prometheus-的-metrics-类型" tabindex="-1">Prometheus 的 Metrics 类型 <a class="header-anchor" href="#prometheus-的-metrics-类型" aria-label="Permalink to &quot;Prometheus 的 Metrics 类型&quot;">​</a></h4><p>Prometheus 由四种不同的 Metrics 类型组成，这些 Metrics 类型适用于不同的应用场景，下面我就结合应用场景来聊一聊这四种类型。</p><p><strong>Counter</strong></p><p>累加值，非常适合统计 QPS。这个数据从服务开始就不停地累加，比如上面提到的 negri_http_request_total 就是一种 Counter 类型。它<strong>统计了服务启动至目前所有请求的数据，通过 rate 或者 irate 就可以计算出一段时间内的 QPS</strong> 。Counter 类型是 Prometheus Server 端计算的，相对于下面讲到的 Gauge，<strong>占用服务自身更少</strong>，建议高性能的微服务首选此种类型。</p><p><strong>Gauge</strong></p><p><strong>适合记录瞬时值</strong> ，比如统计一些突发事件，例如是否产生了熔断、限流等事件。因为是客户端 SDK 计算的，不太适合一些经常变化的数据。<strong>如果数据是一直增加的，建议使用 Counter</strong>；当然如果数据有增有减，也比较适合，因为监控中很少遇到增减比较频繁的数据。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">degrade_events{event</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;eventBreakerOpenStatus&quot;</span><span style="color:#E1E4E8;">,service</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;serviceB&quot;</span><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">degrade_events{event</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;eventBreakerOpenStatus&quot;</span><span style="color:#24292E;">,service</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;serviceB&quot;</span><span style="color:#24292E;">}</span></span></code></pre></div><p><strong>Histogram</strong></p><p>柱状图，适合统计服务的 99 延时等信息，比如下面的例子就是用于统计服务的延时状况：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">negri_http_response_time_us_bucket{client</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;serviceA&quot;</span><span style="color:#E1E4E8;">,exported_service</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;serviceB&quot;</span><span style="color:#E1E4E8;">,le</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;0.5&quot;</span><span style="color:#E1E4E8;">,path</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;/ping&quot;</span><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">negri_http_response_time_us_bucket{client</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;serviceA&quot;</span><span style="color:#24292E;">,exported_service</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;serviceB&quot;</span><span style="color:#24292E;">,le</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;0.5&quot;</span><span style="color:#24292E;">,path</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;/ping&quot;</span><span style="color:#24292E;">}</span></span></code></pre></div><p>如上述内容，可以通过查询语句绘制出 90 延时、95 延时、99 延时等指标， Histogram 和 Counter 类型一样，都是 Prometheus Server 端计算的，所以非常<strong>适合高性能的场景使用</strong>，相对于下面讲解的 Summary 有更小的损耗。</p><p><strong>Summary</strong></p><p>类似于 Histogram，适合统计服务的 99 延时信息。Summary 和 Gauge 类型一样，都是在程序内计算的，所以并不能像 Histogram 一样，在绘制图形的时候灵活的设置百分位，但相对来说，<strong>Summary 的数据也更加精准</strong>。</p><p>这里讲完了 Metrics 的常用数据结构，下面我们来看一下如果利用 Grafana 展示收集的 Metrics 信息。</p><h3 id="grafana-图形化展示" tabindex="-1">Grafana 图形化展示 <a class="header-anchor" href="#grafana-图形化展示" aria-label="Permalink to &quot;Grafana 图形化展示&quot;">​</a></h3><p>Grafana 是一套可视化监控指标工具，主要用于时序数据的展示，包括 Graphite、Elasticsearch、InfluxDB、Prometheus、CloudWatch、MySQL 和 OpenTSDB。这些数据源大多数我们在前面做过介绍。其中最常见的就是 Prometheus+Grafana 的组合。</p><p>通过 Grafana的 Web 图形界面，可以配置不同的面板，以多种方式展示数据源。</p>',23),u=r("p",null,"通过 Grafana 展示服务一段时间内的运行状态，包括常见的 QPS、延时等信息。",-1),g=t('<h3 id="常见问题" tabindex="-1">常见问题 <a class="header-anchor" href="#常见问题" aria-label="Permalink to &quot;常见问题&quot;">​</a></h3><h4 id="prometheus-适合什么样的监控场景" tabindex="-1">Prometheus 适合什么样的监控场景？ <a class="header-anchor" href="#prometheus-适合什么样的监控场景" aria-label="Permalink to &quot;Prometheus 适合什么样的监控场景？&quot;">​</a></h4><p>Metrics 数据监控，并不适合要求数据 100% 准确的场景，更多的是反映一段时间内<strong>某个数据指标的趋势和大概值</strong> 。采集数据是存在间隔的，计算数据也是有时间区间的，所以很难反映某一时刻的准确值，比如 CPU 的峰值，大概率会被平均掉。<strong>如果要查看精准数据，最好通过日志的方式收集后检索查看</strong>。</p><h4 id="单个服务节点-metrics-数量限制" tabindex="-1">单个服务节点 Metrics 数量限制 <a class="header-anchor" href="#单个服务节点-metrics-数量限制" aria-label="Permalink to &quot;单个服务节点 Metrics 数量限制&quot;">​</a></h4><p>Prometheus 虽然性能强大，但如果无规范的使用，随着采集数据节点增多，依然难以保证其稳定性。比如一些 RESTful 规范的 path（比如 /test/123，其中 123 为变量），如果不采取一些措施聚合，会造成 Metrics 爆炸。<strong>Metrics 的爆炸不仅会导致服务 OOM，也会导致 Prometheus 的内存使用量增大和检索变慢</strong>。</p><p>另外过多的标签变量、过多的 Histogram bucket，都会导致 Metrics 数量的增加。比如<strong>不合理地记录了调用端的来源 IP，同时也记录了服务自身的 IP，两者的 Metrics 数量就会变成乘积关系</strong>。这些不合理的指标不光会影响服务自身，也会影响 Prometheus 的稳定性，所以在输出 Metrics 信息的时候一定要注意，应该限制程序 Metrics 数量，加一个默认的上限条件。</p><h4 id="restful-path-如何处理" tabindex="-1">RESTful path 如何处理？ <a class="header-anchor" href="#restful-path-如何处理" aria-label="Permalink to &quot;RESTful path 如何处理？&quot;">​</a></h4><p>无论是在 Metrics 系统中，还是 Trace 系统中，都会遇到此类问题。RESTful 格式的 path 在某一阶段非常流行，特别是在 PC 互联网时代非常适合搜索引擎的 SEO，而且看起来美观，所以被广泛使用。</p><p>如果说在 Web 客户端使用还有因可循，但在微服务架构的内网使用就完全不可理解了，毕竟内网无法被搜索引擎搜索到。所以<strong>在微服务架构中，如果使用 HTTP 协议作为通信协议，建议抛弃 RESTful 的做法</strong>。</p><p>当然对于残留的一些服务，我们也使用 Trie Tree 的方式做了数据聚合，当某一层 path 大于一定阈值的时候，就抛弃之前的记录，合并为一个节点存储。这其实是 HTTP Server 中路由组件的一种逆向操作，在路由组件中一般会采用 Trie Tree 做路由匹配。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>这一讲我主要介绍了微服务中 Metrics 监控告警，通过今天的内容，相信你已经对服务的可观测性有了进一步的认识。在程序 Metrics 的输出打点中，我们要特别注意 Metrics 的数量，注意 Metrics 标签中的变量，如变量变化过多，会造成服务和 Prometheus 不稳定。</p>',12),d=r("p",null,"本讲内容到这里就结束了，下一讲我会讲解 Service Mesh 的技术选型，我们一起来看看如何在众多 Service Mesh 开源产品中选择适合你的产品。",-1),_=r("p",null,"结合这节内容的讲解，如果让你统计服务的基础信息，你会统计输出哪些信息呢？欢迎在留言区和我分享你的观点。我们下一讲再见！",-1);function m(E,b,y,q,P,v){const e=n("Image");return p(),l("div",null,[c,s(e,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/90/4C/CgqCHmAKh7WAS3kyAAFtuGRBoi0895.png"}),a(),h,s(e,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/90/4C/CgqCHmAKh9uAQAMSAAHVS5sXmD0847.png"}),a(),u,s(e,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/90/41/Ciqc1GAKh-KAR5LLAAMgpQx_lWg972.png"}),a(),g,s(e,{alt:"金句11.png",src:"https://s0.lgstatic.com/i/image/M00/91/3A/Ciqc1GAN5YmAb5kSAAL1ncn8r90570.png"}),a(),d,_])}const S=o(i,[["render",m]]);export{M as __pageData,S as default};
