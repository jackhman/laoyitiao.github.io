import{_ as a,j as i,o as l,g as o,k as p,Q as s,s as e,h as n}from"./chunks/framework.4e7d56ce.js";const v=JSON.parse('{"title":"改造目标 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/110-测试开发核心技术文档/(370) 第46讲：开源自动化测试框架底层代码改造.md","filePath":"posts/devops/110-测试开发核心技术文档/(370) 第46讲：开源自动化测试框架底层代码改造.md","lastUpdated":1696417798000}'),_={name:"posts/devops/110-测试开发核心技术文档/(370) 第46讲：开源自动化测试框架底层代码改造.md"},r=s("",22),u=e("p",null,"接下来是 Appium 的组件图， 比如说我要做 Android 的改造，就需要了解 Android 的组件结构，如果还要改造 iOS，也需要了解 iOS 的组件结构，如果想改造通用的功能，横跨两个平台，你可以改造 Selenium 或是 Appium 本身的功能，改造前你需要了解开源组件的定位和修改范围。",-1),c=e("p",null,"一旦定位了组件和修改范围就可以进入UIautomator-2-server 使用对应的 IDE 来完成对应代码的改造。",-1),d=e("p",null,"我们再来看第二个接口测试改造的例子，我们介绍的是 HttpRunner 框架，HttpRunner 是一个优秀的接口测试框架，它融合了行业里多种优秀的开源框架，本身最大特性是支持数据驱动与参数化。",-1),h=e("p",null,"我们看下它的设计理念，首先是基于配置、关注产出比，然后对已有的 Reqquests、Pytest 等框架进行了整合，支持 YAML 和 JSON 执行，支持录制和生成用例等等，整体功能非常强大。",-1),m=e("p",null,"要打造一款功能很强大的框架，他的改造方案是不修改 Reqquests ，在上层采用二次封装模式完成框架封装的。",-1),A=e("h3",{id:"个人能力提升",tabindex:"-1"},[n("个人能力提升 "),e("a",{class:"header-anchor",href:"#个人能力提升","aria-label":'Permalink to "个人能力提升"'},"​")],-1),g=e("p",null,"既然对开源框架的改造可以给我们的项目带来这么多的好处，那我们个人应该如何提高自己改造代码的能力呢？",-1),q=e("ul",null,[e("li",null,"深入阅读开源框架的源代码；"),e("li",null,"使用 IDE 等工具进行代码静态分析与动态分析剖析代码行为；"),e("li",null,"了解经典设计模式。")],-1),b=e("p",null,"当你掌握了代码改造的能力后，接下来需要将这种能力应用到公司的项目中，比如公司需要一些功能更强的框架，然后你就需要针对性的进行改进，找到最小成本去改造框架的方法。",-1);function f(k,x,B,D,I,P){const t=i("Image");return l(),o("div",null,[r,p(t,{alt:"111.png",src:"https://s0.lgstatic.com/i/image/M00/1C/BA/Ciqc1F7gvTeANHbbAAhVJR1D_eA693.png"}),u,c,d,p(t,{alt:"222.png",src:"https://s0.lgstatic.com/i/image/M00/1C/BA/Ciqc1F7gvUWAbGcoAAlXHFVmtDo341.png"}),h,m,A,g,q,b])}const F=a(_,[["render",f]]);export{v as __pageData,F as default};
