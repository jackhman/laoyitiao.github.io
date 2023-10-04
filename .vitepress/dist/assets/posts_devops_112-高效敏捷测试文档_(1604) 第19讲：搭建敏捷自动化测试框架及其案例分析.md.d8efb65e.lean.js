import{_ as o,j as l,o as p,g as i,k as a,h as e,Q as t,s}from"./chunks/framework.e0c66c3f.js";const N=JSON.parse('{"title":"自动化测试框架的构成 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/112-高效敏捷测试文档/(1604) 第19讲：搭建敏捷自动化测试框架及其案例分析.md","filePath":"posts/devops/112-高效敏捷测试文档/(1604) 第19讲：搭建敏捷自动化测试框架及其案例分析.md","lastUpdated":1696338709000}'),r={name:"posts/devops/112-高效敏捷测试文档/(1604) 第19讲：搭建敏捷自动化测试框架及其案例分析.md"},c=t("",13),g=t("",13),u=s("p",null,"图2 JUnit 5 架构示意图",-1),d=s("ul",null,[s("li",null,[s("p",null,[s("strong",null,"JUnit platform"),e(" ，其主要作用是在 JVM 上启动测试框架，包含一个内部的 JUnit 公共库以及用于测试引擎、配置和启动测试计划、配置测试套件的注释等公共 API，同时还支持通过控制台（Console Launcher）命令、IDE 或构建工具 Gradle、Maven（即借助 surefire-provider、gradle-plugin）等来启动测试。")])]),s("li",null,[s("p",null,[s("strong",null,"JUnit Jupiter"),e(" ，包含了 JUnit5 最新的编程模型（注释、类、方法）和扩展机制的组合（Jupiter API）和一个测试引擎（Test Engine），用于编写和执行 JUnit 5 的新测试，其中 junit-jupiter-params 为参数化测试提供支持。")])]),s("li",null,[s("p",null,[s("strong",null,"JUnit Vintage"),e(" ，一个测试引擎，允许在平台上运行老的 JUnit 3 和 JUnit 4 测试用例，从而确保必要的向后兼容性。")])])],-1),_=s("br",null,null,-1),h=s("br",null,null,-1),E=s("p",null,"通过上面这张注释列表，能感受到 JUnit 5 更强大的功能。例如，扩展机制通过 @ExtendWith 定义，简单明了。",-1),A=s("br",null,null,-1),b=s("br",null,null,-1),T=s("p",null,"可以通过 @ParameterizedTest 来定义参数化测试方法，而且还可以和其他注释组合使用，指定多个来源，包括 @ValueSource、@MethodSource、@CsvSource、@ArgumentSource 等。",-1),k=s("br",null,null,-1),m=t("",16),y=s("h3",{id:"验收测试框架-ginkgo",tabindex:"-1"},[s("strong",null,"验收测试框架 Ginkgo"),e(),s("a",{class:"header-anchor",href:"#验收测试框架-ginkgo","aria-label":'Permalink to "**验收测试框架 Ginkgo**"'},"​")],-1),S=s("p",null,"最后来分析一个验收测试的自动化测试框架，比较著名的有前面提到的 Cucumber 和 Robot Framework，今天介绍一个用 Go 语言开发的框架 Ginkgo（银杏），它对 BDD 有很好地支持，拥有自己的 DSL，包括嵌套的 Describe、Context 和 When 容器模块，BeforeEach / AfterEach、BeforeSuite / AfterSuite、It / Specify 等也一应俱全，这样就能帮助我们组织和编排测试用例了。",-1),v=s("br",null,null,-1),C=s("p",null,"先上一个例子，让你感受一下，测试用例的业务场景是多么清晰、脚本的可读性多么良好，这会大大降低脚本后期的维护成本。",-1),D=s("br",null,null,-1),I=s("br",null,null,-1),P=t("",26);function J(U,f,G,L,M,R){const n=l("Image");return p(),i("div",null,[c,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7F/F1/Cgq2xl6DS7GAVWDJAAJ0ZLP_iKQ797.png"}),g,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7F/F1/Cgq2xl6DS7KAaMCgAAOhMU05WX4203.png"}),u,d,_,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/06/DB/Ciqah16DS7OAByspAATY-yR0P7s026.png"}),h,E,A,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7F/F1/Cgq2xl6DS7SALitAAAC-g88oR88747.png"}),e(),b,T,k,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7F/F1/Cgq2xl6DS7SACmmzAAELY0rfXsQ913.png"}),e(),m,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/06/DB/Ciqah16DS7SAGHabAAI2mQSVPr0618.png"}),y,S,v,C,D,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/7F/F1/Cgq2xl6DS7SAcGZqAALGj2LPtOI090.png"}),I,a(n,{alt:"",src:"https://s0.lgstatic.com/i/image3/M01/06/DB/Ciqah16DS7WAe7w8AAJAcD6Gwnw799.png"}),P])}const q=o(r,[["render",J]]);export{N as __pageData,q as default};
