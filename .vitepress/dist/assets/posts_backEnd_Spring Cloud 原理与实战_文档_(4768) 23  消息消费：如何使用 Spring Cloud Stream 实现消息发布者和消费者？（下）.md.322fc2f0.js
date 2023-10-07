import{_ as o,j as e,o as t,g as r,k as p,h as n,s,Q as l}from"./chunks/framework.4e7d56ce.js";const S=JSON.parse('{"title":"23消息消费：如何使用SpringCloudStream实现消息发布者和消费者？（下）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4768) 23  消息消费：如何使用 Spring Cloud Stream 实现消息发布者和消费者？（下）.md","filePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4768) 23  消息消费：如何使用 Spring Cloud Stream 实现消息发布者和消费者？（下）.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/Spring Cloud 原理与实战_文档/(4768) 23  消息消费：如何使用 Spring Cloud Stream 实现消息发布者和消费者？（下）.md"},E=s("h1",{id:"_23消息消费-如何使用springcloudstream实现消息发布者和消费者-下",tabindex:"-1"},[n("23消息消费：如何使用SpringCloudStream实现消息发布者和消费者？（下） "),s("a",{class:"header-anchor",href:"#_23消息消费-如何使用springcloudstream实现消息发布者和消费者-下","aria-label":'Permalink to "23消息消费：如何使用SpringCloudStream实现消息发布者和消费者？（下）"'},"​")],-1),i=s("p",null,"在上一课时中，我们给出了 SpringHealth 案例中基于 Spring Cloud Stream 的消息发布场景以及实现方式，同时也给出了消息消费的应用场景。今天我们将延续上一课时的内容，来具体讲解如何在服务中添加消息消费者，以及使用各项消息消费的高级主题，并给出案例的运行效果。",-1),y=s("h3",{id:"在服务中添加消息消费者",tabindex:"-1"},[n("在服务中添加消息消费者 "),s("a",{class:"header-anchor",href:"#在服务中添加消息消费者","aria-label":'Permalink to "在服务中添加消息消费者"'},"​")],-1),d=s("p",null,"在介绍消息消费者的具体实现方法之前，我们先来回顾消息消费的实现流程，如下图所示：",-1),u=l(`<p>消息消费实现流程</p><p>针对上图中各个消费者组件的实现过程，我们采用与介绍发布者时相同的方式进行展开。首当其冲的还是要使用 @EnableBinding 注解。</p><h4 id="使用-enablebinding-注解" tabindex="-1">使用 @EnableBinding 注解 <a class="header-anchor" href="#使用-enablebinding-注解" aria-label="Permalink to &quot;使用 @EnableBinding 注解&quot;">​</a></h4><p>与初始化消息发布环境一样，我们同样需要在 intervention-service 需要引入 spring-cloud-stream、spring-cloud-starter-stream-kafka 或 spring-cloud-starter-stream-rabbit 这几个Maven依赖，并构建 Bootstrap 类。intervention-service 中的 Bootstrap 类是 InterventionApplication，其代码如下所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">SpringCloudApplication</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">EnableBinding</span><span style="color:#E1E4E8;">(Sink.class)</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">InterventionApplication</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        SpringApplication.</span><span style="color:#B392F0;">run</span><span style="color:#E1E4E8;">(InterventionApplication.class, args);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">SpringCloudApplication</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">EnableBinding</span><span style="color:#24292E;">(Sink.class)</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">InterventionApplication</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        SpringApplication.</span><span style="color:#6F42C1;">run</span><span style="color:#24292E;">(InterventionApplication.class, args);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>显然，对于作为消息消费者的 Bootstrap 类而言，@EnableBinding 注解所绑定的应该是 Sink 接口。</p><h4 id="创建-sink" tabindex="-1">创建 Sink <a class="header-anchor" href="#创建-sink" aria-label="Permalink to &quot;创建 Sink&quot;">​</a></h4><p>UserInfoChangedSink 负责处理具体的消息消费逻辑，代码如下所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.cloud.stream.annotation.EnableBinding;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.cloud.stream.annotation.StreamListener; </span></span>
<span class="line"><span style="color:#E1E4E8;">...</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">UserInfoChangedSink</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Autowired</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> UserInfoRedisRepository userInfoRedisRepository;</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> Logger logger </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> LoggerFactory.</span><span style="color:#B392F0;">getLogger</span><span style="color:#E1E4E8;">(UserInfoChangedSink.class);</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">StreamListener</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;input&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">handleChangedUserInfo</span><span style="color:#E1E4E8;">(UserInfoChangedEventMapper </span><span style="color:#FFAB70;">userInfoChangedEventMapper</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span></span>
<span class="line"><span style="color:#E1E4E8;">        logger.</span><span style="color:#B392F0;">debug</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Received a message of type &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> userInfoChangedEventMapper.</span><span style="color:#B392F0;">getType</span><span style="color:#E1E4E8;">()); </span></span>
<span class="line"><span style="color:#E1E4E8;">     logger.</span><span style="color:#B392F0;">debug</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Received a {} event from the user-service for user name {}&quot;</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">             userInfoChangedEventMapper.</span><span style="color:#B392F0;">getOperation</span><span style="color:#E1E4E8;">(), </span></span>
<span class="line"><span style="color:#E1E4E8;">             userInfoChangedEventMapper.</span><span style="color:#B392F0;">getUser</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">getUserName</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(userInfoChangedEventMapper.</span><span style="color:#B392F0;">getOperation</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">equals</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;ADD&quot;</span><span style="color:#E1E4E8;">)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            userInfoRedisRepository.</span><span style="color:#B392F0;">saveUser</span><span style="color:#E1E4E8;">(userInfoChangedEventMapper.</span><span style="color:#B392F0;">getUser</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(userInfoChangedEventMapper.</span><span style="color:#B392F0;">getOperation</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">equals</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;UPDATE&quot;</span><span style="color:#E1E4E8;">)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">         userInfoRedisRepository.</span><span style="color:#B392F0;">updateUser</span><span style="color:#E1E4E8;">(userInfoChangedEventMapper.</span><span style="color:#B392F0;">getUser</span><span style="color:#E1E4E8;">());            </span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(userInfoChangedEventMapper.</span><span style="color:#B392F0;">getOperation</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">equals</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;DELETE&quot;</span><span style="color:#E1E4E8;">)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">         userInfoRedisRepository.</span><span style="color:#B392F0;">deleteUser</span><span style="color:#E1E4E8;">(userInfoChangedEventMapper.</span><span style="color:#B392F0;">getUser</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">getUserName</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {            </span></span>
<span class="line"><span style="color:#E1E4E8;">            logger.</span><span style="color:#B392F0;">error</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Received an UNKNOWN event from the user-service of type {}&quot;</span><span style="color:#E1E4E8;">, userInfoChangedEventMapper.</span><span style="color:#B392F0;">getType</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.cloud.stream.annotation.EnableBinding;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.cloud.stream.annotation.StreamListener; </span></span>
<span class="line"><span style="color:#24292E;">...</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">UserInfoChangedSink</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Autowired</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> UserInfoRedisRepository userInfoRedisRepository;</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> Logger logger </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> LoggerFactory.</span><span style="color:#6F42C1;">getLogger</span><span style="color:#24292E;">(UserInfoChangedSink.class);</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">StreamListener</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;input&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">handleChangedUserInfo</span><span style="color:#24292E;">(UserInfoChangedEventMapper </span><span style="color:#E36209;">userInfoChangedEventMapper</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">     </span></span>
<span class="line"><span style="color:#24292E;">        logger.</span><span style="color:#6F42C1;">debug</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Received a message of type &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> userInfoChangedEventMapper.</span><span style="color:#6F42C1;">getType</span><span style="color:#24292E;">()); </span></span>
<span class="line"><span style="color:#24292E;">     logger.</span><span style="color:#6F42C1;">debug</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Received a {} event from the user-service for user name {}&quot;</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">             userInfoChangedEventMapper.</span><span style="color:#6F42C1;">getOperation</span><span style="color:#24292E;">(), </span></span>
<span class="line"><span style="color:#24292E;">             userInfoChangedEventMapper.</span><span style="color:#6F42C1;">getUser</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">getUserName</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(userInfoChangedEventMapper.</span><span style="color:#6F42C1;">getOperation</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">equals</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;ADD&quot;</span><span style="color:#24292E;">)) {</span></span>
<span class="line"><span style="color:#24292E;">            userInfoRedisRepository.</span><span style="color:#6F42C1;">saveUser</span><span style="color:#24292E;">(userInfoChangedEventMapper.</span><span style="color:#6F42C1;">getUser</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(userInfoChangedEventMapper.</span><span style="color:#6F42C1;">getOperation</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">equals</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;UPDATE&quot;</span><span style="color:#24292E;">)) {</span></span>
<span class="line"><span style="color:#24292E;">         userInfoRedisRepository.</span><span style="color:#6F42C1;">updateUser</span><span style="color:#24292E;">(userInfoChangedEventMapper.</span><span style="color:#6F42C1;">getUser</span><span style="color:#24292E;">());            </span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(userInfoChangedEventMapper.</span><span style="color:#6F42C1;">getOperation</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">equals</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;DELETE&quot;</span><span style="color:#24292E;">)) {</span></span>
<span class="line"><span style="color:#24292E;">         userInfoRedisRepository.</span><span style="color:#6F42C1;">deleteUser</span><span style="color:#24292E;">(userInfoChangedEventMapper.</span><span style="color:#6F42C1;">getUser</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">getUserName</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {            </span></span>
<span class="line"><span style="color:#24292E;">            logger.</span><span style="color:#6F42C1;">error</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Received an UNKNOWN event from the user-service of type {}&quot;</span><span style="color:#24292E;">, userInfoChangedEventMapper.</span><span style="color:#6F42C1;">getType</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这里引入了一个新的注解 @StreamListener，将该注解添加到某个方法上就可以使之接收处理流中的事件。在上面的例子中，@StreamListener 注解添加在了 handleChangedUserInfo() 方法上并指向了&quot;input&quot;通道，意味着所有流经&quot;input&quot;通道的消息都会交由这个 handleChangedUserInfo() 方法进行处理。</p><p>而在 handleChangedUserInfo() 方法中，我们调用 UserInfoRedisRepository 类完成各种缓存相关的处理。UserInfoRedisRepository 的实现代码参考如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">Repository</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">UserInfoRedisRepositoryImpl</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">implements</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">UserInfoRedisRepository</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">final</span><span style="color:#E1E4E8;"> String HASH_NAME </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;user&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> RedisTemplate&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">UserMapper</span><span style="color:#E1E4E8;">&gt; redisTemplate;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> HashOperations&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">UserMapper</span><span style="color:#E1E4E8;">&gt; hashOperations;</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">UserInfoRedisRepositoryImpl</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Autowired</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">UserInfoRedisRepositoryImpl</span><span style="color:#E1E4E8;">(RedisTemplate&lt;</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">UserMapper</span><span style="color:#E1E4E8;">&gt; </span><span style="color:#FFAB70;">redisTemplate</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.redisTemplate </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> redisTemplate;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">PostConstruct</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">private</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">init</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        hashOperations </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> redisTemplate.</span><span style="color:#B392F0;">opsForHash</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">saveUser</span><span style="color:#E1E4E8;">(UserMapper </span><span style="color:#FFAB70;">user</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        hashOperations.</span><span style="color:#B392F0;">put</span><span style="color:#E1E4E8;">(HASH_NAME, user.</span><span style="color:#B392F0;">getUserName</span><span style="color:#E1E4E8;">(), user);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">updateUser</span><span style="color:#E1E4E8;">(UserMapper </span><span style="color:#FFAB70;">user</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        hashOperations.</span><span style="color:#B392F0;">put</span><span style="color:#E1E4E8;">(HASH_NAME, user.</span><span style="color:#B392F0;">getUserName</span><span style="color:#E1E4E8;">(), user);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">deleteUser</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">userName</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        hashOperations.</span><span style="color:#B392F0;">delete</span><span style="color:#E1E4E8;">(HASH_NAME, userName);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Override</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> UserMapper </span><span style="color:#B392F0;">findUserByUserName</span><span style="color:#E1E4E8;">(String </span><span style="color:#FFAB70;">userName</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (UserMapper) hashOperations.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(HASH_NAME, userName);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">Repository</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">UserInfoRedisRepositoryImpl</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">implements</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">UserInfoRedisRepository</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">final</span><span style="color:#24292E;"> String HASH_NAME </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;user&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> RedisTemplate&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">UserMapper</span><span style="color:#24292E;">&gt; redisTemplate;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> HashOperations&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">String</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">UserMapper</span><span style="color:#24292E;">&gt; hashOperations;</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">UserInfoRedisRepositoryImpl</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Autowired</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">UserInfoRedisRepositoryImpl</span><span style="color:#24292E;">(RedisTemplate&lt;</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">UserMapper</span><span style="color:#24292E;">&gt; </span><span style="color:#E36209;">redisTemplate</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.redisTemplate </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> redisTemplate;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">PostConstruct</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">private</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">init</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        hashOperations </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> redisTemplate.</span><span style="color:#6F42C1;">opsForHash</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">saveUser</span><span style="color:#24292E;">(UserMapper </span><span style="color:#E36209;">user</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        hashOperations.</span><span style="color:#6F42C1;">put</span><span style="color:#24292E;">(HASH_NAME, user.</span><span style="color:#6F42C1;">getUserName</span><span style="color:#24292E;">(), user);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">updateUser</span><span style="color:#24292E;">(UserMapper </span><span style="color:#E36209;">user</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        hashOperations.</span><span style="color:#6F42C1;">put</span><span style="color:#24292E;">(HASH_NAME, user.</span><span style="color:#6F42C1;">getUserName</span><span style="color:#24292E;">(), user);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">deleteUser</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">userName</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        hashOperations.</span><span style="color:#6F42C1;">delete</span><span style="color:#24292E;">(HASH_NAME, userName);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Override</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> UserMapper </span><span style="color:#6F42C1;">findUserByUserName</span><span style="color:#24292E;">(String </span><span style="color:#E36209;">userName</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (UserMapper) hashOperations.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(HASH_NAME, userName);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这里，我们使用了 Spring Data 提供的 RedisTemplate 和 HashOperations 工具类来封装对Redis的数据操作。关于 Spring Data 的使用方法不是本课程的重点，你可以参考相关资料进行进一步了解。</p><h4 id="配置-binder" tabindex="-1">配置 Binder <a class="header-anchor" href="#配置-binder" aria-label="Permalink to &quot;配置 Binder&quot;">​</a></h4><p>对于消息消费者而言，配置 Binder 的方式和消息发布者非常类似。如果使用默认的消息通道，那么我们只需要把用于发送的&quot;output&quot;通道改为接收的&quot;input&quot;通道就可以了。这里以 Kafka 为例，给出 Binder 的配置信息，如下所示：</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">spring:</span></span>
<span class="line"><span style="color:#E1E4E8;">  cloud:</span></span>
<span class="line"><span style="color:#E1E4E8;">    stream:</span></span>
<span class="line"><span style="color:#E1E4E8;">      bindings:</span></span>
<span class="line"><span style="color:#E1E4E8;">        input:</span></span>
<span class="line"><span style="color:#E1E4E8;">          destination:  userInfoChangedTopic</span></span>
<span class="line"><span style="color:#E1E4E8;">          content-type: application/json</span></span>
<span class="line"><span style="color:#E1E4E8;">      kafka:</span></span>
<span class="line"><span style="color:#E1E4E8;">        binder:</span></span>
<span class="line"><span style="color:#E1E4E8;">          zk-nodes: localhost</span></span>
<span class="line"><span style="color:#E1E4E8;">	      brokers: localhost</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">spring:</span></span>
<span class="line"><span style="color:#24292E;">  cloud:</span></span>
<span class="line"><span style="color:#24292E;">    stream:</span></span>
<span class="line"><span style="color:#24292E;">      bindings:</span></span>
<span class="line"><span style="color:#24292E;">        input:</span></span>
<span class="line"><span style="color:#24292E;">          destination:  userInfoChangedTopic</span></span>
<span class="line"><span style="color:#24292E;">          content-type: application/json</span></span>
<span class="line"><span style="color:#24292E;">      kafka:</span></span>
<span class="line"><span style="color:#24292E;">        binder:</span></span>
<span class="line"><span style="color:#24292E;">          zk-nodes: localhost</span></span>
<span class="line"><span style="color:#24292E;">	      brokers: localhost</span></span></code></pre></div><h3 id="spring-cloud-stream-高级主题" tabindex="-1">Spring Cloud Stream 高级主题 <a class="header-anchor" href="#spring-cloud-stream-高级主题" aria-label="Permalink to &quot;Spring Cloud Stream 高级主题&quot;">​</a></h3><p>在分别介绍完消息发布者和消费者的基本实现过程之后，我们将在此基础上讨论 Spring Cloud Stream 的高级主题，包括自定义消息通道、使用消费者组以及消息分区。</p><h4 id="自定义消息通道" tabindex="-1">自定义消息通道 <a class="header-anchor" href="#自定义消息通道" aria-label="Permalink to &quot;自定义消息通道&quot;">​</a></h4><p>在前面的示例中，无论是消息发布还是消息消费，我们都使用了 Spring Cloud Stream 中默认提供的通道名&quot;output&quot;和&quot;input&quot;。显然，在有些场景下，为了更好地管理系统中存在的所有通道，为通道进行命名是一项最佳实践，这点对于消息消费的场景尤为重要。在接下来的内容中，针对消息消费的场景，我们将不使用 Sink 组件默认提供的&quot;input&quot;通道，而是尝试通过自定义通道的方式来实现消息消费。</p><p>在 Spring Cloud Stream 中，实现一个面向消息消费场景的自定义通道的方法也非常简单，只需要定义一个新的接口，并在该接口中通过 @Input 注解声明一个新的 Channel 即可。例如我们可以定义一个新的 UserInfoChangedChannel 接口，然后通过 @Input 注解就可以声明一个&quot;userInfoChangedChannel&quot;通道，代码如下所示。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.cloud.stream.annotation.Input;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.messaging.SubscribableChannel;</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">UserInfoChangedChannel</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">  String USER_INFO </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;userInfoChangedChannel&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">Input</span><span style="color:#E1E4E8;">(UserInfoChangedChannel.USER_INFO)</span></span>
<span class="line"><span style="color:#E1E4E8;">    SubscribableChannel </span><span style="color:#B392F0;">userInfoChangedChannel</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.cloud.stream.annotation.Input;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> org.springframework.messaging.SubscribableChannel;</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">UserInfoChangedChannel</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">  String USER_INFO </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;userInfoChangedChannel&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">Input</span><span style="color:#24292E;">(UserInfoChangedChannel.USER_INFO)</span></span>
<span class="line"><span style="color:#24292E;">    SubscribableChannel </span><span style="color:#6F42C1;">userInfoChangedChannel</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>注意到该通道的类型为 Spring Intergration 中用于消费消息的 SubscribableChannel。同时，我们也注意到这个 UserInfoChangedChannel 的代码风格与 Spring Cloud Stream 自带的Sink接口完全一致。作为回顾，这里也给出 Sink 接口的定义，如下所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> org.springframework.cloud.stream.annotation.Input;</span></span>
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
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>一旦我们完成了自定义的消息通信，就可以在 @StreamListener 注解中设置这个通道。以前面介绍的 UserInfoChangedSink 为例，添加了自定义通道之后的重构代码结构如下所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">EnableBinding</span><span style="color:#E1E4E8;">(UserInfoChangedChannel.class)</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">UserInfoChangedSink</span><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    @</span><span style="color:#F97583;">StreamListener</span><span style="color:#E1E4E8;">(UserInfoChangedChannel.USER_INFO)</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">handleChangedUserInfo</span><span style="color:#E1E4E8;">(UserInfoChangedEventMapper </span><span style="color:#FFAB70;">userInfoChangedEventMapper</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	     ...</span></span>
<span class="line"><span style="color:#E1E4E8;">	}</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">EnableBinding</span><span style="color:#24292E;">(UserInfoChangedChannel.class)</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">UserInfoChangedSink</span><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    @</span><span style="color:#D73A49;">StreamListener</span><span style="color:#24292E;">(UserInfoChangedChannel.USER_INFO)</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">handleChangedUserInfo</span><span style="color:#24292E;">(UserInfoChangedEventMapper </span><span style="color:#E36209;">userInfoChangedEventMapper</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">	     ...</span></span>
<span class="line"><span style="color:#24292E;">	}</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>可以看到，这里我们继续使用 @EnableBinding 注解绑定了自定义的 UserInfoChangedChannel。因为 UserInfoChangedChannel 中通过 @Input 注解提供了&quot;userInfoChangedChannel&quot;通道，所以这种用法实际上和 @EnableBinding(Sink.class) 是完全一致的。因此，对于 Binder 的配置而言，我们要做的也只是调整通道的名称。再次以 Kafka 为例，重构后的 Binder 配置信息如下所示：</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">spring:</span></span>
<span class="line"><span style="color:#E1E4E8;">  cloud:</span></span>
<span class="line"><span style="color:#E1E4E8;">    stream:</span></span>
<span class="line"><span style="color:#E1E4E8;">      bindings:</span></span>
<span class="line"><span style="color:#E1E4E8;">        userInfoChangedChannel:</span></span>
<span class="line"><span style="color:#E1E4E8;">          destination:  userInfoChangedTopic</span></span>
<span class="line"><span style="color:#E1E4E8;">          content-type: application/json</span></span>
<span class="line"><span style="color:#E1E4E8;">      kafka:</span></span>
<span class="line"><span style="color:#E1E4E8;">        binder:</span></span>
<span class="line"><span style="color:#E1E4E8;">          zk-nodes: localhost</span></span>
<span class="line"><span style="color:#E1E4E8;">	      brokers: localhost</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">spring:</span></span>
<span class="line"><span style="color:#24292E;">  cloud:</span></span>
<span class="line"><span style="color:#24292E;">    stream:</span></span>
<span class="line"><span style="color:#24292E;">      bindings:</span></span>
<span class="line"><span style="color:#24292E;">        userInfoChangedChannel:</span></span>
<span class="line"><span style="color:#24292E;">          destination:  userInfoChangedTopic</span></span>
<span class="line"><span style="color:#24292E;">          content-type: application/json</span></span>
<span class="line"><span style="color:#24292E;">      kafka:</span></span>
<span class="line"><span style="color:#24292E;">        binder:</span></span>
<span class="line"><span style="color:#24292E;">          zk-nodes: localhost</span></span>
<span class="line"><span style="color:#24292E;">	      brokers: localhost</span></span></code></pre></div><h4 id="使用消费者分组" tabindex="-1">使用消费者分组 <a class="header-anchor" href="#使用消费者分组" aria-label="Permalink to &quot;使用消费者分组&quot;">​</a></h4><p>在微服务架构中，服务多实例部署的场景非常常见。在集群环境下，我们希望服务的不同实例被放置在竞争的消费者关系中，同一服务集群中只有一个实例能够处理给定消息。Spring Cloud Stream 提供的消费者分组可以很方便地实现这一需求，效果图如下所示：</p>`,30),g=l(`<p>intervention-service 消息分组效果示意图</p><p>在上图中，两个 intervention-service 实例构成了一个 interventionGroup。在这个 interventionGroup 中，UserInfoChangedEvent 事件只会被一个 intervention-service 实例所消费。</p><p>要想实现上图所示的消息消费效果，我们唯一要做的事情也是重构Binder配置，即在配置Binder时指定消费者分组信息即可，如下所示：</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">spring:</span></span>
<span class="line"><span style="color:#E1E4E8;">  cloud:</span></span>
<span class="line"><span style="color:#E1E4E8;">    stream:</span></span>
<span class="line"><span style="color:#E1E4E8;">      bindings:</span></span>
<span class="line"><span style="color:#E1E4E8;">        userInfoChangedChannel:</span></span>
<span class="line"><span style="color:#E1E4E8;">          destination:  userInfoChangedTopic</span></span>
<span class="line"><span style="color:#E1E4E8;">          content-type: application/json</span></span>
<span class="line"><span style="color:#E1E4E8;">         group: interventionGroup</span></span>
<span class="line"><span style="color:#E1E4E8;">      kafka:</span></span>
<span class="line"><span style="color:#E1E4E8;">        binder:</span></span>
<span class="line"><span style="color:#E1E4E8;">          zk-nodes: localhost</span></span>
<span class="line"><span style="color:#E1E4E8;">	      brokers: localhost</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">spring:</span></span>
<span class="line"><span style="color:#24292E;">  cloud:</span></span>
<span class="line"><span style="color:#24292E;">    stream:</span></span>
<span class="line"><span style="color:#24292E;">      bindings:</span></span>
<span class="line"><span style="color:#24292E;">        userInfoChangedChannel:</span></span>
<span class="line"><span style="color:#24292E;">          destination:  userInfoChangedTopic</span></span>
<span class="line"><span style="color:#24292E;">          content-type: application/json</span></span>
<span class="line"><span style="color:#24292E;">         group: interventionGroup</span></span>
<span class="line"><span style="color:#24292E;">      kafka:</span></span>
<span class="line"><span style="color:#24292E;">        binder:</span></span>
<span class="line"><span style="color:#24292E;">          zk-nodes: localhost</span></span>
<span class="line"><span style="color:#24292E;">	      brokers: localhost</span></span></code></pre></div><p>以上基于Kafka的配置信息中，我们关注&quot;bindings&quot;段中的通道名称使用了自定义的&quot;userInfoChangedChannel&quot;，并且在该配置项中设置了&quot;group&quot;为&quot;interventionGroup&quot;。</p><h4 id="使用消息分区" tabindex="-1">使用消息分区 <a class="header-anchor" href="#使用消息分区" aria-label="Permalink to &quot;使用消息分区&quot;">​</a></h4><p>最后一项 Spring Cloud Stream 使用上的高级主题是使用消费分区。同样是在集群环境下，假设存在两个 intervention-service 实例，我们希望用户信息中 id 为单号的 UserInfoChangedEvent 始终由第一个 intervention-service 实例进行消费，而id为双号的 UserInfoChangedEvent 则始终由第二个 intervention-service 实例进行消费。基于类似这样的需求，我们就可以构建消息分区，如下所示：</p>`,7),h=l(`<p>intervention-service 消息分区效果示意图</p><p>要想实现上图所示的消息消费效果，我们唯一要做的事情还是重构 Binder 配置。这次以 RabbitMQ 为例给出示例配置，如下所示：</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">spring:</span></span>
<span class="line"><span style="color:#E1E4E8;">  cloud:</span></span>
<span class="line"><span style="color:#E1E4E8;">    stream:</span></span>
<span class="line"><span style="color:#E1E4E8;">      bindings:</span></span>
<span class="line"><span style="color:#E1E4E8;">        default:</span></span>
<span class="line"><span style="color:#E1E4E8;">          content-type: application/json</span></span>
<span class="line"><span style="color:#E1E4E8;">          binder: rabbitmq</span></span>
<span class="line"><span style="color:#E1E4E8;">        output:</span></span>
<span class="line"><span style="color:#E1E4E8;">             destination: userInfoChangedExchange</span></span>
<span class="line"><span style="color:#E1E4E8;">          group: interventionGroup</span></span>
<span class="line"><span style="color:#E1E4E8;">          producer:</span></span>
<span class="line"><span style="color:#E1E4E8;">            partitionKeyExpression: payload.user.id % 2</span></span>
<span class="line"><span style="color:#E1E4E8;">            partitionCount: 2</span></span>
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
<span class="line"><span style="color:#24292E;">        output:</span></span>
<span class="line"><span style="color:#24292E;">             destination: userInfoChangedExchange</span></span>
<span class="line"><span style="color:#24292E;">          group: interventionGroup</span></span>
<span class="line"><span style="color:#24292E;">          producer:</span></span>
<span class="line"><span style="color:#24292E;">            partitionKeyExpression: payload.user.id % 2</span></span>
<span class="line"><span style="color:#24292E;">            partitionCount: 2</span></span>
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
<span class="line"><span style="color:#24292E;">                virtual-host: /</span></span></code></pre></div><p>首先，我们明确上述配置项针对的是消息发布者 Source 组件，因为我们看到了&quot;output&quot;配置项。注意到，我们指定了交换器和消费者分组分别为 &quot;userInfoChangedExchange&quot;和&quot;interventionGroup&quot;。同时，这里还出现了两个新的配置项&quot;partitionKeyExpression&quot;和&quot;partitionCount&quot;，这两个配置项就与消息分区有关。我们指定了&quot;partitionKeyExpression&quot;为&quot;payload.user.id&quot;，意味着 Spring Cloud Stream 会根据传入的 UserInfoChangedEvent 中的 User 对象的 id 对 2 进行取模操作。如果取模值为 1 表示只有分区Id为 1 的 intervention-service 能接收到该信息，如果是取模值为 0 表示只有分区 Id 为 2 的 intervention-service 能接收到该信息。显然，通过这样的分区策略，分区的数量&quot;partitionCount&quot;应该为 2。</p><p>对应的，作为消息消费者的 Sink 组件的配置项如下所示：</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">spring:</span></span>
<span class="line"><span style="color:#E1E4E8;">  cloud:</span></span>
<span class="line"><span style="color:#E1E4E8;">    stream:</span></span>
<span class="line"><span style="color:#E1E4E8;">      bindings:</span></span>
<span class="line"><span style="color:#E1E4E8;">        default:</span></span>
<span class="line"><span style="color:#E1E4E8;">          content-type: application/json</span></span>
<span class="line"><span style="color:#E1E4E8;">          binder: rabbitmq</span></span>
<span class="line"><span style="color:#E1E4E8;">        input:</span></span>
<span class="line"><span style="color:#E1E4E8;">          destination: userInfoChangedExchange</span></span>
<span class="line"><span style="color:#E1E4E8;">	group: interventionGroup</span></span>
<span class="line"><span style="color:#E1E4E8;">          consumer:</span></span>
<span class="line"><span style="color:#E1E4E8;">            partitioned: true</span></span>
<span class="line"><span style="color:#E1E4E8;">            instanceIndex: 0</span></span>
<span class="line"><span style="color:#E1E4E8;">            instanceCount: 2</span></span>
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
<span class="line"><span style="color:#24292E;">          destination: userInfoChangedExchange</span></span>
<span class="line"><span style="color:#24292E;">	group: interventionGroup</span></span>
<span class="line"><span style="color:#24292E;">          consumer:</span></span>
<span class="line"><span style="color:#24292E;">            partitioned: true</span></span>
<span class="line"><span style="color:#24292E;">            instanceIndex: 0</span></span>
<span class="line"><span style="color:#24292E;">            instanceCount: 2</span></span>
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
<span class="line"><span style="color:#24292E;">                virtual-host: /</span></span></code></pre></div><p>上述配置中同样包含了分区信息，其中 partitioned=true 表示启用消息分区功能，instanceCount=2 表示消息分区的消费者节点数量为 2 个。特别要注意的是 instanceIndex 参数用来设置当前消费者实例的索引号。instanceIndex 是从 0 开始的，我们在这里就把当前服务实例的索引号为 0。显然我们在另外一个 intervention-service 实例中需要将 instanceIndex 设置为 1。</p><p>为了演示消息分区功能，我们需要运行一个 user-service 作为 Source 组件，以及两个独立的 intervention-service 作为 Sink 组件，从而构建一个完整的示例并给出运行时应用系统的控制台输出效果。两个独立的 Sink 组件就按照前面给出的分区策略进行消息的处理。然后在两个 Sink 组件的输出中，UserInfoChangedEvent 中 User 对象的 Id 成单双数交替出现。你可以自己做一些尝试和练习。</p><h3 id="小结与预告" tabindex="-1">小结与预告 <a class="header-anchor" href="#小结与预告" aria-label="Permalink to &quot;小结与预告&quot;">​</a></h3><p>承接上一课时内容，今天我们继续讨论使用 Spring Cloud Stream 实现消息消费者的实现方法。同样，我们发现通过合理配置 Binder 组件，这一实现过程也比较简单。另一方面，Spring Cloud Stream 中还存在一些高级主题，例如自定义消息通道、消费者组以及消费分区，本课时同样也介绍了如何在 SpringHealth 案例系统中使用这些高级主题的方法。</p><p>这里给你留一道思考题：在 Spring Cloud Stream 中，如何配置消费者组和消费分区功能？</p><p>通过前面课程的学习，我们感受到了 Spring Cloud Stream 中 Binder 组件的强大功能。基于这个组件，我们可以使用同一套开发模式来分别集成 RabbitMQ 和 Kafka 等主流的消息中间件。介绍完消息发布和消费之后，我们有必要对 Binder 组件的内部实现机制做深入分析，这就是下一课时的内容。</p>`,12);function C(F,v,b,m,f,I){const a=e("Image");return t(),r("div",null,[E,i,y,d,p(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/7E/C4/CgqCHl_PVBSAeL1XAAA8UAK4iIs917.png"}),n(),u,p(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/7E/C4/CgqCHl_PVEeALTgMAABKYpkIj8Y721.png"}),n(),g,p(a,{alt:"Lark20201208-182244.png",src:"https://s0.lgstatic.com/i/image/M00/7E/B9/Ciqc1F_PVFGABcKNAAI1undYfJw543.png"}),n(),h])}const k=o(c,[["render",C]]);export{S as __pageData,k as default};
