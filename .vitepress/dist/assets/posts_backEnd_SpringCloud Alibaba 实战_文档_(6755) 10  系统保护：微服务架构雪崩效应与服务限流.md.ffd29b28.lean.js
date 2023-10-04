import{_ as o,j as t,o as e,g as r,k as l,h as n,Q as p,s}from"./chunks/framework.e0c66c3f.js";const es=JSON.parse('{"title":"微服务的雪崩效应 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/SpringCloud Alibaba 实战_文档/(6755) 10  系统保护：微服务架构雪崩效应与服务限流.md","filePath":"posts/backEnd/SpringCloud Alibaba 实战_文档/(6755) 10  系统保护：微服务架构雪崩效应与服务限流.md","lastUpdated":1696338709000}'),c={name:"posts/backEnd/SpringCloud Alibaba 实战_文档/(6755) 10  系统保护：微服务架构雪崩效应与服务限流.md"},i=p("",9),E=p("",8),y=s("p",null,"前端应用需要四个服务",-1),d=s("p",null,"但随着时间推移，假如服务 I 因为优化问题，导致需要 20 秒才能返回响应，这就必然会导致 20 秒内该请求线程会一直处于阻塞状态。",-1),g=s("p",null,"其中一个出现长延时，会导致前端应用线程阻塞",-1),_=s("p",null,'但是，如果这种状况放在高并发场景下，就绝对不允许出现，假如在 20 秒内有 10 万个请求通过应用访问到后端微服务。容器会因为大量请求阻塞积压导致连接池爆满，而这种情况后果极其严重！轻则"服务无响应"，重则前端应用直接崩溃。',-1),h=s("p",null,'以上这种因为某一个节点长时间处理导致应用请求积压崩溃的现象被称为微服务的"雪崩效应"。',-1),u=p("",5),A=s("p",null,"通过服务降级减少阻塞时间",-1),b=s("h4",{id:"alibaba-sentinel",tabindex:"-1"},[n("Alibaba Sentinel "),s("a",{class:"header-anchor",href:"#alibaba-sentinel","aria-label":'Permalink to "Alibaba Sentinel"'},"​")],-1),S=s("p",null,[n("有了解决问题的方案，下面咱们就可以聊聊落地实现的事情。在 Spring Cloud Alibaba 生态中有一个重要的流控组件 Sentinel。Sentinel 以流量为切入点，从"),s("strong",null,"流量控制"),n(" 、"),s("strong",null,"熔断降级"),n(" 、"),s("strong",null,"系统负载保护"),n("等多个维度保护服务的稳定性。")],-1),D=p("",3),m=s("p",null,"Alibaba Sentinel特性图",-1),C=s("h3",{id:"sentinel-配置入门",tabindex:"-1"},[n("Sentinel 配置入门 "),s("a",{class:"header-anchor",href:"#sentinel-配置入门","aria-label":'Permalink to "Sentinel 配置入门"'},"​")],-1),P=s("p",null,[n("Sentinel 分为两个部分："),s("strong",null,"Sentinel Dashboard"),n(" 和"),s("strong",null,"Sentinel 客户端"),n("。")],-1),F=s("ul",null,[s("li",null,[s("strong",null,"Sentinel Dashboard"),n("：Sentinel Dashboard 是 Sentinel 配套的可视化控制台与监控仪表盘套件，它支持节点发现，以及健康情况管理、监控（单机和集群）、规则管理和推送的功能。Sentinel Dashboard 是基于 Spring Boot 开发的 WEB 应用，打包后可以直接运行，目前最新版本为 1.8.0。")])],-1),f=s("p",null,"Sentinel Dashboard",-1),B=s("ul",null,[s("li",null,[s("strong",null,"Sentinel 客户端"),n("：Sentinel 客户端需要集成在 Spring Boot 微服务应用中，用于接收来自 Dashboard 配置的各种规则，并通过 Spring MVC Interceptor 拦截器技术实现应用限流、熔断保护。")])],-1),T=s("h4",{id:"部署-sentinel-dashboard-仪表盘",tabindex:"-1"},[n("部署 Sentinel Dashboard（仪表盘） "),s("a",{class:"header-anchor",href:"#部署-sentinel-dashboard-仪表盘","aria-label":'Permalink to "部署 Sentinel Dashboard（仪表盘）"'},"​")],-1),I=s("p",null,[s("strong",null,"1"),n(" . 访问："),s("a",{href:"https://github.com/alibaba/Sentinel/releases?fileGuid=xxQTRXtVcqtHK6j8",target:"_blank",rel:"noreferrer"},"https://github.com/alibaba/Sentinel/releases"),n("，下载最新版 Sentinel Dashboard。")],-1),k=p("",5),v=s("p",null,"Sentinel Dashboard 登录页",-1),q=p("",9),w=p("",6),x=s("p",null,"正常访问结果",-1),M=s("p",null,"第二步，访问 Sentinel Dashboard 配置限流规则。",-1),W=s("p",null,'在左侧找到簇点链路，右侧定位到 /test_flow_rule，点击后面的"流控"按钮。',-1),V=s("p",null,"设置接口流控规则",-1),Y=s("p",null,'在弹出界面，按下图配置，其含义为 /test_flow_rule 接口每秒钟只允许 1QPS 访问，超出的请求直接服务降级返回异常。最后点击"新增"完成规则设置。',-1),H=s("p",null,"设置流控规则",-1),O=s("p",null,'此时针对 /test_flow_rule 接口的流控规则已生效，可以在"流控规则"面板看到。',-1),R=s("p",null,"现有流控规则列表",-1),N=s("p",null,"第三步，验证流控效果。",-1),j=s("p",null,[n("重新访问"),s("a",{href:"http://localhost/test_flow_rule?fileGuid=xxQTRXtVcqtHK6j8",target:"_blank",rel:"noreferrer"},"http://localhost/test_flow_rule"),n("，浏览器反复刷新。")],-1),G=s("p",null,'第一次刷新时会出现"SUCCESS"文本代表处理成功。',-1),Q=s("p",null,"第一次执行成功",-1),K=s("p",null,'同一秒内再次刷新便会出现 "Blocked by Sentinel (flow limiting)"，代表服务已被限流降级。',-1),U=s("p",null,"第二次限流降级",-1),L=s("p",null,"到这里，我们已经利用 Sentinel 对微服务接口实施了初步的限流降级控制，Sentinel 还有很多高级的用法，我们在后面继续深入讲解。",-1),J=s("h3",{id:"小结与预告",tabindex:"-1"},[n("小结与预告 "),s("a",{class:"header-anchor",href:"#小结与预告","aria-label":'Permalink to "小结与预告"'},"​")],-1),X=s("p",null,"这一讲我们主要对 Sentinel 进行入门学习，让你有个感性认识。本节讲解三方面内容，首先通过在工作中真实的案例分析了雪崩效应的产生与预防办法，其次介绍 Alibaba Sentinel Dashboard 与客户端的配置过程，最后演示了如何对微服务接口进行限流降级。",-1),$=s("p",null,"这里我预留一道讨论题：在架构设计时，你是如何预估某个接口线上运行时的 QPS 范围呢？你可以把自己的经验写在评论中，我们一起探讨。",-1),Z=s("p",null,"下一讲，我们继续深入 Sentinel，了解 Sentinel 的高级特性与执行原理。",-1);function z(ss,ns,as,ls,ps,os){const a=t("Image");return e(),r("div",null,[i,l(a,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M00/24/6B/CioPOWBYa2mAG_xqAAEcWlAHvHE745.png"}),n(),E,l(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/24/36/Cgp9HWBYO_-AeVq4AAGEBeCSUp0830.png"}),n(),y,d,l(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M00/24/33/CioPOWBYPAqAc518AAGeUBhPTuo873.png"}),n(),g,_,h,l(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M00/24/36/Cgp9HWBYPBKAJ0khAAHuArA1CLM030.png"}),n(),u,l(a,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M00/24/6B/CioPOWBYa4yAHas6AAH74uOpAws537.png"}),n(),A,b,S,l(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image6/M00/24/36/Cgp9HWBYPCyADtVHAABb2bfo-5c381.png"}),n(),D,l(a,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image6/M00/24/33/CioPOWBYPDWAWiZhAAF09c_FEsk726.png"}),n(),m,C,P,F,l(a,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image6/M00/24/37/Cgp9HWBYPESACt_8AAF1oDZWLSE169.png"}),n(),f,B,T,I,l(a,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image6/M00/24/33/CioPOWBYPFmAe2VjAAA_BKIoDHc533.png"}),n(),k,l(a,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image6/M00/24/33/CioPOWBYPG2AMCU3AABouR6oraI157.png"}),n(),v,l(a,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image6/M00/24/33/CioPOWBYPHSAMIMFAAF1oDZWLSE503.png"}),n(),q,l(a,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image6/M00/24/33/CioPOWBYPIOAHDJJAAE0B0o7THQ348.png"}),n(),w,l(a,{alt:"Drawing 14.png",src:"https://s0.lgstatic.com/i/image6/M00/24/34/CioPOWBYPJOAeYQWAAAYWt6cblE822.png"}),n(),x,M,W,l(a,{alt:"Drawing 15.png",src:"https://s0.lgstatic.com/i/image6/M00/24/34/CioPOWBYPJuACPqNAAFg_BIMsCQ263.png"}),n(),V,Y,l(a,{alt:"Drawing 16.png",src:"https://s0.lgstatic.com/i/image6/M00/24/34/CioPOWBYPKOAGKnkAACOQCgt64c070.png"}),n(),H,O,l(a,{alt:"Drawing 17.png",src:"https://s0.lgstatic.com/i/image6/M00/24/34/CioPOWBYPKuAAHhBAACITC3GUbc531.png"}),n(),R,N,j,G,l(a,{alt:"Drawing 18.png",src:"https://s0.lgstatic.com/i/image6/M00/24/34/CioPOWBYPLOAbA0WAAAYWt6cblE876.png"}),n(),Q,K,l(a,{alt:"Drawing 20.png",src:"https://s0.lgstatic.com/i/image6/M00/24/37/Cgp9HWBYPL2AECwYAAAsR0YXbSY107.png"}),n(),U,L,J,X,$,Z])}const rs=o(c,[["render",z]]);export{es as __pageData,rs as default};
