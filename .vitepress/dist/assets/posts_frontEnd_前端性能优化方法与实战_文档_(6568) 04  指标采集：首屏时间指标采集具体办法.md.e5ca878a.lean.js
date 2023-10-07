import{_ as o,j as e,o as t,g as c,k as p,h as n,Q as l,s}from"./chunks/framework.4e7d56ce.js";const M=JSON.parse('{"title":"04指标采集：首屏时间指标采集具体办法","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/前端性能优化方法与实战_文档/(6568) 04  指标采集：首屏时间指标采集具体办法.md","filePath":"posts/frontEnd/前端性能优化方法与实战_文档/(6568) 04  指标采集：首屏时间指标采集具体办法.md","lastUpdated":1696417798000}'),r={name:"posts/frontEnd/前端性能优化方法与实战_文档/(6568) 04  指标采集：首屏时间指标采集具体办法.md"},E=l("",32),y=l("",44),i=s("p",null,"这一讲我主要介绍了首屏指标采集相关的内容。不知道你看完后有没有这样的疑惑：这种性能采集方案靠谱吗？目前一线大厂有谁在使用这种采集方案？采集过程中会不会有什么坑？",-1),m=s("p",null,"先说靠不靠谱，目前来说，这是市面中最好的首屏指标采集方案，它兼容了单页面应用和服务端模板的页面。我们反复做了几个月的数据实验，并借助它完成了一个全公司的性能优化项目，用实验和实践结果证明这种方案的靠谱程度。",-1),F=s("p",null,"第二个问题，一线大厂里，阿里云、淘宝、阿里飞猪、得到 App、微店等公司都广泛在使用这个方案。",-1),g=s("p",null,"最后一个问题，首屏指标采集中会不会有坑。实践中确实有不少的坑。比如，一个单页面应用，我们需要采集它的首屏时间，当我们采集首页的首屏指标时，用户恰好输入了一些东西导致页面跳转到了搜索结果页。此时首屏采集脚本继续在执行，那最终统计的就是搜索结果页的首屏数据而不是首页的",-1),d=s("p",null,"类似这种问题，你想过怎么解决吗？欢迎在评论区和我留言进行交流。",-1),C=s("p",null,"上面就是首屏指标采集和优化手段相关的内容，接下来看看其他的指标如何采集。",-1),u=s("p",null,[n("源码地址："),s("a",{href:"https://github.com/lagoueduCol/WebPerformanceOptimization-xifeng",target:"_blank",rel:"noreferrer"},"https://github.com/lagoueduCol/WebPerformanceOptimization-xifeng")],-1);function h(D,A,B,f,_,S){const a=e("Image");return t(),c("div",null,[E,p(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M01/0F/EB/Cgp9HWA-BM6AF77NAAHEtECWVO0860.png"}),n(),y,p(a,{alt:"溪风的思维导图04.png",src:"https://s0.lgstatic.com/i/image6/M00/13/4C/CioPOWBB_OyAW8ipAAFZ1B6bNmQ490.png"}),n(),i,m,F,g,d,C,u])}const v=o(r,[["render",h]]);export{M as __pageData,v as default};
