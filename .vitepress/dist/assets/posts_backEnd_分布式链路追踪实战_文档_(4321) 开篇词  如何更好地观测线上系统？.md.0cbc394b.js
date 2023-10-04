import{_ as e,j as r,o as p,g as s,k as o,Q as a}from"./chunks/framework.e0c66c3f.js";const b=JSON.parse('{"title":"为什么\\"可观测性\\"必不可少？ ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/分布式链路追踪实战_文档/(4321) 开篇词  如何更好地观测线上系统？.md","filePath":"posts/backEnd/分布式链路追踪实战_文档/(4321) 开篇词  如何更好地观测线上系统？.md","lastUpdated":1696338709000}'),n={name:"posts/backEnd/分布式链路追踪实战_文档/(4321) 开篇词  如何更好地观测线上系统？.md"},_=a('<p>你好，我是刘晗。我在 Java 领域从业 8 年，长期从事分布式系统的构建和调优工作。目前，我在拉勾网担任技术专家，主要负责拉勾基础平台组件研发，对分布式系统观测、系统调优有着丰富的实战经验。</p><h3 id="为什么-可观测性-必不可少" tabindex="-1">为什么&quot;可观测性&quot;必不可少？ <a class="header-anchor" href="#为什么-可观测性-必不可少" aria-label="Permalink to &quot;为什么&quot;可观测性&quot;必不可少？&quot;">​</a></h3><p>相信你在开发过程中，一定遇到过这样的情况：</p><blockquote><p>当线上环境出现一个问题后，测试找到开发业务的同学 A，A 发现这个请求还依赖其他项目组，于是就去找相关的责任人 B，但 B 经过一番排查，发现这个问题原来是 C 的。大家相互推诿，很难找到问题发生的原因，甚至严重时还会影响到项目的正常发布，惹得团队怨声载道。大家的开发任务已经很重了，还要被这种事情弄得焦头烂额。</p></blockquote><p>虽然从业这么多年，但这个问题却始终困扰着我。最初，我以为是因为初创公司技术能力不足才导致这样的问题，后来却发现成熟的技术团队和技术架构同样存在着类似问题，它并没有因为我个人能力的成长和所在团队水平的提高而消失，反而越来越困扰我。比如，为什么有这么多的问题找不到原因，为什么我总是在解决十分相似的问题，为什么团队的沟通效率会如此低，等等。</p><p><strong>我接手拉勾的基础组件研发工作后，开始站在全局去思考解决这个问题的方法，最终通过不断地探索、实践，在拉勾内部打造了一套切实可行的可观测系统，对拉勾日均上亿级别的请求进行有效观测。</strong></p><p>这套系统可以很好地应对问题，并早于用户反馈解决。它不仅提高了用户体验，也提高了拉勾的口碑，对拉勾的发展起到了不可忽视的作用，我在拉勾内部的技术宣讲中，也经常提到可观测系统对拉勾的帮助，以及它的重要性。</p><p>链路追踪通常与可观测性一起出现，它为可观测性提供了强有力的数据支持，也是可观测性中必不可少的一环。通过对这部分数据源的可视化，开发人员可以看到链路中每一环的执行流程。链路追踪通常还可以和链路分析结合在一起，除了链路追踪，还可以进行性能诊断并给出优化建议，为可观测性提供了多维度的数据和展现方式的支持。</p><p><strong>随着微服务架构的持续演进，应用和服务器的数量不断增加，调用关系也越来越复杂，能否有效地对系统进行观测就变得至关重要。</strong> 此时，国内的大厂都逐渐有了自己的一套可观测系统，比如阿里的&quot;鹰眼&quot;。大厂对可观测性越发重视，与之相关的岗位的薪资也水涨船高。</p>',9),l=a('<p>（来自：拉勾网）</p><p>从招聘的需求中，我们可以明确看到&quot;熟悉分布式系统的开发原则&quot;&quot;优化故障处理流程&quot;&quot;提升排障效能&quot;等职位要求。阿里全链路监控系统&quot;鹰眼&quot;的成功，已经证明了可观测系统对这些问题的解决能力，可观测性也必然会在系统愈发复杂的未来变得更加实用。</p><p>为了让你能够系统地了解可观测性，并将它集成到自己公司的系统中，我决定将我的实践经验系统性地分享给你，希望能够帮助你建立对&quot;可观测性&quot;的全面理解，在工作中少走弯路，并能够更好地规划自己的技术成长路径。</p><p><strong>那么，如果没有很好的可观测系统，会存在哪些问题呢？</strong></p><h4 id="_1-无法有效地处理问题" tabindex="-1">1. 无法有效地处理问题 <a class="header-anchor" href="#_1-无法有效地处理问题" aria-label="Permalink to &quot;1. 无法有效地处理问题&quot;">​</a></h4><p>开发人员，职责是编写好业务代码，并保证其持续且稳定地运行，但如何实现这个职责却是一大难题。如果运维人员告诉你线上出现了问题，但你翻遍日志也找不出问题的原因；如果用户反馈说出现了问题，但你测试没有任何异常，这个问题就像定时炸弹一样被埋了下来，不知道什么时候就会爆炸。可观测性可以通过一套完整的数据观测系统帮助你更快且更有效地发现问题、解决问题，可以说是保障线上稳定的关键。</p><h4 id="_2-无法快速理解分布式系统" tabindex="-1">2. 无法快速理解分布式系统 <a class="header-anchor" href="#_2-无法快速理解分布式系统" aria-label="Permalink to &quot;2. 无法快速理解分布式系统&quot;">​</a></h4><p>随着微服务的兴起，后端的服务和系统数量越来越多。同时，项目在不停地迭代，如果没有及时沉淀文档架构图，你就很难了解整体的系统架构和数据走向，站在&quot;上帝&quot;的视角去考虑如何优化。最常见的情况就是两个模块之间存在循环引用，但这种常见的问题往往又会有较大的隐患。无论你是一个开发小白，还是从业多年的架构师，可观测性都可以通过可视化的形式帮助你快速了解整个系统的架构、数据流向、业务指标等，从而使你更加了解系统，梳理架构。</p><h4 id="_3-无法有效地利用系统资源" tabindex="-1">3. 无法有效地利用系统资源 <a class="header-anchor" href="#_3-无法有效地利用系统资源" aria-label="Permalink to &quot;3. 无法有效地利用系统资源&quot;">​</a></h4><p>由于系统的数量越来越多，相应机器的资源管控也越来越复杂，同时每个服务之间还存在着一定的依赖关系。因此，我们很难了解每台机器上的资源是否都被充分利用了。而可观测性就可以帮助你分析出哪些服务利用率不够，哪些服务可以进行资源缩减。</p><p><strong>综上不难发现，&quot;可观测性&quot;所解决的核心是效率问题。无论是处理问题、了解系统还是分配系统资源，&quot;可观测性&quot;都可以提高从公司到个人的整体效率。</strong> 这也是为什么，越来越多的公司开始重视可观测性。</p><h3 id="可观测性-监控" tabindex="-1">可观测性≠监控 <a class="header-anchor" href="#可观测性-监控" aria-label="Permalink to &quot;可观测性≠监控&quot;">​</a></h3><p>你可能会问，&quot;可观测性&quot;不就是监控吗？虽然它们看起来十分相似，但监控可以说是可观测性的一个子集。它们之间有 3 点区别：</p><ol><li><p><strong>核心不同。</strong> 监控是以运维为核心的系统，它通过各项指标数据来定义整体的运行状态、失败情况等；观测则是以开发为核心的系统，除了监控，它还会对整个系统进行分析。很多时候，运维给出的错误数据，只能算是提出了问题，但可观测性除了提出问题，还可以清晰地给出导致错误的原因。</p></li><li><p><strong>维度不同。</strong> 监控是从外围的角度，通过各种指标（机器CPU、负载、网络的维度等）来判断整个系统的执行情况；而可观测性则在这种外部指标的基础上，以应用内的各个维度来展开推测，最后，通过二者结合的数据更加真实地反映出我们应用的运行情况。</p></li><li><p><strong>展现的信息不同。</strong> 有些系统在正常运行时十分稳定，但是一到高并发的时候就会出现问题。此时，监控只能汇报问题出现的状况，但可观测性就可以很好地通过图形化的方式告知我们问题的原因，而不是由我们用经验来猜测。它可以将未知或者不确定的信息展现出来，使我们可以更好地了解系统的整体情况。</p></li></ol><p><strong>可观测性打破了开发和运维原有的问题解决方式，不再是运维发现问题开发解决，而是以开发为中心。</strong> 开发人员以什么样的形式去暴露关键的指标等，是与业务开发中的可扩展性和高可用性同等重要的内容。</p><h3 id="课程设置" tabindex="-1">课程设置 <a class="header-anchor" href="#课程设置" aria-label="Permalink to &quot;课程设置&quot;">​</a></h3><p>可观测性如此重要，但学习可观测性的过程中，我也遇到过一些问题。&quot;可观测性&quot;这个概念在国内来说比较新颖，中文学习资料不多，而且比较散乱、不成体系，有一定的学习难度。而且，如果你只是单纯地学习可观测性的理论知识，也容易造成纸上谈兵的现象，无法将所学到的知识结合实际，应用到公司的研发和管理上。</p><p>因此，我总结梳理了自己的学习和实践经验，分为可观测性的原理、告警系统与可观测性、可观测性的实践应用这 3 个模块来和你讲解这个课程，希望能为你提供一个完整且系统的可观测性的学习路径：</p><ol><li><p><strong>可观测性原理：</strong> 我会带你系统地了解可观测性中的各个关键概念和关键原理。同时，我也会结合开发经验，告诉你如何更好地观测你的应用程序，以及在真实的业务场景中该如何处理遇到的问题。</p></li><li><p><strong>告警体系与可观测性：</strong> 我会从已在拉勾中有效运行的实例出发，带你了解如何将可观测性的理念与运维的告警体系结合，形成一套可以落地的规范。</p></li><li><p><strong>可观测性的实践应用：</strong> 我会带你逐个了解可观测系统中的关键点，以及如何在实践中运用它们。</p></li></ol><h3 id="本课程适合你吗" tabindex="-1">本课程适合你吗？ <a class="header-anchor" href="#本课程适合你吗" aria-label="Permalink to &quot;本课程适合你吗？&quot;">​</a></h3><p>如果你是中高级的<strong>开发人员</strong> ，如果你对系统调优有兴趣、希望从事监控相关的工作、想要了解分布式系统；如果你是<strong>运维人员</strong>，想要提高系统资源利用率，想要推动公司监控体系建立并制定一套规范的告警流程，想要帮助开发提高解决问题的效率，这个课程正好可以帮到你。</p><h3 id="讲师寄语" tabindex="-1">讲师寄语 <a class="header-anchor" href="#讲师寄语" aria-label="Permalink to &quot;讲师寄语&quot;">​</a></h3><p>无论你目前所在公司有没有自己的一套可观测性系统，这门课都会对你有所帮助。我并不只是在讲述系统应用上的知识，更多的是在培养你的&quot;可观测性&quot;思维。即便没有可观测性系统，可观测性思维也会在你遇到问题的时候，帮助你不再点对点地解决，而是实现面对点的降维打击，从而更快速、更精准地解决问题。</p><p>我希望你可以多思考、多交流、多实践。只有将你所学运用到工作中，体现在工作和能力的成长上，才能说明你真的理解了这门课。</p><p>我在留言区等你，期待你给我分享你的想法，以及对可观测性的见解。你也可以把内容分享给你的朋友，一起沟通探讨。</p>',25);function i(h,u,c,q,g,d){const t=r("Image");return p(),s("div",null,[_,o(t,{alt:"屏幕截图(5).png",src:"https://s0.lgstatic.com/i/image/M00/3C/3E/CgqCHl8nht6AOb5_AAA9A9g3YuE969.png"}),o(t,{alt:"屏幕截图(6).png",src:"https://s0.lgstatic.com/i/image/M00/3C/3E/CgqCHl8nhuWAZdZzAAA4zHK3_hI520.png"}),o(t,{alt:"屏幕截图(7).png",src:"https://s0.lgstatic.com/i/image/M00/3C/32/Ciqc1F8nhuqACFEiAAA3GTpq6h0090.png"}),l])}const A=e(n,[["render",i]]);export{b as __pageData,A as default};
