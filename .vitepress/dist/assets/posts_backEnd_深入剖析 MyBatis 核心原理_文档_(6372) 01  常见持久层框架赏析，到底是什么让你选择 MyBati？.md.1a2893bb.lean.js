import{_ as o,j as t,o as e,g as r,k as p,h as a,s,Q as l}from"./chunks/framework.e0c66c3f.js";const I=JSON.parse('{"title":"Hibernate ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/深入剖析 MyBatis 核心原理_文档/(6372) 01  常见持久层框架赏析，到底是什么让你选择 MyBati？.md","filePath":"posts/backEnd/深入剖析 MyBatis 核心原理_文档/(6372) 01  常见持久层框架赏析，到底是什么让你选择 MyBati？.md","lastUpdated":1696338709000}'),c={name:"posts/backEnd/深入剖析 MyBatis 核心原理_文档/(6372) 01  常见持久层框架赏析，到底是什么让你选择 MyBati？.md"},i=l("",9),y=s("p",null,"对象模型与关系模型的映射",-1),E=s("p",null,"在生产环境中，数据库一般都是比较稀缺的，数据库连接也是整个服务中比较珍贵的资源之一。建立数据库连接涉及鉴权、握手等一系列网络操作，是一个比较耗时的操作，所以我们不能像上述 JDBC 基本操作流程那样直接释放掉数据库连接，否则持久层很容易成为整个系统的性能瓶颈。",-1),u=s("p",null,"Java 程序员一般会使用数据库连接池的方式进行优化，此时就需要引入第三方的连接池实现，当然，也可以自研一个连接池，但是要处理连接活跃数、控制连接的状态等一系列操作还是有一定难度的。另外，有一些查询返回的数据是需要本地缓存的，这样可以提高整个程序的查询性能，这就需要缓存的支持。",-1),g=s("p",null,'如果没有 ORM 框架的存在，这就需要我们 Java 开发者熟悉相关连接池、缓存等组件的 API 并手动编写一些"黏合"代码来完成集成，而且这些代码重复度很高，这显然不是我们希望看到的结果。',-1),d=s("p",null,[a("很多 ORM 框架都支持集成第三方缓存、第三方数据源等常用组件，并对外提供统一的配置接入方式，这样我们只需要使用简单的配置即可完成第三方组件的集成。当我们需要更换某个第三方组件的时候，只需要引入相关依赖并更新配置即可，这就"),s("strong",null,"大大提高了开发效率以及整个系统的可维护性"),a("。")],-1),m=l("",7),F=l("",25),_=s("p",null,"JPA 生态图",-1),C=s("p",null,"JPA 有三个核心部分：ORM 映射元数据、操作实体对象 API 和面向对象的查询语言（JPQL）。这与 Hibernate 的核心功能基本类似，就不再重复讲述。",-1),q=s("p",null,'Java 开发者应该都知道"Spring 全家桶"的强大，Spring 目前已经成为事实上的标准了，很少有企业会完全离开 Spring 来开发 Java 程序。现在的 Spring 已经不仅仅是最早的 IoC 容器了，而是整个 Spring 生态，例如，Spring Cloud、Spring Boot、Spring Security 等，其中就包含了 Spring Data。',-1),A=s("p",null,[s("strong",null,"Spring Data 是 Spring 在持久化方面做的一系列扩展和整合"),a("，下图就展示了 Spring Data 中的子项目：")],-1),b=s("p",null,"Spring Data 生态图",-1),B=s("p",null,"Spring Data 中的每个子项目都对应一个持久化存储，通过不断的整合接入各种持久化存储的能力，Spring 的生态又向前迈进了一大步，其中最常被大家用到的应该就是 Spring Data JPA。",-1),h=s("p",null,[s("strong",null,"Spring Data JPA 是符合 JPA 规范的一个 Repository 层的实现"),a("，其所在的位置如下图所示：")],-1),S=l("",18),D={href:"https://shenceyun.lagou.com/t/Mka",target:"_blank",rel:"noreferrer"},J=s("p",null,[s("strong",null,"《Java 工程师高薪训练营》")],-1),M=s("p",null,[a("实战训练+面试模拟+大厂内推，想要提升技术能力，进大厂拿高薪，"),s("a",{href:"https://shenceyun.lagou.com/t/Mka",target:"_blank",rel:"noreferrer"},"点击链接，提升自己"),a("！")],-1);function v(H,P,O,L,Q,R){const n=t("Image");return e(),r("div",null,[i,p(n,{alt:"Lark20210125-111459.png",src:"https://s0.lgstatic.com/i/image/M00/91/5F/CgqCHmAON9CAWnMJAACJd8-3Mcg506.png"}),a(),y,E,u,g,d,p(n,{alt:"2021127-6553.png",src:"https://s0.lgstatic.com/i/image2/M01/0A/31/CgpVE2ARDn-AdyGBAAVffl0vlNA234.png"}),a(),m,p(n,{alt:"Lark20210125-111502.png",src:"https://s0.lgstatic.com/i/image/M00/91/5F/CgqCHmAON92AUlSJAAGm39S5TAY573.png"}),a(),F,p(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/8F/DC/CgqCHmAJKpiAD5DOAAEJWo_r1B4663.png"}),a(),_,C,q,A,p(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/8F/DC/CgqCHmAJKq6AZEwjAAHdDlc6RI0325.png"}),a(),b,B,h,p(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/8F/DC/CgqCHmAJKraAbIoyAAEm9GmJgx4010.png"}),a(),S,s("p",null,[s("a",D,[p(n,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/6D/3E/CgqCHl-s60-AC0B_AAhXSgFweBY762.png"})])]),J,M])}const T=o(c,[["render",v]]);export{I as __pageData,T as default};
