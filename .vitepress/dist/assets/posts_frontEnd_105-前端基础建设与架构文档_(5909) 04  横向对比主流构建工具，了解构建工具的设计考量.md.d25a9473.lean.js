import{_ as l,D as t,o as e,g as r,J as o,h as a,m as s,Q as p}from"./chunks/framework.f67d7268.js";const P=JSON.parse('{"title":"04横向对比主流构建工具，了解构建工具的设计考量","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/105-前端基础建设与架构文档/(5909) 04  横向对比主流构建工具，了解构建工具的设计考量.md","filePath":"posts/frontEnd/105-前端基础建设与架构文档/(5909) 04  横向对比主流构建工具，了解构建工具的设计考量.md","lastUpdated":1696682708000}'),i={name:"posts/frontEnd/105-前端基础建设与架构文档/(5909) 04  横向对比主流构建工具，了解构建工具的设计考量.md"},c=s("h1",{id:"_04横向对比主流构建工具-了解构建工具的设计考量",tabindex:"-1"},[a("04横向对比主流构建工具，了解构建工具的设计考量 "),s("a",{class:"header-anchor",href:"#_04横向对比主流构建工具-了解构建工具的设计考量","aria-label":'Permalink to "04横向对比主流构建工具，了解构建工具的设计考量"'},"​")],-1),h=s("p",null,'现代化前端架构离不开构建工具的加持。构建工具的选择、理解和应用决定了是否能够打造一个流畅且接近完美的开发体验。这一讲，我们通过"横向对比构建工具"这个非常新颖的角度，来了解构建工具背后的架构理念。',-1),d=s("p",null,'提到构建工具，作为经验丰富的前端开发者，相信你能列举出不同时代的代表：从 Browserify + Gulp 到 Parcel，从 Webpack 到 Rollup，甚至尤雨溪最近编写的 Vite，相信你也并不陌生。没错，前端发展到现在，构建工具琳琅满目，且已经成熟稳定下来。但这些构建工具的实现和设计非常复杂，甚至出现了"面向构建工具编程"的调侃。',-1),u=s("p",null,[a("事实上，能够熟悉并精通构建工具的开发者凤毛麟角。请注意，"),s("strong",null,'这里的"熟悉并精通"并不是要求你对不同构建工具的配置项目如数家珍，而是真正能把握构建流程'),a('。在"6 个月就会出现一批新的技术潮流"的前端领域，能始终把握构建工具的奥秘------这也是区分资深架构师和程序员的一个重要标志。')],-1),g=s("p",null,"如何真正了解构建流程，甚至能够自己开发一个构建工具呢？这里我先通过横向比较不同构建工具，让你有一个整体的把控和认知，能够明白构建工具要做什么、怎么做。",-1),E=s("h3",{id:"从-tooling-report-中-我们能学到什么",tabindex:"-1"},[a("从 Tooling.Report 中，我们能学到什么 "),s("a",{class:"header-anchor",href:"#从-tooling-report-中-我们能学到什么","aria-label":'Permalink to "从 Tooling.Report 中，我们能学到什么"'},"​")],-1),_=s("p",null,[s("a",{href:"https://bundlers.tooling.report/",target:"_blank",rel:"noreferrer"},"Tooling.Report"),a(" 是由 Chrome core team 核心成员以及业内著名开发者打造的构建工具比对平台，其对应 GitHub 地址为："),s("a",{href:"https://github.com/GoogleChromeLabs/tooling.report",target:"_blank",rel:"noreferrer"},"GoogleChromeLabs tooling.report"),a("。")],-1),y=s("p",null,"这个平台对比了 Webpack v4、Rollup v2、Parcel v2、Browserify + Gulp 在不同维度下的表现，如下图所示：",-1),m=p("",9),b=p("",28),k=s("p",null,'其实对比只是一方面，更重要的是我们需要通过对比结果，去了解各构建工具需要做哪些事情？基础建设和工程化要考虑哪些事情？搞清楚这些信息，我们就能站在更高的视角，进行技术选型，审视工程化和基础建设。下一讲，我将带你深入 Vite 实现源码，来了解当下前端构建工具的"风口浪尖"。',-1),f=s("p",null,"这里也给大家留一个思考题：Tooling.Report 的跑分代码是如何实现的？欢迎在留言区和我分享你的观点。我们下一讲再见。",-1);function v(F,C,S,A,q,T){const n=t("Image");return e(),r("div",null,[c,h,d,u,o(n,{alt:"Lark20201222-144850.png",src:"https://s0.lgstatic.com/i/image2/M01/03/BB/CgpVE1_hlvWAZJNsAAVR01sbE8E875.png"}),a(),g,E,_,y,o(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image2/M01/03/A8/CgpVE1_gVd-AKiMRAAFXHtN1HLk529.png"}),a(),m,o(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/8B/D0/CgqCHl_gVeyAEgAmAAH_-9zFwV8373.png"}),a(),b,o(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/8B/C5/Ciqc1F_gVo-AS0nFAADyzXOR718143.png"}),a(),k,f])}const B=l(i,[["render",v]]);export{P as __pageData,B as default};
