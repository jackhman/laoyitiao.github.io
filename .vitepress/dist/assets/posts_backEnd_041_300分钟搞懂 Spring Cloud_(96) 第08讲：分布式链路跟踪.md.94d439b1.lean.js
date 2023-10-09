import{_ as p,j as l,o as n,h as o,k as r,f as a,Q as i,s as e}from"./chunks/framework.d3daa342.js";const P=JSON.parse('{"title":"第08讲：分布式链路跟踪","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/041_300分钟搞懂 Spring Cloud/(96) 第08讲：分布式链路跟踪.md","filePath":"posts/backEnd/041_300分钟搞懂 Spring Cloud/(96) 第08讲：分布式链路跟踪.md","lastUpdated":1696682708000}'),s={name:"posts/backEnd/041_300分钟搞懂 Spring Cloud/(96) 第08讲：分布式链路跟踪.md"},c=i("",12),h=i("",21),u=i("",13),S=i("",26),d=e("p",null,"我们先将 Spring Cloud Sleuth 集成到项目中，还是之前的步骤，先要增加 Maven 依赖 spring-cloud-starter-sleuth。所有项目中都需要增加，比如我们这边有三个服务，网关、文章、用户。",-1),_=e("p",null,"在网关的过滤器中进行日志输出，在文章服务的接口中也进行日志输出，文章服务中会调用用户服务接口，在用户服务接口里也会输出日志。",-1),g=e("p",null,"分别启动三个服务，通过网关访问文章服务的接口，这样三个服务的日志都会输出，我们可以看到在日志信息中增加了一些额外的信息，也就是 INFO 后面中括号里的内容。",-1),T=e("h6",{id:"使用-zipkin-展示链路跟踪数据",tabindex:"-1"},[a("使用 Zipkin 展示链路跟踪数据 "),e("a",{class:"header-anchor",href:"#使用-zipkin-展示链路跟踪数据","aria-label":'Permalink to "使用 Zipkin 展示链路跟踪数据"'},"​")],-1),b=e("p",null,[a("Zipkin 的部署非常简单，将 Zipkin Server 的 jar 包下载到本地，然后通过 java -jar 命令启动就可以了。更多部署方式可以参考官方文档："),e("a",{href:"https://zipkin.io/pages/quickstart.html",target:"_blank",rel:"noreferrer"},"https://zipkin.io/pages/quickstart.html")],-1),C=i("",34);function k(I,A,m,R,q,x){const t=l("Image");return n(),o("div",null,[c,r(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/AA/56/CgotOV3TXSmAClJKAAGdgZ3eA9U538.png"}),a(),h,r(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/AA/36/CgoB5l3TXSqAAotuAARIqATiaa4975.png"}),a(),u,r(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/AA/56/CgotOV3TXSqAJOtrAAFNEaemXPk128.png"}),a(),S,r(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/AA/36/CgoB5l3TXSuAJtylAB7oLXdZLaQ101.gif"}),a(),d,r(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/AA/56/CgotOV3TXS2AY3HtADWu7OWUIKk284.gif"}),a(),_,g,T,b,r(t,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/AA/36/CgoB5l3TXS2AJvfvADC2b2_Bh14854.gif"}),a(),C])}const Z=p(s,[["render",k]]);export{P as __pageData,Z as default};
