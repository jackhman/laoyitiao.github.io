import{_ as o,j as e,o as t,g as r,k as a,h as l,s,Q as p}from"./chunks/framework.e0c66c3f.js";const j=JSON.parse('{"title":"前端技术发展轨迹 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/105-前端基础建设与架构文档/(5949) 导读  前端技术发展回顾和架构升级之路.md","filePath":"posts/frontEnd/105-前端基础建设与架构文档/(5949) 导读  前端技术发展回顾和架构升级之路.md","lastUpdated":1696338709000}'),c={name:"posts/frontEnd/105-前端基础建设与架构文档/(5949) 导读  前端技术发展回顾和架构升级之路.md"},E=s("p",null,"这一讲我将从整体上梳理前端开发的演进历史，并从渲染方案架构升级的案例出发，带你了解现代化开发的方向。这部分内容并不涉及具体技术细节，更多的是作为本专栏的导读，带你体会现代化前端架构和基建的背景以及目前前端开发的大环境。",-1),y=s("h3",{id:"前端技术发展轨迹",tabindex:"-1"},[l("前端技术发展轨迹 "),s("a",{class:"header-anchor",href:"#前端技术发展轨迹","aria-label":'Permalink to "前端技术发展轨迹"'},"​")],-1),i=s("p",null,"过去十多年，前端技术发展日新月异，互联网风口也从 PC 时代过渡到移动时代甚至智能时代。其间，前端岗位从无到有，再到如今扮演了至关重要的角色。相应地，前端基建和架构也慢慢浮出水面，呈现百花齐放的场景，技术环节自然也愈发复杂。",-1),d=s("p",null,"我们先从前端的技术发展轨迹说起，如下图所示：",-1),g=p(`<p>前端技术的发展轨迹图</p><p>在静态网页 + 后端 MVC 技术架构时期，严格来说，并没有专职前端工程师的职位。Web 工程师主要集中在后端方向，通过 Model 模型层进行数据的存储和读取、Controller 控制层对数据进行处理并实现业务逻辑需求，最终在 View 视图层展示数据。这时候，<strong>每次请求都对应了一个静态页面的生成过程，我们把这种技术时代称为 Web1.0</strong>。</p><p>接着，随着<strong>2005 年 Ajax 技术的出现，标志了 Web1.0 到 Web2.0 的重要演进</strong>。此时，出现了真正意义上的前后端分离概念，这也使得前端工程师开始占据开发岗位的一席之地。前端通过 Ajax 技术获取数据，进行页面的展现和交互，而后端往往通过 Restful 接口，和前端进行协作。这个时期，前端需要大量地处理数据，因此前端 MVC 框架得到了发展。</p><p>比如，早期极具代表性的 Backbone.js 框架，架构风格非常明显，我们可以看一下如下代码：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> M </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Backbone.Model.</span><span style="color:#B392F0;">extend</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">　　defaults</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> {name</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;lucas&quot;</span><span style="color:#E1E4E8;">} ,</span></span>
<span class="line"><span style="color:#E1E4E8;">　　initialize </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">function</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">　　　　</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">on</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;change&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#B392F0;">function</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">　　　　　　console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;change&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">　　　　})</span></span>
<span class="line"><span style="color:#E1E4E8;">　　}</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> model </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">M</span><span style="color:#E1E4E8;">()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> M </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Backbone.Model.</span><span style="color:#6F42C1;">extend</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">　　defaults</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> {name</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;lucas&quot;</span><span style="color:#24292E;">} ,</span></span>
<span class="line"><span style="color:#24292E;">　　initialize </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">function</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">　　　　</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">on</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;change&quot;</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">function</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">　　　　　　console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;change&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">　　　　})</span></span>
<span class="line"><span style="color:#24292E;">　　}</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> model </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">M</span><span style="color:#24292E;">()</span></span></code></pre></div><p><strong>这里的</strong> <code>Backbone.Model</code>实际上不仅包含了数据<code>{name: &quot;lucas&quot;}</code>，其实也包含了数据变更时的监听事件。对应 View 层代码：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> V </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Backbone.View.</span><span style="color:#B392F0;">extend</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">　　initialize</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">function</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">　　　　</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">listenTo</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.model, </span><span style="color:#9ECBFF;">&quot;change&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.show) </span></span>
<span class="line"><span style="color:#E1E4E8;">　　},</span></span>
<span class="line"><span style="color:#E1E4E8;">　　show</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">funtion</span><span style="color:#E1E4E8;">(model) {</span></span>
<span class="line"><span style="color:#E1E4E8;">　　　　</span><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;#id&quot;</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">append</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.model.name)</span></span>
<span class="line"><span style="color:#E1E4E8;">　　}</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> m</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">M</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">var v </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">V</span><span style="color:#E1E4E8;">({model</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> m})</span></span>
<span class="line"><span style="color:#E1E4E8;">m.</span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;name&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;hi&quot;</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> V </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Backbone.View.</span><span style="color:#6F42C1;">extend</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">　　initialize</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">function</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">　　　　</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">listenTo</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.model, </span><span style="color:#032F62;">&quot;change&quot;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.show) </span></span>
<span class="line"><span style="color:#24292E;">　　},</span></span>
<span class="line"><span style="color:#24292E;">　　show</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">funtion</span><span style="color:#24292E;">(model) {</span></span>
<span class="line"><span style="color:#24292E;">　　　　</span><span style="color:#6F42C1;">$</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;#id&quot;</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">append</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.model.name)</span></span>
<span class="line"><span style="color:#24292E;">　　}</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> m</span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">M</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">var v </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">V</span><span style="color:#24292E;">({model</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> m})</span></span>
<span class="line"><span style="color:#24292E;">m.</span><span style="color:#6F42C1;">set</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;name&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;hi&quot;</span><span style="color:#24292E;">)</span></span></code></pre></div><p>Backbone.js 的出现是革命性的。但是以上述代码为例，<strong>如果业务足够复杂的话，上述状态机一般的代码就会成为负担，代码量也变得非常臃肿，难以维护</strong>。</p><p>随着前端处理数据理念的革新，一种更新潮的 MVVM（View + ViewModel + Model）模式框架就出现了，MVVM 和 MVC 最大的区别在于：MVVM 采用双向绑定（Data Binding）或自动渲染更新。</p><p>也就是说，View 层的变动，可以自动反映在 ViewModel 层。Angular 和 Vue 都采用这种模式。虽然 React 官方声称自己只是一个 View 层类库，但是 React 搭配数据状态管理生态，也符合 MVVM 模式。当然 React 并不是双向绑定风格的解决方案，自动渲染更新也代表了一种潮流和方向。</p><p>整体看来，架构层面 MVC 风格向 MVVM 风格的演进，不仅简化了数据与视图的依赖，还解决了数据频繁更新的问题。再加上虚拟 DOM 理念，为开发者屏蔽了 DOM 操作，业界框架方案逐渐稳定，这种低耦合模式也代表了现代化的设计理念。</p><p>这个时期，前后端分离技术发展到了顶峰，前端框架也互相学习借鉴，直到如今的<strong>Vue/React/Angular 三足鼎立</strong>的局面。</p><p>这个时代的稳定性一直持续到 Node.js 的崛起，随着 Node.js 的出现，稳固的技术体系瞬间被打破。通过 Node.js，除了前端工具链、工程化得以发展，前端也实现 BFF（Backend For Frontend）层，这样的架构设计好处显而易见：</p><ul><li><p>前端工程师可以<strong>自行编写后端服务，实现数据的适配</strong>，应用场景包括接口的整合编排、字段裁剪；</p></li><li><p>前端工程师可以实现<strong>SSR（服务端渲染直出）技术</strong>，达到提升首屏性能以及 SEO 友好的目的；</p></li><li><p>前端工程师可以实现各种<strong>后端领域服务</strong>。</p></li></ul><p>为了&quot;紧跟技术潮流&quot;的发展，Vue 和 React 等当红框架依靠虚拟 DOM 技术，推出同构方案。SSR 架构模式横空出世，成了前端技术演进的新方向。</p><p>但是 Node.js 技术不是银弹，SSR 架构也不是毫无成本。前端工程师落地 Node.js 技术，就要关心服务器的运维、部署、发布、监控。有没有一种&quot;just work&quot;的技术，使得我们能够更轻松地专注前端业务代码的开发，直接上手 Node.js 呢？</p><p>为了解决上述问题，<strong>Serverless 理念</strong>应运而生。简单来说，我们可以将服务器的运维功能都交给 Serverless 平台进行管理，研发人员只需要专注于实现云函数即可完成功能开发。</p><p>你看，短短十多年，前端技术发展和演进史已经非常精彩。其实这段演进当中，也有诸多值得关注的里程碑和代表技术理念，比如以下几点。</p>`,18),h=p('<p><strong>1. 以 GraphQL 技术为代表的数据源聚合和字段裁剪方案</strong><br><strong>2. 以组件化架构为代表的 UI 搭建技术</strong>，在 UI 搭建技术里面，我们也可以总结出一个微观技术方向：</p><ul><li><p>以原子组件为基准的组件化方案（Ant Design、Element）</p></li><li><p>以模板库为代表（Ant Design Pro）的一体化组件化方案</p></li><li><p>以 No code/Low code 为代表的配置化解决方案</p></li><li><p>以机器学习智能化为代表的搭建方案（设计图 → 代码直出）</p></li></ul><p><strong>3. 以微前端为代表的、前端应用聚合为单体应用的工程方案</strong><br><strong>4. 以 PWA、小程序、快应用等为代表的平台化方案</strong><br><strong>5. 以 PhoneGap → Ionic → React Native → Flutter 等演进方向为代表的移动端跨端方案</strong></p><p>总之，前端技术发展从没有一刻停歇，而在技术架构演进的过程中，需要前端开发者不断保持进步和学习。其中，对于基础建设和架构设计的学习，将会是最核心、最重要的学习方向和目标。</p><p>下面，我们简单了解一下现代技术架构。</p><h3 id="现代化的前端技术架构解读" tabindex="-1">现代化的前端技术架构解读 <a class="header-anchor" href="#现代化的前端技术架构解读" aria-label="Permalink to &quot;现代化的前端技术架构解读&quot;">​</a></h3><p><strong>一方面，前端领域的现代技术架构，永远无法脱离应用终端和宿主</strong>。这其中：前端不再局限于 PC 和移动智能手机端，智能手表、眼镜会是新的平台方向，同时文件系统、相机、PWA 和硬件传感器等新型 API 都已经应用在 Web 前端当中。</p><p><strong>第二方面，现代 JavaScript 也发展成为一种真正成熟的语言，并且还将会持续引入新的特性和功能</strong> 。同时<strong>TypeScript，甚至 Elm、PureScript 和 ReasonML 将会得到更多关注</strong>。因此，一套现代化的前端方案，必然要处理语言的发展和宿主的碎片化、滞后性这一矛盾，也必然会有一个更厚重的编译。</p><p>第三方面，网络基础设施永远都在变得更快、更稳定，流媒体和视频点播成为日常，<strong>前端的用户体验和富媒体技术愈发成为应用的关键</strong>。</p><p>基于上述背景，现代化前端技术架构的特点呼之欲出：</p><ul><li><p>组件化是基本 UI 架构；</p></li><li><p>依托于 SSR 同构技术以及心智负担的最小化，框架层面提供的虚拟 DOM 会成为生态标配；</p></li><li><p>数据状态管理方案将会以职责单一、minimal necessary 为目标，以组合性、函数式为理念，而不以双向数据流和单向数据流的区分为重点；</p></li><li><p>前端向传统后端领域进军是必然，一个 CSR/SSR 可切换的协作方案可以把前端优势特点放大到最大。</p></li></ul><p>总之，基础建设和工程化建设、代码设计和架构之道，也将围绕以上几个特点给出答案。我们的课程也会围绕这些方向展开。</p><h3 id="从-csr-→-ssr-→-nsr-→-esr-渲染方案演进看前端架构演进方向" tabindex="-1">从 CSR → SSR → NSR → ESR 渲染方案演进看前端架构演进方向 <a class="header-anchor" href="#从-csr-→-ssr-→-nsr-→-esr-渲染方案演进看前端架构演进方向" aria-label="Permalink to &quot;从 CSR → SSR → NSR → ESR 渲染方案演进看前端架构演进方向&quot;">​</a></h3><p>上面我们从宏观的角度阐述了前端技术架构方向。这一部分，我会以前端渲染架构为例，从真实的技术环节、更立体地说明架构演进。我将以 CSR → SSR → NSR → ESR 方案来进行讲解。</p><p><strong>CSR：Client Side Rendering</strong>，浏览器端渲染也许是大家最为熟悉的渲染架构。这种渲染架构很好理解，如下图所示：</p>',15),F=s("p",null,[l("CSR 渲染架构图（图片来源："),s("a",{href:"https://developers.google.com/web/updates/2019/02/rendering-on-the-web",target:"_blank",rel:"noreferrer"},"https://developers.google.com/web/updates/2019/02/rendering-on-the-web"),l("）")],-1),u=s("p",null,"CSR 渲染架构的特点非常明显：",-1),_=s("ul",null,[s("li",null,[s("p",null,"实现了前后端架构分离，实现了前后端职责分离；")]),s("li",null,[s("p",null,"TTFB 时间最小，但由于客户端和服务端会有多次交互（获取静态资源、获取数据）才能进行渲染，实际首屏效果以及 FCP/FMP 时间不够理想。")])],-1),S=s("p",null,[l("CSR 渲染时序图（图片来源："),s("a",{href:"https://developers.google.com/web/updates/2019/02/rendering-on-the-web",target:"_blank",rel:"noreferrer"},"https://developers.google.com/web/updates/2019/02/rendering-on-the-web"),l("）")],-1),A=s("p",null,"我们可以通过代码分离等技术弥补实际内容渲染的滞后，但从渲染架构上讲，CSR 却有着基因上的弊端。",-1),C=s("p",null,[s("strong",null,"SSR：Server Side Rendering"),l("，在服务端完成页面模板、数据预取、填充，并且在服务端就可以将完整的 HTML 内容返回给浏览器。如下图：")],-1),m=s("p",null,[l("SSR 渲染架构图（图片来源："),s("a",{href:"https://developers.google.com/web/updates/2019/02/rendering-on-the-web",target:"_blank",rel:"noreferrer"},"https://developers.google.com/web/updates/2019/02/rendering-on-the-web"),l("）")],-1),b=p(`<p>SSR 渲染时序图（图片来源：<a href="https://developers.google.com/web/updates/2019/02/rendering-on-the-web" target="_blank" rel="noreferrer">https://developers.google.com/web/updates/2019/02/rendering-on-the-web</a>）</p><p>实际上，SSR 还涉及更多内容：我们在服务端预取了数据，并返回了数据和 HTML 内容。理想情况下，不需要在客户端再次请求数据，而是直接消费数据即可。因此我们<strong>可以将 SSR 和 CSR 相结合，即实现一个基于 hydration（注水） 的 SSR 和 CSR 结合方案</strong>。</p><p>先来解释一下 hydration，这个概念和同构应用中数据的获取和消费有关。在服务器端渲染时，首先服务端请求接口拿到数据，处理并准备好数据状态（如果使用 Redux，就进行 store 的更新）。</p><p>为了减少客户端的请求，我们需要保留住这个状态。一般做法是在服务器端返回 HTML 字符串的时候，将数据 JSON.stringify 一并返回，这个过程，叫作脱水（dehydrate）；在客户端，就不再需要进行数据的请求了，可以直接使用服务端下发下来的数据，这个过程叫注水（hydrate）。</p><p>用代码来表示，我们将数据放到 window 变量上：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">ctx.body </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> \`</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">&lt;!</span><span style="color:#E1E4E8;">DOCTYPE html</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">html lang</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;en&quot;</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">head</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">meta charset</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;UTF-8&quot;</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">&lt;/</span><span style="color:#E1E4E8;">head</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">body</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">script</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">        window.context </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          initialState</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> \${JSON.</span><span style="color:#B392F0;">stringify</span><span style="color:#E1E4E8;">(store.</span><span style="color:#B392F0;">getState</span><span style="color:#E1E4E8;">())}</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">&lt;/</span><span style="color:#E1E4E8;">script</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">div id</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;app&quot;</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">&lt;/</span><span style="color:#E1E4E8;">div</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">&lt;/</span><span style="color:#E1E4E8;">body</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">&lt;/</span><span style="color:#E1E4E8;">html</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">\`</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">ctx.body </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> \`</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">&lt;!</span><span style="color:#24292E;">DOCTYPE html</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">html lang</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;en&quot;</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">head</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">meta charset</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;UTF-8&quot;</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">&lt;/</span><span style="color:#24292E;">head</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">body</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">script</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">        window.context </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          initialState</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> \${JSON.</span><span style="color:#6F42C1;">stringify</span><span style="color:#24292E;">(store.</span><span style="color:#6F42C1;">getState</span><span style="color:#24292E;">())}</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">&lt;/</span><span style="color:#24292E;">script</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">div id</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;app&quot;</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#6A737D;">// ...</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">&lt;/</span><span style="color:#24292E;">div</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">&lt;/</span><span style="color:#24292E;">body</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">&lt;/</span><span style="color:#24292E;">html</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">\`</span></span></code></pre></div><p>对应客户端：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">export </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> getClientStore </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> defaultState </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> JSON.</span><span style="color:#B392F0;">parse</span><span style="color:#E1E4E8;">(window.context.state)</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createStore</span><span style="color:#E1E4E8;">(reducer, defaultState, </span><span style="color:#B392F0;">applyMiddleware</span><span style="color:#E1E4E8;">(thunk))</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">ReactDOM.</span><span style="color:#B392F0;">hydrate</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">App date</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">{</span><span style="color:#B392F0;">getClientStore</span><span style="color:#E1E4E8;">().</span><span style="color:#B392F0;">getState</span><span style="color:#E1E4E8;">()} </span><span style="color:#F97583;">/&gt;</span><span style="color:#E1E4E8;">, document.</span><span style="color:#B392F0;">getElementById</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;root&#39;</span><span style="color:#E1E4E8;">))</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">export </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> getClientStore </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> defaultState </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> JSON.</span><span style="color:#6F42C1;">parse</span><span style="color:#24292E;">(window.context.state)</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createStore</span><span style="color:#24292E;">(reducer, defaultState, </span><span style="color:#6F42C1;">applyMiddleware</span><span style="color:#24292E;">(thunk))</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">ReactDOM.</span><span style="color:#6F42C1;">hydrate</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">App date</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">{</span><span style="color:#6F42C1;">getClientStore</span><span style="color:#24292E;">().</span><span style="color:#6F42C1;">getState</span><span style="color:#24292E;">()} </span><span style="color:#D73A49;">/&gt;</span><span style="color:#24292E;">, document.</span><span style="color:#6F42C1;">getElementById</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;root&#39;</span><span style="color:#24292E;">))</span></span></code></pre></div><p>而基于 hydration 的 SSR 方案，如下图代码：</p>`,9),D=s("p",null,"我们可以将上述渲染架构方案用下面这张图来总结：",-1),R=p('<p>SSR 渲染架构方案图（图片来源：<a href="https://developers.google.com/web/updates/2019/02/rendering-on-the-web" target="_blank" rel="noreferrer">https://developers.google.com/web/updates/2019/02/rendering-on-the-web</a>）</p><p>其实，如果将性能优化做到极致，SSR 还可以发展为：Streaming server rendering（流式 SSR 渲染）或 Progressive Rehydration（渐进式 SSR 渲染）。</p><ul><li><p>流式 SSR 渲染，允许服务端通过 stream 的方式向浏览器发送 HTML 内容。在 React 中，我们可以使用<code>renderToNodeStream()</code>方法来完成流式 SSR 渲染。</p></li><li><p>渐进式 SSR 渲染可以允许在 hydrating 没有完全结束前，部分已经渲染并注水完成的页面内容，可以优先完成交互响应。React 专门将<a href="https://github.com/facebook/react/pull/14717" target="_blank" rel="noreferrer">Partial Hydration</a>开了一个 PR 来讨论。</p></li></ul><p>在 SSR 技术下，还有类似 Bigpipe 的 Partial Rehydration 技术以及借助 Service Worker 完成的 Trisomorphic Rendering 技术，这里我们不再一一讨论。</p><p>说完 SSR，我们再来看一些更新潮的渲染技术：NSR 和 ESR 渲染方案最近几年也正在逐渐落地实施。</p><p><strong>NSR：Native Side Rendering</strong> ，这是一种在 hybrid 中特有的渲染技术。简单说就是<strong>通过 Native 渲染生成 HTML 数据，并且缓存在客户端</strong>。这样一来，对于一个 hybrid WebView 的用户访问，会优先从离线包中加载离线页面模板，再通过前端 Ajax/或客户端能力请求数据，最终完成页面完整的展示。</p><p>这样做的好处显而易见：我们将服务器的渲染工作放在了一个个独立的移动设备中，并借助离线存储技术，实现了页面的预加载，同时又不会增加额外的服务器压力。</p><p><strong>ESR：Edge Side Rendering</strong>，边缘渲染则更加激进。ESR 其实借助了最近几年较火的&quot;边缘计算&quot;能力。</p><blockquote><p>边缘计算，是指在靠近物或数据源头的一侧，采用网络、计算、存储、应用核心能力为一体的开放平台，就近提供最近端服务。其应用程序在边缘侧发起，产生更快的网络服务响应，满足行业在实时业务、应用智能、安全与隐私保护等方面的基本需求。边缘计算处于物理实体和工业连接之间，或处于物理实体的顶端。而云端计算，仍然可以访问边缘计算的历史数据。</p></blockquote><p>ESR 渲染利用了 CDN 能力。ESR<strong>会在 CDN 上缓存页面的静态部分，这样在用户访问页面时，可以快速返回给用户静态内容，同时在 CDN 节点上也发起动态部分内容请求，在动态内容获取之后，利用流的方式，继续返回给用户</strong>。该项技术在阿里中已经有了试水，但真正更广泛地落地和实施，有待后续验证和观察。总之借助边缘计算能力，前端渲染架构的想象空间会被无限放大。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>这一讲我们纵览了近十多年的前端技术发展以及相关技术方案的演进过程，并以渲染架构为例，重点剖析了从传统 CSR 到 SSR、NSR 再到 ESR 的思路。这一系列发展过程有的以基础设施（比如网络发展）为红利，有的以语言或框架演进为背书。</p>',12),v=s("p",null,'无论技术发展的脚步多快，无论什么样的技术架构，都离不开基础建设和架构设计。就让我们以当前"最先进"的理念，进入最核心的基础建设和架构设计的学习吧！',-1),q=s("hr",null,null,-1),B={href:"https://shenceyun.lagou.com/t/mka",target:"_blank",rel:"noreferrer"},w=s("p",null,[l("对标阿里P7技术需求 + 每月大厂内推，6 个月助你斩获名企高薪 Offer。"),s("a",{href:"https://shenceyun.lagou.com/t/mka",target:"_blank",rel:"noreferrer"},"点此链接，快来领取！")],-1);function M(f,k,T,V,N,P){const n=e("Image");return t(),r("div",null,[E,y,i,d,a(n,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image2/M01/00/66/Cip5yF_W_2uASczcAADjzoYuwcY422.png"}),l(),g,a(n,{alt:"前端发展和演进史.png",src:"https://s0.lgstatic.com/i/image/M00/8A/CE/Ciqc1F_ayhyANkK4AADjomKGK_s552.png"}),h,a(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/84/91/Ciqc1F_TbNGAE7ADAAMPSImvmcM224.png"}),F,u,_,a(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/84/9C/CgqCHl_TbNeABkBtAABufch6K5o021.png"}),S,A,C,a(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/84/91/Ciqc1F_TbN6AbhWeAAMt7v_XiOk193.png"}),m,a(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/84/9C/CgqCHl_TbOSANVS_AABr6t8iQEQ369.png"}),b,a(n,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image/M00/88/88/Ciqc1F_W__SALwrUAAYHEKkIYNQ282.png"}),D,a(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/84/91/Ciqc1F_TbPWAd6HsAABr6t8iQEQ624.png"}),R,a(n,{alt:"导读.png",src:"https://s0.lgstatic.com/i/image2/M01/00/67/Cip5yF_XAB6AM-sFAAZim-NM1GE633.png"}),v,q,s("p",null,[s("a",B,[a(n,{alt:"大前端引流.png",src:"https://s0.lgstatic.com/i/image2/M01/00/66/CgpVE1_W_x2AaW0rAAdqMM6w3z0145.png"})])]),w])}const I=o(c,[["render",M]]);export{j as __pageData,I as default};
