import{_ as l,j as s,o as i,g as n,k as o,h as e,s as p,Q as a}from"./chunks/framework.4e7d56ce.js";const x=JSON.parse('{"title":"07平台实践：如何从0到1搭建前端性能平台","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/前端性能优化方法与实战_文档/(6571) 07  平台实践：如何从 0 到 1 搭建前端性能平台.md","filePath":"posts/frontEnd/前端性能优化方法与实战_文档/(6571) 07  平台实践：如何从 0 到 1 搭建前端性能平台.md","lastUpdated":1696417798000}'),_={name:"posts/frontEnd/前端性能优化方法与实战_文档/(6571) 07  平台实践：如何从 0 到 1 搭建前端性能平台.md"},r=p("h1",{id:"_07平台实践-如何从0到1搭建前端性能平台",tabindex:"-1"},[e("07平台实践：如何从0到1搭建前端性能平台 "),p("a",{class:"header-anchor",href:"#_07平台实践-如何从0到1搭建前端性能平台","aria-label":'Permalink to "07平台实践：如何从0到1搭建前端性能平台"'},"​")],-1),c=p("p",null,"前几讲，我已经介绍了首屏时间、白屏、卡顿等性能指标采集和上报，按照性能优化体系的流程，接下来就该对性能 SDK 上报数据的处理了。那具体该怎么做呢？这就需要用到我们这一讲介绍的前端性能平台了。",-1),d=p("p",null,"还记得我之前提到的奥林匹亚项目吗？当时我们用的是一个开源的监控平台，只能够满足首屏时间和白屏时间等性能关键指标的展示需求，具体到一些个性化细分的性能数据，比如秒开率，数据瀑布流等，并无法满足。再加上业务开始对性能重视起来，不再想再亡羊补牢，还希望能未雨绸缪，提前发现故障，快速定位问题。于是，前端性能平台的自研需求就应运而生了。",-1),h=p("p",null,"如果你或者你所在的团队也想进一步提高前端性能，那么这一讲就要认真看了哦，前端性能平台可是性能优化体系当中不可缺少的一环。",-1),u=p("p",null,"什么是前端性能平台呢？",-1),g=p("p",null,[e("单从名字来看，它仿佛是一个后台系统，类似报表统计后台之类的。其实不然，前端性能平台是一个 Web 系统，主要包括"),p("strong",null,"后台的性能数据处理和前台的可视化展示"),e("两部分。")],-1),S=p("p",null,"其中，数据处理后台主要是对 SDK 上报后的性能指标进行处理和运算，具体包括数据入库、数据清洗、数据计算，做完这些后，前台会对结果进行可视化展现，我们借助它就可以实时监督前端的性能情况。下图是性能平台大盘页的效果，主要对当前用户关注的性能模块进行展示，内容包括首屏时间、秒开率和采样PV。",-1),A=p("p",null,"性能平台大盘页",-1),m=p("p",null,"那么，我们该如何搭建这样一个性能平台呢？",-1),D=a("",28),P=p("p",null,"详情页性能均值",-1),k=p("p",null,"详情页终端类型",-1),f=p("p",null,"同时，为了解秒开率不达标原因或者首屏时间变慢的细节在哪里，我们会给出页面加载瀑布流，前面数据处理阶段已经提到可以使用的数据（包括 DNS 查询、TCP链接、请求耗时、内容传输、资源解析、DOM 解析和资源加载的时间），套用 AntV （阿里巴巴集团的数据可视化方案）的瀑布流模板即可完成数据展现。",-1),C=a("",9),T=p("p",null,"好了以上就是性能监控平台的核心实现，如果公司没有类似的埋点平台，那么这一讲非常适合你，如果已经有了，性能上报直接走埋点平台处理就好，基本上性能上报处理就不需要自己做了，可以专注于第二部分前端可视化交互。",-1),N=p("p",null,"另外性能指标里有很多内容，比如 Dom ready 指标，完全加载时间指标，这些通过Performance 接口也能取到，但根据我过往的经验，最有用的性能指标还是秒开率、首屏时间、白屏时间、卡断指标。",-1),K=p("p",null,"好了，性能平台实践的内容就到这里了。在这里给你留一个小问题：",-1),v=p("blockquote",null,[p("p",null,"业界在统计首屏时间时，都会统计一下是否首次访问，这个是怎么实现的呢？")],-1),M=p("p",null,"欢迎在评论区留言和我沟通，下一讲我会详细介绍下如何进行效果评估、监控预警及问题诊断。",-1);function B(H,L,V,q,b,O){const t=s("Image");return i(),n("div",null,[r,c,d,h,u,g,S,o(t,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/1A/35/CioPOWBLG3mAVYkkAAHApv2u7qk043.png"}),e(),A,m,o(t,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M00/1A/38/Cgp9HWBLG4yAU8hkAACsiIzC-Zs386.png"}),e(),D,o(t,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M00/1A/35/CioPOWBLG6aASuNtAAURvlMLkr8118.png"}),e(),P,o(t,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M00/1A/35/CioPOWBLG66AKPw6AADWZ9u93AE631.png"}),e(),k,f,o(t,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image6/M00/1A/38/Cgp9HWBLG8CAOosDAAGIeWOW8_Y611.png"}),e(),C,o(t,{alt:"溪风的思维导图07.png",src:"https://s0.lgstatic.com/i/image6/M00/1A/53/CioPOWBLOe6AGanvAAJKTg2Y6Bw296.png"}),e(),T,N,K,v,M])}const I=l(_,[["render",B]]);export{x as __pageData,I as default};
