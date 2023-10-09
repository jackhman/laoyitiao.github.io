import{_ as l,j as i,o,h as c,k as s,f as e,Q as n,s as t}from"./chunks/framework.d3daa342.js";const Y=JSON.parse('{"title":"第22课：ELK构建MySQL慢日志收集平台详解","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/111-运维高手的36项修炼文档/(1567) 第22课：ELK 构建 MySQL 慢日志收集平台详解.md","filePath":"posts/devops/111-运维高手的36项修炼文档/(1567) 第22课：ELK 构建 MySQL 慢日志收集平台详解.md","lastUpdated":1696682708000}'),p={name:"posts/devops/111-运维高手的36项修炼文档/(1567) 第22课：ELK 构建 MySQL 慢日志收集平台详解.md"},h=n("",18),_=t("p",null,"第 2 套架构是在整个客户端里，用到了 Beats 工具来做日志收集。服务端还是维持使用 Elasticsearch 和 Kibana，Beats 代替了 Logstash，Beats 里有一个非常重要的日志收集工具，就是 Filebeat，用来代替 Logstash。主要的优势是：",-1),r=t("p",null,"对内存 CPU 的资源消耗会比 Logstash 低，所以它的性能会更好，专门用于做日志收集比较合适。",-1),g=t("p",null,"另外， Beats 提供了非常丰富的场景，除了使用 Filebeat 工具外，还可以看到会有其他的一些家族成员，如 Packetbeat 、Metricbeat、Winlogbeat ，每个家族成员都会针对性地收集一些不同的数据。所以我们想要收集其他数据内容时，就可以用 Beats 里面的其他工具针对性的收集，如 Winlog 主要收集 Windows 上的相关日志。",-1),m=t("p",null,"第 3 套方案，我们看到在第 2 套方案中加入了很多的组件，其中最重要的一个组件就是 Kafka。",-1),d=t("p",null,"Kafka 作为日志消息队列，客户端通过 Filebeat 收集数据（日志）后将其先存入 Kafka，然后由 Logstash 提取并消费，这套架构的好处是：当我们有海量日志同步情况下，直接存入服务端 ES 很难直接应承接海量流量，所以 Kafka 会进行临时性的存取和缓冲，再由 Logstash 进行提取、过滤，通过 Logstash 以后，再把满足条件的日志数据存入 ES。",-1),u=t("p",null,"ES 不再是以单实例的方部署，而是采用集群架构，考虑 Kafka 的集群模式， Logstash 也使用集群模式。",-1),L=t("p",null,"我们会看到这套架构稍微庞大，大中型的企业往往存储海量数据（上百 T 或 P 级）运维日志、或者是系统日志、业务日志。",-1),b=t("h4",{id:"搭建演示",tabindex:"-1"},[e("搭建演示 "),t("a",{class:"header-anchor",href:"#搭建演示","aria-label":'Permalink to "搭建演示"'},"​")],-1),E=t("p",null,"讲到了 Elasticsearch 里面的常见架构模式的演变（1、继续性能；2、日志级别）。接下来我们要来详细讲解如何从零开始搭建 ELK，并且收集 MySQL 日志。我们首先来看一下这样的一张图：",-1),y=t("p",null,"这张图主要用于展示接下来搭建的这套 ELK 收集 MySQL 日志的架构。这里主要用到两台机器，一个是客户端的机器，一个服务端的机器，我们知道客户端的机器是用来收集 MySQL 日志的，所以这里需要安装一个 MySQL 服务。",-1),S=t("p",null,"同时在这个结构里面，通过 Filebeat 工具来进行 MySQL 日志收集，所以需要在客户端同样安装好 Filebeat。服务端，主要安装有两个核心组件，一个是 Elasticsearch ，一个是 Kibana。",-1),K=t("p",null,"接下来，我们来大概讲一下安装 ES 的流程。首先 ELK 的所有组件可以用容器的方式去安装，而为了更加方便，主要为你演示如何直接部署。",-1),k=t("p",null,"我们先来看一下 ES 的安装，这里会通过 rpm --import 的方式，把官方认证的 key 导入，同时编辑好在 CentOS 系统上面的 yum 源。接下来在 /etc/yum.repos.d 下新建一个 elk.repo 文件，并且 yum 源官方配置进去，这样操作系统上就会有一个官方的 yum 源。对于这个 elk.repo 文件你可以在课程最后的下载链接里直接拷贝。本课时演示 ELK 是通过 CentOS 7 的操作系统来安装。",-1),A=t("p",null,"有了 ES 官方源以后，就可以安装第 1 个组件了，通过 #yum install elasticsearch -y 直接安装好 ES 。安装好以后，接下来需要配置 Elasticsearch。这里配置需要注意的一点就是把 Elasticsearch 暴露一个接口地址出来，所以我修改的是 /etc/elasticsearch 下面的 elasticsearch.yml 主配置文件，里面有一个 network.host，我们将它的配置文件修改为本地网卡的接口地址，然后通过 systemctl start elasticsearch.service 启动 ES 服务。",-1),f=t("p",null,'如何判断 ES 服务启动是否成功呢？首先可以通过执行命令 journalctl --unit 来判断服务是否正常启动？也可以通过在控制台敲入 systemctl status elasticsearch 去判断服务是否处于" running"的状态。',-1),M=t("p",null,"还有一个校验的方式，通过 curl 命令访问暴露对外地址和 elastic 默认监听的 9200 端口，并向对应路径发一个 HTTP 请求，判断是否有正常 HTTP 响应并且查看它的响应内容。",-1),Q=t("p",null,"具体的 curl 方式是这样的，curl 后面加对外暴露的接口地址，然后回车，就会在终端里返回并展示一段 JSON 格式的信息，我们会看到 Elasticsearch 当前的一些版本等信息，这说明 ES 运行正常。",-1),q=t("p",null,"接下来安装第 2 个组件 Kibana，我们来看一下它是怎么安装的。我先把本地的官方 yum 本源配置好（elk.repo），接下来可以直接用 yum install kibana 一键完成安装。安装完成以后，同样需要去修改它的配置，这个配置在 /etc/kibana.yml ，那么主要修改这几个地方，一个是服务端口默认是 5601，还有对外暴露的服务地址。 另外，需要取 Elasticsearch 里面数据接口地址，所以我们要配置好 Elasticsearch 对外的服务接口。启动方式是通过：/usr/share/kibana/bin/kibana -c /etc/kibana/kibana.yml，完成对 kibana 的启动，或者可以通过 systemctl start kibana 的方式，直接启动 kibana 服务。",-1),C=t("p",null,"那么启动完成以后，就可以在浏览器里访问 kibana 的管理界面，敲入 kibana 对外暴露的 IP 地址，还有 5601 对外暴露的服务端口号，就可以访问 kibana 的后台。登录后的展示界面。",-1),F=t("p",null,"接下来我们需要去配置客户端日志采集。客户端是如何来做的呢？首先我们需要安装好一台 MySQL，同时需要安装日志收集工具 filebeat。",-1),P=t("p",null,"filebeat 同样是在安装好官方源后，直接通过 #yum install filebeat-y 方式来完成一键安装。安装完成以后，同样是要修改 filebeat 的配置文件，这里主要是修改对外输出的模式，我们需要设置让 filebeat 输出到 Elasticsearch 中，所以我们需要指定它通过 Elasticsearch 方式对外输出，要指定输出到 Elasticsearch 主机地址是哪个，这里演示的是一个单实例的方式配置只需要写一台 ES 接口。如果是集群的方式，可能就需要写多个主机和端口的接口地址了。",-1),T=t("p",null,"我们刚配置的是 Elasticsearch 的一个输出端该如何做，也要要配置输入。从哪个地方做日志采集，我们收集的是 MySQL 的慢查询日志， filebeat 默认集成了很多的日志收集插件，我们只需要激活 MySQL 这个收集插件 ，就可以来收集 MySQL 的日志了。",-1),B=t("p",null,"所以通过在终端执行 #filebeat modules enable mysql ，就把 MySQL 的日志激活插件完成了，同时我们可以通过 filebeat modules list 命令，去判断 MySQL 插件是否已经激活。接下来修改在 /etc/filebeat/modules.d 的 mysql.yml 插件配置。",-1),z=t("p",null,'指定好它的 slowlog，也就是慢日志的收集路径，就可以监听并收集 MySQL 日志。我们可以在客户端通过这样一条命令，filebeat -e -c filebeat.yml -d "publish"，-c 指定的是它的主配置文件。然后通过 -d "publish" 方式去推送客户端日志。',-1),w=t("p",null,"接下来登录到控制台，可以通过执行这条命令来推送。我们可以看到，终端会展示出推送日志的相关进度和一些信息。",-1),H=t("p",null,"同时再开一个客户端的终端，然后登录到以前安装好的 MySQL 。 首先我们需要开启 MySQL 的慢查询日志，并且指定 MySQL 的慢查询日志路径和标准，比如说是大于 1 秒才做 MySQL 慢查询日志记录。此外，我们还要模拟执行一条延迟比较长的 MySQL 语句来产生这样的一条日志信息，让 filebeat 进行日志的推送。我们会看到 filebeat 在整个启动完成以后，日志停留在等待的状态，并没有新的日志在刷新。",-1),W=t("p",null,"所以我们现在来模拟演示一下。首先我需要开启的是 MySQL 的慢查询配置，那么通过 set global slow_query_log='ON'，这样就可以开启慢查询日志，还需要设置好慢查询日志标准是大于 1 秒的，那么同样是 set global long_query_time 大于或等于 1，它的意思是大于 1 秒的查询语句，才会认为是慢查询，并且做日志的记录。",-1),x=t("p",null,"那么另外还要设置慢查询日志的位置，通过 set global slow_query_log = 日志文件路径，这里设置到 filebeat 配置监听的路径下，就完成了慢查询日志的路径设置。",-1),N=t("p",null,"配置完成以后，需要在 MySQL 终端上，模拟执行一条执行时间较长的语句，比如执行 select sleep(5)，这样就会模拟执行一条查询语句，并且会让它休眠 5 秒。接下来我们看到服务端窗口的 MySQL 这条 sleep 语句已经执行完毕了，同时我们可以再打开 filebeat 的推送窗口，发现这里产生了一条推送日志，表示成功地把这条日志推送给了 ES。",-1),V=t("p",null,"那么接下来我们就可以通过浏览器打开 Kibana 的管理后台，从界面里来看一看检索日志的记录和一些可视化展示的图表，我们可以点击界面上的 Discover 按钮，同时选择好对应的时间周期，然后可以增加一个 filter 过滤器，过滤器里面敲入对应的关键字来进行索引。",-1),v=t("p",null,"这里我敲入的是 slow.query 这个关键字，就会匹配出对应的可以检索的项目，点击想要查询的对应项目，展示出想检索的某一个时间周期内对应的一些日志记录，以及它的图表是什么样子的，同时在下方会有对应的 MySQL 的日志信息打印出来，通过 Kibana 这样的可视化界面就能够看到的相关信息了。",-1),I=t("p",null,"我们会看到通过这样的一个成型的日志检索系统去检索分析起来会更加容易，我们不需要通过一些临时性的命令或编写脚本进行复杂烦琐分析，能够快速、高效的获取我们想要的结果。",-1),j=t("p",null,[e("本专栏课中的所有案例配置及源代码，你可以课后通过链接"),t("a",{href:"http://www.jesonc.com/jeson/2020/02/07/ywgs36/",target:"_blank",rel:"noreferrer"},"http://www.jesonc.com/jeson/2020/02/07/ywgs36/"),e(" 进行下载，密码为：mukelaoshi。")],-1);function O(U,G,J,D,R,$){const a=i("Image");return o(),c("div",null,[h,s(a,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image/M00/04/58/Ciqc1F6z5SGAQhkKAAU8iq4TdH8042.png"}),e(),s(a,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image/M00/04/58/Ciqc1F6z5SaAKUmwAAYyNWdHooE182.png"}),e(),_,r,g,s(a,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image/M00/04/58/Ciqc1F6z5TeAC7N2AAdHW2m1zI8345.png"}),e(),m,d,u,L,b,E,s(a,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image/M00/04/58/CgqCHl6z5U2AHWb9AAWMvjPVKxg279.png"}),e(),y,S,K,k,A,f,s(a,{alt:"image.png",src:"https://s0.lgstatic.com/i/image/M00/04/58/Ciqc1F6z5aiAPWhVAATBHouaBAk740.png"}),e(),M,Q,s(a,{alt:"image (1).png",src:"https://s0.lgstatic.com/i/image/M00/04/58/CgqCHl6z5bCASazjAAOYchcFIA4972.png"}),e(),q,C,s(a,{alt:"image (2).png",src:"https://s0.lgstatic.com/i/image/M00/04/58/CgqCHl6z5cuAQ4-LAAPqe8miRuU124.png"}),e(),F,P,T,B,z,w,s(a,{alt:"image (3).png",src:"https://s0.lgstatic.com/i/image/M00/04/58/CgqCHl6z5d2AcOLCAAJxBl6qrh8402.png"}),e(),H,W,s(a,{alt:"image (4).png",src:"https://s0.lgstatic.com/i/image/M00/04/58/CgqCHl6z5f2Adg-FAAG1tRCeSEs038.png"}),e(),x,s(a,{alt:"image (5).png",src:"https://s0.lgstatic.com/i/image/M00/04/58/Ciqc1F6z5gaAVbOEAADJKPLGQmc895.png"}),e(),N,s(a,{alt:"image (6).png",src:"https://s0.lgstatic.com/i/image/M00/04/58/Ciqc1F6z5g-ASJ0NAAA7FAzWRc8740.png"}),e(),V,s(a,{alt:"image (7).png",src:"https://s0.lgstatic.com/i/image/M00/04/58/CgqCHl6z5iGAPXFTAAG-rTIWEkU001.png"}),e(),v,s(a,{alt:"image (8).png",src:"https://s0.lgstatic.com/i/image/M00/04/58/Ciqc1F6z5iiAK1ZXAAG-rTIWEkU923.png"}),e(),I,j])}const Z=l(p,[["render",O]]);export{Y as __pageData,Z as default};
