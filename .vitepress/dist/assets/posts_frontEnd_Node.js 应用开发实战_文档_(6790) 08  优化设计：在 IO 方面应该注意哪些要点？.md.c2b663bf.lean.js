import{_ as o,j as e,o as t,g as c,k as l,h as a,Q as p,s}from"./chunks/framework.4e7d56ce.js";const q=JSON.parse('{"title":"08优化设计：在IO方面应该注意哪些要点？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Node.js 应用开发实战_文档/(6790) 08  优化设计：在 IO 方面应该注意哪些要点？.md","filePath":"posts/frontEnd/Node.js 应用开发实战_文档/(6790) 08  优化设计：在 IO 方面应该注意哪些要点？.md","lastUpdated":1696417798000}'),r={name:"posts/frontEnd/Node.js 应用开发实战_文档/(6790) 08  优化设计：在 IO 方面应该注意哪些要点？.md"},i=p("",35),y=p("",7),h=s("p",null,"图 2 _flush 代码实现逻辑",-1),g=s("p",null,[a("这块代码最主要就是判断"),s("strong",null,"是否开启了缓存以及当前文件流是否超出了最大缓存"),a("，如果这两个条件任意一个满足，则直接写日志，不经过临时缓存。")],-1),d=s("p",null,"_intervalWrite 的代码实现逻辑如图 3 所示：",-1),E=p("",24),_=p("",9),u=s("p",null,"在图 5 中我们访问 API 服务，在 API 中判断获取的数据是否有缓存，有缓存则直接从共享内存服务中读取，如果没有则先前往 MySQL 获取具体的数据，返回到 API 服务以后，再设置共享内存，这样下次用户来访问该数据时，就有相应的数据了。从而实现了高性能网络 I/O 替换低性能网络 I/O 的方案。",-1),A=s("p",null,"共享内存适合那些可以延迟更新的数据服务，并且与用户维度无关，每个用户（或者有限用户分类）拉取的内容都是一致的。如果每个用户内容不一致，会导致缓存命中较低，同时浪费大量的内存空间。",-1),m=s("h4",{id:"异步队列",tabindex:"-1"},[a("异步队列 "),s("a",{class:"header-anchor",href:"#异步队列","aria-label":'Permalink to "异步队列"'},"​")],-1),I=s("p",null,[a("举一个用户抢票的例子，如果每个用户抢票，我们都执行一次查询并且购票，那么对于目标机器则压力非常大，特别像 12306 这种几亿人同时抢的情况，那么这里就可以采用异步队列的方式，也就是用户发送请求后只告知用户，你已经进入队列，但是真正情况是"),s("strong",null,"用户的请求会缓存在一个队列中"),a("，再一个个前往具体的网络 I/O 服务中，独立去处理，这时候并发压力就可控，因此也不会出现性能问题。")],-1),O=s("p",null,"具体方案如图 6 所示：",-1),D=p("",9),C=s("p",null,[a("]("),s("a",{href:"https://shenceyun.lagou.com/t/mka",target:"_blank",rel:"noreferrer"},"https://shenceyun.lagou.com/t/mka"),a(")")],-1),b=s("p",null,[s("strong",null,"《大前端高薪训练营》")],-1),v=s("p",null,[a("对标阿里 P7 技术需求 + 每月大厂内推，6 个月助你斩获名企高薪 Offer。"),s("a",{href:"https://shenceyun.lagou.com/t/mka",target:"_blank",rel:"noreferrer"},"点击链接"),a("，快来领取！")],-1);function F(k,f,x,P,S,T){const n=e("Image");return t(),c("div",null,[i,l(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M00/27/7A/Cgp9HWBccvaAVgUCAAAwlAOAoRg862.png"}),a(),y,l(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/27/77/CioPOWBccwWAbxV9AAIgXwovZRI835.png"}),a(),h,g,d,l(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M00/27/7A/Cgp9HWBccw6AN65NAAGA3qjte14745.png"}),a(),E,l(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M00/27/77/CioPOWBccx2AJxvJAAFS6_8BrgA672.png"}),a(),_,l(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M00/27/77/CioPOWBcczWAdNqNAABJ2ImrHUY990.png"}),a(),u,A,m,I,O,l(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M01/27/77/CioPOWBcc0OAc-o2AABrosw8lrA094.png"}),a(),D,l(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M00/12/FA/CioPOWBBrAKAAod-AASyC72ZqWw233.png"}),a(),C,b,v])}const N=o(r,[["render",F]]);export{q as __pageData,N as default};
