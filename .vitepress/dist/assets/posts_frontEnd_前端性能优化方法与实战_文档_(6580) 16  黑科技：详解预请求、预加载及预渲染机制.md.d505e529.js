import{_ as e,j as p,o,h as r,k as s,f as _,Q as t}from"./chunks/framework.d3daa342.js";const N=JSON.parse('{"title":"16黑科技：详解预请求、预加载及预渲染机制","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/前端性能优化方法与实战_文档/(6580) 16  黑科技：详解预请求、预加载及预渲染机制.md","filePath":"posts/frontEnd/前端性能优化方法与实战_文档/(6580) 16  黑科技：详解预请求、预加载及预渲染机制.md","lastUpdated":1696682708000}'),n={name:"posts/frontEnd/前端性能优化方法与实战_文档/(6580) 16  黑科技：详解预请求、预加载及预渲染机制.md"},i=t('<h1 id="_16黑科技-详解预请求、预加载及预渲染机制" tabindex="-1">16黑科技：详解预请求、预加载及预渲染机制 <a class="header-anchor" href="#_16黑科技-详解预请求、预加载及预渲染机制" aria-label="Permalink to &quot;16黑科技：详解预请求、预加载及预渲染机制&quot;">​</a></h1><p>前面好几讲我介绍过怎么进行首屏时间优化，但其实在性能影响因素里，后端接口的耗时也不可忽略。</p><p>以某电商 App 列表页为例，后端接口返回数据需要 200ms，参考首屏秒开的标准，它就占了 20% 的时间。在以前我一直采用的是缓存或者静态化的方案去解决，能不请求实时数据就不请求，用历史数据去代替。</p><p>直到有一天，我遇到了机票和酒店相关的业务，因为它们的价格和库存会实时变化，如果页面打开时间长（首屏时间过长），用户会担心买不到合适的机票，转而离开去往竞品购买（机票和酒店类产品的留存率很低，用户忠诚度有限）。为了避免这种情况，我必须实时拉取后端接口，做到极致秒开。但具体怎么解决呢？我一直没想好，直到 19 年才有了解决方案。</p><p>那就是采用<strong>预请求、预加载和预渲染</strong>的方式来解决问题。所谓预请求，就是对后端请求参数的事先拼装，预加载是指对后端数据接口的提前加载，预渲染则是对要渲染页面预先进行渲染。接下来我就为你详细介绍下它们，希望对你有所帮助。</p><h3 id="预请求" tabindex="-1">预请求 <a class="header-anchor" href="#预请求" aria-label="Permalink to &quot;预请求&quot;">​</a></h3><p>想要通过拉取后端接口来降低首屏时间，我们需要先实现接口的预加载。而实现它要先解决预请求的逻辑，也就是统一拼装请求参数的逻辑。</p><p>具体怎么进行统一拼参呢？这就涉及前端正常的数据请求过程了。</p><p>以机票业务为例，我们进入列表页后，输入出发地和目的地后，比如从北京到深圳，选择日期为 2021-06-06，前端应用通过解析页面 URL 路径，拿到所需的一些参数（如 from=shanghai&amp;to=beijing&amp;date=20210606），然后调用 Native 的 schema 进入参数解析环节，找到 Native 对应的协议和参数（如://search？terminal=app），然后再通过参数初始化，拼装成对应的参数（如://search?terminal=app&amp;from=shanghai&amp;to=beijing&amp;date=20210606）。</p><p>如果预请求走上述流程的话，面临的一个问题是，没有预请求的页面 URL 参数，也没法通过 Native 获取到。这需要自己根据逻辑拼装，所以往往会单独做出一套流程，结果就是不但容易出错，还会因为需要用类似两份代码去实现这个功能，反过来拉长页面的首屏时间。所以，我们使用了同样的流程，将预请求封装成<strong>preReq 功能</strong>，把所有的功能都包括起来，用同一份代码实现。</p><p>在做完这个统一拼参逻辑后，预请求实现起来就容易了。具体来说，如果你已经使用了 Native 统一请求，直接走客户端逻辑发送即可。如果还没有走 Native 统一请求，</p><p>我们可以借助<strong>Axios 库函数</strong>来完成。</p><p>第一步，我们需要封装一下 Axios 库函数，在 post 和 get 之前，通过添加一个钩子函数 BeforeFetch，对 URL 参数进行解析和 Native 参数补全。</p><p>第二步，业务侧使用与请求时，因为 Axios 库是整体打包引入的，所以使用时，可以直接使用 Axios.fetch 方法来实现预请求功能。</p><h3 id="预加载" tabindex="-1">预加载 <a class="header-anchor" href="#预加载" aria-label="Permalink to &quot;预加载&quot;">​</a></h3><p>在完成预请求参数拼装之后，紧接着就是预加载逻辑了。首先是要<strong>把握预加载的时机</strong>。以机票列表页为例，我们需要判断用户操作的特定路径。如果用户操作命中了这个特定路径，就会做预加载，去请求列表页的接口。</p><p>这个路径是我们和后端的一个约定，有具体的编号，比如用户&quot;进入首页&quot;编号是 0，&quot;输入出发地和目的地&quot;操作路径是 1，&quot;输入日期&quot;操作路径是 2，&quot;切换关键词&quot;是 3，点击&quot;我的位置&quot;是 4。</p><p>后端在用户进入列表页时，以接口的方式返回一个操作路径的数组，当用户的操作路径命中这个数组后，比如 [1,2,3]，意思是用户从首页进入，选择了出发地和目的地，并且输入了日期，接下来开始进行预加载。</p><p>当用户点击&quot;开始搜索&quot;后，前端应用就会去判断有没有预加载下级页面（搜索页面）的接口，是否有搜索页的预加载数据，而且这个数据又没有过期，就直接跳转下级页；如果没有可用的预加载数据，此时我们进行一次搜索页的预加载，减少从列表页到搜索页的跳转时间和搜索页的初始化时间。</p><p>预加载是怎么实现的呢？如果 Native 已经提供这个功能，我们直接使用 Native 的预加载接口即可。反之，我们还是需要扩展 Axios 库函数来实现。</p><p>具体来说，在 Axios 进行数据请求后，封装一个 afterFetch 的钩子方法，负责将加载完成的数据存储到本地，供下一个路由使用。这就完成了预加载。当业务侧使用时，先在 aftereFetch 钩子里面定义好取到数据后做什么，然后直接使用 fetch 方法即可。</p><p>比如手机列表页，有一个场景是提前获取下一页的数据做排版，数据预加载完成后，在 afterFetch 里面就会将这些数据存储到内存中。</p><p>需要注意的是，<strong>即便是预加载，也要做好缓存处理。</strong> 我们要先在内存里面 check 一下是否存在之前预加载的数据。有的话，直接用预加载数据，做后续操作，如果没有，就继续走预加载逻辑，然后设置缓存数据。</p><h3 id="预渲染" tabindex="-1">预渲染 <a class="header-anchor" href="#预渲染" aria-label="Permalink to &quot;预渲染&quot;">​</a></h3><p>预渲染是指在用户访问这个页面之前，完成页面渲染的准备。还是以机票列表页为例，比如说用户命中特定路径的时候，前端进行判断并会把搜索结果页先渲染出来，只不过在列表页可视区域下方，用户是不可见的。</p><p>当用户点击开始搜索时，前端会去 check，如果已经有了预渲染的页面，只需要把页面显示出来的操作， push 到顶层即可。这样就省去了初始化页面、请求数据和渲染的时间。</p><p>具体怎么实现呢？这就需要用到 <strong>&quot;客户端&quot;渲染技术</strong>了。你看我在这里加了个引号，其实就是说，它有别于 CSR，而是 NSR（Native side rendering，客户端渲染），即通过客户端（Native 侧）进行页面结构拼接，进而实现页面渲染的处理技术。具体见下图所示。</p>',27),c=t('<p>NSR 优化时，需要离线包提供模板等资源（如 HTML、JS、CSS ），预加载提供数据，把页面作为数据经过模板函数变化后产生的结果，然后通过 v8 引擎在客户端渲染出来。</p><p>NSR 是怎么实现的呢？</p><p>首先是模板和数据的准备，用户点击页面链接进入后，这个页面的所有资源是准备好的。具体可以使用前面几讲提到的离线包，以及预请求和预加载方案来做。</p><p>其次，由于页面是动态的而 URL 是静态的，需要实现一种页面与模版的映射机制，一般为多对一，这个机制有助于 Native 快速定位到所需模版。</p><p>最后，在 Native 侧实现一种类似前文 SSR 方案的 Native 本地渲染服务。</p><p>实现完 NSR 之后，业务就可以使用预渲染功能了。在使用时，前端代码不需要做什么改动，业务侧前端工程师接入 NSR，把后置流程准备好就可以了。所谓的后置流程，就是指渲染好下级页面后放置在可视区域之外。</p><p>这里需要注意的一个点是，NSR 是在端内渲染的场景，如果是端外怎么办呢？端外就是纯前端的渲染了，下面以我曾经做过的一个案例和你介绍下。</p><p>当时，公司有个文档内容展现平台，在对文档进行展现时，需要用到虚拟页，即要展示的文档的页码会根据页面内容动态变化，比如在电脑上是展示 1000 字/页，到手机上变成了 120 字/页。这样同一篇文档，在不同平台上显示，需要切割分页，但该操作需要一定的时间。</p><p>所以最好的办法是，<strong>当展示第 1 页的时候，就预先渲染第 3 页的内容</strong>。具体怎么实现呢？我们是这么做的，在展示第 T 页的时候，在可视范围之外，做 T+2 页的数据切割，切割完进行渲染，渲染完成后放在原地，等点击第 T+2 页时，移动回来。</p><p>预渲染，有时会遇到内存问题，我们可以精简预渲染的内容，比如一些图片资源，可以延后获取。</p><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3><p>好了，以上就是预请求、预加载及预渲染相关的内容。在实际当中，你可能会遇到预加载和预渲染需要降级的问题，比如没有拿到数据的兜底兼容流程，可以继续使用 CSR，同时如果在端外无法使用离线包，则使用 SSR 是一种很好的替代方案。</p><p>下面为你留一个思考题：</p><blockquote><p>预请求、预加载和预渲染，你在哪些业务场景中可以用到？</p></blockquote><p>欢迎在评论区和我交流，下一讲我讲介绍百度、阿里云、美团性能方案对比。</p>',15);function h(d,l,u,m,g,q){const a=p("Image");return o(),r("div",null,[i,s(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/37/18/Cgp9HWB1vGaACUSkAAEL_bYBv_I190.png"}),_(),c])}const S=e(n,[["render",h]]);export{N as __pageData,S as default};
