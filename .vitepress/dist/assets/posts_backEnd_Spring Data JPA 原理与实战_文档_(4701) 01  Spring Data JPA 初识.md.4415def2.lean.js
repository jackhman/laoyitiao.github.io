import{_ as o,j as e,o as t,g as r,k as n,s,h as l,Q as p}from"./chunks/framework.e0c66c3f.js";const V=JSON.parse('{"title":"Spring Boot 和 Spring Data JPA 的 Demo演示 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Data JPA 原理与实战_文档/(4701) 01  Spring Data JPA 初识.md","filePath":"posts/backEnd/Spring Data JPA 原理与实战_文档/(4701) 01  Spring Data JPA 初识.md","lastUpdated":1696338709000}'),c={name:"posts/backEnd/Spring Data JPA 原理与实战_文档/(4701) 01  Spring Data JPA 初识.md"},E=s("p",null,"课程正式开始了，这里我会以一个案例的形式来和你讲解如何通过 Spring Boot 结合 Spring Data JPA 快速启动一个项目、如何使用 UserRepository 完成对 User 表的操作、如何写测试用例等几个知识点，同时带你体验一下 Spring Data JPA 的优势。通过这个课时，希望你能够对 JPA 建立一个整体的认识。",-1),y=s("blockquote",null,[s("p",null,"提示：在本课程中如果没有特殊说明，JPA 就是指 Spring Data JPA。")],-1),i=s("p",null,"话不多说，我们先来看一个案例。",-1),u=s("h3",{id:"spring-boot-和-spring-data-jpa-的-demo演示",tabindex:"-1"},[l("Spring Boot 和 Spring Data JPA 的 Demo演示 "),s("a",{class:"header-anchor",href:"#spring-boot-和-spring-data-jpa-的-demo演示","aria-label":'Permalink to "Spring Boot 和 Spring Data JPA 的 Demo演示"'},"​")],-1),F=s("p",null,"我们利用 JPA + Spring Boot 简单做一个 RESTful API 接口，方便你来了解 Spring Data JPA 是干什么用的，具体步骤如下。",-1),A=s("p",null,[s("strong",null,"第一步：利用 IDEA 和 SpringBoot 2.3.3 快速创建一个案例项目。")],-1),g=s("p",null,'点击"菜单" | New Project 命令，选择 Spring Initializr 选项，如下图所示。',-1),D=p("",3),d=s("p",null,[s("strong",null,"第二步：通过 IDEA 的图形化界面，一路单击 Next 按钮，然后单击 Finsh 按钮，得到一个工程，完成后结构如下图所示：")],-1),C=p("",9),q=p("",5),m=p("",3),_=p("",8),h=s("p",null,"调整完毕之后，我们重启这个项目，以同样的方式测试上面的两个接口依然 OK。",-1),B=p("",7),S=s("p",null,"通过上图可以看到，测试的时候执行的 SQL 有哪些，那么我们到底是连接的 MySQL 做的测试用例，还是连接的 H2 做的测试呢？在后面的第 30 课时（单元测试和集成测试）的时候我会为你详细揭晓，到时你会发现测试用例写起来也是如此简单。",-1),P=s("h3",{id:"整体认识-jpa",tabindex:"-1"},[l("整体认识 JPA "),s("a",{class:"header-anchor",href:"#整体认识-jpa","aria-label":'Permalink to "整体认识 JPA"'},"​")],-1),b=s("p",null,"通过上面的两个例子我们已经快速入门了，知道了 Spring Boot 结合 Spring Data JPA 怎么配置和启动一个项目 ，之后当你熟悉了 JPA 之后，你还会发现 Spring Boot JPA 要比我们配置 MyBatis 简单很多。下面我们来整体认识一下 Java Persistence API 究竟是什么。",-1),T=s("p",null,"介绍 JPA 协议之前，我们先来对比了解下市面上的 ORM 框架有哪些，分别有哪些优缺点，做到心里有数。",-1),v=s("h4",{id:"_1-市场上-orm-框架比对",tabindex:"-1"},[l("1. 市场上 ORM 框架比对 "),s("a",{class:"header-anchor",href:"#_1-市场上-orm-框架比对","aria-label":'Permalink to "1. 市场上 ORM 框架比对"'},"​")],-1),k=s("p",null,"下表是市场上比较流行的 ORM 框架，这里我罗列了 MyBatis、Hibernate、Spring Data JPA 等，并对比了下它们的优缺点。",-1),f=p("",11),J=p("",11),j=p("",12),R=s("blockquote",null,[s("p",null,"并开启 annotation processing。")],-1),M=s("blockquote",null,[s("p",null,[l("点击下方链接查看源码（不定时更新）"),s("br"),s("a",{href:"https://github.com/zhangzhenhuajack/spring-boot-guide/tree/master/spring-data/spring-data-jpa",target:"_blank",rel:"noreferrer"},"https://github.com/zhangzhenhuajack/spring-boot-guide/tree/master/spring-data/spring-data-jpa")])],-1);function U(x,I,w,N,L,O){const a=e("Image");return t(),r("div",null,[E,y,i,u,F,A,g,n(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/4E/AE/Ciqc1F9fAriAOBKCAAG7xhrHi_E023.png"}),D,n(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/4E/AE/Ciqc1F9fAsKAbYHaAAMUVRZwyEY667.png"}),d,n(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/4E/BA/CgqCHl9fAsmAbD28AAR6C6uyIWs848.png"}),C,n(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/4E/AE/Ciqc1F9fAt2AKc-oAALnw7dehT4454.png"}),q,n(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/4E/AF/Ciqc1F9fAueAaffMAAEEcHlhpSo686.png"}),m,n(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/4E/AF/Ciqc1F9fAvaAJ7MtAANtS5uq_NY272.png"}),_,n(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/4E/BA/CgqCHl9fAyiAPQf3AADCrCOm25k666.png"}),h,n(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/4E/BA/CgqCHl9fAy2AL0EuAADDLkFVehk043.png"}),B,n(a,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/4E/BA/CgqCHl9fAzqAKH25AADMO537plI734.png"}),S,P,b,T,v,k,n(a,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/4E/B1/Ciqc1F9fBfeANrGuAAOa8Y2E5fU233.png"}),f,n(a,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/4E/AF/Ciqc1F9fA1uARUnvAAB2ZNS1UXc485.png"}),J,n(a,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image/M00/4E/BA/CgqCHl9fA2iAJZruAAEOKPj_-ZU042.png"}),j,n(a,{alt:"image (3).png",src:"https://s0.lgstatic.com/i/image/M00/4F/DD/CgqCHl9hfQKAEXs0AABb1DeHmt4598.png"}),R,n(a,{alt:"image (4).png",src:"https://s0.lgstatic.com/i/image/M00/4F/D2/Ciqc1F9hfQmAFGFzAACj394zaUc225.png"}),M])}const Q=o(c,[["render",U]]);export{V as __pageData,Q as default};
