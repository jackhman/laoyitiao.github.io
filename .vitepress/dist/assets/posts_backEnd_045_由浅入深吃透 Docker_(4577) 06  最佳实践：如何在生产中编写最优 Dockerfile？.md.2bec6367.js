import{_ as s,o as a,g as n,Q as e}from"./chunks/framework.e0c66c3f.js";const m=JSON.parse('{"title":"Dockerfile 书写原则 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/045_由浅入深吃透 Docker/(4577) 06  最佳实践：如何在生产中编写最优 Dockerfile？.md","filePath":"posts/backEnd/045_由浅入深吃透 Docker/(4577) 06  最佳实践：如何在生产中编写最优 Dockerfile？.md","lastUpdated":1696338709000}'),l={name:"posts/backEnd/045_由浅入深吃透 Docker/(4577) 06  最佳实践：如何在生产中编写最优 Dockerfile？.md"},o=e(`<p>在介绍 Dockerfile 最佳实践前，这里再强调一下，<strong>生产实践中一定优先使用 Dockerfile 的方式构建镜像。</strong> 因为使用 Dockerfile 构建镜像可以带来很多好处：</p><ul><li><p>易于版本化管理，Dockerfile 本身是一个文本文件，方便存放在代码仓库做版本管理，可以很方便地找到各个版本之间的变更历史；</p></li><li><p>过程可追溯，Dockerfile 的每一行指令代表一个镜像层，根据 Dockerfile 的内容即可很明确地查看镜像的完整构建过程；</p></li><li><p>屏蔽构建环境异构，使用 Dockerfile 构建镜像无须考虑构建环境，基于相同 Dockerfile 无论在哪里运行，构建结果都一致。</p></li></ul><p>虽然有这么多好处，但是如果你 Dockerfile 使用不当也会引发很多问题。比如镜像构建时间过长，甚至镜像构建失败；镜像层数过多，导致镜像文件过大。所以，这一课时我就教你如何在生产环境中编写最优的 Dockerfile。</p><p>在介绍 Dockerfile 最佳实践前，我们再聊一下我们平时书写 Dockerfile 应该尽量遵循的原则。</p><h3 id="dockerfile-书写原则" tabindex="-1">Dockerfile 书写原则 <a class="header-anchor" href="#dockerfile-书写原则" aria-label="Permalink to &quot;Dockerfile 书写原则&quot;">​</a></h3><p>遵循以下 Dockerfile 书写原则，不仅可以使得我们的 Dockerfile 简洁明了，让协作者清楚地了解镜像的完整构建流程，还可以帮助我们减少镜像的体积，加快镜像构建的速度和分发速度。</p><h4 id="_1-单一职责" tabindex="-1">（1）单一职责 <a class="header-anchor" href="#_1-单一职责" aria-label="Permalink to &quot;（1）单一职责&quot;">​</a></h4><p>由于容器的本质是进程，一个容器代表一个进程，因此不同功能的应用应该尽量拆分为不同的容器，每个容器只负责单一业务进程。</p><h4 id="_2-提供注释信息" tabindex="-1">（2）提供注释信息 <a class="header-anchor" href="#_2-提供注释信息" aria-label="Permalink to &quot;（2）提供注释信息&quot;">​</a></h4><p>Dockerfile 也是一种代码，我们应该保持良好的代码编写习惯，晦涩难懂的代码尽量添加注释，让协作者可以一目了然地知道每一行代码的作用，并且方便扩展和使用。</p><h4 id="_3-保持容器最小化" tabindex="-1">（3）保持容器最小化 <a class="header-anchor" href="#_3-保持容器最小化" aria-label="Permalink to &quot;（3）保持容器最小化&quot;">​</a></h4><p>应该避免安装无用的软件包，比如在一个 nginx 镜像中，我并不需要安装 vim 、gcc 等开发编译工具。这样不仅可以加快容器构建速度，而且可以避免镜像体积过大。</p><h4 id="_4-合理选择基础镜像" tabindex="-1">（4）合理选择基础镜像 <a class="header-anchor" href="#_4-合理选择基础镜像" aria-label="Permalink to &quot;（4）合理选择基础镜像&quot;">​</a></h4><p>容器的核心是应用，因此只要基础镜像能够满足应用的运行环境即可。例如一个<code>Java</code>类型的应用运行时只需要<code>JRE</code>，并不需要<code>JDK</code>，因此我们的基础镜像只需要安装<code>JRE</code>环境即可。</p><h4 id="_5-使用-dockerignore-文件" tabindex="-1">（5）使用 .dockerignore 文件 <a class="header-anchor" href="#_5-使用-dockerignore-文件" aria-label="Permalink to &quot;（5）使用 .dockerignore 文件&quot;">​</a></h4><p>在使用<code>git</code>时，我们可以使用<code>.gitignore</code>文件忽略一些不需要做版本管理的文件。同理，使用<code>.dockerignore</code>文件允许我们在构建时，忽略一些不需要参与构建的文件，从而提升构建效率。<code>.dockerignore</code>的定义类似于<code>.gitignore</code>。</p><p><code>.dockerignore</code>的本质是文本文件，Docker 构建时可以使用换行符来解析文件定义，每一行可以忽略一些文件或者文件夹。具体使用方式如下：</p><table><thead><tr><th>规则</th><th>含义</th></tr></thead><tbody><tr><td>#</td><td># 开头的表示注释，# 后面所有内容将会被忽略</td></tr><tr><td><em>/tmp</em></td><td>匹配当前目录下任何以 tmp 开头的文件或者文件夹</td></tr><tr><td>*.md</td><td>匹配以 .md 为后缀的任意文件</td></tr><tr><td>tem?</td><td>匹配以 tem 开头并且以任意字符结尾的文件，？代表任意一个字符</td></tr><tr><td>!README.md</td><td>! 表示排除忽略。 例如 .dockerignore 定义如下： *.md !README.md 表示除了 README.md 文件外所有以 .md 结尾的文件。</td></tr></tbody></table><h4 id="_6-尽量使用构建缓存" tabindex="-1">（6）尽量使用构建缓存 <a class="header-anchor" href="#_6-尽量使用构建缓存" aria-label="Permalink to &quot;（6）尽量使用构建缓存&quot;">​</a></h4><p>Docker 构建过程中，每一条 Dockerfile 指令都会提交为一个镜像层，下一条指令都是基于上一条指令构建的。如果构建时发现要构建的镜像层的父镜像层已经存在，并且下一条命令使用了相同的指令，即可命中构建缓存。</p><p>Docker 构建时判断是否需要使用缓存的规则如下：</p><ul><li><p>从当前构建层开始，比较所有的子镜像，检查所有的构建指令是否与当前完全一致，如果不一致，则不使用缓存；</p></li><li><p>一般情况下，只需要比较构建指令即可判断是否需要使用缓存，但是有些指令除外（例如<code>ADD</code>和<code>COPY</code>）；</p></li><li><p>对于<code>ADD</code>和<code>COPY</code>指令不仅要校验命令是否一致，还要为即将拷贝到容器的文件计算校验和（根据文件内容计算出的一个数值，如果两个文件计算的数值一致，表示两个文件内容一致 ），命令和校验和完全一致，才认为命中缓存。</p></li></ul><p>因此，基于 Docker 构建时的缓存特性，我们可以把不轻易改变的指令放到 Dockerfile 前面（例如安装软件包），而可能经常发生改变的指令放在 Dockerfile 末尾（例如编译应用程序）。</p><p>例如，我们想要定义一些环境变量并且安装一些软件包，可以按照如下顺序编写 Dockerfile：</p><div class="language-dart vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">FROM</span><span style="color:#E1E4E8;"> centos</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">7</span></span>
<span class="line"><span style="color:#E1E4E8;"># 设置环境变量指令放前面</span></span>
<span class="line"><span style="color:#79B8FF;">ENV</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">PATH</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">usr</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">local</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">bin</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">$PATH</span></span>
<span class="line"><span style="color:#E1E4E8;"># 安装软件指令放前面</span></span>
<span class="line"><span style="color:#79B8FF;">RUN</span><span style="color:#E1E4E8;"> yum install </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">y make</span></span>
<span class="line"><span style="color:#E1E4E8;"># 把业务软件的配置,版本等经常变动的步骤放最后</span></span>
<span class="line"><span style="color:#E1E4E8;">...</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">FROM</span><span style="color:#24292E;"> centos</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">7</span></span>
<span class="line"><span style="color:#24292E;"># 设置环境变量指令放前面</span></span>
<span class="line"><span style="color:#005CC5;">ENV</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">PATH</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">usr</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">local</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">bin</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">$PATH</span></span>
<span class="line"><span style="color:#24292E;"># 安装软件指令放前面</span></span>
<span class="line"><span style="color:#005CC5;">RUN</span><span style="color:#24292E;"> yum install </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">y make</span></span>
<span class="line"><span style="color:#24292E;"># 把业务软件的配置,版本等经常变动的步骤放最后</span></span>
<span class="line"><span style="color:#24292E;">...</span></span></code></pre></div><p>按照上面原则编写的 Dockerfile 在构建镜像时，前面步骤命中缓存的概率会增加，可以大大缩短镜像构建时间。</p><h4 id="_7-正确设置时区" tabindex="-1">（7）正确设置时区 <a class="header-anchor" href="#_7-正确设置时区" aria-label="Permalink to &quot;（7）正确设置时区&quot;">​</a></h4><p>我们从 Docker Hub 拉取的官方操作系统镜像大多数都是 UTC 时间（世界标准时间）。如果你想要在容器中使用中国区标准时间（东八区），请根据使用的操作系统修改相应的时区信息，下面我介绍几种常用操作系统的修改方式：</p><ul><li><strong>Ubuntu 和Debian 系统</strong></li></ul><p>Ubuntu 和Debian 系统可以向 Dockerfile 中添加以下指令：</p><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">RUN</span><span style="color:#E1E4E8;"> ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime</span></span>
<span class="line"><span style="color:#F97583;">RUN</span><span style="color:#E1E4E8;"> echo </span><span style="color:#9ECBFF;">&quot;Asia/Shanghai&quot;</span><span style="color:#E1E4E8;"> &gt;&gt; /etc/timezone</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">RUN</span><span style="color:#24292E;"> ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime</span></span>
<span class="line"><span style="color:#D73A49;">RUN</span><span style="color:#24292E;"> echo </span><span style="color:#032F62;">&quot;Asia/Shanghai&quot;</span><span style="color:#24292E;"> &gt;&gt; /etc/timezone</span></span></code></pre></div><ul><li><strong>CentOS系统</strong></li></ul><p>CentOS 系统则向 Dockerfile 中添加以下指令：</p><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">RUN</span><span style="color:#E1E4E8;"> ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">RUN</span><span style="color:#24292E;"> ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime</span></span></code></pre></div><h4 id="_8-使用国内软件源加快镜像构建速度" tabindex="-1">（8）使用国内软件源加快镜像构建速度 <a class="header-anchor" href="#_8-使用国内软件源加快镜像构建速度" aria-label="Permalink to &quot;（8）使用国内软件源加快镜像构建速度&quot;">​</a></h4><p>由于我们常用的官方操作系统镜像基本都是国外的，软件服务器大部分也在国外，所以我们构建镜像的时候想要安装一些软件包可能会非常慢。</p><p>这里我以 CentOS 7 为例，介绍一下如何使用 163 软件源（国内有很多大厂，例如阿里、腾讯、网易等公司都免费提供的软件加速源）加快镜像构建。</p><p>首先在容器构建目录创建文件 CentOS7-Base-163.repo，文件内容如下：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># CentOS-Base.repo</span></span>
<span class="line"><span style="color:#6A737D;">#</span></span>
<span class="line"><span style="color:#6A737D;"># The mirror system uses the connecting IP address of the client and the</span></span>
<span class="line"><span style="color:#6A737D;"># update status of each mirror to pick mirrors that are updated to and</span></span>
<span class="line"><span style="color:#6A737D;"># geographically close to the client.  You should use this for CentOS updates</span></span>
<span class="line"><span style="color:#6A737D;"># unless you are manually picking other mirrors.</span></span>
<span class="line"><span style="color:#6A737D;">#</span></span>
<span class="line"><span style="color:#6A737D;"># If the mirrorlist= does not work for you, as a fall back you can try the </span></span>
<span class="line"><span style="color:#6A737D;"># remarked out baseurl= line instead.</span></span>
<span class="line"><span style="color:#6A737D;">#</span></span>
<span class="line"><span style="color:#6A737D;">#</span></span>
<span class="line"><span style="color:#E1E4E8;">[base]</span></span>
<span class="line"><span style="color:#E1E4E8;">name</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">CentOS-</span><span style="color:#E1E4E8;">$releasever </span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Base</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">163</span><span style="color:#9ECBFF;">.com</span></span>
<span class="line"><span style="color:#6A737D;">#mirrorlist=http://mirrorlist.centos.org/?release=$releasever&amp;arch=$basearch&amp;repo=os</span></span>
<span class="line"><span style="color:#E1E4E8;">baseurl</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">http://mirrors.163.com/centos/</span><span style="color:#E1E4E8;">$releasever</span><span style="color:#9ECBFF;">/os/</span><span style="color:#E1E4E8;">$basearch</span><span style="color:#9ECBFF;">/</span></span>
<span class="line"><span style="color:#E1E4E8;">gpgcheck</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">gpgkey</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">http://mirrors.163.com/centos/RPM-GPG-KEY-CentOS-7</span></span>
<span class="line"><span style="color:#6A737D;">#released updates</span></span>
<span class="line"><span style="color:#E1E4E8;">[updates]</span></span>
<span class="line"><span style="color:#E1E4E8;">name</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">CentOS-</span><span style="color:#E1E4E8;">$releasever </span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Updates</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">163</span><span style="color:#9ECBFF;">.com</span></span>
<span class="line"><span style="color:#6A737D;">#mirrorlist=http://mirrorlist.centos.org/?release=$releasever&amp;arch=$basearch&amp;repo=updates</span></span>
<span class="line"><span style="color:#E1E4E8;">baseurl</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">http://mirrors.163.com/centos/</span><span style="color:#E1E4E8;">$releasever</span><span style="color:#9ECBFF;">/updates/</span><span style="color:#E1E4E8;">$basearch</span><span style="color:#9ECBFF;">/</span></span>
<span class="line"><span style="color:#E1E4E8;">gpgcheck</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">gpgkey</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">http://mirrors.163.com/centos/RPM-GPG-KEY-CentOS-7</span></span>
<span class="line"><span style="color:#6A737D;">#additional packages that may be useful</span></span>
<span class="line"><span style="color:#E1E4E8;">[extras]</span></span>
<span class="line"><span style="color:#E1E4E8;">name</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">CentOS-</span><span style="color:#E1E4E8;">$releasever </span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Extras</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">163</span><span style="color:#9ECBFF;">.com</span></span>
<span class="line"><span style="color:#6A737D;">#mirrorlist=http://mirrorlist.centos.org/?release=$releasever&amp;arch=$basearch&amp;repo=extras</span></span>
<span class="line"><span style="color:#E1E4E8;">baseurl</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">http://mirrors.163.com/centos/</span><span style="color:#E1E4E8;">$releasever</span><span style="color:#9ECBFF;">/extras/</span><span style="color:#E1E4E8;">$basearch</span><span style="color:#9ECBFF;">/</span></span>
<span class="line"><span style="color:#E1E4E8;">gpgcheck</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">gpgkey</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">http://mirrors.163.com/centos/RPM-GPG-KEY-CentOS-7</span></span>
<span class="line"><span style="color:#6A737D;">#additional packages that extend functionality of existing packages</span></span>
<span class="line"><span style="color:#E1E4E8;">[centosplus]</span></span>
<span class="line"><span style="color:#E1E4E8;">name</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">CentOS-</span><span style="color:#E1E4E8;">$releasever </span><span style="color:#B392F0;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Plus</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">163</span><span style="color:#9ECBFF;">.com</span></span>
<span class="line"><span style="color:#E1E4E8;">baseurl</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">http://mirrors.163.com/centos/</span><span style="color:#E1E4E8;">$releasever</span><span style="color:#9ECBFF;">/centosplus/</span><span style="color:#E1E4E8;">$basearch</span><span style="color:#9ECBFF;">/</span></span>
<span class="line"><span style="color:#E1E4E8;">gpgcheck</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">enabled</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">gpgkey</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">http://mirrors.163.com/centos/RPM-GPG-KEY-CentOS-7</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># CentOS-Base.repo</span></span>
<span class="line"><span style="color:#6A737D;">#</span></span>
<span class="line"><span style="color:#6A737D;"># The mirror system uses the connecting IP address of the client and the</span></span>
<span class="line"><span style="color:#6A737D;"># update status of each mirror to pick mirrors that are updated to and</span></span>
<span class="line"><span style="color:#6A737D;"># geographically close to the client.  You should use this for CentOS updates</span></span>
<span class="line"><span style="color:#6A737D;"># unless you are manually picking other mirrors.</span></span>
<span class="line"><span style="color:#6A737D;">#</span></span>
<span class="line"><span style="color:#6A737D;"># If the mirrorlist= does not work for you, as a fall back you can try the </span></span>
<span class="line"><span style="color:#6A737D;"># remarked out baseurl= line instead.</span></span>
<span class="line"><span style="color:#6A737D;">#</span></span>
<span class="line"><span style="color:#6A737D;">#</span></span>
<span class="line"><span style="color:#24292E;">[base]</span></span>
<span class="line"><span style="color:#24292E;">name</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">CentOS-</span><span style="color:#24292E;">$releasever </span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Base</span><span style="color:#24292E;"> </span><span style="color:#032F62;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">163</span><span style="color:#032F62;">.com</span></span>
<span class="line"><span style="color:#6A737D;">#mirrorlist=http://mirrorlist.centos.org/?release=$releasever&amp;arch=$basearch&amp;repo=os</span></span>
<span class="line"><span style="color:#24292E;">baseurl</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">http://mirrors.163.com/centos/</span><span style="color:#24292E;">$releasever</span><span style="color:#032F62;">/os/</span><span style="color:#24292E;">$basearch</span><span style="color:#032F62;">/</span></span>
<span class="line"><span style="color:#24292E;">gpgcheck</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">gpgkey</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">http://mirrors.163.com/centos/RPM-GPG-KEY-CentOS-7</span></span>
<span class="line"><span style="color:#6A737D;">#released updates</span></span>
<span class="line"><span style="color:#24292E;">[updates]</span></span>
<span class="line"><span style="color:#24292E;">name</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">CentOS-</span><span style="color:#24292E;">$releasever </span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Updates</span><span style="color:#24292E;"> </span><span style="color:#032F62;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">163</span><span style="color:#032F62;">.com</span></span>
<span class="line"><span style="color:#6A737D;">#mirrorlist=http://mirrorlist.centos.org/?release=$releasever&amp;arch=$basearch&amp;repo=updates</span></span>
<span class="line"><span style="color:#24292E;">baseurl</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">http://mirrors.163.com/centos/</span><span style="color:#24292E;">$releasever</span><span style="color:#032F62;">/updates/</span><span style="color:#24292E;">$basearch</span><span style="color:#032F62;">/</span></span>
<span class="line"><span style="color:#24292E;">gpgcheck</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">gpgkey</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">http://mirrors.163.com/centos/RPM-GPG-KEY-CentOS-7</span></span>
<span class="line"><span style="color:#6A737D;">#additional packages that may be useful</span></span>
<span class="line"><span style="color:#24292E;">[extras]</span></span>
<span class="line"><span style="color:#24292E;">name</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">CentOS-</span><span style="color:#24292E;">$releasever </span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Extras</span><span style="color:#24292E;"> </span><span style="color:#032F62;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">163</span><span style="color:#032F62;">.com</span></span>
<span class="line"><span style="color:#6A737D;">#mirrorlist=http://mirrorlist.centos.org/?release=$releasever&amp;arch=$basearch&amp;repo=extras</span></span>
<span class="line"><span style="color:#24292E;">baseurl</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">http://mirrors.163.com/centos/</span><span style="color:#24292E;">$releasever</span><span style="color:#032F62;">/extras/</span><span style="color:#24292E;">$basearch</span><span style="color:#032F62;">/</span></span>
<span class="line"><span style="color:#24292E;">gpgcheck</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">gpgkey</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">http://mirrors.163.com/centos/RPM-GPG-KEY-CentOS-7</span></span>
<span class="line"><span style="color:#6A737D;">#additional packages that extend functionality of existing packages</span></span>
<span class="line"><span style="color:#24292E;">[centosplus]</span></span>
<span class="line"><span style="color:#24292E;">name</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">CentOS-</span><span style="color:#24292E;">$releasever </span><span style="color:#6F42C1;">-</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Plus</span><span style="color:#24292E;"> </span><span style="color:#032F62;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">163</span><span style="color:#032F62;">.com</span></span>
<span class="line"><span style="color:#24292E;">baseurl</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">http://mirrors.163.com/centos/</span><span style="color:#24292E;">$releasever</span><span style="color:#032F62;">/centosplus/</span><span style="color:#24292E;">$basearch</span><span style="color:#032F62;">/</span></span>
<span class="line"><span style="color:#24292E;">gpgcheck</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">enabled</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">gpgkey</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">http://mirrors.163.com/centos/RPM-GPG-KEY-CentOS-7</span></span></code></pre></div><p>然后在 Dockerfile 中添加如下指令：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">COPY CentOS7</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">Base</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">163.repo </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">etc</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">yum.repos.d</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">CentOS7</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">Base.repo</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">COPY CentOS7</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">Base</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">163.repo </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">etc</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">yum.repos.d</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">CentOS7</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">Base.repo</span></span></code></pre></div><p>执行完上述步骤后，再使用<code>yum install</code>命令安装软件时就会默认从 163 获取软件包，这样可以大大提升构建速度。</p><h4 id="_9-最小化镜像层数" tabindex="-1">（9）最小化镜像层数 <a class="header-anchor" href="#_9-最小化镜像层数" aria-label="Permalink to &quot;（9）最小化镜像层数&quot;">​</a></h4><p>在构建镜像时尽可能地减少 Dockerfile 指令行数。例如我们要在 CentOS 系统中安装<code>make</code>和<code>net-tools</code>两个软件包，应该在 Dockerfile 中使用以下指令：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">RUN yum install </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">y make net</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">tools</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">RUN yum install </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">y make net</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">tools</span></span></code></pre></div><p>而不应该写成这样：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">RUN yum install </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">y make</span></span>
<span class="line"><span style="color:#E1E4E8;">RUN yum install </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">y net</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">tools</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">RUN yum install </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">y make</span></span>
<span class="line"><span style="color:#24292E;">RUN yum install </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">y net</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">tools</span></span></code></pre></div><p>了解完 Dockerfile 的书写原则后，我们再来具体了解下这些原则落实到具体的 Dockerfile 指令应该如何书写。</p><h3 id="dockerfile-指令书写建议" tabindex="-1">Dockerfile 指令书写建议 <a class="header-anchor" href="#dockerfile-指令书写建议" aria-label="Permalink to &quot;Dockerfile 指令书写建议&quot;">​</a></h3><p>下面是我们常用的一些指令，这些指令对于刚接触 Docker 的人来说会非常容易出错，下面我对这些指令的书写建议详细讲解一下。</p><h4 id="_1-run" tabindex="-1">（1）RUN <a class="header-anchor" href="#_1-run" aria-label="Permalink to &quot;（1）RUN&quot;">​</a></h4><p><code>RUN</code>指令在构建时将会生成一个新的镜像层并且执行<code>RUN</code>指令后面的内容。</p><p>使用<code>RUN</code>指令时应该尽量遵循以下原则：</p><ul><li><p>当<code>RUN</code>指令后面跟的内容比较复杂时，建议使用反斜杠（\\） 结尾并且换行；</p></li><li><p><code>RUN</code>指令后面的内容尽量按照字母顺序排序，提高可读性。</p></li></ul><p>例如，我想在官方的 CentOS 镜像下安装一些软件，一个建议的 Dockerfile 指令如下：</p><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;"> centos:7</span></span>
<span class="line"><span style="color:#F97583;">RUN</span><span style="color:#E1E4E8;"> yum install -y automake \\</span></span>
<span class="line"><span style="color:#E1E4E8;">                   curl \\</span></span>
<span class="line"><span style="color:#E1E4E8;">                   python \\</span></span>
<span class="line"><span style="color:#E1E4E8;">                   vim</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> centos:7</span></span>
<span class="line"><span style="color:#D73A49;">RUN</span><span style="color:#24292E;"> yum install -y automake \\</span></span>
<span class="line"><span style="color:#24292E;">                   curl \\</span></span>
<span class="line"><span style="color:#24292E;">                   python \\</span></span>
<span class="line"><span style="color:#24292E;">                   vim</span></span></code></pre></div><h4 id="_2-cmd-和-entrypoint" tabindex="-1">（2）CMD 和 ENTRYPOINT <a class="header-anchor" href="#_2-cmd-和-entrypoint" aria-label="Permalink to &quot;（2）CMD 和 ENTRYPOINT&quot;">​</a></h4><p><code>CMD</code>和<code>ENTRYPOINT</code>指令都是容器运行的命令入口，这两个指令使用中有很多相似的地方，但是也有一些区别。</p><p>这两个指令的相同之处，<code>CMD</code>和<code>ENTRYPOINT</code>的基本使用格式分为两种。</p><ul><li><p>第一种为<code>CMD</code>/<code>ENTRYPOINT</code>[&quot;command&quot; , &quot;param&quot;]。这种格式是使用 Linux 的<code>exec</code>实现的， 一般称为<code>exec</code>模式，这种书写格式为<code>CMD</code>/<code>ENTRYPOINT</code>后面跟 json 数组，也是Docker 推荐的使用格式。</p></li><li><p>另外一种格式为<code>CMD</code>/<code>ENTRYPOINT</code>command param ，这种格式是基于 shell 实现的， 通常称为<code>shell</code>模式。当使用<code>shell</code>模式时，Docker 会以 /bin/sh -c command 的方式执行命令。</p></li></ul><blockquote><p>使用 exec 模式启动容器时，容器的 1 号进程就是 CMD/ENTRYPOINT 中指定的命令，而使用 shell 模式启动容器时相当于我们把启动命令放在了 shell 进程中执行，等效于执行 /bin/sh -c &quot;task command&quot; 命令。因此 shell 模式启动的进程在容器中实际上并不是 1 号进程。</p></blockquote><p>这两个指令的区别：</p><ul><li><p>Dockerfile 中如果使用了<code>ENTRYPOINT</code>指令，启动 Docker 容器时需要使用 --entrypoint 参数才能覆盖 Dockerfile 中的<code>ENTRYPOINT</code>指令 ，而使用<code>CMD</code>设置的命令则可以被<code>docker run</code>后面的参数直接覆盖。</p></li><li><p><code>ENTRYPOINT</code>指令可以结合<code>CMD</code>指令使用，也可以单独使用，而<code>CMD</code>指令只能单独使用。</p></li></ul><p>看到这里你也许会问，我什么时候应该使用<code>ENTRYPOINT</code>,什么时候使用<code>CMD</code>呢？</p><p>如果你希望你的镜像足够灵活，推荐使用<code>CMD</code>指令。如果你的镜像只执行单一的具体程序，并且不希望用户在执行<code>docker run</code>时覆盖默认程序，建议使用<code>ENTRYPOINT</code>。</p><p>最后再强调一下，无论使用<code>CMD</code>还是<code>ENTRYPOINT</code>，都尽量使用<code>exec</code>模式。</p><h4 id="_3-add-和-copy" tabindex="-1">（3）ADD 和 COPY <a class="header-anchor" href="#_3-add-和-copy" aria-label="Permalink to &quot;（3）ADD 和 COPY&quot;">​</a></h4><p><code>ADD</code>和<code>COPY</code>指令功能类似，都是从外部往容器内添加文件。但是<code>COPY</code>指令只支持基本的文件和文件夹拷贝功能，<code>ADD</code>则支持更多文件来源类型，比如自动提取 tar 包，并且可以支持源文件为 URL 格式。</p><p>那么在日常应用中，我们应该使用哪个命令向容器里添加文件呢？你可能在想，既然<code>ADD</code>指令支持的功能更多，当然应该使用<code>ADD</code>指令了。然而事实恰恰相反，我更推荐你使用<code>COPY</code>指令，因为<code>COPY</code>指令更加透明，仅支持本地文件向容器拷贝，而且使用<code>COPY</code>指令可以更好地利用构建缓存，有效减小镜像体积。</p><p>当你想要使用<code>ADD</code>向容器中添加 URL 文件时，请尽量考虑使用其他方式替代。例如你想要在容器中安装 memtester（一种内存压测工具），你应该避免使用以下格式：</p><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">ADD</span><span style="color:#E1E4E8;"> http://pyropus.ca/software/memtester/old-versions/memtester-4.3.0.tar.gz /tmp/</span></span>
<span class="line"><span style="color:#F97583;">RUN</span><span style="color:#E1E4E8;"> tar -xvf /tmp/memtester-4.3.0.tar.gz -C /tmp</span></span>
<span class="line"><span style="color:#F97583;">RUN</span><span style="color:#E1E4E8;"> make -C /tmp/memtester-4.3.0 &amp;&amp; make -C /tmp/memtester-4.3.0 install</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">ADD</span><span style="color:#24292E;"> http://pyropus.ca/software/memtester/old-versions/memtester-4.3.0.tar.gz /tmp/</span></span>
<span class="line"><span style="color:#D73A49;">RUN</span><span style="color:#24292E;"> tar -xvf /tmp/memtester-4.3.0.tar.gz -C /tmp</span></span>
<span class="line"><span style="color:#D73A49;">RUN</span><span style="color:#24292E;"> make -C /tmp/memtester-4.3.0 &amp;&amp; make -C /tmp/memtester-4.3.0 install</span></span></code></pre></div><p>下面是推荐写法：</p><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">RUN</span><span style="color:#E1E4E8;"> wget -O /tmp/memtester-4.3.0.tar.gz http://pyropus.ca/software/memtester/old-versions/memtester-4.3.0.tar.gz \\</span></span>
<span class="line"><span style="color:#E1E4E8;">&amp;&amp; tar -xvf /tmp/memtester-4.3.0.tar.gz -C /tmp \\</span></span>
<span class="line"><span style="color:#E1E4E8;">&amp;&amp; make -C /tmp/memtester-4.3.0 &amp;&amp; make -C /tmp/memtester-4.3.0 install</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">RUN</span><span style="color:#24292E;"> wget -O /tmp/memtester-4.3.0.tar.gz http://pyropus.ca/software/memtester/old-versions/memtester-4.3.0.tar.gz \\</span></span>
<span class="line"><span style="color:#24292E;">&amp;&amp; tar -xvf /tmp/memtester-4.3.0.tar.gz -C /tmp \\</span></span>
<span class="line"><span style="color:#24292E;">&amp;&amp; make -C /tmp/memtester-4.3.0 &amp;&amp; make -C /tmp/memtester-4.3.0 install</span></span></code></pre></div><h4 id="_4-workdir" tabindex="-1">（4）WORKDIR <a class="header-anchor" href="#_4-workdir" aria-label="Permalink to &quot;（4）WORKDIR&quot;">​</a></h4><p>为了使构建过程更加清晰明了，推荐使用 WORKDIR 来指定容器的工作路径，应该尽量避免使用 RUN cd /work/path &amp;&amp; do some work 这样的指令。</p><p>最后给出几个常用软件的官方 Dockerfile 示例链接，希望可以对你有所帮助。</p><ul><li><p><a href="https://github.com/docker-library/golang/blob/4d68c4dd8b51f83ce4fdce0f62484fdc1315bfa8/1.15/buster/Dockerfile" target="_blank" rel="noreferrer">Go</a></p></li><li><p><a href="https://github.com/nginxinc/docker-nginx/blob/9774b522d4661effea57a1fbf64c883e699ac3ec/mainline/buster/Dockerfile" target="_blank" rel="noreferrer">Nginx</a></p></li><li><p><a href="https://github.com/hylang/docker-hylang/blob/f9c873b7f71f466e5af5ea666ed0f8f42835c688/dockerfiles-generated/Dockerfile.python3.8-buster" target="_blank" rel="noreferrer">Hy</a></p></li></ul><h3 id="结语" tabindex="-1">结语 <a class="header-anchor" href="#结语" aria-label="Permalink to &quot;结语&quot;">​</a></h3><p>好了，到此为止，相信你已经对 Dockerfile 的书写原则和一些重要指令有了较深的认识。</p><p>当你需要编写编译型语言（例如 Golang、Java）的 Dockerfile 时，如何分离编译环境和运行环境，使得镜像体积尽可能小呢？思考后，可以把你的想法写在留言区。</p>`,80),p=[o];function c(t,r,i,y,d,E){return a(),n("div",null,p)}const u=s(l,[["render",c]]);export{m as __pageData,u as default};
