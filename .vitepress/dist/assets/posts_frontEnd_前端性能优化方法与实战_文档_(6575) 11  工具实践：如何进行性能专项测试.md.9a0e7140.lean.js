import{_ as o,j as e,o as t,h as c,k as p,f as a,Q as l,s}from"./chunks/framework.d3daa342.js";const P=JSON.parse('{"title":"11工具实践：如何进行性能专项测试","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/前端性能优化方法与实战_文档/(6575) 11  工具实践：如何进行性能专项测试.md","filePath":"posts/frontEnd/前端性能优化方法与实战_文档/(6575) 11  工具实践：如何进行性能专项测试.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/前端性能优化方法与实战_文档/(6575) 11  工具实践：如何进行性能专项测试.md"},y=l("",31),E=l("",18),i=s("p",null,"图中一张一张的图片就是分帧处理的结果，文件名代表着加载帧时对应的时间，比如我们找到第14 张的图片，判断这个就是白屏结束的位置（图中红线框的部分），对应图片文件是2788.jpg，也就是说首屏时间是 2788ms。对照一下标准，WIFI 下首屏时间 2788ms，属于比较慢的情况，需要做优化。",-1),d=s("h3",{id:"小结",tabindex:"-1"},[a("小结 "),s("a",{class:"header-anchor",href:"#小结","aria-label":'Permalink to "小结"'},"​")],-1),F=s("p",null,"好了，以上就是我们以首屏时间为例，介绍了如何进行性能专项测试，这里面还有一些注意事项：",-1),h=s("p",null,"一是在视频分帧计算时，我们 openCV 最好能借助 brew（ Mac 环境下）进行安装，如果没有 brew 的话（ Windows 等环境下），可以通过 Anaconda 来安装这个软件；",-1),_=s("p",null,"二是计算首屏时间方面，我们前文提到的首屏时间判断，是通过人工提取对应着首屏时间的那一帧。我们后来试着用图像识别的方式去自动提取首屏时间对应的那一帧。这样做的目的主要是提高准确度，以及提高效率。",-1),D=s("p",null,"具体是这么做的呢？",-1),A=s("p",null,"我们拿到视频分帧计算结果后，通过图像识别的系统，去判断关键帧------ 首屏时间对应那一帧。哪个是关键帧呢？我们认为图片从不稳定到图片稳定那一刹那的时间就是关键帧。 当两张图片的变化值小于 5%，即可认为图片趋于稳定，我们以 95 分位值为判定值，如果内容 95% 都不发生变化，则下一帧即认为是视觉稳定的时间点，也就是首屏时间点。",-1),u=s("p",null,"除了首屏时间，其他性能测试如白屏时间、卡顿等，我们也可以采用本讲提到的 4 大步骤进行。现在给你留个问题：",-1),m=s("blockquote",null,[s("p",null,"我里面并没有提卡顿指标 FPS 如何获取，那么请问如何利用本讲的性能测试方案去获取呢？")],-1),C=s("p",null,"欢迎在评论区写下你的思考。下一讲我们将介绍，Hybrid 下的性能优化整体分析。",-1);function v(g,b,f,B,k,q){const n=e("Image");return t(),c("div",null,[y,p(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M00/24/3E/Cgp9HWBYQqyAbswwAAD1t7w10sA670.png"}),a(),E,p(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/24/3E/Cgp9HWBYQr-AQ0NzAAS9vRqw_FA271.png"}),a(),i,d,p(n,{alt:"溪风的思维导图11.png",src:"https://s0.lgstatic.com/i/image6/M01/27/94/CioPOWBdR8KAbhPpAAJvPUBn40U138.png"}),a(),F,h,_,D,A,u,m,C])}const V=o(r,[["render",v]]);export{P as __pageData,V as default};
