import{_ as o,j as e,o as p,g as i,k as a,h as l,s,Q as t}from"./chunks/framework.4e7d56ce.js";const U=JSON.parse('{"title":"割接与迁移 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/111-运维高手的36项修炼文档/(1559) 第14课：割接关键思路解析：停服维护、无缝升级如何设计.md","filePath":"posts/devops/111-运维高手的36项修炼文档/(1559) 第14课：割接关键思路解析：停服维护、无缝升级如何设计.md","lastUpdated":1696417798000}'),r={name:"posts/devops/111-运维高手的36项修炼文档/(1559) 第14课：割接关键思路解析：停服维护、无缝升级如何设计.md"},c=s("br",null,null,-1),_=s("p",null,"在上一课时中我们讲解了割接的相关检查项及命令，本课时我们继续讲解割接的关键思路：停服维护和无缝升级时应该如何进行设计。",-1),d=s("h2",{id:"割接与迁移",tabindex:"-1"},[l("割接与迁移 "),s("a",{class:"header-anchor",href:"#割接与迁移","aria-label":'Permalink to "割接与迁移"'},"​")],-1),g=s("p",null,"通过上一课时的学习，想必你已经对网站割接的定义都有一定的了解。在此基础上再讲一讲割接和迁移存在的区别。",-1),h=s("br",null,null,-1),u=t('<br><p>也许你认为割接就是迁移，但事实并非如此，我们可以将割接理解为迁移中的一个关键部分，但它并不完全属于迁移。举个例子，我们需要修改程序的配置，或者要做版本的升级，这些情况都需要作割接操作，但并不属于网站的迁移范围。接下来我会在这张图里，选择入口层 Nginx、数据层 MySQL 这两个案例，对割接的关键思路和步骤进行详细介绍。</p><br><p>论割接的过程可以分为两种：停服割接和不停服割接。停服割接是指在割接过程中，所属的业务服务需要停止对外服务，所以会影响业务或客户端的正常访问。 不停服切割是指在切割过程中，所属的业务服务需要几乎完全正常对外服务，很难对客户的访问和数据产生影响，但不是完全不会有影响。</p><br><p>值得注意的是，通常我们接触的大部分场景都会选择停服割接。这是因为不停服割接对整体的方案设计和人员成本要求较高，需要在前期进行大量的细致分析，并且投入人力，才能完成不停服割接。所以在大部分场景中，我们选择在业务低峰期牺牲一部分用户访问来作停服割接，这样我们的投入成本会更加低。</p><br><p>学习本课时你只需要具备两个基础，即 MySQL 的操作基础和对 Nginx 的一些技术了解。</p><h2 id="nginx-版本平滑升级" tabindex="-1">Nginx 版本平滑升级 <a class="header-anchor" href="#nginx-版本平滑升级" aria-label="Permalink to &quot;Nginx 版本平滑升级&quot;">​</a></h2><p>说到了停服割接和不停服割接，接下来我拿入口层一个服务 Nginx ，它的平滑升级为例，为你讲解 Nginx 在做版本升级时是如何做到平滑的不停服升级。</p><br><p>要做到这一点，首先我们需要了解 Nginx 是否支持平滑割接，这是一个前提。如果可以那 Nginx 是如何做到平滑割接的呢？根本上我们需要了解 Nginx 里有一个非常重要的指令（nginx reload），即我们更改 Nginx 的配置，或者是重启服务时，会用到的 Nginx 的 reload 指令。那 reload 指令的原理是如何来支持平滑升级的？</p><br><p>首先，我们知道 Nginx 的启动进程总共包含 master 进程和 work 线程，work 线程负责实际处理用户的请求，而 master 进程则起到管理和分配流量的作用。</p><br>',15),b=t('<br><p>如图所示，当我们把一个版本升级到另外一个版本时，假设老的版本为 A 版本，当我把 Nginx 的版本做完升级（升级为版本 B），通过执行 nginx reload ，此时不会影响 A 版本的所有 master 进程和 work 线程的工作，而直接会在 A 版本的基础上启用 B 版本的 master 进程和 B 版本的 work 线程。</p><br><p>老的这部分流量请求可以继续通过 A 版本来行处理（所以短时间保持存在），新的流量请求则给到了 B 版本的 master 负责。B 版本会把流量给到 B 版本的 work 线程进行处理，当 A 版本所有的原有老的流量处理完以后，A 版本的 master 进程优雅退出，这时候完全过渡给 B 版本。可以看到，通过这样的一种方式，用户的流量能得到平滑的过渡，并不会影响用户的访问。</p><br><p>Nginx reload 这种方式，给了我们进行 Nginx 版本平滑升级提供支持。</p><br><p>如果遇到问题需要进行回滚，在 Nginx 版本做完编译升级之后，Nginx 的启动进程会生成一个 nginx.old 二进制文件（老版本），如果要回滚到老版本，就可以用 nginx.old 来执行 reload，这样就可以用同样的方式把 B 版本回滚到 A 版本的机制下。</p><h2 id="本版升级步骤" tabindex="-1">本版升级步骤 <a class="header-anchor" href="#本版升级步骤" aria-label="Permalink to &quot;本版升级步骤&quot;">​</a></h2><p>接下来，我来为你梳理一下，版本升级的步骤是怎样的。</p><br><p>在做版本升级的时候，之前的已存在版本无论你是通过 yum 的方式安装，还是通过编译的方式安装，对于新版本的升级都要选择源码的方式。我们先在官方下载你所需要升级的源码版本。接下来需要了解系统在编译老版本 Nginx 服务的过程中编译的哪些参数。可以通过 nginx --V 方式，去了解之前编译 Nginx 版本相应的参数是哪些。</p><br><p>最后一步是编译新的版本，我们需要用 nginx --V 将老版本的编译参数提取出来，并在新的版本里进行编译（这样就保证新老版本编译达到一致）。然后就开始执行编译，编译完成以后，就可以执行模拟语法测试，通过新版本的 nginx --c 测试配置文件是否语法正常，如果都正常，就可以通过 Nginx reload 进行平滑的升级。这样就可以把老版本完美过渡到新版本，并且不会影响用户的访问。</p><br><p>整体的步骤就是这样。你需要重点注意的点如下：</p><ol><li><p>了解你的服务在做版本升级时，是否支持平滑升级。</p></li><li><p>升级后回滚方式</p></li><li><p>在正式环境操作前，在测试环境进行一次模拟升级，最后才在线上，避免出现问题。</p></li></ol><h2 id="mysql-数据库切割升级" tabindex="-1">MySQL 数据库切割升级 <a class="header-anchor" href="#mysql-数据库切割升级" aria-label="Permalink to &quot;MySQL 数据库切割升级&quot;">​</a></h2><p>以上就是关于 Nginx 服务版本如何进行平滑升级的讲解，接下来我来给你介绍，如何对 MySQL 这种数据库进行升级切割。</p><br><p>MySQL 数据库的任何迁移或者版本升级都要非常慎重和细致，所以它通常是交给 DBA 的同学负责。首先我来为你讲解MySQL 在停服迁移割接的过程。</p><br>',22),m=s("br",null,null,-1),x=s("p",null,"我们先来看一下这样的一张图，在这张图里我仍然把企业通架构分为入口层、逻辑层和数据层。",-1),y=s("br",null,null,-1),E=s("p",null,"如果我们要做更详细的划分，就可以把逻辑层剥离成业务逻辑层和服务逻辑层。服务逻辑层就是我们现在通常所说的中台，有了服务逻辑层，就可以把公共服务交给中台处理。在数据层如果涉及修改数据库的配置，如：后端需要升级数据库的版本，或者要对数据库进行迁移等，我们都只需要去修改中台和数据库的关联关系配置，而不会干扰到业务层的正常访问。所以这种架构的剥离（采用服务层和数据层直接对接），会更加的合理和方便。",-1),A=s("br",null,null,-1),N=s("p",null,"一个中型企业，通常会把传统的逻辑层进行拆分，分别拆成业务层和服务层，在这种模式的基础上，我们通过这张图来了解 MySQL 的停服割接是如何做到的？",-1),M=s("br",null,null,-1),T=t(`<br><p>这里我把这个图画成了入口层和服务逻辑层，相当于先把业务逻辑层摘除掉了。在这张图里我们会看到，由于停服割接会影响用户访问，所以我们需要先在入口层把用户的请求流量关闭。要关闭用户的请求流量通常在代理上进行维护页面切换。</p><br><p>所以第 1 步我们需要把入口层的请求流量切换到维护页面上，维护页面通常是一个静态页面，它不会对后台的数据库进行 CIDR 的操作。</p><br><p>第 2 步要在数据库这一层进行，首先我们可以锁掉老数据库的写入，只允许前台的数据库读取。然后对数据库这一步做割接的检查，我们要了解老数据库与新数据库的数据是否一致，数据库的状态是否正常，请求流量到底有没有完全关闭（这个过程就是我们在上一个课时所讲到的），完成检查的相关检查项及内容。</p><br><p>所有的内容都检查完毕以后，我们就可以进入到第 3 步：在服务的逻辑层修改连接数据库的地址信息。连接池的信息修改完成以后，我们就可以把入口层的流量整体切回去，撤销维护页面，让服务能够正常对外提供。</p><br><p>以上就是在停服割接时的主要步骤。我们刚讲到了数据库的割接这一块，由于是停服割接，所以我们需要依赖入口层把入口的流量切换到维护页面。假设我们使用的是 Nginx，它怎么去切换到维护页面呢？这里我把配置列出来。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">rewrite ^(.*)$ /maintain.html break;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">rewrite ^(.*)$ /maintain.html break;</span></span></code></pre></div><br><p>在停服割接的模式下，Nginx 要切换到维护页面，我推荐两种方式。第 1 种方式就是用 Nginx 的 rewrite，也就是伪静态的语法格式，把所有的流量请求通过正则匹配的请求路径，全部转给本地已经写好的维护页面(maintain.html)。这种 rewrite 的配置规则就是把所有的请求路径都交给你的维护页面去响应，而不会直接给到你的逻辑层程序，它是由 Nginx 这一层直接来进行操作的。</p><br><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">location / {</span></span>
<span class="line"><span style="color:#E1E4E8;">    access_by_lua_block {</span></span>
<span class="line"><span style="color:#E1E4E8;">        if ngx.var.remote_addr != &quot;221.219.97.238&quot; then</span></span>
<span class="line"><span style="color:#E1E4E8;">        return ngx.redirect(&#39;http://www.jesonc.com/maintain.html&#39;,302);</span></span>
<span class="line"><span style="color:#E1E4E8;">        end</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    proxy_pass http://local;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">location / {</span></span>
<span class="line"><span style="color:#24292E;">    access_by_lua_block {</span></span>
<span class="line"><span style="color:#24292E;">        if ngx.var.remote_addr != &quot;221.219.97.238&quot; then</span></span>
<span class="line"><span style="color:#24292E;">        return ngx.redirect(&#39;http://www.jesonc.com/maintain.html&#39;,302);</span></span>
<span class="line"><span style="color:#24292E;">        end</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    proxy_pass http://local;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><br><p>第 2 种方式借助了 lua，相比第 1 种方式，这种方式更加灵活。举个例子，假如我需要定义白名单（因为在进行停服割接的时候，我们还是希望内部维护人员能够正常请求网站，避免测试完成以后，还会出现业务层的一些问题），这个时候我们就可以在 Nginx 里基于源 IP 地址来开白名单，比如我这里的一段配置，它可以判断源 IP 的地址，如果不是指定的 IP 地址，它会默认去访问指定的维护页面，通过 302 跳转的方式返回临时的重定向，让用户多去访问临时维护页面。如果访问的是指定的源 IP 地址，那么就可以正常访问网站。</p><br><p>这个时候我们就实现了既把正常的用户流量切到维护页面里，同时也开了一个白名单，让技术人员和内部测试人员能够正常的进行网站的测试，而不会因为整体切到维护页面，导致测试这一块不是非常完整。</p><br><p>刚刚我们讲的是在停服割接时 MySQL 的步骤，MySQL 如何实现不停服割接？不停服割接会对人员的投入和 DBA 的相关技术能力提出更高的要求。</p><br>`,23),k=s("br",null,null,-1),S=s("p",null,"还是在这张图里面，我们先要重点解决几个问题，一个是老库和新库的数据如何在不一致的情况下进行恢复和填补，这时我们需要在逻辑层对你的数据开启一个 CIDR 日志，也就是说，我们要在某一个时间，在服务逻辑层上把业务上的 CIDR 日志完整地保留一份。这里的 CIDR就是对数据的增 加、删除和更新。",-1),C=s("p",null,"同时我们还需要开发一个非常重要的工具，我把它命名为 Migration Tools，这个工具通常是企业根据自身业务情况和数据库的表结构情况来进行开发。在不停服割接时，由于服务逻辑层切换了数据库的连接地址，我们可以用 Mgration Tools 通过日志重放的方式重新填平数据上的差异。",-1),q=s("br",null,null,-1),v=s("p",null,"图中有两套数据库，我们知道 MySQL 通常采用主从的方式，老库同步数据给从库，新库我们可以做成一个主从的方式，同时把新库的主做成老库的从库，这样的话就可以把老库的数据通过 binlog 的方式实时同步。在切换完老库和新库以后，数据不一致，我们需要通过 Mgration_tools 基于逻辑层已经写好的日志文件来进行数据的填平。",-1),I=s("br",null,null,-1),D=s("p",null,"刚刚讲到的不停服割接方式是通过 Mgration_tools，直接以同步的数据把老库和新库的数据填平，接下来介绍第 2 种方式，就是做服务层作数据双写。所谓双写就是在服务层同时写两份数据，既写给老库也写给新库。",-1),P=s("br",null,null,-1),Q=s("br",null,null,-1),w=s("p",null,"我们来看一下这种方式是如何实现的，首先在时间点 T1 进行代码版本的升级。这个代码的升级的作用是同时开启双写，既写老库也写新库，这样的话我们会看到在 T1 的时间点之后，所有的数据也会在新库里有一份。在 T2 这个时间点开始割接，老库完全停写，所有的流量都到新库里去，这个时候我们可能会有一个问题，在时间点 T1 之前的数据怎么办呢？这个时候我们也需要去开发一套 Mgration_tools，也就是数据同步的工具，去把老库在 T1 时间点之前的数据同步到新库上。",-1),B=s("br",null,null,-1),L=s("p",null,"以上就是企业在做 MySQL 不停服割接时，对 MySQL 迁移架构设计一些思路上的要求。",-1);function V(f,F,R,K,$,J){const n=e("Image");return p(),i("div",null,[c,_,d,g,h,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/81/4D/Cgq2xl6FmKmAO_CMAAU2syJogr0306.png"}),l(),u,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/81/4D/Cgq2xl6FmKqAJXLOAAIMFmFy9LU520.png"}),b,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/08/37/Ciqah16FmKqAMZZeAAKlVRgND70352.png"}),l(),m,x,y,E,A,N,M,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/08/37/Ciqah16FmKqAQVr8AASygXQDB2I188.png"}),l(),T,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/08/37/Ciqah16FmKuAaVH0AAaOEBkiat0291.png"}),l(),k,S,C,q,v,I,D,P,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/08/37/Ciqah16FmKuADHD8AAT1Jp-tn5U841.png"}),l(),Q,w,B,L])}const j=o(r,[["render",V]]);export{U as __pageData,j as default};
