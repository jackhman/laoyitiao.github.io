import{_ as e,j as l,o as p,h as o,k as t,f as a,s,Q as i}from"./chunks/framework.d3daa342.js";const A=JSON.parse('{"title":"第11讲：如何使用Redi快速实现分布式锁？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/分布式技术原理与实战45讲_文档/(1910) 第11讲：如何使用 Redi 快速实现分布式锁？.md","filePath":"posts/backEnd/分布式技术原理与实战45讲_文档/(1910) 第11讲：如何使用 Redi 快速实现分布式锁？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/分布式技术原理与实战45讲_文档/(1910) 第11讲：如何使用 Redi 快速实现分布式锁？.md"},c=s("h1",{id:"第11讲-如何使用redi快速实现分布式锁",tabindex:"-1"},[a("第11讲：如何使用Redi快速实现分布式锁？ "),s("a",{class:"header-anchor",href:"#第11讲-如何使用redi快速实现分布式锁","aria-label":'Permalink to "第11讲：如何使用Redi快速实现分布式锁？"'},"​")],-1),d=s("p",null,"本课时我们来讨论如何使用 Redis 快速实现分布式锁。",-1),y=s("p",null,"分布式锁有很多种解决方案，前面简单介绍过，Redis 可以通过 set key 方式来实现分布式锁，但实际情况要更加复杂，比如如何确保临界资源的串行执行，如何及时释放，都是需要额外考虑的。",-1),E=s("p",null,"今天这一课时要讲的是一个完备的分布式锁应该具备哪些特性，以及如何使用 Redis 来一步步优化实现。",-1),h=s("p",null,"分布式锁需要具有哪些特点",-1),k=s("p",null,"先来看一下，一个完备的分布式锁，需要支持哪些特性？",-1),_=i("",41);function u(g,x,R,v,b,f){const n=l("Image");return p(),o("div",null,[c,d,y,E,h,k,t(n,{alt:"图片1(2).png",src:"https://s0.lgstatic.com/i/image/M00/08/05/CgqCHl66QPeAEwYSAABoXEKq3WM722.png"}),a(),_])}const F=e(r,[["render",u]]);export{A as __pageData,F as default};
