import{_ as a,j as o,o as p,g as r,k as l,h as t,s as e,Q as i}from"./chunks/framework.4e7d56ce.js";const x=JSON.parse('{"title":"04流量卫士：AlibabaSentinel时刻守卫流量健康","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/应用性能分析实战_文档/(7053) 04  流量卫士：Alibaba Sentinel 时刻守卫流量健康.md","filePath":"posts/backEnd/应用性能分析实战_文档/(7053) 04  流量卫士：Alibaba Sentinel 时刻守卫流量健康.md","lastUpdated":1696417798000}'),s={name:"posts/backEnd/应用性能分析实战_文档/(7053) 04  流量卫士：Alibaba Sentinel 时刻守卫流量健康.md"},u=e("h1",{id:"_04流量卫士-alibabasentinel时刻守卫流量健康",tabindex:"-1"},[t("04流量卫士：AlibabaSentinel时刻守卫流量健康 "),e("a",{class:"header-anchor",href:"#_04流量卫士-alibabasentinel时刻守卫流量健康","aria-label":'Permalink to "04流量卫士：AlibabaSentinel时刻守卫流量健康"'},"​")],-1),S=e("p",null,"你好，这一讲我将带你学习 Sentinel，Sentinel 是阿里开源的分布式架构的高可用防护工具，它以流量为切入点，提供流量控制、流量塑形、熔断降级和过载保护等多维度的高可用保障策略。",-1),_=e("p",null,'Sentinel 在阿里内部经历了多年"双十一"的锤炼，完美地保障了微服务在大促场景下的稳定性。阿里在 2018 年底发布了首个开源生产版本，与其他开源系统不同的是，Sentinel 对外发布早期版本就具备了完整的核心架构，以及极高的生产可用能力。',-1),c=e("p",null,"首个开源版本发布后，Sentinel 便开始着力生态发展，如下图所示：Sentinel 提供更多 Java 微服务框架的开箱即用能力；同时 Sentinel 专注 API 网关服务，让开发者的高可用配置尽可能地收口，并着力于拥抱多语言生态和云原生支持的能力建设。",-1),b=i('<p>Sentinel 开源生态图</p><p><strong>Java 微服务框架适配：</strong> Sentinel 与其他 APM 系统（如 SkyWalking、CAT）监控框架的实现方式类似，通过插件化扩展和实现框架拦截器的方式，对 Java 微服务的 Web 服务端、RPC 框架、HTTP 客户端、消息队列等多个方向的框架进行适配。</p><blockquote><p>详细适配框架可参考<a href="https://github.com/alibaba/Sentinel/wiki/%E4%B8%BB%E6%B5%81%E6%A1%86%E6%9E%B6%E7%9A%84%E9%80%82%E9%85%8D?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">Alibaba Sentinel 已适配的主流框架</a>。</p></blockquote><p>如果你已经使用了这些框架的话，只需要做两件事情：引入相应的组件依赖，并完成简单的配置，即可完成相应的框架接入 Sentinel。如上图右侧所示：Sentinel 适配的框架有 Spring、Dubbo、RocketMQ 等 Java 微服务框架。</p><p><strong>API 网关服务：</strong> Sentinel 对很多常用的网关服务进行了适配。Sentinel 认为：在流量处于入口或是转发时进行高可用防护，要比流量来到应用服务后再进行流量控制，有效得多。如上图左侧所示：Sentinel 支持的 API 网关组件有 ZUUL、Spring Cloud Gateway 和 Nginx。</p><p><strong>多语言支持：</strong> Sentinel 在开源后，一直在探索多语言生态演进的路线。开源之初，Sentinel 只支持 Java；开源后，社区大力发展多语言生态。到目前为止，已经扩展支持了 C++ 和 GO 语言的原生客户端版本。借助多语言的生态，Sentinel 覆盖了更多、更广的场景，如 GO 语言的 Web 应用等。如上图中部所示：Sentinel 支持了 GO 语言和多种云原生产品。</p><p><strong>拥抱可预见的未来：</strong> Sentinel 一直在做云原生方向上的探索，目前已经具备支持 Service Mesh 高可用的能力，包括 Istio、envoy 和蚂蚁 MOSN 等架构的原生流控支持，未来会对云原生进行更多场景落地，比如 kubernetes 平台整合等。</p><p>接下来，我将会介绍 Sentinel 的学习路径、具体高可用的防护场景，以及我的落地实践。让你能以全局视角，从学习到使用，再到落地，全面理解 Sentinel 是如何对应用服务提供高可用保障的。</p><h3 id="学习路径" tabindex="-1">学习路径 <a class="header-anchor" href="#学习路径" aria-label="Permalink to &quot;学习路径&quot;">​</a></h3><p>我建议从 Sentinel 的技术骨架图和插件化扩展两个方向快速掌握 Sentinel：</p><ul><li><p>理解技术骨架图可以让你掌握 Sentinel 的工作原理，有的放矢地去学习源码，这是深入浅出产品呈现的必要条件；</p></li><li><p>掌握 Sentinel 的插件化扩展技术，可以让你在落地过程中快速解决&quot;水土不服&quot;问题。</p></li></ul><h4 id="_1-技术骨架图-深入设计原理" tabindex="-1">1.技术骨架图，深入设计原理 <a class="header-anchor" href="#_1-技术骨架图-深入设计原理" aria-label="Permalink to &quot;1.技术骨架图，深入设计原理&quot;">​</a></h4>',12),h=i("<p>应用服务在接入 Sentinel 后，进入此应用服务的每一个请求流量，就会在技术骨架图中，经历一系列的 Slot chain（插槽链），如上图所示，一次请求流量的生命周期可以分为以下三个流程。</p><ul><li><strong>构建调用树（TreeNodeBuilder 和 Cluster NODE Builder）</strong></li></ul><p>在统计的时候，Sentinel 会根据实时的请求调用链的情况，构建调用树。构建的这些调用树方便我们溯源链路时，清晰地在控制台，以单节点视角去实时监测调用链路的统计信息，方便去实现相关链路资源的流控能力。</p><ul><li><strong>滑动窗口（StatistisSlot）</strong></li></ul><p>构建的实时调用链路数，我们可以根据每个资源（树节点），去单独生成每个资源的统计结构。Sentinel 设计核心之一就是滑动窗口，有了滑动窗口的设计，Sentinel 就可以实现对每个资源的秒级监控防护。比如一些防护规则的指标来源，其实都是通过每个资源的秒级滑动窗口获取出来的。</p><p>滑动窗口的数据结构为环形数组，通过精细的并发设计，比如 LongAdder，实现了高精度、高吞吐、高性能的滑动窗口。</p><ul><li><strong>规则控制（Action）</strong></li></ul><p>Sentinel 通过扩展 Slot 来实现流量资源的规则管控，常用的官方 Slot 职责如下：</p>",8),g=i('<p>如果你还是觉得已有的 Slot 不能满足你的生产场景，你可以通过 SPI 接口进行扩展，加入自定义的 Slot。根据 Sentinel 技术骨架图结合实际业务场景，去翻看相应的技术文章和源码，一定会事半功倍，快速掌握和理解 Sentinel。</p><h4 id="_2-插件化扩展-克服-水土不服" tabindex="-1">2.插件化扩展，克服&quot;水土不服&quot; <a class="header-anchor" href="#_2-插件化扩展-克服-水土不服" aria-label="Permalink to &quot;2.插件化扩展，克服&quot;水土不服&quot;&quot;">​</a></h4><p>上面我通过技术骨架图，向你介绍了如何学习 Sentinel。但是在实际的工作过程中，我们更多的是进行&quot;水土不服&quot;的本地化改造，其中最常见场景就是，小众框架或是企业的内部框架的 Sentinel 没有适配的场景。</p><p>而 Sentinel 官方也想到了这个问题，它通过插件化扩展的技术手段，让用户快速地，以低学习成本完成这种场景的落地。</p><p><strong>下面我就以最近 OkHttp 插件为例，详细讲述插件化扩展的落地流程。</strong></p><blockquote><p>详细的代码贡献过程，你可以参看<a href="https://github.com/alibaba/Sentinel/pull/1456?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">GitHub 网页</a>。</p></blockquote><p>起因是这样的，我在参与中台化演进的过程中，发现中台在配置 Sentinel 高可用的保障规则后，前台系统会出现&quot;调用中台服务过快&quot;的限流提示，而导致部分流量被控制。而这些受到控制流量，目前在前台系统的 Sentinel 是无法进行管控的。</p><p>你可以将这种场景理解为，Sentinel 没有支持相应的 Http 客户端类型的框架，从而导致了前台服务的链路调用树无法关联到这些被管控的流量资源，也就导致了对部分流量资源的&quot;失控&quot;。</p><p>之后，经过统一梳理，我们发现&quot;失控&quot;的根本原因是 Sentinel 不支持 HTTP 客户端。</p><ul><li>这个任务不难，我们只要去相应框架的官网去找拦截器或过滤器说明即可。</li></ul><blockquote><p>以 OkHttp 客户端为例，我们首先要掌握如何实现 OkHttp 的拦截器，OKHttp 的拦截器使用文档详见<a href="https://square.github.io/okhttp/interceptors/?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">网页</a>。</p></blockquote><ul><li>然后使用 Sentinel 的 API 将每一次请求转化为相应的调用链路树的资源，即可完成插件扩展化。</li></ul><blockquote><p>这时你需要注意资源归类，例如 RESFUL API okhttp:GET:ip:port/okhttp/back/1 转化为 /okhttp/back/{id}，相应的代码你可以参考<a href="https://github.com/alibaba/Sentinel/tree/master/sentinel-adapter/sentinel-okhttp-adapter?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">GitHub 网页</a>。</p></blockquote><h3 id="落地方案" tabindex="-1">落地方案 <a class="header-anchor" href="#落地方案" aria-label="Permalink to &quot;落地方案&quot;">​</a></h3><p>使用 Sentinel 对应用服务集群进行高可用防护时，需要将每个<strong>服务节点引入</strong> Sentinel 客户端，然后连接统一服务端进行<strong>高可用防护规则</strong>的下放。</p><h4 id="_1-服务节点引入" tabindex="-1">1.服务节点引入 <a class="header-anchor" href="#_1-服务节点引入" aria-label="Permalink to &quot;1.服务节点引入&quot;">​</a></h4><p>我先向你讲解如何将每个<strong>服务节点引入</strong>Sentinel 客户端。</p><ul><li><p>对于<strong>客户端</strong>，我们将统一的基建脚手架中引入 Sentinel 客户端，即可完成部署。如果应用服务没有脚手架基建，网关的应用服务引入 Sentinel 客户端可以优先于业务的应用服务。</p></li><li><p>对于<strong>服务端</strong> ，我们需要对 Sentinel 引入动态数据源，解决应用服务重启后，规则丢失的问题。Sentinel 已经适配了所有常见的动态数据源组件，你可以因地制宜地选择其一进行部署。例如，企业内部使用 Apollo 解决了分布式配置统一管理的问题，那 Sentinel 动态数据源可以使用<a href="https://github.com/alibaba/Sentinel/tree/master/sentinel-extension/sentinel-datasource-apollo?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">sentinel-datasource-apollo</a>组件完成 Sentinel 服务端的动态数据源。</p></li></ul><h4 id="_2-高可用的保证规则配置" tabindex="-1">2.高可用的保证规则配置 <a class="header-anchor" href="#_2-高可用的保证规则配置" aria-label="Permalink to &quot;2.高可用的保证规则配置&quot;">​</a></h4><p>Sentinel 完成落地部署后，我们就需要对相应的需求场景，进行<strong>高可用的保证规则配置</strong>。下面我通过大促场景，与你分享如何对应用服务集群进行高可用防护的规则配置。</p><p>我们都在电商大促活动过程中抢购过商品，简单从用户和应用服务两个视角复盘下整个场景。</p><p><strong>用户视角：</strong></p><ul><li><p>在大促活动时间未到前，打开购买商品页面；</p></li><li><p>到了大促活动时间后，开始点击&quot;购买&quot;；</p></li><li><p>由于购买人数和库存的绝对悬殊，用户是抢不到的，但是页面展示&quot;没有库存&quot;了吗？并没有！页面返回的是&quot;亲~人太多了，被挤爆了&quot;；</p></li><li><p>这时没抢到商品的用户，还是不甘心，便刷新界面继续抢；</p></li><li><p>经过一段时间后，页面终于返回&quot;没有库存&quot;了，大家也停止本次抢购。</p></li></ul><p><strong>应用服务视角：</strong></p><ul><li><p>大促活动开启后，大量购买请求打到网关服务，为了抢购的公平性，我们会采取一种相对公平，且稳定性比较高的策略，即多少毫秒（一个滑动窗口）内，放入多少请求，其余全部返回&quot;亲~人太多了，被挤爆了&quot;；</p></li><li><p>进入购买场景的&quot;少量&quot;用户，开始进行下单购买，下单这部分用户还是特别多，比如，本次库存有几十万部手机，那少量用户就有几十万人；</p></li><li><p>用户购买后，返回用户下单成功，这些订单会进入核心处理订单的服务，以&quot;匀速排队&quot;的稳定性策略完成订单与库存的配对；</p></li><li><p>库存与订单关联完成后，返回购买用户运单、商品等详细信息，告诉前台应用和网关应用已售罄。</p></li></ul><p>Sentinel 对保障大促场景的高可用至关重要，回顾整个场景，Sentinel 做了很多高可用防护，我选取两个最重要的环节（大促开启和满载）与你分享。</p><p><strong>【大促开启】</strong></p><p>比如实际场景是，1 千万人抢 20 万个商品。经过大促预演的压测，服务集群可以每秒至多承受 10 万的流量，由于整个大促的服务集群，有几个部门，有几十个服务，上百个节点才能支撑起来的，显然每个节点去配置 Sentinel 的高可用规则是不现实的。</p><p>那我们通过 Sentinel 在网关配置每秒放入 5 万的购买请求即可，然后经过几秒钟，完成 20 万商品的全部销售，用户大促抢购商品看似火爆，但支撑大促服务集群却心如止水。</p><p><strong>【满载】</strong></p><p>只在网关配置一处配置相应的高可用策略是很难做到面面俱到，比如支付服务能承载的 QPS 很低，只能到达 1000 QPS，所以我们不会依赖支付系统，满载的承受大促的流量洪峰。</p><ul><li><p>其一，超过 1000 QPS 的流量打到支付服务，会被拒绝支付；</p></li><li><p>其二，满载是支付服务的上游满载，进而导致支付服务满载的表象，一旦上游的满载导致不稳定，就会造成集群雪崩。</p></li></ul><p>这时候我们通常改造的方式是，将所有的验证，如用户资金账户是否正常、库存临时锁给指定用户等前置校验做完，将支付请求放入支付队列，让支付服务通过队列，通用 Sentinel 将满载变成匀速高水位线去完成所有支付。</p><h3 id="小结与思考" tabindex="-1">小结与思考 <a class="header-anchor" href="#小结与思考" aria-label="Permalink to &quot;小结与思考&quot;">​</a></h3><p>今天的课程，我带你学习了高可用保障利器 Alibaba Sentinel。</p><p>Sentinel 的设计思路非常清晰，我们可以从技术骨架图深入设计原理，然后通过插件化扩展克服了&quot;水土不服&quot;，并解决了资源无法被监测的问题。</p><p>在落地时，你需要因地制宜选择合适的动态数据源、集群的应用服务。应用服务非常多时，我们优先在 API 网关处，通过 Sentinel 配置<strong>高可用保障方案</strong>。</p><p>Sentinel 一直着力建设社区生态，我们可以通过 API 网关、云原生、框架集成等多个方向，每个方向的建设都需要对应方向的专家，对 Sentinel 进行社区贡献。希望你也能早日成为 Sentinel Committer，在微服务的高可用领域沉淀出自己的方法论。</p><p>那么，你用 Sentinel 对线上应用服务的哪些场景，配置过哪些高可用的保障策略呢？你最终又是怎么确定使用这个策略的呢？之后线上的收益又如何？是否符合你的预期？</p><p>欢迎你在评论区写下你的思考，期待能与你讨论。</p>',40);function d(q,A,k,m,P,f){const n=o("Image");return p(),r("div",null,[u,S,_,c,l(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M01/32/1A/Cgp9HWBtbdyAPHK8AAZUWH4egOA004.png"}),t(),b,l(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M01/32/1A/Cgp9HWBtbeuALwqjAAbUg8otm8U388.png"}),t(),h,l(n,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M00/32/42/CioPOWBtjSqACR4OAAMY8ujYdLU672.png"}),t(),g])}const E=a(s,[["render",d]]);export{x as __pageData,E as default};
