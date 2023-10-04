import{_ as n,j as p,o as l,g as e,k as o,Q as s}from"./chunks/framework.e0c66c3f.js";const D=JSON.parse('{"title":"日志类型 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/ZooKeeper源码分析与实战_文档/(3157) 第27讲：crontab 与 PurgeTxnLog：线上系统日志清理的最佳时间和方式.md","filePath":"posts/backEnd/ZooKeeper源码分析与实战_文档/(3157) 第27讲：crontab 与 PurgeTxnLog：线上系统日志清理的最佳时间和方式.md","lastUpdated":1696338709000}'),t={name:"posts/backEnd/ZooKeeper源码分析与实战_文档/(3157) 第27讲：crontab 与 PurgeTxnLog：线上系统日志清理的最佳时间和方式.md"},r=s(`<p>本节课，我们主要学习对线上 ZooKeeper 服务器日志进行维护的操作，主要维护方式是备份和清理。几乎所有的生产系统都会产生日志文件，用来记录服务的运行状态，在服务发生异常的时候，可以用来作为分析问题原因的依据。ZooKeeper 作为分布式系统下的重要组件，在分布式网络中会处理大量的客户端请求，因此也会产生大量的日志文件，对这些问题的维护关系到整个 ZooKeeper 服务的运行质量。接下来我们就来学习如何维护这些日志文件。</p><h3 id="日志类型" tabindex="-1">日志类型 <a class="header-anchor" href="#日志类型" aria-label="Permalink to &quot;日志类型&quot;">​</a></h3><p>首先，我们先来介绍线上生产环境中的 ZooKeeper 集群在对外提供服务的过程中，都会产生哪些日志类型。我们在之前的课程中也介绍过了，在 ZooKeeper 服务运行的时候，一般会产生数据快照和日志文件，数据快照用于集群服务中的数据同步，而数据日志则记录了 ZooKeeper 服务运行的相关状态信息。其中，数据日志是我们在生产环境中需要定期维护和管理的文件。</p><h3 id="清理方案" tabindex="-1">清理方案 <a class="header-anchor" href="#清理方案" aria-label="Permalink to &quot;清理方案&quot;">​</a></h3><p>如上面所介绍的，面对生产系统中产生的日志，一般的维护操作是备份和清理。备份是为了之后对系统的运行情况进行排查和优化，而清理主要因为随着系统日志的增加，日志会逐渐占用系统的存储空间，如果一直不进行清理，可能耗尽系统的磁盘存储空间，并最终影响服务的运行。但在实际工作中，我们不能 24 小时监控系统日志情况，因此这里我们介绍一种定时任务，可以自动清理和备份 ZooKeeper 服务运行产生的相关日志。</p><h3 id="清理工具" tabindex="-1">清理工具 <a class="header-anchor" href="#清理工具" aria-label="Permalink to &quot;清理工具&quot;">​</a></h3><h4 id="corntab" tabindex="-1">corntab <a class="header-anchor" href="#corntab" aria-label="Permalink to &quot;corntab&quot;">​</a></h4><p>首先，我们介绍的是 Linux corntab ，它是 Linux 系统下的软件，可以自动地按照我们设定的时间，周期性地执行我们编写的相关脚本。下面我们就用它来写一个定时任务，实现每周定期清理 ZooKeeper 服务日志。</p><h4 id="创建脚本" tabindex="-1">创建脚本 <a class="header-anchor" href="#创建脚本" aria-label="Permalink to &quot;创建脚本&quot;">​</a></h4><p>我们通过 Linux 系统下的 Vim 文本编辑器，来创建一个叫作 &quot; logsCleanWeek &quot; 的定时脚本，该脚本是一个 shell 格式的可执行文件。如下面的代码所示，我们在 usr/bin/ 文件夹下创建该文件，该脚本的主要内容是设定 ZooKeeper 快照和数据日志的对应文件夹路径，并通过 shell 脚本和管道和 find 命令 查询对应的日志下的日志文件，这里我们保留最新的 10 条数据日志，其余的全部清理。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#!/bin/bash </span></span>
<span class="line"><span style="color:#E1E4E8;">dataDir</span><span style="color:#F97583;">=/</span><span style="color:#E1E4E8;">home</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">zk</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">zk_data</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">version</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">dataLogDir</span><span style="color:#F97583;">=/</span><span style="color:#E1E4E8;">home</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">zk</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">zk_log</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">version</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">ls </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">t $dataLogDir</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">log.</span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> tail </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">n </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">$count </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> xargs rm </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">f </span></span>
<span class="line"><span style="color:#E1E4E8;">ls </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">t $dataDir</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">snapshot.</span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> tail </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">n </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">$count </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> xargs rm </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">f </span></span>
<span class="line"><span style="color:#E1E4E8;">ls </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">t $logDir</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">zookeeper.log.</span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> tail </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">n </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">$count </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> xargs rm </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">f  </span></span>
<span class="line"><span style="color:#E1E4E8;">find </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">home</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">home</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">zk</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">zk_data</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">version</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">name </span><span style="color:#9ECBFF;">&quot;snap*&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">mtime </span><span style="color:#F97583;">+</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> xargs rm </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">f                              </span></span>
<span class="line"><span style="color:#E1E4E8;">find </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">home</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">home</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">zk</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">zk_data</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">version</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">name </span><span style="color:#9ECBFF;">&quot;snap*&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">mtime </span><span style="color:#F97583;">+</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> xargs rm </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">f               </span></span>
<span class="line"><span style="color:#E1E4E8;">find </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">home</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">home</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">zk</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">zk_data</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">logs</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">name </span><span style="color:#9ECBFF;">&quot;zookeeper.log.*&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">mtime </span><span style="color:#F97583;">+</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> xargs rm </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">f</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#!/bin/bash </span></span>
<span class="line"><span style="color:#24292E;">dataDir</span><span style="color:#D73A49;">=/</span><span style="color:#24292E;">home</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">zk</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">zk_data</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">version</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">dataLogDir</span><span style="color:#D73A49;">=/</span><span style="color:#24292E;">home</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">zk</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">zk_log</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">version</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">ls </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">t $dataLogDir</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">log.</span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> tail </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">n </span><span style="color:#D73A49;">+</span><span style="color:#24292E;">$count </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> xargs rm </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">f </span></span>
<span class="line"><span style="color:#24292E;">ls </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">t $dataDir</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">snapshot.</span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> tail </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">n </span><span style="color:#D73A49;">+</span><span style="color:#24292E;">$count </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> xargs rm </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">f </span></span>
<span class="line"><span style="color:#24292E;">ls </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">t $logDir</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">zookeeper.log.</span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> tail </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">n </span><span style="color:#D73A49;">+</span><span style="color:#24292E;">$count </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> xargs rm </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">f  </span></span>
<span class="line"><span style="color:#24292E;">find </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">home</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">home</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">zk</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">zk_data</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">version</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">name </span><span style="color:#032F62;">&quot;snap*&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">mtime </span><span style="color:#D73A49;">+</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> xargs rm </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">f                              </span></span>
<span class="line"><span style="color:#24292E;">find </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">home</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">home</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">zk</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">zk_data</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">version</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">2</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">name </span><span style="color:#032F62;">&quot;snap*&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">mtime </span><span style="color:#D73A49;">+</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> xargs rm </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">f               </span></span>
<span class="line"><span style="color:#24292E;">find </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">home</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">home</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">zk</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">zk_data</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">logs</span><span style="color:#D73A49;">/</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">name </span><span style="color:#032F62;">&quot;zookeeper.log.*&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">mtime </span><span style="color:#D73A49;">+</span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> xargs rm </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">f</span></span></code></pre></div><h4 id="创建定时任务" tabindex="-1">创建定时任务 <a class="header-anchor" href="#创建定时任务" aria-label="Permalink to &quot;创建定时任务&quot;">​</a></h4><p>创建完定时脚本后，我们接下来就利用 corntab 来设置脚本的启动时间，如下面的代码所示。corntab 命令的语法比较简单，其中 -u 表示设定指定的用户，因为 Linux 系统是一个多用户操作系统，而 crontab 的本质就是根据使用系统的用户来设定程序执行的时间计划表。因此当命令的执行者具有管理员 root 账号的权限时，可以通过 -u 为特定用户设定某一个程序的具体执行时间。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">crontab [ </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">u user ] { </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">l </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">r </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">e }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">crontab [ </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">u user ] { </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">l </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">r </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">e }</span></span></code></pre></div><p>接下来我们打开系统的控制台，并输入 crontab -e 命令，开启定时任务的编辑功能。如下图所示，系统会显示出当前已有的定时任务列表。整个 crontab 界面的操作逻辑和 Vim 相同，为了新建一个定时任务，我们首先将光标移动到文件的最后一行，并敲击 i 键来开启编辑模式。</p>`,15),c=s('<p>这个 crontab 定时脚本由两部分组成，第一部分是定时时间，第二部分是要执行的脚本。如下代码所示，脚本的执行时间是按照 f1 分、 f2 小时、f3 日、f4 月、f5 一个星期中的第几天这种固定顺序格式编写的。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">f1 f2 f3 f4 f5 program</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">f1 f2 f3 f4 f5 program</span></span></code></pre></div><p>当对应的时间位上为 * 时，表示每间隔一段时间都要执行。例如，当 f1 分上设定的是 * 时，表示每分钟都要执行对应的脚本。而如果我们想在每天的特定时间执行对应的脚本，则可以通过在对应的时间位置设定一个时间段实现，以下代码所演示的就是将脚本清理时间设定为每天早上的 6 点到 8 点。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">6</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">8</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">usr</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">bin</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">logsCleanWeek.sh</span><span style="color:#F97583;">&gt;/</span><span style="color:#E1E4E8;">dev</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#F97583;">&gt;&amp;</span><span style="color:#79B8FF;">1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">0</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">6</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">8</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">usr</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">bin</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">logsCleanWeek.sh</span><span style="color:#D73A49;">&gt;/</span><span style="color:#24292E;">dev</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#D73A49;">&gt;&amp;</span><span style="color:#005CC5;">1</span></span></code></pre></div><h4 id="查看定时任务" tabindex="-1">查看定时任务 <a class="header-anchor" href="#查看定时任务" aria-label="Permalink to &quot;查看定时任务&quot;">​</a></h4><p>当我们设定完定时任务后，就可以打开控制台，并输入 crontab -l 命令查询系统当前的定时任务。</p>',6),y=s(`<p>到目前为止我们就完成了用 crontab 创建定时任务来自动清理和维护 ZooKeeper 服务产生的相关日志和数据的过程。</p><p>crontab 定时脚本的方式相对灵活，可以按照我们的业务需求来设置处理日志的维护方式，比如这里我们希望定期清除 ZooKeeper 服务运行的日志，而不想清除数据快照的文件，则可以通过脚本设置，达到只对数据日志文件进行清理的目的。</p><h3 id="purgetxnlog" tabindex="-1">PurgeTxnLog <a class="header-anchor" href="#purgetxnlog" aria-label="Permalink to &quot;PurgeTxnLog&quot;">​</a></h3><p>除了上面所介绍的，通过编写 crontab 脚本定时清理 ZooKeeper 服务的相关日志外， ZooKeeper 自身还提供了 PurgeTxnLog 工具类，用来清理 snapshot 数据快照文件和系统日志。</p><p>PurgeTxnLog 清理方式和我们上面介绍的方式十分相似，也是通过定时脚本执行任务，唯一的不同是，上面提到在编写日志清除 logsCleanWeek 的时候 ，我们使用的是原生 shell 脚本自己手动编写的数据日志清理逻辑，而使用 PurgeTxnLog 则可以在编写清除脚本的时候调用 ZooKeeper 为我们提供的工具类完成日志清理工作。</p><p>如下面的代码所示，首先，我们在 /usr/bin 目录下创建一个 PurgeLogsClean 脚本。注意这里的脚本也是一个 shell 文件。在脚本中我们只需要编写 PurgeTxnLog 类的调用程序，系统就会自动通过 PurgeTxnLog 工具类为我们完成对应日志文件的清理工作。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#!/bin/sh  </span></span>
<span class="line"><span style="color:#E1E4E8;">java </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">cp </span><span style="color:#9ECBFF;">&quot;$CLASSPATH&quot;</span><span style="color:#E1E4E8;"> org.apache.zookeeper.server.PurgeTxnLog </span></span>
<span class="line"><span style="color:#E1E4E8;">echo </span><span style="color:#9ECBFF;">&quot;清理完成&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#!/bin/sh  </span></span>
<span class="line"><span style="color:#24292E;">java </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">cp </span><span style="color:#032F62;">&quot;$CLASSPATH&quot;</span><span style="color:#24292E;"> org.apache.zookeeper.server.PurgeTxnLog </span></span>
<span class="line"><span style="color:#24292E;">echo </span><span style="color:#032F62;">&quot;清理完成&quot;</span></span></code></pre></div><p>PurgeTxnLog 方式与 crontab 相比，使用起来更加容易而且也更加稳定安全，不过 crontab 方式更加灵活，我们可以根据不同的业务需求编写自己的清理逻辑。</p><h3 id="结束" tabindex="-1">结束 <a class="header-anchor" href="#结束" aria-label="Permalink to &quot;结束&quot;">​</a></h3><p>本节课我们介绍了线上 ZooKeeper 服务日志和数据快照的清理和维护工作，可以通过 crontab 和 PurgeTxnLog 两种方式实现。这两种方式唯一的不同在清理日志脚本的实现方式上，crontab 是通过我们自己手动编写的 shell 脚本实现的，在执行上需要考虑脚本权限相关的问题，而 PurgeTxnLog 则是 ZooKeeper 提供的专门用来处理日志清除相关的工具类，使用起来更加容易，开发人员不用考虑底层的实现细节。这里希望你结合自身工作中的生产环境来选择一种适合自己的 ZooKeeper 数据维护方式。</p>`,10);function E(i,d,g,F,h,u){const a=p("Image");return l(),e("div",null,[r,o(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/3D/CD/CgqCHl8qlt2ALC7CAABlifm7LHs902.png"}),c,o(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/3D/CE/CgqCHl8qlu-AW-xZAAA50ErYH4s391.png"}),y])}const _=n(t,[["render",E]]);export{D as __pageData,_ as default};
