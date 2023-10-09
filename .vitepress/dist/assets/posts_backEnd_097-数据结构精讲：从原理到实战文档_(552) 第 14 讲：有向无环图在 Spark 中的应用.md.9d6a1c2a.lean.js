import{_ as g,j as l,o as a,h as _,k as o,f as s,Q as r,s as t}from"./chunks/framework.d3daa342.js";const j=JSON.parse('{"title":"第14讲：有向无环图在Spark中的应用","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/097-数据结构精讲：从原理到实战文档/(552) 第 14 讲：有向无环图在 Spark 中的应用.md","filePath":"posts/backEnd/097-数据结构精讲：从原理到实战文档/(552) 第 14 讲：有向无环图在 Spark 中的应用.md","lastUpdated":1696682708000}'),e={name:"posts/backEnd/097-数据结构精讲：从原理到实战文档/(552) 第 14 讲：有向无环图在 Spark 中的应用.md"},p=r("",5),i=r("",26),c=t("br",null,null,-1),d=t("p",null,"有向图可以表达任务之间的依赖关系，比如 B 指向 A，我们可以表达要执行任务 A ，则需要先完成任务 B 才可以。",-1),h=t("br",null,null,-1),u=t("p",null,"比如下图是一个有环图。下图中 B 任务依赖于 D，C 任务依赖于 B，E 任务依赖于 C，D 任务又依赖于 B。有环图在表达任务关系的时候是一个灾难，因为你没法找到是从哪个任务开始处理的。",-1),b=t("br",null,null,-1),m=t("br",null,null,-1),A=t("h3",{id:"如何用有向无环图抽象表达数据处理的任务",tabindex:"-1"},[s("如何用有向无环图抽象表达数据处理的任务 "),t("a",{class:"header-anchor",href:"#如何用有向无环图抽象表达数据处理的任务","aria-label":'Permalink to "如何用有向无环图抽象表达数据处理的任务"'},"​")],-1),k=t("p",null,"回顾了有向和无环图的特性，我们来看如何用有向无环图（DAG）来抽象表达数据处理任务。下面列举一个生活中的任务处理案例。",-1),S=t("br",null,null,-1),C=t("br",null,null,-1),f=t("p",null,"西红柿炒鸡蛋这样一个菜，就是一个有向无环图概念的典型案例。比如看这里面番茄的处理，最后一步炒的步骤依赖于切好的番茄、打好的蛋、热好的油，切好的番茄又依赖于洗好的番茄等操作。如果用 Spark 来实现的话，在这个图里面，每一个箭头都会是一个独立的数据转换操作（Transformation）。",-1),D=t("br",null,null,-1),T=t("p",null,"Spark 利用有向无环图表达数据处理后可以对数据处理流程做自动优化。回到刚才的番茄炒鸡蛋的例子，哪些情况我们需要自动的优化呢？",-1),x=t("br",null,null,-1),V=t("br",null,null,-1),B=t("p",null,"设想一下我们的数据在处理食谱上又增加了番茄牛腩的需求，用户的数据处理有向图就变成了这个样子了。在理想的情况下，我们的计算引擎要能够自动发现红框中的两条数据处理流程是重复的，它要能把两条数据处理过程进行合并。这样的话，番茄就不会被重复准备了；同样的，如果需求突然不再需要番茄炒蛋了，只需要番茄牛腩，在数据流水线的预处理部分也应该把一些无关的数据操作优化掉，比如整个鸡蛋的处理过程就不应该在运行时出现。",-1),I=t("br",null,null,-1),P=t("p",null,[s("另一种自动的优化是"),t("strong",null,"计算资源的自动弹性分配"),s("。比如还是在番茄炒蛋这样一个数据处理流水线中，如果你的规模上来了，今天需要生产 1 吨的番茄炒蛋，明天需要生产 10 吨的番茄炒蛋。此时你会发现，有时候是处理 1000 个番茄，有时候又是 10000 个番茄。如果手动去做资源配置的话，那再也配置不过来了。我们的优化系统也要有这种弹性的劳动力分配机制，它要能自动分配比如 100 台机器处理 1000 个番茄，如果是 10000 个番茄那就分配 1000 台机器，但是只给热油 1 台机器可能就够了。")],-1),E=t("br",null,null,-1),Q=t("p",null,"有向无环图便是 Spark 框架能够自动优化执行计划的核心，再看一个例子：",-1),q=t("br",null,null,-1),N=t("br",null,null,-1),F=t("p",null,"类似图中这样的数据处理流程，在 Spark 获知了整个数据处理流程就会被优化成如下图所示的样子：",-1),K=t("br",null,null,-1),M=t("br",null,null,-1),G=t("p",null,"这样的优化在 Spark 中被称为兄弟融合优化（Sibling Fusion）。",-1),w=t("h3",{id:"总结",tabindex:"-1"},[t("strong",null,"总结"),s(),t("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "**总结**"'},"​")],-1),O=t("p",null,"这一讲我们回顾了图的有向和无环的概念，利用有向图建模生活中的数据处理问题，并分析了 Spark 怎样利用有向无环图优化数据处理。",-1);function v(z,$,y,J,U,Y){const n=l("Image");return a(),_("div",null,[p,o(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/67/48/CgpOIF5Kf76ADH-mAAGG1ysgQsw460.png"}),s(),i,o(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/67/48/Cgq2xl5Kf86ATZDwAAFCTY8YcVM440.png"}),s(),c,d,h,u,b,o(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/67/48/Cgq2xl5Kf96Aeow8AAFionQCUds750.png"}),s(),m,A,k,S,o(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/67/48/Cgq2xl5Kf-qAPhaNAAEE-QVcz9o130.png"}),s(),C,f,D,T,x,o(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/67/48/CgpOIF5Kf_WAX6A8AAGWyBFHoJQ259.png"}),s(),V,B,I,P,E,Q,q,o(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/67/48/CgpOIF5KgAGAO2QhAAD4ZhKzvVY121.png"}),s(),N,F,K,o(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/67/48/Cgq2xl5KgBCAIE7tAACQZJ01mgQ161.png"}),s(),M,G,w,O])}const H=g(e,[["render",v]]);export{j as __pageData,H as default};
