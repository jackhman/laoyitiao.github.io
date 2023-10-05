import{_ as a,j as l,o as _,g as i,k as s,h as n,Q as e,s as t}from"./chunks/framework.4e7d56ce.js";const M=JSON.parse('{"title":"究竟什么是测试策略呢 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(1614) 第29讲：启发式测试策略与测试策略制定.md","filePath":"posts/devops/112-高效敏捷测试文档/(1614) 第29讲：启发式测试策略与测试策略制定.md","lastUpdated":1696417798000}'),p={name:"posts/devops/112-高效敏捷测试文档/(1614) 第29讲：启发式测试策略与测试策略制定.md"},r=e('<p>上一讲我们讨论了&quot;敏捷测试风险在哪里&quot;，有风险就有应对措施，在这些措施中蕴含着测试策略，甚至有比较激进的说法，没有测试风险，就不需要测试策略。但实际情况是，风险总是存在的，上一讲已讨论过，而且在敏捷开发模式中测试风险更严重，所以更需要测试策略。</p><h4 id="究竟什么是测试策略呢" tabindex="-1">究竟什么是测试策略呢 <a class="header-anchor" href="#究竟什么是测试策略呢" aria-label="Permalink to &quot;究竟什么是测试策略呢&quot;">​</a></h4><p>有一年以上测试工作经验的人，一般都有可能会谈到测试策略，但如果让他/她解释什么是测试策略，往往解释不清楚，为此，我曾经还写过一篇文章&quot;究竟什么是测试策略？&quot;，以帮助测试同学理解什么是测试策略。如果按照维基百科的解释：&quot;测试策略是软件研发过程中所有测试方法的概述，其目的是提供从组织的高层目标到实际测试活动的合理推论，以实现质量保证这方面相关的目标。&quot; 估计看到这个，还是不能理解什么是测试策略。</p><p>而我的解释则是：<strong>软件测试策略就是在测试质量和测试效率之间的一种平衡艺术</strong>，即制定或选择更合适、更有效的测试方式、测试方法和技术等，其目的是为了以最低的时间或人力成本达到最大程度地揭示产品的质量风险、尽快完成测试（即达到特定的测试目标）等。</p><p>测试策略体现在测试方式、方法和测试过程的策划上，并基于下列这些因素的考虑做出决定：</p><ul><li><strong>测试方式</strong>，包括手工方式与自动化方式、主动方式与被动方式、静态方式与动态方式等的选择与平衡，探索式测试或基于脚本的测试、自己团队测试还是众测、外包等平衡；</li><li><strong>测试方法</strong>，包括黑盒测试还是白盒测试方法、基于数据流还是基于控制流的方法、完全组合测试方法还是组合优化测试方法、错误猜测方法还是形式化方法等平衡；</li><li><strong>测试过程</strong>，先测什么、后测试什么，对测试阶段的不同划分等。</li></ul><p>在第 16 讲中谈到自动化测试的金字塔模型，它其实就是我们进行自动化测试时所采用的正确的测试策略，尽可能不做 UI 层自动化测试，而应该把更多的精力投在单元测试和接口测试上，从而降低自动化测试脚本开发和维护的成本，提高测试效率。有时候，选择合适的测试方法也体现了测试策略，例如，当我们面对一个被测功能，它涉及了很多个参数，而这些参数又是相互关联的，此时需要进行<strong>组合测试</strong>。</p><p>但是，如果采用完全组合，其测试用例数高达 30 万，即使采用面向接口的测试，一个用例执行时间为 0.1 秒，那么需要 3 万秒的时间，相当于 8 个多小时，这在敏捷中也是不能承受的，一般需要控制在半个小时之内就能得到测试结果的反馈。这时采用<strong>三三组合测试</strong>（如果觉得两两组合覆盖率偏低的话），将测试用例数降到 1000 以内，这时只需要 100 秒时间（不到 2 分钟）就完成了测试，效率极大地提高了（只是原来的三百分之一），但测试覆盖率也只是略微降低了一些。</p><h4 id="启发式测试策略模型" tabindex="-1">启发式测试策略模型 <a class="header-anchor" href="#启发式测试策略模型" aria-label="Permalink to &quot;启发式测试策略模型&quot;">​</a></h4><p>在敏捷测试中，我们常常采用启发式测试策略模型（<strong>只是启发我们进行策略分析的工具</strong>），即在第 26 讲中讨论的基于上下文驱动的启发式测试策略模型，更强调如何更好地适应上下文的变化，而且在敏捷开发中上下文变化是正常的，不变是不存在的，这对敏捷测试提出了更大的挑战。那我们如何更好地适应上下文的变化，采取合适的测试方式、方法来完成测试任务呢？</p><p>可以学习我国古代军事名著《孙子兵法》，从中获得一些灵感，帮助我们实施上下文驱动的启发式测试策略，比如 &quot;审时度势&quot;、&quot;知彼知己，百战不殆&quot;、&quot;能因敌变化而取胜者，谓之神&quot;，以及&quot;用兵之法，十则围之，五则攻之，倍则分之，敌则能战之，少则能逃之，不若则能避之&quot;等。2012 年，我和几个同事写的《完美测试》一书，其中一章就讨论了如何在测试中应用孙子兵法 36 计，引用了其中的十六计，包括&quot;欲擒故纵&quot;、&quot;趁火打劫&quot;、&quot;连环计&quot;、&quot;顺手牵羊&quot;、&quot;偷梁换柱&quot;、&quot;无中生有&quot;、&quot;借尸还魂&quot;等。</p>',11),u=t("p",null,"启发式测试策略是根据质量标准、项目背景、产品元素来选择合适的测试技术，最终交付给用户可接受的质量。但是，启发式测试策略涉及质量标准、项目背景、产品元素等 3 个方面众多的影响因素，如图 2 所示。如果我们要全面考虑这么多的因素，再制定测试策略，则花的时间特别多，快不起来；如果不考虑这些因素，直接凭感觉拍脑袋来制定测试策略，又很不科学，无法产生很好的效果。所以，启发式测试策略虽然能够普遍使用，但是不能快速、高效地指导具体的测试工作。测试人员需要因地制宜、因势利导，才能发挥其威力，那么，如何快速、高效地制定测试策略呢？",-1),c=e('<h4 id="快速、高效地制定测试策略" tabindex="-1">快速、高效地制定测试策略 <a class="header-anchor" href="#快速、高效地制定测试策略" aria-label="Permalink to &quot;快速、高效地制定测试策略&quot;">​</a></h4><p>要想快速、高效地制定测试策略，还得需要利用思维导图，能够灵活、快速、方便地增加因素或想法（其实是节点）、调整自己的想法（如删减节点），而且可以增加标记、注释、连接等图元，标记可以突显重要的元素，注释可以提高更详细的信息，连接可以建立元素之间的关联关系。</p><p>制定测试策略的过程，一定是向自己（团队）提问的过程、自我反思、自我启发的过程，这个过程中，关键会提问。例如，快速自问：</p><ul><li>当前项目重点需要考虑哪些限制因素？</li><li>哪些产品元素与当前测试任务相关呢？</li><li>系统会在哪些平台上运行呢？会产生哪些不兼容的问题？</li><li>针对实时性，产品有什么风险？可能会有什么缺陷？</li><li>通过什么测试可以发现这类缺陷？</li><li>采用什么样的测试技术，可以更快地测试它们？</li><li>哪些因素的组合会产生新的风险吗？</li><li>......</li></ul><p>但是，没必要像图 2 那么复杂，一般也不能使用通用模型，必须找到适合自己的启发式测试策略模型。每个团队都处在特定的行业（如汽车电子、金融、物流等）、开发特定的产品（某产品线上），这样就决定了这个团队所面临的特定质量标准、特定行业背景、特定产品类型等，质量标准、项目背景、产品元素等某些因素是不需要考虑的，某些因素相对固定，可能只有少量因素是动态的而且在当前项目中比较特殊，是值得我们特别关注的。</p><p>例如，开发某个车载系统（属于汽车电子行业），则需要考虑 ISO 26262 标准，而且涉及典型的 V2X 网络，不仅要考虑这种网络的安全性，还要考虑实时性要求，包括时间同步等方面的验证。在测试技术上，会引入网络接口测试工具、仿真技术等。借助这些测试技术，让测试不依赖于硬件（汽车），而且测试执行速度会更快、可以覆盖更多的异常场景。</p><p>在项目上，也要特别了解本项目的进度是否特别紧？处在什么阶段？如果还是尝试阶段，那么就不会直接上线，对安全性、兼容性等质量要求会低一些。在产品元素方面，也可以了解是否分层？有哪些 API？API 文档定义是否已完成等？</p><p>这样就可以完成该项目特有的启发式测试策略模型（HTSM），如图 3 所示。</p>',8),d=t("p",null,"定制 HTSM 的过程是应用 HTSM 的过程，也是训练我们系统思维、创造性思维的过程，不断思考、启发、再思考的过程，快速地在深度和广度探索，及时捕获调整上下文因素、风险，产生好的想法。这种练习经常做，思维自然会更敏捷，操作起来也会更快。上一个版本定制的 HTSM 也可以直接借用，然后在上面调整，达到测试资产的复用，这样测试策略制定是不是更快些？而且是一个完善、优化的过程，形成更有价值的测试资产。",-1),g=t("p",null,"制定测试策略还有一种方法，即事先维护上面所说的测试资产之一------过去采用过的或所有已知的各项测试策略（测试方式的组合、方法的运用等），标识或说明各项测试策略的应用场景。虽然它也随着时间的推进，需要更新，删除过时的、不能发挥作用的测试方式、方法和技术等，添加新的、更有效的测试方式、方法和技术等，但是对一个团队来说，只要维护唯一的一张思维导图就可以了，相对稳定，在制定测试策略前，它基本就绪，类似图 4 所示。然后，结合另外一张思维导图------列出当前这个项目所遇到的困难和风险，针对每一项困难或风险也会标上其优先级，按照优先级，快速地逐项分析，在图 4 这张思维导图中找到相对应的测试策略，这样就能够更快完成测试策略的制定。",-1),q=t("p",null,"测试策略的制定，首先要明确测试目标，这是根本，什么时候都不要忘记初心------测试目标，包括质量要求、测试交付物；接着再分析各个测试项可能存在的风险、阻碍测试目标实现的问题，了解之前重复说的项目背景、产品元素（结构、功能、数据、平台等）；然后，再根据各测试项的风险优先级，由高至低去确定合适的测试策略，包括选择合适的测试方法、技术和工具。",-1),h=t("p",null,"如果所选的测试策略之间存在冲突，以服从测试目标为宗旨，并基于风险的测试策略为敏捷测试的根本策略，即质量风险越高，其策略的优先级也越高。有效的测试策略就是为了在有限的资源下完成给定的测试任务，其中可能会舍弃某些非常低或较低优先级的测试任务（缩小了测试范围，增加了一丝测试风险）。所以，正确取舍，建立合适的测试策略，在测试目标和测试风险之间达到最佳的平衡，是测试策略制定的一条基本原则。",-1),m=t("p",null,"这一讲就讲到这里了，侧重讨论了什么是测试策略、启发式测试策略，以及如何在敏捷开发中快速、高效地制定测试策略。",-1),A=t("p",null,'最后，给你出一个思考题：原来由两个人负责"拉勾教育"App 的 Android 或 iOS 某个版本（其中一个迭代的版本），现在改为你一个人负责，开发周期不变，你会采取什么样的测试策略，降低测试风险？欢迎留言讨论。',-1);function T(C,S,V,f,P,I){const o=l("Image");return _(),i("div",null,[r,s(o,{alt:"1.png",src:"https://s0.lgstatic.com/i/image3/M01/08/D9/CgoCgV6lKbCAa7XzAAEC86TAr0o338.png"}),n(),u,s(o,{alt:"2.png",src:"https://s0.lgstatic.com/i/image3/M01/16/08/Ciqah16lKdiAeVvUACrjv81l3yo494.png"}),c,s(o,{alt:"3.png",src:"https://s0.lgstatic.com/i/image3/M01/08/D9/CgoCgV6lKfyASdxeAAOMxkO-VdA430.png"}),d,g,s(o,{alt:"4.png",src:"https://s0.lgstatic.com/i/image3/M01/08/D9/CgoCgV6lKgmAdWD_AAQp9NngbLE148.png"}),q,h,m,A])}const b=a(p,[["render",T]]);export{M as __pageData,b as default};
