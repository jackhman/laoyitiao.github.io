import{_ as o,j as e,o as t,g as r,k as n,h as p,Q as l,s}from"./chunks/framework.4e7d56ce.js";const S=JSON.parse('{"title":"05@Query解决了什么问题？什么时候应该选择它？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Data JPA 原理与实战_文档/(4705) 05  @Query 解决了什么问题？什么时候应该选择它？.md","filePath":"posts/backEnd/Spring Data JPA 原理与实战_文档/(4705) 05  @Query 解决了什么问题？什么时候应该选择它？.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/Spring Data JPA 原理与实战_文档/(4705) 05  @Query 解决了什么问题？什么时候应该选择它？.md"},y=l("",13),E=s("p",null,"再运行上面的测试用例，这时候在这里设置一个断点，可以看到默认的策略是CreateIfNotFound，也就是如果有@Query注解，那么以@Query的注解内容为准，可以忽略方法名。",-1),i=s("p",null,"我们继续往后面看，进入到 lookupStrategy.resolveQuery 里面，如下所示：",-1),u=s("p",null,"通过上图的断点和红框之处，我们也发现了，Spring Data JPA 这个地方使用了策略、模式，当我们自己写策略模式的时候也可以进行参考。",-1),F=s("p",null,"那么接着往下 debug，进入到 resolveQuery 方法里面，如下图所示：",-1),d=s("p",null,"我们可以看到图中 ①处，如果 Query 注解找到了，就不会走到 ② 处了（即我们第 03 课时中讲的 Defined Query Method 语法）。",-1),m=s("p",null,"这时我们点开 Query 里面的 Query 属性的值看一下，你会发现这里同时生成了两个 SQL：一个是查询总数的 Query 定义，另一个是查询结果 Query 定义。",-1),g=s("p",null,"到这里我们已经基本明白了，如果想看看 Query 具体是怎么生成的、上面的 @Param 注解是怎么生效的，可以在上面的图 ① 处 debug 继续往里面看，如下所示：",-1),A=l("",70),D=l("",31),C=s("p",null,[s("strong",null,"通过 JPQL 动态参数查询 RoomRecord，如下图：")],-1),h=l("",6);function q(B,v,b,f,_,k){const a=e("Image");return t(),r("div",null,[y,n(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/56/57/CgqCHl9rKUmAaHv0AAHfhSZLnCM314.png"}),p(),E,i,n(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/56/4C/Ciqc1F9rKU-AKQ5bAAWmeacWTAQ768.png"}),p(),u,F,n(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/56/4C/Ciqc1F9rKVaARZk-AAYrhMro5y4100.png"}),p(),d,m,g,n(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/56/4C/Ciqc1F9rKV2AMpasAAE0Zjc3fRw672.png"}),p(),A,n(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/56/57/CgqCHl9rKZeAHUEyAAGh83E9Xs4928.png"}),p(),D,n(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/56/57/CgqCHl9rKauAfQmmAAHMquqHBVg909.png"}),p(),C,n(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/56/4C/Ciqc1F9rKbGAT_6FAAL_YUkV6AQ306.png"}),p(),h])}const R=o(c,[["render",q]]);export{S as __pageData,R as default};
