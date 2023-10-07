import{_ as l,j as e,o as p,g as o,k as t,h as a,s,Q as c}from"./chunks/framework.4e7d56ce.js";const A=JSON.parse('{"title":"第10讲：ClientCnxn：客户端核心工作类工作原理解析","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/ZooKeeper源码分析与实战_文档/(3140) 第10讲：ClientCnxn：客户端核心工作类工作原理解析.md","filePath":"posts/backEnd/ZooKeeper源码分析与实战_文档/(3140) 第10讲：ClientCnxn：客户端核心工作类工作原理解析.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/ZooKeeper源码分析与实战_文档/(3140) 第10讲：ClientCnxn：客户端核心工作类工作原理解析.md"},E=s("h1",{id:"第10讲-clientcnxn-客户端核心工作类工作原理解析",tabindex:"-1"},[a("第10讲：ClientCnxn：客户端核心工作类工作原理解析 "),s("a",{class:"header-anchor",href:"#第10讲-clientcnxn-客户端核心工作类工作原理解析","aria-label":'Permalink to "第10讲：ClientCnxn：客户端核心工作类工作原理解析"'},"​")],-1),y=s("p",null,"今天我们开始学习客户端核心工作类的工作原理。",-1),i=s("p",null,"上个课时我们学习了会话的底层实现过程，我们知道会话是在 ZooKeeper 的客户端发起的，而在会话超异常等事件发生时，服务端也会通知给客户端。而我们之所以能够接收到服务端的通知，并向服务端发送请求等操作，是通过 ZooKeeper 客户端实现的。下面我们就深入学习一下客户端核心工作类的实现过程和底层原理。",-1),d=s("h3",{id:"客户端核心类",tabindex:"-1"},[a("客户端核心类 "),s("a",{class:"header-anchor",href:"#客户端核心类","aria-label":'Permalink to "客户端核心类"'},"​")],-1),u=s("p",null,"在 ZooKeeper 客户端的底层实现中，ClientCnxn 类是其核心类，所有的客户端操作都是围绕这个类进行的。ClientCnxn 类主要负责维护客户端与服务端的网络连接和信息交互。",-1),h=s("p",null,"在前面的课程中介绍过，向服务端发送创建数据节点或者添加 Watch 监控等操作时，都会先将请求信息封装成 Packet 对象。那么 Packet 是什么呢？其实** Packet 可以看作是一个 ZooKeeper 定义的，用来进行网络通信的数据结构**，其主要作用是封装了网络通信协议层的数据。而 Packet 内部的数据结构如下图所示：",-1),F=c(`<p>在 Packet 类中具有一些请求协议的相关属性字段，这些请求字段中分别包括：</p><ul><li>请求头信息（RequestHeader）</li><li>响应头信息 （ReplyHeader）</li><li>请求信息体（Request）</li><li>响应信息体（Response）</li><li>节点路径（clientPath ServerPath）</li><li>Watch 监控信息等</li></ul><p>而在 Packet 类中有一个 createBB 方法函数，该函数的作用主要是将 Packet 对象的数据进行序列化，以便之后用于网络传输。具体过程如下面这段代码所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createBB</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;"> ByteArrayOutputStream baos </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ByteArrayOutputStream</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;"> BinaryOutputArchive boa </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> BinaryOutputArchive.</span><span style="color:#B392F0;">getArchive</span><span style="color:#E1E4E8;">(baos);</span></span>
<span class="line"><span style="color:#E1E4E8;">...</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (requestHeader </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">     requestHeader.</span><span style="color:#B392F0;">serialize</span><span style="color:#E1E4E8;">(boa, </span><span style="color:#9ECBFF;">&quot;header&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;"> }</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (request </span><span style="color:#F97583;">instanceof</span><span style="color:#E1E4E8;"> ConnectRequest) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    request.</span><span style="color:#B392F0;">serialize</span><span style="color:#E1E4E8;">(boa, </span><span style="color:#9ECBFF;">&quot;connect&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// append &quot;am-I-allowed-to-be-readonly&quot; flag</span></span>
<span class="line"><span style="color:#E1E4E8;">    boa.</span><span style="color:#B392F0;">writeBool</span><span style="color:#E1E4E8;">(readOnly, </span><span style="color:#9ECBFF;">&quot;readOnly&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (request </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    request.</span><span style="color:#B392F0;">serialize</span><span style="color:#E1E4E8;">(boa, </span><span style="color:#9ECBFF;">&quot;request&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;"> }</span></span>
<span class="line"><span style="color:#E1E4E8;"> baos.</span><span style="color:#B392F0;">close</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createBB</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;"> ByteArrayOutputStream baos </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ByteArrayOutputStream</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;"> BinaryOutputArchive boa </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> BinaryOutputArchive.</span><span style="color:#6F42C1;">getArchive</span><span style="color:#24292E;">(baos);</span></span>
<span class="line"><span style="color:#24292E;">...</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (requestHeader </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">     requestHeader.</span><span style="color:#6F42C1;">serialize</span><span style="color:#24292E;">(boa, </span><span style="color:#032F62;">&quot;header&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;"> }</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (request </span><span style="color:#D73A49;">instanceof</span><span style="color:#24292E;"> ConnectRequest) {</span></span>
<span class="line"><span style="color:#24292E;">    request.</span><span style="color:#6F42C1;">serialize</span><span style="color:#24292E;">(boa, </span><span style="color:#032F62;">&quot;connect&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// append &quot;am-I-allowed-to-be-readonly&quot; flag</span></span>
<span class="line"><span style="color:#24292E;">    boa.</span><span style="color:#6F42C1;">writeBool</span><span style="color:#24292E;">(readOnly, </span><span style="color:#032F62;">&quot;readOnly&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;"> } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (request </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    request.</span><span style="color:#6F42C1;">serialize</span><span style="color:#24292E;">(boa, </span><span style="color:#032F62;">&quot;request&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;"> }</span></span>
<span class="line"><span style="color:#24292E;"> baos.</span><span style="color:#6F42C1;">close</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>从代码中我们可以知道，在 createBB 进行序列化的时候，并不是将 Packet 类中的所有属性字段进行序列化。而是只对请求头信息（requestHeader）、请求体信息（request）、只读（readOnly）这三个属性字段进行序列化。而其余的属性字段则只是存储在客户端，用于之后的相关操作。</p><h3 id="请求队列" tabindex="-1">请求队列 <a class="header-anchor" href="#请求队列" aria-label="Permalink to &quot;请求队列&quot;">​</a></h3><p>在我们对请求信息进行封装和序列化后，ZooKeeper 不会立刻就将一个请求信息通过网络直接发送给服务端。而是通过将请求信息添加到队列中，之后通过 sendThread 线程类来处理相关的请求发送等操作。这种方式很像生产者和消费者模式，我们将请求信息准备好，并添加到队列中的操作相当于生成者，而 sendThread 线程从队列中取出要发送的请求信息，并发送给服务端相当于消费者操作。</p><p>而在 ZooKeeper 中，作为消费者的队列有两种，一种是客户端发送给服务端的发送队列 outgoingQueue 以及服务端响应客户端操作的响应队列 pendingQueue。如下面这段代码：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"> List&lt;</span><span style="color:#F97583;">Packet</span><span style="color:#E1E4E8;">&gt; pendingQueue;</span><span style="color:#6A737D;">//响应队列</span></span>
<span class="line"><span style="color:#E1E4E8;"> LinkedBlockingDeque&lt;</span><span style="color:#F97583;">Packet</span><span style="color:#E1E4E8;">&gt; outgoingQueue;</span><span style="color:#6A737D;">//发送队列</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"> List&lt;</span><span style="color:#D73A49;">Packet</span><span style="color:#24292E;">&gt; pendingQueue;</span><span style="color:#6A737D;">//响应队列</span></span>
<span class="line"><span style="color:#24292E;"> LinkedBlockingDeque&lt;</span><span style="color:#D73A49;">Packet</span><span style="color:#24292E;">&gt; outgoingQueue;</span><span style="color:#6A737D;">//发送队列</span></span></code></pre></div><h3 id="sendthread" tabindex="-1">SendThread <a class="header-anchor" href="#sendthread" aria-label="Permalink to &quot;SendThread&quot;">​</a></h3><p>下面我们再看一下 SendThread 的底层实现，SendThread 类是一个线程类，其本质是一个 I/O 调度线程，它的作用就是用来管理操作客户端和服务端的网络 I/O 等。在 ZooKeeper 服务的运行过程中，SendThread 类的作用除了上面提到的负责将客户端的请求发送给服务端外，另一个作用是发送客户端是否存活的心跳检查，SendThread 类负责定期向服务端发送 PING 包来实现心跳检查。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">sendPing</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    lastPingSentNs </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> System.</span><span style="color:#B392F0;">nanoTime</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    RequestHeader h </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">RequestHeader</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">, OpCode.ping);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">queuePacket</span><span style="color:#E1E4E8;">(h, </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">sendPing</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    lastPingSentNs </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> System.</span><span style="color:#6F42C1;">nanoTime</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    RequestHeader h </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">RequestHeader</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">2</span><span style="color:#24292E;">, OpCode.ping);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">queuePacket</span><span style="color:#24292E;">(h, </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>如上面的代码所示，SendThread 类中通过 sendPing 函数向 ZooKeeper 服务端发送心跳检查。而在 sendPing 函数的内部，首先以纳秒为单位获取系统当前时间 lastPingSentNs，之后设置请求头的操作类型为心跳检查操作 OpCode.ping，最后将请求信息封装成 Packet 对象发送给 ZooKeeper 服务端。</p><h3 id="eventthread" tabindex="-1">EventThread <a class="header-anchor" href="#eventthread" aria-label="Permalink to &quot;EventThread&quot;">​</a></h3><p>SendThread 类的主要工作可以简单地理解为负责客户端向服务端发送请求等操作。而像我们之前学到的 Watch 监控机制，在事件触发后 ZooKeeper 服务端会发送通知给相关的客户端，那么在这个过程中，客户端是如何接收服务端的请求的呢？</p><p>ZooKeeper 是通过 EventThread 类来实现的，EventThread 类也是一个线程类，主要负责客户端的事件处理，比如在客户端接收 Watch 通知时，触发客户端的相关方法。在 EventThread 类中，如下面的代码所示，通过将要触发的事件对象存放在 waitingEvents 队列中，之后在接收到相应的事件通知时，会从该队列中取出对应的事件信息，之后调用 process 函数进行处理。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">EventThread</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ZooKeeperThread</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> LinkedBlockingQueue&lt;</span><span style="color:#F97583;">Object</span><span style="color:#E1E4E8;">&gt; waitingEvents</span></span>
<span class="line"><span style="color:#E1E4E8;">  ...</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">process</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  ...</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">EventThread</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ZooKeeperThread</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> LinkedBlockingQueue&lt;</span><span style="color:#D73A49;">Object</span><span style="color:#24292E;">&gt; waitingEvents</span></span>
<span class="line"><span style="color:#24292E;">  ...</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">process</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  ...</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="结束" tabindex="-1">结束 <a class="header-anchor" href="#结束" aria-label="Permalink to &quot;结束&quot;">​</a></h3><p>通过本节课的学习，我们掌握了客户端核心类的工作原理，在客户端的底层实现中，ClientCnxn 类作为其最核心的实现类，当客户端要向服务端发送请求操作的时候，首先会将请求信息封装成 Packet 对象并加入请求队列中，之后通过 SendThread 网络 I/O 线将请求发送给服务端。</p><p>而在接收服务端响应时，客户端使用 EventThread 类处理接收响应事件以及触发客户端的回调方法。</p><p>这里留给你一道思考题：我们知道为了向服务端证明客户端是存活的，需要 ZooKeeper 客户端周期性的发送 Ping 操作给 ZooKeeper 服务端。而在 ZooKeeper 服务端收到 Ping 操作后，又做了什么操作呢？</p><p>答案是在 ZooKeeper 服务端收到 Ping 操作的请求时，会根据服务端的当前时间重置与客户端的 Session 时间，更新该会话的请求延迟时间等。进而保持客户端与服务端连接状态。</p>`,22);function C(g,_,v,q,B,b){const n=e("Image");return p(),o("div",null,[E,y,i,d,u,h,t(n,{alt:"image.png",src:"https://s0.lgstatic.com/i/image/M00/19/3A/CgqCHl7aDQyAEkoJAAB9K_a8-pA768.png"}),a(),F])}const P=l(r,[["render",C]]);export{A as __pageData,P as default};
