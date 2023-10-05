import{_ as p,j as e,o as t,g as c,k as o,s,h as n,Q as l}from"./chunks/framework.4e7d56ce.js";const U=JSON.parse('{"title":"工厂方法模式 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/深入剖析 MyBatis 核心原理_文档/(6378) 07  深入数据源和事务，把握持久化框架的两个关键命脉.md","filePath":"posts/backEnd/深入剖析 MyBatis 核心原理_文档/(6378) 07  深入数据源和事务，把握持久化框架的两个关键命脉.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/深入剖析 MyBatis 核心原理_文档/(6378) 07  深入数据源和事务，把握持久化框架的两个关键命脉.md"},E=s("p",null,"数据源是持久层框架中最核心的组件之一，在实际工作中比较常见的数据源有 C3P0、Apache Common DBCP、Proxool 等。作为一款成熟的持久化框架，MyBatis 不仅自己提供了一套数据源实现，而且还能够方便地集成第三方数据源。",-1),y=s("p",null,[s("strong",null,"javax.sql.DataSource 是 Java 语言中用来抽象数据源的接口"),n("，其中定义了所有数据源实现的公共行为，MyBatis 自身提供的数据源实现也要实现该接口。MyBatis 提供了两种类型的数据源实现，分别是 PooledDataSource 和 UnpooledDataSource，继承关系如下图所示：")],-1),i=s("p",null,"针对不同的 DataSource 实现，MyBatis 提供了不同的工厂实现来进行创建，如下图所示，这是工厂方法模式的一个典型应用场景。",-1),d=s("p",null,[s("strong",null,"编写一个设计合理、性能优秀的数据源只是第一步"),n(" ，在通过数据源拿到数据库连接之后，还需要开启事务，才能进行数据的修改。MyBatis 对数据库事务进行了一层抽象，也就是我们这一讲后面要介绍的 Transaction 接口，它可以"),s("strong",null,"管理事务的开启、提交和回滚"),n("。")],-1),C=s("h3",{id:"工厂方法模式",tabindex:"-1"},[n("工厂方法模式 "),s("a",{class:"header-anchor",href:"#工厂方法模式","aria-label":'Permalink to "工厂方法模式"'},"​")],-1),u=s("p",null,"工厂方法模式中定义了 Factory 这个工厂接口，如下图所示，其中定义了 createProduct() 方法创建右侧继承树中的对象，不同的工厂接口实现类会创建右侧继承树中不同 Product 实现类（例如 ProductImpl 1 和 ProductImpl 2）。",-1),F=l("",4),D=s("h3",{id:"数据源工厂",tabindex:"-1"},[n("数据源工厂 "),s("a",{class:"header-anchor",href:"#数据源工厂","aria-label":'Permalink to "数据源工厂"'},"​")],-1),g=s("p",null,[n("了解了工厂方法模式的基础知识之后，下面我们回到 MyBatis 的数据源实现上来。"),s("strong",null,"MyBatis 的数据源模块也是用到了工厂方法模式，如果需要扩展新的数据源实现时，只需要添加对应的 Factory 实现类，新的数据源就可以被 MyBatis 使用。")],-1),m=s("p",null,"DataSourceFactory 接口就扮演了 MyBatis 数据源实现中的 Factory 接口角色。UnpooledDataSourceFactory 和 PooledDataSourceFactory 实现了 DataSourceFactory 接口，也就是 Factory 接口实现类的角色。三者的继承关系如下图所示：",-1),A=l("",61),h=l("",13),v={href:"https://shenceyun.lagou.com/t/Mka",target:"_blank",rel:"noreferrer"},P=s("p",null,[s("strong",null,"《Java 工程师高薪训练营》")],-1),B=s("p",null,[n("实战训练+面试模拟+大厂内推，想要提升技术能力，进大厂拿高薪，"),s("a",{href:"https://shenceyun.lagou.com/t/Mka",target:"_blank",rel:"noreferrer"},"点击链接，提升自己"),n("！")],-1);function T(S,_,b,k,M,f){const a=e("Image");return t(),c("div",null,[E,y,o(a,{alt:"1.png",src:"https://s0.lgstatic.com/i/image6/M01/04/55/Cgp9HWApSnyAeZddAADG9kv9Y-c887.png"}),i,o(a,{alt:"2.png",src:"https://s0.lgstatic.com/i/image6/M01/04/52/CioPOWApSomAM5hXAADlDsSaiAY054.png"}),d,C,u,o(a,{alt:"3.png",src:"https://s0.lgstatic.com/i/image6/M01/04/52/CioPOWApSqKAQyYyAAD_0kpOQec437.png"}),F,o(a,{alt:"4.png",src:"https://s0.lgstatic.com/i/image6/M01/04/52/CioPOWApStaAS637AAWJE74aTp4947.png"}),D,g,m,o(a,{alt:"5.png",src:"https://s0.lgstatic.com/i/image6/M01/04/55/Cgp9HWApSreAMsSEAADxE9_08B0637.png"}),A,o(a,{alt:"6.png",src:"https://s0.lgstatic.com/i/image6/M01/04/52/CioPOWApSyGAb7OzAAFWzMbS1T8710.png"}),h,s("p",null,[s("a",v,[o(a,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/6D/3E/CgqCHl-s60-AC0B_AAhXSgFweBY762.png"})])]),P,B])}const w=p(r,[["render",T]]);export{U as __pageData,w as default};
