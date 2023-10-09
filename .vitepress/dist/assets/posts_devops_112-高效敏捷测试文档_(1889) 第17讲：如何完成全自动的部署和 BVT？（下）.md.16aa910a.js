import{_ as l,j as n,o as a,h as i,k as t,f as s,Q as o,s as e}from"./chunks/framework.d3daa342.js";const G=JSON.parse('{"title":"第17讲：如何完成全自动的部署和BVT？（下）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(1889) 第17讲：如何完成全自动的部署和 BVT？（下）.md","filePath":"posts/devops/112-高效敏捷测试文档/(1889) 第17讲：如何完成全自动的部署和 BVT？（下）.md","lastUpdated":1696682708000}'),p={name:"posts/devops/112-高效敏捷测试文档/(1889) 第17讲：如何完成全自动的部署和 BVT？（下）.md"},_=o('<h1 id="第17讲-如何完成全自动的部署和bvt-下" tabindex="-1">第17讲：如何完成全自动的部署和BVT？（下） <a class="header-anchor" href="#第17讲-如何完成全自动的部署和bvt-下" aria-label="Permalink to &quot;第17讲：如何完成全自动的部署和BVT？（下）&quot;">​</a></h1><p>在上一讲中，我介绍了 CI 的自动化部署，这一讲则重点介绍如何完成 DevOps 的自动化部署。云化是虚拟化技术的集大成者，现在企业级应用部署的主要特点是：虚拟机和容器技术广泛应用，甚至可以容器化一切；系统从数据中心向公有云或私有云迁移；基础设施即代码日趋成熟。</p><br><p>CI 的部署相对比较简单，将软件系统部署到开发环境或测试环境，目的是完成 BVT 和开发迭代中的持续测试。相比测试环境，准生产环境、生产环境中的容器集群的规模更大，可用性、伸缩能力要求更高，往往需要一个或多个庞大的容器集群运行微服务实例来支持大量的在线并发业务。比如在阿里的生产环境上，容器化的应用超过了 1 万个，容器数量在百万级别。这时就需要使用生产环境级别的容器集群管理平台来管理，目前首选 Kubernetes（K8s）。</p><br><p>下面我就结合 Kubernetes 来讨论云平台的部署和管理。</p><h3 id="docker-容器的集群管理之-kubernetes" tabindex="-1"><strong>Docker 容器的集群管理之 Kubernetes</strong> <a class="header-anchor" href="#docker-容器的集群管理之-kubernetes" aria-label="Permalink to &quot;**Docker 容器的集群管理之 Kubernetes**&quot;">​</a></h3><p>Kubernetes 做为 Docker 容器集群的管理工具主要有下列这些功能：</p><ul><li><p>以集群的方式运行、管理容器，比如复制、扩展容器等，并保证容器之间的通讯；</p></li><li><p>保证系统服务的计算容量和高可用性，Kubernetes 具有自我修复机制，比如一个宿主机上的某个容器死掉之后，可以在另外一个宿主机上将这个容器迅速拉起来；</p></li><li><p>对容器集群的自动化、全生命周期的管理，包括伸缩性、负载均衡、资源分配等。</p></li></ul><br>',10),u=e("p",null,"图1 Kubernetes 的架构",-1),c=e("br",null,null,-1),b=e("p",null,"在第 15 讲中，我曾经展示过 Kubernetes 的架构，我们不妨再仔细看看它的架构，如图 1 所示，包括一个主节点（Master）和若干个工作节点（Node）。主节点负责对 Kubernetes 集群的控制和管理；工作节点中运行实际的应用系统。Pod 是每个工作节点中可以调度的最小单元，一个 Pod 包含一组容器。Kubernetes 能够管理的集群规模非常强大，单集群就可部署 5000 个工作节点、15 万个 Pods、30 万个容器。",-1),d=e("br",null,null,-1),h=e("p",null,"Kubernetes 中的每个对象都对应声明式的 API，可以非常方便地通过执行配置文件进行资源的创建和管理。比如，你可以编写 Pod.yaml 文件来定义一个包含两个容器的 Pod，如图 2 所示。",-1),g=e("br",null,null,-1),m=e("p",null,"图2 Pod.yaml 文件示例",-1),A=e("br",null,null,-1),T=e("p",null,"安装 Kubernetes，可以借助两个工具：Vagrant 和 Ansible。先定义合适的 Vagrantfile（如图 3 所示）来安装虚拟机，包括下载镜像、初始化、配置等工作，并能保证 Kubernetes 的节点配置是一致的。",-1),C=e("br",null,null,-1),S=e("br",null,null,-1),f=e("p",null,"图 3 Vagrantfile 示例",-1),k=e("br",null,null,-1),q=e("p",null,"然后再分别创建 Ansible 的 playbook（如 master-playbook.yml 和 node-playbook.yml）自动安装 Kubernetes 主节点和工作节点。这个操作相对比较复杂，比如安装容器及 kubelet、kubeadm、kubectl 等组件，使用 kubeadm 初始化容器集群、配置 kube 文件，以及建立主节点和工作节点的网络连接。可参考 Ansible、Kubernetes 官方网站和网上其他资料来完成具体操作。",-1),P=e("br",null,null,-1),V=e("p",null,"我们还是回到主题，如何基于集群环境来完成部署，这里给出了一个完整的 Kubernetes 集群环境中软件产品从持续集成到发布的工作流程，如图 4 所示，供你参考，也能更好理解 Docker、Kubernetes 和 Terraform 等工具的各自位置，以及它们如何在部署流程中发挥的作用。",-1),v=e("br",null,null,-1),K=e("br",null,null,-1),D=o('<p>图4 Kubernetes 集群环境中部署流程图</p><br><ul><li><p>将软件开发、调试和测试部署在同一个 Kubernetes 开发集群中，实施快速迭代。</p></li><li><p>将代码合并到 GitHub 代码库中，并进行检查，然后运行自动化的构建和 BVT（作为 CD 的一部分）。</p></li><li><p>验证容器镜像的来源和完整性，在通过扫描之前镜像处在被隔离状态。</p></li><li><p>Kubernetes 使用 Terraform 之类的工具集群，Terraform 安装的 Helm 图表定义了所需的应用程序资源和配置状态。</p></li><li><p>强制执行策略以管理 Kubernetes 集群的部署。</p></li><li><p>发布管道会自动执行每个代码的预定义部署策略。</p></li><li><p>将策略审核和自动修复添加到 CI / CD 管道，比如，只有发布管道有权在 Kubernetes 环境中创建新的 Pod。</p></li><li><p>启用应用遥测（Telemetry）、容器运行状况监视和实时日志分析。</p></li><li><p>利用深度分析发现问题，并为下一个迭代制定计划。</p></li></ul><h3 id="基础架构即代码-terraform" tabindex="-1"><strong>基础架构即代码------Terraform</strong> <a class="header-anchor" href="#基础架构即代码-terraform" aria-label="Permalink to &quot;**基础架构即代码------Terraform**&quot;">​</a></h3><p>下面就介绍上面部署流程中提到的 <strong>Terraform</strong> ，它和 CloudFormation 都是&quot;<strong>基础架构即代码</strong>&quot;的工具。在第 14 讲中，我们介绍了四类 IaC 工具，并介绍了其中两类工具：容器即代码、配置即代码。在这一部分，把剩余的两类工具&quot;基础架构即代码、管道即代码&quot;也介绍了。我先介绍基础架构即代码这个工具。</p><br><p>Terraform 具有完成完整的云基础架构创建的能力，并通过 DSL（Domain Specific Language，领域特定语言）以编程方式将各个组件链接在一起，并能将云基础设施的有用部分定义为带有参数化输入的模块，而且可以和其他模块集成，在不同的部署中一次又一次地使用，具有良好的复用性。这里列出 Terraform 其中的两个主要模块：</p><ul><li><p><strong>管理模块</strong> ，定义 VPC（Virtual Private Cloud，公有云上自定义的逻辑隔离网络空间）、子网、NAT（Network Address Translation，网络地址转换）网关、路由、安全组和 PuppetMaster 等；</p></li><li><p><strong>服务器模块</strong> ，在其子网中定义多个消息代理和多个自定义服务器的层，并将它们动态链接到公共 ELB（负载均衡）。</p></li></ul><br><p>调用这些模块的 Terraform 代码可以在它们之间传递详细信息，比如，可以使一个模块中的 ELB 获取另一个模块中创建的实例 ID。下面是两个简单的例子，一个是配置文件的声明，另一个是版本更新操作并验证的例子。</p><br><p>示例一：配置文件的声明</p><br><br>',14),I=e("br",null,null,-1),B=e("p",null,"示例二：版本更新并验证",-1),x=e("br",null,null,-1),M=o('<br><p>接着简单说一下<strong>CloudFormation</strong>，它是亚马逊 AWS 平台提供的基础架构即代码的开源工具，最初是为了方便客户申请并管理云服务里的资源。 CloudFormation 通过编写 YAML 或者 JSON 语言的模板（Stack）来完成对资源的创建、销毁、监控等操作。详细内容，可以参考亚马逊 AWS 官网的介绍。</p><h3 id="管道即代码-drone-io、concourseci" tabindex="-1"><strong>管道即代码------Drone.io、ConcourseCI</strong> <a class="header-anchor" href="#管道即代码-drone-io、concourseci" aria-label="Permalink to &quot;**管道即代码------Drone.io、ConcourseCI**&quot;">​</a></h3><p>介绍完基础架构即代码工具，再来介绍<strong>管道即代码</strong>工具。<strong>管道即代码</strong>**，也叫流水线即代码，就是把管道部署流程写进一个脚本文件，然后用一条命令调用文件即可完成复杂的部署过程**。通过前面的讲解，你已经了解到了云基础设施里的一切都可以变成代码，包括应用系统容器化部署、各种配套 IT 资源的创建和配置，以及部署和配置工具的自动化测试。最后，只要把部署流水线变成代码，就实现了整个部署环境的自动化。</p><br><p>在前面的讲解中，我用了不少 Jenkins 流水线脚本的例子，这是 Jenkins 2.0 提供的功能。在 Jenkins 1.0 上，为了完成构建任务，我们要事先安装需要的插件、在界面上做很多配置，还要设置环境变量，时间长了，你还能记得曾经安装过哪些插件、做过哪些配置吗？让你再搭建一个持续集成的环境，你能保证和上次的操作一样吗？所以 Jenkins 1.0 不能算管道即代码的工具，但 2.0可以 算。</p><br><p>另外，Concourse CI 和 Drone.io 在&quot;管道即代码&quot;方面做得很好，完全可以将基础架构、配置和应用程序部署集成到一个管道中。</p><ul><li><p>具有配置或基础结构依赖性，以这样耦合的应用程序发布。比如，如果应用程序的下一版本需要新的 JVM 版本，因为这两个更改将耦合在一起，因此将应用程序新版本和 JVM 新版本部署在同一发行版中。</p></li><li><p>能够创建临时环境作为应用程序部署管道的一部分：当我们希望管道采用上个&quot;双11&quot;相同的负载时，对应用程序进行压力测试，但又不想在测试环境上进行，也不想在一个专用的环境上完成这次压力测试，因为该环境在大多数情况下会处于闲置状态。在这种模式下，基础架构是可重用的模块！你可以编写管道代码，以便它实例化此模块（带有类似于生产的参数）并将其用于压力测试。成功后，继续进行部署，否则就回滚。</p></li></ul><br><p>Concourse.ci 使用了基于 Yaml 的脚本语言，描述所依赖的外部资源（Resources），比如 git 仓库（repository）、需要完成的作业（Job）及任务（task）。如图 5 所示是一个 Concourse.ci 流水线脚本的简单示例。在这个示例中，脚本中的任务是由 git 触发的。</p><br>',12),N=o('<p>图5 Concourse.ci 脚本示例</p><h3 id="新一代的部署体验-serverless-软件系统架构" tabindex="-1"><strong>新一代的部署体验------Serverless 软件系统架构</strong> <a class="header-anchor" href="#新一代的部署体验-serverless-软件系统架构" aria-label="Permalink to &quot;**新一代的部署体验------Serverless 软件系统架构**&quot;">​</a></h3><p>说完主流微服务架构的集群部署之后，我们再展望一下未来 Serverless 架构的部署。</p><br><p>在当前主流的云计算 IaaS（Infrastructure as a Service）和 PaaS（Platform as a Service）中，企业在部署业务系统到云上仍然需要关心部署多少个 K8s 集群、每个集群需要多少个工作节点、多少个 Pods，说到底，购买的还是存储和计算资源。近几年业界提出了 Serverless 架构，就是去服务器化的软件架构体系。Serverless 架构分为 Backend as a Service（BaaS）和 Functions as a Service（FaaS）两种技术，就是<strong>后端即服务和函数即服务</strong>。</p><br><p>简单的说，Baas 技术提供软件应用依赖的服务端的服务。对于前后端分离的架构，只需要开发前端应用然后上传到云服务平台，后端应用和服务器端的部署和维护由云平台来提供。</p><br><p>FaaS 技术通过函数提供应用系统依赖的通用功能，比如视频处理的人脸识别、视频转码等功能。企业开发的微服务主要负责业务逻辑的实现，通用功能由第三方提供的函数实现。这些微服务运行在无状态的临时容器中，容器和计算资源的协调由第三方去管理。</p><br><p>在这种架构模式下，企业不仅不需要关心业务系统的集群部署和管理，在开发应用的时候，也不需要关心和服务器相关的服务端开发工作，以及通用功能的实现。</p><h3 id="产品发布之导流模式" tabindex="-1"><strong>产品发布之导流模式</strong> <a class="header-anchor" href="#产品发布之导流模式" aria-label="Permalink to &quot;**产品发布之导流模式**&quot;">​</a></h3><p>**产品的部署和发布在很多地方可以互换使用，**所以最后一个话题是互联网行业普遍应用的&quot;产品发布之导流模式&quot;。但其实还是有区别的，发布是指把产品推向市场，而部署是指发布产品的技术性操作，就是我一直在讲的部署流水线、基础设施、虚拟化技术、集群管理等。</p><br><p>无论是敏捷还是 DevOps，目标都是把产品快速的推向市场，因此，产品的高频发布代表了一种趋势，尤其是互联网企业，每天可以有几十次以上的发布。高频发布可以帮助企业快速响应市场的需求，同时，企业也希望利用高频发布快速获取客户的真实体验，及时调整产品的功能和发展方向。</p><br><p>产品发布的导流模式是指：企业定向精准发布某个产品版本让某些用户试用，以验证这个版本为业务导入流量的效果。比如说 A/B 发布（A/B 测试），一部分用户使用版本 A，一部分用户使用版本 B，收集这两类用户使用数据，统计并对比两个方案的购买转化率等指标，以此判断不同方案的优劣。</p><br><p><strong>还有一种是影子发布，也叫影****子测试</strong>，当需要把遗留的系统服务迁移或升级到新的服务前，在测试环境部署一份遗留系统服务和一份新的服务，将生产数据库复制两份到测试环境，同时，将生产请求日志导流出来，分发到测试环境里面的遗留系统服务和新的服务，并进行日志回放。</p><br><p>两种服务收到响应后进行比对，如果所有响应比对成功，则可以认为遗留系统服务和新的服务在功能逻辑上是等价的。如果响应对比失败，需要修复新的服务，直到响应比对成功。影子测试一般适用于遗留系统的等价重构迁移，比如 MS SQL Server 数据库迁移到 MySQL 数据库、.net 平台迁移到 Java 平台等。因为使用生产真实的数据流量做测试，可以在很大程度上降低发布新系统的风险，但是环境部署的技术要求比较高。</p><br><p>最后，总结一下今天讲的内容：</p><ul><li><p>Kubernetes 提供了容器集群的高可用性、伸缩性及全生命周期的管理；</p></li><li><p>Terraform 是一个优秀的&quot;基础架构即代码&quot;工具，具有完整的云基础架构创建的能力；</p></li><li><p>管道即代码工具，解决了整个 DevOps 自动化部署&quot;最后一公里&quot;的问题；</p></li><li><p>Serverless 架构会带来全新的、更轻量级的部署体验；</p></li><li><p>现在普遍使用产品发布的导流模式，让发布更精准、更可靠。</p></li></ul><br><p>再出个思考题：你认为 Serverless 架构体系对软件测试的影响是什么？可以从自动化测试金字塔和测试环境两个方面考虑，欢迎留言讨论。</p>',26);function J(y,E,L,F,O,R){const r=n("Image");return a(),i("div",null,[_,t(r,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7C/C0/Cgq2xl584-qAUUhKAAEQ-DmXea8445.jpg"}),s(),u,c,b,d,h,g,t(r,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7C/C0/Cgq2xl585CiAR_DzAACWERFaSRI699.png"}),s(),m,A,T,C,S,t(r,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/AA/Ciqah1585GiAVr5pAAL0rXUsOHA176.png"}),s(),f,k,q,P,V,v,K,t(r,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7C/C0/Cgq2xl585JKAWtG9AAH4Pw3QyYs174.png"}),s(),D,t(r,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7C/C0/Cgq2xl585LyAOixTAAJSzlhuols176.png"}),s(),I,B,x,t(r,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/AA/Ciqah1585NiATk3fAAJ69hFxrn4518.png"}),s(),M,t(r,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7C/C0/Cgq2xl585PiAGfXvAAD1u_5lgO4900.png"}),s(),N])}const H=l(p,[["render",J]]);export{G as __pageData,H as default};
