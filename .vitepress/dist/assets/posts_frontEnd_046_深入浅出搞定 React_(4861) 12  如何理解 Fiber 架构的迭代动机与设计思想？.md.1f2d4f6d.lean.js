import{_ as a,j as i,o as n,g as c,k as o,Q as r,s as t}from"./chunks/framework.e0c66c3f.js";const k=JSON.parse('{"title":"前置知识：单线程的 JavaScript 与多线程的浏览器 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/046_深入浅出搞定 React/(4861) 12  如何理解 Fiber 架构的迭代动机与设计思想？.md","filePath":"posts/frontEnd/046_深入浅出搞定 React/(4861) 12  如何理解 Fiber 架构的迭代动机与设计思想？.md","lastUpdated":1696338709000}'),p={name:"posts/frontEnd/046_深入浅出搞定 React/(4861) 12  如何理解 Fiber 架构的迭代动机与设计思想？.md"},s=r("",15),l=r("",10),u=t("p",null,"正如上文所分析的那样，Reconciler 这一层负责对比出新老虚拟 DOM 之间的变化，Renderer 这一层负责将变化的部分应用到视图上，从 Reconciler 到 Renderer 这个过程是严格同步的。",-1),_=t("p",null,'而在 React 16 中，为了实现"可中断"和"优先级"，两层架构变成了如下图所示的三层架构：',-1),q=r("",5),g=t("ol",null,[t("li",null,[t("p",null,"render 阶段：纯净且没有副作用，可能会被 React 暂停、终止或重新启动。")]),t("li",null,[t("p",null,"pre-commit 阶段：可以读取 DOM。")]),t("li",null,[t("p",null,"commit 阶段：可以使用 DOM，运行副作用，安排更新。")])],-1),d=t("p",null,"其中 pre-commit 和 commit 从大阶段上来看都属于 commit 阶段。",-1),h=t("p",null,"在 render 阶段，React 主要是在内存中做计算，明确 DOM 树的更新点；而 commit 阶段，则负责把 render 阶段生成的更新真正地执行掉。这两个阶段做的事情，非常适合和本讲刚刚讲过的 React 架构分层结合起来理解。",-1),R=t("p",null,"首先我们来看 React 15 中从 render 到 commit 的过程：",-1),m=t("p",null,"而在 React 16 中，render 到 commit 的过程变成了这样，如下图所示：",-1),b=r("",11);function f(S,D,A,F,C,T){const e=i("Image");return n(),c("div",null,[s,o(e,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/6E/D8/CgqCHl-zlcmATw-hAAD1942js64663.png"}),l,o(e,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/6E/D8/CgqCHl-zleqAJoRjAAA9BnH9jdQ473.png"}),u,_,o(e,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/6E/D8/CgqCHl-zlfaALmyYAABbITniefc225.png"}),q,o(e,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/6E/CC/Ciqc1F-zlgGAVlMRAAMB6-4eyN4900.png"}),g,d,h,R,o(e,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/6E/CC/Ciqc1F-zlgqAYLTjAACBi-NvpYI353.png"}),m,o(e,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/6E/CC/Ciqc1F-zlhKAMu6ZAACYDSGoCUY002.png"}),b])}const M=a(p,[["render",f]]);export{k as __pageData,M as default};
