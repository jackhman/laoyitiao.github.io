import{_ as l,j as o,o as e,g as t,k as p,h as n,s,Q as c}from"./chunks/framework.4e7d56ce.js";const k=JSON.parse('{"title":"第45讲：消费者驱动的服务契约测试","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/云原生微服务架构实战精讲_文档/(1849) 第45讲：消费者驱动的服务契约测试.md","filePath":"posts/backEnd/云原生微服务架构实战精讲_文档/(1849) 第45讲：消费者驱动的服务契约测试.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/云原生微服务架构实战精讲_文档/(1849) 第45讲：消费者驱动的服务契约测试.md"},E=s("h1",{id:"第45讲-消费者驱动的服务契约测试",tabindex:"-1"},[n("第45讲：消费者驱动的服务契约测试 "),s("a",{class:"header-anchor",href:"#第45讲-消费者驱动的服务契约测试","aria-label":'Permalink to "第45讲：消费者驱动的服务契约测试"'},"​")],-1),y=s("p",null,"本课时作为云原生微服务专栏的最后一个课时，将介绍如何进行消费者驱动的服务契约测试。",-1),i=s("h3",{id:"api-测试",tabindex:"-1"},[n("API 测试 "),s("a",{class:"header-anchor",href:"#api-测试","aria-label":'Permalink to "API 测试"'},"​")],-1),u=s("p",null,"在云原生微服务架构应用的开发中，一个很重要的问题是如何对单个微服务的 API 进行测试。第 10 课时介绍了 API 优先的设计策略，也就是从 OpenAPI 规范文档出发，让 API 的消费者和提供者可以并行工作。OpenAPI 规范成为 API 的消费者和提供者之间的契约，OpenAPI 规范文档通过消费者和提供者的协商和沟通来确定，这种方式虽然保证了 API 契约的稳定性，但是存在一个很大的问题，那就是如何验证提供者所实际提供的 API 满足契约的要求。",-1),F=s("p",null,"下图给出了一个微服务架构应用中的不同微服务之间的 API 调用关系，其中服务 A 需要调用服务 B 和 D 的 API。当需要测试服务 A 时，一种做法是在所有服务都部署之后，再进行集成测试。这种做法的问题是测试环境的搭建很复杂，除了每个服务自身之外，还需要运行其他支撑服务。",-1),d=s("p",null,"另外一种做法是为服务 B 和 D 分别创建模拟对象（Mock），由 Mock 来模拟服务 B 和 D 的功能。这种做法的好处是运行测试的环境简单，测试的执行速度也很快，也是一般使用的做法。",-1),C=s("p",null,"模拟对象一般由 API 的消费者来创建，比如，服务 A 需要创建服务 B 和 D 的模拟对象。由于模拟对象由 API 消费者来创建，所以模拟对象反映的是消费者对于 API 的理解，与 API 提供者对 API 的理解可能存在偏差。当服务 A 完成测试，并与服务 B 和 D 进行集成时，可能会发现在运行时出现错误。这种问题的出现，会大大降低服务 A 的测试的可信度。",-1),A=s("h3",{id:"消费者驱动的契约",tabindex:"-1"},[n("消费者驱动的契约 "),s("a",{class:"header-anchor",href:"#消费者驱动的契约","aria-label":'Permalink to "消费者驱动的契约"'},"​")],-1),g=s("p",null,"消费者驱动的契约（Consumer Driven Contract）是一种 API 开发的实践，把行为驱动开发的思想应用到了 API 的设计中，消费者驱动的含义是由 API 的消费者来驱动 API 的设计。如果 API 的目的是满足消费者的需求，那么 API 的消费者对于 API 有决定权，包括 API 中包含的全部路径，以及每个路径的请求和响应的内容格式。API 的提供者需要按照消费者指定的契约，来完成 API 的具体实现。",-1),q=s("p",null,"消费者驱动的契约的不足之处在于，它并不适合于开放 API 的设计，因为开放 API 有非常多的消费者，不太可能为了单个消费者而做出改变。微服务之间的 API 则没有这个限制，可以使用消费者驱动的方式来设计。",-1),v=s("p",null,"本课时通过 Spring Cloud Contract 来说明消费者驱动的契约的做法。Spring Cloud Contract 的特点是从声明式的契约中自动创建出可执行的存根代码，以及测试用例。",-1),h=s("p",null,"在下图中，服务 B 和 D 分别被替换成相应的存根，测试运行起来更简单。",-1),B=c("",45);function D(T,m,b,P,I,R){const a=o("Image");return e(),t("div",null,[E,y,i,u,F,d,p(a,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/43/E6/CgqCHl882IaAPsyEAABKuN5O6M4351.png"}),n(),C,A,g,q,v,h,p(a,{alt:"2.png",src:"https://s0.lgstatic.com/i/image/M00/43/E6/CgqCHl882I6APyOQAAAoyp7Lq34381.png"}),n(),B])}const S=l(r,[["render",D]]);export{k as __pageData,S as default};
