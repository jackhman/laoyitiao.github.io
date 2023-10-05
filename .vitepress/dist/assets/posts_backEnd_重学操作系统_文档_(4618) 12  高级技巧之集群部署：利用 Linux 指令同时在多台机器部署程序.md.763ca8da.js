import{_ as l,j as e,o as c,g as t,k as n,Q as p,s,h as a}from"./chunks/framework.4e7d56ce.js";const J=JSON.parse('{"title":"第一步：搭建学习用的集群 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/重学操作系统_文档/(4618) 12  高级技巧之集群部署：利用 Linux 指令同时在多台机器部署程序.md","filePath":"posts/backEnd/重学操作系统_文档/(4618) 12  高级技巧之集群部署：利用 Linux 指令同时在多台机器部署程序.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/重学操作系统_文档/(4618) 12  高级技巧之集群部署：利用 Linux 指令同时在多台机器部署程序.md"},d=p('<p>Linux 指令是由很多顶级程序员共同设计的，使用 Linux 指令解决问题的过程，就好像在体验一款优秀的产品。每次通过查资料使用 Linux 指令解决问题后，都会让我感到收获满满。在这个过程中，我不仅学会了一条指令，还从中体会到了软件设计的魅力：彼此独立，又互成一体。这就像每个 Linux 指令一样，专注、高效。回想起来，在我第一次看到管道、第一次使用 awk、第一次使用 sort，都曾有过这种感受。</p><p>通过前面的学习，相信你已经掌握了一些基础指令的使用方法，今天我们继续挑战一个更复杂的问题------<strong>用 Linux 指令管理一个集群</strong>。这属于 Linux 指令的高级技巧，所谓高级技巧并不是我们要学习更多的指令，而是要把之前所学的指令进行排列组合。当你从最初只能写几条指令、执行然后看结果，成长到具备书写一个拥有几十行、甚至上百行的 bash 脚本的能力时，就意味着你具备了解决复杂问题的能力。而最终的目标，是提升你对指令的熟练程度，锻炼工程能力。</p><p>本课时，我将带你朝着这个目标努力，通过把简单的指令组合起来，分层组织成最终的多个脚本文件，解决一个复杂的工程问题：在成百上千的集群中安装一个 Java 环境。接下来，请你带着这个目标，开启今天的学习。</p><h3 id="第一步-搭建学习用的集群" tabindex="-1">第一步：搭建学习用的集群 <a class="header-anchor" href="#第一步-搭建学习用的集群" aria-label="Permalink to &quot;第一步：搭建学习用的集群&quot;">​</a></h3><p>第一步我们先搭建一个学习用的集群。这里简化一下模型。我在自己的电脑上装一个<code>ubuntu</code>桌面版的虚拟机，然后再装两个<code>ubuntu</code>服务器版的虚拟机。</p><p>相对于桌面版，服务器版对资源的消耗会少很多。我将教学材料中桌面版的<code>ubuntu</code>命名为<code>u1</code>，两个用来被管理的服务器版<code>ubuntu</code>叫作<code>v1</code>和<code>v2</code>。</p><p>用桌面版的原因是：我喜欢<code>ubuntu</code>漂亮的开源字体，这样会让我在给你准备素材的时候拥有一个好心情。如果你对此感兴趣，可以搜索<code>ubuntu mono</code>，尝试把这个字体安装到自己的文本编辑器中。不过我还是觉得在<code>ubuntu</code>中敲代码更有感觉。</p><p>注意，我在这里只用了 3 台服务器，但是接下来我们要写的脚本是可以在很多台服务器之间复用的。</p><h3 id="第二步-循环遍历-ip-列表" tabindex="-1">第二步：循环遍历 IP 列表 <a class="header-anchor" href="#第二步-循环遍历-ip-列表" aria-label="Permalink to &quot;第二步：循环遍历 IP 列表&quot;">​</a></h3><p>你可以想象一个局域网中有很多服务器需要管理，它们彼此之间网络互通，我们通过一台主服务器对它们进行操作，即通过<code>u1</code>操作<code>v1</code>和<code>v2</code>。</p><p>在主服务器上我们维护一个<code>ip</code>地址的列表，保存成一个文件，如下图所示：</p>',11),i=p(`<p>目前<code>iplist</code>中只有两项，但是如果我们有足够的机器，可以在里面放成百上千项。接下来，请你思考<code>shell</code>如何遍历这些<code>ip</code>？</p><p>你可以先尝试实现一个最简单的程序，从文件<code>iplist</code>中读出这些<code>ip</code>并尝试用<code>for</code>循环遍历这些<code>ip</code>，具体程序如下：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#!/usr/bin/bash</span></span>
<span class="line"><span style="color:#B392F0;">readarray</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-t</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ips</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">iplist</span></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> ip </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> \${ips[@]}</span></span>
<span class="line"><span style="color:#F97583;">do</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> $ip</span></span>
<span class="line"><span style="color:#F97583;">done</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#!/usr/bin/bash</span></span>
<span class="line"><span style="color:#6F42C1;">readarray</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-t</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ips</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">iplist</span></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> ip </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> \${ips[@]}</span></span>
<span class="line"><span style="color:#D73A49;">do</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> $ip</span></span>
<span class="line"><span style="color:#D73A49;">done</span></span></code></pre></div><p>首行的<code>#!</code>叫作 Shebang。Linux 的程序加载器会分析 Shebang 的内容，决定执行脚本的程序。这里我们希望用<code>bash</code>来执行这段程序，因为我们用到的 readarray 指令是<code>bash 4.0</code>后才增加的能力。</p><p><code>readarray</code>指令将 iplist 文件中的每一行读取到变量<code>ips</code>中。<code>ips</code>是一个数组，可以用<code>echo \${ips[@]}</code>打印其中全部的内容：<code>@</code>代表取数组中的全部内容；<code>$</code>符号是一个求值符号。不带<code>$</code>的话，<code>ips[@]</code>会被认为是一个字符串，而不是表达式。</p><p><code>for</code>循环遍历数组中的每个<code>ip</code>地址，<code>echo</code>把地址打印到屏幕上。</p><p>如果用<code>shell</code>执行上面的程序会报错，因为<code>readarray</code>是<code>bash 4.0</code>后支持的能力，因此我们用<code>chomd</code>为<code>foreach.sh</code>增加执行权限，然后直接利用<code>shebang</code>的能力用<code>bash</code>执行，如下图所示：</p>`,7),y=s("h3",{id:"第三步-创建集群管理账户",tabindex:"-1"},[a("第三步：创建集群管理账户 "),s("a",{class:"header-anchor",href:"#第三步-创建集群管理账户","aria-label":'Permalink to "第三步：创建集群管理账户"'},"​")],-1),E=s("p",null,[a("为了方便集群管理，通常使用统一的用户名管理集群。这个账号在所有的集群中都需要保持命名一致。比如这个集群账号的名字就叫作"),s("code",null,"lagou"),a("。")],-1),h=s("p",null,[a("接下来我们探索一下如何创建这个账户"),s("code",null,"lagou"),a("，如下图所示：")],-1),u=p("<p>上面我们创建了<code>lagou</code>账号，然后把<code>lagou</code>加入<code>sudo</code>分组。这样<code>lagou</code>就有了<code>sudo</code>成为<code>root</code>的能力，如下图所示：</p>",1),_=s("p",null,[a("接下来，我们设置"),s("code",null,"lagou"),a("用户的初始化"),s("code",null,"shell"),a("是"),s("code",null,"bash"),a("，如下图所示：")],-1),g=s("p",null,[a("这个时候如果使用命令"),s("code",null,"su lagou"),a("，可以切换到"),s("code",null,"lagou"),a("账号，但是你会发现命令行没有了颜色。因此我们可以将原来用户下面的"),s("code",null,".bashrc"),a("文件拷贝到"),s("code",null,"/home/lagou"),a("目录下，如下图所示：")],-1),A=s("p",null,[a("这样，我们就把一些自己平时用的设置拷贝了过去，包括终端颜色的设置。"),s("code",null,".bashrc"),a("是启动"),s("code",null,"bash"),a("的时候会默认执行的一个脚本文件。")],-1),v=s("p",null,[a("接下来，我们编辑一下"),s("code",null,"/etc/sudoers"),a("文件，增加一行"),s("code",null,"lagou ALL=(ALL) NOPASSWD:ALL"),a("表示"),s("code",null,"lagou"),a("账号 sudo 时可以免去密码输入环节，如下图所示：")],-1),F=p(`<p>我们可以把上面的完整过程整理成指令文件，<code>create_lagou.sh</code>：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">sudo useradd </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">m </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">d </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">home</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">lagou lagou</span></span>
<span class="line"><span style="color:#E1E4E8;">sudo passwd lagou</span></span>
<span class="line"><span style="color:#E1E4E8;">sudo usermod </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">G</span><span style="color:#E1E4E8;"> sudo lagou</span></span>
<span class="line"><span style="color:#E1E4E8;">sudo usermod </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">shell </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">bin</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">bash lagou</span></span>
<span class="line"><span style="color:#E1E4E8;">sudo cp </span><span style="color:#F97583;">~/</span><span style="color:#E1E4E8;">.bashrc </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">home</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">lagou</span><span style="color:#F97583;">/</span></span>
<span class="line"><span style="color:#E1E4E8;">sudo chown lagou.lagou </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">home</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">lagou</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">.bashrc</span></span>
<span class="line"><span style="color:#E1E4E8;">sduo sh </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">c </span><span style="color:#9ECBFF;">&#39;echo &quot;lagou ALL=(ALL)  NOPASSWD:ALL&quot;&gt;&gt;/etc/sudoers&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">sudo useradd </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">m </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">d </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">home</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">lagou lagou</span></span>
<span class="line"><span style="color:#24292E;">sudo passwd lagou</span></span>
<span class="line"><span style="color:#24292E;">sudo usermod </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">G</span><span style="color:#24292E;"> sudo lagou</span></span>
<span class="line"><span style="color:#24292E;">sudo usermod </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">shell </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">bin</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">bash lagou</span></span>
<span class="line"><span style="color:#24292E;">sudo cp </span><span style="color:#D73A49;">~/</span><span style="color:#24292E;">.bashrc </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">home</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">lagou</span><span style="color:#D73A49;">/</span></span>
<span class="line"><span style="color:#24292E;">sudo chown lagou.lagou </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">home</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">lagou</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">.bashrc</span></span>
<span class="line"><span style="color:#24292E;">sduo sh </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">c </span><span style="color:#032F62;">&#39;echo &quot;lagou ALL=(ALL)  NOPASSWD:ALL&quot;&gt;&gt;/etc/sudoers&#39;</span></span></code></pre></div><p>你可以删除用户<code>lagou</code>，并清理<code>/etc/sudoers</code>文件最后一行。用指令<code>userdel lagou</code>删除账户，然后执行<code>create_lagou.sh</code>重新创建回<code>lagou</code>账户。如果发现结果一致，就代表<code>create_lagou.sh</code>功能没有问题。</p><p>最后我们想在<code>v1\`\`v2</code>上都执行<code>create_logou.sh</code>这个脚本。但是你不要忘记，我们的目标是让程序在成百上千台机器上传播，因此还需要一个脚本将<code>create_lagou.sh</code>拷贝到需要执行的机器上去。</p><p>这里，可以对<code>foreach.sh</code>稍做修改，然后分发<code>create_lagou.sh</code>文件。</p><p><em>foreach.sh</em></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#!/usr/bin/bash</span></span>
<span class="line"><span style="color:#E1E4E8;">readarray </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">t ips </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> iplist</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">for ip </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> \${ips[@]}</span></span>
<span class="line"><span style="color:#F97583;">do</span></span>
<span class="line"><span style="color:#E1E4E8;">    scp </span><span style="color:#F97583;">~/</span><span style="color:#E1E4E8;">remote</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">create_lagou.sh ramroll@</span><span style="color:#B392F0;">$ip</span><span style="color:#E1E4E8;">:</span><span style="color:#F97583;">~/</span><span style="color:#E1E4E8;">create_lagou.sh</span></span>
<span class="line"><span style="color:#E1E4E8;">done</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#!/usr/bin/bash</span></span>
<span class="line"><span style="color:#24292E;">readarray </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">t ips </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> iplist</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">for ip </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> \${ips[@]}</span></span>
<span class="line"><span style="color:#D73A49;">do</span></span>
<span class="line"><span style="color:#24292E;">    scp </span><span style="color:#D73A49;">~/</span><span style="color:#24292E;">remote</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">create_lagou.sh ramroll@</span><span style="color:#6F42C1;">$ip</span><span style="color:#24292E;">:</span><span style="color:#D73A49;">~/</span><span style="color:#24292E;">create_lagou.sh</span></span>
<span class="line"><span style="color:#24292E;">done</span></span></code></pre></div><p>这里，我们在循环中用<code>scp</code>进行文件拷贝，然后分别去每台机器上执行<code>create_lagou.sh</code>。</p><p>如果你的机器非常多，上述过程会变得非常烦琐。你可以先带着这个问题学习下面的<code>Step 4</code>，然后再返回来重新思考这个问题，当然你也可以远程执行脚本。另外，还有一个叫作<code>sshpass</code>的工具，可以帮你把密码传递给要远程执行的指令，如果你对这块内容感兴趣，可以自己研究下这个工具。</p><h3 id="第四步-打通集群权限" tabindex="-1">第四步： 打通集群权限 <a class="header-anchor" href="#第四步-打通集群权限" aria-label="Permalink to &quot;第四步： 打通集群权限&quot;">​</a></h3><p>接下来我们需要打通从主服务器到<code>v1</code>和<code>v2</code>的权限。当然也可以每次都用<code>ssh</code>输入用户名密码的方式登录，但这并不是长久之计。 如果我们有成百上千台服务器，输入用户名密码就成为一件繁重的工作。</p><p>这时候，你可以考虑利用主服务器的公钥在各个服务器间登录，避免输入密码。接下来我们聊聊具体的操作步骤：</p><p>首先，需要在<code>u1</code>上用<code>ssh-keygen</code>生成一个公私钥对，然后把公钥写入需要管理的每一台机器的<code>authorized_keys</code>文件中。如下图所示：我们使用<code>ssh-keygen</code>在主服务器<code>u1</code>中生成公私钥对。</p>`,13),b=p("<p>然后使用<code>mkdir -p</code>创建<code>~/.ssh</code>目录，<code>-p</code>的优势是当目录不存在时，才需要创建，且不会报错。<code>~</code>代表当前家目录。 如果文件和目录名前面带有一个<code>.</code>，就代表该文件或目录是一个需要隐藏的文件。平时用<code>ls</code>的时候，并不会查看到该文件，通常这种文件拥有特别的含义，比如<code>~/.ssh</code>目录下是对<code>ssh</code>的配置。</p><p>我们用<code>cd</code>切换到<code>.ssh</code>目录，然后执行<code>ssh-keygen</code>。这样会在<code>~/.ssh</code>目录中生成两个文件，<code>id_rsa.pub</code>公钥文件和<code>is_rsa</code>私钥文件。 如下图所示：</p>",2),m=p(`<p>可以看到<code>id_rsa.pub</code>文件中是加密的字符串，我们可以把这些字符串拷贝到其他机器对应用户的<code>~/.ssh/authorized_keys</code>文件中，当<code>ssh</code>登录其他机器的时候，就不用重新输入密码了。 这个传播公钥的能力，可以用一个<code>shell</code>脚本执行，这里我用<code>transfer_key.sh</code>实现。</p><p>我们修改一下<code>foreach.sh</code>，并写一个<code>transfer_key.sh</code>配合<code>foreach.sh</code>的工作。<code>transfer_key.sh</code>内容如下：</p><p><em>foreach.sh</em></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#!/usr/bin/bash</span></span>
<span class="line"><span style="color:#E1E4E8;">readarray </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">t ips </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> iplist</span></span>
<span class="line"><span style="color:#E1E4E8;">for ip </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> \${ips[@]}</span></span>
<span class="line"><span style="color:#F97583;">do</span></span>
<span class="line"><span style="color:#E1E4E8;">    sh .</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">transfer_key.sh $ip</span></span>
<span class="line"><span style="color:#E1E4E8;">done</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#!/usr/bin/bash</span></span>
<span class="line"><span style="color:#24292E;">readarray </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">t ips </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> iplist</span></span>
<span class="line"><span style="color:#24292E;">for ip </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> \${ips[@]}</span></span>
<span class="line"><span style="color:#D73A49;">do</span></span>
<span class="line"><span style="color:#24292E;">    sh .</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">transfer_key.sh $ip</span></span>
<span class="line"><span style="color:#24292E;">done</span></span></code></pre></div><p><em>tranfer_key.sh</em></p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">ip</span><span style="color:#F97583;">=</span><span style="color:#FFAB70;">$1</span></span>
<span class="line"><span style="color:#E1E4E8;">pubkey</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">$(</span><span style="color:#B392F0;">cat</span><span style="color:#9ECBFF;"> ~/.ssh/id_rsa.pub)</span></span>
<span class="line"><span style="color:#79B8FF;">echo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;execute on .. </span><span style="color:#E1E4E8;">$ip</span><span style="color:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="color:#B392F0;">ssh</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">lagou@</span><span style="color:#E1E4E8;">$ip </span><span style="color:#9ECBFF;">&quot; </span></span>
<span class="line"><span style="color:#9ECBFF;">mkdir -p ~/.ssh</span></span>
<span class="line"><span style="color:#9ECBFF;">echo </span><span style="color:#E1E4E8;">$pubkey</span><span style="color:#9ECBFF;">  &gt;&gt; ~/.ssh/authorized_keys</span></span>
<span class="line"><span style="color:#9ECBFF;">chmod 700 ~/.ssh</span></span>
<span class="line"><span style="color:#9ECBFF;">chmod 600 ~/.ssh/authorized_keys</span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">ip</span><span style="color:#D73A49;">=</span><span style="color:#E36209;">$1</span></span>
<span class="line"><span style="color:#24292E;">pubkey</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">$(</span><span style="color:#6F42C1;">cat</span><span style="color:#032F62;"> ~/.ssh/id_rsa.pub)</span></span>
<span class="line"><span style="color:#005CC5;">echo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;execute on .. </span><span style="color:#24292E;">$ip</span><span style="color:#032F62;">&quot;</span></span>
<span class="line"><span style="color:#6F42C1;">ssh</span><span style="color:#24292E;"> </span><span style="color:#032F62;">lagou@</span><span style="color:#24292E;">$ip </span><span style="color:#032F62;">&quot; </span></span>
<span class="line"><span style="color:#032F62;">mkdir -p ~/.ssh</span></span>
<span class="line"><span style="color:#032F62;">echo </span><span style="color:#24292E;">$pubkey</span><span style="color:#032F62;">  &gt;&gt; ~/.ssh/authorized_keys</span></span>
<span class="line"><span style="color:#032F62;">chmod 700 ~/.ssh</span></span>
<span class="line"><span style="color:#032F62;">chmod 600 ~/.ssh/authorized_keys</span></span>
<span class="line"><span style="color:#032F62;">&quot;</span></span></code></pre></div><p>在<code>foreach.sh</code>中我们执行 transfer_key.sh，并且将 IP 地址通过参数传递过去。在 transfer_key.sh 中，用<code>$1</code>读出 IP 地址参数， 再将公钥写入变量<code>pubkey</code>，然后登录到对应的服务器，执行多行指令。用<code>mkdir</code>指令检查<code>.ssh</code>目录，如不存在就创建这个目录。最后我们将公钥追加写入目标机器的<code>~/.ssh/authorized_keys</code>中。</p><p><code>chmod 700</code>和<code>chmod 600</code>是因为某些特定的<code>linux</code>版本需要<code>.ssh</code>的目录为可读写执行，<code>authorized_keys</code>文件的权限为只可读写。而为了保证安全性，组用户、所有用户都不可以访问这个文件。</p><p>此前，我们执行<code>foreach.sh</code>需要输入两次密码。完成上述操作后，我们再登录这两台服务器就不需要输入密码了。</p>`,9),C=s("p",null,"接下来，我们尝试一下免密登录，如下图所示：",-1),D=p(`<p>可以发现，我们登录任何一台机器，都不再需要输入用户名和密码了。</p><h3 id="第五步-单机安装-java-环境" tabindex="-1">第五步：单机安装 Java 环境 <a class="header-anchor" href="#第五步-单机安装-java-环境" aria-label="Permalink to &quot;第五步：单机安装 Java 环境&quot;">​</a></h3><p>在远程部署 Java 环境之前，我们先单机完成以下 Java 环境的安装，用来收集需要执行的脚本。</p><p>在<code>ubuntu</code>上安装<code>java</code>环境可以直接用<code>apt</code>。</p><p>我们通过下面几个步骤脚本配置 Java 环境：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">sudo apt install openjdk</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">11</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">jdk</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">sudo apt install openjdk</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">11</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">jdk</span></span></code></pre></div><p>经过一番等待我们已经安装好了<code>java</code>，然后执行下面的脚本确认<code>java</code>安装。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">which java</span></span>
<span class="line"><span style="color:#E1E4E8;">java </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">version</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">which java</span></span>
<span class="line"><span style="color:#24292E;">java </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">version</span></span></code></pre></div>`,8),k=p(`<p>根据最小权限原则，执行 Java 程序我们考虑再创建一个用户<code>ujava</code>。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">sudo useradd </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">m </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">d </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">opt</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">ujava ujava</span></span>
<span class="line"><span style="color:#E1E4E8;">sudo usermod </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">shell </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">bin</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">bash lagou</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">sudo useradd </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">m </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">d </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">opt</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">ujava ujava</span></span>
<span class="line"><span style="color:#24292E;">sudo usermod </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">shell </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">bin</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">bash lagou</span></span></code></pre></div><p>这个用户可以不设置密码，因为我们不会真的登录到这个用户下去做任何事情。接下来我们为用户配置 Java 环境变量，如下图所示：</p>`,3),j=p('<p>通过两次 ls 追查，可以发现<code>java</code>可执行文件软连接到<code>/etc/alternatives/java</code>然后再次软连接到<code>/usr/lib/jvm/java-11-openjdk-amd64</code>下。</p><p>这样我们就可以通过下面的语句设置 JAVA_HOME 环境变量了。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">export JAVA_HOME</span><span style="color:#F97583;">=/</span><span style="color:#E1E4E8;">usr</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">lib</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">jvm</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">java</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">11</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">openjdk</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">amd64</span><span style="color:#F97583;">/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">export JAVA_HOME</span><span style="color:#D73A49;">=/</span><span style="color:#24292E;">usr</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">lib</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">jvm</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">java</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">11</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">openjdk</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">amd64</span><span style="color:#D73A49;">/</span></span></code></pre></div><p>Linux 的环境变量就好比全局可见的数据，这里我们使用 export 设置<code>JAVA_HOME</code>环境变量的指向。如果你想看所有的环境变量的指向，可以使用<code>env</code>指令。</p>',4),T=s("p",null,[a("其中有一个环境变量比较重要，就是"),s("code",null,"PATH"),a("。")],-1),f=p(`<p>如上图，我们可以使用<code>shell</code>查看<code>PATH</code>的值，<code>PATH</code>中用<code>:</code>分割，每一个目录都是<code>linux</code>查找执行文件的目录。当用户在命令行输入一个命令，Linux 就会在<code>PATH</code>中寻找对应的执行文件。</p><p>当然我们不希望<code>JAVA_HOME</code>配置后重启一次电脑就消失，因此可以把这个环境变量加入<code>ujava</code>用户的<code>profile</code>中。这样只要发生用户登录，就有这个环境变量。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">sudo sh </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">c </span><span style="color:#9ECBFF;">&#39;echo &quot;export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64/&quot; &gt;&gt; /opt/ujava/.bash_profile&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">sudo sh </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">c </span><span style="color:#032F62;">&#39;echo &quot;export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64/&quot; &gt;&gt; /opt/ujava/.bash_profile&#39;</span></span></code></pre></div><p>将<code>JAVA_HOME</code>加入<code>bash_profile</code>，这样后续远程执行<code>java</code>指令时就可以使用<code>JAVA_HOME</code>环境变量了。</p><p>最后，我们将上面所有的指令整理起来，形成一个<code>install_java.sh</code>。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">sudo apt </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">y install openjdk</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">11</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">jdk</span></span>
<span class="line"><span style="color:#E1E4E8;">sudo useradd </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">m </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">d </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">opt</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">ujava ujava</span></span>
<span class="line"><span style="color:#E1E4E8;">sudo usermod </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">shell </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">bin</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">bash ujava</span></span>
<span class="line"><span style="color:#E1E4E8;">sudo sh </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">c </span><span style="color:#9ECBFF;">&#39;echo &quot;export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64/&quot; &gt;&gt; /opt/ujava/.bash_profile&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">sudo apt </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">y install openjdk</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">11</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">jdk</span></span>
<span class="line"><span style="color:#24292E;">sudo useradd </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">m </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">d </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">opt</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">ujava ujava</span></span>
<span class="line"><span style="color:#24292E;">sudo usermod </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">shell </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">bin</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">bash ujava</span></span>
<span class="line"><span style="color:#24292E;">sudo sh </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">c </span><span style="color:#032F62;">&#39;echo &quot;export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64/&quot; &gt;&gt; /opt/ujava/.bash_profile&#39;</span></span></code></pre></div><p><code>apt</code>后面增了一个<code>-y</code>是为了让执行过程不弹出确认提示。</p><h3 id="第六步-远程安装-java-环境" tabindex="-1">第六步：远程安装 Java 环境 <a class="header-anchor" href="#第六步-远程安装-java-环境" aria-label="Permalink to &quot;第六步：远程安装 Java 环境&quot;">​</a></h3><p>终于到了远程安装 Java 环境这一步，我们又需要用到<code>foreach.sh</code>。为了避免每次修改，你可以考虑允许<code>foreach.sh</code>带一个文件参数，指定需要远程执行的脚本。</p><p><em><strong>foreach.sh</strong></em></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#!/usr/bin/bash</span></span>
<span class="line"><span style="color:#E1E4E8;">readarray </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">t ips </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> iplist</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">script</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">$1</span></span>
<span class="line"><span style="color:#E1E4E8;">for ip </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> \${ips[@]}</span></span>
<span class="line"><span style="color:#F97583;">do</span></span>
<span class="line"><span style="color:#E1E4E8;">    ssh $ip </span><span style="color:#9ECBFF;">&#39;bash -s&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> $script</span></span>
<span class="line"><span style="color:#E1E4E8;">done</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#!/usr/bin/bash</span></span>
<span class="line"><span style="color:#24292E;">readarray </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">t ips </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> iplist</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">script</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">$1</span></span>
<span class="line"><span style="color:#24292E;">for ip </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> \${ips[@]}</span></span>
<span class="line"><span style="color:#D73A49;">do</span></span>
<span class="line"><span style="color:#24292E;">    ssh $ip </span><span style="color:#032F62;">&#39;bash -s&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> $script</span></span>
<span class="line"><span style="color:#24292E;">done</span></span></code></pre></div><p>改写后的<code>foreach</code>会读取第一个执行参数作为远程执行的脚本文件。 而<code>bash -s</code>会提示使用标准输入流作为命令的输入；<code>&lt; $script</code>负责将脚本文件内容重定向到远程<code>bash</code>的标准输入流。</p><p>然后我们执行<code>foreach.sh install_java.sh</code>，机器等待 1 分钟左右，在执行结束后，可以用下面这个脚本检测两个机器中的安装情况。</p><p><em><strong>check.sh</strong></em></p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">sudo </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">u ujava </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">i </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">bin</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">bash </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">c </span><span style="color:#9ECBFF;">&#39;echo $JAVA_HOME&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">sudo </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">u ujava </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">i java </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">version</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">sudo </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">u ujava </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">i </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">bin</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">bash </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">c </span><span style="color:#032F62;">&#39;echo $JAVA_HOME&#39;</span></span>
<span class="line"><span style="color:#24292E;">sudo </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">u ujava </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">i java </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">version</span></span></code></pre></div><p><code>check.sh</code>中我们切换到<code>ujava</code>用户去检查<code>JAVA_HOME</code>环境变量和 Java 版本。执行的结果如下图所示：</p>`,16),q=p('<h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>这节课我们所讲的场景是自动化运维的一些皮毛。通过这样的场景练习，我们复习了很多之前学过的 Linux 指令。在尝试用脚本文件构建一个又一个小工具的过程中，可以发现复用很重要。</p><p>在工作中，优秀的工程师，总是善于积累和复用，而<code>shell</code>脚本就是积累和复用的利器。如果你第一次安装<code>java</code>环境，可以把今天的安装脚本保存在自己的笔记本中，下次再安装就能自动化完成了。除了积累和总结，另一个非常重要的就是你要尝试自己去查资料，包括使用<code>man</code>工具熟悉各种指令的使用方法，用搜索引擎查阅资料等。</p><h3 id="课后练习题" tabindex="-1">课后练习题 <a class="header-anchor" href="#课后练习题" aria-label="Permalink to &quot;课后练习题&quot;">​</a></h3><p><strong>最后我再给你出一道需要查阅资料的题目：~/.bashrc ~/.bash_profile, ~/.profile 和 /etc/profile 的区别是什么</strong>？</p><p>你可以把你的答案、思路或者课后总结写在留言区，这样可以帮助你产生更多的思考，这也是构建知识体系的一部分。经过长期的积累，相信你会得到意想不到的收获。如果你觉得今天的内容对你有所启发，欢迎分享给身边的朋友。期待看到你的思考！</p>',6);function S(P,V,x,$,B,L){const o=e("Image");return c(),t("div",null,[d,n(o,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/5E/75/CgqCHl-GsciASqucAACaCl1bXF4240.png"}),i,n(o,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/5E/6A/Ciqc1F-GsdSAZPtIAAF5yL5VkdQ049.png"}),y,E,h,n(o,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/5E/75/CgqCHl-GsdqAc2khAALNpLTWENc494.png"}),u,n(o,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/5E/6A/Ciqc1F-GseCAYss5AAB9-SYXFJU693.png"}),_,n(o,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/5E/75/CgqCHl-GsiyAGKitAACU_gkGZRI467.png"}),g,n(o,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/5E/6A/Ciqc1F-GsjeAL_RwAAEyx32py80146.png"}),A,v,n(o,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/5E/76/CgqCHl-Gsj6AQBXeAAEW0V065r0519.png"}),F,n(o,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/5E/76/CgqCHl-GslSAAUT5AATF-5rjGWU079.png"}),b,n(o,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/5E/76/CgqCHl-GsluAWyS-AAayQyKs6NY181.png"}),m,n(o,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/5E/76/CgqCHl-GsnuAC-lYAAb76OR4cFs817.png"}),C,n(o,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image/M00/5E/6A/Ciqc1F-GsoGANiKlAAIjYZ8fscs878.png"}),D,n(o,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image/M00/5E/6B/Ciqc1F-GspCAJ0r9AAJx-kzES1k505.png"}),k,n(o,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image/M00/5E/6B/Ciqc1F-GsqWAa2e2AAJosZCNXpU388.png"}),j,n(o,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image/M00/5E/76/CgqCHl-GsrGAMIfNAAW55Kdz1xc547.png"}),T,n(o,{alt:"Drawing 14.png",src:"https://s0.lgstatic.com/i/image/M00/5E/6B/Ciqc1F-GsriACI2JAAEtgeamQNI945.png"}),f,n(o,{alt:"Drawing 15.png",src:"https://s0.lgstatic.com/i/image/M00/5E/76/CgqCHl-GstWAFW9yAAQXx_nh6dw719.png"}),q])}const M=l(r,[["render",S]]);export{J as __pageData,M as default};
