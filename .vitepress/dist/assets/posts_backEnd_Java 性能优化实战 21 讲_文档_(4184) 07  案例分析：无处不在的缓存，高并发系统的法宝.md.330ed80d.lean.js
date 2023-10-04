import{_ as o,j as e,o as t,g as r,k as a,s as n,h as l,Q as p}from"./chunks/framework.e0c66c3f.js";const S=JSON.parse('{"title":"Guava 的 LoadingCache ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Java 性能优化实战 21 讲_文档/(4184) 07  案例分析：无处不在的缓存，高并发系统的法宝.md","filePath":"posts/backEnd/Java 性能优化实战 21 讲_文档/(4184) 07  案例分析：无处不在的缓存，高并发系统的法宝.md","lastUpdated":1696338709000}'),c={name:"posts/backEnd/Java 性能优化实战 21 讲_文档/(4184) 07  案例分析：无处不在的缓存，高并发系统的法宝.md"},E=n("p",null,'在上一课时，我们介绍了"缓冲"，这一课时我将介绍"缓冲"的孪生兄弟"缓存"。',-1),i=n("p",null,"和缓冲类似，缓存可能是软件中使用最多的优化技术了，比如：在最核心的 CPU 中，就存在着多级缓存；为了消除内存和存储之间的差异，各种类似 Redis 的缓存框架更是层出不穷。",-1),y=n("p",null,"缓存的优化效果是非常好的，它既可以让原本载入非常缓慢的页面，瞬间秒开，也能让本是压力山大的数据库，瞬间清闲下来。",-1),g=n("p",null,[n("strong",null,"缓存"),l(" ，"),n("strong",null,"本质"),l("上是为了协调两个速度差异非常大的组件，如下图所示，通过加入一个中间层，将常用的数据存放在相对高速的设备中。")],-1),d=p("",9),h=p("",8),u=p("",33),_=p("",5),F=p("",18),C=p("",11);function A(v,D,b,k,m,L){const s=e("Image");return t(),r("div",null,[E,i,y,g,a(s,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/3C/6B/CgqCHl8nuCKAad7oAAAk6v90xvo900.png"}),d,a(s,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/3C/60/Ciqc1F8nuDmAJcstAABnG73x05M360.png"}),h,a(s,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/3C/6C/CgqCHl8nuFGACX8vAABYHt8o1wc201.png"}),u,a(s,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/3C/6C/CgqCHl8nuJeAQCW4AABgBDKI74g880.png"}),_,a(s,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/3C/61/Ciqc1F8nuKqAJaGZAAF4FboRD9E367.png"}),F,a(s,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/3C/6C/CgqCHl8nuQWAKsjIAAG1hzHS76Q255.png"}),C])}const T=o(c,[["render",A]]);export{S as __pageData,T as default};
