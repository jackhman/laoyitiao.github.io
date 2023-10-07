import{_ as e,j as p,o,g as r,k as n,h as a,Q as t,s}from"./chunks/framework.4e7d56ce.js";const q=JSON.parse('{"title":"第14讲：HBae与Hadoop的整合应用实践","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/042_大数据运维实战/(3085) 第14讲：HBae 与 Hadoop 的整合应用实践.md","filePath":"posts/devops/042_大数据运维实战/(3085) 第14讲：HBae 与 Hadoop 的整合应用实践.md","lastUpdated":1696417798000}'),c={name:"posts/devops/042_大数据运维实战/(3085) 第14讲：HBae 与 Hadoop 的整合应用实践.md"},y=t("",31),i=t("",7),E=t("",5),d=s("p",null,"从此图中可以看出 yarn cluster 模式与 yarn client 模式的区别，要查看任务执行结果，点击 application_1591072251901_0006 链接，会得到如下图所示结果：",-1),g=s("h4",{id:"_5-yarn-client-模式与-yarn-cluster-模式流程解析",tabindex:"-1"},[a("5. yarn client 模式与 yarn cluster 模式流程解析 "),s("a",{class:"header-anchor",href:"#_5-yarn-client-模式与-yarn-cluster-模式流程解析","aria-label":'Permalink to "5. yarn client 模式与 yarn cluster 模式流程解析"'},"​")],-1),h=s("p",null,"从上面的测试中可以发现，yarn client 模式与 yarn cluster 模式是有一些细微区别的，实际上，它们在执行流程上还是有很多不同的。下面对它们的执行流程做简单分析。",-1),u=s("ul",null,[s("li",null,"yarn client 模式流程解析")],-1),D=s("p",null,"下图展示了 yarn client 模式的执行流程：",-1),f=t("",4),B=t("",7),A=s("p",null,"其中，图标为 x 这个符号表示不支持；图标为叹号表示未测试；绿色的对钩表示支持。从图中可以看出，HBase1.3 以后的版本支持 JDK7 和 JDK8，而 HBase2.1 以后的版本仅支持 JDK8，而 JDK9、10、11 目前还没有进行测试，所以这里我们选择 JDK8 版本。",-1),F=s("p",null,"下面再看一下 Hadoop 和 HBase 的对应关系，如下图所示：",-1),v=t("",49),m=t("",5),b=s("p",null,"创建的表默认会存储在 HDFS 的 /hbase 路径下，可以查看是否生成相关目录和文件。",-1),k=s("p",null,"上面我们配置了 HMaster 的 HA，要测试是否实现了 HA 功能，只需要停止目前处于 active 状态的 HMaster 服务，然后通过 HMaster 的 16010 端口页面观察是否自动实现了主、备切换。如下图所示：",-1),_=s("p",null,"从图中可以看出，yarnserver.cloud 节点自动变成了主 HMaster，而没有 Backup Masters 节点了。当重新启动 nnmaster.cloud 节点的 HMaster 服务，此节点将变成 Backup Masters 节点。",-1),H=s("h3",{id:"总结",tabindex:"-1"},[a("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),S=s("p",null,"本课时主要讲解了 Spark 与 Yarn 的整合，以及 HBase 与 Hadoop 集群的整合应用，作为 Hadoop 集群的外围组件，Spark、HBase 在企业的使用非常广泛。作为运维要熟练掌握这些外围组件和 Hadoop 的整合应用，并能够熟练处理整合过程中出现的各种问题。",-1);function x(C,M,R,P,j,T){const l=p("Image");return o(),r("div",null,[y,n(l,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/1E/05/CgqCHl7jGbWAT7miAAFO4men7ro476.png"}),a(),i,n(l,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/1E/05/CgqCHl7jGeKAXnM_AAB3883x8X0596.png"}),a(),E,n(l,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/1D/FA/Ciqc1F7jGeyARH34AAB3mPGS0uc270.png"}),a(),d,n(l,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/1D/FA/Ciqc1F7jGfOAbX23AACmBCRrkXI928.png"}),a(),g,h,u,D,n(l,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/1E/37/CgqCHl7jS8yAIiJMAAPhjp_QNho263.png"}),a(),f,n(l,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/1E/37/CgqCHl7jS9eAOG7XAAN1IuQJ5aM015.png"}),a(),B,n(l,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/1E/06/CgqCHl7jGguAbt2QAAAt8CLbu90367.png"}),a(),A,F,n(l,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/1D/FA/Ciqc1F7jGhKAYUZeAAB8kpIUqzM819.png"}),a(),v,n(l,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/1D/FA/Ciqc1F7jGimARMbTAAEmF_9ksnw081.png"}),a(),m,n(l,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/1E/06/CgqCHl7jGjGAEldpAABaTagrA4Q930.png"}),a(),b,k,n(l,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image/M00/1E/06/CgqCHl7jGjiANLxqAAEXwGiry1k445.png"}),a(),_,H,S])}const w=e(c,[["render",x]]);export{q as __pageData,w as default};
