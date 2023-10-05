import{_ as o,j as e,o as t,g as r,k as n,h as p,s,Q as l}from"./chunks/framework.4e7d56ce.js";const H=JSON.parse('{"title":"QueryByExampleExecutor用法 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Data JPA 原理与实战_文档/(4709) 09  JpaSpecificationExecutor 解决了哪些问题？.md","filePath":"posts/backEnd/Spring Data JPA 原理与实战_文档/(4709) 09  JpaSpecificationExecutor 解决了哪些问题？.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/Spring Data JPA 原理与实战_文档/(4709) 09  JpaSpecificationExecutor 解决了哪些问题？.md"},E=s("p",null,"欢迎来到第二个模块，从这一课时开始，我们就要进入高级用法与实战的学习。在进阶高级开发 / 架构师的路上，我将尽可能把经验都传授给你，帮助你少走弯路。",-1),y=s("p",null,"学习完前面 8 个课时，相信作为一名开发人员，你对 JPA 的基本用法已经有了一定的了解。那么从这一课时开始，我们要介绍一些复杂场景的使用，特别是作为一名架构师必须要掌握的内容。",-1),i=s("p",null,"我们先来看看除了前几节课我们讲解的 Define Query Method 和 @Query 之外，还有哪些查询方法。首先看一个简单的 QueryByExampleExecutor 用法。",-1),d=s("h3",{id:"querybyexampleexecutor用法",tabindex:"-1"},[p("QueryByExampleExecutor用法 "),s("a",{class:"header-anchor",href:"#querybyexampleexecutor用法","aria-label":'Permalink to "QueryByExampleExecutor用法"'},"​")],-1),F=s("p",null,"QueryByExampleExecutor（QBE）是一种用户友好的查询技术，具有简单的接口，它允许动态查询创建，并且不需要编写包含字段名称的查询。",-1),u=s("p",null,"下面是一个 UML 图，你可以看到 QueryByExampleExecutor 是 JpaRepository 的父接口，也就是 JpaRespository 里面继承了 QueryByExampleExecutor 的所有方法。",-1),g=l("",17),A=l("",15),h=s("p",null,"通过 Structure 视图可以很容易地发现，我们要关心的方法都是这些 public 类型的返回 ExampleMatcher 的方法，那么我们把这些方法搞明白了是不是就可以掌握其详细用法了呢？下面看看它的实现类。",-1),C=l("",32),m=l("",4),D=l("",5),_=l("",6),B=s("p",null,"从而找到 findAll 方法的实现类，如下所示：",-1),x=l("",3),b=s("p",null,[p("我们接着看上面的 getQuery 方法的实现，可以看到接收的参数是 Specification"),s("code",null,"<S>"),p("接口，所以不用关心实现类是什么。")],-1),q=s("p",null,"我们接着再看这个断点的 getQuery 方法：",-1),v=s("p",null,"里面有一段代码会调用 applySpecificationToCriteria 生成 root，并由 Root 作为参数生成 Query，从而交给 EM（EntityManager）进行查询。",-1),T=s("p",null,"我们再来看一下关键的 applySpecificationToCriteria 方法。",-1),k=s("p",null,"根据 Specification 调用 toPredicate 方法，生成 Predicate，从而实现查询需求。",-1),M=s("p",null,"现在我们已经对 QueryByExampleExecutor 的用法和实现原理基本掌握了，我们再来看一个十分相似的接口：JpaSpecificationExecutor 是干什么用的。",-1),f=s("h3",{id:"jpaspecificationexecutor-接口结构",tabindex:"-1"},[p("JpaSpecificationExecutor 接口结构 "),s("a",{class:"header-anchor",href:"#jpaspecificationexecutor-接口结构","aria-label":'Permalink to "JpaSpecificationExecutor 接口结构"'},"​")],-1),S=s("p",null,"正如我们开篇提到的【图一：Repository 类图】，JpaSpecificationExecutor 是 JPA 里面的另一个接口分支。我们先来看看它的基本语法。",-1),w=l("",9);function j(P,I,R,N,U,L){const a=e("Image");return t(),r("div",null,[E,y,i,d,F,u,n(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/5D/4B/CgqCHl-EE7WAAfi5AACTjc0iffY586.png"}),p(),g,n(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/5D/40/Ciqc1F-EFDCAa50VAADEF8jBllY550.png"}),A,n(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/5D/4C/CgqCHl-EFFGAHjlEAAOzUKkyjE0156.png"}),h,n(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/5D/4C/CgqCHl-EFFeAcXU9AACEfIRngF4284.png"}),C,n(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/5D/41/Ciqc1F-EFHuAXsn3AABiCE6_I0I978.png"}),m,n(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/5D/4C/CgqCHl-EFIiAKEMxAAFkdJSuuX4896.png"}),D,n(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/5D/4C/CgqCHl-EFJGAOa8BAAGc6Bk2F3g271.png"}),_,n(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/5D/4C/CgqCHl-EFJmAO7ItAABKDcL98Uc576.png"}),B,n(a,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/5D/4C/CgqCHl-EFKCAOUw0AAaMM8yZ64k573.png"}),x,n(a,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/5D/41/Ciqc1F-EFKeAOHpRAASLh36FrZI858.png"}),b,n(a,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image/M00/5D/41/Ciqc1F-EFK2AWfUgAAEJccNGWh4199.png"}),q,n(a,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image/M00/5D/41/Ciqc1F-EFLOAfcLIAAEtDgDfmQU527.png"}),v,T,n(a,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image/M00/5D/4C/CgqCHl-EFLyAJh4iAAFuOV3pYzA214.png"}),k,M,f,S,n(a,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image/M00/5D/4C/CgqCHl-EFMSABjEBAAEBE-nLmV0807.png"}),w])}const J=o(c,[["render",j]]);export{H as __pageData,J as default};
