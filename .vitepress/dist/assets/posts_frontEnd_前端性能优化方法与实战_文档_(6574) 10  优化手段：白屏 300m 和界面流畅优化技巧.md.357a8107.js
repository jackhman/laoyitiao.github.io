import{_ as n,j as p,o,g as l,k as e,Q as s}from"./chunks/framework.4e7d56ce.js";const F=JSON.parse('{"title":"白屏优化 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/前端性能优化方法与实战_文档/(6574) 10  优化手段：白屏 300m 和界面流畅优化技巧.md","filePath":"posts/frontEnd/前端性能优化方法与实战_文档/(6574) 10  优化手段：白屏 300m 和界面流畅优化技巧.md","lastUpdated":1696417798000}'),t={name:"posts/frontEnd/前端性能优化方法与实战_文档/(6574) 10  优化手段：白屏 300m 和界面流畅优化技巧.md"},r=s(`<p>上一讲我介绍了如何保障首屏秒开，除了它，在性能监控当中白屏时间和卡顿也是两个值得注意的优化指标。</p><p>所谓白屏时间，一般是当用户打开一个页面，从开始等待到页面第一个字符出现的时间，白屏时间越短，给人感觉 App 速度快，体验好，能有效降低跳出率。而卡顿，想必你也不陌生，当用户浏览页面，下拉商品列表时，如果页面停止不动，无疑会对业务转化率有很大的影响。</p><p>所以，这一讲我就专门介绍下如何优化白屏时间和卡顿。</p><h3 id="白屏优化" tabindex="-1">白屏优化 <a class="header-anchor" href="#白屏优化" aria-label="Permalink to &quot;白屏优化&quot;">​</a></h3><p>现在我们假设一个场景，有一天你想要在某电商 App 上买个手机，于是你搜索后进入商品列表页，结果屏幕一片空白，过了好久还是没什么内容出现，这时候你是不是会退出来，换另外一个电商 App 呢？这就是白屏时间过长导致用户跳出的情形。</p><p>作为前端开发者，我们遇到这种问题如何解决呢？首先去性能平台上查看白屏时间指标，确认是否是白屏问题。问题确认后，我们可以基于影响白屏时间长短的两个主要因素来解决------<strong>DNS 查询和首字符展示</strong>。</p><h4 id="dns-查询优化" tabindex="-1">DNS 查询优化 <a class="header-anchor" href="#dns-查询优化" aria-label="Permalink to &quot;DNS 查询优化&quot;">​</a></h4><p>DNS 查询是指浏览器发起请求时，需要将用户输入的域名地址转换为 IP 地址的过程，这个转换时间长短就会影响页面的白屏时间。</p><p>那么如何对 DNS 查询进行优化呢？根据 DNS 查询过程，我们可以从前端和客户端这两部分采取措施。</p><p>前端侧，可以通过在页面中加入 <strong>dns-prefetch</strong>，在静态资源请求之前对域名进行解析，从而减少用户进入页面的等待时间。如下所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">meta http</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">equiv</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;x-dns-prefetch-control&quot;</span><span style="color:#E1E4E8;"> content</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;on&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">/&gt;</span></span>
<span class="line"><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">link rel</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;dns-prefetch&quot;</span><span style="color:#E1E4E8;"> href</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;https://s.google.com/&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">meta http</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">equiv</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;x-dns-prefetch-control&quot;</span><span style="color:#24292E;"> content</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;on&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">/&gt;</span></span>
<span class="line"><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">link rel</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;dns-prefetch&quot;</span><span style="color:#24292E;"> href</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;https://s.google.com/&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&gt;</span></span></code></pre></div><p>其中第一行中的 x-dns-prefetch-control 表示开启 DNS 预解析功能，第二行 dns-prefetch 表示强制对 s.google.com 的域名做预解析。这样在 s.google.com 的资源请求开始前，DNS 解析完成，后续请求就不需要重复做解析了。不要小看这个标签哦，它可以为你减少 150ms 左右的 DNS 解析时间。</p><p>客户端侧呢？可以在启动 App 时，同步创建一个肉眼不可见的 WebView（例如 1*1 像素的 webview），将常用的静态资源路径写入这个 WebView 中，然后对它做域名解析并放入缓存中。这样后面需要使用 WebView 打开真正所需的页面时，由于已经做过域名解析了，客户端直接从缓存中获取即可。</p><p>当然如果是端外页面，因为没在 App 里面，就没法使用 1*1 WebView 的策略了，我们可以使用 iframe ，也能达到类似效果。</p><p>以上是一个轻量级的方案，通过它可以将 DNS 解析时间控制在 400ms以内（这个算是比较快的）。如果你想要将耗时进一步压缩，比如控制在 200ms，此时就需要一个重量级的方案了。具体来说，可以采用 IP 直连方式，原来是请求<a href="http://www.google.com%EF%BC%8C?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">www.google.com</a>，现在我们通过调用 SDK 进行域名解析，拿到对应的 IP（如 6.6.6.6），然后直接请求这个 IP 地址拿到数据。</p><p>当然，这个实现起来需要避过许多坑，比如，HTTPS 证书和配置文件。</p><p>Https 证书是指当客户端使用 IP 直连时，请求 URL 中的 host 会被替换成对应的 IP，所以在证书验证时，会出现 domain 不匹配的情况，导致 SSL/TLS 握手不成功。</p><p>怎么解决呢？在非 SNI（Server Name Indication，表示单 IP多域名）的场景下，可以把证书验证环节独立出来 （如 Hook证书校验环节），然后将 IP 替换为原来的域名。在 SNI 场景下，可以定制 SSLSocketFactory，在 createSocket 时替换为 IP，并进行 SNI/HostNameVerify 配置。</p><p>而配置文件方面，一般在域名只有两三个的情况时，我们可以用到它来做 IP 和域名的映射。但随着机房的扩大，每次扩机器都要升级配置文件，后续会非常麻烦。</p><p>对此我们可以采用 httpDNS 来解决。这是因为 httpDNS 可以准确调度到对应区域的服务器 IP 地址给用户，同时还可以避免运行商 DNS 劫持。具体来说， SDK 会通过发报文（类似系统向 DNS 运营商发的报文）向 httpDNS 做一个 HTTP 请求（也是通过 IP 直接请求），请求通过后拿到对应域名，然后进行 IP 直连，完成资源或者数据接口请求。</p><h4 id="首字符展示优化" tabindex="-1">首字符展示优化 <a class="header-anchor" href="#首字符展示优化" aria-label="Permalink to &quot;首字符展示优化&quot;">​</a></h4><p>所谓首字符展示，通常我们会在页面加载过程中出现一个 loading 图，用来告诉用户页面内容需要加载，请耐心等待。但这样一个 loading 图既无法让用户感受到页面加载到什么程度，也无法给用户视觉上一个焦点，让人们的注意力集中在上面。</p><p>如何解决这个问题呢？我们可以使用<strong>骨架屏</strong>。骨架屏（Skeleton Screen）是指在页面数据加载完成前，先给用户展示出页面的大致结构（灰色占位图），告诉用户页面正在渐进式地加载中，然后在渲染出实际页面后，把这个结构替换掉。骨架屏并没有真正减少白屏时间，但是给了用户一个心理预期，让他可以感受到页面上大致有什么内容。</p><p>那么，如何构建骨架屏呢？因为考虑到每次视觉修改或者功能迭代，骨架屏都要配合修改，我建议采用<strong>自动化方案</strong>，而不是手动骨架屏方案（也就是自己编写骨架屏代码）。骨架屏的实现方法有以下三个步骤。</p><p>步骤一，确定生成规则，遍历所有的 DOM 元素。针对特定区块（如视频、音频）生成相应的代码块，获取原始页面中 DOM 节点的宽度、高度和距离视窗的位置，计算出当前设备快高对应的大小，转换成相应的百分比，然后来适配不同的设备。</p><p>步骤二，基于上述规则结合 CLI 工具可以通过脚手架自动生成骨架屏</p><p>步骤三，将骨架屏自动化注入页面，再利用 Puppeteer 把骨架屏代码注入页面中自动运行。整个过程比较复杂，且有不少坑，具体实现原理，我会在 14 讲详细介绍。</p><p>以上就是白屏时间优化方面相关的内容，但即便首屏展示比较快，如果有卡顿的现象，用户操作也会很不流畅，那怎么解决这个问题呢。下面我们就讲聊聊卡顿治理。</p><h3 id="卡顿治理" tabindex="-1">卡顿治理 <a class="header-anchor" href="#卡顿治理" aria-label="Permalink to &quot;卡顿治理&quot;">​</a></h3><p>卡顿现象，一般可以通过用户反馈或性能平台来发现。比如我们接到用户说某页面比较卡，然后在性能平台上查看卡顿指标后，发现页面出现连续 5 帧超过 50ms ，这就属于严重卡顿。如何处理呢？</p><p>首先也还是问题的定位，先通过 charles 等工具抓包看一下数据接口，如果是和数据相关的问题，找后端同事，或者用数据缓存的方式解决。如果问题出在前端，一般和以下两种情形有关：<strong>浏览器的主线程与合成线程调度不合理，以及计算耗时操作</strong>。</p><h4 id="浏览器的主线程与合成线程调度不合理" tabindex="-1">浏览器的主线程与合成线程调度不合理 <a class="header-anchor" href="#浏览器的主线程与合成线程调度不合理" aria-label="Permalink to &quot;浏览器的主线程与合成线程调度不合理&quot;">​</a></h4><p>比如，在某电商 App 页面点击抽奖活动时，遇到一个红包移动的效果，在红包位置变化时，页面展现时特别卡，这就是主线程和合成线程调度的问题。怎么解决呢？</p><p>一般来说，主线程主要负责运行 JavaScript，计算 CSS 样式，元素布局，然后交给合成线程，合成线程主要负责绘制。当使用 height、width、margin、padding 等作为 transition 值时，会让主线程压力很大。此时我们可以使用 transform 来代替直接设置 margin 等操作。</p><p>比如红包元素从 margin-left:-10px 渲染到 margin-left:0，主线程需要计算样式 margin-left:-9px，margin-left:-8px，一直到 margin-left:0，每一次主线程计算样式后，合成线程都需要绘制到 GPU 再渲染到屏幕上，来来回回需要进行 10 次主线程渲染，10 次合成线程渲染，这给浏览器造成很大压力，从而出现卡顿。</p><p>如何解决呢？我们可以利用 transform 来做，比如 tranform:translate(-10px,0) 到 transform:translate(0,0)，主线程只需要进行一次tranform:translate(-10px,0) 到 transform:translate(0,0)，然后合成线程去一次将 -10px 转换到 0px。这样的话，总计 11 次计算，可以减少 9 步操作，假设一次 10ms，将减少 90ms。</p><h4 id="计算耗时操作" tabindex="-1">计算耗时操作 <a class="header-anchor" href="#计算耗时操作" aria-label="Permalink to &quot;计算耗时操作&quot;">​</a></h4><p>除了主线程和合成线程调度不合理导致的卡顿，还有因为计算耗时过大导致的卡顿。遇到这类问题，一般有两种解法：空间换时间和时间换空间。</p><p>空间换时间方面，比如你需要频繁增加删除很多 DOM 元素，这时候一定会很卡，在对 DOM 元素增删的过程中最好先在 DocumentFragment （DOM文档碎片）上操作，而不是直接在 DOM上操作。只在最后一步操作完成后，将所有 DocumentFragment 的变动更新到 DOM上，从而解决频繁更新 DOM 带来的卡顿问题。</p><p>至于时间换空间，一般是通过将一个复杂的操作细分成一个队列，然后通过多次操作解决复杂操作的问题。</p><p>比如 2010 年时，我做过一个 WebIM 离线消息的项目，其中一个功能是将批量消息下载到本地，点击下载后，由于文件过大，浏览器出现卡顿甚至卡死的情况。怎么办？最后我通过实现一个 Chunk 方法，创建了一个队列，定时取出队列的任务，然后在本地服务器上将内容再次合并的方式来解决。代码示例如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function </span><span style="color:#B392F0;">chunk</span><span style="color:#E1E4E8;">(array,process,context){</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">setTimeout</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">function</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//shift方法可以获取队列中下一个要处理的项目</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> item</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">array.</span><span style="color:#B392F0;">shift</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//通过call调用的process函数，这样可以设置一个合适的执行环境（如果必须）</span></span>
<span class="line"><span style="color:#E1E4E8;">        process.</span><span style="color:#B392F0;">call</span><span style="color:#E1E4E8;">(context,item);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(array.length</span><span style="color:#F97583;">&gt;</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">setTimeout</span><span style="color:#E1E4E8;">(arguments.callee,</span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function </span><span style="color:#6F42C1;">chunk</span><span style="color:#24292E;">(array,process,context){</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">setTimeout</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">function</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//shift方法可以获取队列中下一个要处理的项目</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> item</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">array.</span><span style="color:#6F42C1;">shift</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//通过call调用的process函数，这样可以设置一个合适的执行环境（如果必须）</span></span>
<span class="line"><span style="color:#24292E;">        process.</span><span style="color:#6F42C1;">call</span><span style="color:#24292E;">(context,item);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(array.length</span><span style="color:#D73A49;">&gt;</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">setTimeout</span><span style="color:#24292E;">(arguments.callee,</span><span style="color:#005CC5;">100</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    },</span><span style="color:#005CC5;">100</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>具体来说，我是通过 array.shift 将数组切分为不同的队列任务，调用 setTimeout 方法设置 100ms 的延时，最后将调用 process.call 方法去执行，从而解决了复杂任务带来的卡顿问题。</p><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3>`,44),c=s(`<p>好了，以上就是白屏时间优化和卡顿治理相关的内容。</p><p>在卡顿治理方面，我提到使用 Settimeout 分割队列，但在实际使用时，尤其是做动画时候要注意，Settimeout 设置定时时间不准（比如设置 0ms 延迟，实际中会延迟 4ms 左右），如果时间间隔过小（如小于 16ms），还会出现因为掉帧导致的卡顿，所幸新版本浏览器（IE10+）提供了requestAnimationFrame 方法，我们可以封装一个兼容性方法较好解决它。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">window.requestAnimationFrame </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">function</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> window.requestAnimationFrame </span><span style="color:#F97583;">||</span></span>
<span class="line"><span style="color:#E1E4E8;">            window.webkitRequestAnimationFrame </span><span style="color:#F97583;">||</span></span>
<span class="line"><span style="color:#E1E4E8;">            window.mozRequestAnimationFrame </span><span style="color:#F97583;">||</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">function</span><span style="color:#E1E4E8;">(callback){</span></span>
<span class="line"><span style="color:#E1E4E8;">                window.</span><span style="color:#B392F0;">setTimeout</span><span style="color:#E1E4E8;">(callback,</span><span style="color:#79B8FF;">1000</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">60</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">}())</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">window.requestAnimationFrame </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span><span style="color:#6F42C1;">function</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> window.requestAnimationFrame </span><span style="color:#D73A49;">||</span></span>
<span class="line"><span style="color:#24292E;">            window.webkitRequestAnimationFrame </span><span style="color:#D73A49;">||</span></span>
<span class="line"><span style="color:#24292E;">            window.mozRequestAnimationFrame </span><span style="color:#D73A49;">||</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">function</span><span style="color:#24292E;">(callback){</span></span>
<span class="line"><span style="color:#24292E;">                window.</span><span style="color:#6F42C1;">setTimeout</span><span style="color:#24292E;">(callback,</span><span style="color:#005CC5;">1000</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">60</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">}())</span></span></code></pre></div><p>下面给你留一个问题：</p><blockquote><p>你在实际开发中，遇到那些页面卡顿的问题？</p></blockquote><p>欢迎在评论区和我沟通，接下来我们进入下一讲，性能专项测试。</p>`,6);function i(E,y,m,d,h,u){const a=p("Image");return o(),l("div",null,[r,e(a,{alt:"溪风的思维导图.png",src:"https://s0.lgstatic.com/i/image6/M00/25/74/CioPOWBZsmGADD2WAAJSwP3lgjs259.png"}),c])}const _=n(t,[["render",i]]);export{F as __pageData,_ as default};
