import{_ as s,j as n,o as _,g as l,k as p,h as o,Q as e,s as t}from"./chunks/framework.4e7d56ce.js";const y=JSON.parse('{"title":"01导论：什么是分布式数据库？聊聊它的前世今生","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/24讲吃透分布式数据库_文档/(6297) 01  导论：什么是分布式数据库？聊聊它的前世今生.md","filePath":"posts/backEnd/24讲吃透分布式数据库_文档/(6297) 01  导论：什么是分布式数据库？聊聊它的前世今生.md","lastUpdated":1696417798000}'),i={name:"posts/backEnd/24讲吃透分布式数据库_文档/(6297) 01  导论：什么是分布式数据库？聊聊它的前世今生.md"},r=e("",14),c=e("",11),h=t("p",null,"Oracle RAC 是典型的大型商业解决方案，且为软硬件一体化解决方案。我在早年入职国内顶级电信行业解决方案公司的时候，就被其强大的性能所震撼，又为它高昂的价格所深深折服。它是那个时代数据库性能的标杆和极限，是完美方案与商业成就的体现。",-1),d=t("p",null,"我们试着用上面谈到的两个特性来简单分析一下 RAC：它确实是做到了数据分片与同步。每一层都是离散化的，特别在底层存储使用了 ASM 镜像存储技术，使其看起来像一块完整的大磁盘。",-1),u=t("p",null,"这样做的好处是实现了极致的使用体验，即使用单例数据库与 RAC 集群数据库，在使用上没有明显的区别。它的分布式存储层提供了完整的磁盘功能，使其对应用透明，从而达到扩展性与其他性能之间的平衡。甚至在应对特定规模的数据下，其经济性又有不错的表现。",-1),g=t("p",null,[t("strong",null,'这种分布式数据库设计被称为"共享存储架构"（share disk architecture）'),o('。它既是 RAC 强大的关键，又是其"阿喀琉斯之踵"，DBA 坊间流传的 8 节点的最大集群限制可以被认为是 RAC 的极限规模。')],-1),A=t("p",null,'该规模在当时的环境下是完全够用的，但是随着互联网的崛起，一场轰轰烈烈的"运动"将会打破 Oracle RAC 的不败金身。',-1),P=t("h3",{id:"大数据",tabindex:"-1"},[o("大数据 "),t("a",{class:"header-anchor",href:"#大数据","aria-label":'Permalink to "大数据"'},"​")],-1),T=t("p",null,'我们知道 Oracle、DB2 等商业数据库均为 OLTP 与 OLAP 融合数据库。而首先在分布式道路上寻求突破的是 OLAP 领域。在 2000 年伊始，以 Hadoop 为代表的大数据库技术凭借其"无共享"（share nothing）的技术体系，开始向以 Oracle 为代表的关系型数据库发起冲击。',-1),q=t("p",null,[o("这是一次水平扩展与垂直扩展，通用经济设备与专用昂贵服务，开源与商业这几组概念的首次大规模碰撞。"),t("strong",null,"拉开了真正意义上分布式数据库的帷幕"),o("。")],-1),m=t("p",null,[o("当然从一般的观点出发，Hadoop 一类的大数据处理平台不应称为数据库。但是从前面我们归纳的两点特性看，它们又确实非常满足。因此我们可以将它们归纳为早期面向商业分析场景的分布式数据库。"),t("strong",null,"从此 OLAP 型数据库开始了自己独立演化的道路"),o("。")],-1),L=t("p",null,"除了 Hadoop，另一种被称为 MPP（大规模并行处理）类型的数据库在此段时间也经历了高速的发展。MPP 数据库的架构图如下：",-1),O=t("p",null,"我们可以看到这种数据库与大数据常用的 Hadoop 在架构层面上非常类似，但理念不同。简而言之，它是对 SMP（对称多处理器结构）、NUMA（非一致性存储访问结构）这类硬件体系的创新，采用 shared-nothing 架构，通过网络将多个 SMP 节点互联，使它们协同工作。",-1),S=t("p",null,"MPP 数据库的特点是首先支持 PB 级的数据处理，同时支持比较丰富的 SQL 分析查询语句。同时，该领域是商业产品的战场，其中不仅仅包含独立厂商，如 Teradata，还包含一些巨头玩家，如 HP 的 Vertica、EMC 的 Greenplum 等。",-1),C=t("p",null,"大数据技术的发展使 OLAP 分析型数据库，从原来的关系型数据库之中独立出来，形成了完整的发展分支路径。而随着互联网浪潮的发展，OLTP 领域迎来了发展的机遇。",-1),E=t("h3",{id:"互联网化",tabindex:"-1"},[o("互联网化 "),t("a",{class:"header-anchor",href:"#互联网化","aria-label":'Permalink to "互联网化"'},"​")],-1),b=t("p",null,'国内数据库领域进入互联网时代第一个重大事件就是"去 IOE"。',-1),D=e("",16),N=t("p",null,"随着分布式数据库的发展，我们又迎来了新的一次融合：那就是 OLTP 与 OLAP 将再一次合并为 HTAP（融合交易分析处理）数据库。",-1),M=t("p",null,"该趋势的产生主要来源于云原生 OLTP 型分布式数据库的日趋成熟。同时由于整个行业的发展，客户与厂商对于实时分析型数据库的需求越来越旺盛，但传统上大数据技术包括开源与 MPP 类数据库，强调的是离线分析。",-1),V=t("p",null,"如果要进行秒级的数据处理，那么必须将交易数据与分析数据尽可能地贴近，并减少非实时 ELT 的引入，这就促使了 OLTP 与 OLAP 融合为 HTAP。下图就是阿里云 PolarDB 的 HTAP 架构。",-1),f=e("",7);function B(I,Q,k,H,x,R){const a=n("Image");return _(),l("div",null,[r,p(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image2/M01/05/E7/CgpVE2ABTo6AR5YmAAEPyUn_Xrc581.png"}),o(),c,p(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/8E/04/CgqCHmABT3OAWKNmAADhjXR2H_U089.png"}),o(),h,d,u,g,A,P,T,p(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image2/M01/05/E7/CgpVE2ABT4iAci6AAAE2nfoHLwM617.png"}),o(),q,m,L,p(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image2/M01/05/E7/CgpVE2ABT4-AdI5VAAE42YTeOoQ273.png"}),o(),O,S,C,E,b,p(a,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image2/M01/05/E6/Cip5yGABT5qAM34oAAE2hs8yVAU932.png"}),o(),D,p(a,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/8E/04/CgqCHmABT_aAByOoAAH2ctjuqy4281.png"}),o(),N,M,V,p(a,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image/M00/8D/F9/Ciqc1GABT_6AVFtwAAHdreedW2k751.png"}),o(),f])}const U=s(i,[["render",B]]);export{y as __pageData,U as default};
