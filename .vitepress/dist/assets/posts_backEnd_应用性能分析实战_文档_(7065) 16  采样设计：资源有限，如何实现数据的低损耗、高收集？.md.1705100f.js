import{_ as n,D as e,o as s,g as r,J as a,h as p,m as t,Q as l}from"./chunks/framework.f67d7268.js";const I=JSON.parse('{"title":"16采样设计：资源有限，如何实现数据的低损耗、高收集？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/应用性能分析实战_文档/(7065) 16  采样设计：资源有限，如何实现数据的低损耗、高收集？.md","filePath":"posts/backEnd/应用性能分析实战_文档/(7065) 16  采样设计：资源有限，如何实现数据的低损耗、高收集？.md","lastUpdated":1696682708000}'),i={name:"posts/backEnd/应用性能分析实战_文档/(7065) 16  采样设计：资源有限，如何实现数据的低损耗、高收集？.md"},_=t("h1",{id:"_16采样设计-资源有限-如何实现数据的低损耗、高收集",tabindex:"-1"},[p("16采样设计：资源有限，如何实现数据的低损耗、高收集？ "),t("a",{class:"header-anchor",href:"#_16采样设计-资源有限-如何实现数据的低损耗、高收集","aria-label":'Permalink to "16采样设计：资源有限，如何实现数据的低损耗、高收集？"'},"​")],-1),c=t("p",null,"我们都知道，APM 数据是海量的，项目初期很难申请到足够的资源，让监控服务去承接这些海量的监控数据，所以就需要对海量数据进行采样了。",-1),g=t("p",null,"但开启采样后，免不了会带来数据丢失。如果排查故障问题时，发现丢弃的监控数据过多，就会让 APM 建设的口碑越来越差，使用的人越来越少，这样资源就更申请不到了，从而最后导致了 APM 的形同虚设。",-1),u=t("p",null,"那如何平衡采样、数据、资源的关系呢？这时候就需要我们来设计采样策略。今天我会分享以下四种采样策略，通过对课程的学习，让你在建设 APM 的数据时，可以尽最大可能地收集到用户想要的数据。",-1),d=l('<h3 id="百分比采样策略" tabindex="-1">百分比采样策略 <a class="header-anchor" href="#百分比采样策略" aria-label="Permalink to &quot;百分比采样策略&quot;">​</a></h3><p>百分比采样策略是最常见的采样策略。高负载项目产生的 APM 数据过多，监控压力过大时，默认的止损策略就会<strong>对这些高负载项目开启百分比采样</strong>。</p><p>策略的实现也非常简单。明细数据中的分布式链路数据，我们可以根据 TraceId 进行哈希方法的运算，从而得到 hashCode；然后将 hashCode 与 100 取余，获取 0~99 的任意整数。例如，我们的采样百分比为 10%，当生成 TraceId 或是发送监控数据时，通过放行 0~9 的取余数据，即可实现百分比采样策略。</p><p>这里需要注意的是采样时机。</p><ul><li><p>如果在生成 TraceId 时进行采样，可能需要线程本地变量将任务线程标识为丢弃的数据。这样不仅可以减低服务端的负载，还可以减轻客户端的负载，但其实现成本相对较高。</p></li><li><p>另外如果采样的时机在&quot;发送监控数据&quot;时，这样的采样方案只能对 APM 集群进行减负。</p></li></ul><p>基于固定的百分比采样策略适用于以下场景。</p><ul><li><strong>第一个场景是针对底层的基础服务</strong></li></ul><p>这些服务属于服务集群的最底层，他们的 APM 监控数据是最多的。通过对底层服务设置百分比采样策略，可以极大减轻监控集群的负载；而且底层服务的监控数据由于采样被丢弃，基本不会影响定位问题的效率。</p><p>比如底层服务的链路数据丢失，链路视图只会缺少最底层的链路节点监控数据，不会造成整个分布式链路的&quot;断链&quot;。所以你的监控集群出现负载压力时，建议对底层服务配置百分比采样率为 0%~10%。</p><ul><li><strong>第二个场景是上线前的压测报告</strong></li></ul><p>RD 在上线需求功能前，会进行压测报告的制定。根据对<a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=729#/detail/pc?id=7060&amp;fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">&quot;11 | 资源节点树：通过 Sentinel 无侵入实现流量链生成规则&quot;</a>的学习，我们得知目前市场上的 APM 系统的侵入度越来越低，以至只有线上和集成环境才会部署 APM 监控，而本地的开发是无感知的。</p><p>所以当我们开发一些高性能功能代码，如使用多线程、事件总线等高阶技术时，我们需要进行不同维度的百分比采样策略的压测方案，以证明 APM 系统对高阶技术的支持情况。</p><blockquote><p>这里我建议百分比采样的三个维度是 0%、20%、100%。</p></blockquote><ul><li><strong>第三个场景是大促场景</strong></li></ul><p>在春节投放广告、双十一大促等场景，为了尽全力释放出集群的能力，并且屏蔽在极端流量下 APM 系统对应用服务集群可能带来的影响，通过关闭部分监控功能，实现 0% 的百分比采样策略。</p><h3 id="链路特征采样策略" tabindex="-1">链路特征采样策略 <a class="header-anchor" href="#链路特征采样策略" aria-label="Permalink to &quot;链路特征采样策略&quot;">​</a></h3><p>百分比采样策略因为有极强的鲁棒性，所以配置策略后，很可能造成数据无法收集这一问题。为了解决这一问题，我们可以在不了解业务的情况下，针对链路的特征设置采样配置。</p><p>关于设计链路的标签，我们可以从几个维度去进行标签的规划。</p><ul><li><p>Span 的耗时时间：通过耗时时间，可以判断应用服务内部是否存在执行时间过长的代码块，进而反映是否存在任务线程执行过长的情况。</p></li><li><p>Span 的类型和数量：对 Span 的类型和数量打标记。</p></li><li><p>Span 是否存在异常：顾名思义，就是检查链路中的所有 Span 是否存在异常。</p></li></ul><p>通过对以上三个标签策略的组合采样，就可以将百分比采样的效果进行优化。</p><p>基于链路特征的采样策略，适用于以下场景。</p><ul><li><strong>慢查链路场景</strong></li></ul><p>通过检查链路中是否存在查询 DB 时间过长的 Span 的采样策略，就可以实现 100% 收集慢查询数据。在数据上报到收集端后，通过 TopN 的采样存储模计算，就可以完成数据的报警和展示。</p><ul><li><strong>链路优化场景</strong></li></ul><p>可以设计一个监控数据的 Span 数量超过一定数量时，就必须上报到后端收集器，比如链路数据中存在超过 200 的调用远端的 Span。因为当一个任务线程存在调用远端的次数非常多时，就需要考虑是否存在循环调用的场景，可以通过批量接口进行优化。</p><ul><li><p><strong>异常链路场景</strong></p><p>通过全部采集链路数据中存在异常的 Span 的监控数据，当数据发送到收集端，就可以完成报警和稳定性数据精准计算。</p></li></ul><h3 id="业务特征采样策略" tabindex="-1">业务特征采样策略 <a class="header-anchor" href="#业务特征采样策略" aria-label="Permalink to &quot;业务特征采样策略&quot;">​</a></h3><p>链路特征采样策略乍看起来很不错，不用理解业务，就可以实现问题链路的全量数据采集。但现实远非这么简单，就比如要实现新上线功能的监控数据全部采集，链路特征都是基于应用服务集群中的单个应用设置采样策略，所以无法做到采集新功能的监控设计。</p><p>这时就需要设计业务特征采样策略，来解决这些更偏向于业务的监控采样难题了。</p><p>业务特征相对于链路特征更加具象化，让原本使用抽象的<strong>链路特征</strong> 描述监控数据，转化为更具体、更易理解的<strong>业务特征</strong>来描述监控数据。</p><p>好处显而易见，即最大程度地将采样策略赋能于一线开发人员，让所有采集规则都有兜底策略，这也是企业落地采样策略的关键所在。毕竟企业级产品要解决的是面面俱到的问题，确保当前有限的通用采样策略无法满足时，可以通过业务特征的采样策略保证 APM 监控数据顺利采集。</p><p><strong>【如何通过技术框架提取业务特征？】</strong></p><p>那如何提取业务特征呢？可以通过驱动业务开展的四大技术框架进行设计和落地。</p><ul><li><p>实现与用户交互需求的<strong>HTTP 调用框架</strong></p></li><li><p>在服务集群中实现应用服务之间实时调用功能的<strong>RPC 调用框架</strong></p></li><li><p>实现发布-订阅功能的<strong>消息队列框架</strong></p></li><li><p>实现定时执行任务功能的<strong>任务调度框架</strong></p></li></ul><p>基于业务特征的采样策略是根据业务流量的特征进行采样，如我们使用最多的 HTTP 调用框架，业务特征是从用户操作浏览器页面生成的请求信息中获取，筛选特征方式可以是 request.path（用户请求路径）或是 request.header.attribute（请求头中的埋点属性）等。</p><p>通过匹配新功能的用户请求路径，如采集用户在交易场景中的下单接口的请求路径。当链路满足以上业务特征时，可以优先全量采集。</p><p>其余 RPC 调用框架、消息队列框架、任务调度框架也可以根据以上方案去实现。</p><p>需要注意的是，要实现集群维度的全量采集，需要在链路传输上将&quot;强制采用字段&quot;这一设置开启。以 SkyWalking 的链路传输协议为例，协议中的第一个属性为采样标记，将采样标记设置开启后，此任务线程引起下游的所有监控数据都会被最高优先级的采集到后端存储。</p><p><strong>基于业务特征采样策略适用于如下场景：</strong></p><ul><li><p>链路特征采样策略无法满足的采样场景；</p></li><li><p>新功能上线后，建议新功能最下游的应用服务或是面向用户交互的应用服务，开启新功能强制采样 15 天；</p></li><li><p>老功能重构，初步梳理上游依赖。</p></li></ul><p>前面三种最常见的采样策略我们学习完了，你可能会发现一个问题：那就是一旦系统出现问题，已有的采样策略是无法保证，采集到全部记录着问题的 APM 数据的。</p><h3 id="动态异常采样策略" tabindex="-1">动态异常采样策略 <a class="header-anchor" href="#动态异常采样策略" aria-label="Permalink to &quot;动态异常采样策略&quot;">​</a></h3><p>这时就需要使用动态异常采样策略，来尽可能收集到全部的异常数据。</p><p>如下图所示，我们先看正常的应用服务监控架构。</p><ul><li><p>整体上看，服务集群处理用户请求；</p></li><li><p>在集群内部，服务 A 负责响应用户请求，然后调用服务 B 来完整地处理用户请求；</p></li><li><p>服务 A 和服务 B 都接入了 APM 系统，将数据发送给 APM 收集器。</p></li></ul>',45),h=t("p",null,"试想如果请求量很大，服务 AB 都开启了采样，这时如果服务 B 在执行过程中出现异常，使用异常收集的链路特征采样策略，确保了服务 B 执行过程中，出现异常可以收集异常的 APM 监控数据；可是服务无法通知下游服务 A 收集相关的数据。",-1),A=t("p",null,"这也是刚讲的前三个采样模型的共同难点，就是上游服务发生异常，无法告知下游服务进行采集相关联的监控数据。",-1),P=t("p",null,"为了解决这个问题，需要是扩展跨语言交互协议和引入 APM 配置中心来解决这个问题。",-1),m=l('<p>以 SkyWalking 为例，协议中入口服务（entryApplicationInstanceId）和入口服务方法（entryOperationName）属性，当服务 B 发生异常时，将异常关联的入口服务和入口方法上报给 APM 配置中心，配置中心下发配置到各个应用服务节点。</p><p>这样一来，此分布式链路请求经过各个服务节点时，就会强制采集了。开启动态异常采用策略，可以极可能少地丢弃与上述问题相关的监控数据。</p><h3 id="总结与思考" tabindex="-1">总结与思考 <a class="header-anchor" href="#总结与思考" aria-label="Permalink to &quot;总结与思考&quot;">​</a></h3><p>今天的课程，我带你回顾了四种采样策略。</p><ul><li><p>两种通用的<strong>固定</strong> 采样策略：<strong>百分比采样策略</strong> 、<strong>链路特征采样策略</strong>，这两个策略可以由复杂 APM 集群建设的 RD 统一配置；</p></li><li><p>之后讲述了<strong>业务特征采样策略</strong> ，这是企业级落地过程中的<strong>兜底策略</strong>；</p></li><li><p>最后讲述了<strong>动态异常采样策略</strong>，这个策略可以极大地确保整体集群采集异常监控数据的采集率。</p></li></ul><p>那你在工作中使用过或是设计过哪些采样策略呢？解决了什么问题？效果怎么样呢？欢迎在评论区写下你的思考，期待与你的讨论。</p>',6);function q(M,T,k,S,b,f){const o=e("Image");return s(),r("div",null,[_,c,g,u,a(o,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M00/40/77/CioPOWCk4VqAXw9tAABoA92m-1M235.png"}),p(),d,a(o,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/40/6F/Cgp9HWCk4W6AKsugAAEMl9ObTQQ055.png"}),p(),h,A,P,a(o,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M00/40/77/CioPOWCk4XSAHCKJAAFGpT6EXic022.png"}),p(),m])}const x=n(i,[["render",q]]);export{I as __pageData,x as default};
