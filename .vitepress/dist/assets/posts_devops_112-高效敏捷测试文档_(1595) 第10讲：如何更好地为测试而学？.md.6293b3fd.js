import{_ as n,j as a,o as r,g as p,k as s,Q as l,s as t,h as e}from"./chunks/framework.e0c66c3f.js";const L=JSON.parse('{"title":"思维训练 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(1595) 第10讲：如何更好地为测试而学？.md","filePath":"posts/devops/112-高效敏捷测试文档/(1595) 第10讲：如何更好地为测试而学？.md","lastUpdated":1696338709000}'),_={name:"posts/devops/112-高效敏捷测试文档/(1595) 第10讲：如何更好地为测试而学？.md"},i=l('<p>上一讲介绍了如何构建学习型组织，这一讲则从团队成员的个人角度来讨论如何加强测试方面的学习。</p><br><p>在讲解之前，我先考你一个简单的问题，来自于《塔木德》经，问： &quot;有两个男孩帮家里打扫烟囱。打扫完了，一个满脸乌黑地从烟囱里跑出来，另一个脸上一点煤灰都没有。那么，你认为哪一个男孩会去洗脸呢？&quot;</p><br><p>估计你能很快地给出正确的答案。再来一个难一点的题目：英语字母表的第一个字母是 A，B 的前面当然是 A。那么最后一个字母是什么？估计有人会答错。</p><h2 id="思维训练" tabindex="-1"><strong>思维训练</strong> <a class="header-anchor" href="#思维训练" aria-label="Permalink to &quot;**思维训练**&quot;">​</a></h2><p>这就是对你的一次思维训练，感觉如何？在前面第 3 讲我们曾经讲过敏捷测试思维方式（Mindset），这一讲我们仍然要先从思维开始说起，但这里侧重<strong>思维技能</strong> （Thinking Skills）的训练，人的思维能力是可以通过训练来提升的。思维训练的结果，可以让你具有更广阔的视野，对问题有更深层次的理解，找到更多或更好的解决问题的方法。</p><br><p>为了做好测试工作，我们需要具备哪些思维能力呢？我认为主要是：<strong>成长性思维</strong> 、<strong>系统性思维</strong> （结构化思维）、<strong>创造性思维</strong> （包含发散性思维、逆向思维等）、<strong>批判性思维</strong> 和<strong>用户思维</strong> 。成长性思维在第 3 讲已经讲过了，批判性思维和用户思维以后会讲到，这里侧重讲解系统性思维和创造性思维。</p><br>',10),c=t("p",null,"图1 以自我为中心的测试认知",-1),h=t("h3",{id:"系统性思维",tabindex:"-1"},[e("系统性思维 "),t("a",{class:"header-anchor",href:"#系统性思维","aria-label":'Permalink to "系统性思维"'},"​")],-1),d=t("p",null,"我们对软件测试的认识一般来自于日常工作，是以自我为中心的，所以这种认知难免是片面的、零散、混乱的，如图 1 所示。而系统性思维能帮助你打破这种对测试的认知方式，让你能够了解软件测试的概貌和整体结构，它还可以帮你整体地、多角度、多层次地分析测试对象及其测试范围、测试风险等，制定有效的测试策略，选择更合适的测试方法。",-1),u=t("br",null,null,-1),g=t("p",null,"结构化思维也属于系统性思维。从系统的构成来看，一个系统一定可以分解成若干个单元，而它们也一定是结构化的、具有层次的。作为敏捷测试人员，如果你需要完成一个复杂的被测系统的测试计划或业务级别的测试任务，可以运用结构化的思维，把一个大的被测系统分解成不同模块和子系统，各个击破。例如，为每个模块设计不同类型的测试，采用不同的测试方法、选择不同的测试工具。",-1),b=t("br",null,null,-1),m=t("p",null,"图2 我对测试的认知 - 软件测试全景高清图",-1),A=t("br",null,null,-1),q=t("p",null,'有人说我绘制的"软件测试全景图（图 2，高清图）"是系统性思维的最佳呈现，因为它全面系统地展示了什么是软件测试，也代表了我对软件测试的看法。',-1),T=t("h3",{id:"创造性思维",tabindex:"-1"},[e("创造性思维 "),t("a",{class:"header-anchor",href:"#创造性思维","aria-label":'Permalink to "创造性思维"'},"​")],-1),C=t("p",null,'在软件测试分析和设计中，我们需要借助发散性思维挖掘更多的测试点或应用场景，识别出更多的测试风险。在工作中你可以和同事一起采用"头脑风暴"的方式进行测试分析和设计，刺激大家打破惯有的思路，跳出原有的思维框框，畅所欲言，这对每个人的发散性思维是一个很好的激发和训练。',-1),f=t("br",null,null,-1),P=t("p",null,"我们可以用发散性思维给现在比较火的视频会议移动端 App 设计临界点测试。图3 就是以思维导图的形式给出了一些测试点，你可以想想还有哪些临界点值得考虑？",-1),x=t("br",null,null,-1),k=t("p",null,"图3 视频会议 App 临界测试的测试范围",-1),B=t("br",null,null,-1),M=t("p",null,"我们在测试中也常用到逆向思维，借助逆向思维发现更多的异常操作、异常数据，设计出更多的负面测试用例， 大多数做测试的都具备这种测试思维，开发人员往往是正向思维去构建系统。发散思维鼓励我们往不同的方向去思考问题，逆向思维鼓励我们往反方向去思考问题，往往能找到真正的问题。",-1),I=t("br",null,null,-1),N=t("p",null,"一个有效的运用逆向思维的策略是，在讨论问题的时候，注意大家都关注的点或方向，然后逆向看，朝着完全不同的方向去思考。这样的例子很多，比如操作对了会呈现这样的结果，但我们应该想到，如果用户操作错了，会怎样？这个地方让我输入数字，如果我不输入数字，又会如何？在手机 App 上开视频会议，需要用到手机自带的相机和麦克风，那么你可以在会议启动前，或者在会议中关闭相机和麦克风的使用权限，在这样的场景下测试手机 App 会表现如何。",-1),S=t("br",null,null,-1),v=t("p",null,'更详细的讲解，可以到我的个人公众号"软件质量报道"里，找出我之前写的这类文章来学习。看文章还不够的话，推荐下面几本书，这样更能系统的学习和反复练习。思维能力的提升，不仅对测试的学习和工作有帮助，我相信在很多方面你都会受益。',-1),V=t("br",null,null,-1),J=t("p",null,"图4 推荐的几本书",-1),D=t("h2",{id:"专业训练",tabindex:"-1"},[t("strong",null,"专业训练"),e(),t("a",{class:"header-anchor",href:"#专业训练","aria-label":'Permalink to "**专业训练**"'},"​")],-1),E=t("p",null,"接下来我们讨论测试方面的专业训练。我曾经给过一个针对个人的软件测试能力模型，现在又把这个模型进行了一次更新，如图 5 所示。它包括 4 个模块：测试的基本能力、业务测试能力、测试开发能力和测试技术管理能力。下面挑出对敏捷测试人员重要的三项技能讲一讲。",-1),O=t("br",null,null,-1),G=l('<p>图5 软件测试能力模型</p><h3 id="测试自动化" tabindex="-1">测试自动化 <a class="header-anchor" href="#测试自动化" aria-label="Permalink to &quot;测试自动化&quot;">​</a></h3><p>有人说，你可以不懂测试，但是不能不懂测试自动化，这话肯定不对，但多少说出了当前的行业现实：重测试开发、轻手工测试。不过在敏捷测试里，测试自动化确实很重要，是实现持续交付的基础，所以对于测试人员的自动化技能要求很高。测试自动化能力的培养主要靠自己多练习、多实践，循序渐进。</p><br><p>例如，可以先学会搭建和使用测试工具，学习用 Python、Java 等语言编写测试脚本，再学习测试工具和测试框架的开发和优化，以及完成自动化测试和持续集成环境的集成。如果带团队，还需要负责制定和实施整个团队的自动化测试策略。</p><h3 id="测试建模" tabindex="-1">测试建模 <a class="header-anchor" href="#测试建模" aria-label="Permalink to &quot;测试建模&quot;">​</a></h3><p>学会测试建模就是掌握了一种高级的测试分析 / 设计能力，学习它可以从以下两个方面入手。</p><br><p><strong>基于模型的测试</strong> （Model Based Test）：是测试需求分析和测试设计的建模，把业务需求通过模型抽象为测试需求，进而转化成可执行的测试用例。MBT 也不是特别高深，像因果图、分类树、业务流程图等都可以理解为测试建模。比较专业的测试建模方法，主要包括基于事件流建模、基于有限状态机建模和形式化方法来建模。</p><br><p><strong>测试自动化建模</strong> ：这可以看成是上一步的延伸，先根据测试需求来完成上述测试建模，再实现自动生成测试数据、测试脚本等功能。平常所说的测试自动化并不是真正的自动化，只能算&quot;半自动化测试&quot;，因为测试脚本需要工程师手工编写，只有测试执行是自动的。有一些 MBT 工具，比如微软开发的 Spec Explorer，可以实现测试自动化脚本的生成和执行，相当于集成了自动化测试框架，从而实现更彻底的测试自动化。</p><br><p>如果更广义地看测试建模，也包括测试过程建模，如比较熟悉的 W 模型、TMap 模型等，在第 4 讲中也给出了敏捷测试过程模型，你也可以基于这个敏捷测试过程模型，构建更适合自己的，这更能加深你对敏捷测试的理解，并能更好地实施和改进敏捷测试。</p><h3 id="探索式测试" tabindex="-1">探索式测试 <a class="header-anchor" href="#探索式测试" aria-label="Permalink to &quot;探索式测试&quot;">​</a></h3><p>在传统的软件测试里可以经常使用，但它符合敏捷测试价值观和敏捷测试原则，在敏捷测试中更能发挥作用，因为探索式测试更关注人，关注产品本身，有更多的沟通，更强调不断学习、持续反馈和持续优化，非常符合持续交付的需求，因此已成为敏捷测试人员必备的专业技能，我在后面还会详细讲解。</p><h2 id="阅读博客与走出去参加会议、沙龙" tabindex="-1"><strong>阅读博客与走出去参加会议、沙龙</strong> <a class="header-anchor" href="#阅读博客与走出去参加会议、沙龙" aria-label="Permalink to &quot;**阅读博客与走出去参加会议、沙龙**&quot;">​</a></h2><p>在国外，很多人习惯用博客进行交流，你可以在里面得到很多信息，包括发表的文章、在线课程安排及活动通知。我有总结和分享的习惯，曾经在 2013 年 CSDN 的博客里发表了一篇文章，总结了&quot;软件测试 Top 120 Blog&quot;，到目前阅读量已经两万多了。</p><br><p>这里我重点推荐几个敏捷测试相关的博客。</p><ul><li><p>Michael Bolton 的博客：Michael 和 James Bach 共同开发了快速软件测试的测试方法，他的博客主要介绍了上下文驱动、探索式测试等内容。</p></li><li><p>James Bach 的博客：主要也介绍了上下文驱动、探索式测试等内容。</p></li><li><p>Lisa Crispin 的博客：第 5 讲讨论的两本敏捷测试作者之一，有关敏捷测试的内容比较多。</p></li><li><p>Lisa 和 Janet Gregory 还有一个关于敏捷测试的共同博客，我就是在这里找到了她们对敏捷测试的定义。</p></li><li><p>Alan Page 的博客：Alan 是《微软软件测试之道》的主要作者，和 Brent Jensen 共同提出了现代测试的七个原则。</p></li></ul><br><p>另外一种比较重要的学习方式就是走出去参加各种相关的沙龙、会议，线下、线上的都可以，这样可以结识更多的测试同行及相关领域的专家，及时了解他们都在研究什么方向。不仅可以参加测试相关的，还可以参加讨论软件质量、敏捷开发、持续交付及 DevOps 相关的。</p><br><p>最后，我们来公布刚开始讨论的那两道题的答案。</p><br><p>第一个故事：两个男孩一起打扫同一个烟囱，不可能出现一个脸干净、另一个脸脏的情况，这个完整的故事建议你抽空找来读一下，对批判性思维会有更深的理解。</p><p>另外一个难点的题目是测试一下你的发散性思维，字母表的英文是 Alphabet，那么最后一个字母当然是 t 了。</p><br><p>最后，给你出一道思考题：你对自己的职业发展有清晰的目标吗？可否在留言中写 1~3 条目标？事后，可以结合自己的目标，做一个为期一年的学习计划，到时欢迎去我们的敏捷测试微信群内分享。</p>',29);function $(j,F,Q,U,w,y){const o=a("Image");return r(),p("div",null,[i,s(o,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/70/C8/Cgq2xl5ln_-AA43mAAG2GJB4Ye8855.png"}),c,h,d,u,g,b,s(o,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/70/C8/CgpOIF5loBWAU0THAB8vtGiwAUI444.png"}),m,A,q,T,C,f,P,x,s(o,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/70/C9/Cgq2xl5loCqAN5xcAAHVgI2c4-s580.png"}),k,B,M,I,N,S,v,V,s(o,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/70/C8/CgpOIF5loDuAcQqbAANP4rEjwk0245.png"}),J,D,E,O,s(o,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/70/C8/CgpOIF5loEeANzrjAAofkuJ0dZQ432.png"}),G])}const R=n(_,[["render",$]]);export{L as __pageData,R as default};
