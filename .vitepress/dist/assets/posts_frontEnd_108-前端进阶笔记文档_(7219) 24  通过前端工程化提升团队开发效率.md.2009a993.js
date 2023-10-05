import{_ as i,j as a,o as e,g as t,k as o,Q as p}from"./chunks/framework.4e7d56ce.js";const q=JSON.parse('{"title":"项目中常见问题 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/108-前端进阶笔记文档/(7219) 24  通过前端工程化提升团队开发效率.md","filePath":"posts/frontEnd/108-前端进阶笔记文档/(7219) 24  通过前端工程化提升团队开发效率.md","lastUpdated":1696417798000}'),r={name:"posts/frontEnd/108-前端进阶笔记文档/(7219) 24  通过前端工程化提升团队开发效率.md"},n=p('<p>前端工程化这个词出现的频率越来越高，一直没有明确的定义，有些人认为是模块化和自动化的工具，比如 Webpack/Gulp、脚手架、组件化等，但工具只是一些辅助手段，并不能作为工程化来理解。</p><p>从工程角度来看，前端工程化致力于提升工程的开发效率、协作效率、项目质量，贯穿项目设计、开发、测试、上线、维护的整个过程。我们课程中也有介绍项目的设计和搭建、技术选型、监控体系搭建、项目风险控制和复盘等内容，这些内容都包含在前端工程化中。</p><p>今天我从项目稳定性、可维护、高效协作的角度，来帮你了解如何在项目中实践前端工程化。</p><p>首先，我们来看一下为什么要进行前端工程化。</p><h3 id="项目中常见问题" tabindex="-1">项目中常见问题 <a class="header-anchor" href="#项目中常见问题" aria-label="Permalink to &quot;项目中常见问题&quot;">​</a></h3><p>相信大家的日常工作中也能感受到，相比于从 0 到 1 搭建项目，我们的大部分工作都是在维护项目，基于现有的项目上进行迭代和开发。正所谓&quot;铁打的营盘流水的兵&quot;，每个项目都会经历很多开发的参与、协作和交接，在这个过程中常常会遇到很多的问题，这些问题可以分为两类：</p><ol><li><p>系统质量的下降。</p></li><li><p>开发效率的下降。</p></li></ol><p>我们分别来看下。</p><h4 id="问题-1-系统质量的下降" tabindex="-1">问题 1：系统质量的下降 <a class="header-anchor" href="#问题-1-系统质量的下降" aria-label="Permalink to &quot;问题 1：系统质量的下降&quot;">​</a></h4><p>&quot;没有 Bug 的系统是不存在的&quot;，当我们开始写代码的时候，Bug 也就随即而来。</p><p>Bug 的出现有很多的可能性，比如需求设计不严谨、代码实现的逻辑有漏洞、不在预期之内的异常逻辑分支，等等。概括来说，Bug 常常是因为对项目的不熟悉、对系统的理解不深入导致，这意味着以下的过程都会导致 Bug 的增加：</p><ol><li><p>项目频繁地调整（新增或者更换）开发人员，由于不熟悉项目，每个新加入的小伙伴都可能会埋下新的 Bug；</p></li><li><p>系统功能新增和迭代、不断壮大，各个模块间的耦合增加、复杂度增加，如果没法掌握系统的所有细节，很可能牵一发而动全身，产生自己认知以外的 Bug。</p></li></ol><p>对于处于快速迭代、不断拓展阶段的项目来说，不管是人员的变动、还是项目的拓展都是无法避免的，这种情况下需要通过系统上线前的质量检测来确保问题尽早发现。但由于系统本身也趋向更加复杂，因此测试成本也会随之上升，未能发现的 Bug 进入线上版本的可能性也上升。</p><p>为了降低系统的复杂度，当项目发展到一定阶段的时候，会对系统进行局部或是整体的架构调整，比如模块的拆分、各个模块间的依赖解耦、引入新的状态管理工具、重复逻辑进行抽象和封装，等等。</p><p>新技术的引入会缓解系统复杂度带来的稳定性问题，但同时也可能会引入新的问题，比如：</p><ul><li><p>部分功能无法与新技术兼容，成为历史遗留问题；</p></li><li><p>较大范围的架构调整影响面很广，可能埋下难以发现的 Bug。</p></li></ul><p>可见，一个项目不断发展的过程中，都会面临系统质量下降的问题，除此之外，还会导致开发效率的下降。</p><h4 id="问题-2-开发效率的下降" tabindex="-1">问题 2：开发效率的下降 <a class="header-anchor" href="#问题-2-开发效率的下降" aria-label="Permalink to &quot;问题 2：开发效率的下降&quot;">​</a></h4><p>&quot;今天又要加班了，因为今天的代码还没开始写。&quot;系统上线之后，开发的工作内容重心，会从功能开发逐渐转向其他内容。除了新功能的评审和设计以外，还会包括：</p><ul><li><p>用户反馈问题跟进和定位；</p></li><li><p>线上 Bug 修复和紧急发布；</p></li><li><p>处理系统的监控告警，排查异常问题；</p></li><li><p>新功能灰度发布过程，自测、产品验证功能、提测、修复 Bug、灰度发布等各个流程都需要人工操作和主动关注；</p></li><li><p>为了保证系统质量，需要完善自动化测试能力，包括单元测试、UI 测试、集成测试等；</p></li><li><p>项目成员的调整，需要进行工作的交接、指导对方的工作内容等。</p></li></ul><p>开发的工作内容变得复杂，需要关注的事情也更多，对于各个系统（监控告警系统、日志系统、测试系统、发布系统等）也都需要熟悉成本和操作成本。在各个工作内容之间切换，也常常容易出现步骤的遗漏，导致一些流程上的问题，比如：</p><ol><li><p>系统灰度到一半，处理其他事情忘了全量；</p></li><li><p>系统发布之后，去处理紧急 Bug、忘记看监控，直到收到大量的用户反馈；</p></li><li><p>线上紧急 Bug 修复了，急着发布忘了进行自动化测试。</p></li></ol><p>随着项目规模变大，系统的复杂度也随之上升，上面所提到的工作量也都会增加，开发效率会肉眼可见地受到影响。以前一天工作量的功能开发，如今需要三天时间才能完成，因为每天只有三分之一的时间（甚至更少）可以用来开发新功能。</p><p>在这个项目阶段，开发每天的杂事太多、效率太低、浑浑噩噩不知道都做了些什么，团队面临着项目复杂度上升、系统质量不稳定、技术债务越来越多、团队工作效率下降等问题。</p><p>前端工程化的出现，正是为了解决系统质量和效率低下的问题，具体要怎么做呢？我们来看一下。</p><h3 id="如何进行前端工程化实践" tabindex="-1">如何进行前端工程化实践 <a class="header-anchor" href="#如何进行前端工程化实践" aria-label="Permalink to &quot;如何进行前端工程化实践&quot;">​</a></h3><p>项目维护阶段的最大痛点，其实在于开发无法聚焦自身的工作内容，常常需要在各种系统中进行操作和切换，从而带来开发效率的下降，以及注意力分散、无法更全面的思考导致了不合理的设计、新的 Bug 引入，而影响了系统的质量。</p><p>前端工程化同样可以从两个角度来进行。</p><ul><li><p>提升系统质量：项目设计和架构优化。</p></li><li><p>提升开发效率：项目研发和发布流程优化。</p></li></ul><h4 id="提升系统质量-项目设计和架构优化" tabindex="-1">提升系统质量：项目设计和架构优化 <a class="header-anchor" href="#提升系统质量-项目设计和架构优化" aria-label="Permalink to &quot;提升系统质量：项目设计和架构优化&quot;">​</a></h4><p>为了提升系统质量，我们需要对项目进行合理的架构调整，提升系统的可读性、可维护性、可测试行、稳定性，从而提升系统发布的稳定性。</p><p>首先，在项目设计阶段，需要进行项目定位、技术选型、团队开发规范制定等，这些内容在上一讲有介绍，这里我们主要关注项目维护阶段的设计和优化。</p><p>我们在进行架构设计时，需要根据项目的预期和现状来设计，保留拓展性的同时，避免过度设计。因此，随着项目不断发展，原有的架构设计可能不再适合，此时我们需要进行优化和调整的设计包括以下这些点。</p><ol><li><p>引入新的技术和工具的同时，需要考虑是否能兼容原有设计、团队成员熟悉成本、改造的工作量和预期的效果，选择性价比合适的方案落地。</p></li><li><p>团队成员增加，沟通成本和对规范的理解出现差异。使用工具（Eslint/Prettier/Git hooks 等）将团队规范进行落地，保证开发过程中使用一致的技术栈、代码规范以及公共物料库（组件库、工具库），降低团队的沟通成本，确保代码的可读性和可维护性。</p></li><li><p>项目功能模块过多，需要进行模块的拆分和解耦。将一些职责独立的模块进行拆包，使用 monorepo 或是 multirepo 的方式进行管理，模块可自行对技术方案、依赖关系梳理、变更、测试、发布等环节进行闭环，从而降低各个模块间的相互影响，降低系统的复杂度。</p></li><li><p>项目代码量和文件数的增加，除了进行拆包以外，还需要更新或是优化项目构建工具（使用增量编译、使用 Tree-shaking、升级 Webpack 版本等），减少代码编译、打包等过程的耗时，提升开发效率。</p></li><li><p>进行自动化测试能力的覆盖，补齐单模块的功能测试、各个模块间的集成测试、UI 组件的界面测试、接口的模拟环境测试、性能测试等。在每次系统发布的时候都可以自动化进行回归测试，避免某个改动影响了其他的功能模块、带来了认知以外的风险，确保系统质量不受影响。</p></li><li><p>搭建完善的监控体系，在系统灰度、发布、线上运行的过程中可实时观察系统质量，配合告警能力及时发现问题并进行解决，保证系统运行的稳定性。</p></li></ol><p>在这个过程中，我们可能分别引入了新的代码构建、代码规范和自动化测试工具，搭建了新的监控系统、发布系统等。对于开发来说，开发流程变得烦琐，意味着工作内容更复杂，同时还增加了很多新工具和系统的熟悉成本。</p><p>那么，我们还需要通过优化项目的研发和发布流程，来提升项目的开发效率。</p><h4 id="提升开发效率-项目研发和发布流程优化" tabindex="-1">提升开发效率：项目研发和发布流程优化 <a class="header-anchor" href="#提升开发效率-项目研发和发布流程优化" aria-label="Permalink to &quot;提升开发效率：项目研发和发布流程优化&quot;">​</a></h4><p>项目研发和发布流程优化的核心点在于：将一切需要手动操作和关注的内容自动化。</p><p>那么，我们先来梳理下项目开发和发布过程中，到底有多少烦琐的工作可以进行自动化。一般来说，开发在接到产品需求单后，需要处理的事情包括：</p><ol><li><p>从主干创建分支，开始进入开发；</p></li><li><p>开发完成后，补充相关自动化测试（单元测试、集成测试、UI 测试等）；</p></li><li><p>进行自动化测试的回归，确保系统整体功能能正常运行；</p></li><li><p>构建代码，部署测试环境，进入产品体验和测试流程；</p></li><li><p>修复产品体验问题和 Bug，并重复 2~4 步骤；</p></li><li><p>代码验证完成，进行团队内代码 Review 后，更新主干的分支，并进行代码构建和自动化回归测试；</p></li><li><p>根据团队 Git 规范（比如 Git Flow 流程），准备发布；</p></li><li><p>先进行版本灰度，灰度过程中登录监控系统关注各个指标是否有异常；</p></li><li><p>如果监控系统出现异常，进行问题定位，并在 Bug 修复之后返回到步骤 2；</p></li><li><p>灰度过程无异常，进行全量发布，发布完后同样观察监控系统是否有异常；</p></li><li><p>全量发布完成，结束需求单，并将版本进行归存（使用分支或者 git tag）。</p></li></ol><p>可以看到，一次功能发布需要花费很多的精力在各个流程步骤上，我们可以将这些步骤都转为自动化，就可以让开发的精力聚焦在功能的设计和实现上。对于流程自动化，业界比较成熟的解决方案是使用持续集成（continuous integration，简称 CI）和持续部署（continuous deployment，简称 CD）。</p><ul><li><p>持续集成（CI）：目的是让产品可以快速迭代，同时还能保持高质量。</p></li><li><p>持续部署（CD）：目的是代码在任何时刻都是可部署、可进入生产阶段。</p></li></ul><p>CI 在项目中的实践，指团队成员频繁（一天多次）地提交代码到主干分支，每次提交后会自动触发自动化验证的任务集合，以便尽可能地提前发现问题；CD 在项目中的实践，指代码通过评审以后，可自动化、可控、多批次地部署到生产环境，CD 的前提是能自动化完成测试、构建、部署等步骤。</p><p>CI/CD 在项目中的落地，很多时候会表现为流水线的开发模式：通过建立完整的 CI/CD 流水线，涵盖整个研发流程，可有效地提高效率。</p><p>以上面的开发流程为例，我们可以搭建这样的 CI/CD 流水线。</p>',45),_=p('<p>通过将以上流程自动化，可以节省开发的很多人工操作时间、提升开发效率的同时，也避免了人工操作容易出现的遗漏和失误。</p><p>这样的自动化流水线与通知/告警机器人、工作群、需求单系统、Bug 系统、代码管理系统、发布系统、监控系统结合，实现了全研发和发布流程的自动化，开发可从各种杂事中释放，专注于功能开发的实现。</p><p>越是大规模、系统建设完备的团队，开发流程中消耗在多人协作和各个系统的操作中的精力越多，搭建 CI/CD 后更能体会到自动化流程带来的便利。</p><p>当然，搭建 CI/CD 的过程中，也需要投入不少的人力精力。因此，很多时候我们可以考虑性价比，从对研发效能影响最大的痛点开始进行建设，可以最快速和有效地提升团队的开发效率，让更多的人愿意参与到 CI/CD 的建设中。</p><p>这便是前端工程化：通过项目设计和架构优化，提升系统质量；通过自动化的方式，将项目研发和发布流程进行优化，提升开发效率。</p><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3><p>今天我带大家学习了前端工程化相关的内容。</p><ul><li><p>为什么要进行前端工程化：项目发展过程中，随着项目人员的增加、系统复杂度的上升，会出现系统质量和效率低下的问题；</p></li><li><p>如何进行前端工程化：通过项目设计和架构优化来提升系统质量，通过优化研发和发布流程提升开发效率；</p></li></ul><p>在本节课结束前，我给大家留个问题：前端工程化和自动化、CI/CD 有什么区别呢？它们之间的关系是什么呢？</p><p>欢迎在留言区进行写下你的思考～</p>',10);function u(s,h,c,d,g,C){const l=a("Image");return e(),t("div",null,[n,o(l,{alt:"图片12.png",src:"https://s0.lgstatic.com/i/image6/M00/47/BF/Cgp9HWDRvqSAWqjPAAGANWxXkec862.png"}),_])}const B=i(r,[["render",u]]);export{q as __pageData,B as default};
