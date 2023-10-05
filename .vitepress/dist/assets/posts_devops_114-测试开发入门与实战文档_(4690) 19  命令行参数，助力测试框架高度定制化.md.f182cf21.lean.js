import{_ as o,j as e,o as t,g as c,k as n,s,h as l,Q as p}from"./chunks/framework.4e7d56ce.js";const P=JSON.parse('{"title":"pytest 添加命令行参数 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/114-测试开发入门与实战文档/(4690) 19  命令行参数，助力测试框架高度定制化.md","filePath":"posts/devops/114-测试开发入门与实战文档/(4690) 19  命令行参数，助力测试框架高度定制化.md","lastUpdated":1696417798000}'),r={name:"posts/devops/114-测试开发入门与实战文档/(4690) 19  命令行参数，助力测试框架高度定制化.md"},i=s("p",null,'欢迎进入"模块四 深入自动化测试框架原理"，算上开篇词、课前必读，以及前三个模块的学习，你对测试框架应该有了非常深刻的认识。',-1),y=s("p",null,"按照本课程知识，现在你已经能融合 API 和 UI 搭建出功能丰富的测试框架，并可以使用 PageObject 模型分离元素和操作；之后，我们又让测试框架具备 Data Driven 能力，并搭配 Jira 或者禅道创建出具备测试数据管理能力的一揽子测试解决方案。",-1),E=s("p",null,"用这些技能应对日常测试工作肯定没有任何问题，但是每一个有追求的测试人都会想：我能不能自己造一个轮子？",-1),d=s("blockquote",null,[s("p",null,"小提问： 为什么编写自己的测试框架或者应用程序，被称为造轮子？请带着这个问题进行下面的学习，在后面的部分我会解答。")],-1),g=s("p",null,"从本讲开始，我将拆解自动化测试框架的重要组成部分，并带领你一一自主实现。模块四结束时，你应该就具备不借助任何第三方库，独自开发测试框架的能力了。",-1),h=s("p",null,[l("今天我们先来看测试框架的第一个重点部分："),s("strong",null,"使用命令行参数定制化测试框架"),l("，下图是本讲的内容结构，可供你学习参考。")],-1),u=p("",22),_=p("",84),F=p("",13),m=s("p",null,[l("最后访问"),s("a",{href:"https://pypi.org/project/iTesting/0.1/",target:"_blank",rel:"noreferrer"},"上传后的地址"),l("，你可以看到，我们创建的程序已经被正确上传。")],-1),v=p("",5),A=p("",15);function k(C,D,b,f,q,T){const a=e("Image");return t(),c("div",null,[i,y,E,d,g,h,n(a,{alt:"Lark20201111-153749.png",src:"https://s0.lgstatic.com/i/image/M00/6C/C1/Ciqc1F-rlNyAYJruAAJ1s2sC_oI765.png"}),u,n(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/6C/C1/Ciqc1F-rlO6AWE0YAAFy2gX8N48615.png"}),_,n(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/6C/C2/Ciqc1F-rlVSAUGJ5AAAvK9HTWWM176.png"}),F,n(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/6C/CD/CgqCHl-rlXuASwWuAABKEnStxhs583.png"}),m,n(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/6C/CD/CgqCHl-rlYGAA-SvAAA3Elyl8kU509.png"}),v,n(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/6C/C2/Ciqc1F-rlaaAfYmXAABO62yvV5w144.png"}),A])}const w=o(r,[["render",k]]);export{P as __pageData,w as default};
