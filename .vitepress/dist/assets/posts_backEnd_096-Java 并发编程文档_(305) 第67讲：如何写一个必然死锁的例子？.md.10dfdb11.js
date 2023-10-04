import{_ as o,j as e,o as t,g as c,k as l,s,h as n,Q as p}from"./chunks/framework.e0c66c3f.js";const v=JSON.parse('{"title":"死锁是什么？有什么危害? ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/096-Java 并发编程文档/(305) 第67讲：如何写一个必然死锁的例子？.md","filePath":"posts/backEnd/096-Java 并发编程文档/(305) 第67讲：如何写一个必然死锁的例子？.md","lastUpdated":1696338709000}'),r={name:"posts/backEnd/096-Java 并发编程文档/(305) 第67讲：如何写一个必然死锁的例子？.md"},E=p('<p>本课时我们会首先介绍什么是死锁，死锁有什么危害和特点，然后通过代码分析一个&quot;必然死锁的例子&quot;。</p><h3 id="死锁是什么-有什么危害" tabindex="-1">死锁是什么？有什么危害? <a class="header-anchor" href="#死锁是什么-有什么危害" aria-label="Permalink to &quot;死锁是什么？有什么危害?&quot;">​</a></h3><h4 id="什么是死锁" tabindex="-1">什么是死锁 <a class="header-anchor" href="#什么是死锁" aria-label="Permalink to &quot;什么是死锁&quot;">​</a></h4><p><strong>发生在并发中</strong></p><p>首先你要知道，死锁一定发生在并发场景中。我们为了保证线程安全，有时会给程序使用各种能保证并发安全的工具，尤其是锁，但是如果在使用过程中处理不得当，就有可能会导致发生死锁的情况。</p><p><strong>互不相让</strong></p><p>死锁是一种状态，当两个（或多个）线程（或进程）相互持有对方所需要的资源，却又都不主动释放自己手中所持有的资源，导致大家都获取不到自己想要的资源，所有相关的线程（或进程）都无法继续往下执行，在未改变这种状态之前都不能向前推进，我们就把这种状态称为<strong>死锁状态</strong> ，认为它们发生了死锁。通俗的讲，死锁就是两个或多个线程（或进程）<strong>被无限期地阻塞，相互等待对方手中资源</strong>的一种状态。</p><p><strong>生活中的例子</strong></p><p>下面我们用图示的方法来展示一种生活中发生死锁的情况，如下图所示：</p>',9),y=s("p",null,[n("可以看到这张漫画展示了两个绅士分别向对方鞠躬的场景，为了表示礼貌，他们弯下腰之后谁也不愿意先起身，都希望对方起身之后我再起身。可是这样一来，就"),s("strong",null,"没有任何人可以先起身"),n("，起身这个动作就一直无法继续执行，两人形成了相互等待的状态，所以这就是一种典型的死锁！")],-1),i=s("p",null,[s("strong",null,"两个线程的例子")],-1),u=s("p",null,[n("下面我们用动画的形式来看一下"),s("strong",null,"两个线程"),n("发生死锁的情况，如下图所示：")],-1),F=s("p",null,"此时我们有两个线程，分别是线程 A 和线程 B，假设线程 A 现在持有了锁 A，线程 B 持有了锁 B，然后线程 A 尝试去获取锁 B，当然它获取不到，因为线程 B 还没有释放锁 B。然后线程 B 又来尝试获取锁 A，同样线程 B 也获取不到锁 A，因为锁 A 已经被线程 A 持有了。这样一来，线程 A 和线程 B 就发生了死锁，因为它们都相互持有对方想要的资源，却又不释放自己手中的资源，形成相互等待，而且会一直等待下去。",-1),d=s("p",null,[s("strong",null,"多个线程造成死锁的情况")],-1),g=s("p",null,"死锁不仅仅存在于两个线程的场景，在多个线程中也同样存在。如果多个线程之间的依赖关系是环形，存在环路的依赖关系，那么也可能会发生死锁，如下图所示：",-1),h=p(`<p>我们看到在这个例子中，首先线程 1 持有了锁 A，然后线程 2 持有了锁 B，然后线程 3 持有了锁 C，现在每个线程都分别持有一把锁。接下来线程 1 想要去持有锁 B，可是它获取不到，因为现在锁 B 正在线程 2 的手里；接下来线程 2 又去尝试获取锁 C， 它同样也获取不到，因为现在锁 C 在线程 3 的手里；然后线程 3 去尝试获取锁 A ，当然它也获取不到，因为锁 A 现在在线程 1 的手里，这样一来线程 1、线程 2 和线程 3 相互之间就形成了一个环，这就是在多线程中发生死锁的情况。所以不仅是两个线程，多个线程同样也有可能会发生死锁的情况。</p><h4 id="死锁的影响" tabindex="-1">死锁的影响 <a class="header-anchor" href="#死锁的影响" aria-label="Permalink to &quot;死锁的影响&quot;">​</a></h4><p>死锁的影响在不同系统中是不一样的，影响的大小一部分取决于当前这个系统或者环境对死锁的处理能力。</p><p><strong>数据库中</strong></p><p>例如，在数据库系统软件的设计中，考虑了监测死锁以及从死锁中恢复的情况。在执行一个事务的时候可能需要获取多把锁，并一直持有这些锁直到事务完成。在某个事务中持有的锁可能在其他事务中也需要，因此在两个事务之间有可能发生死锁的情况，一旦发生了死锁，如果没有外部干涉，那么两个事务就会永远的等待下去。但数据库系统不会放任这种情况发生，当数据库检测到这一组事务发生了死锁时，根据策略的不同，可能会选择<strong>放弃某一个事务</strong>，被放弃的事务就会释放掉它所持有的锁，从而使其他的事务继续顺利进行。此时程序可以重新执行被强行终止的事务，而这个事务现在就可以顺利执行了，因为所有跟它竞争资源的事务都已经在刚才执行完毕，并且释放资源了。</p><p><strong>JVM 中</strong></p><p>在 JVM 中，对于死锁的处理能力就不如数据库那么强大了。如果在 JVM 中发生了死锁，JVM 并<strong>不会自动进行处理</strong>，所以一旦死锁发生，就会陷入无穷的等待。</p><h4 id="几率不高但危害大" tabindex="-1">几率不高但危害大 <a class="header-anchor" href="#几率不高但危害大" aria-label="Permalink to &quot;几率不高但危害大&quot;">​</a></h4><p>死锁的问题和其他的并发安全问题一样，是概率性的，也就是说，即使存在发生死锁的可能性，也并不是 100% 会发生的。如果每个锁的持有时间很短，那么发生冲突的概率就很低，所以死锁发生的概率也很低。但是在线上系统里，可能每天有几千万次的&quot;获取锁&quot;、&quot;释放锁&quot;操作，<strong>在巨量的次数面前，整个系统发生问题的几率就会被放大</strong>，只要有某几次操作是有风险的，就可能会导致死锁的发生。</p><p>也正是因为死锁&quot;不一定会发生&quot;的特点，导致提前找出死锁成为了一个难题。压力测试虽然可以检测出一部分可能发生死锁的情况，但是并不足以完全模拟真实、长期运行的场景，因此<strong>没有办法把所有潜在可能发生死锁的代码都找出来</strong>。</p><p>一旦发生了死锁，根据发生死锁的线程的职责不同，就可能会造成子系统崩溃、性能降低甚至整个系统崩溃等各种不良后果。而且死锁往往发生在高并发、高负载的情况下，因为可能会直接影响到很多用户，造成一系列的问题。以上就是死锁发生几率不高但是危害大的特点。</p><h3 id="发生死锁的例子" tabindex="-1">发生死锁的例子 <a class="header-anchor" href="#发生死锁的例子" aria-label="Permalink to &quot;发生死锁的例子&quot;">​</a></h3><p>下面我们举一个必然会发生死锁的例子，代码如下所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 描述：     必定死锁的情况</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MustDeadLock</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Runnable</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> flag;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> Object o1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Object</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> Object o2 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Object</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">run</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;线程&quot;</span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">Thread.</span><span style="color:#B392F0;">currentThread</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">getName</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;的flag为&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> flag);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (flag </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">synchronized</span><span style="color:#E1E4E8;"> (o1) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    Thread.</span><span style="color:#B392F0;">sleep</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">500</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">                } </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (Exception </span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    e.</span><span style="color:#B392F0;">printStackTrace</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">synchronized</span><span style="color:#E1E4E8;"> (o2) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;线程1获得了两把锁&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (flag </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">synchronized</span><span style="color:#E1E4E8;"> (o2) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    Thread.</span><span style="color:#B392F0;">sleep</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">500</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">                } </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (Exception </span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    e.</span><span style="color:#B392F0;">printStackTrace</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">synchronized</span><span style="color:#E1E4E8;"> (o1) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                    System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;线程2获得了两把锁&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">                }</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">argv</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        MustDeadLock r1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MustDeadLock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        MustDeadLock r2 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MustDeadLock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        r1.flag </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        r2.flag </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        Thread t1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Thread</span><span style="color:#E1E4E8;">(r1, </span><span style="color:#9ECBFF;">&quot;t1&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        Thread t2 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Thread</span><span style="color:#E1E4E8;">(r2, </span><span style="color:#9ECBFF;">&quot;t2&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        t1.</span><span style="color:#B392F0;">start</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        t2.</span><span style="color:#B392F0;">start</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 描述：     必定死锁的情况</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MustDeadLock</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Runnable</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> flag;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> Object o1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Object</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> Object o2 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Object</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">run</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;线程&quot;</span><span style="color:#D73A49;">+</span><span style="color:#24292E;">Thread.</span><span style="color:#6F42C1;">currentThread</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">getName</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;的flag为&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> flag);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (flag </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">synchronized</span><span style="color:#24292E;"> (o1) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                    Thread.</span><span style="color:#6F42C1;">sleep</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">500</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">                } </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (Exception </span><span style="color:#E36209;">e</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                    e.</span><span style="color:#6F42C1;">printStackTrace</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">synchronized</span><span style="color:#24292E;"> (o2) {</span></span>
<span class="line"><span style="color:#24292E;">                    System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;线程1获得了两把锁&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (flag </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">synchronized</span><span style="color:#24292E;"> (o2) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                    Thread.</span><span style="color:#6F42C1;">sleep</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">500</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">                } </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (Exception </span><span style="color:#E36209;">e</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">                    e.</span><span style="color:#6F42C1;">printStackTrace</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">synchronized</span><span style="color:#24292E;"> (o1) {</span></span>
<span class="line"><span style="color:#24292E;">                    System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;线程2获得了两把锁&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">                }</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">argv</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        MustDeadLock r1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MustDeadLock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        MustDeadLock r2 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MustDeadLock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        r1.flag </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        r2.flag </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        Thread t1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Thread</span><span style="color:#24292E;">(r1, </span><span style="color:#032F62;">&quot;t1&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        Thread t2 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Thread</span><span style="color:#24292E;">(r2, </span><span style="color:#032F62;">&quot;t2&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        t1.</span><span style="color:#6F42C1;">start</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        t2.</span><span style="color:#6F42C1;">start</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>可以看到，在这段代码中有一个 int 类型的 flag，它是一个标记位，然后我们新建了 o1 和 o2、作为 synchronized 的锁对象。</p><p>下面我们来看看 run 方法。在 run 方法里面，它会首先打印出当前线程的名字，然后打印出当前线程 flag 的值是多少。</p><p>如果 flag 等于 1，就会先获取 o1 这把锁，然后休眠 500 毫秒，再去尝试获取 o2 这把锁并且打印出&quot;线程1获得了两把锁&quot;。</p><p>如果 flag 等于 2，那么情况恰恰相反，线程会先获取 o2 这把锁，然后休眠 500 毫秒，再去获取 o1 这把锁，并且打印出&quot;线程2获得了两把锁&quot;。</p><p>最后我们来看一下 main 方法，在 main 方法中新建了两个本类的实例，也就是两个 Runnable 对象，并且把它们的 flag 分别改为 1 和 2：r1 的 flag 设置为 1，r2 的 flag 设置为 2。然后新建两个线程，分别去执行这两个 Runnable 对象，执行 r1 和 r2 这两个线程的名字分别叫做 t1 和 t2，最后我们把两个线程给启动起来。</p><p>程序的一种执行结果：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">线程t1的flag为1</span></span>
<span class="line"><span style="color:#E1E4E8;">线程t2的flag为2</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">线程t1的flag为1</span></span>
<span class="line"><span style="color:#24292E;">线程t2的flag为2</span></span></code></pre></div><p>这里的重点就在于程序执行到此时还在继续执行，并没停止，并且它永远不会打印出&quot;线程 1 获得了两把锁&quot;或&quot;线程 2 获得了两把锁&quot;这样的语句，此时这里就发生了死锁。</p><h4 id="对发生死锁这个过程进行分析" tabindex="-1">对发生死锁这个过程进行分析 <a class="header-anchor" href="#对发生死锁这个过程进行分析" aria-label="Permalink to &quot;对发生死锁这个过程进行分析&quot;">​</a></h4><p>下面我们对上面发生死锁的过程进行分析：</p>`,24),A=s("p",null,[n("所以现在的状态是，"),s("strong",null,"线程 1 卡在获取 o2 这把锁的位置，而线程 2 卡在获取 o1 这把锁的位置"),n('，这样一来线程 1 和线程 2 就形成了相互等待，需要对方持有的资源才能继续执行，从而形成了死锁。在这个例子里，如果线程 2 比线程 1 先启动，情况也是类似的，最终也会形成死锁。这就是一个"必然发生死锁的例子"。')],-1),_=s("h3",{id:"总结",tabindex:"-1"},[n("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),C=s("p",null,"在本课时中，我们首先介绍了什么是死锁，接着介绍了死锁在生活中、两个线程中以及多个线程中的例子。然后我们分析了死锁的影响，在 JVM 中如果发生死锁，可能会导致程序部分甚至全部无法继续向下执行的情况，所以死锁在 JVM 中所带来的危害和影响是比较大的，我们需要尽量避免。最后举了一个必然会发生死锁的例子代码，并且对此代码进行了详细的分析。",-1);function q(D,B,m,f,b,k){const a=e("Image");return t(),c("div",null,[E,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/85/2C/Cgq2xl6NrzCAEFQ0AB-HOvxO39A990.png"}),y,i,u,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/85/2C/Cgq2xl6NrzGAMfz3AABHRjw_QSE080.png"}),F,d,g,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/85/2C/Cgq2xl6NrzGAeQrqAAA0YIeU1Qg392.png"}),h,s("ul",null,[s("li",null,[n("当第 1 个线程运行的时候，它会发现自己的 flag 是 1 ，所以它会尝试先获得 o1 这把锁，然后休眠 500 毫秒。"),l(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0C/16/Ciqah16NrzGAQZWTAABLSoYg93c256.png"})]),s("li",null,[n("在线程 1 启动并休眠的期间，线程 2 同样会启动起来。由于线程 2 的 flag 是 2，所以它会进入到下面 的 if (flag == 2) 对应的代码块中，然后线程 2 首先会去获取 o2 这把锁。也就是说在线程 1 启动并获取到 o1 这把锁之后进行休眠的期间，线程 2 获取到了 o2 这把锁，然后线程 2 也开始 500 毫秒的休眠。"),l(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/85/2C/Cgq2xl6NrzGAOxZlAABQzGeeung440.png"})]),s("li",null,[n("当线程 1 的 500 毫秒休眠时间结束后，它将尝试去获取 o2 这把锁，此时 o2 这个锁正被线程 2 持有，所以线程 1 无法获取到的 o2。"),l(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0C/16/Ciqah16NrzKAcColAAA2HwmEHwg667.png"})]),s("li",null,[n("紧接着线程 2 也会苏醒过来，它将尝试获取 o1 这把锁，此时 o1 已被线程 1 持有。"),l(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/85/2C/Cgq2xl6NrzKAWAc5AAA1lPZZeKo398.png"})])]),A,l(a,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0C/16/Ciqah16NrzKAQ0EzAABXlJN0J2Q517.png"}),_,C])}const M=o(r,[["render",q]]);export{v as __pageData,M as default};
