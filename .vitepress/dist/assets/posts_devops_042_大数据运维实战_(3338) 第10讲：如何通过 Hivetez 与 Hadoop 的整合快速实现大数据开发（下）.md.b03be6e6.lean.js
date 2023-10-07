import{_ as o,j as e,o as t,g as c,k as n,h as s,Q as p,s as a}from"./chunks/framework.4e7d56ce.js";const z=JSON.parse('{"title":"第10讲：如何通过Hivetez与Hadoop的整合快速实现大数据开发（下）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/042_大数据运维实战/(3338) 第10讲：如何通过 Hivetez 与 Hadoop 的整合快速实现大数据开发（下）.md","filePath":"posts/devops/042_大数据运维实战/(3338) 第10讲：如何通过 Hivetez 与 Hadoop 的整合快速实现大数据开发（下）.md","lastUpdated":1696417798000}'),r={name:"posts/devops/042_大数据运维实战/(3338) 第10讲：如何通过 Hivetez 与 Hadoop 的整合快速实现大数据开发（下）.md"},E=p("",48),y=p("",8),i=p("",17),d=a("p",null,"可以看到，很快就得到了查询结果，因为这个查询是走了 MapReduce，还可以在 Yarn 的 8088 端口查看执行状态，如下图所示：",-1),F=p("",28),g=a("p",null,'上图就是 Tez 的执行过程，可以看到执行这个查询花费了 16.533 秒，而目前的计算引擎是 Tez。可以通过"set hive.execution.engine=mr;"切换计算引擎为 MR，然后再次执行 select 查询，结果如下图所示：',-1),h=a("p",null,"可以看到，通过 MR 引擎执行这个查询花费了 31.201 秒，比 Tez 慢了近一倍，这就是 Tez 的优势。",-1),v=a("p",null,"要查看任务的详细运行状态信息，可查看 yarnserver 的 8088 端口，如下图所示：",-1),u=a("p",null,"从上图可以看出，任务 application_1588733821232_0066 使用的是 Tez 引擎，还有此任务使用的队列、CPU、内存等资源信息。",-1),A=a("h3",{id:"总结",tabindex:"-1"},[s("总结 "),a("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),D=a("p",null,"本课时注意讲解了 Hive 与 Hadoop 的整合，以及如何将 Tez、Beeline 整合到 Hive 中。重点是 Hive 与其他组件的整合实现快速开发，作为大数据运维工程师，Hive 的部署与整合是必须要掌握的内容。",-1);function B(C,f,b,m,T,_){const l=e("Image");return t(),c("div",null,[E,n(l,{alt:"image5.png",src:"https://s0.lgstatic.com/i/image/M00/11/0C/CgqCHl7LeAKAGTb5AAB9C6xYdZo772.png"}),s(),y,n(l,{alt:"image6.png",src:"https://s0.lgstatic.com/i/image/M00/11/0C/CgqCHl7LeAyAZTRKAAC0F_JZuec980.png"}),s(),i,n(l,{alt:"image7.png",src:"https://s0.lgstatic.com/i/image/M00/11/0C/CgqCHl7LeBqAOYSAAACgSQOElrw186.png"}),s(),d,n(l,{alt:"image8.png",src:"https://s0.lgstatic.com/i/image/M00/11/00/Ciqc1F7LeCGASLemAADLdE61WUY603.png"}),s(),F,n(l,{alt:"image9.png",src:"https://s0.lgstatic.com/i/image/M00/11/0C/CgqCHl7LeDCAUtXVAAB8Htt1_zk875.png"}),s(),g,n(l,{alt:"image10.png",src:"https://s0.lgstatic.com/i/image/M00/11/0C/CgqCHl7LeDeAWFY9AACNsnwuL-k209.png"}),s(),h,v,n(l,{alt:"image11.png",src:"https://s0.lgstatic.com/i/image/M00/11/00/Ciqc1F7LeD-AGsWMAACnwuw3FuQ838.png"}),s(),u,A,D])}const k=o(r,[["render",B]]);export{z as __pageData,k as default};
