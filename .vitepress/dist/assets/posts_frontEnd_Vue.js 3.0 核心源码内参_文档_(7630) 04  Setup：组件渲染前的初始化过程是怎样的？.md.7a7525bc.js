import{_ as o,j as e,o as t,g as c,k as a,h as p,Q as l,s}from"./chunks/framework.4e7d56ce.js";const v=JSON.parse('{"title":"04Setup：组件渲染前的初始化过程是怎样的？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Vue.js 3.0 核心源码内参_文档/(7630) 04  Setup：组件渲染前的初始化过程是怎样的？.md","filePath":"posts/frontEnd/Vue.js 3.0 核心源码内参_文档/(7630) 04  Setup：组件渲染前的初始化过程是怎样的？.md","lastUpdated":1696417798000}'),r={name:"posts/frontEnd/Vue.js 3.0 核心源码内参_文档/(7630) 04  Setup：组件渲染前的初始化过程是怎样的？.md"},E=l(`<h1 id="_04setup-组件渲染前的初始化过程是怎样的" tabindex="-1">04Setup：组件渲染前的初始化过程是怎样的？ <a class="header-anchor" href="#_04setup-组件渲染前的初始化过程是怎样的" aria-label="Permalink to &quot;04Setup：组件渲染前的初始化过程是怎样的？&quot;">​</a></h1><p>Vue.js 3.0 允许我们在编写组件的时候添加一个 setup 启动函数，它是 Composition API 逻辑组织的入口，本节课我们就来分析一下这个函数。</p><p>我们先通过一段代码认识它，在这里编写一个 button 组件：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">button</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">@click=&quot;increment&quot;&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">Count</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">is:</span><span style="color:#E1E4E8;"> { { state.count }}</span><span style="color:#FDAEB7;font-style:italic;">,</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">double</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">is:</span><span style="color:#E1E4E8;"> { { state.double }}</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">&lt;/button&gt;</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;script&gt;</span></span>
<span class="line"><span style="color:#B392F0;">import</span><span style="color:#E1E4E8;"> { reactive, computed } </span><span style="color:#B392F0;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#B392F0;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    const state </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">reactive</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">      count: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      double: </span><span style="color:#B392F0;">computed</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> state.count </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">    function </span><span style="color:#B392F0;">increment</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">      state.count</span><span style="color:#F97583;">++</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    return {</span></span>
<span class="line"><span style="color:#E1E4E8;">      state,</span></span>
<span class="line"><span style="color:#E1E4E8;">      increment</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;/script&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">button</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">@click=&quot;increment&quot;&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">Count</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">is:</span><span style="color:#24292E;"> { { state.count }}</span><span style="color:#B31D28;font-style:italic;">,</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">double</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">is:</span><span style="color:#24292E;"> { { state.double }}</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">&lt;/button&gt;</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;script&gt;</span></span>
<span class="line"><span style="color:#6F42C1;">import</span><span style="color:#24292E;"> { reactive, computed } </span><span style="color:#6F42C1;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#6F42C1;">export</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    const state </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">reactive</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">      count: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      double: </span><span style="color:#6F42C1;">computed</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> state.count </span><span style="color:#D73A49;">*</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">    function </span><span style="color:#6F42C1;">increment</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">      state.count</span><span style="color:#D73A49;">++</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    return {</span></span>
<span class="line"><span style="color:#24292E;">      state,</span></span>
<span class="line"><span style="color:#24292E;">      increment</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;/script&gt;</span></span></code></pre></div><p>可以看到，这段代码和 Vue.js 2.x 组件的写法相比，多了一个 setup 启动函数，另外组件中也没有定义 props、data、computed 这些 options。</p><p>在 setup 函数内部，定义了一个响应式对象 state，它是通过 reactive API 创建的。state 对象有 count 和 double 两个属性，其中 count 对应一个数字属性的值；而double 通过 computed API 创建，对应一个计算属性的值。reactive API 和 computed API 不是我们关注的重点，在后续响应式章节我会详细介绍。</p><p>这里需要注意的是，<strong>模板中引用到的变量 state 和 increment 包含在 setup 函数的返回对象中，那么它们是如何建立联系的呢？</strong></p><p>我们先来回想一下 Vue.js 2.x 编写组件的时候，会在 props、data、methods、computed 等 options 中定义一些变量。在组件初始化阶段，Vue.js 内部会处理这些 options，即把定义的变量添加到了组件实例上。等模板编译成 render 函数的时候，内部通过 with(this){} 的语法去访问在组件实例中的变量。</p><p>那么到了 Vue.js 3.0，既支持组件定义 setup 函数，而且在模板 render 的时候，又可以访问到 setup 函数返回的值，这是如何实现的？我们来一探究竟。</p><h3 id="创建和设置组件实例" tabindex="-1">创建和设置组件实例 <a class="header-anchor" href="#创建和设置组件实例" aria-label="Permalink to &quot;创建和设置组件实例&quot;">​</a></h3><p>首先，我们来回顾一下组件的渲染流程：创建 vnode 、渲染 vnode 和生成 DOM。</p>`,11),y=l(`<p>其中渲染 vnode 的过程主要就是在挂载组件：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> mountComponent </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 创建组件实例</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> instance </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (initialVNode.component </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createComponentInstance</span><span style="color:#E1E4E8;">(initialVNode, parentComponent, parentSuspense))</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 设置组件实例</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">setupComponent</span><span style="color:#E1E4E8;">(instance)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 设置并运行带副作用的渲染函数</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">setupRenderEffect</span><span style="color:#E1E4E8;">(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> mountComponent </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 创建组件实例</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> instance </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (initialVNode.component </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createComponentInstance</span><span style="color:#24292E;">(initialVNode, parentComponent, parentSuspense))</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 设置组件实例</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">setupComponent</span><span style="color:#24292E;">(instance)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 设置并运行带副作用的渲染函数</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">setupRenderEffect</span><span style="color:#24292E;">(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>可以看到，这段挂载组件的代码主要做了三件事情：创建组件实例、设置组件实例和设置并运行带副作用的渲染函数。前两个流程就跟我们今天提到的问题息息相关，所以这一节课我们将重点分析它们。</p><p>先看<strong>创建组件实例</strong>的流程，我们要关注 createComponentInstance 方法的实现：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function </span><span style="color:#B392F0;">createComponentInstance</span><span style="color:#E1E4E8;"> (vnode, parent, suspense) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 继承父组件实例上的 appContext，如果是根组件，则直接从根 vnode 中取。</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> appContext </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (parent </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> parent.appContext </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> vnode.appContext) </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> emptyAppContext;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> instance </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 组件唯一 id</span></span>
<span class="line"><span style="color:#E1E4E8;">    uid</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> uid</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 组件 vnode</span></span>
<span class="line"><span style="color:#E1E4E8;">    vnode,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 父组件实例</span></span>
<span class="line"><span style="color:#E1E4E8;">    parent,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// app 上下文</span></span>
<span class="line"><span style="color:#E1E4E8;">    appContext,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// vnode 节点类型</span></span>
<span class="line"><span style="color:#E1E4E8;">    type</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> vnode.type,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 根组件实例</span></span>
<span class="line"><span style="color:#E1E4E8;">    root</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 新的组件 vnode</span></span>
<span class="line"><span style="color:#E1E4E8;">    next</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 子节点 vnode</span></span>
<span class="line"><span style="color:#E1E4E8;">    subTree</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 带副作用更新函数</span></span>
<span class="line"><span style="color:#E1E4E8;">    update</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 渲染函数</span></span>
<span class="line"><span style="color:#E1E4E8;">    render</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 渲染上下文代理</span></span>
<span class="line"><span style="color:#E1E4E8;">    proxy</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 带有 with 区块的渲染上下文代理</span></span>
<span class="line"><span style="color:#E1E4E8;">    withProxy</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 响应式相关对象</span></span>
<span class="line"><span style="color:#E1E4E8;">    effects</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 依赖注入相关</span></span>
<span class="line"><span style="color:#E1E4E8;">    provides</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> parent </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> parent.provides </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> Object.</span><span style="color:#B392F0;">create</span><span style="color:#E1E4E8;">(appContext.provides),</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 渲染代理的属性访问缓存</span></span>
<span class="line"><span style="color:#E1E4E8;">    accessCache</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 渲染缓存</span></span>
<span class="line"><span style="color:#E1E4E8;">    renderCache</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> [],</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 渲染上下文</span></span>
<span class="line"><span style="color:#E1E4E8;">    ctx</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> EMPTY_OBJ,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// data 数据</span></span>
<span class="line"><span style="color:#E1E4E8;">    data</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> EMPTY_OBJ,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// props 数据</span></span>
<span class="line"><span style="color:#E1E4E8;">    props</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> EMPTY_OBJ,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 普通属性</span></span>
<span class="line"><span style="color:#E1E4E8;">    attrs</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> EMPTY_OBJ,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 插槽相关</span></span>
<span class="line"><span style="color:#E1E4E8;">    slots</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> EMPTY_OBJ,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 组件或者 DOM 的 ref 引用</span></span>
<span class="line"><span style="color:#E1E4E8;">    refs</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> EMPTY_OBJ,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// setup 函数返回的响应式结果</span></span>
<span class="line"><span style="color:#E1E4E8;">    setupState</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> EMPTY_OBJ,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// setup 函数上下文数据</span></span>
<span class="line"><span style="color:#E1E4E8;">    setupContext</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 注册的组件</span></span>
<span class="line"><span style="color:#E1E4E8;">    components</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> Object.</span><span style="color:#B392F0;">create</span><span style="color:#E1E4E8;">(appContext.components),</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 注册的指令</span></span>
<span class="line"><span style="color:#E1E4E8;">    directives</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> Object.</span><span style="color:#B392F0;">create</span><span style="color:#E1E4E8;">(appContext.directives),</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// suspense 相关</span></span>
<span class="line"><span style="color:#E1E4E8;">    suspense,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// suspense 异步依赖</span></span>
<span class="line"><span style="color:#E1E4E8;">    asyncDep</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// suspense 异步依赖是否都已处理</span></span>
<span class="line"><span style="color:#E1E4E8;">    asyncResolved</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 是否挂载</span></span>
<span class="line"><span style="color:#E1E4E8;">    isMounted</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 是否卸载</span></span>
<span class="line"><span style="color:#E1E4E8;">    isUnmounted</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 是否激活</span></span>
<span class="line"><span style="color:#E1E4E8;">    isDeactivated</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 生命周期，before create</span></span>
<span class="line"><span style="color:#E1E4E8;">    bc</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 生命周期，created</span></span>
<span class="line"><span style="color:#E1E4E8;">    c</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 生命周期，before mount</span></span>
<span class="line"><span style="color:#E1E4E8;">    bm</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 生命周期，mounted</span></span>
<span class="line"><span style="color:#E1E4E8;">    m</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 生命周期，before update</span></span>
<span class="line"><span style="color:#E1E4E8;">    bu</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 生命周期，updated</span></span>
<span class="line"><span style="color:#E1E4E8;">    u</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 生命周期，unmounted</span></span>
<span class="line"><span style="color:#E1E4E8;">    um</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 生命周期，before unmount</span></span>
<span class="line"><span style="color:#E1E4E8;">    bum</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 生命周期, deactivated</span></span>
<span class="line"><span style="color:#E1E4E8;">    da</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 生命周期 activated</span></span>
<span class="line"><span style="color:#E1E4E8;">    a</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 生命周期 render triggered</span></span>
<span class="line"><span style="color:#E1E4E8;">    rtg</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 生命周期 render tracked</span></span>
<span class="line"><span style="color:#E1E4E8;">    rtc</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 生命周期 error captured</span></span>
<span class="line"><span style="color:#E1E4E8;">    ec</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 派发事件方法</span></span>
<span class="line"><span style="color:#E1E4E8;">    emit</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 初始化渲染上下文</span></span>
<span class="line"><span style="color:#E1E4E8;">  instance.ctx </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> { _</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> instance }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 初始化根组件指针</span></span>
<span class="line"><span style="color:#E1E4E8;">  instance.root </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> parent </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> parent.root </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> instance</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 初始化派发事件方法</span></span>
<span class="line"><span style="color:#E1E4E8;">  instance.emit </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> emit.</span><span style="color:#B392F0;">bind</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">, instance)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> instance</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function </span><span style="color:#6F42C1;">createComponentInstance</span><span style="color:#24292E;"> (vnode, parent, suspense) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 继承父组件实例上的 appContext，如果是根组件，则直接从根 vnode 中取。</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> appContext </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (parent </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> parent.appContext </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> vnode.appContext) </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> emptyAppContext;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> instance </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 组件唯一 id</span></span>
<span class="line"><span style="color:#24292E;">    uid</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> uid</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 组件 vnode</span></span>
<span class="line"><span style="color:#24292E;">    vnode,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 父组件实例</span></span>
<span class="line"><span style="color:#24292E;">    parent,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// app 上下文</span></span>
<span class="line"><span style="color:#24292E;">    appContext,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// vnode 节点类型</span></span>
<span class="line"><span style="color:#24292E;">    type</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> vnode.type,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 根组件实例</span></span>
<span class="line"><span style="color:#24292E;">    root</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 新的组件 vnode</span></span>
<span class="line"><span style="color:#24292E;">    next</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 子节点 vnode</span></span>
<span class="line"><span style="color:#24292E;">    subTree</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 带副作用更新函数</span></span>
<span class="line"><span style="color:#24292E;">    update</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 渲染函数</span></span>
<span class="line"><span style="color:#24292E;">    render</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 渲染上下文代理</span></span>
<span class="line"><span style="color:#24292E;">    proxy</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 带有 with 区块的渲染上下文代理</span></span>
<span class="line"><span style="color:#24292E;">    withProxy</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 响应式相关对象</span></span>
<span class="line"><span style="color:#24292E;">    effects</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 依赖注入相关</span></span>
<span class="line"><span style="color:#24292E;">    provides</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> parent </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> parent.provides </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> Object.</span><span style="color:#6F42C1;">create</span><span style="color:#24292E;">(appContext.provides),</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 渲染代理的属性访问缓存</span></span>
<span class="line"><span style="color:#24292E;">    accessCache</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 渲染缓存</span></span>
<span class="line"><span style="color:#24292E;">    renderCache</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> [],</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 渲染上下文</span></span>
<span class="line"><span style="color:#24292E;">    ctx</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> EMPTY_OBJ,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// data 数据</span></span>
<span class="line"><span style="color:#24292E;">    data</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> EMPTY_OBJ,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// props 数据</span></span>
<span class="line"><span style="color:#24292E;">    props</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> EMPTY_OBJ,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 普通属性</span></span>
<span class="line"><span style="color:#24292E;">    attrs</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> EMPTY_OBJ,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 插槽相关</span></span>
<span class="line"><span style="color:#24292E;">    slots</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> EMPTY_OBJ,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 组件或者 DOM 的 ref 引用</span></span>
<span class="line"><span style="color:#24292E;">    refs</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> EMPTY_OBJ,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// setup 函数返回的响应式结果</span></span>
<span class="line"><span style="color:#24292E;">    setupState</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> EMPTY_OBJ,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// setup 函数上下文数据</span></span>
<span class="line"><span style="color:#24292E;">    setupContext</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 注册的组件</span></span>
<span class="line"><span style="color:#24292E;">    components</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> Object.</span><span style="color:#6F42C1;">create</span><span style="color:#24292E;">(appContext.components),</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 注册的指令</span></span>
<span class="line"><span style="color:#24292E;">    directives</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> Object.</span><span style="color:#6F42C1;">create</span><span style="color:#24292E;">(appContext.directives),</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// suspense 相关</span></span>
<span class="line"><span style="color:#24292E;">    suspense,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// suspense 异步依赖</span></span>
<span class="line"><span style="color:#24292E;">    asyncDep</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// suspense 异步依赖是否都已处理</span></span>
<span class="line"><span style="color:#24292E;">    asyncResolved</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 是否挂载</span></span>
<span class="line"><span style="color:#24292E;">    isMounted</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 是否卸载</span></span>
<span class="line"><span style="color:#24292E;">    isUnmounted</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 是否激活</span></span>
<span class="line"><span style="color:#24292E;">    isDeactivated</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 生命周期，before create</span></span>
<span class="line"><span style="color:#24292E;">    bc</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 生命周期，created</span></span>
<span class="line"><span style="color:#24292E;">    c</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 生命周期，before mount</span></span>
<span class="line"><span style="color:#24292E;">    bm</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 生命周期，mounted</span></span>
<span class="line"><span style="color:#24292E;">    m</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 生命周期，before update</span></span>
<span class="line"><span style="color:#24292E;">    bu</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 生命周期，updated</span></span>
<span class="line"><span style="color:#24292E;">    u</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 生命周期，unmounted</span></span>
<span class="line"><span style="color:#24292E;">    um</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 生命周期，before unmount</span></span>
<span class="line"><span style="color:#24292E;">    bum</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 生命周期, deactivated</span></span>
<span class="line"><span style="color:#24292E;">    da</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 生命周期 activated</span></span>
<span class="line"><span style="color:#24292E;">    a</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 生命周期 render triggered</span></span>
<span class="line"><span style="color:#24292E;">    rtg</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 生命周期 render tracked</span></span>
<span class="line"><span style="color:#24292E;">    rtc</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 生命周期 error captured</span></span>
<span class="line"><span style="color:#24292E;">    ec</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 派发事件方法</span></span>
<span class="line"><span style="color:#24292E;">    emit</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 初始化渲染上下文</span></span>
<span class="line"><span style="color:#24292E;">  instance.ctx </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> { _</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> instance }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 初始化根组件指针</span></span>
<span class="line"><span style="color:#24292E;">  instance.root </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> parent </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> parent.root </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> instance</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 初始化派发事件方法</span></span>
<span class="line"><span style="color:#24292E;">  instance.emit </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> emit.</span><span style="color:#6F42C1;">bind</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">, instance)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> instance</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>从上述代码中可以看到，组件实例 instance 上定义了很多属性，你千万不要被这茫茫多的属性吓到，因为其中一些属性是为了实现某个场景或者某个功能所定义的，你只需要通过我在代码中的注释大概知道它们是做什么的即可。</p><p>Vue.js 2.x 使用 new Vue 来初始化一个组件的实例，到了 Vue.js 3.0，我们直接通过创建对象去创建组件的实例。这两种方式并无本质的区别，都是引用一个对象，在整个组件的生命周期中去维护组件的状态数据和上下文环境。</p><p>创建好 instance 实例后，接下来就是设置它的一些属性。目前已完成了组件的上下文、根组件指针以及派发事件方法的设置。我们在后面会继续分析更多 instance 实例属性的设置逻辑。</p><p>接着是<strong>组件实例的设置流程</strong>，对 setup 函数的处理就在这里完成，我们来看一下 setupComponent 方法的实现：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function </span><span style="color:#B392F0;">setupComponent</span><span style="color:#E1E4E8;"> (instance, isSSR </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { props, children, shapeFlag } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> instance.vnode</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 判断是否是一个有状态的组件</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> isStateful </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> shapeFlag </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">4</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 初始化 props</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">initProps</span><span style="color:#E1E4E8;">(instance, props, isStateful, isSSR)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 初始化 插槽</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">initSlots</span><span style="color:#E1E4E8;">(instance, children)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 设置有状态的组件实例</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> setupResult </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> isStateful</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setupStatefulComponent</span><span style="color:#E1E4E8;">(instance, isSSR)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> undefined</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> setupResult</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function </span><span style="color:#6F42C1;">setupComponent</span><span style="color:#24292E;"> (instance, isSSR </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { props, children, shapeFlag } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> instance.vnode</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 判断是否是一个有状态的组件</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> isStateful </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> shapeFlag </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">4</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 初始化 props</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">initProps</span><span style="color:#24292E;">(instance, props, isStateful, isSSR)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 初始化 插槽</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">initSlots</span><span style="color:#24292E;">(instance, children)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 设置有状态的组件实例</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> setupResult </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> isStateful</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setupStatefulComponent</span><span style="color:#24292E;">(instance, isSSR)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> undefined</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> setupResult</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>可以看到，我们从组件 vnode 中获取了 props、children、shapeFlag 等属性，然后分别对 props 和插槽进行初始化，这两部分逻辑在后续的章节再详细分析。根据 shapeFlag 的值，我们可以判断这是不是一个有状态组件，如果是则要进一步去设置有状态组件的实例。</p><p>接下来我们要关注到 setupStatefulComponent 函数，它主要做了三件事：创建渲染上下文代理、判断处理 setup 函数和完成组件实例设置。它代码如下所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function </span><span style="color:#B392F0;">setupStatefulComponent</span><span style="color:#E1E4E8;"> (instance, isSSR) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> Component </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> instance.type</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 创建渲染代理的属性访问缓存</span></span>
<span class="line"><span style="color:#E1E4E8;">  instance.accessCache </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {}</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 创建渲染上下文代理</span></span>
<span class="line"><span style="color:#E1E4E8;">  instance.proxy </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Proxy</span><span style="color:#E1E4E8;">(instance.ctx, PublicInstanceProxyHandlers)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 判断处理 setup 函数</span></span>
<span class="line"><span style="color:#E1E4E8;">  const { setup } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Component</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (setup) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 如果 setup 函数带参数，则创建一个 setupContext</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> setupContext </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (instance.setupContext </span><span style="color:#F97583;">=</span></span>
<span class="line"><span style="color:#E1E4E8;">      setup.length </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createSetupContext</span><span style="color:#E1E4E8;">(instance) </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 执行 setup 函数，获取结果</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> setupResult </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">callWithErrorHandling</span><span style="color:#E1E4E8;">(setup, instance, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">/* SETUP_FUNCTION */</span><span style="color:#E1E4E8;">, [instance.props, setupContext])</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 处理 setup 执行结果</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">handleSetupResult</span><span style="color:#E1E4E8;">(instance, setupResult)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 完成组件实例设置</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">finishComponentSetup</span><span style="color:#E1E4E8;">(instance)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function </span><span style="color:#6F42C1;">setupStatefulComponent</span><span style="color:#24292E;"> (instance, isSSR) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> Component </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> instance.type</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 创建渲染代理的属性访问缓存</span></span>
<span class="line"><span style="color:#24292E;">  instance.accessCache </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {}</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 创建渲染上下文代理</span></span>
<span class="line"><span style="color:#24292E;">  instance.proxy </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Proxy</span><span style="color:#24292E;">(instance.ctx, PublicInstanceProxyHandlers)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 判断处理 setup 函数</span></span>
<span class="line"><span style="color:#24292E;">  const { setup } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Component</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (setup) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 如果 setup 函数带参数，则创建一个 setupContext</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> setupContext </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (instance.setupContext </span><span style="color:#D73A49;">=</span></span>
<span class="line"><span style="color:#24292E;">      setup.length </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createSetupContext</span><span style="color:#24292E;">(instance) </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 执行 setup 函数，获取结果</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> setupResult </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">callWithErrorHandling</span><span style="color:#24292E;">(setup, instance, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">/* SETUP_FUNCTION */</span><span style="color:#24292E;">, [instance.props, setupContext])</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 处理 setup 执行结果</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">handleSetupResult</span><span style="color:#24292E;">(instance, setupResult)</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 完成组件实例设置</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">finishComponentSetup</span><span style="color:#24292E;">(instance)</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="创建渲染上下文代理" tabindex="-1">创建渲染上下文代理 <a class="header-anchor" href="#创建渲染上下文代理" aria-label="Permalink to &quot;创建渲染上下文代理&quot;">​</a></h3><p>首先是创建渲染上下文代理的流程，它主要对 instance.ctx 做了代理。在分析实现前，我们需要思考一个问题，这里为什么需要代理呢？</p><p>其实在 Vue.js 2.x 中，也有类似的数据代理逻辑，比如 props 求值后的数据，实际上存储在 this._props 上，而 data 中定义的数据存储在 this._data 上。举个例子：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;{ { msg }}&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">export default {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">data</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    msg: </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;{ { msg }}&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">export default {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">data</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    msg: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>在初始化组件的时候，data 中定义的 msg 在组件内部是存储在 this._data 上的，而模板渲染的时候访问 this.msg，实际上访问的是 this._data.msg，这是因为 Vue.js 2.x 在初始化 data 的时候，做了一层 proxy 代理。</p><p>到了 Vue.js 3.0，为了方便维护，我们把组件中不同状态的数据存储到不同的属性中，比如存储到 setupState、ctx、data、props 中。我们在执行组件渲染函数的时候，为了方便用户使用，会直接访问渲染上下文 instance.ctx 中的属性，所以我们也要做一层 proxy，对渲染上下文 instance.ctx 属性的访问和修改，代理到对 setupState、ctx、data、props 中的数据的访问和修改。</p><p>明确了代理的需求后，我们接下来就要分析 proxy 的几个方法： get、set 和 has。</p><p>当我们<strong>访问 instance.ctx 渲染上下文中的属性</strong> 时，就会<strong>进入 get 函数</strong>。我们来看一下它的实现：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> PublicInstanceProxyHandlers </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;"> ({ _</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> instance }, key) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { ctx, setupState, data, props, accessCache, type, appContext } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> instance</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (key[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;$&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// setupState / data / props / ctx</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 渲染代理的属性访问缓存中</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> n </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> accessCache[key]</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (n </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> undefined) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 从缓存中取</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">switch</span><span style="color:#E1E4E8;"> (n) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">/* SETUP */</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> setupState[key]</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">:</span><span style="color:#6A737D;">/* DATA */</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> data[key]</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">:</span><span style="color:#6A737D;">/* CONTEXT */</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> ctx[key]</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">/* PROPS */</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> props[key]</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (setupState </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> EMPTY_OBJ </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">hasOwn</span><span style="color:#E1E4E8;">(setupState, key)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        accessCache[key] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 从 setupState 中取数据</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> setupState[key]</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (data </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> EMPTY_OBJ </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">hasOwn</span><span style="color:#E1E4E8;">(data, key)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        accessCache[key] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 从 data 中取数据</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> data[key]</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">        type.props </span><span style="color:#F97583;">&amp;&amp;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">hasOwn</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">normalizePropsOptions</span><span style="color:#E1E4E8;">(type.props)[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">], key)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        accessCache[key] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 从 props 中取数据</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> props[key]</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (ctx </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> EMPTY_OBJ </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">hasOwn</span><span style="color:#E1E4E8;">(ctx, key)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        accessCache[key] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 从 ctx 中取数据</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> ctx[key]</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 都取不到</span></span>
<span class="line"><span style="color:#E1E4E8;">        accessCache[key] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">4</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> publicGetter </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> publicPropertiesMap[key]</span></span>
<span class="line"><span style="color:#E1E4E8;">    let cssModule, globalProperties</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 公开的 $xxx 属性或方法</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (publicGetter) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">publicGetter</span><span style="color:#E1E4E8;">(instance)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// css 模块，通过 vue-loader 编译的时候注入</span></span>
<span class="line"><span style="color:#E1E4E8;">      (cssModule </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> type.__cssModules) </span><span style="color:#F97583;">&amp;&amp;</span></span>
<span class="line"><span style="color:#E1E4E8;">      (cssModule </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> cssModule[key])) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> cssModule</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (ctx </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> EMPTY_OBJ </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">hasOwn</span><span style="color:#E1E4E8;">(ctx, key)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 用户自定义的属性，也用 \`$\` 开头</span></span>
<span class="line"><span style="color:#E1E4E8;">      accessCache[key] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">3</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> ctx[key]</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 全局定义的属性</span></span>
<span class="line"><span style="color:#E1E4E8;">      ((globalProperties </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> appContext.config.globalProperties),</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">hasOwn</span><span style="color:#E1E4E8;">(globalProperties, key))) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> globalProperties[key]</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ((p<wbr>rocess.env.NODE_ENV </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;production&#39;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">&amp;&amp;</span></span>
<span class="line"><span style="color:#E1E4E8;">      currentRenderingInstance </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> key.</span><span style="color:#B392F0;">indexOf</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;__v&#39;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (data </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> EMPTY_OBJ </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> key[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;$&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">hasOwn</span><span style="color:#E1E4E8;">(data, key)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 如果在 data 中定义的数据以 $ 开头，会报警告，因为 $ 是保留字符，不会做代理</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">warn</span><span style="color:#E1E4E8;">(\`Property \${JSON.</span><span style="color:#B392F0;">stringify</span><span style="color:#E1E4E8;">(key)} must be accessed via $data because it starts with a reserved \` </span><span style="color:#F97583;">+</span></span>
<span class="line"><span style="color:#E1E4E8;">          \`character and is not proxied on the render context.\`)</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 在模板中使用的变量如果没有定义，报警告</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">warn</span><span style="color:#E1E4E8;">(\`Property \${JSON.</span><span style="color:#B392F0;">stringify</span><span style="color:#E1E4E8;">(key)} was accessed during render \` </span><span style="color:#F97583;">+</span></span>
<span class="line"><span style="color:#E1E4E8;">          \`but is not defined on instance.\`)</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> PublicInstanceProxyHandlers </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">get</span><span style="color:#24292E;"> ({ _</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> instance }, key) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { ctx, setupState, data, props, accessCache, type, appContext } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> instance</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (key[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;$&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// setupState / data / props / ctx</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 渲染代理的属性访问缓存中</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> n </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> accessCache[key]</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (n </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> undefined) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 从缓存中取</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">switch</span><span style="color:#24292E;"> (n) {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">/* SETUP */</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> setupState[key]</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">:</span><span style="color:#6A737D;">/* DATA */</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> data[key]</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">:</span><span style="color:#6A737D;">/* CONTEXT */</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> ctx[key]</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">/* PROPS */</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> props[key]</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (setupState </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> EMPTY_OBJ </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">hasOwn</span><span style="color:#24292E;">(setupState, key)) {</span></span>
<span class="line"><span style="color:#24292E;">        accessCache[key] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 从 setupState 中取数据</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> setupState[key]</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (data </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> EMPTY_OBJ </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">hasOwn</span><span style="color:#24292E;">(data, key)) {</span></span>
<span class="line"><span style="color:#24292E;">        accessCache[key] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 从 data 中取数据</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> data[key]</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">        type.props </span><span style="color:#D73A49;">&amp;&amp;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">hasOwn</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">normalizePropsOptions</span><span style="color:#24292E;">(type.props)[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">], key)) {</span></span>
<span class="line"><span style="color:#24292E;">        accessCache[key] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 从 props 中取数据</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> props[key]</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (ctx </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> EMPTY_OBJ </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">hasOwn</span><span style="color:#24292E;">(ctx, key)) {</span></span>
<span class="line"><span style="color:#24292E;">        accessCache[key] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 从 ctx 中取数据</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> ctx[key]</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 都取不到</span></span>
<span class="line"><span style="color:#24292E;">        accessCache[key] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">4</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> publicGetter </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> publicPropertiesMap[key]</span></span>
<span class="line"><span style="color:#24292E;">    let cssModule, globalProperties</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 公开的 $xxx 属性或方法</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (publicGetter) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">publicGetter</span><span style="color:#24292E;">(instance)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// css 模块，通过 vue-loader 编译的时候注入</span></span>
<span class="line"><span style="color:#24292E;">      (cssModule </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> type.__cssModules) </span><span style="color:#D73A49;">&amp;&amp;</span></span>
<span class="line"><span style="color:#24292E;">      (cssModule </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> cssModule[key])) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> cssModule</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (ctx </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> EMPTY_OBJ </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">hasOwn</span><span style="color:#24292E;">(ctx, key)) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 用户自定义的属性，也用 \`$\` 开头</span></span>
<span class="line"><span style="color:#24292E;">      accessCache[key] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">3</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> ctx[key]</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 全局定义的属性</span></span>
<span class="line"><span style="color:#24292E;">      ((globalProperties </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> appContext.config.globalProperties),</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">hasOwn</span><span style="color:#24292E;">(globalProperties, key))) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> globalProperties[key]</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ((p<wbr>rocess.env.NODE_ENV </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;production&#39;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">&amp;&amp;</span></span>
<span class="line"><span style="color:#24292E;">      currentRenderingInstance </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> key.</span><span style="color:#6F42C1;">indexOf</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;__v&#39;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (data </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> EMPTY_OBJ </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> key[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;$&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">hasOwn</span><span style="color:#24292E;">(data, key)) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 如果在 data 中定义的数据以 $ 开头，会报警告，因为 $ 是保留字符，不会做代理</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">warn</span><span style="color:#24292E;">(\`Property \${JSON.</span><span style="color:#6F42C1;">stringify</span><span style="color:#24292E;">(key)} must be accessed via $data because it starts with a reserved \` </span><span style="color:#D73A49;">+</span></span>
<span class="line"><span style="color:#24292E;">          \`character and is not proxied on the render context.\`)</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 在模板中使用的变量如果没有定义，报警告</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">warn</span><span style="color:#24292E;">(\`Property \${JSON.</span><span style="color:#6F42C1;">stringify</span><span style="color:#24292E;">(key)} was accessed during render \` </span><span style="color:#D73A49;">+</span></span>
<span class="line"><span style="color:#24292E;">          \`but is not defined on instance.\`)</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>可以看到，函数首先判断 key 不以 $ 开头的情况，这部分数据可能是 setupState、data、props、ctx 中的一种，其中 data、props 我们已经很熟悉了；setupState 就是 setup 函数返回的数据，稍后我们会详细说；ctx 包括了计算属性、组件方法和用户自定义的一些数据。</p><p>如果 key 不以 $ 开头，那么就依次判断 setupState、data、props、ctx 中是否包含这个 key，如果包含就返回对应值。<strong>注意这个判断顺序很重要</strong> ，<strong>在 key 相同时它会决定数据获取的优先级</strong>，举个例子：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;{ {msg}}&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  import { ref } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  export default {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">data</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">      return {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">msg</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;msg from data&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">      const msg </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;msg from setup&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">      return {</span></span>
<span class="line"><span style="color:#E1E4E8;">        msg</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;{ {msg}}&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  import { ref } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#24292E;">  export default {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">data</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">      return {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">msg</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;msg from data&#39;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">      const msg </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;msg from setup&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">      return {</span></span>
<span class="line"><span style="color:#24292E;">        msg</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>我们在 data 和 setup 中都定义了 msg 变量，但最终输出到界面上的是&quot;msg from setup&quot;，这是因为 setupState 的判断优先级要高于 data。</p><p>再回到 get 函数中，我们可以看到这里定义了 accessCache 作为渲染代理的属性访问缓存，它具体是干什么的呢？组件在渲染时会经常访问数据进而触发 get 函数，这其中最昂贵的部分就是多次调用 hasOwn 去判断 key 在不在某个类型的数据中，但是在普通对象上执行简单的属性访问相对要快得多。所以在第一次获取 key 对应的数据后，我们利用 accessCache[key] 去缓存数据，下一次再次根据 key 查找数据，我们就可以直接通过 accessCache[key] 获取对应的值，就不需要依次调用 hasOwn 去判断了。这也是一个性能优化的小技巧。</p><p>如果 key 以 $ 开头，那么接下来又会有一系列的判断，首先判断是不是 Vue.js 内部公开的 $xxx 属性或方法（比如 $parent）；然后判断是不是 vue-loader 编译注入的 css 模块内部的 key；接着判断是不是用户自定义以 $ 开头的 key；最后判断是不是全局属性。如果都不满足，就剩两种情况了，即在非生产环境下就会报两种类型的警告，第一种是在 data 中定义的数据以 $ 开头的警告，因为 $ 是保留字符，不会做代理；第二种是在模板中使用的变量没有定义的警告。</p><p>接下来是 set 代理过程，当我们<strong>修改 instance.ctx 渲染上下文中的属性</strong> 的时候，就会<strong>进入 set 函数</strong>。我们来看一下 set 函数的实现：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> PublicInstanceProxyHandlers </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;"> ({ _</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> instance }, key, value) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { data, setupState, ctx } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> instance</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (setupState </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> EMPTY_OBJ </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">hasOwn</span><span style="color:#E1E4E8;">(setupState, key)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 给 setupState 赋值</span></span>
<span class="line"><span style="color:#E1E4E8;">      setupState[key] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> value</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (data </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> EMPTY_OBJ </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">hasOwn</span><span style="color:#E1E4E8;">(data, key)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 给 data 赋值</span></span>
<span class="line"><span style="color:#E1E4E8;">      data[key] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> value</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (key in instance.props) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 不能直接给 props 赋值</span></span>
<span class="line"><span style="color:#E1E4E8;">      (p<wbr>rocess.env.NODE_ENV </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;production&#39;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">&amp;&amp;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">warn</span><span style="color:#E1E4E8;">(\`Attempting to mutate prop </span><span style="color:#9ECBFF;">&quot;\${key}&quot;</span><span style="color:#E1E4E8;">. Props are readonly.\`, instance)</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (key[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;$&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> key.</span><span style="color:#B392F0;">slice</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">) in instance) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 不能给 Vue 内部以 $ 开头的保留属性赋值</span></span>
<span class="line"><span style="color:#E1E4E8;">      (p<wbr>rocess.env.NODE_ENV </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;production&#39;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">&amp;&amp;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">warn</span><span style="color:#E1E4E8;">(\`Attempting to mutate </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;"> property </span><span style="color:#9ECBFF;">&quot;\${key}&quot;</span><span style="color:#E1E4E8;">. \` </span><span style="color:#F97583;">+</span></span>
<span class="line"><span style="color:#E1E4E8;">        \`Properties starting with $ are reserved and readonly.\`, instance)</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 用户自定义数据赋值</span></span>
<span class="line"><span style="color:#E1E4E8;">      ctx[key] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> value</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> PublicInstanceProxyHandlers </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">set</span><span style="color:#24292E;"> ({ _</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> instance }, key, value) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { data, setupState, ctx } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> instance</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (setupState </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> EMPTY_OBJ </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">hasOwn</span><span style="color:#24292E;">(setupState, key)) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 给 setupState 赋值</span></span>
<span class="line"><span style="color:#24292E;">      setupState[key] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> value</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (data </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> EMPTY_OBJ </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">hasOwn</span><span style="color:#24292E;">(data, key)) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 给 data 赋值</span></span>
<span class="line"><span style="color:#24292E;">      data[key] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> value</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (key in instance.props) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 不能直接给 props 赋值</span></span>
<span class="line"><span style="color:#24292E;">      (p<wbr>rocess.env.NODE_ENV </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;production&#39;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">&amp;&amp;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">warn</span><span style="color:#24292E;">(\`Attempting to mutate prop </span><span style="color:#032F62;">&quot;\${key}&quot;</span><span style="color:#24292E;">. Props are readonly.\`, instance)</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (key[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;$&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> key.</span><span style="color:#6F42C1;">slice</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">) in instance) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 不能给 Vue 内部以 $ 开头的保留属性赋值</span></span>
<span class="line"><span style="color:#24292E;">      (p<wbr>rocess.env.NODE_ENV </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;production&#39;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">&amp;&amp;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">warn</span><span style="color:#24292E;">(\`Attempting to mutate </span><span style="color:#D73A49;">public</span><span style="color:#24292E;"> property </span><span style="color:#032F62;">&quot;\${key}&quot;</span><span style="color:#24292E;">. \` </span><span style="color:#D73A49;">+</span></span>
<span class="line"><span style="color:#24292E;">        \`Properties starting with $ are reserved and readonly.\`, instance)</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 用户自定义数据赋值</span></span>
<span class="line"><span style="color:#24292E;">      ctx[key] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> value</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>结合代码来看，函数主要做的事情就是对渲染上下文 instance.ctx 中的属性赋值，它实际上是代理到对应的数据类型中去完成赋值操作的。这里仍然要注意顺序问题，和 get 一样，优先判断 setupState，然后是 data，接着是 props。</p><p>我们对之前的例子做点修改，添加一个方法：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;{ { msg }}&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">button</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">@click=&quot;random&quot;&gt;Random</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">msg&lt;/button&gt;</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;script&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">import</span><span style="color:#E1E4E8;"> { ref } </span><span style="color:#B392F0;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">data</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">      return {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">msg</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;msg from data&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">      const msg </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;msg from setup&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">      return {</span></span>
<span class="line"><span style="color:#E1E4E8;">        msg</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    methods: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">random</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.msg </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Math.</span><span style="color:#B392F0;">random</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;/script&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;{ { msg }}&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">button</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">@click=&quot;random&quot;&gt;Random</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">msg&lt;/button&gt;</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;script&gt;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">import</span><span style="color:#24292E;"> { ref } </span><span style="color:#6F42C1;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">export</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">data</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">      return {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">msg</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;msg from data&#39;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">      const msg </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;msg from setup&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">      return {</span></span>
<span class="line"><span style="color:#24292E;">        msg</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    methods: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">random</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.msg </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Math.</span><span style="color:#6F42C1;">random</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;/script&gt;</span></span></code></pre></div><p>我们点击按钮会执行 random 函数，这里的 this 指向的就是 instance.ctx，我们修改 this.msg 会触发 set 函数，所以最终修改的是 setupState 中的 msg 对应的值。</p><p>注意，如果我们直接对 props 中的数据赋值，在非生产环境中会收到一条警告，这是因为直接修改 props 不符合数据单向流动的设计思想；如果对 Vue.js 内部以 $ 开头的保留属性赋值，同样也会收到一条警告。</p><p>如果是用户自定义的数据，比如在 created 生命周期内定义的数据，它仅用于组件上下文的共享，如下所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">export </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">created</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.userMsg </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;msg from user&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">export </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">created</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.userMsg </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;msg from user&#39;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>当执行 this.userMsg 赋值的时候，会触发 set 函数，最终 userMsg 会被保留到 ctx 中。</p><p>最后是 has 代理过程，当我们<strong>判断属性是否存在于 instance.ctx 渲染上下文中</strong> 时，就<strong>会进入 has 函数</strong>，这个在平时项目中用的比较少，同样来举个例子，当执行 created 钩子函数中的 &#39;msg&#39; in this 时，就会触发 has 函数。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">export </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">created</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;msg&#39;</span><span style="color:#E1E4E8;"> in </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">export </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">created</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;msg&#39;</span><span style="color:#24292E;"> in </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>下面我们来看一下 has 函数的实现：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> PublicInstanceProxyHandlers </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  has</span></span>
<span class="line"><span style="color:#E1E4E8;">    ({ _</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> { data, setupState, accessCache, ctx, type, appContext } }, key) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 依次判断</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (accessCache[key] </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> undefined </span><span style="color:#F97583;">||</span></span>
<span class="line"><span style="color:#E1E4E8;">      (data </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> EMPTY_OBJ </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">hasOwn</span><span style="color:#E1E4E8;">(data, key)) </span><span style="color:#F97583;">||</span></span>
<span class="line"><span style="color:#E1E4E8;">      (setupState </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> EMPTY_OBJ </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">hasOwn</span><span style="color:#E1E4E8;">(setupState, key)) </span><span style="color:#F97583;">||</span></span>
<span class="line"><span style="color:#E1E4E8;">      (type.props </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">hasOwn</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">normalizePropsOptions</span><span style="color:#E1E4E8;">(type.props)[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">], key)) </span><span style="color:#F97583;">||</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">hasOwn</span><span style="color:#E1E4E8;">(ctx, key) </span><span style="color:#F97583;">||</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">hasOwn</span><span style="color:#E1E4E8;">(publicPropertiesMap, key) </span><span style="color:#F97583;">||</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">hasOwn</span><span style="color:#E1E4E8;">(appContext.config.globalProperties, key))</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> PublicInstanceProxyHandlers </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  has</span></span>
<span class="line"><span style="color:#24292E;">    ({ _</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> { data, setupState, accessCache, ctx, type, appContext } }, key) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 依次判断</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (accessCache[key] </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> undefined </span><span style="color:#D73A49;">||</span></span>
<span class="line"><span style="color:#24292E;">      (data </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> EMPTY_OBJ </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">hasOwn</span><span style="color:#24292E;">(data, key)) </span><span style="color:#D73A49;">||</span></span>
<span class="line"><span style="color:#24292E;">      (setupState </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> EMPTY_OBJ </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">hasOwn</span><span style="color:#24292E;">(setupState, key)) </span><span style="color:#D73A49;">||</span></span>
<span class="line"><span style="color:#24292E;">      (type.props </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">hasOwn</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">normalizePropsOptions</span><span style="color:#24292E;">(type.props)[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">], key)) </span><span style="color:#D73A49;">||</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">hasOwn</span><span style="color:#24292E;">(ctx, key) </span><span style="color:#D73A49;">||</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">hasOwn</span><span style="color:#24292E;">(publicPropertiesMap, key) </span><span style="color:#D73A49;">||</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">hasOwn</span><span style="color:#24292E;">(appContext.config.globalProperties, key))</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这个函数的实现很简单，依次判断 key 是否存在于 accessCache、data、setupState、props 、用户数据、公开属性以及全局属性中，然后返回结果。</p><p>至此，我们就搞清楚了创建上下文代理的过程，让我们回到 setupStatefulComponent 函数中，接下来分析第二个流程------判断处理 setup 函数。</p><h3 id="判断处理-setup-函数" tabindex="-1">判断处理 setup 函数 <a class="header-anchor" href="#判断处理-setup-函数" aria-label="Permalink to &quot;判断处理 setup 函数&quot;">​</a></h3><p>我们看一下整个逻辑涉及的代码：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 判断处理 setup 函数</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { setup } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Component</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (setup) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 如果 setup 函数带参数，则创建一个 setupContext</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> setupContext </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (instance.setupContext </span><span style="color:#F97583;">=</span></span>
<span class="line"><span style="color:#E1E4E8;">    setup.length </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createSetupContext</span><span style="color:#E1E4E8;">(instance) </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 执行 setup 函数获取结果</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> setupResult </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">callWithErrorHandling</span><span style="color:#E1E4E8;">(setup, instance, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">/* SETUP_FUNCTION */</span><span style="color:#E1E4E8;">, [instance.props, setupContext])</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 处理 setup 执行结果</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">handleSetupResult</span><span style="color:#E1E4E8;">(instance, setupResult)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 判断处理 setup 函数</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { setup } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Component</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (setup) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 如果 setup 函数带参数，则创建一个 setupContext</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> setupContext </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (instance.setupContext </span><span style="color:#D73A49;">=</span></span>
<span class="line"><span style="color:#24292E;">    setup.length </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createSetupContext</span><span style="color:#24292E;">(instance) </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 执行 setup 函数获取结果</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> setupResult </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">callWithErrorHandling</span><span style="color:#24292E;">(setup, instance, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">/* SETUP_FUNCTION */</span><span style="color:#24292E;">, [instance.props, setupContext])</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 处理 setup 执行结果</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">handleSetupResult</span><span style="color:#24292E;">(instance, setupResult)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>如果我们在组件中定义了 setup 函数，接下来就是处理 setup 函数的流程，主要是三个步骤：创建 setup 函数上下文、执行 setup 函数并获取结果和处理 setup 函数的执行结果。接下来我们就逐个来分析。</p><p>首先<strong>判断 setup 函数的参数长度</strong> ，<strong>如果大于 1</strong> ，<strong>则创建 setupContext 上下文</strong>。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> setupContext </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (instance.setupContext </span><span style="color:#F97583;">=</span></span>
<span class="line"><span style="color:#E1E4E8;">    setup.length </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createSetupContext</span><span style="color:#E1E4E8;">(instance) </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> setupContext </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (instance.setupContext </span><span style="color:#D73A49;">=</span></span>
<span class="line"><span style="color:#24292E;">    setup.length </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createSetupContext</span><span style="color:#24292E;">(instance) </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">)</span></span></code></pre></div><p>举个例子，我们有个 HelloWorld 子组件，如下：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;{ { msg }}&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">button</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">@click=&quot;onClick&quot;&gt;Toggle&lt;/button&gt;</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;script&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    props: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      msg: String</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;"> (props, { emit }) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      function </span><span style="color:#B392F0;">onClick</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">emit</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;toggle&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      return {</span></span>
<span class="line"><span style="color:#E1E4E8;">        onClick</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;/script&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;{ { msg }}&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">button</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">@click=&quot;onClick&quot;&gt;Toggle&lt;/button&gt;</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;script&gt;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">export</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    props: {</span></span>
<span class="line"><span style="color:#24292E;">      msg: String</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;"> (props, { emit }) {</span></span>
<span class="line"><span style="color:#24292E;">      function </span><span style="color:#6F42C1;">onClick</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">emit</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;toggle&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      return {</span></span>
<span class="line"><span style="color:#24292E;">        onClick</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;/script&gt;</span></span></code></pre></div><p>我们在父组件引用这个组件：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#79B8FF;">HelloWorld</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">@toggle=&quot;toggle&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">:msg=&quot;msg&quot;&gt;&lt;/HelloWorld&gt;</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;script&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">import</span><span style="color:#E1E4E8;"> { ref } </span><span style="color:#B392F0;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">HelloWorld</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;./components/HelloWorld&quot;</span><span style="color:#FDAEB7;font-style:italic;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    components: { HelloWorld },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">      const msg </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;Hello World&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">      function </span><span style="color:#B392F0;">toggle</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">        msg.value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> msg.value </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;Hello World&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;Hello Vue&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;Hello World&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      return {</span></span>
<span class="line"><span style="color:#E1E4E8;">        toggle,</span></span>
<span class="line"><span style="color:#E1E4E8;">        msg</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;/script&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#005CC5;">HelloWorld</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">@toggle=&quot;toggle&quot;</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">:msg=&quot;msg&quot;&gt;&lt;/HelloWorld&gt;</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;script&gt;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">import</span><span style="color:#24292E;"> { ref } </span><span style="color:#6F42C1;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">import</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">HelloWorld</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;./components/HelloWorld&quot;</span><span style="color:#B31D28;font-style:italic;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">export</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    components: { HelloWorld },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">      const msg </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;Hello World&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">      function </span><span style="color:#6F42C1;">toggle</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">        msg.value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> msg.value </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;Hello World&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;Hello Vue&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;Hello World&#39;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      return {</span></span>
<span class="line"><span style="color:#24292E;">        toggle,</span></span>
<span class="line"><span style="color:#24292E;">        msg</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;/script&gt;</span></span></code></pre></div><p>可以看到，HelloWorld 子组件的 setup 函数接收两个参数，第一个参数 props 对应父组件传入的 props 数据，第二个参数 emit 是一个对象，实际上就是 setupContext。</p><p>下面我们来看一下用 createSetupContext 函数来创建 setupContext：</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function createSetupContext (instance) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  return {</span></span>
<span class="line"><span style="color:#E1E4E8;">    attrs: instance.attrs,</span></span>
<span class="line"><span style="color:#E1E4E8;">    slots: instance.slots,</span></span>
<span class="line"><span style="color:#E1E4E8;">    emit: instance.emit</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function createSetupContext (instance) {</span></span>
<span class="line"><span style="color:#24292E;">  return {</span></span>
<span class="line"><span style="color:#24292E;">    attrs: instance.attrs,</span></span>
<span class="line"><span style="color:#24292E;">    slots: instance.slots,</span></span>
<span class="line"><span style="color:#24292E;">    emit: instance.emit</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这里返回了一个对象，包括 attrs、slots 和 emit 三个属性。setupContext 让我们在 setup 函数内部可以获取到组件的属性、插槽以及派发事件的方法 emit。</p><p>可以预见的是，这个 setupContext 对应的就是 setup 函数第二个参数，我们接下来看一下 setup 函数具体是如何执行的。</p><p>我们通过下面这行代码来<strong>执行 setup 函数并获取结果</strong>：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> setupResult </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">callWithErrorHandling</span><span style="color:#E1E4E8;">(setup, instance, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">/* SETUP_FUNCTION */</span><span style="color:#E1E4E8;">, [instance.props, setupContext])</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> setupResult </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">callWithErrorHandling</span><span style="color:#24292E;">(setup, instance, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">/* SETUP_FUNCTION */</span><span style="color:#24292E;">, [instance.props, setupContext])</span></span></code></pre></div><p>我们具体来看一下 callWithErrorHandling 函数的实现：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function </span><span style="color:#B392F0;">callWithErrorHandling</span><span style="color:#E1E4E8;"> (fn, instance, type, args) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  let res</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    res </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> args </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fn</span><span style="color:#E1E4E8;">(...args) </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fn</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">catch</span><span style="color:#E1E4E8;"> (err) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">handleError</span><span style="color:#E1E4E8;">(err, instance, type)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> res</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function </span><span style="color:#6F42C1;">callWithErrorHandling</span><span style="color:#24292E;"> (fn, instance, type, args) {</span></span>
<span class="line"><span style="color:#24292E;">  let res</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    res </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> args </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fn</span><span style="color:#24292E;">(...args) </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fn</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">catch</span><span style="color:#24292E;"> (err) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">handleError</span><span style="color:#24292E;">(err, instance, type)</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> res</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>可以看到，它其实就是对 fn 做的一层包装，内部还是执行了 fn，并在有参数的时候传入参数，所以 setup 的第一个参数是 instance.props，第二个参数是 setupContext。函数执行过程中如果有 JavaScript 执行错误就会捕获错误，并执行 handleError 函数来处理。</p><p>执行 setup 函数并拿到了返回的结果，那么接下来就要<strong>用 handleSetupResult 函数来处理结果</strong>。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">handleSetupResult</span><span style="color:#E1E4E8;">(instance, setupResult)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">handleSetupResult</span><span style="color:#24292E;">(instance, setupResult)</span></span></code></pre></div><p>我们详细看一下 handleSetupResult 函数的实现：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function </span><span style="color:#B392F0;">handleSetupResult</span><span style="color:#E1E4E8;">(instance, setupResult) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">isFunction</span><span style="color:#E1E4E8;">(setupResult)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// setup 返回渲染函数</span></span>
<span class="line"><span style="color:#E1E4E8;">    instance.render </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> setupResult</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">isObject</span><span style="color:#E1E4E8;">(setupResult)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 把 setup 返回结果变成响应式</span></span>
<span class="line"><span style="color:#E1E4E8;">    instance.setupState </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">reactive</span><span style="color:#E1E4E8;">(setupResult)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">finishComponentSetup</span><span style="color:#E1E4E8;">(instance)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function </span><span style="color:#6F42C1;">handleSetupResult</span><span style="color:#24292E;">(instance, setupResult) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#6F42C1;">isFunction</span><span style="color:#24292E;">(setupResult)) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// setup 返回渲染函数</span></span>
<span class="line"><span style="color:#24292E;">    instance.render </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> setupResult</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#6F42C1;">isObject</span><span style="color:#24292E;">(setupResult)) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 把 setup 返回结果变成响应式</span></span>
<span class="line"><span style="color:#24292E;">    instance.setupState </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">reactive</span><span style="color:#24292E;">(setupResult)</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">finishComponentSetup</span><span style="color:#24292E;">(instance)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>可以看到，当 setupResult 是一个对象的时候，我们把它变成了响应式并赋值给 instance.setupState，这样在模板渲染的时候，依据前面的代理规则，instance.ctx 就可以从 instance.setupState 上获取到对应的数据，这就在 setup 函数与模板渲染间建立了联系。</p><p>另外 setup 不仅仅支持返回一个对象，也可以返回一个函数作为组件的渲染函数。我们可以改写前面的示例，来看一下这时的情况：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  import { h } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  export default {</span></span>
<span class="line"><span style="color:#E1E4E8;">    props: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      msg: String</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;"> (props, { emit }) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      function </span><span style="color:#B392F0;">onClick</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">emit</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;toggle&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">return</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">ctx</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">return</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">h</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;p&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">, </span><span style="color:#B392F0;">ctx</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">msg</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">h</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;button&#39;</span><span style="color:#E1E4E8;">, { </span><span style="color:#FFAB70;">onClick</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">onClick</span><span style="color:#E1E4E8;"> }, </span><span style="color:#9ECBFF;">&#39;Toggle&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        ]</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  import { h } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#24292E;">  export default {</span></span>
<span class="line"><span style="color:#24292E;">    props: {</span></span>
<span class="line"><span style="color:#24292E;">      msg: String</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;"> (props, { emit }) {</span></span>
<span class="line"><span style="color:#24292E;">      function </span><span style="color:#6F42C1;">onClick</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">emit</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;toggle&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">return</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">ctx</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">return</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">h</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;p&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">ctx</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">msg</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">h</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;button&#39;</span><span style="color:#24292E;">, { </span><span style="color:#E36209;">onClick</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">onClick</span><span style="color:#24292E;"> }, </span><span style="color:#032F62;">&#39;Toggle&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        ]</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>这里，我们删除了 HelloWorld 子组件的 template 部分，并把 setup 函数的返回结果改成了函数，也就是说它会作为组件的渲染函数，一切运行正常。</p><p>在 handleSetupResult 的最后，会执行 finishComponentSetup 函数完成组件实例的设置，其实这个函数和 setup 函数的执行结果已经没什么关系了，提取到外面放在 handleSetupResult 函数后面执行更合理一些。</p><p>另外当组件没有定义的 setup 的时候，也会执行 finishComponentSetup 函数去完成组件实例的设置。</p><h3 id="完成组件实例设置" tabindex="-1">完成组件实例设置 <a class="header-anchor" href="#完成组件实例设置" aria-label="Permalink to &quot;完成组件实例设置&quot;">​</a></h3><p>接下来我们来看一下 finishComponentSetup 函数的实现：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function </span><span style="color:#B392F0;">finishComponentSetup</span><span style="color:#E1E4E8;"> (instance) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> Component </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> instance.type</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 对模板或者渲染函数的标准化</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">instance.render) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (compile </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> Component.template </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">Component.render) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 运行时编译</span></span>
<span class="line"><span style="color:#E1E4E8;">      Component.render </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">compile</span><span style="color:#E1E4E8;">(Component.template, {</span></span>
<span class="line"><span style="color:#E1E4E8;">        isCustomElement</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> instance.appContext.config.isCustomElement </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> NO</span></span>
<span class="line"><span style="color:#E1E4E8;">      })</span></span>
<span class="line"><span style="color:#E1E4E8;">      Component.render._rc </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ((p<wbr>rocess.env.NODE_ENV </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;production&#39;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">Component.render) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">compile </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> Component.template) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 只编写了 template 但使用了 runtime-only 的版本</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">warn</span><span style="color:#E1E4E8;">(\`Component provided template option but \` </span><span style="color:#F97583;">+</span></span>
<span class="line"><span style="color:#E1E4E8;">          \`runtime compilation is not supported in </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;"> build of Vue.\` </span><span style="color:#F97583;">+</span></span>
<span class="line"><span style="color:#E1E4E8;">          (\` Configure your bundler to alias </span><span style="color:#9ECBFF;">&quot;vue&quot;</span><span style="color:#E1E4E8;"> to </span><span style="color:#9ECBFF;">&quot;vue/dist/vue.esm-bundler.js&quot;</span><span style="color:#E1E4E8;">.\`</span></span>
<span class="line"><span style="color:#E1E4E8;">          ) </span><span style="color:#6A737D;">/* should not happen */</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 既没有写 render 函数，也没有写 template 模板</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">warn</span><span style="color:#E1E4E8;">(\`Component is missing template or render function.\`)</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 组件对象的 render 函数赋值给 instance</span></span>
<span class="line"><span style="color:#E1E4E8;">    instance.render </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (Component.render </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> NOOP)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (instance.render._rc) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 对于使用 with 块的运行时编译的渲染函数，使用新的渲染上下文的代理</span></span>
<span class="line"><span style="color:#E1E4E8;">      instance.withProxy </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Proxy</span><span style="color:#E1E4E8;">(instance.ctx, RuntimeCompiledPublicInstanceProxyHandlers)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 兼容 Vue.js 2.x Options API</span></span>
<span class="line"><span style="color:#E1E4E8;">  {</span></span>
<span class="line"><span style="color:#E1E4E8;">    currentInstance </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> instance</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">applyOptions</span><span style="color:#E1E4E8;">(instance, Component)</span></span>
<span class="line"><span style="color:#E1E4E8;">    currentInstance </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function </span><span style="color:#6F42C1;">finishComponentSetup</span><span style="color:#24292E;"> (instance) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> Component </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> instance.type</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 对模板或者渲染函数的标准化</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">instance.render) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (compile </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> Component.template </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">Component.render) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 运行时编译</span></span>
<span class="line"><span style="color:#24292E;">      Component.render </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">compile</span><span style="color:#24292E;">(Component.template, {</span></span>
<span class="line"><span style="color:#24292E;">        isCustomElement</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> instance.appContext.config.isCustomElement </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> NO</span></span>
<span class="line"><span style="color:#24292E;">      })</span></span>
<span class="line"><span style="color:#24292E;">      Component.render._rc </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ((p<wbr>rocess.env.NODE_ENV </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;production&#39;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">Component.render) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">compile </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> Component.template) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 只编写了 template 但使用了 runtime-only 的版本</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">warn</span><span style="color:#24292E;">(\`Component provided template option but \` </span><span style="color:#D73A49;">+</span></span>
<span class="line"><span style="color:#24292E;">          \`runtime compilation is not supported in </span><span style="color:#005CC5;">this</span><span style="color:#24292E;"> build of Vue.\` </span><span style="color:#D73A49;">+</span></span>
<span class="line"><span style="color:#24292E;">          (\` Configure your bundler to alias </span><span style="color:#032F62;">&quot;vue&quot;</span><span style="color:#24292E;"> to </span><span style="color:#032F62;">&quot;vue/dist/vue.esm-bundler.js&quot;</span><span style="color:#24292E;">.\`</span></span>
<span class="line"><span style="color:#24292E;">          ) </span><span style="color:#6A737D;">/* should not happen */</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 既没有写 render 函数，也没有写 template 模板</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">warn</span><span style="color:#24292E;">(\`Component is missing template or render function.\`)</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 组件对象的 render 函数赋值给 instance</span></span>
<span class="line"><span style="color:#24292E;">    instance.render </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (Component.render </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> NOOP)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (instance.render._rc) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 对于使用 with 块的运行时编译的渲染函数，使用新的渲染上下文的代理</span></span>
<span class="line"><span style="color:#24292E;">      instance.withProxy </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Proxy</span><span style="color:#24292E;">(instance.ctx, RuntimeCompiledPublicInstanceProxyHandlers)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 兼容 Vue.js 2.x Options API</span></span>
<span class="line"><span style="color:#24292E;">  {</span></span>
<span class="line"><span style="color:#24292E;">    currentInstance </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> instance</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">applyOptions</span><span style="color:#24292E;">(instance, Component)</span></span>
<span class="line"><span style="color:#24292E;">    currentInstance </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>函数主要做了两件事情：<strong>标准化模板或者渲染函数和兼容 Options API</strong>。接下来我们详细分析这两个流程。</p><h4 id="标准化模板或者渲染函数" tabindex="-1">标准化模板或者渲染函数 <a class="header-anchor" href="#标准化模板或者渲染函数" aria-label="Permalink to &quot;标准化模板或者渲染函数&quot;">​</a></h4><p>在分析这个过程之前，我们需要了解一些背景知识。组件最终通过运行 render 函数生成子树 vnode，但是我们很少直接去编写 render 函数，通常会使用两种方式开发组件。</p><p><strong>第一种是使用 SFC（Single File Components）单文件的开发方式来开发组件</strong>，即通过编写组件的 template 模板去描述一个组件的 DOM 结构。我们知道 .vue 类型的文件无法在 Web 端直接加载，因此在 webpack 的编译阶段，它会通过 vue-loader 编译生成组件相关的 JavaScript 和 CSS，并把 template 部分转换成 render 函数添加到组件对象的属性中。</p><p><strong>另外一种开发方式</strong> 是不借助 webpack 编译，<strong>直接引入 Vue.js</strong>，开箱即用，我们直接在组件对象 template 属性中编写组件的模板，然后在运行阶段编译生成 render 函数，这种方式通常用于有一定历史包袱的古老项目。</p><p>因此 Vue.js 在 Web 端有两个版本：runtime-only 和 runtime-compiled。我们更推荐用 runtime-only 版本的 Vue.js，因为相对而言它体积更小，而且在运行时不用编译，不仅耗时更少而且性能更优秀。遇到一些不得已的情况比如上述提到的古老项目，我们也可以选择 runtime-compiled 版本。</p><p>runtime-only 和 runtime-compiled 的主要区别在于是否注册了这个 compile 方法。</p><p>在 Vue.js 3.0 中，compile 方法是通过外部注册的：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">let compile;</span></span>
<span class="line"><span style="color:#E1E4E8;">function </span><span style="color:#B392F0;">registerRuntimeCompiler</span><span style="color:#E1E4E8;">(_compile) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    compile </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> _compile;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">let compile;</span></span>
<span class="line"><span style="color:#24292E;">function </span><span style="color:#6F42C1;">registerRuntimeCompiler</span><span style="color:#24292E;">(_compile) {</span></span>
<span class="line"><span style="color:#24292E;">    compile </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> _compile;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>回到标准化模板或者渲染函数逻辑，我们先看 instance.render 是否存在，如果不存在则开始标准化流程，这里主要需要处理以下三种情况。</p><ol><li><p><strong>compile 和组件 template 属性存在</strong> ，<strong>render 方法不存在的情况</strong>。此时， runtime-compiled 版本会在 JavaScript 运行时进行模板编译，生成 render 函数。</p></li><li><p><strong>compile 和 render 方法不存在，组件 template 属性存在的情况</strong>。此时由于没有 compile，这里用的是 runtime-only 的版本，因此要报一个警告来告诉用户，想要运行时编译得使用 runtime-compiled 版本的 Vue.js。</p></li><li><p><strong>组件既没有写 render 函数，也没有写 template 模板</strong>，此时要报一个警告，告诉用户组件缺少了 render 函数或者 template 模板。</p></li></ol><p>处理完以上情况后，就要把组件的 render 函数赋值给 instance.render。到了组件渲染的时候，就可以运行 instance.render 函数生成组件的子树 vnode 了。</p><p>另外对于使用 with 块运行时编译的渲染函数，渲染上下文的代理是 RuntimeCompiledPublicInstanceProxyHandlers，它是在之前渲染上下文代理 PublicInstanceProxyHandlers 的基础上进行的扩展，主要对 has 函数的实现做了优化：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> RuntimeCompiledPublicInstanceProxyHandlers </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  ...PublicInstanceProxyHandlers,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(target, key) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (key </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> Symbol.unscopables) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> PublicInstanceProxyHandlers.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(target, key, target)</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">has</span><span style="color:#E1E4E8;">(_, key) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 如果 key 以 _ 开头或者 key 在全局变量白名单内，则 has 为 false</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> has </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> key[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;_&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#B392F0;">isGloballyWhitelisted</span><span style="color:#E1E4E8;">(key)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ((p<wbr>rocess.env.NODE_ENV </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;production&#39;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">has </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> PublicInstanceProxyHandlers.</span><span style="color:#B392F0;">has</span><span style="color:#E1E4E8;">(_, key)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">warn</span><span style="color:#E1E4E8;">(\`Property \${JSON.</span><span style="color:#B392F0;">stringify</span><span style="color:#E1E4E8;">(key)} should not start with _ which is a reserved prefix </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> Vue internals.\`)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> has</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> RuntimeCompiledPublicInstanceProxyHandlers </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  ...PublicInstanceProxyHandlers,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(target, key) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (key </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> Symbol.unscopables) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> PublicInstanceProxyHandlers.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(target, key, target)</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">has</span><span style="color:#24292E;">(_, key) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 如果 key 以 _ 开头或者 key 在全局变量白名单内，则 has 为 false</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> has </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> key[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;_&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#6F42C1;">isGloballyWhitelisted</span><span style="color:#24292E;">(key)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ((p<wbr>rocess.env.NODE_ENV </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;production&#39;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">has </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> PublicInstanceProxyHandlers.</span><span style="color:#6F42C1;">has</span><span style="color:#24292E;">(_, key)) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">warn</span><span style="color:#24292E;">(\`Property \${JSON.</span><span style="color:#6F42C1;">stringify</span><span style="color:#24292E;">(key)} should not start with _ which is a reserved prefix </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> Vue internals.\`)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> has</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这里如果 key 以 _ 开头，或者 key 在全局变量的白名单内，则 has 为 false，此时则直接命中警告，不用再进行之前那一系列的判断了。</p><p>了解完标准化模板或者渲染函数流程，我们来看完成组件实例设置的最后一个流程------兼容 Vue.js 2.x 的 Options API。</p><h4 id="options-api-兼容-vue-js-2-x" tabindex="-1">Options API：兼容 Vue.js 2.x <a class="header-anchor" href="#options-api-兼容-vue-js-2-x" aria-label="Permalink to &quot;Options API：兼容 Vue.js 2.x&quot;">​</a></h4><p>我们知道 Vue.js 2.x 是通过组件对象的方式去描述一个组件，之前我们也说过，Vue.js 3.0 仍然支持 Vue.js 2.x Options API 的写法，这主要就是通过 applyOptions方法实现的。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function </span><span style="color:#B392F0;">applyOptions</span><span style="color:#E1E4E8;">(instance, options, deferredData </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [], deferredWatch </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [], asMixin </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 组合</span></span>
<span class="line"><span style="color:#E1E4E8;">    mixins, extends</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> extendsOptions,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 数组状态</span></span>
<span class="line"><span style="color:#E1E4E8;">    props</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> propsOptions, data</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> dataOptions, computed</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> computedOptions, methods, watch</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> watchOptions, provide</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> provideOptions, inject</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> injectOptions,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 组件和指令</span></span>
<span class="line"><span style="color:#E1E4E8;">    components, directives,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 生命周期</span></span>
<span class="line"><span style="color:#E1E4E8;">    beforeMount, mounted, beforeUpdate, updated, activated, deactivated, beforeUnmount, unmounted, renderTracked, renderTriggered, errorCaptured } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> options;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// instance.proxy 作为 this</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> publicThis </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> instance.proxy;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> ctx </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> instance.ctx;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 处理全局 mixin</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 处理 extend</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 处理本地 mixins</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// props 已经在外面处理过了</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 处理 inject</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 处理 方法</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 处理 data</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 处理计算属性</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 处理 watch</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 处理 provide</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 处理组件</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 处理指令</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 处理生命周期 option</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function </span><span style="color:#6F42C1;">applyOptions</span><span style="color:#24292E;">(instance, options, deferredData </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [], deferredWatch </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [], asMixin </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 组合</span></span>
<span class="line"><span style="color:#24292E;">    mixins, extends</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> extendsOptions,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 数组状态</span></span>
<span class="line"><span style="color:#24292E;">    props</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> propsOptions, data</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> dataOptions, computed</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> computedOptions, methods, watch</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> watchOptions, provide</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> provideOptions, inject</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> injectOptions,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 组件和指令</span></span>
<span class="line"><span style="color:#24292E;">    components, directives,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 生命周期</span></span>
<span class="line"><span style="color:#24292E;">    beforeMount, mounted, beforeUpdate, updated, activated, deactivated, beforeUnmount, unmounted, renderTracked, renderTriggered, errorCaptured } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> options;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// instance.proxy 作为 this</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> publicThis </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> instance.proxy;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> ctx </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> instance.ctx;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 处理全局 mixin</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 处理 extend</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 处理本地 mixins</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// props 已经在外面处理过了</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 处理 inject</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 处理 方法</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 处理 data</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 处理计算属性</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 处理 watch</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 处理 provide</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 处理组件</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 处理指令</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 处理生命周期 option</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>由于 applyOptions 的代码特别长，所以这里我用注释列出了它主要做的事情，感兴趣的同学可以去翻阅它的源码。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>这节课我们主要分析了组件的初始化流程，主要包括创建组件实例和设置组件实例。通过进一步细节的深入，我们也了解了渲染上下文的代理过程；了解了 Composition API 中的 setup 启动函数执行的时机，以及如何建立 setup 返回结果和模板渲染之间的联系；了解了组件定义的模板或者渲染函数的标准化过程；了解了如何兼容 Vue.js 2.x 的 Options API。</p><p>我们通过一张图再直观感受一下 Vue.js 3.0 组件的初始化流程：</p>`,100),i=s("p",null,"最后，给你留一道思考题目，在执行 setup 函数并获取结果的时候，我们使用 callWithErrorHandling 把 setup 包装了一层，它有哪些好处？欢迎你在留言区与我分享。",-1),u=s("blockquote",null,[s("p",null,[s("strong",null,"本节课的相关代码在源代码中的位置如下：")]),s("p",null,"packages/runtime-core/src/renderer.ts"),s("p",null,"packages/runtime-core/src/component.ts"),s("p",null,"packages/runtime-core/src/componentProxy.ts"),s("p",null,"packages/runtime-core/src/errorHandling.ts")],-1);function F(d,D,A,C,m,g){const n=e("Image");return t(),c("div",null,[E,a(n,{alt:"4.png",src:"https://s0.lgstatic.com/i/image/M00/35/74/Ciqc1F8VZpKAVYWOAABLt08AfuQ883.png"}),p(),y,a(n,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/35/74/Ciqc1F8VZvaAYCgKAAHVSzimXjw614.png"}),p(),i,u])}const B=o(r,[["render",F]]);export{v as __pageData,B as default};
