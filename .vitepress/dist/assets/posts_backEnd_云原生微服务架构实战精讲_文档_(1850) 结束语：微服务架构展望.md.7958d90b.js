import{_ as e,o as r,g as t,Q as a}from"./chunks/framework.e0c66c3f.js";const b=JSON.parse('{"title":"云原生技术是微服务落地的最佳搭配 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/云原生微服务架构实战精讲_文档/(1850) 结束语：微服务架构展望.md","filePath":"posts/backEnd/云原生微服务架构实战精讲_文档/(1850) 结束语：微服务架构展望.md","lastUpdated":1696338709000}'),o={name:"posts/backEnd/云原生微服务架构实战精讲_文档/(1850) 结束语：微服务架构展望.md"},n=a('<p>你好，本专栏的内容到这里已经全部更新完毕了。在这个专栏中，我对云原生微服务相关的很多内容都进行了介绍，比如涉及开发、测试、部署和运维等多个方面，每个方面又有非常多关联的概念和技术，要全部了解这些相关知识并不是一件容易的事情，因为除了已有的概念和技术之外，技术本身也在不断推陈出新。本课时将对云原生微服务架构相关的技术进行展望。</p><h4 id="云原生技术是微服务落地的最佳搭配" tabindex="-1">云原生技术是微服务落地的最佳搭配 <a class="header-anchor" href="#云原生技术是微服务落地的最佳搭配" aria-label="Permalink to &quot;云原生技术是微服务落地的最佳搭配&quot;">​</a></h4><p>云原生微服务架构是云原生技术和微服务架构的结合。微服务作为一个架构风格，所解决的问题是复杂软件系统的架构与设计；云原生技术是一种实现方式，所解决的问题是软件系统的运行和维护。微服务架构可以选择不同的实现方式，如 Spring Cloud 或私有实现，并不一定非要使用云原生技术；同样的，云原生技术可以用来实现不同架构的应用，包括微服务应用或是单体应用。</p><p>不过，云原生技术和微服务架构确实是非常适合的组合。这其中的原因在于，云原生技术可以有效地弥补微服务架构所带来的实现上的复杂度；微服务架构难以落地的一个重要原因是它过于复杂，对开发团队的组织管理、技术水平和运维能力都提出了极高的要求。因此，一直以来只有少数技术实力雄厚的大企业会采用微服务架构。随着云原生技术的流行，在弥补了微服务架构的这一个短板之后，极大地降低了微服务架构实现的复杂度，使得广大的中小企业有能力在实践中应用微服务架构。云原生技术促进了微服务架构的推广，也是微服务架构落地的最佳搭配。</p><h4 id="云原生技术的发展趋势一" tabindex="-1">云原生技术的发展趋势一 <a class="header-anchor" href="#云原生技术的发展趋势一" aria-label="Permalink to &quot;云原生技术的发展趋势一&quot;">​</a></h4><p>云原生技术的第一个发展趋势是<strong>标准化和规范化</strong>，该技术的基础是容器化和容器编排技术，最经常会用到的技术是 Kubernetes 和 Docker 等。随着云原生技术的发展，在 CNCF 和 Linux 基金会等组织的促进下，云原生技术的标准化和规范化工作正在不断推进，其目的是促进技术的发展和避免供应商锁定的问题，这对于整个云原生技术的生态系统是至关重要的。</p><p>目前已经有的标准和规范包括开放容器倡议（Open Container Initiative）提出的镜像规范和运行时规范，以及 CNCF 中的一些项目，如下表所示：</p><table><thead><tr><th>项目名称</th><th>说明</th></tr></thead><tbody><tr><td><a href="http://openmetrics.io/" target="_blank" rel="noreferrer">OpenMetrics</a></td><td>性能指标数据的输出格式</td></tr><tr><td><a href="https://github.com/open-telemetry" target="_blank" rel="noreferrer">OpenTelemetry</a></td><td>遥测数据收集规范，由 OpenTracing 和 OpenCensus 项目合并而来</td></tr><tr><td><a href="https://smi-spec.io/" target="_blank" rel="noreferrer">Service Mesh Interface</a></td><td>服务网格规范</td></tr><tr><td><a href="https://serverlessworkflow.github.io/" target="_blank" rel="noreferrer">Serverless Workflow</a></td><td>Serverless 应用的声明式工作流规范</td></tr></tbody></table><h4 id="云原生技术的发展趋势二" tabindex="-1">云原生技术的发展趋势二 <a class="header-anchor" href="#云原生技术的发展趋势二" aria-label="Permalink to &quot;云原生技术的发展趋势二&quot;">​</a></h4><p>云原生技术的第二个发展趋势是<strong>平台化</strong>，以服务网格技术为代表，这一趋势的出发点是增强云平台的能力，从而降低运维的复杂度。流量控制、身份认证和访问控制、性能指标数据收集、分布式服务追踪和集中式日志管理等功能，都可以由底层平台来提供，这就极大地降低了中小企业在运行和维护云原生应用时的复杂度。从另外一个方面来说，这也促进了相关开源软件和商业解决方案的发展。我们看到了 Istio 和 Linkerd 这样的开源服务网格实现的流行，也有越来越多的公司提供商用的支持，这给不同技术水平的企业提供了最适合的选择。</p><h4 id="云原生技术的发展趋势三" tabindex="-1">云原生技术的发展趋势三 <a class="header-anchor" href="#云原生技术的发展趋势三" aria-label="Permalink to &quot;云原生技术的发展趋势三&quot;">​</a></h4><p>云原生技术的第三个发展趋势是应用管理技术的进步，以操作员（Operator）模式为代表。在 Kubernetes 平台上部署和更新应用一直以来都比较复杂，传统的基于资源声明 YAML 文件的做法，已经逐步被 Helm 所替代。操作员模式在 Helm 的基础上更进一步，以更高效、自动化和可扩展的方式对应用部署进行管理。CNCF 中的孵化项目 <a href="https://operatorframework.io/" target="_blank" rel="noreferrer">Operator Framework</a> 是创建 Operator 的框架，<a href="https://operatorhub.io/" target="_blank" rel="noreferrer">OperatorHub</a> 则是社区共享 Operator 实现的平台。</p><h4 id="云原生技术的发展趋势四" tabindex="-1">云原生技术的发展趋势四 <a class="header-anchor" href="#云原生技术的发展趋势四" aria-label="Permalink to &quot;云原生技术的发展趋势四&quot;">​</a></h4><p>最后一个发展趋势与云原生应用开发相关。我们看到了越来越多的微服务开发框架的出现，不同的编程语言都有相应的开源实现，以 Java 平台为例，Quarkus、Micronaut、Helidon 和 Eclipse MicroProfile 都是流行的选择。这些框架对微服务开发做了很多优化，尽可能地降低应用第三方依赖的数量。GraalVM 的原生镜像功能，可以创建出尺寸小、启动速度快、耗费资源更少的 Java 微服务容器镜像。可以预期的是，所有的 Java 微服务框架都会提供 GraalVM 的支持。</p><h4 id="结语" tabindex="-1">结语 <a class="header-anchor" href="#结语" aria-label="Permalink to &quot;结语&quot;">​</a></h4><p>以上就是关于云原生技术的一些发展趋势展望，希望可以对正在学习云原生技术的你有所帮助。在学习云原生技术时，最重要的是找准学习重点并加以实践，根据每个开发人员在团队中的职责，所要学习和侧重的点也不同，可能是开发、测试或是运维相关的内容。</p><ul><li><p>从开发来说，需要掌握微服务开发框架的使用，以及单元测试的编写，并考虑与容器化技术的集成；</p></li><li><p>从测试来说，需要掌握云原生微服务中集成测试的执行与自动化，尤其是 API 契约测试；</p></li><li><p>从运维来说，需要掌握云原生应用的部署、更新和维护，包括相关开源工具的使用、第三方服务的集成，以及运行时的故障恢复等。</p></li></ul><p>云原生微服务应用的开发和运维是一个系统工程，不同的开发人员都可以在团队中找到适合的位置。通过不断地实战开发和经验积累，来逐步提升自己对技术的认识，增强技术实力。</p><p>如果你觉得课程不错，从中有所收获的话，不要忘了推荐给身边的朋友哦。前路漫漫，一起加油~</p><p>最后呢，成老师邀请你为本专栏课程进行结课评价，因为你的每一个观点都是我们最关注的点。<a href="https://wj.qq.com/s2/6902680/3fb2/" target="_blank" rel="noreferrer">点击链接，即可参与课程评价</a>。</p>',20),l=[n];function s(p,i,h,d,_,c){return r(),t("div",null,l)}const u=e(o,[["render",s]]);export{b as __pageData,u as default};
