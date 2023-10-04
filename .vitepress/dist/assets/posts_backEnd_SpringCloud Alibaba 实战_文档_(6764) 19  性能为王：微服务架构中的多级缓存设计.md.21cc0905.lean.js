import{_ as o,j as e,o as t,g as c,k as l,h as n,Q as p,s}from"./chunks/framework.e0c66c3f.js";const K=JSON.parse('{"title":"微服务架构中的多级缓存设计 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/SpringCloud Alibaba 实战_文档/(6764) 19  性能为王：微服务架构中的多级缓存设计.md","filePath":"posts/backEnd/SpringCloud Alibaba 实战_文档/(6764) 19  性能为王：微服务架构中的多级缓存设计.md","lastUpdated":1696338709000}'),r={name:"posts/backEnd/SpringCloud Alibaba 实战_文档/(6764) 19  性能为王：微服务架构中的多级缓存设计.md"},E=p("",6),y=s("p",null,"Redis 缓存",-1),i=s("p",null,'假设应用程序将原始数据存储在 MySQL 数据库中。众所周知 MySQL 数据库会将数据存储在硬盘以防止掉电丢失，但是受制于硬盘的物理设计，即便是目前性能最好的企业级 SSD 硬盘，也比内存的这种高速设备 IO 层面差一个数量级，而以淘宝、京东这种电商为代表的互联网应用，都是典型的"读多写少"的场景，因此我们需要在设计上进行数据的读写分离，在数据写入时直接落盘处理，而占比超过 90% 的数据读取操作时则从以 Redis 为代表的内存 NoSQL 数据库提取数据，利用内存的高吞吐瞬间完成数据提取，这里 Redis 的作用就是我们常说的缓存。',-1),_=s("p",null,"当然，缓存可不只有用内存替代硬盘这一种形式，在分布式架构下缓存在每一层都有自己的设计，下面咱们通过这个微服务的多级缓存架构图为主线进行讲解。",-1),h=p("",4),d=s("p",null,"浏览器缓存",-1),g=s("p",null,'我们以百度 Logo 图片为例，百度在 HTTP 通过 Expires 响应头控制静态图片的有效期。Expires 代表过期时间。当前百度 Logo 的过期时间为 2031 年 2 月 8 日 9 时 26 分 31 秒。在这个时间段内，浏览器会将图片以文件形式缓存在本地，再次访问时会看到"from disk cache"的提示，此时浏览器不再产生与服务器的实际请求，会从本地直接读取缓存图片。通过在浏览器端设置 Expires 可以在很大程度减少重复请求静态资源带来的带宽损耗，这在高并发 Web 应用中是基础而重要的设置。',-1),C=s("h3",{id:"应用层缓存",tabindex:"-1"},[n("应用层缓存 "),s("a",{class:"header-anchor",href:"#应用层缓存","aria-label":'Permalink to "应用层缓存"'},"​")],-1),A=s("p",null,"那 Expires 到底在哪里进行设置呢？对于浏览器来说它只是客户端，只负责读取Expires响应头，对于 Expires 要在应用层，也就是 CDN 与 Nginx 中进行设置。",-1),x=s("h4",{id:"cdn-内容分发网络",tabindex:"-1"},[n("CDN 内容分发网络 "),s("a",{class:"header-anchor",href:"#cdn-内容分发网络","aria-label":'Permalink to "CDN 内容分发网络"'},"​")],-1),D=s("p",null,"CDN 全称是 Content Delivery Network，即内容分发网络，是互联网静态资源分发的主要技术手段。",-1),F=s("p",null,"CDN 内容分发网络",-1),m=s("p",null,"中国幅员辽阔，从北京到上海就有上千公里，如果大量的上海用户同时要访问千里之外的北京服务器的资源，这么长的通信必然带来高延迟与更多不可控因素影响数据传输，如果有某种机制允许将北京的静态文件缓存到上海的服务器，上海用户自动就近访问服务器获取资源，这样便可很大程度降低网络延迟，进而提高系统的可用性。而刚才提到的分布式缓存技术就是我们常提到的CDN（内容分发网络）。",-1),u=s("p",null,"对于广域的互联网应用，CDN 几乎是必需的基础设施，它有效解决了带宽集中占用以及数据分发的问题。像 Web 页面中的图片、音视频、CSS、JS 这些静态资源，都可以通过 CDN 服务器就近获取。",-1),N=s("p",null,'CDN 技术的核心是"智能 DNS"，智能 DNS 会根据用户的 IP 地址自动确定就近访问 CDN 节点，咱们以下图为例：',-1),b=s("p",null,"CDN 执行流程",-1),f=s("p",null,"以某上海用户的浏览器要访问商城首页广告位的 banner.jpg 文件，浏览器通过服务商提供的智能 DNS 服务，将请求自动转发到商城在上海地区准备的 CDN 服务器，上海 CDN 收到请求后首先检查本机是否已缓存过 banner.jpg，如果文件已存在便直接将图片数据返回给客户端；如果没有缓存过，则回源到北京的源数据节点，将 banner.jpg 文件抽取并缓存到上海服务器，最后上海 CDN 节点再将本机的 banner.jpg 返回给客户端。对于 banner.jpg 来说，第一次访问后上海 CDN 节点已缓存该文件，则之后的缓存有效期内所有后续访问由上海 CDN 直接提供。与之类似的，商城应用可以在重要城市搭建 CDN 节点，这样原本集中被发往北京服务器的请求就被分摊到 CDN 节点，这也直接降低了北京机房的带宽压力。",-1),B=s("p",null,"在互联网应用中，因为 CDN 涉及多地域多节点组网，前期投入成本较高，更多的中小型软件公司通常会选择阿里云、腾讯云等大厂提供的 CDN 服务，通过按需付费的方式降低硬件成本。而这些服务商又会为 CDN 赋予额外的能力，比如阿里云、腾讯云 CDN 除了缓存文件之外，还提供了管理后台能为响应赋予额外的响应头。如下所示在阿里云 CDN 后台，就额外设置了 Cache-Control 响应头代表缓存有效期为 1 小时。这里我们额外提一下 Expires 与的 Cache-Control 的区别，Expires 是指定具体某个时间点缓存到期，而 Cache-Control 则代表缓存的有效期是多长时间。Expires 设置时间，Cache-Control 设置时长，根据业务场景不同可以使用不同的响应头。",-1),v=s("p",null,"阿里云自定义响应头",-1),S=s("h4",{id:"nginx-缓存管理",tabindex:"-1"},[n("Nginx 缓存管理 "),s("a",{class:"header-anchor",href:"#nginx-缓存管理","aria-label":'Permalink to "Nginx 缓存管理"'},"​")],-1),T=s("p",null,"说完 CDN，下面再来聊一下 Nginx。Nginx 是一款开源的、跨平台的高性能 Web 服务器，它有着高性能，稳定性好，配置简单，模块结构化，资源消耗低的优点。同时支持反向代理、负载均衡、缓存的功能。Nginx 是 Web 应用架构中的常客，例如后端 Tomcat 集群便可通过增加 Nginx 前置做软负载均衡，为应用提供高可用特性。",-1),k=p("",5),P=p("",7),R=s("p",null,"在架构设计时，很多新架构师一听到缓存，下意识认为增加 Redis 分布式缓存服务器就够了，其实这是片面的做法。在缓存架构设计时，一定要按照由近到远、由快到慢的顺序进行逐级访问。假设在电商进行商品秒杀活动时，如果没有本地缓存，所有商品、订单、物流的热点数据都保存在 Redis 服务器中，每完成一笔订单，都要额外增加若干次网络通信，网络通信本身就可能由于各种原因存在通信失败的问题。即便是你能保证网络 100% 可用，但 Redis 集群承担了来自所有外部应用的访问压力，一旦突发流量超过 Redis 的负载上限，整体架构便面临崩溃的风险。",-1),W=s("p",null,"Redis 缓存服务集群",-1),w=s("p",null,"因此在 Java 的应用端也要设计多级缓存，我们将进程内缓存与分布式缓存服务结合，有效分摊应用压力。在 Java 应用层面，只有 EhCache 的缓存不存在时，再去 Redis 分布式缓存获取，如果 Redis 也没有此数据再去数据库查询，数据查询成功后对 Redis 与 EhCahce 同时进行双写更新。这样 Java 应用下一次再查询相同数据时便直接从本地 EhCache 缓存提取，不再产生新的网络通信，应用查询性能得到显著提高。",-1),M=s("p",null,"多级缓存设计",-1),I=s("h4",{id:"保障缓存一致性",tabindex:"-1"},[n("保障缓存一致性 "),s("a",{class:"header-anchor",href:"#保障缓存一致性","aria-label":'Permalink to "保障缓存一致性"'},"​")],-1),j=s("p",null,"但事无完美，当引入多级缓存后，我们又会遇到缓存数据一致性的挑战，以下图为例：",-1),H=s("p",null,"缓存一致性问题",-1),q=s("p",null,"我们都知道作为数据库写操作，是不通过缓存的。假设商品服务实例 1 将 1 号商品价格调整为 80 元，这会衍生一个新问题：如何主动向应用程序推送数据变更的消息来保证它们也能同步更新缓存呢？",-1),V=s("p",null,"相信此时你已经有了答案。没错，我们需要在当前架构中引入 MQ 消息队列，利用 RocketMQ 的主动推送功能来向其他服务实例以及 Redis 缓存服务发起变更通知。",-1),J=p("",10);function L(O,$,z,Q,X,G){const a=e("Image");return t(),c("div",null,[E,l(a,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M01/37/20/CioPOWB1uh2APCKlAAICTDYjG2s412.png"}),n(),y,i,_,l(a,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M01/37/18/Cgp9HWB1uiiASVItAAHeGbiJ6x8340.png"}),n(),h,l(a,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image6/M01/37/20/CioPOWB1ujCAA7opAAIOvqg2h_I560.png"}),n(),d,g,C,A,x,D,l(a,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image6/M01/37/18/Cgp9HWB1uj6AJlmdAAbIc0lIcAc016.png"}),n(),F,m,u,N,l(a,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image6/M01/37/20/CioPOWB1ukeAFt5mAADBdyaj6Hs257.png"}),n(),b,f,B,l(a,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image6/M01/37/18/Cgp9HWB1ulWASjuFAADLl_3qwck166.png"}),n(),v,S,T,l(a,{alt:"图片7.png",src:"https://s0.lgstatic.com/i/image6/M01/37/20/CioPOWB1umWAcVyOAACvk6oAizQ807.png"}),n(),k,l(a,{alt:"图片8.png",src:"https://s0.lgstatic.com/i/image6/M01/37/18/Cgp9HWB1un-AW2XjAADn7gSoGbA241.png"}),n(),P,l(a,{alt:"图片9.png",src:"https://s0.lgstatic.com/i/image6/M01/37/18/Cgp9HWB1uouAGwKHAAEZz5CzNlk383.png"}),R,l(a,{alt:"图片10.png",src:"https://s0.lgstatic.com/i/image6/M01/37/18/Cgp9HWB1upKAf9fNAABaHZB9o40573.png"}),n(),W,w,l(a,{alt:"图片11.png",src:"https://s0.lgstatic.com/i/image6/M01/37/20/CioPOWB1upqAFwvpAACORNLgcpo164.png"}),n(),M,I,j,l(a,{alt:"图片12.png",src:"https://s0.lgstatic.com/i/image6/M01/37/18/Cgp9HWB1uqGANm21AACYJ7OwlSA834.png"}),n(),H,q,V,l(a,{alt:"图片13.png",src:"https://s0.lgstatic.com/i/image6/M01/37/20/CioPOWB1uqiAZTFFAADvyhhJIy8978.png"}),n(),J])}const Z=o(r,[["render",L]]);export{K as __pageData,Z as default};
