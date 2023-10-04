import{_ as l,j as n,o as a,g as i,k as t,h as o,Q as s,s as e}from"./chunks/framework.e0c66c3f.js";const G=JSON.parse('{"title":"Docker 容器的集群管理之 Kubernetes ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(1889) 第17讲：如何完成全自动的部署和 BVT？（下）.md","filePath":"posts/devops/112-高效敏捷测试文档/(1889) 第17讲：如何完成全自动的部署和 BVT？（下）.md","lastUpdated":1696338709000}'),p={name:"posts/devops/112-高效敏捷测试文档/(1889) 第17讲：如何完成全自动的部署和 BVT？（下）.md"},_=s("",9),u=e("p",null,"图1 Kubernetes 的架构",-1),c=e("br",null,null,-1),b=e("p",null,"在第 15 讲中，我曾经展示过 Kubernetes 的架构，我们不妨再仔细看看它的架构，如图 1 所示，包括一个主节点（Master）和若干个工作节点（Node）。主节点负责对 Kubernetes 集群的控制和管理；工作节点中运行实际的应用系统。Pod 是每个工作节点中可以调度的最小单元，一个 Pod 包含一组容器。Kubernetes 能够管理的集群规模非常强大，单集群就可部署 5000 个工作节点、15 万个 Pods、30 万个容器。",-1),d=e("br",null,null,-1),h=e("p",null,"Kubernetes 中的每个对象都对应声明式的 API，可以非常方便地通过执行配置文件进行资源的创建和管理。比如，你可以编写 Pod.yaml 文件来定义一个包含两个容器的 Pod，如图 2 所示。",-1),g=e("br",null,null,-1),m=e("p",null,"图2 Pod.yaml 文件示例",-1),A=e("br",null,null,-1),C=e("p",null,"安装 Kubernetes，可以借助两个工具：Vagrant 和 Ansible。先定义合适的 Vagrantfile（如图 3 所示）来安装虚拟机，包括下载镜像、初始化、配置等工作，并能保证 Kubernetes 的节点配置是一致的。",-1),T=e("br",null,null,-1),S=e("br",null,null,-1),k=e("p",null,"图 3 Vagrantfile 示例",-1),f=e("br",null,null,-1),q=e("p",null,"然后再分别创建 Ansible 的 playbook（如 master-playbook.yml 和 node-playbook.yml）自动安装 Kubernetes 主节点和工作节点。这个操作相对比较复杂，比如安装容器及 kubelet、kubeadm、kubectl 等组件，使用 kubeadm 初始化容器集群、配置 kube 文件，以及建立主节点和工作节点的网络连接。可参考 Ansible、Kubernetes 官方网站和网上其他资料来完成具体操作。",-1),P=e("br",null,null,-1),K=e("p",null,"我们还是回到主题，如何基于集群环境来完成部署，这里给出了一个完整的 Kubernetes 集群环境中软件产品从持续集成到发布的工作流程，如图 4 所示，供你参考，也能更好理解 Docker、Kubernetes 和 Terraform 等工具的各自位置，以及它们如何在部署流程中发挥的作用。",-1),v=e("br",null,null,-1),V=e("br",null,null,-1),D=s("",14),I=e("br",null,null,-1),B=e("p",null,"示例二：版本更新并验证",-1),x=e("br",null,null,-1),M=s("",12),N=s("",26);function J(y,E,L,F,O,R){const r=n("Image");return a(),i("div",null,[_,t(r,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7C/C0/Cgq2xl584-qAUUhKAAEQ-DmXea8445.jpg"}),o(),u,c,b,d,h,g,t(r,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7C/C0/Cgq2xl585CiAR_DzAACWERFaSRI699.png"}),m,A,C,T,S,t(r,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/AA/Ciqah1585GiAVr5pAAL0rXUsOHA176.png"}),k,f,q,P,K,v,V,t(r,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7C/C0/Cgq2xl585JKAWtG9AAH4Pw3QyYs174.png"}),D,t(r,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7C/C0/Cgq2xl585LyAOixTAAJSzlhuols176.png"}),I,B,x,t(r,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/AA/Ciqah1585NiATk3fAAJ69hFxrn4518.png"}),o(),M,t(r,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7C/C0/Cgq2xl585PiAGfXvAAD1u_5lgO4900.png"}),N])}const H=l(p,[["render",J]]);export{G as __pageData,H as default};
