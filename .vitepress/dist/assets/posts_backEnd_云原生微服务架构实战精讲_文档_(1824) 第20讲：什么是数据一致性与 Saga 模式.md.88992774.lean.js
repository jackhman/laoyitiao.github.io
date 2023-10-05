import{_ as o,j as n,o as e,g as r,k as s,Q as g,s as a,h as p}from"./chunks/framework.4e7d56ce.js";const B=JSON.parse('{"title":"数据一致性 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/云原生微服务架构实战精讲_文档/(1824) 第20讲：什么是数据一致性与 Saga 模式.md","filePath":"posts/backEnd/云原生微服务架构实战精讲_文档/(1824) 第20讲：什么是数据一致性与 Saga 模式.md","lastUpdated":1696417798000}'),i={name:"posts/backEnd/云原生微服务架构实战精讲_文档/(1824) 第20讲：什么是数据一致性与 Saga 模式.md"},l=g("",32),c=a("p",null,"下图是编制型 Saga 的示意图。服务之间传递的是命令和命令的响应，图中以双向箭头来表示。订单服务中有专门的 Saga 实体来维护业务事务的状态，这个 Saga 实体也负责根据之前命令的响应结果，来确定下一步需要调用的命令。",-1),_=a("h3",{id:"总结",tabindex:"-1"},[p("总结 "),a("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),d=a("p",null,"微服务架构中的数据一致性是一个相对复杂的问题，不同微服务中独立的数据存储，使得维护数据的一致性变得困难。本课时对数据一致性的问题做了介绍，包括数据库事务的 ACID 特性，以及最终一致性的 BASE 特性；最后介绍了用来保证数据一致性的 Saga 模式。通过本课时的学习，你将对数据一致性问题有更清楚的认识，了解到 ACID 和 BASE 这两种一致性特性，并对 Saga 模式有最基本的认识。",-1);function h(A,S,C,m,u,b){const t=n("Image");return e(),r("div",null,[l,s(t,{alt:"x2.png",src:"https://s0.lgstatic.com/i/image/M00/0F/84/CgqCHl7HjlCARxkQAACZydbpKFM106.png"}),c,s(t,{alt:"222.png",src:"https://s0.lgstatic.com/i/image/M00/0F/A2/CgqCHl7Hr_eAFyxUAAB4JwfkACs191.png"}),_,d])}const k=o(i,[["render",h]]);export{B as __pageData,k as default};
