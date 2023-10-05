import{_ as s,o as a,g as n,Q as p}from"./chunks/framework.4e7d56ce.js";const h=JSON.parse('{"title":"读写锁的获取规则 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/096-Java 并发编程文档/(265) 第25讲：读写锁 ReadWriteLock 获取锁有哪些规则？.md","filePath":"posts/backEnd/096-Java 并发编程文档/(265) 第25讲：读写锁 ReadWriteLock 获取锁有哪些规则？.md","lastUpdated":1696338709000}'),l={name:"posts/backEnd/096-Java 并发编程文档/(265) 第25讲：读写锁 ReadWriteLock 获取锁有哪些规则？.md"},o=p(`<p>在本课时我们主要讲解读写锁 ReadWriteLock 获取锁有哪些规则呢？</p><p>在没有读写锁之前，我们假设使用普通的 ReentrantLock，那么虽然我们保证了线程安全，但是也浪费了一定的资源，因为如果多个读操作同时进行，其实并没有线程安全问题，我们可以允许让多个读操作并行，以便提高程序效率。</p><p>但是写操作不是线程安全的，如果多个线程同时写，或者在写的同时进行读操作，便会造成线程安全问题。</p><p>我们的读写锁就解决了这样的问题，它设定了一套规则，既可以保证多个线程同时读的效率，同时又可以保证有写入操作时的线程安全。</p><p>整体思路是它有两把锁，第 1 把锁是写锁，获得写锁之后，既可以读数据又可以修改数据，而第 2 把锁是读锁，获得读锁之后，只能查看数据，不能修改数据。读锁可以被多个线程同时持有，所以多个线程可以同时查看数据。</p><p>在读的地方合理使用读锁，在写的地方合理使用写锁，灵活控制，可以提高程序的执行效率。</p><h3 id="读写锁的获取规则" tabindex="-1">读写锁的获取规则 <a class="header-anchor" href="#读写锁的获取规则" aria-label="Permalink to &quot;读写锁的获取规则&quot;">​</a></h3><p>我们在使用读写锁时遵守下面的获取规则：</p><ol><li><p>当一个线程已经占有了读锁，那么其他线程如果想要申请读锁，可以申请成功；</p></li><li><p>当一个线程已经占有了读锁，而且有其他线程想要申请获取写锁的话，是不能申请成功的，因为读写互斥；</p></li><li><p>当一个线程已经占有了写锁，那么此时其他线程无论是想申请读锁还是写锁，都无法申请成功。</p></li></ol><p>所以我们用一句话总结：要么是一个或多个线程同时有读锁，要么是一个线程有写锁，但是两者不会同时出现。也可以总结为：读读共享、其他都互斥（写写互斥、读写互斥、写读互斥）。</p><h3 id="使用案例" tabindex="-1">使用案例 <a class="header-anchor" href="#使用案例" aria-label="Permalink to &quot;使用案例&quot;">​</a></h3><p>下面我们举个例子来应用读写锁，ReentrantReadWriteLock 是 ReadWriteLock 的实现类，最主要的有两个方法：readLock() 和 writeLock() 用来获取读锁和写锁。</p><p>代码如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 描述：     演示读写锁用法</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ReadWriteLockDemo</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> ReentrantReadWriteLock reentrantReadWriteLock </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ReentrantReadWriteLock</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> ReentrantReadWriteLock.ReadLock readLock </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> reentrantReadWriteLock</span></span>
<span class="line"><span style="color:#E1E4E8;">            .</span><span style="color:#B392F0;">readLock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> ReentrantReadWriteLock.WriteLock writeLock </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> reentrantReadWriteLock</span></span>
<span class="line"><span style="color:#E1E4E8;">            .</span><span style="color:#B392F0;">writeLock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">read</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        readLock.</span><span style="color:#B392F0;">lock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(Thread.</span><span style="color:#B392F0;">currentThread</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">getName</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;得到读锁，正在读取&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            Thread.</span><span style="color:#B392F0;">sleep</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">500</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (InterruptedException </span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            e.</span><span style="color:#B392F0;">printStackTrace</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">finally</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(Thread.</span><span style="color:#B392F0;">currentThread</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">getName</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;释放读锁&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            readLock.</span><span style="color:#B392F0;">unlock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">write</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        writeLock.</span><span style="color:#B392F0;">lock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(Thread.</span><span style="color:#B392F0;">currentThread</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">getName</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;得到写锁，正在写入&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            Thread.</span><span style="color:#B392F0;">sleep</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">500</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (InterruptedException </span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            e.</span><span style="color:#B392F0;">printStackTrace</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">finally</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(Thread.</span><span style="color:#B392F0;">currentThread</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">getName</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;释放写锁&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            writeLock.</span><span style="color:#B392F0;">unlock</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> InterruptedException {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Thread</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">read</span><span style="color:#E1E4E8;">()).</span><span style="color:#B392F0;">start</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Thread</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">read</span><span style="color:#E1E4E8;">()).</span><span style="color:#B392F0;">start</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Thread</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">write</span><span style="color:#E1E4E8;">()).</span><span style="color:#B392F0;">start</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Thread</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">write</span><span style="color:#E1E4E8;">()).</span><span style="color:#B392F0;">start</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">/**</span></span>
<span class="line"><span style="color:#6A737D;"> * 描述：     演示读写锁用法</span></span>
<span class="line"><span style="color:#6A737D;"> */</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ReadWriteLockDemo</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> ReentrantReadWriteLock reentrantReadWriteLock </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ReentrantReadWriteLock</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> ReentrantReadWriteLock.ReadLock readLock </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> reentrantReadWriteLock</span></span>
<span class="line"><span style="color:#24292E;">            .</span><span style="color:#6F42C1;">readLock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> ReentrantReadWriteLock.WriteLock writeLock </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> reentrantReadWriteLock</span></span>
<span class="line"><span style="color:#24292E;">            .</span><span style="color:#6F42C1;">writeLock</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">read</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        readLock.</span><span style="color:#6F42C1;">lock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(Thread.</span><span style="color:#6F42C1;">currentThread</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">getName</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;得到读锁，正在读取&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            Thread.</span><span style="color:#6F42C1;">sleep</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">500</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (InterruptedException </span><span style="color:#E36209;">e</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            e.</span><span style="color:#6F42C1;">printStackTrace</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">finally</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(Thread.</span><span style="color:#6F42C1;">currentThread</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">getName</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;释放读锁&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            readLock.</span><span style="color:#6F42C1;">unlock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">write</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        writeLock.</span><span style="color:#6F42C1;">lock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(Thread.</span><span style="color:#6F42C1;">currentThread</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">getName</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;得到写锁，正在写入&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            Thread.</span><span style="color:#6F42C1;">sleep</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">500</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (InterruptedException </span><span style="color:#E36209;">e</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            e.</span><span style="color:#6F42C1;">printStackTrace</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">finally</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(Thread.</span><span style="color:#6F42C1;">currentThread</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">getName</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;释放写锁&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            writeLock.</span><span style="color:#6F42C1;">unlock</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> InterruptedException {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Thread</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">read</span><span style="color:#24292E;">()).</span><span style="color:#6F42C1;">start</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Thread</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">read</span><span style="color:#24292E;">()).</span><span style="color:#6F42C1;">start</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Thread</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">write</span><span style="color:#24292E;">()).</span><span style="color:#6F42C1;">start</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Thread</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">write</span><span style="color:#24292E;">()).</span><span style="color:#6F42C1;">start</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>程序的运行结果是：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">Thread</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">0得到读锁，正在读取</span></span>
<span class="line"><span style="color:#E1E4E8;">Thread</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">1得到读锁，正在读取</span></span>
<span class="line"><span style="color:#E1E4E8;">Thread</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">0释放读锁</span></span>
<span class="line"><span style="color:#E1E4E8;">Thread</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">1释放读锁</span></span>
<span class="line"><span style="color:#E1E4E8;">Thread</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">2得到写锁，正在写入</span></span>
<span class="line"><span style="color:#E1E4E8;">Thread</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">2释放写锁</span></span>
<span class="line"><span style="color:#E1E4E8;">Thread</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">3得到写锁，正在写入</span></span>
<span class="line"><span style="color:#E1E4E8;">Thread</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">3释放写锁</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">Thread</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">0得到读锁，正在读取</span></span>
<span class="line"><span style="color:#24292E;">Thread</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">1得到读锁，正在读取</span></span>
<span class="line"><span style="color:#24292E;">Thread</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">0释放读锁</span></span>
<span class="line"><span style="color:#24292E;">Thread</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">1释放读锁</span></span>
<span class="line"><span style="color:#24292E;">Thread</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">2得到写锁，正在写入</span></span>
<span class="line"><span style="color:#24292E;">Thread</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">2释放写锁</span></span>
<span class="line"><span style="color:#24292E;">Thread</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">3得到写锁，正在写入</span></span>
<span class="line"><span style="color:#24292E;">Thread</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">3释放写锁</span></span></code></pre></div><p>可以看出，读锁可以同时被多个线程获得，而写锁不能。</p><h3 id="读写锁适用场合" tabindex="-1">读写锁适用场合 <a class="header-anchor" href="#读写锁适用场合" aria-label="Permalink to &quot;读写锁适用场合&quot;">​</a></h3><p>最后我们来看下读写锁的适用场合，相比于 ReentrantLock 适用于一般场合，ReadWriteLock 适用于读多写少的情况，合理使用可以进一步提高并发效率。</p>`,19),e=[o];function t(c,r,E,y,i,F){return a(),n("div",null,e)}const k=s(l,[["render",t]]);export{h as __pageData,k as default};
