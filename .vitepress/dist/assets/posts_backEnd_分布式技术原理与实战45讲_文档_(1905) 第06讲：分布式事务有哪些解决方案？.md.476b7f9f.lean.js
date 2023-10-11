import{_ as s,D as n,o as l,g as i,J as o,h as t,Q as r,m as a}from"./chunks/framework.f67d7268.js";const X=JSON.parse('{"title":"第06讲：分布式事务有哪些解决方案？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/分布式技术原理与实战45讲_文档/(1905) 第06讲：分布式事务有哪些解决方案？.md","filePath":"posts/backEnd/分布式技术原理与实战45讲_文档/(1905) 第06讲：分布式事务有哪些解决方案？.md","lastUpdated":1696682708000}'),_={name:"posts/backEnd/分布式技术原理与实战45讲_文档/(1905) 第06讲：分布式事务有哪些解决方案？.md"},p=r("",23),c=a("h3",{id:"不同隔离级别",tabindex:"-1"},[t("不同隔离级别 "),a("a",{class:"header-anchor",href:"#不同隔离级别","aria-label":'Permalink to "不同隔离级别"'},"​")],-1),h=a("p",null,[t("SQL 标准根据三种不一致的异常现象，将隔离性定义为四个"),a("strong",null,"隔离级别"),t("（Isolation Level），隔离级别和数据库的性能呈反比，隔离级别越低，数据库性能越高；而隔离级别越高，数据库性能越差，具体如下：")],-1),d=a("br",null,null,-1),b=r("",27),m=a("h3",{id:"服务层拆分",tabindex:"-1"},[t("服务层拆分 "),a("a",{class:"header-anchor",href:"#服务层拆分","aria-label":'Permalink to "服务层拆分"'},"​")],-1),T=a("p",null,"服务层拆分也就是业务的服务化，系统架构的演进是从集中式到分布式，业务功能之间越来越解耦合。",-1),u=a("br",null,null,-1),C=a("p",null,"比如电商网站系统，业务初期可能是一个单体工程支撑整套服务，但随着系统规模进一步变大，参考康威定律，大多数公司都会将核心业务抽取出来，以作为独立的服务。商品、订单、库存、账号信息都提供了各自领域的服务，业务逻辑的执行散落在不同的服务器上。",-1),g=a("br",null,null,-1),A=a("p",null,"用户如果在某网站上进行一个下单操作，那么会同时依赖订单服务、库存服务、支付扣款服务，这几个操作如果有一个失败，那下单操作也就完不成，这就需要分布式事务来保证了。",-1),P=a("br",null,null,-1),q=r("",22),S=r("",14),f=a("br",null,null,-1),k=a("p",null,"在 Seata 中，全局事务对分支事务的协调基于两阶段提交协议，类似数据库中的 XA 规范，XA 规范定义了三个组件来协调分布式事务，分别是 AP 应用程序、TM 事务管理器、RM 资源管理器、CRM 通信资源管理器。关于 XA 规范的详细内容，将会在后面的课时中介绍。",-1),x=a("h2",{id:"总结",tabindex:"-1"},[t("总结 "),a("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),I=a("p",null,"掌握分布式事务是学习分布式系统的必经之路，今天介绍了分布式事务的概念，回顾了数据库事务和不同隔离级别，以及分布式事务产生的原因，最后介绍了分布式事务的几种解决方案。",-1),V=a("br",null,null,-1),B=a("p",null,"对本节课程中没有扩展的知识点，比如 MySQL 的间隙锁，Seata 组件的具体应用等，感兴趣的同学可以找相关资料去学习。",-1);function M(D,R,y,E,N,L){const e=n("Image");return l(),i("div",null,[p,o(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/89/B8/Cgq2xl6YKgWAFKVkAABZg_32mvY092.png"}),t(),c,h,d,o(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/B1/CgoCgV6ZEeeARjgZAACG1UhVyAQ853.png"}),t(),b,o(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/73/CgoCgV6YKgWAC4JgAAB2eZ1XI1A491.png"}),t(),m,T,u,C,g,A,P,o(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/10/A7/Ciqah16YM9CAZN3eAAEQmtX7AiM805.png"}),t(),q,o(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/89/B8/Cgq2xl6YKgaAVUwAAAFePtc8mmU340.png"}),t(),S,o(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/73/CgoCgV6YKgaAd7yLAABomXRmmds250.png"}),t(),f,k,x,I,V,B])}const v=s(_,[["render",M]]);export{X as __pageData,v as default};
