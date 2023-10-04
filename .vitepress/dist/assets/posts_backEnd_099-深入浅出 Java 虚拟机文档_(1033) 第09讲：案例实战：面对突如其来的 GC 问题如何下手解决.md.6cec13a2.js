import{_ as p,j as e,o as t,g as o,k as n,s,Q as l,h as i}from"./chunks/framework.e0c66c3f.js";const ms=JSON.parse('{"title":"GC 日志输出 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1033) 第09讲：案例实战：面对突如其来的 GC 问题如何下手解决.md","filePath":"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1033) 第09讲：案例实战：面对突如其来的 GC 问题如何下手解决.md","lastUpdated":1696338709000}'),r={name:"posts/backEnd/099-深入浅出 Java 虚拟机文档/(1033) 第09讲：案例实战：面对突如其来的 GC 问题如何下手解决.md"},c=s("p",null,"本课时我们主要从一个实战案例入手分析面对突如其来的 GC 问题该如何下手解决。",-1),_=s("br",null,null,-1),u=s("p",null,"想要下手解决 GC 问题，我们首先需要掌握下面这三种问题。",-1),g=s("ul",null,[s("li",null,[s("p",null,"如何使用 jstat 命令查看 JVM 的 GC 情况？")]),s("li",null,[s("p",null,"面对海量 GC 日志参数，如何快速抓住问题根源？")]),s("li",null,[s("p",null,"你不得不掌握的日志分析工具。")])],-1),E=s("p",null,"工欲善其事，必先利其器。我们前面课时讲到的优化手段，包括代码优化、扩容、参数优化，甚至我们的估算，都需要一些支撑信息加以判断。",-1),d=s("br",null,null,-1),h=l(`<br><p>对于 JVM 来说，一种情况是 GC 时间过长，会影响用户的体验，这个时候就需要调整某些 JVM 参数、观察日志。</p><br><p>另外一种情况就比较严重了，发生了 OOM，或者操作系统的内存溢出。服务直接宕机，我们要寻找背后的原因。</p><br><p>这时，GC 日志能够帮我们找到问题的根源。本课时，我们就简要介绍一下如何输出这些日志，以及如何使用这些日志的支撑工具解决问题。</p><h2 id="gc-日志输出" tabindex="-1">GC 日志输出 <a class="header-anchor" href="#gc-日志输出" aria-label="Permalink to &quot;GC 日志输出&quot;">​</a></h2><p>你可能感受到，最近几年 Java 的版本更新速度是很快的，JVM 的参数配置其实变化也很大。就拿 GC 日志这一块来说，Java 9 几乎是推翻重来。网络上的一些文章，把这些参数写的乱七八糟，根本不能投入生产。如果你碰到不能被识别的参数，先确认一下自己的 Java 版本。</p><br><p>在事故出现的时候，通常并不是那么温柔。你可能在半夜里就能接到报警电话，这是因为很多定时任务都设定在夜深人静的时候执行。</p><br><p>这个时候，再去看 jstat 已经来不及了，我们需要保留现场。这个便是看门狗的工作，看门狗可以通过设置一些 JVM 参数进行配置。</p><br><p>那在实践中，要怎么用呢？请看下面命令行。</p><h3 id="java-8" tabindex="-1">Java 8 <a class="header-anchor" href="#java-8" aria-label="Permalink to &quot;Java 8&quot;">​</a></h3><p>我们先看一下 JDK8 中的使用。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">#!/bin/sh</span></span>
<span class="line"><span style="color:#E1E4E8;">LOG_DIR=&quot;/tmp/logs&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">JAVA_OPT_LOG=&quot; -verbose:gc&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">JAVA_OPT_LOG=&quot;\${JAVA_OPT_LOG} -XX:+PrintGCDetails&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">JAVA_OPT_LOG=&quot;\${JAVA_OPT_LOG} -XX:+PrintGCDateStamps&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">JAVA_OPT_LOG=&quot;\${JAVA_OPT_LOG} -XX:+PrintGCApplicationStoppedTime&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">JAVA_OPT_LOG=&quot;\${JAVA_OPT_LOG} -XX:+PrintTenuringDistribution&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">JAVA_OPT_LOG=&quot;\${JAVA_OPT_LOG} -Xloggc:\${LOG_DIR}/gc_%p.log&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">JAVA_OPT_OOM=&quot; -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=\${LOG_DIR} -XX:ErrorFile=\${LOG_DIR}/hs_error_pid%p.log &quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">JAVA_OPT=&quot;\${JAVA_OPT_LOG} \${JAVA_OPT_OOM}&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">JAVA_OPT=&quot;\${JAVA_OPT} -XX:-OmitStackTraceInFastThrow&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">#!/bin/sh</span></span>
<span class="line"><span style="color:#24292E;">LOG_DIR=&quot;/tmp/logs&quot;</span></span>
<span class="line"><span style="color:#24292E;">JAVA_OPT_LOG=&quot; -verbose:gc&quot;</span></span>
<span class="line"><span style="color:#24292E;">JAVA_OPT_LOG=&quot;\${JAVA_OPT_LOG} -XX:+PrintGCDetails&quot;</span></span>
<span class="line"><span style="color:#24292E;">JAVA_OPT_LOG=&quot;\${JAVA_OPT_LOG} -XX:+PrintGCDateStamps&quot;</span></span>
<span class="line"><span style="color:#24292E;">JAVA_OPT_LOG=&quot;\${JAVA_OPT_LOG} -XX:+PrintGCApplicationStoppedTime&quot;</span></span>
<span class="line"><span style="color:#24292E;">JAVA_OPT_LOG=&quot;\${JAVA_OPT_LOG} -XX:+PrintTenuringDistribution&quot;</span></span>
<span class="line"><span style="color:#24292E;">JAVA_OPT_LOG=&quot;\${JAVA_OPT_LOG} -Xloggc:\${LOG_DIR}/gc_%p.log&quot;</span></span>
<span class="line"><span style="color:#24292E;">JAVA_OPT_OOM=&quot; -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=\${LOG_DIR} -XX:ErrorFile=\${LOG_DIR}/hs_error_pid%p.log &quot;</span></span>
<span class="line"><span style="color:#24292E;">JAVA_OPT=&quot;\${JAVA_OPT_LOG} \${JAVA_OPT_OOM}&quot;</span></span>
<span class="line"><span style="color:#24292E;">JAVA_OPT=&quot;\${JAVA_OPT} -XX:-OmitStackTraceInFastThrow&quot;</span></span></code></pre></div><p>合成一行。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">-verbose:gc -XX:+PrintGCDetails -XX:+PrintGCDateStamps </span></span>
<span class="line"><span style="color:#E1E4E8;">-XX:+PrintGCApplicationStoppedTime -XX:+PrintTenuringDistribution </span></span>
<span class="line"><span style="color:#E1E4E8;">-Xloggc:/tmp/logs/gc_%p.log -XX:+HeapDumpOnOutOfMemoryError </span></span>
<span class="line"><span style="color:#E1E4E8;">-XX:HeapDumpPath=/tmp/logs -XX:ErrorFile=/tmp/logs/hs_error_pid%p.log </span></span>
<span class="line"><span style="color:#E1E4E8;">-XX:-OmitStackTraceInFastThrow</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">-verbose:gc -XX:+PrintGCDetails -XX:+PrintGCDateStamps </span></span>
<span class="line"><span style="color:#24292E;">-XX:+PrintGCApplicationStoppedTime -XX:+PrintTenuringDistribution </span></span>
<span class="line"><span style="color:#24292E;">-Xloggc:/tmp/logs/gc_%p.log -XX:+HeapDumpOnOutOfMemoryError </span></span>
<span class="line"><span style="color:#24292E;">-XX:HeapDumpPath=/tmp/logs -XX:ErrorFile=/tmp/logs/hs_error_pid%p.log </span></span>
<span class="line"><span style="color:#24292E;">-XX:-OmitStackTraceInFastThrow</span></span></code></pre></div><p>然后我们来解释一下这些参数：</p><br><p>|-------------------------------|------------------------------------------| | 参数 | 意义 | | -verbose:gc | 打印 GC 日志 | | PrintGCDetails | 打印详细 GC 日志 | | PrintGCDateStamps | 系统时间，更加可读，PrintGCTimeStamps 是 JVM 启动时间 | | PrintGCApplicationStoppedTime | 打印 STW 时间 | | PrintTenuringDistribution | 打印对象年龄分布，对调优 MaxTenuringThreshold 参数帮助很大 | | loggc | 将以上 GC 内容输出到文件中 |</p><br><p>再来看下 OOM 时的参数：</p><br><p>|----------------------------|--------------------| | 参数 | 意义 | | HeapDumpOnOutOfMemoryError | OOM 时 Dump 信息，非常有用 | | HeapDumpPath | Dump 文件保存路径 | | ErrorFile | 错误日志存放路径 |</p><br><p>注意到我们还设置了一个参数 OmitStackTraceInFastThrow，这是 JVM 用来缩简日志输出的。</p><br><p>开启这个参数之后，如果你多次发生了空指针异常，将会打印以下信息。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">java.lang.NullPointerException</span></span>
<span class="line"><span style="color:#E1E4E8;">java.lang.NullPointerException</span></span>
<span class="line"><span style="color:#E1E4E8;">java.lang.NullPointerException</span></span>
<span class="line"><span style="color:#E1E4E8;">java.lang.NullPointerException</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">java.lang.NullPointerException</span></span>
<span class="line"><span style="color:#24292E;">java.lang.NullPointerException</span></span>
<span class="line"><span style="color:#24292E;">java.lang.NullPointerException</span></span>
<span class="line"><span style="color:#24292E;">java.lang.NullPointerException</span></span></code></pre></div><p>在实际生产中，这个参数是默认开启的，这样就导致有时候排查问题非常不方便（很多研发对此无能为力），我们这里把它关闭，但这样它会输出所有的异常堆栈，日志会多很多。</p><h3 id="java-13" tabindex="-1">Java 13 <a class="header-anchor" href="#java-13" aria-label="Permalink to &quot;Java 13&quot;">​</a></h3><p>再看下 JDK 13 中的使用。</p><br><p>从 Java 9 开始，移除了 40 多个 GC 日志相关的参数。具体参见 JEP 158。所以这部分的日志配置有很大的变化。</p><br><p>我们同样看一下它的生成脚本。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">#!/bin/sh</span></span>
<span class="line"><span style="color:#E1E4E8;">LOG_DIR=&quot;/tmp/logs&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">JAVA_OPT_LOG=&quot; -verbose:gc&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">JAVA_OPT_LOG=&quot;\${JAVA_OPT_LOG} -Xlog:gc,gc+ref=debug,gc+heap=debug,gc+age=trace:file=\${LOG_DIR}/gc_%p.log:tags,uptime,time,level&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">JAVA_OPT_LOG=&quot;\${JAVA_OPT_LOG} -Xlog:safepoint:file=\${LOG_DIR}/safepoint_%p.log:tags,uptime,time,level&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">JAVA_OPT_OOM=&quot; -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=\${LOG_DIR} -XX:ErrorFile=\${LOG_DIR}/hs_error_pid%p.log &quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">JAVA_OPT=&quot;\${JAVA_OPT_LOG} \${JAVA_OPT_OOM}&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">JAVA_OPT=&quot;\${JAVA_OPT} -XX:-OmitStackTraceInFastThrow&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">echo $JAVA_OPT</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">#!/bin/sh</span></span>
<span class="line"><span style="color:#24292E;">LOG_DIR=&quot;/tmp/logs&quot;</span></span>
<span class="line"><span style="color:#24292E;">JAVA_OPT_LOG=&quot; -verbose:gc&quot;</span></span>
<span class="line"><span style="color:#24292E;">JAVA_OPT_LOG=&quot;\${JAVA_OPT_LOG} -Xlog:gc,gc+ref=debug,gc+heap=debug,gc+age=trace:file=\${LOG_DIR}/gc_%p.log:tags,uptime,time,level&quot;</span></span>
<span class="line"><span style="color:#24292E;">JAVA_OPT_LOG=&quot;\${JAVA_OPT_LOG} -Xlog:safepoint:file=\${LOG_DIR}/safepoint_%p.log:tags,uptime,time,level&quot;</span></span>
<span class="line"><span style="color:#24292E;">JAVA_OPT_OOM=&quot; -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=\${LOG_DIR} -XX:ErrorFile=\${LOG_DIR}/hs_error_pid%p.log &quot;</span></span>
<span class="line"><span style="color:#24292E;">JAVA_OPT=&quot;\${JAVA_OPT_LOG} \${JAVA_OPT_OOM}&quot;</span></span>
<span class="line"><span style="color:#24292E;">JAVA_OPT=&quot;\${JAVA_OPT} -XX:-OmitStackTraceInFastThrow&quot;</span></span>
<span class="line"><span style="color:#24292E;">echo $JAVA_OPT</span></span></code></pre></div><p>合成一行展示。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">-verbose:gc -Xlog:gc,gc+ref=debug,gc+heap=debug,gc+age=trace:file</span></span>
<span class="line"><span style="color:#E1E4E8;">=/tmp/logs/gc_%p.log:tags,uptime,time,level -Xlog:safepoint:file=/tmp</span></span>
<span class="line"><span style="color:#E1E4E8;">/logs/safepoint_%p.log:tags,uptime,time,level -XX:+HeapDumpOnOutOfMemoryError </span></span>
<span class="line"><span style="color:#E1E4E8;">-XX:HeapDumpPath=/tmp/logs -XX:ErrorFile=/tmp/logs/hs_error_pid%p.log </span></span>
<span class="line"><span style="color:#E1E4E8;">-XX:-OmitStackTraceInFastThrow</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">-verbose:gc -Xlog:gc,gc+ref=debug,gc+heap=debug,gc+age=trace:file</span></span>
<span class="line"><span style="color:#24292E;">=/tmp/logs/gc_%p.log:tags,uptime,time,level -Xlog:safepoint:file=/tmp</span></span>
<span class="line"><span style="color:#24292E;">/logs/safepoint_%p.log:tags,uptime,time,level -XX:+HeapDumpOnOutOfMemoryError </span></span>
<span class="line"><span style="color:#24292E;">-XX:HeapDumpPath=/tmp/logs -XX:ErrorFile=/tmp/logs/hs_error_pid%p.log </span></span>
<span class="line"><span style="color:#24292E;">-XX:-OmitStackTraceInFastThrow</span></span></code></pre></div><br><p>可以看到 GC 日志的打印方式，已经完全不一样，但是比以前的日志参数规整了许多。</p><br><p>我们除了输出 GC 日志，还输出了 safepoint 的日志。这个日志对我们分析问题也很重要，那什么叫 safepoint 呢？</p><br><p>safepoint 是 JVM 中非常重要的一个概念，指的是可以安全地暂停线程的点。</p><br><p>当发生 GC 时，用户线程必须全部停下来，才可以进行垃圾回收，这个状态我们可以认为 JVM 是安全的（safe），整个堆的状态是稳定的。</p><br>`,50),A=s("br",null,null,-1),O=s("p",null,"如果在 GC 前，有线程迟迟进入不了 safepoint，那么整个 JVM 都在等待这个阻塞的线程，会造成了整体 GC 的时间变长。",-1),C=s("br",null,null,-1),m=s("p",null,"所以呢，并不是只有 GC 会挂起 JVM，进入 safepoint 的过程也会。这个概念，如果你有兴趣可以自行深挖一下，一般是不会出问题的。",-1),G=s("br",null,null,-1),T=s("p",null,"如果面试官问起你在项目中都使用了哪些打印 GC 日志的参数，上面这些信息肯定是不很好记忆。你需要进行以下总结。比如：",-1),b=s("br",null,null,-1),y=s("p",null,'"我一般在项目中输出详细的 GC 日志，并加上可读性强的 GC 日志的时间戳。特别情况下我还会追加一些反映对象晋升情况和堆详细信息的日志，用来排查问题。另外，OOM 时自动 Dump 堆栈，我一般也会进行配置"。',-1),P=s("h2",{id:"gc-日志的意义",tabindex:"-1"},[i("GC 日志的意义 "),s("a",{class:"header-anchor",href:"#gc-日志的意义","aria-label":'Permalink to "GC 日志的意义"'},"​")],-1),q=s("p",null,"我们首先看一段日志，然后简要看一下各个阶段的意义。",-1),X=s("br",null,null,-1),v=l("<br><ul><li><p>1 表示 GC 发生的时间，一般使用可读的方式打印；</p></li><li><p>2 表示日志表明是 G1 的&quot;转移暂停: 混合模式&quot;，停顿了约 223ms；</p></li><li><p>3 表明由 8 个 Worker 线程并行执行，消耗了 214ms；</p></li><li><p>4 表示 Diff 越小越好，说明每个工作线程的速度都很均匀；</p></li><li><p>5 表示外部根区扫描，外部根是堆外区。JNI 引用，JVM 系统目录，Classloaders 等；</p></li><li><p>6 表示更新 RSet 的时间信息；</p></li><li><p>7 表示该任务主要是对 CSet 中存活对象进行转移（复制）；</p></li><li><p>8 表示花在 GC 之外的工作线程的时间；</p></li><li><p>9 表示并行阶段的 GC 总时间；</p></li><li><p>10 表示其他清理活动；</p></li><li><p>11表示收集结果统计；</p></li><li><p>12 表示时间花费统计。</p></li></ul><p>可以看到 GC 日志描述了垃圾回收器过程中的几乎每一个阶段。但即使你了解了这些数值的意义，在分析问题时，也会感到吃力，我们一般使用图形化的分析工具进行分析。</p><br><p>尤其注意的是最后一行日志，需要详细描述。可以看到 G C花费的时间，竟然有 3 个数值。这个数值你可能在多个地方见过。如果你手头有 Linux 机器，可以执行以下命令：</p><p>time ls /</p><br>",7),J=l('<br><p>可以看到一段命令的执行，同样有三种纬度的时间统计。接下来解释一下这三个字段的意思。</p><ul><li><p>real 实际花费的时间，指的是从开始到结束所花费的时间。比如进程在等待 I/O 完成，这个阻塞时间也会被计算在内；</p></li><li><p>user 指的是进程在用户态（User Mode）所花费的时间，只统计本进程所使用的时间，注意是指多核；</p></li><li><p>sys 指的是进程在核心态（Kernel Mode）花费的 CPU 时间量，指的是内核中的系统调用所花费的时间，只统计本进程所使用的时间。</p></li></ul><p>在上面的 GC 日志中，real &lt; user + sys，因为我们使用了多核进行垃圾收集，所以实际发生的时间比 (user + sys) 少很多。在多核机器上，这很常见。</p><p>[Times: user=1.64 sys=0.00, real=0.23 secs]</p><br><p>下面是一个串行垃圾收集器收集的 GC 时间的示例。由于串行垃圾收集器始终仅使用一个线程，因此实际使用的时间等于用户和系统时间的总和：</p><p>[Times: user=0.29 sys=0.00, real=0.29 secs]</p><br><p>那我们统计 GC 以哪个时间为准呢？一般来说，用户只关心系统停顿了多少秒，对实际的影响时间非常感兴趣。至于背后是怎么实现的，是多核还是单核，是用户态还是内核态，它们都不关心。所以我们直接使用 real 字段。</p><h2 id="gc日志可视化" tabindex="-1">GC日志可视化 <a class="header-anchor" href="#gc日志可视化" aria-label="Permalink to &quot;GC日志可视化&quot;">​</a></h2><p>肉眼可见的这些日志信息，让人非常头晕，尤其是日志文件特别大的时候。所幸现在有一些在线分析平台，可以帮助我们分析这个过程。下面我们拿常用的 gceasy 来看一下。</p><br><p>以下是一个使用了 G1 垃圾回收器，堆内存为 6GB 的服务，运行 5 天的 GC 日志。</p><p>（1）堆信息</p><br>',16),V=s("br",null,null,-1),M=s("p",null,"我们可以从图中看到堆的使用情况。",-1),k=s("br",null,null,-1),S=s("p",null,"（2）关键信息",-1),D=s("p",null,"从图中我们可以看到一些性能的关键信息。",-1),f=s("p",null,"吞吐量：98.6%（一般超过 95% 就 ok 了）；",-1),I=s("p",null,"最大延迟：230ms，平均延迟：42.8ms；",-1),L=s("p",null,"延迟要看服务的接受程度，比如 SLA 定义 50ms 返回数据，上面的最大延迟就会有一点问题。本服务接近 99% 的停顿在 100ms 以下，可以说算是非常优秀了。",-1),$=s("br",null,null,-1),R=s("br",null,null,-1),j=s("p",null,"你在看这些信息的时候，一定要结合宿主服务器的监控去看。比如 GC 发生期间，CPU 会突然出现尖锋，就证明 GC 对 CPU 资源使用的有点多。但多数情况下，如果吞吐量和延迟在可接受的范围内，这些对 CPU 的超额使用是可以忍受的。",-1),F=s("br",null,null,-1),x=s("p",null,"（3）交互式图表",-1),N=s("br",null,null,-1),w=s("br",null,null,-1),H=s("p",null,"可以对有问题的区域进行放大查看，图中表示垃圾回收后的空间释放，可以看到效果是比较好的。",-1),B=s("br",null,null,-1),U=s("p",null,"（4）G1 的时间耗时",-1),Y=s("br",null,null,-1),K=s("br",null,null,-1),W=s("p",null,"如图展示了 GC 的每个阶段花费的时间。可以看到平均耗时最长的阶段，就是 Concurrent Mark 阶段，但由于是并发的，影响并不大。随着时间的推移，YoungGC 竟然达到了 136485 次。运行 5 天，光花在 GC 上的时间就有 2 个多小时，还是比较可观的。",-1),Q=s("br",null,null,-1),z=s("p",null,"（5）其他",-1),Z=s("br",null,null,-1),ss=s("br",null,null,-1),as=s("p",null,"如图所示，整个 JVM 创建了 100 多 T 的数据，其中有 2.4TB 被 promoted 到老年代。",-1),ns=s("p",null,"另外，还有一些 safepoint 的信息等，你可以自行探索。",-1),ls=s("br",null,null,-1),ps=s("p",null,"那到底什么样的数据才是有问题的呢？gceasy 提供了几个案例。比如下面这个就是停顿时间明显超长的 GC 问题。",-1),es=s("br",null,null,-1),ts=s("br",null,null,-1),os=s("p",null,"下面这个是典型的内存泄漏。",-1),is=s("br",null,null,-1),rs=l(`<br><p>上面这些问题都是非常明显的。但大多数情况下，问题是偶发的。从基本的衡量指标，就能考量到整体的服务水准。如果这些都没有问题，就要看曲线的尖峰。</p><br><p>一般来说，任何不平滑的曲线，都是值得怀疑的，那就需要看一下当时的业务情况具体是什么样子的。是用户请求突增引起的，还是执行了一个批量的定时任务，再或者查询了大批量的数据，这要和一些服务的监控一起看才能定位出根本问题。</p><br><p>只靠 GC 来定位问题是比较困难的，我们只需要知道它有问题就可以了。后面，会介绍更多的支持工具进行问题的排解。</p><br><p>为了方便你调试使用，我在 GitHub 上上传了两个 GC 日志。其中 gc01.tar.gz 就是我们现在正在看的，解压后有 200 多兆；另外一个 gc02.tar.gz 是一个堆空间为 1GB 的日志文件，你也可以下载下来体验一下。</p><blockquote><p>GitHub 地址： <a href="https://gitee.com/xjjdog/jvm-lagou-res" target="_blank" rel="noreferrer">https://gitee.com/xjjdog/jvm-lagou-res</a></p></blockquote><p>另外，GCViewer 这个工具也是常用的，可以下载到本地，以 jar 包的方式运行。</p><br><p>在一些极端情况下，也可以使用脚本简单过滤一下。比如下面行命令，就是筛选停顿超过 100ms 的 GC 日志和它的行数（G1）。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"># grep -n real gc.log | awk -F&quot;=| &quot; &#39;{ if($8&gt;0.1){ print }}&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">1975: [Times: user=2.03 sys=0.93, real=0.75 secs]</span></span>
<span class="line"><span style="color:#E1E4E8;">2915: [Times: user=1.82 sys=0.65, real=0.64 secs]</span></span>
<span class="line"><span style="color:#E1E4E8;">16492: [Times: user=0.47 sys=0.89, real=0.35 secs]</span></span>
<span class="line"><span style="color:#E1E4E8;">16627: [Times: user=0.71 sys=0.76, real=0.39 secs]</span></span>
<span class="line"><span style="color:#E1E4E8;">16801: [Times: user=1.41 sys=0.48, real=0.49 secs]</span></span>
<span class="line"><span style="color:#E1E4E8;">17045: [Times: user=0.35 sys=1.25, real=0.41 secs]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"># grep -n real gc.log | awk -F&quot;=| &quot; &#39;{ if($8&gt;0.1){ print }}&#39;</span></span>
<span class="line"><span style="color:#24292E;">1975: [Times: user=2.03 sys=0.93, real=0.75 secs]</span></span>
<span class="line"><span style="color:#24292E;">2915: [Times: user=1.82 sys=0.65, real=0.64 secs]</span></span>
<span class="line"><span style="color:#24292E;">16492: [Times: user=0.47 sys=0.89, real=0.35 secs]</span></span>
<span class="line"><span style="color:#24292E;">16627: [Times: user=0.71 sys=0.76, real=0.39 secs]</span></span>
<span class="line"><span style="color:#24292E;">16801: [Times: user=1.41 sys=0.48, real=0.49 secs]</span></span>
<span class="line"><span style="color:#24292E;">17045: [Times: user=0.35 sys=1.25, real=0.41 secs]</span></span></code></pre></div><h2 id="jstat" tabindex="-1">jstat <a class="header-anchor" href="#jstat" aria-label="Permalink to &quot;jstat&quot;">​</a></h2><p>上面的可视化工具，必须经历导出、上传、分析三个阶段，这种速度太慢了。有没有可以实时看堆内存的工具？</p><br><p>你可能会第一时间想到 jstat 命令。第一次接触这个命令，我也是很迷惑的，主要是输出的字段太多，不了解什么意义。</p><br><p>但其实了解我们在前几节课时所讲到内存区域划分和堆划分之后，再看这些名词就非常简单了。</p><br>`,20),cs=l(`<br><p>我们拿 -gcutil 参数来说明一下。</p><br><p>jstat -gcutil $pid 1000</p><br><p>只需要提供一个 Java 进程的 ID，然后指定间隔时间（毫秒）就 OK 了。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">S0 S1 E O M CCS YGC YGCT FGC FGCT GCT</span></span>
<span class="line"><span style="color:#E1E4E8;">0.00 0.00 72.03 0.35 54.12 55.72 11122 16.019 0 0.000 16.019</span></span>
<span class="line"><span style="color:#E1E4E8;">0.00 0.00 95.39 0.35 54.12 55.72 11123 16.024 0 0.000 16.024</span></span>
<span class="line"><span style="color:#E1E4E8;">0.00 0.00 25.32 0.35 54.12 55.72 11125 16.025 0 0.000 16.025</span></span>
<span class="line"><span style="color:#E1E4E8;">0.00 0.00 37.00 0.35 54.12 55.72 11126 16.028 0 0.000 16.028</span></span>
<span class="line"><span style="color:#E1E4E8;">0.00 0.00 60.35 0.35 54.12 55.72 11127 16.028 0 0.000 16.028</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">S0 S1 E O M CCS YGC YGCT FGC FGCT GCT</span></span>
<span class="line"><span style="color:#24292E;">0.00 0.00 72.03 0.35 54.12 55.72 11122 16.019 0 0.000 16.019</span></span>
<span class="line"><span style="color:#24292E;">0.00 0.00 95.39 0.35 54.12 55.72 11123 16.024 0 0.000 16.024</span></span>
<span class="line"><span style="color:#24292E;">0.00 0.00 25.32 0.35 54.12 55.72 11125 16.025 0 0.000 16.025</span></span>
<span class="line"><span style="color:#24292E;">0.00 0.00 37.00 0.35 54.12 55.72 11126 16.028 0 0.000 16.028</span></span>
<span class="line"><span style="color:#24292E;">0.00 0.00 60.35 0.35 54.12 55.72 11127 16.028 0 0.000 16.028</span></span></code></pre></div><p>可以看到，E 其实是 Eden 的缩写，S0 对应的是 Surivor0，S1 对应的是 Surivor1，O 代表的是 Old，而 M 代表的是 Metaspace。</p><br><p>YGC 代表的是年轻代的回收次数，YGC T对应的是年轻代的回收耗时。那么 FGC 肯定代表的是 Full GC 的次数。</p><br><p>你在看日志的时候，一定要注意其中的规律。-gcutil 位置的参数可以有很多种。我们最常用的有 gc、gcutil、gccause、gcnew 等，其他的了解一下即可。</p><ul><li><p>gc: 显示和 GC 相关的 <strong>堆信息</strong> ；</p></li><li><p>gcutil: 显示 <strong>垃圾回收信息</strong> ；</p></li><li><p>gccause: 显示<strong>垃圾回收</strong> 的相关信息（同 -gcutil），同时显示 <strong>最后一次</strong> 或 <strong>当前</strong> 正在发生的垃圾回收的 <strong>诱因</strong> ；</p></li><li><p>gcnew: 显示 <strong>新生代</strong> 信息；</p></li><li><p>gccapacity: 显示 <strong>各个代</strong> 的 <strong>容量</strong> 以及 <strong>使用情况</strong> ；</p></li><li><p>gcmetacapacity: 显示 <strong>元空间</strong> metaspace 的大小；</p></li><li><p>gcnewcapacity: 显示 <strong>新生代大小</strong> 和 <strong>使用情况</strong> ；</p></li><li><p>gcold: 显示 <strong>老年代</strong> 和 <strong>永久代</strong> 的信息；</p></li><li><p>gcoldcapacity: 显示 <strong>老年代</strong> 的大小；</p></li><li><p>printcompilation: 输出 JIT <strong>编译</strong> 的方法信息；</p></li><li><p>class: 显示 <strong>类加载</strong> ClassLoader 的相关信息；</p></li><li><p>compiler: 显示 JIT <strong>编译</strong> 的相关信息；</p></li></ul><br><p>如果 GC 问题特别明显，通过 jstat 可以快速发现。我们在启动命令行中加上参数 -t，可以输出从程序启动到现在的时间。如果 FGC 和启动时间的比值太大，就证明系统的吞吐量比较小，GC 花费的时间太多了。另外，如果老年代在 Full GC 之后，没有明显的下降，那可能内存已经达到了瓶颈，或者有内存泄漏问题。</p><br><p>下面这行命令，就追加了 GC 时间的增量和 GC 时间比率两列。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">jstat -gcutil -t 90542 1000 | awk &#39;BEGIN{pre=0}{if(NR&gt;1) {print $0 &quot;\\t&quot; ($12-pre) &quot;\\t&quot; $12*100/$1 ; pre=$12 } else { print $0 &quot;\\tGCT_INC\\tRate&quot;} }&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">Timestamp         S0     S1     E      O      M     CCS    YGC     YGCT    FGC    FGCT     GCT    GCT_INC Rate</span></span>
<span class="line"><span style="color:#E1E4E8;">           18.7   0.00 100.00   6.02   1.45  84.81  76.09      1    0.002     0    0.000    0.002 0.002 0.0106952</span></span>
<span class="line"><span style="color:#E1E4E8;">           19.7   0.00 100.00   6.02   1.45  84.81  76.09      1    0.002     0    0.000    0.002 0 0.0101523</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">jstat -gcutil -t 90542 1000 | awk &#39;BEGIN{pre=0}{if(NR&gt;1) {print $0 &quot;\\t&quot; ($12-pre) &quot;\\t&quot; $12*100/$1 ; pre=$12 } else { print $0 &quot;\\tGCT_INC\\tRate&quot;} }&#39;</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">Timestamp         S0     S1     E      O      M     CCS    YGC     YGCT    FGC    FGCT     GCT    GCT_INC Rate</span></span>
<span class="line"><span style="color:#24292E;">           18.7   0.00 100.00   6.02   1.45  84.81  76.09      1    0.002     0    0.000    0.002 0.002 0.0106952</span></span>
<span class="line"><span style="color:#24292E;">           19.7   0.00 100.00   6.02   1.45  84.81  76.09      1    0.002     0    0.000    0.002 0 0.0101523</span></span></code></pre></div><br><h2 id="gc-日志也会搞鬼" tabindex="-1">GC 日志也会搞鬼 <a class="header-anchor" href="#gc-日志也会搞鬼" aria-label="Permalink to &quot;GC 日志也会搞鬼&quot;">​</a></h2><p>顺便给你介绍一个实际发生的故障。</p><br><p>你知道 ElasticSearch 的速度是非常快的，我们为了压榨它的性能，对磁盘的读写几乎是全速的。它在后台做了很多 Merge 动作，将小块的索引合并成大块的索引。还有 TransLog 等预写动作，都是 I/O 大户。</p><br><p>使用 iostat -x 1 可以看到具体的 I/O 使用状况。</p><br><p>问题是，我们有一套 ES 集群，在访问高峰时，有多个 ES 节点发生了严重的 STW 问题。有的节点竟停顿了足足有 7~8 秒。</p><p>[Times: user=0.42 sys=0.03, real=7.62 secs]</p><br><p>从日志可以看到在 GC 时用户态只停顿了 420ms，但真实的停顿时间却有 7.62 秒。</p><br><p>盘点一下资源，唯一超额利用的可能就是 I/O 资源了（%util 保持在 90 以上），GC 可能在等待 I/O。</p><br><p>通过搜索，发现已经有人出现过这个问题，这里直接说原因和结果。</p><br><p>原因就在于，写 GC 日志的 write 动作，是统计在 STW 的时间里的。在我们的场景中，由于 ES 的索引数据，和 GC 日志放在了一个磁盘，GC 时写日志的动作，就和写数据文件的动作产生了资源争用。</p><br>`,37),_s=l('<br><p>解决方式也是比较容易的，把 ES 的日志文件，单独放在一块普通 HDD 磁盘上就可以了。</p><h2 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h2><p>本课时，我们主要介绍了比较重要的 GC 日志，以及怎么输出它，并简要的介绍了一段 G1 日志的意义。对于这些日志的信息，能够帮助我们理解整个 GC 的过程，专门去记忆它投入和产出并不成正比，可以多看下 G1 垃圾回收器原理方面的东西。</p><br><p>接下来我们介绍了几个图形化分析 GC 的工具，这也是现在主流的使用方式，因为动辄几百 MB 的 GC 日志，是无法肉眼分辨的。如果机器的 I/O 问题很突出，就要考虑把 GC 日志移动到单独的磁盘。</p><br><p>我们尤其介绍了在线分析工具 gceasy，你也可以下载 gcviewer 的 jar 包本地体验一下。</p><br><p>最后我们看了一个命令行的 GC 回收工具 jstat，它的格式比较规整，可以重定向到一个日志文件里，后续使用 sed、awk 等工具进行分析。关于相关的两个命令，可以参考我以前写的两篇文章。</p><br><p><a href="https://mp.weixin.qq.com/s/wP9_wvoTARRrlszsOmvMgQ" target="_blank" rel="noreferrer">《Linux生产环境上，最常用的一套&quot;Sed&quot;技巧》</a></p><p><a href="https://mp.weixin.qq.com/s/aRy3QlMUpSNOKf2pyN6Uuw" target="_blank" rel="noreferrer">《Linux生产环境上，最常用的一套&quot;AWK&quot;技巧》</a></p>',13);function us(gs,Es,ds,hs,As,Os){const a=e("Image");return t(),o("div",null,[c,_,u,g,E,d,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/AC/CgpOIF49MRaAYy5hAAAxaKab220724.jpg"}),h,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/AC/Cgq2xl49MRaAZaFKAABeSE1hLTg491.jpg"}),A,O,C,m,G,T,b,y,P,q,X,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/AC/CgpOIF49MRaAUrVfAAFWihJ6jwk874.jpg"}),v,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/AC/Cgq2xl49MRaAWpU-AAAUzFIkYlk730.jpg"}),J,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/AC/CgpOIF49MRaACSuzAABDthdVxTk570.jpg"}),V,M,k,S,D,f,I,L,$,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/AC/Cgq2xl49MReAI98WAABRPqHhDjE672.jpg"}),R,j,F,x,N,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/AC/CgpOIF49MReAcKfGAABakc1dRtA053.jpg"}),w,H,B,U,Y,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/AC/Cgq2xl49MReAf_DdAACM8OnUC_I541.jpg"}),K,W,Q,z,Z,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/AC/CgpOIF49MReAL2goAAB6BiE3imA217.jpg"}),ss,as,ns,ls,ps,es,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/AC/Cgq2xl49MReAQIQ_AABZPnGfj9s030.jpg"}),ts,os,is,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/AC/CgpOIF49MReAQHswAABgRmmPU5k549.jpg"}),rs,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/AC/Cgq2xl49MReAUqsJAABSeq9EGOY088.jpg"}),cs,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/64/AC/CgpOIF49MReAa5QEAAAoiL0gjR4706.jpg"}),_s])}const Gs=p(r,[["render",us]]);export{ms as __pageData,Gs as default};
