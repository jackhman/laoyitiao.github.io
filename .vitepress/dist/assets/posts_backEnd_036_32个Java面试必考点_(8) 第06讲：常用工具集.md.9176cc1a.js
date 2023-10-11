import{_ as p,D as o,o as r,g as s,J as l,h as t,Q as e,m as i}from"./chunks/framework.f67d7268.js";const j=JSON.parse('{"title":"第06讲：常用工具集","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/036_32个Java面试必考点/(8) 第06讲：常用工具集.md","filePath":"posts/backEnd/036_32个Java面试必考点/(8) 第06讲：常用工具集.md","lastUpdated":1696682708000}'),n={name:"posts/backEnd/036_32个Java面试必考点/(8) 第06讲：常用工具集.md"},c=e('<h1 id="第06讲-常用工具集" tabindex="-1">第06讲：常用工具集 <a class="header-anchor" href="#第06讲-常用工具集" aria-label="Permalink to &quot;第06讲：常用工具集&quot;">​</a></h1><p>本课时主要介绍常用的工具，将会讲解三个知识点：</p><ul><li><p>JVM 相关工具的作用和适用场景；</p></li><li><p>Git 常用命令和工作流；</p></li><li><p>Linux 系统中常用分析工具。</p></li></ul><h6 id="常用工具汇总" tabindex="-1">常用工具汇总 <a class="header-anchor" href="#常用工具汇总" aria-label="Permalink to &quot;常用工具汇总&quot;">​</a></h6><p>常用工具汇总如下图所示。</p><br>',6),u=e('<br><p>说明：这里列出的都是一些相对独立的工具或者命令，不包括像 ZK、Redis 这样的服务，以及像 Spring 这类的框架。这些工具都是各自类型中最常用的，该图不是以全面为目的。</p><h6 id="团队协作工具" tabindex="-1">团队协作工具 <a class="header-anchor" href="#团队协作工具" aria-label="Permalink to &quot;团队协作工具&quot;">​</a></h6><p>如上图所示，先看左边的团队协作类工具。</p><ul><li><p>Ant+ivy、Maven、Gradle 都是用来构建项目、管理依赖的工具。其中 Ant 通过直接引用 jar 文件来进行依赖管理，通过脚本来描述，执行不同的构建目标。目前 Ant 使用得已经比较少，Maven 是比较主流的项目管理工具。</p></li><li><p>Maven 通过 POM 文件对项目进行描述，通过约定提供可执行的目标，通过 GroupId、artifactId、version等坐标对依赖关系进行管理，Maven 可以从远程或本地仓库中自动下载依赖。</p></li><li><p>Gradle 是结合了 Ant 与 Maven 优点的自动化构建工具，基于 Groovy 的 DSL 也就是领域专用语言。既有 Ant 的强大和灵活，又有 Maven 的生命周期管理，可以自动下载依赖。目前使用 Gradle 管理项目的团队也越来越多。</p></li><li><p>Git 和 SVN 都是版本管理工具，最主要区别是 SVN 是集中式的，Git 是分布式的，分支管理更灵活。目前 SVN 使用的已经相对较少了，Git 是大部分互联网公司使用的版本管理工具，后面的详解部分会专门针对 Git 的使用及 Git 工作流进行讲解。</p></li></ul><h6 id="质量保证工具" tabindex="-1">质量保证工具 <a class="header-anchor" href="#质量保证工具" aria-label="Permalink to &quot;质量保证工具&quot;">​</a></h6><p>质量保证类工具有 CheckStyle、FindBugs、SonarQube 等等。</p><ul><li><p>其中 CheckStyle、FindBugs 是静态代码检测工具，可以通过 IDE 集成，对本地代码进行检测。</p></li><li><p>SonarQube 是代码质量管理平台，默认集成了前面提到的两种工具，比较适合对项目质量进行整体保障。</p></li></ul><h6 id="压测工具" tabindex="-1">压测工具 <a class="header-anchor" href="#压测工具" aria-label="Permalink to &quot;压测工具&quot;">​</a></h6><p>压测工具类有 LoadRunner、JMeter、AB、JMH。</p><ul><li><p>LoadRunner 和 JMeter 都是比较专业的测试工具，可以提供专业的报表和数据分析，比较适合 QA 人员使用。</p></li><li><p>AB 是 Apache 提供的一个简洁方便的压测工具，比较适合研发人员对 HTTP 接口进行简单并发压测。</p></li><li><p>JMH 主要是针对 JVM 进行基准测试，更关注方法层面的性能基准，如果想知道方法在两种不同实现下的吞吐量，就可以使用 JMH。对于应聘 Java 研发岗位的同学来说，测试工具部分可以重点了解一下 JMH。</p></li></ul><h6 id="容器与代理工具" tabindex="-1">容器与代理工具 <a class="header-anchor" href="#容器与代理工具" aria-label="Permalink to &quot;容器与代理工具&quot;">​</a></h6><p>容器与代理部分，目前主流的 Java Web 容器是 Tomcat，主流的代理是 Nginx。不过这里要多了解一些趋势，就是随着微服务的盛行，Envoy、OpenResty、Kong、Zuul 等的 API Gateway 网关的使用也越来越普遍。随着 DevOps 理念的普及，CI/CD 也就是持续集成、持续部署，也越来越被大家所重视，这部分我们需要知道比较常用的 Jenkins 和 GitLab CI。</p><ul><li><p>Jenkins，老牌的持续集成框架，可以支持不同类型的项目的构建、测试、部署，支持丰富的插件功能，和易用的管理界面。</p></li><li><p>GitLab CI 作为 GitLab 提供的一个持续集成的套件，完美和 GitLab 进行集成，更加简单易用，比较适合 CI 流程比较简单的项目。</p></li><li><p>Travis 和 CircleCI 都是开源项目中比较常用的持续集成框架，如果是研发开源项目可以进一步了解这两个框架的使用方式。</p></li></ul><h6 id="文档管理工具" tabindex="-1">文档管理工具 <a class="header-anchor" href="#文档管理工具" aria-label="Permalink to &quot;文档管理工具&quot;">​</a></h6><p>如上图右边，JVM 工具和 Linux 系统分析工具，在后面会重点讲解，这里略过。来看文档管理工具。</p><ul><li><p>JavaDoc 通过注解方式，来对 Java 类和方法进行描述，并生成描述文档。</p></li><li><p>Swagger 是一个规范、完整的框架，用于生成、描述 RESTful API，Swagger 支持多种语言，提供了可视化的 Swagger UI，Java 中 Swagger 使用注解方式描述接口、参数、返回值等，非常适合用来对 RESTful 接口进行管理，特别是跨语言的 Web 服务。</p></li></ul><h2 id="网络工具" tabindex="-1">网络工具 <a class="header-anchor" href="#网络工具" aria-label="Permalink to &quot;网络工具&quot;">​</a></h2><p>服务之间一般都要通过网络进行交互，所以工程师在调试、排查问题时需要掌握常用的网络工具。 这里介绍几种常用网络工具。</p><ul><li><p>Postman 是调试网页的 Chrome 插件，相当于一个客户端，可以模拟用户发起的 HTTP 请求，是高效的接口测试工具，非常适合用来对 HTTP 接口进行联调与测试。</p></li><li><p>Wireshark 是个功能强大的网络包分析工具，支持各种协议的网络包分析，可以直接抓包，也可以配合 tcpdump 来使用，分析 tcpdump 抓包的结果。例如分析 HTTP 服务发、收包时间，链接的建立、关闭过程，请求包的分包大小与时序，TCP 窗口大小等等。</p></li><li><p>Fiddler 只针对 HTTP 请求进行抓包，可以修改请求或者模拟慢网速，是 Web 前端、移动端调试的利器，Charles 与 Fiddler 功能类似，支持 mac 系统，比较适合移动端抓包使用。</p></li></ul><h6 id="详解-jvm-工具" tabindex="-1">详解 JVM 工具 <a class="header-anchor" href="#详解-jvm-工具" aria-label="Permalink to &quot;详解 JVM 工具&quot;">​</a></h6><h6 id="jmc" tabindex="-1">JMC <a class="header-anchor" href="#jmc" aria-label="Permalink to &quot;JMC&quot;">​</a></h6><p>首先是 JVM 的相关工具，第一个要介绍的是 JMC，就是 Java Mission Control。JMC 是 JDK1.7 中提供的图形化 JVM 监控与分析工具，如下图所示，JMC 包括 JVM 浏览器和 JMX 控制台，以及 JFR 也就是飞行记录器三部分。</p><br>',24),h=i("p",null,"JVM 浏览器可以列出正在运行的 Java 程序的 JVM，每个 JVM 实例叫作一个 JVM 连接。JVM 浏览器使用 JDP 也就是 Java 发现协议，可以连接到本地和远程运行的 JVM。",-1),_=i("p",null,"JMX 是 Java 管理扩展规范，能够管理并监控 JVM。JMX 通过对 Mbean 的管理，可以实时收集 JVM 信息，比如类实例信息、堆使用情况、CPU 负载、线程信息等，以及其他可以通过 MBeans 管理的一些运行时属性。",-1),d=i("p",null,"JFR 提供了深入到 JVM 内部去看运行时状态的能力，是一个非常强大的性能 Profile 工具，适合对程序进行调优和问题排查。JFR对JVM运行时产生的事件进行采集，可以通过指定采集的事件类型和频率来收集非常全面的数据信息。这里我主要介绍一下使用JFR可以分析到哪些信息。",-1),J=i("p",null,"如下图所示，JFR 可以采集、分析五大类信息。",-1),m=e('<ol><li><p>内存信息，可以获取到 GC 的不同阶段及耗时情况、GC 的停顿时间、GC 的分代大小等配置信息，能够查看到对象分配，包括 TLAB 栈上分配情况，以及对象统计信息等等。</p></li><li><p>代码信息，可以分析出热点的类、热点的方法、热点的调用树、运行时的异常信息、编译情况包括 OSR 栈上替换等信息，以及类的加载与卸载情况。</p></li><li><p>线程信息部分，可以分析到：热点的线程、线程的争用情况、线程的等待时间、以及锁相关的信息。</p></li><li><p>IO 信息部分，可以获得收集期间的磁盘 IO，也就是文件读写信息，以及网络 IO 等信息。</p></li><li><p>系统信息，可以获取到操作系统信息、进程相关信息以及环境变量等信息。</p></li></ol><br><p>总结一下：JMX 和 JFR 都可以获得 JVM 运行的信息。JMX 主要用来对 JVM 进行监控与管理，通过扩展 Mbean 支持自定义的管理能力。JFR 主要用来对 JVM 运行信息进行周期性采集，用来对运行状况进行分析。</p><h6 id="btrace" tabindex="-1">BTrace <a class="header-anchor" href="#btrace" aria-label="Permalink to &quot;BTrace&quot;">​</a></h6><p>如果分析线上问题时，发现日志打的不全、无法定位怎么办？添加日志重新上线肯定不是个好主意，特别是调试时，可能需要反复添加日志来定位问题。或者，线上出现的问题很难复现，你根本没有机会添加日志再继续分析，这时就需要使用到 BTrace了。BTrace 是一个 JVM 实时监控工具，被 Java 工程师奉为性能调优和线上题诊断的神器。</p><p>BTrace 基于动态字节码修改技术来实现对运行时的 Java 程序进行跟踪和替换。也就是说可以在不重启 JVM 的情况下监控系统运行情况，获取 JVM 运行时的数据信息，比如方法参数、返回值、全局变量、堆栈信息等。</p><p>BTrace 可以做什么：</p><ol><li><p>可以对方法进行定位拦截，获取方法的入参、返回值、执行时间等信息</p></li><li><p>可以查看某类对象的创建情况</p></li><li><p>可以对内存使用情况进行统计，可以查看对象大小</p></li><li><p>可以查看同步块执行情况</p></li><li><p>可以查看异常抛出情况及导致异常的参数信息</p></li><li><p>能够支持定时执行检测任务</p></li><li><p>能够查看类加载的信息</p></li><li><p>能够进行死锁检测</p></li><li><p>可以打印线程栈信息</p></li><li><p>可以监控文件或网络的读写情况。</p></li></ol><br><p>如上所述，BTrace 的功能非常强大，几乎无所不能。因为 Btrace 会把逻辑直接植入到运行的 JVM 中，为了保证安全，在使用上进行了一些限制。</p><p>那么，BTrace 不能做什么：</p><ol><li><p>BTrace 不能创建新的对象</p></li><li><p>不能抛出或捕获异常</p></li><li><p>不能使用循环，例如 for、while</p></li><li><p>BTrace 脚本的属性和方法必须使用 static 修饰</p></li><li><p>不能使用 synchronized 的同步块或同步方法</p></li><li><p>不能调用实例方法或静态方法，只能使用 BTraceUtils 类中提供的方法。</p></li></ol><br><p>可见，使用 BTrace 的条件还是非常严格的。需要注意三点：</p><ul><li><p>不恰当地使用 BTrace 可能导致 JVM 崩溃；</p></li><li><p>BTrace 所做的修改是会一直生效的，直到重新启动 JVM 后才会消除；</p></li><li><p>可以通过设置 JVM 参数取消 BTrace 的安全限制。</p></li></ul><h6 id="其他-jvm-工具" tabindex="-1">其他 JVM 工具 <a class="header-anchor" href="#其他-jvm-工具" aria-label="Permalink to &quot;其他 JVM 工具&quot;">​</a></h6>',16),M=e('<ul><li><p>jps 用来查看 Java 进程的信息，包括进程 id、主类名称、主类全路径等。</p></li><li><p>jmap 可以查看JVM中对象的统计信息，包括内存占用、实例个数、对象类型等等，jmap 可以把堆 dump 下来配合内存分析工具 MAT 进行分析。</p></li><li><p>jstat 对 JVM 的资源和性能进行实时监控，统计项主要包括：类加载情况、内存容量及使用量、 GC 次数和时间等等。</p></li><li><p>jstack 可以查看 JVM 线程栈的信息，包括：线程名称、序号、优先级 prio、线程状态、锁状态等。</p></li><li><p>jinfo 可以查看运行中 JVM 的全部参数，还可以设置部分参数。</p></li><li><p>jcmd 是 JDK1.7 后提供的工具，可以向 JVM 发送诊断命令。它的功能非常强大，基本上包括了 jmap、jstack、jstat 的功能。可以重点了解这个工具。</p></li><li><p>其他还有 jconsole、JProfiler、jvisualVM 等，功能跟 JMC 基本重合，建议直接使用 JMC 即可。</p></li></ul><br><p>列举几个实际应用场景。</p><ul><li><p>当你排查线上问题，需要查看 GC 日志，发现没有打印 GC 的详细信息，可以通过 jinfo 开启 JVM 参数 PrintGCDetails 来动态生效。</p></li><li><p>当你分析内存泄露风险时，可以通过 jmap 或 jcmd 定期获取堆对象的统计信息，来发现持续增长的可疑对象。</p></li><li><p>当你遇到某一时刻所有服务都出现耗时较高的问题，可以通过 jstat 来观察 GC 回收状况，看看 GC 停顿耗时是否过高。</p></li><li><p>当你遇到 JVM 中某一个服务卡死或者停止处理时，可以通过 jstack 查看线程栈，看是否有多个线程处于 BLOCKED 状态产生了死锁。</p></li><li><p>当你的服务上线后发现性能达不到预期，可以使用 JMC 来分析 JVM 运行信息，看看有哪些热点方法可以优化，哪些线程争用可以避免。</p></li></ul><h6 id="详解-git" tabindex="-1">详解 Git <a class="header-anchor" href="#详解-git" aria-label="Permalink to &quot;详解 Git&quot;">​</a></h6><h6 id="git-常用命令" tabindex="-1">Git 常用命令 <a class="header-anchor" href="#git-常用命令" aria-label="Permalink to &quot;Git 常用命令&quot;">​</a></h6><p>Git 与 SVN 的区别在前面知识点汇总时已经简单介绍过了。再看 Git 的常用命令及对应的使用场景。</p><p>Git 对版本是分布式管理，因此有四个保存数据的区域，如下图中浅绿色的部分，分别是本地工作区 Workspace、本地暂存区 Stage、本地仓库和远程仓库。</p><br>',9),b=e('<p>开发时先从远程拉取代码到工作区，可以有 clone、pull、fetch+checkout 几种方式，如图中向左的几个箭头所示。在提交代码时，先通过 add 命令添加到暂存区，然后 commit 提交到本地仓库，最后使用 push 推送到远程仓库。如图中向右的几个箭头所示。</p><p>稍微注意一下 fetch 与 pull 的区别。</p><ul><li><p>fetch 是从远程仓库同步到本地仓库，但并不会合并到工作区。</p></li><li><p>pull 相当于执行 fetch 命令+merge 命令，先同步到本地仓库，然后在 merge 到工作区。</p></li></ul><p>Git 的命令行提示非常友好，对常用 Git 操作的说明非常完善，其他的命令不展开介绍。</p><h6 id="git-常用工作流" tabindex="-1">Git 常用工作流 <a class="header-anchor" href="#git-常用工作流" aria-label="Permalink to &quot;Git 常用工作流&quot;">​</a></h6><p>使用 Git 进行团队协作开发时，多人协作、多分支开发是很常见的。为了更好得管理代码，需要制定一个工作流程，这就是我们说的工作流，也可以叫分支管理策略。常见的基于 Git 的工作流有 Git-flow工作流、GitHub 工作流和 GitLab 工作流，如下图所示。</p><br>',7),T=e('<ol><li><p>Git-Flow 工作流</p><ol><li><p>如上图左侧所示，Git-Flow 按功能来说，分为 5 条分支，在图中以不同颜色表示，其中 master 和 develop 是长期分支。master 分支上的代码都是版本发布状态；develop 分支则代表最新的开发进度。</p></li><li><p>当需要开发某些功能时，就从 develop 拉出 feature 分支进行开发，开发完成并验证后就可以合并回 develop 分支。当 develop 上的代码达到一个稳定的状态，可以发布版本的时候，会从 develop 合并到 release 分支进行发布，如果验证有问题就在 release 分支进行修复，修复验证通过后进行正式发布，然后合并到 master 分支和 develop 分支。还有一个 hotfix 分支用来做线上的紧急 bug 修复，hotfix 直接从 master 拉出分支修改，修改验证完成后直接合并回 master，并同步到 develop 分支。</p></li><li><p>Git-Flow 流程非常完善，但对于很多开发人员和团队来说，会稍微有些复杂，而且没有图形页面。</p></li></ol></li><li><p>GitHub 工作流</p><ol><li><p>现在来看另一种更简单的工作流，如上图所示，中间的 GitHub 工作流。</p></li><li><p>GitHub 工作流只有一个长期分支 master，而且 master 分支的代码永远是可发布状态。如果有新功能开发，可以从 master 分支上检出新分支，开发完成需要合并时，创建一个合并到 master 到 PR，也就是 pull request。当 review 通过或者验证通过后，代码合并到 master 分支。GitHub 工作流中 hotfix 热修复的流程和 feature 分支完全一</p></li></ol></li><li><p>GitLab 工作流</p><ol><li>如上图所示，看右面的 GitLab 工作流。前两种工作流各有优缺点，Git-Flow 稍微复杂，GitHub 的单一主分支有时会略显不足。GitLab 结合了两者的优势，既支持 Git-Flow 的多分支策略，也有 GitHub Flow 的一些机制，比如 Merge Request和 issue 跟踪。GitLab工作流使用 pre-production 分支来进行预发管理，使用 prodution 分支来发布版本。我的团队目前使用的就是 GitLab 工作流。</li></ol></li></ol><h6 id="linux-工具" tabindex="-1">Linux 工具 <a class="header-anchor" href="#linux-工具" aria-label="Permalink to &quot;Linux 工具&quot;">​</a></h6><p>来看 Linux 系统下常用的分析工具。首先是如下图表格中列出的 stat 系列。</p><br>',4),C=i("ul",null,[i("li",null,[i("p",null,"vmstat 可以获得有关进程、内存页面交换、虚拟内存、线程上下文切换、等待队列等信息。能够反映系统的负载情况。一般用来查看进程等待数量、内存换页情况、系统上下文切换是否频繁等。")]),i("li",null,[i("p",null,"iostat 工具可以对系统的磁盘操作活动进行监视，同时也可以显示 CPU 使用情况，一般用来排查与文件读写有关的问题，例如排查文件写入耗时较高时，可以查看 await 和 util 是否过高。iotop 是查看磁盘 I/O 使用状况的 top 类工具，想知道到底哪个进程产生了大量的 IO 时可以使用 iotop。")]),i("li",null,[i("p",null,"ifstat 是简洁的实时网络流量监控工具，可以查看系统的网络出口、入口使用情况。iftop 可以用来监控网卡的实时流量、反向解析 IP、显示端口信息等，通过iftop很容易找到哪个ip在霸占网络流量。")]),i("li",null,[i("p",null,"netstat 是一个监控系统网络状态的工具，它可以查看网络连接状态，监听了哪些接口、链接相关的进程等信息，能够显示与 IP、TCP、UDP 和 ICMP 协议相关的统计数据，是非常常用的网络工具。")]),i("li",null,[i("p",null,"dstat 是一个全能实时系统信息统计工具，能够统计 CPU 占用，内存占用，网络状况，系统负载，进程信息，磁盘信息等等，可以用来替换 vmstat、iostat、netstat 和i fstat 这些工具。")])],-1),g=i("br",null,null,-1),A=i("p",null,"再来看如下图的几个工具。",-1),V=e('<ul><li><p>strace 是一个用于诊断、调试程序运行时系统调用的工具，可以动态跟踪程序的运行，能够清楚地看到一个程序运行时产生的系统调用过程及其使用的参数、返回值和执行耗时。</p></li><li><p>JVM 执行 native 方法时，可以很方便的通过 strace 来进行调试，例如在执行系统读写时，线程卡住很长时间，就可以用 strace 来查看系统调用的参数和耗时。</p></li><li><p>GDB 是一个强大的命令行调试工具，可以让程序在受控的环境中运行，让被调试的程序在指定的断点处停住，也可以动态的改变程序的执行环境。当 JVM 因为未知原因 crash 时，可以通过 GDB 来分析 crash 时产生的 coredump 文件，来分析定位问题。</p></li><li><p>lsof 是一个列出当前系统打开文件的工具。Linux 中一切皆文件，包括设备、链接等都是以文件形式管理的，因此通过 lsof 工具查看文件列表对系统监测以及排错都很有帮助。</p></li><li><p>tcpdump 是一个强大的网络抓包工具，在分析服务之间调用时非常有用。可以将网络中传送的数据包抓取下来进行分析。tcpdump 提供灵活的抓取策略，支持针对网络层、协议、主机、网络或端口的过滤，并提供 and、or、not 等逻辑语句来去掉不想要的信息。</p></li><li><p>traceroute 是一个网络路由分析工具，利用 ICMP 协议定位本地计算机和目标计算机之间的所有路由。traceroute 对服务，特别是经过公网的服务之间的网络问题排查非常有帮助。</p></li></ul><h6 id="考察点和加分项" tabindex="-1">考察点和加分项 <a class="header-anchor" href="#考察点和加分项" aria-label="Permalink to &quot;考察点和加分项&quot;">​</a></h6><h6 id="考察点" tabindex="-1">考察点 <a class="header-anchor" href="#考察点" aria-label="Permalink to &quot;考察点&quot;">​</a></h6><p>以上是常用工具的知识重点。接下来从面试官角度总结一下面试考察点：</p><ol><li><p>掌握常用的 JVM 分析工具主要用来分析哪类的问题，例如线程死锁可以用线程分析工具 jstack；内存溢出可以使用 jmap 查看堆中占用最大的对象类型；需要对程序性能进行分析时，可以使用 JMC 中的飞行记录器等等。</p></li><li><p>掌握常用的代码版本管理工具 Git，包括 Git 的常用命令与常见问题，以及理解 Git 工作流。例如知道 Git 的 merge 与 Git rebase 的区别，merge 是提交 commit 合并修改，rebase 是修改提交历史记录。知道自己团队在协作开发时，使用的哪种工作流，有什么样的优缺点。</p></li><li><p>掌握 Linux 系统下的常用工具，也是突出实战能力。了解不同问题应该使用哪类工具来进行分析。例如，磁盘写入经常耗时较高可以通过 iostat 来分析磁盘 IO 情况，如果不能确定问题，可以通过 strace 对文件写入的系统调用进行分析；或者 CPU 负载较高，想要定位哪个线程导致，可以通过 top 结合 jstack 来进行分析等等。</p></li></ol><br><p>本课时的考察点以知识广度为主，对于不同类型的工具，需要知道适用场合，重点考察实际应用经验。面试时这部分内容可能会被问到一些原理，但一般不会深入询问工具的具体实现。</p><h6 id="加分项" tabindex="-1">加分项 <a class="header-anchor" href="#加分项" aria-label="Permalink to &quot;加分项&quot;">​</a></h6><p>对于常用工具这部分，面试官可能不会直接问你&quot;会用某某工具吗&quot;，所以对于这一课的知识，你需要主动出击，才能获得加分。比如，在面试官询问项目经验时，带出你了解的工具，来体现你的知识广度与实战经验。</p><p>举个例子，当面试官询问你遇到过哪些线上问题时，你可以说遇到过单机请求耗时高的问题，通过 JMC 的飞行记录器采样分析，发现写 log 日志时线程竞争非常激烈，很多线程在等待写锁时耗时非常大，进一步通过 iostat 排查发现 util 利用率百分比很高，最后定位是磁盘出现问题。解决方法，一方面更换磁盘解决了问题，另一方面对写竞争较激烈的日志文件使用了异步 log 机制。这样回答，既可以突出你对常用工具的掌握能力，也可以突出你的实战和解决问题能力。</p><p>另外再给提供两个思路：</p><ul><li><p>可以在介绍自己开发的某个项目时，提到在上线前使用 JMC 做了性能 Profile，发现并优化了某些问题。</p></li><li><p>在介绍项目方案时，讲到自己对某两个不同方案进行了 JMH 测试，来验证方案实现的性能，等等。这两个 Case 都能够做到主动出击，体现自己的对常用工具的理解与掌握能力。</p></li></ul><h6 id="真题汇总" tabindex="-1">真题汇总 <a class="header-anchor" href="#真题汇总" aria-label="Permalink to &quot;真题汇总&quot;">​</a></h6><p>最后列出一些真题用于参考练习，如下。</p><br>',15),G=i("p",null,"这些题目我前面基本都介绍过，就不再重复解答。推荐课后学习一下 JMC、BTrace、tcpdump、strace 等工具的使用。",-1),P=i("p",null,"下一课时将会讲解 Spring、Netty 等常用的框架。",-1),f=i("br",null,null,-1);function v(q,S,B,I,k,x){const a=o("Image");return r(),s("div",null,[c,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/C4/CgoB5l14pDeAE51aAADMD3J2ji4281.png"}),t(),u,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/C4/CgoB5l14pDeAXdJ_AADMD3J2ji4374.png"}),t(),h,_,d,J,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/E4/CgotOV14pDeAGcYtAAB8QQ6tQ3g985.png"}),t(),m,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/C4/CgoB5l14pDeAN_KQAABeQ2CYl-4234.png"}),t(),M,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/E4/CgotOV14pDeAUKguAABSpEIuccM831.png"}),t(),b,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/C4/CgoB5l14pDiAbg7MAABY8TQQib0500.png"}),t(),T,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/C4/CgoB5l14pDiAd1ZiAABN95vAR28226.png"}),t(),C,g,A,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/E4/CgotOV14pDiAdN70AABBa8fvLco841.png"}),t(),V,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/E4/CgotOV14pDmAFS2GAABJC_urwXY837.png"}),t(),G,P,f])}const R=p(n,[["render",v]]);export{j as __pageData,R as default};
