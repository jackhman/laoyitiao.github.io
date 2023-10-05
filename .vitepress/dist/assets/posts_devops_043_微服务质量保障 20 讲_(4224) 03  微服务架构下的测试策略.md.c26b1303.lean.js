import{_ as l,j as a,o as r,g as i,k as e,Q as n,s as t,h as o}from"./chunks/framework.4e7d56ce.js";const x=JSON.parse('{"title":"如何选择合适的测试策略模型？ ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/043_微服务质量保障 20 讲/(4224) 03  微服务架构下的测试策略.md","filePath":"posts/devops/043_微服务质量保障 20 讲/(4224) 03  微服务架构下的测试策略.md","lastUpdated":1696417798000}'),p={name:"posts/devops/043_微服务质量保障 20 讲/(4224) 03  微服务架构下的测试策略.md"},_=n("",6),c=t("p",null,"需要说明的是，传统意义下的测试金字塔，在微服务架构下不再完全奏效。因为微服务中最大的复杂性不在于服务本身，而在于微服务之间的交互方式，这一点值得特别注意。",-1),g=t("p",null,[o("因此，"),t("strong",null,"针对微服务架构，常见的测试策略模型"),o("有如下几种。")],-1),h=t("p",null,[o("（1） "),t("strong",null,'微服务"测试金字塔"')],-1),d=t("p",null,[o("基于微服务架构的特点和测试金字塔的原理，Toby Clemson 有一篇关于"),t("a",{href:"https://www.martinfowler.com/articles/microservice-testing/",target:"_blank",rel:"noreferrer"},'"微服务架构下的测试策略"'),o("的文章，其中通过分析阐述了微服务架构下的通用测试策略。")],-1),u=t("p",null,"如图，该策略模型依然是金字塔形状，从下到上依次为单元测试、集成测试、组件测试、端到端测试、探索式测试。",-1),m=t("p",null,[o("（2） "),t("strong",null,'微服务"测试蜂巢"')],-1),A=t("p",null,"这种策略模型是蜂巢形状，它强调重点关注服务间的集成测试，而单元测试和端到端测试的占比较少。",-1),q=t("p",null,[o("（3） "),t("strong",null,'微服务"测试钻石"')],-1),T=t("p",null,"这种策略模型是钻石形状的，组件测试和契约测试是重点，单元测试比率减少，另外增加了安全和性能等非功能的测试类型。",-1),C=t("p",null,[o("我想，有多少个基于微服务架构的测试团队大概就有多少个测试策略模型吧。"),t("strong",null,'"测试金字塔"是一种测试策略模型和抽象框架'),o("，当技术架构、系统特点、质量痛点、团队阶段不同时，每种测试的比例也不尽相同，而且最关键的，并不一定必须是金字塔结构。")],-1),f=t("p",null,"理解了测试策略模型的思考框架，我们看下应如何保障测试活动的全面性和有效性。",-1),w=t("h4",{id:"全面性",tabindex:"-1"},[o("全面性 "),t("a",{class:"header-anchor",href:"#全面性","aria-label":'Permalink to "全面性"'},"​")],-1),b=t("p",null,"微服务架构下，既需要保障各服务内部每个模块的完整性，又需要关注模块间、服务间的交互。只有这样才能提升测试覆盖率和全面性，因此，可以通过如下的分层测试来保证微服务的全面性。",-1),P=n("",8),S=n("",12);function V(k,v,D,M,y,I){const s=a("Image");return r(),i("div",null,[_,e(s,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/37/4A/CgqCHl8ZQp2AA2yKAADyJvMVUks187.png"}),c,g,h,d,e(s,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/37/3F/Ciqc1F8ZQrSACTc9AAB65lA45vc729.png"}),u,m,A,e(s,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/37/4A/CgqCHl8ZQsGAZti7AABGRbBNFY8164.png"}),q,T,e(s,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/37/4A/CgqCHl8ZQs-AByNAAACgJaZwyyU241.png"}),C,f,w,b,e(s,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/37/51/CgqCHl8ZSrqAVjqcAAVCHyjoRMg887.png"}),P,e(s,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/37/51/CgqCHl8ZSvOAK06pAAVCHyjoRMg396.png"}),S])}const Z=l(p,[["render",V]]);export{x as __pageData,Z as default};
