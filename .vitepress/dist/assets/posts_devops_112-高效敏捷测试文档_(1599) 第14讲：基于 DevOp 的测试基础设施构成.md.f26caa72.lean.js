import{_ as p,j as a,o as l,g as n,k as s,s as t,Q as o,h as i}from"./chunks/framework.e0c66c3f.js";const W=JSON.parse('{"title":"DevOps 的测试 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(1599) 第14讲：基于 DevOp 的测试基础设施构成.md","filePath":"posts/devops/112-高效敏捷测试文档/(1599) 第14讲：基于 DevOp 的测试基础设施构成.md","lastUpdated":1696338709000}'),r={name:"posts/devops/112-高效敏捷测试文档/(1599) 第14讲：基于 DevOp 的测试基础设施构成.md"},_=t("p",null,'2009 年 6月，在美国 San Jose 第二届 Velocity 大会上 "10+ Deploys Per Day: Dev and Ops Cooperation at Flickr"的这个演讲，成为 DevOps 开始被引用的标志性事件。',-1),c=t("br",null,null,-1),u=t("p",null,"最初，DevOps 被定义为一组用于促进开发、运维和 QA 部门之间沟通、协作与整合的解决方案，它强调自动化软件交付和基础设施变更的过程，以帮助组织快速、频繁和可靠地发布软件，并提高软件的操作性能和质量保证。",-1),g=t("br",null,null,-1),d=o("",18),h=o("",24),D=t("h3",{id:"基础设施即代码",tabindex:"-1"},[t("strong",null,"基础设施即代码"),i(),t("a",{class:"header-anchor",href:"#基础设施即代码","aria-label":'Permalink to "**基础设施即代码**"'},"​")],-1),b=t("p",null,'在今天的测试基础环境中，一些硬件也已被"云资源"的概念所代替，以物理基础架构实现"云化"（如同我们常说的"软件定义硬件"）。按 AWS（Amazon Web Services，亚马逊云计算、云平台服务）术语来说，它们可以是 EC2 实例、ELB（负载均衡器）、Lambda 函数和 S3 存储桶等资源。',-1),v=t("br",null,null,-1),q=t("p",null,'使用工具来进行手工操作必然会成为快速部署和运维配置等步骤的瓶颈，所以"基础设施即代码（Infrastructure as a Code，IaC）"这个概念被提出来了，将基础设施以配置文件的方式纳入版本管理，以达到更灵活和更快捷的操作，这种通过类似代码的方式来自动地完成所有运维操作，也可以理解成一切皆为 API，如图 3 所示。',-1),C=t("br",null,null,-1),A=o("",14),I=t("br",null,null,-1),O=t("p",null,"这里 TestInfra 连接 ssh 服务器，还可以增加配置和身份识别，例如：",-1),T=t("br",null,null,-1),m=t("br",null,null,-1),S=t("p",null,"如果未通过 --ssh-identity-file 标志提供 ssh 身份文件，那么 testinfra 将尝试使用 ansible_ssh_private_key_file 和 ansible_private_key_file，并使用具有 ansible_ssh_pass 变量的 ansible_user 来确保安全的连接。Testinfra 还为 Ansible 提供了可用于测试的 API，这使得我们能够在测试中运行 Ansible 动作，并且能够轻松检查动作的状态，比如可以报告 Ansible 远程主机上执行动作时所发生的变化。",-1),f=t("br",null,null,-1),k=o("",7),E=t("br",null,null,-1),P=t("p",null,"同时，TestInfra 也支持和单元测试框架（如 unittest）集成：",-1),x=t("br",null,null,-1),M=o("",4);function y(V,N,F,B,R,Q){const e=a("Image");return l(),n("div",null,[_,c,u,g,s(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/76/E2/CgpOIF5xgtaAD9FmAAL8M7N_k9g676.png"}),d,s(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/76/E2/CgpOIF5xgvKABaOpAAIXcFpSMxQ489.png"}),h,s(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/76/E3/CgpOIF5xgwGAcIHPAAJItLUUPNY122.png"}),D,b,v,q,C,s(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/76/E3/CgpOIF5xgw6Aden0AAFbA64S5eM791.png"}),A,s(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/76/E3/CgpOIF5xgxuAOODZAAEh0Ej5WBM944.png"}),I,O,T,s(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/76/E3/Cgq2xl5xgyaAW-abAAC1ghSIuuY955.png"}),m,S,f,s(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/76/E3/Cgq2xl5xgzWAPwa8AADjsw4GsHQ745.png"}),k,s(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/76/E3/Cgq2xl5xg0KAPM1fAAIMeW7CIcE667.png"}),E,P,x,s(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/76/E3/CgpOIF5xg06AeDL9AAI_lDIwC2Q851.png"}),M])}const w=p(r,[["render",y]]);export{W as __pageData,w as default};
