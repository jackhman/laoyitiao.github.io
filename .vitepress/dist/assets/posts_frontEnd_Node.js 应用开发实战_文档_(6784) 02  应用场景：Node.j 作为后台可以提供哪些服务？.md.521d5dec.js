import{_ as n,j as r,o as l,g as i,k as e,h as o,s as t,Q as a}from"./chunks/framework.4e7d56ce.js";const K=JSON.parse('{"title":"服务分类 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Node.js 应用开发实战_文档/(6784) 02  应用场景：Node.j 作为后台可以提供哪些服务？.md","filePath":"posts/frontEnd/Node.js 应用开发实战_文档/(6784) 02  应用场景：Node.j 作为后台可以提供哪些服务？.md","lastUpdated":1696417798000}'),_={name:"posts/frontEnd/Node.js 应用开发实战_文档/(6784) 02  应用场景：Node.j 作为后台可以提供哪些服务？.md"},p=t("p",null,"目前 Node.js 最常被用作前端工程化，导致大家误解为 Node.js 只适合作前端工程化工具，而忽视了其作为后端服务的特性。导致很少在后端研发中考虑使用 Node.js，认为没有任何优势，比如适用场景较少、性能较差等。为了消除这种误解，本讲将介绍 Node.js 的特性，以及适合哪些后端应用场景。",-1),d=t("h3",{id:"服务分类",tabindex:"-1"},[o("服务分类 "),t("a",{class:"header-anchor",href:"#服务分类","aria-label":'Permalink to "服务分类"'},"​")],-1),c=t("p",null,"我们常听说的服务有 RESTful 和 RPC，但这都是架构设计规范。我们也可以从另外一个角度来分析后台服务，如图 1 所示。",-1),g=a('<p>图1 后台服务分类</p><p>以上分类并不能代表所有的服务，但是各个系统都或多或少包含这些服务。有些大型系统可能会比这复杂；有些小型系统可能没有这么多模块系统。</p><p>下面我们看下每个模块主要的工作是什么：</p><ul><li><p><strong>网关</strong>，处理请求转发和一些通用的逻辑，例如我们常见的 Nginx；</p></li><li><p><strong>业务网关</strong>，处理业务相关的逻辑，比如一些通用的协议转化、通用的鉴权处理，以及其他统一的业务安全处理等；</p></li><li><p><strong>运营系统</strong>，负责我们日常的运营活动或者运营系统；</p></li><li><p><strong>业务系统</strong>，负责我们核心的业务功能的系统；</p></li><li><p><strong>中台服务</strong>，负责一些通用 App 类的服务，比如配置下发、消息系统及用户反馈系统等；</p></li><li><p><strong>各类基础层</strong>，这些就是比较单一的核心后台服务，例如用户模块，这就需要根据不同业务设计不同的核心底层服务；</p></li><li><p>左侧的<strong>数据缓存和数据存储</strong>，则是相应的数据类的服务。</p></li></ul><p>在这些分层中，我们需要寻找网络 I/O 较多，但是 CPU 计算较少、业务复杂度高的服务，基于这点我们可以分析出 Node.js 应用在业务网关、中台服务及运营系统几个方面。接下来我们就分别从系统的业务场景及系统特性来分析为什么 Node.js 更合适。</p><h3 id="业务网关" tabindex="-1">业务网关 <a class="header-anchor" href="#业务网关" aria-label="Permalink to &quot;业务网关&quot;">​</a></h3><p>我们都了解 Nginx 作为负载均衡转发层，负责负载分发，那么业务网关又是什么呢？</p><p>可以这样考虑，比如我们后台管理系统有鉴权模块，以往都是在管理后台服务中增加一个鉴权的类，然后在统一路由处增加鉴权判断。而现在不仅仅是这个管理系统需要使用这个鉴权类，多个管理系统都需要这个鉴权类，这时你会考虑复制这个类到其他项目，又或者设计一个专门的服务来做鉴权，图 2 是一个转变的过程效果图。</p>',8),h=t("p",null,"图 2 业务网关的作用对比效果图",-1),u=t("p",null,"从上图我们可以看到，其实每个项目的鉴权都是相似的，没有必要在每个项目中维护一份通用的鉴权服务。因此可以提炼一层叫作业务网关，专门处理业务相关的通用逻辑，包括鉴权模块。",-1),m=t("p",null,"接下来我们就从一个实际的例子 OPEN API 的业务网关来介绍下这类服务场景。",-1),A=t("h4",{id:"业务场景",tabindex:"-1"},[o("业务场景 "),t("a",{class:"header-anchor",href:"#业务场景","aria-label":'Permalink to "业务场景"'},"​")],-1),N=t("p",null,"OPEN API 一般会有一个统一的 token 鉴权，通过 token 鉴权后还需要判断第三方的 appid 是否有接口权限，其次判断接口是否到达了请求频率上限。为了服务安全，我们也可以做一些降级处理，在服务过载时，可以根据优先级抛弃一些请求，具体可以查看图 3。",-1),P=t("p",null,"接下来我们从技术层面来看为什么 Node.js 更适合此类应用场景。",-1),f=t("h4",{id:"服务特性",tabindex:"-1"},[o("服务特性 "),t("a",{class:"header-anchor",href:"#服务特性","aria-label":'Permalink to "服务特性"'},"​")],-1),j=t("p",null,"根据图 2 的场景应用，我们专注看下 Nginx 后面的业务网关处理层，它的业务场景如图 4 所示。",-1),C=t("p",null,"这 3 个功能都是基于缓存来处理业务逻辑的，大部分都是网络 I/O ，并未涉及 CPU 密集型逻辑，这也是 Node.js 的优势，其次异步驱动的方案能够处理更高的并发。根据第 01 讲的内容，Node.js 的代码核心是不阻塞主线程处理，而这类业务网关都是轻 CPU 运算服务。因此在这类场景的技术选型中，可以考虑使用 Node.js 作为服务端语言。",-1),T=t("h3",{id:"中台服务",tabindex:"-1"},[o("中台服务 "),t("a",{class:"header-anchor",href:"#中台服务","aria-label":'Permalink to "中台服务"'},"​")],-1),b=t("p",null,[o("在 Web 或者 App 应用中都存在一些"),t("strong",null,"通用服务"),o("，以往都是独立接口、独立开发。随着公司应用越来越多，需要将一些通用的业务服务进行集中，这也是中台的概念。而这部分业务场景往往也是网络 I/O 高、并发较大、业务关联性高、数据库读写压力相对较小。下面我们就来分析下这种业务场景。")],-1),B=t("h4",{id:"业务场景-1",tabindex:"-1"},[o("业务场景 "),t("a",{class:"header-anchor",href:"#业务场景-1","aria-label":'Permalink to "业务场景"'},"​")],-1),k=t("p",null,"为了避免资源浪费、人力浪费，我们可以使用如图 5 所示的中台服务系统：",-1),x=a('<ul><li><p><strong>前端配置系统</strong>是在服务端根据客户端的版本、设备、地区和语言，下发不同的配置（JSON或者文件包）；</p></li><li><p><strong>反馈系统</strong>，即用户可以在任何平台，调用反馈接口，并将反馈内容写入队列，并落地到系统中进行综合分析；</p></li><li><p><strong>推送系统</strong>用于管理消息的推送、用户红点和消息数的拉取，以及消息列表的管理；</p></li><li><p><strong>系统工具</strong>用于处理用户端日志捞取、用户端信息调试上报、性能定位问题分析提取等。</p></li></ul><p>以上是多个中台系统的业务说明，我们再来具体看看每个系统的特性，从特性来分析为什么 Node.js 适合作为服务端语言。</p><h4 id="服务特性-1" tabindex="-1">服务特性 <a class="header-anchor" href="#服务特性-1" aria-label="Permalink to &quot;服务特性&quot;">​</a></h4><p>在中台系统的设计中，系统着重关注：<strong>网络 I/O</strong> 、<strong>并发</strong> 、<strong>通用性</strong> 及<strong>业务复杂度</strong>，一般情况下不涉及复杂的 CPU 运算。这里我们以上面列举的系统来做分析，如表 1 所示。</p>',4),I=a('<p>在上述系统对比中，可以分析出 Node.js 作为中台服务，要求是：</p><ul><li><p>通用性必须好；</p></li><li><p>低 CPU 计算；</p></li><li><p>网络 I/O 高或者低都行；</p></li><li><p>并发高或者低都行。</p></li></ul><p>因为这样的服务在 Node.js 主线程中，可以快速处理各类业务场景，不会存在阻塞的情况，因此这类场景也适合使用 Node.js 作为服务端语言。</p><h3 id="其他相关" tabindex="-1">其他相关 <a class="header-anchor" href="#其他相关" aria-label="Permalink to &quot;其他相关&quot;">​</a></h3><h4 id="运营系统" tabindex="-1">运营系统 <a class="header-anchor" href="#运营系统" aria-label="Permalink to &quot;运营系统&quot;">​</a></h4><p>在各类互联网项目中，经常用运营活动来做项目推广，而这类运营系统往往逻辑复杂，同时需要根据业务场景进行多次迭代、不断优化。往往这些活动并发很高，但是可以不涉及底层数据库的读写，而更多的是缓存数据的处理。比如我们常见的一些投票活动、排行榜活动等，如图 6 所示。</p>',6),S=a('<p>运营系统这块我们会在《18 | 系统的实践设计（下）：完成一个通用投票系统》中详细介绍，并且进行这类系统的实践开发。</p><h4 id="不适合场景" tabindex="-1">不适合场景 <a class="header-anchor" href="#不适合场景" aria-label="Permalink to &quot;不适合场景&quot;">​</a></h4><p>前一讲介绍了事件循环原理，在原理中突出的是不能阻塞主线程，而一些密集型 CPU 运算的服务则非常不适合使用 Node.js 来处理。比如：</p><ul><li><p><strong>图片处理</strong>，比如图片的裁剪、图片的缩放，这些非常损耗 CPU 计算，应该用其他进程来处理；</p></li><li><p><strong>大字符串、大数组类处理</strong>，当涉及这些数据时，应该考虑如何通过切割来处理，或者在其他进程异步处理；</p></li><li><p><strong>大文件读写处理</strong>，有时会使用 Node.js 服务来处理 Excel，但是遇到 Excel 过大时，会导致 Node.js 内存溢出，因为 V8 内存上限是 1.4 G。</p></li></ul><p>可能还有更多场景，这里只是列举了很小的一部分，总之两个关键因素：<strong>大内存</strong> 和<strong>CPU 密集</strong>，这样的场景都不适合使用 Node.js 来提供服务。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>本讲中介绍的各类系统，都遵循了我们<a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=694#/detail/pc?id=6783" target="_blank" rel="noreferrer">《01 | 事件循环：高性能到底是如何做到的？》</a>所介绍的 Node.js 事件循环原理，减少或者避免在 Node.js 主线程中被阻塞，或者进行一些 CPU 密集型计算。遵循了这个原理后，就可以拓展出一些业务复杂度高、业务迭代快的功能，或者一些通用性服务。</p><p>在学完本讲后，你可以了解 Node.js 适合哪些应用场景，并在实际工作中可以尝试使用或者推荐团队来尝试，有任何心得或者问题，都欢迎在评论区与我交流。</p><p>下一讲，我们将介绍一个 Node.js 作为后端服务的例子，到时见。</p><hr>',10),V={href:"https://shenceyun.lagou.com/t/mka",target:"_blank",rel:"noreferrer"},E=t("p",null,[t("strong",null,"《大前端高薪训练营》")],-1),O=t("p",null,[o("对标阿里 P7 技术需求 + 每月大厂内推，6 个月助你斩获名企高薪 Offer。"),t("a",{href:"https://shenceyun.lagou.com/t/mka",target:"_blank",rel:"noreferrer"},"点击链接"),o("，快来领取！")],-1);function q(D,W,U,w,M,R){const s=r("Image");return l(),i("div",null,[p,d,c,e(s,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M01/13/29/Cgp9HWBB2I2ALxWGAAC4luceI5c251.png"}),o(),g,e(s,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M00/13/2A/CioPOWBB3lmASJg-AAHV0vpcYas739.png"}),o(),h,u,m,A,N,e(s,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M00/13/2A/CioPOWBB3nOAWYquAABKfQ7r_hc648.png"}),P,f,j,e(s,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image6/M00/13/2D/Cgp9HWBB3nyAcYKlAABG_EYz4Lo055.png"}),C,T,b,B,k,e(s,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image6/M00/13/2E/Cgp9HWBB3oaAV4SxAAA1KV5k6KE492.png"}),x,e(s,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image6/M00/13/2B/CioPOWBB3p-AQBVzAABL9J_mTls495.png"}),I,e(s,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image6/M00/13/2B/CioPOWBB3qyAB_uYAAA0AUisml4262.png"}),S,t("p",null,[t("a",V,[e(s,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M00/12/FA/CioPOWBBrAKAAod-AASyC72ZqWw233.png"})])]),E,O])}const Y=n(_,[["render",q]]);export{K as __pageData,Y as default};
