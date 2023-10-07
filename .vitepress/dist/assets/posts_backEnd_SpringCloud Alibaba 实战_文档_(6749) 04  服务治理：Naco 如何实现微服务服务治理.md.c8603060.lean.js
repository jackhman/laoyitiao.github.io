import{_ as p,j as e,o as t,g as c,k as o,h as a,Q as l,s}from"./chunks/framework.4e7d56ce.js";const cs=JSON.parse('{"title":"04服务治理：Naco如何实现微服务服务治理","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/SpringCloud Alibaba 实战_文档/(6749) 04  服务治理：Naco 如何实现微服务服务治理.md","filePath":"posts/backEnd/SpringCloud Alibaba 实战_文档/(6749) 04  服务治理：Naco 如何实现微服务服务治理.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/SpringCloud Alibaba 实战_文档/(6749) 04  服务治理：Naco 如何实现微服务服务治理.md"},y=l("",6),E=s("p",null,"所有服务实例向注册中心登记",-1),i=s("p",null,"在 Spring Cloud Alibaba 生态中，由 Nacos 中间件承担注册中心职责，需要独立部署。下面我们先来认识一下 Nacos。",-1),F=s("p",null,[a("Nacos 官方地址为"),s("a",{href:"https://nacos.io/zh-cn/index.html",target:"_blank",rel:"noreferrer"},"https://nacos.io/zh-cn/index.html"),a("。由阿里开源，官方定义为：")],-1),A=s("p",null,"一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。",-1),d=s("p",null,"Nacos 官方介绍",-1),D=s("p",null,"Nacos 具备以下职能：",-1),g=s("ul",null,[s("li",null,[s("p",null,"服务发现及管理；")]),s("li",null,[s("p",null,"动态配置服务；")]),s("li",null,[s("p",null,"动态 DNS 服务。")])],-1),C=s("p",null,"下图是Nacos 的核心特征：",-1),h=l("",8),u=l("",26),m=s("p",null,"Nacos 控制台",-1),_=s("p",null,[a("管理界面默认用户名与密码均为"),s("strong",null,"nacos"),a('，提交后进入首页。点击左侧菜单"服务管理->服务列表"，这个功能用于查看已注册微服务列表。')],-1),v=s("p",null,"已注册服务列表",-1),B=s("p",null,"目前因为没有任何微服务注册，右侧服务列表是空的。那如何让微服务在 Nacos 中注册呢？下一小节咱们继续讲解。",-1),b=s("h3",{id:"微服务如何接入-nacos",tabindex:"-1"},[a("微服务如何接入 Nacos "),s("a",{class:"header-anchor",href:"#微服务如何接入-nacos","aria-label":'Permalink to "微服务如何接入 Nacos"'},"​")],-1),N=s("p",null,"Spring Cloud Alibaba 作为 Spring Cloud 子项目，开发框架仍基于 SpringBoot，只是在构建项目时需要选择不同的 starter 接入注册中心，下面我们通过实操完成微服务与 Nacos 服务器的接入工作。",-1),f=s("p",null,"开发工具强烈推荐 IDEA Ultimate，Ultimate 内置 SpringBoot 工程向导，可以非常方便地实现 Spring Cloud 微服务的快速创建。",-1),k=s("p",null,"Nacos Ultimate",-1),T=s("h4",{id:"_1-创建新工程-工程类型选择-spring-initializr。",tabindex:"-1"},[a("1. 创建新工程，工程类型选择 Spring Initializr。 "),s("a",{class:"header-anchor",href:"#_1-创建新工程-工程类型选择-spring-initializr。","aria-label":'Permalink to "1. 创建新工程，工程类型选择 Spring Initializr。"'},"​")],-1),w=s("p",null,[a("下图是 SpringBoot 工程向导，右侧选中 Custom，写入阿里云地址"),s("a",{href:"http://start.aliyun.com",target:"_blank",rel:"noreferrer"},"http://start.aliyun.com"),a("，默认的 "),s("a",{href:"https://start.spring.io",target:"_blank",rel:"noreferrer"},"https://start.spring.io"),a("。 这里需要连接 spring 官方服务器，因为网络原因经常无法访问，所以采用国内阿里云镜像生成工程初始代码。")],-1),S=s("p",null,"Spring Initializr 工程向导",-1),P=s("p",null,"Project Metadata 面板，设置 Maven Group 与 Artifact，一般 Artifact 即为微服务名称，约定俗成以 service 单词结尾。",-1),H=s("p",null,"Maven 坐标系",-1),I=s("h4",{id:"_2-在向导后面的依赖页面-要接入-nacos-有一项是必选的-请大家注意。",tabindex:"-1"},[a("2. 在向导后面的依赖页面，要接入 Nacos 有一项是必选的，请大家注意。 "),s("a",{class:"header-anchor",href:"#_2-在向导后面的依赖页面-要接入-nacos-有一项是必选的-请大家注意。","aria-label":'Permalink to "2. 在向导后面的依赖页面，要接入 Nacos 有一项是必选的，请大家注意。"'},"​")],-1),x=s("p",null,"Spring Cloud Alibaba -> Nacos Service Discovery。",-1),O=s("ul",null,[s("li",null,"Nacos Service Discovery 是在当前SpringBoot工程内置 Nacos 客户端，在微服务应用启动时通过 Nacos 客户端向 Nacos 服务器发送注册信息。")],-1),M=s("p",null,"引入 Nacos 客户端",-1),U=s("h4",{id:"_3-工程创建成功-打开-pom-xml-文件-确认-maven-依赖-nacos-discovery-说明服务已内置-nacos-客户端成功。",tabindex:"-1"},[a("3. 工程创建成功，打开 pom.xml 文件，确认 Maven 依赖 nacos-discovery，说明服务已内置 Nacos 客户端成功。 "),s("a",{class:"header-anchor",href:"#_3-工程创建成功-打开-pom-xml-文件-确认-maven-依赖-nacos-discovery-说明服务已内置-nacos-客户端成功。","aria-label":'Permalink to "3. 工程创建成功，打开 pom.xml 文件，确认 Maven 依赖 nacos-discovery，说明服务已内置 Nacos 客户端成功。"'},"​")],-1),j=l("",8),q=s("p",null,"sample-service 实例注册成功",-1),J=s("p",null,'点击列表右侧"详情按钮"就会出现详细信息，在服务详情下清晰列出 sample-service 服务目前可用实例的 IP 及服务端口。',-1),R=s("p",null,"详情查看服务实例明细",-1),V=s("p",null,"到这里我们已完成了微服务向 Nacos 注册登记，因为 SpringBoot 为我们高度封装了注册过程。为了你更透彻理解 Nacos，下面我来介绍 Nacos 注册过程背后的原理。",-1),L=s("h3",{id:"nacos-注册中心的心跳机制",tabindex:"-1"},[a("Nacos 注册中心的心跳机制 "),s("a",{class:"header-anchor",href:"#nacos-注册中心的心跳机制","aria-label":'Permalink to "Nacos 注册中心的心跳机制"'},"​")],-1),z=s("p",null,"讲到这里，你可能会有疑问：无论是部署 Nacos 服务器还是构建 Sample-Service 微服务，只用了几行代码便实现在 Nacos 注册登记。这一切背后，到底是如何实现的？这一小节我将为你答疑解惑。",-1),W=s("p",null,"下图阐述了微服务与 Nacos 服务器之间的通信过程。在微服务启动后每过5秒，会由微服务内置的 Nacos 客户端主动向 Nacos 服务器发起心跳包（HeartBeat）。心跳包会包含当前服务实例的名称、IP、端口、集群名、权重等信息。",-1),G=l("",6),$=s("p",null,"Nacos Server 对心跳包的处理过程",-1),K=s("p",null,'那 Nacos 又是如何将无效实例从可用实例中剔除呢？Nacos Server 内置的逻辑是每过 20 秒对"实例 Map"中的所有"非健康"实例进行扫描，如发现"非健康"实例，随即从"实例 Map"中将该实例删除。',-1),Q=s("h3",{id:"小结与预告",tabindex:"-1"},[a("小结与预告 "),s("a",{class:"header-anchor",href:"#小结与预告","aria-label":'Permalink to "小结与预告"'},"​")],-1),Y=s("p",null,"本节我们讲解了 Nacos 单点部署，同时介绍了微服务如何接入 Nacos，最后通过讲解 Nacos 心跳包机制使你了解 Nacos 注册背后的故事。",-1),Z=s("p",null,"这里给你留一道思考题：本节我们进行了Nacos 单点部署，这必然会成为整个微服务架构的可用性瓶颈，如果你是 Nacos 设计师，该如何解决这个问题呢？",-1),X=s("p",null,"在接下来的课程中，我们将学习 Nacos 集群的建设方案，以及在日常使用 Nacos 时要注意哪些问题。",-1);function ss(as,ns,os,ls,ps,es){const n=e("Image");return t(),c("div",null,[y,o(n,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M00/15/9E/CioPOWBFi3yAYCMtAABu07thcg8444.png"}),a(),E,i,F,A,o(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M01/13/3B/Cgp9HWBB7AKAZ07yAACvEll6DmY191.png"}),a(),d,D,g,C,o(n,{alt:"Nacos地图.png",src:"https://s0.lgstatic.com/i/image6/M00/15/9F/CioPOWBFjHiAQ7eYAAQjfluVCx8451.png"}),a(),h,o(n,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image6/M01/15/A4/Cgp9HWBFjSyAOE9uAAF_5YDg8JQ247.png"}),a(),u,o(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M00/13/3D/Cgp9HWBB7NmAIfQlAAEqbKbR6P8730.png"}),a(),m,_,o(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M00/13/3D/Cgp9HWBB7OOAIdNvAADAcQsaj8k070.png"}),a(),v,B,b,N,f,o(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image6/M01/13/3B/Cgp9HWBB7DKAfdJ2AACBd6PYWhs288.png"}),a(),k,T,w,o(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M00/13/3E/Cgp9HWBB7PmAHNlrAADUouVTGKk694.png"}),a(),S,P,o(n,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image6/M01/13/3B/CioPOWBB7QCAYMhdAAA4WhEsqP4931.png"}),a(),H,I,x,O,o(n,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image6/M01/13/3E/Cgp9HWBB7Q-AX-pfAABTc3G4sG4996.png"}),a(),M,U,o(n,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image6/M00/15/A2/CioPOWBFjX-Ae1Q5AAKm-vYd2m8982.png"}),a(),j,o(n,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image6/M01/13/3F/Cgp9HWBB7V2AdN_kAAEfv6wqT4s969.png"}),a(),q,J,o(n,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image6/M01/15/A6/Cgp9HWBFjdyAEf97AAERhou8VZQ397.png"}),a(),R,V,L,z,W,o(n,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image6/M00/15/9E/CioPOWBFi76AGI0yAAB_L65ZA60975.png"}),a(),G,o(n,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M00/15/A1/Cgp9HWBFi1uAOqWHAADKoEoBJsI786.png"}),a(),$,K,Q,Y,Z,X])}const rs=p(r,[["render",ss]]);export{cs as __pageData,rs as default};
