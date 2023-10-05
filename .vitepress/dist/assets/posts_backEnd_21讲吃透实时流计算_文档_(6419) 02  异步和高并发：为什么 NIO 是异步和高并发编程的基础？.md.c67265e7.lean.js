import{_ as l,j as p,o as t,g as c,k as o,h as a,s,Q as e}from"./chunks/framework.4e7d56ce.js";const W=JSON.parse('{"title":"BIO 连接器的问题 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/21讲吃透实时流计算_文档/(6419) 02  异步和高并发：为什么 NIO 是异步和高并发编程的基础？.md","filePath":"posts/backEnd/21讲吃透实时流计算_文档/(6419) 02  异步和高并发：为什么 NIO 是异步和高并发编程的基础？.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/21讲吃透实时流计算_文档/(6419) 02  异步和高并发：为什么 NIO 是异步和高并发编程的基础？.md"},E=s("p",null,"为什么在讲流计算之前，要先讲异步和高并发的问题呢？",-1),i=s("ul",null,[s("li",null,[s("p",null,'其一，是因为"流"本质是异步的，可以说"流计算"也是一种形式的异步编程。')]),s("li",null,[s("p",null,"其二，是因为对于一个流计算系统而言，其起点一定是数据采集，没数据就什么事情都做不了，而数据采集通常就会涉及 IO 问题，如何设计一个高性能的 IO 密集型应用，异步和并发编程既是过不去的坎，也是我们掌握高性能 Java 编程的基础。")])],-1),y=s("p",null,"所以，在这个课时中，我们就从数据采集模块切入，通过开发一个高性能的数据采集模块，从实战中理解 NIO、异步和高并发的原理。这样，当你以后开发高性能服务时，比如需要支持数万甚至数百万并发连接的 Web 服务时，就知道如何充分发挥出硬件资源的能力，就可以用最低的硬件成本，来达到业务的性能要求。",-1),u=s("p",null,"为了更方便地说明问题，我们今天的讨论，以从互联网上采集数据为例。具体来说，如下图 1 所示，数据通过 REST 接口，从手机或网页端，发送到数据采集服务器。",-1),_=s("p",null,"图 1 基于 REST 协议的数据采集服务器",-1),d=s("h3",{id:"bio-连接器的问题",tabindex:"-1"},[a("BIO 连接器的问题 "),s("a",{class:"header-anchor",href:"#bio-连接器的问题","aria-label":'Permalink to "BIO 连接器的问题"'},"​")],-1),h=s("p",null,"由于是面向互联网采集数据，所以我们要实现的数据采集服务器，就是一个常见的 Web 服务。说到 Web 服务开发，作为 Java 开发人员，十有八九会用到 Tomcat。毕竟 Tomcat 一直是 Spring 生态的默认 Web 服务器，使用面是非常广的。",-1),C=s("p",null,"但使用 Tomcat 需要注意一个问题。在 Tomcat 7 及之前的版本中， Tomcat 默认使用的是 BIO 连接器， BIO 连接器的工作原理如下图 2 所示。",-1),m=s("p",null,"图 2 BIO连接器工作原理",-1),g=s("p",null,"当使用 BIO 连接器时，Tomcat 会为每个客户端请求，分配一个独立的工作线程进行处理。这样，如果有 100 个客户端同时发送请求，就需要同时创建 100 个工作线程。如果有 1 万个客户端同时请求，就需要创建 1 万个工作线程。而如果是 100 万个客户端同时请求呢？是不是需要创建 100 万个工作线程？",-1),A=s("p",null,[a("所以，"),s("strong",null,"BIO 连接器的最大问题是它的工作线程和请求连接是一一对应耦合起来的"),a("。当同时建立的请求连接数比较少时，使用 BIO 连接器是合适的，因为这个时候线程数是够用的。但考虑下，像 BATJ 等大厂的使用场景，哪家不是成万上亿的用户，哪家不是数十万、数百万的并发连接。在这些场景下，使用 BIO 连接器就根本行不通了。")],-1),I=s("p",null,"所以，我们需要采取新的方案，这就是 Tomcat NIO 连接器。",-1),O=s("h3",{id:"使用-nio-支持百万连接",tabindex:"-1"},[a("使用 NIO 支持百万连接 "),s("a",{class:"header-anchor",href:"#使用-nio-支持百万连接","aria-label":'Permalink to "使用 NIO 支持百万连接"'},"​")],-1),F=s("p",null,"毫无意外的是，从 Tomcat 8 开始，Tomcat 已经将 NIO 设置成了它的默认连接器。所以，如果你此时还在使用 Tomcat 7 或之前的版本的话，需要检查下你的服务器，究竟使用的是哪种连接器。",-1),x=e("",10),B=e("",19),q=s("p",null,[s("a",{href:"https://github.com/alain898/realtime_stream_computing_course",target:"_blank",rel:"noreferrer"},"点击此链接查看本课程所有课时的源码")],-1),b=s("hr",null,null,-1),N={href:"https://kaiwu.lagou.com/data_enhancement.html?utm_source=lagouedu&utm_medium=zhuanlan&utm_campaign=%E5%A4%A7%E6%95%B0%E6%8D%AE%E5%BC%80%E5%8F%91%E9%AB%98%E8%96%AA%E8%AE%AD%E7%BB%83%E8%90%A5#/index",target:"_blank",rel:"noreferrer"},P=s("br",null,null,-1),T=s("a",{href:"https://kaiwu.lagou.com/data_enhancement.html?utm_source=lagouedu&utm_medium=zhuanlan&utm_campaign=%E5%A4%A7%E6%95%B0%E6%8D%AE%E5%BC%80%E5%8F%91%E9%AB%98%E8%96%AA%E8%AE%AD%E7%BB%83%E8%90%A5#/index",target:"_blank",rel:"noreferrer"},"PB 级企业大数据项目实战 + 拉勾硬核内推，5 个月全面掌握大数据核心技能。点击链接，全面赋能！",-1);function k(f,v,D,U,S,H){const n=p("Image");return t(),c("div",null,[E,i,y,u,o(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image2/M01/0A/9C/Cip5yGASZ4SAW0_5AAGrQ8Srwvo664.png"}),a(),_,d,h,C,o(n,{alt:"Lark20210201-112830.png",src:"https://s0.lgstatic.com/i/image2/M01/0C/18/CgpVE2AXdWiADLMCAAHMLshLpPY043.png"}),a(),m,g,A,I,O,F,o(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/92/B2/CgqCHmASZ5uAJOF8AAHkGkDdBlM833.png"}),a(),x,o(n,{alt:"Lark20210201-113030.png",src:"https://s0.lgstatic.com/i/image2/M01/0C/16/Cip5yGAXdeGAFnlbAAC4HyWiW3I997.png"}),a(),B,o(n,{alt:"Lark20210201-112808.png",src:"https://s0.lgstatic.com/i/image2/M01/0C/16/Cip5yGAXdVCAWHAXAAWgk2TpqBQ259.png"}),q,b,s("p",null,[s("a",N,[o(n,{alt:"image (3).png",src:"https://s0.lgstatic.com/i/image2/M01/0C/98/CgpVE2AZCKKAa8TbAAUCrlmIuEw611.png"})]),P,T])])}const M=l(r,[["render",k]]);export{W as __pageData,M as default};
