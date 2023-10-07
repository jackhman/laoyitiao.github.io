import{_ as e,j as i,o as r,g as _,k as o,h as t,Q as n,s as l}from"./chunks/framework.4e7d56ce.js";const cl=JSON.parse('{"title":"第17讲：如何完成全自动的部署和BVT？（上）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(1602) 第17讲：如何完成全自动的部署和 BVT？（上）.md","filePath":"posts/devops/112-高效敏捷测试文档/(1602) 第17讲：如何完成全自动的部署和 BVT？（上）.md","lastUpdated":1696417798000}'),a={name:"posts/devops/112-高效敏捷测试文档/(1602) 第17讲：如何完成全自动的部署和 BVT？（上）.md"},c=n("",16),p=l("br",null,null,-1),u=l("p",null,"创建 docker 镜像，并启动容器实例的命令示例如下：",-1),h=l("br",null,null,-1),d=l("br",null,null,-1),g=l("ul",null,[l("li",null,[l("p",null,"在第一条命令中，Dockerfile 位于 /tmp/dockerfiles 目录下，逐条执行 Dockerfile 中的指令创建了一个名称和版本号为 my-image:1.0.0 的镜像文件；")]),l("li",null,[l("p",null,"第二条命令是用生成的镜像启动一个容器，容器命名为 my-image。")])],-1),b=l("h3",{id:"ci-配置管理工具",tabindex:"-1"},[l("strong",null,"CI 配置管理工具"),t(),l("a",{class:"header-anchor",href:"#ci-配置管理工具","aria-label":'Permalink to "**CI 配置管理工具**"'},"​")],-1),A=l("p",null,"在 CI 环境里，有时需要用到一些配置管理工具来完成系统部署，比如数据库、Web 服务器等。在第 15 讲中，我在介绍 Molecule 时简单介绍过 Ansible，它是一个基于 Python 开发的自动化运维工具，提供远程系统安装、启动 / 停止、配置管理等服务，并且可以对服务器集群进行批量系统配置、批量部署和批量运行命令。Ansible 使用 SSH 协议与目标机器进行通信。Ansible 还可以实现对 Docker 集群的自动化管理工作，比如安装、部署、管理 Docker 容器和 Docker 镜像。",-1),T=l("br",null,null,-1),k=l("p",null,"图1 Ansible 架构示意图",-1),C=l("br",null,null,-1),m=l("p",null,"Ansible 项目的目录结构如图 2 所示：",-1),B=l("br",null,null,-1),V=l("p",null,"图2 Ansible 目录结构图",-1),q=l("br",null,null,-1),D=l("p",null,"Ansible执行的脚本文件 playbook.yaml 做为入口文件，指定在哪些服务器集群为哪些 role 执行配置任务，示例如下：",-1),I=l("br",null,null,-1),S=l("br",null,null,-1),f=l("p",null,"Inventories 目录下的 hosts 文件存放所有目标服务器的地址。你可以为需要管理的应用创建一个对应的 role，比如 Nginx、Redis 等，把配置信息、需要执行的 shell 脚本存放在每个 role 的目录下。",-1),P=l("br",null,null,-1),x=l("p",null,[t("Chef Solo 是另一个配置管理工具 Chef 提供的一个工具，它的特点是"),l("strong",null,"去中心化"),t("，不需要 Chef Server 就可以本地运行各种 Chef 方案，从而自动执行软件包安装、语言或框架编程和软件配置等多种任务。由于篇幅有限，这里就不展开讨论了。")],-1),y=l("h3",{id:"微服务在-ci-环境中的自动化部署",tabindex:"-1"},[l("strong",null,"微服务在 CI 环境中的自动化部署"),t(),l("a",{class:"header-anchor",href:"#微服务在-ci-环境中的自动化部署","aria-label":'Permalink to "**微服务在 CI 环境中的自动化部署**"'},"​")],-1),E=l("p",null,"有了 Docker 和自动化配置管理工具，接下来就可以在 CI 环境中轻松的完成微服务的自动化部署。目前主流的实践基本都是通过 SSH 协议和远程目标服务器建立连接，然后在目标服务器上执行 shell 命令进行部署，比如 Jenkins、Ansible、GitLab CI 等。",-1),M=l("br",null,null,-1),H=l("p",null,"图3 Jenkins + Docker 实现持续集成",-1),F=l("br",null,null,-1),v=l("p",null,"以 Jenkins 为例，一个微服务的构建部署过程如下。",-1),J=l("br",null,null,-1),N=l("p",null,"开发 push 代码到代码仓库，触发 Jenkins 拉取代码，通过构建服务器编译、测试、打包，然后执行 shell 脚本使 docker 构建镜像并 push 到镜像仓库。此操作完成后 Jenkins 服务器再执行 SSH 命令登录到部署服务器，执行 shell 脚本使 docker 从镜像仓库拉取镜像，启动容器。",-1),G=l("br",null,null,-1),R=l("p",null,"Jenkins 运行机器上的 Shell 命令如下：",-1),O=l("br",null,null,-1),K=l("br",null,null,-1),L=l("p",null,"目标服务器上的 Shell 命令如下：",-1),W=l("br",null,null,-1),U=l("br",null,null,-1),Y=l("p",null,"以 Jenkins Pipeline + Ansible 为例，Jenkins 内需要安装 Ansible 插件。微服务 Docker 镜像生成后，由 Ansible 上传至目标服务器，执行容器管理对应的 role 所定义的任务进行部署。",-1),j=l("br",null,null,-1),z=l("p",null,"Jenkins 流水线脚本 jenkinsfile 如下所示：",-1),$=l("br",null,null,-1),Q=l("br",null,null,-1),X=l("p",null,"GitLab CI 是 GitLab 自带的持续集成服务，用 GitLab CI 也可以实现微服务的自动化部署，如图 4 所示。",-1),w=l("br",null,null,-1),Z=n("",11),ll=n("",9),tl=n("",16);function sl(ol,nl,el,il,rl,_l){const s=i("Image");return r(),_("div",null,[c,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7B/0C/Cgq2xl56EHGAes_qAAAq4yCDglQ583.png"}),t(),p,u,h,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7B/0C/Cgq2xl56EHGAKPXYAAAa55XEGd8805.png"}),t(),d,g,b,A,T,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7B/0C/Cgq2xl56EHKADq7BAASZnLa5xp8566.png"}),t(),k,C,m,B,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7B/0C/Cgq2xl56EHOAazKDAAIAeKPsCcc665.png"}),t(),V,q,D,I,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7B/0C/Cgq2xl56EHOANGD_AAAl43L0zUg733.png"}),t(),S,f,P,x,y,E,M,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7B/0D/Cgq2xl56EHSAEo80AAI5n-1PWu4468.png"}),t(),H,F,v,J,N,G,R,O,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7B/0D/Cgq2xl56EHSAbra8AABHuzbV9G0921.png"}),t(),K,L,W,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7B/0D/Cgq2xl56EHSAbcWgAAAq3CKoRVM574.png"}),t(),U,Y,j,z,$,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7B/0D/Cgq2xl56EHWAcJGaAABF5M6qBuY196.png"}),t(),Q,X,w,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7B/0D/Cgq2xl56EHWAWyClAAFYfbHvcak742.png"}),t(),Z,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/01/F6/Ciqah156EHaAMAWmAAF8jlz4p6s728.png"}),t(),ll,o(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7B/0D/Cgq2xl56EHaAQRXKAABpCcfy2IE236.png"}),t(),tl])}const pl=e(a,[["render",sl]]);export{cl as __pageData,pl as default};
