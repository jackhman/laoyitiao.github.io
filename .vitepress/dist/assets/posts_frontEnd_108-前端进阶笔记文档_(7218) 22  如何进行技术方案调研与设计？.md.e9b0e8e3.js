import{_ as e,j as l,o,g as i,k as t,h as r,Q as p}from"./chunks/framework.4e7d56ce.js";const b=JSON.parse('{"title":"22如何进行技术方案调研与设计？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/108-前端进阶笔记文档/(7218) 22  如何进行技术方案调研与设计？.md","filePath":"posts/frontEnd/108-前端进阶笔记文档/(7218) 22  如何进行技术方案调研与设计？.md","lastUpdated":1696417798000}'),_={name:"posts/frontEnd/108-前端进阶笔记文档/(7218) 22  如何进行技术方案调研与设计？.md"},s=p('<h1 id="_22如何进行技术方案调研与设计" tabindex="-1">22如何进行技术方案调研与设计？ <a class="header-anchor" href="#_22如何进行技术方案调研与设计" aria-label="Permalink to &quot;22如何进行技术方案调研与设计？&quot;">​</a></h1><p>工作中对开发的要求都不仅限于实现功能。你是否有想过，如果只是编写代码，刚毕业的应届生花几周时间也一样能做到，那么我们的优势在哪里呢？</p><p>洞察工作中的瓶颈，并有足够的能力去设计方案、排期开发、解决并复盘，这些技能更能突显我们在岗位上的价值和能力。对团队来说，更需要这样能主动发现并解决问题的成员，而不是安排什么就只做什么的螺丝钉。</p><p>所以，从这一讲开始，我会介绍技术方案设计、项目设计和管理的技能。</p><p>其中，技术方案设计属于架构能力中的一种，当我们开始作为某些功能/应用的 Owner 或是技术负责人来参与项目时，便会面临独立完成技术方案的调研和设计这样的工作内容。</p><p>我们需要确保技术方案的最优化、避免开发过程遇到问题需要推翻重做，从而能够快速落地并达成预期的效果。因此，在进行方案设计之前，对于项目存在的一些技术瓶颈、技术调整，我们需要先进行充分的前期调研。</p><h3 id="技术方案调研" tabindex="-1">技术方案调研 <a class="header-anchor" href="#技术方案调研" aria-label="Permalink to &quot;技术方案调研&quot;">​</a></h3><p>在进行技术方案调研的时候，我们需要首先结合自身项目的背景、存在的痛点、现状问题进行分析，只有找到项目的问题在哪里，才可以更准确、彻底地去解决这些问题。</p><h4 id="分析项目背景-挖掘项目痛点" tabindex="-1">分析项目背景，挖掘项目痛点 <a class="header-anchor" href="#分析项目背景-挖掘项目痛点" aria-label="Permalink to &quot;分析项目背景，挖掘项目痛点&quot;">​</a></h4><p>技术方案的设计很多时候并不是命题作文，更多时候我们需要自己去挖掘项目的痛点，然后才是提出解决方案。</p><p>很多前端开发常常觉得自己做的项目没什么意思，认为每天都是重复的工作、烦琐的业务逻辑、糟糕的历史遗留代码。</p><p>实际上，那些会让我们觉得枯燥和重复的工作内容，也是可以去改善做好，并能从中获得成长的地方。</p><p>好的业务可遇不可求，如果工作内容跟自己的预期不一样，我们就什么都不做了吗？</p><p>我们可以主动寻找项目存在的问题和痛点，并尝试去解决。不同的项目或是同一个项目的不同时期，关注的技术点都会不一样。对于一个前端项目来说，技术价值常常体现在系统性能、稳定性、可维护性、效率提升等地方，比如：</p><ul><li><p>对于用户量较大的项目，对系统稳定性要求较高，开发过程中需要关注是否会导致历史功能不兼容、是否会引入新的问题等；</p></li><li><p>对于大型复杂的项目，常常涉及多人协作，因此对系统可维护性要求更高，需要避免每次的改动都会导致性能和稳定性的下降，如何提升协作开发的效率等；</p></li><li><p>对于一次性的活动页面、管理端页面开发，技术挑战通常是如何提高开发效率，可以使用配置化、脚手架、自动化等手段来提升页面的开发和上线效率；</p></li></ul><p>以某个大型项目作为例子，参与前端项目开发的同学有 50 人，项目代码约 60 万行。由于项目太大了，每个同学在开发的时候都难以评估是否会影响到其他模块的运行。</p><p>在这种情况下，项目的核心痛点在于如何保证确保每次系统上线都不会对现有性能和稳定性带来问题。</p><p>找到项目的痛点之后，我们就可以进入项目的现状分析。</p><h4 id="现状分析" tabindex="-1">现状分析 <a class="header-anchor" href="#现状分析" aria-label="Permalink to &quot;现状分析&quot;">​</a></h4><p>或许你会感到疑惑，项目的痛点与现状有什么区别呢？</p><p>项目的痛点可以转化为一个目标方向，比如：</p><ul><li><p>加载慢 → 首屏加载耗时优化</p></li><li><p>开发效率低 → 提升项目自动化程度</p></li><li><p>多人协作容易出问题 → 提升系统稳定性</p></li></ul><p>确定目标之后，我们就需要进行技术方案的设计，但很多时候由于项目现状存在的问题，一些技术优化的方案并不适用，需要进行方向的调整。</p><p>举个例子，在上述项目的例子中，一般情况下我们可以通过一系列的自动化测试与人工测试，来保证大部分核心功能可正常运行。</p><p>假设有一个同样规模大、成员多的小程序项目，由于该项目处于快速迭代的时期，考虑到投入产出比、产品形态也在不断调整，老板说&quot;每个功能由开发自己保证&quot;，决定不投入测试资源。</p><p>这意味着开发不仅需要在自测的时候确保核心用例的覆盖，同时也没有足够的排期来进行自动化测试（单元测试、集成测试、端到端测试等）的开发。</p><p>一般来说，我们还可以考虑建立用例录制和自动化回归的解决方案。比如开发一个浏览器插件，来获取用户操作的一些行为（比如 Redux 中的 Action 操作），将操作行为的页面结果（状态数据，比如 Redux 的 State）保存下来。在发布之前，可以通过自动化触发相同的操作行为，并与录制的页面结果进行比较，来进行回归测试。</p><p>但对于小程序的特殊性，我们无法让其运行在浏览器中，更无法获取到它的操作行为。在这样的情况下，还有什么办法可以保证系统的稳定性呢？</p><p>考虑到一个系统的上线过程包括开发、测试、灰度和发布四个阶段，如果无法通过测试阶段来及时发现问题，那么我们还可以通过灰度过程中来及时发现并解决问题。</p>',29),h=p('<p>比如，通过全埋点覆盖各个页面的功能，灰度过程中观察埋点曲线是否有异常、及时告警和排查问题、暂停灰度或者回滚等方式，来避免给更多的用户带来不好的体验。</p><p>通过灰度的方式来保证系统稳定性，会对局部的用户造成影响，这并不是一个最优的技术方案，它是考虑到项目的现状退而求其次的解决方案，但最终也同样可以达到提升系统稳定性这样一个目的。</p><p>当我们确定了技术优化的具体方向之后，便可以进行业界方案的调研阶段了。</p><h3 id="业界方案调研" tabindex="-1">业界方案调研 <a class="header-anchor" href="#业界方案调研" aria-label="Permalink to &quot;业界方案调研&quot;">​</a></h3><p>当我们遇到一些技术问题并尝试解决的时候，需要提醒自己，这些问题肯定有其他人也遇到过。为了避免技术方案的设计过于局限，我们可以进行前期的调研，找一些业界相对成熟的方案作为参考，分析这些方案的优缺点、是否适用于自己的项目中。</p><p>我们可以通过几种方式去进行业界方案的调研：</p><ol><li><p>与有相关经验的开发进行沟通，交流技术方案，提供参考思路；</p></li><li><p>参考其他系统对外公开的方案设计；</p></li><li><p>参考开源项目的源码设计。</p></li></ol><p>举个例子，对于交互复杂、规模大型的应用，要如何管理各个模块间的依赖关系呢？业界相对成熟的解决方案是使用依赖注入体系，其中著名的开源项目中有 Angular 和 VSCode 都实现了依赖注入的框架，我们可以通过研究它们的相关代码，分析其中的思路以及实现方式。</p><p>开源项目源码很多，要怎么才能找到自己想看的部分呢？带着疑问有目的性地看，会简单轻松得多。比如上述的依赖注入框架，我们可以带着以下的问题进行研究：</p><ol><li><p>依赖注入框架是什么？</p></li><li><p>模块是怎样初始化，什么时候进行销毁的？</p></li><li><p>模块是如何获取到其他模块呢？</p></li><li><p>模块间是如何进行通信的呢？</p></li></ol><p>通过这样的方式阅读源码，我们可以快速掌握自己需要的一些信息。在业界方案调研完成之后，我们需要结合自身项目进行具体的技术方案设计。</p><h3 id="技术方案设计" tabindex="-1">技术方案设计 <a class="header-anchor" href="#技术方案设计" aria-label="Permalink to &quot;技术方案设计&quot;">​</a></h3><p>技术方案设计过程中，我们需要根据上述的调研资料进行整理，包括项目痛点、现状、业界方案等，然后进行方案的选型和对比，最终给到适合项目的解决方案。</p><h4 id="方案选型-对比" tabindex="-1">方案选型/对比 <a class="header-anchor" href="#方案选型-对比" aria-label="Permalink to &quot;方案选型/对比&quot;">​</a></h4><p>业界的解决方案可能有多套，这时候我们需要对这些方案进行分析比较。</p><p>除此之外，如果需要投入人力和时间成本去做一件事，我们就会面临一个问题：如何让团队认同这件事情、并愿意给到资源让我去完成它呢？梳理项目现状和痛点、提供业界认可的案例参考、进行全面的方案对比和选型，也是一种方式。</p><p>例如，小明最近需要针对项目进行自动化性能测试能力的支持。</p><ul><li><p>项目现状：项目规模大、模块多、参与开发的成员也有几十人。</p></li><li><p>项目痛点：经常因为一些不同模块的变更导致项目的性能下降却没法及时发现问题，往往是等到用户反馈或是某次开发、产品或者测试发现的时候才得知。</p></li></ul><p>小明调研常见的一些性能分析方案，发现有几种方式：</p><ol><li><p>通过 Chrome Devtools 提供的 Performace 火焰图，来定位和发现问题，但这种方式局限于开发手动分析定位；</p></li><li><p>使用 Lighthouse，该工具可以提供初步的网页优化建议，也支持自动化，但 Lighthouse 本身更专注于短时间内对网站进行较全面的评估，存在像分析不够细致和深入这些问题；</p></li><li><p>使用 Chrome Devtools 提供的 Chrome Devtools Protocol（CDP）能力，进行自动化生成火焰图需要的 JSON。但业界对该 JSON 的分析工具几乎没有，大家都通过将该 JSON 传到 Chrome Devtools 提供的一个工具来还原火焰图，无法支持全程的自动化分析。</p></li></ol><p>通过仔细的对比和分析，小明认为第一和第二种方案都无法从根本上解决遇到的问题，于是决定采取第三种方案，并打算通过自行研究分析 CDP（Chrome Devtools Protocol）生成的 JSON 来达到完全的自动化目的。</p><p>确定了方案之后，小明拿着前期的调研结果（包括业界成熟方案、方案的对比和选择、初步 DEMO 效果）去找老板。老板看着这么完整的调研资料，二话不说就批准了小明继续研究这个方案并落到项目中使用，同时也觉得小明做事特别靠谱。</p><p>方案选型和对比是技术方案设计中重要的一个环节，可以将现状和痛点分析得更加全面，同时还可以避开一些其他人踩过的坑。</p><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3><p>今天我带大家学习了怎么进行技术方案的设计：</p><ol><li><p>对项目的痛点、现状进行分析；</p></li><li><p>调研业界成熟的技术方案；</p></li><li><p>结合项目本身的现状和痛点，进行技术方案的选型和对比。</p></li></ol><p>技术的发展都离不开知识的沉淀、分享和相互学习，当我们遇到一些问题不知道该怎么解决的时候，可以试着站到巨人的肩膀上，说不定可以看到更多。</p><p>在你负责或者参与的项目中，存在哪些痛点呢？又可以通过怎样的方式去解决呢？欢迎在留言区进行讨论~</p>',28);function n(d,c,u,m,f,P){const a=l("Image");return o(),i("div",null,[s,t(a,{alt:"image.png",src:"https://s0.lgstatic.com/i/image6/M01/44/26/Cgp9HWC94iiAMihUAAAR2wF83QU717.png"}),r(),h])}const C=e(_,[["render",n]]);export{b as __pageData,C as default};
