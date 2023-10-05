import{_ as o,j as e,o as t,g as r,k as p,h as s,s as n,Q as l}from"./chunks/framework.4e7d56ce.js";const T=JSON.parse('{"title":"浏览器加载网络资源的速度 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/前端高手进阶_文档/(3187) 第15讲：如何让浏览器更快地加载网络资源？.md","filePath":"posts/frontEnd/前端高手进阶_文档/(3187) 第15讲：如何让浏览器更快地加载网络资源？.md","lastUpdated":1696417798000}'),c={name:"posts/frontEnd/前端高手进阶_文档/(3187) 第15讲：如何让浏览器更快地加载网络资源？.md"},E=n("h3",{id:"浏览器加载网络资源的速度",tabindex:"-1"},[s("浏览器加载网络资源的速度 "),n("a",{class:"header-anchor",href:"#浏览器加载网络资源的速度","aria-label":'Permalink to "浏览器加载网络资源的速度"'},"​")],-1),i=n("p",null,[s("想要加快浏览器加载网络资源的速度，可以通过减少响应内容大小，比如使用 gzip 算法压缩响应体内容和 HTTP/2 的压缩头部功能；另一种更通用也更为重要的技术就是"),n("strong",null,"使用缓存"),s("。")],-1),y=n("p",null,"下面两张截图分别是未使用缓存以及使用浏览器默认缓存的请求文件所消耗的时间，可以看出使用缓存之后加载时间大大缩短。",-1),d=n("p",null,"从服务端请求文件所消耗的时间",-1),h=l('<p>从缓存中获取文件所消耗的时间</p><p>Web 缓存按存储位置来区分，包括<strong>数据库缓存</strong> 、<strong>服务端缓存</strong> 、<strong>CDN 缓存</strong> 和<strong>浏览器缓存</strong>。这一课时我们着重介绍浏览器缓存。</p><p>浏览器缓存的实现方式主要有两种：HTTP 和 ServiceWorker 。</p><h3 id="http-缓存" tabindex="-1">HTTP 缓存 <a class="header-anchor" href="#http-缓存" aria-label="Permalink to &quot;HTTP 缓存&quot;">​</a></h3><p>使用缓存最大的问题往往不在于将资源缓存在什么位置或者如何读写资源，而在于如何保证缓存与实际资源一致的同时，提高缓存的命中率。也就是说尽可能地让浏览器从缓存中获取资源，但同时又要保证被使用的缓存与服务端最新的资源保持一致。</p><p>为了达到这个目的，需要制定合适的缓存过期策略（简称&quot;缓存策略&quot;），HTTP 支持的缓存策略有两种：<strong>强制缓存</strong> 和<strong>协商缓存</strong>。</p><h4 id="强制缓存" tabindex="-1">强制缓存 <a class="header-anchor" href="#强制缓存" aria-label="Permalink to &quot;强制缓存&quot;">​</a></h4><p>强制缓存是在浏览器加载资源的时候，先直接从缓存中查找请求结果，如果不存在该缓存结果，则直接向服务端发起请求。</p><p><strong>1.</strong> <strong>Expires</strong></p><p>HTTP/1.0 中可以使用响应头部字段 Expires 来设置缓存时间，它对应一个未来的时间戳。客户端第一次请求时，服务端会在响应头部添加 Expires 字段。当浏览器再次发送请求时，先会对比当前时间和 Expires 对应的时间，如果当前时间早于 Expires 时间，那么直接使用缓存；反之，需要再次发送请求。</p>',10),g=l('<p>响应头部中的 Expires 信息</p><br><p>上述 Expires 信息告诉浏览器：在 2020.10.10 日之前，可以直接使用该请求的缓存。但是使用 Expires 响应头时容易产生一个问题，那就是服务端和浏览器的时间很可能不同，因此这个缓存过期时间容易出现偏差。同样的，客户端也可以通过修改系统时间来继续使用缓存或提前让缓存失效。</p><p>为了解决这个问题，HTTP/1.1 提出了 Cache-Control 响应头部字段。</p><p><strong>2.</strong> <strong>Cache-Control</strong></p><p>它的常用值有下面几个：</p><ul><li><p><strong>no-cache</strong>，表示使用协商缓存，即每次使用缓存前必须向服务端确认缓存资源是否更新；</p></li><li><p><strong>no-store</strong>，禁止浏览器以及所有中间缓存存储响应内容；</p></li><li><p><strong>public</strong>，公有缓存，表示可以被代理服务器缓存，可以被多个用户共享；</p></li><li><p><strong>private</strong>，私有缓存，不能被代理服务器缓存，不可以被多个用户共享；</p></li><li><p><strong>max-age</strong>，以秒为单位的数值，表示缓存的有效时间；</p></li><li><p><strong>must-revalidate</strong>，当缓存过期时，需要去服务端校验缓存的有效性。</p></li></ul><p>这几个值可以组合使用，比如像下面这样：</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">cache</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">control</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">public</span><span style="color:#E1E4E8;">, max</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">age</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">31536000</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">cache</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">control</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">public</span><span style="color:#24292E;">, max</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">age</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">31536000</span></span></code></pre></div><p>告诉浏览器该缓存为公有缓存，有效期 1 年。</p><p>需要注意的是，cache-control 的 max-age 优先级高于 Expires，也就是说如果它们同时出现，浏览器会使用 max-age 的值。</p><p>注意，虽然你可能在其他资料中看到可以使用 meta 标签来设置缓存，比如像下面的形式：</p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">meta</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">http-equiv</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;expires&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">content</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;Wed, 20 Jun 2021 22:33:00 GMT&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">meta</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">http-equiv</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;expires&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">content</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;Wed, 20 Jun 2021 22:33:00 GMT&quot;</span></span></code></pre></div><p>但在 HTML5 规范中，并不支持这种方式，所以尽量不要使用 meta 标签来设置缓存。</p><h4 id="协商缓存" tabindex="-1">协商缓存 <a class="header-anchor" href="#协商缓存" aria-label="Permalink to &quot;协商缓存&quot;">​</a></h4><p>协商缓存的更新策略是不再指定缓存的有效时间了，而是浏览器直接发送请求到服务端进行确认缓存是否更新，如果请求响应返回的 HTTP 状态为 304，则表示缓存仍然有效。控制缓存的难题就是从浏览器端转移到了服务端。</p><p><strong>1.</strong> <strong>Last-Modified 和 If-Modified-Since</strong></p><p>服务端要判断缓存有没有过期，只能将双方的资源进行对比。若浏览器直接把资源文件发送给服务端进行比对的话，网络开销太大，而且也会失去缓存的意义，所以显然是不可取的。有一种简单的判断方法，那就是通过响应头部字段 Last-Modified 和请求头部字段 If-Modified-Since 比对双方资源的修改时间。</p><p>具体工作流程如下：</p><ul><li><p>浏览器第一次请求资源，服务端在返回资源的响应头中加入 Last-Modified 字段，该字段表示这个资源在服务端上的最近修改时间；</p></li><li><p>当浏览器再次向服务端请求该资源时，请求头部带上之前服务端返回的修改时间，这个请求头叫 If-Modified-Since；</p></li><li><p>服务端再次收到请求，根据请求头 If-Modified-Since 的值，判断相关资源是否有变化，如果没有，则返回 304 Not Modified，并且不返回资源内容，浏览器使用资源缓存值；否则正常返回资源内容，且更新 Last-Modified 响应头内容。</p></li></ul><p>这种方式虽然能判断缓存是否失效，但也存在两个问题：</p><ul><li><p><strong>精度问题</strong>，Last-Modified 的时间精度为秒，如果在 1 秒内发生修改，那么缓存判断可能会失效；</p></li><li><p><strong>准度问题</strong>，考虑这样一种情况，如果一个文件被修改，然后又被还原，内容并没有发生变化，在这种情况下，浏览器的缓存还可以继续使用，但因为修改时间发生变化，也会重新返回重复的内容。</p></li></ul><p><strong>2.</strong> <strong>ETag 和 If-None-Match</strong></p><p>为了解决精度问题和准度问题，HTTP 提供了另一种不依赖于修改时间，而依赖于文件哈希值的精确判断缓存的方式，那就是响应头部字段 ETag 和请求头部字段 If-None-Match。</p><p>具体工作流程如下：</p><ul><li><p>浏览器第一次请求资源，服务端在返响应头中加入 Etag 字段，Etag 字段值为该资源的哈希值；</p></li><li><p>当浏览器再次跟服务端请求这个资源时，在请求头上加上 If-None-Match，值为之前响应头部字段 ETag 的值；</p></li><li><p>服务端再次收到请求，将请求头 If-None-Match 字段的值和响应资源的哈希值进行比对，如果两个值相同，则说明资源没有变化，返回 304 Not Modified；否则就正常返回资源内容，无论是否发生变化，都会将计算出的哈希值放入响应头部的 ETag 字段中。</p></li></ul><p>这种缓存比较的方式也会存在一些问题，具体表现在以下两个方面。</p><ul><li><p><strong>计算成本</strong>。生成哈希值相对于读取文件修改时间而言是一个开销比较大的操作，尤其是对于大文件而言。如果要精确计算则需读取完整的文件内容，如果从性能方面考虑，只读取文件部分内容，又容易判断出错。</p></li><li><p><strong>计算误差</strong>。HTTP 并没有规定哈希值的计算方法，所以不同服务端可能会采用不同的哈希值计算方式。这样带来的问题是，同一个资源，在两台服务端产生的 Etag 可能是不相同的，所以对于使用服务器集群来处理请求的网站来说，使用 Etag 的缓存命中率会有所降低。</p></li></ul><p>需要注意的是，强制缓存的优先级高于协商缓存，在协商缓存中，Etag 优先级比 Last-Modified 高。既然协商缓存策略也存在一些缺陷，那么我们转移到浏览器端看看 ServiceWorker 能不能给我们带来惊喜。</p><h3 id="serviceworker" tabindex="-1">ServiceWorker <a class="header-anchor" href="#serviceworker" aria-label="Permalink to &quot;ServiceWorker&quot;">​</a></h3><p>ServiceWorker 是浏览器在后台独立于网页运行的脚本，也可以这样理解，它是浏览器和服务端之间的代理服务器。ServiceWorker 非常强大，可以实现包括推送通知和后台同步等功能，更多功能还在进一步扩展，但其最主要的功能是<strong>实现离线缓存</strong>。</p><h4 id="_1-使用限制" tabindex="-1">1. 使用限制 <a class="header-anchor" href="#_1-使用限制" aria-label="Permalink to &quot;1. 使用限制&quot;">​</a></h4><p>越强大的东西往往越危险，所以浏览器对 ServiceWorker 做了很多限制：</p><ul><li><p>在 ServiceWorker 中无法直接访问 DOM，但可以通过 postMessage 接口发送的消息来与其控制的页面进行通信；</p></li><li><p>ServiceWorker 只能在本地环境下或 HTTPS 网站中使用；</p></li><li><p>ServiceWorker 有作用域的限制，一个 ServiceWorker 脚本只能作用于当前路径及其子路径；</p></li><li><p>由于 ServiceWorker 属于实验性功能，所以兼容性方面会存在一些问题，具体兼容情况请看下面的截图。</p></li></ul>',34),F=l(`<p>ServiceWorker 在浏览器中的支持情况</p><h4 id="_2-使用方法" tabindex="-1">2. 使用方法 <a class="header-anchor" href="#_2-使用方法" aria-label="Permalink to &quot;2. 使用方法&quot;">​</a></h4><p>在使用 ServiceWorker 脚本之前先要通过&quot;注册&quot;的方式加载它。常见的注册代码如下所示：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#9ECBFF;">&#39;serviceWorker&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> window.navigator) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  window.navigator.serviceWorker</span></span>
<span class="line"><span style="color:#E1E4E8;">    .</span><span style="color:#B392F0;">register</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;./sw.js&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    .</span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">(console.log)</span></span>
<span class="line"><span style="color:#E1E4E8;">    .</span><span style="color:#B392F0;">catch</span><span style="color:#E1E4E8;">(console.error)</span></span>
<span class="line"><span style="color:#E1E4E8;">} </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">warn</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;浏览器不支持 ServiceWorker!&#39;</span><span style="color:#E1E4E8;">)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#032F62;">&#39;serviceWorker&#39;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> window.navigator) {</span></span>
<span class="line"><span style="color:#24292E;">  window.navigator.serviceWorker</span></span>
<span class="line"><span style="color:#24292E;">    .</span><span style="color:#6F42C1;">register</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;./sw.js&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    .</span><span style="color:#6F42C1;">then</span><span style="color:#24292E;">(console.log)</span></span>
<span class="line"><span style="color:#24292E;">    .</span><span style="color:#6F42C1;">catch</span><span style="color:#24292E;">(console.error)</span></span>
<span class="line"><span style="color:#24292E;">} </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">warn</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;浏览器不支持 ServiceWorker!&#39;</span><span style="color:#24292E;">)</span></span></code></pre></div><p>首先考虑到浏览器的兼容性，判断 window.navigator 中是否存在 serviceWorker 属性，然后通过调用这个属性的 register 函数来告诉浏览器 ServiceWorker 脚本的路径。</p><p>浏览器获取到 ServiceWorker 脚本之后会进行解析，解析完成会进行安装。可以通过监听 &quot;install&quot; 事件来监听安装，但这个事件只会在第一次加载脚本的时候触发。要让脚本能够监听浏览器的网络请求，还需要激活脚本。</p><p>在脚本被激活之后，我们就可以通过监听 fetch 事件来拦截请求并加载缓存的资源了。</p><p>下面是一个利用 ServiceWorker 内部的 caches 对象来缓存文件的示例代码。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">CACHE_NAME</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;ws&#39;</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> preloadUrls </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [</span><span style="color:#9ECBFF;">&#39;/index.css&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">self.</span><span style="color:#B392F0;">addEventListener</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;install&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">event</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  event.</span><span style="color:#B392F0;">waitUntil</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">    caches.</span><span style="color:#B392F0;">open</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">CACHE_NAME</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    .</span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">cache</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> cache.</span><span style="color:#B392F0;">addAll</span><span style="color:#E1E4E8;">(preloadUrls);</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span>
<span class="line"><span style="color:#E1E4E8;">self.</span><span style="color:#B392F0;">addEventListener</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;fetch&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">event</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  event.</span><span style="color:#B392F0;">respondWith</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">    caches.</span><span style="color:#B392F0;">match</span><span style="color:#E1E4E8;">(event.request)</span></span>
<span class="line"><span style="color:#E1E4E8;">    .</span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">response</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (response) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> response;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> caches.</span><span style="color:#B392F0;">open</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">CACHE_NAME</span><span style="color:#E1E4E8;">).</span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> (</span><span style="color:#FFAB70;">cache</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">path</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> event.request.url.</span><span style="color:#B392F0;">replace</span><span style="color:#E1E4E8;">(self.location.origin, </span><span style="color:#9ECBFF;">&#39;&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> cache.</span><span style="color:#B392F0;">add</span><span style="color:#E1E4E8;">(path)</span></span>
<span class="line"><span style="color:#E1E4E8;">        })</span></span>
<span class="line"><span style="color:#E1E4E8;">        .</span><span style="color:#B392F0;">catch</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">e</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> console.</span><span style="color:#B392F0;">error</span><span style="color:#E1E4E8;">(e))</span></span>
<span class="line"><span style="color:#E1E4E8;">    })</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">CACHE_NAME</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;ws&#39;</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> preloadUrls </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [</span><span style="color:#032F62;">&#39;/index.css&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">self.</span><span style="color:#6F42C1;">addEventListener</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;install&#39;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">event</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  event.</span><span style="color:#6F42C1;">waitUntil</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">    caches.</span><span style="color:#6F42C1;">open</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">CACHE_NAME</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    .</span><span style="color:#6F42C1;">then</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">cache</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> cache.</span><span style="color:#6F42C1;">addAll</span><span style="color:#24292E;">(preloadUrls);</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">});</span></span>
<span class="line"><span style="color:#24292E;">self.</span><span style="color:#6F42C1;">addEventListener</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;fetch&#39;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">event</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  event.</span><span style="color:#6F42C1;">respondWith</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">    caches.</span><span style="color:#6F42C1;">match</span><span style="color:#24292E;">(event.request)</span></span>
<span class="line"><span style="color:#24292E;">    .</span><span style="color:#6F42C1;">then</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">response</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (response) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> response;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> caches.</span><span style="color:#6F42C1;">open</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">CACHE_NAME</span><span style="color:#24292E;">).</span><span style="color:#6F42C1;">then</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> (</span><span style="color:#E36209;">cache</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">path</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> event.request.url.</span><span style="color:#6F42C1;">replace</span><span style="color:#24292E;">(self.location.origin, </span><span style="color:#032F62;">&#39;&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> cache.</span><span style="color:#6F42C1;">add</span><span style="color:#24292E;">(path)</span></span>
<span class="line"><span style="color:#24292E;">        })</span></span>
<span class="line"><span style="color:#24292E;">        .</span><span style="color:#6F42C1;">catch</span><span style="color:#24292E;">(</span><span style="color:#E36209;">e</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> console.</span><span style="color:#6F42C1;">error</span><span style="color:#24292E;">(e))</span></span>
<span class="line"><span style="color:#24292E;">    })</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre></div><p>这段代码首先监听 install 事件，在回调函数中调用了 event.waitUntil() 函数并传入了一个 Promise 对象。event.waitUntil 用来监听多个异步操作，包括缓存打开和添加缓存路径。如果其中一个操作失败，则整个 ServiceWorker 启动失败。</p><p>然后监听了 fetch 事件，在回调函数内部调用了函数 event.respondWith() 并传入了一个 Promise 对象，当捕获到 fetch 请求时，会直接返回 event.respondWith 函数中 Promise 对象的结果。</p><p>在这个 Promise 对象中，我们通过 caches.match 来和当前请求对象进行匹配，如果匹配上则直接返回匹配的缓存结果，否则返回该请求结果并缓存。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>缓存是解决性能问题的重要手段，使用缓存的好处很多，除了能让浏览器更快地加载网络资源之外，还会带来其他好处，比如节省网络流量和带宽，以及减少服务端的负担。</p><p>本课时介绍了 HTTP 缓存策略及 ServiceWorker，HTTP 缓存可以分为强制缓存和协商缓存，强制缓存就是在缓存有效期内直接使用浏览器缓存；协商缓存则需要先询问服务端资源是否发生改变，如果未改变再使用浏览器缓存。</p><p>ServiceWorker 可以用来实现离线缓存，主要实现原理是拦截浏览器请求并返回缓存的资源文件。</p><p>最后布置一道思考题：如果要让浏览器不缓存资源，你有哪些实现方式？</p>`,17);function u(_,v,C,A,f,k){const a=e("Image");return t(),r("div",null,[E,i,y,p(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/31/4D/CgqCHl8MKQyAOi4qAAAqnHUKGOQ421.png"}),s(),d,p(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/31/42/Ciqc1F8MKRaAVJdKAAAsNYhLc68530.png"}),s(),h,p(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/31/42/Ciqc1F8MKT-AbvemAAAGfctSoow363.png"}),s(),g,p(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/31/43/Ciqc1F8MKYGAMRqhAACGt0bNhOM842.png"}),s(),F])}const B=o(c,[["render",u]]);export{T as __pageData,B as default};
