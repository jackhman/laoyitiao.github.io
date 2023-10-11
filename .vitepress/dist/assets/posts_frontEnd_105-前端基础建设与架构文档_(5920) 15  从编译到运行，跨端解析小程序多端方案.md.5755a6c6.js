import{_ as o,D as e,o as t,g as c,J as a,h as s,Q as p,m as l}from"./chunks/framework.f67d7268.js";const M=JSON.parse('{"title":"15从编译到运行，跨端解析小程序多端方案","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/105-前端基础建设与架构文档/(5920) 15  从编译到运行，跨端解析小程序多端方案.md","filePath":"posts/frontEnd/105-前端基础建设与架构文档/(5920) 15  从编译到运行，跨端解析小程序多端方案.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/105-前端基础建设与架构文档/(5920) 15  从编译到运行，跨端解析小程序多端方案.md"},E=p('<h1 id="_15从编译到运行-跨端解析小程序多端方案" tabindex="-1">15从编译到运行，跨端解析小程序多端方案 <a class="header-anchor" href="#_15从编译到运行-跨端解析小程序多端方案" aria-label="Permalink to &quot;15从编译到运行，跨端解析小程序多端方案&quot;">​</a></h1><p>客观来说，小程序在用户规模及商业化方面的巨大成功，并不能掩盖其技术环节的设计问题和痛点。从孱弱简陋的小程序开发体验，到整体架构实现，再到小程序 APIs 碎片化现状，就注定了小程序多端方案层出不穷，展现出百家争鸣的局面。</p><p>欣欣向荣的小程序多端方案背后有着深广且有趣的技术话题，这一讲，就让我们一同解析小程序多端方案技术。</p><p>小程序生态如今已经如火如荼地开展开来，自腾讯微信小程序后，各巨头也纷纷建立起自己的小程序。这些小程序的设计原理类似，但是对于开发者来说，开发层面并不互通。在此背景下，效率为先，也就有了各种小程序多端方案。</p><p>小程序多端方案的愿景很简单，就是使用一种 DSL，可以&quot;write once，run evrywhere&quot;，这也就不再需要开发完微信小程序，再开发头条小程序、百度小程序。小程序多端方案也许听起来很神奇，但技术实现上我们可以大体划分为三类：</p><ul><li><p>编译时方案</p></li><li><p>运行时方案</p></li><li><p>编译时和运行时的结合方案</p></li></ul>',6),i=p('<p>事实上，单纯的编译时方案或运行时方案都不能完全满足<strong>跨端需求</strong>，因此两者结合而成的第三种------编译时和运行时的结合方案，是目前的主流技术。</p><p>基于以上技术方案，小程序多端方案最终对外提供的使用方式可以分为：</p><ul><li><p>类 Vue 风格框架</p></li><li><p>类 React 风格框架</p></li><li><p>自定义 DSL 框架</p></li></ul><p>下面我们将具体深入小程序多端方案的实现。</p><h3 id="小程序多端-编译时方案" tabindex="-1">小程序多端------编译时方案 <a class="header-anchor" href="#小程序多端-编译时方案" aria-label="Permalink to &quot;小程序多端------编译时方案&quot;">​</a></h3><p>顾名思义，编译时方案的工作量主要集中在<strong>编译转化环节</strong> 上。这类多端框架在编译阶段，<strong>基于 AST（抽象语法树）技术</strong>进行各平台小程序适配。</p><p>目前社区上存在较多基于 Vue DSL 和 React DSL 的静态编译方案。其实现理念类似，但也有区别，我们分开来看。</p><h4 id="vue-dsl-静态编译" tabindex="-1">Vue DSL 静态编译 <a class="header-anchor" href="#vue-dsl-静态编译" aria-label="Permalink to &quot;Vue DSL 静态编译&quot;">​</a></h4><p>Vue 的设计风格和各小程序设计风格更加接近，因此 Vue DSL 静态编译方案相对容易。Vue 中单文件组件主要由：</p><ul><li><p>template</p></li><li><p>script</p></li><li><p>style</p></li></ul><p>组成，它分别对应了小程序中的：</p><ul><li><p>.wxml 文件，template 文件</p></li><li><p>.js 文件，.json 文件</p></li><li><p>.wxss 文件</p></li></ul>',12),y=l("p",null,[s("其中，因为小程序基本都可以接受 H5 环境中的 CSS，因此"),l("strong",null,"style 部分基本可以直接平滑迁移"),s("。template 转换为 .wxml 文件，需要进行 HTML 标签、模版语法的转换。以微信小程序举例，转换目标如下图：")],-1),d=l("p",null,"编译过程图",-1),C=l("p",null,"那么上图表述的编译过程具体应该如何实现呢？可能你会想到正则，但正则的能力有限，复杂度也较高。更普遍的做法，如 mpvue、uni-app 等，都依赖了 AST（抽象语法树）技术。AST（抽象语法树）其实并不复杂，Babel 生态就为我们提供了很多开箱即用的 AST 分析和操作工具。下图是一个简单的 Vue 模版经过 AST 分析后的产出：",-1),h=p(`<p>对应模版代码：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">a</span><span style="color:#F97583;">&gt;&lt;</span><span style="color:#E1E4E8;">b v</span><span style="color:#F97583;">-if=</span><span style="color:#9ECBFF;">&quot;a&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">/&gt;&lt;/</span><span style="color:#E1E4E8;">a</span><span style="color:#F97583;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">a</span><span style="color:#D73A49;">&gt;&lt;</span><span style="color:#24292E;">b v</span><span style="color:#D73A49;">-if=</span><span style="color:#032F62;">&quot;a&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">/&gt;&lt;/</span><span style="color:#24292E;">a</span><span style="color:#D73A49;">&gt;</span></span></code></pre></div><p>经过 AST 解析为：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">type</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">tag</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> a</span></span>
<span class="line"><span style="color:#E1E4E8;">attrsList</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> []</span></span>
<span class="line"><span style="color:#E1E4E8;">attrsMap</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> {}</span></span>
<span class="line"><span style="color:#E1E4E8;">rawAttrsMap</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> {}</span></span>
<span class="line"><span style="color:#E1E4E8;">children</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> type</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">    tag</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> b</span></span>
<span class="line"><span style="color:#E1E4E8;">    attrsList</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> []</span></span>
<span class="line"><span style="color:#E1E4E8;">    attrsMap</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      v</span><span style="color:#F97583;">-if:</span><span style="color:#E1E4E8;"> a</span></span>
<span class="line"><span style="color:#E1E4E8;">    rawAttrsMap</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> {}</span></span>
<span class="line"><span style="color:#E1E4E8;">    children</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> []</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if:</span><span style="color:#E1E4E8;"> a</span></span>
<span class="line"><span style="color:#E1E4E8;">    ifConditions</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> exp</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> a</span></span>
<span class="line"><span style="color:#E1E4E8;">        block</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;[Circular ~.children.0]&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    plain</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">static:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">    staticRoot</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">    ifProcessed</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">plain</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#F97583;">static:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">staticRoot</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">type</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">tag</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> a</span></span>
<span class="line"><span style="color:#24292E;">attrsList</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> []</span></span>
<span class="line"><span style="color:#24292E;">attrsMap</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> {}</span></span>
<span class="line"><span style="color:#24292E;">rawAttrsMap</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> {}</span></span>
<span class="line"><span style="color:#24292E;">children</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> type</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">    tag</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> b</span></span>
<span class="line"><span style="color:#24292E;">    attrsList</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> []</span></span>
<span class="line"><span style="color:#24292E;">    attrsMap</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">      v</span><span style="color:#D73A49;">-if:</span><span style="color:#24292E;"> a</span></span>
<span class="line"><span style="color:#24292E;">    rawAttrsMap</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> {}</span></span>
<span class="line"><span style="color:#24292E;">    children</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> []</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if:</span><span style="color:#24292E;"> a</span></span>
<span class="line"><span style="color:#24292E;">    ifConditions</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> exp</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> a</span></span>
<span class="line"><span style="color:#24292E;">        block</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;[Circular ~.children.0]&#39;</span></span>
<span class="line"><span style="color:#24292E;">    plain</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">static:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">    staticRoot</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">    ifProcessed</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">plain</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#D73A49;">static:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">staticRoot</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span></span></code></pre></div><p>基于以上类似 JSON 一般的 AST 产出结果，我们可以生成小程序指定的 DSL。整体流程如图：</p>`,5),g=p(`<p>熟悉 Vue 原理的同学可能会知道，Vue 中 template 会被 vue-loader 编译，我们的小程序多端方案就需要<strong>将 Vue 模版编译为小程序 .wxml 文件</strong>，思路异曲同工。可是，也许你会有疑问：Vue 中的 script 部分，怎么和小程序结合呢？这就需要在小程序运行时下文章功夫了，请继续阅读。</p><h3 id="小程序多端-运行时方案" tabindex="-1">小程序多端------运行时方案 <a class="header-anchor" href="#小程序多端-运行时方案" aria-label="Permalink to &quot;小程序多端------运行时方案&quot;">​</a></h3><p>前面我们介绍了 Vue 单文件组件的 template 编译过程，而 script 部分的处理会更加困难。试想，对于一段 Vue 代码，我们通过响应式理念监听数据变化，触发视图修改，放到小程序中，多端方案要做的就是监听数据变化，调用 setData() 方法，触发小程序渲染层变化。</p><p>一般在 Vue 单文件组件的 script 部分，我们会使用以下代码：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Vue</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">data</span><span style="color:#E1E4E8;">() {},</span></span>
<span class="line"><span style="color:#E1E4E8;">  methods</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> {},</span></span>
<span class="line"><span style="color:#E1E4E8;">  components</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> {}</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Vue</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">data</span><span style="color:#24292E;">() {},</span></span>
<span class="line"><span style="color:#24292E;">  methods</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> {},</span></span>
<span class="line"><span style="color:#24292E;">  components</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> {}</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>来初始化一个 Vue 实例。对于多端方案来说，就完全可以引入一个 Vue 的运行时版，对上述代码进行解析和执行。事实上，mpvue 就是 fork 了一份 Vue.js 的代码，因此内置了 Vue runtime 能力，同时添加了小程序平台的支持。</p><p>具体还需要做哪些小程序平台特性支持呢？举一个例子，以微信小程序为例，微信小程序平台规定，小程序页面中需要有一个 Page() 方法，以生成一个小程序实例，其中 Page() 方法是小程序官方提供的 API。</p><p>那么对于业务方写的<code>new Vue()</code>代码，<strong>多端平台要手动执行微信小程序平台的 Page()，完成初始化处理</strong>，如下：</p>`,8),F=l("p",null,"经过上述步骤，我们的多端方案内置了 Vue 运行时版，并实例化了一个 Vue 实例，同时在初始阶段调用了小程序平台的 Page() 方法，因此也就有了一个小程序实例。",-1),u=l("p",null,[s("下面的工作，就是"),l("strong",null,"在运行时将 Vue 实例和小程序实例进行关联"),s("，以做到：数据变动时，小程序实例能够调用 setData() 方法，进行渲染层更新。")],-1),A=l("p",null,[s("思想确立后，如何实施呢？首先这就需要你对 Vue 原理足够清楚了：Vue 基于响应式，对数据进行监听，在数据改动时，新生成一份虚拟节点 VNode。接下来"),l("strong",null,"对比新旧两份虚拟节点，找到 Diff，并进行 patch 操作，最终更新了真实的 DOM 节点"),s("。")],-1),f=l("p",null,"因为小程序架构中，并没有提供操作小程序节点的 API 方法，因此对于小程序多端方案，我们显然不需要进行 Vue 源码中的 patch 操作。又因为小程序隔离了渲染进程（渲染层）和逻辑进程（逻辑层），我们不需要处理渲染层，只需要调用 setData() 方法，更新一份最新的数据就可以了。",-1),D=l("p",null,'因此，借助 Vue 现有的能力，我们秉承"数据部分让 Vue 运行时版接手，渲染部分让小程序架构接手"的理念，就能实现一个类 Vue 风格的多端框架。框架原理如图：',-1),m=p(`<p>类 Vue 风格的多端框架原理图</p><p>当然，整个框架的设计还要考虑事件处理等模块，我们就不再具体展开。</p><p>至此，编译时和运行时方案组合在一起，我们就实现了一个类 Vue 风格的小程序多端框架的技术方案架构。目前社区上都是采用了这一套技术架构方案，但是不同框架有各自的特点，比如<strong>网易考拉 Megalo 在上述方案的基础上，将整个数据结构进行了扁平化，目的是在调用 setData() 方法时，可以获得更好的性能</strong>。</p><p>探索并没有到此为止，事实上，类 React 的小程序多端方案架构虽然道理和类 Vue 方案差不多，也需要将编译时和运行时相结合，但很多重要环节的处理却更加复杂，这是怎么回事呢？我们继续探索。</p><h3 id="小程序多端-类-react-风格的编译时和运行时结合方案" tabindex="-1">小程序多端------类 React 风格的编译时和运行时结合方案 <a class="header-anchor" href="#小程序多端-类-react-风格的编译时和运行时结合方案" aria-label="Permalink to &quot;小程序多端------类 React 风格的编译时和运行时结合方案&quot;">​</a></h3><p>类 React 风格的小程序多端方案，存在多项棘手的问题，其中之一就是：如何将 JSX 转换为小程序模版？</p><p>我们知道不同于 Vue 模版理念，React 生态选择了 JSX 来表达视图，但是 JSX 过于灵活，单纯基于 AST（抽象语法树）技术很难进行一对一转换。比如：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">CompParent</span><span style="color:#E1E4E8;">({</span><span style="color:#FFAB70;">children</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">...</span><span style="color:#FFAB70;">props</span><span style="color:#E1E4E8;">}) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">typeof</span><span style="color:#E1E4E8;"> children </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;function&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">children</span><span style="color:#E1E4E8;">(props) </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Comp</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#79B8FF;">CompParent</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span><span style="color:#FFAB70;">props</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;{props.data}&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;}</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#79B8FF;">CompParent</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  )</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">CompParent</span><span style="color:#24292E;">({</span><span style="color:#E36209;">children</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">...</span><span style="color:#E36209;">props</span><span style="color:#24292E;">}) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">typeof</span><span style="color:#24292E;"> children </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;function&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">children</span><span style="color:#24292E;">(props) </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Comp</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#005CC5;">CompParent</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      {</span><span style="color:#E36209;">props</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;{props.data}&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;}</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#005CC5;">CompParent</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  )</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这段代码是 React 中，利用 JSX 表达能力实现的 Render Prop 模式，这也是静态编译的噩梦：<strong>如果不将代码运行，很难计算出需要表达的视图结果</strong>。</p><p>针对这个&quot;JSX 处理&quot;问题，类 React 风格的小程序多端方案就可以分成两个流派：</p><ul><li><p>强行静态编译型，代表有：京东的 Taro 1/2，去哪儿的 Nanachi 等；</p></li><li><p>运行时处理型，代表有：Taro Next，蚂蚁的 Remax。</p></li></ul><p>强行静态编译型需要业务使用方在编写代码时，规避掉一些难以在编译阶段处理的动态化的写法，因此这类多端框架说到底是使用了限制的、阉割版的 JSX。比如在早期 Taro 版本的文档中，就有了清晰的说明：</p>`,12),_=p('<p>因此，我认为强行静态编译 JSX 是一条死胡同，并不是一个完美的解决方案。事实上，Taro 发展到了 v3 版本之后，也意识到了这个问题，所以和蚂蚁 Remax 方案一样，Taro 新版本进行了架构升级，在运行时增加了对 React JSX 以及后续流程处理。具体是怎么做到的呢？请你继续阅读。</p><h4 id="react-设计理念助力多端小程序起飞" tabindex="-1">React 设计理念助力多端小程序起飞 <a class="header-anchor" href="#react-设计理念助力多端小程序起飞" aria-label="Permalink to &quot;React 设计理念助力多端小程序起飞&quot;">​</a></h4><p>我认为在<strong>运行时开发者能够处理 React JSX 的核心基础其实在于 React 的设计理念</strong>，React 将自身能力充分解耦，并提供给社区接入关键环节。这里我们需要先进行一些 React 原理解析。</p><p>React 核心理念可以分为三大部分：</p><ul><li><p>React Core：处理最核心的 APIs，与终端平台和渲染解耦，主要提供了下面这些能力：</p><ol><li><p>React.createElement()</p></li><li><p>React.createClass()</p></li><li><p>React.Component</p></li><li><p>React.Children</p></li><li><p>React.PropTypes</p></li></ol></li><li><p>React Renderer：渲染器定义了一个 React Tree 如何构建接轨不同平台，比如：</p><ol><li><p>React-dom 渲染组件树为 DOM elements；</p></li><li><p>React Native 渲染组件树为不同原生平台视图。</p></li></ol></li><li><p>Reconciler：负责 diff 算法，接驳 patch 行为。可以被 React-dom、React Native、React ART 这些 renderers 共用，并提供基础计算能力。现在 React 主要有两种类型的 reconcilers：</p><ol><li><p>Stack reconciler，React 15 以及更早期 React 版本使用；</p></li><li><p>Fiber reconciler，新一代的架构。</p></li></ol></li></ul><p>更多基础内容，如 React Components、React Instances、React Elements，我们就不再一一展开。这里需要你了解的是：</p><ul><li><p>React team 将 Reconciler 部分作为一个独立的 npm 包（<a href="https://www.npmjs.com/package/react-reconciler" target="_blank" rel="noreferrer">react-reconciler</a> 发布）；</p></li><li><p>在 React 环境下，不同平台，可以依赖一个 <a href="https://github.com/facebook/react/tree/master/packages/react-reconciler#api" target="_blank" rel="noreferrer">hostConfig</a> 配置，和 react-reconciler 互动，连接并使用 Reconciler 能力；</p></li><li><p>因此，不同平台的 renderers 在 HostConfig 中内置基本方法，即可构造自己的渲染逻辑。</p></li></ul><p>核心架构可以总结为下图：</p>',8),T=p(`<p>React 的 Reconciler 并不关心 renderers 中的节点是什么形状，只会把这个计算结果透传到 HostConfig 中定义的方法中，我们在这些方法（比如 appendChild、removeChild、insertBefore）中，完成渲染的准备和目的。而 HostConfig 其实就是一个对象：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> HostConfig </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//TODO We will specify all required methods here</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> HostConfig </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//TODO We will specify all required methods here</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>翻看 <a href="https://github.com/facebook/react/blob/master/packages/react-reconciler/src/forks/ReactFiberHostConfig.custom.js" target="_blank" rel="noreferrer">react-reconciler</a> 源码，可以总结出，完整的 hostConfig 包含了：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">HostConfig.getPublicInstance</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.getRootHostContext</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.getChildHostContext</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.prepareForCommit</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.resetAfterCommit</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.createInstance</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.appendInitialChild</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.finalizeInitialChildren</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.prepareUpdate</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.shouldSetTextContent</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.shouldDeprioritizeSubtree</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.createTextInstance</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.scheduleDeferredCallback</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.cancelDeferredCallback</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.setTimeout</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.clearTimeout</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.noTimeout</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.now</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.isPrimaryRenderer</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.supportsMutation</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.supportsPersistence</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.supportsHydration</span></span>
<span class="line"><span style="color:#6A737D;">// -------------------</span></span>
<span class="line"><span style="color:#6A737D;">//      Mutation</span></span>
<span class="line"><span style="color:#6A737D;">//     (optional)</span></span>
<span class="line"><span style="color:#6A737D;">// -------------------</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.appendChild</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.appendChildToContainer</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.commitTextUpdate</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.commitMount</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.commitUpdate</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.insertBefore</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.insertInContainerBefore</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.removeChild</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.removeChildFromContainer</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.resetTextContent</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.hideInstance</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.hideTextInstance</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.unhideInstance</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.unhideTextInstance</span></span>
<span class="line"><span style="color:#6A737D;">// -------------------</span></span>
<span class="line"><span style="color:#6A737D;">//     Persistence</span></span>
<span class="line"><span style="color:#6A737D;">//     (optional)</span></span>
<span class="line"><span style="color:#6A737D;">// -------------------</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.cloneInstance</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.createContainerChildSet</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.appendChildToContainerChildSet</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.finalizeContainerChildren</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.replaceContainerChildren</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.cloneHiddenInstance</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.cloneUnhiddenInstance</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.createHiddenTextInstance</span></span>
<span class="line"><span style="color:#6A737D;">// -------------------</span></span>
<span class="line"><span style="color:#6A737D;">//     Hydration</span></span>
<span class="line"><span style="color:#6A737D;">//     (optional)</span></span>
<span class="line"><span style="color:#6A737D;">// -------------------</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.canHydrateInstance</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.canHydrateTextInstance</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.getNextHydratableSibling</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.getFirstHydratableChild</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.hydrateInstance</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.hydrateTextInstance</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.didNotMatchHydratedContainerTextInstance</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.didNotMatchHydratedTextInstance</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.didNotHydrateContainerInstance</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.didNotHydrateInstance</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.didNotFindHydratableContainerInstance</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.didNotFindHydratableContainerTextInstance</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.didNotFindHydratableInstance</span></span>
<span class="line"><span style="color:#E1E4E8;">HostConfig.didNotFindHydratableTextInstance</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">HostConfig.getPublicInstance</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.getRootHostContext</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.getChildHostContext</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.prepareForCommit</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.resetAfterCommit</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.createInstance</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.appendInitialChild</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.finalizeInitialChildren</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.prepareUpdate</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.shouldSetTextContent</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.shouldDeprioritizeSubtree</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.createTextInstance</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.scheduleDeferredCallback</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.cancelDeferredCallback</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.setTimeout</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.clearTimeout</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.noTimeout</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.now</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.isPrimaryRenderer</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.supportsMutation</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.supportsPersistence</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.supportsHydration</span></span>
<span class="line"><span style="color:#6A737D;">// -------------------</span></span>
<span class="line"><span style="color:#6A737D;">//      Mutation</span></span>
<span class="line"><span style="color:#6A737D;">//     (optional)</span></span>
<span class="line"><span style="color:#6A737D;">// -------------------</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.appendChild</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.appendChildToContainer</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.commitTextUpdate</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.commitMount</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.commitUpdate</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.insertBefore</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.insertInContainerBefore</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.removeChild</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.removeChildFromContainer</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.resetTextContent</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.hideInstance</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.hideTextInstance</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.unhideInstance</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.unhideTextInstance</span></span>
<span class="line"><span style="color:#6A737D;">// -------------------</span></span>
<span class="line"><span style="color:#6A737D;">//     Persistence</span></span>
<span class="line"><span style="color:#6A737D;">//     (optional)</span></span>
<span class="line"><span style="color:#6A737D;">// -------------------</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.cloneInstance</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.createContainerChildSet</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.appendChildToContainerChildSet</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.finalizeContainerChildren</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.replaceContainerChildren</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.cloneHiddenInstance</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.cloneUnhiddenInstance</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.createHiddenTextInstance</span></span>
<span class="line"><span style="color:#6A737D;">// -------------------</span></span>
<span class="line"><span style="color:#6A737D;">//     Hydration</span></span>
<span class="line"><span style="color:#6A737D;">//     (optional)</span></span>
<span class="line"><span style="color:#6A737D;">// -------------------</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.canHydrateInstance</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.canHydrateTextInstance</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.getNextHydratableSibling</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.getFirstHydratableChild</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.hydrateInstance</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.hydrateTextInstance</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.didNotMatchHydratedContainerTextInstance</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.didNotMatchHydratedTextInstance</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.didNotHydrateContainerInstance</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.didNotHydrateInstance</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.didNotFindHydratableContainerInstance</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.didNotFindHydratableContainerTextInstance</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.didNotFindHydratableInstance</span></span>
<span class="line"><span style="color:#24292E;">HostConfig.didNotFindHydratableTextInstance</span></span></code></pre></div><p>React reconciler 阶段会在不同的时机，调用上面这些方法。比如在 reconciler 阶段新建节点时会调用 createInstance 等方法；在提交阶段创建新的子节点时，调用 appendChild 方法。</p><p>依照 React 支持 web 和原生（React Native）的思路，如下图：</p>`,6),H=l("p",null,"你可以类比出一套更好的 React 支持多端小程序的架构设计，如下图：",-1),b=p('<p>我们知道类 Vue 风格的多端框架，可以将 Vue template 编译为小程序模版。那么有了数据，类 React 风格的多端框架，在初始化时如何渲染出来页面呢？</p><p>以 Remax 为例，上图所示 VNodeData 数据中，包含了节点信息，比如 type=&quot;view&quot;，我们可以<strong>通过递归 VNodeData 这个数据结构，根据不同的 type 渲染出不同的小程序模版</strong>。</p><p>总结一下，在初始化阶段以及第一次 mount 时，我们<strong>通过 setData() 方法初始化小程序</strong>。具体是通过递归数据结构，渲染小程序页面。接着，在数据发生变化时，我们通过 React reconciler 阶段的计算信息，以及自定义配置的 HostConfig 衔接函数，更新数据，并通过 setData() 方法触发小程序的渲染更新。</p><p>了解了类 React 风格的多端方案架构设计，我们可以结合实际框架实现，来进一步巩固思想，看一看实践中，开源方案的实施情况，请继续阅读。</p><h4 id="剖析一款-网红-框架-taro-next" tabindex="-1">剖析一款&quot;网红&quot;框架 ------ Taro Next <a class="header-anchor" href="#剖析一款-网红-框架-taro-next" aria-label="Permalink to &quot;剖析一款&quot;网红&quot;框架 ------ Taro Next&quot;">​</a></h4><p>在 2019 年 GMTC 大会上，京东 Taro 团队介绍了《小程序跨框架开发的探索与实践》，其中的 v3 理念就与上述思路吻合（目前仍然在版本开发中：<a href="https://github.com/nervjs/taro" target="_blank" rel="noreferrer">NervJS-taro</a>）。在分享中的一处截图如下：</p>',6),B=p(`<p>由上图即可推知：Taro 团队提供的 <a href="https://github.com/NervJS/taro/tree/next/packages/taro-react" target="_blank" rel="noreferrer">taro-react</a>包，是用来连接 React reconciler 和 taro-runtime 的。它主要负责：</p><ul><li><p>实现 HostConfig 配置</p></li><li><p>实现 render 函数</p></li></ul><p>比如，HostConfig 在 taro-react 源码中的实现为：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> hostConfig</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> HostConfig</span><span style="color:#F97583;">&lt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  string, </span><span style="color:#6A737D;">// Type</span></span>
<span class="line"><span style="color:#E1E4E8;">  Props, </span><span style="color:#6A737D;">// Props</span></span>
<span class="line"><span style="color:#E1E4E8;">  TaroElement, </span><span style="color:#6A737D;">// Container</span></span>
<span class="line"><span style="color:#E1E4E8;">  TaroElement, </span><span style="color:#6A737D;">// Instance</span></span>
<span class="line"><span style="color:#E1E4E8;">  TaroText, </span><span style="color:#6A737D;">// TextInstance</span></span>
<span class="line"><span style="color:#E1E4E8;">  TaroElement, </span><span style="color:#6A737D;">// HydratableInstance</span></span>
<span class="line"><span style="color:#E1E4E8;">  TaroElement, </span><span style="color:#6A737D;">// PublicInstance</span></span>
<span class="line"><span style="color:#E1E4E8;">  object, </span><span style="color:#6A737D;">// HostContext</span></span>
<span class="line"><span style="color:#E1E4E8;">  string[], </span><span style="color:#6A737D;">// UpdatePayload</span></span>
<span class="line"><span style="color:#E1E4E8;">  unknown, </span><span style="color:#6A737D;">// ChildSet</span></span>
<span class="line"><span style="color:#E1E4E8;">  unknown, </span><span style="color:#6A737D;">// TimeoutHandle</span></span>
<span class="line"><span style="color:#E1E4E8;">  unknown </span><span style="color:#6A737D;">// NoTimeout</span></span>
<span class="line"><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">hideInstance</span><span style="color:#E1E4E8;"> (instance</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> TaroElement)</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">unhideInstance</span><span style="color:#E1E4E8;"> (instance</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> TaroElement, props)</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span></span>
<span class="line"><span style="color:#E1E4E8;">} </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 创建 element 实例</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">createInstance</span><span style="color:#E1E4E8;"> (type) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">createElement</span><span style="color:#E1E4E8;">(type)</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 创建 text node 实例</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">createTextInstance</span><span style="color:#E1E4E8;"> (text) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">createTextNode</span><span style="color:#E1E4E8;">(text)</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">getPublicInstance</span><span style="color:#E1E4E8;"> (inst</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> TaroElement) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> inst</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">getRootHostContext</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {}</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">getChildHostContext</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {}</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// appendChild 方法实现</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">appendChild</span><span style="color:#E1E4E8;"> (parent, child) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    parent.</span><span style="color:#B392F0;">appendChild</span><span style="color:#E1E4E8;">(child)</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// appendInitialChild 方法实现</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">appendInitialChild</span><span style="color:#E1E4E8;"> (parent, child) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    parent.</span><span style="color:#B392F0;">appendChild</span><span style="color:#E1E4E8;">(child)</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// appendChildToContainer 方法实现</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">appendChildToContainer</span><span style="color:#E1E4E8;"> (parent, child) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    parent.</span><span style="color:#B392F0;">appendChild</span><span style="color:#E1E4E8;">(child)</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// removeChild 方法实现</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">removeChild</span><span style="color:#E1E4E8;"> (parent, child) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    parent.</span><span style="color:#B392F0;">removeChild</span><span style="color:#E1E4E8;">(child)</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// removeChildFromContainer 方法实现</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">removeChildFromContainer</span><span style="color:#E1E4E8;"> (parent, child) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    parent.</span><span style="color:#B392F0;">removeChild</span><span style="color:#E1E4E8;">(child)</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// insertBefore 方法实现</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">insertBefore</span><span style="color:#E1E4E8;"> (parent, child, refChild) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    parent.</span><span style="color:#B392F0;">insertBefore</span><span style="color:#E1E4E8;">(child, refChild)</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// insertInContainerBefore 方法实现</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">insertInContainerBefore</span><span style="color:#E1E4E8;"> (parent, child, refChild) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    parent.</span><span style="color:#B392F0;">insertBefore</span><span style="color:#E1E4E8;">(child, refChild)</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// commitTextUpdate 方法实现</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">commitTextUpdate</span><span style="color:#E1E4E8;"> (textInst, _, newText) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    textInst.nodeValue </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> newText</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">finalizeInitialChildren</span><span style="color:#E1E4E8;"> (dom, _, props) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">updateProps</span><span style="color:#E1E4E8;">(dom, {}, props)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">prepareUpdate</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> EMPTY_ARR</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">commitUpdate</span><span style="color:#E1E4E8;"> (dom, _payload, _type, oldProps, newProps) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">updateProps</span><span style="color:#E1E4E8;">(dom, oldProps, newProps)</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">hideInstance</span><span style="color:#E1E4E8;"> (instance) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> style </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> instance.style</span></span>
<span class="line"><span style="color:#E1E4E8;">    style.</span><span style="color:#B392F0;">setProperty</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;display&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;none&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">unhideInstance</span><span style="color:#E1E4E8;"> (instance, props) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> styleProp </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> props.style</span></span>
<span class="line"><span style="color:#E1E4E8;">    let display </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> styleProp</span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">hasOwnProperty</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;display&#39;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> styleProp.display </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span></span>
<span class="line"><span style="color:#E1E4E8;">    display </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> display </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> typeof display </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;boolean&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> display </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> (</span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> display).</span><span style="color:#B392F0;">trim</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// eslint-disable-next-line dot-notation</span></span>
<span class="line"><span style="color:#E1E4E8;">    instance.style[</span><span style="color:#9ECBFF;">&#39;display&#39;</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> display</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  shouldSetTextContent</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> returnFalse,</span></span>
<span class="line"><span style="color:#E1E4E8;">  shouldDeprioritizeSubtree</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> returnFalse,</span></span>
<span class="line"><span style="color:#E1E4E8;">  prepareForCommit</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> noop,</span></span>
<span class="line"><span style="color:#E1E4E8;">  resetAfterCommit</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> noop,</span></span>
<span class="line"><span style="color:#E1E4E8;">  commitMount</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> noop,</span></span>
<span class="line"><span style="color:#E1E4E8;">  now,</span></span>
<span class="line"><span style="color:#E1E4E8;">  scheduleDeferredCallback,</span></span>
<span class="line"><span style="color:#E1E4E8;">  cancelDeferredCallback,</span></span>
<span class="line"><span style="color:#E1E4E8;">  clearTimeout</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> clearTimeout,</span></span>
<span class="line"><span style="color:#E1E4E8;">  setTimeout</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> setTimeout,</span></span>
<span class="line"><span style="color:#E1E4E8;">  noTimeout</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">-</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  supportsMutation</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  supportsPersistence</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  isPrimaryRenderer</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  supportsHydration</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> hostConfig</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> HostConfig</span><span style="color:#D73A49;">&lt;</span></span>
<span class="line"><span style="color:#24292E;">  string, </span><span style="color:#6A737D;">// Type</span></span>
<span class="line"><span style="color:#24292E;">  Props, </span><span style="color:#6A737D;">// Props</span></span>
<span class="line"><span style="color:#24292E;">  TaroElement, </span><span style="color:#6A737D;">// Container</span></span>
<span class="line"><span style="color:#24292E;">  TaroElement, </span><span style="color:#6A737D;">// Instance</span></span>
<span class="line"><span style="color:#24292E;">  TaroText, </span><span style="color:#6A737D;">// TextInstance</span></span>
<span class="line"><span style="color:#24292E;">  TaroElement, </span><span style="color:#6A737D;">// HydratableInstance</span></span>
<span class="line"><span style="color:#24292E;">  TaroElement, </span><span style="color:#6A737D;">// PublicInstance</span></span>
<span class="line"><span style="color:#24292E;">  object, </span><span style="color:#6A737D;">// HostContext</span></span>
<span class="line"><span style="color:#24292E;">  string[], </span><span style="color:#6A737D;">// UpdatePayload</span></span>
<span class="line"><span style="color:#24292E;">  unknown, </span><span style="color:#6A737D;">// ChildSet</span></span>
<span class="line"><span style="color:#24292E;">  unknown, </span><span style="color:#6A737D;">// TimeoutHandle</span></span>
<span class="line"><span style="color:#24292E;">  unknown </span><span style="color:#6A737D;">// NoTimeout</span></span>
<span class="line"><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">hideInstance</span><span style="color:#24292E;"> (instance</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> TaroElement)</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">unhideInstance</span><span style="color:#24292E;"> (instance</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> TaroElement, props)</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span></span>
<span class="line"><span style="color:#24292E;">} </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 创建 element 实例</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">createInstance</span><span style="color:#24292E;"> (type) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> document.</span><span style="color:#6F42C1;">createElement</span><span style="color:#24292E;">(type)</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 创建 text node 实例</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">createTextInstance</span><span style="color:#24292E;"> (text) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> document.</span><span style="color:#6F42C1;">createTextNode</span><span style="color:#24292E;">(text)</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">getPublicInstance</span><span style="color:#24292E;"> (inst</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> TaroElement) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> inst</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">getRootHostContext</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {}</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">getChildHostContext</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {}</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// appendChild 方法实现</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">appendChild</span><span style="color:#24292E;"> (parent, child) {</span></span>
<span class="line"><span style="color:#24292E;">    parent.</span><span style="color:#6F42C1;">appendChild</span><span style="color:#24292E;">(child)</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// appendInitialChild 方法实现</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">appendInitialChild</span><span style="color:#24292E;"> (parent, child) {</span></span>
<span class="line"><span style="color:#24292E;">    parent.</span><span style="color:#6F42C1;">appendChild</span><span style="color:#24292E;">(child)</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// appendChildToContainer 方法实现</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">appendChildToContainer</span><span style="color:#24292E;"> (parent, child) {</span></span>
<span class="line"><span style="color:#24292E;">    parent.</span><span style="color:#6F42C1;">appendChild</span><span style="color:#24292E;">(child)</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// removeChild 方法实现</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">removeChild</span><span style="color:#24292E;"> (parent, child) {</span></span>
<span class="line"><span style="color:#24292E;">    parent.</span><span style="color:#6F42C1;">removeChild</span><span style="color:#24292E;">(child)</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// removeChildFromContainer 方法实现</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">removeChildFromContainer</span><span style="color:#24292E;"> (parent, child) {</span></span>
<span class="line"><span style="color:#24292E;">    parent.</span><span style="color:#6F42C1;">removeChild</span><span style="color:#24292E;">(child)</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// insertBefore 方法实现</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">insertBefore</span><span style="color:#24292E;"> (parent, child, refChild) {</span></span>
<span class="line"><span style="color:#24292E;">    parent.</span><span style="color:#6F42C1;">insertBefore</span><span style="color:#24292E;">(child, refChild)</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// insertInContainerBefore 方法实现</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">insertInContainerBefore</span><span style="color:#24292E;"> (parent, child, refChild) {</span></span>
<span class="line"><span style="color:#24292E;">    parent.</span><span style="color:#6F42C1;">insertBefore</span><span style="color:#24292E;">(child, refChild)</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// commitTextUpdate 方法实现</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">commitTextUpdate</span><span style="color:#24292E;"> (textInst, _, newText) {</span></span>
<span class="line"><span style="color:#24292E;">    textInst.nodeValue </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> newText</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">finalizeInitialChildren</span><span style="color:#24292E;"> (dom, _, props) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">updateProps</span><span style="color:#24292E;">(dom, {}, props)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">prepareUpdate</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> EMPTY_ARR</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">commitUpdate</span><span style="color:#24292E;"> (dom, _payload, _type, oldProps, newProps) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">updateProps</span><span style="color:#24292E;">(dom, oldProps, newProps)</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">hideInstance</span><span style="color:#24292E;"> (instance) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> style </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> instance.style</span></span>
<span class="line"><span style="color:#24292E;">    style.</span><span style="color:#6F42C1;">setProperty</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;display&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;none&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">unhideInstance</span><span style="color:#24292E;"> (instance, props) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> styleProp </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> props.style</span></span>
<span class="line"><span style="color:#24292E;">    let display </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> styleProp</span><span style="color:#D73A49;">?</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">hasOwnProperty</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;display&#39;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> styleProp.display </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span></span>
<span class="line"><span style="color:#24292E;">    display </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> display </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> typeof display </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;boolean&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> display </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> (</span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> display).</span><span style="color:#6F42C1;">trim</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// eslint-disable-next-line dot-notation</span></span>
<span class="line"><span style="color:#24292E;">    instance.style[</span><span style="color:#032F62;">&#39;display&#39;</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> display</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  shouldSetTextContent</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> returnFalse,</span></span>
<span class="line"><span style="color:#24292E;">  shouldDeprioritizeSubtree</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> returnFalse,</span></span>
<span class="line"><span style="color:#24292E;">  prepareForCommit</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> noop,</span></span>
<span class="line"><span style="color:#24292E;">  resetAfterCommit</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> noop,</span></span>
<span class="line"><span style="color:#24292E;">  commitMount</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> noop,</span></span>
<span class="line"><span style="color:#24292E;">  now,</span></span>
<span class="line"><span style="color:#24292E;">  scheduleDeferredCallback,</span></span>
<span class="line"><span style="color:#24292E;">  cancelDeferredCallback,</span></span>
<span class="line"><span style="color:#24292E;">  clearTimeout</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> clearTimeout,</span></span>
<span class="line"><span style="color:#24292E;">  setTimeout</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> setTimeout,</span></span>
<span class="line"><span style="color:#24292E;">  noTimeout</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">-</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  supportsMutation</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  supportsPersistence</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  isPrimaryRenderer</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  supportsHydration</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>以 insertBefore 方法为例：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">insertBefore</span><span style="color:#E1E4E8;"> (parent, child, refChild) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  parent.</span><span style="color:#B392F0;">insertBefore</span><span style="color:#E1E4E8;">(child, refChild)</span></span>
<span class="line"><span style="color:#E1E4E8;">},</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">insertBefore</span><span style="color:#24292E;"> (parent, child, refChild) {</span></span>
<span class="line"><span style="color:#24292E;">  parent.</span><span style="color:#6F42C1;">insertBefore</span><span style="color:#24292E;">(child, refChild)</span></span>
<span class="line"><span style="color:#24292E;">},</span></span></code></pre></div><p>parent 实际上是一个 TaroNode 对象，其 insertBefore 方法在 taro-runtime 中给出。<a href="https://github.com/NervJS/taro/tree/next/packages/taro-runtime" target="_blank" rel="noreferrer">taro-runtime</a> 模拟了 DOM/BOM APIs，但是在小程序环境中，它并不能直接操作 DOM 节点，而是操作数据（即<strong>前文提到的 VNodeData，对应 Taro 里面的 TaroNode</strong> ）。比如源码中，仍然以 insertBefore 方法举例，<a href="https://github.com/NervJS/taro/blob/aaf9c133907805801803d2cb9d147c952e0b199b/packages/taro-runtime/src/dom/node.ts#L88" target="_blank" rel="noreferrer">相关处理逻辑为</a>：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> insertBefore</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">T extends TaroNode</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> (newChild</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> T, refChild</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> TaroNode </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">, isReplace</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">boolean</span><span style="color:#E1E4E8;">)</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> T {</span></span>
<span class="line"><span style="color:#E1E4E8;">    newChild.</span><span style="color:#B392F0;">remove</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">    newChild.parentNode </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// payload 数据</span></span>
<span class="line"><span style="color:#E1E4E8;">    let payload</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> UpdatePayload</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 存在 refChild(TaroNode 类型)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (refChild) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> index </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">findIndex</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.childNodes, refChild)</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.childNodes.</span><span style="color:#B392F0;">splice</span><span style="color:#E1E4E8;">(index, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, newChild)</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (isReplace </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        payload </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          path</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> newChild._path,</span></span>
<span class="line"><span style="color:#E1E4E8;">          value</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">hydrate</span><span style="color:#E1E4E8;">(newChild)</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        payload </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          path</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> \`\${</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">._path}.\${Shortcuts.Childnodes}\`,</span></span>
<span class="line"><span style="color:#E1E4E8;">          value</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.childNodes.</span><span style="color:#B392F0;">map</span><span style="color:#E1E4E8;">(hydrate)</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.childNodes.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(newChild)</span></span>
<span class="line"><span style="color:#E1E4E8;">      payload </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        path</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> newChild._path,</span></span>
<span class="line"><span style="color:#E1E4E8;">        value</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">hydrate</span><span style="color:#E1E4E8;">(newChild)</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    CurrentReconciler.insertBefore</span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;">.(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">, newChild, refChild)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">enqueueUpdate</span><span style="color:#E1E4E8;">(payload)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> newChild</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">public</span><span style="color:#24292E;"> insertBefore</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">T extends TaroNode</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> (newChild</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> T, refChild</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> TaroNode </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">, isReplace</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">boolean</span><span style="color:#24292E;">)</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> T {</span></span>
<span class="line"><span style="color:#24292E;">    newChild.</span><span style="color:#6F42C1;">remove</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">    newChild.parentNode </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// payload 数据</span></span>
<span class="line"><span style="color:#24292E;">    let payload</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> UpdatePayload</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 存在 refChild(TaroNode 类型)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (refChild) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> index </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">findIndex</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.childNodes, refChild)</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.childNodes.</span><span style="color:#6F42C1;">splice</span><span style="color:#24292E;">(index, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, newChild)</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (isReplace </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        payload </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          path</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> newChild._path,</span></span>
<span class="line"><span style="color:#24292E;">          value</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">hydrate</span><span style="color:#24292E;">(newChild)</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        payload </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          path</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> \`\${</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">._path}.\${Shortcuts.Childnodes}\`,</span></span>
<span class="line"><span style="color:#24292E;">          value</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.childNodes.</span><span style="color:#6F42C1;">map</span><span style="color:#24292E;">(hydrate)</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.childNodes.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(newChild)</span></span>
<span class="line"><span style="color:#24292E;">      payload </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        path</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> newChild._path,</span></span>
<span class="line"><span style="color:#24292E;">        value</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">hydrate</span><span style="color:#24292E;">(newChild)</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    CurrentReconciler.insertBefore</span><span style="color:#D73A49;">?</span><span style="color:#24292E;">.(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">, newChild, refChild)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">enqueueUpdate</span><span style="color:#24292E;">(payload)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> newChild</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>整体 Taro Next 的类 React 多端方案架构如图，出自《小程序跨框架开发的探索与实践》分享：</p>`,9),v=p('<p>了解了不同框架风格（Vue 和 React）的多端小程序技术架构方案，并不意味着我们就能直接写出一个新的框架，和社区上成熟方案相争锋指日可待了。一个成熟的技术方案除了实现主体架构，还包括多方面的内容，比如性能优化。</p><p>如何在已有思路基础上，完成更好的设计，也值得开发者深思，我们将继续展开这个话题。</p><h3 id="小程序多端方案优化方向" tabindex="-1">小程序多端方案优化方向 <a class="header-anchor" href="#小程序多端方案优化方向" aria-label="Permalink to &quot;小程序多端方案优化方向&quot;">​</a></h3><p>一个成熟的小程序多端方案要考虑的环节是立体的，比如以 <a href="https://developers.weixin.qq.com/miniprogram/dev/extended/kbone/" target="_blank" rel="noreferrer">kbone</a> 为代表，运行时方案都是通过模拟 Web 环境来彻底对接前端生态，而 Remax 只是简单的通过 react reconciler 连接 React 和小程序。如何从更高的角度，衡量和理解小程序多端方案的更多技术方向，我们从下面几个话题来继续阐述。</p><h4 id="性能优化方向" tabindex="-1">性能优化方向 <a class="header-anchor" href="#性能优化方向" aria-label="Permalink to &quot;性能优化方向&quot;">​</a></h4><p>从前文我们可以了解到，小程序多端框架主要由编译时和运行时两部分组成，一般来说，<strong>编译时做的事情越多，下的功夫越大，也就意味着运行时越轻量，负担越小，因此性能也就会更好</strong>。比如，我们可以在编译时做到 AOT（Ahead of Time）性能调优、Dead Code Elimination 等。而厚重的运行时一般意味着需要将完整的组件树在逻辑层传输到视图层，也就导致数据传输量更大，且页面中会存在更多的监听器。</p><p>另一方面，随着终端性能的增强，找到编译时和运行时所承担工作的平衡点，也显得至关重要。以 mpvue 框架为主，一般编译时都会完成<strong>静态模版</strong> 的编译工作；而以 Remax 为代表，<strong>动态构建视图层表达就放在了运行时完成</strong>。</p><p>在我看来，关于运行时和编译时的各中取舍，需要基于大量 benchmark 调研，也需要开发设计者广阔的技术视野和选型能力。除此之外，一般我们可以从以下几个方面来进一步实现性能优化。</p><ul><li><p><strong>框架包 size</strong>。小程序的初始加载性能直接依赖于资源的包大小，因此小程序多端框架的包 size，至关重要。为此，各解决方案都从不同的角度完成瘦身，比如 Taro 力争实现更轻量的 DOM/BOM APIs，不同于 jsdom（size：2.1M），Taro 的核心的 DOM/BOM APIs 代码才 1000 行不到。</p></li><li><p><strong>数据更新粒度</strong>。在数据更新阶段，小程序的 setData() 所负载的数据一直是重要的优化方向，目前已经成为默认的常规手段，那么利用框架来完成 setData() 方法调用优化也就顺其自然了。比如数据负载的扁平化处理和增量处理，都是常见的优化手段。</p></li></ul><h4 id="未来发展方向" tabindex="-1">未来发展方向 <a class="header-anchor" href="#未来发展方向" aria-label="Permalink to &quot;未来发展方向&quot;">​</a></h4><p>好的技术架构决定着未来发展潜力，上文我们提到了 React 将 React core、React-dom 等解耦，才奠定了现代化小程序多端方案的可行性。而小程序多端方案的设计，也决定着自身的未来应用空间。在此层面上，我认为开发者可重点考虑以下几个方面。</p><ul><li><p><strong>工程化方案</strong> 。小程序多端需要有一体化的工程解决方案，在设计上可以与 Webpack 等工程化工具深度融合绑定，并对外提供服务。但需要<strong>兼顾关键环节的可插拔性</strong>，能够适应多种工程化工具，对于未来发展和当下应用场景来说，尤其重要。</p></li><li><p><strong>框架方案</strong> 。React 和 Vue 无疑是当前最重要的前端框架，目前小程序多端方案也都以二者为主。但是<strong>Flutter 和 Angular，甚至更小众的框架也应该得到重视</strong>。考虑到投入产出比，如果小程序多端团队难以面面俱到地支持这些框架和新 DSL，那么交给社区寻求支持，也是一个思路。比如，Taro 团队将支持的重点放在 React/Vue，而快应用以及 Flutter 和 Angular，暂且交给社区来适配和维护。</p></li><li><p><strong>跟进 Web 发展</strong> 。在运行时，小程序多端方案一般需要在小程序逻辑层中运行 React 或者是 Vue 的运行时版，然后通过适配层，实现自定义渲染器。这就要求设计开发者需要<strong>跟进 Web 发展及 Web 框架的运行时能力，且实现适配层</strong>。这无疑对技术能力和水平提出了较高要求。如何处理 Web 和 Web 框架的关系、如何保持兼容互通，决定了小程序多端方案的生死。</p></li><li><p><strong>渐进增强型能力</strong> 。无论是和 Web 兼容互通还是多种小程序之间的差异磨平，对于多端方案来说，很难从理论上彻底实现&quot;write once，run evrywhere&quot;。因此，这就需<strong>要框架级别上实现一套渐进增强能力</strong> 。这种能力，可以是语法或 DSL 层面的暂时性妥协/便利性扩展，也可以通过暴露全局变量，进行不同环境的业务分发。比如<strong>腾讯开源的</strong> <a href="https://github.com/Tencent/omi/tree/master/packages/omix" target="_blank" rel="noreferrer">OMIX</a> <strong>框架</strong>：OMIX 有自己的一套 DSL，但整体保留小程序已有的语法。在小程序已有语法之上，OMIX 还进行了扩充和增强，比如引入了 Vue 中比较有代表性的 computed。</p></li></ul><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>这一讲我们针对小程序多端方案进行了原理层面的分析，同时站在更高的视角，对不同方案和多端框架进行了比对和技术展望。实际上，理解全部内容需要你对 React 和 Vue 框架原理有更深入的了解，也需要对编译原理和宿主环境（小程序底层实现架构）有清晰的认知。</p><p>本讲内容如下：</p>',15),I=l("p",null,"从小程序发展元年开始，到 2018 微信小程序的起飞，再到后续各大厂商快速跟进、各大寡头平台自建小程序生态，小程序现象带给我们的不仅仅是业务价值方面的讨论和启迪，也应该是对相关技术架构的巡礼和探索。作为开发者，我认为对技术的深度挖掘和运用，是能够始终矗立在时代风口浪尖的重要根基。",-1),x=l("p",null,"下一讲，我将带你分析 Flutter 和原生跨平台技术栈，同时梳理当下相关技术热点。跨平台其实是一个老生常谈的话题，技术方案也是历经变迁，但始终热点不断。下一讲的内容和今天的内容也有着千丝万缕的联系，别走开，我们下一讲再见！",-1);function P(R,k,S,N,V,w){const n=e("Image");return t(),c("div",null,[E,a(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/91/75/Ciqc1GAOlPOADUxDAACGGDiNvBo264.png"}),s(),i,a(n,{alt:"Lark20210129-191128.png",src:"https://s0.lgstatic.com/i/image/M00/93/2E/CgqCHmAT7b2AYQJdAADnHNucgjE454.png"}),s(),y,a(n,{alt:"Lark20210129-191131.png",src:"https://s0.lgstatic.com/i/image/M00/93/23/Ciqc1GAT7auABbA4AAD1EDPUmAQ243.png"}),s(),d,C,a(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/91/75/Ciqc1GAOlROAPr2kAAK2OejCvBU840.png"}),s(),h,a(n,{alt:"Lark20210129-191134.png",src:"https://s0.lgstatic.com/i/image/M00/93/2E/CgqCHmAT7ceAKd6fAACYXlFC1nQ021.png"}),s(),g,a(n,{alt:"Lark20210129-191136.png",src:"https://s0.lgstatic.com/i/image/M00/93/2E/CgqCHmAT7dKAGSVzAAEawS6G6xY828.png"}),s(),F,u,A,f,D,a(n,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image/M00/94/37/CgqCHmAXmvKAEQr9AAErNUu9oi4120.png"}),s(),m,a(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image2/M01/09/65/Cip5yGAOlUeAEB4oAAO9Arzu18g785.png"}),s(),_,a(n,{alt:"Lark20210129-191112.png",src:"https://s0.lgstatic.com/i/image/M00/93/2E/CgqCHmAT7hyAENc8AAFoe_ttcg4719.png"}),s(),T,a(n,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/91/75/Ciqc1GAOlWyAV2OnAADz2iM_2mM698.png"}),s(),H,a(n,{alt:"Lark20210129-192321.png",src:"https://s0.lgstatic.com/i/image/M00/93/2E/CgqCHmAT8DSAGRn-AAJEN4yKmdI464.png"}),s(),b,a(n,{alt:"Lark20210129-192324.png",src:"https://s0.lgstatic.com/i/image/M00/93/23/Ciqc1GAT8D6ADrYMAAICYbpPasw785.png"}),s(),B,a(n,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image/M00/94/2C/Ciqc1GAXmzmACf4fAAVidO1Nf0U984.png"}),s(),v,a(n,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image/M00/91/80/CgqCHmAOlbyATtP1AAHVogfDtTQ350.png"}),s(),I,x])}const O=o(r,[["render",P]]);export{M as __pageData,O as default};
