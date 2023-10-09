import{_ as o,j as e,o as t,h as c,k as n,f as a,Q as l,s as p}from"./chunks/framework.d3daa342.js";const B=JSON.parse('{"title":"21引擎进阶（上）：探究宏任务&微任务的运行机制","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/JavaScript 核心原理精讲_文档/(6194) 21  引擎进阶（上）：探究宏任务 & 微任务的运行机制.md","filePath":"posts/frontEnd/JavaScript 核心原理精讲_文档/(6194) 21  引擎进阶（上）：探究宏任务 & 微任务的运行机制.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/JavaScript 核心原理精讲_文档/(6194) 21  引擎进阶（上）：探究宏任务 & 微任务的运行机制.md"},E=l(`<h1 id="_21引擎进阶-上-探究宏任务-微任务的运行机制" tabindex="-1">21引擎进阶（上）：探究宏任务&amp;微任务的运行机制 <a class="header-anchor" href="#_21引擎进阶-上-探究宏任务-微任务的运行机制" aria-label="Permalink to &quot;21引擎进阶（上）：探究宏任务&amp;微任务的运行机制&quot;">​</a></h1><p>不知道你是否还记得在<a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=601#/detail/pc?id=6192" target="_blank" rel="noreferrer">第 19 讲</a>中，我对 Eventloop 的知识进行了讲解，其中对宏任务和微任务做了简单的铺垫，那么这一讲我们就来深挖一下它背后蕴含的原理。</p><p>我会先带你分析宏任务和微任务的运行机制，并针对你日常开发中遇到的各种宏任务&amp;微任务的方法，结合一些例子来看看代码运行的顺序逻辑，帮你把这部分知识点重新归纳和梳理。</p><p>在日常开发中，例如 setTimeout 和 promise 都是经常会使用到的 JS 方法。当这些方法变多了之后，再结合 JS 的异步编程代码混合使用，最终的执行顺序也经常会让开发者迷惑，因此要把这些问题搞清楚，这部分你还是有必要好好学习一下。</p><p>在课程开始前请你先思考一下：</p><ol><li><p>宏任务和微任务分别有哪些方法？</p></li><li><p>宏任务和微任务互相嵌套，执行顺序是什么样的？</p></li></ol><h3 id="代码执行顺序-一" tabindex="-1">代码执行顺序（一） <a class="header-anchor" href="#代码执行顺序-一" aria-label="Permalink to &quot;代码执行顺序（一）&quot;">​</a></h3><p>开始讲解正式内容之前，我们先看一段代码，算是开胃的前菜，如果你之前对这部分知识稍有了解，一般都应该可以回答正确。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;begin&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#B392F0;">setTimeout</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;setTimeout&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Promise</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">resolve</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;promise&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">}).</span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;then1&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }).</span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;then2&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;end&#39;</span><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;begin&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#6F42C1;">setTimeout</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;setTimeout&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Promise</span><span style="color:#24292E;">((</span><span style="color:#E36209;">resolve</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;promise&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">}).</span><span style="color:#6F42C1;">then</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;then1&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  }).</span><span style="color:#6F42C1;">then</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;then2&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;end&#39;</span><span style="color:#24292E;">);</span></span></code></pre></div><p>这段代码应该比较简单，答案就是：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">begin</span></span>
<span class="line"><span style="color:#E1E4E8;">promise</span></span>
<span class="line"><span style="color:#E1E4E8;">end</span></span>
<span class="line"><span style="color:#E1E4E8;">then1</span></span>
<span class="line"><span style="color:#E1E4E8;">then2</span></span>
<span class="line"><span style="color:#E1E4E8;">setTimeout</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">begin</span></span>
<span class="line"><span style="color:#24292E;">promise</span></span>
<span class="line"><span style="color:#24292E;">end</span></span>
<span class="line"><span style="color:#24292E;">then1</span></span>
<span class="line"><span style="color:#24292E;">then2</span></span>
<span class="line"><span style="color:#24292E;">setTimeout</span></span></code></pre></div><p>其实这个就涉及了 JavaScript 事件轮询中的宏任务和微任务，如果你答对了，恭喜你，说明你的基本思路是没问题的。那么这里我就直接给出结论，宏任务和微任务的执行顺序基本是，在 EventLoop 中，每一次循环称为一次 tick，主要的任务顺序如下：</p><ol><li><p>执行栈选择最先进入队列的宏任务，执行其同步代码直至结束；</p></li><li><p>检查是否有微任务，如果有则执行直到微任务队列为空；</p></li><li><p>如果是在浏览器端，那么基本要渲染页面了；</p></li><li><p>开始下一轮的循环（tick），执行宏任务中的一些异步代码，例如 setTimeout 等。</p></li></ol><p>那么结合这个结论，以及第 19 讲学习的 EventLoop 的内容，来看下它们的运转流程效果图。</p>`,14),y=l(`<p>Call-Stack（调用栈）也就是执行栈，它是一个栈的结构，符合先进后出的机制，每次一个循环，先执行最先入队的宏任务，然后再执行微任务。不管微任务还是宏任务，它们只要按照顺序进入了执行栈，那么执行栈就还是按照先进后出的规则，一步一步执行。</p><p>因此根据这个原则，最先进行调用栈的宏任务，一般情况下都是最后返回执行的结果。那么从上面的代码中可以看到 setTimeout 的确最后执行了打印的结果。</p><p>这就是宏任务和微任务代码夹杂的情况下，代码的执行顺序，那么下面我们来专门看看宏任务到底有哪些，有什么值得关注的点。</p><h3 id="宏任务" tabindex="-1">宏任务 <a class="header-anchor" href="#宏任务" aria-label="Permalink to &quot;宏任务&quot;">​</a></h3><p>如果在浏览器的环境下，宏任务主要分为下面这几个大类：</p><ol><li><p>渲染事件（比如解析 DOM、计算布局、绘制）；</p></li><li><p>用户交互事件（比如鼠标点击、滚动页面、放大缩小等）；</p></li><li><p>setTimeout、setInterval 等；</p></li><li><p>网络请求完成、文件读写完成事件。</p></li></ol><p>为了让这些任务在主线程上执行，页面进程引入了消息队列和事件循环机制，我们把这些消息队列中的任务称为宏任务。宏任务基本上满足了日常的开发需求，而对于时间精度有要求的宏任务就不太能满足了，比如渲染事件、各种 I/O、用户交互的事件等，都随时有可能被添加到消息队列中，JS 代码不能准确掌控任务要添加到队列中的位置，控制不了任务在消息队列中的位置，所以很难控制开始执行任务的时间。</p><p>为了方便理解，你可以看看下面的这段代码。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">callback2</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">callback</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">setTimeout</span><span style="color:#E1E4E8;">(callback2,</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#B392F0;">setTimeout</span><span style="color:#E1E4E8;">(callback,</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">callback2</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">callback</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">setTimeout</span><span style="color:#24292E;">(callback2,</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6F42C1;">setTimeout</span><span style="color:#24292E;">(callback,</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">)</span></span></code></pre></div><p>在上面这段代码中，我的目的是想通过 setTimeout 来设置两个回调任务，并让它们按照前后顺序来执行，中间也不要再插入其他的任务。但是实际情况我们难以控制，比如在你调用 setTimeout 来设置回调任务的间隙，消息队列中就有可能被插入很多系统级的任务。如果中间被插入的任务执行时间过久的话，那么就会影响到后面任务的执行了。所以说宏任务的时间粒度比较大，执行的间隔是不能精确控制的。这就不适用于一些高实时性的需求了，比如后面要讲到的监听 DOM 变化。</p><h3 id="微任务" tabindex="-1">微任务 <a class="header-anchor" href="#微任务" aria-label="Permalink to &quot;微任务&quot;">​</a></h3><p>在理解了宏任务之后，下面我们就可以来看看什么是微任务了。微任务就是一个需要异步执行的函数，执行时机是在主函数执行结束之后、当前宏任务结束之前。</p><p>我们知道当 JavaScript 执行一段脚本的时候，V8 会为其创建一个全局执行上下文，同时 V8 引擎也会在内部创建一个微任务队列。这个微任务队列就是用来存放微任务的，因为在当前宏任务执行的过程中，有时候会产生多个微任务，这时候就需要使用这个微任务队列来保存这些微任务了。不过这个微任务队列是给 V8 引擎内部使用的，所以你是无法通过 JavaScript 直接访问的。</p><p>那么微任务是怎么产生的呢？在现代浏览器里面，产生微任务有两种方式。</p><ol><li><p>使用 MutationObserver 监控某个 DOM 节点，或者为这个节点添加、删除部分子节点，当 DOM 节点发生变化时，就会产生 DOM 变化记录的微任务。</p></li><li><p>使用 Promise，当调用 Promise.resolve() 或者 Promise.reject() 的时候，也会产生微任务。</p></li></ol><p>通过 DOM 节点变化产生的微任务或者使用 Promise 产生的微任务都会被 JS 引擎按照顺序保存到微任务队列中。现在微任务队列中有了微任务，那么接下来就要看看微任务队列是何时被执行的。</p><p>通常情况下，在当前宏任务中的 JavaScript 快执行完成时，也就是在 JavaScript 引擎准备退出全局执行上下文并清空调用栈的时候，JavaScript 引擎会检查全局执行上下文中的微任务队列，然后按照顺序执行队列中的微任务。</p><p>如果在执行微任务的过程中，产生了新的微任务，一样会将该微任务添加到微任务队列中，V8 引擎一直循环执行微任务队列中的任务，直到队列清空才算执行结束。也就是说<strong>在执行微任务过程中产生的新的微任务并不会推迟到下一个循环中执行，而是在当前的循环中继续执行</strong>，这点是需要注意的。</p><p>以上就是微任务的工作流程，从上面的分析我们可以得出如下几个结论。</p><ol><li><p>微任务和宏任务是绑定的，每个宏任务在执行时，会创建自己的微任务队列。</p></li><li><p>微任务的执行时长会影响当前宏任务的时长。比如一个宏任务在执行过程中，产生了 10 个微任务，执行每个微任务的时间是 10ms，那么执行这 10 个微任务的时间就是 100ms，也可以说这 10 个微任务让宏任务的执行时间延长了 100ms。</p></li><li><p>在一个宏任务中，分别创建一个用于回调的宏任务和微任务，无论什么情况下，微任务都早于宏任务执行。</p></li></ol><p>关于微任务就先说到这里，上面我提到了 MutationObserver，它又是什么呢？下面一起来看一下。</p><h3 id="监听-dom-变化应用场景" tabindex="-1">监听 DOM 变化应用场景 <a class="header-anchor" href="#监听-dom-变化应用场景" aria-label="Permalink to &quot;监听 DOM 变化应用场景&quot;">​</a></h3><p>MutationObserver 是用来监听 DOM 变化的一套方法，而监听 DOM 变化一直是前端工程师经常要做的事情之一。</p><p>虽然监听 DOM 的需求是比较频繁的，不过早期页面并没有提供对监听的支持，所以那时要观察 DOM 是否变化，唯一能做的就是轮询检测。比如使用 setTimeout 或者 setInterval 来定时检测 DOM 是否有改变。这种方式简单粗暴，但是会遇到两个问题：如果时间间隔设置过长，DOM 变化响应不够及时；反过来如果时间间隔设置过短，又会浪费很多无用的工作量去检查 DOM，会让页面变得低效。</p><p>从 DOM 4 开始，W3C 推出了 MutationObserver。MutationObserver API 可以用来监视 DOM 的变化，包括属性的变更、节点的增加、内容的改变等。因为上面我们分析过，在两个任务之间，可能会被渲染进程插入其他的事件，从而影响到响应的实时性。这时候，微任务就可以上场了，在每次 DOM 节点发生变化的时候，渲染引擎将变化记录封装成微任务，并将微任务添加进当前的微任务队列中。这样当执行到检查点的时候，V8 引擎就会按照顺序执行微任务了。</p><p>综上所述，MutationObserver 采用了&quot;异步 + 微任务&quot;的策略：</p><ul><li><p>通过异步操作解决了同步操作的性能问题；</p></li><li><p>通过微任务解决了实时性的问题。</p></li></ul><p>好了，到这里你对宏任务和微任务的原理，以及执行顺序的特点已经有一定的了解了，那么最后我再结合 JS 的异步编程，给你展示一段比开篇那段更复杂一些的代码片段，考考你是否能说出正确答案。</p><h3 id="代码执行顺序-二" tabindex="-1">代码执行顺序（二） <a class="header-anchor" href="#代码执行顺序-二" aria-label="Permalink to &quot;代码执行顺序（二）&quot;">​</a></h3><p>通过上面的原理学习，请你接着看下面的代码，它的执行结果是什么样的呢？</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">async1</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;async1 start&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">await</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">async2</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;async1 end&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">async</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">async2</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;async2&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#B392F0;">async1</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#B392F0;">setTimeout</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;timeout&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Promise</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">resolve</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;promise1&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">resolve</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}).</span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;promise2&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;script end&quot;</span><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">async1</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;async1 start&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">await</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">async2</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;async1 end&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">async</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">async2</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;async2&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6F42C1;">async1</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#6F42C1;">setTimeout</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;timeout&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Promise</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">resolve</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;promise1&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">resolve</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}).</span><span style="color:#6F42C1;">then</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;promise2&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;script end&quot;</span><span style="color:#24292E;">);</span></span></code></pre></div><p>这段代码除了考察你对微任务和宏任务的理解外，也顺带考察了宏任务微任务结合异步编程最后的执行逻辑，这里你可以先按照自己的学习思路给出一个答案，之后再拿到浏览器端运行一下结果，对照着你的答案看是否正确，这里我就先不放答案了，因为怕会影响你的思考。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>这一讲，我们一起探讨了宏任务和微任务的相关知识，针对宏任务和微任务的区别以及执行顺序，我这里总结了一个表格，方便你深入理解，请看。</p>`,34),i=p("p",null,"另外，关于我在文中提到的 MutationObserver，你可以进行一些实践，更深入地了解它的底层逻辑，介于篇幅的问题，这部分知识点我就不过多介绍了。",-1),F=p("p",null,"好了，这一讲就先说到这里了。接下来我们就要进入 JS 引擎篇的最后一讲 Process.nextTick 的原理学习，从上面的表格中你可以看出 Process.nextTick 也是微任务中的一种，它又会带给我们哪些思考呢？下一讲我会为你揭晓。",-1);function u(d,h,g,_,m,C){const s=e("Image");return t(),c("div",null,[E,n(s,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M00/1E/49/Cgp9HWBQhFyAf7TxAAK_oyhU5eM671.png"}),a(),y,n(s,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M00/1E/49/Cgp9HWBQhGiAIsk6AAE2uN-H8dg753.png"}),a(),i,F])}const b=o(r,[["render",u]]);export{B as __pageData,b as default};
