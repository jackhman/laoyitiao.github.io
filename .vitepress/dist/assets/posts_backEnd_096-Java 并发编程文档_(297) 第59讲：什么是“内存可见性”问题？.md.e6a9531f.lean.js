import{_ as p,j as o,o as e,g as c,k as n,h as a,Q as l,s as t}from"./chunks/framework.4e7d56ce.js";const v=JSON.parse('{"title":"第59讲：什么是“内存可见性”问题？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/096-Java 并发编程文档/(297) 第59讲：什么是“内存可见性”问题？.md","filePath":"posts/backEnd/096-Java 并发编程文档/(297) 第59讲：什么是“内存可见性”问题？.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/096-Java 并发编程文档/(297) 第59讲：什么是“内存可见性”问题？.md"},E=l("",9),y=t("p",null,"在图中可以看出，由于 x 的初始值为 0，所以对于左边的第 1 个线程和右边的第 2 个线程而言，它们都可以从主内存中去获取到这个信息，对两个线程来说 x 都是 0。可是此时我们假设第 1 个线程先去执行 write 方法，它就把 x 的值从 0 改为了 1，但是它改动的动作并不是直接发生在主内存中的，而是会发生在第 1 个线程的工作内存中，如下图所示。",-1),i=l("",12),F=l("",10);function d(h,b,u,A,_,D){const s=o("Image");return e(),c("div",null,[E,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/78/CD/CgpOIF50jJyAPDcsAAARq0xpY6E561.png"}),a(),y,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/78/CE/Cgq2xl50jKuAJMDOAAAUELg2Vnw525.png"}),a(),i,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/78/4F/Cgq2xl5zjgGAF-mdAABl3iL7a-k359.png"}),a(),F])}const g=p(r,[["render",d]]);export{v as __pageData,g as default};
