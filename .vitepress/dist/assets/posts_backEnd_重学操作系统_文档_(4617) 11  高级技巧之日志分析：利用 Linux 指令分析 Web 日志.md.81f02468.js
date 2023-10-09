import{_ as n,j as l,o as p,h as t,k as a,f as e,Q as c,s as o}from"./chunks/framework.d3daa342.js";const D=JSON.parse('{"title":"11高级技巧之日志分析：利用Linux指令分析Web日志","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/重学操作系统_文档/(4617) 11  高级技巧之日志分析：利用 Linux 指令分析 Web 日志.md","filePath":"posts/backEnd/重学操作系统_文档/(4617) 11  高级技巧之日志分析：利用 Linux 指令分析 Web 日志.md","lastUpdated":1696682708000}'),d={name:"posts/backEnd/重学操作系统_文档/(4617) 11  高级技巧之日志分析：利用 Linux 指令分析 Web 日志.md"},i=c('<h1 id="_11高级技巧之日志分析-利用linux指令分析web日志" tabindex="-1">11高级技巧之日志分析：利用Linux指令分析Web日志 <a class="header-anchor" href="#_11高级技巧之日志分析-利用linux指令分析web日志" aria-label="Permalink to &quot;11高级技巧之日志分析：利用Linux指令分析Web日志&quot;">​</a></h1><p>著名的黑客、自由软件运动的先驱理查德.斯托曼说过，&quot;编程不是科学，编程是手艺&quot;。可见，要想真正搞好编程，除了学习理论知识，还需要在实际的工作场景中进行反复的锤炼。</p><p>所以今天我们将结合实际的工作场景，带你利用 Linux 指令分析 Web 日志，这其中包含很多小技巧，掌握了本课时的内容，将对你将来分析线上日志、了解用户行为和查找问题有非常大地帮助。</p><p>本课时将用到一个大概有 5W 多条记录的<code>nginx</code>日志文件，你可以在<a href="https://github.com/ramroll/lagou-os/blob/main/access.log" target="_blank" rel="noreferrer">GitHub</a>上下载。 下面就请你和我一起，通过分析这个<code>nginx</code>日志文件，去锤炼我们的手艺。</p><h3 id="第一步-能不能这样做" tabindex="-1">第一步：能不能这样做？ <a class="header-anchor" href="#第一步-能不能这样做" aria-label="Permalink to &quot;第一步：能不能这样做？&quot;">​</a></h3><p>当我们想要分析一个线上文件的时候，首先要思考，能不能这样做？ 这里你可以先用<code>htop</code>指令看一下当前的负载。如果你的机器上没有<code>htop</code>，可以考虑用<code>yum</code>或者<code>apt</code>去安装。</p>',6),r=c('<p>如上图所示，我的机器上 8 个 CPU 都是 0 负载，<code>2G</code>的内存用了一半多，还有富余。 我们用<code>wget</code>将目标文件下载到本地（如果你没有 wget，可以用<code>yum</code>或者<code>apt</code>安装）。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">wget 某网址（自己替代）</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">wget 某网址（自己替代）</span></span></code></pre></div><p>然后我们用<code>ls</code>查看文件大小。发现这只是一个 7M 的文件，因此对线上的影响可以忽略不计。如果文件太大，建议你用<code>scp</code>指令将文件拷贝到闲置服务器再分析。下图中我使用了<code>--block-size</code>让<code>ls</code>以<code>M</code>为单位显示文件大小。</p>',3),_=c('<p>确定了当前机器的<code>CPU</code>和内存允许我进行分析后，我们就可以开始第二步操作了。</p><h3 id="第二步-less-日志文件" tabindex="-1">第二步：LESS 日志文件 <a class="header-anchor" href="#第二步-less-日志文件" aria-label="Permalink to &quot;第二步：LESS 日志文件&quot;">​</a></h3><p>在分析日志前，给你提个醒，记得要<code>less</code>一下，看看日志里面的内容。之前我们说过，尽量使用<code>less</code>这种不需要读取全部文件的指令，因为在线上执行<code>cat</code>是一件非常危险的事情，这可能导致线上服务器资源不足。</p>',3),h=c('<p>如上图所示，我们看到<code>nginx</code>的<code>access_log</code>每一行都是一次用户的访问，从左到右依次是：</p><ul><li><p>IP 地址；</p></li><li><p>时间；</p></li><li><p>HTTP 请求的方法、路径和协议版本、返回的状态码；</p></li><li><p>User Agent。</p></li></ul><h3 id="第三步-pv-分析" tabindex="-1">第三步：PV 分析 <a class="header-anchor" href="#第三步-pv-分析" aria-label="Permalink to &quot;第三步：PV 分析&quot;">​</a></h3><p>PV（Page View），用户每访问一个页面就是一次<code>Page View</code>。对于<code>nginx</code>的<code>acess_log</code>来说，分析 PV 非常简单，我们直接使用<code>wc -l</code>就可以看到整体的<code>PV</code>。</p>',4),u=c('<p>如上图所示：我们看到了一共有 51462 条 PV。</p><h3 id="第四步-pv-分组" tabindex="-1">第四步：PV 分组 <a class="header-anchor" href="#第四步-pv-分组" aria-label="Permalink to &quot;第四步：PV 分组&quot;">​</a></h3><p>通常一个日志中可能有几天的 PV，为了得到更加直观的数据，有时候需要按天进行分组。为了简化这个问题，我们先来看看日志中都有哪些天的日志。</p><p>使用<code>awk &#39;{print $4}&#39; access.log | less</code>可以看到如下结果。<code>awk</code>是一个处理文本的领域专有语言。这里就牵扯到领域专有语言这个概念，英文是Domain Specific Language。领域专有语言，就是为了处理某个领域专门设计的语言。比如awk是用来分析处理文本的DSL，html是专门用来描述网页的DSL，SQL是专门用来查询数据的DSL......大家还可以根据自己的业务设计某种针对业务的DSL。</p><p>你可以看到我们用<code>$4</code>代表文本的第 4 列，也就是时间所在的这一列，如下图所示：</p>',5),g=o("p",null,[e("我们想要按天统计，可以利用 "),o("code",null,"awk"),e("提供的字符串截取的能力。")],-1),E=o("p",null,[e("上图中，我们使用"),o("code",null,"awk"),e("的"),o("code",null,"substr"),e("函数，数字"),o("code",null,"2"),e("代表从第 2 个字符开始，数字"),o("code",null,"11"),e("代表截取 11 个字符。")],-1),C=o("p",null,"接下来我们就可以分组统计每天的日志条数了。",-1),b=o("p",null,[e("上图中，使用"),o("code",null,"sort"),e("进行排序，然后使用"),o("code",null,"uniq -c"),e("进行统计。你可以看到从 2015 年 5 月 17 号一直到 6 月 4 号的日志，还可以看到每天的 PV 量大概是在 2000~3000 之间。")],-1),m=o("h3",{id:"第五步-分析-uv",tabindex:"-1"},[e("第五步：分析 UV "),o("a",{class:"header-anchor",href:"#第五步-分析-uv","aria-label":'Permalink to "第五步：分析 UV"'},"​")],-1),A=o("p",null,"接下来我们分析 UV。UV（Uniq Visitor），也就是统计访问人数。通常确定用户的身份是一个复杂的事情，但是我们可以用 IP 访问来近似统计 UV。",-1),y=c(`<p>上图中，我们使用 awk 去打印<code>$1</code>也就是第一列，接着<code>sort</code>排序，然后用<code>uniq</code>去重，最后用<code>wc -l</code>查看条数。 这样我们就知道日志文件中一共有<code>2660</code>个 IP，也就是<code>2660</code>个 UV。</p><h3 id="第六步-分组分析-uv" tabindex="-1">第六步：分组分析 UV <a class="header-anchor" href="#第六步-分组分析-uv" aria-label="Permalink to &quot;第六步：分组分析 UV&quot;">​</a></h3><p>接下来我们尝试按天分组分析每天的 UV 情况。这个情况比较复杂，需要较多的指令，我们先创建一个叫作<code>sum.sh</code>的<code>bash</code>脚本文件，写入如下内容：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#!/usr/bin/bash</span></span>
<span class="line"><span style="color:#B392F0;">awk</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;{print substr($4, 2, 11) &quot; &quot; $1}&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">access.log</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">sort</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">uniq</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">|</span><span style="color:#79B8FF;">\\</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#B392F0;">awk</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;{uv[$1]++;next}END{for (ip in uv) print ip, uv[ip]}&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#!/usr/bin/bash</span></span>
<span class="line"><span style="color:#6F42C1;">awk</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;{print substr($4, 2, 11) &quot; &quot; $1}&#39;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">access.log</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">sort</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">uniq</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">|</span><span style="color:#005CC5;">\\</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#6F42C1;">awk</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;{uv[$1]++;next}END{for (ip in uv) print ip, uv[ip]}&#39;</span></span></code></pre></div><p>具体分析如下。</p><ul><li><p>文件首部我们使用<code>#!</code>，表示我们将使用后面的<code>/usr/bin/bash</code>执行这个文件。</p></li><li><p>第一次<code>awk</code>我们将第 4 列的日期和第 1 列的<code>ip</code>地址拼接在一起。</p></li><li><p>下面的<code>sort</code>是把整个文件进行一次字典序排序，相当于先根据日期排序，再根据 IP 排序。</p></li><li><p>接下来我们用<code>uniq</code>去重，日期 +IP 相同的行就只保留一个。</p></li><li><p>最后的<code>awk</code>我们再根据第 1 列的时间和第 2 列的 IP 进行统计。</p></li></ul><p>为了理解最后这一行描述，我们先来简单了解下<code>awk</code>的原理。</p><p><code>awk</code>本身是逐行进行处理的。因此我们的<code>next</code>关键字是提醒<code>awk</code>跳转到下一行输入。 对每一行输入，<code>awk</code>会根据第 1 列的字符串（也就是日期）进行累加。之后的<code>END</code>关键字代表一个触发器，就是 END 后面用 {} 括起来的语句会在所有输入都处理完之后执行------当所有输入都执行完，结果被累加到<code>uv</code>中后，通过<code>foreach</code>遍历<code>uv</code>中所有的<code>key</code>，去打印<code>ip</code>和<code>ip</code>对应的数量。</p><p>编写完上面的脚本之后，我们保存退出编辑器。接着执行<code>chmod +x ./sum.sh</code>，给<code>sum.sh</code>增加执行权限。然后我们可以像下图这样执行，获得结果：</p>`,9),k=c('<p>如上图，<code>IP</code>地址已经按天进行统计好了。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>今天我们结合一个简单的实战场景------Web 日志分析与统计练习了之前学过的指令，提高熟练程度。此外，我们还一起学习了新知识------功能强大的<code>awk</code>文本处理语言。在实战中，我们对一个<code>nginx</code>的<code>access_log</code>进行了简单的数据分析，直观地获得了这个网站的访问情况。</p><p>我们在日常的工作中会遇到各种各样的日志，除了 nginx 的日志，还有应用日志、前端日志、监控日志等等。你都可以利用今天学习的方法，去做数据分析，然后从中得出结论。</p><h3 id="思考题" tabindex="-1">思考题 <a class="header-anchor" href="#思考题" aria-label="Permalink to &quot;思考题&quot;">​</a></h3><p>接下来我给你出 2 个场景思考题，帮助你继续练习使用 Linux 指令。</p><ol><li><p>根据今天的 access_log 分析出有哪些终端访问了这个网站，并给出分组统计结果。</p></li><li><p>根据今天的 access_log 分析出访问量 Top 前三的网页。</p></li></ol><p>你可以把你的答案、思路或者课后总结写在留言区，这样可以帮助你产生更多的思考，这也是构建知识体系的一部分。经过长期的积累，相信你会得到意想不到的收获。如果你觉得今天的内容对你有所启发，欢迎分享给身边的朋友。期待看到你的思考！</p>',8);function P(T,V,q,w,v,x){const s=l("Image");return p(),t("div",null,[i,a(s,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/5C/7F/CgqCHl-BkJ6AcP32AAduMy8fcSw412.png"}),e(),r,a(s,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/5C/74/Ciqc1F-BkKeAQDs9AACqJbZ2jCM025.png"}),e(),_,a(s,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/5C/7F/CgqCHl-BkK6AcDGvAAjaPXe-Nbc605.png"}),e(),h,a(s,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/5C/74/Ciqc1F-BkL6AGiY-AABQPMnGu40979.png"}),e(),u,a(s,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/5C/7F/CgqCHl-BkMaAb421AAGUr-N08hM187.png"}),e(),g,a(s,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/5C/7F/CgqCHl-BkMuAKo9UAAIcPR902XQ858.png"}),e(),E,C,a(s,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/5C/7F/CgqCHl-BkNGAB-VgAASNmct9nQA628.png"}),e(),b,m,A,a(s,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/5C/74/Ciqc1F-BkNeAam2YAACxCjlKsvc488.png"}),e(),y,a(s,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/5C/7F/CgqCHl-BkOKAfpNwAAOFk0EhDjU183.png"}),e(),k])}const F=n(d,[["render",P]]);export{D as __pageData,F as default};
