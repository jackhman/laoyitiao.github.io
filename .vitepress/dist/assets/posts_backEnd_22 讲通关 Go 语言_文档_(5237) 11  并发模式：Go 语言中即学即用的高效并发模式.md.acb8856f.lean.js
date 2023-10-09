import{_ as o,j as e,o as c,h as t,k as l,f as n,Q as p,s}from"./chunks/framework.d3daa342.js";const q=JSON.parse('{"title":"11并发模式：Go语言中即学即用的高效并发模式","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/22 讲通关 Go 语言_文档/(5237) 11  并发模式：Go 语言中即学即用的高效并发模式.md","filePath":"posts/backEnd/22 讲通关 Go 语言_文档/(5237) 11  并发模式：Go 语言中即学即用的高效并发模式.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/22 讲通关 Go 语言_文档/(5237) 11  并发模式：Go 语言中即学即用的高效并发模式.md"},E=p("",25),y=s("p",null,"（流水线模式）",-1),i=s("p",null,"通过以上流水线模式示意图，可以看到从最开始的生产，经过工序 1、2、3、4 到最终成品，这就是一条比较形象的流水线，也就是 Pipeline。",-1),F=s("p",null,[n("现在我以组装手机为例，讲解流水线模式的使用。假设一条组装手机的流水线有 3 道工序，分别是"),s("strong",null,"配件采购"),n(" 、"),s("strong",null,"配件组装"),n(" 、"),s("strong",null,"打包成品"),n("，如图所示：")],-1),u=p("",24),g=p("",30),h=s("p",null,"你会在很多项目的源代码中一遍遍地看到本节课提到的并发模式，虽然解决的问题不一样，但它们的思路是相似的，所以你也可以把它们进一步抽象，这样在项目开发中就可以直接复用。",-1),d=s("p",null,"并发模式不限于这节课讲的这些，在项目中和并发、异步有关并且可以被抽象复用的解决方案都可以总结为并发模式。所以发挥自己的想象吧，这节课的思考题就是：你还能总结出哪些并发模式呢？",-1),A=s("p",null,'下节课开始，我们将进入本专栏的第三个模块"Go 语言深入理解"，所以一定要好好复习前面的课程，下节课开始就会比较深入了。',-1);function D(C,m,f,b,k,_){const a=e("Image");return c(),t("div",null,[E,l(a,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image/M00/75/53/CgqCHl_HcfiAH8GxAAEpQcyhlLg927.png"}),n(),y,i,F,l(a,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image/M00/75/48/Ciqc1F_HcfGAWb6pAABvGsG8s_o830.png"}),n(),u,l(a,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image/M00/75/53/CgqCHl_HcgOAJjFKAAFXf-gaoW4824.png"}),n(),g,l(a,{alt:"11金句.png",src:"https://s0.lgstatic.com/i/image/M00/75/48/Ciqc1F_Hcg-AXnkiAAVaWJnRE0s191.png"}),n(),h,d,A])}const B=o(r,[["render",D]]);export{q as __pageData,B as default};
