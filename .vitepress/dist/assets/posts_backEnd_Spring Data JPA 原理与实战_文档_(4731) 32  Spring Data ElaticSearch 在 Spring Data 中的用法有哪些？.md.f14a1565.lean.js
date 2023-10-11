import{_ as o,D as e,o as t,g as c,J as p,h as a,Q as l,m as s}from"./chunks/framework.f67d7268.js";const V=JSON.parse('{"title":"32SpringDataElaticSearch在SpringData中的用法有哪些？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Data JPA 原理与实战_文档/(4731) 32  Spring Data ElaticSearch 在 Spring Data 中的用法有哪些？.md","filePath":"posts/backEnd/Spring Data JPA 原理与实战_文档/(4731) 32  Spring Data ElaticSearch 在 Spring Data 中的用法有哪些？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/Spring Data JPA 原理与实战_文档/(4731) 32  Spring Data ElaticSearch 在 Spring Data 中的用法有哪些？.md"},E=l("",12),y=l("",8),i=l("",22),F=s("p",null,"从中也可以看得出来，转化成 es 的 api 查询语法之后，发送的 post 请求又变成下图显示的样子。",-1),d=s("p",null,"日志比较长，你有兴趣的话，可以按照我的 DEMO 和开启日志的方法，自己去分析体会一下。",-1),g=s("p",null,"下面来说说 Spring Data ElasticSearch 中关键的几个类。",-1),u=s("h3",{id:"spring-data-elasticsearch-关键的类",tabindex:"-1"},[a("Spring Data ElasticSearch 关键的类 "),s("a",{class:"header-anchor",href:"#spring-data-elasticsearch-关键的类","aria-label":'Permalink to "Spring Data ElasticSearch 关键的类"'},"​")],-1),m=s("p",null,"通过上面的案例我们可以知道，Spring Data ElasticSearch 的用法其实非常简单，并且我们通过日志也可以看到，底层实现是基于 http 请求，来操作 Elasticsearch 的 server 中的 api 进行的。",-1),A=s("p",null,"那么我们简单看一下这一框架还给我们提供了哪些 ElasticSearch 的操作方法。和分析 Spring Data JPA 一样，看一下 Repository 的所有子类，如下图所示。",-1),h=s("p",null,"从图中可以看得出来，ElasticsearchRepository 是默认的 Repository 的实现类，我们如果继续往下面看源码的话，就可以看到里面进行了很多 ES 的 Http Client 操作。",-1),D=s("p",null,"同时再看一下 Structure 视图，如下所示。",-1),C=s("p",null,"从这张图可以知道，ElasticsearchRepository 默认给我们提供了 search 和 index 相关的一些操作方法，并且 Spring Data Common 里面的一些公共方法同样适用，这和我们刚才演示的 Defining Method Query 的 JPA 语法同样适用，可以大大减轻操作 ES 的难度，提高了开发的效率，甚至像我们没有演示到的分页、排序、limit 等同样适用。",-1),b=s("p",null,'所以你现在学到了一个"套路"：和 Spring Data JPA 用相同的思路，就可以很快掌握 Spring Data Elasticsearch 的基本用法，及其大概的实现思路。',-1),B=s("p",null,"那么很多时候同一个工程里面既有 JPA 又有 Elasticsearch，又该怎么写呢？",-1),k=s("h3",{id:"esrepository-和-jparepository-同时存在",tabindex:"-1"},[a("ESRepository 和 JPARepository 同时存在 "),s("a",{class:"header-anchor",href:"#esrepository-和-jparepository-同时存在","aria-label":'Permalink to "ESRepository 和 JPARepository 同时存在"'},"​")],-1),q=s("p",null,"这个时候应该怎么区分不同的 Repository 用什么呢？",-1),v=s("p",null,"我们假设刚才测试的样例里面，同时有关于 User 信息的 DB 操作，那么看一下我们的项目应该怎么写。",-1),f=s("p",null,[s("strong",null,"第一步：我们将对 Elasticsearch 的实体、Repository 和对 JPA 操作的实体、Repository 放到不同的文件里面"),a("，如下图所示。")],-1),_=l("",9),T=s("p",null,"那么现在我们知道了，JPA 和 Elasticsearch 同时存在，和启动项目是一样的效果，这里就不写 Controller 了。",-1),S=s("p",null,"我们再整体运行一下这三个测试用例，进行完整的测试，就可以看到如下结果。",-1),j=s("p",null,"1.ElasticSearchRepositoryTest 执行的时候，通过日志可以看到这是对 ES 进行的操作，如下图所示。",-1),R=s("p",null,"2.UserRepositoryTest 执行的时候，通过日志我们可以看出来这是对 DB 进行的操作，所以谁也不影响谁，如下图所示。",-1),x=l("",7);function w(P,L,J,U,I,N){const n=e("Image");return t(),c("div",null,[E,p(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image2/M01/04/56/CgpVE1_tdLyAY0UfAAH31rOGV0o472.png"}),a(),y,p(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image2/M01/04/55/Cip5yF_tdMaAbP03AAD7ix9soGU430.png"}),a(),i,p(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image2/M01/04/56/CgpVE1_tdNiAXq0WAAPx9WYUcvE585.png"}),a(),F,p(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image2/M01/04/55/Cip5yF_tdN6AQ3l9AAPPn8brHa8263.png"}),a(),d,g,u,m,A,p(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image2/M01/04/55/Cip5yF_tdOWAN1p8AAKW4zuYBgc483.png"}),a(),h,D,p(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image2/M01/04/57/CgpVE1_tdOyAa_qxAARM3eWQpnQ793.png"}),a(),C,b,B,k,q,v,f,p(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image2/M01/04/55/Cip5yF_tdPOAVRMHAACTufgK21A436.png"}),a(),_,p(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image2/M01/04/57/CgpVE1_tdQKAAa7zAABNF77hZ_A879.png"}),a(),T,S,j,p(n,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/8C/74/Ciqc1F_tdRWABN3HAASErifQeiw553.png"}),a(),R,p(n,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/8C/74/Ciqc1F_tdRyAe_oeAAMw4yV6H4o471.png"}),a(),x])}const O=o(r,[["render",w]]);export{V as __pageData,O as default};
