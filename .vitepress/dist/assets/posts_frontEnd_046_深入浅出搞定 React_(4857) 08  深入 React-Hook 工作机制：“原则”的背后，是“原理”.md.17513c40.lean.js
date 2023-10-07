import{_ as o,j as e,o as t,g as c,k as l,h as n,Q as p,s}from"./chunks/framework.4e7d56ce.js";const V=JSON.parse('{"title":"08深入React-Hook工作机制：“原则”的背后，是“原理”","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/046_深入浅出搞定 React/(4857) 08  深入 React-Hook 工作机制：“原则”的背后，是“原理”.md","filePath":"posts/frontEnd/046_深入浅出搞定 React/(4857) 08  深入 React-Hook 工作机制：“原则”的背后，是“原理”.md","lastUpdated":1696417798000}'),r={name:"posts/frontEnd/046_深入浅出搞定 React/(4857) 08  深入 React-Hook 工作机制：“原则”的背后，是“原理”.md"},E=p("",10),y=s("p",null,'PersonalInfoComponent 用于对个人信息进行展示，这里展示的内容包括姓名、年龄、职业。出于测试效果需要，PersonalInfoComponent 还允许你点击"修改姓名"按钮修改姓名信息。点击一次后，"修言"会被修改为"秀妍"，如下图所示：',-1),i=p("",3),u=s("p",null,[n("注意，你在自己电脑上模仿这段代码的时候，千万不要漏掉 if 语句里面"),s("code",null,"// eslint-disable-next-line"),n("这个注释------因为目前大部分的 React 项目都在内部预置了对 React-Hooks-Rule（React-Hooks 使用规则）的强校验，而示例代码中把 Hooks 放进 if 语句的操作作为一种不合规操作，会被直接识别为 Error 级别的错误，进而导致程序报错。这里我们只有将相关代码的 eslint 校验给禁用掉，才能够避免校验性质的报错，从而更直观地看到错误的效果到底是什么样的，进而理解错误的原因。")],-1),F=s("p",null,[n("修改后的组件在初始挂载的时候，实际执行的逻辑内容和上个版本是没有区别的，都涉及对 name、age、career 三个状态的获取和渲染。理论上来说，"),s("strong",null,'变化应该发生在我单击"修改姓名"之后触发的二次渲染里'),n('：二次渲染时，isMounted 已经被置为 true，if 内部的逻辑会被直接跳过。此时按照代码注释中给出的设计意图，这里我希望在二次渲染时，只获取并展示 career 这一个状态。那么事情是否会如我所愿呢？我们一起来看看单击"修改姓名"按钮后会发生什么：')],-1),d=s("p",null,[n('组件不仅没有像预期中一样发生界面变化，甚至直接报错了。报错信息提醒我们，这是因为"'),s("strong",null,"组件渲染的 Hooks 比期望中更少"),n('"。')],-1),g=s("p",null,"确实，按照现有的逻辑，初始渲染调用了三次 useState，而二次渲染时只会调用一次。但仅仅因为这个，就要报错吗？",-1),A=s("p",null,"按道理来说，二次渲染的时候，只要我获取到的 career 值没有问题，那么渲染就应该是没有问题的（因为二次渲染实际只会渲染 career 这一个状态），React 就没有理由阻止我的渲染动作。啊这......难道是 career 出问题了吗？还好我们预先留了一手 Debug 逻辑，每次渲染的时候都会尝试去输出一次 isMounted 和 career 这两个变量的值。现在我们就赶紧来看看，这两个变量到底是什么情况。",-1),D=s("p",null,"首先我将界面重置回初次挂载的状态，观察控制台的输出，如下图所示：",-1),h=s("p",null,'这里我把关键的 isMounted 和 career 两个变量用红色框框圈了出来：isMounted 值为 false，说明是初次渲染；career 值为"我是一个前端，爱吃小熊饼干"，这也是没有问题的。',-1),C=s("p",null,'接下来单击"修改姓名"按钮后，我们再来看一眼两个变量的内容，如下图所示：',-1),m=p("",10),k=p("",6),_=p("",11),q=p("",3),S=s("p",null,[n("我们再复习一遍更新（二次渲染）的时候会发生什么事情：updateState 会依次遍历链表、读取数据并渲染。注意这个过程就像从数组中依次取值一样，是完全按照顺序（或者说索引）来的。因此 React 不会看你命名的变量名是 career 还是别的什么，它只认你这一次 useState 调用，于是它难免会认为："),s("strong",null,"喔，原来你想要的是第一个位置的 hook 啊"),n("。")],-1),f=s("p",null,"然后就会有下面这样的效果：",-1),b=s("p",null,'如此一来，career 就自然而然地取到了链表头节点 hook 对象中的"秀妍"这个值。',-1),B=s("h3",{id:"总结",tabindex:"-1"},[n("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),v=s("p",null,"三个课时学完了，到这里，我们对 React-Hooks 的学习，才终于算是告一段落。",-1),H=s("p",null,'在过去的三个课时里，我们摸排了"动机"，认知了"工作模式"，最后更是结合源码、深挖了一把 React-Hooks 的底层原理。我们所做的这所有的努力，都是为了能够真正吃透 React-Hooks，不仅要确保实践中不出错，还要做到面试时有底气。',-1),I=s("p",null,'接下来，我们就将进入整个专栏真正的"深水区"，逐步切入"虚拟 DOM → Diff 算法 → Fiber 架构"这个知识链路里来。在后续的学习中，我们将延续并且强化这种"刨根问底"的风格，紧贴源码、原理和面试题来向 React 最为核心的部分发起挑战。真正的战斗，才刚刚开始，大家加油~',-1);function P(R,M,T,N,x,w){const a=e("Image");return t(),c("div",null,[E,l(a,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/89/5F/Ciqc1F_YT0uAT1kZAACw9EfbQe8557.png"}),n(),y,l(a,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/89/6A/CgqCHl_YT1qAUSuVAAC-xZcsk54138.png"}),n(),i,l(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/67/64/CgqCHl-hJDaAC6-qAACIdJOIg3E041.png"}),n(),u,F,l(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/67/64/CgqCHl-hJEOAMfdIAAJ8aDhIGdA549.png"}),n(),d,g,A,D,l(a,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/67/64/CgqCHl-hJHSAL8SuAAHP-0rTPKY784.png"}),n(),h,C,l(a,{alt:"图片11.png",src:"https://s0.lgstatic.com/i/image/M00/67/64/CgqCHl-hJRiAP2doAAKt-ZhwxQ0744.png"}),n(),m,l(a,{alt:"图片12.png",src:"https://s0.lgstatic.com/i/image/M00/67/59/Ciqc1F-hJYCAWVjCAAEtNT9pGHA170.png"}),n(),k,l(a,{alt:"图片13.png",src:"https://s0.lgstatic.com/i/image/M00/67/59/Ciqc1F-hJTGANs5yAAD4e6ACv8Q643.png"}),n(),_,l(a,{alt:"图片14.png",src:"https://s0.lgstatic.com/i/image/M00/67/59/Ciqc1F-hJUWAe27kAAC_6mxli_Q918.png"}),n(),q,l(a,{alt:"图片15.png",src:"https://s0.lgstatic.com/i/image/M00/67/65/CgqCHl-hJeCAY_aoAAF7Tt5bK8k880.png"}),n(),S,f,l(a,{alt:"图片16.png",src:"https://s0.lgstatic.com/i/image/M00/67/65/CgqCHl-hJe2ATIhGAAHpze3gFHg893.png"}),n(),b,B,v,H,I])}const J=o(r,[["render",P]]);export{V as __pageData,J as default};
