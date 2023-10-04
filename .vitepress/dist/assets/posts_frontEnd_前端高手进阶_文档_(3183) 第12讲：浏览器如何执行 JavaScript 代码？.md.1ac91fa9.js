import{_ as o,j as e,o as t,g as c,k as p,h as a,Q as l,s}from"./chunks/framework.e0c66c3f.js";const j=JSON.parse('{"title":"编译过程 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/前端高手进阶_文档/(3183) 第12讲：浏览器如何执行 JavaScript 代码？.md","filePath":"posts/frontEnd/前端高手进阶_文档/(3183) 第12讲：浏览器如何执行 JavaScript 代码？.md","lastUpdated":1696338709000}'),r={name:"posts/frontEnd/前端高手进阶_文档/(3183) 第12讲：浏览器如何执行 JavaScript 代码？.md"},E=l(`<p>这一课时从编译过程和内存管理两个方面带你来探索 JavaScript 引擎的工作机制。</p><h3 id="编译过程" tabindex="-1">编译过程 <a class="header-anchor" href="#编译过程" aria-label="Permalink to &quot;编译过程&quot;">​</a></h3><p>在&quot;加餐1：手写 CSS 预处理器&quot;中提过编译器的基本工作流程，大体上包括 3 个步骤：解析（Parsing）、转换（Transformation）及代码生成（Code Generation），JavaScript 引擎与之相比大体上也遵循这个过程，可分为解析、解释和优化 3 个步骤。下面我们就以 V8 引擎为例进行讲解。</p><h4 id="解析" tabindex="-1">解析 <a class="header-anchor" href="#解析" aria-label="Permalink to &quot;解析&quot;">​</a></h4><p>解析步骤又可以拆分成 2 个小步骤：</p><ul><li><p><strong>词法分析</strong>，将 JavaScript 代码解析成一个个的令牌（Token）；</p></li><li><p><strong>语法分析</strong>，将令牌组装成一棵抽象的语法树（AST）。</p></li></ul><p>下面是一段简单的代码，声明了一个字符串变量并调用函数 console.log 进行打印。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;web&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(name)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;web&#39;</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(name)</span></span></code></pre></div><p>通过<strong>词法分析</strong>会对这段代码逐个字符进行解析，生成类似下面结构的令牌（Token），这些令牌类型各不相同，有关键字、标识符、符号、字符串。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">Keyword</span><span style="color:#E1E4E8;">(var)</span></span>
<span class="line"><span style="color:#B392F0;">Identifier</span><span style="color:#E1E4E8;">(name)</span></span>
<span class="line"><span style="color:#B392F0;">Punctuator</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#B392F0;">String</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;web&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#B392F0;">Identifier</span><span style="color:#E1E4E8;">(console)</span></span>
<span class="line"><span style="color:#B392F0;">Punctuator</span><span style="color:#E1E4E8;">(.)</span></span>
<span class="line"><span style="color:#B392F0;">Identifier</span><span style="color:#E1E4E8;">(log)</span></span>
<span class="line"><span style="color:#B392F0;">Punctuator</span><span style="color:#E1E4E8;">(()</span></span>
<span class="line"><span style="color:#B392F0;">Identifier</span><span style="color:#E1E4E8;">(name)</span></span>
<span class="line"><span style="color:#B392F0;">Punctuator</span><span style="color:#E1E4E8;">())</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">Keyword</span><span style="color:#24292E;">(var)</span></span>
<span class="line"><span style="color:#6F42C1;">Identifier</span><span style="color:#24292E;">(name)</span></span>
<span class="line"><span style="color:#6F42C1;">Punctuator</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#6F42C1;">String</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;web&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#6F42C1;">Identifier</span><span style="color:#24292E;">(console)</span></span>
<span class="line"><span style="color:#6F42C1;">Punctuator</span><span style="color:#24292E;">(.)</span></span>
<span class="line"><span style="color:#6F42C1;">Identifier</span><span style="color:#24292E;">(log)</span></span>
<span class="line"><span style="color:#6F42C1;">Punctuator</span><span style="color:#24292E;">(()</span></span>
<span class="line"><span style="color:#6F42C1;">Identifier</span><span style="color:#24292E;">(name)</span></span>
<span class="line"><span style="color:#6F42C1;">Punctuator</span><span style="color:#24292E;">())</span></span></code></pre></div><p>语法分析阶段会用令牌生成类似下面结构的抽象语法树，生成树的过程并不是简单地把所有令牌都添加到树上，而是去除了不必要的符号令牌之后，按照语法规则来生成。</p>`,11),y=l(`<p>抽象语法树</p><h4 id="解释" tabindex="-1">解释 <a class="header-anchor" href="#解释" aria-label="Permalink to &quot;解释&quot;">​</a></h4><p>在加餐 1 中，我们将 AST 转换成新的 AST，而 JavaScript 引擎是通过解释器 Ignition 将 AST 转换成字节码。字节码是对机器码的一个抽象描述，相对于机器码而言，它的代码量更小，从而可以减少内存消耗。</p><p>下面代码是从示例代码生成的字节码中截取的一段。它的语法已经非常接近汇编语言了，有很多操作符，比如 StackCheck、Star、Return。考虑这些操作符过于底层，涉及处理器的累加器及寄存器操作，已经超出前端范围，这里就不详细介绍了。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[generated bytecode </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> function</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">0x1e680d83fc59</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">SharedFunctionInfo log</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">)]</span></span>
<span class="line"><span style="color:#E1E4E8;">Parameter count </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">Register count </span><span style="color:#79B8FF;">6</span></span>
<span class="line"><span style="color:#E1E4E8;">Frame size </span><span style="color:#79B8FF;">48</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">9646</span><span style="color:#E1E4E8;"> E</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0x376a94a60ea6</span><span style="color:#E1E4E8;"> @    </span><span style="color:#F97583;">0</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> a7                StackCheck </span></span>
<span class="line"><span style="color:#E1E4E8;">         ......</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#79B8FF;">0x376a94a60ec9</span><span style="color:#E1E4E8;"> @   </span><span style="color:#F97583;">35</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">26</span><span style="color:#E1E4E8;"> f6             Star r5</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">9683</span><span style="color:#E1E4E8;"> E</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0x376a94a60ecb</span><span style="color:#E1E4E8;"> @   </span><span style="color:#F97583;">37</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> 5a f9 </span><span style="color:#79B8FF;">02</span><span style="color:#E1E4E8;"> f7 f6 </span><span style="color:#79B8FF;">06</span><span style="color:#E1E4E8;"> CallProperty2 r2, </span><span style="color:#F97583;">&lt;</span><span style="color:#79B8FF;">this</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">, r4, r5, [</span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#79B8FF;">0x376a94a60ed1</span><span style="color:#E1E4E8;"> @   </span><span style="color:#F97583;">43</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0d</span><span style="color:#E1E4E8;">                LdaUndefined </span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">9729</span><span style="color:#E1E4E8;"> S</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0x376a94a60ed2</span><span style="color:#E1E4E8;"> @   </span><span style="color:#F97583;">44</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> ab                Return </span></span>
<span class="line"><span style="color:#E1E4E8;">Constant </span><span style="color:#B392F0;">pool</span><span style="color:#E1E4E8;"> (size </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">Handler </span><span style="color:#B392F0;">Table</span><span style="color:#E1E4E8;"> (size </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">Source Position </span><span style="color:#B392F0;">Table</span><span style="color:#E1E4E8;"> (size </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">24</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[generated bytecode </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> function</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">log</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">0x1e680d83fc59</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">SharedFunctionInfo log</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">)]</span></span>
<span class="line"><span style="color:#24292E;">Parameter count </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">Register count </span><span style="color:#005CC5;">6</span></span>
<span class="line"><span style="color:#24292E;">Frame size </span><span style="color:#005CC5;">48</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#005CC5;">9646</span><span style="color:#24292E;"> E</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0x376a94a60ea6</span><span style="color:#24292E;"> @    </span><span style="color:#D73A49;">0</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> a7                StackCheck </span></span>
<span class="line"><span style="color:#24292E;">         ......</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#005CC5;">0x376a94a60ec9</span><span style="color:#24292E;"> @   </span><span style="color:#D73A49;">35</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">26</span><span style="color:#24292E;"> f6             Star r5</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#005CC5;">9683</span><span style="color:#24292E;"> E</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0x376a94a60ecb</span><span style="color:#24292E;"> @   </span><span style="color:#D73A49;">37</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> 5a f9 </span><span style="color:#005CC5;">02</span><span style="color:#24292E;"> f7 f6 </span><span style="color:#005CC5;">06</span><span style="color:#24292E;"> CallProperty2 r2, </span><span style="color:#D73A49;">&lt;</span><span style="color:#005CC5;">this</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">, r4, r5, [</span><span style="color:#005CC5;">6</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#005CC5;">0x376a94a60ed1</span><span style="color:#24292E;"> @   </span><span style="color:#D73A49;">43</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0d</span><span style="color:#24292E;">                LdaUndefined </span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#005CC5;">9729</span><span style="color:#24292E;"> S</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0x376a94a60ed2</span><span style="color:#24292E;"> @   </span><span style="color:#D73A49;">44</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> ab                Return </span></span>
<span class="line"><span style="color:#24292E;">Constant </span><span style="color:#6F42C1;">pool</span><span style="color:#24292E;"> (size </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">Handler </span><span style="color:#6F42C1;">Table</span><span style="color:#24292E;"> (size </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">Source Position </span><span style="color:#6F42C1;">Table</span><span style="color:#24292E;"> (size </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">24</span><span style="color:#24292E;">)</span></span></code></pre></div><h4 id="优化" tabindex="-1">优化 <a class="header-anchor" href="#优化" aria-label="Permalink to &quot;优化&quot;">​</a></h4><p>解释器在得到 AST 之后，会按需进行解释和执行，也就是说如果某个函数没有被调用，则不会去解释执行它。</p><p>在这个过程中解释器会将一些重复可优化的操作（比如类型判断）收集起来生成分析数据，然后将生成的字节码和分析数据传给编译器 TurboFan，编译器会依据分析数据来生成高度优化的机器码。</p><p>优化后的机器码的作用和缓存很类似，当解释器再次遇到相同的内容时，就可以直接执行优化后的机器码。当然优化后的代码有时可能会无法运行（比如函数参数类型改变），那么会再次反优化为字节码交给解释器。</p><p>整个过程如下面流程图所示：</p>`,10),i=l(`<p>JavaScript 编译过程</p><h3 id="内存管理" tabindex="-1">内存管理 <a class="header-anchor" href="#内存管理" aria-label="Permalink to &quot;内存管理&quot;">​</a></h3><p>JavaScript 引擎的内存空间分为<strong>堆（Heap）和栈（Stack）</strong>。堆和栈是两种不同的数据结构，堆是具有树结构的数组，栈也是数组，但是遵循&quot;先进后出&quot;规则。</p><h4 id="栈" tabindex="-1">栈 <a class="header-anchor" href="#栈" aria-label="Permalink to &quot;栈&quot;">​</a></h4><p>栈是一个临时存储空间，主要存储局部变量和函数调用（对于全局表达式会创建匿名函数并调用）。</p><p>对于基本数据类型（String、Undefined、Null、Boolean、Number、BigInt、Symbol）的局部变量，会直接在栈中创建，而对象数据类型局部变量会存储在堆中，栈中只存储它的引用地址，也就是我们常说的浅拷贝。全局变量以及闭包变量也是只存储引用地址。总而言之栈中存储的数据都是轻量的。</p><p>对于函数，解释器创建了&quot;调用栈&quot;（Call Stack）来记录函数的调用流程。每调用一个函数，解释器就会把该函数添加进调用栈，解释器会为被添加进的函数创建一个栈帧 （Stack Frame，这个栈帧用来保存函数的局部变量以及执行语句）并立即执行。如果正在执行的函数还调用了其它函数，那么新函数也将会被添加进调用栈并执行。一旦这个函数执行结束，对应的栈帧也会被立即销毁。</p><p>查看调用栈的方式有 2 种：</p><ul><li><p>调用函数 console.trace() 打印到控制台；</p></li><li><p>利用浏览器开发者工具进行断点调试。</p></li></ul><h4 id="示例" tabindex="-1">示例 <a class="header-anchor" href="#示例" aria-label="Permalink to &quot;示例&quot;">​</a></h4><p>下面的代码是一个计算斐波那契数列的函数，分别通过调用 console.trace() 函数以及断点的方式得到了它的调用栈信息。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fib</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">n</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (n </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">trace</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fib</span><span style="color:#E1E4E8;">(n</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fib</span><span style="color:#E1E4E8;">(n</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#B392F0;">fib</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fib</span><span style="color:#24292E;">(</span><span style="color:#E36209;">n</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (n </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">trace</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fib</span><span style="color:#24292E;">(n</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fib</span><span style="color:#24292E;">(n</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6F42C1;">fib</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">4</span><span style="color:#24292E;">)</span></span></code></pre></div>`,12),F=s("p",null,"示例效果图",-1),d=l(`<p>示例效果图</p><p>虽然栈很轻量，只会在使用时创建，使用结束时销毁，但它并不是可以无限增长的。当分配的调用栈空间被占满时，就会引发&quot;栈溢出&quot;错误。</p><p>下面是一个递归函数导致的栈溢出报错代码片段：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">recursive</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">recursive</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">})()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">(</span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">recursive</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">recursive</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">})()</span></span></code></pre></div>`,4),u=l(`<p>栈溢出错误</p><p>所以我们在编写递归函数的时候一定要注意函数执行边界，也就是退出递归的条件。</p><h3 id="延申-尾调用" tabindex="-1">延申：尾调用 <a class="header-anchor" href="#延申-尾调用" aria-label="Permalink to &quot;延申：尾调用&quot;">​</a></h3><p>递归调用由于调用次数较多，同时每层函数调用都需要保存栈帧，所以通常是比较消耗内存的操作。对递归的优化一般有两个思路，<strong>减少递归次数和使用尾调用</strong>。</p><p>尾调用（Tail Call）是指<strong>函数的最后一步返回另一个函数的调用</strong>。例如下面的代码中，函数 a() 返回了函数 b() 的调用。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">a</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">x</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">b</span><span style="color:#E1E4E8;">(x);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">a</span><span style="color:#24292E;">(</span><span style="color:#E36209;">x</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">b</span><span style="color:#24292E;">(x);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>像下面的示例中，返回缓存的函数调用结果，或者返回多个函数调用都不属于&quot;尾调用&quot;。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">a</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">x</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> c </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">b</span><span style="color:#E1E4E8;">(x);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> c;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">a</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">x</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">b</span><span style="color:#E1E4E8;">(x) </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">c</span><span style="color:#E1E4E8;">(x);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">a</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">b</span><span style="color:#E1E4E8;">(x)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">a</span><span style="color:#24292E;">(</span><span style="color:#E36209;">x</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> c </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">b</span><span style="color:#24292E;">(x);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> c;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">a</span><span style="color:#24292E;">(</span><span style="color:#E36209;">x</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">b</span><span style="color:#24292E;">(x) </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">c</span><span style="color:#24292E;">(x);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">a</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">b</span><span style="color:#24292E;">(x)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>尾调用由于是在 return 语句中，并且是函数的最后一步操作，所以局部变量等信息不需要再用到，从而可以立即释放节省内存空间。</p><p>下面的示例代码通过递归实现了求斐波那契额数列第 n 个数的功能。函数 fibTail() 相对于函数 fib() 就同时使用了尾调用以及减少调用次数两种优化方式。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fib</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">n</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (n </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fib</span><span style="color:#E1E4E8;">(n</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fib</span><span style="color:#E1E4E8;">(n</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fibTail</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">n</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">a</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">b</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (n </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> a</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fibTail</span><span style="color:#E1E4E8;">(n </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, b, a </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> b)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fib</span><span style="color:#24292E;">(</span><span style="color:#E36209;">n</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (n </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fib</span><span style="color:#24292E;">(n</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fib</span><span style="color:#24292E;">(n</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fibTail</span><span style="color:#24292E;">(</span><span style="color:#E36209;">n</span><span style="color:#24292E;">, </span><span style="color:#E36209;">a</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#E36209;">b</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (n </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> a</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fibTail</span><span style="color:#24292E;">(n </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, b, a </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> b)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>但是由于尾调用也存在一些隐患，比如错误信息丢失、不方便调试，所以浏览器以及 Node.js 环境默认并没有支持这种优化方式。</p><h4 id="堆" tabindex="-1">堆 <a class="header-anchor" href="#堆" aria-label="Permalink to &quot;堆&quot;">​</a></h4><p>堆空间存储的数据比较复杂，大致可以划分为下面 5 个区域：代码区（Code Space）、Map 区(Map Space)、大对象区（Large Object Space）、新生代（New Space）、老生代（Old Space）。这一课时重点讨论新生代和老生代的内存回收算法。</p><h4 id="新生代" tabindex="-1">新生代 <a class="header-anchor" href="#新生代" aria-label="Permalink to &quot;新生代&quot;">​</a></h4><p>大多数的对象最开始都会被分配在新生代，该存储空间相对较小，只有几十 MB，分为两个空间：from 空间和 to 空间。</p><p>程序中声明的对象首先会被分配到 from 空间，当进行垃圾回收时，会先将 from 空间中存活的的对象（存活对象可以理解为被引用的对象）复制到 to 空间进行保存，对未存活的对象空间进行回收。当复制完成后，from 空间和 to 空间进行调换，to 空间会变为新的 from 空间，原来的 from 空间则变为 to 空间，这种算法称之为 &quot;Scavenge&quot;。</p><p>新生代的内存回收频率很高、速度也很快，但空间利用率较低，因为让一半的内存空间处于&quot;闲置&quot;状态。</p>`,18),C=l('<p>Scanvage 回收过程</p><h4 id="老生代" tabindex="-1">老生代 <a class="header-anchor" href="#老生代" aria-label="Permalink to &quot;老生代&quot;">​</a></h4><p>新生代中多次回收仍然存活的对象会被转移到空间较大的老生代。因为老生代空间较大，如果回收方式仍然采用 Scanvage 算法来频繁复制对象，那性能开销就太大了。</p><p>所以老生代采用的是另一种&quot;<strong>标记清除</strong> &quot;（<strong>Mark-Sweep</strong>）的方式来回收未存活的对象空间。</p><p>这种方式主要分为<strong>标记</strong> 和<strong>清除</strong>两个阶段。标记阶段会遍历堆中所有对象，并对存活的对象进行标记；清除阶段则是对未标记对象的空间进行回收。</p>',5),g=s("p",null,"标记清除回收过程",-1),h=s("p",null,"由于标记清除不会对内存一分为二，所以不会浪费空间。但是进行过标记清除之后的内存空间会产生很多不连续的碎片空间，这种不连续的碎片空间中，在遇到较大对象时可能会由于空间不足而导致无法存储的情况。",-1),_=s("p",null,[a("为了解决内存碎片的问题，提高对内存的利用，还需要使用到"),s("strong",null,"标记整理（Mark-Compact）"),a(" 算法。标记整理算法相对于标记清除算法在回收阶段进行了改进，标记整理对待未标记的对象并不是立即进行回收，而是将存活的对象移动到一边，然后再清理。当然这种移动对象的操作相对而言是比较耗时的，所以执行速度上，比标记清除要慢。")],-1),A=s("p",null,"标记整理回收过程",-1),b=s("h3",{id:"总结",tabindex:"-1"},[a("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),f=s("p",null,"本课时的内容偏于底层和抽象，重点在于理解和记忆。",-1),v=s("p",null,"首先讲解了 JavaScript 引擎的执行过程，包括解析、解释和优化，这一部分可以结合加餐 1 中提到的编译器知识进行理解。",-1),B=s("p",null,'然后讲到了 JavaScript 引擎的内存分为栈和堆两个部分，栈可以保存函数调用信息以及局部变量，特点是"先进后出"以及"用完立即销毁"。堆区存储的数据对象通常比较大，需要采用一定的回收算法来处理，包括用于新生代的 Scanvage 算法，以及用于老生代的标记清除和标记整理算法。',-1),m=s("p",null,"最后布置一道思考题：你还了解过哪些内存回收算法，它们有什么优缺点？",-1);function S(D,k,T,q,x,P){const n=e("Image");return t(),c("div",null,[E,p(n,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/27/1E/Ciqc1F70ZQSAGf1cAAEehLtbbTk491.png"}),a(),y,p(n,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/27/29/CgqCHl70ZTqAR9m6AAEz8M57qjs116.png"}),a(),i,p(n,{alt:"image (31).png",src:"https://s0.lgstatic.com/i/image/M00/27/16/Ciqc1F70SjGAI_8JAAANLDVx3V0087.png"}),a(),F,p(n,{alt:"image (32).png",src:"https://s0.lgstatic.com/i/image/M00/27/16/Ciqc1F70SjmAfUtiAAAkCGWd2MI629.png"}),a(),d,p(n,{alt:"image (33).png",src:"https://s0.lgstatic.com/i/image/M00/27/16/Ciqc1F70Sk6ANM__AAAQ-wQno2Q416.png"}),a(),u,p(n,{alt:"1.png",src:"https://s0.lgstatic.com/i/image6/M00/25/15/Cgp9HWBZVYuADfmqAACqB-v2Dq0515.png"}),a(),C,p(n,{alt:"5.png",src:"https://s0.lgstatic.com/i/image/M00/27/1E/Ciqc1F70ZZWAeo71AABOQKZ828k489.png"}),a(),g,h,_,p(n,{alt:"6.png",src:"https://s0.lgstatic.com/i/image/M00/27/21/Ciqc1F70cS2AU5w_AABOiU6R39g235.png"}),a(),A,b,f,v,B,m])}const V=o(r,[["render",S]]);export{j as __pageData,V as default};
