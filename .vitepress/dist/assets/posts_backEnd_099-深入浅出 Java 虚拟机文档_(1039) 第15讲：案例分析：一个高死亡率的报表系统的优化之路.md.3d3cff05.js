import{_ as e,j as t,o,g as c,k as a,h as n,Q as l,s as p}from"./chunks/framework.4e7d56ce.js";const q=JSON.parse('{"title":"第15讲：案例分析：一个高死亡率的报表系统的优化之路","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1039) 第15讲：案例分析：一个高死亡率的报表系统的优化之路.md","filePath":"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1039) 第15讲：案例分析：一个高死亡率的报表系统的优化之路.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1039) 第15讲：案例分析：一个高死亡率的报表系统的优化之路.md"},i=l('<h1 id="第15讲-案例分析-一个高死亡率的报表系统的优化之路" tabindex="-1">第15讲：案例分析：一个高死亡率的报表系统的优化之路 <a class="header-anchor" href="#第15讲-案例分析-一个高死亡率的报表系统的优化之路" aria-label="Permalink to &quot;第15讲：案例分析：一个高死亡率的报表系统的优化之路&quot;">​</a></h1><p>本课时我们主要分析一个案例，那就是一个&quot;高死亡率&quot;报表系统的优化之路。</p><br><p>传统观念上的报表系统，可能访问量不是特别多，点击一个查询按钮，后台 SQL 语句的执行需要等数秒。如果使用 jstack 来查看执行线程，会发现大多数线程都阻塞在数据库的 I/O 上。</p><br><p>上面这种是非常传统的报表。还有一种类似于大屏监控一类的实时报表，这种报表的并发量也是比较可观的，但由于它的结果集都比较小，所以我们可以像对待一个高并发系统一样对待它，问题不是很大。</p><br><p>本课时要讲的，就是传统观念上的报表。除了处理时间比较长以外，报表系统每次处理的结果集，普遍都比较大，这给 JVM 造成了非常大的压力。</p><br><p>下面我们以一个综合性的实例，来看一下一个&quot;病入膏肓&quot;的报表系统的优化操作。</p><br><p>有一个报表系统，频繁发生内存溢出，在高峰期间使用时，还会频繁的发生拒绝服务，这是不可忍受的。</p><h2 id="服务背景" tabindex="-1">服务背景 <a class="header-anchor" href="#服务背景" aria-label="Permalink to &quot;服务背景&quot;">​</a></h2><p>本次要优化的服务是一个 SaaS 服务，使用 Spring Boot 编写，采用的是 CMS 垃圾回收器。如下图所示，有些接口会从 MySQL 中获取数据，有些则从 MongoDB 中获取数据，涉及的结果集合都比较大。</p><br><p>由于有些结果集的字段不是太全，因此需要对结果集合进行循环，可通过 HttpClient 调用其他服务的接口进行数据填充。也许你会认为某些数据可能会被复用，于是使用 Guava 做了 JVM 内缓存。</p><br><p>大体的服务依赖可以抽象成下面的图。</p><br>',19),E=l(`<br><p>初步排查，JVM 的资源太少。当接口 A 每次进行报表计算时，都要涉及几百兆的内存，而且在内存里驻留很长时间，同时有些计算非常耗 CPU，特别的&quot;吃&quot;资源。而我们分配给 JVM 的内存只有 3 GB，在多人访问这些接口的时候，内存就不够用了，进而发生了 OOM。在这种情况下，即使连最简单的报表都不能用了。</p><br><p>没办法，只有升级机器。把机器配置升级到 4core8g，给 JVM 分配 6GB 的内存，这样 OOM 问题就消失了。但随之而来的是频繁的 GC 问题和超长的 GC 时间，平均 GC 时间竟然有 5 秒多。</p><h2 id="初步优化" tabindex="-1">初步优化 <a class="header-anchor" href="#初步优化" aria-label="Permalink to &quot;初步优化&quot;">​</a></h2><p>我们前面算过，6GB 大小的内存，年轻代大约是 2GB，在高峰期，每几秒钟则需要进行一次 MinorGC。报表系统和高并发系统不太一样，它的对象，存活时长大得多，并不能仅仅通过增加年轻代来解决；而且，如果增加了年轻代，那么必然减少了老年代的大小，由于 CMS 的碎片和浮动垃圾问题，我们可用的空间就更少了。虽然服务能够满足目前的需求，但还有一些不太确定的风险。</p><br><p>第一，了解到程序中有很多缓存数据和静态统计数据，为了减少 MinorGC 的次数，通过分析 GC 日志打印的对象年龄分布，把 MaxTenuringThreshold 参数调整到了 3（请根据你自己的应用情况设置）。<strong>这个参数是让年轻代的这些对象，赶紧回到老年代去，不要老呆在年轻代里</strong>。</p><br><p>第二，我们的 GC 时间比较长，就一块开了参数 <strong>CMSScavengeBeforeRemark</strong>，使得在 CMS remark 前，先执行一次 Minor GC 将新生代清掉。同时配合上个参数，其效果还是比较好的，一方面，对象很快晋升到了老年代，另一方面，年轻代的对象在这种情况下是有限的，在整个 MajorGC 中占的时间也有限。</p><br><p>第三，由于缓存的使用，有大量的弱引用，拿一次长达 10 秒的 GC 来说。我们发现在 GC 日志里，处理 <strong>weak refs</strong>的时间较长，达到了 4.5 秒。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">2020-01-28T12:13:32.876+0800: 526569.947: [weak refs processing, 4.5240649 secs]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">2020-01-28T12:13:32.876+0800: 526569.947: [weak refs processing, 4.5240649 secs]</span></span></code></pre></div><br><p>所以加入了参数 <strong>ParallelRefProcEnabled</strong>来并行处理 Reference，以加快处理速度，缩短耗时。</p><br><p>同时还加入了其他一些优化参数，比如通过调整触发 GC 的参数来进行优化。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">-Xmx6g -Xms6g -XX:MaxTenuringThreshold=3 -XX:+AlwaysPreTouch -XX:+Par</span></span>
<span class="line"><span style="color:#E1E4E8;">allelRefProcEnabled -XX:+CMSScavengeBeforeRemark -XX:+UseConcMarkSwe</span></span>
<span class="line"><span style="color:#E1E4E8;">epGC -XX:CMSInitiatingOccupancyFraction=80 -XX:+UseCMSInitiatingOccu</span></span>
<span class="line"><span style="color:#E1E4E8;">pancyOnly  -XX:MetaspaceSize=256M -XX:MaxMetaspaceSize=256M</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">-Xmx6g -Xms6g -XX:MaxTenuringThreshold=3 -XX:+AlwaysPreTouch -XX:+Par</span></span>
<span class="line"><span style="color:#24292E;">allelRefProcEnabled -XX:+CMSScavengeBeforeRemark -XX:+UseConcMarkSwe</span></span>
<span class="line"><span style="color:#24292E;">epGC -XX:CMSInitiatingOccupancyFraction=80 -XX:+UseCMSInitiatingOccu</span></span>
<span class="line"><span style="color:#24292E;">pancyOnly  -XX:MetaspaceSize=256M -XX:MaxMetaspaceSize=256M</span></span></code></pre></div><br><p>优化之后，效果不错，但并不是特别明显。经过评估，针对高峰时期的情况进行调研，我们决定再次提升机器性能，改用 8core16g 的机器。但是，这会带来另外一个问题。</p><br><p><strong>高性能的机器带来了非常大的服务吞吐量</strong>，通过 jstat 进行监控，能够看到年轻代的分配速率明显提高，但随之而来的 MinorGC 时长却变的不可控，有时候会超过 1 秒。累积的请求造成了更加严重的后果。</p><br><p>这是由于堆空间明显加大造成的回收时间加长。为了获取较小的停顿时间，我们在堆上采用了 G1 垃圾回收器，把它的目标设定在 200ms。G1 是一款非常优秀的垃圾收集器，不仅适合堆内存大的应用，同时也简化了调优的工作。通过主要的参数初始和最大堆空间、以及最大容忍的 GC 暂停目标，就能得到不错的性能。所以为了照顾大对象的生成，我们把小堆区的大小修改为 16 M。修改之后，虽然 GC 更加频繁了一些，但是停顿时间都比较小，应用的运行较为平滑。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">-Xmx12g -Xms12g -XX:+UseG1GC -XX:InitiatingHeapOccupancyPercent=45   -XX:MaxGCPauseMillis=200  -XX:G1HeapRegionSize=16m -XX:MetaspaceSize=256m -XX:MaxMetaspaceSize=256m</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">-Xmx12g -Xms12g -XX:+UseG1GC -XX:InitiatingHeapOccupancyPercent=45   -XX:MaxGCPauseMillis=200  -XX:G1HeapRegionSize=16m -XX:MetaspaceSize=256m -XX:MaxMetaspaceSize=256m</span></span></code></pre></div><br><p>这个时候，任务来了：业务部门发力，预计客户增长量增长 10 ~ 100 倍，报表系统需要评估其可行性，以便进行资源协调。可问题是，这个&quot;千疮百孔&quot;的报表系统，稍微一压测，就宕机，那如何应对十倍百倍的压力呢？</p><br><p>使用 MAT 分析堆快照，发现很多地方可以通过代码优化，那些占用内存特别多的对象，都是我们需要优化的。</p><h2 id="代码优化" tabindex="-1">代码优化 <a class="header-anchor" href="#代码优化" aria-label="Permalink to &quot;代码优化&quot;">​</a></h2><p>我们使用扩容硬件的方式，暂时缓解了 JVM 的问题，但是根本问题并没有触及到。为了减少内存的占用，肯定要清理无用的信息。通过对代码的仔细分析，首先要改造的就是 SQL 查询语句。</p><br><p>很多接口，其实并不需要把数据库的每个字段都查询出来，当你在计算和解析的时候，它们会不知不觉地&quot;吃掉&quot;你的内存。所以我们只需要获取所需的数据就够了，也就是把 **select ***这种方式修改为具体的查询字段，对于报表系统来说这种优化尤其明显。</p><br><p>再一个就是 Cache 问题，通过排查代码，会发现一些命中率特别低，占用内存又特别大的对象，放到了 JVM 内的 Cache 中，造成了无用的浪费。</p><br><p>解决方式，就是把 Guava 的 Cache 引用级别改成弱引用（<strong>WeakKeys</strong>），尽量去掉无用的应用缓存。对于某些使用特别频繁的小 key，使用分布式的 Redis 进行改造即可。</p><br><p>为了找到更多影响因子大的问题，我们部署了独立的环境，然后部署了 JVM 监控。在回放某个问题请求后，观察 JVM 的响应，通过这种方式，发现了更多的优化可能。</p><br><p>报表系统使用了 POI 组件进行导入导出功能的开发，结果客户在没有限制的情况下上传、下载了条数非常多的文件，直接让堆内存飙升。为了解决这种情况，我们在导入功能加入了文件大小的限制，强制客户进行拆分；在下载的时候指定范围，严禁跨度非常大的请求。</p><br><p>在完成代码改造之后，再把机器配置降级回 4core8g，依然采用 G1 垃圾回收器，再也没有发生 OOM 的问题了，GC 问题也得到了明显的缓解。</p><h2 id="拒绝服务问题" tabindex="-1">拒绝服务问题 <a class="header-anchor" href="#拒绝服务问题" aria-label="Permalink to &quot;拒绝服务问题&quot;">​</a></h2><p>上面解决的是 JVM 的内存问题，可以看到除了优化 JVM 参数、升级机器配置以外，代码修改带来的优化效果更加明显，但这个报表服务还有一个严重的问题。</p><br><p>刚开始我们提到过，由于没有微服务体系，有些数据需要使用 HttpClient 来获取进行补全。提供数据的服务有的响应时间可能会很长，也有可能会造成服务整体的阻塞。</p><br>`,51),d=l("<br><p>如上图所示，接口 A 通过 HttpClient 访问服务 2，响应 100ms 后返回；接口 B 访问服务 3，耗时 2 秒。HttpClient 本身是有一个最大连接数限制的，如果服务 3 迟迟不返回，就会造成 HttpClient 的连接数达到上限，最上层的 Tomcat 线程也会一直阻塞在这里，进而连响应速度比较快的接口 A 也无法正常提供服务。</p><br><p>这是出现频率非常高的的一类故障，在工作中你会大概率遇见。<strong>概括来讲，就是同一服务，由于一个耗时非常长的接口，进而引起了整体的服务不可用。</strong></p><br><p>这个时候，通过 jstack 打印栈信息，会发现大多数竟然阻塞在了接口 A 上，而不是耗时更长的接口 B。这是一种错觉，其实是因为接口 A 的速度比较快，在问题发生点进入了更多的请求，它们全部都阻塞住了。</p><br><p>证据本身具有非常强的迷惑性。由于这种问题发生的频率很高，排查起来又比较困难，我这里专门做了一个小工程，用于还原解决这种问题的一个方式，参见 <strong>report-demo</strong>工程。</p><br><p>demo 模拟了两个使用同一个 HttpClient 的接口。如下图所示，fast 接口用来访问百度，很快就能返回；slow 接口访问谷歌，由于众所周知的原因，会阻塞直到超时，大约 10 s。</p><br>",11),y=l(`<br><p>使用 <strong>wrk</strong>工具对这两个接口发起压测。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">wrk -t10 -c200 -d300s http://127.0.0.1:8084/slow</span></span>
<span class="line"><span style="color:#E1E4E8;">wrk -t10 -c200 -d300s http://127.0.0.1:8084/fast</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">wrk -t10 -c200 -d300s http://127.0.0.1:8084/slow</span></span>
<span class="line"><span style="color:#24292E;">wrk -t10 -c200 -d300s http://127.0.0.1:8084/fast</span></span></code></pre></div><br>`,5),g=l(`<br><p>此时访问一个简单的接口，耗时竟然能够达到 20 秒。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">time curl http://localhost:8084/stat</span></span>
<span class="line"><span style="color:#E1E4E8;">fast648,slow:1curl http://localhost:8084/stat  0.01s user 0.01s system 0% cpu 20.937 total</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">time curl http://localhost:8084/stat</span></span>
<span class="line"><span style="color:#24292E;">fast648,slow:1curl http://localhost:8084/stat  0.01s user 0.01s system 0% cpu 20.937 total</span></span></code></pre></div><p><strong>使用 jstack 工具 dump 堆栈</strong>。首先使用 jps 命令找到进程号，然后把结果重定向到文件（可以参考 10271.jstack 文件）。</p><br><p>过滤一下 nio 关键字，可以查看 tomcat 相关的线程，足足有 200 个，这和 Spring Boot 默认的 <strong>maxThreads</strong>个数不谋而合。更要命的是，有大多数线程，都处于 BLOCKED 状态，说明线程等待资源超时。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">cat 10271.jstack |grep http-nio-80 -A 3</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">cat 10271.jstack |grep http-nio-80 -A 3</span></span></code></pre></div><br>`,10),u=l(`<br><p>使用脚本分析，发现有大量的线程阻塞在 fast 方法上。我们上面也说过，这是一个假象，可能你到了这一步，会心生存疑，以至于无法再向下分析。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">$ cat 10271.jstack |grep fast | wc -l</span></span>
<span class="line"><span style="color:#E1E4E8;">     137</span></span>
<span class="line"><span style="color:#E1E4E8;">$ cat 10271.jstack |grep slow | wc -l</span></span>
<span class="line"><span style="color:#E1E4E8;">      63</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">$ cat 10271.jstack |grep fast | wc -l</span></span>
<span class="line"><span style="color:#24292E;">     137</span></span>
<span class="line"><span style="color:#24292E;">$ cat 10271.jstack |grep slow | wc -l</span></span>
<span class="line"><span style="color:#24292E;">      63</span></span></code></pre></div><p>分析栈信息，你可能会直接查找 locked 关键字，如下图所示，但是这样的方法一般没什么用，我们需要做更多的统计。</p><br>`,6),b=p("br",null,null,-1),h=p("p",null,"注意下图中有一个处于 BLOCKED 状态的线程，它阻塞在对锁的获取上（wating to lock）。大体浏览一下 DUMP 文件，会发现多处这种状态的线程，可以使用如下脚本进行统计。",-1),v=p("br",null,null,-1),m=l(`<br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">cat 10271.tdump| grep &quot;waiting to lock &quot; | awk &#39;{print $5}&#39; | sort | uniq -c | sort -k1 -r</span></span>
<span class="line"><span style="color:#E1E4E8;">  26 &lt;</span><span style="color:#FDAEB7;font-style:italic;">0x0000000782e1b590</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  18 &lt;</span><span style="color:#FDAEB7;font-style:italic;">0x0000000787b00448</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  16 &lt;</span><span style="color:#FDAEB7;font-style:italic;">0x0000000787b38128</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  10 &lt;</span><span style="color:#FDAEB7;font-style:italic;">0x0000000787b14558</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">   8 &lt;</span><span style="color:#FDAEB7;font-style:italic;">0x0000000787b25060</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">   4 &lt;</span><span style="color:#FDAEB7;font-style:italic;">0x0000000787b2da18</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">   4 &lt;</span><span style="color:#FDAEB7;font-style:italic;">0x0000000787b00020</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">   2 &lt;</span><span style="color:#FDAEB7;font-style:italic;">0x0000000787b6e8e8</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">   2 &lt;</span><span style="color:#FDAEB7;font-style:italic;">0x0000000787b03328</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">   2 &lt;</span><span style="color:#FDAEB7;font-style:italic;">0x0000000782e8a660</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">   1 &lt;</span><span style="color:#FDAEB7;font-style:italic;">0x0000000787b6ab18</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">   1 &lt;</span><span style="color:#FDAEB7;font-style:italic;">0x0000000787b2ae00</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">   1 &lt;</span><span style="color:#FDAEB7;font-style:italic;">0x0000000787b0d6c0</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">   1 &lt;</span><span style="color:#FDAEB7;font-style:italic;">0x0000000787b073b8</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">   1 &lt;</span><span style="color:#FDAEB7;font-style:italic;">0x0000000782fbcdf8</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">   1 &lt;</span><span style="color:#FDAEB7;font-style:italic;">0x0000000782e11200</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">   1 &lt;</span><span style="color:#FDAEB7;font-style:italic;">0x0000000782dfdae0</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">cat 10271.tdump| grep &quot;waiting to lock &quot; | awk &#39;{print $5}&#39; | sort | uniq -c | sort -k1 -r</span></span>
<span class="line"><span style="color:#24292E;">  26 &lt;</span><span style="color:#B31D28;font-style:italic;">0x0000000782e1b590</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  18 &lt;</span><span style="color:#B31D28;font-style:italic;">0x0000000787b00448</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  16 &lt;</span><span style="color:#B31D28;font-style:italic;">0x0000000787b38128</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  10 &lt;</span><span style="color:#B31D28;font-style:italic;">0x0000000787b14558</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">   8 &lt;</span><span style="color:#B31D28;font-style:italic;">0x0000000787b25060</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">   4 &lt;</span><span style="color:#B31D28;font-style:italic;">0x0000000787b2da18</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">   4 &lt;</span><span style="color:#B31D28;font-style:italic;">0x0000000787b00020</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">   2 &lt;</span><span style="color:#B31D28;font-style:italic;">0x0000000787b6e8e8</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">   2 &lt;</span><span style="color:#B31D28;font-style:italic;">0x0000000787b03328</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">   2 &lt;</span><span style="color:#B31D28;font-style:italic;">0x0000000782e8a660</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">   1 &lt;</span><span style="color:#B31D28;font-style:italic;">0x0000000787b6ab18</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">   1 &lt;</span><span style="color:#B31D28;font-style:italic;">0x0000000787b2ae00</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">   1 &lt;</span><span style="color:#B31D28;font-style:italic;">0x0000000787b0d6c0</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">   1 &lt;</span><span style="color:#B31D28;font-style:italic;">0x0000000787b073b8</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">   1 &lt;</span><span style="color:#B31D28;font-style:italic;">0x0000000782fbcdf8</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">   1 &lt;</span><span style="color:#B31D28;font-style:italic;">0x0000000782e11200</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">   1 &lt;</span><span style="color:#B31D28;font-style:italic;">0x0000000782dfdae0</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><br><p>我们找到给 <strong>0x0000000782e1b590</strong>上锁的执行栈，可以发现全部卡在了 HttpClient 的读操作上。在实际场景中，可以看下排行比较靠前的几个锁地址，找一下共性。</p><br>`,5),k=l(`<br><p>返回头去再看一下代码。我们发现 HttpClient 是共用了一个连接池，当连接数超过 100 的时候，就会阻塞等待。它的连接超时时间是 10 秒，这和 slow 接口的耗时不相上下。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">private final static HttpConnectionManager httpConnectionManager = new SimpleHttpConnectionManager(true);</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    static {</span></span>
<span class="line"><span style="color:#E1E4E8;">        HttpConnectionManagerParams params = new HttpConnectionManagerParams();</span></span>
<span class="line"><span style="color:#E1E4E8;">        params.setMaxTotalConnections(100);</span></span>
<span class="line"><span style="color:#E1E4E8;">        params.setConnectionTimeout(1000 * 10);</span></span>
<span class="line"><span style="color:#E1E4E8;">        params.setSoTimeout(defaultTimeout);</span></span>
<span class="line"><span style="color:#E1E4E8;">        httpConnectionManager.setParams(params);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">private final static HttpConnectionManager httpConnectionManager = new SimpleHttpConnectionManager(true);</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    static {</span></span>
<span class="line"><span style="color:#24292E;">        HttpConnectionManagerParams params = new HttpConnectionManagerParams();</span></span>
<span class="line"><span style="color:#24292E;">        params.setMaxTotalConnections(100);</span></span>
<span class="line"><span style="color:#24292E;">        params.setConnectionTimeout(1000 * 10);</span></span>
<span class="line"><span style="color:#24292E;">        params.setSoTimeout(defaultTimeout);</span></span>
<span class="line"><span style="color:#24292E;">        httpConnectionManager.setParams(params);</span></span></code></pre></div><br><p>slow 接口和 fast 接口同时在争抢这些连接，让它时刻处在饱满的状态，进而让 tomcat 的线程等待、占满，造成服务不可用。</p><br><p>问题找到了，解决方式就简单多了。我们希望 slow 接口在阻塞的时候，并不影响 fast 接口的运行。这就可以对某一类接口进行限流，或者对不重要的接口进行熔断处理，这里不再深入讲解（具体可参考 Spring Boot 的限流熔断处理）。</p><br><p>现实情况是，对于一个运行的系统，我们并不知道是 slow 接口慢还是 fast 接口慢，这就需要加入一些额外的日志信息进行排查。当然，如果有一个监控系统能够看到这些数据是再好不过了。</p><br><p>项目中的 HttpClientUtil2 文件，是改造后的一个版本。除了调大了连接数，它还使用了多线程版本的<strong>连接管理器</strong>（MultiThreadedHttpConnectionManager），这个管理器根据请求的 host 进行划分，每个 host 的最大连接数不超过 20。还提供了 getConnectionsInPool 函数，用于查看当前连接池的统计信息。采用这些辅助的手段，可以快速找到问题服务，这是典型的情况。由于其他应用的服务水平低而引起的连锁反应，一般的做法是熔断、限流等，在此不多做介绍了。</p><h2 id="jstack-产生的信息" tabindex="-1">jstack 产生的信息 <a class="header-anchor" href="#jstack-产生的信息" aria-label="Permalink to &quot;jstack 产生的信息&quot;">​</a></h2><p>为了观测一些状态，我上传了几个 Java 类，你可以实际运行一下，然后使用 jstack 来看一下它的状态。</p><h3 id="waiting-on-condition" tabindex="-1">waiting on condition <a class="header-anchor" href="#waiting-on-condition" aria-label="Permalink to &quot;waiting on condition&quot;">​</a></h3><p>示例参见 SleepDemo.java。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public class SleepDemo {</span></span>
<span class="line"><span style="color:#E1E4E8;">    public static void main(String[] args) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        new Thread(()-&gt;{</span></span>
<span class="line"><span style="color:#E1E4E8;">            try {</span></span>
<span class="line"><span style="color:#E1E4E8;">                Thread.sleep(Integer.MAX_VALUE);</span></span>
<span class="line"><span style="color:#E1E4E8;">            } catch (InterruptedException e) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                e.printStackTrace();</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        },&quot;sleep-demo&quot;).start();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public class SleepDemo {</span></span>
<span class="line"><span style="color:#24292E;">    public static void main(String[] args) {</span></span>
<span class="line"><span style="color:#24292E;">        new Thread(()-&gt;{</span></span>
<span class="line"><span style="color:#24292E;">            try {</span></span>
<span class="line"><span style="color:#24292E;">                Thread.sleep(Integer.MAX_VALUE);</span></span>
<span class="line"><span style="color:#24292E;">            } catch (InterruptedException e) {</span></span>
<span class="line"><span style="color:#24292E;">                e.printStackTrace();</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        },&quot;sleep-demo&quot;).start();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><br><br><p>这个状态出现在线程等待某个条件的发生，来把自己唤醒，或者调用了 sleep 函数，常见的情况就是等待网络读写，或者等待数据 I/O。如果发现大多数线程都处于这种状态，证明后面的资源遇到了瓶颈。</p><br><p>此时线程状态大致分为以下两种：</p><ul><li><p>java.lang.Thread.State: WAITING (parking)：一直等待条件发生；</p></li><li><p>java.lang.Thread.State: TIMED_WAITING (parking 或 sleeping)：定时的，即使条件不触发，也将定时唤醒。</p></li></ul><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&quot;sleep-demo&quot; #12 prio=5 os_prio=31 cpu=0.23ms elapsed=87.49s tid=0x00007fc7a7965000 nid=0x6003 waiting on condition  [0x000070000756d000]</span></span>
<span class="line"><span style="color:#E1E4E8;">   java.lang.Thread.State: TIMED_WAITING (sleeping)</span></span>
<span class="line"><span style="color:#E1E4E8;">    at java.lang.Thread.sleep(java.base@13.0.1/Native Method)</span></span>
<span class="line"><span style="color:#E1E4E8;">    at SleepDemo.lambda$main$0(SleepDemo.java:5)</span></span>
<span class="line"><span style="color:#E1E4E8;">    at SleepDemo$$Lambda$16/0x0000000800b45040.run(Unknown Source)</span></span>
<span class="line"><span style="color:#E1E4E8;">    at java.lang.Thread.run(java.base@13.0.1/Thread.java:830)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&quot;sleep-demo&quot; #12 prio=5 os_prio=31 cpu=0.23ms elapsed=87.49s tid=0x00007fc7a7965000 nid=0x6003 waiting on condition  [0x000070000756d000]</span></span>
<span class="line"><span style="color:#24292E;">   java.lang.Thread.State: TIMED_WAITING (sleeping)</span></span>
<span class="line"><span style="color:#24292E;">    at java.lang.Thread.sleep(java.base@13.0.1/Native Method)</span></span>
<span class="line"><span style="color:#24292E;">    at SleepDemo.lambda$main$0(SleepDemo.java:5)</span></span>
<span class="line"><span style="color:#24292E;">    at SleepDemo$$Lambda$16/0x0000000800b45040.run(Unknown Source)</span></span>
<span class="line"><span style="color:#24292E;">    at java.lang.Thread.run(java.base@13.0.1/Thread.java:830)</span></span></code></pre></div><br><p>值的注意的是，Java 中的可重入锁，也会让线程进入这种状态，但通常带有 parking 字样，parking 指线程处于挂起中，要注意区别。代码可参见 LockDemo.java：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">import java.util.concurrent.locks.Lock;</span></span>
<span class="line"><span style="color:#E1E4E8;">import java.util.concurrent.locks.ReentrantLock;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">public class LockDemo {</span></span>
<span class="line"><span style="color:#E1E4E8;">    public static void main(String[] args) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Lock lock = new ReentrantLock();</span></span>
<span class="line"><span style="color:#E1E4E8;">        lock.lock();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        new Thread(() -&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">            try {</span></span>
<span class="line"><span style="color:#E1E4E8;">                lock.lock();</span></span>
<span class="line"><span style="color:#E1E4E8;">            } finally {</span></span>
<span class="line"><span style="color:#E1E4E8;">                lock.unlock();</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }, &quot;lock-demo&quot;).start();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">import java.util.concurrent.locks.Lock;</span></span>
<span class="line"><span style="color:#24292E;">import java.util.concurrent.locks.ReentrantLock;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">public class LockDemo {</span></span>
<span class="line"><span style="color:#24292E;">    public static void main(String[] args) {</span></span>
<span class="line"><span style="color:#24292E;">        Lock lock = new ReentrantLock();</span></span>
<span class="line"><span style="color:#24292E;">        lock.lock();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        new Thread(() -&gt; {</span></span>
<span class="line"><span style="color:#24292E;">            try {</span></span>
<span class="line"><span style="color:#24292E;">                lock.lock();</span></span>
<span class="line"><span style="color:#24292E;">            } finally {</span></span>
<span class="line"><span style="color:#24292E;">                lock.unlock();</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }, &quot;lock-demo&quot;).start();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span></code></pre></div><br><br><p>堆栈代码如下：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&quot;lock-demo&quot; #12 prio=5 os_prio=31 cpu=0.78ms elapsed=14.62s tid=0x00007ffc0b949000 nid=0x9f03 waiting on condition  [0x0000700005826000]</span></span>
<span class="line"><span style="color:#E1E4E8;">   java.lang.Thread.State: WAITING (parking)</span></span>
<span class="line"><span style="color:#E1E4E8;">    at jdk.internal.misc.Unsafe.park(java.base@13.0.1/Native Method)</span></span>
<span class="line"><span style="color:#E1E4E8;">    - parking to wait for  &lt;</span><span style="color:#FDAEB7;font-style:italic;">0x0000000787cf0dd8</span><span style="color:#E1E4E8;">&gt; (a java.util.concurrent.locks.ReentrantLock$NonfairSync)</span></span>
<span class="line"><span style="color:#E1E4E8;">    at java.util.concurrent.locks.LockSupport.park(java.base@13.0.1/LockSupport.java:194)</span></span>
<span class="line"><span style="color:#E1E4E8;">    at java.util.concurrent.locks.AbstractQueuedSynchronizer.parkAndCheckInterrupt(java.base@13.0.1/AbstractQueuedSynchronizer.java:885)</span></span>
<span class="line"><span style="color:#E1E4E8;">    at java.util.concurrent.locks.AbstractQueuedSynchronizer.acquireQueued(java.base@13.0.1/AbstractQueuedSynchronizer.java:917)</span></span>
<span class="line"><span style="color:#E1E4E8;">    at java.util.concurrent.locks.AbstractQueuedSynchronizer.acquire(java.base@13.0.1/AbstractQueuedSynchronizer.java:1240)</span></span>
<span class="line"><span style="color:#E1E4E8;">    at java.util.concurrent.locks.ReentrantLock.lock(java.base@13.0.1/ReentrantLock.java:267)</span></span>
<span class="line"><span style="color:#E1E4E8;">    at LockDemo.lambda$main$0(LockDemo.java:11)</span></span>
<span class="line"><span style="color:#E1E4E8;">    at LockDemo$$Lambda$14/0x0000000800b44840.run(Unknown Source)</span></span>
<span class="line"><span style="color:#E1E4E8;">    at java.lang.Thread.run(java.base@13.0.1/Thread.java:830)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&quot;lock-demo&quot; #12 prio=5 os_prio=31 cpu=0.78ms elapsed=14.62s tid=0x00007ffc0b949000 nid=0x9f03 waiting on condition  [0x0000700005826000]</span></span>
<span class="line"><span style="color:#24292E;">   java.lang.Thread.State: WAITING (parking)</span></span>
<span class="line"><span style="color:#24292E;">    at jdk.internal.misc.Unsafe.park(java.base@13.0.1/Native Method)</span></span>
<span class="line"><span style="color:#24292E;">    - parking to wait for  &lt;</span><span style="color:#B31D28;font-style:italic;">0x0000000787cf0dd8</span><span style="color:#24292E;">&gt; (a java.util.concurrent.locks.ReentrantLock$NonfairSync)</span></span>
<span class="line"><span style="color:#24292E;">    at java.util.concurrent.locks.LockSupport.park(java.base@13.0.1/LockSupport.java:194)</span></span>
<span class="line"><span style="color:#24292E;">    at java.util.concurrent.locks.AbstractQueuedSynchronizer.parkAndCheckInterrupt(java.base@13.0.1/AbstractQueuedSynchronizer.java:885)</span></span>
<span class="line"><span style="color:#24292E;">    at java.util.concurrent.locks.AbstractQueuedSynchronizer.acquireQueued(java.base@13.0.1/AbstractQueuedSynchronizer.java:917)</span></span>
<span class="line"><span style="color:#24292E;">    at java.util.concurrent.locks.AbstractQueuedSynchronizer.acquire(java.base@13.0.1/AbstractQueuedSynchronizer.java:1240)</span></span>
<span class="line"><span style="color:#24292E;">    at java.util.concurrent.locks.ReentrantLock.lock(java.base@13.0.1/ReentrantLock.java:267)</span></span>
<span class="line"><span style="color:#24292E;">    at LockDemo.lambda$main$0(LockDemo.java:11)</span></span>
<span class="line"><span style="color:#24292E;">    at LockDemo$$Lambda$14/0x0000000800b44840.run(Unknown Source)</span></span>
<span class="line"><span style="color:#24292E;">    at java.lang.Thread.run(java.base@13.0.1/Thread.java:830)</span></span></code></pre></div><h3 id="waiting-for-monitor-entry" tabindex="-1">waiting for monitor entry <a class="header-anchor" href="#waiting-for-monitor-entry" aria-label="Permalink to &quot;waiting for monitor entry&quot;">​</a></h3><p>我们上面提到的 HttpClient 例子，就是大部分处于这种状态，线程都是 BLOCKED 的。这意味着它们都在等待进入一个临界区，需要重点关注。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&quot;http-nio-8084-exec-120&quot; #143 daemon prio=5 os_prio=31 cpu=122.86ms elapsed=317.88s tid=0x00007fedd8381000 nid=0x1af03 waiting for monitor entry  [0x00007000150e1000]</span></span>
<span class="line"><span style="color:#E1E4E8;">   java.lang.Thread.State: BLOCKED (on object monitor)</span></span>
<span class="line"><span style="color:#E1E4E8;">    at java.io.BufferedInputStream.read(java.base@13.0.1/BufferedInputStream.java:263)</span></span>
<span class="line"><span style="color:#E1E4E8;">    - waiting to lock &lt;</span><span style="color:#FDAEB7;font-style:italic;">0x0000000782e1b590</span><span style="color:#E1E4E8;">&gt; (a java.io.BufferedInputStream)</span></span>
<span class="line"><span style="color:#E1E4E8;">    at org.apache.commons.httpclient.HttpParser.readRawLine(HttpParser.java:78)</span></span>
<span class="line"><span style="color:#E1E4E8;">    at org.apache.commons.httpclient.HttpParser.readLine(HttpParser.java:106)</span></span>
<span class="line"><span style="color:#E1E4E8;">    at org.apache.commons.httpclient.HttpConnection.readLine(HttpConnection.java:1116)</span></span>
<span class="line"><span style="color:#E1E4E8;">    at org.apache.commons.httpclient.HttpMethodBase.readStatusLine(HttpMethodBase.java:1973)</span></span>
<span class="line"><span style="color:#E1E4E8;">    at org.apache.commons.httpclient.HttpMethodBase.readResponse(HttpMethodBase.java:1735)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&quot;http-nio-8084-exec-120&quot; #143 daemon prio=5 os_prio=31 cpu=122.86ms elapsed=317.88s tid=0x00007fedd8381000 nid=0x1af03 waiting for monitor entry  [0x00007000150e1000]</span></span>
<span class="line"><span style="color:#24292E;">   java.lang.Thread.State: BLOCKED (on object monitor)</span></span>
<span class="line"><span style="color:#24292E;">    at java.io.BufferedInputStream.read(java.base@13.0.1/BufferedInputStream.java:263)</span></span>
<span class="line"><span style="color:#24292E;">    - waiting to lock &lt;</span><span style="color:#B31D28;font-style:italic;">0x0000000782e1b590</span><span style="color:#24292E;">&gt; (a java.io.BufferedInputStream)</span></span>
<span class="line"><span style="color:#24292E;">    at org.apache.commons.httpclient.HttpParser.readRawLine(HttpParser.java:78)</span></span>
<span class="line"><span style="color:#24292E;">    at org.apache.commons.httpclient.HttpParser.readLine(HttpParser.java:106)</span></span>
<span class="line"><span style="color:#24292E;">    at org.apache.commons.httpclient.HttpConnection.readLine(HttpConnection.java:1116)</span></span>
<span class="line"><span style="color:#24292E;">    at org.apache.commons.httpclient.HttpMethodBase.readStatusLine(HttpMethodBase.java:1973)</span></span>
<span class="line"><span style="color:#24292E;">    at org.apache.commons.httpclient.HttpMethodBase.readResponse(HttpMethodBase.java:1735)</span></span></code></pre></div><h3 id="in-object-wait" tabindex="-1">in Object.wait() <a class="header-anchor" href="#in-object-wait" aria-label="Permalink to &quot;in Object.wait()&quot;">​</a></h3><p>示例代码参见 WaitDemo.java：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public class WaitDemo {</span></span>
<span class="line"><span style="color:#E1E4E8;">    public static void main(String[] args) throws Exception {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Object o = new Object();</span></span>
<span class="line"><span style="color:#E1E4E8;">        new Thread(() -&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">            try {</span></span>
<span class="line"><span style="color:#E1E4E8;">                synchronized (o) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    o.wait();</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            } catch (InterruptedException e) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                e.printStackTrace();</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }, &quot;wait-demo&quot;).start();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        Thread.sleep(1000);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        synchronized (o) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            o.wait();</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public class WaitDemo {</span></span>
<span class="line"><span style="color:#24292E;">    public static void main(String[] args) throws Exception {</span></span>
<span class="line"><span style="color:#24292E;">        Object o = new Object();</span></span>
<span class="line"><span style="color:#24292E;">        new Thread(() -&gt; {</span></span>
<span class="line"><span style="color:#24292E;">            try {</span></span>
<span class="line"><span style="color:#24292E;">                synchronized (o) {</span></span>
<span class="line"><span style="color:#24292E;">                    o.wait();</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            } catch (InterruptedException e) {</span></span>
<span class="line"><span style="color:#24292E;">                e.printStackTrace();</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }, &quot;wait-demo&quot;).start();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        Thread.sleep(1000);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        synchronized (o) {</span></span>
<span class="line"><span style="color:#24292E;">            o.wait();</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span></code></pre></div><br><p>说明在获得了监视器之后，又调用了 java.lang.Object.wait() 方法。</p><br><p>关于这部分的原理，可以参见一张经典的图。每个监视器（Monitor）在某个时刻，只能被一个线程拥有，该线程就是&quot;Active Thread&quot;，而其他线程都是&quot;Waiting Thread&quot;，分别在两个队列&quot;Entry Set&quot;和&quot;Wait Set&quot;里面等候。在&quot;Entry Set&quot;中等待的线程状态是&quot;Waiting for monitor entry&quot;，而在&quot;Wait Set&quot;中等待的线程状态是&quot;in Object.wait()&quot;。</p><br>`,48),j=l(`<br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&quot;wait-demo&quot; #12 prio=5 os_prio=31 cpu=0.14ms elapsed=12.58s tid=0x00007fb66609e000 nid=0x6103 in Object.wait()  [0x000070000f2bd000]</span></span>
<span class="line"><span style="color:#E1E4E8;">   java.lang.Thread.State: WAITING (on object monitor)</span></span>
<span class="line"><span style="color:#E1E4E8;">    at java.lang.Object.wait(java.base@13.0.1/Native Method)</span></span>
<span class="line"><span style="color:#E1E4E8;">    - waiting on &lt;</span><span style="color:#FDAEB7;font-style:italic;">0x0000000787b48300</span><span style="color:#E1E4E8;">&gt; (a java.lang.Object)</span></span>
<span class="line"><span style="color:#E1E4E8;">    at java.lang.Object.wait(java.base@13.0.1/Object.java:326)</span></span>
<span class="line"><span style="color:#E1E4E8;">    at WaitDemo.lambda$main$0(WaitDemo.java:7)</span></span>
<span class="line"><span style="color:#E1E4E8;">    - locked &lt;</span><span style="color:#FDAEB7;font-style:italic;">0x0000000787b48300</span><span style="color:#E1E4E8;">&gt; (a java.lang.Object)</span></span>
<span class="line"><span style="color:#E1E4E8;">    at WaitDemo$$Lambda$14/0x0000000800b44840.run(Unknown Source)</span></span>
<span class="line"><span style="color:#E1E4E8;">    at java.lang.Thread.run(java.base@13.0.1/Thread.java:830)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&quot;wait-demo&quot; #12 prio=5 os_prio=31 cpu=0.14ms elapsed=12.58s tid=0x00007fb66609e000 nid=0x6103 in Object.wait()  [0x000070000f2bd000]</span></span>
<span class="line"><span style="color:#24292E;">   java.lang.Thread.State: WAITING (on object monitor)</span></span>
<span class="line"><span style="color:#24292E;">    at java.lang.Object.wait(java.base@13.0.1/Native Method)</span></span>
<span class="line"><span style="color:#24292E;">    - waiting on &lt;</span><span style="color:#B31D28;font-style:italic;">0x0000000787b48300</span><span style="color:#24292E;">&gt; (a java.lang.Object)</span></span>
<span class="line"><span style="color:#24292E;">    at java.lang.Object.wait(java.base@13.0.1/Object.java:326)</span></span>
<span class="line"><span style="color:#24292E;">    at WaitDemo.lambda$main$0(WaitDemo.java:7)</span></span>
<span class="line"><span style="color:#24292E;">    - locked &lt;</span><span style="color:#B31D28;font-style:italic;">0x0000000787b48300</span><span style="color:#24292E;">&gt; (a java.lang.Object)</span></span>
<span class="line"><span style="color:#24292E;">    at WaitDemo$$Lambda$14/0x0000000800b44840.run(Unknown Source)</span></span>
<span class="line"><span style="color:#24292E;">    at java.lang.Thread.run(java.base@13.0.1/Thread.java:830)</span></span></code></pre></div><h3 id="死锁" tabindex="-1">死锁 <a class="header-anchor" href="#死锁" aria-label="Permalink to &quot;死锁&quot;">​</a></h3><p>代码参见 DeadLock.java：</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">public class DeadLockDemo {</span></span>
<span class="line"><span style="color:#E1E4E8;">    public static void main(String[] args) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Object object1 = new Object();</span></span>
<span class="line"><span style="color:#E1E4E8;">        Object object2 = new Object();</span></span>
<span class="line"><span style="color:#E1E4E8;">        Thread t1 = new Thread(() -&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">            synchronized (object1) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                try {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    Thread.sleep(200);</span></span>
<span class="line"><span style="color:#E1E4E8;">                } catch (InterruptedException e) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    e.printStackTrace();</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">                synchronized (object2) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }, &quot;deadlock-demo-1&quot;);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        t1.start();</span></span>
<span class="line"><span style="color:#E1E4E8;">        Thread t2 = new Thread(() -&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">            synchronized (object2) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                synchronized (object1) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }, &quot;deadlock-demo-2&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">        t2.start();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">public class DeadLockDemo {</span></span>
<span class="line"><span style="color:#24292E;">    public static void main(String[] args) {</span></span>
<span class="line"><span style="color:#24292E;">        Object object1 = new Object();</span></span>
<span class="line"><span style="color:#24292E;">        Object object2 = new Object();</span></span>
<span class="line"><span style="color:#24292E;">        Thread t1 = new Thread(() -&gt; {</span></span>
<span class="line"><span style="color:#24292E;">            synchronized (object1) {</span></span>
<span class="line"><span style="color:#24292E;">                try {</span></span>
<span class="line"><span style="color:#24292E;">                    Thread.sleep(200);</span></span>
<span class="line"><span style="color:#24292E;">                } catch (InterruptedException e) {</span></span>
<span class="line"><span style="color:#24292E;">                    e.printStackTrace();</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">                synchronized (object2) {</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }, &quot;deadlock-demo-1&quot;);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        t1.start();</span></span>
<span class="line"><span style="color:#24292E;">        Thread t2 = new Thread(() -&gt; {</span></span>
<span class="line"><span style="color:#24292E;">            synchronized (object2) {</span></span>
<span class="line"><span style="color:#24292E;">                synchronized (object1) {</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }, &quot;deadlock-demo-2&quot;);</span></span>
<span class="line"><span style="color:#24292E;">        t2.start();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><br><p>死锁属于比较严重的一种情况，jstack 会以明显的信息进行提示。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">Found one Java-level deadlock:</span></span>
<span class="line"><span style="color:#E1E4E8;">=============================</span></span>
<span class="line"><span style="color:#E1E4E8;">&quot;deadlock-demo-1&quot;:</span></span>
<span class="line"><span style="color:#E1E4E8;">  waiting to lock monitor 0x00007fe5e406f500 (object 0x0000000787cecd78, a java.lang.Object),</span></span>
<span class="line"><span style="color:#E1E4E8;">  which is held by &quot;deadlock-demo-2&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">&quot;deadlock-demo-2&quot;:</span></span>
<span class="line"><span style="color:#E1E4E8;">  waiting to lock monitor 0x00007fe5e406d500 (object 0x0000000787cecd68, a java.lang.Object),</span></span>
<span class="line"><span style="color:#E1E4E8;">  which is held by &quot;deadlock-demo-1&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">Java stack information for the threads listed above:</span></span>
<span class="line"><span style="color:#E1E4E8;">===================================================</span></span>
<span class="line"><span style="color:#E1E4E8;">&quot;deadlock-demo-1&quot;:</span></span>
<span class="line"><span style="color:#E1E4E8;">    at DeadLockDemo.lambda$main$0(DeadLockDemo.java:13)</span></span>
<span class="line"><span style="color:#E1E4E8;">    - waiting to lock &lt;</span><span style="color:#FDAEB7;font-style:italic;">0x0000000787cecd78</span><span style="color:#E1E4E8;">&gt; (a java.lang.Object)</span></span>
<span class="line"><span style="color:#E1E4E8;">    - locked &lt;</span><span style="color:#FDAEB7;font-style:italic;">0x0000000787cecd68</span><span style="color:#E1E4E8;">&gt; (a java.lang.Object)</span></span>
<span class="line"><span style="color:#E1E4E8;">    at DeadLockDemo$$Lambda$14/0x0000000800b44c40.run(Unknown Source)</span></span>
<span class="line"><span style="color:#E1E4E8;">    at java.lang.Thread.run(java.base@13.0.1/Thread.java:830)</span></span>
<span class="line"><span style="color:#E1E4E8;">&quot;deadlock-demo-2&quot;:</span></span>
<span class="line"><span style="color:#E1E4E8;">    at DeadLockDemo.lambda$main$1(DeadLockDemo.java:21)</span></span>
<span class="line"><span style="color:#E1E4E8;">    - waiting to lock &lt;</span><span style="color:#FDAEB7;font-style:italic;">0x0000000787cecd68</span><span style="color:#E1E4E8;">&gt; (a java.lang.Object)</span></span>
<span class="line"><span style="color:#E1E4E8;">    - locked &lt;</span><span style="color:#FDAEB7;font-style:italic;">0x0000000787cecd78</span><span style="color:#E1E4E8;">&gt; (a java.lang.Object)</span></span>
<span class="line"><span style="color:#E1E4E8;">    at DeadLockDemo$$Lambda$16/0x0000000800b45040.run(Unknown Source)</span></span>
<span class="line"><span style="color:#E1E4E8;">    at java.lang.Thread.run(java.base@13.0.1/Thread.java:830)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">Found 1 deadlock</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">Found one Java-level deadlock:</span></span>
<span class="line"><span style="color:#24292E;">=============================</span></span>
<span class="line"><span style="color:#24292E;">&quot;deadlock-demo-1&quot;:</span></span>
<span class="line"><span style="color:#24292E;">  waiting to lock monitor 0x00007fe5e406f500 (object 0x0000000787cecd78, a java.lang.Object),</span></span>
<span class="line"><span style="color:#24292E;">  which is held by &quot;deadlock-demo-2&quot;</span></span>
<span class="line"><span style="color:#24292E;">&quot;deadlock-demo-2&quot;:</span></span>
<span class="line"><span style="color:#24292E;">  waiting to lock monitor 0x00007fe5e406d500 (object 0x0000000787cecd68, a java.lang.Object),</span></span>
<span class="line"><span style="color:#24292E;">  which is held by &quot;deadlock-demo-1&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">Java stack information for the threads listed above:</span></span>
<span class="line"><span style="color:#24292E;">===================================================</span></span>
<span class="line"><span style="color:#24292E;">&quot;deadlock-demo-1&quot;:</span></span>
<span class="line"><span style="color:#24292E;">    at DeadLockDemo.lambda$main$0(DeadLockDemo.java:13)</span></span>
<span class="line"><span style="color:#24292E;">    - waiting to lock &lt;</span><span style="color:#B31D28;font-style:italic;">0x0000000787cecd78</span><span style="color:#24292E;">&gt; (a java.lang.Object)</span></span>
<span class="line"><span style="color:#24292E;">    - locked &lt;</span><span style="color:#B31D28;font-style:italic;">0x0000000787cecd68</span><span style="color:#24292E;">&gt; (a java.lang.Object)</span></span>
<span class="line"><span style="color:#24292E;">    at DeadLockDemo$$Lambda$14/0x0000000800b44c40.run(Unknown Source)</span></span>
<span class="line"><span style="color:#24292E;">    at java.lang.Thread.run(java.base@13.0.1/Thread.java:830)</span></span>
<span class="line"><span style="color:#24292E;">&quot;deadlock-demo-2&quot;:</span></span>
<span class="line"><span style="color:#24292E;">    at DeadLockDemo.lambda$main$1(DeadLockDemo.java:21)</span></span>
<span class="line"><span style="color:#24292E;">    - waiting to lock &lt;</span><span style="color:#B31D28;font-style:italic;">0x0000000787cecd68</span><span style="color:#24292E;">&gt; (a java.lang.Object)</span></span>
<span class="line"><span style="color:#24292E;">    - locked &lt;</span><span style="color:#B31D28;font-style:italic;">0x0000000787cecd78</span><span style="color:#24292E;">&gt; (a java.lang.Object)</span></span>
<span class="line"><span style="color:#24292E;">    at DeadLockDemo$$Lambda$16/0x0000000800b45040.run(Unknown Source)</span></span>
<span class="line"><span style="color:#24292E;">    at java.lang.Thread.run(java.base@13.0.1/Thread.java:830)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">Found 1 deadlock</span></span></code></pre></div><br><br><p>当然，关于线程的 dump，也有一些线上分析工具可以使用。下图是 <a href="https://fastthread.io/" target="_blank" rel="noreferrer">fastthread</a> 的一个分析结果，但也需要你先了解这些情况发生的意义。</p><br>`,14),_=l('<h2 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h2><p>本课时主要介绍了一个处处有问题的报表系统，并逐步解决了它的 OOM 问题，同时定位到了拒绝服务的原因。</p><br><p>在研发资源不足的时候，我们简单粗暴的进行了硬件升级，并切换到了更加优秀的 G1 垃圾回收器，还通过代码手段进行了问题的根本解决：</p><ul><li><p>缩减查询的字段，减少常驻内存的数据；</p></li><li><p>去掉不必要的、命中率低的堆内缓存，改为分布式缓存；</p></li><li><p>从产品层面限制了单次请求对内存的无限制使用。</p></li></ul><br><p>在这个过程中，使用 MAT 分析堆数据进行问题代码定位，帮了大忙。代码优化的手段是最有效的，改造完毕后，可以节省更多的硬件资源。事实上，使用了 G1 垃圾回收器之后，那些乱七八糟的调优参数越来越少用了。</p><br><p>接下来，我们使用 jstack 分析了一个出现频率非常非常高的问题，主要是不同速度的接口在同一应用中的资源竞争问题，我们发现一些成熟的微服务框架，都会对这些资源进行限制和隔离。</p><br><p>最后，以 4 个简单的示例，展示了 jstack 输出内容的一些意义。代码都在 git 仓库里，你可以实际操作一下，希望对你有所帮助。</p>',11);function f(C,T,S,x,w,A){const s=t("Image");return o(),c("div",null,[i,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6B/C0/CgpOIF5YswCAdZ7JAABhTXSnBAQ829.jpg"}),n(),E,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6B/C0/Cgq2xl5YswGAHr8VAAA1xZ7pDg8510.jpg"}),n(),d,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6B/C0/CgpOIF5YswGAC8SRAAEG1hWaI_I736.jpg"}),n(),y,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6B/C0/Cgq2xl5YswGAexkRAABvM5JegWw758.jpg"}),n(),g,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6B/C0/CgpOIF5YswGAJ5P7AAFAbNc33Jo615.jpg"}),n(),u,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6B/C0/Cgq2xl5YswGAXVAQAACZ2MJUwQ4559.jpg"}),n(),b,h,v,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6B/C0/CgpOIF5YswKACEi1AAFlz8kljfk883.jpg"}),n(),m,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6B/C0/Cgq2xl5YswKAFuC5AAH6vr-FsN8996.jpg"}),n(),k,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6B/C0/CgpOIF5YswKAae_EAABYAiurKBQ445.jpg"}),n(),j,a(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/6B/C0/Cgq2xl5YswOALstRAAKRsvw-7ZU685.jpg"}),n(),_])}const M=e(r,[["render",f]]);export{q as __pageData,M as default};
