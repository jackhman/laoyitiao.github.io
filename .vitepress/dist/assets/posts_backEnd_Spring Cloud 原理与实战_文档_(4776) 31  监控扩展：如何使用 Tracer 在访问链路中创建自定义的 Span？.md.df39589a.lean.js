import{_ as o,j as e,o as t,h as c,k as p,f as n,s,Q as l}from"./chunks/framework.d3daa342.js";const R=JSON.parse('{"title":"31监控扩展：如何使用Tracer在访问链路中创建自定义的Span？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4776) 31  监控扩展：如何使用 Tracer 在访问链路中创建自定义的 Span？.md","filePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4776) 31  监控扩展：如何使用 Tracer 在访问链路中创建自定义的 Span？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/Spring Cloud 原理与实战_文档/(4776) 31  监控扩展：如何使用 Tracer 在访问链路中创建自定义的 Span？.md"},E=s("h1",{id:"_31监控扩展-如何使用tracer在访问链路中创建自定义的span",tabindex:"-1"},[n("31监控扩展：如何使用Tracer在访问链路中创建自定义的Span？ "),s("a",{class:"header-anchor",href:"#_31监控扩展-如何使用tracer在访问链路中创建自定义的span","aria-label":'Permalink to "31监控扩展：如何使用Tracer在访问链路中创建自定义的Span？"'},"​")],-1),y=s("p",null,"在了解了 Spring Cloud Sleuth 的基本工作原理以及与 Zipkin 之间的集成方案之后，我们不禁要想，虽然内置的日志埋点和采集功能已经能够满足日常开发的大多数场景需要，但如果我想在业务系统中重点监控某些业务操作时，是不是有办法来创建自定义的 Span 并纳入可视化监控机制中呢？答案是肯定的，今天的内容我们就围绕如何使用 Spring Cloud Sleuth 底层的 Brave 框架在服务访问链路中添加自定义Span这一话题展开讨论。",-1),i=s("h3",{id:"使用-brave-创建自定义-span",tabindex:"-1"},[n("使用 Brave 创建自定义 Span "),s("a",{class:"header-anchor",href:"#使用-brave-创建自定义-span","aria-label":'Permalink to "使用 Brave 创建自定义 Span"'},"​")],-1),d=s("p",null,"从 2.X 版本开始，Spring Cloud Sleuth 全面使用 Brave 作为其底层的服务跟踪实现框架。原本在 1.X 版本中通过 Spring Cloud Sleuth 自带的 org.springframework.cloud.sleuth.Tracer 接口创建和管理自定义 Span 的方法将不再有效。因此，想要在访问链路中创建自定义的 Span，需要对 Brave 框架所提供的功能有足够的了解。",-1),u=s("p",null,"事实上，Brave 是 Java 版的 Zipkin 客户端，它将收集的跟踪信息，以 Span 的形式上报给 Zipkin 系统。我们首先来关注 Brave 中的 Span 类，该类的方法列表如下所示：",-1),F=l("",39),S=l("",7),h=s("p",null,"Zipkin 中系统自动生成 Span 效果界面",-1),v=s("p",null,"显然，这三个 Span 都是系统自定生成的。现在我们重新启动 device-service，然后再次访问该端口，就会得到如下图所示的可视化效果：",-1),C=s("p",null,"Zipkin中添加自定义Span效果界面",-1),g=s("p",null,'请注意在上图中，我们看到在原有默认可视化效果的基础上又多了一个名为"findByDeviceCode"的自定义 Span。点击该 Span，我们也将得到这个 Span 对应的各项事件明细数据，如下图所示：',-1),m=s("p",null,"Zipkin 中自定义 Span 中每个关键事件明细数据界面",-1),A=s("p",null,'这里看到了"deviceObtained"这个自定义事件。同时，基于数据，我们也不难发现在 device-service 处理请求的时间中实际上大部分是消耗在访问数据库以获取设备数据的过程中。同样，我们也可以在其他服务中添加不同的 Span 以实现对服务调用过程更加精细化的管理。',-1),_=s("h3",{id:"小结与预告",tabindex:"-1"},[n("小结与预告 "),s("a",{class:"header-anchor",href:"#小结与预告","aria-label":'Permalink to "小结与预告"'},"​")],-1),B=s("p",null,"自定义 Span 是我们在日常开发过程中进程使用的一项工程实践，通过在业务系统中嵌入各种 Span 能够帮助开发人员找到系统中的性能瓶颈点从而为系统重构和优化提供抓手。在 Spring Cloud Sleuth 中，Brave 框架可以用来创建自定义的 Span，而上一课时中介绍的 Zipkin 框架则也可以对这些自定义 Span 实现可视化。本课时对这些具体的开发工作做了详细的介绍并结合 SpringHealth 案例给出了示例代码。",-1),D=s("p",null,"这里给你留一道思考题：通过 Brave 框架，开发人员创建自定义 Span 有哪些具体的实现方法？",-1),b=s("p",null,"在介绍完服务监控之后，接下来是整个课程的最后一个主题，即微服务测试。我们将先从微服务系统中与测试相关的需求和解决方案讲起并引出 Spring 家族中的 Spring Cloud Contract 框架。",-1);function k(q,T,f,w,x,N){const a=e("Image");return t(),c("div",null,[E,y,i,d,u,p(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image2/M01/04/49/CgpVE1_sSpqAX8fHAAAsCx2fAiU688.png"}),n(),F,p(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/8C/65/Ciqc1F_sSrKAUJKgAAAtpNjayF4547.png"}),n(),S,p(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/8C/71/CgqCHl_sSr2AH503AABAn4kpV9A498.png"}),n(),h,v,p(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/8C/65/Ciqc1F_sSsiATG_0AABPUjTB7og302.png"}),n(),C,g,p(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/8C/65/Ciqc1F_sSs-ACuYCAABBZOB6BPU918.png"}),n(),m,A,_,B,D,b])}const P=o(r,[["render",k]]);export{R as __pageData,P as default};
