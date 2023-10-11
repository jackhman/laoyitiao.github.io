import{_ as r,D as o,o as i,g as _,J as t,h as p,Q as a}from"./chunks/framework.f67d7268.js";const T=JSON.parse('{"title":"01双线程模型：为什么小程序不用浏览器的线程模型？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5094) 01  双线程模型：为什么小程序不用浏览器的线程模型？.md","filePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5094) 01  双线程模型：为什么小程序不用浏览器的线程模型？.md","lastUpdated":1696682708000}'),s={name:"posts/frontEnd/103-云原生微信小程序开发实战文档/(5094) 01  双线程模型：为什么小程序不用浏览器的线程模型？.md"},n=a('<h1 id="_01双线程模型-为什么小程序不用浏览器的线程模型" tabindex="-1">01双线程模型：为什么小程序不用浏览器的线程模型？ <a class="header-anchor" href="#_01双线程模型-为什么小程序不用浏览器的线程模型" aria-label="Permalink to &quot;01双线程模型：为什么小程序不用浏览器的线程模型？&quot;">​</a></h1><p>你好，我是俊鹏，今天是第一节课，我想和你聊一聊微信小程序表层知识中的双线程模型。主要探讨一下它的技术背景、线程间的分工和通信模式。</p><p>在工作以及一些技术分享中，我经常被人问到这样一个问题：&quot;微信小程序与 Web 网站在技术层面的主要区别是什么？&quot;我相信你也有类似的困惑，因为在编程语言和编程习惯上，小程序开发与 Web 前端开发非常相似（比如都用 JavaScript 语言、与 HTML/CSS 非常相似的 WXML/WXSS 等），可它却没有直接用原生的前端技术。</p><p>这个问题的根源在于与 Web 网站相比，以微信为宿主的小程序更需要考虑安全、性能等因素，因为要考虑小程序不会对微信产生安全隐患，同时要尽量达到接近原生应用的用户体验。这也是为什么小程序不直接用浏览器的线程模型，非要自己弄一套双线程模型最主要的两个原因。</p><p><strong>那什么是小程序的双线程模型呢？</strong> 我觉得要理解这个问题，你先要对浏览器的线程模型有一定的了解，因为理解一个新概念或技术的最好的方法就是给它一个参照物，熟悉浏览器的线程管理模式对你理解今天的内容有很大的帮助。相信学完今天的内容之后，你可以明确地知道浏览器的线程管理模式为什么不适合小程序了。</p><h3 id="浏览器并不是单线程而是多进程的" tabindex="-1">浏览器并不是单线程而是多进程的 <a class="header-anchor" href="#浏览器并不是单线程而是多进程的" aria-label="Permalink to &quot;浏览器并不是单线程而是多进程的&quot;">​</a></h3><p>刚成为一名前端工程师的时候，你肯定不止一次地被面试官问到要怎么理解单线程（作为前端核心技能之一的 JavaScript 语言是单线程的，充分理解并掌握单线程的运作方式对一个前端工程师来说是最基本的要求）。但是很多初学者容易走入的一个误区是：错误地把 JavaScript 语言的单线程理解为&quot;浏览器单线程&quot;。</p><p>事实上，浏览器内部架构很复杂，只不过在处理 GUI 渲染线程和 JavaScript 逻辑脚本线程上用了互斥、阻塞的管理模式，让一些开发者产生了误解，这是为什么呢？</p><p>以 Chrome 浏览器为例，点击右上角的设置按钮然后进入&quot;更多工具&quot;-&gt;&quot;任务管理器&quot;会看到这样的弹窗：</p>',9),l=a("<p>你能看到，Chrome 开启了多个进程，包括浏览器进程、网络进程、GPU 进程等，这些都是通用的进程。注意到没有，图里有两个标签页进程，Chrome 为每个标签页开启了一个独立的渲染进程（ Renderer Process ），每个进程之间的资源（ CPU、内存等）和行为（ UI、逻辑等）互不共享，所以即便某个标签页崩溃了也不会影响其他标签页。</p><p>而在每个标签页进程中，浏览器会把不同的工作交给对应的线程，比如 GUI 渲染线程负责把 HTML 渲染成可视化的 UI；JavaScript 引擎线程负责解析和运行 JavaScript 代码逻辑；定时触发器线程负责处理 setTimeout/setInterval 定时器等。</p><p><strong>我多说一句，这里有一个很容易搞混的误区：</strong> setTimeout/setInterval 并不是 JavaScript 语言的一部分，而是运行时（最初是浏览器，后来 Node.js 也提供了支持）提供的能力。</p><p>接着说回来，其中 GUI 渲染线程和 JavaScript 引擎线程是互斥的，JavaScript 在执行期间会阻塞 UI 的渲染，甚至如果脚本执行时间太长会由于页面长时间无响应然后崩溃，正是 GUI 渲染线程和 JavaScript 引擎线程之间的这种互斥、阻塞的线程管理方式，让一部分前端开发者以为浏览器是单线程的。</p><p><strong>那为什么 JavaScript 被设计成单线程的呢？</strong></p><p>JavaScript 祖师爷只用了 10 天就创造了这门语言，最初他的想法只是在浏览器中提供一些简单的脚本逻辑用来处理用户交互、DOM 操作等，所以从设计上必须遵循两点：</p><ul><li><p>语法简单；</p></li><li><p>运行机制简单。</p></li></ul><p>在语法上，JavaScript 借鉴了 Java，但是去除了很多复杂的设定，比如类型声明、模块体系（后来加入）等。</p><p>在运行机制上，JavaScript 并没有像 Java 那样提供多线程能力，最主要就是为了避免多线程操作 DOM 造成 UI 冲突。比如存在多个线程同时操作同一个 DOM，浏览器该如何判断最终的 UI 效果是采用哪个线程的结果？这是经典的线程安全（也称为线程同步）问题，在多线程编程领域有很多解决方案，比如加入锁机制，但这样却又带来了更多的复杂性，与 JavaScript 简单易用的设计初衷相违背。</p><p>这同时也解释了为什么 GUI 渲染线程与 JavaScript 引擎线程是互斥的：JavaScript 代码有修改DOM 的权限。</p><p>当 JavaScript 代码被执行时，GUI 渲染线程会被挂起，等待 JavaScript 引擎线程空闲时再被执行，以免在渲染期间被 JavaScript 重复地修改 DOM 造成不必要的渲染压力。采用互斥的模式等待 JavaScript 代码执行完毕后，可以保证渲染是最终的执行结果。所以浏览器的空闲（Idle）时长也成了衡量网站性能的重要指标之一，空闲时长多代表 JavaScript 逻辑不密集以及 DOM改动频率低，这种情况下浏览器可以更快速顺畅地响应用户的交互行为，如下图：</p>",11),c=a('<p>后来，HTML5 引入了 Web Worker，提供多线程执行 JavaScript 代码的能力，但是与其他编程语言不同的是，Worker 线程与主线程并不是扁平的，而是一种主从（ Master-Slave）多线程模型。</p><p>Worker 内的 JavaScript 代码不能操作 DOM，可以将其理解为线程安全的。<strong>你要记住这一点，这是后面讲小程序双线程模型一个重要的基础。</strong></p><p>那么为什么微信小程序不直接使用浏览器的线程模型呢？这需要从产品和技术两个角度对比小程序与 Web 网站的差异。</p><h3 id="为什么小程序不使用浏览器的线程模型" tabindex="-1">为什么小程序不使用浏览器的线程模型 <a class="header-anchor" href="#为什么小程序不使用浏览器的线程模型" aria-label="Permalink to &quot;为什么小程序不使用浏览器的线程模型&quot;">​</a></h3><p>我刚接触小程序开发时，经常&quot;嫌弃&quot;它跟 Web 相比阉割弱化的能力、跟 Vue 相比简单到过分的语法等。当时，我几乎觉得小程序就是微信仗着自己庞大的用户量搞技术垄断。</p><p>但是，随着对技术和产品的不断深入理解，我对小程序的态度也有了转变，由&quot;嫌弃&quot;变成了敬佩，因为在充分理解了小程序的产品定位后，<strong>我发现双线程模型是在小程序这类产品场景下的最优解。</strong> 那小程序是一款什么样的产品呢？</p><p>小程序的宿主是微信，但是小程序版本的迭代是独立的，升级更新不依赖宿主，这一点跟 Web 网站是相同的。也就是说，小程序沿袭了 Web 的某些优势，但它并不是 Web，目前 Web 相关的技术已经相当全面，能够承载一些非常庞大的应用程序，比如 3D 地图、游戏等。</p><p>而小程序的定位是小而美、用完就走，不追求在微信中实现全部的 Web 能力，所以和 Web 来比能力上肯定差一些，同时具备一些微信提供的原生能力，比如原生组件、系统级别和微信生态的 API 等等。</p><p>另外，小程序与微信的关系与网站与浏览器的关系不同，更接近 CodePen、JSFiddler 这类在线编程平台（课里简称平台）中每个程序案例（简称案例）与平台的关系。</p><p>从技术的角度上，平台最核心的一个考量点是为案例提供足够能力的前提下，保证案例的逻辑不会危及平台的安全。想象一下，假如你能够在 CodePen 上编写一个程序来获取 CodePen 的私密信息，可能第二天 CodePen 就崩溃然后炒掉所有员工。</p><p>在这样的产品基调下进行技术选型，接下来就是架构师和程序员的工作了。</p><p><strong>还是以 CodePen 为例，假如让你来设计这样的编程平台，你会用什么技术呢？</strong> 可能你第一个想到的是用 iframe，因为你可以在 iframe 内使用全部 Web 能力。事实上 CodePen 确实用 iframe 来呈现程序的效果，但是并不会把你输入的 JavaScript 代码完全拷贝到 iframe 内运行，而是代码会经过一次编译流程之后才会被注入 iframe 内。这样做的出发点之一是基于安全的考虑，在编译过程中将一些危险的代码剔除。</p><p><strong>所以，你不能直接使用 iframe，而是需要引入额外的 JavaScript 编译器。</strong> 除了保证安全之外，还考虑到了性能（性能问题是 iframe 老生常谈的问题了，你应该知道，我就不多说了）。CodePen 一定要保证每个案例的 JavaScript 代码是线程安全的，最基本的就是要禁止程序操作CodePen 网站的 DOM ，如何实现这一点呢？你有两个方法：</p><ul><li><p>一个是 Web Worker；</p></li><li><p>另一个是使用 Shadow DOM。</p></li></ul><p>Web Worker 是线程安全的，Worker 内的 JavaScript 代码无法获取 Window 和 Document 对象，也就无法操作 DOM。除此之外，由于 Worker 的线程安全特性，Worker 内的代码运行过程中不会阻塞外层的 GUI 渲染线程，两者可以并行。</p><p>而 Shadow DOM 是 Web Components 规范的一部分，将 ShadowRoot 的模式设置为 closed 就可以禁止获取到 ShadowRoot 节点，从而也无法操作其内部的 DOM。</p><p><strong>不过，你要注意，</strong> Shadow DOM 的兼容性比 Web Worker 更差，距大规模使用的日期还很遥远，所以 Web Worker 的方案更现实一点。</p><p>这样就形成了一个简易的双线程模型：Worker 线程负责计算，将结果通过 postMessage 传递给主线程，主线程负责渲染。</p>',18),d=a('<p>但是这个模型存在比较严重的性能问题，Web Worker 非常耗费资源，除去计算消耗以外，与主线程的通信过程对性能的损耗也非常严重。</p><p>那有没有办法实现跟 Web Worker 一样的线程安全，同时又兼顾性能保证良好的用户体验呢？这便是微信小程序采用双线程模型的主要目的。</p><h3 id="安全高效的小程序双线程模型" tabindex="-1">安全高效的小程序双线程模型 <a class="header-anchor" href="#安全高效的小程序双线程模型" aria-label="Permalink to &quot;安全高效的小程序双线程模型&quot;">​</a></h3><p>虽然我用 CodePen 这类编程平台做类比，但小程序与 CodePen 的技术需求并不完全相同，主要区别在于小程序并不需要支持所有的 HTML 标签，只提供有限的几类 UI 组件，根据小程序产品定位，我们可以归纳出小程序的主要技术需求可以归纳为下面这样几点。（任何新技术或架构都是为了解决特定的问题，所以你有必要了解小程序的主要技术需求。）</p><ul><li><strong>限制 UI 组件类型，只允许声明指定的几个组件</strong></li></ul><p>小程序在声明组件时并不是使用原生的 HTML 标签，而是只能够通过微信提供的几种内置基础组件，当然你也可以自定义组件（后面的课程会讲），但也是通过对内置基础组件的组合来实现。</p><ul><li><strong>保证逻辑线程安全，不允许直接操作 UI 组件</strong></li></ul><p>小程序更新 UI 的方式与 Vue/React 等 MVVM 框架类似，JavaScript 代码不能直接操作 DOM，而是通过更新状态（ setState ）的方式异步更新 UI ，这个过程中会用到 VDOM 和高效的 diff 算法（这两点并不是我们要讨论的内容，你课下可以自己搜索相关资料）。</p><ul><li><strong>能够在线更新，不依赖微信</strong></li></ul><p>小程序的宿主是微信，如果使用纯 Native 实现，那么小程序的版本更新必须依赖微信，跟微信的代码一起发版，这样肯定是不行的。如果是纯 Web 实现，安全和性能就很难得到保障。</p><p>小程序需要既能够像 Web 一样将资源托管在云端，更新独立；同时又能够保证足够好的安全性和性能。所以最终小程序采用了 Hybrid-混合的架构模式：<strong>使用 Webview 渲染 UI、使用类似Web Worker 的独立线程运行逻辑，这就是接下来要讲的双线程模型。</strong></p><ul><li><strong>性能需尽量提升，保证用户体验</strong></li></ul><p>前面提到的基于 Web Worker 的简易双线程模型性能是很大的问题，小程序的双线程模型并不是使用 Web Worker 子线程，而是一个独立的&quot;主线程&quot;，这样能够保证相对较好的性能。</p><h4 id="渲染线程和逻辑线程" tabindex="-1">渲染线程和逻辑线程 <a class="header-anchor" href="#渲染线程和逻辑线程" aria-label="Permalink to &quot;渲染线程和逻辑线程&quot;">​</a></h4><p>小程序的双线程指的就是渲染线程和逻辑线程，这两个线程分别承担UI的渲染和执行 JavaScript 代码的工作。如下图所示：</p>',15),u=a('<p>渲染线程使用 Webview 进行 UI 的渲染呈现。Webview 是一个完整的类浏览器运行环境，本身具备运行 JavaScript 的能力，但是小程序并不是将逻辑脚本放到 Webview 中运行，而是将逻辑层独立为一个与 Webview 平行的线程，使用客户端提供的 JavaScript 引擎运行代码，iOS 的JavaScriptCore、安卓是腾讯 X5 内核提供的 JsCore 环境以及 IDE 工具的 nwjs 。</p><p>并且逻辑线程是一个只能够运行 JavaScript 的沙箱环境，不提供 DOM 操作相关的 API，所以不能直接操作 UI，只能够通过 setData 更新数据的方式异步更新 UI。</p><h4 id="事件驱动的通信方式" tabindex="-1">事件驱动的通信方式 <a class="header-anchor" href="#事件驱动的通信方式" aria-label="Permalink to &quot;事件驱动的通信方式&quot;">​</a></h4><p>你要注意上图渲染线程和逻辑线程之间的通信方式，与 Vue/React 不同的是，小程序的渲染层与逻辑层之间的通信并不是在两者之间直接传递数据或事件，而是由 Native 作为中间媒介进行转发。</p><p>整个过程是典型的事件驱动模式：</p><ul><li><p>渲染层（也可以称为视图层）通过与用户的交互触发特定的事件 event；</p></li><li><p>然后 event 被传递给逻辑层；</p></li><li><p>逻辑层继而通过一系列的逻辑处理、数据请求、接口调用等行为将加工好的数据 data 传递给渲染层；</p></li><li><p>最后渲染层将 data 渲染为可视化的 UI。</p></li></ul><p>这种数据驱动 UI 的模式是近几年前端编程领域较为推崇的编程范式，如果你是一个超过 5 年开发经验的前端开发者的话，那么我相信在最初接触到这种模式的时候肯定有一些不适应，因为在此之前 JavaScript 操作 DOM 几乎是一种&quot;业内规则&quot;，甚至有不少针对前端入门的图书、博客和教材都是先从 DOM 操作讲起，现在看来这些确实有些不合时宜了。</p><p>而这样逻辑与渲染分离的线程分工模式一方面能够保证运行在逻辑线程沙箱内的 JavaScript 代码是线程安全的，另一方面由于渲染线程的计算量非常小从而保证了对用户交互行为的快速响应，提高了用户体验。</p><p>总的来说，跟浏览器的线程模型相比，小程序的双线程模型解决了或者说规避了 Web Worker 堪忧的性能同时又实现了与 Web Worker 相同的线程安全，从性能和安全两个角度实现了提升。可以概括地说，双线程模式是受限于浏览器现有的进程和线程管理模式之下，在小程序这一具体场景之内的一种改进的架构方案。</p>',9),S=a('<h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>在我看来，程序员的核心能力和竞争力并不是充分了解某种语言或框架的 API ，而是这些语言和框架底层的原理知识。对一个小程序的开发者来说，在工作中遇到技术难题时的解决方案往往是基于底层原理的（甚至更直白一点，当你找工作面试时，没人会问你小程序的语法），<strong>而这正是这节课作为第一讲的价值所在。</strong></p><p>通过了解小程序双线程模型的背景、设计、通信，希望能够让你更深入地理解小程序的底层架构。当然，了解小程序的双线程模型并不是我们唯一的目标，这些知识在一定程度上能对你日常开发工作产生一些启示，主要是性能方面：</p><ul><li><p>在保证功能的前提下尽量使用结构简单的 UI；</p></li><li><p>尽量降低 JavaScript 逻辑的复杂度；</p></li><li><p>尽量减少 setData 的调用频次和携带的数据体量。</p></li></ul><p>总的来说，这节课我们从整体架构层面讲解了小程序的双线程模型，并没有深入到每个技术细节，虽然这些细节不在这节课的范围之内，但并不代表没有学习的价值，所以这节课结束之后，我给你留的作业是在课后自发地去学习一下 V-DOM原理、 diff 算法、多线程编程等知识，以便夯实基础，游刃有余地学习后面的课程。</p><p>下节课我会带你了解小程序的授权模型，掌握微信的用户体系。</p><hr><p><strong>《大前端高薪训练营》</strong></p><p>拉勾直推机会+硬核实战干货，6个月助你轻松斩获高薪 offer。<a href="https://kaiwu.lagou.com/fe_enhancement.html?utm_source=lagouedu&amp;utm_medium=zhuanlan&amp;utm_campaign=%E5%A4%A7%E5%89%8D%E7%AB%AF%E9%AB%98%E8%96%AA%E8%AE%AD%E7%BB%83%E8%90%A5" target="_blank" rel="noreferrer">点此链接，快来领取！</a></p>',9);function h(g,m,v,W,b,I){const e=o("Image");return i(),_("div",null,[n,t(e,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/66/B9/CgqCHl-fuDiAehEwAAERrXvTGXk328.png"}),p(),l,t(e,{alt:"PXfjMi8mbOdL6P4g__thumbnail.png",src:"https://s0.lgstatic.com/i/image/M00/66/01/CgqCHl-c2DOABiLcAAC5BGnF97g901.png"}),p(),c,t(e,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/66/BD/CgqCHl-fvE2ASqyqAABAcZlVGwQ819.png"}),p(),d,t(e,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/66/B2/Ciqc1F-fvIOABE6fAABX_NuGbzc183.png"}),p(),u,t(e,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/6E/53/Ciqc1F-yNIuAXaJoAAVKCJBT-1I976.png"}),p(),S])}const J=r(s,[["render",h]]);export{T as __pageData,J as default};
