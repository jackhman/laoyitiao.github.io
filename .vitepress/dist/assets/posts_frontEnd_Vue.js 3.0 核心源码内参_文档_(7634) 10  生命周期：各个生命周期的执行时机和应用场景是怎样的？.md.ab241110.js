import{_ as a,j as p,o as l,g as o,k as e,Q as t,s}from"./chunks/framework.b3d8e22e.js";const v=JSON.parse('{"title":"注册钩子函数 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Vue.js 3.0 核心源码内参_文档/(7634) 10  生命周期：各个生命周期的执行时机和应用场景是怎样的？.md","filePath":"posts/frontEnd/Vue.js 3.0 核心源码内参_文档/(7634) 10  生命周期：各个生命周期的执行时机和应用场景是怎样的？.md","lastUpdated":1696417798000}'),c={name:"posts/frontEnd/Vue.js 3.0 核心源码内参_文档/(7634) 10  生命周期：各个生命周期的执行时机和应用场景是怎样的？.md"},r=t(`<p>Vue.js 组件的生命周期包括创建、更新、销毁等过程。在这些过程中也会运行叫生命周期钩子的函数，这给了用户在不同阶段添加自己的代码的机会。</p><p>在 Vue.js 2.x 中，我们通常会在组件对象中定义一些生命周期钩子函数，到了 Vue.js 3.0，依然兼容 Vue.js 2.x 生命周期的语法，但是 Composition API 提供了一些生命周期函数的 API，让我们可以主动注册不同的生命周期。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// Vue.js 2.x 定义生命周期钩子函数 </span></span>
<span class="line"><span style="color:#E1E4E8;">export </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">created</span><span style="color:#E1E4E8;">() { </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 做一些初始化工作 </span></span>
<span class="line"><span style="color:#E1E4E8;">  }, </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">mounted</span><span style="color:#E1E4E8;">() { </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 可以拿到 DOM 节点 </span></span>
<span class="line"><span style="color:#E1E4E8;">  }, </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">beforeDestroy</span><span style="color:#E1E4E8;">() { </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 做一些清理操作 </span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span></span>
<span class="line"><span style="color:#E1E4E8;">} </span></span>
<span class="line"><span style="color:#6A737D;">//  Vue.js 3.x 生命周期 API 改写上例 </span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { onMounted, onBeforeUnmount } from &#39;vue&#39; </span></span>
<span class="line"><span style="color:#E1E4E8;">export </span><span style="color:#FDAEB7;font-style:italic;">default</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#E1E4E8;">  setup() { </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 做一些初始化工作 </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    onMounted(() =&gt; { </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 可以拿到 DOM 节点 </span></span>
<span class="line"><span style="color:#E1E4E8;">    }) </span></span>
<span class="line"><span style="color:#E1E4E8;">    onBeforeUnmount(()=&gt;{ </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 做一些清理操作 </span></span>
<span class="line"><span style="color:#E1E4E8;">    }) </span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// Vue.js 2.x 定义生命周期钩子函数 </span></span>
<span class="line"><span style="color:#24292E;">export </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">created</span><span style="color:#24292E;">() { </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 做一些初始化工作 </span></span>
<span class="line"><span style="color:#24292E;">  }, </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">mounted</span><span style="color:#24292E;">() { </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 可以拿到 DOM 节点 </span></span>
<span class="line"><span style="color:#24292E;">  }, </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">beforeDestroy</span><span style="color:#24292E;">() { </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 做一些清理操作 </span></span>
<span class="line"><span style="color:#24292E;">  } </span></span>
<span class="line"><span style="color:#24292E;">} </span></span>
<span class="line"><span style="color:#6A737D;">//  Vue.js 3.x 生命周期 API 改写上例 </span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { onMounted, onBeforeUnmount } from &#39;vue&#39; </span></span>
<span class="line"><span style="color:#24292E;">export </span><span style="color:#B31D28;font-style:italic;">default</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#24292E;">  setup() { </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 做一些初始化工作 </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    onMounted(() =&gt; { </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 可以拿到 DOM 节点 </span></span>
<span class="line"><span style="color:#24292E;">    }) </span></span>
<span class="line"><span style="color:#24292E;">    onBeforeUnmount(()=&gt;{ </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 做一些清理操作 </span></span>
<span class="line"><span style="color:#24292E;">    }) </span></span>
<span class="line"><span style="color:#24292E;">  } </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>可以看到，在 Vue.js 3.0 中，setup 函数已经替代了 Vue.js 2.x 的 beforeCreate 和 created 钩子函数，我们可以在 setup 函数做一些初始化工作，比如发送一个异步 Ajax 请求获取数据。</p><p>我们用 onMounted API 替代了 Vue.js 2.x 的 mounted 钩子函数，用 onBeforeUnmount API 替代了 Vue.js 2.x 的 beforeDestroy 钩子函数。</p><p>其实，Vue.js 3.0 针对 Vue.js 2.x 的生命周期钩子函数做了全面替换，映射关系如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">beforeCreate </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> 使用 </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;">() </span></span>
<span class="line"><span style="color:#E1E4E8;">created </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> 使用 use </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;">() </span></span>
<span class="line"><span style="color:#E1E4E8;">beforeMount </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> onBeforeMount </span></span>
<span class="line"><span style="color:#E1E4E8;">mounted </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> onMounted </span></span>
<span class="line"><span style="color:#E1E4E8;">beforeUpdate </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> onBeforeUpdate </span></span>
<span class="line"><span style="color:#E1E4E8;">updated </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> onUpdated </span></span>
<span class="line"><span style="color:#E1E4E8;">beforeDestroy</span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> onBeforeUnmount </span></span>
<span class="line"><span style="color:#E1E4E8;">destroyed </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> onUnmounted </span></span>
<span class="line"><span style="color:#E1E4E8;">activated </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> onActivated </span></span>
<span class="line"><span style="color:#E1E4E8;">deactivated </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> onDeactivated </span></span>
<span class="line"><span style="color:#E1E4E8;">errorCaptured </span><span style="color:#F97583;">-&gt;</span><span style="color:#E1E4E8;"> onErrorCaptured</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">beforeCreate </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> 使用 </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;">() </span></span>
<span class="line"><span style="color:#24292E;">created </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> 使用 use </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;">() </span></span>
<span class="line"><span style="color:#24292E;">beforeMount </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> onBeforeMount </span></span>
<span class="line"><span style="color:#24292E;">mounted </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> onMounted </span></span>
<span class="line"><span style="color:#24292E;">beforeUpdate </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> onBeforeUpdate </span></span>
<span class="line"><span style="color:#24292E;">updated </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> onUpdated </span></span>
<span class="line"><span style="color:#24292E;">beforeDestroy</span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> onBeforeUnmount </span></span>
<span class="line"><span style="color:#24292E;">destroyed </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> onUnmounted </span></span>
<span class="line"><span style="color:#24292E;">activated </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> onActivated </span></span>
<span class="line"><span style="color:#24292E;">deactivated </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> onDeactivated </span></span>
<span class="line"><span style="color:#24292E;">errorCaptured </span><span style="color:#D73A49;">-&gt;</span><span style="color:#24292E;"> onErrorCaptured</span></span></code></pre></div><p>除此之外，Vue.js 3.0 还新增了两个用于调试的生命周期 API：onRenderTracked 和 onRenderTriggered。</p><p>那么，这些生命周期钩子函数内部是如何实现的？它们又分别在组件生命周期的哪些阶段执行的？分别适用于哪些开发场景？</p><p>带着这些疑问，我们来深入学习生命周期钩子函数背后的实现原理。</p><h3 id="注册钩子函数" tabindex="-1">注册钩子函数 <a class="header-anchor" href="#注册钩子函数" aria-label="Permalink to &quot;注册钩子函数&quot;">​</a></h3><p>首先，我们来看这些钩子函数是如何注册的，先来看一下它们的实现：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> onBeforeMount </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createHook</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;bm&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">/* BEFORE_MOUNT */</span><span style="color:#E1E4E8;">) </span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> onMounted </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createHook</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;m&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">/* MOUNTED */</span><span style="color:#E1E4E8;">) </span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> onBeforeUpdate </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createHook</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;bu&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">/* BEFORE_UPDATE */</span><span style="color:#E1E4E8;">) </span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> onUpdated </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createHook</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;u&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">/* UPDATED */</span><span style="color:#E1E4E8;">) </span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> onBeforeUnmount </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createHook</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;bum&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">/* BEFORE_UNMOUNT */</span><span style="color:#E1E4E8;">) </span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> onUnmounted </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createHook</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;um&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">/* UNMOUNTED */</span><span style="color:#E1E4E8;">) </span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> onRenderTriggered </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createHook</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;rtg&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">/* RENDER_TRIGGERED */</span><span style="color:#E1E4E8;">) </span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> onRenderTracked </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createHook</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;rtc&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">/* RENDER_TRACKED */</span><span style="color:#E1E4E8;">) </span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> onErrorCaptured </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (hook, target </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> currentInstance) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">injectHook</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;ec&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">/* ERROR_CAPTURED */</span><span style="color:#E1E4E8;">, hook, target) </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> onBeforeMount </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createHook</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;bm&#39;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">/* BEFORE_MOUNT */</span><span style="color:#24292E;">) </span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> onMounted </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createHook</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;m&#39;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">/* MOUNTED */</span><span style="color:#24292E;">) </span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> onBeforeUpdate </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createHook</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;bu&#39;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">/* BEFORE_UPDATE */</span><span style="color:#24292E;">) </span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> onUpdated </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createHook</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;u&#39;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">/* UPDATED */</span><span style="color:#24292E;">) </span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> onBeforeUnmount </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createHook</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;bum&#39;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">/* BEFORE_UNMOUNT */</span><span style="color:#24292E;">) </span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> onUnmounted </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createHook</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;um&#39;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">/* UNMOUNTED */</span><span style="color:#24292E;">) </span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> onRenderTriggered </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createHook</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;rtg&#39;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">/* RENDER_TRIGGERED */</span><span style="color:#24292E;">) </span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> onRenderTracked </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createHook</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;rtc&#39;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">/* RENDER_TRACKED */</span><span style="color:#24292E;">) </span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> onErrorCaptured </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (hook, target </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> currentInstance) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">injectHook</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;ec&#39;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">/* ERROR_CAPTURED */</span><span style="color:#24292E;">, hook, target) </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>我们发现除了 onErrorCaptured，其他钩子函数都是通过 createHook 函数创建的，通过传入不同的字符串来表示不同的钩子函数。</p><p>那么，我们就来分析一下 createHook 钩子函数的实现原理：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> createHook </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">function</span><span style="color:#E1E4E8;">(lifecycle)  { </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">function</span><span style="color:#E1E4E8;"> (hook, target </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> currentInstance) { </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">injectHook</span><span style="color:#E1E4E8;">(lifecycle, hook, target) </span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> createHook </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">function</span><span style="color:#24292E;">(lifecycle)  { </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">function</span><span style="color:#24292E;"> (hook, target </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> currentInstance) { </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">injectHook</span><span style="color:#24292E;">(lifecycle, hook, target) </span></span>
<span class="line"><span style="color:#24292E;">  } </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>createHook 会返回一个函数，它的内部通过 injectHook 注册钩子函数。你可能会问，这里为什么要用 createHook 做一层封装而不直接使用 injectHook API 呢？比如：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> onBeforeMount </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">function</span><span style="color:#E1E4E8;">(hook,target </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> currentInstance) { </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">injectHook</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;bm&#39;</span><span style="color:#E1E4E8;">, hook, target) </span></span>
<span class="line"><span style="color:#E1E4E8;">} </span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> onMounted </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">function</span><span style="color:#E1E4E8;">(hook,target </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> currentInstance) { </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">injectHook</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;m&#39;</span><span style="color:#E1E4E8;">, hook, target) </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> onBeforeMount </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">function</span><span style="color:#24292E;">(hook,target </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> currentInstance) { </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">injectHook</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;bm&#39;</span><span style="color:#24292E;">, hook, target) </span></span>
<span class="line"><span style="color:#24292E;">} </span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> onMounted </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">function</span><span style="color:#24292E;">(hook,target </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> currentInstance) { </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">injectHook</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;m&#39;</span><span style="color:#24292E;">, hook, target) </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这样实现当然也是可以的，不过，我们可以发现，这些钩子函数内部执行逻辑很类似，都是执行 injectHook，唯一的区别是第一个参数字符串不同，所以这样的代码是可以进一步封装的，即用 createHook 封装，这就是一个典型的函数柯里化技巧。</p><p>在调用 createHook 返回的函数时，也就不需要传入 lifecycle 字符串，因为它在执行 createHook 函数时就已经实现了该参数的保留。</p><p>所以，当我们通过 <code>onMounted(hook)</code> 注册一个钩子函数时，内部就是通过 <code>injectHook(&#39;m&#39;, hook)</code> 去注册的，接下来我们来进一步看 injectHook 函数的实现原理：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function </span><span style="color:#B392F0;">injectHook</span><span style="color:#E1E4E8;">(type, hook, target </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> currentInstance, prepend </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">) { </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> hooks </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> target[type] </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> (target[type] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> []) </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 封装 hook 钩子函数并缓存 </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> wrappedHook </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> hook.__weh </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    (hook.__weh </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (...args) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (target.isUnmounted) { </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">      } </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 停止依赖收集 </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">pauseTracking</span><span style="color:#E1E4E8;">() </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 设置 target 为当前运行的组件实例 </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">setCurrentInstance</span><span style="color:#E1E4E8;">(target) </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 执行钩子函数 </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> res </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">callWithAsyncErrorHandling</span><span style="color:#E1E4E8;">(hook, target, type, args) </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">setCurrentInstance</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">) </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 恢复依赖收集 </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">resetTracking</span><span style="color:#E1E4E8;">() </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> res </span></span>
<span class="line"><span style="color:#E1E4E8;">    }) </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (prepend) { </span></span>
<span class="line"><span style="color:#E1E4E8;">    hooks.</span><span style="color:#B392F0;">unshift</span><span style="color:#E1E4E8;">(wrappedHook) </span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#E1E4E8;">    hooks.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(wrappedHook) </span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function </span><span style="color:#6F42C1;">injectHook</span><span style="color:#24292E;">(type, hook, target </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> currentInstance, prepend </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">) { </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> hooks </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> target[type] </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> (target[type] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> []) </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 封装 hook 钩子函数并缓存 </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> wrappedHook </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> hook.__weh </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    (hook.__weh </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (...args) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (target.isUnmounted) { </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">      } </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 停止依赖收集 </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">pauseTracking</span><span style="color:#24292E;">() </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 设置 target 为当前运行的组件实例 </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">setCurrentInstance</span><span style="color:#24292E;">(target) </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 执行钩子函数 </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> res </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">callWithAsyncErrorHandling</span><span style="color:#24292E;">(hook, target, type, args) </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">setCurrentInstance</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">) </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 恢复依赖收集 </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">resetTracking</span><span style="color:#24292E;">() </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> res </span></span>
<span class="line"><span style="color:#24292E;">    }) </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (prepend) { </span></span>
<span class="line"><span style="color:#24292E;">    hooks.</span><span style="color:#6F42C1;">unshift</span><span style="color:#24292E;">(wrappedHook) </span></span>
<span class="line"><span style="color:#24292E;">  } </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#24292E;">    hooks.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(wrappedHook) </span></span>
<span class="line"><span style="color:#24292E;">  } </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>结合代码来看，该函数主要是对用户注册的钩子函数 hook 做了一层封装，然后添加到一个数组中，把数组保存在当前组件实例的 target 上，这里，key 是用来区分钩子函数的字符串。比如， onMounted 注册的钩子函数在组件实例上就是通过 instance.m 来保存。</p><p>这样的设计其实非常好理解，因为生命周期的钩子函数，是在组件生命周期的各个阶段执行，所以钩子函数必须要保存在当前的组件实例上，这样后面就可以在组件实例上通过不同的字符串 key 找到对应的钩子函数数组并执行。</p><p>对于相同的钩子函数，会把封装的 wrappedHook 钩子函数缓存到 hook.__weh 中，这样后续通过 scheduler 方式执行的钩子函数就会被去重。</p><p>在后续执行 wrappedHook 函数时，会先停止依赖收集，因为钩子函数内部访问的响应式对象，通常都已经执行过依赖收集，所以钩子函数执行的时候没有必要再次收集依赖，毕竟这个过程也有一定的性能消耗。</p><p>接着是设置 target 为当前组件实例。在 Vue.js 的内部，会一直维护当前运行的组件实例 currentInstance，在注册钩子函数的过程中，我们可以拿到当前运行组件实例 currentInstance，并用 target 保存，然后在钩子函数执行时，为了确保此时的 currentInstance 和注册钩子函数时一致，会通过 <code>setCurrentInstance(target)</code> 设置 target 为当前组件实例。</p><p>接下来就是通过 callWithAsyncErrorHandling 方法去执行我们注册的 hook 钩子函数，函数执行完毕则设置当前运行组件实例为 null，并恢复依赖收集。</p><p>到这里，我们就了解了生命周期钩子函数是如何注册以及如何执行的，接下来，我们来依次分析各个钩子函数的执行时机和应用场景。</p><p>首先，我们来看通过 onBeforeMount 和 onMounted 注册的钩子函数。</p><h3 id="onbeforemount-和-onmounted" tabindex="-1">onBeforeMount 和 onMounted <a class="header-anchor" href="#onbeforemount-和-onmounted" aria-label="Permalink to &quot;onBeforeMount 和 onMounted&quot;">​</a></h3><p><strong>onBeforeMount 注册的 beforeMount 钩子函数会在组件挂载之前执行</strong> ，<strong>onMounted 注册的 mounted 钩子函数会在组件挂载之后执行</strong>。我们来回顾一下组件副作用渲染函数关于组件挂载部分的实现：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> setupRenderEffect </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 创建响应式的副作用渲染函数 </span></span>
<span class="line"><span style="color:#E1E4E8;">  instance.update </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">effect</span><span style="color:#E1E4E8;">(function </span><span style="color:#B392F0;">componentEffect</span><span style="color:#E1E4E8;">() { </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">instance.isMounted) { </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 获取组件实例上通过 onBeforeMount 钩子函数和 onMounted 注册的钩子函数 </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { bm, m } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> instance; </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 渲染组件生成子树 vnode </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> subTree </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (instance.subTree </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">renderComponentRoot</span><span style="color:#E1E4E8;">(instance)) </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 执行 beforemount 钩子函数 </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (bm) { </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">invokeArrayFns</span><span style="color:#E1E4E8;">(bm) </span></span>
<span class="line"><span style="color:#E1E4E8;">      } </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 把子树 vnode 挂载到 container 中 </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">patch</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">, subTree, container, anchor, instance, parentSuspense, isSVG) </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 保留渲染生成的子树根 DOM 节点 </span></span>
<span class="line"><span style="color:#E1E4E8;">      initialVNode.el </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> subTree.el </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 执行 mounted 钩子函数 </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (m) { </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">queuePostRenderEffect</span><span style="color:#E1E4E8;">(m, parentSuspense) </span></span>
<span class="line"><span style="color:#E1E4E8;">      } </span></span>
<span class="line"><span style="color:#E1E4E8;">      instance.isMounted </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 更新组件 </span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"><span style="color:#E1E4E8;">  }, prodEffectOptions) </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> setupRenderEffect </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 创建响应式的副作用渲染函数 </span></span>
<span class="line"><span style="color:#24292E;">  instance.update </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">effect</span><span style="color:#24292E;">(function </span><span style="color:#6F42C1;">componentEffect</span><span style="color:#24292E;">() { </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">instance.isMounted) { </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 获取组件实例上通过 onBeforeMount 钩子函数和 onMounted 注册的钩子函数 </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { bm, m } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> instance; </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 渲染组件生成子树 vnode </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> subTree </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (instance.subTree </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">renderComponentRoot</span><span style="color:#24292E;">(instance)) </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 执行 beforemount 钩子函数 </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (bm) { </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">invokeArrayFns</span><span style="color:#24292E;">(bm) </span></span>
<span class="line"><span style="color:#24292E;">      } </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 把子树 vnode 挂载到 container 中 </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">patch</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">null</span><span style="color:#24292E;">, subTree, container, anchor, instance, parentSuspense, isSVG) </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 保留渲染生成的子树根 DOM 节点 </span></span>
<span class="line"><span style="color:#24292E;">      initialVNode.el </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> subTree.el </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 执行 mounted 钩子函数 </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (m) { </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">queuePostRenderEffect</span><span style="color:#24292E;">(m, parentSuspense) </span></span>
<span class="line"><span style="color:#24292E;">      } </span></span>
<span class="line"><span style="color:#24292E;">      instance.isMounted </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 更新组件 </span></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"><span style="color:#24292E;">  }, prodEffectOptions) </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>在执行 patch 挂载组件之前，会检测组件实例上是有否有注册的 beforeMount 钩子函数 bm，如果有则通过 invokeArrayFns 执行它，因为用户可以通过多次执行 onBeforeMount 函数注册多个 beforeMount 钩子函数，所以这里 instance.bm 是一个数组，通过遍历这个数组来依次执行 beforeMount 钩子函数。</p><p>在执行 patch 挂载组件之后，会检查组件实例上是否有注册的 mounted 钩子函数 m，如果有的话则执行 queuePostRenderEffect，把 mounted 钩子函数推入 postFlushCbs 中，然后在整个应用 render 完毕后，同步执行 flushPostFlushCbs 函数调用 mounted 钩子函数。</p><p>我经常在社区里听到一种争论：在组件初始化阶段，对于发送一些 Ajax 异步请求的逻辑，是应该放在 created 钩子函数中，还是应该放在 mounted 钩子函数中？</p><p>其实都可以，因为 created 和 mounted 钩子函数执行的时候都能拿到组件数据，它们执行的顺序虽然有先后，但都会在一个 Tick 内执行完毕，而异步请求是有网络耗时的，其耗时远远大于一个 Tick 的时间。所以，你无论在 created 还是在 mounted 里发请求，都要等请求的响应回来，然后更新数据，再触发组件的重新渲染。</p><p>前面说过，Vue.js 2.x 中的 beforeCreate 和 created 钩子函数可以用 setup 函数替代。所以，对于组件初始化阶段发送异步请求的逻辑，放在 setup 函数中、beforeMount 钩子函数中或者 mounted 钩子函数中都可以，它们都可以拿到组件相关的数据。当然，我更推荐在 setup 函数中执行，因为从语义化的角度来看这样更合适。</p><p>不过，如果你想依赖 DOM 去做一些初始化操作，那就只能把相关逻辑放在 mounted 钩子函数中了，这样你才能拿到组件渲染后的 DOM。</p><p>对于嵌套组件，组件在挂载相关的生命周期钩子函数时，先执行父组件的 beforeMount，然后是子组件的 beforeMount，接着是子组件的 mounted ，最后执行父组件的 mounted。</p><p>接下来，我们来看通过 onBeforeUpdate 和 onUpdated 注册的钩子函数。</p><h3 id="onbeforeupdate-和-onupdated" tabindex="-1">onBeforeUpdate 和 onUpdated <a class="header-anchor" href="#onbeforeupdate-和-onupdated" aria-label="Permalink to &quot;onBeforeUpdate 和 onUpdated&quot;">​</a></h3><p><strong>onBeforeUpdate 注册的 beforeUpdate 钩子函数会在组件更新之前执行</strong> ，<strong>onUpdated 注册的 updated 钩子函数会在组件更新之后执行</strong>。我们来回顾一下组件副作用渲染函数关于组件更新的实现：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> setupRenderEffect </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 创建响应式的副作用渲染函数 </span></span>
<span class="line"><span style="color:#E1E4E8;">  instance.update </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">effect</span><span style="color:#E1E4E8;">(function </span><span style="color:#B392F0;">componentEffect</span><span style="color:#E1E4E8;">() { </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">instance.isMounted) { </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 渲染组件 </span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 更新组件 </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 获取组件实例上通过 onBeforeUpdate 钩子函数和 onUpdated 注册的钩子函数 </span></span>
<span class="line"><span style="color:#E1E4E8;">      let { next, vnode, bu, u } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> instance </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// next 表示新的组件 vnode </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (next) { </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 更新组件 vnode 节点信息 </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">updateComponentPreRender</span><span style="color:#E1E4E8;">(instance, next, optimized) </span></span>
<span class="line"><span style="color:#E1E4E8;">      } </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#E1E4E8;">        next </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> vnode </span></span>
<span class="line"><span style="color:#E1E4E8;">      } </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 渲染新的子树 vnode </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> nextTree </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">renderComponentRoot</span><span style="color:#E1E4E8;">(instance) </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 缓存旧的子树 vnode </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> prevTree </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> instance.subTree </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 更新子树 vnode </span></span>
<span class="line"><span style="color:#E1E4E8;">      instance.subTree </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> nextTree </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 执行 beforeUpdate 钩子函数 </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (bu) { </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">invokeArrayFns</span><span style="color:#E1E4E8;">(bu) </span></span>
<span class="line"><span style="color:#E1E4E8;">      } </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 组件更新核心逻辑，根据新旧子树 vnode 做 patch </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">patch</span><span style="color:#E1E4E8;">(prevTree, nextTree, </span></span>
<span class="line"><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 如果在 teleport 组件中父节点可能已经改变，所以容器直接找旧树 DOM 元素的父节点 </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">hostParentNode</span><span style="color:#E1E4E8;">(prevTree.el), </span></span>
<span class="line"><span style="color:#E1E4E8;">   </span><span style="color:#6A737D;">// 缓存更新后的 DOM 节点 </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">getNextHostNode</span><span style="color:#E1E4E8;">(prevTree), </span></span>
<span class="line"><span style="color:#E1E4E8;">        instance, </span></span>
<span class="line"><span style="color:#E1E4E8;">        parentSuspense, </span></span>
<span class="line"><span style="color:#E1E4E8;">        isSVG) </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 缓存更新后的 DOM 节点 </span></span>
<span class="line"><span style="color:#E1E4E8;">      next.el </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> nextTree.el </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 执行 updated 钩子函数 </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (u) { </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">queuePostRenderEffect</span><span style="color:#E1E4E8;">(u, parentSuspense) </span></span>
<span class="line"><span style="color:#E1E4E8;">      } </span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"><span style="color:#E1E4E8;">  }, prodEffectOptions) </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> setupRenderEffect </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 创建响应式的副作用渲染函数 </span></span>
<span class="line"><span style="color:#24292E;">  instance.update </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">effect</span><span style="color:#24292E;">(function </span><span style="color:#6F42C1;">componentEffect</span><span style="color:#24292E;">() { </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">instance.isMounted) { </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 渲染组件 </span></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 更新组件 </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 获取组件实例上通过 onBeforeUpdate 钩子函数和 onUpdated 注册的钩子函数 </span></span>
<span class="line"><span style="color:#24292E;">      let { next, vnode, bu, u } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> instance </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// next 表示新的组件 vnode </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (next) { </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 更新组件 vnode 节点信息 </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">updateComponentPreRender</span><span style="color:#24292E;">(instance, next, optimized) </span></span>
<span class="line"><span style="color:#24292E;">      } </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#24292E;">        next </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> vnode </span></span>
<span class="line"><span style="color:#24292E;">      } </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 渲染新的子树 vnode </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> nextTree </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">renderComponentRoot</span><span style="color:#24292E;">(instance) </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 缓存旧的子树 vnode </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> prevTree </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> instance.subTree </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 更新子树 vnode </span></span>
<span class="line"><span style="color:#24292E;">      instance.subTree </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> nextTree </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 执行 beforeUpdate 钩子函数 </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (bu) { </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">invokeArrayFns</span><span style="color:#24292E;">(bu) </span></span>
<span class="line"><span style="color:#24292E;">      } </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 组件更新核心逻辑，根据新旧子树 vnode 做 patch </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">patch</span><span style="color:#24292E;">(prevTree, nextTree, </span></span>
<span class="line"><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 如果在 teleport 组件中父节点可能已经改变，所以容器直接找旧树 DOM 元素的父节点 </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">hostParentNode</span><span style="color:#24292E;">(prevTree.el), </span></span>
<span class="line"><span style="color:#24292E;">   </span><span style="color:#6A737D;">// 缓存更新后的 DOM 节点 </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">getNextHostNode</span><span style="color:#24292E;">(prevTree), </span></span>
<span class="line"><span style="color:#24292E;">        instance, </span></span>
<span class="line"><span style="color:#24292E;">        parentSuspense, </span></span>
<span class="line"><span style="color:#24292E;">        isSVG) </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 缓存更新后的 DOM 节点 </span></span>
<span class="line"><span style="color:#24292E;">      next.el </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> nextTree.el </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 执行 updated 钩子函数 </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (u) { </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">queuePostRenderEffect</span><span style="color:#24292E;">(u, parentSuspense) </span></span>
<span class="line"><span style="color:#24292E;">      } </span></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"><span style="color:#24292E;">  }, prodEffectOptions) </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>在执行 patch 更新组件之前，会检测组件实例上是有否有注册的 beforeUpdate 钩子函数 bu，如果有则通过 invokeArrayFns 执行它。</p><p>在执行 patch 更新组件之后，会检查组件实例上是否有注册的 updated 钩子函数 u，如果有，则通过 queuePostRenderEffect 把 updated 钩子函数推入 postFlushCbs 中，因为组件的更新本身就是在 nextTick 后进行 flushJobs，因此此时再次执行 queuePostRenderEffect 推入到队列的任务，会在同一个 Tick 内执行这些 postFlushCbs，也就是执行所有 updated 的钩子函数。</p><p>在 beforeUpdate 钩子函数执行时，组件的 DOM 还未更新，如果你想在组件更新前访问 DOM，比如手动移除已添加的事件监听器，你可以注册这个钩子函数。</p><p>在 updated 钩子函数执行时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。如果要监听数据的改变并执行某些逻辑，最好不要使用 updated 钩子函数而用计算属性或 watcher 取而代之，因为任何数据的变化导致的组件更新都会执行 updated 钩子函数。另外注意， <strong>不要在 updated 钩子函数中更改数据，因为这样会再次触发组件更新，导致无限递归更新</strong> 。</p><p>还有，父组件的更新不一定会导致子组件的更新，因为 Vue.js 的更新粒度是组件级别的。</p><p>接下来，我们来看通过 onBeforeUnmount 和 onUnmounted 注册的钩子函数。</p><h3 id="onbeforeunmount-和-onunmounted" tabindex="-1">onBeforeUnmount 和 onUnmounted <a class="header-anchor" href="#onbeforeunmount-和-onunmounted" aria-label="Permalink to &quot;onBeforeUnmount 和 onUnmounted&quot;">​</a></h3><p><strong>onBeforeUnmount 注册的 beforeUnMount 钩子函数会在组件销毁之前执行</strong> ，onUnmounted <strong>注册的 unmounted 钩子函数会在组件销毁之后执行</strong> 。我们来看一下组件销毁相关逻辑实现：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> unmountComponent </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (instance, parentSuspense, doRemove) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { bum, effects, update, subTree, um } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> instance </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 执行 beforeUnmount 钩子函数 </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (bum) { </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">invokeArrayFns</span><span style="color:#E1E4E8;">(bum) </span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 清理组件引用的 effects 副作用函数 </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (effects) { </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (let i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> effects.length; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) { </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">stop</span><span style="color:#E1E4E8;">(effects[i]) </span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 如果一个异步组件在加载前就销毁了，则不会注册副作用渲染函数 </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (update) { </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">stop</span><span style="color:#E1E4E8;">(update) </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 调用 unmount 销毁子树 </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">unmount</span><span style="color:#E1E4E8;">(subTree, instance, parentSuspense, doRemove) </span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 执行 unmounted 钩子函数 </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (um) { </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">queuePostRenderEffect</span><span style="color:#E1E4E8;">(um, parentSuspense) </span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> unmountComponent </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (instance, parentSuspense, doRemove) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { bum, effects, update, subTree, um } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> instance </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 执行 beforeUnmount 钩子函数 </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (bum) { </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">invokeArrayFns</span><span style="color:#24292E;">(bum) </span></span>
<span class="line"><span style="color:#24292E;">  } </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 清理组件引用的 effects 副作用函数 </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (effects) { </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (let i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> effects.length; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) { </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">stop</span><span style="color:#24292E;">(effects[i]) </span></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"><span style="color:#24292E;">  } </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 如果一个异步组件在加载前就销毁了，则不会注册副作用渲染函数 </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (update) { </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">stop</span><span style="color:#24292E;">(update) </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 调用 unmount 销毁子树 </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">unmount</span><span style="color:#24292E;">(subTree, instance, parentSuspense, doRemove) </span></span>
<span class="line"><span style="color:#24292E;">  } </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 执行 unmounted 钩子函数 </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (um) { </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">queuePostRenderEffect</span><span style="color:#24292E;">(um, parentSuspense) </span></span>
<span class="line"><span style="color:#24292E;">  } </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>其实整个组件销毁的逻辑很简单，主要就是<strong>清理组件实例上绑定的 effects 副作用函数和注册的副作用渲染函数 update</strong> ，以及<strong>调用 unmount 销毁子树</strong>。</p><p>unmount 主要就是遍历子树，它会通过递归的方式来销毁子节点，遇到组件节点时执行 unmountComponent，遇到普通节点时则删除 DOM 元素。组件的销毁过程和渲染过程类似，都是递归的过程。</p><p>在组件销毁前，会检测组件实例上是有否有注册的 beforeUnmount 钩子函数 bum，如果有则通过 invokeArrayFns 执行。</p><p>在组件销毁后，会检测组件实例上是否有注册的 unmounted 钩子函数 um，如果有则通过 queuePostRenderEffect 把 unmounted 钩子函数推入到 postFlushCbs 中，因为组件的销毁就是组件更新的一个分支逻辑，所以在 nextTick 后进行 flushJobs，因此此时再次执行 queuePostRenderEffect 推入队列的任务，会在同一个 Tick 内执行这些 postFlushCbs，也就是执行所有的 unmounted 钩子函数。</p><p>对于嵌套组件，组件在执行销毁相关的生命周期钩子函数时，先执行父组件的 beforeUnmount，再执行子组件的 beforeUnmount，然后执行子组件的 unmounted ，最后执行父组件的 unmounted。</p><p>虽然组件在销毁阶段会清理一些定义的 effects 函数，删除组件内部的 DOM 元素，但是有一些需要清理的对象，组件并不能自动完成它们的清理，比如你在组件内部创建一个定时器，就应该在 beforeUnmount 或者 unmounted 钩子函数中清除，举个例子：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;{ {count}}&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">  import { ref, onBeforeUnmount } from &#39;vue&#39; </span></span>
<span class="line"><span style="color:#E1E4E8;">  export default { </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;"> () { </span></span>
<span class="line"><span style="color:#E1E4E8;">      const count </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) </span></span>
<span class="line"><span style="color:#E1E4E8;">      const timer </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">setInterval</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#E1E4E8;">        console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(count.value</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) </span></span>
<span class="line"><span style="color:#E1E4E8;">      }, </span><span style="color:#79B8FF;">1000</span><span style="color:#E1E4E8;">) </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">onBeforeUnmount</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">clearInterval</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">timer</span><span style="color:#E1E4E8;">) </span></span>
<span class="line"><span style="color:#E1E4E8;">      }) </span></span>
<span class="line"><span style="color:#E1E4E8;">      return { </span></span>
<span class="line"><span style="color:#E1E4E8;">        count </span></span>
<span class="line"><span style="color:#E1E4E8;">      } </span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;{ {count}}&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">  import { ref, onBeforeUnmount } from &#39;vue&#39; </span></span>
<span class="line"><span style="color:#24292E;">  export default { </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;"> () { </span></span>
<span class="line"><span style="color:#24292E;">      const count </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) </span></span>
<span class="line"><span style="color:#24292E;">      const timer </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">setInterval</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#24292E;">        console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(count.value</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) </span></span>
<span class="line"><span style="color:#24292E;">      }, </span><span style="color:#005CC5;">1000</span><span style="color:#24292E;">) </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">onBeforeUnmount</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">clearInterval</span><span style="color:#24292E;">(</span><span style="color:#E36209;">timer</span><span style="color:#24292E;">) </span></span>
<span class="line"><span style="color:#24292E;">      }) </span></span>
<span class="line"><span style="color:#24292E;">      return { </span></span>
<span class="line"><span style="color:#24292E;">        count </span></span>
<span class="line"><span style="color:#24292E;">      } </span></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"><span style="color:#24292E;">  } </span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>可以看到，这里我们在 setup 函数内部定义了一个 timer 计时器， count 每秒会加 1 并在控制台中输出。如果这个组件被销毁，就会触发 onBeforeUnmount 注册的 beforeUnmount 钩子函数，然后清除定时器。如果你不清除，就会发现组件销毁后，虽然 DOM 被移除了，计时器仍然存在，并且会一直计时并在控制台输出，这就造成了不必要的内存泄漏。</p><p>接下来，我们来看通过 onErrorCaptured 注册的钩子函数。</p><h3 id="onerrorcaptured" tabindex="-1">onErrorCaptured <a class="header-anchor" href="#onerrorcaptured" aria-label="Permalink to &quot;onErrorCaptured&quot;">​</a></h3><p>在前面的课时中，我们多次接触过一个方法 callWithErrorHandling，它就是执行一段函数并通过 handleError 处理错误。那么，handleError 具体做了哪些事情呢？</p><p>我们先来看一下它的实现：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function </span><span style="color:#B392F0;">handleError</span><span style="color:#E1E4E8;">(err, instance, type) { </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> contextVNode </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> instance </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> instance.vnode </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (instance) { </span></span>
<span class="line"><span style="color:#E1E4E8;">    let cur </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> instance.parent </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 为了兼容 2.x 版本，暴露组件实例给钩子函数 </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> exposedInstance </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> instance.proxy </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 获取错误信息 </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> errorInfo </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (p<wbr>rocess.env.NODE_ENV </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;production&#39;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">ErrorTypeStrings</span><span style="color:#E1E4E8;">[type] </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> type </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 尝试向上查找所有父组件，执行 errorCaptured 钩子函数 </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">while</span><span style="color:#E1E4E8;"> (cur) { </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> errorCapturedHooks </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> cur.ec </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (errorCapturedHooks) { </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (let i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> errorCapturedHooks.length; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) { </span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// 如果执行的 errorCaptured 钩子函数并返回 true，则停止向上查找。、 </span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (errorCapturedHooks[i](err, exposedInstance, errorInfo)) { </span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">          } </span></span>
<span class="line"><span style="color:#E1E4E8;">        } </span></span>
<span class="line"><span style="color:#E1E4E8;">      } </span></span>
<span class="line"><span style="color:#E1E4E8;">      cur </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> cur.parent </span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 往控制台输出未处理的错误 </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">logError</span><span style="color:#E1E4E8;">(err, type, contextVNode) </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function </span><span style="color:#6F42C1;">handleError</span><span style="color:#24292E;">(err, instance, type) { </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> contextVNode </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> instance </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> instance.vnode </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (instance) { </span></span>
<span class="line"><span style="color:#24292E;">    let cur </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> instance.parent </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 为了兼容 2.x 版本，暴露组件实例给钩子函数 </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> exposedInstance </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> instance.proxy </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 获取错误信息 </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> errorInfo </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (p<wbr>rocess.env.NODE_ENV </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;production&#39;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">ErrorTypeStrings</span><span style="color:#24292E;">[type] </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> type </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 尝试向上查找所有父组件，执行 errorCaptured 钩子函数 </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">while</span><span style="color:#24292E;"> (cur) { </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> errorCapturedHooks </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> cur.ec </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (errorCapturedHooks) { </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (let i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> errorCapturedHooks.length; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) { </span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// 如果执行的 errorCaptured 钩子函数并返回 true，则停止向上查找。、 </span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (errorCapturedHooks[i](err, exposedInstance, errorInfo)) { </span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">          } </span></span>
<span class="line"><span style="color:#24292E;">        } </span></span>
<span class="line"><span style="color:#24292E;">      } </span></span>
<span class="line"><span style="color:#24292E;">      cur </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> cur.parent </span></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"><span style="color:#24292E;">  } </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 往控制台输出未处理的错误 </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">logError</span><span style="color:#24292E;">(err, type, contextVNode) </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>handleError 的实现其实很简单，它会从当前报错的组件的父组件实例开始，尝试去查找注册的 errorCaptured 钩子函数，如果有则遍历执行并且判断 errorCaptured 钩子函数的返回值是否为 true，如果是则说明这个错误已经得到了正确的处理，就会直接结束。</p><p>否则会继续遍历，遍历完当前组件实例的 errorCaptured 钩子函数后，如果这个错误还没得到正确处理，则向上查找它的父组件实例，以同样的逻辑去查找是否有正确处理该错误的 errorCaptured 钩子函数，直到查找完毕。</p><p>如果整个链路上都没有正确处理错误的 errorCaptured 钩子函数，则通过 logError 往控制台输出未处理的错误。所以 <strong>errorCaptured 本质上是捕获一个来自子孙组件的错误</strong> ，<strong>它返回 true 就可以阻止错误继续向上传播</strong>。</p><p>errorCaptured 在平时工作中可能用的不多，但它的确是一个很实用的功能，比如你可以在根组件注册一个 errorCaptured 钩子函数，去捕获所有子孙组件的错误，并且可以根据错误的类型和信息统计和上报错误。</p><p>接下来，我们来看通过 onRenderTracked 和 onRenderTriggered 注册的钩子函数。</p><h3 id="onrendertracked-和-onrendertriggered" tabindex="-1">onRenderTracked 和 onRenderTriggered <a class="header-anchor" href="#onrendertracked-和-onrendertriggered" aria-label="Permalink to &quot;onRenderTracked 和 onRenderTriggered&quot;">​</a></h3><p>onRenderTracked 和 onRenderTriggered 是 Vue.js 3.0 新增的生命周期 API，它们是在开发阶段渲染调试用的。这里再次回顾一下我们创建的副作用渲染函数的第二个参数（这里你可以去 06 课时&quot; 响应式：响应式内部的实现原理是怎样的？ &quot;中复习一下），在开发环境下它的代码是这样的：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">instance.update </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">effect</span><span style="color:#E1E4E8;">(function </span><span style="color:#B392F0;">componentEffect</span><span style="color:#E1E4E8;">() { </span></span>
<span class="line"><span style="color:#6A737D;">// 创建或者更组件 </span></span>
<span class="line"><span style="color:#E1E4E8;">}, </span><span style="color:#B392F0;">createDevEffectOptions</span><span style="color:#E1E4E8;">(instance)) </span></span>
<span class="line"><span style="color:#E1E4E8;">function </span><span style="color:#B392F0;">createDevEffectOptions</span><span style="color:#E1E4E8;">(instance) { </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#E1E4E8;">    scheduler</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> queueJob, </span></span>
<span class="line"><span style="color:#E1E4E8;">    onTrack</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> instance.rtc </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> e </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">invokeArrayFns</span><span style="color:#E1E4E8;">(instance.rtc, e) </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">    onTrigger</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> instance.rtg </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> e </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">invokeArrayFns</span><span style="color:#E1E4E8;">(instance.rtg, e) </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">instance.update </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">effect</span><span style="color:#24292E;">(function </span><span style="color:#6F42C1;">componentEffect</span><span style="color:#24292E;">() { </span></span>
<span class="line"><span style="color:#6A737D;">// 创建或者更组件 </span></span>
<span class="line"><span style="color:#24292E;">}, </span><span style="color:#6F42C1;">createDevEffectOptions</span><span style="color:#24292E;">(instance)) </span></span>
<span class="line"><span style="color:#24292E;">function </span><span style="color:#6F42C1;">createDevEffectOptions</span><span style="color:#24292E;">(instance) { </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#24292E;">    scheduler</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> queueJob, </span></span>
<span class="line"><span style="color:#24292E;">    onTrack</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> instance.rtc </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> e </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">invokeArrayFns</span><span style="color:#24292E;">(instance.rtc, e) </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">    onTrigger</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> instance.rtg </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> e </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">invokeArrayFns</span><span style="color:#24292E;">(instance.rtg, e) </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">  } </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>通过上述代码我们发现，onRenderTracked 和 onRenderTriggered 注册的钩子函数，原来是在副作用渲染函数的 onTrack 和 onTrigger 对应的函数中执行的。</p><p>我们当时介绍 effect 副作用函数的配置时并没有介绍这两个属性，那么它们是做什么用的呢？</p><p>这就要先来看 onTrack 函数的执行时机。我们知道当访问一个响应式对象时，会执行 track 函数做依赖收集，我们来回顾一下它的实现：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function </span><span style="color:#B392F0;">track</span><span style="color:#E1E4E8;">(target, type, key) { </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 执行一些依赖收集的操作 </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">dep.</span><span style="color:#B392F0;">has</span><span style="color:#E1E4E8;">(activeEffect)) { </span></span>
<span class="line"><span style="color:#E1E4E8;">    dep.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(activeEffect) </span></span>
<span class="line"><span style="color:#E1E4E8;">    activeEffect.deps.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(dep) </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ((p<wbr>rocess.env.NODE_ENV </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;production&#39;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> activeEffect.options.onTrack) { </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 执行 onTrack 函数 </span></span>
<span class="line"><span style="color:#E1E4E8;">      activeEffect.options.</span><span style="color:#B392F0;">onTrack</span><span style="color:#E1E4E8;">({ </span></span>
<span class="line"><span style="color:#E1E4E8;">        effect</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> activeEffect, </span></span>
<span class="line"><span style="color:#E1E4E8;">        target, </span></span>
<span class="line"><span style="color:#E1E4E8;">        type, </span></span>
<span class="line"><span style="color:#E1E4E8;">        key </span></span>
<span class="line"><span style="color:#E1E4E8;">      }) </span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function </span><span style="color:#6F42C1;">track</span><span style="color:#24292E;">(target, type, key) { </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 执行一些依赖收集的操作 </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">dep.</span><span style="color:#6F42C1;">has</span><span style="color:#24292E;">(activeEffect)) { </span></span>
<span class="line"><span style="color:#24292E;">    dep.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(activeEffect) </span></span>
<span class="line"><span style="color:#24292E;">    activeEffect.deps.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(dep) </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ((p<wbr>rocess.env.NODE_ENV </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;production&#39;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> activeEffect.options.onTrack) { </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 执行 onTrack 函数 </span></span>
<span class="line"><span style="color:#24292E;">      activeEffect.options.</span><span style="color:#6F42C1;">onTrack</span><span style="color:#24292E;">({ </span></span>
<span class="line"><span style="color:#24292E;">        effect</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> activeEffect, </span></span>
<span class="line"><span style="color:#24292E;">        target, </span></span>
<span class="line"><span style="color:#24292E;">        type, </span></span>
<span class="line"><span style="color:#24292E;">        key </span></span>
<span class="line"><span style="color:#24292E;">      }) </span></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"><span style="color:#24292E;">  } </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>可以看到，track 函数先执行依赖收集，然后在非生产环境下检测当前的 activeEffect 的配置有没有定义 onTrack 函数，如果有的则执行该方法。</p><p>因此对应到副作用渲染函数，当它执行的时候，activeEffect 就是这个副作用渲染函数，这时访问响应式数据就会触发 track 函数，<strong>在执行完依赖收集后</strong> ，<strong>会执行 onTrack 函数</strong> ，<strong>也就是遍历执行我们注册的 renderTracked 钩子函数</strong>。</p><p>接下来，我们再来回顾一下 trigger 函数的实现：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function </span><span style="color:#B392F0;">trigger</span><span style="color:#E1E4E8;"> (target, type, key, newValue) { </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 添加要运行的 effects 集合 </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> run </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (effect) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ((p<wbr>rocess.env.NODE_ENV </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;production&#39;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> effect.options.onTrigger) { </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 执行 onTrigger </span></span>
<span class="line"><span style="color:#E1E4E8;">      effect.options.</span><span style="color:#B392F0;">onTrigger</span><span style="color:#E1E4E8;">({ </span></span>
<span class="line"><span style="color:#E1E4E8;">        effect, </span></span>
<span class="line"><span style="color:#E1E4E8;">        target, </span></span>
<span class="line"><span style="color:#E1E4E8;">        key, </span></span>
<span class="line"><span style="color:#E1E4E8;">        type, </span></span>
<span class="line"><span style="color:#E1E4E8;">        newValue, </span></span>
<span class="line"><span style="color:#E1E4E8;">        oldValue, </span></span>
<span class="line"><span style="color:#E1E4E8;">        oldTarget </span></span>
<span class="line"><span style="color:#E1E4E8;">      }) </span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (effect.options.scheduler) { </span></span>
<span class="line"><span style="color:#E1E4E8;">      effect.options.</span><span style="color:#B392F0;">scheduler</span><span style="color:#E1E4E8;">(effect) </span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">effect</span><span style="color:#E1E4E8;">() </span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 遍历执行 effects </span></span>
<span class="line"><span style="color:#E1E4E8;">  effects.</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">(run) </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function </span><span style="color:#6F42C1;">trigger</span><span style="color:#24292E;"> (target, type, key, newValue) { </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 添加要运行的 effects 集合 </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> run </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (effect) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ((p<wbr>rocess.env.NODE_ENV </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;production&#39;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> effect.options.onTrigger) { </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 执行 onTrigger </span></span>
<span class="line"><span style="color:#24292E;">      effect.options.</span><span style="color:#6F42C1;">onTrigger</span><span style="color:#24292E;">({ </span></span>
<span class="line"><span style="color:#24292E;">        effect, </span></span>
<span class="line"><span style="color:#24292E;">        target, </span></span>
<span class="line"><span style="color:#24292E;">        key, </span></span>
<span class="line"><span style="color:#24292E;">        type, </span></span>
<span class="line"><span style="color:#24292E;">        newValue, </span></span>
<span class="line"><span style="color:#24292E;">        oldValue, </span></span>
<span class="line"><span style="color:#24292E;">        oldTarget </span></span>
<span class="line"><span style="color:#24292E;">      }) </span></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (effect.options.scheduler) { </span></span>
<span class="line"><span style="color:#24292E;">      effect.options.</span><span style="color:#6F42C1;">scheduler</span><span style="color:#24292E;">(effect) </span></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">effect</span><span style="color:#24292E;">() </span></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"><span style="color:#24292E;">  } </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 遍历执行 effects </span></span>
<span class="line"><span style="color:#24292E;">  effects.</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">(run) </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>我们知道，trigger 函数首先要创建运行的 effects 集合，然后遍历执行，在执行的过程中，会在非生产环境下检测待执行的 effect 配置中有没有定义 onTrigger 函数，如果有则执行该方法。</p><p>因此对应到我们的副作用渲染函数，当它内部依赖的响应式对象值被修改后，就会触发 trigger 函数 ，这个时候副作用渲染函数就会被添加到要运行的 effects 集合中，<strong>在遍历执行 effects 的时候会执行 onTrigger 函数</strong> ，<strong>也就是遍历执行我们注册的 renderTriggered 钩子函数</strong>。</p><p>了解完 renderTracked 和 renderTriggered 钩子函数的执行时机后，我们来看一下实际场景的应用：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;{ {count}}&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">button</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">@click=&quot;increase&quot;&gt;Increase&lt;/button&gt;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">&lt;/div&gt;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">&lt;/div&gt;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;/template&gt;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;script&gt;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">import</span><span style="color:#E1E4E8;"> { ref, onRenderTracked, onRenderTriggered } </span><span style="color:#B392F0;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">default</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;"> () { </span></span>
<span class="line"><span style="color:#E1E4E8;">      const count </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) </span></span>
<span class="line"><span style="color:#E1E4E8;">      function </span><span style="color:#B392F0;">increase</span><span style="color:#E1E4E8;"> () { </span></span>
<span class="line"><span style="color:#E1E4E8;">        count.value</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">      } </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">onRenderTracked</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">console</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">e</span><span style="color:#E1E4E8;">) </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#FFAB70;">debugger</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">      }) </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">onRenderTriggered</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">console</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">e</span><span style="color:#E1E4E8;">) </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#FFAB70;">debugger</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">      }) </span></span>
<span class="line"><span style="color:#E1E4E8;">      return { </span></span>
<span class="line"><span style="color:#E1E4E8;">        count, </span></span>
<span class="line"><span style="color:#E1E4E8;">        increase </span></span>
<span class="line"><span style="color:#E1E4E8;">      } </span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;/script&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;{ {count}}&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">button</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">@click=&quot;increase&quot;&gt;Increase&lt;/button&gt;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">&lt;/div&gt;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">&lt;/div&gt;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;/template&gt;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;script&gt;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">import</span><span style="color:#24292E;"> { ref, onRenderTracked, onRenderTriggered } </span><span style="color:#6F42C1;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">export</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">default</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;"> () { </span></span>
<span class="line"><span style="color:#24292E;">      const count </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) </span></span>
<span class="line"><span style="color:#24292E;">      function </span><span style="color:#6F42C1;">increase</span><span style="color:#24292E;"> () { </span></span>
<span class="line"><span style="color:#24292E;">        count.value</span><span style="color:#D73A49;">++</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">      } </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">onRenderTracked</span><span style="color:#24292E;">((</span><span style="color:#E36209;">e</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">console</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">e</span><span style="color:#24292E;">) </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#E36209;">debugger</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">      }) </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">onRenderTriggered</span><span style="color:#24292E;">((</span><span style="color:#E36209;">e</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">console</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">e</span><span style="color:#24292E;">) </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#E36209;">debugger</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">      }) </span></span>
<span class="line"><span style="color:#24292E;">      return { </span></span>
<span class="line"><span style="color:#24292E;">        count, </span></span>
<span class="line"><span style="color:#24292E;">        increase </span></span>
<span class="line"><span style="color:#24292E;">      } </span></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"><span style="color:#24292E;">  } </span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;/script&gt;</span></span></code></pre></div><p><strong>像这样</strong>在开发阶段，我们可以通过注册这两个钩子函数，来追踪组件渲染的依赖来源以及触发组件重新渲染的数据更新来源。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>好的，到这里我们这一节的学习就结束啦，通过学习，你应该掌握 Vue.js 中生命周期注册的 API，了解各个生命周期的执行时机和应用场景。</p><p>最后，我们通过一张图再来直观地感受一下组件的各个生命周期：</p>`,90),E=s("p",null,"Vue.js 3.0 还有 2 个生命周期 API，分别是 onActivated 和 onDeactivated，我们将会在介绍 KeepAlive 组件时详细分析。",-1),y=s("p",null,"最后，给你留一道思考题目，如果你想在路由组件切换的时候，取消组件正在发送的异步 Ajax 请求，那你应该在哪个生命周期写这个逻辑呢？欢迎你在留言区与我分享。",-1),i=s("blockquote",null,[s("p",null,[s("strong",null,"本节课的相关代码在源代码中的位置如下：")]),s("p",null,"packages/runtime-core/src/apiLifecycle.ts"),s("p",null,"packages/runtime-core/src/renderer.ts"),s("p",null,"packages/reactivity/src/effect.ts")],-1);function d(u,F,f,g,D,A){const n=p("Image");return l(),o("div",null,[r,e(n,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/40/C1/Ciqc1F8zkvmAR_QpAAJxUtKU_4s942.png"}),E,y,i])}const k=a(c,[["render",d]]);export{v as __pageData,k as default};
