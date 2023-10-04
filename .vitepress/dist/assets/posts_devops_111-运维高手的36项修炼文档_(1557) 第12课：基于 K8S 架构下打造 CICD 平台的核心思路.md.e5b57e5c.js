import{_ as t,j as r,o,g as l,k as n,h as i,Q as s,s as e}from"./chunks/framework.e0c66c3f.js";const y=JSON.parse('{"title":"K8s 架构中的 CI\\\\CD 平台 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/111-运维高手的36项修炼文档/(1557) 第12课：基于 K8S 架构下打造 CICD 平台的核心思路.md","filePath":"posts/devops/111-运维高手的36项修炼文档/(1557) 第12课：基于 K8S 架构下打造 CICD 平台的核心思路.md","lastUpdated":1696338709000}'),a={name:"posts/devops/111-运维高手的36项修炼文档/(1557) 第12课：基于 K8S 架构下打造 CICD 平台的核心思路.md"},b=s('<p>本课时我们讲解一套在 K8s 环境下打造 CI\\CD 平台的核心思路。</p><h2 id="k8s-架构中的-ci-cd-平台" tabindex="-1">K8s 架构中的 CI\\CD 平台 <a class="header-anchor" href="#k8s-架构中的-ci-cd-平台" aria-label="Permalink to &quot;K8s 架构中的 CI\\\\CD 平台&quot;">​</a></h2><h3 id="课程意义" tabindex="-1">课程意义 <a class="header-anchor" href="#课程意义" aria-label="Permalink to &quot;课程意义&quot;">​</a></h3><p>在开始之前，我给你讲一下学习本课时的意义。在课时 9 中，我们介绍了基于 Jenkins 的持续集成架构及普通使用模式下需要注意的问题。在本课时，我们来讲解基于 K8s 和 Docker 容器化部署架构下需要实现 CI\\CD 平台所需关注核心知识，如： CI/CD 平台实现后需要具备什么样的特性？架构设计上需要注意什么？希望在本课时能带你找到对应的答案。</p><h3 id="k8s-中的-ci-cd-平台应该实现的功能" tabindex="-1">K8s 中的 CI\\CD 平台应该实现的功能 <a class="header-anchor" href="#k8s-中的-ci-cd-平台应该实现的功能" aria-label="Permalink to &quot;K8s 中的 CI\\\\CD 平台应该实现的功能&quot;">​</a></h3><p>首先，开门见山的来讲一下 K8s 和 Docker 部署架构下，所具备的特性：</p><ol><li><p>支持容器部署，作到基于镜像方式发布、K8s 进行编排，所以在 CI\\CD 平台里面，我们务必要遵循容器及 K8s 的发布部署方式。</p></li><li><p>在 K8s环境下，Devops 理念更加突出，需要作到通过 Jenkins 的 API 创建和管理 Job 。</p></li><li><p>Pipeline 灵活性管理 Job ，基于流水线的方式，能给我们带来更多的灵活性的 Job 管理和定义。</p></li><li><p>需要支持多环境、多版本的发布场景。我们在大的企业环境下，常遇到多套工程的部署环境，可能也会有多套代码分支，CI\\CD 平台应该更好地兼容这样的环境进行设计。</p></li><li><p>我们需要注重 Jenkins，也就是 CI\\CD 平台本身的高可用，如果是基于单点的方式部署 Jenkins，它本身就不是高可用的，我们需要考虑它本身的高可用性。</p></li></ol><p>基于这样的理念和要求，我认为要做这样的一个平台，归纳起来需要包括以下几个核心的功能：</p><ol><li><p>Jenkins 部署高可用。</p></li><li><p>通过 Pipeline 创建\\管理 Job。</p></li><li><p>通过 API 接口创建\\管理 Job。</p></li></ol><p>以上是接下来我要介绍的在 K8s 架构下搭建 Jenkins 的 CI\\CD 平台的三点必要能力，接下来我们详细的讲解一下。</p><h2 id="学前提示" tabindex="-1">学前提示 <a class="header-anchor" href="#学前提示" aria-label="Permalink to &quot;学前提示&quot;">​</a></h2><p>在学习本课时之前，你需要了解 Jenkins 基础搭建和基础配置，同时需要对 K8s 有一定了解，比如 pod、node、service 分别是什么概念？K8s 结构组成是什么样子的？另外，如果要把整个平台搭建起来，还需要具备 Docker 镜像打包和发布整个流程的技术操作能力。</p><h2 id="核心思路" tabindex="-1">核心思路 <a class="header-anchor" href="#核心思路" aria-label="Permalink to &quot;核心思路&quot;">​</a></h2><p>接下来，就基于刚刚讲到的三点核心内容，我们逐一来进行介绍。</p><h3 id="思路一、jenkins-服务高可用" tabindex="-1">思路一、Jenkins 服务高可用 <a class="header-anchor" href="#思路一、jenkins-服务高可用" aria-label="Permalink to &quot;思路一、Jenkins 服务高可用&quot;">​</a></h3><p>首先第一点，就是 Jenkins 本身服务的部署高可用。</p><br>',17),c=s("<br><p>回顾一下 Jenkins 本身的部署模式，通常有以下三种方式：</p><br><p>第一种方式，就是在操作系统上面直接部署 Jenkins，然后让 Java 进程直接运行，这是比较传统做法。</p><br><p>第二种方式，是将 Jenkins 封装成一个标准镜像，并且以容器化的方式运行，这个是在课时 9 里面推荐你部署的方式，这样会更容易安装、维护和管理。</p><br><p>第三种方式，是建立在第二种方式基础上，接下来需要给你介绍的。</p><br><p>第三种方式重点解决单例模式Jenkins 部署下，服务存在的高可用问题，如何做到一台 Jenkins 服务出现问题，有另外的服务能够自动把它拉起？另外，由于Job 的增加，常常导致 Jenkins 本身系统负载能力趋于饱和，从 Jenkins 本身的性能瓶颈上如何进行水平化的扩容？</p><br><p>接下来，我们把Jenkins 做成主从模式，做成主从架构可以让我们把需要消耗 Jenkins 性能的 Job 工作交给从节点（slave）去完成。</p><br><p>还需要解决 Jenkins 本身的高可用，我们可以把 Jenkins 部署在 K8s 的 Pod 中，让 K8s 负责对 Jenkins 服务进行监控和拉起，这样就保证了 Jenkins 服务本身的高可用，同时由于k8S弹性资源调度优势，还要借助 K8s 对 Jenkins 资源进行水平化扩展。</p><br><p>所以 Jenkins 服务要做到真正的高可用推荐遵循 Jenkins 主从架构，并且把 Jenkins 部署到 K8s 的架构体系中。</p><br><p>为了让你能够更加形象地来理解，这里画了一张图：</p><br>",19),k=s('<br><p>我们看到这里有 K8s 整个集群，包含有三个 Node 节点，每个 Node 节点上有一组 Pod。Pod 会分为两大类型，一个是 Master 类型的 Pod，一个是 Slave 类型的 Pod。在 K8s 里面最小的管理单元是 Pod ，我们姑且认为它是一个独立的服务个体。</p><br><p>这个 Pod 上面运行的是 Jenkins 的 Master 服务，在另外两个 Node 上面的是 Jenkins 的 Slave 的 Pod 服务，所以我们会看到在 K8s 这套集群体系下，Jenkins 是以主从的方式运行在 K8s 的架构之上， Jenkins 的 Job 任务交给 Slave 节点去完成，而 Master 只负责进行 Job 的管控或中心平台的作用。</p><br><p><strong>优势</strong></p><br><p>1、Job 资源隔离</p><p>有一个优势是 Job 间资源隔离，我会看到 Jenkins 将 Job 分给了不同的 Pod 处理，Pod 本身就是以容器化（cgroup）进行资源隔离，所以 Job 间不会造成进程的争抢。</p><br><p>2、动态伸缩</p><p>同时，K8s 的支持动态伸缩特性，当 Pod 资源不足，需要扩容新的 Pod 的时候，可以借用 K8s 的动态伸缩模式来进行 Pod 资源的扩容。</p><br><p>3、高可用</p><p>同时也保证了服务的高可用，因为我们知道 K8s 对服务的拉起可以做到自动的故障诊断及故障拉起。</p><br><p>这个就是 Jenkins 本身融合到 K8s 架构里面的高可用架构的图示。在最外面挂了一组存储卷，我们可以把 Jenkins 需要持久化的相关内容，以 PVC 方式挂载到分布式的存储之中。这样的话就保证了数据的高可靠。</p><br><p><strong>如何实现？</strong></p><br><p>接下来我讲解一下，如果你要来部署这样的一套架构的话，它的核心思路是什么样的？整个部署完 K8s 的集群以后，我们首先需要部署的就是 Jenkins 的 Master 节点。</p><br><p>Master 节点相关的配置是通过 K8s 来创建几个重要的对象：一个是 namespace，这是 K8s 给 Jenkins 的一个独立的命名空间。第二个就是 PVC 对象，我们会在图中看到一组外挂的存储节点，创建 PVC 对象。接下来就是要创建 deployment 对象，如果你了解 K8s 一定会清楚，deployment 是一个非常重要的 K8s control 的对象，它直接控制着 Pod 资源的镜像、Pod 的资源使用，还有它的服务探针等相关内容，这个都是在 deployment 里面进行创建的。最后是创建 service 对象，service 对象创建以后，Pod 就可以正式的对集群内部提供服务。</p><br><p>以上，就是在 Master Jenkins 节点在 K8s 里面创建的过程。接下来，我们就可以在 Master 启用以后，登录Jenkins的管理控制台来配置 Slave 结点。</p><br><p>在控制台里面，我们需要重点的两步来配置 Slave 节点，就是：</p><ol><li><p>我们需要安装 K8s 的插件(<strong>kubernetes plugin)</strong>。</p></li><li><p>需要配置 Slave 的模板信息，也就是 Slave deployment。</p></li></ol><p>这都是在 Jenkins 的界面控制台来进行配置的。接下来，我们来具体看一下，在创建 Jenkins 的 Master deployment 这个具体的创建方式。</p><br><p>我们知道 K8s 是通过 yaml 的语法格式来创建、管理对象，如下是在 deployment 对象配置的几个核心部分：</p><br><p>第一部分，创建 Pod 里面的容器的镜像，以及对外服务的端口。</p><br><p>apiVersion: extensions/v1beta1</p><p>kind: Deployment</p><p>spec:</p><p>containers:</p><ul><li>name: jenkins</li></ul><p>image: jeson_jenkins:1.1 //镜像</p><ul><li>containerPort: 8080 //服务端口</li></ul><p>name: web</p><p>protocol: TCP</p><ul><li>containerPort: 50000</li></ul><p>name: agent</p><p>protocol: TCP</p><br><p>第二部分，这里定义两个探针，用于 K8s 对服务进行健康检测。</p><br><p>livenessProbe: //定义存活探针</p><p>httpGet:</p><p>path: /login</p><p>port: 8080</p><p>...</p><p>livenessProbe: //定义就绪探针</p><p>httpGet:</p><p>path: /login</p><p>port: 8080</p><p>....</p><br><p>第三部分，就是配置的 PVC内容，这里直接挂载了一个逻辑卷。</p><br><p>volumeMounts: 定义卷挂载</p><p>name: jenkinshome</p><p>subPath: jenkins2</p><p>mountPath: /var/jenkins_home</p><p>volumes:</p><ul><li>name: jenkinshome</li></ul><p>persistentVolumeClaim:</p><p>claimName: opspvc</p><br><p>最后，我们可以通过 kubectl 来创建 deployment 对象。</p><br><p>kubectl create -f jenkins-deployment.yaml</p><br><p>这个就是 deployment.yaml 里面几个重要的配置项的一部分。</p><br><p><strong>Service配置</strong></p><br><p>接下来讲一讲，创建 service 对象的几个重要的配置。一块就是创建服务的名称，对外暴露服务的端口，以及关联后端 Node 节点的端口。总共创建了对外服务两个端口，一个是Jenkins的 Web 服务端口，一个是 agent 所需要进行信息通信的端口。所以以 yaml 文件写好以后，同样通过 kubectl 来创建对象。</p><br><p>kubectl create -f jenkins-service.yaml</p><br><p>apiVersion: v1</p><p>kind: Service</p><p>spec:</p><p>ports:</p><ul><li>name: web</li></ul><p>port: 8080</p><p>targetPort: web</p><p>nodePort: 30002</p><ul><li>name: agent</li></ul><p>port: 50000</p><p>targetPort: agent</p><br><p>以上是给你介绍 K8s 的集群部署 Jenkins 高可用架构核心的优势、步骤。你可以在网上找一些资料，来模拟整体搭建这样的一套服务。</p><h3 id="思路二、jenkins-的-pipeline-工作流" tabindex="-1">思路二、Jenkins 的 Pipeline 工作流 <a class="header-anchor" href="#思路二、jenkins-的-pipeline-工作流" aria-label="Permalink to &quot;思路二、Jenkins 的 Pipeline 工作流&quot;">​</a></h3><p>第二个核心思路就是 Jenkins 的 Pipeline 工作流。</p><br>',99),_=s("<br><p>在整个 Jenkins 的工作 job 类型里面，这里我给它做了一个分类：一个是基础的 job 服务类型，这是一种常见的job方式。第二就是通过 Groovy 语言来实现 Pipeline 工作流，Pipeline 工作流有什么好处呢？它可以使构建任务会更加灵活，维护性更好。</p><br><p>第一种类型Job方式，我们需要通过控制台进行固定的配置；而第二种方式，我们可以使用脚本化的语言来进行配置，会更加的灵活，更利于维护，所以对于大型工程而言，建议你更多的使用 Pipeline 。</p><br><p>接下来，我再看下第一种方式和第二种方式又可以做一个细分。第一种方式分为 Freestyle project 和 Muti-configuration project。第二种方式同样也可以分为一个多分支的 Pipeline。我们看到，它们的区别就是是否要支持多分支、多环境的工作流模式，</p><br><p>这个地方就涉及在企业应用中，如果有代码需要做多分支、多版本的场景，这个时候我们需要选择多分支的 Pipeline 或者多配置的工程化来进行配置，以支持企业的需求。</p><br><p><strong>多分支</strong></p><br><p>刚刚说到了多分支，我们接下来理解一下多分支的具体含义，这里我画了一张图：</p><br>",13),h=e("br",null,null,-1),d=e("p",null,"图中我们会看到 Jenkins 整体的构建和发布的过程。我们看到开发人员进行代码的提交，通过在 git 仓库上做版本库的代码管理，同时通过一个钩子（webhook）触发 Jenkins 来进行部署、构建、测试，然后进行环境的发布。这是一种单流水线的方式。",-1),u=e("br",null,null,-1),J=e("br",null,null,-1),m=e("p",null,"总结归纳发现 Jenkins 负责构建、测试和发布，这属于单 Pipeline 任务流模式。",-1),P=e("br",null,null,-1),g=e("p",null,"如果是多分支或者多部署环境的方式，这个时候我们该怎么做呢？",-1),C=e("br",null,null,-1),j=s('<br><p>假设我们现在有两种分支，一个是测试分支，一个是线上环境分支，这个时候我们在 Jenkins 里面就需要同步支持构建和本地测试。测试完可能需要进行两个工程的打包、发布。</p><br><p>接下来我来具体演示一下，这里需要用到 一个 Jenkinsfile 名称脚本来进行对应的控制。Jenkinsfile 本身就是用 Groovy 语言进行编写的，我们需要编写它让 Jenkins 的这个工作流支持控制多分支、多环境的部署。那具体怎么做呢？接下来我们再来讲一讲它的关键步骤是什么样子的。</p><br><p><strong>关键步骤</strong></p><br><p>接下来我们介绍如何来做一个多分支的 job ？整体的步骤建议参考这篇文章（<a href="https://jenkins.io/zh/doc/tutorials/build-a-multibranch-pipeline-project/" target="_blank" rel="noreferrer">https://jenkins.io/zh/doc/tutorials/build-a-multibranch-pipeline-project</a>）。从这篇文章里面，我提炼了几个关键的步骤，接下来给你进行讲解。</p><br><p>1、镜像 jenkinsci/blueocean = jenkins + Blue Ocean 插件和功能</p><br><p>第一个推荐容器用 jenkinsci/blueocean 这个镜像，它是在 Jenkins 的基础上默认集成 Blue Ocean 插件功能的镜像。Blue Ocean 这个插件起到什么作用呢？</p><br><p>Blue Ocean 作用：</p><br><p>（1）清晰简单界面</p><br><p>它可以使 Jenkins 管理控制台更加的清晰、简单，比如我们要去定位 Pipeline 的错误，在控制台就可以非常友好的定位，相比 Jenkins 默认的控制台会更加的方便。</p><br><p>（2）Pipeline 可视化编辑</p><br><p>其次它支持 Pipeline 的可视化编辑，我们在控制台编辑创建 Pipeline 的任务会更加方便。</p><br><p>2、工程仓库</p><br><p>第二点，就是我们创建好了 Jenkins job以后，需要去创建 job 的代码工程。这里有一个样例工程 GitHub 的地址是（<a href="https://github.com/jenkins-docs/building-a-multibranch-pipeline-project" target="_blank" rel="noreferrer">https://github.com/jenkins-do CI、CD /building-a-multibranch-pipeline-project</a>）。</p><br><p>我们来重点看一下这个工程的目录结构。</p><p>./</p><p>├── jenkins</p><p>│ └── scripts</p><p>│ ├── deliver-for-development.sh</p><p>│ ├── deploy-for-production.sh</p><p>│ ├── kill.sh</p><p>│ └── test.sh</p><p>├── Jenkinsfile</p><p>├── package.json</p><p>├── public</p><p>│ ├── index.html</p><p>└── src</p><p>├── App. CI、CD s</p><p>├── App.js</p><p>├── ...</p><br><p>这里非常重要的一点就是在工程的根目录下有一个 Jenkinsfile，刚刚我们讲到了 Jenkinsfile 就是用 Groovy 语言书写的一个 Pipeline 脚本。同时，它会引用 Jenkins 目录下的几个 sh 脚本来控制部署任务。</p><br><p>3、创建多分支</p><br><p>在你创建好工程以后，接下来需要在本地模拟多个分支，你可以创建测试环境的分支、线上环境的分支、预上线环境的分支等等多个分支， git 通过 git branch 来操作。</p><br><p>4、Jenkinsfile</p><br><p>刚刚讲到Jenkinsfile 是非常重要的，这个 Pipline 的脚本需要同时支持多个分支构建。</p><br><p>我接下来打开这个文件给你看一下，在我的控制台给你展示一下 Jenkinsfile 的内容。</p><br><p>我用 vim 的编辑器打开，stages 这个大的模块里面会控制着它相关的工作流的流程。如最前面的 stage(&#39;build&#39;) 这个流程是控制进行构建的步骤，这里是执行的 npm install 命令。接下来是测试的流程，它执行一个 Shell 脚本来作。</p><br><p>再往下看是控制发布流程，需支持两个发布流程，一个是发布到 Development，也就是开发环境。另一个是发布到线上环境。可以通过这样的一种方式来控制发布到不同的环境。如果是开发环境下，这里会判断它的这个分支(通过 git branch 来打分支)是不是开发环境？ 在 Jenkinsfile 流程脚本下，它会通过判断语句来确定是不是对应的分支。如果是 git 的开发分支，那么就执行这个脚本；如果是线上的一个分支，就执行另外的一个发布的脚本。</p><br><p>这就是通过 Groovy 语言实现多分支部署的一个 Jenkinsfile 脚本样例。</p><p>#演示结束#</p><br><p>安装步骤：<a href="https://jenkins.io/zh/doc/tutorials/build-a-multibranch-pipeline-project/" target="_blank" rel="noreferrer">https://jenkins.io/zh/doc/tutorials/build-a-multibranch-pipeline-project/</a></p><br><p><strong>Jenkins 的 API 能力</strong></p><br><p>JAVA:<a href="https://github.com/jenkinsci/java-client-api" target="_blank" rel="noreferrer">https://github.com/jenkinsci/java-client-api</a></p><p>Python:<a href="https://github.com/pycontribs/jenkinsapi" target="_blank" rel="noreferrer">https://github.com/pycontribs/jenkinsapi</a></p><br><p>最后讲一讲，在 Jenkins 下，如果你要把 Jenkins 能力融入到你的 Devops 平台，则需要了解 Jenkins 的 API 能力，才能够通过 Devops 调用 Jenkins 的 API 来实现 job 的灵活管理、创建.</p><br><p>你可以看一下一篇 API 的官方文档（<a href="https://wiki.jenkins.io/display/JENKINS/Remote+access+API" target="_blank" rel="noreferrer">https://wiki.jenkins.io/display/JENKINS/Remote+access+API</a>），为了更加方便研发人员去进行 Jenkins 的 API 接口调用，官方也开放 API 或者 SDK，我们可以直接选择对应的语言下载对应的模块，如 Java，你可以访问这个 GitHub 地址（<a href="https://github.com/jenkinsci/java-client-api%EF%BC%89%E5%8E%BB%E4%B8%8B%E8%BD%BD%E5%AE%83%E7%9A%84" target="_blank" rel="noreferrer">https://github.com/jenkinsci/java-client-api）去下载它的</a> API 或者 SDK。如果你用的是 Python语言，你可以选择这个 GitHub 地址（<a href="https://github.com/pycontribs/jenkinsapi%EF%BC%89%E5%8E%BB%E4%B8%8B%E8%BD%BD%EF%BC%8C%E6%9C%89%E4%BA%86%E8%BF%99%E4%B8%AA" target="_blank" rel="noreferrer">https://github.com/pycontribs/jenkinsapi）去下载，有了这个</a> API 我们就可以通过本地的 Devops 工程来直接引用这些模块，对于 Jenkins 里面的 job 管理\\创建是非常方便的。</p><br><p>以上就是在 K8s 和 Docker 容器化的部署架构下，我认为 Jenkins 来做 CI\\CD 所需要具备的几点能力讲解。</p>',75);function A(f,v,I,K,D,S){const p=r("Image");return o(),l("div",null,[b,n(p,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7C/43/Cgq2xl58Pj2ARAUEAAECOYYrTH8534.png"}),i(),c,n(p,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7C/43/Cgq2xl58Pj2ASTTbAAPOlOYZ6DM633.png"}),i(),k,n(p,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7C/43/Cgq2xl58Pj2Af4yJAAGBiRwNohg190.png"}),i(),_,n(p,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7C/43/Cgq2xl58Pj6AO_1IAASzA5iuWew245.png"}),i(),h,d,u,n(p,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7C/43/Cgq2xl58Pj6AWo65AABvMXRVTog127.png"}),i(),J,m,P,g,C,n(p,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7C/43/Cgq2xl58Pj6ADKhZAAExRAaf_HA281.png"}),i(),j])}const E=t(a,[["render",A]]);export{y as __pageData,E as default};
