import{_ as s,o as n,h as a,Q as l}from"./chunks/framework.d3daa342.js";const h=JSON.parse('{"title":"第37讲：阻塞和非阻塞队列的并发安全原理是什么？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/096-Java 并发编程文档/(275) 第37讲：阻塞和非阻塞队列的并发安全原理是什么？.md","filePath":"posts/backEnd/096-Java 并发编程文档/(275) 第37讲：阻塞和非阻塞队列的并发安全原理是什么？.md","lastUpdated":1696682708000}'),p={name:"posts/backEnd/096-Java 并发编程文档/(275) 第37讲：阻塞和非阻塞队列的并发安全原理是什么？.md"},o=l(`<h1 id="第37讲-阻塞和非阻塞队列的并发安全原理是什么" tabindex="-1">第37讲：阻塞和非阻塞队列的并发安全原理是什么？ <a class="header-anchor" href="#第37讲-阻塞和非阻塞队列的并发安全原理是什么" aria-label="Permalink to &quot;第37讲：阻塞和非阻塞队列的并发安全原理是什么？&quot;">​</a></h1><p>本课时我们主要研究阻塞和非阻塞队列的并发安全原理。</p><p>之前我们探究了常见的阻塞队列的特点，在本课时，我们以 ArrayBlockingQueue 为例，首先分析 BlockingQueue 即阻塞队列的线程安全原理，然后再看看它的兄弟------非阻塞队列的并发安全原理。通过本课时的学习，我们就可以了解到关于并发队列的底层原理了。</p><h3 id="arrayblockingqueue-源码分析" tabindex="-1">ArrayBlockingQueue 源码分析 <a class="header-anchor" href="#arrayblockingqueue-源码分析" aria-label="Permalink to &quot;ArrayBlockingQueue 源码分析&quot;">​</a></h3><p>我们首先看一下 ArrayBlockingQueue 的源码，ArrayBlockingQueue 有以下几个重要的属性：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">Object</span><span style="color:#E1E4E8;">[] items;</span></span>
<span class="line"><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> takeIndex;</span></span>
<span class="line"><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> putIndex;</span></span>
<span class="line"><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> count;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">final</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">Object</span><span style="color:#24292E;">[] items;</span></span>
<span class="line"><span style="color:#D73A49;">int</span><span style="color:#24292E;"> takeIndex;</span></span>
<span class="line"><span style="color:#D73A49;">int</span><span style="color:#24292E;"> putIndex;</span></span>
<span class="line"><span style="color:#D73A49;">int</span><span style="color:#24292E;"> count;</span></span></code></pre></div><p>第一个就是最核心的、用于存储元素的 Object 类型的数组；然后它还会有两个位置变量，分别是 takeIndex 和 putIndex，这两个变量就是用来标明下一次读取和写入位置的；另外还有一个 count 用来计数，它所记录的就是队列中的元素个数。</p><p>另外，我们再来看下面这三个变量：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> ReentrantLock lock;</span></span>
<span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> Condition notEmpty;</span></span>
<span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> Condition notFull;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">final</span><span style="color:#24292E;"> ReentrantLock lock;</span></span>
<span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> Condition notEmpty;</span></span>
<span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> Condition notFull;</span></span></code></pre></div><p>这三个变量也非常关键，第一个就是一个 ReentrantLock，而下面两个 Condition 分别是由 ReentrantLock 产生出来的，这三个变量就是我们实现线程安全最核心的工具。</p><p>ArrayBlockingQueue 正是利用了 ReentrantLock 和它的两个 Condition 实现的并发安全，真正执行在读写操作前，都需要先获取到锁才行。</p><p>下面，我们来分析一下最重要的 put 方法：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">put</span><span style="color:#E1E4E8;">(E e) throws InterruptedException {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">checkNotNull</span><span style="color:#E1E4E8;">(e);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> ReentrantLock lock </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.lock;</span></span>
<span class="line"><span style="color:#E1E4E8;">    lock.</span><span style="color:#B392F0;">lockInterruptibly</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (count </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> items.length)</span></span>
<span class="line"><span style="color:#E1E4E8;">        notFull.</span><span style="color:#B392F0;">await</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">enqueue</span><span style="color:#E1E4E8;">(e);</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">finally</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        lock.</span><span style="color:#B392F0;">unlock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">put</span><span style="color:#24292E;">(E e) throws InterruptedException {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">checkNotNull</span><span style="color:#24292E;">(e);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> ReentrantLock lock </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.lock;</span></span>
<span class="line"><span style="color:#24292E;">    lock.</span><span style="color:#6F42C1;">lockInterruptibly</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (count </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> items.length)</span></span>
<span class="line"><span style="color:#24292E;">        notFull.</span><span style="color:#6F42C1;">await</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">enqueue</span><span style="color:#24292E;">(e);</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">finally</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        lock.</span><span style="color:#6F42C1;">unlock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>在 put 方法中，首先用 checkNotNull 方法去检查插入的元素是不是 null。如果不是 null，我们会用 ReentrantLock 上锁，并且上锁方法是 lock.lockInterruptibly()。这个方法我们在第 23 课时的时候讲过，在获取锁的同时是可以响应中断的，这也正是我们的阻塞队列在调用 put 方法时，在尝试获取锁但还没拿到锁的期间可以响应中断的底层原因。</p><p>紧接着 ，是一个非常经典的 try finally 代码块，finally 中会去解锁，try 中会有一个 while 循环，它会检查当前队列是不是已经满了，也就是 count 是否等于数组的长度。如果等于就代表已经满了，于是我们便会进行等待，直到有空余的时候，我们才会执行下一步操作，调用 enqueue 方法让元素进入队列，最后用 unlock 方法解锁。</p><p>你看到这段代码不知道是否眼熟，在第 5 课时我们讲过，用 Condition 实现生产者/消费者模式的时候，写过一个 put 方法，代码如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">put</span><span style="color:#E1E4E8;">(Object o) throws InterruptedException {</span></span>
<span class="line"><span style="color:#E1E4E8;">    lock.</span><span style="color:#B392F0;">lock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (queue.</span><span style="color:#B392F0;">size</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> max) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        notFull.</span><span style="color:#B392F0;">await</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    queue.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(o);</span></span>
<span class="line"><span style="color:#E1E4E8;">    notEmpty.</span><span style="color:#B392F0;">signalAll</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">finally</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        lock.</span><span style="color:#B392F0;">unlock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">put</span><span style="color:#24292E;">(Object o) throws InterruptedException {</span></span>
<span class="line"><span style="color:#24292E;">    lock.</span><span style="color:#6F42C1;">lock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (queue.</span><span style="color:#6F42C1;">size</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> max) {</span></span>
<span class="line"><span style="color:#24292E;">        notFull.</span><span style="color:#6F42C1;">await</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    queue.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(o);</span></span>
<span class="line"><span style="color:#24292E;">    notEmpty.</span><span style="color:#6F42C1;">signalAll</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">finally</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        lock.</span><span style="color:#6F42C1;">unlock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>可以看出，这两个方法几乎是一模一样的，所以当时在第 5 课时的时候我们就说过，我们自己用 Condition 实现生产者/消费者模式，实际上其本质就是自己实现了简易版的 BlockingQueue。你可以对比一下这两个 put 方法的实现，这样对 Condition 的理解就会更加深刻。</p><p>和 ArrayBlockingQueue 类似，其他各种阻塞队列如 LinkedBlockingQueue、PriorityBlockingQueue、DelayQueue、DelayedWorkQueue 等一系列 BlockingQueue 的内部也是利用了 ReentrantLock 来保证线程安全，只不过细节有差异，比如 LinkedBlockingQueue 的内部有两把锁，分别锁住队列的头和尾，比共用同一把锁的效率更高，不过总体思想都是类似的。</p><h3 id="非阻塞队列concurrentlinkedqueue" tabindex="-1">非阻塞队列ConcurrentLinkedQueue <a class="header-anchor" href="#非阻塞队列concurrentlinkedqueue" aria-label="Permalink to &quot;非阻塞队列ConcurrentLinkedQueue&quot;">​</a></h3><p>看完阻塞队列之后，我们就来看看非阻塞队列 ConcurrentLinkedQueue。顾名思义，ConcurrentLinkedQueue 是使用链表作为其数据结构的，我们来看一下关键方法 offer 的源码：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">offer</span><span style="color:#E1E4E8;">(E e) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">checkNotNull</span><span style="color:#E1E4E8;">(e);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> Node&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt; newNode </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> Node&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt;(e);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (Node&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt; t </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> tail, p </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> t;;) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Node&lt;</span><span style="color:#F97583;">E</span><span style="color:#E1E4E8;">&gt; q </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> p.next;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (q </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// p is last node</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (p.</span><span style="color:#B392F0;">casNext</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">, newNode)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">// Successful CAS is the linearization point</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">// for e to become an element of this queue,</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#6A737D;">// and for newNode to become &quot;live&quot;.</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (p </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> t) </span><span style="color:#6A737D;">// hop two nodes at a time</span></span>
<span class="line"><span style="color:#E1E4E8;">                    </span><span style="color:#B392F0;">casTail</span><span style="color:#E1E4E8;">(t, newNode);  </span><span style="color:#6A737D;">// Failure is OK.</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// Lost CAS race to another thread; re-read next</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (p </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> q)</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// We have fallen off list.  If tail is unchanged, it</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// will also be off-list, in which case we need to</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// jump to head, from which all live nodes are always</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// reachable.  Else the new tail is a better bet.</span></span>
<span class="line"><span style="color:#E1E4E8;">            p </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (t </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> (t </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> tail)) </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> t </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> head;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">else</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// Check for tail updates after two hops.</span></span>
<span class="line"><span style="color:#E1E4E8;">            p </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (p </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> t </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> t </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> (t </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> tail)) </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> t </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> q;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">offer</span><span style="color:#24292E;">(E e) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">checkNotNull</span><span style="color:#24292E;">(e);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> Node&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt; newNode </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> Node&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt;(e);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (Node&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt; t </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> tail, p </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> t;;) {</span></span>
<span class="line"><span style="color:#24292E;">        Node&lt;</span><span style="color:#D73A49;">E</span><span style="color:#24292E;">&gt; q </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> p.next;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (q </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// p is last node</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (p.</span><span style="color:#6F42C1;">casNext</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">, newNode)) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">// Successful CAS is the linearization point</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">// for e to become an element of this queue,</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6A737D;">// and for newNode to become &quot;live&quot;.</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (p </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> t) </span><span style="color:#6A737D;">// hop two nodes at a time</span></span>
<span class="line"><span style="color:#24292E;">                    </span><span style="color:#6F42C1;">casTail</span><span style="color:#24292E;">(t, newNode);  </span><span style="color:#6A737D;">// Failure is OK.</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// Lost CAS race to another thread; re-read next</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (p </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> q)</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// We have fallen off list.  If tail is unchanged, it</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// will also be off-list, in which case we need to</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// jump to head, from which all live nodes are always</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// reachable.  Else the new tail is a better bet.</span></span>
<span class="line"><span style="color:#24292E;">            p </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (t </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> (t </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> tail)) </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> t </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> head;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">else</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// Check for tail updates after two hops.</span></span>
<span class="line"><span style="color:#24292E;">            p </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (p </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> t </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> t </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> (t </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> tail)) </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> t </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> q;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>在这里我们不去一行一行分析具体的内容，而是把目光放到整体的代码结构上，在检查完空判断之后，可以看到它整个是一个大的 for 循环，而且是一个非常明显的死循环。在这个循环中有一个非常亮眼的 p.casNext 方法，这个方法正是利用了 CAS 来操作的，而且这个死循环去配合 CAS 也就是典型的乐观锁的思想。我们就来看一下 p.casNext 方法的具体实现，其方法代码如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">casNext</span><span style="color:#E1E4E8;">(Node</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">E</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> cmp, Node</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">E</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> val) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> UNSAFE.</span><span style="color:#B392F0;">compareAndSwapObject</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">, nextOffset, cmp, val);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">casNext</span><span style="color:#24292E;">(Node</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">E</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> cmp, Node</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">E</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> val) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> UNSAFE.</span><span style="color:#6F42C1;">compareAndSwapObject</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">, nextOffset, cmp, val);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>可以看出这里运用了 UNSAFE.compareAndSwapObject 方法来完成 CAS 操作，而 compareAndSwapObject 是一个 native 方法，最终会利用 CPU 的 CAS 指令保证其不可中断。</p><p>可以看出，非阻塞队列 ConcurrentLinkedQueue 使用 CAS 非阻塞算法 + 不停重试，来实现线程安全，适合用在不需要阻塞功能，且并发不是特别剧烈的场景。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>最后我们来做一下总结。本课时我们分析了阻塞队列和非阻塞队列的并发安全原理，其中阻塞队列最主要是利用了 ReentrantLock 以及它的 Condition 来实现，而非阻塞队列则是利用 CAS 方法实现线程安全。</p><blockquote><p>参考：<a href="https://javadoop.com/post/java-concurrent-queue" target="_blank" rel="noreferrer">https://javadoop.com/post/java-concurrent-queue</a></p></blockquote>`,29),e=[o];function t(c,r,E,y,i,u){return n(),a("div",null,e)}const F=s(p,[["render",t]]);export{h as __pageData,F as default};
