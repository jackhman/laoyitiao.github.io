import{_ as o,j as e,o as t,h as c,k as l,f as n,Q as p,s}from"./chunks/framework.d3daa342.js";const T=JSON.parse('{"title":"05生命周期：掌握Flutter生命周期以及应用场景","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/101-Flutter快学快用24讲文档/(3522) 05  生命周期：掌握 Flutter 生命周期以及应用场景.md","filePath":"posts/frontEnd/101-Flutter快学快用24讲文档/(3522) 05  生命周期：掌握 Flutter 生命周期以及应用场景.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/101-Flutter快学快用24讲文档/(3522) 05  生命周期：掌握 Flutter 生命周期以及应用场景.md"},E=p('<h1 id="_05生命周期-掌握flutter生命周期以及应用场景" tabindex="-1">05生命周期：掌握Flutter生命周期以及应用场景 <a class="header-anchor" href="#_05生命周期-掌握flutter生命周期以及应用场景" aria-label="Permalink to &quot;05生命周期：掌握Flutter生命周期以及应用场景&quot;">​</a></h1><p>本课时将介绍 Flutter 的组件，以及组件的生命周期，其次结合上课时的例子实现一个自动更新展示最新时间的 Flutter 应用。</p><h3 id="组件-widget" tabindex="-1">组件 Widget <a class="header-anchor" href="#组件-widget" aria-label="Permalink to &quot;组件 Widget&quot;">​</a></h3><p>Flutter 中的组件与前端组件的理解和作用基本一致，但是没有一个明确的概念解释 Flutter 组件，这里我借用前端的组件定义来解释 Flutter 组件的概念。</p><p>一个 Flutter 组件，包含了组件的模板、样式和交互等内容，外部只要按照组件设定的属性、函数及事件处理等进行调用即可，完全不用考虑组件的内部实现逻辑。其中组件又包括无状态组件和有状态组件。</p><ul><li>无状态组件</li></ul><p>无状态组件，可以理解为将外部传入的数据转化为界面展示的内容，只会渲染一次。</p><ul><li>有状态组件</li></ul><p>有状态组件，是定义交互逻辑和业务数据，可以理解为具有动态可交互的内容界面，会根据数据的变化进行多次渲染。</p><h3 id="生命周期" tabindex="-1">生命周期 <a class="header-anchor" href="#生命周期" aria-label="Permalink to &quot;生命周期&quot;">​</a></h3><p>在原生 Android 、原生 iOS 、前端 React 或者 Vue 都存在生命周期的概念，在 Flutter 中一样存在生命周期的概念，其基本概念和作用相似。 Flutter 中说的生命周期，也是指有状态组件，对于无状态组件生命周期只有 build 这个过程，也只会渲染一次，而有状态组件则比较复杂，下面我们就来看看有状态组件的生命周期过程。</p><h4 id="生命周期的流转" tabindex="-1">生命周期的流转 <a class="header-anchor" href="#生命周期的流转" aria-label="Permalink to &quot;生命周期的流转&quot;">​</a></h4><p>Flutter 中的生命周期，包含以下几个阶段：</p><ul><li><p><strong>createState</strong> ，该函数为 StatefulWidget 中创建 State 的方法，当 StatefulWidget 被调用时会立即执行 createState 。</p></li><li><p><strong>initState</strong> ，该函数为 State 初始化调用，因此可以在此期间执行 State 各变量的初始赋值，同时也可以在此期间与服务端交互，获取服务端数据后调用 setState 来设置 State。</p></li><li><p><strong>didChangeDependencies</strong> ，该函数是在该组件依赖的 State 发生变化时，这里说的 State 为全局 State ，例如语言或者主题等，类似于前端 Redux 存储的 State 。</p></li><li><p><strong>build</strong> ，主要是返回需要渲染的 Widget ，由于 build 会被调用多次，因此在该函数中只能做返回 Widget 相关逻辑，避免因为执行多次导致状态异常。</p></li><li><p><strong>reassemble</strong> ，主要是提供开发阶段使用，在 debug 模式下，每次热重载都会调用该函数，因此在 debug 阶段可以在此期间增加一些 debug 代码，来检查代码问题。</p></li><li><p><strong>didUpdateWidget</strong> ，该函数主要是在组件重新构建，比如说热重载，父组件发生 build 的情况下，子组件该方法才会被调用，其次该方法调用之后一定会再调用本组件中的 build 方法。</p></li><li><p><strong>deactivate</strong> ，在组件被移除节点后会被调用，如果该组件被移除节点，然后未被插入到其他节点时，则会继续调用 dispose 永久移除。</p></li><li><p><strong>dispose</strong> ，永久移除组件，并释放组件资源。</p></li></ul>',14),y=p(`<p>图 1 生命周期流程图</p><p>整个过程分为四个阶段：</p><ol><li><p>初始化阶段，包括两个生命周期函数 createState 和 initState；</p></li><li><p>组件创建阶段，也可以称组件出生阶段，包括 didChangeDependencies 和 build；</p></li><li><p>触发组件多次 build ，这个阶段有可能是因为 didChangeDependencies、setState 或者 didUpdateWidget 而引发的组件重新 build ，在组件运行过程中会多次被触发，这也是优化过程中需要着重需要注意的点；</p></li><li><p>最后是组件销毁阶段，deactivate 和 dispose。</p></li></ol><h4 id="组件首次加载执行过程" tabindex="-1">组件首次加载执行过程 <a class="header-anchor" href="#组件首次加载执行过程" aria-label="Permalink to &quot;组件首次加载执行过程&quot;">​</a></h4><p>我们先实现一段代码，来看下组件在首次创建的执行过程是否是按照图 1 的流程。</p><p>1、 在 lib 中 pages 下创建 test_stateful_widget.dart ；</p><p>2、 在 test_stateful_widget.dart 添加如下代码：</p><div class="language-dart vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;package:flutter/material.dart&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#6A737D;">/// 创建有状态测试组件</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">TestStatefulWidget</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">StatefulWidget</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">@override</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">createState</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;create state&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">TestState</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">/// 创建状态管理类，继承状态测试组件</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">TestState</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">State</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#79B8FF;">TestStatefulWidget</span><span style="color:#E1E4E8;">&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/// 定义 state </span><span style="color:#FFAB70;">[count]</span><span style="color:#6A737D;"> 计算器</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">int</span><span style="color:#E1E4E8;"> count </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/// 定义 state </span><span style="color:#FFAB70;">[name]</span><span style="color:#6A737D;"> 为当前描述字符串</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">String</span><span style="color:#E1E4E8;"> name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;test&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">@override</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">initState</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;init state&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">initState</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">@override</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">didChangeDependencies</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;did change dependencies&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">didChangeDependencies</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">@override</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">didUpdateWidget</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">TestStatefulWidget</span><span style="color:#E1E4E8;"> oldWidget) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    count</span><span style="color:#F97583;">++</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;did update widget&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">didUpdateWidget</span><span style="color:#E1E4E8;">(oldWidget);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">@override</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">deactivate</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;deactivate&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">deactivate</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">@override</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">dispose</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;dispose&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">dispose</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">@override</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">reassemble</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;reassemble&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">reassemble</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/// 修改 state name</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">changeName</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">setState</span><span style="color:#E1E4E8;">(() {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;set state&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;flutter&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">@override</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">Widget</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">build</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">BuildContext</span><span style="color:#E1E4E8;"> context) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;build&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Column</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">      children</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#79B8FF;">Widget</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">[</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">FlatButton</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">          child</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Text</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;$</span><span style="color:#79B8FF;">name</span><span style="color:#9ECBFF;"> $</span><span style="color:#79B8FF;">count</span><span style="color:#9ECBFF;">&#39;</span><span style="color:#E1E4E8;">), </span><span style="color:#6A737D;">// 使用 Text 组件显示描述字符和当前计算</span></span>
<span class="line"><span style="color:#E1E4E8;">          onPressed</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">()</span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">changeName</span><span style="color:#E1E4E8;">(), </span><span style="color:#6A737D;">// 点击触发修改描述字符 state name</span></span>
<span class="line"><span style="color:#E1E4E8;">        )</span></span>
<span class="line"><span style="color:#E1E4E8;">      ],</span></span>
<span class="line"><span style="color:#E1E4E8;">    );</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;package:flutter/material.dart&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;">/// 创建有状态测试组件</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">TestStatefulWidget</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">StatefulWidget</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">@override</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">createState</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;create state&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">TestState</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">/// 创建状态管理类，继承状态测试组件</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">TestState</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">State</span><span style="color:#24292E;">&lt;</span><span style="color:#005CC5;">TestStatefulWidget</span><span style="color:#24292E;">&gt; {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/// 定义 state </span><span style="color:#E36209;">[count]</span><span style="color:#6A737D;"> 计算器</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">int</span><span style="color:#24292E;"> count </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/// 定义 state </span><span style="color:#E36209;">[name]</span><span style="color:#6A737D;"> 为当前描述字符串</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">String</span><span style="color:#24292E;"> name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;test&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">@override</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">initState</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;init state&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">initState</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">@override</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">didChangeDependencies</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;did change dependencies&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">didChangeDependencies</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">@override</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">didUpdateWidget</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">TestStatefulWidget</span><span style="color:#24292E;"> oldWidget) {</span></span>
<span class="line"><span style="color:#24292E;">    count</span><span style="color:#D73A49;">++</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;did update widget&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">didUpdateWidget</span><span style="color:#24292E;">(oldWidget);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">@override</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">deactivate</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;deactivate&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">deactivate</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">@override</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">dispose</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;dispose&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">dispose</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">@override</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">reassemble</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;reassemble&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">reassemble</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/// 修改 state name</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">changeName</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">setState</span><span style="color:#24292E;">(() {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;set state&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;flutter&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">@override</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">Widget</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">build</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">BuildContext</span><span style="color:#24292E;"> context) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;build&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Column</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">      children</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#005CC5;">Widget</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">[</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">FlatButton</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">          child</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Text</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;$</span><span style="color:#005CC5;">name</span><span style="color:#032F62;"> $</span><span style="color:#005CC5;">count</span><span style="color:#032F62;">&#39;</span><span style="color:#24292E;">), </span><span style="color:#6A737D;">// 使用 Text 组件显示描述字符和当前计算</span></span>
<span class="line"><span style="color:#24292E;">          onPressed</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">()</span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">changeName</span><span style="color:#24292E;">(), </span><span style="color:#6A737D;">// 点击触发修改描述字符 state name</span></span>
<span class="line"><span style="color:#24292E;">        )</span></span>
<span class="line"><span style="color:#24292E;">      ],</span></span>
<span class="line"><span style="color:#24292E;">    );</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>上述代码把有状态组件的一些生命周期函数都进行了重写，并且在执行中都打印了一些字符串标识，目的是可以看到该函数被执行。</p><p>3、 然后在 main.dart 中加载该组件，代码如下：</p><div class="language-dart vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;package:flutter/material.dart&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;package:two_you_friend/pages/test_stateful_widget.dart&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#6A737D;">/// APP 核心入口文件</span></span>
<span class="line"><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">runApp</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">MyApp</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#6A737D;">/// MyApp 核心入口界面</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">MyApp</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">StatelessWidget</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// This widget is the root of your application.</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">@override</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">Widget</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">build</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">BuildContext</span><span style="color:#E1E4E8;"> context) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">MaterialApp</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">        title</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;Two You&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// APP 名字</span></span>
<span class="line"><span style="color:#E1E4E8;">        theme</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">ThemeData</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">          primarySwatch</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Colors</span><span style="color:#E1E4E8;">.blue, </span><span style="color:#6A737D;">// APP 主题</span></span>
<span class="line"><span style="color:#E1E4E8;">        ),</span></span>
<span class="line"><span style="color:#E1E4E8;">        home</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Scaffold</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">            appBar</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">AppBar</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">              title</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Text</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;Two You&#39;</span><span style="color:#E1E4E8;">), </span><span style="color:#6A737D;">// 页面名字</span></span>
<span class="line"><span style="color:#E1E4E8;">            ),</span></span>
<span class="line"><span style="color:#E1E4E8;">            body</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Center</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">             child</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#79B8FF;">TestStatefulWidget</span><span style="color:#E1E4E8;">(),</span></span>
<span class="line"><span style="color:#E1E4E8;">            )</span></span>
<span class="line"><span style="color:#E1E4E8;">        ));</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;package:flutter/material.dart&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;package:two_you_friend/pages/test_stateful_widget.dart&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;">/// APP 核心入口文件</span></span>
<span class="line"><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">runApp</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">MyApp</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#6A737D;">/// MyApp 核心入口界面</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">MyApp</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">StatelessWidget</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// This widget is the root of your application.</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">@override</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">Widget</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">build</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">BuildContext</span><span style="color:#24292E;"> context) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">MaterialApp</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">        title</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;Two You&#39;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// APP 名字</span></span>
<span class="line"><span style="color:#24292E;">        theme</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">ThemeData</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">          primarySwatch</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Colors</span><span style="color:#24292E;">.blue, </span><span style="color:#6A737D;">// APP 主题</span></span>
<span class="line"><span style="color:#24292E;">        ),</span></span>
<span class="line"><span style="color:#24292E;">        home</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Scaffold</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">            appBar</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">AppBar</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">              title</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Text</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;Two You&#39;</span><span style="color:#24292E;">), </span><span style="color:#6A737D;">// 页面名字</span></span>
<span class="line"><span style="color:#24292E;">            ),</span></span>
<span class="line"><span style="color:#24292E;">            body</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Center</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">             child</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#005CC5;">TestStatefulWidget</span><span style="color:#24292E;">(),</span></span>
<span class="line"><span style="color:#24292E;">            )</span></span>
<span class="line"><span style="color:#24292E;">        ));</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>代码修改后，我们打开手机模拟器，然后运行该 App ，在输出控制台可以看到下面的运行打印日志信息。</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">flutter: create state</span></span>
<span class="line"><span style="color:#E1E4E8;">flutter: init state</span></span>
<span class="line"><span style="color:#E1E4E8;">flutter: did change dependencies</span></span>
<span class="line"><span style="color:#E1E4E8;">flutter: build</span></span>
<span class="line"><span style="color:#E1E4E8;">flutter: reassemble</span></span>
<span class="line"><span style="color:#E1E4E8;">flutter: did update widget</span></span>
<span class="line"><span style="color:#E1E4E8;">flutter: build</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">flutter: create state</span></span>
<span class="line"><span style="color:#24292E;">flutter: init state</span></span>
<span class="line"><span style="color:#24292E;">flutter: did change dependencies</span></span>
<span class="line"><span style="color:#24292E;">flutter: build</span></span>
<span class="line"><span style="color:#24292E;">flutter: reassemble</span></span>
<span class="line"><span style="color:#24292E;">flutter: did update widget</span></span>
<span class="line"><span style="color:#24292E;">flutter: build</span></span></code></pre></div><p>运行结果中，打印过程可以看到是按照我们上面图 1 的执行流程在运行的，<strong>但其中最值得关注的是 build 运行了两次</strong>。这是在开发模式下才会执行的过程，在正式环境是不会出现的，因为重新渲染成本非常大，这个问题可以使用打印 build 的调用堆栈即可发现。如果你要关闭两次 build 也可以实现，在 Flutter 框架中搜索 constants.dart 文件，并找到下面这行代码，将 defaultValue 从 false 修改为 true。</p><div class="language-dart vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">bool</span><span style="color:#E1E4E8;"> kReleaseMode </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">bool</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">fromEnvironment</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;dart.vm.product&#39;</span><span style="color:#E1E4E8;">, defaultValue</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">bool</span><span style="color:#24292E;"> kReleaseMode </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">bool</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">fromEnvironment</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;dart.vm.product&#39;</span><span style="color:#24292E;">, defaultValue</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">);</span></span></code></pre></div><p>其实这里会<strong>触发 didUpdateWidget 函数</strong>，是因为 TestStatefulWidget 组件是 MyApp 组件中的子组件，从而导致 MyApp 函数中的 build 触发子组件 didUpdateWidget 函数的执行，具体会在下面触发组件再次 build 中详细说明。</p><h4 id="触发组件再次-build" tabindex="-1">触发组件再次 build <a class="header-anchor" href="#触发组件再次-build" aria-label="Permalink to &quot;触发组件再次 build&quot;">​</a></h4><p>触发组件再次 build 有三种方式，一个是 setState ，另一个是 didChangeDependencies ，再一个是 didUpdateWidget 。</p><p>setState 比较容易理解，在数据状态进行变化时，触发组件 build ，在上面的代码运行后的界面中，点击中间的页面提示如图 2 位置，就可以看到在调用 setState 后，会调用 build 一个方法。</p>`,19),i=p(`<p>图 2 测试组件运行界面</p><p>didChangeDependencies ，你可以理解为本组件依赖的全局 state 的值发生了变化，例如前端的 redux 中的数据发生了变化，也会进行 build 操作。一般情况下我们会将一些比较基础的数据放到全局变量中，例如主题颜色、地区语言或者其他通用变量等。如果这些全局 state 发生状态变化则会触发该函数，而该函数之后就会触发 build 操作。</p><p>didUpdateWidget 触发 build 我们需要从代码层面来讲解下，现在我们需要设计两个组件，一个是我们刚实现的 TestStatefulWidget ，另外一个则是该组件的子组件，我们命名为SubStatefulWidget 。接下来我们在 TestStatefulWidget 加载该组件，在头部 import 该组件，然后将 build 中的代码修改为下面：</p><div class="language-dart vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">@override</span></span>
<span class="line"><span style="color:#79B8FF;">Widget</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">build</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">BuildContext</span><span style="color:#E1E4E8;"> context) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;build&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Column</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">    children</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#79B8FF;">Widget</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">[</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">FlatButton</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">        child</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Text</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;$</span><span style="color:#79B8FF;">name</span><span style="color:#9ECBFF;"> $</span><span style="color:#79B8FF;">count</span><span style="color:#9ECBFF;">&#39;</span><span style="color:#E1E4E8;">), </span><span style="color:#6A737D;">// 使用 Text 组件显示描述字符和当前计算</span></span>
<span class="line"><span style="color:#E1E4E8;">        onPressed</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">()</span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">changeName</span><span style="color:#E1E4E8;">(), </span><span style="color:#6A737D;">// 点击触发修改描述字符 state name</span></span>
<span class="line"><span style="color:#E1E4E8;">      ),</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">SubStatefulWidget</span><span style="color:#E1E4E8;">() </span><span style="color:#6A737D;">// 加载子组件</span></span>
<span class="line"><span style="color:#E1E4E8;">    ],</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">@override</span></span>
<span class="line"><span style="color:#005CC5;">Widget</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">build</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">BuildContext</span><span style="color:#24292E;"> context) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;build&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Column</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">    children</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#005CC5;">Widget</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">[</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">FlatButton</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">        child</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Text</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;$</span><span style="color:#005CC5;">name</span><span style="color:#032F62;"> $</span><span style="color:#005CC5;">count</span><span style="color:#032F62;">&#39;</span><span style="color:#24292E;">), </span><span style="color:#6A737D;">// 使用 Text 组件显示描述字符和当前计算</span></span>
<span class="line"><span style="color:#24292E;">        onPressed</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">()</span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">changeName</span><span style="color:#24292E;">(), </span><span style="color:#6A737D;">// 点击触发修改描述字符 state name</span></span>
<span class="line"><span style="color:#24292E;">      ),</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">SubStatefulWidget</span><span style="color:#24292E;">() </span><span style="color:#6A737D;">// 加载子组件</span></span>
<span class="line"><span style="color:#24292E;">    ],</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>接下来我们实现 SubStatefulWidget 子组件的代码，和父组件基本相似，只是在打印处都加了 sub ，其次 build 实现逻辑也修改了，具体代码如下：</p><div class="language-dart vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;package:flutter/material.dart&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#6A737D;">/// 创建子组件类</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">SubStatefulWidget</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">StatefulWidget</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">@override</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">createState</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;sub create state&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">SubState</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">/// 创建子组件状态管理类</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">SubState</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">State</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#79B8FF;">SubStatefulWidget</span><span style="color:#E1E4E8;">&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">String</span><span style="color:#E1E4E8;"> name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;sub test&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">@override</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">initState</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;sub init state&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">initState</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">@override</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">didChangeDependencies</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;sub did change dependencies&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">didChangeDependencies</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">@override</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">didUpdateWidget</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">SubStatefulWidget</span><span style="color:#E1E4E8;"> oldWidget) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;sub did update widget&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">didUpdateWidget</span><span style="color:#E1E4E8;">(oldWidget);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">@override</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">deactivate</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;sub deactivate&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">deactivate</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">@override</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">dispose</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;sub dispose&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">dispose</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">@override</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">reassemble</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;sub reassemble&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">reassemble</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">@override</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">Widget</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">build</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">BuildContext</span><span style="color:#E1E4E8;"> context) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;sub build&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Text</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;subname $</span><span style="color:#79B8FF;">name</span><span style="color:#9ECBFF;">&#39;</span><span style="color:#E1E4E8;">); </span><span style="color:#6A737D;">// 使用Text组件显示当前name state</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;package:flutter/material.dart&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;">/// 创建子组件类</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">SubStatefulWidget</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">StatefulWidget</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">@override</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">createState</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;sub create state&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">SubState</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">/// 创建子组件状态管理类</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">SubState</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">State</span><span style="color:#24292E;">&lt;</span><span style="color:#005CC5;">SubStatefulWidget</span><span style="color:#24292E;">&gt; {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">String</span><span style="color:#24292E;"> name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;sub test&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">@override</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">initState</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;sub init state&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">initState</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">@override</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">didChangeDependencies</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;sub did change dependencies&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">didChangeDependencies</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">@override</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">didUpdateWidget</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">SubStatefulWidget</span><span style="color:#24292E;"> oldWidget) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;sub did update widget&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">didUpdateWidget</span><span style="color:#24292E;">(oldWidget);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">@override</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">deactivate</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;sub deactivate&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">deactivate</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">@override</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">dispose</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;sub dispose&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">dispose</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">@override</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">reassemble</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;sub reassemble&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">reassemble</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">@override</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">Widget</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">build</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">BuildContext</span><span style="color:#24292E;"> context) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;sub build&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Text</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;subname $</span><span style="color:#005CC5;">name</span><span style="color:#032F62;">&#39;</span><span style="color:#24292E;">); </span><span style="color:#6A737D;">// 使用Text组件显示当前name state</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>代码实现完成后，我们再重新加载 App ，可以看到如下运行日志信息。</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">flutter: </span><span style="color:#F97583;">create</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">state</span></span>
<span class="line"><span style="color:#E1E4E8;">flutter: </span><span style="color:#F97583;">init</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">state</span></span>
<span class="line"><span style="color:#E1E4E8;">flutter: did change dependencies</span></span>
<span class="line"><span style="color:#E1E4E8;">flutter: build</span></span>
<span class="line"><span style="color:#E1E4E8;">flutter: sub </span><span style="color:#F97583;">create</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">state</span></span>
<span class="line"><span style="color:#E1E4E8;">flutter: sub </span><span style="color:#F97583;">init</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">state</span></span>
<span class="line"><span style="color:#E1E4E8;">flutter: sub did change dependencies</span></span>
<span class="line"><span style="color:#E1E4E8;">flutter: sub build</span></span>
<span class="line"><span style="color:#E1E4E8;">flutter: reassemble</span></span>
<span class="line"><span style="color:#E1E4E8;">flutter: sub reassemble</span></span>
<span class="line"><span style="color:#E1E4E8;">flutter: did </span><span style="color:#F97583;">update</span><span style="color:#E1E4E8;"> widget</span></span>
<span class="line"><span style="color:#E1E4E8;">flutter: build</span></span>
<span class="line"><span style="color:#E1E4E8;">flutter: sub did </span><span style="color:#F97583;">update</span><span style="color:#E1E4E8;"> widget</span></span>
<span class="line"><span style="color:#E1E4E8;">flutter: sub build</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">flutter: </span><span style="color:#D73A49;">create</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">state</span></span>
<span class="line"><span style="color:#24292E;">flutter: </span><span style="color:#D73A49;">init</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">state</span></span>
<span class="line"><span style="color:#24292E;">flutter: did change dependencies</span></span>
<span class="line"><span style="color:#24292E;">flutter: build</span></span>
<span class="line"><span style="color:#24292E;">flutter: sub </span><span style="color:#D73A49;">create</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">state</span></span>
<span class="line"><span style="color:#24292E;">flutter: sub </span><span style="color:#D73A49;">init</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">state</span></span>
<span class="line"><span style="color:#24292E;">flutter: sub did change dependencies</span></span>
<span class="line"><span style="color:#24292E;">flutter: sub build</span></span>
<span class="line"><span style="color:#24292E;">flutter: reassemble</span></span>
<span class="line"><span style="color:#24292E;">flutter: sub reassemble</span></span>
<span class="line"><span style="color:#24292E;">flutter: did </span><span style="color:#D73A49;">update</span><span style="color:#24292E;"> widget</span></span>
<span class="line"><span style="color:#24292E;">flutter: build</span></span>
<span class="line"><span style="color:#24292E;">flutter: sub did </span><span style="color:#D73A49;">update</span><span style="color:#24292E;"> widget</span></span>
<span class="line"><span style="color:#24292E;">flutter: sub build</span></span></code></pre></div><ul><li><p>加载 TestStatefulWidget 组件，四个状态函数 createState、initState、didChangeDependencies 和 build；</p></li><li><p>加载 SubStatefulWidget 组件，四个状态函数 createState、initState、didChangeDependencies 和 build；</p></li><li><p>TestStatefulWidget 进行二次 build ，因为父组件需要重新 build 触发子组件的 didUpdateWidget ，didUpdateWidget 则触发 build。</p></li></ul><p>为了验证上面逻辑，我们现在再次点击图 3 中的红色部分，来触发 TestStatefulWidget 组件的 build ，看下是否会触发子组件的 didUpdateWidget 和 build。</p>`,10),d=p(`<p>图 3 增加子组件界面点击指示图</p><p>在运行日志窗口可以看到增加了下面的日志信息。</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">flutter: </span><span style="color:#F97583;">set</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">state</span></span>
<span class="line"><span style="color:#E1E4E8;">flutter: build</span></span>
<span class="line"><span style="color:#E1E4E8;">flutter: sub did </span><span style="color:#F97583;">update</span><span style="color:#E1E4E8;"> widget</span></span>
<span class="line"><span style="color:#E1E4E8;">flutter: sub build</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">flutter: </span><span style="color:#D73A49;">set</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">state</span></span>
<span class="line"><span style="color:#24292E;">flutter: build</span></span>
<span class="line"><span style="color:#24292E;">flutter: sub did </span><span style="color:#D73A49;">update</span><span style="color:#24292E;"> widget</span></span>
<span class="line"><span style="color:#24292E;">flutter: sub build</span></span></code></pre></div><p>这就说明了父组件的变化会引发子组件的 build ，虽然子组件没有任何的改动。这点如果是在前端的话，是需要使用 shouldUpdateComponent ，来介绍重新构建，不过在 Flutter 中是没有该功能来减少重新 build 的。</p><h4 id="组件销毁触发" tabindex="-1">组件销毁触发 <a class="header-anchor" href="#组件销毁触发" aria-label="Permalink to &quot;组件销毁触发&quot;">​</a></h4><p>在上面的代码基础上，我们直接在 TestStatefulWidget 组件中注释子组件 SubStatefulWidget 的调用，然后<strong>热重载</strong>即可看到下面的日志信息（请注意一定是需要热重载才会有效果，主要目的是一开始加载了该组件，后面再去掉该组件触发）。</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">flutter</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">reassemble</span></span>
<span class="line"><span style="color:#85E89D;">flutter</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">sub reassemble</span></span>
<span class="line"><span style="color:#85E89D;">flutter</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">build</span></span>
<span class="line"><span style="color:#85E89D;">flutter</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">sub deactivate</span></span>
<span class="line"><span style="color:#85E89D;">flutter</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">sub dispose</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">flutter</span><span style="color:#24292E;">: </span><span style="color:#032F62;">reassemble</span></span>
<span class="line"><span style="color:#22863A;">flutter</span><span style="color:#24292E;">: </span><span style="color:#032F62;">sub reassemble</span></span>
<span class="line"><span style="color:#22863A;">flutter</span><span style="color:#24292E;">: </span><span style="color:#032F62;">build</span></span>
<span class="line"><span style="color:#22863A;">flutter</span><span style="color:#24292E;">: </span><span style="color:#032F62;">sub deactivate</span></span>
<span class="line"><span style="color:#22863A;">flutter</span><span style="color:#24292E;">: </span><span style="color:#032F62;">sub dispose</span></span></code></pre></div><h3 id="综合实践" tabindex="-1">综合实践 <a class="header-anchor" href="#综合实践" aria-label="Permalink to &quot;综合实践&quot;">​</a></h3><p>上一课时，只是简单地显示了一个时间，这里需要动态地显示当前的时间。基于我们本课时的学习，我们需要实现以下几点：</p><ol><li><p>使用有状态组件来实现，需要创建两个类 StatefulWidget 和 State ，分别为 HomePage 和 HomePageState 对应到一个文件 home_page.dart ；</p></li><li><p>定义一个当前时间的 state currentTimeStr ，定义一个获取当前时间的函数 getCurrentTime ，并在 initState 中调用一次该函数当前时间；</p></li><li><p>实现函数 getCurrentTime 获取当前时间；</p></li><li><p>定义并实现一个定时刷新的函数 refreshTimeStr ，在定时函数中使用 Timer 定时使用 setState 来更新 state，并在 initState 中执行该函数；</p></li><li><p>build 中展示当前时间的 state 值，以及一个前缀信息；</p></li></ol><p>接下来我们按照上面的步骤来实现代码。</p><h4 id="步骤一-创建有状态类" tabindex="-1">步骤一：创建有状态类 <a class="header-anchor" href="#步骤一-创建有状态类" aria-label="Permalink to &quot;步骤一：创建有状态类&quot;">​</a></h4><p>使用有状态组件来实现，在 lib 的 pages 目录下创建 home_page.dart ，接下来在文件中创建两个类 StatefulWidget 和 State ，分别为 HomePage 和 HomePageState，代码如下。</p><div class="language-dart vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;package:flutter/material.dart&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#6A737D;">/// App 首页入口</span></span>
<span class="line"><span style="color:#6A737D;">///</span></span>
<span class="line"><span style="color:#6A737D;">/// 本模块函数，加载状态类组件HomePageState</span></span>
<span class="line"><span style="color:#6A737D;">/// </span><span style="color:#FFAB70;">[prefix]</span><span style="color:#6A737D;">是显示在时间之前的一个字符串</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">HomePage</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">StatefulWidget</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">@override</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">createState</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">HomePageState</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">/// 首页有状态组件类</span></span>
<span class="line"><span style="color:#6A737D;">///</span></span>
<span class="line"><span style="color:#6A737D;">/// 主要是获取当前时间，并动态展示当前时间</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">HomePageState</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">State</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#79B8FF;">HomePage</span><span style="color:#E1E4E8;">&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/// 有状态类返回组件信息</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">@override</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">Widget</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">build</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">BuildContext</span><span style="color:#E1E4E8;"> context) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;package:flutter/material.dart&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;">/// App 首页入口</span></span>
<span class="line"><span style="color:#6A737D;">///</span></span>
<span class="line"><span style="color:#6A737D;">/// 本模块函数，加载状态类组件HomePageState</span></span>
<span class="line"><span style="color:#6A737D;">/// </span><span style="color:#E36209;">[prefix]</span><span style="color:#6A737D;">是显示在时间之前的一个字符串</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">HomePage</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">StatefulWidget</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">@override</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">createState</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">HomePageState</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">/// 首页有状态组件类</span></span>
<span class="line"><span style="color:#6A737D;">///</span></span>
<span class="line"><span style="color:#6A737D;">/// 主要是获取当前时间，并动态展示当前时间</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">HomePageState</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">State</span><span style="color:#24292E;">&lt;</span><span style="color:#005CC5;">HomePage</span><span style="color:#24292E;">&gt; {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/// 有状态类返回组件信息</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">@override</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">Widget</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">build</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">BuildContext</span><span style="color:#24292E;"> context) {</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="步骤二-增加状态变量-实现初始化" tabindex="-1">步骤二：增加状态变量，实现初始化 <a class="header-anchor" href="#步骤二-增加状态变量-实现初始化" aria-label="Permalink to &quot;步骤二：增加状态变量，实现初始化&quot;">​</a></h4><p>定义一个当前时间的 state currentTimeStr ，定义一个获取当前时间的函数 getCurrentTime ，并在 initState 中调用一次该函数当前时间，代码如下。</p><div class="language-dart vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;package:flutter/material.dart&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#6A737D;">/// APP 首页入口</span></span>
<span class="line"><span style="color:#6A737D;">///</span></span>
<span class="line"><span style="color:#6A737D;">/// 本模块函数，加载状态类组件HomePageState</span></span>
<span class="line"><span style="color:#6A737D;">/// </span><span style="color:#FFAB70;">[prefix]</span><span style="color:#6A737D;">是显示在时间之前的一个字符串</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">HomePage</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">StatefulWidget</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">@override</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">createState</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">HomePageState</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">/// 首页有状态组件类</span></span>
<span class="line"><span style="color:#6A737D;">///</span></span>
<span class="line"><span style="color:#6A737D;">/// 主要是获取当前时间，并动态展示当前时间</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">HomePageState</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">State</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#79B8FF;">HomePage</span><span style="color:#E1E4E8;">&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/// 展示当前时间字符串</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">String</span><span style="color:#E1E4E8;"> currentTimeStr;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">@override</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">initState</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">initState</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.currentTimeStr </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getCurrentTime</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/// 获取当前时间戳</span></span>
<span class="line"><span style="color:#6A737D;">  ///</span></span>
<span class="line"><span style="color:#6A737D;">  /// 返回一个字符串类型的前缀信息：时间戳</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">String</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getCurrentTime</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/// 有状态类返回组件信息</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">@override</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">Widget</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">build</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">BuildContext</span><span style="color:#E1E4E8;"> context) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;package:flutter/material.dart&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;">/// APP 首页入口</span></span>
<span class="line"><span style="color:#6A737D;">///</span></span>
<span class="line"><span style="color:#6A737D;">/// 本模块函数，加载状态类组件HomePageState</span></span>
<span class="line"><span style="color:#6A737D;">/// </span><span style="color:#E36209;">[prefix]</span><span style="color:#6A737D;">是显示在时间之前的一个字符串</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">HomePage</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">StatefulWidget</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">@override</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">createState</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">HomePageState</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">/// 首页有状态组件类</span></span>
<span class="line"><span style="color:#6A737D;">///</span></span>
<span class="line"><span style="color:#6A737D;">/// 主要是获取当前时间，并动态展示当前时间</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">HomePageState</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">State</span><span style="color:#24292E;">&lt;</span><span style="color:#005CC5;">HomePage</span><span style="color:#24292E;">&gt; {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/// 展示当前时间字符串</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">String</span><span style="color:#24292E;"> currentTimeStr;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">@override</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">initState</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">initState</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.currentTimeStr </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getCurrentTime</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/// 获取当前时间戳</span></span>
<span class="line"><span style="color:#6A737D;">  ///</span></span>
<span class="line"><span style="color:#6A737D;">  /// 返回一个字符串类型的前缀信息：时间戳</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">String</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getCurrentTime</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/// 有状态类返回组件信息</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">@override</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">Widget</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">build</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">BuildContext</span><span style="color:#24292E;"> context) {</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="步骤三-实现-getcurrenttime-方法" tabindex="-1">步骤三：实现 getCurrentTime 方法 <a class="header-anchor" href="#步骤三-实现-getcurrenttime-方法" aria-label="Permalink to &quot;步骤三：实现 getCurrentTime 方法&quot;">​</a></h4><p>实现函数 getCurrentTime 获取当前时间，代码如下。</p><div class="language-dart vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;package:flutter/material.dart&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;package:intl/intl.dart&#39;</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">// 需要在pubspec.yaml增加该模块</span></span>
<span class="line"><span style="color:#6A737D;">/// APP 首页入口</span></span>
<span class="line"><span style="color:#6A737D;">///</span></span>
<span class="line"><span style="color:#6A737D;">/// 本模块函数，加载状态类组件HomePageState</span></span>
<span class="line"><span style="color:#6A737D;">/// </span><span style="color:#FFAB70;">[prefix]</span><span style="color:#6A737D;">是显示在时间之前的一个字符串</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">HomePage</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">StatefulWidget</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">@override</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">createState</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">HomePageState</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">/// 首页有状态组件类</span></span>
<span class="line"><span style="color:#6A737D;">///</span></span>
<span class="line"><span style="color:#6A737D;">/// 主要是获取当前时间，并动态展示当前时间</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">HomePageState</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">State</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#79B8FF;">HomePage</span><span style="color:#E1E4E8;">&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/// 展示当前时间字符串</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">String</span><span style="color:#E1E4E8;"> currentTimeStr;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">@override</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">initState</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">initState</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.currentTimeStr </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getCurrentTime</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/// 获取当前时间戳</span></span>
<span class="line"><span style="color:#6A737D;">  ///</span></span>
<span class="line"><span style="color:#6A737D;">  /// 返回一个字符串类型的前缀信息：时间戳</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">String</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getCurrentTime</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">DateTime</span><span style="color:#E1E4E8;"> now </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">DateTime</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">now</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> formatter </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">DateFormat</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;yy-MM-dd hh:mm:ss&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> formatter.</span><span style="color:#B392F0;">format</span><span style="color:#E1E4E8;">(now);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/// 有状态类返回组件信息</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">@override</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">Widget</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">build</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">BuildContext</span><span style="color:#E1E4E8;"> context) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;package:flutter/material.dart&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;package:intl/intl.dart&#39;</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">// 需要在pubspec.yaml增加该模块</span></span>
<span class="line"><span style="color:#6A737D;">/// APP 首页入口</span></span>
<span class="line"><span style="color:#6A737D;">///</span></span>
<span class="line"><span style="color:#6A737D;">/// 本模块函数，加载状态类组件HomePageState</span></span>
<span class="line"><span style="color:#6A737D;">/// </span><span style="color:#E36209;">[prefix]</span><span style="color:#6A737D;">是显示在时间之前的一个字符串</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">HomePage</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">StatefulWidget</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">@override</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">createState</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">HomePageState</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">/// 首页有状态组件类</span></span>
<span class="line"><span style="color:#6A737D;">///</span></span>
<span class="line"><span style="color:#6A737D;">/// 主要是获取当前时间，并动态展示当前时间</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">HomePageState</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">State</span><span style="color:#24292E;">&lt;</span><span style="color:#005CC5;">HomePage</span><span style="color:#24292E;">&gt; {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/// 展示当前时间字符串</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">String</span><span style="color:#24292E;"> currentTimeStr;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">@override</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">initState</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">initState</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.currentTimeStr </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getCurrentTime</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/// 获取当前时间戳</span></span>
<span class="line"><span style="color:#6A737D;">  ///</span></span>
<span class="line"><span style="color:#6A737D;">  /// 返回一个字符串类型的前缀信息：时间戳</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">String</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getCurrentTime</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">DateTime</span><span style="color:#24292E;"> now </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">DateTime</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">now</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> formatter </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">DateFormat</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;yy-MM-dd hh:mm:ss&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> formatter.</span><span style="color:#6F42C1;">format</span><span style="color:#24292E;">(now);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/// 有状态类返回组件信息</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">@override</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">Widget</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">build</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">BuildContext</span><span style="color:#24292E;"> context) {</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="步骤四-定时-timer-实现-state-定时更新" tabindex="-1">步骤四：定时 Timer 实现 state 定时更新 <a class="header-anchor" href="#步骤四-定时-timer-实现-state-定时更新" aria-label="Permalink to &quot;步骤四：定时 Timer 实现 state 定时更新&quot;">​</a></h4><p>定义并实现一个定时刷新的函数 refreshTimeStr ，在定时函数中使用 Timer 定时使用 setState 来更新 state，并在 initState 中执行该函数 ，代码如下。</p><div class="language-dart vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;dart:async&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;package:flutter/material.dart&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;package:intl/intl.dart&#39;</span><span style="color:#E1E4E8;">; </span><span style="color:#6A737D;">// 需要在pubspec.yaml增加该模块</span></span>
<span class="line"><span style="color:#6A737D;">/// APP 首页入口</span></span>
<span class="line"><span style="color:#6A737D;">///</span></span>
<span class="line"><span style="color:#6A737D;">/// 本模块函数，加载状态类组件HomePageState</span></span>
<span class="line"><span style="color:#6A737D;">/// </span><span style="color:#FFAB70;">[prefix]</span><span style="color:#6A737D;">是显示在时间之前的一个字符串</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">HomePage</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">StatefulWidget</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">@override</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">createState</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">HomePageState</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#6A737D;">/// 首页有状态组件类</span></span>
<span class="line"><span style="color:#6A737D;">///</span></span>
<span class="line"><span style="color:#6A737D;">/// 主要是获取当前时间，并动态展示当前时间</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">HomePageState</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">State</span><span style="color:#E1E4E8;">&lt;</span><span style="color:#79B8FF;">HomePage</span><span style="color:#E1E4E8;">&gt; {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/// 展示当前时间字符串</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">String</span><span style="color:#E1E4E8;"> currentTimeStr;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">@override</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">initState</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">initState</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.currentTimeStr </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getCurrentTime</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">refreshTimeStr</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/// 更新当前时间字符串 </span><span style="color:#FFAB70;">[currentTimeStr]</span></span>
<span class="line"><span style="color:#6A737D;">  ///</span></span>
<span class="line"><span style="color:#6A737D;">  /// 每 500ms 更新一次，使用 Timer</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">refreshTimeStr</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> period </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Duration</span><span style="color:#E1E4E8;">(milliseconds</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">500</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 定时更新当前时间的 currentTimeStr 字符串</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">Timer</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">periodic</span><span style="color:#E1E4E8;">(period, (timer) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">setState</span><span style="color:#E1E4E8;">(() {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.currentTimeStr </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getCurrentTime</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">      });</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/// 获取当前时间戳</span></span>
<span class="line"><span style="color:#6A737D;">  ///</span></span>
<span class="line"><span style="color:#6A737D;">  /// 返回一个字符串类型的前缀信息：时间戳</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">String</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getCurrentTime</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">DateTime</span><span style="color:#E1E4E8;"> now </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">DateTime</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">now</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> formatter </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">DateFormat</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;yy-MM-dd hh:mm:ss&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> formatter.</span><span style="color:#B392F0;">format</span><span style="color:#E1E4E8;">(now);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">/// 有状态类返回组件信息</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">@override</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">Widget</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">build</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">BuildContext</span><span style="color:#E1E4E8;"> context) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;dart:async&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;package:flutter/material.dart&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;package:intl/intl.dart&#39;</span><span style="color:#24292E;">; </span><span style="color:#6A737D;">// 需要在pubspec.yaml增加该模块</span></span>
<span class="line"><span style="color:#6A737D;">/// APP 首页入口</span></span>
<span class="line"><span style="color:#6A737D;">///</span></span>
<span class="line"><span style="color:#6A737D;">/// 本模块函数，加载状态类组件HomePageState</span></span>
<span class="line"><span style="color:#6A737D;">/// </span><span style="color:#E36209;">[prefix]</span><span style="color:#6A737D;">是显示在时间之前的一个字符串</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">HomePage</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">StatefulWidget</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">@override</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">createState</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">HomePageState</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#6A737D;">/// 首页有状态组件类</span></span>
<span class="line"><span style="color:#6A737D;">///</span></span>
<span class="line"><span style="color:#6A737D;">/// 主要是获取当前时间，并动态展示当前时间</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">HomePageState</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">State</span><span style="color:#24292E;">&lt;</span><span style="color:#005CC5;">HomePage</span><span style="color:#24292E;">&gt; {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/// 展示当前时间字符串</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">String</span><span style="color:#24292E;"> currentTimeStr;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">@override</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">initState</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">initState</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.currentTimeStr </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getCurrentTime</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">refreshTimeStr</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/// 更新当前时间字符串 </span><span style="color:#E36209;">[currentTimeStr]</span></span>
<span class="line"><span style="color:#6A737D;">  ///</span></span>
<span class="line"><span style="color:#6A737D;">  /// 每 500ms 更新一次，使用 Timer</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">refreshTimeStr</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> period </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Duration</span><span style="color:#24292E;">(milliseconds</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">500</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 定时更新当前时间的 currentTimeStr 字符串</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">Timer</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">periodic</span><span style="color:#24292E;">(period, (timer) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">setState</span><span style="color:#24292E;">(() {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.currentTimeStr </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getCurrentTime</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">      });</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/// 获取当前时间戳</span></span>
<span class="line"><span style="color:#6A737D;">  ///</span></span>
<span class="line"><span style="color:#6A737D;">  /// 返回一个字符串类型的前缀信息：时间戳</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">String</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getCurrentTime</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">DateTime</span><span style="color:#24292E;"> now </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">DateTime</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">now</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> formatter </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">DateFormat</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;yy-MM-dd hh:mm:ss&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> formatter.</span><span style="color:#6F42C1;">format</span><span style="color:#24292E;">(now);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">/// 有状态类返回组件信息</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">@override</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">Widget</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">build</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">BuildContext</span><span style="color:#24292E;"> context) {</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="步骤五-build-中显示组件内容" tabindex="-1">步骤五：build 中显示组件内容 <a class="header-anchor" href="#步骤五-build-中显示组件内容" aria-label="Permalink to &quot;步骤五：build 中显示组件内容&quot;">​</a></h4><p>build 中展示当前时间的 state 值，以及一个前缀信息。由于前缀是一个无状态变量，因此我们尽量将该变量放在 StatefulWidget 类中。这里在 build 中使用了一个新的布局组件 Column ，目前你暂时可以不关注这个组件，只需要了解其是布局组件即可，代码如下。</p><pre><code>import &#39;dart:async&#39;;
import &#39;package:flutter/material.dart&#39;;
import &#39;package:intl/intl.dart&#39;; // 需要在 pubspec.yaml 增加该模块
/// App 首页入口
///
/// 本模块函数，加载状态类组件 HomePageState
/// [prefix]是显示在时间之前的一个字符串
class HomePage extends StatefulWidget {
  /// 当前时间显示的前缀信息
  final String prefix = &#39;当前时间&#39;;
  @override
  createState() =&gt; HomePageState();
}
/// 首页有状态组件类
///
/// 主要是获取当前时间，并动态展示当前时间
class HomePageState extends State&lt;HomePage&gt; {
  /// 展示当前时间字符串
  String currentTimeStr;
  @override
  void initState() {
    super.initState();
    this.currentTimeStr = getCurrentTime();
    refreshTimeStr();
  }
  /// 更新当前时间字符串 [currentTimeStr]
  ///
  /// 每 500ms 更新一次，使用 Timer
  void refreshTimeStr() {
    const period = Duration(milliseconds: 500);
    // 定时更新当前时间的 currentTimeStr 字符串
    Timer.periodic(period, (timer) {
      setState(() {
        this.currentTimeStr = getCurrentTime();
      });
    });
  }
  /// 获取当前时间戳
  ///
  /// 返回一个字符串类型的前缀信息：时间戳
  String getCurrentTime() {
    DateTime now = DateTime.now();
    var formatter = DateFormat(&#39;yy-MM-dd hh:mm:ss&#39;);
    return formatter.format(now);
  }
  /// 有状态类返回组件信息
  @override
  Widget build(BuildContext context) {
    return Column(
      children: &lt;Widget&gt;[Text(widget.prefix), Text(this.currentTimeStr)],
    );
  }
}
</code></pre><h4 id="步骤六-main-dart-中加载-hompage-组件" tabindex="-1">步骤六：main.dart 中加载 HomPage 组件 <a class="header-anchor" href="#步骤六-main-dart-中加载-hompage-组件" aria-label="Permalink to &quot;步骤六：main.dart 中加载 HomPage 组件&quot;">​</a></h4><p>最后我们需要在 main.dart 中应用该组件，代码如下。</p><div class="language-dart vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;package:flutter/material.dart&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;package:two_you_friend/pages/home_page.dart&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#6A737D;">/// App 核心入口文件</span></span>
<span class="line"><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">runApp</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">MyApp</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#6A737D;">/// MyApp 核心入口界面</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">MyApp</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">StatelessWidget</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// This widget is the root of your application.</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">@override</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">Widget</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">build</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">BuildContext</span><span style="color:#E1E4E8;"> context) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">MaterialApp</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">        title</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;Two You&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// APP 名字</span></span>
<span class="line"><span style="color:#E1E4E8;">        theme</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">ThemeData</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">          primarySwatch</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Colors</span><span style="color:#E1E4E8;">.blue, </span><span style="color:#6A737D;">// APP 主题</span></span>
<span class="line"><span style="color:#E1E4E8;">        ),</span></span>
<span class="line"><span style="color:#E1E4E8;">        home</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Scaffold</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">            appBar</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">AppBar</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">              title</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Text</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;Two You&#39;</span><span style="color:#E1E4E8;">), </span><span style="color:#6A737D;">// 页面名字</span></span>
<span class="line"><span style="color:#E1E4E8;">            ),</span></span>
<span class="line"><span style="color:#E1E4E8;">            body</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Column</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">              children</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">&lt;</span><span style="color:#79B8FF;">Widget</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;">[</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#79B8FF;">HomePage</span><span style="color:#E1E4E8;">(),</span></span>
<span class="line"><span style="color:#E1E4E8;">              ],</span></span>
<span class="line"><span style="color:#E1E4E8;">            )</span></span>
<span class="line"><span style="color:#E1E4E8;">        ));</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;package:flutter/material.dart&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;package:two_you_friend/pages/home_page.dart&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;">/// App 核心入口文件</span></span>
<span class="line"><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">runApp</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">MyApp</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#6A737D;">/// MyApp 核心入口界面</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">MyApp</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">StatelessWidget</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// This widget is the root of your application.</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">@override</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">Widget</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">build</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">BuildContext</span><span style="color:#24292E;"> context) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">MaterialApp</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">        title</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;Two You&#39;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// APP 名字</span></span>
<span class="line"><span style="color:#24292E;">        theme</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">ThemeData</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">          primarySwatch</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Colors</span><span style="color:#24292E;">.blue, </span><span style="color:#6A737D;">// APP 主题</span></span>
<span class="line"><span style="color:#24292E;">        ),</span></span>
<span class="line"><span style="color:#24292E;">        home</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Scaffold</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">            appBar</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">AppBar</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">              title</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Text</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;Two You&#39;</span><span style="color:#24292E;">), </span><span style="color:#6A737D;">// 页面名字</span></span>
<span class="line"><span style="color:#24292E;">            ),</span></span>
<span class="line"><span style="color:#24292E;">            body</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Column</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">              children</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">&lt;</span><span style="color:#005CC5;">Widget</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;">[</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#005CC5;">HomePage</span><span style="color:#24292E;">(),</span></span>
<span class="line"><span style="color:#24292E;">              ],</span></span>
<span class="line"><span style="color:#24292E;">            )</span></span>
<span class="line"><span style="color:#24292E;">        ));</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="步骤七-代码美化和规范检查-并运行程序" tabindex="-1">步骤七：代码美化和规范检查，并运行程序 <a class="header-anchor" href="#步骤七-代码美化和规范检查-并运行程序" aria-label="Permalink to &quot;步骤七：代码美化和规范检查，并运行程序&quot;">​</a></h4><p>现在我们将代码实现完成了，需要使用我们 04 课时的知识来进行美化代码和检查代码是否规范，我们可以将美化和代码规范检查的两个命令写出一个 shell 脚本，每次只需要运行这个 shell 脚本（ format_check.sh ）检查即可，代码如下。</p><div class="language-powershell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;"># 代码美化</span></span>
<span class="line"><span style="color:#E1E4E8;">dartfmt </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">w </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">fix lib</span><span style="color:#F97583;">/</span></span>
<span class="line"><span style="color:#6A737D;"># 代码规范检查</span></span>
<span class="line"><span style="color:#E1E4E8;">dartanalyzer lib</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;"># 代码美化</span></span>
<span class="line"><span style="color:#24292E;">dartfmt </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">w </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">fix lib</span><span style="color:#D73A49;">/</span></span>
<span class="line"><span style="color:#6A737D;"># 代码规范检查</span></span>
<span class="line"><span style="color:#24292E;">dartanalyzer lib</span></span></code></pre></div><p>接下来，每次运行前执行该脚本检查。</p><div class="language-powershell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">sh format_check.sh</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">sh format_check.sh</span></span></code></pre></div><p>检查后，如果有问题则修复，没有问题，再选择手机模拟器运行该项目，既可以看到如下图 2 动态效果了。</p>`,35),F=s("p",null,"图 2 增加动态时间显示",-1),u=s("h3",{id:"总结",tabindex:"-1"},[n("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),C=s("p",null,"本课时主要介绍了组件中的有状态组件和无状态组件，关于有状态组件则介绍了其各个生命周期函数的执行场景以及实际触发的应用场景。最后再通过有状态组件优化我们之前的时间展示的小功能。学完本课时后，你需要掌握如何实现有状态组件，并了解有状态组件中各个生命周期函数被触发的时机。",-1),g=s("p",null,"以上就是本课时的主要内容，下一课时介绍有状态组件和无状态组件应用场景，以及如何区分使用有状态组件和无状态组件。",-1),A=s("p",null,[s("a",{href:"https://github.com/love-flutter/flutter-column",target:"_blank",rel:"noreferrer"},"点击此链接查看本课时源码")],-1);function m(D,h,B,b,S,f){const a=e("Image");return t(),c("div",null,[E,l(a,{alt:"image (7).png",src:"https://s0.lgstatic.com/i/image/M00/26/D4/CgqCHl7zAM2AFYCOAAFd30sb1Ck089.png"}),n(),y,l(a,{alt:"image (8).png",src:"https://s0.lgstatic.com/i/image/M00/26/D4/CgqCHl7zAQmAWvyUAAE_mgzi5xE933.png"}),n(),i,l(a,{alt:"image (9).png",src:"https://s0.lgstatic.com/i/image/M00/26/D4/CgqCHl7zATCAcLoKAAEryO5AHrk427.png"}),n(),d,l(a,{alt:"20200610_140500-2.gif",src:"https://s0.lgstatic.com/i/image/M00/26/D4/CgqCHl7zAWyAf3hFAAt1uKBbpwY045.gif"}),n(),F,u,C,g,A])}const _=o(r,[["render",m]]);export{T as __pageData,_ as default};
