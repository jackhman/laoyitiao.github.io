import{_ as d,j as a,o as n,g as r,k as i,Q as t,s as e}from"./chunks/framework.e0c66c3f.js";const A=JSON.parse('{"title":"Redis 的主从复制 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/分布式技术原理与实战45讲_文档/(1941) 第38讲：缓存高可用：缓存如何保证高可用？.md","filePath":"posts/backEnd/分布式技术原理与实战45讲_文档/(1941) 第38讲：缓存高可用：缓存如何保证高可用？.md","lastUpdated":1696338709000}'),o={name:"posts/backEnd/分布式技术原理与实战45讲_文档/(1941) 第38讲：缓存高可用：缓存如何保证高可用？.md"},l=t("",19),p=e("p",null,"为什么是无中心呢？因为在 Redis Cluster 集群中，所有 Redis 节点都可以对外提供服务，包括路由分片、负载信息、节点状态维护等所有功能都在 Redis Cluster 中实现。",-1),_=e("p",null,"Redis 各实例间通过 Gossip 通信，这样设计的好处是架构清晰、依赖组件少，方便横向扩展，有资料介绍 Redis Cluster 集群可以扩展到 1000 个以上的节点。",-1),R=e("p",null,"Redis Cluster 另外一个好处是客户端直接连接服务器，避免了各种 Proxy 中的性能损耗，可以最大限度的保证读写性能。",-1),c=e("p",null,"除了 Redis Cluster，另外一个应用比较多的是 Codis 方案，Codis 是国内开源的一个 Redis 集群方案，其作者是个大牛，也是一位技术创业者，不知道你有没有听过最近几年比较火的分布式关系型数据库 TiDB，就来自于作者的公司 PingCAP。",-1),u=e("p",null,'Codis 的实现和 Redis Cluster 不同，是一个"中心化的结构"，同时添加了 Codis Proxy 和 Codis Manager。Codis 设计中，是在 Proxy 中实现路由、数据分片等逻辑，Redis 集群作为底层的存储引擎，另外通过 ZooKeeper 维护节点状态，可以参考下面这张 Codis 的官方架构图：',-1),C=t("",8);function h(S,m,g,P,T,f){const s=a("Image");return n(),r("div",null,[l,i(s,{alt:"image (4).png",src:"https://s0.lgstatic.com/i/image/M00/41/4E/CgqCHl8035SAXAiyAAMJUMzoREI936.png"}),p,_,R,c,u,i(s,{alt:"image (5).png",src:"https://s0.lgstatic.com/i/image/M00/41/43/Ciqc1F80356AC3hsAAGOBK6892o262.png"}),C])}const x=d(o,[["render",h]]);export{A as __pageData,x as default};
