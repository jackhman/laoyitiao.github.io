import{_ as t,j as i,o as s,g as p,k as n,h as a,Q as o,s as l}from"./chunks/framework.4e7d56ce.js";const v=JSON.parse('{"title":"17数据猎手：基于Binlog，用Canal快速搭建BI监控","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/应用性能分析实战_文档/(7066) 17  数据猎手：基于 Binlog，用 Canal 快速搭建 BI 监控.md","filePath":"posts/backEnd/应用性能分析实战_文档/(7066) 17  数据猎手：基于 Binlog，用 Canal 快速搭建 BI 监控.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/应用性能分析实战_文档/(7066) 17  数据猎手：基于 Binlog，用 Canal 快速搭建 BI 监控.md"},g=o("",38),c=l("h4",{id:"_2-canal-工作原理",tabindex:"-1"},[a("2.Canal 工作原理 "),l("a",{class:"header-anchor",href:"#_2-canal-工作原理","aria-label":'Permalink to "2.Canal 工作原理"'},"​")],-1),B=l("p",null,"Canal 是阿里开源 Java 语言项目，基于数据库 Binlog 日志解析，提供增量数据订阅 & 消费的能力，目前主要支持国内最常用到的关系型数据库 MySQL。",-1),_=l("p",null,"Canal 的工作原理也不复杂（如下图所示）：",-1),d=l("ul",null,[l("li",null,[l("p",null,"Canal 伪装自己成为 Mysql 数据库集群中的 Slave 节点，向 Master 节点发送对 Binlog 的 dump 协议；")]),l("li",null,[l("p",null,"Mysql Master 节点收到 dump 请求后，将数据推送给 Canal；")]),l("li",null,[l("p",null,"Canal 解析 Mysql Binlog 数据发送给下游。")])],-1),h=o("",13);function u(b,q,I,y,m,C){const e=i("Image");return s(),p("div",null,[g,n(e,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M01/40/6F/Cgp9HWCk4g2ARr8vAAUdkIbJM8c153.png"}),a(),c,B,_,d,n(e,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/40/78/CioPOWCk4hOAbZVeAAHP3TFA6b4794.png"}),a(),h])}const k=t(r,[["render",u]]);export{v as __pageData,k as default};
