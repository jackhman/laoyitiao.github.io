import{_ as s,j as t,o,g as r,k as n,s as e,Q as p}from"./chunks/framework.e0c66c3f.js";const q=JSON.parse('{"title":"为什么叫 G1 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1031) 第07讲：大厂面试题：有了 G1 还需要其他垃圾回收器吗？.md","filePath":"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1031) 第07讲：大厂面试题：有了 G1 还需要其他垃圾回收器吗？.md","lastUpdated":1696338709000}'),i={name:"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1031) 第07讲：大厂面试题：有了 G1 还需要其他垃圾回收器吗？.md"},l=e("p",null,"本课时我们主要来看下这两个高频的面试考题：",-1),c=e("ul",null,[e("li",null,[e("p",null,"G1 的回收原理是什么？为什么 G1 比传统 GC 回收性能好？")]),e("li",null,[e("p",null,"为什么 G1 如此完美仍然会有 ZGC？")])],-1),_=e("p",null,"我们在上一课时，简要的介绍了 CMS 垃圾回收器，下面我们简单回忆一下它的一个极端场景（而且是经常发生的场景）。",-1),g=e("br",null,null,-1),m=e("p",null,"在发生 Minor GC 时，由于 Survivor 区已经放不下了，多出的对象只能提升（promotion）到老年代。但是此时老年代因为空间碎片的缘故，会发生 concurrent mode failure 的错误。这个时候，就需要降级为 Serail Old 垃圾回收器进行收集。这就是比 concurrent mode failure 更加严重的 promotion failed 问题。",-1),u=p("",20),d=p("",23),C=p("",11),G=p("",19),S=p("",15),h=p("",20),X=p("",16),b=p("",14);function T(R,M,E,A,P,x){const a=t("Image");return o(),r("div",null,[l,c,_,g,m,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/75/Cgq2xl4lSamAVeyxAAAuIzs1H0M233.jpg"}),u,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/74/CgpOIF4lSamARPiHAABC8ugXMK8124.jpg"}),d,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/75/Cgq2xl4lSamAcuN5AAA9uBTIpvw935.jpg"}),C,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/74/CgpOIF4lSamAXeymAABc7ztdEEU131.jpg"}),G,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/75/Cgq2xl4lSaqAP6OGAABH2k_Jpog641.jpg"}),S,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/74/CgpOIF4lSaqAPBcOAABEfIhFxnI679.jpg"}),h,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/75/Cgq2xl4lSaqAcPP3AAAel8LUC1s541.jpg"}),X,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/74/CgpOIF4lSaqAXfe5AAA_S1VhbdY081.jpg"}),b])}const v=s(i,[["render",T]]);export{q as __pageData,v as default};
