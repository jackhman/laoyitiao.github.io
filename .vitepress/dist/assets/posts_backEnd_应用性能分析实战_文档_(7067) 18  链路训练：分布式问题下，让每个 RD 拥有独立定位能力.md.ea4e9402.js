import{_ as t,o as a,h as p,Q as o}from"./chunks/framework.d3daa342.js";const d=JSON.parse('{"title":"18链路训练：分布式问题下，让每个RD拥有独立定位能力","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/应用性能分析实战_文档/(7067) 18  链路训练：分布式问题下，让每个 RD 拥有独立定位能力.md","filePath":"posts/backEnd/应用性能分析实战_文档/(7067) 18  链路训练：分布式问题下，让每个 RD 拥有独立定位能力.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/应用性能分析实战_文档/(7067) 18  链路训练：分布式问题下，让每个 RD 拥有独立定位能力.md"},e=o('<h1 id="_18链路训练-分布式问题下-让每个rd拥有独立定位能力" tabindex="-1">18链路训练：分布式问题下，让每个RD拥有独立定位能力 <a class="header-anchor" href="#_18链路训练-分布式问题下-让每个rd拥有独立定位能力" aria-label="Permalink to &quot;18链路训练：分布式问题下，让每个RD拥有独立定位能力&quot;">​</a></h1><p>这一讲我将带领你学习，如何通过更深层次的挖掘链路数据的价值，让每个一线开发人员都具备独立解决问题的能力，让提效更上一个层次。</p><p>无论哪个职业岗位，都被期望有独立解决问题的能力。当个人遇到困难时，若在多次帮助下才能完成任务，那势必会增加沟通协作的成本。</p><p>此现象在互联网的协作开发中更是如此。一个线上问题往往涉及多个业务方，若接到问题的一线开发人员只具备&quot;定位出这个问题是否由自己负责的应用服务引起&quot;的这一单一能力，那遇到复杂的线上问题时，问题便会一层层地流转下去，直到准确定位出到底是由哪个应用服务引起的问题为止。</p><p>这在人力成本和时间成本上都造成了较大损失，那如何破局呢？<strong>分布式链路追踪技术</strong>就是专门解决这个问题的。</p><p>通过<a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=729#/detail/pc?id=7058&amp;fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">&quot;09 | OpenTracing解密：Dapper 说它是树 SkyWalking 说它是图&quot;</a>与<a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=729#/detail/pc?id=7064&amp;fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">&quot;15 | 数据磐石：APM 收集端的存储模型&quot;</a>等关于链路的课程，我们得知目前市场的分布式链路追踪的<strong>数据价值</strong> 只开发出了串联各个应用服务的<strong>链路监控日志</strong> 和<strong>简单标签</strong>，如是否存在异常等。</p><p>可以说，目前开源市场上的分布式链路追踪功能，与&quot;让每个一线开发具备独立解决问题&quot;这一目标还有一定距离。</p><p>但我们可以通过链路训练、链路对比等方式，来解决海量数据过于庞杂、不够抽象精简的问题，也就是在链路训练下，让机器代替人工，帮助我们把链路数据捋清。</p><p>所以这一课时，我会通过以下这四个过程，让分布式追踪数据的价值更上一个台阶。</p><ul><li><p>数据剔除清洗：剔除无用数据，沉淀业务场景的链路模型</p></li><li><p>链路数据归类：三个步骤，由粗到细进行归类</p></li><li><p>问题链路识别：三类标签，用标签策略识别异常</p></li><li><p>链路对比：进行更细粒度的分析</p></li></ul><h3 id="如何沉淀出业务场景的链路模型" tabindex="-1">如何沉淀出业务场景的链路模型？ <a class="header-anchor" href="#如何沉淀出业务场景的链路模型" aria-label="Permalink to &quot;如何沉淀出业务场景的链路模型？&quot;">​</a></h3><p>每一个业务场景都可以通过一组分布式链路反映；同时，每一个分布式链路在包含业务语义的同时，也可能包含着技术语义。所以想要沉淀出业务场景的链路模型，第一步就是要对海量数据进行<strong>数据清洗。剔除</strong> 那些只包含技术语义和边缘业务场景的链路数据，从而<strong>沉淀</strong>出业务模型的链路数据。</p><h4 id="_1-技术语义的链路数据" tabindex="-1">1.技术语义的链路数据 <a class="header-anchor" href="#_1-技术语义的链路数据" aria-label="Permalink to &quot;1.技术语义的链路数据&quot;">​</a></h4><p>只包含技术语义的链路，有如下特征。</p><ul><li><p>框架定时心跳类链路：在应用服务中使用注册中心组件或配置中心类组件，如 Euraka。应用客户端会通过 Http 客户端持续访问 Euraka 注册中心，获取最新的注册配置，所以会有持续的心跳日志产生。</p></li><li><p>流式框架产生的链路：在应用服务中使用消息队列，如 Kafka，那客户端消费者会持续向 Kafka 集群发出拉取数据的请求，在 Kafka 集群没有数据流时，客户端消费者会产生大量拉取数据流为空的链路。</p></li></ul><p>可以看出，只包含技术语义的链路多为<strong>使用常驻线程</strong>（通过无限循环的方式产生的链路）。</p><h4 id="_2-边缘业务场景的链路数据" tabindex="-1">2.边缘业务场景的链路数据 <a class="header-anchor" href="#_2-边缘业务场景的链路数据" aria-label="Permalink to &quot;2.边缘业务场景的链路数据&quot;">​</a></h4><p>只包含边缘业务场景，有如下特征。</p><ul><li><p>运营类业务场景：为了方便运营快速解决资讯类问题，常会开发一些简单的专为运营使用的展示类需求，类似&quot;直接查看数据库&quot;这种功能。</p></li><li><p>修复数据工具：在重构或有较大升级时，一线 RD 会开发一些&quot;后门&quot;功能，避免跨越数据库网络隔离，直接快速修复线上数据的功能。</p></li></ul><p>边缘业务的较多功能均通过 Http 协议框架实现，且功能简单，所以没有必须沉淀出链路模型的意义。</p><p>找到了这些无用的数据特征，进行初步的链路清洗，就得到了要沉淀出业务模型的链路数据。而链路清洗有多种方式实现方案：比如通过跨语言交互协议或链路存储模型的属性，就可以过滤掉这些数据；再比如通过 Euraka 关键词模糊匹配入口端点名称，来屏蔽 Euraka 注册中心的无用数据。</p><blockquote><p>关于跨语言交互协议，你可以回顾<a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=729&amp;sid=20-h5Url-0&amp;buyFrom=2&amp;pageId=1pz4#/detail/pc?id=7063&amp;fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">&quot;14 | 互通有无：如何设计跨语言的 APM 交互协议？&quot;</a></p></blockquote><h3 id="链路训练" tabindex="-1">链路训练 <a class="header-anchor" href="#链路训练" aria-label="Permalink to &quot;链路训练&quot;">​</a></h3><p>有了被初步清洗后的分布式链路数据，接下来就是将链路数据进行归类，并与场景进行映射；然后再对这些链路进行识别，挑选出问题链路。</p><h4 id="_1-通过三个步骤-将链路数据归类" tabindex="-1">1.通过三个步骤，将链路数据归类 <a class="header-anchor" href="#_1-通过三个步骤-将链路数据归类" aria-label="Permalink to &quot;1.通过三个步骤，将链路数据归类&quot;">​</a></h4><p>分类映射过程<strong>由粗到细</strong>，分为以下三步。</p><ul><li><p><strong>step 1 端点入口映射分类</strong></p><p>通过跨语言交互协议中的入口应用和入口端点进行分类，基本上可以区分出绝大多数的场景，因为国内业务系统的架构很少使用 Qraphql 或 RestFul 接头去实现业务服务。剩下还没分类出的原因，就是内部有部分逻辑判断分支的入口虽然相同，但由于入参不同，从而导致业务场景也不相同。</p></li><li><p><strong>step 2 经过应用服务映射分类</strong></p><p>为解决这一问题，需要扩展跨语言传输协议。在跨语言传输协议中，当请求流量每经过一次应用时，将经过应用通过追加的形式记录其中，实现区分相同入口信息，区分经过应用服务不同的链路。</p></li><li><p><strong>step 3 使用组件映射分类</strong></p><p>在单个应用服务的内部可能还存在由于入参不同导致链路形态不同的情况，同 step 2，在每一个 Span 打点时，追加这个 Span 打点的框架类型，实现此前的区分。</p></li></ul><p>经过这三个步骤的链路模型归类后，得到了<strong>应用服务集群所有的业务场景的链路模型</strong>。</p><p>链路模型中的每一个链路，可能正常也可能有问题，那如何发掘这些问题链路呢？</p><h4 id="_2-通过三类标签-识别问题链路" tabindex="-1">2.通过三类标签，识别问题链路 <a class="header-anchor" href="#_2-通过三类标签-识别问题链路" aria-label="Permalink to &quot;2.通过三类标签，识别问题链路&quot;">​</a></h4><p>就如同已有的 SkyWalking 分布式链路中的异常标签一样，通过策略进行标签提炼，就可以快速识别出有标签（有问题）的链路和没有标签（正常）的链路。</p><p>那如何设计标签呢？可以通过以下三类标签进行梳理。</p><p><strong>1）事实性标签</strong></p><p>顾名思义，事实性标签具备简单、易用、可解释性强的特点。下面是我在分布式链路模型的场景下，总结出的通用的事实性标签。</p><ul><li><p><strong>来源标签</strong>：根据在入口应用服务进行埋点或是分析入口 Ningx 的访问日志，抓取一个应用场景的请求来源。</p></li><li><p><strong>时延标签</strong>：根据链路的开始时间与结束时间的差值生成时延标签，根据时延的长短还可以生成慢链路标签。</p></li><li><p><strong>异常标签</strong>：根据链路中是否存在&quot;异常日志的打印&quot;或是&quot;抛异常&quot;的情况，生成链路异常标签。</p></li><li><p><strong>空数据标签</strong>：微服务之间通过接口进行交互，当调用上游接口返回空结果时，记录空数据标签。</p></li></ul><p>不难发现：事实性标签策略简单，偏向于大数据工程的计算过程。</p><p><strong>2）挖掘类标签</strong></p><p>在链路模型具备了事实性标签后，接下来就是对请求行为进行分析，目的是挖掘出这些标签背后的潜藏标签。下面是我总结的挖掘类标签。</p><ul><li><p><strong>循环过多标签</strong>：比如一个请求中存在反复执行的代码块，且累计的次数和耗时达到一定阈值时，就会生成循环过多标签。比如远端代码段中，反复通过单入参接口去请求远端资源。若循环是 100 次，远端性能下降时，响应时间将从 10 毫秒下降至 100 毫秒；那下游的响应时间会从 1 秒上升至 10 秒，进而不会由于超时无法响应用户。</p></li><li><p><strong>活跃度标签</strong>：当同一个用户在同一个场景中频繁操作时，比如在电商场景中，用户频繁查看手机类目的商品，那这时就可以联动商机等系统，查看是否有定向的商机推过去。</p></li></ul><p>挖掘类标签，更倾向对业务场景的优化，通过链路模型验证多个场景是否符合需求预期。</p><p><strong>3）预测类标签</strong></p><p>当具备了事实性标签和挖掘类标签后，定位问题的效率便会得到质的提高。但为了将监控数据的价值发挥至极致，我们还可以设置预测类标签。</p><p>比如，交易应用服务每晚在执行堆栈对账任务功能时，由于近期数据过多、内存数据加载变大，每晚执行的时候都会出现 LongGC 的情况，此时就可以将链路模型打上 <strong>&quot;环比故障&quot;等标签</strong>。环比，是因为链路场景使用了分布式任务调度框架。内存过大，是关联了 JVM 监控数据。</p><p>可见，预测类型需要很多<strong>自定义策略</strong>才能实现。</p><h3 id="链路对比" tabindex="-1">链路对比 <a class="header-anchor" href="#链路对比" aria-label="Permalink to &quot;链路对比&quot;">​</a></h3><p>一线业务开发人员在接收到日常问题时（日常业务咨询的小问题，而非功能变更导致的故障），可以通过全局链路 ID 快速关联出此业务场景对应的链路模型，找到对应链路模型的正确链路，使用标签粗略定位出问题所在，然后再对比每一个 Span 的详细数据去定位问题。</p><p>最终<strong>链路对比</strong>的功能实现，是将业务场景通过路由字段（请求经过应用的路由和应用内部 Span 类型的路由）进行了更细粒度的分析，进而无侵入地计算出应用服务集群中的所有链路模型。</p><p>刚刚提到的链路的<strong>标签策略</strong>便是让机器分析出问题所在，毕竟在请求经过多个服务后，很难有业务 RD 具备定位所有细节的能力；但通过链路训练，以上问题的链路情况便可为依据，从而配置出标签策略，最终得到正常链路模型。</p><blockquote><p>这样在出现问题时，有了近期正确业务场景的链路模型参考，定位问题的能力便能更上一层楼。</p></blockquote><h3 id="思考题" tabindex="-1">思考题 <a class="header-anchor" href="#思考题" aria-label="Permalink to &quot;思考题&quot;">​</a></h3><p>回顾一下今天的课程，我们通过以下四个步骤去达到提升定位问题效率、提升分布式追踪数据价值的目的，从而曲线救国，帮助更多 RD 拥有独立定位的能力。</p><ul><li><p>数据剔除清洗：剔除无用数据，沉淀业务场景的链路模型</p></li><li><p>链路数据归类：三个步骤，由粗到细进行归类</p></li><li><p>问题链路识别：三类标签，用标签策略识别异常</p></li><li><p>链路对比：进行更细粒度的分析</p></li></ul><p>那么，你在定位问题的提效方面，有什么思考或是自研功能呢？欢迎在评论区写下你的思考，期待与你讨论。</p>',53),l=[e];function n(s,i,u,_,g,h){return a(),p("div",null,l)}const q=t(r,[["render",n]]);export{d as __pageData,q as default};
