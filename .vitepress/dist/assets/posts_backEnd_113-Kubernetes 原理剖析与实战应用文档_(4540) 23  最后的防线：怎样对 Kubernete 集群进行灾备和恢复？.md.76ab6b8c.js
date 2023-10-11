import{_ as e,D as l,o,g as t,J as a,h as p,Q as s}from"./chunks/framework.f67d7268.js";const m=JSON.parse('{"title":"23最后的防线：怎样对Kubernete集群进行灾备和恢复？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/113-Kubernetes 原理剖析与实战应用文档/(4540) 23  最后的防线：怎样对 Kubernete 集群进行灾备和恢复？.md","filePath":"posts/backEnd/113-Kubernetes 原理剖析与实战应用文档/(4540) 23  最后的防线：怎样对 Kubernete 集群进行灾备和恢复？.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/113-Kubernetes 原理剖析与实战应用文档/(4540) 23  最后的防线：怎样对 Kubernete 集群进行灾备和恢复？.md"},r=s('<h1 id="_23最后的防线-怎样对kubernete集群进行灾备和恢复" tabindex="-1">23最后的防线：怎样对Kubernete集群进行灾备和恢复？ <a class="header-anchor" href="#_23最后的防线-怎样对kubernete集群进行灾备和恢复" aria-label="Permalink to &quot;23最后的防线：怎样对Kubernete集群进行灾备和恢复？&quot;">​</a></h1><p>Kubernetes 隐藏了所有容器编排的复杂细节，让我们可以专注在应用本身，而无须过多关注如何去做部署和维护。此外，Kubernetes 还支持多副本，可以保证我们业务的高可用性。而对于集群本身而言，我们一样也要保证其高可用性，你可以参考官方文档：<a href="https://kubernetes.io/zh/docs/setup/production-environment/tools/kubeadm/high-availability/" target="_blank" rel="noreferrer">利用 Kubeadm 来创建高可用集群</a>。</p><p>但是这些并不足以让我们高枕无忧，因为 Kubernetes 在帮助我们编排调度容器的同时，往往还保存了很多关键数据，比如集群自身关键数据、密钥、业务配置信息、业务数据等。我们在使用 Kubernetes 的时候，非常有必要进行灾备，防止出现操作失误（比如大规模无删除）、自然灾害、磁盘损坏无法修复、网络异常、机房断电等情况导致的数据丢失，严重时甚至会导致整个集群不可用。</p><p>所以在使用 Kubernetes 的时候，我们最好做个灾备以方便对集群进行恢复，回滚到早期的一个稳定的状态。</p><h3 id="kubernetes-需要备份哪些东西" tabindex="-1">Kubernetes 需要备份哪些东西 <a class="header-anchor" href="#kubernetes-需要备份哪些东西" aria-label="Permalink to &quot;Kubernetes 需要备份哪些东西&quot;">​</a></h3><p>在对 Kubernetes 集群做备份之前，我们首先得知道要备份哪些东西。</p><p>我们从整个 Kubernetes 的架构为出发点，来看看整个集群的组件。我在《<a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=447#/detail/pc?id=4519" target="_blank" rel="noreferrer">02 | 高屋建瓴：Kubernetes 的架构为什么是这样的？</a>》中讲到 Kubernetes 的官方架构图，如下：</p>',7),E=s(`<p>图 1：Kubernetes 官方架构图</p><p>从上图可以看出，整个 Kubernetes 集群可分为Master 节点（左侧）和 Node 节点（右侧）。</p><p>在 Master 节点上，我们运行着 Etcd 集群以及 Kubernetes 控制面的几大组件，比如 kube-apiserver、kube-controller-manager、kube-scheduler 和 cloud-controller-manager（可选）等。</p><p>在这些组件中，除了 Etcd，其他都是无状态的服务。只要保证 Etcd 的数据正常，其他几个组件不管出现什么问题，我们都可以通过重启或者新建实例来解决，并不会受到任何影响。因此我们<strong>只需要备份 Etcd 中的数据</strong>。</p><p>看完了 Master 节点，我们再来看看 Node 节点。</p><p>Node 节点上运行着 kubelet、kube-proxy 等服务。Kubelet 负责维护各个容器实例，以及容器使用到的存储。为了保证数据的持久化存储，对于关键业务的关键数据，我都建议通过我在《<a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=447#/detail/pc?id=4527" target="_blank" rel="noreferrer">10 | 存储管理：怎样对业务数据进行持久化存储？</a>》中提到的 PV（Persistent Volume）来保存和使用。鉴于这一点，我们<strong>还需要对 PV 进行备份</strong>。</p><p>如果是节点出现了问题，我们可以向集群中增加新的节点，替换掉有问题的节点。</p><p>看完 Kubernetes 的官方架构图之后，下面我们就来看看该如何备份 Etcd 中的数据和 PV。</p><h4 id="对-etcd-数据进行备份及恢复" tabindex="-1">对 Etcd 数据进行备份及恢复 <a class="header-anchor" href="#对-etcd-数据进行备份及恢复" aria-label="Permalink to &quot;对 Etcd 数据进行备份及恢复&quot;">​</a></h4><p>Etcd 官方也提供了<a href="https://etcd.io/docs/v3.4.0/op-guide/recovery/" target="_blank" rel="noreferrer">备份的文档</a>，你有兴趣可以阅读一下。我在这里总结了一些实际操作，以便你后续可以借鉴并进行手动的备份和恢复。命令行里面的一些证书路径以及 endpoint 地址需要根据自己的集群参数进行更改。实际操作代码如下：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 0. 数据备份</span></span>
<span class="line"><span style="color:#E1E4E8;">ETCDCTL_API</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">etcdctl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--endpoints=https://127.0.0.1:2379</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">--cacert=/etc/kubernetes/pki/etcd/ca.crt </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">--key=/etc/kubernetes/pki/etcd/peer.key </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">--cert=/etc/kubernetes/pki/etcd/peer.crt </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">snapshot </span><span style="color:#9ECBFF;">save</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">./new.snapshot.db</span></span>
<span class="line"><span style="color:#6A737D;"># 1. 查看 etcd 集群的节点</span></span>
<span class="line"><span style="color:#E1E4E8;">ETCDCTL_API</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">etcdctl</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--endpoints=https://127.0.0.1:2379</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\ </span></span>
<span class="line"><span style="color:#E1E4E8;">--cacert</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">/etc/kubernetes/pki/etcd/ca.crt</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">\\</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">--cert</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">/etc/kubernetes/pki/etcd/peer.crt</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">\\</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">--key</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">/etc/kubernetes/pki/etcd/peer.key</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#B392F0;">member</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">list</span></span>
<span class="line"><span style="color:#6A737D;"># 2. 停止所有节点上的 etcd！（注意是所有！！）</span></span>
<span class="line"><span style="color:#6A737D;">## 如果是 static pod，可以听过如下的命令进行 stop</span></span>
<span class="line"><span style="color:#6A737D;">## 如果是 systemd 管理的，可以通过 systemctl stop etcd</span></span>
<span class="line"><span style="color:#B392F0;">mv</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/kubernetes/manifests/etcd.yaml</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/kubernetes/</span></span>
<span class="line"><span style="color:#6A737D;"># 3. 数据清理</span></span>
<span class="line"><span style="color:#6A737D;">## 依次在每个节点上，移除 etcd 数据</span></span>
<span class="line"><span style="color:#B392F0;">rm</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-rf</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/var/lib/etcd</span></span>
<span class="line"><span style="color:#6A737D;"># 4. 数据恢复</span></span>
<span class="line"><span style="color:#6A737D;">## 依次在每个节点上，恢复 etcd 旧数据</span></span>
<span class="line"><span style="color:#6A737D;">## 里面的 name，initial-advertise-peer-urls，initial-cluster=controlplane</span></span>
<span class="line"><span style="color:#6A737D;">## 等参数，可以从 etcd pod 的 yaml 文件中获取到。</span></span>
<span class="line"><span style="color:#E1E4E8;">ETCDCTL_API</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">etcdctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">snapshot</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">restore</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">./old.snapshot.db</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">--data-dir=/var/lib/etcd </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">--name=controlplane </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">--initial-advertise-peer-urls=https://172.17.0.18:2380 </span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">--initial-cluster=controlplane=https://172.17.0.18:2380</span></span>
<span class="line"><span style="color:#6A737D;"># 5. 恢复 etcd 服务</span></span>
<span class="line"><span style="color:#6A737D;">## 依次在每个节点上，拉起 etcd 服务</span></span>
<span class="line"><span style="color:#B392F0;">mv</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/kubernetes/etcd.yaml</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/etc/kubernetes/manifests/</span></span>
<span class="line"><span style="color:#B392F0;">systemctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">restart</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">kubelet</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 0. 数据备份</span></span>
<span class="line"><span style="color:#24292E;">ETCDCTL_API</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">3</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">etcdctl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--endpoints=https://127.0.0.1:2379</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">--cacert=/etc/kubernetes/pki/etcd/ca.crt </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">--key=/etc/kubernetes/pki/etcd/peer.key </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">--cert=/etc/kubernetes/pki/etcd/peer.crt </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">snapshot </span><span style="color:#032F62;">save</span><span style="color:#24292E;"> </span><span style="color:#032F62;">./new.snapshot.db</span></span>
<span class="line"><span style="color:#6A737D;"># 1. 查看 etcd 集群的节点</span></span>
<span class="line"><span style="color:#24292E;">ETCDCTL_API</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">3</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">etcdctl</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--endpoints=https://127.0.0.1:2379</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\ </span></span>
<span class="line"><span style="color:#24292E;">--cacert</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">/etc/kubernetes/pki/etcd/ca.crt</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">\\</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">--cert</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">/etc/kubernetes/pki/etcd/peer.crt</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">\\</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">--key</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">/etc/kubernetes/pki/etcd/peer.key</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#6F42C1;">member</span><span style="color:#24292E;"> </span><span style="color:#032F62;">list</span></span>
<span class="line"><span style="color:#6A737D;"># 2. 停止所有节点上的 etcd！（注意是所有！！）</span></span>
<span class="line"><span style="color:#6A737D;">## 如果是 static pod，可以听过如下的命令进行 stop</span></span>
<span class="line"><span style="color:#6A737D;">## 如果是 systemd 管理的，可以通过 systemctl stop etcd</span></span>
<span class="line"><span style="color:#6F42C1;">mv</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/kubernetes/manifests/etcd.yaml</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/kubernetes/</span></span>
<span class="line"><span style="color:#6A737D;"># 3. 数据清理</span></span>
<span class="line"><span style="color:#6A737D;">## 依次在每个节点上，移除 etcd 数据</span></span>
<span class="line"><span style="color:#6F42C1;">rm</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-rf</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/var/lib/etcd</span></span>
<span class="line"><span style="color:#6A737D;"># 4. 数据恢复</span></span>
<span class="line"><span style="color:#6A737D;">## 依次在每个节点上，恢复 etcd 旧数据</span></span>
<span class="line"><span style="color:#6A737D;">## 里面的 name，initial-advertise-peer-urls，initial-cluster=controlplane</span></span>
<span class="line"><span style="color:#6A737D;">## 等参数，可以从 etcd pod 的 yaml 文件中获取到。</span></span>
<span class="line"><span style="color:#24292E;">ETCDCTL_API</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">3</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">etcdctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">snapshot</span><span style="color:#24292E;"> </span><span style="color:#032F62;">restore</span><span style="color:#24292E;"> </span><span style="color:#032F62;">./old.snapshot.db</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">--data-dir=/var/lib/etcd </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">--name=controlplane </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">--initial-advertise-peer-urls=https://172.17.0.18:2380 </span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">--initial-cluster=controlplane=https://172.17.0.18:2380</span></span>
<span class="line"><span style="color:#6A737D;"># 5. 恢复 etcd 服务</span></span>
<span class="line"><span style="color:#6A737D;">## 依次在每个节点上，拉起 etcd 服务</span></span>
<span class="line"><span style="color:#6F42C1;">mv</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/kubernetes/etcd.yaml</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/etc/kubernetes/manifests/</span></span>
<span class="line"><span style="color:#6F42C1;">systemctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">restart</span><span style="color:#24292E;"> </span><span style="color:#032F62;">kubelet</span></span></code></pre></div><p>上述这些备份，都需要手动运行命令行进行操作。如果你的 Etcd 集群是运行在 Kubernetes 集群中的，你可以通过以下的定时 Job (CronJob) 来帮你自动化、周期性（如下的 YAML 文件中会每分钟对 Etcd 进行一次备份）地备份 Etcd 的数据。关于 CronJob 部分的内容，我们在后面单独章节会进行介绍。自动备份代码如下：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">apiVersion</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">batch/v1beta1</span></span>
<span class="line"><span style="color:#85E89D;">kind</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">CronJob</span></span>
<span class="line"><span style="color:#85E89D;">metadata</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">backup</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">namespace</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">kube-system</span></span>
<span class="line"><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;"># activeDeadlineSeconds: 100</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">schedule</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;*/1 * * * *&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">jobTemplate</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">spec</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">containers</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">backup</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;"># Same image as in /etc/kubernetes/manifests/etcd.yaml</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">k8s.gcr.io/etcd:3.2.24</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">env</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">ETCDCTL_API</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">value</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;3&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">command</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;/bin/sh&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">args</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;-c&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;etcdctl --endpoints=https://127.0.0.1:2379 --cacert=/etc/kubernetes/pki/etcd/ca.crt --cert=/etc/kubernetes/pki/etcd/healthcheck-client.crt --key=/etc/kubernetes/pki/etcd/healthcheck-client.key snapshot save /backup/etcd-snapshot-$(date +%Y-%m-%d_%H:%M:%S_%Z).db&quot;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">volumeMounts</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#85E89D;">mountPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/etc/kubernetes/pki/etcd</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">etcd-certs</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">readOnly</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">            - </span><span style="color:#85E89D;">mountPath</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/backup</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">backup</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">restartPolicy</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">OnFailure</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">hostNetwork</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#85E89D;">volumes</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">          - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">etcd-certs</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">hostPath</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">path</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/etc/kubernetes/pki/etcd</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">type</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">DirectoryOrCreate</span></span>
<span class="line"><span style="color:#E1E4E8;">          - </span><span style="color:#85E89D;">name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">backup</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#85E89D;">hostPath</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">path</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/data/backup</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#85E89D;">type</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">DirectoryOrCreate</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">apiVersion</span><span style="color:#24292E;">: </span><span style="color:#032F62;">batch/v1beta1</span></span>
<span class="line"><span style="color:#22863A;">kind</span><span style="color:#24292E;">: </span><span style="color:#032F62;">CronJob</span></span>
<span class="line"><span style="color:#22863A;">metadata</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">backup</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">namespace</span><span style="color:#24292E;">: </span><span style="color:#032F62;">kube-system</span></span>
<span class="line"><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;"># activeDeadlineSeconds: 100</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">schedule</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;*/1 * * * *&quot;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">jobTemplate</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">template</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">spec</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">containers</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">backup</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;"># Same image as in /etc/kubernetes/manifests/etcd.yaml</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">k8s.gcr.io/etcd:3.2.24</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">env</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">ETCDCTL_API</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">value</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;3&quot;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">command</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;/bin/sh&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">args</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;-c&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;etcdctl --endpoints=https://127.0.0.1:2379 --cacert=/etc/kubernetes/pki/etcd/ca.crt --cert=/etc/kubernetes/pki/etcd/healthcheck-client.crt --key=/etc/kubernetes/pki/etcd/healthcheck-client.key snapshot save /backup/etcd-snapshot-$(date +%Y-%m-%d_%H:%M:%S_%Z).db&quot;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">volumeMounts</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#22863A;">mountPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/etc/kubernetes/pki/etcd</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">etcd-certs</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">readOnly</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">            - </span><span style="color:#22863A;">mountPath</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/backup</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">backup</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">restartPolicy</span><span style="color:#24292E;">: </span><span style="color:#032F62;">OnFailure</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">hostNetwork</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#22863A;">volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">          - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">etcd-certs</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">hostPath</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">path</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/etc/kubernetes/pki/etcd</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">type</span><span style="color:#24292E;">: </span><span style="color:#032F62;">DirectoryOrCreate</span></span>
<span class="line"><span style="color:#24292E;">          - </span><span style="color:#22863A;">name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">backup</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#22863A;">hostPath</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">path</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/data/backup</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#22863A;">type</span><span style="color:#24292E;">: </span><span style="color:#032F62;">DirectoryOrCreate</span></span></code></pre></div><h4 id="对-pv-的数据进行备份" tabindex="-1">对 PV 的数据进行备份 <a class="header-anchor" href="#对-pv-的数据进行备份" aria-label="Permalink to &quot;对 PV 的数据进行备份&quot;">​</a></h4><p>对于 PV 来讲，备份就比较麻烦了。Kubernetes 自身不提供存储能力，它依赖各个存储插件对存储进行管理和使用。因此对于存储的备份操作，尤其是 PV 的备份操作，我们需要依赖各个云提供商的 API 来做 snapshot。</p><p>但是上述对于 Etcd 和 PV 的备份操作并不是很方便，我推荐你通过<a href="https://github.com/vmware-tanzu/velero" target="_blank" rel="noreferrer">Velero</a>来备份 Kubernetes。Velero 功能强大，但是操作起来很简单，它可以帮你做到以下 3 点：</p><ol><li><p>对 Kubernets 集群做备份和恢复。</p></li><li><p>对集群进行迁移。</p></li><li><p>对集群的配置和对象进行复制，比如复制到其他的开发和测试集群中去。</p></li></ol><p>而且 Velero 还提供针对单个 Namespace 进行备份的能力，如果你只想备份某些关键的业务和数据，这是一个十分方便的功能。</p><p>说了这么多，下满我们来看看 Velero 是如何备份 Kubernetes 的。</p><h3 id="使用-velero-对-kubernetes-进行备份" tabindex="-1">使用 Velero 对 Kubernetes 进行备份 <a class="header-anchor" href="#使用-velero-对-kubernetes-进行备份" aria-label="Permalink to &quot;使用 Velero 对 Kubernetes 进行备份&quot;">​</a></h3><p>这是 Velero 的架构图：</p>`,21),y=s('<p>图 2：Velero 架构图</p><p>Velero 由两部分组成：</p><ul><li><p><strong>一个命令行客户端</strong>，你可以运行在本地，通过命令行完成对 Etcd 以及 PV 的备份操作；你也可以像使用 kubectl 操作 Kubernetes 资源一样备份 Kubernetes。</p></li><li><p><strong>一个运行在 kubernetes 集群中的服务</strong>（BackupController），负责执行具体的备份和恢复操作。</p></li></ul><p>我们来看看具体使用时的流程：</p><ol><li><p>通过本地 Velero 客户端发送备份命令，比如图中的<code>velero backup create test-project-s2i --include-namespaces test</code>，这条命令会向 APIServer 中创建一个 Backup 对象。</p></li><li><p>BackupController 会去监测并验证这个 Backup 对象的合法性，比如参数的定义。</p></li><li><p>BackupController 通过向 APIServer 查询相关数据开始备份工作。</p></li><li><p>BackupController 将查询到的数据备份到远端的对象存储中。</p></li></ol><p>Velero 在 Kubernetes 集群中创建了很多 CRD （Custome Resource Definition）以及相关的控制器，通过这些进行备份恢复等操作。因此，对集群的备份和恢复，实质上是对这些相关 CRD 的操作。BackupController 会根据 CRD 来确定该进行何种操作。我会在《<strong>27 | K8s CRD：如何根据需求自定义你的 API？</strong>》中专门介绍 CRD 的使用。</p><p>Velero 支持两种关于后端存储的 CRD，分别是 BackupStorageLocation 和 VolumeSnapshotLocation。</p><ul><li><p>BackupStorageLocation 主要用来定义 Kubernetes 集群资源的数据存放位置，也就是集群对象数据，而不是 PVC 和 PV 的数据。你可以从这个<a href="https://velero.io/docs/main/supported-providers/" target="_blank" rel="noreferrer">支持列表</a>里面找到目前官方和第三方支持的后端存储服务，主要是以支持 S3 兼容的存储为主，比如 AWS S3、阿里云 OSS、Minio 等。</p></li><li><p>VolumeSnapshotLocation 主要用来给 PV 做快照，快照功能通常由 Amazon EBS Volumes、Azure Managed Disks、Google Persistent Disks 等云厂商提供，你可以根据需要选择使用各个云厂商的服务。或者你使用专门的备份工具<a href="https://github.com/restic/restic" target="_blank" rel="noreferrer">Restic</a>，把 PV 数据备份到<a href="https://docs.microsoft.com/en-us/azure/aks/azure-files-dynamic-pv" target="_blank" rel="noreferrer">Azure Files</a>、阿里云 OSS 中去。阿里云目前已经提供了<a href="https://github.com/AliyunContainerService/velero-plugin" target="_blank" rel="noreferrer">基于 Velero 的插件</a>。</p></li></ul><p>除此之外，BackupController 在工作过程中，还会创建其他的 CRD，主要用于内部的逻辑处理。你可以参考阿里云的<a href="https://developer.aliyun.com/article/726863" target="_blank" rel="noreferrer">文档</a>进一步学习。</p><p>如果你没有阿里云的 OSS，或者集群是线下的内部集群，你也可以自行搭建 Minio，作为对象存储服务来代替阿里云的 OSS。你可以参考官方的<a href="https://velero.io/docs/main/contributions/minio/" target="_blank" rel="noreferrer">文档</a>进行详细的安装配置工作。</p><h3 id="写在最后" tabindex="-1">写在最后 <a class="header-anchor" href="#写在最后" aria-label="Permalink to &quot;写在最后&quot;">​</a></h3><p>在分布式的世界里，我们很难保证万无一失。当你在 Kubernetes 集群中部署越来越多的业务的时候，对集群和数据的灾备是非常有必要的。在今年 7 月份，我们常用的代码托管平台 Github 就发生了 Kubernetes 故障 ，导致了持续 4 个半小时的严重故障。所以，我建议对于关键性的业务数据，要记得时常备份。</p><p>那么，你对于 Kubernetes 的备份还有哪些想要了解的呢？欢迎在留言区留言。</p>',13);function i(u,d,F,b,k,h){const n=l("Image");return o(),t("div",null,[r,a(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/6B/F9/Ciqc1F-qTFCAfuayAAHPVgKdC98338.png"}),p(),E,a(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/6C/04/CgqCHl-qTK6ADCLwAAFaThL2Fxk754.png"}),p(),y])}const _=e(c,[["render",i]]);export{m as __pageData,_ as default};
