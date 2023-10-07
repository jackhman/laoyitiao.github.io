import{_ as s,o as n,g as a,Q as l}from"./chunks/framework.4e7d56ce.js";const h=JSON.parse('{"title":"第21讲：如何看到ynchronized背后的“monitor锁”？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/096-Java 并发编程文档/(259) 第21讲：如何看到 ynchronized 背后的“monitor 锁”？.md","filePath":"posts/backEnd/096-Java 并发编程文档/(259) 第21讲：如何看到 ynchronized 背后的“monitor 锁”？.md","lastUpdated":1696338709000}'),o={name:"posts/backEnd/096-Java 并发编程文档/(259) 第21讲：如何看到 ynchronized 背后的“monitor 锁”？.md"},p=l(`<h1 id="第21讲-如何看到ynchronized背后的-monitor锁" tabindex="-1">第21讲：如何看到ynchronized背后的“monitor锁”？ <a class="header-anchor" href="#第21讲-如何看到ynchronized背后的-monitor锁" aria-label="Permalink to &quot;第21讲：如何看到ynchronized背后的“monitor锁”？&quot;">​</a></h1><p>本课时我们研究下 synchronized 背后的 monitor 锁。</p><h3 id="获取和释放-monitor-锁的时机" tabindex="-1">获取和释放 monitor 锁的时机 <a class="header-anchor" href="#获取和释放-monitor-锁的时机" aria-label="Permalink to &quot;获取和释放 monitor 锁的时机&quot;">​</a></h3><p>我们都知道，最简单的同步方式就是利用 synchronized 关键字来修饰代码块或者修饰一个方法，那么这部分被保护的代码，在同一时刻就最多只有一个线程可以运行，而 synchronized 的背后正是利用 monitor 锁实现的。所以首先我们来看下获取和释放 monitor 锁的时机，每个 Java 对象都可以用作一个实现同步的锁，这个锁也被称为内置锁或 monitor 锁，获得 monitor 锁的唯一途径就是进入由这个锁保护的同步代码块或同步方法，线程在进入被 synchronized 保护的代码块之前，会自动获取锁，并且无论是正常路径退出，还是通过抛出异常退出，在退出的时候都会自动释放锁。</p><p>我们首先来看一个 synchronized 修饰方法的代码的例子：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">synchronized</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">method</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    method body</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">synchronized</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">method</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    method body</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>我们看到 method() 方法是被 synchronized 修饰的，为了方便理解其背后的原理，我们把上面这段代码改写为下面这种等价形式的伪代码。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">method</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.intrinsicLock.</span><span style="color:#B392F0;">lock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">        method body</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">finally</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.intrinsicLock.</span><span style="color:#B392F0;">unlock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">method</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.intrinsicLock.</span><span style="color:#6F42C1;">lock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">try</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">        method body</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">finally</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.intrinsicLock.</span><span style="color:#6F42C1;">unlock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>在这种写法中，进入 method 方法后，立刻添加内置锁，并且用 try 代码块把方法保护起来，最后用 finally 释放这把锁，这里的 intrinsicLock 就是 monitor 锁。经过这样的伪代码展开之后，相信你对 synchronized 的理解就更加清晰了。</p><h3 id="用-javap-命令查看反汇编的结果" tabindex="-1">用 javap 命令查看反汇编的结果 <a class="header-anchor" href="#用-javap-命令查看反汇编的结果" aria-label="Permalink to &quot;用 javap 命令查看反汇编的结果&quot;">​</a></h3><p>JVM 实现 synchronized 方法和 synchronized 代码块的细节是不一样的，下面我们就分别来看一下两者的实现。</p><h4 id="同步代码块" tabindex="-1">同步代码块 <a class="header-anchor" href="#同步代码块" aria-label="Permalink to &quot;同步代码块&quot;">​</a></h4><p>首先我们来看下同步代码块的实现，如代码所示。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SynTest</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">synBlock</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">synchronized</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;lagou&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SynTest</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">synBlock</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">synchronized</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;lagou&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>在 SynTest 类中的 synBlock 方法，包含一个同步代码块，synchronized 代码块中有一行代码打印了 lagou 字符串，下面我们来通过命令看下 synchronized 关键字到底做了什么事情：首先用 cd 命令切换到 SynTest.java 类所在的路径，然后执行 javac SynTest.java，于是就会产生一个名为 SynTest.class 的字节码文件，然后我们执行 javap -verbose SynTest.class，就可以看到对应的反汇编内容。</p><p>关键信息如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">synBlock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    descriptor</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> ()V</span></span>
<span class="line"><span style="color:#E1E4E8;">    flags</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> ACC_PUBLIC</span></span>
<span class="line"><span style="color:#E1E4E8;">    Code</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      stack</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, locals</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">, args_size</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#79B8FF;">0</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> aload_0</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#79B8FF;">1</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> dup</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#79B8FF;">2</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> astore_1</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#79B8FF;">3</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> monitorenter</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#79B8FF;">4</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> getstatic     #</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">                  </span><span style="color:#6A737D;">// Field java/lang/System.out:Ljava/io/PrintStream;</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#79B8FF;">7</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> ldc           #</span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">                      </span><span style="color:#6A737D;">// String lagou</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#79B8FF;">9</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> invokevirtual #</span><span style="color:#79B8FF;">4</span><span style="color:#E1E4E8;">               </span><span style="color:#6A737D;">// Method java/io/PrintStream.println:(Ljava/lang/String;)V</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">12</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> aload_1</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">13</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> monitorexit</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">14</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">goto</span><span style="color:#E1E4E8;">          </span><span style="color:#79B8FF;">22</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">17</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> astore_2</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">18</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> aload_1</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">19</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> monitorexit</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">20</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> aload_2</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">21</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> athrow</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">22</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">return</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">synBlock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    descriptor</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> ()V</span></span>
<span class="line"><span style="color:#24292E;">    flags</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> ACC_PUBLIC</span></span>
<span class="line"><span style="color:#24292E;">    Code</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">      stack</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, locals</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">, args_size</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#005CC5;">0</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> aload_0</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#005CC5;">1</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> dup</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#005CC5;">2</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> astore_1</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#005CC5;">3</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> monitorenter</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#005CC5;">4</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> getstatic     #</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">                  </span><span style="color:#6A737D;">// Field java/lang/System.out:Ljava/io/PrintStream;</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#005CC5;">7</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> ldc           #</span><span style="color:#005CC5;">3</span><span style="color:#24292E;">                      </span><span style="color:#6A737D;">// String lagou</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#005CC5;">9</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> invokevirtual #</span><span style="color:#005CC5;">4</span><span style="color:#24292E;">               </span><span style="color:#6A737D;">// Method java/io/PrintStream.println:(Ljava/lang/String;)V</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">12</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> aload_1</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">13</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> monitorexit</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">14</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">goto</span><span style="color:#24292E;">          </span><span style="color:#005CC5;">22</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">17</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> astore_2</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">18</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> aload_1</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">19</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> monitorexit</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">20</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> aload_2</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">21</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> athrow</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">22</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">return</span></span></code></pre></div><p>从里面可以看出，synchronized 代码块实际上多了 monitorenter 和 monitorexit 指令，标红的第3、13、19行指令分别对应的是 monitorenter 和 monitorexit。这里有一个 monitorenter，却有两个 monitorexit 指令的原因是，JVM 要保证每个 monitorenter 必须有与之对应的 monitorexit，monitorenter 指令被插入到同步代码块的开始位置，而 monitorexit 需要插入到方法正常结束处和异常处两个地方，这样就可以保证抛异常的情况下也能释放锁</p><p>可以把执行 monitorenter 理解为加锁，执行 monitorexit 理解为释放锁，每个对象维护着一个记录着被锁次数的计数器。未被锁定的对象的该计数器为 0，我们来具体看一下 monitorenter 和 monitorexit 的含义：</p><ul><li>monitorenter</li></ul><p>执行 monitorenter 的线程尝试获得 monitor 的所有权，会发生以下这三种情况之一：</p><p>a. 如果该 monitor 的计数为 0，则线程获得该 monitor 并将其计数设置为 1。然后，该线程就是这个 monitor 的所有者。</p><p>b. 如果线程已经拥有了这个 monitor ，则它将重新进入，并且累加计数。</p><p>c. 如果其他线程已经拥有了这个 monitor，那个这个线程就会被阻塞，直到这个 monitor 的计数变成为 0，代表这个 monitor 已经被释放了，于是当前这个线程就会再次尝试获取这个 monitor。</p><ul><li>monitorexit<br> monitorexit 的作用是将 monitor 的计数器减 1，直到减为 0 为止。代表这个 monitor 已经被释放了，已经没有任何线程拥有它了，也就代表着解锁，所以，其他正在等待这个 monitor 的线程，此时便可以再次尝试获取这个 monitor 的所有权。</li></ul><h3 id="同步方法" tabindex="-1">同步方法 <a class="header-anchor" href="#同步方法" aria-label="Permalink to &quot;同步方法&quot;">​</a></h3><p>从上面可以看出，同步代码块是使用 monitorenter 和 monitorexit 指令实现的。而对于 synchronized 方法，并不是依靠 monitorenter 和 monitorexit 指令实现的，被 javap 反汇编后可以看到，synchronized 方法和普通方法大部分是一样的，不同在于，这个方法会有一个叫作 ACC_SYNCHRONIZED 的 flag 修饰符，来表明它是同步方法。</p><p>同步方法的代码如下所示。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">synchronized</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">synMethod</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">synchronized</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">synMethod</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>对应的反汇编指令如下所示。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">synchronized</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">synMethod</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    descriptor</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> ()V</span></span>
<span class="line"><span style="color:#E1E4E8;">    flags</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> ACC_PUBLIC, ACC_SYNCHRONIZED</span></span>
<span class="line"><span style="color:#E1E4E8;">    Code</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      stack</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, locals</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, args_size</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#79B8FF;">0</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">return</span></span>
<span class="line"><span style="color:#E1E4E8;">      LineNumberTable</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        line </span><span style="color:#79B8FF;">16</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">synchronized</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">synMethod</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    descriptor</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> ()V</span></span>
<span class="line"><span style="color:#24292E;">    flags</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> ACC_PUBLIC, ACC_SYNCHRONIZED</span></span>
<span class="line"><span style="color:#24292E;">    Code</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">      stack</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, locals</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, args_size</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#005CC5;">0</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">return</span></span>
<span class="line"><span style="color:#24292E;">      LineNumberTable</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">        line </span><span style="color:#005CC5;">16</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span></code></pre></div><p>可以看出，被 synchronized 修饰的方法会有一个 ACC_SYNCHRONIZED 标志。当某个线程要访问某个方法的时候，会首先检查方法是否有 ACC_SYNCHRONIZED 标志，如果有则需要先获得 monitor 锁，然后才能开始执行方法，方法执行之后再释放 monitor 锁。其他方面， synchronized 方法和刚才的 synchronized 代码块是很类似的，例如这时如果其他线程来请求执行方法，也会因为无法获得 monitor 锁而被阻塞。</p><p>好了，本课时的内容就全部讲完了，本课时我们讲解了获取和释放 monitor 的时机，以及被 synchronized 修饰的等价代码，然后我们还利用 javac 和 javap 命令查看了 synchronized 代码块以及 synchronized 方法所对应的的反汇编指令，其中同步代码块是利用 monitorenter 和 monitorexit 指令实现的，而同步方法则是利用 flags 实现的。</p>`,33),e=[p];function t(c,r,y,E,i,d){return n(),a("div",null,e)}const C=s(o,[["render",t]]);export{h as __pageData,C as default};
