import{_ as o,j as e,o as t,g as r,k as p,h as n,s,Q as l}from"./chunks/framework.e0c66c3f.js";const os=JSON.parse('{"title":"引入 Spring Boot Admin 组件 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Boot 实战开发_文档/(5737) 22  运行管理：如何使用 Admin Server 管理 Spring 应用程序？.md","filePath":"posts/backEnd/Spring Boot 实战开发_文档/(5737) 22  运行管理：如何使用 Admin Server 管理 Spring 应用程序？.md","lastUpdated":1696338709000}'),c={name:"posts/backEnd/Spring Boot 实战开发_文档/(5737) 22  运行管理：如何使用 Admin Server 管理 Spring 应用程序？.md"},i=s("p",null,"前面 2 讲通过引入 Actuator 组件，我们为 Spring Boot 应用程序添加了系统监控功能。基于 Actuator 暴露的各种 HTTP 端点，开发人员可以获取系统的运行时状态。而端点是一种底层的监控技术，这就要求我们对 HTTP 协议和 Spring Boot 应用程序的构建方式有一定的了解。",-1),E=s("p",null,"那么，有没有更简单的、基于可视化的方式获取这些端点背后的信息呢？答案是肯定的。因此，这一讲我们将要介绍 Spring Boot Admin 组件。",-1),d=s("h3",{id:"引入-spring-boot-admin-组件",tabindex:"-1"},[n("引入 Spring Boot Admin 组件 "),s("a",{class:"header-anchor",href:"#引入-spring-boot-admin-组件","aria-label":'Permalink to "引入 Spring Boot Admin 组件"'},"​")],-1),y=s("p",null,"Spring Boot Admin 是一个用于监控 Spring Boot 的应用程序，它的基本原理是通过统计、集成 Spring Boot Actuator 中提供的各种 HTTP 端点，从而提供简洁的可视化 WEB UI，如下图所示：",-1),g=l(`<p>Spring Boot Admin 基本原理图</p><p>从上图中，我们不难看出，Spring Boot Admin 的整体架构中存在两大角色，即服务器端组件 Admin Server 和客户端组件 Admin Client。其中，Admin Client 实际上是一个普通的 Spring Boot 应用程序，而 Admin Server 则是一个独立服务，需要进行专门构建。</p><p>接下来，我们先介绍构建 Admin Server 的两种实现方式：一种是简单的基于独立的 Admin 服务；另一种则相对复杂，需要依赖服务注册中心的服务注册和发现机制。</p><h4 id="基于独立服务构建-admin-server" tabindex="-1">基于独立服务构建 Admin Server <a class="header-anchor" href="#基于独立服务构建-admin-server" aria-label="Permalink to &quot;基于独立服务构建 Admin Server&quot;">​</a></h4><p>无论使用哪种方式实现 Admin Server，首先我们都需要创建一个 Spring Boot 应用程序，并在 pom 文件中添加如下所示的依赖项：</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">     &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;de.codecentric&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">     &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;spring-boot-admin-server&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;de.codecentric&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;spring-boot-admin-server-ui&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">     &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;de.codecentric&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">     &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;spring-boot-admin-server&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;de.codecentric&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;spring-boot-admin-server-ui&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p><strong>请注意： Spring Boot Admin 组件并不是 Spring 家族官方提供的组件，而是来自一个 codecentric AG 团队。</strong></p><p>如果我们想将普通的 Spring Boot 应用程序转变为 Spring Boot Admin Server，只需要在 Bootstrap 类上添加一个 @EnableAdminServer 注解即可，添加完该注解的 BootStrap 类如下代码所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">SpringBootApplication</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">EnableAdminServer</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">AdminApplication</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        SpringApplication.</span><span style="color:#B392F0;">run</span><span style="color:#E1E4E8;">(AdminApplication.class, args);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">SpringBootApplication</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">EnableAdminServer</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">AdminApplication</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        SpringApplication.</span><span style="color:#6F42C1;">run</span><span style="color:#24292E;">(AdminApplication.class, args);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>此时，我们会发现使用这种方式构建 Spring Boot Admin Server 就是这么简单。</p><p>接下来我们启动这个 Spring Boot 应用程序，并打开 Web 界面，就能看到如下所示的效果：</p>`,11),A=l(`<p>Spring Boot Admin Server 启动效果图</p><p>从图中我们可以看到，目前还没有一个应用程序与 Admin Server 有关联。如果想将应用程序与 Admin Server 进行关联，我们还需要对原有的 Spring Boot 应用程序做一定的改造。</p><p>首先，我们在 Maven 依赖中引入对 Spring Boot Admin Client 组件的依赖，如下代码所示：</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">     &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;de.codecentric&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">     &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;spring-boot-admin-starter-client&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">     &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;de.codecentric&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">     &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;spring-boot-admin-starter-client&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>然后，我们在配置文件中添加如下配置信息，以便该应用程序能够与 Admin Server 进行关联。</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">spring:</span></span>
<span class="line"><span style="color:#E1E4E8;">  boot:</span></span>
<span class="line"><span style="color:#E1E4E8;">    admin:</span></span>
<span class="line"><span style="color:#E1E4E8;">      client:</span></span>
<span class="line"><span style="color:#E1E4E8;">        url: http://localhost:9000</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">spring:</span></span>
<span class="line"><span style="color:#24292E;">  boot:</span></span>
<span class="line"><span style="color:#24292E;">    admin:</span></span>
<span class="line"><span style="color:#24292E;">      client:</span></span>
<span class="line"><span style="color:#24292E;">        url: http://localhost:9000</span></span></code></pre></div><p><strong>注意：这里的 9000 就是 Admin Server 的服务器端口。</strong></p><p>现在我们启动这个应用程序，就会发现 Admin Server 中已经出现了这个应用的名称和地址，如下图所示：</p>`,8),u=s("p",null,"Spring Boot Admin Server 添加了应用程序之后的效果图",-1),m=s("p",null,"在图中，我们看到 APPLICATIONS 和 INSTANCES 的数量都是 1，代表 Admin Server 管理着一个应用程序，而该应用程序只有一个运行实例。在界面的下方，我们还能看到这个应用的名称及实例地址。这里你可以尝试使用不同的端口启动应用程序的不同实例，然后观察这个列表的变化。",-1),h=s("h4",{id:"基于注册中心构建-admin-server",tabindex:"-1"},[n("基于注册中心构建 Admin Server "),s("a",{class:"header-anchor",href:"#基于注册中心构建-admin-server","aria-label":'Permalink to "基于注册中心构建 Admin Server"'},"​")],-1),_=s("p",null,"虽然基于独立服务构建 Admin Server 和 Admin Client 非常简单，但是需要我们在每个应用程序中添加对 Spring Boot Admin 的 Maven 依赖，并指定 Admin Server 地址。这实际上是一种代码侵入，意味着应用程序与 Admin Server 之间有一种强耦合。",-1),v=s("p",null,"那么，有没有更好的办法分离或转嫁这种耦合呢？",-1),S=s("p",null,"联想到 Admin Server 和 Admin Client 之间需要建立类似服务注册的关联关系，我们可以认为这是服务注册和发现机制的一种表现形式。",-1),k=s("p",null,"在 Spring 家族中，存在一个用于构建微服务架构的 Spring Cloud 框架，而该框架中恰好存在一款专门实现服务注册和发现的组件------服务注册中心 Spring Cloud Netflix Eureka ，且 Spring Boot Admin 内置了与这款注册中心实现工具的无缝集成。",-1),b=s("p",null,"基于注册中心，Admin Server 与各个 Admin Client 之间的交互方式如下图所示：",-1),C=l(`<p>基于 Eureka 的 Admin Server 与 Admin Client 交互图</p><p>使用 Eureka 构建注册中心的过程也很简单，首先我们创建一个独立的 Spring Boot 应用程序，并在 pom 文件中添加如下所示的用于提供 Eureka 服务端功能的 Maven 依赖：</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">     &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;org.springframework.cloud&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">     &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;spring-cloud-starter-netflix-eureka-server&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">     &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;org.springframework.cloud&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">     &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;spring-cloud-starter-netflix-eureka-server&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>引入 Maven 依赖后，我们就可以创建 Spring Boot 的启动类。在示例代码中，我们把该启动类命名为 EurekaServerApplication，如下代码所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">SpringBootApplication</span></span>
<span class="line"><span style="color:#E1E4E8;">@</span><span style="color:#F97583;">EnableEurekaServer</span></span>
<span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">EurekaServerApplication</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">	</span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">String</span><span style="color:#E1E4E8;">[] </span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">	 </span></span>
<span class="line"><span style="color:#E1E4E8;">        SpringApplication.</span><span style="color:#B392F0;">run</span><span style="color:#E1E4E8;">(EurekaServerApplication.class, args);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">SpringBootApplication</span></span>
<span class="line"><span style="color:#24292E;">@</span><span style="color:#D73A49;">EnableEurekaServer</span></span>
<span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">EurekaServerApplication</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">	</span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">String</span><span style="color:#24292E;">[] </span><span style="color:#E36209;">args</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">	 </span></span>
<span class="line"><span style="color:#24292E;">        SpringApplication.</span><span style="color:#6F42C1;">run</span><span style="color:#24292E;">(EurekaServerApplication.class, args);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>注意：在上面的代码中，我们在启动类上加了一个@EnableEurekaServer 注解。在 SpringCloud 中，包含 @EnableEurekaServer 注解的服务也就是一个 Eureka 服务器组件。这样，Eureka 服务就构建完毕了。</p><p>同样，Eureka 服务还为我们提供了一个可视化的 UI 界面，它可以用来观察当前注册到 Eureka 中的应用程序信息，如下图所示：</p>`,7),D=l(`<p>Eureka 服务监控页面</p><p>接下来，我们需要 Admin Server 也做相应调整。首先，我们在 pom 文件中添加一个对 spring-cloud-starter-netflix-eureka-client 这个 Eureka 客户端组件的依赖：</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;org.springframework.cloud&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;spring-cloud-starter-netflix-eureka-client&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;org.springframework.cloud&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;spring-cloud-starter-netflix-eureka-client&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>这时 Admin Server 相当于 Eureka 的客户端，因此，我们需要在它的 BootStrap 类上添加 @EnableEurekaClient 注解，以便将 Admin Server 注册到 Eureka 上。</p><p>重构 Admin Server 的最后一步是调整配置信息，此时我们需要在配置文件中添加如下所示的配置项来指定 Eureka 服务器地址。</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">eureka:</span></span>
<span class="line"><span style="color:#E1E4E8;">  client:</span></span>
<span class="line"><span style="color:#E1E4E8;">    registerWithEureka: true</span></span>
<span class="line"><span style="color:#E1E4E8;">    fetchRegistry: true</span></span>
<span class="line"><span style="color:#E1E4E8;">    serviceUrl:</span></span>
<span class="line"><span style="color:#E1E4E8;">	  defaultZone: http://localhost:8761/eureka/</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">eureka:</span></span>
<span class="line"><span style="color:#24292E;">  client:</span></span>
<span class="line"><span style="color:#24292E;">    registerWithEureka: true</span></span>
<span class="line"><span style="color:#24292E;">    fetchRegistry: true</span></span>
<span class="line"><span style="color:#24292E;">    serviceUrl:</span></span>
<span class="line"><span style="color:#24292E;">	  defaultZone: http://localhost:8761/eureka/</span></span></code></pre></div><p>好了，现在 Admin Server 已经重构完毕，接下来我们一起看看 Admin Client。</p><p>引入注册中心的目的是降低 Admin Client 与 Admin Server 之间的耦合度，关于这点我们从 Maven 依赖上就可以得到印证。有了注册中心后，Admin Client 就不再依赖 spring-boot-admin-starter-client 组件了，而是直接使用如下所示的 Eureka 客户端组件。</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">     &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;org.springframework.cloud&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">     &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;spring-cloud-starter-netflix-eureka-client&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">     &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;org.springframework.cloud&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">     &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;spring-cloud-starter-netflix-eureka-client&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>在配置文件中，我们需要去掉对 Admin Server 地址的引用，直接使用 Eureka 服务端地址即可，且无须对 Admin Client 中的 Bootstrap 类做任何修改。</p><p>通过以上调整，各个 Admin Client 就能通过 Eureka 注册中心完成与 Admin Server 的关联了。</p><h3 id="使用-admin-server-监控系统" tabindex="-1">使用 Admin Server 监控系统 <a class="header-anchor" href="#使用-admin-server-监控系统" aria-label="Permalink to &quot;使用 Admin Server 监控系统&quot;">​</a></h3><p>根据 Spring Boot Admin 官方 Github 上的介绍，Admin Server 监控系统提供了一套完整的可视化方案。基于 Admin Server，健康状态、JVM、内存、Micrometer 的度量、线程、HTTP 跟踪等核心功能都可以通过可视化的 UI 界面进行展示。</p><h4 id="监控系统运行时关键指标" tabindex="-1">监控系统运行时关键指标 <a class="header-anchor" href="#监控系统运行时关键指标" aria-label="Permalink to &quot;监控系统运行时关键指标&quot;">​</a></h4><p>注意到 Admin Server 菜单中有一个&quot;Wallboard&quot;，点击该菜单，我们就可以看到一面应用墙，如下图所示：</p>`,15),I=s("p",null,"Admin Server 应用墙",-1),f=s("p",null,"点击应用墙中的某个应用，我们就能进入针对该应用的监控信息主界面。在该界面的左侧，包含了监控功能的各级目录，如下图所示：",-1),B=s("p",null,"Admin Server 监控信息主界面",-1),T=s("p",null,'在图中，我们看到了最重要的"Health"信息，显然，这一信息来自 Spring Boot Actuator 组件的 Health 端点，这里你可以参考《服务监控：如何使用 Actuator 组件实现系统监控？》的内容进行回顾。',-1),x=s("p",null,"在这个界面上继续往下滑动，我们将看到一些与 JVM 相关的监控信息，比如非常有用的线程、垃圾回收、内存状态等数据，如下图所示：",-1),F=s("p",null,"Admin Server 中的 JVM 监控信息",-1),q=s("p",null,"这些 JVM 数据都是通过可视化的方式进行展现，并随着运行时状态的变化而实时更新。",-1),M=s("p",null,'在 21 讲中，我们详细讨论了 Spring Boot Actuator 中的度量指标。而在 Admin Server 中，同样存在一个"Metrics"菜单，展示效果如下图所示：',-1),P=s("p",null,"Admin Server 中的 Metrics 信息",-1),w=s("p",null,'在"Metrics"菜单中，开发人员可以通过对各种条件进行筛选，然后添加对应的度量指标。比如上图中，我们针对 HTTP 请求中 /actuator/health 端点进行了过滤，从而得到了度量结果。',-1),V=s("p",null,"接着我们一起看看系统环境方面的属性，因为这方面的属性非常之多，所以 Admin Server 也提供了一个过滤器，如下图所示：",-1),H=s("p",null,"Admin Server 中的 Environment 信息",-1),N=s("p",null,'在上图中，通过输入"spring."参数，我们就能获取一系列与该参数相关的环境属性。',-1),G=s("p",null,'日志也是我们监控系统的一个重要途径，在 Admin Server 的"Loggers"菜单中，可以看到该应用程序的所有日志信息，如下图所示：',-1),R=s("p",null,"Admin Server 中的 Loggers 信息",-1),J=s("p",null,'通过"springcss"关键词对这些日志进行过滤，我们就可以获取 SpringCSS 案例中的日志详细了，图中也显示了每个日志记录器对应的日志级别。',-1),K=s("p",null,'最后，我们来看一下 Admin Server 中的"JVM"菜单，该菜单下存在两个子菜单："Thread Dump"和"Heap Dump"。',-1),O=s("p",null,'以"Thread Dump"为例，尽管 Actuator 提供了 /threaddump 端点，但开发人员只能获取触发该端点时的 Dump 信息，而 Admin Server 则提供了一个连续性的可视化监控界面，如下图所示：',-1),U=l(`<p>Admin Server 中的 Thread Dump 信息</p><p>点击图中的色条，我们就可以获取每一个线程的详细信息了，这里你可以尝试做一些分析。</p><h4 id="控制访问安全性" tabindex="-1">控制访问安全性 <a class="header-anchor" href="#控制访问安全性" aria-label="Permalink to &quot;控制访问安全性&quot;">​</a></h4><p>讲到这里，我们会发现 Admin Server 的功能非常强大，而这些功能显然也不应该暴露给所有的开发人员。因此，我们需要控制 Admin Server 的访问安全性。</p><p>想做到这一点也非常简单，我们只需要集成 Spring Security 即可。</p><p>结合《用户认证：如何基于 Spring Security 构建用户认证体系？》的内容，我们在 Spring Boot 应用程序中添加一个对 spring-boot-starter-security 的 Maven 依赖：</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;org.springframework.boot&lt;/</span><span style="color:#85E89D;">groupId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;spring-boot-starter-security&lt;/</span><span style="color:#85E89D;">artifactId</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">dependency</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;org.springframework.boot&lt;/</span><span style="color:#22863A;">groupId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;spring-boot-starter-security&lt;/</span><span style="color:#22863A;">artifactId</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">dependency</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>然后，我们在配置文件中添加如下配置项：</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">spring:</span></span>
<span class="line"><span style="color:#E1E4E8;">  security:</span></span>
<span class="line"><span style="color:#E1E4E8;">    user:</span></span>
<span class="line"><span style="color:#E1E4E8;">      name: &quot;springcss_admin&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      password: &quot;springcss_password&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">spring:</span></span>
<span class="line"><span style="color:#24292E;">  security:</span></span>
<span class="line"><span style="color:#24292E;">    user:</span></span>
<span class="line"><span style="color:#24292E;">      name: &quot;springcss_admin&quot;</span></span>
<span class="line"><span style="color:#24292E;">      password: &quot;springcss_password&quot;</span></span></code></pre></div><p>重启 Admin Server 后，再次访问 Web 界面时，就需要我们输入用户名和密码了，如下图所示：</p>`,10),W=s("p",null,"Admin Server 的安全登录界面",-1),L=s("h3",{id:"小结与预告",tabindex:"-1"},[n("小结与预告 "),s("a",{class:"header-anchor",href:"#小结与预告","aria-label":'Permalink to "小结与预告"'},"​")],-1),j=s("p",null,"可视化监控一直是开发和运维人员管理应用程序运行时状态的基础诉求，而 Spring Boot Admin 组件正是这样一款可视化的工具。它基于 Spring Boot Actuator 中各个端点所暴露的监控信息，并加以整合和集成。今天的内容首先介绍了构建 Admin Server 以及 Admin Client 的方法，并剖析了 Admin Server 中所具有的一整套的可视化解决方案。",-1),Y=s("p",null,"这里给你留一道思考题：在使用 Spring Boot Admin 组件时，构建 Admin Server 有哪两种方法？欢迎你在留言区进行互动、交流。",-1),$=s("p",null,"介绍完系统监控主题之后，我们将进入到整个课程的最后一个主题，即系统测试。23讲我们将介绍如何对数据访问层组件进行有效测试。",-1),Q=s("p",null,"另外，如果你觉得本专栏有价值，欢迎分享给好友哦~",-1);function Z(X,z,ss,ns,as,ps){const a=e("Image");return t(),r("div",null,[i,E,d,y,p(a,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image/M00/93/0C/Ciqc1GATrxuABqR3AAC7e5_Dyo4605.png"}),n(),g,p(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/90/48/CgqCHmAKf-WAFILtAAAsRr3Jgfg085.png"}),n(),A,p(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/90/3D/Ciqc1GAKf--ATR-aAAAxAFlSEVc094.png"}),n(),u,m,h,_,v,S,k,b,p(a,{alt:"图片13.png",src:"https://s0.lgstatic.com/i/image/M00/93/17/CgqCHmATr26AO1VxAACbHS3yQHY687.png"}),n(),C,p(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image2/M01/08/31/Cip5yGAKgDuAcMmLAAB_2n8YYlw199.png"}),n(),D,p(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image2/M01/08/32/Cip5yGAKgE2AdGRqAABpdUogwxw880.png"}),n(),I,f,p(a,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image/M00/93/0C/Ciqc1GATr3-ATLpGAAOgyIEu7Sk069.png"}),n(),B,T,x,p(a,{alt:"图片7.png",src:"https://s0.lgstatic.com/i/image/M00/93/17/CgqCHmATr5KAJhb-AANDUbOuW2I534.png"}),n(),F,q,M,p(a,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/90/49/CgqCHmAKgGSAaC9sAAA-CBnX4LI723.png"}),n(),P,w,V,p(a,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/90/3E/Ciqc1GAKgGuAaRNpAABIghaOFVg132.png"}),n(),H,N,G,p(a,{alt:"图片10.png",src:"https://s0.lgstatic.com/i/image/M00/93/0C/Ciqc1GATr7OAegcuAAGy8bdkv4k234.png"}),n(),R,J,K,O,p(a,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image/M00/90/49/CgqCHmAKgHuAcsFSAABDhuAgJBY760.png"}),n(),U,p(a,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image2/M01/08/34/CgpVE2AKgImAOicJAAAiQ2MCOts677.png"}),n(),W,L,j,Y,$,Q])}const es=o(c,[["render",Z]]);export{os as __pageData,es as default};
