import{_ as o,j as p,o as l,g as e,k as r,h as a,s,Q as c}from"./chunks/framework.4e7d56ce.js";const B=JSON.parse('{"title":"第31讲：ZooKeeper中二阶段提交算法的实现分析","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/ZooKeeper源码分析与实战_文档/(3161) 第31讲：ZooKeeper 中二阶段提交算法的实现分析.md","filePath":"posts/backEnd/ZooKeeper源码分析与实战_文档/(3161) 第31讲：ZooKeeper 中二阶段提交算法的实现分析.md","lastUpdated":1696417798000}'),t={name:"posts/backEnd/ZooKeeper源码分析与实战_文档/(3161) 第31讲：ZooKeeper 中二阶段提交算法的实现分析.md"},E=s("h1",{id:"第31讲-zookeeper中二阶段提交算法的实现分析",tabindex:"-1"},[a("第31讲：ZooKeeper中二阶段提交算法的实现分析 "),s("a",{class:"header-anchor",href:"#第31讲-zookeeper中二阶段提交算法的实现分析","aria-label":'Permalink to "第31讲：ZooKeeper中二阶段提交算法的实现分析"'},"​")],-1),y=s("p",null,"前几节课中，我们一直围绕在分布式系统环境下，如何解决一致性问题来进行讨论，并分别介绍了在分布式环境中比较常见的二阶段提交、三阶段提交算法，之后又对比介绍了 ZooKeeper 所采用的 ZAB 协议算法和 Paxos 算法的优缺点。",-1),i=s("p",null,"在学习 ZAB 协议和 Paxos 算法的过程中，我们曾提到在处理来自客户端的事务性请求时，为了保证整个集群的数据一致性，其各自的底层实现与二阶段算法都有相似之处。但我们知道，二阶段提交算法自身有一些缺点，比如容易发生单点故障，比如在并发性能上有一些瓶颈，那么今天就深入 ZooKeeper 的底层，来看一下 ZooKeeper 是如何克服这些问题，并实现自己特有的二阶段提交算法的。希望通过本节课的学习，帮助你进一步提高解决分布式一致性问题的能力。",-1),d=s("h3",{id:"提交请求",tabindex:"-1"},[a("提交请求 "),s("a",{class:"header-anchor",href:"#提交请求","aria-label":'Permalink to "提交请求"'},"​")],-1),u=s("p",null,"前面我们学到，二阶段提交的本质是协调和处理 ZooKeeper 集群中的服务器，使它们在处理事务性会话请求的过程中能保证数据一致性。如果把执行在 ZooKeeper 集群中各个服务器上的事务会话处理操作分别看作不同的函数，那么整个一致性的处理逻辑就相当于包裹这些函数的事务。而在单机环境中处理事务的逻辑是，包含在事务中的所有函数要么全部成功执行，要么全部都不执行。",-1),F=c("",24);function P(h,k,q,A,_,g){const n=p("Image");return l(),e("div",null,[E,y,i,d,u,r(n,{alt:"image.png",src:"https://s0.lgstatic.com/i/image/M00/43/F4/Ciqc1F889pCADWF1AABRdrcwWog707.png"}),a(),F])}const m=o(t,[["render",P]]);export{B as __pageData,m as default};
