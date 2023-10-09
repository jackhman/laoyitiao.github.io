import{_ as o,j as e,o as t,h as c,k as l,f as n,s,Q as p}from"./chunks/framework.d3daa342.js";const $=JSON.parse('{"title":"04运行原理：Serverle应用是怎么运行的？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/玩转 Serverless 架构_文档/(6032) 04  运行原理： Serverle 应用是怎么运行的？.md","filePath":"posts/backEnd/玩转 Serverless 架构_文档/(6032) 04  运行原理： Serverle 应用是怎么运行的？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/玩转 Serverless 架构_文档/(6032) 04  运行原理： Serverle 应用是怎么运行的？.md"},E=s("h1",{id:"_04运行原理-serverle应用是怎么运行的",tabindex:"-1"},[n("04运行原理：Serverle应用是怎么运行的？ "),s("a",{class:"header-anchor",href:"#_04运行原理-serverle应用是怎么运行的","aria-label":'Permalink to "04运行原理：Serverle应用是怎么运行的？"'},"​")],-1),y=s("p",null,"前段时间，团队有个同学在用 Serverless 实时处理日志时遇到了一个问题：每次处理结果都是相同的。后来问过我之后才发现是由于函数执行过程可能存在执行上下文重用，导致每次拉取到的都是同一份数据。归根究底是因为他对 Serverless 应用的运行原理理解得不够深入，而这也是很多刚开始学 Serverless 的同学经常遇到的共性问题，所以我准备了这节课，希望能让你有所收获。",-1),i=s("p",null,"这一讲，我会先介绍一下案例背景，然后再针对这个案例讲解 Serverless 的运行原理。这样一来，当你学完这一讲之后，就能知道案例的问题所在，并在今后的工作中学会避免这个问题。",-1),F=s("h3",{id:"案例回顾",tabindex:"-1"},[n("案例回顾 "),s("a",{class:"header-anchor",href:"#案例回顾","aria-label":'Permalink to "案例回顾"'},"​")],-1),_=s("p",null,"当时我们的用户访问日志是存储在日志服务中的，每次有用户请求，都会记录一条日志。由于日志量巨大，直接从原始日志查询每分钟、每小时的用户 PV、UV 速度极慢。所以团队小伙伴打算以一分钟为时间窗口，查询一分钟内的用户 PV、UV 并存入 MySQL，这样很方便分析。",-1),d=p("",9),D=s("h3",{id:"函数调用链路-事件驱动函数执行",tabindex:"-1"},[n("函数调用链路：事件驱动函数执行 "),s("a",{class:"header-anchor",href:"#函数调用链路-事件驱动函数执行","aria-label":'Permalink to "函数调用链路：事件驱动函数执行"'},"​")],-1),A=s("p",null,[n("在案例中，我们设置了一个定时触发器，所以函数每分钟都会执行一次。这是因为定时触发器会产生一个事件，FaaS 平台会接收各种事件，当事件来临时，就根据事件属性去执行函数。"),s("strong",null,'这个过程就叫"事件驱动"。')],-1),C=s("p",null,'这个词儿是不是很熟悉？比如浏览器是事件驱动的、Node.js 也是事件驱动的。其实 Serverless 的"事件驱动" 与其他技术中的"事件驱动"思想是一样的，本质上都是将用户的操作抽象为事件，由事件监听器监听事件，然后驱动程序执行。只是不同技术的事件模型的实现不同而已。',-1),g=s("p",null,"对于 FaaS 函数来说，一方面可以通过事件来触发执行，另一方面也可以直接调用 API 来执行。FaaS 平台都提供了执行函数的 API。",-1),B=s("p",null,"函数调用链路",-1),u=s("h3",{id:"函数调用方式-同步调用与异步调用",tabindex:"-1"},[n("函数调用方式 ：同步调用与异步调用 "),s("a",{class:"header-anchor",href:"#函数调用方式-同步调用与异步调用","aria-label":'Permalink to "函数调用方式 ：同步调用与异步调用"'},"​")],-1),h=s("p",null,"从函数调用链路的图中，你可以看到函数支持同步调用和异步调用，这正是 FaaS 函数的两种调用方式。",-1),v=s("p",null,"同步调用指的是客户端发起调用后，需要等到函数执行完毕并得到执行结果。FaaS 平台收到同步调用后，会立即为函数分配运行环境并执行函数。",-1),S=p("",6),f=p("",6),m=s("p",null,"确实是这样，但 FaaS 平台不会让你的函数实例无限生成下去，一般会默认最多只会存在 100 个运行中的实例。超过限制后，事件队列就需要等待其他函数实例执行完毕后，再生成新的函数实例。",-1),T=s("p",null,"所以对于本节课中的案例，由于函数并发的限制，如果函数执行时间过长，则使用 new Date() 获取时间就会有问题。可能你以为函数将在 12:00:00 执行，结果函数实际是在 12:10:00 执行。要解决这个问题，就不能直接去获取当前函数执行时间，而应该使用 event.triggerTime ，这个时间是函数被触发的时间。另一方面，因为定时触发器是异步调用的，所以需要为函数设置调用目标，并对异常的调用结果进行处理。",-1),b=s("p",null,"不过由于这个问题需要函数并发超过限制时才会出现，所以团队小伙伴也没有第一时间发现。但这却给未来埋下了隐患，如果这个问题不解决，则很可能处理的数据就是不准确的。",-1),q=s("p",null,"现在你已经知道了函数并发限制是怎么造成的了，那函数上下文重用又是怎么回事呢？这就涉及函数的生命周期了。",-1),k=s("h3",{id:"函数生命周期-冷启动与热启动",tabindex:"-1"},[n("函数生命周期：冷启动与热启动 "),s("a",{class:"header-anchor",href:"#函数生命周期-冷启动与热启动","aria-label":'Permalink to "函数生命周期：冷启动与热启动"'},"​")],-1),V=s("p",null,"在 FaaS 平台中，函数默认是不运行的，也不会分配任何资源。甚至 FaaS 中都不会保存函数代码。只有当 FaaS 接收到触发器的事件后，才会启动并运行函数。整个函数的运行过程可以分为四个阶段。",-1),w=p("",5),P=p("",10);function N(I,x,j,M,R,U){const a=e("Image");return t(),c("div",null,[E,y,i,F,_,l(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image2/M01/03/D5/CgpVE1_jBoGAAsYzAAE8RY39kMY756.png"}),n(),d,l(a,{alt:"Lark20201230-191339.png",src:"https://s0.lgstatic.com/i/image2/M01/04/4A/Cip5yF_sYQSAXdR4AAD19QiJ91A556.png"}),n(),D,A,C,g,l(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image2/M01/03/D5/CgpVE1_jBpOAMAz-AAXvQ_MAGcc183.png"}),n(),B,u,h,v,l(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image2/M01/03/D5/CgpVE1_jBp6AZ2oVAACRAFaQNlE797.png"}),n(),S,l(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/8B/FD/CgqCHl_jBrOAJAYzAAFjiWGxvas566.png"}),n(),f,l(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/8B/FD/CgqCHl_jBsiAO921AACTC8qX880555.png"}),n(),m,T,b,q,k,V,l(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/8B/F2/Ciqc1F_jBtaAeftsAAF0kkX3yIE639.png"}),n(),w,l(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image2/M01/03/D5/CgpVE1_jBuSAeXMZAAG9vZ52nJ0090.png"}),n(),P])}const H=o(r,[["render",N]]);export{$ as __pageData,H as default};
