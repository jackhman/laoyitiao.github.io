import{_ as a,j as p,o as l,g as o,k as e,Q as s}from"./chunks/framework.e0c66c3f.js";const _=JSON.parse('{"title":"模式原理分析 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/趣学设计模式_文档/(6893) 28  代理模式：如何控制和管理对象的访问？.md","filePath":"posts/backEnd/趣学设计模式_文档/(6893) 28  代理模式：如何控制和管理对象的访问？.md","lastUpdated":1696338709000}'),t={name:"posts/backEnd/趣学设计模式_文档/(6893) 28  代理模式：如何控制和管理对象的访问？.md"},c=s('<p>代理模式的原理非常简单，它和装饰模式很类似，都是在不改变同一个接口功能的前提下，对原有接口功能做扩展。但是<strong>代理模式的应用却比装饰模式更为广泛</strong>，因为代理模式并不执着于链式结构，而是采用更为灵活的单一结构，在很多框架和组件的设计里都能看到代理模式的身影，比如，JDK 的动态代理机制、Spring 的 AOP 机制、Dubbo 框架等。</p><p>那么，为什么代理模式能够获得如此广泛的应用呢？</p><p>话不多说，现在就让我们带着这个疑问开始今天的学习吧。</p><h3 id="模式原理分析" tabindex="-1">模式原理分析 <a class="header-anchor" href="#模式原理分析" aria-label="Permalink to &quot;模式原理分析&quot;">​</a></h3><p>代理模式的原始定义是：让你能够提供对象的替代品或其占位符。代理控制着对于原对象的访问，并允许将请求提交给对象前后进行一些处理。</p><p>从这个定义中我们能看出，<strong>代理模式是作为对象之间的一种中间结构来使用的，通过构建一个代理对象来对原始的功能进行委托处理，其中有一个很重要的功能就是控制对象的访问</strong>。拿现实中的例子来说，假设你有一套房子要卖，可你却正好在外地出差，你不能亲自处理带人看房、过户等购房手续，这时你就可以找一个房产中介来作为你的代理人，委托他来帮你带人看房、处理过户手续。这就是现实中经典的代理模式的例子。</p><p>我们先来看看代理模式的 UML 图：</p>',7),r=s(`<p>从这个 UML 图中，我们能看出代理模式的三个关键角色。</p><ul><li><p><strong>抽象主题类（RealObject）</strong>：声明公用的方法，定义可供客户端使用的统一功能。</p></li><li><p><strong>主题实现类（RealObjectImpl）</strong>：实现了抽象主题类的所有方法。</p></li><li><p><strong>代理类（Proxy）</strong>：实现了抽象主题类的方法，并隐藏在代理后面可能其他类的实现。</p></li></ul><p>在图中这三个角色都有相互依赖的关系，代理类采用继承的方式来获取抽象主题类的公共方法定义，在代理类内可以进行相关的扩展操作，但最终还是需要执行主题实现类的方法。这是和适配器模式很不同的地方，适配器模式是转换为新的接口，而代理模式不会改变原有接口。</p><p>接下来，我们再来看看该 UML 对应的代码实现：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">RealObject</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">doSomething</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">RealObjectImpl</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">RealObject</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">doSomething</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;=== 真实对象输出打印&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Proxy</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">RealObjectImpl</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">doSomething</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">//这里做一些代理操作或额外的操作</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;== 通过代理类来执行真实对象&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">doSomething</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">//单元测试</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Demo</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        RealObject realObjectProxy </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Proxy</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        realObjectProxy.</span><span style="color:#B392F0;">doSomething</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">输出：</span></span>
<span class="line"><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> 通过代理类来执行真实对象</span></span>
<span class="line"><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> 真实对象输出打印</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">RealObject</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">doSomething</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">RealObjectImpl</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">RealObject</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">doSomething</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;=== 真实对象输出打印&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Proxy</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">RealObjectImpl</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">doSomething</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">//这里做一些代理操作或额外的操作</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;== 通过代理类来执行真实对象&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">doSomething</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">//单元测试</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Demo</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        RealObject realObjectProxy </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Proxy</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        realObjectProxy.</span><span style="color:#6F42C1;">doSomething</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">输出：</span></span>
<span class="line"><span style="color:#D73A49;">==</span><span style="color:#24292E;"> 通过代理类来执行真实对象</span></span>
<span class="line"><span style="color:#D73A49;">===</span><span style="color:#24292E;"> 真实对象输出打印</span></span></code></pre></div><p>在上面的这段代码实现中，RealObjectImpl 实现了接口 RealObject 的功能 doSomething，这时我们又创建了一个代理对象 Proxy，它继承了 RealObjectImpl，目的是在使用 RealObject 时可以做一些额外的操作。</p><p>代码实现虽然简单，但是却展现了代理模式的基本理念------<strong>作为一个外包装的中间层，享有控制住访问对象的权利，同时也能扩展一些功能</strong>。</p><h3 id="为什么使用代理模式" tabindex="-1">为什么使用代理模式？ <a class="header-anchor" href="#为什么使用代理模式" aria-label="Permalink to &quot;为什么使用代理模式？&quot;">​</a></h3><p>虽然代理模式的基本原理非常简单，但是你可能会问：为什么不直接使用已有对象的功能，而非要在中间加一层代理呢？其实主要有三个原因。</p><p><strong>第一个，客户端有时无法直接操作某些对象。</strong> 比如，在分布式应用中，你需要调用的对象可能是运行在另外一台服务器上的，当你访问它时，就必须要通过网络才能访问。如果你让客户端直接去调用，那么就意味着客户端需要处理网络服务，包括连接、打包、传包、解包等复杂操作；而这时如果你使用代理模式，在客户端和远程服务端之间建立一个网络代理对象，那么客户端只需要调用代理对象就能跟远程对象建立联系，甚至就像调用本地对象一样。这其实就是我们常说的 RPC 服务的基本原理，本质上就是代理模式。</p><p><strong>第二个，客户端执行某些耗时操作容易造成服务端阻塞。</strong> 比如，在类似有道、石墨、语雀这样的云编辑器里进行文案编写时，拷贝多张图片可能就是一件非常耗时的操作，使用者并不希望在执行拷贝图片的操作后，打字就无法正常操作甚至无法查看其他页面。这时，对于软件设计者来说，图片的加载就可以通过代理模式来解决：标示图片所在位置，然后使用代理对象去读取图片资源，这样就不会影响其他客户端与服务端之间的操作了。</p><p><strong>第三个，服务端需要控制客户端的访问权限。</strong> 代理模式除了前面提到的扩展功能外，另一个更为重要的功能是做权限控制。比如，某一项业务由于安全原因只能让一部分特定的用户去访问，如果在原有功能的基础上再增加权限过滤功能就会增加代码的耦合性，并且也不方便组件的复用。其实，这时做一个代理类就可以解决该问题，对于特定的接口来说，只需要指定所有请求必须通过该代理类，然后由该代理类做权限判断即可。</p><h3 id="使用场景分析" tabindex="-1">使用场景分析 <a class="header-anchor" href="#使用场景分析" aria-label="Permalink to &quot;使用场景分析&quot;">​</a></h3><p>通过分析选择代理模式的原因，我们不难发现，代理模式的核心能力在于对某一个具体的功能进行增强和补充。</p><p>为了更好地帮助你理解代理模式的使用场景，下面我们还是结合一个简单的例子来说明。在 Spring 中，我们经常会使用 @Transactional 注解来做事务控制，代码如下所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Service</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">TestInfo</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Autowired</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> TestService testService;</span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Transactional</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> TestData </span><span style="color:#B392F0;">create</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">case</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        System.out.</span><span style="color:#B392F0;">println</span><span style="color:#E1E4E8;">(testService.</span><span style="color:#B392F0;">getClass</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">getName</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> testService.</span><span style="color:#B392F0;">create</span><span style="color:#E1E4E8;">(author);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Service</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">TestInfo</span><span style="color:#24292E;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Autowired</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> TestService testService;</span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Transactional</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> TestData </span><span style="color:#6F42C1;">create</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">case</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        System.out.</span><span style="color:#6F42C1;">println</span><span style="color:#24292E;">(testService.</span><span style="color:#6F42C1;">getClass</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">getName</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> testService.</span><span style="color:#6F42C1;">create</span><span style="color:#24292E;">(author);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>在 TestInfo 类中，@Transactional 注解了 create 方法，这个注解表示 Spring 会使用事务的方式来执行代码中的 create 方法。那什么是事务呢？简单来说，事务是指程序中一系列关联的逻辑操作，所有操作必须全部完成后才算一次操作成功，否则所有的操作变更都会被撤销。在上面的代码中，为了完成一次事务，Spring 便采用了代理模式的方式来解决，也就是 @Transactional 注解的实现。</p><p>这里我们也简单复习一下 @Transactional 注解实现的原理。在一次请求调用的事务开始后，Transactional 的注解实现类会生成一个代理对象 connection，通过 AOP 机制将其放入 Spring 的 Bean 资源池中与 DataSource、DataSourceTransactionManager 相关的对象容器中。在接下来的整个事务中的代码，都会通过该 connection 对象连接数据库，执行所有数据库命令。事务结束时，回到最初的代理 connection 对象上返回操作，并关闭代理对象 connection。</p><p>你发现没，@Transactional 注解的实现过程其实就是代理模式的一种最佳实践。</p><p>通过上面的示例，想必你已经大致了解代理模式的使用场景了。实际上，代理模式应用非常广泛，目前的使用场景大致可总结为以下五大类。</p><p><strong>第一类，虚拟代理，适用于延迟初始化，用小对象表示大对象的场景</strong>。这个&quot;大对象&quot;会包含大量 IO 资源，比如图片、大文件、模型文件等。我们都知道，大对象通常很占用内存空间，一直保持其运行会很消耗系统资源，这时就可以使用代理模式。那怎么来做呢？可以先创建一个消耗相对较小的对象来代理这个大对象的创建，而实际上真实的大对象只会在真正需要时才会被创建，这样的代理方式就被称为虚拟代理。比如，在 Java 中的 CopyOnWriteArrayList 数组对象的实现就是使用了虚拟代理的方式，目的就是要让操作延迟，只有对象被真正用到的时候才会被克隆。</p><p><strong>第二类，保护代理，适用于服务端对客户端的访问控制场景</strong>。代理模式有一个非常重要的应用场景就是控制一个对象对另一个对象的访问与使用权限。当客户端通过代理对象访问服务端的原始对象时，代理对象会根据具体的规则来判断客户端是否有访问权限。比如，防火墙其实就是一种保护代理的具体实践。</p><p><strong>第三类，远程代理，适用于需要本地执行远程服务代码的场景。</strong> 在这种场景中，代理对象会隐藏处理所有与网络相关的复杂细节。随着微服务架构的流行，越来越多的程序应用部署在多台服务器上，各自服务都更专注于各自的业务，当需要使用其他服务时就会频繁进行远程服务调用，但不可能所有的业务都要自己实现网络调用，于是就出现了的远程代理框架，比如，gRpc、Dubbo 等。</p><p><strong>第四类，日志记录代理，适用于需要保存请求对象历史记录的场景</strong>，比如，日志监控。客户端在调用请求时，并不会感知到日志记录，这是因为代理对象在原始对象周围添加了监控功能。</p><p><strong>第五类，缓存代理，适用于缓存客户请求结果并对缓存生命周期进行管理的场景</strong>。比如，商品详情页通常包含大量图片和文字介绍，代理对象可以对重复请求相同的结果进行缓存。</p><h3 id="收益什么-损失什么" tabindex="-1">收益什么？损失什么？ <a class="header-anchor" href="#收益什么-损失什么" aria-label="Permalink to &quot;收益什么？损失什么？&quot;">​</a></h3><p>从上面的使用场景分析中，我们可以总结提炼出代理模式的优点和缺点。</p><p>其中，代理模式的优点主要有以下。</p><ul><li><p>作为接口的特定中间层，能够降低对象间的直接耦合。代理对象很好地解耦了客户端与服务端之间的调用关系，即使客户端在使用服务端对象还未准备好或不存在时，代理也可以正常工作。</p></li><li><p>虚拟代理通过延迟加载以及使用小对象代表大对象的方式，帮助减少系统资源的损耗，提升系统运行速度。</p></li><li><p>保护代理可以控制客户端对服务端的访问权限。</p></li><li><p>远程代理帮助客户端快速访问分布式机器上的对象，分布式服务器通常可以提供集群负载均衡、故障容错和高性能的计算能力。</p></li><li><p>日志记录代理能记录每次操作的信息，对于用户使用轨迹跟踪、数据统计、定位问题等都有重要作用。</p></li><li><p>缓存代理能够提供各式各样的缓存结果，对于需要高频读取重复数据的系统来说，能极大地提升系统性能。</p></li></ul><p>而代理模式的缺点有如下几个。</p><ul><li><p>因为在客户端和服务端之间增加了代理对象，所以也增加了系统的复杂度。</p></li><li><p>实现了代理模式的服务，如果处理请求的时间过长，就容易造成多个服务调用阻塞而影响整体系统的处理速度。</p></li><li><p>对于一些偏操作系统或标准协议等底层的代理服务而言，代码实现可能很复杂。</p></li></ul><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>这里我们总结一下代理模式试图解决的问题：</p><ul><li><p>无法直接调用某些对象；</p></li><li><p>耗时的操作；</p></li><li><p>某个接口可能需要外部额外操作，如日志记录、权限管控、重复操作等；</p></li><li><p>一直保存大对象；</p></li><li><p>需要控制访问权限。</p></li></ul><p>对于这些问题，代理模式通过建立一个代理对象，在原始对象的外围来封装这些问题可能引起的代码变化。</p><p>代理模式的原理虽然简单，但是应用却非常广泛，特别是在<strong>中间件领域</strong>随处可见代理模式，比如 Dubbo、gRPC 都是代理模式的优秀实践。</p><p>到此，我们就学习完结构型模式的所有内容了，现在我们来回顾和总结下结构型模式的相关内容。</p><ul><li><p><strong>适配器模式</strong>，实现了不同接口功能之间的转换，为组件的快速复用提供了直接的解决办法。</p></li><li><p><strong>桥接模式</strong>，实现了抽象实体和抽象行为之间的永久绑定，可以理解为在基于已有的构件上设计可能会发生变化的行为。它往往与抽象工厂模式共同用于跨平台设计的场景。</p></li><li><p><strong>组合模式</strong>，用于表达整体和部分的关系，可以忽略单个对象和合成对象之间的差别。它实际采用的是一种树状结构。</p></li><li><p><strong>装饰模式</strong>，与继承不同，通过代理方式实现了接口功能的多态，避免了大量子类的派生。它适用于链状和树状的结构，但容易造成对象与装饰器之间耦合度过高。</p></li><li><p><strong>门面模式</strong>，用于对子系统提供统一的接口。</p></li><li><p><strong>享元模式</strong>，用于解决大对象重复创建损耗资源的问题，通过共享对象池来复用对象。</p></li><li><p><strong>代理模式</strong>，模式的结构与装饰模式非常相似，但侧重点不同，一种是修改对象的行为，另一种是控制访问。</p></li></ul><p>总体来说，这七种结构型模式重点关注的都是对象与对象之间的结构关系，以及如何更好地组合以扩展代码整体结构的灵活性。</p><h3 id="课后思考" tabindex="-1">课后思考 <a class="header-anchor" href="#课后思考" aria-label="Permalink to &quot;课后思考&quot;">​</a></h3><p>学习了代理模式后，你能找出门面模式和代理模式的区别和联系是什么吗？欢迎你在留言区与我分享。</p><p>在下一讲，我会接着与你分享访问者模式的相关内容，记得按时来听课！</p>`,42);function E(y,i,g,d,F,u){const n=p("Image");return l(),o("div",null,[c,e(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/46/48/CioPOWDJxHCAY9xZAABCXltsvGM588.png"}),r])}const h=a(t,[["render",E]]);export{_ as __pageData,h as default};
