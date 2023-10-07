import{_ as a,j as p,o as i,g as n,k as s,h as e,Q as o,s as l}from"./chunks/framework.4e7d56ce.js";const Z=JSON.parse('{"title":"第36讲：代理工具与高级Mock使用（上）","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/110-测试开发核心技术文档/(358) 第36讲：代理工具与高级 Mock 使用（上）.md","filePath":"posts/devops/110-测试开发核心技术文档/(358) 第36讲：代理工具与高级 Mock 使用（上）.md","lastUpdated":1696417798000}'),_={name:"posts/devops/110-测试开发核心技术文档/(358) 第36讲：代理工具与高级 Mock 使用（上）.md"},c=o('<h1 id="第36讲-代理工具与高级mock使用-上" tabindex="-1">第36讲：代理工具与高级Mock使用（上） <a class="header-anchor" href="#第36讲-代理工具与高级mock使用-上" aria-label="Permalink to &quot;第36讲：代理工具与高级Mock使用（上）&quot;">​</a></h1><br><p>本课时我们进入测试工程师必备工具 charles 的学习。</p><h2 id="常见代理工具" tabindex="-1">常见代理工具 <a class="header-anchor" href="#常见代理工具" aria-label="Permalink to &quot;常见代理工具&quot;">​</a></h2><p>在正式开始学习之前，我先为你简单介绍目前行业里常用的实现代理的工具。</p><br><p>第 1 个是普通代理工具，比如常见的 charles，charles 是目前为止在测试领域功能最强大的代理工具。然后是 burpsuite（黑客），是黑客人手必备的渗透测试工具。fiddler 则是 Windows 代理工具里最强的一款。再一个是 mitmproxy，也是一个非常开放的，定制性强大的工具，想必你已经接触过这四款工具中的某一款。</p><br><p>第 2 个是高性能代理服务器。代理服务器与代理工具的区别在于，代理服务器关注的更多是高性能的代理，主要是为内容的缓存或加速访问提供一些高速的代理服务器，比如squid，很公司都会使用 squid 缓存静态页面，让用户能够更高效的进行访问。</p><br><p>第 3 个是反向代理，也许你听的最多就是 Nginx，它的速度很快，主要是用来作反向代理。就是把用户的访问代理到一台服务器上，它跟我们目前使用的正常代理正好是相反的。</p><br><p>第 4 个是流量的转发与复制，这方面常见的有 em-proxy，国外非常火的 gor，还有国内网易工程师开发的 TCP-copy，除此之外，还有 iptable，它可以对所有的包进行流量的转发、复制。Nginx 也支持流量的转化与复制。</p><h2 id="代理工具的区别" tabindex="-1">代理工具的区别 <a class="header-anchor" href="#代理工具的区别" aria-label="Permalink to &quot;代理工具的区别&quot;">​</a></h2><p>那么这些代理工具有什么区别呢？在 mitmproxy 的官网上有一个非常不错的图，我把它引用过来为你做一个分析。</p><br>',16),r=o('<br><p>首先，我们可以根据工作的形态进行划分，假设你通过手机去访问 mitmproxy，然后进行联网。那么在联网的过程中，会经过这些选择：</p><ul><li><p>如果你想把流量转发到后台服务器中的其中一台，这时称之为反向代理，主要是为了接受请求，然后单独发给某一个独立的服务。</p></li><li><p>你可以配置客户端的一个代理，但是有很多工具它本身是不支持代理的，所以即使配置也没有效果，这时就需要用到透明代理，也就是你转发给 A，A 再转发给 B，在这中间你根本不需要任何的代理配置，也可以帮你转发。</p></li><li><p>如果你需要实现多层代理，那么就可以使用上游代理功能，不过这种多层代理常用于黑客，黑客会攻击一些第三方网站，为了不让别人查出来他是谁，他会在中间加上好几层代理，通过多层代理方式躲避国际刑警的追查，当然不讲这方面的技术。</p></li></ul><p>我们用的比较多的还是正常的代理。Android 和 iOS，包括各种 App 都可以支持配置代理。在配置完代理之后，就可以获取所有的数据包，然后进行转发，这就是正常的代理。透明代理偶尔会用到，反向代理也用的非常普遍，多适用于服务端的流量管理。</p><h2 id="代理的工作原理" tabindex="-1">代理的工作原理 <a class="header-anchor" href="#代理的工作原理" aria-label="Permalink to &quot;代理的工作原理&quot;">​</a></h2><p>那么代理的工作原理是什么？在这里简单的用两个 Shell 命令做一个演示。代理的本质是监听一个端口，然后把外面的设备连接过来，你就可以对它的数据进行篡改（当然你也可以选择不篡改），完成之后再把数据转发给第三方，收到的数据再重新传回来。</p><br>',7),h=l("br",null,null,-1),d=l("p",null,"这里我选择了 NC，之前讲过，NC 是一个发 TCP 包的工具，简单的用这个包做一个接听，再做一个转发，就可以实现一个简易的代理。",-1),u=l("br",null,null,-1),m=l("br",null,null,-1),b=l("p",null,"我来为你演示一下，我们执行这几行命令，然后去访问 127.0.0.1:8080，访问结果是一个百度网站，为什么会出现这种情况呢？",-1),A=l("br",null,null,-1),g=o('<br><p>这是因为当我访问 8080 端口时，服务器收到了我的请求，接着它对网址做了修改，把头消息改成一个正常的域名，然后直接转发给第三方网站，收到的数据再重新传回来。</p><br><p>这个案例可以帮你了解代理的原理。真实的代理其实要复杂得多，涉及加密、HTTPS 和证书认证的过程。</p><h2 id="优秀代理工具需要具备哪些特性" tabindex="-1">优秀代理工具需要具备哪些特性 <a class="header-anchor" href="#优秀代理工具需要具备哪些特性" aria-label="Permalink to &quot;优秀代理工具需要具备哪些特性&quot;">​</a></h2><p>既然代理在我们测试工作中非常重要，那么我们要选什么样的工具？这里我做了一个标准，包含了一个优秀的代理工具应该具备的一些特性。</p><ul><li><p>它本身的代理功能至少要支持 HTTP/HTTPS、socks5；</p></li><li><p>请求的模拟工具可以简单地实现拼装请求、重放请求以及重复请求；</p></li><li><p>可以对网络环境进行模拟，比如说限速模拟、超时模拟，以及一些返回异常的模拟；</p></li><li><p>mock 可以对响应和请求进行修改；</p></li><li><p>fake，当我们的测试环境里有多个环境时，如预发布环境、线上环境，但是想要在 App 中改这些环境很困难，我就可以让 App 通过代理方式任意改变后端环境，这样就可以用测试环境的数据去测真实的 App，这种方式就叫 fake。</p></li></ul><p>还有一些功能，比如支持对写插件等功能进行定制，综合这些特性，我为你推荐了这样几款工具。</p><br><p>首先，不管你是开发工程师还是测试工程师， charles 是你首选的工具。</p><br><p>第 2 个就是 mitmproxy，它是测试开发工程师必备的。为什么说是测试开发工程师必备？这是因为 charles 是图形化工具，无法支持更多的自动化场景，当我们需要编写一些自动化代理工具发送请求时，就需要模拟相关的测试数据。这个时候我们需要更自动化地处理所有事情，但 charles 作为图形化工具无法实现这些功能，所以作为测试开发工程师，就需要开发一个全自动工具，去测试兼容性、自动 mock 、 fake、stub、fuzz，那么 mitmproxy 是可以满足你的需求的。</p><br><p>第 3 个工具是 zap，它是 OWASP（开放式 Web 应用程序安全项目）提供的开源工具。通常测试工程师如果要做安全测试，它是首选。因为它功能非常全面，可以使用一个小的代理去抓取网络请求，然后自动扫描这些请求。</p><br><p>第 4 个工具是 burpsuite，由于它是专门为黑客打造的，所以它的功能更多的充满攻击性。比如暴力破解，或是一些参数的拆解和注入，主要用于给黑客做渗透测试，或者给安全工程师做手工的设定测试。</p><br><p>第 5 个工具是 fiddler。如果你使用 Windows，那么肯定对 fiddler 非常熟悉，它是 Windows 上最强大的代理工具，但问题是跨平台支持不够好，虽然也支持 Mac，但在根本使用不了，建议你使用更全平台的一些工具。</p><br><p>第 6 个工具是 Postman，你可能很喜欢使用它，它的功能非常的强大，但是，在代理层面上的功能很薄弱，所以并不推荐。</p><br><p>整体来说，作为入门级，charles 是目前最强大的一个工具。到了一定能力，你可以入手 mitmproxy 来完成一些更自动化的事情。</p><h2 id="charles-功能分析" tabindex="-1">charles 功能分析 <a class="header-anchor" href="#charles-功能分析" aria-label="Permalink to &quot;charles 功能分析&quot;">​</a></h2><p>那么对代理这个概念做了一些基本介绍之后，接下来我来为你分析，测试工程师必备的 charles 工具到底有多强？</p><br>',25),k=l("br",null,null,-1),T=l("p",null,"首先我们来看一下通用的抓包，比如 HTTP 抓包、HTTPS 抓包， charles 都可以帮你去完成，这是它的界面。你可以在这个包里开启端口，让服务端进行访问，也可以很方便地获取证书，安装证书。",-1),P=l("br",null,null,-1),f=l("br",null,null,-1),x=l("p",null,"第 2 个是限速的模拟。比如说要模拟在 2G 3G、4G 或包括 Wi-Fi 在内的各种网络状态，那么 charles 会预设几个参数，帮你模拟各个网络情况下的数据情况，主要是上传带宽、下载带宽，丢包、延迟和稳定性相关的内容，它会根据一些关键参数对你的网络进行相关模拟，是用来做弱网测试非常好的工具。",-1),C=l("br",null,null,-1),q=l("br",null,null,-1),M=l("p",null,'第 3 个就是交互式的拦截请求。比如说要测一次转账功能，可以尝试转一个负数，查看账户是否有增加。之前就有一家厂商曾经出现过类似的 bug，这时该怎么办呢？我们通常会先对客户端进行校验，如果发现是负数会禁止输入，但问题是服务端有的时候会"偷懒"，它不一定会校验，一个网络请求其实可以完全绕过客户端。',-1),S=l("br",null,null,-1),W=l("p",null,"所以这个时候我们就可以加一个拦截条件，比如说当发送某一个网络请求，或者拦截之后，系统会进入一个交互式弹框，然后在这个框里输入你想改的值，比如把转账的值改成负数，或者改成 0，测试是否能转账来模拟各种交易层系统的机制。",-1),I=l("br",null,null,-1),N=l("br",null,null,-1),V=l("p",null,"第 4 个是非交互式的拦截与响应。比如我想自动化的对请求做修改，而不再手工进行拦截（因为手工拦截有时候会面临超时的问题）。完全自动化的拦截可以使用 Rewrite 的功能。Rewrite 本质上是一种 mock， mock 可以对请求和响应进行动态修改，比如以前微信跳一跳小程序，它的分数就可以通过接口改掉。所以抓包之后直接篡改就可以，这个时候交互式拦截可能会比较吃力。而全自动化的拦截使用 Rewrite，当我遇到特定参数的时候，可以直接去改它的内容。响应的mock也是一样，比如早年很多人破解一些软件，就是靠这一招。通过造一个假的网站，然后客户端程序会发一个认证请求到远程网站，如果你知道它的交互协议，抓到它的交互内容，接下来就可以拦截它，然后把限制的内容改成通过的状态，这样就可以实现一定程度上的破解。",-1),v=l("br",null,null,-1),H=l("p",null,"mock 对我们测试工程师来说，更多的场景是用在测试。举个例子，比如说外卖的商铺里有很多的菜品，一个菜品按照等价类测试法划分测试用例，需要制造 0 个菜品、1 个菜品、5 个菜品、20 个菜品，200 个菜品甚至更多菜品，这种数据该怎么进行模拟呢？公司相应业务网站的服务多数都是固定的，很难满足你的数据要求，这个时候我可以强行把返回来的数字加倍，修改完成之后返回给客户端app，就可以完成模拟。",-1),F=l("br",null,null,-1),y=l("p",null,"还有很多情况也可以模拟，比如说股票，我要去测一只股票，它涨的时候股票是不是红色，假如这个时候碰巧股票都是跌的，或者今天大盘全跌，我很难找到上涨的股票，该怎么办？我可以去构造，把返回来的字段值强行改成我想要的值，比如涨到 8%、10%，然后去看客户端是否能处理？这便是非交互的对相应内容进行动态修改。",-1),D=l("br",null,null,-1),R=l("br",null,null,-1),E=l("p",null,"除了这两个之外，还有一个叫 fake，它可以用测试环境来替代线上环境。同样的例子，比如说我们公司内有多个环境：联调环境、发布环境、测试环境，还有最后的线上环境。App 多数都是面向线上环境的，现在我想去测试一个在测试环境刚刚上线的后台接口，看下它是否能正常工作。但是你的 App 可能不太好支持各个环境的配置。如果没有做可测性改进的话，有的时候 App 是默认不支持测试环境的，那么我可以用代理，把正常的子网络访问请求，改成 beta 版本的地址，这样就可以用线下测试环境、联调环境、预发布环境来去测试我的 App。这样借助于线上发布的 App，就可以测试内部还没发布的后台环境。",-1),w=l("br",null,null,-1),B=l("p",null,"除了这个之外，还有一种本地文件 Fake。Fake 跟刚才的很像，只不过 Fake 是用本地的 cache缓存。刚才的 Fake 是用测试环境来替代线上环境，现在是用本地文件来替代线上环境。同样我也有一个 App，比如刚刚说的菜品，每次重大修改也很困难，那么我可以把这些数据提前填好，这样不管是 100 个菜品还是 1000 个菜品的，在每次修改之前，都可以提前存到一个目录里面，当你的网络请求开始访问某个域名时，强行把这个网络访问请求直接转向本地的文件。这样当一个 Android App 发送网络请求的时候，经过代理，代理会强行把它转到本地目录，它会读本地文件再返回给你。我们就可以利用本地目录去模拟常见的一些测试数据，完成对 App 的各种测试。",-1),z=l("br",null,null,-1),G=l("p",null,"有了代理可以解锁你的更多客户端测试能力了，让我们在做测试的过程中，能够更便捷的测试。我们在前端与后端之间本来是通过各种协议直接进行交付的，现在被我们强行解耦，在中间就可以模拟我们的测试数据，它给了我们一个很强的能力让我们去模拟和测试各种场景。",-1),O=l("br",null,null,-1),U=l("p",null,"我们会在下个课时中，通过 HTTP、HTTPS 抓包的学习，给你演示一个实际案例，用一个真实的场景，完成我们常见的几个目标，比如 mock 和 fake，对 App 进行比较完整的测试。",-1);function $(J,Q,Y,j,L,X){const t=p("Image");return i(),n("div",null,[c,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/10/0F/Ciqah16W1-eAXxq6AAHMBQptMNs092.png"}),e(),r,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/89/25/Cgq2xl6W1-eAK6g2AADbIcexhd8685.png"}),e(),h,d,u,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/02/E0/CgoCgV6W1-eAevAoAATJAvTk_Ds790.png"}),e(),m,b,A,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/10/0F/Ciqah16W1-eAXu8UAAFYILDIWac397.png"}),e(),g,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/89/25/Cgq2xl6W1-iARQqYAAIHW2plkOo321.png"}),e(),k,T,P,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/02/E0/CgoCgV6W1-iAe8CRAADTlvkvnno681.png"}),e(),f,x,C,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/10/0F/Ciqah16W1-iAf7VJAAGc8ThUrqc633.png"}),e(),q,M,S,W,I,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/89/25/Cgq2xl6W1-iANtUjAAHSyknvIDY282.png"}),e(),N,V,v,H,F,y,D,s(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/02/E0/CgoCgV6W1-iAEl_zAAFHI63PLRk558.png"}),e(),R,E,w,B,z,G,O,U])}const ll=a(_,[["render",$]]);export{Z as __pageData,ll as default};
