import{_ as i,j as a,o as l,g as r,k as n,Q as o,s as e,h as t}from"./chunks/framework.e0c66c3f.js";const M=JSON.parse('{"title":"前期开发测试与持续集成的融合 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(1598) 第13讲：测试如何融入 CICD 环境中？.md","filePath":"posts/devops/112-高效敏捷测试文档/(1598) 第13讲：测试如何融入 CICD 环境中？.md","lastUpdated":1696338709000}'),C={name:"posts/devops/112-高效敏捷测试文档/(1598) 第13讲：测试如何融入 CICD 环境中？.md"},_=o('<p>CI/CD 的工程实践发生在研发阶段，从左到右的快速流动必然离不开从右到左的快速反馈，测试是提供快速反馈的基础，在 CI/CD 的每一个环节都应该伴随着测试活动。测试与 CI/CD 的融合可以从四个方面来考虑：前期开发测试与持续集成的融合，持续测试（狭义的）与 CI/CD 的融合，验收测试与 CI/CD 的融合，产品的部署实践与 CI/CD 的融合。</p><h3 id="前期开发测试与持续集成的融合" tabindex="-1"><strong>前期开发测试与持续集成的融合</strong> <a class="header-anchor" href="#前期开发测试与持续集成的融合" aria-label="Permalink to &quot;**前期开发测试与持续集成的融合**&quot;">​</a></h3><p>我们经常说质量是内建的，也经常说要将质量向源头推进，什么意思呢？负责系统设计的人应该对自己设计的系统架构质量负责，负责开发代码的人应该对自己开发的代码质量负责。那么系统设计的质量源头就是设计系统的人，代码的质量源头就是写代码的人，每个人都应该在自己负责的领域内发现问题并且解决问题，同时还能从错误中不断学习，避免以后犯同样的错误，这样才能真正做到质量内建和在源头上把关。</p><br><p>道理很容易理解，对吧？不过，这里面有三点需要注意。</p><br><p>（1）要为自己的质量负责是可以的，但是不能不允许犯错，人都会犯错，错了没关系，改了就行。所以，开发人员的代码中有缺陷是难免的。</p><br><p>（2）既然代码里有缺陷，做为代码质量的源头，开发人员应该负责发现并修复这些缺陷。然而，开发人员的主要精力应该放在开发代码上面，而不是花半天时间编写代码，再花一天时间做手工测试专门找缺陷。因此，开发人员希望有一种自动化的方式来帮助他们找到缺陷，理想情况下，他们只要一提交代码和测试脚本，就能自动收到测试结果。</p><br><p>（3）但是， 测试结果收到的周期如果比较长，开发人员早已转向下一个任务，收到结果后可能也不会立刻停下手头上的工作来处理。如果时间再长一些，像我们在传统开发模式那样，几个月后才从客户那里反馈回来，开发人员为自己的代码质量负责就是一句空话，因为他早就忘了这个错当初是怎么犯的，下次还会犯同样的错误。</p><br><p>正是基于这三点，我们可以体会到测试和持续集成的融合所带来的好处： 在构建过程中引入自动构建和自动化测试，只要开发人员提交代码和单元测试脚本，就能很快收到反馈，然后开发人员立刻修复问题，再次提交更改后的代码，直到通过所有的测试。开发人员在代码开发过程中不断重复上述过程，因为开发人员每次提交代码都只包含小批量的变更，发现问题和解决问题的效率更高。</p><h3 id="持续测试与-ci-cd-的融合" tabindex="-1"><strong>持续测试与 CI/CD 的融合</strong> <a class="header-anchor" href="#持续测试与-ci-cd-的融合" aria-label="Permalink to &quot;**持续测试与 CI/CD 的融合**&quot;">​</a></h3><p>如果只有前期开发测试在持续集成阶段的融合，是很不充分的。我们需要把持续测试融合到 CI/CD 环境中，对软件中不断增加的新功能特性进行持续的测试及其回归测试。持续测试包括自动化测试，也包括手工测试，其中自动化测试的部分可以划分成不同类别的测试集，比如集成测试、系统测试、UI 测试、性能测试、回归测试，然后在集成了相应的测试工具与框架的 CI 环境中，根据需要定期执行，测试运行时间短的一天执行几次，运行时间长的一天执行一次或者两三天执行一次。</p><h3 id="验收测试与-ci-cd-的融合" tabindex="-1"><strong>验收测试与 CI/CD 的融合</strong> <a class="header-anchor" href="#验收测试与-ci-cd-的融合" aria-label="Permalink to &quot;**验收测试与 CI/CD 的融合**&quot;">​</a></h3><p>持续反馈原则里有一个重要的实践------<strong>为下游工作进行优化</strong>。CI/CD 的下游工作是持续部署，研发的下游是运维，我们怎么通过测试和 CI/CD 的融合为持续部署、运维进行优化呢？在测试环境里通过了所有的测试，验收测试（主要指全面的回归测试）应放在和生产环境尽可能一致的准生产环境中进行，这样会避免因为环境不一致在生产部署时才发现重大缺陷。</p><h3 id="产品的部署实践与-ci-cd-的融合" tabindex="-1"><strong>产品的部署实践与 CI/CD 的融合</strong> <a class="header-anchor" href="#产品的部署实践与-ci-cd-的融合" aria-label="Permalink to &quot;**产品的部署实践与 CI/CD 的融合**&quot;">​</a></h3><p>这一条貌似和测试没有关系，其实不然。在研发阶段的测试不仅考虑对产品本身的验证，还要验证支持生产环境部署在内的所有环境的一致性、可重复的部署过程，这也是为下游工作进行优化的优秀实践。</p><br><p>举个例子，如果我们最后提供给客户的是 OVA（Open Virtualization Appliance，开放虚拟化设备）虚拟机包，那么在持续集成和持续交付环境里，测试环境也应该用 OVA 版本进行部署，而不是用在已经装好的虚拟机上直接升级微服务。OVA 版本部署有时会出现一些特有的问题，比如第一次启动时配置的系统信息不能保存，或者配置软件许可信息后不生效。Pipeline 部署遇到的问题就少得多。</p><h3 id="测试融入-ci-cd-的整体框架" tabindex="-1"><strong>测试融入 CI/CD 的整体框架</strong> <a class="header-anchor" href="#测试融入-ci-cd-的整体框架" aria-label="Permalink to &quot;**测试融入 CI/CD 的整体框架**&quot;">​</a></h3><p>为了支持测试与 CI/CD 的融合，从基础设施和环境的角度可以考虑以下 3 个方面：自动化测试框架和工具与 CI/CD 的集成，自动化测试平台与 CI/CD 的集成，支持自动化部署流水线的 CI/CD 调度管理工具。</p><br><p>上一讲我们已经说了关于自动化测试框架和工具的集成。不过，测试和 CI/CD 环境的融合不仅仅是自动化测试框架和工具的集成，对于复杂的软件系统，则需要搭建一套完整的测试基础设施------不但要支持自动化测试的执行，而且还要支持其他的测试活动，比如测试开发、测试资源管理、数据服务、测试报告生成等。</p><br><p>测试与 CI/CD 环境融合的核心在于软件测试基础设施与 CI/CD 环境的融合，如图 1 所示。而软件测试基础设施的核心是自动化测试平台------基于测试自动化框架构建一个为测试活动提供各种服务的集成系统。</p><br>',28),p=o("<p>图1 自动化测试平台与 CI/CD 环境的融合</p><br><p>CI/CD 环境中的代码版本管理系统（比如 GitHub）用来统一管理产品代码、测试平台/工具代码、自动化测试脚本、CI/CD 流水线脚本等。</p><br><p>CI/CD 调度管理工具，比如 Jenkins 2.x，可以实现持续交付流水线从版本控制到研发环境、生产环境部署的自动化过程。现在我们就以 Jenkins Pipeline 为例，来描述一个自动化测试平台与 CI/CD 框架进行融合发起测试的过程。</p><br><p>（1）在 Jenkins Pipeline 中指定要执行的 CI/CD 流水线脚本（Pipeline Script）存储位置。</p><p>（2）Jenkins 流水线脚本发起构建请求后，对指定代码仓库的指定分支上的代码进行编译、测试、打包。</p><p>（3）CI/CD 流水线脚本发起请求下载指定的测试脚本集到一个 Jenkins Node，通常也是测试执行环境。如果测试执行环境比较复杂，则需要搭建测试执行的集群环境，比如 Selenium Grid，这时自动化测试平台的资源调度与管理服务就会发起对执行环境的准备。</p><p>（4）CI/CD 流水线脚本发起部署请求，自动化测试平台的资源调度与管理服务找到可用的被测系统资源，下载指定的软件包进行部署。</p><p>（5）CI/CD 流水线脚本发起部署后的验证请求，验证软件是否正常启动。</p><p>（6）验证成功后，CI/CD 流水线脚本发起测试执行请求。</p><p>（7）等测试执行完毕，自动化测试平台分析测试结果，生成测试报告，报告可以提交给统一的平台（如 SonarQube）来整体呈现。</p><p>（8）在 CI/CD 流水线脚本里指定测试报告的邮件接收人名单，测试结束后以邮件形式发送报告。</p><br>",15),c=e("p",null,"图2 CI/CD 流水线脚本示例",-1),d=e("h3",{id:"代码管理集成和-code-review",tabindex:"-1"},[e("strong",null,"代码管理集成和 Code Review"),t(),e("a",{class:"header-anchor",href:"#代码管理集成和-code-review","aria-label":'Permalink to "**代码管理集成和 Code Review**"'},"​")],-1),u=e("p",null,"图3 GitHub 与 Jenkins 的集成",-1),h=e("br",null,null,-1),I=e("p",null,"通过上面的描述，我们已经知道，代码版本管理系统和 CI/CD 调度管理工具集成后可以实现代码的管理和自动构建过程中代码的拉取。另外，这样的集成还能提供良好的代码评审机制，从流程上保证代码只有经过审查后才能合并到目标分支上。",-1),D=e("br",null,null,-1),b=e("p",null,[t("代码人工评审的方式一般被称为 "),e("strong",null,"Code Review"),t("。Code Review 不仅有助于提前发现缺陷、提高代码的规范性，还能促进研发团队的知识共享。")],-1),g=e("br",null,null,-1),m=e("p",null,[t("LinkedIn 是全球知名的职业社交网站，在这方面贡献了非常优秀的实践经验，该公司的工程技术团队曾经开源了 Kafka 等一系列流行技术。从 2011 年开始这家公司将"),e("strong",null,"代码评审"),t("作为必须的开发流程之一，每个团队都使用同样的代码评审工具和流程，每个工程师都可以评审其他人的代码，也可以为其他团队贡献自己的代码，到 2017 年他们累计完成了 100 万次代码评审。这种做法在保证质量的同时，也促进了各个技术部门之间的协作和交流。")],-1),P=e("br",null,null,-1),A=e("p",null,"图4 图片来源：How to Do Code Reviews Like a Human",-1),k=e("br",null,null,-1),q=e("p",null,"在线代码管理系统 GitHub 提供的 Pull Request 特性，结合分支策略可以在 CI 环境中用来进行代码评审。Pull Request 是 GitHub 提供的一种通知机制。",-1),T=e("br",null,null,-1),V=e("p",null,"举个例子，Tom 被设置为主干分支的管理员，程序员 Lisa 没有权限直接把代码合并到主干分支（Master）上。Lisa 在新建分支上编写或修改完一段代码后发起 Pull Request 请求，Tom 收到请求后会跳转到 Lisa 指定的分支评审代码，如果他认为 Lisa 的代码里有错误，或者不规范，他会写下自己的修改意见并返回给 Lisa。Lisa 修改完代码再次发起 Pull Request 请求，直到 Tom 确认合并请求，代码合并确认后才会触发持续集成。具体实现可以参考在 Jenkins 里安装并配置 GitHub Pull Request Builder 等插件的相关资料。",-1),f=e("br",null,null,-1),v=e("p",null,"当然只从流程上来保证代码评审是不够的，团队是不是认真的对待代码评审取决于团队的质量文化，这就需要团队乐意、主动地在质量的源头避免缺陷的产生。",-1),x=e("br",null,null,-1),R=e("p",null,"最后，给你出一道思考题：你们团队测试相关的代码（测试框架和工具的代码、测试脚本等）是如何管理的？测试基础设施和代码的管理怎么才能更好地融入 CI/CD 环境中？欢迎留言讨论。",-1);function S(J,O,w,L,N,G){const s=a("Image");return l(),r("div",null,[_,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/75/12/Cgq2xl5uVseAGY4HAAPNqrL7GbY361.png"}),p,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/75/11/CgpOIF5uVseAJi9_AACEmPjdKX4271.png"}),c,d,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/75/12/Cgq2xl5uVsiAKWT7AAOO-sUw6XI236.png"}),u,h,I,D,b,g,m,P,n(s,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/75/11/CgpOIF5uVsiAT6XdAAJKd_F5hOQ059.png"}),A,k,q,T,V,f,v,x,R])}const B=i(C,[["render",S]]);export{M as __pageData,B as default};
