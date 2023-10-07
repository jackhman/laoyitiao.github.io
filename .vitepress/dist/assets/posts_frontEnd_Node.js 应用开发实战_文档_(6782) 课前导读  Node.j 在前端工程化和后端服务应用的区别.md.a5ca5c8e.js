import{_ as a,j as n,o as r,g as l,k as s,h as e,s as o,Q as p}from"./chunks/framework.4e7d56ce.js";const x=JSON.parse('{"title":"课前导读Node.j在前端工程化和后端服务应用的区别","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/Node.js 应用开发实战_文档/(6782) 课前导读  Node.j 在前端工程化和后端服务应用的区别.md","filePath":"posts/frontEnd/Node.js 应用开发实战_文档/(6782) 课前导读  Node.j 在前端工程化和后端服务应用的区别.md","lastUpdated":1696417798000}'),d={name:"posts/frontEnd/Node.js 应用开发实战_文档/(6782) 课前导读  Node.j 在前端工程化和后端服务应用的区别.md"},i=o("h1",{id:"课前导读node-j在前端工程化和后端服务应用的区别",tabindex:"-1"},[e("课前导读Node.j在前端工程化和后端服务应用的区别 "),o("a",{class:"header-anchor",href:"#课前导读node-j在前端工程化和后端服务应用的区别","aria-label":'Permalink to "课前导读Node.j在前端工程化和后端服务应用的区别"'},"​")],-1),_=o("p",null,[e("在前端工程师眼里，工程化最重要的就是 Webpack 工具，而 Webpack 核心是基于 Node.js 来运行的，当然还有其他场景比如说 SSR 的实现以及前端的一些工具化场景。这些应用最终目标都是为了"),o("strong",null,"提升前端研发效率"),e(" 或者"),o("strong",null,"保证研发质量"),e("，其实并没有真正地应用到 Node.js 核心特点，而后端服务应用才是真正地应用 Node.js 异步事件驱动的特性，那么本讲就着重来介绍两者存在的差异，并指导你进行一些转型思考。")],-1),c=o("p",null,'由于 Node.js 的编程语言就是 JavaScript，因此很多前端同学用起来也是非常顺手，但是顺手和熟练应用区别可太大了。这有段小插曲，有一次我看到一份非常好的简历，精通 React、熟练应用 Node.js，看到这种简历着实让我心情很愉悦，心想终于找到一个对口的人才了。当小伙进来面试后，我问了一个问题，我说："你主要用 Node.js 做了哪些事情，这些应用中，你觉得哪些场景真正发挥出了 Node.js 的特性"。他最终没有通过我的面试，其主要原因是只用了 Node.js 做一些工具或者简单的服务端应用，并没有真实地了解 Node.js 的特点以及所适用的场景，因此谈不上熟练应用 Node.js。如果你想在简历中带上，熟练应用 Node.js，那你可以带着这些问题来学习下本讲的知识点。',-1),g=o("p",null,"本讲将会从表格 1 的这几个方面来讲解这两者之间的区别。",-1),h=p('<h3 id="运行环境" tabindex="-1">运行环境 <a class="header-anchor" href="#运行环境" aria-label="Permalink to &quot;运行环境&quot;">​</a></h3><ul><li><p>工程化的大部分情况都是基于当前开发环境，运行在本地开发机器上。</p></li><li><p>而后端服务应用一般运行在远程服务器上。</p></li></ul><p>为什么这两者的差异会导致我们理解或者编程方面的区别呢？</p><p>这就好比，你是老板，你需要两个人来帮你分别做一件事情，一个就在你旁边，一个需要出差去其他地方。</p><p>在你旁边的，可以关注到他的效率、进展、是否情绪有问题、是否可能会离职，甚至知道他到底为你做了什么贡献价值。</p><p>那出差的就没有这么清晰了，所以你需要有一些方法和工具来分析这些问题，因此需要知道出差的地方办公环境或者团队协助是怎么样的，是否能够符合该员工的办公要求；有人反馈员工有问题时，我们还需要远程取证，判断这个举报或者反馈是否真实存在；其次你需要使用一些目标和策略来考证出差的员工是否按照你既定目标在办公，他的工作状态和工作效率是否达到了要求，或者是否超出了你的预期范围等等。</p><p>讲了上面的这个例子以后，我们再回过头来思考，Node.js 的服务其实也是一样的：</p><ul><li><p>运行在本地的服务，你可以快速地判断定位、分析、解决问题；</p></li><li><p>但是在远程的服务，你需要利用一些工具来分析判断或者监控其运行情况。</p></li></ul><p>那因为环境上的差异，会引发什么不同点呢：</p><ul><li><p>首先我们需要应用工具将服务发布到远程机器上，这里就涉及<strong>devops 工具</strong>；</p></li><li><p>我们需要保证远程服务的安全与稳定，这就涉及一些进程管理工具，例如我们<strong>常见的 PM2</strong>；</p></li><li><p>我们需要判断远程服务运行是否正常，这就涉及远程服务的<strong>监控和告警机制</strong>；</p></li><li><p>遇到运行问题时，我们需要通过远程日志来定位分析问题，这就涉及<strong>日志打印</strong> 和<strong>跟踪染色</strong>。</p></li></ul><h3 id="受众群体" tabindex="-1">受众群体 <a class="header-anchor" href="#受众群体" aria-label="Permalink to &quot;受众群体&quot;">​</a></h3><ul><li><p>前端工程化一般都是服务于开发者，比如我自己在本地应用 Webpack 打包或者将 ES6、ES7 转为 ES5 语法等，都是基于开发者工具，而这部分用户则是我们开发者自己。</p></li><li><p>而后端服务应用则服务于真实的用户群体，为用户提供各种交互体验方面的数据处理等。</p></li></ul><p>因为两者的差异，工程化侧重于为开发者提升<strong>研发效率</strong> 或者<strong>研发质量</strong>。</p><p>后端服务应用则必须关注服务的<strong>稳定与安全</strong> 。因为都是基于用户发送的内容，用户有时候发送一些非法或者违法的内容。其次需要关注<strong>并发性能</strong> ，因此必须充分考量服务器所能承载的最大用户并发数，在并发即将达到阈值时，又需要考量平行<strong>扩容方案</strong> 。还有就是为了用户体验，需要充分做好服务的<strong>性能优化</strong>，做到极致的接口响应时间。</p><h3 id="问题调试" tabindex="-1">问题调试 <a class="header-anchor" href="#问题调试" aria-label="Permalink to &quot;问题调试&quot;">​</a></h3><ul><li><p>因为前端工程化在本地运行，你可以随意地 console.log 打印日志进行调试，因为这些影响的也只是个人，或者说即使变成通用的工具，打印一些 console.log 也对工具的影响不大。</p></li><li><p>但是在后端服务应用时，你就需要考虑一些方法来进行问题调试和定位策略了。</p></li></ul><p>你需要在每个业务场景中，思考在哪里进行一些关键逻辑或者数据打印日志信息，这里就需要 Node.js 日志服务模块，而这类日志服务又不能影响性能，因此需要考虑一些<strong>高性能日志打印工具</strong> 。其次在服务端运行，你可能会遇到诸如<strong>内存泄漏</strong> 、<strong>句柄泄漏</strong> 或者<strong>进程异常退出</strong>等问题，因此这里就需要这类工具和方法来分析定位现网问题。</p><h3 id="关注点" tabindex="-1">关注点 <a class="header-anchor" href="#关注点" aria-label="Permalink to &quot;关注点&quot;">​</a></h3><p>经过上面的各种对比，最后这点已经非常明确了，即两者的关注点不同，从而导致了两者的差异性。这也是需要你在学习 Node.js 的时候进行一些<strong>思维转变</strong>，切莫停留在前端工程化应用的角度去学习了，而应该全面地学习上面总结的知识点。只有上面的知识点掌握了，我们才能在简历上说，掌握 Node.js 的应用。</p><p>其次我们也来回答下上面的面试题，如果是我，我就会从本讲的两个方面去回答，一个是前端工程化的应用，另外一个是后端服务应用。前者着重于开发效率的提升和研发质量的保证，后者则是真正发挥出了 Node.js 的异步驱动特性。因为异步驱动特性，在主线程不被 CPU 密集型所影响时，可以真正发挥出 Node.js 高并发特性，可以作为大部分网络 I/O 较高的后端服务。</p><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>上面讨论的这些差异点，是我们本专栏所需要重点介绍的知识，也是你从 Node.js 前端工程化应用扩展到系统化应用，所必须要掌握的技能点。学完本讲后，希望你能够从思维中有所转变，认识差异重新出发。</p><p>那除了我提到的关于两者的差异点，你觉得它们还有什么差异呢，欢迎在评论区与我分享。</p><p>下一讲我们就正式进入专栏内容了，第 01 讲我将为你讲解 Node.js 中最基础也是最核心的部分：事件循环的原理。</p><hr><p>[</p>',26),u=o("p",null,[e("]("),o("a",{href:"https://shenceyun.lagou.com/t/mka",target:"_blank",rel:"noreferrer"},"https://shenceyun.lagou.com/t/mka"),e(")")],-1),N=o("p",null,[o("strong",null,"《大前端高薪训练营》")],-1),j=o("p",null,[e("对标阿里 P7 技术需求 + 每月大厂内推，6 个月助你斩获名企高薪 Offer。"),o("a",{href:"https://shenceyun.lagou.com/t/mka",target:"_blank",rel:"noreferrer"},"点击链接"),e("，快来领取！")],-1);function m(f,k,b,P,S,A){const t=n("Image");return r(),l("div",null,[i,_,c,g,s(t,{alt:"image.png",src:"https://s0.lgstatic.com/i/image6/M00/13/1D/CioPOWBB0TyASaasAABtZvrLaXk828.png"}),e(),h,s(t,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M00/12/FA/CioPOWBBrAKAAod-AASyC72ZqWw233.png"}),e(),u,N,j])}const B=a(d,[["render",m]]);export{x as __pageData,B as default};
