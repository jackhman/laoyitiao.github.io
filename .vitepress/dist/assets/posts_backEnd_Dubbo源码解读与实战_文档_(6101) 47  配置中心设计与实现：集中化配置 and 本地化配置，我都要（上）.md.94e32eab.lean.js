import{_ as l,j as e,o as t,h as r,k as a,f as s,Q as o,s as p}from"./chunks/framework.d3daa342.js";const k=JSON.parse('{"title":"47配置中心设计与实现：集中化配置and本地化配置，我都要（上）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Dubbo源码解读与实战_文档/(6101) 47  配置中心设计与实现：集中化配置 and 本地化配置，我都要（上）.md","filePath":"posts/backEnd/Dubbo源码解读与实战_文档/(6101) 47  配置中心设计与实现：集中化配置 and 本地化配置，我都要（上）.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/Dubbo源码解读与实战_文档/(6101) 47  配置中心设计与实现：集中化配置 and 本地化配置，我都要（上）.md"},E=o("",9),y=p("p",null,[s("Configuration 接口核心方法"),p("br"),s(" 从上图中我们可以看到，Configuration 针对不同的 boolean、int、String 返回值都有对应的 get*() 方法，同时还提供了带有默认值的 get*() 方法。"),p("strong",null,'这些 get<p style="text-align:center">*() 方法底层首先调用 getInternalProperty() 方法获取配置值'),s("，然后调用 convert() 方法将获取到的配置值转换成返回值的类型之后返回。getInternalProperty() 是一个抽象方法，由 Configuration 接口的子类具体实现。")],-1),i=p("p",null,"下图展示了 Dubbo 中提供的 Configuration 接口实现，包括：SystemConfiguration、EnvironmentConfiguration、InmemoryConfiguration、PropertiesConfiguration、CompositeConfiguration、ConfigConfigurationAdapter 和 DynamicConfiguration。下面我们将结合具体代码逐个介绍其实现。",-1),g=o("",24),u=o("",16),d=p("p",null,"DynamicConfigurationFactory 继承关系图",-1),C=o("",13),F=o("",7);function D(f,A,h,v,m,P){const n=e("Image");return t(),r("div",null,[E,a(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image2/M01/04/94/Cip5yF_zz3yABBYdAACqAETTGm0778.png"}),s(),y,i,a(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image2/M01/04/94/Cip5yF_zz6eAMN_oAACEEj9pVjg547.png"}),s(),g,a(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/8C/BD/CgqCHl_zz8WAHdY3AAMJFKW_uQE360.png"}),s(),u,a(n,{alt:"11.png",src:"https://s0.lgstatic.com/i/image/M00/8C/CD/CgqCHl_0L-GAPVy9AAEqog2bl7U068.png"}),s(),d,a(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image2/M01/04/94/Cip5yF_zz9iAM1YYAAB_QXlLDcU550.png"}),s(),C,a(n,{alt:"222.png",src:"https://s0.lgstatic.com/i/image/M00/8C/CD/CgqCHl_0L9WAYbfVAAGH_E-l-UU432.png"}),s(),F])}const _=l(c,[["render",D]]);export{k as __pageData,_ as default};
