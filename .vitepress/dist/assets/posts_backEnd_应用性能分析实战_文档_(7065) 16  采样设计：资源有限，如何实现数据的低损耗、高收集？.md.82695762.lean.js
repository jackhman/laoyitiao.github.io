import{_ as n,j as e,o as s,g as r,k as a,h as p,s as t,Q as l}from"./chunks/framework.4e7d56ce.js";const I=JSON.parse('{"title":"16采样设计：资源有限，如何实现数据的低损耗、高收集？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/应用性能分析实战_文档/(7065) 16  采样设计：资源有限，如何实现数据的低损耗、高收集？.md","filePath":"posts/backEnd/应用性能分析实战_文档/(7065) 16  采样设计：资源有限，如何实现数据的低损耗、高收集？.md","lastUpdated":1696417798000}'),i={name:"posts/backEnd/应用性能分析实战_文档/(7065) 16  采样设计：资源有限，如何实现数据的低损耗、高收集？.md"},_=t("h1",{id:"_16采样设计-资源有限-如何实现数据的低损耗、高收集",tabindex:"-1"},[p("16采样设计：资源有限，如何实现数据的低损耗、高收集？ "),t("a",{class:"header-anchor",href:"#_16采样设计-资源有限-如何实现数据的低损耗、高收集","aria-label":'Permalink to "16采样设计：资源有限，如何实现数据的低损耗、高收集？"'},"​")],-1),c=t("p",null,"我们都知道，APM 数据是海量的，项目初期很难申请到足够的资源，让监控服务去承接这些海量的监控数据，所以就需要对海量数据进行采样了。",-1),g=t("p",null,"但开启采样后，免不了会带来数据丢失。如果排查故障问题时，发现丢弃的监控数据过多，就会让 APM 建设的口碑越来越差，使用的人越来越少，这样资源就更申请不到了，从而最后导致了 APM 的形同虚设。",-1),u=t("p",null,"那如何平衡采样、数据、资源的关系呢？这时候就需要我们来设计采样策略。今天我会分享以下四种采样策略，通过对课程的学习，让你在建设 APM 的数据时，可以尽最大可能地收集到用户想要的数据。",-1),d=l("",45),h=t("p",null,"试想如果请求量很大，服务 AB 都开启了采样，这时如果服务 B 在执行过程中出现异常，使用异常收集的链路特征采样策略，确保了服务 B 执行过程中，出现异常可以收集异常的 APM 监控数据；可是服务无法通知下游服务 A 收集相关的数据。",-1),A=t("p",null,"这也是刚讲的前三个采样模型的共同难点，就是上游服务发生异常，无法告知下游服务进行采集相关联的监控数据。",-1),P=t("p",null,"为了解决这个问题，需要是扩展跨语言交互协议和引入 APM 配置中心来解决这个问题。",-1),m=l("",6);function q(M,T,k,S,b,f){const o=e("Image");return s(),r("div",null,[_,c,g,u,a(o,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M00/40/77/CioPOWCk4VqAXw9tAABoA92m-1M235.png"}),p(),d,a(o,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/40/6F/Cgp9HWCk4W6AKsugAAEMl9ObTQQ055.png"}),p(),h,A,P,a(o,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M00/40/77/CioPOWCk4XSAHCKJAAFGpT6EXic022.png"}),p(),m])}const x=n(i,[["render",q]]);export{I as __pageData,x as default};
