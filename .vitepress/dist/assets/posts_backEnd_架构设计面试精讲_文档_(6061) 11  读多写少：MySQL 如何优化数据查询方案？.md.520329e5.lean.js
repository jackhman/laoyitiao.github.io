import{_ as n,j as s,o as i,h as _,k as l,f as p,Q as a,s as t}from"./chunks/framework.d3daa342.js";const D=JSON.parse('{"title":"11读多写少：MySQL如何优化数据查询方案？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/架构设计面试精讲_文档/(6061) 11  读多写少：MySQL 如何优化数据查询方案？.md","filePath":"posts/backEnd/架构设计面试精讲_文档/(6061) 11  读多写少：MySQL 如何优化数据查询方案？.md","lastUpdated":1696682708000}'),e={name:"posts/backEnd/架构设计面试精讲_文档/(6061) 11  读多写少：MySQL 如何优化数据查询方案？.md"},r=a("",11),u=a("",11),c=t("p",null,"主从复制过程",-1),g=t("p",null,"但在面试中你不能简单地只讲这几个阶段，要尽可能详细地说明主库和从库的数据同步过程，为的是让面试官感受到你技术的扎实程度（详细过程如下）。",-1),h=t("ul",null,[t("li",null,[t("p",null,'MySQL 主库在收到客户端提交事务的请求之后，会先写入 binlog，再提交事务，更新存储引擎中的数据，事务提交完成后，返回给客户端"操作成功"的响应。')]),t("li",null,[t("p",null,'从库会创建一个专门的 I/O 线程，连接主库的 log dump 线程，来接收主库的 binlog 日志，再把 binlog 信息写入 relay log 的中继日志里，再返回给主库"复制成功"的响应。')]),t("li",null,[t("p",null,"从库会创建一个用于回放 binlog 的线程，去读 relay log 中继日志，然后回放 binlog 更新存储引擎中的数据，最终实现主从的数据一致性。")])],-1),S=t("p",null,"在完成主从复制之后，你就可以在写数据时只写主库，在读数据时只读从库，这样即使写请求会锁表或者锁记录，也不会影响读请求的执行。",-1),d=a("",15),M=t("p",null,"主从延迟影响评论读取的实时性",-1),q=t("p",null,"这是主从复制延迟导致的查询异常，解决思路有很多，我提供给你几个方案。",-1),y=t("ul",null,[t("li",null,[t("strong",null,"使用数据冗余")])],-1),L=t("p",null,"可以在异步调用审核模块时，不仅仅发送商品 ID，而是发送审核模块需要的所有评论信息，借此避免在从库中重新查询数据（这个方案简单易实现，推荐你选择）。但你要注意每次调用的参数大小，过大的消息会占用网络带宽和通信时间。",-1),Q=t("ul",null,[t("li",null,[t("strong",null,"使用缓存解决")])],-1),A=t("p",null,"可以在写入数据主库的同时，把评论数据写到 Redis 缓存里，这样其他线程再获取评论信息时会优先查询缓存，也可以保证数据的一致性。",-1),b=t("p",null,"不过这种方式会带来缓存和数据库的一致性问题，比如两个线程同时更新数据，操作步骤如下：",-1),m=a("",12),T=t("p",null,"以 Raft 协议为例，其内部是通过日志复制同步的方式来实现共识的，例如在领导者选举成功后，它就会开始接收客户端的请求，此时每一个客户端请求都将被解析成一条指令日志，然后并行地向其他节点发起通知，要求其他节点复制这个日志条目，并最终在各个节点中回放日志，实现共识。",-1),f=t("p",null,"我们抽象一下它的运作机制：",-1),P=a("",11);function C(k,I,N,V,x,E){const o=s("Image");return i(),_("div",null,[r,l(o,{alt:"2021-02-04.png",src:"https://s0.lgstatic.com/i/image6/M00/01/1A/Cgp9HWAbM6GAK6ihAAFcImWuEfQ591.png"}),p(),u,l(o,{alt:"2021-02-04 (1).png",src:"https://s0.lgstatic.com/i/image6/M00/01/18/CioPOWAbM7eAJvyLAAGMifLwArU490.png"}),p(),c,g,h,S,l(o,{alt:"2021-02-04.png",src:"https://s0.lgstatic.com/i/image6/M00/01/18/CioPOWAbNAKAHZb5AAFcImWuEfQ888.png"}),p(),d,l(o,{alt:"2021-02-04 (2).png",src:"https://s0.lgstatic.com/i/image6/M00/01/1A/Cgp9HWAbNB2ACf3mAAGLpR_O2fo928.png"}),p(),M,q,y,L,Q,A,b,l(o,{alt:"2021-02-04 (5).png",src:"https://s0.lgstatic.com/i/image6/M00/01/18/CioPOWAbNfuAcuHnAAHZwTbXvGA787.png"}),p(),m,l(o,{alt:"2021-02-04 (3).png",src:"https://s0.lgstatic.com/i/image6/M00/01/1A/Cgp9HWAbNDmAXznSAAFTEZJZjkc471.png"}),p(),T,f,l(o,{alt:"2021-02-04 (4).png",src:"https://s0.lgstatic.com/i/image6/M00/01/18/CioPOWAbNE2ARV0qAAFShWNapDk767.png"}),p(),P])}const W=n(e,[["render",C]]);export{D as __pageData,W as default};
