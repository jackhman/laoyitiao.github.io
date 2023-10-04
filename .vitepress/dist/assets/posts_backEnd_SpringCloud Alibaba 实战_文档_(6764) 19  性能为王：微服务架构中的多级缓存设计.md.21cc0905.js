import{_ as o,j as e,o as t,g as c,k as l,h as n,Q as p,s}from"./chunks/framework.e0c66c3f.js";const K=JSON.parse('{"title":"微服务架构中的多级缓存设计 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/SpringCloud Alibaba 实战_文档/(6764) 19  性能为王：微服务架构中的多级缓存设计.md","filePath":"posts/backEnd/SpringCloud Alibaba 实战_文档/(6764) 19  性能为王：微服务架构中的多级缓存设计.md","lastUpdated":1696338709000}'),r={name:"posts/backEnd/SpringCloud Alibaba 实战_文档/(6764) 19  性能为王：微服务架构中的多级缓存设计.md"},E=p('<p>前一讲我们学习了利用 Seata 构建微服务环境的分布式事务架构，通过完整的案例也了解了 Seata 的执行过程。</p><p>本讲咱们探讨缓存这个话题，看在微服务环境下如何设计有效的多级缓存架构。本讲涉及三方面内容：</p><ul><li><p>Web 应用的客户端缓存；</p></li><li><p>应用层静态资源缓存；</p></li><li><p>服务层多级缓存。</p></li></ul><p>首先，咱们先讲解微服务架构的多级缓存设计。</p><h3 id="微服务架构中的多级缓存设计" tabindex="-1">微服务架构中的多级缓存设计 <a class="header-anchor" href="#微服务架构中的多级缓存设计" aria-label="Permalink to &quot;微服务架构中的多级缓存设计&quot;">​</a></h3><p>提到缓存，想必每一位软件工程师都不陌生，它是目前架构设计中提高性能最直接的方式。这里我们举个例子：</p>',6),y=s("p",null,"Redis 缓存",-1),i=s("p",null,'假设应用程序将原始数据存储在 MySQL 数据库中。众所周知 MySQL 数据库会将数据存储在硬盘以防止掉电丢失，但是受制于硬盘的物理设计，即便是目前性能最好的企业级 SSD 硬盘，也比内存的这种高速设备 IO 层面差一个数量级，而以淘宝、京东这种电商为代表的互联网应用，都是典型的"读多写少"的场景，因此我们需要在设计上进行数据的读写分离，在数据写入时直接落盘处理，而占比超过 90% 的数据读取操作时则从以 Redis 为代表的内存 NoSQL 数据库提取数据，利用内存的高吞吐瞬间完成数据提取，这里 Redis 的作用就是我们常说的缓存。',-1),_=s("p",null,"当然，缓存可不只有用内存替代硬盘这一种形式，在分布式架构下缓存在每一层都有自己的设计，下面咱们通过这个微服务的多级缓存架构图为主线进行讲解。",-1),h=p('<p>X 缓存多级缓存架构纵览</p><p>这张图从上到下包含四层，分别为：<strong>客户端</strong> 、<strong>应用层</strong> 、<strong>服务层</strong> 以及<strong>数据层</strong>。</p><h3 id="客户端缓存" tabindex="-1"><strong>客户端缓存</strong> <a class="header-anchor" href="#客户端缓存" aria-label="Permalink to &quot;**客户端缓存**&quot;">​</a></h3><p>X 商城客户端为浏览器，在浏览器层面我们主要是对 HTML 中的图片、CSS、JS、字体这些静态资源进行缓存。</p>',4),d=s("p",null,"浏览器缓存",-1),g=s("p",null,'我们以百度 Logo 图片为例，百度在 HTTP 通过 Expires 响应头控制静态图片的有效期。Expires 代表过期时间。当前百度 Logo 的过期时间为 2031 年 2 月 8 日 9 时 26 分 31 秒。在这个时间段内，浏览器会将图片以文件形式缓存在本地，再次访问时会看到"from disk cache"的提示，此时浏览器不再产生与服务器的实际请求，会从本地直接读取缓存图片。通过在浏览器端设置 Expires 可以在很大程度减少重复请求静态资源带来的带宽损耗，这在高并发 Web 应用中是基础而重要的设置。',-1),C=s("h3",{id:"应用层缓存",tabindex:"-1"},[n("应用层缓存 "),s("a",{class:"header-anchor",href:"#应用层缓存","aria-label":'Permalink to "应用层缓存"'},"​")],-1),A=s("p",null,"那 Expires 到底在哪里进行设置呢？对于浏览器来说它只是客户端，只负责读取Expires响应头，对于 Expires 要在应用层，也就是 CDN 与 Nginx 中进行设置。",-1),x=s("h4",{id:"cdn-内容分发网络",tabindex:"-1"},[n("CDN 内容分发网络 "),s("a",{class:"header-anchor",href:"#cdn-内容分发网络","aria-label":'Permalink to "CDN 内容分发网络"'},"​")],-1),D=s("p",null,"CDN 全称是 Content Delivery Network，即内容分发网络，是互联网静态资源分发的主要技术手段。",-1),F=s("p",null,"CDN 内容分发网络",-1),m=s("p",null,"中国幅员辽阔，从北京到上海就有上千公里，如果大量的上海用户同时要访问千里之外的北京服务器的资源，这么长的通信必然带来高延迟与更多不可控因素影响数据传输，如果有某种机制允许将北京的静态文件缓存到上海的服务器，上海用户自动就近访问服务器获取资源，这样便可很大程度降低网络延迟，进而提高系统的可用性。而刚才提到的分布式缓存技术就是我们常提到的CDN（内容分发网络）。",-1),u=s("p",null,"对于广域的互联网应用，CDN 几乎是必需的基础设施，它有效解决了带宽集中占用以及数据分发的问题。像 Web 页面中的图片、音视频、CSS、JS 这些静态资源，都可以通过 CDN 服务器就近获取。",-1),N=s("p",null,'CDN 技术的核心是"智能 DNS"，智能 DNS 会根据用户的 IP 地址自动确定就近访问 CDN 节点，咱们以下图为例：',-1),b=s("p",null,"CDN 执行流程",-1),f=s("p",null,"以某上海用户的浏览器要访问商城首页广告位的 banner.jpg 文件，浏览器通过服务商提供的智能 DNS 服务，将请求自动转发到商城在上海地区准备的 CDN 服务器，上海 CDN 收到请求后首先检查本机是否已缓存过 banner.jpg，如果文件已存在便直接将图片数据返回给客户端；如果没有缓存过，则回源到北京的源数据节点，将 banner.jpg 文件抽取并缓存到上海服务器，最后上海 CDN 节点再将本机的 banner.jpg 返回给客户端。对于 banner.jpg 来说，第一次访问后上海 CDN 节点已缓存该文件，则之后的缓存有效期内所有后续访问由上海 CDN 直接提供。与之类似的，商城应用可以在重要城市搭建 CDN 节点，这样原本集中被发往北京服务器的请求就被分摊到 CDN 节点，这也直接降低了北京机房的带宽压力。",-1),B=s("p",null,"在互联网应用中，因为 CDN 涉及多地域多节点组网，前期投入成本较高，更多的中小型软件公司通常会选择阿里云、腾讯云等大厂提供的 CDN 服务，通过按需付费的方式降低硬件成本。而这些服务商又会为 CDN 赋予额外的能力，比如阿里云、腾讯云 CDN 除了缓存文件之外，还提供了管理后台能为响应赋予额外的响应头。如下所示在阿里云 CDN 后台，就额外设置了 Cache-Control 响应头代表缓存有效期为 1 小时。这里我们额外提一下 Expires 与的 Cache-Control 的区别，Expires 是指定具体某个时间点缓存到期，而 Cache-Control 则代表缓存的有效期是多长时间。Expires 设置时间，Cache-Control 设置时长，根据业务场景不同可以使用不同的响应头。",-1),v=s("p",null,"阿里云自定义响应头",-1),S=s("h4",{id:"nginx-缓存管理",tabindex:"-1"},[n("Nginx 缓存管理 "),s("a",{class:"header-anchor",href:"#nginx-缓存管理","aria-label":'Permalink to "Nginx 缓存管理"'},"​")],-1),T=s("p",null,"说完 CDN，下面再来聊一下 Nginx。Nginx 是一款开源的、跨平台的高性能 Web 服务器，它有着高性能，稳定性好，配置简单，模块结构化，资源消耗低的优点。同时支持反向代理、负载均衡、缓存的功能。Nginx 是 Web 应用架构中的常客，例如后端 Tomcat 集群便可通过增加 Nginx 前置做软负载均衡，为应用提供高可用特性。",-1),k=p(`<p>Nginx 代理服务器</p><p>在互联网应用中，用户分布在全国各地，对资源的响应速度与带宽要求较高，因此部署 CDN 是十分有必要的。但在更多的企业应用中，其实大部分的企业用户都分布在指定的办公区域或者相对固定的场所，再加上并发用户相对较少，其实并不需要额外部署 CDN 这种重量级解决方案。在架构中只需要部署 Nginx 服务器，利用 Nginx 自带的静态资源缓存与压缩功能便可胜任大多数企业应用场景。</p><p>在 Nginx 中自带将后端应用中图片、CSS、JS 等静态资源缓存功能，我们只需在 Nginx 的核心配置 nginx.conf 中增加下面的片段，便可对后端的静态资源进行缓存，关键配置我已做好注释，同学们可以直接使用。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"># 设置缓存目录</span></span>
<span class="line"><span style="color:#E1E4E8;"># levels代表采用1</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">2也就是两级目录的形式保存缓存文件（静态资源css、js）</span></span>
<span class="line"><span style="color:#E1E4E8;"># keys_zone定义缓存的名称及内存的使用，名称为babytun</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">cache ,在内存中开始100m交换空间</span></span>
<span class="line"><span style="color:#E1E4E8;"># inactive</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">7d</span><span style="color:#E1E4E8;"> 如果某个缓存文件超过7天没有被访问，则删除</span></span>
<span class="line"><span style="color:#E1E4E8;"># max_size</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">20g;代表设置文件夹最大不能超过20g，超过后会自动将访问频度（命中率）最低的缓存文件删除</span></span>
<span class="line"><span style="color:#E1E4E8;">proxy_cache_path d</span><span style="color:#F97583;">:/</span><span style="color:#E1E4E8;">nginx</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">cache levels</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">1</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> keys_zone</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">babytun</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">cache</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">100m inactive</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">7d</span><span style="color:#E1E4E8;"> max_size</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">20g;</span></span>
<span class="line"><span style="color:#E1E4E8;">#配置xmall后端服务器的权重负载均衡策略</span></span>
<span class="line"><span style="color:#E1E4E8;">upstream xmall {</span></span>
<span class="line"><span style="color:#E1E4E8;">    server </span><span style="color:#79B8FF;">192.168</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">31</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">181</span><span style="color:#E1E4E8;"> weight</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;"> max_fails</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> fail_timeout</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">3s;</span></span>
<span class="line"><span style="color:#E1E4E8;">    server </span><span style="color:#79B8FF;">192.168</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">31</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">182</span><span style="color:#E1E4E8;"> weight</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    server </span><span style="color:#79B8FF;">192.168</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">31</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">183</span><span style="color:#E1E4E8;"> weight</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    server </span><span style="color:#79B8FF;">192.168</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">31</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">184</span><span style="color:#E1E4E8;"> weight</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">server {</span></span>
<span class="line"><span style="color:#E1E4E8;">	#nginx通过80端口提供Web服务</span></span>
<span class="line"><span style="color:#E1E4E8;">	listen </span><span style="color:#79B8FF;">80</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">	# 开启静态资源缓存</span></span>
<span class="line"><span style="color:#E1E4E8;">	# 利用正则表达式匹配URL，匹配成功的则执行内部逻辑</span></span>
<span class="line"><span style="color:#E1E4E8;">	# </span><span style="color:#F97583;">~*</span><span style="color:#E1E4E8;"> 代表URL匹配不区分大小写</span></span>
<span class="line"><span style="color:#E1E4E8;">	location </span><span style="color:#F97583;">~*</span><span style="color:#E1E4E8;"> \\.(gif</span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">jpg</span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">css</span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">png</span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">js</span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">woff</span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;">html)(.</span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">           # 配置代理转发规则</span></span>
<span class="line"><span style="color:#E1E4E8;">		proxy_pass http</span><span style="color:#F97583;">:</span><span style="color:#6A737D;">//xmall;</span></span>
<span class="line"><span style="color:#E1E4E8;">		proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#E1E4E8;">		proxy_set_header X</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">Forwarded</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#E1E4E8;">		proxy_cache xmall</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">cache;</span></span>
<span class="line"><span style="color:#E1E4E8;">		#如果静态资源响应状态码为200（成功）  </span><span style="color:#79B8FF;">302</span><span style="color:#E1E4E8;">（暂时性重定向）时 缓存文件有效期1天</span></span>
<span class="line"><span style="color:#E1E4E8;">		proxy_cache_valid </span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">302</span><span style="color:#E1E4E8;"> 24h;</span></span>
<span class="line"><span style="color:#E1E4E8;">		#</span><span style="color:#79B8FF;">301</span><span style="color:#E1E4E8;">（永久性重定向）缓存保存5天</span></span>
<span class="line"><span style="color:#E1E4E8;">		proxy_cache_valid </span><span style="color:#79B8FF;">301</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">5d</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">		#其他情况</span></span>
<span class="line"><span style="color:#E1E4E8;">		proxy_cache_valid any 5m;</span></span>
<span class="line"><span style="color:#E1E4E8;">		#设置浏览器端缓存过期时间90天</span></span>
<span class="line"><span style="color:#E1E4E8;">		expires </span><span style="color:#79B8FF;">90d</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span></span>
<span class="line"><span style="color:#E1E4E8;">	#使用xmall服务器池进行后端处理</span></span>
<span class="line"><span style="color:#E1E4E8;">	location </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">		proxy_pass http</span><span style="color:#F97583;">:</span><span style="color:#6A737D;">//xmall; </span></span>
<span class="line"><span style="color:#E1E4E8;">		proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#E1E4E8;">		proxy_set_header X</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">Forwarded</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"># 设置缓存目录</span></span>
<span class="line"><span style="color:#24292E;"># levels代表采用1</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">2也就是两级目录的形式保存缓存文件（静态资源css、js）</span></span>
<span class="line"><span style="color:#24292E;"># keys_zone定义缓存的名称及内存的使用，名称为babytun</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">cache ,在内存中开始100m交换空间</span></span>
<span class="line"><span style="color:#24292E;"># inactive</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">7d</span><span style="color:#24292E;"> 如果某个缓存文件超过7天没有被访问，则删除</span></span>
<span class="line"><span style="color:#24292E;"># max_size</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">20g;代表设置文件夹最大不能超过20g，超过后会自动将访问频度（命中率）最低的缓存文件删除</span></span>
<span class="line"><span style="color:#24292E;">proxy_cache_path d</span><span style="color:#D73A49;">:/</span><span style="color:#24292E;">nginx</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">cache levels</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">1</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> keys_zone</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">babytun</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">cache</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">100m inactive</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">7d</span><span style="color:#24292E;"> max_size</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">20g;</span></span>
<span class="line"><span style="color:#24292E;">#配置xmall后端服务器的权重负载均衡策略</span></span>
<span class="line"><span style="color:#24292E;">upstream xmall {</span></span>
<span class="line"><span style="color:#24292E;">    server </span><span style="color:#005CC5;">192.168</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">31</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">181</span><span style="color:#24292E;"> weight</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">5</span><span style="color:#24292E;"> max_fails</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> fail_timeout</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">3s;</span></span>
<span class="line"><span style="color:#24292E;">    server </span><span style="color:#005CC5;">192.168</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">31</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">182</span><span style="color:#24292E;"> weight</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    server </span><span style="color:#005CC5;">192.168</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">31</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">183</span><span style="color:#24292E;"> weight</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    server </span><span style="color:#005CC5;">192.168</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">31</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">184</span><span style="color:#24292E;"> weight</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">server {</span></span>
<span class="line"><span style="color:#24292E;">	#nginx通过80端口提供Web服务</span></span>
<span class="line"><span style="color:#24292E;">	listen </span><span style="color:#005CC5;">80</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">	# 开启静态资源缓存</span></span>
<span class="line"><span style="color:#24292E;">	# 利用正则表达式匹配URL，匹配成功的则执行内部逻辑</span></span>
<span class="line"><span style="color:#24292E;">	# </span><span style="color:#D73A49;">~*</span><span style="color:#24292E;"> 代表URL匹配不区分大小写</span></span>
<span class="line"><span style="color:#24292E;">	location </span><span style="color:#D73A49;">~*</span><span style="color:#24292E;"> \\.(gif</span><span style="color:#D73A49;">|</span><span style="color:#24292E;">jpg</span><span style="color:#D73A49;">|</span><span style="color:#24292E;">css</span><span style="color:#D73A49;">|</span><span style="color:#24292E;">png</span><span style="color:#D73A49;">|</span><span style="color:#24292E;">js</span><span style="color:#D73A49;">|</span><span style="color:#24292E;">woff</span><span style="color:#D73A49;">|</span><span style="color:#24292E;">html)(.</span><span style="color:#D73A49;">*</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">           # 配置代理转发规则</span></span>
<span class="line"><span style="color:#24292E;">		proxy_pass http</span><span style="color:#D73A49;">:</span><span style="color:#6A737D;">//xmall;</span></span>
<span class="line"><span style="color:#24292E;">		proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#24292E;">		proxy_set_header X</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">Forwarded</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292E;">		proxy_cache xmall</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">cache;</span></span>
<span class="line"><span style="color:#24292E;">		#如果静态资源响应状态码为200（成功）  </span><span style="color:#005CC5;">302</span><span style="color:#24292E;">（暂时性重定向）时 缓存文件有效期1天</span></span>
<span class="line"><span style="color:#24292E;">		proxy_cache_valid </span><span style="color:#005CC5;">200</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">302</span><span style="color:#24292E;"> 24h;</span></span>
<span class="line"><span style="color:#24292E;">		#</span><span style="color:#005CC5;">301</span><span style="color:#24292E;">（永久性重定向）缓存保存5天</span></span>
<span class="line"><span style="color:#24292E;">		proxy_cache_valid </span><span style="color:#005CC5;">301</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">5d</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">		#其他情况</span></span>
<span class="line"><span style="color:#24292E;">		proxy_cache_valid any 5m;</span></span>
<span class="line"><span style="color:#24292E;">		#设置浏览器端缓存过期时间90天</span></span>
<span class="line"><span style="color:#24292E;">		expires </span><span style="color:#005CC5;">90d</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">	</span></span>
<span class="line"><span style="color:#24292E;">	#使用xmall服务器池进行后端处理</span></span>
<span class="line"><span style="color:#24292E;">	location </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">		proxy_pass http</span><span style="color:#D73A49;">:</span><span style="color:#6A737D;">//xmall; </span></span>
<span class="line"><span style="color:#24292E;">		proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#24292E;">		proxy_set_header X</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">Forwarded</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>增加上面配置后，每一次通过 Nginx 访问应用中新的静态文件时，在 Nginx 服务的缓存目录便会生成缓存文件，在缓存有效期内该静态资源的请求便不再送到后端服务器，而直接由 Nginx 读取本地缓存并返回。</p>`,5),P=p('<p>Nginx 本地缓存</p><h3 id="服务层缓存" tabindex="-1">服务层缓存 <a class="header-anchor" href="#服务层缓存" aria-label="Permalink to &quot;服务层缓存&quot;">​</a></h3><p>在前面无论是 CDN 还是 Nginx，都是对 Web 应用中的静态资源文件进行缓存。但后端应用与服务更多的是访问接口与数据，对于这些对象我们如何利用缓存技术进行性能优化呢？对于后端应用与服务的缓存可以按部署方式分为<strong>进程内缓存</strong> 与<strong>分布式缓存</strong>服务。</p><h4 id="进程内缓存" tabindex="-1">进程内缓存 <a class="header-anchor" href="#进程内缓存" aria-label="Permalink to &quot;进程内缓存&quot;">​</a></h4><p>所谓进程内缓存，就是在应用中开辟的一块内存空间，数据在运行时被载入这块内存，通过本地内存的低延迟、高吞吐的特性提高程序的访问速度。进程内缓存在众多 Java 框架内都有广泛应用，例如 Hibernate、Mybatis 框架的一二级缓存、Spring MVC 的页面缓存都是进程内缓存的经典应用场景，这些进程内缓存在 Java 中也有着非常多优秀的开源实现，如 EhCache、Caffeine 都是代表性产品。</p><h4 id="分布式缓存服务" tabindex="-1">分布式缓存服务 <a class="header-anchor" href="#分布式缓存服务" aria-label="Permalink to &quot;分布式缓存服务&quot;">​</a></h4><p>与进程内相对的，就是需要独立部署的分布式缓存服务。最常用的是基于 Redis 这种内存型 NoSQL 数据库，对整体架构中的应用数据进行集中缓存。</p>',7),R=s("p",null,"在架构设计时，很多新架构师一听到缓存，下意识认为增加 Redis 分布式缓存服务器就够了，其实这是片面的做法。在缓存架构设计时，一定要按照由近到远、由快到慢的顺序进行逐级访问。假设在电商进行商品秒杀活动时，如果没有本地缓存，所有商品、订单、物流的热点数据都保存在 Redis 服务器中，每完成一笔订单，都要额外增加若干次网络通信，网络通信本身就可能由于各种原因存在通信失败的问题。即便是你能保证网络 100% 可用，但 Redis 集群承担了来自所有外部应用的访问压力，一旦突发流量超过 Redis 的负载上限，整体架构便面临崩溃的风险。",-1),W=s("p",null,"Redis 缓存服务集群",-1),w=s("p",null,"因此在 Java 的应用端也要设计多级缓存，我们将进程内缓存与分布式缓存服务结合，有效分摊应用压力。在 Java 应用层面，只有 EhCache 的缓存不存在时，再去 Redis 分布式缓存获取，如果 Redis 也没有此数据再去数据库查询，数据查询成功后对 Redis 与 EhCahce 同时进行双写更新。这样 Java 应用下一次再查询相同数据时便直接从本地 EhCache 缓存提取，不再产生新的网络通信，应用查询性能得到显著提高。",-1),M=s("p",null,"多级缓存设计",-1),I=s("h4",{id:"保障缓存一致性",tabindex:"-1"},[n("保障缓存一致性 "),s("a",{class:"header-anchor",href:"#保障缓存一致性","aria-label":'Permalink to "保障缓存一致性"'},"​")],-1),j=s("p",null,"但事无完美，当引入多级缓存后，我们又会遇到缓存数据一致性的挑战，以下图为例：",-1),H=s("p",null,"缓存一致性问题",-1),q=s("p",null,"我们都知道作为数据库写操作，是不通过缓存的。假设商品服务实例 1 将 1 号商品价格调整为 80 元，这会衍生一个新问题：如何主动向应用程序推送数据变更的消息来保证它们也能同步更新缓存呢？",-1),V=s("p",null,"相信此时你已经有了答案。没错，我们需要在当前架构中引入 MQ 消息队列，利用 RocketMQ 的主动推送功能来向其他服务实例以及 Redis 缓存服务发起变更通知。",-1),J=p('<p>通过 RocketMQ 解决保证消息一致性</p><p>如上图所示，在商品服务实例 1 对商品调价后，主动向 RocketMQ Broker 发送变更消息，Broker 将变更信息推送至其他实例与 Redis 集群，这些服务实例在收到变更消息后，在缓存中先删除过期缓存，再创建新的数据，以此保证各实例数据一致。</p><p>看到这里你会发现，对于缓存来说，并没有终极的解决方案。虽然多级缓存设计带来了更好的应用性能，但也为了缓存一致性必须引入 MQ 增加了架构的复杂度。那到底多级缓存设计该如何取舍呢？在我看来，有三种情况特别适合引入多级缓存。</p><p>第一种情况，缓存的数据是稳定的。例如邮政编码、地域区块、归档的历史数据这些信息适合通过多级缓存减小 Redis 与数据库的压力。</p><p>第二种情况，瞬时可能会产生极高并发的场景。例如春运购票、双 11 零点秒杀、股市开盘交易等，瞬间的流量洪峰可能击穿 Redis 缓存，产生流量雪崩。这时利用预热的进程内缓存分摊流量，减少后端压力是非常有必要的。</p><p>第三种情况，一定程度上允许数据不一致。例如某博客平台中你修改了自我介绍这样的非关键信息，此时在应用集群中其他节点缓存不一致也并不会带来严重影响，对于这种情况我们采用T+1的方式在日终处理时保证缓存最终一致就可以了。</p><p>以上是我总结的三种适合服务层做多级缓存的场景。当然如果你们的应用并发量不大，在未来的1~2 年内利用 Redis 分布式缓存集群完全可以胜任应用性能要求，那自然就没有必要设计多级缓存，我们要根据业务特点灵活调整架构。</p><h3 id="小结与预告" tabindex="-1">小结与预告 <a class="header-anchor" href="#小结与预告" aria-label="Permalink to &quot;小结与预告&quot;">​</a></h3><p>本讲咱们介绍了在应用微服务架构下从客户端到服务层，各层的缓存设计以及解决方案，讲解了从浏览器的 Expires 响应头到 CDN、Nginx 的静态资源缓存，再到服务层针对数据的多级缓存，使你对微服务架构的缓存有了总体的了解。</p><p>下一讲，咱们聊一聊在传统架构下如何一步步向微服务进行转型，中间会遇到哪些新问题。</p>',10);function L(O,$,z,Q,X,G){const a=e("Image");return t(),c("div",null,[E,l(a,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M01/37/20/CioPOWB1uh2APCKlAAICTDYjG2s412.png"}),n(),y,i,_,l(a,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M01/37/18/Cgp9HWB1uiiASVItAAHeGbiJ6x8340.png"}),n(),h,l(a,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image6/M01/37/20/CioPOWB1ujCAA7opAAIOvqg2h_I560.png"}),n(),d,g,C,A,x,D,l(a,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image6/M01/37/18/Cgp9HWB1uj6AJlmdAAbIc0lIcAc016.png"}),n(),F,m,u,N,l(a,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image6/M01/37/20/CioPOWB1ukeAFt5mAADBdyaj6Hs257.png"}),n(),b,f,B,l(a,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image6/M01/37/18/Cgp9HWB1ulWASjuFAADLl_3qwck166.png"}),n(),v,S,T,l(a,{alt:"图片7.png",src:"https://s0.lgstatic.com/i/image6/M01/37/20/CioPOWB1umWAcVyOAACvk6oAizQ807.png"}),n(),k,l(a,{alt:"图片8.png",src:"https://s0.lgstatic.com/i/image6/M01/37/18/Cgp9HWB1un-AW2XjAADn7gSoGbA241.png"}),n(),P,l(a,{alt:"图片9.png",src:"https://s0.lgstatic.com/i/image6/M01/37/18/Cgp9HWB1uouAGwKHAAEZz5CzNlk383.png"}),R,l(a,{alt:"图片10.png",src:"https://s0.lgstatic.com/i/image6/M01/37/18/Cgp9HWB1upKAf9fNAABaHZB9o40573.png"}),n(),W,w,l(a,{alt:"图片11.png",src:"https://s0.lgstatic.com/i/image6/M01/37/20/CioPOWB1upqAFwvpAACORNLgcpo164.png"}),n(),M,I,j,l(a,{alt:"图片12.png",src:"https://s0.lgstatic.com/i/image6/M01/37/18/Cgp9HWB1uqGANm21AACYJ7OwlSA834.png"}),n(),H,q,V,l(a,{alt:"图片13.png",src:"https://s0.lgstatic.com/i/image6/M01/37/20/CioPOWB1uqiAZTFFAADvyhhJIy8978.png"}),n(),J])}const Z=o(r,[["render",L]]);export{K as __pageData,Z as default};
