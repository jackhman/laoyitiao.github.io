import{_ as o,j as e,o as t,g as r,k as l,h as n,s,Q as p}from"./chunks/framework.4e7d56ce.js";const P=JSON.parse('{"title":"35负载均衡：公平公正物尽其用的负载均衡策略，这里都有（上）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Dubbo源码解读与实战_文档/(5363) 35  负载均衡：公平公正物尽其用的负载均衡策略，这里都有（上）.md","filePath":"posts/backEnd/Dubbo源码解读与实战_文档/(5363) 35  负载均衡：公平公正物尽其用的负载均衡策略，这里都有（上）.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/Dubbo源码解读与实战_文档/(5363) 35  负载均衡：公平公正物尽其用的负载均衡策略，这里都有（上）.md"},E=s("h1",{id:"_35负载均衡-公平公正物尽其用的负载均衡策略-这里都有-上",tabindex:"-1"},[n("35负载均衡：公平公正物尽其用的负载均衡策略，这里都有（上） "),s("a",{class:"header-anchor",href:"#_35负载均衡-公平公正物尽其用的负载均衡策略-这里都有-上","aria-label":'Permalink to "35负载均衡：公平公正物尽其用的负载均衡策略，这里都有（上）"'},"​")],-1),y=s("p",null,"在前面的课时中，我们已经详细介绍了 dubbo-cluster 模块中的 Directory 和 Router 两个核心接口以及核心实现，同时也介绍了这两个接口相关的周边知识。本课时我们继续按照下图的顺序介绍 LoadBalance 的相关内容。",-1),i=p("",8),F=p("",21),h=s("p",null,"一致性 Hash 节点均匀分布图",-1),d=s("p",null,"我们按顺时针的方向，依次将请求分发到对应的 Provider。这样，当某台 Provider 节点宕机或增加新的 Provider 节点时，只会影响这个 Provider 节点对应的请求。",-1),g=s("p",null,"在理想情况下，一致性 Hash 算法会将这三个 Provider 节点均匀地分布到 Hash 环上，请求也可以均匀地分发给这三个 Provider 节点。但在实际情况中，这三个 Provider 节点地址取模之后的值，可能差距不大，这样会导致大量的请求落到一个 Provider 节点上，如下图所示：",-1),A=s("p",null,"一致性 Hash 节点非均匀分布图",-1),v=s("p",null,[n("这就出现了数据倾斜的问题。"),s("strong",null,"所谓数据倾斜是指由于节点不够分散，导致大量请求落到了同一个节点上，而其他节点只会接收到少量请求的情况"),n("。")],-1),D=s("p",null,"为了解决一致性 Hash 算法中出现的数据倾斜问题，又演化出了 Hash 槽的概念。",-1),u=s("p",null,"Hash 槽解决数据倾斜的思路是：既然问题是由 Provider 节点在 Hash 环上分布不均匀造成的，那么可以虚拟出 n 组 P1、P2、P3 的 Provider 节点 ，让多组 Provider 节点相对均匀地分布在 Hash 环上。如下图所示，相同阴影的节点均为同一个 Provider 节点，比如 P1-1、P1-2......P1-99 表示的都是 P1 这个 Provider 节点。引入 Provider 虚拟节点之后，让 Provider 在圆环上分散开来，以避免数据倾斜问题。",-1),C=p("",15),k=p("",9);function m(I,B,_,H,T,b){const a=e("Image");return t(),r("div",null,[E,y,l(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/71/0A/Ciqc1F-81uuAdW51AAH-O1mrOoA018.png"}),n(),i,l(a,{alt:"Lark20201124-174750.png",src:"https://s0.lgstatic.com/i/image/M00/71/15/CgqCHl-81vaAYmqRAAFYpTlQI0s741.png"}),n(),F,l(a,{alt:"Lark20201124-174752.png",src:"https://s0.lgstatic.com/i/image/M00/71/15/CgqCHl-81wSAO1YfAAFfH6Qgse0640.png"}),n(),h,d,g,l(a,{alt:"Lark20201124-174755.png",src:"https://s0.lgstatic.com/i/image/M00/71/15/CgqCHl-81w2ATT5qAAFjvpkgTNM463.png"}),n(),A,v,D,u,l(a,{alt:"Lark20201124-174743.png",src:"https://s0.lgstatic.com/i/image/M00/71/15/CgqCHl-81xaAEUSbAAG0t7C-hcQ544.png"}),n(),C,l(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/71/0A/Ciqc1F-81ySAdj_7AAAxc2j-s5k730.png"}),n(),k])}const f=o(c,[["render",m]]);export{P as __pageData,f as default};
