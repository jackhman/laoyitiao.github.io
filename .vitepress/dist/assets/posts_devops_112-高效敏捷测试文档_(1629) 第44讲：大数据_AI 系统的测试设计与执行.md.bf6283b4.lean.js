import{_ as a,j as o,o as s,g as n,k as e,s as i,h as r,Q as t}from"./chunks/framework.4e7d56ce.js";const q=JSON.parse('{"title":"大数据的测试 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(1629) 第44讲：大数据+AI 系统的测试设计与执行.md","filePath":"posts/devops/112-高效敏捷测试文档/(1629) 第44讲：大数据+AI 系统的测试设计与执行.md","lastUpdated":1696417798000}'),p={name:"posts/devops/112-高效敏捷测试文档/(1629) 第44讲：大数据+AI 系统的测试设计与执行.md"},_=i("p",null,'人工智能时代的到来，也意味着大量的人工智能系统需要得到测试和验证。而人工智能的测试最早可以追溯到上个世纪五十年代，即 1950 年阿兰·图灵（A.M.Turing）在那篇名垂青史的论文《计算机器与智能》（Computing Machinery and Intelligence）中第一次提出了"图灵测试"。',-1),g=i("p",null,'图灵测试就是为了验证论文所提出的"机器能够思考吗"这样的问题，假如某台机器"表现得"和一个思考的人类无法区分，这并不要求百分之百无法区分，而只要有 30% 的机会能骗过裁判，那么就认为机器能够"思考"。机器想通过图灵测试，还真不容易，直到 64 年后------2014 年在英国皇家学会举行的图灵测试大会上，聊天程序 Eugene Goostman 冒充一个 13 岁乌克兰男孩而骗过了 33% 的评委，从而"通过"了图灵测试。',-1),c=i("p",null,"人工智能发展到今天，已经接近 70 年，比软件工程的历史还长近 20 年，经历了两次浪潮和两次低谷之后进入今天的第 3 次浪潮。之所以，能进入第 3 次浪潮，完全是由于大数据的推波助澜，有了数据，才能训练出更好的模型。当然，也离不开今天发达的网络、廉价的存储能力和超强的计算能力（如 GPU）。",-1),u=i("p",null,'我们进入了一个大数据 + 人工智能的时代，所以用一讲来讨论一下大数据 + 人工智能的测试设计与执行，虽然篇幅极其有限，希望能带给你一些启发和帮助，将来若有需要，可以专门开一个"大数据+人工智能测试"专栏。',-1),d=i("h4",{id:"大数据的测试",tabindex:"-1"},[r("大数据的测试 "),i("a",{class:"header-anchor",href:"#大数据的测试","aria-label":'Permalink to "大数据的测试"'},"​")],-1),h=i("p",null,"大数据的特点，大家应该比较清楚了，经常用 4V 来表示，即数据规模大（Volume）、变化快或动态性强（Velocity）、多样性（Variety）和低价值密度（Value）。",-1),A=i("p",null,"针对大数据测试，覆盖数据采集、数据存储、数据加工等各个方面的验证，重点是在数据输入/输出、处理过程 ETL（Extract-Transform-Load、抽取-转换-加载）以及基于数据模型的业务应用等的功能测试、性能测试、可靠性测试等多种测试类型。其中基于数据模型的业务应用，一般和人工智能直接相关，将作为下一个主题讨论，主要是算法、AI 模型等的验证。",-1),T=i("p",null,"大数据的性能测试是一个重点，不仅要处理大规模的数据（数据量很大），而且数据种类多、数据变化快，这给大数据的性能测试带来时空上的挑战，特别是在 Test Oracle 上，会面临更大的挑战。因为经过大数据的处理，结果是否正确，很难设计一个明确的判定标准，但同时又和 AI 融合在一起，导致算法、模型、数据质量等问题相互容易，难以分辨。所以，算法、代码评审更有价值，在整个 ETL 处理过程中能讲清楚、解释合理，就能增加我们对质量的信心。最终是否正确，需要实践检验，包括 A/B 测试。",-1),P=t("",20),C=t("",9),m=t("",5),I=t("",6);function R(v,N,S,D,V,F){const l=o("Image");return s(),n("div",null,[_,g,c,u,d,h,A,T,e(l,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/17/3D/CgqCHl7XBoSAQtnKAAEkR-ioyms882.png"}),P,e(l,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/17/3E/CgqCHl7XBrWAe3RKAAEbfYzVyzU339.png"}),C,e(l,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/17/32/Ciqc1F7XBseAWIFdAASACjteDNM788.png"}),m,e(l,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/17/32/Ciqc1F7XBtSAP6m1AAMbsfOQHfc926.png"}),I])}const E=a(p,[["render",R]]);export{q as __pageData,E as default};
