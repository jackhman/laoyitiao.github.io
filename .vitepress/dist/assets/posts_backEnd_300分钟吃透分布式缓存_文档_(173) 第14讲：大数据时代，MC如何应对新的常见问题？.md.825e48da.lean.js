import{_ as l,j as c,o as h,h as o,k as t,f as a,Q as r,s as e}from"./chunks/framework.d3daa342.js";const z=JSON.parse('{"title":"第14讲：大数据时代，MC如何应对新的常见问题？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/300分钟吃透分布式缓存_文档/(173) 第14讲：大数据时代，MC如何应对新的常见问题？.md","filePath":"posts/backEnd/300分钟吃透分布式缓存_文档/(173) 第14讲：大数据时代，MC如何应对新的常见问题？.md","lastUpdated":1696682708000}'),i={name:"posts/backEnd/300分钟吃透分布式缓存_文档/(173) 第14讲：大数据时代，MC如何应对新的常见问题？.md"},n=r("",21),d=e("p",null,"而哈希取模分布算法，则比较简单，对 key 做 hash 后，对 Mc 节点数取模，即可找到待存取的目标 Mc 节点。",-1),m=e("p",null,"系统运行过程中，Mc 节点故障不可避免，有时候甚至短期内出现多次故障。在 Mc 节点故障下线后，如果采用一致性 hash 分布，可以方便得通过 rehash 策略，将该 Mc 节点的 hash 点、访问量，均匀分散到其他 Mc 节点。如果采用取模分布，则会直接导致 1/N 的访问 miss，N 是 Mc 资源池的节点数。",-1),_=e("p",null,"因此，对于单层 Mc 缓存架构，一致性 hash 分布配合 rehash 策略，是一个更佳的方案。通过将业务数据分拆到独立 Mc 资源池，同时在每个资源池采用合适的分布算法，可以很好的解决 Mc 使用中容量问题、性能瓶颈问题，以及连接瓶颈问题。",-1),p=e("h6",{id:"master-slave-两级架构",tabindex:"-1"},[a("Master-Slave 两级架构 "),e("a",{class:"header-anchor",href:"#master-slave-两级架构","aria-label":'Permalink to "Master-Slave 两级架构"'},"​")],-1),M=e("p",null,"在系统的访问量比较大，比如峰值 QPS 达到 20w 以上时，如果缓存节点故障，即便采用一致性 hash，也会在一段时间内给 DB 造成足够大的压力，导致大量慢查询和访问超时的问题。另外，如果某些缓存服务器短期多次故障，反复上下线，多次 rehash 还会产生脏数据。对此，可以采用 Master-Slave 的两级架构方案。",-1),u=e("p",null,"在这种架构方案下，将业务正常访问的 Memcached 缓存池作为 master，然后在 master 之后，再加一个slave 资源池作 master 的热备份。slave 资源池也用 6~8 个节点，内存设置只用 master 的 1/2~1/3 即可。因为 slave 的应用，主要是考虑在 master 访问 miss 或异常时，Mc 缓存池整体的命中率不会过度下降，所以并不需要设置太大内存。",-1),k=e("p",null,"日常访问，对于读操作，直接访问 master，如果访问 miss，再访问 slave。如果 slave 命中，就将读取到的 key 回写到 master。对于写操作，set、touch 等覆盖类指令，直接更新master 和 slave；而 cas、append 等，以 master 为准，master 在 cas、add 成功后，再将 key 直接 set 到 slave，以保持 master、slave 的数据一致性。",-1),v=e("p",null,"如下图，在 master 部分节点异常后，由 slave 层来承接。任何一层，部分节点的异常，不会影响整体缓存的命中率、请求耗时等 SLA 指标。同时分布方式采用哈希取模方案，mc 节点异常不rehash，直接穿透，方案简洁，还可以避免一致性 hash 在 rehash 后产生的脏数据问题。",-1),b=e("p",null,"Master-Slave 架构，在访问量比较大的场景下，可以很好得解决局部设备故障的问题。在部分节点异常或访问 miss 时，多消耗 1ms 左右的时间，访问 slave 资源，实现以时间换系统整体可用性的目的。",-1),L=e("h6",{id:"m-s-l1-架构",tabindex:"-1"},[a("M-S-L1 架构 "),e("a",{class:"header-anchor",href:"#m-s-l1-架构","aria-label":'Permalink to "M-S-L1 架构"'},"​")],-1),y=e("p",null,"20世纪初，意大利统计学家帕累托提出来一个观点：在任何特定群体中，重要的因子通常只占少数，而不重要的因子则占多数，因此只要能控制具有重要性的少数因子，即能控制全局。这个理论经过多年演化，就成为当前大家所熟悉的 80/20 定律。80/20 定律在互联网系统中也广泛存在，如 80% 的用户访问会集中在系统 20% 的功能上，80% 的请求会集中在 20% 的数据上。因此，互联网系统的数据，有明显的冷热区分，而且这个冷热程度往往比 80/20 更大，比如微博、微信最近一天的数据，被访问的特别频繁，而一周前的数据就很少被访问了。而且最近几天的热数据中，部分 feed 信息会被大量传播和交互，比其他 大部分数据的访问量要高很多倍，形成明显的头部请求。",-1),P=e("p",null,"头部请求，会导致日常大量访问，被集中在其中一小部分 key 上。同时，在突发新闻、重大事件发生时，请求量短期增加 50~70% 以上，而这些请求，又集中在 突发事件的关联 key 上，造就大量的热 key 的出现。热 key 具有随机性，如果集中在某少数几个节点，就会导致这 些节点的压力陡增数倍，负荷严重过载，进而引发大量查询变慢超时的问题。",-1),f=e("br",null,null,-1),S=e("p",null,"为了应对日常峰值的热数据访问，特别是在应对突发事件时，洪峰流量带来的极热数据访问，我们可以通过增加 L1 层来解决。如下图所示，L1 层包含 2~6 组 L1 资源池，每个 L1 资源池，用 4~6 个节点，但内存容量只要 Master 的 1/10 左右即可。",-1),q=e("p",null,"如图，读请求时，首先随机选择一个 L1 进行读取，如果 miss 则访问 master，如果 master 也 miss，最后访问 slave。中途，只要任何一层命中，则对上一层资源池进行回写。",-1),C=e("p",null,"写请求时，同 Master-Slave 架构类似，对于 set 覆盖类指令，直接 set 三层所有的资源池。对于 add/cas/append 等操作，以 master 为准，master 操作成功后，将最后的 key/value set 到 L1 和 slave 层所有资源池。",-1),g=e("p",null,"由于 L1 的内存只有 master 的 1/10，且 L1 优先被读取，所以 L1 中 Memcached 只会保留最热的 key，因为 key 一旦稍微变冷，就会排到 COLD LRU 队尾，并最终被剔除。虽然 L1 的内存小，但由于 L1 里，永远只保存了 系统访问量 最大最热的数据，根据我们的统计， L1 可以满足整个系统的 60~80% 以上的请求数据。这也与 80/20 原则相符合。",-1),x=e("p",null,"master 存放全量的热数据，用于满足 L1 读取 miss 或异常后的访问流量。slave 用来存放绝大部分的热数据，而且与 master 存在一定的差异，用来满足 L1、master 读取 miss 或异常的访问流量。",-1),A=e("p",null,"这里面有个可以进一步优化的地方，即为确保 master、slave 的热度，让 master、slave 也尽可能只保留最热的那部分数据，可以在读取 L1 时，保留适当的概率，直接读取 master 或slave，让最热的 key 被访问到，从而不会被 master、slave 剔除。此时，访问路径需要稍做调整，即如果首先访问了 master，如果 miss，接下来只访问 slave。而如果首先访问了 slave，如果 miss，接下来只访问 master。",-1),N=e("p",null,"通过 Master-Slave-L1 架构，在流量洪峰到来之际，我们可以用很少的资源，快速部署多组L1资源池，然后加入 L1 层中，从而让整个系统的抗峰能力达到 N 倍的提升。从而以最简洁的办法，快速应对流量洪峰，把极热 key 分散到 N 组 L1 中，每个 L1 资源池只用负责 1/N 的请求。除了抗峰，另外，还可以轻松应对局部故障，避免雪崩的发生。",-1),B=e("br",null,null,-1),E=e("p",null,"本课时，讲解了大数据时代下大中型互联网系统的特点，访问 Memcached 缓存时的经典问题及应对方案；还讲解了如何通过分拆缓存池、Master-Slave 双层架构，来解决 Memcached 的容量问题、性能瓶颈、连接瓶颈、局部故障的问题，以及 Master-Slave-L1 三层架构，通过多层、多副本 Memcached 体系，来更好得解决突发洪峰流量和局部故障的问题。",-1),O=e("br",null,null,-1),D=e("p",null,"可以参考下面的思维导图，对这些知识点进行回顾和梳理。",-1),V=e("p",null,'OK，这节课就讲到这里啦，下一课时我将分享"Twemproxy 框架、应用及扩展 "相关的知识，记得按时来听课哈。好，下节课见，拜拜！',-1);function I(T,Q,w,U,$,G){const s=c("Image");return h(),o("div",null,[n,t(s,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/99/EB/CgotOV2lOy-AIWtkAAEG_I7e6ME855.png"}),a(),d,m,_,p,M,u,k,v,t(s,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/99/EB/CgotOV2lOy-APSFzAACJO_4i9z4144.png"}),a(),b,L,y,P,f,S,t(s,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/99/CB/CgoB5l2lOy-AbOEsAAC45Z6NG4E761.png"}),a(),q,C,g,x,A,N,B,E,O,D,t(s,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/99/EB/CgotOV2lOy-AcLeuAADi6iDPbyc277.png"}),a(),V])}const J=l(i,[["render",I]]);export{z as __pageData,J as default};
