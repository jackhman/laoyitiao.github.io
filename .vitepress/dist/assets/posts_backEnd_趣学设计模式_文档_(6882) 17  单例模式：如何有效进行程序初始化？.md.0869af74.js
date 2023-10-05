import{_ as p,j as l,o,g as t,k as a,Q as s}from"./chunks/framework.4e7d56ce.js";const h=JSON.parse('{"title":"设计模式导学 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/趣学设计模式_文档/(6882) 17  单例模式：如何有效进行程序初始化？.md","filePath":"posts/backEnd/趣学设计模式_文档/(6882) 17  单例模式：如何有效进行程序初始化？.md","lastUpdated":1696417798000}'),e={name:"posts/backEnd/趣学设计模式_文档/(6882) 17  单例模式：如何有效进行程序初始化？.md"},c=s('<p>从这一讲开始，我们就正式进入模块三&quot;编程模式&quot;的学习了。</p><h3 id="设计模式导学" tabindex="-1">设计模式导学 <a class="header-anchor" href="#设计模式导学" aria-label="Permalink to &quot;设计模式导学&quot;">​</a></h3><p>不过，在这之前，我想简单和你聊聊设计模式的学习路径这个话题。这也是很多同学都很关心的话题。</p><h4 id="设计模式的底层逻辑" tabindex="-1">设计模式的底层逻辑 <a class="header-anchor" href="#设计模式的底层逻辑" aria-label="Permalink to &quot;设计模式的底层逻辑&quot;">​</a></h4><p>关于设计模式，现在有很多同学反馈说：</p><ul><li><p>学习了很多设计模式的课程和文章，依然不会用设计模式；</p></li><li><p>设计模式适用场景没有设计原则多；</p></li><li><p>设计模式入门简单，精通很难；</p></li><li><p>设计模式太复杂看不懂；</p></li><li><p>面试前才会看设计模式；</p></li><li><p>设计模式不如面向搜索编程有用；</p></li><li><p>......</p></li></ul><p>不可否认，一方面大家都很重视设计模式的学习，另一方面却又总是被设计模式搞晕，原因就在于没有真正明白设计模式最核心的到底是什么，也就是它的底层逻辑是什么。</p><p>其实，关于这个问题，《设计模式：可复用面向对象的基础》这本书中早已回答过：</p><blockquote><p>在设计中思考什么应该变化，并封装会发生变化的概念。</p></blockquote><p>说实话，最初我读到这句话时是很懵的，我知道如何封装数据、封装方法、封装操作，但&quot;封装&quot;概念似乎和代码实现没什么关系吧。直到工作了很多年后，再来看这句话时，我才突然明白，原来这句话才是理解设计模式的真正关键所在。</p><p>简单来说，就是八个字：<strong>找到变化，封装变化。</strong></p><p>实际上设计模式提出的初衷并不是为了解决类似用什么算法实现&quot;1+1=2&quot;的问题，而是告诉你应该如何用计算机的思维来思考该怎么让&quot;1+1=2&quot;正确运行起来。</p><p>现在网上有很多讲解设计模式的资料和文章，但大部分都侧重于讲：设计模式的定义是什么，如何实现一个模式，以及设计模式有哪些好处等。这并不是我们这门课程学习的重点，我还是希望带你搞清楚下面这样几个问题：</p><ul><li><p>为什么要使用设计模式？</p></li><li><p>设计模式都找到了哪些变化？又是如何封装这些变化？</p></li><li><p>如何通过使用场景来选择合适的设计模式？</p></li><li><p>使用设计模式后能收获什么？又会损失什么？</p></li></ul><p>在我看来，学习设计模式真正的好处并不在于学会&quot;如何使用&quot;它们，而是在于通过分析学到&quot;如何找到变化，如何封装变化&quot;的思想精髓，并最终通过实践融合到实际编程中，对实际编码设计有帮助。</p>',15),r=s('<h4 id="一个简单的学习框架" tabindex="-1">一个简单的学习框架 <a class="header-anchor" href="#一个简单的学习框架" aria-label="Permalink to &quot;一个简单的学习框架&quot;">​</a></h4><p>如果我们学习设计模式的目标，只是为了搞清楚设计模式是什么以及怎么画好它的 UML 图，然后再设计一个类似 Car 汽车类、Man 人类，那么到最后的结果大概率是：看了都懂，但到实际使用时依然不会用。</p><p>我曾经遇见一个同学，问他为什么一定要学习使用设计模式，他说他不想在管理超大代码集合时变得无所适从。写一个上传文件的代码，根本用不上什么设计模式，但是当你想要阅读优秀的开源框架，或者即将管理一个大型电商网站的订单系统、会员系统、评论系统时，我想你一定能用上设计模式。</p><p>所以，我希望这门课程不只是告诉你关于设计模式的知识，还要告诉你，通过设计模式你能获得哪些有价值的启发，并最终能灵活应用去解决真实的业务问题。</p><p>但是，传统学习设计模式的方法实现效果并不好，<strong>为此我就结合我多年学习设计模式的经验，总结出了一个简单的学习框架，它可以帮助你更高效地学习设计模式</strong>。</p><ul><li><p>这个模式中隐藏（封装）了什么实现（变化）？</p></li><li><p>这个模式中有什么共性规律（哪类变化）？</p></li><li><p>这个模式中的对象职责是什么？</p></li><li><p>这个模式中对象之间的关系是什么？</p></li><li><p>这个模式常用在哪些场景中？</p></li><li><p>这个模式基于常用场景的通用代码实现是什么？</p></li><li><p>这个模式如何基于上下文环境来进行设计和使用？</p></li></ul><p>希望结合这个框架，能让你更快地区分设计模式的表象和本质。接下来，我们就正式开始设计模式的学习。</p><h3 id="单例模式分析" tabindex="-1">单例模式分析 <a class="header-anchor" href="#单例模式分析" aria-label="Permalink to &quot;单例模式分析&quot;">​</a></h3><p>在 GoF 的书中，单例模式最早的定义如下：</p><blockquote><p>单例模式（Singleton）允许存在一个和仅存在一个给定类的实例。它提供一种机制让任何实体都可以访问该实例。</p></blockquote><p>我将其转换为 UML 图：</p>',11),E=s(`<p>图中，单例模式（Singleton）类声明了一个名为 _instance 的静态对象和名为 get­Instance() 的静态方法，静态对象用来存储对象自身的属性和方法，静态方法用来返回其所属类的一个相同实例。这里我们以单例模式经典的懒汉式初始化方式为例，其代码实现如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Singleton</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">//用于存储单一实例的静态对象</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> Singleton _instance; </span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">//私有的空构造函数</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Singleton</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">    };</span></span>
<span class="line"><span style="color:#E1E4E8;">		</span><span style="color:#6A737D;">//通过判断静态对象是否被初始化来选择是否创建对象</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> Singleton </span><span style="color:#B392F0;">getInstance</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> _instance){</span></span>
<span class="line"><span style="color:#E1E4E8;">            _instance </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Singleton</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> _instance;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Singleton</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">//用于存储单一实例的静态对象</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> Singleton _instance; </span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">//私有的空构造函数</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Singleton</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">    };</span></span>
<span class="line"><span style="color:#24292E;">		</span><span style="color:#6A737D;">//通过判断静态对象是否被初始化来选择是否创建对象</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> Singleton </span><span style="color:#6F42C1;">getInstance</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> _instance){</span></span>
<span class="line"><span style="color:#24292E;">            _instance </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Singleton</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> _instance;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>通过分析上面的定义和代码，我们可以得出单例模式包含三个要点：</p><ul><li><p>一个单例类只能有一个实例；</p></li><li><p>单例类必须自行创建这个实例；</p></li><li><p>单例类必须保证全局其他对象都能唯一访问到它。</p></li></ul><p>其实，<strong>这三个要点就是单例模式所要应对的变化</strong>，也就是：</p><ul><li><p>对象实例数量受到限制的事实；</p></li><li><p>对象实例的构造与销毁；</p></li><li><p>需要保证对象实例成为&quot;线程安全&quot;的某种机制。</p></li></ul><p>从上面那段示例代码我们还可以看出，<strong>单例模式的对象职责有两个</strong>：</p><ul><li><p>保证一个类只有一个实例；</p></li><li><p>为该实例提供一个全局访问节点。</p></li></ul><p>你会发现，单例类的默认构造函数和静态对象都是内部调用，之所以将默认构造函数设为私有，是为了防止其他对象使用单例类的 new 运算符。然后，提供一个对外的公共方法来获取唯一的对象实例。在我看来，<strong>单例模式就类似于全局变量或全局函数的角色，可以使用它来代替全局变量</strong>。</p><h3 id="常见场景和解决方案" tabindex="-1">常见场景和解决方案 <a class="header-anchor" href="#常见场景和解决方案" aria-label="Permalink to &quot;常见场景和解决方案&quot;">​</a></h3><p><strong>单例模式更多是在程序一开始进行初始化时使用的</strong>，接下来，我们就来看看有哪些比较常用的场景和解决方案。</p><p>常见的单例模式应用和使用的解决方案有：饿汉式初始化、懒汉式初始化、同步信号、双重锁定和使用 ThreadLocal。其中，懒汉式初始化的代码实现在前面我们已经介绍过了，饿汉式、同步信号、双重锁定网上资料有很多，并且也不难理解，就不再赘述。</p><p>这里我们重点介绍一下使用 ThreadLocal 的方式，比如，下面这个 AppContext 代码示例：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.util.HashMap;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> java.util.Map;</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AppContext</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> ThreadLocal&lt;</span><span style="color:#F97583;">AppContext</span><span style="color:#E1E4E8;">&gt; local </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> ThreadLocal&lt;&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> Map&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">,</span><span style="color:#F97583;">Object</span><span style="color:#E1E4E8;">&gt; data </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> HashMap&lt;&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> Map&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">Object</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#B392F0;">getData</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getAppContext</span><span style="color:#E1E4E8;">().data;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//批量存数据</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setData</span><span style="color:#E1E4E8;">(Map&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">Object</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#FFAB70;">data</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">getAppContext</span><span style="color:#E1E4E8;">().data.</span><span style="color:#B392F0;">putAll</span><span style="color:#E1E4E8;">(data);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//存数据</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">, String </span><span style="color:#FFAB70;">value</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">getAppContext</span><span style="color:#E1E4E8;">().data.</span><span style="color:#B392F0;">put</span><span style="color:#E1E4E8;">(key,value);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//取数据</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">getAppContext</span><span style="color:#E1E4E8;">().data.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(key);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//初始化的实现方法</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> AppContext </span><span style="color:#B392F0;">init</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">        AppContext context </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AppContext</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        local.</span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">(context);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> context;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//做延迟初始化</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> AppContext </span><span style="color:#B392F0;">getAppContext</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">        AppContext context </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> local.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> context) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            context </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">init</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> context;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//删除实例</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">remove</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        local.</span><span style="color:#B392F0;">remove</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.util.HashMap;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> java.util.Map;</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AppContext</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> ThreadLocal&lt;</span><span style="color:#D73A49;">AppContext</span><span style="color:#24292E;">&gt; local </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> ThreadLocal&lt;&gt;();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> Map&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">,</span><span style="color:#D73A49;">Object</span><span style="color:#24292E;">&gt; data </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> HashMap&lt;&gt;();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> Map&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">Object</span><span style="color:#24292E;">&gt; </span><span style="color:#6F42C1;">getData</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getAppContext</span><span style="color:#24292E;">().data;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//批量存数据</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setData</span><span style="color:#24292E;">(Map&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">Object</span><span style="color:#24292E;">&gt; </span><span style="color:#E36209;">data</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">getAppContext</span><span style="color:#24292E;">().data.</span><span style="color:#6F42C1;">putAll</span><span style="color:#24292E;">(data);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//存数据</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">set</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">key</span><span style="color:#24292E;">, String </span><span style="color:#E36209;">value</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">getAppContext</span><span style="color:#24292E;">().data.</span><span style="color:#6F42C1;">put</span><span style="color:#24292E;">(key,value);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//取数据</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">key</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">getAppContext</span><span style="color:#24292E;">().data.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(key);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//初始化的实现方法</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> AppContext </span><span style="color:#6F42C1;">init</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">        AppContext context </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AppContext</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        local.</span><span style="color:#6F42C1;">set</span><span style="color:#24292E;">(context);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> context;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//做延迟初始化</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> AppContext </span><span style="color:#6F42C1;">getAppContext</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">        AppContext context </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> local.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> context) {</span></span>
<span class="line"><span style="color:#24292E;">            context </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">init</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> context;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//删除实例</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">remove</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        local.</span><span style="color:#6F42C1;">remove</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>上面的代码实现实际上就是懒汉式初始化的扩展，只不过用 ThreadLocal 替换静态对象来存储唯一对象实例。之所会选择 ThreadLocal，就是因为 ThreadLocal 相比传统的线程同步机制更有优势。</p><p>在传统的同步机制中，我们通常会通过对象的锁机制来保证同一时间只有一个线程访问单例类。这时该类是多个线程共享的，我们都知道使用同步机制时，什么时候对类进行读写、什么时候锁定和释放对象是有很烦琐要求的，这对于一般的程序员来说，设计和编写难度相对较大。</p><p><strong>而 ThreadLocal 则会为每一个线程提供一个独立的对象副本</strong>，从而解决了多个线程对数据的访问冲突的问题。正因为每一个线程都拥有自己的对象副本，也就省去了线程之间的同步操作。</p><p>所以说，<strong>现在绝大多数单例模式的实现基本上都是采用的 ThreadLocal 这一种实现方式</strong>。</p><h3 id="为什么使用单例模式" tabindex="-1">为什么使用单例模式？ <a class="header-anchor" href="#为什么使用单例模式" aria-label="Permalink to &quot;为什么使用单例模式？&quot;">​</a></h3><p>通过上面的分析，现在我们就可以来回答这个问题了：为什么要使用单例模式？</p><p><strong>第一，系统某些资源有限</strong>。比如，控制某些共享资源（例如，数据库或文件）的访问权限。资源有限就会带来访问冲突的问题，如果不限制实例的数量，那么很快有限的资源就会耗尽，同时造成大量的对象处于等待资源中。再比如，同时读写同一个超大的 AI 模型文件，或使用外部进程式服务，如果不使用单例模式，随着用户进程数开启越多，系统原有的进程处理资源就会变得越少，这不仅会导致操作系统处理速度变慢，同时也会影响用户进程自身的处理速度。</p><p><strong>第二，需要表示为全局唯一的对象。</strong> 比如，系统要求提供一个唯一的序列号生成器。客户调用类的单个实例只允许使用一个公共访问点，除了该公共访问点，不能通过其他途径访问该实例。在一个系统中要求一个类只有一个实例时才应当使用单例模式。反过来，如果一个类可以有几个实例共存，就需要对单例模式进行改进，使之成为多例模式。</p><h3 id="收获什么-损失什么" tabindex="-1">收获什么？损失什么？ <a class="header-anchor" href="#收获什么-损失什么" aria-label="Permalink to &quot;收获什么？损失什么？&quot;">​</a></h3><p>了解了使用单例模式的原因之后，你可能还会好奇使用单例模式的优势和劣势。这里我们简单介绍下。</p><p>我们先来看使用单例模式的优势，也就是通过它我们能收获什么呢。</p><ul><li><p>对有限资源的合理利用，保护有限的资源，防止资源重复竞抢。</p></li><li><p>更高内聚的代码组件，能提升代码复用性。</p></li><li><p>具备全局唯一访问点的权限控制，方便按照统一规则管控权限。</p></li><li><p>从负载均衡角度考虑，我们可以轻松地将 Singleton 扩展成两个、三个或更多个实例。由于封装了基数问题，所以在适当的时候可以自由更改实例的数量。</p></li></ul><p>除了优势，使用单例模式当然也会带来一些劣势，也就是我们会损失一些东西或特点。</p><ul><li><p>作为全局变量使用时，引用的对象越多，代码修改影响的范围也越大。</p></li><li><p>作为全局变量时，在全局变量中使用状态变量时，会造成加/解锁的性能损耗。</p></li><li><p>即便能扩展多实例，但耦合性依然很高，因为隐蔽了不同对象之间的调用关系。</p></li><li><p>不支持有参数的构造函数。</p></li></ul><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>在我看来，学习设计模式时，除了要理解设计模式的原理之外，更重要的是要能获得启发------如何才能为真实的开发过程带来最大的实际价值（解决多少实际问题）。</p><p><strong>设计模式的底层逻辑就是：找到变化，封装变化</strong>。学习任何设计模式时，你都应该牢牢抓住这个本质核心，同时也要不断复习简单的学习框架，因为这在后面更多的模式学习中会起到关键的作用。</p><p>除此之外，今天我们还主要介绍了单例模式，从定义到具体案例代码的分析，讲解了单例模式的适用场景以及使用后的收获和损失。</p><p>你会发现，单独讲一个模式时，其实原理看上去都很容易，如果遇到了这个特定的场景，使用模式也能很容易解决问题。而随着学习的模式越多，反而越不知道该怎么决策，这时就要时刻提醒自己：使用模式后会带来什么收益？又会损失什么？为什么要使用这个模式？然后再去思考如何实现。这个过程和我们课程讲解的顺序恰好是反过来的，这也是大家很容易忽略的地方，所以一定要注意。</p><h3 id="课后思考" tabindex="-1">课后思考 <a class="header-anchor" href="#课后思考" aria-label="Permalink to &quot;课后思考&quot;">​</a></h3><p>在你所熟悉的 Spring 框架中，你知道 Spring 单例 Bean 与单例模式的区别是什么吗？</p><p>欢迎你留言分享，我会第一时间给你回复。</p><p>在下一讲，我会接着与你分享&quot;建造者模式：如何创建不同形式的复杂对象？&quot;这个话题，记得按时来听课！</p>`,37);function y(i,A,F,u,g,d){const n=l("Image");return o(),t("div",null,[c,a(n,{alt:"设计模式17--金句.png",src:"https://s0.lgstatic.com/i/image6/M01/3D/AE/Cgp9HWCWApGAe1AGAAYeDpnmv5Q465.png"}),r,a(n,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M01/3D/AC/Cgp9HWCV_oGAC49iAAEKvMFGEzQ091.png"}),E])}const D=p(e,[["render",y]]);export{h as __pageData,D as default};
