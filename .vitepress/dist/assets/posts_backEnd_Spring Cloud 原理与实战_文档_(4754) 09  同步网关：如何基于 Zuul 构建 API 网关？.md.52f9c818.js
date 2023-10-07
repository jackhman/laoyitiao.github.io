import{_ as e,j as o,o as t,g as r,k as l,h as a,s,Q as p}from"./chunks/framework.4e7d56ce.js";const C=JSON.parse('{"title":"09同步网关：如何基于Zuul构建API网关？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4754) 09  同步网关：如何基于 Zuul 构建 API 网关？.md","filePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4754) 09  同步网关：如何基于 Zuul 构建 API 网关？.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/Spring Cloud 原理与实战_文档/(4754) 09  同步网关：如何基于 Zuul 构建 API 网关？.md"},i=s("h1",{id:"_09同步网关-如何基于zuul构建api网关",tabindex:"-1"},[a("09同步网关：如何基于Zuul构建API网关？ "),s("a",{class:"header-anchor",href:"#_09同步网关-如何基于zuul构建api网关","aria-label":'Permalink to "09同步网关：如何基于Zuul构建API网关？"'},"​")],-1),u=s("p",null,[a("今天我们开始讨论 Spring Cloud 中的另一个核心技术组件，"),s("strong",null,"API 网关"),a("。")],-1),E=s("p",null,"我们先来简单介绍 API 网关的基本结构，然后给出 Spring Cloud 中关于 API 网关的解决方案。今天的内容重点是介绍如何使用 Zuul 这一特定工具来构建 API 网关的实现过程。",-1),y=s("h3",{id:"什么是-api-网关",tabindex:"-1"},[a("什么是 API 网关？ "),s("a",{class:"header-anchor",href:"#什么是-api-网关","aria-label":'Permalink to "什么是 API 网关？"'},"​")],-1),d=s("p",null,"在微服务架构中，API 网关（也叫服务网关）的出现有其必然性。通常，单个微服务提供的 API 粒度与客户端请求的粒度不一定完全匹配。多个服务之间通过对细粒度 API 的聚合才能满足客户端的要求。更为重要的是，网关能够起到客户端与微服务之间的隔离作用。随着业务需求的变化和时间的演进，网关背后的各个微服务的划分和实现可能需要做相应的调整和升级。这种调整和升级应该实现对客户端透明，如下所示：",-1),h=p("<p>API 网关的聚合和隔离作用示意图</p><p>当然，如果我们在服务调用过程中添加了一个网关层，那么所有的客户端都通过这个统一的网关接入微服务。这样一些非业务功能性需求就可以在网关层进行集中处理。这些需求中，比较常见的包括<strong>请求监控</strong> 、<strong>安全管理</strong> 、<strong>路由规则</strong> 、<strong>日志记录</strong> 、<strong>访问控制</strong> 、<strong>服务适配</strong>等功能：</p>",2),v=p(`<p>服务网关的处理机制</p><p>在 Spring Cloud 中，针对 API 网关的实现提供了两种解决方案。一种是集成 Netflix 中的 Zuul 网关，一种是自研 Spring Cloud Gateway。接下来，我们先来讨论如何使用 Zuul 构建 API 网关。</p><h3 id="如何使用-zuul-构建-api-网关" tabindex="-1">如何使用 Zuul 构建 API 网关？ <a class="header-anchor" href="#如何使用-zuul-构建-api-网关" aria-label="Permalink to &quot;如何使用 Zuul 构建 API 网关？&quot;">​</a></h3><p>我们在《案例驱动：如何通过实战案例来学习 Spring Cloud 框架？》中提到，与其他微服务一样，服务网关本身同样是一种服务，也是一个标准的 Spring Boot 应用程序。为了构建 Zuul 服务器，我们创建一下新的 Maven 工程 zuul-server，并引入 spring-cloud-starter-netflix-zuul 依赖，如下所示。</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;org.springframework.cloud&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;spring-cloud-starter-netflix-zuul&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;org.springframework.cloud&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;spring-cloud-starter-netflix-zuul&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>然后我们创建 Bootstrap 类，代码如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">SpringBootApplication</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">EnableZuulProxy</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ZuulServerApplication</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	 </span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        SpringApplication.</span><span style="color:#B392F0;">run</span><span style="color:#E1E4E8;">(ZuulServerApplication.class, args);</span></span>
<span class="line"><span style="color:#E1E4E8;">     }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">SpringBootApplication</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">EnableZuulProxy</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ZuulServerApplication</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	 </span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        SpringApplication.</span><span style="color:#6F42C1;">run</span><span style="color:#24292E;">(ZuulServerApplication.class, args);</span></span>
<span class="line"><span style="color:#24292E;">     }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这里引入了一个新的注解 @EnableZuulProxy，嵌入该注解的 Bootstrap 类将自动成为 Zuul 服务器的入口。@EnableZuulProxy 注解非常强大，我们基于该注解就可以使用 Zuul 中的各种内置过滤器实现复杂的服务路由，关于 Zuul 提供的过滤器以及实现原理我们将在下一课时中进行详细介绍。</p><p>API 网关的定位和功能势必涉及服务的发现和调用，所以 API 网关与注册中心关系密切。以Eureka 为代表的注册中心为服务路由提供了服务定义信息，这是能够实现服务路由的基础。为了与 Eureka 进行交互，在 zuul-server 中，我们需要向 application.yml 配置文件中添加对 Eureka 的集成。配置内容如下所示，关于各个配置项的内容我们已经在介绍 Eureka 时做了详细介绍，这里不再赘述。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">server</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  port</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">5555</span></span>
<span class="line"><span style="color:#E1E4E8;">	 </span></span>
<span class="line"><span style="color:#E1E4E8;">eureka</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  instance</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    preferIpAddress</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">  client</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    registerWithEureka</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">    fetchRegistry</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">    serviceUrl</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">	   defaultZone</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> http</span><span style="color:#F97583;">:</span><span style="color:#6A737D;">//localhost:8761/eureka/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">server</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">  port</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">5555</span></span>
<span class="line"><span style="color:#24292E;">	 </span></span>
<span class="line"><span style="color:#24292E;">eureka</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">  instance</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">    preferIpAddress</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">  client</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">    registerWithEureka</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">    fetchRegistry</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">    serviceUrl</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">	   defaultZone</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> http</span><span style="color:#D73A49;">:</span><span style="color:#6A737D;">//localhost:8761/eureka/</span></span></code></pre></div><p>另一方面，API 网关在其服务的消费者和提供者之间提供了一层反向代理，充当着前置负载均衡器的角色。所以，API 网关的定位决定了 Zuul 需要依赖 Ribbon。而 Zuul 可以与 Ribbon 完成无缝集成，我们在后续内容中会看到相关的示例。</p><h3 id="如何使用-zuul-实现服务路由" tabindex="-1">如何使用 Zuul 实现服务路由？ <a class="header-anchor" href="#如何使用-zuul-实现服务路由" aria-label="Permalink to &quot;如何使用 Zuul 实现服务路由？&quot;">​</a></h3><p>对于 API 网关而言，最重要的功能就是服务路由，即通过 Zuul 访问的请求会路由并转发到对应的后端服务中。通过 Zuul 进行服务访问的 URL 通用格式如下所示：</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">http://zuulservice:5555/service</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">http://zuulservice:5555/service</span></span></code></pre></div><p>其中 zuulservice 代表 Zuul 服务器的地址。而这里的 service 所对应的后端服务的确定就需要依赖位于 Zuul 中的服务路由信息。在 Zuul 中，服务路由信息的设置可以使用以下几种常见做法，让我们一一来展开讨论。</p><h4 id="基于服务发现映射服务路由" tabindex="-1">基于服务发现映射服务路由 <a class="header-anchor" href="#基于服务发现映射服务路由" aria-label="Permalink to &quot;基于服务发现映射服务路由&quot;">​</a></h4><p>Zuul 可以基于注册中心的服务发现机制实现自动化服务路由功能。所以使用 Zuul 实现服务路由最常见的、也最推荐的做法就是利用这种自动化的路由映射关系来确定路由信息。</p><p>从开发角度讲，系统自动映射也最简单。我们不需要做任何事情，因为在 Eureka 中已经保存了各种服务定义信息。而服务定义信息中包含了各个服务的名称，所以 Zuul 就可以把这些服务的名称与目标服务进行自动匹配。匹配的规则就是直接将目标服务映射到服务名称上。</p><p>例如，我们在 user-service 的配置文件中通过以下配置项指定了该服务的名称为 userservice：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">spring</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">   application</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">	   name</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> userservice</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">spring</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">   application</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">	   name</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> userservice</span></span></code></pre></div><p>这样我们就可以通过<a href="http://zuulservice:5555/userservice" target="_blank" rel="noreferrer">http://zuulservice:5555/userservice</a>访问到该服务，注意该 URL 中的目标服务就是 userservice，与服务定义中的名称保持一致。</p><p>在 Zuul 启动的过程中，会从 Eureka 中获取当前所有已注册的服务信息，然后自动生成服务名称与目标服务之间的映射关系。现在，让我们来演示一下。我们先后启动 eureka-server、user-service 和 zuul-service，然后访问以下地址：</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">http://localhost:5555/actuator/routes&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">http://localhost:5555/actuator/routes&quot;</span></span></code></pre></div><p>这时候可以看到如下所示的键值对信息，这些键值对信息实际上就是服务路由映射信息：</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">	  &quot;/userservice/**&quot;:&quot;userservice&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">	  &quot;/userservice/**&quot;:&quot;userservice&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><a href="http://localhost:5555/actuator/routes%E2%80%9D" target="_blank" rel="noreferrer">http://localhost:5555/actuator/routes&quot;</a> 是 Zuul 提供的服务路由端点，展示了目前在 Zuul 中配置的服务路由信息。其中&quot;/userservice/**&quot;中后半部分的&quot;**&quot;代表所有访问该路径以及子路径的请求都将被自动路由到注册在 Eureka 中的名为 userservice 的某一个服务实例中。</p><p>当采用这种系统自动映射方式时，如果我们注册一个新服务或下线某个已有服务，那么这份映射列表也会做相应的调整。整个过程对于开发人员完全透明可见。</p><h4 id="基于动态配置映射服务路由" tabindex="-1">基于动态配置映射服务路由 <a class="header-anchor" href="#基于动态配置映射服务路由" aria-label="Permalink to &quot;基于动态配置映射服务路由&quot;">​</a></h4><p>基于服务发现机制的系统自动映射非常方便，但也有明显的局限性。在日常开发过程中，我们往往对服务映射关系有更多的定制化需求，比方说不使用默认的服务名称来命名目标服务，或者在各个请求路径之前加一个统一的前缀（Prefix）等。Zuul 充分考虑到了这些需求，开发和运维人员可以通过配置实现服务路由的灵活映射。</p><p>首先我们可以在 zuul-server 工程下的 application.yml 配置文件中为 user-service 配置特定的服务名称与请求地址之间的映射关系，如下所示：</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">zuul:</span></span>
<span class="line"><span style="color:#E1E4E8;">   routes:</span></span>
<span class="line"><span style="color:#E1E4E8;">     userservice: /user/**</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">zuul:</span></span>
<span class="line"><span style="color:#24292E;">   routes:</span></span>
<span class="line"><span style="color:#24292E;">     userservice: /user/**</span></span></code></pre></div><p>注意，这里我们使用 /user 来为 user-service 指定请求根地址。现在我们访问 <a href="http://zuulservice:5555/user/" target="_blank" rel="noreferrer">http://zuulservice:5555/user/</a> 时，就相当于将请求发送给了 Eureka 中的 userservice 实例。</p><p>现在我们重启 zuul-server 并访问 <a href="http://localhost:5555/actuator/routes%E2%80%9D" target="_blank" rel="noreferrer">http://localhost:5555/actuator/routes&quot;</a> 端点，得到的服务路由映射关系就变成了如下结果：</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">	   &quot;/user/**&quot;:&quot;userservice&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">	  &quot;/userservice/**&quot;:&quot;userservice&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">	   &quot;/user/**&quot;:&quot;userservice&quot;,</span></span>
<span class="line"><span style="color:#24292E;">	  &quot;/userservice/**&quot;:&quot;userservice&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>可以看到在原有路由信息的基础上，Zuul 生成了一条新的路由信息，对应配置文件中的配置。现在，相当于将访问某一个服务的入口变成了两个：一个是系统自动映射的路由，一个是通过配置所生成的路由。当我们不希望系统自动映射的路由被外部使用时，我们就可以通过 ignored-services 配置项把它们从服务路由中去掉。再次以 userservice 为例，ignored-services 配置项的使用方法如下所示。</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">zuul:</span></span>
<span class="line"><span style="color:#E1E4E8;">   routes:</span></span>
<span class="line"><span style="color:#E1E4E8;">     ignored-services: &#39;userservice&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">     userservice: /user/**</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">zuul:</span></span>
<span class="line"><span style="color:#24292E;">   routes:</span></span>
<span class="line"><span style="color:#24292E;">     ignored-services: &#39;userservice&#39;</span></span>
<span class="line"><span style="color:#24292E;">     userservice: /user/**</span></span></code></pre></div><p>让我们考虑另外一个比较常见的应用场景，在一个大型的微服务架构中，可能会有非常多的微服务。这就需要对这些服务进行全局性的规划，可以通过模块或子系统的方式进行管理。表现在路由信息上，在各个服务请求地址上添加一个前缀用来标识模块和子系统是一项最佳实践。针对这种场景，就可以用到 Zuul 提供的&quot;prefix&quot;配置项，示例如下所示：</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">zuul:</span></span>
<span class="line"><span style="color:#E1E4E8;">	prefix:  /springhealth</span></span>
<span class="line"><span style="color:#E1E4E8;">    routes:</span></span>
<span class="line"><span style="color:#E1E4E8;">      ignored-services: &#39;userservice&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">       userservice: /user/**</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">zuul:</span></span>
<span class="line"><span style="color:#24292E;">	prefix:  /springhealth</span></span>
<span class="line"><span style="color:#24292E;">    routes:</span></span>
<span class="line"><span style="color:#24292E;">      ignored-services: &#39;userservice&#39;</span></span>
<span class="line"><span style="color:#24292E;">       userservice: /user/**</span></span></code></pre></div><p>我们将&quot;prefix&quot;配置项设置为&quot;/springhealth&quot;，代表所有配置的路由请求地址之前都会自动添加&quot;/springhealth&quot;前缀，用来识别这些请求的都属于 springhealth 微服务系统。现在访问 <a href="http://localhost:5555/actuator/routes%E2%80%9D" target="_blank" rel="noreferrer">http://localhost:5555/actuator/routes&quot;</a> 端点，可以看到所配置的前缀已经生效，如下所示：</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">	    &quot;/springhealth/user/**&quot;:&quot;userservice&quot; </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">	    &quot;/springhealth/user/**&quot;:&quot;userservice&quot; </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="基于静态配置映射服务路由" tabindex="-1">基于静态配置映射服务路由 <a class="header-anchor" href="#基于静态配置映射服务路由" aria-label="Permalink to &quot;基于静态配置映射服务路由&quot;">​</a></h4><p>在绝大多数场景下，通过注册中心映射服务路由是可以支持日常的开发工作的。这也是我们通常推荐的实现方法。但是 Zuul 还提供了不依赖于 Eureka 的服务路由方式，这种方式可以让 Zuul 具备更多的扩展性。这种方式的实现，使我们可以使用自定义的路由规则完成与其他各种第三方系统的集成。</p><p>让我们考虑这样一个场景，如果系统中存在一个第三方服务，该服务无法注册到我们的 Eureka 注册中心，还会暴露了一个 HTTP 端点供 SpringHealth 系统进行调用。我们知道 Spring Cloud 中各个服务之间都是通过轻量级的 HTTP 协议进行交互的。而 HTTP 协议具备技术平台无关性，只要能够获取服务的 HTTP 端口地址，原则上我们就可以进行远程访问，而不用关注该服务在实现上采用了何种技术和工具。因此，针对这一场景，我们可以在配置文件中添加如下的静态路由配置，这样访问&quot;/thirdpartyservice/**&quot;时，Zuul 会将该请求转发到外部的第三方服务<a href="http://thirdparty.com/thirdpartyservice" target="_blank" rel="noreferrer">http://thirdparty.com/thirdpartyservice</a>中。</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">zuul:</span></span>
<span class="line"><span style="color:#E1E4E8;">  routes:</span></span>
<span class="line"><span style="color:#E1E4E8;">    thirdpartyservice:</span></span>
<span class="line"><span style="color:#E1E4E8;">      path: /thirdpartyservice/**</span></span>
<span class="line"><span style="color:#E1E4E8;">	  url: http://thirdparty.com/thirdpartyservice</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">zuul:</span></span>
<span class="line"><span style="color:#24292E;">  routes:</span></span>
<span class="line"><span style="color:#24292E;">    thirdpartyservice:</span></span>
<span class="line"><span style="color:#24292E;">      path: /thirdpartyservice/**</span></span>
<span class="line"><span style="color:#24292E;">	  url: http://thirdparty.com/thirdpartyservice</span></span></code></pre></div><p>现在的服务路由信息就会变成如下结果：</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">	    &quot;/springhealth/thirdpartyservice/**&quot;:&quot;http://thirdparty.com/thirdpartyservice&quot;,</span></span>
<span class="line"><span style="color:#E1E4E8;">	    &quot;/springhealth/user/**&quot;:&quot;userservice&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">	    &quot;/springhealth/thirdpartyservice/**&quot;:&quot;http://thirdparty.com/thirdpartyservice&quot;,</span></span>
<span class="line"><span style="color:#24292E;">	    &quot;/springhealth/user/**&quot;:&quot;userservice&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>在上文中介绍 Zuul 的定位时，我们提到 Zuul 能够与 Ribbon 进行整合。而这种整合也来自手工设置静态服务路由的方式，具体实现方式如下所示：</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">zuul:</span></span>
<span class="line"><span style="color:#E1E4E8;">  routes:</span></span>
<span class="line"><span style="color:#E1E4E8;">    thirdpartyservice:</span></span>
<span class="line"><span style="color:#E1E4E8;">      path: /thirdpartyservice/**</span></span>
<span class="line"><span style="color:#E1E4E8;">      serviceId: thirdpartyservice</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">ribbon:</span></span>
<span class="line"><span style="color:#E1E4E8;">  eureka:</span></span>
<span class="line"><span style="color:#E1E4E8;">    enabled: false</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">thirdpartyservice:</span></span>
<span class="line"><span style="color:#E1E4E8;">  ribbon:</span></span>
<span class="line"><span style="color:#E1E4E8;">	listOfServers: http://thirdpartyservice1:8080,http://thirdpartyservice2:8080</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">zuul:</span></span>
<span class="line"><span style="color:#24292E;">  routes:</span></span>
<span class="line"><span style="color:#24292E;">    thirdpartyservice:</span></span>
<span class="line"><span style="color:#24292E;">      path: /thirdpartyservice/**</span></span>
<span class="line"><span style="color:#24292E;">      serviceId: thirdpartyservice</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">ribbon:</span></span>
<span class="line"><span style="color:#24292E;">  eureka:</span></span>
<span class="line"><span style="color:#24292E;">    enabled: false</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">thirdpartyservice:</span></span>
<span class="line"><span style="color:#24292E;">  ribbon:</span></span>
<span class="line"><span style="color:#24292E;">	listOfServers: http://thirdpartyservice1:8080,http://thirdpartyservice2:8080</span></span></code></pre></div><p>这里，我们配置了一个 thirdpartyservice 路由信息，通过&quot;/ thirdpartyservice /**&quot;映射到 serviceId 为&quot;thirdpartyservice&quot;的服务中。然后我们希望通过自定义 Ribbon 的方式来实现客户端负载均衡，这时候就需要关闭 Ribbon 与 Eureka 之间的关联。可以通过&quot;ribbon.eureka.enabled: false&quot;配置项完成这一目标。在不使用 Eureka 的情况下，我们需要手工指定 Ribbon 的服务列表。&quot;users.ribbon.listOfServers&quot;配置项为我们提供了这方面的支持，如在上面的示例中&quot;<a href="http://thirdpartyservice1:8080" target="_blank" rel="noreferrer">http://thirdpartyservice1:8080</a>，<a href="http://thirdpartyservice2:8080" target="_blank" rel="noreferrer">http://thirdpartyservice2:8080</a>&quot;就为 Ribbon 提供了两个服务定义作为实现负载均衡的服务列表。</p><h3 id="小结与预告" tabindex="-1">小结与预告 <a class="header-anchor" href="#小结与预告" aria-label="Permalink to &quot;小结与预告&quot;">​</a></h3><p>本课时讨论 API 网关，我们基于 Netflix Zuul 构建了 API 网关。在微服务架构中，使用 API 网关的核心作用是实现服务访问的路由，而通过 Zuul 实现服务路由的方式有很多，我们分别从基于服务发现的自动映射、基于动态的配置映射以及基于静态的配置映射这三个维度展开了讨论并给出了相关的配置示例。</p><p>这里给你留一道思考题：我们通过 Zuul 来实现服务路由，可以采用哪些具体的配置方式？</p><p>Zuul 是一款经典的开源API网关，使用上非常简单，而它的内部实现机制也比较容易理解。下一课时，我们将通过源码来深入剖析 Zuul 的实现原理。</p>`,53);function g(b,k,q,_,A,m){const n=o("Image");return t(),r("div",null,[i,u,E,y,d,l(n,{alt:"Lark20201020-175149.png",src:"https://s0.lgstatic.com/i/image/M00/61/17/CgqCHl-Os0qAGZryAABHtvSGSm8333.png"}),a(),h,l(n,{alt:"Lark20201020-175156.png",src:"https://s0.lgstatic.com/i/image/M00/61/0C/Ciqc1F-Os1SAHbuIAABCdN3hS7M839.png"}),a(),v])}const Z=e(c,[["render",g]]);export{C as __pageData,Z as default};
