import{_ as a,j as n,o as s,g as e,k as o,s as t,Q as l}from"./chunks/framework.e0c66c3f.js";const f=JSON.parse('{"title":"百分比采样策略 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/应用性能分析实战_文档/(7065) 16  采样设计：资源有限，如何实现数据的低损耗、高收集？.md","filePath":"posts/backEnd/应用性能分析实战_文档/(7065) 16  采样设计：资源有限，如何实现数据的低损耗、高收集？.md","lastUpdated":null}'),r={name:"posts/backEnd/应用性能分析实战_文档/(7065) 16  采样设计：资源有限，如何实现数据的低损耗、高收集？.md"},i=t("p",null,"我们都知道，APM 数据是海量的，项目初期很难申请到足够的资源，让监控服务去承接这些海量的监控数据，所以就需要对海量数据进行采样了。",-1),_=t("p",null,"但开启采样后，免不了会带来数据丢失。如果排查故障问题时，发现丢弃的监控数据过多，就会让 APM 建设的口碑越来越差，使用的人越来越少，这样资源就更申请不到了，从而最后导致了 APM 的形同虚设。",-1),g=t("p",null,"那如何平衡采样、数据、资源的关系呢？这时候就需要我们来设计采样策略。今天我会分享以下四种采样策略，通过对课程的学习，让你在建设 APM 的数据时，可以尽最大可能地收集到用户想要的数据。",-1),u=l("",45),c=t("p",null,"试想如果请求量很大，服务 AB 都开启了采样，这时如果服务 B 在执行过程中出现异常，使用异常收集的链路特征采样策略，确保了服务 B 执行过程中，出现异常可以收集异常的 APM 监控数据；可是服务无法通知下游服务 A 收集相关的数据。",-1),d=t("p",null,"这也是刚讲的前三个采样模型的共同难点，就是上游服务发生异常，无法告知下游服务进行采集相关联的监控数据。",-1),h=t("p",null,"为了解决这个问题，需要是扩展跨语言交互协议和引入 APM 配置中心来解决这个问题。",-1),A=l("",6);function P(m,q,M,T,k,S){const p=n("Image");return s(),e("div",null,[i,_,g,o(p,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M00/40/77/CioPOWCk4VqAXw9tAABoA92m-1M235.png"}),u,o(p,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/40/6F/Cgp9HWCk4W6AKsugAAEMl9ObTQQ055.png"}),c,d,h,o(p,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M00/40/77/CioPOWCk4XSAHCKJAAFGpT6EXic022.png"}),A])}const C=a(r,[["render",P]]);export{f as __pageData,C as default};
