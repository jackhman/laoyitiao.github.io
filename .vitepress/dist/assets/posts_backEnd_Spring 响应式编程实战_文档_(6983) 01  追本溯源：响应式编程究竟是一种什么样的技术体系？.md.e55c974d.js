import{_ as e,j as o,o as t,h as c,k as p,f as a,Q as l,s}from"./chunks/framework.d3daa342.js";const w=JSON.parse('{"title":"01追本溯源：响应式编程究竟是一种什么样的技术体系？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring 响应式编程实战_文档/(6983) 01  追本溯源：响应式编程究竟是一种什么样的技术体系？.md","filePath":"posts/backEnd/Spring 响应式编程实战_文档/(6983) 01  追本溯源：响应式编程究竟是一种什么样的技术体系？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/Spring 响应式编程实战_文档/(6983) 01  追本溯源：响应式编程究竟是一种什么样的技术体系？.md"},E=l(`<h1 id="_01追本溯源-响应式编程究竟是一种什么样的技术体系" tabindex="-1">01追本溯源：响应式编程究竟是一种什么样的技术体系？ <a class="header-anchor" href="#_01追本溯源-响应式编程究竟是一种什么样的技术体系" aria-label="Permalink to &quot;01追本溯源：响应式编程究竟是一种什么样的技术体系？&quot;">​</a></h1><p>响应式编程是一种新的编程技术，其目的是构建响应式系统。对于响应式系统而言，任何时候都需要确保具备即时响应性，这是大多数日常业务场景所需要的，但却是一项非常复杂而有挑战性的任务，需要对相关技术体系有深入的了解。</p><p>那么在今天的课程中，我会先从传统的开发模式讲起，并引入异步执行的相关技术，因为异步执行是响应式技术体系的基础。在此基础上，我将为你详细阐述响应式编程的各项技术特点。</p><h3 id="从传统开发模式到异步执行技术" tabindex="-1">从传统开发模式到异步执行技术 <a class="header-anchor" href="#从传统开发模式到异步执行技术" aria-label="Permalink to &quot;从传统开发模式到异步执行技术&quot;">​</a></h3><p>现实的开发过程普遍采用的是同步阻塞式的开发模式，以实现业务系统。在这种模式下，开发、调试和维护都很简单。我们先以 Web 系统中最常见的 HTTP 请求为例，来分析其背后的 I/O 模型，从而让你对传统开发模式有进一步的了解。</p><h4 id="web-请求与-i-o-模型" tabindex="-1">Web 请求与 I/O 模型 <a class="header-anchor" href="#web-请求与-i-o-模型" aria-label="Permalink to &quot;Web 请求与 I/O 模型&quot;">​</a></h4><p>如果你使用 Spring 框架开发过 Web 应用程序，那么你一定对下面这段代码非常熟悉。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">RestTemplate restTemplate </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">RestTemplate</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">ResponseEntity&lt;</span><span style="color:#F97583;">User</span><span style="color:#E1E4E8;">&gt; restExchange </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> restTemplate.</span><span style="color:#B392F0;">exchange</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#9ECBFF;">&quot;http://localhost:8080/users/{userName}&quot;</span><span style="color:#E1E4E8;">, HttpMethod.GET, </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">, User.class, userName);</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">User result </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> restExchange.</span><span style="color:#B392F0;">getBody</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#B392F0;">process</span><span style="color:#E1E4E8;">(result);                                              </span></span>
<span class="line"><span style="color:#E1E4E8;">...</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">RestTemplate restTemplate </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">RestTemplate</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">ResponseEntity&lt;</span><span style="color:#D73A49;">User</span><span style="color:#24292E;">&gt; restExchange </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> restTemplate.</span><span style="color:#6F42C1;">exchange</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#032F62;">&quot;http://localhost:8080/users/{userName}&quot;</span><span style="color:#24292E;">, HttpMethod.GET, </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">, User.class, userName);</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">User result </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> restExchange.</span><span style="color:#6F42C1;">getBody</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#6F42C1;">process</span><span style="color:#24292E;">(result);                                              </span></span>
<span class="line"><span style="color:#24292E;">...</span></span></code></pre></div><p>这里，我们传入用户名 UserName 调用远程服务获取一个 User 对象，技术上使用了 Spring MVC 中的 RestTemplate 模板工具类，通过该类所提供的 exchange 方法对远程 Web 服务所暴露的 HTTP 端点发起了请求，并对所获取的响应结果进行进一步处理。</p><p>这是日常开发过程中非常具有代表性的一种场景，整个过程很熟悉也很自然。</p><p>那么，这个实现过程背后有没有一些可以改进的地方呢？为了更好地分析整个调用过程，我们假设服务的提供者为服务 A，而服务的消费者为服务 B，那么这两个服务的交互过程应该是下图所示这样的。</p>`,11),i=s("p",null,"图 1 服务 A 和服务 B 的交互过程图",-1),y=s("p",null,"可以看到，当服务 B 向服务 A 发送 HTTP 请求时，线程 B 只有在发起请求和响应结果的一小部分时间内在有效使用 CPU，而更多的时间则只是在阻塞式地等待来自服务 A 中线程的处理结果。显然，整个过程的 CPU 利用效率是很低的，很多时间线程被浪费在了 I/O 阻塞上，无法执行其他的处理过程。",-1),_=s("p",null,"更进一步，我们继续分析服务 A 中的处理过程。如果我们采用典型的 Web 服务分层架构，那么就可以得到如图 2 所示的用户信息查询实现时序图，这是日常开发过程中普遍采用的一种实现方式。",-1),u=s("p",null,"一般我们使用 Web 层所提供的 HTTP 端点作为查询的操作入口，然后该操作入口会进一步调用包含业务逻辑处理的服务层，而服务层再调用数据访问层，数据访问层就会连接到数据库获取数据。数据从数据库中获取之后逐层向上传递，最后返回给服务的调用者。",-1),h=s("p",null,"图 2 基于传统实现方法的用户信息查询场景时序图",-1),d=s("p",null,"显然图 2 所展示的整个过程中，每一步的操作过程都存在着前面描述的线程等待问题。也就是说，整个技术栈中的每一个环节都可能是同步阻塞的。",-1),g=s("p",null,"针对同步阻塞问题，在技术上也可以引入一些实现技术来将同步调用转化为异步调用。我们一起来看一下。",-1),A=s("h4",{id:"异步调用的实现技术",tabindex:"-1"},[a("异步调用的实现技术 "),s("a",{class:"header-anchor",href:"#异步调用的实现技术","aria-label":'Permalink to "异步调用的实现技术"'},"​")],-1),m=s("p",null,"在 Java 世界中，为了实现异步非阻塞，一般会采用回调和 Future 这两种机制，但这两种机制都存在一定局限性。",-1),b=s("p",null,"回调的含义如图 3 所示，即服务 B 的 methodB() 方法调用服务 A 的 methodA() 方法，然后服务 A 的 methodA() 方法执行完毕后，再主动调用服务 B 的 callback() 方法。",-1),F=l(`<p>图 3 回调示意图</p><p>回调体现的是一种双向的调用方式，实现了服务 A 和服务 B 之间的解耦。在这个 callback 回调方法中，回调的执行是由任务的结果来触发的，所以我们就可以异步来执行某项任务，从而使得调用链路不发生任何的阻塞。</p><p>回调的最大问题是复杂性，一旦在执行流程中包含了多层的异步执行和回调，那么就会形成一种嵌套结构，给代码的开发和调试带来很大的挑战。所以回调很难大规模地组合起来使用，因为很快就会导致代码难以理解和维护，从而造成所谓的&quot;回调地狱&quot;问题。</p><p>讲完回调，我们来看 Future。可以把 Future 模式简单理解为这样一种场景：我们有一个需要处理的任务，然后把这个任务提交到 Future，Future 就会在一定时间内完成这个任务，而在这段时间内我们可以去做其他事情。作为 Future 模式的实现，Java 中的 Future 接口只包含如下 5 个方法。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Future</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#F97583;">V</span><span style="color:#E1E4E8;">&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//取消任务的执行</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">cancel</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">mayInterruptIfRunning</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//判断任务是否已经取消</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">isCancelled</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//判断任务是否已经完成</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">isDone</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//等待任务执行结束并获取结果</span></span>
<span class="line"><span style="color:#E1E4E8;">    V </span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> InterruptedException, ExecutionException;</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">//在一定时间内等待任务执行结束并获取结果</span></span>
<span class="line"><span style="color:#E1E4E8;">    V </span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">long</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">timeout</span><span style="color:#E1E4E8;">, TimeUnit </span><span style="color:#FFAB70;">unit</span><span style="color:#E1E4E8;">)?</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">throws</span><span style="color:#E1E4E8;"> InterruptedException, ExecutionException, TimeoutException;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Future</span><span style="color:#24292E;">&lt;</span><span style="color:#D73A49;">V</span><span style="color:#24292E;">&gt; {</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//取消任务的执行</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">cancel</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#E36209;">mayInterruptIfRunning</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//判断任务是否已经取消</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">isCancelled</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//判断任务是否已经完成</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">isDone</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//等待任务执行结束并获取结果</span></span>
<span class="line"><span style="color:#24292E;">    V </span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> InterruptedException, ExecutionException;</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">//在一定时间内等待任务执行结束并获取结果</span></span>
<span class="line"><span style="color:#24292E;">    V </span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">long</span><span style="color:#24292E;"> </span><span style="color:#E36209;">timeout</span><span style="color:#24292E;">, TimeUnit </span><span style="color:#E36209;">unit</span><span style="color:#24292E;">)?</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">throws</span><span style="color:#24292E;"> InterruptedException, ExecutionException, TimeoutException;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>从这些基础方法中可以看到，我们可以通过对任务进行灵活的控制和判断，来达到一定的异步执行效果。</p><p>但从本质上讲，Future 以及由 Future 所衍生出来的 CompletableFuture 等各种优化方案就是一种多线程技术。多线程假设一些线程可以共享一个 CPU，而 CPU 时间能在多个线程之间共享，这一点就引入了&quot;上下文切换&quot;的概念。</p><p>如果想要恢复线程，就需要涉及加载和保存寄存器等一系列计算密集型的操作。因此，大量线程之间的相互协作同样会导致资源利用效率低下。</p><p>那么以上我们对传统开发模式以及异步调用实现方式做了一些回顾，下面引出本讲的重点内容------响应式编程实现方法。</p><h3 id="响应式编程实现方法" tabindex="-1">响应式编程实现方法 <a class="header-anchor" href="#响应式编程实现方法" aria-label="Permalink to &quot;响应式编程实现方法&quot;">​</a></h3><h4 id="观察者模式和发布-订阅模式" tabindex="-1">观察者模式和发布-订阅模式 <a class="header-anchor" href="#观察者模式和发布-订阅模式" aria-label="Permalink to &quot;观察者模式和发布-订阅模式&quot;">​</a></h4><p>在引入响应式编程技术之前，我们同样先来回顾一个大家可能都知道的设计模式，即观察者模式。观察者模式拥有一个主题（Subject），其中包含其依赖者列表，这些依赖者被称为观察者（Observer）。主题可以通过一定的机制将任何状态变化通知到观察者。针对前面介绍的用户信息查询操作，我们同样可以应用观察者模式，如下图所示。</p>`,12),C=s("p",null,"图 4 观察者模式下的用户信息获取过程",-1),T=s("p",null,"如果系统中存在一批类似上图中的用户信息获取场景，针对每个场景都实现一套观察者模式显然是不合适的。更好的方法是使用发布-订阅模式，该模式可以认为是对观察者模式的一种改进。",-1),D=s("p",null,"在这一模式中，发布者和订阅者之间可以没有直接的交互，而是通过发送事件到事件处理平台的方式来完成整合，如下图所示。",-1),B=s("p",null,"图 5 发布-订阅模式下的用户信息获取过程",-1),x=s("p",null,"由此可见，通过发布-订阅模式，我们可以基于同一套事件发布机制和事件处理平台来应对多种业务场景，不同的场景只需要发送不同的事件即可。",-1),P=s("p",null,"同样，如果我们聚焦于服务 A 的内部，那么从 Web 服务层到数据访问层，再到数据库的整个调用链路，同样可以采用发布-订阅模式进行重构。这时候，我们希望当数据库中的数据一有变化就通知上游组件，而不是上游组件通过主动拉取数据的方式来获取数据。下图展示了这一过程。",-1),q=l('<p>图 6 基于响应式实现方法的用户信息查询场景时序图</p><p>显然，现在我们的处理方式发生了本质性的变化。图 6 中，我们没有通过同步执行的方式来获取数据，而是订阅了一个 UserChangedEvent 事件。UserChangedEvent 事件会根据用户信息是否发生变化而进行触发，并在 Web 应用程序的各个层之间进行传播。如果我们在这些层上都对这个事件进行了订阅，那么就可以对其分别进行处理，并最终将处理结果从服务 A 传播到服务 B 中。</p><h4 id="数据流与响应式" tabindex="-1">数据流与响应式 <a class="header-anchor" href="#数据流与响应式" aria-label="Permalink to &quot;数据流与响应式&quot;">​</a></h4><p>接下来，我们扩大讨论范围，来想象系统中可能会存在着很多类似 UserChangedEvent 这样的事件。每一种事件会基于用户的操作或者系统自身的行为而被触发，并形成了一个事件的集合。针对事件的集合，我们可以把它们看成是一串串联起来的数据流，而系统的响应能力就体现在对这些数据流的即时响应过程上。</p><p>数据流对于技术栈而言是一个全流程的概念。也就是说，无论是从底层数据库，向上到达服务层，最后到 Web 服务层，抑或是在这个流程中所包含的任意中间层组件，整个数据传递链路都应该是采用事件驱动的方式来进行运作的。</p><p>这样，我们就可以不采用传统的同步调用方式来处理数据，而是由处于数据库上游的各层组件自动来执行事件。<strong>这就是响应式编程的核心特点</strong>。</p><p>相较传统开发所普遍采用的&quot;拉&quot;模式，在响应式编程下，基于事件的触发和订阅机制，这就形成了一种类似&quot;推&quot;的工作方式。这种工作方式的优势就在于，生成事件和消费事件的过程是异步执行的，所以线程的生命周期都很短，也就意味着资源之间的竞争关系较少，服务器的响应能力也就越高。</p><h3 id="响应式宣言和响应式系统" tabindex="-1">响应式宣言和响应式系统 <a class="header-anchor" href="#响应式宣言和响应式系统" aria-label="Permalink to &quot;响应式宣言和响应式系统&quot;">​</a></h3><p>讲到这里，在理论和实践的结合下，你应该已经意识到，所谓的&quot;响应式&quot;并不是一件颠覆式的事情，而只是一种新型的编程模式。它不局限于某种开发框架，也并非解决分布式环境下所有问题的银弹，而是随着技术的发展自然而然诞生的一种技术体系。</p><p>关于响应式，业界也存在一个著名的响应式宣言，下图就是响应式宣言的官方网站给出的，对于这一宣言的图形化描述。</p>',10),k=l('<p>图 7 响应式宣言</p><p>可以看到，即时响应性（Responsive）、回弹性（Resilient）、弹性（Elastic）以及消息驱动（Message Driven）构成了响应式宣言的主体内容。响应式宣言认为，具备上图中各个特性的系统，就可以称为响应式系统。</p><p>而这些特性又可以分为三个层次，其中即时响应性、可维护性（Maintainable）和扩展性（Extensible）体现的是价值，回弹性和弹性是表现形式，而消息驱动则是实现手段。</p><p>从设计理念上讲，即时响应性指的就是无论在任何时候，系统都会及时地做出响应，并对那些出现的问题进行快速的检测和处理，这是可用性的基石。</p><p>要注意，这里的回弹性和弹性比较容易混用。<strong>所谓回弹性指的是系统在出现失败时，依然能够保持即时响应性；而弹性则是指的系统在各种请求压力之下，都能保持即时响应性</strong>。</p><p>最后的消息驱动指的是响应式系统需要构建异步的消息通信机制。你可以把这里的消息等同于前面提到的事件，通过使用消息通信，可以通过在系统中实现连续的数据流，从而达到对流量进行控制的管理目标。我们知道消息通信是非阻塞的，非阻塞的通信使得只有在有消息到来时才需要资源的投入，而避免了很多同步等待导致的资源浪费。</p><h3 id="小结与预告" tabindex="-1">小结与预告 <a class="header-anchor" href="#小结与预告" aria-label="Permalink to &quot;小结与预告&quot;">​</a></h3><p>本讲系统分析了响应式编程和响应式系统的概念和实现方法，并引出了响应式宣言。就技术演进的过程和趋势而言，响应式编程的出现有其必然性。另一方面，响应式编程也不是一种完全颠覆式的技术体系，而是在现有的异步调用、观察者模式、发布-订阅模式等的基础上发展起来的一种全新的编程模式，能够给系统带来即时响应性。</p><p>这里给你留一道思考题：你能简要描述响应式编程模型中数据流的概念和作用吗？</p><p>在接下来的课程中，我们将正式进入到响应式编程这一技术体系的学习。下一讲，我们将深入剖析响应式数据流的类型和组成，并引出相关的核心编程组件，到时见。</p><blockquote><p>点击链接，获取课程相关代码↓↓↓<br><a href="https://github.com/lagoueduCol/ReactiveProgramming-jianxiang.git?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">https://github.com/lagoueduCol/ReactiveProgramming-jianxiang.git</a></p></blockquote>',11);function v(I,U,f,S,V,R){const n=o("Image");return t(),c("div",null,[E,p(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/21/36/Cgp9HWBUHYyAWK7RAACbGUwiNJI141.png"}),a(),i,y,_,u,p(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M01/21/34/CioPOWBUIG2APMzTAAG4Hgs9bQk059.png"}),a(),h,d,g,A,m,b,p(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M01/21/34/CioPOWBUIHmAV0OeAACBv4hHbo0240.png"}),a(),F,p(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M01/21/34/CioPOWBUIISALAvPAACra6PO8ac132.png"}),a(),C,T,D,p(n,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image6/M01/21/34/CioPOWBUIIuAWD5cAAC5GORZj7Y689.png"}),a(),B,x,P,p(n,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image6/M01/21/38/Cgp9HWBUIJSAXaqcAAH7KKi1LAk978.png"}),a(),q,p(n,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image6/M01/21/35/CioPOWBUIJ6AeBjQAADBZrcBck4263.png"}),a(),k])}const N=e(r,[["render",v]]);export{w as __pageData,N as default};
