import{_ as p,j as o,o as t,g as r,k as l,h as n,Q as e,s}from"./chunks/framework.4e7d56ce.js";const B=JSON.parse('{"title":"21如何使Docker和Kubernete结合发挥容器的最大价值？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/045_由浅入深吃透 Docker/(4592) 21  如何使 Docker 和 Kubernete 结合发挥容器的最大价值？.md","filePath":"posts/backEnd/045_由浅入深吃透 Docker/(4592) 21  如何使 Docker 和 Kubernete 结合发挥容器的最大价值？.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/045_由浅入深吃透 Docker/(4592) 21  如何使 Docker 和 Kubernete 结合发挥容器的最大价值？.md"},E=e("",14),y=e("",56),i=e("",23),u=s("p",null,"可以看到 minikube 将我们的服务暴露在了 32391 端口上，我们通过 http://{YOUR-IP}:32391 可以访问到我们启动的服务，如下图所示。",-1),d=s("p",null,"图 2 服务请求结果",-1),b=s("p",null,"总结下，我们首先使用 Deployment 创建了三个 nginx-hello 的实例，然后使用 Service 的方式随机负载到后端的三个实例，并将服务通过 NodePort 的方式暴露在主机上，使得我们可以直接使用主机的端口访问到容器中的服务。",-1),h=s("h3",{id:"结语",tabindex:"-1"},[n("结语 "),s("a",{class:"header-anchor",href:"#结语","aria-label":'Permalink to "结语"'},"​")],-1),k=s("p",null,"Kubernetes 从诞生到现在已经经历了 6 个年头，起初由于它的超前理念被世人误认为设计过度复杂，使得 Kubernetes 的入门门槛非常高。然而 6 年后的今天， Kubernetes 已经拥有了非常完善的社区和工具集，它可以帮助我们一键搭建 Kubernetes 集群，并且围绕 Kubernetes 构建的各种应用也是越来越丰富。",-1),D=s("p",null,"Kubernetes 的目标一直很明确，那就是对标 Borg，可以支撑数亿容器的运行。目前来看，要达到这个目标，Kubernetes 还有很长的路要走，但是当我们谈及云原生，谈及容器云时都必然会提到 Kubernetes，显然它已经成为容器编排的标准和标杆，目前大多数公有云也有支持 Kubernetes。容器的未来一定是美好的，而使用 Kubernetes 来调度容器则更是未来云计算的一个重要风向标。",-1),F=s("p",null,"那么，你的朋友中有没有人从事过 Kubernetes 或 Docker 相关的项目研发，现在这些项目发展得怎么样了呢？欢迎留言和我一起讨论容器圈创业那点事。",-1),m=s("p",null,"下一课时，我将为你带来 Docker 的综合实战案例，Docker 下如何实现镜像多阶级构建？",-1);function A(g,_,v,K,C,P){const a=o("Image");return t(),r("div",null,[E,l(a,{alt:"image (1).png",src:"https://s0.lgstatic.com/i/image/M00/68/D6/Ciqc1F-k_FqAdHbtAAFVTi8cyOE246.png"}),n(),y,l(a,{alt:"111.png",src:"https://s0.lgstatic.com/i/image/M00/68/FE/CgqCHl-lL_WABqFRAAE7sPUop9w125.png"}),n(),i,l(a,{alt:"Lark20201106-154358.png",src:"https://s0.lgstatic.com/i/image/M00/68/D8/Ciqc1F-k_seAeN4RAACePALnr0Q662.png"}),n(),u,l(a,{alt:"image (2).png",src:"https://s0.lgstatic.com/i/image/M00/68/D6/Ciqc1F-k_J-AWWQyAABkHB5NA0A837.png"}),n(),d,b,h,k,D,F,m])}const S=p(c,[["render",A]]);export{B as __pageData,S as default};
