import{_ as o,j as r,o as _,g as a,k as n,h as l,s as t,Q as e}from"./chunks/framework.4e7d56ce.js";const mt=JSON.parse('{"title":"第13课：网站割接必须掌握的N个检查项及命令","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/111-运维高手的36项修炼文档/(1558) 第13课：网站割接必须掌握的 N 个检查项及命令.md","filePath":"posts/devops/111-运维高手的36项修炼文档/(1558) 第13课：网站割接必须掌握的 N 个检查项及命令.md","lastUpdated":1696417798000}'),p={name:"posts/devops/111-运维高手的36项修炼文档/(1558) 第13课：网站割接必须掌握的 N 个检查项及命令.md"},i=t("h1",{id:"第13课-网站割接必须掌握的n个检查项及命令",tabindex:"-1"},[l("第13课：网站割接必须掌握的N个检查项及命令 "),t("a",{class:"header-anchor",href:"#第13课-网站割接必须掌握的n个检查项及命令","aria-label":'Permalink to "第13课：网站割接必须掌握的N个检查项及命令"'},"​")],-1),c=t("p",null,"本课时，我们讲解网站割接过程中所需要掌握的一些常见的检查项及命令。",-1),h=t("br",null,null,-1),u=t("p",null,"割接这个词起初来源于对于网络的一种操作，通常是对网络架构升级或者变更切换的操作。本课时我们说的网站割接表示对网站服务环境的切换和变更，网站割接是从运维的角度提出的，技术面涉及整个网站服务各项技术环节。",-1),d=t("h2",{id:"网路服务架构",tabindex:"-1"},[l("网路服务架构 "),t("a",{class:"header-anchor",href:"#网路服务架构","aria-label":'Permalink to "网路服务架构"'},"​")],-1),b=t("p",null,"我们来看这样一张图，在这张图里，右侧是基建部分，它包含如机房、服务器、风火水电、网络设备等。",-1),g=t("br",null,null,-1),m=e('<br><p>除了基建部分外，我们可以看到这图中最下端一排是公共组件。比如服务器上运行操作系统，另外，也包含虚拟化内容，如：K8s 等都涵盖到这个公共基础组件中。</p><br><p>网站服务通常要对外提供服务，所以会用到 DNS 做域名解析，用 CDN 做静态元素的分发等。所以我将网站服务所需要依赖的公共组件，也罗列到了最下边的这个方框里面。</p><br><p>中间的三块组成，它们分别是入口层、逻辑层和数据层。</p><br><ul><li><p>数据层会存储，包含：关系型数据库，非关系型数据库、大数据，或者对象存储等。</p></li><li><p>逻辑层与代码的关联更加紧密，比如代码依赖的公共组件、框架、服务等，还有代码本身，都在逻辑层里。</p></li><li><p>入口层涵盖了代理网关、4 层负载均衡、7 层负载均衡，等等。</p></li></ul><br><p>如果以上任何一个部分做了相关的变动，都可能会涉及一次网站割接，而且需要去检查对应的割接检查项。</p><h2 id="割接分类" tabindex="-1">割接分类 <a class="header-anchor" href="#割接分类" aria-label="Permalink to &quot;割接分类&quot;">​</a></h2><p>我们再来具体介绍一下割接的分类。</p><br><p>网站服务内容可以分为同构割接和异构割接，如果是对同构的服务进行升级，就是同构割接，它的主体结构是不变的，只是进行例行性的升级，或者对它的代码版本等内容进行修改，比如我们用的 Nginx 服务，如果只是升级 Nginx 的版本，并没有把 Nginx 换成另外一个组件。异构割接则相反，当我们把网站服务的整个主体结构做了改变时，这种方式就是异构割接，如：你把网站入口网关 Nginx 改为 Apache，就属于异够割接。</p><br><p>如果根据割接的影响面来划分的话，可以分为局部割接和全局割接。在网站服务这张图里，如果我只操作了其中的一小部分，只对一小部分内容产生影响，则属于局部割接；全局性的割接则会影响你的整体功能，并会影响主要用户体验。</p><br><p>接下来，补充一个问题，需要注意这里我们讲的割接检查并不是故障检查，故障检查需要一步一步地分析问题，并且是在出现故障以后做的，它的排查思路更加聚焦在某一个问题。</p><br><p>而接下来我们要讲的割接检查，它的范围更广，需要检查范围也往往不限于一个小小的操作上，接下来我们具体讲解这部分。</p><h2 id="割接检查分类" tabindex="-1">割接检查分类 <a class="header-anchor" href="#割接检查分类" aria-label="Permalink to &quot;割接检查分类&quot;">​</a></h2><p>我们先给割接检查进行分类：</p><br>',23),A=t("br",null,null,-1),C=t("p",null,"第 1 个类型是上层业务必须要检查的割接检测项。上层业务通常偏向于应用层。 涉及到图中的几个核心的层次，首先是入口层，它负责接收用户的请求。第 2 个是逻辑层，在这一层我们需要检查整体的逻辑是否正常执行。上层业务检查项还需要关注所依赖的公共组件，如 DNS、CDN 等。这一层检查流程不仅从一个运维角度检查也更模拟了一个真实用户检查。",-1),S=t("br",null,null,-1),T=t("br",null,null,-1),f=t("p",null,"第 2 个重要类型就是数据层的割接检查。数据层更加关心数据层次中数据的完整性、数据库是否提供正常服务等相关内容。在图中我们看到，数据层既包含了数据库类型的服务，也包含了大数据和对象存储等服务，以关系数据库举例，我们最常用到的一个服务就是 MySQL，所以接下来我就为你讲解，当我们在做割接时，MySQL 数据库层里通常需要检查的一些内容。",-1),N=t("br",null,null,-1),P=t("p",null,"学习本课时后面的内容，你需要了解 Linux 的一些基础操作和 MySQL 的一些基础知识。",-1),M=t("h2",{id:"常见割接项及命令",tabindex:"-1"},[l("常见割接项及命令 "),t("a",{class:"header-anchor",href:"#常见割接项及命令","aria-label":'Permalink to "常见割接项及命令"'},"​")],-1),L=t("p",null,"刚刚我们讲解到了两个主要割接检查项目的类别，下面我们围绕这两个类别，来具体讲解它有哪些割接项，以及在这个过程中具体用到的一些命令。",-1),y=t("br",null,null,-1),k=e('<br><p>首先是上层业务的割接检查项，在这个类别我们通常更加贴近用户的角度来判断服务端的服务是否正常。这时我们需要去检查的内容有： DNS 的域名解析、TCP 服务的建连关系、网站的入口应用，同时也会用到自己的监控系统，或者直接用第三方的检测工具进行检测。</p><br><p>第三方检测工具，国内产品厂商有博瑞、听云，这些厂商有专业检测工具，独立、海量、且更加贴近指定地域的用户去做服务端的业务检查，甚至是通过大数据来判断服务是否符合规定指标，这种工具常被大型网站使用。由于本课时我们还是围绕非商业工具进行重点讲解，所以第三方检测工具就不具体介绍了。</p><br><p>接下来我们按照 PPT 中从上往下的顺序进行讲解，首先是域名 DNS 的解析，主要检查内容是域名和解析的 IP 是否正确，以及解析的内容与设置是否匹配。我们通常用到的工具有 ping、nslookup 和 dig ，这些命令都是在 Linux 下面所有的。</p><br><p>接下来是 TCP 服务建连，我们需要关注的是数据包是否可达。通过 ping 命令我们可以模拟发送 ICMP 数据包到服务端，判断是否可达。相对于 ping 而言，fping 可以指定主机范围来进行批量的 ping。tcpping 关注的是用 TCP 协议来进行 ping，因为在部分网络架构里，服务端会关闭 ICMP 协议，从而导致 ping 命令不可用。这个时候我们就可以用 tcpping 来发送 TCP 数据包，从而判断服务端是否可达。</p><br><p>同样，判断网络是否延迟也可以用到这 3 个命令，因为每次发送数据包后我们都会看到它的延迟时间，只要我们关注它的 TTL 值，就可以清楚网络延迟的情况。</p><br><p>服务建连这一部分，我们需要关注的是 TCP 或 UDP 协议是否能正常建立连接， 我们需要从客户端和服务端分别检查，关注服务从网络建连的角度是否能正常对外提供服务。在客户端我们通常用到的是 telnet 这个工具，在服务端则可以通过 nestat、sar 或者 lsof 这三个工具，它们可以用来观察服务端的连接情况、整个文件句柄的占用情况以及端口的监听情况。tcpdump 是涉及网络包的抓包工具。nc 既可以用于客户端，也可以用于服务端，它可以模拟服务端端口监听进程，来直接判断连接是否通畅。</p><br><p>对服务建连这一部分的网络检查，我们会在课时 19 继续学习，并针对网络来做一些故障检查，从而让你明白这些命令分别是如何使用的。</p><br><p>下面就是网站入口应用了，这里我们需要关注的是页面及接口各元素是否正常。常用的工具当然是浏览器了，浏览器非常直接，而且也非常方便。但是在没有浏览器的情况下，我们需要用到一些 Linux 终端命令行的工具，比如 curl 命令，这是我们在课时 5 重点讲解过的。HTTPie 是 Linux 下一个新的命令，它与 curl 命令在功能上基本一致，只是在显示和交互性上有一些使用上的细微差异。如果你不习惯用 curl 命令的话，可以选择用 HTTPie 。</p><br><p>除此之外，我们还需要检查服务端的进程状态，可以通过进程的方式来进行分析，比如使用 top、ps 这些系统上的性能分析工具，而 jmap 则更加偏向于对具体的应用服务来做检查。你可以根据应用服务里是否有一些特别的工具来做具体的检查。对于系统上应用进程的状态检查同样会在课时 16 里面进行具体介绍。</p><br><p>想要判断网站入口的应用是否正常，我们还要去服务端检查业务服务日志，日志是检查网站入口应用非常重要的一个方式，对于日志的分析，我会在课时 22 里给你做具体的介绍。</p><br><p>监控系统报警，对于运维人员而言，是做完割接以后必须要查看的可视化工具。我们不仅要判断业务服务是否正常，同时也要关注整体服务的指标是否平稳，这个时候最直接方便的方式就是打开企业的监控系统，看一看整体的情况。这里我给你推荐两套开源的工具，一个是 Zabbix，一个是 Prometheus ，这两套监控系统分别会在课时 24 和 25 为你介绍。</p><h2 id="割接演示" tabindex="-1">割接演示 <a class="header-anchor" href="#割接演示" aria-label="Permalink to &quot;割接演示&quot;">​</a></h2><p>以上就是整个上层业务里一些检查项的类别，以及一些需要掌握的工具，接下来我来做一个简单的演示，看一下对于网站的例行割接，我是如何来做检查的？</p><br><p>这里我需要对我的博客系统做一个变更升级，并且加入一个新的域名解析为例演示。涉及的操作主要为一个域名新的解析，这里我加入了 <a href="http://www.jesonc.com" target="_blank" rel="noreferrer">www.jesonc.com</a> 这个域名，这个操作我已经做好了，添加了一条对应的 a 记录来做变更。</p><br>',27),w=t("br",null,null,-1),x=t("p",null,[l("另外作一次代码升级，我将更改页面展示部分内容。可以看到当我打开浏览器时，本地的一套环境（URL为："),t("a",{href:"http://127.0.01/",target:"_blank",rel:"noreferrer"},"http://"),t("a",{href:"http://127.0.01/",target:"_blank",rel:"noreferrer"},"127.0.01"),t("a",{href:"http://127.0.01/jeson",target:"_blank",rel:"noreferrer"},"/jeson"),l("），主要的变更的地方是：左上方修改了网站的 logo，改为了牧客老师。当前线上还是原先的显示内容，一会我们要做一个升级。")],-1),Q=t("br",null,null,-1),q=t("p",null,"接下来通过我发布的脚本，把代码发布到线上，这里就需要演示做变更后的检查。",-1),D=t("br",null,null,-1),I=t("br",null,null,-1),j=t("p",null,"当做完域名解析以后，需要检查新的域名是否能按照要求去解析。这个时候我需要做的是 ping 新的域名，看看是否正常，可以看到我 ping 了这个域名以后返回地址是正常的。此外，通过 ping 命令，我还可以关注返回的延迟是否符合预期，可以看到当前这个延迟也是符合的。",-1),V=t("br",null,null,-1),v=t("br",null,null,-1),E=t("p",null,[l("如果我 ping 对应的域名没有返回结果（看不到 IP 地址或地址不对），这说明我的解析出了问题，需要进一步排查 DNS 解析是否正常，我们可以通过其他工具来检查，比如 nslookup，它可以指定 DNS 的解析服务地址，这里使用 8.8.8.8 作为一个 local dns 来进行解析，接下来我再敲入 "),t("a",{href:"http://www.jesonc.com",target:"_blank",rel:"noreferrer"},"www.jesonc.com"),l(" 这个域名，看看是否解析正常。")],-1),F=t("br",null,null,-1),O=t("p",null,"导致 DNS 解析记录不正常的原因通常有三种，第一是由于 DNS 解析缓存失效周期的问题，第二是由于 DNS 本地地址的配置错误，第三是由于 DNS 劫持造成的一些问题，这些都可能导致你的解析记录不正常。这个时候我们就需要去指定解析的服务端，光用 ping 命令实现不了，我们需要通过 nslookup 命令来做，或者 dig 这个更加专业命令。我们可以用 dig +@dns解析服务，直接 at 你的期望提供解析的 DNS 服务 IP 地址。",-1),H=t("br",null,null,-1),W=t("br",null,null,-1),G=t("p",null,"dig 会更加专业， 比如一个 + trace，就是模拟迭代+递归的整个解析过程作分析。",-1),J=t("br",null,null,-1),U=t("br",null,null,-1),R=t("p",null,[l("通常在做完一次割接以后，如果你是线上服务的话，可能没有那么多时间通过命令方式检查。所以你首要事情就是查看服务是否可访问，那么最便捷直接的方式的就是通过浏览器的方式去访问新的域名地址，看看是否能够正常的打开这个网站。现在我输入 "),t("a",{href:"http://www.jesonc.com",target:"_blank",rel:"noreferrer"},"www.jesonc.com"),l(" 这个域名来访问网站，这个时候直接访问的内容就非常清晰了，浏览器看到的响应页面有做对应的新内容变更。")],-1),K=t("br",null,null,-1),$=t("p",null,"通常可以使用 Chrome 里的开发工具，然后刷新一下页面，去判断页面里每一个元素对应的下载状态，以及返回的值是否正常。",-1),B=t("br",null,null,-1),X=t("br",null,null,-1),Y=t("p",null,"如果网站的部分元素、链接请求出现问题时，我们需要通过一些工具去具体判断是因为什么原因导致服务不正常。比如说我这里需要判断连接是不是正常，就可以通过 telnet 方法判断域名地址以及对应的端口，因为我对外提供的是 HTTP 服务，所以我就请求 80 的端口，看看 telnet 连接是否能够通畅？",-1),Z=t("br",null,null,-1),z=t("br",null,null,-1),tt=t("p",null,"telnet 命令主要用来判断 TCP 的连接是否正常，除此之外，其实我们还需要关注应用层的服务是否正常，比如我通过 curl 命令加入 -v，查看它整体请求返回的过程，加入 -L 来支持重定向地址的打开，这样的话就可以模拟在终端请求对应的服务，看看是否有元素响应，以及 HTTP 的返回头和请求头是否符合你的预期。",-1),lt=t("br",null,null,-1),st=t("p",null,"整体完成以后，我们需要登录到服务器上面，检查它的应用情况。这里我登录到服务器上，接下来就要去检查进程的状态，关于服务器的整体情况以及进程的使用情况，这些都可以通过 top 或者 ps 命令去对进程系统的资源使用情况进行分析。在这些都完成后，如果还有问题的话，就需要去关注你的业务日志是否符合预期，我们可以打开应用日志，进行对应的分析。",-1),nt=t("br",null,null,-1),et=t("p",null,"以上就是在做完网站割接以后，给你演示一些常用的割接命令和对应的一些步骤。",-1),ot=t("h2",{id:"数据层割接",tabindex:"-1"},[l("数据层割接 "),t("a",{class:"header-anchor",href:"#数据层割接","aria-label":'Permalink to "数据层割接"'},"​")],-1),rt=t("p",null,"本课时的最后一部分，我们来讲解数据层对应的割接，以及它需要检查的一些检查项。这里我为你讲解 MySQL 所涉及的一些具体的检查项。",-1),_t=t("br",null,null,-1),at=e("<br><p>第 1 类是数据一致性的检查，它主要关注数据的内容是否完全一致。这里主要有几个命令，一个是 checksum，它属于 MySQL 里面的一个检查命令，所以我们可以直接登录到 MySQL 中，通过 checksum 检查对应的数字和之前的表是否一致，检查两个表里面的数据一样，表结构（列内容和顺序一样）。</p><br><p>mysqldiff 是 MySQL Utilities 里的一个工具，它主要用于检查 MySQL 的表结构是否一致。</p><br><p>mysqldbcompare 主要是用来检查不同数据库之间的一致性，这该怎么来理解呢？假设现在部署了两套数据库，拿工具来做对应的数据库数据同步，这个时候我们就可以通过 mysqldbcompare 来检查这两套不同的数据库的数据，看看它们之间的数据是否一致。</p><br><p>pt-table-checksum 是 percona mysql工具集里的一个工具，它是在线检查主从一致性的工具，这里有一个重点需要理解，pt-table-checksum 是在主从结构里检查从主库到从库的数据是否一致.</p><br><p>第 2 类是检查 MySQL 数据项的运行状态， show processlist、show full processlist 都可以检查 MySQL 的SQL执行状态，判断 MySQL 执行的具体情况。show full processlist 展示的信息更加的完整，它能把SQL语句完整的展示出来。</p><br><p>另外检查运行状态要关注的一个指标，就是主从架构的同步状态。我们可以登录到 MySQL 里，通过执行 show slave status\\G，或者是 show master status\\G 去查看主库的状态，从而判断主从的一个节点状态是否正常，及数据同步延时。</p><br><p>第 3 类是查看数据库配置，它主要是在数据库进行迁移时，判断原有数据库和现在数据库在配置上面是否保持一致。我们可以去对比 MySQL 配置文件（也就是 my.cnf 文件），它的配置是否完全一致，如果有更改的地方，那么它的差异是否合理。另外我们可以登录到 MySQL 里来执行 show variables\\G 来查看 MySQL 的系统变量，我们也可以执行或 show status\\G 去查看它对应的状态变量，两边做对应的对比和分析，看是否符合你的预期。</p><br><p>第 4 类是查看 MySQL 日志，我将在课时 22 里为你讲解如何通过 efk 收集 MySQL 的日志。这里我们重点需要关注的是 MySQL 的 log 日志和查询日志，它们关系到数据库的执行状态和运行状态。error log 日志主要判断运行的 MySQL 错误日志。query-log 主要查看当前对外提供服务的 MySQL 查询语句是否有慢查询。</p><br><p>第 5 类是监控系统，我们可以把一些监控做到监控系统里面去，这样我们只要需要查看监控系统，基本上就可以判断出一些运行状态是否正常。</p><br><p>以上是从运维工程师的角度，在用到的数据库割接检查所需使用工具及需关注的割接检查项。</p><br>",21);function pt(it,ct,ht,ut,dt,bt){const s=r("Image");return _(),a("div",null,[i,c,h,u,d,b,g,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/06/6A/Ciqah16C0-yACkUdAAUn0Fjeq7k559.png"}),l(),m,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7F/80/Cgq2xl6C0-yAfOVkAAVgPLjNgOE302.png"}),l(),A,C,S,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7F/80/Cgq2xl6C0-2AC5_TAAWGevLSJyA141.png"}),l(),T,f,N,P,M,L,y,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7F/80/Cgq2xl6C0-2AIiQJAANXyFfWkc8409.png"}),l(),k,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/06/6A/Ciqah16C0-6AK5boAATDWWIZsHk523.png"}),l(),w,x,Q,q,D,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7F/80/Cgq2xl6C0-6AYeyEAAK0jgdukno479.png"}),l(),I,j,V,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/06/6A/Ciqah16C0-6AXw64AAE_YFW0DdE654.png"}),l(),v,E,F,O,H,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7F/80/Cgq2xl6C0-6AOhEOAANHrdS3wOg837.png"}),l(),W,G,J,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/06/6A/Ciqah16C0--AW5JQAAQ1pt-LJyo960.png"}),l(),U,R,K,$,B,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7F/80/Cgq2xl6C0--ACPjnAAHVp8fK2vo945.png"}),l(),X,Y,Z,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/06/6A/Ciqah16C0--AMrGJAAC1IcWE_d0849.png"}),l(),z,tt,lt,st,nt,et,ot,rt,_t,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/06/6A/Ciqah16C0--ARNOTAAOLnNTiNFs472.png"}),l(),at])}const At=o(p,[["render",pt]]);export{mt as __pageData,At as default};
