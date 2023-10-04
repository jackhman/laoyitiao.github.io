import{_ as r,j as a,o as l,g as _,k as e,s as t,h as o,Q as n}from"./chunks/framework.e0c66c3f.js";const I=JSON.parse('{"title":"用户思维 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(1612) 第27讲：如何培养自己的业务与用户体验分析技能？.md","filePath":"posts/devops/112-高效敏捷测试文档/(1612) 第27讲：如何培养自己的业务与用户体验分析技能？.md","lastUpdated":1696338709000}'),i={name:"posts/devops/112-高效敏捷测试文档/(1612) 第27讲：如何培养自己的业务与用户体验分析技能？.md"},p=t("p",null,'上一讲我们讨论了"基于上下文驱动思维的测试分析"，因为在敏捷开发模式下，我们强调持续交付、持续测试，整个测试过程是非常动态的，所以必须关注上下文的变化，基于上下文来制定测试策略和方法。上下文驱动思维是在第 3 讲中所讨论的主要敏捷测试思维方式之一，而其中另一种主要思维方式------"用户思维"，不仅和质量因素相关，而且还会更有助于测试需求分析和用户体验分析，我们有必要在这一讲先讨论一下"用户思维"。',-1),g=t("h4",{id:"用户思维",tabindex:"-1"},[o("用户思维 "),t("a",{class:"header-anchor",href:"#用户思维","aria-label":'Permalink to "用户思维"'},"​")],-1),c=t("p",null,[o("之前，我们说用户思维，就是一切从用户角度出发，站在用户角度去思考产品的功能特性，扮演用户角色进行测试。在敏捷中，强调交付价值给用户，这种价值是对用户有价值，而不是对开发人员、测试人员等有价值，需要更强的用户思维。所以，在"),t("strong",null,"敏捷中用户思维"),o(" ，可以定义为："),t("strong",null,"不要打造更好的产品，而要打造更好的用户"),o("，即由原来重点关注如何提升产品质量转移到如何帮助用户完成目标，取得卓越的成功。")],-1),u=t("p",null,'这和思科的文化倒是非常吻合的，思科从来没有提"让客户满意"，而是帮助客户、让客户的业务获得成功。我在第 9 讲讨论"如何营造质量文化"时提到过，之前配戴过的思科（Cisco ）badge，上面所有的思科文化都是为了有助于"客户成功（Customer Success）"，这就是典型的用户思维。',-1),d=n('<p>正如 Kathy Sierra 在《用户思维+：好产品让用户为自己尖叫》书中揭示了有点残酷的事实：用户并不关心你是谁，能做什么，他们只关心自己看起来怎么样，不会因为真的喜欢产品而说喜欢，而是因为他们自己喜欢。而某款产品之所以能够成功，也只有一个原因，那就是<strong>它成就了用户</strong>（Make Users Awesome）。</p><p>有了这样的认知，客户思维又上升了一个台阶，更关注客户的真实愿望，会主动和客户交流，聆听客户的心声，挖掘客户的真实需求。</p><p>在实际的业务需求分析中，完全站在用户的角度去看问题，从用户的喜怒哀乐出发，反过来质疑产品。我们可以扮演客户的角色，进入角色所处的整个业务操作的环境中，获取一种浸入式体验，从而更好地理解产品的应用场景或发现更多的应用场景。</p><h4 id="场景是测试需求的灵魂" tabindex="-1">场景是测试需求的灵魂 <a class="header-anchor" href="#场景是测试需求的灵魂" aria-label="Permalink to &quot;场景是测试需求的灵魂&quot;">​</a></h4><p>20 世纪科学界有一位奇特的通才，那就是美国经济学家、政治学家、认知科学家、1978 年诺贝尔经济学奖得主、1975 年图灵奖得主赫伯特·西蒙曾经指出，因为规律是从具体的场景中抽离并综合得到的，还原或运用时需要结合具体的、即时的场景。</p><p><strong>测试就是对原来抽象的业务需求的一种还原，通过还原来验证需求</strong> 。所以产品的应用场景是测试特别所关注的，无论是在第 24 讲 BDD 中谈到用户故事的验收标准，需要场景去覆盖，尽可能捕获各种场景覆盖验收标准，还是后续谈到探索式测试，也需要有想象力，在测试设计、执行和学习中不断发现新的场景，这样才能更好地完成敏捷测试，所以说，<strong>场景是敏捷测试需求的灵魂</strong>。</p><p>有人说，&quot;场&quot;是时间和空间的结合。任何行为一定发生在特定的空间中的某一个瞬间，时空组合产生许多美妙的上下文，让我们在这美妙的时空中看到不同的情景，这就需要和用户有心灵的沟通，和产品有更多的交互，去发现场景。发现新的场景后，也会产生新的情绪，会促进新的想象空间，从而会发现更多的场景。这个过程，也给测试增加了不少乐趣。</p><p>有一个例子能说明这样的问题。有段时间，佳能公司为了更好的销售佳能相机，搞了一个&quot;感动常在&quot;的活动，去征集用佳能相机捕获到那些感人至深的一瞬间的照片，然后把这些照片放出来进行市场宣传。佳能公司，没有宣传相机，而是宣传无数个美丽或富有朝气的&quot;你&quot;。买相机的，其实就是你，你是用户，通过相机来塑造伟大的你。</p>',8),h=n('<p>相机再怎么漂亮，也没有价值，相机是为了塑造拥有它的用户，这就是前面说的用户思维，但仅仅有用户思维还不够，还需要让用户相信这点。为此佳能广泛地收集照片，从而发现那些感人至深的场景------比如运动、演唱、户外活动等，只有这些真实的场景才会真正感动我们。如果能感动我们，我们就很自然的去买相机。</p><p>基于场景的测试方法，目前是敏捷测试中常用的方法，包括事件流、状态树等设计方法都和场景有关，我们会在第 37 讲中再详细讨论这些方法。测试中生动的场景，不仅涉及一些不同的环境、同一种环境的不同配置和配置组合，还包括一些前置条件、后置条件、异常操作、异常数据的输入/输出等。</p><h4 id="业务分析" tabindex="-1">业务分析 <a class="header-anchor" href="#业务分析" aria-label="Permalink to &quot;业务分析&quot;">​</a></h4><p>从需求来看，不能简单看做是用户需求，而是要将其分为三个层次来看，具体如下。</p><ul><li><strong>业务需求</strong>：满足各种业务目标而对业务实际运行、操作的要求，是业务分析的主要对象，也是软件系统必须满足的、最基本的要求。</li><li><strong>用户角色/干系人需求</strong>：用户/干系人都是服务于业务的，它们在业务中扮演着不同角色，发挥不同的作用，自然对软件系统有着各自特定的需求，就像前面 Epic、用户故事、场景所描述的。</li><li><strong>系统功能和非功能性需求</strong>，是为了满足上述两层需求而要求软件系统所具备的特性。</li></ul><p><strong>针对业务需求，我们要厘清业务角色、业务实体、业务流程、业务活动及其之间的关系</strong> ，如图 3 所示。但<strong>业务涉及的内容，不局限于这些，还包括业务规则、业务操作、业务数据、业务安全性、业务可管理性和业务发展等</strong>。业务分析的核心还是业务实体关系图和业务流程图，前者更有利于搞清楚业务数据，而后者有利于搞清楚业务活动、业务角色及其之间的关系。做业务分析，一定要把业务流程图画出来，业务角色、业务活动和业务规则等也会慢慢浮现出来。业务规则需要细致的梳理，从而进一步完善业务流程（往往会增加一些业务流程的分支），业务流程图和业务规则的完善则是相互促进的过程。</p>',6),q=n('<p>针对用户需求，还可以进行下列的分析工作：</p><ul><li><strong>用户细分</strong>，不同的用户群有不同的需求，创建细分用户群（即将具有某些共同关键特征或者共同需求的用户划分成组），从而更能揭示用户的真实需求，不同用户群的需求也有可能是彼此矛盾的，他们在使用相同功能时，需要考虑让他们选择不同的操作方式；</li><li><strong>可用性和用户研究</strong>，包括问卷调查、卡片排序法、焦点小组、任务分析、用户测试等方法/工具来获取用户信息、了解用户行为等；</li><li><strong>创建人物角色</strong>，基于上面的用户研究，从中提取出的、可成为一些典型的虚拟人物，从而更好地演绎用户使用产品的场景。</li></ul><h4 id="用户体验要素" tabindex="-1">用户体验要素 <a class="header-anchor" href="#用户体验要素" aria-label="Permalink to &quot;用户体验要素&quot;">​</a></h4><p>基于用户思维，设身处地为用户着想，去不断挖掘用户的需求和期望、不断挖掘产品的应用场景，这些都是敏捷测试人员的基本素质。在这基础上，如何真正更好地运用用户思维，洞察业务需求及其应用场景，审视产品的各个维度，是否符合用户的需求，则需要培养对用户体验的感性认识和专业的理解。</p><p>感性认识，属于第六感觉，需要平时多观察，和用户经常沟通获得。这里更侧重讨论专业的理解。根据相关研究，影响用户体验的额外两个因素：内容、技术，<strong>内容</strong> 要符合用户的实际需求和偏好等，而<strong>技术</strong>从性能、稳定性、功耗等各个方面来提供对用户体验的保障措施，确保用户能流畅地、稳定地使用产品。</p><p>更好地分析用户体验，一般认为可以进行分层研究，《用户体验要素 : 以用户为中心的产品设计》一书中介绍了五层模型。</p><ul><li><strong>表现层</strong>：所呈现的具体细节，用户感知体验主要来源于这一层。</li><li><strong>框架层</strong>：信息设计、界面设计或空间布局，确定了在 UI 交互界面上交互元素的位置和排列方式，允许用户以不同的方式浏览，并帮助用户理解使用。</li><li><strong>结构层</strong>：确定元素之间的逻辑关系，包括系统各种特性和功能最合适的组合方式，例如用户如何到达某个页面，以及处理完之后去哪里。框架是结构的具体表达方式，而结构层则用来设计、指引用户如何到达某个特定的页面。</li><li><strong>范围层</strong>：定义软件的需求及其优先级，即特性和功能就构成了系统的范围层，创建怎样的功能规格或内容需求，具体实现哪些功能。</li><li><strong>战略层</strong>，实现产品目标，关注并考虑如何满足外部用户的业务需求，这是在设计用户体验过程中做出每一个决定的基础。产品目标：我们要通过这个产品得到什么。用户需求：我们的用户要通过这个产品得到什么。</li></ul><p>在进行用户体验分析时，还需要从用户角度去理解 &quot;<strong>交互组件将怎样工作</strong>&quot;。这时需要建立人们熟悉的概念模型，并审视软件使用方式与现实经验是否一致、交互方式在整个系统中是否保持一致。为了预防错误，像银行系统，用户能输入的东西很少，大部分是选择，即将系统设计成不容易或不可能犯错那种操作方式。如果出错，系统能帮助用户找出错误并改正它们，比如提示比较恰当、显著，并能给用户提供从错误中恢复的方式。</p><p>从系统结构看，有层级结构、矩阵结构、线性结构等，关键是结构要合理，无论是自上而下还是自下而上，逻辑要清晰，让用户可以更有效地操作。</p><p>除了这些要素之外，还有一些注意事项，比如：</p><ul><li>成功的界面设计，是能让用户一眼就能发现&quot;最重要的东西&quot;的，如通过对比把用户的注意力吸引到重要的部分；</li><li>帮助用户理解&quot;他们在哪里&quot;以及&quot;他们能去哪里&quot;、&quot;哪条路离目标更近&quot;，可借助图标、标签系统、排版、颜色等视觉指引；</li><li>每个操作步骤都是合理的，当前步骤是否自然地延续了上一个步骤中的任务；</li><li>过度设计也会导致视觉的混乱，差异要足够清晰，让用户能分辨出某个设计选择是特意要传达的，一致性能避免用户的困惑和焦虑；</li><li>一个产品的标准配色方案中所使用的色彩，是为了它们在一起工作而专门挑选出来的，它们之间是互补而不冲突的；</li><li>不要使用非常相似但又不完全一样的风格，也不要使用过于广泛和多样的风格，只有在你需要传达不同的信息时才使用不同的风格；</li><li>遵循&quot;使用用户语言&quot;并且&quot;保持一致性&quot;的命名原则，同时避免&quot;语义歧义或者不解&quot;；</li><li>提供的功能和内容越多，猜测就变得越不可靠，总有一部分用户会猜错的，好的产品经理会做减法。</li></ul><p>成为用户体验专家，不是简简单单的一万个小时的练习，而是一万个小时的刻意练习，比如持续不断地和用户交流，不断获得用户的反馈，获得感性和理性的双重认知。所以，能不能成为用户体验专家，不在于我讲多少内容，而是在于你自己的刻意练习。</p><p>这一讲就讲到这里，侧重讨论了用户思维和场景挖掘的重要性，并介绍了如何进行深度的业务和用户体验的分析。</p><p>最后，给你出一个练习题：针对拉勾教育App 进行用户体验分析，它哪些方面做得好，哪些方面需要进一步的改进？为什么？</p>',14);function m(T,A,C,S,P,f){const s=a("Image");return l(),_("div",null,[p,g,c,u,e(s,{alt:"1.png",src:"https://s0.lgstatic.com/i/image3/M01/05/C7/CgoCgV6ezXGAfW4vAAO9CBtc2xQ145.png"}),d,e(s,{alt:"2.png",src:"https://s0.lgstatic.com/i/image3/M01/05/C7/CgoCgV6ezcSAPYVjABSSrTqPY9k461.png"}),h,e(s,{alt:"3.png",src:"https://s0.lgstatic.com/i/image3/M01/12/F6/Ciqah16ezgaAMBkRAAFIIPoQDXs567.png"}),q])}const k=r(i,[["render",m]]);export{I as __pageData,k as default};
