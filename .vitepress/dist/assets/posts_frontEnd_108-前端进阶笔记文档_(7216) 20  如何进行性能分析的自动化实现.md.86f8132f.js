import{_ as p,j as i,o as a,h as s,k as e,f as r,Q as t,s as l}from"./chunks/framework.d3daa342.js";const b=JSON.parse('{"title":"20如何进行性能分析的自动化实现","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/108-前端进阶笔记文档/(7216) 20  如何进行性能分析的自动化实现.md","filePath":"posts/frontEnd/108-前端进阶笔记文档/(7216) 20  如何进行性能分析的自动化实现.md","lastUpdated":1696682708000}'),h={name:"posts/frontEnd/108-前端进阶笔记文档/(7216) 20  如何进行性能分析的自动化实现.md"},c=t('<h1 id="_20如何进行性能分析的自动化实现" tabindex="-1">20如何进行性能分析的自动化实现 <a class="header-anchor" href="#_20如何进行性能分析的自动化实现" aria-label="Permalink to &quot;20如何进行性能分析的自动化实现&quot;">​</a></h1><p>如今网络速度越来越快、机器性能也越来越好，用户对于页面加载要求也随之增高，页面白屏过久、操作卡顿等问题对用户来说是无法忍受的，因此性能分析成了前端开发工作中的家常便饭。</p><p>常见的性能分析解决方案会在下一讲介绍，今天我先带你了解前端性能分析常用的工具，以及如何使用这些工具实现性能分析的自动化。</p><p>通常来说，前端的性能分析可以从<strong>时间</strong> 和<strong>空间</strong>两个角度来进行。</p><ul><li><p>时间：常见耗时，如页面加载耗时、渲染耗时、网络耗时、脚本执行耗时等。</p></li><li><p>空间：资源占用，包括 CPU 占用、内存占用、本地缓存占用等。</p></li></ul><p>要分析和查看这些时间和空间的数据，需要用到性能分析工具。现在大多数前端项目的性能问题都是通过 Chrome DevTools 进行定位和分析的，因此下面我先来介绍一下 Chrome DevTools 工具。</p><h3 id="chrome-devtools" tabindex="-1">Chrome DevTools <a class="header-anchor" href="#chrome-devtools" aria-label="Permalink to &quot;Chrome DevTools&quot;">​</a></h3><p>相信大家都在开发过程中使用过 Chrome DevTools，它提供了特别丰富的开发者调试功能，这里我主要介绍两个面板：</p><ol><li><p>Lighthouse 面板，该面板用于自动化分析网站加载时存在的性能问题，并提出推荐的优化方案；</p></li><li><p>Performance 面板，该面板用于记录和分析网站在运行时的性能数据。</p></li></ol><p>这两个面板的功能有什么区别呢？我们又该在什么时候使用哪一个呢？</p><p>我先带大家来分别认识下。</p><h4 id="lighthouse" tabindex="-1">Lighthouse <a class="header-anchor" href="#lighthouse" aria-label="Permalink to &quot;Lighthouse&quot;">​</a></h4><p>使用 Lighthouse 可以快速了解自己网站在加载过程中存在的一些性能问题，并进行优化解决，它的前身是 Chrome DevTools 面板中的 Audits。</p><p>Lighthouse 面板的优势在于自动化、成本低，它会收集网站加载时的一些性能数据（Javascript/CSS 加载情况、HTTP 请求耗时、页面加载和渲染耗时等），并根据最佳实践来给每一项进行打分，同时针对低分项给出对应的优化方案。</p><p>我们先来看一下 Lighthouse 提供了怎样的一些功能。它的主要功能包括三个：</p><ul><li><p>在一系列的测试下运行网页，比如不同尺寸的设备和不同的网络速度；</p></li><li><p>检查页面对辅助功能指南的一致性，例如颜色对比度和 ARIA 最佳实践；</p></li><li><p>生成网页运行报告，比如网页性能、常见的统计耗时、网页的优化方向。</p></li></ul><p>使用 Lighthouse 提供的功能，在不到几分钟的时间内，Lighthouse 就可以给出这样一份报告。</p>',17),n=l("p",null,"可以看到，这份报告从 5 个方面来对页面进行分析，包括性能、辅助功能、最佳实践、搜索引擎优化和 PWA。通过这份报告，我们可以快速掌握网站加载的整体情况，并根据报告提供的优化方向进行优化。",-1),m=l("p",null,"想要知道 Lighthouse 是如何做到的，我们需要了解下 Lighthouse 内部的架构和工作原理。",-1),d=l("p",null,"Lighthouse 的组成部分主要包括四个：驱动（Driver）、收集器（Gatherers）、审查器（Audits）和报告（Report），如图所示。",-1),u=t('<p>可以看到，Lighthouse 的具体工作过程为：</p><ol><li><p>当网站页面开始加载之后，Lighthouse 会使用驱动（Driver）通过 Chrome DevTools Protocol 获取页面的性能数据；</p></li><li><p>驱动（Driver）获取到的数据会被收集器（Gatherers）进行收集，并输出被称为 Artifact 的结果；</p></li><li><p>Artifact 会作为审查器（Audits）的输入，审查器会对其运行测试，然后分配通过/失败/得分的结果；</p></li><li><p>审查的结果给到报告（Report），对各个部分进行加权和统计得到面向用户的报告（如最佳实践），并将该报告渲染给用户。</p></li></ol><p>其中，Chrome DevTools Protocol 是我们在 Chrome 中实现性能测试自动化中非常重要的协议，后面会在性能分析自动化部分进行介绍，这里先不进行过多的拓展。</p><p>如果你希望短时间内对你的网站进行较全面的评估，可以使用 Lighthouse 来跑一下分数，确定大致的优化方向。但 Lighthouse 不能用于运行时的性能分析，也无法给到最佳实践以外更多的数据和建议。</p><p>而 Performance 面板则可以弥补 LightHouse 的不足。</p><h4 id="performance-面板" tabindex="-1">Performance 面板 <a class="header-anchor" href="#performance-面板" aria-label="Permalink to &quot;Performance 面板&quot;">​</a></h4><p>Performance 面板同样有个前身，叫 Timeline 面板，它常常在页面运行时使用，比如用户点击操作之后的逻辑执行、页面滚动时的页面渲染情况，等等。</p><p>我们先来看看 Performance 提供了什么功能。</p><p>Performance 面板功能特别多，一般来说我们需要先对页面运行过程进行录制。录制过程最好打开隐身模式，这样可确保 Chrome 不被拓展插件影响，从而以干净的状态运行。</p><p>录制完成后，DevTools 会进行数据处理，然后在 Performance 面板上显示结果，如图所示。</p>',10),_=t('<p>一般来说，我们需要分析和使用到 Performance 面板上的这些结果。</p><ul><li><p><strong>FPS 图表</strong>：当在 FPS 上方看到红色条形时，表示帧速率下降得太低，以至可能损害用户体验。</p></li><li><p><strong>CPU 图表</strong>：CPU 图表的颜色对应于性能板的底部的 Summary 选项卡。</p></li><li><p><strong>火焰图</strong>：火焰图直观地表示出了内部的 CPU 分析，横轴是时间，纵轴是调用指针，调用栈最顶端的函数在最下方；启用 JS 分析器后，火焰图会显示调用的每个 JavaScript 函数，可用于分析具体函数。</p></li><li><p><strong>Buttom-up</strong>：此视图可以看到某些函数对性能影响最大，并能够检查这些函数的调用路径。</p></li></ul><p>具体要怎么定位某些性能瓶颈，可以参考<a href="https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">官方文档系列文章</a>，这里就不进行更详细的拓展了。</p><p>我们还可以使用 Performance Monitor，来对页面运行过程中的一些性能指标进行监控，比如 CPU 占用率、JS 内存使用大小、内存中挂载的 DOM 节点个数、事件监听数，等等。</p><p>通过 Performance 面板，我们可以得到详细的运行时性能数据，包括函数的调用情况（调用耗时、调用堆栈）、各类事件（渲染事件、加载事件、脚本事件等）的顺序与耗时、CPU 占用情况，等等。</p><p>我们可根据这些数据定位到具体哪段脚本的执行导致的性能问题，从而得到解决方案。</p><p>使用 Performance 面板进行性能分析，具体的分析过程会比较烦琐，同时上手成本也不低，除了基本的页面加载耗时、网络耗时。如果你希望具体定位到哪一块代码的执行有问题，则需要结合前面介绍的 FPS、CPU、火焰图等一点点来进行更详细的分析。</p><p>同时，性能分析并不是一蹴而就的工作，往往在我们对前端应用完成性能优化之后，随着新功能的迭代、项目规模的扩大，很可能在网页运行一段时间之后又会变慢、出现卡顿。</p><p>那么，为了降低性能分析工作的成本，同时避免新功能的开发、代码重构等导致的性能下降未能及时发现的问题，我们可以考虑将性能分析自动化。</p><h3 id="性能分析自动化" tabindex="-1">性能分析自动化 <a class="header-anchor" href="#性能分析自动化" aria-label="Permalink to &quot;性能分析自动化&quot;">​</a></h3><p>如果想要自动化地进行性能分析，意味着我们需要拿到浏览器的运行性能数据。</p><p>一般来说，我们可以通过集成测试、自动化测试等技术手段让项目的代码运行在浏览器中，并根据脚本来运行相应的功能。在此基础上，我们还需要获取网页加载和运行的性能数据。</p><p>结合前面提到的性能分析工具，我们可以考虑分别将 Lighthouse 和 Performance 功能进行自动化。</p><p>先来看 Lighthouse 自动化。</p><h4 id="lighthouse-自动化" tabindex="-1">Lighthouse 自动化 <a class="header-anchor" href="#lighthouse-自动化" aria-label="Permalink to &quot;Lighthouse 自动化&quot;">​</a></h4><p>Lighthouse 自动化很简单，因为它提供了脚本的方式使用。因此，我们可以通过自动化任务跑脚本的方式，使用 Lighthouse 跑分析报告，通过对比以往的数据来进行功能变更、性能优化等场景的性能回归。</p><p>使用 Lighthouse 的优势在于开发成本低，只需要按照官方提供的配置来调整、获取自己需要的一些数据，就可以快速接入较全面的 Lighthouse 拥有的性能分析能力。</p><p>前面也说过，Lighthouse 是使用驱动（Driver）<strong>通过 Chrome DevTools Protocol 获取页面加载过程中的性能数据</strong>。其实通过 Chrome DevTools Protocol，我们还可以获取在 Performance 中的一些性能数据。</p><p>那么 Chrome DevTools Protocol 到底是什么呢？我们一起来看一下。</p><h4 id="chrome-devtools-protocol" tabindex="-1">Chrome DevTools Protocol <a class="header-anchor" href="#chrome-devtools-protocol" aria-label="Permalink to &quot;Chrome DevTools Protocol&quot;">​</a></h4><p><a href="https://chromedevtools.github.io/devtools-protocol/?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">Chrome DevTools Protocol</a>允许第三方对基于 Chrome 的网站进行检测、调试、分析等操作。</p><p>也就是说，我们可以自行开发工具，通过 Chrome DevTools Protocol 来获取 Chrome 中网站运行的性能数据。</p><p>那么，这个 Chrome DevTools Protocol 到底是什么呢？我们可以从 Chrome DevTools 和浏览器内核的通信过程说起。</p><p>实际上，我们使用的 Chrome DevTools，也就是 Chrome 中的浏览器调试工具界面，其实是一个 Web 应用。</p><p>当我们打开 Chrome DevTools 的时候，浏览器内核 Chromium 本身会作为一个服务端，它会通过 WebSocket 与 Chrome DevTools 进行通信，过程如下：</p><ol><li><p>DevTools 将作为客户端，与作为服务端的 Chromium 建立连接；</p></li><li><p>DevTools 通过 HTTP 获取 HTML、JavaScript 和 CSS 资源，并进行加载；</p></li><li><p>资源加载后，DevTools 会建立与浏览器的 WebSocket 连接；</p></li><li><p>Chrome DevTools Protocol 基于 WebSocket，它利用 WebSocket 建立连接 DevTools 和浏览器内核的快速数据通道。</p></li></ol><p>也就是说，DevTools 和浏览器内核的数据通信，是通过 Chrome DevTools Protocol 来完成。同样的，当我们通过 DevTools 从 Windows、Mac 或 Linux 计算机远程调试 Android 设备上的实时内容时，使用的也是该协议。</p><p>那么，Chrome DevTools Protocol 这个协议它到底提供了什么内容呢？</p><p>Chrome DevTools Protocol 具有与浏览器的许多不同部分（例如页面、Service Worker 和扩展程序）进行交互的 API。该协议把不同的操作划分为了不同的域（domain），每个域负责不同的功能模块，比如<code>DOM</code>、<code>Debugger</code>、<code>Network</code>、<code>Console</code>和<code>Performance</code>等，可以理解为 DevTools 中的不同功能模块。</p><p>这里我主要介绍几个和性能相关的域。</p><ul><li><p><code>Performance</code>域：可获取运行时性能指标，包括页面 DOM 节点数量、Javascript 栈数量、页面布局耗时等。</p></li><li><p><code>Tracing</code>域：可获取页面加载的 DevTools 性能跟踪，可以使用<code>Tracing.start</code>和<code>Tracing.stop</code>创建可在 Chrome DevTools 或时间轴查看器中打开的跟踪文件。</p></li><li><p><code>Runtime</code>域：通过远程评估和镜像对象暴露 JavaScript 的运行时，可以获取 JavaScript 栈的使用情况。</p></li><li><p><code>Network</code>域：可以分析网络相关的性能。</p></li><li><p>其他涉及 DOM 节点、JS 执行等相关数据的域。</p></li></ul><p>通过使用 Chrome DevTools Protocol，我们可以获取 DevTools 提供的很多数据，包括网络数据、性能数据、运行时数据，比如获取 JS 的 Runtime 数据，像<code>window.performance</code>、<code>window.chrome.loadTimes()</code>等。</p><p>对于如何使用该协议，其实已有针对这个协议封装出不同语言的库，包括 Node.js、Python、Java 等，可以在<a href="https://github.com/ChromeDevTools/awesome-chrome-devtools#chrome-devtools-protocol?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">awesome-chrome-devtools</a>这个项目中找到。</p><p>除了直接使用 Chrome DevTools Protocol 之外，我们还可以使用<a href="https://github.com/GoogleChrome/lighthouse/blob/master/docs/puppeteer.md?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">Puppeteer</a>的<a href="https://pptr.dev/#?product=Puppeteer&amp;version=v1.13.0&amp;show=api-class-cdpsession&amp;fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">CDPSession</a>，它们封装了 Chrome DevTools Protocol 能力，提供了更加便捷的使用方式，比如：</p><ul><li><p>通过<code>session.sendmethod</code>调用 Chrome DevTools Protocol 协议方法；</p></li><li><p>通过<code>session.on</code>方法订阅 Chrome DevTools Protocol 协议事件。</p></li></ul><p>既然我们可以拿到这些性能数据，那么也可以根据业务的需要对这些数据进行自动化的分析，结合前端工程化在项目上线前进行自动化任务的执行、检测、生成对比报告等，实现自动化性能监控。</p><h4 id="自动化性能监控" tabindex="-1">自动化性能监控 <a class="header-anchor" href="#自动化性能监控" aria-label="Permalink to &quot;自动化性能监控&quot;">​</a></h4><p>现在我们已经知道，通过 Chrome DevTools Protocol，可以实现在一个模拟的浏览器环境中，通过一系列的工具、规则去运行你的页面，提取一些性能指标，得出一个审计报告。</p><p>上面提到的性能测试过程，属于前端性能监控中的合成监控（Synthetic Monitoring，SYN）方式。合成监控的使用场景不多，一般可能出现在开发和测试的过程中，例如结合流水线跑性能报告、定位性能问题时本地跑的一些简单任务分析等。</p><p>该方式的优点显而易见：</p><ul><li><p>可采集更丰富的数据指标，例如结合 Chrome DevTools Protocol 获取到的数据；</p></li><li><p>较成熟的解决方案和工具，实现成本低；</p></li><li><p>不影响真实用户的性能体验。</p></li></ul><p>至于如何搭建这样一套自动化分析系统，其实 Lighthouse 便是最好的参考例子。前面我们有介绍它的架构和工作原理，同时它也是开源的一个自动化工具，有现成的代码可以作为参考。</p><p>由于代码的运行环境是模拟环境，因此很多线上的运行问题难以发现。为了解决这个问题，我们还可以进行真实用户监控（Real User Monitoring，RUM）。</p><p>真实用户监控，就是用户在我们的页面上访问，访问之后就会产生各种各样的性能指标。常见的一些性能监控包括加载耗时、DOM 渲染耗时、接口耗时统计等，我们已经在第 19 讲介绍前端监控体系的时候有所介绍。</p><p>真实用户监控往往需要结合业务本身的前后端架构设计来建设，其优点也比较容易理解：</p><ul><li><p>完全还原真实场景，减去模拟成本；</p></li><li><p>数据样本足够抹平个体的差异；</p></li><li><p>采集数据可用于更多场景的分析和优化。</p></li></ul><p>对比合成监控，真实用户监控在有些场景下无法拿到更多的性能分析数据，例如哪些代码执行中导致了 CPU 占用高、内存占用高。但真实用户监控也有自身的优势，在各种环境下的一些运行耗时问题（例如 TCP、DNS 连接耗时过高），使用合成监控是难以发现的。</p><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3><p>今天我主要介绍了前端性能分析中常用的工具，以及它的底层工作原理，同时还介绍了要如何将前端性能分析进行自动化。</p><p>正如前端性能分析存在门槛高、耗时长、频繁发生等问题，我们可以转换思路将其进行自动化处理。同样的，我们会被烦琐的工作内容困扰的时候，也可以尝试如果跳出工作内容本身来进行思考，或许会有更优解。</p><p>你在工作中是否也存在可以使用自动化工具解决的问题呢？欢迎在留言区留下你的思考。</p>',51);function g(P,T,v,C,D,f){const o=i("Image");return a(),s("div",null,[c,e(o,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M00/44/2E/CioPOWC94O2ADawaAAHbyQYC3Zc060.png"}),r(),n,m,d,e(o,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M01/44/26/Cgp9HWC94PSAKUCtAAF_GYx_fsI839.png"}),r(),u,e(o,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M00/44/2E/CioPOWC94P6AK4WpAAHus-4OMJo476.png"}),r(),_])}const A=p(h,[["render",g]]);export{b as __pageData,A as default};
