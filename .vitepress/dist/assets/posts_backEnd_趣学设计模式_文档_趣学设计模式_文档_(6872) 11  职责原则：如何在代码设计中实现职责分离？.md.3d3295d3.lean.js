import{_ as o,j as t,o as e,g as r,k as a,Q as l,s,h as p}from"./chunks/framework.e0c66c3f.js";const k=JSON.parse('{"title":"高内聚、低耦合：职责分离的目标 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/趣学设计模式_文档/趣学设计模式_文档/(6872) 11  职责原则：如何在代码设计中实现职责分离？.md","filePath":"posts/backEnd/趣学设计模式_文档/趣学设计模式_文档/(6872) 11  职责原则：如何在代码设计中实现职责分离？.md","lastUpdated":1696338709000}'),c={name:"posts/backEnd/趣学设计模式_文档/趣学设计模式_文档/(6872) 11  职责原则：如何在代码设计中实现职责分离？.md"},E=l("",8),y=s("p",null,'在该图中，模块按照相对小的功能进行划分（数字表示，比如模块 1），这里我们假设业务领域已经被分析为有三个不同的功能，并放在了一个模块内（叫"我的模块"），其中，模块 A、B、C 之间没有什么共同的职责，分别在独立的数据上运行。',-1),i=s("p",null,"你有没有一种有种曾相似的感觉？没错，常见的 Controller+Service+Dao 里的各种功能多是这样的组织形式，看上去很漂亮的结构，但实际上却是最混乱的，俗称大泥球结构，这也是内聚度很低的一种模式。",-1),F=s("p",null,'观察上面的关系图你会发现，八个模块都依赖着"我的模块"。在这种情况下，如果想要在系统中的其他模块使用功能 A、B 或 C，那么调用就会依赖整个"我的模块"，这显然导致了太多的依赖，大大降低了可维护性。',-1),u=s("p",null,"那么，为了提高内聚性，我们就应该对功能进行分离，如下图所示：",-1),d=s("p",null,"很明显，现在每个模块的依赖比原来少了很多，模块 A、B、C 之间没有直接的关系，并且模块 3 是唯一一个依赖模块 A 和模块 C 的模块。这样带来的好处是，当我们依赖 A 或 B 或 C 时，能够清晰地知道它们依赖了哪些模块，也就是下次修改代码时影响的模块有哪些，将变更风险控制在有限范围内。这样才算是做到了真正的高内聚，也就是各个模块专注于自己最重要的某个职责，并建立起与其他模块之间清晰的界限。",-1),g=s("p",null,[p("所以说，"),s("strong",null,"内聚本质上表示的是系统内部的各个部分对同一个问题的专注程度，以及这些部分彼此之间联系的紧密性"),p("。")],-1),q=s("p",null,"你可能也注意到，对同一个问题的专注程度才是判断内聚高低的标准，而职责分离只是实现高内聚的一种方法而已。",-1),A=l("",30),C=s("h3",{id:"课后思考",tabindex:"-1"},[p("课后思考 "),s("a",{class:"header-anchor",href:"#课后思考","aria-label":'Permalink to "课后思考"'},"​")],-1),h=s("p",null,"学习了职责原则后，你觉得在日常的开发编码中，什么情况下最容易做职责分离？什么情况下最难做？",-1),_=s("p",null,"欢迎留言分享，我会第一时间给你回复。",-1),B=s("p",null,'在下一讲，我会接着与你分享"面向对象原则：面向对象编程框架到底长什么样？"的相关内容，记得按时来听课！',-1);function D(m,w,v,S,b,f){const n=t("Image");return e(),r("div",null,[E,a(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/37/9E/CioPOWB3-nyAQDkTAACdLcm5p6E692.png"}),y,i,F,u,a(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M00/37/9E/CioPOWB3-oSAanL9AAFTcHjT6eo491.png"}),d,g,q,a(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M00/37/9E/CioPOWB3-o-AdUj4AAXk1X0cnpc956.png"}),A,a(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M00/37/9D/Cgp9HWB4CH-ATPMCAAX84O2cK4I008.png"}),C,h,_,B])}const T=o(c,[["render",D]]);export{k as __pageData,T as default};
