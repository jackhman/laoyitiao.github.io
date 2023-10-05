import{_ as o,j as e,o as t,g as c,k as p,Q as l,s,h as a}from"./chunks/framework.4e7d56ce.js";const w=JSON.parse('{"title":"Webpack 的基本工作流程 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/104-前端工程化精讲文档/(4424) 10  流程分解：Webpack 的完整构建流程.md","filePath":"posts/frontEnd/104-前端工程化精讲文档/(4424) 10  流程分解：Webpack 的完整构建流程.md","lastUpdated":1696417798000}'),r={name:"posts/frontEnd/104-前端工程化精讲文档/(4424) 10  流程分解：Webpack 的完整构建流程.md"},i=l(`<p>上节课我们聊了过去 20 余年里，前端项目开发时的工程化需求，以及对应产生的工具解决方案，其中最广泛运用的构建工具是 Webpack。这节课我们就来深入分析 Webpack 中的效率优化问题。</p><p>要想全面地分析 Webpack 构建工具的优化方案，首先要先对它的工作流程有一定理解，这样才能针对项目中可能存在的构建问题，进行有目标地分析和优化。</p><h3 id="webpack-的基本工作流程" tabindex="-1">Webpack 的基本工作流程 <a class="header-anchor" href="#webpack-的基本工作流程" aria-label="Permalink to &quot;Webpack 的基本工作流程&quot;">​</a></h3><p>我们从两方面来了解 Webpack 的基本工作流程：</p><ol><li><p>通过 Webpack 的源码来了解具体函数执行的逻辑。</p></li><li><p>通过 Webpack 对外暴露的声明周期 Hooks，理解整体流程的阶段划分。</p></li></ol><p>其中会涉及对 Webpack 源代码的分析，源代码取自 Webpack 仓库的 <a href="https://github.com/webpack/webpack/blob/webpack-4" target="_blank" rel="noreferrer">webpack-4 分支</a>，而最新的 Webpack 5 中的优化我们会在后续课程中单独分析。</p><p>通常，在项目中有两种运行 Webpack 的方式：基于命令行的方式或基于代码的方式。</p><p>两种示例的代码分别如下（具体示例参照 <a href="https://github.com/fe-efficiency/lessons_fe_efficiency/tree/master/10_webpack_workflow" target="_blank" rel="noreferrer">10_webpack_workflow</a>）：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">//第一种：基于命令行的方式</span></span>
<span class="line"><span style="color:#E1E4E8;">webpack </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">config webpack.config.js</span></span>
<span class="line"><span style="color:#6A737D;">//第二种：基于代码的方式</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> webpack </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;webpack&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> config </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;./webpack.config&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#B392F0;">webpack</span><span style="color:#E1E4E8;">(config, (</span><span style="color:#FFAB70;">err</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">stats</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">//第一种：基于命令行的方式</span></span>
<span class="line"><span style="color:#24292E;">webpack </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">config webpack.config.js</span></span>
<span class="line"><span style="color:#6A737D;">//第二种：基于代码的方式</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> webpack </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;webpack&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> config </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;./webpack.config&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#6F42C1;">webpack</span><span style="color:#24292E;">(config, (</span><span style="color:#E36209;">err</span><span style="color:#24292E;">, </span><span style="color:#E36209;">stats</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {})</span></span></code></pre></div><h4 id="webpack-js-中的基本流程" tabindex="-1">webpack.js 中的基本流程 <a class="header-anchor" href="#webpack-js-中的基本流程" aria-label="Permalink to &quot;webpack.js 中的基本流程&quot;">​</a></h4><p>无论用哪种方式运行 Webpack，本质上都是 <a href="https://github.com/webpack/webpack/blob/webpack-4/lib/webpack.js" target="_blank" rel="noreferrer">webpack.js</a> 中的 Webpack 函数。</p><p>这一函数的核心逻辑是：根据配置生成编译器实例 compiler，然后处理参数，执行 WebpackOptionsApply().process，根据参数加载不同内部插件。在有回调函数的情况下，根据是否是 watch 模式来决定要执行 compiler.watch 还是 compiler.run。</p><p>为了讲解通用的流程，我们以没有 watch 模式的情况进行分析。简化流程后的代码示例如下：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">webpack</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">options</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">callback</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  options </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">//处理options默认值</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> compiler </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Compiler</span><span style="color:#E1E4E8;">(options.context)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">//处理参数中的插件等</span></span>
<span class="line"><span style="color:#E1E4E8;">  compiler.options </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">WebpackOptionsApply</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">process</span><span style="color:#E1E4E8;">(options, compiler); </span><span style="color:#6A737D;">//分析参数，加载各内部插件</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">...</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (callback) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    compiler.</span><span style="color:#B392F0;">run</span><span style="color:#E1E4E8;">(callback)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> compiler</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">webpack</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">options</span><span style="color:#24292E;">, </span><span style="color:#E36209;">callback</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  options </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">...</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">//处理options默认值</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> compiler </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Compiler</span><span style="color:#24292E;">(options.context)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">...</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">//处理参数中的插件等</span></span>
<span class="line"><span style="color:#24292E;">  compiler.options </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">WebpackOptionsApply</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">process</span><span style="color:#24292E;">(options, compiler); </span><span style="color:#6A737D;">//分析参数，加载各内部插件</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">...</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (callback) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">...</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    compiler.</span><span style="color:#6F42C1;">run</span><span style="color:#24292E;">(callback)</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> compiler</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="compiler-js-中的基本流程" tabindex="-1">Compiler.js 中的基本流程 <a class="header-anchor" href="#compiler-js-中的基本流程" aria-label="Permalink to &quot;Compiler.js 中的基本流程&quot;">​</a></h4><p>我们再来看下运行编译器实例的内部逻辑，具体源代码在 <a href="https://github.com/webpack/webpack/blob/webpack-4/lib/Compiler.js" target="_blank" rel="noreferrer">Compiler.js</a> 中。</p><p>compiler.run(callback) 中的执行逻辑较为复杂，我们把它按流程抽象一下。抽象后的执行流程如下：</p><ol><li><p><strong>readRecords</strong> ：读取<a href="https://webpack.js.org/configuration/other-options/#recordspath" target="_blank" rel="noreferrer">构建记录</a>，用于分包缓存优化，在未设置 recordsPath 时直接返回。</p></li><li><p><strong>compile 的主要构建过程</strong>，涉及以下几个环节：</p><ol><li><p><strong>newCompilationParams</strong>：创建 NormalModule 和 ContextModule 的工厂实例，用于创建后续模块实例。</p></li><li><p><strong>newCompilation</strong>：创建编译过程 Compilation 实例，传入上一步的两个工厂实例作为参数。</p></li><li><p><strong>compiler.hooks.make.callAsync</strong> ：触发 make 的 Hook，执行所有监听 make 的插件（例如 <a href="https://github.com/webpack/webpack/blob/webpack-4/lib/SingleEntryPlugin.js" target="_blank" rel="noreferrer">SingleEntryPlugin.js</a> 中，会在相应的监听中触发 compilation 的 addEntry 方法）。其中，Hook 的作用，以及其他 Hook 会在下面的小节中再谈到。</p></li><li><p><strong>compilation.finish</strong>：编译过程实例的 finish 方法，触发相应的 Hook 并报告构建模块的错误和警告。</p></li><li><p><strong>compilation.seal</strong>：编译过程的 seal 方法，下一节中我会进一步分析。</p></li></ol></li><li><p><strong>emitAssets</strong>：调用 compilation.getAssets()，将产物内容写入输出文件中。</p></li><li><p><strong>emitRecords</strong>：对应第一步的 readRecords，用于写入构建记录，在未设置 recordsPath 时直接返回。</p></li></ol><p>在编译器运行的流程里，核心过程是第二步编译。具体流程在生成的 Compilation 实例中进行，接下来我们再来看下这部分的源码逻辑。</p><h4 id="compilation-js-中的基本流程" tabindex="-1">Compilation.js 中的基本流程 <a class="header-anchor" href="#compilation-js-中的基本流程" aria-label="Permalink to &quot;Compilation.js 中的基本流程&quot;">​</a></h4><p>这部分的源码位于 <a href="https://github.com/webpack/webpack/blob/webpack-4/lib/Compilation.js" target="_blank" rel="noreferrer">Compilation.js</a> 中。其中，在编译执行过程中，我们主要从外部调用的是两个方法：</p><ol><li><p><strong>addEntry</strong>：从 entry 开始递归添加和构建模块。</p></li><li><p><strong>seal</strong>：冻结模块，进行一系列优化，以及触发各优化阶段的 Hooks。</p></li></ol><p>以上就是执行 Webpack 构建时的基本流程，这里再稍做总结：</p><ol><li><p>创建编译器 Compiler 实例。</p></li><li><p>根据 Webpack 参数加载参数中的插件，以及程序内置插件。</p></li><li><p>执行编译流程：创建编译过程 Compilation 实例，从入口递归添加与构建模块，模块构建完成后冻结模块，并进行优化。</p></li><li><p>构建与优化过程结束后提交产物，将产物内容写到输出文件中。</p></li></ol><p>除了了解上面的基本工作流程外，还有两个相关的概念需要理解：Webpack 的生命周期和插件系统。</p><h3 id="读懂-webpack-的生命周期" tabindex="-1">读懂 Webpack 的生命周期 <a class="header-anchor" href="#读懂-webpack-的生命周期" aria-label="Permalink to &quot;读懂 Webpack 的生命周期&quot;">​</a></h3><p>Webpack 工作流程中最核心的两个模块：Compiler 和 Compilation 都扩展自 Tapable 类，用于实现工作流程中的生命周期划分，以便在不同的生命周期节点上注册和调用<strong>插件</strong> 。其中所暴露出来的生命周期节点称为<strong>Hook</strong>（俗称钩子）。</p><h4 id="webpack-中的插件" tabindex="-1">Webpack 中的插件 <a class="header-anchor" href="#webpack-中的插件" aria-label="Permalink to &quot;Webpack 中的插件&quot;">​</a></h4><p>Webpack 引擎基于插件系统搭建而成，不同的插件各司其职，在 Webpack 工作流程的某一个或多个时间点上，对构建流程的某个方面进行处理。Webpack 就是通过这样的工作方式，在各生命周期中，经一系列插件将源代码逐步变成最后的产物代码。</p><p>一个 Webpack 插件是一个包含 apply 方法的 JavaScript 对象。这个 apply 方法的执行逻辑，通常是注册 Webpack 工作流程中某一生命周期 Hook，并添加对应 Hook 中该插件的实际处理函数。例如下面的代码：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">HelloWorldPlugin</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">apply</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">compiler</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    compiler.hooks.run.</span><span style="color:#B392F0;">tap</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;HelloWorldPlugin&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">compilation</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;hello world&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> HelloWorldPlugin;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">HelloWorldPlugin</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">apply</span><span style="color:#24292E;">(</span><span style="color:#E36209;">compiler</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    compiler.hooks.run.</span><span style="color:#6F42C1;">tap</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;HelloWorldPlugin&quot;</span><span style="color:#24292E;">, </span><span style="color:#E36209;">compilation</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;hello world&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> HelloWorldPlugin;</span></span></code></pre></div><h4 id="hook-的使用方式" tabindex="-1">Hook 的使用方式 <a class="header-anchor" href="#hook-的使用方式" aria-label="Permalink to &quot;Hook 的使用方式&quot;">​</a></h4><p>Hook 的使用分为四步：</p><ol><li><p>在构造函数中定义 Hook 类型和参数，生成 Hook 对象。</p></li><li><p>在插件中注册 Hook，添加对应 Hook 触发时的执行函数。</p></li><li><p>生成插件实例，运行 apply 方法。</p></li><li><p>在运行到对应生命周期节点时调用 Hook，执行注册过的插件的回调函数。如下面的代码所示：</p></li></ol><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">lib</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">Compiler.js</span></span>
<span class="line"><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.hooks </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">...</span></span>
<span class="line"><span style="color:#E1E4E8;">  make: </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SyncHook</span><span style="color:#E1E4E8;">([</span><span style="color:#9ECBFF;">&#39;compilation&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;params&#39;</span><span style="color:#E1E4E8;">]), </span><span style="color:#6A737D;">//1. 定义Hook</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">...</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#F97583;">...</span></span>
<span class="line"><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.hooks.compilation.</span><span style="color:#B392F0;">call</span><span style="color:#E1E4E8;">(compilation, params); </span><span style="color:#6A737D;">//4. 调用Hook</span></span>
<span class="line"><span style="color:#F97583;">...</span></span>
<span class="line"><span style="color:#E1E4E8;">lib</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">dependencies</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">CommonJsPlugin.js</span></span>
<span class="line"><span style="color:#6A737D;">//2. 在插件中注册Hook</span></span>
<span class="line"><span style="color:#E1E4E8;">compiler.hooks.compilation.</span><span style="color:#B392F0;">tap</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;CommonJSPlugin&quot;</span><span style="color:#E1E4E8;">, (</span><span style="color:#FFAB70;">compilation</span><span style="color:#E1E4E8;">, { </span><span style="color:#FFAB70;">contextModuleFactory</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">normalModuleFactory</span><span style="color:#E1E4E8;"> }) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">...</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#E1E4E8;">lib</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">WebpackOptionsApply.js</span></span>
<span class="line"><span style="color:#6A737D;">//3. 生成插件实例，运行apply方法</span></span>
<span class="line"><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">CommonJsPlugin</span><span style="color:#E1E4E8;">(options.module).</span><span style="color:#B392F0;">apply</span><span style="color:#E1E4E8;">(compiler);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">lib</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">Compiler.js</span></span>
<span class="line"><span style="color:#005CC5;">this</span><span style="color:#24292E;">.hooks </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">...</span></span>
<span class="line"><span style="color:#24292E;">  make: </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SyncHook</span><span style="color:#24292E;">([</span><span style="color:#032F62;">&#39;compilation&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;params&#39;</span><span style="color:#24292E;">]), </span><span style="color:#6A737D;">//1. 定义Hook</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">...</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#D73A49;">...</span></span>
<span class="line"><span style="color:#005CC5;">this</span><span style="color:#24292E;">.hooks.compilation.</span><span style="color:#6F42C1;">call</span><span style="color:#24292E;">(compilation, params); </span><span style="color:#6A737D;">//4. 调用Hook</span></span>
<span class="line"><span style="color:#D73A49;">...</span></span>
<span class="line"><span style="color:#24292E;">lib</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">dependencies</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">CommonJsPlugin.js</span></span>
<span class="line"><span style="color:#6A737D;">//2. 在插件中注册Hook</span></span>
<span class="line"><span style="color:#24292E;">compiler.hooks.compilation.</span><span style="color:#6F42C1;">tap</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;CommonJSPlugin&quot;</span><span style="color:#24292E;">, (</span><span style="color:#E36209;">compilation</span><span style="color:#24292E;">, { </span><span style="color:#E36209;">contextModuleFactory</span><span style="color:#24292E;">, </span><span style="color:#E36209;">normalModuleFactory</span><span style="color:#24292E;"> }) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">...</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#24292E;">lib</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">WebpackOptionsApply.js</span></span>
<span class="line"><span style="color:#6A737D;">//3. 生成插件实例，运行apply方法</span></span>
<span class="line"><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">CommonJsPlugin</span><span style="color:#24292E;">(options.module).</span><span style="color:#6F42C1;">apply</span><span style="color:#24292E;">(compiler);</span></span></code></pre></div><p>以上就是 Webpack 中 Hook 的一般使用方式。正是通过这种方式，Webpack 将编译器和编译过程的生命周期节点提供给外部插件，从而搭建起弹性化的工作引擎。</p><p>Hook 的类型按照同步或异步、是否接收上一插件的返回值等情况分为 9 种。不同类型的 Hook 接收注册的方法也不同，更多信息可参照<a href="https://github.com/webpack/tapable#tapable" target="_blank" rel="noreferrer">官方文档</a>。下面我们来具体介绍 Compiler 和 Compilation 中的 Hooks。</p><h4 id="compiler-hooks" tabindex="-1">Compiler Hooks <a class="header-anchor" href="#compiler-hooks" aria-label="Permalink to &quot;Compiler Hooks&quot;">​</a></h4><p>构建器实例的生命周期可以分为 3 个阶段：初始化阶段、构建过程阶段、产物生成阶段。下面我们就来大致介绍下这些不同阶段的 Hooks ：</p><p><strong>初始化阶段</strong></p><ul><li><p>environment、afterEnvironment：在创建完 compiler 实例且执行了配置内定义的插件的 apply 方法后触发。</p></li><li><p>entryOption、afterPlugins、afterResolvers：在 WebpackOptionsApply.js 中，这 3 个 Hooks 分别在执行 EntryOptions 插件和其他 Webpack 内置插件，以及解析了 resolver 配置后触发。</p></li></ul><p><strong>构建过程阶段</strong></p><ul><li><p>normalModuleFactory、contextModuleFactory：在两类模块工厂创建后触发。</p></li><li><p>beforeRun、run、watchRun、beforeCompile、compile、thisCompilation、compilation、make、afterCompile：在运行构建过程中触发。</p></li></ul><p><strong>产物生成阶段</strong></p><ul><li><p>shouldEmit、emit、assetEmitted、afterEmit：在构建完成后，处理产物的过程中触发。</p></li><li><p>failed、done：在达到最终结果状态时触发。</p></li></ul><h4 id="compilation-hooks" tabindex="-1">Compilation Hooks <a class="header-anchor" href="#compilation-hooks" aria-label="Permalink to &quot;Compilation Hooks&quot;">​</a></h4><p>构建过程实例的生命周期我们分为两个阶段：</p><p><strong>构建阶段</strong></p><ul><li><p>addEntry、failedEntry、succeedEntry：在添加入口和添加入口结束时触发（Webpack 5 中移除）。</p></li><li><p>buildModule、rebuildModule、finishRebuildingModule、failedModule、succeedModule：在构建单个模块时触发。</p></li><li><p>finishModules：在所有模块构建完成后触发。</p></li></ul><p><strong>优化阶段</strong></p><p>优化阶段在 seal 函数中共有 12 个主要的处理过程，如下图所示：</p>`,51),E=l(`<p>每个过程都暴露了相应的 Hooks，分别如下:</p><ul><li><p>seal、needAdditionalSeal、unseal、afterSeal：分别在 seal 函数的起始和结束的位置触发。</p></li><li><p>optimizeDependencies、afterOptimizeDependencies：触发优化依赖的插件执行，例如FlagDependencyUsagePlugin。</p></li><li><p>beforeChunks、afterChunks：分别在生成 Chunks 的过程的前后触发。</p></li><li><p>optimize：在生成 chunks 之后，开始执行优化处理的阶段触发。</p></li><li><p>optimizeModule、afterOptimizeModule：在优化模块过程的前后触发。</p></li><li><p>optimizeChunks、afterOptimizeChunks：在优化 Chunk 过程的前后触发，用于 <a href="https://webpack.js.org/guides/tree-shaking/" target="_blank" rel="noreferrer">Tree Shaking</a>。</p></li><li><p>optimizeTree、afterOptimizeTree：在优化模块和 Chunk 树过程的前后触发。</p></li><li><p>optimizeChunkModules、afterOptimizeChunkModules：在优化 ChunkModules 的过程前后触发，例如 ModuleConcatenationPlugin，利用这一 Hook 来做<a href="https://webpack.js.org/plugins/module-concatenation-plugin/#optimization-bailouts" target="_blank" rel="noreferrer">Scope Hoisting</a>的优化。</p></li><li><p>shouldRecord、recordModules、recordChunks、recordHash：在 shouldRecord 返回为 true 的情况下，依次触发 recordModules、recordChunks、recordHash。</p></li><li><p>reviveModules、beforeModuleIds、moduleIds、optimizeModuleIds、afterOptimizeModuleIds：在生成模块 Id 过程的前后触发。</p></li><li><p>reviveChunks、beforeChunkIds、optimizeChunkIds、afterOptimizeChunkIds：在生成 Chunk id 过程的前后触发。</p></li><li><p>beforeHash、afterHash：在生成模块与 Chunk 的 hash 过程的前后触发。</p></li><li><p>beforeModuleAssets、moduleAsset：在生成模块产物数据过程的前后触发。</p></li><li><p>shouldGenerateChunkAssets、beforeChunkAssets、chunkAsset：在创建 Chunk 产物数据过程的前后触发。</p></li><li><p>additionalAssets、optimizeChunkAssets、afterOptimizeChunkAssets、optimizeAssets、afterOptimizeAssets：在优化产物过程的前后触发，例如在 TerserPlugin 的<a href="https://github.com/webpack-contrib/terser-webpack-plugin/blob/master/src/index.js" target="_blank" rel="noreferrer">压缩代码</a>插件的执行过程中，就用到了 optimizeChunkAssets。</p></li></ul><h3 id="代码实践-编写一个简单的统计插件" tabindex="-1">代码实践：编写一个简单的统计插件 <a class="header-anchor" href="#代码实践-编写一个简单的统计插件" aria-label="Permalink to &quot;代码实践：编写一个简单的统计插件&quot;">​</a></h3><p>在了解了 Webpack 的工作流程后，下面我们进行一个简单的实践。</p><p>编写一个统计构建过程生命周期耗时的插件，这类插件会作为后续优化构建效率的准备工作。插件片段示例如下（完整代码参见 <a href="https://github.com/fe-efficiency/lessons_fe_efficiency/tree/master/10_webpack_workflow" target="_blank" rel="noreferrer">10_webpack_workflow</a>）：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">SamplePlugin</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">apply</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">compiler</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> start </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Date.</span><span style="color:#B392F0;">now</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> statsHooks </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#9ECBFF;">&#39;environment&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;entryOption&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;afterPlugins&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;compile&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> statsAsyncHooks </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&#39;beforeRun&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&#39;beforeCompile&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&#39;make&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&#39;afterCompile&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&#39;emit&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&#39;done&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    statsHooks.</span><span style="color:#B392F0;">forEach</span><span style="color:#E1E4E8;">((hookName) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      compiler.hooks[hookName].</span><span style="color:#B392F0;">tap</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;Sample Plugin&#39;</span><span style="color:#E1E4E8;">, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(\`Compiler Hook \${hookName}, Time</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> \${Date.</span><span style="color:#B392F0;">now</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> start}ms\`)</span></span>
<span class="line"><span style="color:#E1E4E8;">      })</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">    ...</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#E1E4E8;">module.exports </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> SamplePlugin;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">SamplePlugin</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">apply</span><span style="color:#24292E;">(</span><span style="color:#E36209;">compiler</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> start </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Date.</span><span style="color:#6F42C1;">now</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> statsHooks </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#032F62;">&#39;environment&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;entryOption&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;afterPlugins&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;compile&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">var</span><span style="color:#24292E;"> statsAsyncHooks </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&#39;beforeRun&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&#39;beforeCompile&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&#39;make&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&#39;afterCompile&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&#39;emit&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&#39;done&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    statsHooks.</span><span style="color:#6F42C1;">forEach</span><span style="color:#24292E;">((hookName) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      compiler.hooks[hookName].</span><span style="color:#6F42C1;">tap</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;Sample Plugin&#39;</span><span style="color:#24292E;">, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(\`Compiler Hook \${hookName}, Time</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> \${Date.</span><span style="color:#6F42C1;">now</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> start}ms\`)</span></span>
<span class="line"><span style="color:#24292E;">      })</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">    ...</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#24292E;">module.exports </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> SamplePlugin;</span></span></code></pre></div><p>执行构建后，可以看到在控制台输出了相应的统计时间结果（这里的时间是从构建起始到各阶段 Hook 触发为止的耗时），如下图所示：</p>`,7),y=s("p",null,"根据这样的输出结果，我们就可以分析项目里各阶段的耗时情况，再进行针对性地优化。这个统计插件将在后面几课的优化实践中运用。",-1),k=s("p",null,[a("除了这类自己编写的统计插件外，Webpack 社区中也有一些较成熟的统计插件，例如"),s("a",{href:"https://github.com/stephencookdev/speed-measure-webpack-plugin",target:"_blank",rel:"noreferrer"},"speed-measure-webpack-plugin"),a("等，感兴趣的话，你可以进一步了解。")],-1),m=s("h3",{id:"总结",tabindex:"-1"},[a("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),d=s("p",null,"这一课时起，我们进入了 Webpack 构建优化的主题。在这节课中，我主要为你勾画了一个 Webpack 工作流程的轮廓，通过对三个源码文件的分析，让你对执行构建命令后的内部流程有一个基本概念。然后我们讨论了 Compiler 和 Compilation 工作流程中的生命周期 Hooks，以及插件的基本工作方式。最后，我们编写了一个简单的统计插件，用于实践上面所讲的课程内容。",-1),h=s("p",null,"今天的课后思考题是：在今天介绍的 Compiler 和 Compilation 的各生命周期阶段里，通常耗时最长的分别是哪个阶段呢？可以结合自己所在的项目测试分析一下。",-1);function b(u,F,g,C,f,A){const n=e("Image");return t(),c("div",null,[i,p(n,{alt:"image (4).png",src:"https://s0.lgstatic.com/i/image/M00/4D/B4/Ciqc1F9bGtqAJo4uAABnYGwsyYs218.png"}),E,p(n,{alt:"image (5).png",src:"https://s0.lgstatic.com/i/image/M00/4D/B4/Ciqc1F9bGvGAFRmpAAGFrvBhTHE475.png"}),y,k,m,d,h])}const D=o(r,[["render",b]]);export{w as __pageData,D as default};
