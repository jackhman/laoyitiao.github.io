import{_ as e,j as s,o as r,g as i,k as a,h as o,Q as l,s as t}from"./chunks/framework.4e7d56ce.js";const M=JSON.parse('{"title":"06自动化测试：提高小程序的交付质量","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5099) 06  自动化测试：提高小程序的交付质量.md","filePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5099) 06  自动化测试：提高小程序的交付质量.md","lastUpdated":1696417798000}'),n={name:"posts/frontEnd/103-云原生微信小程序开发实战文档/(5099) 06  自动化测试：提高小程序的交付质量.md"},_=l("",12),c=t("p",null,"而正确的测试模型应该是金字塔形状：",-1),u=t("p",null,"从下到上是单元测试、集成测试、端到端测试和验收测试，这几种测试从应用整体的角度上说：",-1),g=t("ul",null,[t("li",null,[t("p",null,"单元测试应该包含前后端各自的单元测试；")]),t("li",null,[t("p",null,"集成测试对应前后端集成场景，或者通俗地理解为前后端联调测试；")]),t("li",null,[t("p",null,"端到端测试对应项目的完整功能测试，也就是图 1 的自动 GUI 测试。")])],-1),m=t("p",null,"如果进一步细化，把前端看成一个相对独立的、与后端隔离的黑盒，在这个语境下再去理解金字塔模型，单元测试就可以引申出更加宽泛的含义，把它看成狭义上的前端单元测试、前端模块集成测试以及与后端隔离的端到端测试的集合。如下图所示：",-1),h=l("",29),d=l("",6),A=t("p",null,"小程序由于自身生态的封闭性，在自动化测试的技术选型上稍显局促，好在官方提供了一些好用的工具可供开发者参考，这些工具本身也具备一定的扩展性，可以结合前端生态中的一些测试工具共同搭建为完整的自动化测试体系。",-1),q=t("p",null,"我们这节课用了较多的篇幅讲解测试相关的理论知识，这些知识是与小程序无关的，可以应用到任何一个技术领域，包括后续我们将学习的云开发领域。",-1),C=t("p",null,"当然了，我们并没有过多介绍小程序测试工具的使用方法，一是因为这些内容在文档中都可以找到，二是因为工具只是辅助理论落地的媒介。所以这些简单的工作就作为今天的课后作业交给你来完成：阅读这节课提到的集中测试工具的文档，学习如何使用它们。",-1);function I(f,k,T,U,P,b){const p=s("Image");return r(),i("div",null,[_,a(p,{alt:"Lark20201116-184730.png",src:"https://s0.lgstatic.com/i/image/M00/6E/69/Ciqc1F-yWPSAEM-MAAA9nUuyNw8088.png"}),o(),c,a(p,{alt:"Lark20201116-184741.png",src:"https://s0.lgstatic.com/i/image/M00/6E/69/Ciqc1F-yWP6ACKE-AABULXCkWds525.png"}),o(),u,g,a(p,{alt:"Lark20201116-184743.png",src:"https://s0.lgstatic.com/i/image/M00/6E/69/Ciqc1F-yWQWAMwnhAABslttM12k025.png"}),o(),m,a(p,{alt:"Lark20201116-184746.png",src:"https://s0.lgstatic.com/i/image/M00/6E/74/CgqCHl-yWQ2ARk4hAACFGZZdUJM537.png"}),o(),h,a(p,{alt:"Lark20201116-184748.png",src:"https://s0.lgstatic.com/i/image/M00/6E/69/Ciqc1F-yWVGALSbRAADXcMCyGtM868.png"}),o(),d,a(p,{alt:"666.png",src:"https://s0.lgstatic.com/i/image/M00/6F/9F/Ciqc1F-2RKqADBn6AAVRBBeLrKE489.png"}),o(),A,q,C])}const S=e(n,[["render",I]]);export{M as __pageData,S as default};
