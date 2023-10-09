import{_ as l,j as e,o as t,h as c,k as p,f as a,s,Q as o}from"./chunks/framework.d3daa342.js";const f=JSON.parse('{"title":"第16讲：浏览器同源策略与跨域方案详解","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/前端高手进阶_文档/(3188) 第16讲：浏览器同源策略与跨域方案详解.md","filePath":"posts/frontEnd/前端高手进阶_文档/(3188) 第16讲：浏览器同源策略与跨域方案详解.md","lastUpdated":1696682708000}'),r={name:"posts/frontEnd/前端高手进阶_文档/(3188) 第16讲：浏览器同源策略与跨域方案详解.md"},i=s("h1",{id:"第16讲-浏览器同源策略与跨域方案详解",tabindex:"-1"},[a("第16讲：浏览器同源策略与跨域方案详解 "),s("a",{class:"header-anchor",href:"#第16讲-浏览器同源策略与跨域方案详解","aria-label":'Permalink to "第16讲：浏览器同源策略与跨域方案详解"'},"​")],-1),E=s("p",null,"开发出高性能的 Web 应用固然重要，但安全问题也不容小觑。这一课时我们继续以 HTTP 为线索，展开来讲一讲浏览器安全相关的同源策略。",-1),y=s("h3",{id:"浏览器的同源策略-same-origin-policy",tabindex:"-1"},[a("浏览器的同源策略（Same Origin Policy） "),s("a",{class:"header-anchor",href:"#浏览器的同源策略-same-origin-policy","aria-label":'Permalink to "浏览器的同源策略（Same Origin Policy）"'},"​")],-1),d=s("p",null,"源（Origin）是由 URL 中协议、主机名（域名 domain）以及端口共同组成的部分。在下面的网址中，源由协议 https、主机名 kaiwu.lagou.com 和默认端口 443 共同组成。",-1),h=o('<p>URL 中的源</p><p>如果两个 URL 的源相同，我们就称之为<strong>同源</strong>。下面的 3 个 URL 和示例 URL 都是不同的源。</p><ul><li><p><a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=180#/content" target="_blank" rel="noreferrer">http://kaiwu.lagou.com/course/courseInfo.htm?courseId=180#/content</a>：协议不同。</p></li><li><p><a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=180#/content" target="_blank" rel="noreferrer">https://kaiwu.lagou.com:80/course/courseInfo.htm?courseId=180#/content</a>：端口不同。</p></li><li><p><a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=180#/content" target="_blank" rel="noreferrer">https://lagou.com/course/courseInfo.htm?courseId=180#/content</a>：主机名不同。</p></li></ul><p>而下面 2 个网址和示例 URL 都是同源。</p><ul><li><p><a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=288#/sale" target="_blank" rel="noreferrer">https://kaiwu.lagou.com/course/courseInfo.htm?courseId=288#/sale</a>：请求参数不同。</p></li><li><p><a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=288#/sale" target="_blank" rel="noreferrer">https://kaiwu.lagou.com</a>：URL 路径不同。</p></li></ul><p>当一个源访问另一个源的资源时就会产生<strong>跨源</strong> 。同源策略就是用来限制其中一些跨源访问的，包括访问 iframe 中的页面、其他页面的 cookie 访问以及发送 AJAX 请求。最常见的跨源场景是域名不同，即常说的&quot;跨域&quot;。<strong>本课时也按照约定俗成的说法，用&quot;跨域&quot;来指代&quot;跨源&quot;</strong>。</p><p>同源策略在保障安全的同时也带来了不少问题，比如 iframe 中的子页面与父页面无法通信，浏览器与其他服务端无法交互数据。所以我们需要一些跨域方案来解决这些问题。</p><h3 id="请求跨域解决方案" tabindex="-1">请求跨域解决方案 <a class="header-anchor" href="#请求跨域解决方案" aria-label="Permalink to &quot;请求跨域解决方案&quot;">​</a></h3><p>对于浏览器请求跨域，常用的有下面 4 种方法。</p><h4 id="跨域资源共享" tabindex="-1">跨域资源共享 <a class="header-anchor" href="#跨域资源共享" aria-label="Permalink to &quot;跨域资源共享&quot;">​</a></h4><p>跨域资源共享（CORS，Cross-Origin Resource Sharing）是浏览器为 AJAX 请求设置的一种跨域机制，让其可以在服务端允许的情况下进行跨域访问。主要通过 HTTP 响应头来告诉浏览器服务端是否允许当前域的脚本进行跨域访问。</p><p>跨域资源共享将 AJAX 请求分成了两类：简单请求和非简单请求。其中<strong>简单请求</strong>符合下面 2 个特征。</p><ul><li><p>请求方法为 GET、POST、HEAD。</p></li><li><p>请求头只能使用下面的字段：Accept（浏览器能够接受的响应内容类型）、Accept-Language（浏览器能够接受的自然语言列表）、Content-Type （请求对应的类型，只限于 text/plain、multipart/form-data、application/x-www-form-urlencoded）、Content-Language（浏览器希望采用的自然语言）、Save-Data（浏览器是否希望减少数据传输量）。</p></li></ul><p><strong>任意一条要求不符合的即为非简单请求。</strong></p><p>对于简单请求，处理流程如下：</p><ul><li><p>浏览器发出简单请求的时候，会在请求头部增加一个 Origin 字段，对应的值为当前请求的源信息；</p></li><li><p>当服务端收到请求后，会根据请求头字段 Origin 做出判断后返回相应的内容。</p></li><li><p>浏览器收到响应报文后会根据响应头部字段 Access-Control-Allow-Origin 进行判断，这个字段值为服务端允许跨域请求的源，其中通配符&quot;*&quot;表示允许所有跨域请求。如果头部信息没有包含 Access-Control-Allow-Origin 字段或者响应的头部字段 Access-Control-Allow-Origin 不允许当前源的请求，则会抛出错误。</p></li></ul><p>当处理非简单的请求时，浏览器会先发出一个预检请求（Preflight）。这个预检请求为 OPTIONS 方法，并会添加了 1 个请求头部字段 Access-Control-Request-Method，值为跨域请求所使用的请求方法。</p><p>下图是一个预检请求的请求报文和响应报文。因为添加了不属于上述简单请求的头部字段，所以浏览器在请求头部添加了 Access-Control-Request-Headers 字段，值为跨域请求添加的请求头部字段 authorization。</p>',18),u=o(`<p>预检请求头部信息</p><p>在服务端收到预检请求后，除了在响应头部添加 Access-Control-Allow-Origin 字段之外，至少还会添加 Access-Control-Allow-Methods 字段来告诉浏览器服务端允许的请求方法，并返回 204 状态码。</p><p>在上面的例子中，服务端还根据浏览器的 Access-Control-Request-Headers 字段回应了一个 Access-Control-Allow-Headers 字段，来告诉浏览器服务端允许的请求头部字段。</p><p>浏览器得到预检请求响应的头部字段之后，会判断当前请求服务端是否在服务端许可范围之内，如果在则继续发送跨域请求，反之则直接报错。</p><h4 id="jsonp" tabindex="-1">JSONP <a class="header-anchor" href="#jsonp" aria-label="Permalink to &quot;JSONP&quot;">​</a></h4><p>JSONP（JSON with Padding）的大概意思就是用 JSON 数据来填充，怎么填充呢？结合它的实现方式可以知道，就是把 JSON 数填充到一个回调函数中。这种比较 hack 的方式，依赖的是 script 标签跨域引用 js 文件不会受到浏览器同源策略的限制。</p><p>下面以一个具体例子来讲解它的具体实现方式。</p><p>假设我们要在 <a href="http://ww.a.com" target="_blank" rel="noreferrer">http://ww.a.com</a> 中向 <a href="http://www.b.com" target="_blank" rel="noreferrer">http://www.b.com</a> 请求数据。</p><p>1.全局声明一个用来处理返回值的函数 fn，该函数参数为请求的返回结果。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">fn</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">result</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(result)</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">fn</span><span style="color:#24292E;">(</span><span style="color:#E36209;">result</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(result)</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>2.将函数名与其他参数一并写入 URL 中。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> url </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;http://www.b.com?callback=fn&amp;params=...&#39;</span><span style="color:#E1E4E8;">;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> url </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;http://www.b.com?callback=fn&amp;params=...&#39;</span><span style="color:#24292E;">;</span></span></code></pre></div><p>3.创建一个 script 标签，把 URL 赋值给 script 的 src。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> script </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> document.</span><span style="color:#B392F0;">createElement</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;script&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">script.</span><span style="color:#B392F0;">setAttribute</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;type&quot;</span><span style="color:#E1E4E8;">,</span><span style="color:#9ECBFF;">&quot;text/javascript&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">script.src </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> url;</span></span>
<span class="line"><span style="color:#E1E4E8;">document.body.</span><span style="color:#B392F0;">appendChild</span><span style="color:#E1E4E8;">(script);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> script </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> document.</span><span style="color:#6F42C1;">createElement</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;script&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">script.</span><span style="color:#6F42C1;">setAttribute</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;type&quot;</span><span style="color:#24292E;">,</span><span style="color:#032F62;">&quot;text/javascript&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">script.src </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> url;</span></span>
<span class="line"><span style="color:#24292E;">document.body.</span><span style="color:#6F42C1;">appendChild</span><span style="color:#24292E;">(script);</span></span></code></pre></div><p>4.当服务器接收到请求后，解析 URL 参数并进行对应的逻辑处理，得到结果后将其写成回调函数的形式并返回给浏览器。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">fn</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  list: [],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">...</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">fn</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  list: [],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">...</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>5.在浏览器收到请求返回的 js 脚本之后会立即执行文件内容，即在控制台打印传入的数据内容。</p><p>JSONP 虽然实现了跨域请求，但也存在 3 个问题：</p><ul><li><p>只能发送 GET 请求，限制了参数大小和类型；</p></li><li><p>请求过程无法终止，导致弱网络下处理超时请求比较麻烦；</p></li><li><p>无法捕获服务端返回的异常信息。</p></li></ul><h4 id="websocket" tabindex="-1">Websocket <a class="header-anchor" href="#websocket" aria-label="Permalink to &quot;Websocket&quot;">​</a></h4><p>Websocket 是 HTML5 规范提出的一个应用层的全双工协议，适用于浏览器与服务器进行实时通信场景。</p><p>什么叫全双工呢？</p><p>这是通信传输的一个术语，这里的&quot;工&quot;指的是通信方向，&quot;双工&quot;是指从客户端到服务端，以及从服务端到客户端两个方向都可以通信，&quot;全&quot;指的是通信双方可以同时向对方发送数据。与之相对应的还有半双工和单工，半双工指的是双方可以互相向对方发送数据，但双方不能同时发送，单工则指的是数据只能从一方发送到另一方。</p><p>下面是一段简单的示例代码。在 a 网站直接创建一个 WebSocket 连接，连接到 b 网站即可，然后调用 WebScoket 实例 ws 的 send() 函数向服务端发送消息，监听实例 ws 的 onmessage 事件得到响应内容。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> ws </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">WebSocket</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;ws://b.com&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">ws.</span><span style="color:#B392F0;">onopen</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// ws.send(...);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">ws.</span><span style="color:#B392F0;">onmessage</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">){</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// console.log(e.data);</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> ws </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">WebSocket</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;ws://b.com&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">ws.</span><span style="color:#6F42C1;">onopen</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// ws.send(...);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">ws.</span><span style="color:#6F42C1;">onmessage</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;">(</span><span style="color:#E36209;">e</span><span style="color:#24292E;">){</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// console.log(e.data);</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h4 id="代理转发" tabindex="-1">代理转发 <a class="header-anchor" href="#代理转发" aria-label="Permalink to &quot;代理转发&quot;">​</a></h4><p>跨域是为了突破浏览器的同源策略限制，既然同源策略只存在于浏览器，那可以换个思路，在服务端进行跨域，比如设置代理转发。这种在服务端设置的代理称为&quot;<strong>反向代理</strong>&quot;，对于用户而言是无感知的。</p><p>另一种在客户端使用的代理称为&quot;<strong>正向代理</strong>&quot;，主要用来代理客户端发送请求，用户使用时必须配置代理服务器的网址，比如常用的 VPN 工具就属于正向代理。</p><p>代理转发实现起来非常简单，在当前被访问的服务器配置一个请求转发规则就行了。</p><p>下面的代码是 webpack-dev-server 配置代理的示例代码。当浏览器发起前缀为 /api 的请求时都会被转发到 <a href="http://localhost:3000" target="_blank" rel="noreferrer">http://localhost:3000</a> 这个网址，然后将响应结果返回给浏览器。对于浏览器而言还是请求当前网站，但实际上已经被服务端转发。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//...</span></span>
<span class="line"><span style="color:#E1E4E8;">  devServer: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    proxy: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#9ECBFF;">&#39;/api&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;http://localhost:3000&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// webpack.config.js</span></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//...</span></span>
<span class="line"><span style="color:#24292E;">  devServer: {</span></span>
<span class="line"><span style="color:#24292E;">    proxy: {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#032F62;">&#39;/api&#39;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;http://localhost:3000&#39;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><p>在 Nginx 服务器上配置同样的转发规则也非常简单，下面是示例配置。</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">location </span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">api {</span></span>
<span class="line"><span style="color:#E1E4E8;">    proxy_pass   http</span><span style="color:#F97583;">:</span><span style="color:#6A737D;">//localhost:3000;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">location </span><span style="color:#D73A49;">/</span><span style="color:#24292E;">api {</span></span>
<span class="line"><span style="color:#24292E;">    proxy_pass   http</span><span style="color:#D73A49;">:</span><span style="color:#6A737D;">//localhost:3000;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>通过 location 指令匹配路径，然后通过 proxy_pass 指令指向代理地址即可。</p><h3 id="页面跨域解决方案" tabindex="-1">页面跨域解决方案 <a class="header-anchor" href="#页面跨域解决方案" aria-label="Permalink to &quot;页面跨域解决方案&quot;">​</a></h3><p>除了浏览器请求跨域之外，页面之间也会有跨域需求，例如使用 iframe 时父子页面之间进行通信。</p><h4 id="postmessage" tabindex="-1">postMessage <a class="header-anchor" href="#postmessage" aria-label="Permalink to &quot;postMessage&quot;">​</a></h4><p>HTML5 推出了一个新的函数 postMessage() 用来实现父子页面之间通信，而且不论这两个页面是否同源。</p><p>举例来说，如果父页面 <a href="https://lagou.com" target="_blank" rel="noreferrer">https://lagou.com</a> 要向子页面 <a href="https://kaiwu.lagou.com" target="_blank" rel="noreferrer">https://kaiwu.lagou.com</a> 发消息，可以通过下面的代码实现。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// https://lagou.com</span></span>
<span class="line"><span style="color:#F97583;">var</span><span style="color:#E1E4E8;"> child </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> window.</span><span style="color:#B392F0;">open</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;https://kaiwu.lagou.com&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">child.</span><span style="color:#B392F0;">postMessage</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;hi&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;https://kaiwu.lagou.com&#39;</span><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// https://lagou.com</span></span>
<span class="line"><span style="color:#D73A49;">var</span><span style="color:#24292E;"> child </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> window.</span><span style="color:#6F42C1;">open</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;https://kaiwu.lagou.com&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">child.</span><span style="color:#6F42C1;">postMessage</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;hi&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;https://kaiwu.lagou.com&#39;</span><span style="color:#24292E;">);</span></span></code></pre></div><p>上面的代码通过 window.open() 函数打开了子页面，然后调用 child.postMessage() 函数发送了字符串数据&quot;hi&quot;给子页面。</p><p>在子页面中，只需要监听&quot;message&quot;事件即可得到父页面的数据。代码如下：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// https://kaiwu.lagou.com</span></span>
<span class="line"><span style="color:#E1E4E8;">window.</span><span style="color:#B392F0;">addEventListener</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;message&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(e.data);</span></span>
<span class="line"><span style="color:#E1E4E8;">},</span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// https://kaiwu.lagou.com</span></span>
<span class="line"><span style="color:#24292E;">window.</span><span style="color:#6F42C1;">addEventListener</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;message&#39;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">function</span><span style="color:#24292E;">(</span><span style="color:#E36209;">e</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(e.data);</span></span>
<span class="line"><span style="color:#24292E;">},</span><span style="color:#005CC5;">false</span><span style="color:#24292E;">);</span></span></code></pre></div><p>同样的，父页面也可以监听&quot;message&quot;事件来接收子页面发送的数据。子页面发送数据时则要通过 window.opener 对象来调用 postMessage() 函数。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// https://kaiwu.lagou.com</span></span>
<span class="line"><span style="color:#E1E4E8;">window.opener.</span><span style="color:#B392F0;">postMessage</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;hello&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;https://lagou.com&#39;</span><span style="color:#E1E4E8;">);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// https://kaiwu.lagou.com</span></span>
<span class="line"><span style="color:#24292E;">window.opener.</span><span style="color:#6F42C1;">postMessage</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;hello&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;https://lagou.com&#39;</span><span style="color:#24292E;">);</span></span></code></pre></div><h4 id="改域" tabindex="-1">改域 <a class="header-anchor" href="#改域" aria-label="Permalink to &quot;改域&quot;">​</a></h4><p>对于主域名相同，子域名不同的情况，可以通过修改 document.domain 的值来进行跨域。如果将其设置为其当前域的父域，则这个较短的父域将用于后续源检查。</p><p>比如，有一个页面，它的地址是 <a href="https://www.lagou.com/parent.html" target="_blank" rel="noreferrer">https://www.lagou.com/parent.html</a>，在这个页面里面有一个 iframe，其 src 是 <a href="http://kaiwu.lagou.com/child.html" target="_blank" rel="noreferrer">http://kaiwu.lagou.com/child.html</a>。</p><p>这时只要把 <a href="http://www.lagou.com/parent.html" target="_blank" rel="noreferrer">http://www.lagou.com/parent.html</a> 和 <a href="http://kaiwu.lagou.com/child.html" target="_blank" rel="noreferrer">http://kaiwu.lagou.com/child.html</a> 这两个页面的 document.domain 都设成相同的域名，那么父子页面之间就可以进行跨域通信了，同时还可以共享 cookie。</p><p>但要注意的是，只能把 document.domain 设置成更高级的父域才有效果，例如在 <a href="http://kaiwu.lagou.com/child.html" target="_blank" rel="noreferrer">http://kaiwu.lagou.com/child.html</a> 中可以将 document.domain 设置成 lagou.com。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>本课时介绍了浏览器的同源策略，并分别从请求跨域与页面跨域两个方向介绍了几种常用的跨域方案。</p><p>对于请求跨域，包括跨域资源共享、JSONP、Websocket、代理转发 4 种方式，推荐优先使用代理转发和跨域资源共享。对于页面跨域，包括 postMessage 和改域 2 种方式，使用频率没有请求跨域那么高，记住 2 种方式实现原理就好。</p><p>最后布置一道思考题：说一说你还知道浏览器的哪些安全策略？</p><p>OK，这一课时就讲到这里啦，如果你觉得这个内容对你有所启发，欢迎分享给你的朋友或者同事探讨学习。</p>`,55);function g(m,k,b,v,F,w){const n=e("Image");return t(),c("div",null,[i,E,y,d,p(n,{alt:"3.png",src:"https://s0.lgstatic.com/i/image6/M00/25/12/CioPOWBZVeWATe0uAAAhcRPjM7k018.png"}),a(),h,p(n,{alt:"image (13).png",src:"https://s0.lgstatic.com/i/image/M00/33/5D/Ciqc1F8QAGWAXq7jAABT5RmcAOI346.png"}),a(),u])}const A=l(r,[["render",g]]);export{f as __pageData,A as default};
