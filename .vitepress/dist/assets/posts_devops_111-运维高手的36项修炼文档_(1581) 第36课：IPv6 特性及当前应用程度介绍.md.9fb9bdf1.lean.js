import{_ as v,D as o,o as s,g as p,J as a,h as e,Q as t,m as I}from"./chunks/framework.f67d7268.js";const x=JSON.parse('{"title":"第36课：IPv6特性及当前应用程度介绍","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/111-运维高手的36项修炼文档/(1581) 第36课：IPv6 特性及当前应用程度介绍.md","filePath":"posts/devops/111-运维高手的36项修炼文档/(1581) 第36课：IPv6 特性及当前应用程度介绍.md","lastUpdated":1696682708000}'),i={name:"posts/devops/111-运维高手的36项修炼文档/(1581) 第36课：IPv6 特性及当前应用程度介绍.md"},_=t("",5),r=t("",14),n=I("p",null,"双栈的实现方式是改造最为彻底的一种方式，它使应用系统、链路系统、支撑系统、终端系统的一切软硬件具备同时支持并处理 IPv4 和 IPv6 两套协议栈的能力。所以双栈的模式是最为彻底的一套模式，但是它的整体改造成本非常大，需要投入很大的人力和技术成本，以及资源上的成本。",-1),l=I("p",null,"另外两种，一个是协议的映射方式和应用层代理，相对来说它能满足部分需求，但是无法彻底的改造 ，所以在部分应用程序的场景中还是具备一些局限性的，它只是目前一种过度的方案。",-1),c=I("p",null,"接下来我们来看一下这两种方式在访问上的一些差异，如果实现了双栈访问的模式后，服务端既能支持IPv4 也能支持 IPv6 ，所以 IPv6 地址的客户端就可以通过 访问网站IPv6 的出口来访问服务端，DNS提供IPv6的地址解析，返还 IPv6 地址，请求 IPv6 地址，然后请求得到服务端返回的数据包。",-1),h=I("p",null,"如果是 IPv4 客户端，则同样还是维持原有的请求响应模式，那么 IPv4 的客户端请求的DNS解析记录，拿到的也是IPv4 地址，同样也是请求后台的服务端。这就是双栈的访问模式。",-1),d=I("p",null,"而如果使用中间地址映射的一种过渡方式，比如通过协议映射的方式进行访问，这里的访问就略微复杂了，访问链路相对较长，下面我们来重点拿出 IPv6 客户端如何去访问 IPv6 来给你举例：",-1),u=I("p",null,"如果是 IPv6 的客户端去访问 IPv4 后台的服务端，首先它要去改造两个非常重要的设备，一个是 DNS64 Server 设备的支持，一个是 NAT64 路由器的支持，NAT64支持 IPv6 的域名解析，能返回后端 IPv4 的地址，因为（IPv6-IPv4）都做了协议映射，IPv6用户的请求还是 IPv6，但实际通过这两个设备以后，做了一个地址地转发，把 IPv6 的一个请求都转化到了后端变成 IPv4 的地址。所以这两个设备都需要做对应的改造。",-1),m=I("p",null,"那么回到这个案例里面来看，用户请求的是 IPv6 的域名，DNS64 Server 会先请求权威 DNS，看是否能直接拿到 IPv6 的地址，如果能拿到 IPv6，当然是直接返回 IPv6 地址，但是服务端目前只支持 IPv4，所以这个时候需要返回给客户端一个造之后的 IPv6 地址，相当于在原有的 IP 地址之上，把它转换成了一个 IPv6 地址给到客户端，所以 DNS64 Server 的作用就是先去查询权威 DNS，判断是否有 IPv6 地址，如果没有的话，就请求 IPv4 的域名，得到 IPv4 的地址解析，同时通过 DNS64 Server 这一层，把地址重新改成 IPv6 的地址，返回给客户端。",-1),A=I("p",null,"客户端在 DNS64 Server 里面拿到这个 IPv6 地址以后，客户端就可以正常地请求 IPv6 地址，这个时候用户就直接请求服务端后台节点，后台服务节点先要经过真实服务端前面的一层，叫作 NaT 64 的接入设备，设备同样要做地址转化，当用户拿到了目的 IP 地址以后，就要把 IPv6 地址同时转换成 IPv4 地址去请求服务端。同时，拿到服务端返回的数据包以后，再把数据包重新转换成 IPv6，并且完全是以这种地址转化方式传递。",-1),D=I("p",null,"我们看到这种方式对于用户来说是无感知的，但是对于服务端来说，其实是做了两层数据包的转换。这就是通过协议映射访问模式的访问过程。",-1);function S(C,g,q,V,N,T){const P=o("Image");return s(),p("div",null,[_,a(P,{alt:"Lark20200707-140351.png",src:"https://s0.lgstatic.com/i/image/M00/2D/CC/Ciqc1F8EEwyAfUJwAADjaCgtFPU972.png"}),e(),r,a(P,{alt:"Lark20200707-140417.png",src:"https://s0.lgstatic.com/i/image/M00/2D/CC/Ciqc1F8EEyOAOkvTAACk7MSSIwU321.png"}),e(),n,l,c,a(P,{alt:"Lark20200707-140420.png",src:"https://s0.lgstatic.com/i/image/M00/2D/CC/Ciqc1F8EEzOAOJBBAAFtj2q8hZU766.png"}),e(),h,d,a(P,{alt:"Lark20200707-140423.png",src:"https://s0.lgstatic.com/i/image/M00/2D/D7/CgqCHl8EEzqALhcCAAJBeVLjS4E787.png"}),e(),u,m,A,D])}const k=v(i,[["render",S]]);export{x as __pageData,k as default};
