import{_ as a,o as t,g as e,Q as p}from"./chunks/framework.4e7d56ce.js";const q=JSON.parse('{"title":"掌握存储标准，打通数据孤岛 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/应用性能分析实战_文档/(7071) 22  拥抱未来：如何备战下一代性能监控系统？.md","filePath":"posts/backEnd/应用性能分析实战_文档/(7071) 22  拥抱未来：如何备战下一代性能监控系统？.md","lastUpdated":1696417798000}'),o={name:"posts/backEnd/应用性能分析实战_文档/(7071) 22  拥抱未来：如何备战下一代性能监控系统？.md"},r=p('<p>我们这就进入最后一节正课了。作为尾声，这一讲我将与你讨论如何备战下一代性能监控系统。将围绕 1.监控数据能力，提升数据价值。2.掌握数据库技术。3. 融入开源社区。这三个方向与你分享。</p><h3 id="掌握存储标准-打通数据孤岛" tabindex="-1">掌握存储标准，打通数据孤岛 <a class="header-anchor" href="#掌握存储标准-打通数据孤岛" aria-label="Permalink to &quot;掌握存储标准，打通数据孤岛&quot;">​</a></h3><p>性能监控系统主要通过日志收集、指标监控、链路追踪、在线诊断这四个手段完成监控。产品的用户主要是一线开发人员、故障专员、运维保障人员。企业内部通常会部署十几种，甚至几十种监控系统，来分析应用程序的性能问题；每个应用性能监控系统的数据最终都可以归纳到日志、指标、明细上面去。</p><p><strong>如此多的监控数据，要发挥提效价值，最重要的就是：贯穿监控信息，解决数据孤岛。</strong></p><p>比如《21 | 高维思考：通过监控 Case，彻底悟透 OpenTracing》讲述的链路监控与数据库监控和 Nginx 打通的案例。</p><ul><li><p>打通后，在慢查询报警出现时，不仅可以展示慢查 SQL，让开发人员和 DBA 可以对 SQL 进行优化；</p></li><li><p>还可以关联出应用集群的全链路，让开发人员定位出慢查引起的原因；</p></li><li><p>最后还可以关联 Nginx，拿到引发问题的用户请求信息。算是通过理解各个监控系统的数据标准，打通监控数据，实现了慢查场景提效这一目标。</p></li></ul><p>所以我建议你按照<strong>日志、指标、明细</strong>这三个方向去学习数据标准，并以打通企业监控数据孤岛，释放异构数据价值为目标，多去学习和实践。</p><ul><li><p>关于学习，官网内容比较规范标准去学习，你可以去系统地了解 Dapper、OpenTracing 等；而博客内容多为总结提炼，易于你学习入门；但想要提高，全面钻研原始文献是非常必要的。</p></li><li><p>关于实践，最好的方式就是二次开发。二次开发并上手异构数据的前提，是需要你选择一门适合存储 APM 数据的数据库技术。</p></li></ul><h3 id="掌握一门数据库技术" tabindex="-1">掌握一门数据库技术 <a class="header-anchor" href="#掌握一门数据库技术" aria-label="Permalink to &quot;掌握一门数据库技术&quot;">​</a></h3><p>应用服务可以说是<strong>业务逻辑</strong> 加上<strong>数据介质</strong>组成，</p><ul><li><p>业务逻辑，就是开发人员将产品需求转化的业务逻辑代码；</p></li><li><p>数据介质，就是存储逻辑痕迹的介质。随着互联网+大数据时代，APM 海量数据的存储和计算就成了问题。</p></li></ul><p>那如何解决数据存储问题呢？先看下我们未来要解决什么问题。</p><h4 id="_1-二次开发问题" tabindex="-1">1.二次开发问题 <a class="header-anchor" href="#_1-二次开发问题" aria-label="Permalink to &quot;1.二次开发问题&quot;">​</a></h4><p>首当其冲的就是二次开发问题，<strong>存储监控数据的介质要方便异构语言的二次开发</strong>。很多二次开发往往是小迭代，肯定不会是 APM 的核心功能。在这些小迭代中，查询需求最为频繁。</p><blockquote><p>比如，把某个应用依赖的直接上游导出 excel，那些应用服务的依赖方超过了 20 个。能实现对接<strong>异构语言</strong>友好，二次迭代简单的技术肯定需要数据库支持 RESTFul 接口。</p></blockquote><p>其次，存储的海量 APM 数据是时序数据。时序数据是按时间顺序记录的数据列，同一数据列的各个数据必须是同口径的，要求有<strong>可比性</strong>。时序数据可以是时期数，也可以时点数。</p><p>时序数据最基本的要求就是数据存储必须具有时间戳字段，所以目前全部的数据库都是支持存储时序数据的。但在所有引擎中，存储时序数据性能最好的存储引擎就是<strong>时序数据库类型的存储引擎</strong>，其中 influxDB 最具代表性。在相同资源的情况下，influxDB 性能吞吐性能是其他数据引擎几倍。</p><p>那我们怎么选择数据库技术进行备战呢？</p><h4 id="_2-掌握-elasticsearch" tabindex="-1">2.掌握 Elasticsearch <a class="header-anchor" href="#_2-掌握-elasticsearch" aria-label="Permalink to &quot;2.掌握 Elasticsearch&quot;">​</a></h4><p>在存储性能上，influxDB 时序存储引擎有着性能优势；但是基于开源版本的容灾架构，以及二次开发的友好性，influxDB 显然还相差甚远。</p><p>而如果使用 Elasticsearch，性能虽有所下降，但我们可以通过<strong>增加集群节点去水平扩容</strong>。</p><p>资源有限的情况下，可以使用 Elasticsearch 冷热架构，也就是 Hot-Warm 节点部署方式去弥补。因为 APM 数据是非典型的时序存储。</p><ul><li><p>近期数据，比如近 24 小时的数据为最重要的数据，可以存放在热节点，热节点对应为高性能环境；</p></li><li><p>其余数据，则可以通过&quot;shard allocation awareness&quot;，从热节点迁移存储到冷节点，这些数据仅用于归档。</p></li></ul><p>APM 数据存储在这样架构的 Elasticsearch 集群上，对其他任何数据库架构都可以做到降维打击。</p><ul><li><p>相比传统的关系型数据库，Elasticsearch 有着资源占用少、插入读取性能高的能力；</p></li><li><p>相比时序型数据库，Elasticsearch 通过暴露 RESTFul 接口，可以做到异构语言二次开发简单，容灾能力强；</p></li><li><p>相比大数据、数据仓库引擎，Elasticsearch 的准实时能力，以及与生具备的简单的二次准实时聚合分析能力，都是数仓引擎不具备的。</p></li></ul><p>综上所述，我建议你掌握 Elasticsearch 数据库技术。Elasticsearch 有着准实时能力、架构灵活可变、支持多种复杂场景的优点。</p><p>此外，经过我们对<a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=729&amp;sid=20-h5Url-0&amp;buyFrom=2&amp;pageId=1pz4#/detail/pc?id=7055&amp;fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">&quot;06 | 日志可视化：Kibana 让千万行日志有形有样&quot;</a>和<a href="https://kaiwu.lagou.com/course/courseInfo.htm?courseId=729&amp;sid=20-h5Url-0&amp;buyFrom=2&amp;pageId=1pz4#/detail/pc?id=7056&amp;fileGuid=xxQTRXtVcqtHK6j8" target="_blank" rel="noreferrer">&quot;07 | 数据可视化：多数据源让 Grafana 监控报警更高效&quot;</a>的学习，Elasticsearch 可以通过 Kibana 和 Grafana 快速完成数据可视化展示。所以说，在应用性能监控系统的存储能力上，Elasticsearch 算得上一门&quot;万金油&quot;的数据库技术。</p><h3 id="学会融入开源社区" tabindex="-1">学会融入开源社区 <a class="header-anchor" href="#学会融入开源社区" aria-label="Permalink to &quot;学会融入开源社区&quot;">​</a></h3><p>最后一点，我们要具备融入开源社区的能力。因为在日常工作中，我们往往被常规的产品功能迭代围绕着，从能接触到的技术来讲，也只有内部定好的应用服务依赖脚手架，或是内源技术产品。</p><p>但你仔细思考下，有没有发现一个明显的现象：内部已经定好的应用服务脚手架都是技术最流行的架构的某个稳定版本。比如 SSM Greenwich 版本的脚手架，内源技术产品也多为开源产品的简单二次封装，也就是以往流行的&quot;造轮子&quot;产品越来越少了。究其原因，无外乎是开源的技术在基建领域有着极强的生命力，而企业则更需要产品功能迭代的执行力。</p><p>那回到现况，你知道平均一个微服务项目的开源代码占比有多少吗？已经超过了&quot;二八原则&quot;中的 80%，达到了 92% 以上了，而且还在逐步递增。因为对于工程类项目，只需要在已有的脚手架基建上垒业务代码即可。所以开源代码的占比只会越来越多，这也间接促进了开源文化的改变。</p><p>近两年，国内开源社区文化真的可以说是有了&quot;质变&quot;，最具代表性的就是 Apache 社区和 Alibaba 社区。国内很多监控领域的解决方案都贡献到了这些开源社区，比如一站式 APM SkyWalking、在线剖析工具 Arthas 等。</p><p>在企业内部，通过选型这些开源产品落地应用性能管理系统，你就拥有了使用、学习开源技术的机会。在这过程中，你不断深耕某一项目，其实就是在深耕一个领域。毕竟技术都是触类旁通的，这样你就更容易入门其他领域的 APM 工具。</p><p>而且与此同时，国内还涌现一批<strong>专业开源公司</strong>，这些公司会提供哪些开源技术的能力或解决方案，都是根据公司人员能力而定。也就是说，你对开源的某些项目有独到理解，那你进入这些公司后，公司在这个领域就会更上一层楼；同时你也会得到更多挑战机会，去丰富自己的实战能力。</p><p>如果你认为专业开源的公司不够成熟，那我们再看下如何进入<strong>一线大厂</strong>。在我看来，大厂面试，就是在筛选简历后，通过面试证明，你的简历是真实可信的过程。</p><blockquote><p>比如你简历写&quot;有丰富的线上应用调优经验&quot;，那么面试官就会问相关问题。被问两道题时，你都有经验并都答上来了，那就证明你具备对应用性能调优的能力；而如果你只答上了一道题或都没答上来，那么面试评价里的&quot;调优能力&quot;就得不到证明。</p></blockquote><p>而参与开源技术的建设，并得到社区的认可，你的能力与见解就会被记录在每一次的 issue 和 pull request 中。而这些你学习、实践的过程都是很容易被搜索出来，也就是便于向面试官证明你的能力的。</p><p>所以说，&quot;融入开源社区&quot;已是当代开发人员必不可少的技能了。</p><h3 id="小结与思考" tabindex="-1">小结与思考 <a class="header-anchor" href="#小结与思考" aria-label="Permalink to &quot;小结与思考&quot;">​</a></h3><p>今天的课程，我分享了备战下一代性能监控系统的见解。首先，我们要能具备打通数据孤岛，贯穿监控数据的能力。在学习模型数据规范的同时，要做到活学活用，学以致用。</p><p>对于 APM 的海量数据存储以及二次开发，我建议你认真掌握一项数据库存储技术。就当下可预见的未来而言，我建议你学习 Elasticsearch。</p><blockquote><p>Elasticsearch 在搜索领域，无任何其他数据引擎可以企及。再次 Elasticsearch 部署架构有这丰富多样的灵活配置，可以满足多种的海量数据场景需求；而且针对二次开发，RESTFul 的易用接口，可以让你快速根据存储模型完成需求迭代。</p></blockquote><p>最后，我带你分享了开源社区生态，&quot;造轮子&quot;的时代已经一去不复返了。对于应用性能管理系统，能拥有最大的市场和最优生命力的，肯定是开源的 APM 产品了。</p><p>所以日常工作之余，学习融入开源社区应该是我们深耕技术的首选方向。那么你对开源社区做过哪些建设呢？欢迎在评论区写下你的思考与经验，期待与你的讨论。</p>',44),l=[r];function s(i,c,n,u,h,_){return t(),e("div",null,l)}const g=a(o,[["render",s]]);export{q as __pageData,g as default};
