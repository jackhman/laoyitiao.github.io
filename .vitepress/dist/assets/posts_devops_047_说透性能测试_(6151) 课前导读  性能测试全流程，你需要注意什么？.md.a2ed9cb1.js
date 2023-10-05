import{_ as s,o as a,g as o,Q as l}from"./chunks/framework.4e7d56ce.js";const u=JSON.parse('{"title":"历史访问数据 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/047_说透性能测试/(6151) 课前导读  性能测试全流程，你需要注意什么？.md","filePath":"posts/devops/047_说透性能测试/(6151) 课前导读  性能测试全流程，你需要注意什么？.md","lastUpdated":1696338709000}'),n={name:"posts/devops/047_说透性能测试/(6151) 课前导读  性能测试全流程，你需要注意什么？.md"},p=l(`<p>作为一个测试从业者，如何在有限的测试时间里保证交付物的质量一直是绕不开的话题，性能测试作为质量保障的一部分，自然也有着重要的地位。这一讲作为本课程的导读，我想带你相对全面地了解一下性能测试的整个过程，以及在这个过程中需要落地的事情。在后面的学习中，我们将一步步展开。</p><h3 id="历史访问数据" tabindex="-1">历史访问数据 <a class="header-anchor" href="#历史访问数据" aria-label="Permalink to &quot;历史访问数据&quot;">​</a></h3><p>历史访问数据，指的是什么类型的用户通过何种终端访问服务的接口次数。</p><p>为什么我要把访问数据记录放在第一个呢？线上作为&quot;案发&quot;的第一现场，保留现场的证据是非常重要的。性能测试说白了是模拟案发现场来寻找破案线索，访问数据记录用户轨迹、作为衡量性能的重要手段，自然是不可或缺的。绝大多数公司都会封装平台来采集历史访问数据，如果要看原始的访问日志，Nginx 日志也是一种方式（如下所示），不过原始的日志都需要加工处理来提取我们需要的信息。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">120.204</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">101</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">238</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> [</span><span style="color:#79B8FF;">29</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">Nov</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">2020</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">14</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">09</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">22</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">0800] </span><span style="color:#9ECBFF;">&quot;GET /v1/register HTv1TP/1.1&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">150</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;-</span></span>
<span class="line"><span style="color:#9ECBFF;">120.204.101.238 - - [29/Nov/2020:14:09:22 +0800] &quot;</span><span style="color:#E1E4E8;">POST </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">v1</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">login HTTP</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">1.1</span><span style="color:#9ECBFF;">&quot; 200 36 &quot;</span><span style="color:#F97583;">-</span></span>
<span class="line"><span style="color:#79B8FF;">120.204</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">101</span><span style="color:#E1E4E8;">.</span><span style="color:#FDAEB7;font-style:italic;">238</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> [</span><span style="color:#79B8FF;">29</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">Nov</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">2020</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">14</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">09</span><span style="color:#F97583;">:</span><span style="color:#79B8FF;">22</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;">0800] </span><span style="color:#9ECBFF;">&quot;GET /hello/map HTTP/1.1&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">202</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">120.204</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">101</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">238</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> [</span><span style="color:#005CC5;">29</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">Nov</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">2020</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">14</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">09</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">22</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;">0800] </span><span style="color:#032F62;">&quot;GET /v1/register HTv1TP/1.1&quot;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">200</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">150</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;-</span></span>
<span class="line"><span style="color:#032F62;">120.204.101.238 - - [29/Nov/2020:14:09:22 +0800] &quot;</span><span style="color:#24292E;">POST </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">v1</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">login HTTP</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">1.1</span><span style="color:#032F62;">&quot; 200 36 &quot;</span><span style="color:#D73A49;">-</span></span>
<span class="line"><span style="color:#005CC5;">120.204</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">101</span><span style="color:#24292E;">.</span><span style="color:#B31D28;font-style:italic;">238</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> [</span><span style="color:#005CC5;">29</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">Nov</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">2020</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">14</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">09</span><span style="color:#D73A49;">:</span><span style="color:#005CC5;">22</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;">0800] </span><span style="color:#032F62;">&quot;GET /hello/map HTTP/1.1&quot;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">200</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">202</span></span></code></pre></div><p>可能你能理解为什么要通过终端类型统计服务的接口次数，但却对为什么要统计用户的类型有些困惑？在绝大多数电商场景下，电商用户等级对应不同的权益、优惠券类型和数量，这些业务规则都会影响到性能测试的结果。很多人在做性能测试的时候会忽略这一点 。</p><h3 id="需求管理" tabindex="-1">需求管理 <a class="header-anchor" href="#需求管理" aria-label="Permalink to &quot;需求管理&quot;">​</a></h3><p>有了参考数据，我们就可以来看需求了，对需求接入和充分的分析能帮助你在测试之前获得更多的信息，也能制定出较为完善的性能测试方案。业务测试和性能测试都是从需求入手的，但业务测试会去了解相关的业务背景和产品方案；对于性能测试而言，则在需求来源、分析方面提出了更多的要求。</p><h4 id="需求来源" tabindex="-1">需求来源 <a class="header-anchor" href="#需求来源" aria-label="Permalink to &quot;需求来源&quot;">​</a></h4><p>需求来源其实就是你这次性能测试的目的，调研清楚这个问题能帮助你更有针对性地获取数据，从而制定更为准确的性能目标。例如，我们这次的性能测试是为了应对&quot;黑色星期五&quot;的活动，那么就要考虑有没有以往的性能测试数据沉淀、当前有多少活跃用户数、网站交易数和活跃人数有没有相应的递增比例等和该活动有关的数据。</p><h4 id="需求分析" tabindex="-1">需求分析 <a class="header-anchor" href="#需求分析" aria-label="Permalink to &quot;需求分析&quot;">​</a></h4><p>弄清楚了性能测试的目的，我们就要来做需求分析和梳理了。</p><p>需求分析是在原始数据中提炼出有效的性能参考数据，通过这些数据构建性能测试的模型，再通过模型形成测试步骤。性能测试模型和性能测试执行步骤也是性能测试方案的核心内容，它决定了你做性能测试是否准确，是否更符合真实场景。</p><h4 id="分析方案" tabindex="-1">分析方案 <a class="header-anchor" href="#分析方案" aria-label="Permalink to &quot;分析方案&quot;">​</a></h4><p>在需求分析完成之后，就需要将你分析的内容提交一份性能测试方案了。性能测试方案的目的不仅仅在于让自己知道这次性能测试如何执行，也要让你的项目成员知道这次性能方案，它的执行周期、涉及的成员等，然后再一起评审这次方案中有没有不合理的地方。</p><h3 id="性能测试环境管理" tabindex="-1">性能测试环境管理 <a class="header-anchor" href="#性能测试环境管理" aria-label="Permalink to &quot;性能测试环境管理&quot;">​</a></h3><p>从目前的趋势来看，线上的全链路性能测试非常热门，但并不意味着就只做线上的性能测试了。关于性能测试环境，一般情况下我们会独立搭建一套，与业务测试环境相隔离，同时也能够在上线之前尽可能暴露一些代码中的问题。</p><p><strong>我曾看到过这样一个观点：线下性能环境与生产环境机器配置相差甚大，我们直接在生产上做性能测试就可以了，没有必要在测试环境中做</strong>。</p><p>这个观点引起了一部分人的赞成，但我认为这个说法不够全面。<strong>环境的配置高低是决定性能结果的一个影响因素，但不是全部因素</strong>。能够提前测试、提前暴露 bug，修复 bug 的成本也就越低，所以在线下必须有专门的性能环境，它可以帮助你提前发现内存泄漏、死锁等问题。更何况，这些问题的发现和修复与服务器硬件配置并没有直接联系，如果能够在线下提早用更低的成本解决是一种更优的选择。</p><p>如果没有做线下性能测试的情况下直接在生产上测试，对性能中的异常测试、高可用测试可能无法充分执行；同时，修复性能 bug 也需要功能上的回归，这些都增加了过程管理的复杂度。</p><h3 id="监控管理" tabindex="-1">监控管理 <a class="header-anchor" href="#监控管理" aria-label="Permalink to &quot;监控管理&quot;">​</a></h3><p>监控是发现性能问题的眼睛，没有监控，性能定位分析也就无从谈起了。监控的核心在于全面和深入，因此，我将监控管理分为了客户端数据监控、硬件资源监控、链路监控和业务规则监控，通过这几个层次的监控可以让你最大限度地避免监控死角，也为你调优分析提供充足的依据。</p><h4 id="客户端数据监控" tabindex="-1">客户端数据监控 <a class="header-anchor" href="#客户端数据监控" aria-label="Permalink to &quot;客户端数据监控&quot;">​</a></h4><p>性能测试中说的客户端一般是指测试机，测试机输出的数据是观察性能好差的关键指标。我推荐 JMeter+InfluxDB+Grafana 的框架，它具备展现直观、数据实时的特点，可以全面地展示监控的数据。</p><h4 id="硬件资源监控" tabindex="-1">硬件资源监控 <a class="header-anchor" href="#硬件资源监控" aria-label="Permalink to &quot;硬件资源监控&quot;">​</a></h4><p>基础硬件资源监控一般包含 CPU、内存、磁盘、网络等，常用的监控方式可以分为命令行监控和可视化监控。</p><ul><li><strong>命令行监控</strong></li></ul><p>通过命令的监控我们能够以最直接的方式获取服务器的实时状态。以 Linux 服务器举例，top、vmstat、iostat、iftop 等都是性能监控常用的命令。</p><ul><li><strong>可视化监控</strong></li></ul><p>可视化监控相对于命令行监控提供了更为丰富的图表展示，这样的话看起来更直观易懂，适合监控大屏的展示，能够将监控信息传递给项目组成员，但它需要提取数据之后计算，然后再展示，有一定的延迟，不如命令行监控直接。</p><p>Zabbix、Prometheus+Grafana 等都是可视化监控常用的手段，它们可以把数据持久化，能够调取过往时间轴的历史数据，一般在回溯、汇报、复盘时使用比较多。</p><p><strong>不管采用何种方式，在进行硬件监控时，都应该涵盖测试过程中所有的服务器</strong>，包括压测机、应用服务器、中间件服务器数据库服务器等。</p><h4 id="链路监控" tabindex="-1">链路监控 <a class="header-anchor" href="#链路监控" aria-label="Permalink to &quot;链路监控&quot;">​</a></h4><p>链路监控是对代码本身的追踪，代码问题常常是问题产生的根因，所以关于代码的监控不可忽视。目前常用的代码链路追踪工具有 SkyWalking、PinPoint、Arthas，在后续的学习中我会向你介绍其中的一些，帮助你定位代码问题。</p><h4 id="业务规则监控" tabindex="-1">业务规则监控 <a class="header-anchor" href="#业务规则监控" aria-label="Permalink to &quot;业务规则监控&quot;">​</a></h4><p>业务逻辑报错和用户息息相关并且用户是可以直接感受到的，比如商品库存不足、用户余额不足，它们会直接影响用户的体验。线上出现问题并不少见，重要的是如何第一时间得知并且解决这些问题。所以当出现问题即时发送报警邮件或者短信也是十分必要的，对于业务的监控同样不能忽视。</p><h3 id="数据模型建设" tabindex="-1">数据模型建设 <a class="header-anchor" href="#数据模型建设" aria-label="Permalink to &quot;数据模型建设&quot;">​</a></h3><p>为什么有数据模型这样的概念呢？数据模型的意义在于沉淀以往的历史数据，通过不同的维度去发现一些规律，我认为这也是性能测试领域中的一种探索方向。通过数据模型的建设，我们可以尝试在不同纬度建立数据之间的联系，从而发现数据间的规律，对未来的数据进行预测。这些纬度分为时间纬度和机器纬度。</p><h4 id="时间纬度" tabindex="-1">时间纬度 <a class="header-anchor" href="#时间纬度" aria-label="Permalink to &quot;时间纬度&quot;">​</a></h4><p>一般的电商每年至少有两次大促，618 和双 11。它们一般会详细记录每年总的成交额、网关访问次数、各个服务访问次数等，通过每年的活动力度、广告投放，以及数据团队来预测下次大促的成交金额和网站访问量等，这些数据也会间接帮助性能测试制定目标。</p><h4 id="机器纬度" tabindex="-1">机器纬度 <a class="header-anchor" href="#机器纬度" aria-label="Permalink to &quot;机器纬度&quot;">​</a></h4><p>机器纬度是一个什么概念呢？你可能会认为在线下两台机器测出来接口的处理能力是 100，线上有 10 台等配置的机器，就不用测试了，处理能力直接按照 5 倍去推算。</p><p>这其实是默认只要扩充机器系统的处理能力就会倍数增加，事实上是毫无道理的。不过你可以长期记录接口或者服务在性能测试环境的数据和生产环境中，相同场景下的压测数据，再进行长时间地跟踪对比，尝试发现其中是否能够存在一些规律。</p><h3 id="技术建设" tabindex="-1">技术建设 <a class="header-anchor" href="#技术建设" aria-label="Permalink to &quot;技术建设&quot;">​</a></h3><p>技术建设基于你的技术视野。关于技术的重要性，你可能了解，但理解得不够全面。无论是你写的测试脚本，还是在做的代码调优，其实它们都只是技术的一部分。我认为对于一名优秀的性能测试来说，需要具备以下 3 个方面的能力。</p><ul><li><p><strong>熟练掌握一门编程语言</strong>。测试很难说一定要掌握哪一种语言，但是熟练地使用一门语言可以帮助你迅速上手其他编程语言。</p></li><li><p><strong>能够读懂服务端基本架构</strong>。如果你不懂服务端的架构，那基本只能根据你的性能测试工具去编写报告，了解不到更深层次内容。</p></li><li><p><strong>能够根据性能测试需求，提出系统改造建议</strong>。性能测试与业务测试不太一样：业务测试基本是通过构造测试场景去满足业务规则，而性能测试，尤其是线上全链路性能测试，为了避免造成线上数据污染和影响真实用户访问，往往会改造系统去进行流量隔离和清理。</p></li></ul><p>技术有个重要作用：<strong>改善测试效率</strong>。测试讲究质效合一，质代表质量，效则是效率。</p><p>好的测试平台可以管理测试资料，固化测试过程，自动化测试执行，可视化测试结果。它可以增加团队成员之间的协作性，不要重复造轮子，提升团队能效；对于脚本管理和监督，测试结果的回溯也有重要作用。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>这一讲我带你了解了性能测试全过程中的要点，你可以对性能测试有一个大概的认识。在后面的学习中，我会将上述的知识结合我的经验来讲解。你可以从这一讲中看一下自己还有哪些需要夯实的知识，也可以看看公司的性能测试开展到什么阶段了，看在发展上还有哪些自己力所能及的地方。</p><p>对于全过程中需要注意的事情，除了我写的这些，你还有什么要补充的吗？欢迎在评论区留言。</p><p>下一讲，我将带你了解 JMeter 的核心概念，它是我们现在最流行的性能测试工具。</p>`,52),t=[p];function e(r,c,y,i,E,h){return a(),o("div",null,t)}const F=s(n,[["render",e]]);export{u as __pageData,F as default};
