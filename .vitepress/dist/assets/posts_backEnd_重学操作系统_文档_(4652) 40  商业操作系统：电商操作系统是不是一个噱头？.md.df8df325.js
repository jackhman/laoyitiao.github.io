import{_ as t,o as p,h as a,Q as o}from"./chunks/framework.d3daa342.js";const u=JSON.parse('{"title":"40商业操作系统：电商操作系统是不是一个噱头？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/重学操作系统_文档/(4652) 40  商业操作系统：电商操作系统是不是一个噱头？.md","filePath":"posts/backEnd/重学操作系统_文档/(4652) 40  商业操作系统：电商操作系统是不是一个噱头？.md","lastUpdated":1696682708000}'),r={name:"posts/backEnd/重学操作系统_文档/(4652) 40  商业操作系统：电商操作系统是不是一个噱头？.md"},e=o('<h1 id="_40商业操作系统-电商操作系统是不是一个噱头" tabindex="-1">40商业操作系统：电商操作系统是不是一个噱头？ <a class="header-anchor" href="#_40商业操作系统-电商操作系统是不是一个噱头" aria-label="Permalink to &quot;40商业操作系统：电商操作系统是不是一个噱头？&quot;">​</a></h1><p>关于电商操作系统是不是一个噱头？我觉得对于想要哄抬股价、营造风口的资本来说，这无疑是一场盛宴。但是对于从事多年业务架构，为了这件事情努力的架构师们而言，这似乎不是一个遥远的梦想，而是可以通过手中的键盘、白板上的图纸去付诸实践的目标。</p><p>我们暂且不为这个问题是不是噱头定性，不如先来聊一聊<strong>什么是商业操作系统</strong>，聊一聊它的设计思路和基本理念。</p><h3 id="进程的抽象" tabindex="-1">进程的抽象 <a class="header-anchor" href="#进程的抽象" aria-label="Permalink to &quot;进程的抽象&quot;">​</a></h3><p>你可以把一个大型的电商公司想象成一个商业操作系统，它的目标是为其中的每个参与者分配资源。这些资源不仅仅是计算资源，还会有市场资源、渠道资源、公关资源、用户资源，等等。</p><p>这样操作系统上的进程也被分成了几种类别，比如说内核程序，其实就是电商公司。应用程序就包括商家、供应商、品牌方、第三方支付、大数据分析公司等一系列组织的策略。</p><p>接下来，我们以<strong>商家</strong> 为例讨论进程。在操作系统中进程是应用程序的执行副本。它不仅仅是在内核的进程表中留下一条记录，<strong>它更像拥有独立思考能力的人</strong>，它需要什么资源就会自己去操作系统申请。它会遵循操作系统的规则，为自己的用户服务，完成自己的商业目的。</p><p>所以如果上升到操作系统的高度来设计电商系统。我们不仅要考虑如何在数据库表中记录这个商家、如何实现跟这个商家相关的业务逻辑，还要让商家的行为是定制化的，可以自发地组织营业。同时，也要服从平台制定的规则，共同维护商业秩序，比如定价策略、物流标准、服务水平，等等。</p><p>你可能会说，要达到这点其实很容易。实现一个开放平台，将所有的平台能力做成 API。让商家可以自己开发程序，去调用这些 API 来完成自己的服务。商家可以利用这些接口自定义自己的办公自动化软件。</p><p>事实上很多电商公司也确实是这样去做的，但我认为这样做没有抓住问题的核心。一方面是系统的开发、对接成本会难住很多中小型商家。但最重要的并不是研发成本，而是开放的 API 平台通常只能提供基础能力------比如说订单查询、商品创建、活动创建，等等。这些能力是电商平台已有能力的一种投影，超不过商家本身能在后台中配置和使用的范畴，基于这样的 API 架构出来的应用程序，可以节省商家的时间，但是不能称为进程。因为独立性不够，且不够智能。</p><p>所以真正的发展方向和目标是商业的<strong>智能化</strong> 。这里有一个在游戏领域常见的设计模式，可以实现智能化，叫作<strong>代理人</strong> （<strong>Agent</strong> ）<strong>模式</strong>。就是为每一个商家提供一个或者多个代理（Agent）程序。这些代理人像机器人一样，会帮助商家运营自己的网店、客服、物流体系，等等。</p><p>代理人知道什么时候应该做什么，比如说：</p><ul><li><p>帮商家预约物流、为新老用户提供不同的服务；</p></li><li><p>通过分析数据决定是否需要花钱做活动；</p></li><li><p>当品牌方有活动的时候，帮助商家联系；</p></li><li><p>当线上商店经营出现问题的时候，主动帮商家分析；</p></li><li><p>......</p></li></ul><p>你可以把代理人理解成一个游戏的 AI，它们会根据一些配置选项自发地完成任务。而代理人的提供者，也就是<strong>程序员</strong>，只需要证明在某些方面，代理人比人更优秀即可。而在这些优秀的方面，就可以交给代理人处理。</p><p>这样，商家放弃了一部分的管理权限，也减轻了很大的负担，成了代理人决策中的某个节点------比如有时候需要邮件确认一些内容、有时候需要支付运营费用、有时候会遵循代理人的建议对商店进行装修等。</p><h3 id="资源和权限" tabindex="-1">资源和权限 <a class="header-anchor" href="#资源和权限" aria-label="Permalink to &quot;资源和权限&quot;">​</a></h3><p>对于一个计算机上的操作系统而言，我们对进程使用了什么样的资源并不是非常的敏感。而对于一个商业操作系统来说，我们就需要设计严格的权限控制。因为权限从某种意义上就代表着收入，代表着金钱。</p><p>资源是一个宽泛的概念。广告位是资源，可以带来直接的流量。基于用户的历史行为，每个用户看到的广告位是不同的，这个也叫作&quot;千人千面&quot;，所以一个广告位可以卖给很多个代理人。站内信、用户召回的权限也可以看作资源。 有权利建立自己的会员体系，可以看作资源。数据分析的权限可以看作资源。<strong>如果将商业系统看作一个操作系统，资源就是所有在这个系统中流通的有价值的东西</strong>。</p><p>有同学可能会认为，一切资源都可以用数据描述，那么<strong>权限控制</strong>也应该会比较简单。比如说某一个推广位到底给哪个商家、到底推广多长时间......</p><p>其实并不是这样，虽然有很多权限可以用数据描述但是并不好控制。比如一个商品，&quot;商家最低可以设置多少价格&quot;就是一件非常不好判断的事情。商品有标品也有非标品，标品的价格好控制，非标品的价格缺少参照。如果平台方不希望花费太多精力在价格治理上，就要想办法让这些不守规则的商家无法盈利。比如说一旦发现恶性价格竞争，或者虚报价格骗钱的情况，需要及时给予商家打击和处罚。</p><p><strong>和权限对应的就是资源</strong>。如果让商家以代理人的身份在操作系统中运行，那么这个代理人可以使用多少资源，就需要有一个访问权限控制列表（Access Control List,，ACL）。这里有一个核心的问题，在传统的 ACL 设计中，是基于权限的管控，而不是权限、内容的发现。而对于设计得优秀的代理人 （Agent），应该是订阅所有的可能性，知道如何获取、申请所有的权限，然后不断思考怎样做更好。对代理人而言，这不是一个权限申请的问题，而是一个最优化策略------思考如何盈利。</p><h3 id="策略" tabindex="-1">策略 <a class="header-anchor" href="#策略" aria-label="Permalink to &quot;策略&quot;">​</a></h3><p>商家、组织在操作系统上化身成为代理人，也就是进程。商业操作系统的调度不仅仅体现在给这些代理人足够的计算、存储资源，更重要的是为这些代理人的决策提供上下文以及资源。</p><p>就好像真实的人一样：听到、看到、触摸到，然后做决策。做决策需要策略，一个好的策略可能是赚钱的，而一个坏的策略可能是灾难性的。从人做决策到机器做决策，有一个中间的过程。一开始的目标可以设立在让机器做少量的决策，比如说，机器通过观察近期来到商店用户的行为，决定哪些商品出现在店铺的首页上。但是在做这个决策之前，机器需要先咨询人的意愿。这样就把人当成了决策节点，机器变成了<strong>工具人</strong>。这样做一方面为人节省了时间，一方面也避免了错误。</p><p>再比如说机器可以通过数据预估一个广告位的收益，通过用户集群的画像得知在某个广告位投放店铺广告是否划算。如果机器得到一个正向的结果，可能会通知商家来完成付费和签约。那么问题来了，商家是否可以放心将付费和签约都交给机器呢？</p><p>当然不可以。如果家里急着用钱，可能就无法完成这笔看上去是划算的交易。另外，如果有其他的商家也看上了这个广告位。可能就需要竞价排名，所以需要人和机器的混合决策。</p><p>上述的模式会长期存在，例如设置价格是一个复杂的模型------疫情来了，口罩的销量会上升。机器可以理解这个口罩销量上升的过程，但是机器很难在疫情刚刚开始、口罩销量还没有上升的时候就预判到这个趋势。如果逻辑是确定的，那机器可以帮人做到极致，但如果逻辑不确定呢？如果很多判断是预判，是基于复杂的现实世界产生的思考，那么这就不是机器擅长的领域了。</p><p><strong>所以智能的目标并不是替代人，而是让人更像人、机器更像机器</strong>。</p><p>另外再和你聊一下我自己的观点，以自动驾驶为例。如果一个完全自动驾驶的汽车发生车祸，那么应该由汽车制造商、算法的提供方、自动驾驶设备的提供方、保险公司来共同来承担责任。类比下，如果策略可以售卖，那么提供策略的人就要承担相应的责任。比如说策略出现故障，导致营销券被大量套现，那提供策略方就需要承担相应的赔偿。</p><p>在可预见到的未来，策略也会成为一种可交易的资源。维护一个网上商店，从原材料到生产加工、渠道、物流体系、获客、销售环节，再到售后------以目前的技术水平，可以实现到一种半人工参与的状态。但这样也产生了很多非常现实的问题，比如说，既然开店变得如此容易，那资本为什么不自己开店。这样去培养合格、服务态度更好的店员不是更加容易吗？</p><p>这也是互联网让人深深担忧的原因之一。所有的东西被自动化之后，代表着一种时代的变迁，剩下不能够自动化的，都变成了&quot;节点&quot;。很多过程不需要人参与之后，人就变成了在某些机器无法完成工作的节点上不断重复劳动的工具------这也是近年来小朋友们经常说自己是&quot;工具人&quot;的原因了。</p><p>而且，我们程序员是在推动这样的潮流。因此你可以想象，未来对程序员的需求是很大的。一个普通的商店可能会雇佣一名程序员，花上半年匠心打造某个策略，收费标准可能会像现在的住房装修一样贵。这个策略成功之后还会进行微调，这就是后期的服务费用。完全做到配置化的策略，会因为不够差异化，无法永久盈利。最终在商业市场上竞争的，会是大量将人作为决策节点的 AI。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>商业是人类繁荣后的产物，电商是信息时代商业早期形式，未来的发展方向一定是像一个操作系统那样，让每个实体，都可以有自己的策略。用户可以写策略订餐，比如说我每天中午让 AI 帮助我挑选、并订一份午餐。商家写策略运营，比如运营网店。</p><p>至于商业操作系统到底是不是一个噱头？我觉得这是商业的发展方向。操作系统上的进程应该是策略，或者说是机器人。这样的未来也让我深深的焦虑过：它可能让人失去工作，让连接变得扁平，焦虑散播在加速------这些问题都需要解决，而解决需要时间、需要探索。</p><p>如果你有更多的想法可以把你的想法和方案写到留言区，和我一起交流。</p><p>这一讲就到这里，发现求知的乐趣，我是林䭽。感谢你学习本次课程，下一讲我们将学习本专栏的最后一节内容，加餐 | 练习题详解（八）。 再见！</p><p>最后，我邀请你为本专栏课程进行结课评价，因为你的每一个观点都是我和拉勾教育最关注的点。<a href="https://wj.qq.com/s2/8016796/2a80/" target="_blank" rel="noreferrer">点击链接，既可参与课程评价</a>。编辑会随机抽 5 位同学送精美礼品喔。</p>',38),s=[e];function n(_,l,i,c,h,d){return p(),a("div",null,s)}const q=t(r,[["render",n]]);export{u as __pageData,q as default};
