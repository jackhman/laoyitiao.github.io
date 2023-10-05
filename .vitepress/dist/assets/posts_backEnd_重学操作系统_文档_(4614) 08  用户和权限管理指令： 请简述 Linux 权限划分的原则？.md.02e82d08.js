import{_ as n,j as l,o as c,g as t,k as a,Q as e,s as o,h as p}from"./chunks/framework.4e7d56ce.js";const S=JSON.parse('{"title":"权限抽象 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/重学操作系统_文档/(4614) 08  用户和权限管理指令： 请简述 Linux 权限划分的原则？.md","filePath":"posts/backEnd/重学操作系统_文档/(4614) 08  用户和权限管理指令： 请简述 Linux 权限划分的原则？.md","lastUpdated":1696417798000}'),d={name:"posts/backEnd/重学操作系统_文档/(4614) 08  用户和权限管理指令： 请简述 Linux 权限划分的原则？.md"},r=e('<p><strong>我看到过这样一道面试题：请简述 Linux 权限划分的原则</strong>？</p><p>这种类型的面试题也是我比较喜欢的一种题目，因为它考察的不仅是一个具体的指令，还考察了候选人技术层面的认知。</p><p>如果你对 Linux 权限有较深的认知和理解，那么完全可以通过查资料去完成具体指令的执行。更重要的是，认知清晰的程序员可以把 Linux 权限管理的知识迁移到其他的系统设计中。而且我认为，能够对某个技术形成认知的人， 同样也会热爱思考，善于总结，这样的程序员是所有团队梦寐以求的。</p><p>因此，这次我们就把这道面试题作为引子，开启今天的学习。</p><h3 id="权限抽象" tabindex="-1">权限抽象 <a class="header-anchor" href="#权限抽象" aria-label="Permalink to &quot;权限抽象&quot;">​</a></h3><p>一个完整的权限管理体系，要有合理的抽象。这里就包括对用户、进程、文件、内存、系统调用等抽象。下面我将带你一一了解。</p><p><strong>首先，我们先来说说用户和组</strong>。Linux 是一个多用户平台，允许多个用户同时登录系统工作。Linux 将用户抽象成了账户，账户可以登录系统，比如通过输入登录名 + 密码的方式登录；也可以通过证书的方式登录。</p><p>但为了方便分配每个用户的权限，Linux 还支持组 <strong>（Group）账户</strong>。组账户是多个账户的集合，组可以为成员们分配某一类权限。每个用户可以在多个组，这样就可以利用组给用户快速分配权限。</p><p>组的概念有点像微信群。一个用户可以在多个群中。比如某个组中分配了 10 个目录的权限，那么新建用户的时候可以将这个用户增加到这个组中，这样新增的用户就不必再去一个个目录分配权限。</p><p>而每一个微信群都有一个群主，<strong>Root 账户也叫作超级管理员</strong>，就相当于微信群主，它对系统有着完全的掌控。一个超级管理员可以使用系统提供的全部能力。</p><p>此外，Linux 还对<strong>文件</strong> 进行了权限抽象（<strong>注意目录也是一种文件</strong>）。Linux 中一个文件可以设置下面 3 种权限：</p><ol><li><p>读权限（r）：控制读取文件。</p></li><li><p>写权限（w）：控制写入文件。</p></li><li><p>执行权限（x）：控制将文件执行，比如脚本、应用程序等。</p></li></ol>',12),i=o("p",null,"然后每个文件又可以从 3 个维度去配置上述的 3 种权限：",-1),h=o("ol",null,[o("li",null,[o("p",null,"用户维度。每个文件可以所属 1 个用户，用户维度配置的 rwx 在用户维度生效；")]),o("li",null,[o("p",null,"组维度。每个文件可以所属 1 个分组，组维度配置的 rwx 在组维度生效；")]),o("li",null,[o("p",null,"全部用户维度。设置对所有用户的权限。")])],-1),g=e('<p>因此 Linux 中文件的权限可以用 9 个字符，3 组<code>rwx</code>描述：第一组是用户权限，第二组是组权限，第三组是所有用户的权限。然后用<code>-</code>代表没有权限。比如<code>rwxrwxrwx</code>代表所有维度可以读写执行。<code>rw--wxr-x</code>代表用户维度不可以执行，组维度不可以读取，所有用户维度不可以写入。</p><p>通常情况下，如果用<code>ls -l</code>查看一个文件的权限，会有 10 个字符，这是因为第一个字符代表的是文件类型。我们在 06 课时讲解&quot;几种常见的文件类型&quot;时提到过，有管道文件、目录文件、链接文件等等。<code>-</code>代表普通文件、<code>d</code>代表目录、<code>p</code>代表管道。</p><p><strong>学习了这套机制之后，请你跟着我的节奏一起思考以下 4 个问题</strong>。</p><ol><li><p>文件被创建后，初始的权限如何设置？</p></li><li><p>需要全部用户都可以执行的指令，比如<code>ls</code>，它们的权限如何分配？</p></li><li><p>给一个文本文件分配了可执行权限会怎么样？</p></li><li><p>可不可以多个用户都登录<code>root</code>，然后只用<code>root</code>账户？</p></li></ol><p>你可以把以上 4 个问题作为本课时的小测验，把你的思考或者答案写在留言区，然后再来看我接下来的分析。</p><p><strong>问题一：初始权限问题</strong></p><p>一个文件创建后，文件的所属用户会被设置成创建文件的用户。谁创建谁拥有，这个逻辑很顺理成章。但是文件的组又是如何分配的呢？</p><p>这里 Linux 想到了一个很好的办法，就是为每个用户创建一个同名分组。</p><p>比如说<code>zhang</code>这个账户创建时，会创建一个叫作<code>zhang</code>的分组。<code>zhang</code>登录之后，工作分组就会默认使用它的同名分组<code>zhang</code>。如果<code>zhang</code>想要切换工作分组，可以使用<code>newgrp</code>指令切换到另一个工作分组。因此，被创建文件所属的分组是当时用户所在的工作分组，如果没有特别设置，那么就属于用户所在的同名分组。</p><p>再说下文件的权限如何？文件被创建后的权限通常是：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">rw</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">rw</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">r</span><span style="color:#F97583;">--</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">rw</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">rw</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">r</span><span style="color:#D73A49;">--</span></span></code></pre></div><p>也就是用户、组维度不可以执行，所有用户可读。</p><p><strong>问题二：公共执行文件的权限</strong></p><p>前面提到过可以用<code>which</code>指令查看<code>ls</code>指令所在的目录，我们发现在<code>/usr/bin</code>中。然后用<code>ls -l</code>查看<code>ls</code>的权限，可以看到下图所示：</p>',14),u=e("<ul><li><p>第一个<code>-</code>代表这是一个普通文件，后面的 rwx 代表用户维度可读写和执行；</p></li><li><p>第二个<code>r-x</code>代表组维度不可读写；</p></li><li><p>第三个<code>r-x</code>代表所有用户可以读和执行；</p></li><li><p>后两个<code>root</code>，第一个代表所属用户，第二个代表所属分组。</p></li></ul><p>到这里你可能会有一个疑问：如果一个文件设置为不可读，但是可以执行，那么结果会怎样？</p><p>答案当然是不可以执行，无法读取文件内容自然不可以执行。</p><p><strong>问题三：执行文件</strong></p><p>在 Linux 中，如果一个文件可以被执行，则可以直接通过输入文件路径（相对路径或绝对路径）的方式执行。如果想执行一个不可以执行的文件，Linux 则会报错。</p><p>当用户输入一个文件名，如果没有指定完整路径，Linux 就会在一部分目录中查找这个文件。你可以通过<code>echo $PATH</code>看到 Linux 会在哪些目录中查找可执行文件，<code>PATH</code>是 Linux 的环境变量，关于环境变量，我将在 &quot;12 | 高级技巧之集群部署中&quot;和你详细讨论。</p>",6),_=e('<p><strong>问题四：可不可以都 root</strong></p><p>最后一个问题是，可不可以都<code>root</code>？</p><p>答案当然是不行！这里先给你留个悬念，具体原因我们会在本课时最后来讨论。</p><p><strong>到这里，用户和组相关权限就介绍完了。接下来说说内核和系统调用权限。</strong> 内核是操作系统连接硬件、提供最核心能力的程序。今天我们先简单了解一下，关于内核的详细知识，会在&quot;14 |用户态和内核态：用户态线程和内核态线程有什么区别？&quot;中介绍。</p><p>内核提供操作硬件、磁盘、内存分页、进程等最核心的能力，并拥有直接操作全部内存的权限，因此内核不能把自己的全部能力都提供给用户，而且也不能允许用户通过<code>shell</code>指令进行系统调用。Linux 下内核把部分进程需要的系统调用以 C 语言 API 的形式提供出来。部分系统调用会有权限检查，比如说设置系统时间的系统调用。</p><p>以上我们看到了 Linux 对系统权限的抽象。接下来我们再说说权限架构的思想。</p><h3 id="权限架构思想" tabindex="-1">权限架构思想 <a class="header-anchor" href="#权限架构思想" aria-label="Permalink to &quot;权限架构思想&quot;">​</a></h3><p>优秀的权限架构主要目标是让系统安全、稳定且用户、程序之间相互制约、相互隔离。这要求权限系统中的权限划分足够清晰，分配权限的成本足够低。</p><p>因此，优秀的架构，应该遵循最小权限原则（Least Privilege）。权限设计需要保证系统的安全和稳定。比如：每一个成员拥有的权限应该足够的小，每一段特权程序执行的过程应该足够的短。对于安全级别较高的时候，还需要成员权限互相牵制。比如金融领域通常登录线上数据库需要两次登录，也就是需要两个密码，分别掌握在两个角色手中。这样即便一个成员出了问题，也可以保证整个系统安全。</p><p>同样的，每个程序也应该减少权限，比如说只拥有少量的目录读写权限，只可以进行少量的系统调用。</p><h4 id="权限划分" tabindex="-1">权限划分 <a class="header-anchor" href="#权限划分" aria-label="Permalink to &quot;权限划分&quot;">​</a></h4><p>此外，权限架构思想还应遵循一个原则，权限划分边界应该足够清晰，尽量做到相互隔离。Linux 提供了用户和分组。当然 Linux 没有强迫你如何划分权限，这是为了应对更多的场景。通常我们服务器上重要的应用，会由不同的账户执行。比如说 Nginx、Web 服务器、数据库不会执行在一个账户下。现在随着容器化技术的发展，我们甚至希望每个应用独享一个虚拟的空间，就好像运行在一个单独的操作系统中一样，让它们互相不用干扰。</p><p><strong>到这里，你可能会问：为什么不用 root 账户执行程序？</strong> 下面我们就来说说 root 的危害。</p><p>举个例子，你有一个 MySQL 进程执行在 root（最大权限）账户上，如果有黑客攻破了你的 MySQL 服务，获得了在 MySQL 上执行 SQL 的权限，那么，你的整个系统就都暴露在黑客眼前了。这会导致非常严重的后果。</p><p>黑客可以利用 MySQL 的 Copy From Prgram 指令为所欲为，比如先备份你的关键文件，然后再删除他们，并要挟你通过指定账户打款。如果执行最小权限原则，那么黑客即便攻破我们的 MySQL 服务，他也只能获得最小的权限。当然，黑客拿到 MySQL 权限也是非常可怕的，但是相比拿到所有权限，这个损失就小多了。</p><h4 id="分级保护" tabindex="-1">分级保护 <a class="header-anchor" href="#分级保护" aria-label="Permalink to &quot;分级保护&quot;">​</a></h4><p>因为内核可以直接操作内存和 CPU，因此非常危险。驱动程序可以直接控制摄像头、显示屏等核心设备，也需要采取安全措施，比如防止恶意应用开启摄像头盗用隐私。通常操作系统都采取一种环状的保护模式。</p>',17),y=e('<p>如上图所示，内核在最里面，也就是 Ring 0。 应用在最外面也就是 Ring 3。驱动在中间，也就是 Ring 1 和 Ring 2。对于相邻的两个 Ring，内层 Ring 会拥有较高的权限，可以改变外层的 Ring；而外层的 Ring 想要使用内层 Ring 的资源时，会有专门的程序（或者硬件）进行保护。</p><p>比如说一个 Ring3 的应用需要使用内核，就需要发送一个系统调用给内核。这个系统调用会由内核进行验证，比如验证用户有没有足够的权限，以及这个行为是否安全等等。</p><p><strong>权限包围（Privilege Bracking）</strong></p><p>之前我们讨论过，当 MySQL 跑在 root 权限时，如果 MySQLl 被攻破，整个机器就被攻破了。因此我们所有应用都不要跑在 root 上。如果所有应用都跑在普通账户下，那么就会有临时提升权限的场景。比如说安装程序可能需要临时拥有管理员权限，将应用装到<code>/usr/bin</code>目录下。</p><p>Linux 提供了权限包围的能力。比如一个应用，临时需要高级权限，可以利用交互界面（比如让用户输入 root 账户密码）验证身份，然后执行需要高级权限的操作，然后马上恢复到普通权限工作。这样做可以减少应用在高级权限的时间，并做到专权专用，防止被恶意程序利用。</p><h3 id="用户分组指令" tabindex="-1">用户分组指令 <a class="header-anchor" href="#用户分组指令" aria-label="Permalink to &quot;用户分组指令&quot;">​</a></h3><p>上面我们讨论了 Linux 权限的架构，接下来我们学习一些具体的指令。</p><h4 id="查看" tabindex="-1">查看 <a class="header-anchor" href="#查看" aria-label="Permalink to &quot;查看&quot;">​</a></h4><p>如果想查看当前用户的分组可以使用<code>groups</code>指令。</p>',9),m=e("<p>上面指令列出当前用户的所有分组。第一个是同名的主要分组，后面从<code>adm</code>开始是次级分组。</p><p>我先给你介绍两个分组，其他分组你可以去查资料：</p><ul><li><p>adm 分组用于系统监控，比如<code>/var/log</code>中的部分日志就是 adm 分组。</p></li><li><p>sudo 分组用户可以通过 sudo 指令提升权限。</p></li></ul><p>如果想查看当前用户，可以使用<code>id</code>指令，如下所示：</p>",4),E=o("ul",null,[o("li",null,[o("p",null,"uid 是用户 id；")]),o("li",null,[o("p",null,"gid 是组 id；")]),o("li",null,[o("p",null,"groups 后面是每个分组和分组的 id。")])],-1),x=o("p",null,[p("如果想查看所有的用户，可以直接看"),o("code",null,"/etc/passwd"),p("。")],-1),b=o("p",null,[o("code",null,"/etc/passwd"),p("这个文件存储了所有的用户信息，如下图所示：")],-1),A=e(`<h4 id="创建用户" tabindex="-1">创建用户 <a class="header-anchor" href="#创建用户" aria-label="Permalink to &quot;创建用户&quot;">​</a></h4><p>创建用户用<code>useradd</code>指令。</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">sudo useradd foo</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">sudo useradd foo</span></span></code></pre></div><p>sudo 原意是 superuser do，后来演变成用另一个用户的身份去执行某个指令。如果没有指定需要 sudo 的用户，就可以像上面那样，以超级管理员的身份。因为 useradd 需要管理员身份。这句话执行后，会进行权限提升，并弹出输入管理员密码的输入界面。</p><h4 id="创建分组" tabindex="-1"><strong>创建分组</strong> <a class="header-anchor" href="#创建分组" aria-label="Permalink to &quot;**创建分组**&quot;">​</a></h4><p>创建分组用<code>groupadd</code>指令。下面指令创建一个叫作<code>hello</code>的分组。</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">sudo groupadd hello</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">sudo groupadd hello</span></span></code></pre></div><h4 id="为用户增加次级分组" tabindex="-1">为用户增加次级分组 <a class="header-anchor" href="#为用户增加次级分组" aria-label="Permalink to &quot;为用户增加次级分组&quot;">​</a></h4><p>组分成主要分组（Primary Group）和次级分组（Secondary Group）。主要分组只有 1 个，次级分组可以有多个。如果想为用户添加一个次级分组，可以用<code>usermod</code>指令。下面指令将用户<code>foo</code>添加到<code>sudo</code>分组，从而<code>foo</code>拥有了<code>sudo</code>的权限。</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">sudo usermod -a -G sudo foo</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">sudo usermod -a -G sudo foo</span></span></code></pre></div><p><code>-a</code>代表append，<code>-G</code>代表一个次级分组的清单， 最后一个<code>foo</code>是账户名。</p><h4 id="修改用户主要分组" tabindex="-1">修改用户主要分组 <a class="header-anchor" href="#修改用户主要分组" aria-label="Permalink to &quot;修改用户主要分组&quot;">​</a></h4><p>修改主要分组还是使用<code>usermod</code>指令。只不过参数是小写的<code>-g</code>。</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">sudo usermod -g somegroup foo</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">sudo usermod -g somegroup foo</span></span></code></pre></div><h3 id="文件权限管理指令" tabindex="-1">文件权限管理指令 <a class="header-anchor" href="#文件权限管理指令" aria-label="Permalink to &quot;文件权限管理指令&quot;">​</a></h3><p>接下来我们学习文件管理相关的指令。</p><h4 id="查看-1" tabindex="-1">查看 <a class="header-anchor" href="#查看-1" aria-label="Permalink to &quot;查看&quot;">​</a></h4><p>我们可以用<code>ls -l</code>查看文件的权限，相关内容在本课时前面已经介绍过了。</p><h4 id="修改文件权限" tabindex="-1">修改文件权限 <a class="header-anchor" href="#修改文件权限" aria-label="Permalink to &quot;修改文件权限&quot;">​</a></h4><p>可以用<code>chmod</code>修改文件权限，<code>chmod</code>（ change file mode bits），也就是我们之前学习的 rwx，只不过 rwx 在 Linux 中是用三个连在一起的二进制位来表示。</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 设置foo可以执行</span></span>
<span class="line"><span style="color:#B392F0;">chmod</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">+x</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">./foo</span></span>
<span class="line"><span style="color:#6A737D;"># 不允许foo执行</span></span>
<span class="line"><span style="color:#B392F0;">chmod</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-x</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">./foo</span></span>
<span class="line"><span style="color:#6A737D;"># 也可以同时设置多个权限</span></span>
<span class="line"><span style="color:#B392F0;">chmod</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">+rwx</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">./foo</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 设置foo可以执行</span></span>
<span class="line"><span style="color:#6F42C1;">chmod</span><span style="color:#24292E;"> </span><span style="color:#032F62;">+x</span><span style="color:#24292E;"> </span><span style="color:#032F62;">./foo</span></span>
<span class="line"><span style="color:#6A737D;"># 不允许foo执行</span></span>
<span class="line"><span style="color:#6F42C1;">chmod</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-x</span><span style="color:#24292E;"> </span><span style="color:#032F62;">./foo</span></span>
<span class="line"><span style="color:#6A737D;"># 也可以同时设置多个权限</span></span>
<span class="line"><span style="color:#6F42C1;">chmod</span><span style="color:#24292E;"> </span><span style="color:#032F62;">+rwx</span><span style="color:#24292E;"> </span><span style="color:#032F62;">./foo</span></span></code></pre></div><p>因为<code>rwx</code>在 Linux 中用相邻的 3 个位来表示。比如说<code>111</code>代表<code>rwx</code>，<code>101</code>代表<code>r-x</code>。而<code>rwx</code>总共有三组，分别是用户权限、组权限和全部用户权限。也就是可以用<code>111111111</code> 9 个 1 代表<code>rwxrwxrwx</code>。又因为<code>111</code>10 进制是 7，因此当需要一次性设置用户权限、组权限和所有用户权限的时候，我们经常用数字表示。</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"># 设置rwxrwxrwx (111111111 -&gt; 777)</span></span>
<span class="line"><span style="color:#E1E4E8;">chmod 777 ./foo</span></span>
<span class="line"><span style="color:#E1E4E8;"># 设置rw-rw-rw-(110110110 -&gt; 666)</span></span>
<span class="line"><span style="color:#E1E4E8;">chmod 666 ./foo</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"># 设置rwxrwxrwx (111111111 -&gt; 777)</span></span>
<span class="line"><span style="color:#24292E;">chmod 777 ./foo</span></span>
<span class="line"><span style="color:#24292E;"># 设置rw-rw-rw-(110110110 -&gt; 666)</span></span>
<span class="line"><span style="color:#24292E;">chmod 666 ./foo</span></span></code></pre></div><h4 id="修改文件所属用户" tabindex="-1">修改文件所属用户 <a class="header-anchor" href="#修改文件所属用户" aria-label="Permalink to &quot;修改文件所属用户&quot;">​</a></h4><p>有时候我们需要修改文件所属用户，这个时候会使用<code>chown</code>指令。 下面指令修改<code>foo</code>文件所属的用户为<code>bar</code>。</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">chown bar ./foo</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">chown bar ./foo</span></span></code></pre></div><p>还有一些情况下，我们需要同时修改文件所属的用户和分组，比如我们想修改<code>foo</code>的分组位<code>g</code>，用户为<code>u</code>，可以使用：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">chown g.u ./foo</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">chown g.u ./foo</span></span></code></pre></div><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>这节课我们学习 Linux 的权限管理的抽象和架构思想。Linux 对用户、组、文件、系统调用等都进行了完善的抽象。之后，讨论了最小权限原则。最后我们对用户分组管理和文件权限管理两部分重要的指令进行了系统学习。</p><p>那么通过这节课的学习，你现在可以来回答本节关联的面试题目：<strong>请简述 Linux 权限划分的原则？</strong></p><p>老规矩，请你先在脑海里构思下给面试官的表述，并把你的思考写在留言区，然后再来看我接下来的分析。</p><p><strong>【解析】</strong> Linux 遵循最小权限原则。</p><ol><li><p>每个用户掌握的权限应该足够小，每个组掌握的权限也足够小。实际生产过程中，最好管理员权限可以拆分，互相牵制防止问题。</p></li><li><p>每个应用应当尽可能小的使用权限。最理想的是每个应用单独占用一个容器（比如 Docker），这样就不存在互相影响的问题。即便应用被攻破，也无法攻破 Docker 的保护层。</p></li><li><p>尽可能少的<code>root</code>。如果一个用户需要<code>root</code>能力，那么应当进行权限包围------马上提升权限（比如 sudo），处理后马上释放权限。</p></li><li><p>系统层面实现权限分级保护，将系统的权限分成一个个 Ring，外层 Ring 调用内层 Ring 时需要内层 Ring 进行权限校验。</p></li></ol><h3 id="思考题" tabindex="-1">思考题 <a class="header-anchor" href="#思考题" aria-label="Permalink to &quot;思考题&quot;">​</a></h3><p>最后再给你留一道实战问题，希望你在课下自己尝试一下。<strong>如果一个目录是只读权限，那么这个目录下面的文件还可写吗</strong>？</p><p>你可以把你的答案、思路或者课后总结写在留言区，这样可以帮助你产生更多的思考，这也是构建知识体系的一部分。经过长期的积累，相信你会得到意想不到的收获。如果你觉得今天的内容对你有所启发，欢迎分享给身边的朋友。期待看到你的思考！</p>`,37);function C(v,k,f,w,q,T){const s=l("Image");return c(),t("div",null,[r,a(s,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/5A/48/Ciqc1F91G6qACantAAC4GIUeips460.png"}),i,h,a(s,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/5A/53/CgqCHl91G9aADTBZAADD7IOpjac809.png"}),g,a(s,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/5A/33/Ciqc1F90SRuAAQCEAADdVOthCFw679.png"}),u,a(s,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/5A/3F/CgqCHl90SSSACa4WAAFIEUypWH4904.png"}),_,a(s,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/5A/53/CgqCHl91HB2AdNsAAAEpE6rtlHM754.png"}),y,a(s,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/5A/3F/CgqCHl90SU6AUJrLAADmRyiiAig313.png"}),m,a(s,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/5A/3F/CgqCHl90SVSALssXAAGhSpF-cWY440.png"}),E,x,a(s,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/5A/3F/CgqCHl90SVqAIja7AAXBj3lebBQ651.png"}),b,a(s,{alt:"WechatIMG144.png",src:"https://s0.lgstatic.com/i/image/M00/5A/53/CgqCHl91HIGAWXWVAACI9cgafaM295.png"}),A])}const P=n(d,[["render",C]]);export{S as __pageData,P as default};
