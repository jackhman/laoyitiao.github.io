import{_ as o,j as e,o as t,h as c,k as p,f as n,s,Q as l}from"./chunks/framework.d3daa342.js";const gs=JSON.parse('{"title":"04XSS：劫持身份的“惯犯”","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/Web 安全攻防之道_文档/(5972) 04  XSS：劫持身份的“惯犯”.md","filePath":"posts/devops/Web 安全攻防之道_文档/(5972) 04  XSS：劫持身份的“惯犯”.md","lastUpdated":1696682708000}'),r={name:"posts/devops/Web 安全攻防之道_文档/(5972) 04  XSS：劫持身份的“惯犯”.md"},E=s("h1",{id:"_04xss-劫持身份的-惯犯",tabindex:"-1"},[n("04XSS：劫持身份的“惯犯” "),s("a",{class:"header-anchor",href:"#_04xss-劫持身份的-惯犯","aria-label":'Permalink to "04XSS：劫持身份的“惯犯”"'},"​")],-1),y=s("p",null,"你好，我是赢少良。从本讲开始，我将带你进入 Web 漏洞攻防的世界，学习一些常见的 Web 漏洞的原理、利用与防御。",-1),i=s("p",null,[n("在这些常见的Web 漏洞中，XSS（Cross-site Script，跨站脚本）漏洞无疑是最多见的。根据 HackerOne 漏洞奖励平台发布的 "),s("em",null,"The 2020 Hacker Report"),n(' ，XSS 漏洞类型占所有报告漏洞中的 23％，排名第一。因此，在"'),s("strong",null,"模块二：漏洞攻防案例"),n('"，我特意以 XSS 作为讲解的第一个漏洞类型。')],-1),F=l("",7),d=s("p",null,"图 2：常用于验证 XSS 漏洞的弹框",-1),u=s("p",null,'比如 2005 年 10 月 4 日诞生的世界上第一个 XSS 蠕虫：Samy（作者的名字）。Samy 利用网络社交媒体 MySpace的XSS 漏洞传播，受害者会自动将 Samy 本人添加为关注者，并在受害者的用户页面显示一行字串"but most of all，samy is my hero"，并再次插入恶意代码，谁访问受害者的网页谁就会被感染。',-1),g=s("p",null,"Samy 感染的用户呈指数倍增长，最终，超过 100 万用户被感染，作者也因事态发展失控而入狱，并被禁止 3 年内接触计算机，外加 90 小时的社区服务。",-1),m=s("p",null,"图 3：受 Samy 蠕虫攻击后，作者粉丝暴涨",-1),_=l("",9),h=s("p",null,"图5：利用 XSS 漏洞执行注入的JS代码",-1),A=s("p",null,'在 Chrome 浏览器中，用"检查"功能看下网页源码，可以发现我们输入的代码被解析并执行了：',-1),C=l("",7),D=l("",4),S=s("p",null,"图 8：触发漏洞弹框",-1),B=s("p",null,[n('利用 Chrome 浏览器的"检查"功能查看网页源码，可以发现刚才输入消息中的'),s("code",null,"<script>"),n("标签被解析了：")],-1),k=s("p",null,"图 9：script 标签被解析",-1),b=s("p",null,"正是它导致弹框的出现。",-1),v=s("h4",{id:"dom-型-xss",tabindex:"-1"},[n("DOM 型 XSS "),s("a",{class:"header-anchor",href:"#dom-型-xss","aria-label":'Permalink to "DOM 型 XSS"'},"​")],-1),T=s("p",null,"最后是 DOM 型 XSS 漏洞，它是基于文档对象模型（Document Object Model，DOM，用于将 Web 页面与脚本语言链接起来的标准编程接口）的一种漏洞，它不经过服务端，而是通过 URL 传入参数去触发，因此也属于反射型 XSS。",-1),q=s("p",null,"由于客户端的 JavaScript 可以访问浏览器页面中的 DOM 对象，因此它能够决定如何处理当前页面的 URL，比如获取 URL 中的相关数据进行处理，然后动态更新到页面上。这导致 DOM 型 XSS 的漏洞代码常位于网页的 JavaScript 代码中。",-1),f=s("p",null,'以 Pikachu 漏洞练习平台中的"DOM 型 XSS"题目为例：它只有一个文本输入框，外加一个"click me!"的按钮。我们先看下网页源码，看点击按钮后的回调函数。',-1),X=s("p",null,"图 10：定位按钮的回调函数",-1),x=s("p",null,"可以看到，点击后会执行一个叫 domxss 的函数。在源码内搜索下该函数。",-1),$=s("p",null,"图 11：domxss 函数",-1),w=s("p",null,'domxss 函数就 2 行代码，第一行代码先通过 document.getElementById("text").value 获取 ID 为"text"的元素内容。其实这就是输入框的内容，输入框的 ID就叫"text"。',-1),M=s("p",null,"图12：id 为 text 的输入框",-1),R=s("p",null,'第二行代码是将获取的输入框内容传递给 ID 为"dom"的元素，并将其写入 innerHTML，也就是输出到 HTML 页面中，整个过程对用户输入数据都未做任何过滤。直接输入 test 看下：',-1),H=l("",3),P=s("p",null,"图 14：利用 javascript 伪协议触发漏洞",-1),O=s("p",null,"导致 DOM 型 XSS 的相关 DOM 操作函数有很多，这里我只是举了比较常见的 innerHTML 属性设置导致的漏洞为例子，其他的还有像 eval、document.write 等可触发漏洞的数据输出位置。",-1),I=s("p",null,"网上曾有人整理了一份关于 DOM XSS 的数据污染源（Source，即用户输入数据）和漏洞触发点（Sink）的列表（虽然不够全面，但可以作为参考），如下图所示：",-1),j=l("",9),V=l("",5),L=l("",4),N=l("",7),U=s("p",null,"图 19：窃取到 Cookie",-1),G=s("p",null,"网上也有很多开源的 XSS 平台用来接收 Cookie，你在GitHub 搜索就可以找到很多，大多数可以直接通过 Docker 快速安装。",-1),J=s("p",null,"图 20：各种开源的 XSS 利用平台",-1),W=s("p",null,"获取 Cookie 后，我们就可以本地修改 Cookie 来登录受害者的账号（除非刚好窃取的 Cookie 不包含用户登录信息，比如未登录状态下访问的攻击链接），可以使用 Chrome 插件 EditThisCookie 来设置窃取的 Cookie：",-1),K=s("p",null,"图 21：EditThisCookie",-1),Y=s("p",null,'还有另一款早期业界比较常用的工具，叫"桂林老兵 Cookie 欺骗工具"，以及在《01 | 武器库：常用的渗透测试工具》中介绍的 Burp Suite，它们均支持修改 Cookie。',-1),z=s("h4",{id:"蠕虫攻击",tabindex:"-1"},[n("蠕虫攻击 "),s("a",{class:"header-anchor",href:"#蠕虫攻击","aria-label":'Permalink to "蠕虫攻击"'},"​")],-1),Q=s("p",null,"前面我介绍了 Samy 蠕虫，但并没有谈到XSS 蠕虫的实现技术。XSS 蠕虫的实现正是得益于Ajax 技术的出现，而后者正是 Web2.0 的标志性技术。",-1),Z=s("p",null,[n("Ajax（Asynchronous JavaScript and XML，异步 JavaScript 和 XML）是指一种"),s("strong",null,"创建交互式网页应用的网页开发技术"),n("。这个概念比较抽象，具体讲就是在我们浏览网页，做一些操作时，可以减少浏览器的一些页面重绘操作，避免出现页面抖动、闪现之类的不适体验。这也正是 Web2.0 带来的改变。")],-1),ss=s("p",null,"Ajax 中的核心技术就是 XMLHttpRequest，它允许 JavaScript 脚本与服务器进行通信，在不刷新页面的情况下，向服务器发送请求或是接收服务器的响应数据。",-1),ns=s("p",null,"下面我以之前影响比较大的新浪微博 XSS 蠕虫攻击事件为例，介绍 Ajax 技术在 XSS 蠕虫中的应用，从攻击代码来详细讲解。",-1),as=l("",15),ps=s("p",null,"图 23：截获剪贴内容",-1),ls=s("p",null,"比如钓鱼欺骗用户输入账号、密码：",-1),os=l("",6),es=l("",4),ts=l("",11);function cs(rs,Es,ys,is,Fs,ds){const a=e("Image");return t(),c("div",null,[E,y,i,p(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image2/M01/03/7A/Cip5yF_cObWAcn2DAAEyh5k671U380.png"}),n(),F,p(a,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image2/M01/04/3D/Cip5yF_r7ISAKpGDAAE_SLFVjcU039.png"}),n(),d,u,g,p(a,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image2/M01/04/3F/CgpVE1_r7JCAF0j6AAXp8LneUp8609.png"}),n(),m,p(a,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image2/M01/04/3D/Cip5yF_r7JyAUiNUAAYMaTTY7f0311.png"}),n(),_,p(a,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image/M00/8C/65/CgqCHl_r7LKANa2yAAEJmWv_d8A830.png"}),n(),h,A,p(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/8B/9D/Ciqc1F_cOeGAdXqVAAAh9BFmkfc434.png"}),n(),C,p(a,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image/M00/8C/5A/Ciqc1F_r7NGAZEpfAAML5lu_1b0195.png"}),n(),D,p(a,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image/M00/8C/5B/Ciqc1F_r7U6AD8GlAADstIgZx_U342.png"}),n(),S,B,p(a,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image2/M01/03/7A/Cip5yF_cOlSAfG1CAAAitat9u8o887.png"}),n(),k,b,v,T,q,f,p(a,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image2/M01/03/7B/CgpVE1_cOmCAFLL8AAESjwfi8EI088.png"}),n(),X,x,p(a,{alt:"图片7.png",src:"https://s0.lgstatic.com/i/image2/M01/04/3F/CgpVE1_r7WiAQMawAAJJrNlYAtg875.png"}),n(),$,w,p(a,{alt:"图片8.png",src:"https://s0.lgstatic.com/i/image2/M01/04/3F/CgpVE1_r7XKAWt3vAAFpOE6XpHM284.png"}),n(),M,R,p(a,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image/M00/8B/A8/CgqCHl_cOnqAWzPrAACfVXHEAAk486.png"}),n(),H,p(a,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image/M00/8B/A8/CgqCHl_cOoiAD43UAADLY39KIOc450.png"}),n(),P,O,I,p(a,{alt:"Drawing 14.png",src:"https://s0.lgstatic.com/i/image2/M01/03/7A/Cip5yF_cOp-Acv-zAANwGCdez2k054.png"}),n(),j,p(a,{alt:"Drawing 15.png",src:"https://s0.lgstatic.com/i/image2/M01/03/7A/Cip5yF_cOpiAMrRcAACz4ZPfiHE961.png"}),n(),V,p(a,{alt:"Drawing 16.png",src:"https://s0.lgstatic.com/i/image2/M01/03/7A/Cip5yF_cOraARaEHAACAgMxORjM038.png"}),n(),L,p(a,{alt:"图片10.png",src:"https://s0.lgstatic.com/i/image2/M01/04/3F/CgpVE1_r7PeAeYKNAAKRGDzBTuE416.png"}),n(),N,p(a,{alt:"图片11.png",src:"https://s0.lgstatic.com/i/image/M00/8C/0E/CgqCHl_kTAmAQB_aAAEDK3yLJkY943.png"}),n(),U,G,p(a,{alt:"Drawing 19.png",src:"https://s0.lgstatic.com/i/image/M00/8B/9D/Ciqc1F_cOtaASyQeAAHRnEyplEU737.png"}),n(),J,W,p(a,{alt:"图片13.png",src:"https://s0.lgstatic.com/i/image2/M01/04/3F/CgpVE1_r7hmATCQBAAHhyKThdOI750.png"}),n(),K,Y,z,Q,Z,ss,ns,p(a,{alt:"Drawing 21.png",src:"https://s0.lgstatic.com/i/image/M00/8B/9D/Ciqc1F_cOu-AUgG8AAMoVNqvtj8470.png"}),n(),as,p(a,{alt:"Drawing 22.png",src:"https://s0.lgstatic.com/i/image/M00/8B/A8/CgqCHl_cOwOAbfppAATnMiQk45A089.png"}),n(),ps,ls,p(a,{alt:"图片15.png",src:"https://s0.lgstatic.com/i/image2/M01/03/E6/Cip5yF_kTF-ALwT6AALUte7Tb1k341.png"}),n(),os,p(a,{alt:"Drawing 24.png",src:"https://s0.lgstatic.com/i/image/M00/8B/A8/CgqCHl_cOyKADDkjAAC98rkZQJg985.png"}),n(),es,p(a,{alt:"Drawing 25.png",src:"https://s0.lgstatic.com/i/image/M00/8B/9D/Ciqc1F_cOymAFUlLAAJ8WDrvvw8214.png"}),n(),ts,p(a,{alt:"Lark20201224-160053.png",src:"https://s0.lgstatic.com/i/image2/M01/03/E8/CgpVE1_kTHSAL9KqAAUNAGwX_GM335.png"})])}const ms=o(r,[["render",cs]]);export{gs as __pageData,ms as default};
