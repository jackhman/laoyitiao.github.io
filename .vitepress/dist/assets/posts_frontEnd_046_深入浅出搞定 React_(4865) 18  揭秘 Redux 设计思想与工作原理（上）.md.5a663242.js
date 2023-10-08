import{_ as e,j as o,o as t,g as c,k as l,h as n,Q as p,s}from"./chunks/framework.a0d18f64.js";const V=JSON.parse('{"title":"18揭秘Redux设计思想与工作原理（上）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/046_深入浅出搞定 React/(4865) 18  揭秘 Redux 设计思想与工作原理（上）.md","filePath":"posts/frontEnd/046_深入浅出搞定 React/(4865) 18  揭秘 Redux 设计思想与工作原理（上）.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/046_深入浅出搞定 React/(4865) 18  揭秘 Redux 设计思想与工作原理（上）.md"},E=p('<h1 id="_18揭秘redux设计思想与工作原理-上" tabindex="-1">18揭秘Redux设计思想与工作原理（上） <a class="header-anchor" href="#_18揭秘redux设计思想与工作原理-上" aria-label="Permalink to &quot;18揭秘Redux设计思想与工作原理（上）&quot;">​</a></h1><p>Redux 相信大家或多或少都接触过，关于 Redux 的基础知识，第 05 讲已经有过铺垫。从本讲开始，我们将在此基础上，针对 Redux 进行更加系统和深入的学习。</p><blockquote><p>注：如果你没有接触过 Redux，点击<a href="https://www.redux.org.cn/" target="_blank" rel="noreferrer">这里</a>可以快速上手。</p></blockquote><p><strong>何谓&quot;系统&quot;的学习</strong> ？系统的一个前提就是<strong>建立必要的学习上下文</strong>，尝试理解事情的来龙去脉。</p><p>这些年不管是面试、还是帮读者答疑，我有一个很强烈的感受：很多人对 Redux 的基本操作很熟悉，甚至对它的运作机制也有所了解，但就是不明白为什么要用 Redux，更不清楚 Redux 到底解决了什么问题。因此在讲源码和原理之前，我们首先需要说清楚的是 Redux 的问题背景和架构思想。</p><h3 id="redux-背后的架构思想-认识-flux-架构" tabindex="-1">Redux 背后的架构思想------认识 Flux 架构 <a class="header-anchor" href="#redux-背后的架构思想-认识-flux-架构" aria-label="Permalink to &quot;Redux 背后的架构思想------认识 Flux 架构&quot;">​</a></h3><p>Redux 的设计在很大程度上受益于 Flux 架构，我们可以认为 Redux 是 Flux 的一种实现形式（虽然它并不严格遵循 Flux 的设定），理解 Flux 将帮助你更好地从抽象层面把握 Redux。</p><p>Flux 并不是一个具体的框架，它是一套由 Facebook 技术团队提出的应用架构，这套架构约束的是<strong>应用处理数据的模式</strong>。在 Flux 架构中，一个应用将被拆分为以下 4 个部分。</p><ul><li><p><strong>View</strong> （<strong>视图层</strong> ）：用户界面。该用户界面可以是以任何形式实现出来的，React 组件是一种形式，Vue、Angular 也完全 OK。<strong>Flux 架构与 React 之间并不存在耦合关系</strong>。</p></li><li><p><strong>Action</strong> （<strong>动作</strong>）：也可以理解为视图层发出的&quot;消息&quot;，它会触发应用状态的改变。</p></li><li><p><strong>Dispatcher</strong>（派发器）：它负责对 action 进行分发。</p></li><li><p><strong>Store</strong>（数据层）：它是存储应用状态的&quot;仓库&quot;，此外还会定义修改状态的逻辑。store 的变化最终会映射到 view 层上去。</p></li></ul><p>这 4 个部分之间的协作将通过下图所示的工作流规则来完成配合：</p>',10),y=p('<p>一个典型的 Flux 工作流是这样的：用户与 View 之间产生交互，通过 View 发起一个 Action；Dispatcher 会把这个 Action 派发给 Store，通知 Store 进行相应的状态更新。Store 状态更新完成后，会进一步通知 View 去更新界面。</p><blockquote><p>值得注意的是，图中所有的箭头都是单向的，这也正是 Flux 架构最核心的一个特点------<strong>单向数据流</strong>。</p></blockquote><p>那么 Flux 架构的出现到底是为了解决什么问题呢？</p><h3 id="flux-架构到底解决了什么问题" tabindex="-1">Flux 架构到底解决了什么问题 <a class="header-anchor" href="#flux-架构到底解决了什么问题" aria-label="Permalink to &quot;Flux 架构到底解决了什么问题&quot;">​</a></h3><p>Flux 的核心特征是单向数据流，要想完全了解单向数据流的好处，我们需要先了解双向数据流带来了什么问题。</p><h4 id="mvc-模式在前端场景下的局限性" tabindex="-1">MVC 模式在前端场景下的局限性 <a class="header-anchor" href="#mvc-模式在前端场景下的局限性" aria-label="Permalink to &quot;MVC 模式在前端场景下的局限性&quot;">​</a></h4><p>双向数据流最为典型的代表就是<strong>前端场景下的 MVC 架构</strong>，该架构的示意图如下图所示：</p>',7),i=s("p",null,"除了允许用户通过 View 层交互来触发流程以外，MVC 架构还有另外一种形式，即允许用户通过直接触发 Controller 逻辑来触发流程，这种模式下的架构关系如下图所示：",-1),u=s("p",null,"在 MVC 应用中，会涉及这 3 个部分：",-1),d=s("ul",null,[s("li",null,[s("p",null,"Model（模型），程序需要操作的数据或信息；")]),s("li",null,[s("p",null,"View（视图），用户界面；")]),s("li",null,[s("p",null,"Controller（控制器），用于连接 View 和 Model，管理 Model 与 View 之间的逻辑。")])],-1),A=s("p",null,"原则上来说，三者的关系应该像上图一样，用户操作 View 后，由 Controller 来处理逻辑（或者直接触发 Controller 的逻辑），经过 Controller 将改变应用到 Model 中，最终再反馈到 View 上。在这个过程中，数据流应该是单向的。",-1),F=s("p",null,[s("strong",null,"事实上，在许多服务端的 MVC 应用中，数据流确实能够保持单向。但是在前端场景下，实际的 MVC 应用要复杂不少，前端应用/框架往往出于交互的需要，允许 View 和 Model 直接通信"),n("。此时的架构关系就会变成下图这样：")],-1),h=s("p",null,"这就允许了双向数据流的存在。当业务复杂度较高时，数据流会变得非常混乱，出现类似下图这种情况：",-1),D=s("p",null,"图中我们的示例只有一个 Controller，但考虑到一个应用中还可能存在多个 Controller，实际的情况应该比上图还要复杂得多（尽管图示本身已经够复杂了）。",-1),x=s("p",null,'在如此复杂的依赖关系下，再小的项目变更也将伴随着不容小觑的风险------或许一个小小的改动，就会对整个项目造成"蝴蝶效应"般的巨大影响。如此混乱的修改来源，将会使得我们连 Bug 排查都无从下手，因为你很难区分出一个数据的变化到底是由哪个 Controller 或者哪个 View 引发的。',-1),_=s("p",null,"此时再回头看下 Flux 的架构模式，你应该多少能感受到其中的妙处。这里我们再来回顾一下 Flux 中的数据流模式，请看下图：",-1),g=p('<p>Flux 最核心的地方在于<strong>严格的单向数据流</strong> ，在单向数据流下，<strong>状态的变化是可预测的</strong>。如果 store 中的数据发生了变化，那么有且仅有一个原因，那就是由 Dispatcher 派发 Action 来触发的。这样一来，就从根本上避免了混乱的数据关系，使整个流程变得清晰简单。</p><p>不过这并不意味着 Flux 是完美的。事实上，Flux 对数据流的约束背后是不可忽视的成本：除了开发者的学习成本会提升外，Flux 架构还意味着项目中代码量的增加。</p><p>Flux 架构往往在复杂的项目中才会体现出它的优势和必要性。如果项目中的数据关系并不复杂，其实完全轮不到 Flux 登场，这一点对于 Redux 来说也是一样的。</p><p>现在你不妨结合 Flux 架构的特性，再去品味一遍 Redux 官方给出的这个定义：</p><blockquote><p>Redux 是 JavaScript 状态容器，它提供可预测的状态管理。</p></blockquote><p>此时的你，想必更加能够体会&quot;<strong>可预测</strong>&quot;这三个字背后的深意。</p><h3 id="redux-关键要素与工作流回顾" tabindex="-1">Redux 关键要素与工作流回顾 <a class="header-anchor" href="#redux-关键要素与工作流回顾" aria-label="Permalink to &quot;Redux 关键要素与工作流回顾&quot;">​</a></h3><p>Redux 库和 Flux 架构之间可以说是&quot;你侬我侬&quot;，虽然 Redux 在实现层面并没有按照 Flux 那一套来（比如 Flux 中允许多个 Store 存在，而 Redux 中只有一个 Store 等），但 Redux 在设计思想上确实和 Flux 一脉相承。</p><p>前面我们介绍的 Flux 架构的特征、解决问题的思路，包括使用场景方面的注意事项，完全可以迁移到 Redux 上来用。基于 Flux 的思想背景去理解 Redux 这个落地产物，你的学习曲线将会更加平滑一些。</p><p>接下来我们在介绍 Redux 的实现原理之前，先简单回顾一下它的关键要素与工作流。Redux 主要由 3 部分组成：Store、Reducer 和 Action。</p><ul><li><p>Store：它是一个单一的数据源，而且是只读的。</p></li><li><p>Action 人如其名，是&quot;动作&quot;的意思，它是对变化的描述。</p></li><li><p>Reducer 是一个函数，它负责<strong>对变化进行分发和处理</strong>，最终将新的数据返回给 Store。</p></li></ul><p>Store、Action 和 Reducer 三者紧密配合，便形成了 Redux 独树一帜的工作流，如下图所示：</p>',12),b=p('<p>在 Redux 的整个工作过程中，<strong>数据流是严格单向的</strong> 。如果你想对数据进行修改，只有一种途径：<strong>派发 Action</strong>。Action 会被 Reducer 读取，Reducer 将根据 Action 内容的不同执行不同的计算逻辑，最终生成新的 state（状态），这个新的 state 会更新到 Store 对象里，进而驱动视图层面作出对应的改变。</p><p>对于组件来说，任何组件都可以以约定的方式从 Store 读取到全局的状态，任何组件也都可以通过合理地派发 Action 来修改全局的状态。<strong>Redux 通过提供一个统一的状态容器</strong>，使得数据能够自由而有序地在任意组件之间穿梭。</p><p>复习完 Redux 的工作流，下面我们来结合源码看看这套工作流到底是如何实现的。</p><h3 id="redux-是如何工作的" tabindex="-1">Redux 是如何工作的 <a class="header-anchor" href="#redux-是如何工作的" aria-label="Permalink to &quot;Redux 是如何工作的&quot;">​</a></h3><p>我们先来看一下 Redux 的源码文件夹结构，如下图所示：</p>',5),C=p(`<p>其中，utils 是工具方法库；index.js 作为入口文件，用于对功能模块进行收敛和导出。真正&quot;干活&quot;的是功能模块本身，也就是下面这几个文件：</p><ul><li><p>applyMiddleware.js</p></li><li><p>bindActionCreators.js</p></li><li><p>combineReducers.js</p></li><li><p>compose.js</p></li><li><p>createStore.js</p></li></ul><p>applyMiddleware 是中间件模块，它的独立性较强，我们将在第 20 讲中单独讲解。</p><p>而 bindActionCreators（用于将传入的 actionCreator 与 dispatch 方法相结合，揉成一个新的方法，感兴趣的同学可以点击<a href="https://cn.redux.js.org/docs/api/bindActionCreators.html" target="_blank" rel="noreferrer">这里</a>了解它的使用场景）、combineReducers（用于将多个 reducer 合并起来）、compose（用于把接收到的函数从右向左进行组合）这三个方法均为工具性质的方法。</p><p>如果你对这三个工具方法感到陌生，也不用急着去搜索，因为它们均独立于 Redux 主流程之外，属于&quot;非必须使用&quot;的<strong>辅助 API</strong> ，不熟悉这些 API 并不影响你理解 Redux 本身。理解 Redux 实现原理，真正需要我们关注的模块其实只有一个------<strong>createStore</strong>。</p><p><strong>createStore 方法是我们在使用 Redux 时最先调用的方法，它是整个流程的入口，也是 Redux 中最核心的 API</strong>。接下来我们就从 createStore 入手，顺藤摸瓜揪出 Redux 源码的主流程。</p><h4 id="故事的开始-createstore" tabindex="-1">故事的开始：createStore <a class="header-anchor" href="#故事的开始-createstore" aria-label="Permalink to &quot;故事的开始：createStore&quot;">​</a></h4><p>使用 Redux 的第一步，我们就需要调用 createStore 方法。单纯从使用感上来说，这个方法做的事情似乎就是创建一个 store 对象出来，像这样：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">// 引入 redux</span></span>
<span class="line"><span style="color:#E1E4E8;">import { createStore } from &#39;redux&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">// 创建 store</span></span>
<span class="line"><span style="color:#E1E4E8;">const store = createStore(</span></span>
<span class="line"><span style="color:#E1E4E8;">    reducer,</span></span>
<span class="line"><span style="color:#E1E4E8;">    initial_state,</span></span>
<span class="line"><span style="color:#E1E4E8;">    applyMiddleware(middleware1, middleware2, ...)</span></span>
<span class="line"><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">// 引入 redux</span></span>
<span class="line"><span style="color:#24292E;">import { createStore } from &#39;redux&#39;</span></span>
<span class="line"><span style="color:#24292E;">// 创建 store</span></span>
<span class="line"><span style="color:#24292E;">const store = createStore(</span></span>
<span class="line"><span style="color:#24292E;">    reducer,</span></span>
<span class="line"><span style="color:#24292E;">    initial_state,</span></span>
<span class="line"><span style="color:#24292E;">    applyMiddleware(middleware1, middleware2, ...)</span></span>
<span class="line"><span style="color:#24292E;">);</span></span></code></pre></div><p>createStore 方法可以接收以下 3 个入参：</p><ul><li><p>reducer</p></li><li><p>初始状态内容</p></li><li><p>指定中间件</p></li></ul><p>从拿到入参到返回出 store 的过程中，到底都发生了什么呢？这里我为你提取了 createStore 中主体逻辑的源码（解析在注释里）：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function </span><span style="color:#B392F0;">createStore</span><span style="color:#E1E4E8;">(reducer, preloadedState, enhancer) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 这里处理的是没有设定初始状态的情况，也就是第一个参数和第二个参数都传 function 的情况</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (typeof preloadedState </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;function&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> typeof enhancer </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;undefined&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 此时第二个参数会被认为是 enhancer（中间件）</span></span>
<span class="line"><span style="color:#E1E4E8;">        enhancer </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> preloadedState;</span></span>
<span class="line"><span style="color:#E1E4E8;">        preloadedState </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> undefined;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 当 enhancer 不为空时，便会将原来的 createStore 作为参数传入到 enhancer 中</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (typeof enhancer </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;undefined&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">enhancer</span><span style="color:#E1E4E8;">(createStore)(reducer, preloadedState);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 记录当前的 reducer，因为 replaceReducer 会修改 reducer 的内容</span></span>
<span class="line"><span style="color:#E1E4E8;">    let currentReducer </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> reducer;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 记录当前的 state</span></span>
<span class="line"><span style="color:#E1E4E8;">    let currentState </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> preloadedState;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 声明 listeners 数组，这个数组用于记录在 subscribe 中订阅的事件</span></span>
<span class="line"><span style="color:#E1E4E8;">    let currentListeners </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [];</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// nextListeners 是 currentListeners 的快照</span></span>
<span class="line"><span style="color:#E1E4E8;">    let nextListeners </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> currentListeners;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 该变量用于记录当前是否正在进行 dispatch</span></span>
<span class="line"><span style="color:#E1E4E8;">    let isDispatching </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 该方法用于确认快照是 currentListeners 的副本，而不是 currentListeners 本身</span></span>
<span class="line"><span style="color:#E1E4E8;">    function </span><span style="color:#B392F0;">ensureCanMutateNextListeners</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (nextListeners </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> currentListeners) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            nextListeners </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> currentListeners.</span><span style="color:#B392F0;">slice</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 我们通过调用 getState 来获取当前的状态</span></span>
<span class="line"><span style="color:#E1E4E8;">    function </span><span style="color:#B392F0;">getState</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> currentState;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// subscribe 订阅方法，它将会定义 dispatch 最后执行的 listeners 数组的内容</span></span>
<span class="line"><span style="color:#E1E4E8;">    function </span><span style="color:#B392F0;">subscribe</span><span style="color:#E1E4E8;">(listener) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 校验 listener 的类型</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (typeof listener </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;function&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Error</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;Expected the listener to be a function.&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 禁止在 reducer 中调用 subscribe</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (isDispatching) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Error</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">&#39;You may not call store.subscribe() while the reducer is executing. &#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#9ECBFF;">&#39;If you would like to be notified after the store has been updated, subscribe from a &#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#9ECBFF;">&#39;component and invoke store.getState() in the callback to access the latest state. &#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#9ECBFF;">&#39;See https://redux.js.org/api-reference/store#subscribe(listener) for more details.&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">          )</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 该变量用于防止调用多次 unsubscribe 函数</span></span>
<span class="line"><span style="color:#E1E4E8;">        let isSubscribed </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 确保 nextListeners 与 currentListeners 不指向同一个引用</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">ensureCanMutateNextListeners</span><span style="color:#E1E4E8;">(); </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 注册监听函数</span></span>
<span class="line"><span style="color:#E1E4E8;">        nextListeners.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(listener); </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 返回取消订阅当前 listener 的方法</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> function </span><span style="color:#B392F0;">unsubscribe</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">isSubscribed) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            isSubscribed </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">ensureCanMutateNextListeners</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> index </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> nextListeners.</span><span style="color:#B392F0;">indexOf</span><span style="color:#E1E4E8;">(listener);</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// 将当前的 listener 从 nextListeners 数组中删除 </span></span>
<span class="line"><span style="color:#E1E4E8;">            nextListeners.</span><span style="color:#B392F0;">splice</span><span style="color:#E1E4E8;">(index, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">        };</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 定义 dispatch 方法，用于派发 action </span></span>
<span class="line"><span style="color:#E1E4E8;">    function </span><span style="color:#B392F0;">dispatch</span><span style="color:#E1E4E8;">(action) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 校验 action 的数据格式是否合法</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#B392F0;">isPlainObject</span><span style="color:#E1E4E8;">(action)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Error</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">&#39;Actions must be plain objects. &#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#9ECBFF;">&#39;Use custom middleware for async actions.&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">          )</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 约束 action 中必须有 type 属性作为 action 的唯一标识 </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (typeof action.type </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;undefined&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Error</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#9ECBFF;">&#39;Actions may not have an undefined &quot;type&quot; property. &#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#9ECBFF;">&#39;Have you misspelled a constant?&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">          )</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 若当前已经位于 dispatch 的流程中，则不允许再度发起 dispatch（禁止套娃）</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (isDispatching) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">throw</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Error</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;Reducers may not dispatch actions.&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// 执行 reducer 前，先&quot;上锁&quot;，标记当前已经存在 dispatch 执行流程</span></span>
<span class="line"><span style="color:#E1E4E8;">          isDispatching </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// 调用 reducer，计算新的 state </span></span>
<span class="line"><span style="color:#E1E4E8;">          currentState </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">currentReducer</span><span style="color:#E1E4E8;">(currentState, action)</span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span><span style="color:#F97583;">finally</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// 执行结束后，把&quot;锁&quot;打开，允许再次进行 dispatch </span></span>
<span class="line"><span style="color:#E1E4E8;">          isDispatching </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 触发订阅</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> listeners </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (currentListeners </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> nextListeners);</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (let i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> listeners.length; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> listener </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> listeners[i];</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#B392F0;">listener</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> action;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// replaceReducer 可以更改当前的 reducer</span></span>
<span class="line"><span style="color:#E1E4E8;">    function </span><span style="color:#B392F0;">replaceReducer</span><span style="color:#E1E4E8;">(nextReducer) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        currentReducer </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> nextReducer;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">dispatch</span><span style="color:#E1E4E8;">({ type</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> ActionTypes.REPLACE });</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> store;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 初始化 state，当派发一个 type 为 ActionTypes.INIT 的 action，每个 reducer 都会返回</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 它的初始值</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">dispatch</span><span style="color:#E1E4E8;">({ type</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> ActionTypes.INIT });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// observable 方法可以忽略，它在 redux 内部使用，开发者一般不会直接接触</span></span>
<span class="line"><span style="color:#E1E4E8;">    function </span><span style="color:#B392F0;">observable</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// observable 方法的实现</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 将定义的方法包裹在 store 对象里返回</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      dispatch,</span></span>
<span class="line"><span style="color:#E1E4E8;">      subscribe,</span></span>
<span class="line"><span style="color:#E1E4E8;">      getState,</span></span>
<span class="line"><span style="color:#E1E4E8;">      replaceReducer,</span></span>
<span class="line"><span style="color:#E1E4E8;">      [$$observable]</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> observable</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function </span><span style="color:#6F42C1;">createStore</span><span style="color:#24292E;">(reducer, preloadedState, enhancer) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 这里处理的是没有设定初始状态的情况，也就是第一个参数和第二个参数都传 function 的情况</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (typeof preloadedState </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;function&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> typeof enhancer </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;undefined&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 此时第二个参数会被认为是 enhancer（中间件）</span></span>
<span class="line"><span style="color:#24292E;">        enhancer </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> preloadedState;</span></span>
<span class="line"><span style="color:#24292E;">        preloadedState </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> undefined;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 当 enhancer 不为空时，便会将原来的 createStore 作为参数传入到 enhancer 中</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (typeof enhancer </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;undefined&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">enhancer</span><span style="color:#24292E;">(createStore)(reducer, preloadedState);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 记录当前的 reducer，因为 replaceReducer 会修改 reducer 的内容</span></span>
<span class="line"><span style="color:#24292E;">    let currentReducer </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> reducer;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 记录当前的 state</span></span>
<span class="line"><span style="color:#24292E;">    let currentState </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> preloadedState;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 声明 listeners 数组，这个数组用于记录在 subscribe 中订阅的事件</span></span>
<span class="line"><span style="color:#24292E;">    let currentListeners </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [];</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// nextListeners 是 currentListeners 的快照</span></span>
<span class="line"><span style="color:#24292E;">    let nextListeners </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> currentListeners;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 该变量用于记录当前是否正在进行 dispatch</span></span>
<span class="line"><span style="color:#24292E;">    let isDispatching </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 该方法用于确认快照是 currentListeners 的副本，而不是 currentListeners 本身</span></span>
<span class="line"><span style="color:#24292E;">    function </span><span style="color:#6F42C1;">ensureCanMutateNextListeners</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (nextListeners </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> currentListeners) {</span></span>
<span class="line"><span style="color:#24292E;">            nextListeners </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> currentListeners.</span><span style="color:#6F42C1;">slice</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 我们通过调用 getState 来获取当前的状态</span></span>
<span class="line"><span style="color:#24292E;">    function </span><span style="color:#6F42C1;">getState</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> currentState;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// subscribe 订阅方法，它将会定义 dispatch 最后执行的 listeners 数组的内容</span></span>
<span class="line"><span style="color:#24292E;">    function </span><span style="color:#6F42C1;">subscribe</span><span style="color:#24292E;">(listener) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 校验 listener 的类型</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (typeof listener </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;function&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Error</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;Expected the listener to be a function.&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 禁止在 reducer 中调用 subscribe</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (isDispatching) {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Error</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">&#39;You may not call store.subscribe() while the reducer is executing. &#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#032F62;">&#39;If you would like to be notified after the store has been updated, subscribe from a &#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#032F62;">&#39;component and invoke store.getState() in the callback to access the latest state. &#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#032F62;">&#39;See https://redux.js.org/api-reference/store#subscribe(listener) for more details.&#39;</span></span>
<span class="line"><span style="color:#24292E;">          )</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 该变量用于防止调用多次 unsubscribe 函数</span></span>
<span class="line"><span style="color:#24292E;">        let isSubscribed </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 确保 nextListeners 与 currentListeners 不指向同一个引用</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">ensureCanMutateNextListeners</span><span style="color:#24292E;">(); </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 注册监听函数</span></span>
<span class="line"><span style="color:#24292E;">        nextListeners.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(listener); </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 返回取消订阅当前 listener 的方法</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> function </span><span style="color:#6F42C1;">unsubscribe</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">isSubscribed) {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#D73A49;">return</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            isSubscribed </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">ensureCanMutateNextListeners</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> index </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> nextListeners.</span><span style="color:#6F42C1;">indexOf</span><span style="color:#24292E;">(listener);</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// 将当前的 listener 从 nextListeners 数组中删除 </span></span>
<span class="line"><span style="color:#24292E;">            nextListeners.</span><span style="color:#6F42C1;">splice</span><span style="color:#24292E;">(index, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">        };</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 定义 dispatch 方法，用于派发 action </span></span>
<span class="line"><span style="color:#24292E;">    function </span><span style="color:#6F42C1;">dispatch</span><span style="color:#24292E;">(action) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 校验 action 的数据格式是否合法</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#6F42C1;">isPlainObject</span><span style="color:#24292E;">(action)) {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Error</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">&#39;Actions must be plain objects. &#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#032F62;">&#39;Use custom middleware for async actions.&#39;</span></span>
<span class="line"><span style="color:#24292E;">          )</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 约束 action 中必须有 type 属性作为 action 的唯一标识 </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (typeof action.type </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;undefined&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Error</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#032F62;">&#39;Actions may not have an undefined &quot;type&quot; property. &#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#032F62;">&#39;Have you misspelled a constant?&#39;</span></span>
<span class="line"><span style="color:#24292E;">          )</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 若当前已经位于 dispatch 的流程中，则不允许再度发起 dispatch（禁止套娃）</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (isDispatching) {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">throw</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Error</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;Reducers may not dispatch actions.&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// 执行 reducer 前，先&quot;上锁&quot;，标记当前已经存在 dispatch 执行流程</span></span>
<span class="line"><span style="color:#24292E;">          isDispatching </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// 调用 reducer，计算新的 state </span></span>
<span class="line"><span style="color:#24292E;">          currentState </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">currentReducer</span><span style="color:#24292E;">(currentState, action)</span></span>
<span class="line"><span style="color:#24292E;">        } </span><span style="color:#D73A49;">finally</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// 执行结束后，把&quot;锁&quot;打开，允许再次进行 dispatch </span></span>
<span class="line"><span style="color:#24292E;">          isDispatching </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 触发订阅</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> listeners </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (currentListeners </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> nextListeners);</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (let i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> listeners.length; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> listener </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> listeners[i];</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6F42C1;">listener</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> action;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// replaceReducer 可以更改当前的 reducer</span></span>
<span class="line"><span style="color:#24292E;">    function </span><span style="color:#6F42C1;">replaceReducer</span><span style="color:#24292E;">(nextReducer) {</span></span>
<span class="line"><span style="color:#24292E;">        currentReducer </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> nextReducer;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">dispatch</span><span style="color:#24292E;">({ type</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> ActionTypes.REPLACE });</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> store;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 初始化 state，当派发一个 type 为 ActionTypes.INIT 的 action，每个 reducer 都会返回</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 它的初始值</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">dispatch</span><span style="color:#24292E;">({ type</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> ActionTypes.INIT });</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// observable 方法可以忽略，它在 redux 内部使用，开发者一般不会直接接触</span></span>
<span class="line"><span style="color:#24292E;">    function </span><span style="color:#6F42C1;">observable</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// observable 方法的实现</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 将定义的方法包裹在 store 对象里返回</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      dispatch,</span></span>
<span class="line"><span style="color:#24292E;">      subscribe,</span></span>
<span class="line"><span style="color:#24292E;">      getState,</span></span>
<span class="line"><span style="color:#24292E;">      replaceReducer,</span></span>
<span class="line"><span style="color:#24292E;">      [$$observable]</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> observable</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>通过阅读源码会发现，createStore 从外面看只是一个简单的创建动作，但在内部却别有洞天，涵盖了所有 Redux 主流程中核心方法的定义。</p><p>接下来我将 createStore 内部逻辑总结进一张大图中，这张图涵盖了每个核心方法的工作内容，它将帮助你快速把握 createStore 的逻辑框架。</p>`,15),f=p('<p>在 createStore 导出的方法中，与 Redux 主流程强相关的，同时也是我们平时使用中最常打交道的几个方法，分别是：</p><ul><li><p>getState</p></li><li><p>subscribe</p></li><li><p>dispatch</p></li></ul><p>其中 getState 的源码内容比较简单，我们在逐行分析的过程中已经对它有了充分的认识。而 subscribe 和 dispatch 则分别代表了 Redux 独有的&quot;发布-订阅&quot;模式以及主流程中最为关键的分发动作，在下一讲，我们会重点讲解。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>在本讲，我们首先学习了 Redux 的架构思想，梳理了&quot;单向数据流&quot;这一核心特征的来龙去脉，真正理解了 Redux 定义中&quot;可预测&quot;这 3 个字背后的深意。</p><p>随后，在复习 Redux 关键要素与工作流程的基础上，我们尝试对其源码进行拆解，认识了 Redux 源码的基本构成与主要模块，并选取了 createStore 这个核心模块作为发力点，提取出了 Redux 源码中值得我们格外深入的两个方法------subscribe 和 dispatch。</p><p>那么 subscribe 和 dispatch 中到底藏着什么样的玄机，值得我们继续深入学习呢？我们下一讲见分晓！</p>',7);function R(S,m,q,B,w,T){const a=o("Image");return t(),c("div",null,[E,l(a,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image/M00/7E/D2/CgqCHl_PX4iAVQDeAABqpNRcHXQ065.png"}),n(),y,l(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/7E/C5/CgqCHl_PVeKAMZaHAACLXZ2Co3Q900.png"}),n(),i,l(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/7E/BA/Ciqc1F_PVe2AaJt5AACCt5hpXUM704.png"}),n(),u,d,A,F,l(a,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/7E/BA/Ciqc1F_PVfWAMialAACIyVXJabE467.png"}),n(),h,l(a,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image/M00/7E/C5/CgqCHl_PVgWAcAkZAAFInClVHRM354.png"}),n(),D,x,_,l(a,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image/M00/7E/D2/CgqCHl_PX5mAYUWaAABqpNRcHXQ626.png"}),n(),g,l(a,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image/M00/7E/C6/CgqCHl_PVh-ATfOGAAB089LdYcY341.png"}),n(),b,l(a,{alt:"Drawing 14.png",src:"https://s0.lgstatic.com/i/image/M00/7E/C6/CgqCHl_PVieAeMfAAABARscWp8o305.png"}),n(),C,l(a,{alt:"Drawing 15.png",src:"https://s0.lgstatic.com/i/image/M00/7E/BB/Ciqc1F_PVkCAST4AAAJfMvoaI4Q803.png"}),n(),f])}const v=e(r,[["render",R]]);export{V as __pageData,v as default};
