import{_ as o,j as e,o as t,g as c,k as l,h as n,s,Q as p}from"./chunks/framework.4e7d56ce.js";const K=JSON.parse('{"title":"03｜基础入门：编写你的第一个Serverle应用","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/玩转 Serverless 架构_文档/(6031) 03｜基础入门：编写你的第一个 Serverle 应用.md","filePath":"posts/backEnd/玩转 Serverless 架构_文档/(6031) 03｜基础入门：编写你的第一个 Serverle 应用.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/玩转 Serverless 架构_文档/(6031) 03｜基础入门：编写你的第一个 Serverle 应用.md"},E=s("h1",{id:"_03-基础入门-编写你的第一个serverle应用",tabindex:"-1"},[n("03｜基础入门：编写你的第一个Serverle应用 "),s("a",{class:"header-anchor",href:"#_03-基础入门-编写你的第一个serverle应用","aria-label":'Permalink to "03｜基础入门：编写你的第一个Serverle应用"'},"​")],-1),y=s("p",null,"从今天开始，我们正式进入 Serverless 的开发阶段。",-1),i=s("p",null,"学习一门新技术，除了了解其基础概念，更重要的是把理论转化为实践，所以学会开发 Serverless 应用尤为重要。考虑到很多刚开始接触 Serverless 开发的同学在短时间很难适应 Serverless 的开发思想，知识也不够体系化，所以我除了带你实现一个 Serverless 应用之外，还会介绍应用开发时涉及的重要知识点，让你更深刻地理解 Serverless，建立属于自己的知识体系。",-1),u=s("h3",{id:"选择适合的-faas-平台",tabindex:"-1"},[n("选择适合的 FaaS 平台 "),s("a",{class:"header-anchor",href:"#选择适合的-faas-平台","aria-label":'Permalink to "选择适合的 FaaS 平台"'},"​")],-1),F=s("p",null,"在开发 Serverless 应用之前，你需要了解并选择一个 Serverless FaaS 平台，因为你要用 FaaS 运行代码。",-1),d=s("p",null,"目前主流的 FaaS 产品有 AWS Lambda、阿里云函数计算等。不同 FaaS 支持的编程语言和触发器不尽相同，为了让你更快地了解它们异同点，我提供给你一个简单的对比图：",-1),q=p("",9),h=s("p",null,"传统应用开发流程",-1),C=s("p",null,"而基于 Serverless FaaS 平台进行开发就很简单了，你开发完的函数代码部署到 FaaS 平台并为函数配置 HTTP 触发器，FaaS 会自动帮你初始化运行环境，并且 HTTP 触发器会自动为你提供一个测试域名。",-1),g=s("p",null,"Serverless 应用开发流程",-1),v=s("p",null,[s("strong",null,"以函数计算为例，"),n(" 你可以直接点击"),s("a",{href:"https://fc.console.aliyun.com/fc/service/cn-hangzhou/function/create",target:"_blank",rel:"noreferrer"},"新建函数"),n("的链接进入函数计算控制台，新建一个函数。"),s("strong",null,"请注意，你会用到 HTTP 触发器，函数计算的 HTTP 触发器要在创建函数时就指定。")],-1),B=p("",5),m=p("",17),A=p("",20),_=p("",8),S=p("",6),T=p("",8),b=s("p",null,"函数调用日志",-1),f=s("p",null,[n("基本上，各个云厂商的 FaaS 会选择自己的日志服务来存储函数日志， FaaS 平台也提供了基本的函数监控，包括函数的运行时长、内存使用等。国外也有很多第三方的 SaaS 产品帮你实现 Serverless 应用的日志存储分析、系统监控报警，比如 "),s("a",{href:"https://dashbird.io/",target:"_blank",rel:"noreferrer"},"dashbird"),n("、"),s("a",{href:"https://www.thundra.io/",target:"_blank",rel:"noreferrer"},"thundra"),n("。"),s("strong",null,"国内这方面的产品非常少，我觉得这对你我来说是一个机会。")],-1),x=s("h4",{id:"异常处理",tabindex:"-1"},[n("异常处理 "),s("a",{class:"header-anchor",href:"#异常处理","aria-label":'Permalink to "异常处理"'},"​")],-1),D=s("p",null,"函数在运行过程中，会出现异常情况。当函数执行异常或主动抛出异常时，FaaS 平台会捕捉到异常信息，记录异常日志，并将异常信息以 JSON 对象返回。下面是一个 Node.js 代码抛出异常的示例，在这个例子中，我使用 throw new Error() 主动抛出一个异常的日志：",-1),P=s("p",null,"其中 Response 就是函数返回值，Function Logs 就是调用日志。",-1),k=s("p",null,[n("在传统应用中，一个函数的异常可能会让整个应用崩溃，但在 Serverless 应用中，一个函数异常，只会影响这一次函数的执行。这也是为什么 Serverless 能够提升应用的整体稳定性。"),s("strong",null,"但我还是建议你编写代码时，充分考虑程序的异常，保证代码的健壮性，进一步提升系统稳定性。")],-1),H=s("h3",{id:"总结",tabindex:"-1"},[n("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),j=s("p",null,"这一讲我从宏观上带你学习了如何开发一个 Serverless 应用，以及开发过程中涉及的基础知识。相信通过今天的学习，你可以体会到 Serverless 应用开发与传统开发的区别，比如代码编辑可以在云端进行，而不仅是在本地进行，应用的组成是单个独立的函数，而不是所有功能的集合体。",-1),I=s("p",null,"此外我觉得，对一个 Serverless FaaS 平台来说，除了要具备基本的函数执行能力外，还要提供便利的开发工具、丰富的触发器、完善的日志监控以及与其他服务集成等各方面能力。你在进行技术选型时，也需要考虑这些方面。这一讲我强调这样几个重点：",-1),w=s("ul",null,[s("li",null,[s("p",null,"Serverless 的应用基本组成单位是函数，函数之间互相独立，因此 Serverless 能提高应用稳定性；")]),s("li",null,[s("p",null,"函数定义与触发器和编程语言相关，不同 FaaS 平台的实现不尽相同；")]),s("li",null,[s("p",null,"为了使代码扩展性更强，建议你将业务逻辑拆分到入口函数之外；")]),s("li",null,[s("p",null,"为了使应用稳定性更好，建议你编写函数代码时充分考虑程序异常。")])],-1),N=s("p",null,"在实际工作中，我经常用 Serverless 来处理业务逻辑，比如快速开发一个测试接口、实时处理日志等，如果你有类似需求也可以尝试使用 Serverless 来实现。",-1),R=s("p",null,"本节课的作业相对来讲比较简单，那就是动手实现你的第一个 Serverless 应用，希望你能夯实基础，游刃有余地学习接下来的内容，我们下一讲见。",-1);function L(O,J,V,z,W,$){const a=e("Image");return t(),c("div",null,[E,y,i,u,F,d,l(a,{alt:"Lark20201228-185348.jpeg",src:"https://s0.lgstatic.com/i/image2/M01/04/20/Cip5yF_puUaAJfw3AANPRrI1kS820.jpeg"}),n(),q,l(a,{alt:"1.png",src:"https://s0.lgstatic.com/i/image2/M01/04/28/Cip5yF_qmTqAJI5SAAGC15t2JGc253.png"}),n(),h,C,l(a,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/8C/50/CgqCHl_qmUWAbbsDAADn5znl1KY310.png"}),n(),g,v,l(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image2/M01/03/D5/CgpVE1_jBXmAb9TJAAPuNbsOSKo931.png"}),n(),B,l(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/8B/F1/Ciqc1F_jBYOAFmttAAJZChiCxxw894.png"}),n(),m,l(a,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/8C/50/CgqCHl_qmV-AKjTHAAGR7LVSJSs782.png"}),n(),A,l(a,{alt:"4.png",src:"https://s0.lgstatic.com/i/image/M00/8C/50/CgqCHl_qmXCARXH9AAF-_DuU4lw021.png"}),n(),_,l(a,{alt:"5.png",src:"https://s0.lgstatic.com/i/image/M00/8C/50/CgqCHl_qmXuAZBHIAAGGcHsdzWI696.png"}),n(),S,l(a,{alt:"6.png",src:"https://s0.lgstatic.com/i/image/M00/8C/45/Ciqc1F_qmYWAE9fxAAD1A7kgncU172.png"}),n(),T,l(a,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/8B/F2/Ciqc1F_jBdKAQddrAANmkQx2nJs904.png"}),n(),b,f,x,D,l(a,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/8B/FD/CgqCHl_jBd6AdHX_AAKNGxRYIKQ705.png"}),n(),P,k,H,j,I,l(a,{alt:"7.png",src:"https://s0.lgstatic.com/i/image/M00/8C/50/CgqCHl_qmZCAdIFmAAFS6TtGLlQ407.png"}),n(),w,N,R])}const M=o(r,[["render",L]]);export{K as __pageData,M as default};
