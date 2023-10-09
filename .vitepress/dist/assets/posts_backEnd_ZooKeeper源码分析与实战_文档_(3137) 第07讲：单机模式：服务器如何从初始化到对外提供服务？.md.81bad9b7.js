import{_ as o,j as e,o as t,h as r,k as l,f as a,s,Q as p}from"./chunks/framework.d3daa342.js";const Z=JSON.parse('{"title":"第07讲：单机模式：服务器如何从初始化到对外提供服务？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/ZooKeeper源码分析与实战_文档/(3137) 第07讲：单机模式：服务器如何从初始化到对外提供服务？.md","filePath":"posts/backEnd/ZooKeeper源码分析与实战_文档/(3137) 第07讲：单机模式：服务器如何从初始化到对外提供服务？.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/ZooKeeper源码分析与实战_文档/(3137) 第07讲：单机模式：服务器如何从初始化到对外提供服务？.md"},E=s("h1",{id:"第07讲-单机模式-服务器如何从初始化到对外提供服务",tabindex:"-1"},[a("第07讲：单机模式：服务器如何从初始化到对外提供服务？ "),s("a",{class:"header-anchor",href:"#第07讲-单机模式-服务器如何从初始化到对外提供服务","aria-label":'Permalink to "第07讲：单机模式：服务器如何从初始化到对外提供服务？"'},"​")],-1),y=s("p",null,"本课时我们开始学习 ZooKeeper 服务器的启动管理与初始化相关的内容。",-1),i=s("p",null,"通过基础篇的学习我们已经掌握了 ZooKeeper 相关的基础知识，今天我们就开始进阶篇中的第一节课，本节课主要通过对单机版的 ZooKeeper 中的启动与服务的初始化过程进行分析，来学习 ZooKeeper 服务端相关的处理知识。现在我们就开始深入到服务器端看一看 ZooKeeper 是如何从初始化到对外提供服务的。",-1),d=s("h3",{id:"启动准备实现",tabindex:"-1"},[a("启动准备实现 "),s("a",{class:"header-anchor",href:"#启动准备实现","aria-label":'Permalink to "启动准备实现"'},"​")],-1),F=s("p",null,"在 ZooKeeper 服务的初始化之前，首先要对配置文件等信息进行解析和载入。也就是在真正开始服务的初始化之前需要对服务的相关参数进行准备，而 ZooKeeper 服务的准备阶段大体上可分为启动程序入口、zoo.cfg 配置文件解析、创建历史文件清理器等，如下图所示：",-1),g=p(`<p>QuorumPeerMain 类是 ZooKeeper 服务的启动接口，可以理解为 Java 中的 main 函数。 通常我们在控制台启动 ZooKeeper 服务的时候，输入 zkServer.cm 或 zkServer.sh 命令就是用来启动这个 Java 类的。如下代码所示，QuorumPeerMain 类函数只有一个 initializeAndRun 方法，是作用为所有 ZooKeeper 服务启动逻辑的入口。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> org.apache.zookeeper.server.quorum</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">Q</span><span style="color:#E1E4E8;">uorum</span><span style="color:#FDAEB7;font-style:italic;">P</span><span style="color:#E1E4E8;">eer</span><span style="color:#FDAEB7;font-style:italic;">M</span><span style="color:#E1E4E8;">ain {</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#FDAEB7;font-style:italic;">..</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">void</span><span style="color:#E1E4E8;"> main(</span><span style="color:#FDAEB7;font-style:italic;">S</span><span style="color:#E1E4E8;">tring[] args) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  .</span><span style="color:#FDAEB7;font-style:italic;">..</span></span>
<span class="line"><span style="color:#E1E4E8;">    main.initialize</span><span style="color:#FDAEB7;font-style:italic;">A</span><span style="color:#E1E4E8;">nd</span><span style="color:#FDAEB7;font-style:italic;">R</span><span style="color:#E1E4E8;">un(args);</span></span>
<span class="line"><span style="color:#E1E4E8;">  ...</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> org.apache.zookeeper.server.quorum</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">public</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">class</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">Q</span><span style="color:#24292E;">uorum</span><span style="color:#B31D28;font-style:italic;">P</span><span style="color:#24292E;">eer</span><span style="color:#B31D28;font-style:italic;">M</span><span style="color:#24292E;">ain {</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#B31D28;font-style:italic;">..</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">public</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">static</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">void</span><span style="color:#24292E;"> main(</span><span style="color:#B31D28;font-style:italic;">S</span><span style="color:#24292E;">tring[] args) {</span></span>
<span class="line"><span style="color:#24292E;">  .</span><span style="color:#B31D28;font-style:italic;">..</span></span>
<span class="line"><span style="color:#24292E;">    main.initialize</span><span style="color:#B31D28;font-style:italic;">A</span><span style="color:#24292E;">nd</span><span style="color:#B31D28;font-style:italic;">R</span><span style="color:#24292E;">un(args);</span></span>
<span class="line"><span style="color:#24292E;">  ...</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="解析配置文件" tabindex="-1">解析配置文件 <a class="header-anchor" href="#解析配置文件" aria-label="Permalink to &quot;解析配置文件&quot;">​</a></h4><p>知道了 ZooKeeper 服务的程序启动入口，那么我们现在就分析 ZooKeeper 的启动过程。在 ZooKeeper 启动过程中，首先要做的事情就是解析配置文件 zoo.cfg。在之前的课程中我们提到过，zoo.cfg 是服务端的配置文件，在这个文件中我们可以配置数据目录、端口号等信息。所以解析 zoo.cfg 配置文件是 ZooKeeper 服务启动的关键步骤。zoo.cfg 文件的具体解析过程会在后边的课程中专门展开讲解，这里我们只需要知道在服务启动的过程中会进行配置文件的解析。</p><h4 id="创建文件清理器" tabindex="-1">创建文件清理器 <a class="header-anchor" href="#创建文件清理器" aria-label="Permalink to &quot;创建文件清理器&quot;">​</a></h4><p>文件清理器在我们日常的使用中非常重要，我们都知道面对大流量的网络访问，ZooKeeper 会因此产生海量的数据，如果磁盘数据过多或者磁盘空间不足，则会导致 ZooKeeper 服务器不能正常运行，进而影响整个分布式系统。所以面对这种问题，ZooKeeper 采用了 DatadirCleanupManager 类作为历史文件的清理工具类。在 3.4.0 版本后的 ZooKeeper 中更是增加了自动清理历史数据的功能以尽量避免磁盘空间的浪费。如下代码所示，DatadirCleanupManager 类有 5 个属性，其中 snapDir 和 dataLogDir 分别表示数据快照地址以及日志数据的存放地址。而我们在日常工作中可以通过在 zoo.cfg 文件中配置 autopurge.snapRetainCount 和 autopurge.purgeInterval 这两个参数实现数据文件的定时清理功能，autopurge.purgeInterval 这个参数指定了清理频率，以小时为单位，需要填写一个 1 或更大的整数，默认是 0，表示不开启自己清理功能。autopurge.snapRetainCount 这个参数和上面的参数搭配使用，这个参数指定了需要保留的文件数目，默认是保留 3 个。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">DatadirCleanupManager</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> File snapDir;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> File dataLogDir;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> snapRetainCount;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> purgeInterval;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> Timer timer;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">DatadirCleanupManager</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> File snapDir;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> File dataLogDir;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> snapRetainCount;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> purgeInterval;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> Timer timer;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="服务初始化" tabindex="-1">服务初始化 <a class="header-anchor" href="#服务初始化" aria-label="Permalink to &quot;服务初始化&quot;">​</a></h3><p>经过了上面的配置文件解析等准备阶段后， ZooKeeper 开始服务的初始化阶段。初始化阶段可以理解为根据解析准备阶段的配置信息，实例化服务对象。服务初始化阶段的主要工作是创建用于服务统计的工具类，如下图所示主要有以下几种：</p><ol><li>ServerStats 类，它可以用于服务运行信息统计；</li><li>FileTxnSnapLog 类，可以用于数据管理。</li><li>会话管理类，设置服务器 TickTime 和会话超时时间、创建启动会话管理器等操作。</li></ol>`,10),v=p(`<p>下面我们就分别分析一下这几个关键步骤在 ZooKeeper 中的底层实现过程。</p><h4 id="serverstats创建" tabindex="-1">ServerStats创建 <a class="header-anchor" href="#serverstats创建" aria-label="Permalink to &quot;ServerStats创建&quot;">​</a></h4><p>首先，我们来看一下统计工具类 ServerStats。ServerStats 类用于统计 ZooKeeper 服务运行时的状态信息统计。主要统计的数据有服务端向客户端发送的响应包次数、接收到的客户端发送的请求包次数、服务端处理请求的延迟情况以及处理客户端的请求次数。在日常运维工作中，监控服务器的性能以及运行状态等参数很多都是这个类负责收集的。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ServerStats</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> packetsSent;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> packetsReceived;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> maxLatency;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> minLatency </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Long.MAX_VALUE;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> totalLatency </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> count </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ServerStats</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> packetsSent;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> packetsReceived;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> maxLatency;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> minLatency </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Long.MAX_VALUE;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> totalLatency </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> count </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="filetxnsnaplog-类" tabindex="-1">FileTxnSnapLog 类 <a class="header-anchor" href="#filetxnsnaplog-类" aria-label="Permalink to &quot;FileTxnSnapLog 类&quot;">​</a></h4><p>现在，我们再看一下另一个工具类 FileTxnSnapLog 类，该类的作用是用来管理 ZooKeeper 的数据存储等相关操作，可以看作为 ZooKeeper 服务层提供底层持久化的接口。在 ZooKeeper 服务启动过程中，它会根据 zoo.cfg 配置文件中的 dataDir 数据快照目录和 dataLogDir 事物日志目录来创建 FileTxnSnapLog 类。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> org.apache.zookeeper.server.persistence;</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">FileTxnSnapLog</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> File dataDir;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> File snapDir;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> TxnLog txnLog;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> SnapShot snapLog;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> autoCreateDB</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> org.apache.zookeeper.server.persistence;</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">FileTxnSnapLog</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> File dataDir;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> File snapDir;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> TxnLog txnLog;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> SnapShot snapLog;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> autoCreateDB</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="servercnxnfactory-类创建" tabindex="-1">ServerCnxnFactory 类创建 <a class="header-anchor" href="#servercnxnfactory-类创建" aria-label="Permalink to &quot;ServerCnxnFactory 类创建&quot;">​</a></h4><p>ZooKeeper 中客户端和服务端通过网络通信，其本质是通过 Java 的 IO 数据流的方式进行通信，但是传统的 IO 方式具有阻塞等待的问题，而 NIO 框架作为传统的 Java IO 框架的替代方案，在性能上大大优于前者。也正因如此，NIO 框架也被广泛应用于网络传输的解决方案中。而 ZooKeeper 最早也是使用自己实现的 NIO 框架，但是从 3.4.0 版本后，引入了第三方 Netty 等框架来满足不同使用情况的需求，而我们可以通过 ServerCnxnFactory 类来设置 ZooKeeper 服务器，从而在运行的时候使用我们指定的 NIO 框架。如代码中 ServerCnxnFactory 类通过</p><p>setServerCnxnFactory 函数来创建对应的工厂类。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">package</span><span style="color:#E1E4E8;"> org.apache.zookeeper.server;</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">abstract</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ServerCnxnFactory</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setZooKeeperServer</span><span style="color:#E1E4E8;">(ZooKeeperServer </span><span style="color:#FFAB70;">zks</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.zkServer </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> zks;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (zks </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (secure) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            zks.</span><span style="color:#B392F0;">setSecureServerCnxnFactory</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            zks.</span><span style="color:#B392F0;">setServerCnxnFactory</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">package</span><span style="color:#24292E;"> org.apache.zookeeper.server;</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">abstract</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ServerCnxnFactory</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#D73A49;">final</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setZooKeeperServer</span><span style="color:#24292E;">(ZooKeeperServer </span><span style="color:#E36209;">zks</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.zkServer </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> zks;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (zks </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (secure) {</span></span>
<span class="line"><span style="color:#24292E;">            zks.</span><span style="color:#6F42C1;">setSecureServerCnxnFactory</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            zks.</span><span style="color:#6F42C1;">setServerCnxnFactory</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>在通过 ServerCnxnFactory 类制定了具体的 NIO 框架类后。ZooKeeper 首先会创建一个线程</p><p>Thread 类作为 ServerCnxnFactory 类的启动主线程。之后 ZooKeeper 服务再初始化具体的 NIO 类。这里请你注意的是，虽然初始化完相关的 NIO 类 ，比如已经设置好了服务端的对外端口，客户端也能通过诸如 2181 端口等访问到服务端，但是此时 ZooKeeper 服务器还是无法处理客户端的请求操作。<strong>这是因为 ZooKeeper 启动后，还需要从本地的快照数据文件和事务日志文件中恢复数据</strong>。这之后才真正完成了 ZooKeeper 服务的启动。</p><h4 id="初始化请求处理链" tabindex="-1">初始化请求处理链 <a class="header-anchor" href="#初始化请求处理链" aria-label="Permalink to &quot;初始化请求处理链&quot;">​</a></h4><p>在完成了 ZooKeeper 服务的启动后，ZooKeeper 会初始化一个请求处理逻辑上的相关类。这个操作就是初始化请求处理链。所谓的请求处理链是一种责任链模式的实现方式，根据不同的客户端请求，在 ZooKeeper 服务器上会采用不同的处理逻辑。而为了更好地实现这种业务场景，ZooKeeper 中采用多个请求处理器类一次处理客户端请求中的不同逻辑部分。这种处理请求的逻辑方式就是责任链模式。而本课时主要说的是单机版服务器的处理逻辑，主要分为PrepRequestProcessor、SyncRequestProcessor、FinalRequestProcessor 3 个请求处理器，而在一个请求到达 ZooKeeper 服务端进行处理的过程，则是严格按照这个顺序分别调用这 3 个类处理请求中的对应逻辑，如下图所示。具体的内容，我们会在后面的课程中详细讲解。</p>`,15),h=s("h3",{id:"总结",tabindex:"-1"},[a("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),u=s("p",null,"本课时是我们进阶篇阶段的第一课，在整个进阶篇中，我们主要从 ZooKeeper 服务内部的实现逻辑来学习 ZooKeeper 中的相关知识，而本课时从单机版服务器的启动，到对外提供服务的整个过程，逐步分析 ZooKeeper 实现的每个步骤，理解 ZooKeeper 服务器的初始化、配置解析、服务实例化等过程对我们日后在工作中分析排查 ZooKeeper 产生的相关问题以及提高 ZooKeeper 服务器的稳定性或性能都有很大的帮助。",-1),D=s("p",null,"通过本课时的学习我们知道了 ZooKeeper 服务单机版启动的关键步骤，下面我们来思考这个问题：在我们启动单机版服务器的时候，如果 ZooKeeper 服务通过 zoo.cfg 配置文件的相关参数，利用 FileTxnSnapLog 类来实现相关数据的本地化存储。那么我们在日常的开发维护中，如何才能知道当前存储 ZooKeeper 相关数据的磁盘容量应该设置多大的空间才能满足当前业务的发展？如何才能尽量减少磁盘空间的浪费？",-1),_=s("p",null,"我们可以通过 DatadirCleanupManager 类来对历史文件进行清理以避免太多的历史数据占据磁盘空间造成不必要的浪费。",-1);function A(f,k,b,C,S,m){const n=e("Image");return t(),r("div",null,[E,y,i,d,F,l(n,{alt:"image (5).png",src:"https://s0.lgstatic.com/i/image/M00/12/F2/Ciqc1F7OQ_uAU5yzAABbrnOyALM516.png"}),a(),g,l(n,{alt:"image (6).png",src:"https://s0.lgstatic.com/i/image/M00/12/FD/CgqCHl7ORB-AdNM1AABRbvNSlEE886.png"}),a(),v,l(n,{alt:"image (7).png",src:"https://s0.lgstatic.com/i/image/M00/12/FD/CgqCHl7ORDiAIMqzAABBGUvvhFU739.png"}),a(),h,u,D,_])}const B=o(c,[["render",A]]);export{Z as __pageData,B as default};
