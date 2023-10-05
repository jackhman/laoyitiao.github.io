import{_ as o,j as e,o as t,g as r,k as l,Q as p,s,h as n}from"./chunks/framework.4e7d56ce.js";const T=JSON.parse('{"title":"为什么用关注点分离原则拆分复杂问题 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/趣学设计模式_文档/(6880) 15  分离原则：如何将复杂问题拆分成小问题？.md","filePath":"posts/backEnd/趣学设计模式_文档/(6880) 15  分离原则：如何将复杂问题拆分成小问题？.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/趣学设计模式_文档/(6880) 15  分离原则：如何将复杂问题拆分成小问题？.md"},E=p("",17),y=s("p",null,[n("你会发现，在图中右侧的 MVC 架构中，我们将相关的主题聚合在某一层，这样便不再难以理解了。也就是，"),s("strong",null,"将层作为关注点来进行分离，通过解决每一个层的问题来实现整体问题的解决"),n("。")],-1),i=s("p",null,"同样，现在流行的微服务架构也是采用水平分离的策略来达到服务与服务之间关注点分离的目的，如下图所示：",-1),F=s("p",null,"虽说每个微服务的关注点可能完全不同，但通过统一的 API 层来进行通信就不会影响它们之间的相互配合。",-1),u=s("p",null,[n("总之，通过上面的两个例子你可以看到："),s("strong",null,"架构设计视角下的关注点分离更重视组件之间的分离，并通过一定的通信策略来保证架构内各个组件间的相互引用"),n("。")],-1),g=s("h4",{id:"_2-编码实现视角",tabindex:"-1"},[n("2. 编码实现视角 "),s("a",{class:"header-anchor",href:"#_2-编码实现视角","aria-label":'Permalink to "2. 编码实现视角"'},"​")],-1),C=s("p",null,[n("编码实现视角下的关注点分离主要侧重于"),s("strong",null,"某个具体类或方法间的边界划分"),n(" ，估计这里你立马会想到职责分离，没错，职责分离就是一种编码实现视角下关注点分离的优秀实践。比如，下面的代码实现（找出 3 个年龄大于 35 岁的员工的名字），就是基于"),s("strong",null,"操作职责相似性"),n("来进行关注点分离的，使用的是 Lambda 表达式。")],-1),A=s("p",null,"如图中所示，我们的关注点现在变成了数据流上的操作步骤（过滤、映射、限制等），我们读取每一个用户信息数据后，都会经过相同的步骤来处理，这样不仅利于理解每一个步骤操作的具体含义，也更符合我们的思考习惯。",-1),d=s("p",null,[n("再比如，算法中基于"),s("strong",null,"任务职责相似性"),n("来进行关注点的分离，如下图所示：")],-1),_=p("",20),D=p("",6),m=p("",6),f=p("",10);function h(B,S,q,P,b,w){const a=e("Image");return t(),r("div",null,[E,l(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M01/3C/05/Cgp9HWCH56SANVgiAAEzZmhjx0E872.png"}),y,i,l(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M00/3C/0D/CioPOWCH562ABQdRAAHQMBocRJI459.png"}),F,u,g,C,l(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M01/3C/05/Cgp9HWCH58GAIDPvAAEhrZ6lf94420.png"}),A,d,l(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M00/3C/05/Cgp9HWCH59iAP43TAAGn99Orz2c849.png"}),_,l(a,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image6/M00/3C/05/Cgp9HWCH6BqAHxDyAADK87MJ7bE373.png"}),D,l(a,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image6/M00/3C/05/Cgp9HWCH6DSAczyJAAEYnqWur2s906.png"}),m,l(a,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image6/M00/3C/05/Cgp9HWCH6EGAeuVjAAYTy4c_nUI528.png"}),f])}const v=o(c,[["render",h]]);export{T as __pageData,v as default};
