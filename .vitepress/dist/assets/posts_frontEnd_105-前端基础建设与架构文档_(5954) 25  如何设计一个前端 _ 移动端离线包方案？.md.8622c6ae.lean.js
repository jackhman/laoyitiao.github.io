import{_ as l,D as t,o as e,g as r,J as n,h as o,Q as p,m as s}from"./chunks/framework.f67d7268.js";const w=JSON.parse('{"title":"25如何设计一个前端+移动端离线包方案？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/105-前端基础建设与架构文档/(5954) 25  如何设计一个前端 + 移动端离线包方案？.md","filePath":"posts/frontEnd/105-前端基础建设与架构文档/(5954) 25  如何设计一个前端 + 移动端离线包方案？.md","lastUpdated":1696682708000}'),c={name:"posts/frontEnd/105-前端基础建设与架构文档/(5954) 25  如何设计一个前端 + 移动端离线包方案？.md"},i=p("",5),u=s("p",null,"hybrid 页面加载流程图",-1),E=s("p",null,'我们看上图，从一个原生页面点击按钮，打开一个 hybrid 页面，首先经过原生页面路由，识别到"这是在访问一个 hybrid 页面"，此时原生会启动一个 WebView 容器，接着就是一个正常的前端加载并渲染页面的流程了。',-1),y=s("p",null,"图中以前端 CSR 方式为例，首先请求并加载 HTML，接着以 HTML 为起点，请求 JavaScript、CSS 等静态资源，并由 JavaScript 发送数据请求，最终完成页面内容的加载和渲染。",-1),q=s("p",null,"整个路径分成了两大路径：客户端阶段、前端阶段，单一一个阶段我们都有多种优化方法，比如对于 WebView 容器的启动，客户端可以提前启动 WebView 容器池，这样在真正访问 hybrid 页面时，可以复用已储备好的 WebView 容器。再比如，前端渲染架构我们可以从 CSR 切换到 SSR，这样在一定程度上能保证首屏页面的直出，达到更好的 FMP、FCP 等时间。",-1),d=s("h3",{id:"相应优化策略",tabindex:"-1"},[o("相应优化策略 "),s("a",{class:"header-anchor",href:"#相应优化策略","aria-label":'Permalink to "相应优化策略"'},"​")],-1),_=s("p",null,"我们结合下图，简单总结一下各阶段、各个方向能够做的优化：",-1),F=p("",3),h=p("",11),g=p("",16),C=s("p",null,"离线服务平台，按照离线版本整体下发资源如下图：",-1),A=s("p",null,"离线服务平台，扁平化增量下发离线资源如下图：",-1),m=p("",32),b=s("p",null,"性能优化是一个宏大的话题，我们不仅需要在前端领域做到性能最优，还要有更高的视角，在业务全链路上，做到性能最优。而离线包方案就是一个典型的例子，它突破了传统狭隘前端，需要各个业务团队协调配合。比如客户端业务团队、客户端基础（容器）团队、前端团队、数据分析团队、测试团队等。",-1),B=s("p",null,"架构一定需要跨栈，一定需要全链路交付。本小节只是一个例子，希望你能够统筹更多技术领域和方案，做到精益求精。最后给大家留一个思考题，你平时是如何做性能优化的呢？欢迎在留言区和我分享你的见解。",-1),S=s("p",null,'脚手架是工程化中不可缺少的一环，对于前端来说，从零开始建立一个项目是复杂的，因此也就存在了较多类型的脚手架，下一讲，我们就深入这些脚手架的原理，设计一个"万能"项目脚手架。',-1);function T(D,f,x,P,k,X){const a=t("Image");return e(),r("div",null,[i,n(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M00/13/52/CioPOWBCA5CAZIzqAAGkwtGXYaA804.png"}),o(),u,E,y,q,d,_,n(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/13/56/Cgp9HWBCA52ALpQQAAHfBIfq1n8051.png"}),o(),F,n(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M00/13/52/CioPOWBCA6aAB75pAADw_xOfKTc067.png"}),o(),h,n(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M00/13/56/Cgp9HWBCA7KAYIKjAAIKCr4qyTY760.png"}),o(),g,n(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M00/13/52/CioPOWBCA7yAP6IoAADYvA6Rnsw422.png"}),o(),C,n(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M00/13/56/Cgp9HWBCA8KAFbTzAAInYHODFAs553.png"}),o(),A,n(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image6/M00/13/56/Cgp9HWBCA8iAIfqiAAHDgAO3vzI640.png"}),o(),m,n(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M01/13/53/CioPOWBCA9eAWIaQAAPOEhBxr58371.png"}),o(),b,B,S])}const M=l(c,[["render",T]]);export{w as __pageData,M as default};
