import{_ as e,j as i,o as _,g as l,k as o,h as p,Q as s,s as t}from"./chunks/framework.4e7d56ce.js";const Q=JSON.parse('{"title":"05一致性与CAP模型：为什么需要分布式一致性？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/24讲吃透分布式数据库_文档/(6301) 05  一致性与 CAP 模型：为什么需要分布式一致性？.md","filePath":"posts/backEnd/24讲吃透分布式数据库_文档/(6301) 05  一致性与 CAP 模型：为什么需要分布式一致性？.md","lastUpdated":1696417798000}'),n={name:"posts/backEnd/24讲吃透分布式数据库_文档/(6301) 05  一致性与 CAP 模型：为什么需要分布式一致性？.md"},r=s("",23),c=t("p",null,"图 1 CAP 理论",-1),A=t("p",null,"CAP 中的可用性也不同于上述的高可用性，CAP 定义对请求的延迟没有任何限制。此外，与 CAP 相反，数据库的高可用性并不需要每个在线节点都可以提供服务。",-1),h=t("p",null,"CAP 里面的 C 代表线性一致，除了它以外，还有其他的一致模式，我们现在来具体介绍一下。",-1),P=t("h3",{id:"一致性模型",tabindex:"-1"},[p("一致性模型 "),t("a",{class:"header-anchor",href:"#一致性模型","aria-label":'Permalink to "一致性模型"'},"​")],-1),d=t("p",null,"一致性模型是分布式系统的经典内容，也是入门分布式数据库的重要知识点。但很少有人知道，其实一致性模型来源于单机理论中的共享内存。",-1),u=t("p",null,'从用户的角度看，分布式数据库就像具有共享存储的单机数据库一样，节点间的通信和消息传递被隐藏到了数据库内部，这会使用户产生"分布式数据库是一种共享内存"的错觉。一个支持读取和写入操作的单个存储单元通常称为寄存器，我们可以把代表分布式数据库的共享存储看作是一组这样的寄存器。',-1),g=t("p",null,'每个读写寄存器的操作被抽象为"调用"和"完成"两个动作。如果"调用"发生后，但在"完成"之前该操作崩溃了，我们将操作定义为失败。如果一个操作的调用和完成事件都在另一个操作被调用之前发生，我们说这个操作在另一个操作之前，并且这两个操作是顺序的；否则，我们说它们是并发的。',-1),C=t("p",null,"如下图所示，a）是顺序操作，b）和 c）是并发操作。",-1),q=s("",22),m=t("p",null,"图 3 线性一致性",-1),T=t("p",null,"线性一致性的代价是很高昂的，甚至 CPU 都不会使用线性一致性。有并发编程经验的朋友一定知道 CAS 操作，该操作可以实现操作的线性化，是高性能并发编程的关键，它就是通过编程手段来模拟线性一致。",-1),b=t("p",null,"一个比较常见的误区是，使用一致性算法可以实现线性一致，如 Paxos 和 Raft 等。但实际是不行的，以 Raft 为例，算法只是保证了复制 Log 的线性一致，而没有描述 Log 是如何写入最终的状态机的，这就暗含状态机本身不是线性一致的。",-1),S=t("p",null,"这里推荐你阅读 TiKV 关于线性一致的实现细节，由于线性一致性价比不高，这里就不进行赘述了，我们接下来说说顺序一致性和因果一致性。",-1),x=t("h4",{id:"顺序一致性",tabindex:"-1"},[p("顺序一致性 "),t("a",{class:"header-anchor",href:"#顺序一致性","aria-label":'Permalink to "顺序一致性"'},"​")],-1),f=t("p",null,"由于线性一致的代价高昂，因此人们想到，既然全局时钟导致严格一致性很难实现，那么顺序一致性就是放弃了全局时钟的约束，改为分布式逻辑时钟实现。顺序一致性是指所有的进程以相同的顺序看到所有的修改。读操作未必能及时得到此前其他进程对同一数据的写更新，但是每个进程读到的该数据的不同值的顺序是一致的。",-1),D=t("p",null,"下图展示了 P~1~、P~2~ 写入两个值后，P~3~ 和 P~4~ 是如何读取的。以真实的时间衡量，1 应该是在 2 之前被写入，但是在顺序一致性下，1 是可以被排在 2 之后的。同时，尽管 P~3~ 已经读取值 1，P~4~ 仍然可以读取 2。但是需要注意的是这两种组合：1->2 和 2 ->1，P~3~ 和 P~4~ 从它们中选择一个，并保持一致。下图正是展示了它们读取顺序的一种可能：2->1。",-1),k=t("p",null,"图 4 顺序一致性",-1),E=t("p",null,"我们使用下图来进一步区分线性一致和顺序一致。",-1),I=s("",11),M=t("p",null,"图 6 因果一致性",-1),V=t("p",null,"而下图显示进程 P~1~ 和 P~2~ 进行因果相关的写操作并按其逻辑顺序传播到 P~3~ 和 P~4~。因果写入除了写入数据外，还需要附加一个逻辑时钟，用这个时钟保证两个写入是有因果关系的。这可以防止我们遇到上面那张图所示的情况。你可以在两个图中比较一下 P~3~ 和 P~4~ 的历史记录。",-1),B=s("",12),N=s("",11);function R(W,y,F,w,J,L){const a=i("Image");return _(),l("div",null,[r,o(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image2/M01/07/D4/Cip5yGAJWLmAJW7kAABPImLZRig108.png"}),p(),c,A,h,P,d,u,g,C,o(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/8F/E3/Ciqc1GAJWMaAahgyAAA9-0_mXvY966.png"}),p(),q,o(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/8F/E3/Ciqc1GAJWNaABNY5AACytLnfuEE642.png"}),p(),m,T,b,S,x,f,D,o(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/8F/EF/CgqCHmAJWOCABAs2AABs-o-Dn-I630.png"}),p(),k,E,o(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/8F/E4/Ciqc1GAJWOaAT1zmAAB5GZRY2aI676.png"}),p(),I,o(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/8F/E4/Ciqc1GAJWPCATmnsAACWjAazgFM942.png"}),p(),M,V,o(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/8F/EF/CgqCHmAJWPiAexxkAACijWQR6zY931.png"}),p(),B,o(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/8F/EF/CgqCHmAJWQGAARkoAAB7ZMQP49s438.png"}),p(),N])}const z=e(n,[["render",R]]);export{Q as __pageData,z as default};
