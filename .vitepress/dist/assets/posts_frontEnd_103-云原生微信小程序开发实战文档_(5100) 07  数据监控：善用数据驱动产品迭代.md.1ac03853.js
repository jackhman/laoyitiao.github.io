import{_ as o,j as e,o as t,g as c,k as p,s,h as n,Q as l}from"./chunks/framework.e0c66c3f.js";const I=JSON.parse('{"title":"数据建模：性能、用户和异常 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5100) 07  数据监控：善用数据驱动产品迭代.md","filePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5100) 07  数据监控：善用数据驱动产品迭代.md","lastUpdated":1696338709000}'),r={name:"posts/frontEnd/103-云原生微信小程序开发实战文档/(5100) 07  数据监控：善用数据驱动产品迭代.md"},E=s("p",null,"你好，我是俊鹏，今天我们一起学习如何打造小程序的数据监控体系。",-1),y=s("p",null,[n("前几年，我看了《人人都是产品经理》这本畅销书，我觉得它给了我们一个很有意义的启示："),s("strong",null,"技术之外，多思考产品"),n("。而数据对产品的意义很大，拿这节课来说，数据监控体系中，一个很重要的环节就是埋点。应用端侧的开发者，在工作中或多或少地都编写过埋点代码，这部分工作往往因为枯燥也没什么技术含量不被人欢迎，我刚开始工作时也有这种心理，觉得埋点不但累，还毫无意义。可当我深入了解数据带来的价值之后，改变了这种看法。")],-1),i=s("p",null,'《精益创业：新创企业的成长思维》里提到的一个循环反馈的创业思想：构建-衡量-学习。通过"构建"把想法变成具体的产品能力，通过"衡量"把产品抽象的市场反馈具象为可量化的数据，再通过"学习"理解这些数据中用户和市场对于产品的反馈情况，及时改善想法后进入下一次循环：',-1),g=s("p",null,[n("简单来讲，就是通过敏捷开发快速迭代最小可行性产品，再参照衡量结果快速验证和纠正产品细节。这种思想得到了普遍认可和实施，适合任何阶段的产品团队。那么在这个循环中，"),s("strong",null,"数据是连接市场与企业的桥梁，这就是它的意义，同时也是技术人关注数据的原因。"),n(" 因为数据决定了产品的迭代方向，也就决定了对于技术研发的业务需求，进而决定了我们面临什么样的挑战和创新。")],-1),d=l('<p>明确了数据的意义之后，你还要对数据有充分的了解，这是你搭建针对小程序的数据监控体系的必要前提。</p><p><strong>数据的生命周期可以简单地分为两部分：第一是统计，第二是分析。</strong> 数据分析是一项需要深度专业领域知识的工作，包括数学、统计学以及应对特定业务领域的一些专属学科，比如电商领域的数据分析往往需要一定的经济学知识。很多大厂会专门设立数据科学家的岗位，市场上也有很多付费的数据分析平台，这些科学家或平台甚至可能用到了机器学习，比如 Google 的 BigQuery ML 。</p><p>数据&quot;分析&quot;往往需要专业的岗位和人员负责，而对于研发，在数据生命周期中负责的是数据的&quot;统计&quot;，这也是数据监控体系要完成的工作。数据统计也可以细分为两部分：</p><ul><li><p>数据建模，明确需要统计的数据类型。</p></li><li><p>采集方案，制定收集数据的具体措施。</p></li></ul><h3 id="数据建模-性能、用户和异常" tabindex="-1">数据建模：性能、用户和异常 <a class="header-anchor" href="#数据建模-性能、用户和异常" aria-label="Permalink to &quot;数据建模：性能、用户和异常&quot;">​</a></h3><p>一个应用程序需要统计的数据从类型划为：性能数据、用户数据和异常数据，这三种数据类型同样适用于微信小程序。接下来我们便从这三种类型的数据入手，学习各自涵盖的细节以及三者之间的关联。</p><h4 id="性能数据" tabindex="-1">性能数据 <a class="header-anchor" href="#性能数据" aria-label="Permalink to &quot;性能数据&quot;">​</a></h4><p>04讲我们学习了如何通过微信开发者工具的体验评分功能，辅助我们优化小程序的性能，优化性能的目标主要有两个：</p><ul><li><p>减少用户打开小程序（或某个页面）后的等待时间，这部分的性能称为启动性能；</p></li><li><p>提高用户操作小程序的流畅度，这部分的性能称为运行时性能。</p></li></ul>',9),F=l('<h4 id="用户数据" tabindex="-1">用户数据 <a class="header-anchor" href="#用户数据" aria-label="Permalink to &quot;用户数据&quot;">​</a></h4><p>用户的数据可以分为两种类型：一是静态数据，包括用户的年龄、性别、地域等信息，这些数据叫&quot;用户画像&quot;；二是动态数据，或者称为用户行为数据，这是一个比较宽泛的概念，可以细分为很多子项，比如：</p><ul><li><p>用户在使用小程序期间的一些交互操作数据，比如点击某个按钮，从页面A切换到页面B；</p></li><li><p>用户的行为踪迹，比如先点击页面A的某个按钮然后点击另一个按钮最后切换到页面B；</p></li><li><p>用户在某个页面的停留时长；</p></li><li><p>用户的留存率；</p></li><li><p>......</p></li></ul><p>上面只是几种相对普遍的用户行为数据子项目，在现实场景中根据业务类型的不同还会演化出更多领域专属的行为数据类型（如图所示）：</p>',4),u=s("h4",{id:"异常数据",tabindex:"-1"},[n("异常数据 "),s("a",{class:"header-anchor",href:"#异常数据","aria-label":'Permalink to "异常数据"'},"​")],-1),A=s("p",null,"异常数据有三种类型：",-1),h=s("ul",null,[s("li",null,[s("p",null,"端侧的代码异常，比如小程序 JavaScript 脚本的某段逻辑执行报错；")]),s("li",null,[s("p",null,"服务异常，不过这类异常情况不仅仅是小程序服务端的问题，也可能是用户设备所在网络环境造成的 HTTP 请求失败；")]),s("li",null,[s("p",null,"行为异常，最常见的一种就是爬虫脚本频繁地请求某个服务接口。")])],-1),_=s("p",null,"性能数据、用户数据和异常数据三者相对独立，而我们统计数据的目的并不是收集这些独立的数据，而是希望将它们综合在一起进行分析，这样才能从多维度、多方面获取数据隐藏的信息。也就是将所有数据通过一定的联系归属到在更上一层的领域内分析。",-1),C=s("p",null,[n("那么在小程序场景下，"),s("strong",null,"把这三种类型数据联系到一起的上层领域就是小程序的每个页面-Page"),n(" 。"),s("strong",null,"页面再上一层的领域就是小程序的运行环境"),n("（包括用户设备信息和小程序的版本信息）。由此我们可以总结出小程序的数据统计所使用的的数据模型，如下图所示：")],-1),D=l('<p>确定了数据模型，接下来就是制定针对每种数据的采集方案。</p><h3 id="采集方案-自动化工具和-api-劫持" tabindex="-1">采集方案：自动化工具和 API 劫持 <a class="header-anchor" href="#采集方案-自动化工具和-api-劫持" aria-label="Permalink to &quot;采集方案：自动化工具和 API 劫持&quot;">​</a></h3><p>不同类型的数据在采集方案上也有一定的不同，其中性能数据、异常数据相对于用户数据来说与业务的关联度并不高，所以对应的采集方案也更具有通用性。而用户数据数据量更庞大、与业务场景的关联性比较高，所以我们尽量提取一些具备普适性的方案讲述。</p><h4 id="性能数据采集" tabindex="-1">性能数据采集 <a class="header-anchor" href="#性能数据采集" aria-label="Permalink to &quot;性能数据采集&quot;">​</a></h4><p>单独看性能数据没有任何价值，只有对比才能体现出应用程序的性能好坏。当然，我们没有必要过分地追求性能，在保证功能的前提下，结合团队资源（包括人力、物力）分配出合理的成本投入到性能优化上就可以了。</p><p><strong>性能数据的采集通常会放在小程序发布前的研发或测试阶段，将其作为自动化测试的一部分</strong>。当然这并不是说采集小程序线上的性能数据没价值，而是必要性不足，因为影响线上性能数据的外界因素太多了，用户的网络情况、设备状态等都有可能造成某一时刻（甚至某一时间段之内）的性能数据波动，这种情况下统计的数据大多是没有实际价值的。而在研发或测试阶段往往是在固定的外界环境中进行性能数据的采集，多次抽样取期望值，然后与历史数据进行对比和评估。</p><p>具体到性能数据的采集方法上，主流的有两种：</p><ul><li><p>截图+图片比对。</p></li><li><p>使用官方提供的<a href="https://developers.weixin.qq.com/miniprogram/dev/framework/performance/tools.html" target="_blank" rel="noreferrer">性能 Trace 工具</a>导出数据。</p></li></ul><p>第一种方法跟 06 讲的自动化测试类似，在对小程序进行仿真操作的过程中按照一定的频率进行截图，然后使用工具进行图片比对，从而获取到一些性能数据，比如小程序启动耗时、首屏渲染耗时等等。通过这种方法获取到的性能数据有一个特点，数据的精细度与截图的频率和图片比对工具的准确性成正比，实施的成本相对比较高。</p><p>第二种方法能直接获取到各项性能指标的数值，包括启动耗时、下载耗时、渲染耗时......比第一种方法实施的成本低很多，而且数据精准度更高。但目前只能在 Android 手机上拿到 Trace 工具的数据，iPhone 暂时不支持。</p><p>这里要注意，粗粒度的性能数据并不是没有价值，正向我刚才说的&quot;只有经过对比的性能数据才有意义&quot;，所以数据的精细度对于性能数据真实性的影响并不大。<strong>所以结合两种采集方法的优缺点，我们可以得到一个综合方案：</strong></p><ul><li><p>使用截图+图片比对的方法应对所有类型的设备，获取相对粗粒度的性能数据；</p></li><li><p>在 Android 设备上使用性能 Trace 工具获取更精细的数据。</p></li></ul><h4 id="异常数据和用户数据采集" tabindex="-1">异常数据和用户数据采集 <a class="header-anchor" href="#异常数据和用户数据采集" aria-label="Permalink to &quot;异常数据和用户数据采集&quot;">​</a></h4><p>异常数据和用户数据的采集方案有很多共通之处，所以我把它们放到一起讲。</p><p>刚刚我提到，异常数据分为代码异常、服务异常和行为异常：</p><ul><li><p>行为异常比如爬虫，在端侧是无法知悉的，防爬防刷是服务器安全保障的一部分，所以行为异常的监控一般都是由服务端承担，你可以把这项工作交给服务端的同事。</p></li><li><p>服务异常的数据来源有两种，一种是用户网络原因导致的请求失败或超时，一种是服务器本身出了问题。第二种与行为异常同样是属于服务端的职责，而在小程序端侧只能够介入第一种异常数据的采集，在采集方案上与代码异常是一致的。</p></li></ul><p><strong>异常数据的采集也可以称为异常监控，采集到异常本身并不是主要目标，更重要的是能够采集到引起异常的用户行为路径。</strong> 比如对于电商小程序典型的购买商品的链路：用户点击了商品详情页的&quot;购买&quot;按钮，首先跳转到&quot;购物车&quot;页面，然后继续点击&quot;下单&quot;跳转到订单页面，最后点击&quot;支付&quot;调起微信支付。这个过程用户一共需要四个步骤：</p>',17),B=l(`<p>假如在这条链路中的&quot;购物车&quot;页面出现了异常，我们要采集的并不仅仅是当前页面脚本抛出的异常本身，而是要同时获取到引起异常的前序路径，即&quot;商品页&quot;信息。</p><p><strong>用户行为数据的采集同样如此。</strong> 我们要获取的并不仅仅是用户点击了哪个按钮，还需要采集到这个按钮所在的页面，如果此页面是由其他页面跳转而来还需要采集前序页面的路径信息。<strong>这就是为何我们把异常数据和用户数据的采集方案放到一起讲解的主要原因。</strong></p><p>明确了需要采集用户行为路径，下一步就是我开篇提到的埋点，你可以使用一些新技术和特殊技巧摆脱&quot;最脏最累&quot;的代码埋点。</p><p>还是以刚才的商品购买链路为例，点击商品页的&quot;购买&quot;按钮会触发跳转购物车，如下：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">Page</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">gotoCart</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">    wx.</span><span style="color:#B392F0;">navigateTo</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      url: </span><span style="color:#9ECBFF;">&#39;pages/cart?id=xxx&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">Page</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">gotoCart</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">    wx.</span><span style="color:#6F42C1;">navigateTo</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      url: </span><span style="color:#032F62;">&#39;pages/cart?id=xxx&#39;</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><p>然后在购物车页面中获取 URL 中携带的商品 ID：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">Page</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">onLoad</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">query</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">id</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> query;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">Page</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">onLoad</span><span style="color:#24292E;">(</span><span style="color:#E36209;">query</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">id</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> query;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><p>如果使用最原始的代码埋点，需要在两个页面的函数中手动填写埋点代码，如下：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 商品页</span></span>
<span class="line"><span style="color:#B392F0;">Page</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">gotoCart</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">reportClientLog</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// ...上报商品页数据</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">    wx.</span><span style="color:#B392F0;">navigateTo</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      url: </span><span style="color:#9ECBFF;">&#39;pages/cart?id=xxx&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"><span style="color:#6A737D;">// 购物车页面</span></span>
<span class="line"><span style="color:#B392F0;">Page</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">onLoad</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">query</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">reportClientLog</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// ...上报购物车页面数据</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { </span><span style="color:#79B8FF;">id</span><span style="color:#E1E4E8;"> } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> query;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 商品页</span></span>
<span class="line"><span style="color:#6F42C1;">Page</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">gotoCart</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">reportClientLog</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// ...上报商品页数据</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">    wx.</span><span style="color:#6F42C1;">navigateTo</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      url: </span><span style="color:#032F62;">&#39;pages/cart?id=xxx&#39;</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"><span style="color:#6A737D;">// 购物车页面</span></span>
<span class="line"><span style="color:#6F42C1;">Page</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">onLoad</span><span style="color:#24292E;">(</span><span style="color:#E36209;">query</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">reportClientLog</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// ...上报购物车页面数据</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { </span><span style="color:#005CC5;">id</span><span style="color:#24292E;"> } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> query;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><p>这种方式既费时、费力又难以维护，因为如果在后续迭代中不需要统计某个函数的行为，就要找到这个函数的埋点代码手动删除。所以我们要来解决这样的问题，这里需要用到 ES 6 的一些新特性：Proxy 和 Reflect 。目前小程序运行时还不支持这些特性，你可以借助 Babel 将其转化为 ES 5 语法（还记得 05 讲的 Webpack 构建工具吗？它可以帮助你实现这项需求）。</p><p>用 Proxy 和 Reflect 实现埋点的思路非常简单：代理（也可以称为<strong>劫持</strong>）小程序的 API ，在调用 API 的同时采集数据。以上述案例中用到的小程序 Page 对象为例，使用 Proxy 和 Reflect 实现 API 代理：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">Page </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Proxy</span><span style="color:#E1E4E8;">(Page, {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">target</span><span style="color:#E1E4E8;">,</span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">,</span><span style="color:#FFAB70;">context</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">originHandler</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Reflect.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(target,key,context);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 只代理函数</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> originHandler </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;function&#39;</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">...</span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">reportClientLog</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// ...上报数据</span></span>
<span class="line"><span style="color:#E1E4E8;">        });</span></span>
<span class="line"><span style="color:#E1E4E8;">        originHandler.</span><span style="color:#B392F0;">call</span><span style="color:#E1E4E8;">(context,</span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">args);</span></span>
<span class="line"><span style="color:#E1E4E8;">      }.</span><span style="color:#B392F0;">bind</span><span style="color:#E1E4E8;">(context);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> originHanlder;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">Page </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Proxy</span><span style="color:#24292E;">(Page, {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#E36209;">target</span><span style="color:#24292E;">,</span><span style="color:#E36209;">key</span><span style="color:#24292E;">,</span><span style="color:#E36209;">context</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">originHandler</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Reflect.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(target,key,context);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 只代理函数</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> originHandler </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;function&#39;</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">...</span><span style="color:#E36209;">args</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">reportClientLog</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// ...上报数据</span></span>
<span class="line"><span style="color:#24292E;">        });</span></span>
<span class="line"><span style="color:#24292E;">        originHandler.</span><span style="color:#6F42C1;">call</span><span style="color:#24292E;">(context,</span><span style="color:#D73A49;">...</span><span style="color:#24292E;">args);</span></span>
<span class="line"><span style="color:#24292E;">      }.</span><span style="color:#6F42C1;">bind</span><span style="color:#24292E;">(context);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> originHanlder;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><p>将以上代码封装为一个独立的 JavaScript 文件，假设名称为 report.js ，然后在小程序中引入：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;./report.js&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#B392F0;">Page</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;./report.js&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#6F42C1;">Page</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>经过以上改造，每当调用 Page 的 API 时都会上报数据。但是当调用 Page 的任何一个 API 都会上报数据，而大多数情况下只需要统计有限的几个 API ，所以要为 report.js 引入一种白名单机制：只有在名单之内的 API 上报数据。改造的方式也很简单。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">report</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">obj</span><span style="color:#E1E4E8;">,</span><span style="color:#FFAB70;">apilist</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Proxy</span><span style="color:#E1E4E8;">(obj, {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">target</span><span style="color:#E1E4E8;">,</span><span style="color:#FFAB70;">key</span><span style="color:#E1E4E8;">,</span><span style="color:#FFAB70;">context</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">originHandler</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Reflect.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(target,key,context);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 只代理列表内的函数</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> originHandler </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;function&#39;</span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;">apiList.</span><span style="color:#B392F0;">includes</span><span style="color:#E1E4E8;">(key)){</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">...</span><span style="color:#FFAB70;">args</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">reportClientLog</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// ...上报数据</span></span>
<span class="line"><span style="color:#E1E4E8;">        });</span></span>
<span class="line"><span style="color:#E1E4E8;">        originHandler.</span><span style="color:#B392F0;">call</span><span style="color:#E1E4E8;">(context,</span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">args);</span></span>
<span class="line"><span style="color:#E1E4E8;">      }.</span><span style="color:#B392F0;">bind</span><span style="color:#E1E4E8;">(context);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> originHanlder;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}); </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">report</span><span style="color:#24292E;">(</span><span style="color:#E36209;">obj</span><span style="color:#24292E;">,</span><span style="color:#E36209;">apilist</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Proxy</span><span style="color:#24292E;">(obj, {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#E36209;">target</span><span style="color:#24292E;">,</span><span style="color:#E36209;">key</span><span style="color:#24292E;">,</span><span style="color:#E36209;">context</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">originHandler</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Reflect.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(target,key,context);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 只代理列表内的函数</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> originHandler </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;function&#39;</span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;">apiList.</span><span style="color:#6F42C1;">includes</span><span style="color:#24292E;">(key)){</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">...</span><span style="color:#E36209;">args</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">reportClientLog</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// ...上报数据</span></span>
<span class="line"><span style="color:#24292E;">        });</span></span>
<span class="line"><span style="color:#24292E;">        originHandler.</span><span style="color:#6F42C1;">call</span><span style="color:#24292E;">(context,</span><span style="color:#D73A49;">...</span><span style="color:#24292E;">args);</span></span>
<span class="line"><span style="color:#24292E;">      }.</span><span style="color:#6F42C1;">bind</span><span style="color:#24292E;">(context);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> originHanlder;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}); </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>你应该也注意到了，上面这段代码不仅加入了白名单机制，而且还把被代理的对象改成了动态的参数，这样便可以适用于任何对象，比如小程序的 App 和 Page 对象：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">report</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;./report.js&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#6A737D;">// app.js</span></span>
<span class="line"><span style="color:#E1E4E8;">App </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">report</span><span style="color:#E1E4E8;">(App, [</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;onShow&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;onLoad&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;onLaunch&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">]);</span></span>
<span class="line"><span style="color:#B392F0;">App</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"><span style="color:#6A737D;">// page.js</span></span>
<span class="line"><span style="color:#E1E4E8;">Page </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">report</span><span style="color:#E1E4E8;">(Page, [</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;onShow&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;onHide&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;onLoad&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&#39;gotoCart&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">]);</span></span>
<span class="line"><span style="color:#B392F0;">Page</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">report</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;./report.js&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#6A737D;">// app.js</span></span>
<span class="line"><span style="color:#24292E;">App </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">report</span><span style="color:#24292E;">(App, [</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;onShow&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;onLoad&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;onLaunch&#39;</span></span>
<span class="line"><span style="color:#24292E;">]);</span></span>
<span class="line"><span style="color:#6F42C1;">App</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"><span style="color:#6A737D;">// page.js</span></span>
<span class="line"><span style="color:#24292E;">Page </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">report</span><span style="color:#24292E;">(Page, [</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;onShow&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;onHide&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;onLoad&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&#39;gotoCart&#39;</span></span>
<span class="line"><span style="color:#24292E;">]);</span></span>
<span class="line"><span style="color:#6F42C1;">Page</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><p>到目前为止，我们完成了数据采集的实施方案，当然我们肯定会根据现实业务的需求做出调整和改造，比如制定上报数据的格式规范、上报时机、处理离线数据等细节（这些内容与业务有强关联性，这节课我只是提供一些普适性较高的思想和方法）。</p><p><strong>采集到所需数据之后，然后就是根据这些数据****做分析、决策了 。</strong></p><p>数据分析需要非常深入的领域专属知识甚至特定的岗位，这指的是的对用户数据的分析，包括用户画像数据和行为数据，这些数据会影响产品的决策和迭代策略。而性能数据和异常数据可以认为是纯技术范畴内的概念。</p><p>性能数据能够帮助技术研发人员发现影响应用程序性能的不良因素，然后进行专项优化。异常数据主要的作用是监控线上环境存在的问题，然后根据问题影响面的大小制定告警策略，比如当监控到影响功能逻辑的严重脚本错误，后台监控服务会通过邮件、短信、电话的方式通知责任人督促尽快解决。</p><p>整体的数据监控体系可以简化为下面这张图：</p>`,23),v=s("h3",{id:"总结",tabindex:"-1"},[n("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),P=s("p",null,"数据监控体系是一套非常庞大的整体性方案，这节课我只讲述了一些具备通用性的理论和实践方案，在现实工作中这些是最基本、最通用的，你需要掌握。而到了业务层则需要更多定制化方案。这节课，我想强调这样几个重点：",-1),x=s("ul",null,[s("li",null,[s("p",null,"数据不仅仅对产品和运营有价值，对于研发同样意义非凡，你需要明确这一点，在以后的工作中将数据重视起来；")]),s("li",null,[s("p",null,"性能的评估通常作为自动化测试的一部分，而异常监控则是针对生产环境的。作为一名研发，你需要时刻关注这两种数据，并且有针对性地进行改善；")]),s("li",null,[s("p",null,"采集小程序的异常数据和用户数据可以通过劫持小程序 SDK 的 API ，这样能够减轻代码埋点的工作量，并且降低后续维护的成本。")])],-1),m=s("p",null,"今天的课后作业有一定难度，需要你去学习一些新知识，我们在异常数据和用户数据的采集方案中提到了使用 Proxy 和 Reflect 实现 API 代理，其实还有更优雅、可定制性更高的方式，就是使用 TypeScript 的装饰器 Decorator 。今天的课后作业就是：请你尝试使用 Decorator 实现 API 的代理。",-1);function b(q,k,f,T,j,w){const a=e("Image");return t(),c("div",null,[E,y,i,p(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/6E/76/CgqCHl-yXi6AC3k9AAAsuIZLm64532.png"}),g,p(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/6E/6B/Ciqc1F-yXjWASNbhAAC6xwxCtZY694.png"}),d,p(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/6E/6B/Ciqc1F-yXkuAYKf3AABDxFwzBew969.png"}),F,p(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/6E/6B/Ciqc1F-yXlmAHB2mAAB6mZnxXdA770.png"}),u,A,h,p(a,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/6E/76/CgqCHl-yXmGADzoqAACROK_6gno880.png"}),_,C,p(a,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image/M00/6E/76/CgqCHl-yXmiANBSsAACxJguRdCE590.png"}),D,p(a,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image/M00/6E/76/CgqCHl-yXpuAIblwAAAx-bbxphY711.png"}),B,p(a,{alt:"Drawing 14.png",src:"https://s0.lgstatic.com/i/image/M00/6E/76/CgqCHl-yXrCAfoTnAACK-u5AIH0425.png"}),v,P,x,m])}const S=o(r,[["render",b]]);export{I as __pageData,S as default};
