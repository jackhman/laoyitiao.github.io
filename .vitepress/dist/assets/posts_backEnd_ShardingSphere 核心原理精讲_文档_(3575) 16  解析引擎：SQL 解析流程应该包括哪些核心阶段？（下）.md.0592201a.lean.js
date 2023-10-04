import{_ as e,j as o,o as t,g as r,k as n,h as a,s as p,Q as l}from"./chunks/framework.e0c66c3f.js";const f=JSON.parse('{"title":"SQL 解析引擎的三大阶段 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/ShardingSphere 核心原理精讲_文档/(3575) 16  解析引擎：SQL 解析流程应该包括哪些核心阶段？（下）.md","filePath":"posts/backEnd/ShardingSphere 核心原理精讲_文档/(3575) 16  解析引擎：SQL 解析流程应该包括哪些核心阶段？（下）.md","lastUpdated":1696338709000}'),c={name:"posts/backEnd/ShardingSphere 核心原理精讲_文档/(3575) 16  解析引擎：SQL 解析流程应该包括哪些核心阶段？（下）.md"},E=p("p",null,"我们知道整个 SQL 解析引擎可以分成三个阶段（如下图所示），上一课时我们主要介绍了 ShardingSphere 中 SQL 解析引擎的第一个阶段，那么今天我将承接上一课时，继续讲解 ShardingSphere 中 SQL 解析流程中剩余的两个阶段。",-1),y=l("",9),i=l("",11),S=l("",19),g=p("p",null,"回调机制示意图",-1),F=p("p",null,"TableFiller 中所依赖的 TableSegmentAvailable 和 TableSegmentsAvailable 接口就类似于上图中的 Callback 接口，具体的 SQLStatement 就是 Callback 的实现类，而 TableFiller 则是 Callback 的调用者。以 TableFiller 为例，我们注意到，如果对应的 SQLStatement 实现了这两个接口中的任意一个，那么就可以通过 TableFiller 注入对应的 TableSegment，从而完成 SQLSegment 的填充。",-1),m=p("p",null,"这里以 TableSegmentAvailable 接口为例，它有一组实现类，如下所示：",-1),d=l("",5),u=l("",25);function A(C,h,D,b,L,q){const s=o("Image");return t(),r("div",null,[E,n(s,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/3E/39/Ciqc1F8ry7-AWFaOAACKmUmdLPs289.png"}),y,n(s,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/3E/3A/Ciqc1F8ry9CAPtDdAACEYYKrCTU070.png"}),a(),i,n(s,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/3E/3A/Ciqc1F8ry_WAEwAzAACKQ3CnEFw961.png"}),a(),S,n(s,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/3E/3A/Ciqc1F8rzBeAL-gtAAAtxVTlOkM440.png"}),a(),g,F,m,n(s,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/3E/45/CgqCHl8rzC2ADPHvAAAxxRKUUYw921.png"}),a(),d,n(s,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/3E/45/CgqCHl8rzDqAVtDCAAB-8xyeFnI893.png"}),a(),u])}const x=e(c,[["render",A]]);export{f as __pageData,x as default};
