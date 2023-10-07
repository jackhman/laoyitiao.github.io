import{_ as i,j as o,o as s,g as r,k as p,h as t,s as a,Q as l}from"./chunks/framework.4e7d56ce.js";const A=JSON.parse('{"title":"04性能优化：借助微信开发者工具提升小程序性能","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5097) 04  性能优化：借助微信开发者工具提升小程序性能.md","filePath":"posts/frontEnd/103-云原生微信小程序开发实战文档/(5097) 04  性能优化：借助微信开发者工具提升小程序性能.md","lastUpdated":1696417798000}'),n={name:"posts/frontEnd/103-云原生微信小程序开发实战文档/(5097) 04  性能优化：借助微信开发者工具提升小程序性能.md"},_=a("h1",{id:"_04性能优化-借助微信开发者工具提升小程序性能",tabindex:"-1"},[t("04性能优化：借助微信开发者工具提升小程序性能 "),a("a",{class:"header-anchor",href:"#_04性能优化-借助微信开发者工具提升小程序性能","aria-label":'Permalink to "04性能优化：借助微信开发者工具提升小程序性能"'},"​")],-1),c=a("p",null,"你好，我是周俊鹏。",-1),h=a("p",null,"前几节课我们分别从架构层（双线程模型）、链路层（授权模型）、和应用层（自定义组件）三个角度学习了小程序的技术要点。它们能帮你完成一个微信小程序的基本业务逻辑和交互逻辑。",-1),d=a("p",null,[t("逻辑的第一诉求必然是支撑功能，对于端侧应用来说，功能是一方面，功能之外的用户体验也至关重要，良好的体验能加强用户对于应用的认同甚至依赖。小程序作为一种端侧应用，与其他应用端（ Web/App ）一样需要关注用户体验。用户体验有两个核心的要素：一是设计；二是性能。"),a("strong",null,"作为技术研发，我们关注的重点在于如何提升小程序的性能。")],-1),u=a("p",null,"在我看来，掌握底层的技术原理能帮我们写出性能更好的代码，不过理论在转化为实践时往往不是非常直观，所以在掌握理论的同时学会利用工具更为重要。",-1),T=a("p",null,[t("今天我就结合微信开发者工具（简称微信 IDE）提供的小程序评分功能，"),a("strong",null,"来讲解一款高性能小程序背后的优化技巧。")],-1),D=a("p",null,"微信 IDE 的小程序评分功能位于调试器-> Audits 面板中：",-1),g=l('<p>点击&quot;运行&quot;之后，微信 IDE 会对当前的小程序项目进行评测（包括代码层面的检测、通过记录用户交互行为的体验检测）。最终从性能、体验和最佳实践三个维度分别打分以及综合分：</p><ul><li><p>性能评分是通过对页面渲染、网络、JS 脚本等方面的评估综合得来的；</p></li><li><p>体验评分是从设计和交互等方面的评估而来，由于设计和交互存在一定的主观因素，所以体验的评分权当建议；</p></li><li><p>最佳实践涉及的方面更宽泛，除了代码编写方面的建议（比如 01 讲我们提到尽量减少或聚合 setData 的调用），还有安全（比如尽量使用 HTTPS 增强安全性）和用户体验（比如适配不同宽度的屏幕）方面的建议。</p></li></ul><p>除了性能评分外，微信 IDE 给出的最佳实践方案中也有一部分与性能相关。接下来我就提取所有和性能相关的部分，剖分小程序性能优化的一些具体措施（用户体验跟这节课无关，我就不讲了）。</p><h3 id="小程序性能优化的具体维度" tabindex="-1">小程序性能优化的具体维度 <a class="header-anchor" href="#小程序性能优化的具体维度" aria-label="Permalink to &quot;小程序性能优化的具体维度&quot;">​</a></h3><p>微信 IDE 对小程序性能进行评分有以下几个维度（微信 IDE 的截图比较大，字体也比较小，所以我就不放截图了）：</p><ol><li><p>避免过大的 WXML 节点数目</p></li><li><p>避免执行脚本的耗时过长的情况</p></li><li><p>避免首屏时间太长的情况</p></li><li><p>避免渲染界面的耗时过长的情况</p></li><li><p>对网络请求做必要的缓存以避免多余的请求</p></li><li><p>所有请求的耗时不应太久</p></li><li><p>避免 setData 的调用过于频繁</p></li><li><p>避免 setData 的数据过大</p></li><li><p>避免短时间内发起太多的图片请求</p></li><li><p>避免短时间内发起太多的请求</p></li></ol><p>其实这 10 个性能的评分标准并不仅仅适用于微信小程序，有几条（2~6、9和10）是前端开发领域的通用性能指标，而且如果你用过 Vue/React 之类的MVVM 框架，以上指标可以全部应用到基于 Vue/React 框架开发的 Web 应用程序中。<strong>接下来我们一条条地剖析这几个指标对于性能优化的意义以及对应的解决方案。</strong></p><p>当然了，有些条目的优化方向是一致的（比如 7 和 8 是为了提高渲染性能），在剖析过程中我们会进行必要的聚合，这样更利于从全局的角度了解这些性能评分标准之间的关联。</p><h3 id="避免过大的-wxml-节点数目" tabindex="-1">避免过大的 WXML 节点数目 <a class="header-anchor" href="#避免过大的-wxml-节点数目" aria-label="Permalink to &quot;避免过大的 WXML 节点数目&quot;">​</a></h3><p>WXML 是基于 HTML 的一种 DSL（Domain Specific Language，领域专属语言），除了原生组件（比如 Camera 相机组件）以外，常规组件最终会被小程序的渲染线程（还记得 01 讲的渲染线程是什么吗？不记得的话要及时复习。）通过 WebView 渲染为 HTML ，所以从性能优化的角度上，HTML 的大部分性能优化方案均适用于 WXML，<strong>尽量减少节点数目就是方案之一。</strong></p><p>节点数目会影响渲染性能，要理解这句话，你要对浏览器的渲染流程有大概了解，来看下面这张图：</p>',11),M=l('<p>HTML 是 XML 的变体，在渲染的时候首先会被浏览器内核解析为 DOM 树，这是一种树形结构，然后会解析每个节点标签的类型、属性等要素，最后与 JavaScript 脚本和 CSS 结合起来进而在经过布局和绘制完成整个渲染流程。</p><p>理论上 HTML 的节点数目和深度是没有限制的，但是从浏览器的渲染流程中不难看出，DOM 树的结构越复杂，渲染的管线就会越慢。我们再回想一下 01 讲的内容，当渲染线程执行的同时，逻辑线程是被阻塞的，也就是说如果渲染线程长时间占用了队列，这期间浏览器处于无法响应用户交互行为的&quot;假死&quot;状态，这对于用户体验是致命的。</p><p>降低节点数目对于性能优化的另外一个原因，是与小程序 /Vue/React 这种 MVVM 框架的 DOM更新机制有关。这类框架在更新 UI 时不直接操作 DOM ，而是使用 VDOM（ Virtual DOM，虚拟 DOM ）技术来实现，VDOM 的高性能来源于高效的 Diff 算法，在内存中对 VDOM 树结构进行对比后提取差异点再映射到真实 DOM 中。</p><p>而你不用关注 Diff 算法的细节，只需要知道它是基于树这种数据结构进行的，而树结构的复杂度会直接影响算法的执行耗时。所以如果你的小程序节点数目过多或者层次太深，那么在调用setData 更新 UI 时就会给 CPU 和内存过多的压力，进而可能造成小程序的假死。</p><h3 id="避免执行脚本的耗时过长" tabindex="-1">避免执行脚本的耗时过长 <a class="header-anchor" href="#避免执行脚本的耗时过长" aria-label="Permalink to &quot;避免执行脚本的耗时过长&quot;">​</a></h3><p>执行脚本的耗时过长对于性能的不良影响主要体现在两个时期：</p><ul><li><p>第一是在小程序加载完成后的首次渲染期间；</p></li><li><p>第二是小程序运行过程中的处理用户交互时期。</p></li></ul><p>JavaScript 脚本对小程序首次渲染的影响与浏览器环境下 <code>&lt;script&gt;</code> 标签对 HTML 渲染的影响类似，虽然小程序中不允许使用 <code>&lt;script&gt;</code> 标签，双线程模型下 JavaScript 脚本也并不会完全阻塞 UI 线程的行为，但是逻辑线程执行 JavaScript 代码时仍旧是单线程的，通过任务队列管理代码的有序执行。如果某一段 JavaScript 代码逻辑占时太长，造成任务队列过长，最终会影响小程序在响应用户交互行为上的长延时或卡顿。</p><h3 id="避免首屏时间太长" tabindex="-1">避免首屏时间太长 <a class="header-anchor" href="#避免首屏时间太长" aria-label="Permalink to &quot;避免首屏时间太长&quot;">​</a></h3><p>加快首屏的加载时间是前端开发领域最核心的目标之一，从用户打开 Web 网站或小程序的时刻为计时起点，屏幕内容渲染完成为计时终点，起终点之间的时长即为首屏时间。</p><p>影响首屏时间的因素非常多（比如 DNS 解析耗时、TCP 链接的建立耗时......）对于小程序开发者来说，有些因素是不可控的（比如 DNS 解析），那么在可控的众多因素当中，最核心的两个优化方向是：</p><ul><li><p>代码优化；</p></li><li><p>网络优化。</p></li></ul><p>代码方向的优化措施重点关注这样几点：</p><ul><li><p>降低 WXML 的结构复杂度，比如节点个数和深度；</p></li><li><p>降低首次渲染的数据规模，首次渲染只包含核心数据，非核心数据的渲染可推迟到首屏渲染完成之后进行；</p></li><li><p>从设计和交互的角度出发，在实际内容被渲染之前展示友好的 loading 效果。</p></li></ul><p>而网络方向的优化核心是为了降低 RTT（ Road-Trip Time，往返时延），也就是微信 IDE 给出的&quot;6.所有请求的耗时不应太多&quot;这条建议。由于小程序的所有资源均托放在微信的服务器，所以不存在 CDN 和 DNS 优化问题，对于开发者来说，降低 RTT 最有效的两个措施是：</p><ul><li><p>减少网络请求所携带的数据体积，<strong>这是最直观的网络优化方案；</strong></p></li><li><p>提高服务器处理网络请求的速度，这一点是对服务端的要求，除了服务端代码本身的性能以外，当用户量上升到一定规模之后，还需要服务器有处理高并发的能力。对于专注于端侧的传统前端和小程序开发者来说，这些知识是相对陌生的，往往需要后端的同学配合完成。这也是云开发相较于传统开发模式的主要优势之一，使用云开发可以让端侧的开发者也能够开发出弹性伸缩、高并发、高 QPS 处理的服务层（更多云开发相关的内容我会在模块四详细讲解，这里就不多说了）。</p></li></ul><h3 id="避免渲染界面的耗时过长的情况" tabindex="-1">避免渲染界面的耗时过长的情况 <a class="header-anchor" href="#避免渲染界面的耗时过长的情况" aria-label="Permalink to &quot;避免渲染界面的耗时过长的情况&quot;">​</a></h3><p>这是一条综合性能指标，渲染主要包括两个角度：一是首屏的渲染时间（上一条讲过了）；二是小程序运行期间的界面更新所需的渲染时间，我们不妨称之为动态渲染。</p><p>动态渲染是由 JavaScript 脚本中调用 setData 更新数据所触发，所以优化动态渲染的切入点便一目了然：优化 setData。<strong>至于具体的优化方案，便是微信 IDE 给出的两点建议：</strong></p><ul><li><p><strong>避免 setData 的调用过于频繁</strong>。频繁调用 setData 会造成逻辑线程与渲染线程之间过多的通信，01讲我们提到双线程之间的通行需要借助微信原生平台作转发，中间必然是有一定的性能损耗和时延。除此之外，渲染线程在接收到逻辑线程传递的数据之后，需要进行解析、VDOM 对比、更新 UI 等一套管线流程，在前一条流程执行完结之前，后面的数据只能排队等待执行。所以频繁调用 setData 就会造成队列加长，用户交互行为触发的 UI 更新就会缓慢甚至可能由于计算量太大造成卡顿。</p></li><li><p><strong>避免 setData 的数据量太大</strong>。频繁调用 setData 会造成队列中的任务太多，而如果 setData 的数据量太大，则会造成单个任务的处理耗时加长。与上一条相比，一个是任务数量过多，一个是单个任务过重，两者最终对于性能产生的负面影响是一致的。此外，由于双线程之间需要借助微信原生平台转发，所以 setData 数据量过大也会造成通信时延的加长。</p></li></ul><h3 id="对网络请求做必要的缓存以避免多余的请求" tabindex="-1">对网络请求做必要的缓存以避免多余的请求 <a class="header-anchor" href="#对网络请求做必要的缓存以避免多余的请求" aria-label="Permalink to &quot;对网络请求做必要的缓存以避免多余的请求&quot;">​</a></h3><p>小程序的资源文件托管在微信的服务器，所以小程序开发者不需要关注前端开发领域中对于静态资源的 HTTP 缓存策略，这件事情微信会帮助开发者完成。</p><p>这一条建议所指的是在代码层面，将部分重复使用的网络请求结果在代码或 storage 中进行合理缓存以实现复用，对于使用同一个网络请求结果的代码可以直接从缓存中读取，进而减少了不必要的网络请求个数。每次网络请求不论时间长短，均需要用户等待，减少网络请求的个数相当于减少了用户等待时间，提升了用户体验。</p><h3 id="避免短时间内发起太多的图片请求" tabindex="-1">避免短时间内发起太多的图片请求 <a class="header-anchor" href="#避免短时间内发起太多的图片请求" aria-label="Permalink to &quot;避免短时间内发起太多的图片请求&quot;">​</a></h3><p>这一条与微信 IDE 给出的另一条建议&quot;10.避免短时间内发起太多的请求&quot;的方向是一致的，均是为了解决过多 HTTP 请求造成用户等待时间过长的问题。图片资源相对特殊的一个特点是体积较大，前端领域最早的懒加载方案便是主要针对图片资源，所以图片资源的请求对性能的影响更加直观一些。</p><p>目前前端和小程序领域中使用的仍旧是 HTTP 1.1 协议，一个 TCP 链接同时只能处理一个 HTTP 请求，在前一个请求得到服务器的响应之后才会发起第二个请求，如果同一时间的 HTTP 请求太多就会产生排队。</p><p>浏览器为了应对这种问题，提供了建立多个 TCP 连接以实现并行发送 HTTP 请求的目的，目前市面上的浏览器最多支持同时建立 4~8 个 TCP 连接。也就是说，最多可以同时处理 4~8 个HTTP 请求。如果同一时刻需要发送的 HTTP 请求数量远大于这个数字，那么还是会产生排队。前面的内容我们重复地提到了&quot;排队&quot;一词，不论是线程间的通信排队、任务队列的排队、还是 HTTP 请求的排队，这些行为都是需要用户等待的，对于用户的切身体验来说，便是响应缓慢甚至卡顿。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>通过以上内容我们不难看出来，微信 IDE 的体验评分功能给出的性能优化方案跟 Web 应用的性能优化方案大同小异，尤其是使用 Vue/React 这类 MVVM 框架的 Web 应用。</p><p>微信 IDE 给出的这些建议能够很好地帮助我们写出性能更好的小程序代码以及搭建高性能的前后端架构，不过现实中小程序的业务类型多种多样，这些性能优化的方案也只是从单纯的技术角度出发，对于不同类型的业务来说，通常会有一些专属的优化措施，比如视频类小程序的分片加载、游戏类小程序的 canvas 优化等等。所以今天的课后作业便是：结合你以前做过的小程序项目类型，想一想有没有对应的专属性能优化方案。</p><p>截止到这节课，模块一的内容便完结了，这个模块的内容偏底层，了解这些底层知识能够帮助你写出更好的代码。模块二我们将从效率提升的角度，讲解如果将小程序的开发模式从小作坊迈向工程化，共同期待吧。</p>',31);function m(P,q,f,b,V,I){const e=o("Image");return s(),r("div",null,[_,c,h,d,u,p(e,{alt:"4.png",src:"https://s0.lgstatic.com/i/image/M00/6E/53/Ciqc1F-yNMaAGeflAAVGwcThXbI554.png"}),t(),T,D,p(e,{alt:"０４－１.png",src:"https://s0.lgstatic.com/i/image/M00/6A/4B/CgqCHl-o7p-AQ1gXAAB4MhMwqpI695.png"}),t(),g,p(e,{alt:"Lark20201109-152322.png",src:"https://s0.lgstatic.com/i/image/M00/6A/4C/CgqCHl-o7t2AEQOZAAB-9ujUsNY209.png"}),t(),M])}const C=i(n,[["render",m]]);export{A as __pageData,C as default};
