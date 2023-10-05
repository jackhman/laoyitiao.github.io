import{_ as l,j as t,o as p,g as n,k as r,s as e,h as i,Q as o}from"./chunks/framework.4e7d56ce.js";const I=JSON.parse('{"title":"综合案例架构图 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/041_300分钟搞懂 Spring Cloud/(100) 第12讲：Spring Cloud综合案例.md","filePath":"posts/backEnd/041_300分钟搞懂 Spring Cloud/(100) 第12讲：Spring Cloud综合案例.md","lastUpdated":1696417798000}'),s={name:"posts/backEnd/041_300分钟搞懂 Spring Cloud/(100) 第12讲：Spring Cloud综合案例.md"},d=e("p",null,'你好，我是你的 Spring Cloud 讲师尹吉欢，欢迎来到第 12 课时"综合案例"的学习。',-1),c=e("h3",{id:"综合案例架构图",tabindex:"-1"},[i("综合案例架构图 "),e("a",{class:"header-anchor",href:"#综合案例架构图","aria-label":'Permalink to "综合案例架构图"'},"​")],-1),h=e("p",null,"相信你对案例的架构图并不陌生，在开词篇中我有介绍过。经过几个月的学习，终于到了最后总结的时刻。",-1),u=e("p",null,"本课时中的综合案例也是为了让你能够巩固前面学习的知识点，同时可以在使用 Spring Cloud 作为微服务架构时能有一个能够落地的参考。",-1),_=e("p",null,"我们再来回顾下这张图，首先是客户端会发起请求到负载均衡器，比如 Nginx。然后 Nginx 将请求转发到网关上，网关再转发到具体的服务上。",-1),g=e("p",null,"上面是注册中心的集群，也就是 Eureka。还有配置中心 Apollo 和链路跟踪 Sleuth 加 ZipKin。ELK 用来收集链路日志展示查询。",-1),b=e("p",null,"在这个架构中，并不会将所有的东西都搭建出来，但是会将最底层的代码框架搭建出来。像 Nginx、ELK 等就不会再具体演示了。",-1),m=e("h3",{id:"案例项目模块",tabindex:"-1"},[i("案例项目模块 "),e("a",{class:"header-anchor",href:"#案例项目模块","aria-label":'Permalink to "案例项目模块"'},"​")],-1),k=o('<p>接下来讲解案例的项目模块，整个项目采用 Maven 多模块的结构，总共 8 个模块。</p><ul><li><p>article 是文章服务，提供文章获取接口，因为这里只是案例，所以不会做太多跟业务相关的事情。article-api 是接口的定义，所有文章相关的接口都在 api 中进行定义，同时也作为 Feign Client 的调用 SDK。article-provider 是服务提供者，article 服务最终是通过 article-provider 来启动暴露的，在 article-provider 中会实现 api 中定义的接口和业务逻辑。</p></li><li><p>common 中会放一些通用的工具类，比如 JsonUtils、DateUtils 等。</p></li><li><p>core 中主要是一些核心的逻辑，并且比较通用，比如像灰度发布的处理等。</p></li><li><p>eureka 就是我们的注册中心，相信你已经非常熟悉了。</p></li><li><p>hystrix-dashboard 是 hystrix 监控数据展示的 Web 控制台。</p></li><li><p>user 是用户服务，负责用户的登录、退出登录、用户信息查询等。</p></li><li><p>zuul 是我们的网关，负责访问控制、请求跨域处理等。</p></li><li><p>webpage 是一个 Web 项目，有页面的 Web 项目，整个案例肯定是前后端分离的，为了让大家理解和使用难度较低，这里直接采用 Spring MVC 的方式来创建一个项目模拟前端，如果用纯前端的方式，对不太懂前端的同学还是有难度的。</p></li></ul><p>Web 中采用 Controller 来进行页面的跳转，到页面后通过 Vue 来渲染页面，通过 AJax 请求后端接口获取数据，跟完整的前后端分离不同的点在于路由是通过后端转发控制的，而不是通过前端框架去控制的路由，整体实现差不多，目的是为了让你了解前后端怎么交互。</p><h3 id="前端页面" tabindex="-1">前端页面 <a class="header-anchor" href="#前端页面" aria-label="Permalink to &quot;前端页面&quot;">​</a></h3>',4),A=e("p",null,"前端页面只实现了 2 个，一个是登录的页面，负责登录的功能，一个是文章详情的页面，负责获取文章信息展示，同时在这边还有个退出登录的按钮，执行退出操作。",-1),C=o('<h3 id="案例实现功能" tabindex="-1">案例实现功能 <a class="header-anchor" href="#案例实现功能" aria-label="Permalink to &quot;案例实现功能&quot;">​</a></h3><p>实现的业务功能主要有三个，分别是用户登、用户退出登录、查询文章信息。</p><p>实现的技术功能有网关验证、用户信息全局透传、服务灰度发布、调用链集成、Apollo 集成。</p><h4 id="用户登录" tabindex="-1">用户登录 <a class="header-anchor" href="#用户登录" aria-label="Permalink to &quot;用户登录&quot;">​</a></h4><p>首先我们来看业务功能用户登录，在 webpage 中有一个登录的页面，有一个表单，两个文本框，一个用户名一个密码。</p><p>还有一些非空的验证逻辑，重置按钮是清空表单的输入项，登录按钮才是执行真正的登录业务逻辑。可以看到登录我们调用了 user-provider 服务的登录接口，将用户名和密码传递过去，如果成功了则将返回的 Token 存储起来。</p><p>在 user-provider 中的 UserRestController 里实现了登录的逻辑，接口的定义在 UserAPI 中，同时也是作为 Feign 的 Client 使用。</p><p>逻辑比较简单，因为是示列程序，就简单的判断了下参数，然后固定的等于某个值就认为登录成功。使用我们的 Jwt 工具类生成用户对应的 Token 返回给调用方。</p><h4 id="退出登录" tabindex="-1">退出登录 <a class="header-anchor" href="#退出登录" aria-label="Permalink to &quot;退出登录&quot;">​</a></h4><p>退出登录的按钮在 index 页面中，调用的接口也是 user-provider 中的，退出登录的时候会判断要注销的 Token 和当前用户是不是同一个人，防止被人非法操作。验证成功后我们将注销的 Token 放入 Redis 中，然后在网关中加一层过滤的逻辑，如果访问的 Token 在注销的 Redis 中就拦截。这边需要注意的是 user-provider 中的 Redis 和网关中是同一个，如果是不同的，则需要在 user-provider 中通过其他的方式告诉网关。</p><h4 id="查询文章信息" tabindex="-1">查询文章信息 <a class="header-anchor" href="#查询文章信息" aria-label="Permalink to &quot;查询文章信息&quot;">​</a></h4><p>文章信息也在 index 页面中显示，在页面加载的时候就会去调用 article-provider 的接口获取文章信息，然后显示。</p><p>article-provider 中会调用 user-provider 中的用户信息接口，拿到用户名组装结果返回给调用方。这边也是固定写好的数据，没有做数据库相关的操作，只是为了让示列更加简单，方便大家本地启动。</p><h4 id="网关验证" tabindex="-1">网关验证 <a class="header-anchor" href="#网关验证" aria-label="Permalink to &quot;网关验证&quot;">​</a></h4><p>网关是所有外部请求的入口，必须守好这道防线。对于请求必须验证，有的特殊的请求可以不进行验证，比如登录接口，你想想看，如果登录都被拦截了，那就陷入死循环当中了。所以我们需要有一个白名单的功能，并且还需要能够实时修改并生效，这时候配置中心的作用就提现出来了。</p><p>在 Zuul 中定义一个验证的过滤器，同时还需要定义一个接口白名单的 List, 关联上 Apollo。</p><p>在 run 方法中我们会判断当前请求的接口是否在白名单中，如果在就直接放行，不在才进行 Token 的校验。</p><p>对于没有带 Token 或者带了 Token 但是校验失败的，直接将校验结果返回，如果校验通过了取出 Token 中的用户 ID，添加到请求头中向后端服务进行传递。</p><h4 id="用户信息全局透传" tabindex="-1">用户信息全局透传 <a class="header-anchor" href="#用户信息全局透传" aria-label="Permalink to &quot;用户信息全局透传&quot;">​</a></h4><p>在网关验证通过，用户的 ID 也获取到了，这只是在网关中的逻辑。一个请求会转发到后端的 N 个服务上，在这些服务里同样也需要知道当前登录的用户是谁，这个时候我们就需要将用户信息进行全局传递。</p><p>在 core 模块中定义了一个用于接收用户 ID 信息的 HttpHeaderParamFilter，在过滤器中接收然后存到 ThreadLocal 中。为了能够让代码复用所以定义在了 core 模块中，要用的项目只要依赖了 core 模块，然后配置一些这个过滤器即可。</p><p>为了更方便，在 core 中配置的逻辑也写好了，通过 @ConditionalOnProperty 来控制是否启用，只要在使用的项目中配置了 user.info.enabled=true 即可启用。</p><p>这样在使用时我们就可以直接从 ThreadLocal 中获取了。如果用了 Hystrix 的线程隔离模式， ThreadLocal 会失效，对于解决的并发策略也在 core 中进行了配置，同样的也是通过配置文件可以启用。</p><p>然后就可以将用户信息传递到其他的服务中，一般有两种调用方式，Feign 和 RestTemplate，我们在 core 中定义了两个拦截器，分别来处理不同调用方式的用户信息传递。同样也是采用配置的方式来启用，对于 Feign 拦截器的配置采用的 @ConditionalOnClass 来判断当前 classpath 中是否有指定的类，因为有的项目依赖了 core，但是不需要使用 Feign，也就没有 Feign 的依赖，这个时候就会报错了，像网关中就是这样，所以加了 @ConditionalOnClass 来判断。</p><h4 id="服务灰度发布" tabindex="-1">服务灰度发布 <a class="header-anchor" href="#服务灰度发布" aria-label="Permalink to &quot;服务灰度发布&quot;">​</a></h4><p>灰度发布的集成，也在 core 中，灰度这个功能是所有服务都要用的。主要是 2 个策略，一个是 Zuul 中的，针对网关的处理，一个是普通服务的处理，同样也是可以通过配置的方式启用。对于 discovery Maven 的依赖，Eureka、Apollo、Hystrix 三个通用的就默认依赖了，对于 Zuul 和 service 需要依赖方收到后去指定，主要是处理 Zuul 和普通 service 的区别。</p><h4 id="调用链集成" tabindex="-1">调用链集成 <a class="header-anchor" href="#调用链集成" aria-label="Permalink to &quot;调用链集成&quot;">​</a></h4><p>对于调用链没什么特殊的代码，只需要配置 sleuth 和 Zipkin 的 Maven 依赖即可，然后配置好 Zipkin 的服务端地址，案例中用的是 HTTP 方式的传输，如果要换成 RabbitMq 你可以自己去修改配置。</p><p>Zipkin server 的 jar 你可以自己去官网下载，本案例中不提供。</p><h4 id="apollo-集成" tabindex="-1">Apollo 集成 <a class="header-anchor" href="#apollo-集成" aria-label="Permalink to &quot;Apollo 集成&quot;">​</a></h4><p>Apollo 的集成只需要在配置文件中指定 appid 和 metaserver 地址，案例中用的官方提供的演示地址。为了能够让你方便的运行本案例，目前所有的配置还在项目中，你可以将项目中的信息移动到 Apollo 中即可。</p><h3 id="演示" tabindex="-1">演示 <a class="header-anchor" href="#演示" aria-label="Permalink to &quot;演示&quot;">​</a></h3><p>最后演示下案例的效果，将 Eureka 和 zuul、webpage、article-provider、user-provider 启动，访问 webpage，进行登录，登录成功后调整到文章详情页面，获取到了文章的信息。右上角退出登录的按钮用于注销。</p><p>好了，到这里本专栏的内容就全部讲完了，在最后的彩蛋中，我将分享第二代微服务架构 Spring Cloud Alibaba，记得按时来听课啊，下节课见。</p>',34);function T(x,P,q,v,f,S){const a=t("Image");return p(),n("div",null,[d,c,r(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/27/50/Cgp9HWBcIOuACRh7AADDrLDk4gs631.png"}),h,u,_,g,b,m,r(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M01/27/51/Cgp9HWBcIPaAYc_qAABYROhyDiA390.png"}),k,r(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M01/27/4E/CioPOWBcIQWAAit7AABjdZD-Hs4729.png"}),A,r(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M01/27/4E/CioPOWBcIQyAJveUAACBu7riNqg956.png"}),C])}const E=l(s,[["render",T]]);export{I as __pageData,E as default};
