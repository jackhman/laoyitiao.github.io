import{_ as e,D as a,o as l,g as r,J as s,h as o,Q as n,m as t}from"./chunks/framework.f67d7268.js";const K=JSON.parse('{"title":"01体系总览：性能优化体系及关键指标设定","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/前端性能优化方法与实战_文档/(6538) 01  体系总览：性能优化体系及关键指标设定.md","filePath":"posts/frontEnd/前端性能优化方法与实战_文档/(6538) 01  体系总览：性能优化体系及关键指标设定.md","lastUpdated":1696682708000}'),_={name:"posts/frontEnd/前端性能优化方法与实战_文档/(6538) 01  体系总览：性能优化体系及关键指标设定.md"},i=n('<h1 id="_01体系总览-性能优化体系及关键指标设定" tabindex="-1">01体系总览：性能优化体系及关键指标设定 <a class="header-anchor" href="#_01体系总览-性能优化体系及关键指标设定" aria-label="Permalink to &quot;01体系总览：性能优化体系及关键指标设定&quot;">​</a></h1><p>在这讲开始之前，我们先来想象这样一个场景：</p><blockquote><p>一年一度的双十一活动开始了，大家都在祈祷交易系统千万别出问题，有个同事突然发现自家的下单页面变得很慢。哪里出了问题？</p><p>是网络抽风，卡顿了？还是后端接口出问题了？或者是用户的手机环境问题？</p></blockquote><p>你觉得呢？</p><p>遇到这类场景判断问题，你有没有想过，要是有个前端性能标准和预警监控平台就好了。一旦出现异常，直接拿平台上的数据和标准对比，就知道问题出在哪里，以及该怎么解决了。</p><p>那么，这样的想法能实现吗？</p><p>可以。我们整个专栏就是要让你对性能优化体系有个全面认识，然后结合具体的流程和办法教你如何快速找到问题、解决问题。</p><p>接下来，我们先来聊聊这个性能优化体系究竟是个什么东西。</p><h3 id="性能优化体系概览" tabindex="-1">性能优化体系概览 <a class="header-anchor" href="#性能优化体系概览" aria-label="Permalink to &quot;性能优化体系概览&quot;">​</a></h3><p>作为前端工程师，你知道，前端性能优化一般比较琐碎繁杂，那怎么把琐碎的工作系统化呢？</p><p>我一直在想这个问题，直到2016 年完成 58 整站项目性能优化之后，我突然豁然开朗，整理出了一个前端性能体系图。它就像一幅地图，让我一下子对前端性能优化有了一个更清晰而全面的把握，不像以前那样总感觉乱糟糟的。</p><p>那么，这个性能优化体系具体有哪些内容呢？它主要包括三部分：性能优化流程、性能指标采集及上报、性能监控预警平台。</p>',12),c=n('<p>前端性能优化体系</p><h4 id="第一部分-性能优化流程" tabindex="-1">第一部分，性能优化流程 <a class="header-anchor" href="#第一部分-性能优化流程" aria-label="Permalink to &quot;第一部分，性能优化流程&quot;">​</a></h4><p>对应图中灰色部分，主要包括<strong>性能指标设定</strong> 、<strong>性能标准确定</strong> 、<strong>收益评估</strong> 、<strong>诊断清单</strong> 、<strong>优化手段</strong> 、<strong>性能立项</strong> 、<strong>性能实践</strong>。</p><p>其中，<strong>性能指标设定</strong>，说的是我们要选择什么样的指标。比如页面打开慢，我们想要优化它，该从哪些地方入手，优化完后怎么知道问题解决了？这些就需要明确的指标来衡量。</p><p><strong>在设定指标之后，接下就是确定性能标准</strong>。也就是我们性能优化目标是怎样的，优化到什么程度合适。例如，我们要优化 App 里面的 H5 页面打开速度，确定的指标是秒开率，那一秒内可以打开的请求比例就是它的性能标准。</p><p>如果仅仅判断性能指标是否优化到位还好，但很多时候，为了让产品同学感觉我们是为产品服务，而不是又在造轮子，我们还需要关联产品目标进行<strong>收益评估</strong>。比如，列表页到详情页的转化率能不能提升？用户跳出率可不可降低？</p><p>接下来，我们就可以把业务代码接入性能监控预警平台，根据性能标准给出<strong>诊断清单</strong> 。假如诊断出性能问题，我们就可以结合性能标准和诊断清单，确定相应的<strong>优化手段</strong>。</p><p>接着该落地实践了吗？不。还要有个<strong>性能项目立项</strong>。不要小视了这个环节哦，这是你赢得产品经理、后端同事支持，让优化顺利执行下去不可或缺的内容。许多人就是忽略了这一点，导致优化迟迟无法落地。</p><p>最后是<strong>性能实践</strong>，即经过优化之后发起项目上线，并跟踪进行效果评估，结合场景把这些项目成果以文档或代码的形式沉淀下来，给后来者使用参考。</p><p>不要小看这个沉淀文档的重要性，攻城不易，守城更难，制订优化实践，确保新人也可以执行，是优化成果得以长期保持的必要保障。比如之前有个同事通过懒加载解决了滚动列表下拉慢的问题，后来的新同事再遇到同样问题，就可以通过查看这个文档快速解决。</p><h4 id="第二部分-性能指标采集与上报" tabindex="-1">第二部分，性能指标采集与上报 <a class="header-anchor" href="#第二部分-性能指标采集与上报" aria-label="Permalink to &quot;第二部分，性能指标采集与上报&quot;">​</a></h4><p>对应着图中紫色部分，它的主要内容是把前面提到的性能指标以代码的形式分解落地，确保可以采集，然后在 SDK 封装后集合统计埋点，最后根据实际情况，制定上报策略。</p><p>在上报之前，我们还需要注意将一些&quot;脏数据&quot;（也就是明显异常的数据）丢弃掉，避免占用用户网络带宽。</p><h4 id="第三部分-性能监控预警平台" tabindex="-1">第三部分，性能监控预警平台 <a class="header-anchor" href="#第三部分-性能监控预警平台" aria-label="Permalink to &quot;第三部分，性能监控预警平台&quot;">​</a></h4><p>对应图中橙色部分，主要是通过分析上一步采集到的性能数据，再对比性能标准进行监控。当指标超过某一监控阈值时，性能监控预警平台会通过邮件或者短信，给我们发送预警信息。</p><p>在构造上，性能监控预警平台包括：<strong>性能数据处理后台和性能可视化展现前台两部分。</strong></p><p>其中，性能数据处理后台，主要是在性能采集数据上报到性能平台后，对数据进行预处理、数据清洗和数据计算，然后生成前台可视化所需数据。</p><p>性能可视化展现前台包括性能展示、性能监控预警，主要是对核心数据指标进行可视化展现，对性能数据波动进行监控，对超出阈值的数据给出短信或邮件报警。</p><p>最后我还想提醒你注意一点，为了确保没问题，在上线前一定要做性能专项测试，检查一下你采取的措施和性能优化预期是否一致。比如，能否正确发出请求，请求处理流程是否正确，性能平台数据能否展现。如果不一致，那就得继续优化。</p><p>以上就是整个性能体系的优化流程和核心内容了。在专栏后面我还会再详细介绍，这里只是让你有一个整体印象。</p><p>说了这么多，你觉得整个性能优化体系当中，最开始要做的是哪个？比如说，现在出现了一个 6.18 活动页加载数据卡顿的性能问题，我们想要优化它，那么该怎么做？</p><p>要先确定它的性能指标及其标准是什么。因为只有设定好了性能指标，知道了它的标准，接下来我们才知道该围绕着什么来开展性能优化。但实际当中指标有那么多，比如 FPS、白屏、首屏、可操作等，最关键的是哪个？</p><p>所以，接下来我们就聊聊这个问题。</p><h3 id="如何设定性能关键指标" tabindex="-1">如何设定性能关键指标？ <a class="header-anchor" href="#如何设定性能关键指标" aria-label="Permalink to &quot;如何设定性能关键指标？&quot;">​</a></h3><p>这里，我也分两部分来介绍，一个是关注什么样的指标，一个是关键指标的设定及标准。</p><h4 id="什么样的指标值得我们关注" tabindex="-1">什么样的指标值得我们关注？ <a class="header-anchor" href="#什么样的指标值得我们关注" aria-label="Permalink to &quot;什么样的指标值得我们关注？&quot;">​</a></h4><p>根据我的经验和业界情况，要确定关键的性能指标，必须满足两点：</p><ul><li><p>可衡量，就是可以通过代码来度量；</p></li><li><p>关注以用户为中心的关键结果和真实体验。</p></li></ul><p>第一点好理解，无法衡量就无法优化，而第二点说的&quot;关键结果和真实体验&quot;是什么意思呢？</p><p>所谓关键结果，就是用户真正关心什么。举例来说，当用户进入商品详情页面，他关心的是这个商品怎么样，什么价格，具体到页面上就是商品描述、商品头图、商品价格和购买按钮这些关键信息。我们要保证无论什么情况下都能让用户看到这些信息。</p><p>而真实体验，就是用户使用产品的感受。比如当用户进入列表页，在滑动过程中，页面加载突然跳出一个弹窗，他会不会觉得烦？这就是一种真实体验。</p><p>所以，基于这两点，在性能指标方面，我选定加载、交互性和视觉稳定性这三个方向，来带你一起了解性能指标及其标准设定。</p><h4 id="性能优化关键指标设定及标准" tabindex="-1">性能优化关键指标设定及标准 <a class="header-anchor" href="#性能优化关键指标设定及标准" aria-label="Permalink to &quot;性能优化关键指标设定及标准&quot;">​</a></h4><p>所谓加载，就是进入页面时，页面内容的载入过程。比如，当你打开一些网站时，你会发现，有的网站首页上的文字、图片出现很缓慢，而有的则很快，这个内容出现的过程就是加载。加载缓慢严重消耗用户的耐心，会让用户离开页面。</p><p>所谓交互，就是用户点击网站或 App 的某个功能，页面给出的回应。比如我们点击了一个&quot;点赞&quot;按钮，立刻给出了点赞数加一的展示，这就是交互体验好，反之如果很长时间都没回应，这就是交互体验不好。</p><p>视觉稳定性指标，我们叫它 CLS（Cumulative Layout Shift），也就是布局偏移量，它是指页面从一帧切换到另外一帧时，视线中不稳定元素的偏移情况。</p><p>比如，你想要购买的商品正在参加抢购活动，而且时间快要到了。在你正要点击页面链接购买的时候，原来的位置插入了一条 9.9 元包邮的商品广告。结果会怎样？你点成了那个广告商品。如果等你再返回购买的时候，你心仪商品的抢购活动结束了，你是不是很气？所以，CLS也非常重要。</p><p>在性能优化关键指标方面，目前业界主要集中在加载方面，特别是白屏时间和首屏时间。它们直接和用户体验相关，且相关的衡量标准已经达成共识。在采集方式上，除了手动采集之外，还可以自动化采集。而交互性和视觉稳定性关键指标，业界还在探索，没有统一的衡量标准，且必须手动采集。</p><p>比如交互方面，有的公司用 FID 指标 （First Input Delay，首次输入延迟）， 指标必须尽量小于 100ms，如果过长会给人页面卡顿的感觉。还有的公司使用 PSI（Perceptual Speed Index，视觉变化率），衡量标准是小于20%。</p><p>而视觉稳定性指标CLS 比较前沿，2020 年 5 月 Google 公司才发布了一篇文章关于 CLS 指标定义及相关介绍的文章。它的采集方法，除了依赖 Google 的 Lighthouse 做本地采集，目前还没有好的方案。在应用上，其他公司或者沿用 Google 的或者很少使用。</p><p>因为这两个方向还没统一的标准，我们也在实验，就不赘述了，接下来我就重点介绍这目前已经确定的加载关键指标，具体就是白屏时间和首屏时间的设定及其标准。</p><p>什么叫白屏时间呢？它指的是从输入内容回车（包括刷新、跳转等方式）后，到页面开始出现第一个字符的时间。这个过程包括 DNS 查询，建立 TCP 连接，发送首个HTTP请求（如果使用HTTPS还要介入 TLS 的验证时间），返回HTML文档，HTML文档 Head 解析完毕。它的标准时间是 300ms。</p><p>如果白屏时间过长，用户会认为我们的页面不可用，或者可用性差。如果超过一定时间（如 1s），用户注意力就会转移到其他页面。</p><p>哪些因素会导致白屏时间过长？原因有很多，有可能是 DNS 查询时间长，建立 TCP 请求链接太慢，或者是服务器处理请求速度太慢，客户端下载、解析、渲染时长过长，没有做 Gzip 压缩，缺乏本地离线化处理，等等。</p><p>接下来我们看首屏时间，它是怎么计算的？</p><p><strong>首屏时间=白屏时间+渲染时间</strong>。它是指从浏览器输入地址并回车后，到首屏内容渲染完毕的时间。这期间不需要滚动鼠标或者下拉页面，否则无效。</p><p>怎么理解呢？我们来看，下面是网站速度和性能优化 GTmetrix 官网的一个首屏时间示意图。从开始加载到第二帧时，这段时间是白屏时间，到第三帧时，首屏才开始加载，到第四帧结束时，这段时间是首屏时间。</p>',47),h=t("p",null,"首屏时间",-1),u=t("p",null,"在加载性能指标方面，相比于白屏时间，首屏时间更重要。为什么？",-1),d=t("ul",null,[t("li",null,[t("p",null,"从重要性角度看，打开页面后，第一眼看到的内容一般都非常关键，比如电商的头图、商品价格、购买按钮等。这些内容即便在最恶劣的网络环境下，我们也要确保用户能看得到。")]),t("li",null,[t("p",null,"从体验完整性角度看，进入页面后先是白屏，随着第一个字符加载，到首屏内容显示结束，我们才会认为加载完毕，用户可以使用了。")])],-1),g=t("p",null,"白屏加载完成后，仅仅意味着页面内容开始加载，但我们还是没法完成诸如下单购买等实际操作，首屏时间结束后则可以。",-1),m=t("p",null,"首屏时间的标准，最初只是根据这个页面对时间是否敏感来判定，主要以用户平均首屏加载时间来计算，并没有详细区分 2G/3G/4G/WiFi 这些网络环境。比如，下图是我 2011 年在百度文库做性能优化项目时，跟团队定的性能标准。",-1),A=t("p",null,"白屏首屏早期标准",-1),P=t("p",null,"如果一个站点对时间敏感，首屏时间在 1s 内，用户感觉会很快；如果首屏时间超过 2.5s，用户就会感觉很慢。但是在 1s 内打开页面，人们对这么短的时间并不敏感，体验不出 10ms 和 50ms 有什么差别。",-1),q=t("p",null,"但当到了 2G/3G 弱网环境，或者网络不稳定的环境（如坐火车或乘飞机时），用户联网加载的时间会特别长，严重影响整体指标。就好像 100 个穷人和马云一起，看平均资产差不多每人 5 个亿，但实际上多数人并没有那么多钱。性能也如此，前端工程师在使用过程中，越来越觉得用平均值来表示加载时间并不准确可靠。",-1),b=t("p",null,"于是，人们又开始采用中位数，做正态分布，看分位值统计。在对首屏时间进行数据分析和可视化展现时，经常用到的是 P50（50分位值）、P90（90分位值）、P99（99分位值）。它们是怎么得出的呢？以 P99 为例，我们是把所有首屏时间排序，得出排在第 99 位的首屏时间就是 P99。",-1),f=t("p",null,[o("不过这样处理起来还是比较麻烦，后来为了计算简单，也便于理解，我们引入了"),t("strong",null,"秒开率"),o("的指标，即 1s 内打开用户的占比。这个概念最早来自阿里巴巴，后来被业界普遍采用。")],-1),S=t("p",null,"下面是我在带领团队做 App 性能优化项目时，按照秒开率建立的首屏时间标准。",-1),T=t("p",null,"首屏时间秒开率标准",-1),k=t("p",null,"可以说，性能指标和标准建立到这里，已经 OK了，业界能做到这一点的公司屈指可数。",-1),C=t("p",null,"但还有一个问题，首屏时间毕竟粒度太粗了，如果首屏时间长，白屏时间短，到底是哪里的问题？是数据接口的问题，还是页面渲染问题？所以我们还必须把这个指标进一步拆解细化。",-1),D=t("p",null,[t("strong",null,"首屏时间可以拆分为白屏时间、数据接口响应时间、图片加载资源等。"),o(" 白屏时间前面已经提到了，数据接口响应时间可以直接从后端服务中获取，不需要前端再重复计算，我们只需取完放在性能平台即可。最后的图片资源需要我们单独采集。")],-1),x=t("p",null,"以上就是前端性能体系中的关键指标，还有一些不太重要的指标，如卡顿、完全加载时间、资源加载时间等，我在后期介绍采集时再聊。",-1),N=t("h3",{id:"小结",tabindex:"-1"},[o("小结 "),t("a",{class:"header-anchor",href:"#小结","aria-label":'Permalink to "小结"'},"​")],-1),G=t("p",null,"好了，这一讲就到这里。希望今天的内容能让你对整个性能优化体系有个更好的认知，也相信你已经明白，学习性能优化并不仅仅是掌握一些优化技巧就可以了。特别要注意的是，进行性能优化，指标就是我们的一个抓手，首先你就要确定它的指标，然后才能根据指标去采取措施，否则就会像无头苍蝇一样乱撞，没有执行目标。",-1),I=t("p",null,"内容的最后，我想请你思考一个问题：",-1),L=t("blockquote",null,[t("p",null,"前面我重点讲了加载方向的指标，在交互和视觉稳定性两个方向，因为我们还在做指标设定和采集的试验，所以没展开。你有想过这个指标怎么设定和计算的吗？"),t("p",null,"提示：2020 年 12 月 19 日，第 15 届的 D2 会议上 Google 公司也会分享这个指标设定和计算的一些细节。")],-1),M=t("p",null,"欢迎把你的想法写在留言区。下一讲，我们将切入实际优化过程，先从页面打开全过程来看看页面加载链路上的性能瓶颈点。",-1),w=t("hr",null,null,-1),B=t("p",null,"[",-1),F=t("p",null,[o("]("),t("a",{href:"https://shenceyun.lagou.com/t/mka",target:"_blank",rel:"noreferrer"},"https://shenceyun.lagou.com/t/mka"),o(")")],-1),V=t("p",null,[t("strong",null,"《大前端高薪训练营》")],-1),E=t("p",null,[o("12 个月打磨，6 个月训练，优秀学员大厂内推，"),t("a",{href:"https://shenceyun.lagou.com/t/mka",target:"_blank",rel:"noreferrer"},"点击报名，高薪有你"),o("！")],-1);function H(W,O,y,v,z,$){const p=a("Image");return l(),r("div",null,[i,s(p,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M01/04/C2/Cgp9HWAuNm2ASt5qAAFXu-AqwBI232.png"}),o(),c,s(p,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M01/04/BE/CioPOWAuNpyAe4LhAABBpdi97gY708.png"}),o(),h,u,d,g,m,s(p,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M01/04/BF/CioPOWAuN0qAaSb4AAD1t7w10sA207.png"}),o(),A,P,q,b,f,S,s(p,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M01/04/BF/CioPOWAuN0GAA3cAAADYAqokeNs515.png"}),o(),T,k,C,D,x,N,G,s(p,{alt:"溪风的web前端优化.png",src:"https://s0.lgstatic.com/i/image6/M00/05/7D/CioPOWAwzHeAVEFlAAFMjkdIexg335.png"}),o(),I,L,M,w,B,s(p,{alt:"微信图片_20210218174704.png",src:"https://s0.lgstatic.com/i/image6/M00/05/7D/CioPOWAwzC2AW_ZLAAdqMM6w3z0058.png"}),o(),F,V,E])}const R=e(_,[["render",H]]);export{K as __pageData,R as default};
