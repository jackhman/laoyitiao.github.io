import{_ as o,j as t,o as e,h as r,k as n,f as s,Q as p,s as l}from"./chunks/framework.d3daa342.js";const x=JSON.parse('{"title":"14动态规划：如何通过最优子结构，完成复杂问题求解？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/重学数据结构与算法_文档/(3352) 14  动态规划：如何通过最优子结构，完成复杂问题求解？.md","filePath":"posts/backEnd/重学数据结构与算法_文档/(3352) 14  动态规划：如何通过最优子结构，完成复杂问题求解？.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/重学数据结构与算法_文档/(3352) 14  动态规划：如何通过最优子结构，完成复杂问题求解？.md"},E=p("",11),y=p("",26),F=p("",5),C=l("p",null,[l("strong",null,"我们的优化目标为 min V~k,7~(s~1~=A, s~7~=G)，因此精简后原问题为，min V~7~(G)"),s("。")],-1),i=l("p",null,[s("因此，"),l("strong",null,"最终输出路径为 A -> B~1~ -> C~2~ -> D~1~ -> E~2~ -> F~2~ -> G，最短距离为 18"),s("。")],-1),B=l("h4",{id:"代码实现过程",tabindex:"-1"},[s("代码实现过程 "),l("a",{class:"header-anchor",href:"#代码实现过程","aria-label":'Permalink to "代码实现过程"'},"​")],-1),g=l("p",null,"接下来，我们尝试用代码来实现上面的计算过程。对于输入的图，可以采用一个 m x m 的二维数组来保存。在这个二维数组里，m 等于全部的结点数，也就是结点与结点的关系图。而数组每个元素的数值，定义为结点到结点需要的距离。",-1),m=l("p",null,"在本例中，可以定义输入矩阵 m（空白处为0），如下图所示：",-1),A=p("",16);function _(h,d,u,D,b,k){const a=t("Image");return e(),r("div",null,[E,n(a,{alt:"image (4).png",src:"https://s0.lgstatic.com/i/image/M00/2A/79/Ciqc1F78bdmAGdktAADnlpYQrHk607.png"}),s(),y,n(a,{alt:"image (12).png",src:"https://s0.lgstatic.com/i/image/M00/2A/85/CgqCHl78bqSAQBWuAAAmIGYXrUs078.png"}),s(),F,n(a,{alt:"image (6).png",src:"https://s0.lgstatic.com/i/image/M00/2A/85/CgqCHl78bpKAF2FWAADnlpYQrHk836.png"}),s(),C,n(a,{alt:"image (13).png",src:"https://s0.lgstatic.com/i/image/M00/2A/7A/Ciqc1F78bvCAD2QkAABAo0Sezlc723.png"}),s(),n(a,{alt:"5.png",src:"https://s0.lgstatic.com/i/image/M00/2A/C5/Ciqc1F79TfyAEbKKAAB2PY0Lb5U909.png"}),s(),n(a,{alt:"image (15).png",src:"https://s0.lgstatic.com/i/image/M00/2A/7A/Ciqc1F78bx2AO3WTAACB1LuxHEo059.png"}),s(),n(a,{alt:"image (7).png",src:"https://s0.lgstatic.com/i/image/M00/2A/7A/Ciqc1F78bySAdLa-AACOk2cGokg643.png"}),s(),n(a,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/2A/D0/CgqCHl79TgmAfHtMAACROQbL6JE078.png"}),s(),n(a,{alt:"image (9).png",src:"https://s0.lgstatic.com/i/image/M00/2A/85/CgqCHl78bzKAQTrCAABoEJ4y5UM123.png"}),s(),i,B,g,n(a,{alt:"image (10).png",src:"https://s0.lgstatic.com/i/image/M00/2A/7A/Ciqc1F78bz2ATtl4AADnlpYQrHk384.png"}),s(),m,n(a,{alt:"image (11).png",src:"https://s0.lgstatic.com/i/image/M00/2A/85/CgqCHl78b0mALhRHAABQnqgjMYc406.png"}),s(),A])}const f=o(c,[["render",_]]);export{x as __pageData,f as default};
