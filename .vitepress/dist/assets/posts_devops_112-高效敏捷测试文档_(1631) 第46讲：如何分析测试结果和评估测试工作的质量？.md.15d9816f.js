import{_ as o,j as e,o as a,g as n,k as t,Q as s,s as r}from"./chunks/framework.e0c66c3f.js";const b=JSON.parse('{"title":"如何评估敏捷测试过程 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(1631) 第46讲：如何分析测试结果和评估测试工作的质量？.md","filePath":"posts/devops/112-高效敏捷测试文档/(1631) 第46讲：如何分析测试结果和评估测试工作的质量？.md","lastUpdated":1696338709000}'),_={name:"posts/devops/112-高效敏捷测试文档/(1631) 第46讲：如何分析测试结果和评估测试工作的质量？.md"},g=s('<p>软件测试中每一项测试活动都会产生测试结果，<strong>通过测试结果来评估产品的质量体现了测试的目的和价值</strong>。而通过测试结果评估测试工作本身的质量也非常重要，能让我们及时发现测试中存在的问题，并及时改正，是测试工作进行持续改进的基础。</p><p>相比传统的软件测试，敏捷测试更强调持续改进，根据上下文不断调整测试计划和设计，因此更需要在测试过程中对测试质量提供持续反馈。这一讲就来介绍如何对敏捷测试过程进行评估，如何实现量化管理，以及如何分析测试工作的质量。</p><h3 id="如何评估敏捷测试过程" tabindex="-1">如何评估敏捷测试过程 <a class="header-anchor" href="#如何评估敏捷测试过程" aria-label="Permalink to &quot;如何评估敏捷测试过程&quot;">​</a></h3><p>传统的测试过程比较好理解，测试分析、计划、设计、执行是分阶段按顺序开展的，测试过程的评估和管理就是针对这几个测试阶段展开的。敏捷测试仍然需要过程管理，因为良好的过程才能产生良好的测试结果和质量，但是和传统测试过程相比需要考虑以下不同的几点。</p><p>1）为了适应变化和改进的需要，敏捷测试中的测试分析、计划、设计和执行并不是按照顺序分阶段进行的，而是交替循环进行。可以把它们看作是相对独立的测试活动，前面几个模块也大体上是对上述各项活动分别讲解的，因此可以对上述各项测试活动进行评估。</p><p>2）敏捷测试中的持续测试几乎包括了迭代中所有的测试执行活动：设计评审、代码评审、单元测试、BVT、自动化回归测试和新功能的探索式测试，也包括性能测试、安全测试等专项测试。在评估体系中应根据每项测试的特点建立各自的评估标准，比如探索式测试可以从测试的充分性、有效性，以及测试效率等方面进行评估。<strong>自动化回归测试</strong> 应评估自动化测试在总的测试中所占的比重。<strong>单元测试</strong>应重点关注代码覆盖率和脚本质量。</p><p>3）传统的软件测试中会安排测试过程评审，定期或不定期的针对某个测试阶段或某项测试活动进行评审。评审的目的是了解测试过程是否存在问题，以及测试是否达到了测试目标等。敏捷测试也应该有过程评审，但敏捷测试作为敏捷开发的一部分，对测试过程的评估应该结合敏捷开发流程开展。</p><p>Scrum 流程中在每个迭代结束前安排 Sprint Review，检查 DoD 中的每一项任务是否已经完成。在第 35 讲中已经提到过，DoD 中的每一项几乎都和某项测试活动有关，比如新增代码要通过代码评审、单元测试覆盖率 80% 以上、需求覆盖率 100% 等。那么在 Sprint Review 中，就是根据每项测试活动的结果进行检查，如果没有达标，应该分析原因，这也相当于通过分析测试结果对测试过程进行评审。</p><p>每次迭代结束后的**回顾会议（Retrospective）**更适合对测试过程进行一个阶段性的评估，这时一个完整的迭代已经结束，通过收集、分析这个阶段的测试结果发现在今后的迭代中哪些方面需要改进。</p><p>测试过程的评估有<strong>定性</strong> 和<strong>定量</strong>两种方式。定性的评估是把计划的测试活动和实际执行的活动进行比较，了解测试计划执行的情况和效果，比如 SBTM 中调整了多少个新 Session，调整的比重，哪些没有执行？哪些是计划外的 Session？ 原因是什么？另外，还可以通过收集团队成员的直接反馈，通过了解测试实际执行情况发现问题并且分析原因。</p><p>但是，过程管理不能仅凭定性管理，量化管理是更好的管理方式，通过数字来反映真实情况，更加及时、客观、明确。再进一步，结合可视化的测试结果和质量的呈现工具，不需要正式的过程评审，团队内外可随时可以了解当前测试和质量的状态，真正做到持续评价、持续改进、持续控制。</p><p>下面就仔细谈谈如何进行量化评估------<strong>度量体系</strong>。</p><h3 id="敏捷测试过程的度量体系" tabindex="-1">敏捷测试过程的度量体系 <a class="header-anchor" href="#敏捷测试过程的度量体系" aria-label="Permalink to &quot;敏捷测试过程的度量体系&quot;">​</a></h3><p>对测试过程实现量化管理需要建立一套系统的度量指标体系。不同的产品、不同的研发团队需要建立的度量体系是不一样的，这里以通常的商业应用软件系统为例来进行讲解。</p><p>需要度量哪些方面？<strong>测试质量和测试效率是需要度量的两个最基本的目标</strong>。团队可以梳理出一些能直接或间接反映质量和效率的指标。</p><ul><li>测试质量直接的度量指标包括测试覆盖率、遗漏的缺陷率等。</li><li>测试效率的直接度量指标包括：每人•日设计多少用例/执行多少用例、自动化测试率以及缺陷验证周期等。间接的测试质量度量指标可以是度量测试环境的稳定性、可靠性等。</li></ul><p>理论上可以用来度量测试质量和效率的指标有很多，如果所有的指标都进行度量，那么分析的工作量大不说，也容易让过程管理失去重点。团队应该根据自身情况选择合适的度量指标，基本的指导思想是：看重什么就度量什么；想提高什么，就度量什么。这也符合敏捷思维。</p><p>如何体现系统性？在建立的度量体系中，虽然应该有重点、有取舍，但也要保证测试过程动态平衡的发展。就拿测试质量和效率来说，具有一定的独立性，但也会相互影响，既相互促进，也相互制约。一方面，测试的质量高，一次就把事情做对，会促进测试效率的提高；反过来，高效赋予测试更多时间进行更充分的测试，测试质量必然会提高，而低效往往会减少测试时间，给测试质量带来更大的风险。</p><p>但另一方面，如果一味地追求快，只跟踪测试效率相关的指标，比如每人•日执行多少测试用例、测试自动化率等，很可能会顾此失彼，导致测试质量出现问题，比如发现的缺陷数量不多，但上线后问题多、用户反馈不佳等。</p><p>如何体现对过程的度量？ 在敏捷测试中，测试分析、计划、设计、执行等活动可以分别进行度量。但是对过程的度量更应该保持持续性：每次迭代从开始到结束、每个要交付的版本以及产品的整个生命周期，随时发现问题，解决问题。并且在迭代之间、版本之间比较它们的测试质量、测试效率，通过度量的持续性和可视化获得测试改进的持续性和可视化。</p><p>另外，测试过程的度量还应包括产品质量的度量，因为产品质量和测试的质量也息息相关，前一个版本的测试质量不好，就会影响当前版本的产品质量。</p><p>综上所述，一个敏捷测试过程的度量体系如图 1 所示，从测试质量、测试效率、产品质量三个方面进行度量，覆盖了测试设计、执行、缺陷报告等重要活动。测试计划和分析的质量会体现在测试覆盖率和缺陷相关的度量指标中；而测试计划和分析在敏捷测试中本来就力求简单有效，因此没有考虑对其进行效率方面的度量。</p>',22),i=s('<p>图1 软件测试过程的度量体系</p><h3 id="测试工作质量的分析" tabindex="-1">测试工作质量的分析 <a class="header-anchor" href="#测试工作质量的分析" aria-label="Permalink to &quot;测试工作质量的分析&quot;">​</a></h3><p>测试活动有两个最重要的输出：一个是<strong>测试用例</strong> （包括测试脚本），一个是<strong>发现的缺陷</strong>。通过图 1 可以看出，测试质量的度量指标大多数是根据这两项内容制定的。度量指标对测试工作质量的量化分析提供了基础。因此可以说，测试工作的质量是通过对测试结果的分析来评估的。根据测试结果计算每一个度量指标，通过度量指标分析、发现测试过程中的质量问题，在此基础上不断改进、完善。</p><p>下面就从<strong>测试用例和缺陷</strong>两个方面来介绍如何分析测试工作的质量。</p><h4 id="基于测试覆盖率分析测试工作质量" tabindex="-1">基于测试覆盖率分析测试工作质量 <a class="header-anchor" href="#基于测试覆盖率分析测试工作质量" aria-label="Permalink to &quot;基于测试覆盖率分析测试工作质量&quot;">​</a></h4><p>评价测试质量的好坏首先要分析测试结果是否达到了既定的测试目标，测试目标是测试计划中最重要的内容之一，一般会用测试覆盖率来衡量测试目标的实现。测试覆盖率是对测试充分性的量化指标，指已执行测试覆盖的数据和事先定义/要求的目标之间的比值，趋向于或达到 100%，说明覆盖率足够高。通常从三个方面来衡量：<strong>代码覆盖率、功能覆盖率和业务覆盖率</strong>。</p><p><strong>1.</strong> <strong>代码覆盖率</strong></p><p>它是代码级测试的衡量指标，在测试中借助测试覆盖率分析工具统计测试脚本对被测对象代码的语句、路径或条件的覆盖率。<strong>最常用的是语句覆盖率</strong>，即实际执行的代码行数和总的代码行数的比值。</p><p>度量公式如下所示：</p><p>测试用例代码覆盖率 = 运行 TC 覆盖的 LOC 数 / OUT 的总 LOC 数</p><p>也可以用分支覆盖率衡量，度量公式如下所示：</p><p>测试用例分支覆盖率 = 运行 TC 覆盖的 BOC 数 / OUT 的总分支数</p><p>度量公式中测试用例用 TC（Test Case）表示；被测对象用 OUT（Object under test）表示，含 SUT（被测系统）、被测单元/组件/类等；代码行用 LOC（Lines Of Code）表示；分支用 BOC（Branches Of Code）表示。</p><p>以 JaCoCo 工具为例，可以逐层显示每个软件包、类、方法的（代码行、分支等）测试覆盖率，如图 2 与图 3 所示。如果代码覆盖率没有达到测试计划中的既定目标，需要分析是哪些模块没有达到，团队中应该由谁负责补充相应的测试脚本。</p>',14),c=r("p",null,"图2 软件包的测试覆盖率列表",-1),l=s('<p>图3 类的测试覆盖率列表</p><p><strong>2. 功能覆盖率</strong></p><p>对于功能测试，可以用功能覆盖率来衡量测试质量，用大的功能特性来衡量覆盖率没有意义。因为一个功能特性会对应几十、上百个测试用例，可以从被测系统的功能结构出发将功能分解为子功能、子子功能，最后分解成一个个的功能点（FP）。功能点和测试用例之间应该有对应关系，呈现出层次结构。因此，应该用功能点的测试覆盖率来衡量并分析功能测试的质量。</p><p>功能覆盖率的度量公式如下所示：</p><p>功能覆盖率 = 运行 TC 覆盖的 FP 数 / OUT 的总 FP 数</p><p><strong>3.</strong> <strong>业务覆盖率</strong></p><p>第 36 讲介绍过如何从业务需求出发设计测试用例，在引入 BDD 的情况下，从业务需求到功能特性、用户故事、场景、最后到测试用例的逐步分解。从最顶端的业务需求来度量测试覆盖率同样没有实际意义，因为粒度太大，一个业务需求可能对应几百条甚至几千条测试用例。但如果用场景覆盖率来衡量，每个用户场景对应几条测试用例，测试覆盖率的衡量就有价值和可操作性。如果没有引入 BDD， 业务需求覆盖率就需要根据业务流程图来度量。</p><p>基于用户场景的业务覆盖率度量公式如下所示：</p><p>测试场景覆盖率 = 测试执行已覆盖的场景数 / 需要测试的场景数</p><h4 id="基于缺陷分析测试工作质量" tabindex="-1">基于缺陷分析测试工作质量 <a class="header-anchor" href="#基于缺陷分析测试工作质量" aria-label="Permalink to &quot;基于缺陷分析测试工作质量&quot;">​</a></h4><p>缺陷作为测试活动的另一项重要输出，也可以作为评估测试质量的指标，包括缺陷在测试活动中的误报率、缺陷的遗漏率。</p><p>缺陷的误报率的度量公式如下：</p><p>缺陷的误报率 = 无效的 bug 数 / 所报告的总 bug 数</p><p>通常情况下，缺陷的误报率应该掌握在 5～10% 以内。无效的 bug 数越多，研发团队在处理分析这类 bug 上花费的时间就越多，这会挤压处理有效缺陷和开发、测试活动的时间，自然需要控制其数量。但是，误报的原因一般比较复杂。有时候跟团队采用的缺陷报告策略有关系，比如，敏捷开发中新功能的测试往往是在需求不太明确的情况下进行的。遇到这类问题，往往测试人员拿不准是不是缺陷的时候，一般先澄清需求，再决定是否报告缺陷，还是先报告缺陷，再去做需求澄清？</p><p>另外，需要思考的是，缺陷的误报率是不是越低越好？误报率的目标定得越低，测试人员报告缺陷就越谨慎，花在分析和复现上面的时间就越多，会在一定程度上牺牲效率，并且可能遗漏真正有效的缺陷。</p><p>缺陷的遗漏率：</p><p>缺陷的遗漏率 = 交付后发现的 bug 数 / 总 bug 数</p><p>交付后用户发现的缺陷值得分析，究竟是什么原因导致在研发过程中没有发现？如果是因为产品的业务需求没有覆盖到，则需要产品负责人考虑是否在下一版加到业务需求中，比如对某个操作系统的某个新版本的支持。如果是因为测试质量的问题，那要看问题出在什么环节，是测试分析、测试设计、还是测试执行，是人的问题还是工具的问题，然后有针对性地改进，比如添加测试用例、加强人员技能培训，或者改进测试工具。</p><p>这一讲留给你的思考题：测试过程度量体系应该体现系统性，度量指标之间有直接或间接的关系，有的相互影响和制约，你能举出一些例子，并思考如何优化度量指标？</p>',19);function d(h,m,T,C,u,A){const p=e("Image");return a(),n("div",null,[g,t(p,{alt:"image1.png",src:"https://s0.lgstatic.com/i/image/M00/1A/86/CgqCHl7dnpmAPmm3AACl6LT1Sa0735.png"}),i,t(p,{alt:"image2.png",src:"https://s0.lgstatic.com/i/image/M00/1A/86/CgqCHl7dnqqABhkZAAIxwjCpeOg635.png"}),c,t(p,{alt:"image3.png",src:"https://s0.lgstatic.com/i/image/M00/1A/7A/Ciqc1F7dnrOAbJXfAAJNnq_x804180.png"}),l])}const P=o(_,[["render",d]]);export{b as __pageData,P as default};
