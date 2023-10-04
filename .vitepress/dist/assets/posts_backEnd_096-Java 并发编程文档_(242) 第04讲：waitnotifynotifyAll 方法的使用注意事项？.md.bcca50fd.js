import{_ as s,o as n,g as a,Q as l}from"./chunks/framework.e0c66c3f.js";const f=JSON.parse('{"title":"为什么 wait 必须在 synchronized 保护的同步代码中使用？ ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/096-Java 并发编程文档/(242) 第04讲：waitnotifynotifyAll 方法的使用注意事项？.md","filePath":"posts/backEnd/096-Java 并发编程文档/(242) 第04讲：waitnotifynotifyAll 方法的使用注意事项？.md","lastUpdated":1696338709000}'),p={name:"posts/backEnd/096-Java 并发编程文档/(242) 第04讲：waitnotifynotifyAll 方法的使用注意事项？.md"},o=l(`<p>本课时我们主要学习 wait/notify/notifyAll 方法的使用注意事项。</p><p>我们主要从三个问题入手：</p><ol><li>为什么 wait 方法必须在 synchronized 保护的同步代码中使用？</li><li>为什么 wait/notify/notifyAll 被定义在 Object 类中，而 sleep 定义在 Thread 类中？</li><li>wait/notify 和 sleep 方法的异同？</li></ol><h3 id="为什么-wait-必须在-synchronized-保护的同步代码中使用" tabindex="-1">为什么 wait 必须在 synchronized 保护的同步代码中使用？ <a class="header-anchor" href="#为什么-wait-必须在-synchronized-保护的同步代码中使用" aria-label="Permalink to &quot;为什么 wait 必须在 synchronized 保护的同步代码中使用？&quot;">​</a></h3><p>首先，我们来看第一个问题，为什么 wait 方法必须在 synchronized 保护的同步代码中使用？</p><p>我们先来看看 wait 方法的源码注释是怎么写的。</p><p>&quot;wait method should always be used in a loop:</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">synchronized</span><span style="color:#E1E4E8;"> (obj) {</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (condition does not hold)</span></span>
<span class="line"><span style="color:#E1E4E8;">         obj.</span><span style="color:#B392F0;">wait</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">     ... </span><span style="color:#6A737D;">// Perform action appropriate to condition</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"> </span><span style="color:#D73A49;">synchronized</span><span style="color:#24292E;"> (obj) {</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (condition does not hold)</span></span>
<span class="line"><span style="color:#24292E;">         obj.</span><span style="color:#6F42C1;">wait</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">     ... </span><span style="color:#6A737D;">// Perform action appropriate to condition</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>This method should only be called by a thread that is the owner of this object&#39;s monitor.&quot;</p><p>英文部分的意思是说，在使用 wait 方法时，必须把 wait 方法写在 synchronized 保护的 while 代码块中，并始终判断执行条件是否满足，如果满足就往下继续执行，如果不满足就执行 wait 方法，而在执行 wait 方法之前，必须先持有对象的 monitor 锁，也就是通常所说的 synchronized 锁。那么设计成这样有什么好处呢？</p><p>我们逆向思考这个问题，如果不要求 wait 方法放在 synchronized 保护的同步代码中使用，而是可以随意调用，那么就有可能写出这样的代码。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">BlockingQueue</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    Queue&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">&gt; buffer </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> LinkedList&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">give</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">data</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        buffer.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(data);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">notify</span><span style="color:#E1E4E8;">();  </span><span style="color:#6A737D;">// Since someone may be waiting in take</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> String </span><span style="color:#B392F0;">take</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> InterruptedException {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (buffer.</span><span style="color:#B392F0;">isEmpty</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">wait</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> buffer.</span><span style="color:#B392F0;">remove</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">BlockingQueue</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    Queue&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">&gt; buffer </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> LinkedList&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">&gt;();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">give</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">data</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        buffer.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(data);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">notify</span><span style="color:#24292E;">();  </span><span style="color:#6A737D;">// Since someone may be waiting in take</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> String </span><span style="color:#6F42C1;">take</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> InterruptedException {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (buffer.</span><span style="color:#6F42C1;">isEmpty</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">wait</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> buffer.</span><span style="color:#6F42C1;">remove</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>在代码中可以看到有两个方法，give 方法负责往 buffer 中添加数据，添加完之后执行 notify 方法来唤醒之前等待的线程，而 take 方法负责检查整个 buffer 是否为空，如果为空就进入等待，如果不为空就取出一个数据，这是典型的生产者消费者的思想。</p><p>但是这段代码并没有受 synchronized 保护，于是便有可能发生以下场景：</p><ol><li>首先，消费者线程调用 take 方法并判断 buffer.isEmpty 方法是否返回 true，若为 true 代表buffer是空的，则线程希望进入等待，但是在线程调用 wait 方法之前，就被调度器暂停了，所以此时还没来得及执行 wait 方法。</li><li>此时生产者开始运行，执行了整个 give 方法，它往 buffer 中添加了数据，并执行了 notify 方法，但 notify 并没有任何效果，因为消费者线程的 wait 方法没来得及执行，所以没有线程在等待被唤醒。</li><li>此时，刚才被调度器暂停的消费者线程回来继续执行 wait 方法并进入了等待。</li></ol><p>虽然刚才消费者判断了 buffer.isEmpty 条件，但真正执行 wait 方法时，之前的 buffer.isEmpty 的结果已经过期了，不再符合最新的场景了，因为这里的&quot;判断-执行&quot;不是一个原子操作，它在中间被打断了，是线程不安全的。</p><p>假设这时没有更多的生产者进行生产，消费者便有可能陷入无穷无尽的等待，因为它错过了刚才 give 方法内的 notify 的唤醒。</p><p>我们看到正是因为 wait 方法所在的 take 方法没有被 synchronized 保护，所以它的 while 判断和 wait 方法无法构成原子操作，那么此时整个程序就很容易出错。</p><p>我们把代码改写成源码注释所要求的被 synchronized 保护的同步代码块的形式，代码如下。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">give</span><span style="color:#E1E4E8;">(String data) {</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">synchronized</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      buffer.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(data);</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">notify</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> String </span><span style="color:#B392F0;">take</span><span style="color:#E1E4E8;">() throws InterruptedException {</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">synchronized</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (buffer.</span><span style="color:#B392F0;">isEmpty</span><span style="color:#E1E4E8;">()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">         </span><span style="color:#B392F0;">wait</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">       }</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> buffer.</span><span style="color:#B392F0;">remove</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">give</span><span style="color:#24292E;">(String data) {</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">synchronized</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      buffer.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(data);</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">notify</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> String </span><span style="color:#6F42C1;">take</span><span style="color:#24292E;">() throws InterruptedException {</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">synchronized</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (buffer.</span><span style="color:#6F42C1;">isEmpty</span><span style="color:#24292E;">()) {</span></span>
<span class="line"><span style="color:#24292E;">         </span><span style="color:#6F42C1;">wait</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">       }</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> buffer.</span><span style="color:#6F42C1;">remove</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这样就可以确保 notify 方法永远不会在 buffer.isEmpty 和 wait 方法之间被调用，提升了程序的安全性。</p><p>另外，wait 方法会释放 monitor 锁，这也要求我们必须首先进入到 synchronized 内持有这把锁。</p><p>这里还存在一个&quot;虚假唤醒&quot;（spurious wakeup）的问题，线程可能在既没有被notify/notifyAll，也没有被中断或者超时的情况下被唤醒，这种唤醒是我们不希望看到的。虽然在实际生产中，虚假唤醒发生的概率很小，但是程序依然需要保证在发生虚假唤醒的时候的正确性，所以就需要采用while循环的结构。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (condition does not hold)</span></span>
<span class="line"><span style="color:#E1E4E8;">    obj.</span><span style="color:#B392F0;">wait</span><span style="color:#E1E4E8;">();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (condition does not hold)</span></span>
<span class="line"><span style="color:#24292E;">    obj.</span><span style="color:#6F42C1;">wait</span><span style="color:#24292E;">();</span></span></code></pre></div><p>这样即便被虚假唤醒了，也会再次检查while里面的条件，如果不满足条件，就会继续wait，也就消除了虚假唤醒的风险。</p><h3 id="为什么-wait-notify-notifyall-被定义在-object-类中-而-sleep-定义在-thread-类中" tabindex="-1">为什么 wait/notify/notifyAll 被定义在 Object 类中，而 sleep 定义在 Thread 类中？ <a class="header-anchor" href="#为什么-wait-notify-notifyall-被定义在-object-类中-而-sleep-定义在-thread-类中" aria-label="Permalink to &quot;为什么 wait/notify/notifyAll 被定义在 Object 类中，而 sleep 定义在 Thread 类中？&quot;">​</a></h3><p>我们来看第二个问题，为什么 wait/notify/notifyAll 方法被定义在 Object 类中？而 sleep 方法定义在 Thread 类中？主要有两点原因：</p><ol><li>因为 Java 中每个对象都有一把称之为 monitor 监视器的锁，由于每个对象都可以上锁，这就要求在对象头中有一个用来保存锁信息的位置。这个锁是对象级别的，而非线程级别的，wait/notify/notifyAll 也都是锁级别的操作，它们的锁属于对象，所以把它们定义在 Object 类中是最合适，因为 Object 类是所有对象的父类。</li><li>因为如果把 wait/notify/notifyAll 方法定义在 Thread 类中，会带来很大的局限性，比如一个线程可能持有多把锁，以便实现相互配合的复杂逻辑，假设此时 wait 方法定义在 Thread 类中，如何实现让一个线程持有多把锁呢？又如何明确线程等待的是哪把锁呢？既然我们是让当前线程去等待某个对象的锁，自然应该通过操作对象来实现，而不是操作线程。</li></ol><h3 id="wait-notify-和-sleep-方法的异同" tabindex="-1">wait/notify 和 sleep 方法的异同？ <a class="header-anchor" href="#wait-notify-和-sleep-方法的异同" aria-label="Permalink to &quot;wait/notify 和 sleep 方法的异同？&quot;">​</a></h3><p>第三个问题是对比 wait/notify 和 sleep 方法的异同，主要对比 wait 和 sleep 方法，我们先说相同点：</p><ol><li>它们都可以让线程阻塞。</li><li>它们都可以响应 interrupt 中断：在等待的过程中如果收到中断信号，都可以进行响应，并抛出 InterruptedException 异常。</li></ol><p>但是它们也有很多的不同点：</p><ol><li>wait 方法必须在 synchronized 保护的代码中使用，而 sleep 方法并没有这个要求。</li><li>在同步代码中执行 sleep 方法时，并不会释放 monitor 锁，但执行 wait 方法时会主动释放 monitor 锁。</li><li>sleep 方法中会要求必须定义一个时间，时间到期后会主动恢复，而对于没有参数的 wait 方法而言，意味着永久等待，直到被中断或被唤醒才能恢复，它并不会主动恢复。</li><li>wait/notify 是 Object 类的方法，而 sleep 是 Thread 类的方法。</li></ol><p>以上就是关于 wait/notify 与 sleep 的异同点。</p><p>好了，本课时的内容就全部讲完了，下一课时我将讲解&quot;有哪几种实现生产者-消费者模式的方法？&quot;记得按时来听课啊，下一课时见。</p>`,35),e=[o];function t(c,r,i,y,E,d){return n(),a("div",null,e)}const u=s(p,[["render",t]]);export{f as __pageData,u as default};
