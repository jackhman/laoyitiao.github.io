import{_ as p,j as e,o as t,g as c,k as o,Q as l,s,h as n}from"./chunks/framework.e0c66c3f.js";const w=JSON.parse('{"title":"安装 SwiftGen ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/048_iOS开发进阶/(6665) 12  功能组件：如何设置多语言支持，为全球化做准备？.md","filePath":"posts/frontEnd/048_iOS开发进阶/(6665) 12  功能组件：如何设置多语言支持，为全球化做准备？.md","lastUpdated":1696338709000}'),r={name:"posts/frontEnd/048_iOS开发进阶/(6665) 12  功能组件：如何设置多语言支持，为全球化做准备？.md"},i=l('<p>作为 iOS 开发者，不知道你有没有遇到过这样的情况：每次增加一种新语言，都需要重新改一遍，特别是在 App 进入其他国家的市场时，需要修改整个 App 的代码才能加入新语言。这样是不是很麻烦？</p><p>其实这种情况完全可以通过多语言设置来解决。下面我就以 Moments App 为例，看看怎样支持多语言。</p><h3 id="安装-swiftgen" tabindex="-1">安装 SwiftGen <a class="header-anchor" href="#安装-swiftgen" aria-label="Permalink to &quot;安装 SwiftGen&quot;">​</a></h3><p>Moments App 使用了 SwiftGen 来自动生成支持多语言常量字符串。为了保证整个团队所使用 SwiftGen 的版本都保持一致，我们使用 CocoaPods 来安装 SwiftGen。具体到 Moments App 项目，我们在 Podfile 文件中添加 SwiftGen Pod 即可。</p><div class="language-ruby vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ruby</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">pod </span><span style="color:#9ECBFF;">&#39;SwiftGen&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;= 6.4.0&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">configurations:</span><span style="color:#E1E4E8;"> [</span><span style="color:#9ECBFF;">&#39;Debug&#39;</span><span style="color:#E1E4E8;">]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">pod </span><span style="color:#032F62;">&#39;SwiftGen&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;= 6.4.0&#39;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">configurations:</span><span style="color:#24292E;"> [</span><span style="color:#032F62;">&#39;Debug&#39;</span><span style="color:#24292E;">]</span></span></code></pre></div><p>为了在每次编译代码的时候，SwiftGen 都会启动代码生成任务，我们需要在主 App Target<strong>Moments</strong> 的 Build Phases 里面添加 Run SwiftGen 步骤，然后配置它执行<code>&quot;${PODS_ROOT}/SwiftGen/bin/swiftgen&quot;</code>命令。</p>',6),E=l('<p>这里要注意，由于我们自己的源代码会使用到 SwiftGen 所生成的代码，因此必须把 Run SwiftGen 步骤放在 Compile Source 步骤之前。</p><h3 id="增加多语言支持" tabindex="-1">增加多语言支持 <a class="header-anchor" href="#增加多语言支持" aria-label="Permalink to &quot;增加多语言支持&quot;">​</a></h3><p>Xcode 使用<code>.strings</code>文件来支持多语言。那什么是<code>.strings</code>呢？<code>.strings</code>文件是一个资源文件，用于存储各种语言的文本。该文件里面保存了一堆 Key-Value 信息，例子如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">&quot;userNameKey&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;User name&quot;</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">&quot;userNameKey&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;User name&quot;</span><span style="color:#24292E;">;</span></span></code></pre></div><p>其中<code>userNameKey</code>是 Key，而<code>User name</code>是具体的值。在 Swift 代码中，我们可以把 Key 传递给<code>NSLocalizedString</code>方法来取出<code>.strings</code>文件里配置的值。具体代码如下：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> use rName </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">NSLocalizedString</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;userNameKey&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">comment</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;Label text for user name&quot;</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> use rName </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">NSLocalizedString</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;userNameKey&quot;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">comment</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;Label text for user name&quot;</span><span style="color:#24292E;">)</span></span></code></pre></div><p>由于 Moments App 使用了纯代码的方式来呈现 UI，我们需要在 Xcode 里面建立一个名叫<strong>Localizable.strings</strong> 的文件来存储 Key-Value 信息。该文件保存在 Moments/Resources/en.lproj 文件夹下面，其中<code>en</code>表示英文，因为 Moments App 的默认语言是英文，假如你的 App 的默认语言是简体中文，那么应该放在 zh-Hans.lproj 文件夹下面。</p>',7),y=s("p",null,"那怎样支持新语言呢？我们可以在 Project Info 配置里面的 Localizations 下面点击加号按钮 （+），然后选择需要添加的语言，如下图所示，我们添加了简体中文。",-1),u=s("p",null,[n("接着选择要增加简体中文支持的资源文件。在 Moments App 里面，我们使用了纯代码的方式来编写 UI，因此我们只选择刚才新建的"),s("strong",null,"Localizable.strings"),n("文件。")],-1),d=s("p",null,[n("然后你会看到在"),s("strong",null,"Localizable.strings"),n(" 下多了一个"),s("strong",null,"Localizable.strings（Chinese, Simplified）"),n(" 文件用于保存简体中文的文本信息。")],-1),g=l('<p>现在我们可以在<strong>Localizable.strings</strong>里面添加下面的 Key-Value 来让 App 显示中文了。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">&quot;userNameKey&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;用户名&quot;</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">&quot;userNameKey&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;用户名&quot;</span><span style="color:#24292E;">;</span></span></code></pre></div><p>当用户在 iOS 的 Settings App 里面把语言选择为<strong>简体中文</strong>以后， App 里面的文本就会变成中文。我们也可以使用同样的办法来增加不同的语言支持。</p>',3),F=l(`<h3 id="配置-swiftgen-yml-文件" tabindex="-1">配置 swiftgen.yml 文件 <a class="header-anchor" href="#配置-swiftgen-yml-文件" aria-label="Permalink to &quot;配置 swiftgen.yml 文件&quot;">​</a></h3><p>不知道你发现没有，调用<code>NSLocalizedString</code>方法来取出文本并不方便，一不小心就会把 Key 写错了。那么，有没有什么好的办法方便我们使用<code>.strings</code>文件里面的文本呢？有，那就是<strong>使用 SwiftGen 来自动生成带类型信息的常量字符串。</strong></p><p>为什么呢？因为 SwfitGen 在执行过程中会读取 swiftgen.yml 文件里面的信息，要知道， swiftgen.yml 文件就是用来告诉 SwiftGen 读取那些文件，使用哪个模版以及在哪里存放生成的文件。那么，如何配置该文件，让 SeiftGen 帮我们生成用于全球化和本地化的常量字符串呢？</p><p>做法非常简单，我们可以在 swiftgen.yml 文件添加以下一段代码。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;"> strings</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">   inputs</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> Moments</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">Resources</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">en.lproj</span></span>
<span class="line"><span style="color:#E1E4E8;">   outputs</span><span style="color:#F97583;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> templateName</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> structured</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">swift5</span></span>
<span class="line"><span style="color:#E1E4E8;">       output</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> Moments</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">Generated</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">Strings.swift</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;"> strings</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">   inputs</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> Moments</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">Resources</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">en.lproj</span></span>
<span class="line"><span style="color:#24292E;">   outputs</span><span style="color:#D73A49;">:</span></span>
<span class="line"><span style="color:#24292E;">     </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> templateName</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> structured</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">swift5</span></span>
<span class="line"><span style="color:#24292E;">       output</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> Moments</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">Generated</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">Strings.swift</span></span></code></pre></div><p>其中<code>strings</code>表示这是一个用户生成常量字符串的任务。<code>inputs</code>用于指定<code>.strings</code>文件所在的位置，在我们的项目中，该文件位于 Moments/Resources/en.lproj。要注意的是，我们只需要指定一个语言的文件夹就行，它通常是默认开发语言的文件夹。<br><code>outputs.templateName</code>表示生成文件所使用的模版，我们使用<code>structured-swift5</code>模版表示所生成的代码支持点号 (.) 分割 Swift 5 代码。<code>outputs.output</code>表示所生成文件存放的位置。以下是生成的 Moments/Generated/Strings.swift ：</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">internal</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">enum</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">L10n</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">internal</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">enum</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">InternalMenu</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">/// Area 51</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">internal</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> area51 </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> L10n.</span><span style="color:#79B8FF;">tr</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Localizable&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;internalMenu.area51&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">/// Avatars</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">internal</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">static</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> generalInfo </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> L10n.</span><span style="color:#79B8FF;">tr</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;Localizable&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;internalMenu.generalInfo&quot;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">internal</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">enum</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">L10n</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">internal</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">enum</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">InternalMenu</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">/// Area 51</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">internal</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> area51 </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> L10n.</span><span style="color:#005CC5;">tr</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Localizable&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;internalMenu.area51&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">/// Avatars</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">internal</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">static</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">let</span><span style="color:#24292E;"> generalInfo </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> L10n.</span><span style="color:#005CC5;">tr</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;Localizable&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;internalMenu.generalInfo&quot;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>因为我们在 Localizable.strings 文件里定义 Key 的时候使用了点号，SwiftGen 会使用内嵌套枚举类型 (Nested enum) 来把各个常量字符串通过命名空间进行分组。下面是英文版本 Localizable.strings 文件的部分定义。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// Internal Menu</span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;internalMenu.area51&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Area 51&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;internalMenu.generalInfo&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;General Info&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#6A737D;">// Moments List</span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;momentsList.errorMessage&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Something went wrong, please try again later&quot;</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// Internal Menu</span></span>
<span class="line"><span style="color:#032F62;">&quot;internalMenu.area51&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Area 51&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#032F62;">&quot;internalMenu.generalInfo&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;General Info&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;">// Moments List</span></span>
<span class="line"><span style="color:#032F62;">&quot;momentsList.errorMessage&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Something went wrong, please try again later&quot;</span><span style="color:#24292E;">;</span></span></code></pre></div><p>我们可以对比一下中文版本 Localizable.strings 文件的部分定义。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// Internal Menu</span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;internalMenu.area51&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;51 区&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;internalMenu.generalInfo&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;通用信息&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#6A737D;">// Moments List</span></span>
<span class="line"><span style="color:#9ECBFF;">&quot;momentsList.errorMessage&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;出错啦，请稍后再试&quot;</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// Internal Menu</span></span>
<span class="line"><span style="color:#032F62;">&quot;internalMenu.area51&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;51 区&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#032F62;">&quot;internalMenu.generalInfo&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;通用信息&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#6A737D;">// Moments List</span></span>
<span class="line"><span style="color:#032F62;">&quot;momentsList.errorMessage&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;出错啦，请稍后再试&quot;</span><span style="color:#24292E;">;</span></span></code></pre></div><p>可以看到，我们在定义所有 Key 的时候，都使用了点号进行分割，这可以帮助我们分组各类文本的同时，保证不同语言的文本信息都使用同样的 Key。</p><h3 id="使用生成的字符串" tabindex="-1">使用生成的字符串 <a class="header-anchor" href="#使用生成的字符串" aria-label="Permalink to &quot;使用生成的字符串&quot;">​</a></h3><p>当 SwiftGen 自动生成那些常量字符串以后，我们就可以很方便地使用它们，下面的代码演示了如何调用这些字符串。</p><div class="language-swift vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> title </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> L10n.InternalMenu.area51</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> infoSection </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">InternalMenuSection</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">title</span><span style="color:#E1E4E8;">: L10n.InternalMenu.generalInfo,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">items</span><span style="color:#E1E4E8;">: [</span><span style="color:#79B8FF;">InternalMenuDescriptionItemViewModel</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">title</span><span style="color:#E1E4E8;">: appVersion)]</span></span>
<span class="line"><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> title </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> L10n.InternalMenu.area51</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> infoSection </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">InternalMenuSection</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">title</span><span style="color:#24292E;">: L10n.InternalMenu.generalInfo,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">items</span><span style="color:#24292E;">: [</span><span style="color:#005CC5;">InternalMenuDescriptionItemViewModel</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">title</span><span style="color:#24292E;">: appVersion)]</span></span>
<span class="line"><span style="color:#24292E;">)</span></span></code></pre></div><p>我们可以使用枚举类型<code>L10n</code>来取出相应的常量字符串。<code>L10n</code>的扩展方法 （Extension method）会根据当前用户的语言选择来读取相应的 Localizable.strings 文件，并返回对应语言的字符串来显示给用户。</p><p>下面是 Moments App 在英文语言和中文语言环境下的显示。</p>`,17),h=s("h3",{id:"总结",tabindex:"-1"},[n("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),m=s("p",null,[n("这一讲，我介绍了如何使用"),s("code",null,".strings"),n("文件和 SwiftGen 来快速设置多语言支持。有了"),s("code",null,".strings"),n("文件，支持新的语言变得非常简单，甚至可以在没有程序员的情况下，由翻译人员来翻译并发布新的语言。另外，有了 SwiftGen 所生成的常量字符串，我们不会再把错误的 Key 传递给"),s("code",null,"NSLocalizedString"),n("，从而提高了代码的质量。可以说，这个设置是一本万利，哪怕目前你的 App 还没有支持多个语言，我还是建议你花一丁点时来设置多语言支持。")],-1),_=s("p",null,"思考题",-1),A=s("blockquote",null,[s("p",null,"请问你们的 App 支持多种语言吗？通过怎样的方法来支持的？有没有什么经验可以分享给大家？")],-1),q=s("p",null,[s("strong",null,"源码地址：")],-1),f=s("blockquote",null,[s("p",null,[n("swiftgen.yml文件"),s("br"),s("a",{href:"https://github.com/lagoueduCol/iOS-linyongjian/blob/main/Moments/swiftgen.yml?fileGuid=zudKfgEPTlY6FdyY",target:"_blank",rel:"noreferrer"},"https://github.com/lagoueduCol/iOS-linyongjian/blob/main/Moments/swiftgen.yml")])],-1);function C(b,S,v,M,D,B){const a=e("Image");return t(),c("div",null,[i,o(a,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image6/M01/2B/A7/CioPOWBkHlSAeXTsAAMc4RV6WTU312.png"}),E,o(a,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image6/M00/2B/A7/CioPOWBkHmeAY4FcAAgNpRSDhtQ750.png"}),y,o(a,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image6/M00/2B/A7/CioPOWBkHomAUYSMAARlhkCjiB8769.png"}),u,o(a,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image6/M00/2B/A8/CioPOWBkHq6AeNUbAAkEtHtkg7Y024.png"}),d,o(a,{alt:"图片7.png",src:"https://s0.lgstatic.com/i/image6/M01/2B/9F/Cgp9HWBkHsiAVW0pAAbU0JAhhic101.png"}),g,o(a,{alt:"图片8.png",src:"https://s0.lgstatic.com/i/image6/M01/2B/A8/CioPOWBkHvaADdnnAAFQMZcn0Qs565.png"}),F,o(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image6/M01/2A/AB/CioPOWBi0EqAUJMbAAZDN5VTllQ225.png"}),h,m,o(a,{alt:"思维导图+二维码.png",src:"https://s0.lgstatic.com/i/image6/M01/2B/B1/CioPOWBkJqWAECB2AAgeL26iQbI826.png"}),_,A,q,f])}const I=p(r,[["render",C]]);export{w as __pageData,I as default};
