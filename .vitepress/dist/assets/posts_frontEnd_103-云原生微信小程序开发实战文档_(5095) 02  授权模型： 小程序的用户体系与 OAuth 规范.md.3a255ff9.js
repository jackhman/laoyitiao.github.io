import{_ as e,j as t,o as l,h as i,k as n,f as s,Q as p,s as a}from"./chunks/framework.d3daa342.js";const F=JSON.parse('{"title":"02授权模型：小程序的用户体系与OAuth规范","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5095) 02  授权模型： 小程序的用户体系与 OAuth 规范.md","filePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5095) 02  授权模型： 小程序的用户体系与 OAuth 规范.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/103-云原生微信小程序开发实战文档/(5095) 02  授权模型： 小程序的用户体系与 OAuth 规范.md"},u=p('<h1 id="_02授权模型-小程序的用户体系与oauth规范" tabindex="-1">02授权模型：小程序的用户体系与OAuth规范 <a class="header-anchor" href="#_02授权模型-小程序的用户体系与oauth规范" aria-label="Permalink to &quot;02授权模型：小程序的用户体系与OAuth规范&quot;">​</a></h1><p>你好，我是俊鹏，今天我想跟你聊一下微信小程序的授权模型。</p><p>登录认证是一个完整应用必备的模块，除非你的应用程序不需要任何与用户相关的功能（比如hao123 这种静态导航网站一般不会涉及用户体系）。很多人在最初接触小程序登录功能时，会误认为以微信为入口的小程序使用微信登录，是一件理所当然、毫不费力的事儿，这是错误地将小程序理解成了微信的一部分。</p><p>小程序和微信是一种类似应用与平台的关系，小程序属于微信公众平台，同一个平台下还有微信公众号：</p><ul><li><p>在技术角度上，小程序与微信的关系比公众号更密切，因为公众号的文章本质上是一个 H5 网页，对微信底层的依赖比小程序弱；</p></li><li><p>从产品角度上，二者与微信的关系一致，都是运行在微信平台上的第三方应用。</p></li></ul><p>既然小程序是微信平台的第三方应用，那么在接入微信登录时就要严格遵守官方的接入规范。而在互联网技术领域，对于支持第三方应用接入的平台，在登录授权上有一套标准的技术规范：OAuth 2.0。</p><p>OAuth 2.0 学起来比较枯燥，所以我先带你从最容易理解的小程序登录流程讲起，理解其中涉及的各种术语之后，再理解 OAuth 2.0 规范就容易多了。</p><h3 id="如何搭建微信小程序的登录流程" tabindex="-1">如何搭建微信小程序的登录流程？ <a class="header-anchor" href="#如何搭建微信小程序的登录流程" aria-label="Permalink to &quot;如何搭建微信小程序的登录流程？&quot;">​</a></h3><p>我们认为以微信为宿主的小程序使用微信登录是一件理所当然的事儿，但其实小程序并没有强制要求只能使用微信登录，你完全可以跟 Web 网站一样使用用户名、邮箱等登录方式。**既然如此，为什么我们一定要使用微信登录呢？**因为除了便利性以外，微信登录更重要的优势是整合了微信庞大的生态系统，以及对于产品策略的加持。</p><h4 id="_1-小程序使用微信登录的优势" tabindex="-1">1.小程序使用微信登录的优势 <a class="header-anchor" href="#_1-小程序使用微信登录的优势" aria-label="Permalink to &quot;1.小程序使用微信登录的优势&quot;">​</a></h4><p>小程序是微信平台上的一款第三方应用，在登录方式的选择上有很高的自由度，微信登录仅仅是其中一个选择，你完全可以使用跟其他应用（网站、App）一样的登录方式，比如手机号、邮箱、用户名密码等。</p><p>事实上，对于很多公司来说，微信小程序仅仅是其产品矩阵中的一个应用端，同时存在的还有网站、App 等应用端。</p><p><strong>从生态系统的角度上，</strong> 相对于其他应用端，以微信为入口的小程序最大的优势是拥有微信完善的生态系统，用户使用微信登录后可以使用微信提供给小程序的各种平台级能力，比如订阅消息、微信支付等。</p><p><strong>从用户体验的角度上，</strong> 用户能够很大程度上降低登录的复杂程度。想象一下，对比在小程序内用用户名密码登录和一键微信登录，哪种方式更容易被用户接受呢？结果不言而喻。</p><p><strong>从产品策略的角度上，</strong> 使用微信登录小程序能够根据用户的来源，制定特殊的产品策略，比如对于小程序的用户发放专属的优惠券。</p><p>所以，你可以由此得出小程序使用微信登录的三个主要优势：</p><ul><li><p>融入微信生态；</p></li><li><p>提高用户体验；</p></li><li><p>制定产品策略。</p></li></ul><p>这也说明了小程序接入微信登录的必要性，那它的登录流程是什么呢？</p><p>下面这张图清晰地描绘了微信小程序完整的登录流程、角色以及相关术语。我们先熟悉一下这些内容，然后再结合这套流程学习 OAuth 2.0 规范。</p>',19),c=a("p",null,"微信小程序登录流程示意图",-1),_=a("p",null,[s("整个登录流程中描述了三种角色和六个术语，"),a("strong",null,"了解它们的定位和作用，是理解小程序登录流程的基础。")],-1),h=p('<h4 id="_2-登录流程里的三个角色" tabindex="-1">2.登录流程里的三个角色 <a class="header-anchor" href="#_2-登录流程里的三个角色" aria-label="Permalink to &quot;2.登录流程里的三个角色&quot;">​</a></h4><p>客户端在整个登录流程中主要承担两种行为：</p><ul><li><p>作为整个流程的发起者，获取临时登录凭证 code；</p></li><li><p>作为整个流程的终结者，存储登录态令牌 token。</p></li></ul><p>不过客户端的所有信息和网络请求几乎都是可以被破解或拦截的，所以出于安全的考虑，小程序登录流程中的一些接口被限制不能在客户端中直接调用，而是需要在服务端发起，开发者服务的工作便是处理这些安全敏感的网络请求，体现为上图中使用code 获取 openid 和 session_key的请求，这个请求使用了微信提供的 auth.code2Session 接口。</p><p>而微信接口服务的工作对于开发者来说是不透明的，你需要做的仅仅是根据接口的规范，组装网络请求发送给它，然后根据返回的接口执行分发逻辑。微信服务器会验证网络请求的合法性，对于合法请求下发密钥 session_key 和用户 openid。</p><h4 id="_3-登录流程的六个术语" tabindex="-1">3.登录流程的六个术语 <a class="header-anchor" href="#_3-登录流程的六个术语" aria-label="Permalink to &quot;3.登录流程的六个术语&quot;">​</a></h4><ul><li><strong>code</strong></li></ul><p>它是在客户端（即小程序）内通过 wx.login API 获取的，然后通过 HTTP 请求发送给开发者服务器。code 的作用体现在&quot;临时&quot;两字上，它的有效期限仅有 5 分钟，并且仅能够使用一次（即请求一次 auth.code2Session 接口）。</p><ul><li><strong>appid</strong></li></ul><p>每个微信小程序在创建之后（即在微信公众平台注册并初始化完成）便同时生成了一appid，这个 ID 标记了小程序的唯一性，等同于网站的URL（经过备案的）、App 的包名等标记应用唯一性的信息。</p><ul><li><strong>appsecret</strong></li></ul><p>它是小程序的密钥，可以在微信公众平台的后台管理系统中获取。appsecret　是非常私密的信息，所以微信在制定小程序登录的流程时，将携带此信息的网络请求限制在只能通过开发者服务器发送给微信接口服务，这样对于客户端来说是不可见的，进而降低了被泄露的可能性。与appid 不同的是，appsecret 可以被重置，但每次重置之后，历史的 appsecret 便会失效，所以请谨慎操作。</p><ul><li><strong>openid</strong></li></ul><p>**这里你要注意，很多开发者容易走入一个误区：**误将 openid 理解为用户的唯一 ID。这句话如果放在某个小程序的特定语境下是没有问题的，但是如果放在微信生态的全局角度上是错误的。为什么呢？</p><p>微信对于用户 openid 的定义是：微信号在某个应用程序中的唯一 ID。这里的&quot;某个应用程序&quot;指的是小程序、公众号、接入开放平台的应用。微信生态中目前有公众平台和开放平台两种，其中公众平台又细分为小程序和公众号，开放平台可以接入网站、移动应用等。同一个微信号在不同的应用程序中有不同的 openid。</p><p>在微信生态下另外有一个标记微信号的唯一 ID：UnionId。这个 ID 跟应用程序无关。所以，可以简单地理解为 UnionId 与 appid 综合加密后的结果，见下图：</p>',16),d=p(`<p>UnionId 通常用来关联在不同应用程序中各个 openid ，比如同一个微信号在小程序和公众号内需要配置同样的权限，仅通过 openid 无法实现，便需要获取此微信号的 UnionId。<strong>虽然获取 UnionId 的流程并不在这节课的讨论范围之内，但我相信你在后续工作中一定会遇到处理 UnionId 和 openid 的场景，所以先了解一下没啥坏处。</strong></p><ul><li><strong>session_key</strong></li></ul><p>session_key 是对用户数据进行加密签名的密钥，微信服务器使用它将用户的数据进行加密和解密。你可以简单地将 session_key 理解为获取用户数据的&quot;绿卡&quot;，登录之后所有涉及访问微信服务器的请求一般都需要带上它，微信服务器会校验 session_key 的合法性。</p><p>其实到这一步（即拿到了 openid 和 session_key）已经完成了小程序的登录流程，但对于一个应用程序来说，用户进行登录操作应该是&quot;一劳永逸&quot;的，即登录过一次之后在一定时间之内的后续操作都不需要再次登录，用技术语言描述就是应该保存用户的登录态。这个时候就需要用到接下来的一个术语：token。</p><ul><li><strong>token</strong></li></ul><p>登录态是个逻辑词汇，token 可以理解为登录态的具象化、数据化。在小程序的登录流程图中，你可以看出，token是由开发者服务器创建的一个字符串，而且需要跟 openid 和 session_key 相关联。其实这里并不是强制关联 openid，因为 openid 并不算是私密信息，可以放心地下发到客户端（即小程序）。但是 session_key 是非常私密的信息，一旦泄露有很大的安全隐患，<strong>所以强烈建议不要把它下发到客户端。</strong></p><p>在获取到 openid 和 session_key 之后，开发者服务器创建一个 token，然后与 openid 和session_key 进行关联，具体的方法根据服务器编程语言的不同有多种实现方案。咱们以JavaScript 语言作为示例，可以创建一个对象，对象的 key 是 token 的值，value 是一个包含 openid 和 session_key 的对象，如下：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;token_1&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;openid&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;获取到的openid 1&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;session_key&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;获取到的session_key 1&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }，</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#9ECBFF;">&quot;token_2&quot;</span><span style="color:#E1E4E8;">: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;openid&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;获取到的openid 2&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;session_key&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;获取到的session_key 2&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }，</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;token_1&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;openid&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;获取到的openid 1&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;session_key&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;获取到的session_key 1&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }，</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#032F62;">&quot;token_2&quot;</span><span style="color:#24292E;">: {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;openid&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;获取到的openid 2&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;session_key&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;获取到的session_key 2&quot;</span></span>
<span class="line"><span style="color:#24292E;">    }，</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>关联完成之后开发者服务器将 token下发到客户端，客户端保存在本地，后续的所有请求均需要携带此 token，携带的方法并没有既定的规范，可以通过 URL Query、HTTP Body、Header 等，但通常建议通过 Header 传递，这样相对来说更安全一些。</p><p><strong>讲到这儿，小程序接入微信登录的全部流程便讲解完成了，根据上面的内容我相信你能够搭建一套小程序登录流程。但是这就满足了吗？</strong></p><p>我在最初搭建小程序登录流程时，也是先完成了这些内容的学习，但在完成了登录需求之后却并没有满足于仅仅知晓怎么搭建和使用，而是迫切地想进一步了解每个术语存在的意义，以及为什么登录流程被设计成这套形态。换句话说就是&quot;知其然更知其所以然&quot;。</p><p>我相信你一定也想更进一步丰富自己的知识储备，如果被我说中了，那么接下来我们就一起来学习小程序登录流程背后的 OAuth 2.0 规范吧。</p><h3 id="oauth-2-0-规范-知其然更知其所以然" tabindex="-1">OAuth 2.0 规范：知其然更知其所以然 <a class="header-anchor" href="#oauth-2-0-规范-知其然更知其所以然" aria-label="Permalink to &quot;OAuth 2.0 规范：知其然更知其所以然&quot;">​</a></h3><h4 id="_1-oauth-2-0-规范中的角色划分" tabindex="-1">1.OAuth 2.0 规范中的角色划分 <a class="header-anchor" href="#_1-oauth-2-0-规范中的角色划分" aria-label="Permalink to &quot;1.OAuth 2.0 规范中的角色划分&quot;">​</a></h4><p>咱们先思考一个问题：小程序登录之后如果需要访问用户的数据（比如昵称、地域、性别等）需要得到谁的授权？是微信？还是用户？</p><p>答案是用户。用户的数据虽然存放在微信的服务器之上，但是这些数据的所有权属于用户自己，而不是微信。这里其实引出了 OAuth 2.0 规范中的两个基本概念。</p><ul><li><p>Resource Owner：资源所有者，即用户；</p></li><li><p>Resource Server：资源服务器，即微信。</p></li></ul><p>而小程序在获取用户数据中的角色是作为微信平台的第三方应用程序，在 OAuth 2.0 规范中的术语为 Third-party application。</p><p>除了以上三种角色之外，OAuth 2.0规范中还有另外三种角色：</p><ul><li><p>小程序依托于微信提供的底层技术平台（即 01 讲中的双线程模型），微信为小程序提供了与用户（即Resource Owner）沟通的工具，它在 OAuth 2.0 规范中的角色被称为 User Agent（用户代理）。</p></li><li><p>微信服务器不仅仅作为 Resource Server 保存用户数据，同时在登录授权过程中又提供了HTTP服务以及授权认证功能，这两个功能的角色在 OAuth 2.0 规范中分别被称为 HTTP Service（HTTP服务提供商）和Authorization server（认证服务器）。</p></li></ul><p>以上便是 OAuth 2.0 规范中的所有角色，为了加强了解，我们再梳理一遍：</p><ul><li><p>Resource Owner（资源所有者）：在小程序场景下代表小程序的用户。</p></li><li><p>Resource Server（资源服务器，即存放用户数据、资源的服务器）：在小程序场景下这个角色由微信服务器承担。</p></li><li><p>Third-party application（第三方应用程序/又称客户端）：在小程序场景下代表小程序。</p></li><li><p>User Agent（用户代理）：在小程序场景下代表微信。</p></li><li><p>Authorization server（认证服务器）：在小程序场景下，这个角色由微信服务器承担。</p></li><li><p>HTTP Service（HTTP 服务提供商）：在小程序场景下，这个角色由微信服务器承担。</p></li></ul><p>学到这儿，你有没有疑惑<strong>为什么 OAuth 2.0 规范中的角色与小程序登录流程中角色不一样？</strong></p><p>其实，小程序登录流程中的三个角色是按照实体划分的，而 OAuth 2.0 规范的角色是按照功能划分的，同一个实体可以担任一种或多种功能。</p><p>在小程序登录流程中的 3 个实体角色中，微信服务器同时担任 Resource Server、Authorization server 和HTTP Service 的功能；开发者服务器比较特殊，它即担任 HTTP Service 的功能，同时在认证流程中由于需要转发和关联 token，所以也充当了客户端的一部分功能。</p><p>而OAuth 2.0 规范如此分配角色，是为了规范一套严谨的授权流程。那么它到底解决了什么问题呢？</p><h4 id="_2-oauth-2-0-规范要解决什么问题" tabindex="-1">2.OAuth 2.0 规范要解决什么问题 <a class="header-anchor" href="#_2-oauth-2-0-规范要解决什么问题" aria-label="Permalink to &quot;2.OAuth 2.0 规范要解决什么问题&quot;">​</a></h4><p>先卖个关子，想一下这样的场景。</p><p>比如你向邻居借了衣架忘了还，某天邻居着急使用所才打电话向你要回，不巧的是你正在外地出差家里没人。但好在你家的门锁是智能门锁，你可以将密码告诉邻居让他自己去你家里取。但是你本着&quot;防人之心不可无&quot;的心理，担心邻居是否会趁机记下甚至修改你家的门锁密码。左右为难的时候，你突然想起来你家的智能门锁可以创建临时密码，这种临时密码只能在 10 分钟之内有效，而且没有修改原本密码的权限。所以，最终你在手机上创建了一个临时智能门锁的密码发给你的邻居。</p><p>OAuth 2.0 规范要解决的问题与上面提到的这个现实案例非常相似，简单概括就是：OAuth 2.0是一个授权机制，资源所有者告诉认证服务器，临时授予某个第三方应用访问资源服务器获取资源的权限，认证服务器给第三方应用颁发一个临时令牌，拥有这个令牌便可以获取资源数据，一旦令牌过期或失效便收回权限。</p><p>OAuth 2.0 规范中的令牌与小程序登录场景下的 token 作用是一致的，只不过 OAuth 规范只定义了令牌的作用，并没有限制它的具体使用方法，微信把 token 与 session_key 相关联，开发者服务器通过 token 取到 session_key 进而解密用户资源数据，这种使用方法是在遵循 OAuth 规范前提下的一种具体实践。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>这节课与上一节课的出发点有一项是共通的：我并不仅仅是告诉你如何搭建和使用微信小程序的登录流程，而是想通过这个流程引导你去学习它背后的原理知识。</p><p>小程序登录流程只是在小程序这一单一场景下的具体实践，而它背后的 OAuth 2.0 规范是在互联网业内通用的标准，以后不论是你想要接入其他第三方认证还是开发自己的认证系统，都需要遵守 OAuth2.0 规范才能够做到标准化、产品化。</p>`,34),E=p('<p>通过这节课我希望你能够有以下收获：</p><ol><li><p>理解并学会搭建小程序的登录体系；</p></li><li><p>熟悉 OAuth 2.0 规范，并了解授权认证的基本流程和相关术语。</p></li></ol><p>其实这节课并没有把 OAuth 2.0 规范的所有内容全部描述出来，因为我们讨论的核心还是围绕小程序，所以只讲了跟小程序相关的内容。而 OAuth 2.0 规范其实囊括了 Web、移动应用等，所以我想给你留一个课后作业：思考 Web 和移动应用在实现 OAuth 2.0 的授权流程上有什么区别？</p><p>下一节课我们将学习小程序的自定义组件，带你了解小程序在UI方面的独到之处。</p><hr><p><strong>《大前端高薪训练营》</strong></p><p>拉勾直推机会+硬核实战干货，6个月助你轻松斩获高薪 offer。<a href="https://kaiwu.lagou.com/fe_enhancement.html?utm_source=lagouedu&amp;utm_medium=zhuanlan&amp;utm_campaign=%E5%A4%A7%E5%89%8D%E7%AB%AF%E9%AB%98%E8%96%AA%E8%AE%AD%E7%BB%83%E8%90%A5" target="_blank" rel="noreferrer">点此链接，快来领取！</a></p>',7);function y(A,q,g,k,T,O){const o=t("Image");return l(),i("div",null,[u,n(o,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/67/6D/CgqCHl-hNu2AKHvwAAFHJorIbB4943.png"}),s(),c,_,n(o,{alt:"Lark20201103-190136.png",src:"https://s0.lgstatic.com/i/image/M00/67/6E/CgqCHl-hOLKAND7sAAB9sqfQtSQ515.png"}),s(),h,n(o,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/67/6D/CgqCHl-hNxeAaEBiAACDfUX77Nw561.png"}),s(),d,n(o,{alt:"小程序 02--金句.png",src:"https://s0.lgstatic.com/i/image/M00/6E/5A/CgqCHl-yL3qATCOOAAFuZ-wZet0861.png"}),s(),E])}const C=e(r,[["render",y]]);export{F as __pageData,C as default};
