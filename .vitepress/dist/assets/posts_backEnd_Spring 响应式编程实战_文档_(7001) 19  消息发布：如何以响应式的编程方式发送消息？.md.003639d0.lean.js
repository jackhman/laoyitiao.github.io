import{_ as o,j as e,o as t,g as c,k as l,h as n,s,Q as p}from"./chunks/framework.e0c66c3f.js";const I=JSON.parse('{"title":"案例集成：消息通信机制与 ReactiveSpringCSS 案例 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring 响应式编程实战_文档/(7001) 19  消息发布：如何以响应式的编程方式发送消息？.md","filePath":"posts/backEnd/Spring 响应式编程实战_文档/(7001) 19  消息发布：如何以响应式的编程方式发送消息？.md","lastUpdated":1696338709000}'),r={name:"posts/backEnd/Spring 响应式编程实战_文档/(7001) 19  消息发布：如何以响应式的编程方式发送消息？.md"},E=s("p",null,"通过上一讲的内容，相信你已经对 Reactive Spring Cloud Stream 的基本架构有了全面的了解。今天这一讲，我将基于 ReactiveSpringCSS 案例系统，带你看看如何使用 Reactive Spring Cloud Stream 来完成响应式消息发布者的构建。",-1),y=s("h3",{id:"案例集成-消息通信机制与-reactivespringcss-案例",tabindex:"-1"},[n("案例集成：消息通信机制与 ReactiveSpringCSS 案例 "),s("a",{class:"header-anchor",href:"#案例集成-消息通信机制与-reactivespringcss-案例","aria-label":'Permalink to "案例集成：消息通信机制与 ReactiveSpringCSS 案例"'},"​")],-1),i=s("p",null,"让我们回到 ReactiveSpringCSS 系统，在案例中分别提取 account-service、order-service 和 customer-service 这三个独立的 Web 服务。显然，它们之间需要进行服务之间的调用和协调，从而完成业务闭环。如果在不久的将来，案例系统中需要引入其他服务才能形成完整的业务流程，那么这个业务闭环背后的交互模式就需要进行相应的调整。",-1),u=s("p",null,'在 ReactiveSpringCSS 案例中，你可以想象一个用户的账户信息变动并不会太频繁。因为 account-service 和 customer-service 分别位于两个服务中，为了降低远程交互的成本，很多时候我们会想到把用户的账户信息集中放在缓存里，并在客户工单生成过程中直接从缓存中获取用户账户。在"16 | Redis 集成：如何实现对 Redis 的响应式数据访问"中，我们已经构建了缓存组件。那么，在这样的设计和实现方式下，试想一旦某个用户账户信息发生变化，我们应该如何正确和高效地应对这一场景呢？',-1),g=s("p",null,"一种思路是系统基于一定的时间间隔定时访问 account-service，来获取用户账户信息并存储到缓存中。但考虑到系统的扩展性，这种服务交互模式并不是一个好的选择，因为用户账户信息更新的时机无法事先预知，而事件驱动架构为我们提供了一种更好的实现方案。",-1),d=s("p",null,"当用户账户信息变更时，account-service 可以发送一个事件，该事件表明了某个用户账户信息已经发生了变化，并将这种变化传递到所有相关的服务，这些服务会根据自身的业务逻辑来消费这一事件。通过这种方式，某个特定服务就可以获取用户信息变更事件，从而正确且高效地更新缓存信息。基于这种设计思路，该场景下的交互示意图如下所示。",-1),F=s("p",null,"用户账户信息更新场景中的事件驱动架构",-1),A=s("p",null,[n("上图显示，customer-service 会从缓存中获取更新之后的账户信息以便进行后续的业务处理。而为了简单起见，customer-service 同时也扮演了事件消费者的角色，它将获取到的事件中的账户信息存储到缓存中。"),s("strong",null,"事件处理架构的优势就在于，当系统中需要添加新的用户账户变更事件处理逻辑来完成整个流程时，我们只需要对该事件添加一个新的消费者即可，而不需要调整 customer-service 中的任何逻辑，这在应对系统扩展性上有很大的优势"),n("。")],-1),v=s("h3",{id:"设计-reactivespringcss-中的消息发布场景",tabindex:"-1"},[n("设计 ReactiveSpringCSS 中的消息发布场景 "),s("a",{class:"header-anchor",href:"#设计-reactivespringcss-中的消息发布场景","aria-label":'Permalink to "设计 ReactiveSpringCSS 中的消息发布场景"'},"​")],-1),h=s("p",null,"一般而言，事件在命名上通常采用过去时态以表示该事件所代表的动作已经发生。所以，我们把这里的用户信息变更事件命名为 AccountChangedEvent。",-1),C=s("p",null,"接下来我们关注事件发布者 account-service。在 account-service 中需要设计并实现使用 Spring Cloud Stream 发布消息的各个组件，包括 Source、Channel 和 Binder。我们围绕 AccountChangedEvent 事件给出 account-service 内部的整个实现流程，如下图所示。",-1),b=p("",10),D=s("p",null,"RabbitMQ 中交换器与队列的路由关系图",-1),S=s("p",null,"我们通过查看 pom 文件发现，以下组件被添加到了依赖层级关系。显然，Project Reactor、Spring Messaging、AMQP 以及 RabbitMQ 都包含在这个依赖组件列表中。",-1),m=p("",39);function B(k,M,_,x,f,R){const a=e("Image");return t(),c("div",null,[E,y,i,u,g,d,l(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M00/39/FE/CioPOWB9Vw6AUr-IAABo8xoqMhI205.png"}),n(),F,A,v,h,C,l(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/39/F6/Cgp9HWB9VxeAGIoXAAAzfyglUxc729.png"}),n(),b,l(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M00/39/F6/Cgp9HWB9VyCATO5lAABb6Ms8jdc001.png"}),n(),D,S,l(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M00/39/F6/Cgp9HWB9VyeAZ7HjAABmt5IMKLg048.png"}),n(),m])}const j=o(r,[["render",B]]);export{I as __pageData,j as default};
