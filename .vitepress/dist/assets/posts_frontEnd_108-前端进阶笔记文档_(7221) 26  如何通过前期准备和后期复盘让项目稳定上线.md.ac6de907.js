import{_ as t,j as e,o as _,g as o,k as l,Q as i,s as a}from"./chunks/framework.4e7d56ce.js";const C=JSON.parse('{"title":"事前 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/108-前端进阶笔记文档/(7221) 26  如何通过前期准备和后期复盘让项目稳定上线.md","filePath":"posts/frontEnd/108-前端进阶笔记文档/(7221) 26  如何通过前期准备和后期复盘让项目稳定上线.md","lastUpdated":1696417798000}'),s={name:"posts/frontEnd/108-前端进阶笔记文档/(7221) 26  如何通过前期准备和后期复盘让项目稳定上线.md"},n=i('<p>课程快接近尾声了，前面我也跟大家介绍了很多技术选型、从 0 开始建设前端项目的经验。今天，我想再跟大家聊一聊关于项目管理和项目复盘这件事情。</p><p>日常工作中，我们常常会以项目的形式参与到具体的开发中，可能会负责项目的主导，或是作为核心开发负责某个模块、某个技术方案的落地。</p><p>很多人会觉得做一个普通的前端项目，从开发到上线都没什么难度。一个字：&quot;干&quot;就完了。</p><p>实际上，项目的管理、推动和落地是工作中不可或缺的能力，这不同于技术方案设计、代码编写，这属于工作中的软技能。但正是这样的软技能会对我们的工作成果产生很大影响，也会影响自身的成长速度，更是升职加薪的必备技能。</p><p>在项目进行的每个阶段，我们都可以通过同样的方式去提升自己：预期→结果→复盘。我们来分别看下。</p><h3 id="事前" tabindex="-1">事前 <a class="header-anchor" href="#事前" aria-label="Permalink to &quot;事前&quot;">​</a></h3><p>就像在开发前进行架构设计一样重要，我们在项目开始前，需要对项目的整个过程进行初步的预估，包括：</p><ol><li><p>预期功能是否能实现？存在哪些不确定的功能？</p></li><li><p>预计的工作量和分工排期是怎样的？</p></li><li><p>每个阶段（开发、联调、产品体验、提测、发布）的时间点大概是怎样的？</p></li><li><p>哪些工作涉及外部资源的依赖和对接（交互/设计/接口协议等），是否存在延期风险？</p></li><li><p>如果存在风险，有没有什么方法可以避免？</p></li></ol><p>这么做有什么好处呢？我们来看个小故事。</p><p>小明接到个新活，老板说现在的项目代码量很多，各个模块之间耦合相当严重，需要重构。</p><p>这是个大活，小明接到之后就开始进行调研和设计。但是这么大规模的项目，又进行大规模重构的案例实在太少了，基本找不到可以直接借鉴的解决方案。于是，小明跟老板要了一周的时间，打算拉个分支边写 DEMO 边调整方案。</p><p>这样的大重构，需要对各个模块做好充分调研，也需要对方案进行全面完整的风险评估，但小明觉得这根本就没法做到，太麻烦了，于是就想到哪写到哪。一周过去了，小明改好了一个模块，感觉这样改比较可行，于是跟老板要了三个月的完整改造期。</p><p>一个月过去了，小明发现代码写到一半写不下去了，有几个模块不支持预期的改法，需要对方案进行大调整。接下来，项目从预期的三个月变成了四个月，四个月又拖到了半年，迟迟上线不了。老板对小明表示很失望，小明的绩效也跟着失望。</p><p>或许在大家看来，小明做事太不靠谱了。实际上在我们的工作中，这样的情况常常会遇到，很多人甚至对需求延期都已经习以为常了，认为需求能准时上线才是稀奇的事情。正因为大家都是这样的想法，我们更应该把这些事情做好，这样才可以弯道超车。</p><p>首先，在项目开始的时候，需要进行工作量评估和分工排期。</p><h4 id="如何进行合理的分工排期" tabindex="-1">如何进行合理的分工排期 <a class="header-anchor" href="#如何进行合理的分工排期" aria-label="Permalink to &quot;如何进行合理的分工排期&quot;">​</a></h4><p>进行工作量评估的过程可以分为三步：</p><ol><li><p>确认技术方案，以及分工合作方式；</p></li><li><p>拆分具体功能模块，分别进行工作量评估，输出具体的排期时间表；</p></li><li><p>标注资源依赖情况和协作存在的风险，进行延期风险评估。</p></li></ol><p>当我们确认好技术方案之后，需要针对实现细节拆分具体的功能模块，分别进行工作量的预估和分工排期。否则可能面临分工不明确、接口协议未对齐就匆忙开工、最终因为各种问题而返工等情况。</p><p>我们在进行工作量评估的时候，可以精确到半天的工作量预期。对独自开发的项目来说，同样可以通过拆解功能模块这个过程，来思考具体的实现方式，也能提前发现一些可能存在的问题，并相应地进行规避。</p><p>提供完整的工作量评估和排期计划表（精确到具体的日期），可以帮助我们有计划地推进项目。在开发过程中，我们可以及时更新计划的执行情况，团队的其他人也可以了解我们的工作情况。</p><p>工作量评估和排期计划表的另外一个重要作用，是通过时间线去严格约束我们的工作效率、及时发现问题，并在项目结束后可针对时间维度进行项目复盘。</p><p>为了确保项目能按照预期进行，我们还要对可能存在的风险进行分析，提前做好对应的准备措施。</p><h4 id="对项目风险进行把控" tabindex="-1">对项目风险进行把控 <a class="header-anchor" href="#对项目风险进行把控" aria-label="Permalink to &quot;对项目风险进行把控&quot;">​</a></h4><p>我们在项目开发过程中，经常会遇到这样的情况：</p><ul><li><p>因为方案设计考虑不周，部分工作需要返工，导致项目延期；</p></li><li><p>在项目进行过程中，常常会遇到依赖资源无法及时给到、依赖方因为种种原因无法按时支援等问题，导致项目无法按计划进行；</p></li><li><p>团队协作方式未对齐，开发过程中出现矛盾，反复的争执和调整协作方式导致项目延期。</p></li></ul><p>一个项目能按照预期计划进行，技术方案设计、分工和协作方式、依赖资源是否确定等，任何一个环节出现问题，都可能导致延误。因此，我们需要主动把控各个环节的情况，及时推动和解决一些多方协作的问题。</p><p>下面我们来看一个详细的例子。</p><p>小明接到一个需要带外包同学进行小程序开发的项目，张三听说了，就跟小明吐槽说之前也做过类似的项目，外包同学写的代码可乱了，最后交付的时候甚至都还有报错。</p><p>换作是其他人，听了张三的话可能都开始泄气了，内心想着：这么麻烦的活，估计最后还得自己擦屁股。可小明不一样，他找到张三详细咨询了之前项目的一些情况，整理出来以下问题。</p>',30),r=a("p",null,"小明分析了下，问题的确很多，但都是可预估的风险。为了避免同样的问题出现，小明特地做了一些前期的准备工作，并且最后达到了不错的使用效果。",-1),c=i('<p>通过前期准备的这些方案和工具控制了很多可预见的风险，一期整个开发过程比较顺利，外包同学表示合作过程很愉悦，最终的交付质量也比预期好很多，连张三也拍手称好。</p><p>在这个项目中，小明对可能存在的问题做了充分的调查，并提供了一系列的技术方案避免了问题的出现。但小明觉得这还不够，项目虽然成功上线了，但其实也出现了一些延期的情况。项目还要进行二期开发，于是小明决定要进行项目复盘，找到问题在哪。</p><h3 id="事后" tabindex="-1">事后 <a class="header-anchor" href="#事后" aria-label="Permalink to &quot;事后&quot;">​</a></h3><p>很多开发习惯了当代码开发完成、发布上线之后就结束了这个项目，其实他们遗漏了一个很重要的环节：复盘。</p><p>对于大多数开发来说，很多时候都不屑于主动邀功，觉得自己做了些什么老板肯定都看在眼里，写什么总结和复盘都是刷存在感的表现。实际上老板们每天的事情很多，根本没法关注到每一个人，我以前也曾经跟老板们问过这样一个问题：做和说到底哪个重要？</p><p>答案是两个都重要。把一件事做好是必须的，但将这件事分享出来，同样可以给团队带来更多的成长。</p><p>通过对项目进行复盘，除了可以让团队其他人和老板知道我们做了些什么，更重要的是，我们可以及时发现自身的一些问题并改进。</p><h4 id="及时反馈与复盘" tabindex="-1">及时反馈与复盘 <a class="header-anchor" href="#及时反馈与复盘" aria-label="Permalink to &quot;及时反馈与复盘&quot;">​</a></h4><p>小明在一期的项目结束后，整理了这次开发过程中存在的问题。</p><ul><li><p>外包同学开发效率上问题不大，项目延期主要原因整理如下。</p><ul><li><p>等待后台接口可联调时间比预期要长</p></li><li><p>产品对接问题：提供资源、体验产品不够及时，需求描述不够详细</p></li><li><p>过程中存在需求变更，主要体现在设计和交互调整</p></li></ul></li><li><p>沟通上，外包同学态度比较积极，反馈及时，但还可以改进的地方如下。</p><ul><li><p>每日、每周工作进度及时做总结和汇总。</p></li><li><p>对产品设计和体验的合理性可具备有一定的思考，主动发现问题、提出问题、解决问题。</p></li><li><p>开发风格不一致，导致部分问题如下：过度抽象、逻辑管理较乱、变量类型混乱、重复代码过多。</p></li></ul></li></ul><p>既然发现问题了，就需要进行解决。为此，小明及时与外包同学进行交流后，对方已调整和优化大部分代码，也更加主动积极地进行反馈。</p><p>项目结束后，小明还收集了外包同学的一些建议和反馈。</p><ul><li><p>该项目过程的一些优点。</p><ul><li><p>初始化时提供的代码大大减少了搭建环境的时间，部分功能模块也得到了复用，对开发速度有很大帮助</p></li><li><p>项目相关文档很细，降低了不少沟通成本</p></li><li><p>项目开发过程中，外包同学成长很多，也知道了之前存在的一些问题</p></li></ul></li><li><p>对该项目的一些建议。</p><ul><li><p>代码规范：外包同学希望负责人（小明）能提供一份前端代码规范</p></li><li><p>分工：外包同学负责业务相关页面开发，负责人（小明）负责提供基础框架和工具库</p></li><li><p>视觉还原：外包同学大部分都是编程方向的，对 UI 理解不深，如果希望高度还原或者想做细致的交互，需要在开发前特别提醒</p></li></ul></li></ul><p>小明梳理了这些内容，打算通过邮件的方式发送给团队以及合作方，同时还可以作为自身的经验沉淀，在后续更多项目中可以进行参考。但是只有这些纯文字内容的输出，似乎除了作为后续项目的参考之外，比较难作为这次项目的复盘结果。所以小明决定，要用数据说话。</p><h3 id="用数据说话" tabindex="-1">用数据说话 <a class="header-anchor" href="#用数据说话" aria-label="Permalink to &quot;用数据说话&quot;">​</a></h3><p>性能优化的工作可以用具体的耗时和 CPU 资源占用这些数据来做总结，工具的开发可以用接入使用的用户数量来说明效果，这种普普通通的项目上线，又该怎么表达呢？</p><p>前面说过，这次带外包同学进行开发的项目一共分成了两期，第一期开发的时候依然存在一些问题导致延期。小明整理的具体的延期数据如下。</p>',17),h=i("<p>复盘的作用在于可以避免下一次出现同样的问题。于是在二期开发的时候，小明通过一些对策来避免这些问题，例如：</p><ul><li><p>开发评估项目预留多一些 buffer；</p></li><li><p>对涉及多方合作的项目，开发负责人（小明）需多预留些 buffer；</p></li><li><p>如果希望高度还原或者想做细致的交互，提前告知外包同学；</p></li><li><p>体验过程中，对开发、体验问题及时反馈；</p></li><li><p>把控需求文档质量，完善交互细节，才给到外包同学进行开发；</p></li><li><p>开发者需预留足够的自测时间，对正常路径、异常路径都完成充分自测。</p></li></ul><p>通过这些对策，二期开发的时候成功地避免了同样的问题。小明以时间线的方式对比了两期的开发时间结果。</p>",3),d=a("p",null,"除了时间维度，小明还通过质量的维度来对比两期的开发情况。",-1),u=i('<p>通过这些数据，再加上前面的问题整理和反馈结果收集，结合前期的准备工作和解决方案，小明将项目的复盘结果输出给团队，大家纷纷表示赞赏。</p><p>所以，为什么项目复盘很重要呢？小明来给大家总结下：</p><ol><li><p>及时发现自己的问题并改进，避免掉进同一个坑；</p></li><li><p>让团队成员和管理者知道自己在做什么；</p></li><li><p>整理沉淀和分享项目经验，让整个团队都得到成长。</p></li></ol><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3><p>对于大部分前端开发来说，接触工具和框架开发、参与开源项目的机会比较少，很多时候我们写的都是&quot;枯燥无聊&quot;的业务代码。我们总认为只有做工具才会比较有意思、有技术挑战，很多时候会先入为主，认为业务代码写得再好也没用，也渐渐放弃思考要怎么把事情做好。</p><p>大家可以尝试对最近做的项目或是事情进行复盘，在这个过程中如果遇到了什么问题，欢迎在留言区进行交流。</p>',6);function m(g,A,T,f,P,q){const p=e("Image");return _(),o("div",null,[n,l(p,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M01/49/6D/Cgp9HWDa15mALyZsAAEhT2YDWvs452.png"}),r,l(p,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M01/49/6D/Cgp9HWDa18iAVtPxAAJnJp0t4fg466.png"}),c,l(p,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image6/M00/49/76/CioPOWDa2DiABvZ9AAKCq6lMFw4229.png"}),h,l(p,{alt:"image (1).png",src:"https://s0.lgstatic.com/i/image6/M01/48/9C/CioPOWDVqueAf67nAAIeY58-7Hw427.png"}),d,l(p,{alt:"image.png",src:"https://s0.lgstatic.com/i/image6/M01/48/93/Cgp9HWDVqu6AWbQbAAIymppFPpk253.png"}),u])}const D=t(s,[["render",m]]);export{C as __pageData,D as default};
