import{_,j as i,o as l,g as p,k as s,h as a,s as e,Q as d}from"./chunks/framework.4e7d56ce.js";const x=JSON.parse('{"title":"第34讲：如何为海量计数场景设计缓存体系？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/300分钟吃透分布式缓存_文档/(214) 第34讲：如何为海量计数场景设计缓存体系？.md","filePath":"posts/backEnd/300分钟吃透分布式缓存_文档/(214) 第34讲：如何为海量计数场景设计缓存体系？.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/300分钟吃透分布式缓存_文档/(214) 第34讲：如何为海量计数场景设计缓存体系？.md"},o=e("h1",{id:"第34讲-如何为海量计数场景设计缓存体系",tabindex:"-1"},[a("第34讲：如何为海量计数场景设计缓存体系？ "),e("a",{class:"header-anchor",href:"#第34讲-如何为海量计数场景设计缓存体系","aria-label":'Permalink to "第34讲：如何为海量计数场景设计缓存体系？"'},"​")],-1),c=e("p",null,"在上一课时我们讲解了如何为秒杀系统进行缓存设计，在本课时我们将具体讲解如何为海量计数场景设计缓存服务。",-1),n=e("h2",{id:"计数常规方案",tabindex:"-1"},[a("计数常规方案 "),e("a",{class:"header-anchor",href:"#计数常规方案","aria-label":'Permalink to "计数常规方案"'},"​")],-1),b=e("p",null,"计数服务在互联网系统中非常常见，用户的关注粉丝数、帖子数、评论数等都需要进行计数存储。计数的存储格式也很简单，key 一般是用户 uid 或者帖子 id 加上后缀，value 一般是 8 字节的 long 型整数。",-1),h=e("br",null,null,-1),T=e("p",null,"最常见的计数方案是采用缓存 + DB 的存储方案。当计数变更时，先变更计数 DB，计数加 1，然后再变更计数缓存，修改计数存储的 Memcached 或 Redis。这种方案比较通用且成熟，但在高并发访问场景，支持不够友好。在互联网社交系统中，有些业务的计数变更特别频繁，比如微博 feed 的阅读数，计数的变更次数和访问次数相当，每秒十万到百万级以上的更新量，如果用 DB 存储，会给 DB 带来巨大的压力，DB 就会成为整个计数服务的瓶颈所在。即便采用聚合延迟更新 DB 的方案，由于总量特别大，同时请求均衡分散在大量不同的业务端，巨大的写压力仍然是 DB 的不可承受之重。因此这种方案只适合中小规模的计数服务使用。",-1),k=d("",16),m=d("",16),y=d("",15);function D(u,B,A,g,f,S){const t=i("Image");return l(),p("div",null,[o,c,n,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5B/79/CgpOIF4EfGeAMy7uAACOifnCjYI046.png"}),a(),b,h,T,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5B/7A/Cgq2xl4EfKKATQvhAAB_y6G_3Y0242.png"}),a(),k,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5B/7A/Cgq2xl4EfNaAVYSOAACwXN0Zx5E804.png"}),a(),m,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5B/7A/CgpOIF4EfUeALwp6AACe1xvi1Sc311.png"}),a(),y])}const v=_(r,[["render",D]]);export{x as __pageData,v as default};
