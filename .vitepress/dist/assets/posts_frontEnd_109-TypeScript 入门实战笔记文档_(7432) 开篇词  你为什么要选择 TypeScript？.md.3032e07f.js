import{_ as a,j as n,o as t,g as e,k as o,Q as p}from"./chunks/framework.4e7d56ce.js";const _=JSON.parse('{"title":"一次激发我好奇心的面试经历 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/109-TypeScript 入门实战笔记文档/(7432) 开篇词  你为什么要选择 TypeScript？.md","filePath":"posts/frontEnd/109-TypeScript 入门实战笔记文档/(7432) 开篇词  你为什么要选择 TypeScript？.md","lastUpdated":1696417798000}'),r={name:"posts/frontEnd/109-TypeScript 入门实战笔记文档/(7432) 开篇词  你为什么要选择 TypeScript？.md"},l=p(`<p>你好，我是乾元，在 10 年的前端开发工作中，我曾就职于去哪儿、搜狗等大厂。作为核心成员，我曾负责过多个前端框架、组件库、开源项目核心模块的开发和维护，还为知名 MVVM 框架 Avalon 核心模块贡献过十多个 Commit。</p><p>2018 年起，我正式推动 TypeScript 在部门级业务方向的全面应用。至今，我构建了 TypeScript + React、Redux、Nest.js 的全栈技术生态，并积累了丰富的 TypeScript 设计开发经验。同时，我还从 0-1 打造了一支全栈技术架构团队，目前该团队已平稳支撑了公司数百个业务项目。</p><p>我是在什么样的机缘巧合下与 TypeScript 相逢的呢？这不得不提起当时的一场面试经历。</p><h3 id="一次激发我好奇心的面试经历" tabindex="-1">一次激发我好奇心的面试经历 <a class="header-anchor" href="#一次激发我好奇心的面试经历" aria-label="Permalink to &quot;一次激发我好奇心的面试经历&quot;">​</a></h3><p>2018 年的一场社招面试中，我见到了一个来自微软的 C# 技术栈转前端的候选人。</p><p>当时，前端的面试套路中必然包含 JavaScript 隐式类型转换的知识点，如下代码所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">[] </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">[] </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&#39;</span></span></code></pre></div><p>而这个候选人的回答让我很是诧异，一个从国际大厂出来的面试者，似乎并没有掌握 JavaScript 隐式类型转换的规则。</p><blockquote><p><strong>注意</strong>：隐式类型转换的规则是当 == 操作符两侧的值不满足恒等时（===），则先将空数组转换为字符串类型，然后再进行恒等比较。</p></blockquote><p>我好奇地问他：&quot;难道平时你都不关注这些基础知识？&quot;</p><p>他回答：&quot;虽然平时使用 TypeScript，但是并不需要关注这些规则。&quot;</p><p>虽然这场面试并不算成功，但激发了我的好奇心：<strong>TypeScript 真的能将我们从隐式类型转换等 JavaScript 的各种坑中拯救出来</strong>？</p><p>于是，我开始在业务应用中尝试引入 TypeScript。通过使用静态类型约束 React 组件 Props 和 State，我发现它与使用 JavaScript 相比，不仅支持在任何地方直观地获取组件的接口定义，还能对属性、状态中的值是否为空进行自动检测并给出提示（容错处理），甚至还支持对 React JSX 元素接收的各种属性、方法的检测和提示。</p><p><strong>这样看来 TypeScript 实在是太香了，这让我萌生了在接口调用、Redux 代码中全面引入 TypeScript 的想法</strong>。</p><p>2018 年中，我开始做 To B 应用。考虑到 To B 应用的业务逻辑及其复杂性，它对代码的稳定性、易读性、可维护性要求极高，而这正高度契合 TypeScript 的优势。于是，<strong>我正式开始推广全栈式 TypeScript 技术方案</strong>。</p><p>在接下来的两年多时间里，这套技术方案支撑了数百个应用的 Web 端、Node.js 端开发，接受了近百万行业务代码的实践考验。相对于 JavaScript 应用而言，TypeScript 使得许多低级的 Bug 在开发阶段就能被检测出来并得到快速解决，显著提升了项目的整体质量和稳定性。</p><p>在见证业务发展的同时，我还见证了 TypeScript 版本从 3.0 迭代到 4.1，最终成了极其成熟且强大的语言和工具。其中，它有诸多重量级特性发布：</p><ul><li><p>unknown（3.0）</p></li><li><p>stricter generators（3.6）</p></li><li><p>optional chain（3.7）</p></li><li><p>type-only import &amp; export（3.8）</p></li><li><p>template literal（4.1）</p></li></ul><p>现如今，当我再次回味起那位候选人的回答，才明白 TypeScript 可能压根就不允许这么使用。因为当你写下 [] == &#39; &#39;，立刻会收到一个红色波浪标注的 ts(2367) 错误提示。</p><h3 id="typescript-有这么好用吗" tabindex="-1">TypeScript 有这么好用吗？ <a class="header-anchor" href="#typescript-有这么好用吗" aria-label="Permalink to &quot;TypeScript 有这么好用吗？&quot;">​</a></h3><h4 id="_1-typescript-的本质" tabindex="-1">1. TypeScript 的本质 <a class="header-anchor" href="#_1-typescript-的本质" aria-label="Permalink to &quot;1. TypeScript 的本质&quot;">​</a></h4><p>TypeScript 与 JavaScript 本质并无区别，你可以将 TypeScipt 理解为是一个<strong>添加了类型注解的 JavaScript</strong>，比如 const num = 1，它同时符合 TypeScript 和 JavaScript 的语法。</p><p>此外，TypeScript 是一门中间语言，最终它还需要转译为纯 JavaScript，再交给各种终端解释、执行。不过，<strong>TypeScript 并不会破坏 JavaScript 既有的知识体系，因为它并未创造迥异于 JavaScript 的新语法，依旧是&quot;熟悉的配方&quot;&quot;熟悉的味道&quot;。</strong></p><h4 id="_2-typescript-更加可靠" tabindex="-1">2. TypeScript 更加可靠 <a class="header-anchor" href="#_2-typescript-更加可靠" aria-label="Permalink to &quot;2. TypeScript 更加可靠&quot;">​</a></h4><p>在业务应用中引入 TypeScript 后，当我们收到 Sentry（一款开源的前端错误监控系统）告警，关于&quot;&#39;undefined&#39; is not a function&quot;&quot;Cannot read property &#39;xx&#39; of null|undefined&quot; 之类的低级错误统计信息基本没有。<strong>而这正得益于 TypeScript 的静态类型检测，让至少 10% 的 JavaScript 错误（主要是一些低级错误）能在开发阶段就被发现并解决。</strong></p><p>我们也可以这么理解，在所有操作符之前，TypeScript 都能检测到接收的类型（在代码运行时，操作符接收的是实际数据；静态检测时，操作符接收的则是类型）是否被当前操作符所支持。</p><p>当 TypeScript 类型检测能力覆盖到整个文件、整个项目代码后，任意破坏约定的改动都能被自动检测出来（即便跨越多个文件、很多次传递），并提出类型错误。因此，你可以<strong>放心地修改、重构业务逻辑，而不用过分担忧因为考虑不周而犯下低级错误</strong>。</p><p>接手复杂的大型应用时，TypeScript 能让应用易于维护、迭代，且稳定可靠，也会让你更有安全感。</p><h4 id="_3-面向接口编程" tabindex="-1">3. 面向接口编程 <a class="header-anchor" href="#_3-面向接口编程" aria-label="Permalink to &quot;3. 面向接口编程&quot;">​</a></h4><p>编写 TypeScript 类型注解，本质就是接口设计。</p><p>以下是使用 TypeScript 设计的一个展示用户信息 React 组件示例，从中我们一眼就能了解组件接收数据的结构和类型，并清楚地知道如何在组件内部编写安全稳定的 JSX 代码。</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">IUserInfo</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/** 用户 id */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">id</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">number</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/** 用户名 */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">name</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/** 头像 */</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">avatar</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">UserInfo</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">props</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">IUserInfo</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">...</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">IUserInfo</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/** 用户 id */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">id</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">number</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/** 用户名 */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">name</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/** 头像 */</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">avatar</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">UserInfo</span><span style="color:#24292E;">(</span><span style="color:#E36209;">props</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">IUserInfo</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">...</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p><strong>TypeScript 极大可能改变你的思维方式，从而逐渐养成一个好习惯</strong>。比如，编写具体的逻辑之前，我们需要设计好数据结构、编写类型注解，并按照这接口约定实现业务逻辑。这显然可以减少不必要的代码重构，从而大大提升编码效率。</p><p>同时，你会更明白接口约定的重要性，也会约束自己/他人设计接口、编写注解、遵守约定，乐此不疲。</p><h4 id="_4-typescript-正成为主流" tabindex="-1">4. TypeScript 正成为主流 <a class="header-anchor" href="#_4-typescript-正成为主流" aria-label="Permalink to &quot;4. TypeScript 正成为主流&quot;">​</a></h4><p>相比竞争对手 Facebook 的 Flow 而言，TypeScript 更具备类型编程的优势，而且还有 Microsoft、Google 这两家国际大厂做背书。</p><p>另外，<strong>越来越多的主流框架</strong> （例如 React、Vue 3、Angular、Deno、Nest.js 等）<strong>要么选用 TypeScript 编写源码，要么为 TypeScript 提供了完美的支持</strong>。</p><p>随着 TypeScript 的普及，TypeScript 在国内（国内滞后国外）成了一个主流的技术方向，国内各大互联网公司和中小型团队都开始尝试使用 TypeScript 开发项目，且越来越多的人正在学习和使用它。</p><p>而能够熟练掌握 TypeScript 的开发人员，<strong>将能轻松拿下大厂 Offer</strong>。下面我截取了拉勾招聘官网的一些大厂招聘要求，你可以参考。</p>`,39),c=p('<h3 id="好工具-需要好的学习方式" tabindex="-1">好工具，需要好的学习方式 <a class="header-anchor" href="#好工具-需要好的学习方式" aria-label="Permalink to &quot;好工具，需要好的学习方式&quot;">​</a></h3><p>TypeScript 在国内成为主流技术方向的时间较晚，大概在 2018 年左右才开始流行。相应地，本土化学习资料也比较匮乏。</p><p>2018 年 9 月，在我推广 TypeScript 之际，就连 Babel、create-react-app 官方对 TypeScript 的支持都还不太友好，我主要通过 Medium 等国外资源查阅大量关于 Best Practice of TypeScript、React + TypeScript、Redux + TypeScript 的文章，最终设计并架构了面向部门业务的 TypeScript 技术栈。</p><p>伴随着业务的成长，不断有新同学加入，而很多新同学其实并没有任何 TypeScript 开发的经验。那么，如何让更多同学更快速、有效地掌握技术栈，就成了我想解决的关键问题。因此，我又制作了系列培训内容帮助新人快速成长。<strong>本课程正是基于此前的实战经验精炼而成，旨在帮助你快速掌握 TypeScript 技术栈，学会构建高可读性、高稳定性前端应用。</strong></p><p>结合<strong>上百个业务应用开发经验</strong> 总结，我将课程划分为<strong>入门、进阶、实战</strong> 3 个模块，讲解的都是<strong>真实业务场景</strong> 中<strong>最实用的知识点，绝非纸上谈兵</strong>。按照知识点的顺序和难易程度，共计 22 讲。</p><ul><li><strong>模块 1：TypeScript 入门</strong></li></ul><p>我将介绍 TypeScript 环境搭建，并结合浅显易懂的示例与应用场景讲解 TypeScript 基础类型，也会分享我作为过来人学习 TypeScript 时总结的经验和教训，让你尽量少走弯路，直达重点。<strong>这部分内容是掌握 TypeScript 编程的一块敲门砖，学完之后，你将对 TypeScript 的核心知识和概念有个整体印象。</strong></p><ul><li><strong>模块 2：TypeScript 进阶</strong></li></ul><p>主要讲解类型守卫、类型兼容、工具类型等概念，及其在实际业务中的作用和使用技巧，助你快速成长为玩转 TypeScript 高阶开发的&quot;魔法师&quot;。<strong>学完之后，能加深你对进阶知识和工具的理解，并教你掌握造轮子（打造自己的工具类型）进行类型编程的能力。</strong></p><ul><li><strong>模块 3：实战指南</strong></li></ul><p>我将结合业务实战经验系统化地讲解 TypeScript Config 配置、TypeScript 常见错误分析定位、浏览器和 Node.js 端开发等知识，以及 JavaScript 项目改造实践。让我们既可以按需定制 TypeScript 类型系统行为和转译产物，还能在碰到官方文档较少提及的各种错误时，快速地对问题进行定位和修复。另外，无论是从零开始的新项目，还是历史遗留的技术债，我们都能有章可循地引入 TypeScript。</p><p>并且，<strong>此模块我会穿插分享历经数百个应用开发总结出来的 TypeScript 开发最佳实践经验，助你在业务开发中得心应手地应用 TypeScript，并获得 TypeScript 在 Web 和 Node.js 端最佳开发实践的建议。</strong></p><p>TypeScript 发版频繁，特性日新月异，从构思课程到截稿，TypeScript 已经发布了 4.1、4.2 版本（当你读到这段文字，也有可能又发布了 4.3、4.4......），不过核心知识和思想并未过时。<strong>当然，在最后的结束语中，我也会介绍一些新版本比较重要的特性。</strong></p><h3 id="讲师寄语" tabindex="-1">讲师寄语 <a class="header-anchor" href="#讲师寄语" aria-label="Permalink to &quot;讲师寄语&quot;">​</a></h3><p>看明白知识点很容易，而难点在于融会贯通。除了关注工程实践，我们更应该关注核心知识点的深入理解和吸收，避免从理论到实践无从着手的无力感，因为<strong>只有吃透其中的原理（生硬的知识点），才能真正打造属于自己的强有力武器</strong>。</p><p>本专栏经过精心打磨，并巧妙打磨大量示例，带你轻松学习、有效吸收。你还在犹豫吗？赶紧搭上 TypeScript 学习班车，大厂 Offer 就在前方！</p>',16);function i(y,E,S,T,d,g){const s=n("Image");return t(),e("div",null,[l,o(s,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M01/3D/3F/Cgp9HWCToWWAd44HAA6s79WBA5M709.png"}),c])}const h=a(r,[["render",i]]);export{_ as __pageData,h as default};
