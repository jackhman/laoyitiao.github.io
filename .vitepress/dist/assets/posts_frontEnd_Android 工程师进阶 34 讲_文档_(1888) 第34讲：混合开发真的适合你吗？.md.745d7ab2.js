import{_ as n,j as o,o as r,g as p,k as e,s as a,Q as l,h as s}from"./chunks/framework.4e7d56ce.js";const H=JSON.parse('{"title":"Dart ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1888) 第34讲：混合开发真的适合你吗？.md","filePath":"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1888) 第34讲：混合开发真的适合你吗？.md","lastUpdated":1696417798000}'),i={name:"posts/frontEnd/Android 工程师进阶 34 讲_文档/(1888) 第34讲：混合开发真的适合你吗？.md"},c=a("p",null,"有很多人私底下问我需不需要学习一下 Flutter，我的答案都是肯定的。不管是 Android 工程师或者是 iOS 工程师，如果不说自己会点混合开发的技术，已经说不过去了。但是我们面临的问题是，不管是初期的 Xamarin，或是到后来的 React Native，再到现在的 Flutter 或者 uni-app，都需要工程师重新掌握一门新的语言，还需要我们解决跨平台端与原生端通信的诸多问题，所以在众多的跨平台混合开发方案中，我们需要慎重选择。",-1),d=a("p",null,"就我个人而言，我是非常推崇 Flutter 的。一方面是因为谷歌强大的背景，使我对它有天然的好感；另一方面截至目前 Flutter 在 GitHub 上已经有 95.8k 的 Star，如此火爆的程度使我们不得不对其多一些关注。",-1),h=a("p",null,"下图是一张描述整个 Flutter 框架的架构图。",-1),u=l('<p>我们简单对其做下解释说明：</p><ol><li><p>图中绿色部分就是开发工程师直接接触的 Flutter Framework。这部分包含大量的 widget、animation 等 API 供开发者使用，并且可以看出开发语言使用 Dart。</p></li><li><p>图中蓝色部分就是 Flutter Engine，这一层负责实现 Flutter Framework 中 widget 的刷新与渲染机制。当发生某些特殊情况时，Flutter Engine 就主动通知 Flutter Framework 的 widget 刷新，比如 orientation changed、configuration changed、application running state 发生改变等情况。</p></li><li><p>其中 Flutter Framework 与 Flutter Engine 是通过一个抽象层 <a href="https://api.flutter.dev/flutter/dart-ui/Window-class.html" target="_blank" rel="noreferrer">Flutter Window</a> 来进行通信的，Window 主要会负责设置屏幕大小的计算、接收用户输入事件等。这点与 Android 中的 Window 非常相似。</p></li></ol><p>在我学习 Flutter 的过程中，我发现主要有以下几点非常吸引我：</p><h3 id="dart" tabindex="-1">Dart <a class="header-anchor" href="#dart" aria-label="Permalink to &quot;Dart&quot;">​</a></h3><p>Flutter 使用 Dart 作为开发语言，它支持 AOT（Ahead-Of-Time）编译方式，这种方式允许 Flutter 的 widget 直接与原生的组件进行通信。也就是说 Flutter 不需要像 RN 那样建立 JavaScript bridge 来访问原生组件，因此性能会高一些。</p><p>对 Android 工程师来说学习 Dart 语言几乎没什么压力，只要我们掌握一门面向对象编程语言，几乎就可以无缝使用 Dart。并且 Dart 比 Java 更加的灵活，比如以下几点都是 Dart 天然的优势：</p><h4 id="动态数据类型" tabindex="-1">动态数据类型 <a class="header-anchor" href="#动态数据类型" aria-label="Permalink to &quot;动态数据类型&quot;">​</a></h4><p>通过 dynamic 关键字可以声明动态数据类型，如下所示：</p>',8),g=a("p",null,'上述代码中，var1 开始是字符串类型"hello"，但是在程序运行时可以动态地修改为整型类型 19。',-1),_=a("h4",{id:"命名参数函数",tabindex:"-1"},[s("命名参数函数 "),a("a",{class:"header-anchor",href:"#命名参数函数","aria-label":'Permalink to "命名参数函数"'},"​")],-1),y=a("p",null,"命名参数函数顾名思义就是给参数定了个名字，如下所示：",-1),E=l(`<p>可以看出，命名参数函数与一般的函数声明有一定的区别，就是在声明参数类型处多了一个 <strong>{}</strong>。并且函数的调用方式也会发生改变，比如调用上图中的 test 方法需要改为以下方式：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(name: </span><span style="color:#9ECBFF;">&quot;zhansan&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#B392F0;">test</span><span style="color:#E1E4E8;">(name: </span><span style="color:#9ECBFF;">&quot;zhansan&quot;</span><span style="color:#E1E4E8;">,age: </span><span style="color:#79B8FF;">3</span><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(name: </span><span style="color:#032F62;">&quot;zhansan&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#6F42C1;">test</span><span style="color:#24292E;">(name: </span><span style="color:#032F62;">&quot;zhansan&quot;</span><span style="color:#24292E;">,age: </span><span style="color:#005CC5;">3</span><span style="color:#24292E;">);</span></span></code></pre></div><h4 id="参数默认值" tabindex="-1">参数默认值 <a class="header-anchor" href="#参数默认值" aria-label="Permalink to &quot;参数默认值&quot;">​</a></h4><p>在 Dart 中甚至可以在函数声明处，给参数设置默认值，如下所示：</p>`,4),F=l(`<p>上图中 printPerson 的 age 和 gender 参数都带有默认值。因此当调用此函数时，如果没有传入 age 或者 gender 就会取默认值，上图代码打印结果如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">name</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">张三,age</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">66</span><span style="color:#E1E4E8;">,gender</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">Name</span></span>
<span class="line"><span style="color:#E1E4E8;">name</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">张三,age</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">28</span><span style="color:#E1E4E8;">,gender</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">Name</span></span>
<span class="line"><span style="color:#E1E4E8;">name</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">张三,age</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">28</span><span style="color:#E1E4E8;">,gender</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">huang</span></span>
<span class="line"><span style="color:#E1E4E8;">name</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">张三,age</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">28</span><span style="color:#E1E4E8;">,gender</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">huang</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">name</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">张三,age</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">66</span><span style="color:#24292E;">,gender</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">Name</span></span>
<span class="line"><span style="color:#24292E;">name</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">张三,age</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">28</span><span style="color:#24292E;">,gender</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">Name</span></span>
<span class="line"><span style="color:#24292E;">name</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">张三,age</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">28</span><span style="color:#24292E;">,gender</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">huang</span></span>
<span class="line"><span style="color:#24292E;">name</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">张三,age</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">28</span><span style="color:#24292E;">,gender</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">huang</span></span></code></pre></div><h4 id="高阶函数" tabindex="-1">高阶函数 <a class="header-anchor" href="#高阶函数" aria-label="Permalink to &quot;高阶函数&quot;">​</a></h4><p>Dart 支持高阶函数，通过 lambda 表达式可以将一个函数以参数的形式传递给另一个函数，如下所示：</p>`,4),m=a("p",null,"上述方法中，我向 print 函数传入了 test 函数，并在调用 test 函数时传入了真正进行计算的 add 函数。",-1),A=a("h3",{id:"热重载-hot-reload",tabindex:"-1"},[s("热重载 Hot Reload "),a("a",{class:"header-anchor",href:"#热重载-hot-reload","aria-label":'Permalink to "热重载 Hot Reload"'},"​")],-1),f=a("p",null,"Flutter 最受欢迎的功能之一就是热重载，Flutter 的热重载（Hot Reload）功能可以在 App 无须重新启动应用的情况下快速、轻松地进行测试、构建用户界面、添加功能，以及修复错误。 具体效果如下图所示：",-1),b=a("p",null,"通过将更新后的源代码文件注入正在运行的 Dart 虚拟机（VM）中来实现热重载。在虚拟机使用新的字段和函数更新类后，Flutter 框架会自动重新构建 widget 树，以便快速查看更改的效果。通常可以在一秒之内重新加载并继续执行代码，就像刷新一个 Web 网页一样。并且 Flutter 的热重载是有状态的（stateful），因此 App 不需要重启就可以将代码修改的部分刷新到页面。",-1),w=a("h3",{id:"widget",tabindex:"-1"},[s("Widget "),a("a",{class:"header-anchor",href:"#widget","aria-label":'Permalink to "Widget"'},"​")],-1),C=a("p",null,'在 Flutter 中有"一切皆 widget"的概念，开发者几乎自始至终都是在与各种 widget 打交道，并且这些 widget 都是 Flutter 自己在 skia 渲染框架基础上，由 Flutter 自带引擎渲染。所以与 Android/iOS 原生组件不存在依赖性，这种实现方式一方面可以提高性能，另一方面对设备和系统版本有很好的兼容性，即使用户将 Android 或者 iOS 系统更新到新的版本，也丝毫不会对当前 Flutter 应用产生影响。',-1),k=a("p",null,"Flutter 中的 Widget 总体上分为两种：StatelessWidget 和 StatefulWidget。",-1),S=a("h4",{id:"statelesswidget",tabindex:"-1"},[s("StatelessWidget "),a("a",{class:"header-anchor",href:"#statelesswidget","aria-label":'Permalink to "StatelessWidget"'},"​")],-1),D=a("p",null,"StatelessWidget 表示不可变的 widget，这种 widget 只需要绘制一次即可。例如一些固定的标题、Icon 等，此类 widget 的特征不会在运行时发生变化。",-1),P=a("p",null,"我们在使用时直接继承它，然后通过 build 方法创建一个不可变的 widget 即可，如下所示：",-1),q=a("h4",{id:"statefulwidget",tabindex:"-1"},[s("StatefulWidget "),a("a",{class:"header-anchor",href:"#statefulwidget","aria-label":'Permalink to "StatefulWidget"'},"​")],-1),T=a("p",null,"StatefulWidget 则相反，其属性可能会在运行时发生变化，例如进度条、输入框等。在使用时需要继承 StatefulWidget，复写 createState 方法创建一个 State 对象，再通过 State 中的 build 方法创建一个 widget，后面每次状态变化时都会调用 build 方法重新绘制一个 widget。最后可以使用 setState 方法来触发 widget 更新，如下所示：",-1),v=l('<h3 id="fuchsia" tabindex="-1">Fuchsia <a class="header-anchor" href="#fuchsia" aria-label="Permalink to &quot;Fuchsia&quot;">​</a></h3><p>谷歌已经官宣 Flutter 为谷歌操作系统 Fushsia 的 UI 框架。Fuchsia 是由 Google 公司开发的继 Android 和 Chrome OS 之后的下一代操作系统，不同于 Android 使用的 Linux 内核，而是使用一种全新的内核 Zircon。部分源码已经在 GitHub 上开源：<a href="https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2FFuchsiaOS%2FFuchsiaOS-docs-zh_CN" target="_blank" rel="noreferrer">https://github.com/FuchsiaOS/FuchsiaOS-docs-zh_CN</a>。</p><blockquote><p>值得注意的是 Fuchsia 里不支持 Java 代码，也就是说不要指望能在 Fuchsia 操作系统中写任意一行 Java 代码。</p></blockquote><h3 id="如何学习-flutter" tabindex="-1">如何学习 Flutter <a class="header-anchor" href="#如何学习-flutter" aria-label="Permalink to &quot;如何学习 Flutter&quot;">​</a></h3><p>对于初学者来说，有以下几个方向可以入手：</p><ol><li><p>官方文档是必须要看的：<a href="https://flutter.dev/docs" target="_blank" rel="noreferrer">flutter 官方文档</a>。</p></li><li><p>书籍材料：<a href="https://www.syncfusion.com/ebooks/flutter-succinctly" target="_blank" rel="noreferrer">flutter succinctly</a>（可以直接下载）、<a href="https://kodestat.gitbook.io/flutter/" target="_blank" rel="noreferrer">Flutter Tutorials Handbook</a>（线上文档）。</p></li><li><p>视频资料：<a href="https://www.youtube.com/playlist?list=PL4cUxeGkcC9jLYyp2Aoh6hcWuxFDX6PBJ" target="_blank" rel="noreferrer">Flutter Tutorial for Beginners</a>（YouTube视频）、<a href="https://www.youtube.com/channel/UC2d0BYlqQCdF9lJfydl_02Q/featured" target="_blank" rel="noreferrer">FilledStacks</a>（介绍各种 Flutter 相关功能的开发）。</p></li></ol><p>如果对 Flutter 已经有了一定的了解，给你推荐两个比较不错的社区（需要翻墙查看），里面有很多关于 Flutter 不错的内容。</p><ul><li><p><a href="https://flutterawesome.com/" target="_blank" rel="noreferrer">Flutter Awesome</a></p></li><li><p><a href="https://medium.com/flutter-community" target="_blank" rel="noreferrer">Flutter Community</a></p></li></ul><p>最后再给你推荐一个在领英上认识的 Flutter 大佬，我在学习使用 Flutter 的过程中，发现国内有很多不错的文章都是借鉴甚至直接翻译自他的文章（<a href="https://www.didierboelens.com/blog/" target="_blank" rel="noreferrer">领英认识的 Flutter 大佬</a>）。</p><p>有句话说得很好：机会是给有准备的人。不管我们现在是否能够在项目中使用 Flutter，还是提前先学起来吧。毕竟实践才是王道。</p><p>好了，本专栏的内容就全部讲完了，希望你能够在日常的工作中多实践多总结，你会发现学习积累是一件很快乐的事情，也欢迎你留言与我一起讨论，非常感谢。</p>',11);function x(W,B,N,I,O,V){const t=o("Image");return r(),p("div",null,[c,d,e(t,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/33/5A/Ciqc1F8P_cyAClMfAAB3x5a_qe8387.png"}),h,e(t,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/33/5A/Ciqc1F8P_dSAUUKtAAGZWfKnE98391.png"}),u,e(t,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/33/5A/Ciqc1F8P_eyAKaafAAGa6LhmZmY104.png"}),g,_,y,e(t,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/33/65/CgqCHl8P_feAfOEIAAKnKvhizy8211.png"}),E,e(t,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/33/5A/Ciqc1F8P_hWAElmMAAEJAr9u0h8350.png"}),F,e(t,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/33/65/CgqCHl8P_gyAKLuwAACFJ9z2vvE511.png"}),m,A,f,e(t,{alt:"hot_reload.gif",src:"https://s0.lgstatic.com/i/image/M00/33/5A/Ciqc1F8P_jOACho2AAw9laxZmT0299.gif"}),b,w,C,k,S,D,P,e(t,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/33/5B/Ciqc1F8P_kSACCpRAABzYup1r2Y463.png"}),q,T,e(t,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/33/66/CgqCHl8P_k6APJL5AAHOAecSHoA997.png"}),v])}const J=n(i,[["render",x]]);export{H as __pageData,J as default};
