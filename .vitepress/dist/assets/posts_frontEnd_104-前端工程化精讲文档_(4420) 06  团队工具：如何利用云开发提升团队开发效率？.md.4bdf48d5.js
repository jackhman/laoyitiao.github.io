import{_ as t,o as e,h as o,Q as a}from"./chunks/framework.d3daa342.js";const b=JSON.parse('{"title":"06团队工具：如何利用云开发提升团队开发效率？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/104-前端工程化精讲文档/(4420) 06  团队工具：如何利用云开发提升团队开发效率？.md","filePath":"posts/frontEnd/104-前端工程化精讲文档/(4420) 06  团队工具：如何利用云开发提升团队开发效率？.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/104-前端工程化精讲文档/(4420) 06  团队工具：如何利用云开发提升团队开发效率？.md"},i=a('<h1 id="_06团队工具-如何利用云开发提升团队开发效率" tabindex="-1">06团队工具：如何利用云开发提升团队开发效率？ <a class="header-anchor" href="#_06团队工具-如何利用云开发提升团队开发效率" aria-label="Permalink to &quot;06团队工具：如何利用云开发提升团队开发效率？&quot;">​</a></h1><p>上一讲我们讨论了在开发时提升编码效率的相关工具。在项目开发过程中，我们可以编写自定义的代码片段缩写规则来提升个人的编码效率。那么，如果想要把这些规则分享给团队内的其他成员或自己的其他电脑设备时又该怎么做呢？带着这个问题，我们就进入到今天要聊的主题：<strong>云开发</strong>（Cloud Development）。</p><p>和之前介绍的适用于个人的开发提效工具不同，云开发的优势主要是在团队效率的提升方面。在这一讲里，我会介绍云开发和普通开发模式的区别，目前典型的云开发产品，以及云开发模式的应用场景。下面我就进入到第一个问题：什么是云开发。</p><h3 id="软件开发环境的对比" tabindex="-1">软件开发环境的对比 <a class="header-anchor" href="#软件开发环境的对比" aria-label="Permalink to &quot;软件开发环境的对比&quot;">​</a></h3><p>在具体介绍什么是云开发之前，让我们先来看下普通的日常开发流程是什么样的。</p><h4 id="个人电脑开发环境" tabindex="-1">个人电脑开发环境 <a class="header-anchor" href="#个人电脑开发环境" aria-label="Permalink to &quot;个人电脑开发环境&quot;">​</a></h4><p>通常我们都使用个人电脑作为日常的开发环境，对应的开发流程通常是：</p><ol><li><p><strong>基础环境准备</strong> ：在个人电脑中准备开发环境所需设施，下载安装开发所需各种<strong>应用程序</strong> （以前端为例：IDE、Node、Git、Yarn......），调试各种<strong>配置文件</strong> （.bashrc、npmrc......），安装必要<strong>IDE 插件</strong> 并调试<strong>IDE 配置项</strong>（UI、编码格式、Snippets......）等。</p></li><li><p>下载代码：将项目源代码从代码仓库（例如 Git Repo）中下载到个人电脑的开发目录下。</p></li><li><p>安装项目依赖。</p></li><li><p>运行开发服务。</p></li><li><p>编码调试。</p></li><li><p>执行任务（Lint 检查、格式化检查、单元测试等）。</p></li></ol><p>上述开发流程的流畅度一定程度上依赖于所使用电脑的硬件配置，因此程序员往往需要高性能配置的个人电脑。</p><h4 id="远程开发" tabindex="-1">远程开发 <a class="header-anchor" href="#远程开发" aria-label="Permalink to &quot;远程开发&quot;">​</a></h4><p>远程开发是将开发环境部署到远程服务器，然后通过个人电脑的 IDE（Integrated Development Environment ，集成开发环境） 进行远程连接来进行开发的方式（例如通过 VS Code 中的 <a href="https://code.visualstudio.com/docs/remote/remote-overview" target="_blank" rel="noreferrer">Remote SSH 插件</a>）。和传统的个人电脑开发环境相比，远程开发模式的优点主要在于：</p><ol><li><p>由远程的开发服务器来承载项目数据存储和运行计算的需求，从而解放了对个人电脑资源的占用和对性能的要求。</p></li><li><p>由于个人电脑只提供了用户操作界面和远程连接的能力，因此大大减少了访问设备变更对于项目开发的影响，例如在更换新电脑或在家使用不同电脑设备的情况下，只需要安装 IDE 和少量配置，就能快速获得一致的开发体验，而无须再重复进行基础环境的准备。</p></li></ol><p>远程开发的主要问题在于：</p><ol><li><p>需要申请单独的开发机资源。</p></li><li><p>新申请的开发机也需要和个人电脑环境一样，人工进行基础环境的准备工作。</p></li><li><p>将开发机单独用于远程开发，在资源分配上可能存在资源利用不充分的问题。</p></li></ol><h4 id="云开发" tabindex="-1">云开发 <a class="header-anchor" href="#云开发" aria-label="Permalink to &quot;云开发&quot;">​</a></h4><p>云开发模式是在上述远程开发模式的基础之上发展而来的，将开发环境托管，由远程开发服务器变更为云服务。个人电脑通过 IDE 或云服务提供的浏览器界面访问云端工作区进行开发。云开发模式在继承远程开发模式优点的基础上，更能提升效率的原因在于：</p><ol><li><p>通过容器化技术，将开发环境所需基础设施（应用程序、配置文件、IDE 插件、IDE 设定项等）集成到基础镜像中，大大<strong>提升开发环境准备的效率</strong>。同时，同样的基础环境也避免了相同项目不同开发集成环境导致的环境差异类问题。</p></li><li><p>通过服务化的云开发平台，<strong>简化使用流程</strong>，解决个人使用远程开发时可能遇到的技术困难，使得刚入职的新人也能够快速上手。</p></li><li><p>对于团队而言，能够<strong>提升团队协作效率</strong>。云开发模式有利于流程规范的统一，有利于团队成员共享开发工具，同时支持多人访问相同开发环境，有助于结对编程等协作流程。</p></li><li><p>对于公司而言，使用弹性化的云端容器环境有利于资源利用率的提升和硬件资产成本的降低。</p></li></ol><h3 id="典型云开发产品介绍" tabindex="-1">典型云开发产品介绍 <a class="header-anchor" href="#典型云开发产品介绍" aria-label="Permalink to &quot;典型云开发产品介绍&quot;">​</a></h3><p>以下表格是一些已经推出的云开发产品，感兴趣的话，你可以根据自己所接触过的云厂商来进一步了解。</p><table><thead><tr><th>产品</th><th>厂商</th><th>基础 IDE</th><th>IDE 类型</th><th>代码托管方式</th></tr></thead><tbody><tr><td>VS Codespace</td><td>微软</td><td>VS Code</td><td>Web/VS/VSC</td><td>云端（Asure）/自维护</td></tr><tr><td>Gitpod</td><td>Eclipse</td><td>Theia</td><td>Web/Desktop</td><td>云端/自维护（限制用户数量）</td></tr><tr><td>CloudIDE</td><td>阿里云</td><td>KAITIAN IDE</td><td>Web</td><td>云端</td></tr><tr><td>Cloud Studio</td><td>Coding.net （腾讯云）</td><td>VS Code</td><td>Web</td><td>云端（5 个工作空间）</td></tr><tr><td>Cloud9</td><td>AWS</td><td>Cloud9</td><td>Web</td><td>云端（AWS）</td></tr></tbody></table><p>本课时重点介绍的是以 VS Codespace 为代表的云开发产品，以及以 Theia 为代表的 WebIDE 框架。</p><h4 id="微软-visual-studio-codespace" tabindex="-1">微软：Visual Studio Codespace <a class="header-anchor" href="#微软-visual-studio-codespace" aria-label="Permalink to &quot;微软：Visual Studio Codespace&quot;">​</a></h4><p><a href="https://visualstudio.microsoft.com/zh-hans/services/visual-studio-codespaces/" target="_blank" rel="noreferrer">Visual Studio Codespace</a>（以下简称<strong>Codespace</strong>），是微软 VS Code 团队 2019 年推出的云开发环境产品，该产品的特点是：</p><ul><li><p>支持三种访问客户端：VS Code，Visual Studio IDE，以及 Web。</p></li><li><p>提供收费的云托管（Azure）环境与免费的自维护环境两种服务方式（仍需要注册 Azure 账号来访问）。</p></li><li><p>内置多人协作工具 Live Share 和 AI 智能代码提示功能 InteliCode。</p></li><li><p>自定义环境基础配置，可<a href="https://docs.microsoft.com/zh-cn/visualstudio/codespaces/reference/configuring" target="_blank" rel="noreferrer">定制化</a>开发环境基础设施，例如 Linux 版本、工具、端口、变量、 IDE 插件等。</p></li><li><p>自定义<a href="https://docs.microsoft.com/zh-cn/visualstudio/codespaces/reference/personalizing" target="_blank" rel="noreferrer">个性化配置</a>，定制环境中各类配置文件，例如 .bashrc，.editorconfig 等。</p></li></ul><h4 id="eclipse-theia" tabindex="-1">Eclipse: Theia <a class="header-anchor" href="#eclipse-theia" aria-label="Permalink to &quot;Eclipse: Theia&quot;">​</a></h4><p><a href="https://theia-ide.org/" target="_blank" rel="noreferrer">Eclipse Theia</a><strong>（以下简称 Theia）</strong> ，是 Eclipse 基金会推出的 VS Code 的替代产品，它的定位是以 NodeJS 和 TS 为技术栈开发的云端和桌面端的 IDE 基础框架，于 2017 年启动， 2018 年发布了对应的 Web 端 IDE 产品 <a href="https://github.com/gitpod-io/gitpod" target="_blank" rel="noreferrer">Gitpod</a>。</p><p>Theia 和 VS Code 的技术相同点有：</p><ul><li><p>编辑器核心都基于 <a href="https://microsoft.github.io/monaco-editor/" target="_blank" rel="noreferrer">Monaco Editor</a>。</p></li><li><p>都支持 Language Server Protocol（LSP）。</p></li><li><p>都支持 Debug Adepter Protocol（DAP）。</p></li><li><p>都支持 VS Code 的插件体系。</p></li></ul><p>官方总结，与 VS Code 相比，Theia 的不同之处在于：</p><ul><li><p>架构上更模块化，更易于自定义。</p></li><li><p>从一开始就被设计成同时运行于桌面和云端。</p></li><li><p>由厂商中立的开源基金会开发维护。</p></li><li><p>开发独立的 WebIDE 是云开发产品的<strong>首选</strong>，目前 VS Code 并未开源功能完整的 Web 版本（目前开源的 Web 版本仅可用于预览功能），但 Thiea 有开源可定制化的版本。</p></li></ul><h3 id="云开发模式的技术要素" tabindex="-1">云开发模式的技术要素 <a class="header-anchor" href="#云开发模式的技术要素" aria-label="Permalink to &quot;云开发模式的技术要素&quot;">​</a></h3><p>一般来说，云开发模式依赖的技术要素主要有三个方面：<strong>WebIDE</strong> ，<strong>容器化</strong> ，以及能够<strong>对接其他云服务</strong>。</p><h4 id="webide" tabindex="-1">WebIDE <a class="header-anchor" href="#webide" aria-label="Permalink to &quot;WebIDE&quot;">​</a></h4><p>继 VS Code 2019 年发布 Codespace 后， Eclipse 基金会于 2020 年初也发布了 Theia 1.0 版本。 WebIDE 在功能体验上已达到和桌面 IDE 相同的水平（尽管在初始化阶段会有不同程度的额外耗时）。同时， WebIDE 还具有以下优点：</p><ul><li><p>便于<strong>平台化定制</strong> ：在团队使用时可通过定制 WebIDE 来实现<strong>通用的功能扩展和升级</strong>，而无须变更团队成员的桌面 IDE（例如，使用微信开发者工具软件的同学，在工具发布新版本时需要各自处理升级，而 Web 版则无须如此）。</p></li><li><p><strong>流程体验上更平滑</strong>：虽然基本使用仍然是打开一个包含源代码的工作空间容器进行开发，但是通过和代码仓库以及 CI/CD 工具的对接，可以在很多流程节点上做到平滑的体验（例如，测试环境下修复 Bug，可以通过工具，在查找到对应的提交版本后点击进入到 IDE 界面进行修复、测试和提交，相比于原先需要线下操作的流程而言，效率会上升一个台阶）。</p></li></ul><h4 id="容器化" tabindex="-1">容器化 <a class="header-anchor" href="#容器化" aria-label="Permalink to &quot;容器化&quot;">​</a></h4><p>容器化以往在服务部署中应用较多。在云开发中的用途主要有：</p><ul><li><p>为每个用户的每个项目创建<strong>独立的工作空间。</strong></p></li><li><p>基于容器化的分层结构，可以方便地在基础环境、项目、用户等维度做镜像继承，便于团队成员维护相同项目时<strong>提升环境创建效率。</strong></p></li><li><p>相比个人虚拟机，有利于<strong>提升资源利用率</strong>，同时环境搭建更便捷。</p></li></ul><h4 id="云服务对接" tabindex="-1">云服务对接 <a class="header-anchor" href="#云服务对接" aria-label="Permalink to &quot;云服务对接&quot;">​</a></h4><p>在一些云厂商的云开发产品中，除了容器化工作空间和 WebIDE 之外，也包含了与其他上下游服务的对接。例如在阿里云的 CloudIDE 产品中，就包含了一键部署等功能。而在自研的体系内，也可通过类似的方式将各个环节的工作流程进行串联，从而形成整体工作流程的效率提升。</p><h3 id="云开发的效率提升应用场景" tabindex="-1">云开发的效率提升应用场景 <a class="header-anchor" href="#云开发的效率提升应用场景" aria-label="Permalink to &quot;云开发的效率提升应用场景&quot;">​</a></h3><p>当我们以团队的方式来实践云开发时，能够找到一些效率优化的切入点，下面仅列举一些代表性的应用场景。</p><h4 id="项目篇" tabindex="-1">项目篇 <a class="header-anchor" href="#项目篇" aria-label="Permalink to &quot;项目篇&quot;">​</a></h4><ol><li><p><strong>加速创建新项目</strong>：在云开发模式下，可以将包含依赖安装的项目模板存储为镜像，开发者选择镜像并创建容器后即可直接预览效果或进入开发，免去下载模板与安装依赖的时间。</p></li><li><p><strong>项目依赖版本统一</strong>：npm 依赖包在不同环境下安装时，版本自动升级的问题常常对开发测试造成影响（尽管可以通过 &quot;npm ci&quot; 等命令锁定版本，但在实际业务中普及率并不高，这个问题在部署效率篇中会再次谈到）。而在云开发模式下，可以将 node_modules 依赖目录（或 Yarn 的 .pnp 目录）与依赖版本做关联，存储为独立镜像，供开发、测试、部署使用。在相应的流程中就可以免去安装依赖，以达到各环境下依赖版本的统一管理，同时也提升了各环境的处理效率。</p></li></ol><h4 id="工具篇" tabindex="-1">工具篇 <a class="header-anchor" href="#工具篇" aria-label="Permalink to &quot;工具篇&quot;">​</a></h4><ol><li><p><strong>开箱即用的开发环境</strong>：在开发环境维度上，通过云开发模式，可以将开发所需的不同基础环境以及各种应用程序制作成开发环境镜像，供开发者自由选择。刚入职的新人无须花费大量时间去学习和安装调试项目的开发环境，真正达到开箱即用的效果。</p></li><li><p><strong>自定义辅助工具的快速共享和共建</strong>：前端工具的共享不再局限于各自安装 npm 包的方式，通用的配置、公共的依赖、针对特定项目类型的代码片段、emmet 缩写等，一切能想到的辅助工具，都可以在云平台的模式下快速落地，集成到各开发者的工作空间中。同时，对于工具的作者来说，在云平台的方式下也更容易获取到安装使用量等数据反馈，让优秀的工具得以呈现和传播。</p></li></ol><h4 id="流程篇" tabindex="-1">流程篇 <a class="header-anchor" href="#流程篇" aria-label="Permalink to &quot;流程篇&quot;">​</a></h4><ol><li><p><strong>连接代码仓库与开发环境</strong>：云开发的模式可以缩短代码仓库与开发环境的距离，通过项目与开发环境的配置关联，可以从代码仓库的任意 commit 直连创建云端工作空间或进入已有工作空间。</p></li><li><p><strong>连接 Pipeline 与开发环境</strong>：在构建部署的过程中，遇到构建问题或其他测试流程问题的情况时，可以通过对应的提交信息，直连创建临时修复用途的项目工作空间，以便快速调试和修复部署。</p></li></ol><h3 id="使用云开发的注意点" tabindex="-1">使用云开发的注意点 <a class="header-anchor" href="#使用云开发的注意点" aria-label="Permalink to &quot;使用云开发的注意点&quot;">​</a></h3><p>尽管随着 WebIDE 的兴起，越来越多的云开发产品开始呈现，但是作为一种新兴的工作模式，在尝试规模化使用前还是需要考虑到可能出现的一些问题：</p><ol><li><p><strong>代码安全问题</strong> ：代码安全是首先需要考虑的问题。通常在代码仓库中我们会设置具体项目的<strong>访问权限</strong> ，云开发模式下的镜像与空间访问设计上也应当注意对这部分权限的验证。此外，对于公司内部的项目，在使用云开发模式时应当首选<strong>支持内部部署</strong> 的云服务或<strong>搭建自维护</strong>的云服务，而非将代码上传到外部云空间中。</p></li><li><p><strong>服务搭建与维护</strong>：要在团队内使用云开发的功能，需要考虑服务搭建的方式和成本。对于大厂而言，云服务资源和技术建设比较丰富，搭建自维护的云开发服务可以提供更多灵活的功能；而对于中小规模的技术团队而言，购买使用一些支持内部部署的现有云开发服务是更好的选择。</p></li><li><p><strong>服务降级与备份</strong>：由于云开发模式下将开发环境与工作代码都存储于云端，需要考虑当云端服务异常时的降级策略。例如是否有独立的环境镜像可供下载后离线使用，以及工作空间内的暂存代码是否有备份，可供独立下载使用。</p></li></ol><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>这一课时我们先介绍了云开发的概念，以及相比于现在的开发方式，它能解决哪些方面的问题。然后一起了解了几款有代表性的云产品，其中需要重点关注的是 VS Code 系的 Codespace 产品。此外，如果你对定制 WebIDE 感兴趣，从 Theia 入手会是比较好的选择。</p><p>在介绍完产品后，我们又讨论了云开发这种模式的一般技术要素，以及使用它所能带来的几个比较明确的效率提升场景。最后还有几个新技术对应的风险点，在真正尝试选择云开发方案前需要被考虑到。</p><p>今天的<strong>课后思考题</strong>是：希望你能实际体验课中讲到的一些产品，可以在课后讨论中分享你使用后的感受。</p>',55),l=[i];function s(n,p,d,h,c,u){return e(),o("div",null,l)}const _=t(r,[["render",s]]);export{b as __pageData,_ as default};
