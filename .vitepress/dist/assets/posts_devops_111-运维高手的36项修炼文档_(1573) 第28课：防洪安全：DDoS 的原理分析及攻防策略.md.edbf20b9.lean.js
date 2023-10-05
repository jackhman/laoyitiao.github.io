import{_ as e,j as n,o as a,g as _,k as o,Q as i,s as t,h as l}from"./chunks/framework.4e7d56ce.js";const U=JSON.parse('{"title":"DDOS 攻击的痛点和类型 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/111-运维高手的36项修炼文档/(1573) 第28课：防洪安全：DDoS 的原理分析及攻防策略.md","filePath":"posts/devops/111-运维高手的36项修炼文档/(1573) 第28课：防洪安全：DDoS 的原理分析及攻防策略.md","lastUpdated":1696417798000}'),c={name:"posts/devops/111-运维高手的36项修炼文档/(1573) 第28课：防洪安全：DDoS 的原理分析及攻防策略.md"},p=i("",8),d=t("p",null,"我们会看到，正常访问是客户 A，服务端 B，用户 A 请求服务端 B，返回正常响应。",-1),D=t("p",null,"第二幅图中呢，我们可以看到 A 来请求 B， B 返回的响应不再是给 A，而是响应给 C（另外一个客户端），A 可以通过一些特殊技术方式来实现，比如伪造自己的源 IP 地址，并利用一些 B 的协议类安全类漏洞，这样就导致 A 请求了 B，但是 B 却响应到了 C。",-1),h=t("p",null,"通常 B 服务存漏洞，如 DNS 协议漏洞，memcache 漏洞，以及 NTP 协议漏洞等，这些服务都有漏洞可以导致这样的一种攻击效果，并且可以造成放大的流量攻击，让 B 响应 C 的流量远远大于 A 请求的流量。",-1),r=t("p",null,"那么我们来看一下第三幅图，当一个黑客利用这个漏洞对带有这个种特征的客户端发起了批量请求，用很小的代价请求这些肉鸡，全部响应到黑客期望攻击的目标地址，这样就会造成 C 端被放大流量攻击，这种攻击的通过海量的肉鸡发包造成攻击端的网络流量被打满。网络流量被打满是一种非常简单粗暴的方式，但这种攻击行为的损害性非常大，所以我们应该怎么去防范这种行为呢？",-1),C=t("p",null,"首先是通过接入第三方安全厂商作流量清洗 ，因为流量清洗需要投入很大的技术成本，所以一般情况下会采用第三方进行流量清洗。",-1),g=t("p",null,"我们可以看一下这样一张图，当海量的用户请求服务端的时候，先经过第三方流量清洗的一层设备，由第三方来进行异常流量的识别，并且进行过滤，最终把正常的流量，图中红色这根线的正常流量能够穿透到服务端，来保证正常的服务不会受到影响。",-1),u=t("p",null,"如果你不希望去花大价钱去购买第三方流量清洗服务，那么这个时候可能就需要考虑用一些自建的方式去解决，但是这种方式成本和技术投入又非常高，如果你也不想去花大代价自建防御体系，这个时候我给你推荐另外一种解决方式，就是通过 CDN 来做反向代理。我们知道 CDN 是内容分发的网络，它可以把网站内的静态资源分发到很多与用户贴近的节点，并且提供对应的一些代理类服务。那么 CDN 为什么能帮我们解决这样的一些问题？我们知道 CDN 有很多个这样的节点，假设 A 的流量到达 CDN 节点，就会让 CDN 帮我们阻挡一层访问，不会把流量直接打到真实服务端 C。",-1),S=t("p",null,"我们可以理解为通过海量的边缘的 CDN 节点，可以帮助我们保护后台的原栈节点，当然这里面的技术一定要做到把所有后台服务的真实地址进行隐藏，通常是把所有的真实服务都通过 CDN 的方式进行代理，从而保证服务端不会直接对外暴露，并且被黑客拿到我们服务端直接访问的地址。",-1),m=t("p",null,"那么这就是通过 CDN 的方案来解决问题，它的好处在于它的成本非常低，只需要把后台网站隐藏到 CDN 的服务中，这样其实也可以帮助我们隐藏真实的服务端，并且通过 CDN 的单个节点去扛某一部分 DDOS 的流量攻击，而不会导致整体的服务受到很大影响。",-1),A=t("p",null,"类似这样解决方式还有 anycast，什么是 anycast 接入，我会在后面课时中给你介绍。",-1),T=t("h3",{id:"syn-flood-攻击及其解决方法",tabindex:"-1"},[l("SYN FLOOD 攻击及其解决方法 "),t("a",{class:"header-anchor",href:"#syn-flood-攻击及其解决方法","aria-label":'Permalink to "SYN FLOOD 攻击及其解决方法"'},"​")],-1),P=t("p",null,"第二种 DDOS 攻击类型就是 SYN FLOOD 攻击，它具有这样的一些特性，它虽然也使用了大量肉鸡进行访问，这些肉鸡是一直不停地发底层 TCP SYN+ACK 的数据包，它会有针对性地对这种数据频繁地发送 SYN+ACK 的 TCP 数据包，并不是单纯的封堵出口流量，可以实现服务端一直处于 TCP 等待连接（TCP 第 3 次握手）。",-1),O=t("p",null,"我们在前面的课时里有讲到过，在 Linux 系统上Sync_backlog 的网卡队列，用于记录 TCP 三次握手里面最后一次会话的一些相关信息。如果大量客户端来伪造原客户端的地址，导致这些服务端一直得不到 TCP 完整地建立起三次握手，就会导致 Sync_backlog 的队列跑满了，导致服务端无法响应正常的连接。",-1),N=t("p",null,"对于 Linux 系统优化而言，我们可以通过内核的方式去做，在前面的课时里面我们讲过，主要有如下几个方法：",-1),f=t("ul",null,[t("li",null,"增大 tcp_max_syn_backlog，也就是把这个队列增大；"),t("li",null,"减小 tcp_synack_retries 的次数；"),t("li",null,"启用 tcp_syncookies 的校验机制，来得到系统上的预防和优化。")],-1),H=t("p",null,"我们被海量的肉鸡，用真实的用户地址进行访问的情况下，那边也是建议采购一些第三方的流量清洗，来做更加细致的识别和过滤。",-1),b=t("p",null,"以上就是对于 SYN FLOOD 攻击的介绍和对应的一些防范策略的讲解。",-1),F=t("h3",{id:"http-flood-攻击及其解决策略",tabindex:"-1"},[l("HTTP FLOOD 攻击及其解决策略 "),t("a",{class:"header-anchor",href:"#http-flood-攻击及其解决策略","aria-label":'Permalink to "HTTP FLOOD 攻击及其解决策略"'},"​")],-1),k=t("p",null,"接下来是最后一种 DDOS 攻击类型，就是 HTTP FLOOD 攻击。相比 SYN FLOOD 攻击而言，它会更加具备针对性（针对 HTTP 服务）。攻击者通过大量代理或僵尸主机向目标服务器发起大量 HTTP 报文。我们知道 HTTP 是在应用层协议，海量请求会直接请求你的真实的服务，特别是抓住你服务上一些响应慢的接口，如数据库操作的 URI 或其他消耗系统资源的 URL，这样一旦发起大量的真实的用户的访问，就可以有效的造成你的服务端资源很容易就被耗尽，无法响应对应的一些请求。",-1),x=t("p",null,"这样的特点完全模拟了一个正常的 HTTP 服务的请求。我们通过一些已有的机制是比较难去分析的。通过运维的解决方案来看，我们通常可以通过以下几点方式去尝试分析和解决。",-1),B=t("p",null,"首先我们可以考虑开启源 IP 限流的方式，避免单个 IP 的频繁访问。它的优点是非常容易实现，但是会存在误杀真实用户的情况，比如有一些用户它确实会频繁地访问你的网站，或者是有一些用户由于网络结构的原因，会存在单个 IP 频繁访问，那么这个时候确实会误杀很小的一部分真实的用户。",-1),I=t("p",null,"开发通常的解决方案是，考虑开启一些更加有难度的验证码的校验机制来验证访问。比如频繁地访问某一个页面 10 次或者是某一个固定次数以上，就开启一个验证码的校验才能够允许访问。这种方式的准确性非常高，不会存在太大的误杀。但会影响用户的体验，假设我是一个真实的用户，我非常喜欢这个网站，可能刷的次数比较多，这种情况就会影响用户的体验。",-1),L=t("p",null,"最后一种方式当然就是商业的解决方案，通过第三方帮我们解决这个问题。这种方式的准确度高，人员投入低，但是确实需要企业花一定的资金去帮助解决这样的一些问题。",-1),q=t("p",null,"那么关于更多 DDOS 攻击，如果你还有疑问，欢迎去网上去搜索更多资料，或者直接和我交流沟通，那本课时的内容就到这里，谢谢。",-1);function y(X,Y,V,M,G,v){const s=n("Image");return a(),_("div",null,[p,o(s,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/17/52/Ciqc1F7XGfiAKxguAABXbJVWs34227.png"}),d,o(s,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/17/52/Ciqc1F7XGgeAKCTmAACZ2aWSUnA297.png"}),D,h,o(s,{alt:"3.png",src:"https://s0.lgstatic.com/i/image/M00/17/52/Ciqc1F7XGhCALO3jAAHVahXZDWQ149.png"}),r,C,o(s,{alt:"4.png",src:"https://s0.lgstatic.com/i/image/M00/17/5E/CgqCHl7XGheANnbxAADZIVo1jAY000.png"}),g,u,o(s,{alt:"5.png",src:"https://s0.lgstatic.com/i/image/M00/17/5E/CgqCHl7XGh6AJUcsAADJmlpjZoc188.png"}),S,m,A,T,P,o(s,{alt:"6.png",src:"https://s0.lgstatic.com/i/image/M00/17/5E/CgqCHl7XGiaAPMPyAADmT73CQo0190.png"}),O,N,f,H,o(s,{alt:"7.png",src:"https://s0.lgstatic.com/i/image/M00/17/52/Ciqc1F7XGi6Ac2iHAACnXQYDWPk228.png"}),b,F,k,x,B,I,L,q])}const j=e(c,[["render",y]]);export{U as __pageData,j as default};
