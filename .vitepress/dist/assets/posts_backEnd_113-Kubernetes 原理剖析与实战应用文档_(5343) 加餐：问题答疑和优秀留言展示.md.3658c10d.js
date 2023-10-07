import{_ as e,o as t,g as o,Q as a}from"./chunks/framework.4e7d56ce.js";const _=JSON.parse('{"title":"加餐：问题答疑和优秀留言展示","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/113-Kubernetes 原理剖析与实战应用文档/(5343) 加餐：问题答疑和优秀留言展示.md","filePath":"posts/backEnd/113-Kubernetes 原理剖析与实战应用文档/(5343) 加餐：问题答疑和优秀留言展示.md","lastUpdated":1696338709000}'),r={name:"posts/backEnd/113-Kubernetes 原理剖析与实战应用文档/(5343) 加餐：问题答疑和优秀留言展示.md"},p=a('<h1 id="加餐-问题答疑和优秀留言展示" tabindex="-1">加餐：问题答疑和优秀留言展示 <a class="header-anchor" href="#加餐-问题答疑和优秀留言展示" aria-label="Permalink to &quot;加餐：问题答疑和优秀留言展示&quot;">​</a></h1><p>最近收到了很多学员的留言，因此，我整理了大家的问题，也挑选了一些同学的留言，他们在留言区分享了自己的收获，希望其他同学也可以踊跃发言~</p><p>首先我们来看看同学们问得比较多的几个问题，我按照课程上线的时间依次回答。</p><h3 id="经典问题答疑" tabindex="-1">经典问题答疑 <a class="header-anchor" href="#经典问题答疑" aria-label="Permalink to &quot;经典问题答疑&quot;">​</a></h3><h4 id="第-02-讲" tabindex="-1">第 02 讲 <a class="header-anchor" href="#第-02-讲" aria-label="Permalink to &quot;第 02 讲&quot;">​</a></h4><p>问题 1：<strong>监听未调度的 pod 是什么意思，老师没太明白。</strong></p><p>答：pod 创建出来后，还没有被调度，这种 pod 叫 未调度的 pod。调度器要去 apiserver 监听（你可以理解为轮询、查询）拿到这些 pod，根据调度策略，选择合适的节点。</p><p>问题 2：<strong>一般 node 向 master 上报状态的频率设置多少比较合适？如果上报失败了，被标记了 nodelosy，该如何处理？</strong></p><p>答：这个没有统一的结论，要结合集群大小、apiserver 的负载能力来设置，是一个可以调优的参数，但是不建议初学者去调试。目前社区默认的是 10s，就使用默认配置即可，已经可以满足绝大多数的集群大小和使用场景了。上报过程如果遇到网络短暂中断等情况，不必担心，不会因为一次失败就标记为 NodeLost 的。如果最后被标记了，可以结合告警等手段，及时发现问题。</p><p>问题 3：<strong>声明式还是有点糊涂，希望老师讲得更清楚点呀！</strong></p><p>答：打个比方，你现在想吃鱼。声明式 API 就是给服务员下单，我想要盘酸菜鱼，就 OK 了，其他不用操心，静静等待上桌即可。命令式 API 就是自己去 follow 所有的流程，从买鱼、杀鱼、片鱼、清洗到下锅。套用比较火的台词，声明式 API 就是&quot;我不管你怎么想，我就要这个&quot;，命令式 API 就是&quot;我不管你怎么想，照我说的做&quot;。</p><h4 id="第-03-讲" tabindex="-1">第 03 讲 <a class="header-anchor" href="#第-03-讲" aria-label="Permalink to &quot;第 03 讲&quot;">​</a></h4><p>这里，大家的问题就比较多了，有问到运维的，有问到升级相关的，有问到 kubernetes 到底是什么的，还有很多人问二进制部署相关的，我们来看一下。</p><p>问题 1：<strong>那平时运维管理这些容器用 kubernetes dashbord 可视化看吗？</strong></p><p>答：这个是可以的。</p><p>问题 2：<strong>还是没搞明白，kubernetes 到底是啥，能干啥？</strong></p><p>答：Kubernetes 是一个容器管理平台，可以用来做容器化的应用发布部署，并提供容器调度、弹性伸缩、负载均衡、自愈等诸多功能。你可以将 Kubernetes 理解成&quot;容器云&quot;。</p><p>问题 3：<strong>关于升级策略，有个疑问：假如初始版本和官方一致，例如 1.16，0.5 年后官方升级至 1.18，我方升级至 1.17，相差 1 个小版本；1 年后官方升级至 1.20，我方升级至 1.18，相差 2 个小版本；1.5 年后官方升级至 1.22，我方升级至 1.19，相差 3 个小版本；2 年后官方升级至 1.24，我方升级至 1.20，相差 4 个小版本。那么，我方就必须在这两年内最少要做一次小版本升级。</strong></p><p>答：是的。社区也意识到这个问题，所以从 1.19 版本开始，支持窗口已经延长到一年了，也就是你可以一年内不用升级 1.19 的集群。不过对于之前的版本，还是得抓紧升级上来的。</p><blockquote><p>关于升级的问题，有位名叫&quot;**龙&quot; 的用户也和我们分享了他的故事：我在上家公司，集群规模几十台，生产环境从1.8 升级到 1.16 了，两个月左右的验证测试吧，中间遇到过 metrics 的变化，apiversion 的废弃还有老师说的 spec hash 问题，问题是比较多，但是充分验证也是可行的。</p></blockquote><p>在第 03 讲里，很多同学问我为什么不用二进制部署，并希望我可以介绍一下二进制搭建 Kubernetes 高可用集群的方法，我在这里统一回复一下。</p><p>问题 4：<strong>为啥不用二进制部署啊？</strong></p><p>答：对于很多刚入门的人来说，二进制安装步骤过于烦琐。如果你已经知道一些安装的步骤，比如一些参数配置、配置文件、证书等，你可以选择二进制安装。</p><p>问题 5：<strong>可以介绍一下二进制搭建 Kubernetes 高可用集群的方法吗？</strong></p><p>答：其实是一样的，都需要配置一些证书以及参数。你可以通过 kubeadm 帮你生成一些证书，然后通过 systemd 来管理各个组件的启动即可。你可以参考这个<a href="https://www.jianshu.com/p/8067912667f1" target="_blank" rel="noreferrer">链接</a>中的内容。</p><h4 id="第-05-讲" tabindex="-1">第 05 讲 <a class="header-anchor" href="#第-05-讲" aria-label="Permalink to &quot;第 05 讲&quot;">​</a></h4><p>问题：<strong>请问老师，Pod 从 ContainerCreating 状态变为 Running 状态的过程大概经历了 10 分钟，这种场景如何排查呢？</strong></p><p>答：先排查调度器是否调度，再看调度节点的情况。可以通过 kubectl descibe pod-name -n some-ns 来看看相关的 event 信息。</p><h4 id="第-10-讲" tabindex="-1">第 10 讲 <a class="header-anchor" href="#第-10-讲" aria-label="Permalink to &quot;第 10 讲&quot;">​</a></h4><p>问题：<strong>假如我创建了 10G 的 PV，已经通过 PVC 挂载至 Pod，用过一段时间后，发现空间不够，需要扩展 PV，如何将它扩展至 20G？</strong></p><p>答：修改 pvc 的 size 即可。</p><h4 id="第-11-讲" tabindex="-1">第 11 讲 <a class="header-anchor" href="#第-11-讲" aria-label="Permalink to &quot;第 11 讲&quot;">​</a></h4><p>问题：<strong>请教下老师，服务 A 使用 nodeport 访问，服务 B 使用 host 模式，如何访问？宿主的 ip 不是固定的。</strong></p><p>答：nodeport 的话，可以通过任一宿主机 ip+port 的方式来访问。所以服务 A 和服务 B 可以通过任一宿主机 ip 来访问。</p><p>以上就是我挑选出来的一些留言，希望也能对其他的学员有一定的帮助。没有展示的问题我也会抽空逐个解答。希望你能够多思考，提出更多的问题，帮助你加深对 k8s 的理解，也能更好地掌握这门课的知识。下面我就来分享一下对课程的内容做了很棒总结的一些留言。</p><h3 id="优秀用户留言" tabindex="-1">优秀用户留言 <a class="header-anchor" href="#优秀用户留言" aria-label="Permalink to &quot;优秀用户留言&quot;">​</a></h3><p>&quot;**龙&quot;同学除了在前文我提到的第 03 讲中分享过他的经验，也对第 01 和第 04 讲的内容有很好的思考，我们来看一下。</p><p>在01 讲中，我讲到 Kubernetes 是如何火起来的，&quot;**龙&quot;同学的留言是这样说的：&quot;我常常给别人做这个比喻，docker 就像是一块通用的砖，既能盖普通的房子也能盖白宫，让你不用担心制造砖的细节和标准。但是通过砖去盖房子的步骤要我们去探索。k8s 则是图纸，你有多高的设计能力就能快速给你搞出房子。k8s 的出现我们不仅要感谢 google 还有感谢 docker 毕竟是 google 看到 docker 太火了并且&#39;不听话&#39;，才决定&#39;打&#39;他的，现在已经被打到体无完肤了。&quot;</p><p>而在04 讲中，我讲到 Kubernetes 是如何搞定&quot;不可变基础设施&quot;的，&quot;**龙&quot;同学的留言：&quot;不可变基础设施是容器化改造中让业务比较难理解的东西，以前虚拟机的思想已经固化了，就想着进去改掉东西。容器化的过程中还有业务的架构导致很难容器化，还要业务进行架构调整。&quot;</p><p>当然，还有其他一些优秀的同学的留言，我也在这里整理了出来，我们来看。</p><p>在08 讲，我谈到 Kubernetes 管理业务配置方式，&quot;**某&quot;同学说了下他个人的&quot;原始&quot;经验：&quot;对于 ConfigMap 或者 Secret 的&#39;热更新&#39;，我目前的方法比较原始。在 Deployment 对象中增加一个 ConfigMap 或 Secret 发生变化，则修改这个注解的值，从而触发工作负载对象的滚动升级。&quot;</p><p>在14 讲中，关于&quot;如何在 Kubernetes 中做日志收集与管理&quot;的问题，&quot;**0530&quot;这位同学留言到：&quot;一般程序的业务日志都不是标准输出流的......都是自定义的file的日志，还是使用每个node挂一个agent最常用，可以结合ELK使用哈。&quot;</p><p>还有许多优秀的留言，受限于篇幅，这里就没有一一放出了，你在学习的过程中想必都看到过了。以后如果发现了更多的优秀的留言，我也会挑选出来，感谢同学们对课程的喜爱，希望我们能一起把课程做得更好~</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>在最后，祝你在学习 Kubernetes 的路上一路精进，掌握 k8s，成功进大厂！</p>',45),n=[p];function s(u,d,i,h,l,c){return t(),o("div",null,n)}const b=e(r,[["render",s]]);export{_ as __pageData,b as default};
