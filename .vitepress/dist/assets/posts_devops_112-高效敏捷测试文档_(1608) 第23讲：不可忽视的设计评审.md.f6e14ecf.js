import{_ as o,j as e,o as a,h as n,k as p,f as s,Q as r}from"./chunks/framework.d3daa342.js";const m=JSON.parse('{"title":"第23讲：不可忽视的设计评审","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(1608) 第23讲：不可忽视的设计评审.md","filePath":"posts/devops/112-高效敏捷测试文档/(1608) 第23讲：不可忽视的设计评审.md","lastUpdated":1696682708000}'),i={name:"posts/devops/112-高效敏捷测试文档/(1608) 第23讲：不可忽视的设计评审.md"},l=r('<h1 id="第23讲-不可忽视的设计评审" tabindex="-1">第23讲：不可忽视的设计评审 <a class="header-anchor" href="#第23讲-不可忽视的设计评审" aria-label="Permalink to &quot;第23讲：不可忽视的设计评审&quot;">​</a></h1><p><strong>设计评审的价值和重要性</strong></p><br><p>与需求评审不同，传统开发模式下测试人员很少参加设计评审，总觉得和测试的关系不大，其实，这样的认知是错误的。</p><br><p>记得在一次会议演讲之后，一位与会的测试同学提问：如何进行可靠性测试？</p><br><p>如果是你的话，可能会将可靠性计算公式告诉他，然后告诉他用压力测试、故障注入的方式来进行可靠性测试，你甚至可能想到今天比较时髦的混沌工程，但这并不是最有效的方法。</p><br><p>更好的做法是这样：我会告诉他，首先要加强设计评审，在评审时，问系统架构师或系统设计人员，他们是如何来保证系统可靠性的？关键组件有冗余设计吗？故障转移机制有没有？如果有故障转移机制，又是如何设计的？可以在线上进行演练吗？系统一旦失效，估计花多少时间恢复？用户数据是实时备份的吗？用户数据是否有被攻击的漏洞？线上数据库遭受破坏，数据能恢复吗？数据恢复需要多长时间？了解了这些可靠性相关的信息后，验证这些具体措施就相对容易得多。</p><br><p>也就是说，我们需要先通过设计评审，当检查系统设计时是否充分考虑了可靠性的需求，在设计中是否存在考虑不周的问题，并且通过设计评审，清楚如何去验证系统的可靠性；否则，使用压力测试的方法进行高负载测试，无论是从时间上还是从要付出的其它代价上来看，往往很难让人接受。即使有故障注入的测试方法，也需要先了解可能有哪些故障触发点或故障模式，才能把有效的故障数据注入进去。</p><br><p>更糟糕的是，如果没有设计评审，或在设计评审时，没有从测试的角度去提问，可靠性、性能、安全性等问题就很难在系统设计时被发现。等到后期系统测试时再发现，往往为时已晚，团队将付出很大的代价，需要修改设计和代码，再重新测试。</p><br><p>这就体现了设计评审的价值和重要性，通过设计评审，可以给我们带来下列 3 点收益：</p><ul><li><p>更好的确保软件设计的可测试性，包括系统的功能、性能、安全性、可靠性等可测试性。</p></li><li><p>更重要的是能够提前发现设计上的缺陷，避免直到系统测试时才发现问题，大大降低了系统的质量风险、项目管理风险和软件研发成本。</p></li><li><p>更好地了解系统是如何实现的、由哪些组件、服务构成，更深入地了解系统架构、关键组件、关键接口等，有助于实现分层测试、面向接口的测试，从而提高测试方案、测试设计的有效性和效率。</p></li></ul><br><p>在敏捷开发模式下，我们更强调测试左移和持续测试，这就少不了设计评审。从设计评审的角度看，无论是传统开发还是敏捷开发，都有一些基本的评审标准，比如设计的规范性、开放性、可测试性、可扩展性和一致性等，设计应力求简单、合理、清晰，做到高内聚、低耦合。同时，最终设计必须能满足需求，所有功能特性都有相应的组件去承载，并且它们之间的映射是合理的。</p><br><p>下面就来说说如何高效地完成敏捷开发模式下的设计评审。</p><h3 id="如何完成架构评审" tabindex="-1">如何完成架构评审 <a class="header-anchor" href="#如何完成架构评审" aria-label="Permalink to &quot;如何完成架构评审&quot;">​</a></h3><p>在敏捷开发模式下，文档再省，<strong>系统架构图</strong> 不能省，其次，<strong>接口定义文档</strong> 也不能省。所以在敏捷开发模式下，设计评审重点应放在<strong>架构评审</strong> 和<strong>接口定义文档的评审</strong>上。</p><br><p>首先，我们摊开系统架构设计图，如图 1 所示，针对这个架构图先整体评审，再对每层进行 Review，从UI（User Interface）开始，深入到 API 层、安全层（Security Layer）、核心（Core）层、存储（Storage）层、工作流引擎（Workflow Engine）、搜索引擎（Search Engine）、目录和元数据引擎（Catalog &amp; Metadata Engine）、状态与报告（Status &amp; Reporting）等组件。</p><br>',26),g=r('<p>图1 某软件系统逻辑架构示意图</p><br><p>在系统架构设计评审时，如本讲开始所说的，可以就性能、可靠性、安全性等进行提问，了解系统整体架构设计是否合理、是否有缓存机制、是否有冗余设计、是否存在单点失效等问题；在整体上，则需要了解选型是否合理、是否是分布式架构、是否更应该选用微服务架构等问题。如果具体到非功能特性，也有以下这些原则或规律可循。</p><br><p><strong>性能</strong> ：一般在设计上会考虑分层架构、分布式架构、（文件）系统缓存机制、轮询式任务分配、数据服务器和应用服务器分离、数据分片和数据读写分离、CDN 等措施，比如，现在普遍采用的 CDN（Content Delivery Network，内容分发网络）技术，能够将站点内容发布至遍布全国的海量加速节点，使其用户可就近获取所需内容，避免网络拥堵、地域、运营商等因素带来的访问延迟问题，有效提升访问速度、降低响应时间，获得流畅的用户体验。</p><br><p><strong>安全性</strong> ：数据和系统的分离、将系统权限和数据权限分别设置、基于角色的访问控制设计等都可以提高系统的安全性。如图 1 所示，设计中间层可以隔离客户对所存储数据的直接访问，以进一步保护数据库的安全性。</p><br><p><strong>可靠性</strong> <strong>：</strong> 采用多节点分布式体系架构，这样单个节点失效不会造成整个系统失效，从而确保系统的可靠性。而且，负载也能平衡地分布在不同节点上，不会像单体系统受到集中式负载压力冲击而引起类似&quot;拒绝服务（DoS）&quot;的问题，以保证服务的可用性。</p><br><p><strong>可扩展性</strong> <strong>：</strong> 区分可变和不可变业务，采用多层分布体系架构，基于不同的组件或层次为不同的业务提供开放的服务接口（API、SDK），并尽可能简化架构，降低模块间的耦合性等。</p><h3 id="有层次的-组件-评审" tabindex="-1"><strong>有层次的（组件）评审</strong> <a class="header-anchor" href="#有层次的-组件-评审" aria-label="Permalink to &quot;**有层次的（组件）评审**&quot;">​</a></h3><p>在整体评审通过后，我们会继续就系统的各个层次或各个组件进行更为细致的评审，逐层往前推进。</p><br><p><strong>UI</strong> <strong>层</strong> 是否采用了类似 GWT（Google Web 工具包）的 Web 2.0 用户界面框架，从而能够支持 Firefox、IE、Safari、Google Chrome 等浏览器的最新版本，以及是否适用基于 JQuery Mobile 的移动设备、WebDAV 和 CIFS 协议等。</p><br><p><strong>API</strong> <strong>层</strong> ，检查是否支持 OASIS 开放标准的 CMIS（Content Management Interoperability Services）协议，即是否允许使用 Web 协议互连，并控制各种文档管理系统和存储库；检查是否支持 OpenAPI 标准，能否通过 Web 服务（SOAP）和 REST 提供完整的、开放的 API，从而实现与第三方应用程序的集成；检查是否提供了用于 Java、.NET 和 PHP 等二次开发的 SDK。</p><br><p><strong>安全层</strong> ，涉及用户身份的验证、注册用户和用户访问权限的管理、安全控制等。如图 1 所示，该架构采用了 Spring Security 实现基于用户的凭据集中管理用户的访问权限、通过 Access Manager 模块实现安全控制、通过 CAS（Authentication Centralized Service）服务实现身份验证等。</p><br><p><strong>存储模块</strong> 是否足够安全、可靠和开放。图 1 的系统架构使用了 Hibernate 进行 OMR（Object Relation Mapping）数据映射，并能支持不同的关系数据库，而整个元数据层则存储在 DBMS 数据库中。</p><br><p><strong>其他组件</strong> ，比如搜索引擎、目录和元数据等组件设计是否合理，如果选择第三方开源产品，那么它是否是成熟的组件？属于哪一类开源许可协议？有没有法律风险等？</p><h3 id="接口定义的评审" tabindex="-1"><strong>接口定义的评审</strong> <a class="header-anchor" href="#接口定义的评审" aria-label="Permalink to &quot;**接口定义的评审**&quot;">​</a></h3><p>架构评审完之后，就需要深入到各个组件详细设计的评审，而在这之前，需要针对接口详细设计文档进行评审，这也是值得我们特别关注的，因为接口关系到每个开发人员能否相对独立、高效的工作，关系到之后众多组件能否集成为可正常运行的系统。</p><br><p>接口也分为多种，比如资源接口、操作接口和页面接口。前面两种接口相对简单，要求按照 RESTful 方式定义即可，而对页面可能会涉及太多接口，不能一个个地调用， 这样会导致系统性能比较差，严重影响用户体验。所以我们需要在后台把数据处理好，然后形成一个聚合型接口提供给前端来使用。</p><br><p>从接口定义看，要求遵循 RESTful 风格、采用 UTF-8 统一接口编码方式，接口应具备可扩展性，接口拆分合理、粒度合适，接口描述清晰、一致，标注请求方式并能区分 GET、POST 等不同方式的应用场景，比如获取数据用 GET，新增 / 修改 / 发送数据用 POST；接口地址（URL）使用相对路径，从而尽量减少参数传递；参数命名准确并符合统一的命名规则，同时标注参数数据类型、值域范围、是否可为空等；接口必须提供明确的数据状态信息、统一的标识调用状态（无论成功还是失败）。</p><br><p>从接口性能看，数据格式采用 JSON 格式比 XML 好，这是因为它的数据量少，而且尽量按需传递数据，前端需要什么数据就返回什么数据。为了更好的性能，还要设置缓存机制，包括文件缓存、Memcache 缓存等。</p><br><p>从安全性看，包括验证签名机制、接口访问授权机制、数据传输加密、客户端身份验证和时间戳验证等，包括选用合适且安全的算法。对于核心数据的 ID 字段, 不要使用自增的数字类型, 而使用 Hash 算法产生随机的字符串类型，避免核心数据被轻易抓取等。</p><h3 id="设计的可测试性" tabindex="-1"><strong>设计的可测试性</strong> <a class="header-anchor" href="#设计的可测试性" aria-label="Permalink to &quot;**设计的可测试性**&quot;">​</a></h3><p>可测试性不仅要从需求开始抓，设计环节也同样重要，人们经常提到&quot;可测试性设计（Design for Testability，DFT）&quot;、&quot;设计驱动开发（Design-Driven Development，DDD）&quot;。通过设计可以确保系统结构的简单性、可观察性和可控制性，如 MVC 设计模式、接口单一性、各个模块有明确的接口定义等。在设计上改善软件的可测试性，主要是通过设立观察点、控制点、驱动装置、隔离装置等来实现。</p><br><ol><li>测试驱动设计方法，比如先确定验收测试用例，再设计具体的功能；先确定性能、可靠性等测试用例，再考虑如何实施架构设计，以满足不同特性的要求。</li></ol><br><ol><li>选用开放、先进而成熟的设计模式和框架，在一定程度上能保证系统结构的低耦合性、单一的依赖关系，具有较高的可测试性。</li></ol><br><ol><li>可控制性设计，包括业务流程、模块、场景、全局变量、接口等的可控制性设计，即在外部提供适当的方法、途径，直接或间接地来控制相应的模块、全局变量和接口等。这些途径可能包括设立 XML 配置文件、暴露 API 接口、统一接口等操作。</li></ol><br><ol><li>数据显示与控制分离，通过分层，增加了系统的可观察性和可控制性。这样，就可以通过接口调用，分别完成相应的业务逻辑、数据处理等的测试。</li></ol><br><ol><li>遵守设计原则（如接口隔离原则），并针对模块，尽量分解到相对稳定、规模合适的程度，以确保模块的独立性和稳定性，有利于独立开展对模块的测试活动。</li></ol><br><ol><li>设计易理解性，包括明确的设计标准、规范的设计文档、明确的接口及其参数的定义，使设计有据可依，层次清晰，设计文档易读。</li></ol><br><p>关于设计评审就介绍到这里，总结一下这一讲的内容，概括为下列 4 个要点：</p><ul><li><p>非功能性的质量在很大程度上取决于系统的设计质量，在设计评审时，我们要善于质疑和提问，不仅能获得更好的可测试性，而且也能及时发现设计上的缺陷。</p></li><li><p>设计评审先从整体架构设计评审开始，把握全局质量，包括系统的性能、安全性、可靠性等，再分层评审，逐步深入到各个组件的评审。</p></li><li><p>今天面向接口的设计和编程占比越来越大，微服务架构也逐渐流行，要加强对接口设计文档的评审，接口设计评审要关注的细节还比较多，需要认真对待。</p></li><li><p>设计上还有一些更好的理念，如 DFT、DDD 等，值得提倡和实践。</p></li></ul><br><p>最后给你出一个思考题：在架构设计评审中，性能、可靠性、安全性等之间也存在着一定的冲突，比如提高安全性可能会降低性能。关于这方面的冲突，你有具体的例子吗？如何解决？</p>',52);function _(b,c,d,h,S,u){const t=e("Image");return a(),n("div",null,[l,p(t,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/86/09/Cgq2xl6O-TaAdw5OAAIastO_DRs488.png"}),s(),g])}const D=o(i,[["render",_]]);export{m as __pageData,D as default};
