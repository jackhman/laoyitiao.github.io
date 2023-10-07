import{_ as n,j as t,o as i,g as p,k as l,h as e,Q as o,s}from"./chunks/framework.4e7d56ce.js";const H=JSON.parse('{"title":"第22讲：Redi是如何实现高可用的？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Java 源码剖析 34 讲_文档/(1782) 第22讲：Redi 是如何实现高可用的？.md","filePath":"posts/backEnd/Java 源码剖析 34 讲_文档/(1782) 第22讲：Redi 是如何实现高可用的？.md","lastUpdated":1696417798000}'),d={name:"posts/backEnd/Java 源码剖析 34 讲_文档/(1782) 第22讲：Redi 是如何实现高可用的？.md"},c=o("",19),r=o("",7),_=s("p",null,[e("而"),s("strong",null,"从从模式"),e("是指一级从节点下面还可以拥有更多的从节点，如下图所示：")],-1),R=s("p",null,"主从模式可以提高 Redis 的整体运行速度，因为使用主从模式就可以实现数据的读写分离，把写操作的请求分发到主节点上，把其他的读操作请求分发到从节点上，这样就减轻了 Redis 主节点的运行压力，并且提高了 Redis 的整体运行速度。",-1),h=s("p",null,"不但如此使用主从模式还实现了 Redis 的高可用，当主服务器宕机之后，可以很迅速的把从节点提升为主节点，为 Redis 服务器的宕机恢复节省了宝贵的时间。",-1),u=s("p",null,"并且主从复制还降低了数据丢失的风险，因为数据是完整拷贝在多台服务器上的，当一个服务器磁盘坏掉之后，可以从其他服务器拿到完整的备份数据。",-1),g=s("h4",{id:"_3-redis-哨兵模式",tabindex:"-1"},[e("3.Redis 哨兵模式 "),s("a",{class:"header-anchor",href:"#_3-redis-哨兵模式","aria-label":'Permalink to "3.Redis 哨兵模式"'},"​")],-1),y=s("p",null,"Redis 主从复制模式有那么多的优点，但是有一个致命的缺点，就是当 Redis 的主节点宕机之后，必须人工介入手动恢复，那么到特殊时间段，比如公司组织全体团建或者半夜突然发生主节点宕机的问题，此时如果等待人工去处理就会很慢，这个时间是我们不允许的，并且我们还需要招聘专职的人来负责数据恢复的事，同时招聘的人还需要懂得相关的技术才能胜任这份工作。既然如此的麻烦，那有没有简单一点的解决方案，这个时候我们就需要用到 Redis 的哨兵模式了。",-1),m=s("p",null,"Redis 哨兵模式就是用来监视 Redis 主从服务器的，当 Redis 的主从服务器发生故障之后，Redis 哨兵提供了自动容灾修复的功能，如下图所示：",-1),E=s("p",null,"Redis 哨兵模块存储在 Redis 的 src/redis-sentinel 目录下，如下图所示：",-1),A=s("p",null,'我们可以使用命令"./src/redis-sentinel sentinel.conf"来启动哨兵功能。',-1),b=s("p",null,"有了哨兵功能之后，就再也不怕 Redis 主从服务器宕机了。哨兵的工作原理是每个哨兵会以每秒钟 1 次的频率，向已知的主服务器和从服务器，发送一个 PING 命令。如果最后一次有效回复 PING 命令的时间，超过了配置的最大下线时间（Down-After-Milliseconds）时，默认是 30s，那么这个实例会被哨兵标记为主观下线。",-1),F=s("p",null,"如果一个主服务器被标记为主观下线，那么正在监视这个主服务器的所有哨兵节点，要以每秒 1 次的频率确认主服务器是否进入了主观下线的状态。如果有足够数量（quorum 配置值）的哨兵证实该主服务器为主观下线，那么这个主服务器被标记为客观下线。此时所有的哨兵会按照规则（协商）自动选出新的主节点服务器，并自动完成主服务器的自动切换功能，而整个过程都是无须人工干预的。",-1),f=s("h4",{id:"_4-redis-集群",tabindex:"-1"},[e("4.Redis 集群 "),s("a",{class:"header-anchor",href:"#_4-redis-集群","aria-label":'Permalink to "4.Redis 集群"'},"​")],-1),q=s("p",null,"Redis 集群也就是 Redis Cluster，它是 Redis 3.0 版本推出的 Redis 集群方案，将数据分布在不同的主服务器上，以此来降低系统对单主节点的依赖，并且可以大大提高 Redis 服务的读写性能。Redis 集群除了拥有主从模式 + 哨兵模式的所有功能之外，还提供了多个主从节点的集群功能，实现了真正意义上的分布式集群服务，如下图所示：",-1),C=s("p",null,"Redis 集群可以实现数据分片服务，也就是说在 Redis 集群中有 16384 个槽位用来存储所有的数据，当我们有 N 个主节点时，可以把 16384 个槽位平均分配到 N 台主服务器上。当有键值存储时，Redis 会使用 crc16 算法进行 hash 得到一个整数值，然后用这个整数值对 16384 进行取模来得到具体槽位，再把此键值存储在对应的服务器上，读取操作也是同样的道理，这样我们就实现了数据分片的功能。",-1),B=s("h3",{id:"小结",tabindex:"-1"},[e("小结 "),s("a",{class:"header-anchor",href:"#小结","aria-label":'Permalink to "小结"'},"​")],-1),D=s("p",null,"本课时我们讲了保障 Redis 高可用的 4 种手段：数据持久化保证了数据不丢失；Redis 主从让 Redis 从单机变成了多机。它有两种模式：主从模式和从从模式，但当主节点出现问题时，需要人工手动恢复系统；Redis 哨兵模式用来监控 Redis 主从模式，并提供了自动容灾恢复的功能。最后是 Redis 集群，除了可以提供主从和哨兵的功能之外，还提供了多个主从节点的集群功能，这样就可以把数据均匀的存储各个主机主节点上，实现了系统的横向扩展，大大提高了 Redis 的并发处理能力。",-1);function P(k,T,v,x,I,O){const a=t("Image");return i(),p("div",null,[c,l(a,{alt:"image (1).png",src:"https://s0.lgstatic.com/i/image/M00/0F/40/CgqCHl7HRL-ARaj7AABVIFnJgfE685.png"}),e(),r,l(a,{alt:"image (3).png",src:"https://s0.lgstatic.com/i/image/M00/0F/40/CgqCHl7HRNaAUEFMAADdgcS-e7A625.png"}),e(),_,l(a,{alt:"image (4).png",src:"https://s0.lgstatic.com/i/image/M00/0F/40/CgqCHl7HRN-APxPIAAFbO6pdGEk455.png"}),e(),R,h,u,g,y,m,l(a,{alt:"image (5).png",src:"https://s0.lgstatic.com/i/image/M00/0F/40/CgqCHl7HRPGAOotiAAEnlC_LOmI256.png"}),e(),E,l(a,{alt:"image (6).png",src:"https://s0.lgstatic.com/i/image/M00/0F/35/Ciqc1F7HRPiAT6ITAAEMYbbe7uE121.png"}),e(),A,b,F,f,q,l(a,{alt:"image (7).png",src:"https://s0.lgstatic.com/i/image/M00/0F/40/CgqCHl7HRQiASHI6AAEIfzYWTpo237.png"}),e(),C,B,D])}const S=n(d,[["render",P]]);export{H as __pageData,S as default};
