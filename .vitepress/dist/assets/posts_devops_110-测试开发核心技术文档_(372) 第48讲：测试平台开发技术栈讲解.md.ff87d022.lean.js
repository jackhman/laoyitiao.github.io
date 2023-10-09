import{_ as s,j as o,o as l,h as r,k as n,f as t,Q as i,s as a}from"./chunks/framework.d3daa342.js";const Q=JSON.parse('{"title":"第48讲：测试平台开发技术栈讲解","description":"","frontmatter":{},"headers":[],"relativePath":"posts/devops/110-测试开发核心技术文档/(372) 第48讲：测试平台开发技术栈讲解.md","filePath":"posts/devops/110-测试开发核心技术文档/(372) 第48讲：测试平台开发技术栈讲解.md","lastUpdated":1696682708000}'),p={name:"posts/devops/110-测试开发核心技术文档/(372) 第48讲：测试平台开发技术栈讲解.md"},c=i("",23),h=a("p",null,"这是我们公司自己开发的一个平台的案例。你可以看到这个平台有顶栏、边栏，边栏里面有菜单，右侧有具体的数据列表，加上一些快捷菜单，还包括各种导航功能。",-1),_=a("h3",{id:"后端技术架构解析",tabindex:"-1"},[t("后端技术架构解析 "),a("a",{class:"header-anchor",href:"#后端技术架构解析","aria-label":'Permalink to "后端技术架构解析"'},"​")],-1),g=a("p",null,"然后我们再来看一下后端技术架构。",-1),d=a("h4",{id:"后端开发框架",tabindex:"-1"},[t("后端开发框架 "),a("a",{class:"header-anchor",href:"#后端开发框架","aria-label":'Permalink to "后端开发框架"'},"​")],-1),u=a("p",null,"后端技术架构通常会使用两种风格的技术栈，第一种叫迷你型的 API 框架，常见的比如 Python 的 Flask 和 Java 的 Sparkjava。还有一类是大而全的框架，比如 Python 的 Django 和 Java 的 Spring Boot 全家桶。",-1),m=a("p",null,[a("strong",null,"Python Flask 框架")],-1),A=a("p",null,"我们来看一下 Python 的 Flask 框架，非常简单，只需通过这样的几行代码，你就可以创建出一个后端的 http 接口。通常有一些非常小的功能组件，我们会独立使用 Flask 来进行开发，完成这个功能，最后通过 SPA 前端页面调用这个接口就可以了。",-1),b=a("p",null,[a("strong",null,"Sparkjava 框架")],-1),q=a("p",null,"Java 里面也有一个非常便捷的功能，比如 Sparkjava ，也是几行代码就可以帮你创建出一个接口，是非常便捷的。",-1),k=a("p",null,"除了这两个框架之外，如果你的功能非常多，那你就使用 Django、Spring Boot 这种大的 Web 开发平台。",-1),S=a("h3",{id:"任务调度管理设计",tabindex:"-1"},[t("任务调度管理设计 "),a("a",{class:"header-anchor",href:"#任务调度管理设计","aria-label":'Permalink to "任务调度管理设计"'},"​")],-1),P=i("",9),D=a("p",null,"我们可以使用可视化的框架，比如，百度的 EChart、D3.js、Vega、yWorks 等各种各样的 H5 的图形渲染控件来帮我们做分析。除了每一个 UI 的绘图组件之外，还有一些通用的数据分析平台，比如 Kibana、Grafana，也可以把这些平台直接整合进来。",-1),C=a("p",null,"比如 Grafana，支持调用各种各样的数据来帮你定制报表。",-1),f=a("p",null,"这个是 Kibana，可以检索 ElasticSearch 图形的各种区别，也可以给你渲染出一些非常酷炫的数据报表。",-1),I=a("p",null,"还有允许定制的测试的进展分析、漏测分析，我们都可以基于已有的数据，汇集出这样的数据报表。",-1),E=a("p",null,"函数调用关系，我们可以使用 Neo4J 把网状数据检索出来，还包括页面跳转关系，我们都可以用 Neo4J 进行存储。",-1),x=a("h3",{id:"sonarqube-测试平台示例",tabindex:"-1"},[t("Sonarqube 测试平台示例 "),a("a",{class:"header-anchor",href:"#sonarqube-测试平台示例","aria-label":'Permalink to "Sonarqube 测试平台示例"'},"​")],-1),M=a("p",null,"我们来看一下行业里面已有的开源平台怎么使用。",-1),J=a("p",null,"比如行业里面使用的一个非常知名的平台 Sonarqube，它是一个代码审计平台。这个平台前台有一个基本的用户交互界面。后台使用的是关系数据库 MySQL，后来的版本使用了PostgreSQL（简称 PG）。它的大数据检索使用 ElasticSearch，把大量数据放在里面来进行检索，这是一个比较典型的架构。",-1),j=a("p",null,"关于测试平台开发所需要的技术栈我就讲解到这里，你可以研究一下技术栈，看一下哪些技术适合你的公司，然后进行研发。",-1);function T(v,w,H,V,y,F){const e=o("Image");return l(),r("div",null,[c,n(e,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/21/EC/CgqCHl7rIU-AfUHqAAIMxqc0U6g441.png"}),t(),h,_,g,d,u,m,n(e,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/21/E0/Ciqc1F7rIWSAbEDkAAJ9gPbZqCU673.png"}),t(),A,b,n(e,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/21/E1/Ciqc1F7rIXKAdj5aAAJud9gTe3c328.png"}),t(),q,k,S,n(e,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/21/EC/CgqCHl7rIXqAHQE_AAGAKsDd_pg380.png"}),t(),P,n(e,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/21/EC/CgqCHl7rIYiAQgk2AAIQ_HrdbcI983.png"}),t(),D,n(e,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/21/EC/CgqCHl7rIY-AO-aJAARE4YDaHDY691.png"}),t(),C,n(e,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/21/EC/CgqCHl7rIZiAE9EFAAZw_pECgxY908.png"}),t(),f,n(e,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/21/E1/Ciqc1F7rIaKAWon2AAID1W6XV0M544.png"}),t(),n(e,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image/M00/21/ED/CgqCHl7rIaiAYRzJAARn_nkkfHQ563.png"}),t(),I,n(e,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image/M00/21/E1/Ciqc1F7rIbSAfRvpAAIAmqFTz4I200.png"}),t(),E,x,n(e,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image/M00/21/ED/CgqCHl7rIbyAAO8SAAGgeLlkMKw385.png"}),t(),M,J,j])}const R=s(p,[["render",T]]);export{Q as __pageData,R as default};
