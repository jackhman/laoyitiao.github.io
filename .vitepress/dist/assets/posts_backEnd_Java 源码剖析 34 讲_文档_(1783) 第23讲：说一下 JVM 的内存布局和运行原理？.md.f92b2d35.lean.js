import{_ as t,j as p,o as e,g as r,k as o,s as a,h as s,Q as l}from"./chunks/framework.4e7d56ce.js";const M=JSON.parse('{"title":"典型回答 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Java 源码剖析 34 讲_文档/(1783) 第23讲：说一下 JVM 的内存布局和运行原理？.md","filePath":"posts/backEnd/Java 源码剖析 34 讲_文档/(1783) 第23讲：说一下 JVM 的内存布局和运行原理？.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/Java 源码剖析 34 讲_文档/(1783) 第23讲：说一下 JVM 的内存布局和运行原理？.md"},i=a("p",null,[s('JVM（Java Virtual Machine，Java 虚拟机）顾名思义就是用来执行 Java 程序的"虚拟主机"，实际的工作是将编译的 class 代码（字节码）翻译成底层操作系统可以运行的机器码并且进行调用执行，这也是 Java 程序能够"'),a("strong",null,"一次编写，到处运行"),s('"的原因（因为它会根据特定的操作系统生成对应的操作指令）。JVM 的功能很强大，像 Java 对象的创建、使用和销毁，还有垃圾回收以及某些高级的性能优化，例如，热点代码检测等功能都是在 JVM 中进行的。因为 JVM 是 Java 程序能够运行的根本，因此掌握 JVM 也已经成了一个合格 Java 程序员必备的技能。')],-1),E=a("p",null,"我们本课时的面试题是，说一下 JVM 的内存布局和运行原理？",-1),h=a("h3",{id:"典型回答",tabindex:"-1"},[s("典型回答 "),a("a",{class:"header-anchor",href:"#典型回答","aria-label":'Permalink to "典型回答"'},"​")],-1),d=a("p",null,'JVM 的种类有很多，比如 HotSpot 虚拟机，它是 Sun/OracleJDK 和 OpenJDK 中的默认 JVM，也是目前使用范围最广的 JVM。我们常说的 JVM 其实泛指的是 HotSpot 虚拟机，还有曾经与 HotSpot 齐名为"三大商业 JVM"的 JRockit 和 IBM J9 虚拟机。但无论是什么类型的虚拟机都必须遵守 Oracle 官方发布的《Java虚拟机规范》，它是 Java 领域最权威最重要的著作之一，用于规范 JVM 的一些具体"行为"。',-1),u=a("p",null,"同样对于 JVM 的内存布局也一样，根据《Java虚拟机规范》的规定，JVM 的内存布局分为以下几个部分：",-1),y=l("",29),g=l("",19);function _(J,b,v,q,f,m){const n=p("Image");return e(),r("div",null,[i,E,h,d,u,o(n,{alt:"image (8).png",src:"https://s0.lgstatic.com/i/image/M00/12/FE/CgqCHl7ORYeAWLv7AABpB4-Dxgc707.png"}),y,o(n,{alt:"image (9).png",src:"https://s0.lgstatic.com/i/image/M00/12/FF/CgqCHl7ORbmAQusYAABWJmj1sg8743.png"}),g])}const S=t(c,[["render",_]]);export{M as __pageData,S as default};
