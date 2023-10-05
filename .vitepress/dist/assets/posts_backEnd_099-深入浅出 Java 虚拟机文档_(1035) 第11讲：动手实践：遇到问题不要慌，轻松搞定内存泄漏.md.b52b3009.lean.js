import{_ as l,j as t,o as e,g as o,k as p,h as c,Q as n,s}from"./chunks/framework.4e7d56ce.js";const J=JSON.parse('{"title":"2.1. 瞬时态和历史态 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1035) 第11讲：动手实践：遇到问题不要慌，轻松搞定内存泄漏.md","filePath":"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1035) 第11讲：动手实践：遇到问题不要慌，轻松搞定内存泄漏.md","lastUpdated":1696417798000}'),i={name:"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1035) 第11讲：动手实践：遇到问题不要慌，轻松搞定内存泄漏.md"},r=n("",13),d=n("",16),g=n("",16),E=n("",87),h=s("br",null,null,-1),u=s("p",null,"histo 能够大概的看到系统中每一种类型占用的空间大小，用于初步判断问题。比如某个对象 instances 数量很小，但占用的空间很大，这就说明存在大对象。但它也只能看大概的问题，要找到具体原因，还是要 dump 出当前 live 的对象。",-1),y=s("br",null,null,-1),m=n("",26),b=n("",20),_=s("br",null,null,-1),v=s("p",null,"本课时介绍了很多 Linux 命令，用于定位分析问题，所有的命令都是可以实际操作的，能够让你详细地把握整个 JVM 乃至操作系统的运行状况。其中，jinfo、jstat、jstack、jhsdb（jmap）等是经常被使用的一些工具，尤其是 jmap，在分析处理内存泄漏问题的时候，是必须的。",-1),D=s("br",null,null,-1),I=s("p",null,"同时还介绍了保留现场的工具和辅助分析的方法论，遇到问题不要慌，记得隔离保存现场。",-1),k=s("br",null,null,-1),P=s("p",null,"接下来我们看了一个实际的例子，由于 SWAP 的启用造成的服务卡顿。SWAP 会引起很多问题，在高并发服务中一般是关掉它。从这个例子中也可以看到，影响 GC，甚至是整个 JVM 行为的因素，可能不仅限于 JVM 内部，故障排查也是一个综合性的技能。",-1),$=s("br",null,null,-1),C=s("p",null,"最后，我们详细看了下内存泄漏的概念和几个实际的例子，从例子中能明显的看到内存泄漏的结果，但是反向去找这些问题代码就不是那么容易了。在后面的课时内容中，我们将使用 MAT 工具具体分析这个捉虫的过程。",-1);function M(j,U,A,R,S,f){const a=t("Image");return e(),o("div",null,[r,p(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/66/80/CgpOIF5GcZ-AcGzzAAAmNdRr-Xo623.jpg"}),d,p(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/66/80/Cgq2xl5GcZ-AYE1iAAD_AB7LDNA381.jpg"}),g,p(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/66/80/CgpOIF5GcZ-AM6HBAACH1_ojfyo889.jpg"}),E,p(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/66/80/Cgq2xl5GcZ-ALFLkAADxjrTYlzI318.jpg"}),h,u,y,p(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/66/80/CgpOIF5GcZ-AKpQpAADVkT6rMe0124.jpg"}),c(),m,p(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/66/80/Cgq2xl5GcZ-AP5pOAAAhN4DWbUQ769.jpg"}),b,p(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/66/80/CgpOIF5GcaCALSkfAADsZkcsT_o231.jpg"}),_,v,D,I,k,P,$,C])}const K=l(i,[["render",M]]);export{J as __pageData,K as default};
