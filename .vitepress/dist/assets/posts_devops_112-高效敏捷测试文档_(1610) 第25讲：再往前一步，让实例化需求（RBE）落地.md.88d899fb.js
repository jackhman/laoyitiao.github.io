import{_,j as i,o as e,g as p,k as s,h as o,Q as n,s as l}from"./chunks/framework.e0c66c3f.js";const il=JSON.parse('{"title":"实例化需求的过程 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(1610) 第25讲：再往前一步，让实例化需求（RBE）落地.md","filePath":"posts/devops/112-高效敏捷测试文档/(1610) 第25讲：再往前一步，让实例化需求（RBE）落地.md","lastUpdated":1696338709000}'),c={name:"posts/devops/112-高效敏捷测试文档/(1610) 第25讲：再往前一步，让实例化需求（RBE）落地.md"},r=n("<p><strong>什么是实例化需求</strong></p><p>ATDD 是 TDD 思想在需求层的实现，而 BDD 可以看做是 ATDD 的实例化，将验收标准归为场景，并用 GWT 格式描述。而实例化需求则是在 BDD 的基础上再往前进了一步，真正让需求成为测试，因为 BDD 中的场景还不能执行，必须转化为具体的实例才能执行。实例化需求真正将需求和测试合二为一，彻底践行&quot;测试驱动开发&quot;的理念。</p><br><p>实例化需求是一组方法，它试图通过具体的实例来描述用户的需求或计算机系统的功能和行为，使业务人员、产品、开发和测试等不同的利益相关者对需求有相同的理解，从而帮助团队交付正确的软件产品，看起来和上一讲讨论的 BDD 没有本质的区别。</p><br><p>如果觉得这个比较抽象，那就让我们一起来浏览下面这个对话，从而体会如何一步一步逼近实例化需求。这个对话的背景是：你在和产品或业务人员讨论需求，然后你问：</p><ul><li><p>这是什么样的需求？（这是了解要解决的问题，一般通过功能特性来解决。）</p></li><li><p>进一步问，用户会怎么使用？（这是了解用户行为，可以用之前讨论的 Epic/ 用户故事来描述。）</p></li><li><p>再进一步问，如果这样...，结果会这样？（已经提出了某种具体的应用场景，在这种具体的场景下，会发生什么新的情况？即到了 BDD 应用的场景。）</p></li><li><p>&quot;再例如... ? &quot;，你举出具体的例子，就来到了这里所讨论的&quot;实例化需求&quot;。</p></li></ul><br>",8),a=l("p",null,"图1 需求沟通过程是不断澄清的过程",-1),u=l("br",null,null,-1),d=l("p",null,'我们还是以在线教育 App 的"课程分销"相关的用户故事为例，来讨论需求的实例化。"课程分销"下面有"收益详情"、"现金提成"等用户故事。例如，"收益详情"可以这样描述：',-1),h=l("br",null,null,-1),g=l("br",null,null,-1),A=l("p",null,'而"现金提成"有一条规则，每次提现金额不低于 2 元，而且必须是真实名字，那么其实例化可以描述如下：',-1),m=l("br",null,null,-1),b=l("br",null,null,-1),D=l("p",null,"需求实例化可通过例子来澄清需求，而这些例子也就成为了验证这个需求的测试用例，这可以从上面两张表得到证实，如图 2 所示，所以借助实例化需求，业务（产品）、开发和测试在需求理解上达成共识，没有分歧，从而有利于后续的开发和测试。",-1),C=l("ul",null,[l("li",null,[l("p",null,"基于这个澄清的需求，开发人员去做系统的设计、编程；")]),l("li",null,[l("p",null,"基于这个澄清的需求，测试人员可以直接开发自动化测试脚本。")])],-1),T=l("br",null,null,-1),B=l("p",null,"而且例子总是明确的、完整的和真实的，易于理解。",-1),q=l("br",null,null,-1),I=l("p",null,"图2 需求实例化的作用",-1),E=l("h3",{id:"实例化需求的过程",tabindex:"-1"},[l("strong",null,"实例化需求的过程"),o(),l("a",{class:"header-anchor",href:"#实例化需求的过程","aria-label":'Permalink to "**实例化需求的过程**"'},"​")],-1),M=l("p",null,'清楚了"实例化需求"概念之后，那么如何实现一个需求实例化的过程呢？可以用一张图来描述，如图 3 所示，这个过程从业务目标出发，经过 7 个步骤，最终将业务需求转换为活文档------可执行的测试（自动化脚本），下面就说说这 7 个步骤。',-1),V=l("br",null,null,-1),Y=n("<p>图3 需求实例化的过程</p><br><p>（1）<strong>从业务目标导出范围</strong>，也就是从用户的业务目标开始，团队充分地和客户沟通，挖掘用户的真实需求或要解决的问题，确定可以实现目标的范围。这里要注意：不能交由客户去编写用户故事、用例清单等细节，否则就等同于让客户去提供一个具体的、高层次的解决方案了。划分问题域、讲好用户故事，是开发团队的责任，包括问好下面两个问题：</p><ul><li><p><strong>为什么这东西有用？</strong> 通过提问，引导客户用具体的事例，来回答为什么某个功能有用？是如何给他的业务带来帮助的？</p></li><li><p><strong>有什么可替代的方案？</strong> 通过寻找可替代的方案，来帮助客户从另一个角度去思考和认识自己的业务目标，同时也给团队的实现提供新的思路、决定当前提议的是否已经是最佳方案。</p></li></ul><br>",5),f=l("p",null,"图4 从业务目标导出范围的过程",-1),P=l("p",null,"这个过程，也是一个不断分解、细化的过程，从 Why 开始到 Who、How、What 的过程（简记为 WWHW 过程），涉及产品定位、产品特性、功能设置、Epic 和用户故事之间的映射，以及最终交付哪些价值给用户。",-1),S=l("br",null,null,-1),x=n("<p>图5 从业务目标导出范围的 WWHW 过程</p><br><p>（2）<strong>明确协作中各自的角色</strong>。需求实例化过程就是项目干系人协作的过程中，不仅让需求更加规范、明确，而且在需求实例化过程中，让产品、设计、开发和测试人员都参与进来，发挥各个角色的特长，从不同的角度来审视需求，尽量减少单个角色认知的局限性所带来的问题。</p><br><p>而之前，就软件需求说明（Specification）往往没达成一致，开发人员看到的是一堆的需求，而测试人员看到的是一堆的测试用例，开发和测试各行其是。若由开发人员撰写需求说明，它可能会因为过于贴近模型设计而充斥大量的模式、架构元素，反而变得难以理解；若由测试人员独立撰写时，可能会因为太过琐碎零散而变得难以维护，最终迷失在各种测试的细节之中，没办法用于双方的沟通，这样更无法帮助开发人员去组织整个系统的各个部分，也无法通过自动化测试驱动整个开发过程。</p><br><p>由于这些测试都不支持自动化测试，或者不容易被其他人理解。因此，协作是必须的，而且需要更广的、具体的协作，在协作的过程中需要项目干系人共同建立起项目的领域模型（比如系统的工作流、活动图、业务流程图等），但不讨论技术细节、UI 界面等，并在讨论中要严格遵循领域模型，这样能确保大家对于术语和概念的认知是一致的，讨论是在共同的语境中进行。在构建领域模型时，不仅关注系统间的调用关系，也要识别出系统间的数据传递，识别的越明确，对于后续举例越有帮助。</p><br><p>（3）<strong>举例说明</strong>是需求实例化的关键环节，因为团队中不同角色的背景、知识和经验等都不同，对系统功能特性的理解也往往不尽相同，所以通过举例说明的方式可以让目标更一致。而且只有当场景描述具有很强的带入感时，才能激发客户参与讨论的热情，才能更容易达成共识，并发掘潜在的概念和需求。举例说明的方式，对于共同认识和理解某个场景是非常有益的，避免产生误解，正如前面所说：例子总是明确的、完整的和真实的，而且是易于理解的。但例子是为需求服务的，所以应围绕用户和系统之间（业务上）的交互来举例说明，而不是关注系统本身的处理流程。</p><br><p>（4）<strong>提炼需求说明</strong>。虽然通过举例说明，需求看起来已经是明确的、具体而真实的，不同角色的人们就需求达成了共识，但前面讨论的过程可以看做是头脑风暴的过程、发散的过程、分解的过程，得到的实例往往比较散，而且包含很多不必要的细节。原始的例子就像未经雕琢的钻石，只有提炼后才是关键的、易理解的、方便转换为可执行（自动化测试）的关键实例（Key Example）。我记得早期写 MRD 需求文档时，也会给出用例，但也无须给出全部用例，而是典型的用例。所以，这里强调需求实例的精简，提炼出关键的实例，但这些关键实例也还需要具备一定的完整性，足以说明业务。这些提炼好的实例本身未来就是产品交付的验收条件，即满足：</p><ul><li><p>是专注的、明确的、自解释的、不言自明的和可测试的；</p></li><li><p>是具备领域意义的、真实的互动，而不是简单的脚本；</p></li><li><p>是业务功能相关的，而不仅仅是软件设计意义上的结果；</p></li><li><p>不要与代码、与 UI 等技术实现细节耦合太紧。</p></li></ul><br>",13),k=l("p",null,"图6 提炼的五个需求说明",-1),N=l("br",null,null,-1),W=l("p",null,'（5）**不改变需求而实现自动验证。**要做到这点，需要引入 Mock 技术进行测试、隔离 UI 与业务模型、进行持久化无关的设计、建立统一的应用服务层、在需求说明中尽量避免引入 UI 与存储相关的元素等，这些都是可行的方案。同时，自动验证可用上一讲介绍的基于 BDD 的自动化测试框架，比如 Cucumber、Robot Framework、Behave、Ginkgo、Gauge 等，选择适合自己的工具来实现验证。借助这些工具，只验证系统做的事对不对，而不需要验证系统是怎么做的（这些用例可以在后续自动化测试用例中，而不是在实例化需求验证中），尽量减少测试用例，这和上面"提炼需求说明"是一致的。',-1),v=l("br",null,null,-1),R=l("p",null,"（6）**频繁验证。**这就是本专栏一直倡导的持续集成和持续测试，要做到这点，就必须实现更彻底的自动化，从需求开始实现自动化测试，而且如前面所说，只验证系统做的事对不对，尽量减少测试用例数。而在传统的开发模式下，详尽的需求说明书往往跟不上开发中实际的需求变更，从而导致需求文档和代码之间不同步，研发人员只信任他们的代码，测试人员只信任他们的测试用例，两者又往往分离，导致开发人员和测试人员之间常常发生冲突。现在，需求成为测试，开发人员和测试人员共享相同的测试需求说明，而且可以被频繁验证，以确保需求说明和代码是同步的。如果没有同步，能够及时发现它们之间的差异性，及时修改。这时，开发人员和测试人员对需求也更有信心了，不再只是信任代码。",-1),H=l("br",null,null,-1),U=l("p",null,"图7 频繁的验证需要测试工具支持",-1),F=l("br",null,null,-1),O=l("p",null,[o("（7）"),l("strong",null,"演变成一个文档系统"),o('------需求成了活文档，即基于规范的实例化需求说明和上述图 7 中的工具支持，需求说明就成为组织良好的、规范的、可执行的测试（活文档）。这个可以这么理解，和传统软件开发相反。传统软件开发是基于需求文档开发的自动化测试脚本，现在需求实例化中，是基于自动化测试脚本抽取相关的内容，自动生成 HTML/PDF 格式的需求文本。而且也不需要维护，需要时就生成，所以任何时候，需求文档也不是支离破碎的，可以生成完整的，而且是最新的版本，是"鲜活的"的文档。')],-1),$=l("br",null,null,-1),y=l("p",null,"图8 同时支持需求及其验证的活文档",-1),G=l("br",null,null,-1),L=l("p",null,"这一讲的内容就到这里了，主要讲解了什么是实例化需求，以及如何从业务目标出发，经过 7 个步骤，最终将业务需求转换为活文档。关于具体的内容，你也可以参考市面上唯一一本这方面的图书《实例化需求：团队如何交付正确的软件》。",-1),X=l("br",null,null,-1),j=l("p",null,"最后，给你出一个思考题，如果推行实例化需求，什么样的项目更合适推广？可能会遇到的挑战是什么？欢迎留言讨论。",-1),w=l("br",null,null,-1),K=l("p",null,"到这里，第 4 部分的内容就讲完了，也就意味着本专栏第 4 部分《测试左移更体现敏捷测试的价值》告一段落，关键还是靠你在实际的项目中关注可测试性，实实在在做好需求/设计评审，大力推行 ATDD、BDD 和需求实例化，彻底实现自动化测试。",-1),Q=l("br",null,null,-1),Z=l("p",null,'下一讲将启动第 5 部分"敏捷测试分析与计划"，回归到测试自身的核心内容，我将先带你学习第 26 讲"基于上下文驱动思维的测试分析"。',-1);function z(J,ll,tl,sl,ol,nl){const t=i("Image");return e(),p("div",null,[r,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/89/DB/Cgq2xl6Ydl2AXPakAAMl8dgqu1o075.png"}),a,u,d,h,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/96/CgoCgV6Ydl2Ad1IeAADNOkkr3IU046.png"}),g,A,m,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/10/C5/Ciqah16Ydl2AZEI9AAD2qClMiTo612.png"}),b,D,C,T,B,q,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/10/C5/Ciqah16Ydl6AB-YBAAEvLxfQeVs005.png"}),o(),I,E,M,V,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/10/C5/Ciqah16Ydl-AN2C8AAh0-4H59yY719.png"}),o(),Y,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/96/CgoCgV6Ydl-ACgzfAAFqpT0lDH8874.png"}),o(),f,P,S,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/89/DB/Cgq2xl6Ydl-AI9bbAAXFCH9gZ90776.png"}),o(),x,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/10/C5/Ciqah16YdmCAct96AAFYO_iL4T8655.png"}),o(),k,N,W,v,R,H,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/03/96/CgoCgV6YdmCAOdB7AAPmgh-cEb0192.png"}),o(),U,F,O,$,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/89/DB/Cgq2xl6YdmCAExCjAADbXKrgvB0677.png"}),o(),y,G,L,X,j,w,K,Q,Z])}const el=_(c,[["render",z]]);export{il as __pageData,el as default};
