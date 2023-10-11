import{_ as l,D as p,o as t,g as r,J as a,h as n,m as s,Q as o}from"./chunks/framework.f67d7268.js";const R=JSON.parse('{"title":"第23讲：深入剖析regiter-receiver-plugin插件（下）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1741) 第23讲：深入剖析 regiter-receiver-plugin 插件（下）.md","filePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1741) 第23讲：深入剖析 regiter-receiver-plugin 插件（下）.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1741) 第23讲：深入剖析 regiter-receiver-plugin 插件（下）.md"},i=s("h1",{id:"第23讲-深入剖析regiter-receiver-plugin插件-下",tabindex:"-1"},[n("第23讲：深入剖析regiter-receiver-plugin插件（下） "),s("a",{class:"header-anchor",href:"#第23讲-深入剖析regiter-receiver-plugin插件-下","aria-label":'Permalink to "第23讲：深入剖析regiter-receiver-plugin插件（下）"'},"​")],-1),E=s("p",null,"本课时将紧接上一课时的内容，继续介绍服务实例注册请求、EndpointName 以及 NetworkAddress 同步请求的处理。",-1),y=s("h3",{id:"iregisterlockdao原理分析",tabindex:"-1"},[n("IRegisterLockDAO原理分析 "),s("a",{class:"header-anchor",href:"#iregisterlockdao原理分析","aria-label":'Permalink to "IRegisterLockDAO原理分析"'},"​")],-1),d=s("p",null,"紧接上一课时，当一个服务的注册请求首次到达 RegisterPersistentWorker 时，会通过 IRegisterLockDAO 为其生成全局唯一 ID 。IRegisterLockDAO 接口有两个实现类，如下图所示：",-1),g=s("p",null,"这里要重点分析的是 RegisterLockDAOImpl 这个实现类，其底层是依赖 ElasticSearch 的 version 机制实现的乐观锁。",-1),v=s("p",null,"RegisterLockDAOImpl 这个分布式乐观锁底层使用的索引名称是 register_lock，它为每个 RegisterSource 都分配了一个单独的 Document。Document ID 就是 @Stream 注解中的 scopeId 的值，例如，ServiceInventory 的 scopeId 就是 14，ServiceInstanceInventory 的 scopeId 就是 15，如下所示：",-1),I=o("",8),u=o("",6),_=s("h3",{id:"networkaddress、endpointname-同步",tabindex:"-1"},[n("NetWorkAddress、EndpointName 同步 "),s("a",{class:"header-anchor",href:"#networkaddress、endpointname-同步","aria-label":'Permalink to "NetWorkAddress、EndpointName 同步"'},"​")],-1),m=s("p",null,"在前面分析 Skywalking Agent 时曾提到，Agent 将 Trace 数据中用到的 NetworkAddress、EndpointName 等字符串信息定时同步到后端 OAP，然后由后端 OAP 集群为其统一分配全局唯一的 ID。之后，在 Agent 上报数据时，会使用这些全局唯一 ID 替换相应的字符串，从而提高上报消息的有效负载，提高传输效率。",-1),A=s("p",null,"你可以先回忆一下，当 Agent 在使用 NetworkAddress 时，例如，创建 Exitpan 的时候会记录 remotePeer 信息，remotePeer 一般是 Host + Port 或 URL等字符串数据，该信息会暂存在 NetworkAddressDictionary 中，并定期发送 NetworkAddress 同步请求与 OAP 同步。",-1),D=s("p",null,"NetworkAddress 同步请求的处理流程如下：",-1),h=o("",11);function S(F,k,q,C,b,P){const e=p("Image");return t(),r("div",null,[i,E,y,d,a(e,{alt:"image (13).png",src:"https://s0.lgstatic.com/i/image/M00/16/D1/Ciqc1F7WHyuAehevAADKLauus4I955.png"}),n(),g,v,a(e,{alt:"image (14).png",src:"https://s0.lgstatic.com/i/image/M00/16/DD/CgqCHl7WHzWAQfHPAAYFXpVpP-Y709.png"}),n(),I,a(e,{alt:"image (15).png",src:"https://s0.lgstatic.com/i/image/M00/16/DD/CgqCHl7WHz-AadgsAAFmWx71MBY433.png"}),n(),u,a(e,{alt:"image (16).png",src:"https://s0.lgstatic.com/i/image/M00/16/D1/Ciqc1F7WH0mAIjcKAAefOW_jMVc517.png"}),n(),_,m,A,D,a(e,{alt:"image (17).png",src:"https://s0.lgstatic.com/i/image/M00/16/DD/CgqCHl7WH1KASBKJAAH06v4jr4g358.png"}),n(),h])}const B=l(c,[["render",S]]);export{R as __pageData,B as default};
