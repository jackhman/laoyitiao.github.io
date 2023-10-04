import{_ as l,j as p,o as s,g as a,k as i,Q as n,s as t,h as o}from"./chunks/framework.e0c66c3f.js";const V=JSON.parse('{"title":"简单回顾 Sentinel ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/应用性能分析实战_文档/(7061) 12  并发编程：流量洪峰下，Sentinel 如何高效精准计算？.md","filePath":"posts/backEnd/应用性能分析实战_文档/(7061) 12  并发编程：流量洪峰下，Sentinel 如何高效精准计算？.md","lastUpdated":null}'),r={name:"posts/backEnd/应用性能分析实战_文档/(7061) 12  并发编程：流量洪峰下，Sentinel 如何高效精准计算？.md"},_=n("",13),c=t("p",null,"可以看出 Hystrix 的执行原理非常清晰。正因为 Sentinel 和 Hystrix 的架构实现都非常简单，一经发布就在社区得到了非常多用户的拥趸。",-1),g=t("p",null,"那接下来，我们就对比 Hystrix，看下 Sentinel 在并发编程上使用了哪些设计，使其在流量洪峰下，依旧计算精准且性能损耗低。",-1),h=t("h3",{id:"在并发编程上-流量控制工具如何作为",tabindex:"-1"},[o("在并发编程上，流量控制工具如何作为？ "),t("a",{class:"header-anchor",href:"#在并发编程上-流量控制工具如何作为","aria-label":'Permalink to "在并发编程上，流量控制工具如何作为？"'},"​")],-1),d=t("p",null,[t("strong",null,"接下来我将以 Sentinel 为主，专注流量控制工具在并发编程上的思考"),o('。我会对 "并发请求隔离技术"和"吞吐的并发流量计算技术"进行展开；最后再以原理视角，重新审视 Sentinel 和 Hystrix 在产品形态上的异同。')],-1),u=t("p",null,"下图是 Sentinel 官方对 Sentinel 和 Hystrix 的对比。",-1),S=n("",15),A=n("",8),m=n("",7),C=n("",5),x=n("",7);function T(q,H,P,y,b,k){const e=p("Image");return s(),a("div",null,[_,i(e,{alt:"202156-1579.png",src:"https://s0.lgstatic.com/i/image6/M01/3D/3A/Cgp9HWCTlcmAW02OAACQw3pf9vU693.png"}),c,g,h,d,u,i(e,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M01/3C/86/CioPOWCKiAGAC9RhAAHoNdERHTI462.png"}),S,i(e,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M01/3C/86/CioPOWCKiBCALmjFAAKau0ImkMw506.png"}),A,i(e,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M01/3C/7E/Cgp9HWCKiByANXwuAAD-l4OAyPk504.png"}),m,i(e,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M01/3C/7E/Cgp9HWCKiCmAUw79AAbA5hMcjKA409.png"}),C,i(e,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M01/3C/86/CioPOWCKiDGARqU1AAIjrJ0VPww924.png"}),x])}const I=l(r,[["render",T]]);export{V as __pageData,I as default};
