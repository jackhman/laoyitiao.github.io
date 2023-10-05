import{_ as l,j as e,o as c,g as t,k as p,h as a,s,Q as o}from"./chunks/framework.4e7d56ce.js";const z=JSON.parse('{"title":"如何在生产环境部署 Nacos 集群 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/SpringCloud Alibaba 实战_文档/(6750) 05  高可用保证：Naco 如何有效构建注册中心集群.md","filePath":"posts/backEnd/SpringCloud Alibaba 实战_文档/(6750) 05  高可用保证：Naco 如何有效构建注册中心集群.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/SpringCloud Alibaba 实战_文档/(6750) 05  高可用保证：Naco 如何有效构建注册中心集群.md"},i=s("p",null,"上一节我们学习了 Nacos 注册中心的作用以及单点运行的方法，但是单点运行是分布式应用的大忌，在分布式架构中，任何单点都可能成为系统的瓶颈，因此在生产环境中 Nacos 都需要通过部署集群来为系统带来高可用性。因此本文围绕 Nacos 集群主要讲解以下三方面内容：",-1),y=s("ul",null,[s("li",null,[s("p",null,"生产环境 Nacos 集群的设计要点；")]),s("li",null,[s("p",null,"Nacos 集群的部署过程；")]),s("li",null,[s("p",null,"介绍 Nacos 集群的工作原理。")])],-1),E=s("h3",{id:"如何在生产环境部署-nacos-集群",tabindex:"-1"},[a("如何在生产环境部署 Nacos 集群 "),s("a",{class:"header-anchor",href:"#如何在生产环境部署-nacos-集群","aria-label":'Permalink to "如何在生产环境部署 Nacos 集群"'},"​")],-1),d=s("p",null,"首先介绍下之前我们在国内某互联网金融机构在项目中落地的 Nacos 集群架构图。",-1),g=o('<p>Nacos 生产环境架构</p><p>下面我们来解读下 Nacos 集群架构的设计要点：</p><ol><li><p>微服务并不是直接通过 IP 地址访问后端服务，而是采用域名访问。通过 DNS（域名解析服务）转换为具体的 IP 地址，通过域名方式屏蔽后端容易产生变化的 IP 地址。</p></li><li><p>底层 Nacos 自带集群间节点与数据同步方案，因此需要 Nacos 节点对外暴露 8848 与 7848 端口。其中 8848 端口的作用是对外暴露 API 与集群间数据同步，而 7848 端口则用于节点选举来确定集群领袖（Leader）。同时 Nacos 在集群环境下需要持久化应用配置、用户权限、历史信息等内置数据，因此需要额外部署 MySQL 数据库提供统一存储。</p></li><li><p>在 Nacos 层面，每一台服务器都有独立的 IP。我们并不建议直接将物理 IP 对外暴露，而是额外增加 VIP（虚拟 IP），通过 DNS 服务绑定 VIP，这样的好处是通过 VIP 屏蔽了Nacos集群实际的物理IP地址，同时为访问者提供了统一的接入入口，使微服务的注册接入和Nacos 集群实现细节彼此解耦，提高架构的维护性。</p></li></ol><h3 id="nacos-集群的部署过程" tabindex="-1">Nacos 集群的部署过程 <a class="header-anchor" href="#nacos-集群的部署过程" aria-label="Permalink to &quot;Nacos 集群的部署过程&quot;">​</a></h3><p>第一步，环境准备。</p><p>Nacos 因为选举算法的特殊性，要求最少三个节点才能组成一个有效的集群，关于选举算法我会在后面课程中进行讲解，感兴趣的同学可以持续关注。</p>',6),u=s("p",null,"Nacos 采用 Raft 选举算法构成集群",-1),_=s("p",null,"这里需要准备三台服务器（虚拟机）。",-1),h=s("p",null,"我为此准备了三个 CentOS 7 节点，符合最低运行要求，其 IP 地址分别为：",-1),m=s("ul",null,[s("li",null,[s("p",null,"192.168.163.131")]),s("li",null,[s("p",null,"192.168.163.132")]),s("li",null,[s("p",null,"192.168.163.133")])],-1),A=s("p",null,"在这三个节点上安装好 JDK1.8，并配置 JAVA_HOME 环境变量，这些操作在上一节我们已经讲过，不再赘述。",-1),F=s("p",null,"此外还需要额外部署一台 MySQL 数据库用于保存 Nacos 的配置管理、权限控制信息。这里推荐版本为 MySQL5.7 或者 MySQL 8.0。在我这部署版本为 5.7，IP 地址为：192.168.163.100。",-1),D=s("p",null,"MySQL 5.7",-1),C=s("p",null,"第二步，下载安装 Nacos。",-1),N=s("p",null,[a("访问到 "),s("a",{href:"https://github.com/alibaba/nacos/releases/",target:"_blank",rel:"noreferrer"},"https://github.com/alibaba/nacos/releases/"),a(" 网址下载 Nacos 1.4.0 版本，上传到每一台 CentOS 服务器的 /usr/local 目录下，执行解压缩命令，生成 Nacos 目录")],-1),v=s("p",null,"tar -xvf nacos-server-1.4.0.tar.gz。",-1),f=s("p",null,"第三步，配置数据库。",-1),b=s("p",null,[a("使用任意 MySQL 客户端工具连接到 192.168.163.100 MySQL 数据库服务器，创建名为"),s("strong",null,"nacos_config"),a("的数据库，之后使用 MySQL 客户端执行 /usr/local/nacos/conf/nacos-mysql.sql 文件，完成建表工作。")],-1),B=s("p",null,"nacos_config 数据库初始化脚本",-1),I=o(`<p>nacos_config 表结构</p><p>其中比较重要的表我们有必要了解一下。</p><ul><li><p>config_* ：所有 config_ 开头的表都是 Nacos 配置中心使用时保存应用配置的表。</p></li><li><p>users：系统用户表，在集群环境下用户信息保存在 users 表中，而非在配置文件中。</p></li><li><p>roles：系统角色表，Nacos 的权限基于 RBAC（基于角色的访问控制）模型设计，此表保存角色数据。</p></li><li><p>permissions: 系统权限表，说明角色与系统使用权限的对应关系。</p></li></ul><p>第四步，配置 Nacos 数据源。</p><p>依次打开 3 台 Nacos 服务器中的核心配置文件 application.properties，文件路径如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">usr</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">local</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">nacos</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">conf</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">application.properties</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">/</span><span style="color:#24292E;">usr</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">local</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">nacos</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">conf</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">application.properties</span></span></code></pre></div><p>定位到 36 行 Count of DB &quot;数据源&quot;配置附近，默认数据源配置都被#号注释，删除注释按下方示例配置数据源即可。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">### Count </span><span style="color:#F97583;">of</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">DB</span><span style="color:#E1E4E8;">: 数据库总数</span></span>
<span class="line"><span style="color:#E1E4E8;">db.num</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">### Connect </span><span style="color:#79B8FF;">URL</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">of</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">DB</span><span style="color:#E1E4E8;">: 数据库连接,根据你的实际情况调整</span></span>
<span class="line"><span style="color:#E1E4E8;">db.url.</span><span style="color:#79B8FF;">0</span><span style="color:#F97583;">=</span><span style="color:#B392F0;">jdbc</span><span style="color:#E1E4E8;">:</span><span style="color:#B392F0;">mysql</span><span style="color:#E1E4E8;">:</span><span style="color:#6A737D;">//192.168.163.100:3306/nacos_config?characterEncoding=utf8&amp;connectTimeout=1000&amp;socketTimeout=3000&amp;autoReconnect=true&amp;useUnicode=true&amp;useSSL=false&amp;serverTimezone=UTC</span></span>
<span class="line"><span style="color:#E1E4E8;">db.user</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">root</span></span>
<span class="line"><span style="color:#E1E4E8;">db.password</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">root</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">### Count </span><span style="color:#D73A49;">of</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">DB</span><span style="color:#24292E;">: 数据库总数</span></span>
<span class="line"><span style="color:#24292E;">db.num</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">### Connect </span><span style="color:#005CC5;">URL</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">of</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">DB</span><span style="color:#24292E;">: 数据库连接,根据你的实际情况调整</span></span>
<span class="line"><span style="color:#24292E;">db.url.</span><span style="color:#005CC5;">0</span><span style="color:#D73A49;">=</span><span style="color:#6F42C1;">jdbc</span><span style="color:#24292E;">:</span><span style="color:#6F42C1;">mysql</span><span style="color:#24292E;">:</span><span style="color:#6A737D;">//192.168.163.100:3306/nacos_config?characterEncoding=utf8&amp;connectTimeout=1000&amp;socketTimeout=3000&amp;autoReconnect=true&amp;useUnicode=true&amp;useSSL=false&amp;serverTimezone=UTC</span></span>
<span class="line"><span style="color:#24292E;">db.user</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">root</span></span>
<span class="line"><span style="color:#24292E;">db.password</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">root</span></span></code></pre></div><p>第五步，Nacos 集群节点配置</p><p>在 /nacos/config 目录下提供了集群示例文件cluster.conf.example</p>`,10),k=o(`<p>通过 cluster.conf.example 创建集群节点列表</p><p>首先利用复制命令创建 cluster.conf 文件。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">cp cluster.conf.example cluster.conf</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">cp cluster.conf.example cluster.conf</span></span></code></pre></div><p>之后打开 cluster.conf，添加所有 Nacos 集群节点 IP 及端口。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">192.168</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">163</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">131</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">8848</span></span>
<span class="line"><span style="color:#79B8FF;">192.168</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">163</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">132</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">8848</span></span>
<span class="line"><span style="color:#79B8FF;">192.168</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">163</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">133</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">8848</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">192.168</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">163</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">131</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">8848</span></span>
<span class="line"><span style="color:#005CC5;">192.168</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">163</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">132</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">8848</span></span>
<span class="line"><span style="color:#005CC5;">192.168</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">163</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">133</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">8848</span></span></code></pre></div><p>Nacos 通过 cluster.conf 了解集群节点的分布情况。</p><p>第六步，启动 Nacos 服务器。</p><p>在 3 台 Nacos 节点上分别执行下面的启动命令。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">sh </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">usr</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">local</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">nacos</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">bin</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">startup.sh</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">sh </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">usr</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">local</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">nacos</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">bin</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">startup.sh</span></span></code></pre></div><p>注意，集群模式下并不需要增加&quot;-m&quot;参数，默认就是以集群方式启动。</p><p>启动时可以通过 tail 命令观察启动过程。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">tail </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">f </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">usr</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">local</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">nacos</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">logs</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">start.out</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">tail </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">f </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">usr</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">local</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">nacos</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">logs</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">start.out</span></span></code></pre></div><p>启动日志关键内容如下：</p><pre><code>#-Xms2g -Xmx2g 默认运行时 JVM 要求 2G 可用内存
/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.275.b01-0.el7_9.x86_64/bin/java  -server -Xms2g -Xmx2g ...
...
#列出 Nacos 所有集群节点
INFO The server IP list of Nacos is [192.168.163.131:8848, 192.168.163.132:8848, 192.168.163.133:8848]
...
#Nacos 正在启动
INFO Nacos is starting...
...
#集群模式启动成功，采用外置存储 MySQL 数据库
INFO Nacos started successfully in cluster mode. use external storage
</code></pre><p>当确保所有节点均启动成功，打开浏览器访问下面网址：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">http</span><span style="color:#F97583;">:</span><span style="color:#6A737D;">//192.168.163.131:8848/nacos/#/clusterManagement?dataId=&amp;group=&amp;appName=&amp;namespace=</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">http</span><span style="color:#D73A49;">:</span><span style="color:#6A737D;">//192.168.163.131:8848/nacos/#/clusterManagement?dataId=&amp;group=&amp;appName=&amp;namespace=</span></span></code></pre></div><p>登录后便可看到集群列表。</p>`,17),T=o(`<p>所有节点均已上线</p><p>UP 代表节点已就绪，DOWN 代表节点已离线，目前所有节点均已就绪。</p><p>第七步，微服务接入。</p><p>在开发好的微服务程序中，在 application.properties 配置 Nacos 集群的任意节点都可以完成接入工作，Nacos 内置的数据同步机制会保证各节点数据一致性。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"># 应用名称，默认也是在微服务中注册的微服务 ID</span></span>
<span class="line"><span style="color:#E1E4E8;">spring.application.name</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">sample</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">service</span></span>
<span class="line"><span style="color:#E1E4E8;"># 配置 </span><span style="color:#79B8FF;">192.168</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">163</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">131</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">132</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">133</span><span style="color:#E1E4E8;"> 都可以接入 Nacos</span></span>
<span class="line"><span style="color:#E1E4E8;">spring.cloud.nacos.discovery.server</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">addr</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">192.168</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">163</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">131</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">8848</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">192.168</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">163</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">132</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">8848</span><span style="color:#E1E4E8;">,</span><span style="color:#79B8FF;">192.168</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">163</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">133</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">8848</span></span>
<span class="line"><span style="color:#E1E4E8;">#连接 Nacos 服务器使用的用户名、密码，默认为 nacos</span></span>
<span class="line"><span style="color:#E1E4E8;">spring.cloud.nacos.discovery.username</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">nacos</span></span>
<span class="line"><span style="color:#E1E4E8;">spring.cloud.nacos.discvery.password</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">nacos</span></span>
<span class="line"><span style="color:#E1E4E8;">#微服务提供 Web 服务的端口号</span></span>
<span class="line"><span style="color:#E1E4E8;">server.port</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">9000</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"># 应用名称，默认也是在微服务中注册的微服务 ID</span></span>
<span class="line"><span style="color:#24292E;">spring.application.name</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">sample</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">service</span></span>
<span class="line"><span style="color:#24292E;"># 配置 </span><span style="color:#005CC5;">192.168</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">163</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">131</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">132</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">133</span><span style="color:#24292E;"> 都可以接入 Nacos</span></span>
<span class="line"><span style="color:#24292E;">spring.cloud.nacos.discovery.server</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">addr</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">192.168</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">163</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">131</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">8848</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">192.168</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">163</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">132</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">8848</span><span style="color:#24292E;">,</span><span style="color:#005CC5;">192.168</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">163</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">133</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">8848</span></span>
<span class="line"><span style="color:#24292E;">#连接 Nacos 服务器使用的用户名、密码，默认为 nacos</span></span>
<span class="line"><span style="color:#24292E;">spring.cloud.nacos.discovery.username</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">nacos</span></span>
<span class="line"><span style="color:#24292E;">spring.cloud.nacos.discvery.password</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">nacos</span></span>
<span class="line"><span style="color:#24292E;">#微服务提供 Web 服务的端口号</span></span>
<span class="line"><span style="color:#24292E;">server.port</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">9000</span></span></code></pre></div><p>启动微服务后，访问下面三个 URL，会发现服务列表的结果是一致的，这也证明集群模式下 Nacos 能够保证各节点的数据同步。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">http</span><span style="color:#F97583;">:</span><span style="color:#6A737D;">//192.168.163.131:8848/nacos/#/serviceManagement?dataId=&amp;group=&amp;appName=&amp;namespace=</span></span>
<span class="line"><span style="color:#E1E4E8;">http</span><span style="color:#F97583;">:</span><span style="color:#6A737D;">//192.168.163.132:8848/nacos/#/serviceManagement?dataId=&amp;group=&amp;appName=&amp;namespace=</span></span>
<span class="line"><span style="color:#E1E4E8;">http</span><span style="color:#F97583;">:</span><span style="color:#6A737D;">//192.168.163.133:8848/nacos/#/serviceManagement?dataId=&amp;group=&amp;appName=&amp;namespace=</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">http</span><span style="color:#D73A49;">:</span><span style="color:#6A737D;">//192.168.163.131:8848/nacos/#/serviceManagement?dataId=&amp;group=&amp;appName=&amp;namespace=</span></span>
<span class="line"><span style="color:#24292E;">http</span><span style="color:#D73A49;">:</span><span style="color:#6A737D;">//192.168.163.132:8848/nacos/#/serviceManagement?dataId=&amp;group=&amp;appName=&amp;namespace=</span></span>
<span class="line"><span style="color:#24292E;">http</span><span style="color:#D73A49;">:</span><span style="color:#6A737D;">//192.168.163.133:8848/nacos/#/serviceManagement?dataId=&amp;group=&amp;appName=&amp;namespace=</span></span></code></pre></div>`,7),S=o('<p>Nacos 集群节点信息保持同步</p><p>到这里 Nacos 集群的主体配置工作已完成，但仅会部署是远不够的，我们还需了解集群的内部运行机制。</p><h3 id="nacos-集群的工作原理" tabindex="-1">Nacos 集群的工作原理 <a class="header-anchor" href="#nacos-集群的工作原理" aria-label="Permalink to &quot;Nacos 集群的工作原理&quot;">​</a></h3><h4 id="nacos-集群中-leader-节点是如何产生的" tabindex="-1">Nacos 集群中 Leader 节点是如何产生的 <a class="header-anchor" href="#nacos-集群中-leader-节点是如何产生的" aria-label="Permalink to &quot;Nacos 集群中 Leader 节点是如何产生的&quot;">​</a></h4><p>Nacos 集群采用 Raft 算法实现。它是一种比较简单的选举算法，用于选举出 Nacos 集群中最重要的 Leader（领导）节点。</p><p>在 Nacos 集群中，每个节点都拥有以下三种角色中的一种。</p><ol><li><p>Leader：领导者，集群中最重要的角色，用于向其他节点下达指令。</p></li><li><p>Candidate：参选者，参与竞选 Leader 的节点。</p></li><li><p>Follower：跟随者，用于接收来自 Leader 或者 Candidate 的请求并进行处理。</p></li></ol><p>在集群中选举出 Leader 是最重要的工作，产生选举的时机有三个：</p><ol><li><p>在 Nacos 节点启动后，还没有产生Leader时选举；</p></li><li><p>集群成员总量变更时重新选举；</p></li><li><p>当 Leader 停止服务后重新选举。</p></li></ol><p>在开始介绍选举过程前，先理解任期（Term）的含义:</p><p>Raft 算法将时间划分成为任意不同长度的任期（Term）。任期用连续的数字进行表示。每一个任期的开始都是一次选举（Election），一个或多个候选人会试图成为 Leader。</p><p>为了便于理解，我们使用文字+表格的形式说明选举过程。</p><p><strong>1</strong>. 当最开始的时候，所有 Nacos 节点都没有启动。角色默认为 Follower（跟随者），任期都是 0。</p>',13),L=s("p",null,[s("strong",null,"2"),a(". 当第一个节点（192.168.163.131）启动后，节点角色会变为 Candidate（参选者），131 节点在每一个任期开始时便会尝试向其他节点发出投票请求，征求自己能否成为 Leader（领导者）节点。只有算上自己获得超过半数的选票，这个 Candidate 才能转正为 Leader。在当前案例，因为 131 发起选举投票，但 132/133 两个节点不在线，尽管 131 会投自己一票，但在总 3 票中未过半数，因此无法成为 Leader。因为第一次选举没有产生 Leader，过段时间在下一个任期开始时，131 任期自增加 1，同时会再次向其他节点发起投票请求争取其他节点同意，直到同意票过半。")],-1),P=s("p",null,[s("strong",null,"3"),a(". 在 Raft 算法中，成为 Leader 的必要条件是某个 Candidate 获得过半选票，如果 132 节点上线，遇到 131 再次发起投票。132 投票给 131 节点，131 获得两票超过半数就会成为 Leader，132 节点自动成为 Follower（跟随者）。之后 133 节点上线，因为集群中已有 Leader，因此自动成为 Follower。")],-1),M=s("p",null,[s("strong",null,"4"),a(". 当 Leader 节点宕机或停止服务，会在剩余 2 个 Nacos 节点中产生新的 Leader。如下所示133获得两票成为 Leader，132 成为 Follower，131已经下线但角色暂时仍为 Leader。")],-1),O=s("p",null,"之后 131 恢复上线，但此时 Nacos 集群已有 Leader 存在，131 自动变为 Follower，且任期归0。",-1),j=s("p",null,'对于 Nacos 集群来说，只要 UP 状态节点不少于"1+N/2"，集群就能正常运行。但少于"1+N/2"，集群仍然可以提供基本服务，但已无法保证 Nacos 各节点数据一致性。',-1),q=s("p",null,"以上就是 Nacos 基于 Raft 算法的 Leader 选举过程，确定 Leader 是维持 Nacos 集群数据一致的最重要前提，下面咱们来讲解在微服务注册时 Nacos 集群节点信息同步的过程。",-1),V=s("h4",{id:"nacos-节点间的数据同步过程",tabindex:"-1"},[a("Nacos 节点间的数据同步过程 "),s("a",{class:"header-anchor",href:"#nacos-节点间的数据同步过程","aria-label":'Permalink to "Nacos 节点间的数据同步过程"'},"​")],-1),W=o('<p>Nacos 节点间的数据同步过程</p><p>在 Raft 算法中，只有 Leader 才拥有数据处理与信息分发的权利。因此当微服务启动时，假如注册中心指定为 Follower 节点，则步骤如下：</p><p>第一步，Follower 会自动将注册心跳包转给 Leader 节点；</p><p>第二步，Leader 节点完成实质的注册登记工作；</p><p>第三步，完成注册后向其他 Follower 节点发起&quot;同步注册日志&quot;的指令；</p><p>第四步，所有可用的 Follower 在收到指令后进行&quot;ack应答&quot;，通知 Leader 消息已收到；</p><p>第五步，当 Leader 接收过半数 Follower 节点的 &quot;ack 应答&quot;后，返回给微服务&quot;注册成功&quot;的响应信息。</p><p>此外，对于其他无效的 Follower 节点，Leader 仍会不断重新发送，直到所有 Follower 的状态与 Leader 保持同步。</p><p>以上便是 Nacos 节点间的数据同步主体流程，如果你对 Nacos 底层的细节感兴趣，不妨翻阅 Nacos 的源码了解更详细的过程。</p><h3 id="小结与预告" tabindex="-1">小结与预告 <a class="header-anchor" href="#小结与预告" aria-label="Permalink to &quot;小结与预告&quot;">​</a></h3><p>本文我们讲解了三方面内容，首先介绍了在生产环境下 Nacos 集群架构的设计要点，其次演示了 Nacos 集群的部署过程，最后介绍了 Raft 选举算法在 Nacos 中的应用与节点间数据同步过程。</p><p>这里给你留一个作业：搭建 Nacos 集群是每一名架构师都要掌握的基本技能，请按本文讲解的过程部署 Nacos 集群。</p><p>下一节，我们将开始新的篇章，研究微服务间如何稳定高效地实现服务间消息通信。</p>',13);function R(w,x,U,Q,H,K){const n=e("Image");return c(),t("div",null,[i,y,E,d,p(n,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M00/17/D5/Cgp9HWBIOSmAEY5YAAFUhNaig_g183.png"}),a(),g,p(n,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M00/17/D5/Cgp9HWBIOTaACHdNAAB65jPftjw609.png"}),a(),u,_,p(n,{alt:"图片33.png",src:"https://s0.lgstatic.com/i/image6/M00/17/D5/Cgp9HWBIOUeADoKoAACIf4r0los343.png"}),h,m,A,F,p(n,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image6/M00/17/D2/CioPOWBIOVWAGIT6AACwjSPbAOU621.png"}),a(),D,C,N,v,f,b,p(n,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image6/M00/17/D5/Cgp9HWBIOWKARz8WAAHyivVDZSc196.png"}),a(),B,p(n,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image6/M00/17/D5/Cgp9HWBIOWyAd5UDAAQe_yLhXDQ150.png"}),a(),I,p(n,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image6/M00/17/D2/CioPOWBIOXmATuVRAAI3C58AO6c101.png"}),a(),k,p(n,{alt:"图片7.png",src:"https://s0.lgstatic.com/i/image6/M00/17/D2/CioPOWBIOYeAJqqdAACwUrKESBA196.png"}),a(),T,p(n,{alt:"图片8.png",src:"https://s0.lgstatic.com/i/image6/M00/17/D2/CioPOWBIOdaALpeCAAE1rBNc27E800.png"}),a(),S,p(n,{alt:"图片9.png",src:"https://s0.lgstatic.com/i/image6/M00/17/D2/CioPOWBIOemAcpszAACWRdvNMIo546.png"}),L,p(n,{alt:"图片10.png",src:"https://s0.lgstatic.com/i/image6/M00/17/D5/Cgp9HWBIOfSAASKiAACS-9OmEeE300.png"}),P,p(n,{alt:"图片11.png",src:"https://s0.lgstatic.com/i/image6/M00/17/D2/CioPOWBIOf6AboGSAACKsdc9V-c338.png"}),M,p(n,{alt:"图片12.png",src:"https://s0.lgstatic.com/i/image6/M00/17/D5/Cgp9HWBIOgiAaSQiAAEOTYlnWd4160.png"}),O,p(n,{alt:"图片13.png",src:"https://s0.lgstatic.com/i/image6/M01/17/D5/Cgp9HWBIOhKAQkAnAAEMwMIgMgk554.png"}),j,q,V,p(n,{alt:"图片14.png",src:"https://s0.lgstatic.com/i/image6/M01/17/D5/Cgp9HWBIOi-AfhfTAAHNmiaYSdk747.png"}),a(),W])}const J=l(r,[["render",R]]);export{z as __pageData,J as default};
