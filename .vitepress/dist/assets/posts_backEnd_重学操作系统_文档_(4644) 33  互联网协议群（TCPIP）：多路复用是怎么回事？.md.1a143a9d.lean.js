import{_ as s,j as n,o as _,g as i,k as e,Q as r,s as t,h as a}from"./chunks/framework.e0c66c3f.js";const E=JSON.parse('{"title":"协议的分层 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/重学操作系统_文档/(4644) 33  互联网协议群（TCPIP）：多路复用是怎么回事？.md","filePath":"posts/backEnd/重学操作系统_文档/(4644) 33  互联网协议群（TCPIP）：多路复用是怎么回事？.md","lastUpdated":1696338709000}'),l={name:"posts/backEnd/重学操作系统_文档/(4644) 33  互联网协议群（TCPIP）：多路复用是怎么回事？.md"},p=r("",8),c=t("h4",{id:"传输层",tabindex:"-1"},[a("传输层 "),t("a",{class:"header-anchor",href:"#传输层","aria-label":'Permalink to "传输层"'},"​")],-1),g=t("p",null,[a("为应用层提供网络支持的，就是传输层（"),t("strong",null,"Transport Layer"),a("）。")],-1),h=t("p",null,"传输层控制协议（Transmission Control Protocol）是目前世界上应用最广泛的传输层协议。传输层为应用提供通信能力。比如浏览器想访问服务器，浏览器程序就会调用传输层程序；Web 服务接收浏览器的请求，Web 服务程序就会调用传输层程序接收数据。",-1),d=t("p",null,"考虑到应用需要传输的数据可能会非常大，直接传输不好控制。传输层需要将数据切块，即使一个分块传丢了、损坏了，可以重新发一个分块，而不用重新发送整体。在 TCP 协议中，我们把每个分块称为一个 TCP 段（TCP Segment）。",-1),P=r("",4),T=r("",11),m=t("h3",{id:"多路复用",tabindex:"-1"},[a("多路复用 "),t("a",{class:"header-anchor",href:"#多路复用","aria-label":'Permalink to "多路复用"'},"​")],-1),u=t("p",null,"在上述的分层模型当中，一台机器上的应用可以有很多。但是实际的出口设备，比如说网卡、网线通常只有一份。因此这里需要用到一个叫作多路复用（Multiplex）的技术。多路复用，就是多个信号，复用一个信道。",-1),C=t("h4",{id:"传输层多路复用",tabindex:"-1"},[a("传输层多路复用 "),t("a",{class:"header-anchor",href:"#传输层多路复用","aria-label":'Permalink to "传输层多路复用"'},"​")],-1),I=t("p",null,[a("对应用而言，应用层抽象应用之间通信的模型------比如说请求返回模型。一个应用可能会同时向服务器发送多个请求。因为建立一个连接也是需要开销的，所以可以多个请求复用一个 TCP 连接。复用连接一方面可以节省流量，另一方面能够降低延迟。如果应用"),t("strong",null,"串行地"),a("向服务端发送请求，那么假设第一个请求体积较大，或者第一个请求发生了故障，就会阻塞后面的请求。")],-1),A=t("p",null,"而使用多路复用技术，如下图所示，多个请求相当于并行的发送请求。即使其中某个请求发生故障，也不会阻塞其他请求。从这个角度看，多路复用实际上是一种 Non-Blocking（非阻塞）的技术。我们再来看下面这张图，不同的请求被传输层切片，我用不同的颜色区分出来，如果其中一个数据段（TCP Segment）发生异常，只影响其中一个颜色的请求，其他请求仍然可以到达服务。",-1),b=r("",14);function k(q,f,L,S,x,V){const o=n("Image");return _(),i("div",null,[p,e(o,{alt:"Lark20210108-173922.png",src:"https://s0.lgstatic.com/i/image2/M01/04/F5/CgpVE1_4KJCAcLUgAABciWzBY2I633.png"}),c,g,h,d,e(o,{alt:"Lark20210108-173925.png",src:"https://s0.lgstatic.com/i/image2/M01/04/F3/Cip5yF_4KJ2AAqCRAABRo3rT3hE804.png"}),P,e(o,{alt:"Lark20210108-173928.png",src:"https://s0.lgstatic.com/i/image2/M01/04/F5/CgpVE1_4KKaAeyVoAABvyFiqSu8542.png"}),T,e(o,{alt:"Lark20210108-173930.png",src:"https://s0.lgstatic.com/i/image2/M01/04/F3/Cip5yF_4KLaAI5ILAADP48Fx5U4933.png"}),m,u,C,I,A,e(o,{alt:"Lark20210108-173914.png",src:"https://s0.lgstatic.com/i/image2/M01/04/F5/CgpVE1_4KL-AayuCAABq3jjcwtE543.png"}),b])}const D=s(l,[["render",k]]);export{E as __pageData,D as default};
