import{_ as l,j as p,o as e,g as o,k as t,h as n,s,Q as c}from"./chunks/framework.e0c66c3f.js";const N=JSON.parse('{"title":"模式原理分析 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/趣学设计模式_文档/趣学设计模式_文档/(6904) 39  责任链模式：如何解决审核、过滤场景问题？.md","filePath":"posts/backEnd/趣学设计模式_文档/趣学设计模式_文档/(6904) 39  责任链模式：如何解决审核、过滤场景问题？.md","lastUpdated":1696338709000}'),r={name:"posts/backEnd/趣学设计模式_文档/趣学设计模式_文档/(6904) 39  责任链模式：如何解决审核、过滤场景问题？.md"},i=s("p",null,"相较而言，责任链模式是一个使用频率很高的模式，它是我们所讲的最后一个行为型设计模式了，并且这也是整个课程的最后一讲。今天，我除了会带你搞清楚责任链模式的原理和实现外，还会对行为型设计模式做一次整体的总结。",-1),E=s("p",null,"话不多说，让我们开始今天的学习吧。",-1),u=s("h3",{id:"模式原理分析",tabindex:"-1"},[n("模式原理分析 "),s("a",{class:"header-anchor",href:"#模式原理分析","aria-label":'Permalink to "模式原理分析"'},"​")],-1),y=s("p",null,"责任链模式的原始定义是：通过为多个对象提供处理请求的机会，避免将请求的发送者与其接收者耦合。链接接收对象并沿着链传递请求，直到对象处理它。",-1),d=s("p",null,[n("这个定义读起来还是有点抽象难懂，实际上它只说了一个关键点："),s("strong",null,"通过构建一个处理流水线来对一次请求进行多次的处理"),n("。")],-1),h=s("p",null,"这里我们结合购物的例子来解释下：当你收到了购买的商品后，发现商品有质量问题，于是你打电话询问客服关于退货的流程，客服接到你的电话后，会先打开订单系统查询你提供的订单信息并确认是否正确，确认后再使用物流系统通知快递小哥上门取件，快递小哥取件后会返回商品让仓储系统进行确认，并通知商品系统......这样的一个过程就是责任链模式的真实应用。",-1),x=s("p",null,"那么，我们先来看看责任链模式的 UML 图：",-1),q=c("",40);function g(m,v,b,_,H,C){const a=p("Image");return e(),o("div",null,[i,E,u,y,d,h,x,t(a,{alt:"设计模式 39 插图 01.jpg",src:"https://s0.lgstatic.com/i/image6/M01/4F/B4/Cgp9HWD6qceAZgzWAAFnVYgF1Ak441.jpg"}),n(),q])}const f=l(r,[["render",g]]);export{N as __pageData,f as default};
