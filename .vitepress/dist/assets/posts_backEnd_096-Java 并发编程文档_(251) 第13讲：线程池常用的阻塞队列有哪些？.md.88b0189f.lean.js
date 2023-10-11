import{_ as n,D as r,o as t,g as d,J as l,h as a,m as e,Q as u}from"./chunks/framework.f67d7268.js";const Q=JSON.parse('{"title":"第13讲：线程池常用的阻塞队列有哪些？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/096-Java 并发编程文档/(251) 第13讲：线程池常用的阻塞队列有哪些？.md","filePath":"posts/backEnd/096-Java 并发编程文档/(251) 第13讲：线程池常用的阻塞队列有哪些？.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/096-Java 并发编程文档/(251) 第13讲：线程池常用的阻塞队列有哪些？.md"},s=e("h1",{id:"第13讲-线程池常用的阻塞队列有哪些",tabindex:"-1"},[a("第13讲：线程池常用的阻塞队列有哪些？ "),e("a",{class:"header-anchor",href:"#第13讲-线程池常用的阻塞队列有哪些","aria-label":'Permalink to "第13讲：线程池常用的阻塞队列有哪些？"'},"​")],-1),h=e("p",null,"在本课时我们主要学习线程池内部结构，以及线程池中最常见的阻塞队列类型。",-1),i=e("h3",{id:"线程池内部结构",tabindex:"-1"},[a("线程池内部结构 "),e("a",{class:"header-anchor",href:"#线程池内部结构","aria-label":'Permalink to "线程池内部结构"'},"​")],-1),_=e("p",null,"线程池的内部结构主要由四部分组成，如图所示。",-1),p=e("ul",null,[e("li",null,[e("p",null,"第一部分是线程池管理器，它主要负责管理线程池的创建、销毁、添加任务等管理操作，它是整个线程池的管家。")]),e("li",null,[e("p",null,"第二部分是工作线程，也就是图中的线程 t0~t9，这些线程勤勤恳恳地从任务队列中获取任务并执行。")]),e("li",null,[e("p",null,"第三部分是任务队列，作为一种缓冲机制，线程池会把当下没有处理的任务放入任务队列中，由于多线程同时从任务队列中获取任务是并发场景，此时就需要任务队列满足线程安全的要求，所以线程池中任务队列采用 BlockingQueue 来保障线程安全。")]),e("li",null,[e("p",null,"第四部分是任务，任务要求实现统一的接口，以便工作线程可以处理和执行。")])],-1),k=e("h3",{id:"阻塞队列",tabindex:"-1"},[a("阻塞队列 "),e("a",{class:"header-anchor",href:"#阻塞队列","aria-label":'Permalink to "阻塞队列"'},"​")],-1),g=u("",12);function m(T,P,b,x,S,q){const o=r("Image");return t(),d("div",null,[s,h,i,l(o,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/54/39/CgpOIF3nUryAHhreAAA4T0DXzFI487.png"}),a(),_,p,k,l(o,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/54/39/Cgq2xl3nUryAJBkpAAA0_WFSrB8184.png"}),a(),g])}const f=n(c,[["render",m]]);export{Q as __pageData,f as default};
