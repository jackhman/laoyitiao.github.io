import{_ as o,j as e,o as c,h as t,k as p,f as n,s,Q as l}from"./chunks/framework.d3daa342.js";const R=JSON.parse('{"title":"20消息消费：如何选择可用的高级开发技巧？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring 响应式编程实战_文档/(7002) 20  消息消费：如何选择可用的高级开发技巧？.md","filePath":"posts/backEnd/Spring 响应式编程实战_文档/(7002) 20  消息消费：如何选择可用的高级开发技巧？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/Spring 响应式编程实战_文档/(7002) 20  消息消费：如何选择可用的高级开发技巧？.md"},i=s("h1",{id:"_20消息消费-如何选择可用的高级开发技巧",tabindex:"-1"},[n("20消息消费：如何选择可用的高级开发技巧？ "),s("a",{class:"header-anchor",href:"#_20消息消费-如何选择可用的高级开发技巧","aria-label":'Permalink to "20消息消费：如何选择可用的高级开发技巧？"'},"​")],-1),E=s("p",null,"在上一讲中，我们讨论了 ReactiveSpringCSS 案例中基于 Reactive Spring Cloud Stream 的消息发布场景以及实现方式。今天我将延续上一讲的内容，为你介绍消息消费的应用场景，具体讲解如何在服务中添加消息消费者，以及使用各项消息消费的高级开发技巧。",-1),y=s("h3",{id:"案例集成-reactivespringcss-中的消息消费场景",tabindex:"-1"},[n("案例集成：ReactiveSpringCSS 中的消息消费场景 "),s("a",{class:"header-anchor",href:"#案例集成-reactivespringcss-中的消息消费场景","aria-label":'Permalink to "案例集成：ReactiveSpringCSS 中的消息消费场景"'},"​")],-1),u=s("p",null,"我们继续讨论 ReactiveSpringCSS 案例，根据整个消息交互流程，customer-service 就是 AccountChangedEvent 事件的消费者。根据上一讲讨论的交互流程，customer-service 需要把变更后的用户账户信息更新到 Redis 缓存中。",-1),d=s("p",null,"在 Spring Cloud Stream 中，负责消费消息的是 Sink 组件。因此，我们同样围绕 AccountChangedEvent 事件研究 customer -service 内部的整个实现流程，如下图所示。",-1),g=s("p",null,"customer-service 消息消费实现流程图",-1),h=s("p",null,"在上图中，AccountChangedEvent 事件通过消息中间件发送到 Reactive Spring Cloud Stream 中，Reactive Spring Cloud Stream 通过 Sink 获取消息并交由 ReactiveAccountChangedSink 实现具体的消费逻辑。结合前面提到的消息消费场景下的缓存处理需求，可以想象这个 ReactiveAccountChangedSink 会负责实现缓存相关的处理逻辑。",-1),C=s("p",null,'让我们把消息消费过程与 customer-service 中的业务流程串联起来。我们知道在 customer-service 中存在 ReactiveAccountClient 类，它通过判断缓存中是否存储目标用户账户对象来决定是否需要发起远程调用。我们已经在"16 | Redis 集成：如何实现对 Redis 的响应式数据访问"中构建了 Redis 缓存服务和 ReactiveAccountClient，你可以回顾一下。',-1),b=s("p",null,"下图展示了采用这一设计思想之后的流程。",-1),m=l("",32),v=l("",8),A=l("",15);function F(S,k,_,q,B,D){const a=e("Image");return c(),t("div",null,[i,E,y,u,d,p(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M00/39/FF/CioPOWB9V6CAWFGmAAAz0xnhiFU700.png"}),n(),g,h,C,b,p(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/39/F6/Cgp9HWB9V6yAIG-xAABfdya7AHI916.png"}),n(),m,p(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M00/39/F6/Cgp9HWB9V8SAKe9gAABJm91wiNA781.png"}),n(),v,p(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M00/39/FF/CioPOWB9V8yAMJXvAABkVap33sE282.png"}),n(),A])}const x=o(r,[["render",F]]);export{R as __pageData,x as default};
