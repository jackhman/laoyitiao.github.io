import{_ as o,j as p,o as l,g as r,k as n,h as e,Q as s}from"./chunks/framework.e0c66c3f.js";const f=JSON.parse('{"title":"在线 Kubernetes 集群 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/113-Kubernetes 原理剖析与实战应用文档/(4520) 03  集群搭建：手把手教你玩转 Kubernete 集群搭建.md","filePath":"posts/backEnd/113-Kubernetes 原理剖析与实战应用文档/(4520) 03  集群搭建：手把手教你玩转 Kubernete 集群搭建.md","lastUpdated":1696338709000}'),t={name:"posts/backEnd/113-Kubernetes 原理剖析与实战应用文档/(4520) 03  集群搭建：手把手教你玩转 Kubernete 集群搭建.md"},c=s('<p>通过上一节课的学习，我们已经对 Kubernetes 的架构有了清楚的认识。但是到现在还没有和 Kubernetes 集群真正打过交道，所以你可能有一种&quot;不识庐山真面目&quot;的云里雾里的感觉。那么本节课，我们就来学习如何搭建 Kubernetes 集群，开启探索 Kubernetes 的第一站。</p><h3 id="在线-kubernetes-集群" tabindex="-1">在线 Kubernetes 集群 <a class="header-anchor" href="#在线-kubernetes-集群" aria-label="Permalink to &quot;在线 Kubernetes 集群&quot;">​</a></h3><p>这里，我先介绍一个在线的、免费的 Kubernetes 试用集群。如果你目前手头上没有闲置的物理资源，就可以通过自己的浏览器访问 <a href="https://www.katacoda.com/courses/kubernetes/playground" target="_blank" rel="noreferrer">Kubernetes Playground</a>，参照里面的说明去搭建。注意，这个集群仅仅可以用作自己的试用环境，千万别在里面保留你的重要数据，因为这个环境随时可能被销毁掉。</p><p>这个网站同时还提供了其他一些<a href="https://www.katacoda.com/courses/kubernetes" target="_blank" rel="noreferrer">交互课程</a>，方便你在线熟悉 Kubernetes 的方方面面。</p><p>所谓实践出真知，我更希望你能动手搭建一套线下环境，这里你是不是想问，自己搭建 Kubernetes 集群难吗？</p><h3 id="kubernetes-集群搭建难吗" tabindex="-1">Kubernetes 集群搭建难吗？ <a class="header-anchor" href="#kubernetes-集群搭建难吗" aria-label="Permalink to &quot;Kubernetes 集群搭建难吗？&quot;">​</a></h3><p>其实，搭建一个简单自用的 Kubernetes 集群还是比较简单的，只需要配置启动参数即可。但是想要搭建一个生产可用，而且相对安全的集群，可就没那么容易了。</p><p>为什么这么说？</p><p>对于一个分布式系统而言，要想达到生产可用，<strong>就必须要具备身份认证和权限授权能力</strong>。一般来说，各内部组件之间相互通信会采用自签名的 TLS 证书，通过 HTTPS 来加强安全访问。同时，为了能够确定各自的身份和权限，常常借助于 mTLS （mutual TLS，双向 TLS）认证。</p><p>现在，我们来回顾一下上一节课中提到的 Kubernetes 整体架构：</p>',10),y=s('<p>我们可以看到，Kubernetes 集群如果要生产可用，就需要签发一些证书，我们具体来看一下都需要哪些证书。</p><ul><li><p>etcd 集群内部各 member 之间需要一对 CA （Certificate Authority）用于签发证书，然后签发出一对 TLS 证书用于内部各 member 之间的数据互访和同步。</p></li><li><p>同时 etcd 集群需要对外暴露服务，方便 kube-apiserver 可以读写数据，这个时候就需要一对 CA 和 一对 TLS 证书。一般来说，为了方便，我们这里可以使用同一份 CA 证书来签发证书。</p></li><li><p>kube-apiserver 跟 etcd 集群之间的访问，我们也需要用 etcd 的 CA 证书，单独为 kube-apiserver 签发一对 TLS 证书。</p></li><li><p>Kubernetes 集群内部其他各组件，包括 kube-controller-manager、kube-scheduler、kubelet、kube-proxy 等，与 kube-apiserver 都需要安全访问，因此我们还需要一对 CA 证书，用于签发各个组件的 TLS 证书。同时 kube-apiserver 有时需要主动向 kubelet 发起连接，那么这里还需要为 kube-apiserver 签发一对 TLS 证书。</p></li></ul><p>可见要搭建一个生产可用的 Kubernetes 集群，到目前为止至少需要签发 2 份 CA 证书，8 份 TLS 证书。而实际上 Kubernetes 还支持很多其他的能力，比如 ServiceAccount、aggregation server 等，因此还需要签发更多的证书。</p><p>此外，每个组件自己也会单独对外暴露一些服务，比如本地的 Metrics 等，所以它们也需要一些 TLS 证书。</p><p>到这里，你可能也意识到了， Kubernetes 集群中有一个&quot;鸡生蛋，蛋生鸡&quot;的问题。那就是，我们应该先设置集群的权限还是先搭建集群呢？而且，在内部各组件接入时该怎么设置权限呢？</p><p>其实，在 Kubernetes 中，kube-apiserver 启动时会预设一些权限，用于各内部组件的接入访问。那么各个组件在签发证书时，就需要使用各自预设的 CN（Common Name）来标识自己的身份，比如 kube-scheduler 使用的 CN 是<code>system:kube-scheduler</code>。关于权限部分的能力，这里你先不用了解，我们在后面单独的章节会详细讲解。</p><p>到这里，我们就知道了证书的签发并不是那么随意，而想要从零开始搭建一套安全性高的集群，其难度远不止如此，我们这里还需要额外考虑到，譬如证书的有效期、过期替换、证书签发的密钥类型、签名算法等等问题。</p><p>除了证书签发外，搭建集群还要关注到各个组件的启动参数配置。在那么多的配置参数中，我们该关注哪些呢？</p><p>其实，我们可以借助一些工具，它们可以帮助我们轻松解决参数等集群搭建中会遇到的问题，使得搭建更容易，下面我就来为你介绍几种&quot;趁手&quot;的方法。</p><h3 id="常见的集群搭建方法" tabindex="-1">常见的集群搭建方法 <a class="header-anchor" href="#常见的集群搭建方法" aria-label="Permalink to &quot;常见的集群搭建方法&quot;">​</a></h3><p><strong>我们先来看</strong> <a href="https://github.com/kubernetes-sigs/kind" target="_blank" rel="noreferrer">Kind</a>，它的名字取自 Kubernetes IN Docker 的简写，Kind 最初仅仅是用来在 Docker 中搭建本地的 Kubernetes 开发测试环境。<strong>如果你本地没有太多的物理资源</strong> ，这个工具比较适合你。使用前，你可以通过<a href="https://docs.docker.com/engine/install/" target="_blank" rel="noreferrer">这个文档</a>安装 Docker；然后在<a href="https://kind.sigs.k8s.io/docs/user/quick-start" target="_blank" rel="noreferrer">官方文档</a>中有安装 kind 的指令，这里我就不赘述啦，你可以在其中了解它的详细使用方法和参数配置，安装的时候注意 kind 的版本号，以及其支持的 Kubernetes 版本。</p>',11),i=s('<p>（<a href="https://github.com/kubernetes-sigs/kind/blob/master/logo/logo.png" target="_blank" rel="noreferrer">https://github.com/kubernetes-sigs/kind/blob/master/logo/logo.png</a>）</p><p><strong>接下来我们来看一下</strong> <a href="https://github.com/kubernetes/minikube" target="_blank" rel="noreferrer">Minikube</a>，和 Kind 相比，Minikube 的功能就强大的多了。虽说两者都是用于搭建本地集群的，但是 minikube 支持虚拟化的能力。minikube 可以借助于本地的虚拟化能力，通过 <a href="https://minikube.sigs.k8s.io/docs/drivers/hyperkit/" target="_blank" rel="noreferrer">Hyperkit</a>、<a href="https://minikube.sigs.k8s.io/docs/drivers/hyperv/" target="_blank" rel="noreferrer">Hyper-V</a>、<a href="https://minikube.sigs.k8s.io/docs/drivers/kvm2/" target="_blank" rel="noreferrer">KVM</a>、<a href="https://minikube.sigs.k8s.io/docs/drivers/parallels/" target="_blank" rel="noreferrer">Parallels</a>、<a href="https://minikube.sigs.k8s.io/docs/drivers/podman/" target="_blank" rel="noreferrer">Podman</a>、<a href="https://minikube.sigs.k8s.io/docs/drivers/virtualbox/" target="_blank" rel="noreferrer">VirtualBox</a> 和 <a href="https://minikube.sigs.k8s.io/docs/drivers/vmware/" target="_blank" rel="noreferrer">VMWare</a> 等创建出虚拟机，然后在虚拟机中搭建出 Kubernetes 集群来。这里可以根据自己的实际情况，选择合适的 <a href="https://minikube.sigs.k8s.io/docs/drivers/" target="_blank" rel="noreferrer">driver</a>。</p>',2),E=s(`<p><a href="https://raw.githubusercontent.com/kubernetes/minikube/master/images/logo/logo.png" target="_blank" rel="noreferrer">https://raw.githubusercontent.com/kubernetes/minikube/master/images/logo/logo.png</a></p><p>当然，Minikube 也支持和 Kind 相似的能力，直接<a href="https://minikube.sigs.k8s.io/docs/drivers/docker/" target="_blank" rel="noreferrer">利用 Docker 创建集群</a>：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">minikube</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">start</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--driver=docker</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--imageRepository=registry.cn-hangzhou.aliyuncs.com/google_containers</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">--imageMirrorCountry=cn</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">minikube</span><span style="color:#24292E;"> </span><span style="color:#032F62;">start</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--driver=docker</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--imageRepository=registry.cn-hangzhou.aliyuncs.com/google_containers</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">--imageMirrorCountry=cn</span></span></code></pre></div><p>关于 Minikube 的其他命令方法，请查阅这份<a href="https://minikube.sigs.k8s.io/docs/handbook/controls/" target="_blank" rel="noreferrer">官方文档</a>。</p><p><strong>第三个是</strong> <a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/" target="_blank" rel="noreferrer">Kubeadm</a>，我想给你重点介绍一下它。这个工具是我平时使用最多，也是最推荐你去使用的。上面介绍的 Kind 和 Minikube 这两个工具主要是用于快速搭建本地的开发测试环境，没办法用来搭建生产集群。</p>`,5),u=s('<p>（<a href="https://raw.githubusercontent.com/kubernetes/kubeadm/master/logos/horizontal/color/kubeadm-horizontal-color.png" target="_blank" rel="noreferrer">https://raw.githubusercontent.com/kubernetes/kubeadm/master/logos/horizontal/color/kubeadm-horizontal-color.png</a>）</p><p>Kubeadm 是社区官方持续维护的集群搭建工具，在 Kubernertes v1.13 版本的时候就<a href="https://kubernetes.io/blog/2018/12/04/production-ready-kubernetes-cluster-creation-with-kubeadm/" target="_blank" rel="noreferrer">已经 GA 了</a>（GA 即 General Availability，指官方开始推荐广泛使用），它跟着 Kubernetes 的版本一起发布，目前 Kubeadm 代码放在 Kubernetes 的主代码库中。</p><p>看到这里，你是不是隐约觉得用 Kubeadm 搭建集群很靠谱，毕竟使用 Kubeadm 随时可以搭建出最新的集群。</p><p>没错！这是 Kubeadm 相比于其他集群搭建工具一个很大的&quot;杀手锏&quot;。其他的工具在 Kubernetes 新版本出来以后，都需要做相应的适配工作，开发周期基本上都要晚于社区 1~3 个月的时间。而且这些工具会用自己单独的版本号来标识，所以在使用时，需要额外地注意这些工具的版本跟 Kubernetes 的版本兼容度，很是&quot;令人头大&quot;。</p><p>当然 Kubeadm 的能力不止如此，它还有如下这些优势。</p><ul><li><p>使用 Kubeadm 可以快速搭建出符合<a href="https://www.cncf.io/certification/software-conformance/" target="_blank" rel="noreferrer">一致性测试认证</a>（Conformance Test）的集群。</p></li><li><p>Kubeadm 用户体验非常优秀，使用起来非常方便，并且可以用于搭建生产环境，支持<a href="https://kubernetes.io/zh/docs/setup/production-environment/tools/kubeadm/high-availability/" target="_blank" rel="noreferrer">搭建高可用集群</a>。</p></li><li><p>Kubeadm 的代码设计<strong>采用了可组合的模块方式</strong> ，所以你可以只使用 Kubeadm 的部分功能，比如使用 Kubeadm 帮你生成各个组件的证书，也可以基于 kubeadm 开发专属的集群部署工具，比如通过 Ansible 借助于 Kubeadm 的子功能来定制 Kubernetes 集群的搭建。你可以通过 <a href="https://kubernetes.io/zh/docs/reference/setup-tools/kubeadm/kubeadm-init-phase/" target="_blank" rel="noreferrer">Kubeadm init phase</a> 和 <a href="https://kubernetes.io/zh/docs/reference/setup-tools/kubeadm/kubeadm-join-phase/" target="_blank" rel="noreferrer">Kubeadm join phase</a>，去了解更多 Kubeadm 创建集群时内部各个子阶段的功能，并根据需要选择合适的子功能。</p></li><li><p>最为关键的是，<strong>Kubeadm 可以向下兼容低一个小版本的 Kubernetes</strong>，也就意味着，你可以用 v1.18.x 的 kubeadm 搭建 v1.17.y 版本的 Kubernetes。</p></li><li><p>同时<strong>kubeadm 还支持集群平滑升级到高版本</strong>，即你可以使用 v1.17.x 版本的 Kubeadm 将 v1.16.y 版本的 Kubernetes 集群升级到 v1.17.z。同理，你可以继续使用高版本的 Kubeadm 将你的集群一点点升到想要的版本上去。</p></li></ul><p>这里我给出了一张图，你可以看到，Kubeadm 在设计之初的定位就是只关心集群的 bootstrapping，并不负责物理资源的管理和申请。在集群 bootstrapping 搭建完成后，你可以根据自己的需要，在集群中部署自己的 add-on 组件，比如 CNI 插件、Dashboard 等。</p>',7),d=s(`<p>知道了这些，现在我们来详细说一下用 Kubeadm 如何搭建集群。</p><p>首先，参照官方文档<a href="https://kubernetes.io/zh/docs/setup/production-environment/tools/kubeadm/install-kubeadm/" target="_blank" rel="noreferrer">下载安装 Kubeadm 及依赖的组件</a>。然后运行<code>kubeadm init</code>在 master 节点上搭建出集群的控制面。</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kubeadm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">init</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--pod-network-cidr=10.244.0.0/16</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kubeadm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">init</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--pod-network-cidr=10.244.0.0/16</span></span></code></pre></div><p>如果你的 master 节点有多块网卡，可以通过参数 apiserver-advertise-address 来指定你想要暴露的服务地址，比如：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kubeadm</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">init</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--pod-network-cidr=10.244.0.0/16</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--apiserver-advertise-address=192.168.131.128</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kubeadm</span><span style="color:#24292E;"> </span><span style="color:#032F62;">init</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--pod-network-cidr=10.244.0.0/16</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--apiserver-advertise-address=192.168.131.128</span></span></code></pre></div><p>运行完成后，会出现下面这些信息告诉你安装成功，以及一些常规指令：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">Your Kubernetes control</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">plane has initialized successfully</span><span style="color:#F97583;">!</span></span>
<span class="line"><span style="color:#E1E4E8;">To start </span><span style="color:#F97583;">using</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">your</span><span style="color:#E1E4E8;"> cluster, </span><span style="color:#79B8FF;">you</span><span style="color:#E1E4E8;"> need to run the following as a regular user</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">mkdir</span><span style="color:#E1E4E8;"> -</span><span style="color:#B392F0;">p</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">$HOME</span><span style="color:#E1E4E8;">/.</span><span style="color:#B392F0;">kube</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">sudo</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">cp</span><span style="color:#E1E4E8;"> -</span><span style="color:#B392F0;">i</span><span style="color:#E1E4E8;"> /</span><span style="color:#B392F0;">etc</span><span style="color:#E1E4E8;">/</span><span style="color:#B392F0;">kubernetes</span><span style="color:#E1E4E8;">/</span><span style="color:#B392F0;">admin</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">conf</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">$HOME</span><span style="color:#E1E4E8;">/.</span><span style="color:#B392F0;">kube</span><span style="color:#E1E4E8;">/</span><span style="color:#B392F0;">config</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">sudo</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">chown</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;"> -</span><span style="color:#B392F0;">u</span><span style="color:#E1E4E8;">)</span><span style="color:#F97583;">:</span><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">id</span><span style="color:#E1E4E8;"> -</span><span style="color:#B392F0;">g</span><span style="color:#E1E4E8;">) </span><span style="color:#B392F0;">$HOME</span><span style="color:#E1E4E8;">/.</span><span style="color:#B392F0;">kube</span><span style="color:#E1E4E8;">/</span><span style="color:#B392F0;">config</span></span>
<span class="line"><span style="color:#B392F0;">You</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">should</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">now</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">deploy</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">a</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Pod</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">network</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">to</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">the</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">cluster</span><span style="color:#E1E4E8;">.</span></span>
<span class="line"><span style="color:#B392F0;">Run</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;kubectl apply -f [podnetwork].yaml&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">with</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">one</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">of</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">the</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">options</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">listed</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">at</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  /</span><span style="color:#B392F0;">docs</span><span style="color:#E1E4E8;">/</span><span style="color:#B392F0;">concepts</span><span style="color:#E1E4E8;">/</span><span style="color:#B392F0;">cluster</span><span style="color:#E1E4E8;">-</span><span style="color:#B392F0;">administration</span><span style="color:#E1E4E8;">/</span><span style="color:#B392F0;">addons</span><span style="color:#E1E4E8;">/</span></span>
<span class="line"><span style="color:#B392F0;">You</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">can</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">now</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">join</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">any</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">of</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">machines</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">by</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">running</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">the</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">following</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">on</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">each</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">node</span></span>
<span class="line"><span style="color:#B392F0;">as</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">root</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">kubeadm</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">join</span><span style="color:#E1E4E8;"> &lt;</span><span style="color:#B392F0;">control</span><span style="color:#E1E4E8;">-</span><span style="color:#B392F0;">plane</span><span style="color:#E1E4E8;">-</span><span style="color:#B392F0;">host</span><span style="color:#E1E4E8;">&gt;</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#B392F0;">control</span><span style="color:#E1E4E8;">-</span><span style="color:#B392F0;">plane</span><span style="color:#E1E4E8;">-</span><span style="color:#B392F0;">port</span><span style="color:#E1E4E8;">&gt; --</span><span style="color:#B392F0;">token</span><span style="color:#E1E4E8;"> &lt;</span><span style="color:#B392F0;">token</span><span style="color:#E1E4E8;">&gt; --</span><span style="color:#B392F0;">discovery</span><span style="color:#E1E4E8;">-</span><span style="color:#B392F0;">token</span><span style="color:#E1E4E8;">-</span><span style="color:#B392F0;">ca</span><span style="color:#E1E4E8;">-</span><span style="color:#B392F0;">cert</span><span style="color:#E1E4E8;">-</span><span style="color:#B392F0;">hash</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">sha256</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#B392F0;">hash</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">Your Kubernetes control</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">plane has initialized successfully</span><span style="color:#D73A49;">!</span></span>
<span class="line"><span style="color:#24292E;">To start </span><span style="color:#D73A49;">using</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">your</span><span style="color:#24292E;"> cluster, </span><span style="color:#005CC5;">you</span><span style="color:#24292E;"> need to run the following as a regular user</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">mkdir</span><span style="color:#24292E;"> -</span><span style="color:#6F42C1;">p</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">$HOME</span><span style="color:#24292E;">/.</span><span style="color:#6F42C1;">kube</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">sudo</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">cp</span><span style="color:#24292E;"> -</span><span style="color:#6F42C1;">i</span><span style="color:#24292E;"> /</span><span style="color:#6F42C1;">etc</span><span style="color:#24292E;">/</span><span style="color:#6F42C1;">kubernetes</span><span style="color:#24292E;">/</span><span style="color:#6F42C1;">admin</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">conf</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">$HOME</span><span style="color:#24292E;">/.</span><span style="color:#6F42C1;">kube</span><span style="color:#24292E;">/</span><span style="color:#6F42C1;">config</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">sudo</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">chown</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">$</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">id</span><span style="color:#24292E;"> -</span><span style="color:#6F42C1;">u</span><span style="color:#24292E;">)</span><span style="color:#D73A49;">:</span><span style="color:#6F42C1;">$</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">id</span><span style="color:#24292E;"> -</span><span style="color:#6F42C1;">g</span><span style="color:#24292E;">) </span><span style="color:#6F42C1;">$HOME</span><span style="color:#24292E;">/.</span><span style="color:#6F42C1;">kube</span><span style="color:#24292E;">/</span><span style="color:#6F42C1;">config</span></span>
<span class="line"><span style="color:#6F42C1;">You</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">should</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">now</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">deploy</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">a</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Pod</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">network</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">to</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">the</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">cluster</span><span style="color:#24292E;">.</span></span>
<span class="line"><span style="color:#6F42C1;">Run</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;kubectl apply -f [podnetwork].yaml&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">with</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">one</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">of</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">the</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">options</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">listed</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">at</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">  /</span><span style="color:#6F42C1;">docs</span><span style="color:#24292E;">/</span><span style="color:#6F42C1;">concepts</span><span style="color:#24292E;">/</span><span style="color:#6F42C1;">cluster</span><span style="color:#24292E;">-</span><span style="color:#6F42C1;">administration</span><span style="color:#24292E;">/</span><span style="color:#6F42C1;">addons</span><span style="color:#24292E;">/</span></span>
<span class="line"><span style="color:#6F42C1;">You</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">can</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">now</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">join</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">any</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">of</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">machines</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">by</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">running</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">the</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">following</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">on</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">each</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">node</span></span>
<span class="line"><span style="color:#6F42C1;">as</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">root</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">kubeadm</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">join</span><span style="color:#24292E;"> &lt;</span><span style="color:#6F42C1;">control</span><span style="color:#24292E;">-</span><span style="color:#6F42C1;">plane</span><span style="color:#24292E;">-</span><span style="color:#6F42C1;">host</span><span style="color:#24292E;">&gt;</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">control</span><span style="color:#24292E;">-</span><span style="color:#6F42C1;">plane</span><span style="color:#24292E;">-</span><span style="color:#6F42C1;">port</span><span style="color:#24292E;">&gt; --</span><span style="color:#6F42C1;">token</span><span style="color:#24292E;"> &lt;</span><span style="color:#6F42C1;">token</span><span style="color:#24292E;">&gt; --</span><span style="color:#6F42C1;">discovery</span><span style="color:#24292E;">-</span><span style="color:#6F42C1;">token</span><span style="color:#24292E;">-</span><span style="color:#6F42C1;">ca</span><span style="color:#24292E;">-</span><span style="color:#6F42C1;">cert</span><span style="color:#24292E;">-</span><span style="color:#6F42C1;">hash</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">sha256</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">&lt;</span><span style="color:#6F42C1;">hash</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>我们在 master 节点上拷贝一下 kubeconfig 文件到 kubectl 默认的 kubeconfig 路径下：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">mkdir -p $HOME/.kube</span></span>
<span class="line"><span style="color:#9ECBFF;">sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config</span></span>
<span class="line"><span style="color:#9ECBFF;">sudo chown $(id -u):$(id -g) $HOME/.kube/config</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">mkdir -p $HOME/.kube</span></span>
<span class="line"><span style="color:#032F62;">sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config</span></span>
<span class="line"><span style="color:#032F62;">sudo chown $(id -u):$(id -g) $HOME/.kube/config</span></span></code></pre></div><p>然后直接拷贝前面显示的<strong>kubeadm join</strong>命令 ，依次在各个 node 节点上运行将其加入集群中即可。</p><p>如果想要搭建生产环境，那么你可以参照这份<a href="https://kubernetes.io/zh/docs/setup/production-environment/tools/kubeadm/high-availability/" target="_blank" rel="noreferrer">官方文档</a>，去搭建一个高可用的集群，这里就不再赘述了。</p><p>除此之外，社区还有一些其他项目可以用来搭建集群，比如 <a href="https://github.com/kubernetes-sigs/kubespray" target="_blank" rel="noreferrer">kubespray</a> 和 <a href="https://github.com/kubernetes/kops" target="_blank" rel="noreferrer">kops</a>。其中 <a href="https://github.com/kubernetes-sigs/kubespray" target="_blank" rel="noreferrer">kubespray</a>是通过一堆 Ansible Playbook 来安装 Kubernetes 集群；而 <a href="https://github.com/kubernetes/kops" target="_blank" rel="noreferrer">kops</a> 使用起来就像 kubectl 一样方便，可以帮助你在各大公有云上搭建 Kubernetes 集群。目前 AWS（Amazon Web Services）官方支持最好的 GCE 和 Openstack 还在 beta 开发阶段。</p><p>好的，我们这样就完成了集群搭建，但其实这只是第一步，后续的运维和升级才是&quot;大 Boss&quot;。</p><h3 id="集群升级" tabindex="-1">集群升级 <a class="header-anchor" href="#集群升级" aria-label="Permalink to &quot;集群升级&quot;">​</a></h3><p>说道集群升级，我们先来了解一下目前社区的版本支持策略。</p><p>跟其他开源项目一样，目前 Kubernetes 社区并没有一个所谓的&quot;TLS 版本&quot;。Kubernetes 以 x.y.z 的格式来发布版本，其中 x 是主版本号（major version），y 是小版本号（minor version），而 z 是补丁版本号（patch version）。</p><p>Kubernetes 社区异常活跃，每隔三个月就会发布一个小版本，比如从 v1.18 到 v1.19。在这期间，还会有一些补丁版本的迭代在不停地发布，比如 v1.18.1、v1.18.2。每个补丁版本基本上只会涉及一些 bugfix 的工作，新功能都是随着小版本的更新而发布。</p><p>但是官方只会维护最新的三个小版本，比如目前最新的小版本是 v1.18，官方就只维护 v1.18、 v1.17 和 v1.16。至于还在使用 v1.15 版本的用户如果想得到社区的支持，就只能升级到 v1.16 版本了。而且如果 v1.19 版本发布了以后，还在使用 v1.16 版本的用户，也要开始考虑升级的问题了。</p><p>每一年 Kubernetes 都会发布四个版本，相比较于其他大的开源项目，版本迭代速度可以说非常快了。社区内部其实也有在讨论，要不要放慢版本的迭代速度，改为通用的一年两个小版本策略。不过，到目前为止，这个讨论结果还没有达成统一。</p><p>知道了这些，我们来看具体的升级策略，一般来说有三类。</p><p>第一种，永远升级到最高最新的版本。这个策略最激进，我不是特别推荐在生产环境中使用。一般每次新的小版本出来后，比如 v1.19.0，通常会带有一些新功能，也隐含着一些 bug，我们可以等后续对应的补丁版本出来后再升级。</p><p>第二种，每半年升级一次，这样会落后社区 1~2 个小版本。这是我个人比较推荐的做法，等到各个小版本的补丁版本稳定后，再对集群做升级操作，这样比较保险。</p><p>第三种，一年升级一次小版本，或者更长。这样会导致集群落后社区太多，毕竟一年内社区会发布 4 个小版本。</p><h4 id="集群升级的建议" tabindex="-1">集群升级的建议 <a class="header-anchor" href="#集群升级的建议" aria-label="Permalink to &quot;集群升级的建议&quot;">​</a></h4><p>现在，不少大厂都已经在 Kubernetes 集群中运行着实际的生产业务，而线上的这些业务对可用性的要求通常都非常高，有些场景也异常复杂。因此，即使最微小的集群变更也要非常小心，慎重操作，最好通过&quot;<strong>轮转+灰度</strong>&quot;的升级策略来逐个集群升级。</p><p>这样你就会发现，跟随社区版本频繁地进行升级其实很吃力，尤其集群规模比较大的时候，很多大厂其实也吃不消。这往往需要经过多轮的演练、测试，踩完一些&quot;坑&quot;以后，才敢在生产集群进行升级实操，正如上面所说，升级的版本要落后社区至少 1 到 2 个版本。升级的时候，还需要紧密配合监控大盘一起，及时&quot;止血&quot;，避免大规模的生产故障。</p><p>在这里，我想给你分享一些集群升级的注意事项。</p><ol><li><p>升级前请务必<strong>备份所有重要组件及数据</strong>，例如 etcd 的数据备份、各组件的启动配置等。关于集群的灾备，我们会放在后面的课程中来讲解。</p></li><li><p>千万<strong>不要跨小版本进行升级</strong>，比如直接把 Kubernetes 从 v1.16.x 的版本升到 v1.18.x 的版本。因为社区的一些 API 以及行为改动有些只会保留两个大版本，跨版本升级很容易导致集群故障。</p></li><li><p>注意<strong>观察容器的状态</strong>，避免引发某些有状态业务发生异常。在 v1.16 版本以前，升级的时候，如果 Pod spec 的哈希值已更改，则会引发 Pod 重建。关于 Pod 的一些定义和使用方法，我们会在下一节课中深入学习，这里你只要先了解这些就够了。</p></li></ol><p>这个 bug 在 v1.16 版本时候已经做了优化，即如果 Pod 是在 v1.16 版本以上创建的，在后续集群升级时，pod spec 的哈希值基本上会保持不变。但是如果 Pod 在低于 v1.16 版本之前创建的，那么每次集群升级时，如果 pod spec 的定义发生了变化，比如新增字段等，都会导致 spec 的哈希值发生变化。</p><p>一旦经过了 v1.16 版本的升级，比如从 v1.16 升到 v1.17，后面再次升级时就会避免这种情况了。</p><ol><li><p>每次升级之前，切记一定要<strong>认真阅读官方的 release note</strong>，重点关注中间的 highlight 说明，一般文档中会注明哪些变化会对集群升级产生影响。</p></li><li><p><strong>谨慎使用还在 alpha 阶段的功能</strong>。社区迭代的时候，这些 alpha 阶段的功能会随时发生变化，比如启动参数、配置方式、工作模式等等。甚至有些 alpha 阶段的功能会被下线掉。</p></li></ol><p>社区推荐的集群升级基本流程：先升级主控制平面节点，再升级其他控制平面节点，最后升级工作节点。</p><p>这里如果你是使用 Kubeadm 进行集群搭建的，可以参考这份社区官方的 <a href="https://kubernetes.io/zh/docs/tasks/administer-cluster/kubeadm/kubeadm-upgrade/" target="_blank" rel="noreferrer">Kubeadm 集群升级指南</a>。Kubeadm 在代码开发阶段中，会有对应的 CI 流水线负责验证集群的稳定升级能力。</p><h3 id="写在最后" tabindex="-1">写在最后 <a class="header-anchor" href="#写在最后" aria-label="Permalink to &quot;写在最后&quot;">​</a></h3><p>集群搭建只是第一步，重要的是后续集群的维护工作，比如集群组件宕机、集群版本升级等。所以选择合适的工具很重要，因为这可以很大程度降低升级的风险以及运维难度。最后我还想再强调一下，<strong>千万不要跨小版本进行升级</strong> ，<strong>要按小版本依次升上来</strong>。</p><p>下一节课，我们将深入学习 Kubernetes 的核心定义。如果你对本节课有什么想法或者疑问，欢迎你在留言区留言，我们一起讨论。</p>`,36);function b(g,h,k,F,m,C){const a=p("Image");return l(),r("div",null,[c,n(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/48/F9/Ciqc1F9ODKeAZpfbAAHPVgKdC98766.png"}),y,n(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/49/05/CgqCHl9ODL6AT7NmAADHwHBbdN8589.png"}),e(),i,n(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/49/05/CgqCHl9ODN2ABABqAAWTMYoqIPs597.png"}),e(),E,n(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/48/FA/Ciqc1F9ODPOAFmDaAAIPc4_Rx-E545.png"}),e(),u,n(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/49/05/CgqCHl9ODQyAV3kOAAUDNPm292s107.png"}),d])}const B=o(t,[["render",b]]);export{f as __pageData,B as default};
