import{_ as o,j as t,o as e,g as c,k as a,h as n,Q as l,s as p}from"./chunks/framework.4e7d56ce.js";const b=JSON.parse('{"title":"集群运行时重配置 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/etcd 原理与实践_文档/(6400) 06  集群配置：如何动态重配置 etcd 集群？.md","filePath":"posts/backEnd/etcd 原理与实践_文档/(6400) 06  集群配置：如何动态重配置 etcd 集群？.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/etcd 原理与实践_文档/(6400) 06  集群配置：如何动态重配置 etcd 集群？.md"},y=l("",9),E=l("",18),i=l("",6),d=l("",19),F=l("",24),u=p("p",null,[n("分布式系统中，运行时集群重配置是一个难点。"),p("strong",null,[n("运行时重配置会涉及集群的稳定性和可用性，因此需要慎之又慎，尽可能避免运行时集群重配置。"),p("strong",null,"如果你必须重配置 etcd 集群，你需要遵循"),n("两阶段配置变更的思想")]),n("，平稳可靠地进行重配置操作。")],-1),h=p("p",null,"关于动态重配置，你有什么经验和踩坑的经历，欢迎你在留言区和我分享。",-1);function A(C,m,f,g,D,q){const s=t("Image");return e(),c("div",null,[y,a(s,{alt:"2021210-1301.png",src:"https://s0.lgstatic.com/i/image6/M00/04/32/CioPOWAj2buAf6NbAAC7ppF3Jpo775.png"}),n(),E,a(s,{alt:"2021210-125947.png",src:"https://s0.lgstatic.com/i/image6/M01/04/32/CioPOWAj2daAQyjcAAh4QtGADWE453.png"}),n(),i,a(s,{alt:"2021210-125951.png",src:"https://s0.lgstatic.com/i/image6/M01/04/32/CioPOWAj2eGAVIJOAAc1D_EsRi0212.png"}),a(s,{alt:"2021210-125953.png",src:"https://s0.lgstatic.com/i/image6/M00/04/36/Cgp9HWAj2fOAKx88ABM2Yq8hOvg079.png"}),d,a(s,{alt:"2021210-125956.png",src:"https://s0.lgstatic.com/i/image6/M01/04/36/Cgp9HWAj2iCAOMvdAAxRChj8oRs342.png"}),F,a(s,{alt:"2021210-125958.png",src:"https://s0.lgstatic.com/i/image6/M00/04/36/Cgp9HWAj2lCAU-h7AAJU3K71dJc800.png"}),u,h])}const v=o(r,[["render",A]]);export{b as __pageData,v as default};
