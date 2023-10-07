import{_ as p,j as t,o,g as c,k as l,h as n,Q as e,s}from"./chunks/framework.4e7d56ce.js";const M=JSON.parse('{"title":"第15讲：图的实现方式与核心算法","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/097-数据结构精讲：从原理到实战文档/(553) 第 15 讲：图的实现方式与核心算法.md","filePath":"posts/backEnd/097-数据结构精讲：从原理到实战文档/(553) 第 15 讲：图的实现方式与核心算法.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/097-数据结构精讲：从原理到实战文档/(553) 第 15 讲：图的实现方式与核心算法.md"},i=e("",10),E=s("br",null,null,-1),h=s("p",null,[s("strong",null,"邻接链表法"),n("的核心思想是把每一个节点所指向的点给存储起来。比如还是上面的例子，如果我们用邻接链表法表达的话，则需要一个含 5 个元素的数组，用来存储这样的 5 个节点，然后每个节点所指向的点都会维护在一个链表中。比如，V0 指向了 V1、V4、V2 三个节点，那在内存中就会有从 0 指向 1 接着指向 2、指向 4 这样的一个链表。同理我们看到 V4 指向了 V0 和 V2，在内存中就要维护一个 4→0→2 的单向链表。")],-1),d=s("br",null,null,-1),_=s("h3",{id:"图的拓扑排序",tabindex:"-1"},[s("strong",null,"图的拓扑排序"),n(),s("a",{class:"header-anchor",href:"#图的拓扑排序","aria-label":'Permalink to "**图的拓扑排序**"'},"​")],-1),u=s("p",null,[n("什么是拓扑排序呢？"),s("strong",null,"拓扑排序"),n("指的是对于一个有向无环图来说，排序所有的节点，使得对于从节点 u 到节点 v 的每个有向边 uv，u 在排序中都在 v 之前。拿我们之前讲过的西红柿炒鸡蛋这个例子来说吧。")],-1),g=s("br",null,null,-1),y=s("br",null,null,-1),m=s("p",null,"一个合法的拓扑排序，必须使得被依赖的任务首先完成。在我们西红柿炒鸡蛋这个菜的加工过程中，要保证打鸡蛋在炒鸡蛋之前，买番茄在洗番茄之前，因为炒鸡蛋依赖于打鸡蛋，在我们的图中有打鸡蛋指向炒鸡蛋的边。",-1),v=s("p",null,[n("所以说一个"),s("strong",null,"合理的拓扑排序是能够保证有依赖关系的任务能够被合理完成"),n(" 。不如你思考一下为什么拓扑排序只适用于有向无环图呢？")],-1),b=s("p",null,'我们来看一个经典的例子，那就是"鸡生蛋、蛋生鸡"。',-1),f=s("br",null,null,-1),A=s("p",null,"先有鸡还是先有蛋 （Chicken Egg Dilemma）就是一个无法被拓扑排序的有环图，因为鸡依赖于蛋，蛋又依赖于鸡，你无法把鸡排在蛋前面，也不能把蛋排在鸡的前面。",-1),V=s("br",null,null,-1),k=s("br",null,null,-1),S=s("p",null,'再来看一个经典的可以被拓扑排序的例子。我们常说："等我有钱要去干嘛干嘛。"这里面隐含的一个有向无环图就是钱指向了你想做的事情，那么我们就很容易的得出一个合理的拓扑排序，要把钱排在你想做的事情之前。',-1),C=s("h3",{id:"拓扑排序的实现方式",tabindex:"-1"},[s("strong",null,"拓扑排序的实现方式"),n(),s("a",{class:"header-anchor",href:"#拓扑排序的实现方式","aria-label":'Permalink to "**拓扑排序的实现方式**"'},"​")],-1),x=s("p",null,"首先我们来看看两个简单的概念，图的入度和出度。一个有向图的入度指的是终止于一个节点的边的数量；有向图的出度指的是始于一个节点的边的数量。以下图为例：",-1),P=s("br",null,null,-1),T=e("",15),D=e("",13);function q(I,B,N,Q,G,L){const a=t("Image");return o(),c("div",null,[i,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/BA/Cgq2xl5PhMCAeUfMAAGzC982uo4755.png"}),n(),E,h,d,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/BA/Cgq2xl5PhP6AOqjUAAJeI18cJBs969.png"}),n(),_,u,g,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/BA/Cgq2xl5PhRiASCvUAAEg6MYD32c725.png"}),n(),y,m,v,b,f,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/BA/Cgq2xl5PhTaATFu_AADm09R0Qrs108.png"}),n(),A,V,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/BA/Cgq2xl5PhVmABMV-AACqQHeznac129.png"}),n(),k,S,C,x,P,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/BA/Cgq2xl5PhXqAHIPnAAFlOiiY74g976.png"}),n(),T,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/BB/Cgq2xl5PhcKAUl9LAAF9nDbbVCQ658.png"}),n(),D])}const j=p(r,[["render",q]]);export{M as __pageData,j as default};
