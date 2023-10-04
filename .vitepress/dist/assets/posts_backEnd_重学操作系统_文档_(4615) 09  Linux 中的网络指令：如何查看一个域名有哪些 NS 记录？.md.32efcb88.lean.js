import{_ as c,j as l,o as n,g as p,k as a,Q as s,s as o,h as e}from"./chunks/framework.e0c66c3f.js";const B=JSON.parse('{"title":"远程操作指令 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/重学操作系统_文档/(4615) 09  Linux 中的网络指令：如何查看一个域名有哪些 NS 记录？.md","filePath":"posts/backEnd/重学操作系统_文档/(4615) 09  Linux 中的网络指令：如何查看一个域名有哪些 NS 记录？.md","lastUpdated":1696338709000}'),i={name:"posts/backEnd/重学操作系统_文档/(4615) 09  Linux 中的网络指令：如何查看一个域名有哪些 NS 记录？.md"},d=s("",10),r=s("",1),_=s("",4),h=s("",7),g=s("",5),u=o("p",null,[e("如上图，我们看到的是 socket 文件。socket 是网络插槽被抽象成了文件，负责在客户端、服务器之间收发数据。当客户端和服务端发生连接时，客户端和服务端会同时各自生成一个 socket 文件，用于管理这个连接。这里，可以用"),o("code",null,"wc -l"),e("数一下有多少个"),o("code",null,"socket"),e("。")],-1),A=o("p",null,"你可以看到一共有 615 个 socket 文件，因为有很多 socket 在解决进程间的通信。就是将两个进程一个想象成客户端，一个想象成服务端。并不是真的有 600 多个连接着互联网的请求。",-1),T=o("p",null,[o("strong",null,"查看 TCP 连接")],-1),P=o("p",null,[e("如果想看有哪些 TCP 连接，可以使用"),o("code",null,"netstat -t"),e("。比如下面我通过"),o("code",null,"netstat -t"),e("看"),o("code",null,"tcp"),e("协议的网络情况：")],-1),m=o("p",null,[e("这里没有找到连接中的"),o("code",null,"tcp"),e("，因为我们这台虚拟机当时没有发生任何的网络连接。因此我们尝试从机器"),o("code",null,"u2"),e("（另一台机器）ssh 登录进"),o("code",null,"u1"),e("，再看一次：")],-1),D=o("p",null,"如上图所示，可以看到有一个 TCP 连接了。",-1),C=o("p",null,[o("strong",null,"查看端口占用")],-1),S=o("p",null,"还有一种非常常见的情形，我们想知道某个端口是哪个应用在占用。如下图所示：",-1),q=s("",5),k=s("",4),b=o("p",null,[e("telnet 执行后会进入一个交互式的界面，比如这个时候，我们输入下图中的文字就可以发送 HTTP 请求了。如果你对 HTTP 协议还不太了解，建议自学一下 HTTP 协议。如果希望和林老师一起学习，可以等待下我之后的《"),o("strong",null,"计算机网络"),e("》专栏。")],-1),E=s("",5),f=o("p",null,[e("我们看到拉勾网 "),o("a",{href:"http://www.lagou.comw",target:"_blank",rel:"noreferrer"},"www.lagou.com"),e(" 是一个别名，它的原名是 lgmain 开头的一个域名，这说明拉勾网有可能在用 CDN 分发主页（关于 CDN，我们《计算机网络》专栏见）。")],-1),N=o("p",null,"上图中，可以找到 3 个域名对应的 IP 地址。",-1),y=o("p",null,[e("如果想追查某种类型的记录，可以使用"),o("code",null,"host -t"),e("。比如下图我们追查拉勾的 AAAA 记录，因为拉勾网还没有部署 IPv6，所以没有找到。")],-1),I=o("h4",{id:"dig",tabindex:"-1"},[e("dig "),o("a",{class:"header-anchor",href:"#dig","aria-label":'Permalink to "dig"'},"​")],-1),x=o("p",null,[o("code",null,"dig"),e("指令也是一个做 DNS 查询的。不过"),o("code",null,"dig"),e("指令显示的内容更详细。下图是"),o("code",null,"dig"),e("拉勾网的结果。")],-1),w=s("",6),M=s("",13);function H(V,F,R,v,j,L){const t=l("Image");return n(),p("div",null,[d,a(t,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/5A/68/CgqCHl92j8GAMNHAAAPCrIyhHHk744.png"}),r,a(t,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/5A/68/CgqCHl92j8mAIMPdAACTOATTrQM694.png"}),_,a(t,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/5A/5D/Ciqc1F92j9OADjTcAAPER8w5DNg904.png"}),h,a(t,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/5A/5D/Ciqc1F92j9yAaioXAAbz00ZJYlw555.png"}),g,a(t,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/5A/5D/Ciqc1F92j-aAAZlfAAizLye7uc4727.png"}),u,a(t,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/5A/5D/Ciqc1F92j-2AVEYjAAA8xcVMQzc068.png"}),A,T,P,a(t,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/5A/68/CgqCHl92j_aAbxdlAAEAdzG3a2s636.png"}),m,a(t,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/5A/68/CgqCHl92kAaAMuMDAAFWQdSNGfk978.png"}),D,C,S,a(t,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/5A/5D/Ciqc1F92kBKAHr2RAAEnmEOZ8RM010.png"}),q,a(t,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/5A/68/CgqCHl92kB-ARKR5AAP30Xk0nBg068.png"}),k,a(t,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image/M00/5A/68/CgqCHl92kCmAcPQzAADcRdxOtdw609.png"}),b,a(t,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image/M00/5A/5D/Ciqc1F92kDKAcYUbAASLFyOyBg4948.png"}),E,a(t,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image/M00/5A/5D/Ciqc1F92kD6AOJPQAAGW1va0D9c041.png"}),f,N,y,a(t,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image/M00/5A/68/CgqCHl92kFWAHIqAAACvpo6qaOs100.png"}),I,x,a(t,{alt:"Drawing 14.png",src:"https://s0.lgstatic.com/i/image/M00/5A/69/CgqCHl92kGaADOhxAAR-BfryZ5g689.png"}),w,a(t,{alt:"Drawing 15.png",src:"https://s0.lgstatic.com/i/image/M00/5A/5D/Ciqc1F92kG-AJPyrAANJZYQ4u5w784.png"}),M])}const G=c(i,[["render",H]]);export{B as __pageData,G as default};
