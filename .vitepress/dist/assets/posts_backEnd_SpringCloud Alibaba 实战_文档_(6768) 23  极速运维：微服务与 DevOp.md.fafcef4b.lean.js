import{_ as p,j as i,o as n,g as a,k as t,h as o,s as e,Q as s}from"./chunks/framework.e0c66c3f.js";const y=JSON.parse('{"title":"什么是 DevOps？ ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/SpringCloud Alibaba 实战_文档/(6768) 23  极速运维：微服务与 DevOp.md","filePath":"posts/backEnd/SpringCloud Alibaba 实战_文档/(6768) 23  极速运维：微服务与 DevOp.md","lastUpdated":1696338709000}'),c={name:"posts/backEnd/SpringCloud Alibaba 实战_文档/(6768) 23  极速运维：微服务与 DevOp.md"},r=e("p",null,"你好，今天咱们来了解什么是微服务与容器化技术。前面我们反复强调微服务架构是将大的应用打散为多个小服务，这就必然导致打散后形成更多需要独立部署的应用程序，在大型互联网应用中，这些程序可能会达到上千个之多。频繁的测试、打包、发布，无疑会给运维部门带来巨大的工作量与更多的不可控因素。因此在大型应用中急需一种成本更低、更高效、自动化的技术解决运维问题，而这一切随着 DevOps 与 Docker 容器化技术的逐渐落地已经成为现实。本讲咱们将围绕 DevOps 与容器化技术讲解三方面内容：",-1),_=e("ul",null,[e("li",null,[e("p",null,"介绍什么是 DevOps；")]),e("li",null,[e("p",null,"讲解容器化技术的与众不同；")]),e("li",null,[e("p",null,"分析 DevOps 架构执行流程。")])],-1),u=e("h3",{id:"什么是-devops",tabindex:"-1"},[o("什么是 DevOps？ "),e("a",{class:"header-anchor",href:"#什么是-devops","aria-label":'Permalink to "什么是 DevOps？"'},"​")],-1),d=e("p",null,'DevOps 是"软件开发人员（Dev）"和"IT 运维技术人员（Ops）"之间沟通合作的文化、运动或惯例。透过自动化"软件交付"和"架构变更"的流程，来使得构建、测试、发布软件能够更加地快捷、频繁和可靠。',-1),D=s("",10),h=e("p",null,"物理机部署阶段",-1),k=e("p",null,"物理机部署阶段顾名思义就是应用程序安装在物理服务器的操作系统中，应用程序直接通过操作系统获取物理服务器的 CPU、内存、硬盘等资源。物理机部署阶段是最原始、最简单的部署方式，但它的问题也非常严重，因为应用程序并不能充分利用服务器资源，就会造成 CPU 闲置、内存过剩等资源浪费情况，再加之物理服务器通常非常昂贵，因此物理机的部署成本也是最高的。随着服务器内存已经进入百 G 时代，目前直接在物理机部署应用的情况已经越来越少，取而代之是通过虚拟机部署应用。",-1),g=e("p",null,[e("strong",null,"虚拟机部署阶段")],-1),A=e("p",null,"虚拟机部署阶段",-1),m=e("p",null,"虚拟机部署阶段是物理机部署阶段的升级版，通过 VMWare 或者 VirtualBox 等虚拟化工具，可以将高性能物理服务器切割为若干虚拟机，这些虚拟机拥有自己独立的 CPU、内存、硬盘资源，并且这些资源彼此隔离不允许交叉访问。这样运维工程师就可以为不同类型的应用分配不同的资源，如计算密集型的应用就多分配一些 CPU 核数，存储密集型应用就多分配一些内存与硬盘空间，并且这些资源可以在不停机的情况下实现动态调整，让服务器资源得到最大化的利用。但是看似完美的方案其实也存在问题，虚拟机关注资源层面上的分配与管理，但对如何快速部署应用程序并没有给出更好的可行办法。因此IT业内就需要一种更为轻量级的，且关注点在应用本身的部署方案，这时以 Docker 为代表的容器化技术就应运而生。",-1),b=e("p",null,[e("strong",null,"容器化部署阶段")],-1),C=e("p",null,"容器化部署阶段",-1),O=e("p",null,"容器化部署阶段最大的特点是部署时将关注点放在应用本身，通过直接生成一个个容器实现应用的快速部署发布，同时容器化技术不再强调资源隔离，所有容器底层通过 Docker 容器引擎与操作系统获取全局共享的物理机资源。相比虚拟化技术有两点巨大优势：",-1),v=e("ul",null,[e("li",null,[e("p",null,"标准化的部署过程。因为容器化关注应用本身，因此创建容器的过程就是部署应用的过程。容器将是标准化的产物，可能容器内部的应用程序功能各不相同，但对运维人员来说创建容器的命令与操作过程都是基本相同的，可以通过脚本快速批量的完成容器的创建。")]),e("li",null,[e("p",null,"更好的性能。相比虚拟机，容器化并不强调资源隔离，物理机的所有资源对于容器都是共享的，容器与底层资源之间通过 Docker 容器引擎与操作系统进行调度，这中间产生的损耗相比虚拟机小得多。")])],-1),S=e("p",null,"以上就是到目前为止应用部署经历的三个阶段。其中容器化技术有一些重要概念，我们有必要了解。",-1),P=e("h3",{id:"容器化技术的重要概念",tabindex:"-1"},[o("容器化技术的重要概念 "),e("a",{class:"header-anchor",href:"#容器化技术的重要概念","aria-label":'Permalink to "容器化技术的重要概念"'},"​")],-1),f=e("p",null,"说到容器化技术，肯定避不开 Docker。Docker 是一个开源的应用容器引擎，基于 Go 语言开发。Docker 可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的 Linux 机器上，Docker 经过多年发展已经是容器化技术的标准。",-1),B=e("p",null,"Docker",-1),E=e("p",null,"在基于 Docker 实施 DevOps 微服务架构自动化运维的过程中，我们有几个重要的概念必须理解。",-1),T=e("ul",null,[e("li",null,[e("p",null,"镜像（Image）：所谓镜像其实非常像 Windows 操作系统的安装光盘。安装光盘内包含了 Windows 操作系统运行时所有的文件，你可以拿着这张光盘在任何新电脑上安装 Windows系统。而 Docker 的镜像就是我们自己应用程序的安装光盘，你可以使用镜像在任何安装了 Docker 的 Linux 系统上快速部署应用程序。")]),e("li",null,[e("p",null,"仓库（Repository）：仓库是存放镜像的地方，以前我们安装系统需要到电脑城购买光盘，现在安装系统只需要从各大软件网站下载 ISO 文件即可。Docker 也是一样的，为了方便我们部署，Docker 提供了 DockerHub 仓库站托管开发者的镜像文件，开发者可以利用 Pull 命令直接从仓库下载镜像到本地部署。")]),e("li",null,[e("p",null,"Dockerfile：Docker 镜像脚本。通过 Dockerfile 中描述的构建过程，Docker 可创建用户自定义的镜像文件，这些自定义镜像可被存放在仓库（Repository）供其他人员下载部署。")]),e("li",null,[e("p",null,"容器（Container）：容器就是镜像的实例。镜像是只读的，就像你单有一张安装盘却没有电脑，这个安装盘是无用的。只有你通过安装盘将程序安装在电脑上，程序才能运行产生价值，而容器就是被 Docker 创建的一个个程序实例。")])],-1),q=e("p",null,"DockerHub",-1),x=e("ul",null,[e("li",null,"容器编排工具：容器编排工具的典型代表是 Google Kubernetes(K8S) 和 Docker Swarm，容器编排工具用于管理大规模集群中的容器实例。我们举例说明，通常一个容器只负责运行一个应用程序，但是像 Nginx+Tomcat+Redis+MySQL 这样的应用架构就需要多个容器间协同作业才能正常运行。假如公司采购了 200 台服务器，CTO 要求这些容器不但要求基于 Docker 独立运行与部署，还要在服务器网络间自动实现互联互通，甚至还要求随着外部用户的访问压力的变化自动进行容器的扩容与收缩。显然如此复杂的容器管理与调度，必须借助专用的工具来进行统筹，于是以 K8S 为代表的容器编排工具就派上用场了，K8S 允许运维人员通过可视化的方式对容器进行动态调整，同时对所有运行节点也提供了实时监控。以前多名运维工程师需要工作几个小时的任务，现在只需要一名运维工程师点几下鼠标就能实现，公司为此可以节省大量的人力与时间成本。")],-1),I=e("p",null,"K8S 监控仪表盘",-1),M=e("h3",{id:"devops执行流程",tabindex:"-1"},[o("DevOps执行流程 "),e("a",{class:"header-anchor",href:"#devops执行流程","aria-label":'Permalink to "DevOps执行流程"'},"​")],-1),G=e("p",null,"讲到这里，我们理解了基于容器化几个重要的概念。下面咱们来分析一下某知名大厂是如何实施 DevOps。",-1),H=s("",13);function W(K,R,J,L,N,V){const l=i("Image");return n(),a("div",null,[r,_,u,d,t(l,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M00/3A/C6/CioPOWCBEKKAclUIAAxfvlyhd50739.png"}),o(),D,t(l,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M00/3A/C6/CioPOWCBEK-AMAw-AAE8A2Tvg78017.png"}),o(),h,k,g,t(l,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image6/M01/3A/BE/Cgp9HWCBELmAX_rrAAInmSytIrE056.png"}),o(),A,m,b,t(l,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image6/M00/3A/C7/CioPOWCBEMaALrIDAAHVESxq9Q0800.png"}),o(),C,O,v,S,P,f,t(l,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image6/M00/3A/C7/CioPOWCBENqAPMLZAARlpi1Byss679.png"}),o(),B,E,T,t(l,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image6/M01/3A/BE/Cgp9HWCBEOeAJej2AAU81Ln5aok987.png"}),o(),q,x,t(l,{alt:"图片7.png",src:"https://s0.lgstatic.com/i/image6/M00/3A/C7/CioPOWCBEUSAdFWIAANkY-uHHNg768.png"}),o(),I,M,G,t(l,{alt:"图片8.png",src:"https://s0.lgstatic.com/i/image6/M01/3A/BE/Cgp9HWCBERCAZboKAAMeGgoT_3c748.png"}),o(),H])}const w=p(c,[["render",W]]);export{y as __pageData,w as default};
