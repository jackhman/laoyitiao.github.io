import{_ as o,j as e,o as c,h as t,k as p,f as n,s,Q as l}from"./chunks/framework.d3daa342.js";const R=JSON.parse('{"title":"20消息消费：如何选择可用的高级开发技巧？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring 响应式编程实战_文档/(7002) 20  消息消费：如何选择可用的高级开发技巧？.md","filePath":"posts/backEnd/Spring 响应式编程实战_文档/(7002) 20  消息消费：如何选择可用的高级开发技巧？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/Spring 响应式编程实战_文档/(7002) 20  消息消费：如何选择可用的高级开发技巧？.md"},i=s("h1",{id:"_20消息消费-如何选择可用的高级开发技巧",tabindex:"-1"},[n("20消息消费：如何选择可用的高级开发技巧？ "),s("a",{class:"header-anchor",href:"#_20消息消费-如何选择可用的高级开发技巧","aria-label":'Permalink to "20消息消费：如何选择可用的高级开发技巧？"'},"​")],-1),E=s("p",null,"在上一讲中，我们讨论了 ReactiveSpringCSS 案例中基于 Reactive Spring Cloud Stream 的消息发布场景以及实现方式。今天我将延续上一讲的内容，为你介绍消息消费的应用场景，具体讲解如何在服务中添加消息消费者，以及使用各项消息消费的高级开发技巧。",-1),y=s("h3",{id:"案例集成-reactivespringcss-中的消息消费场景",tabindex:"-1"},[n("案例集成：ReactiveSpringCSS 中的消息消费场景 "),s("a",{class:"header-anchor",href:"#案例集成-reactivespringcss-中的消息消费场景","aria-label":'Permalink to "案例集成：ReactiveSpringCSS 中的消息消费场景"'},"​")],-1),u=s("p",null,"我们继续讨论 ReactiveSpringCSS 案例，根据整个消息交互流程，customer-service 就是 AccountChangedEvent 事件的消费者。根据上一讲讨论的交互流程，customer-service 需要把变更后的用户账户信息更新到 Redis 缓存中。",-1),d=s("p",null,"在 Spring Cloud Stream 中，负责消费消息的是 Sink 组件。因此，我们同样围绕 AccountChangedEvent 事件研究 customer -service 内部的整个实现流程，如下图所示。",-1),g=s("p",null,"customer-service 消息消费实现流程图",-1),h=s("p",null,"在上图中，AccountChangedEvent 事件通过消息中间件发送到 Reactive Spring Cloud Stream 中，Reactive Spring Cloud Stream 通过 Sink 获取消息并交由 ReactiveAccountChangedSink 实现具体的消费逻辑。结合前面提到的消息消费场景下的缓存处理需求，可以想象这个 ReactiveAccountChangedSink 会负责实现缓存相关的处理逻辑。",-1),C=s("p",null,'让我们把消息消费过程与 customer-service 中的业务流程串联起来。我们知道在 customer-service 中存在 ReactiveAccountClient 类，它通过判断缓存中是否存储目标用户账户对象来决定是否需要发起远程调用。我们已经在"16 | Redis 集成：如何实现对 Redis 的响应式数据访问"中构建了 Redis 缓存服务和 ReactiveAccountClient，你可以回顾一下。',-1),b=s("p",null,"下图展示了采用这一设计思想之后的流程。",-1),m=l(`<p>用户账户更新流程图</p><p>在上图中，我们看到 account-service 异步发送的 AccountChangedEvent 事件会被 ReactiveAccountChangedSink 所消费，然后 ReactiveAccountChangedSink 将更新后的用户账户信息存储到缓存以供 customer-service 使用。显然，ReactiveAccountChangedSink 是整个流程的关键。如何实现这个 Sink，就是这一讲的主要内容。</p><h3 id="构建响应式-sink-组件" tabindex="-1">构建响应式 Sink 组件 <a class="header-anchor" href="#构建响应式-sink-组件" aria-label="Permalink to &quot;构建响应式 Sink 组件&quot;">​</a></h3><p>针对消费者组件，我们采用和消息发布者相同的方式进行实现。首先要说的还是使用 @EnableBinding 注解来初始化消息消费者。</p><h4 id="使用-enablebinding-注解" tabindex="-1">使用 @EnableBinding 注解 <a class="header-anchor" href="#使用-enablebinding-注解" aria-label="Permalink to &quot;使用 @EnableBinding 注解&quot;">​</a></h4><p>与初始化消息发布环境一样，我们同样需要在 customer-service 中引入 spring-cloud-stream、spring-cloud-stream-reactive 以及 spring-cloud-starter-stream-rabbit 这几个 Maven 依赖，并构建 Bootstrap 类。customer-service 中的 Bootstrap 类是 CustomerApplication，其代码如下所示。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">SpringCloudApplication</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">EnableBinding</span><span style="color:#E1E4E8;">(Sink.class)</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">CustomerApplication</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        SpringApplication.</span><span style="color:#B392F0;">run</span><span style="color:#E1E4E8;">(CustomerApplication.class, args);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">SpringCloudApplication</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">EnableBinding</span><span style="color:#24292E;">(Sink.class)</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">CustomerApplication</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        SpringApplication.</span><span style="color:#6F42C1;">run</span><span style="color:#24292E;">(CustomerApplication.class, args);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>显然，对于作为消息消费者的 Bootstrap 类而言，@EnableBinding 注解所绑定的应该是 Sink 接口。那么接下来就到了创建 Sink 这一步。</p><h4 id="创建-sink" tabindex="-1">创建 Sink <a class="header-anchor" href="#创建-sink" aria-label="Permalink to &quot;创建 Sink&quot;">​</a></h4><p>在这个过程中，AccountChangedSink 负责处理具体的消息消费逻辑，代码如下所示。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.cloud.stream.annotation.EnableBinding;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.cloud.stream.annotation.StreamListener; </span></span>
<span class="line"><span style="color:#E1E4E8;">...</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">EnableBinding</span><span style="color:#E1E4E8;">(Input.class)</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ReactiveAccountChangedSink</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Autowired</span></span>
<span class="line"><span style="color:#E1E4E8;">    AccountRedisRepository accountRedisRepository;</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">StreamListener</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;input&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">handleAccountChangedEvent</span><span style="color:#E1E4E8;">(AccountChangedEvent </span><span style="color:#FFAB70;">accountChangedEvent</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span></span>
<span class="line"><span style="color:#E1E4E8;">     AccountMessage accountMessage </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> accountChangedEvent.</span><span style="color:#B392F0;">getAccountMessage</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">     AccountMapper accountMapper </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AccountMapper</span><span style="color:#E1E4E8;">(accountMessage.</span><span style="color:#B392F0;">getId</span><span style="color:#E1E4E8;">(), </span></span>
<span class="line"><span style="color:#E1E4E8;">                    accountMessage.</span><span style="color:#B392F0;">getAccountCode</span><span style="color:#E1E4E8;">(), </span></span>
<span class="line"><span style="color:#E1E4E8;">                    accountMessage.</span><span style="color:#B392F0;">getAccountName</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(accountChangedEvent.</span><span style="color:#B392F0;">getOperation</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">equals</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;UPDATE&quot;</span><span style="color:#E1E4E8;">)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            accountRedisRepository.</span><span style="color:#B392F0;">updateAccount</span><span style="color:#E1E4E8;">(accountMapper).</span><span style="color:#B392F0;">subscribe</span><span style="color:#E1E4E8;">();            </span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(accountChangedEvent.</span><span style="color:#B392F0;">getOperation</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">equals</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;DELETE&quot;</span><span style="color:#E1E4E8;">)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">         accountRedisRepository.</span><span style="color:#B392F0;">deleteAccount</span><span style="color:#E1E4E8;">(accountMapper.</span><span style="color:#B392F0;">getId</span><span style="color:#E1E4E8;">()).</span><span style="color:#B392F0;">subscribe</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {   </span></span>
<span class="line"><span style="color:#E1E4E8;">            logger.</span><span style="color:#B392F0;">error</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;The operations {} is undefined &quot;</span><span style="color:#E1E4E8;">, accountChangedEvent.</span><span style="color:#B392F0;">getOperation</span><span style="color:#E1E4E8;">());        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.cloud.stream.annotation.EnableBinding;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.cloud.stream.annotation.StreamListener; </span></span>
<span class="line"><span style="color:#24292E;">...</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">EnableBinding</span><span style="color:#24292E;">(Input.class)</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ReactiveAccountChangedSink</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Autowired</span></span>
<span class="line"><span style="color:#24292E;">    AccountRedisRepository accountRedisRepository;</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">StreamListener</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;input&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">handleAccountChangedEvent</span><span style="color:#24292E;">(AccountChangedEvent </span><span style="color:#E36209;">accountChangedEvent</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">     </span></span>
<span class="line"><span style="color:#24292E;">     AccountMessage accountMessage </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> accountChangedEvent.</span><span style="color:#6F42C1;">getAccountMessage</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">     AccountMapper accountMapper </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AccountMapper</span><span style="color:#24292E;">(accountMessage.</span><span style="color:#6F42C1;">getId</span><span style="color:#24292E;">(), </span></span>
<span class="line"><span style="color:#24292E;">                    accountMessage.</span><span style="color:#6F42C1;">getAccountCode</span><span style="color:#24292E;">(), </span></span>
<span class="line"><span style="color:#24292E;">                    accountMessage.</span><span style="color:#6F42C1;">getAccountName</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">     </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(accountChangedEvent.</span><span style="color:#6F42C1;">getOperation</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">equals</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;UPDATE&quot;</span><span style="color:#24292E;">)) {</span></span>
<span class="line"><span style="color:#24292E;">            accountRedisRepository.</span><span style="color:#6F42C1;">updateAccount</span><span style="color:#24292E;">(accountMapper).</span><span style="color:#6F42C1;">subscribe</span><span style="color:#24292E;">();            </span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(accountChangedEvent.</span><span style="color:#6F42C1;">getOperation</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">equals</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;DELETE&quot;</span><span style="color:#24292E;">)) {</span></span>
<span class="line"><span style="color:#24292E;">         accountRedisRepository.</span><span style="color:#6F42C1;">deleteAccount</span><span style="color:#24292E;">(accountMapper.</span><span style="color:#6F42C1;">getId</span><span style="color:#24292E;">()).</span><span style="color:#6F42C1;">subscribe</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {   </span></span>
<span class="line"><span style="color:#24292E;">            logger.</span><span style="color:#6F42C1;">error</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;The operations {} is undefined &quot;</span><span style="color:#24292E;">, accountChangedEvent.</span><span style="color:#6F42C1;">getOperation</span><span style="color:#24292E;">());        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这里使用了 @StreamListener 注解，将该注解添加到某个方法上就可以使之接收处理流中的事件。在上面的例子中，@StreamListener 注解添加在了 handleAccountChangedEvent() 方法上并指向了&quot;input&quot;通道，这意味着所有流经&quot;input&quot;通道的消息都会交由这个 handleAccountChangedEvent() 方法进行处理。</p><p>而在 handleAccountChangedEvent() 方法中，我们调用了 Redis 集成那一讲中构建的 AccountRedisRepository 类来完成各种缓存相关的处理。</p><h4 id="配置-binder" tabindex="-1">配置 Binder <a class="header-anchor" href="#配置-binder" aria-label="Permalink to &quot;配置 Binder&quot;">​</a></h4><p>对于消息消费者而言，配置 Binder 的方式和消息发布者非常类似。如果使用默认的消息通道，我们只需要把用于发送的&quot;output&quot;通道改为接收的&quot;input&quot;通道就可以了，代码如下所示。</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">spring:</span></span>
<span class="line"><span style="color:#E1E4E8;">  cloud:</span></span>
<span class="line"><span style="color:#E1E4E8;">    stream:</span></span>
<span class="line"><span style="color:#E1E4E8;">      bindings:</span></span>
<span class="line"><span style="color:#E1E4E8;">        default:</span></span>
<span class="line"><span style="color:#E1E4E8;">          content-type: application/json</span></span>
<span class="line"><span style="color:#E1E4E8;">          binder: rabbitmq</span></span>
<span class="line"><span style="color:#E1E4E8;">        input:</span></span>
<span class="line"><span style="color:#E1E4E8;">          destination: account-destination</span></span>
<span class="line"><span style="color:#E1E4E8;">      binders:</span></span>
<span class="line"><span style="color:#E1E4E8;">        rabbitmq:</span></span>
<span class="line"><span style="color:#E1E4E8;">          type: rabbit</span></span>
<span class="line"><span style="color:#E1E4E8;">          environment:</span></span>
<span class="line"><span style="color:#E1E4E8;">            spring:</span></span>
<span class="line"><span style="color:#E1E4E8;">              rabbitmq:</span></span>
<span class="line"><span style="color:#E1E4E8;">                host: 127.0.0.1</span></span>
<span class="line"><span style="color:#E1E4E8;">                port: 5672</span></span>
<span class="line"><span style="color:#E1E4E8;">                username: guest</span></span>
<span class="line"><span style="color:#E1E4E8;">                password: guest</span></span>
<span class="line"><span style="color:#E1E4E8;">                virtual-host: /</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">spring:</span></span>
<span class="line"><span style="color:#24292E;">  cloud:</span></span>
<span class="line"><span style="color:#24292E;">    stream:</span></span>
<span class="line"><span style="color:#24292E;">      bindings:</span></span>
<span class="line"><span style="color:#24292E;">        default:</span></span>
<span class="line"><span style="color:#24292E;">          content-type: application/json</span></span>
<span class="line"><span style="color:#24292E;">          binder: rabbitmq</span></span>
<span class="line"><span style="color:#24292E;">        input:</span></span>
<span class="line"><span style="color:#24292E;">          destination: account-destination</span></span>
<span class="line"><span style="color:#24292E;">      binders:</span></span>
<span class="line"><span style="color:#24292E;">        rabbitmq:</span></span>
<span class="line"><span style="color:#24292E;">          type: rabbit</span></span>
<span class="line"><span style="color:#24292E;">          environment:</span></span>
<span class="line"><span style="color:#24292E;">            spring:</span></span>
<span class="line"><span style="color:#24292E;">              rabbitmq:</span></span>
<span class="line"><span style="color:#24292E;">                host: 127.0.0.1</span></span>
<span class="line"><span style="color:#24292E;">                port: 5672</span></span>
<span class="line"><span style="color:#24292E;">                username: guest</span></span>
<span class="line"><span style="color:#24292E;">                password: guest</span></span>
<span class="line"><span style="color:#24292E;">                virtual-host: /</span></span></code></pre></div><p>到这里，关于如何构建响应式 Sink 组件的实现过程就介绍完毕了。Sink 组件和上一讲介绍的Source 组件构成一组对应关系，所以配置上比较类似。你可以结合上一讲内容做一些类比。</p><h3 id="reactive-spring-cloud-stream-高级开发技巧" tabindex="-1">Reactive Spring Cloud Stream 高级开发技巧 <a class="header-anchor" href="#reactive-spring-cloud-stream-高级开发技巧" aria-label="Permalink to &quot;Reactive Spring Cloud Stream 高级开发技巧&quot;">​</a></h3><p>在分别介绍完消息发布者和消费者的基本实现过程之后，我们将在此基础上讨论 Reactive Spring Cloud Stream 的高级主题，包括自定义消息通道、使用消费者组以及消息分区。</p><h4 id="自定义消息通道" tabindex="-1">自定义消息通道 <a class="header-anchor" href="#自定义消息通道" aria-label="Permalink to &quot;自定义消息通道&quot;">​</a></h4><p>在前面的示例中，无论是消息发布还是消息消费，我们都使用了 Spring Cloud Stream 中默认提供的通道名&quot;output&quot;和&quot;input&quot;。显然，在有些场景下，为了更好地管理系统中存在的所有通道，为通道进行命名是一项最佳实践，这点对于消息消费的场景尤为重要。在接下来的内容中，针对消息消费的场景，我们将不再使用 Sink 组件默认提供的&quot;input&quot;通道，而是尝试通过自定义通道的方式来实现消息消费。</p><p>在 Spring Cloud Stream 中，实现一个面向消息消费场景的自定义通道的方法也非常简单，只需要定义一个新的接口，并在该接口中通过 @Input 注解声明一个新的 Channel 即可。例如我们可以定义一个新的 AccountChangedChannel 接口，然后通过 @Input 注解就可以声明一个&quot;accountChangedChannel&quot;通道，代码如下所示。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.cloud.stream.annotation.Input;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.messaging.SubscribableChannel;</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AccountChangedChannel</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    String ACCOUNT_CHANGED </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;accountChangedChannel&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Input</span><span style="color:#E1E4E8;">(AccountChangedChannel.ACCOUNT_CHANGED)</span></span>
<span class="line"><span style="color:#E1E4E8;">    SubscribableChannel </span><span style="color:#B392F0;">accountChangedChannel</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.cloud.stream.annotation.Input;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.messaging.SubscribableChannel;</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AccountChangedChannel</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    String ACCOUNT_CHANGED </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;accountChangedChannel&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Input</span><span style="color:#24292E;">(AccountChangedChannel.ACCOUNT_CHANGED)</span></span>
<span class="line"><span style="color:#24292E;">    SubscribableChannel </span><span style="color:#6F42C1;">accountChangedChannel</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>注意到该通道的类型为 Spring Messaging 中用于消费消息的 SubscribableChannel。同时，我们也注意到这个 AccountChangedChannel 的代码风格与 Spring Cloud Stream 自带的 Sink 接口完全一致。作为回顾，这里我们再看看 Sink 接口的定义，如下所示。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.cloud.stream.annotation.Input;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.messaging.SubscribableChannel;</span></span>
<span class="line"><span style="color:#E1E4E8;">	 </span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Sink</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    String INPUT </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;input&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Input</span><span style="color:#E1E4E8;">(Sink.INPUT)</span></span>
<span class="line"><span style="color:#E1E4E8;">    SubscribableChannel </span><span style="color:#B392F0;">input</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.cloud.stream.annotation.Input;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.messaging.SubscribableChannel;</span></span>
<span class="line"><span style="color:#24292E;">	 </span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Sink</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    String INPUT </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;input&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Input</span><span style="color:#24292E;">(Sink.INPUT)</span></span>
<span class="line"><span style="color:#24292E;">    SubscribableChannel </span><span style="color:#6F42C1;">input</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>当我们完成了自定义的消息通信之后，就可以在 @StreamListener 注解中设置这个通道。以前面介绍的 AccountChangedSink 为例，添加了自定义通道之后的代码重构如下。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">EnableBinding</span><span style="color:#E1E4E8;">(AccountChangedChannel.class)</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ReactiveAccountChangedSink</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">StreamListener</span><span style="color:#E1E4E8;">(AccountChangedChannel.ACCOUNT_CHANGED)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">handleAccountChangedEvent</span><span style="color:#E1E4E8;">(AccountChangedEvent </span><span style="color:#FFAB70;">accountChangedEvent</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	     ...</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">EnableBinding</span><span style="color:#24292E;">(AccountChangedChannel.class)</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ReactiveAccountChangedSink</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">StreamListener</span><span style="color:#24292E;">(AccountChangedChannel.ACCOUNT_CHANGED)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">handleAccountChangedEvent</span><span style="color:#24292E;">(AccountChangedEvent </span><span style="color:#E36209;">accountChangedEvent</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">	     ...</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>可以看到，这里我们继续使用 @EnableBinding 注解绑定了自定义的 AccountChangedChannel。因为 AccountChangedChannel 中通过 @Input 注解提供了&quot;accountChangedChannel&quot;通道，所以这种用法实际上和 @EnableBinding(Sink.class) 是完全一致的。因此，对于 Binder 的配置而言，我们要做的也只是调整通道的名称就可以了，重构后的 Binder 配置信息如下所示。</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">spring:</span></span>
<span class="line"><span style="color:#E1E4E8;">  cloud:</span></span>
<span class="line"><span style="color:#E1E4E8;">    stream:</span></span>
<span class="line"><span style="color:#E1E4E8;">      bindings:</span></span>
<span class="line"><span style="color:#E1E4E8;">        default:</span></span>
<span class="line"><span style="color:#E1E4E8;">          content-type: application/json</span></span>
<span class="line"><span style="color:#E1E4E8;">          binder: rabbitmq</span></span>
<span class="line"><span style="color:#E1E4E8;">        accountChangedChannel:</span></span>
<span class="line"><span style="color:#E1E4E8;">          destination: account-destination</span></span>
<span class="line"><span style="color:#E1E4E8;">      binders:</span></span>
<span class="line"><span style="color:#E1E4E8;">      ...</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">spring:</span></span>
<span class="line"><span style="color:#24292E;">  cloud:</span></span>
<span class="line"><span style="color:#24292E;">    stream:</span></span>
<span class="line"><span style="color:#24292E;">      bindings:</span></span>
<span class="line"><span style="color:#24292E;">        default:</span></span>
<span class="line"><span style="color:#24292E;">          content-type: application/json</span></span>
<span class="line"><span style="color:#24292E;">          binder: rabbitmq</span></span>
<span class="line"><span style="color:#24292E;">        accountChangedChannel:</span></span>
<span class="line"><span style="color:#24292E;">          destination: account-destination</span></span>
<span class="line"><span style="color:#24292E;">      binders:</span></span>
<span class="line"><span style="color:#24292E;">      ...</span></span></code></pre></div><p>对于自定义消息通道而言，我们需要注意的是如何合理规划和设计这些通道的名称。在一个系统中，通常会存在很多自定义通道且这些通道会分散在各个代码工程中。这个时候，按照模块作为前缀来命名通道是一项最佳实践。以案例中的场景为例，如果 account-service 中需要提供多个自定义通道，那么就可以采用类似&quot;account_accountChangedChannel&quot;&quot;account_XXXChannel&quot;这样的命名方式进行统一的管理。</p><h4 id="使用消费者分组" tabindex="-1">使用消费者分组 <a class="header-anchor" href="#使用消费者分组" aria-label="Permalink to &quot;使用消费者分组&quot;">​</a></h4><p>在分布式服务架构中，服务多实例部署的场景非常常见。在集群环境下，我们希望服务的不同实例被放置在竞争的消费者关系中，同一服务集群中只有一个实例能够处理给定消息。Spring Cloud Stream 提供的消费者分组可以很方便地实现这一需求，效果图如下所示。</p>`,32),v=l(`<p>customer-service 消息分组效果示意图</p><p>上图中，两个 customer-service 实例构成了一个 customerGroup。在这个 customerGroup 中，AccountChangedEvent 事件只会被一个 customer-service 实例所消费。</p><p>要想实现上图所示的消息消费效果，我们唯一要做的事情也是重构 Binder 配置，即在配置 Binder 时指定消费者分组信息即可，如下所示。</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">spring:</span></span>
<span class="line"><span style="color:#E1E4E8;">  cloud:</span></span>
<span class="line"><span style="color:#E1E4E8;">    stream:</span></span>
<span class="line"><span style="color:#E1E4E8;">      bindings:</span></span>
<span class="line"><span style="color:#E1E4E8;">        default:</span></span>
<span class="line"><span style="color:#E1E4E8;">          content-type: application/json</span></span>
<span class="line"><span style="color:#E1E4E8;">          binder: rabbitmq</span></span>
<span class="line"><span style="color:#E1E4E8;">        accountChangedChannel:</span></span>
<span class="line"><span style="color:#E1E4E8;">          destination: account-destination</span></span>
<span class="line"><span style="color:#E1E4E8;">	      group: customerGroup</span></span>
<span class="line"><span style="color:#E1E4E8;">      binders:</span></span>
<span class="line"><span style="color:#E1E4E8;">      ...</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">spring:</span></span>
<span class="line"><span style="color:#24292E;">  cloud:</span></span>
<span class="line"><span style="color:#24292E;">    stream:</span></span>
<span class="line"><span style="color:#24292E;">      bindings:</span></span>
<span class="line"><span style="color:#24292E;">        default:</span></span>
<span class="line"><span style="color:#24292E;">          content-type: application/json</span></span>
<span class="line"><span style="color:#24292E;">          binder: rabbitmq</span></span>
<span class="line"><span style="color:#24292E;">        accountChangedChannel:</span></span>
<span class="line"><span style="color:#24292E;">          destination: account-destination</span></span>
<span class="line"><span style="color:#24292E;">	      group: customerGroup</span></span>
<span class="line"><span style="color:#24292E;">      binders:</span></span>
<span class="line"><span style="color:#24292E;">      ...</span></span></code></pre></div><p>以上基于 RabbitMQ 的配置信息中，我们关注&quot;bindings&quot;段中的通道名称使用了自定义的&quot;accountChangedChannel&quot;，并且在该配置项中设置了&quot;group&quot;为&quot;customerGroup&quot;。</p><p>请注意，在分布式环境下，对于 RabbitMQ 等消息中间件而言，使用消费者分组与其说是一个可选性，倒不如说是一个必选项。因为只有采用消费者分组才能确保在集群环境下消息得到正确的消费。所以，在日常应用过程中，通常都建议你使用这项开发技巧。</p><h4 id="使用消息分区" tabindex="-1">使用消息分区 <a class="header-anchor" href="#使用消息分区" aria-label="Permalink to &quot;使用消息分区&quot;">​</a></h4><p>最后一项 Spring Cloud Stream 使用上的高级主题是使用消费分区。同样在集群环境下，假设存在两个 customer-service 实例，我们希望用户账户信息中 id 以数字结尾的 AccountChangedEvent 始终由第一个 customer-service 实例进行消费，而 id 以字母结尾的AccountChangedEvent 则始终由第二个 customer-service 实例进行消费。基于类似这样的需求，我们就可以构建消息分区，如下所示。</p>`,8),A=l(`<p>customer-service 消息分区效果示意图</p><p>要想实现上图所示的消息消费效果，我们唯一要做的事情还是重构 account-service 中 Binder 配置，如下所示。</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">spring:</span></span>
<span class="line"><span style="color:#E1E4E8;">  cloud:</span></span>
<span class="line"><span style="color:#E1E4E8;">    stream:</span></span>
<span class="line"><span style="color:#E1E4E8;">      bindings:</span></span>
<span class="line"><span style="color:#E1E4E8;">        default:</span></span>
<span class="line"><span style="color:#E1E4E8;">          content-type: application/json</span></span>
<span class="line"><span style="color:#E1E4E8;">          binder: rabbitmq</span></span>
<span class="line"><span style="color:#E1E4E8;">        output:</span></span>
<span class="line"><span style="color:#E1E4E8;">          destination: account-destination</span></span>
<span class="line"><span style="color:#E1E4E8;">          group: customerGroup</span></span>
<span class="line"><span style="color:#E1E4E8;">          producer:</span></span>
<span class="line"><span style="color:#E1E4E8;">            partitionKeyExpression: payload.accountMessage.isEndWithDigit()</span></span>
<span class="line"><span style="color:#E1E4E8;">            partitionCount: 2</span></span>
<span class="line"><span style="color:#E1E4E8;">      binders:</span></span>
<span class="line"><span style="color:#E1E4E8;">      ...</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">spring:</span></span>
<span class="line"><span style="color:#24292E;">  cloud:</span></span>
<span class="line"><span style="color:#24292E;">    stream:</span></span>
<span class="line"><span style="color:#24292E;">      bindings:</span></span>
<span class="line"><span style="color:#24292E;">        default:</span></span>
<span class="line"><span style="color:#24292E;">          content-type: application/json</span></span>
<span class="line"><span style="color:#24292E;">          binder: rabbitmq</span></span>
<span class="line"><span style="color:#24292E;">        output:</span></span>
<span class="line"><span style="color:#24292E;">          destination: account-destination</span></span>
<span class="line"><span style="color:#24292E;">          group: customerGroup</span></span>
<span class="line"><span style="color:#24292E;">          producer:</span></span>
<span class="line"><span style="color:#24292E;">            partitionKeyExpression: payload.accountMessage.isEndWithDigit()</span></span>
<span class="line"><span style="color:#24292E;">            partitionCount: 2</span></span>
<span class="line"><span style="color:#24292E;">      binders:</span></span>
<span class="line"><span style="color:#24292E;">      ...</span></span></code></pre></div><p>先要明确上述配置项针对的是消息发布者 Source 组件，因为我们看到了&quot;producer&quot;配置项。请注意，这里出现了两个新的配置项&quot;partitionKeyExpression&quot;和&quot;partitionCount&quot;，它们就与消息分区有关。其中我们指定了&quot;partitionKeyExpression&quot;为&quot;payload.accountMessage.id.isEndWithDigit()&quot;，这里用到了 Spring 自带的 Spring 表达式语言（SpEL）来对传入的 AccountChangedEvent 进行评估，依据是 AccountMessage 中实现的 isEndWithDigit() 方法，如下所示。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">isEndWithDigit</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">char</span><span style="color:#E1E4E8;"> last </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.id.</span><span style="color:#B392F0;">charAt</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.id.</span><span style="color:#B392F0;">length</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> Character.</span><span style="color:#B392F0;">isDigit</span><span style="color:#E1E4E8;">(last);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">isEndWithDigit</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">char</span><span style="color:#24292E;"> last </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.id.</span><span style="color:#6F42C1;">charAt</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.id.</span><span style="color:#6F42C1;">length</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> Character.</span><span style="color:#6F42C1;">isDigit</span><span style="color:#24292E;">(last);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>我们知道 AccountMessage 中的 id 是一个 UUID 值，所以根据这个 UUID 中最后一位来判断是否是数字。如果返回值为 true，那么只有分区 id 为 1 的 customer-service 能接收到该信息；如果是返回值为 false，则表示只有分区 id 为 2 的 customer-service 能接收到该信息。显然，通过这样的分区策略，分区的数量&quot;partitionCount&quot;应该为 2。</p><p>对应的，作为消息消费者的 Sink 组件的配置项如下所示。</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">spring:</span></span>
<span class="line"><span style="color:#E1E4E8;">  cloud:</span></span>
<span class="line"><span style="color:#E1E4E8;">    stream:</span></span>
<span class="line"><span style="color:#E1E4E8;">      bindings:</span></span>
<span class="line"><span style="color:#E1E4E8;">        default:</span></span>
<span class="line"><span style="color:#E1E4E8;">          content-type: application/json</span></span>
<span class="line"><span style="color:#E1E4E8;">          binder: rabbitmq</span></span>
<span class="line"><span style="color:#E1E4E8;">        accountChangedChannel:</span></span>
<span class="line"><span style="color:#E1E4E8;">          destination: account-destination</span></span>
<span class="line"><span style="color:#E1E4E8;">	      group: customerGroup</span></span>
<span class="line"><span style="color:#E1E4E8;">          consumer:</span></span>
<span class="line"><span style="color:#E1E4E8;">            partitioned: true</span></span>
<span class="line"><span style="color:#E1E4E8;">            instanceIndex: 0</span></span>
<span class="line"><span style="color:#E1E4E8;">            instanceCount: 2</span></span>
<span class="line"><span style="color:#E1E4E8;">      binders:</span></span>
<span class="line"><span style="color:#E1E4E8;">      ...</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">spring:</span></span>
<span class="line"><span style="color:#24292E;">  cloud:</span></span>
<span class="line"><span style="color:#24292E;">    stream:</span></span>
<span class="line"><span style="color:#24292E;">      bindings:</span></span>
<span class="line"><span style="color:#24292E;">        default:</span></span>
<span class="line"><span style="color:#24292E;">          content-type: application/json</span></span>
<span class="line"><span style="color:#24292E;">          binder: rabbitmq</span></span>
<span class="line"><span style="color:#24292E;">        accountChangedChannel:</span></span>
<span class="line"><span style="color:#24292E;">          destination: account-destination</span></span>
<span class="line"><span style="color:#24292E;">	      group: customerGroup</span></span>
<span class="line"><span style="color:#24292E;">          consumer:</span></span>
<span class="line"><span style="color:#24292E;">            partitioned: true</span></span>
<span class="line"><span style="color:#24292E;">            instanceIndex: 0</span></span>
<span class="line"><span style="color:#24292E;">            instanceCount: 2</span></span>
<span class="line"><span style="color:#24292E;">      binders:</span></span>
<span class="line"><span style="color:#24292E;">      ...</span></span></code></pre></div><p>上述配置中同样包含了分区信息，其中 partitioned=true 表示启用消息分区功能、instanceCount = 2 表示消息分区的消费者节点数量为 2 个。而这里的 instanceIndex 参数就是用来设置当前消费者实例的索引号。请注意，instanceIndex 是从 0 开始的，我们在这里就把当前服务实例的索引号设置为 0。显然，在另外一个 customer-service 实例中需要将 instanceIndex 设置为 1。</p><p>消息分区是一项高级开发技巧，它也有一定的复杂性。这种复杂性在于引入分区所导致的状态性，即每个消费者实例所消费的消息实际上是根据自身的服务实例索引来确定的。对于分布式环境而言，状态性实际上是需要尽量避免的，因为我们无法确保所有实例都不出现问题。日常开发过程中，建议你谨慎使用消息分区功能。</p><h3 id="小结与预告" tabindex="-1">小结与预告 <a class="header-anchor" href="#小结与预告" aria-label="Permalink to &quot;小结与预告&quot;">​</a></h3><p>承接上一讲的内容，今天我们继续讨论了使用 Reactive Spring Cloud Stream 实现消息消费者的方法。同样，我们发现通过合理配置 Binder 组件，这一实现过程也比较简单。此外，Reactive Spring Cloud Stream 中还存在一些高级主题，例如自定义消息通道、消费者组以及消费分区，这一讲同样也介绍了在 ReactiveSpringCSS 案例系统中使用这些高级主题的方法。</p><p>最后给你留一道思考题：在 Reactive Spring Cloud Stream 中，如何配置消费者组和消费分区功能？</p><p>在介绍完消息驱动架构的设计和实现方法之后，接下来将是整个课程的最后一个主题，即响应式测试。我们将从测试方案开始讲起，看看如何验证响应式编程组件的正确性。</p><blockquote><p>点击链接，获取课程相关代码 ↓↓↓<br><a href="https://github.com/lagoueduCol/ReactiveProgramming-jianxiang.git?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">https://github.com/lagoueduCol/ReactiveProgramming-jianxiang.git</a></p></blockquote>`,15);function F(S,k,_,q,B,D){const a=e("Image");return c(),t("div",null,[i,E,y,u,d,p(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M00/39/FF/CioPOWB9V6CAWFGmAAAz0xnhiFU700.png"}),n(),g,h,C,b,p(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/39/F6/Cgp9HWB9V6yAIG-xAABfdya7AHI916.png"}),n(),m,p(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M00/39/F6/Cgp9HWB9V8SAKe9gAABJm91wiNA781.png"}),n(),v,p(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M00/39/FF/CioPOWB9V8yAMJXvAABkVap33sE282.png"}),n(),A])}const x=o(r,[["render",F]]);export{R as __pageData,x as default};
