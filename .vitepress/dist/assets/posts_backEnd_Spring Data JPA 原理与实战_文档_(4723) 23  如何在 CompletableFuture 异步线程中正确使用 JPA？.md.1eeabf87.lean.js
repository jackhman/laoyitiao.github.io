import{_ as o,j as e,o as t,g as r,k as a,Q as l,s,h as p}from"./chunks/framework.e0c66c3f.js";const _=JSON.parse('{"title":"CompletableFuture 的使用实际案例 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Data JPA 原理与实战_文档/(4723) 23  如何在 CompletableFuture 异步线程中正确使用 JPA？.md","filePath":"posts/backEnd/Spring Data JPA 原理与实战_文档/(4723) 23  如何在 CompletableFuture 异步线程中正确使用 JPA？.md","lastUpdated":1696338709000}'),c={name:"posts/backEnd/Spring Data JPA 原理与实战_文档/(4723) 23  如何在 CompletableFuture 异步线程中正确使用 JPA？.md"},E=l("",33),y=s("p",null,"先看一下上半部分，通过日志我们可以看到，首先执行这个方法的时候开启了两个事务，分别做如下解释。",-1),i=s("p",null,[s("strong",null,"线程 1"),p("：[nio-8087-exec-1] 开启了 UserInfoController.testSaveUser 方法上面的事务，也就是 http 的请求线程，开启了一个 Controller 请求事务。这是因为我们在 testSaveUser 的方法上面加了 @Transaction 的注解，所以开启了一个事务。")],-1),u=s("p",null,"而通过日志我们也可以发现，事务 1 里面什么都没有做，随后就进行了 Commit 操作，所以我们可以看得出来，默认不做任何处理的情况下，事务是不能跨线程的。每个线程里面的事务相互隔离、互不影响。",-1),F=s("p",null,[s("strong",null,"线程 2"),p("：[ task-1]，通过异步线程池开启了 SimpleJpaRepository.findById 方法上面的只读事务。这是因为默认的 SimpleJpaRepository 类上面加了 @Transaction(readOnly=true) 产生的结果。而我们通过 MySQL 的日志也可以看得出来，此次事务里面只做了和我们代码相关的 select user_info 的操作。")],-1),d=s("p",null,"我们再看一下后半部分的日志，如图所示。",-1),A=l("",10),C=l("",16),D=l("",6),g=l("",14);function m(v,b,h,f,B,I){const n=e("Image");return t(),r("div",null,[E,a(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/72/11/Ciqc1F_As0GAa7gmAAQU-sy_Y6s946.png"}),y,i,u,F,d,a(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/72/1C/CgqCHl_As2KAPPhLAAVgCANdWbo463.png"}),A,a(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/72/1C/CgqCHl_As2uAXKFdAAOga2Jcfio735.png"}),C,a(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/72/11/Ciqc1F_As3uAcvehAAG5ahJbL1Y740.png"}),D,a(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/72/11/Ciqc1F_As4SATk88AAEnxfK1BOo296.png"}),g])}const k=o(c,[["render",m]]);export{_ as __pageData,k as default};
