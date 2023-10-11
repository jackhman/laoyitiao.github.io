import{_ as p,D as e,o as t,g as c,J as l,h as n,Q as o,m as s}from"./chunks/framework.f67d7268.js";const f=JSON.parse('{"title":"第34讲：Docker有什么优点？使用时需要注意什么问题？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Java 源码剖析 34 讲_文档/(1794) 第34讲：Docker 有什么优点？使用时需要注意什么问题？.md","filePath":"posts/backEnd/Java 源码剖析 34 讲_文档/(1794) 第34讲：Docker 有什么优点？使用时需要注意什么问题？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/Java 源码剖析 34 讲_文档/(1794) 第34讲：Docker 有什么优点？使用时需要注意什么问题？.md"},i=o("",7),E=s("p",null,"在 Docker 出现之前，我们如果要发布自己的 Java 程序，就需要在服务器上安装 JDK（或者 JRE）、Tomcat 容器，然后配置 Tomcat 参数，对 JVM 参数进行调优等操作。然而如果要在多台服务器上运行 Java 程序，则需要将同样繁杂的步骤在每台服务器都重复执行一遍，这样显然比较耗时且笨拙的。",-1),y=s("p",null,"后来有了虚拟机的技术，我们就可以将配置环境打包到一个虚拟机镜像中，然后在需要的服务器上装载这些虚拟机，从而实现了运行环境的复制，但虚拟机会占用很多的系统资源，比如内存资源和硬盘资源等，并且虚拟机的运行需要加载整个操作系统，这样就会浪费掉好几百兆的内存资源，最重要的是因为它需要加载整个操作系统所以它的运行速度就很慢，并且还包含了一些我们用不到的冗余功能。",-1),d=s("p",null,"因为虚拟机的这些缺点，所以在后来就有了 Linux 容器（Linux Containers，LXC），它是一种进程级别的 Linux 容器，用它可以模拟一个完整的操作系统。相比于虚拟机来说，Linux 容器所占用的系统资源更少，启动速度也更快，因为它本质上是一个进程而非真实的操作系统，因此它的启动速度就比较快。",-1),k=s("p",null,"而 Docker 则是对 Linux 容器的一种封装，并提供了更加方便地使用接口，所以 Docker 一经推出就迅速流行起来。Docker 和虚拟机（VM）区别如下图所示：",-1),u=o("",11),g=s("p",null,"接着我们选择并点击最多人下载的镜像，如下图所示：",-1),h=o("",28);function D(F,m,C,_,b,v){const a=e("Image");return t(),c("div",null,[i,l(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/2B/9F/CgqCHl7-xpKAFgHdAAEShADSk60188.png"}),n(),E,y,d,k,l(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/2B/9F/CgqCHl7-xqKAdySsAARl-ihH0Cc421.png"}),n(),u,l(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/2B/9F/CgqCHl7-xsCAC__xAATWzSiVbKU657.png"}),n(),g,l(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/2B/93/Ciqc1F7-xseAVVs3AANxQpDC9RM481.png"}),n(),h])}const P=p(r,[["render",D]]);export{f as __pageData,P as default};
