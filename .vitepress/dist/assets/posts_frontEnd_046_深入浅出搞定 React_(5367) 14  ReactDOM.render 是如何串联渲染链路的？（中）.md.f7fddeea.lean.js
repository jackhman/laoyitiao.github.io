import{_ as o,j as e,o as r,g as t,k as a,s,h as l,Q as p}from"./chunks/framework.4e7d56ce.js";const rs=JSON.parse('{"title":"拆解 ReactDOM.render 调用栈------render 阶段 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/046_深入浅出搞定 React/(5367) 14  ReactDOM.render 是如何串联渲染链路的？（中）.md","filePath":"posts/frontEnd/046_深入浅出搞定 React/(5367) 14  ReactDOM.render 是如何串联渲染链路的？（中）.md","lastUpdated":1696417798000}'),c={name:"posts/frontEnd/046_深入浅出搞定 React/(5367) 14  ReactDOM.render 是如何串联渲染链路的？（中）.md"},E=s("p",null,'上一讲我们对 ReactDOM.render 的调用链路、包括其对应的初始化阶段的工作内容都有了学习和掌握。这一讲我们在此基础上，学习后续的 render 阶段和 commit 阶段。这其中，render 阶段可以认为是整个渲染链路中最为核心的一环，因为我们反复强调"找不同"的过程，恰恰就是在这个阶段发生的。',-1),i=s("p",null,"render 阶段做的事情有很多，这一讲我们将以 beginWork 为线索，着重探讨 Fiber 树的构建过程。",-1),y=s("h3",{id:"拆解-reactdom-render-调用栈-render-阶段",tabindex:"-1"},[l("拆解 ReactDOM.render 调用栈------render 阶段 "),s("a",{class:"header-anchor",href:"#拆解-reactdom-render-调用栈-render-阶段","aria-label":'Permalink to "拆解 ReactDOM.render 调用栈------render 阶段"'},"​")],-1),g=s("p",null,"首先，我们复习一下 render 阶段在整个渲染链路中的定位，如下图所示。",-1),d=s("p",null,"图中，performSyncWorkOnRoot 标志着 render 阶段的开始，finishSyncRender 标志着 render 阶段的结束。这中间包含了大量的 beginWork、completeWork 调用栈，正是 render 的工作内容。",-1),u=s("blockquote",null,[s("p",null,'beginWork、completeWork 这两个方法需要注意，它们串联起的是一个"模拟递归"的过程。')],-1),F=s("p",null,[l('在第 10 讲"栈调和"中强调过，React 15 下的调和过程'),s("strong",null,"是一个递归的过程"),l(" 。而 Fiber 架构下的调和过程，虽然并不是依赖递归来实现的，"),s("strong",null,"但在 ReactDOM.render 触发的同步模式下，它仍然是一个深度优先搜索的过程"),l(" 。在这个过程中，"),s("strong",null,"beginWork 将创建新的 Fiber 节点，而 completeWork 则负责将 Fiber 节点映射为 DOM 节点"),l("。")],-1),h=s("p",null,"那么问题就来了：截止到上一讲，我们的 Fiber 树都还长这个样子：",-1),A=s("p",null,"就这么个样子，你遍历它，能遍历出来什么？到底怎么个遍历法？接下来我们就深入到源码里去一探究竟！",-1),b=s("h3",{id:"workinprogress-节点的创建",tabindex:"-1"},[l("workInProgress 节点的创建 "),s("a",{class:"header-anchor",href:"#workinprogress-节点的创建","aria-label":'Permalink to "workInProgress 节点的创建"'},"​")],-1),k=s("p",null,"上一讲曾经提到，performSyncWorkOnRoot 是 render 阶段的起点，而这个函数最关键的地方在于它调用了 renderRootSync。下面我们放大 Performance 调用栈，来看看 renderRootSync 被调用后，紧接着发生了什么：",-1),D=p("",3),C=p("",8),_=p("",6),f=p("",10),m=p("",22),w=s("p",null,[l("回到我们的调用链路里来，由于 current 是 rootFiber，它不为 null，因此它将走入的是下图所高亮的这行逻辑。也就是说在 mountChildFibers 和 reconcileChildFibers 之间，它选择的是 "),s("strong",null,"reconcileChildFibers"),l("：")],-1),P=s("p",null,[l("结合前面的分析可知，reconcileChildFibers 是"),s("code",null,"ChildReconciler(true)"),l('的返回值。入参为 true，意味着其内部逻辑是允许追踪副作用的，因此"打 effectTag"这个动作将会生效。')],-1),v=s("p",null,"接下来进入 reconcileChildFibers 的逻辑，在 reconcileChildFibers 这个逻辑分发器中，会把 rootFiber 子节点的创建工作分发给 reconcileXXX 函数家族的一员------reconcileSingleElement 来处理，具体的调用形式如下图高亮处所示：",-1),I=s("p",null,"reconcileSingleElement 将基于 rootFiber 子节点的 ReactElement 对象信息，创建其对应的 FiberNode。这个过程中涉及的函数调用如下图高亮处所示：",-1),q=p("",4),T=s("p",null,'App 所对应的 Fiber 节点，将被 placeSingleChild 打上"Placement"（新增）的副作用标记，而后作为 reconcileChildFibers 函数的返回值，返回给下图中的 workInProgress.child：',-1),R=s("p",null,"reconcileChildren 函数上下文里的 workInProgress 就是 rootFiber 节点。那么此时，我们就将新创建的 App Fiber 节点和 rootFiber 关联了起来，整个 Fiber 树如下图所示：",-1),B=s("h3",{id:"fiber-节点的创建过程梳理",tabindex:"-1"},[l("Fiber 节点的创建过程梳理 "),s("a",{class:"header-anchor",href:"#fiber-节点的创建过程梳理","aria-label":'Permalink to "Fiber 节点的创建过程梳理"'},"​")],-1),S=s("p",null,"分析完 App FiberNode 的创建过程，我们先不必急于继续往下走这个渲染链路。因为其实最关键的东西已经讲完了，剩余节点的创建只不过是对 performUnitOfWork、 beginWork 和 ChildReconciler 等相关逻辑的重复。",-1),x=s("p",null,"刚刚这一通分析所涉及的调用栈很长，相信不少人如果是初读的话，过程中肯定不可避免地要反复回看，确认自己现在到底在调用栈的哪一环。这里为了方便你把握逻辑脉络，我将本讲讲解的 beginWork 所触发的调用流程总结进一张大图：",-1),W=p("",11),M=s("p",null,"共有 7 个节点，若你点击展开查看每个节点的内容，就会发现这 7 个节点其实分别是：",-1),O=s("ul",null,[s("li",null,[s("p",null,"rootFiber（当前 Fiber 树的根节点）")]),s("li",null,[s("p",null,"App FiberNode（App 函数组件对应的节点）")]),s("li",null,[s("p",null,"class 为 App 的 DOM 元素对应的节点，其内容如下图所示")])],-1),N=s("ul",null,[s("li",null,"class 为 container 的 DOM 元素对应的节点，其内容如下图所示")],-1),X=s("ul",null,[s("li",null,[s("p",null,"h1 标签对应的节点")]),s("li",null,[s("p",null,'第 1 个 p 标签对应的 FiberNode，内容为"我是第一段话"，如下图所示')])],-1),H=s("ul",null,[s("li",null,'第 2 个 p 标签对应的 FiberNode，内容为"我是第二段话"，如下图所示')],-1),j=p("",5),L=s("p",null,"Fiber 节点有是有了，但这些 Fiber 节点之间又是如何相互连接的呢？",-1),U=s("h4",{id:"fiber-节点间是如何连接的呢",tabindex:"-1"},[l("Fiber 节点间是如何连接的呢 "),s("a",{class:"header-anchor",href:"#fiber-节点间是如何连接的呢","aria-label":'Permalink to "Fiber 节点间是如何连接的呢"'},"​")],-1),V=s("p",null,[s("strong",null,"不同的 Fiber 节点之间，将通过 child、return、sibling 这 3 个属性建立关系"),l(" ，"),s("strong",null,"其中 child、return 记录的是父子节点关系，而 sibling 记录的则是兄弟节点关系"),l("。")],-1),J=s("p",null,"这里我以 h1 这个元素对应的 Fiber 节点为例，给你展示下它是如何与其他节点相连接的。展开这个 Fiber 节点，对它的 child、 return、sibling 3 个属性作截取，如下图所示：",-1),K=s("p",null,"child 属性为 null，说明 h1 节点没有子 Fiber 节点：",-1),z=s("p",null,"return 属性局部截图：",-1),Y=s("p",null,"sibling 属性局部截图：",-1),Z=s("p",null,[l("可以看到，return 属性指向的是 class 为 container 的 div 节点，而 sibling 属性指向的是第 1 个 p 节点。结合 JSX 中的嵌套关系我们不难得知 ------"),s("strong",null,"FiberNode 实例中，return 指向的是当前 Fiber 节点的父节点，而 sibling 指向的是当前节点的第 1 个兄弟节点"),l("。")],-1),$=s("p",null,"结合这 3 个属性所记录的节点间关系信息，我们可以轻松地将上面梳理出来的新 FiberNode 连接起来：",-1),G=p("",6);function Q(ss,ns,as,ls,ps,os){const n=e("Image");return r(),t("div",null,[E,i,y,g,a(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/71/0B/CgqCHl-8xCmAcvVyAADtTCzN0RM929.png"}),d,u,F,h,a(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/71/0A/CgqCHl-8w7qAc91bAABOxKDmLgA173.png"}),A,b,k,a(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/70/FF/Ciqc1F-8xByAOzCeAAAoruuugdE734.png"}),D,a(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/70/FF/Ciqc1F-8xDeAR3RMAAClHPw_BEk265.png"}),C,a(n,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/71/49/CgqCHl-91EqAJlftAAB6KmeoTMw529.png"}),_,a(n,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/71/49/CgqCHl-91HeADxF2AACYnkvx4lM165.png"}),f,a(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/71/0B/CgqCHl-8xHmAV2FMAABmLqBlHD0379.png"}),m,a(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/71/0B/CgqCHl-8xIyAZ3VoAADupBJcrgo966.png"}),w,a(n,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/71/07/Ciqc1F-80U-AfncYAAEt69YE2-g951.png"}),P,v,a(n,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/71/07/Ciqc1F-80VaABnJCAACe4hcSiBM598.png"}),I,a(n,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image/M00/71/12/CgqCHl-80VyAC2P6AAJfHF2gzfs579.png"}),q,a(n,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image/M00/71/12/CgqCHl-80WaAXLPeAAD-OcP7y4o323.png"}),T,a(n,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image/M00/71/12/CgqCHl-80WyARnfDAAGNRsiaht8973.png"}),R,a(n,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/71/3E/Ciqc1F-91MmARvQRAADFJC1K20o629.png"}),B,S,x,a(n,{alt:"7.png",src:"https://s0.lgstatic.com/i/image/M00/71/47/Ciqc1F-97fSAYLUIAAGBjhvNylg581.png"}),W,a(n,{alt:"Drawing 15.png",src:"https://s0.lgstatic.com/i/image/M00/71/12/CgqCHl-80ZuAA1HAAAEBle-yZFM332.png"}),M,O,a(n,{alt:"Drawing 16.png",src:"https://s0.lgstatic.com/i/image/M00/71/12/CgqCHl-80aSAF7MKAAEHjyZ0Xwk039.png"}),N,a(n,{alt:"Drawing 17.png",src:"https://s0.lgstatic.com/i/image/M00/71/07/Ciqc1F-80aqAJId4AACkvKHjlTM377.png"}),X,a(n,{alt:"Drawing 18.png",src:"https://s0.lgstatic.com/i/image/M00/71/07/Ciqc1F-80bGAGFKTAADArDpX9j4096.png"}),H,a(n,{alt:"Drawing 19.png",src:"https://s0.lgstatic.com/i/image/M00/71/12/CgqCHl-80biASe4KAAEZMaZTIY8632.png"}),j,a(n,{alt:"4.png",src:"https://s0.lgstatic.com/i/image/M00/71/49/CgqCHl-91PKANLSRAACt8c-uYAk378.png"}),L,U,V,J,K,a(n,{alt:"Drawing 21.png",src:"https://s0.lgstatic.com/i/image/M00/71/13/CgqCHl-80d2AV6r7AABCQ4zzis4597.png"}),z,a(n,{alt:"Drawing 22.png",src:"https://s0.lgstatic.com/i/image/M00/71/07/Ciqc1F-80eOAMhlKAACxayioeh4810.png"}),Y,a(n,{alt:"Drawing 23.png",src:"https://s0.lgstatic.com/i/image/M00/71/13/CgqCHl-80eiAJ6doAAClFZDD7jE642.png"}),Z,$,a(n,{alt:"5.png",src:"https://s0.lgstatic.com/i/image/M00/71/3E/Ciqc1F-91RGAAygAAAEYVWI-PXg439.png"}),G])}const ts=o(c,[["render",Q]]);export{rs as __pageData,ts as default};
