import{_ as o,j as n,o as i,g as h,k as t,Q as r,s as a,h as s}from"./chunks/framework.e0c66c3f.js";const x=JSON.parse('{"title":"分库分表的背景 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/分布式技术原理与实战45讲_文档/(1922) 第21讲：为什么需要分库分表，如何实现？.md","filePath":"posts/backEnd/分布式技术原理与实战45讲_文档/(1922) 第21讲：为什么需要分库分表，如何实现？.md","lastUpdated":1696338709000}'),p={name:"posts/backEnd/分布式技术原理与实战45讲_文档/(1922) 第21讲：为什么需要分库分表，如何实现？.md"},_=r("",18),l=a("p",null,"垂直分库针对的是一个系统中对不同的业务进行拆分，根据业务维度进行数据的分离，剥离为多个数据库。比如电商网站早期，商品数据、会员数据、订单数据都是集中在一个数据库中，随着业务的发展，单库处理能力已成为瓶颈，这个时候就需要进行相关的优化，进行业务维度的拆分，分离出会员数据库、商品数据库和订单数据库等。",-1),c=a("p",null,"垂直分表是针对业务上的字段比较多的大表进行的，一般是把业务宽表中比较独立的字段，或者不常用的字段拆分到单独的数据表中。比如早期的商品表中，可能包含了商品信息、价格、库存等，可以拆分出来价格扩展表、库存扩展表等。",-1),d=a("h4",{id:"水平切分",tabindex:"-1"},[s("水平切分 "),a("a",{class:"header-anchor",href:"#水平切分","aria-label":'Permalink to "水平切分"'},"​")],-1),u=a("p",null,"水平拆分是把相同的表结构分散到不同的数据库和不同的数据表中，避免访问集中的单个数据库或者单张数据表，具体的分库和分表规则，一般是通过业务主键，进行哈希取模操作。",-1),g=a("p",null,"例如，电商业务中的订单信息访问频繁，可以将订单表分散到多个数据库中，实现分库；在每个数据库中，继续进行拆分到多个数据表中，实现分表。路由策略可以使用订单 ID 或者用户 ID，进行取模运算，路由到不同的数据库和数据表中。",-1),b=r("",16);function m(S,q,f,T,k,D){const e=n("Image");return i(),h("div",null,[_,t(e,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/20/92/Ciqc1F7onEiAcwueAAGIv7uY_54711.png"}),l,c,d,u,g,t(e,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/20/92/Ciqc1F7onFiABcGeAACJyCWVUhI117.png"}),b])}const A=o(p,[["render",m]]);export{x as __pageData,A as default};
