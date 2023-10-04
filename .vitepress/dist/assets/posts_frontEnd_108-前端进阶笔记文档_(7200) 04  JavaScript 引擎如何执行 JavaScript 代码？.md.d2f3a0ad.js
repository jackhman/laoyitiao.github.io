import{_ as p,j as o,o as l,g as e,k as n,Q as s}from"./chunks/framework.e0c66c3f.js";const f=JSON.parse('{"title":"JavaScript 代码运行的各个阶段 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/108-前端进阶笔记文档/(7200) 04  JavaScript 引擎如何执行 JavaScript 代码？.md","filePath":"posts/frontEnd/108-前端进阶笔记文档/(7200) 04  JavaScript 引擎如何执行 JavaScript 代码？.md","lastUpdated":1696338709000}'),c={name:"posts/frontEnd/108-前端进阶笔记文档/(7200) 04  JavaScript 引擎如何执行 JavaScript 代码？.md"},t=s(`<p>JavaScript 在运行过程中与其他语言有所不一样，如果你不理解 JavaScript 的词法环境、执行上下文等内容，很容易会在开发过程中埋下&quot;莫名奇妙&quot;的 Bug，比如<code>this</code>指向和预期不一致、某个变量不知道为什么被改了，等等。所以今天我就跟大家聊一聊 JavaScript 代码的运行过程。</p><p>大家都知道，JavaScript 代码是需要在 JavaScript 引擎中运行的。我们在说到 JavaScript 运行的时候，常常会提到执行环境、词法环境、作用域、执行上下文、闭包等内容。这些概念看起来都差不多，却好像又不大容易区分清楚，它们分别都在描述什么呢？</p><p>这些词语都是与 JavaScript 引擎执行代码的过程有关，为了搞清楚这些概念之间的区别，我们可以回顾下 JavaScript 代码运行过程中的各个阶段。</p><h3 id="javascript-代码运行的各个阶段" tabindex="-1">JavaScript 代码运行的各个阶段 <a class="header-anchor" href="#javascript-代码运行的各个阶段" aria-label="Permalink to &quot;JavaScript 代码运行的各个阶段&quot;">​</a></h3><p>JavaScript 是弱类型语言，在运行时才能确定变量类型。即使是如今流行的 TypeScript，也只是增加了编译时（编译成 JavaScript）的类型检测（对于编译器相信大家都有所了解，代码编译过程中编译器会进行词法分析、语法分析、语义分析、生成 AST 等处理）。</p><p>同样，JavaScript 引擎在执行 JavaScript 代码时，也会从上到下进行词法分析、语法分析、语义分析等处理，并在代码解析完成后生成 AST（抽象语法树），最终根据 AST 生成 CPU 可以执行的机器码并执行。</p><p>这个过程，我们后面统一描述为语法分析阶段。除了语法分析阶段，JavaScript 引擎在执行代码时还会进行其他的处理。以 V8 引擎为例，在 V8 引擎中 JavaScript 代码的运行过程主要分成三个阶段。</p><ol><li><p><strong>语法分析阶段。</strong> 该阶段会对代码进行语法分析，检查是否有语法错误（SyntaxError），如果发现语法错误，会在控制台抛出异常并终止执行。</p></li><li><p><strong>编译阶段。</strong> 该阶段会进行执行上下文（Execution Context）的创建，包括创建变量对象、建立作用域链、确定 this 的指向等。每进入一个不同的运行环境时，V8 引擎都会创建一个新的执行上下文。</p></li><li><p><strong>执行阶段。</strong> 将编译阶段中创建的执行上下文压入调用栈，并成为正在运行的执行上下文，代码执行结束后，将其弹出调用栈。</p></li></ol><p>其中，语法分析阶段属于编译器通用内容，就不再赘述。前面提到的执行环境、词法环境、作用域、执行上下文等内容都是在编译和执行阶段中产生的概念。</p><blockquote><p>关于调用栈的内容我们会在下一讲详细讲解，目前我们只需要知道 JavaScript 在运行过程中会产生一个调用栈，调用栈遵循 LIFO（先进后出，后进先出）原则即可。</p></blockquote><p>今天，我们重点介绍编译阶段，而编译阶段的核心便是执行上下文的创建。</p><h3 id="执行上下文的创建" tabindex="-1">执行上下文的创建 <a class="header-anchor" href="#执行上下文的创建" aria-label="Permalink to &quot;执行上下文的创建&quot;">​</a></h3><p>执行上下文的创建离不开 JavaScript 的运行环境，JavaScript 运行环境包括全局环境、函数环境和<code>eval</code>，其中全局环境和函数环境的创建过程如下：</p><ol><li><p>第一次载入 JavaScript 代码时，首先会创建一个全局环境。全局环境位于最外层，直到应用程序退出后（例如关闭浏览器和网页）才会被销毁。</p></li><li><p>每个函数都有自己的运行环境，当函数被调用时，则会进入该函数的运行环境。当该环境中的代码被全部执行完毕后，该环境会被销毁。不同的函数运行环境不一样，即使是同一个函数，在被多次调用时也会创建多个不同的函数环境。</p></li></ol><p>在不同的运行环境中，变量和函数可访问的其他数据范围不同，环境的行为（比如创建和销毁）也有所区别。而每进入一个不同的运行环境时，JavaScript 都会创建一个新的执行上下文，该过程包括：</p><ul><li><p>建立作用域链（Scope Chain）；</p></li><li><p>创建变量对象（Variable Object，简称 VO）；</p></li><li><p>确定 this 的指向。</p></li></ul><p>由于建立作用域链过程中会涉及变量对象的概念，因此我们先来看看变量对象的创建，再看建立作用域链和确定 this 的指向。</p><h4 id="创建变量对象" tabindex="-1">创建变量对象 <a class="header-anchor" href="#创建变量对象" aria-label="Permalink to &quot;创建变量对象&quot;">​</a></h4><p>什么是变量对象呢？每个执行上下文都会有一个关联的变量对象，该对象上会保存这个上下文中定义的所有变量和函数。</p><p>而在浏览器中，全局环境的变量对象是<code>window</code>对象，因此所有的全局变量和函数都是作为<code>window</code>对象的属性和方法创建的。相应的，在 Node 中全局环境的变量对象则是<code>global</code>对象。</p><p>了解了什么是变量对象之后，我们来看下创建变量对象的过程。创建变量对象将会创建<code>arguments</code>对象（仅函数环境下），同时会检查当前上下文的函数声明和变量声明。</p><ul><li><p>对于变量声明：此时会给变量分配内存，并将其初始化为<code>undefined</code>（该过程只进行定义声明，执行阶段才执行赋值语句）。</p></li><li><p>对于函数声明：此时会在内存里创建函数对象，并且直接初始化为该函数对象。</p></li></ul><p>上述变量声明和函数声明的处理过程，便是我们常说的变量提升和函数提升，其中函数声明提升会优先于变量声明提升。因为变量提升容易带来变量在预期外被覆盖掉的问题，同时还可能导致本应该被销毁的变量没有被销毁等情况。因此 ES6 中引入了<code>let</code>和<code>const</code>关键字，从而使 JavaScript 也拥有了块级作用域。</p><p>或许你会感到疑惑，JavaScript 是怎么支持块级作用域的呢？这就涉及作用域的概念。</p><p>在各类编程语言中，作用域分为静态作用域和动态作用域。JavaScript 采用的是词法作用域（Lexical Scoping），也就是静态作用域。词法作用域中的变量，在编译过程中会产生一个确定的作用域。</p><p>到这里，或许你对会词法作用域、作用域、执行上下文、词法环境之间的关系依然感到混乱，没关系，我这就来给你梳理下。</p><p>刚刚说到，词法作用域中的变量，在编译过程中会产生一个确定的作用域，这个作用域即当前的执行上下文，在 ES5 后我们使用词法环境（Lexical Environment）替代作用域来描述该执行上下文。因此，词法环境可理解为我们常说的作用域，同样也指当前的执行上下文（注意，是当前的执行上下文）。</p><p>在 JavaScript 中，词法环境又分为词法环境（Lexical Environment）和变量环境（Variable Environment）两种，其中：</p><ul><li><p>变量环境用来记录<code>var</code>/<code>function</code>等变量声明；</p></li><li><p>词法环境是用来记录<code>let</code>/<code>const</code>/<code>class</code>等变量声明。</p></li></ul><p>也就是说，创建变量过程中会进行函数提升和变量提升，JavaScript 会通过词法环境来记录函数和变量声明。通过使用两个词法环境（而不是一个）分别记录不同的变量声明内容，JavaScript 实现了支持块级作用域的同时，不影响原有的变量声明和函数声明。</p><p>这就是创建变量的过程，它属于执行上下文创建中的一环。创建变量的过程会产生作用域，作用域也被称为词法环境，那词法环境是由什么组成的呢？下面我结合作用域链的建立过程一起来进行分析。</p><h4 id="建立作用域链" tabindex="-1">建立作用域链 <a class="header-anchor" href="#建立作用域链" aria-label="Permalink to &quot;建立作用域链&quot;">​</a></h4><p>作用域链，顾名思义，就是将各个作用域通过某种方式连接在一起。</p><p>前面说过，作用域就是词法环境，而词法环境由两个成员组成。</p><ul><li><p>环境记录（Environment Record）：用于记录自身词法环境中的变量对象。</p></li><li><p>外部词法环境引用（Outer Lexical Environment）：记录外层词法环境的引用。</p></li></ul><p>通过外部词法环境的引用，作用域可以层层拓展，建立起从里到外延伸的一条作用域链。当某个变量无法在自身词法环境记录中找到时，可以根据外部词法环境引用向外层进行寻找，直到最外层的词法环境中外部词法环境引用为<code>null</code>，这便是作用域链的变量查询。</p><p>那么，这个外部词法环境引用又是怎样指向外层呢？我们来看看 JavaScript 中是如何通过外部词法环境引用来创建作用域的。</p><p>为了方便描述，我们将 JavaScript 代码运行过程分为定义期和执行期，前面提到的编译阶段则属于定义期。</p><p>来看一个例子，我们定义了全局函数<code>foo</code>，并在该函数中定义了函数<code>bar</code>：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function </span><span style="color:#B392F0;">foo</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">dir</span><span style="color:#E1E4E8;">(bar);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> a </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  function </span><span style="color:#B392F0;">bar</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    a </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">dir</span><span style="color:#E1E4E8;">(foo);</span></span>
<span class="line"><span style="color:#B392F0;">foo</span><span style="color:#E1E4E8;">();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function </span><span style="color:#6F42C1;">foo</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">dir</span><span style="color:#24292E;">(bar);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> a </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  function </span><span style="color:#6F42C1;">bar</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    a </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">dir</span><span style="color:#24292E;">(foo);</span></span>
<span class="line"><span style="color:#6F42C1;">foo</span><span style="color:#24292E;">();</span></span></code></pre></div><p>前面我们说到，JavaScript 使用的是静态作用域，因此函数的作用域在定义期已经决定了。在上面的例子中，全局函数<code>foo</code>创建了一个<code>foo</code>的<code>[[scope]]</code>属性，包含了全局<code>[[scope]]</code>：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">foo[[scope]] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [globalContext];</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">foo[[scope]] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [globalContext];</span></span></code></pre></div><p>而当我们执行<code>foo()</code>时，也会分别进入<code>foo</code>函数的定义期和执行期。</p><p>在<code>foo</code>函数的定义期时，函数<code>bar</code>的<code>[[scope]]</code>将会包含全局<code>[[scope]]</code>和<code>foo</code>的<code>[[scope]]</code>：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">bar[[scope]] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [fooContext, globalContext];</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">bar[[scope]] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [fooContext, globalContext];</span></span></code></pre></div><p>运行上述代码，我们可以在控制台看到符合预期的输出：</p>`,46),r=s(`<p>可以看到：</p><ul><li><p><code>foo</code>的<code>[[scope]]</code>属性包含了全局<code>[[scope]]</code></p></li><li><p><code>bar</code>的<code>[[scope]]</code>将会包含全局<code>[[scope]]</code>和<code>foo</code>的<code>[[scope]]</code></p></li></ul><p>也就是说，<strong>JavaScript 会通过外部词法环境引用来创建变量对象的一个作用域链，从而保证对执行环境有权访问的变量和函数的有序访问</strong>。除了创建作用域链之外，在这个过程中还会对创建的变量对象做一些处理。</p><p>前面我们说过，编译阶段会进行变量对象（VO）的创建，该过程会进行函数声明和变量声明，这时候变量的值被初始化为 undefined。在代码进入执行阶段之后，JavaScript 会对变量进行赋值，此时变量对象会转为活动对象（Active Object，简称 AO），转换后的活动对象才可被访问，这就是 VO -&gt; AO 的过程。</p><p>为了更好地理解这个过程，我们来看个例子，我们在<code>foo</code>函数中定义了变量<code>b</code>、函数<code>c</code>和函数表达式变量<code>d</code>：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function </span><span style="color:#B392F0;">foo</span><span style="color:#E1E4E8;">(a) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> b </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  function </span><span style="color:#B392F0;">c</span><span style="color:#E1E4E8;">() {}</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> d </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">function</span><span style="color:#E1E4E8;">() {};</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">​</span></span>
<span class="line"><span style="color:#B392F0;">foo</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function </span><span style="color:#6F42C1;">foo</span><span style="color:#24292E;">(a) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> b </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  function </span><span style="color:#6F42C1;">c</span><span style="color:#24292E;">() {}</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> d </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">function</span><span style="color:#24292E;">() {};</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">​</span></span>
<span class="line"><span style="color:#6F42C1;">foo</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span></code></pre></div><p>在执行<code>foo(1)</code>时，首先进入定义期，此时：</p><ul><li><p>参数变量<code>a</code>的值为<code>1</code></p></li><li><p>变量<code>b</code>和<code>d</code>初始化为<code>undefined</code></p></li><li><p>函数<code>c</code>创建函数并初始化</p></li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">AO </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  arguments</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">0</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    length</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  a</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  b</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> undefined,</span></span>
<span class="line"><span style="color:#E1E4E8;">  c</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> reference to function </span><span style="color:#B392F0;">c</span><span style="color:#E1E4E8;">(){},</span></span>
<span class="line"><span style="color:#E1E4E8;">  d</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> undefined</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">AO </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  arguments</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">0</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    length</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  a</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  b</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> undefined,</span></span>
<span class="line"><span style="color:#24292E;">  c</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> reference to function </span><span style="color:#6F42C1;">c</span><span style="color:#24292E;">(){},</span></span>
<span class="line"><span style="color:#24292E;">  d</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> undefined</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>前面我们也有提到，进入执行期之后，会执行赋值语句进行赋值，此时变量<code>b</code>和<code>d</code>会被赋值为 2 和函数表达式：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">AO </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">   arguments</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">0</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    length</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  a</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  b</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  c</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> reference to function </span><span style="color:#B392F0;">c</span><span style="color:#E1E4E8;">(){},</span></span>
<span class="line"><span style="color:#E1E4E8;">  d</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> reference to FunctionExpression </span><span style="color:#9ECBFF;">&quot;d&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">AO </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">   arguments</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">0</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    length</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  a</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  b</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  c</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> reference to function </span><span style="color:#6F42C1;">c</span><span style="color:#24292E;">(){},</span></span>
<span class="line"><span style="color:#24292E;">  d</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> reference to FunctionExpression </span><span style="color:#032F62;">&quot;d&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这就是 VO -&gt; AO 过程。</p><ul><li><p>在定义期（编译阶段）：该对象值仍为<code>undefined</code>，且处于不可访问的状态。</p></li><li><p>进入执行期（执行阶段）：VO 被激活，其中变量属性会进行赋值。</p></li></ul><p>实际上在执行的时候，除了 VO 被激活，活动对象还会添加函数执行时传入的参数和<code>arguments</code>这个特殊对象，因此 AO 和 VO 的关系可以用以下关系来表达：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">AO </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> VO </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> function parameters </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> arguments</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">AO </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> VO </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> function parameters </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> arguments</span></span></code></pre></div><p>现在，我们知道作用域链是在进入代码的执行阶段时，通过外部词法环境引用来创建的。总结如下：</p><ul><li><p>在编译阶段，JavaScript 在创建执行上下文的时候会先创建变量对象（VO）；</p></li><li><p>在执行阶段，变量对象（VO）被激活为活动对象（ AO），函数内部的变量对象通过外部词法环境的引用创建作用域链。</p></li></ul><p>虽然 JavaScript 代码的运行过程可以分为语法分析阶段、编译阶段和执行阶段，但由于在 JavaScript 引擎中是通过调用栈的方式来执行 JavaScript 代码的（下一讲会介绍），因此并不存在&quot;整个 JavaScript 运行过程只会在某个阶段中&quot;这一说法，比如上面例子中<code>bar</code>函数的编译阶段，其实是在<code>foo</code>函数的执行阶段中。</p><p>一般来说，当函数执行结束之后，执行期上下文将被销毁（作用域链和活动对象均被销毁）。但有时候我们想要保留其中一些变量对象，不想被销毁，此时就会使用到闭包。</p><p>我们已经知道，通过作用域链，我们可以在函数内部可以直接读取外部以及全局变量，但外部环境是无法访问内部函数里的变量。比如下面的例子中，<code>foo</code>函数中定义了变量<code>a</code>：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function </span><span style="color:#B392F0;">foo</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> a </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#B392F0;">foo</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(a); </span><span style="color:#6A737D;">// undefined</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function </span><span style="color:#6F42C1;">foo</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> a </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6F42C1;">foo</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(a); </span><span style="color:#6A737D;">// undefined</span></span></code></pre></div><p>我们在全局环境下无法访问函数<code>foo</code>中的变量<code>a</code>，这是因为全局函数的作用域链里，不含有函数<code>foo</code>内的作用域。</p><p>如果我们想要访问内部函数的变量，可以通过函数<code>foo</code>中的函数<code>bar</code>返回变量<code>a</code>，并将函数<code>bar</code>返回，这样我们在全局环境中也可以通过调用函数<code>foo</code>返回的函数<code>bar</code>，来访问变量<code>a</code>：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function </span><span style="color:#B392F0;">foo</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> a </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  function </span><span style="color:#B392F0;">bar</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> a;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> bar;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> b </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">foo</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">b</span><span style="color:#E1E4E8;">()); </span><span style="color:#6A737D;">// 1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function </span><span style="color:#6F42C1;">foo</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> a </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  function </span><span style="color:#6F42C1;">bar</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> a;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> bar;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> b </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">foo</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">b</span><span style="color:#24292E;">()); </span><span style="color:#6A737D;">// 1</span></span></code></pre></div><p>前面我们说到，当函数执行结束之后，执行期上下文将被销毁，其中包括作用域链和激活对象。那么，在这个例子中，当<code>b()</code>执行时，<code>foo</code>函数上下文包括作用域都已经被销毁了，为什么<code>foo</code>作用域下的<code>a</code>依然可以被访问到呢？</p><p>这是因为<code>bar</code>函数引用了<code>foo</code>函数变量对象中的值，此时即使创建<code>bar</code>函数的<code>foo</code>函数执行上下文被销毁了，但它的变量对象依然会保留在 JavaScript 内存中，<code>bar</code>函数依然可以通过<code>bar</code>函数的作用域链找到它，并进行访问。这便是我们常说的闭包，即使创建它的上下文已经销毁，它仍然被保留在内存中。</p><p>闭包使得我们可以从外部读取局部变量，在大多数项目中都会被使用到，常见的用途包括：</p><ul><li><p>用于从外部读取其他函数内部变量的函数；</p></li><li><p>可以使用闭包来模拟私有方法；</p></li><li><p>让这些变量的值始终保持在内存中。</p></li></ul><p>需要注意的是，我们在使用闭包的时候，需要及时清理不再使用到的变量，否则可能导致内存泄漏问题。</p><p>相信大家现在已经掌握了作用域链的建立过程，那么作用域链的用途想必大家也已经了解，比如在函数执行过程中变量的解析：</p><ul><li><p>从当前词法环境开始，沿着作用域链逐级向外层寻找环境记录，直到找到同名变量为止；</p></li><li><p>找到后不再继续遍历，找不到就报错。</p></li></ul><p>下面我们继续来看，执行上下文的创建过程中还会做的一件事：确定<code>this</code>的指向。</p><h4 id="确定-this-的指向" tabindex="-1">确定 this 的指向 <a class="header-anchor" href="#确定-this-的指向" aria-label="Permalink to &quot;确定 this 的指向&quot;">​</a></h4><p>在 JavaScript 中，<code>this</code>指向执行当前代码对象的所有者，可简单理解为<code>this</code>指向最后调用当前代码的那个对象。相信大家都很熟悉<code>this</code>，因此这里我就进行结论性的简单总结。</p><p>根据 JavaScript 中函数的调用方式不同，<code>this</code>的指向分为以下情况。</p>`,35),E=s(`<ul><li><p>在全局环境中，<code>this</code>指向全局对象（在浏览器中为<code>window</code>）</p></li><li><p>在函数内部，<code>this</code>的值取决于函数被调用的方式</p><ul><li><p>函数作为对象的方法被调用，<code>this</code>指向调用这个方法的对象</p></li><li><p>函数用作构造函数时（使用<code>new</code>关键字），它的<code>this</code>被绑定到正在构造的新对象</p></li><li><p>在类的构造函数中，<code>this</code>是一个常规对象，类中所有非静态的方法都会被添加到<code>this</code>的原型中</p></li></ul></li><li><p>在箭头函数中，<code>this</code>指向它被创建时的环境</p></li><li><p>使用<code>apply</code>、<code>call</code>、<code>bind</code>等方式调用：根据 API 不同，可切换函数执行的上下文环境，即<code>this</code>绑定的对象</p></li></ul><p>可以看到，<code>this</code>在不同的情况下会有不同的指向，在 ES6 箭头函数还没出现之前，为了能正确获取某个运行环境下<code>this</code>对象，我们常常会使用<code>var that = this;</code>、<code>var self = this;</code>这样的代码将变量分配给<code>this</code>，便于使用。这种方式降低了代码可读性，因此如今这种做法不再被提倡，通过正确使用箭头函数，我们可以更好地管理作用域。</p><p>到这里，围绕 JavaScript 的编译阶段和执行阶段中执行上下文创建相关的内容已经介绍完毕。</p><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3><p>今天我主要介绍了 JavaScript 代码的运行过程，该过程分为语法分析阶段、编译阶段、执行阶段三个阶段。</p><p>在编译阶段，JavaScript会进行执行上下文的创建，包括：</p><ul><li><p>创建变量对象，进行变量声明和函数声明，此时会产生变量提升和函数提升；</p></li><li><p>通过添加对外部词法环境的引用，建立作用域链，通过作用域链可以访问外部的变量对象；</p></li><li><p>确定 this 的指向。</p></li></ul><p>在执行阶段，变量对象（VO）会被激活为活动对象（AO），变量会进行赋值，此时活动对象才可被访问。在执行结束之后，作用域链和活动对象均被销毁，使用闭包可使活动对象依然被保留在内存中。这就是 JavaScript 代码的运行过程。</p><p>我们前面也说过，下面这段代码中<code>bar</code>函数的编译阶段是在<code>foo</code>函数的执行阶段中 ：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function </span><span style="color:#B392F0;">foo</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">dir</span><span style="color:#E1E4E8;">(bar);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> a </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  function </span><span style="color:#B392F0;">bar</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    a </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">dir</span><span style="color:#E1E4E8;">(foo);</span></span>
<span class="line"><span style="color:#B392F0;">foo</span><span style="color:#E1E4E8;">();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function </span><span style="color:#6F42C1;">foo</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">dir</span><span style="color:#24292E;">(bar);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> a </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  function </span><span style="color:#6F42C1;">bar</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    a </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">dir</span><span style="color:#24292E;">(foo);</span></span>
<span class="line"><span style="color:#6F42C1;">foo</span><span style="color:#24292E;">();</span></span></code></pre></div><p>你能说出整段代码的运行过程分别是怎样的，变量对象 AO/VO、作用域链、this 指向在各个阶段中又会怎样表现呢？可以把你的想法写在留言区。</p><p>其实，JavaScript 的运行过程和 EventLoop 结合可以有更好的理解，关于 EventLoop 我会在下一讲进行介绍，你也可以在学习之后再来结合本讲内容进行总结。</p>`,12);function i(y,d,v,u,h,F){const a=o("Image");return l(),e("div",null,[t,n(a,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M01/37/18/Cgp9HWB1uyGAAaZIAAK9qHI3wvE362.png"}),r,n(a,{alt:"this 指向.png",src:"https://s0.lgstatic.com/i/image6/M01/37/18/Cgp9HWB1uzSAQvuHAAJh7k1PAh8263.png"}),E])}const b=p(c,[["render",i]]);export{f as __pageData,b as default};
