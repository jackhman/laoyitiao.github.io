import{_ as i,j as e,o,g as s,k as l,Q as a,s as p,h as _}from"./chunks/framework.4e7d56ce.js";const B=JSON.parse('{"title":"图灵机的构造 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/重学操作系统_文档/(4608) 02  程序的执行：相比 32 位，64 位的优势是什么？（上）.md","filePath":"posts/backEnd/重学操作系统_文档/(4608) 02  程序的执行：相比 32 位，64 位的优势是什么？（上）.md","lastUpdated":1696417798000}'),n={name:"posts/backEnd/重学操作系统_文档/(4608) 02  程序的执行：相比 32 位，64 位的优势是什么？（上）.md"},r=a("",10),c=a("",5),h=p("ul",null,[p("li",null,"接下来，图灵机通过读写头读入 11 到它的存储设备中（这个存储设备也叫作图灵机的状态）。图灵机没有说读写头为什么可以识别纸带上的字符，而是假定读写头可以做到这点。")],-1),C=p("ul",null,[p("li",null,"然后读写头向右移动一个格，用同样的方法将 15 读入图灵机的状态中。现在图灵机的状态中有两个连续的数字，11 和 15。")],-1),P=a("",1),g=p("ul",null,[p("li",null,"读写头向右移动，将结果 26 写入纸带。")],-1),d=p("p",null,"这样，我们就通过图灵机计算出了 11+15 的值。不知道你有没有发现，图灵机构造的这一台机器，主要功能就是读写纸带然后计算；纸带中有数据、也有控制字符（也就是指令），这个设计和我们今天的计算机是一样的。",-1),u=p("p",null,"图灵通过数学证明了，一个问题如果可以拆解成图灵机的可执行步骤，那问题就是可计算的。另一方面，图灵机定义了计算机的组成以及工作原理，但是没有给出具体的实现。",-1),U=p("h3",{id:"冯诺依曼模型",tabindex:"-1"},[_("冯诺依曼模型 "),p("a",{class:"header-anchor",href:"#冯诺依曼模型","aria-label":'Permalink to "冯诺依曼模型"'},"​")],-1),m=a("",42);function b(A,q,T,k,f,S){const t=e("Image");return o(),s("div",null,[r,l(t,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/4C/BE/Ciqc1F9YkgKAMPJ6ABSBvBPOVvk790.png"}),c,l(t,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/4C/CB/Ciqc1F9YoK6AM2frAAAtDcKchOk422.png"}),h,l(t,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/4C/CB/Ciqc1F9YoLWAYNkqAABb6DZsrMk959.png"}),C,l(t,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/4C/D6/CgqCHl9YoL2AYCJbAABc5X0-CI4938.png"}),P,l(t,{alt:"4.png",src:"https://s0.lgstatic.com/i/image/M00/4C/CB/Ciqc1F9YoMSAa9_WAADEZsnCSoU226.png"}),g,l(t,{alt:"5.png",src:"https://s0.lgstatic.com/i/image/M00/4C/D6/CgqCHl9YoMqAB2JiAAA2igzBi94334.png"}),d,u,U,l(t,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/4E/A2/CgqCHl9e5VaANB2BAAEVncqxxwI213.png"}),m])}const V=i(n,[["render",b]]);export{B as __pageData,V as default};
