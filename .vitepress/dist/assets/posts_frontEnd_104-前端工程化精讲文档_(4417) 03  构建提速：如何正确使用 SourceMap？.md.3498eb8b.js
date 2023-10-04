import{_ as p,j as e,o as t,g as c,k as n,s,h as o,Q as l}from"./chunks/framework.e0c66c3f.js";const T=JSON.parse('{"title":"什么是 Source Map ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/104-前端工程化精讲文档/(4417) 03  构建提速：如何正确使用 SourceMap？.md","filePath":"posts/frontEnd/104-前端工程化精讲文档/(4417) 03  构建提速：如何正确使用 SourceMap？.md","lastUpdated":1696338709000}'),r={name:"posts/frontEnd/104-前端工程化精讲文档/(4417) 03  构建提速：如何正确使用 SourceMap？.md"},E=s("p",null,"在上一课时中我们聊了开发时的热更新机制和其中的技术细节，热更新能帮助我们在开发时快速预览代码效果，免去了手动执行编译和刷新浏览器的操作。课后留的思考题是找一个实现了 HMR 的 Loader，查看其中用到哪些热替换的 API，希望通过这个题目能让你加深对相关知识点的印象。",-1),y=s("p",null,[o("那么除了热更新以外，项目的开发环境还有哪些在影响着我们的开发效率呢？在过去的工作中，公司同事就曾问过我一个问题：为什么我的项目在开发环境下每次构建还是很卡？每次保存完代码都要过 1~2 秒才能看到效果，这是怎么回事呢？其实这里面的原因主要是这位同事在开发时选择的 Source Map 设定不对。今天我们就来具体讨论下这个问题。首先，什么是 "),s("strong",null,"Source Map"),o(" 呢？")],-1),i=s("h3",{id:"什么是-source-map",tabindex:"-1"},[o("什么是 Source Map "),s("a",{class:"header-anchor",href:"#什么是-source-map","aria-label":'Permalink to "什么是 Source Map"'},"​")],-1),u=s("p",null,"在前端开发过程中，通常我们编写的源代码会经过多重处理（编译、封装、压缩等），最后形成产物代码。于是在浏览器中调试产物代码时，我们往往会发现代码变得面目全非，例如：",-1),d=l(`<p>因此，我们需要一种在调试时将产物代码显示回源代码的功能，<strong>source map</strong> 就是实现这一目标的工具。</p><p>source-map 的基本原理是，在编译处理的过程中，在生成产物代码的同时生成产物代码中被转换的部分与源代码中相应部分的映射关系表。有了这样一张完整的映射表，我们就可以通过 Chrome 控制台中的&quot;Enable Javascript source map&quot;来实现调试时的显示与定位源代码功能。</p><p>对于同一个源文件，根据不同的目标，可以生成不同效果的 source map。它们在<strong>构建速度</strong> 、<strong>质量</strong> （反解代码与源代码的接近程度以及调试时行号列号等辅助信息的对应情况）、<strong>访问方式</strong> （在产物文件中或是单独生成 source map 文件）和<strong>文件大小</strong>等方面各不相同。在开发环境和生产环境下，我们对于 source map 功能的期望也有所不同：</p><ul><li><p><strong>在开发环境中</strong>，通常我们关注的是构建速度快，质量高，以便于提升开发效率，而不关注生成文件的大小和访问方式。</p></li><li><p><strong>在生产环境中</strong>，通常我们更关注是否需要提供线上 source map , 生成的文件大小和访问方式是否会对页面性能造成影响等，其次才是质量和构建速度。</p></li></ul><h3 id="webpack-中的-source-map-预设" tabindex="-1">Webpack 中的 source map 预设 <a class="header-anchor" href="#webpack-中的-source-map-预设" aria-label="Permalink to &quot;Webpack 中的 source map 预设&quot;">​</a></h3><p>在 Webpack 中，通过设置 devtool 来选择 source map 的预设类型，文档中共有 <a href="https://webpack.js.org/configuration/devtool/#devtool" target="_blank" rel="noreferrer">20 余种</a> source map 的预设（注意：其中部分预设实际效果与其他预设相同，即页面表格中空白行条目）可供选择，这些预设通常包含了 &quot;eval&quot; &quot;cheap&quot; &quot;module&quot; &quot;inline&quot; &quot;hidden&quot; &quot;nosource&quot; &quot;source-map&quot; 等关键字的组合，这些关键字的具体逻辑如下：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">webpack</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">lib</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">WebpackOptionsApply.js:</span><span style="color:#79B8FF;">232</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (options.devtool.</span><span style="color:#B392F0;">includes</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;source-map&quot;</span><span style="color:#E1E4E8;">)) { </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">hidden</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> options.devtool.</span><span style="color:#B392F0;">includes</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;hidden&quot;</span><span style="color:#E1E4E8;">); </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">inline</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> options.devtool.</span><span style="color:#B392F0;">includes</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;inline&quot;</span><span style="color:#E1E4E8;">); </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">evalWrapped</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> options.devtool.</span><span style="color:#B392F0;">includes</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;eval&quot;</span><span style="color:#E1E4E8;">); </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">cheap</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> options.devtool.</span><span style="color:#B392F0;">includes</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;cheap&quot;</span><span style="color:#E1E4E8;">); </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">moduleMaps</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> options.devtool.</span><span style="color:#B392F0;">includes</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;module&quot;</span><span style="color:#E1E4E8;">); </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">noSources</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> options.devtool.</span><span style="color:#B392F0;">includes</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;nosources&quot;</span><span style="color:#E1E4E8;">); </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Plugin</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> evalWrapped </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;./EvalSourceMapDevToolPlugin&quot;</span><span style="color:#E1E4E8;">) </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;./SourceMapDevToolPlugin&quot;</span><span style="color:#E1E4E8;">); </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Plugin</span><span style="color:#E1E4E8;">({ </span></span>
<span class="line"><span style="color:#E1E4E8;">    filename: inline </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> options.output.sourceMapFilename, </span></span>
<span class="line"><span style="color:#E1E4E8;">    moduleFilenameTemplate: options.output.devtoolModuleFilenameTemplate, </span></span>
<span class="line"><span style="color:#E1E4E8;">    fallbackModuleFilenameTemplate: </span></span>
<span class="line"><span style="color:#E1E4E8;">      options.output.devtoolFallbackModuleFilenameTemplate, </span></span>
<span class="line"><span style="color:#E1E4E8;">    append: hidden </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">undefined</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">    module: moduleMaps </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> cheap </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">    columns: cheap </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">    noSources: noSources, </span></span>
<span class="line"><span style="color:#E1E4E8;">    namespace: options.output.devtoolNamespace </span></span>
<span class="line"><span style="color:#E1E4E8;">  }).</span><span style="color:#B392F0;">apply</span><span style="color:#E1E4E8;">(compiler); </span></span>
<span class="line"><span style="color:#E1E4E8;">} </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (options.devtool.</span><span style="color:#B392F0;">includes</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;eval&quot;</span><span style="color:#E1E4E8;">)) { </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">EvalDevToolModulePlugin</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">require</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;./EvalDevToolModulePlugin&quot;</span><span style="color:#E1E4E8;">); </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">EvalDevToolModulePlugin</span><span style="color:#E1E4E8;">({ </span></span>
<span class="line"><span style="color:#E1E4E8;">    moduleFilenameTemplate: options.output.devtoolModuleFilenameTemplate, </span></span>
<span class="line"><span style="color:#E1E4E8;">    namespace: options.output.devtoolNamespace </span></span>
<span class="line"><span style="color:#E1E4E8;">  }).</span><span style="color:#B392F0;">apply</span><span style="color:#E1E4E8;">(compiler); </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">webpack</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">lib</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">WebpackOptionsApply.js:</span><span style="color:#005CC5;">232</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (options.devtool.</span><span style="color:#6F42C1;">includes</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;source-map&quot;</span><span style="color:#24292E;">)) { </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">hidden</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> options.devtool.</span><span style="color:#6F42C1;">includes</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;hidden&quot;</span><span style="color:#24292E;">); </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">inline</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> options.devtool.</span><span style="color:#6F42C1;">includes</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;inline&quot;</span><span style="color:#24292E;">); </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">evalWrapped</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> options.devtool.</span><span style="color:#6F42C1;">includes</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;eval&quot;</span><span style="color:#24292E;">); </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">cheap</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> options.devtool.</span><span style="color:#6F42C1;">includes</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;cheap&quot;</span><span style="color:#24292E;">); </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">moduleMaps</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> options.devtool.</span><span style="color:#6F42C1;">includes</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;module&quot;</span><span style="color:#24292E;">); </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">noSources</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> options.devtool.</span><span style="color:#6F42C1;">includes</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;nosources&quot;</span><span style="color:#24292E;">); </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Plugin</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> evalWrapped </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;./EvalSourceMapDevToolPlugin&quot;</span><span style="color:#24292E;">) </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;./SourceMapDevToolPlugin&quot;</span><span style="color:#24292E;">); </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Plugin</span><span style="color:#24292E;">({ </span></span>
<span class="line"><span style="color:#24292E;">    filename: inline </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> options.output.sourceMapFilename, </span></span>
<span class="line"><span style="color:#24292E;">    moduleFilenameTemplate: options.output.devtoolModuleFilenameTemplate, </span></span>
<span class="line"><span style="color:#24292E;">    fallbackModuleFilenameTemplate: </span></span>
<span class="line"><span style="color:#24292E;">      options.output.devtoolFallbackModuleFilenameTemplate, </span></span>
<span class="line"><span style="color:#24292E;">    append: hidden </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">undefined</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">    module: moduleMaps </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> cheap </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">    columns: cheap </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">false</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">    noSources: noSources, </span></span>
<span class="line"><span style="color:#24292E;">    namespace: options.output.devtoolNamespace </span></span>
<span class="line"><span style="color:#24292E;">  }).</span><span style="color:#6F42C1;">apply</span><span style="color:#24292E;">(compiler); </span></span>
<span class="line"><span style="color:#24292E;">} </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (options.devtool.</span><span style="color:#6F42C1;">includes</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;eval&quot;</span><span style="color:#24292E;">)) { </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">EvalDevToolModulePlugin</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">require</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;./EvalDevToolModulePlugin&quot;</span><span style="color:#24292E;">); </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">EvalDevToolModulePlugin</span><span style="color:#24292E;">({ </span></span>
<span class="line"><span style="color:#24292E;">    moduleFilenameTemplate: options.output.devtoolModuleFilenameTemplate, </span></span>
<span class="line"><span style="color:#24292E;">    namespace: options.output.devtoolNamespace </span></span>
<span class="line"><span style="color:#24292E;">  }).</span><span style="color:#6F42C1;">apply</span><span style="color:#24292E;">(compiler); </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>如上面的代码所示， devtool 的值匹配并非精确匹配，某个关键字只要包含在赋值中即可获得匹配，例如：&#39;foo-eval-bar&#39; 等同于 &#39;eval&#39;，&#39;cheapfoo-source-map&#39; 等同于 &#39;cheap-source-map&#39;。</p><h4 id="source-map-名称关键字" tabindex="-1">Source Map 名称关键字 <a class="header-anchor" href="#source-map-名称关键字" aria-label="Permalink to &quot;Source Map 名称关键字&quot;">​</a></h4><p>各字段的作用各不相同，为了便于记忆，我们在这里简单整理下这些关键字的作用：</p><ul><li><p><strong>false</strong>：即不开启 source map 功能，其他不符合上述规则的赋值也等价于 false。</p></li><li><p><strong>eval</strong>：是指在编译器中使用 EvalDevToolModulePlugin 作为 source map 的处理插件。</p></li><li><p><strong>[xxx-...]source-map</strong> ：根据 devtool 对应值中是否有 <strong>eval</strong> 关键字来决定使用 EvalSourceMapDevToolPlugin 或 SourceMapDevToolPlugin 作为 source map 的处理插件，其余关键字则决定传入到插件的相关字段赋值。</p></li><li><p><strong>inline</strong> ：决定是否传入插件的 filename 参数，作用是决定单独生成 source map 文件还是在行内显示，<strong>该参数在 eval- 参数存在时无效</strong>。</p></li><li><p><strong>hidden</strong> ：决定传入插件 append 的赋值，作用是判断是否添加 SourceMappingURL 的注释，<strong>该参数在 eval- 参数存在时无效</strong>。</p></li><li><p><strong>module</strong>：为 true 时传入插件的 module 为 true ，作用是为加载器（Loaders）生成 source map。</p></li><li><p><strong>cheap</strong>：这个关键字有两处作用。首先，当 module 为 false 时，它决定插件 module 参数的最终取值，最终取值与 cheap 相反。其次，它决定插件 columns 参数的取值，作用是决定生成的 source map 中是否包含列信息，在不包含列信息的情况下，调试时只能定位到指定代码所在的行而定位不到所在的列。</p></li><li><p><strong>nosource</strong>：nosource 决定了插件中 noSource 变量的取值，作用是决定生成的 source map 中是否包含源代码信息，不包含源码情况下只能显示调用堆栈信息。</p></li></ul><h4 id="source-map-处理插件" tabindex="-1">Source Map 处理插件 <a class="header-anchor" href="#source-map-处理插件" aria-label="Permalink to &quot;Source Map 处理插件&quot;">​</a></h4><p>从上面的规则中我们还可以看到，根据不同规则，实际上 Webpack 是从三种插件中选择其一作为 source map 的处理插件。</p><ul><li><p><a href="https://github.com/webpack/webpack/blob/master/lib/EvalDevToolModulePlugin.js" target="_blank" rel="noreferrer">EvalDevToolModulePlugin</a>：模块代码后添加 sourceURL=webpack:///+ 模块引用路径，不生成 source map 内容，模块产物代码通过 eval() 封装。</p></li><li><p><a href="https://github.com/webpack/webpack/blob/master/lib/EvalSourceMapDevToolPlugin.js" target="_blank" rel="noreferrer">EvalSourceMapDevToolPlugin</a>：生成 base64 格式的 source map 并附加在模块代码之后， source map 后添加 sourceURL=webpack:///+ 模块引用路径，不单独生成文件，模块产物代码通过 eval() 封装。</p></li><li><p><a href="https://github.com/webpack/webpack/blob/master/lib/SourceMapDevToolPlugin.js" target="_blank" rel="noreferrer">SourceMapDevToolPlugin</a>：生成单独的 .map 文件，模块产物代码不通过 eval 封装。</p></li></ul><p>通过上面的代码分析，我们了解了不同参数在 Webpack 运行时起到的作用。那么这些不同参数组合下的各种预设对我们的 source map 生成又各自会产生什么样的效果呢？下面我们通过示例来看一下。</p><h3 id="不同预设的示例结果对比" tabindex="-1">不同预设的示例结果对比 <a class="header-anchor" href="#不同预设的示例结果对比" aria-label="Permalink to &quot;不同预设的示例结果对比&quot;">​</a></h3><p>下面，以课程示例代码 <a href="https://github.com/fe-efficiency/lessons_fe_efficiency/tree/master/03_develop_environment" target="_blank" rel="noreferrer">03_develop_environment</a> 为例，我们来对比下几种常用预设的差异（为了使时间差异更明显，示例中引入了几个大的类库文件）：</p>`,17),m=l('<blockquote><p>*注1：&quot;/&quot;前后分别表示产物 js 大小和对应 .map 大小。</p><p>*注2：&quot;/&quot;前后分别表示初次构建时间和开启 watch 模式下 rebuild 时间。对应统计的都是 development 模式下的笔者机器环境下几次构建时间的平均值，只作为相对快慢与量级的比较。</p></blockquote><h4 id="不同预设的效果总结" tabindex="-1">不同预设的效果总结 <a class="header-anchor" href="#不同预设的效果总结" aria-label="Permalink to &quot;不同预设的效果总结&quot;">​</a></h4><p>从上图的数据中我们不难发现，选择不同的 devtool 类型在以下几个方面会产生不同的效果。</p><ul><li><p>质量：生成的 source map 的质量分为 5 个级别，对应的调试便捷性依次降低：源代码 &gt; 缺少列信息的源代码 &gt; loader 转换后的代码 &gt; 生成后的产物代码 &gt; 无法显示代码（具体参见下面的<strong>不同质量的源码示例</strong>小节）。对应对质量产生影响的预设关键字优先级为 souce-map = eval-source-map &gt; cheap-module- &gt; cheap- &gt; eval = none &gt; nosource-。</p></li><li><p>构建的速度：再次构建速度都要显著快于初次构建速度。不同环境下关注的速度也不同：</p><ul><li><p>在开发环境下：一直开着 devServer，再次构建的速度对我们的效率影响远大于初次构建的速度。从结果中可以看到，eval- 对应的 EvalSourceMapDevToolPlugin 整体要快于不带 eval- 的 SourceMapDevToolPlugin。尤其在质量最佳的配置下，eval-source-map 的再次构建速度要远快于其他几种。而同样插件配置下，不同质量配置与构建速度成反比，但差异程度有限，更多是看具体项目的大小而定。</p></li><li><p>在生产环境下：通常不会开启再次构建，因此相比再次构建，初次构建的速度更值得关注，甚至对构建速度以外因素的考虑要优先于对构建速度的考虑，这一部分我们在之后的构建优化的课程里会再次讨论到。</p></li></ul></li><li><p>包的大小和生成方式：在开发环境下我们并不需要关注这些因素，正如在开发环境下也通常不考虑使用分包等优化方式。我们需要关注速度和质量来保证我们的高效开发体验，而其他的部分则是在生产环境下需要考虑的问题。</p></li></ul><h4 id="不同质量的源码示例" tabindex="-1">不同质量的源码示例 <a class="header-anchor" href="#不同质量的源码示例" aria-label="Permalink to &quot;不同质量的源码示例&quot;">​</a></h4><ul><li>源码且包含列信息</li></ul>',6),g=s("ul",null,[s("li",null,"源码不包含列信息")],-1),F=s("ul",null,[s("li",null,"Loader转换后代码")],-1),v=s("ul",null,[s("li",null,"生成后的产物代码")],-1),h=l(`<h4 id="开发环境下-source-map-推荐预设" tabindex="-1">开发环境下 Source Map 推荐预设 <a class="header-anchor" href="#开发环境下-source-map-推荐预设" aria-label="Permalink to &quot;开发环境下 Source Map 推荐预设&quot;">​</a></h4><p>在这里我们对开发环境下使用的推荐预设做一个总结（生产环境的预设我们将在之后的构建效率篇中再具体分析）：</p><ul><li><p>通常来说，开发环境首选哪一种预设取决于 source map 对于我们的帮助程度。</p></li><li><p>如果对项目代码了如指掌，查看产物代码也可以无障碍地了解对应源代码的部分，那就可以关闭 devtool 或使用 eval 来获得最快构建速度。</p></li><li><p>反之如果在调试时，需要通过 source map 来快速定位到源代码，则优先考虑使用 <strong>eval-cheap-modulesource-map</strong>，它的质量与初次/再次构建速度都属于次优级，以牺牲定位到列的功能为代价换取更快的构建速度通常也是值得的。</p></li><li><p>在其他情况下，根据对质量要求更高或是对速度要求更高的不同情况，可以分别考虑使用 <strong>eval-source-map</strong> 或 <strong>eval-cheap-source-map</strong>。</p></li></ul><p>了解了开发环境下如何选择 source map 预设后，我们再来补充几种工具和脚手架中的默认预设：</p><ul><li><p>Webpack 配置中，如果不设定 devtool，则使用默认值 eval，即速度与 devtool:false 几乎相同、但模块代码后多了 sourceURL 以帮助定位模块的文件名称。</p></li><li><p><a href="https://github.com/facebook/create-react-app/blob/fa648daca1dedd97aec4fa3bae8752c4dcf37e6f/packages/react-scripts/config/webpack.config.js" target="_blank" rel="noreferrer">create-react-app 中</a>，在生产环境下，根据 shouldUseSourceMap 参数决定使用&#39;source-map&#39;或 false；在开发环境下使用&#39;cheap-module-source-map&#39;（不包含列信息的源代码，但更快）。</p></li><li><p><a href="https://github.com/vuejs/vue-cli/blob/36f961e43dc76705878659247b563e2af83138ce/packages/%40vue/cli-service/lib/commands/serve.js" target="_blank" rel="noreferrer">vue-cli-service 中</a>，与 creat-react-app 中相同。</p></li></ul><p>除了上面讨论的这些简单的预设外，Webpack 还允许开发者直接使用对应插件来进行更精细化的 source map 控制，在开发环境下我们首选的还是 EvalSourceMapDevToolPlugin。下面我们再来看看如何直接使用这个插件进行优化。</p><h4 id="evalsourcemapdevtoolplugin-的使用" tabindex="-1">EvalSourceMapDevToolPlugin 的使用 <a class="header-anchor" href="#evalsourcemapdevtoolplugin-的使用" aria-label="Permalink to &quot;EvalSourceMapDevToolPlugin 的使用&quot;">​</a></h4><p>在 EvalSourceMapDevToolPlugin 的 <a href="https://webpack.js.org/plugins/eval-source-map-dev-tool-plugin/" target="_blank" rel="noreferrer">传入参数</a>中，除了上面和预设相关的 filename、append、module、columns 外，还有影响注释内容的 moduleFilenameTemplate 和 protocol，以及影响处理范围的 test、include、exclude。这里重点看处理范围的参数，因为通常我们需要调试的是开发的业务代码部分，而非依赖的第三方模块部分。因此在生成 source map 的时候如果可以排除第三方模块的部分而只生成业务代码的 source map，无疑能进一步提升构建的速度，例如示例：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">webpack.config.js </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//devtool: &#39;eval-source-map&#39;, </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">devtool</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">plugins</span><span style="color:#E1E4E8;">: [ </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> webpack.</span><span style="color:#B392F0;">EvalSourceMapDevToolPlugin</span><span style="color:#E1E4E8;">({ </span></span>
<span class="line"><span style="color:#E1E4E8;">      exclude:</span><span style="color:#DBEDFF;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#DBEDFF;">node_modules</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">      module: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">, </span></span>
<span class="line"><span style="color:#E1E4E8;">      columns: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">    }) </span></span>
<span class="line"><span style="color:#E1E4E8;">  ], </span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">...</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">webpack.config.js </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">...</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//devtool: &#39;eval-source-map&#39;, </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">devtool</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">plugins</span><span style="color:#24292E;">: [ </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> webpack.</span><span style="color:#6F42C1;">EvalSourceMapDevToolPlugin</span><span style="color:#24292E;">({ </span></span>
<span class="line"><span style="color:#24292E;">      exclude:</span><span style="color:#032F62;"> /node_modules/</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">      module: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">, </span></span>
<span class="line"><span style="color:#24292E;">      columns: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">    }) </span></span>
<span class="line"><span style="color:#24292E;">  ], </span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">...</span></span></code></pre></div><p>在上面的示例中，我们将 devtool 设为 false，而直接使用 EvalSourceMapDevToolPlugin，通过传入 module: true 和 column:false，达到和预设 eval-cheap-module-source-map 一样的质量，同时传入 exclude 参数，排除第三方依赖包的 source map 生成。保存设定后通过运行可以看到，在文件体积减小（尽管开发环境并不关注文件大小）的同时，再次构建的速度相比上面表格中的速度提升了将近一倍，达到了最快一级。</p>`,10),_=l('<p>类似这样的优化可以帮助我们在一些大型项目中，通过自定义设置来获取比预设更好的开发体验。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>在今天这一课时中，我们主要了解了提升开发效率的另一个重要工具------source map 的用途和使用方法。我们分析了 Webpack 中 devtool 的各种参数预设的组合规则、使用效果及其背后的原理。对于开发环境，我们根据一组示例对比分析来了解通常情况下的最佳选择，也知道了如何直接使用插件来达到更细致的优化。</p><p>限于篇幅原因，关于 source map 这一课时还有两个与提效无关的小细节没有提到，一个是生成的 source map 的内容，即浏览器工具是如何将 source map 内容映射回源文件的，如果你感兴趣可以通过这个<a href="http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html" target="_blank" rel="noreferrer">链接</a>进一步了解；另一个是我们在控制台的网络面板中通常看不到 source map 文件的请求，其原因是出于安全考虑 Chrome 隐藏了 source map 的请求，需要通过 <a href="chrome://net-export/" target="_blank" rel="noreferrer">net-log</a> 来查询。</p><p><strong>最后还是留一个小作业</strong>：不知道你有没有留意过自己项目里的 source map 使用的是哪一种生成方式吗？可以根据这一课时的内容对它进行调整和观察效果，也欢迎你在课后留言区讨论项目里对 source map 的优化方案。</p>',5);function b(q,C,f,D,A,k){const a=e("Image");return t(),c("div",null,[E,y,i,u,n(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/42/93/Ciqc1F85_FmAA4UeAABWNiHqsWQ595.png"}),d,n(a,{alt:"12.png",src:"https://s0.lgstatic.com/i/image/M00/43/5E/Ciqc1F87kyiAZvHdAAIGvohk2F4144.png"}),m,n(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/42/9E/CgqCHl85_KuANSVfAADSE8VO7Qg572.png"}),g,n(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/42/93/Ciqc1F85_LCAMTlgAADhqpZ4v9o628.png"}),F,n(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/42/9E/CgqCHl85_LqAPrYzAADfmUwS_JE006.png"}),v,n(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/42/9E/CgqCHl85_MGAHhmMAAKGwvDeXIM418.png"}),h,n(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/42/9E/CgqCHl85_N2AUkcpAAEqvMKhgVQ549.png"}),_])}const S=p(r,[["render",b]]);export{T as __pageData,S as default};
