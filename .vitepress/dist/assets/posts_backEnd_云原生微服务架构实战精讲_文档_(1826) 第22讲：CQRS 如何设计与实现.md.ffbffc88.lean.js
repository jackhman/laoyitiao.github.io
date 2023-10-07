import{_ as o,j as c,o as t,g as e,k as l,h as n,s,Q as p}from"./chunks/framework.4e7d56ce.js";const v=JSON.parse('{"title":"第22讲：CQRS如何设计与实现","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/云原生微服务架构实战精讲_文档/(1826) 第22讲：CQRS 如何设计与实现.md","filePath":"posts/backEnd/云原生微服务架构实战精讲_文档/(1826) 第22讲：CQRS 如何设计与实现.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/云原生微服务架构实战精讲_文档/(1826) 第22讲：CQRS 如何设计与实现.md"},E=s("h1",{id:"第22讲-cqrs如何设计与实现",tabindex:"-1"},[n("第22讲：CQRS如何设计与实现 "),s("a",{class:"header-anchor",href:"#第22讲-cqrs如何设计与实现","aria-label":'Permalink to "第22讲：CQRS如何设计与实现"'},"​")],-1),y=s("p",null,"本课时和紧接着的第 23 课时将介绍 CQRS 技术相关的内容，本课时侧重讲解 CQRS 技术的基本概念，下一课时将重点讲解 CQRS 技术在示例应用中的使用。",-1),i=s("p",null,"CQRS 是命令和查询的职责分离（Command Query Responsibility Segregation）对应的英文名称的首字母缩写。CQRS 中的命令指的是对数据的更新操作，而查询指的是对数据的读取操作，命令和查询的职责分离指的是用不同的模型来分别进行更新和读取操作。CQRS 与我们通常使用的更新和读取数据的方式并不相同。",-1),u=s("p",null,[n("我们通常对数据的操作方式是典型的 CRUD 操作，分别表示对记录的创建（Create）、读取（Read）、更新（Update）和删除（Delete）。在有些时候，还会加上一个列表（List）操作来读取满足条件的多个记录，组成 "),s("strong",null,"LCRUD 操作"),n("，CRUD 操作使用的是同一个模型。在面向对象的设计中，通常使用领域对象类来作为模型的描述，在进行持久化时，领域对象的实例被映射成关系型数据库中的表中的记录，或是 NoSQL 数据库中的文档等。这样的实现方式，相信很多开发人员都不陌生，也是开发中经常会用到的模式。很多开发框架都提供了对这种模式的支持，Spring Data 中的 CrudRepository 接口就提供了对 LCRUD 操作的基本抽象。")],-1),F=s("p",null,"下图是单一模型的使用示意图，其中的模型在数据存储时使用，而展示模型则提供给客户端使用。更新和读取操作需要在这两个模型之间进行转换。",-1),m=p("",13),d=p("",18);function A(C,g,B,D,h,f){const a=c("Image");return t(),e("div",null,[E,y,i,u,F,l(a,{alt:"single-model.png",src:"https://s0.lgstatic.com/i/image/M00/14/79/CgqCHl7Q2pCAam8vAABVGfpuv5o662.png"}),n(),m,l(a,{alt:"cqrs-model.png",src:"https://s0.lgstatic.com/i/image/M00/14/79/CgqCHl7Q2qaAEoWfAAB3LquwH2k023.png"}),n(),d])}const I=o(r,[["render",A]]);export{v as __pageData,I as default};
