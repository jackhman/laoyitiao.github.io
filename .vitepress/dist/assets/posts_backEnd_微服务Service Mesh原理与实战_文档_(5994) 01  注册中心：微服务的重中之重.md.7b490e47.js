import{_ as t,j as o,o as p,g as l,k as n,h as r,s,Q as e}from"./chunks/framework.4e7d56ce.js";const B=JSON.parse('{"title":"服务注册发现 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/微服务Service Mesh原理与实战_文档/(5994) 01  注册中心：微服务的重中之重.md","filePath":"posts/backEnd/微服务Service Mesh原理与实战_文档/(5994) 01  注册中心：微服务的重中之重.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/微服务Service Mesh原理与实战_文档/(5994) 01  注册中心：微服务的重中之重.md"},i=e(`<p>在导读部分介绍微服务时，我提到微服务架构的引进也带来了一些问题。其中服务注册发现，是最先需要解决的问题。简单来说，<strong>服务注册与发现就是保证当服务上下线发生变更时，服务消费者和服务提供者能够保持正常通信</strong>。</p><p>而在分布式架构中，服务会注册到注册中心，当服务需要调用其他服务时，就到这里找到服务的地址，进行调用。<strong>注册中心是微服务中最重要的内容，也是和 SOA 架构中的集中总线通信最大的区别点</strong>。今天，我就跟你聊一聊注册中心。</p><h3 id="服务注册发现" tabindex="-1">服务注册发现 <a class="header-anchor" href="#服务注册发现" aria-label="Permalink to &quot;服务注册发现&quot;">​</a></h3><p>首先，请你设想一下，在单体服务架构中，我们只有一个服务，这个服务前面就是像 Nginx 这样的网关系统，负责负载均衡，而后端的机器节点也是我们手动配置上去的，比如：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">upstream backend { </span></span>
<span class="line"><span style="color:#E1E4E8;">  server </span><span style="color:#79B8FF;">10.0</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">0</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">1</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">80</span><span style="color:#E1E4E8;">; </span></span>
<span class="line"><span style="color:#E1E4E8;">  server </span><span style="color:#79B8FF;">10.0</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">0</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">2</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">80</span><span style="color:#E1E4E8;">; </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">upstream backend { </span></span>
<span class="line"><span style="color:#24292E;">  server </span><span style="color:#005CC5;">10.0</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">0</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">1</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">80</span><span style="color:#24292E;">; </span></span>
<span class="line"><span style="color:#24292E;">  server </span><span style="color:#005CC5;">10.0</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">0</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">2</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">80</span><span style="color:#24292E;">; </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>相信大家都配置过此类配置，如果机器不够用了，增加一个节点，然后 reload 一下 Nginx 就好了。这样的配置，架构运行得还算稳定，维护成本公司也还可以接受。</p><p>但随着这个项目越来越出名，老板开始想继续开发 2 期、3 期、4 期......此时不断扩大的新项目仍旧和老项目共用一个用户体系，这么多服务使用同一个数据库，数据库压力也越来越大，你想到了把用户模块独立成一个单独的服务。这样也就开始了单体服务演进到微服务的过程。</p><p>这时，你遇到了第一个问题：单体服务和新拆出来的用户服务之间如何通信？其实你选择一个 RPC 协议或者 HTTP 做通信协议都是可以解决问题的。</p><p>那如何保证服务的高可用呢？你可能很容易想到，和单体服务一样，给这个新的用户服务配置一个内部网关用作负载均衡。因为内部服务数量不多，这样比较容易应付增加机器带来的网关配置变动。</p><p>随着项目越来越复杂，修正 Bug 和正确地添加新功能变得更加困难，你选择继续拆分服务。慢慢地，你拆分的服务数量上升到了两位数，但是你发现<strong>每次因为机器负载瓶颈而增加机器时，需要修改很多份内网网关配置，</strong> 这无形中可以预料到，修改配置带来的维护成本和出错的概率都会呈指数级增加。</p><p>这个时候我们亟需一种解决上述问题的办法：服务注册发现。</p><p>单说服务注册发现这个概念，你可能很难理解，但跟你说清楚它能解决什么问题，你就能很好理解了。为了方便你理解，我结合下面的图片做个简单说明。</p>`,12),_=e('<p>服务注册发现示意图</p><p>通过示意图我们可以发现：服务在启动时，将自己的信息注册到服务发现组件中，服务发现组件会存储这些信息。服务消费者可从服务发现组件查询服务提供者的网络地址，并使用该地址调用服务提供者接口。而当服务提供者网络地址发生变更时，会重新注册到服务发现组件。使用这种方式，服务消费者就无须人工修改提供者的网络地址了。</p><p>服务注册发现<strong>最大的用处就是解决需要在网关或者 LB 中，手动配置服务地址的问题。你可以无须手动配置，自动地让调用端服务发现被调用端服务的机器节点</strong>。</p><h3 id="服务注册中心" tabindex="-1">服务注册中心 <a class="header-anchor" href="#服务注册中心" aria-label="Permalink to &quot;服务注册中心&quot;">​</a></h3><p>那具体怎样利用服务注册发现解决多个服务间的通信问题呢？我举一个简单的例子，你刚进入一个新公司尚未认识其他部门同事，但是你的业务完成需要跨部门协作，这时你该怎么联系这些人？</p><p>一般来说你的公司会用钉钉或者是飞书，整个公司有一个通讯录，组织架构中的所有联系人都会在列表中，当你联系其他部门同事时，就可以通过这个列表私聊他们。你用这个列表解决了与其他部门成员通信的问题，而解决多个服务间通信问题的工具，我们称之为服务注册中心。</p><p>所以有些人也会把注册中心叫作名字服务，顾名思义，也就是通过服务名查找对应的服务地址的服务，这有点像手机中的&quot;通讯录&quot;------通过人名查找手机号。<strong>在分布式架构中，注册中心承接了服务的地址录入和查找功能</strong>。</p><p>你看，想解决多个服务间的通信问题，只要实现一个注册中心服务，让业务服务在启动的时候调用注册接口注册上来，再由注册中心服务把注册上来的机器信息存储起来，当其他服务调用时，通过 watch 服务名发现这个服务的后端机器节点，就可以了。</p><p>当你完全理解了注册中心后，你可以很容易实现一个简单的注册中心。但作为微服务最核心的组件，想要做到工业级产品，生产高可用，并不是那么容易的一件事。</p><h3 id="注册中心的健康检查设计" tabindex="-1">注册中心的健康检查设计 <a class="header-anchor" href="#注册中心的健康检查设计" aria-label="Permalink to &quot;注册中心的健康检查设计&quot;">​</a></h3><p>想要实现一个基本的注册中心，健康检查功能是必不可少的。你可以想象一下，如果一个节点出现了问题，流量还被打过去，这肯定是所有业务都无法接受的，所以我们需要有一定的健康检查机制来确保服务节点的健康状态。</p><p>我们来看看 3 种不同的健康检查方式，你也可以结合具体的业务场景想一想哪种健康检查方式更适合自己。</p><h4 id="_1-服务主动探活" tabindex="-1">1. 服务主动探活 <a class="header-anchor" href="#_1-服务主动探活" aria-label="Permalink to &quot;1. 服务主动探活&quot;">​</a></h4><p>服务通过定时发送续租信息到注册中心，以表明自己节点的存活。</p><p>主动探活的方式其实是我们在使用注册中心时用得最多的一种方式，<strong>如果你的服务集群规模不大，或者选用了类似 Eureka 这样的最终一致性的注册中心，服务主动探活绝对是你的最优的选择</strong>。这种方式最大程度避免了在Kubernetes环境中，因为 IP 重用导致节点在旧的服务上依然存活的问题，毕竟续租信息都是带着服务信息上报到注册中心的。</p><p>但主动探活的最大问题，是<strong>造成注册中心的写操作变多</strong>。特别是在服务发布时，节点会产生比较大的变动，注册中心的写压力也就会变大。而且强一致性的注册中心，节点变化一定要主节点确认，如果没有做注册中心的读写分离，就会产生大量的通知事件，对带宽、CPU 来说都是灾难性的问题，这个时候注册中心已经完全没有办法响应 TTL 的租约请求，也会导致大量的节点失效。</p><p>另外这种方案还有一个问题，<strong>主动租约，其实并不足以说明服务是健康的，毕竟有些情况下，服务虽然无法对外提供服务了，但还是可以对外发送租约请求的</strong>。</p><h4 id="_2-注册中心主动发起健康检查。" tabindex="-1">2. 注册中心主动发起健康检查。 <a class="header-anchor" href="#_2-注册中心主动发起健康检查。" aria-label="Permalink to &quot;2. 注册中心主动发起健康检查。&quot;">​</a></h4><p>服务在进行服务注册时，向注册中心表明自己的健康检查接口，比如 /ping 或者 TCP 端口，注册中心通过定时访问的方式，探明节点是否存活。</p><p>第二种方案<strong>在一定程度上解决了服务主动探活并不能说明服务健康的问题</strong>，毕竟通过 /ping 这种健康检查接口很大程度上可以说明服务的健康度。在Kubernetes环境中，也是通过对 Pod 进行主动健康检查来判定 Pod 的健康度的。</p><p>但这个方案也有一些问题，比如上面提到的 IP 重用问题，如果两个服务都用了 /ping 接口做健康检查，并且端口一致，就很容易发生节点在旧服务被重新激活的问题。当然也有相应的解决方案，就是参考 Envoy 做服务名称的 check。</p><h4 id="_3-注册中心不进行任何健康检查-由调用方负载均衡器进行健康检查。" tabindex="-1">3. 注册中心不进行任何健康检查，由调用方负载均衡器进行健康检查。 <a class="header-anchor" href="#_3-注册中心不进行任何健康检查-由调用方负载均衡器进行健康检查。" aria-label="Permalink to &quot;3. 注册中心不进行任何健康检查，由调用方负载均衡器进行健康检查。&quot;">​</a></h4><p>注册中心不进行任何探活机制，全部由调用方的负载均衡器进行主动和被动探活。</p><p>第三种方案就比较极端了，不做任何健康检查，完全靠负载均衡器的能力。这种方式也是有应用场景的，如果使用了 gRPC 这样比较完善的 RPC 库，一般都有自动摘除节点的能力。但我们也要考虑到这个方案的不足，<strong>如果 IP 被重用，节点很大概率会一直存在在旧服务中，这样的脏数据随时都是风险点</strong>。</p><p>当然我们可以结合前面两个方案，优化此方案。<strong>你可以在做健康检查的同时，注册中心下发包含健康节点和非健康节点的数据到服务节点，并针对健康检查未通过的删除节点设置一个较长的过期时间，这样就可以解决 IP 重用产生脏数据的问题了</strong>。</p><p>在实际工作中，虽然第三种方案并没有很受大家欢迎，但优化过后的第三种方案，却是稳定性最高的方案，也是最容易实现的方案。</p><p>其实三种方式各有利弊，<strong>你在选择时，一定要根据自己的服务规模、运维环境，选择一个合适的方案</strong>。</p><h3 id="注册中心选型" tabindex="-1">注册中心选型 <a class="header-anchor" href="#注册中心选型" aria-label="Permalink to &quot;注册中心选型&quot;">​</a></h3><p>说了这么多，我们来看看注册中心的选型问题，毕竟选择一个合适的注册中心会事半功倍，也会减少线上异常的概率。</p><p>首先我们先看下几种注册中心的对比：</p>',30),h=e('<p>我来简单解释一下 CAP 理论，一致性（Consistency）、可用性（Availability）、分区容错性（Partition tolerance），CAP 不可能都取，只能取其中2个。</p><p>在注册中心这个场景中，一致性要求并不是很高，只要达到最终的一致性即可。毕竟涉及节点的注册和反注册，我们通知到客户端，也需要一定时间，一致性本身就是几乎不可能达到的事情。</p><p><strong>所以在选型的时候，优先选择 AP 的系统。如果技术栈是 Go ，但又担心 Java 的组件不好维护，你也可以考虑自研注册中心，当然 CP 的注册中心并非不可用，在服务集群规模比较小的情况下，也是可以选择的</strong>。</p><h3 id="结语" tabindex="-1">结语 <a class="header-anchor" href="#结语" aria-label="Permalink to &quot;结语&quot;">​</a></h3><p>这一讲我主要讲了在微服务架构中为什么要引入服务注册发现、注册中心健康检查的设计和注册中心的选型。</p><p>在这里我还要补充一句，<strong>在做服务注册发现的时候，一定要坚持一个原则------不要陷入过度重视时效性的误区</strong> 。作为一个程序员，大家肯定特别重视程序的性能，这也容易陷入推送时效性的竞赛中，但<strong>在注册中心这个场景，保证微服务集群的稳定性是第一优先级</strong>。</p>',6),g=s("p",null,"本节内容到这里就结束了，下一小节我会继续讲解 Service Mesh 中的注册中心、注册中心使用过程中会遇到哪些问题，以及具体的解决措施。希望你学习完下一小节的内容，能够更好地解决注册中心使用中遇到的问题。",-1),d=s("p",null,"经过这节内容的讲解，如果让你选择一个注册中心( Etcd、Consul、Zookeeper、Nacos、Eureka 等)，你会选哪个呢？还是你会选择自研呢？欢迎在留言区和我分享你的观点。我们下一讲再见。",-1),E=s("hr",null,null,-1),y={href:"https://shenceyun.lagou.com/t/Mka",target:"_blank",rel:"noreferrer"},u=s("p",null,[s("a",{href:"https://shenceyun.lagou.com/t/Mka",target:"_blank",rel:"noreferrer"},"拉勾背书内推 + 硬核实战技术干货，帮助每位 Java 工程师达到阿里 P7 技术能力。点此链接，快来领取！")],-1);function C(m,A,P,k,b,f){const a=o("Image");return p(),l("div",null,[i,n(a,{alt:"Lark20201221-143815.png",src:"https://s0.lgstatic.com/i/image/M00/8B/CD/CgqCHl_gQvSAGqjMAABuC4M18YQ271.png"}),r(),_,n(a,{alt:"Lark20201221-143819.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A5/CgpVE1_gQwKAeiByAAC0OeXR6rM346.png"}),h,n(a,{alt:"Lark20201221-143810.png",src:"https://s0.lgstatic.com/i/image/M00/8B/C2/Ciqc1F_gQxmAEAQpAAGMDFMaHJc522.png"}),g,d,E,s("p",null,[s("a",y,[n(a,{alt:"java_高薪训练营.png",src:"https://s0.lgstatic.com/i/image/M00/8B/BD/Ciqc1F_gEFiAcnCNAAhXSgFweBY589.png"})])]),u])}const T=t(c,[["render",C]]);export{B as __pageData,T as default};
