import{_ as p,D as o,o as e,g as t,J as n,h as l,Q as s}from"./chunks/framework.f67d7268.js";const m=JSON.parse('{"title":"25如何实现接口限流和降级？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Go 微服务实战 38 讲_文档/(3820) 25  如何实现接口限流和降级？.md","filePath":"posts/backEnd/Go 微服务实战 38 讲_文档/(3820) 25  如何实现接口限流和降级？.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/Go 微服务实战 38 讲_文档/(3820) 25  如何实现接口限流和降级？.md"},r=s('<h1 id="_25如何实现接口限流和降级" tabindex="-1">25如何实现接口限流和降级？ <a class="header-anchor" href="#_25如何实现接口限流和降级" aria-label="Permalink to &quot;25如何实现接口限流和降级？&quot;">​</a></h1><p>在前面的第 23 课时中，我们已经介绍了限流和降级的相关概念以及在服务高可用架构中的重要性。那本课时我们就继续往下剖析，来详细讲解限流和降级的使用场景以及二者的区别，接着我还会给你一些具体的案例，让你更好地掌握如何去进行限流和降级。</p><h3 id="限流和降级" tabindex="-1">限流和降级 <a class="header-anchor" href="#限流和降级" aria-label="Permalink to &quot;限流和降级&quot;">​</a></h3><p>限流和降级都是为了保护下游服务提供者不被大流量请求冲垮而采取的手段，但是二者也是有一定区别的。</p><h4 id="_1-应用的服务定位不同" tabindex="-1">1. 应用的服务定位不同 <a class="header-anchor" href="#_1-应用的服务定位不同" aria-label="Permalink to &quot;1. 应用的服务定位不同&quot;">​</a></h4><p>在大多数微服务架构系统中，不同服务的定位和重要性往往是不一样的。</p><p>我们一般将提供核心业务支撑相关的服务称为<strong>核心链路服务</strong>，它们负责提供最为核心的业务，比如支付宝的支付链路、滴滴的打车链路等。</p><p>而提供核心业务之外的服务我们一般称为<strong>次要链路服务</strong>，它们负责提供非核心业务，比如滴滴的司机评价功能等。</p><p>上述服务也统称为<strong>内部服务</strong> ：都是由公司或组织负责开发运维和管理的服务。由于这些服务都是自家开发管理的，所以往往对其性能和稳定性有一定的了解。与内部服务对应的就是<strong>外部服务</strong>，是指通过 API 或 SOA 等手段调用的其他公司或者组织的服务，这些服务的性能和稳定性往往无法保证或者被自家熟知。</p>',9),E=s('<p>系统服务定位和分类示意图</p><p>如上图所示，外部请求通过网关直接访问上流服务 A，服务 A、服务 B 和服务 C 是核心链路服务，服务 D 是次要链路服务，服务 E 是外部服务。</p><p>其中，外部请求的数量往往无法控制，比如双 11 抢购和微博热点事件，可能会有巨量瞬时流量，所以<strong>直面不可控的外部请求的服务 A 往往需要进行限流</strong>，需要根据整条核心链路经过压测计算出来的处理上限，过滤掉部分请求。</p><p>除了服务 A 需要限流外，<strong>一般来说，服务 B、服务 C 和服务 D 都不需要限流</strong>。而服务 E 是外部服务，在另外一个系统中也相当于服务 A 的地位，直面外部请求，所以理论上它也是需要进行限流操作的，以防止上游系统的请求将其冲垮。</p><p>对于服务 B 来说，它除了负责自身业务外，还需要协调调用服务 C、服务 D 和服务 E，<strong>当流量过大系统逐渐无法应对时，往往就会引入降级</strong>，关闭掉对次要链路中服务 D 的调用，腾出更多的服务器资源给核心链路的服务。</p><p>服务 B 需要调用外部服务 E，它是一个稳定性未知的外部服务，相当于一个黑盒，所以<strong>一般服务 B 需要断路器来提供熔断机制以保护自己不被外部服务 E 拖垮</strong>。</p><h4 id="_2-效果不同" tabindex="-1">2. 效果不同 <a class="header-anchor" href="#_2-效果不同" aria-label="Permalink to &quot;2. 效果不同&quot;">​</a></h4><p><strong>限流方案</strong>能预防突发的大流量，保护系统不被冲垮，但是其在处理瞬时流量时，大多数时候会拒绝掉系统无法处理的过量流量，服务的处理能力并没有过多改变，这就可能会导致拒绝掉一些关键业务请求的尴尬情况发生。</p><p>而<strong>降级设计</strong>能够暂时提高系统某些关键服务的处理能力，从而承载更多的请求访问，当然它会牺牲其他次要功能的资源。</p><h3 id="具体业务场景" tabindex="-1">具体业务场景 <a class="header-anchor" href="#具体业务场景" aria-label="Permalink to &quot;具体业务场景&quot;">​</a></h3><p>我们还是以上一课时的电商商品系统为例，商品详情页面需要展示下游评论系统的实时评论信息，但是实时的评论信息相对来说并不是不可或缺的，紧急情况下可以不显示。下图展示了相关的服务交互过程：</p>',11),y=s(`<p>商品系统和评论系统交互图</p><p>商品系统直接处理外部的网络请求，所以需要进行限流操作，并且商品系统相对于下游的评论系统来说，级别更高，不应该受到评论系统的错误影响，在面对较大网络流量时，可以不再调用评论系统获取实时的派送信息，而是直接显示默认数据或缓存的过期数据。</p><h3 id="限流案例" tabindex="-1">限流案例 <a class="header-anchor" href="#限流案例" aria-label="Permalink to &quot;限流案例&quot;">​</a></h3><p>关于限流，我们可以直接使用 Golang 标准库自带的 x/time/rate 组件。</p><p>rate 组件是基于经典的<strong>令牌桶</strong>（Token Bucket）算法实现的。下面，我们就简单讲解一下令牌桶算法的基础理念，你可以将令牌桶想象成一个固定大小的桶，限流系统会以恒定速率向桶中放令牌，比如每分钟放 10 个，桶满了之后则停止放入，桶中还有空间则继续放入；而用户可以从桶中取令牌，如果有剩余则直接拿走，如果没有剩余，则需要等待系统中被放置了新的令牌再拿走。</p><p>而<strong>限流器就相当于一个这样的令牌桶</strong> ，每次处理请求时都需要从限流器这里获得一个令牌，如果没有则一直等待。所以，要使用 rate 组件实现限流功能，我们先要构造一个限流器。<strong>rate 提供了 NewLimiter 方法来构造限流器</strong>，它有两个参数：</p><ul><li><p>第一个参数代表系统每秒钟向令牌桶中放入多少个令牌，也就是限流器平稳状态下每秒可以允许多少请求通过，它的参数类型是 Limit，是 float64 类型的别名；</p></li><li><p>第二个参数代表令牌桶的上限或者整体大小，也就是限流器允许多大的瞬时请求流量通过。</p></li></ul><p>如下面的示例代码所示，其构造出的限流器的相关参数为：令牌桶大小为 10，向桶中放置令牌的速率为每秒 20 个令牌。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 使用x/time/rate创建限流中间件</span></span>
<span class="line"><span style="color:#E1E4E8;">limiter </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> rate.</span><span style="color:#B392F0;">NewLimiter</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">20</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 使用x/time/rate创建限流中间件</span></span>
<span class="line"><span style="color:#24292E;">limiter </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> rate.</span><span style="color:#6F42C1;">NewLimiter</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">10</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">20</span><span style="color:#24292E;">)</span></span></code></pre></div><p>除了直接指定每秒产生的令牌个数外，还可以用 Every 方法来指定向令牌桶中放置令牌的间隔，例如：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">limit </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Every</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> time.Millisecond);</span></span>
<span class="line"><span style="color:#E1E4E8;">limiter </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">NewLimiter</span><span style="color:#E1E4E8;">(limit, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">limit </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Every</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">100</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> time.Millisecond);</span></span>
<span class="line"><span style="color:#24292E;">limiter </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">NewLimiter</span><span style="color:#24292E;">(limit, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span></code></pre></div><p>以上就表示每 100ms 往桶中放一个令牌，也就是说 1 秒钟可以产生 10 个令牌。</p><p>Limiter 提供了三类方法供用户消费令牌，用户可以每次消费一个令牌，也可以一次性消费多个令牌，这里我们就只展示其中的 Allow 类方法的使用（如下示例代码），剩下的 Wait 和 Reserve 类方法跟 Allow 类方法的使用比较类似，你若感兴趣的话可以自行了解，这里我们就不做过多讲解了。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">limit.</span><span style="color:#B392F0;">Allow</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// Allow返回false，表示桶内不足一个令牌，应该被限流，默认返回 ErrLimiExceed 异常</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> nil, errors.</span><span style="color:#B392F0;">New</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;ErrLimitExceed&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">// Allow 返回true，则正常执行业务逻辑</span></span>
<span class="line"><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">doRealJob</span><span style="color:#E1E4E8;">(params)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">limit.</span><span style="color:#6F42C1;">Allow</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// Allow返回false，表示桶内不足一个令牌，应该被限流，默认返回 ErrLimiExceed 异常</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> nil, errors.</span><span style="color:#6F42C1;">New</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;ErrLimitExceed&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">// Allow 返回true，则正常执行业务逻辑</span></span>
<span class="line"><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">doRealJob</span><span style="color:#24292E;">(params)</span></span></code></pre></div><p>然后可以使用 postman 等工具进行验证，当请求频次超过限流标准后，会返回 &quot;error&quot;: &quot;ErrLimitExceed&quot; 信息。</p><h3 id="降级案例" tabindex="-1">降级案例 <a class="header-anchor" href="#降级案例" aria-label="Permalink to &quot;降级案例&quot;">​</a></h3><p>降级的核心目的就是要保证服务基本可用，一般可以通过配置中心配置或人工配置一些关键数据去进行降级。同时，需要注意的是，降级也需要根据系统的吞吐量、响应时间、可用率等条件进行自动或手动降级。</p><p>一般来说，降级的手段有很多，比如有一种降级方案就是通过断路器打开和被限流时返回的默认固化的数据或者处理逻辑来实现的。除此之外，还可以使用配置中心提供动态开关的手段进行服务降级。</p>`,18),i=s(`<p>降级示意图</p><p>动态开关方案需要依赖配置中心，并且配置中心和服务需要提供如下一些功能。</p><ul><li><p>启动主动拉取配置：服务启动时拉取配置相关数据，并缓存在本地。</p></li><li><p>发布订阅配置：当决定降级时，配置中心中保存的配置数据会被修改，服务需要感知该变更并主动更新本地缓存。</p></li><li><p>定时拉取配置：可以解决订阅配置失效等极端场景问题。</p></li></ul><p>在本课时的案例中我们使用 Go 语言实现的 etcd作为配置中心。</p><p>分布式系统将 etcd 用作配置管理、服务发现和协调分布式工作的一致键值存储组件。许多组织在生产系统上使用 etcd，例如容器调度程序、服务发现和分布式数据存储。所以，可以将服务降级相关的开关配置存储到 etcd 中，并供业务服务拉取和订阅。</p><p>这里我们看一下 Go 语言中如何去主动拉取 etcd配置，首先要使用 etcd 提供的客户端 API 初始化一个客户端，然后调用其 Get 方法获取对应键的数值，如下所示：</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (service </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">GoodsDetailServiceImpl) </span><span style="color:#B392F0;">InitConfig</span><span style="color:#E1E4E8;">(ctx context.Context) {</span></span>
<span class="line"><span style="color:#E1E4E8;">   cli, _ </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> clientv3.</span><span style="color:#79B8FF;">New</span><span style="color:#E1E4E8;">(clientv3.Config{</span></span>
<span class="line"><span style="color:#E1E4E8;">      Endpoints:   []</span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">{</span><span style="color:#9ECBFF;">&quot;127.0.0.1:2379&quot;</span><span style="color:#E1E4E8;">},</span></span>
<span class="line"><span style="color:#E1E4E8;">      DialTimeout: </span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> time.Second,</span></span>
<span class="line"><span style="color:#E1E4E8;">   })</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#6A737D;">// get</span></span>
<span class="line"><span style="color:#E1E4E8;">   resp, _ </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> cli.</span><span style="color:#79B8FF;">Get</span><span style="color:#E1E4E8;">(ctx, </span><span style="color:#9ECBFF;">&quot;call_service_d&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> _, ev </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">range</span><span style="color:#E1E4E8;"> resp.Kvs {</span></span>
<span class="line"><span style="color:#E1E4E8;">      fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#79B8FF;">%s</span><span style="color:#9ECBFF;">:</span><span style="color:#79B8FF;">%s\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, ev.Key, ev.Value)</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">(ev.Key) </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;call_service_d&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">         service.callCommentService, _ </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> strconv.</span><span style="color:#79B8FF;">Atoi</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">(ev.Value))</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> (service </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">GoodsDetailServiceImpl) </span><span style="color:#6F42C1;">InitConfig</span><span style="color:#24292E;">(ctx context.Context) {</span></span>
<span class="line"><span style="color:#24292E;">   cli, _ </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> clientv3.</span><span style="color:#005CC5;">New</span><span style="color:#24292E;">(clientv3.Config{</span></span>
<span class="line"><span style="color:#24292E;">      Endpoints:   []</span><span style="color:#D73A49;">string</span><span style="color:#24292E;">{</span><span style="color:#032F62;">&quot;127.0.0.1:2379&quot;</span><span style="color:#24292E;">},</span></span>
<span class="line"><span style="color:#24292E;">      DialTimeout: </span><span style="color:#005CC5;">5</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> time.Second,</span></span>
<span class="line"><span style="color:#24292E;">   })</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#6A737D;">// get</span></span>
<span class="line"><span style="color:#24292E;">   resp, _ </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> cli.</span><span style="color:#005CC5;">Get</span><span style="color:#24292E;">(ctx, </span><span style="color:#032F62;">&quot;call_service_d&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> _, ev </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">range</span><span style="color:#24292E;"> resp.Kvs {</span></span>
<span class="line"><span style="color:#24292E;">      fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;</span><span style="color:#005CC5;">%s</span><span style="color:#032F62;">:</span><span style="color:#005CC5;">%s\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, ev.Key, ev.Value)</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">string</span><span style="color:#24292E;">(ev.Key) </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;call_service_d&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">         service.callCommentService, _ </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> strconv.</span><span style="color:#005CC5;">Atoi</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">string</span><span style="color:#24292E;">(ev.Value))</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>获取到对应降级开关的值后，服务 B 就可以根据该值来判断是否需要调用服务 D，当然没有必要在每次服务调用时都去 etcd 中获取一次开关的具体数值，而是在启动时就将数据缓存在本地，并且使用 etcd 的订阅功能，也就是它的 watch 功能。</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">rch </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> cli.</span><span style="color:#79B8FF;">Watch</span><span style="color:#E1E4E8;">(context.</span><span style="color:#79B8FF;">Background</span><span style="color:#E1E4E8;">(), </span><span style="color:#9ECBFF;">&quot;call_service_d&quot;</span><span style="color:#E1E4E8;">) </span><span style="color:#6A737D;">// &lt;-chan WatchResponse</span></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> wresp </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">range</span><span style="color:#E1E4E8;"> rch {</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> _, ev </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">range</span><span style="color:#E1E4E8;"> wresp.Events {</span></span>
<span class="line"><span style="color:#E1E4E8;">      fmt.</span><span style="color:#79B8FF;">Printf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Type: </span><span style="color:#79B8FF;">%s</span><span style="color:#9ECBFF;"> Key:</span><span style="color:#79B8FF;">%s</span><span style="color:#9ECBFF;"> Value:</span><span style="color:#79B8FF;">%s\\n</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">, ev.Type, ev.Kv.Key, ev.Kv.Value)</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">(ev.Kv.Key) </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;call_service_d&quot;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">         service.callCommentService, _ </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> strconv.</span><span style="color:#79B8FF;">Atoi</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">(ev.Kv.Value))</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">rch </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> cli.</span><span style="color:#005CC5;">Watch</span><span style="color:#24292E;">(context.</span><span style="color:#005CC5;">Background</span><span style="color:#24292E;">(), </span><span style="color:#032F62;">&quot;call_service_d&quot;</span><span style="color:#24292E;">) </span><span style="color:#6A737D;">// &lt;-chan WatchResponse</span></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> wresp </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">range</span><span style="color:#24292E;"> rch {</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> _, ev </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">range</span><span style="color:#24292E;"> wresp.Events {</span></span>
<span class="line"><span style="color:#24292E;">      fmt.</span><span style="color:#005CC5;">Printf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Type: </span><span style="color:#005CC5;">%s</span><span style="color:#032F62;"> Key:</span><span style="color:#005CC5;">%s</span><span style="color:#032F62;"> Value:</span><span style="color:#005CC5;">%s\\n</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">, ev.Type, ev.Kv.Key, ev.Kv.Value)</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#005CC5;">string</span><span style="color:#24292E;">(ev.Kv.Key) </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;call_service_d&quot;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">         service.callCommentService, _ </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> strconv.</span><span style="color:#005CC5;">Atoi</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">string</span><span style="color:#24292E;">(ev.Kv.Value))</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>如上代码所示，服务 B 可以订阅监听 etcd 中 call_service_d 这个键，如果其发生改变，比如我们手动更改了服务降级开关的配置，则服务 B 可以获取到该变化，对应的 Watch 方法就会返回，然后服务 B 更新本地的数据，从而进行服务降级，不需要再调用次要链路服务 D。</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">func</span><span style="color:#E1E4E8;"> (service </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">GoodsDetailServiceImpl) </span><span style="color:#B392F0;">GetGoodsDetail</span><span style="color:#E1E4E8;">(ctx context.Context, id </span><span style="color:#F97583;">string</span><span style="color:#E1E4E8;">) (GoodsDetailVO, </span><span style="color:#F97583;">error</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">   detail </span><span style="color:#F97583;">:=</span><span style="color:#E1E4E8;"> GoodsDetailVO{Id: id, Name:</span><span style="color:#9ECBFF;">&quot;Name&quot;</span><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#6A737D;">// 根据 callCommentService 来判断是否要调用次要服务</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> service.callCommentService </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      detail.Comments, _ </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">GetGoodsComments</span><span style="color:#E1E4E8;">(id)</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">error</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> err </span><span style="color:#F97583;">!=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">nil</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> detail, err</span></span>
<span class="line"><span style="color:#E1E4E8;">   }</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> detail,</span><span style="color:#79B8FF;">nil</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">func</span><span style="color:#24292E;"> (service </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">GoodsDetailServiceImpl) </span><span style="color:#6F42C1;">GetGoodsDetail</span><span style="color:#24292E;">(ctx context.Context, id </span><span style="color:#D73A49;">string</span><span style="color:#24292E;">) (GoodsDetailVO, </span><span style="color:#D73A49;">error</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">   detail </span><span style="color:#D73A49;">:=</span><span style="color:#24292E;"> GoodsDetailVO{Id: id, Name:</span><span style="color:#032F62;">&quot;Name&quot;</span><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#6A737D;">// 根据 callCommentService 来判断是否要调用次要服务</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> service.callCommentService </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      detail.Comments, _ </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">GetGoodsComments</span><span style="color:#24292E;">(id)</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">error</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> err </span><span style="color:#D73A49;">!=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">nil</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> detail, err</span></span>
<span class="line"><span style="color:#24292E;">   }</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> detail,</span><span style="color:#005CC5;">nil</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>如上述代码所示，业务逻辑中根据 etcd 中键值来进行判断，如果不等于 0 则调用次要服务来获取商品的评论，否则就不调用。</p><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3><p>在本课时，我为你讲述了限流和降级的具体使用场景和区别：<strong>限流</strong> 是为了应对突发的大流量，保护系统不被冲垮；而<strong>服务降级</strong>则是以牺牲部分非核心服务来提高系统的整体性能。接着我们又分别学习了有关限流和降级的具体实现案例，了解了 etcd 的相关使用。</p><p>那么，除了使用 etcd 作为配置中心，还有哪些可以使用的中间件呢？它们之间又有哪些异同或优劣点呢？欢迎你留言，我们一起讨论分析。</p>`,15);function d(F,C,_,g,u,v){const a=o("Image");return e(),t("div",null,[r,n(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/4F/F9/CgqCHl9hpCCAZePCAABZjumIw_A149.png"}),l(),E,n(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/4F/EE/Ciqc1F9hpDCAPo2GAABR4306i7Q796.png"}),l(),y,n(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/4F/F9/CgqCHl9hpE2AMoEtAABJPMCu7CE561.png"}),l(),i])}const A=p(c,[["render",d]]);export{m as __pageData,A as default};
