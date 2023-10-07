import{_ as s,j as r,o as n,g as p,k as e,h as a,Q as i,s as l}from"./chunks/framework.4e7d56ce.js";const A=JSON.parse('{"title":"06日志可视化：Kibana让千万行日志有形有样","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/应用性能分析实战_文档/(7055) 06  日志可视化：Kibana 让千万行日志有形有样.md","filePath":"posts/backEnd/应用性能分析实战_文档/(7055) 06  日志可视化：Kibana 让千万行日志有形有样.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/应用性能分析实战_文档/(7055) 06  日志可视化：Kibana 让千万行日志有形有样.md"},o=i('<h1 id="_06日志可视化-kibana让千万行日志有形有样" tabindex="-1">06日志可视化：Kibana让千万行日志有形有样 <a class="header-anchor" href="#_06日志可视化-kibana让千万行日志有形有样" aria-label="Permalink to &quot;06日志可视化：Kibana让千万行日志有形有样&quot;">​</a></h1><p>这一讲我将带领你学习如何使用 <strong>Kibana</strong> 对海量日志进行探索和分析。</p><p>本节会首先介绍 Kibana 在 Elastic Stack 生态中扮演的角色，通过产品视角了解 Kibana；然后我们一起回顾下日志分析架构在近几年的发展历程和当下的日志内容。</p><p>最后结合当下最具代表性的集中式日志分析架构 Elastic Stack 生态，与你分享 Kibana 对 Elasticsearch 的日志索引，进行索引模式配置；并通过可视化组件对日志进行分析，然后将关联的日志可视化组件组合成监控大盘。</p><p>Kibana 作为 Elastic Stack 生态中的数据展示项目，我们就先了解一下 Elastic Stack 及其前身 ELK。</p><h3 id="elastic-stack-前身-elk-生态" tabindex="-1">Elastic Stack 前身：ELK 生态 <a class="header-anchor" href="#elastic-stack-前身-elk-生态" aria-label="Permalink to &quot;Elastic Stack 前身：ELK 生态&quot;">​</a></h3><p>Elastic Stack 生态是 Elastic 公司最近两三年提出的架构，如果你对 Elastic Stack 陌生，那我们先聊聊它的前身 ELK 生态。</p><p>ELK 是 Elastic 公司的三个开源项目的缩写，这三个项目分别如下。</p><ul><li><p>Elasticsearch：基于 Apache Lucene 搜索引擎，使用 RESTful 接口屏蔽了搜索架构的复杂性。</p></li><li><p>Logstash：服务器数据处理管道。</p></li><li><p><strong>Kibana</strong>：Elasticsearch 搜索引擎的可视化平台。</p></li></ul><p>当应用服务的日志通过 Logstash 进行结构化处理，进入 Elasticsearch 搜索引擎后，海量的日志就具备了在 Kibana 平台上的集中式实时分析的能力。</p><p>以上三者便让 Elastic Stack 成为目前最流行，也最具代表性的日志分析架构。在了解 Elastic Stack 之前，我们需要先了解下日志分析架构的演进过程。</p><h3 id="日志分析框架的演进" tabindex="-1">日志分析框架的演进 <a class="header-anchor" href="#日志分析框架的演进" aria-label="Permalink to &quot;日志分析框架的演进&quot;">​</a></h3><p>学习过往，助于引发我们对当下日志分析架构的思考：理解为什么 Elastic Stack 生态是最优解？Elastic Stack 生态又到底解决了什么痛点？</p><p>日志分析架构大致有以下三个阶段。</p><h4 id="_1-原始-时期" tabindex="-1">1.&quot;原始&quot;时期 <a class="header-anchor" href="#_1-原始-时期" aria-label="Permalink to &quot;1.&quot;原始&quot;时期&quot;">​</a></h4><p>时间拨回 2000 年初，互联网刚刚兴起，整体的应用服务架构还未进入微服务时代，应用服务大多都是单体的，所以应用服务的日志天生就是集中在那台单体机器上打印的日志。</p><p>由于互联网企业都着眼在拓展业务上，且当时的开发人员也都非常淳朴，还没有窃取公司数据贩卖的案例。顺应当时的时代背景，大多数公司的一线开发都被授予直接登录服务器的管理员权限。</p><p>所以这个时候开发人员一般都使用 Llinux 服务器的统计命令来探索和分析日志。</p><h4 id="_2-集中式日志架构初期" tabindex="-1">2.集中式日志架构初期 <a class="header-anchor" href="#_2-集中式日志架构初期" aria-label="Permalink to &quot;2.集中式日志架构初期&quot;">​</a></h4><p>时间往后拨几年，互联网应用进入了微服务架构时代。随着产品根据不同的功能，切分为多个微服务，企业的产品迭代迎来了质的提效。</p><p>但任何事物都没有单方面的优点，不加治理的微服务让日志结构更加复杂，再加上流量红利，日志的复杂度和量级都以指数趋势上升。即使一线开发依然被授予应用服务器的管理员权限，&quot;原始&quot;的日志分析手段也变得耗时、费力，且效率低下。</p><p>这时，无法高效的处理，复杂日志场景的缺点完全暴露出来了，再加上安全审计的监管要求，集中式日志架构的诉求呼之欲去。</p><p>由于此时市场上还没有开源好用的集中式日志架构，为了快速解决这一问题，最典型的架构就是使用 Hadoop 平台实现日志的离线处理。不过 Hadoop 框架是编程框架，并非可以拿来即用的日志分析平台。</p><p>所以这个阶段的集中式日志架构的共通点是：需要耗费人力通过编码才能实现，且上线后实时性较差。</p><h4 id="_3-标准化、规范化时期" tabindex="-1">3.标准化、规范化时期 <a class="header-anchor" href="#_3-标准化、规范化时期" aria-label="Permalink to &quot;3.标准化、规范化时期&quot;">​</a></h4><p>时间来到当下，经过上一阶段的沉淀，很多优秀的开源日志分析平台脱颖而出。其中<strong>Elastic Stack</strong>生态是最受业内欢迎的，且最具代表的集中式日志实时处理和分析的解决方案。</p><h3 id="重新认识日志" tabindex="-1">重新认识日志 <a class="header-anchor" href="#重新认识日志" aria-label="Permalink to &quot;重新认识日志&quot;">​</a></h3><p>在展开对<strong>Kibana</strong>的学习前，我们有必要重新认识下原始物料，就是每一行日志的内容。理解日志的内容，有助于更好地学习下文的&quot;如何对海量日志进行搜索和图形化展示&quot;部分。</p><p>因为如果不对原始物料进行思索，贸然接入 Elastic Stack 日志架构后，会发现存到 Elasticsearch 搜索引擎日志数据会仅有时间戳和原始日志内容。这样在探索和分析上，由于都是未加处理成结构化的日志，根本无法发挥<strong>Kibana</strong>的可视化能力。所以为了让日志更具备分析性，便需要先复习下当下日志的内容，然后再学习如何进行探索和分析。</p><p>当下的业务开发人员都是将日志信息委托给日志框架进行打印，所以日志内容可以分为两类：</p><ul><li><p>日志框架打印的日志信息</p></li><li><p>一线开发人员打印的日志信息</p></li></ul><p>除了业务开发人员通过日志框架打印业务日志外，在框架层面还有框架日志。</p><p>其中日志框架打印的信息，常用的属性如下。</p><ul><li><p>时间戳：调用日志方法时生成时间戳，解决异步打印、异步收集造成的时间不精准问题。</p></li><li><p>线程名称：由于线程 ID 不直观，所以通常使用线程名称来标识线程（注意不可以使用默认线程名称，需要根据使用线程情况来重命名线程名称）。</p></li><li><p>日志级别：根据日志级别的不同，可粗略地对日志进行预处理。比如 DEBUG、TRACE 级别的日志只有在定位问题时才记录；当日志为 ERROR 级别时，立刻发出告警。</p></li><li><p>调用位置：记录打印日志的类名和行号，有助于开发人员快速寻找源代码的上下文现场。</p></li><li><p>增强属性：如全链路跟踪 ID，用于追溯引起日志打印的上下游。</p></li></ul><p>关于更详细的日志属性和如何实现结构化日志，我会在《13 | 结构化日志：如何规范化数千开发的应用日志？》中与你分享。</p><p>那现在可以简单认为：日志在接入 Elastic Stack 生态后，通过<a href="https://www.elastic.co/guide/en/logstash/master/plugins-filters-grok.html?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">Grok 工具</a>使用与<strong>结构化</strong>匹配的正则，将原始日志提取出通用的日志属性和对应的值，产出结构化的 Elasticsearch Doc 文档。然后再将其存储到 Elasticsearch 中，开发人员就可以根据这些属性在 Kibana 中，更好地进行日志数据的探索和分析了。</p><h3 id="kibana-探索和分析日志" tabindex="-1">Kibana 探索和分析日志 <a class="header-anchor" href="#kibana-探索和分析日志" aria-label="Permalink to &quot;Kibana 探索和分析日志&quot;">​</a></h3><p>使用 Kibana 探索和分析日志大致分为以下三种使用方式。</p><ul><li><p>第一种：通过 Kibana 探索（Discovery）功能，进行准确、实时的集中日志搜索。</p></li><li><p>第二种：创建多样的可视化视图（Visualize），将相关联的视图组合成仪表盘（Dashboard）。</p></li><li><p>第三种：通过 Elasticsearch SQL 直接从 Elasticsearch 中提取数据，加上丰富元素布局绘制画布（Canvas）。</p></li></ul><p>前两种相对通用，使用方式都是必须基于<strong>创建索引模式</strong>（index pattern），然后对索引数据进行探索和分析，而第三种相较前两种也较个性化和高级。</p><h4 id="_1-创建索引模式" tabindex="-1">1.创建索引模式 <a class="header-anchor" href="#_1-创建索引模式" aria-label="Permalink to &quot;1.创建索引模式&quot;">​</a></h4><p>索引模式告诉 Kibana 哪些 Elasticsearch 索引包含了你想处理的日志数据，创建索引模式有多种方式，最常见的就是使用后置通配符。</p><p>在单个 Elasticsearch 集群内部完成索引模式的创建。如下图所示，集群内部有多个以&quot;天&quot;为切分维度的日志索引。如 data_logs-20210307、data_logs-20210306、data_logs-20210305 等，我们可以通过 data_logs-* 的正则表达式完成索引的匹配。</p>',43),_=i('<p>在创建好一个日志索引模式后，我们就可以在&quot;探索页面&quot;中搜索日志数据了；然后再在可视化视图中以图表、表格等方式分析数据。</p><p>下面以官方的网站请求日志示例数据为例进行讲解。</p><h4 id="_2-探索日志" tabindex="-1">2.探索日志 <a class="header-anchor" href="#_2-探索日志" aria-label="Permalink to &quot;2.探索日志&quot;">​</a></h4><p>探索功能非常容易上手，在企业内部 SRE 负责部署 Elastic Stack，一线业务开发只需将应用日志在机器上的地址和日志结构化正则表达式告诉给 SRE。</p><p>不一会儿在探索功能页面上就能看到应用服务所有节点的日志了。通过探索功能，开发人员可以搜索日志数据的每个属性，并过滤结果。</p><p>不仅如此，我们还可以获取与搜索相匹配的文档字段级详细信息，以及查看搜索命中日志前后发生的日志。如下图所示，下面探索场景包括以下三个部分。</p><ul><li><p>搜索条件：网站请求非正常返回（HTTP 状态码非 200），且地域为中国流量。</p></li><li><p>结果过滤：由于日志属性较多，实现只返回 IP 地址、机器设备和请求的 host。</p></li><li><p>时间范围：最近七天。</p></li></ul>',7),h=i('<p>如上图所示，我采用的搜索方式是使用两个 Filter 实现&quot;条件搜索&quot;，我也比较推荐这种方式；而使用 Seach 输入框里输入基于 Lucene 语法的语句，或是基于 KQL 的语法的语句，我则是不推荐的。</p><p>虽然这三种语法都可以实现&quot;探索日志&quot;这一目标。但 Filter 查询语法是最常用的，并且在你熟练掌握以后，你还可以用它去&quot;查询索引&quot;；而后两者的使用场景就少了很多。</p><p>所以，这也是我们学习 APM 过程中要注意的地方，你要尽量去学习那些现在能常用的，未来能复用的知识和技能。这样才能为未来进阶打好基础，职业发展才能越来越宽。</p><h4 id="_3-制作多样的可视化视图" tabindex="-1">3.制作多样的可视化视图 <a class="header-anchor" href="#_3-制作多样的可视化视图" aria-label="Permalink to &quot;3.制作多样的可视化视图&quot;">​</a></h4><p>可视化视图是制作仪表盘的素材，视图的质量紧密关着仪表盘的效果。如何掌握制作可视化视图呢？我们可以先学习最热门视图，然后在对更多视图的学习逐个击破，目前 Kibana 可视化视图共有 20 个左右的视图，视图共分为 8 类。</p><p>下表是我在日常工作中使用场景多的视图，你可以通过以下表快速学习并掌握热门视图的概要。若想更深入地学习，可以访问<a href="https://www.elastic.co/guide/en/kibana?fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">Kibana 官方文档</a>。</p><table><thead><tr><th style="text-align:center;">分类</th><th>视图</th><th style="text-align:center;">说明</th></tr></thead><tbody><tr><td style="text-align:center;">基础 图形</td><td>Line Area Bar charts</td><td style="text-align:center;">线形图、面积图和柱形图：在 X/Y 图中比较不同的系数。多用于对比。比如月销商品类目的折线图。</td></tr><tr><td style="text-align:center;"></td><td>Pie chart</td><td style="text-align:center;">饼图：显示每个来源对总体的贡献。</td></tr><tr><td style="text-align:center;">数据</td><td>Data table</td><td style="text-align:center;">数据表：将汇总数据平铺成表格格式。可以理解为 Kibana 对数据库数据信息的一种原始的展示手段。</td></tr><tr><td style="text-align:center;">地图</td><td>Maps</td><td style="text-align:center;">地图：显示 Kibana 的地理空间数据。根据请求地址和地理信息，可以直观分析出应用服务地域使用上的差异，有助于产品的本地化建设。</td></tr><tr><td style="text-align:center;">热图</td><td>Heat map</td><td style="text-align:center;">使用矩阵，显示阴影单元格。在分析应用服务日志中，对于开发人员，使用热图可以快速分析出那些代码块较核心，然后针对性地通过分布式手段降低此处代码块的热度。</td></tr><tr><td style="text-align:center;">其他</td><td>Markdown widget</td><td style="text-align:center;">使用 Markdown 文档进行信息说明。</td></tr></tbody></table><p>可视化视图上手非常简单，以上文探索日志场景为例，只需要将过滤器迁移到视图中就可以快速绘制出相应的可视化视图。</p><p>下面是饼图的示例：比如绘制近七天非正常的请求流量的机器设备分布，并且还要二次分析出非正常流的具体的异常码的分布情况。</p>',9),d=l("h4",{id:"_4-构建仪表盘",tabindex:"-1"},[a("4.构建仪表盘 "),l("a",{class:"header-anchor",href:"#_4-构建仪表盘","aria-label":'Permalink to "4.构建仪表盘"'},"​")],-1),b=l("p",null,"仪表盘是相关可视化视图的集合，进入仪表盘的编辑模式，引入相关主题的可视化视图。然后对可视化视图进行展示布局调整，就完成了仪表盘的创建。",-1),u=l("p",null,"下面是网站请求日志示例仪表盘：",-1),g=i('<h4 id="_5-绘制画布" tabindex="-1">5.绘制画布 <a class="header-anchor" href="#_5-绘制画布" aria-label="Permalink to &quot;5.绘制画布&quot;">​</a></h4><p>画布是 Kibana 相对于仪表盘的另一种全新的可视化展示方式。</p><p>通过画布，一线业务开发可以直接从 Elasticsearch 中获取实时数据。区别于仪表盘，画布的制作不仅无须先制作可视化视图，它还可提供更丰富的颜色、形状、文本等展示形态，让用户的想象力充分发挥。</p><p>画布制作过程分为：</p><ul><li><p>创建空白工作区域（workpad）</p></li><li><p>选择元素，设置元素的颜色、图像和数据</p></li><li><p>指定元素的尺寸和调整布局</p></li><li><p>保存画布的演示布局</p></li></ul><p>下面为网站访问的画布示例，你可以进入编辑模式，然后点击每一个元素去查看绘制的源代码。</p>',6),k=i('<h3 id="如何快速学会使用-kibana" tabindex="-1">如何快速学会使用 Kibana <a class="header-anchor" href="#如何快速学会使用-kibana" aria-label="Permalink to &quot;如何快速学会使用 Kibana&quot;">​</a></h3><p>上文中，通过对网站请求日志示例的讲解，告诉你如何以创建索引模式为起始，最终实现仪表盘和画布的绘制。</p><p>但是，如何做出优质的仪表盘和画布，其中还有很多学问、很多的路要去学习实践，我建议你可以从以下两方面入手。</p><h4 id="_1-索取需求上线后的指标" tabindex="-1">1.索取需求上线后的指标 <a class="header-anchor" href="#_1-索取需求上线后的指标" aria-label="Permalink to &quot;1.索取需求上线后的指标&quot;">​</a></h4><p>最了解产品的建设路线和洞悉用户的人肯定是产品经理和运营，所以开发人员在接到需求时，开发人员不仅要理解需求本身如何去实现，更要反过来对产品经理或是需求的发起者提出上线后的运营效果指标的诉求。</p><p>比如需求中要实现的每个接口的 PV、UV 预估，能带来多少 DAU 等，开发人员可以通过 Elastic Stack 快速构建这些指标。这些指标不仅可以指导提测报告中的合理压测标准预期，也是指导开发构建应用服务仪表盘的基础，以及有的放矢地进行性能优化的依据。</p><h4 id="_2-精进官方示例" tabindex="-1">2.精进官方示例 <a class="header-anchor" href="#_2-精进官方示例" aria-label="Permalink to &quot;2.精进官方示例&quot;">​</a></h4><p>Kibana 是 Elastic Stack 生态最上层的可视化平台，其设计初衷就是让更多用户通过 Kibana发挥出数据的价值，所以上手难度相对不高，但用好却很难。</p><p>为此官方提供了三个示例，我们可以通过对示例的学习，快速掌握 Kibana 大盘的构建过程。</p><ul><li><p>电子商务订单示例：从电子商务系统订单表中分析订单数据，包括商品类目月销的折线图、订单数据展示等。</p></li><li><p>航班数据示例：分析航班系统的示例，仪表盘多为基于地理图的航班行为进行分析。</p></li><li><p>网站请求日志示例：从应用服务的海量访问日志中分析流量的行为，里面包含设备分析的饼图、应用资源访问的散点图等。</p></li></ul><h3 id="小结与思考" tabindex="-1">小结与思考 <a class="header-anchor" href="#小结与思考" aria-label="Permalink to &quot;小结与思考&quot;">​</a></h3><p>今天的课程，我先带你学习了 Elastic Stack 生态，Elastic Stack 生态是目前集中式日志架构的最优解。架构主要分为三个部分：数据管道、数据存储、数据展示，课程内容主要对数据展示<strong>Kibana</strong>项目进行展开。</p><p>首先铺垫了应用日志的演进过程和当下日志的内容，然后使用 Elastic Stack 将离散的应用日志进行集中收集，使用 Kibana 进行创建日志索引模式，然后构建画布和仪表盘的最终过程。</p><p>画布和仪表盘里面的学问有很多，不是仅掌握 Kibana 就可以的，开发人员需要从外部获取更多的需求相关指标，通过不断积累才可以逐渐创建出更优质的画布和仪表盘。</p><p>我相信你用 Kibana 肯定不局限于进行集中日志的简单探索。那你用过 Kibana 做过什么仪表盘和画布呢？在过程中有什么实践和思考，欢迎写在评论区，期待与你讨论。</p>',15);function q(E,m,K,S,x,T){const t=r("Image");return n(),p("div",null,[o,e(t,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image6/M01/37/52/CioPOWB2qruAMOqYAAC1WTj0dYE062.png"}),a(),_,e(t,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image6/M01/37/52/CioPOWB2qqiAM9ElAAM4hw9QmvM942.png"}),a(),h,e(t,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image6/M01/37/4A/Cgp9HWB2qsyAYcuFAAPeVY6wgTk178.png"}),a(),d,b,u,e(t,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image6/M01/37/4A/Cgp9HWB2qtWAfCOjAATWi_7mkG4966.png"}),a(),g,e(t,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image6/M00/37/52/CioPOWB2qt2AebMMAAQA73avPs4258.png"}),a(),k])}const f=s(c,[["render",q]]);export{A as __pageData,f as default};
