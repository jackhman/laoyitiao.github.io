import{_ as e,j as o,o as c,g as t,k as l,h as n,s,Q as p}from"./chunks/framework.4e7d56ce.js";const A=JSON.parse('{"title":"Node.js 源码结构 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/前端高手进阶_文档/(3197) 第25讲：Node.j == 全栈？.md","filePath":"posts/frontEnd/前端高手进阶_文档/(3197) 第25讲：Node.j == 全栈？.md","lastUpdated":1696417798000}'),i={name:"posts/frontEnd/前端高手进阶_文档/(3197) 第25讲：Node.j == 全栈？.md"},E=s("p",null,"提到 Node.js，相信大部分前端工程师都会想到基于它来开发服务端，只需要掌握 JavaScript 一门语言就可以成为全栈工程师，但其实 Node.js 的意义并不仅于此。",-1),r=s("p",null,"很多高级语言，执行权限都可以触及操作系统，而运行在浏览器端的 JavaScript 则例外，浏览器为其创建的沙箱环境，把前端工程师封闭在一个编程世界的象牙塔里。不过 Node.js 的出现则弥补了这个缺憾，前端工程师也可以触达计算机世界的底层。",-1),_=s("p",null,"所以 Node.js 对于前端工程师的意义不仅在于提供了全栈开发能力，更重要的是为前端工程师打开了一扇通向计算机底层世界的大门。这一课时我们通过分析 Node.js 的实现原理来打开这扇大门。",-1),u=s("h3",{id:"node-js-源码结构",tabindex:"-1"},[n("Node.js 源码结构 "),s("a",{class:"header-anchor",href:"#node-js-源码结构","aria-label":'Permalink to "Node.js 源码结构"'},"​")],-1),d=s("p",null,"Node.js 源码仓库的 /deps 目录下有十几个依赖，其中既有 C 语言编写的模块（如 libuv、V8）也有 JavaScript 语言编写的模块（如 acorn、acorn-plugins），如下图所示。",-1),y=p('<p>Node.js 的依赖模块</p><ul><li><p>acorn：前面的课程中已经提过，用 JavaScript 编写的轻量级 JavaScript 解析器。</p></li><li><p>acorn-plugins：acorn 的扩展模块，让 acorn 支持 ES6 特性解析，比如类声明。</p></li><li><p>brotli：C 语言编写的 Brotli 压缩算法。</p></li><li><p>cares：应该写为&quot;c-ares&quot;，C 语言编写的用来处理异步 DNS 请求。</p></li><li><p>histogram：C 语言编写，实现柱状图生成功能。</p></li><li><p>icu-small：C 语言编写，为 Node.js 定制的 ICU（International Components for Unicode）库，包括一些用来操作 Unicode 的函数。</p></li><li><p>llhttp：C 语言编写，轻量级的 http 解析器。</p></li><li><p>nghttp2/nghttp3/ngtcp2：处理 HTTP/2、HTTP/3、TCP/2 协议。</p></li><li><p>node-inspect：让 Node.js 程序支持 CLI debug 调试模式。</p></li><li><p>npm：JavaScript 编写的 Node.js 模块管理器。</p></li><li><p>openssl：C 语言编写，加密相关的模块，在 tls 和 crypto 模块中都有使用。</p></li><li><p>uv：C 语言编写，采用非阻塞型的 I/O 操作，为 Node.js 提供了访问系统资源的能力。</p></li><li><p>uvwasi：C 语编写，实现 WASI 系统调用 API。</p></li><li><p>v8：C 语言编写，JavaScript 引擎。</p></li><li><p>zlib：用于快速压缩，Node.js 使用 zlib 创建同步、异步和数据流压缩、解压接口。</p></li></ul><p>其中最重要的是v8 和uv两个目录对应的模块。</p><p>在&quot;<a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=180#/detail/pc?id=3180" target="_blank" rel="noreferrer">09 | 为什么代码没有按照编写顺序执行</a>&quot;中我们详细分析过 V8 的工作原理，V8 本身并没有异步运行的能力，而是借助浏览器的其他线程实现的。但在 Node.js 中，异步实现主要依赖于 libuv，下面我们来重点分析 libuv 的实现原理。</p><h3 id="什么是-libuv" tabindex="-1">什么是 libuv <a class="header-anchor" href="#什么是-libuv" aria-label="Permalink to &quot;什么是 libuv&quot;">​</a></h3><p>libuv 是一个用 C 编写的支持多平台的异步 I/O 库，主要解决 I/O 操作容易引起阻塞的问题。最开始是专门为 Node.js 使用而开发的，但后来也被 Luvit、Julia、pyuv 等其他模块使用。下图是 libuv 的结构图。</p>',6),h=s("p",null,"libuv 结构图",-1),v=s("br",null,null,-1),g=s("p",null,"我用黄色线框将图中模块分为了两部分，分别代表了两种不同的异步实现方式。",-1),m=s("p",null,[n('左边部分为网络 I/O 模块，在不同平台下有不同的实现机制，Linux 系统下通过 epoll 实现，OSX 和其他 BSD 系统采用 KQueue，SunOS 系统采用 Event ports，Windows 系统采用的是IOCP。由于涉及操作系统底层 API，理解起来比较复杂，这里就不多介绍了，对这些实现机制比较感兴趣的同学可以查阅这篇文章"'),s("a",{href:"https://cloud.tencent.com/developer/article/1373483",target:"_blank",rel:"noreferrer"},"各种 IO 复用模式之 select、poll、epoll、kqueue、iocp 分析"),n('"。')],-1),b=s("p",null,"右边部分包括文件 I/O 模块、DNS 模块和用户代码，通过线程池来实现异步操作。文件 I/O 与网络 I/O 不同，libuv 没有依赖于系统底层的 API，而是在全局线程池中执行阻塞的文件 I/O 操作。",-1),k=s("h3",{id:"libuv-中的事件轮询",tabindex:"-1"},[n("libuv 中的事件轮询 "),s("a",{class:"header-anchor",href:"#libuv-中的事件轮询","aria-label":'Permalink to "libuv 中的事件轮询"'},"​")],-1),f=s("p",null,"下图是 libuv 官网给出的事件轮询工作流程图，我们结合代码来一起分析。",-1),U=p(`<p>libuv 事件轮询</p><p>libuv 事件循环的核心代码是在 uv_run() 函数中实现的，下面是 Unix 系统下的部分核心代码。虽然是用 C 语言编写的，但和 JavaScript 一样都是高级语言，所以理解起来也不算太困难。最大的区别可能是星号和箭头，星号我们可以直接忽略。例如，函数参数中 uv_loop_t* loop 可以理解为 uv_loop_t 类型的变量 loop。箭头&quot;→&quot;可以理解为点号&quot;.&quot;，例如，loop→stop_flag 可以理解为 loop.stop_flag。</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// deps/uv/src/unix/core.c</span></span>
<span class="line"><span style="color:#E1E4E8;">int uv_run(uv_loop_t* loop, uv_run_mode mode) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  ...</span></span>
<span class="line"><span style="color:#E1E4E8;">  r = uv__loop_alive(loop);</span></span>
<span class="line"><span style="color:#E1E4E8;">  if (!r)</span></span>
<span class="line"><span style="color:#E1E4E8;">    uv__update_time(loop);</span></span>
<span class="line"><span style="color:#E1E4E8;">  while (r != 0 &amp;&amp; loop-&gt;stop_flag == 0) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    uv__update_time(loop);</span></span>
<span class="line"><span style="color:#E1E4E8;">    uv__run_timers(loop);</span></span>
<span class="line"><span style="color:#E1E4E8;">    ran_pending = uv__run_pending(loop);</span></span>
<span class="line"><span style="color:#E1E4E8;">    uv__run_idle(loop);</span></span>
<span class="line"><span style="color:#E1E4E8;">    uv__run_prepare(loop);</span></span>
<span class="line"><span style="color:#E1E4E8;">    ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    uv__io_poll(loop, timeout);</span></span>
<span class="line"><span style="color:#E1E4E8;">    uv__run_check(loop);</span></span>
<span class="line"><span style="color:#E1E4E8;">    uv__run_closing_handles(loop);</span></span>
<span class="line"><span style="color:#E1E4E8;">    ...</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  ...</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// deps/uv/src/unix/core.c</span></span>
<span class="line"><span style="color:#24292E;">int uv_run(uv_loop_t* loop, uv_run_mode mode) {</span></span>
<span class="line"><span style="color:#24292E;">  ...</span></span>
<span class="line"><span style="color:#24292E;">  r = uv__loop_alive(loop);</span></span>
<span class="line"><span style="color:#24292E;">  if (!r)</span></span>
<span class="line"><span style="color:#24292E;">    uv__update_time(loop);</span></span>
<span class="line"><span style="color:#24292E;">  while (r != 0 &amp;&amp; loop-&gt;stop_flag == 0) {</span></span>
<span class="line"><span style="color:#24292E;">    uv__update_time(loop);</span></span>
<span class="line"><span style="color:#24292E;">    uv__run_timers(loop);</span></span>
<span class="line"><span style="color:#24292E;">    ran_pending = uv__run_pending(loop);</span></span>
<span class="line"><span style="color:#24292E;">    uv__run_idle(loop);</span></span>
<span class="line"><span style="color:#24292E;">    uv__run_prepare(loop);</span></span>
<span class="line"><span style="color:#24292E;">    ...</span></span>
<span class="line"><span style="color:#24292E;">    uv__io_poll(loop, timeout);</span></span>
<span class="line"><span style="color:#24292E;">    uv__run_check(loop);</span></span>
<span class="line"><span style="color:#24292E;">    uv__run_closing_handles(loop);</span></span>
<span class="line"><span style="color:#24292E;">    ...</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  ...</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="uv-loop-alive" tabindex="-1">uv__loop_alive <a class="header-anchor" href="#uv-loop-alive" aria-label="Permalink to &quot;uv__loop_alive&quot;">​</a></h4><p>这个函数用于判断事件轮询是否要继续进行，如果 loop 对象中不存在活跃的任务则返回 0 并退出循环。</p><p>在 C 语言中这个&quot;任务&quot;有个专业的称呼，即&quot;句柄&quot;，可以理解为指向任务的变量。句柄又可以分为两类：request 和 handle，分别代表短生命周期句柄和长生命周期句柄。具体代码如下：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// deps/uv/src/unix/core.c</span></span>
<span class="line"><span style="color:#E1E4E8;">static int uv__loop_alive(const uv_loop_t* loop) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  return uv__has_active_handles(loop) ||</span></span>
<span class="line"><span style="color:#E1E4E8;">         uv__has_active_reqs(loop) ||</span></span>
<span class="line"><span style="color:#E1E4E8;">         loop-&gt;closing_handles != NULL;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// deps/uv/src/unix/core.c</span></span>
<span class="line"><span style="color:#24292E;">static int uv__loop_alive(const uv_loop_t* loop) {</span></span>
<span class="line"><span style="color:#24292E;">  return uv__has_active_handles(loop) ||</span></span>
<span class="line"><span style="color:#24292E;">         uv__has_active_reqs(loop) ||</span></span>
<span class="line"><span style="color:#24292E;">         loop-&gt;closing_handles != NULL;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="uv-update-time" tabindex="-1">uv__update_time <a class="header-anchor" href="#uv-update-time" aria-label="Permalink to &quot;uv__update_time&quot;">​</a></h4><p>为了减少与时间相关的系统调用次数，同构这个函数来缓存当前系统时间，精度很高，可以达到纳秒级别，但单位还是毫秒。</p><p>具体源码如下：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// deps/uv/src/unix/internal.h</span></span>
<span class="line"><span style="color:#E1E4E8;">UV_UNUSED(static void uv__update_time(uv_loop_t* loop)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  loop-&gt;time = uv__hrtime(UV_CLOCK_FAST) / 1000000;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// deps/uv/src/unix/internal.h</span></span>
<span class="line"><span style="color:#24292E;">UV_UNUSED(static void uv__update_time(uv_loop_t* loop)) {</span></span>
<span class="line"><span style="color:#24292E;">  loop-&gt;time = uv__hrtime(UV_CLOCK_FAST) / 1000000;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="uv-run-timers" tabindex="-1">uv__run_timers <a class="header-anchor" href="#uv-run-timers" aria-label="Permalink to &quot;uv__run_timers&quot;">​</a></h4><p>执行 setTimeout() 和 setInterval() 中到达时间阈值的回调函数。这个执行过程是通过 for 循环遍历实现的，从下面的代码中也可以看到，定时器回调是存储于一个最小堆结构的数据中的，当这个最小堆为空或者还未到达时间阈值时退出循环。</p><p>在执行定时器回调函数前先移除该定时器，如果设置了 repeat，需再次加到最小堆里，然后执行定时器回调。</p><p>具体代码如下：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// deps/uv/src/timer.c</span></span>
<span class="line"><span style="color:#E1E4E8;">void uv__run_timers(uv_loop_t* loop) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  struct heap_node* heap_node;</span></span>
<span class="line"><span style="color:#E1E4E8;">  uv_timer_t* handle;</span></span>
<span class="line"><span style="color:#E1E4E8;">  for (;;) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    heap_node = heap_min(timer_heap(loop));</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (heap_node == NULL)</span></span>
<span class="line"><span style="color:#E1E4E8;">      break;</span></span>
<span class="line"><span style="color:#E1E4E8;">    handle = container_of(heap_node, uv_timer_t, heap_node);</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (handle-&gt;timeout &gt; loop-&gt;time)</span></span>
<span class="line"><span style="color:#E1E4E8;">      break;</span></span>
<span class="line"><span style="color:#E1E4E8;">    uv_timer_stop(handle);</span></span>
<span class="line"><span style="color:#E1E4E8;">    uv_timer_again(handle);</span></span>
<span class="line"><span style="color:#E1E4E8;">    handle-&gt;timer_cb(handle);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// deps/uv/src/timer.c</span></span>
<span class="line"><span style="color:#24292E;">void uv__run_timers(uv_loop_t* loop) {</span></span>
<span class="line"><span style="color:#24292E;">  struct heap_node* heap_node;</span></span>
<span class="line"><span style="color:#24292E;">  uv_timer_t* handle;</span></span>
<span class="line"><span style="color:#24292E;">  for (;;) {</span></span>
<span class="line"><span style="color:#24292E;">    heap_node = heap_min(timer_heap(loop));</span></span>
<span class="line"><span style="color:#24292E;">    if (heap_node == NULL)</span></span>
<span class="line"><span style="color:#24292E;">      break;</span></span>
<span class="line"><span style="color:#24292E;">    handle = container_of(heap_node, uv_timer_t, heap_node);</span></span>
<span class="line"><span style="color:#24292E;">    if (handle-&gt;timeout &gt; loop-&gt;time)</span></span>
<span class="line"><span style="color:#24292E;">      break;</span></span>
<span class="line"><span style="color:#24292E;">    uv_timer_stop(handle);</span></span>
<span class="line"><span style="color:#24292E;">    uv_timer_again(handle);</span></span>
<span class="line"><span style="color:#24292E;">    handle-&gt;timer_cb(handle);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="uv-run-pending" tabindex="-1">uv__run_pending <a class="header-anchor" href="#uv-run-pending" aria-label="Permalink to &quot;uv__run_pending&quot;">​</a></h4><p>遍历所有存储在 pending_queue 中的 I/O 回调函数，当 pending_queue 为空时返回 0；否则在执行完 pending_queue 中的回调函数后返回 1。</p><p>代码如下：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// deps/uv/src/unix/core.c</span></span>
<span class="line"><span style="color:#E1E4E8;">static int uv__run_pending(uv_loop_t* loop) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  QUEUE* q;</span></span>
<span class="line"><span style="color:#E1E4E8;">  QUEUE pq;</span></span>
<span class="line"><span style="color:#E1E4E8;">  uv__io_t* w;</span></span>
<span class="line"><span style="color:#E1E4E8;">  if (QUEUE_EMPTY(&amp;loop-&gt;pending_queue))</span></span>
<span class="line"><span style="color:#E1E4E8;">    return 0;</span></span>
<span class="line"><span style="color:#E1E4E8;">  QUEUE_MOVE(&amp;loop-&gt;pending_queue, &amp;pq);</span></span>
<span class="line"><span style="color:#E1E4E8;">  while (!QUEUE_EMPTY(&amp;pq)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    q = QUEUE_HEAD(&amp;pq);</span></span>
<span class="line"><span style="color:#E1E4E8;">    QUEUE_REMOVE(q);</span></span>
<span class="line"><span style="color:#E1E4E8;">    QUEUE_INIT(q);</span></span>
<span class="line"><span style="color:#E1E4E8;">    w = QUEUE_DATA(q, uv__io_t, pending_queue);</span></span>
<span class="line"><span style="color:#E1E4E8;">    w-&gt;cb(loop, w, POLLOUT);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  return 1;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// deps/uv/src/unix/core.c</span></span>
<span class="line"><span style="color:#24292E;">static int uv__run_pending(uv_loop_t* loop) {</span></span>
<span class="line"><span style="color:#24292E;">  QUEUE* q;</span></span>
<span class="line"><span style="color:#24292E;">  QUEUE pq;</span></span>
<span class="line"><span style="color:#24292E;">  uv__io_t* w;</span></span>
<span class="line"><span style="color:#24292E;">  if (QUEUE_EMPTY(&amp;loop-&gt;pending_queue))</span></span>
<span class="line"><span style="color:#24292E;">    return 0;</span></span>
<span class="line"><span style="color:#24292E;">  QUEUE_MOVE(&amp;loop-&gt;pending_queue, &amp;pq);</span></span>
<span class="line"><span style="color:#24292E;">  while (!QUEUE_EMPTY(&amp;pq)) {</span></span>
<span class="line"><span style="color:#24292E;">    q = QUEUE_HEAD(&amp;pq);</span></span>
<span class="line"><span style="color:#24292E;">    QUEUE_REMOVE(q);</span></span>
<span class="line"><span style="color:#24292E;">    QUEUE_INIT(q);</span></span>
<span class="line"><span style="color:#24292E;">    w = QUEUE_DATA(q, uv__io_t, pending_queue);</span></span>
<span class="line"><span style="color:#24292E;">    w-&gt;cb(loop, w, POLLOUT);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  return 1;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="uv-run-idle-uv-run-prepare-uv-run-check" tabindex="-1">uv__run_idle / uv__run_prepare / uv__run_check <a class="header-anchor" href="#uv-run-idle-uv-run-prepare-uv-run-check" aria-label="Permalink to &quot;uv__run_idle / uv__run_prepare / uv__run_check&quot;">​</a></h4><p>这 3 个函数都是通过一个宏函数 UV_LOOP_WATCHER_DEFINE 进行定义的，宏函数可以理解为代码模板，或者说用来定义函数的函数。3 次调用宏函数并分别传入 name 参数值 prepare、check、idle，同时定义了 uv__run_idle、uv__run_prepare、uv__run_check 3 个函数。</p><p>所以说它们的执行逻辑是一致的，都是按照先进先出原则循环遍历并取出队列 loop-&gt;name##_handles 中的对象，然后执行对应的回调函数。</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// deps/uv/src/unix/loop-watcher.c</span></span>
<span class="line"><span style="color:#E1E4E8;">#define UV_LOOP_WATCHER_DEFINE(name, type)          \\</span></span>
<span class="line"><span style="color:#E1E4E8;">  void uv__run_##name(uv_loop_t* loop) {            \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    uv_##name##_t* h;                               \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    QUEUE queue;                                    \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    QUEUE* q;                                       \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    QUEUE_MOVE(&amp;loop-&gt;name##_handles, &amp;queue);      \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    while (!QUEUE_EMPTY(&amp;queue)) {                  \\</span></span>
<span class="line"><span style="color:#E1E4E8;">      q = QUEUE_HEAD(&amp;queue);                       \\</span></span>
<span class="line"><span style="color:#E1E4E8;">      h = QUEUE_DATA(q, uv_##name##_t, queue);      \\</span></span>
<span class="line"><span style="color:#E1E4E8;">      QUEUE_REMOVE(q);                              \\</span></span>
<span class="line"><span style="color:#E1E4E8;">      QUEUE_INSERT_TAIL(&amp;loop-&gt;name##_handles, q);  \\</span></span>
<span class="line"><span style="color:#E1E4E8;">      h-&gt;name##_cb(h);                              \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    }                                               \\</span></span>
<span class="line"><span style="color:#E1E4E8;">  }                                                 \\</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">UV_LOOP_WATCHER_DEFINE(prepare, PREPARE)</span></span>
<span class="line"><span style="color:#E1E4E8;">UV_LOOP_WATCHER_DEFINE(check, CHECK)</span></span>
<span class="line"><span style="color:#E1E4E8;">UV_LOOP_WATCHER_DEFINE(idle, IDLE)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// deps/uv/src/unix/loop-watcher.c</span></span>
<span class="line"><span style="color:#24292E;">#define UV_LOOP_WATCHER_DEFINE(name, type)          \\</span></span>
<span class="line"><span style="color:#24292E;">  void uv__run_##name(uv_loop_t* loop) {            \\</span></span>
<span class="line"><span style="color:#24292E;">    uv_##name##_t* h;                               \\</span></span>
<span class="line"><span style="color:#24292E;">    QUEUE queue;                                    \\</span></span>
<span class="line"><span style="color:#24292E;">    QUEUE* q;                                       \\</span></span>
<span class="line"><span style="color:#24292E;">    QUEUE_MOVE(&amp;loop-&gt;name##_handles, &amp;queue);      \\</span></span>
<span class="line"><span style="color:#24292E;">    while (!QUEUE_EMPTY(&amp;queue)) {                  \\</span></span>
<span class="line"><span style="color:#24292E;">      q = QUEUE_HEAD(&amp;queue);                       \\</span></span>
<span class="line"><span style="color:#24292E;">      h = QUEUE_DATA(q, uv_##name##_t, queue);      \\</span></span>
<span class="line"><span style="color:#24292E;">      QUEUE_REMOVE(q);                              \\</span></span>
<span class="line"><span style="color:#24292E;">      QUEUE_INSERT_TAIL(&amp;loop-&gt;name##_handles, q);  \\</span></span>
<span class="line"><span style="color:#24292E;">      h-&gt;name##_cb(h);                              \\</span></span>
<span class="line"><span style="color:#24292E;">    }                                               \\</span></span>
<span class="line"><span style="color:#24292E;">  }                                                 \\</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">UV_LOOP_WATCHER_DEFINE(prepare, PREPARE)</span></span>
<span class="line"><span style="color:#24292E;">UV_LOOP_WATCHER_DEFINE(check, CHECK)</span></span>
<span class="line"><span style="color:#24292E;">UV_LOOP_WATCHER_DEFINE(idle, IDLE)</span></span></code></pre></div><h4 id="uv-io-poll" tabindex="-1">uv__io_poll <a class="header-anchor" href="#uv-io-poll" aria-label="Permalink to &quot;uv__io_poll&quot;">​</a></h4><p>uv__io_poll 主要是用来轮询 I/O 操作。具体实现根据操作系统的不同会有所区别，我们以 Linux 系统为例进行分析。</p><p>uv__io_poll 函数源码较多，核心为两段循环代码，部分代码如下：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">void uv__io_poll(uv_loop_t* loop, int timeout) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    while (!QUEUE_EMPTY(&amp;loop-&gt;watcher_queue)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      q = QUEUE_HEAD(&amp;loop-&gt;watcher_queue);</span></span>
<span class="line"><span style="color:#E1E4E8;">      QUEUE_REMOVE(q);</span></span>
<span class="line"><span style="color:#E1E4E8;">      QUEUE_INIT(q);</span></span>
<span class="line"><span style="color:#E1E4E8;">      w = QUEUE_DATA(q, uv__io_t, watcher_queue);</span></span>
<span class="line"><span style="color:#E1E4E8;">      // 设置当前感兴趣的事件</span></span>
<span class="line"><span style="color:#E1E4E8;">      e.events = w-&gt;pevents;</span></span>
<span class="line"><span style="color:#E1E4E8;">      // 设置事件对象的文件描述符</span></span>
<span class="line"><span style="color:#E1E4E8;">      e.data.fd = w-&gt;fd;</span></span>
<span class="line"><span style="color:#E1E4E8;">      if (w-&gt;events == 0)</span></span>
<span class="line"><span style="color:#E1E4E8;">        op = EPOLL_CTL_ADD;</span></span>
<span class="line"><span style="color:#E1E4E8;">      else</span></span>
<span class="line"><span style="color:#E1E4E8;">        op = EPOLL_CTL_MOD;</span></span>
<span class="line"><span style="color:#E1E4E8;">      // 修改 epoll 事件</span></span>
<span class="line"><span style="color:#E1E4E8;">      if (epoll_ctl(loop-&gt;backend_fd, op, w-&gt;fd, &amp;e)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (errno != EEXIST)</span></span>
<span class="line"><span style="color:#E1E4E8;">          abort();</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (epoll_ctl(loop-&gt;backend_fd, EPOLL_CTL_MOD, w-&gt;fd, &amp;e))</span></span>
<span class="line"><span style="color:#E1E4E8;">          abort();</span></span>
<span class="line"><span style="color:#E1E4E8;">      }  </span></span>
<span class="line"><span style="color:#E1E4E8;">      w-&gt;events = w-&gt;pevents;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    for (;;) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      for (i = 0; i </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> nfds; i++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        pe = events + i;</span></span>
<span class="line"><span style="color:#E1E4E8;">        fd = pe-&gt;data.fd;</span></span>
<span class="line"><span style="color:#E1E4E8;">        w = loop-&gt;watchers[fd];</span></span>
<span class="line"><span style="color:#E1E4E8;">        pe-&gt;events &amp;= w-&gt;pevents | POLLERR | POLLHUP;</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (pe-&gt;events == POLLERR || pe-&gt;events == POLLHUP)</span></span>
<span class="line"><span style="color:#E1E4E8;">          pe-&gt;events |= w-&gt;pevents &amp; (POLLIN | POLLOUT | UV__POLLRDHUP | UV__POLLPRI);</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (pe-&gt;events != 0) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          // 感兴趣事件触发，标记信号 </span></span>
<span class="line"><span style="color:#E1E4E8;">          if (w == &amp;loop-&gt;signal_io_watcher)</span></span>
<span class="line"><span style="color:#E1E4E8;">            have_signals = 1;</span></span>
<span class="line"><span style="color:#E1E4E8;">          else</span></span>
<span class="line"><span style="color:#E1E4E8;">            // 直接执行回调</span></span>
<span class="line"><span style="color:#E1E4E8;">            w-&gt;cb(loop, w, pe-&gt;events);</span></span>
<span class="line"><span style="color:#E1E4E8;">          nevents++;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      // 有信号发生时触发回调</span></span>
<span class="line"><span style="color:#E1E4E8;">      if (have_signals != 0)</span></span>
<span class="line"><span style="color:#E1E4E8;">        loop-&gt;signal_io_watcher.cb(loop, &amp;loop-&gt;signal_io_watcher, POLLIN);</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"><span style="color:#E1E4E8;">   ...</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">void uv__io_poll(uv_loop_t* loop, int timeout) {</span></span>
<span class="line"><span style="color:#24292E;">    while (!QUEUE_EMPTY(&amp;loop-&gt;watcher_queue)) {</span></span>
<span class="line"><span style="color:#24292E;">      q = QUEUE_HEAD(&amp;loop-&gt;watcher_queue);</span></span>
<span class="line"><span style="color:#24292E;">      QUEUE_REMOVE(q);</span></span>
<span class="line"><span style="color:#24292E;">      QUEUE_INIT(q);</span></span>
<span class="line"><span style="color:#24292E;">      w = QUEUE_DATA(q, uv__io_t, watcher_queue);</span></span>
<span class="line"><span style="color:#24292E;">      // 设置当前感兴趣的事件</span></span>
<span class="line"><span style="color:#24292E;">      e.events = w-&gt;pevents;</span></span>
<span class="line"><span style="color:#24292E;">      // 设置事件对象的文件描述符</span></span>
<span class="line"><span style="color:#24292E;">      e.data.fd = w-&gt;fd;</span></span>
<span class="line"><span style="color:#24292E;">      if (w-&gt;events == 0)</span></span>
<span class="line"><span style="color:#24292E;">        op = EPOLL_CTL_ADD;</span></span>
<span class="line"><span style="color:#24292E;">      else</span></span>
<span class="line"><span style="color:#24292E;">        op = EPOLL_CTL_MOD;</span></span>
<span class="line"><span style="color:#24292E;">      // 修改 epoll 事件</span></span>
<span class="line"><span style="color:#24292E;">      if (epoll_ctl(loop-&gt;backend_fd, op, w-&gt;fd, &amp;e)) {</span></span>
<span class="line"><span style="color:#24292E;">        if (errno != EEXIST)</span></span>
<span class="line"><span style="color:#24292E;">          abort();</span></span>
<span class="line"><span style="color:#24292E;">        if (epoll_ctl(loop-&gt;backend_fd, EPOLL_CTL_MOD, w-&gt;fd, &amp;e))</span></span>
<span class="line"><span style="color:#24292E;">          abort();</span></span>
<span class="line"><span style="color:#24292E;">      }  </span></span>
<span class="line"><span style="color:#24292E;">      w-&gt;events = w-&gt;pevents;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    for (;;) {</span></span>
<span class="line"><span style="color:#24292E;">      for (i = 0; i </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> nfds; i++) {</span></span>
<span class="line"><span style="color:#24292E;">        pe = events + i;</span></span>
<span class="line"><span style="color:#24292E;">        fd = pe-&gt;data.fd;</span></span>
<span class="line"><span style="color:#24292E;">        w = loop-&gt;watchers[fd];</span></span>
<span class="line"><span style="color:#24292E;">        pe-&gt;events &amp;= w-&gt;pevents | POLLERR | POLLHUP;</span></span>
<span class="line"><span style="color:#24292E;">        if (pe-&gt;events == POLLERR || pe-&gt;events == POLLHUP)</span></span>
<span class="line"><span style="color:#24292E;">          pe-&gt;events |= w-&gt;pevents &amp; (POLLIN | POLLOUT | UV__POLLRDHUP | UV__POLLPRI);</span></span>
<span class="line"><span style="color:#24292E;">        if (pe-&gt;events != 0) {</span></span>
<span class="line"><span style="color:#24292E;">          // 感兴趣事件触发，标记信号 </span></span>
<span class="line"><span style="color:#24292E;">          if (w == &amp;loop-&gt;signal_io_watcher)</span></span>
<span class="line"><span style="color:#24292E;">            have_signals = 1;</span></span>
<span class="line"><span style="color:#24292E;">          else</span></span>
<span class="line"><span style="color:#24292E;">            // 直接执行回调</span></span>
<span class="line"><span style="color:#24292E;">            w-&gt;cb(loop, w, pe-&gt;events);</span></span>
<span class="line"><span style="color:#24292E;">          nevents++;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      // 有信号发生时触发回调</span></span>
<span class="line"><span style="color:#24292E;">      if (have_signals != 0)</span></span>
<span class="line"><span style="color:#24292E;">        loop-&gt;signal_io_watcher.cb(loop, &amp;loop-&gt;signal_io_watcher, POLLIN);</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"><span style="color:#24292E;">   ...</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>在 while 循环中，遍历观察者队列 watcher_queue，并把事件和文件描述符取出来赋值给事件对象 e，然后调用 epoll_ctl 函数来注册或修改 epoll 事件。</p><p>在 for 循环中，会先将 epoll 中等待的文件描述符取出赋值给 nfds，然后再遍历 nfds，执行回调函数。</p><h4 id="uv-run-closing-handles" tabindex="-1">uv__run_closing_handles <a class="header-anchor" href="#uv-run-closing-handles" aria-label="Permalink to &quot;uv__run_closing_handles&quot;">​</a></h4><p>遍历等待关闭的队列，关闭 stream、tcp、udp 等 handle，然后调用 handle 对应的 close_cb。代码如下：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">static void uv__run_closing_handles(uv_loop_t* loop) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  uv_handle_t* p;</span></span>
<span class="line"><span style="color:#E1E4E8;">  uv_handle_t* q;</span></span>
<span class="line"><span style="color:#E1E4E8;">  p = loop-&gt;closing_handles;</span></span>
<span class="line"><span style="color:#E1E4E8;">  loop-&gt;closing_handles = NULL;</span></span>
<span class="line"><span style="color:#E1E4E8;">  while (p) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    q = p-&gt;next_closing;</span></span>
<span class="line"><span style="color:#E1E4E8;">    uv__finish_close(p);</span></span>
<span class="line"><span style="color:#E1E4E8;">    p = q;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">static void uv__run_closing_handles(uv_loop_t* loop) {</span></span>
<span class="line"><span style="color:#24292E;">  uv_handle_t* p;</span></span>
<span class="line"><span style="color:#24292E;">  uv_handle_t* q;</span></span>
<span class="line"><span style="color:#24292E;">  p = loop-&gt;closing_handles;</span></span>
<span class="line"><span style="color:#24292E;">  loop-&gt;closing_handles = NULL;</span></span>
<span class="line"><span style="color:#24292E;">  while (p) {</span></span>
<span class="line"><span style="color:#24292E;">    q = p-&gt;next_closing;</span></span>
<span class="line"><span style="color:#24292E;">    uv__finish_close(p);</span></span>
<span class="line"><span style="color:#24292E;">    p = q;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="process-nexttick-和-promise" tabindex="-1">process.nextTick 和 Promise <a class="header-anchor" href="#process-nexttick-和-promise" aria-label="Permalink to &quot;process.nextTick 和 Promise&quot;">​</a></h3><p>虽然 process.nextTick 和 Promise 都是异步 API，但并不属于事件轮询的一部分，它们都有各自的任务队列，在事件轮询的每个步骤完成后执行。所以当我们使用这两个异步 API 的时候要注意，如果在传入的回调函数中执行长任务或递归，则会导致事件轮询被阻塞，从而&quot;饿死&quot;I/O 操作。</p><p>下面的代码就是通过递归调用 prcoess.nextTick 而导致 fs.readFile 的回调函数无法执行的例子。</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">fs.readFile(&#39;config.json&#39;, (err, data) =&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">  ...</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#E1E4E8;">const traverse = () =&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">   process.nextTick(traverse)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">fs.readFile(&#39;config.json&#39;, (err, data) =&gt; {</span></span>
<span class="line"><span style="color:#24292E;">  ...</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#24292E;">const traverse = () =&gt; {</span></span>
<span class="line"><span style="color:#24292E;">   process.nextTick(traverse)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>要解决这个问题，可以使用 setImmediate 来替代，因为 setImmediate 会在事件轮询中执行回调函数队列。</p><p>在&quot;<a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=180#/detail/pc?id=3180" target="_blank" rel="noreferrer">09</a><a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=180#/detail/pc?id=3180" target="_blank" rel="noreferrer">|</a><a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=180#/detail/pc?id=3180" target="_blank" rel="noreferrer">为什么代码没有按照编写顺序执行？</a>&quot;中提到过，process.nextTick 任务队列优先级比 Promise 任务队列更高，具体的原因可以参看下面的代码：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// lib/internal/process/task_queues.js</span></span>
<span class="line"><span style="color:#E1E4E8;">function processTicksAndRejections() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  let tock;</span></span>
<span class="line"><span style="color:#E1E4E8;">  do {</span></span>
<span class="line"><span style="color:#E1E4E8;">    while (tock = queue.shift()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      const asyncId = tock[async_id_symbol];</span></span>
<span class="line"><span style="color:#E1E4E8;">      emitBefore(asyncId, tock[trigger_async_id_symbol], tock);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      try {</span></span>
<span class="line"><span style="color:#E1E4E8;">        const callback = tock.callback;</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (tock.args === undefined) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          callback();</span></span>
<span class="line"><span style="color:#E1E4E8;">        } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">          const args = tock.args;</span></span>
<span class="line"><span style="color:#E1E4E8;">          switch (args.length) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            case 1: callback(args[0]); break;</span></span>
<span class="line"><span style="color:#E1E4E8;">            case 2: callback(args[0], args[1]); break;</span></span>
<span class="line"><span style="color:#E1E4E8;">            case 3: callback(args[0], args[1], args[2]); break;</span></span>
<span class="line"><span style="color:#E1E4E8;">            case 4: callback(args[0], args[1], args[2], args[3]); break;</span></span>
<span class="line"><span style="color:#E1E4E8;">            default: callback(...args);</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      } finally {</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (destroyHooksExist())</span></span>
<span class="line"><span style="color:#E1E4E8;">          emitDestroy(asyncId);</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      emitAfter(asyncId);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    runMicrotasks();</span></span>
<span class="line"><span style="color:#E1E4E8;">  } while (!queue.isEmpty() || processPromiseRejections());</span></span>
<span class="line"><span style="color:#E1E4E8;">  setHasTickScheduled(false);</span></span>
<span class="line"><span style="color:#E1E4E8;">  setHasRejectionToWarn(false);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// lib/internal/process/task_queues.js</span></span>
<span class="line"><span style="color:#24292E;">function processTicksAndRejections() {</span></span>
<span class="line"><span style="color:#24292E;">  let tock;</span></span>
<span class="line"><span style="color:#24292E;">  do {</span></span>
<span class="line"><span style="color:#24292E;">    while (tock = queue.shift()) {</span></span>
<span class="line"><span style="color:#24292E;">      const asyncId = tock[async_id_symbol];</span></span>
<span class="line"><span style="color:#24292E;">      emitBefore(asyncId, tock[trigger_async_id_symbol], tock);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      try {</span></span>
<span class="line"><span style="color:#24292E;">        const callback = tock.callback;</span></span>
<span class="line"><span style="color:#24292E;">        if (tock.args === undefined) {</span></span>
<span class="line"><span style="color:#24292E;">          callback();</span></span>
<span class="line"><span style="color:#24292E;">        } else {</span></span>
<span class="line"><span style="color:#24292E;">          const args = tock.args;</span></span>
<span class="line"><span style="color:#24292E;">          switch (args.length) {</span></span>
<span class="line"><span style="color:#24292E;">            case 1: callback(args[0]); break;</span></span>
<span class="line"><span style="color:#24292E;">            case 2: callback(args[0], args[1]); break;</span></span>
<span class="line"><span style="color:#24292E;">            case 3: callback(args[0], args[1], args[2]); break;</span></span>
<span class="line"><span style="color:#24292E;">            case 4: callback(args[0], args[1], args[2], args[3]); break;</span></span>
<span class="line"><span style="color:#24292E;">            default: callback(...args);</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      } finally {</span></span>
<span class="line"><span style="color:#24292E;">        if (destroyHooksExist())</span></span>
<span class="line"><span style="color:#24292E;">          emitDestroy(asyncId);</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      emitAfter(asyncId);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    runMicrotasks();</span></span>
<span class="line"><span style="color:#24292E;">  } while (!queue.isEmpty() || processPromiseRejections());</span></span>
<span class="line"><span style="color:#24292E;">  setHasTickScheduled(false);</span></span>
<span class="line"><span style="color:#24292E;">  setHasRejectionToWarn(false);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>从 processTicksAndRejections() 函数中可以看出，首先通过 while 循环取出 queue 队列的回调函数，而这个 queue 队列中的回调函数就是通过 process.nextTick来添加的。当 while 循环结束后才调用 runMicrotasks() 函数执行 Promise 的回调函数。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>这一课时我们主要分析了 Node.js 的核心依赖 libuv。libuv 的结构可以分两部分，一部分是网络 I/O，底层实现会根据不同操作系统依赖不同的系统 API，另一部分是文件 I/O、DNS、用户代码，这一部分采用线程池来处理。</p><p>libuv 处理异步操作的核心机制是事件轮询，事件轮询分成若干步骤，大致操作是遍历并执行队列中的回调函数。</p><p>最后提到处理异步的 API process.nextTick 和 Promise 不属于事件轮询，使用不当则会导致事件轮询阻塞，其中一种解决方式就是使用 setImmediate 来替代。</p><p>最后布置一道思考题：尝试着阅读一下 libuv 的源码，看看能不能找出 setTimeout 对应的底层实现原理，然后把你的发现写在留言区和大家一起分享交流。</p>`,46);function q(P,L,I,O,T,w){const a=o("Image");return c(),t("div",null,[E,r,_,u,d,l(a,{alt:"image.png",src:"https://s0.lgstatic.com/i/image/M00/46/40/Ciqc1F9EvvmAC2x9AAAVgzc1Izg188.png"}),n(),y,l(a,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/46/4C/CgqCHl9EvxCAf_yRAAD8dPwXfWE007.png"}),n(),h,v,g,m,b,k,f,l(a,{alt:"image (1).png",src:"https://s0.lgstatic.com/i/image/M00/46/4C/CgqCHl9EvySAMrSYAADR1tJd-r8402.png"}),n(),U])}const N=e(i,[["render",q]]);export{A as __pageData,N as default};
