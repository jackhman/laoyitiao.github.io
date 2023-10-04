import{_ as o,j as e,o as t,g as c,k as n,h as p,Q as l,s}from"./chunks/framework.e0c66c3f.js";const f=JSON.parse('{"title":"消息队列与 RocketMQ ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/SpringCloud Alibaba 实战_文档/(6762) 17  消息队列：基于 RocketMQ 实现服务异步通信.md","filePath":"posts/backEnd/SpringCloud Alibaba 实战_文档/(6762) 17  消息队列：基于 RocketMQ 实现服务异步通信.md","lastUpdated":1696338709000}'),r={name:"posts/backEnd/SpringCloud Alibaba 实战_文档/(6762) 17  消息队列：基于 RocketMQ 实现服务异步通信.md"},y=l("",8),E=s("p",null,"系统间跨进程通信",-1),i=s("p",null,"虽然从逻辑上是没有问题的，但是从技术层面却衍生出三个新问题：",-1),F=s("ul",null,[s("li",null,[s("p",null,"假如上报时省级税务系统正在升级维护，市级税务系统就必须设计额外的重发机制保证数据的完整性；")]),s("li",null,[s("p",null,"假如省级税务系统接收数据需要 1 分钟处理时间，市级税务系统采用同步通信，则市级税务系统传输线程就要阻塞 1 分钟，在高并发场景下如此长时间的阻塞很容易造成系统的崩溃；")]),s("li",null,[s("p",null,"假如省级税务系统接口的调用方式、接口、IP、端口有任何改变，都必须立即通知市级税务系统进行调整，否则就会出现通信失败。")])],-1),u=s("p",null,"从以上三个问题可以看出，省级系统产生的变化直接影响到市级税务系统的执行，两者产生了强耦合，如果问题放在互联网的微服务架构中，几十个服务进行串联调用，每个服务间如果都产生类似的强耦合，系统必然难以维护。",-1),d=s("p",null,"为了解决这种情况，我们需要在架构中部署消息中间件，这个组件应提供可靠的、稳定的、与业务无关的特性，使进程间通信解耦，而这一类消息中间件的代表产品就是 MQ 消息队列。当引入 MQ 消息队列后，消息传递过程会产生以下变化。",-1),A=l("",7),C=l("",3),g=l("",6),D=l("",38),m=l("",13),B=l("",27);function k(b,h,v,S,M,_){const a=e("Image");return t(),c("div",null,[y,n(a,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M00/33/1C/Cgp9HWBu2EuANOnqAAEJZsgHoCk159.png"}),p(),E,i,F,u,d,n(a,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M00/33/24/CioPOWBu2FaAD6pQAAEtpzXgzW8765.png"}),p(),A,n(a,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image6/M00/33/1C/Cgp9HWBu2GKABJW5AAPatFf4EbA571.png"}),C,n(a,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image6/M00/33/1C/Cgp9HWBu2G-ASqw3AAELZIiTELk603.png"}),p(),g,n(a,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image6/M00/33/24/CioPOWBu2HyAJB6-AACJ2Or_yLg890.png"}),p(),D,n(a,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image6/M00/33/1C/Cgp9HWBu2J6APWfJAAH7nUt8GHs198.png"}),p(),m,n(a,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M00/33/24/CioPOWBu2KuAeQ6nAAEtpzXgzW8352.png"}),p(),B])}const T=o(r,[["render",k]]);export{f as __pageData,T as default};
