import{_ as s,j as c,o as n,g as l,k as d,h as a,s as e,Q as o}from"./chunks/framework.4e7d56ce.js";const N=JSON.parse('{"title":"第35讲：如何为社交feed场景设计缓存体系？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/300分钟吃透分布式缓存_文档/(215) 第35讲：如何为社交feed场景设计缓存体系？.md","filePath":"posts/backEnd/300分钟吃透分布式缓存_文档/(215) 第35讲：如何为社交feed场景设计缓存体系？.md","lastUpdated":1696417798000}'),i={name:"posts/backEnd/300分钟吃透分布式缓存_文档/(215) 第35讲：如何为社交feed场景设计缓存体系？.md"},p=e("h1",{id:"第35讲-如何为社交feed场景设计缓存体系",tabindex:"-1"},[a("第35讲：如何为社交feed场景设计缓存体系？ "),e("a",{class:"header-anchor",href:"#第35讲-如何为社交feed场景设计缓存体系","aria-label":'Permalink to "第35讲：如何为社交feed场景设计缓存体系？"'},"​")],-1),r=e("br",null,null,-1),_=e("p",null,"在上一课时我们讲解了如何为海量计数场景进行缓存设计，本课时中我将讲解如何为社交 Feed 场景设计缓存体系。",-1),h=e("h2",{id:"feed-流场景分析",tabindex:"-1"},[a("Feed 流场景分析 "),e("a",{class:"header-anchor",href:"#feed-流场景分析","aria-label":'Permalink to "Feed 流场景分析"'},"​")],-1),F=o("",30),u=o("",24),b=e("p",null,"Feed 流的缓存体系中，对于 Memcached 存储采用 L1-Main-Backup 架构。这个架构前面在讲分布式 Memcached 实践中也有介绍。微博 Feed 流的 Memcached 存储架构体系中，L1 单池容量一般为 Main 池的 1/10，有 4~6 组 L1，用于存放最热的数据，可以很好的解决热点事件或节假日的流量洪峰问题。Main 池容量最大，保存了最近一段时间的几乎所有较热的数据。Backup 池的容量一般在 Main 池的 1/2 以下，主要解决 Main 池异常发生或者 miss 后的 key 访问。",-1),M=e("br",null,null,-1),m=e("p",null,"L1-Main-Bakcup 三层 Memcached 架构，可以很好抵御突发洪峰流量、局部故障等。实践中，如果业务流量不大，还可以配置成两层 Main-Bakckup。对于 2 层或 3 层 Mc 架构，处理 Mc 指令需要各种穿透、回种，需要保持数据的一致性，这些策略相对比较复杂。因此微博构建了 proxy，封装 Mc 多层的读写逻辑，简化业务的访问。部分业务由于对响应时间很敏感，不希望因为增加 proxy 一跳而增加时间开销，因此微博也提供了对应的 client，由 client 获取并订阅 Mc 部署，对三层 Mc 架构进行直接访问。",-1),f=e("br",null,null,-1),k=e("p",null,"在突发热点事件发生，大量用户上线并集中访问、发表 Feed，并且会对部分 Feed 进行超高并发的访问，总体流量增加 1 倍以上，热点数据所在的缓存节点流量增加数倍，此时需要能够快速增加多组 L1，从而快速分散这个节点数据的访问。另外在任何一层，如果有节点机器故障，也需要使用其他机器替代。这样三层 Mc 架构，时常需要进行一些变更。微博的 Mc 架构配置存放在配置中心 config-server 中，由 captain 进行管理。proxy、client 启动时读取并订阅这些配置，在 Mc 部署变更时，可以及时自动切换连接。",-1),g=e("br",null,null,-1),x=e("p",null,"Feed 流处理程序访问 Mc 架构时，对于读请求，首先会随机选择一组 L1，如果 L1 命中则直接返回，否则读取 Main 层，如果 Main 命中，则首先将 value 回种到 L1，然后返回。如果 Main 层也 miss，就再读取 slave，如果 slave 命中，则回种 Main 和最初选择的那组 L1，然后返回。如果 slave 也 miss，就从 DB 加载后，回种到各层。这里有一个例外，就是 gets 请求，因为 gets 是为了接下来的 cas 更新服务，而三层 Mc 缓存是以 Main、Backup 为基准，所以 gets 请求直接访问 Main 层，如果 Main 层失败就访问 Backup，只要有一层访问获得数据则请求成功。后续 cas 时，将数据更新到对应 Main 或 Backup，如果 cas 成功，就把这个 key/value set 到其他各层。",-1),A=e("br",null,null,-1),I=e("p",null,"对于数据更新，三层 Mc 缓存架构以 Main-Backup 为基准，即首先更新 Main 层，如果 Main 更新成功，则再写其他三层所有 Mc pool 池。如果 Main 层更新失败，再尝试更新 Backup 池，如果 Backup 池更新成功，再更新其他各层。如果 Main、Backup 都更新失败，则直接返回失败，不更新 L1 层。在数据回种，或者 Main 层更新成功后再更新其他各层时，Mc 指令的执行一般采用 noreply 方式，可以更高效的完成多池写操作。",-1),C=e("br",null,null,-1),L=e("p",null,"三层 Mc 架构，可以支撑百万级的 QPS 访问，各种场景下命中率高达 99% 以上，是 Feed 流处理程序稳定运行的重要支撑。",-1),D=e("p",null,"对于 Feed 流中的 Redis 存储访问，业务的 Redis 部署基本都采用 1 主多从的方式。同时多个子业务按类型分为 cluster 集群，通过多租户 proxy 进行访问。对于一些数据量很小的业务，还可以共享 Redis 存储，进行混合读写。对于一些响应时间敏感的业务，基于性能考虑，也支持smart client 直接访问 Redis 集群。整个 Redis 集群，由 clusterManager 进行运维、slot 维护及迁移。配置中心记录集群相关的 proxy 部署及 Redis 配置及部署等。这个架构在之前的经典分布式缓存系统课程中有详细介绍，此处不再赘述。",-1),v=e("p",null,"至此，本专栏的全部内容就讲完了，希望你可以在项目中结合所学的知识，融会贯通，也感谢你对本专栏的支持，谢谢。",-1);function B(E,S,y,T,R,q){const t=c("Image");return n(),l("div",null,[p,r,_,h,d(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5E/3C/Cgq2xl4LEmmAXJ3OAAEdlJkp5jU865.png"}),a(),F,d(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5E/3C/Cgq2xl4LEueAOUovAAFz9DMRMjI145.png"}),a(),u,d(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5E/3C/CgpOIF4LE3qAe-3lAAFLS6lCa2I412.png"}),a(),b,M,m,f,k,g,x,A,I,C,L,d(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/5E/3D/Cgq2xl4LE-eAT7CWAAGGTJkg_zY368.png"}),a(),D,v])}const V=s(i,[["render",B]]);export{N as __pageData,V as default};
