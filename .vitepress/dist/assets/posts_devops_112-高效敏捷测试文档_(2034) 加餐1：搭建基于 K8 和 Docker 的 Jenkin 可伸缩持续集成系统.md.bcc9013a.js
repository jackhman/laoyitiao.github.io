import{_ as l,j as o,o as t,g as c,k as a,h as p,Q as e,s}from"./chunks/framework.e0c66c3f.js";const W=JSON.parse('{"title":"工作流程图","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(2034) 加餐1：搭建基于 K8 和 Docker 的 Jenkin 可伸缩持续集成系统.md","filePath":"posts/devops/112-高效敏捷测试文档/(2034) 加餐1：搭建基于 K8 和 Docker 的 Jenkin 可伸缩持续集成系统.md","lastUpdated":1696338709000}'),r={name:"posts/devops/112-高效敏捷测试文档/(2034) 加餐1：搭建基于 K8 和 Docker 的 Jenkin 可伸缩持续集成系统.md"},i=e('<p>根据前面用户的反馈，这里补充一个完整的动手实践的案例------搭建&quot;基于 K8s 和 Docker 的 Jenkins 可伸缩持续集成系统&quot;，让模块 3 所介绍的内容落地。</p><br><p>这部分内容比较多且非常具体，包括 4 大部分：</p><ul><li><p>Kubernetes （K8s）集群的部署，包括 kube-proxy、kubelet、docker 和 flanneld services 等安装；</p></li><li><p>企业级容器注册管理平台 Harbor 的安装部署，包括 Docker、Docker Compose 等安装；</p></li><li><p>采用 Jenkins pipeline 实现自动构建并部署至 K8s，包括建立 spring boot 示例工程、创建 Dockerfile 和 Jenkinsfile、配置 jenkins pipeline 任务和 K8s 的 kube.config 到最后测试 pipeline 任务等；</p></li><li><p>遇到的问题（坑）及解决方法，比如启动 Jenkins，安装插件出现&quot;无法连接服务器&quot;错误，运行 pipeline，出现 command not found 错误等几个问题的解决。</p></li></ul><br><p>这些具体的操作步骤经过了真实环境上的检验，最终整个基于 K8s 、Docker、Jenkins 的 CI 系统被成功部署起来。建议你按照下面介绍的详细步骤，自己亲自动手操作一回，功力会大增。</p><h1 id="工作流程图" tabindex="-1">工作流程图 <a class="header-anchor" href="#工作流程图" aria-label="Permalink to &quot;工作流程图&quot;">​</a></h1>',7),E=e(`<h1 id="系统配置" tabindex="-1"><strong>系统配置</strong> <a class="header-anchor" href="#系统配置" aria-label="Permalink to &quot;**系统配置**&quot;">​</a></h1><p>Harbor 仓库 CentOS7、4 核 CPU、16G 内存、160G 硬盘</p><ul><li>192.168.10.160 harbor</li></ul><p>集群 3 台机器，CentOS7、4 核 CPU、16G 内存、60G 硬盘</p><ul><li><p>192.168.10.161 k8s-master</p></li><li><p>192.168.10.162 k8s-node1</p></li><li><p>192.168.10.163 k8s-node2</p></li></ul><h1 id="kubernetes-集群部署" tabindex="-1"><strong>Kubernetes 集群部署</strong> <a class="header-anchor" href="#kubernetes-集群部署" aria-label="Permalink to &quot;**Kubernetes 集群部署**&quot;">​</a></h1><h2 id="安装前准备" tabindex="-1"><strong>安装前准备</strong> <a class="header-anchor" href="#安装前准备" aria-label="Permalink to &quot;**安装前准备**&quot;">​</a></h2><p>（1）关闭 firewalld 改用 iptables。输入以下命令，关闭 firewalld：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@master ~]# systemctl stop firewalld.service #停止firewall </span></span>
<span class="line"><span style="color:#E1E4E8;">[root@master ~]# systemctl disable firewalld.service #禁止firewall开机启动</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@master ~]# systemctl stop firewalld.service #停止firewall </span></span>
<span class="line"><span style="color:#24292E;">[root@master ~]# systemctl disable firewalld.service #禁止firewall开机启动</span></span></code></pre></div><br><p>（2）安装 ntp 服务：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@master ~]# yum install -y ntp wget net-tools </span></span>
<span class="line"><span style="color:#E1E4E8;">[root@master ~]# systemctl start ntpd </span></span>
<span class="line"><span style="color:#E1E4E8;">[root@master ~]# systemctl enable ntpd</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@master ~]# yum install -y ntp wget net-tools </span></span>
<span class="line"><span style="color:#24292E;">[root@master ~]# systemctl start ntpd </span></span>
<span class="line"><span style="color:#24292E;">[root@master ~]# systemctl enable ntpd</span></span></code></pre></div><h2 id="安装配置" tabindex="-1"><strong>安装配置</strong> <a class="header-anchor" href="#安装配置" aria-label="Permalink to &quot;**安装配置**&quot;">​</a></h2><p><strong>（1）安装 Kubernetes Master</strong></p><p>使用以下命令安装 kubernetes 和 etcd：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"># yum install -y kubernetes etcd</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"># yum install -y kubernetes etcd</span></span></code></pre></div><br><p>编辑 /etc/etcd/etcd.conf 使 etcd 监听所有的 IP 地址，确保下列行没有注释，并修改为下面的值：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@master ~]# cat /etc/etcd/etcd.conf </span></span>
<span class="line"><span style="color:#E1E4E8;">ETCD_LISTEN_CLIENT_URLS=&quot;http://0.0.0.0:2379&quot; </span></span>
<span class="line"><span style="color:#E1E4E8;">#[cluster] </span></span>
<span class="line"><span style="color:#E1E4E8;">ETCD_ADVERTISE_CLIENT_URLS=&quot;http://192.168.10.161:2379&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@master ~]# cat /etc/etcd/etcd.conf </span></span>
<span class="line"><span style="color:#24292E;">ETCD_LISTEN_CLIENT_URLS=&quot;http://0.0.0.0:2379&quot; </span></span>
<span class="line"><span style="color:#24292E;">#[cluster] </span></span>
<span class="line"><span style="color:#24292E;">ETCD_ADVERTISE_CLIENT_URLS=&quot;http://192.168.10.161:2379&quot;</span></span></code></pre></div><br><p>编辑 Kubernetes API server 的配置文件 /etc/kubernetes/apiserver，确保下列行没有被注释，并设置合适的值：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@master ~]# cat /etc/kubernetes/apiserver</span></span>
<span class="line"><span style="color:#E1E4E8;">###</span></span>
<span class="line"><span style="color:#E1E4E8;"># kubernetes system config</span></span>
<span class="line"><span style="color:#E1E4E8;">#</span></span>
<span class="line"><span style="color:#E1E4E8;"># The following values are used to configure the kube-apiserver</span></span>
<span class="line"><span style="color:#E1E4E8;">#</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"># The address on the local server to listen to.</span></span>
<span class="line"><span style="color:#E1E4E8;">KUBE_API_ADDRESS=&quot;--address=0.0.0.0&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"># The port on the local server to listen on.</span></span>
<span class="line"><span style="color:#E1E4E8;">KUBE_API_PORT=&quot;--port=8080&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"># Port minions listen on</span></span>
<span class="line"><span style="color:#E1E4E8;">KUBELET_PORT=&quot;--kubelet_port=10250&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"># Comma separated list of nodes in the etcd cluster</span></span>
<span class="line"><span style="color:#E1E4E8;">KUBE_ETCD_SERVERS=&quot;--etcd_servers=http://192.168.10.161:2379&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"># Address range to use for services</span></span>
<span class="line"><span style="color:#E1E4E8;">KUBE_SERVICE_ADDRESSES=&quot;--service-cluster-ip-range=10.254.0.0/16&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"># default admission control policies</span></span>
<span class="line"><span style="color:#E1E4E8;">KUBE_ADMISSION_CONTROL=&quot;--admission_control=NamespaceLifecycle,NamespaceExists,LimitRanger,SecurityContextDeny,ServiceAccount,ResourceQuota&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"># Add your own!</span></span>
<span class="line"><span style="color:#E1E4E8;">KUBE_API_A</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@master ~]# cat /etc/kubernetes/apiserver</span></span>
<span class="line"><span style="color:#24292E;">###</span></span>
<span class="line"><span style="color:#24292E;"># kubernetes system config</span></span>
<span class="line"><span style="color:#24292E;">#</span></span>
<span class="line"><span style="color:#24292E;"># The following values are used to configure the kube-apiserver</span></span>
<span class="line"><span style="color:#24292E;">#</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"># The address on the local server to listen to.</span></span>
<span class="line"><span style="color:#24292E;">KUBE_API_ADDRESS=&quot;--address=0.0.0.0&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"># The port on the local server to listen on.</span></span>
<span class="line"><span style="color:#24292E;">KUBE_API_PORT=&quot;--port=8080&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"># Port minions listen on</span></span>
<span class="line"><span style="color:#24292E;">KUBELET_PORT=&quot;--kubelet_port=10250&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"># Comma separated list of nodes in the etcd cluster</span></span>
<span class="line"><span style="color:#24292E;">KUBE_ETCD_SERVERS=&quot;--etcd_servers=http://192.168.10.161:2379&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"># Address range to use for services</span></span>
<span class="line"><span style="color:#24292E;">KUBE_SERVICE_ADDRESSES=&quot;--service-cluster-ip-range=10.254.0.0/16&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"># default admission control policies</span></span>
<span class="line"><span style="color:#24292E;">KUBE_ADMISSION_CONTROL=&quot;--admission_control=NamespaceLifecycle,NamespaceExists,LimitRanger,SecurityContextDeny,ServiceAccount,ResourceQuota&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"># Add your own!</span></span>
<span class="line"><span style="color:#24292E;">KUBE_API_A</span></span></code></pre></div><br><p>启动 etcd、kube-apiserver、kube-controller-manager and kube-scheduler 服务，并设置开机自启：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@master ~]# cat /script/kubenetes_service.sh</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">for SERVICES in etcd kube-apiserver kube-controller-manager kube-scheduler; do </span></span>
<span class="line"><span style="color:#E1E4E8;">    systemctl restart $SERVICES</span></span>
<span class="line"><span style="color:#E1E4E8;">    systemctl enable $SERVICES</span></span>
<span class="line"><span style="color:#E1E4E8;">    systemctl status $SERVICES </span></span>
<span class="line"><span style="color:#E1E4E8;">done</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@master ~]# sh /script/kubenetes_service.sh</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@master ~]# cat /script/kubenetes_service.sh</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">for SERVICES in etcd kube-apiserver kube-controller-manager kube-scheduler; do </span></span>
<span class="line"><span style="color:#24292E;">    systemctl restart $SERVICES</span></span>
<span class="line"><span style="color:#24292E;">    systemctl enable $SERVICES</span></span>
<span class="line"><span style="color:#24292E;">    systemctl status $SERVICES </span></span>
<span class="line"><span style="color:#24292E;">done</span></span>
<span class="line"><span style="color:#24292E;">[root@master ~]# sh /script/kubenetes_service.sh</span></span></code></pre></div><br><p>在 etcd 中定义 flannel network 的配置，这些配置会被 flannel service 下发到 nodes 中：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@master ~]# etcdctl mk /centos.com/network/config &#39;{&quot;Network&quot;:&quot;172.17.0.0/16&quot;}&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@master ~]# etcdctl mk /centos.com/network/config &#39;{&quot;Network&quot;:&quot;172.17.0.0/16&quot;}&#39;</span></span></code></pre></div><br><p>添加 iptables 规则，打开相应的端口：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@master ~]# iptables -I INPUT -p tcp --dport 2379 -j ACCEPT</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@master ~]# iptables -I INPUT -p tcp --dport 10250 -j ACCEPT</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@master ~]# iptables -I INPUT -p tcp --dport 8080 -j ACCEPT </span></span>
<span class="line"><span style="color:#E1E4E8;">[root@master ~]# iptables-save</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@master ~]# iptables -I INPUT -p tcp --dport 2379 -j ACCEPT</span></span>
<span class="line"><span style="color:#24292E;">[root@master ~]# iptables -I INPUT -p tcp --dport 10250 -j ACCEPT</span></span>
<span class="line"><span style="color:#24292E;">[root@master ~]# iptables -I INPUT -p tcp --dport 8080 -j ACCEPT </span></span>
<span class="line"><span style="color:#24292E;">[root@master ~]# iptables-save</span></span></code></pre></div><br><p>或者写入 iptables 配置文件 /etc/sysconfig/iptables。</p><br><p>查看节点信息（我们还没有配置节点信息，所以这里应该为空）：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@master ~]# kubectl get nodes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">NAME LABELS STATUS</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@master ~]# kubectl get nodes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">NAME LABELS STATUS</span></span></code></pre></div><br><p><strong>（2）安装 Kubernetes Nodes</strong></p><p>注：下面这些步骤应该在 node1 和 node2 上执行（也可以添加更多的 node）。</p><br><p>使用 yum 安装 kubernetes 和 flannel：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@slave1 ~]# yum install -y flannel kubernetes</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@slave1 ~]# yum install -y flannel kubernetes</span></span></code></pre></div><br><p>为 flannel service 配置 etcd 服务器，编辑 /etc/sysconfig/flanneld 文件中的下列行以连接到 master：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@slave1 ~]# cat /etc/sysconfig/flanneld</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">FLANNEL_ETCD=&quot;http://192.168.10.161:2379&quot; #改为etcd服务器的ip</span></span>
<span class="line"><span style="color:#E1E4E8;">FLANNEL_ETCD_PREFIX=&quot;/centos.com/network&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@slave1 ~]# cat /etc/sysconfig/flanneld</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">FLANNEL_ETCD=&quot;http://192.168.10.161:2379&quot; #改为etcd服务器的ip</span></span>
<span class="line"><span style="color:#24292E;">FLANNEL_ETCD_PREFIX=&quot;/centos.com/network&quot;</span></span></code></pre></div><br><p>编辑 /etc/kubernetes/config 中 kubernetes 的默认配置，以确保 KUBE_MASTER 的值连接到 Kubernetes master API server：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@slave1 ~]# cat /etc/kubernetes/config</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">KUBE_MASTER=&quot;--master=http://192.168.10.161:8080&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@slave1 ~]# cat /etc/kubernetes/config</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">KUBE_MASTER=&quot;--master=http://192.168.10.161:8080&quot;</span></span></code></pre></div><br><p>编辑 /etc/kubernetes/kubelet 中五个参数的值：</p><br><p>node1：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@slave1 ~]# cat /etc/kubernetes/kubelet</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">KUBELET_ADDRESS=&quot;--address=0.0.0.0&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">KUBELET_PORT=&quot;--port=10250&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">KUBELET_HOSTNAME=&quot;--hostname_override=192.168.10.162&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">KUBELET_API_SERVER=&quot;--api_servers=http://192.168.10.161:8080&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">KUBELET_ARGS=&quot;&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@slave1 ~]# cat /etc/kubernetes/kubelet</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">KUBELET_ADDRESS=&quot;--address=0.0.0.0&quot;</span></span>
<span class="line"><span style="color:#24292E;">KUBELET_PORT=&quot;--port=10250&quot;</span></span>
<span class="line"><span style="color:#24292E;">KUBELET_HOSTNAME=&quot;--hostname_override=192.168.10.162&quot;</span></span>
<span class="line"><span style="color:#24292E;">KUBELET_API_SERVER=&quot;--api_servers=http://192.168.10.161:8080&quot;</span></span>
<span class="line"><span style="color:#24292E;">KUBELET_ARGS=&quot;&quot;</span></span></code></pre></div><br><p>node2：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@slave2 ~]# cat /etc/kubernetes/kubelet</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">KUBELET_ADDRESS=&quot;--address=0.0.0.0&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">KUBELET_PORT=&quot;--port=10250&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">KUBELET_HOSTNAME=&quot;--hostname_override=192.168.10.163&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">KUBELET_API_SERVER=&quot;--api_servers=http://192.168.10.161:8080&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">KUBELET_ARGS=&quot;&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@slave2 ~]# cat /etc/kubernetes/kubelet</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">KUBELET_ADDRESS=&quot;--address=0.0.0.0&quot;</span></span>
<span class="line"><span style="color:#24292E;">KUBELET_PORT=&quot;--port=10250&quot;</span></span>
<span class="line"><span style="color:#24292E;">KUBELET_HOSTNAME=&quot;--hostname_override=192.168.10.163&quot;</span></span>
<span class="line"><span style="color:#24292E;">KUBELET_API_SERVER=&quot;--api_servers=http://192.168.10.161:8080&quot;</span></span>
<span class="line"><span style="color:#24292E;">KUBELET_ARGS=&quot;&quot;</span></span></code></pre></div><br><p>启动 kube-proxy、kubelet、docker 和 flanneld services 服务，并设置开机自启：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@slave1 ~]# cat /script/kubernetes_node_service.sh</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">for SERVICES in kube-proxy kubelet docker flanneld; do </span></span>
<span class="line"><span style="color:#E1E4E8;">systemctl restart $SERVICES</span></span>
<span class="line"><span style="color:#E1E4E8;">systemctl enable $SERVICES</span></span>
<span class="line"><span style="color:#E1E4E8;">systemctl status $SERVICES </span></span>
<span class="line"><span style="color:#E1E4E8;">done</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@slave1 ~]# cat /script/kubernetes_node_service.sh</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">for SERVICES in kube-proxy kubelet docker flanneld; do </span></span>
<span class="line"><span style="color:#24292E;">systemctl restart $SERVICES</span></span>
<span class="line"><span style="color:#24292E;">systemctl enable $SERVICES</span></span>
<span class="line"><span style="color:#24292E;">systemctl status $SERVICES </span></span>
<span class="line"><span style="color:#24292E;">done</span></span></code></pre></div><br><p>在每个 node 节点上，你应当注意到有两块新的网卡 docker0 和 flannel0，应该得到不同的 IP 地址范围在 flannel0 上，就像下面这样：</p><br><p>node1：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@slave1 ~]# ip a | grep docker | grep inet</span></span>
<span class="line"><span style="color:#E1E4E8;">inet 172.17.0.1/16 scope global docker0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@slave1 ~]# ip a | grep docker | grep inet</span></span>
<span class="line"><span style="color:#24292E;">inet 172.17.0.1/16 scope global docker0</span></span></code></pre></div><br><p>node2：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@slave2 ~]# ip a | grep docker | grep inet</span></span>
<span class="line"><span style="color:#E1E4E8;">inet 172.17.60.0/16 scope global docker0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@slave2 ~]# ip a | grep docker | grep inet</span></span>
<span class="line"><span style="color:#24292E;">inet 172.17.60.0/16 scope global docker0</span></span></code></pre></div><br><p>添加 iptables 规则：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@slave1 ~]# iptables -I INPUT -p tcp --dport 2379 -j ACCEPT</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@slave1 ~]# iptables -I INPUT -p tcp --dport 10250 -j ACCEPT</span></span>
<span class="line"><span style="color:#E1E4E8;">[root@slave1 ~]# iptables -I INPUT -p tcp --dport 8080 -j ACCEPT</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@slave1 ~]# iptables -I INPUT -p tcp --dport 2379 -j ACCEPT</span></span>
<span class="line"><span style="color:#24292E;">[root@slave1 ~]# iptables -I INPUT -p tcp --dport 10250 -j ACCEPT</span></span>
<span class="line"><span style="color:#24292E;">[root@slave1 ~]# iptables -I INPUT -p tcp --dport 8080 -j ACCEPT</span></span></code></pre></div><br><p>现在登录 kubernetes master 节点验证 minions 的节点状态：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[root@master ~]# kubectl get nodes</span></span>
<span class="line"><span style="color:#E1E4E8;">NAME           STATUS    AGE</span></span>
<span class="line"><span style="color:#E1E4E8;">192.168.10.162   Ready     2h</span></span>
<span class="line"><span style="color:#E1E4E8;">192.168.10.163   Ready     2h</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[root@master ~]# kubectl get nodes</span></span>
<span class="line"><span style="color:#24292E;">NAME           STATUS    AGE</span></span>
<span class="line"><span style="color:#24292E;">192.168.10.162   Ready     2h</span></span>
<span class="line"><span style="color:#24292E;">192.168.10.163   Ready     2h</span></span></code></pre></div><br><p>至此，Kubernetes 集群已经配置并运行了，然后我们继续下面的步骤。</p><h1 id="harbor-安装部署" tabindex="-1"><strong>Harbor 安装部署</strong> <a class="header-anchor" href="#harbor-安装部署" aria-label="Permalink to &quot;**Harbor 安装部署**&quot;">​</a></h1><p>Harbor 是 VMWare 公司开源的企业级 Docker Registry 项目，项目地址是<a href="https://github.com/goharbor/harbor" target="_blank" rel="noreferrer">https://github.com/goharbor/harbor</a>。</p><h2 id="下载离线安装包" tabindex="-1"><strong>下载离线安装包</strong> <a class="header-anchor" href="#下载离线安装包" aria-label="Permalink to &quot;**下载离线安装包**&quot;">​</a></h2><p>下载地址 <a href="https://github.com/goharbor/harbor/releases" target="_blank" rel="noreferrer">https://github.com/goharbor/harbor/releases</a>。</p><br>`,99),d=s("br",null,null,-1),u=s("p",null,"机器配置要求：",-1),y=s("br",null,null,-1),h=e(`<br><p>将下载的安装包上传到服务器，运行以下命令解压：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">tar zxvf harbor-offline-installer-v1.10.1.tgz</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">tar zxvf harbor-offline-installer-v1.10.1.tgz</span></span></code></pre></div><h2 id="安装-docker" tabindex="-1"><strong>安装 Docker</strong> <a class="header-anchor" href="#安装-docker" aria-label="Permalink to &quot;**安装 Docker**&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"># 安装依赖包</span></span>
<span class="line"><span style="color:#E1E4E8;">yum install -y yum-utils device-mapper-persistent-data lvm2</span></span>
<span class="line"><span style="color:#E1E4E8;"># 添加Docker软件包源</span></span>
<span class="line"><span style="color:#E1E4E8;">yum-config-manager \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    --add-repo \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    https://download.docker.com/linux/centos/docker-ce.repo</span></span>
<span class="line"><span style="color:#E1E4E8;"># 安装Docker CE</span></span>
<span class="line"><span style="color:#E1E4E8;">yum install -y docker-ce</span></span>
<span class="line"><span style="color:#E1E4E8;"># 启动Docker服务并设置开机启动</span></span>
<span class="line"><span style="color:#E1E4E8;">systemctl start docker</span></span>
<span class="line"><span style="color:#E1E4E8;">systemctl enable docker</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"># 安装依赖包</span></span>
<span class="line"><span style="color:#24292E;">yum install -y yum-utils device-mapper-persistent-data lvm2</span></span>
<span class="line"><span style="color:#24292E;"># 添加Docker软件包源</span></span>
<span class="line"><span style="color:#24292E;">yum-config-manager \\</span></span>
<span class="line"><span style="color:#24292E;">    --add-repo \\</span></span>
<span class="line"><span style="color:#24292E;">    https://download.docker.com/linux/centos/docker-ce.repo</span></span>
<span class="line"><span style="color:#24292E;"># 安装Docker CE</span></span>
<span class="line"><span style="color:#24292E;">yum install -y docker-ce</span></span>
<span class="line"><span style="color:#24292E;"># 启动Docker服务并设置开机启动</span></span>
<span class="line"><span style="color:#24292E;">systemctl start docker</span></span>
<span class="line"><span style="color:#24292E;">systemctl enable docker</span></span></code></pre></div><h2 id="安装-docker-compose" tabindex="-1"><strong>安装 docker-compose</strong> <a class="header-anchor" href="#安装-docker-compose" aria-label="Permalink to &quot;**安装 docker-compose**&quot;">​</a></h2><p>Docker Compose 是 Docker 提供的一个命令行工具，用来定义和运行由多个容器组成的应用。使用 compose，我们可以通过 YAML 文件声明式的定义应用程序的各个服务，并由单个命令完成应用的创建和启动。</p><br><p>执行以下命令进行安装：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">yum install epel-release </span></span>
<span class="line"><span style="color:#E1E4E8;">yum install -y python-pip </span></span>
<span class="line"><span style="color:#E1E4E8;">pip install docker-compose </span></span>
<span class="line"><span style="color:#E1E4E8;">yum install git</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">yum install epel-release </span></span>
<span class="line"><span style="color:#24292E;">yum install -y python-pip </span></span>
<span class="line"><span style="color:#24292E;">pip install docker-compose </span></span>
<span class="line"><span style="color:#24292E;">yum install git</span></span></code></pre></div><h2 id="harbor-安装与配置" tabindex="-1"><strong>Harbor 安装与配置</strong> <a class="header-anchor" href="#harbor-安装与配置" aria-label="Permalink to &quot;**Harbor 安装与配置**&quot;">​</a></h2><p>修改 harbor.yml：</p><ul><li><p>hostname 这里设置本机的 IP</p></li><li><p>harbor_admin_password web 页面的密码</p></li></ul><p>运行：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">sh ./install.sh</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">sh ./install.sh</span></span></code></pre></div><br><p>访问页面 <a href="http://10.220.224.160/" target="_blank" rel="noreferrer">http://192.168.10.160/</a>：</p><br>`,21),g=e(`<h2 id="docker-主机访问-harbor" tabindex="-1"><strong>Docker 主机访问 Harbor</strong> <a class="header-anchor" href="#docker-主机访问-harbor" aria-label="Permalink to &quot;**Docker 主机访问 Harbor**&quot;">​</a></h2><p>在另外一个服务器（client）登录 Harbor：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"># docker login 192.168.10.160</span></span>
<span class="line"><span style="color:#E1E4E8;">Username: admin</span></span>
<span class="line"><span style="color:#E1E4E8;">Password: </span></span>
<span class="line"><span style="color:#E1E4E8;">Error response from daemon: Get https:// 192.168.10.160/v2/: dial tcp 192.168.10.160:443: connect: connection refused</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"># docker login 192.168.10.160</span></span>
<span class="line"><span style="color:#24292E;">Username: admin</span></span>
<span class="line"><span style="color:#24292E;">Password: </span></span>
<span class="line"><span style="color:#24292E;">Error response from daemon: Get https:// 192.168.10.160/v2/: dial tcp 192.168.10.160:443: connect: connection refused</span></span></code></pre></div><br><p>这是因为 docker1.3.2 版本开始默认 docker registry 使用的是 https，我们设置 Harbor 默认为 http 方式，所以当执行用 docker login、pull、push 等命令操作而非 https 的 docker regsitry 的时就会报错。</p><p><strong>解决 https</strong></p><p>在 harbor 那台服务器上，其安装目录：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">vi docker-compose.yml</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">vi docker-compose.yml</span></span></code></pre></div><br>`,11),b=e(`<br><p><strong>修改 ports 信息</strong></p><br><p>然后我们执行：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">docker-compose stop</span></span>
<span class="line"><span style="color:#E1E4E8;">./install.sh</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">docker-compose stop</span></span>
<span class="line"><span style="color:#24292E;">./install.sh</span></span></code></pre></div><br><p>然后同时编辑 harbor 和 client 的 docker 配置文件：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"># 1.</span></span>
<span class="line"><span style="color:#E1E4E8;">vim /etc/docker/daemon.json</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;"> &quot;insecure-registries&quot;: [&quot;192.168.10.160&quot;]</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;"># 2.添加ExecStart=/usr/bin/dockerd |--insecure-registry=192.168.10.160</span></span>
<span class="line"><span style="color:#E1E4E8;">vim /usr/lib/systemd/system/docker.service</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;"># 把这行注释掉,添加下面的配置 ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock</span></span>
<span class="line"><span style="color:#E1E4E8;">ExecStart=/usr/bin/dockerd</span></span>
<span class="line"><span style="color:#E1E4E8;">  |--insecure-registry=192.168.10.160</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"># 1.</span></span>
<span class="line"><span style="color:#24292E;">vim /etc/docker/daemon.json</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;"> &quot;insecure-registries&quot;: [&quot;192.168.10.160&quot;]</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;"># 2.添加ExecStart=/usr/bin/dockerd |--insecure-registry=192.168.10.160</span></span>
<span class="line"><span style="color:#24292E;">vim /usr/lib/systemd/system/docker.service</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;"># 把这行注释掉,添加下面的配置 ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock</span></span>
<span class="line"><span style="color:#24292E;">ExecStart=/usr/bin/dockerd</span></span>
<span class="line"><span style="color:#24292E;">  |--insecure-registry=192.168.10.160</span></span></code></pre></div><br><ol><li>重启 docker</li></ol><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">systemctl daemon-reload</span></span>
<span class="line"><span style="color:#E1E4E8;">systemctl restart docker</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">systemctl daemon-reload</span></span>
<span class="line"><span style="color:#24292E;">systemctl restart docker</span></span></code></pre></div><br><p>2.重启 harbor 的 docker-compose，命令如下：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">docker-compose restart</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">docker-compose restart</span></span></code></pre></div><p><strong>client 登录仓库</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"># docker login 192.168.10.160</span></span>
<span class="line"><span style="color:#E1E4E8;">Username: admin</span></span>
<span class="line"><span style="color:#E1E4E8;">Password: </span></span>
<span class="line"><span style="color:#E1E4E8;">Login Succeeded</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"># docker login 192.168.10.160</span></span>
<span class="line"><span style="color:#24292E;">Username: admin</span></span>
<span class="line"><span style="color:#24292E;">Password: </span></span>
<span class="line"><span style="color:#24292E;">Login Succeeded</span></span></code></pre></div><h1 id="采用-jenkins-pipeline-实现自动构建并部署至-k8s" tabindex="-1"><strong>采用 jenkins pipeline 实现自动构建并部署至 K8s</strong> <a class="header-anchor" href="#采用-jenkins-pipeline-实现自动构建并部署至-k8s" aria-label="Permalink to &quot;**采用 jenkins pipeline 实现自动构建并部署至 K8s**&quot;">​</a></h1><h2 id="部署-jenkins" tabindex="-1">部署 jenkins <a class="header-anchor" href="#部署-jenkins" aria-label="Permalink to &quot;部署 jenkins&quot;">​</a></h2><p>这里采用 yum install 的方式部署 jenkins。</p><br><p>（1）安装JDK：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">yum install -y java</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">yum install -y java</span></span></code></pre></div><br><p>（2）安装 jenkins</p><br><p>添加 Jenkins 库到 yum 库，Jenkins 将从这里下载安装。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">wget -O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins-ci.org/redhat/jenkins.repo</span></span>
<span class="line"><span style="color:#E1E4E8;">rpm --import https://jenkins-ci.org/redhat/jenkins-ci.org.key</span></span>
<span class="line"><span style="color:#E1E4E8;">yum install -y Jenkins</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">wget -O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins-ci.org/redhat/jenkins.repo</span></span>
<span class="line"><span style="color:#24292E;">rpm --import https://jenkins-ci.org/redhat/jenkins-ci.org.key</span></span>
<span class="line"><span style="color:#24292E;">yum install -y Jenkins</span></span></code></pre></div><br><p>（3）配置 jenkis 的端口：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">vi /etc/sysconfig/jenkins</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">vi /etc/sysconfig/jenkins</span></span></code></pre></div><br><p>找到修改端口号：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">JENKINS_PORT=&quot;8085&quot;  此端口不冲突可以不修改</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">JENKINS_PORT=&quot;8085&quot;  此端口不冲突可以不修改</span></span></code></pre></div><br><p>（4）启动 jenkins：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">service jenkins start/stop/restart</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">service jenkins start/stop/restart</span></span></code></pre></div><br><p>（5）访问 <a href="http://localhost:8085" target="_blank" rel="noreferrer">http://localhost:8085</a> 地址，等待出现下面解锁 jenkins 界面：</p><br>`,48),k=e(`<br><p>（6）在上图提示的密码文件中复制自动生成的密码。</p><p>（7）在解锁 jenkins 页面，粘贴密码并继续。</p><p>（8）解锁 jenkins 后，在界面中选择&quot;安装建议的插件&quot; 选项。</p><p>（9）最后，jenkins 要求创建管理员用户，创建新用户或使用 admin 用户，按照步骤完成后即可登录并使用 jenkis 了。</p><h2 id="准备-java-示例工程" tabindex="-1">准备 java 示例工程 <a class="header-anchor" href="#准备-java-示例工程" aria-label="Permalink to &quot;准备 java 示例工程&quot;">​</a></h2><p>下面新建 spring boot 示例工程，示例工程的代码地址为：<a href="https://github.com/gemedia/docker-demo" target="_blank" rel="noreferrer">https://github.com/gemedia/docker-demo</a>。</p><h3 id="创建-spring-boot-示例工程" tabindex="-1">创建 spring boot 示例工程 <a class="header-anchor" href="#创建-spring-boot-示例工程" aria-label="Permalink to &quot;创建 spring boot 示例工程&quot;">​</a></h3><p>（1）生成 spring boot 基础工程，添加一个示例 Controller 类。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">package com.docker.demo.controller;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">import org.springframework.web.bind.annotation.GetMapping;</span></span>
<span class="line"><span style="color:#E1E4E8;">import org.springframework.web.bind.annotation.RestController;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">@RestController</span></span>
<span class="line"><span style="color:#E1E4E8;">public class TestController {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @GetMapping(&quot;&quot;)</span></span>
<span class="line"><span style="color:#E1E4E8;">    public String hello() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return &quot;Hello!&quot;;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">package com.docker.demo.controller;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">import org.springframework.web.bind.annotation.GetMapping;</span></span>
<span class="line"><span style="color:#24292E;">import org.springframework.web.bind.annotation.RestController;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">@RestController</span></span>
<span class="line"><span style="color:#24292E;">public class TestController {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @GetMapping(&quot;&quot;)</span></span>
<span class="line"><span style="color:#24292E;">    public String hello() {</span></span>
<span class="line"><span style="color:#24292E;">        return &quot;Hello!&quot;;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span></code></pre></div><br><p>（2）修改 application 配置文件，设置端口。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">spring.application.name=docker-demo</span></span>
<span class="line"><span style="color:#E1E4E8;">server.port=40080</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">spring.application.name=docker-demo</span></span>
<span class="line"><span style="color:#24292E;">server.port=40080</span></span></code></pre></div><br><p>（3）编译运行，访问 <a href="https://links.jianshu.com/go?to=http%3A%2F%2Flocalhost%3A40080" target="_blank" rel="noreferrer">http://localhost:40080</a> 地址可以看到示例运行结果。</p><br>`,18),m=e(`<h3 id="添加-dockerfile" tabindex="-1">添加 Dockerfile <a class="header-anchor" href="#添加-dockerfile" aria-label="Permalink to &quot;添加 Dockerfile&quot;">​</a></h3><p>在工程根目录创建 Dockerfile，用来构建 docker 镜像，其中 \${JAR_FILE} 参数在 pipeline 执行 docker build 时，通过 build-arg 参数传入。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">FROM openjdk:8-jdk-alpine</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">#构建参数</span></span>
<span class="line"><span style="color:#E1E4E8;">ARG JAR_FILE</span></span>
<span class="line"><span style="color:#E1E4E8;">ARG WORK_PATH=&quot;/opt/demo&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;"># 环境变量</span></span>
<span class="line"><span style="color:#E1E4E8;">ENV JAVA_OPTS=&quot;&quot; \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    JAR_FILE=\${JAR_FILE}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">#设置时区</span></span>
<span class="line"><span style="color:#E1E4E8;">RUN apk update &amp;&amp; apk add ca-certificates &amp;&amp; \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    apk add tzdata &amp;&amp; \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime &amp;&amp; \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    echo &quot;Asia/Shanghai&quot; &gt; /etc/timezone</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">COPY target/$JAR_FILE $WORK_PATH/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">WORKDIR $WORK_PATH</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">ENTRYPOINT exec java $JAVA_OPTS -jar $JAR_</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">FROM openjdk:8-jdk-alpine</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">#构建参数</span></span>
<span class="line"><span style="color:#24292E;">ARG JAR_FILE</span></span>
<span class="line"><span style="color:#24292E;">ARG WORK_PATH=&quot;/opt/demo&quot;</span></span>
<span class="line"><span style="color:#24292E;"># 环境变量</span></span>
<span class="line"><span style="color:#24292E;">ENV JAVA_OPTS=&quot;&quot; \\</span></span>
<span class="line"><span style="color:#24292E;">    JAR_FILE=\${JAR_FILE}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">#设置时区</span></span>
<span class="line"><span style="color:#24292E;">RUN apk update &amp;&amp; apk add ca-certificates &amp;&amp; \\</span></span>
<span class="line"><span style="color:#24292E;">    apk add tzdata &amp;&amp; \\</span></span>
<span class="line"><span style="color:#24292E;">    ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime &amp;&amp; \\</span></span>
<span class="line"><span style="color:#24292E;">    echo &quot;Asia/Shanghai&quot; &gt; /etc/timezone</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">COPY target/$JAR_FILE $WORK_PATH/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">WORKDIR $WORK_PATH</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">ENTRYPOINT exec java $JAVA_OPTS -jar $JAR_</span></span></code></pre></div><h3 id="添加-k8s-的-deployment-配置" tabindex="-1">添加 K8s 的 Deployment 配置 <a class="header-anchor" href="#添加-k8s-的-deployment-配置" aria-label="Permalink to &quot;添加 K8s 的 Deployment 配置&quot;">​</a></h3><p>在工程根目录创建 k8s-deployment.tpl 文件，此文件用来作为 K8s 的 yaml 文件模板。在 jenkens pipeline 执行时，会先将 tpl 文件中 {} 括起来的自定义参数用 sed 命令替换为实际的内容。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">apiVersion: apps/v1</span></span>
<span class="line"><span style="color:#E1E4E8;">kind: Deployment</span></span>
<span class="line"><span style="color:#E1E4E8;">metadata:</span></span>
<span class="line"><span style="color:#E1E4E8;">  name: {APP_NAME}-deployment</span></span>
<span class="line"><span style="color:#E1E4E8;">  labels:</span></span>
<span class="line"><span style="color:#E1E4E8;">    app: {APP_NAME}</span></span>
<span class="line"><span style="color:#E1E4E8;">spec:</span></span>
<span class="line"><span style="color:#E1E4E8;">  replicas: 1</span></span>
<span class="line"><span style="color:#E1E4E8;">  selector:</span></span>
<span class="line"><span style="color:#E1E4E8;">    matchLabels:</span></span>
<span class="line"><span style="color:#E1E4E8;">      app: {APP_NAME}</span></span>
<span class="line"><span style="color:#E1E4E8;">  template:</span></span>
<span class="line"><span style="color:#E1E4E8;">    metadata:</span></span>
<span class="line"><span style="color:#E1E4E8;">      labels:</span></span>
<span class="line"><span style="color:#E1E4E8;">        app: {APP_NAME}</span></span>
<span class="line"><span style="color:#E1E4E8;">    spec:</span></span>
<span class="line"><span style="color:#E1E4E8;">      containers:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - name: {APP_NAME}</span></span>
<span class="line"><span style="color:#E1E4E8;">        image: {IMAGE_URL}:{IMAGE_TAG}</span></span>
<span class="line"><span style="color:#E1E4E8;">        ports:</span></span>
<span class="line"><span style="color:#E1E4E8;">        - containerPort: 40080</span></span>
<span class="line"><span style="color:#E1E4E8;">        env:</span></span>
<span class="line"><span style="color:#E1E4E8;">          - name: SPRING_PROFILES_ACTIVE</span></span>
<span class="line"><span style="color:#E1E4E8;">            value: {SPRING_PROFILE}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">apiVersion: apps/v1</span></span>
<span class="line"><span style="color:#24292E;">kind: Deployment</span></span>
<span class="line"><span style="color:#24292E;">metadata:</span></span>
<span class="line"><span style="color:#24292E;">  name: {APP_NAME}-deployment</span></span>
<span class="line"><span style="color:#24292E;">  labels:</span></span>
<span class="line"><span style="color:#24292E;">    app: {APP_NAME}</span></span>
<span class="line"><span style="color:#24292E;">spec:</span></span>
<span class="line"><span style="color:#24292E;">  replicas: 1</span></span>
<span class="line"><span style="color:#24292E;">  selector:</span></span>
<span class="line"><span style="color:#24292E;">    matchLabels:</span></span>
<span class="line"><span style="color:#24292E;">      app: {APP_NAME}</span></span>
<span class="line"><span style="color:#24292E;">  template:</span></span>
<span class="line"><span style="color:#24292E;">    metadata:</span></span>
<span class="line"><span style="color:#24292E;">      labels:</span></span>
<span class="line"><span style="color:#24292E;">        app: {APP_NAME}</span></span>
<span class="line"><span style="color:#24292E;">    spec:</span></span>
<span class="line"><span style="color:#24292E;">      containers:</span></span>
<span class="line"><span style="color:#24292E;">      - name: {APP_NAME}</span></span>
<span class="line"><span style="color:#24292E;">        image: {IMAGE_URL}:{IMAGE_TAG}</span></span>
<span class="line"><span style="color:#24292E;">        ports:</span></span>
<span class="line"><span style="color:#24292E;">        - containerPort: 40080</span></span>
<span class="line"><span style="color:#24292E;">        env:</span></span>
<span class="line"><span style="color:#24292E;">          - name: SPRING_PROFILES_ACTIVE</span></span>
<span class="line"><span style="color:#24292E;">            value: {SPRING_PROFILE}</span></span></code></pre></div><h3 id="添加-jenkinsfile" tabindex="-1">添加 Jenkinsfile <a class="header-anchor" href="#添加-jenkinsfile" aria-label="Permalink to &quot;添加 Jenkinsfile&quot;">​</a></h3><p>在工程根目录创建 Jenkinsfile，用来执行 jenkins pipeline 任务。Jenkinsfile 文件的大概内容描述如下。</p><br><p>environment 中变量说明：</p><ul><li><p>HARBOR_CREDS 为 harbor 镜像仓库的用户密码，数据保存为 jenkins 的&quot;username and password&quot;类型的凭据，用 credentials 方法从凭据中获取，使用时通过 HARBOR_CREDS_USR 获取用户名，HARBOR_CREDS_PSW 获取密码；</p></li><li><p>K8S_CONFIG 为 K8s 中 kubectl 命令的 yaml 配置文件内容，数据保存为 jenkins 的&quot;Secret Text&quot;类型的凭据，用 credentials 方法从凭据中获取，这里保存的 yaml 配置文件内容以 base64 编码格式保存，在设置凭据时先要进行 base64 编码（此 base64 编码是非必须的，如果直接保存原文，下面 Jenkinsfile 中需要去掉 base64 -d 解码） ；</p></li><li><p>GIT_TAG 变量通过执行 sh 命令获取当前 git 的 tag 值，由于后面构建 docker 镜像时使用 git 的 tag 作为镜像的标签，所以这个变量也不能为空。</p></li></ul><br><p>parameters 中变量说明：</p><ul><li><p><strong>HARBOR_HOST</strong>，harbor 镜像仓库地址；</p></li><li><p><strong>DOCKER_IMAGE</strong>，docker 镜像名，包含 harbor 项目名称；</p></li><li><p><strong>APP_NAME</strong>，K8s 中的标签名称，对应 K8s 的 yaml 模板中的 {APP_NAME}；</p></li><li><p><strong>K8S_NAMESPACE</strong>，K8s 中的 namespace 名称，执行 kubectl 命令会部署至此命名空间。</p></li></ul><br><p>stages 说明：</p><ul><li><p><strong>Maven Build</strong>，使用 docker 的方式执行 maven 命令，args 参数中将 .m2 目录映射出来，避免执行时重复从远端获取依赖；stash 步骤中将 jar 文件保存下来，供后面的 stage 使用；</p></li><li><p><strong>Docker Build</strong>，unstash 获取 jar 文件，通过 sh 依次执行 docker 命令登录 harbor、构建镜像、上传镜像、移除本地镜像，构建镜像时，会获取 jar 文件名传入 JAR_FILE 参数；</p></li><li><p><strong>Deploy</strong>，使用 docker 的方式执行 kubectl 命令，在执行前先将 K8S_CONFIG 中的内容进行 base64 解密并存为 ~/.kube/config 配置文件，然后执行 sed 命令将 k8s-deployment.tpl 文件中&quot;{参数名}&quot;形式参数替换为实际的参数值，最后执行 kubectl 命令部署至 K8s。</p></li></ul><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// 需要在jenkins的Credentials设置中配置jenkins-harbor-creds、jenkins-k8s-config参数</span></span>
<span class="line"><span style="color:#E1E4E8;">pipeline {</span></span>
<span class="line"><span style="color:#E1E4E8;">    agent any</span></span>
<span class="line"><span style="color:#E1E4E8;">    environment {</span></span>
<span class="line"><span style="color:#E1E4E8;">        HARBOR_CREDS = credentials(&#39;jenkins-harbor-creds&#39;)</span></span>
<span class="line"><span style="color:#E1E4E8;">        K8S_CONFIG = credentials(&#39;jenkins-k8s-config&#39;)</span></span>
<span class="line"><span style="color:#E1E4E8;">        GIT_TAG = sh(returnStdout: true,script: &#39;git describe --tags --always&#39;).trim()</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    parameters {</span></span>
<span class="line"><span style="color:#E1E4E8;">        string(name: &#39;HARBOR_HOST&#39;, defaultValue: &#39;192.168.10.160&#39;, description: &#39;harbor仓库地址&#39;)</span></span>
<span class="line"><span style="color:#E1E4E8;">        string(name: &#39;DOCKER_IMAGE&#39;, defaultValue: &#39;tssp/pipeline-demo&#39;, description: &#39;docker镜像名&#39;)</span></span>
<span class="line"><span style="color:#E1E4E8;">        string(name: &#39;APP_NAME&#39;, defaultValue: &#39;pipeline-demo&#39;, description: &#39;k8s中标签名&#39;)</span></span>
<span class="line"><span style="color:#E1E4E8;">        string(name: &#39;K8S_NAMESPACE&#39;, defaultValue: &#39;demo&#39;, description: &#39;k8s的namespace名称&#39;)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    stages {</span></span>
<span class="line"><span style="color:#E1E4E8;">        stage(&#39;Maven Build&#39;) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            when { expression { env.GIT_TAG != null } }</span></span>
<span class="line"><span style="color:#E1E4E8;">            agent {</span></span>
<span class="line"><span style="color:#E1E4E8;">                docker {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    image &#39;maven:3-jdk-8-alpine&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">                    args &#39;-v $HOME/.m2:/root/.m2&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">                sh &#39;mvn clean package -Dfile.encoding=UTF-8 -DskipTests=true&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">                stash includes: &#39;target/*.jar&#39;, name: &#39;app&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        stage(&#39;Docker Build&#39;) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            when { </span></span>
<span class="line"><span style="color:#E1E4E8;">                allOf {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    expression { env.GIT_TAG != null }</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            agent any</span></span>
<span class="line"><span style="color:#E1E4E8;">            steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">                unstash &#39;app&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">                sh &quot;docker login -u \${HARBOR_CREDS_USR} -p \${HARBOR_CREDS_PSW} \${params.HARBOR_HOST}&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                sh &quot;docker build --build-arg JAR_FILE=\`ls target/*.jar |cut -d &#39;/&#39; -f2\` -t \${params.HARBOR_HOST}/\${params.DOCKER_IMAGE}:\${GIT_TAG} .&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                sh &quot;docker push \${params.HARBOR_HOST}/\${params.DOCKER_IMAGE}:\${GIT_TAG}&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                sh &quot;docker rmi \${params.HARBOR_HOST}/\${params.DOCKER_IMAGE}:\${GIT_TAG}&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        stage(&#39;Deploy&#39;) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            when { </span></span>
<span class="line"><span style="color:#E1E4E8;">                allOf {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    expression { env.GIT_TAG != null }</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            agent {</span></span>
<span class="line"><span style="color:#E1E4E8;">                docker {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    image &#39;lwolf/helm-kubectl-docker&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            steps {</span></span>
<span class="line"><span style="color:#E1E4E8;">                sh &quot;mkdir -p ~/.kube&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                sh &quot;echo \${K8S_CONFIG} | base64 -d &gt; ~/.kube/config&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                sh &quot;sed -e &#39;s#{IMAGE_URL}#\${params.HARBOR_HOST}/\${params.DOCKER_IMAGE}#g;s#{IMAGE_TAG}#\${GIT_TAG}#g;s#{APP_NAME}#\${params.APP_NAME}#g;s#{SPRING_PROFILE}#k8s-test#g&#39; k8s-deployment.tpl &gt; k8s-deployment.yml&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">                sh &quot;kubectl apply -f k8s-deployment.yml --namespace=\${params.K8S_NAMESPACE}&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// 需要在jenkins的Credentials设置中配置jenkins-harbor-creds、jenkins-k8s-config参数</span></span>
<span class="line"><span style="color:#24292E;">pipeline {</span></span>
<span class="line"><span style="color:#24292E;">    agent any</span></span>
<span class="line"><span style="color:#24292E;">    environment {</span></span>
<span class="line"><span style="color:#24292E;">        HARBOR_CREDS = credentials(&#39;jenkins-harbor-creds&#39;)</span></span>
<span class="line"><span style="color:#24292E;">        K8S_CONFIG = credentials(&#39;jenkins-k8s-config&#39;)</span></span>
<span class="line"><span style="color:#24292E;">        GIT_TAG = sh(returnStdout: true,script: &#39;git describe --tags --always&#39;).trim()</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    parameters {</span></span>
<span class="line"><span style="color:#24292E;">        string(name: &#39;HARBOR_HOST&#39;, defaultValue: &#39;192.168.10.160&#39;, description: &#39;harbor仓库地址&#39;)</span></span>
<span class="line"><span style="color:#24292E;">        string(name: &#39;DOCKER_IMAGE&#39;, defaultValue: &#39;tssp/pipeline-demo&#39;, description: &#39;docker镜像名&#39;)</span></span>
<span class="line"><span style="color:#24292E;">        string(name: &#39;APP_NAME&#39;, defaultValue: &#39;pipeline-demo&#39;, description: &#39;k8s中标签名&#39;)</span></span>
<span class="line"><span style="color:#24292E;">        string(name: &#39;K8S_NAMESPACE&#39;, defaultValue: &#39;demo&#39;, description: &#39;k8s的namespace名称&#39;)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    stages {</span></span>
<span class="line"><span style="color:#24292E;">        stage(&#39;Maven Build&#39;) {</span></span>
<span class="line"><span style="color:#24292E;">            when { expression { env.GIT_TAG != null } }</span></span>
<span class="line"><span style="color:#24292E;">            agent {</span></span>
<span class="line"><span style="color:#24292E;">                docker {</span></span>
<span class="line"><span style="color:#24292E;">                    image &#39;maven:3-jdk-8-alpine&#39;</span></span>
<span class="line"><span style="color:#24292E;">                    args &#39;-v $HOME/.m2:/root/.m2&#39;</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            steps {</span></span>
<span class="line"><span style="color:#24292E;">                sh &#39;mvn clean package -Dfile.encoding=UTF-8 -DskipTests=true&#39;</span></span>
<span class="line"><span style="color:#24292E;">                stash includes: &#39;target/*.jar&#39;, name: &#39;app&#39;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        stage(&#39;Docker Build&#39;) {</span></span>
<span class="line"><span style="color:#24292E;">            when { </span></span>
<span class="line"><span style="color:#24292E;">                allOf {</span></span>
<span class="line"><span style="color:#24292E;">                    expression { env.GIT_TAG != null }</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            agent any</span></span>
<span class="line"><span style="color:#24292E;">            steps {</span></span>
<span class="line"><span style="color:#24292E;">                unstash &#39;app&#39;</span></span>
<span class="line"><span style="color:#24292E;">                sh &quot;docker login -u \${HARBOR_CREDS_USR} -p \${HARBOR_CREDS_PSW} \${params.HARBOR_HOST}&quot;</span></span>
<span class="line"><span style="color:#24292E;">                sh &quot;docker build --build-arg JAR_FILE=\`ls target/*.jar |cut -d &#39;/&#39; -f2\` -t \${params.HARBOR_HOST}/\${params.DOCKER_IMAGE}:\${GIT_TAG} .&quot;</span></span>
<span class="line"><span style="color:#24292E;">                sh &quot;docker push \${params.HARBOR_HOST}/\${params.DOCKER_IMAGE}:\${GIT_TAG}&quot;</span></span>
<span class="line"><span style="color:#24292E;">                sh &quot;docker rmi \${params.HARBOR_HOST}/\${params.DOCKER_IMAGE}:\${GIT_TAG}&quot;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        stage(&#39;Deploy&#39;) {</span></span>
<span class="line"><span style="color:#24292E;">            when { </span></span>
<span class="line"><span style="color:#24292E;">                allOf {</span></span>
<span class="line"><span style="color:#24292E;">                    expression { env.GIT_TAG != null }</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            agent {</span></span>
<span class="line"><span style="color:#24292E;">                docker {</span></span>
<span class="line"><span style="color:#24292E;">                    image &#39;lwolf/helm-kubectl-docker&#39;</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            steps {</span></span>
<span class="line"><span style="color:#24292E;">                sh &quot;mkdir -p ~/.kube&quot;</span></span>
<span class="line"><span style="color:#24292E;">                sh &quot;echo \${K8S_CONFIG} | base64 -d &gt; ~/.kube/config&quot;</span></span>
<span class="line"><span style="color:#24292E;">                sh &quot;sed -e &#39;s#{IMAGE_URL}#\${params.HARBOR_HOST}/\${params.DOCKER_IMAGE}#g;s#{IMAGE_TAG}#\${GIT_TAG}#g;s#{APP_NAME}#\${params.APP_NAME}#g;s#{SPRING_PROFILE}#k8s-test#g&#39; k8s-deployment.tpl &gt; k8s-deployment.yml&quot;</span></span>
<span class="line"><span style="color:#24292E;">                sh &quot;kubectl apply -f k8s-deployment.yml --namespace=\${params.K8S_NAMESPACE}&quot;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="配置-jenkins-pipeline-任务" tabindex="-1"><strong>配置 jenkins pipeline 任务</strong> <a class="header-anchor" href="#配置-jenkins-pipeline-任务" aria-label="Permalink to &quot;**配置 jenkins pipeline 任务**&quot;">​</a></h2><p>创建 jenkins pipeline 任务，并设置需要的参数。</p><h3 id="新建-pipeline-任务" tabindex="-1"><strong>新建 pipeline 任务</strong> <a class="header-anchor" href="#新建-pipeline-任务" aria-label="Permalink to &quot;**新建 pipeline 任务**&quot;">​</a></h3><p>单击&quot;新建任务&quot;按钮，输入名称并选择&quot;流水线&quot;（pipeline），然后单击&quot;确定&quot;按钮。</p><br>`,26),_=s("h3",{id:"配置-pipeline-任务",tabindex:"-1"},[s("strong",null,"配置 pipeline 任务"),p(),s("a",{class:"header-anchor",href:"#配置-pipeline-任务","aria-label":'Permalink to "**配置 pipeline 任务**"'},"​")],-1),v=s("p",null,'进入任务的配置界面，在流水线（pipeline）设置部分，选择"Pipeline script from SCM"选项。SCM 选项选为"Git"，配置好工程的 git 地址以及获取代码的凭证信息；然后在"Additional Behaviours"中添加"Clean before checkout"。',-1),A=s("br",null,null,-1),q=s("h3",{id:"配置-harbor-账号与密码",tabindex:"-1"},[s("strong",null,"配置 harbor 账号与密码"),p(),s("a",{class:"header-anchor",href:"#配置-harbor-账号与密码","aria-label":'Permalink to "**配置 harbor 账号与密码**"'},"​")],-1),C=s("p",null,'选择"凭据"，然后在下图所示位置单击"添加凭据"按钮。在新凭据设置界面，类型选择为"Username with password"，ID 设置为"jenkins-harbor-creds"（此处的 ID 必须与 Jenkinsfile 中的保持一致）。Username 与 Password 分别设置为 harbor 镜像私库的用户名和密码。',-1),T=s("br",null,null,-1),S=e(`<h3 id="配置-k8s-的-kube-config-信息" tabindex="-1"><strong>配置 K8s 的 kube.config</strong> <strong>信息</strong> <a class="header-anchor" href="#配置-k8s-的-kube-config-信息" aria-label="Permalink to &quot;**配置 K8s 的 kube.config** **信息**&quot;">​</a></h3><p>在 K8s 中使用 kubectl 命令时需要 yaml 格式的服务器以及授权信息配置文件，这里将 kubectl 的 yaml 配置文件的内容以 base64 编码后保存在 jenkins 的凭据中。pipeline 任务执行时，先从 jenkins 凭据中获取内容，进行 base64 解码后将配置保存为 ~/.kube/config 文件。kubectl 的配置文件的内容如下：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">apiVersion: v1</span></span>
<span class="line"><span style="color:#E1E4E8;">kind: Config</span></span>
<span class="line"><span style="color:#E1E4E8;">clusters:</span></span>
<span class="line"><span style="color:#E1E4E8;">- name: &quot;test&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  cluster:</span></span>
<span class="line"><span style="color:#E1E4E8;">    server: &quot;https://xxxxx&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    api-version: v1</span></span>
<span class="line"><span style="color:#E1E4E8;">    certificate-authority-data: &quot;xxxxxx&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">users:</span></span>
<span class="line"><span style="color:#E1E4E8;">- name: &quot;user1&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  user:</span></span>
<span class="line"><span style="color:#E1E4E8;">    token: &quot;xxxx&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">contexts:</span></span>
<span class="line"><span style="color:#E1E4E8;">- name: &quot;test&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  context:</span></span>
<span class="line"><span style="color:#E1E4E8;">    user: &quot;user1&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    cluster: &quot;test&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">current-context: &quot;tes</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">apiVersion: v1</span></span>
<span class="line"><span style="color:#24292E;">kind: Config</span></span>
<span class="line"><span style="color:#24292E;">clusters:</span></span>
<span class="line"><span style="color:#24292E;">- name: &quot;test&quot;</span></span>
<span class="line"><span style="color:#24292E;">  cluster:</span></span>
<span class="line"><span style="color:#24292E;">    server: &quot;https://xxxxx&quot;</span></span>
<span class="line"><span style="color:#24292E;">    api-version: v1</span></span>
<span class="line"><span style="color:#24292E;">    certificate-authority-data: &quot;xxxxxx&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">users:</span></span>
<span class="line"><span style="color:#24292E;">- name: &quot;user1&quot;</span></span>
<span class="line"><span style="color:#24292E;">  user:</span></span>
<span class="line"><span style="color:#24292E;">    token: &quot;xxxx&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">contexts:</span></span>
<span class="line"><span style="color:#24292E;">- name: &quot;test&quot;</span></span>
<span class="line"><span style="color:#24292E;">  context:</span></span>
<span class="line"><span style="color:#24292E;">    user: &quot;user1&quot;</span></span>
<span class="line"><span style="color:#24292E;">    cluster: &quot;test&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">current-context: &quot;tes</span></span></code></pre></div><br><p>可以在 Linux 中采用下面命令将 kubectl 的 yaml 配置文件进行 base64 编码。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">base64 kube-config.yml &gt; kube-config.txt</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">base64 kube-config.yml &gt; kube-config.txt</span></span></code></pre></div><br><p>然后类似上一步，在 jenkins 凭据中增加配置文件内容。在凭据设置界面，类型选择为&quot;Secret text&quot;，ID 设置为&quot;jenkins-k8s-config&quot;（此处的 ID 必须与 Jenkinsfile 中的保持一致），Secret 设置为上面经过 base64 编码后的配置文件内容。</p><br>`,11),R=s("h2",{id:"测试-pipeline-任务",tabindex:"-1"},[s("strong",null,"测试 pipeline 任务"),p(),s("a",{class:"header-anchor",href:"#测试-pipeline-任务","aria-label":'Permalink to "**测试 pipeline 任务**"'},"​")],-1),f=s("p",null,'在创建的 pipeline 任务中，单击"Build With Parameters"按钮，即可立即执行 pipeline 任务。',-1),P=s("br",null,null,-1),I=s("br",null,null,-1),N=s("p",null,"在当前界面中查看任务的执行结果，可以看到每个阶段的运行状态。",-1),x=s("br",null,null,-1),D=s("br",null,null,-1),j=s("p",null,"执行成功后，查看 harbor 镜像仓库，docker 镜像成功上传至 harbor。",-1),O=s("br",null,null,-1),K=e('<br><p>在 Linux 服务器查看 deployment，运行以下命令：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">kubectl get deployment</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">kubectl get deployment</span></span></code></pre></div><br>',5),V=e('<br><p>查看 pod：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">kubectl get pod</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">kubectl get pod</span></span></code></pre></div><br>',5),G=e('<h1 id="遇到的问题及解决方法" tabindex="-1"><strong>遇到的问题及解决方法</strong> <a class="header-anchor" href="#遇到的问题及解决方法" aria-label="Permalink to &quot;**遇到的问题及解决方法**&quot;">​</a></h1><p>（1）启动 Jenkins，安装插件出现&quot;无法连接服务器&quot;错误</p><br><p>安装插件那个页面，就是提示你 offline 的那个页面，不要动，然后打开一个新的 tab，输入网址 <a href="http://localhost" target="_blank" rel="noreferrer">http://localhost</a>:port/pluginManager/advanced。</p><br><p>这里面最底下有个&quot;Update Site&quot;，把其中的链接改成<a href="http://mirror.esuni.jp/jenkins/updates/update-center.json%E3%80%82" target="_blank" rel="noreferrer">http://mirror.esuni.jp/jenkins/updates/update-center.json。</a></p><br><p>单击 submit 按钮：</p><br>',9),M=e(`<br><p>然后重新启动 jenkins，这样就能正常安装插件。</p><br><p>（2）运行 pipeline，出现 command not found 错误</p><br><p>yum 安装的 Jenkins 配置文件默认位置 /etc/sysconfig/jenkins，默认 jenkins 服务以 jenkins 用户运行，这时在 jenkins 执行 ant 脚本时可能会发生没有权限删除目录、覆盖文件等情况。可以让 jenkins 以 root 用户运行来解决这个问题。</p><br><p>a.将 jenkins 账号分别加入到 root 组中：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">gpasswd -a jenkins root</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">gpasswd -a jenkins root</span></span></code></pre></div><br><p>b.修改 /etc/sysconfig/jenkins 文件：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">#user id to be invoked as (otherwise will run as root; not wise!)</span></span>
<span class="line"><span style="color:#E1E4E8;">JENKINS_USER=root</span></span>
<span class="line"><span style="color:#E1E4E8;">JENKINS_GROUP=root</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">#user id to be invoked as (otherwise will run as root; not wise!)</span></span>
<span class="line"><span style="color:#24292E;">JENKINS_USER=root</span></span>
<span class="line"><span style="color:#24292E;">JENKINS_GROUP=root</span></span></code></pre></div><br><p>可以修改为 root 权限运行，重启 jenkins 服务。</p><br><p>（3）在 docker build 阶段出现 exec: &quot;docker-proxy&quot;: executable file not found in $PATH 错误，解决方法是，需要启动 docker-proxy：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">cd /usr/libexec/docker/</span></span>
<span class="line"><span style="color:#E1E4E8;"> ln -s docker-proxy-current docker-proxy</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">cd /usr/libexec/docker/</span></span>
<span class="line"><span style="color:#24292E;"> ln -s docker-proxy-current docker-proxy</span></span></code></pre></div><br><p>（4）出现 Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running? 错误，运行如下命令：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">systemctl daemon-reload</span></span>
<span class="line"><span style="color:#E1E4E8;">service docker restart</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">systemctl daemon-reload</span></span>
<span class="line"><span style="color:#24292E;">service docker restart</span></span></code></pre></div><br><p>（5）出现 shim error: docker-runc not installed on system. 错误，经过一番排查，如下解决方案有用：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">cd /usr/libexec/docker/</span></span>
<span class="line"><span style="color:#E1E4E8;"> ln -s docker-runc-current docker-runc</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">cd /usr/libexec/docker/</span></span>
<span class="line"><span style="color:#24292E;"> ln -s docker-runc-current docker-runc</span></span></code></pre></div>`,28);function w(U,L,B,$,H,J){const n=o("Image");return t(),c("div",null,[i,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/02/56/CgoCgV6VqwKAajirAAOot2kHSIM714.jpg"}),p(),E,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/88/9A/Cgq2xl6VqwOAQO5oAAFotppxiS8332.png"}),d,u,y,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0F/84/Ciqah16VqwOAIEKcAABK8b1J5Pk588.png"}),h,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/02/56/CgoCgV6VqwOAJy7rAADUBv3omAM239.png"}),g,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/88/9A/Cgq2xl6VqwSAb3T1AACLTw_peWM870.png"}),b,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/88/9A/Cgq2xl6VqwSAQcWQAAIi7I6BGhU522.png"}),k,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/02/56/CgoCgV6VqwSAJIY2AAAIQDo_SXo223.png"}),m,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/88/9A/Cgq2xl6VqwWAZFSOAAHcXpy5dUQ145.png"}),p(),_,v,A,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0F/84/Ciqah16VqwWAHp5dAAEiQclu3N0609.png"}),q,C,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/02/56/CgoCgV6VqwWAPUy5AAGuJhe8aC0834.png"}),T,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/88/9A/Cgq2xl6VqwaAOCwNAADQwtyky3E891.png"}),S,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0F/84/Ciqah16VqwaAagi2AADuteUwitQ741.png"}),R,f,P,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/02/56/CgoCgV6VqweAUtIeAAGPNqdcCX8865.png"}),I,N,x,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/88/9A/Cgq2xl6VqweAQ7a8AAIM89lGIAQ017.png"}),D,j,O,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0F/84/Ciqah16VqweADadcAAEwylSrC84442.png"}),K,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/02/56/CgoCgV6VqwiATbn1AABaEnvkQGA790.png"}),V,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/88/9A/Cgq2xl6VqwiAfRQ1AAB6C4ZT3sw648.png"}),G,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0F/84/Ciqah16VqwmAYg73AADiqrgm5wY712.png"}),M])}const Q=l(r,[["render",w]]);export{W as __pageData,Q as default};
