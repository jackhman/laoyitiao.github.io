import{_ as l,j as i,o as a,g as r,k as e,Q as n,s as t,h as s}from"./chunks/framework.4e7d56ce.js";const B=JSON.parse('{"title":"什么是探索式测试 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(1617) 第32讲：探索式测试与基于脚本的测试.md","filePath":"posts/devops/112-高效敏捷测试文档/(1617) 第32讲：探索式测试与基于脚本的测试.md","lastUpdated":1696417798000}'),_={name:"posts/devops/112-高效敏捷测试文档/(1617) 第32讲：探索式测试与基于脚本的测试.md"},p=n('<p>上一讲谈到了如何完成&quot;测试计划&quot;相关的内容，对于第五模块&quot;敏捷测试分析与计划&quot;，是否意味着可以告一段落了？按照正常逻辑，这一模块可以结束了，但是考虑到探索式测试的应用，增加了三讲内容。你可能会问，探索式测试是指&quot;设计、执行和学习同时进行&quot;这种测试方式，只影响测试的设计和执行，与计划没有什么关系，计划该这么做还是这么做，为何要在这个模块来讨论探索式测试呢？</p><p>没错，探索式测试是指&quot;设计、执行和学习同时进行&quot; 这种测试方式，但要比较彻底地推行探索式测试的实施，或者说，在敏捷测试中可以采用纯粹的探索式测试，就需要引入 <strong>SBTM</strong>（Session-Based Test Management），这个会涉及到测试计划，把测试目标分解、Session 分解都可以归为测试计划的一部分，可以看作是原来测试计划的延续，所以把 SBTM 这部分内容放在了第五模块中讲解。</p><p>为了能讲解 SBTM，先做一个铺垫，必须先交代清楚&quot;什么是探索式测试&quot;？为什么会引入探索式测试？它和基于脚本的测试有何区别？</p><h4 id="什么是探索式测试" tabindex="-1">什么是探索式测试 <a class="header-anchor" href="#什么是探索式测试" aria-label="Permalink to &quot;什么是探索式测试&quot;">​</a></h4><p><strong>探索式测试</strong>（Exploratory Test，ET）的萌芽可以追溯到 1984 年 Cem Kaner 写&quot;Testing Computer Software&quot;一书中所呈现的，比较明确的定义是 James Bach 1995 年给出的 &quot;测试设计、执行、学习同时进行&quot; ，这里的设计，应该是指测试用例的设计（测试的详细设计）。之后，距 1984 的 23 年之后（2007 年），Cem Kaner 在和众多的上下文驱动测试流派的测试人士（包括 James Bach）讨论之后，给出了比较全面的 ET 定义：</p><blockquote><p>探索式测试是一种软件测试风格（Style），它强调独立测试人员（Individual Tester）的个人自由和职责（Personal Freedom and Responsibility），为了持续优化其工作的价值（Value），将测试相关学习（Test-related Learning）、测试设计（test Design）、测试执行（execution）和测试结果分析（analysis）作为相互支持的活动，在整个项目过程中并行执行。</p></blockquote><p>从这个探索式测试的完整定义看，有以下几个要点：</p><ul><li>探索式测试不是测试方法、测试技术，而是一种软件测试方式（最好不要写成&quot;探索性测试&quot;），各种测试方法、技术依旧可以应用于这种 ET 方式中；</li><li>以人为本，强调测试人员的价值，给他们更大的自由发挥空间；</li><li>持续测试，设计、执行、学习和结果分析同时进行，没有明确的阶段；</li><li>持续优化测试工作的价值，精益求精、追求卓越；</li><li>它不只是一种辅助的测试方式，可以贯穿整个项目生命周期。</li></ul><p>其中以人为本、持续测试和持续优化，与敏捷的价值观和原则是相同的，敏捷开发和探索式测试更加吻合，所以多年前我做了一个演讲，主题是&quot;敏捷开发紧紧拥抱探索式测试&quot;。</p><p>探索式测试执行可以用一个循环来表示，如图 1 所示，这个循环只是完成一个测试（用例），从测试设计、执行、分析到学习，再重新设计、执行、分析、学习......这样持续循环下去，可以看作是<strong>螺旋式不断上升</strong>的过程。</p>',10),g=n('<p>所以，这个循环有以下 4 个要点：</p><ul><li><strong>在头脑中设计</strong>，过去我们设计测试用例是要写下来，估计一个用例要用掉几分钟或更长的时间，而这里只是在头脑中设计，一般只要几秒钟，效率会高很多；</li><li><strong>执行更流畅</strong>，过去想到一个测试用例就写下来，思路是断断续续的，现在思路是连贯的，思维更敏捷；</li><li><strong>上下文及其测试结果分析</strong>，也就是说，下一次测试是要根据上一次测试的结果来决定是否要做出调整，如果测试的结果没有达到测试人员的期望，比如没有发现 Bug，这时就需要分析，判断测试思路可能错在哪里，如何进行调整或改进，从而在头脑中重新设计测试用例，进行下一个循环；</li><li><strong>从执行/分析中学习</strong>，快速改进，一个循环只有几分钟，在这么短的时间内很可能有学习的机会，获得改进，持续下去，一年下来改进是很大的。算一算 1.01365 是多少，而这里远远超过 365 次改进的机会。</li></ul><p>探索式测试是上下文驱动流派的具体实践与体现，强调软件研发过程中上下文（需求、进度、人员、风险...）是不断变化的，只有测试人员才能及时适应这种变化，对测试范围、思路和方法、软件的操作等做出调整，不断优化测试，尽快、尽早、尽可能多的发现软件缺陷，提高测试的有效性和效率。</p><h4 id="基于脚本的测试" tabindex="-1">基于脚本的测试 <a class="header-anchor" href="#基于脚本的测试" aria-label="Permalink to &quot;基于脚本的测试&quot;">​</a></h4><p>与探索式测试对立的是基于脚本的测试（Scripted Testing，ST），<strong>基于脚本的测试是指先完成测试脚本，再执行测试脚本</strong>，阶段性明确，前面一段时间专注测试脚本的设计与开发，后面一段时间专注测试脚本的执行。这里的测试脚本，包括手工执行的测试用例和工具执行的自动化测试脚本。</p><p>基于脚本的测试和传统开发的瀑布模型的思维方式是一致的，和瀑布模型的具体实施过程也是匹配的。在瀑布模型中，阶段性也是非常明确的，从需求分析、设计到实施，一个阶段一个阶段的往前推进，测试自然也是先分析、再设计，最后执行。在传统开发中，这样做有其可行性，而且也不得不这样做，这是因为：</p><ul><li><strong>可行性</strong>，在传统开发中，需求文档、设计文档规范、详细，基于这样的需求文档、设计文档，能够清楚地理解需求和设计的实现，能够开展测试用例的设计工作；</li><li>另一方面，在传统开发测试中，有一个&quot;<strong>开发提交测试</strong>&quot;的里程碑，即存在一个测试阶段，一旦开发将构建的版本提交给测试，即意味着测试执行阶段开始，而在这里程碑到来之前，开发没有交付版本，测试无法执行测试，只能进行测试的设计。</li></ul><p>这也进一步证明了，有什么开发就有什么测试，如图 2 所示。</p>',8),T=t("h4",{id:"et-与-st-的比较",tabindex:"-1"},[s("ET 与 ST 的比较 "),t("a",{class:"header-anchor",href:"#et-与-st-的比较","aria-label":'Permalink to "ET 与 ST 的比较"'},"​")],-1),c=t("p",null,"为了让你更好的理解探索式测试（ET），我们可以将它和基于脚本的测试（ST）进行比较。首先，ST 和 ET 之间也是有关系的，当 ST 中的脚本颗粒度越来越粗的时候，ST 正逼近 ET，同时 ET 也不同于 ad-hoc 测试，不是随机测试，它是有角色扮演、有场景的设计，即在进行 ET 之前，也是有准备的，甚至说有大颗粒度的设计，如图 3 所示。",-1),u=t("p",null,"正如前面所说，ST 和传统的研发模式很吻合，阶段性明确，来自于软件测试的分析流派和标准流派，注重文档及其规范性，依赖测试用例的评审来保证测试用例的质量，有利于管理和测试资产的复用，整个方式相对严谨和规范。而 ET 则是软件测试上下文驱动流派的代表，注重发挥测试人员的个人能力，特别是在缺乏明确的测试结果判断准则（而是启发式的 Test Oracle）的情况下，ET 更能发挥作用。而且，ET 直接针对被测产品进行测试，关注和产品的交互，不断质疑产品，从中也获得测试的乐趣。",-1),d=t("p",null,[s("测试人员直接针对产品进行测试，开发怎么改、测试就怎么测，更何况探索式测试不需要写测试用例，不需要去维护测试用例，轻装上阵，所以 "),t("strong",null,"ET 是最能适应产品变化的"),s(' ，拥抱变化。其次，ET 关注产品，直接和产品进行交互，这和敏捷宣言中核心的第 2 句"'),t("strong",null,"可工作的产品 胜于 详尽的文档"),s('"价值观也是吻合的，这两点进一步说明敏捷开发拥抱 ET。')],-1),q=t("p",null,[s('测试人员和产品交互的过程不是普通的对话过程，而是运用批判性思维不断质疑产品的过程，不断把问题抛给被测系统，并观察被测系统如何反应或做出什么响应。 这样，我们可以给"软件测试"重新下一个定义，即'),t("strong",null,"软件测试就是测试人员不断质疑被测系统的对话过程"),s("，如图 5 所示。这时，如果将测试人员比喻为客户端，而被测系统是服务器，测试的过程就是在客户端和服务器之间建立一个 session 的过程，这样可以帮助你理解下一讲中介绍的 SBTM 中的 session。")],-1),h=n("<p>为了更好的应对需求变化、适应快速迭代的节奏、提高测试效率，以及当测试的判断准则不够明确时，如需求文档不清晰，这时就需要引入探索式测试，而且敏捷测试和探索式测试是息息相通的，主要体现在以下几个方面：</p><ul><li><strong>价值驱动或业务驱动</strong>，都强调做对客户有价值的事情；</li><li><strong>持续学习和改进</strong>，上下文驱动，不断学习、不断改进、精益求精；</li><li><strong>以人为本</strong>，都强调人是最重要的，要发挥每一个研发人员的潜力；</li><li><strong>效率优先</strong>，更侧重效率，强调快速完成任务，持续工作、持续交付；</li><li><strong>拥抱变化</strong>，更具有适应性，能够快速响应变化，认可&quot;拥抱变化 胜于 遵循计划&quot;这样的价值观；</li><li><strong>关注产品本身</strong>，认可&quot;可工作的产品 胜于 详尽的文档&quot;这样的价值观。</li></ul><p>学完下一讲，你还能体会到 ET 也会实践&quot;任务分解、时间分解&quot;，强调面对面、更多的沟通，和敏捷有更多的相通之处，从而再一次深深体会到了 ET 更适合敏捷开发环境。</p><p>这一讲就讲到这里了，侧重讨论了什么是探索式测试、基于脚本的测试，以及它们之间有何关系、有何区别，并详细讨论了探索式测试和敏捷开发模式有许多相通之处，让你感受到敏捷开发模式会拥抱探索式测试。</p><p>最后，给你出一个思考题：上面说，探索式测试不需要设计和维护测试用例，轻装上阵，开发怎么改、测试就怎么测，所以 ET 是最能适应产品变化的，拥抱变化。这其中有没有包含某种假定、忽视了某种场景？在某种场景下，上述结论是不成立的，为什么？欢迎留言讨论。</p><p>下一讲，我将带你学习&quot;如何采用 SBTM：从 Mission 到 Session？&quot;，到时注意收听。</p>",6);function m(S,E,A,C,M,P){const o=i("Image");return a(),r("div",null,[p,e(o,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/00/F0/Ciqc1F6qs6GANljMAAFzf3-kybw138.png"}),g,e(o,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/00/F0/CgqCHl6qs--AeI3mAAJP2MSJPE4896.png"}),T,c,e(o,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/00/F0/CgqCHl6qtAGAU2wTAAPCXURh6EE518.png"}),u,e(o,{alt:"4.png",src:"https://s0.lgstatic.com/i/image/M00/00/F0/CgqCHl6qtAiATFltAAHOQW5DDOM501.png"}),d,q,e(o,{alt:"5.png",src:"https://s0.lgstatic.com/i/image/M00/00/F0/CgqCHl6qtD-ARiklAAaSeFV4G_0107.png"}),h])}const V=l(_,[["render",m]]);export{B as __pageData,V as default};
