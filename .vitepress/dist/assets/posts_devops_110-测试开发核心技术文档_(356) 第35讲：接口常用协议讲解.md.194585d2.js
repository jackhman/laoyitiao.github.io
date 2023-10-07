import{_ as s,j as o,o as _,g as c,k as r,h as a,s as t,Q as p}from"./chunks/framework.4e7d56ce.js";const E=JSON.parse('{"title":"第35讲：接口常用协议讲解","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/110-测试开发核心技术文档/(356) 第35讲：接口常用协议讲解.md","filePath":"posts/devops/110-测试开发核心技术文档/(356) 第35讲：接口常用协议讲解.md","lastUpdated":1696417798000}'),l={name:"posts/devops/110-测试开发核心技术文档/(356) 第35讲：接口常用协议讲解.md"},n=t("h1",{id:"第35讲-接口常用协议讲解",tabindex:"-1"},[a("第35讲：接口常用协议讲解 "),t("a",{class:"header-anchor",href:"#第35讲-接口常用协议讲解","aria-label":'Permalink to "第35讲：接口常用协议讲解"'},"​")],-1),i=t("br",null,null,-1),d=t("p",null,"本课时我们开始进入接口协议的分析与学习。",-1),h=t("h2",{id:"osi-七层模型及常见协议",tabindex:"-1"},[a("OSI 七层模型及常见协议 "),t("a",{class:"header-anchor",href:"#osi-七层模型及常见协议","aria-label":'Permalink to "OSI 七层模型及常见协议"'},"​")],-1),u=p('<br><p>首先，我们来了解在互联网领域经常用到的协议。在大学教科书上，我们曾经学习 OSI 的七层网络模型，这是非常理想且设计完善的网络模型。它分为物理层、数据链路层、网络层、传输层、会话层、表示层、应用层。但由于历史原因，没有遵从七层网络模型设计的TCP/IP 协议成为了目前整个互联网的主流通讯协议，所以我们就需要研究下TCP/IP协议的细节。</p><br><p>TCP/IP 协议在设计之初并没有严格按照七层模型设计，而是按照四层模型设计的，也就是分成网络接口层、网络层、传输层和应用层。网络接口层负责底层物理接口的通信，网络层负责网络之间数据包的传递，传输层用来决定与目标服务器之间建立什么样的连接方式，根据是否建立连接，又可以分为 TCP 协议和 UDP 协议。先建立握手协议然后才进行通信是 TCP 协议，直接发送数据包的是 UDP 协议。</p><br><p>基于这两个协议，针对具体的应用领域有各自的协议栈，比如负责域名解析的是 DNS，负责网站超文本传输的 HTTP，还有文件传输协议、邮件发送协议，专属领域也都有各自的专属协议。</p><br><p>以上就是互联网比较常见的网络协议，而我们在测试过程中会遇到类似 dubbo 或谷歌的 ProtoBuf 协议，这些协议本质上也属于 TCP/IP 协议技术栈、</p><h2 id="分析协议" tabindex="-1">分析协议 <a class="header-anchor" href="#分析协议" aria-label="Permalink to &quot;分析协议&quot;">​</a></h2><p>了解了这些常见的协议后，接下来我们看下如何分析这些协议。这部分知识可以让我们在构造数据，以及分析服务器之间如何通信打下良好基础。有了这个基础后，在构造各类测试用例时就有了很好的参考。</p><br><p>接下来，我们看下协议分析的主流工具，我把它们分为两大类，第一类属于网络监听模式，通过在网络层进行监听抓取所有的数据包，主要包括的工具是 Tcpdump 和 Wireshark。它们可以帮助我们抓取所有的 TCP/IP 数据包，是非常强大的工具。但是它们在分析高层协议，比如在分析 HTTP 协议的内部细节时，就不是特别方便，所以只有在分析一些偏底层的协议时，我们才会用到这个组合，而到了高层协议更多的会使用代理工具进行分析。</p><br><p>代理工具主要有 Charles、MITMProxy 和 Burpsuite，其他比较知名的还有 Windows 系统的 Fiddle。如果你是手动测试的话，使用 Charles 就可以了，这是一个最强大的代理工具；如果你是一名黑客，或是白帽子安全测试工程师，那么你可以使用 Burpsuite；如果你是测试开发工程师，想编写一些接口测试用例，自动完成接口字段的测试，以及做一些 Mock 等类似操作，可以使用 Mitmproxy，它可以让你定制更强大的代理、Mock 以及 Fuzz 这样的测试工具。</p><h2 id="协议测试工具" tabindex="-1">协议测试工具 <a class="header-anchor" href="#协议测试工具" aria-label="Permalink to &quot;协议测试工具&quot;">​</a></h2><p>一旦我们分析好协议后，自然也需要对其进行相关的测试，这里给你介绍几个比较知名的协议发包工具。网络层我们使用的相对较少，但是也有一个比较不错的工具叫作 Netcat，简称 NC，俗称黑客界的网络瑞士军刀。而对于测试工程师而言，我们用的最多的其实是 curl 命令和 postman 工具。</p><br><p>其中 curl 命令是一个便捷的命令行工具，很多http协议分析工具都对 curl 命令提供了支持，可以一键转成 curl 命令。postman 也是目前在测试圈使用比较广的图形化工具，它有非常完整的生态，可以做相关的各种各样的结构测试。</p><br><p>接下来，我们看下如何去分析协议，我们先从底层开始，从使用 Tcpdump 入手去了解怎么样去分析数据包。</p><br>',21),T=t("br",null,null,-1),m=t("p",null,"Tcpdump 是 Linux 下非常经典的一个工具，如图所示我给你做一个简单的展示，因为监听网络层的数据是比较敏感的，所以我们需要 root 权限，并配置对应的主机，然后 Tcpdump 会帮你去监听发送的数据包。它还有一些常用的参数，比如 -X 表示抓到的数据包以 16 机制表示，-W 表示把抓到的数据包保存到文件中，等等。",-1),b=t("br",null,null,-1),P=t("p",null,"Tcpdump 命令本身支持非常灵活的表达方式，比如你可以在参数中指定是 IP 协议还是 TCP 协议，然后还可以根据主机名进行过滤，根据端口过滤，也可以根据来源和目的地进行监听过滤，等等。它也支持 and、or 逻辑表达式，所以说是非常强大的工具。",-1),A=t("br",null,null,-1),C=p('<br><p>接下来，我们再来看看与 Tcpdump 配合的另外一个叫作 WireShark 的工具，它可以在桌面监控数据包的发送，同时还可以分析 Tcpdump 产生的日志文件，它本身的 UI 设计非常好，可以把数据包的细节分析的非常透彻。</p><br><p>所以 WireShark+Tcpdump 是一个强大的网络协议分析组合，通常情况下我们的应用场景，比如在手机上通过 Tcpdump 进行抓包，然后保存到文件，最后通过 WireShark 进行相关分析。</p><h2 id="案例演示" tabindex="-1">案例演示 <a class="header-anchor" href="#案例演示" aria-label="Permalink to &quot;案例演示&quot;">​</a></h2><p>我们来演示一个经典的http协议包的抓包与分析过程，我们以抓取百度的数据包为例演示怎么去使用这两个工具，首先我们先使用 sudo tcpdump host www.baidu.com，-W 表示把数据传入数据文件。这样就开启了网络监听模式。</p><br><p>为了模拟一个比较干净的网络发送，我们使用 curl 命令直接发起一个 HTTP 请求，你可以很好的观察到中间的数据传输过程。一旦tcpdump的命令开始运行，接下来你需要打开一个窗口输入 curl <a href="http://www.baidu.com" target="_blank" rel="noreferrer">http://www.baidu.com</a>命令完成对百度的访问。访问完成之后，你就可以停止 Tcpdump 命令了。</p><br><p>然后就可以使用 WireShark 打开 Tcpdump 保存的日志文件进行网络协议的分析了。</p><br>',11),I=p("<br><p>以上就是 WireShark 抓取访问百度数据包的过程，首先我们看下整体流程。</p><br><p>客户端程序通过源 IP与源端口与远程服务器进行连接。访问百度也有一个目标 IP 地址，然后是 80 端口，这是第一次数据包的网络发送，在这次发的数据包中，每一层协议都有一个协议细节，比如 TCP/IP 协议细节，wireshark会把每一个字段都拆解。</p><br><p>了解了数据包之后，我们看下它里面的具体的关键标记，其中有一个叫作 TCP 协议的标记，TCP包带有一个 Flags字段，用于描述自己的状态，等等。我在这里把常见的 TCP/IP 的 Flags 都标记出来了，比如 Syn、Ack 等各种各样的状态位，它可以通过一个字段表示常见的状态。</p><br><p>当我们第一次去访问百度的时候，首先客户端会发起一个数据包给服务器，这时数据包会携带一个关键的标记 Syn，此时 Syn 标记的状态为 1，简称SYN包</p><br><p>客户端发给服务器一个请求表示我准备建立一个连接，这时服务器会返回一个数据包给客户端，这个包会携带一个 Syn + Ack 的标记，表示服务端可以响应客户端的请求。接下来客户端会再发一个携带 Ack 的请求表示客户端已经收到响应，可以开始发送请求，这样数据包完整的握手过程就建立了，也就是通常我们所说的 TCP 协议三次握手。</p><br><p>建立连接之后，就会开始真正的传输网络数据包，你可以看到里面大多数都是文本，网络数据传输结束后，需要结束连接就需要四次挥手机制了。</p><br><p>四次挥手是什么呢？当所有数据包都传输完成之后，客户端此时收到自己想要的数据包之后，会发给服务端一个 Fin 为 1 和 Ack 为 1 的状态标记，表示传输已经完成，可以结束了。服务端收到请求之后，它会先回复一个 Ack 表示我已经确认客户端想要结束连接的请求，然后服务端会再发给客户端一条FIN ACK消息，表示我确认并可以接受结束连接。</p><br><p>这时客户端没问题后会再发一个ACK数据包表示确认已经收到消息，可以开始结束，整个过程我们称之为四次挥手。这个过程如果你死记硬背各种概念是理解不透的，所以我建议你可以和我一样执行下相关的命令，把对应的数据包抓取出来，就可以非常清楚三次握手与四次挥手的过程。</p><br><br>",18),g=t("br",null,null,-1),S=t("p",null,"如图所示，前三次就是三次握手客户端与服务端发送的数据包，后面四次就是四次挥手发送的数据包，通过抓取数据包就可以很清晰的理解三次握手与四次挥手的过程。",-1),k=t("br",null,null,-1),f=t("p",null,"这个知识点也是很多面试官非常喜欢考察的，所以需要你能够理解，然后通过实战掌握其中的知识点。",-1);function x(N,q,w,W,M,B){const e=o("Image");return _(),c("div",null,[n,i,d,h,r(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/86/7B/Cgq2xl6QER6AZPH-AAFTTl-fIWs581.png"}),a(),u,r(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0D/65/Ciqah16QEWaAKrPqAAD_66tzO44066.png"}),a(),T,m,b,P,A,r(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/0D/65/Ciqah16QER6AGZiaAATwgTsBkOE562.png"}),a(),C,r(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/86/7B/Cgq2xl6QER-AW19IAAeI8nrGuh0567.png"}),a(),I,r(e,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/86/7B/Cgq2xl6QEZyAFlSRAAbmI8zOhMc620.png"}),a(),g,S,k,f])}const V=s(l,[["render",x]]);export{E as __pageData,V as default};
