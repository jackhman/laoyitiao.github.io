import{_ as n,j as i,o as s,h as l,k as e,f as o,Q as p,s as t}from"./chunks/framework.d3daa342.js";const k=JSON.parse('{"title":"第32讲：TCP为什么需要三次握手？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Java 源码剖析 34 讲_文档/(1792) 第32讲：TCP 为什么需要三次握手？.md","filePath":"posts/backEnd/Java 源码剖析 34 讲_文档/(1792) 第32讲：TCP 为什么需要三次握手？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/Java 源码剖析 34 讲_文档/(1792) 第32讲：TCP 为什么需要三次握手？.md"},P=p("",7),T=p("",10),C=p("",27),c=p("",7),_=t("p",null,"TCP 和 UDP 的使用场景",-1),h=t("h3",{id:"小结",tabindex:"-1"},[o("小结 "),t("a",{class:"header-anchor",href:"#小结","aria-label":'Permalink to "小结"'},"​")],-1),d=t("p",null,"本课时我们介绍了 TCP 三个特点：面向连接、可靠性和面向字节流，其中可靠性主要是依赖它的状态记录和根据实际情况调整自身的行为方式。例如，当 TCP 意识到丢包时就会重发此包，这样就保证了通信的可靠性。",-1),u=t("p",null,"TCP 之所以需要三次握手的主要原因是为了防止在网络环境比较差的情况下不会进行无效的连接，同时三次握手可以实现 TCP 初始化序列号的确认工作，TCP 需要初始化一个序列号来保证消息的顺序。如果是两次握手则不能确认序列号是否正常，如果是四次握手的话会浪费系统的资源，因此 TCP 三次握手是最优的解决方案，所以 TCP 连接需要三次握手。",-1),g=t("p",null,"最后我们讲了 UDP 的概念，以及 UDP 和 TCP 的区别，在传输效率要求比较高且对可靠性要求不高的情况下可以使用 UDP，反之则应该使用 TCP。",-1);function m(D,q,S,A,U,b){const a=i("Image");return s(),l("div",null,[P,e(a,{alt:"image (1).png",src:"https://s0.lgstatic.com/i/image/M00/26/68/CgqCHl7x4AWAIebKAABegWUqA1U920.png"}),o(),T,e(a,{alt:"22.png",src:"https://s0.lgstatic.com/i/image/M00/27/2D/CgqCHl70ccOALHS1AADhgTvLn9Q814.png"}),o(),C,e(a,{alt:"23.png",src:"https://s0.lgstatic.com/i/image/M00/27/2D/CgqCHl70cdGAPLl8AABHUQhxFtY478.png"}),o(),c,e(a,{alt:"image (4).png",src:"https://s0.lgstatic.com/i/image/M00/26/69/CgqCHl7x4EKAW86xAACoPgxtPLM601.png"}),o(),_,h,d,u,g])}const E=n(r,[["render",m]]);export{k as __pageData,E as default};
