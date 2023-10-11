import{_ as p,D as l,o,g as r,J as e,h as s,m as a,Q as t}from"./chunks/framework.f67d7268.js";const j=JSON.parse('{"title":"第12讲：剖析Trace在SkyWalking中的落地实现方案（上）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1732) 第12讲：剖析 Trace 在 SkyWalking 中的落地实现方案（上）.md","filePath":"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1732) 第12讲：剖析 Trace 在 SkyWalking 中的落地实现方案（上）.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/098-讲带你搞懂 SkyWalking文档/(1732) 第12讲：剖析 Trace 在 SkyWalking 中的落地实现方案（上）.md"},i=a("h1",{id:"第12讲-剖析trace在skywalking中的落地实现方案-上",tabindex:"-1"},[s("第12讲：剖析Trace在SkyWalking中的落地实现方案（上） "),a("a",{class:"header-anchor",href:"#第12讲-剖析trace在skywalking中的落地实现方案-上","aria-label":'Permalink to "第12讲：剖析Trace在SkyWalking中的落地实现方案（上）"'},"​")],-1),y=a("p",null,"通过前面几课时的学习，我们已经了解 SkyWalking Agent 启动的基本流程、插件增强代码的基本逻辑以及核心 BootService 实现的功能。从本课时开始，我们将深入分析 SkyWalking Agent 中 Trace 相关的基础组件。",-1),E=a("p",null,"在 04 课时中我们介绍了 OpenTracing 的基本概念，SkyWalking 中 Trace 的相关概念以及实现类与 OpenTracing 中的概念基本类似，像 Trace、Span、Tags、Logs 等核心概念，在 SkyWalking Agent 中都有对应实现，只是在细微实现上略有区别的，其中最重要的是： SkyWalking 的设计在 Trace 级别和 Span 级别之间加了一个 Segment 概念，用于表示一个服务实例内的 Span 集合。",-1),g=a("h3",{id:"trace-id",tabindex:"-1"},[s("Trace ID "),a("a",{class:"header-anchor",href:"#trace-id","aria-label":'Permalink to "Trace ID"'},"​")],-1),S=a("p",null,"在分布式链路追踪系统中，用户请求的处理过程会形成一条 Trace 。Trace ID 作为 Trace 数据的唯一标识，在面对海量请求的时候，需要保证其唯一性。与此同时，还要保证生成 Trace ID 不会带来过多开销，所以在业务场景中依赖数据库（自增键或是类似 Meituan-Dianping/Leaf 的 ID 生成方式）都不适合 Trace 的场景。",-1),d=a("p",null,"这种要求快速、高性能生成唯一 ID 的需求场景，一般会将 snowflake 算法与实际的场景集合进行改造。",-1),T=a("blockquote",null,[a("p",null,"snowflake 算法是 Twitter 开源的分布式 ID 生成算法 。snowflake 算法的核心思想是将一个 ID（long类型）的 64 个 bit 进行切分，其中使用 41 个 bit 作为毫秒数，10 个 bit 作为机器的 ID（ 5 个 bit 记录数据中心的 ID，5 个 bit 记录机器的 ID ），12 bit 作为毫秒内的自增 ID，还有一个 bit 位永远是 0。snowflake 算法生成的 ID 结构如下图所示：")],-1),D=t("",11),_=t("",8),A=a("h3",{id:"span",tabindex:"-1"},[s("Span "),a("a",{class:"header-anchor",href:"#span","aria-label":'Permalink to "Span"'},"​")],-1),h=a("p",null,"TraceSegment 是由多个 Span 构成的，AbstractSpan 抽象类是 SkyWalking 对 Span 概念的抽象，下图是 Span 的继承关系：",-1),m=t("",16),u=a("p",null,"其中，请求相应的 EntrySpan 处理流程如下：",-1),I=a("ol",null,[a("li",null,"当请求经过 Tomcat 插件时（即图中 ① 处），会创建 EntrySpan 并第一次调用 start() 方法，启动该 EntrySpan。")],-1),k=a("p",null,"在 start() 方法中会有下面几个操作：",-1),C=a("ol",null,[a("li",null,"将 stackDepth 字段（定义在 StackBasedTracingSpan 中）加 1，stackDepth 表示当前所处的插件栈深度 。"),a("li",null,"更新 currentMaxDepth 字段（定义在 EntrySpan 中），currentMaxDepth 会记录该EntrySpan 到达过的插件栈的最深位置。"),a("li",null,"此时第一次启动 EntrySpan 时会更新 startTime 字段，记录请求开始时间。")],-1),b=a("p",null,"此时插件栈（这是为了方便理解而虚拟出来一个栈结构，实际上只有 stackDepth、currentMaxDepth 两个字段，并不会用到栈结构，也不会记录请求经过的插件）的状态如下图所示：",-1),F=a("ol",null,[a("li",null,"当请求经过 Spring MVC 插件时（即图中 ② 处），不会再创建新的 EntrySpan 了，而重新调用该 EntrySpan 的 start() 方法，其中会继续将 stackDepth 以及 currentMaxDepth 字段加 1 。注意，再次调用 start() 方法时不会更新 startTime 字段了，因为请求已经开始处理了。此时插件栈的状态如下图：")],-1),x=a("ol",{start:"2"},[a("li",null,"当请求经过业务逻辑处理完成之后，开始进入 Spring MVC 插件的后置处理逻辑时（即图中 ③ 处），会第 1 次调用 EntrySpan.finish() 方法，其中会将 stackDepth 减 1，即 Spring MVC 插件出栈，此时插件栈的状态如下图：")],-1),v=a("ol",{start:"3"},[a("li",null,"最后进入 Tomcat 插件的后置处理逻辑（即图中 ④ 处），其中会第 2 次调用 finish() 方法，此时 stackDepth 再次减 1，此时 stackDepth 减到了 0 ，整个插件栈已经空了，会调用父类 AbstractTracingSpan 的 finish() 方法将当前 EntrySpan 添加到关联的 TraceSegment 中。")],-1),f=a("p",null,"这里需要注意两个点，一是在调用 start() 方法时，会将之前设置的 component、Tags、Log 等信息全部清理掉（startTime不会清理），上例中请求到 Spring MVC 插件之前（即 ② 处之前）设置的这些信息都会被清理掉。二是 stackDepth 与 currentMaxDepth 不相等时（上例中 ③ 处），无法记录上述字段的信息。通过这两点，我们知道 EntrySpan 实际上只会记录最贴近业务侧的 Span 信息。",-1),V=a("p",null,'StackBasedTracingSpan 除了将"栈"概念与 EntrySpan 结合之外，还添加了 peer（以及 peerId）字段来记录远端地址，在发送远程调用时创建的 ExitSpan 会将该记录用于对端地址。',-1),B=a("p",null,'ExitSpan 表示的是出口 Span，如果在一个调用栈里面出现多个插件嵌套的场景，也需要通过"栈"的方式进行处理，与上述逻辑类似，只会在第一个插件中创建 ExitSpan，后续调用的 ExitSpan.start() 方法并不会更新 startTime，只会增加栈的深度。当然，在设置 Tags、Log 等信息时也会进行判断，只有 stackDepth 为 1 的时候，才会能正常写入相应字段。也就是说，ExitSpan 中只会记录最贴近当前服务侧的 Span 信息。',-1),L=a("p",null,"一个 TraceSegment 可以有多个 ExitSpan，例如，Dubbo A 服务在处理一个请求时，会调用 Dubbo B 服务，在得到响应之后，会紧接着调用 Dubbo C 服务，这样，该 TraceSegment 就有了两个完全独立的 ExitSpan。",-1),P=a("p",null,"LocalSpan 则比较简单，它表示一个本地方法调用。LocalSpan 直接继承了 AbstractTracingSpan，由于它未继承 StackBasedTracingSpan，所以也不能 start 或 end 多次，在后面介绍 @Trace 注解的相关实现时，还会看到 LocalSpan 的身影。",-1);function M(q,N,W,w,R,G){const n=l("Image");return o(),r("div",null,[i,y,E,g,S,d,T,e(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0F/64/Ciqah16VfwaAEYUXAAC78xKXneM112.png"}),s(),D,e(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/88/7B/Cgq2xl6VfwaAB4GAAAFOERcgywg625.png"}),s(),_,e(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/02/36/CgoCgV6VfwaAEtowAADhKpdKuG0436.png"}),s(),A,h,e(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0F/64/Ciqah16VfwaAJq2eAAZosgpl-BI763.png"}),s(),m,e(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/88/7B/Cgq2xl6VfwaAd0xmAACgHgi81uw389.png"}),s(),u,I,k,C,b,e(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/02/36/CgoCgV6VfwaAWkKiAAAqvVnOln8393.png"}),s(),F,e(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0F/64/Ciqah16VfwaANG0kAABAG6dzBaI841.png"}),s(),x,e(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/88/7B/Cgq2xl6VfweAXIYCAAAtlNICZdM619.png"}),s(),v,f,V,B,L,P])}const $=p(c,[["render",M]]);export{j as __pageData,$ as default};
