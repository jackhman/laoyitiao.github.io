import{_ as a,j as l,o as p,g as o,k as e,h as t,Q as s}from"./chunks/framework.a0d18f64.js";const g=JSON.parse('{"title":"24Tranition组件：过渡动画的实现原理是怎样的？（上）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Vue.js 3.0 核心源码内参_文档/(7653) 24  Tranition 组件：过渡动画的实现原理是怎样的？（上）.md","filePath":"posts/frontEnd/Vue.js 3.0 核心源码内参_文档/(7653) 24  Tranition 组件：过渡动画的实现原理是怎样的？（上）.md","lastUpdated":1696682708000}'),c={name:"posts/frontEnd/Vue.js 3.0 核心源码内参_文档/(7653) 24  Tranition 组件：过渡动画的实现原理是怎样的？（上）.md"},r=s(`<h1 id="_24tranition组件-过渡动画的实现原理是怎样的-上" tabindex="-1">24Tranition组件：过渡动画的实现原理是怎样的？（上） <a class="header-anchor" href="#_24tranition组件-过渡动画的实现原理是怎样的-上" aria-label="Permalink to &quot;24Tranition组件：过渡动画的实现原理是怎样的？（上）&quot;">​</a></h1><p>作为一名前端开发工程师，平时开发页面少不了要写一些过渡动画，通常可以用 CSS 脚本来实现，当然一些时候也会使用 JavaScript 操作 DOM 来实现动画。那么，如果我们使用 Vue.js 技术栈，有没有好的实现动画的方式呢？</p><p>答案是肯定的------有，Vue.js 提供了内置的 Transition 组件，它可以让我们轻松实现动画过渡效果。</p><h3 id="transition-组件的用法" tabindex="-1">Transition 组件的用法 <a class="header-anchor" href="#transition-组件的用法" aria-label="Permalink to &quot;Transition 组件的用法&quot;">​</a></h3><blockquote><p>如果你还不太熟悉 Transition 组件的使用，我建议你先去看它的<a href="https://v3.vuejs.org/guide/transitions-enterleave.html" target="_blank" rel="noreferrer">官网文档</a>。</p></blockquote><p>Transition 组件通常有三类用法：CSS 过渡，CSS 动画和 JavaScript 钩子。我们分别用几个示例来说明，这里我希望你可以敲代码运行感受一下。</p><p>首先来看 CSS 过渡：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;app&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">button</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">@click=&quot;show</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">!show&quot;&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">Toggle</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">render</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">&lt;/button&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">&lt;transition</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">name</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;fade&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">v-if</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;show&quot;</span><span style="color:#E1E4E8;">&gt;hello&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">transition</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  export default {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">data</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">      return {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">show</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  .fade-enter-active,</span></span>
<span class="line"><span style="color:#E1E4E8;">  .fade-leave-active {</span></span>
<span class="line"><span style="color:#E1E4E8;">    transition: opacity 0.5s ease;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  .fade-enter-from,</span></span>
<span class="line"><span style="color:#E1E4E8;">  .fade-leave-to {</span></span>
<span class="line"><span style="color:#E1E4E8;">    opacity: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;app&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">button</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">@click=&quot;show</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">=</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">!show&quot;&gt;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">Toggle</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">render</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">&lt;/button&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">&lt;transition</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">name</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;fade&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">v-if</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;show&quot;</span><span style="color:#24292E;">&gt;hello&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">transition</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  export default {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">data</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">      return {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">show</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  .fade-enter-active,</span></span>
<span class="line"><span style="color:#24292E;">  .fade-leave-active {</span></span>
<span class="line"><span style="color:#24292E;">    transition: opacity 0.5s ease;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  .fade-enter-from,</span></span>
<span class="line"><span style="color:#24292E;">  .fade-leave-to {</span></span>
<span class="line"><span style="color:#24292E;">    opacity: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>CSS 过渡主要定义了一些过渡的 CSS 样式，当我们点击按钮切换文本显隐的时候，就会应用这些 CSS 样式，实现过渡效果。</p><p>接着来看 CSS 动画：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;app&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">button</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">@click=&quot;show</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">!show&quot;&gt;Toggle</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">show&lt;/button&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">&lt;transition</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">name</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;bounce&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">v-if</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;show&quot;</span><span style="color:#E1E4E8;">&gt;Vue is an awesome front-end MVVM framework. We can use it to build multiple apps.&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">transition</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  export default {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">data</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">      return {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">show</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  .bounce-enter-active {</span></span>
<span class="line"><span style="color:#E1E4E8;">    animation: bounce</span><span style="color:#F97583;">-in</span><span style="color:#E1E4E8;"> 0.5s;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  .bounce-leave-active {</span></span>
<span class="line"><span style="color:#E1E4E8;">    animation: bounce</span><span style="color:#F97583;">-in</span><span style="color:#E1E4E8;"> 0.5s reverse;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  @keyframes bounce-in {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">0</span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      transform: </span><span style="color:#B392F0;">scale</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">50</span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      transform: </span><span style="color:#B392F0;">scale</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1.5</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">100</span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      transform: </span><span style="color:#B392F0;">scale</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">style</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;app&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">button</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">@click=&quot;show</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">=</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">!show&quot;&gt;Toggle</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">show&lt;/button&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">&lt;transition</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">name</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;bounce&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">v-if</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;show&quot;</span><span style="color:#24292E;">&gt;Vue is an awesome front-end MVVM framework. We can use it to build multiple apps.&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">transition</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  export default {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">data</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">      return {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">show</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  .bounce-enter-active {</span></span>
<span class="line"><span style="color:#24292E;">    animation: bounce</span><span style="color:#D73A49;">-in</span><span style="color:#24292E;"> 0.5s;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  .bounce-leave-active {</span></span>
<span class="line"><span style="color:#24292E;">    animation: bounce</span><span style="color:#D73A49;">-in</span><span style="color:#24292E;"> 0.5s reverse;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  @keyframes bounce-in {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">0</span><span style="color:#D73A49;">%</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      transform: </span><span style="color:#6F42C1;">scale</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">50</span><span style="color:#D73A49;">%</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      transform: </span><span style="color:#6F42C1;">scale</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1.5</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">100</span><span style="color:#D73A49;">%</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      transform: </span><span style="color:#6F42C1;">scale</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">style</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>和 CSS 过渡类似，CSS 动画主要定义了一些动画的 CSS 样式，当我们去点击按钮切换文本显隐的时候，就会应用这些 CSS 样式，实现动画效果。</p><p>最后，是 JavaScript 钩子：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;app&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">button</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">@click=&quot;show</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">!show&quot;&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">Toggle</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">render</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">&lt;/button&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">&lt;transition</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#FDAEB7;font-style:italic;">@before-enter=&quot;beforeEnter&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#FDAEB7;font-style:italic;">@enter=&quot;enter&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#FDAEB7;font-style:italic;">@before-leave=&quot;beforeLeave&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#FDAEB7;font-style:italic;">@leave=&quot;leave&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">css</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;false&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">v-if</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;show&quot;</span><span style="color:#E1E4E8;">&gt;hello&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">transition</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  export default {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">data</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">      return {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">show</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    methods: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">beforeEnter</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">el</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        el.style.opacity </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">        el.style.transition </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;opacity 0.5s ease&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">enter</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">el</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.$el.offsetHeight</span></span>
<span class="line"><span style="color:#E1E4E8;">        el.style.opacity </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">beforeLeave</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">el</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        el.style.opacity </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">leave</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">el</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        el.style.transition </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;opacity 0.5s ease&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">        el.style.opacity </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;app&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">button</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">@click=&quot;show</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">=</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">!show&quot;&gt;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">Toggle</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">render</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">&lt;/button&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">&lt;transition</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#B31D28;font-style:italic;">@before-enter=&quot;beforeEnter&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#B31D28;font-style:italic;">@enter=&quot;enter&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#B31D28;font-style:italic;">@before-leave=&quot;beforeLeave&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#B31D28;font-style:italic;">@leave=&quot;leave&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">css</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;false&quot;</span></span>
<span class="line"><span style="color:#24292E;">    &gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">v-if</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;show&quot;</span><span style="color:#24292E;">&gt;hello&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">transition</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  export default {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">data</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">      return {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">show</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    methods: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">beforeEnter</span><span style="color:#24292E;">(</span><span style="color:#E36209;">el</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        el.style.opacity </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">        el.style.transition </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;opacity 0.5s ease&#39;</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">enter</span><span style="color:#24292E;">(</span><span style="color:#E36209;">el</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.$el.offsetHeight</span></span>
<span class="line"><span style="color:#24292E;">        el.style.opacity </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">beforeLeave</span><span style="color:#24292E;">(</span><span style="color:#E36209;">el</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        el.style.opacity </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">leave</span><span style="color:#24292E;">(</span><span style="color:#E36209;">el</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        el.style.transition </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;opacity 0.5s ease&#39;</span></span>
<span class="line"><span style="color:#24292E;">        el.style.opacity </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>Transition 组件也允许在一个过渡组件中定义它过渡生命周期的 JavaScript 钩子函数，我们可以在这些钩子函数中编写 JavaScript 操作 DOM 来实现过渡动画效果。</p><h3 id="transition-组件的核心思想" tabindex="-1">Transition 组件的核心思想 <a class="header-anchor" href="#transition-组件的核心思想" aria-label="Permalink to &quot;Transition 组件的核心思想&quot;">​</a></h3><p>通过前面三个示例，我们不难发现都是在点击按钮时，通过修改 v-if 的条件值来触发过渡动画的。</p><p>其实 Transition 组件过渡动画的触发条件有以下四点：</p><ul><li><p>条件渲染 (使用 v-if)；</p></li><li><p>条件展示 (使用 v-show)；</p></li><li><p>动态组件；</p></li><li><p>组件根节点。</p></li></ul><p>所以你只能在上述四种情况中使用 Transition 组件，在进入/离开过渡的时候会有 6 个 class 切换。</p><ol><li><p><strong>v-enter-from</strong>：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。</p></li><li><p><strong>v-enter-active</strong>：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。</p></li><li><p><strong>v-enter-to</strong>：定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 v-enter-from 被移除)，在过渡动画完成之后移除。</p></li><li><p><strong>v-leave-from</strong>：定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。</p></li><li><p><strong>v-leave-active</strong>：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。</p></li><li><p><strong>v-leave-to</strong>：定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave-from 被删除)，在过渡动画完成之后移除。</p></li></ol>`,21),E=s(`<p>其实说白了 Transition 组件的核心思想就是，<strong>Transition 包裹的元素插入删除时</strong> ，<strong>在适当的时机插入这些 CSS 样式</strong>，而这些 CSS 的实现则决定了元素的过渡动画。</p><p>大致了解了 Transition 组件的用法和核心思想后，接下来我们就来探究 Transition 组件的实现原理。</p><h3 id="transition-组件的实现原理" tabindex="-1">Transition 组件的实现原理 <a class="header-anchor" href="#transition-组件的实现原理" aria-label="Permalink to &quot;Transition 组件的实现原理&quot;">​</a></h3><p>为了方便你的理解，我们还是结合示例来分析：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;app&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">button</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">@click=&quot;show</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#FDAEB7;font-style:italic;">!show&quot;&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">Toggle</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">render</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">&lt;/button&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">&lt;transition</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">name</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;fade&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">v-if</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;show&quot;</span><span style="color:#E1E4E8;">&gt;hello&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">transition</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;app&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">button</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">@click=&quot;show</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">=</span><span style="color:#24292E;"> </span><span style="color:#B31D28;font-style:italic;">!show&quot;&gt;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">Toggle</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">render</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">&lt;/button&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">&lt;transition</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">name</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;fade&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">v-if</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;show&quot;</span><span style="color:#24292E;">&gt;hello&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">transition</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>先来看模板编译后生成的 render 函数：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { createVNode </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> _createVNode, openBlock </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> _openBlock, createBlock </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> _createBlock, createCommentVNode </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> _createCommentVNode, Transition </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> _Transition, withCtx </span><span style="color:#F97583;">as</span><span style="color:#E1E4E8;"> _withCtx } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;vue&quot;</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">render</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">_ctx</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">_cache</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">$props</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">$setup</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">$data</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">$options</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">_openBlock</span><span style="color:#E1E4E8;">(), </span><span style="color:#B392F0;">_createBlock</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;template&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">, [</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">_createVNode</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;div&quot;</span><span style="color:#E1E4E8;">, { class: </span><span style="color:#9ECBFF;">&quot;app&quot;</span><span style="color:#E1E4E8;"> }, [</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">_createVNode</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;button&quot;</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">onClick</span><span style="color:#E1E4E8;">: </span><span style="color:#FFAB70;">$event</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> (_ctx.show </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">_ctx.show)</span></span>
<span class="line"><span style="color:#E1E4E8;">      }, </span><span style="color:#9ECBFF;">&quot; Toggle render &quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">8</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">/* PROPS */</span><span style="color:#E1E4E8;">, [</span><span style="color:#9ECBFF;">&quot;onClick&quot;</span><span style="color:#E1E4E8;">]),</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">_createVNode</span><span style="color:#E1E4E8;">(_Transition, { name: </span><span style="color:#9ECBFF;">&quot;fade&quot;</span><span style="color:#E1E4E8;"> }, {</span></span>
<span class="line"><span style="color:#E1E4E8;">        default: </span><span style="color:#B392F0;">_withCtx</span><span style="color:#E1E4E8;">(() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">          (_ctx.show)</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">_openBlock</span><span style="color:#E1E4E8;">(), </span><span style="color:#B392F0;">_createBlock</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;p&quot;</span><span style="color:#E1E4E8;">, { key: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;"> }, </span><span style="color:#9ECBFF;">&quot;hello&quot;</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">_createCommentVNode</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;v-if&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        ]),</span></span>
<span class="line"><span style="color:#E1E4E8;">        _: </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">      })</span></span>
<span class="line"><span style="color:#E1E4E8;">    ])</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]))</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { createVNode </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> _createVNode, openBlock </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> _openBlock, createBlock </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> _createBlock, createCommentVNode </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> _createCommentVNode, Transition </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> _Transition, withCtx </span><span style="color:#D73A49;">as</span><span style="color:#24292E;"> _withCtx } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;vue&quot;</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">render</span><span style="color:#24292E;">(</span><span style="color:#E36209;">_ctx</span><span style="color:#24292E;">, </span><span style="color:#E36209;">_cache</span><span style="color:#24292E;">, </span><span style="color:#E36209;">$props</span><span style="color:#24292E;">, </span><span style="color:#E36209;">$setup</span><span style="color:#24292E;">, </span><span style="color:#E36209;">$data</span><span style="color:#24292E;">, </span><span style="color:#E36209;">$options</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (</span><span style="color:#6F42C1;">_openBlock</span><span style="color:#24292E;">(), </span><span style="color:#6F42C1;">_createBlock</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;template&quot;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">, [</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">_createVNode</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;div&quot;</span><span style="color:#24292E;">, { class: </span><span style="color:#032F62;">&quot;app&quot;</span><span style="color:#24292E;"> }, [</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">_createVNode</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;button&quot;</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">onClick</span><span style="color:#24292E;">: </span><span style="color:#E36209;">$event</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> (_ctx.show </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">_ctx.show)</span></span>
<span class="line"><span style="color:#24292E;">      }, </span><span style="color:#032F62;">&quot; Toggle render &quot;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">8</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">/* PROPS */</span><span style="color:#24292E;">, [</span><span style="color:#032F62;">&quot;onClick&quot;</span><span style="color:#24292E;">]),</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">_createVNode</span><span style="color:#24292E;">(_Transition, { name: </span><span style="color:#032F62;">&quot;fade&quot;</span><span style="color:#24292E;"> }, {</span></span>
<span class="line"><span style="color:#24292E;">        default: </span><span style="color:#6F42C1;">_withCtx</span><span style="color:#24292E;">(() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">          (_ctx.show)</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> (</span><span style="color:#6F42C1;">_openBlock</span><span style="color:#24292E;">(), </span><span style="color:#6F42C1;">_createBlock</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;p&quot;</span><span style="color:#24292E;">, { key: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;"> }, </span><span style="color:#032F62;">&quot;hello&quot;</span><span style="color:#24292E;">))</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">_createCommentVNode</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;v-if&quot;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        ]),</span></span>
<span class="line"><span style="color:#24292E;">        _: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">      })</span></span>
<span class="line"><span style="color:#24292E;">    ])</span></span>
<span class="line"><span style="color:#24292E;">  ]))</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>对于 Transition 组件部分，生成的 render 函数主要创建了Transition 组件 vnode，并且有一个默认插槽。</p><p>我们接着来看 Transition 组件的定义：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> Transition </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (props, { slots }) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">h</span><span style="color:#E1E4E8;">(BaseTransition, </span><span style="color:#B392F0;">resolveTransitionProps</span><span style="color:#E1E4E8;">(props), slots)</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> BaseTransition </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  name</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> \`BaseTransition\`,</span></span>
<span class="line"><span style="color:#E1E4E8;">  props</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    mode</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> String,</span></span>
<span class="line"><span style="color:#E1E4E8;">    appear</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> Boolean,</span></span>
<span class="line"><span style="color:#E1E4E8;">    persisted</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> Boolean,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// enter</span></span>
<span class="line"><span style="color:#E1E4E8;">    onBeforeEnter</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> TransitionHookValidator,</span></span>
<span class="line"><span style="color:#E1E4E8;">    onEnter</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> TransitionHookValidator,</span></span>
<span class="line"><span style="color:#E1E4E8;">    onAfterEnter</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> TransitionHookValidator,</span></span>
<span class="line"><span style="color:#E1E4E8;">    onEnterCancelled</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> TransitionHookValidator,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// leave</span></span>
<span class="line"><span style="color:#E1E4E8;">    onBeforeLeave</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> TransitionHookValidator,</span></span>
<span class="line"><span style="color:#E1E4E8;">    onLeave</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> TransitionHookValidator,</span></span>
<span class="line"><span style="color:#E1E4E8;">    onAfterLeave</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> TransitionHookValidator,</span></span>
<span class="line"><span style="color:#E1E4E8;">    onLeaveCancelled</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> TransitionHookValidator,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// appear</span></span>
<span class="line"><span style="color:#E1E4E8;">    onBeforeAppear</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> TransitionHookValidator,</span></span>
<span class="line"><span style="color:#E1E4E8;">    onAppear</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> TransitionHookValidator,</span></span>
<span class="line"><span style="color:#E1E4E8;">    onAfterAppear</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> TransitionHookValidator,</span></span>
<span class="line"><span style="color:#E1E4E8;">    onAppearCancelled</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> TransitionHookValidator</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;">(props, { slots }) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> instance </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getCurrentInstance</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> state </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useTransitionState</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">    let prevTransitionKey</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> children </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> slots.default </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getTransitionRawChildren</span><span style="color:#E1E4E8;">(slots.</span><span style="color:#B392F0;">default</span><span style="color:#E1E4E8;">(), </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">children </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">children.length) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// Transition 组件只允许一个子元素节点，多个报警告，提示使用 TransitionGroup 组件</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ((p<wbr>rocess.env.NODE_ENV </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;production&#39;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> children.length </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">warn</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;&lt;transition&gt; can only be used on a single element or component. Use &#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#9ECBFF;">&#39;&lt;transition-group&gt; for lists.&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 不需要追踪响应式，所以改成原始值，提升性能</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> rawProps </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">toRaw</span><span style="color:#E1E4E8;">(props)</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { mode } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> rawProps</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 检查 mode 是否合法</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ((p<wbr>rocess.env.NODE_ENV </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;production&#39;</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> mode </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">[</span><span style="color:#9ECBFF;">&#39;in-out&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;out-in&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;default&#39;</span><span style="color:#E1E4E8;">].</span><span style="color:#B392F0;">includes</span><span style="color:#E1E4E8;">(mode)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">warn</span><span style="color:#E1E4E8;">(\`invalid </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">transition</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> mode</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> \${mode}\`)</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 获取第一个子元素节点</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> child </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> children[</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (state.isLeaving) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">emptyPlaceholder</span><span style="color:#E1E4E8;">(child)</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 处理 &lt;transition&gt;&lt;keep-alive/&gt;&lt;/transition&gt; 的情况</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> innerChild </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getKeepAliveChild</span><span style="color:#E1E4E8;">(child)</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">innerChild) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">emptyPlaceholder</span><span style="color:#E1E4E8;">(child)</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> enterHooks </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">resolveTransitionHooks</span><span style="color:#E1E4E8;">(innerChild, rawProps, state, instance)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">setTransitionHooks</span><span style="color:#E1E4E8;">(innerChild, enterHooks)</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> oldChild </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> instance.subTree</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> oldInnerChild </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> oldChild </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getKeepAliveChild</span><span style="color:#E1E4E8;">(oldChild)</span></span>
<span class="line"><span style="color:#E1E4E8;">      let transitionKeyChanged </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { getTransitionKey } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> innerChild.type</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (getTransitionKey) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> key </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getTransitionKey</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (prevTransitionKey </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> undefined) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          prevTransitionKey </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> key</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (key </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> prevTransitionKey) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          prevTransitionKey </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> key</span></span>
<span class="line"><span style="color:#E1E4E8;">          transitionKeyChanged </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (oldInnerChild </span><span style="color:#F97583;">&amp;&amp;</span></span>
<span class="line"><span style="color:#E1E4E8;">        oldInnerChild.type </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> Comment </span><span style="color:#F97583;">&amp;&amp;</span></span>
<span class="line"><span style="color:#E1E4E8;">        (</span><span style="color:#F97583;">!</span><span style="color:#B392F0;">isSameVNodeType</span><span style="color:#E1E4E8;">(innerChild, oldInnerChild) </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> transitionKeyChanged)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> leavingHooks </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">resolveTransitionHooks</span><span style="color:#E1E4E8;">(oldInnerChild, rawProps, state, instance)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 更新旧树的钩子函数</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">setTransitionHooks</span><span style="color:#E1E4E8;">(oldInnerChild, leavingHooks)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#6A737D;">// 在两个视图之间切换</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (mode </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;out-in&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          state.isLeaving </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// 返回空的占位符节点，当离开过渡结束后，重新渲染组件</span></span>
<span class="line"><span style="color:#E1E4E8;">          leavingHooks.afterLeave </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            state.isLeaving </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">            instance.</span><span style="color:#B392F0;">update</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">emptyPlaceholder</span><span style="color:#E1E4E8;">(child)</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (mode </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;in-out&#39;</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          leavingHooks.delayLeave </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (el, earlyRemove, delayedLeave) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> leavingVNodesCache </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getLeavingNodesForType</span><span style="color:#E1E4E8;">(state, oldInnerChild)</span></span>
<span class="line"><span style="color:#E1E4E8;">            leavingVNodesCache[</span><span style="color:#B392F0;">String</span><span style="color:#E1E4E8;">(oldInnerChild.key)] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> oldInnerChild</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#6A737D;">// early removal callback</span></span>
<span class="line"><span style="color:#E1E4E8;">            el._leaveCb </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#B392F0;">earlyRemove</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">              el._leaveCb </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> undefined</span></span>
<span class="line"><span style="color:#E1E4E8;">              delete enterHooks.delayedLeave</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">            enterHooks.delayedLeave </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> delayedLeave</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> child</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> Transition </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (props, { slots }) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">h</span><span style="color:#24292E;">(BaseTransition, </span><span style="color:#6F42C1;">resolveTransitionProps</span><span style="color:#24292E;">(props), slots)</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> BaseTransition </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  name</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> \`BaseTransition\`,</span></span>
<span class="line"><span style="color:#24292E;">  props</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    mode</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> String,</span></span>
<span class="line"><span style="color:#24292E;">    appear</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> Boolean,</span></span>
<span class="line"><span style="color:#24292E;">    persisted</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> Boolean,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// enter</span></span>
<span class="line"><span style="color:#24292E;">    onBeforeEnter</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> TransitionHookValidator,</span></span>
<span class="line"><span style="color:#24292E;">    onEnter</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> TransitionHookValidator,</span></span>
<span class="line"><span style="color:#24292E;">    onAfterEnter</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> TransitionHookValidator,</span></span>
<span class="line"><span style="color:#24292E;">    onEnterCancelled</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> TransitionHookValidator,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// leave</span></span>
<span class="line"><span style="color:#24292E;">    onBeforeLeave</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> TransitionHookValidator,</span></span>
<span class="line"><span style="color:#24292E;">    onLeave</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> TransitionHookValidator,</span></span>
<span class="line"><span style="color:#24292E;">    onAfterLeave</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> TransitionHookValidator,</span></span>
<span class="line"><span style="color:#24292E;">    onLeaveCancelled</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> TransitionHookValidator,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// appear</span></span>
<span class="line"><span style="color:#24292E;">    onBeforeAppear</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> TransitionHookValidator,</span></span>
<span class="line"><span style="color:#24292E;">    onAppear</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> TransitionHookValidator,</span></span>
<span class="line"><span style="color:#24292E;">    onAfterAppear</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> TransitionHookValidator,</span></span>
<span class="line"><span style="color:#24292E;">    onAppearCancelled</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> TransitionHookValidator</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;">(props, { slots }) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> instance </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getCurrentInstance</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> state </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useTransitionState</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">    let prevTransitionKey</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> children </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> slots.default </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getTransitionRawChildren</span><span style="color:#24292E;">(slots.</span><span style="color:#6F42C1;">default</span><span style="color:#24292E;">(), </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">children </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">children.length) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// Transition 组件只允许一个子元素节点，多个报警告，提示使用 TransitionGroup 组件</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ((p<wbr>rocess.env.NODE_ENV </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;production&#39;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> children.length </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">warn</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;&lt;transition&gt; can only be used on a single element or component. Use &#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#032F62;">&#39;&lt;transition-group&gt; for lists.&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 不需要追踪响应式，所以改成原始值，提升性能</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> rawProps </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">toRaw</span><span style="color:#24292E;">(props)</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { mode } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> rawProps</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 检查 mode 是否合法</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ((p<wbr>rocess.env.NODE_ENV </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;production&#39;</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> mode </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">[</span><span style="color:#032F62;">&#39;in-out&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;out-in&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;default&#39;</span><span style="color:#24292E;">].</span><span style="color:#6F42C1;">includes</span><span style="color:#24292E;">(mode)) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">warn</span><span style="color:#24292E;">(\`invalid </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">transition</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> mode</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> \${mode}\`)</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 获取第一个子元素节点</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> child </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> children[</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (state.isLeaving) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">emptyPlaceholder</span><span style="color:#24292E;">(child)</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 处理 &lt;transition&gt;&lt;keep-alive/&gt;&lt;/transition&gt; 的情况</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> innerChild </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getKeepAliveChild</span><span style="color:#24292E;">(child)</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">innerChild) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">emptyPlaceholder</span><span style="color:#24292E;">(child)</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> enterHooks </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">resolveTransitionHooks</span><span style="color:#24292E;">(innerChild, rawProps, state, instance)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">setTransitionHooks</span><span style="color:#24292E;">(innerChild, enterHooks)</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> oldChild </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> instance.subTree</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> oldInnerChild </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> oldChild </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getKeepAliveChild</span><span style="color:#24292E;">(oldChild)</span></span>
<span class="line"><span style="color:#24292E;">      let transitionKeyChanged </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { getTransitionKey } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> innerChild.type</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (getTransitionKey) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> key </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getTransitionKey</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (prevTransitionKey </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> undefined) {</span></span>
<span class="line"><span style="color:#24292E;">          prevTransitionKey </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> key</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (key </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> prevTransitionKey) {</span></span>
<span class="line"><span style="color:#24292E;">          prevTransitionKey </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> key</span></span>
<span class="line"><span style="color:#24292E;">          transitionKeyChanged </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (oldInnerChild </span><span style="color:#D73A49;">&amp;&amp;</span></span>
<span class="line"><span style="color:#24292E;">        oldInnerChild.type </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> Comment </span><span style="color:#D73A49;">&amp;&amp;</span></span>
<span class="line"><span style="color:#24292E;">        (</span><span style="color:#D73A49;">!</span><span style="color:#6F42C1;">isSameVNodeType</span><span style="color:#24292E;">(innerChild, oldInnerChild) </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> transitionKeyChanged)) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> leavingHooks </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">resolveTransitionHooks</span><span style="color:#24292E;">(oldInnerChild, rawProps, state, instance)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 更新旧树的钩子函数</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">setTransitionHooks</span><span style="color:#24292E;">(oldInnerChild, leavingHooks)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6A737D;">// 在两个视图之间切换</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (mode </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;out-in&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">          state.isLeaving </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// 返回空的占位符节点，当离开过渡结束后，重新渲染组件</span></span>
<span class="line"><span style="color:#24292E;">          leavingHooks.afterLeave </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            state.isLeaving </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">            instance.</span><span style="color:#6F42C1;">update</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">emptyPlaceholder</span><span style="color:#24292E;">(child)</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (mode </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;in-out&#39;</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">          leavingHooks.delayLeave </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (el, earlyRemove, delayedLeave) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> leavingVNodesCache </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getLeavingNodesForType</span><span style="color:#24292E;">(state, oldInnerChild)</span></span>
<span class="line"><span style="color:#24292E;">            leavingVNodesCache[</span><span style="color:#6F42C1;">String</span><span style="color:#24292E;">(oldInnerChild.key)] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> oldInnerChild</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#6A737D;">// early removal callback</span></span>
<span class="line"><span style="color:#24292E;">            el._leaveCb </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#6F42C1;">earlyRemove</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">              el._leaveCb </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> undefined</span></span>
<span class="line"><span style="color:#24292E;">              delete enterHooks.delayedLeave</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">            enterHooks.delayedLeave </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> delayedLeave</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> child</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>可以看到，Transition 组件是在 BaseTransition 的基础上封装的高阶函数式组件。由于整个 Transition 的实现代码较多，我就挑重点，为你讲清楚整体的实现思路。</p><p>我把 Transition 组件的实现分成组件的渲染、钩子函数的执行、模式的应用三个部分去详细说明。</p><h4 id="组件的渲染" tabindex="-1">组件的渲染 <a class="header-anchor" href="#组件的渲染" aria-label="Permalink to &quot;组件的渲染&quot;">​</a></h4><p>先来看 Transition 组件是如何渲染的。我们重点看 setup 函数部分的逻辑。</p><p>Transition 组件和前面学习的 KeepAlive 组件一样，是一个抽象组件，组件本身不渲染任何实体节点，只渲染第一个子元素节点。</p><blockquote><p>注意，Transition 组件内部只能嵌套一个子元素节点，如果有多个节点需要用 TransitionGroup 组件。</p></blockquote><p>如果 Transition 组件内部嵌套的是 KeepAlive 组件，那么它会继续查找 KeepAlive 组件嵌套的第一个子元素节点，来作为渲染的元素节点。</p><p>如果 Transition 组件内部没有嵌套任何子节点，那么它会渲染空的注释节点。</p><p>在渲染的过程中，Transition 组件还会通过 resolveTransitionHooks 去定义组件创建和删除阶段的钩子函数对象，然后再通过 setTransitionHooks函数去把这个钩子函数对象设置到 vnode.transition 上。</p><p>渲染过程中，还会判断这是否是一次更新渲染，如果是会对不同的模式执行不同的处理逻辑，我会在后续介绍模式的应用时详细说明。</p><p>以上就是 Transition 组件渲染做的事情，你需要记住的是<strong>Transition 渲染的是组件嵌套的第一个子元素节点</strong>。</p><p>但是 Transition 是如何在节点的创建和删除过程中设置那些与过渡动画相关的 CSS 的呢？这些都与钩子函数相关，我们先来看 setTransitionHooks 的实现，看看它定义的钩子函数对象是怎样的：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function </span><span style="color:#B392F0;">resolveTransitionHooks</span><span style="color:#E1E4E8;">(vnode, props, state, instance) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> { appear, mode, persisted </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">, onBeforeEnter, onEnter, onAfterEnter, onEnterCancelled, onBeforeLeave, onLeave, onAfterLeave, onLeaveCancelled, onBeforeAppear, onAppear, onAfterAppear, onAppearCancelled } </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> props</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> key </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">String</span><span style="color:#E1E4E8;">(vnode.key)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> leavingVNodesCache </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getLeavingNodesForType</span><span style="color:#E1E4E8;">(state, vnode)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> callHook </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (hook, args) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    hook </span><span style="color:#F97583;">&amp;&amp;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">callWithAsyncErrorHandling</span><span style="color:#E1E4E8;">(hook, instance, </span><span style="color:#79B8FF;">9</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">/* TRANSITION_HOOK */</span><span style="color:#E1E4E8;">, args)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> hooks </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    mode,</span></span>
<span class="line"><span style="color:#E1E4E8;">    persisted,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">beforeEnter</span><span style="color:#E1E4E8;">(el) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      let hook </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> onBeforeEnter</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">state.isMounted) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (appear) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          hook </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> onBeforeAppear </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> onBeforeEnter</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">return</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (el._leaveCb) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        el.</span><span style="color:#B392F0;">_leaveCb</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">/* cancelled */</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> leavingVNode </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> leavingVNodesCache[key]</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (leavingVNode </span><span style="color:#F97583;">&amp;&amp;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">isSameVNodeType</span><span style="color:#E1E4E8;">(vnode, leavingVNode) </span><span style="color:#F97583;">&amp;&amp;</span></span>
<span class="line"><span style="color:#E1E4E8;">        leavingVNode.el._leaveCb) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        leavingVNode.el.</span><span style="color:#B392F0;">_leaveCb</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">callHook</span><span style="color:#E1E4E8;">(hook, [el])</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">enter</span><span style="color:#E1E4E8;">(el) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      let hook </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> onEnter</span></span>
<span class="line"><span style="color:#E1E4E8;">      let afterHook </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> onAfterEnter</span></span>
<span class="line"><span style="color:#E1E4E8;">      let cancelHook </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> onEnterCancelled</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">state.isMounted) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (appear) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          hook </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> onAppear </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> onEnter</span></span>
<span class="line"><span style="color:#E1E4E8;">          afterHook </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> onAfterAppear </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> onAfterEnter</span></span>
<span class="line"><span style="color:#E1E4E8;">          cancelHook </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> onAppearCancelled </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> onEnterCancelled</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">return</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      let called </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> done </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (el._enterCb </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (cancelled) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (called)</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">return</span></span>
<span class="line"><span style="color:#E1E4E8;">        called </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (cancelled) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">callHook</span><span style="color:#E1E4E8;">(cancelHook, [el])</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">callHook</span><span style="color:#E1E4E8;">(afterHook, [el])</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (hooks.delayedLeave) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          hooks.</span><span style="color:#B392F0;">delayedLeave</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        el._enterCb </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> undefined</span></span>
<span class="line"><span style="color:#E1E4E8;">      })</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (hook) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">hook</span><span style="color:#E1E4E8;">(el, done)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (hook.length </span><span style="color:#F97583;">&lt;=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">done</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">done</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">leave</span><span style="color:#E1E4E8;">(el, remove) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> key </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">String</span><span style="color:#E1E4E8;">(vnode.key)</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (el._enterCb) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        el.</span><span style="color:#B392F0;">_enterCb</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">/* cancelled */</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (state.isUnmounting) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">remove</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">callHook</span><span style="color:#E1E4E8;">(onBeforeLeave, [el])</span></span>
<span class="line"><span style="color:#E1E4E8;">      let called </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> done </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (el._leaveCb </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (cancelled) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (called)</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">return</span></span>
<span class="line"><span style="color:#E1E4E8;">        called </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">remove</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (cancelled) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">callHook</span><span style="color:#E1E4E8;">(onLeaveCancelled, [el])</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">callHook</span><span style="color:#E1E4E8;">(onAfterLeave, [el])</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">        el._leaveCb </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> undefined</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (leavingVNodesCache[key] </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> vnode) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          delete leavingVNodesCache[key]</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      })</span></span>
<span class="line"><span style="color:#E1E4E8;">      leavingVNodesCache[key] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> vnode</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (onLeave) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">onLeave</span><span style="color:#E1E4E8;">(el, done)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (onLeave.length </span><span style="color:#F97583;">&lt;=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#B392F0;">done</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">done</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">clone</span><span style="color:#E1E4E8;">(vnode) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">resolveTransitionHooks</span><span style="color:#E1E4E8;">(vnode, props, state, instance)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> hooks</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function </span><span style="color:#6F42C1;">resolveTransitionHooks</span><span style="color:#24292E;">(vnode, props, state, instance) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> { appear, mode, persisted </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">, onBeforeEnter, onEnter, onAfterEnter, onEnterCancelled, onBeforeLeave, onLeave, onAfterLeave, onLeaveCancelled, onBeforeAppear, onAppear, onAfterAppear, onAppearCancelled } </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> props</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> key </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">String</span><span style="color:#24292E;">(vnode.key)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> leavingVNodesCache </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getLeavingNodesForType</span><span style="color:#24292E;">(state, vnode)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> callHook </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (hook, args) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    hook </span><span style="color:#D73A49;">&amp;&amp;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">callWithAsyncErrorHandling</span><span style="color:#24292E;">(hook, instance, </span><span style="color:#005CC5;">9</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">/* TRANSITION_HOOK */</span><span style="color:#24292E;">, args)</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> hooks </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    mode,</span></span>
<span class="line"><span style="color:#24292E;">    persisted,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">beforeEnter</span><span style="color:#24292E;">(el) {</span></span>
<span class="line"><span style="color:#24292E;">      let hook </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> onBeforeEnter</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">state.isMounted) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (appear) {</span></span>
<span class="line"><span style="color:#24292E;">          hook </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> onBeforeAppear </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> onBeforeEnter</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">return</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (el._leaveCb) {</span></span>
<span class="line"><span style="color:#24292E;">        el.</span><span style="color:#6F42C1;">_leaveCb</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">true</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">/* cancelled */</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> leavingVNode </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> leavingVNodesCache[key]</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (leavingVNode </span><span style="color:#D73A49;">&amp;&amp;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">isSameVNodeType</span><span style="color:#24292E;">(vnode, leavingVNode) </span><span style="color:#D73A49;">&amp;&amp;</span></span>
<span class="line"><span style="color:#24292E;">        leavingVNode.el._leaveCb) {</span></span>
<span class="line"><span style="color:#24292E;">        leavingVNode.el.</span><span style="color:#6F42C1;">_leaveCb</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">callHook</span><span style="color:#24292E;">(hook, [el])</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">enter</span><span style="color:#24292E;">(el) {</span></span>
<span class="line"><span style="color:#24292E;">      let hook </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> onEnter</span></span>
<span class="line"><span style="color:#24292E;">      let afterHook </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> onAfterEnter</span></span>
<span class="line"><span style="color:#24292E;">      let cancelHook </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> onEnterCancelled</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">state.isMounted) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (appear) {</span></span>
<span class="line"><span style="color:#24292E;">          hook </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> onAppear </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> onEnter</span></span>
<span class="line"><span style="color:#24292E;">          afterHook </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> onAfterAppear </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> onAfterEnter</span></span>
<span class="line"><span style="color:#24292E;">          cancelHook </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> onAppearCancelled </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> onEnterCancelled</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">return</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      let called </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> done </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (el._enterCb </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (cancelled) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (called)</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">return</span></span>
<span class="line"><span style="color:#24292E;">        called </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (cancelled) {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">callHook</span><span style="color:#24292E;">(cancelHook, [el])</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">callHook</span><span style="color:#24292E;">(afterHook, [el])</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (hooks.delayedLeave) {</span></span>
<span class="line"><span style="color:#24292E;">          hooks.</span><span style="color:#6F42C1;">delayedLeave</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        el._enterCb </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> undefined</span></span>
<span class="line"><span style="color:#24292E;">      })</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (hook) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">hook</span><span style="color:#24292E;">(el, done)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (hook.length </span><span style="color:#D73A49;">&lt;=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">done</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">done</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">leave</span><span style="color:#24292E;">(el, remove) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> key </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">String</span><span style="color:#24292E;">(vnode.key)</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (el._enterCb) {</span></span>
<span class="line"><span style="color:#24292E;">        el.</span><span style="color:#6F42C1;">_enterCb</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">true</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">/* cancelled */</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (state.isUnmounting) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">remove</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">callHook</span><span style="color:#24292E;">(onBeforeLeave, [el])</span></span>
<span class="line"><span style="color:#24292E;">      let called </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> done </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (el._leaveCb </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (cancelled) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (called)</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">return</span></span>
<span class="line"><span style="color:#24292E;">        called </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">remove</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (cancelled) {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">callHook</span><span style="color:#24292E;">(onLeaveCancelled, [el])</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">callHook</span><span style="color:#24292E;">(onAfterLeave, [el])</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">        el._leaveCb </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> undefined</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (leavingVNodesCache[key] </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> vnode) {</span></span>
<span class="line"><span style="color:#24292E;">          delete leavingVNodesCache[key]</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      })</span></span>
<span class="line"><span style="color:#24292E;">      leavingVNodesCache[key] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> vnode</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (onLeave) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">onLeave</span><span style="color:#24292E;">(el, done)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (onLeave.length </span><span style="color:#D73A49;">&lt;=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6F42C1;">done</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">done</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">clone</span><span style="color:#24292E;">(vnode) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">resolveTransitionHooks</span><span style="color:#24292E;">(vnode, props, state, instance)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> hooks</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>钩子函数对象定义了 4 个钩子函数，分别是 beforeEnter，enter，leave 和 clone，它们的执行时机是什么，又是怎么处理 我们给 Transition 组件传递的一些 Prop 的？其中，beforeEnter、enter 和 leave 发生在元素的插入和删除阶段，接下来我们就来分析这几个钩子函数的执行过程。</p><p>好的，今天我们就先讲到这里，下节课继续分析钩子函数的执行。</p><blockquote><p>本节课的相关代码在源代码中的位置如下：</p><p>packages/runtime-core/src/components/BasetTransition.ts</p><p>packages/runtime-core/src/renderer.ts</p><p>packages/runtime-dom/src/components/Transition.ts</p></blockquote>`,26);function y(i,F,d,A,C,D){const n=l("Image");return p(),o("div",null,[r,e(n,{alt:"transitions.png",src:"https://s0.lgstatic.com/i/image/M00/55/F3/CgqCHl9q7XSAZVLbAAIHrhK4PT8658.png"}),t(),E])}const v=a(c,[["render",y]]);export{g as __pageData,v as default};
