import{_ as r,j as o,o as n,g as t,k as l,h as a,Q as p,s}from"./chunks/framework.e0c66c3f.js";const k=JSON.parse('{"title":"Serverless 应用的成本分析 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/玩转 Serverless 架构_文档/(6041) 13｜成本优化：Serverle 真的省钱吗？.md","filePath":"posts/backEnd/玩转 Serverless 架构_文档/(6041) 13｜成本优化：Serverle 真的省钱吗？.md","lastUpdated":1696338709000}'),c={name:"posts/backEnd/玩转 Serverless 架构_文档/(6041) 13｜成本优化：Serverle 真的省钱吗？.md"},i=p("",41),E=s("p",null,"单实例单并发",-1),y=s("p",null,"单实例多并发",-1),v=s("p",null,"如图所示，单实例单并发情况下，T1-T2，T3-T4 之间都会计费，并且计费周期是两个函数的执行时长。而在单实例多并发的情况下，只计算 T1-T4 的整体时间，并且一个实例可以同时处理多个请求，最终按执行时间最长的请求计算执行耗时。假设单函数实例并发为 10，理论上可以节省 10 倍成本。",-1),S=s("ul",null,[s("li",null,[s("strong",null,"选择合适的计费方式")])],-1),d=s("p",null,"目前绝大部分 FaaS 平台都支持按量付费和预付费，你可以根据应用特点选择合适的付费方式。",-1),u=s("p",null,"例如在生产环境中，如果应用流量一直很高且比较平稳，对延迟也比较敏感，通常你可以使用预留模式，预留一定函数实例，这样就能极大减少冷启动，从而降低成本。而日常测试或离线处理数据时，函数可能是临时大量执行，这时就可以使用按量付费，在不需要执行函数时就不会消耗任何资源，这样就能保持较高的资源利用率，进而降低成本。",-1),g=p("",25);function h(_,A,F,C,m,b){const e=o("Image");return n(),t("div",null,[i,l(e,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/94/41/CgqCHmAXusuAPUuzAAZNxvjF9MA299.png"}),a(),E,l(e,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/94/41/CgqCHmAXutWATIu3AAes0bVKSe4361.png"}),a(),y,v,S,d,u,l(e,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image2/M01/0C/2E/Cip5yGAXuuKAZuKXAAbyIr7ir5M253.png"}),a(),g])}const B=r(c,[["render",h]]);export{k as __pageData,B as default};
