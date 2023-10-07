import{_ as p,j as o,o as r,g as s,k as l,h as t,Q as e,s as i}from"./chunks/framework.4e7d56ce.js";const j=JSON.parse('{"title":"第06讲：常用工具集","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/036_32个Java面试必考点/(8) 第06讲：常用工具集.md","filePath":"posts/backEnd/036_32个Java面试必考点/(8) 第06讲：常用工具集.md","lastUpdated":1696417798000}'),n={name:"posts/backEnd/036_32个Java面试必考点/(8) 第06讲：常用工具集.md"},c=e("",6),u=e("",24),h=i("p",null,"JVM 浏览器可以列出正在运行的 Java 程序的 JVM，每个 JVM 实例叫作一个 JVM 连接。JVM 浏览器使用 JDP 也就是 Java 发现协议，可以连接到本地和远程运行的 JVM。",-1),_=i("p",null,"JMX 是 Java 管理扩展规范，能够管理并监控 JVM。JMX 通过对 Mbean 的管理，可以实时收集 JVM 信息，比如类实例信息、堆使用情况、CPU 负载、线程信息等，以及其他可以通过 MBeans 管理的一些运行时属性。",-1),d=i("p",null,"JFR 提供了深入到 JVM 内部去看运行时状态的能力，是一个非常强大的性能 Profile 工具，适合对程序进行调优和问题排查。JFR对JVM运行时产生的事件进行采集，可以通过指定采集的事件类型和频率来收集非常全面的数据信息。这里我主要介绍一下使用JFR可以分析到哪些信息。",-1),J=i("p",null,"如下图所示，JFR 可以采集、分析五大类信息。",-1),m=e("",16),M=e("",9),b=e("",7),T=e("",4),C=i("ul",null,[i("li",null,[i("p",null,"vmstat 可以获得有关进程、内存页面交换、虚拟内存、线程上下文切换、等待队列等信息。能够反映系统的负载情况。一般用来查看进程等待数量、内存换页情况、系统上下文切换是否频繁等。")]),i("li",null,[i("p",null,"iostat 工具可以对系统的磁盘操作活动进行监视，同时也可以显示 CPU 使用情况，一般用来排查与文件读写有关的问题，例如排查文件写入耗时较高时，可以查看 await 和 util 是否过高。iotop 是查看磁盘 I/O 使用状况的 top 类工具，想知道到底哪个进程产生了大量的 IO 时可以使用 iotop。")]),i("li",null,[i("p",null,"ifstat 是简洁的实时网络流量监控工具，可以查看系统的网络出口、入口使用情况。iftop 可以用来监控网卡的实时流量、反向解析 IP、显示端口信息等，通过iftop很容易找到哪个ip在霸占网络流量。")]),i("li",null,[i("p",null,"netstat 是一个监控系统网络状态的工具，它可以查看网络连接状态，监听了哪些接口、链接相关的进程等信息，能够显示与 IP、TCP、UDP 和 ICMP 协议相关的统计数据，是非常常用的网络工具。")]),i("li",null,[i("p",null,"dstat 是一个全能实时系统信息统计工具，能够统计 CPU 占用，内存占用，网络状况，系统负载，进程信息，磁盘信息等等，可以用来替换 vmstat、iostat、netstat 和i fstat 这些工具。")])],-1),g=i("br",null,null,-1),A=i("p",null,"再来看如下图的几个工具。",-1),V=e("",15),G=i("p",null,"这些题目我前面基本都介绍过，就不再重复解答。推荐课后学习一下 JMC、BTrace、tcpdump、strace 等工具的使用。",-1),P=i("p",null,"下一课时将会讲解 Spring、Netty 等常用的框架。",-1),f=i("br",null,null,-1);function v(q,S,B,k,I,x){const a=o("Image");return r(),s("div",null,[c,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/C4/CgoB5l14pDeAE51aAADMD3J2ji4281.png"}),t(),u,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/C4/CgoB5l14pDeAXdJ_AADMD3J2ji4374.png"}),t(),h,_,d,J,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/E4/CgotOV14pDeAGcYtAAB8QQ6tQ3g985.png"}),t(),m,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/C4/CgoB5l14pDeAN_KQAABeQ2CYl-4234.png"}),t(),M,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/E4/CgotOV14pDeAUKguAABSpEIuccM831.png"}),t(),b,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/C4/CgoB5l14pDiAbg7MAABY8TQQib0500.png"}),t(),T,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/C4/CgoB5l14pDiAd1ZiAABN95vAR28226.png"}),t(),C,g,A,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/E4/CgotOV14pDiAdN70AABBa8fvLco841.png"}),t(),V,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/E4/CgotOV14pDmAFS2GAABJC_urwXY837.png"}),t(),G,P,f])}const R=p(n,[["render",v]]);export{j as __pageData,R as default};
