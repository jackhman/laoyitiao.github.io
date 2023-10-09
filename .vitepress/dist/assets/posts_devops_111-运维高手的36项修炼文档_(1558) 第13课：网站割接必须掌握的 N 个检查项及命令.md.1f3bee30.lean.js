import{_ as o,j as r,o as _,h as a,k as n,f as l,s as t,Q as e}from"./chunks/framework.d3daa342.js";const mt=JSON.parse('{"title":"第13课：网站割接必须掌握的N个检查项及命令","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/111-运维高手的36项修炼文档/(1558) 第13课：网站割接必须掌握的 N 个检查项及命令.md","filePath":"posts/devops/111-运维高手的36项修炼文档/(1558) 第13课：网站割接必须掌握的 N 个检查项及命令.md","lastUpdated":1696682708000}'),p={name:"posts/devops/111-运维高手的36项修炼文档/(1558) 第13课：网站割接必须掌握的 N 个检查项及命令.md"},i=t("h1",{id:"第13课-网站割接必须掌握的n个检查项及命令",tabindex:"-1"},[l("第13课：网站割接必须掌握的N个检查项及命令 "),t("a",{class:"header-anchor",href:"#第13课-网站割接必须掌握的n个检查项及命令","aria-label":'Permalink to "第13课：网站割接必须掌握的N个检查项及命令"'},"​")],-1),c=t("p",null,"本课时，我们讲解网站割接过程中所需要掌握的一些常见的检查项及命令。",-1),h=t("br",null,null,-1),u=t("p",null,"割接这个词起初来源于对于网络的一种操作，通常是对网络架构升级或者变更切换的操作。本课时我们说的网站割接表示对网站服务环境的切换和变更，网站割接是从运维的角度提出的，技术面涉及整个网站服务各项技术环节。",-1),d=t("h2",{id:"网路服务架构",tabindex:"-1"},[l("网路服务架构 "),t("a",{class:"header-anchor",href:"#网路服务架构","aria-label":'Permalink to "网路服务架构"'},"​")],-1),b=t("p",null,"我们来看这样一张图，在这张图里，右侧是基建部分，它包含如机房、服务器、风火水电、网络设备等。",-1),g=t("br",null,null,-1),m=e("",23),A=t("br",null,null,-1),C=t("p",null,"第 1 个类型是上层业务必须要检查的割接检测项。上层业务通常偏向于应用层。 涉及到图中的几个核心的层次，首先是入口层，它负责接收用户的请求。第 2 个是逻辑层，在这一层我们需要检查整体的逻辑是否正常执行。上层业务检查项还需要关注所依赖的公共组件，如 DNS、CDN 等。这一层检查流程不仅从一个运维角度检查也更模拟了一个真实用户检查。",-1),S=t("br",null,null,-1),T=t("br",null,null,-1),f=t("p",null,"第 2 个重要类型就是数据层的割接检查。数据层更加关心数据层次中数据的完整性、数据库是否提供正常服务等相关内容。在图中我们看到，数据层既包含了数据库类型的服务，也包含了大数据和对象存储等服务，以关系数据库举例，我们最常用到的一个服务就是 MySQL，所以接下来我就为你讲解，当我们在做割接时，MySQL 数据库层里通常需要检查的一些内容。",-1),N=t("br",null,null,-1),P=t("p",null,"学习本课时后面的内容，你需要了解 Linux 的一些基础操作和 MySQL 的一些基础知识。",-1),M=t("h2",{id:"常见割接项及命令",tabindex:"-1"},[l("常见割接项及命令 "),t("a",{class:"header-anchor",href:"#常见割接项及命令","aria-label":'Permalink to "常见割接项及命令"'},"​")],-1),L=t("p",null,"刚刚我们讲解到了两个主要割接检查项目的类别，下面我们围绕这两个类别，来具体讲解它有哪些割接项，以及在这个过程中具体用到的一些命令。",-1),y=t("br",null,null,-1),k=e("",27),w=t("br",null,null,-1),x=t("p",null,[l("另外作一次代码升级，我将更改页面展示部分内容。可以看到当我打开浏览器时，本地的一套环境（URL为："),t("a",{href:"http://127.0.01/",target:"_blank",rel:"noreferrer"},"http://"),t("a",{href:"http://127.0.01/",target:"_blank",rel:"noreferrer"},"127.0.01"),t("a",{href:"http://127.0.01/jeson",target:"_blank",rel:"noreferrer"},"/jeson"),l("），主要的变更的地方是：左上方修改了网站的 logo，改为了牧客老师。当前线上还是原先的显示内容，一会我们要做一个升级。")],-1),Q=t("br",null,null,-1),q=t("p",null,"接下来通过我发布的脚本，把代码发布到线上，这里就需要演示做变更后的检查。",-1),D=t("br",null,null,-1),I=t("br",null,null,-1),j=t("p",null,"当做完域名解析以后，需要检查新的域名是否能按照要求去解析。这个时候我需要做的是 ping 新的域名，看看是否正常，可以看到我 ping 了这个域名以后返回地址是正常的。此外，通过 ping 命令，我还可以关注返回的延迟是否符合预期，可以看到当前这个延迟也是符合的。",-1),V=t("br",null,null,-1),v=t("br",null,null,-1),E=t("p",null,[l("如果我 ping 对应的域名没有返回结果（看不到 IP 地址或地址不对），这说明我的解析出了问题，需要进一步排查 DNS 解析是否正常，我们可以通过其他工具来检查，比如 nslookup，它可以指定 DNS 的解析服务地址，这里使用 8.8.8.8 作为一个 local dns 来进行解析，接下来我再敲入 "),t("a",{href:"http://www.jesonc.com",target:"_blank",rel:"noreferrer"},"www.jesonc.com"),l(" 这个域名，看看是否解析正常。")],-1),F=t("br",null,null,-1),O=t("p",null,"导致 DNS 解析记录不正常的原因通常有三种，第一是由于 DNS 解析缓存失效周期的问题，第二是由于 DNS 本地地址的配置错误，第三是由于 DNS 劫持造成的一些问题，这些都可能导致你的解析记录不正常。这个时候我们就需要去指定解析的服务端，光用 ping 命令实现不了，我们需要通过 nslookup 命令来做，或者 dig 这个更加专业命令。我们可以用 dig +@dns解析服务，直接 at 你的期望提供解析的 DNS 服务 IP 地址。",-1),H=t("br",null,null,-1),W=t("br",null,null,-1),G=t("p",null,"dig 会更加专业， 比如一个 + trace，就是模拟迭代+递归的整个解析过程作分析。",-1),J=t("br",null,null,-1),U=t("br",null,null,-1),R=t("p",null,[l("通常在做完一次割接以后，如果你是线上服务的话，可能没有那么多时间通过命令方式检查。所以你首要事情就是查看服务是否可访问，那么最便捷直接的方式的就是通过浏览器的方式去访问新的域名地址，看看是否能够正常的打开这个网站。现在我输入 "),t("a",{href:"http://www.jesonc.com",target:"_blank",rel:"noreferrer"},"www.jesonc.com"),l(" 这个域名来访问网站，这个时候直接访问的内容就非常清晰了，浏览器看到的响应页面有做对应的新内容变更。")],-1),K=t("br",null,null,-1),$=t("p",null,"通常可以使用 Chrome 里的开发工具，然后刷新一下页面，去判断页面里每一个元素对应的下载状态，以及返回的值是否正常。",-1),B=t("br",null,null,-1),X=t("br",null,null,-1),Y=t("p",null,"如果网站的部分元素、链接请求出现问题时，我们需要通过一些工具去具体判断是因为什么原因导致服务不正常。比如说我这里需要判断连接是不是正常，就可以通过 telnet 方法判断域名地址以及对应的端口，因为我对外提供的是 HTTP 服务，所以我就请求 80 的端口，看看 telnet 连接是否能够通畅？",-1),Z=t("br",null,null,-1),z=t("br",null,null,-1),tt=t("p",null,"telnet 命令主要用来判断 TCP 的连接是否正常，除此之外，其实我们还需要关注应用层的服务是否正常，比如我通过 curl 命令加入 -v，查看它整体请求返回的过程，加入 -L 来支持重定向地址的打开，这样的话就可以模拟在终端请求对应的服务，看看是否有元素响应，以及 HTTP 的返回头和请求头是否符合你的预期。",-1),lt=t("br",null,null,-1),st=t("p",null,"整体完成以后，我们需要登录到服务器上面，检查它的应用情况。这里我登录到服务器上，接下来就要去检查进程的状态，关于服务器的整体情况以及进程的使用情况，这些都可以通过 top 或者 ps 命令去对进程系统的资源使用情况进行分析。在这些都完成后，如果还有问题的话，就需要去关注你的业务日志是否符合预期，我们可以打开应用日志，进行对应的分析。",-1),nt=t("br",null,null,-1),et=t("p",null,"以上就是在做完网站割接以后，给你演示一些常用的割接命令和对应的一些步骤。",-1),ot=t("h2",{id:"数据层割接",tabindex:"-1"},[l("数据层割接 "),t("a",{class:"header-anchor",href:"#数据层割接","aria-label":'Permalink to "数据层割接"'},"​")],-1),rt=t("p",null,"本课时的最后一部分，我们来讲解数据层对应的割接，以及它需要检查的一些检查项。这里我为你讲解 MySQL 所涉及的一些具体的检查项。",-1),_t=t("br",null,null,-1),at=e("",21);function pt(it,ct,ht,ut,dt,bt){const s=r("Image");return _(),a("div",null,[i,c,h,u,d,b,g,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/06/6A/Ciqah16C0-yACkUdAAUn0Fjeq7k559.png"}),l(),m,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7F/80/Cgq2xl6C0-yAfOVkAAVgPLjNgOE302.png"}),l(),A,C,S,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7F/80/Cgq2xl6C0-2AC5_TAAWGevLSJyA141.png"}),l(),T,f,N,P,M,L,y,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7F/80/Cgq2xl6C0-2AIiQJAANXyFfWkc8409.png"}),l(),k,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/06/6A/Ciqah16C0-6AK5boAATDWWIZsHk523.png"}),l(),w,x,Q,q,D,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7F/80/Cgq2xl6C0-6AYeyEAAK0jgdukno479.png"}),l(),I,j,V,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/06/6A/Ciqah16C0-6AXw64AAE_YFW0DdE654.png"}),l(),v,E,F,O,H,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7F/80/Cgq2xl6C0-6AOhEOAANHrdS3wOg837.png"}),l(),W,G,J,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/06/6A/Ciqah16C0--AW5JQAAQ1pt-LJyo960.png"}),l(),U,R,K,$,B,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7F/80/Cgq2xl6C0--ACPjnAAHVp8fK2vo945.png"}),l(),X,Y,Z,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/06/6A/Ciqah16C0--AMrGJAAC1IcWE_d0849.png"}),l(),z,tt,lt,st,nt,et,ot,rt,_t,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/06/6A/Ciqah16C0--ARNOTAAOLnNTiNFs472.png"}),l(),at])}const At=o(p,[["render",pt]]);export{mt as __pageData,At as default};
