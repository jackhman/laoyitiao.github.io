import{_ as o,j as t,o as e,g as r,k as n,h as a,Q as p,s}from"./chunks/framework.4e7d56ce.js";const V=JSON.parse('{"title":"第一步：环境搭建 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/101-Flutter快学快用24讲文档/(3520) 03  Hello Flutter：三步法掌握 Flutter，开始你的第一个应用.md","filePath":"posts/frontEnd/101-Flutter快学快用24讲文档/(3520) 03  Hello Flutter：三步法掌握 Flutter，开始你的第一个应用.md","lastUpdated":1696417798000}'),c={name:"posts/frontEnd/101-Flutter快学快用24讲文档/(3520) 03  Hello Flutter：三步法掌握 Flutter，开始你的第一个应用.md"},i=p(`<p>本课时将进入 Flutter 开发实践应用。在进入实践应用之前，我先讲解最基础的环境搭建，然后会应用 Dart 语言开发第一个 App --- Hello Flutter，最后再讲解一些开发过程中常用的调试方法和工具。</p><p>本课时需要一定的实践动手能力，因此在学习的时候建议你打开电脑按照里面的步骤进行学习。</p><h3 id="第一步-环境搭建" tabindex="-1">第一步：环境搭建 <a class="header-anchor" href="#第一步-环境搭建" aria-label="Permalink to &quot;第一步：环境搭建&quot;">​</a></h3><p>环境构建方法在官网已提供了非常详细的指引，你可以参考官网指引<a href="https://flutterchina.club/get-started/install/" target="_blank" rel="noreferrer">《起步:安装 Flutter》</a>。这里我先介绍一些共性的问题，然后再分别从 Mac 系统 和 Windows 系统介绍其中比较有代表性的问题。</p><h4 id="常见问题" tabindex="-1">常见问题 <a class="header-anchor" href="#常见问题" aria-label="Permalink to &quot;常见问题&quot;">​</a></h4><p>以下是大家很容易忽视的几个问题。</p><ul><li><p><strong>环境要求</strong>，你需要注意 Flutter 的环境要求，很多人都会忽视这一点，导致在安装过程中遇到问题才会回头看环境要求，所以无论自己对配置如何了解，都需要按照官网的指引去检查每个配置项。</p></li><li><p><strong>Flutter 下载</strong>，请尽量下载当前稳定版本，避免因为不稳定版本导致的其他环境要求，导致安装不成功。</p></li><li><p><strong>Android Studio 工具安装</strong> ，Flutter 的配置运行需要依赖 Android Studio 来完成，因此在安装之前可以先准备好 Android Studio 的安装配置，并且需要了解其中关于 Flutter 插件和 Dart 插件的安装，这些在 <a href="https://flutterchina.club/get-started/install/" target="_blank" rel="noreferrer">Flutter 官网</a>有详细的解释说明。</p></li><li><p><strong>Anroid Studio 出现 unable to access android sdk add-on list</strong>，出现这个问题，可以修改 Android Studio 安装目录 bin 下的 idea.properties 文件，在文件最后一行增加如下配置。</p></li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">disable.android.first.run </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">disable.android.first.run </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span></span></code></pre></div><ul><li><p><strong>Android Studio 网络代理</strong>，如果你的网络有代理，也需要进行配置，如果没有正确配置，将导致 Andorid Studio 提示 flutter pub upgrade 无法正常更新。</p></li><li><p><strong>Flutter <strong><strong>D</strong></strong>octor 核心点检查</strong>，需要认真检查其中的每一项，对于其中的问题项，Doctor 一般会提供具体的解决方案。</p></li><li><p><strong>点击 Finish 长久未响应</strong>（或者执行 flutter pub upgrade 未响应），这种情况会出现&quot;This is taking an unexpectedly long time&quot;提示，如果出现这个提示，很大可能是你的镜像配置没有按要求配置。你可以参考以下这段配置，第一个是 Flutter 的命令行工具，第二个则是 Dart 的命令行工具，后面两个镜像配置很关键。</p></li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">PATH</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">$PATH</span><span style="color:#F97583;">:/</span><span style="color:#E1E4E8;">Users</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">用户名</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">Downloads</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">flutter</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">main</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">bin</span></span>
<span class="line"><span style="color:#E1E4E8;">PATH</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">$PATH</span><span style="color:#F97583;">:/</span><span style="color:#E1E4E8;">Users</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">用户名</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">Downloads</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">flutter</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">main</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">bin</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">cache</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">dart</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">sdk</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">bin</span></span>
<span class="line"><span style="color:#E1E4E8;">PUB_HOSTED_URL</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">https</span><span style="color:#F97583;">:</span><span style="color:#6A737D;">//pub.flutter-io.cn</span></span>
<span class="line"><span style="color:#E1E4E8;">FLUTTER_STORAGE_BASE_URL</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">https</span><span style="color:#F97583;">:</span><span style="color:#6A737D;">//storage.flutter-io.cn</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">PATH</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">$PATH</span><span style="color:#D73A49;">:/</span><span style="color:#24292E;">Users</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">用户名</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">Downloads</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">flutter</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">main</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">bin</span></span>
<span class="line"><span style="color:#24292E;">PATH</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">$PATH</span><span style="color:#D73A49;">:/</span><span style="color:#24292E;">Users</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">用户名</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">Downloads</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">flutter</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">main</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">bin</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">cache</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">dart</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">sdk</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">bin</span></span>
<span class="line"><span style="color:#24292E;">PUB_HOSTED_URL</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">https</span><span style="color:#D73A49;">:</span><span style="color:#6A737D;">//pub.flutter-io.cn</span></span>
<span class="line"><span style="color:#24292E;">FLUTTER_STORAGE_BASE_URL</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">https</span><span style="color:#D73A49;">:</span><span style="color:#6A737D;">//storage.flutter-io.cn</span></span></code></pre></div><ul><li><strong>Flutter SDK path not given</strong>，如果在创建 Flutter 项目时候提示&quot; Flutter SDK path not given&quot;，则点击 Flutter SDK path 路径，然后选择我们前面安装的 Flutter SDK 路径即可。</li></ul><h4 id="mac-系统上注意的点" tabindex="-1">Mac 系统上注意的点 <a class="header-anchor" href="#mac-系统上注意的点" aria-label="Permalink to &quot;Mac 系统上注意的点&quot;">​</a></h4><p>Mac 上的安装，我这里主要说明 Xcode 和 Mac 下的环境变量配置。</p><ul><li><p>Xcode 要升级到指定版本以上，由于 Flutter 需要应用 iOS 模拟器，因此对 Xcode 版本有一定要求。</p></li><li><p>Mac 下设置环境变量，其中涉及一些环境变量的配置，虽然网上有很多方法，官网也有提供，但我推荐大家使用如下方法，永久设置。</p></li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">sudo vim </span><span style="color:#F97583;">~/</span><span style="color:#E1E4E8;">.bash_profile</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">sudo vim </span><span style="color:#D73A49;">~/</span><span style="color:#24292E;">.bash_profile</span></span></code></pre></div><p>配置添加 Flutter 的安装路径，一般情况下会安装在你解压后运行的路径下。例如，下面我自己安装后的路径，安装完成后确定具体路径，然后在 bash_profile 文件中增加这行配置即可。</p><pre><code>PATH=$PATH:/Users/用户名/Downloads/flutter-main/bin
</code></pre><p>最后再运行加载，并运行测试。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">source </span><span style="color:#F97583;">~/</span><span style="color:#E1E4E8;">.bash_profile</span></span>
<span class="line"><span style="color:#E1E4E8;">flutter </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">h</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">source </span><span style="color:#D73A49;">~/</span><span style="color:#24292E;">.bash_profile</span></span>
<span class="line"><span style="color:#24292E;">flutter </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">h</span></span></code></pre></div><h4 id="windows-系统上注意的点" tabindex="-1">Windows 系统上注意的点 <a class="header-anchor" href="#windows-系统上注意的点" aria-label="Permalink to &quot;Windows 系统上注意的点&quot;">​</a></h4><p>Widows 系统安装需注意以下几点。</p><ul><li>环境变量的设置，如果在 cmd 下没有 export 命令，前往系统属性下 -&gt; 环境变量，然后新建，按照变量名为 PUB_HOSTED_URL ，变量值为 <a href="https://pub.flutter-io.cn" target="_blank" rel="noreferrer">https://pub.flutter-io.cn</a> ，以及变量名为 FLUTTER_STORAGE_BASE_URL ，变量值为 <a href="https://storage.flutter-io.cn" target="_blank" rel="noreferrer">https://storage.flutter-io.cn</a> 进行配置，对应到官方文档如下配置。</li></ul><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">export PUB_HOSTED_URL</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">https</span><span style="color:#F97583;">:</span><span style="color:#6A737D;">//pub.flutter-io.cn</span></span>
<span class="line"><span style="color:#E1E4E8;">export FLUTTER_STORAGE_BASE_URL</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">https</span><span style="color:#F97583;">:</span><span style="color:#6A737D;">//storage.flutter-io.cn</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">export PUB_HOSTED_URL</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">https</span><span style="color:#D73A49;">:</span><span style="color:#6A737D;">//pub.flutter-io.cn</span></span>
<span class="line"><span style="color:#24292E;">export FLUTTER_STORAGE_BASE_URL</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">https</span><span style="color:#D73A49;">:</span><span style="color:#6A737D;">//storage.flutter-io.cn</span></span></code></pre></div><ul><li>配置 Flutter 运行环境，下载完成 Flutter SDK ，并放到指定的 C:\\src\\ 下，然后再次配置环境变量，需要在环境变量名为 PATH 的字段后面增加分号分割，并在分号后增加如下路径。</li></ul><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">C:\\src\\flutter\\bin</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">C:\\src\\flutter\\bin</span></span></code></pre></div><ul><li>如果出现安装 Android SDK 时无法勾选 SDK ，需要重新卸载安装。这里需注意，在卸载时需勾选删除当前用户本地 Android Studio 配置，然后重新安装时，选择非 Program Files 目录。</li></ul><h3 id="第二步-创建项目运行" tabindex="-1">第二步：创建项目运行 <a class="header-anchor" href="#第二步-创建项目运行" aria-label="Permalink to &quot;第二步：创建项目运行&quot;">​</a></h3><p>上面的配置安装完成后，我们就开始创建 Flutter 项目，这里我介绍的是 Android Studio IDE 的过程。</p><ol><li>选择新建一个 Start a new Flutter Project ，然后选择 Flutter Application ，如图 1。</li></ol>`,29),E=s("p",null,"图 1 New Flutter Project",-1),y=s("ol",{start:"2"},[s("li",null,[s("p",null,"然后依次填写相应的 Project name 、Flutter SDK Path（如果配置好了会默认填写上，如果没有可以去重新选择）、Project location （具体的项目保存地址）、Descrition ，填写完成后，点击下一步，然后点击 finish 即可。")]),s("li",null,[s("p",null,'如果卡在 finish 这个环节，请强制退出，然后再重新打开，检查配置。具体解决办法可参考共性问题中的"点击 finish 长久未响应"问题。')]),s("li",null,[s("p",null,"创建完成后，会看到如图 2 的项目目录结构。")])],-1),d=s("p",null,"图 2 Flutter 项目目录结构",-1),u=s("ol",{start:"5"},[s("li",null,[a("成功创建后，我们选择一个模拟器，然后在运行入口文件选择 main.dart ，最后点击右侧启动按钮进行编译运行。"),s("strong",null,"如果下拉没有模拟器，Android Studio 会提供指引前往配置"),a("。")])],-1),h=s("p",null,"图 3 运行启动说明",-1),g=s("ol",{start:"6"},[s("li",null,"运行成功后，将会打开 iPhone 11 模拟器，然后启动我们的应用，如图 3。")],-1),F=s("p",null,"图 4 iPhone 11 模拟器",-1),A=s("p",null,"以上就成功配置了 Flutter 运行环境和开发工具。",-1),_=s("h3",{id:"第三步-实现-hello-flutter-app",tabindex:"-1"},[a("第三步：实现 Hello Flutter APP "),s("a",{class:"header-anchor",href:"#第三步-实现-hello-flutter-app","aria-label":'Permalink to "第三步：实现 Hello Flutter APP"'},"​")],-1),b=s("p",null,"在实现一些编程之前，我先详细介绍工程目录中每个目录的作用，其次介绍如何进行修改代码，实现界面显示 Hello Flutter，最后再介绍三个常见的调试方法。",-1),m=s("h4",{id:"目录说明",tabindex:"-1"},[a("目录说明 "),s("a",{class:"header-anchor",href:"#目录说明","aria-label":'Permalink to "目录说明"'},"​")],-1),D=s("p",null,"上述图 2 中已有相关工程目录的截图，我现在分别介绍下每个目录的作用。",-1),C=p(`<p>图 2 Flutter 项目目录结构</p><ul><li><strong>.idea</strong></li></ul><p>这个和 Flutter 无关，这里面主要是保留代码的修改历史。</p><ul><li><strong>android</strong></li></ul><p>这个目录主要是和 Android 原生平台交互的工程代码，其目录结构和原生的 Android 项目基本一致，但是一些配置和代码结构是不同的。</p><ul><li><strong>ios</strong></li></ul><p>这个目录主要也是和 iOS 原生平台交互的代码。</p><ul><li><strong>lib</strong></li></ul><p>这个目录下的文件为 Flutter 项目核心代码，其中包含了一个 main.dart 入口文件。</p><ul><li><strong>test</strong></li></ul><p>这个目录下的文件存放 Flutter 项目相关的测试文件。</p><ul><li><strong>pubspec.yaml</strong></li></ul><p>该文件为 Flutter 项目配置文件，包括了项目名、项目描述、版本、运行环境以及开发和正式环境的第三方库，该文件与我们熟悉的 package.json 作用是类似的。</p><ul><li><strong>pubspec.lock</strong></li></ul><p>这是自动生成的文件，里面指明了 pubspec.yaml 等依赖包和项目依赖库的具体版本号，该文件的功能和我们常见的 package.lock.json 作用类似。</p><ul><li><strong>.metadata</strong></li></ul><p>这是自动生成的文件，里面记录了项目的属性信息。用于切换分支、升级 SDK 使用。</p><ul><li><strong>.packages</strong></li></ul><p>这里面放置了项目依赖的库，对应在本机电脑上的绝对路径，为自动生成文件。如果项目出错或者无法找到某个库，可以把这个文件删除，重新自动配置即可。</p><p>.gitignore、README.md 与前端项目中的文件作用是一致的，这里就不详加说明。</p><p><strong>在开发过程中我们只需要关注三个核心部分，代码开发<strong><strong>放在</strong></strong> lib 下，test 存放我们的测试文件，项目配置文件<strong><strong>放在</strong></strong> pubspec.yaml <strong><strong>下</strong></strong>。</strong></p><h4 id="hello-flutter" tabindex="-1">Hello Flutter <a class="header-anchor" href="#hello-flutter" aria-label="Permalink to &quot;Hello Flutter&quot;">​</a></h4><p>分析清楚文件目录后，在 lib 下修改 main.dart ，在该模块中打印 Hello Flutter 实现第一个 Flutter 应用开发。</p><ol><li>打开 main.dart ，将文件中 MaterialApp 下的 title 名字修改为 &quot;Two You&quot; ，将 home 下的 title 修改为 &quot;Two You&quot;，相关代码如下所示。</li></ol><div class="language-dart vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">MyApp</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">StatelessWidget</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// This widget is the root of your application.</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">@override</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">Widget</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">build</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">BuildContext</span><span style="color:#E1E4E8;"> context) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">MaterialApp</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">      title</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;Two You&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// app 的title信息 </span></span>
<span class="line"><span style="color:#E1E4E8;">        primarySwatch</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Colors</span><span style="color:#E1E4E8;">.blue, </span><span style="color:#6A737D;">// 页面的主题颜色</span></span>
<span class="line"><span style="color:#E1E4E8;">      ),</span></span>
<span class="line"><span style="color:#E1E4E8;">      home</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">MyHomePage</span><span style="color:#E1E4E8;">(title</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;Two You&#39;</span><span style="color:#E1E4E8;">), </span><span style="color:#6A737D;">// 当前页面的 title 信息</span></span>
<span class="line"><span style="color:#E1E4E8;">    );</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">MyApp</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">StatelessWidget</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// This widget is the root of your application.</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">@override</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">Widget</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">build</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">BuildContext</span><span style="color:#24292E;"> context) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">MaterialApp</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">      title</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;Two You&#39;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// app 的title信息 </span></span>
<span class="line"><span style="color:#24292E;">        primarySwatch</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Colors</span><span style="color:#24292E;">.blue, </span><span style="color:#6A737D;">// 页面的主题颜色</span></span>
<span class="line"><span style="color:#24292E;">      ),</span></span>
<span class="line"><span style="color:#24292E;">      home</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">MyHomePage</span><span style="color:#24292E;">(title</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;Two You&#39;</span><span style="color:#24292E;">), </span><span style="color:#6A737D;">// 当前页面的 title 信息</span></span>
<span class="line"><span style="color:#24292E;">    );</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><ol start="2"><li>将 main.dart 中 Scaffold 下的 body 下的 children 下的第一个 Text 内容修改为 &quot;Hello Flutter&quot;，并去掉下面一个 Text，如下图 5。</li></ol>`,26),v=s("p",null,"图 5 修改 main.dart 文件的代码指引",-1),f=s("p",null,'修改完成后，保存文件，然后按照本课时中的"第二步：创建项目运行"运行本程序即可（如果已经运行过，保存文件模拟器会热加载），你将看到如下的结果，如图 6 所示。',-1),T=p(`<p>图 6 Hello Flutter 运行结果</p><p>上面的代码是基于最开始的 main.dart 进行，如果觉得修改原文件比较麻烦，我们可以简化为如下的代码：</p><div class="language-dart vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dart</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;package:flutter/material.dart&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">void</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">() </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">runApp</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">MyApp</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">MyApp</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">StatelessWidget</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// This widget is the root of your application.</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">@override</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">Widget</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">build</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">BuildContext</span><span style="color:#E1E4E8;"> context) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">MaterialApp</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">      title</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;Two You&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// app 的title信息 </span></span>
<span class="line"><span style="color:#E1E4E8;">      theme</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">ThemeData</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">        primarySwatch</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Colors</span><span style="color:#E1E4E8;">.blue, </span><span style="color:#6A737D;">// 页面的主题颜色</span></span>
<span class="line"><span style="color:#E1E4E8;">      ),</span></span>
<span class="line"><span style="color:#E1E4E8;">      home</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Scaffold</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">          appBar</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">AppBar</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">            title</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Text</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;Two You&#39;</span><span style="color:#E1E4E8;">), </span><span style="color:#6A737D;">// 当前页面的 title 信息</span></span>
<span class="line"><span style="color:#E1E4E8;">          ),</span></span>
<span class="line"><span style="color:#E1E4E8;">          body</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">Center</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">            child</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Text</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;Hello Flutter&#39;</span><span style="color:#E1E4E8;">), </span><span style="color:#6A737D;">// 当前页面的显示的文本信息</span></span>
<span class="line"><span style="color:#E1E4E8;">          )</span></span>
<span class="line"><span style="color:#E1E4E8;">      )</span></span>
<span class="line"><span style="color:#E1E4E8;">    );</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;package:flutter/material.dart&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">void</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">() </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">runApp</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">MyApp</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">MyApp</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">StatelessWidget</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// This widget is the root of your application.</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">@override</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">Widget</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">build</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">BuildContext</span><span style="color:#24292E;"> context) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">MaterialApp</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">      title</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;Two You&#39;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// app 的title信息 </span></span>
<span class="line"><span style="color:#24292E;">      theme</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">ThemeData</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">        primarySwatch</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Colors</span><span style="color:#24292E;">.blue, </span><span style="color:#6A737D;">// 页面的主题颜色</span></span>
<span class="line"><span style="color:#24292E;">      ),</span></span>
<span class="line"><span style="color:#24292E;">      home</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Scaffold</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">          appBar</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">AppBar</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">            title</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Text</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;Two You&#39;</span><span style="color:#24292E;">), </span><span style="color:#6A737D;">// 当前页面的 title 信息</span></span>
<span class="line"><span style="color:#24292E;">          ),</span></span>
<span class="line"><span style="color:#24292E;">          body</span><span style="color:#D73A49;">:</span><span style="color:#24292E;">  </span><span style="color:#005CC5;">Center</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">            child</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Text</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;Hello Flutter&#39;</span><span style="color:#24292E;">), </span><span style="color:#6A737D;">// 当前页面的显示的文本信息</span></span>
<span class="line"><span style="color:#24292E;">          )</span></span>
<span class="line"><span style="color:#24292E;">      )</span></span>
<span class="line"><span style="color:#24292E;">    );</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="调试方法" tabindex="-1">调试方法 <a class="header-anchor" href="#调试方法" aria-label="Permalink to &quot;调试方法&quot;">​</a></h4><p>代码运行调试在各种语言中都是比较基本的知识点，在 Flutter 中也应该掌握，这里我只介绍 Flutter 不同于其他语言的调试方法，包含以下几类：</p><ul><li><strong>断点调试</strong></li></ul><p>这个知识点和大家熟悉的 Chrome 的断点调试基本一致，核心是在断点处查看当前各个数据的状态情况，但是需要使用 debug 模式运行。</p><ul><li><strong>debugger 调试</strong></li></ul><p>在代码中增加一个断点语法，可以通过条件式的判断来进行断点，同样需要使用 debug 模式运行。</p><ul><li><strong>界面调试</strong></li></ul><p>为了能够掌握具体的布局问题，在 Web 端，我们可以通过 Chrome 工具进行分析。虽然在 Flutter 中是没有 Chrome 工具，但是 Flutter 提供了可视化的界面调试方法。</p><p>上面提到的三点，其实在 Flutter 中提供了一个非常不错的工具。如果你是在 Android Studio 中的话，你可以直接点击下图 7 的按钮，将为你下载相应的组件，然后打开图 8 的界面调试框。如果你使用的是非 Android Studio ，可以使用命令行的方式，参考<a href="https://flutter.cn/docs/development/tools/devtools/cli" target="_blank" rel="noreferrer">官网</a>方式，首先安装 devtools 工具。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pub global activate devtools</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pub global activate devtools</span></span></code></pre></div><p>安装完成后，运行以下命令启动运行。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pub global run devtools</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pub global run devtools</span></span></code></pre></div>`,15),k=s("p",null,"图 7 Flutter 调试工具按钮指引",-1),S=s("p",null,"图 8 Dart DevTools 工具",-1),B=s("p",null,[a("该套工具的详细介绍可以参考"),s("a",{href:"https://flutter.cn/docs/development/tools/devtools",target:"_blank",rel:"noreferrer"},"开发者工具"),a("。")],-1),P=s("h3",{id:"总结",tabindex:"-1"},[a("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),x=s("p",null,"本课时介绍了如何三步开启第一个应用程序 Hello Flutter，包括环境搭建、创建项目以及运行、修改示例代码。学完本课时，你需要掌握环境搭建的方法以及如何创建运行项目。",-1),H=s("p",null,[s("a",{href:"https://github.com/love-flutter/flutter-column",target:"_blank",rel:"noreferrer"},"点击此链接查看本课时源码")],-1);function w(q,M,U,R,j,L){const l=t("Image");return e(),r("div",null,[i,n(l,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/21/12/Ciqc1F7pvnuANcQpAACTMSsFoo0714.png"}),a(),E,y,n(l,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/21/12/Ciqc1F7pvouAKi3mAAC2vjxyHVc774.png"}),a(),d,u,n(l,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/21/1D/CgqCHl7pvrmAKD3eAAAhuRZycV0676.png"}),a(),h,g,n(l,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/21/12/Ciqc1F7pvsSAKTXCAAGu5cF8GWk440.png"}),a(),F,A,_,b,m,D,n(l,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/21/1E/CgqCHl7pvuqAfnGbAAC2vjxyHVc400.png"}),a(),C,n(l,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/21/1E/CgqCHl7pvyyAAoyEAAGmjIkimiw325.png"}),a(),v,f,n(l,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/21/1E/CgqCHl7pvzyAHXDxAAGn0n0MOsU471.png"}),a(),T,n(l,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/21/12/Ciqc1F7pv1iADPaQAABwzl3Sgow148.png"}),a(),k,n(l,{alt:"image",src:"https://s0.lgstatic.com/i/image/M00/21/12/Ciqc1F7pv2CAVgmvAAMQ0qCy2Nw964.png"}),a(),S,B,P,x,H])}const W=o(c,[["render",w]]);export{V as __pageData,W as default};
