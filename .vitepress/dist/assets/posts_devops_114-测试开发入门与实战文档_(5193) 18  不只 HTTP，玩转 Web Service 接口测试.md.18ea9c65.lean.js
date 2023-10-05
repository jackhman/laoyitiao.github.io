import{_ as l,j as e,o,g as t,k as a,s,Q as p,h as c}from"./chunks/framework.4e7d56ce.js";const T=JSON.parse('{"title":"什么是 Web Services？ ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/114-测试开发入门与实战文档/(5193) 18  不只 HTTP，玩转 Web Service 接口测试.md","filePath":"posts/devops/114-测试开发入门与实战文档/(5193) 18  不只 HTTP，玩转 Web Service 接口测试.md","lastUpdated":1696417798000}'),r={name:"posts/devops/114-测试开发入门与实战文档/(5193) 18  不只 HTTP，玩转 Web Service 接口测试.md"},y=s("p",null,"通过前面课时的讲解，我们已经对如何进行 UI 自动化和接口自动化测试有了相当深刻的理解。但是对于接口测试的分享，在前面课程的讲解中，我主要讲解了基于 HTTP 的 RESTFUL 的接口。",-1),E=s("p",null,"实际上，接口有很多形式，除了我们常见的 HTTP 形式的 RESTFUL 接口外，还有 Web Services 类型的接口，以及 RPC 接口。不同类型的接口测试方式各有不同。",-1),i=s("p",null,"今天我们就来看下，如何测试 Web Services 类型的接口，这节课的内容如下：",-1),d=p("",8),_=p("",3),F=p("",34),u=p("",10),v=s("p",null,"综上所述，Zeep 对最新版本的 Python 支持的更好，而且没有性能问题。如果你的项目是新设立的，在选用Web Service客户端时，不妨直接使用Zeep。",-1),b=s("h3",{id:"总结",tabindex:"-1"},[c("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),h=s("p",null,"本章节中我们重点介绍了 Web Service 及 Web Service 接口，尤其是以 WSDL 格式提供的接口应该如何测试。 并且介绍了两个测试Web Service的Python 库suds和Zeep， 以及在日常工作中，我们是如何使用suds或者Zeep来封装Web Services接口的。",-1),C=s("p",null,"因为很难找到免费、复杂的 Web Service 接口供调用并演示，故本节内容中，代码比较简单。在此布置一个课后作业给你：请你询问下自己公司的开发，请他提供给你一个基于你公司业务的 WSDL 接口，并且根据今天所讲的内容，采用 suds 或者 Zeep 库来执行 Web Service 接口测试，巩固所学。",-1),S=s("p",null,"好的，我是蔡超，我们下节课再见。",-1),g=s("p",null,"在我的公众号 iTesting 中，也有关于 Web Service 接口调用的实例，其中包括对 service 和 factory 的调用。你可以关注 iTesting 并回复 WebService 查看。",-1),m=s("hr",null,null,-1),A=s("p",null,[s("a",{href:"https://wj.qq.com/s2/7506053/9b01",target:"_blank",rel:"noreferrer"},"课程评价入口，挑选 5 名小伙伴赠送小礼品～")],-1);function D(W,f,B,w,q,I){const n=e("Image");return o(),t("div",null,[y,E,i,a(n,{alt:"图片9.png",src:"https://s0.lgstatic.com/i/image/M00/6A/99/Ciqc1F-pCv6AaQg5AAYAaUPRT5M790.png"}),d,a(n,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image/M00/6A/A3/CgqCHl-pCsSAD1CUAAFHQFINvZY722.png"}),_,a(n,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image/M00/6A/A4/CgqCHl-pCtaAIlaHAAGumDmnrfI772.png"}),F,a(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/6A/6D/CgqCHl-o-M2AMf3RAAC1Nxb0gQc472.png"}),u,a(n,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image/M00/6A/99/Ciqc1F-pCu2AbMxCAAF3kfMvMmE625.png"}),v,b,h,C,S,g,m,A])}const x=l(r,[["render",D]]);export{T as __pageData,x as default};
