import{_ as o,j as e,o as t,g as c,k as p,s,h as n,Q as l}from"./chunks/framework.4e7d56ce.js";const I=JSON.parse('{"title":"数据建模：性能、用户和异常 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5100) 07  数据监控：善用数据驱动产品迭代.md","filePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5100) 07  数据监控：善用数据驱动产品迭代.md","lastUpdated":1696417798000}'),r={name:"posts/frontEnd/103-云原生微信小程序开发实战文档/(5100) 07  数据监控：善用数据驱动产品迭代.md"},E=s("p",null,"你好，我是俊鹏，今天我们一起学习如何打造小程序的数据监控体系。",-1),y=s("p",null,[n("前几年，我看了《人人都是产品经理》这本畅销书，我觉得它给了我们一个很有意义的启示："),s("strong",null,"技术之外，多思考产品"),n("。而数据对产品的意义很大，拿这节课来说，数据监控体系中，一个很重要的环节就是埋点。应用端侧的开发者，在工作中或多或少地都编写过埋点代码，这部分工作往往因为枯燥也没什么技术含量不被人欢迎，我刚开始工作时也有这种心理，觉得埋点不但累，还毫无意义。可当我深入了解数据带来的价值之后，改变了这种看法。")],-1),i=s("p",null,'《精益创业：新创企业的成长思维》里提到的一个循环反馈的创业思想：构建-衡量-学习。通过"构建"把想法变成具体的产品能力，通过"衡量"把产品抽象的市场反馈具象为可量化的数据，再通过"学习"理解这些数据中用户和市场对于产品的反馈情况，及时改善想法后进入下一次循环：',-1),g=s("p",null,[n("简单来讲，就是通过敏捷开发快速迭代最小可行性产品，再参照衡量结果快速验证和纠正产品细节。这种思想得到了普遍认可和实施，适合任何阶段的产品团队。那么在这个循环中，"),s("strong",null,"数据是连接市场与企业的桥梁，这就是它的意义，同时也是技术人关注数据的原因。"),n(" 因为数据决定了产品的迭代方向，也就决定了对于技术研发的业务需求，进而决定了我们面临什么样的挑战和创新。")],-1),d=l("",9),F=l("",4),u=s("h4",{id:"异常数据",tabindex:"-1"},[n("异常数据 "),s("a",{class:"header-anchor",href:"#异常数据","aria-label":'Permalink to "异常数据"'},"​")],-1),A=s("p",null,"异常数据有三种类型：",-1),h=s("ul",null,[s("li",null,[s("p",null,"端侧的代码异常，比如小程序 JavaScript 脚本的某段逻辑执行报错；")]),s("li",null,[s("p",null,"服务异常，不过这类异常情况不仅仅是小程序服务端的问题，也可能是用户设备所在网络环境造成的 HTTP 请求失败；")]),s("li",null,[s("p",null,"行为异常，最常见的一种就是爬虫脚本频繁地请求某个服务接口。")])],-1),_=s("p",null,"性能数据、用户数据和异常数据三者相对独立，而我们统计数据的目的并不是收集这些独立的数据，而是希望将它们综合在一起进行分析，这样才能从多维度、多方面获取数据隐藏的信息。也就是将所有数据通过一定的联系归属到在更上一层的领域内分析。",-1),C=s("p",null,[n("那么在小程序场景下，"),s("strong",null,"把这三种类型数据联系到一起的上层领域就是小程序的每个页面-Page"),n(" 。"),s("strong",null,"页面再上一层的领域就是小程序的运行环境"),n("（包括用户设备信息和小程序的版本信息）。由此我们可以总结出小程序的数据统计所使用的的数据模型，如下图所示：")],-1),D=l("",17),B=l("",23),v=s("h3",{id:"总结",tabindex:"-1"},[n("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),P=s("p",null,"数据监控体系是一套非常庞大的整体性方案，这节课我只讲述了一些具备通用性的理论和实践方案，在现实工作中这些是最基本、最通用的，你需要掌握。而到了业务层则需要更多定制化方案。这节课，我想强调这样几个重点：",-1),x=s("ul",null,[s("li",null,[s("p",null,"数据不仅仅对产品和运营有价值，对于研发同样意义非凡，你需要明确这一点，在以后的工作中将数据重视起来；")]),s("li",null,[s("p",null,"性能的评估通常作为自动化测试的一部分，而异常监控则是针对生产环境的。作为一名研发，你需要时刻关注这两种数据，并且有针对性地进行改善；")]),s("li",null,[s("p",null,"采集小程序的异常数据和用户数据可以通过劫持小程序 SDK 的 API ，这样能够减轻代码埋点的工作量，并且降低后续维护的成本。")])],-1),m=s("p",null,"今天的课后作业有一定难度，需要你去学习一些新知识，我们在异常数据和用户数据的采集方案中提到了使用 Proxy 和 Reflect 实现 API 代理，其实还有更优雅、可定制性更高的方式，就是使用 TypeScript 的装饰器 Decorator 。今天的课后作业就是：请你尝试使用 Decorator 实现 API 的代理。",-1);function b(q,k,f,T,j,w){const a=e("Image");return t(),c("div",null,[E,y,i,p(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/6E/76/CgqCHl-yXi6AC3k9AAAsuIZLm64532.png"}),g,p(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/6E/6B/Ciqc1F-yXjWASNbhAAC6xwxCtZY694.png"}),d,p(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/6E/6B/Ciqc1F-yXkuAYKf3AABDxFwzBew969.png"}),F,p(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/6E/6B/Ciqc1F-yXlmAHB2mAAB6mZnxXdA770.png"}),u,A,h,p(a,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/6E/76/CgqCHl-yXmGADzoqAACROK_6gno880.png"}),_,C,p(a,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image/M00/6E/76/CgqCHl-yXmiANBSsAACxJguRdCE590.png"}),D,p(a,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image/M00/6E/76/CgqCHl-yXpuAIblwAAAx-bbxphY711.png"}),B,p(a,{alt:"Drawing 14.png",src:"https://s0.lgstatic.com/i/image/M00/6E/76/CgqCHl-yXrCAfoTnAACK-u5AIH0425.png"}),v,P,x,m])}const S=o(r,[["render",b]]);export{I as __pageData,S as default};
