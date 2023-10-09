import{_ as n,j as r,o as l,h as _,k as s,f as t,s as a,Q as o}from"./chunks/framework.d3daa342.js";const X=JSON.parse('{"title":"第02讲：不同数据一致性模型有哪些应用？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/分布式技术原理与实战45讲_文档/(1900) 第02讲：不同数据一致性模型有哪些应用？.md","filePath":"posts/backEnd/分布式技术原理与实战45讲_文档/(1900) 第02讲：不同数据一致性模型有哪些应用？.md","lastUpdated":1696682708000}'),i={name:"posts/backEnd/分布式技术原理与实战45讲_文档/(1900) 第02讲：不同数据一致性模型有哪些应用？.md"},h=a("h1",{id:"第02讲-不同数据一致性模型有哪些应用",tabindex:"-1"},[t("第02讲：不同数据一致性模型有哪些应用？ "),a("a",{class:"header-anchor",href:"#第02讲-不同数据一致性模型有哪些应用","aria-label":'Permalink to "第02讲：不同数据一致性模型有哪些应用？"'},"​")],-1),c=a("p",null,'本课时我们主要讲解"不同数据一致性模型有哪些应用"？',-1),p=a("br",null,null,-1),d=a("p",null,"上一课时讲过，对于 CAP 来说，放弃强一致性（这里说的一致性是强一致性），追求分区容错性和可用性，这是很多分布式系统设计时的选择。在工程实践中，基于 CAP 定理逐步演化，就提出了 Base 理论。",-1),u=a("br",null,null,-1),b=a("p",null,"那么 Base 理论有哪些内容，Base 理论下的一致性模型又有哪些呢？",-1),g=a("h2",{id:"base-理论",tabindex:"-1"},[t("Base 理论 "),a("a",{class:"header-anchor",href:"#base-理论","aria-label":'Permalink to "Base 理论"'},"​")],-1),A=a("p",null,"Base 是三个短语的简写，即基本可用（Basically Available）、软状态（Soft State）和最终一致性（Eventually Consistent）。",-1),m=a("br",null,null,-1),q=o("",10),C=o("",17),P=a("br",null,null,-1),f=a("p",null,[t("一般情况下我们提到的时间都是指物理时间，但实际上很多应用中，只要所有机器有相同的时间就够了，这个时间不一定要跟实际时间相同。更进一步解释：如果两个节点之间不进行交互，那么它们的时间甚至都不需要同步。 因此问题的关键点在于"),a("strong",null,"节点间的交互要在事件的发生顺序上达成一致，而不是对于时间达成一致"),t("。")],-1),B=a("br",null,null,-1),k=a("p",null,"逻辑时钟的概念也被用来解决分布式一致性问题，这里我们不展开，感兴趣的可以找一些相关的资料来学习。",-1),T=a("h2",{id:"不同数据一致性模型",tabindex:"-1"},[t("不同数据一致性模型 "),a("a",{class:"header-anchor",href:"#不同数据一致性模型","aria-label":'Permalink to "不同数据一致性模型"'},"​")],-1),x=a("p",null,"一般来说，数据一致性模型可以分为强一致性和弱一致性，强一致性也叫做线性一致性，除此以外，所有其他的一致性都是弱一致性的特殊情况。弱一致性根据不同的业务场景，又可以分解为更细分的模型，不同一致性模型又有不同的应用场景。",-1),S=a("br",null,null,-1),I=a("p",null,'在互联网领域的绝大多数场景中，都需要牺牲强一致性来换取系统的高可用性，系统往往只需要保证"最终一致性"，只要这个最终时间是在用户可以接受的范围内即可。',-1),V=a("br",null,null,-1),D=o("",32),N=a("p",null,[t("]("),a("a",{href:"https://shenceyun.lagou.com/t/Mka",target:"_blank",rel:"noreferrer"},"https://shenceyun.lagou.com/t/Mka"),t(")")],-1),y=a("p",null,[a("strong",null,"《Java 工程师高薪训练营》")],-1),E=a("p",null,[t("实战训练+面试模拟+大厂内推，想要提升技术能力，进大厂拿高薪，"),a("a",{href:"https://shenceyun.lagou.com/t/Mka",target:"_blank",rel:"noreferrer"},"点击链接，提升自己"),t("！")],-1);function M(v,F,Q,R,$,L){const e=r("Image");return l(),_("div",null,[h,c,p,d,u,b,g,A,m,s(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/08/52/Ciqah16FrueAWLATAABOyQi2X3M251.png"}),t(),q,s(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/08/52/Ciqah16FrueAMh29AANTN6izVWY035.png"}),t(),C,s(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/81/68/Cgq2xl6FrueAdqXGAAARaVLIyqg649.png"}),t(),P,f,B,k,T,x,S,I,V,s(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/08/52/Ciqah16FruiAGz3eAAIrOBxKnpU229.png"}),t(),D,s(e,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/6D/3E/CgqCHl-s60-AC0B_AAhXSgFweBY762.png"}),t(),N,y,E])}const z=n(i,[["render",M]]);export{X as __pageData,z as default};
