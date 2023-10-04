import{_ as s,j as o,o as _,g as n,k as t,s as l,h as a,Q as e}from"./chunks/framework.e0c66c3f.js";const I=JSON.parse('{"title":"需求不清楚 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(1613) 第28讲：敏捷测试风险在哪里？.md","filePath":"posts/devops/112-高效敏捷测试文档/(1613) 第28讲：敏捷测试风险在哪里？.md","lastUpdated":1696338709000}'),r={name:"posts/devops/112-高效敏捷测试文档/(1613) 第28讲：敏捷测试风险在哪里？.md"},p=l("p",null,"测试分析的一个重要任务是识别测试风险并在测试策略中做出应对。通常情况下，不论采用什么方法和技术，测试都是不彻底的：",-1),c=l("ul",null,[l("li",null,"测试是不可能穷尽的，测试不能做到业务、数据、代码路径等全方位的百分之百覆盖；"),l("li",null,"测试的时间及其有限，没有足够的时间完成所需的测试，这一点在敏捷测试中尤其突出。")],-1),h=l("p",null,[a("因此我们不能保证经过测试的、交付出去的软件版本不存在任何缺陷，这些都意味着软件测试总是有风险的，"),l("strong",null,"基于风险的测试策略是不可或缺的"),a(" 。所以，"),l("strong",null,"软件测试风险分析和控制非常重要"),a("。软件测试风险侧重于产品质量风险，即造成测试的深度或广度不够，从而导致遗漏缺陷。测试风险管理包括测试风险的识别、分析和控制，如图 1 所示。")],-1),d=l("p",null,"相比传统的软件测试，以及我们处在 VUCA 时代，敏捷测试要面临更大的挑战，测试风险主要来自四个方面：需求不清楚、需求频繁变更、时间压力及自动化测试的有效性。",-1),u=l("h4",{id:"需求不清楚",tabindex:"-1"},[a("需求不清楚 "),l("a",{class:"header-anchor",href:"#需求不清楚","aria-label":'Permalink to "需求不清楚"'},"​")],-1),g=l("p",null,"在本专栏的第 4 部分，我一直在强调产品需求分析过程的重要性，也介绍了很多适合敏捷模式的工具以及优秀实践，以实现需求从产品价值、商业目标到实例化需求的落地过程，如图 2 所示。",-1),m=e('<p>如果你的团队这样去做或者在进行类似的优秀实践时，那么需求问题带来的测试风险自然会在很大程度上降低。<strong>但现实距离理想总是有很大的差距。</strong></p><p>敏捷项目周期短，留给团队沟通和澄清需求的时间少，造成需求不清楚的原因跟项目的复杂程度、人员素质和经验、团队沟通和协作，以及流程都有关系。比如常见的一些问题：</p><ul><li>敏捷团队在需求沟通、协作和管理方面做得不好，整体对于业务需求的理解有偏差，包括为什么做、为谁做、做什么等，下列这些情况都属于需求不清楚，如需求不完整、需求比用户实际需要的多、需求定义有错误，团队成员理解不一致，或者优先级定义有误等；</li><li>或者，负责软件测试的人员没有充分参与到需求的沟通和协作过程中，对需求不了解；</li><li>还有，用户故事中没有定义清晰的验收标准。</li></ul><p>需求不清楚造成的测试风险还是很严重的，在设计合理性和 Bug 确认方面造成困难，有很大可能会漏掉真正对客户有重大影响的缺陷，如果因为需求错误而导致产品的某些功能特性需要重新设计和实现，则测试相关的活动也要返工，进而造成巨大的浪费和对项目进度的巨大影响。</p><h4 id="需求频繁变更" tabindex="-1">需求频繁变更 <a class="header-anchor" href="#需求频繁变更" aria-label="Permalink to &quot;需求频繁变更&quot;">​</a></h4><p>相对传统的开发模式来说，敏捷开发在应对需求变更方面有很大优势，采取迭代开发的方式，每次交付小批量的功能特性。Scrum 模式下每次迭代持续 2 ~ 4 周，在每次迭代开始之前都有机会重新澄清、变更需求，或者调整需求的优先级。但尽管如此，需求频繁变更引起的测试风险也比较常见。和需求变更相关的一些常见的风险：</p><ul><li>在开发过程中紧急增加新的用户需求，需要变更用户故事列表和优先级；</li><li>线上版本发现重大缺陷需要立刻修复，由于研发团队人手不够，需要重新讨论待办事项的优先级；</li><li>测试人员没有参与需求变更的讨论和沟通，测试执行相关的测试用例失败才发现原来需求更改了；</li><li>开发人员在实现用户故事时，发现原来定义的用户场景不合理或者和已实现的其他功能有冲突，擅自更改了用户场景但没有通知测试人员。</li></ul><p>需求是开发和测试的源头，需求变更自然会导致测试计划、测试设计和工作量的变化，从而给项目进度或者产品质量带来风险。</p><h4 id="时间太紧" tabindex="-1">时间太紧 <a class="header-anchor" href="#时间太紧" aria-label="Permalink to &quot;时间太紧&quot;">​</a></h4><p>敏捷项目时间紧，很多人认为软件测试是敏捷开发的主要瓶颈之一。软件测试确实也有很多方面需要持续改进以适应敏捷的需求，比如通过提高测试自动化水平、测试左移等实践让测试做得更快；但是另一方面，在敏捷开发流程中考虑测试比较少，制定流程的人大多不懂测试，认为测试比较简单或者任何测试都可以用自动化的方式来完成，为什么做得那么慢？因此留给测试的时间就少之又少。</p><p>软件测试在一个迭代里既要完成用户故事的验收测试，又要编写自动化测试脚本，还要为下一次迭代的测试做准备，并且需要参加需求评审、设计评审等活动。时间紧、任务重，如果再加上人手不够、测试任务安排不合理、自动化测试程度低等因素，在测试范围和测试深度上肯定会大打折扣，从而影响软件的交付质量。</p><h4 id="自动化测试有效性" tabindex="-1">自动化测试有效性 <a class="header-anchor" href="#自动化测试有效性" aria-label="Permalink to &quot;自动化测试有效性&quot;">​</a></h4><p>自动化测试的有效性，和研发团队想通过自动化测试达到什么目的有关。不过在敏捷测试里，自动化测试的目的比较明确：缩短测试反馈周期，提高持续交付高质量软件的能力。自动化测试有效性方面的挑战主要包括以下几点。</p><ul><li>高度的测试自动化目前来看还比较理想，落地实施面临着很大挑战。研发团队的自动化水平普遍比较低，根据调查数据显示，只有 4% 的团队自动化测试率超过了 90%。</li><li>很多团队没有遵循自动化测试金字塔进行合理的分层测试。单元测试覆盖率低，测试自动化还集中在 UI 层。自动化测试发现缺陷的能力比较弱，大部分缺陷还要靠手工测试来发现。</li><li>软件测试基础设施建设比较薄弱，没有实现测试自动化和 CI/CD 环境的集成，也没有使用 Cloud 和容器技术，大量时间花费在测试环境的部署和维护上面。</li><li>测试用例集缺乏维护，很多测试脚本在新的软件版本上可能已经失效了，但是没有进行及时的删除或更新，导致自动化测试不能发现有效的缺陷。</li><li>自动化测试执行时间过长，提供反馈的速度比较慢。对于大型复杂的软件系统，随着新的功能特性的增加，自动化回归测试的用例集越来越庞大，执行一次全回归测试的时间也越来越长。</li></ul><p>自动化测试水平低、发现的缺陷少，手工测试的工作量降不下来，那么测试也就快不起来。要想快，只能减少测试范围，但这样会增加质量风险。</p><h4 id="测试风险识别-checklist" tabindex="-1">测试风险识别 Checklist <a class="header-anchor" href="#测试风险识别-checklist" aria-label="Permalink to &quot;测试风险识别 Checklist&quot;">​</a></h4><p>风险识别的有效办法是建立风险项目检查表，按风险内容进行逐项检查，逐个确认。对于测试的风险，可以给出如表 1 所示的风险项目检查表。</p>',17),A=l("h4",{id:"风险防范-缓解和处理",tabindex:"-1"},[a("风险防范：缓解和处理 "),l("a",{class:"header-anchor",href:"#风险防范-缓解和处理","aria-label":'Permalink to "风险防范：缓解和处理"'},"​")],-1),C=l("p",null,"在测试风险分析中，逐项检查，确认风险之后，要找出对策，以避免风险产生或降低风险所带来的影响。表 2 给出了敏捷测试中常见的风险，这些风险发生的可能性、对测试的影响和影响程度以及如何进行预防和控制。",-1),k=e("<p>测试风险的控制方法如下：</p><ul><li>根据风险发生的概率和带来的影响确定风险的优先级，然后采取措施避免哪些可以避免的风险，假如测试环境不对，可以事先列出要检查的所有条目，在测试环境设置好后，由其他人员针对所列出条目进行逐条检查。</li><li>转移风险，有效风险带来的后果可能非常严重，能否通过一些方法，将它转化为其他一些不会引起严重后果的低风险，假如产品在发布前发现了某个不是很重要的新功能给原有的功能带来了一个严重的 bug，此时处理这个 bug 所带来的风险就很大，对策是去掉那个新功能，转移这种风险；</li><li>有些风险不可避免，就设法降低风险，比如&quot;程序中未发现的缺陷&quot;这种风险总是存在，就要通过提高测试用例的覆盖率来降低这种风险；</li><li>为了避免、转移或降低风险，事先要做好风险管理计划，例如，把一些环节或边界上有变化、难以控制的因素列入风险管理计划中；</li><li>对风险的处理还要制定一些应急的、有效的处理方案，例如，为每个关键性技术人员培养后备人员，做好人员流动的准备；</li><li>在做计划时，估算资源、时间、预算等要留有余地，不要用到 100%。</li></ul><p>今天的课到这里就结束了，我来总结一下：</p><ul><li>测试风险管理包括测试风险的识别、分析和控制；</li><li>敏捷测试的风险主要来自四个方面，即需求不清楚、需求频繁变更、时间压力，以及自动化测试的有效性；</li><li>识别测试风险的有效办法是建立测试风险项目检查表，按风险内容进行逐项检查，逐个确认对于测试的风险；</li><li>在测试风险分析中，逐项检查，确认风险之后，要找出对策，尽可能地避免风险产生或降低风险所带来的影响。</li></ul><p>最后留一个思考题：你认为敏捷测试中还有哪些主要风险，如何避免、转移或降低这些风险？</p>",5);function f(T,b,q,P,S,V){const i=o("Image");return _(),n("div",null,[p,c,h,t(i,{alt:"1.png",src:"https://s0.lgstatic.com/i/image3/M01/07/47/CgoCgV6hWQKAX1GsAAFF7PrToak113.png"}),d,u,g,t(i,{alt:"2.png",src:"https://s0.lgstatic.com/i/image3/M01/14/76/Ciqah16hWQuAJfzlAAICBydpveU705.png"}),m,t(i,{alt:"3.png",src:"https://s0.lgstatic.com/i/image3/M01/14/79/Ciqah16hW8WASrOrAAai1hMYjWg435.png"}),A,C,t(i,{alt:"4.png",src:"https://s0.lgstatic.com/i/image3/M01/14/79/Ciqah16hW-CAEaMSAAekeTALVkI817.png"}),k])}const v=s(r,[["render",f]]);export{I as __pageData,v as default};
