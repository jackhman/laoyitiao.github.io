import{_ as l,j as t,o as e,g as r,k as n,h as o,s,Q as p}from"./chunks/framework.4e7d56ce.js";const v=JSON.parse('{"title":"组件测试简介 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/043_微服务质量保障 20 讲/(4227) 06  组件测试：如何保证单服务的质量？.md","filePath":"posts/devops/043_微服务质量保障 20 讲/(4227) 06  组件测试：如何保证单服务的质量？.md","lastUpdated":1696417798000}'),c={name:"posts/devops/043_微服务质量保障 20 讲/(4227) 06  组件测试：如何保证单服务的质量？.md"},y=s("p",null,"到目前为止，我讲解了微服务架构下的单元测试，它的目的是验证软件代码中的每个单元（方法或类等）是否符合预期；也讲解了微服务架构下的集成测试，它验证微服务是否可以与外部服务或数据存储等基础设施服务进行交互；今天来讲解下保障单个微服务的质量的测试方法------组件测试。",-1),E=s("h3",{id:"组件测试简介",tabindex:"-1"},[o("组件测试简介 "),s("a",{class:"header-anchor",href:"#组件测试简介","aria-label":'Permalink to "组件测试简介"'},"​")],-1),i=s("p",null,[s("strong",null,[o("组件（Component）"),s("strong",null,"通常指大型系统中任何封装良好、连贯且可独立替换的中间子系统，在微服务架构中，一般代表单个微服务，因而"),o("组件测试（Component Testing）就是对单个服务的测试。")])],-1),u=s("p",null,"在一个典型的微服务应用程序中，会有许多微服务，且它们之间存在相互调用关系。因此，要想高效地对单个微服务进行测试，需要将其依赖的其他微服务和数据存储模块进行模拟（mock）。",-1),F=s("p",null,"比如，使用测试替身（Test Double）工具隔离掉单个微服务依赖的其他微服务和数据存储，避免测试过程中受到依赖服务或数据存储模块的各类影响（如服务不可用、服务缺陷、数据库连接断开等）而出现阻塞测试过程、测试无效等情况。",-1),q=p("",6),C=p("",9),d=p("",6),h=p("",5),g=p("",18),_=p("",10);function m(B,T,b,D,A,f){const a=t("Image");return e(),r("div",null,[y,E,i,u,F,n(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/3D/0B/CgqCHl8pBgqANMbHAABddoBq1dc448.png"}),q,n(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/3D/0B/CgqCHl8pBhmAIvbCAAYUsJRZIuE903.png"}),o(),C,n(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/3D/0C/CgqCHl8pBlWAB4TKAAaCogpYuQQ495.png"}),o(),d,n(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/3D/0C/CgqCHl8pBmaAcHr_AADb2quOzVs534.png"}),h,n(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/3D/01/Ciqc1F8pBomAKzePAAI6xPBo8Uo976.png"}),g,n(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/3D/0C/CgqCHl8pByGARk8eAAgwMHVWdTI199.png"}),o(),_])}const S=l(c,[["render",m]]);export{v as __pageData,S as default};
