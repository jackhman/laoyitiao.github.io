import{_ as s,j as r,o as p,h as _,k as n,f as o,Q as a,s as t}from"./chunks/framework.d3daa342.js";const N=JSON.parse('{"title":"03负载均衡器：服务发现后如何实现节点保护？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/微服务Service Mesh原理与实战_文档/(5996) 03  负载均衡器：服务发现后如何实现节点保护？.md","filePath":"posts/backEnd/微服务Service Mesh原理与实战_文档/(5996) 03  负载均衡器：服务发现后如何实现节点保护？.md","lastUpdated":1696682708000}'),g={name:"posts/backEnd/微服务Service Mesh原理与实战_文档/(5996) 03  负载均衡器：服务发现后如何实现节点保护？.md"},i=a('<h1 id="_03负载均衡器-服务发现后如何实现节点保护" tabindex="-1">03负载均衡器：服务发现后如何实现节点保护？ <a class="header-anchor" href="#_03负载均衡器-服务发现后如何实现节点保护" aria-label="Permalink to &quot;03负载均衡器：服务发现后如何实现节点保护？&quot;">​</a></h1><p>今天我要和你分享的内容是负载均衡器第一篇：在微服务架构中，应该选择什么样的负载均衡器以及服务发现后如何实现节点保护？</p><p>负载均衡器是微服务架构中非常核心的部分，因为一旦算法出现了问题，后端节点负载不一致，就会导致某个节点被打挂，甚至引起雪崩的级联反应。</p><h3 id="负载均衡器基本概念" tabindex="-1">负载均衡器基本概念 <a class="header-anchor" href="#负载均衡器基本概念" aria-label="Permalink to &quot;负载均衡器基本概念&quot;">​</a></h3><p><strong>负载均衡（Load Balance），是一种网络流量分配技术，用于解决单台机器性能出现瓶颈时，需要多台机器分摊处理流量的情况</strong>。load 在中文里也有&quot;量&quot;的意思，在这里可以理解为机器的工作量，那么 Load Balance 就是让每台机器平摊处理的工作量（请求量）。</p><p>一般情况下，我们说的负载均衡器，有以下几种实现方式。</p><p><strong>硬件负载均衡</strong>：比较常见的硬件负载均衡器有NetScaler、F5、Radware，Array 等，由专业的硬件公司生产，一般在互联网公司的早期阶段进行使用，但是由于价格昂贵，现在互联网公司很少使用了。</p><p><strong>DNS 负载均衡</strong>：通过域名返回后端节点 IP 进行负载均衡，也可以为每个后端 IP 设置权重。因为 DNS 解析存在缓存延时的问题，所以在内网较少使用。但对于大流量的 Web 和 App，入口层一般会使用此种方式做负载均衡，后端多组四层 LB 做负载均衡。</p>',8),c=a('<p>DNS 负载均衡示意图</p><p><strong>软件负载均衡</strong>：比较流行的是 Nginx、HAproxy、LVS 等，像 LVS 是四层负载均衡器，性能较高；Nginx、HAproxy 主要用于七层的负载均衡，有较多的负载均衡策略，同时流量相对于四层会更加均衡。像我们常用的云厂商，比如阿里云的 SLB 同时提供了基于 LVS 的四层负载均衡器和基于七层的 Tengine 负载均衡器供大家选择。</p><p><strong>程序内负载均衡</strong> ：严格来说它属于软件负载均衡的一种，只是<strong>把负载均衡的策略放在了服务内部</strong>。对于微服务架构来说，服务内部做负载均衡更合适，因为微服务就是通过服务发现发现服务节点的，在程序内部选取合适的流量节点自然更加合理。</p><p><strong>Serivce Mesh 负载均衡</strong>：利用 sidecar 做程序内的负载均衡，属于软件负载均衡的一种，相比 SDK 内负载均衡，可以随时更新各种负载均衡策略。</p><p>现在，你已经对负载均衡器已经有了基本的了解，实际上无论是软负载还是硬负载，基本上都用到了以下几种算法。</p><h3 id="常用的负载均衡算法" tabindex="-1">常用的负载均衡算法 <a class="header-anchor" href="#常用的负载均衡算法" aria-label="Permalink to &quot;常用的负载均衡算法&quot;">​</a></h3><p><strong>Round Robin</strong>：简单轮询算法，适合后端节点权重一致的情况。应用场景较少，但算法时间复杂度为 O(1)， 可以在预先判断后端节点权重一致的情况下使用。</p><p><strong>Weighted Round Robin</strong>：通过取最大公约数的方式，做简单轮询。因为权重多的节点会比较集中，Nginx发明了一种平滑加权轮询，通过算法将权重大的节点分散开，但在服务重启时依然会出现节点请求较为集中的情况。</p><p><strong>Weighted Random</strong>：通过随机的方式进行负载均衡，配合二分查找，可以将时间复杂度降到O(log^n)。该算法对于后端节点非常均衡，不会出现加权轮询导致的重启时节点请求较为集中的情况。</p><p><strong>Two Random Choices</strong>：目前比较流行的算法，适合后端节点权重一致的情况，通过两次随机算法，获取到两个节点，然后对比节点的 CPU 负载，延时情况等信息，获取一个最优的节点，好处是后端节点的 CPU 或者延时会比较均衡，因为分区和虚拟机硬件配置的原因，此种做法可以动态调节后端节点负载，在生产中是非常好的选择。</p><p><strong>Sticky Session（会话保持）</strong> ：根据客户端 IP 或者 Cookie 进行会话保持，实际上就是同一个客户端，每次选取的后端节点 IP 保持一致，主要是用于登录验证的会话保持。实际上<strong>此种算法让服务变成了有状态服务，另外对于后端负载也会不均衡，在微服务架构中已经较少使用</strong>。如果想要进行 Session 的保持，大多是将 Session 存储在外部存储中，比如 Redis 等。</p><p>现在你已经对负载均衡有了一个基本的了解，接下来我们进一步看看服务发现后的节点保护。</p><h3 id="服务发现后的节点保护" tabindex="-1">服务发现后的节点保护 <a class="header-anchor" href="#服务发现后的节点保护" aria-label="Permalink to &quot;服务发现后的节点保护&quot;">​</a></h3><p>服务发现后的节点保护，我在注册中心的章节也简单提到过。实际上最早我是把节点保护放在了注册发现的模块中，后来因为耦合性过高将此模块拆解出来成为独立的模块，并和负载均衡模块配合使用。实际上，在 Envoy 中，节点保护的功能也放在了负载均衡器中。</p><h4 id="主动健康检查" tabindex="-1">主动健康检查 <a class="header-anchor" href="#主动健康检查" aria-label="Permalink to &quot;主动健康检查&quot;">​</a></h4><p>受注册中心的网络分区故障等原因影响，<strong>在负载均衡器中进行主动健康检查</strong> ，是避免此类情况发生的最佳模式，但长时间的主动健康检查会产生大量无用的 ping 操作，造成不必要的机器负载损失。所以在实践中，建议选择<strong>获取过少的节点时才触发主动健康检查模式</strong>。</p><p>当获取节点过少、进入主动健康检查的模式时会触发对后端节点的 ping 操作，这个过少的阈值可以根据公司负载情况确定。比如在实际操作中，<strong>如果机器负载长期处于比较高的水位，你可以采用一个比较保守的数值，比如小于 80% 的时候触发</strong>。</p><p>为了能够保证两台机器至少能够下掉一台，<strong>我采用了 (currentNodeNum+1)/nodeCount &lt; 80% 这样的算法，以保证至少下掉一个节点</strong>。其中 nodeCount 为 15 分钟前的服务节点总数，当然这样是一个经验值，你也可以根据公司的实际情况适当调整。</p><p>另外，在容器环境中，扩缩容时可能会触发节点的自我保护模式，造成一定的短时间流量损失，但相对于因为流量打到了错误的节点上引发的雪崩，我认为此种情况还是可以接受的。</p><p><strong>恐慌阈值</strong></p><p>依据健康检查的结果判断后端节点是否正常，这种方式虽然可以保证网络分区异常情况下节点间的连通性，但如果后端节点大量不可用的情况下，只有少数节点能够通过健康检查。此种情况下，少量的节点显然是无法提供正常服务的。</p><p>另外，因为服务发版导致的服务节点多数或者全部不可用的情况也很容易出现，此时你的首选操作一定是回滚。回滚期间，节点的可用是有先后顺序的，这个时候如果完全信任主动健康检查的结果，会导致流量全部路由到新回滚成功的节点上，造成新启动的节点会立即被打挂。</p><p>解决上面两种问题的办法一种是服务治理中的限流，这部分内容我在后面会讲到；另外一种办法就是<strong>负载均衡器中的恐慌阈值。</strong> 当健康检查后节点依然少于设定的阈值，则忽略健康检查结果，将流量路由到全部的节点，包括不健康的节点，这样就可以保证负载的均衡，也不会把流量集中到过少的节点，导致服务处于&quot;雪崩&quot;的状态。</p><p>这个阈值的设置也是比较讲究的，虽然 Envoy 官方默认值是 50%，但我觉得这并不是最合适的设置：<strong>50% 的阈值太过激进，很容易达到触发条件</strong> 。而当你理解了这个阈值的作用，就会明白当线上出现故障的时候，节点是会趋于全部不可用的，所以线上我把这个值设置为 10%。因为<strong>随着故障节点变多，剩下的少量节点也扛不住调用方的所有流量，剩余的节点会慢慢趋近我们设置的阈值，一样可以达到恐慌阈值设置的目的</strong>，而且也不会因为只是少量节点故障，触发阈值导致的错误流量。</p><h4 id="被动健康检查" tabindex="-1">被动健康检查 <a class="header-anchor" href="#被动健康检查" aria-label="Permalink to &quot;被动健康检查&quot;">​</a></h4><p>有些时候单纯靠主动健康检查依然无法避免错误的流量，毕竟主动健康检查只是通过特定的 ping 接口或者 TCP 探活进行健康检查的，这些并不是服务的真实流量，特别是在使用 TCP 探活的时候，更容易出现问题。这个时候就需要<strong>被动健康检查</strong> 了，<strong>通过真实流量来判断节点是否正常，也就是利用节点熔断器</strong>。</p><p>和服务级别的熔断器一样，节点熔断器也是<strong>通过状态码判断服务是否正常</strong> ，假如后端是 HTTP 服务，我们通常会<strong>将 499 以上的错误码认为是后端服务错误</strong>。通过记录 10s 的滑动窗口内的错误码比例，当后端节点的错误比例达到我们设置的阈值时，便将后端节点从负载均衡器中移除。当然你也要考虑不能摘除过多的节点，所以熔断器需要设置和自我保护相同的触发阈值，以避免过多的节点被移出引发&quot;雪崩&quot;。</p><p>现在我们已经讲完了主动和被动健康检查，通过两种健康检查的配合，你基本上能够避免大多数节点故障的异常情况了。</p><h3 id="结语" tabindex="-1">结语 <a class="header-anchor" href="#结语" aria-label="Permalink to &quot;结语&quot;">​</a></h3><p>这一节我主要讲解了负载均衡的基础知识，包括负载均衡的基本概念、常用的负载均衡算法以及负载均衡中的节点保护。</p>',30),l=t("p",null,"本节内容到这里就结束了，下一小节我会讲解负载均衡的进阶知识，包括在跨区部署的情况下如何更好地做负载均衡以及如何让后端节点的机器负载更加均衡。",-1),h=t("p",null,"最后我想给你留一个小问题：如果让你为微服务架构选取一个合适的负载均衡算法，你会选择哪一种，欢迎在留言区和我分享你的观点。我们下一讲再见。",-1),d=t("hr",null,null,-1),u=t("p",null,"[",-1),m=t("p",null,[o("]("),t("a",{href:"https://shenceyun.lagou.com/t/Mka",target:"_blank",rel:"noreferrer"},"https://shenceyun.lagou.com/t/Mka"),o(")")],-1),S=t("p",null,[t("a",{href:"https://shenceyun.lagou.com/t/Mka",target:"_blank",rel:"noreferrer"},"拉勾背书内推 + 硬核实战技术干货，帮助每位 Java 工程师达到阿里 P7 技术能力。点此链接，快来领取！")],-1);function P(k,b,q,T,f,A){const e=r("Image");return p(),_("div",null,[i,n(e,{alt:"Lark20201225-143913.png",src:"https://s0.lgstatic.com/i/image2/M01/03/F6/Cip5yF_liTCAWeozAABK8gkEa7w975.png"}),o(),c,n(e,{alt:"Lark20201225-143917.png",src:"https://s0.lgstatic.com/i/image2/M01/03/F8/CgpVE1_liT-AFWYWAALgY2P_R3c036.png"}),o(),l,h,d,u,n(e,{alt:"java_高薪训练营.png",src:"https://s0.lgstatic.com/i/image/M00/8B/BD/Ciqc1F_gEFiAcnCNAAhXSgFweBY589.png"}),o(),m,S])}const x=s(g,[["render",P]]);export{N as __pageData,x as default};
