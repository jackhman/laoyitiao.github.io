import{_ as o,j as e,o as t,h as r,k as p,f as n,Q as l,s}from"./chunks/framework.d3daa342.js";const m=JSON.parse('{"title":"19配置更新：如何理解配置信息自动更新的工作原理？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4764) 19  配置更新：如何理解配置信息自动更新的工作原理？.md","filePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4764) 19  配置更新：如何理解配置信息自动更新的工作原理？.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/Spring Cloud 原理与实战_文档/(4764) 19  配置更新：如何理解配置信息自动更新的工作原理？.md"},E=l("",17),y=s("p",null,"配置信息自动更新的三大问题",-1),i=s("p",null,"针对这三个问题，接下去我们将结合源码逐一展开讨论。",-1),F=s("h3",{id:"问题一-如何自动调用服务器端所暴露的-actuator-bus-refresh-端点",tabindex:"-1"},[n("问题一：如何自动调用服务器端所暴露的 /actuator/bus-refresh 端点？ "),s("a",{class:"header-anchor",href:"#问题一-如何自动调用服务器端所暴露的-actuator-bus-refresh-端点","aria-label":'Permalink to "问题一：如何自动调用服务器端所暴露的 /actuator/bus-refresh 端点？"'},"​")],-1),u=s("p",null,"在现代软件开发过程中，开放式平台是一种常见的软件服务形态。我们可以把 Spring Cloud Config Server 所提供的 HTTP 端点视为一种开放式的接口，以供 Git 等第三方工具进行访问和集成。",-1),g=s("p",null,"正如前面提到的，可以把服务器端 /actuator/bus-refresh 端点对外进行暴露。第三方工具可以通过这个暴露的端点进行集成。例如，在 Git 中设计了一种 Webhook 的机制，并提供了用户界面供我们配置所需要集成的端点以及对应的操作，操作方法如下图所示：",-1),d=s("p",null,"GitHub 的 Webhook 配置界面（来自 GitHub 官网）",-1),C=s("p",null,"我们可以在上图的 Payload URL 中设置 /actuator/bus-refresh 端点地址。所谓的 Webhook，实际上就是一种回调。通过 Webhook，当我们提交代码时，Git 就会自动调用所配置的 HTTP 端点。也就是说，可以根据配置项信息的更新情况自动实现对 /actuator/bus-refresh 端点的访问。基于 GitHub 的配置仓库实现方案，我们可以得到如下所示的系统结构图：",-1),h=l("",10),f=l("",15),v=s("p",null,"这里给你留一道思考题：在 Spring Cloud Config 中，当位于配置服务器中的配置信息发生变更时，如何让各个客户端保持同步更新呢？",-1),A=s("p",null,'我们在讨论配置中心时提到了可以基于事件发送和消费机制来实现配置信息的动态更新。而事件的发送和消费往往需要依赖于消息通信机制以及主流的一些消息中间件，从下课时开始，我们将进入"消息通信"这个主题，来学习 Spring Cloud 中提供的 Spring Cloud Stream 组件。',-1);function B(S,D,b,_,R,q){const a=e("Image");return t(),r("div",null,[E,p(a,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image/M00/71/02/CgqCHl-8tdaARDnSAAILdvIy2rY358.png"}),n(),y,i,F,u,g,p(a,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image/M00/71/02/CgqCHl-8tgeAQinZAAIZRVRUJlg664.png"}),n(),d,C,p(a,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image/M00/70/F7/Ciqc1F-8thCAZH8zAAJ1ROnnAWA097.png"}),n(),h,p(a,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image/M00/70/F7/Ciqc1F-8th6AZ2x1AAHYWGinWKg842.png"}),n(),f,p(a,{alt:"Spring Cloud 19金句.png",src:"https://s0.lgstatic.com/i/image/M00/70/F6/Ciqc1F-8tfWAMyg1AAVRdOi-aI0550.png"}),n(),v,A])}const k=o(c,[["render",B]]);export{m as __pageData,k as default};
