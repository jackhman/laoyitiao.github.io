import{_ as s,j as r,o as _,g as n,k as p,h as t,Q as o,s as a}from"./chunks/framework.4e7d56ce.js";const b=JSON.parse('{"title":"第41讲：质效合一：自动化测试和手工测试的完美融合","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(1626) 第41讲：质效合一：自动化测试和手工测试的完美融合.md","filePath":"posts/devops/112-高效敏捷测试文档/(1626) 第41讲：质效合一：自动化测试和手工测试的完美融合.md","lastUpdated":1696417798000}'),l={name:"posts/devops/112-高效敏捷测试文档/(1626) 第41讲：质效合一：自动化测试和手工测试的完美融合.md"},i=o('<h1 id="第41讲-质效合一-自动化测试和手工测试的完美融合" tabindex="-1">第41讲：质效合一：自动化测试和手工测试的完美融合 <a class="header-anchor" href="#第41讲-质效合一-自动化测试和手工测试的完美融合" aria-label="Permalink to &quot;第41讲：质效合一：自动化测试和手工测试的完美融合&quot;">​</a></h1><p>今天主要讲敏捷测试在执行阶段的策略。在前面讲了很多测试自动化的内容，也讲了不少探索式测试。不知道你想过没有，在产品的一次迭代开发中，什么样的测试适合自动化，什么样的测试适合手工测试？自动化测试和手工测试怎么结合才能达到更好的质量和效率？据我了解，不少团队对这些问题是缺乏思考和明确指导的。</p><h3 id="一个案例" tabindex="-1">一个案例 <a class="header-anchor" href="#一个案例" aria-label="Permalink to &quot;一个案例&quot;">​</a></h3><p>这里举一个测试团队的真实经历，该团队非常重视测试自动化，自主研发了自动化测试平台，平均测试自动化率达到了 65%。但是自动化测试在每个项目中平均只能发现 10% 的有效缺陷，绝大多数的缺陷还是通过手工测试发现的。测试团队的负责人认为自动化测试应该发现更多的缺陷才更有价值，而之所以效果不理想是因为下面两点。</p><p>第一，能做测试自动化的人手不足：脚本开发由专门的测试开发人员完成，大部分的测试人员只做手工测试，这就造成了测试脚本的开发进度比较慢。对于一个新产品，往往在好几个版本迭代之后，到了项目中后期测试脚本才勉强开发完。这时候大部分的缺陷已经通过手工测试发现了。</p><p>第二，测试开发人员不怎么参与具体的测试执行，对产品和业务的了解不够。因此在设计测试脚本时对业务场景的考虑不够全面。</p><p>于是团队要求每一个测试人员开发自己负责的功能模块的测试脚本。经过一系列的培训，这个目标最终达到了，测试人员自己编写的测试脚本在业务流程和功能点的验证方面确实也更全面。</p><p>既然人力不足的问题解决了，团队负责人认为测试脚本的开发自然是越早越好。于是，团队要求每个项目都要争取在一次迭代内把新功能的部分能自动化的尽量自动化。这样测试脚本就可以尽早投入执行，可以发现更多的缺陷。但是推行了一两个项目之后，发现很难做到。测试人员也抱怨：他们花在脚本开发和调试上的时间太多了，还不如手工测试能更快地发现缺陷。后来，这项要求也就不了了之了。</p><p>应该说，这个团队在普及自动化测试能力这方面做得不错。但是在测试执行过程中，测试负责人要求尽早地开始测试脚本开发是不切实际的。</p><p>因为迭代开发中的需求和设计往往是逐渐明确的，新的功能也是逐渐成长起来的。用户故事的需求在一开始往往不清楚，常常在开发和测试之间不断的尝试，团队成员在不断地讨论中才逐渐确定下来。当功能的需求不明确时，无论是 UI 还是接口的自动化测试都会困难重重，因为界面设计和接口定义都会更改，验收标准也有可能会更改。这时候就开始开发测试脚本只能经历反复修改，并不能在本次迭代中尽早地投入使用，带来效益。</p><h3 id="新功能手工测试-回归测试自动化" tabindex="-1">新功能手工测试，回归测试自动化 <a class="header-anchor" href="#新功能手工测试-回归测试自动化" aria-label="Permalink to &quot;新功能手工测试，回归测试自动化&quot;">​</a></h3><p><strong>对于当前迭代的新功能，更有效的方式是借助手工测试</strong>，即采用探索式测试的方式。开发人员完成一个特性，测试人员就可以立即展开测试、发现问题，立即和其他团队成员进行沟通，及时纠正，而且能更有效地发现缺陷。敏捷模式实施持续构建，每天都有可工作的软件，但每次要验证的新软件变更并不多，况且人最具有灵活性，增加什么就测什么，改了哪儿就测哪儿。探索式测试不需要写测试用例，效率更高、更灵活、更能应对变化。</p><p><strong>新功能不适合做自动化测试，但回归测试需要依赖高度的测试自动化</strong>。在敏捷开发环境中，一个迭代周期通常是 2~4 周，最后验收测试只有几天时间，每次迭代都会增加新的功能。在经过一次一次的迭代，回归测试范围在不断增加，如图 1 所示。在非常有限的时间里，既要完成新功能的测试，又要完成越来越多的回归测试，如果没有自动化测试，几乎不太可能。</p>',13),c=a("p",null,"探索式测试不用写测试用例，节省下来的时间可以用来开发自动化测试脚本，但并非针对本次迭代的新功能，否则你就会遇到和案例里面那个团队同样的问题。测试人员应该开发上一个迭代已实现功能的自动化测试脚本。因为这时候，上一次迭代的功能特性已相对稳定，自动化脚本开发和调试都没什么障碍，效率也相对较高。新开发的测试脚本添加到自动化回归测试集，尽量保证回归测试可以全部自动化。",-1),d=a("p",null,[t("这就是我建议的自动化测试和手工测试有机结合的策略："),a("strong",null,"新功能采用探索式测试，回归测试尽量全部自动化，针对上一次迭代实现的功能进行脚本开发"),t("，如图 2 所示。")],-1),h=o('<h3 id="探索未知的-自动化已知的" tabindex="-1">探索未知的，自动化已知的 <a class="header-anchor" href="#探索未知的-自动化已知的" aria-label="Permalink to &quot;探索未知的，自动化已知的&quot;">​</a></h3><p>这几年我一直倡导要重新认识软件测试，对于软件测试我给出了一个新的公式：</p><p>测试 = 检测 + 试验</p><p>对于软件产品，可以检测的部分是产品中具有确定性的功能特性，也就是<strong>已知的部分</strong>。这部分功能的测试目标、测试需求和测试的验证准则等都是明确的，具有良好的可测试性。</p><p>而对产品中具有不确定性的功能特性，也就是<strong>未知的部分</strong> ，<strong>只能通过试验来验证</strong>。不确定性主要是这几个原因造成的：功能需求定义不清楚、处于经常变更的状态、测试范围和数据是无限的，很难直接进行验证。软件系统中未知的、不确定性的部分越来越多，因为我们已经处于移动互联、大数据和人工智能时代，软件系统输入和输出的复杂性、多样性以及快速变化等特性，都增加了不确定性。</p><p>将上述公式再展开，就成为：</p><p><strong>测试</strong> = 检测已知的 + 试验未知的</p><p>测试过程中，判断测试结果是否通过，Test Oracle 举足轻重。Test Oracle 可以翻译为测试预言，就是决定一项测试是否通过的一种判断机制。对于已知的、具有确定性的功能特性，一般会运用相对明确的 Test Oracle，比如清晰的 Spec、竞品参照、一致性测试预言（Consistency Oracle）；已知的部分，适合采用测试自动化的方式进行测试，因为输入和输出都是明确的，Test Oracle 也是明确的。</p><p>针对未知的，具有不确定性的功能特性，不论输入还是输出，都需要不断尝试。Test Oracle 也是启发式的，需要综合判断。未知的实验分为两部分：</p><ul><li>通过工具实验，产生随机、半随机（变异／模糊）的数据，进行变异测试／模糊测试等，这里可以用统计准则，或造成系统异常（如系统崩溃），容易判断，用于安全性测试、稳定性测试等；</li><li>通过测试人员的试验，不断地质疑系统，根据系统的反馈来做出判断，也就是探索式测试的方式。</li></ul><p>随着大数据和人工智能（AI）的发展，对未知进行测试时遇到的困难，也可以通过人工智能来解决。结合工具的随机／半随机测试和人的探索，未知的试验进一步提升为人工智能，不断学习、不断进行数据（输入、输出、log 等）挖掘，不断构造／完善验证的规则／准则，完成自动的测试，从未知逐步走到已知。</p><p>因此， 可以将测试新公式&quot;<strong>测试＝检测＋试验</strong> &quot;再进一步明确为：</p><p>测试＝基于模型的、脚本的自动化测试 ＋ 基于人工或 AI 的探索式测试</p><p>从测试一开始，<strong>即测试需求分析开始，就将测试的范围（测试项）分为两部分</strong> ：<strong>已知的</strong> （包括确定性的／稳定的）、<strong>未知的</strong>（包括不确定的／动态的）。已知的测试项，理论上都可以实现自动化；未知的部分，也可以用工具进行测试（模糊测试／随机测试等），更多的是依赖人的探索式测试。</p><p>测试执行中的 ET 和 TA 有机结合的测试就是一个具体的应用。因为迭代中的测试范围也可以分为两部分：相对稳定的、有明确的测试项的已实现功能，和不确定的、容易变更的新功能。当新功能处于容易变更的状态时，就采用探索式测试的方式。而对上次迭代中已经实现的功能进行回归测试的脚本开发/调试。</p><h3 id="自动化回归测试怎么做" tabindex="-1">自动化回归测试怎么做？ <a class="header-anchor" href="#自动化回归测试怎么做" aria-label="Permalink to &quot;自动化回归测试怎么做？&quot;">​</a></h3><p>对于一个长期的软件产品来说，因为功能不断增加，回归测试所占的比重越来越大，即使回归测试实现了高度自动化，一个完整的回归测试也常常需要十几个小时甚至几天的时间才能执行完毕。在敏捷测试里，回归测试是持续测试的一部分，每次回归测试都重新运行所有的测试用例是不切实际的。所以也需要考虑有效的回归测试策略。</p><p>第 30 讲介绍过精准测试，通过代码依赖性分析和代码差异分析优化回归测试范围，即根据每个版本的代码变更选择回归测试的范围。这对于提高回归测试的效率非常有帮助，尤其是在版本即将交付前，修复了一些缺陷但在非常有限的时间里根本来不及做完整的回归测试。</p><p>如果没有引入精准测试，那团队在选择回归测试策略时需要兼顾效率和风险两个方面，根据项目的进度和状态进行动态的调整。平时就多测、持续测，充分利用自动化测试的优势，比如把测试分配到不同的测试机上并行执行，把大量的回归测试安排到夜间及周末运行。利用自动化测试平台和 CI/CD 环境的集成，创建定时的测试任务，自动启动测试工具和运行测试脚本。在晚上执行测试任务，第二天上班一早就能拿到测试结果；周末执行测试任务，周一上班就能拿到测试结果。</p><p>在产品交付之前，如果有代码变更，需要基于风险和基于操作剖面选择测试等策略相结合。基于操作剖面选择测试，即选择测试用例是依据哪些功能是用户最常用的，如 80/20 原则，其中 20% 的常用功能，用户有 80% 的时间在用它们，这部分的测试用例大部分会在 BVT 的测试范围内，作为持续集成测试的一部分。</p><h3 id="ai-助力-让测试更完美" tabindex="-1">AI 助力，让测试更完美 <a class="header-anchor" href="#ai-助力-让测试更完美" aria-label="Permalink to &quot;AI 助力，让测试更完美&quot;">​</a></h3><p>再回到敏捷测试的执行策略：探索式测试应用于新的功能特性，自动化测试应用于回归测试。就今天来看，无论是手工的探索式测试还是基于机器的自动化测试都有其局限性，还不能达到完美的质效合一。</p><p>就自动化测试来说，测试脚本还需要人来编写、维护，另外，发现缺陷的能力不够强也是事实。而且，无论是自动化测试还是手工测试，都面临对业务逻辑、应用场景考虑不全的问题。系统越复杂，测试应该达到的覆盖率和实际覆盖率差距就越大。</p><p>今天这些问题借助 AI 也许能得到令人满意的解决。</p><p>一方面，AI 可以和基于模型的测试技术（MBT）相结合，自动生成测试脚本，从而实现更加彻底的测试自动化，大幅提高测试效率。这方面的 AI 测试工具已经有不少，比如 Retest，使用人工智能猴子来完成应用程序自动化测试，不仅可以自动生成测试脚本，在自动化回归测试中还可以自动对比页面上的变更并且提供可视化的报告。</p><p>另一方面，探索式测试也可以和 AI 结合，对于新的功能特性，测试人员先进行探索式测试，给 AI &quot;喂&quot;数据，通过机器学习加速 AI 模型的训练，在补全测试场景的同时自动生成测试脚本，这样可以针对业务完善测试覆盖率。这方面的 AI 测试工具有 Mabl。</p><p>目前，精准测试技术所建立的代码与测试用例之间的映射关系往往是静态的，不能随时更新。其实测试范围的选择不仅仅要考虑代码覆盖率，还需要结合项目所处的状态、客户反馈信息、以前发现的缺陷等多种因素。通过机器学习就可以对多种信息进行数据挖掘，更加智能的优化回归测试范围。</p><p>AI 应用于测试的例子已经有很多，希望你能体会到一场新的测试革命正在到来，测试机器人在不久的将来会成为测试的主要力量。有了 AI 助力的软件测试会更加完美。</p><p>今天这一讲到这里就结束了，我主要讲解了三个部分：</p><ul><li>采取测试自动化和手工测试结合的方式实现质量和效率的统一；</li><li>软件测试的新公式及其具体应用，比如自动化已知的、探索未知的；</li><li>AI 技术助力软件测试可以提高测试覆盖率、测试效率，从而让质效合一更完美。</li></ul><p>今天要给你出的思考题是：除了上面提到的 AI 和软件测试结合的方向，你认为还会有其他方向吗？</p>',31);function g(u,A,m,I,T,q){const e=r("Image");return _(),n("div",null,[i,p(e,{alt:"11.png",src:"https://s0.lgstatic.com/i/image/M00/12/20/Ciqc1F7M_uyAER77AADq_M3KV8M952.png"}),t(),c,d,p(e,{alt:"22.png",src:"https://s0.lgstatic.com/i/image/M00/12/2B/CgqCHl7M_viAN1aSAAKfLbVJ1tc171.png"}),t(),h])}const P=s(l,[["render",g]]);export{b as __pageData,P as default};
