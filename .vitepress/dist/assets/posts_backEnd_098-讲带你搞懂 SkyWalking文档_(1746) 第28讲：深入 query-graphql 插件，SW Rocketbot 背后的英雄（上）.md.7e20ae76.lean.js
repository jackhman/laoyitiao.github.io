import{_ as e,j as o,o as t,h as r,k as l,f as a,Q as p,s}from"./chunks/framework.d3daa342.js";const w=JSON.parse('{"title":"第28讲：深入query-graphql插件，SWRocketbot背后的英雄（上）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1746) 第28讲：深入 query-graphql 插件，SW Rocketbot 背后的英雄（上）.md","filePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1746) 第28讲：深入 query-graphql 插件，SW Rocketbot 背后的英雄（上）.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1746) 第28讲：深入 query-graphql 插件，SW Rocketbot 背后的英雄（上）.md"},y=p("",9),E=p("",5),i=s("h3",{id:"graphql-schema-鸟瞰",tabindex:"-1"},[a("GraphQL Schema 鸟瞰 "),s("a",{class:"header-anchor",href:"#graphql-schema-鸟瞰","aria-label":'Permalink to "GraphQL Schema 鸟瞰"'},"​")],-1),u=s("p",null,"在 resouces/query-protocol 目录中包含了 query-graphql-plugin 插件的全部 GraphQL Schema 文件，其结构如下图所示，该结构图是通过 GraphQL Voyager 工具生成的，如果你感兴趣可以查找相关资料进行了解。",-1),d=s("p",null,"在学习了前面介绍的 GraphQL Schema 基本语法和示例之后，相信你已经完全能够读懂上图涉及的全部 GraphQL Schema 定义，这里就不再一一展开分析，我们将重点放在关联的 Resolver 以及具体的查询实现上。",-1),g=s("h3",{id:"metadataquery",tabindex:"-1"},[a("MetadataQuery "),s("a",{class:"header-anchor",href:"#metadataquery","aria-label":'Permalink to "MetadataQuery"'},"​")],-1),h=s("p",null,"query-graphql-plugin 插件中提供了三个查询 Service 的方法，如下图所示：",-1),F=s("p",null,"GraphQL Java Tools 会将上述三个查询 Service 的方法映射到 MetadataQuery 中的同名方法，如下图所示，MetadataQuery 会将请求委托给 MetadataQueryService 的同名方法处理，而 MetadataQueryService 中也没有其他逻辑，直接将请求委托给 MetadataQueryEsDAO 的同名方法：",-1),A=p("",4),B=p("",11),m=s("ul",null,[s("li",null,[s("p",null,"getValues() 方法：返回一个聚合后的单值，例如，一个 Service 在一段时间内 SLA 的平均值。")]),s("li",null,[s("p",null,"getLinearIntValues() 方法：返回一条时序数据（即每个时间单位一个点，这些连续的点可以组成一张二维的监控图）。")]),s("li",null,[s("p",null,"getThermodynamic() 方法：返回的 heatmap（热力图）。")])],-1),v=s("h4",{id:"查询单个聚合值",tabindex:"-1"},[a("查询单个聚合值 "),s("a",{class:"header-anchor",href:"#查询单个聚合值","aria-label":'Permalink to "查询单个聚合值"'},"​")],-1),C=s("p",null,"首先来看 MetricQuery.getValues() 方法，请求该方法的位置是在 SkyWalking Rocketbot 的拓扑图中，如下图所示：",-1),S=p("",18),D=p("",4),_=p("",3),Q=s("p",null,"3、将步骤 2 的查询结果整理成 IntValues（底层是 KVInt 列表），相关代码实现比较简单，不再展示。示例中的整理结果如下图所示，其中每个 KVInt 的 Key 为 Document Id，Value 为相应的 summation 值：",-1),b=s("p",null,"前端拿到上述 KVInt 列表之后，即可绘制出示例中的 Service Response Time 监控图。",-1),q=s("h4",{id:"查询-heatmap",tabindex:"-1"},[a("查询 heatmap "),s("a",{class:"header-anchor",href:"#查询-heatmap","aria-label":'Permalink to "查询 heatmap"'},"​")],-1),I=s("p",null,"MetricQuery 中最后一个查询方法是 getThermodynamic() 方法，该方法用于查询热力图，具体查询方式与 getLinearIntValues() 方法类似，这里不再展开分析。",-1);function k(T,L,R,P,V,x){const n=o("Image");return t(),r("div",null,[y,l(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/26/44/CgqCHl7xt6yAHDDLAAIeqgBo9HE860.png"}),a(),E,l(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/26/38/Ciqc1F7xt76AflHaAANfIPXqD0Q765.png"}),a(),i,u,l(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/26/39/Ciqc1F7xt8uAa-I6AAjKWi_tgPI783.png"}),a(),d,g,h,l(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/26/39/Ciqc1F7xt9WABcbdAAI-KmsR4xQ745.png"}),a(),F,l(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/26/44/CgqCHl7xt92AR6MbAAT0t4jgEsA600.png"}),a(),A,l(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/26/39/Ciqc1F7xt-uAYJIjAANCIMBQIGg737.png"}),a(),B,l(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/26/44/CgqCHl7xuAKAGJpGAAEsPKwo6_0843.png"}),a(),m,v,C,l(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/26/39/Ciqc1F7xuA2AZu34AAD4-d0xhHI072.png"}),a(),S,l(n,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/26/3A/Ciqc1F7xuIyAZc4MAABhTIGGqHg410.png"}),a(),D,l(n,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/26/45/CgqCHl7xuJmAapVFAAC9IVj0ets069.png"}),a(),_,l(n,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image/M00/26/3A/Ciqc1F7xuKiAfaUbAAr-NQ2X_L4640.png"}),a(),Q,l(n,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image/M00/26/45/CgqCHl7xuLKAFb6VAAwzofyYQew138.png"}),a(),b,q,I])}const f=e(c,[["render",k]]);export{w as __pageData,f as default};
