import{_ as o,j as e,o as t,g as c,k as p,h as n,Q as l,s}from"./chunks/framework.4e7d56ce.js";const w=JSON.parse('{"title":"从传统开发模式到异步执行技术 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring 响应式编程实战_文档/(6983) 01  追本溯源：响应式编程究竟是一种什么样的技术体系？.md","filePath":"posts/backEnd/Spring 响应式编程实战_文档/(6983) 01  追本溯源：响应式编程究竟是一种什么样的技术体系？.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/Spring 响应式编程实战_文档/(6983) 01  追本溯源：响应式编程究竟是一种什么样的技术体系？.md"},E=l("",10),i=s("p",null,"图 1 服务 A 和服务 B 的交互过程图",-1),y=s("p",null,"可以看到，当服务 B 向服务 A 发送 HTTP 请求时，线程 B 只有在发起请求和响应结果的一小部分时间内在有效使用 CPU，而更多的时间则只是在阻塞式地等待来自服务 A 中线程的处理结果。显然，整个过程的 CPU 利用效率是很低的，很多时间线程被浪费在了 I/O 阻塞上，无法执行其他的处理过程。",-1),_=s("p",null,"更进一步，我们继续分析服务 A 中的处理过程。如果我们采用典型的 Web 服务分层架构，那么就可以得到如图 2 所示的用户信息查询实现时序图，这是日常开发过程中普遍采用的一种实现方式。",-1),u=s("p",null,"一般我们使用 Web 层所提供的 HTTP 端点作为查询的操作入口，然后该操作入口会进一步调用包含业务逻辑处理的服务层，而服务层再调用数据访问层，数据访问层就会连接到数据库获取数据。数据从数据库中获取之后逐层向上传递，最后返回给服务的调用者。",-1),h=s("p",null,"图 2 基于传统实现方法的用户信息查询场景时序图",-1),d=s("p",null,"显然图 2 所展示的整个过程中，每一步的操作过程都存在着前面描述的线程等待问题。也就是说，整个技术栈中的每一个环节都可能是同步阻塞的。",-1),g=s("p",null,"针对同步阻塞问题，在技术上也可以引入一些实现技术来将同步调用转化为异步调用。我们一起来看一下。",-1),A=s("h4",{id:"异步调用的实现技术",tabindex:"-1"},[n("异步调用的实现技术 "),s("a",{class:"header-anchor",href:"#异步调用的实现技术","aria-label":'Permalink to "异步调用的实现技术"'},"​")],-1),m=s("p",null,"在 Java 世界中，为了实现异步非阻塞，一般会采用回调和 Future 这两种机制，但这两种机制都存在一定局限性。",-1),b=s("p",null,"回调的含义如图 3 所示，即服务 B 的 methodB() 方法调用服务 A 的 methodA() 方法，然后服务 A 的 methodA() 方法执行完毕后，再主动调用服务 B 的 callback() 方法。",-1),F=l("",12),C=s("p",null,"图 4 观察者模式下的用户信息获取过程",-1),T=s("p",null,"如果系统中存在一批类似上图中的用户信息获取场景，针对每个场景都实现一套观察者模式显然是不合适的。更好的方法是使用发布-订阅模式，该模式可以认为是对观察者模式的一种改进。",-1),D=s("p",null,"在这一模式中，发布者和订阅者之间可以没有直接的交互，而是通过发送事件到事件处理平台的方式来完成整合，如下图所示。",-1),B=s("p",null,"图 5 发布-订阅模式下的用户信息获取过程",-1),x=s("p",null,"由此可见，通过发布-订阅模式，我们可以基于同一套事件发布机制和事件处理平台来应对多种业务场景，不同的场景只需要发送不同的事件即可。",-1),P=s("p",null,"同样，如果我们聚焦于服务 A 的内部，那么从 Web 服务层到数据访问层，再到数据库的整个调用链路，同样可以采用发布-订阅模式进行重构。这时候，我们希望当数据库中的数据一有变化就通知上游组件，而不是上游组件通过主动拉取数据的方式来获取数据。下图展示了这一过程。",-1),q=l("",10),v=l("",11);function I(k,U,f,S,V,R){const a=e("Image");return t(),c("div",null,[E,p(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/21/36/Cgp9HWBUHYyAWK7RAACbGUwiNJI141.png"}),n(),i,y,_,u,p(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M01/21/34/CioPOWBUIG2APMzTAAG4Hgs9bQk059.png"}),n(),h,d,g,A,m,b,p(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M01/21/34/CioPOWBUIHmAV0OeAACBv4hHbo0240.png"}),n(),F,p(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M01/21/34/CioPOWBUIISALAvPAACra6PO8ac132.png"}),n(),C,T,D,p(a,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image6/M01/21/34/CioPOWBUIIuAWD5cAAC5GORZj7Y689.png"}),n(),B,x,P,p(a,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image6/M01/21/38/Cgp9HWBUIJSAXaqcAAH7KKi1LAk978.png"}),n(),q,p(a,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image6/M01/21/35/CioPOWBUIJ6AeBjQAADBZrcBck4263.png"}),n(),v])}const N=o(r,[["render",I]]);export{w as __pageData,N as default};
