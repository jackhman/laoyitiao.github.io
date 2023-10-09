import{_ as a,j as l,o as p,h as o,k as e,f as t,Q as s}from"./chunks/framework.d3daa342.js";const A=JSON.parse('{"title":"06响应式：响应式内部的实现原理是怎样的？（下）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Vue.js 3.0 核心源码内参_文档/(7637) 06  响应式：响应式内部的实现原理是怎样的？（下）.md","filePath":"posts/frontEnd/Vue.js 3.0 核心源码内参_文档/(7637) 06  响应式：响应式内部的实现原理是怎样的？（下）.md","lastUpdated":1696682708000}'),c={name:"posts/frontEnd/Vue.js 3.0 核心源码内参_文档/(7637) 06  响应式：响应式内部的实现原理是怎样的？（下）.md"},r=s(`<h1 id="_06响应式-响应式内部的实现原理是怎样的-下" tabindex="-1">06响应式：响应式内部的实现原理是怎样的？（下） <a class="header-anchor" href="#_06响应式-响应式内部的实现原理是怎样的-下" aria-label="Permalink to &quot;06响应式：响应式内部的实现原理是怎样的？（下）&quot;">​</a></h1><p>上节课，我们讲到了在 Vue.js 3.0 中引入 reactive API，它可以把对象数据变成响应式，所以我们着重分析 reactive API 的实现原理，并学习了收集依赖的 get 函数， 这节课我们继续来分析 reactive API 中需要关注的另一个内容------派发通知的过程。</p><h3 id="reactive-api" tabindex="-1">reactive API <a class="header-anchor" href="#reactive-api" aria-label="Permalink to &quot;reactive API&quot;">​</a></h3><h4 id="派发通知-set-函数" tabindex="-1">派发通知：set 函数 <a class="header-anchor" href="#派发通知-set-函数" aria-label="Permalink to &quot;派发通知：set 函数&quot;">​</a></h4><p><strong>派发通知发生在数据更新的阶段</strong> ，由于我们用 Proxy API 劫持了数据对象，所以当这个响应式对象属性更新的时候就会执行 set 函数。我们来看一下 set 函数的实现，它是执行 createSetter 函数的返回值：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function </span><span style="color:#B392F0;">createSetter</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> function </span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">(target, key, value, receiver) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> oldValue </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> target[key]</span></span>
<span class="line"><span style="color:#E1E4E8;">    value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">toRaw</span><span style="color:#E1E4E8;">(value)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> hadKey </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">hasOwn</span><span style="color:#E1E4E8;">(target, key)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> result </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Reflect.</span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">(target, key, value, receiver)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 如果目标的原型链也是一个 proxy，通过 Reflect.set 修改原型链上的属性会再次触发 setter，这种情况下就没必要触发两次 trigger 了</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (target </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">toRaw</span><span style="color:#E1E4E8;">(receiver)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">hadKey) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">trigger</span><span style="color:#E1E4E8;">(target, </span><span style="color:#9ECBFF;">&quot;add&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">/* ADD */</span><span style="color:#E1E4E8;">, key, value)</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">hasChanged</span><span style="color:#E1E4E8;">(value, oldValue)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">trigger</span><span style="color:#E1E4E8;">(target, </span><span style="color:#9ECBFF;">&quot;set&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">/* SET */</span><span style="color:#E1E4E8;">, key, value, oldValue)</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> result</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function </span><span style="color:#6F42C1;">createSetter</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> function </span><span style="color:#6F42C1;">set</span><span style="color:#24292E;">(target, key, value, receiver) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> oldValue </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> target[key]</span></span>
<span class="line"><span style="color:#24292E;">    value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">toRaw</span><span style="color:#24292E;">(value)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> hadKey </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">hasOwn</span><span style="color:#24292E;">(target, key)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> result </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Reflect.</span><span style="color:#6F42C1;">set</span><span style="color:#24292E;">(target, key, value, receiver)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 如果目标的原型链也是一个 proxy，通过 Reflect.set 修改原型链上的属性会再次触发 setter，这种情况下就没必要触发两次 trigger 了</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (target </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">toRaw</span><span style="color:#24292E;">(receiver)) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">hadKey) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">trigger</span><span style="color:#24292E;">(target, </span><span style="color:#032F62;">&quot;add&quot;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">/* ADD */</span><span style="color:#24292E;">, key, value)</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#6F42C1;">hasChanged</span><span style="color:#24292E;">(value, oldValue)) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">trigger</span><span style="color:#24292E;">(target, </span><span style="color:#032F62;">&quot;set&quot;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">/* SET */</span><span style="color:#24292E;">, key, value, oldValue)</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> result</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>结合上述代码来看，set 函数的实现逻辑很简单，主要就做两件事情， <strong>首先通过 Reflect.set 求值</strong> ， <strong>然后通过 trigger 函数派发通知</strong> ，并依据 key 是否存在于 target 上来确定通知类型，即新增还是修改。</p><p>整个 set 函数最核心的部分就是 <strong>执行 trigger 函数派发通知</strong> ，下面我们将重点分析这个过程。</p><p>我们先来看一下 trigger 函数的实现，为了分析主要流程，这里省略了 trigger 函数中的一些分支逻辑：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 原始数据对象 map</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> targetMap </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">WeakMap</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">function trigger(target, type, key, newValue) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 通过 targetMap 拿到 target 对应的依赖集合</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> depsMap </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> targetMap.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(target)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">depsMap) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 没有依赖，直接返回</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 创建运行的 effects 集合</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> effects </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Set</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 添加 effects 的函数</span></span>
<span class="line"><span style="color:#E1E4E8;">  const add </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (effectsToAdd) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (effectsToAdd) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      effectsToAdd.</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">(effect </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        effects.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(effect)</span></span>
<span class="line"><span style="color:#E1E4E8;">      })</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// SET | ADD | DELETE 操作之一，添加对应的 effects</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (key </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(depsMap.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(key))</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> run </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (effect) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 调度执行</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (effect.options.scheduler) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      effect.options.</span><span style="color:#B392F0;">scheduler</span><span style="color:#E1E4E8;">(effect)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 直接运行</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">effect</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 遍历执行 effects</span></span>
<span class="line"><span style="color:#E1E4E8;">  effects.</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">(run)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 原始数据对象 map</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> targetMap </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">WeakMap</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">function trigger(target, type, key, newValue) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 通过 targetMap 拿到 target 对应的依赖集合</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> depsMap </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> targetMap.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(target)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">depsMap) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 没有依赖，直接返回</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 创建运行的 effects 集合</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> effects </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Set</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 添加 effects 的函数</span></span>
<span class="line"><span style="color:#24292E;">  const add </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (effectsToAdd) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (effectsToAdd) {</span></span>
<span class="line"><span style="color:#24292E;">      effectsToAdd.</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">(effect </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        effects.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(effect)</span></span>
<span class="line"><span style="color:#24292E;">      })</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// SET | ADD | DELETE 操作之一，添加对应的 effects</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (key </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(depsMap.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(key))</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> run </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (effect) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 调度执行</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (effect.options.scheduler) {</span></span>
<span class="line"><span style="color:#24292E;">      effect.options.</span><span style="color:#6F42C1;">scheduler</span><span style="color:#24292E;">(effect)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 直接运行</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">effect</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 遍历执行 effects</span></span>
<span class="line"><span style="color:#24292E;">  effects.</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">(run)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>trigger 函数的实现也很简单，主要做了四件事情：</p><ol><li><p>通过 targetMap 拿到 target 对应的依赖集合 depsMap；</p></li><li><p>创建运行的 effects 集合；</p></li><li><p>根据 key 从 depsMap 中找到对应的 effects 添加到 effects 集合；</p></li><li><p>遍历 effects 执行相关的副作用函数。</p></li></ol><p>所以每次 trigger 函数就是根据 target 和 key ，从 targetMap 中找到相关的所有副作用函数遍历执行一遍。</p><p>在描述依赖收集和派发通知的过程中，我们都提到了一个词：副作用函数，依赖收集过程中我们把 activeEffect（当前激活副作用函数）作为依赖收集，它又是什么？接下来我们来看一下副作用函数的庐山真面目。</p><h4 id="副作用函数" tabindex="-1">副作用函数 <a class="header-anchor" href="#副作用函数" aria-label="Permalink to &quot;副作用函数&quot;">​</a></h4><p>介绍副作用函数前，我们先回顾一下响应式的原始需求，即我们修改了数据就能自动执行某个函数，举个简单的例子：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { reactive } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">const</span><span style="color:#E1E4E8;"> counter = reactive({</span></span>
<span class="line"><span style="color:#E1E4E8;">  num: </span><span style="color:#FDAEB7;font-style:italic;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#E1E4E8;">function logCount() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.log(counter.num)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">function count() {</span></span>
<span class="line"><span style="color:#E1E4E8;">  counter.num++</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">logCount()</span></span>
<span class="line"><span style="color:#E1E4E8;">count()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { reactive } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">const</span><span style="color:#24292E;"> counter = reactive({</span></span>
<span class="line"><span style="color:#24292E;">  num: </span><span style="color:#B31D28;font-style:italic;">0</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#24292E;">function logCount() {</span></span>
<span class="line"><span style="color:#24292E;">  console.log(counter.num)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">function count() {</span></span>
<span class="line"><span style="color:#24292E;">  counter.num++</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">logCount()</span></span>
<span class="line"><span style="color:#24292E;">count()</span></span></code></pre></div><p>可以看到，这里我们定义了响应式对象 counter，然后我们在 logCount 中访问了 counter.num，我们希望通过执行 count 函数修改 counter.num 值的时候，能自动执行 logCount 函数。</p><p>按我们之前对依赖收集过程的分析，如果这个 logCount 就是 activeEffect 的话，那么就可以实现需求，但显然是做不到的，因为代码在执行到 <code>console.log(counter.num)</code>这一行 的时候，它对自己在 logCount 函数中的运行是一无所知的。</p><p>那么该怎么办呢？其实只要我们运行 logCount 函数前，把 logCount 赋值给 activeEffect 就好了，如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">activeEffect </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> logCount </span></span>
<span class="line"><span style="color:#B392F0;">logCount</span><span style="color:#E1E4E8;">()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">activeEffect </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> logCount </span></span>
<span class="line"><span style="color:#6F42C1;">logCount</span><span style="color:#24292E;">()</span></span></code></pre></div><p>顺着这个思路，我们可以利用高阶函数的思想，对 logCount 做一层封装，如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function </span><span style="color:#B392F0;">wrapper</span><span style="color:#E1E4E8;">(fn) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> wrapped </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">function</span><span style="color:#E1E4E8;">(...args) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    activeEffect </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> fn</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">fn</span><span style="color:#E1E4E8;">(...args)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> wrapped</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> wrappedLog </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">wrapper</span><span style="color:#E1E4E8;">(logCount)</span></span>
<span class="line"><span style="color:#B392F0;">wrappedLog</span><span style="color:#E1E4E8;">()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function </span><span style="color:#6F42C1;">wrapper</span><span style="color:#24292E;">(fn) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> wrapped </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">function</span><span style="color:#24292E;">(...args) {</span></span>
<span class="line"><span style="color:#24292E;">    activeEffect </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> fn</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">fn</span><span style="color:#24292E;">(...args)</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> wrapped</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> wrappedLog </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">wrapper</span><span style="color:#24292E;">(logCount)</span></span>
<span class="line"><span style="color:#6F42C1;">wrappedLog</span><span style="color:#24292E;">()</span></span></code></pre></div><p>这里，wrapper 本身也是一个函数，它接受 fn 作为参数，返回一个新的函数 wrapped，然后维护一个全局的 activeEffect，当 wrapped 执行的时候，把 activeEffect 设置为 fn，然后执行 fn 即可。</p><p>这样当我们执行 wrappedLog 后，再去修改 counter.num，就会自动执行 logCount 函数了。</p><p>实际上 Vue.js 3.0 就是采用类似的做法，在它内部就有一个 effect 副作用函数，我们来看一下它的实现：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 全局 effect 栈</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> effectStack </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> []</span></span>
<span class="line"><span style="color:#6A737D;">// 当前激活的 effect</span></span>
<span class="line"><span style="color:#E1E4E8;">let activeEffect</span></span>
<span class="line"><span style="color:#E1E4E8;">function </span><span style="color:#B392F0;">effect</span><span style="color:#E1E4E8;">(fn, options </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> EMPTY_OBJ) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">isEffect</span><span style="color:#E1E4E8;">(fn)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 如果 fn 已经是一个 effect 函数了，则指向原始函数</span></span>
<span class="line"><span style="color:#E1E4E8;">    fn </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> fn.raw</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 创建一个 wrapper，它是一个响应式的副作用的函数</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> effect </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createReactiveEffect</span><span style="color:#E1E4E8;">(fn, options)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">options.lazy) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// lazy 配置，计算属性会用到，非 lazy 则直接执行一次</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">effect</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> effect</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">function </span><span style="color:#B392F0;">createReactiveEffect</span><span style="color:#E1E4E8;">(fn, options) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> effect </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> function </span><span style="color:#B392F0;">reactiveEffect</span><span style="color:#E1E4E8;">(...args) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">effect.active) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 非激活状态，则判断如果非调度执行，则直接执行原始函数。</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> options.scheduler </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> undefined </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fn</span><span style="color:#E1E4E8;">(...args)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">effectStack.</span><span style="color:#B392F0;">includes</span><span style="color:#E1E4E8;">(effect)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 清空 effect 引用的依赖</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">cleanup</span><span style="color:#E1E4E8;">(effect)</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 开启全局 shouldTrack，允许依赖收集</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">enableTracking</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 压栈</span></span>
<span class="line"><span style="color:#E1E4E8;">        effectStack.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(effect)</span></span>
<span class="line"><span style="color:#E1E4E8;">        activeEffect </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> effect</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 执行原始函数</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fn</span><span style="color:#E1E4E8;">(...args)</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">finally</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 出栈</span></span>
<span class="line"><span style="color:#E1E4E8;">        effectStack.</span><span style="color:#B392F0;">pop</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 恢复 shouldTrack 开启之前的状态</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">resetTracking</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 指向栈最后一个 effect</span></span>
<span class="line"><span style="color:#E1E4E8;">        activeEffect </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> effectStack[effectStack.length </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  effect.id </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> uid</span><span style="color:#F97583;">++</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 标识是一个 effect 函数</span></span>
<span class="line"><span style="color:#E1E4E8;">  effect._isEffect </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// effect 自身的状态</span></span>
<span class="line"><span style="color:#E1E4E8;">  effect.active </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 包装的原始函数</span></span>
<span class="line"><span style="color:#E1E4E8;">  effect.raw </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> fn</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// effect 对应的依赖，双向指针，依赖包含对 effect 的引用，effect 也包含对依赖的引用</span></span>
<span class="line"><span style="color:#E1E4E8;">  effect.deps </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> []</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// effect 的相关配置</span></span>
<span class="line"><span style="color:#E1E4E8;">  effect.options </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> options</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> effect</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 全局 effect 栈</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> effectStack </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> []</span></span>
<span class="line"><span style="color:#6A737D;">// 当前激活的 effect</span></span>
<span class="line"><span style="color:#24292E;">let activeEffect</span></span>
<span class="line"><span style="color:#24292E;">function </span><span style="color:#6F42C1;">effect</span><span style="color:#24292E;">(fn, options </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> EMPTY_OBJ) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#6F42C1;">isEffect</span><span style="color:#24292E;">(fn)) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 如果 fn 已经是一个 effect 函数了，则指向原始函数</span></span>
<span class="line"><span style="color:#24292E;">    fn </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> fn.raw</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 创建一个 wrapper，它是一个响应式的副作用的函数</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> effect </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createReactiveEffect</span><span style="color:#24292E;">(fn, options)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">options.lazy) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// lazy 配置，计算属性会用到，非 lazy 则直接执行一次</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">effect</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> effect</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">function </span><span style="color:#6F42C1;">createReactiveEffect</span><span style="color:#24292E;">(fn, options) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> effect </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> function </span><span style="color:#6F42C1;">reactiveEffect</span><span style="color:#24292E;">(...args) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">effect.active) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 非激活状态，则判断如果非调度执行，则直接执行原始函数。</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> options.scheduler </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> undefined </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fn</span><span style="color:#24292E;">(...args)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">effectStack.</span><span style="color:#6F42C1;">includes</span><span style="color:#24292E;">(effect)) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 清空 effect 引用的依赖</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">cleanup</span><span style="color:#24292E;">(effect)</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 开启全局 shouldTrack，允许依赖收集</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">enableTracking</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 压栈</span></span>
<span class="line"><span style="color:#24292E;">        effectStack.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(effect)</span></span>
<span class="line"><span style="color:#24292E;">        activeEffect </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> effect</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 执行原始函数</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fn</span><span style="color:#24292E;">(...args)</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">finally</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 出栈</span></span>
<span class="line"><span style="color:#24292E;">        effectStack.</span><span style="color:#6F42C1;">pop</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 恢复 shouldTrack 开启之前的状态</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">resetTracking</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 指向栈最后一个 effect</span></span>
<span class="line"><span style="color:#24292E;">        activeEffect </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> effectStack[effectStack.length </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  effect.id </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> uid</span><span style="color:#D73A49;">++</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 标识是一个 effect 函数</span></span>
<span class="line"><span style="color:#24292E;">  effect._isEffect </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// effect 自身的状态</span></span>
<span class="line"><span style="color:#24292E;">  effect.active </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 包装的原始函数</span></span>
<span class="line"><span style="color:#24292E;">  effect.raw </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> fn</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// effect 对应的依赖，双向指针，依赖包含对 effect 的引用，effect 也包含对依赖的引用</span></span>
<span class="line"><span style="color:#24292E;">  effect.deps </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> []</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// effect 的相关配置</span></span>
<span class="line"><span style="color:#24292E;">  effect.options </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> options</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> effect</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>结合上述代码来看，effect 内部通过执行 createReactiveEffect 函数去创建一个新的 effect 函数，为了和外部的 effect 函数区分，我们把它称作 reactiveEffect 函数，并且还给它添加了一些额外属性（我在注释中都有标明）。另外，effect 函数还支持传入一个配置参数以支持更多的 feature，我们这里就不展开了，在后续的章节会详细分析。</p><p>接着说，这个 reactiveEffect 函数就是响应式的副作用函数，当执行 trigger 过程派发通知的时候，执行的 effect 就是它。</p><p>按我们之前的分析，这个 reactiveEffect 函数只需要做两件事情： <strong>把全局的 activeEffect 指向它</strong> ， <strong>然后执行被包装的原始函数 fn 即可</strong> 。</p><p>但实际上它的实现要更复杂一些，首先它会判断 effect 的状态是否是 active，这其实是一种控制手段，允许在非 active 状态且非调度执行情况，则直接执行原始函数 fn 并返回，在后续学习完侦听器后你会对它的理解更加深刻。</p><p>接着判断 effectStack 中是否包含 effect，如果没有就把 effect 压入栈内。之前我们提到，只要设置 activeEffect = effect 即可，那么这里为什么要设计一个栈的结构呢？</p><p>其实是考虑到以下这样一个嵌套 effect 的场景：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { reactive} from &#39;vue&#39; </span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">import</span><span style="color:#E1E4E8;"> { effect } from &#39;@vue/reactivity&#39; </span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">const</span><span style="color:#E1E4E8;"> counter = reactive({ </span></span>
<span class="line"><span style="color:#E1E4E8;">num: </span><span style="color:#FDAEB7;font-style:italic;">0</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">num2: </span><span style="color:#FDAEB7;font-style:italic;">0</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">}) </span></span>
<span class="line"><span style="color:#E1E4E8;">function logCount() { </span></span>
<span class="line"><span style="color:#E1E4E8;">effect(logCount2) </span></span>
<span class="line"><span style="color:#E1E4E8;">console.log(&#39;num:&#39;, counter.num) </span></span>
<span class="line"><span style="color:#E1E4E8;">} </span></span>
<span class="line"><span style="color:#E1E4E8;">function count() { </span></span>
<span class="line"><span style="color:#E1E4E8;">counter.num++ </span></span>
<span class="line"><span style="color:#E1E4E8;">} </span></span>
<span class="line"><span style="color:#E1E4E8;">function logCount2() { </span></span>
<span class="line"><span style="color:#E1E4E8;">console.log(&#39;num2:&#39;, counter.num2) </span></span>
<span class="line"><span style="color:#E1E4E8;">} </span></span>
<span class="line"><span style="color:#E1E4E8;">effect(logCount) </span></span>
<span class="line"><span style="color:#E1E4E8;">count()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { reactive} from &#39;vue&#39; </span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">import</span><span style="color:#24292E;"> { effect } from &#39;@vue/reactivity&#39; </span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">const</span><span style="color:#24292E;"> counter = reactive({ </span></span>
<span class="line"><span style="color:#24292E;">num: </span><span style="color:#B31D28;font-style:italic;">0</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">num2: </span><span style="color:#B31D28;font-style:italic;">0</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">}) </span></span>
<span class="line"><span style="color:#24292E;">function logCount() { </span></span>
<span class="line"><span style="color:#24292E;">effect(logCount2) </span></span>
<span class="line"><span style="color:#24292E;">console.log(&#39;num:&#39;, counter.num) </span></span>
<span class="line"><span style="color:#24292E;">} </span></span>
<span class="line"><span style="color:#24292E;">function count() { </span></span>
<span class="line"><span style="color:#24292E;">counter.num++ </span></span>
<span class="line"><span style="color:#24292E;">} </span></span>
<span class="line"><span style="color:#24292E;">function logCount2() { </span></span>
<span class="line"><span style="color:#24292E;">console.log(&#39;num2:&#39;, counter.num2) </span></span>
<span class="line"><span style="color:#24292E;">} </span></span>
<span class="line"><span style="color:#24292E;">effect(logCount) </span></span>
<span class="line"><span style="color:#24292E;">count()</span></span></code></pre></div><p>我们每次执行 effect 函数时，如果仅仅把 reactiveEffect 函数赋值给 activeEffect，那么针对这种嵌套场景，执行完 effect(logCount2) 后，activeEffect 还是 effect(logCount2) 返回的 reactiveEffect 函数，这样后续访问 counter.num 的时候，依赖收集对应的 activeEffect 就不对了，此时我们外部执行 count 函数修改 counter.num 后执行的便不是 logCount 函数，而是 logCount2 函数，最终输出的结果如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">num2</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">num</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">num2</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">num2</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">num</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">num2</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span></code></pre></div><p>而我们期望的结果应该如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">num2</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">num</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">num2</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">num</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">num2</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">num</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">num2</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">num</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span></code></pre></div><p>因此针对嵌套 effect 的场景，我们不能简单地赋值 activeEffect，应该考虑到函数的执行本身就是一种入栈出栈操作，因此我们也可以设计一个 effectStack，这样每次进入 reactiveEffect 函数就先把它入栈，然后 activeEffect 指向这个 reactiveEffect 函数，接着在 fn 执行完毕后出栈，再把 activeEffect 指向 effectStack 最后一个元素，也就是外层 effect 函数对应的 reactiveEffect。</p><p>这里我们还注意到一个细节，<strong>在入栈前会执行 cleanup 函数清空 reactiveEffect 函数对应的依赖</strong> 。在执行 track 函数的时候，除了收集当前激活的 effect 作为依赖，还通过 activeEffect.deps.push(dep) 把 dep 作为 activeEffect 的依赖，这样在 cleanup 的时候我们就可以找到 effect 对应的 dep 了，然后把 effect 从这些 dep 中删除。cleanup 函数的代码如下所示：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function </span><span style="color:#B392F0;">cleanup</span><span style="color:#E1E4E8;">(effect) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { deps } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> effect</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (deps.length) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> (let i </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">; i </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;"> deps.length; i</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      deps[i].</span><span style="color:#B392F0;">delete</span><span style="color:#E1E4E8;">(effect)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    deps.length </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function </span><span style="color:#6F42C1;">cleanup</span><span style="color:#24292E;">(effect) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { deps } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> effect</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (deps.length) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> (let i </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">; i </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;"> deps.length; i</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      deps[i].</span><span style="color:#6F42C1;">delete</span><span style="color:#24292E;">(effect)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    deps.length </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>为什么需要 cleanup 呢？如果遇到这种场景：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">v-if</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;state.showMsg&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    { { state.msg }}</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">v-else</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    { { Math.random()}}</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">button</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">@click=&quot;toggle&quot;&gt;Toggle</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">Msg&lt;/button&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">&lt;button</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">@click=&quot;switchView&quot;&gt;Switch</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">View&lt;/button&gt;</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;script&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">import</span><span style="color:#E1E4E8;"> { reactive } </span><span style="color:#B392F0;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">      const state </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">reactive</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">        msg: </span><span style="color:#9ECBFF;">&#39;Hello World&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        showMsg: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">      })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      function </span><span style="color:#B392F0;">toggle</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        state.msg </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> state.msg </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;Hello World&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;Hello Vue&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;Hello World&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      function </span><span style="color:#B392F0;">switchView</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        state.showMsg </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">state.showMsg</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">      return {</span></span>
<span class="line"><span style="color:#E1E4E8;">        toggle,</span></span>
<span class="line"><span style="color:#E1E4E8;">        switchView,</span></span>
<span class="line"><span style="color:#E1E4E8;">        state</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;/script&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">v-if</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;state.showMsg&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    { { state.msg }}</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">v-else</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    { { Math.random()}}</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">button</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">@click=&quot;toggle&quot;&gt;Toggle</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">Msg&lt;/button&gt;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">&lt;button</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">@click=&quot;switchView&quot;&gt;Switch</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">View&lt;/button&gt;</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;script&gt;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">import</span><span style="color:#24292E;"> { reactive } </span><span style="color:#6F42C1;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">export</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">      const state </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">reactive</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">        msg: </span><span style="color:#032F62;">&#39;Hello World&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        showMsg: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">      })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      function </span><span style="color:#6F42C1;">toggle</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        state.msg </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> state.msg </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;Hello World&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;Hello Vue&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;Hello World&#39;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      function </span><span style="color:#6F42C1;">switchView</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">        state.showMsg </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">state.showMsg</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">      return {</span></span>
<span class="line"><span style="color:#24292E;">        toggle,</span></span>
<span class="line"><span style="color:#24292E;">        switchView,</span></span>
<span class="line"><span style="color:#24292E;">        state</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;/script&gt;</span></span></code></pre></div><p>结合代码可以知道，这个组件的视图会根据 showMsg 变量的控制显示 msg 或者一个随机数，当我们点击 Switch View 的按钮时，就会修改这个变量值。</p><p>假设没有 cleanup，在第一次渲染模板的时候，activeEffect 是组件的副作用渲染函数，因为模板 render 的时候访问了 state.msg，所以会执行依赖收集，把副作用渲染函数作为 state.msg 的依赖，我们把它称作 render effect。然后我们点击 Switch View 按钮，视图切换为显示随机数，此时我们再点击 Toggle Msg 按钮，由于修改了 state.msg 就会派发通知，找到了 render effect 并执行，就又触发了组件的重新渲染。</p><p>但这个行为实际上并不符合预期，因为当我们点击 Switch View 按钮，视图切换为显示随机数的时候，也会触发组件的重新渲染，但这个时候视图并没有渲染 state.msg，所以对它的改动并不应该影响组件的重新渲染。</p><p>因此在组件的 render effect 执行之前，如果通过 cleanup 清理依赖，我们就可以删除之前 state.msg 收集的 render effect 依赖。这样当我们修改 state.msg 时，由于已经没有依赖了就不会触发组件的重新渲染，符合预期。</p><p>至此，我们从 reactive API 入手了解了整个响应式对象的实现原理。除了 reactive API，Vue.js 3.0 还提供了其他好用的响应式 API，接下来我们一起分析一些常用的。</p><h3 id="readonly-api" tabindex="-1">readonly API <a class="header-anchor" href="#readonly-api" aria-label="Permalink to &quot;readonly API&quot;">​</a></h3><p>如果用 const 声明一个对象变量，虽然不能直接对这个变量赋值，但我们可以修改它的属。如果我们希望创建只读对象，不能修改它的属性，也不能给这个对象添加和删除属性，让它变成一个真正意义上的只读对象。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> original </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  foo</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> wrapped </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">readonly</span><span style="color:#E1E4E8;">(original)</span></span>
<span class="line"><span style="color:#E1E4E8;">wrapped.foo </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2</span></span>
<span class="line"><span style="color:#6A737D;">// warn: Set operation on key &quot;foo&quot; failed: target is readonly.</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> original </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  foo</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> wrapped </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">readonly</span><span style="color:#24292E;">(original)</span></span>
<span class="line"><span style="color:#24292E;">wrapped.foo </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2</span></span>
<span class="line"><span style="color:#6A737D;">// warn: Set operation on key &quot;foo&quot; failed: target is readonly.</span></span></code></pre></div><p>显然，想实现上述需求就需要劫持对象，于是 Vue.js 3.0 在 reactive API 的基础上，设计并实现了 readonly API。</p><p>我们先来看一下 readonly 的实现：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function </span><span style="color:#B392F0;">readonly</span><span style="color:#E1E4E8;">(target) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createReactiveObject</span><span style="color:#E1E4E8;">(target, </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">, readonlyHandlers, readonlyCollectionHandlers)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">function </span><span style="color:#B392F0;">createReactiveObject</span><span style="color:#E1E4E8;">(target, isReadonly, baseHandlers, collectionHandlers) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#B392F0;">isObject</span><span style="color:#E1E4E8;">(target)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 目标必须是对象或数组类型</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ((p<wbr>rocess.env.NODE_ENV </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;production&#39;</span><span style="color:#E1E4E8;">)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      console.</span><span style="color:#B392F0;">warn</span><span style="color:#E1E4E8;">(\`value cannot be made reactive</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> \${</span><span style="color:#B392F0;">String</span><span style="color:#E1E4E8;">(target)}\`)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> target</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (target.__v_raw </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">(isReadonly </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> target.__v_isReactive)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// target 已经是 Proxy 对象，直接返回</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 有个例外，如果是 readonly 作用于一个响应式对象，则继续</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> target</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">hasOwn</span><span style="color:#E1E4E8;">(target, isReadonly </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;__v_readonly&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">/* readonly */</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;__v_reactive&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">/* reactive */</span><span style="color:#E1E4E8;">)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// target 已经有对应的 Proxy 了</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> isReadonly </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> target.__v_readonly </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> target.__v_reactive</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 只有在白名单里的数据类型才能变成响应式</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#B392F0;">canObserve</span><span style="color:#E1E4E8;">(target)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> target</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 利用 Proxy 创建响应式</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> observed </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Proxy</span><span style="color:#E1E4E8;">(target, collectionTypes.</span><span style="color:#B392F0;">has</span><span style="color:#E1E4E8;">(target.constructor) </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> collectionHandlers </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> baseHandlers)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 给原始数据打个标识，说明它已经变成响应式，并且有对应的 Proxy 了</span></span>
<span class="line"><span style="color:#E1E4E8;">  def(target, isReadonly </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;__v_readonly&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">/* readonly */</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;__v_reactive&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">/* reactive */</span><span style="color:#E1E4E8;">, observed)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> observed</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function </span><span style="color:#6F42C1;">readonly</span><span style="color:#24292E;">(target) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createReactiveObject</span><span style="color:#24292E;">(target, </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">, readonlyHandlers, readonlyCollectionHandlers)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">function </span><span style="color:#6F42C1;">createReactiveObject</span><span style="color:#24292E;">(target, isReadonly, baseHandlers, collectionHandlers) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#6F42C1;">isObject</span><span style="color:#24292E;">(target)) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 目标必须是对象或数组类型</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ((p<wbr>rocess.env.NODE_ENV </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;production&#39;</span><span style="color:#24292E;">)) {</span></span>
<span class="line"><span style="color:#24292E;">      console.</span><span style="color:#6F42C1;">warn</span><span style="color:#24292E;">(\`value cannot be made reactive</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> \${</span><span style="color:#6F42C1;">String</span><span style="color:#24292E;">(target)}\`)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> target</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (target.__v_raw </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">(isReadonly </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> target.__v_isReactive)) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// target 已经是 Proxy 对象，直接返回</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 有个例外，如果是 readonly 作用于一个响应式对象，则继续</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> target</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#6F42C1;">hasOwn</span><span style="color:#24292E;">(target, isReadonly </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;__v_readonly&quot;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">/* readonly */</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;__v_reactive&quot;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">/* reactive */</span><span style="color:#24292E;">)) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// target 已经有对应的 Proxy 了</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> isReadonly </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> target.__v_readonly </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> target.__v_reactive</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 只有在白名单里的数据类型才能变成响应式</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#6F42C1;">canObserve</span><span style="color:#24292E;">(target)) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> target</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 利用 Proxy 创建响应式</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> observed </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Proxy</span><span style="color:#24292E;">(target, collectionTypes.</span><span style="color:#6F42C1;">has</span><span style="color:#24292E;">(target.constructor) </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> collectionHandlers </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> baseHandlers)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 给原始数据打个标识，说明它已经变成响应式，并且有对应的 Proxy 了</span></span>
<span class="line"><span style="color:#24292E;">  def(target, isReadonly </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;__v_readonly&quot;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">/* readonly */</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;__v_reactive&quot;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">/* reactive */</span><span style="color:#24292E;">, observed)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> observed</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>其实 readonly 和 reactive 函数的主要区别，就是执行 createReactiveObject 函数时的参数 isReadonly 不同。</p><p>我们来看这里的代码，首先 isReadonly 变量为 true，所以在创建过程中会给原始对象 target 打上一个 __v_readonly 的标识。另外还有一个特殊情况，如果 target 已经是一个 reactive 对象，就会把它继续变成一个 readonly 响应式对象。</p><p>其次就是 baseHandlers 的 collectionHandlers 的区别，我们这里仍然只关心基本数据类型的 Proxy 处理器对象，readonly 函数传入的 baseHandlers 值是 readonlyHandlers。</p><p>接下来，我们来看一下其中 readonlyHandlers 的实现：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> readonlyHandlers </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  get</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> readonlyGet,</span></span>
<span class="line"><span style="color:#E1E4E8;">  has,</span></span>
<span class="line"><span style="color:#E1E4E8;">  ownKeys,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">(target, key) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ((p<wbr>rocess.env.NODE_ENV </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;production&#39;</span><span style="color:#E1E4E8;">)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      console.</span><span style="color:#B392F0;">warn</span><span style="color:#E1E4E8;">(\`Set operation on key </span><span style="color:#9ECBFF;">&quot;\${String(key)}&quot;</span><span style="color:#E1E4E8;"> failed</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> target is readonly.\`, target)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">deleteProperty</span><span style="color:#E1E4E8;">(target, key) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ((p<wbr>rocess.env.NODE_ENV </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;production&#39;</span><span style="color:#E1E4E8;">)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      console.</span><span style="color:#B392F0;">warn</span><span style="color:#E1E4E8;">(\`Delete operation on key </span><span style="color:#9ECBFF;">&quot;\${String(key)}&quot;</span><span style="color:#E1E4E8;"> failed</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> target is readonly.\`, target)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> readonlyHandlers </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  get</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> readonlyGet,</span></span>
<span class="line"><span style="color:#24292E;">  has,</span></span>
<span class="line"><span style="color:#24292E;">  ownKeys,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">set</span><span style="color:#24292E;">(target, key) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ((p<wbr>rocess.env.NODE_ENV </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;production&#39;</span><span style="color:#24292E;">)) {</span></span>
<span class="line"><span style="color:#24292E;">      console.</span><span style="color:#6F42C1;">warn</span><span style="color:#24292E;">(\`Set operation on key </span><span style="color:#032F62;">&quot;\${String(key)}&quot;</span><span style="color:#24292E;"> failed</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> target is readonly.\`, target)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">deleteProperty</span><span style="color:#24292E;">(target, key) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ((p<wbr>rocess.env.NODE_ENV </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;production&#39;</span><span style="color:#24292E;">)) {</span></span>
<span class="line"><span style="color:#24292E;">      console.</span><span style="color:#6F42C1;">warn</span><span style="color:#24292E;">(\`Delete operation on key </span><span style="color:#032F62;">&quot;\${String(key)}&quot;</span><span style="color:#24292E;"> failed</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> target is readonly.\`, target)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>readonlyHandlers 和 mutableHandlers 的区别主要在 get、set 和 deleteProperty 三个函数上。很显然，作为一个只读的响应式对象，是不允许修改属性以及删除属性的，所以在非生产环境下 set 和 deleteProperty 函数的实现都会报警告，提示用户 target 是 readonly 的。</p><p>接下来我们来看一下其中 readonlyGet 的实现，它其实就是 createGetter(true) 的返回值：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function </span><span style="color:#B392F0;">createGetter</span><span style="color:#E1E4E8;">(isReadonly </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> function </span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(target, key, receiver) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// isReadonly 为 true 则不需要依赖收集</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">isReadonly </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">track</span><span style="color:#E1E4E8;">(target, </span><span style="color:#9ECBFF;">&quot;get&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">/* GET */</span><span style="color:#E1E4E8;">, key)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">isObject</span><span style="color:#E1E4E8;">(res)</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> isReadonly</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">?</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 如果 res 是个对象或者数组类型，则递归执行 readonly 函数把 res readonly</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">readonly</span><span style="color:#E1E4E8;">(res)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">reactive</span><span style="color:#E1E4E8;">(res)</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> res</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function </span><span style="color:#6F42C1;">createGetter</span><span style="color:#24292E;">(isReadonly </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> function </span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(target, key, receiver) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// isReadonly 为 true 则不需要依赖收集</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">isReadonly </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">track</span><span style="color:#24292E;">(target, </span><span style="color:#032F62;">&quot;get&quot;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">/* GET */</span><span style="color:#24292E;">, key)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">isObject</span><span style="color:#24292E;">(res)</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> isReadonly</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">?</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 如果 res 是个对象或者数组类型，则递归执行 readonly 函数把 res readonly</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">readonly</span><span style="color:#24292E;">(res)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">reactive</span><span style="color:#24292E;">(res)</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> res</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>可以看到，它和 reactive API 最大的区别就是不做依赖收集了，这一点也非常好理解，因为它的属性不会被修改，所以就不用跟踪它的变化了。</p><p>到这里，readonly API 就介绍完了，接下来我们分析一下另一个常用的响应式 API：ref。</p><h3 id="ref-api" tabindex="-1">ref API <a class="header-anchor" href="#ref-api" aria-label="Permalink to &quot;ref API&quot;">​</a></h3><p>通过前面的分析，我们知道 reactive API 对传入的 target 类型有限制，必须是对象或者数组类型，而对于一些基础类型（比如 String、Number、Boolean）是不支持的。</p><p>但是有时候从需求上来说，可能我只希望把一个字符串变成响应式，却不得不封装成一个对象，这样使用上多少有一些不方便，于是 Vue.js 3.0 设计并实现了 ref API。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> msg </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;Hello World&#39;</span><span style="color:#E1E4E8;">) </span></span>
<span class="line"><span style="color:#E1E4E8;">msg.value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;Hello Vue&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> msg </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;Hello World&#39;</span><span style="color:#24292E;">) </span></span>
<span class="line"><span style="color:#24292E;">msg.value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;Hello Vue&#39;</span></span></code></pre></div><p>我们先来看一下 ref 的实现：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">(value) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createRef</span><span style="color:#E1E4E8;">(value)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> convert </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (val) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">isObject</span><span style="color:#E1E4E8;">(val) </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">reactive</span><span style="color:#E1E4E8;">(val) </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> val</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">function </span><span style="color:#B392F0;">createRef</span><span style="color:#E1E4E8;">(rawValue) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">isRef</span><span style="color:#E1E4E8;">(rawValue)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 如果传入的就是一个 ref，那么返回自身即可，处理嵌套 ref 的情况。</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> rawValue</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 如果是对象或者数组类型，则转换一个 reactive 对象。</span></span>
<span class="line"><span style="color:#E1E4E8;">  let value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">convert</span><span style="color:#E1E4E8;">(rawValue)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> r </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    __v_isRef</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    get </span><span style="color:#B392F0;">value</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// getter</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 依赖收集，key 为固定的 value</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">track</span><span style="color:#E1E4E8;">(r, </span><span style="color:#9ECBFF;">&quot;get&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">/* GET */</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;value&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> value</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    set </span><span style="color:#B392F0;">value</span><span style="color:#E1E4E8;">(newVal) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// setter，只处理 value 属性的修改</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">hasChanged</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">toRaw</span><span style="color:#E1E4E8;">(newVal), rawValue)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 判断有变化后更新值</span></span>
<span class="line"><span style="color:#E1E4E8;">        rawValue </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> newVal</span></span>
<span class="line"><span style="color:#E1E4E8;">        value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">convert</span><span style="color:#E1E4E8;">(newVal)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 派发通知</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">trigger</span><span style="color:#E1E4E8;">(r, </span><span style="color:#9ECBFF;">&quot;set&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">/* SET */</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;value&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> r</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">(value) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createRef</span><span style="color:#24292E;">(value)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> convert </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (val) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">isObject</span><span style="color:#24292E;">(val) </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">reactive</span><span style="color:#24292E;">(val) </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> val</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">function </span><span style="color:#6F42C1;">createRef</span><span style="color:#24292E;">(rawValue) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#6F42C1;">isRef</span><span style="color:#24292E;">(rawValue)) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 如果传入的就是一个 ref，那么返回自身即可，处理嵌套 ref 的情况。</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> rawValue</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 如果是对象或者数组类型，则转换一个 reactive 对象。</span></span>
<span class="line"><span style="color:#24292E;">  let value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">convert</span><span style="color:#24292E;">(rawValue)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> r </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    __v_isRef</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    get </span><span style="color:#6F42C1;">value</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// getter</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 依赖收集，key 为固定的 value</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">track</span><span style="color:#24292E;">(r, </span><span style="color:#032F62;">&quot;get&quot;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">/* GET */</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;value&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> value</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    set </span><span style="color:#6F42C1;">value</span><span style="color:#24292E;">(newVal) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// setter，只处理 value 属性的修改</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#6F42C1;">hasChanged</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">toRaw</span><span style="color:#24292E;">(newVal), rawValue)) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 判断有变化后更新值</span></span>
<span class="line"><span style="color:#24292E;">        rawValue </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> newVal</span></span>
<span class="line"><span style="color:#24292E;">        value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">convert</span><span style="color:#24292E;">(newVal)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 派发通知</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">trigger</span><span style="color:#24292E;">(r, </span><span style="color:#032F62;">&quot;set&quot;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">/* SET */</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;value&#39;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> r</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>可以看到，函数首先处理了嵌套 ref 的情况，如果传入的 rawValue 也是 ref，那么直接返回。</p><p>接着对 rawValue 做了一层转换，如果 rawValue 是对象或者数组类型，那么把它转换成一个 reactive 对象。</p><p>最后定义一个对 value 属性做 getter 和 setter 劫持的对象并返回，get 部分就是执行 track 函数做依赖收集然后返回它的值；set 部分就是设置新值并且执行 trigger 函数派发通知。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>好的，到这里我们这一节的学习也要结束啦，我希望通过这节课的学习，你能搞明白响应式 API 的实现原理，知道什么时候收集依赖，什么时候派发更新，以及副作用函数的作用和设计原理。我还希望你能知道 reactive、readonly、ref 三种 API 的区别和各自的使用场景，这样你就可以在今后的开发中对它们应用自如啦。</p><p>最后我们通过一张图来看一下整个响应式 API 实现和组件更新的关系：</p>`,76),E=s("<p>这幅图是不是很眼熟？没错，它和前面 Vue.js 2.x 的响应式原理图很接近，其实 Vue.js 3.0 在响应式的实现思路和 Vue.js 2.x 差别并不大，主要就是 <strong>劫持数据的方式改成用 Proxy 实现</strong> ， <strong>以及收集的依赖由 watcher 实例变成了组件副作用渲染函数</strong> 。</p><p>最后，给你留一道思考题目，为什么说 Vue.js 3 的响应式 API 实现和 Vue.js 2.x 相比性能要好，具体好在哪里呢？它又有哪些不足呢？欢迎你在留言区与我分享。</p><blockquote><p><strong>本节课的相关代码在源代码中的位置如下：</strong></p><p>packages/reactivity/src/baseHandlers.ts</p><p>packages/reactivity/src/effect.ts</p><p>packages/reactivity/src/reactive.ts</p><p>packages/reactivity/src/ref.ts</p></blockquote>",3);function y(i,f,u,d,F,g){const n=l("Image");return p(),o("div",null,[r,e(n,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/3A/99/CgqCHl8iOeqAJJlaAAHAhGDRoDQ714.png"}),t(),E])}const D=a(c,[["render",y]]);export{A as __pageData,D as default};
