import{_ as a,o as e,g as t,Q as p}from"./chunks/framework.e0c66c3f.js";const _=JSON.parse('{"title":"跨语言交互协议的由来和雏形 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/应用性能分析实战_文档/(7063) 14  互通有无：如何设计跨语言的 APM 交互协议？.md","filePath":"posts/backEnd/应用性能分析实战_文档/(7063) 14  互通有无：如何设计跨语言的 APM 交互协议？.md","lastUpdated":null}'),n={name:"posts/backEnd/应用性能分析实战_文档/(7063) 14  互通有无：如何设计跨语言的 APM 交互协议？.md"},l=p('<p>开源的 APM 产品的跨语言交互协议，以 2010 年 Google 发布 Dapper 论文的时间为节点，切分为两个阶段。</p><ul><li><p>论文发布前，大多数跨语言交互协议的设计能简单解决上下游两个应用无法<strong>串联</strong>的问题即可；</p></li><li><p>论文发布后，跨语言交互的协议设计就不仅是为了解决上下游串联的问题。大多数 APM 产品设计出来的跨语言交互协议，还支持全局入口溯源、断链原因分析、核心业务场景追踪等问题的解决。</p></li></ul><p>而 CAT 和 SkyWalking 也分别是前后两个阶段的典型代表性 APM 工具。</p><p>所以今天，我会通过讲解这两个 APM 工具的跨语言交互协议的设计，带你纵观 APM 工具的跨语言交互协议的发展历程。</p><h3 id="跨语言交互协议的由来和雏形" tabindex="-1">跨语言交互协议的由来和雏形 <a class="header-anchor" href="#跨语言交互协议的由来和雏形" aria-label="Permalink to &quot;跨语言交互协议的由来和雏形&quot;">​</a></h3><p>当代的互联网架构非常复杂，通常的表象是分布式集群、异构语言、横跨多个机房中心等。所以这时我们需要一种中间协议，帮我们快速理解请求在分布式架构中的行为意义，并帮我们分析性能问题。这时，跨语言交互协议就应运而生了。</p><p>起初，我们的诉求也很简单：就是可以把多个节点上，处理一次用户行为的日志串联起来就可以了。</p><p>通过调研发现，常用的 RPC 框架都是提供了可用于传出的协议头部属性，如 HTTP 消息中的 Header 属性。将任务线程的标识通过 HTTP Header 属性进行传输，就可以实现两个任务线程的串联。<strong>这就是最早的标记方案的由来。</strong></p><blockquote><p>关于标记方案，你可以回顾<a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=729#/detail/pc?id=7058&amp;fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">&quot;09 | OpenTracing 解密: Dapper 说它是树，SkyWalking 说它是图&quot;</a>。</p></blockquote><p><strong>【CAT 跨语言交互协议】</strong></p><p>CAT 的跨语言交互协议显然就是标记方案的先驱者，CAT 的跨语言交互协议中有三个属性。</p><ul><li><p>_catRootMessageId：用于标识一条链路的唯一 ID，当 HTTP Header 中没有此属性时，开发人员就需要生成此属性，用于请求在全局的染色，这就是全局链路 ID。</p></li><li><p>_catParentMessageId：用于标识父任务线程的唯一 ID，在 HTTP 请求发生时，告诉方法的提供者，上游是谁。</p></li><li><p>_catChildMessageId：可以用于告诉下游，是谁在调用。</p></li></ul><p>不难发现，三个属性任选其一，都可以完成分布式链路的串联。</p><p><strong>由此可见，分布式链路追踪的实现并不难，难的是真正能经受住生产上考验。</strong></p><h3 id="跨语言交互协议的改进" tabindex="-1">跨语言交互协议的改进 <a class="header-anchor" href="#跨语言交互协议的改进" aria-label="Permalink to &quot;跨语言交互协议的改进&quot;">​</a></h3><p>CAT 虽然告诉了开发者&quot;如何实现分布式追踪&quot;，但由于开发量大、展示效果差，所以用户案例上很少见到实战案例，其中最主要的问题有以下两个。</p><ul><li><p>其一是跨语言传输协议不够标准，这也是 Google 公司发布 Dapper 论文对后世影响的真正意义所在。Dapper 论文中提到：跨语言交互协议的重要属性有 ParentID 和 SpanID，ParentID 与 CAT 的 _catParentMessageId 属性如出一辙，而 SpanID 就是发生 RPC 调用的代码段落的标识。</p></li><li><p>Google 内部通过自实现 RPC 框架，从而无侵入实现链路追踪，这也是 CAT 很少进行分布式链路实战案例的其二原因。</p></li></ul><p>CAT 要实现分布式监控需要手动编写的代码太多了。换句话说就是，只有当集群所有应用，编写分布式追踪代码覆盖的场景足够多时，才能看到收益。</p><p>而后来者 SkyWalking 的跨语言交互设计，在采样落地、问题定位上都迈出了很大一步。</p><h3 id="skywalking-跨语言交互协议" tabindex="-1">SkyWalking 跨语言交互协议 <a class="header-anchor" href="#skywalking-跨语言交互协议" aria-label="Permalink to &quot;SkyWalking 跨语言交互协议&quot;">​</a></h3><p>SkyWalking 的跨语言传输协议中，总共有以下六大属性，每个属性在不同场景中都扮演着重要的角色，下面就重要属性的设计进行分析。</p><h4 id="_1-采样标记" tabindex="-1">1.采样标记 <a class="header-anchor" href="#_1-采样标记" aria-label="Permalink to &quot;1.采样标记&quot;">​</a></h4><p>SkyWalking 使用<strong>布尔对象</strong>来表述采样标记，默认需要采样；只有在不需要采样的场景中，采样标记设置为 false。</p><p>而不需要采样的场景有以下两种。</p><ul><li>指定忽略部分追踪监控数据：激活采样插件（apm-trace-ignore-plugin），通过设置不采样的端点（Endpoint，可以理解为任务线程的首个 Span 的描述）后，任务线程中监控数据会被渲染为不采样。</li></ul><blockquote><p>那有些同学可能会问了：为什么还要采集监控数据，然后渲染成不采样呢？直接连监控数据都不采集不好吗？这个问题我先埋个&quot;坑&quot;，我将在&quot;16 | 采样设计：资源有限，如何实现数据的低损耗、高收集？&quot;与你讲解。</p></blockquote><ul><li>设置采样率：SkyWalking 探针客户端支持采样率的设置，通过随机固定比例的采样策略，将海量的数据的部分数据，染色成不采样数据。</li></ul><p>关于 SkyWalking 的采样场景，我们需要注意的是，没有被采样到的任务线程数据是无法被发送到收集端的。而这与<a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=729#/detail/pc?id=7059&amp;fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">&quot;10 | 亲和线程模型：分布式链路追踪，学习 SkyWalking 就够了&quot;</a>中防止内存泄漏的场景是有区别的：由于监控数据是存储在任务线程的本地线程变量中的，当监控数据过多时，就会无法回收掉监控数据，从而造成内存溢出故障。</p><p>所以任务线程中的监控数据超过一定容量时，接下来的监测点所产生的监控数据，会通过原子模式，将引用指向原子对象以防内存溢出。所以这个任务线程的监控数据，依然会被发送到收集端，但是服务端只会接收到部分数据。</p><h4 id="_2-追踪-id-globaltraceid" tabindex="-1">2.追踪 ID（globalTraceID） <a class="header-anchor" href="#_2-追踪-id-globaltraceid" aria-label="Permalink to &quot;2.追踪 ID（globalTraceID）&quot;">​</a></h4><p>也是全链路跟踪 ID，内容类型为数组类型。</p><p>还记得<a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=729#/detail/pc?id=7058&amp;fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">&quot;09 | OpenTracing 解密: Dapper 说它是树，SkyWalking 说它是图&quot;</a>中的 SkyWalking 图形追踪模型么？SkyWalking 的链路追踪模型，为了兼容分布式事务或是消息队列等批处理框架，所以将全链路追踪 ID 的内容类型扩展为数组类型。</p><p>实现方案不仅体现在任务线程中的本地线程变量中，还会在跨语言调用时，将全链路信息封装在交互协议中；而且 SkyWalking 为了更高效、优雅传递，所以将大串的数组，通过 BASE 64 编码成一个字符串。</p><h4 id="_3-父跟踪段-id-parentsegmentid" tabindex="-1">3.父跟踪段 ID（parentSegmentId） <a class="header-anchor" href="#_3-父跟踪段-id-parentsegmentid" aria-label="Permalink to &quot;3.父跟踪段 ID（parentSegmentId）&quot;">​</a></h4><p>可以理解为调用服务的任务线程的唯一标识，所以和 CAT 跨链路交互协议中的 PARENT 所表述的意思是一样的。区别是在实现方案上，SkyWalking 通过使用探针无侵入的技术方案，在调用服务的任务线程开始被监控时，通过雪花算法生成唯一的跟踪段 ID。</p><blockquote><p>雪花算法用于生成全局标识，SkyWalking 的实现方案是环境标识+线程标识+自增 ID 实现。</p></blockquote><p>因为在最终调用时，永远是一个任务线程发起的远程调用，所以与协议中的追踪 ID 内容类型不同的是，父跟踪段 ID 的内容类型是字符串类型。</p><h4 id="_4-父段-id-parentspanid" tabindex="-1">4.父段 ID（parentSpanId） <a class="header-anchor" href="#_4-父段-id-parentspanid" aria-label="Permalink to &quot;4.父段 ID（parentSpanId）&quot;">​</a></h4><p>在一个任务线程监控数据中，监控着很多代码段，如 SpringMVC 的监控、RPC 调用监控、Mysql 调用监控。常见的如上游应用服务，通过 RPC 框架组件调用下游应用服务时，当前调用服务使用的 RPC 调用代码段的 SpanID 就是父段 ID，传递此属性有助于链路数据更好地在 UI 页面上渲染。</p><h4 id="_5-父服务-parentapplicationinstanceid" tabindex="-1">5.父服务（parentApplicationInstanceId） <a class="header-anchor" href="#_5-父服务-parentapplicationinstanceid" aria-label="Permalink to &quot;5.父服务（parentApplicationInstanceId）&quot;">​</a></h4><p>当被调用方在接收到请求时，通过识别父服务属性，可以快速解释两个应用服务的调用关系。</p><h4 id="_6-入口服务-entryapplicationinstanceid" tabindex="-1">6.入口服务（entryApplicationInstanceId） <a class="header-anchor" href="#_6-入口服务-entryapplicationinstanceid" aria-label="Permalink to &quot;6.入口服务（entryApplicationInstanceId）&quot;">​</a></h4><p>区别于传统的跨语言交互协议，SkyWalking 将入口的部分属性也放入了交互协议中。除了入口服务属性，还有入口端点（entryOperationName）属性，协议增加这两个参数极大提高了稳定性。</p><ul><li><strong>断链场景诊断</strong></li></ul><p>通过调用入口信息，可以根据每个应用服务的交互协议数据入口信息，并再结合业务流量在集群中的流转状况，判断出哪个应用服务没有上报监控数据。如果是流量高，可以适当增加发送客户端性能；如果是数据无法上报，可以估计内存泄漏的排查办法，进行故障修复。</p><ul><li><strong>循环调用依赖问题诊断</strong></li></ul><p>在之前的单体应用中，如果出现死循环，我们很容易根据 CPU 的负载情况发现问题，然后通过 Dump 线程诊断死循环所在。但当微服务中出现了循环调用依赖，怎么一下子观测出问题所在呢？</p><p>首先当循环依赖发生时，参与其中的每个调用链路的耗时特别长，这与单一节点垂直架构的死循环的表象一样。但在微服务集群中，最简单的案例是：用户调用 A 应用的 a 方法，a 方法调用 B 应用的 b 方法，b 方法调用 C 应用的 c 方法，c 方法调用 A 应用的 a 方法。</p><p>这种案例下，每个方法的耗时都无限长，但是每个应用服务的负责方都在指责下游超时，而没有人能指出问题的所在。我们通过在线剖析工具拿到入口属性，我们会发现所有请求的入口指向一个应用的一个方法，这样所有的定位思路从入口方法开始往下梳理，这样就很容易开展问题的定位。</p><p>综上，可以看出 SkyWalking 的交互协议，不仅包含了实现分布式追踪的父链路的简单描述信息，还包含了很多更实用的属性。这些在拓扑图、链路绘制、问题诊断上都有着用武之地。</p><p>不仅如此，SkyWalking 的最新版本还扩展出更自定义的交互协议 sw8-x。通过此属性，你可以设计出更丰富的监控场景。如我们可以在消息队列场景中，使用 sw8-x 存储生产者生产消息的时间；在消费者消费消息时，根据当前时间和发送时间计算出消费延迟等。</p><blockquote><p>如果你想进行更加深入的学习，可以点击<a href="https://github.com/apache/skywalking/blob/v8.5.0/docs/en/protocols/Skywalking-Cross-Process-Propagation-Headers-Protocol-v3.md?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">链接</a>。</p></blockquote><h3 id="小结与思考" tabindex="-1">小结与思考 <a class="header-anchor" href="#小结与思考" aria-label="Permalink to &quot;小结与思考&quot;">​</a></h3><p>今天的课程，我带你回顾了跨语言交互协议的发展历史。</p><ul><li><p>以 CAT 为例，早期的跨语言交互协议主要以<strong>串联</strong>为主，所以通过 HTTP Header 传递任务线程标识即可。</p></li><li><p>而后 Google 的 Dapper 论文提出了<strong>Span 概念</strong> ，并通过改造<strong>RPC 框架</strong>来无侵入地传输调用方的任务线程标识和 Span 信息。</p></li><li><p>后来者 SkyWalking 的交互协议吸取了很多经验，其设计在采样落地、问题定位都有显著提效。</p></li></ul><p>今天的课程，说了同步的循环调用依赖问题如何诊断。那异步场景，如 A、B、C 改为异步消息队列调用，问题现场会是什么样子呢？又如何诊断呢？</p><p>欢迎在评论区写下你的思考，期待与你的讨论。</p>',57),o=[l];function r(i,s,c,d,u,k){return e(),t("div",null,o)}const h=a(n,[["render",r]]);export{_ as __pageData,h as default};
