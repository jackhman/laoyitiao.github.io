import{_ as o,D as e,o as t,g as c,J as l,h as a,Q as p,m as s}from"./chunks/framework.f67d7268.js";const vs=JSON.parse('{"title":"15应用性能监控：通过SkyWalking实施链路追踪","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/SpringCloud Alibaba 实战_文档/(6760) 15  应用性能监控：通过 SkyWalking 实施链路追踪.md","filePath":"posts/backEnd/SpringCloud Alibaba 实战_文档/(6760) 15  应用性能监控：通过 SkyWalking 实施链路追踪.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/SpringCloud Alibaba 实战_文档/(6760) 15  应用性能监控：通过 SkyWalking 实施链路追踪.md"},i=p('<h1 id="_15应用性能监控-通过skywalking实施链路追踪" tabindex="-1">15应用性能监控：通过SkyWalking实施链路追踪 <a class="header-anchor" href="#_15应用性能监控-通过skywalking实施链路追踪" aria-label="Permalink to &quot;15应用性能监控：通过SkyWalking实施链路追踪&quot;">​</a></h1><p>上一讲我们掌握了基于 Sleuth+Zipkin 对微服务架构实施基于日志的链路追踪，通过 Sleuth 在微服务应用中附加链路数据，再通过 Zipkin 实现链路数据收集与可视化，从而保证开发与运维人员在生产环境了解微服务的执行过程与具体细节，为产品运维提供了有力的保障。</p><p>本讲咱们还是围绕链路追踪这个话题，介绍另一款著名的链路追踪产品 SkyWalking，掌握 SkyWalking 的使用方法。本讲咱们将介绍三方面内容：</p><ul><li><p>介绍 APM 与 SkyWalking；</p></li><li><p>部署 SkyWalking 服务端与 Java Agent；</p></li><li><p>介绍 SkyWalking 常用视图。</p></li></ul><h3 id="apm-与-skywalking" tabindex="-1">APM 与 SkyWalking <a class="header-anchor" href="#apm-与-skywalking" aria-label="Permalink to &quot;APM 与 SkyWalking&quot;">​</a></h3><p>这些年随着微服务体系的不断完善，链路追踪已经不是什么新兴的概念与技术，很多厂商也提供了自己的链路追踪产品，例如 Spring Cloud Slueth、Zipkin、阿里鹰眼、大众点评 Cat、SkyWalking 等。但这些产品都有一个共同的名字：APM（Application Performance Management），即应用性能管理系统。顾名思义这些产品的根本目的就是对应用程序单点性能与整个分布式应用进行监控，记录每一个环节程序执行状况，通过图表与报表的形式让运维人员随时掌握系统的运行状况，其中在这些著名的产品中我非常推荐各位掌握 SkyWalking 这款 APM 产品，理由很简单，它在简单易用的前提下实现了比 Zipkin 功能更强大的链路追踪、同时拥有更加友好、更详细的监控项，并能自动生成可视化图表。相比 Sleuth+Zipkin 这种不同厂商间混搭组合，SkyWalking 更符合国内软件业的&quot;一站式解决方案&quot;的设计理念，下面咱们来了解下 SKyWalking。</p><p>SkyWalking 是中国人吴晟（华为）开源的应用性能管理系统（APM）工具，使用Java语言开发，后来吴晟将其贡献给 Apache，在 Apache 的背书下 SkyWalking 发展迅速，现在已属于 Apache 旗下顶级开源项目，它的官网：<a href="http://skywalking.apache.org/?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">http://skywalking.apache.org/</a>。</p><p>SkyWalking 提供了分布式追踪、服务网格遥测分析、度量聚合和可视化一体化解决方案。目前在 GitHub 上 SkyWaking 拥有 15.9K Star，最新版本为：8.3.0。</p>',8),y=s("p",null,"链路追踪视图",-1),E=s("p",null,"指标监控全局视图",-1),g=s("p",null,"为了能够让各位有个直观认识，我们通过 Sleuth+Zipkin 与 SkyWalking 做对比，看两者的优劣。",-1),k=s("p",null,"通过比较我们可以发现，在易用性和使用体验上，SkyWalking 明显好于 Zipkin，功能更丰富的同时也更符合国人习惯，但因为迭代速度较快，社区文档相对陈旧，这也导致很多技术问题需要程序员自己研究解决，因此在解决问题方面需要更多的时间。",-1),_=s("h3",{id:"部署-skywalking-服务端与-java-agent",tabindex:"-1"},[a("部署 SkyWalking 服务端与 Java Agent "),s("a",{class:"header-anchor",href:"#部署-skywalking-服务端与-java-agent","aria-label":'Permalink to "部署 SkyWalking 服务端与 Java Agent"'},"​")],-1),d=s("p",null,"在了解 SkyWalking 后，咱们正式进入 SkyWalking 的安装与使用吧。",-1),A=s("h4",{id:"部署-skywalking-服务端",tabindex:"-1"},[a("部署 SkyWalking 服务端 "),s("a",{class:"header-anchor",href:"#部署-skywalking-服务端","aria-label":'Permalink to "部署 SkyWalking 服务端"'},"​")],-1),h=s("p",null,"首先咱们要理解 SkyWalking 架构图",-1),S=s("p",null,"SkyWalking 的架构图",-1),u=s("p",null,"SkyWalking 同样采用客户端与服务端架构模式，SkyWalking 服务端用于接收来自 Java Agent 客户端发来的链路跟踪与指标数据，汇总统计后由 SkyWalking UI 负责展现。SkyWalking 服务端同时支持 gRPC 与 HTTP 两种上报方式。其中 gRPC 默认监听服务器 11800 端口，HTTP 默认监听 12800 端口，而 SKyWalking UI 应用则默认监听 8080 端口，这三个端口在生产环境下要在防火墙做放行配置。在存储层面，SkyWalking 底层支持 ElasticSearch 、MySQL、H2等多种数据源，官方优先推荐使用 ElasticSearch，如果此时你不会 ElasticSearch 也没关系，按文中步骤操作也能完成部署。",-1),v=s("p",null,"首先咱们根据架构图部署 SkyWalking 服务端。",-1),D=s("p",null,[s("strong",null,"第一步，安装 ElasticSearch 全文检索引擎。")],-1),F=s("p",null,"ElasticSearch 简称 ES，是业内最著名的全文检索引擎，常用于构建站内搜索引擎，SkyWalking 官方推荐使用 ES 作为数据存储组件。这里直接访问 ES 官网下载页：",-1),m=s("p",null,[s("a",{href:"https://www.elastic.co/cn/downloads/elasticsearch?fileGuid=xxQTRXtVcqtHK6j8",target:"_blank",rel:"noreferrer"},"https://www.elastic.co/cn/downloads/elasticsearch")],-1),W=s("p",null,"下载对应平台的 ES 服务器程序。",-1),C=s("p",null,"ElasticSearch 下载页",-1),b=s("p",null,"下载后会得到 elasticsearch-7.10.2-windows-x86_64.zip 文件，解压缩后无须任何修改直接运行 bin/elasticsearch.bat 文件，如果是 Linux 系统则运行 elasticsearch.sh 文件。",-1),j=s("p",null,"ElasticSearch 启动成功画面",-1),B=s("p",null,"默认 ES 监听 9200 与 9300 端口，其中 9200 是 ES 对外提供服务的端口；9300 是 ES 进行集群间通信与数据传输的端口，请确保这两个端口没有被占用。",-1),f=s("p",null,[s("strong",null,"第二步，下载 SkyWalking。")],-1),P=s("p",null,[a("访问"),s("a",{href:"https://skywalking.apache.org/downloads/?fileGuid=xxQTRXtVcqtHK6j8",target:"_blank",rel:"noreferrer"},"https://skywalking.apache.org/downloads/"),a("，下载最新版 SkyWalking 8.3.0，注意版本选择 v8.3.0 for ES7。")],-1),w=s("p",null,"SkyWalking 下载页",-1),T=s("p",null,'下载完毕，解压缩文件得到 apache-skywalking-apm-bin-es7 目录。这里有个重要细节，SkyWalking 路径不要包含任何中文、特殊字符甚至是空格，否则启动时会报"找不到模板文件"的异常。',-1),M=s("p",null,"SkyWalking 目录",-1),O=s("p",null,[s("strong",null,"第三步，配置 SkyWalking 数据源。")],-1),J=s("p",null,"SKyWalking 收集到的数据要被存储在 ElasticSearch 中，因此需要指定数据源。在 config 目录下找到 application.yml，这是 SkyWalking 的核心配置文件。",-1),I=p(`<p>SkyWalking 核心配置文件</p><p>在配置文件 103 行附近可以看到 storage 配置片段。</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">storage</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">selector</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">\${SW_STORAGE:h2}</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">elasticsearch</span><span style="color:#E1E4E8;">: </span><span style="color:#6A737D;">#ES6配置 </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">...</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">elasticsearch7</span><span style="color:#E1E4E8;">: </span><span style="color:#6A737D;">#ES7配置</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">nameSpace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">\${SW_NAMESPACE:&quot;&quot;}</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">clusterNodes</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">\${SW_STORAGE_ES_CLUSTER_NODES:localhost:9200}</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">protocol</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">\${SW_STORAGE_ES_HTTP_PROTOCOL:&quot;http&quot;}</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">...</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">storage</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">selector</span><span style="color:#24292E;">: </span><span style="color:#032F62;">\${SW_STORAGE:h2}</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">elasticsearch</span><span style="color:#24292E;">: </span><span style="color:#6A737D;">#ES6配置 </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">...</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">elasticsearch7</span><span style="color:#24292E;">: </span><span style="color:#6A737D;">#ES7配置</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">nameSpace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">\${SW_NAMESPACE:&quot;&quot;}</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">clusterNodes</span><span style="color:#24292E;">: </span><span style="color:#032F62;">\${SW_STORAGE_ES_CLUSTER_NODES:localhost:9200}</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">protocol</span><span style="color:#24292E;">: </span><span style="color:#032F62;">\${SW_STORAGE_ES_HTTP_PROTOCOL:&quot;http&quot;}</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">...</span></span></code></pre></div><p>默认 SkyWalking 采用内置 H2 数据库存储监控数据，现在需要改为 elasticsearch7，这样就完成了数据源存储的切换，在启动时 SkyWalking 会自动初始化 ES 的索引。</p><p>修改前：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">selector</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> \${SW_STORAGE</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">h2}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">selector</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> \${SW_STORAGE</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">h2}</span></span></code></pre></div><p>修改后：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">selector</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> \${SW_STORAGE</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">elasticsearch7}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">selector</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> \${SW_STORAGE</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">elasticsearch7}</span></span></code></pre></div><p>到这里，SkyWalking 数据源配置成功。</p><p><strong>第四步，启动 SkyWalking 应用。</strong></p><p>在 bin 目录下找到 startup.bat 运行，如果是 Linux 系统运行 startup.sh。</p>`,11),V=s("p",null,"SkyWalking 启动文件",-1),q=s("p",null,"启动后会产生两个 Java 进程：",-1),R=s("ul",null,[s("li",null,[s("p",null,"Skywalking-Collector 是数据收集服务，默认监听 11800（gRPC）与 12800（HTTP） 端口。")]),s("li",null,[s("p",null,"Skywalking-Webapp 是 SkyWalking UI，用于展示数据，默认监听 8080 端口。")])],-1),x=s("p",null,"Skywalking 应用已启动",-1),H=s("p",null,[a("启动成功后，访问"),s("a",{href:"http://192.168.31.10:8080/?fileGuid=xxQTRXtVcqtHK6j8",target:"_blank",rel:"noreferrer"},"http://192.168.31.10:8080/"),a("，如果看到 SkyWalking UI 首页，则说明服务端配置成功。")],-1),N=p(`<p>SkyWalking UI 首页</p><p>到这里，SkyWalking 服务端启动完毕，下面咱们来说明如何通过 SkyWalking Java Agent 上报链路数据。</p><h4 id="安装-skywalking-java-agent" tabindex="-1">安装 SkyWalking Java Agent <a class="header-anchor" href="#安装-skywalking-java-agent" aria-label="Permalink to &quot;安装 SkyWalking Java Agent&quot;">​</a></h4><p>在前面提到，SkyWalking 可以在不修改应用源码的前提下，无侵入的实现链路追踪与 JVM 指标监控，它是怎么做到的？这里涉及一个 Java1.5 新增的特性，Java Agent 探针技术，想必对于很多工作多年 Java 工程师来说，Java Agent 也是一个陌生的东西。</p><p>Java Agent 探针说白了就是 Java 提供的一种&quot;外挂&quot;技术，允许在应用开发的时候在通过启动时增加 javaagent 参数来外挂一些额外的程序。</p><p>Java Agent 并不复杂，其扩展类有这严格的规范，必须创建名为 premain 的方法，该方法将在目标应用 main 方法前执行，下面就是最简单的 Java Agent 扩展类。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SimpleAgent</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">premain</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">agentArgs</span><span style="color:#E1E4E8;">, Instrumentation </span><span style="color:#FFAB70;">inst</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;=========开始执行premain============&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SimpleAgent</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">premain</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">agentArgs</span><span style="color:#24292E;">, Instrumentation </span><span style="color:#E36209;">inst</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;=========开始执行premain============&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>要完成 Java Agent，还需要提供正确的 MANIFEST.MF，以便 JVM 能够选择正确的类。在 META-INF 目录下找到你的 MANIFEST.MF 文件：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">Manifest</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">Version</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1.0</span></span>
<span class="line"><span style="color:#E1E4E8;">Premain</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">Class</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> com.lagou.agent.SimpleAgent</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">Manifest</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">Version</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1.0</span></span>
<span class="line"><span style="color:#24292E;">Premain</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">Class</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> com.lagou.agent.SimpleAgent</span></span></code></pre></div><p>之后我们将这个类打包为 agent.jar，假设原始应用为 oa.jar，在 oa.jar 启动时需要在额外附加 javaagent 参数，如下所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">java </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">javaagent</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">agent.jar </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">jar oa.jar</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">java </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">javaagent</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">agent.jar </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">jar oa.jar</span></span></code></pre></div><p>在应用启动时 Java 控制台会输出如下日志。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">=========</span><span style="color:#E1E4E8;">开始执行 premain</span><span style="color:#F97583;">============</span></span>
<span class="line"><span style="color:#E1E4E8;">正在启动 OA 办公自动化系统...</span></span>
<span class="line"><span style="color:#E1E4E8;">....</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">=========</span><span style="color:#24292E;">开始执行 premain</span><span style="color:#D73A49;">============</span></span>
<span class="line"><span style="color:#24292E;">正在启动 OA 办公自动化系统...</span></span>
<span class="line"><span style="color:#24292E;">....</span></span></code></pre></div><p>通过结果你会发现 java agent 在目标应用main执行前先执行了premain，实现了不修改OA源码的前提下增加了新的功能。</p><p>SkyWalking 也是利用 Java Agent 的特性，在 premain 中通过字节码增强技术对目标方法进行扩展，当目标方法执行时自动收集链路追踪及监控数据并发往 SkyWalking 服务端。</p><p>下面咱们来讲解如何加载并使用 SkyWalking Java Agent，我们还是以实例进行讲解，因为 Java Agent 是无侵入的，并不需要源码，这里我就直接给出调用关系图帮助咱们理解。</p>`,16),G=s("p",null,"调用关系图",-1),Q=s("p",null,"简单介绍下，用户访问 a 服务的 a 接口，a 服务通过 OpenFeign 远程调用 b 服务的 b 接口，b 服务通过 OpenFeign 调用 c 服务的 c 接口，最后 c 接口通过 JDBC 将业务数据存储到 MySQL 数据库。",-1),U=s("p",null,"下面咱们演示 SkyWalking Java Agent 的用法，在 skywalking 的 agent 目录下存在 skywalking-agent.jar，这就是 skywalking 提供的 Java Agent 扩展类。",-1),Z=p('<p>SkyWalking Java Agent</p><p>如果是生产环境下在启动应用时附加 javaagent 参数即可。</p><p>a 服务启动命令：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">java </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">javaagent</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">D</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">\\apache</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">skywalking</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">apm</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">bin</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">es7\\agent\\skywalking</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">agent.jar </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">Dskywalking.agent.service_name</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">a</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">service </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">Dskywalking.collector.backend_service</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">192.168</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">31</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">10</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">11800</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">Dskywalking.logging.file_name</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">a</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">service</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">api.log </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">jar a</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">service.jar</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">java </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">javaagent</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">D</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">\\apache</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">skywalking</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">apm</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">bin</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">es7\\agent\\skywalking</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">agent.jar </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">Dskywalking.agent.service_name</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">a</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">service </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">Dskywalking.collector.backend_service</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">192.168</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">31</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">10</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">11800</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">Dskywalking.logging.file_name</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">a</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">service</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">api.log </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">jar a</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">service.jar</span></span></code></pre></div><p>b 服务启动命令：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">java </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">javaagent</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">D</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">\\apache</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">skywalking</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">apm</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">bin</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">es7\\agent\\skywalking</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">agent.jar </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">Dskywalking.agent.service_name</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">b</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">service </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">Dskywalking.collector.backend_service</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">192.168</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">31</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">10</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">11800</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">Dskywalking.logging.file_name</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">b</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">service</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">api.log </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">jar b</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">service.jar</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">java </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">javaagent</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">D</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">\\apache</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">skywalking</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">apm</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">bin</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">es7\\agent\\skywalking</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">agent.jar </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">Dskywalking.agent.service_name</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">b</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">service </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">Dskywalking.collector.backend_service</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">192.168</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">31</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">10</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">11800</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">Dskywalking.logging.file_name</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">b</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">service</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">api.log </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">jar b</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">service.jar</span></span></code></pre></div><p>c 服务启动命令：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">java </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">javaagent</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">D</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">\\apache</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">skywalking</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">apm</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">bin</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">es7\\agent\\skywalking</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">agent.jar </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">Dskywalking.agent.service_name</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">c</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">service </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">Dskywalking.collector.backend_service</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">192.168</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">31</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">10</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">11800</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">Dskywalking.logging.file_name</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">c</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">service</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">api.log </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">jar c</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">service.jar</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">java </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">javaagent</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">D</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">\\apache</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">skywalking</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">apm</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">bin</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">es7\\agent\\skywalking</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">agent.jar </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">Dskywalking.agent.service_name</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">c</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">service </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">Dskywalking.collector.backend_service</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">192.168</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">31</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">10</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">11800</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">Dskywalking.logging.file_name</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">c</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">service</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">api.log </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">jar c</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">service.jar</span></span></code></pre></div><p>如果是在 idea 开发环境运行，需要在 VM options 附加 javaagent。</p>',9),L=p('<p>IDEA 中使用 SkyWalking Java Agent</p><p>除了 javaagent 指定具体 agent 文件外，agent 本身也支持一系列配置参数，在刚才的启动时涉及 3 个。</p><ul><li><p><strong>skywalking.agent.service_name</strong>：指定在 SkyWalking 上报数据时的服务名。</p></li><li><p><strong>skywalking.collector.backend_service</strong>：指定 SkyWalking 服务端的通信IP与端口。</p></li><li><p><strong>skywalking.logging.file_name</strong>：指定 agent 生成的上报日志文件名，日志文件保存 agent 的 logs 目录中。</p></li></ul><h4 id="介绍-skywalking-常用视图" tabindex="-1">介绍 SkyWalking 常用视图 <a class="header-anchor" href="#介绍-skywalking-常用视图" aria-label="Permalink to &quot;介绍 SkyWalking 常用视图&quot;">​</a></h4><p>当服务启动后，为了演示需要，我利用 PostMan 对 a 接口模拟 10000次 用户访问，看 SkyWalking UI 中产生哪些变化。</p>',5),$=s("p",null,"PostMan 压力测试",-1),K=s("p",null,[a("此时访问"),s("a",{href:"http://192.168.31.10:8080/?fileGuid=xxQTRXtVcqtHK6j8",target:"_blank",rel:"noreferrer"},"http://192.168.31.10:8080/"),a("，打开 SKyWalking UI，默认显示全局的应用性能，具体用途我已在图中标出，其中我认为比较重要的是服务状态指数与高延迟端点列表两项，服务状态指数越接近 1 代表该服务运行状况越好，而高延迟端点列表则将处理延迟高的 API 端点列出，这可能是我们重点排查与优化的对象。")],-1),X=s("p",null,"全局监控",-1),Y=s("p",null,'除了全局监控外，SkyWalking 链路追踪的展示也非常友好，点击"拓扑"按钮可以查看访问拓扑图。服务间依赖关系一目了然。',-1),z=s("p",null,"拓扑图",-1),ss=s("p",null,"除此之外，链路追踪的展示也非常强大，服务间的 API 调用关系与执行时间、调用状态清晰列出，而且因为 SkyWalking 是方法层面上的扩展，会提供更加详细的方法间的调用过程。",-1),as=s("p",null,"链路追踪图",-1),ns=s("p",null,"提供不同维度的视图",-1),ls=s("p",null,'SkyWalking 基于 Java Agent 对数据库的运行指标也进行收集，点击"database"便进入数据库指标监控。',-1),ps=s("p",null,"数据库视图",-1),os=s("p",null,"如果你用过 SkyWalking 一定会被它简单的使用方法与强大的功能所折服，在SkyWalking提供了多达几十种不同维度、不同方式的数据展示方案，例如基于服务实例的JVM检测仪表盘就能让我们了解该服务 JVM 的资源分配过程，分析其中潜在的问题。",-1),es=s("p",null,"服务实例的 JVM 监控",-1),ts=s("p",null,"JVM 监控",-1),cs=s("p",null,"讲到这，咱们已经完成了 SkyWalking 的安装部署与应用接入，同时也对各种监控图表进行了介绍。因为篇幅有限，只能带着大家对 SkyWalking 进行入门讲解。当然 SKyWalking 也不是全能的，在生产环境下 SkyWalking 还需要额外考虑很多问题，如 SkyWalking 的集群管理、访问权限控制、自监控、风险预警等都要逐步完善，因此很多互联网公司也基于 SkyWalking 做二次开发以满足自身的需求，希望你也能在使用过程中对 SkyWalking 的潜力进行挖掘、了解。",-1),rs=s("h3",{id:"小结与预告",tabindex:"-1"},[a("小结与预告 "),s("a",{class:"header-anchor",href:"#小结与预告","aria-label":'Permalink to "小结与预告"'},"​")],-1),is=s("p",null,"本讲咱们学习了三方面内容，首先了解了 APM 与 SkyWalking 的作用；其次讲解了 SkyWalking 的部署过程与接入过程，介绍了 Java Agent 探针技术；最后对 SkyWalking UI 提供的各种图表进行了说明。",-1),ys=s("p",null,"在这里我为你准备了一个有趣的讨论题：你的领导希望项目使用 Sleuth+Zipkin 实现链路追踪，而你作为架构师更希望引入 SkyWalking，你有什么办法在不得罪领导的前提下让他改变想法呢？这是所有架构师都要面对的问题，欢迎在评论区一起探讨。",-1),Es=s("p",null,"下一讲，咱们开始一个新话题：在微服务（分布式）架构下如何保证数据一致性。",-1);function gs(ks,_s,ds,As,hs,Ss){const n=e("Image");return t(),c("div",null,[i,l(n,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M01/2C/B0/CioPOWBld3yAYjnPAAW7sf0vPwg338.png"}),a(),y,l(n,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M00/2C/A8/Cgp9HWBld4SAPAAzAAWVdqvX5xc517.png"}),a(),E,g,l(n,{alt:"202141-155716.png",src:"https://s0.lgstatic.com/i/image6/M00/2C/B3/CioPOWBlfPKAMpDiAAFs6fz0JjQ094.png"}),a(),k,_,d,A,h,l(n,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image6/M00/2C/B3/CioPOWBlfLeAdmXOAARZeR55FBs329.png"}),a(),S,u,v,D,F,m,W,l(n,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image6/M00/2C/B3/CioPOWBlfM-APF4nAAIJZ6bVGsI987.png"}),a(),C,b,l(n,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image6/M00/2C/AB/Cgp9HWBlfNqAcFzWABLVO06FsDw638.png"}),a(),j,B,f,P,l(n,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image6/M00/2C/B3/CioPOWBlfQSAZ1COAAOgO9OuHFY248.png"}),a(),w,T,l(n,{alt:"图片7.png",src:"https://s0.lgstatic.com/i/image6/M00/2C/B4/CioPOWBlfQ2ADrQqAAX_hq6BcNY797.png"}),a(),M,O,J,l(n,{alt:"图片8.png",src:"https://s0.lgstatic.com/i/image6/M00/2C/B4/CioPOWBlfRWAEC-7AAHrDj6mnPM675.png"}),a(),I,l(n,{alt:"图片9.png",src:"https://s0.lgstatic.com/i/image6/M00/2C/B4/CioPOWBlfSeAQNnwAAJkQmq3QUU512.png"}),a(),V,q,R,l(n,{alt:"图片10.png",src:"https://s0.lgstatic.com/i/image6/M00/2C/B4/CioPOWBlfTCAI-XvAAHnlAR2Ayk280.png"}),a(),x,H,l(n,{alt:"图片11.png",src:"https://s0.lgstatic.com/i/image6/M01/2C/AB/Cgp9HWBlfTuAJKIFAAIgcUoZfD4258.png"}),a(),N,l(n,{alt:"图片12.png",src:"https://s0.lgstatic.com/i/image6/M00/2C/B4/CioPOWBlfU6AGr3LAAFCNrZQT4I548.png"}),a(),G,Q,U,l(n,{alt:"图片13.png",src:"https://s0.lgstatic.com/i/image6/M01/2C/AB/Cgp9HWBlfVeAUDQOAALeSr7VkDQ887.png"}),a(),Z,l(n,{alt:"图片14.png",src:"https://s0.lgstatic.com/i/image6/M01/2C/AB/Cgp9HWBlfXyAYRUQAAH2GtG-8us746.png"}),a(),L,l(n,{alt:"图片15.png",src:"https://s0.lgstatic.com/i/image6/M00/2C/B4/CioPOWBlfYWAAmpGAADp5LHFtb4470.png"}),a(),$,K,l(n,{alt:"图片16.png",src:"https://s0.lgstatic.com/i/image6/M00/2C/B4/CioPOWBlfY6AGeULAAM7ej7_VNE922.png"}),a(),X,Y,l(n,{alt:"图片17.png",src:"https://s0.lgstatic.com/i/image6/M00/2C/B4/CioPOWBlfZeAIXHIAAFgEZVxafQ379.png"}),a(),z,ss,l(n,{alt:"图片18.png",src:"https://s0.lgstatic.com/i/image6/M00/2C/B4/CioPOWBlfZ-AJuu5AALJXp72suc036.png"}),a(),as,l(n,{alt:"图片19.png",src:"https://s0.lgstatic.com/i/image6/M00/2C/B4/CioPOWBlfaeAZYPdAAMKjEV-8kM730.png"}),a(),ns,ls,l(n,{alt:"图片20.png",src:"https://s0.lgstatic.com/i/image6/M01/2C/AC/Cgp9HWBlfa-ALznUAAMWPMZaMuM498.png"}),a(),ps,os,l(n,{alt:"图片21.png",src:"https://s0.lgstatic.com/i/image6/M01/2C/B4/CioPOWBlfcCAS2PoAAO4VHJx5Po460.png"}),a(),es,ts,cs,rs,is,ys,Es])}const Ds=o(r,[["render",gs]]);export{vs as __pageData,Ds as default};
