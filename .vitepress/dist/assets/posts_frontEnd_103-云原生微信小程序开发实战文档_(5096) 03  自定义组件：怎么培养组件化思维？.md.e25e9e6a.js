import{_ as o,j as e,o as t,g as c,k as n,Q as p,s,h as l}from"./chunks/framework.e0c66c3f.js";const L=JSON.parse('{"title":"为什么要学习自定义组件？ ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5096) 03  自定义组件：怎么培养组件化思维？.md","filePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5096) 03  自定义组件：怎么培养组件化思维？.md","lastUpdated":1696338709000}'),r={name:"posts/frontEnd/103-云原生微信小程序开发实战文档/(5096) 03  自定义组件：怎么培养组件化思维？.md"},i=p('<p>我们已经学习了微信小程序的双线程模型、授权模型，其中双线程模型是底层原理；授权模型是从整体角度（前端+后端）的登录流程，这两讲能帮你从底层和整体更深入地理解小程序。</p><p>今天这节课我们进入小程序的纯前端，一起学习自定义组件和它背后的组件化思想。</p><p>你要注意，小程序自定义组件的开发细节非常多，我不会事无巨细地全部讲一遍，不然跟文档没什么区别了，我会选择开发自定义组件过程中，你需要重点关注的几个核心点来讲解：</p><ul><li><p>自定义组件的资源管理；</p></li><li><p>组件的生命周期；</p></li><li><p>组件间的通信流程。</p></li></ul><p>在这个过程中，我们会结合组件化思想，以及 Web Components 规范辅助理解。Web Components 规范是 W3C 推出的一套用于封装具有复用性、互动性前端组件的技术规范，旨在提供一种标准的组件化模式。</p><p>目前流行的几个前端框架（ Vue / React / Angular ）都在一定程度上遵循了这套规范，微信小程序的自定义组件也是如此，而且，微信小程序渲染自定义组件使用的是 Shadow DOM，这项技术是 Web Components 规范的一部分（这节课的核心并不是讲 Shadow DOM，如果感兴趣的话，你可以在课后学习）。话不多说，我们正式进入今天的学习。</p><h3 id="为什么要学习自定义组件" tabindex="-1">为什么要学习自定义组件？ <a class="header-anchor" href="#为什么要学习自定义组件" aria-label="Permalink to &quot;为什么要学习自定义组件？&quot;">​</a></h3><p>首先，我想问你一个问题：为什么要学习自定义组件？</p><p>作为一名前端开发者，你可能经历过 BootStrap 盛行的年代，也可能是从更悠久的 ExtJS 时代一路走来，就算你不了解这两个框架，肯定不可避免地使用过 React、Vue 或 Angular 这三种框架。React / Vue / Angular 与它们的前辈 BootStrap / ExtJS 有一点是共通的：它们都是前端组件化的推崇者。</p><p>你可以把&quot;前端组件化&quot;理解为&quot;面向对象编程思想在前端 UI 领域的具体实践，将部分 UI 内容抽离为独立的可复用的组件&quot;，这样做有这样 3 点优势：</p><ul><li><strong>提高代码可复用性</strong></li></ul><p>这是组件化最直接的优点，如果不用组件，每次遇到相同的业务场景都需要重新编写代码，而被抽离后的组件可以在其适用的场景内被重复使用，很大程度上降低了开发耗时。</p><ul><li><strong>降低代码维护难度</strong></li></ul><p>想象一下，假如一个页面的所有 UI 源码都集中在同一个 HTML 文件中，当页面中的导航栏出现 Bug，你需要在上千行甚至上万行的 HTML 文件中找到导航栏对应的 HTML 标签。如果将导航栏抽离为一个组件，那么你仅仅需要在这个组件内寻找。这类案例在工作中普遍存在，通过这个例子可以充分说明组件化在降低代码维护难度方面的优势。</p><ul><li><strong>降低系统重构难度</strong></li></ul><p>《重构：改善既有代码的设计》讲了：重构并不是当系统复杂度提升到一定程度难以维护时的一次性行为，而是一种高频的、小规模的日常行为。直白点儿说就是：应该不断通过重构来改善系统，不管重构的范围有多小。但是这种实践方式对于代码的可维护性有很大的挑战，这也间接说明了组件化对重构工作的正面影响：<strong>通过提高代码的可维护性，间接降低了系统的重构难度。</strong></p><p>微信小程序的自定义组件是组件化思想在小程序开发领域的一种具体落地实践，具有上面三个优点。而且不论是工作还是面试，能否开发出优秀的自定义组件是衡量小程序开发者（甚至前端开发者）的核心指标之一。我相信这一点能够成为你学习今天这节课的动力。</p><p>那么接下来我们具体来看一下，在开发微信小程序自定义组件的三个核心环节中，你要注意哪些问题。</p><h3 id="自定义组件的资源管理" tabindex="-1">自定义组件的资源管理 <a class="header-anchor" href="#自定义组件的资源管理" aria-label="Permalink to &quot;自定义组件的资源管理&quot;">​</a></h3><p>创建微信小程序自定义组件需要使用 Component 构造器，这是微信小程序结构体系内最小粒度的构造器，外层是 Page 构造器，最外层的是 App 构造器，三者的关系如下图：</p>',20),E=p(`<p>从外到内依次是 App &gt; Page &gt; Component，每次递进是 1:N 的关系：</p><ul><li><p>1 个 App（也就是 1 个小程序）可包含 N（ N &gt;= 1 ）个 Page；</p></li><li><p>1 一个 Page 可包含N（N&gt;=1）个 Component。</p></li></ul><p>每个自定义组件的资源必须包括四个基本文件：</p><ul><li><p>用于描述组件结构的 wxml 文件；</p></li><li><p>用于描述组件样式的 wxss 文件；</p></li><li><p>用于描述组件行为的 js 文件；</p></li><li><p>用于声明组件配置的 json 文件。</p></li></ul><p>这里我多说一句，跟传统前端开发相比，小程序自定义组件的 wxml 和 wxss 文件的编写方式与 HTML 和 CSS 编写基本类似，不要特别关注，差异性主要体现在 js 和 json 文件上。</p><p>接着说回来，在 json 文件中必须通过 component 字段声明此组件为自定义组件，如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#9ECBFF;">&quot;component&quot;</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#032F62;">&quot;component&quot;</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>js 文件中通过 Component 构造器创建组件的逻辑实体，如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">Component</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  behaviors</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">[],</span></span>
<span class="line"><span style="color:#E1E4E8;">  properties</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">{},</span></span>
<span class="line"><span style="color:#E1E4E8;">  data</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> {},</span></span>
<span class="line"><span style="color:#E1E4E8;">  lifetimes</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> {},</span></span>
<span class="line"><span style="color:#E1E4E8;">  pageLifetimes</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> {},</span></span>
<span class="line"><span style="color:#E1E4E8;">  methods</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> {}</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">Component</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  behaviors</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">[],</span></span>
<span class="line"><span style="color:#24292E;">  properties</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">{},</span></span>
<span class="line"><span style="color:#24292E;">  data</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> {},</span></span>
<span class="line"><span style="color:#24292E;">  lifetimes</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> {},</span></span>
<span class="line"><span style="color:#24292E;">  pageLifetimes</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> {},</span></span>
<span class="line"><span style="color:#24292E;">  methods</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> {}</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div><p>我们可以对照 Vue 和 React 讲解 Component 构造器的几个属性，这样更容易理解：</p><ul><li><p>behaviors 类似于 Vue 和 React 中的 mixins，用于定义多个组件之间的共享逻辑，可以包含一组 properties、data、lifetimes 和 methods 的定义；</p></li><li><p>properties 类似于 Vue 和 React 中的 props ，用于接收外层（父组件）传入的数据；</p></li><li><p>data 类似于 Vue 中的 data 以及 React 中的 state ，用于描述组件的私用数据（状态）；</p></li><li><p>lifetimes 用于定义组件自身的生命周期函数，这种写法是从小程序基础库 2.2.3 版本引入的，原本的写法与 Vue 和 React 类似，都是直接挂载到组件的一级属性上（下一小节我们将详细讲解生命周期函数的相关知识）；</p></li><li><p>pageLifetimes 是微信小程序自定义组件独创的一套逻辑，用于监听此组件所在页面的生命周期。一般用于在页面特定生命周期时改变组件的状态，比如在页面展示时（show）把组件的状态设置为 A，在页面隐藏时（hide）设置为 B；</p></li><li><p>methods 与 Vue 的 methods 类似，用于定义组件内部的函数。</p></li></ul><p>除 4 个基础文件以外，自定义组件还可以包含一些其他必要的资源，比如图片，下图展示的是自定义组件 chatroom 的资源列表：</p>`,12),d=p('<p>你可以看到，除了 wxml/wxss/js/json 文件以外，还有两个图片文件，在 wxml 中可以直接使用相对目录引用，如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">image src</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;./photo.png&quot;</span><span style="color:#F97583;">&gt;&lt;/</span><span style="color:#E1E4E8;">image</span><span style="color:#F97583;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">image src</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;./photo.png&quot;</span><span style="color:#D73A49;">&gt;&lt;/</span><span style="color:#24292E;">image</span><span style="color:#D73A49;">&gt;</span></span></code></pre></div><h3 id="自定义组件的生命周期" tabindex="-1">自定义组件的生命周期 <a class="header-anchor" href="#自定义组件的生命周期" aria-label="Permalink to &quot;自定义组件的生命周期&quot;">​</a></h3><p>而对一个组件来说，生命周期指的是这个组件从被创建到销毁的过程，在这个过程中的里程碑阶段暴露出一些钩子函数，方便开发者针对不同阶段编写逻辑，这些函数就是所谓的&quot;生命周期函数&quot;。微信小程序自定义组件的生命周期函数有以下几个（这张图描述得比较清晰，我就不多说了）：</p>',4),g=p(`<p><strong>那你要怎么理解这些生命周期呢？</strong></p><p>跟 Vue 和 React 相比，小程序自定义组件的生命周期更贴近 Web Components 规范。所以接下来我们结合 Web Components 规范来理解小程序自定义组件的生命周期。</p><p>Web Components 规范引入了一个概念：自定义 HTML 元素。目的跟小程序类似，都是为了创建一种自定义的 UI 组件。浏览器环境中，每个 HTML 标签都存在一个对应的类（Class），比如段落节点</p><p>对应 HTMLParagraphElement 类，继承这个类所创建的元素便是自定义 HTML 元素，如下代码：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 创建自定义元素</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">MyCustomParagraphElement</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">HTMLParagraphElement</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#6A737D;">//...</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">// 注册自定义元素</span></span>
<span class="line"><span style="color:#E1E4E8;">customElements.</span><span style="color:#B392F0;">define</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;custom-p&#39;</span><span style="color:#E1E4E8;">, MyCustomParagraphElement);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 创建自定义元素</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">MyCustomParagraphElement</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">HTMLParagraphElement</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#6A737D;">//...</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">// 注册自定义元素</span></span>
<span class="line"><span style="color:#24292E;">customElements.</span><span style="color:#6F42C1;">define</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;custom-p&#39;</span><span style="color:#24292E;">, MyCustomParagraphElement);</span></span></code></pre></div><p>自定义元素必须被注册（或者叫作定义）之后才可以被使用，上述代码的最后一行便是注册逻辑，第一个参数是该元素被注册后的 HTML 标签名称。注册成功后便可以直接在 HTML 中使用该元素，如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">custom</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">p</span><span style="color:#F97583;">&gt;&lt;/</span><span style="color:#E1E4E8;">custom</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">p</span><span style="color:#F97583;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">custom</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">p</span><span style="color:#D73A49;">&gt;&lt;/</span><span style="color:#24292E;">custom</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">p</span><span style="color:#D73A49;">&gt;</span></span></code></pre></div><p>这个流程与微信小程序的自定义组件非常相似，只不过注册组件的行为是由小程序底层处理的，开发者仅需要编写组件本身的代码就可以了。</p><p>Web Components 规范对于自定义 HTML 元素的生命周期描述为下图所示的流程：</p>`,9),y=s("p",null,"我详细解释一下：",-1),u=p('<p>我们对比 Web Components 规范和小程序自定义组件的生命周期，两者有一定相似之处但并不完全一致，总结出这样几点：</p><ol><li><p>小程序自定义组件的 attached 和 detached 函数分别对应 Web Components 规范的connectedCallback 和 disconnectedCallback，功能上是一致的；</p></li><li><p>小程序自定义组件的 moved 函数与 Web Components 规范的 adoptedCallback 类似但作用并不完全相同。由于小程序不支持 iframe，所以不存在组件在文档范畴上的迁移，只能在同一个文档的不同父节点之间迁移。所以也就不存在 adopted 状态，moved 函数可以理解为adopted 的一种变体；</p></li><li><p>小程序自定义组件独有的生命周期函数，created、ready 和 error；</p></li><li><p>Web Components 规范独有的生命周期函数，attributeChangedCallback。</p></li></ol><p>可见小程序自定义组件与 Web Components 规范的主要差异体现在第 3 点和第 4 点。为什么会有这样的差异呢？</p><p><strong>差异点一：为什么小程序的自定义组件没有attributeChangedCallback函数？</strong></p><p>首先我们要明确 attributeChangedCallback 函数的触发时机，Web Components 规范对这个函数的描述为&quot;当自定义元素的任一属性发生改变（包括新增、删除、更新）时触发&quot;。而更新元素属性这种行为是传统 DOM 编程中常见的，在目前倡导数据驱动 UI 的背景下，绝大多数框架都是通过 VDOM 来间接操作 DOM，所以更新属性在目前的时代背景下非常少见。</p><p>微信小程序与 Vue/React 一样，同样不允许直接操作 DOM，从根本上就不可能发生 DOM 属性改变的情况。这就解释了为何小程序自定义组件的生命周期中没有 attributeChangedCallback 函数。</p><p><strong>差异点二：Web Components 规范为何没有 created/ready/error 三个函数？</strong></p><p>技术规范是一种指导方针，具体的实现方式往往需要根据现实情况决定，这一点对于前端开发者来说再熟悉不过了（比如　CSS　规范在不同浏览器上的各种语法）。</p><p>Web Components 规范同样如此，它脱离于业务，单纯从技术的角度提供了最基础的标准和参考，具体到实现层面，Vue/React 之类的框架有各自的理解，微信小程序同样也有独到之处。</p><p>之所以有差异，一方面是出于各框架开发者对规范的理解和延伸，另一方面是考虑到实际的业务需要，所以往往会有一些规范未覆盖的&quot;创新&quot;之处，最典型的就是 document.ready 事件。在DOMContentLoad 规范推出之前，jQuery 的 $(document).ready 事件已经在前端技术圈盛行了很久，这个事件发生了 window.onload 之前，此时的文档状态处于渲染未完成但是可交互，所以这个事件在优化网站性能的 FIT（First Load Time，提高加载速度）方面被频繁使用。</p><p>回到这个问题本身，小程序自定义组件的 created、ready 和 error 三个函数与 document.ready 有异曲同工之妙，都是结合框架本身特色以及业务需求所开发的超越标准规范之外的&quot;创新&quot;。</p><p>总的来说，以上两个差异点的核心原因可以概括为一句话：<strong>理论上的规范在实现的时候需要结合现实的客观条件</strong>。规范是上层实现的参考标准，但并没有限制和框定上层实现的具体模式。差异点一是由于小程序不存在操作 DOM 的情况，差异点二是由于created、ready 和 error 三个函数是超出规范之外、小程序根据自身技术特色的一种&quot;创新&quot;。</p><p>通过上面的学习，理解了自定义组件的资源管理和生命周期之后，你便可以开发出一个优秀的自定义组件了。但是正如上文提到的，一个 Page 中可能存在多个自定义组件，这些组件都是服务于同一个页面，难免会有一些数据上的流通。<strong>这时候就会遇到一个组件化领域非常典型的问题：各组件之间如何通信？</strong></p><h3 id="组件间的通信流程" tabindex="-1">组件间的通信流程 <a class="header-anchor" href="#组件间的通信流程" aria-label="Permalink to &quot;组件间的通信流程&quot;">​</a></h3><p>与 Vue/React 不同，小程序没有类似 Vuex 或 Redux 数据流管理模块，所以小程序的自定义组件之间的通信流程采用的是比较原始的<strong>事件驱动模式</strong>，即子组件通过抛出事件将数据传递给父组件，父组件通过 properties 将数据传递给子组件。</p><p>假设小程序的某个页面中存在两个组件，两个组件均依赖父组件（Page）的部分属性，这部分属性通过 properties 传递给子组件，如下图所示：</p>',16),_=s("p",null,"当组件 A 需要与组件 B 进行通信时，会抛出一个事件通知父组件 Page，父组件接收到事件之后提取事件携带的信息，然后通过 properties 传递给组件 B。这样便完成了子组件之间的消息传递。",-1),m=s("p",null,[l("除了事件驱动的通信方式以外，小程序还提供了一种更加简单粗暴的方法：父组件通过selectComponent 方法直接获取某个子组件的实例对象，然后就可以访问这个子组件的任何属性和方法了。随后将这个子组件的某个属性通过 properties传递个另外一个子组件。相较而言，事件驱动的方法更加优雅，在流程上也更加可控，"),s("strong",null,"所以通常建议使用事件驱动的通信方式。")],-1),h=s("h3",{id:"总结",tabindex:"-1"},[l("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),C=s("p",null,"以上就是本节课的全部内容了，这节课我们一起学习了微信小程序自定义组件的一些核心知识点，并没有涉及很多代码和 API的说明，因为这些内容完全可以从官方文档中轻易获取，如果我们的课程只是做搬运文档的工作，那就对不起你花费的时间和金钱了。",-1),A=s("p",null,"所以这节课挑选了在开发自定义组件时需要重点关注的三个环节，包括资源管理、生命周期和组件间的通信流程，并且在其中对照了 Vue/React 框架以及 Web Components 规范。",-1),b=s("p",null,"之所以对照这些内容来讲，是因为这节课跟上一节讲解授权模型的目的一样，理解自定义组件只是第一步，更重要是想教给你这些代码、API、组件背后的思想。希望通过这节课，你不仅能够掌握小程序自定义组件的开发技能，同时又能够理解它背后的组件化思想、Web Components 规范，并且在未来工作中得到实践。",-1),v=s("p",null,"最后留两个课后作业：",-1),F=s("ol",null,[s("li",null,[s("p",null,"尝试参照小程序的文档实现一个小程序自定义组件；")]),s("li",null,[s("p",null,"尝试参照　Web Components　规范实现一个 Web自定义组件。")])],-1),T=s("p",null,"下节课我们将深度挖掘微信小程序的开发者工具进而得到一些性能优化方面的启示。",-1),D=s("hr",null,null,-1),k=s("p",null,[s("strong",null,"《大前端高薪训练营》")],-1),q=s("p",null,[l("拉勾直推机会+硬核实战干货，6个月助你轻松斩获高薪 offer。"),s("a",{href:"https://kaiwu.lagou.com/fe_enhancement.html?utm_source=lagouedu&utm_medium=zhuanlan&utm_campaign=%E5%A4%A7%E5%89%8D%E7%AB%AF%E9%AB%98%E8%96%AA%E8%AE%AD%E7%BB%83%E8%90%A5",target:"_blank",rel:"noreferrer"},"点此链接，快来领取！")],-1);function P(f,M,V,S,x,B){const a=e("Image");return t(),c("div",null,[i,n(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/68/E5/Ciqc1F-lEaSAQhLYAABf-KiO_50957.png"}),E,n(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/68/E5/Ciqc1F-lEbGAEx-yAAAUx1lmnPc867.png"}),d,n(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/68/F1/CgqCHl-lEc6AR1VxAACCvj1YQf4557.png"}),g,n(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/68/F1/CgqCHl-lEh2ATg7NAACd3W-JlUg423.png"}),y,n(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/68/E6/Ciqc1F-lEiSAf9HrAACXBPFtLxg093.png"}),u,n(a,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/68/F1/CgqCHl-lEjOAF8gdAABKdxPMcTk908.png"}),_,m,h,C,A,b,n(a,{alt:"小程序 03--金句.png",src:"https://s0.lgstatic.com/i/image/M00/6E/4E/Ciqc1F-yL5mARgU7AAEaKh6qzuU413.png"}),v,F,T,D,k,q])}const R=o(r,[["render",P]]);export{L as __pageData,R as default};
