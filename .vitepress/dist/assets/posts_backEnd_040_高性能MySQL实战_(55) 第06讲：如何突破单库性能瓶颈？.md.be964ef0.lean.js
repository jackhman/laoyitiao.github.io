import{_ as i,j as n,o as s,h as r,k as o,f as e,Q as a,s as l}from"./chunks/framework.d3daa342.js";const Tl=JSON.parse('{"title":"第06讲：如何突破单库性能瓶颈？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/040_高性能MySQL实战/(55) 第06讲：如何突破单库性能瓶颈？.md","filePath":"posts/backEnd/040_高性能MySQL实战/(55) 第06讲：如何突破单库性能瓶颈？.md","lastUpdated":1696682708000}'),p={name:"posts/backEnd/040_高性能MySQL实战/(55) 第06讲：如何突破单库性能瓶颈？.md"},c=a("",15),_=a("",23),h=l("p",null,"接下来我们从面试中经常关注的几个参数进行讲解。",-1),d=l("h2",{id:"redo-log",tabindex:"-1"},[e("Redo Log "),l("a",{class:"header-anchor",href:"#redo-log","aria-label":'Permalink to "Redo Log"'},"​")],-1),g=l("p",null,"第一个参数是控制 Redo Log 刷盘策略的 innodb_flush_log_at_trx_commit，它有三个取值策略，如下图所示。",-1),M=l("ul",null,[l("li",null,[l("p",null,"当取值为 0 ，表示事务提交时，MySQL 不会去处理日志缓存区（Log Buffer）的内容，也不会去处理日志文件的刷盘操作，由 MySQL 的后台 Master 线程每隔 1s 将缓存区的文件刷新到日志文件中。")]),l("li",null,[l("p",null,"当取值为 1 ，表示事务提交时，会将日志缓冲区的日志写入文件中，同时会刷新到磁盘中，保证数据库事务完全不会丢失。这种设置影响数据库性能。")]),l("li",null,[l("p",null,"当取值为 2，表示事务提交时，会将日志缓存区日志写入到文件中，但是不会刷新到磁盘中。由 MySQL 的后台 Master 线程每隔 1s 将系统缓存的日志文件刷新到磁盘中。")])],-1),S=l("p",null,"如下图，可以看到其不同取值时对应与日志缓冲区、OS cache、日志文件（ib_logfile）之间的关系。",-1),u=l("p",null,[l("strong",null,"Binlog")],-1),A=l("p",null,"第二个参数是控制 Binlog 刷盘策略的 sync_binlog，其取值分为 0、1、N（N>1）三类，如下图。",-1),m=a("",6),C=l("br",null,null,-1),y=l("h1",{id:"replication",tabindex:"-1"},[e("Replication "),l("a",{class:"header-anchor",href:"#replication","aria-label":'Permalink to "Replication"'},"​")],-1),L=l("p",null,"至此，MySQL 运行的服务器环境和参数优化便完成了，那如何搭建高性能的 MySQL 架构呢？接下来我们说一下 MySQL 高可用架构的基础 Replication。",-1),Q=l("p",null,"下图是 MySQL 复制的基本原理图，它描述了 Replication 的过程。",-1),P=a("",8),B=a("",11),b=l("p",null,"对于当前会话的客户端进行事务提交后，主库等待 ACK 的过程中有两种情况。",-1),f=l("ol",null,[l("li",null,[l("p",null,"事务还没发送到从库，主库 crash 并发起切换，从库为新主库。客户端收到事务提交失败的信息，需要重新提交该事务。")]),l("li",null,[l("p",null,"事务已经发送到从库，主库 crash 并发起切换，从库为新主库。从库已经应用该事务并写入数据，但客户端连接重置同样会收到事务提交失败的信息，重新提交该事务时会报错数据已存在（如订单已提交成功）。")])],-1),T=l("p",null,'如下图所示，after-commit 的情况在非当前客户端访问数据时会出现"数据幻读"的情况，例如User1 想在 t1 表插入记录 3 并在存储引擎层提交事务，此时 User2 可以看到已经提交事务的数据记录 3。当时 Master 在等待 Slave 返回 ACK 的过程中 Crash 了并且 Slave也没有成功接受到 Binlog Event，此时 Slave 提升为 Master 时 User2 发现之前访问到的数据记录 3 又不见了。如果 Master Crash 后无法启动，那么提交的事务记录 3 在从库上永远找不到了，导致数据丢失。',-1),I=l("p",null,[l("strong",null,"after-sync")],-1),G=l("p",null,"讲完 after-commit，接下来我们讲 after_sync。",-1),q=l("br",null,null,-1),v=l("p",null,"为了提升数据的安全性，MySQL 5.7 引入了增强半同步 after_sync（无损复制），并将其设置为默认的半同步方式来解决数据丢失的问题。",-1),D=l("p",null,"如下图，after-sync 是将 Master 等待 ACK 消息放到了 Binlog File Flush & Sync to Binlog File 之后，Engine Commit 之前，这样就可以保证数据不会丢失，因为 Slave 接受到event 并写入自身 relay log。",-1),R=l("p",null,"对于数据安全的场景，参数 innodb_flush_log_at_trx_commit 和 sync_log 配置为双一配合 after-sync 半同步模式是一个好的选择，这也是大部分金融场景的参数配置。",-1),k=l("p",null,"运维过程中有个关键点需要注意：当半同步等待 ACK 超时时，半同步复制会退化为异步复制，具体细节你在课后可以查看有关半同步相关参数的配置。",-1),E=l("p",null,"下图是 MySQL 官方对于半同步复制的时序图，主库等待从库写入 relay log 并返回 ACK 后才进行 Engine Commit。",-1),U=l("p",null,[l("strong",null,"Galera Cluster")],-1),O=l("p",null,"上面讲的主从异步复制、半同步复制都属于异步复制，接下来聊聊同步复制（准同步）Galera Cluster 和 MySQL Group Replication。",-1),V=l("p",null,"最开始 Galera Cluster 的实现有两个，一个是 MariaDB 实现的 MariaDB Galera Cluster - MGC；一个是 Percona 实现的 Percona XtraDB Cluster-PXC。",-1),x=l("br",null,null,-1),N=l("p",null,"通常由三个实例组成的一个集群，三个节点均可以提供读写，即常见的 Multi-Master 多主架构。客户端可以读写访问集群任意一个节点，集群节点间组成了 Group communication，如下图所示。这可以用来保证集群节点数据的强一致性，这种架构是 Share-Nothing，不共享数据、多副本的高冗余架构，拥有多点写入、同步复制、无复制延迟、并法复制、随意切换、节点自动配置、健康检查等功能。",-1),F=l("p",null,"Group communication 的本质是 Galera Cluster，它来实现强一致性、支持多点写入的同步复制集群架构，Galera Cluter 提供了一系列的 API，为上层 MySQL 提供丰富的状态信息及回调函数，API 即 Write-Set Replication API，简称 wsrep API。通过这些API 来提供基于写集验证的乐观的同步复制，当一个节点组装完写集后，每个节点在复制事务时都会在组内广播写集并进行写集比对，如果没有冲突的话，那么 Galera Cluster 层对该写集对应的事务就可以继续提交或 APPLY，当数据库 MySQL 层得到Galera Cluster 层返回的回调状态信息后继续事务提交或回滚的操作。",-1),K=l("p",null,"Galera Cluster是一个强一致性集群，当集群节点有数据写入时，Group communication 会向组内所有成员广播写集（初步可简单理解为写入的Binlog），所有节点验证通过之后写节点开始提交，其他节点执行写集应用和提交，当出现数据冲突时则写节点执行回滚，其他节点丢弃该写集。",-1),W=l("h2",{id:"mysql-group-replication",tabindex:"-1"},[e("MySQL Group Replication "),l("a",{class:"header-anchor",href:"#mysql-group-replication","aria-label":'Permalink to "MySQL Group Replication"'},"​")],-1),z=l("p",null,"MySQL 在 5.7 版本参考 Galera Cluster 的技术实现推出了 MySQL Group Replication（简称 MGR）。",-1),w=l("p",null,"MGR 同样是一个支持多点写入的多主复制架构，它基于原生 MySQL 主从复制的基础上构建组通信层，由 Group Replication 提供一组原子消息并且按照全局顺序进行消息传递，集群任何节点均可写入，但所有写入事务只有在获得复制组认证通过（多数派协议 Paxos）后才能进行提交。例如由若干个节点共同组成一个复制组，一个事务的提交必须经过组内大多数节点（N / 2 + 1）决议并通过，才能得以提交。",-1),X=l("p",null,"如下是 MySQL Group Replication /Galera Cluster 的时序图：由 3 个节点组成一个复制组，Consensus 层为一致性协议层，在事务提交过程中，发生组间通信，由 2 个节点决议（certify）通过这个事务，事务才能够最终得以提交并响应。",-1),H=l("br",null,null,-1),Y=l("h1",{id:"经典架构和适用场景",tabindex:"-1"},[e("经典架构和适用场景 "),l("a",{class:"header-anchor",href:"#经典架构和适用场景","aria-label":'Permalink to "经典架构和适用场景"'},"​")],-1),j=l("p",null,"接下来聊一下经典架构和适用场景。",-1),J=l("h2",{id:"主从复制",tabindex:"-1"},[e("主从复制 "),l("a",{class:"header-anchor",href:"#主从复制","aria-label":'Permalink to "主从复制"'},"​")],-1),Z=l("p",null,"首先是基于主从构建的一主一从架构，应用程序读写直接访问 Master 或者配置 Master 和 Slave 的数据源进行人为的读写分离，当 Master 出现故障时需要人工维护介入。通常适合于轻量级程序、高可用要求不高的业务场景。如下图所示，这类架构中应用程序直连访问 Master 和 Slave 进行读写分离，当 Master 出现故障时由于无法自动切换导致服务受损。因此通常会基于此架构加上 VIP/DNS + Keepalived 及双主复制来做一个简单的高可用切换。",-1),$=l("p",null,[l("strong",null,"双主复制")],-1),ll=l("p",null,"随着业务的发展，架构由常见的主从演变为双主架构并引入高可用组件。",-1),el=l("p",null,"常见的使用方式是构建双主复制，其中一个 Master 提供线上服务，另一个 Master 作为 Standby 供高可用切换，Master 下游挂载 Slave 承担读请求。 高可用架构通常是配置 VIP/DNS+Keepalived 或使用业内早期的 MMM 架构。",-1),tl=l("p",null,"MMM 架构提供了单点判断的 Monitor，由它来判断 Master 的存活并进行 VIP 的漂移，MMM 的优点是基于 MySQL 原生复制，其工具集功能强大，提供了一套 HA、Failover 的 tools 来帮助运维。",-1),ol=l("p",null,"MMM 缺点是架构比较落伍且长期不更新（导致很多 MySQL 的新特性无法支持，例如 GTID），同时由于 MMM 是单点判断并没有 watch dog 守护进程，对于网络分区或网络抖动的场景会出现集群脑裂，当出现业务在两边数据同时写入时会出现写入冲突甚至数据错乱的问题。最大的问题是 MMM 备选主延迟过大会导致无法切换，不提供 binlog 补偿的功能。",-1),al=l("p",null,"该架构不适用于对数据一致性要求高的业务场景，适用于能够容忍网络抖动导致数据冲突和不可用、容忍数据丢失的应用场景，其架构扩展和读写分离需要应用程序联调配合。",-1),il=l("h2",{id:"树形复制",tabindex:"-1"},[e("树形复制 "),l("a",{class:"header-anchor",href:"#树形复制","aria-label":'Permalink to "树形复制"'},"​")],-1),nl=l("p",null,"通用的架构还有树形复制，也叫级联复制。这类架构通常适用于数据访问策略分层，例如 MySQL Master 和 MySQL Slave 参与线上业务访问及高可用切换，MySQL Statistic 节点提供离线查询、报表慢查和非线上业务访问，如下图。",-1),sl=l("br",null,null,-1),rl=l("p",null,"这类架构是业内常用的复制拓扑图，开启半同步复制及配置一套高可用切换工具即可应对大部分应用场景的访问需求。",-1),pl=l("h2",{id:"环形复制",tabindex:"-1"},[e("环形复制 "),l("a",{class:"header-anchor",href:"#环形复制","aria-label":'Permalink to "环形复制"'},"​")],-1),cl=l("p",null,"最后介绍下环形复制，基于原生 MySQL Replication 构建的环形复制由于构建费力不讨好、运维复杂不友好等原因不在介绍范围内，环形复制重点在于 MySQL Group Replication 和 Galera Cluster。",-1),_l=l("p",null,"这两种架构均可满足保证集群节点数据强一致性、多点写入的需求，适用于金融场景及对数据一致性要求高的业务场景，根据成熟度和线上集群使用规模考虑，目前 MGR 线上运行较少，可以技术储备并关注官网信息，当前推进成熟的 Galera Cluster，按需选择 MariaDB Galera Cluster -MGC 或 Percona XtraDB Cluster-PXC 即可。",-1),hl=l("p",null,"至此，我们介绍了常见的一主一从、双主复制架构、树形复制架构和环形复制架构，对于实际工作中，高性能数据库架构是按需随机应变，架构是上层建筑，我们将底层的数据库服务器硬件优化好、MySQL 参数优化好及实现 MySQL 运维自动化后，就能构建整体的高性能数据库架构。",-1),dl=l("h1",{id:"拓展-统一管理的数据库架构",tabindex:"-1"},[e("拓展：统一管理的数据库架构 "),l("a",{class:"header-anchor",href:"#拓展-统一管理的数据库架构","aria-label":'Permalink to "拓展：统一管理的数据库架构"'},"​")],-1),gl=l("p",null,'拓展下，对于不同业务使用的不同集群架构，如何统一集中管理呢？下图为你提供一个建议方案，仅供学习，具体详情可关注下一个课时"如何做到 MySQL 高可用"的讲解。',-1),Ml=l("p",null,[l("strong",null,"总结回顾")],-1),Sl=l("p",null,"下面我们来回顾一下今天学习到的知识。",-1),ul=l("p",null,"首先我们对数据库服务器硬件层次从CPU、内存、磁盘等运行环境进行了优化。然后学习了 MySQL 参数如何配置，重点参数如何调优。之后又学习了 MySQL 异步复制和半同步复制的原理。最后讲解了以 MySQL 复制为基础的主从复制架构、双主复制架构、树形复制架构及环形复制架构和使用场景。简单拓展了一下如何统一管理不同的数据库架构。",-1),Al=l("p",null,"通过本次课程的学习，你需要对构建高性能数据库架构有总体的认识，需要知道从哪些细节点去考虑和优化。高性能架构需要不断的积累经验和实践，实践才能出真知，从需求中演变架构。",-1),ml=l("p",null,'以上就是课时 6 的内容，下一课时，将分享"如何实现企业级 MySQL 高可用"的相关内容。',-1);function Cl(yl,Ll,Ql,Pl,Bl,bl){const t=n("Image");return s(),r("div",null,[c,o(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/C8/CgoB5l14qf2Ab5ZoAAMN_PaSDxc146.png"}),e(),_,o(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/59/CgotOV13b9SAFV9cAAIOCL-MkT8596.png"}),e(),h,d,g,o(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/C8/CgoB5l14qiqASUrQAAFDU8g7XHU679.png"}),e(),M,S,o(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/C8/CgoB5l14qg6AdvSkAAIz1L5Wyhg198.png"}),e(),u,A,o(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/39/CgoB5l13b9SASYwuAAA1PEitTME217.png"}),e(),m,o(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/C8/CgoB5l14qhiAJMRpAAKe6j3r9zQ857.png"}),e(),o(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/E8/CgotOV14qhyASbGqAAIABh1M25E833.png"}),e(),C,y,L,Q,o(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/59/CgotOV13b9WABJe5AABtbk-GHaw720.png"}),e(),P,o(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/E8/CgotOV14qjCACWSFAAF0XWqh56Y797.png"}),e(),B,o(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/E8/CgotOV14qjyAPmVmAAPmo-NUBf8864.png"}),e(),b,f,T,o(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/C8/CgoB5l14qkGAaJmmAAMm6Xy9V8k696.png"}),e(),I,G,q,v,D,o(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/E8/CgotOV14qkWAX4nyAANIWt84L_Q313.png"}),e(),R,k,E,o(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/C8/CgoB5l14qkyAZ8S8AAF3sRSTc8A791.png"}),e(),U,O,V,o(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/E8/CgotOV14qlWAJgtyAAOLne1trKY782.png"}),e(),x,N,o(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/E8/CgotOV14qluAE6ZYAANkcEmvGU8261.png"}),e(),F,K,W,z,w,X,o(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/C8/CgoB5l14qmGAKJK6AAItN1ASsHQ361.png"}),e(),H,Y,j,J,Z,o(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/E8/CgotOV14qmaAQxTNAAEj_ZFD-y0713.png"}),e(),$,ll,el,o(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/C8/CgoB5l14qm6ALUT_AADXe23qyPc510.png"}),e(),tl,ol,al,il,nl,o(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/E8/CgotOV14qnKAe53HAACxEVpZSRY158.png"}),e(),sl,rl,pl,cl,o(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/E8/CgotOV14qniAWAZxAAPvcCjgsSg675.png"}),e(),_l,hl,dl,gl,o(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/E8/CgotOV14qn-ASaT6AALL6lXzhpQ663.png"}),e(),Ml,Sl,ul,o(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/C8/CgoB5l14qoaAGoKYAAFxFa-rTks333.png"}),e(),Al,ml])}const Il=i(p,[["render",Cl]]);export{Tl as __pageData,Il as default};
