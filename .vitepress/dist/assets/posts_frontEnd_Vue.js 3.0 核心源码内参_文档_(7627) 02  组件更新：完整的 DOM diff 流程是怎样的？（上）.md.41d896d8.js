import{_ as l,j as o,o as e,g as t,k as p,h as n,Q as c,s}from"./chunks/framework.4e7d56ce.js";const S=JSON.parse('{"title":"02组件更新：完整的DOMdiff流程是怎样的？（上）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Vue.js 3.0 核心源码内参_文档/(7627) 02  组件更新：完整的 DOM diff 流程是怎样的？（上）.md","filePath":"posts/frontEnd/Vue.js 3.0 核心源码内参_文档/(7627) 02  组件更新：完整的 DOM diff 流程是怎样的？（上）.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/Vue.js 3.0 核心源码内参_文档/(7627) 02  组件更新：完整的 DOM diff 流程是怎样的？（上）.md"},E=c(`<h1 id="_02组件更新-完整的domdiff流程是怎样的-上" tabindex="-1">02组件更新：完整的DOMdiff流程是怎样的？（上） <a class="header-anchor" href="#_02组件更新-完整的domdiff流程是怎样的-上" aria-label="Permalink to &quot;02组件更新：完整的DOMdiff流程是怎样的？（上）&quot;">​</a></h1><p>上一节课我们梳理了组件渲染的过程，本质上就是把各种类型的 vnode 渲染成真实 DOM。我们也知道了组件是由模板、组件描述对象和数据构成的，数据的变化会影响组件的变化。组件的渲染过程中创建了一个带副作用的渲染函数，当数据变化的时候就会执行这个渲染函数来触发组件的更新。那么接下来，我们就具体分析一下组件的更新过程。</p><h3 id="副作用渲染函数更新组件的过程" tabindex="-1">副作用渲染函数更新组件的过程 <a class="header-anchor" href="#副作用渲染函数更新组件的过程" aria-label="Permalink to &quot;副作用渲染函数更新组件的过程&quot;">​</a></h3><p>我们先来回顾一下带副作用渲染函数 setupRenderEffect 的实现，但是这次我们要重点关注更新组件部分的逻辑：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> setupRenderEffect </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 创建响应式的副作用渲染函数</span></span>
<span class="line"><span style="color:#E1E4E8;">  instance.update </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">effect</span><span style="color:#E1E4E8;">(function </span><span style="color:#B392F0;">componentEffect</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">instance.isMounted) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 渲染组件</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 更新组件</span></span>
<span class="line"><span style="color:#E1E4E8;">      let { next, vnode } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> instance</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// next 表示新的组件 vnode</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (next) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 更新组件 vnode 节点信息</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">updateComponentPreRender</span><span style="color:#E1E4E8;">(instance, next, optimized)</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        next </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> vnode</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 渲染新的子树 vnode</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> nextTree </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">renderComponentRoot</span><span style="color:#E1E4E8;">(instance)</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 缓存旧的子树 vnode</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> prevTree </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> instance.subTree</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 更新子树 vnode</span></span>
<span class="line"><span style="color:#E1E4E8;">      instance.subTree </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> nextTree</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 组件更新核心逻辑，根据新旧子树 vnode 做 patch</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">patch</span><span style="color:#E1E4E8;">(prevTree, nextTree,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 如果在 teleport 组件中父节点可能已经改变，所以容器直接找旧树 DOM 元素的父节点</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">hostParentNode</span><span style="color:#E1E4E8;">(prevTree.el),</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 参考节点在 fragment 的情况可能改变，所以直接找旧树 DOM 元素的下一个节点</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">getNextHostNode</span><span style="color:#E1E4E8;">(prevTree),</span></span>
<span class="line"><span style="color:#E1E4E8;">        instance,</span></span>
<span class="line"><span style="color:#E1E4E8;">        parentSuspense,</span></span>
<span class="line"><span style="color:#E1E4E8;">        isSVG)</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 缓存更新后的 DOM 节点</span></span>
<span class="line"><span style="color:#E1E4E8;">      next.el </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> nextTree.el</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }, prodEffectOptions)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> setupRenderEffect </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 创建响应式的副作用渲染函数</span></span>
<span class="line"><span style="color:#24292E;">  instance.update </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">effect</span><span style="color:#24292E;">(function </span><span style="color:#6F42C1;">componentEffect</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">instance.isMounted) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 渲染组件</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 更新组件</span></span>
<span class="line"><span style="color:#24292E;">      let { next, vnode } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> instance</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// next 表示新的组件 vnode</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (next) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 更新组件 vnode 节点信息</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">updateComponentPreRender</span><span style="color:#24292E;">(instance, next, optimized)</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        next </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> vnode</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 渲染新的子树 vnode</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> nextTree </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">renderComponentRoot</span><span style="color:#24292E;">(instance)</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 缓存旧的子树 vnode</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> prevTree </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> instance.subTree</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 更新子树 vnode</span></span>
<span class="line"><span style="color:#24292E;">      instance.subTree </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> nextTree</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 组件更新核心逻辑，根据新旧子树 vnode 做 patch</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">patch</span><span style="color:#24292E;">(prevTree, nextTree,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 如果在 teleport 组件中父节点可能已经改变，所以容器直接找旧树 DOM 元素的父节点</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">hostParentNode</span><span style="color:#24292E;">(prevTree.el),</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 参考节点在 fragment 的情况可能改变，所以直接找旧树 DOM 元素的下一个节点</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">getNextHostNode</span><span style="color:#24292E;">(prevTree),</span></span>
<span class="line"><span style="color:#24292E;">        instance,</span></span>
<span class="line"><span style="color:#24292E;">        parentSuspense,</span></span>
<span class="line"><span style="color:#24292E;">        isSVG)</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 缓存更新后的 DOM 节点</span></span>
<span class="line"><span style="color:#24292E;">      next.el </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> nextTree.el</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }, prodEffectOptions)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>可以看到，更新组件主要做三件事情：<strong>更新组件 vnode 节点、渲染新的子树 vnode、根据新旧子树 vnode 执行 patch 逻辑</strong>。</p><p>首先是更新组件 vnode 节点，这里会有一个条件判断，判断组件实例中是否有新的组件 vnode（用 next 表示），有则更新组件 vnode，没有 next 指向之前的组件 vnode。为什么需要判断，这其实涉及一个组件更新策略的逻辑，我们稍后会讲。</p><p>接着是渲染新的子树 vnode，因为数据发生了变化，模板又和数据相关，所以渲染生成的子树 vnode 也会发生相应的变化。</p><p>最后就是<strong>核心的 patch 逻辑</strong>，用来找出新旧子树 vnode 的不同，并找到一种合适的方式更新 DOM，接下来我们就来分析这个过程。</p><h4 id="核心逻辑-patch-流程" tabindex="-1">核心逻辑：patch 流程 <a class="header-anchor" href="#核心逻辑-patch-流程" aria-label="Permalink to &quot;核心逻辑：patch 流程&quot;">​</a></h4><p>我们先来看 patch 流程的实现代码：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> patch </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (n1, n2, container, anchor </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">, parentComponent </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">, parentSuspense </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">, isSVG </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">, optimized </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 如果存在新旧节点, 且新旧节点类型不同，则销毁旧节点</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (n1 </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#B392F0;">isSameVNodeType</span><span style="color:#E1E4E8;">(n1, n2)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    anchor </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getNextHostNode</span><span style="color:#E1E4E8;">(n1)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">unmount</span><span style="color:#E1E4E8;">(n1, parentComponent, parentSuspense, </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// n1 设置为 null 保证后续都走 mount 逻辑</span></span>
<span class="line"><span style="color:#E1E4E8;">    n1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { type, shapeFlag } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> n2</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">switch</span><span style="color:#E1E4E8;"> (type) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> Text</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 处理文本节点</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">break</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> Comment</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 处理注释节点</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">break</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> Static</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 处理静态节点</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">break</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">case</span><span style="color:#E1E4E8;"> Fragment</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 处理 Fragment 元素</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">break</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">default:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (shapeFlag </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">/* ELEMENT */</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 处理普通 DOM 元素</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">processElement</span><span style="color:#E1E4E8;">(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized)</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (shapeFlag </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">6</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">/* COMPONENT */</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 处理组件</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">processComponent</span><span style="color:#E1E4E8;">(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized)</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (shapeFlag </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">64</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">/* TELEPORT */</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 处理 TELEPORT</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (shapeFlag </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">128</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">/* SUSPENSE */</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 处理 SUSPENSE</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">function </span><span style="color:#B392F0;">isSameVNodeType</span><span style="color:#E1E4E8;"> (n1, n2) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// n1 和 n2 节点的 type 和 key 都相同，才是相同节点</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> n1.type </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> n2.type </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> n1.key </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> n2.key</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> patch </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (n1, n2, container, anchor </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">, parentComponent </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">, parentSuspense </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">, isSVG </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">, optimized </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 如果存在新旧节点, 且新旧节点类型不同，则销毁旧节点</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (n1 </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#6F42C1;">isSameVNodeType</span><span style="color:#24292E;">(n1, n2)) {</span></span>
<span class="line"><span style="color:#24292E;">    anchor </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getNextHostNode</span><span style="color:#24292E;">(n1)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">unmount</span><span style="color:#24292E;">(n1, parentComponent, parentSuspense, </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// n1 设置为 null 保证后续都走 mount 逻辑</span></span>
<span class="line"><span style="color:#24292E;">    n1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { type, shapeFlag } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> n2</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">switch</span><span style="color:#24292E;"> (type) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> Text</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 处理文本节点</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">break</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> Comment</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 处理注释节点</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">break</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> Static</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 处理静态节点</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">break</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">case</span><span style="color:#24292E;"> Fragment</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 处理 Fragment 元素</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">break</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">default:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (shapeFlag </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">/* ELEMENT */</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 处理普通 DOM 元素</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">processElement</span><span style="color:#24292E;">(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized)</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (shapeFlag </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">6</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">/* COMPONENT */</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 处理组件</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">processComponent</span><span style="color:#24292E;">(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized)</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (shapeFlag </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">64</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">/* TELEPORT */</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 处理 TELEPORT</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (shapeFlag </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">128</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">/* SUSPENSE */</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 处理 SUSPENSE</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">function </span><span style="color:#6F42C1;">isSameVNodeType</span><span style="color:#24292E;"> (n1, n2) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// n1 和 n2 节点的 type 和 key 都相同，才是相同节点</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> n1.type </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> n2.type </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> n1.key </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> n2.key</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>在这个过程中，首先判断新旧节点是否是相同的 vnode 类型，如果不同，比如一个 div 更新成一个 ul，那么最简单的操作就是删除旧的 div 节点，再去挂载新的 ul 节点。</p><p>如果是相同的 vnode 类型，就需要走 diff 更新流程了，接着会根据不同的 vnode 类型执行不同的处理逻辑，这里我们仍然只分析普通元素类型和组件类型的处理过程。</p><h5 id="_1-处理组件" tabindex="-1">1. 处理组件 <a class="header-anchor" href="#_1-处理组件" aria-label="Permalink to &quot;1. 处理组件&quot;">​</a></h5><p>如何<strong>处理组件</strong>的呢？举个例子，我们在父组件 App 中里引入了 Hello 组件：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;app&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;This is an app.&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">hello</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">:msg=&quot;msg&quot;&gt;&lt;/hello&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">&lt;button</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">@click=&quot;toggle&quot;&gt;Toggle</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">msg&lt;/button&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">&lt;/div&gt;</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;script&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">data</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">      return {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">msg</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;Vue&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    methods: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">toggle</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.msg </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.msg </span><span style="color:#F97583;">====</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;Vue&#39;</span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;World&#39;</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;Vue&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;/script&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;app&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;This is an app.&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">hello</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">:msg=&quot;msg&quot;&gt;&lt;/hello&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">&lt;button</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">@click=&quot;toggle&quot;&gt;Toggle</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">msg&lt;/button&gt;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">&lt;/div&gt;</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;script&gt;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">export</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">data</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">      return {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">msg</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;Vue&#39;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    methods: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">toggle</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.msg </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.msg </span><span style="color:#D73A49;">====</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;Vue&#39;</span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;World&#39;</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;Vue&#39;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;/script&gt;</span></span></code></pre></div><p>Hello 组件中是 <code>&lt;div&gt;</code> 包裹着一个 <code>&lt;p&gt;</code> 标签， 如下所示：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;hello&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;Hello, { {msg}}&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  export default {</span></span>
<span class="line"><span style="color:#E1E4E8;">    props: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      msg: String</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;hello&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;Hello, { {msg}}&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  export default {</span></span>
<span class="line"><span style="color:#24292E;">    props: {</span></span>
<span class="line"><span style="color:#24292E;">      msg: String</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>点击 App 组件中的按钮执行 toggle 函数，就会修改 data 中的 msg，并且会触发App 组件的重新渲染。</p><p>结合前面对渲染函数的流程分析，这里 App 组件的根节点是 div 标签，重新渲染的子树 vnode 节点是一个普通元素的 vnode，应该先走 processElement 逻辑。组件的更新最终还是要转换成内部真实 DOM 的更新，而实际上普通元素的处理流程才是真正做 DOM 的更新，由于稍后我们会详细分析普通元素的处理流程，所以我们先跳过这里，继续往下看。</p><p>和渲染过程类似，更新过程也是一个树的深度优先遍历过程，更新完当前节点后，就会遍历更新它的子节点，因此在遍历的过程中会遇到 hello 这个组件 vnode 节点，就会执行到 processComponent 处理逻辑中，我们再来看一下它的实现，我们重点关注一下组件更新的相关逻辑：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> processComponent </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (n1 </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 挂载组件</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 更新子组件</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">updateComponent</span><span style="color:#E1E4E8;">(n1, n2, parentComponent, optimized)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> updateComponent </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (n1, n2, parentComponent, optimized) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> instance </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (n2.component </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> n1.component)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 根据新旧子组件 vnode 判断是否需要更新子组件</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">shouldUpdateComponent</span><span style="color:#E1E4E8;">(n1, n2, parentComponent, optimized)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 新的子组件 vnode 赋值给 instance.next</span></span>
<span class="line"><span style="color:#E1E4E8;">    instance.next </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> n2</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 子组件也可能因为数据变化被添加到更新队列里了，移除它们防止对一个子组件重复更新</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">invalidateJob</span><span style="color:#E1E4E8;">(instance.update)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 执行子组件的副作用渲染函数</span></span>
<span class="line"><span style="color:#E1E4E8;">    instance.</span><span style="color:#B392F0;">update</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 不需要更新，只复制属性</span></span>
<span class="line"><span style="color:#E1E4E8;">    n2.component </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> n1.component</span></span>
<span class="line"><span style="color:#E1E4E8;">    n2.el </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> n1.el</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> processComponent </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (n1 </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 挂载组件</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 更新子组件</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">updateComponent</span><span style="color:#24292E;">(n1, n2, parentComponent, optimized)</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> updateComponent </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (n1, n2, parentComponent, optimized) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> instance </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (n2.component </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> n1.component)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 根据新旧子组件 vnode 判断是否需要更新子组件</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#6F42C1;">shouldUpdateComponent</span><span style="color:#24292E;">(n1, n2, parentComponent, optimized)) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 新的子组件 vnode 赋值给 instance.next</span></span>
<span class="line"><span style="color:#24292E;">    instance.next </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> n2</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 子组件也可能因为数据变化被添加到更新队列里了，移除它们防止对一个子组件重复更新</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">invalidateJob</span><span style="color:#24292E;">(instance.update)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 执行子组件的副作用渲染函数</span></span>
<span class="line"><span style="color:#24292E;">    instance.</span><span style="color:#6F42C1;">update</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 不需要更新，只复制属性</span></span>
<span class="line"><span style="color:#24292E;">    n2.component </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> n1.component</span></span>
<span class="line"><span style="color:#24292E;">    n2.el </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> n1.el</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>可以看到，processComponent 主要通过执行 updateComponent 函数来更新子组件，updateComponent 函数在更新子组件的时候，会先执行 shouldUpdateComponent 函数，根据新旧子组件 vnode 来判断是否需要更新子组件。这里你只需要知道，在 shouldUpdateComponent 函数的内部，主要是通过检测和对比组件 vnode 中的 props、chidren、dirs、transiton 等属性，来决定子组件是否需要更新。</p><p>这是很好理解的，因为在一个组件的子组件是否需要更新，我们主要依据子组件 vnode 是否存在一些会影响组件更新的属性变化进行判断，如果存在就会更新子组件。</p><p>虽然 Vue.js 的更新粒度是组件级别的，组件的数据变化只会影响当前组件的更新，但是在组件更新的过程中，也会对子组件做一定的检查，判断子组件是否也要更新，并通过某种机制避免子组件重复更新。</p><p>我们接着看 updateComponent 函数，如果 shouldUpdateComponent 返回 true ，那么在它的最后，先执行 invalidateJob（instance.update）避免子组件由于自身数据变化导致的重复更新，然后又执行了子组件的副作用渲染函数 instance.update 来主动触发子组件的更新。</p><p>再回到副作用渲染函数中，有了前面的讲解，我们再看组件更新的这部分代码，就能很好地理解它的逻辑了：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 更新组件</span></span>
<span class="line"><span style="color:#E1E4E8;">let { next, vnode } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> instance</span></span>
<span class="line"><span style="color:#6A737D;">// next 表示新的组件 vnode</span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (next) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 更新组件 vnode 节点信息</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">updateComponentPreRender</span><span style="color:#E1E4E8;">(instance, next, optimized)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  next </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> vnode</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> updateComponentPreRender </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (instance, nextVNode, optimized) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 新组件 vnode 的 component 属性指向组件实例</span></span>
<span class="line"><span style="color:#E1E4E8;">  nextVNode.component </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> instance</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 旧组件 vnode 的 props 属性</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> prevProps </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> instance.vnode.props</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 组件实例的 vnode 属性指向新的组件 vnode</span></span>
<span class="line"><span style="color:#E1E4E8;">  instance.vnode </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> nextVNode</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 清空 next 属性，为了下一次重新渲染准备</span></span>
<span class="line"><span style="color:#E1E4E8;">  instance.next </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 更新 props</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">updateProps</span><span style="color:#E1E4E8;">(instance, nextVNode.props, prevProps, optimized)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 更新 插槽</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">updateSlots</span><span style="color:#E1E4E8;">(instance, nextVNode.children)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 更新组件</span></span>
<span class="line"><span style="color:#24292E;">let { next, vnode } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> instance</span></span>
<span class="line"><span style="color:#6A737D;">// next 表示新的组件 vnode</span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (next) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 更新组件 vnode 节点信息</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">updateComponentPreRender</span><span style="color:#24292E;">(instance, next, optimized)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  next </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> vnode</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> updateComponentPreRender </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (instance, nextVNode, optimized) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 新组件 vnode 的 component 属性指向组件实例</span></span>
<span class="line"><span style="color:#24292E;">  nextVNode.component </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> instance</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 旧组件 vnode 的 props 属性</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> prevProps </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> instance.vnode.props</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 组件实例的 vnode 属性指向新的组件 vnode</span></span>
<span class="line"><span style="color:#24292E;">  instance.vnode </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> nextVNode</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 清空 next 属性，为了下一次重新渲染准备</span></span>
<span class="line"><span style="color:#24292E;">  instance.next </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 更新 props</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">updateProps</span><span style="color:#24292E;">(instance, nextVNode.props, prevProps, optimized)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 更新 插槽</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">updateSlots</span><span style="color:#24292E;">(instance, nextVNode.children)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>结合上面的代码，我们在更新组件的 DOM 前，需要先更新组件 vnode 节点信息，包括更改组件实例的 vnode 指针、更新 props 和更新插槽等一系列操作，因为组件在稍后执行 renderComponentRoot 时会重新渲染新的子树 vnode ，它依赖了更新后的组件 vnode 中的 props 和 slots 等数据。</p><p>所以我们现在知道了一个组件重新渲染可能会有两种场景，一种是组件本身的数据变化，这种情况下 next 是 null；另一种是父组件在更新的过程中，遇到子组件节点，先判断子组件是否需要更新，如果需要则主动执行子组件的重新渲染方法，这种情况下 next 就是新的子组件 vnode。</p><p>你可能还会有疑问，这个子组件对应的新的组件 vnode 是什么时候创建的呢？答案很简单，它是在父组件重新渲染的过程中，通过 renderComponentRoot 渲染子树 vnode 的时候生成，因为子树 vnode 是个树形结构，通过遍历它的子节点就可以访问到其对应的组件 vnode。再拿我们前面举的例子说，当 App 组件重新渲染的时候，在执行 renderComponentRoot 生成子树 vnode 的过程中，也生成了 hello 组件对应的新的组件 vnode。</p><p>所以 processComponent 处理组件 vnode，本质上就是去判断子组件是否需要更新，如果需要则递归执行子组件的副作用渲染函数来更新，否则仅仅更新一些 vnode 的属性，并让子组件实例保留对组件 vnode 的引用，用于子组件自身数据变化引起组件重新渲染的时候，在渲染函数内部可以拿到新的组件 vnode。</p><p>前面也说过，组件是抽象的，组件的更新最终还是会落到对普通 DOM 元素的更新。所以接下来我们详细分析一下组件更新中<strong>对普通元素</strong>的处理流程。</p><h5 id="_2-处理普通元素" tabindex="-1">2. 处理普通元素 <a class="header-anchor" href="#_2-处理普通元素" aria-label="Permalink to &quot;2. 处理普通元素&quot;">​</a></h5><p>我们再来看如何处理普通元素，我把之前的示例稍加修改，将其中的 Hello 组件删掉，如下所示：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;app&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;This is { {msg}}.&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">button</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">@click=&quot;toggle&quot;&gt;Toggle</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">msg&lt;/button&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">&lt;/div&gt;</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;script&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">data</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">      return {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">msg</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;Vue&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    methods: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">toggle</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.msg </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;Vue&#39;</span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;World&#39;</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;Vue&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;/script&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;app&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;This is { {msg}}.&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">button</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">@click=&quot;toggle&quot;&gt;Toggle</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">msg&lt;/button&gt;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">&lt;/div&gt;</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;script&gt;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">export</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">data</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">      return {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">msg</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;Vue&#39;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    methods: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">toggle</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.msg </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;Vue&#39;</span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;World&#39;</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;Vue&#39;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;/script&gt;</span></span></code></pre></div><p>当我们点击 App 组件中的按钮会执行 toggle 函数，然后修改 data 中的 msg，这就触发了 App 组件的重新渲染。</p><p>App 组件的根节点是 div 标签，重新渲染的子树 vnode 节点是一个普通元素的 vnode，所以应该先走 processElement 逻辑，我们来看这个函数的实现：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> processElement </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  isSVG </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> isSVG </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> n2.type </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;svg&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (n1 </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 挂载元素</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 更新元素</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">patchElement</span><span style="color:#E1E4E8;">(n1, n2, parentComponent, parentSuspense, isSVG, optimized)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> patchElement </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (n1, n2, parentComponent, parentSuspense, isSVG, optimized) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> el </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (n2.el </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> n1.el)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> oldProps </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (n1 </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> n1.props) </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> EMPTY_OBJ</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> newProps </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> n2.props </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> EMPTY_OBJ</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 更新 props</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">patchProps</span><span style="color:#E1E4E8;">(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> areChildrenSVG </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> isSVG </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> n2.type </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;foreignObject&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 更新子节点</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">patchChildren</span><span style="color:#E1E4E8;">(n1, n2, el, </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">, parentComponent, parentSuspense, areChildrenSVG)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> processElement </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  isSVG </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> isSVG </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> n2.type </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;svg&#39;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (n1 </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 挂载元素</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 更新元素</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">patchElement</span><span style="color:#24292E;">(n1, n2, parentComponent, parentSuspense, isSVG, optimized)</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> patchElement </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (n1, n2, parentComponent, parentSuspense, isSVG, optimized) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> el </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (n2.el </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> n1.el)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> oldProps </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (n1 </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> n1.props) </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> EMPTY_OBJ</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> newProps </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> n2.props </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> EMPTY_OBJ</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 更新 props</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">patchProps</span><span style="color:#24292E;">(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> areChildrenSVG </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> isSVG </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> n2.type </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;foreignObject&#39;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 更新子节点</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">patchChildren</span><span style="color:#24292E;">(n1, n2, el, </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">, parentComponent, parentSuspense, areChildrenSVG)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>可以看到，更新元素的过程主要做两件事情：更新 props 和更新子节点。其实这是很好理解的，因为一个 DOM 节点元素就是由它自身的一些属性和子节点构成的。</p><p>首先是更新 props，这里的 patchProps 函数就是在更新 DOM 节点的 class、style、event 以及其它的一些 DOM 属性，这个过程我不再深入分析了，感兴趣的同学可以自己看这部分代码。</p><p>其次是更新子节点，我们来看一下这里的 patchChildren 函数的实现：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark has-diff vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> patchChildren </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> c1 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> n1 </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> n1.children</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> prevShapeFlag </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> n1 </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> n1.shapeFlag </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> c2 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> n2.children</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { shapeFlag } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> n2</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 子节点有 3 种可能情况：文本、数组、空</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (shapeFlag </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">8</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">/* TEXT_CHILDREN */</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (prevShapeFlag </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">16</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">/* ARRAY_CHILDREN */</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 数组 -&gt; 文本，则删除之前的子节点</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">unmountChildren</span><span style="color:#E1E4E8;">(c1, parentComponent, parentSuspense)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (c2 </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> c1) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 文本对比不同，则替换为新文本</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">hostSetElementText</span><span style="color:#E1E4E8;">(container, c2)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (prevShapeFlag </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">16</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">/* ARRAY_CHILDREN */</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 之前的子节点是数组</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (shapeFlag </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">16</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">/* ARRAY_CHILDREN */</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 新的子节点仍然是数组，则做完整地 diff</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">patchKeyedChildren</span><span style="color:#E1E4E8;">(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, optimized)</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 数组 -&gt; 空，则仅仅删除之前的子节点</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">unmountChildren</span><span style="color:#E1E4E8;">(c1, parentComponent, parentSuspense, </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 之前的子节点是文本节点或者为空</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 新的子节点是数组或者为空</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (prevShapeFlag </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">8</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">/* TEXT_CHILDREN */</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 如果之前子节点是文本，则把它清空</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">hostSetElementText</span><span style="color:#E1E4E8;">(container, </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (shapeFlag </span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">16</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">/* ARRAY_CHILDREN */</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 如果新的子节点是数组，则挂载新子节点</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">mountChildren</span><span style="color:#E1E4E8;">(c2, container, anchor, parentComponent, parentSuspense, isSVG, optimized)</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light has-diff vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> patchChildren </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> c1 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> n1 </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> n1.children</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> prevShapeFlag </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> n1 </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> n1.shapeFlag </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> c2 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> n2.children</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { shapeFlag } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> n2</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 子节点有 3 种可能情况：文本、数组、空</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (shapeFlag </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">8</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">/* TEXT_CHILDREN */</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (prevShapeFlag </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">16</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">/* ARRAY_CHILDREN */</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 数组 -&gt; 文本，则删除之前的子节点</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">unmountChildren</span><span style="color:#24292E;">(c1, parentComponent, parentSuspense)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (c2 </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> c1) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 文本对比不同，则替换为新文本</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">hostSetElementText</span><span style="color:#24292E;">(container, c2)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (prevShapeFlag </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">16</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">/* ARRAY_CHILDREN */</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 之前的子节点是数组</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (shapeFlag </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">16</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">/* ARRAY_CHILDREN */</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 新的子节点仍然是数组，则做完整地 diff</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">patchKeyedChildren</span><span style="color:#24292E;">(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, optimized)</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 数组 -&gt; 空，则仅仅删除之前的子节点</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">unmountChildren</span><span style="color:#24292E;">(c1, parentComponent, parentSuspense, </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 之前的子节点是文本节点或者为空</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 新的子节点是数组或者为空</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (prevShapeFlag </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">8</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">/* TEXT_CHILDREN */</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 如果之前子节点是文本，则把它清空</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">hostSetElementText</span><span style="color:#24292E;">(container, </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (shapeFlag </span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">16</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">/* ARRAY_CHILDREN */</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 如果新的子节点是数组，则挂载新子节点</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">mountChildren</span><span style="color:#24292E;">(c2, container, anchor, parentComponent, parentSuspense, isSVG, optimized)</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>对于一个元素的子节点 vnode 可能会有三种情况：纯文本、vnode 数组和空。那么根据排列组合对于新旧子节点来说就有九种情况，我们可以通过三张图来表示。</p><p>首先来看一下<strong>旧子节点是纯文本</strong>的情况：</p><ul><li><p>如果新子节点也是纯文本，那么做简单地文本替换即可；</p></li><li><p>如果新子节点是空，那么删除旧子节点即可；</p></li><li><p>如果新子节点是 vnode 数组，那么先把旧子节点的文本清空，再去旧子节点的父容器下添加多个新子节点。</p></li></ul>`,47),y=s("p",null,[n("接下来看一下"),s("strong",null,"旧子节点是空"),n("的情况：")],-1),i=s("ul",null,[s("li",null,[s("p",null,"如果新子节点是纯文本，那么在旧子节点的父容器下添加新文本节点即可；")]),s("li",null,[s("p",null,"如果新子节点也是空，那么什么都不需要做；")]),s("li",null,[s("p",null,"如果新子节点是 vnode 数组，那么直接去旧子节点的父容器下添加多个新子节点即可。")])],-1),d=s("p",null,[n("最后来看一下"),s("strong",null,"旧子节点是 vnode 数组"),n("的情况：")],-1),F=s("ul",null,[s("li",null,[s("p",null,"如果新子节点是纯文本，那么先删除旧子节点，再去旧子节点的父容器下添加新文本节点；")]),s("li",null,[s("p",null,"如果新子节点是空，那么删除旧子节点即可；")]),s("li",null,[s("p",null,"如果新子节点也是 vnode 数组，那么就需要做完整的 diff 新旧子节点了，这是最复杂的情况，内部运用了核心 diff 算法。")])],-1),D=s("p",null,"下节课我们就来深入探究一下这个复杂的 diff 算法。",-1),A=s("blockquote",null,[s("p",null,[s("strong",null,"本节课的相关代码在源代码中的位置如下：")]),s("p",null,"packages/runtime-core/src/renderer.ts"),s("p",null,"packages/runtime-core/src/componentRenderUtils.ts")],-1);function g(m,u,h,C,v,f){const a=o("Image");return e(),t("div",null,[E,p(a,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/31/18/Ciqc1F8MBDWAfUAXAADe59XvjHY701.png"}),n(),y,i,p(a,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/31/23/CgqCHl8MBEOANnFmAADYr-_R5mM894.png"}),n(),d,F,p(a,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/31/23/CgqCHl8MBCuAUZksAADplAU2718113.png"}),n(),D,A])}const _=l(r,[["render",g]]);export{S as __pageData,_ as default};
