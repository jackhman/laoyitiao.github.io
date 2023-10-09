import{_ as o,j as e,o as t,h as r,k as p,f as a,Q as l,s}from"./chunks/framework.d3daa342.js";const f=JSON.parse('{"title":"15微服务间如何进行远程方法调用？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Go 微服务实战 38 讲_文档/(3813) 15  微服务间如何进行远程方法调用？.md","filePath":"posts/backEnd/Go 微服务实战 38 讲_文档/(3813) 15  微服务间如何进行远程方法调用？.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/Go 微服务实战 38 讲_文档/(3813) 15  微服务间如何进行远程方法调用？.md"},E=l('<h1 id="_15微服务间如何进行远程方法调用" tabindex="-1">15微服务间如何进行远程方法调用？ <a class="header-anchor" href="#_15微服务间如何进行远程方法调用" aria-label="Permalink to &quot;15微服务间如何进行远程方法调用？&quot;">​</a></h1><p>在微服务架构中，每个服务实例负责一个单一领域的业务实现，不同服务实例之间需要进行频繁交互来共同实现业务。那它们是如何通信的呢？<strong>服务实例之间主要通过轻量级的远程调用方式来实现，比如 RPC</strong>。</p><p><strong>RPC</strong> （Remote Procedure Call，<strong>远程过程调用协议</strong>），是一种通过网络从远程计算机程序上请求服务，而不需要了解底层网络技术的协议。RPC 只是一套协议，基于这套协议规范来实现的框架都可以称为 RPC 框架，比较典型的有 Dubbo、Thrift 和 gRPC。</p><h3 id="rpc-机制和实现过程" tabindex="-1">RPC 机制和实现过程 <a class="header-anchor" href="#rpc-机制和实现过程" aria-label="Permalink to &quot;RPC 机制和实现过程&quot;">​</a></h3><p>RPC 是远程过程调用的方式之一，涉及<strong>调用方</strong> 和<strong>被调用方</strong>两个进程的交互。因为 RPC 提供类似于本地方法调用的形式，所以对于调用方来说，调用 RPC 方法和调用本地方法并没有明显区别。</p><p>下面，我们就来简单介绍一下 RPC 机制的诞生和基础概念。</p><p>1984 年，Birrell 和 Nelson 在 <em>ACM Transactions on Computer Systems</em> 期刊上发表了名为&quot;Implementing remote procedure calls&quot;的论文，该文对 RPC 的机制做了经典的诠释：</p><blockquote><p>RPC 远程过程调用是指计算机 A 上的进程，调用另外一台计算机 B 上的进程的方法。其中，A 上的调用进程被挂起，而 B 上的被调用进程开始执行对应方法，并将结果返回给 A；计算机 A 接收到返回值后，调用进程继续执行。</p></blockquote><p>发起 RPC 的进程通过参数等方式将信息传送给被调用方，然后被调用方处理结束后，再通过返回值将信息传递给调用方。这一过程对于开发人员来说是透明的，开发人员一般也无须知道双方底层是如何进行消息通信和信息传递的，这样可以让业务开发人员更专注于业务开发，而非底层细节。</p><p>RPC 让程序之间的远程过程调用具有与本地调用类似的形式。比如说，程序需要读取某个文件的数据，开发人员会在代码中执行 read 系统调用来获取数据。</p><p>当 read 实际是本地调用时，read 函数由链接器从依赖库中提取出来，接着链接器会将它链接到该程序中。虽然 read 中执行了特殊的系统调用，但它本身依然是通过将参数压入堆栈的常规方式调用的，调用方并不知道 read 函数的具体实现和行为。</p><p>当 read 实际是一个远程过程时（比如调用远程文件服务器提供的方法），调用方程序中需要引入 read 的接口定义，称为客户端存根（client-stub）。远程过程 read 的客户端存根与本地方法的 read 函数类似，都执行了本地函数调用。不同的是它底层实现上不是进行操作系统调用读取本地文件来提供数据，而是将参数打包成网络消息，并将此网络消息发送到远程服务器，交由远程服务执行对应的方法，在发送完调用请求后，客户端存根随即阻塞，直到收到服务器发回的响应消息为止。</p><p>下图展示了远程方法调用过程中的客户端和服务端各个阶段的操作。</p>',13),y=s("p",null,"RPC 示意图",-1),C=s("p",null,"当客户端发送请求的网络消息到达服务器时，服务器上的网络服务将其传递给服务器存根（server-stub）。服务器存根与客户端存根一一对应，是远程方法在服务端的体现，用来将网络请求传递来的数据转换为本地过程调用。服务器存根一般处于阻塞状态，等待消息输入。",-1),i=s("p",null,"当服务器存根收到网络消息后，服务器将方法参数从网络消息中提取出来，然后以常规方式调用服务器上对应的实现过程。从实现过程角度看，就好像是由客户端直接调用一样，参数和返回地址都位于调用堆栈中，一切都很正常。实现过程执行完相应的操作，随后用得到的结果设置到堆栈中的返回值，并根据返回地址执行方法结束操作。以 read 为例，实现过程读取本地文件数据后，将其填充到 read 函数返回值所指向的缓冲区。",-1),_=s("p",null,"read 过程调用完后，实现过程将控制权转移给服务器存根，它将结果（缓冲区的数据）打包为网络消息，最后通过网络响应将结果返回给客户端。网络响应发送结束后，服务器存根会再次进入阻塞状态，等待下一个输入的请求。",-1),P=s("p",null,"客户端接收到网络消息后，客户操作系统会将该消息转发给对应的客户端存根，随后解除对客户进程的阻塞。客户端存根从阻塞状态恢复过来，将接收到的网络消息转换为调用结果，并将结果复制到客户端调用堆栈的返回结果中。当调用者在远程方法调用 read 执行完毕后重新获得控制权时，它唯一知道的是 read 返回值已经包含了所需的数据，但并不知道该 read 操作到底是在本地操作系统读取的文件数据，还是通过远程过程调用远端服务读取文件数据。",-1),d=s("h3",{id:"rpc-框架的组成",tabindex:"-1"},[a("RPC 框架的组成 "),s("a",{class:"header-anchor",href:"#rpc-框架的组成","aria-label":'Permalink to "RPC 框架的组成"'},"​")],-1),T=s("p",null,"一个完整的 RPC 框架包含了服务注册发现、负载、容错、序列化、协议编码和网络传输等组件。不同的 RPC 框架包含的组件可能会有所不同，但是一定都包含 RPC 协议相关的组件，RPC 协议包括序列化、协议编解码器和网络传输栈，如下图所示：",-1),h=l('<p>RPC 框架组成图</p><p>RPC 协议一般分为公有协议和私有协议。例如，HTTP、SMPP、WebService 等都是公有协议；如果是某个公司或者组织内部自定义、自己使用的，没有被国际标准化组织接纳和认可的协议，往往划为私有协议，例如 Thrift 协议和蚂蚁金服的 Bolt 协议。</p><p>分布式架构所需要的企业内部通信模块，往往采用私有协议来设计和研发。相较公有协议，私有协议虽然有很多弊端，比如在通用性上、公网传输的能力上，但是<strong>高度定制化的私有协议</strong>可以最大限度地降低成本，提升性能，提高灵活性与效率。定制私有协议，可以有效地利用协议里的各个字段，灵活满足各种通信功能需求，比如：CRC 校验、Server Fail-Fast 机制和自定义序列化器。</p><p>在协议设计上，你还需要考虑以下三个关键问题：</p><ol><li><p>协议包括的必要字段与主要业务负载字段。协议里设计的每个字段都应该被使用到，避免无效字段。</p></li><li><p>通信功能特性的支持。比如，CRC 校验、安全校验、数据压缩机制等。</p></li><li><p>协议的升级机制。毕竟是私有协议，没有长期的验证，字段新增或者修改，是有可能发生的，因此升级机制是必须考虑的。</p></li></ol><h3 id="rpc-和-http-概念解析" tabindex="-1">RPC 和 HTTP 概念解析 <a class="header-anchor" href="#rpc-和-http-概念解析" aria-label="Permalink to &quot;RPC 和 HTTP 概念解析&quot;">​</a></h3><p>RPC 和 HTTP 都是微服务间通信较为常用的方案之一，所以 RPC 和 HTTP 这两个概念经常被拿来一起比较，今天我们就来彻底讲清楚这两个概念之间的关系。</p><p>其实，<strong>RPC 和 HTTP 并不完全是同一个层次的概念。</strong></p><p>RPC 是远程过程调用，其调用协议通常包括序列化协议和传输协议。序列化协议有基于纯文本的 XML 和 JSON、二进制编码的 Protobuf 和 Hessian。传输协议是指其底层网络传输所使用的协议，比如 TCP、HTTP。</p><p>可以看出 <strong>HTTP 是 RPC 的传输协议的一个可选方案</strong>，比如说 gRPC 的网络传输协议就是 HTTP。</p>',10),g=l(`<p>RPC 和 HTTP 关系示意图</p><p>如上图所示，HTTP 既可以和 RPC 一样作为服务间通信的解决方案，也可以作为 RPC 中通信层的传输协议（此时与之对比的是 TCP 协议）。</p><p>HTTP 和自定义 TCP 协议都可以作为 RPC 的传输协议，二者的对比和选择也是 RPC 选型的重要考量或优化点。那么，为什么传输层协议会使用自定义的 TCP 协议呢？</p><p>你可能首先想到 HTTP 是无状态、无连接的，所以每次进行通信都要建立和断开连接，这会影响通信效率。</p><p>但实际上 HTTP 协议是支持连接池复用的，能建立一定数量的连接并且保持连接不会断开，不用频繁建立和断开连接，因此连接问题并不是优先选择自定义 TCP 协议的真正原因。</p><p>那真正的原因到底是什么呢？其实真正的原因就在于自定义 TCP 协议可以灵活地对协议字段进行定制，减少非必要字段的传输，减少网络开销；而 HTTP 协议则包含了过多无用的信息，比如头部等信息。</p><p>HTTP1.1 协议包含太多废信息，一个响应的格式大致如下：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">HTTP</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">1.0</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">OK</span></span>
<span class="line"><span style="color:#E1E4E8;">Content</span><span style="color:#F97583;">-</span><span style="color:#B392F0;">Type</span><span style="color:#E1E4E8;">: text</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">plain </span></span>
<span class="line"><span style="color:#E1E4E8;">Content</span><span style="color:#F97583;">-</span><span style="color:#B392F0;">Length</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">137582</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#B392F0;">Expires</span><span style="color:#E1E4E8;">: Thu, </span><span style="color:#79B8FF;">05</span><span style="color:#E1E4E8;"> Dec </span><span style="color:#79B8FF;">2020</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">16</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">00</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">00</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">GMT</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#E1E4E8;">Last</span><span style="color:#F97583;">-</span><span style="color:#B392F0;">Modified</span><span style="color:#E1E4E8;">: Wed, </span><span style="color:#79B8FF;">5</span><span style="color:#E1E4E8;"> August </span><span style="color:#79B8FF;">2020</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">15</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">55</span><span style="color:#E1E4E8;">:</span><span style="color:#79B8FF;">28</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">GMT</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#B392F0;">Server</span><span style="color:#E1E4E8;">: Apache</span><span style="color:#F97583;">/</span><span style="color:#79B8FF;">1.3</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">3.7</span><span style="color:#E1E4E8;"> (Unix) (Red</span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">Hat</span><span style="color:#F97583;">/</span><span style="color:#E1E4E8;">Linux) </span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">html</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">body</span><span style="color:#E1E4E8;">&gt;Hello World&lt;/</span><span style="color:#85E89D;">body</span><span style="color:#E1E4E8;">&gt; </span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">html</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">HTTP</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">1.0</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">200</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">OK</span></span>
<span class="line"><span style="color:#24292E;">Content</span><span style="color:#D73A49;">-</span><span style="color:#6F42C1;">Type</span><span style="color:#24292E;">: text</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">plain </span></span>
<span class="line"><span style="color:#24292E;">Content</span><span style="color:#D73A49;">-</span><span style="color:#6F42C1;">Length</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">137582</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#6F42C1;">Expires</span><span style="color:#24292E;">: Thu, </span><span style="color:#005CC5;">05</span><span style="color:#24292E;"> Dec </span><span style="color:#005CC5;">2020</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">16</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">00</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">00</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">GMT</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#24292E;">Last</span><span style="color:#D73A49;">-</span><span style="color:#6F42C1;">Modified</span><span style="color:#24292E;">: Wed, </span><span style="color:#005CC5;">5</span><span style="color:#24292E;"> August </span><span style="color:#005CC5;">2020</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">15</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">55</span><span style="color:#24292E;">:</span><span style="color:#005CC5;">28</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">GMT</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#6F42C1;">Server</span><span style="color:#24292E;">: Apache</span><span style="color:#D73A49;">/</span><span style="color:#005CC5;">1.3</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">3.7</span><span style="color:#24292E;"> (Unix) (Red</span><span style="color:#D73A49;">-</span><span style="color:#24292E;">Hat</span><span style="color:#D73A49;">/</span><span style="color:#24292E;">Linux) </span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">html</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">body</span><span style="color:#24292E;">&gt;Hello World&lt;/</span><span style="color:#22863A;">body</span><span style="color:#24292E;">&gt; </span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">html</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>从中可以看出，其返回的数据很少，其他大部分都是元数据。至于 HTTP 协议和 TCP 自定义协议的详细对比，如下图所示，可以看出自定义 TCP 协议传输相同信息时所要传递的数据量更少，所以网络通信更快，所需开销也更少。</p>`,9),F=l('<p>HTTP 协议和自定义 TCP 协议对比图</p><h3 id="常见的-prc-框架" tabindex="-1">常见的 PRC 框架 <a class="header-anchor" href="#常见的-prc-框架" aria-label="Permalink to &quot;常见的 PRC 框架&quot;">​</a></h3><p>目前流行的开源 RPC 框架还是比较多的，有阿里巴巴的 Dubbo、Google 的 gRPC、Facebook 的 Thrift 和 Twitter 的 Finagle 等。</p><p>今天我们简单介绍下 Go RPC、gRPC 和 Thrift 这三种常见的框架，在后续的课程中我们还会对其进行详细讲解。</p><ul><li><p>Go RPC：Go 语言原生支持的 RPC 远程调用机制，简单便捷，非常适合你了解和学习 RPC 的入门框架。</p></li><li><p>gRPC：Google 发布的开源 RPC 框架，是基于 HTTP 2.0 协议的，并支持众多常见的编程语言，它提供了强大的流式调用能力，目前已经成为最主流的 RPC 框架之一。</p></li><li><p>Thrift：Facebook 的开源 RPC 框架，主要是一个跨语言的服务开发框架，作为老牌开源 RPC 协议，以其高性能和稳定性成为众多开源项目提供数据的方案选项。</p></li></ul><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3><p>本课时我们首先详细介绍了微服务之间的远程方法调用过程，以及这过程中客户端和服务端的行为；然后讲解了 RPC 框架的组成，以及与 HTTP 两个概念的对比解析；最后我们还简单介绍了目前主流的 RPC 框架。</p><p>那你熟悉或在用的 RPC 框架是哪一个呢？欢迎你在留言区进行回复和讨论。</p>',8);function R(A,u,m,b,B,H){const n=e("Image");return t(),r("div",null,[E,p(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/43/EE/Ciqc1F887amAAUAAAABlfyr8G5Q880.png"}),a(),y,C,i,_,P,d,T,p(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/43/EE/Ciqc1F887bWAQUMOAACCOORZi64063.png"}),a(),h,p(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/43/F9/CgqCHl887caASe2qAABl7rQTtnA599.png"}),a(),g,p(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/43/EE/Ciqc1F887d6AYkrdAACqqdChrI0328.png"}),a(),F])}const S=o(c,[["render",R]]);export{f as __pageData,S as default};
