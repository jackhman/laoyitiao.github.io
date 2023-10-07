import{_ as l,j as e,o as t,g as r,k as n,h as s,Q as p,s as o}from"./chunks/framework.4e7d56ce.js";const C=JSON.parse('{"title":"11etcd-raft模块如何实现分布式一致性？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/etcd 原理与实践_文档/(6405) 11  etcd-raft 模块如何实现分布式一致性？.md","filePath":"posts/backEnd/etcd 原理与实践_文档/(6405) 11  etcd-raft 模块如何实现分布式一致性？.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/etcd 原理与实践_文档/(6405) 11  etcd-raft 模块如何实现分布式一致性？.md"},E=p("",21),y=p("",16),i=p("",17),d=p("",4),u=p("",8),f=o("p",null,[s("除此之外，etcd 还有安全性限制，以保证日志选举和日志复制的正确性，比如 raft 算法中，并不是所有节点都能成为 Leader。一个节点要想成为 Leader，需要得到集群中半数以上节点的投票，而一个节点会投票给另一个节点，其中一个充分条件是："),o("strong",null,"进行选举的节点，其日志需要比本节点的日志更新"),s("。此外还有判断日志的新旧以及提交前面任期的日志条目等措施。")],-1),g=o("p",null,"学习完这一讲，我给大家留一个问题，哪些情况下会出现选举超时且没有任何一个节点成为 Leader？欢迎你在留言区和我分享你的观点。下一讲，我们将介绍 etcd 存储多版本控制 MVCC 如何实现。",-1);function h(m,F,q,b,A,_){const a=e("Image");return t(),r("div",null,[E,n(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M01/0F/10/Cgp9HWA9EIqAVw9QAABJGq2-dl4448.png"}),s(),y,n(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M01/0F/10/Cgp9HWA9EJ2ABd9rAAO37xDchBs024.png"}),s(),i,n(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M01/0F/0D/CioPOWA9ELSAZR1_AACDc7CHoj4319.png"}),s(),d,n(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M00/0F/0E/CioPOWA9ENOAQLFKAAB3Zn9Qj4Q619.png"}),s(),u,n(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M00/0F/0E/CioPOWA9ENyARGJxAAG3ZxiXwp0220.png"}),s(),f,g])}const v=l(c,[["render",h]]);export{C as __pageData,v as default};
