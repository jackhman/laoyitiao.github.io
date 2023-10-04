import{_ as n,j as l,o as p,g as e,k as o,Q as s}from"./chunks/framework.e0c66c3f.js";const T=JSON.parse('{"title":"什么是内存泄漏 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/096-Java 并发编程文档/(285) 第47讲：内存泄漏——为何每次用完 ThreadLocal 都要调用 remove()？.md","filePath":"posts/backEnd/096-Java 并发编程文档/(285) 第47讲：内存泄漏——为何每次用完 ThreadLocal 都要调用 remove()？.md","lastUpdated":1696338709000}'),c={name:"posts/backEnd/096-Java 并发编程文档/(285) 第47讲：内存泄漏——为何每次用完 ThreadLocal 都要调用 remove()？.md"},t=s(`<p>在本课时我们主要讲解为什么用完 ThreadLocal 之后都要求调用 remove 方法？</p><p>首先，我们要知道这个事情和内存泄漏有关，所以就让我们先来看一下什么是内存泄漏。</p><h3 id="什么是内存泄漏" tabindex="-1">什么是内存泄漏 <a class="header-anchor" href="#什么是内存泄漏" aria-label="Permalink to &quot;什么是内存泄漏&quot;">​</a></h3><p>内存泄漏指的是，当某一个对象不再有用的时候，占用的内存却不能被回收，这就叫作<strong>内存泄漏</strong>。</p><p>因为通常情况下，如果一个对象不再有用，那么我们的垃圾回收器 GC，就应该把这部分内存给清理掉。这样的话，就可以让这部分内存后续重新分配到其他的地方去使用；否则，如果对象没有用，但一直不能被回收，这样的垃圾对象如果积累的越来越多，则会导致我们可用的内存越来越少，最后发生内存不够用的 OOM 错误。</p><p>下面我们来分析一下，在 ThreadLocal 中这样的内存泄漏是如何发生的。</p><h4 id="key-的泄漏" tabindex="-1">Key 的泄漏 <a class="header-anchor" href="#key-的泄漏" aria-label="Permalink to &quot;Key 的泄漏&quot;">​</a></h4><p>在上一讲中，我们分析了 ThreadLocal 的内部结构，知道了每一个 Thread 都有一个 ThreadLocal.ThreadLocalMap 这样的类型变量，该变量的名字叫作 threadLocals。线程在访问了 ThreadLocal 之后，都会在它的 ThreadLocalMap 里面的 Entry 中去维护该 ThreadLocal 变量与具体实例的映射。</p><p>我们可能会在业务代码中执行了 ThreadLocal instance = null 操作，想清理掉这个 ThreadLocal 实例，但是假设我们在 ThreadLocalMap 的 Entry 中强引用了 ThreadLocal 实例，那么，虽然在业务代码中把 ThreadLocal 实例置为了 null，但是在 Thread 类中依然有这个引用链的存在。</p><p>GC 在垃圾回收的时候会进行可达性分析，它会发现这个 ThreadLocal 对象依然是可达的，所以对于这个 ThreadLocal 对象不会进行垃圾回收，这样的话就造成了内存泄漏的情况。</p><p>JDK 开发者考虑到了这一点，所以 ThreadLocalMap 中的 Entry 继承了 WeakReference 弱引用，代码如下所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Entry</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">WeakReference</span><span style="color:#E1E4E8;">&lt;ThreadLocal&lt;</span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;">&gt;&gt; {</span></span>
<span class="line"><span style="color:#6A737D;">    /** The value associated with this ThreadLocal. */</span></span>
<span class="line"><span style="color:#E1E4E8;">    Object value;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">Entry</span><span style="color:#E1E4E8;">(ThreadLocal&lt;</span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#FFAB70;">k</span><span style="color:#E1E4E8;">, Object </span><span style="color:#FFAB70;">v</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">(k);</span></span>
<span class="line"><span style="color:#E1E4E8;">        value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> v;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Entry</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">WeakReference</span><span style="color:#24292E;">&lt;ThreadLocal&lt;</span><span style="color:#D73A49;">?</span><span style="color:#24292E;">&gt;&gt; {</span></span>
<span class="line"><span style="color:#6A737D;">    /** The value associated with this ThreadLocal. */</span></span>
<span class="line"><span style="color:#24292E;">    Object value;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">Entry</span><span style="color:#24292E;">(ThreadLocal&lt;</span><span style="color:#D73A49;">?</span><span style="color:#24292E;">&gt; </span><span style="color:#E36209;">k</span><span style="color:#24292E;">, Object </span><span style="color:#E36209;">v</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">(k);</span></span>
<span class="line"><span style="color:#24292E;">        value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> v;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>可以看到，这个 Entry 是 extends WeakReference。弱引用的特点是，如果这个对象只被弱引用关联，而没有任何强引用关联，那么这个对象就可以被回收，所以弱引用不会阻止 GC。因此，这个弱引用的机制就避免了 ThreadLocal 的内存泄露问题。</p><p>这就是为什么 Entry 的 key 要使用弱引用的原因。</p><h4 id="value-的泄漏" tabindex="-1">Value 的泄漏 <a class="header-anchor" href="#value-的泄漏" aria-label="Permalink to &quot;Value 的泄漏&quot;">​</a></h4><p>可是，如果我们继续研究的话会发现，虽然 ThreadLocalMap 的每个 Entry 都是一个对 key 的弱引用，但是这个 Entry 包含了一个对 value 的强引用，还是刚才那段代码：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Entry</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">WeakReference</span><span style="color:#E1E4E8;">&lt;ThreadLocal&lt;</span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;">&gt;&gt; {</span></span>
<span class="line"><span style="color:#6A737D;">    /** The value associated with this ThreadLocal. */</span></span>
<span class="line"><span style="color:#E1E4E8;">    Object value;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">Entry</span><span style="color:#E1E4E8;">(ThreadLocal&lt;</span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#FFAB70;">k</span><span style="color:#E1E4E8;">, Object </span><span style="color:#FFAB70;">v</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">(k);</span></span>
<span class="line"><span style="color:#E1E4E8;">        value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> v;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Entry</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">WeakReference</span><span style="color:#24292E;">&lt;ThreadLocal&lt;</span><span style="color:#D73A49;">?</span><span style="color:#24292E;">&gt;&gt; {</span></span>
<span class="line"><span style="color:#6A737D;">    /** The value associated with this ThreadLocal. */</span></span>
<span class="line"><span style="color:#24292E;">    Object value;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">Entry</span><span style="color:#24292E;">(ThreadLocal&lt;</span><span style="color:#D73A49;">?</span><span style="color:#24292E;">&gt; </span><span style="color:#E36209;">k</span><span style="color:#24292E;">, Object </span><span style="color:#E36209;">v</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">(k);</span></span>
<span class="line"><span style="color:#24292E;">        value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> v;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>可以看到，value = v 这行代码就代表了强引用的发生。</p><p>正常情况下，当线程终止，key 所对应的 value 是可以被正常垃圾回收的，因为没有任何强引用存在了。但是有时线程的生命周期是很长的，如果线程迟迟不会终止，那么可能 ThreadLocal 以及它所对应的 value 早就不再有用了。在这种情况下，我们应该保证它们都能够被正常的回收。</p><p>为了更好地分析这个问题，我们用下面这张图来看一下具体的引用链路（实线代表强引用，虚线代表弱引用）：</p>`,20),r=s(`<p>可以看到，左侧是引用栈，栈里面有一个 ThreadLocal 的引用和一个线程的引用，右侧是我们的堆，在堆中是对象的实例。</p><p>我们重点看一下下面这条链路：Thread Ref → Current Thread → ThreadLocalMap → Entry → Value → 可能泄漏的value实例。</p><p>这条链路是随着线程的存在而一直存在的，如果线程执行耗时任务而不停止，那么当垃圾回收进行可达性分析的时候，这个 Value 就是可达的，所以不会被回收。但是与此同时可能我们已经完成了业务逻辑处理，不再需要这个 Value 了，此时也就发生了内存泄漏问题。</p><p>JDK 同样也考虑到了这个问题，在执行 ThreadLocal 的 set、remove、rehash 等方法时，它都会扫描 key 为 null 的 Entry，如果发现某个 Entry 的 key 为 null，则代表它所对应的 value 也没有作用了，所以它就会把对应的 value 置为 null，这样，value 对象就可以被正常回收了。</p><p>但是假设 ThreadLocal 已经不被使用了，那么实际上 set、remove、rehash 方法也不会被调用，与此同时，如果这个线程又一直存活、不终止的话，那么刚才的那个调用链就一直存在，也就导致了 value 的内存泄漏。</p><h4 id="如何避免内存泄露" tabindex="-1">如何避免内存泄露 <a class="header-anchor" href="#如何避免内存泄露" aria-label="Permalink to &quot;如何避免内存泄露&quot;">​</a></h4><p>分析完这个问题之后，该如何解决呢？解决方法就是我们本课时的标题：调用 ThreadLocal 的 remove 方法。调用这个方法就可以删除对应的 value 对象，可以避免内存泄漏。</p><p>我们来看一下 remove 方法的源码：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">remove</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    ThreadLocalMap m </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getMap</span><span style="color:#E1E4E8;">(Thread.</span><span style="color:#B392F0;">currentThread</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (m </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        m.</span><span style="color:#B392F0;">remove</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">remove</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    ThreadLocalMap m </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getMap</span><span style="color:#24292E;">(Thread.</span><span style="color:#6F42C1;">currentThread</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (m </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        m.</span><span style="color:#6F42C1;">remove</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>可以看出，它是先获取到 ThreadLocalMap 这个引用的，并且调用了它的 remove 方法。这里的 remove 方法可以把 key 所对应的 value 给清理掉，这样一来，value 就可以被 GC 回收了。</p><p>所以，在使用完了 ThreadLocal 之后，我们应该手动去调用它的 remove 方法，目的是防止内存泄漏的发生。</p><blockquote><p>注：第一张图片和引用链相关内容，参考自<a href="https://blog.csdn.net/zhongxiangbo/article/details/70859181" target="_blank" rel="noreferrer">https://blog.csdn.net/zhongxiangbo/article/details/70859181</a>，但未能找到更原始的出处，原作者若看到，欢迎联系，将进行标注。</p></blockquote>`,12);function E(y,i,d,h,v,u){const a=l("Image");return p(),e("div",null,[t,o(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/68/C4/Cgq2xl5Pld-AHFhJAADLtGXmSxc833.png"}),r])}const F=n(c,[["render",E]]);export{T as __pageData,F as default};
