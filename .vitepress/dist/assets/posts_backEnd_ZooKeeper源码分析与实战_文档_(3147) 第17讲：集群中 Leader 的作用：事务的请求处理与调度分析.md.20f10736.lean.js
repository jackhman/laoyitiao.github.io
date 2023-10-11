import{_ as p,D as l,o as t,g as r,J as n,h as e,Q as o,m as s}from"./chunks/framework.f67d7268.js";const P=JSON.parse('{"title":"第17讲：集群中Leader的作用：事务的请求处理与调度分析","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/ZooKeeper源码分析与实战_文档/(3147) 第17讲：集群中 Leader 的作用：事务的请求处理与调度分析.md","filePath":"posts/backEnd/ZooKeeper源码分析与实战_文档/(3147) 第17讲：集群中 Leader 的作用：事务的请求处理与调度分析.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/ZooKeeper源码分析与实战_文档/(3147) 第17讲：集群中 Leader 的作用：事务的请求处理与调度分析.md"},E=o("",11),y=s("h4",{id:"预处理阶段",tabindex:"-1"},[e("预处理阶段： "),s("a",{class:"header-anchor",href:"#预处理阶段","aria-label":'Permalink to "预处理阶段："'},"​")],-1),i=s("p",null,"在预处理阶段，主要工作是通过网络 I/O 接收来自客户端的会话请求。判断该条会话请求的类型是否是事务性的会话请求，之后将该请求提交给",-1),d=s("p",null,"PrepRequestProcessor 处理器进行处理。封装请求事务头并检查会话是否过期，最后反序列化事务请求信息创建 setDataRequest 请求，在 setDataRequest 记录中包含了要创建数据的节点的路径、数据节点的内容信息以及数据节点的版本信息。最后将该请求存放在 outstandingChanges 队列中等待之后的处理。",-1),u=s("h4",{id:"事务处理阶段",tabindex:"-1"},[e("事务处理阶段： "),s("a",{class:"header-anchor",href:"#事务处理阶段","aria-label":'Permalink to "事务处理阶段："'},"​")],-1),h=s("p",null,"在事务处理阶段，ZooKeeper 集群内部会将该条会话请求提交给 ProposalRequestProcessor 处理器进行处理。本阶段内部又分为提交、同步、统计三个步骤。其具体的处理过程我们在之前的课程中已经介绍过了，这里不再赘述。",-1),_=s("h4",{id:"事务执行阶段",tabindex:"-1"},[e("事务执行阶段： "),s("a",{class:"header-anchor",href:"#事务执行阶段","aria-label":'Permalink to "事务执行阶段："'},"​")],-1),q=s("p",null,"在经过预处理阶段和事务会话的投票发起等操作后，一个事务性的会话请求都已经准备好了，接下来就是在 ZooKeeper 的数据库中执行该条会话的数据变更操作。",-1),F=s("p",null,"在处理数据变更的过程中，ZooKeeper 内部会将该请求会话的事务头和事务体信息直接交给内存数据库 ZKDatabase 进行事务性的持久化操作。之后返回 ProcessTxnResult 对象表明操作结果是否成功。",-1),g=s("h4",{id:"响应客户端",tabindex:"-1"},[e("响应客户端： "),s("a",{class:"header-anchor",href:"#响应客户端","aria-label":'Permalink to "响应客户端："'},"​")],-1),D=s("p",null,"在 ZooKeeper 集群处理完客户端 setData 方法发送的数据节点创建请求后，会将处理结果发送给客户端。而在响应客户端的过程中，ZooKeeper 内部首先会创建一个 setDataResponse 响应体类型，该对象主要包括当前会话请求所创建的数据节点，以及其最新状态字段信息 stat。之后创建请求响应头信息，响应头作为客户端请求响应的重要信息，客户端在接收到 ZooKeeper 集群的响应后，通过解析响应头信息中的事务 ZXID 和请求结果标识符 err 来判断该条会话请求是否成功执行。",-1),R=o("",11);function C(A,Z,k,m,K,b){const a=l("Image");return t(),r("div",null,[E,n(a,{alt:"image.png",src:"https://s0.lgstatic.com/i/image/M00/2A/68/CgqCHl78TTKAVHIcAABFlvJZKxw198.png"}),e(),y,i,d,n(a,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/2A/68/CgqCHl78TUKAfJjuAAB5F0dP0Yk087.png"}),e(),u,h,n(a,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/2A/68/CgqCHl78TVGAK4VLAACDtg8BUbg363.png"}),e(),_,q,F,n(a,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/2A/68/CgqCHl78TWOAcPwoAABCnE5qDAc777.png"}),e(),g,D,n(a,{alt:"4.png",src:"https://s0.lgstatic.com/i/image/M00/2A/68/CgqCHl78TXCAM65nAAB2mZDf_jw385.png"}),e(),R])}const T=p(c,[["render",C]]);export{P as __pageData,T as default};
