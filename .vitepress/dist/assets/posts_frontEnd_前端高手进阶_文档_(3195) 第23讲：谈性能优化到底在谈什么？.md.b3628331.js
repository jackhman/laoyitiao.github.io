import{_ as p,j as o,o as e,h as t,k as a,f as l,Q as s}from"./chunks/framework.d3daa342.js";const m=JSON.parse('{"title":"第23讲：谈性能优化到底在谈什么？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/前端高手进阶_文档/(3195) 第23讲：谈性能优化到底在谈什么？.md","filePath":"posts/frontEnd/前端高手进阶_文档/(3195) 第23讲：谈性能优化到底在谈什么？.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/前端高手进阶_文档/(3195) 第23讲：谈性能优化到底在谈什么？.md"},c=s(`<h1 id="第23讲-谈性能优化到底在谈什么" tabindex="-1">第23讲：谈性能优化到底在谈什么？ <a class="header-anchor" href="#第23讲-谈性能优化到底在谈什么" aria-label="Permalink to &quot;第23讲：谈性能优化到底在谈什么？&quot;">​</a></h1><p>性能是前端领域关注度非常高的话题，因为页面性能的好坏会直接影响用户体验。为了不断提升用户体验，前端工程师往往会对页面性能不断改进，而这个改进的过程就叫性能优化。这一讲我们就详细探究性能优化相关的内容。</p><h3 id="性能指标" tabindex="-1">性能指标 <a class="header-anchor" href="#性能指标" aria-label="Permalink to &quot;性能指标&quot;">​</a></h3><p>什么是性能？性能是指程序的运行速度，而前端性能是指页面的响应速度，提到速度必然离不开一个变量，那就是时间。所以我们会看到性能指标都是以时间为单位来测量的。</p><p>前端性能的指标有很多，本讲从是否可以通过浏览器采集上报，是否由权威组织或大型公司提出，以及是否严重影响用户体验这 3 个方面考虑，选取了下面一些重要的指标。</p><h4 id="首屏绘制-first-paint-fp" tabindex="-1">首屏绘制（First Paint，FP） <a class="header-anchor" href="#首屏绘制-first-paint-fp" aria-label="Permalink to &quot;首屏绘制（First Paint，FP）&quot;">​</a></h4><p>首屏绘制由 W3C 标准 <a href="https://www.w3.org/TR/paint-timing/#sec-paint-timing" target="_blank" rel="noreferrer">Paint Timing</a> 中提出。</p><p>首屏绘制时间是指从开始加载到浏览器首次绘制像素到屏幕上的时间，也就是页面在屏幕上首次发生视觉变化的时间。注意首屏绘制不包括默认的背景绘制，但包括非默认的背景绘制。由于首次绘制之前网页呈现默认背景白色，所以也俗称&quot;<strong>白屏时间</strong>&quot;。</p><p>获取到这个指标值也非常简单，在 HTML5 下可以通过 performance API 来获取，具体代码如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">performance.</span><span style="color:#B392F0;">getEntriesByType</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;paint&#39;</span><span style="color:#E1E4E8;">)[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">] </span></span>
<span class="line"><span style="color:#6A737D;">/* </span></span>
<span class="line"><span style="color:#6A737D;">{ </span></span>
<span class="line"><span style="color:#6A737D;">  duration: 0, </span></span>
<span class="line"><span style="color:#6A737D;">  entryType: &quot;paint&quot;, </span></span>
<span class="line"><span style="color:#6A737D;">  name: &quot;first-paint&quot;, </span></span>
<span class="line"><span style="color:#6A737D;">  startTime: 197.58499998715706, </span></span>
<span class="line"><span style="color:#6A737D;">} </span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">performance.</span><span style="color:#6F42C1;">getEntriesByType</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;paint&#39;</span><span style="color:#24292E;">)[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">] </span></span>
<span class="line"><span style="color:#6A737D;">/* </span></span>
<span class="line"><span style="color:#6A737D;">{ </span></span>
<span class="line"><span style="color:#6A737D;">  duration: 0, </span></span>
<span class="line"><span style="color:#6A737D;">  entryType: &quot;paint&quot;, </span></span>
<span class="line"><span style="color:#6A737D;">  name: &quot;first-paint&quot;, </span></span>
<span class="line"><span style="color:#6A737D;">  startTime: 197.58499998715706, </span></span>
<span class="line"><span style="color:#6A737D;">} </span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span></code></pre></div><p>这里通过 performance.getEntriesByType() 函数返回了一个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceEntry" target="_blank" rel="noreferrer">PerformanceEntry</a> 实例组成的数组，其中，duration 为该事件的耗时，entryType 为性能指标实例的类型，name 为指标名称，startTime 为指标采集时间。</p><h4 id="首屏内容绘制-first-contentful-paint-fcp" tabindex="-1">首屏内容绘制（First Contentful Paint，FCP） <a class="header-anchor" href="#首屏内容绘制-first-contentful-paint-fcp" aria-label="Permalink to &quot;首屏内容绘制（First Contentful Paint，FCP）&quot;">​</a></h4><p>首屏内容绘制由 W3C 标准 <a href="https://www.w3.org/TR/paint-timing/#sec-paint-timing" target="_blank" rel="noreferrer">Paint Timing</a> 中提出。浏览器首次绘制来自 DOM 的内容时间，这个内容可以是文字、图片（也包括背景图片）、非空白的 canvas 和 svg。</p><p>由于是 W3C 标准提出的，所以 Performance API 也提供了这个指标值，具体代码如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">performance.</span><span style="color:#B392F0;">getEntriesByType</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;paint&#39;</span><span style="color:#E1E4E8;">)[</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">] </span></span>
<span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">{ </span></span>
<span class="line"><span style="color:#6A737D;">  duration: 0, </span></span>
<span class="line"><span style="color:#6A737D;">  entryType: &quot;paint&quot;, </span></span>
<span class="line"><span style="color:#6A737D;">  name: &quot;first-contentful-paint&quot;, </span></span>
<span class="line"><span style="color:#6A737D;">  startTime: 797.8649999859044 </span></span>
<span class="line"><span style="color:#6A737D;">} </span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">performance.</span><span style="color:#6F42C1;">getEntriesByType</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;paint&#39;</span><span style="color:#24292E;">)[</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">] </span></span>
<span class="line"><span style="color:#6A737D;">/*</span></span>
<span class="line"><span style="color:#6A737D;">{ </span></span>
<span class="line"><span style="color:#6A737D;">  duration: 0, </span></span>
<span class="line"><span style="color:#6A737D;">  entryType: &quot;paint&quot;, </span></span>
<span class="line"><span style="color:#6A737D;">  name: &quot;first-contentful-paint&quot;, </span></span>
<span class="line"><span style="color:#6A737D;">  startTime: 797.8649999859044 </span></span>
<span class="line"><span style="color:#6A737D;">} </span></span>
<span class="line"><span style="color:#6A737D;">*/</span></span></code></pre></div><p>和获取 FP 值的唯一区别就在于通过 performance.getEntriesByType() 函数获取到 PerformanceEntry 实例数组的下标值不一样，FP 为第 1 个元素，FCP 为第 2 个元素。</p><p>FCP 有时候会和 FP 时间相同，也可能晚于 FP。这也很好理解，FP 只需要满足&quot;开始绘制&quot;这一个条件就可以了，而 FCP 还要满足第二个条件，那就是&quot;绘制的像素有内容&quot;。</p><h4 id="可交互时间-time-to-interactive-tti" tabindex="-1">可交互时间（Time to Interactive，TTI） <a class="header-anchor" href="#可交互时间-time-to-interactive-tti" aria-label="Permalink to &quot;可交互时间（Time to Interactive，TTI）&quot;">​</a></h4><p>可交互时间由 <a href="https://wicg.io/" target="_blank" rel="noreferrer">Web 孵化器社区组（WICG）</a>提出，是指网页在视觉上都已渲染出了，浏览器可以响应用户的操作了。虽然理解起来比较简单，但实际测量起来要考虑两个条件：第一个条件是主线程的长任务（长任务是指耗时超过 50 ms）执行完成后，第二个条件是随后网络静默时间达到 5 秒，这里的静默时间是指请求数不超过 2 个， 排除失败的资源请求和未使用 GET 方法进行的网络请求。</p><p>具体参考下面这张图片。</p>`,20),i=s(`<p>TTI 示意图</p><p>从上图可以看出，主线程第二个橙色部分的长任务执行完成后，主线程执行了两个任务之后发起了一个新的网络请求，但此时仍处于静默状态。所以 TTI 就是第二个长任务结束后的时间。</p><p>TTI 测量可以使用 Google 提供的模块 <a href="https://www.npmjs.com/package/tti-polyfill" target="_blank" rel="noreferrer">tti-polyfill</a>，示例代码如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> ttiPolyfill from &#39;tti</span><span style="color:#FDAEB7;font-style:italic;">-</span><span style="color:#E1E4E8;">polyfill&#39;; </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">ttiPolyfill.</span><span style="color:#B392F0;">getFirstConsistentlyInteractive</span><span style="color:#E1E4E8;">(opts).</span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">((tti) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#E1E4E8;">  ... </span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> ttiPolyfill from &#39;tti</span><span style="color:#B31D28;font-style:italic;">-</span><span style="color:#24292E;">polyfill&#39;; </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">ttiPolyfill.</span><span style="color:#6F42C1;">getFirstConsistentlyInteractive</span><span style="color:#24292E;">(opts).</span><span style="color:#6F42C1;">then</span><span style="color:#24292E;">((tti) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#24292E;">  ... </span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><p>通过调用模块提供的 getFirstConsistentlyInteractive() 函数即可返回一个 Promise 对象，如果当前浏览器支持相关测量方法，则返回 TTI 值，否则返回 null。</p><h4 id="总阻塞时间-total-blocking-time-tbt" tabindex="-1">总阻塞时间（Total Blocking Time，TBT） <a class="header-anchor" href="#总阻塞时间-total-blocking-time-tbt" aria-label="Permalink to &quot;总阻塞时间（Total Blocking Time，TBT）&quot;">​</a></h4><p>总阻塞时间由 W3C 标准 <a href="https://www.w3.org/TR/2017/WD-longtasks-1-20170907/" target="_blank" rel="noreferrer">Long Tasks API 1</a> 提出，是指阻塞用户响应（比如键盘输入、鼠标点击）的所有时间。指标值是将 FCP 之后一直到 TTI 这段时间内的阻塞部分时间总和，阻塞部分是指长任务执行时间减去 50 毫秒。下面是一张来自 web.dev 的示意图。</p>`,7),y=s(`<p>上图是主线程执行的时间轴，有 5 个任务，其中 3 个是长任务，因为它们的持续时间超过 50 毫秒。将这 3 个长任务分别减去 50 毫秒之后求和，得到 TBT 值为 345 毫秒。获取长任务耗时的方式如下：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> observer </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PerformanceObserver</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">list</span><span style="color:#E1E4E8;">) { </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> perfEntries </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> list.</span><span style="color:#B392F0;">getEntries</span><span style="color:#E1E4E8;">(); </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> perfEntries.</span><span style="color:#79B8FF;">length</span><span style="color:#E1E4E8;">; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) { </span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(perfEntries[i].</span><span style="color:#B392F0;">toJSON</span><span style="color:#E1E4E8;">()) </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/* </span></span>
<span class="line"><span style="color:#6A737D;">  { </span></span>
<span class="line"><span style="color:#6A737D;">    attribution: [TaskAttributionTiming]， </span></span>
<span class="line"><span style="color:#6A737D;">    duration: 6047.770000004675， </span></span>
<span class="line"><span style="color:#6A737D;">    entryType: &quot;longtask&quot;， </span></span>
<span class="line"><span style="color:#6A737D;">    name: &quot;self&quot;， </span></span>
<span class="line"><span style="color:#6A737D;">    startTime: 22.444999995059334 </span></span>
<span class="line"><span style="color:#6A737D;">  } </span></span>
<span class="line"><span style="color:#6A737D;">  */</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span></span>
<span class="line"><span style="color:#E1E4E8;">}); </span></span>
<span class="line"><span style="color:#E1E4E8;">observer.</span><span style="color:#B392F0;">observe</span><span style="color:#E1E4E8;">({ </span></span>
<span class="line"><span style="color:#E1E4E8;">  entryTypes: [</span><span style="color:#9ECBFF;">&quot;longtask&quot;</span><span style="color:#E1E4E8;">] </span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> observer </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PerformanceObserver</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">list</span><span style="color:#24292E;">) { </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> perfEntries </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> list.</span><span style="color:#6F42C1;">getEntries</span><span style="color:#24292E;">(); </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> perfEntries.</span><span style="color:#005CC5;">length</span><span style="color:#24292E;">; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) { </span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(perfEntries[i].</span><span style="color:#6F42C1;">toJSON</span><span style="color:#24292E;">()) </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/* </span></span>
<span class="line"><span style="color:#6A737D;">  { </span></span>
<span class="line"><span style="color:#6A737D;">    attribution: [TaskAttributionTiming]， </span></span>
<span class="line"><span style="color:#6A737D;">    duration: 6047.770000004675， </span></span>
<span class="line"><span style="color:#6A737D;">    entryType: &quot;longtask&quot;， </span></span>
<span class="line"><span style="color:#6A737D;">    name: &quot;self&quot;， </span></span>
<span class="line"><span style="color:#6A737D;">    startTime: 22.444999995059334 </span></span>
<span class="line"><span style="color:#6A737D;">  } </span></span>
<span class="line"><span style="color:#6A737D;">  */</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">  } </span></span>
<span class="line"><span style="color:#24292E;">}); </span></span>
<span class="line"><span style="color:#24292E;">observer.</span><span style="color:#6F42C1;">observe</span><span style="color:#24292E;">({ </span></span>
<span class="line"><span style="color:#24292E;">  entryTypes: [</span><span style="color:#032F62;">&quot;longtask&quot;</span><span style="color:#24292E;">] </span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><p>首先通过 PerformanceObserver 函数构造一个性能监测实例，通过回调函数参数的 getEntries() 函数来获取 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceEntry" target="_blank" rel="noreferrer">PerformanceEntry</a> 实例数组，每个实例对应一个长任务。同时要指定监测实例的实体类型为&quot;longtask&quot;。</p><h4 id="最大内容绘制-largest-contentful-paint-lcp" tabindex="-1">最大内容绘制（Largest Contentful Paint，LCP) <a class="header-anchor" href="#最大内容绘制-largest-contentful-paint-lcp" aria-label="Permalink to &quot;最大内容绘制（Largest Contentful Paint，LCP)&quot;">​</a></h4><p>最大内容绘画指的是视口内可见的最大图像或文本块的绘制时间。测量这个指标的值和 TBT 相似，不同的是将实体类型改为&quot;largest-contentful-paint&quot;。</p><p>下面是对应的监测代码：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> observer </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">PerformanceObserver</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">function</span><span style="color:#E1E4E8;"> (list) { </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> perfEntries </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> list.</span><span style="color:#B392F0;">getEntries</span><span style="color:#E1E4E8;">(); </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> perfEntries.length; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) { </span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(perfEntries[i].</span><span style="color:#B392F0;">toJSON</span><span style="color:#E1E4E8;">()) </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">/* </span></span>
<span class="line"><span style="color:#6A737D;">    { </span></span>
<span class="line"><span style="color:#6A737D;">      duration: 0, </span></span>
<span class="line"><span style="color:#6A737D;">      element: img, </span></span>
<span class="line"><span style="color:#6A737D;">      entryType: &quot;largest-contentful-paint&quot;, </span></span>
<span class="line"><span style="color:#6A737D;">      id: &quot;&quot;, </span></span>
<span class="line"><span style="color:#6A737D;">      loadTime: 274.864, </span></span>
<span class="line"><span style="color:#6A737D;">      name: &quot;&quot;, </span></span>
<span class="line"><span style="color:#6A737D;">      renderTime: 0, </span></span>
<span class="line"><span style="color:#6A737D;">      size: 2502, </span></span>
<span class="line"><span style="color:#6A737D;">      startTime: 274.864, </span></span>
<span class="line"><span style="color:#6A737D;">           url: &quot;https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png&quot; </span></span>
<span class="line"><span style="color:#6A737D;">      } </span></span>
<span class="line"><span style="color:#6A737D;">    */</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span></span>
<span class="line"><span style="color:#E1E4E8;">}); </span></span>
<span class="line"><span style="color:#E1E4E8;">observer.</span><span style="color:#B392F0;">observe</span><span style="color:#E1E4E8;">({entryTypes</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> [</span><span style="color:#9ECBFF;">&#39;largest-contentful-paint&#39;</span><span style="color:#E1E4E8;">]});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> observer </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">PerformanceObserver</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">function</span><span style="color:#24292E;"> (list) { </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> perfEntries </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> list.</span><span style="color:#6F42C1;">getEntries</span><span style="color:#24292E;">(); </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> perfEntries.length; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) { </span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(perfEntries[i].</span><span style="color:#6F42C1;">toJSON</span><span style="color:#24292E;">()) </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">/* </span></span>
<span class="line"><span style="color:#6A737D;">    { </span></span>
<span class="line"><span style="color:#6A737D;">      duration: 0, </span></span>
<span class="line"><span style="color:#6A737D;">      element: img, </span></span>
<span class="line"><span style="color:#6A737D;">      entryType: &quot;largest-contentful-paint&quot;, </span></span>
<span class="line"><span style="color:#6A737D;">      id: &quot;&quot;, </span></span>
<span class="line"><span style="color:#6A737D;">      loadTime: 274.864, </span></span>
<span class="line"><span style="color:#6A737D;">      name: &quot;&quot;, </span></span>
<span class="line"><span style="color:#6A737D;">      renderTime: 0, </span></span>
<span class="line"><span style="color:#6A737D;">      size: 2502, </span></span>
<span class="line"><span style="color:#6A737D;">      startTime: 274.864, </span></span>
<span class="line"><span style="color:#6A737D;">           url: &quot;https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png&quot; </span></span>
<span class="line"><span style="color:#6A737D;">      } </span></span>
<span class="line"><span style="color:#6A737D;">    */</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">  } </span></span>
<span class="line"><span style="color:#24292E;">}); </span></span>
<span class="line"><span style="color:#24292E;">observer.</span><span style="color:#6F42C1;">observe</span><span style="color:#24292E;">({entryTypes</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> [</span><span style="color:#032F62;">&#39;largest-contentful-paint&#39;</span><span style="color:#24292E;">]});</span></span></code></pre></div><h3 id="统计方式" tabindex="-1">统计方式 <a class="header-anchor" href="#统计方式" aria-label="Permalink to &quot;统计方式&quot;">​</a></h3><p>虽然我们可以通过一些方式来精确地采集性能指标，但不同的用户、不同的环境采集同一指标值会有所差异。所以通常需要对大量采集的性能指标数据进行统计才能用来量化。</p><h4 id="平均值统计" tabindex="-1">平均值统计 <a class="header-anchor" href="#平均值统计" aria-label="Permalink to &quot;平均值统计&quot;">​</a></h4><p>平均值统计应该是大家最容易想到的统计方法，将所有用户产生的性能指标值收集起来，然后对这些数据取平均值，最终得到平均耗时数据。这种统计方式最大的问题就是容易受极值影响，比如新闻里面说的腾讯员工月薪 8 万，这显然是不现实的，这就是被平均的结果。</p><h4 id="百分位数统计" tabindex="-1">百分位数统计 <a class="header-anchor" href="#百分位数统计" aria-label="Permalink to &quot;百分位数统计&quot;">​</a></h4><p>百分位数统计可以解决极值问题。百分位数是对应于百分位的实际数值，比如第 70 百分位数：将数据从小到大排列，处于第 70% 的数据称为 70 分位数，表示 70% 的性能数据均小于等于该值，那剩下的 30% 的数据均大于等于该值了。</p><p>百分位数的好处在于，对于性能需求不同的页面或应用，可以设置不同的百分位数。对性能要求越高，使用越大的百分位数。</p><p>比如在追求极致性能的情况下，要求 99% 的用户都要小于 3 秒，我们看页面加载时长时候就应该看 99 分位数。而某些重要程度比较低的页面，可以只要求 50% 的用户页面加载时长小于 3 秒，那么对应的就是 50 分位数，也称<strong>中位数</strong>。</p><h3 id="优化思路" tabindex="-1">优化思路 <a class="header-anchor" href="#优化思路" aria-label="Permalink to &quot;优化思路&quot;">​</a></h3><p>有了性能指标和统计方式之后，就可以正式开始针对不同的指标值进行优化了。前端性能优化一般可以从两个方向入手：<strong>加载性能优化</strong> 和<strong>渲染性能优化</strong>。</p><p>虽然不同方向的优化手段不同，但大体上都遵循两个思路：<strong>做减法</strong> 和<strong>做除法</strong>。做减法是直接减少耗时操作或资源体积，做除法是在耗时操作和资源体积无法减少的情况下，对其进行拆分处理或者对不可拆分的内容进行顺序调换。</p><p>下面来进行举例分析。加载性能的优化手段中，做减法的有：</p><ul><li><p><strong>采用 gzip 压缩</strong>，典型的减少资源的传输体积；</p></li><li><p><strong>使用缓存</strong>，强制缓存可以减少浏览器请求次数，而协商缓存可以减少传输体积；</p></li><li><p>使用雪碧图，减少浏览器请求次数。</p></li></ul><p>做除法的有：</p><ul><li><p><strong>HTTP2 多路复用</strong>，把多个请求拆分成二进制帧，并发传输；</p></li><li><p><strong>懒加载</strong>，将 Web 应用拆分成不同的模块或文件，按需加载；</p></li><li><p><strong>把 script 标签放到 body 底部</strong>，通过调整顺序来控制渲染时间。</p></li></ul><p>而在渲染性能优化的手段中，做减法的有：</p><ul><li><p><strong>避免重排与重绘</strong>，减少渲染引擎的绘制；</p></li><li><p><strong>防抖操作</strong>，减少函数调用或请求次数；</p></li><li><p><strong>减少 DOM 操作</strong>，减少渲染引擎和脚本引擎的切换，同时也减少渲染引擎绘制。</p></li></ul><p>做除法的有：</p><ul><li><p><strong>骨架屏</strong>，将页面内容进行拆分，调整不同部分的显示顺序；</p></li><li><p><strong>使用 Web Worker</strong>，将一些长任务拆分出来，放到 Web Worker 中执行；</p></li><li><p><strong>React Fiber</strong>，将同步视图的任务进行拆分，可调换顺序，可暂停。</p></li></ul><p>前端性能优化的方式还有很多，我们学习的重点不在于将这些优化方式一一记住，而是掌握优化的思路，在不同的方向上，对不同步骤优先考虑做减法，然后再考虑做除法。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>前端性能优化实际上包括两个步骤，即量化和优化。在量化过程中，先采集特定的指标，本课时提到了 5 个比较重要的指标，包括首屏绘制、首屏内容绘制、可交互时间、总阻塞时间、最大内容绘制；然后对不同用户产生的指标值进行统计，这里推荐使用百分位数统计法，对于不同性能需求的页面设置不同的百分位数。</p><p>在优化过程中，要根据性能指标统计结果进行优化，可通过做减法和做除法的思路分别对加载性能和渲染性能进行优化。</p><p>最后布置一道思考题：你还使用过哪些性能优化的指标？欢迎在留言区分享你的答案。</p>`,31);function E(g,u,d,h,A,f){const n=o("Image");return e(),t("div",null,[c,a(n,{alt:"image (6).png",src:"https://s0.lgstatic.com/i/image/M00/41/74/CgqCHl81EGeAdM7rAACIkBOl2EA380.png"}),l(),i,a(n,{alt:"image (7).png",src:"https://s0.lgstatic.com/i/image/M00/41/69/Ciqc1F81EIaADZ4LAAAZKr_3VDY865.png"}),l(),y])}const F=p(r,[["render",E]]);export{m as __pageData,F as default};
