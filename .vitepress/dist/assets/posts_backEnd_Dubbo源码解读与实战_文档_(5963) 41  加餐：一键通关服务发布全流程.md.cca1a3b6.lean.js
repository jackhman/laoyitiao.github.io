import{_ as o,j as e,o as t,g as r,k as p,h as n,Q as l,s}from"./chunks/framework.4e7d56ce.js";const R=JSON.parse('{"title":"DubboBootstrap 入口 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Dubbo源码解读与实战_文档/(5963) 41  加餐：一键通关服务发布全流程.md","filePath":"posts/backEnd/Dubbo源码解读与实战_文档/(5963) 41  加餐：一键通关服务发布全流程.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/Dubbo源码解读与实战_文档/(5963) 41  加餐：一键通关服务发布全流程.md"},E=l("",8),y=l("",42),i=s("p",null,"服务发布详细流程图",-1),F=s("h3",{id:"总结",tabindex:"-1"},[n("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),d=s("p",null,"本课时我们重点介绍了 Dubbo 服务发布的核心流程。",-1),g=s("p",null,"首先我们介绍了 DubboBootstrap 这个入口门面类中与服务发布相关的方法，重点是 start() 和 exportServices() 两个方法；然后详细介绍了 ServiceConfig 类的三个核心步骤：检查参数、立即（或延迟）执行 doExport() 方法进行发布、回调服务发布的相关监听器。",-1),A=s("p",null,[n("接下来，我们分析了"),s("strong",null,"doExportUrlsFor1Protocol() 方法，它是发布一个服务的入口，也是规定服务发布流程的地方"),n("，其中涉及 Provider URL 的组装、本地服务发布流程以及远程服务发布流程，对于这些步骤，我们都进行了详细的分析。")],-1),D=s("p",null,"下一课时，我们将继续分析 Dubbo 服务引用的全流程，记得按时来听课。",-1);function C(u,v,m,b,f,B){const a=e("Image");return t(),r("div",null,[E,p(a,{alt:"Lark20201215-163844.png",src:"https://s0.lgstatic.com/i/image/M00/89/79/Ciqc1F_YdkGABhTFAACpT-2oDtw867.png"}),n(),y,p(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image2/M01/01/2C/CgpVE1_YNDaATl3fAAFcJTJOw3M699.png"}),n(),i,F,d,g,A,D])}const U=o(c,[["render",C]]);export{R as __pageData,U as default};
