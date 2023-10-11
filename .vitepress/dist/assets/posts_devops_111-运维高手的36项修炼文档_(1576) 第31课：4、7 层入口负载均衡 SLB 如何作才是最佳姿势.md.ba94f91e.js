import{_ as i,D as o,o as r,g as n,J as t,h as p,Q as a}from"./chunks/framework.f67d7268.js";const D=JSON.parse('{"title":"第31课：4、7层入口负载均衡SLB如何作才是最佳姿势","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/111-运维高手的36项修炼文档/(1576) 第31课：4、7 层入口负载均衡 SLB 如何作才是最佳姿势.md","filePath":"posts/devops/111-运维高手的36项修炼文档/(1576) 第31课：4、7 层入口负载均衡 SLB 如何作才是最佳姿势.md","lastUpdated":1696682708000}'),s={name:"posts/devops/111-运维高手的36项修炼文档/(1576) 第31课：4、7 层入口负载均衡 SLB 如何作才是最佳姿势.md"},_=a('<h1 id="第31课-4、7层入口负载均衡slb如何作才是最佳姿势" tabindex="-1">第31课：4、7层入口负载均衡SLB如何作才是最佳姿势 <a class="header-anchor" href="#第31课-4、7层入口负载均衡slb如何作才是最佳姿势" aria-label="Permalink to &quot;第31课：4、7层入口负载均衡SLB如何作才是最佳姿势&quot;">​</a></h1><p>本课时我们来学习 4/7 层入口负载均衡该如何进行设计。</p><h3 id="负载均衡分类" tabindex="-1">负载均衡分类 <a class="header-anchor" href="#负载均衡分类" aria-label="Permalink to &quot;负载均衡分类&quot;">​</a></h3><p>讲到负载均衡 LB（全称：Load Balance），负载均衡实现了对海量请求、并发连接、数据传送等客户端相关内容均衡，使得这些流量和压力可以分摊到后台多个单元并行处理，这样就可以避免单个后台服务单元处理压力过大，另外也增强了整体服务的可用性。基于负载均衡功能覆盖在OSI 网络模型范围来划分，可以这样进行分类：</p><p>类型一：4 层负载均衡，它是基于传输层的底层的负载均衡方案，可以实现 TCP 连接层的会话保持等功能。</p><p>类型二：7 层应用层负载均衡，它可以实现更多针对特定协议应用，比如基于 HTTP 的应用负载均衡，就可以实现对 URL 的转发应用、HTTP 请求的处理，session 信息会话保持等。7 层负载均衡更加针对特定的应用协议，如对 HTTP 和 HTTPS 系统负载均衡的服务通常使用 Nginx、Haproxy 等开源 7 层负载均衡服务。</p><p>接下来通过对比做下总结，由于 4 层负载均衡更偏向底层能力的转发，所以它的负载性能相对更好，另外因为 4 层负载均衡偏向于底层的实现模式，所以上层的应用协议都是可以基于 4 层负载均衡转发的，所以 4 层负载均衡的应用范围更广。</p><p>而 7 层负载均衡服务针对某一类具体协议，在特定支持的应用协议上支持场景更丰富。</p><p>通常一个大门户网站企业，这两个类型负载均衡不是单独存在的，而是结合 4 层负载均衡特性和 7 层负载均衡的优势，整体设计一套高可用服务架构，这里以企业入口层负载均衡常用到的 4 层负载均衡 LVS 结合 Nginx + LUA 所实现 7 层负载均衡架构做一个介绍。</p><h3 id="_4-7-层入口负载均衡实现" tabindex="-1">4/7 层入口负载均衡实现 <a class="header-anchor" href="#_4-7-层入口负载均衡实现" aria-label="Permalink to &quot;4/7 层入口负载均衡实现&quot;">​</a></h3>',10),l=a('<p>如图所示，在这张图中最上面的是 4 层负载均衡，我们可以看到这里有两台 LVS，分别为 Master （主节点）和 Slave（从节点），它们之间 HA 高可用，把 4 层负载均衡放到了最前面，因为它更加偏向底层的处理能力。</p><p>我们看到 4 层负载均衡里，实现了对 TCP 连接层的负载均衡功能，黄色的线是基于数据库，比如 MySQL 来进行负载均衡。</p><p>图中的另外一边，原理是基于 4 层负载均衡来保障 7 层负载均衡的高可用，这样就可以让 4 层负载均衡把流量在前端进行一次分流均衡，同时也通过 4 层来保障 7 层负载均衡服务本身的高可用。</p><p>这里，当用户的 HTTP 请求到了 4 层 LVS，LVS 进行负载均衡进行转发，将请求转发到后台的多组 7 层负载均衡，7 层负载均衡 Nginx + LUA 实现针对应用层的负载均衡即特定能力，比如 URL 地址处理、session 处理、基于用户连接信息的判断、认证、控制等，都可以在 7 层负载均衡中实现。</p><p>通过 Nginx 负载均衡最后倒带真实的 HTTP 后端服务单元，整体上基于 4/7 层结合的负载均衡架构。</p><h3 id="_4-层负载均衡原理及优化点" tabindex="-1">4 层负载均衡原理及优化点 <a class="header-anchor" href="#_4-层负载均衡原理及优化点" aria-label="Permalink to &quot;4 层负载均衡原理及优化点&quot;">​</a></h3><p>7 层负载均衡 Nginx + LUA 我们已在本课程第一个章节讲解了很多内容，本课时我们主要讲解 4 层负载均衡实现原理及对应的优化点。</p><p>围绕 4 层负载均衡我们还是以 LVS （全称：Linux Virtual Server）为例给你做介绍，LVS 4 层负载均衡的实现有 4 大种类。</p><ol><li><p>DR：即三角传输；</p></li><li><p>NAT：也就是目的地址改写与转发；</p></li><li><p>TUNNEL：在原有数据包上再封装了一层数据包；</p></li><li><p>FULLNAT：基于 SNAT 和 DNAT 结合对数据包处理实现转发。</p></li></ol>',9),L=a('<p>接下来我们分别介绍 4 种模式的实现原理。</p><h4 id="dr" tabindex="-1">DR <a class="header-anchor" href="#dr" aria-label="Permalink to &quot;DR&quot;">​</a></h4><p>DR（即三角传输）修改了数据包的目的 MAC 地址，让流量经过二层转发，我们可以看到这样的模式 LVS 把用户请求的数据包的目的 MAC 地址进行修改，修改成后端真实的服务单元的 MAC 地址，这样的二层转发的优点就是性能好，但缺点也很明显，就是因为修改 MAC 地址需要将真实用户请求的 VIP 下放到后台的服务节点上，其二是对网络有一定的要求，要求 LVS 和后端应用服务器在一个二层网络下，它对网络物理结构有特定要求。</p><h4 id="nat" tabindex="-1">NAT <a class="header-anchor" href="#nat" aria-label="Permalink to &quot;NAT&quot;">​</a></h4><p>第二种是 NAT 模式，它的实现原理是修改了数据包的目的 IP 地址，也就是用户请求到负载均衡以后，负载均衡修改数据包请求的目的地址为后端服务的 IP 地址，这样做的优点是应用服务器无须进行特殊的配置，因为在 LVS 上直接修改了 IP 地址，应用服务器只需要按照原有的模式进行处理就也可以了，这种模式也有它的缺点，就是由于修改了目的地址所以这里需要把后端的网关地址改写成 LVS 负载均衡的设备 IP 地址，实现 LVS 作为服务节点出口网关。</p><h4 id="tunnel" tabindex="-1">TUNNEL <a class="header-anchor" href="#tunnel" aria-label="Permalink to &quot;TUNNEL&quot;">​</a></h4><p>第三种实现模式是 TUNNEL，TUNNEL 模式在原有数据包的基础上再封装了一层，而封装过程是在 LVS 负载均衡设备上进行的，而解包则是在后端进行的，因为封包解包会损坏一些性能， TUNNEL 模式需要应用服务器支持特殊内核或添加额外的组件，所以 LVS 里使用这种模式通常较少。</p><h4 id="fullnat" tabindex="-1">FULLNAT <a class="header-anchor" href="#fullnat" aria-label="Permalink to &quot;FULLNAT&quot;">​</a></h4><p>最后就是 FULLNAT 模式，FULLNAT 模式其实做了两块数据包的改写，SNAT 做了源地址的改写，DNAT 做了目标地址的改写，改写源地址后相比 NAT 模式就不需要设置后端服务节点网关地址固定依赖 LVS，但有一个缺点就是因为修改了数据包内容会对性能产生了一些损耗。</p><p>我们综合分析下 LVS 的四种基本模式，其实各有优劣，为了让优点更加出众，同时又能修复它存在缺点，就需要考虑作架构或 LVS 的优化。</p><h3 id="优化方案" tabindex="-1">优化方案 <a class="header-anchor" href="#优化方案" aria-label="Permalink to &quot;优化方案&quot;">​</a></h3><p>接下来，我们就讲一讲基于原有 LVS 模式如何优化，首先给你推荐一套方案是基于在网络核心交换机配置 OSPF 和 ECMP帮助 LVS 提高性能的转发模式。</p><p>OSPF 是一个动态路由协议，ECMP 实现了一个多路径转发，我们在网络核心设备上配置这两个协议使得 ECMP 可以将用户请求的数据包打散到各个集群的节点上，从图中可以看到后端挂载的 LVS 负载均衡服务，这样就相当于在更底层的核心网络设备上将数据包进行打散从而实现负载均衡功能，从而减少单一依靠 LVS 实现负载产生的压力，另外通过 OSPF 来保证单 LVS 故障时动态剔除。</p><p>这样通过 OSPF 和 ECMP 在核心网络设备上来进行负载和分发，可以实现更加底层的均衡能力，同时提高整体的负载均衡性能，这套模式在近几年来应用的比较广泛。</p><p>我们知道 LVS 代码是开源的，全部由开源社区来进行维护，所以在 LVS 使用如果说有上亿量级的访问，就需要考虑对 LVS 进行针对性的优化，通常有哪些问题是我们需要考虑的呢，这里给你简单归纳总结。</p><p>一个是针对 CPU 硬中断的优化，因为 Linux 系统会使用中断的方式来通知 CPU 处理数据包，这样的 CPU 硬中断问题可能导致数据包出现阻塞问题，降低 LVS 整体处理能力。</p><p>第二个问题是由于使用 LVS，而 LVS 是使用基于 Linux 内核的 netfilter 的内核协议栈，netfilter里面有一段内核协议栈是不需要处理的，所以 LVS 内核代码上存在优化空间。</p><p>第三个问题是 session 表锁，我们讲到的 FULLNAT 模式，会进行源地址和目的地址的改写，这样就会导致入流量和出流量的 hash 结果不一致，进而导致分配到的数据包到了不同的网卡队列上，会引起需要加锁的问题，</p><p>最后一个问题就是 CPU 的亲和，主要有两点，一点是 CPU 内存访问的架构访问本地的内存存储器比访问远端的内存存储器会快10%，另外一点就是对于网卡和 CPU 会有一个中断的亲和性的绑定，这一点也是需要考虑到 LVS 上进行优化的。</p><p>那么介绍了这些问题，我们接下来讲一讲有哪些尝试可以解决这些问题。</p><p>一个是考虑通过 DPDK 来解决中断、内核处理的效率问题，提高数据处理性能和吞吐量，那么 DPDK 是什么呢，在接下来的内容中会给你做详细的介绍。</p><p>第二个就是通过 NUMA 解决跨内存调用的问题，它可以控制进程对 CPU 和 local 的内存访问，从而尽量避免对远端内存进行访问，提高处理效率。</p><p>第三点就是通过 CPU 和网卡软中断的绑定解决网卡亲和性问题，将 CPU 核心和网卡上的队列做一对一的绑定，从而提高 CPU 对网卡处理的优化性能，</p><p>第四个就是利用网卡本身的 flow director 特性来解决 session 表锁的问题，flow director 可以根据一定的策略将制定的数据包发送到指定的网卡队列，根据针对性的策略设定来保障不会分配到不同网卡队列的情况发生。</p><p>以上就是对于构建一套高性能入口层负载均衡需要尝试进行优化的方面，接下来我们讲一讲 DPDK 是什么？</p><p>DPDK是英特尔公司在原有英特尔 CPU 的架构上开发的一套用于高性能网络处理的基础库，它提供高效的数据包处理并且提供库函数驱动的支持， DPDK 专注于网络应用中数据包的高性能处理。</p><p>这里特别需要注意如通过 DPDK 来优化 LVS 性能瓶颈，我们需要使用 DPDK 的这套开发库，这个就需要对 LVS 源代码进行改写，让它结合 DPDK 开发模块，如果你所在公司缺乏研发投入，可以不必进行深入代码层面的改造，而是通过尝试直接使用一些其他大企业基于 DPDK +LVS 框架的开源负载均衡软件，如：DPVS。</p><p>DPVS 也是一个高性能的 4 层负载均衡服务，它是通过 DPDK 开源框架来改造了原有的 LVS 代码，并且进行了开源，如果你感兴趣可以访问它的GitHub地址：<a href="https://github.com/iqiyi/dpvs" target="_blank" rel="noreferrer">https://github.com/iqiyi/dpvs</a>，</p><p>对于 7 层负载均衡需要支持 DPDK 通常也是需要修改源代码的，以 Nginx 举例来说目前官方版本默认是不支持 DPDK 的，这里我也提供了一个支持 Nginx+DPDK 的 7 层负载均衡服务，GitHub 地址为：<a href="https://github.com/ansyun/dpdk-nginx" target="_blank" rel="noreferrer">https://github.com/ansyun/dpdk-nginx</a>，如果你感兴趣可以做一些深入了解。</p>',29);function h(S,P,d,c,T,V){const e=o("Image");return r(),n("div",null,[_,t(e,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/20/77/Ciqc1F7og5SAHDTIAAFdGy6d7gs623.png"}),p(),l,t(e,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/20/83/CgqCHl7og6GAN6_JAAEQoa2o41c358.png"}),p(),L])}const u=i(s,[["render",h]]);export{D as __pageData,u as default};
