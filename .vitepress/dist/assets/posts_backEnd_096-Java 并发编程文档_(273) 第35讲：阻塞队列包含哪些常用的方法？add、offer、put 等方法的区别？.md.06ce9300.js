import{_ as p,j as o,o as e,g as t,k as n,h as l,Q as c,s}from"./chunks/framework.e0c66c3f.js";const Q=JSON.parse('{"title":"第一组：add、remove、element ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/096-Java 并发编程文档/(273) 第35讲：阻塞队列包含哪些常用的方法？add、offer、put 等方法的区别？.md","filePath":"posts/backEnd/096-Java 并发编程文档/(273) 第35讲：阻塞队列包含哪些常用的方法？add、offer、put 等方法的区别？.md","lastUpdated":1696338709000}'),r={name:"posts/backEnd/096-Java 并发编程文档/(273) 第35讲：阻塞队列包含哪些常用的方法？add、offer、put 等方法的区别？.md"},E=c(`<p>在本课时中我们主要讲解阻塞队列包含哪些常用的方法，以及 add，offer，put 等方法的区别。</p><p>在阻塞队列中有很多方法，而且它们都非常相似，所以非常有必要对这些类似的方法进行辨析，所以本课时会用分类的方式，和你一起，把阻塞队列中常见的方法进行梳理和讲解。</p><p>我们把 BlockingQueue 中最常用的和添加、删除相关的 8 个方法列出来，并且把它们分为三组，每组方法都和添加、移除元素相关。</p><p>这三组方法由于功能很类似，所以比较容易混淆。它们的区别仅在于特殊情况：当队列满了无法添加元素，或者是队列空了无法移除元素时，不同组的方法对于这种特殊情况会有不同的处理方式：</p><ol><li>抛出异常：add、remove、element</li><li>返回结果但不抛出异常：offer、poll、peek</li><li>阻塞：put、take</li></ol><h3 id="第一组-add、remove、element" tabindex="-1">第一组：add、remove、element <a class="header-anchor" href="#第一组-add、remove、element" aria-label="Permalink to &quot;第一组：add、remove、element&quot;">​</a></h3><h4 id="add-方法" tabindex="-1">add 方法 <a class="header-anchor" href="#add-方法" aria-label="Permalink to &quot;add 方法&quot;">​</a></h4><p>add 方法是往队列里添加一个元素，如果队列满了，就会抛出异常来提示队列已满。示例代码如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">addTest</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    BlockingQueue&lt;</span><span style="color:#F97583;">Integer</span><span style="color:#E1E4E8;">&gt; blockingQueue </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;">                     ArrayBlockingQueue&lt;</span><span style="color:#F97583;">Integer</span><span style="color:#E1E4E8;">&gt;(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    blockingQueue.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    blockingQueue.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    blockingQueue.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">addTest</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    BlockingQueue&lt;</span><span style="color:#D73A49;">Integer</span><span style="color:#24292E;">&gt; blockingQueue </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;">                     ArrayBlockingQueue&lt;</span><span style="color:#D73A49;">Integer</span><span style="color:#24292E;">&gt;(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    blockingQueue.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    blockingQueue.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    blockingQueue.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>在这段代码中，我们创建了一个容量为 2 的 BlockingQueue，并且尝试往里面放 3 个值，超过了容量上限，那么在添加第三个值的时候就会得到异常：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">Exception in thread </span><span style="color:#9ECBFF;">&quot;main&quot;</span><span style="color:#E1E4E8;"> java.lang.IllegalStateException</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">Queue full</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">Exception in thread </span><span style="color:#032F62;">&quot;main&quot;</span><span style="color:#24292E;"> java.lang.IllegalStateException</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">Queue full</span></span></code></pre></div><h4 id="remove-方法" tabindex="-1">remove 方法 <a class="header-anchor" href="#remove-方法" aria-label="Permalink to &quot;remove 方法&quot;">​</a></h4><p>remove 方法的作用是删除元素，如果我们删除的队列是空的，由于里面什么都没有，所以也无法删除任何元素，那么 remove 方法就会抛出异常。示例代码如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">removeTest</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    ArrayBlockingQueue&lt;</span><span style="color:#F97583;">Integer</span><span style="color:#E1E4E8;">&gt; blockingQueue </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;">     ArrayBlockingQueue&lt;</span><span style="color:#F97583;">Integer</span><span style="color:#E1E4E8;">&gt;(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    blockingQueue.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    blockingQueue.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    blockingQueue.</span><span style="color:#B392F0;">remove</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    blockingQueue.</span><span style="color:#B392F0;">remove</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    blockingQueue.</span><span style="color:#B392F0;">remove</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">removeTest</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    ArrayBlockingQueue&lt;</span><span style="color:#D73A49;">Integer</span><span style="color:#24292E;">&gt; blockingQueue </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;">     ArrayBlockingQueue&lt;</span><span style="color:#D73A49;">Integer</span><span style="color:#24292E;">&gt;(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    blockingQueue.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    blockingQueue.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    blockingQueue.</span><span style="color:#6F42C1;">remove</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    blockingQueue.</span><span style="color:#6F42C1;">remove</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    blockingQueue.</span><span style="color:#6F42C1;">remove</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>在这段代码中，我们往一个容量为 2 的 BlockingQueue 里放入 2 个元素，并且删除 3 个元素。在删除前面两个元素的时候会正常执行，因为里面依然有元素存在，但是在删除第三个元素时，由于队列里面已经空了，所以便会抛出异常：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">Exception in thread </span><span style="color:#9ECBFF;">&quot;main&quot;</span><span style="color:#E1E4E8;"> java.util.NoSuchElementException</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">Exception in thread </span><span style="color:#032F62;">&quot;main&quot;</span><span style="color:#24292E;"> java.util.NoSuchElementException</span></span></code></pre></div><h4 id="element-方法" tabindex="-1">element 方法 <a class="header-anchor" href="#element-方法" aria-label="Permalink to &quot;element 方法&quot;">​</a></h4><p>element 方法是返回队列的头部节点，但是并不删除。和 remove 方法一样，如果我们用这个方法去操作一个空队列，想获取队列的头结点，可是由于队列是空的，我们什么都获取不到，会抛出和前面 remove 方法一样的异常：NoSuchElementException。示例代码如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">elementTest</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    ArrayBlockingQueue&lt;</span><span style="color:#F97583;">Integer</span><span style="color:#E1E4E8;">&gt; blockingQueue </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;">     ArrayBlockingQueue&lt;</span><span style="color:#F97583;">Integer</span><span style="color:#E1E4E8;">&gt;(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    blockingQueue.</span><span style="color:#B392F0;">element</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">elementTest</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    ArrayBlockingQueue&lt;</span><span style="color:#D73A49;">Integer</span><span style="color:#24292E;">&gt; blockingQueue </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;">     ArrayBlockingQueue&lt;</span><span style="color:#D73A49;">Integer</span><span style="color:#24292E;">&gt;(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    blockingQueue.</span><span style="color:#6F42C1;">element</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>我们新建了一个容量为 2 的 ArrayBlockingQueue，直接调用 element 方法，由于之前没有往里面添加元素，默认为空，那么会得到异常：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">Exception in thread </span><span style="color:#9ECBFF;">&quot;main&quot;</span><span style="color:#E1E4E8;"> java.util.NoSuchElementException</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">Exception in thread </span><span style="color:#032F62;">&quot;main&quot;</span><span style="color:#24292E;"> java.util.NoSuchElementException</span></span></code></pre></div><h3 id="第二组-offer、poll、peek" tabindex="-1">第二组：offer、poll、peek <a class="header-anchor" href="#第二组-offer、poll、peek" aria-label="Permalink to &quot;第二组：offer、poll、peek&quot;">​</a></h3><p>实际上我们通常并不想看到第一组方法抛出的异常，这时我们可以优先采用第二组方法。第二组方法相比于第一组而言要友好一些，当发现队列满了无法添加，或者队列为空无法删除的时候，第二组方法会给一个提示，而不是抛出一个异常。</p><h4 id="offer-方法" tabindex="-1">offer 方法 <a class="header-anchor" href="#offer-方法" aria-label="Permalink to &quot;offer 方法&quot;">​</a></h4><p>offer 方法用来插入一个元素，并用返回值来提示插入是否成功。如果添加成功会返回 true，而如果队列已经满了，此时继续调用 offer 方法的话，它不会抛出异常，只会返回一个错误提示：false。示例代码如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">offerTest</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    ArrayBlockingQueue&lt;</span><span style="color:#F97583;">Integer</span><span style="color:#E1E4E8;">&gt; blockingQueue </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> ArrayBlockingQueue&lt;</span><span style="color:#F97583;">Integer</span><span style="color:#E1E4E8;">&gt;(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(blockingQueue.</span><span style="color:#B392F0;">offer</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">    System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(blockingQueue.</span><span style="color:#B392F0;">offer</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">    System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(blockingQueue.</span><span style="color:#B392F0;">offer</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">));</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">offerTest</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    ArrayBlockingQueue&lt;</span><span style="color:#D73A49;">Integer</span><span style="color:#24292E;">&gt; blockingQueue </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> ArrayBlockingQueue&lt;</span><span style="color:#D73A49;">Integer</span><span style="color:#24292E;">&gt;(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(blockingQueue.</span><span style="color:#6F42C1;">offer</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">    System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(blockingQueue.</span><span style="color:#6F42C1;">offer</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">    System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(blockingQueue.</span><span style="color:#6F42C1;">offer</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">));</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>我们创建了一个容量为 2 的 ArrayBlockingQueue，并且调用了三次 offer方法尝试添加，每次都把返回值打印出来，运行结果如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#79B8FF;">false</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#005CC5;">false</span></span></code></pre></div><p>可以看出，前面两次添加成功了，但是第三次添加的时候，已经超过了队列的最大容量，所以会返回 false，表明添加失败。</p><h4 id="poll-方法" tabindex="-1">poll 方法 <a class="header-anchor" href="#poll-方法" aria-label="Permalink to &quot;poll 方法&quot;">​</a></h4><p>poll 方法和第一组的 remove 方法是对应的，作用也是移除并返回队列的头节点。但是如果当队列里面是空的，没有任何东西可以移除的时候，便会返回 null 作为提示。正因如此，我们是不允许往队列中插入 null 的，否则我们没有办法区分返回的 null 是一个提示还是一个真正的元素。示例代码如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">pollTest</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    ArrayBlockingQueue&lt;</span><span style="color:#F97583;">Integer</span><span style="color:#E1E4E8;">&gt; blockingQueue </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> ArrayBlockingQueue&lt;</span><span style="color:#F97583;">Integer</span><span style="color:#E1E4E8;">&gt;(</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    blockingQueue.</span><span style="color:#B392F0;">offer</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    blockingQueue.</span><span style="color:#B392F0;">offer</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    blockingQueue.</span><span style="color:#B392F0;">offer</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(blockingQueue.</span><span style="color:#B392F0;">poll</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">    System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(blockingQueue.</span><span style="color:#B392F0;">poll</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">    System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(blockingQueue.</span><span style="color:#B392F0;">poll</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">    System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(blockingQueue.</span><span style="color:#B392F0;">poll</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">pollTest</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    ArrayBlockingQueue&lt;</span><span style="color:#D73A49;">Integer</span><span style="color:#24292E;">&gt; blockingQueue </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> ArrayBlockingQueue&lt;</span><span style="color:#D73A49;">Integer</span><span style="color:#24292E;">&gt;(</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    blockingQueue.</span><span style="color:#6F42C1;">offer</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    blockingQueue.</span><span style="color:#6F42C1;">offer</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    blockingQueue.</span><span style="color:#6F42C1;">offer</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(blockingQueue.</span><span style="color:#6F42C1;">poll</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">    System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(blockingQueue.</span><span style="color:#6F42C1;">poll</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">    System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(blockingQueue.</span><span style="color:#6F42C1;">poll</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">    System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(blockingQueue.</span><span style="color:#6F42C1;">poll</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>在这个代码中我们创建了一个容量为 3 的 ArrayBlockingQueue，并且先往里面放入 3 个元素，然后四次调用 poll 方法，运行结果如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#79B8FF;">2</span></span>
<span class="line"><span style="color:#79B8FF;">3</span></span>
<span class="line"><span style="color:#79B8FF;">null</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#005CC5;">2</span></span>
<span class="line"><span style="color:#005CC5;">3</span></span>
<span class="line"><span style="color:#005CC5;">null</span></span></code></pre></div><p>前面三次 poll 都运行成功了，并且返回了元素内容 1、2、3，是先进先出的顺序。第四次的 poll 方法返回 null，代表此时已经没有元素可以移除了。</p><h4 id="peek-方法" tabindex="-1">peek 方法 <a class="header-anchor" href="#peek-方法" aria-label="Permalink to &quot;peek 方法&quot;">​</a></h4><p>peek 方法和第一组的 element 方法是对应的，意思是返回队列的头元素但并不删除。如果队列里面是空的，它便会返回 null 作为提示。示例代码如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">peekTest</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    ArrayBlockingQueue&lt;</span><span style="color:#F97583;">Integer</span><span style="color:#E1E4E8;">&gt; blockingQueue </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> ArrayBlockingQueue&lt;</span><span style="color:#F97583;">Integer</span><span style="color:#E1E4E8;">&gt;(</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(blockingQueue.</span><span style="color:#B392F0;">peek</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">peekTest</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    ArrayBlockingQueue&lt;</span><span style="color:#D73A49;">Integer</span><span style="color:#24292E;">&gt; blockingQueue </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> ArrayBlockingQueue&lt;</span><span style="color:#D73A49;">Integer</span><span style="color:#24292E;">&gt;(</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(blockingQueue.</span><span style="color:#6F42C1;">peek</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>运行结果：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">null</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">null</span></span></code></pre></div><p>我们新建了一个空的 ArrayBlockingQueue，然后直接调用 peek，返回结果 null，代表此时并没有东西可以取出。</p><h4 id="带超时时间的-offer-和-poll" tabindex="-1">带超时时间的 offer 和 poll <a class="header-anchor" href="#带超时时间的-offer-和-poll" aria-label="Permalink to &quot;带超时时间的 offer 和 poll&quot;">​</a></h4><p>第二组还有一些额外值得讲解的内容，offer 和 poll 都有带超时时间的重载方法。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">offer</span><span style="color:#E1E4E8;">(E e, </span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> timeout, TimeUnit unit)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">offer</span><span style="color:#24292E;">(E e, </span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> timeout, TimeUnit unit)</span></span></code></pre></div><p>它有三个参数，分别是元素、超时时长和时间单位。通常情况下，这个方法会插入成功并返回 true；如果队列满了导致插入不成功，在调用带超时时间重载方法的 offer 的时候，则会等待指定的超时时间，如果时间到了依然没有插入成功，就会返回 false。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">poll</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> timeout, TimeUnit unit)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">poll</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> timeout, TimeUnit unit)</span></span></code></pre></div><p>带时间参数的 poll 方法和 offer 类似：如果能够移除，便会立刻返回这个节点的内容；如果队列是空的就会进行等待，等待时间正是我们指定的时间，直到超时时间到了，如果队列里依然没有元素可供移除，便会返回 null 作为提示。</p><h3 id="第三组-put、take" tabindex="-1">第三组：put、take <a class="header-anchor" href="#第三组-put、take" aria-label="Permalink to &quot;第三组：put、take&quot;">​</a></h3><p>第三组是我们比较熟悉的、阻塞队列最大特色的 put 和 take 方法，我们复习一下 34 课时里对于 put 和 take 方法的讲解。</p><h4 id="put-方法" tabindex="-1">put 方法 <a class="header-anchor" href="#put-方法" aria-label="Permalink to &quot;put 方法&quot;">​</a></h4><p>put 方法的作用是插入元素。通常在队列没满的时候是正常的插入，但是如果队列已满就无法继续插入，这时它既不会立刻返回 false 也不会抛出异常，而是让插入的线程陷入阻塞状态，直到队列里有了空闲空间，此时队列就会让之前的线程解除阻塞状态，并把刚才那个元素添加进去。</p>`,51),y=s("h4",{id:"take-方法",tabindex:"-1"},[l("take 方法 "),s("a",{class:"header-anchor",href:"#take-方法","aria-label":'Permalink to "take 方法"'},"​")],-1),i=s("p",null,"take 方法的作用是获取并移除队列的头结点。通常在队列里有数据的时候会正常取出数据并删除；但是如果执行 take 的时候队列里无数据，则阻塞，直到队列里有数据；一旦队列里有数据了，就会立刻解除阻塞状态，并且取到数据。",-1),u=s("h3",{id:"总结",tabindex:"-1"},[l("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),d=s("p",null,"以上就是本课时的内容，本课时我们讲解了阻塞队列中常见的方法并且把它们分为了三组，每一组都有各自的特点。第一组的特点是在无法正常执行的情况下抛出异常；第二组的特点是在无法正常执行的情况下不抛出异常，但会用返回值提示运行失败；第三组的特点是在遇到特殊情况时让线程陷入阻塞状态，等到可以运行再继续执行。",-1),g=s("p",null,"我们用表格把上面 8 种方法总结如下：",-1),h=s("p",null,"有了这个表格之后，我们就可以非常清晰地理清这 8 个方法之间的关系了，课后你可以仔细对比表格以加深印象。",-1);function k(F,v,b,C,m,f){const a=o("Image");return e(),t("div",null,[E,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/7E/Cgq2xl4lhcOAYPonAAB1UtAAltk655.png"}),y,i,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/7E/Cgq2xl4lhdWAWOz8AABp-t8dt_8107.png"}),u,d,g,n(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/62/7E/CgpOIF4lheGALDjnAAHFyzrSvqU109.png"}),l(),h])}const A=p(r,[["render",k]]);export{Q as __pageData,A as default};
