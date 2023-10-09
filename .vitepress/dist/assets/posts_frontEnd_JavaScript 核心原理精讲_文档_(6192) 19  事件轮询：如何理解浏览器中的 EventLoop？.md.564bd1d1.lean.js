import{_ as a,j as p,o as l,h as r,k as s,f as t,Q as n,s as e}from"./chunks/framework.d3daa342.js";const w=JSON.parse('{"title":"19事件轮询：如何理解浏览器中的EventLoop？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/JavaScript 核心原理精讲_文档/(6192) 19  事件轮询：如何理解浏览器中的 EventLoop？.md","filePath":"posts/frontEnd/JavaScript 核心原理精讲_文档/(6192) 19  事件轮询：如何理解浏览器中的 EventLoop？.md","lastUpdated":1696682708000}'),i={name:"posts/frontEnd/JavaScript 核心原理精讲_文档/(6192) 19  事件轮询：如何理解浏览器中的 EventLoop？.md"},c=n("",9),d=e("p",null,[e("strong",null,"2.事件队列（event queue）负责将新的 function 发送到队列中进行处理"),t("。它遵循 queue 的数据结构特性，先进先出，在该顺序下发送所有操作以进行执行。如下图所示：")],-1),_=e("p",null,[e("strong",null,"3.每当调用事件队列（event queue）中的异步函数时，都会将其发送到浏览器 API"),t("。根据从调用堆栈收到的命令，API 开始自己的单线程操作。其中 setTimeout 方法就是一个比较典型的例子，在堆栈中处理 setTimeout 操作时，会将其发送到相应的 API，该 API 一直等到指定的时间将此操作送回进行处理。它将操作发送到哪里去呢？答案是事件队列（event queue）。这样，就有了一个循环系统，用于在 JavaScript 中运行异步操作。")],-1),u=e("p",null,[e("strong",null,"4.JavaScript 语言本身是单线程的，而浏览器 API 充当单独的线程"),t("。事件循环（Eventloop）促进了这一过程，它会不断检查调用堆栈是否为空。如果为空，则从事件队列中添加新的函数进入调用栈（call stack）；如果不为空，则处理当前函数的调用。我们把整个过程串起来就是这样的一个循环执行流程，如下图所示：")],-1),h=n("",6),v=e("p",null,'关于宏任务和微任务暂时先说到这里，更详细的内容我会在"21 | 引擎进阶（上）：探究宏任务&微任务的运行机制"中详细讲解。',-1),m=e("p",null,"那么初步看完了浏览器中 Eventloop 的情况，我们再来看下在 Node.js 服务端的 Eventloop 是怎么运作的。",-1),g=e("h3",{id:"node-js-的-eventloop",tabindex:"-1"},[t("Node.js 的 Eventloop "),e("a",{class:"header-anchor",href:"#node-js-的-eventloop","aria-label":'Permalink to "Node.js 的 Eventloop"'},"​")],-1),E=e("p",null,[t("关于在 Node.js 服务端 Eventloop，"),e("a",{href:"https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/",target:"_blank",rel:"noreferrer"},"Node.js 官网"),t("是这么描述的：")],-1),k=e("blockquote",null,[e("p",null,[e("em",null,"When Node.js starts, it initializes the event loop, processes the provided input script (or drops into the REPL, which is not covered in this document) which may make async API calls, schedule timers, or call process.nextTick(), then begins processing the event loop.")])],-1),A=e("p",null,"简单翻译过来就是：当 Node.js 开始启动时，会初始化一个 Eventloop，处理输入的代码脚本，这些脚本会进行 API 异步调用，process.nextTick() 方法会开始处理事件循环。下面就是 Node.js 官网提供的 Eventloop 事件循环参考流程。",-1),b=n("",2),T=n("",17),q=e("p",null,"当然为了防止浏览器一直处于繁忙状态，导致 requestIdlecallback 可能永远无法执行回调，它还提供了一个额外的 timeout 参数，为这个任务设置一个截止时间。浏览器就可以根据这个截止时间规划这个任务的执行。",-1),I=e("h3",{id:"总结",tabindex:"-1"},[t("总结 "),e("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),f=e("p",null,"那么现在让你回答我在开头提出的两个问题，你能准确说出来吗？回过头到文中仔细看看，相信不难回答。",-1),y=e("p",null,"到这里，你基本就能理解 Eventloop 在不同的端上的情况了。虽然说 Eventloop 本身并不是一个难理解的概念，但是由于 JS 不同平台的实现的差异，让这个知识点很难一下说清楚，因此我就拿出这一讲带你来分析 Eventloop。希望你可以反复琢磨这一概念，将它理解透彻。",-1),S=e("p",null,"下一讲我们来聊聊 JS 的代码是如何被编译执行的。如果本讲的内容对你有帮助，就留言和我说说你的学习感悟吧。我们下一讲再见。",-1);function P(C,J,j,x,N,F){const o=p("Image");return l(),r("div",null,[c,s(o,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image6/M00/17/42/CioPOWBHazGAfzOQAAIO77agDbw772.png"}),t(),d,s(o,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image6/M00/17/46/Cgp9HWBHa0uAO5oEAAIrTDhci3M926.png"}),t(),_,u,s(o,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image6/M00/17/43/CioPOWBHaz-AIvXzAAMjXUqLjBw024.png"}),t(),h,s(o,{alt:"刘烨的js.png",src:"https://s0.lgstatic.com/i/image6/M00/17/45/CioPOWBHbTWAFHeGAAU2r3znzGU909.png"}),t(),v,m,g,E,k,A,s(o,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M00/17/46/Cgp9HWBHaxyAMv7yAAC2Vr6vRw4319.png"}),t(),b,s(o,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M00/17/42/CioPOWBHawOAK71oAAFclaJ2RLA602.png"}),t(),T,s(o,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image6/M01/17/45/Cgp9HWBHavCAdApzAACc58yaa0Q304.png"}),t(),q,I,f,y,S])}const H=a(i,[["render",P]]);export{w as __pageData,H as default};
