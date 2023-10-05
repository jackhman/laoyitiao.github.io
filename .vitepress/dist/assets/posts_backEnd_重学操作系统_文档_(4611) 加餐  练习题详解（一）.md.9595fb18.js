import{_ as o,j as e,o as c,g as t,k as p,Q as l,s,h as n}from"./chunks/framework.4e7d56ce.js";const w=JSON.parse('{"title":"练习题详解 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/重学操作系统_文档/(4611) 加餐  练习题详解（一）.md","filePath":"posts/backEnd/重学操作系统_文档/(4611) 加餐  练习题详解（一）.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/重学操作系统_文档/(4611) 加餐  练习题详解（一）.md"},E=l(`<p>今天我会带你把《模块一：计算机组成原理》中涉及的课后练习题，逐一讲解，并给出每个课时练习题的解题思路和答案。</p><h3 id="练习题详解" tabindex="-1">练习题详解 <a class="header-anchor" href="#练习题详解" aria-label="Permalink to &quot;练习题详解&quot;">​</a></h3><h4 id="_01-计算机是什么-如何把程序写好-这个问题是可计算的吗" tabindex="-1">01 | 计算机是什么：&quot;如何把程序写好&quot;这个问题是可计算的吗？ <a class="header-anchor" href="#_01-计算机是什么-如何把程序写好-这个问题是可计算的吗" aria-label="Permalink to &quot;01 \\| 计算机是什么：&quot;如何把程序写好&quot;这个问题是可计算的吗？&quot;">​</a></h4><p><strong>【问题】</strong> 可不可以构造一段程序证明停机问题无解?如果可以，请用自己熟悉的语言写出这段程序。</p><p>【<strong>解析</strong> 】<strong>拿到这道题，我们可以先从问题的抽象入手。</strong></p><ul><li><p>判断一段程序是否会停机的方法可以抽象成一个函数。</p></li><li><p>一段程序，也可以抽象成一个函数。</p></li></ul><p>因此，问题可以转换为：存不存在一个通用函数判断另一个函数是否会停止？</p><p><strong>接下来，再来构造冲突。</strong></p><p>假设存在一个函数 willStop，它只有一个参数 func，willStop 可以判断任意函数 func 是否会停止：</p><ul><li><p>如果会停止，返回 true；</p></li><li><p>如果不会停止返回 false。</p></li></ul><p>willStop 具体如何实现我们无法给出，这里只是做一个假设。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">func </span><span style="color:#B392F0;">willStop</span><span style="color:#E1E4E8;">(func){</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#6A737D;">//...</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">func </span><span style="color:#6F42C1;">willStop</span><span style="color:#24292E;">(func){</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#6A737D;">//...</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>下面我们构造一组冲突，构造一个叫作<code>wrappedWillStop</code>函数，它调用<code>willStop</code>构造冲突。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function </span><span style="color:#B392F0;">wrappedWillStop</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">( </span><span style="color:#B392F0;">willStop</span><span style="color:#E1E4E8;">(wrappedWillStop) ) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">){}</span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#B392F0;">wrappedWillStop</span><span style="color:#E1E4E8;">()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function </span><span style="color:#6F42C1;">wrappedWillStop</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">( </span><span style="color:#6F42C1;">willStop</span><span style="color:#24292E;">(wrappedWillStop) ) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">while</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">true</span><span style="color:#24292E;">){}</span></span>
<span class="line"><span style="color:#24292E;">  } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6F42C1;">wrappedWillStop</span><span style="color:#24292E;">()</span></span></code></pre></div><p><code>wrapped</code>版本构造冲突方法如下：调用<code>willStop</code>并把自己传进去。如果<code>willStop</code>认为<code>wrapped</code>会停止，那么就执行一个死循环。 如果<code>willStop</code>认为<code>wrapped</code>不会停止，就直接返回。</p><p>通过上述的方法，我们就知道<code>willStop</code>这样的函数肯定是无法被实现的；也就是停机问题无解。</p><h4 id="_03-程序的执行-相比-32-位-64-位的优势是什么" tabindex="-1">03 | 程序的执行：相比 32 位 64 位的优势是什么？ <a class="header-anchor" href="#_03-程序的执行-相比-32-位-64-位的优势是什么" aria-label="Permalink to &quot;03 \\| 程序的执行：相比 32 位 64 位的优势是什么？&quot;">​</a></h4><p><strong>【问题】</strong> CPU 中有没有求对数的指令？如果没有那么程序如何去计算？</p><p><strong>【解析】</strong> CPU 中求一个数字的 2 倍，可以通过左移指令。比如 10 代表数字 2，左移 1 位变成 100 就代表数字 4。CPU 提供了乘法指令，所以如果求一个数字的幂，比如 3^3^，可以拿 3*3 再乘以 3，需要计算 2 次。</p><p>但是如果求 3^100^ 次方，就不会去计算 100 次。比如你可以先计算出 3^25^，然后再求 (3^50^)^2^，就是 3^100^。所以这样就节省了 1 倍的运算。</p><p>我举例主要是想告诉大家，CPU 没有提供很复杂的指令，但是这里有很多算法可以降低我们的时间开销。</p><p>然后我们来说说求对数，求对数也是没有指令的。因为对数是指数的逆运算，当然我们可以利用乘法运算一点点尝试。比如计算 log_2^10^，我们可以先尝试 3^2^，再尝试 3.1^2^ 等等，一直找到以 2 为底 10 的对数。这其实是个近似算法。</p><p>另外，在这个问题上聪明的数学家提出了很多近似算法，提升了计算效率。具体这里比较超纲，面试通常只考到有没有求对数的指令，感兴趣的同学可以学习泰勒级数、牛顿迭代法等。</p><p>比如下面这个泰勒级数可以用来求以<code>e</code>为底的对数，可以进行相似运算。</p>`,24),y=l(`<p><strong>【补充内容】1 位的 CPU 能操作多大的内存空间？</strong></p><p>在 03 课时程序的执行中，有个问题我讲的不是很明白，在这里我们再讨论一下。</p><p>之前提到过 32 位机器只能操作小于 32 位的地址总线，这里其实讲的不太清晰，历史上出现过 32 位操作 40 位地址总线的情况。</p><p><strong>接下来再和你探讨一个极端情况，1 位的 CPU 能操作多大的内存空间</strong>。</p><p><strong>答案是：无限大</strong>。</p><p>比如说，地址总线 40 位，说明 CPU 上有 40 个引脚接了地址总线。CPU 只有 1 位，因此操作这 40 个引脚可以分成 40 步。每次设置 1 根引脚的电平是 0 还是 1。所以本身 CPU 多少位和能操作多少位地址总线，没有本质联系。但是如果需要分步操作，效率会低，需要多次操作，不如一次完成来得划算。 因此我们今天的设计通常不拿 32 位 CPU 操作 40 位地址总线，而是用 64 位 CPU 操作。</p><h4 id="_04-构造复杂的程序-将一个递归函数转成非递归函数的通用方法" tabindex="-1">04 | 构造复杂的程序 : 将一个递归函数转成非递归函数的通用方法？ <a class="header-anchor" href="#_04-构造复杂的程序-将一个递归函数转成非递归函数的通用方法" aria-label="Permalink to &quot;04 \\| 构造复杂的程序 : 将一个递归函数转成非递归函数的通用方法？&quot;">​</a></h4><p><strong>【问题】</strong> 假设你使用的程序语言不支持递归程序，如果要求用栈来模拟下面这个斐波那契求第 n 项的程序，应该如何转换成等价的基于栈的非递归实现？</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fib</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> n) {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(n </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> n </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">) { </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> n; }</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fib</span><span style="color:#E1E4E8;">(n</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fib</span><span style="color:#E1E4E8;">(n</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fib</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> n) {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(n </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> n </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">) { </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> n; }</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fib</span><span style="color:#24292E;">(n</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fib</span><span style="color:#24292E;">(n</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">)</span></span></code></pre></div><p>【<strong>解析</strong> 】<strong>其实这道题目等同于递归的函数如何非递归表达？改写斐波那契数列第 N 项目。</strong></p><p>下面是我的一个伪代码，需要实现一个 Stack。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">fib</span><span style="color:#E1E4E8;">(n) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  stack </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Stack</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 构造Stack</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// stack中每一项是一个Record</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// Record第一项是数据（参数或者返回值）</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// Record第二项是递归方向(down=1代表向下，up=2代表向上)</span></span>
<span class="line"><span style="color:#E1E4E8;">  stack.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">((n, down));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// stack中只有一项的时候递归停止</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;">(stack.</span><span style="color:#B392F0;">size</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    (n, phase) </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> stack.</span><span style="color:#B392F0;">pop</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(phase </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> down) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(n </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> n </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        stack.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">((</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">continue</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      stack.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">((n</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, down))</span></span>
<span class="line"><span style="color:#E1E4E8;">      stack.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">((n</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, up))</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      last1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> stack.</span><span style="color:#B392F0;">pop</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">      last2 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> stack.</span><span style="color:#B392F0;">pop</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">      stack.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">((last1[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> last2[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">], up))</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> stack.</span><span style="color:#B392F0;">pop</span><span style="color:#E1E4E8;">()[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">];</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">fib</span><span style="color:#24292E;">(n) {</span></span>
<span class="line"><span style="color:#24292E;">  stack </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Stack</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 构造Stack</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// stack中每一项是一个Record</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// Record第一项是数据（参数或者返回值）</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// Record第二项是递归方向(down=1代表向下，up=2代表向上)</span></span>
<span class="line"><span style="color:#24292E;">  stack.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">((n, down));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// stack中只有一项的时候递归停止</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">while</span><span style="color:#24292E;">(stack.</span><span style="color:#6F42C1;">size</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    (n, phase) </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> stack.</span><span style="color:#6F42C1;">pop</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(phase </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> down) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(n </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> n </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        stack.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">((</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">continue</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      stack.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">((n</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, down))</span></span>
<span class="line"><span style="color:#24292E;">      stack.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">((n</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, up))</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      last1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> stack.</span><span style="color:#6F42C1;">pop</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">      last2 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> stack.</span><span style="color:#6F42C1;">pop</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">      stack.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">((last1[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> last2[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">], up))</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> stack.</span><span style="color:#6F42C1;">pop</span><span style="color:#24292E;">()[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">];</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="_05-存储器分级-ssd、内存和-l1-cache-相比速度差多少倍" tabindex="-1">05 | 存储器分级 ：SSD、内存和 L1 Cache 相比速度差多少倍？ <a class="header-anchor" href="#_05-存储器分级-ssd、内存和-l1-cache-相比速度差多少倍" aria-label="Permalink to &quot;05 \\| 存储器分级 ：SSD、内存和 L1 Cache 相比速度差多少倍？&quot;">​</a></h4><p><strong>【问题】</strong> 假设有一个二维数组，总共有 1M 个条目，如果我们要遍历这个二维数组，应该逐行遍历还是逐列遍历？</p><p><strong>【解析】</strong> 二维数组本质还是 1 维数组。只不过进行了脚标运算。比如说一个 N 行 M 列的数组，第 y 行第 x 列的坐标是： x + y*M。因此当行坐标增加时，内存空间是跳跃的。列坐标增加时，内存空间是连续的。</p>`,15),i=s("p",null,"当 CPU 遍历二维数组的时候，会先从 CPU 缓存中取数据。",-1),d=s("p",null,"关键因素在于现在的 CPU 设计不是每次读取一个内存地址，而是读取每次读取相邻的多个内存地址（内存速度 200～300 CPU 周期，预读提升效率）。所以这相当于机器和人的约定，如果程序员不按照这个约定，就无法利用预读的优势。",-1),F=s("p",null,[n('另一方面当读取内存地址跳跃较大的时候，会触发内存的页面置换，这个知识在"'),s("strong",null,"模块五：内存管理"),n('"中学习。')],-1),h=s("h3",{id:"总结",tabindex:"-1"},[n("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),u=s("p",null,"以上这些练习题你做得怎么样呢？我看到很多同学在留言区写下了练习题答案、思考过程以及课后总结，当然还有很多同学提出了问题。有问题是好事，说明你在认真思考，这也是构建知识体系的一部分。经过长期的积累，相信你会得到意想不到的收获。",-1);function C(_,g,k,A,D,b){const a=e("Image");return c(),t("div",null,[E,p(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/57/F6/Ciqc1F9twiuAbp_aAAAe6lkGtXY531.png"}),y,p(a,{alt:"Lark20200925-181059.png",src:"https://s0.lgstatic.com/i/image/M00/57/F6/Ciqc1F9twnCAUTt4AACDLWAQvC4277.png"}),i,d,F,h,u])}const v=o(r,[["render",C]]);export{w as __pageData,v as default};
