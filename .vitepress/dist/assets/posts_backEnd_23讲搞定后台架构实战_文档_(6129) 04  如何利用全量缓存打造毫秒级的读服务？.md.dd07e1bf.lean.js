import{_ as p,j as t,o as e,h as i,k as l,f as a,Q as o,s}from"./chunks/framework.d3daa342.js";const I=JSON.parse('{"title":"04如何利用全量缓存打造毫秒级的读服务？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/23讲搞定后台架构实战_文档/(6129) 04  如何利用全量缓存打造毫秒级的读服务？.md","filePath":"posts/backEnd/23讲搞定后台架构实战_文档/(6129) 04  如何利用全量缓存打造毫秒级的读服务？.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/23讲搞定后台架构实战_文档/(6129) 04  如何利用全量缓存打造毫秒级的读服务？.md"},r=o("",6),_=s("p",null,"图 1：全量缓存的架构图",-1),g=s("p",null,"因为所有数据都存储在缓存里，读服务在查询时不会再降级到数据库里，所有的请求都完全依赖缓存。此时，因降级到数据库导致的毛刺问题就解决了。",-1),d=s("p",null,"但全量缓存并没有解决更新时的分布式事务问题，反而把问题放大了。因为全量缓存对数据更新要求更加严格，要求所有数据库已有数据和实时更新的数据必须完全同步至缓存，不能有遗漏。",-1),y=s("p",null,"对于此问题，一种有效的方案是采用订阅数据库的 Binlog 实现数据同步。",-1),E=s("h3",{id:"基于-binlog-的全量缓存架构",tabindex:"-1"},[a("基于 Binlog 的全量缓存架构 "),s("a",{class:"header-anchor",href:"#基于-binlog-的全量缓存架构","aria-label":'Permalink to "基于 Binlog 的全量缓存架构"'},"​")],-1),h=s("p",null,[a('在实施基于 Binlog 的架构方案前，我先简单介绍下 Binlog，更加详细的介绍我将在"'),s("strong",null,"05 讲"),a('"里和你讨论。首先看下 Binlog 的原理，如下图 2 所示：')],-1),u=s("p",null,"图 2：Binlog 原理图",-1),B=s("p",null,"Binlog 是 MySQL 及大部分主流数据库的主从数据同步方案。主数据库会将所有的变更按一定格式写入它本机的 Binlog 文件中。在主从同步时，从数据库会和主数据库建立连接，通过特定的协议串行地读取主数据库的 Binlog 文件，并在从库进行 Binlog 的回放，进而完成主从复制。",-1),A=s("p",null,"现在很多开源工具（如阿里的 Canal、MySQL_Streamer、Maxwell、Linkedin 的 Databus 等）可以模拟主从复制的协议。通过模拟协议读取主数据库的 Binlog 文件，从而获取主库的所有变更。对于这些变更，它们开放了各种接口供业务服务获取数据。",-1),f=s("p",null,"基于 Binlog 的全量缓存架构正是依赖此类中间件完来成数据同步的，架构如下图 3 所示：",-1),C=o("",26),F=o("",10),m=o("",7),q=o("",8);function b(D,T,k,v,S,P){const n=t("Image");return e(),i("div",null,[r,l(n,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image2/M01/05/F8/CgpVE2ABd_GAJL0AAAFkMI1YwU4141.png"}),a(),_,g,d,y,E,h,l(n,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image2/M01/05/F6/Cip5yGABeA2AOa1fAAI_L-iG_j4329.png"}),a(),u,B,A,f,l(n,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image2/M01/05/F6/Cip5yGABeDCAYarfAAFnB1IDAUU439.png"}),a(),C,l(n,{alt:"图片7.png",src:"https://s0.lgstatic.com/i/image/M00/8E/18/CgqCHmABhX-ANvJRAAGJqu4p-N8813.png"}),a(),F,l(n,{alt:"6.png",src:"https://s0.lgstatic.com/i/image2/M01/06/8E/CgpVE2AFPfuAEYDbAAJhI8yG-E8905.png"}),a(),m,l(n,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image2/M01/05/F6/Cip5yGABeWOAdnL0AAH9WGLDI5s542.png"}),a(),q])}const N=p(c,[["render",b]]);export{I as __pageData,N as default};
