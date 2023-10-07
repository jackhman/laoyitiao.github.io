import{_ as l,j as t,o as e,g as r,k as o,h as n,Q as p,s}from"./chunks/framework.4e7d56ce.js";const H=JSON.parse('{"title":"13如何分析和调优性能瓶颈？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/107-前端面试宝典之 React篇文档/(5803) 13  如何分析和调优性能瓶颈？.md","filePath":"posts/frontEnd/107-前端面试宝典之 React篇文档/(5803) 13  如何分析和调优性能瓶颈？.md","lastUpdated":1696417798000}'),c={name:"posts/frontEnd/107-前端面试宝典之 React篇文档/(5803) 13  如何分析和调优性能瓶颈？.md"},i=p("",8),E=p("",3),y=p("",13),g=s("p",null,[n("这个工具用起来也很简单，点击"),s("strong",null,"generate report"),n("，就可以直接生成一份网站性能报告。如下图所示：")],-1),_=s("p",null,"在报告中会对诸如初次内容渲染、可交互时间、加载等进行具体的数值量化并打分，最后还会为整体性能给出一个总体的分数，如下图所示，这里是 79 分。",-1),d=s("ul",null,[s("li",null,[s("p",null,"黄色代表当前处于一个用户尚可接受的状态；")]),s("li",null,[s("p",null,"绿色就代表了表现优异。")])],-1),u=s("p",null,"那么拉到最底部会有如何优化当前性能指标的指导意见。整份报告不仅包含了当前页面的性能数据，还囊括了最佳实践指南，对于前端开发是非常有指导意义的。如下图所示：",-1),h=p("",15),m=p("",3),F=s("p",null,"以上就是衡量的理论基础、指标体系与采集方式，那么接下来看一下如何优化。",-1),A=s("h4",{id:"排查",tabindex:"-1"},[n("排查 "),s("a",{class:"header-anchor",href:"#排查","aria-label":'Permalink to "排查"'},"​")],-1),C=s("p",null,[n("优化最难的地方在于"),s("strong",null,"定目标"),n("。")],-1),T=s("p",null,"制定目标有一个前提，对象是谁？很多应聘者在描述优化的时候，喜欢讲页面在优化方案下，快了多少倍。正如前文所分析的，这是不准确的。如果我们要提升网页的加载速度，应该把关注点放在整个用户群，而不是只有自己。",-1),P=s("p",null,"我们不妨假设，现在已经收集到了用户页面的性能数据，比如 FCP 的数据是 1 秒，3 秒，4 秒，6 秒，7 秒，8 秒，65 秒。那提升性能就是去提升他的平均数值吗？平均数约 39 秒，并不能反映整体情况。如下图所示。",-1),f=p("",9),q=p("",19),D=s("h3",{id:"总结",tabindex:"-1"},[n("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),w=s("p",null,"本文中 React 相关的内容偏少，因为在做页面性能优化的工作时，无论你采用什么前端框架，工作流程都是一样的。需要结合业务形态与指标数据去思考要优化哪些指标，如果不优化是否可行。在实施部分，大致讲解了每个指标对应 React 的优化情况，因为方案都很成熟，所以你可以根据方案自行学习，了解下原理与使用方式。",-1),S=s("p",null,"其中重渲染是一个比较麻烦且容易出错的点，所以在下一讲中，将会着重为你介绍重渲染应该如何处理。",-1),b=s("hr",null,null,-1),I=s("p",null,"[",-1),k=s("p",null,[n("]("),s("a",{href:"https://shenceyun.lagou.com/t/mka",target:"_blank",rel:"noreferrer"},"https://shenceyun.lagou.com/t/mka"),n(")")],-1),B=s("p",null,"《大前端高薪训练营》",-1),x=s("p",null,[n("对标阿里 P7 技术需求 + 每月大厂内推，6 个月助你斩获名企高薪 Offer。"),s("a",{href:"https://shenceyun.lagou.com/t/mka",target:"_blank",rel:"noreferrer"},"点击链接"),n("，快来领取！")],-1);function R(V,v,M,N,L,K){const a=t("Image");return e(),r("div",null,[i,o(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/8D/1B/CgqCHl_4K1eAAyQ-AAVO-To5VrY635.png"}),n(),E,o(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image2/M01/04/F5/CgpVE1_4K3WAQsx2AABVF04Sf88136.png"}),n(),y,o(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image2/M01/04/F3/Cip5yF_4K36Ad8MHAAP1tzHogqo025.png"}),n(),g,o(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image2/M01/04/F3/Cip5yF_4K4aAD3mGAAIwDdtSdf8416.png"}),n(),_,d,o(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image2/M01/04/F3/Cip5yF_4K4yAS_SKAADzp2WYeSU530.png"}),n(),u,o(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image2/M01/04/F5/CgpVE1_4K5OAbK2ZAAG2eSCinqo569.png"}),n(),h,o(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image2/M01/04/F3/Cip5yF_4K6GARjEsAAuceJPXFwY692.png"}),n(),m,o(a,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image2/M01/04/F5/CgpVE1_4K6uASH1fAAZm3Bzlmfw212.png"}),n(),F,A,C,T,P,o(a,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image2/M01/04/F5/CgpVE1_4K7SAemzIAACEViAQCRo609.png"}),n(),f,o(a,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image/M00/8D/10/Ciqc1F_4K7-AJ-lmAADn8menSCY047.png"}),n(),q,o(a,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image/M00/8D/1B/CgqCHl_4K8yAe3vEAAFTO9lc9-k604.png"}),n(),D,w,S,b,I,o(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/72/94/Ciqc1F_EZ0eANc6tAASyC72ZqWw643.png"}),n(),k,B,x])}const J=l(c,[["render",R]]);export{H as __pageData,J as default};
