import{_ as r,j as p,o as _,g as o,k as i,h as l,Q as t,s as e}from"./chunks/framework.4e7d56ce.js";const f=JSON.parse('{"title":"第02讲（上）：操作系统与计算机网络","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/036_32个Java面试必考点/(3) 第02讲（上）：操作系统与计算机网络.md","filePath":"posts/backEnd/036_32个Java面试必考点/(3) 第02讲（上）：操作系统与计算机网络.md","lastUpdated":1696417798000}'),n={name:"posts/backEnd/036_32个Java面试必考点/(3) 第02讲（上）：操作系统与计算机网络.md"},C=t('<h1 id="第02讲-上-操作系统与计算机网络" tabindex="-1">第02讲（上）：操作系统与计算机网络 <a class="header-anchor" href="#第02讲-上-操作系统与计算机网络" aria-label="Permalink to &quot;第02讲（上）：操作系统与计算机网络&quot;">​</a></h1><p>本课时主要介绍面试中经常考察的计算机基础知识以及 Java 语言特性。其中，计算机的基础知识是工程师基本能力的体现，也是面试前必须要牢牢掌握的部分。</p><p>本课时结构如下：</p><ol><li><p>面试中经常考察的知识点汇总，方便系统化复习；</p></li><li><p>对 TCP 协议、设计模式、Java 基础知识进行详细讲解；</p></li><li><p>从面试官角度，总结上述部分内容在面试时的考察点；</p></li><li><p>提供一些面试真题及重点题目解题思路。</p></li></ol><h6 id="操作系统知识点" tabindex="-1">操作系统知识点 <a class="header-anchor" href="#操作系统知识点" aria-label="Permalink to &quot;操作系统知识点&quot;">​</a></h6><p>先看操作系统相关知识的汇总，如下图所示。操作系统知识对于服务问题的排查定位十分重要，在面试时一般以了解和应用考察为主，面试题目占的比重一般不会太高。</p>',6),T=t('<h6 id="进程与线程" tabindex="-1">进程与线程 <a class="header-anchor" href="#进程与线程" aria-label="Permalink to &quot;进程与线程&quot;">​</a></h6><p>上图左上角的进程与线程部分是一个非常重要的考察点。</p><ol><li><p>首先需要掌握进程与线程的区别和联系：</p><ol><li><p>进程是系统资源分配的最小单位，线程是程序执行的最小单位；</p></li><li><p>进程使用独立的数据空间，而线程共享进程的数据空间。</p></li></ol></li><li><p>线程调度，简单了解线程的几种调度算法就可以了。比如时间片轮转调度、先来先服务调度、优先级调度、多级反馈队列调度以及高响应比优先调度。</p></li><li><p>线程切换的步骤，主要是了解线程的上下文切换，明白线程切换的代价。关于线程的知识在后面的多线程课程中还会有详细讲解，这里先略过。</p></li><li><p>在进程与线程部分还有一个比较常见的考察点，就是进程间通信，也就是 IPC。这部分在面试中间件研发的相关职位时经常会考察。如上面知识点汇总图中所示，需要了解这 6 种进程通信方式的原理与适用场景。例如，进程间数据共享的场景可以使用共享内存；进程间数据交换的场景可以使用 Unix Socket 或者消息队列。</p></li><li><p>最后协程部分，简单了解协程更轻量化，是在用户态进行调度，切换的代价比线程上下文切换要低很多就可以了，也可以了解 Java 的第三方协程框架，例如 Kilim、Quasar 等。</p></li></ol><h6 id="linux-常用命令" tabindex="-1">Linux 常用命令 <a class="header-anchor" href="#linux-常用命令" aria-label="Permalink to &quot;Linux 常用命令&quot;">​</a></h6><p>大部分互联网公司的服务都是在 Linux 系统上运行的，因此 Linux 命令也是面试时的常考点，这部分其实主要考察的是候选人是否有线上问题的排查经验，重点学习 AWK、top、netstat、grep 等高频使用的工具。</p><p>还有一些知识点不常考，做适当了解，例如内存分页管理与 Swap 机制、任务队列与 CPU Load 等，这些知识在分析线上问题中十分有用。</p><h6 id="扩展知识" tabindex="-1">扩展知识 <a class="header-anchor" href="#扩展知识" aria-label="Permalink to &quot;扩展知识&quot;">​</a></h6><p>最后是扩展知识点，例如内存屏障、指令乱序、分支预测、NUMA 与 CPU 亲和性等，如果在面试时有机会谈到的话，会在知识深度上给面试官留下比较好的印象。</p><h6 id="计算机网络知识点" tabindex="-1">计算机网络知识点 <a class="header-anchor" href="#计算机网络知识点" aria-label="Permalink to &quot;计算机网络知识点&quot;">​</a></h6><p>计算机网络也是非常重要的基础知识，服务之间通过不同的网络协议进行交互，例如 HTTP 协议、RPC 协议等，在 Java 面试中网络知识被考到的几率非常大。网络知识点汇总如下图。</p><br>',11),s=t('<p>首先你应该深刻理解网络的 4/7 层模型，这是网络知识的基础。</p><p>另外两个非常重要的网络协议就是 HTTP 和 TCP 了，这两个协议也是服务交互中使用最多的协议。先来看 TCP 协议，TCP 协议中的三次握手建连与四次挥手断连是一个高频考点，后面会详细介绍。</p><ul><li><p>TCP 的报文状态标志与链接状态，在排查网络问题时非常重要，必须要明白协议状态，才方便抓包分析。</p></li><li><p>另一个知识点是 Nagel 算法和 ACK 延迟，需要了解产生的背景，是要解决小包问题，提高数据载荷比。知道对于延迟比较敏感且发送数据频率较低的场景可以关闭 Nagel 算法。</p></li><li><p>关于 TCP 的 Keepalive，是一种长时间没有数据发送的场景下，TCP 保持链接可用的机制，需要知道 TCP Keepalive 的开启和设置方式。</p></li><li><p>最后一点，需要明白 TCP 是如何通过滑动窗口机制来实现流量控制的。</p></li></ul><p>再来看 HTTP 协议部分。</p><ul><li><p>需要掌握 HTTP 协议的规范，知道协议中的 Method、Header、Cookies，需要了解常见状态码的含义，例如 404、503、302 等。</p></li><li><p>另外还有 HTTPS 的交互流程。</p></li><li><p>HTTP2 目前还比较新，对 HTTP2 协议的了解可以在一定程度上体现对新技术的关注程度。可以关注：HTTP2 多路复用、Stream 流式交互、流量控制、服务端推送、头部压缩等新特性</p></li></ul><br><p>除了 HTTP 和 TCP 外，UDP 也是一个比较常见的传输层协议，UDP 的特点是非链接、非可靠传输，但是效率非常高。</p><p>最后可以对 QUIC 协议进行一些了解，QUIC 已经被标准化为 HTTP3 协议。QUIC 是基于 UDP 协议，但 QUIC 提供了类似 TCP 的可靠性保证和流量控制。QUIC 可以有效避免 HTTP2 协议的前序包阻塞问题，能实现零 RTT 建连，提供 FEC 前向纠错能力。</p><h6 id="详解-tcp-协议特点" tabindex="-1">详解 TCP 协议特点 <a class="header-anchor" href="#详解-tcp-协议特点" aria-label="Permalink to &quot;详解 TCP 协议特点&quot;">​</a></h6><p>TCP 是传输层协议，对应 OSI 网络模型的第四层传输层，特点如下。</p><ul><li><p>TCP 协议是基于链接的，也就是传输数据前需要先建立好链接，然后再进行传输。</p></li><li><p>TCP 链接一旦建立，就可以在链接上进行双向的通信。</p></li><li><p>TCP 的传输是基于字节流而不是报文，将数据按字节大小进行编号，接收端通过 ACK 来确认收到的数据编号，通过这种机制，TCP 协议能够保证接收数据的有序性和完整性，因此 TCP 能够提供可靠性传输。</p></li><li><p>TCP 还能提供流量控制能力，通过滑动窗口来控制数据的发送速率。滑动窗口的本质是动态缓冲区，接收端根据自己的处理能力，在 TCP 的 Header 中动态调整窗口大小，通过 ACK 应答包通知给发送端，发送端根据窗口大小调整发送的的速度。</p></li><li><p>仅仅有了流量控制能力还不够，TCP 协议还考虑到了网络问题可能会导致大量重传，进而导致网络情况进一步恶化，因此 TCP 协议还提供拥塞控制。TCP 处理拥塞控制主要用到了慢启动、拥塞避免、拥塞发生、快速恢复四个算法，感兴趣的同学可以进一步了解。</p></li></ul><br><p>除了 TCP 协议的特点，还可以进一步了解 TCP 协议的报文状态、滑动窗口的工作流程、 Keepalive 的参数设置和 Nagel 算法的规则等一些细节。</p><p>另外还有典型的 TCP 协议问题，例如特定场景下 Nagel 和 ACK 延迟机制配合使用可能会出现 delay40ms 超时后才回复 ACK 包的问题。</p><h6 id="详解三次握手建连" tabindex="-1">详解三次握手建连 <a class="header-anchor" href="#详解三次握手建连" aria-label="Permalink to &quot;详解三次握手建连&quot;">​</a></h6><p>接下来看 TCP 建连的三次握手。TCP 是基于链接的，所以在传输数据前需要先建立链接，TCP 在传输上是双工传输，不区分 Client 端与 Server 端，为了便于理解，我们把主动发起建连请求的一端称作 Client 端，把被动建立链接的一端称作 Server 端。</p><p>如下图，建连的时序是从上到下，左右两边的绿色字分别代表 Client 端与 Server 端当时的链接状态。</p><br>',18),c=e("p",null,"首先建立链接前需要 Server 端先监听端口，因此 Server 端建立链接前的初始状态就是 LISTEN 状态，这时 Client 端准备建立链接，先发送一个 SYN 同步包，发送完同步包后，Client 端的链接状态变成了 SYN_SENT 状态。Server 端收到 SYN 后，同意建立链接，会向 Client 端回复一个 ACK。",-1),S=e("p",null,"由于 TCP 是双工传输，Server 端也会同时向 Client 端发送一个 SYN，申请 Server 向 Client 方向建立链接。发送完 ACK 和 SYN 后，Server 端的链接状态就变成了 SYN_RCVD。",-1),P=e("p",null,"Client 收到 Server 的 ACK 后，Client 端的链接状态就变成了 ESTABLISHED 状态，同时，Client 向 Server 端发送 ACK，回复 Server 端的 SYN 请求。",-1),h=e("p",null,"Server 端收到 Client 端的 ACK 后，Server 端的链接状态也就变成了的 ESTABLISHED 状态，此时建连完成，双方随时可以进行数据传输。",-1),d=e("p",null,"在面试时需要明白三次握手是为了建立双向的链接，需要记住 Client 端和 Server 端的链接状态变化。另外回答建连的问题时，可以提到 SYN 洪水攻击发生的原因，就是 Server 端收到 Client 端的 SYN 请求后，发送了 ACK 和 SYN，但是 Client 端不进行回复，导致 Server 端大量的链接处在 SYN_RCVD 状态，进而影响其他正常请求的建连。可以设置 tcp_synack_retries = 0 加快半链接的回收速度，或者调大 tcp_max_syn_backlog 来应对少量的 SYN 洪水攻击",-1),A=e("h6",{id:"详解四次挥手断连",tabindex:"-1"},[l("详解四次挥手断连 "),e("a",{class:"header-anchor",href:"#详解四次挥手断连","aria-label":'Permalink to "详解四次挥手断连"'},"​")],-1),v=e("p",null,"再来看看 TCP 的断连，如下图所示。",-1),u=e("br",null,null,-1),I=t("<p>TCP 链接的关闭，通信双方都可以先发起，我们暂且把先发起的一方看作 Client，从图中看出，通信中 Client 和 Server 两端的链接都是 ESTABLISHED 状态，然后 Client 先主动发起了关闭链接请求，Client 向 Server 发送了一个 FIN 包，表示 Client 端已经没有数据要发送了，然后 Client 进入了 FIN_WAIT_1 状态。</p><p>Server 端收到 FIN 后，返回 ACK，然后进入 CLOSE_WAIT 状态。此时 Server 属于半关闭状态，因为此时 Client 向 Server 方向已经不会发送数据了，可是 Server 向 Client 端可能还有数据要发送。</p><p>当 Server 端数据发送完毕后，Server 端会向 Client 端发送 FIN，表示 Server 端也没有数据要发送了，此时 Server 进入 LAST_ACK 状态，就等待 Client 的应答就可以关闭链接了。</p><p>Client 端收到 Server 端的 FIN 后，回复 ACK，然后进入 TIME_WAIT 状态。TIME_WAIT 状态下需要等待 2 倍的最大报文段生存时间，来保证链接的可靠关闭，之后才会进入 CLOSED 关闭状态。而 Server 端收到 ACK 后直接就进入 CLOSED 状态。</p><p>这里面试官可能会问为什么需要等待 2 倍最大报文段生存时间之后再关闭链接，原因有两个：</p><ol><li><p>保证 TCP 协议的全双工连接能够可靠关闭；</p></li><li><p>保证这次连接的重复数据段从网络中消失，防止端口被重用时可能产生数据混淆。</p></li></ol><p>从这个交互流程可以看出，无论是建连还是断链，都是需要在两个方向上进行，只不过建连时，Server 端的 SYN 和 ACK 合并为一次发送，而断链时，两个方向上数据发送停止的时间可能不同，所以不能合并发送 FIN 和 ACK。这就是建连三次握手而断链需要四次的原因。</p><p>另外回答断链的问题时，可以提到实际应用中有可能遇到大量 Socket 处在 TIME_WAIT 或者 CLOSE_WAIT 状态的问题。一般开启 tcp_tw_reuse 和 tcp_tw_recycle 能够加快 TIME-WAIT 的 Sockets 回收；而大量 CLOSE_WAIT 可能是被动关闭的一方存在代码 bug，没有正确关闭链接导致的。</p>",8);function m(N,E,b,g,k,x){const a=p("Image");return _(),o("div",null,[C,i(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/6E/CgotOV13hveADW6kAAHI_mwTaq0672.png"}),l(),T,i(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/4E/CgoB5l13hviANIAQAAJGI9kixgc615.png"}),l(),s,i(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/6E/CgotOV13hviAU5H3AAAyMppFmf8039.png"}),l(),c,S,P,h,d,A,v,u,i(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8A/4E/CgoB5l13hviAZRJ1AABEfmQ55Jw991.png"}),l(),I])}const H=r(n,[["render",m]]);export{f as __pageData,H as default};
