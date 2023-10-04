import{_ as n,j as r,o as i,g as p,k as s,h as e,s as t,Q as o}from"./chunks/framework.e0c66c3f.js";const Pt=JSON.parse('{"title":"白帽子最喜欢用什么安全工具？ ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Web 安全攻防之道_文档/(5968) 01  武器库：常用的渗透测试工具.md","filePath":"posts/backEnd/Web 安全攻防之道_文档/(5968) 01  武器库：常用的渗透测试工具.md","lastUpdated":null}'),l={name:"posts/backEnd/Web 安全攻防之道_文档/(5968) 01  武器库：常用的渗透测试工具.md"},_=t("p",null,"你好，我是赢少良。这一讲，我来介绍一些常用的 Web 渗透测试工具。通常每个安全人员都有自己熟练使用的一套工具，这样在实战中才能高效，也不用浪费时间去自己重复造轮子。",-1),c=t("h3",{id:"白帽子最喜欢用什么安全工具",tabindex:"-1"},[e("白帽子最喜欢用什么安全工具？ "),t("a",{class:"header-anchor",href:"#白帽子最喜欢用什么安全工具","aria-label":'Permalink to "白帽子最喜欢用什么安全工具？"'},"​")],-1),h=t("p",null,"2020 年的 HackerOne 黑客报告中，统计过白帽子们最喜欢用的软硬件工具。",-1),g=o("",8),u=t("p",null,"图 2 Burp Suite",-1),m=t("p",null,"Burp Suite 分免费的社区版、收费的专业版和企业版。社区版主要是一些代理抓包改包的基本功能，专业版则包含漏洞扫描器、插件商店、Burp Instruder（比如用来暴力破解账号）等功能。",-1),d=t("p",null,"专业版一年收费 399 美元，按当前汇率算，相当于 2637 元，也并不便宜；企业版更贵，要 3999 美元（相当于 26435 元），主要增加了一些定期循环漏洞扫描和 CI 持续集成功能，具有更好的扩展性。",-1),A=t("p",null,"对个人而言，专业版就足够了。其实我觉得 Burp Suite 的漏洞扫描功能一般，漏洞发现能力并没有那么强，其检测结果仅作为参考。对于漏洞扫描，我更喜欢使用稍后要介绍的几款漏洞扫描工具。",-1),S=t("p",null,"以前我做渗透测试时比较习惯用 FireFox，因为它有丰富的安全测试插件。现在 Chrome 市场占有率已经超过 70%，以前 FireFox 中很多优秀的插件也移植到了 Chrome 中，因此我现在基本只用 Chrome。",-1),b=t("p",null,"这里提到浏览器，是因为在使用 Burp Suite 前需要配置浏览器代理，这样才能将 HTTP/HTTPS 请求转发到 Burp Suite 上进行分析与测试。",-1),C=t("p",null,'在 Chrome 的设置中搜索"代理"会让你选择"打开您计算机的代理设置"，如下图所示：',-1),P=t("p",null,"图 3 Chrome 代理设置",-1),y=t("p",null,"打开之后你就可以设置 HTTP/HTTPS 代理为 Burp Suite 的对应端口，默认为 127.0.0.1:8080。下面两张图分别是系统和 Burp Suite 上的代理设置页面：",-1),k=t("p",null,"图 4 系统代理设置页面",-1),x=t("p",null,"图 5 Burp Suite 代理设置页面",-1),q=t("p",null,[e('如果每次使用都要进行这样的配置代理其实还挺麻烦的，毕竟有时也得正常地使用浏览器上网。我在这里推荐个小技巧：你可以使用 Chrome 上的插件"'),t("strong",null,"Proxy SwitchyOmega"),e('"来快速切换代理，如果你用的是 FireFox，那可以使用 FoxyProxy 插件。')],-1),B=t("p",null,'在 Chrome 应用商店中搜索"Proxy SwitchyOmega"并安装它，然后像下图这样配置：',-1),T=t("p",null,"图 6 Proxy SwitchyOmega 配置",-1),f=t("p",null,'配置完成后你就可以在 Chrome 浏览器右上角的插件栏中点击"Proxy SwitchyOmega"插件图标，选择上面创建的"Burp Suite"情景模式开启代理，若想关闭代理直接选择"系统代理"即可。',-1),M=t("p",null,"图 7 Proxy SwitchyOmega 快速代理展示",-1),w=t("p",null,"下图是代理成功后，Burp Suite 拦截到流量的效果图：",-1),V=t("p",null,"图 8 Burp Suite 代理成功",-1),F=t("p",null,[e("其他更详细的 Burp Suite 功能，你可以参考"),t("a",{href:"https://portswigger.net/burp/documentation/contents",target:"_blank",rel:"noreferrer"},"Burp Suite Document"),e("和"),t("a",{href:"https://t0data.gitbooks.io/burpsuite/content/",target:"_blank",rel:"noreferrer"},"Burp Suite 实战指南"),e("这两份资料学习，此处不再展开。")],-1),W=t("h3",{id:"acunetix-wvs",tabindex:"-1"},[e("Acunetix WVS "),t("a",{class:"header-anchor",href:"#acunetix-wvs","aria-label":'Permalink to "Acunetix WVS"'},"​")],-1),N=t("p",null,"Acunetix WVS（Web Vulnerability Scanner）是我以前经常用的 Web 漏洞扫描器，也曾用它刷了不少国内 SRC 平台的漏洞。",-1),D=o("",6),E=t("p",null,"图 10 Xray",-1),I=t("p",null,[e("我在使用 Xray 的时候发现，"),t("strong",null,"Xray 的准确率要比 WVS 高，但漏洞发现率不是很高"),e("，经常扫完后报告是空的，而且 Xray 的扫描速度很慢，还有一定优化的空间。")],-1),Z=t("h3",{id:"goby-基于网络空间测绘的漏洞扫描器",tabindex:"-1"},[e("Goby：基于网络空间测绘的漏洞扫描器 "),t("a",{class:"header-anchor",href:"#goby-基于网络空间测绘的漏洞扫描器","aria-label":'Permalink to "Goby：基于网络空间测绘的漏洞扫描器"'},"​")],-1),H=t("p",null,"Goby 是一款国内新出的安全扫描器，它基于网络空间测绘技术进行资产收集，也就是先通过对目标网络的 IT 资产进行规则分析，建立知识库，在发生安全事件时就能直接用于应急响应，这项功能比较适合企业内部。Goby 属于免费的工具，且跨平台支持 Windows、Linux 和 macOS，界面不错，还提供了多个皮肤。",-1),G=t("p",null,"图 11 Goby",-1),L=t("p",null,[t("strong",null,"Goby 有个比较实用的功能，那就是支持自定义规则的漏洞扫描框架"),e(" 。它本身也会收集一些产品的 PoC（概念证明，常被用于验证是否存在漏洞，如下图所示），同时在外部曝光或自主挖掘到漏洞时，借助该框架添加规则，可以快速去扫描相关资产是否存在漏洞，"),t("strong",null,"对于企业应急和个人刷 SRC 平台漏洞是一个神器"),e("。")],-1),Q=t("p",null,"图 12 Goby 收集的 PoC",-1),X=t("p",null,[e("Goby 的使用可以参考"),t("a",{href:"https://cn.gobies.org/docs.html?v=1",target:"_blank",rel:"noreferrer"},"官方文档"),e("中的内容。")],-1),O=t("h3",{id:"sqlmap-sql-注入检测与利用",tabindex:"-1"},[e("SQLMap：SQL 注入检测与利用 "),t("a",{class:"header-anchor",href:"#sqlmap-sql-注入检测与利用","aria-label":'Permalink to "SQLMap：SQL 注入检测与利用"'},"​")],-1),v=t("p",null,[t("strong",null,"SQLMap 无疑是 SQL 注入工具中的王者"),e("。在 SQL 注入漏洞检测与利用上，SQLMap 提供了非常全面的功能，哪怕是一些漏洞无法检测到，许多白帽子仍习惯在上面做二次开发，或者利用 tamper 脚本来扩展。")],-1),R=t("p",null,"图 13 SQLMap",-1),J=t("p",null,[e('我将在"第 06 讲"和"第 07 讲"中详细介绍该工具的使用，此处不再赘述，详细的使用方法可以从'),t("a",{href:"http://sqlmap.org/",target:"_blank",rel:"noreferrer"},"官网"),e("了解。")],-1),z=t("h3",{id:"nmap-网络扫描与主机检测",tabindex:"-1"},[e("Nmap：网络扫描与主机检测 "),t("a",{class:"header-anchor",href:"#nmap-网络扫描与主机检测","aria-label":'Permalink to "Nmap：网络扫描与主机检测"'},"​")],-1),U=t("p",null,"Nmap 有界面版本和命令行版本，我比较喜欢使用命令行，因为可操作空间大一些。",-1),Y=t("p",null,"图 14 Nmap 界面版本",-1),j=t("p",null,"图 15 Nmap 命令行版本",-1),K=t("p",null,"很多人只知道 Nmap 可用于端口扫描和主机服务识别，但实际上它远不止如此。Nmap 提供的丰富脚本，大大扩展了它的功能，它可以探测弱口令，甚至是漏洞扫描。Nmap 的功能十分强大，需要你慢慢探索。",-1),$=t("p",null,[e("关于 Nmap 详细的使用说明，你可以参考"),t("a",{href:"https://nmap.org/book/toc.html",target:"_blank",rel:"noreferrer"},"官方文档"),e('，在下一讲"信息收集：掌握目标的一切信息"中，我还会提到 Nmap。')],-1),tt=t("h3",{id:"postman-模拟发包工具",tabindex:"-1"},[e("Postman：模拟发包工具 "),t("a",{class:"header-anchor",href:"#postman-模拟发包工具","aria-label":'Permalink to "Postman：模拟发包工具"'},"​")],-1),et=t("p",null,"虽然 Burp Suite 功能强大，但有时会觉得开启代理麻烦，对于能在浏览器上直接完成的，我一般都不开 Burp Suite 操作。",-1),at=t("p",null,'Chrome 上自带的开发者工具可以直接抓包查看：通过在网页右击，选择"检查"即可打开；然后切换到"Network"标签页，操作网页后即可获取到网络请求包，但它不支持拦截修改请求包。',-1),st=t("p",null,"图 16 Chrome 抓包",-1),ot=t("p",null,[t("strong",null,"如果你想直接构造请求去发包，或者用来测试一些网络接口的调用，那使用 Postman 再适合不过了"),e('。安装完 Postman 后，通过 Chrome 标签栏的"应用"即可打开 Postman。')],-1),nt=t("p",null,'图 17 Chrome "应用"标签',-1),rt=o("",5),it=o("",7),pt=t("p",null,"图 20 NC",-1),lt=t("p",null,"更多 NC 命令参数的使用，可以通过 man nc 命令来查看。",-1),_t=t("h3",{id:"metasploit-渗透测试平台",tabindex:"-1"},[e("Metasploit：渗透测试平台 "),t("a",{class:"header-anchor",href:"#metasploit-渗透测试平台","aria-label":'Permalink to "Metasploit：渗透测试平台"'},"​")],-1),ct=t("p",null,"Metasploit 在渗透测试中经常被使用到，它不是一个单纯的工具，而是一个集成各种渗透测试工具的平台，上面有很多漏洞利用工具，还有免杀处理、后门生成与留存、远程控制等很多强大的功能。",-1),ht=o("",10);function gt(ut,mt,dt,At,St,bt){const a=r("Image");return i(),p("div",null,[_,c,h,s(a,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image/M00/8A/2F/Ciqc1F_ZsTqAbk1uAAEzMdImnRE617.png"}),e(),g,s(a,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image/M00/8A/3A/CgqCHl_ZsUuAF1bFAAIiwmvltps413.png"}),e(),u,m,d,A,S,b,C,s(a,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image2/M01/02/0D/Cip5yF_ZsVeACMEcAAIScM5BkEE861.png"}),e(),P,y,s(a,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image2/M01/02/0D/Cip5yF_ZsWiAZ9iGAACtiDp2x7A093.png"}),e(),k,s(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/8A/2F/Ciqc1F_ZsXSAHU-wAAA9V42FWPM054.png"}),e(),x,q,B,s(a,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/8A/3A/CgqCHl_ZsX2ANrS4AAEIEgIoD68852.png"}),e(),T,f,s(a,{alt:"图片7.png",src:"https://s0.lgstatic.com/i/image2/M01/02/0D/Cip5yF_ZsZWAONnTAALKGIyBcc4584.png"}),e(),M,w,s(a,{alt:"图片8.png",src:"https://s0.lgstatic.com/i/image2/M01/02/0E/Cip5yF_ZsaKAVGGeAAJbFdx82DU937.png"}),e(),V,F,W,N,s(a,{alt:"图片9.png",src:"https://s0.lgstatic.com/i/image/M00/8A/3B/CgqCHl_ZscGAeTzSAAIginYu50Q791.png"}),e(),D,s(a,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image2/M01/02/0E/Cip5yF_Zsc6AaAIpAADD4PGQU64235.png"}),e(),E,I,Z,H,s(a,{alt:"图片11.png",src:"https://s0.lgstatic.com/i/image2/M01/02/0E/Cip5yF_ZsduADxmJAAQFbh7gdPE888.png"}),e(),G,L,s(a,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image2/M01/02/0E/Cip5yF_ZseWAdqgJAAGCxqkdD48418.png"}),e(),Q,X,O,v,s(a,{alt:"图片13.png",src:"https://s0.lgstatic.com/i/image/M00/8A/3B/CgqCHl_ZsfSAc3xqAAlj1Wt1MjA788.png"}),e(),R,J,z,U,s(a,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image/M00/8A/3B/CgqCHl_ZsgKARmaVAAIlxL9iyXY234.png"}),e(),Y,s(a,{alt:"图片15.png",src:"https://s0.lgstatic.com/i/image/M00/8A/3B/CgqCHl_ZshKAJg3QAAgAnpqJC2Y626.png"}),e(),j,K,$,tt,et,at,s(a,{alt:"Drawing 15.png",src:"https://s0.lgstatic.com/i/image/M00/8A/30/Ciqc1F_ZshyALB-qAAGumg9CRg0315.png"}),e(),st,ot,s(a,{alt:"Drawing 16.png",src:"https://s0.lgstatic.com/i/image/M00/8A/30/Ciqc1F_ZsiaAL7vJAADOYBSf2OE763.png"}),e(),nt,s(a,{alt:"图片18.png",src:"https://s0.lgstatic.com/i/image/M00/8A/30/Ciqc1F_ZsjGAYczeAAXvGuO1mGE366.png"}),e(),rt,s(a,{alt:"图片19.png",src:"https://s0.lgstatic.com/i/image2/M01/02/0E/Cip5yF_ZskSAMLsBAAFVySz_ctA678.png"}),e(),it,s(a,{alt:"Drawing 19.png",src:"https://s0.lgstatic.com/i/image2/M01/02/0F/CgpVE1_ZsmOAJ1y7AADZnpy2HvE117.png"}),e(),pt,lt,_t,ct,s(a,{alt:"Drawing 20.png",src:"https://s0.lgstatic.com/i/image2/M01/02/0F/CgpVE1_ZsnGAdzeMAADU1Q17564791.png"}),e(),ht,s(a,{alt:"Lark20201217-145227.png",src:"https://s0.lgstatic.com/i/image/M00/8A/FC/CgqCHl_bAECAVuIWAAUjsOlJH20170.png"})])}const yt=n(l,[["render",gt]]);export{Pt as __pageData,yt as default};
