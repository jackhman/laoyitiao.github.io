import{_ as o,j as l,o as e,g as t,k as p,h as n,s,Q as r}from"./chunks/framework.e0c66c3f.js";const w=JSON.parse('{"title":"契约测试产生的背景 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/043_微服务质量保障 20 讲/(4228) 07  契约测试：如何进行消费者驱动的契约测试？.md","filePath":"posts/devops/043_微服务质量保障 20 讲/(4228) 07  契约测试：如何进行消费者驱动的契约测试？.md","lastUpdated":1696338709000}'),c={name:"posts/devops/043_微服务质量保障 20 讲/(4228) 07  契约测试：如何进行消费者驱动的契约测试？.md"},E=s("p",null,"上一课时，我讲到了微服务架构下的组件测试，它是针对单个微服务的验收测试，虽然保障了单个微服务功能的正确性，但要想保障微服务间交互功能的正确性，就需要进行契约测试。",-1),y=s("h3",{id:"契约测试产生的背景",tabindex:"-1"},[n("契约测试产生的背景 "),s("a",{class:"header-anchor",href:"#契约测试产生的背景","aria-label":'Permalink to "契约测试产生的背景"'},"​")],-1),i=s("p",null,"在介绍契约测试之前，首先来看下什么是契约。现实世界中，契约是一种书面的约定，比如租房时需要跟房东签房屋租赁合同、买房时需要签署购房合同、换工作时你要跟公司签署劳动合同等。在信息世界中，契约也有很多使用场景，像 TCP/IP 协议簇、HTTP 协议等，只是这些协议已经成为一种技术标准，我们只需要按标准方式接入就可以实现特定的功能。",-1),u=s("p",null,[n("具体到业务场景中，契约是研发人员在技术设计时达成的约定，它规定了服务提供者和服务消费者的交互内容。可见，无论是物理世界还是信息世界，"),s("strong",null,"契约是双方或多方共识的一种约定，需要协同方共同遵守。")],-1),F=s("p",null,"在微服务架构中，服务与服务之间的交互内容更需要约定好。因为一个微服务可能与其他 N 个微服务进行交互，只有对交互内容达成共识并保持功能实现上的协同，才能实现业务功能。我们来看一个极简场景，比如我们要测试服务 A 的功能，然而需要服务 A 调用服务 B 才能完成，如图：",-1),q=s("p",null,[n("服务 A 所属的研发测试团队在测试时，太难保证服务 B 是足够稳定的，而服务 B 的不稳定会导致测试服务 A 时效率下降、测试稳定性降低。因为，当服务 B 有阻塞性的缺陷或者干脆宕机时，你需要判断是环境问题还是功能缺陷导致的，这些情况在微服务的测试过程中属于常见的痛点问题。因此，为了提升测试效率和测试稳定性，我们会通过"),s("strong",null,"服务虚拟化技术"),n("来模拟外部服务，如图：")],-1),d=s("p",null,[n("需要特别注意的是，如果此时你针对内部系统的测试用例都执行通过了，可以说明你针对服务 A的测试是通过的吗？答案是否定的。因为这里面有个"),s("strong",null,"特别重要的假设是"),n("，服务虚拟化出来的Mock B 服务与真实的 B 服务是相等的。而事实是，它们可能只在你最初进行服务虚拟化时是相等的，随着时间的推移，它们很难保持相等。")],-1),C=s("p",null,"可能你会说，保持相等不就是个信息同步的工作嘛，有那么难吗？事实上，说起来容易做起来真的挺难：在实际的研发场景下，一个研发团队需要维护若干（a）个服务，每个服务又有数十（b）个接口，每个接口又被多（c）个团队的服务所调用，可见信息同步的工作量是巨大的（a*b*c）。",-1),h=s("p",null,"所以在微服务团队中，如下情况极为常见，每一项都会导致信息不同步：服务 B 的开发团队认为某次修改对服务 A 无影响，所以没告诉服务 A 的开发团队，而实际上是有影响的；服务 B 的开发团队认为某次修改对服务 A 有影响，而服务 A 的开发团队认为无影响；服务 B 的开发团队忘记把某次修改同步到服务 A 的开发团队。",-1),g=s("p",null,[n("所以，比较好的方式就是"),s("strong",null,'通过"契约"来降低服务 A 和服务 B 的依赖'),n("。具体指导原则为：")],-1),B=s("ul",null,[s("li",null,[s("p",null,'根据服务 A 和服务 B 的交互生成一份"契约"，且契约内容的变化可以及时感知到，并生成模拟服务；')]),s("li",null,[s("p",null,"将服务之间的集成测试，变成两个测试，即真实的服务 A 和模拟服务 B 之间的测试和模拟的服务 A 和真实服务 B 之间的测试。")])],-1),v=r("",33);function m(A,_,b,D,P,f){const a=l("Image");return e(),t("div",null,[E,y,i,u,F,p(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/3E/3C/CgqCHl8rwdWARQ7JAAAlzqKNM8A650.png"}),q,p(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/3E/3C/CgqCHl8rwd2AHsPJAAAqXjJCb3o139.png"}),d,p(a,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/3E/3C/CgqCHl8rweeAaDkdAABVWLFzSS8274.png"}),C,h,g,B,p(a,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/3E/31/Ciqc1F8rwi2AD_NcAABULdvxmSY140.png"}),n(),v])}const k=o(c,[["render",m]]);export{w as __pageData,k as default};
