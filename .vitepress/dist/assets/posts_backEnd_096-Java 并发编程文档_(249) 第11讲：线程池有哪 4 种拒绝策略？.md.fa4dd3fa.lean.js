import{_ as o,j as n,o as t,g as p,k as a,Q as e,s as l}from"./chunks/framework.4e7d56ce.js";const P=JSON.parse('{"title":"拒绝时机 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/096-Java 并发编程文档/(249) 第11讲：线程池有哪 4 种拒绝策略？.md","filePath":"posts/backEnd/096-Java 并发编程文档/(249) 第11讲：线程池有哪 4 种拒绝策略？.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/096-Java 并发编程文档/(249) 第11讲：线程池有哪 4 种拒绝策略？.md"},r=e("",7),i=l("p",null,"我们结合图示来分析上述情况，首先看右侧上方的队列部分，你可以看到目前队列已经满了，而图中队列下方的每个线程都在工作，且线程数已经达到最大值 10，如果此时再有新的任务提交，线程池由于没有能力继续处理新提交的任务，所以就会拒绝。",-1),_=l("p",null,"我们了解了线程池拒绝任务的时机，那么我们如何正确地选择拒绝策略呢？Java 在 ThreadPoolExecutor 类中为我们提供了 4 种默认的拒绝策略来应对不同的场景，都实现了 RejectedExecutionHandler 接口，如图所示：",-1),d=e("",3);function E(y,u,h,g,m,C){const s=n("Image");return t(),p("div",null,[r,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/AE/90/CgoB5l3g0XCAWJKOAABzAQJB4SM657.png"}),i,_,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image2/M01/AE/B0/CgotOV3g0WWAVWVlAAEsBI6lEEA162.png"}),d])}const T=o(c,[["render",E]]);export{P as __pageData,T as default};
