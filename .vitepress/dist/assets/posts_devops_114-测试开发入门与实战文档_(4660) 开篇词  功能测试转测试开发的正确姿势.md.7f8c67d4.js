import{_ as s,j as n,o as r,g as l,k as a,Q as e,s as t,h as p}from"./chunks/framework.4e7d56ce.js";const x=JSON.parse('{"title":"功能测试应该何去何从？ ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/114-测试开发入门与实战文档/(4660) 开篇词  功能测试转测试开发的正确姿势.md","filePath":"posts/devops/114-测试开发入门与实战文档/(4660) 开篇词  功能测试转测试开发的正确姿势.md","lastUpdated":1696417798000}'),_={name:"posts/devops/114-测试开发入门与实战文档/(4660) 开篇词  功能测试转测试开发的正确姿势.md"},i=e('<p>你好，我是蔡超，欢迎来到《测试开发入门与实战》专栏，从今天起，我将与你一起开启功能测试至测试开发的转型之路。</p><p>十余年的测试工作间隙，我一直在进行测试技术的公益分享，作为互联网测试开发社区 VIPTEST 的联合创始人，在一起见证测试行业的变化和革新的同时，也看到了许多行业新人成长的烦恼。</p><p>经常有测试同学在 VIPTEST 社区向我们提问，而我也在工作中面试过众多的求职者，仅在去年一年就有不少于200 位同学。我发现即使是相同的工作年限，大家表现出来的测试技术掌握程度，也有很大差异。究其原因，我认为这与他们对自己未来的职业规划和预期息息相关。</p><p>最近一次技术分享会上，我遇到一位从事功能测试 3 年的同学，他说经过这几年的学习，自己已经完全从小白蜕变成业务熟手，这让我很为他高兴，但他却面露难色，和我说起职业发展上的瓶颈。我想他的烦恼，很大可能也是你的烦恼，想想你是不是也已经：</p><blockquote><p>工作了 3~5 年，你可能对整个公司，甚至某个垂直行业的业务流程非常熟练了。对测试任务，能娴熟地进行优先级排序和可测试性分析；甚至能把它轻松地分解成可测试的工作模块；并且针对每一个测试模块，熟练地应用白盒或黑盒的方式进行测试用例设计，最终生成一份覆盖产品需求的、可执行性的测试计划。</p></blockquote><p>在测试行业，这并不是个例。在无数个匆忙发版和 996 的不眠夜晚，你一定有过下面这些疑问：</p><ul><li><p>为什么每次发版时间都这么紧张？这样&quot;工具人&quot;的工作何时能到头？</p></li><li><p>开发改动了核心代码， 我如何才能在这么短的时间内完成全量回归测试？</p></li><li><p>手工执行用例、多浏览器重复验证同个功能、单个功能多个测试环境一遍遍点过去......每天重复这样&quot;点点点&quot;的简单工作，我的职业生涯还有拓展空间吗？</p></li></ul><p>这些问题看似没什么关联，但底层逻辑其实都是同一个，那就是：<strong>你的职业生涯的下一步应该怎么走？又应该如何安全度过职业生涯的第一个瓶颈期？</strong></p><h3 id="功能测试应该何去何从" tabindex="-1">功能测试应该何去何从？ <a class="header-anchor" href="#功能测试应该何去何从" aria-label="Permalink to &quot;功能测试应该何去何从？&quot;">​</a></h3><p>目前业界比较清晰的发展路径有两条：一个是<strong>业务型测试</strong> ，另一个是<strong>技术型测试</strong>，我们看下它们各自的发展路径，如下图所示：</p>',10),u=t("p",null,[p("左侧的"),t("strong",null,"业务型测试"),p("，多见于比较复杂的特定业务场景的行业，比如银行业。若想成为某一领域的业务专家，所需要的付出并不亚于走技术路线，但是相对于技术路线来说，业务路线会把自己的职业选择固定在某一个特定的领域。")],-1),g=t("p",null,[t("strong",null,'而右侧的技术路线相对来说，职业选择的面更广一些，这也是我们本专栏探讨的主题。在该路线中，你会发现"功能测试"这一初级小白，进阶至中级，离不开"测试开发"技能的加持。')],-1),c=t("p",null,'并且，目前各大互联网公司也都很亟须具备开发能力的测试工程师。比如在拉勾招聘网站上搜索"测试工程师"时，你会从"任职资格"中发现，许多中级测试工程师职位都要求你具备一定的测试开发能力。',-1),h=t("p",null,[p("单纯的功能测试人员，找工作变得越来越难，甚至有些公司已经停止招聘只会功能测试的人员了。"),t("strong",null,"可以说，功能测试人员如果不转型测试开发，基本上得告别软件测试生涯了。")],-1),d=t("p",null,"更不用说如果你工作了 5 年以上，企业是这么要求你的：",-1),q=e('<p>如果这时你的主要技能还没有转型到测试开发上来，那么，你真的是连面试的机会都不会有。</p><h3 id="转型之旅上的弯路与正确姿势" tabindex="-1">转型之旅上的弯路与正确姿势 <a class="header-anchor" href="#转型之旅上的弯路与正确姿势" aria-label="Permalink to &quot;转型之旅上的弯路与正确姿势&quot;">​</a></h3><p>不过很多有意愿转型测试开发的功能测试同学，可能由于时间紧，又缺乏正确方法和路径，都会走些弯路。</p><h4 id="_1-仅专注开发技术-从入门到放弃" tabindex="-1">1. 仅专注开发技术，从入门到放弃 <a class="header-anchor" href="#_1-仅专注开发技术-从入门到放弃" aria-label="Permalink to &quot;1. 仅专注开发技术，从入门到放弃&quot;">​</a></h4><p>比如会有人单纯认为，转测试开发主要补充一些编程技术即可，所以开始提升自己的编程能力，但由于技术本身比较枯燥、自身基础不扎实，以及没有阶段性的实践输出刺激自己持续学习，所以很快就会陷入基础知识的&quot;泥沼&quot;，越学越混乱，直到放弃。</p><p>那为什么会出现这样的情况呢？主要是因为自己都没有搞清楚测试开发的本质是什么，抓不住本质，也就无法有效地解决问题。</p><p>我们知道，测试开发日常工作是解决软件开发过程中测试人员面临的技术问题，以保证软件产品高质量、高效率发布，所以我们说：<strong>测试开发的本质是助力业务成功</strong>。</p><p>基于这个常见&quot;弯路&quot;，本专栏将结合案例，围绕业务痛点，带你学习开发测试框架所需的 Python 编程、Git 技巧等技术，让你在测试框架搭建过程中，<strong>有侧重点地学习测试场景所需的编程技术</strong>，而不是直接从编程知识入手，这样你便不会迷失在基础知识的假象里。</p><h4 id="_2-局限表面技能-缺乏对测试框架的全局认识" tabindex="-1">2. 局限表面技能，缺乏对测试框架的全局认识 <a class="header-anchor" href="#_2-局限表面技能-缺乏对测试框架的全局认识" aria-label="Permalink to &quot;2. 局限表面技能，缺乏对测试框架的全局认识&quot;">​</a></h4><p>还有一部分同学非常自律，白天辛苦地&quot;点点点&quot;做功能测试，晚上还强迫自己看书学习记录，比如他可以根据网上教程做自动化测试，也会写自动化脚本，能简单运用诸如此类的测试开发技能。</p><p>但很快他就会发现自己写的脚本，这个项目能用，但换个项目，或者项目的数据结构一改变，自己写的脚本便不能用了，并且自己无力独立支撑一个自动化项目，更无法深入全面地认识测试框架。</p><p><strong>此时，他会关注普适性，开始有框架的思维，会关注那些现有的成熟框架，而不是局限于那些表面的测试开发技能。</strong></p><p><strong>而该专栏便以自动化测试框架为核心，以真实的业务流程为依托，带你开发自己的自动化测试框架，解决一些经典的业务难题，比如如何融合 API 测试和 UI 测试，如何搭建 Mock Server 等。</strong></p><p>总之，随着你代码能力的提高，以及对一些优秀的框架设计了解到一定程度，你就可以从模仿走向创造了，把它们的实现逻辑列出来，不看源码，自己也能用代码重新实现一遍。在实现这些的过程中，你一定会发现有很多过去没注意的细节， 比如编程基础的巧妙应用，这时再回头去看涉及的特定编程知识，就不会觉得枯燥难以理解了。</p><h3 id="该专栏会讲哪些内容" tabindex="-1">该专栏会讲哪些内容？ <a class="header-anchor" href="#该专栏会讲哪些内容" aria-label="Permalink to &quot;该专栏会讲哪些内容？&quot;">​</a></h3><p>本专栏分为 5 大模块，共 23 讲。从测试开发的新手任务，即<strong>测试框架</strong>入手，围绕测试框架的概念、开发测试框架的方法、测试框架的经典思想等内容进行讲解， 并将这些内容通过代码实现，带你彻底掌握测试框架的开发，进入测试开发的大门。</p><p><strong>模块一：打牢基础，从框架概念到代码实践</strong></p><p>你将从概念、组成、设计原则全方位认识自动化测试框架，并从工作场景出发，先行学习开发测试框架所需的 Python 知识、Git 技巧，打牢测试开发基础。</p><p><strong>模块二：项目实战，搭建自动化测试框架</strong></p><p>带你从零开始，搭建第一个 Web 和 API 测试框架，并直接应用于日常工作中，从而完成 UI 或 API 自动化测试，迈开测试开发第一步。</p><p>在搭建测试框架的过程中，我将讲解 Python 的两个经典测试框架 unittest 和 pytest，带你搭建相应的测试框架。我还会带你深入了解这两个框架的一些经典功能的实现原理， 比如数据驱动 DDT，以及根据用户指定 Tag 执行测试等；我还会通过优化部分框架代码，手把手带你提升测试开发技巧；结合上一模块，你会对开发测试框架具体步骤和如何实施有更深入的了解 。</p><p><strong>模块三：能力修炼，全面掌握多项技能</strong></p><p>探索自动化测试框架开发中的经典实践，比如 API 和 UI 自动化测试融合的技巧，PO 模型、DB 链接、数据驱动以及数据操作的新方式------Pandas。通过本模块的学习，你将能够更加自如地应用市面上的测试框架，并将之改造以适应你的项目，做到知其然也知其所以然。</p><p><strong>模块四：深入自动化测试框架开发原理</strong></p><p>通过前面的学习，相信你已经对自动化框架的各个部分了然于胸，比如测试框架命令行参数、测试环境动态切换、测试用例动态挑选等。本模块将为你剖析这些经典模块的实现原理，并且带领你在了解原理后，<strong>自己编码实现这些功能</strong>。此外，我还会给你分享遇见问题时的解决思路，给予你思维引导，帮你成为一名合格的测试开发工程师，完全进入测试开发的世界。</p><p><strong>加餐：本职之内，技术之外</strong></p><p>向你讲解求职面试的高频考点，并传授面试技巧，以及入职后如何在一众测试开发中脱颖而出，在小团队中保持技术影响力，成长为技术骨干、技术管理。</p><h3 id="你将收获什么" tabindex="-1">你将收获什么？ <a class="header-anchor" href="#你将收获什么" aria-label="Permalink to &quot;你将收获什么？&quot;">​</a></h3><p>&quot;路漫漫其修远兮&quot;，每条转型进阶之路都注定是孤单的，但分享和鼓励依旧会相伴随行，希望该专栏可以让你收获&quot;智囊袋&quot;，支持你的前行。</p><ul><li><p><strong>从基础到实战，获得高效省力的正确转型路线</strong>：一站式教学，紧贴业务场景的行业情况，并非海量零碎知识点的串联，路径清晰，即学即用，具备实用性。</p></li><li><p><strong>收获你的第一个 UI 自动化测试框架 + API 自动化测试框架</strong>：以测试框架开发为核心，还原真实业务场景，留下项目实践经验，给简历增添亮点，敲开求职大门。</p></li><li><p><strong>充分了解测试开发的职责要求和实战场景，轻松突破瓶颈期</strong>：知己知彼，让你对市场职业要求和自我能力，以及对测试职业生涯各阶段的职务，有清晰认知，自信上岗。</p></li></ul><h3 id="讲师寄语" tabindex="-1">讲师寄语 <a class="header-anchor" href="#讲师寄语" aria-label="Permalink to &quot;讲师寄语&quot;">​</a></h3><p>测试行业有句经典的调侃&quot;不想当开发的测试不是好产品&quot;，说的是测试人员作为团队的多面手，不仅要在技术能力上与开发对齐，在业务上也要时刻保持产品的思维，所以测试人员要突破自己，唯一的路径就是：<strong>主动学习、持续学习</strong>。</p><p>&quot;雄关漫道真如铁&quot;， 在转型测试开发的过程中，尤其是进入阅读源代码的&quot;至暗&quot;时刻时，你肯定会陷入自我怀疑，质问自己到底是否适合测试行业？</p><p>这时你要相信，这正是你与&quot;点点点&quot;说再见的时刻，也是你突破职业瓶颈的时刻，祝你早日走出&quot;至暗&quot;，迎来更广阔的职业未来。</p><p>关于&quot;功能测试转测试开发的正确姿势&quot;，你有什么想要分享的吗？ 不妨在下方留言区分享你的想法和见解，我们一起探讨~</p><hr><p><a href="https://shenceyun.lagou.com/t/eka" target="_blank" rel="noreferrer">&quot;测试开发工程师名企直推营&quot; 入口，免费领取 50G 资料包</a></p>',37);function m(P,T,A,b,f,I){const o=n("Image");return r(),l("div",null,[i,a(o,{alt:"Lark20200911-163102.png",src:"https://s0.lgstatic.com/i/image/M00/4D/D4/CgqCHl9bNeGAQYTgAAEw6zeJ6aw252.png"}),u,g,c,a(o,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/4D/27/Ciqc1F9Zu_OAZglXAACHuBRxTN4393.png"}),h,d,a(o,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/4D/32/CgqCHl9Zu_qAFxpFAABQsKLXz0Y245.png"}),q])}const D=s(_,[["render",m]]);export{x as __pageData,D as default};
