import{_ as e,j as o,o as t,h as r,k as l,f as s,s as a,Q as p}from"./chunks/framework.d3daa342.js";const _=JSON.parse('{"title":"15解析引擎：SQL解析流程应该包括哪些核心阶段？（上）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/ShardingSphere 核心原理精讲_文档/(3574) 15  解析引擎：SQL 解析流程应该包括哪些核心阶段？（上）.md","filePath":"posts/backEnd/ShardingSphere 核心原理精讲_文档/(3574) 15  解析引擎：SQL 解析流程应该包括哪些核心阶段？（上）.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/ShardingSphere 核心原理精讲_文档/(3574) 15  解析引擎：SQL 解析流程应该包括哪些核心阶段？（上）.md"},E=a("h1",{id:"_15解析引擎-sql解析流程应该包括哪些核心阶段-上",tabindex:"-1"},[s("15解析引擎：SQL解析流程应该包括哪些核心阶段？（上） "),a("a",{class:"header-anchor",href:"#_15解析引擎-sql解析流程应该包括哪些核心阶段-上","aria-label":'Permalink to "15解析引擎：SQL解析流程应该包括哪些核心阶段？（上）"'},"​")],-1),y=a("p",null,"你好，欢迎进入第 15 课时的学习，结束了对 ShardingSphere 中微内核架构等基础设施相关实现机制的介绍后，今天我们将正式进入到分片引擎的学习。",-1),i=a("p",null,[s("对于一款分库分表中间件而言，分片是其最核心的功能。下图展示了整个 ShardingSphere 分片引擎的组成结构，我们已经在"),a("a",{href:"https://kaiwu.lagou.com/course/courseInfo.htm?sid=&courseId=257&lagoufrom=noapp",target:"_blank",rel:"noreferrer"},"《12 | 从应用到原理：如何高效阅读 ShardingSphere 源码》"),s("这个课时中对分片引擎中所包含的各个组件进行了简单介绍。我们知道，对于分片引擎而言，第一个核心组件就是 SQL 解析引擎。")],-1),S=p("",7),g=a("p",null,"上图已经引出了 ShardingSphere 内核中的很多核心对象，但今天我们只关注位于整个链路的最底层对象，即图中的 SQLParseEngine。一方面，在 DataSource 的创建过程中，最终初始化了 SQLParseEngine；另一方面，负责执行路由功能的 ShardingRouter 也依赖于 SQLParseEngine。这个 SQLParseEngine 就是 ShardingSphere 中负责整个 SQL 解析过程的入口。",-1),F=a("h3",{id:"从-sql-解析引擎到-sql-解析内核",tabindex:"-1"},[s("从 SQL 解析引擎到 SQL 解析内核 "),a("a",{class:"header-anchor",href:"#从-sql-解析引擎到-sql-解析内核","aria-label":'Permalink to "从 SQL 解析引擎到 SQL 解析内核"'},"​")],-1),u=a("p",null,'在 ShardingSphere 中，存在一批以"Engine"结尾的引擎类。从架构思想上看，这些类在设计和实现上普遍采用了外观模式。外观（Facade）模式的意图可以描述为子系统中的一组接口提供一个一致的界面。外观模式定义了一个高层接口，这个接口使得这一子系统更加容易使用。该模式的示意图如下图所示：',-1),d=a("p",null,[s("从作用上讲，外观模式能够起到"),a("strong",null,"客户端与后端服务之间的隔离作用"),s(" ，随着业务需求的变化和时间的演进，外观背后各个子系统的划分和实现可能需要进行相应的调整和升级，这种调整和升级需要做到"),a("strong",null,"对客户端透明"),s("。在设计诸如 ShardingSphere 这样的中间件框架时，这种隔离性尤为重要。")],-1),h=a("p",null,"对于 SQL 解析引擎而言，情况同样类似。不同之处在于，SQLParseEngine 本身并不提供外观作用，而是把这部分功能委托给了另一个核心类 SQLParseKernel。从命名上看，这个类才是 SQL 解析的内核类，也是所谓的外观类。SQLParseKernel 屏蔽了后端服务中复杂的 SQL 抽象语法树对象 SQLAST、SQL 片段对象 SQLSegment ，以及最终的 SQL 语句 SQLStatement 对象的创建和管理过程。上述这些类之间的关系如下所示：",-1),A=p("",20),L=p("",9),C=p("",8);function Q(D,P,m,f,b,q){const n=o("Image");return t(),r("div",null,[E,y,i,l(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/3C/7B/Ciqc1F8nypyARZV3AACJf1UYtf4213.png"}),s(),S,l(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/3C/7B/Ciqc1F8nyriAPY8tAAB8wwhtMU4809.png"}),s(),g,F,u,l(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/3C/7B/Ciqc1F8nysKAKGdhAABINS6qFpI839.png"}),s(),d,h,l(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/3C/86/CgqCHl8nytiAcb6GAABVel2mPvE115.png"}),s(),A,l(n,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/3C/7C/Ciqc1F8nyz2AaMf0AACQcl1OWTw870.png"}),s(),L,l(n,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image/M00/3C/87/CgqCHl8ny3WAAR7gAABKWeCFeTg698.png"}),s(),C])}const B=e(c,[["render",Q]]);export{_ as __pageData,B as default};
