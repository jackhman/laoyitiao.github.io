import{_ as e,o,g as a,Q as l}from"./chunks/framework.4e7d56ce.js";const h=JSON.parse('{"title":"团队组成 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/110-测试开发核心技术文档/(362) 加餐 8：Google 质量管理体系名师解析.md","filePath":"posts/devops/110-测试开发核心技术文档/(362) 加餐 8：Google 质量管理体系名师解析.md","lastUpdated":1696338709000}'),t={name:"posts/devops/110-测试开发核心技术文档/(362) 加餐 8：Google 质量管理体系名师解析.md"},p=l('<h3 id="团队组成" tabindex="-1">团队组成 <a class="header-anchor" href="#团队组成" aria-label="Permalink to &quot;团队组成&quot;">​</a></h3><p>今天我们开始进入 Google 质量管理体系的学习，我们先来看下 Google 质量保证团队的组成，Google 的测试团队主要有四个角色。</p><p>第一个仍然是外包团队，主要负责一些基础功能的测试工作，Google 在中国、印度等全球各地的分公司都组建了测试外包团队来完成测试执行工作。</p><p>然后是正式的测试团队，Google 称之为 TE（Test Engineer），TE 主要负责公司内部核心的测试工作。</p><p>第三个是测试开发团队 SET（Software Engineer in Test），SET 需要具有一定的开发和测试能力，他的主要工作方向是测试工具/框架/平台，以及研发效能的提升</p><p>最后是研发工程师 SWE，这个群体以注重测试和质量为一大特色，所以在测试贡献上也很显著。</p><h3 id="岗位职责" tabindex="-1">岗位职责 <a class="header-anchor" href="#岗位职责" aria-label="Permalink to &quot;岗位职责&quot;">​</a></h3><p>我们接下来看下每个岗位的具体职责，当然这里主要是和测试相关的岗位职责，首先是 TE，TE 接近于传统的测试工程师职级，它首先是一个产品专家，可以以用户角度为出发点去考察一个产品的各方面的质量维度，同时也是一个测试专家，需要从测试策略到测试计划去指导整个团队进行测试建设，也包括手工测试/脚本测试/自动化测试等都是由 TE 具体负责的。</p><p>还有一个职位是软件测试开发工程师 SET，他的工作方向最早时是测试方向，主要是辅导团队去设计测试工具、框架、平台以提高测试的效率和生产力，这时他与 SDET 是类似的，但随着 Google 的发展，技术也越来越成熟，他们不再局限于测试领域，开始对外提供技术支持，比如为开发提供 IDE 增强工具、调试工具、提升效率工具、质量分析工具等。随着职责的扩大，即需要服务于测试又需要服务于研发，所以到了 2016 年时 SET 正式更名为 SETI，也就是 Software Engineer Tools and Infrastructure。</p><h3 id="技术分享" tabindex="-1">技术分享 <a class="header-anchor" href="#技术分享" aria-label="Permalink to &quot;技术分享&quot;">​</a></h3><p>其实 Google 对外提供了非常多的开源技术，里面也包括很多和测试相关的框架，比如：</p><ul><li><p>WebDriver</p></li><li><p>Espresso</p></li><li><p>Googletest</p></li><li><p>EarlGrey</p></li><li><p>Martian</p></li><li><p>Karma</p></li><li><p>Protractor</p></li></ul><p>但 Google 在经验沉淀方面，输出不是特别积极，公开的资料并不多，其中大多数沉淀在了自己的技术博客 GoogleTesting 上，你可以课后搜索下，会发现它在 2007 年到 2020 年近 14 年的时间发表的文章并不多，但是沉淀了很多经典的文章，国内测试圈也以 Google 的博客作为很好的学习资料。</p><p>在 2012 年 4 月，知名测试专家惠特克将 Google 的测试精华整理成书，也就是大家耳熟能详的《Google 测试之道》，同时，惠特克还写了非常多的经典测试图书，比如《探索式测试》等。</p><p>这里需要重点提下《Google 测试之道》，这本书在国内的知名度也非常的高，同时译者也是国内淘宝的测试专家，自 2013 年 10 月引入国内后广受好评，国内很多公司的测试体系建设都参考了 Google 的测试体系，可以说这本书引领了全球软件测试的发展。</p><p>关于 Google 测试工程师的薪酬待遇情况，因为国情不同，这里就不再详细展开了，同时 Google 开源的技术非常多，我建议你课后可以自己多研究学习，好了，关于 Google 的质量管理体系就介绍到这里了，下节课见。</p>',16),r=[p];function i(s,_,n,d,g,c){return o(),a("div",null,r)}const T=e(t,[["render",i]]);export{h as __pageData,T as default};
