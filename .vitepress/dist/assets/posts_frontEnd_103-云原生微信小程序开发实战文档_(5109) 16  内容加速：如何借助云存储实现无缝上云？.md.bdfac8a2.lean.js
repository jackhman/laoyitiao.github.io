import{_ as l,j as o,o as e,g as t,k as n,s,h as c,Q as p}from"./chunks/framework.4e7d56ce.js";const T=JSON.parse('{"title":"用好加速 Buffer ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5109) 16  内容加速：如何借助云存储实现无缝上云？.md","filePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5109) 16  内容加速：如何借助云存储实现无缝上云？.md","lastUpdated":1696417798000}'),r={name:"posts/frontEnd/103-云原生微信小程序开发实战文档/(5109) 16  内容加速：如何借助云存储实现无缝上云？.md"},i=s("p",null,"在大多数情况下，我们在为应用提供后端服务的过程中，一定会产生一些非结构化的数据（比如用户上传的图片、视频、音频等）。从用户的角度出发，用户很容易识别、打开和读取这些数据，比如你看到一个 doc 后缀的文件，肯定知道要用 word 打开。",-1),y=s("p",null,"但从后端服务的角度出发，这些数据有特定的格式标准，不能像用处理普通文本的方式解析它们，存储方式也不能用结构化的数据存储，而是块状的文件存储。而后端服务在处理这些数据时也十分简单和粗暴，比如将整个文件全部上传、全部读取下载、删除和更新。",-1),E=s("p",null,"文件存储的操作与数据库处理操作差异极大：文件存储只能是更改整体，而数据库存储可以处理细微部分。但文件存储和数据库一样，都是后端服务中不可或缺的部分，两者在各自特定的存储需求中担当不可替代的角色。",-1),d=s("p",null,"这一讲，我就带你深度使用云开发的云存储的能力和功用，与之前讲述的云函数、数据库一起，形成前后端无缝衔接，助力应用轻松上云。",-1),g=s("h3",{id:"用好加速-buffer",tabindex:"-1"},[c("用好加速 Buffer "),s("a",{class:"header-anchor",href:"#用好加速-buffer","aria-label":'Permalink to "用好加速 Buffer"'},"​")],-1),u=s("p",null,"云开发云存储本质上就是提供了一块空间供应用放置文件资源，而你只需要请求一个API，或者函数调用 SDK 就可以放置文件资源了。与传统的存储模式相比，开发者不用关心底层存储以及文件传输的过程，开发效率大大提高（如果放置的文件不断增多，这个空间也可以无限地扩张下去）。",-1),h=s("p",null,"我们把文件存储比作粮仓。在传统情况下，你要去建造一个粮仓，中间打地基、建围墙、搭顶棚并配置水电资源，这些都要投入成本。另外，你还要按照运输的需要预先铺设运输粮食的道路（网络传输）。当粮食（文件数据）开始运输时，你会发现运输的效率完全取决于道路宽窄，以及粮仓自身的调度（当粮仓满了，你又要投入成本构建新的粮仓）。",-1),m=s("p",null,"而云开发云存储，就不需要我们去搞建设，甚至不需要铺路。它自带调度系统，你只告诉云存储调度系统想把粮食（文件数据）运到哪个粮仓就可以了。命令一下达，云存储会自动完成粮食的分拆、打包及运输、粮食入库。另外，你也不用担心传送的粮食变多，因为通往粮仓的道路会根据需求增宽，而且云开发云存储自带的 CDN 加速功能也会自动帮你读取和下载文件，以此提高文件传输的效率。",-1),_=s("p",null,"CDN 加速又叫内容分发网络加速，通俗来讲就是将你主存储（源站）中的文件，复制给各地的存储点（CDN节点），当有用户访问时，可以直接从就近的存储点（CDN节点）获取。",-1),A=s("p",null,"除了上传、读取和下载文件，当文件更新时，已经复制到 CDN 节点的旧文件应该如何处理呢？这里就要引入一个知识点------缓存时间。云开发云存储的 CDN 策略会根据缓存时间做相应的变化部署。",-1),D=s("p",null,"这里的缓存时间其实就是文件副本在各地存储点（CDN节点）的有效时间，比如默认是两小时，那么每次文件副本在各地存储点的有效时间就是两小时，超过时间之后再收到请求时，存储点（CDN节点）就会向主存储（源站）请求最新的文件，而这一请求所产生的流量就称为 CDN回源流量。",-1),F=s("p",null,"缓存时间不能太长也不可太短，如果 CDN 缓存间隔时间过短， CDN 节点上的数据会经常失效，导致频繁回源，增加源站的负载，进而影响整体的传输效率；如果缓存间隔时间过长，会出现数据更新不及时等严重的业务问题。",-1),b=s("p",null,"在投入使用时，云存储中文件的变更频率会因为业务原因各不相同，云开发云存储提供了细微颗粒度的缓存时间设置，你可以针对一个文件、一个路径甚至是文件后缀来分别设置缓存时间。",-1),C=s("p",null,"另外，多个缓存规则设置中有优先级策略，当一个文件命中多个规则时，会按照规则的优先级来决定此文件的缓存时间，如此调配会更加灵活。云存储是以设置规则从后到前的配置模式来做策略计算的，比如一个云存储的域名做了如下缓存配置：",-1),x=p("",7),v=p("",27);function M(w,q,f,N,k,B){const a=o("Image");return e(),t("div",null,[i,y,E,d,g,u,h,m,n(a,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/8B/E0/Ciqc1F_h88mALLmqAAE-QxWmxd0464.png"}),_,A,D,n(a,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/8B/E0/Ciqc1F_h89aAachSAAEgvlixJOQ694.png"}),F,b,n(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image2/M01/01/42/Cip5yF_YW26AevJZAACPiizDhvE406.png"}),C,n(a,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/8B/E0/Ciqc1F_h8-OAYFd4AAB2QAIbvbo711.png"}),x,n(a,{alt:"小程序16-金句.png",src:"https://s0.lgstatic.com/i/image2/M01/03/B7/CgpVE1_hcumAHW8TAADXox8kndA977.png"}),v])}const S=l(r,[["render",M]]);export{T as __pageData,S as default};
