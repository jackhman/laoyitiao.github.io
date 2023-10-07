import{_ as o,j as e,o as t,g as c,k as l,h as a,Q as p,s}from"./chunks/framework.4e7d56ce.js";const x=JSON.parse('{"title":"第64讲：你知道什么是CAS吗？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/096-Java 并发编程文档/(302) 第64讲：你知道什么是 CAS 吗？.md","filePath":"posts/backEnd/096-Java 并发编程文档/(302) 第64讲：你知道什么是 CAS 吗？.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/096-Java 并发编程文档/(302) 第64讲：你知道什么是 CAS 吗？.md"},E=p("",15),y=s("p",null,"假设有两个线程，分别使用两个 CPU，它们都想利用 CAS 来改变右边的变量的值。我们先来看线程 1，它使用 CPU 1，假设它先执行，它期望当前的值是 100，并且想将其改成 150。在执行的时候，它会去检查当前的值是不是 100，发现真的是 100，所以可以改动成功，而当改完之后，右边的值就会从 100 变成 150。",-1),i=p("",21),u=s("p",null,"可以看到，此时程序已经停留在打断点的地方了，停留的是 Thread 1（在 Debugger 里可以显示出来当前线程的名字和状态），而 Thread 2 此时的状态是 Monitor （对应 Java 线程的 Blocked 状态），其含义是没有拿到这把锁 synchronized，正在外面等待这把锁。",-1),d=s("p",null,"现在 Thread 1 进到 compareAndSwap 方法里了，我们可以很清楚地看到，oldValue 值是 100，而 expectedValue 的值也是 100，所以它们是相等的。",-1),A=s("p",null,"继续让代码单步运行，因为满足 if 判断条件，所以可以进到 if 语句中，所以接下来会把 value 改成 newValue，而 newValue 的值正是 150。",-1),h=s("p",null,'在修改完成后，还会打印出"线程Thread 1执行成功"这句话，如下图所示。',-1),C=s("p",null,"接下来我们按下左侧的执行按钮，就轮到 Thread 2 了，此时情景就不同了。",-1),F=s("p",null,[a("可以看到，"),s("strong",null,"oldValue 拿到的值是 150，因为 value 的值已经被 Thread 1 修改过了"),a('，所以，150 与 Thread 2 所期望的 expectedValue 的值 100 是不相等的，从而会跳过整个 if 语句，也就不能打印出"Thread 2 执行成功"这句话，最后会返回 oldValue，其实对这个值没有做任何的修改。')],-1),S=s("p",null,"到这里，两个线程就执行完毕了。在控制台，只打印出 Thread 1 执行成功，而没有打印出 Thread 2 执行成功。其中的原因，我们通过 Debug 的方式已经知晓了。",-1),g=s("p",null,"以上代码通过 Debug 的方式，看到了当两个线程去竞争 CAS 时，其中一个成功、另一个失败的情况。",-1),_=s("h3",{id:"总结",tabindex:"-1"},[a("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),D=s("p",null,"在本课时中，我们讲解了什么是 CAS，它的核心思想是通过将内存中的值与指定数据进行比较，当这两个数值一样时，才将内存中的数据替换为新的值，整个过程是具备原子性的；然后介绍了一个关于两个线先后进行的 CAS 例子，并且用等价代码的形式描述了 CAS 的语义，最后还用 Debug 的方式进行了实操演示。",-1);function m(v,V,b,q,T,B){const n=e("Image");return t(),c("div",null,[E,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/80/96/Cgq2xl6EXp-ASQS-AABhaV6D_TQ117.png"}),a(),y,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/80/96/Cgq2xl6EXp-AcJwKAABgmaSYNG4278.png"}),a(),i,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/07/80/Ciqah16EXp-Ac5BbAANR0s_rjiA957.png"}),a(),u,d,A,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/07/80/Ciqah16EXqCAQxqSAGyEoIG0htQ416.gif"}),a(),h,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/80/96/Cgq2xl6EXqCAKVESAABkBbWw9Os255.png"}),a(),C,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/07/80/Ciqah16EXqCAGkU-AAXHUfh2Ojg469.png"}),a(),F,S,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/80/96/Cgq2xl6EXqGAXIjrAHWSmMhqo2o719.gif"}),a(),g,_,D])}const f=o(r,[["render",m]]);export{x as __pageData,f as default};
