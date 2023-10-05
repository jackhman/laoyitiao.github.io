import{_ as s,j as n,o as p,g as _,k as r,s as e,h as a,Q as o}from"./chunks/framework.4e7d56ce.js";const M=JSON.parse('{"title":"故障不可避免 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Go 微服务实战 38 讲_文档/(3817) 22  如何保障分布式系统的高可用性？（上）.md","filePath":"posts/backEnd/Go 微服务实战 38 讲_文档/(3817) 22  如何保障分布式系统的高可用性？（上）.md","lastUpdated":1696417798000}'),l={name:"posts/backEnd/Go 微服务实战 38 讲_文档/(3817) 22  如何保障分布式系统的高可用性？（上）.md"},i=e("p",null,"高可用性是我们经常提到的名词，指系统提供的服务要始终可用，无论是系统内部运行出现故障，还是系统的外部依赖出现问题，甚至遇到系统硬件损坏、停电等致命性打击，系统都要保证基本可用。",-1),g=e("p",null,"因此，高可用系统关注用户使用体验，并且通过降低系统出现故障的概率，以及缩短系统因突发故障导致的宕机时间，减轻了开发运维人员的工作。",-1),c=e("p",null,"目前，主流的互联网产品都采用了大量手段来保证系统可用性，比如淘宝在双十一时会采用限流和降级设计等手法，来保证系统能够承受住秒杀活动时产生的巨量瞬时流量；再比如，Kafka 采用冗余设计将消息备份到多个不同的 Broker 中，来避免消息丢失等。",-1),u=e("p",null,[a("那么，为了让你对系统可用性有更直观的认识，我首先带你了解分布式系统中故障不可避免的原因，然后再来介绍衡量系统可用性的"),e("strong",null,"指标"),a("，最后介绍目前常用的高可用性设计，以帮助你学习后面的项目案例实践打下理论基础。希望通过本节课的学习，你能够对如何设计高可用性系统有个整体的认知。")],-1),d=e("h3",{id:"故障不可避免",tabindex:"-1"},[a("故障不可避免 "),e("a",{class:"header-anchor",href:"#故障不可避免","aria-label":'Permalink to "故障不可避免"'},"​")],-1),T=e("p",null,"高可用性是指系统提供的服务要始终可用，然而故障不可避免，特别是在分布式系统下，面对不可控的用户流量和机房环境，系统故障将会显得更加复杂和不可预测。",-1),h=e("p",null,"在大规模的分布式系统中，各个模块之间存在错综复杂的依赖调用关系，比如前端服务依赖于后端服务获取业务处理数据，后端服务依赖于数据库进行数据持久化处理，如果任一环节出现问题，都有可能导致雪崩式、多米诺骨牌式故障，甚至可以断言故障的出现成了常态。",-1),k=o('<p>如上图的分布式系统中，用户请求查看系统中的某一个页面，请求经过服务网关转发给前端服务处理，前端服务向后端服务请求渲染页面需要的业务数据，后端服务也可能需要从数据库中查找相关的持久化数据，请求需要经过上述长长的调用链才能处理返回结果。也就是说，这时我们起码要保证网络连接正常、服务网关正常、前端服务正常、后台服务正常、数据库正常，请求才能被正常处理。如果调用链中的任一环节出现问题，就很可能请求出错，出现故障，这将直接影响到用户体验。</p><p>系统出现故障的原因多种多样，主要有以下这些：</p><ul><li><p><strong>网络问题</strong>，网络连接故障、网络带宽出现超时拥塞等；</p></li><li><p><strong>性能问题</strong>，数据库出现慢查询、Java Full GC 导致执行长时间等待、CPU 使用率过高、硬盘 IO 过载、内存分配失败等；</p></li><li><p><strong>安全问题</strong>，被网络攻击，如 DDoS 等；异常客户端请求，如爬虫等；</p></li><li><p><strong>运维问题</strong>，需求变更频繁不可控，架构也在不断地被调整，监控问题等；</p></li><li><p><strong>管理问题</strong>，没有梳理出关键服务以及服务的依赖关系，运行信息没有和控制系统同步；</p></li><li><p><strong>硬件问题</strong>，硬盘损坏导致数据读取失败、网卡出错导致网络 IO 处理失败、交换机出问题、机房断电导致服务器失联，甚至是人祸（比如挖掘机挖断机房光缆，导致一整片机房网络中断）等。</p></li></ul><p>面对如此多的可控和不可控的故障因素，系统的高可用性似乎变成不可能完成的任务，但是在日常开发运维中，我们可以采用一些有效的设计、实现和运维手段来提高系统的可用性，尽量交付一个在任何时候都基本可用的系统。</p><h3 id="系统可用性指标" tabindex="-1">系统可用性指标 <a class="header-anchor" href="#系统可用性指标" aria-label="Permalink to &quot;系统可用性指标&quot;">​</a></h3><p>系统可用性指标是衡量分布式系统高可用性的重要因素，它通常是指系统可用时间与总运行时间之比，即Availability=MTTF/(MTTF+MTTR)。</p><p>其中，<strong>MTTF</strong> （Mean Time To Failure）是指平均故障前的时间，一般是指<strong>系统正常运行的时间</strong> 。<strong>系统的可靠性越高，MTTF 越长</strong>，即系统正常运行的时间越长。</p><p><strong>MTTR</strong> （Mean Time To Recovery）是指平均修复时间，即从故障出现到故障修复的这段时间，也就是<strong>系统不可用的时间</strong> 。<strong>MTTR 越短说明系统的可用性越高</strong>。</p><p>系统可用性指标可以通过下表的 9999 标准衡量，现在普遍要求至少 2 个 9，最好 4 个 9 以上：</p>',9),m=o('<h3 id="冗余设计" tabindex="-1">冗余设计 <a class="header-anchor" href="#冗余设计" aria-label="Permalink to &quot;冗余设计&quot;">​</a></h3><p>通过前面基础知识的铺垫，我们已经了解了系统故障的必现性以及系统可用性指标的重要性。接下来，我们将介绍一些典型的高可用设计，以便你知晓如何降低系统故障对系统正常运行的影响。</p><p>分布式系统中单点故障不可取的，而<strong>降低单点故障</strong> 的不二法门就是<strong>冗余设计</strong> ，通过多点部署的方式，并且最好部署在不同的物理位置上，避免单机房中多点同时失败。冗余设计不仅可以<strong>提高服务的吞吐量</strong> ，还可以在<strong>出现灾难时快速恢复</strong>。目前常见的冗余设计有主从设计和对等治理设计，其中主从设计又可以细分为一主多从、多主多从。</p><p>冗余设计中一个不可避免的问题是考虑分布式系统中的<strong>数据一致性</strong>，多个节点中冗余的数据追求强一致性还是最终一致性。即使节点提供无状态服务，也需要借助外部服务，比如数据库、分布式缓存等维护数据状态。</p><p>CAP 是描述分布式系统下节点数据同步的基本原则，分别指：</p><ul><li><p>Consistency，<strong>数据强一致性</strong>，各个节点中对于同一份数据在任意时刻都是一致的；</p></li><li><p>Availablity，<strong>可用性</strong>，系统在任何情况下接收到客户端请求后，都能够给出响应；</p></li><li><p>Partition Tolerance，<strong>分区容忍性</strong>，系统允许节点网络通信失败。</p></li></ul><p>分布式系统一般基于网络进行数据通信，所有 P 是必须满足。但是满足数据强一致性的系统无法保证可用性，最典型的例子就是 ZooKeeper。</p><p>ZooKeeper 采用主从设计，服务集群由 Leader、Follower 和 Observer 三种节点角色组成，它们的职责如下表所示：</p>',8),A=o('<p>在 ZooKeeper 集群中，由于只有 Leader 角色的节点具备写数据的能力，所以当 Leader 节点宕机时，在新的 Leader 节点没有被选举出来之前，集群的写能力都是不可用的。在这样的情况下，虽然 ZooKeeper 保证了集群数据的强一致性，但是此时集群无法响应客户端的写请求，即不满足 C 可用性原则。</p><p>对等治理设计中比较优秀的业内体现为 Netiflx 开源的<strong>Eureka 服务注册和发现组件</strong>。Eureka 集群由 Eureka Client 和 Eureka Server 两种节点角色组成，其中 Eureka Client 是指服务实例使用的服务注册和发现的客户端，各服务实例使用它来与 Eureka Server 进行通信，主要用于向 Eureka Server 请求服务注册表中的数据和注册自身服务实例信息； Eureka Server 作为服务注册中心，在注册表中存储了各服务实例注册的服务实例信息，并定时与服务实例维持心跳，剔除掉注册表中长时间心跳失败的服务实例。Eureka Server 采用多实例的方式保证高可用性部署。</p><p>每一个 Eureka Server 都是对等的数据节点，Eureka Client 可以向任意的 Eureka Server 发起服务注册请求和服务发现请求。Eureka Server 之间的数据通过异步 HTTP 的方式同步，由于网络的不可靠性，不同 Eureka Server 中的服务实例数据不能保证在任意时间节点都相等，只能保证在 SLA 承诺时间内达到数据的最终一致性。Eureka<strong>点对点对等的设计</strong>保证了服务注册与发现中心的高可用性，但是由于 Eureka Server 数据同步的不可靠性，数据的强一致性降级为数据的最终一致性。</p><h3 id="熔断设计" tabindex="-1">熔断设计 <a class="header-anchor" href="#熔断设计" aria-label="Permalink to &quot;熔断设计&quot;">​</a></h3><p>在分布式系统中，一次完整的请求可能需要经过多个服务模块的通力合作，请求在多个服务中传递，服务对服务的调用会产生新的请求，这些请求共同组成了这次请求的调用链。当调用链中的某个环节，特别是下游服务不可用时，将会导致上游服务调用方不可用，最终将这种不可用的影响扩大到整个系统，导致整个分布式系统的不可用，引发<strong>服务雪崩现象</strong>。</p><p>为了避免这种情况，在下游服务不可用时，保护上游服务的可用性显得极其重要。对此，我们可以参考电路系统的断路器机制，在必要的时候&quot;壮士断腕&quot;，当下游服务因为过载或者故障出现各种调用失败或者调用超时现象时，及时&quot;熔断&quot;服务调用方和服务提供方的调用链，保护服务调用方资源，防止服务雪崩现象的出现。</p><p>断路器的基本设计图如下所示，由关闭、打开、半开三种状态组成。</p>',7),C=o('<ul><li><p>关闭（Closed）状态：此时服务调用者可以调用服务提供者。断路器中使用失败计数器周期性统计请求失败次数和请求总次数的比例，如果最近失败频率超过了周期时间内允许失败的阈值，则切换到打开（Open）状态。比如在查询历史订单数据时，订单服务出现短时间的宕机，该段时间内的查询历史订单的请求都会失败，100% 的调用失败率超过了断路器中的预设的失败阈值 50%，那么断路器就会打开。在关闭状态下，失败计数器基于时间周期运作，会在每个统计周期开始前自动重置，防止某次偶然错误导致断路器进入打开状态。</p></li><li><p>打开（Open）状态：在该状态下，对应用程序的请求会立即返回错误响应或者执行预设的失败降级逻辑，而不调用服务提供者。接着刚才调用订单服务的例子，在断路器处于打开状态时，所有查询历史订单的请求都会执行预设的失败降级逻辑，直接返回&quot;系统繁忙，稍后再试&quot;的提示语，避免服务调用者浪费资源进行无效的请求。断路器进入打开状态后会启动超时计时器，在计时器到达后，断路器进入半开状态，给此时不可用的服务提供者一定的时间进行恢复。</p></li><li><p>半开（Half-Open）状态：允许应用程序一定数量的请求去调用服务。如果这些请求对服务的调用成功，那么可以认为之前导致调用失败的错误已经修正，此时断路器切换到关闭状态，同时将失败计数器重置。如果这一定数量的请求存在调用失败的情况，则认为导致之前调用失败的问题仍然存在，断路器切回到打开状态，并重置超时计时器来给系统一定的时间修正错误。半开状态能够有效防止正在恢复中的服务被突然而来的大量请求再次打垮。比如订单服务在超时计时器达到之前还没修复好，从服务调用者过来的调用流量可能会破坏原先的问题环境，导致订单服务的问题排查处理更困难。半开状态也给服务调用恢复正常的机会，如果此时订单服务修复成功，半开状态尝试的请求都能够正常返回，那么就关闭断路器，查询历史订单数据的请求都恢复正常处理。</p></li></ul><p>使用断路器设计模式，能够有效地保护服务调用方的稳定性，它能够避免服务调用者频繁调用可能失败的服务提供者，防止服务调用者浪费 CPU 周期、线程和 IO 资源等，提高服务整体的可用性。</p><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3><p>鉴于分布式系统中各模块交互的复杂性和网络的不可靠性，系统出现故障的概率大大增加，对此如何提高系统的可用性是开发高质量软件系统必须考虑的。</p><p>本节课我们首先介绍了系统可用性指标，接着阐述了分布式系统中故障不可避免的情况，最后介绍了两种常用的高可用设计：</p><ul><li><p><strong>冗余设计，</strong> 如何降低分布式中出现单点故障的可能性；</p></li><li><p><strong>熔断设计，</strong> 如何防止服务雪崩，保护服务调用者的资源。</p></li></ul><p>除上述介绍的设计，还有其他针对不同场景使用的设计与方案，如限流设计等，我们都将在下篇中进行介绍。希望通过本节课的学习，你能了解可用性对于分布式系统的重要性，并初步掌握如何设计一个高可用的分布式系统。</p>',7);function E(S,P,b,q,v,f){const t=n("Image");return p(),_("div",null,[i,g,c,u,d,T,h,r(t,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/4D/BB/Ciqc1F9bJVWAGXzAAACmPXf6Gkw951.png"}),k,r(t,{alt:"Lark20200911-181411.png",src:"https://s0.lgstatic.com/i/image/M00/4D/E3/CgqCHl9bTpyAJGKxAAELzFEHw78546.png"}),m,r(t,{alt:"Lark20200911-181407.png",src:"https://s0.lgstatic.com/i/image/M00/4D/E3/CgqCHl9bTq2AVQZgAADxs8PW6qM628.png"}),A,r(t,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/4D/C7/CgqCHl9bJX6AYR6WAACD8asiP4k125.png"}),C])}const V=s(l,[["render",E]]);export{M as __pageData,V as default};
