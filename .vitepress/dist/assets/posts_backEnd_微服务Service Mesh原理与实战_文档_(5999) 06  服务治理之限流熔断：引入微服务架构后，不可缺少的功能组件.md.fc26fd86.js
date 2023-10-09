import{_ as p,j as a,o as n,h as _,k as e,f as s,Q as r,s as t}from"./chunks/framework.d3daa342.js";const B=JSON.parse('{"title":"06服务治理之限流熔断：引入微服务架构后，不可缺少的功能组件","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/微服务Service Mesh原理与实战_文档/(5999) 06  服务治理之限流熔断：引入微服务架构后，不可缺少的功能组件.md","filePath":"posts/backEnd/微服务Service Mesh原理与实战_文档/(5999) 06  服务治理之限流熔断：引入微服务架构后，不可缺少的功能组件.md","lastUpdated":1696682708000}'),l={name:"posts/backEnd/微服务Service Mesh原理与实战_文档/(5999) 06  服务治理之限流熔断：引入微服务架构后，不可缺少的功能组件.md"},i=r('<h1 id="_06服务治理之限流熔断-引入微服务架构后-不可缺少的功能组件" tabindex="-1">06服务治理之限流熔断：引入微服务架构后，不可缺少的功能组件 <a class="header-anchor" href="#_06服务治理之限流熔断-引入微服务架构后-不可缺少的功能组件" aria-label="Permalink to &quot;06服务治理之限流熔断：引入微服务架构后，不可缺少的功能组件&quot;">​</a></h1><p>在导读&quot;<a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=586#/detail/pc?id=5993" target="_blank" rel="noreferrer">Service Mesh：从单体服务出发，独立于业务演进的微服务架构</a>&quot;中，我提到过微服务架构也引发了一些问题，比如单个服务故障引起的雪崩问题，而服务治理就是解决这类问题的&quot;灵丹妙药&quot;。</p><p>很多人在刚开始做微服务架构的时候，会把重点工作放在微服务的拆分上，忽略了服务治理。这种做法原也符合人们对微服务的初步理解，毕竟单体服务架构演进到微服务架构的第一步就是拆解服务。但随着拆分服务的增多，肯定会遇到因单一服务出问题引发的微服务集群雪崩，此时就需要服务治理&quot;出面解决&quot;了。</p><p>服务治理的是什么？举个类似的例子，比如我们常提到的环境治理，环境需要治理是因为环境的恶化影响了万物的生存环境，而微服务需要治理是因为影响了微服务集群的稳定性。所以我们需要一些手段进行干预，比如限流、熔断、降级等，<strong>确保微服务集群的稳定性</strong>。</p><p>下面我们就针对微服务治理手段中最常用的两种手段：限流和熔断，详细聊一聊。</p><h3 id="限流" tabindex="-1">限流 <a class="header-anchor" href="#限流" aria-label="Permalink to &quot;限流&quot;">​</a></h3><p>限流是指当流量超出服务设计之初的承载量时，通过一定的算法，将无法处理的流量丢弃，以保证服务的稳定性。</p><h4 id="常用的限流算法" tabindex="-1">常用的限流算法 <a class="header-anchor" href="#常用的限流算法" aria-label="Permalink to &quot;常用的限流算法&quot;">​</a></h4><p><strong>计数器</strong></p><p><strong>计数器是最容易实现的限流算法</strong>，其实它的原理非常简单：记录一定时间内的请求数量，将超过阈值的请求拦截掉。</p><p>这种算法对于微服务限流这个场景来说其实也够用了，但<strong>计数器算法有个很明显的问题：在临界区间容易促发错误的限流判定</strong>。假如设定请求记录时间为 1s，限流触发阈值为 100，在上一个记录区间的最后 100ms 和当前记录区间的前 100ms 都发生了接近阈值的请求量 90，很明显这样就无法触发限流阈值，但却超过了系统的最大负载。</p><p><strong>滑动窗口</strong></p><p><strong>滑动窗口就是为了解决简单计数器的问题</strong>。假定设置 100ms 为一个窗口，那么 1s 内会有 10 个窗口，这样即便两个临近的窗口都发生了接近阈值的请求量，也能够通过计算前 10 个窗口的总量，触发限流阈值。按照计数器中的情况，两个临近窗口的请求量共计 180，显然会触发阈值。</p><p><strong>漏桶</strong></p><p><strong>漏桶是一种非常平滑的限流算法</strong>。它在一定时间内允许通过恒定数量请求，如果这个时间内请求数量超过这个量，就会触发限流。举个简单的例子，比如 1s 内设置允许 1000 个请求的阈值，那么每 1ms 就会产生一个允许通过的请求。如果超过这个值，就会被限制掉。</p><p>这种算法虽然非常平滑，但却带来了另外一个问题：<strong>限流过于严格</strong> 。虽然我们设置了每秒 1000 个请求，但如果这 1s 内的请求不均匀也会触发限流。实际上，<strong>这种算法并不太适合微服务场景，它更适合限制我们请求外部第三方服务的情况</strong>，比如某个第三方推送的接口限制了我们每秒的请求量，这个时候我们用漏桶算法可以限制自身的对外请求量。</p>',16),g=t("p",null,"漏桶效果图",-1),c=t("p",null,[t("strong",null,"令牌桶")],-1),u=t("p",null,[t("strong",null,"令牌桶（Token Bucket）是漏桶限流的一种优化方案"),s(" 。在微服务场景中，基本上都选择了此种方法，因为这种方式限流比较平滑，也不会产生漏桶错杀请求的问题。"),t("strong",null,"令牌桶允许一定的突发流量，所以非常适合微服务场景"),s("。")],-1),h=t("p",null,[s("令牌桶和漏桶在基本实现原理上差不多，最大的区别是限制角度不同，"),t("strong",null,"漏桶是限制流出的速度，而令牌桶是限制令牌流入的速度"),s("。令牌桶会单独维护一个令牌的存储桶，这个桶会持续放入令牌，并且配合设置一个 burst 的参数，作为令牌的存储上限；而放入令牌的每秒速度为每秒 limit 个，用户请求会源源不断地消耗桶中的令牌。当令牌桶内的令牌耗光，就会触发限流。")],-1),d=r('<p>令牌桶原理示意图</p><p>令牌桶的参数并非特别容易理解，在实际使用中，经常会被错误使用。下面我结合 golang的 /x/time/rate 库和 openresty 中限流模块的参数具体讲解。</p><ul><li><p><strong>limit：每秒往桶中放入的令牌数量</strong>。因为名称的原因，这个值很容易被理解为限流值，这样的理解实际上是错误的，令牌桶的限流值需要结合 burst 一起确定。</p></li><li><p><strong>burst</strong> ：字面上看是突发的意思，虽然它能起到突发的作用，但实际意思是<strong>令牌桶的容量大小</strong>。</p></li></ul><p>现在我们初步了解了这两个字段，下面我将结合一个具体的需求和参数值详细解释，帮助你彻底理解这两个值的含义。</p><p>假定线上有一个服务 A，每天高峰期访问量是 800 QPS，单机 CPU 水位在 60% 左右，对于这个服务我们用令牌桶算法，希望设置 1000 的限流值，并允许一定的瞬间突发量。</p><p>我们设置 limit 为 1000，这样每秒就能放入 1000 个令牌桶，burst 的值我们也设置为 1000，这样桶的大小就为 1000。</p><p>在这样的设置下会发生什么呢？假如前一秒有 800 个请求发生，因为 burst 我们设置的是 1000，那么令牌桶中会存有 200 个令牌的余量，加上每秒 1000 个令牌的生成速度，那么当前这一秒，我们就有 1200 个令牌。</p><p>这个时候我们就有 200 的突发量，当前 1s 可以最大允许 1200 个请求的通过。当令牌的放入速度小于令牌的消耗速度时，上一秒桶内剩余的 200 令牌就起到作用了，这个时候会消耗这些剩余令牌，因此不会像上面提到的漏桶那样误杀请求。</p><p>再继续思考一下，下一秒的情况可能就没这么乐观了，因为上一秒消耗了所有的令牌，那么在这种情况下令牌桶会退化成漏桶的行为，<strong>在某个时间片内，消耗的速度大于了令牌的生成速度，又没有存量，就会触发限流了</strong>。</p><p>同样是这个例子，假如我们对参数 limit 和 burst 按照错误的理解来配置，看看会发生什么。</p><p>按照错误的理解，我们将 limit 理解为限流阈值，设置为 1000，burst 值理解为突发，设置为10。在这样的设置下，加入每秒的请求量是 800，如果每秒的流量并不均匀，因为桶内的令牌存储量最大为 10 个，那么只要某一瞬间的流量超过 10 个，就会产生限流。</p><p>看一个更容易理解的场景，前一秒的量是 600，因为令牌桶的存储量为 10，如果当前一秒桶内没有剩余的令牌存储量，那么当前一秒令牌桶的行为就会退化成漏桶，很容易触发限流行为。可以看到：<strong>错误的理解让限流并没有按照我们的预期发生，反而造成了正常的流量被限流</strong>。</p><h4 id="单机限流和全局限流" tabindex="-1">单机限流和全局限流 <a class="header-anchor" href="#单机限流和全局限流" aria-label="Permalink to &quot;单机限流和全局限流&quot;">​</a></h4><p>在微服务的限流选择中，我们往往会纠结选择单机限流还是全局限流，下面我们看一下两种限流的适用场景。</p><p><strong>全局限流：指的是一组微服务集群，通过外部存储对集群整体流量做限流</strong>。这种情况因为需要依赖外部存储所以比较难实现，毕竟和外部存储的交互需要增加额外延时。全局限流比较适合后端 DB 有吞吐量限制的情况，有些场景需要扩容 Web 机器，这个时候请求量可能会增加，会造成对 DB 请求量的增加，所以需要设置一个全局限流值防止对 DB 的冲击。</p><p><strong>单机限流：指的是一组微服务集群，通过对单个机器的限流，达到服务整体限流的目的</strong> 。在微服务场景中，因为全局限流比较难做到，所以单机限流应用得比较多。单机限流可以适应大部分场景，毕竟<strong>在分布式场景中，单一机器负载控制住，大多数场景也就能控制住整个集群的负载</strong>。</p><p>这种限流也不影响扩缩容，Web 机器因为负载不足可以随时横向扩容，此时单机限流值不需要改动；而在全局限流中，当 Web 机器扩容时，也需要限流值随之改动，为扩缩容带来了不便。</p><p>到这里为止，微服务治理中的限流模块我们就讲解完成了，下面我们来看一下微服务治理中另外一个核心模块：熔断。</p><h3 id="熔断" tabindex="-1">熔断 <a class="header-anchor" href="#熔断" aria-label="Permalink to &quot;熔断&quot;">​</a></h3><p>熔断也叫断路器，断路器是一种开关模式，这种方式可以参考电路系统中的过载保护机制。<strong>当线路发生短路或者过载时，断路器能够及时切断电路，防止发生过热、起火等故障</strong>。这个过程其实就是我们在现实生活中经常说的&quot;跳闸&quot;。</p><p>在微服务中，熔断组件也能起到类似的作用，当然还能根据情况进行恢复。熔断组件有三种状态，根据错误率不同的比例，会在三种状态间进行状态转移。下面让我们看一下这三种状态。</p><ul><li><p>Closed（关闭）：默认初始状态为关闭。</p></li><li><p>Open（开启）：假定我们设置 10s 的滑动窗口，当 10s 内的错误比例达到我们设定阈值的 90% ，此时状态会从 Closed 改变为 Open。</p></li><li><p>HalfOpen（半开）：再经过一个 10s 的窗口期，此时熔断器会自动从 Open 转移到 HalfOpen 状态。在这个状态下，我们会按照线性的方式来放行流量，公式如下：</p><p><strong>0.5 * (Now() - Start())/Duration</strong></p></li></ul><p>直到 10s 的滑动窗口内接口成功率重新恢复到 90% 才会转移到 Closed 状态，反之继续变更为 Open 状态。</p>',23),m=r('<p>熔断原理效果图</p><p>熔断的原理和实现都比较简单，但注意以下参数要根据实际情况设置。</p><ul><li><p>滑动窗口时间：在生产环境中，我一般设置为 10s，<strong>注意这个值不能太长，否则熔断的恢复时间也会随之变长</strong>。</p></li><li><p>触发条件：假如是 HTTP 服务，在生产环境下，这个值我设置为 499-600 之间的错误码，可以理解为 499 错误码和 5xx 的错误码（499 错误码代表客户端主动断开，一般是超时引起的，而 5xx 错误码在 HTTP 中是服务端错误）。</p></li></ul><p>如果是非 HTTP 服务，在 Service Mesh 体系下，我会把 gRPC 或者 Dubbo 的错误码转成对应的 HTTP 错误码进行统一的处理。具体的转换规则，就需要你根据自己的理解进行设置了。<strong>注意一般 Service Mesh 中的熔断不会统计业务的错误码做熔断处理，只统计系统层面的错误</strong>。</p><h3 id="结语" tabindex="-1">结语 <a class="header-anchor" href="#结语" aria-label="Permalink to &quot;结语&quot;">​</a></h3><p>这一节我主要讲解了微服务中的核心模块------服务治理，包括限流和熔断这两个服务治理中最重要的模块。实际上，服务治理是微服务架构中不可缺少的组件，没有服务治理的微服务就相当于没有信号灯的十字路口，&quot;交通事故&quot;的发生只是时间问题，千万不要有侥幸心理。</p>',6),T=t("p",null,"本节内容到这里就结束了，下一讲我们一同来学习连接池，包括 TCP 连接的基础知识以及 HTTP 和 HTTP/2 协议连接层的详细知识。",-1),A=t("p",null,"经过这节内容的讲解，你觉得在你心目中哪种限流算法更适合微服务场景呢？欢迎在留言区和我分享你的观点。我们下一讲再见！",-1);function C(b,q,P,S,k,f){const o=a("Image");return n(),_("div",null,[i,e(o,{alt:"Lark20210105-141453.png",src:"https://s0.lgstatic.com/i/image2/M01/04/9B/Cip5yF_0A_WAZQgVAAAtmIjDVxI778.png"}),s(),g,c,u,h,e(o,{alt:"Lark20210105-120618.png",src:"https://s0.lgstatic.com/i/image/M00/8C/C2/CgqCHl_z5qSAT55BAABz-SY91_c773.png"}),s(),d,e(o,{alt:"Lark20210105-120624.png",src:"https://s0.lgstatic.com/i/image/M00/8C/C2/CgqCHl_z5rSAaZDdAACuiABilNk301.png"}),s(),m,e(o,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/8C/C2/CgqCHl_z5sKAAQ-6AAGFBeHo7q8634.png"}),s(),e(o,{alt:"Lark20210105-120626.png",src:"https://s0.lgstatic.com/i/image/M00/8C/B7/Ciqc1F_z5tmAU6aIAAFSXKvkjl0518.png"}),s(),T,A])}const I=p(l,[["render",C]]);export{B as __pageData,I as default};
