import{_ as p,j as r,o as n,g as s,k as o,h as a,Q as l,s as e}from"./chunks/framework.4e7d56ce.js";const k=JSON.parse('{"title":"02性能瓶颈点：从URL输入到页面加载整过程分析","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/前端性能优化方法与实战_文档/(6539) 02  性能瓶颈点：从 URL 输入到页面加载整过程分析.md","filePath":"posts/frontEnd/前端性能优化方法与实战_文档/(6539) 02  性能瓶颈点：从 URL 输入到页面加载整过程分析.md","lastUpdated":1696417798000}'),i={name:"posts/frontEnd/前端性能优化方法与实战_文档/(6539) 02  性能瓶颈点：从 URL 输入到页面加载整过程分析.md"},c=l('<h1 id="_02性能瓶颈点-从url输入到页面加载整过程分析" tabindex="-1">02性能瓶颈点：从URL输入到页面加载整过程分析 <a class="header-anchor" href="#_02性能瓶颈点-从url输入到页面加载整过程分析" aria-label="Permalink to &quot;02性能瓶颈点：从URL输入到页面加载整过程分析&quot;">​</a></h1><p>在工作当中不知道你有没有遇到这样的情况，团队对首屏时间的要求是 1200ms，目前首屏时间长达 2s，离要求还有不小的差距。为此，你精简了首屏内容，合并了请求资源，对图片尺寸也进行了压缩优化，但最后的首屏时间还是没有降下来。为什么？</p><p>实际上，想要对 Web 前端进行性能优化，除了了解性能体系、关键性能指标之外，还需要了解页面加载全过程。通过这个过程，我们可以找到其中影响性能的关键点、瓶颈点，接下来才好有的放矢。</p><p>那，页面加载大致过程是怎样的呢？</p><p>我们可以假设一个人正在上网，当他在浏览器输入 URL 并回车后，为了把 URL 解析为 IP 地址，浏览器会向 DNS 服务器发起 DNS 查询，获取 IP 地址。然后浏览器通过 IP 地址找到目标服务器，发起 TCP 三次握手和 TLS 协商，从而建立起 TCP 连接。</p><p>在建立连接后，浏览器就可以发起 HTTP 请求，而服务端接收到后，对请求进行响应。浏览器从响应结果中拿到数据，并进行解析和渲染，最后在用户面前就出现了一个网页。</p><p>以上的整个过程大致可以分为三个阶段：客户端发起请求阶段、服务端数据处理请求阶段、客户端页面渲染阶段。下面我就根据这三个阶段来和你介绍下 Web 前端都有哪些性能瓶颈点。</p><h3 id="客户端请求阶段的瓶颈点" tabindex="-1">客户端请求阶段的瓶颈点 <a class="header-anchor" href="#客户端请求阶段的瓶颈点" aria-label="Permalink to &quot;客户端请求阶段的瓶颈点&quot;">​</a></h3><p>客户端发起请求阶段，是指用户在浏览器输入 URL，经过本地缓存确认是否已经存在这个网站，如果没有，接着会由 DNS 查询从域名服务器获取这个 IP 地址，接下来就是客户端通过 TCP 的三次握手和TLS协商向服务器发起 HTTP 请求建立连接的过程。</p><p>在这个过程中，本地缓存、DNS查询、HTTP 请求很容易成为影响前端性能的瓶颈点。</p><h4 id="本地缓存" tabindex="-1">本地缓存 <a class="header-anchor" href="#本地缓存" aria-label="Permalink to &quot;本地缓存&quot;">​</a></h4><p>为什么说本地缓存会成为前端性能的瓶颈点之一呢？</p><p>我们知道，本地缓存可以让静态资源加载更快，当客户端发起一个请求时，静态资源可以直接从客户端中获取，不需要再向服务器请求。而想要让本地缓存发挥这个作用，就需要先在服务器上进行配置。</p><p>但在实际当中，许多前端同学往往会忽视这点。这会出现一个什么情况呢？</p><p>以 58 同城的列表页项目为例，在客户端请求阶段，DNS 查询时间大概是 385 ms，TCP 三次握手及 TLS 协商时间 436 ms，数据返回 412 ms。一个请求下来大约是 1233 ms，这还是强网（WIFI/4G）情况下。如果是弱网（3G/2G）情况，一个请求连接都需要 2s 。但使用缓存的话，几乎可以说是几毫秒内完成请求，对比非常明显。</p><p>怎么实现本地缓存呢？</p><p>本地缓存一般包括强缓存和协商缓存两种形式。</p><p>强缓存是指浏览器在加载资源时，根据请求头的 expires 和 cache-control 判断是否命中客户端缓存。如果命中，则直接从缓存读取资源，不会发请求到服务器，反之还需要走完整的资源请求流程。</p><p>协商缓存是指，浏览器会先发送一个请求到服务器，通过 last-modified 和 etag 验证资源是否命中客户端缓存。如果命中，服务器会将这个请求返回，但不会返回这个资源的数据，依然是从缓存中读取资源。 如果没有命中，无论是资源过期或者没有相关资源，都需要向服务器发起请求，等待服务器返回这个资源。</p><h4 id="dns-查询" tabindex="-1">DNS 查询 <a class="header-anchor" href="#dns-查询" aria-label="Permalink to &quot;DNS 查询&quot;">​</a></h4><p>DNS 之所以会成为前端性能瓶颈点，是因为每进行一次 DNS 查询，都要经历从手机到移动信号塔，再到认证 DNS 服务器的过程。这中间需要很长的时间。但用户是不想等待的。</p><p>想要节省时间，一个办法就是让 DNS 查询走缓存。幸好浏览器提供了 DNS 预获取的接口，我们可以在打开浏览器或者 WebView 的同时就进行配置。这样真正请求时，DNS 域名解析可以检查一下浏览器缓存，一旦缓存命中，就不需要去 DNS 服务器查询了。</p><h4 id="http-请求" tabindex="-1">HTTP 请求 <a class="header-anchor" href="#http-请求" aria-label="Permalink to &quot;HTTP 请求&quot;">​</a></h4><p>在 HTTP 请求阶段，最大的瓶颈点来源于请求阻塞。所谓请求阻塞，就是浏览器为保证访问速度，会默认对同一域下的资源保持一定的连接数，请求过多就会进行阻塞。</p><p>那么，浏览器同域名的连接数限制是多少呢？一般是 6 个。如果当前请求书多于 6 个，只能 6 个并发，其余的得等最先返回的请求后，才能做下一次请求。</p><p>所以我们在项目之初，做一些域名规划很重要。我们可以先看看当前页面需要用到哪些域名，最关键的首屏中需要用到哪些域名，规划一下这些域名发送的顺序。</p><p>除了域名规划，为了解决同域名下的阻塞问题，还可以做域名散列，通过不同的域名，增加请求并行连接数。常见做法是，将静态服务器地址 pic.google.com，做成支持 pic0-5 的 6 个域名，每次请求时随机选一个域名地址进行请求。因为有 6 个域名同时可用，最多可以并行 36 个连接。当然，这个域名个数不是越多越好，太分散的话，又会涉及多域名之间无法缓存的问题。</p><h3 id="服务端数据处理阶段的瓶颈点" tabindex="-1">服务端数据处理阶段的瓶颈点 <a class="header-anchor" href="#服务端数据处理阶段的瓶颈点" aria-label="Permalink to &quot;服务端数据处理阶段的瓶颈点&quot;">​</a></h3><p>服务端数据处理阶段，是指 WebServer 接收到请求后，从数据存储层取到数据，再返回给前端的过程。</p><p>具体来说，服务端程序接收到 HTTP 请求后，会做一些请求参数处理以及权限校验。校验完成后，它会将请求参数发送到数据存储服务。然后服务端程序会从数据存储中取到数据，进行数据加工聚合处理，最后再通过 jsonp 或者 ajax 接口返回给前端。</p><p><strong>这个过程中的瓶颈点，就在于是否做了数据缓存处理、是否做了 Gip 压缩，以及是否有重定向。</strong></p><p>其中，Gzip 压缩是一种压缩技术，服务器端通过使用 Gzip，传输到浏览器端的文本类资源（有别于图片等二进制等资源）的大小可以变为原来的 1/3 左右。因此通过 Gzip 压缩，资源的下载速度会快很多，能大大提升页面的展示速度。</p><p>因为多数情况下，运维团队都会默认开启 Gzip 压缩，所以在这里我就不展开介绍了，接下来我会重点介绍一下数据缓存和重定向，这两个瓶颈点。</p><h4 id="数据缓存" tabindex="-1">数据缓存 <a class="header-anchor" href="#数据缓存" aria-label="Permalink to &quot;数据缓存&quot;">​</a></h4><p>数据缓存分为两种：借助 Service Worker 的数据接口缓存、借助本地存储的接口缓存和CDN（Content Delivery Network，内容分发网络）</p><p>其中 Service Worker 是浏览器的一个高级属性，本质上是一个请求代理层，它存在的目的就是拦截和处理网络数据请求。如果没有 Service Worker，请求每次直接落到 WebServer 上，需要走一次后端数据存取链路的流程，这会延长页面打开时间。</p><p>借助本次存储的接口缓存是指，在一些对数据时效性要求不高的页面，第一次请求到数据后，程序将数据存储到本地存储（store 或者 localStorage、甚至客户端本身的存储），下一次请求的时候，先去缓存里面取将取数据，如果没有的话，再向服务器发起请求。</p><p>所谓 CDN，它的基本思路是，通过在网络各处放置节点服务器，构造一个智能虚拟网络，将用户的请求导向离用户最近的服务节点上</p><p>比如，一个深圳的用户想要访问京东电商首图的资源，如果没有使用 CDN ，图片服务器有可能在北京。但如果使用了CDN 的话，因为 CDN 的节点遍布全国，它就可以选择距离深圳最近的节点返回首图数据。</p><p>为什么数据缓存会成为性能瓶颈点呢？这是因为每请求一次数据接口，需要从客户端到后端服务器，再到更后端的数据存储层，一层一层返回数据，最后再给到客户端，耗时很长，如果能够减少一次这个请求，为首屏时间争取了宝贵的时间。</p><h4 id="重定向" tabindex="-1">重定向 <a class="header-anchor" href="#重定向" aria-label="Permalink to &quot;重定向&quot;">​</a></h4><p>前面我们介绍了数据缓存是如何影响性能的，接下来我们聊一下另外一个瓶颈点------页面重定向。</p><p>所谓重定向，是指网站资源（如表单，整个站点等）迁移到其他位置后，用户访问站点时，程序自动将用户请求从一个页面转移到另外一个页面的过程。</p><p>在服务端处理阶段，重定向分为三类：服务端发挥的302重定向，META 标签实现的重定向和前端 Javasript 通过window.location 实现的重定向。</p><p>它们都会引发新的 DNS 查询，导致新的 TCP 三次握手和 TLS 协商，以及产生新的 HTTP 请求。而这些都会导致请求过程中更多的时间，进而影响前端性能。所以重定向也是一个需要注意的性能瓶颈点，在优化的时候需要注意。</p><h3 id="页面解析和渲染阶段的瓶颈点" tabindex="-1">页面解析和渲染阶段的瓶颈点 <a class="header-anchor" href="#页面解析和渲染阶段的瓶颈点" aria-label="Permalink to &quot;页面解析和渲染阶段的瓶颈点&quot;">​</a></h3><p>在页面加载过程中，当前服务端对数据加工聚合处理后，客户端拿到数据，接下来就会进入解析和渲染阶段。</p><p>所谓解析，就是 HTML 解析器把页面内容转换为 DOM 树和 CSSOM树的过程。</p><p>什么叫 DOM 树呢？DOM 树全称为 Document Object Model 即文档对象模型，它描述了标签之间的层次和结构。HTML 解析器通过词法分析获得开始和结束标签，生成相应的节点和创建节点之间的父子关系结构，直到完成 DOM 树的创建。</p><p>而 CSSOM 树，即 CSS 对象模型。主要描述样式集的层次和结构，HTML 解析器遇到内联的 style 标签时，会触发 CSS 解析器对样式内容进行解析，与上面解析器解析 HTML 过程类似，CSS 解析器遍历其中每个规则，将 CSS 规则解析浏览器可解析和处理的样式集合，最终结合浏览器里面的默认样式，汇总形成具有父子关系的 CSSOM 树。</p><p>解析完后就是渲染。主线程会计算 DOM 节点的最终样式，生成布局树。布局树会记录参与页面布局的节点和样式。完成布局后，紧跟着就是绘制。绘制就是把各个节点绘制到屏幕上的过程，绘制结果以层的方式保存。当文档中各个部分以不同的层绘制时，相互重叠时，就必须进行合成，以确保他们可以以正确的顺序绘制和展示。</p><p>以上就是解析和渲染阶段，这个阶段流程环节多，逻辑复杂，瓶颈点也多，比如，DOM 树构建过程，CSSOM 树生成阶段，重排和重绘过程等。但因为篇幅所限，在这里我会重点介绍一下 DOM 树构建和布局两个环节的瓶颈点。</p><h4 id="构建-dom-树的瓶颈点" tabindex="-1">构建 DOM 树的瓶颈点 <a class="header-anchor" href="#构建-dom-树的瓶颈点" aria-label="Permalink to &quot;构建 DOM 树的瓶颈点&quot;">​</a></h4><p>解析器构建 DOM 树的过程中，有三点会严重影响前端性能。</p><p>一个是当 HTML 标签不满足 Web 语义化时，浏览器就需要更多时间去解析 DOM 标签的含义。特别解析器是对标签的容错，比如将 <code>&lt;br&gt;</code> 写成了 <code>&lt;/br&gt;</code>，又或者表格嵌套不标准，标签层次结构复杂等。遇到这些情况时，浏览器会进行语法纠错。这就会导致页面总的解析和渲染阶段需要更长的时间，严重影响页面展示性能。</p><p>另一个是 DOM 节点的数量越多，构建 DOM 树的时间就会变长，进而延长解析时间，拖慢页面展示速度。</p><p>最后一个是文档中包含<code>&lt;SCRIPT&gt;</code> 标签时的情况。因为无论是 DOM 或者 CSSOM 都可以被 JavaScript 所访问并修改，所以一旦在页面解析时遇到 <code>&lt;SCRIPT&gt;</code> 标签，DOM 的构造过程就会暂停，等待服务器请求脚本。在脚本加载完成后，还要等取回所有的 CSS 及完成 CSSOM 之后才继续执行。</p><p>这个过程中用户看到的是白色的屏幕。因此外部 <code>&lt;SCRIPT&gt;</code> 常被称为&quot;解析&quot;阶段的拦路虎。有时就因为解析过程中多了一个 <code>&lt;SCRIPT&gt;</code>，造成页面解析阶段从 200ms 变为 1s。</p><p>所以，外部脚本的加载时机一定要确定好，能够延迟加载就选用延迟加载。另外，我们可以通过使用 defer 和 async，告诉浏览器在等待脚本下载期间不阻止解析过程，这样做可以明显提升性能。</p><h4 id="布局中的瓶颈点" tabindex="-1">布局中的瓶颈点 <a class="header-anchor" href="#布局中的瓶颈点" aria-label="Permalink to &quot;布局中的瓶颈点&quot;">​</a></h4><p>在布局阶段，浏览器会根据样式解析器给出的样式规则，来计算某个元素需要占据的空间大小和屏幕中的位置（比如电商详情页一张 banner图片的高度、宽度和位置），借助结算结果，来进行布局。而主线程布局时，使用的是流模型的布局方式。所谓流模型，就是像水流一样，需要从左到右，从上到下遍历一遍所有元素。</p><p>假设我们在页面渲染过程运行时修改了一个元素的属性，比如在电商的商品详情页加入一条广告数据。这时布局阶段受到了影响。浏览器必须检查所有其他区域的元素，然后自动重排页面，受到影响的元素需要重新绘制，最后还得合成，相当于整个渲染流程再来了一遍。</p><p>除此之外，因为浏览器每次布局计算都要作用于整个 DOM，如果元素量大，计算出所有元素的位置和尺寸会花很长的时间。所以布局阶段很容易成为性能瓶颈点。</p><p>说一个我之前实际工作中遇到的布局问题。在做 58 列表页性能优化项目时，我们一开始布局的时候，并没有确定列表页图片的初始大小，只给定了一个基础的占位尺寸。这就导致了，当图片加载完毕后，主线程才知道了图片的大小，不得不重新进行布局计算，然后再次进行页面渲染，也就是重排或重绘，无疑这大大延长了页面展示时间。</p><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3>',65),h=e("p",null,"以上我们以页面加载的三个阶段简单介绍了前端性能展示会遇到哪些瓶颈点。",-1),d=e("p",null,"其实，页面加载全过程很复杂，内容也很多，在这里，我主要介绍了前端领域我们能改变的瓶颈点，还有其他方面，我没有提到。比如，偏硬件领域，像 GPU 绘图、操作系统 GUI 和 LCD 显示等瓶颈点；网络层和服务层，如拥塞预防、负载均衡和慢启动；还有一些页面解析和渲染的算法，如解析算法、标记化算法和树构建算法，等等。",-1),_=e("p",null,"如果你感谢兴趣也可以找找相关的资料。这里给你留一个问题：",-1),S=e("blockquote",null,[e("p",null,"现在很多业务在解决性能问题的时候都会采用节流和防抖的方案，那么它们到底是解决了页面加载哪个阶段的问题？")],-1),u=e("p",null,"欢迎你在评论区和我沟通。接下来一讲，我会以一个项目为例，利用性能体系和页面加载过程中的瓶颈点来和你介绍下如何解决实际性能问题。",-1),m=e("p",null,"[",-1),D=e("p",null,[a("]("),e("a",{href:"https://shenceyun.lagou.com/t/mka",target:"_blank",rel:"noreferrer"},"https://shenceyun.lagou.com/t/mka"),a(")")],-1),T=e("p",null,[e("strong",null,"《大前端高薪训练营》")],-1),P=e("p",null,[a("12 个月打磨，6 个月训练，优秀学员大厂内推，"),e("a",{href:"https://shenceyun.lagou.com/t/mka",target:"_blank",rel:"noreferrer"},"点击报名，高薪有你"),a("！")],-1);function b(C,M,g,f,q,N){const t=r("Image");return n(),s("div",null,[c,o(t,{alt:"2021223-162954.png",src:"https://s0.lgstatic.com/i/image6/M01/08/77/CioPOWA0xPKAOALhAADKgjRyLQo881.png"}),a(),h,d,_,S,u,m,o(t,{alt:"微信图片_20210218174704.png",src:"https://s0.lgstatic.com/i/image6/M00/05/7D/CioPOWAwzC2AW_ZLAAdqMM6w3z0058.png"}),a(),D,T,P])}const L=p(i,[["render",b]]);export{k as __pageData,L as default};
