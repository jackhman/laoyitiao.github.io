import{_ as p,j as t,o as e,g as r,k as n,Q as l,s,h as o}from"./chunks/framework.e0c66c3f.js";const f=JSON.parse('{"title":"Apache Flink ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/21讲吃透实时流计算_文档/(6436) 19  Apache Flink：最惊艳的开源流计算框架.md","filePath":"posts/backEnd/21讲吃透实时流计算_文档/(6436) 19  Apache Flink：最惊艳的开源流计算框架.md","lastUpdated":1696338709000}'),c={name:"posts/backEnd/21讲吃透实时流计算_文档/(6436) 19  Apache Flink：最惊艳的开源流计算框架.md"},i=l("",8),E=s("p",null,[o("可以看出，Flink 可以部署在诸如 Yarn、Mesos 和 K8S 等分布式资源管理器上。其整体架构与 Storm 和 Spark Streaming 等分布式流计算框架类似，但与这些流计算框架不同的是，"),s("strong",null,"Flink 明确地把状态管理（尤其是流信息状态管理）纳入到了其系统架构中"),o("。")],-1),y=s("p",null,"在 Flink 计算节点执行任务的过程中，可以将状态保存到本地。通过 checkpoint 机制，再配合诸如 HDFS、S3 和 NFS 这样的分布式文件系统，Flink 在不降低性能的同时，实现了状态的分布式管理。",-1),d=s("h3",{id:"流的描述",tabindex:"-1"},[o("流的描述 "),s("a",{class:"header-anchor",href:"#流的描述","aria-label":'Permalink to "流的描述"'},"​")],-1),F=s("p",null,"接下来，我们再来看看在 Flink 中如何描述一个流计算过程。下面的图 2 展示了 Flink 用于描述流计算过程的 DAG 组成。",-1),u=l("",49),k=l("",8);function g(m,h,S,_,C,A){const a=t("Image");return e(),r("div",null,[i,n(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M01/27/A9/CioPOWBdgJuAFv9cAAMbscARMZA482.png"}),E,y,d,F,n(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M01/27/A9/CioPOWBdgKiAVR1QAANcMDm_ZVg804.png"}),u,n(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M01/27/A9/CioPOWBdgRKAGRhrAAEdy_HlR50807.png"}),k,n(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M01/27/AC/Cgp9HWBdgSCAbnm5ABGgDbOk8_w551.png"})])}const q=p(c,[["render",g]]);export{f as __pageData,q as default};
