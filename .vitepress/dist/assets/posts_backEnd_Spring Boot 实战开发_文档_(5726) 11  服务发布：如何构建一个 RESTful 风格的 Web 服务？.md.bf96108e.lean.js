import{_ as o,j as e,o as c,g as t,k as p,h as n,s,Q as l}from"./chunks/framework.e0c66c3f.js";const f=JSON.parse('{"title":"SpringCSS 系统中的服务交互 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Boot 实战开发_文档/(5726) 11  服务发布：如何构建一个 RESTful 风格的 Web 服务？.md","filePath":"posts/backEnd/Spring Boot 实战开发_文档/(5726) 11  服务发布：如何构建一个 RESTful 风格的 Web 服务？.md","lastUpdated":1696338709000}'),r={name:"posts/backEnd/Spring Boot 实战开发_文档/(5726) 11  服务发布：如何构建一个 RESTful 风格的 Web 服务？.md"},E=s("p",null,"通过前面课程的学习，我们已经掌握了构建一个 Spring Boot 应用程序的数据访问层组件实现方法。接下来的几讲，我们将讨论另一层组件，即 Web 服务层的构建方式。",-1),y=s("p",null,"服务与服务之间的交互是系统设计和发展的必然需求，其涉及 Web 服务的发布及消费，今天我们先讨论如何在 Spring Boot 应用程序中发布 Web 服务。",-1),i=s("h3",{id:"springcss-系统中的服务交互",tabindex:"-1"},[n("SpringCSS 系统中的服务交互 "),s("a",{class:"header-anchor",href:"#springcss-系统中的服务交互","aria-label":'Permalink to "SpringCSS 系统中的服务交互"'},"​")],-1),u=s("p",null,"在具体的技术体系介绍之前，我们先来梳理 SpringCSS 案例中服务交互之间的应用场景。",-1),d=s("p",null,"对于客服系统而言，其核心业务流程是生成客服工单，而工单的生成通常需要使用用户账户信息和所关联的订单信息。",-1),F=s("p",null,"在 SpringCSS 案例中，前面几讲我们已经构建了一个用于管理订单的 order-service，接下来我们将分别构建管理用户账户的 account-service 及核心的客服服务 customer-service。",-1),A=s("p",null,"关于三个服务之间的交互方式，我们先通过一张图了解下，如下图所示：",-1),g=l("",12),C=l("",40),q=s("p",null,"使用 Postman 输入 JSON 字符串发起 HTTP 请求示例图",-1),v=s("p",null,"通过以上内容的讲解，我们发现使用注解的操作很简单，接下来我们有必要探讨下控制请求输入的规则。",-1),D=s("p",null,[s("strong",null,"关于控制请求输入的规则，关键在于按照 RESTful 风格的设计原则设计 HTTP 端点，对于这点业界也存在一些约定。")],-1),B=s("ul",null,[s("li",null,[s("p",null,'以 Account 这个领域实体为例，如果我们把它视为一种资源，那么 HTTP 端点的根节点命名上通常采用复数形式，即"/accounts"，正如前面的示例代码所示。')]),s("li",null,[s("p",null,"在设计 RESTful API 时，我们需要基于 HTTP 语义设计对外暴露的端点的详细路径。针对常见的 CRUD 操作，我们展示了 RESTful API 与非 RESTful API 的一些区别。")])],-1),m=l("",13);function h(b,T,S,R,_,M){const a=e("Image");return c(),t("div",null,[E,y,i,u,d,F,A,p(a,{alt:"图片6 (1).png",src:"https://s0.lgstatic.com/i/image2/M01/03/C1/CgpVE1_hv2uAGbTPAABvOdgwGhs113.png"}),n(),g,p(a,{alt:"图片1 (2).png",src:"https://s0.lgstatic.com/i/image2/M01/03/C0/Cip5yF_hv3eAbVtLAAGhaTfDT5s664.png"}),n(),C,p(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image2/M01/01/5C/Cip5yF_YgIGACIM7AAAr5-G8i7M764.png"}),n(),q,v,D,B,p(a,{alt:"图片3 (1).png",src:"https://s0.lgstatic.com/i/image/M00/8B/E8/CgqCHl_hv5yAPnDHAADI8geMxRU064.png"}),n(),m])}const O=o(r,[["render",h]]);export{f as __pageData,O as default};
