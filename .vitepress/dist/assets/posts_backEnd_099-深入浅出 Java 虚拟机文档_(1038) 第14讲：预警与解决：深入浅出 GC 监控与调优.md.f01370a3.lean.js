import{_ as t,j as p,o,h as r,k as l,f as a,Q as e,s}from"./chunks/framework.d3daa342.js";const H=JSON.parse('{"title":"第14讲：预警与解决：深入浅出GC监控与调优","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1038) 第14讲：预警与解决：深入浅出 GC 监控与调优.md","filePath":"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1038) 第14讲：预警与解决：深入浅出 GC 监控与调优.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1038) 第14讲：预警与解决：深入浅出 GC 监控与调优.md"},i=e("",25),d=s("br",null,null,-1),g=s("p",null,"下图是切换到 MBean 选项卡之后的截图，可以看到图中展示的 Metaspace 详细信息。",-1),m=s("br",null,null,-1),E=s("br",null,null,-1),u=s("p",null,[a("jmc 还是一个性能分析平台，可以录制、收集正在运行的 Java 程序的诊断数据和概要分析数据，感兴趣的可以自行探索。但还是那句话，线上环境可能没有条件让我们使用一些图形化分析工具，相对比 "),s("strong",null,"Arthas"),a("这样的命令行工具就比较吃香。")],-1),y=s("br",null,null,-1),h=s("p",null,"比如，下图就是一个典型的互联网架构图，真正的服务器可能是一群 docker 实例，如果自己的机器想要访问 JVM 的宿主机器，则需要配置一些复杂的安全策略和权限开通。图像化的工具在平常的工作中**不是非常有用，**而且，由于性能损耗和安全性的考虑，也不会让研发主动去通过 JMX 连接这些机器。",-1),_=s("br",null,null,-1),b=s("p",null,"所以面试的时候如果你一直在提一些图形化工具，面试官只能无奈的笑笑，这个话题也无法进行下去了。",-1),f=s("br",null,null,-1),v=e("",7),k=e("",10),C=s("br",null,null,-1),x=s("p",null,"Jokokia 可以通过 jar 包和 agent 的方式启动，在一些框架中，比如 Spring Boot 中，很容易进行集成。",-1),A=s("br",null,null,-1),M=s("p",null,[a("访问 "),s("a",{href:"http://start.spring.io",target:"_blank",rel:"noreferrer"},[s("strong",null,"http://start.spring.io")]),a("，生成一个普通的 Spring Boot 项目。")],-1),j=s("br",null,null,-1),T=e("",13),X=e("",6),P=e("",35),q=s("br",null,null,-1),D=s("p",null,"在导入之前，还需要创建一个数据源，选择 influxdb，填入 db 的地址即可。",-1),B=s("br",null,null,-1),J=e("",35);function I(S,V,G,O,F,U){const n=p("Image");return o(),r("div",null,[i,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6A/E1/CgpOIF5WOcmANUJIAAHH0v-SqIg611.jpg"}),a(),d,g,m,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6A/E1/Cgq2xl5WOcmAWhmjAAF-W24OEt8285.jpg"}),a(),E,u,y,h,_,b,f,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6A/E1/CgpOIF5WOcmAE7A8AAB-w3pvGdE946.jpg"}),a(),v,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6A/E1/Cgq2xl5WOcmAF9JCAAAsbftRAtQ610.jpg"}),a(),k,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6A/E1/CgpOIF5WOcqAAC5eAABHCB0CHX4011.jpg"}),a(),C,x,A,M,j,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6A/E1/Cgq2xl5WOcqAR8R3AABiB-i16nc579.jpg"}),a(),T,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6A/E1/CgpOIF5WOcqALmlRAAB7q-dV9p4253.jpg"}),a(),X,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6A/E1/Cgq2xl5WOcqAILdGAAAwT9weUCE428.jpg"}),a(),P,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6A/E1/CgpOIF5WOcqAcWX7AAbu9u8lzaU635.png"}),a(),q,D,B,l(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6A/E1/Cgq2xl5WOcuAGVb5AABRBG7h0-4332.jpg"}),a(),J])}const N=t(c,[["render",I]]);export{H as __pageData,N as default};
