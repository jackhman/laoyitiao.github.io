import{_ as o,j as e,o as t,g as r,k as a,h as n,s as p,Q as l}from"./chunks/framework.4e7d56ce.js";const I=JSON.parse('{"title":"项目结构 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Dubbo源码解读与实战_文档/(4264) 11  简易版 RPC 框架实现（上）.md","filePath":"posts/backEnd/Dubbo源码解读与实战_文档/(4264) 11  简易版 RPC 框架实现（上）.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/Dubbo源码解读与实战_文档/(4264) 11  简易版 RPC 框架实现（上）.md"},E=p("p",null,'这是"基础知识"部分的最后一课时，我们将会运用前面介绍的基础知识来做一个实践项目 ------ 编写一个简易版本的 RPC 框架，作为"基础知识"部分的总结和回顾。',-1),y=p("p",null,[n('RPC 是"远程过程调用（Remote Procedure Call）"的缩写形式，比较通俗的解释是：'),p("strong",null,"像本地方法调用一样调用远程的服务"),n("。虽然 RPC 的定义非常简单，但是相对完整的、通用的 RPC 框架涉及很多方面的内容，例如注册发现、服务治理、负载均衡、集群容错、RPC 协议等，如下图所示：")],-1),i=l("",6),F=l("",7),d=l("",16),A=p("p",null,"Netty 提供的 Decoder 和 Encoder 实现",-1),D=p("p",null,"在 Netty 的源码中，我们可以看到对很多已有协议的序列化和反序列化都是基于上述抽象类实现的，例如，HttpServerCodec 中通过依赖 HttpServerRequestDecoder 和 HttpServerResponseEncoder 来实现 HTTP 请求的解码和 HTTP 响应的编码。如下图所示，HttpServerRequestDecoder 继承自 ByteToMessageDecoder，实现了 ByteBuf 到 HTTP 请求之间的转换；HttpServerResponseEncoder 继承自 MessageToMessageEncoder，实现 HTTP 响应到其他消息的转换（其中包括转换成 ByteBuf 的能力）。",-1),u=l("",10);function g(C,B,b,h,m,v){const s=e("Image");return t(),r("div",null,[E,y,a(s,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/48/E4/Ciqc1F9N7ryADlJBAAIlSORjRt8863.png"}),n(),i,a(s,{alt:"image (4).png",src:"https://s0.lgstatic.com/i/image/M00/48/E4/Ciqc1F9N7suABhc9AAEN07V6uf8238.png"}),F,a(s,{alt:"image (5).png",src:"https://s0.lgstatic.com/i/image/M00/48/E4/Ciqc1F9N7tiAMnZdAAC77BEcyZk305.png"}),d,a(s,{alt:"image (6).png",src:"https://s0.lgstatic.com/i/image/M00/48/F3/CgqCHl9N89uAPRjFAAE8pTlyXls424.png"}),n(),A,D,a(s,{alt:"HttpServerCodec结构图.png",src:"https://s0.lgstatic.com/i/image/M00/48/FD/CgqCHl9OAneAfCv0AADjLyEPSpc098.png"}),n(),u])}const _=o(c,[["render",g]]);export{I as __pageData,_ as default};
