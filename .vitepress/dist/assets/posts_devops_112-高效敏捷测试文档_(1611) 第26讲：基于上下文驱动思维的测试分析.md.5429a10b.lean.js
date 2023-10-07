import{_ as i,j as n,o as a,g as _,k as e,h as s,s as t,Q as l}from"./chunks/framework.4e7d56ce.js";const v=JSON.parse('{"title":"第26讲：基于上下文驱动思维的测试分析","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(1611) 第26讲：基于上下文驱动思维的测试分析.md","filePath":"posts/devops/112-高效敏捷测试文档/(1611) 第26讲：基于上下文驱动思维的测试分析.md","lastUpdated":1696417798000}'),r={name:"posts/devops/112-高效敏捷测试文档/(1611) 第26讲：基于上下文驱动思维的测试分析.md"},c=t("h1",{id:"第26讲-基于上下文驱动思维的测试分析",tabindex:"-1"},[s("第26讲：基于上下文驱动思维的测试分析 "),t("a",{class:"header-anchor",href:"#第26讲-基于上下文驱动思维的测试分析","aria-label":'Permalink to "第26讲：基于上下文驱动思维的测试分析"'},"​")],-1),p=t("p",null,"从这一讲开始，我们就进入了第 5 部分内容的学习：敏捷测试分析与计划。在这一部分你将学到：测试需求分析、测试风险的识别、测试策略及测试计划的制定。今天先从基于上下文驱动的测试分析开始。",-1),g=t("p",null,"关于上下文驱动的测试思维，我在第 4 讲中简单介绍过，就是我们要关注项目的上下文（所处的环境、所要满足的条件），并认识到上下文是会变化的，测试策略和方法要根据上下文来制定，并根据其变化及时调整、不断优化。上下文驱动的测试思维是主要的敏捷思维方式之一，也是敏捷模式下测试分析的基础，需要专门讲一讲。",-1),h=t("h4",{id:"上下文驱动测试流派",tabindex:"-1"},[s("上下文驱动测试流派 "),t("a",{class:"header-anchor",href:"#上下文驱动测试流派","aria-label":'Permalink to "上下文驱动测试流派"'},"​")],-1),d=t("p",null,'软件测试有几个主要的流派，包括分析流派、标准流派、质量流派，敏捷测试也算一个流派，有敏捷测试的思维、敏捷测试的原则、敏捷测试的流程以及一系列敏捷测试实践，比如 UTDD、ATDD/BDD、持续测试等，另外，还有一个著名的"上下文驱动测试流派"。虽然实践它的人不是很多，如果一旦理解它，就会深受影响，对软件测试也会有崭新的理解：测试在你眼里不再是一项简单、重复的劳动，而变成了一项极具创造力的工作，并且赋予你充分的空间，以展示你的才华和技能。',-1),u=t("p",null,"上下文驱动流派最初是由 4 个人发起的，其中 Cem Kaner、James Bach 和 Bret Pettichord 在 2001 年合著了一本经典之作《软件测试经验与教训》（Lessons Learned in Software Testing）。在书里正式提出了上下文驱动流派及其 7 个原则，如图 1 所示。",-1),m=l("",8),T=t("p",null,"基于上下文驱动的启发式测试策略（Heuristic Test Strategy）侧重考虑质量标准、项目背景、产品元素等 3 个方面对于测试技术、方法、工具的影响，每个方面都包含多项因素，即各种上下文因素，并最终向用户交付满足其质量要求的产品，如图 2 所示。只有把上下文各种因素的影响搞清楚，基于上下文驱动的测试思维才能落地，下面我们就来好好分析、讨论这些上下文因素。",-1),A=t("h4",{id:"质量要求",tabindex:"-1"},[s("质量要求 "),t("a",{class:"header-anchor",href:"#质量要求","aria-label":'Permalink to "质量要求"'},"​")],-1),C=t("p",null,"软件的质量要求，从根本上说是为了引导和满足用户的需求。软件测试的目标在一定意义上说，就是为了保证软件产品质量具有较高的水平。产品的质量主要靠构建，也在很大程度上依赖于软件测试的投入以及执行的结果，所以要做好测试工作，必须认真回答下面几个问题。",-1),S=t("ul",null,[t("li",null,"软件给谁用？")],-1),f=t("p",null,"用户是谁？有天天离不开它的核心用户，也有偶尔使用的外部用户，如系统后台维护、技术支持的用户。当前的用户构成怎样？拿到的用户画像是怎样的？年龄、职业、受教育程度等是如何分布的？未来哪些人会成为新的用户？软件测试人员要站在用户角度想问题，分析、设计软件测试。下一讲，我会专门讲解作为测试人员如何培养自己的业务与用户体验分析技能。",-1),P=t("ul",null,[t("li",null,"用户对质量有什么具体要求？")],-1),V=t("p",null,"根据 ISO 25000 系列标准，软件产品质量包含 8 大质量特性------功能适应性、兼容性、可靠性、易用性、安全性、效率（性能）、可维护性和可移植性，每项质量特性还进一步分为多项子特性，如图 3 所示。",-1),B=l("",7),D=l("",4),b=l("",5);function I(q,k,N,x,J,E){const o=n("Image");return a(),_("div",null,[c,p,g,h,d,u,e(o,{alt:"1.png",src:"https://s0.lgstatic.com/i/image3/M01/04/97/CgoCgV6cVfqAE7oRAAXD1ouDR-Y855.png#pic_center"}),s(),m,e(o,{alt:"2.png",src:"https://s0.lgstatic.com/i/image3/M01/04/98/CgoCgV6cV6CAeGNZAAEG2hqn-70786.png"}),s(),T,A,C,S,f,P,V,e(o,{alt:"3.png",src:"https://s0.lgstatic.com/i/image3/M01/04/98/CgoCgV6cV--ARBGrAAF5KSCXye4895.png"}),s(),B,e(o,{alt:"4.png",src:"https://s0.lgstatic.com/i/image3/M01/8A/DD/Cgq2xl6cWFaAK5czAAK2IJ6g6p8914.png"}),s(),D,e(o,{alt:"5.png",src:"https://s0.lgstatic.com/i/image3/M01/11/C9/Ciqah16cXI2ALkYAAAKlCJpsphc025.png"}),s(),b])}const R=i(r,[["render",I]]);export{v as __pageData,R as default};
