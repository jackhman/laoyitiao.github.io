import{_ as s,o as n,g as a,Q as l}from"./chunks/framework.a0d18f64.js";const h=JSON.parse('{"title":"第36讲：失效策略：缓存过期都有哪些策略？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/分布式技术原理与实战45讲_文档/(1939) 第36讲：失效策略：缓存过期都有哪些策略？.md","filePath":"posts/backEnd/分布式技术原理与实战45讲_文档/(1939) 第36讲：失效策略：缓存过期都有哪些策略？.md","lastUpdated":1696682708000}'),p={name:"posts/backEnd/分布式技术原理与实战45讲_文档/(1939) 第36讲：失效策略：缓存过期都有哪些策略？.md"},o=l(`<h1 id="第36讲-失效策略-缓存过期都有哪些策略" tabindex="-1">第36讲：失效策略：缓存过期都有哪些策略？ <a class="header-anchor" href="#第36讲-失效策略-缓存过期都有哪些策略" aria-label="Permalink to &quot;第36讲：失效策略：缓存过期都有哪些策略？&quot;">​</a></h1><p>缓存使用的是内存资源，而内存资源是非常宝贵的，要用有限的服务器资源支撑更多的业务，就必须让那些访问频率不高的缓存删除掉，为新的缓存腾出内存空间。这一课时，我们一起来看一下，缓存失效有哪些策略。</p><h3 id="页面置换算法" tabindex="-1">页面置换算法 <a class="header-anchor" href="#页面置换算法" aria-label="Permalink to &quot;页面置换算法&quot;">​</a></h3><p>我们从一开始就提到，缓存技术在计算机系统设计中有着非常广泛的应用，对应到操作系统中，就是缓存页面的调度算法。</p><p>在操作系统中，文件的读取会先分配一定的页面空间，也就是我们说的 Page，使用页面的时候首先去查询空间是否有该页面的缓存，如果有的话，则直接拿出来；否则就先查询，页面空间没有满，就把新页面缓存起来，如果页面空间满了，就删除部分页面，方便新的页面插入。</p><p>在操作系统的页面空间中，对应淘汰旧页面的机制不同，所以会有不同页面调度方法，常见的有 FIFO、LRU、LFU 过期策略：</p><ul><li><p><strong>FIFO（First In First Out，先进先出）</strong>，根据缓存被存储的时间，离当前最远的数据优先被淘汰；</p></li><li><p><strong>LRU（Least Recently Used，最近最少使用）</strong>，根据最近被使用的时间，离当前最远的数据优先被淘汰；</p></li><li><p><strong>LFU（Least Frequently Used，最不经常使用）</strong>，在一段时间内，缓存数据被使用次数最少的会被淘汰。</p></li></ul><p>这三种策略也是经典的缓存淘汰策略，大部分缓存应用模型，都是基于这几种策略实现的。</p><h3 id="内存淘汰策略" tabindex="-1">内存淘汰策略 <a class="header-anchor" href="#内存淘汰策略" aria-label="Permalink to &quot;内存淘汰策略&quot;">​</a></h3><p>操作系统的页面置换算法，对应到分布式缓存中，就是缓存的内存淘汰策略，这里以 Redis 为例，进行分析。</p><p>当 Redis 节点分配的内存使用到达最大值以后，为了继续提供服务，Redis 会启动内存淘汰策略，以下的几种策略参考官方文档：</p><ul><li><p>noeviction，这是默认的策略，对于写请求会拒绝服务，直接返回错误，这种策略下可以保证数据不丢失；</p></li><li><p>allkeys-lru，这种策略操作的范围是所有 key，使用 LRU 算法进行缓存淘汰；</p></li><li><p>volatile-lru，这种策略操作的范围是设置了过期时间的 key，使用 LRU 算法进行淘汰；</p></li><li><p>allkeys-random，这种策略下操作的范围是所有 key，会进行随机淘汰数据；</p></li><li><p>volatile-random，这种策略操作的范围是设置了过期时间的 key，会进行随机淘汰；</p></li><li><p>volatile-ttl，这种策略操作的范围是设置了过期时间的 key，根据 key 的过期时间进行淘汰，越早过期的越优先被淘汰。</p></li></ul><h3 id="缓存过期策略" tabindex="-1">缓存过期策略 <a class="header-anchor" href="#缓存过期策略" aria-label="Permalink to &quot;缓存过期策略&quot;">​</a></h3><p>分布式缓存中的过期策略和内存淘汰策略又有一些不同，希望大家不要混淆，内存淘汰是缓存服务层面的操作，而过期策略定义的是具体缓存数据何时失效，下面一起来看一下。</p><p>我们都知道，Redis 是 key-value 数据库，可以设置缓存 key 的过期时间，过期策略就是指当 Redis 中缓存的 key 过期了，Redis 如何处理。</p><p>Redis 中过期策略通常有以下三种。</p><ul><li>定时过期</li></ul><p>这是最常见也是应用最多的策略，为每个设置过期时间的 key 都需要创建一个定时器，到过期时间就会立即清除。这种方式可以立即删除过期数据，避免浪费内存，但是需要耗费大量的 CPU 资源去处理过期的数据，可能影响缓存服务的性能。</p><ul><li>惰性过期</li></ul><p>可以类比懒加载的策略，这个就是懒过期，只有当访问一个 key 时，才会判断该 key 是否已过期，并且进行删除操作。这种方式可以节省 CPU 资源，但是可能会出现很多无效数据占用内存，极端情况下，缓存中出现大量的过期 key 无法被删除。</p><ul><li>定期过期</li></ul><p>这种方式是上面方案的整合，添加一个即将过期的缓存字典，每隔一定的时间，会扫描一定数量的 key，并清除其中已过期的 key。</p><p>合理的缓存配置，需要协调内存淘汰策略和过期策略，避免内存浪费，同时最大化缓存集群的吞吐量。另外，Redis 的缓存失效有一点特别关键，那就是如何避免大量主键在同一时间同时失效造成数据库压力过大的情况，对于这个问题在第 33 课时缓存穿透中有过描述，大家可以去扩展了解下。</p><h3 id="实现一个-lru-缓存" tabindex="-1">实现一个 LRU 缓存 <a class="header-anchor" href="#实现一个-lru-缓存" aria-label="Permalink to &quot;实现一个 LRU 缓存&quot;">​</a></h3><p>下面介绍一个高频的面试问题：如何实现一个 LRU 算法，该算法的实现很多同学都听过，但是不知道你还记不记得那句经典的格言，Talk is cheap，show me the code。很多人在写代码时一说就懂，一写就错，特别在面试时，常常要求你白板编程，脱离了 IDE 的帮助，更容易出现错误，所以我建议大家动手去实现一下。</p><p>在 Java 语言中实现 LUR 缓存，可以直接应用内置的 LinkedHashMap，重写对应的 removeEldestEntry() 方法，代码如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">LinkedHashMapExtend</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">LinkedHashMap</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> cacheSize; </span></span>
<span class="line"><span style="color:#E1E4E8;">     </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">LinkedHashMapExtend</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">cacheSize</span><span style="color:#E1E4E8;">){ </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">(); </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.cacheSize</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">cacheSize; </span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">removeEldestEntry</span><span style="color:#E1E4E8;">(Map.Entry </span><span style="color:#FFAB70;">eldest</span><span style="color:#E1E4E8;">) { </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//重写移除逻辑 </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">size</span><span style="color:#E1E4E8;">()</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">cacheSize){ </span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">; </span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">; </span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">LinkedHashMapExtend</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">LinkedHashMap</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> cacheSize; </span></span>
<span class="line"><span style="color:#24292E;">     </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">LinkedHashMapExtend</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#E36209;">cacheSize</span><span style="color:#24292E;">){ </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">(); </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.cacheSize</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">cacheSize; </span></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">removeEldestEntry</span><span style="color:#24292E;">(Map.Entry </span><span style="color:#E36209;">eldest</span><span style="color:#24292E;">) { </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//重写移除逻辑 </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">size</span><span style="color:#24292E;">()</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">cacheSize){ </span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">; </span></span>
<span class="line"><span style="color:#24292E;">        } </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">; </span></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>为什么重写 LinkedHashMap 可以实现 LRU 缓存呢？</p><p>对于这个问题，我建议你可以查看一下 LinkedHashMap 的源码实现，在原生的 removeEldestEntry 实现中，默认返回了 false，也就是永远不会移除最&quot;早&quot;的缓存数据，只要扩展这个条件，缓存满了移除最早的数据，是不是就实现了一个 LRU 策略？</p><p>在面试中，单纯使用 LinkedHashMap 实现是不够的，还会要求你使用原生的 Map 和双向链表来实现。下面我简单实现了一个参考代码，这道题目在 Leetcode 上的编号是 146，也是剑指 offer 里的一道经典题，大家可以去力扣网站提交代码试一下。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.util.HashMap; </span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">LRUCache</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> cacheSize; </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> currentSize; </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> CacheNode head; </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> CacheNode tail; </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> HashMap&lt;</span><span style="color:#F97583;">Integer</span><span style="color:#E1E4E8;">,</span><span style="color:#F97583;">CacheNode</span><span style="color:#E1E4E8;">&gt; nodes; </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">CacheNode</span><span style="color:#E1E4E8;">{ </span></span>
<span class="line"><span style="color:#E1E4E8;">        CacheNode prev; </span></span>
<span class="line"><span style="color:#E1E4E8;">        CacheNode next; </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> key; </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> value; </span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">LRUCache</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">cacheSize</span><span style="color:#E1E4E8;">){ </span></span>
<span class="line"><span style="color:#E1E4E8;">        cacheSize</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">cacheSize; </span></span>
<span class="line"><span style="color:#E1E4E8;">        currentSize</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; </span></span>
<span class="line"><span style="color:#E1E4E8;">        nodes</span><span style="color:#F97583;">=new</span><span style="color:#E1E4E8;"> HashMap&lt;&gt;(cacheSize); </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">(Integer </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">,Integer </span><span style="color:#FFAB70;">value</span><span style="color:#E1E4E8;">){ </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(nodes.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(key)</span><span style="color:#F97583;">==</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">){ </span><span style="color:#6A737D;">//添加新元素 </span></span>
<span class="line"><span style="color:#E1E4E8;">            CacheNode node</span><span style="color:#F97583;">=new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">CacheNode</span><span style="color:#E1E4E8;">(); </span></span>
<span class="line"><span style="color:#E1E4E8;">            node.key</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">key; </span></span>
<span class="line"><span style="color:#E1E4E8;">            node.value</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">value; </span></span>
<span class="line"><span style="color:#E1E4E8;">            nodes.</span><span style="color:#B392F0;">put</span><span style="color:#E1E4E8;">(key,node); </span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">//移动到表头 </span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">moveToHead</span><span style="color:#E1E4E8;">(node); </span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">//进行lru操作 </span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(currentSize</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">cacheSize) </span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#B392F0;">removeTail</span><span style="color:#E1E4E8;">(); </span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">                currentSize</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">; </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        }</span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;">{</span><span style="color:#6A737D;">//更新元素值 </span></span>
<span class="line"><span style="color:#E1E4E8;">            CacheNode node</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">nodes.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(key); </span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">//移动到表头 </span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">moveToHead</span><span style="color:#E1E4E8;">(node); </span></span>
<span class="line"><span style="color:#E1E4E8;">            node.value</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">value; </span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">removeTail</span><span style="color:#E1E4E8;">() { </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(tail</span><span style="color:#F97583;">!=</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">){ </span></span>
<span class="line"><span style="color:#E1E4E8;">            nodes.</span><span style="color:#B392F0;">remove</span><span style="color:#E1E4E8;">(tail.key); </span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(tail.prev</span><span style="color:#F97583;">!=</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">)  tail.prev.next</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">; </span></span>
<span class="line"><span style="color:#E1E4E8;">            tail</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">tail.prev; </span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">moveToHead</span><span style="color:#E1E4E8;">(CacheNode </span><span style="color:#FFAB70;">node</span><span style="color:#E1E4E8;">){ </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//链表中间的元素 </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(node.prev</span><span style="color:#F97583;">!=</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">){ </span></span>
<span class="line"><span style="color:#E1E4E8;">            node.prev.next</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">node.next; </span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(node.next</span><span style="color:#F97583;">!=</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">){ </span></span>
<span class="line"><span style="color:#E1E4E8;">            node.next.prev</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">node.prev; </span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//移动到表头 </span></span>
<span class="line"><span style="color:#E1E4E8;">        node.prev</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">; </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(head</span><span style="color:#F97583;">==</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">){ </span></span>
<span class="line"><span style="color:#E1E4E8;">            head</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">node; </span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;">{ </span></span>
<span class="line"><span style="color:#E1E4E8;">            node.next</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">head; </span></span>
<span class="line"><span style="color:#E1E4E8;">            head.prev</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">node; </span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        head</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">node; </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//更新tail </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//node就是尾部元素 </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(tail</span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;">node){ </span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">//下移一位 </span></span>
<span class="line"><span style="color:#E1E4E8;">            tail</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">tail.prev; </span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//缓存里就一个元素 </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(tail</span><span style="color:#F97583;">==</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">){ </span></span>
<span class="line"><span style="color:#E1E4E8;">          tail</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">node; </span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">){ </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(nodes.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(key)</span><span style="color:#F97583;">!=</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">){ </span></span>
<span class="line"><span style="color:#E1E4E8;">            CacheNode node</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">nodes.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(key); </span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">moveToHead</span><span style="color:#E1E4E8;">(node); </span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> node.value; </span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; </span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.util.HashMap; </span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">LRUCache</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> cacheSize; </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> currentSize; </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> CacheNode head; </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> CacheNode tail; </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> HashMap&lt;</span><span style="color:#D73A49;">Integer</span><span style="color:#24292E;">,</span><span style="color:#D73A49;">CacheNode</span><span style="color:#24292E;">&gt; nodes; </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">CacheNode</span><span style="color:#24292E;">{ </span></span>
<span class="line"><span style="color:#24292E;">        CacheNode prev; </span></span>
<span class="line"><span style="color:#24292E;">        CacheNode next; </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> key; </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> value; </span></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">LRUCache</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#E36209;">cacheSize</span><span style="color:#24292E;">){ </span></span>
<span class="line"><span style="color:#24292E;">        cacheSize</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">cacheSize; </span></span>
<span class="line"><span style="color:#24292E;">        currentSize</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; </span></span>
<span class="line"><span style="color:#24292E;">        nodes</span><span style="color:#D73A49;">=new</span><span style="color:#24292E;"> HashMap&lt;&gt;(cacheSize); </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">set</span><span style="color:#24292E;">(Integer </span><span style="color:#E36209;">key</span><span style="color:#24292E;">,Integer </span><span style="color:#E36209;">value</span><span style="color:#24292E;">){ </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(nodes.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(key)</span><span style="color:#D73A49;">==</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">){ </span><span style="color:#6A737D;">//添加新元素 </span></span>
<span class="line"><span style="color:#24292E;">            CacheNode node</span><span style="color:#D73A49;">=new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">CacheNode</span><span style="color:#24292E;">(); </span></span>
<span class="line"><span style="color:#24292E;">            node.key</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">key; </span></span>
<span class="line"><span style="color:#24292E;">            node.value</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">value; </span></span>
<span class="line"><span style="color:#24292E;">            nodes.</span><span style="color:#6F42C1;">put</span><span style="color:#24292E;">(key,node); </span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">//移动到表头 </span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">moveToHead</span><span style="color:#24292E;">(node); </span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">//进行lru操作 </span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(currentSize</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">cacheSize) </span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6F42C1;">removeTail</span><span style="color:#24292E;">(); </span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">                currentSize</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">; </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        }</span><span style="color:#D73A49;">else</span><span style="color:#24292E;">{</span><span style="color:#6A737D;">//更新元素值 </span></span>
<span class="line"><span style="color:#24292E;">            CacheNode node</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">nodes.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(key); </span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">//移动到表头 </span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">moveToHead</span><span style="color:#24292E;">(node); </span></span>
<span class="line"><span style="color:#24292E;">            node.value</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">value; </span></span>
<span class="line"><span style="color:#24292E;">        } </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">removeTail</span><span style="color:#24292E;">() { </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(tail</span><span style="color:#D73A49;">!=</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">){ </span></span>
<span class="line"><span style="color:#24292E;">            nodes.</span><span style="color:#6F42C1;">remove</span><span style="color:#24292E;">(tail.key); </span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(tail.prev</span><span style="color:#D73A49;">!=</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">)  tail.prev.next</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">; </span></span>
<span class="line"><span style="color:#24292E;">            tail</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">tail.prev; </span></span>
<span class="line"><span style="color:#24292E;">        } </span></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">moveToHead</span><span style="color:#24292E;">(CacheNode </span><span style="color:#E36209;">node</span><span style="color:#24292E;">){ </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//链表中间的元素 </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(node.prev</span><span style="color:#D73A49;">!=</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">){ </span></span>
<span class="line"><span style="color:#24292E;">            node.prev.next</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">node.next; </span></span>
<span class="line"><span style="color:#24292E;">        } </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(node.next</span><span style="color:#D73A49;">!=</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">){ </span></span>
<span class="line"><span style="color:#24292E;">            node.next.prev</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">node.prev; </span></span>
<span class="line"><span style="color:#24292E;">        } </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//移动到表头 </span></span>
<span class="line"><span style="color:#24292E;">        node.prev</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">; </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(head</span><span style="color:#D73A49;">==</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">){ </span></span>
<span class="line"><span style="color:#24292E;">            head</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">node; </span></span>
<span class="line"><span style="color:#24292E;">        }</span><span style="color:#D73A49;">else</span><span style="color:#24292E;">{ </span></span>
<span class="line"><span style="color:#24292E;">            node.next</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">head; </span></span>
<span class="line"><span style="color:#24292E;">            head.prev</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">node; </span></span>
<span class="line"><span style="color:#24292E;">        } </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        head</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">node; </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//更新tail </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//node就是尾部元素 </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(tail</span><span style="color:#D73A49;">==</span><span style="color:#24292E;">node){ </span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">//下移一位 </span></span>
<span class="line"><span style="color:#24292E;">            tail</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">tail.prev; </span></span>
<span class="line"><span style="color:#24292E;">        } </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//缓存里就一个元素 </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(tail</span><span style="color:#D73A49;">==</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">){ </span></span>
<span class="line"><span style="color:#24292E;">          tail</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">node; </span></span>
<span class="line"><span style="color:#24292E;">        } </span></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#E36209;">key</span><span style="color:#24292E;">){ </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(nodes.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(key)</span><span style="color:#D73A49;">!=</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">){ </span></span>
<span class="line"><span style="color:#24292E;">            CacheNode node</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">nodes.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(key); </span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">moveToHead</span><span style="color:#24292E;">(node); </span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> node.value; </span></span>
<span class="line"><span style="color:#24292E;">        } </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; </span></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>这一课时的内容主要介绍了缓存的几种失效策略，并且分享了一个面试中的高频问题：LRU 缓存实现。</p><p>缓存过期的策略来自操作系统，在我们的专栏中，对很多知识的展开都来自计算机原理、网络原理等底层技术，也从一个侧面反映了计算机基础知识的重要性。</p>`,34),e=[o];function c(t,r,E,y,i,d){return n(),a("div",null,e)}const A=s(p,[["render",c]]);export{h as __pageData,A as default};
