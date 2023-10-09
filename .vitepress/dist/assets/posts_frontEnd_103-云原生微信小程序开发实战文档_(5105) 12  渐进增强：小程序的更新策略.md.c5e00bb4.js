import{_ as o,j as e,o as t,h as r,k as p,f as s,Q as l,s as a}from"./chunks/framework.d3daa342.js";const U=JSON.parse('{"title":"12渐进增强：小程序的更新策略","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5105) 12  渐进增强：小程序的更新策略.md","filePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5105) 12  渐进增强：小程序的更新策略.md","lastUpdated":1696682708000}'),c={name:"posts/frontEnd/103-云原生微信小程序开发实战文档/(5105) 12  渐进增强：小程序的更新策略.md"},E=l('<h1 id="_12渐进增强-小程序的更新策略" tabindex="-1">12渐进增强：小程序的更新策略 <a class="header-anchor" href="#_12渐进增强-小程序的更新策略" aria-label="Permalink to &quot;12渐进增强：小程序的更新策略&quot;">​</a></h1><p>今天是模块三的最后一讲，我会从&quot;更新&quot;的角度出发，带你学习怎么搭建一套渐进增强的小程序版本更新策略。</p><p>小程序的资源可以笼统地分为前端和后端资源：前端资源也可以被称为端侧资源（包括脚本、样式文件等），后端资源指的是小程序的一些服务接口。</p><p>今天我就带你从这两个角度切入，学习小程序端侧资源的更新策略，以及后端服务的灰度发布策略。当然了，虽然前端开发者比较关心端侧，但还是有必要了解一些后端的知识，有两个原因。</p><ul><li><p>小程序的更新很多时候都是前后端整体的更新；</p></li><li><p>后端的知识能够扩宽你的技术视野，当你想成为一名全栈工程师甚至架构师时就会用到这些知识。</p></li></ul><p>所以这一讲我会侧重小程序的端侧更新策略，后端灰度发布的内容占比会相对少一些。</p><h3 id="端侧更新策略" tabindex="-1">端侧更新策略 <a class="header-anchor" href="#端侧更新策略" aria-label="Permalink to &quot;端侧更新策略&quot;">​</a></h3><p>开发小程序的技术栈虽然和传统前端非常相似，但在端侧资源的更新策略上却有明显的差异，其根源在于小程序特殊的端侧资源管理机制，所以要理解更新策略就要先了解这些知识。</p><p>在这个过程中，我会对照传统前端（或者也可以认为是浏览器对网站的前端资源管理机制），讲解小程序端侧资源管理机制，这样能便于你理解，让你更清晰地知道二者的差异。</p><p><strong>网站的前端资源可以分为动态资源和静态资源，</strong> 静态的资源包括 js、css、图片等文件，为了提高性能通常会将这些文件尽量缓存到本地。动态的资源只有 HTML 文件。</p><p>网站的HTML 文件最初是由服务端通过模板引擎渲染出来的，比如 freemarker、smarty 等，现在仍然有很多网站使用这种方式，不过更流行的是用 React/Vue SSR 以及 SPA 的静态 HTML。</p><p>虽然在 SPA 架构中，HTML 文件与 js 文件、css文件一样作为静态资源部署，但跟 js 和 css 不同的是，我们并不会让浏览器缓存 HTML 文件，而是通过服务器配置将 HTML 文件的 HTTP 请求的 Cache-Control Header 设置为 no-cache 。这是为了保证用户每次打开网站都会得到最新版的 HTML 文件，而其他静态资源都要通过 HTML 文件才会被引入，这保证了HTML 文件的实时性，也保证了网站所有静态资源的实时性。</p><p>跟网站不同的是，小程序的&quot;所有&quot;端侧资源都是静态的（&quot;所有&quot;我加了引号是因为它指的是小程序代码包中的所有文件，至于代码中引用的外部文件不在我们的讨论范围之内）。</p><p>小程序的资源是托管在微信服务器上的，跟网站不同，微信不会在用户每次打开小程序时，从服务器拉取最新的小程序资源，而是尽可能地发挥缓存的优势（触发拉取新版本资源的时机有很多种，稍后我会一条条地讲）。先来看下面这张图：</p>',14),y=l('<p>小程序端侧资源管理机制</p><p>当用户打开小程序时，微信客户端会先从缓存中拉取小程序的端侧资源，有的话就展示给用户，没有的话会从微信服务器拉取，这时，拉取的肯定是最新版本，然后放入缓存并展示给用户。</p><p><strong>以上就是小程序的端侧资源的管理机制。<strong>从这套流程里你会发现一个问题：既然优先使用缓存中的资源，那么当我发布了小程序新版本之后，怎么保证用户</strong>尽可能快</strong> 地更新为新版本呢？<strong>这就是我们要讨论的重点：小程序的端侧资源更新机制。</strong></p><p>前面我提到&quot;触发拉取新版本资源的时机有很多种&quot;。本地没有缓存会触发是最简单的一种时机，除此之外还有两种时机。</p><ul><li><p><strong>未启动时：</strong> 指的是小程序处于非活跃状态时（比如处于后台），但是请注意，这种状态是用户已经用过小程序后才会产生的，如果用户从来都没有用过你的小程序，就不存在状态的概念了，因为对于这个用户来说，你的小程序是无状态的。</p></li><li><p><strong>冷启动时：</strong> 小程序被销毁重新打开后会进入冷启动状态（我们在11讲也提到了这个机制，不记得了要及时复习）。</p></li></ul><p>当你在小程序管理后台发布新版本的小程序之后，微信会根据用户设备上小程序的状态实施不同的更新策略。</p><p><strong>如果小程序处于未启动状态，</strong> 微信客户端会在&quot;若干个时机&quot;去检查缓存中的小程序有没有新版本，如果有会默默把新版本资源拉取到本地缓存中。请注意，&quot;若干时机&quot;并不是我瞎说的，而是<a href="https://developers.weixin.qq.com/miniprogram/dev/framework/runtime/update-mechanism.html" target="_blank" rel="noreferrer">官方说明</a>，而这部分信息对于开发者来说是不透明的，但是有一点可以确定，那就是当你发布了新版本小程序后，无法<strong>立刻</strong>让所有用户体验最新版（至于多久能覆盖所有用户，官方说明最晚24小时）。整个流程请看下图：</p>',7),i=a("p",null,"小程序端侧资源更新机制（未启动时）",-1),_=a("p",null,[a("strong",null,"如果小程序处于冷启动状态"),s("，微信客户端会主动检查是否有新版本，同时会向用户展示缓存中的旧版本。有新版本的话会默默地拉取到本地，然后在用户再次触发小程序冷启动时展示给用户。也就是说，需要两次冷启动才能将最新版本的小程序展示给用户。整个流程如下图所示：")],-1),d=a("p",null,"小程序端侧资源更新机制（冷启动时）",-1),g=a("p",null,[a("strong",null,'从上述内容中，你可以得出一个结论：当你发布一个新版本后，用户并不能"立即"获得更新。')],-1),F=a("p",null,'在传统前端领域，当网站发布新版本之后，用户下次打开或刷新之后就会"立即"体验到新版本，没有延迟。但是在小程序场景下，更新之后并不是"立即"让用户体验到新版，而是"尽可能快"。',-1),u=a("p",null,[s("从官方描述中，小程序未启动时最慢 24 小时可以覆盖全部用户，或者需要经历两次冷启动，这对一些紧急的版本更新来说太慢了，所以在现实工作中往往要将小程序的更新提速，让用户尽可能快地获取到新版本。具体实施方法是通过小程序的"),a("a",{href:"https://developers.weixin.qq.com/miniprogram/dev/api/base/update/UpdateManager.html",target:"_blank",rel:"noreferrer"},"UpdateManager"),s("对象，在代码里主动检查并应用更新信息。我们对照流程图和代码讲解，来看下面这张图：")],-1),h=l(`<p>小程序端侧资源更新策略（优化版）</p><p>以及如下代码：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">axios</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;axios&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">updateManager</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> wx.</span><span style="color:#B392F0;">getUpdateManager</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">updateManager.</span><span style="color:#B392F0;">onCheckForUpdate</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">res</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 将是否有新版本信息挂载到全局对象上</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.globalData.hasUpdate </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> res.hasUpdate</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#E1E4E8;">updateManager.</span><span style="color:#B392F0;">onUpdateReady</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">!</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.globalData.hasUpdate){</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">miniProgram</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> wx.</span><span style="color:#B392F0;">getAccountInfoSync</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 获取当前小程序的版本号</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">currVersion</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> miniProgram.version</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 从你的开发者服务器接口中获取是否有紧急版本需要更新</span></span>
<span class="line"><span style="color:#E1E4E8;">  axios.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">\`\${</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">your</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">url</span><span style="color:#F97583;">?</span><span style="color:#9ECBFF;">}</span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;">currVersion</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">$</span><span style="color:#9ECBFF;">{</span><span style="color:#E1E4E8;">currVersion</span><span style="color:#9ECBFF;">}</span><span style="color:#9ECBFF;">\`).then(res=&gt;{</span></span>
<span class="line"><span style="color:#9ECBFF;">    if(res.needUpdate){</span></span>
<span class="line"><span style="color:#9ECBFF;">      // 紧急版本立即重启小程序应用更新</span></span>
<span class="line"><span style="color:#9ECBFF;">      updateManager.applyUpdate()</span></span>
<span class="line"><span style="color:#9ECBFF;">    }</span></span>
<span class="line"><span style="color:#9ECBFF;">  })</span></span>
<span class="line"><span style="color:#9ECBFF;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">axios</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;axios&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">updateManager</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> wx.</span><span style="color:#6F42C1;">getUpdateManager</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">updateManager.</span><span style="color:#6F42C1;">onCheckForUpdate</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">res</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 将是否有新版本信息挂载到全局对象上</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.globalData.hasUpdate </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> res.hasUpdate</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#24292E;">updateManager.</span><span style="color:#6F42C1;">onUpdateReady</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">!</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.globalData.hasUpdate){</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">miniProgram</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> wx.</span><span style="color:#6F42C1;">getAccountInfoSync</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 获取当前小程序的版本号</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">currVersion</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> miniProgram.version</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 从你的开发者服务器接口中获取是否有紧急版本需要更新</span></span>
<span class="line"><span style="color:#24292E;">  axios.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#032F62;">\`\${</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">your</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">url</span><span style="color:#D73A49;">?</span><span style="color:#032F62;">}</span><span style="color:#D73A49;">?</span><span style="color:#24292E;">currVersion</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">$</span><span style="color:#032F62;">{</span><span style="color:#24292E;">currVersion</span><span style="color:#032F62;">}</span><span style="color:#032F62;">\`).then(res=&gt;{</span></span>
<span class="line"><span style="color:#032F62;">    if(res.needUpdate){</span></span>
<span class="line"><span style="color:#032F62;">      // 紧急版本立即重启小程序应用更新</span></span>
<span class="line"><span style="color:#032F62;">      updateManager.applyUpdate()</span></span>
<span class="line"><span style="color:#032F62;">    }</span></span>
<span class="line"><span style="color:#032F62;">  })</span></span>
<span class="line"><span style="color:#032F62;">})</span></span></code></pre></div><p>首先在代码中创建一个 UpdateManager 对象，然后添加 onCheckForUpdate 和onUpdateReady 监听，当微信客户端从微信服务器中获取到小程序的更新信息后会触发 onCheckForUpdate 函数，入参携带 hasUpdate 属性标记是否有新版本未更新。我们将这个信息挂载到全局对象上以便后续使用。</p><p>当微信客户端从微信服务器中将最新版本的小程序端侧资源拉取到本地之后，会触发 onUpdateReady 函数，此时需要你的开发者服务器提供一个接口，对应上述代码中的 your-url。这个接口的入参是用户当前使用的小程序版本，然后根据这个版本号判断当前用户的小程序版本是否存在严重 Bug 需要更新到最新版本。你需要在小程序的脚本代码中，当onUpdateReady 函数被触发时调用这个接口，如果需要更新则通过调用 updateManager.applyUpdate() 强制重启小程序应用更新。</p><p>上述这套更新机制相比较需要两次冷启动的默认更新机制来说，能够减少一次冷启动的时间，能更快速地令用户获取最新版本的小程序，对于一些修复紧急 Bug 的版本是一种行之有效的方案。当然，我们只展示了端侧的调用流程，在后端发布小程序时，你需要记录每次发布版本的详细信息，包括是否有紧急 Bug 修复，这样才能够为端侧的调用提供数据来源。</p><h3 id="后端服务灰度发布策略" tabindex="-1">后端服务灰度发布策略 <a class="header-anchor" href="#后端服务灰度发布策略" aria-label="Permalink to &quot;后端服务灰度发布策略&quot;">​</a></h3><p>作为一名前端开发者，大多数情况下不需要关注后端服务的发布策略，但对于一些实施大前端架构的技术团队来说，前端开发者也需要一定的服务端开发工作，比如 Node.js。即使你现在没有涉及 Node.js 的开发，了解一些后端服务的发布策略也能够增加你的竞争力。</p><p>后端服务的发布流程中有一个非常重要且通用的策略：灰度发布。所谓的灰度发布简单理解就是将新版本的服务只向一定比例的用户开放，而另一部分用户仍然使用旧版本的服务，然后观察新版本的状态，如果一切正常则慢慢扩大新版本的用户比例，直到全部用户都切入新版本，便完成了灰度发布的全流程。</p><p>灰度发布需要提前制定用户请求的转发策略，一般有两种：</p><ul><li><p>按照新旧服务所占用的服务器比例随机转发；</p></li><li><p>按照用户的 ID 转发。</p></li></ul><p>第一种简单粗暴，比如你有 10 台服务器，其中 2 台部署了新版本的服务，负载均衡器会在接收到用户请求时按照 20% 的概率随机转发到新版本服务器上，剩余的转发到旧版本服务器。</p><p>第二种需要进行一定的编码工作，比如 Nginx 配置 Lua 脚本，当接收到用户请求时，从请求中获取到用户的 ID ，在小程序场景下就是用户的 OpenId ，然后匹配转发策略中是否这个 ID 在新版本服务的白名单中，如果是的话便转发到新版本服务，否则转发到旧版本服务。如下图所示：</p>`,13),A=l('<p>灰度服务转发机制</p><p>对于后端服务的灰度发布策略的讲解就到此为止，我们并没有深入到技术实现细节，主要的目的是为了让你了解灰度发布这个概念。**之所以讲这部分内容有两个目的：**一是为了让你学习一些后端服务的领域知识，提高竞争力；二是因为在下个模块我们将进入到云开发的学习中，你会学习到更多后端开发的内容，到那时候，后端服务的灰度发布就是你必不可少的一种能力。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>今天这节课我们学习了小程序的更新策略，主要是讲解端侧资源的更新机制，顺带学习了后端服务的灰度发布这个概念。通过今天的学习我希望你能够掌握以下几点：</p><ul><li><p>充分了解小程序的端侧资源更新机制；</p></li><li><p>基于第一条指定更快速的端侧资源更新策略；</p></li><li><p>了解灰度发布的概念。</p></li></ul><p>今天的课后作业需要你动一动手：请尝试自己实现今天所学的使用 UpdateManager 更新小程序的流程。我相信动手之后，你能够更深入的理解这个对象的使用方法和背后的设计思想。</p>',6);function C(m,D,B,T,f,q){const n=e("Image");return t(),r("div",null,[E,p(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/7E/B0/CgqCHl_PRYSAdUKlAABkJXQQRno160.png"}),s(),y,p(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/7E/A4/Ciqc1F_PRaSAB7h_AACK3mY3DIc474.png"}),s(),i,_,p(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/7E/B0/CgqCHl_PRayAPuEBAAB-vKUufFE603.png"}),s(),d,g,F,p(n,{alt:"12.png",src:"https://s0.lgstatic.com/i/image/M00/80/34/CgqCHl_Qgs6AcbdkAAB5dqXFBXM900.png"}),s(),u,p(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/7E/B0/CgqCHl_PRbiAQW0PAADXPXeI_Sk990.png"}),s(),h,p(n,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/7E/A5/Ciqc1F_PRemAUTGuAACQ960V97c989.png"}),s(),A])}const P=o(c,[["render",C]]);export{U as __pageData,P as default};
