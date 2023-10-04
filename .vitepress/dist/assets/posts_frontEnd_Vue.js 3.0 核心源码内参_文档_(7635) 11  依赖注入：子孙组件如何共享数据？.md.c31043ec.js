import{_ as l,j as p,o,g as e,k as a,Q as s}from"./chunks/framework.e0c66c3f.js";const D=JSON.parse('{"title":"provide API ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Vue.js 3.0 核心源码内参_文档/(7635) 11  依赖注入：子孙组件如何共享数据？.md","filePath":"posts/frontEnd/Vue.js 3.0 核心源码内参_文档/(7635) 11  依赖注入：子孙组件如何共享数据？.md","lastUpdated":null}'),t={name:"posts/frontEnd/Vue.js 3.0 核心源码内参_文档/(7635) 11  依赖注入：子孙组件如何共享数据？.md"},c=s(`<p>Vue.js 为我们提供了很多组件通讯的方式，常见的是父子组件通过 prop 传递数据。但是有时，我们希望能<strong>跨父子组件通讯</strong>，比如，无论组件之间嵌套多少层级，我都希望在后代组件中能访问它们祖先组件的数据。</p><p>Vue.js 2.x 给我们提供了一种依赖注入的解决方案，即在祖先组件提供一个 provide 选项，举个例子：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// Provider </span></span>
<span class="line"><span style="color:#E1E4E8;">export </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#E1E4E8;">  provide</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">function</span><span style="color:#E1E4E8;"> () { </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#E1E4E8;">      foo</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.foo </span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// Provider </span></span>
<span class="line"><span style="color:#24292E;">export </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#24292E;">  provide</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">function</span><span style="color:#24292E;"> () { </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#24292E;">      foo</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.foo </span></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"><span style="color:#24292E;">  } </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这就相当于在祖先组件提供 foo 这个变量数据，我们就可以在任意子孙组件中注入这个变量数据：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// Consumer </span></span>
<span class="line"><span style="color:#E1E4E8;">export </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#E1E4E8;">  inject</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> [</span><span style="color:#9ECBFF;">&#39;foo&#39;</span><span style="color:#E1E4E8;">] </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// Consumer </span></span>
<span class="line"><span style="color:#24292E;">export </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#24292E;">  inject</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> [</span><span style="color:#032F62;">&#39;foo&#39;</span><span style="color:#24292E;">] </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这样，我们就可以在子孙组件中通过 this.foo 访问祖先组件提供的数据，以达到组件通讯的目的。</p><p>到了 Vue.js 3.0，除了可以继续沿用这种 Options 的依赖注入，还可以使用依赖注入的 API 函数 provide 和 inject，你可以在 setup 函数中调用它们。</p><p>举个例子，我们在祖先组件调用 provide API：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// Provider </span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { provide, ref } from &#39;vue&#39; </span></span>
<span class="line"><span style="color:#E1E4E8;">export </span><span style="color:#FDAEB7;font-style:italic;">default</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#E1E4E8;">  setup() { </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">const</span><span style="color:#E1E4E8;"> theme = ref(&#39;dark&#39;) </span></span>
<span class="line"><span style="color:#E1E4E8;">    provide(&#39;theme&#39;, theme) </span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// Provider </span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { provide, ref } from &#39;vue&#39; </span></span>
<span class="line"><span style="color:#24292E;">export </span><span style="color:#B31D28;font-style:italic;">default</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#24292E;">  setup() { </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">const</span><span style="color:#24292E;"> theme = ref(&#39;dark&#39;) </span></span>
<span class="line"><span style="color:#24292E;">    provide(&#39;theme&#39;, theme) </span></span>
<span class="line"><span style="color:#24292E;">  } </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>然后在子孙组件调用 inject API：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// Consumer </span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { inject } from &#39;vue&#39; </span></span>
<span class="line"><span style="color:#E1E4E8;">export </span><span style="color:#FDAEB7;font-style:italic;">default</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#E1E4E8;">  setup() { </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">const</span><span style="color:#E1E4E8;"> theme = inject(&#39;theme&#39;, &#39;light&#39;) </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">return</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#E1E4E8;">      theme </span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// Consumer </span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { inject } from &#39;vue&#39; </span></span>
<span class="line"><span style="color:#24292E;">export </span><span style="color:#B31D28;font-style:italic;">default</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#24292E;">  setup() { </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">const</span><span style="color:#24292E;"> theme = inject(&#39;theme&#39;, &#39;light&#39;) </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">return</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#24292E;">      theme </span></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"><span style="color:#24292E;">  } </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这里要说明的是，inject 函数接受第二个参数作为默认值，如果祖先组件上下文没有提供 theme，则使用这个默认值。</p><p>实际上，你可以把依赖注入看作一部分&quot;大范围有效的 prop&quot;，而且它的规则更加宽松：<strong>祖先组件不需要知道哪些后代组件在使用它提供的数据，后代组件也不需要知道注入的数据来自哪里</strong>。</p><p>那么，依赖注入的背后实现原理是怎样的呢？接下来我们就一起分析吧。</p><h3 id="provide-api" tabindex="-1">provide API <a class="header-anchor" href="#provide-api" aria-label="Permalink to &quot;provide API&quot;">​</a></h3><p>我们先来分析 provide API 的实现原理：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function </span><span style="color:#B392F0;">provide</span><span style="color:#E1E4E8;">(key, value) { </span></span>
<span class="line"><span style="color:#E1E4E8;">  let provides </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> currentInstance.provides </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> parentProvides </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> currentInstance.parent </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> currentInstance.parent.provides </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (parentProvides </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> provides) { </span></span>
<span class="line"><span style="color:#E1E4E8;">    provides </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> currentInstance.provides </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Object.</span><span style="color:#B392F0;">create</span><span style="color:#E1E4E8;">(parentProvides) </span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span></span>
<span class="line"><span style="color:#E1E4E8;">  provides[key] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> value </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function </span><span style="color:#6F42C1;">provide</span><span style="color:#24292E;">(key, value) { </span></span>
<span class="line"><span style="color:#24292E;">  let provides </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> currentInstance.provides </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> parentProvides </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> currentInstance.parent </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> currentInstance.parent.provides </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (parentProvides </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> provides) { </span></span>
<span class="line"><span style="color:#24292E;">    provides </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> currentInstance.provides </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Object.</span><span style="color:#6F42C1;">create</span><span style="color:#24292E;">(parentProvides) </span></span>
<span class="line"><span style="color:#24292E;">  } </span></span>
<span class="line"><span style="color:#24292E;">  provides[key] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> value </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>在创建组件实例的时候，组件实例的 provides 对象指向父组件实例的 provides 对象：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> instance </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 依赖注入相关 </span></span>
<span class="line"><span style="color:#E1E4E8;">  provides</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> parent </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> parent.provides </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> Object.</span><span style="color:#B392F0;">create</span><span style="color:#E1E4E8;">(appContext.provides), </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 其它属性 </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// ... </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> instance </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 依赖注入相关 </span></span>
<span class="line"><span style="color:#24292E;">  provides</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> parent </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> parent.provides </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> Object.</span><span style="color:#6F42C1;">create</span><span style="color:#24292E;">(appContext.provides), </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 其它属性 </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// ... </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>这里，我们可以通过一张图直观感受一下它们之间的关系：</p>`,20),r=s(`<p>所以在默认情况下，组件实例的 provides 继承它的父组件，但是当组件实例需要提供自己的值的时候，它使用父级提供的对象创建自己的 provides 的对象原型。通过这种方式，在 inject 阶段，我们可以非常容易通过原型链查找来自直接父级提供的数据。</p><p>另外，如果组件实例提供和父级 provides 中有相同 key 的数据，是可以覆盖父级提供的数据。举个例子：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { createApp, h, provide, inject } from &#39;vue&#39; </span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">const</span><span style="color:#E1E4E8;"> ProviderOne = { </span></span>
<span class="line"><span style="color:#E1E4E8;">  setup () { </span></span>
<span class="line"><span style="color:#E1E4E8;">    provide(&#39;foo&#39;, &#39;foo&#39;) </span></span>
<span class="line"><span style="color:#E1E4E8;">    provide(&#39;bar&#39;, &#39;bar&#39;) </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">return</span><span style="color:#E1E4E8;"> () =&gt; h(ProviderTwo) </span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span></span>
<span class="line"><span style="color:#E1E4E8;">} </span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">const</span><span style="color:#E1E4E8;"> ProviderTwo = { </span></span>
<span class="line"><span style="color:#E1E4E8;">  setup () { </span></span>
<span class="line"><span style="color:#E1E4E8;">    provide(&#39;foo&#39;, &#39;fooOverride&#39;) </span></span>
<span class="line"><span style="color:#E1E4E8;">    provide(&#39;baz&#39;, &#39;baz&#39;) </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">return</span><span style="color:#E1E4E8;"> () =&gt; h(Consumer) </span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span></span>
<span class="line"><span style="color:#E1E4E8;">} </span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">const</span><span style="color:#E1E4E8;"> Consumer = { </span></span>
<span class="line"><span style="color:#E1E4E8;">  setup () { </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">const</span><span style="color:#E1E4E8;"> foo = inject(&#39;foo&#39;) </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">const</span><span style="color:#E1E4E8;"> bar = inject(&#39;bar&#39;) </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">const</span><span style="color:#E1E4E8;"> baz = inject(&#39;baz&#39;) </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">return</span><span style="color:#E1E4E8;"> () =&gt; h(&#39;div&#39;, [foo, bar, baz].join(&#39;&amp;&#39;)) </span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span></span>
<span class="line"><span style="color:#E1E4E8;">} </span></span>
<span class="line"><span style="color:#E1E4E8;">createApp(ProviderOne).mount(&#39;#app&#39;)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { createApp, h, provide, inject } from &#39;vue&#39; </span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">const</span><span style="color:#24292E;"> ProviderOne = { </span></span>
<span class="line"><span style="color:#24292E;">  setup () { </span></span>
<span class="line"><span style="color:#24292E;">    provide(&#39;foo&#39;, &#39;foo&#39;) </span></span>
<span class="line"><span style="color:#24292E;">    provide(&#39;bar&#39;, &#39;bar&#39;) </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">return</span><span style="color:#24292E;"> () =&gt; h(ProviderTwo) </span></span>
<span class="line"><span style="color:#24292E;">  } </span></span>
<span class="line"><span style="color:#24292E;">} </span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">const</span><span style="color:#24292E;"> ProviderTwo = { </span></span>
<span class="line"><span style="color:#24292E;">  setup () { </span></span>
<span class="line"><span style="color:#24292E;">    provide(&#39;foo&#39;, &#39;fooOverride&#39;) </span></span>
<span class="line"><span style="color:#24292E;">    provide(&#39;baz&#39;, &#39;baz&#39;) </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">return</span><span style="color:#24292E;"> () =&gt; h(Consumer) </span></span>
<span class="line"><span style="color:#24292E;">  } </span></span>
<span class="line"><span style="color:#24292E;">} </span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">const</span><span style="color:#24292E;"> Consumer = { </span></span>
<span class="line"><span style="color:#24292E;">  setup () { </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">const</span><span style="color:#24292E;"> foo = inject(&#39;foo&#39;) </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">const</span><span style="color:#24292E;"> bar = inject(&#39;bar&#39;) </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">const</span><span style="color:#24292E;"> baz = inject(&#39;baz&#39;) </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">return</span><span style="color:#24292E;"> () =&gt; h(&#39;div&#39;, [foo, bar, baz].join(&#39;&amp;&#39;)) </span></span>
<span class="line"><span style="color:#24292E;">  } </span></span>
<span class="line"><span style="color:#24292E;">} </span></span>
<span class="line"><span style="color:#24292E;">createApp(ProviderOne).mount(&#39;#app&#39;)</span></span></code></pre></div><p>可以看到，这是一个嵌套 provider 的情况。根据 provide 函数的实现，ProviderTwo 提供的 key 为 foo 的 provider 会覆盖 ProviderOne 提供的 key 为 foo 的 provider，所以最后渲染在 Consumer 组件上的就是 <code>fooOverride&amp;bar&amp;baz</code> 。</p><p>接下来，我们来分析另一个依赖注入的 API ------ inject。</p><h3 id="inject-api" tabindex="-1">inject API <a class="header-anchor" href="#inject-api" aria-label="Permalink to &quot;inject API&quot;">​</a></h3><p>我们先来看 inject API 的实现原理：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">function </span><span style="color:#B392F0;">inject</span><span style="color:#E1E4E8;">(key, defaultValue) { </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> instance </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> currentInstance </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> currentRenderingInstance </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (instance) { </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> provides </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> instance.provides </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (key in provides) { </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> provides[key] </span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (arguments.length </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">) { </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> defaultValue </span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> ((p<wbr>rocess.env.NODE_ENV </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;production&#39;</span><span style="color:#E1E4E8;">)) { </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">warn</span><span style="color:#E1E4E8;">(\`injection </span><span style="color:#9ECBFF;">&quot;\${String(key)}&quot;</span><span style="color:#E1E4E8;"> not found.\`) </span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">function </span><span style="color:#6F42C1;">inject</span><span style="color:#24292E;">(key, defaultValue) { </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> instance </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> currentInstance </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> currentRenderingInstance </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (instance) { </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> provides </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> instance.provides </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (key in provides) { </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> provides[key] </span></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (arguments.length </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">) { </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> defaultValue </span></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> ((p<wbr>rocess.env.NODE_ENV </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;production&#39;</span><span style="color:#24292E;">)) { </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">warn</span><span style="color:#24292E;">(\`injection </span><span style="color:#032F62;">&quot;\${String(key)}&quot;</span><span style="color:#24292E;"> not found.\`) </span></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"><span style="color:#24292E;">  } </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>前文我们已经分析了 provide 的实现后，在此基础上，理解 inject 的实现就非常简单了。inject 支持两个参数，第一个参数是 key，我们可以访问组件实例中的 provides 对象对应的 key，层层查找父级提供的数据。第二个参数是默认值，如果查找不到数据，则直接返回默认值。</p><p>如果既查找不到数据且也没有传入默认值，则在非生产环境下报警告，提示用户找不到这个注入的数据。</p><p>到这里我们就掌握了 provide 和 inject 的实现原理。但是，我曾经看到过一个问题：&quot; Vue.js 3 跨组件共享数据，为何要用 provide/inject ？直接 export/import 数据行吗？&quot;</p><p>接下来我们就来探讨依赖注入和模块化共享数据的差异。</p><h3 id="对比模块化共享数据的方式" tabindex="-1">对比模块化共享数据的方式 <a class="header-anchor" href="#对比模块化共享数据的方式" aria-label="Permalink to &quot;对比模块化共享数据的方式&quot;">​</a></h3><p>我们先来看提问者给出的一个模块化共享数据的示例，即首先在根组件创建一个共享的数据 sharedData：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// Root.js </span></span>
<span class="line"><span style="color:#E1E4E8;">export </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> sharedData </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">) </span></span>
<span class="line"><span style="color:#E1E4E8;">export </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#E1E4E8;">  name</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;Root&#39;</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// ... </span></span>
<span class="line"><span style="color:#E1E4E8;">  }, </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// ... </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// Root.js </span></span>
<span class="line"><span style="color:#24292E;">export </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> sharedData </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">) </span></span>
<span class="line"><span style="color:#24292E;">export </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#24292E;">  name</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;Root&#39;</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// ... </span></span>
<span class="line"><span style="color:#24292E;">  }, </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// ... </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>然后在子组件中使用 sharedData：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { sharedData } from &#39;./Root.js&#39; </span></span>
<span class="line"><span style="color:#E1E4E8;">export </span><span style="color:#FDAEB7;font-style:italic;">default</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#E1E4E8;">  name: &#39;Root&#39;, </span></span>
<span class="line"><span style="color:#E1E4E8;">  setup() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 这里直接使用 sharedData 即可 </span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { sharedData } from &#39;./Root.js&#39; </span></span>
<span class="line"><span style="color:#24292E;">export </span><span style="color:#B31D28;font-style:italic;">default</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#24292E;">  name: &#39;Root&#39;, </span></span>
<span class="line"><span style="color:#24292E;">  setup() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 这里直接使用 sharedData 即可 </span></span>
<span class="line"><span style="color:#24292E;">  } </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>当然，从这个示例上来看，模块化的方式是可以共享数据，但是 provide 和 inject 与模块化方式有如下几点不同。</p><ul><li><strong>作用域不同</strong></li></ul><p>对于依赖注入，它的作用域是局部范围，所以你只能把数据注入以这个节点为根的后代组件中，不是这棵子树上的组件是不能访问到该数据的；而对于模块化的方式，它的作用域是全局范围的，你可以在任何地方引用它导出的数据。</p><ul><li><strong>数据来源不同</strong></li></ul><p>对于依赖注入，后代组件是不需要知道注入的数据来自哪里，只管注入并使用即可；而对于模块化的方式提供的数据，用户必须明确知道这个数据是在哪个模块定义的，从而引入它。</p><ul><li><strong>上下文不同</strong></li></ul><p>对于依赖注入，提供数据的组件的上下文就是组件实例，而且同一个组件定义是可以有多个组件实例的，我们可以根据不同的组件上下文提供不同的数据给后代组件；而对于模块化提供的数据，它是没有任何上下文的，仅仅是这个模块定义的数据，如果想要根据不同的情况提供不同数据，那么从 API 层面设计就需要做更改。</p><p>比如允许用户传递一个参数：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">export function </span><span style="color:#B392F0;">getShareData</span><span style="color:#E1E4E8;">(context) { </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 根据不同的 context 参数返回不同的数据 </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">export function </span><span style="color:#6F42C1;">getShareData</span><span style="color:#24292E;">(context) { </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 根据不同的 context 参数返回不同的数据 </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>掌握了这些不同，在不同场景下你就应该知道选择哪种方式提供数据了。</p><h3 id="依赖注入的缺陷和应用场景" tabindex="-1">依赖注入的缺陷和应用场景 <a class="header-anchor" href="#依赖注入的缺陷和应用场景" aria-label="Permalink to &quot;依赖注入的缺陷和应用场景&quot;">​</a></h3><p>我们再回到依赖注入，它确实提供了一种组件共享的方式，但并非完美的。正因为依赖注入是上下文相关的，所以它会将你应用程序中的组件与它们当前的组织方式耦合起来，这使得重构变得困难。</p><p>来回顾一下依赖注入的特点 ：<strong>祖先组件不需要知道哪些后代组件使用它提供的数据</strong> ，<strong>后代组件也不需要知道注入的数据来自哪里</strong>。</p><p>如果在一次重构中我们不小心挪动了有依赖注入的后代组件的位置，或者是挪动了提供数据的祖先组件的位置，都有可能导致后代组件丢失注入的数据，进而导致应用程序异常。所以，我<strong>并不推荐在普通应用程序代码中使用依赖注入</strong>。</p><p>但是我推荐你在组件库的开发中使用，因为对于一个特定组件，它和其嵌套的子组件上下文联系很紧密。</p><p>这里来举一个 Element-UI 组件库 Select 组件的例子：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#79B8FF;">el-select</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">v-model</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;value&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">placeholder</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;请选择&quot;</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#79B8FF;">el-option</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">v-for</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;item in options&quot;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#FDAEB7;font-style:italic;">:key=&quot;item.value&quot;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#FDAEB7;font-style:italic;">:label=&quot;item.label&quot;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#FDAEB7;font-style:italic;">:value=&quot;item.value&quot;&gt;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">&lt;/el-option&gt;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">&lt;/el-select&gt;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;/template&gt;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;script&gt;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">default</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">data</span><span style="color:#E1E4E8;">() { </span></span>
<span class="line"><span style="color:#E1E4E8;">      return { </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">options</span><span style="color:#E1E4E8;">: [{ </span></span>
<span class="line"><span style="color:#E1E4E8;">          value: </span><span style="color:#9ECBFF;">&#39;选项1&#39;</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">          label: </span><span style="color:#9ECBFF;">&#39;黄金糕&#39;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">        }, { </span></span>
<span class="line"><span style="color:#E1E4E8;">          value: </span><span style="color:#9ECBFF;">&#39;选项2&#39;</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">          label: </span><span style="color:#9ECBFF;">&#39;双皮奶&#39;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">        }, { </span></span>
<span class="line"><span style="color:#E1E4E8;">          value: </span><span style="color:#9ECBFF;">&#39;选项3&#39;</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">          label: </span><span style="color:#9ECBFF;">&#39;蚵仔煎&#39;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">        }, { </span></span>
<span class="line"><span style="color:#E1E4E8;">          value: </span><span style="color:#9ECBFF;">&#39;选项4&#39;</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">          label: </span><span style="color:#9ECBFF;">&#39;龙须面&#39;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">        }, { </span></span>
<span class="line"><span style="color:#E1E4E8;">          value: </span><span style="color:#9ECBFF;">&#39;选项5&#39;</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">          label: </span><span style="color:#9ECBFF;">&#39;北京烤鸭&#39;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">        }], </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">value</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">      } </span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;/script&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#005CC5;">el-select</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">v-model</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;value&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">placeholder</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;请选择&quot;</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#005CC5;">el-option</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">v-for</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;item in options&quot;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#B31D28;font-style:italic;">:key=&quot;item.value&quot;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#B31D28;font-style:italic;">:label=&quot;item.label&quot;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#B31D28;font-style:italic;">:value=&quot;item.value&quot;&gt;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">&lt;/el-option&gt;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">&lt;/el-select&gt;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;/template&gt;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;script&gt;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">export</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">default</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">data</span><span style="color:#24292E;">() { </span></span>
<span class="line"><span style="color:#24292E;">      return { </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">options</span><span style="color:#24292E;">: [{ </span></span>
<span class="line"><span style="color:#24292E;">          value: </span><span style="color:#032F62;">&#39;选项1&#39;</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">          label: </span><span style="color:#032F62;">&#39;黄金糕&#39;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">        }, { </span></span>
<span class="line"><span style="color:#24292E;">          value: </span><span style="color:#032F62;">&#39;选项2&#39;</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">          label: </span><span style="color:#032F62;">&#39;双皮奶&#39;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">        }, { </span></span>
<span class="line"><span style="color:#24292E;">          value: </span><span style="color:#032F62;">&#39;选项3&#39;</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">          label: </span><span style="color:#032F62;">&#39;蚵仔煎&#39;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">        }, { </span></span>
<span class="line"><span style="color:#24292E;">          value: </span><span style="color:#032F62;">&#39;选项4&#39;</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">          label: </span><span style="color:#032F62;">&#39;龙须面&#39;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">        }, { </span></span>
<span class="line"><span style="color:#24292E;">          value: </span><span style="color:#032F62;">&#39;选项5&#39;</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">          label: </span><span style="color:#032F62;">&#39;北京烤鸭&#39;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">        }], </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">value</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">      } </span></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"><span style="color:#24292E;">  } </span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;/script&gt;</span></span></code></pre></div><p>这是 Select 组件的基础示例，它最终会在页面上渲染成这样：</p>`,35),E=s(`<p>子组件 ElOption 负责渲染每一个选项，它的内部想要访问最外层的 ElSelect 组件时，就可以通过依赖注入的方式，在 ElSelect 组件中提供组件的实例：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">export </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">provide</span><span style="color:#E1E4E8;">() { </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&#39;select&#39;</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    }; </span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">export </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">provide</span><span style="color:#24292E;">() { </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&#39;select&#39;</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    }; </span></span>
<span class="line"><span style="color:#24292E;">  } </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>就这样，我们可以在 ElOption 组件注入这个数据：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">export </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#E1E4E8;">  inject</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> [</span><span style="color:#9ECBFF;">&#39;select&#39;</span><span style="color:#E1E4E8;">] </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">export </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#24292E;">  inject</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> [</span><span style="color:#032F62;">&#39;select&#39;</span><span style="color:#24292E;">] </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>虽然这些代码还是用的 Vue.js 2.x 的 Options API 方式，但是依赖注入的思想是不变的。</p><p>你可能会问，为什么不在 ElOption 子组件内通过 this.$parent 访问外层的 ElSelect 组件实例呢？</p><p>虽然 this.$parent 指向的是它的父组件实例，在我们这个例子是可以的，但如果组件结构发生了变化呢？</p><p>我们再来看另一个 Select 组件的例子：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#79B8FF;">el-select</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">v-model</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;value&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">placeholder</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;请选择&quot;</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#79B8FF;">el-option-group</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">v-for</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;group in options&quot;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#FDAEB7;font-style:italic;">:key=&quot;group.label&quot;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#FDAEB7;font-style:italic;">:label=&quot;group.label&quot;&gt;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#FDAEB7;font-style:italic;">&lt;el-option</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">v-for</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;item in group.options&quot;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#FDAEB7;font-style:italic;">:key=&quot;item.value&quot;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#FDAEB7;font-style:italic;">:label=&quot;item.label&quot;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#FDAEB7;font-style:italic;">:value=&quot;item.value&quot;&gt;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#FDAEB7;font-style:italic;">&lt;/el-option&gt;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FDAEB7;font-style:italic;">&lt;/el-option-group&gt;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FDAEB7;font-style:italic;">&lt;/el-select&gt;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;/template&gt;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;script&gt;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">default</span><span style="color:#E1E4E8;"> { </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">data</span><span style="color:#E1E4E8;">() { </span></span>
<span class="line"><span style="color:#E1E4E8;">      return { </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">options</span><span style="color:#E1E4E8;">: [{ </span></span>
<span class="line"><span style="color:#E1E4E8;">          label: </span><span style="color:#9ECBFF;">&#39;热门城市&#39;</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">          options: [{ </span></span>
<span class="line"><span style="color:#E1E4E8;">            value: </span><span style="color:#9ECBFF;">&#39;Shanghai&#39;</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">            label: </span><span style="color:#9ECBFF;">&#39;上海&#39;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">          }, { </span></span>
<span class="line"><span style="color:#E1E4E8;">            value: </span><span style="color:#9ECBFF;">&#39;Beijing&#39;</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">            label: </span><span style="color:#9ECBFF;">&#39;北京&#39;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">          }] </span></span>
<span class="line"><span style="color:#E1E4E8;">        }, { </span></span>
<span class="line"><span style="color:#E1E4E8;">          label: </span><span style="color:#9ECBFF;">&#39;城市名&#39;</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">          options: [{ </span></span>
<span class="line"><span style="color:#E1E4E8;">            value: </span><span style="color:#9ECBFF;">&#39;Chengdu&#39;</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">            label: </span><span style="color:#9ECBFF;">&#39;成都&#39;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">          }, { </span></span>
<span class="line"><span style="color:#E1E4E8;">            value: </span><span style="color:#9ECBFF;">&#39;Shenzhen&#39;</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">            label: </span><span style="color:#9ECBFF;">&#39;深圳&#39;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">          }, { </span></span>
<span class="line"><span style="color:#E1E4E8;">            value: </span><span style="color:#9ECBFF;">&#39;Guangzhou&#39;</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">            label: </span><span style="color:#9ECBFF;">&#39;广州&#39;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">          }, { </span></span>
<span class="line"><span style="color:#E1E4E8;">            value: </span><span style="color:#9ECBFF;">&#39;Dalian&#39;</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">            label: </span><span style="color:#9ECBFF;">&#39;大连&#39;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">          }] </span></span>
<span class="line"><span style="color:#E1E4E8;">        }], </span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">value</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">      } </span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;/script&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#005CC5;">el-select</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">v-model</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;value&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">placeholder</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;请选择&quot;</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#005CC5;">el-option-group</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">v-for</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;group in options&quot;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#B31D28;font-style:italic;">:key=&quot;group.label&quot;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#B31D28;font-style:italic;">:label=&quot;group.label&quot;&gt;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#B31D28;font-style:italic;">&lt;el-option</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">v-for</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;item in group.options&quot;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#B31D28;font-style:italic;">:key=&quot;item.value&quot;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#B31D28;font-style:italic;">:label=&quot;item.label&quot;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#B31D28;font-style:italic;">:value=&quot;item.value&quot;&gt;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#B31D28;font-style:italic;">&lt;/el-option&gt;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#B31D28;font-style:italic;">&lt;/el-option-group&gt;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#B31D28;font-style:italic;">&lt;/el-select&gt;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;/template&gt;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;script&gt;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">export</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">default</span><span style="color:#24292E;"> { </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">data</span><span style="color:#24292E;">() { </span></span>
<span class="line"><span style="color:#24292E;">      return { </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">options</span><span style="color:#24292E;">: [{ </span></span>
<span class="line"><span style="color:#24292E;">          label: </span><span style="color:#032F62;">&#39;热门城市&#39;</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">          options: [{ </span></span>
<span class="line"><span style="color:#24292E;">            value: </span><span style="color:#032F62;">&#39;Shanghai&#39;</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">            label: </span><span style="color:#032F62;">&#39;上海&#39;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">          }, { </span></span>
<span class="line"><span style="color:#24292E;">            value: </span><span style="color:#032F62;">&#39;Beijing&#39;</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">            label: </span><span style="color:#032F62;">&#39;北京&#39;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">          }] </span></span>
<span class="line"><span style="color:#24292E;">        }, { </span></span>
<span class="line"><span style="color:#24292E;">          label: </span><span style="color:#032F62;">&#39;城市名&#39;</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">          options: [{ </span></span>
<span class="line"><span style="color:#24292E;">            value: </span><span style="color:#032F62;">&#39;Chengdu&#39;</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">            label: </span><span style="color:#032F62;">&#39;成都&#39;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">          }, { </span></span>
<span class="line"><span style="color:#24292E;">            value: </span><span style="color:#032F62;">&#39;Shenzhen&#39;</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">            label: </span><span style="color:#032F62;">&#39;深圳&#39;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">          }, { </span></span>
<span class="line"><span style="color:#24292E;">            value: </span><span style="color:#032F62;">&#39;Guangzhou&#39;</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">            label: </span><span style="color:#032F62;">&#39;广州&#39;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">          }, { </span></span>
<span class="line"><span style="color:#24292E;">            value: </span><span style="color:#032F62;">&#39;Dalian&#39;</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">            label: </span><span style="color:#032F62;">&#39;大连&#39;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">          }] </span></span>
<span class="line"><span style="color:#24292E;">        }], </span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">value</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">      } </span></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"><span style="color:#24292E;">  } </span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;/script&gt;</span></span></code></pre></div><p>这是 Select 组件的分组示例，最终会在页面上渲染成这样：</p>`,10),y=s(`<p>显然，这里 ElOption 中的 this.$parent 指向的就不是 ElSelect 组件实例，而是 ElOptionGroup 组件实例。但如果我们用依赖注入的方式，即使结构变了，还是可以在 ElOption 组件中正确访问到 ElSelect 的实例。</p><p>所以，this.$parent 是一种强耦合的获取父组件实例方式，非常不利于代码的重构，因为一旦组件层级发生变化，就会产生非预期的后果，所以在平时的开发工作中你应该慎用这个属性。</p><p>相反，在组件库的场景中，依赖注入还是很方便的，除了示例中提供组件实例数据，还可以提供任意类型的数据。因为入口组件和它的相关子组件关联性是很强的，无论后代组件的结构如何变化，最终都会渲染在入口组件的子树上。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>好的，到这里我们这一节的学习就结束啦，通过这节课的学习，你应该掌握 Vue.js 依赖注入的实现原理，了解依赖注入的使用场景和它的缺陷。</p><p>到目前为止，我们已经学习了 Vue.js 3.0 提供的所有常用的 Composition API。可以看到和 Vue.js 2.x Options API 相比，我们不再是通过编写一些组件配置去描述一个组件，更像是主动调用一些 API 去编写组件的实现逻辑。</p><p>Vue.js 2.x 中，框架背后帮我们做了很多事情，比如我们在 data 中定义的变量，在组件实例化阶段会把它们变成响应式的，这个行为是黑盒的，用户是无感知的。反观 Vue.js 3.0 Composition API，用户会利用 reactive 或者 ref API 主动去申明一个响应式对象。</p><p>所以<strong>通过 Composition API 去编写组件</strong> ，<strong>用户更清楚自己在做什么事情</strong>。</p><p>另外，为什么说 Composition API 比 mixin 更适合逻辑复用呢？</p><p>其实，二者都是把复用的逻辑放在单独的文件中维护。但从使用的方式而言，用户只是在需要混入 mixin 的组件中去申明这个 mixin，使用方式如下：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">    Mouse position: x { { x }} / y { { y }} </span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">import mousePositionMixin from &#39;./mouse&#39; </span></span>
<span class="line"><span style="color:#E1E4E8;">export default { </span></span>
<span class="line"><span style="color:#E1E4E8;">  mixins: [mousePositionMixin] </span></span>
<span class="line"><span style="color:#E1E4E8;">} </span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">    Mouse position: x { { x }} / y { { y }} </span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">import mousePositionMixin from &#39;./mouse&#39; </span></span>
<span class="line"><span style="color:#24292E;">export default { </span></span>
<span class="line"><span style="color:#24292E;">  mixins: [mousePositionMixin] </span></span>
<span class="line"><span style="color:#24292E;">} </span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>我们在组件中申明了 mousePositionMixin，组件模板中使用的 x、y 就来源于这个 mixin，这一切都是 Vue.js 内部帮我们做的。如果该组件只引入这单个 mixin，问题倒不大，但如果这个组件引入的 mixin 越来越多，很容易出现命名冲突的情况，以及造成数据来源不清晰等问题。</p><p>而我们通过 Composition API 去编写功能类似的 hook 函数，使用方式如下：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">    Mouse position: x { { x }} / y { { y }} </span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">  import useMousePosition from &#39;./mouse&#39; </span></span>
<span class="line"><span style="color:#E1E4E8;">  export default { </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">setup</span><span style="color:#E1E4E8;">() { </span></span>
<span class="line"><span style="color:#E1E4E8;">      const { x, y } = </span><span style="color:#B392F0;">useMousePosition</span><span style="color:#E1E4E8;">() </span></span>
<span class="line"><span style="color:#E1E4E8;">      return { x, y } </span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">    Mouse position: x { { x }} / y { { y }} </span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">  import useMousePosition from &#39;./mouse&#39; </span></span>
<span class="line"><span style="color:#24292E;">  export default { </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">setup</span><span style="color:#24292E;">() { </span></span>
<span class="line"><span style="color:#24292E;">      const { x, y } = </span><span style="color:#6F42C1;">useMousePosition</span><span style="color:#24292E;">() </span></span>
<span class="line"><span style="color:#24292E;">      return { x, y } </span></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"><span style="color:#24292E;">  } </span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>我们可以清楚地分辨出模板中使用的 x、y 是来源于 useMousePosition 函数，即便我们引入更多的 hook 函数，也不会出现命名冲突的情况。</p><p>Composition API 在逻辑复用上确实有不错的优势，但是它并非完美的，使用起来会增加代码量。Composition API 属于 API 的增强，它并不是 Vue.js 3.0 组件开发的范式，如果你的组件足够简单，还是可 以使用 Options API 的。</p><p>最后，给你留一道思考题目，如果你想利用依赖注入让整个应用下组件都能共享某个数据，你会怎么做？为什么？欢迎你在留言区与我分享。</p><blockquote><p><strong>本节课的相关代码在源代码中的位置如下：</strong></p><p>packages/runtime-core/src/apiInject.ts</p></blockquote>`,18);function i(d,u,v,F,g,h){const n=p("Image");return o(),e("div",null,[c,a(n,{alt:"4.png",src:"https://s0.lgstatic.com/i/image/M00/42/E3/CgqCHl86T3KAQuhfAACt-IfYuPc049.png"}),r,a(n,{alt:"select1.png",src:"https://s0.lgstatic.com/i/image/M00/42/D8/Ciqc1F86T9CAGMkuAACL3WKe6QA403.png"}),E,a(n,{alt:"select2.png",src:"https://s0.lgstatic.com/i/image/M00/42/E3/CgqCHl86T-OAVgk-AACFqLBanFk012.png"}),y])}const A=l(t,[["render",i]]);export{D as __pageData,A as default};
