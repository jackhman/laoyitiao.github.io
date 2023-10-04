import{_ as l,j as e,o as t,g as r,k as o,h as n,s,Q as p}from"./chunks/framework.e0c66c3f.js";const P=JSON.parse('{"title":"基础配置类 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Dubbo源码解读与实战_文档/(6102) 48  配置中心设计与实现：集中化配置 and 本地化配置，我都要（下）.md","filePath":"posts/backEnd/Dubbo源码解读与实战_文档/(6102) 48  配置中心设计与实现：集中化配置 and 本地化配置，我都要（下）.md","lastUpdated":1696338709000}'),c={name:"posts/backEnd/Dubbo源码解读与实战_文档/(6102) 48  配置中心设计与实现：集中化配置 and 本地化配置，我都要（下）.md"},E=s("p",null,[n("在上一课时，我们详细分析了 Configuration 接口以及 DynamicConfiguration 接口的实现，"),s("strong",null,"其中 DynamicConfiguration 接口实现是动态配置中心的基础"),n("。那 Dubbo 中的动态配置中心是如何启动的呢？我们将在本课时详细介绍。")],-1),i=s("h3",{id:"基础配置类",tabindex:"-1"},[n("基础配置类 "),s("a",{class:"header-anchor",href:"#基础配置类","aria-label":'Permalink to "基础配置类"'},"​")],-1),y=s("p",null,"在 DubboBootstrap 初始化的过程中，会调用 ApplicationModel.initFrameworkExts() 方法初始化所有 FrameworkExt 接口实现，继承关系如下图所示：",-1),g=p("",28),C=p("",7),f=s("p",null,"LoggingEventListener 中 onEvent 方法重载",-1),F=s("p",null,"至此，DubboBootstrap 整个初始化过程，以及该过程中与配置中心相关的逻辑就介绍完了。",-1),u=s("h3",{id:"总结",tabindex:"-1"},[n("总结 "),s("a",{class:"header-anchor",href:"#总结","aria-label":'Permalink to "总结"'},"​")],-1),d=s("p",null,"本课时我们重点介绍了 Dubbo 动态配置中心启动的核心流程，以及该流程涉及的重要组件类。",-1),m=s("p",null,"首先，我们介绍了 ConfigManager 和 Environment 这两个非常基础的配置类；然后又讲解了 DubboBootstrap 初始化动态配置中心的核心流程，以及动态配置中心启动的流程；最后，还分析了 GenericEventListener 监听器的相关内容。",-1),D=s("p",null,"关于这部分的内容，如果你有什么问题或者好的经验，欢迎你在留言区和我分享。",-1);function A(h,v,B,x,b,_){const a=e("Image");return t(),r("div",null,[E,i,y,o(a,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image2/M01/04/E5/Cip5yF_3wFOADgbQAAExvdg5FgU982.png"}),n(),g,o(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/8C/BD/CgqCHl_z0G2AfVK7AABzPAVnhNE632.png"}),n(),C,o(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/8C/BD/CgqCHl_z0HeARRBdAAF6NMV2xrI252.png"}),n(),f,F,u,d,m,D])}const S=l(c,[["render",A]]);export{P as __pageData,S as default};
