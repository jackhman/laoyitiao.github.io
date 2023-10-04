import{_ as p,j as o,o as e,g as t,k as n,s,h as l,Q as r}from"./chunks/framework.e0c66c3f.js";const k=JSON.parse('{"title":"Java 中的异常 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/云原生微服务架构实战精讲_文档/(1834) 第30讲：使用 Sentry 处理异常.md","filePath":"posts/backEnd/云原生微服务架构实战精讲_文档/(1834) 第30讲：使用 Sentry 处理异常.md","lastUpdated":1696338709000}'),c={name:"posts/backEnd/云原生微服务架构实战精讲_文档/(1834) 第30讲：使用 Sentry 处理异常.md"},E=s("p",null,"异常是 Java 应用中处理错误的标准方式。在捕获异常时，通常的做法是以日志的方式记录下来,可以使用第 29 课时介绍的日志聚合技术栈来处理异常。",-1),y=s("p",null,"但是异常中包含了很多与代码相关的信息，尤其是异常的堆栈信息，对错误调试很有帮助。如果只是把这些异常消息当成普通的日志消息，则没办法将其充分利用，更好的做法应该是对异常进行特殊的处理，也就是本课时会主要讲解的内容。",-1),i=s("h3",{id:"java-中的异常",tabindex:"-1"},[l("Java 中的异常 "),s("a",{class:"header-anchor",href:"#java-中的异常","aria-label":'Permalink to "Java 中的异常"'},"​")],-1),d=s("p",null,"在 Java 开发中，总是免不了与异常打交道，异常表示的是错误的情况。",-1),u=s("h4",{id:"_1-异常的类型",tabindex:"-1"},[l("1.异常的类型 "),s("a",{class:"header-anchor",href:"#_1-异常的类型","aria-label":'Permalink to "1.异常的类型"'},"​")],-1),F=s("p",null,"Java 中的异常可以分成 3 类，分别是检查异常（Checked Exception）、非检查异常（Unchecked Exception）和错误（Error）。这三种异常都是 Throwable 的子类型，类层次结构如下图所示。",-1),g=r("",47),h=s("p",null,"对于每个问题，可以查看详细信息，如下图所示。",-1),q=s("p",null,"Sentry 界面所提供的功能很强大，可以帮助开发人员快速获取相关信息。",-1),v=s("h3",{id:"总结",tabindex:"-1"},[l("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),C=s("p",null,"通过记录 Java 应用运行中产生的异常，可以方便开发人员查找问题的根源。通过本课时的学习，你可以掌握 Java 中使用异常的基本知识和相关实践细节，包括检查异常和非检查异常的使用和异常处理的原则等，还可以了解到如何使用 Sentry 来记录异常和发布相关的事件。",-1);function b(B,S,m,A,_,D){const a=o("Image");return e(),t("div",null,[E,y,i,d,u,F,n(a,{alt:"002.png",src:"https://s0.lgstatic.com/i/image/M00/27/71/CgqCHl714nqAF02gAABfHmw5Su8570.png"}),g,n(a,{alt:"sentry-list.png",src:"https://s0.lgstatic.com/i/image/M00/26/CE/CgqCHl7y-reAPzbkAADpk0eyBgI056.png"}),h,n(a,{alt:"sentry-details.png",src:"https://s0.lgstatic.com/i/image/M00/26/CE/CgqCHl7y-r-AdEmEAAHmAQ4V61I139.png"}),q,v,C])}const f=p(c,[["render",b]]);export{k as __pageData,f as default};
