import{_ as o,j as e,o as t,g as r,k as p,h as n,Q as l,s}from"./chunks/framework.4e7d56ce.js";const T=JSON.parse('{"title":"21深挖MyBati与Spring集成底层原理","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/深入剖析 MyBatis 核心原理_文档/(6391) 21  深挖 MyBati 与 Spring 集成底层原理.md","filePath":"posts/backEnd/深入剖析 MyBatis 核心原理_文档/(6391) 21  深挖 MyBati 与 Spring 集成底层原理.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/深入剖析 MyBatis 核心原理_文档/(6391) 21  深挖 MyBati 与 Spring 集成底层原理.md"},i=l("",13),y=s("p",null,"MVC 模式示意图",-1),E=s("p",null,"在 Spring MVC 框架中，Model 层一般使用普通的 Service Bean 对象，View 层目前常用的是一些前端框架，以实现更好的渲染效果，Controller 是由 Spring MVC 特殊配置过的 Servlet，它会将用户请求分发给 Model，将响应转发给 View。",-1),g=s("p",null,"了解了 SpringMVC核心思想之后，我们再进一步分析Spring MVC 工作的核心原理。",-1),S=s("p",null,[s("strong",null,"DispatcherServlet 是 Spring MVC 中的前端控制器"),n("，也是 Spring MVC 内部非常核心的一个组件，负责 Spring MVC 请求的调度。当 Spring MVC 接收到用户的 HTTP 请求之后，会由 DispatcherServlet 进行截获，然后根据请求的 URL 初始化 WebApplicationContext（上下文信息），最后转发给业务的 Controller 进行处理。待 Controller 处理完请求之后，DispatcherServlet 会根据返回的视图名称选择具体的 View 进行渲染。")],-1),u=s("p",null,"下图展示了 Spring MVC 处理一次 HTTP 请求的完整流程：",-1),d=l("",6),F=s("p",null,"SSM 项目结构图",-1),C=s("p",null,"首先，在 IDEA 中创建一个新的 Maven Web 项目，具体选项如下图所示：",-1),h=l("",44),M=s("p",null,[n("]("),s("a",{href:"https://shenceyun.lagou.com/t/Mka",target:"_blank",rel:"noreferrer"},"https://shenceyun.lagou.com/t/Mka"),n(")")],-1),m=s("p",null,[s("strong",null,"《Java 工程师高薪训练营》")],-1),q=s("p",null,[n("实战训练+面试模拟+大厂内推，想要提升技术能力，进大厂拿高薪，"),s("a",{href:"https://shenceyun.lagou.com/t/Mka",target:"_blank",rel:"noreferrer"},"点击链接，提升自己"),n("！")],-1);function A(B,D,v,b,f,_){const a=e("Image");return t(),r("div",null,[i,p(a,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image6/M00/2D/C0/CioPOWBm42OAMsTnAAB8rm0kBPE187.png"}),n(),y,E,g,S,u,p(a,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image6/M00/2D/BF/CioPOWBm4tWAJ8Q7AADjcFqA6pg123.png"}),n(),d,p(a,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M00/2D/B7/Cgp9HWBm4oyAb_0sAAGjG5-F_08343.png"}),n(),F,C,p(a,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image6/M00/2D/BF/CioPOWBm4nqAPHJhAAZEuIjSepQ931.png"}),n(),h,p(a,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/6D/3E/CgqCHl-s60-AC0B_AAhXSgFweBY762.png"}),n(),M,m,q])}const k=o(c,[["render",A]]);export{T as __pageData,k as default};
