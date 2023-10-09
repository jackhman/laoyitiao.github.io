import{_ as o,j as e,o as t,h as r,k as p,f as a,s,Q as l}from"./chunks/framework.d3daa342.js";const es=JSON.parse('{"title":"08Jackon注解在实体里面如何应用？常见的死循环问题如何解决？","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Data JPA 原理与实战_文档/(4708) 08  Jackon 注解在实体里面如何应用？常见的死循环问题如何解决？.md","filePath":"posts/backEnd/Spring Data JPA 原理与实战_文档/(4708) 08  Jackon 注解在实体里面如何应用？常见的死循环问题如何解决？.md","lastUpdated":1696682708000}'),c={name:"posts/backEnd/Spring Data JPA 原理与实战_文档/(4708) 08  Jackon 注解在实体里面如何应用？常见的死循环问题如何解决？.md"},E=s("h1",{id:"_08jackon注解在实体里面如何应用-常见的死循环问题如何解决",tabindex:"-1"},[a("08Jackon注解在实体里面如何应用？常见的死循环问题如何解决？ "),s("a",{class:"header-anchor",href:"#_08jackon注解在实体里面如何应用-常见的死循环问题如何解决","aria-label":'Permalink to "08Jackon注解在实体里面如何应用？常见的死循环问题如何解决？"'},"​")],-1),y=s("p",null,"经过前面课时的讲解，相信你已经对实体里面的 JPA 注解有了一定的了解，但是实际工作中你会发现实体里面不仅有 JPA 的注解，也会用到很多 JSON 相关的注解。",-1),i=s("p",null,"我们用 Spring Boot 里面默认集成的 fasterxml.jackson 加以说明，这看似和 JPA 没什么关系，但是一旦我们和 @Entity 一起使用的时候，就会遇到一些问题，特别是新手同学，我们这一课时详细介绍一下用法。先来跟着我了解一下 Jackson 的基本语法。",-1),F=s("h3",{id:"jackson-基本语法",tabindex:"-1"},[a("Jackson 基本语法 "),s("a",{class:"header-anchor",href:"#jackson-基本语法","aria-label":'Permalink to "Jackson 基本语法"'},"​")],-1),u=s("p",null,"我们先看一下我们项目里面的依赖。",-1),d=l("",3),g=l("",3),A=s("p",null,[a("b."),s("strong",null,"jackson-datatype-jsr310"),a("：是对 jdk8 中的 JSR310 时间协议做了支持，如 Duration、Instant、LocalDate、Clock 等时间类型的序列化、反序列化，如下图展示的一些类：")],-1),h=s("p",null,[a("c."),s("strong",null,"jackson-datatype-hibernate5"),a("：是对Hibernate的里面的一些数据类型的序列化、反序列化，如HibernateProxy 等。")],-1),D=s("p",null,"剩下不常见的咱们就不说了，jackson-datatype 其实就是对一些常见的数据类型做序列化、反序列化，省去了我们自己写序列化、反序列化的过程。所以在我们工作中，如果需要自定义序列化的时候，可以参考这些源码。",-1),_=s("p",null,"知道了这些脉络之后，剩下的就是我们要掌握的注解有哪些了，下面我来介绍一下。",-1),C=s("h4",{id:"常用的一些注解",tabindex:"-1"},[a("常用的一些注解 "),s("a",{class:"header-anchor",href:"#常用的一些注解","aria-label":'Permalink to "常用的一些注解"'},"​")],-1),b=s("p",null,"正如上面所说，我们打开 jackson-annotations，就可以看到有哪些注解了，一目了然，闲着没事的时候就可以到这里面看看，这样你会越来越熟悉。下面我们挑选一些常用的介绍一下。",-1),m=s("p",null,"Jackson 里面常用的注解如下表格所示：",-1),j=l("",14),q=s("p",null,"而里面的MappingJackson2HttpMessageConverter 正是采用 fasterxml.jackson 进行转化的，看下面的图片。",-1),v=s("h4",{id:"应用场景二",tabindex:"-1"},[a("应用场景二 "),s("a",{class:"header-anchor",href:"#应用场景二","aria-label":'Permalink to "应用场景二"'},"​")],-1),B=s("p",null,"我们在微服务之间相互调用的时候，都会用到 HttpMessageConverter 里面的 JacksonHttpMessageConverter 进行转化。特别是在用 open-feign 里面的 Encode 和 Decode 的时候，我们就可以看到如下应用场景：",-1),T=s("h4",{id:"应用场景三",tabindex:"-1"},[a("应用场景三 "),s("a",{class:"header-anchor",href:"#应用场景三","aria-label":'Permalink to "应用场景三"'},"​")],-1),k=s("p",null,"redis、cacheable 都会用到 value 的序列化，都离不开 JSON 的序列化，看下面的 redis 里面的关键配置文件。",-1),S=s("h4",{id:"应用场景四",tabindex:"-1"},[a("应用场景四 "),s("a",{class:"header-anchor",href:"#应用场景四","aria-label":'Permalink to "应用场景四"'},"​")],-1),M=s("p",null,"当我们项目之间解耦用到消息队列的时候，可能会基于 JMS消息协议发送消息，其也是基于 JSON 的序列化机制来继续converter的，它在用JmsTemplate 的时候也会遇到同样情况，我们看一下 JMS 里面相关代码。",-1),J=s("p",null,"综上四个场景所述，我们是经常和 Entity 打交道的，而 @Entity 又要在各种场景转化成 JSONString，所以 Jackson 的原理我们还是要掌握一些的，下面来分析几个比较重要的。",-1),I=s("h3",{id:"jackson-原理分析",tabindex:"-1"},[a("Jackson 原理分析 "),s("a",{class:"header-anchor",href:"#jackson-原理分析","aria-label":'Permalink to "Jackson 原理分析"'},"​")],-1),P=s("h4",{id:"jackson-的可见性原理分析",tabindex:"-1"},[a("Jackson 的可见性原理分析 "),s("a",{class:"header-anchor",href:"#jackson-的可见性原理分析","aria-label":'Permalink to "Jackson 的可见性原理分析"'},"​")],-1),f=s("p",null,"前面我们看到了注解@JsonAutoDetect JsonAutoDetect.Visibility 类包含与 Java 中的可见性级别匹配的常量，表示 ANY、DEFAULT、NON_PRIVATE、NONE、PROTECTED_AND_PRIVATE和PUBLIC_ONLY。",-1),O=s("p",null,"那么我们打开这个类，看一下源码：",-1),N=l("",7),x=l("",4),w=s("p",null,"你也可以看一下 Jackson2HttpMessageConverter 里面的用法。",-1),L=l("",3),U=s("p",null,"可以看到里面处理各种 java 类型和泛型的情况，当我们自己写反射代码的时候可以参考这一段，或者直接调用。此外，ObjectMapper 里面还一个重要的概念就是 Moduel，我们来看下。",-1),z=s("h4",{id:"moduel-的加载机制",tabindex:"-1"},[a("Moduel 的加载机制 "),s("a",{class:"header-anchor",href:"#moduel-的加载机制","aria-label":'Permalink to "Moduel 的加载机制"'},"​")],-1),R=s("p",null,"ObejctMapper 里面可以扩展很多 datatype，而不同的 datatype 封装到了不通的 modules 里面，我们可以 register 注册进去不同的 module，从而处理不同的数据类型。",-1),V=s("p",null,[a("目前 Modules 官方网站提供了很多内容，具体你可以查看这个网址："),s("a",{href:"https://github.com/FasterXML/jackson#third-party-datatype-modules",target:"_blank",rel:"noreferrer"},"https://github.com/FasterXML/jackson#third-party-datatype-modules"),a("。这里我们重点说一下常用的加载机制。")],-1),H=s("p",null,"我们通过在代码里面设置一个断点，就可以很清楚地知道常用的 ModuleType 都有哪些，如 Jdk8、jsr310、Hibernate5 等。在MVC 里面默认的 Module 也是图上那些，Hibernate5 是我们自己引入的，具体解决什么问题和如何自定义的呢？我们接着往下看。",-1),G=s("h3",{id:"jackson-与-jpa-常见的问题",tabindex:"-1"},[a("Jackson 与 JPA 常见的问题 "),s("a",{class:"header-anchor",href:"#jackson-与-jpa-常见的问题","aria-label":'Permalink to "Jackson 与 JPA 常见的问题"'},"​")],-1),Y=s("p",null,"我们用 JPA 的时候，特别是关联关系的时候，最常见的就是死循环了，你在使用时一定要注意。",-1),K=s("h4",{id:"死循环问题如何解决",tabindex:"-1"},[a("死循环问题如何解决 "),s("a",{class:"header-anchor",href:"#死循环问题如何解决","aria-label":'Permalink to "死循环问题如何解决"'},"​")],-1),W=s("p",null,"第一种情况：我们在写 ToString 方法，特别是 JPA 的实体的时候，很容易陷入死循环，因为实体之间的关联关系配置是双向的，我们就需要 ToString 的时候把一方排除掉，如下所示：",-1),Z=l("",16),$=l("",22);function Q(X,ss,as,ns,ps,ls){const n=e("Image");return t(),r("div",null,[E,y,i,F,u,p(n,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/59/E9/Ciqc1F9y6KeAArLTAAGETKtGSS0950.png"}),a(),d,p(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/59/F4/CgqCHl9y6LCAZOFqAAGiK2TqQR8365.png"}),a(),g,p(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/59/E9/Ciqc1F9y6OaAQJiiAACgvjgT_sE264.png"}),a(),A,p(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/59/E9/Ciqc1F9y6O2AGMdBAAHAi0GnpZI902.png"}),a(),h,D,_,C,b,p(n,{alt:"Drawing 4.png",src:"https://s0.lgstatic.com/i/image/M00/59/E9/Ciqc1F9y6TiAIApWAAGnwAKoAuQ411.png"}),a(),m,p(n,{alt:"Lark20201009-105051.png",src:"https://s0.lgstatic.com/i/image/M00/5B/A6/CgqCHl9_0CiAWB2rAAL0pfxIviE487.png"}),a(),j,p(n,{alt:"Drawing 5.png",src:"https://s0.lgstatic.com/i/image/M00/59/F4/CgqCHl9y6WSAGuZoAAFNeYDzpto473.png"}),a(),q,p(n,{alt:"Drawing 6.png",src:"https://s0.lgstatic.com/i/image/M00/59/F4/CgqCHl9y6WqAER67AAIDaup89yg019.png"}),a(),v,B,p(n,{alt:"Drawing 7.png",src:"https://s0.lgstatic.com/i/image/M00/59/E9/Ciqc1F9y6XaAD3msAAKEmKvGup4502.png"}),a(),T,k,p(n,{alt:"Drawing 8.png",src:"https://s0.lgstatic.com/i/image/M00/59/F4/CgqCHl9y6X2AFrzKAAF2qLKQjhg118.png"}),a(),S,M,p(n,{alt:"Drawing 9.png",src:"https://s0.lgstatic.com/i/image/M00/59/E9/Ciqc1F9y6YKAB5RYAACd0TRs-9E100.png"}),a(),J,I,P,f,O,p(n,{alt:"Drawing 10.png",src:"https://s0.lgstatic.com/i/image/M00/59/F4/CgqCHl9y6YmAEhRpAADjSxOL7wI046.png"}),a(),N,p(n,{alt:"Drawing 11.png",src:"https://s0.lgstatic.com/i/image/M00/59/E9/Ciqc1F9y6ceAEC13AAIfyfec2VQ426.png"}),a(),x,p(n,{alt:"Drawing 12.png",src:"https://s0.lgstatic.com/i/image/M00/59/F5/CgqCHl9y6deAf6crAACm1nnSdgY500.png"}),a(),w,p(n,{alt:"Drawing 13.png",src:"https://s0.lgstatic.com/i/image/M00/59/EA/Ciqc1F9y6eCAFva6AAMGNGEyorM459.png"}),a(),L,p(n,{alt:"Drawing 14.png",src:"https://s0.lgstatic.com/i/image/M00/59/EA/Ciqc1F9y6euAKmewAAPSLO28R0s115.png"}),a(),U,z,R,V,p(n,{alt:"Drawing 15.png",src:"https://s0.lgstatic.com/i/image/M00/59/F5/CgqCHl9y6fWAOmAQAAJetYinNl4753.png"}),a(),H,G,Y,K,W,p(n,{alt:"Drawing 16.png",src:"https://s0.lgstatic.com/i/image/M00/59/F5/CgqCHl9y6f2Abh0_AABqSNxYu3A670.png"}),a(),Z,p(n,{alt:"Drawing 17.png",src:"https://s0.lgstatic.com/i/image/M00/59/EA/Ciqc1F9y6iKAE-gMAAEKYfENrs8207.png"}),a(),$])}const ts=o(c,[["render",Q]]);export{es as __pageData,ts as default};
