import{_ as o,j as e,o as c,h as t,k as l,f as a,Q as p,s}from"./chunks/framework.d3daa342.js";const $=JSON.parse('{"title":"12配置中心：基于Naco集中管理应用配置","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/SpringCloud Alibaba 实战_文档/(6757) 12  配置中心：基于 Naco 集中管理应用配置.md","filePath":"posts/backEnd/SpringCloud Alibaba 实战_文档/(6757) 12  配置中心：基于 Naco 集中管理应用配置.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/SpringCloud Alibaba 实战_文档/(6757) 12  配置中心：基于 Naco 集中管理应用配置.md"},E=p("",7),y=s("p",null,"配置文件分散在应用中",-1),i=s("p",null,"当我们的应用只有几个微服务时这些配置文件分散的存放在各个 Jar 中还没有问题。但是如果我们开发了大型互联网应用，涉及几十个研发团队、上百台服务器、上千个服务实例时，互联网的运维团队就要面对因为数量级增加带来的挑战了，总结下运维主要来自三个方面。",-1),d=s("p",null,"第一，纯粹的工作量增加。假设微服务 A 有 400 个实例，这些配置文件 application.yml 分散存储在每一个 Jar 中，此时因为机房环境变化，数据库服务器的 IP 变更，运维人员就不得不在 400 个实例中对每一个数据库连接 URL 进行调整，这个过程费时费力还容易出错。",-1),g=s("p",null,"第二，版本管理的需求。因为生产环境的状况远比开发、测试环境复杂，谁都无法保证新版本服务上线时新应用一定不会出问题。如果出现重大故障，生产环境下必须具备应用版本回滚的机制，保证生产可用的前提下再分析故障原因，而这个场景中如何对配置文件进行版本管理也是必须要考虑到的。",-1),u=s("p",null,"第三，多环境之间的切换。在成熟的软件研发流程中，是拥有多套不同环境的，例如：开发环境、测试环境、UAT 环境、仿真环境、生产环境。不同环境中各种组件的 IP、用户名、密码、配置项都会有差异，在不同环境下运行要求应用具备快速切换并加载对应的配置文件的能力，显然将配置写死在 Jar 中是无法满足这个要求的。",-1),A=s("p",null,[a('为了解决这些问题，在现有的微服务架构下，必须额外的引入"'),s("strong",null,"配置中心"),a('"这一组件，配置中心的职责就是集中管理微服务架构中每一个服务实例的配置数据。当微服务架构引入配置中心后，微服务应用只需持有应用启动的最小化配置，在应用启动时微服务应用所需的其他配置数据，诸如数据库连接字符串、各种用户名密码、IP 等信息均从配置中心远程下载，不再本地保存。同时，作为开发应用的程序员，在书写应用配置时也不再直接写入 application.yml 配置，而是直接在配置中心提供的 UI 进行设置。')],-1),F=s("p",null,"Nacos 配置管理界面",-1),D=s("p",null,"当引入配置中心后，微服务的架构会产生如下变化。",-1),h=s("p",null,"配置中心的作用",-1),v=s("p",null,"研发运维人员在配置中心提前定义各种环境的配置信息，之后在微服务实例启动时根据服务名、环境等从配置中心查询配置数据并下载到服务实例本地，最后服务实例加载这些来自配置中心的配置信息完成应用的启动。",-1),m=s("p",null,"说到这想必你对配置中心的作用已经了解，在 Spring Cloud Alibaba 这个架构下，Nacos 除了能作为注册中心，还提供了配置中心的功能。别看 Nacos 身兼多职，但每一项职责也并不平庸，Nacos 作为配置中心，除了基本的配置存储，还提供了版本管理、变更推送、监听查询以及友好的中文 UI 界面，无论是研发人员还是运维人员都可以快速上手实现应用配置。",-1),b=p("",8),C=s("p",null,"nacos_config 数据库初始化脚本",-1),f=p("",13),_=p("",18),B=s("p",null,"创建新的配置",-1),k=s("p",null,"在新建配置页面包含六个选项：Data ID、Group、描述、说明、配置格式与配置内容，我们分别了解下这些选项的作用。",-1),N=p("",3),q=s("p",null,"创建成功后的配置列表",-1),T=s("p",null,"与此同时，在 nacos_config 数据库的 config_info 表中也出现了对应配置数据。",-1),S=p("",18),I=p("",15),P=s("p",null,"配置项热加载",-1),R=s("p",null,"点击发布后，出现前后配置对比，左边是新版本，右边是上一个旧版本，之间的差异使用红绿线已经标出。",-1),x=p("",10),V=p("",10),w=p("",12);function j(M,U,L,G,W,H){const n=e("Image");return c(),t("div",null,[E,l(n,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M01/27/C3/Cgp9HWBdrryAZ2GIAAEY9T-3tXg916.png"}),a(),y,i,d,g,u,A,l(n,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M01/27/C3/Cgp9HWBdrt-AECU4AALLCkKqjI0819.png"}),a(),F,D,l(n,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image6/M01/27/BF/CioPOWBdruiAWadOAAHfHWwn5Iw102.png"}),a(),h,v,m,l(n,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image6/M00/27/C3/Cgp9HWBdrvKAeiRoAAIcx2ZKbEw740.png"}),a(),b,l(n,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image6/M00/27/C3/Cgp9HWBdrv2AA5H_AARyU70l55E524.png"}),a(),C,l(n,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image6/M00/27/C3/Cgp9HWBdrwmAVcMvAAKNPyOoJm0525.png"}),a(),f,l(n,{alt:"图片7.png",src:"https://s0.lgstatic.com/i/image6/M00/27/BF/CioPOWBdrxiAYgxtAAFxtDeMkO0218.png"}),a(),_,l(n,{alt:"图片8.png",src:"https://s0.lgstatic.com/i/image6/M01/27/C3/Cgp9HWBdryaAaSHVAAG77XLHUIE860.png"}),a(),B,k,l(n,{alt:"图片9.png",src:"https://s0.lgstatic.com/i/image6/M01/27/BF/CioPOWBdrzKADjrUAAGIVGG1n9c198.png"}),a(),N,l(n,{alt:"图片10.png",src:"https://s0.lgstatic.com/i/image6/M00/27/C0/CioPOWBdsACATwkVAAEkKdQM7PQ378.png"}),a(),q,T,l(n,{alt:"图片11.png",src:"https://s0.lgstatic.com/i/image6/M01/27/C3/Cgp9HWBdr0-Admy1AAEO6mTq8Cg029.png"}),a(),S,l(n,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M00/38/9A/CioPOWB5a2iABzg1AAH2_dzhJUQ076.png"}),a(),I,l(n,{alt:"图片13.png",src:"https://s0.lgstatic.com/i/image6/M01/27/C3/Cgp9HWBdr2mABMsDAAJuihhBAiM729.png"}),a(),P,R,l(n,{alt:"图片144.png",src:"https://s0.lgstatic.com/i/image6/M01/27/C3/Cgp9HWBdr3OAC88XAACV5Rg5GPw339.png"}),a(),x,l(n,{alt:"图片14.png",src:"https://s0.lgstatic.com/i/image6/M01/27/C0/CioPOWBdr3-ABZDYAAFs83h6ncM390.png"}),a(),V,l(n,{alt:"图片15.png",src:"https://s0.lgstatic.com/i/image6/M01/27/C3/Cgp9HWBdr5GAK11eAAI34s9KEFg284.png"}),a(),w])}const K=o(r,[["render",j]]);export{$ as __pageData,K as default};
