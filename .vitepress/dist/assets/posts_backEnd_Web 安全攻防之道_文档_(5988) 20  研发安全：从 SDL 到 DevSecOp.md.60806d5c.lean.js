import{_ as r,j as p,o as n,g as c,k as s,h as a,s as e,Q as o}from"./chunks/framework.4e7d56ce.js";const F=JSON.parse('{"title":"什么是 SDL？ ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Web 安全攻防之道_文档/(5988) 20  研发安全：从 SDL 到 DevSecOp.md","filePath":"posts/backEnd/Web 安全攻防之道_文档/(5988) 20  研发安全：从 SDL 到 DevSecOp.md","lastUpdated":1696417798000}'),l={name:"posts/backEnd/Web 安全攻防之道_文档/(5988) 20  研发安全：从 SDL 到 DevSecOp.md"},i=e("p",null,"近几年，国内外越来越多人开始提倡 DevSecOps 理念，很多企业也逐步从 SDL 切换到 DevSecOps，以便研发出更安全的系统。",-1),_=e("p",null,"此外，DevSecOps 的应用也非常广泛，适用于各种研发领域，并不仅限于本套课程所讲的 Web 领域。所以，本讲就向你介绍下 SDL、DevSecOps 相关理论与实践，并对其进行出对比，方便你能够清楚地理解它们之点的差异和价值。",-1),h=e("h3",{id:"什么是-sdl",tabindex:"-1"},[a("什么是 SDL？ "),e("a",{class:"header-anchor",href:"#什么是-sdl","aria-label":'Permalink to "什么是 SDL？"'},"​")],-1),d=e("p",null,"SDL（安全开发生命周期）是一个满足安全合规要求的同时，兼顾开发成本的软件开发过程。它由微软提出，旨在帮助开发人员构建更加安全的软件。",-1),S=e("p",null,[a("SDL 的核心理念就是将"),e("strong",null,"安全"),a("集成到软件开发的每一个阶段，从需求（要求）、设计、编码（实施）、测试、发布的每一阶段都应该加入相应的安全工作，以提升软件安全质量。")],-1),A=o("",7),u=e("p",null,"DevOps 过程",-1),g=e("h4",{id:"_2-devops-与其他开发模式的不同",tabindex:"-1"},[a("2. DevOps 与其他开发模式的不同 "),e("a",{class:"header-anchor",href:"#_2-devops-与其他开发模式的不同","aria-label":'Permalink to "2. DevOps 与其他开发模式的不同"'},"​")],-1),D=e("p",null,"开发模式重点介绍下瀑布式开发、敏捷开发与 DevOps 的对比，通过下图就可以很直观地看出三者之间的差异。",-1),m=e("p",null,"各种开发模型对比",-1),v=e("p",null,"可以看到从瀑布式开发到敏捷开发，再从敏捷开发到 DevOps，可以看到各个阶段的切换速度越来越快，且以前的运维部署工作都是放到最后的。而 DevOps 则结合敏捷开发思想，将部署工作也敏捷起来，更强调自动化工具的实现与应用，以帮助实现软件的快速迭代。",-1),b=e("h4",{id:"_3-devsecops-强调安全",tabindex:"-1"},[a("3.DevSecOps 强调安全 "),e("a",{class:"header-anchor",href:"#_3-devsecops-强调安全","aria-label":'Permalink to "3.DevSecOps 强调安全"'},"​")],-1),O=e("p",null,[e("strong",null,"DevSecOps 正是在 DevOps的 CI/CD 过程中嵌入安全工作，整合开发、安全、运维等各项工作"),a("，强调安全是整个 IT 团队（开发、安全、运维等工作人员）的责任，而不仅仅是安全人员的工作，且需要贯穿整个研发生命周期的每一个环节，如下图所示。")],-1),f=e("p",null,"DevSecOps 流程",-1),P=e("h3",{id:"sdl-与-devsecops-的对比",tabindex:"-1"},[a("SDL 与 DevSecOps 的对比 "),e("a",{class:"header-anchor",href:"#sdl-与-devsecops-的对比","aria-label":'Permalink to "SDL 与 DevSecOps 的对比"'},"​")],-1),T=e("p",null,[a("SDL 与 DevSecOps 并不冲突，一些安全工作是相同的，"),e("strong",null,"只是 DevSecOps 更进一步强调自动化融入流程，安全责任属于每个人"),a("，自建更适合自己企业的安全文化。")],-1),C=e("p",null,"下面我整理出 SDL 与 DevSecOps 的一些对比，以帮助你更好地理解它们。",-1),q=e("h3",{id:"devsecops-工具链及其建设实践",tabindex:"-1"},[a("DevSecOps 工具链及其建设实践 "),e("a",{class:"header-anchor",href:"#devsecops-工具链及其建设实践","aria-label":'Permalink to "DevSecOps 工具链及其建设实践"'},"​")],-1),k=e("p",null,"如下图所示，Gartner 曾给出一套 DevSecOps 工具链，从计划、创建，到发布、预防，再到预测、适应，共包括了 10 个环节，接下来我们来看看每个环节中的实践建议。",-1),L=o("",6),I=o("",22),x=e("p",null,"织布鸟 SOAR 系统",-1),W=o("",11),R=e("hr",null,null,-1),M=e("p",null,[e("a",{href:"https://wj.qq.com/s2/8059116/3881/",target:"_blank",rel:"noreferrer"},"课程评价入口，挑选 5 名小伙伴赠送小礼品～")],-1);function V(B,E,y,H,N,U){const t=p("Image");return n(),c("div",null,[i,_,h,d,S,s(t,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M01/04/AC/Cgp9HWAuBCGAH1M5AAFGTV0f1u8829.png"}),a(),A,s(t,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M01/04/A9/CioPOWAuBDCAcBMmAAeRQL4-nwo108.png"}),a(),u,g,D,s(t,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image6/M00/04/AC/Cgp9HWAuBD-AdNggAADeU2LQqws391.png"}),a(),m,v,b,O,s(t,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image6/M01/04/AC/Cgp9HWAuBE2AdTREAAUyA7ehkaA210.png"}),a(),f,P,T,C,s(t,{alt:"图片9.png",src:"https://s0.lgstatic.com/i/image6/M00/04/AC/Cgp9HWAuBHSAHqHOAADU4OCrhvM183.png"}),q,k,s(t,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image6/M01/04/AC/Cgp9HWAuBIWAHtwaAAUVTKLJymM985.png"}),a(),L,s(t,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image6/M01/04/A9/CioPOWAuBQ6AH64LAAWKuEUqGec581.png"}),a(),I,s(t,{alt:"图片7.png",src:"https://s0.lgstatic.com/i/image6/M00/04/A9/CioPOWAuBKWAMCPPAAEy9c7nh_Y846.png"}),a(),x,s(t,{alt:"图片8.png",src:"https://s0.lgstatic.com/i/image6/M00/04/A9/CioPOWAuBLKAMaRdAAFXXPl7Ogg107.png"}),a(),W,s(t,{alt:"2021218-143636.png",src:"https://s0.lgstatic.com/i/image6/M01/04/AC/CioPOWAuCxOAcc6YAAVgr8YKbVY942.png"}),R,M])}const G=r(l,[["render",V]]);export{F as __pageData,G as default};
