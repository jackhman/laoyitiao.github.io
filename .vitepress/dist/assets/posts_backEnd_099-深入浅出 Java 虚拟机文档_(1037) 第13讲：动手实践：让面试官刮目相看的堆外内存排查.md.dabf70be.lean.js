import{_ as l,j as e,o,g as t,k as a,Q as p,s}from"./chunks/framework.e0c66c3f.js";const A=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1037) 第13讲：动手实践：让面试官刮目相看的堆外内存排查.md","filePath":"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1037) 第13讲：动手实践：让面试官刮目相看的堆外内存排查.md","lastUpdated":1696338709000}'),c={name:"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1037) 第13讲：动手实践：让面试官刮目相看的堆外内存排查.md"},r=p("",25),i=p("",33),E=p("",25),y=p("",29),d=s("br",null,null,-1),m=s("p",null,"如图，一般第三方 JNI 程序，或者 JDK 内的模块，都会调用相应的本地函数，在 Linux 上，这些函数库的后缀都是 so。",-1),u=s("br",null,null,-1),g=s("p",null,'我们依次浏览用的可疑资源，发现了"libzip.so"，还发现了不少相关的调用。搜索 zip（输入 / 进入搜索模式），结果如下：',-1),h=s("br",null,null,-1),b=s("br",null,null,-1),_=s("p",null,"查看 JDK 代码，发现 bzip 大量使用了 native 方法。也就是说，有大量内存的申请和销毁，是在堆外发生的。",-1),v=s("br",null,null,-1),f=p("",11),B=p("",34);function S(w,x,M,k,K,C){const n=e("Image");return o(),t("div",null,[r,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/C0/CgpOIF5Pj3SAcUN4AAoiqH1w81U087.png"}),i,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/C0/Cgq2xl5Pj3WAFE7iAAHAqUmrvpI493.png"}),E,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/C0/CgpOIF5Pj3WARpCEAAL6h0zOFuE422.png"}),y,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/C0/Cgq2xl5Pj3aAKZfFAA-9bP5LmvM029.png"}),d,m,u,g,h,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/C0/CgpOIF5Pj3aAQju0AAHW7pHtD6w371.png"}),b,_,v,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/C1/Cgq2xl5Pj3aAc73qAAbsH6BJyJw405.png"}),f,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/C0/CgpOIF5Pj3aAf-BFABBp-0oVTMo956.png"}),B])}const T=l(c,[["render",S]]);export{A as __pageData,T as default};
