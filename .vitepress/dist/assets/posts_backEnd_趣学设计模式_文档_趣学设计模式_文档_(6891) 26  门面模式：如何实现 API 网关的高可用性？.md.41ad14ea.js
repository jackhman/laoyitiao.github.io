import{_ as a,j as s,o as r,g as n,k as p,Q as t}from"./chunks/framework.e0c66c3f.js";const T=JSON.parse('{"title":"模式原理分析 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/趣学设计模式_文档/趣学设计模式_文档/(6891) 26  门面模式：如何实现 API 网关的高可用性？.md","filePath":"posts/backEnd/趣学设计模式_文档/趣学设计模式_文档/(6891) 26  门面模式：如何实现 API 网关的高可用性？.md","lastUpdated":1696338709000}'),e={name:"posts/backEnd/趣学设计模式_文档/趣学设计模式_文档/(6891) 26  门面模式：如何实现 API 网关的高可用性？.md"},_=t('<p>前面我们已经学习了组合模式、桥接模式、装饰模式、适配器模式这 4 种结构型设计模式，今天我们接着再来学习另一种新的结构型模式------门面模式。门面模式的原理非常容易理解，使用也非常灵活，因此，它的应用非常广泛。</p><p>不过，你是不是经常把门面模式和代理模式搞混淆？比如，业务 API 网关和 Nginx 网关是不是差不多？实际上这两种模式的本质原理是不同的。相信通过今天的学习，会帮助你找到一个更准确的答案。</p><p>话不多说，让我们开始今天的学习吧。</p><h3 id="模式原理分析" tabindex="-1">模式原理分析 <a class="header-anchor" href="#模式原理分析" aria-label="Permalink to &quot;模式原理分析&quot;">​</a></h3><p>门面模式的原始定义是：为子系统中的一组接口提供统一的接口。它定义了一个更高级别的接口，使子系统更易于使用。</p><p>这个定义告诉我们门面模式的本质就是统一多个接口的功能。换句话说，<strong>当我们需要用更统一的标准方式来与系统交互时，就可以采用门面模式</strong>。比如，使用 Slf4j 日志框架来统一 log4j、log4j2、CommonLog 等日志框架。再比如，在支付时通过扫描二维码来使用支付系统。对于用户来说，他们并不关心后台系统实现有多么复杂，只关心最终能否支付成功。</p><p>不过，这里要注意的是，&quot;定义更高级别的接口&quot;不代表只能定义一个接口，这也是和代理模式根本的不同之处。也就是说，<strong>门面模式可能代理的是多个接口，而代理模式通常只是代理某一个接口</strong>。</p><p>下面我们就来看看门面模式的 UML 图：</p>',8),l=t('<p>可以看到，门面模式包含的关键角色有两个：</p><ul><li><p><strong>门面系统</strong>，负责处理依赖子系统的请求，并将请求代理给适当的子系统进行处理；</p></li><li><p><strong>子系统</strong>，代表某个领域内的功能实现，比如，订单、用户、支付等，专门处理由门面系统指派的任务。</p></li></ul><p>我们平时最常见的电脑开机按钮就是一个门面模式，点击按钮电脑就会启动，再点击按钮电脑就会关闭，至于电脑如何运行 CPU、启动内存、读取硬盘、点亮显示器，我们其实并不关心。我们只关心使用视角下的电脑，而不关心电脑本身是如何运行的。</p><p>门面模式封装的变化主要是子系统的一切变化（自身复杂性、可能出现的问题等），并且随着子系统的独立演化，子系统可能变得越来越复杂，但是只要和门面系统的交互不发生改变，那么就并不会影响门面系统。就好比，虽然后端研发团队不断地迭代更新 API 版本，但只要接口定义不变，那么前端团队就不需要进行任何修改。</p><p>所以说，门面模式的原理本质就是<strong>简化外部系统使用内部多个子系统的使用方式</strong>。</p><h3 id="使用场景分析" tabindex="-1">使用场景分析 <a class="header-anchor" href="#使用场景分析" aria-label="Permalink to &quot;使用场景分析&quot;">​</a></h3><p>一般来讲，门面模式常用的使用场景有以下几种。</p><ul><li><p><strong>简化复杂系统。</strong> 比如，当我们开发了一整套的电商系统后（包括订单、商品、支付、会员等系统），我们不能让用户依次使用这些系统后才能完成商品的购买，而是需要一个门户网站或手机 App 这样简化过的门面系统来提供在线的购物功能。</p></li><li><p><strong>减少客户端处理的系统数量。</strong> 比如，在 Web 应用中，系统与系统之间的调用可能需要处理 Database 数据库、Model 业务对象等，其中使用 Database 对象就需要处理打开数据库、关闭连接等操作，然后转换为 Model 业务对象，实在是太麻烦了。如果能够创建一个数据库使用的门面（其实就是常说的 DAO 层），那么实现以上过程将变得容易很多。</p></li><li><p><strong>让一个系统（或对象）为多个系统（或对象）工作。</strong> 比如，线程池 ThreadPool 就是一个门面模式，它为系统提供了统一的线程对象的创建、销毁、使用等。</p></li><li><p><strong>联合更多的系统来扩展原有系统。</strong> 当我们的电商系统中需要一些新功能时，比如，人脸识别，我们可以不需要自行研发，而是购买别家公司的系统来提供服务，这时通过门面系统就能方便快速地进行扩展。</p></li><li><p><strong>作为一个简洁的中间层。</strong> 门面模式还可以用来隐藏或者封装系统中的分层结构，同时作为一个简化的中间层来使用。比如，在秒杀、库存、钱包等场景中，我们需要共享有状态的数据时（如商品库存、账户里的钱），在不改变原有系统的前提下，通过一个中间的共享层（如将秒杀活动的商品库存总数统一放在 Redis 里），就能统一进行各种服务（如，秒杀详情页、商品详情页、购物车等）的调用。</p></li></ul><p><strong>总结来说，门面模式在使用的时候能够提供一个简单的概览视图，让使用者能够很方便地去使用</strong>。实际上，这一视图对于绝大多数用户来说已经足够了。比如，点击添加商品到购物车、结算、支付、等待收货......虽然对于电商系统本身来说需要考虑各种各样的情况，但是对于用户来说，购物网站这个门面就已经足够他们使用了。</p><p>这也是为什么手机上的 App 虽然只有一个，但是实际上这个 App 背后需要的可能是成百上千的&quot;一个人&quot;在运营和研发这个 App。</p><p>所以说，门面模式本身并不是一个代码实现的模式，而是组合更多的其他模式来使用的一种通用解决方案。</p>',11),i=t('<h3 id="为什么使用门面模式" tabindex="-1">为什么使用门面模式？ <a class="header-anchor" href="#为什么使用门面模式" aria-label="Permalink to &quot;为什么使用门面模式？&quot;">​</a></h3><p>分析完门面模式的原理和使用场景后，我们再来说说使用门面模式的原因，主要有以下两个。</p><p><strong>第一个，为了解决遗留系统重构的问题。</strong> 遗留系统通常是指承担着当前多个系统处理流程中重要的一环，但可能因为开发时间太过久远或初始维护团队发生重大调整，进而导致遗留下来的代码难以维护而得名。在重构遗留系统的过程中，内部子系统通常可能是非常复杂的，一般新维护的团队基本上不会修改原有系统的接口，但是新功能又必须要上线，这时就会采用门面模式先统一重要的接口，然后再逐渐地更新与迁移功能到新系统上，完成遗留系统的重构。这样既能保证原有线上系统不受影响，也能不断更新老旧的代码，让代码更易维护。结合我多年的经验来看，门面模式在设计上就是为了兼容更多不同的系统，非常适合重构遗留系统。</p><p><strong>第二个，为了解决分层架构中的扩展问题。</strong> 不管是单体应用还是分布式应用，使用分层架构时，容易出现各个层次的入口和出口被滥用的现象，比如，视图层滥用 DAO 层来访问数据存储。实际上，对于更高层的使用者来说，有时其实并不关心底层的实现逻辑。如果底层提供了太丰富的功能而又没有做限制时，就容易让高层的使用者混淆。而使用门面模式能够清晰地定义一类操作，比如，数据的增删改查门面系统，任务调度的门面系统。一方面，门面模式能够充当权限管控的角色（按类区分），让上层的访问能够汇聚到一个门面系统中，方便使用。另一方面，门面模式也能简化下层不同子系统的依赖关系（按分类关系聚合），避免滥用。这样在每一层里进行系统扩展时，就不会影响到其他系统。</p><h3 id="收益什么-损失什么" tabindex="-1">收益什么？损失什么？ <a class="header-anchor" href="#收益什么-损失什么" aria-label="Permalink to &quot;收益什么？损失什么？&quot;">​</a></h3><p>通过上面的分析，我们可以得出使用门面模式主要有以下几个优点。</p><ul><li><p><strong>对使用者屏蔽子系统的细节，因而减少了使用者处理的对象数目，让整个系统使用起来更加方便</strong>。比如，API 网关对外只有一个调用点，而后端服务可以用成百上千的服务系统连接网关。</p></li><li><p><strong>实现了子系统与使用者之间的松散耦合关系</strong>。比如，活动时用户只需要点击抢购按钮就能实现一键下单并送货，用户不用知道商品系统是如何扣减商品的，也不用知道物流系统如何调度送货的。</p></li><li><p><strong>有助于建立层次结构系统，并简化层与层之间的依赖关系</strong>。比如，视图层要访问存储层数据时，如果直接使用数据访问接口会造成依赖混乱，而按照某一个分类的服务建立一个门面服务层，比如，动态路由读写数据门面系统、数据埋点采集门面系统等，能够提供更简化统一的操作。</p></li><li><p><strong>能够消除复杂的循环依赖</strong>。比如，为多个外部系统提供统一的 SDK 应用包，统一定义不同的接口方法，指定对应的子系统进行使用。</p></li><li><p><strong>有利于系统在不同平台之间的移植和重构</strong>。 比如，系统早期通过 C# 实现，但现在团队期望通过 Java 进行重构，这时门面系统就可以充当中间的协议统一者，提供 HTTP 协议接口，然后逐渐迁移代码功能，使用过渡与升级同时并存的方式，完成系统的切换与升级。</p></li></ul><p>当然，门面模式也有一些缺点。</p><ul><li><p><strong>降低了可靠性</strong>。从架构模式上看，可能会出现过多的子系统依赖一个门面系统的情况，常见的网关模式就是这样，只要网关挂掉，所有子系统可能就无法使用了。</p></li><li><p><strong>容易导致子系统越来越复杂</strong>。有了简化的门面系统后，子系统可能就会不受约束地自由扩展。如果子系统在进行跨版本的升级而不通知门面系统时，就可能会造成系统的不可用。</p></li></ul><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p><strong>门面模式的本质是：简化调用，统一操作。</strong></p><p>门面模式最典型的一种应用就是 API 网关，这个你可能已经非常熟悉了，特别是随着微服务的不断流行，API 网关充当着越来越重要的角色。API 网关要解决的一个主要问题就是：高可用性。但实际上你会发现，从模式的原理上很难解决高可用的问题，因为只要依赖的系统越多，网关出现了问题，那么所有系统都变成了不可用状态。这也是有时不使用 API 网关的原因。现在更多的是通过其他手段来保护网关，比如，降级、限流、熔断等操作，或者通过不断扩展网关的吞吐量处理能力来提高网关的可用性。</p><p>虽然门面模式满足最小知识原则，但这仅仅是对于用户而言的，而对于使用系统的维护者来说，庞大的子系统依然需要大量的业务知识。</p><p>门面模式虽然有很多优势，如统一对外的服务管控，但是同样劣势也很明显，如造成系统单点故障而使所有系统不可用。所以说，门面模式更多是为了简化操作而提出的一种优化方法，不要过于迷信它，而是应该辩证地看待它。</p><h3 id="课后思考" tabindex="-1">课后思考 <a class="header-anchor" href="#课后思考" aria-label="Permalink to &quot;课后思考&quot;">​</a></h3><p>虽然门面模式有很多优点，但请你思考下，一个系统中是只有一个门面系统好，还是有多个门面系统更好？为什么？</p><p>欢迎留言分享，我会第一时间给你回复。</p><p>在下一讲，我会接着与你分享&quot;享元模式：如何通过共享对象减少内存加载消耗？&quot;的相关内容，记得按时来听课！</p>',18);function g(c,d,h,A,u,P){const o=s("Image");return r(),n("div",null,[_,p(o,{alt:"image.png",src:"https://s0.lgstatic.com/i/image6/M01/44/5A/Cgp9HWC_ApWASxQzAADkiYzdexY569.png"}),l,p(o,{alt:"设计模式26--金句.png",src:"https://s0.lgstatic.com/i/image6/M00/44/27/Cgp9HWC95TKASVk_AAXofsEmfjA956.png"}),i])}const I=a(e,[["render",g]]);export{T as __pageData,I as default};
