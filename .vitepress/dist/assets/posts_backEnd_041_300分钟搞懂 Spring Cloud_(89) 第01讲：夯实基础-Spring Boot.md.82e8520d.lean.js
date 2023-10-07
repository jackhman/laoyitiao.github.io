import{_ as e,j as l,o as a,g as p,k as r,h as o,Q as n,s as t}from"./chunks/framework.4e7d56ce.js";const ao=JSON.parse('{"title":"第01讲：夯实基础-SpringBoot","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/041_300分钟搞懂 Spring Cloud/(89) 第01讲：夯实基础-Spring Boot.md","filePath":"posts/backEnd/041_300分钟搞懂 Spring Cloud/(89) 第01讲：夯实基础-Spring Boot.md","lastUpdated":1696417798000}'),s={name:"posts/backEnd/041_300分钟搞懂 Spring Cloud/(89) 第01讲：夯实基础-Spring Boot.md"},g=n("",24),c=t("p",null,"进入页面后，你可以选择即将创建项目的类型是 Maven 或是 Gradle, 以及开发语言，Spring Boot 版本，依赖的 Starter 等信息，最后生成项目，下载到本地，然后导入开发工具中。",-1),_=t("p",null,"如果你不想在官方提供的网站中创建项目，也可以在开发工具中创建项目，下面我们搭建一个 Spring Boot 的 Web 后端服务。",-1),h=t("p",null,"首先，我们需要通过脚手架创建一个 Spring Boot 项目并导入开发工具中，这里使用的是 STS, 当然你也可以选择自己熟悉的工具，比如 IDEA。",-1),u=t("p",null,"这里事先创建好了一个 Spring Boot 项目，然后将项目导入了开发工具 STS 中。查看项目的 pom.xml 文件，parent 节点配置了 Spring Boot 的信息，指定了版本为 2.1.6.RELEASE，并且依赖了 spring-boot-starter-web。",-1),d=t("p",null,"第二步，需要对项目进行配置，配置都在 application.properties 中进行添加，配置 Tomcat 的端口信息，令 server.port=8082，也可以不用配置，默认是 8080 端口。",-1),S=t("p",null,"第三步，需要编写 RestController，开发业务接口，这里简单以 hello 接口为例，然后返回一个字符串。",-1),B=t("p",null,[o("第四步，在 Spring Boot 中只需要执行启动类中的 Main 方法启动项目即可，启动后可以看到控制台输出 Tomcat started on port，显示当前服务的端口号，在浏览器中访问 "),t("a",{href:"http://localhost:8082/hello%EF%BC%8C%E5%B0%B1%E5%8F%AF%E4%BB%A5%E7%9C%8B%E5%88%B0%E6%88%91%E4%BB%AC%E5%9C%A8%E6%8E%A5%E5%8F%A3%E4%B8%AD%E8%BF%94%E5%9B%9E%E7%9A%84%E5%86%85%E5%AE%B9%E4%BA%86%E3%80%82",target:"_blank",rel:"noreferrer"},"http://localhost:8082/hello，就可以看到我们在接口中返回的内容了。")],-1),m=t("h3",{id:"spring-boot-编译打包",tabindex:"-1"},[o("Spring Boot 编译打包 "),t("a",{class:"header-anchor",href:"#spring-boot-编译打包","aria-label":'Permalink to "Spring Boot 编译打包"'},"​")],-1),b=t("p",null,"通过上面这个简单的示列，相信你一定体会到了 Spring Boot 的简便性，不要着急，我们继续来学习 Spring Boot 的其他功能，相信你一定会对 Spring Boot 这个框架爱不释手。",-1),A=t("br",null,null,-1),C=t("p",null,"对 Spring Boot 项目进行打包，首先需要配置一个 spring-boot-maven-plugin 打包插件，在 configuration 节点中添加 mainClass 节点，指定程序的启动类。",-1),f=t("br",null,null,-1),E=t("p",null,"配置完成后就可以通过 Maven 的命令进行编译打包了，最简单的方式是直接用开发工具自带的 Maven 插件进行编译，选中项目，单击右键，可以看到 Run As 菜单，选中 Maven Build 选项，输入编译的命令 clean package，编译后，进入项目源码的 target 目录，可以看到打包好了的可执行的 jar 包，部署的时候直接用这个 jar 部署启动即可。",-1),M=t("br",null,null,-1),P=t("p",null,"这里需要注意，在开发工具中只是给大家演示 Spring Boot 的打包过程，在公司中都有专门的部署平台来负责拉代码，编译，打包，最后发布到对应的机器上。",-1),T=t("h3",{id:"spring-boot配置管理",tabindex:"-1"},[o("Spring Boot配置管理 "),t("a",{class:"header-anchor",href:"#spring-boot配置管理","aria-label":'Permalink to "Spring Boot配置管理"'},"​")],-1),v=t("p",null,"在实际工作中我们无法避免如何区分多环境的问题，开发环境连接的是开发环境的数据库，测试环境连接的是测试环境的数据库，等等，不同环境下的配置信息是不一样的。如果我们只有一个配置文件，意味着每次在发布前都需要手动修改配置文件为当前发布环境，这样非常不方便，而且也很容易出错。",-1),V=t("br",null,null,-1),q=t("p",null,"而在 Spring Boot 中解决这个问题非常简单，我们可以为每个环境定义一个配置文件，最后通过 spring.profiles.active 来激活对应的配置文件。",-1),k=t("br",null,null,-1),H=t("p",null,"首先在 resources 目录下创建一个 application-dev.properties，配置 server.port=8082。",-1),I=t("br",null,null,-1),x=t("p",null,"然后再创建一个 application-test.properties，配置 server.port=8083，现在相当于有 dev 和 test 两个环境的配置。",-1),U=t("br",null,null,-1),D=n("",8),y=t("p",null,"Environment 用于管理当前的应用环境信息，定义了获取 Profile 的方法，同时继承了 PropertyResolver，PropertyResolver 提供了属性访问的相关方法。",-1),F=t("br",null,null,-1),G=t("p",null,"所以我们通过 Environment 的 getProperty() 方法读取指定配置 Key 的内容。",-1),R=t("br",null,null,-1),N=t("p",null,"在 Controller 中注入 Environment 的实例，通过 getProperty 就可以获取对应的 Key 的属性值。",-1),J=t("p",null,"第二种方式：@Value注解。",-1),O=t("br",null,null,-1),w=t("p",null,"在注解中指定配置 Key，直接可以将属性值注入到该字段中。",-1),W=t("br",null,null,-1),j=t("p",null,"在 Controller 中定义一个 port 字段，在 port 上使用 @Value 注入当前项目的端口值，冒号后面是在无值的情况下给的默认值，避免没配置值的报错问题。",-1),K=t("br",null,null,-1),Q=t("p",null,"第三种方式：@ConfigurationProperties。",-1),L=t("br",null,null,-1),X=t("p",null,"前面我们讲解了通过 Environment 和 @Value 注解的方式来读取配置文件中的属性值，这两种方式都是对单独的属性进行读取，使用的时候也都是散落在各个类中，然后很多场景下，我们需要有一组配置，都是服务于某个功能或者业务的，比如数据源的配置：spring.datasource.url、spring.datasource.username，这些配置我们希望能够集中管理和使用，这个时候可以使用 @ConfigurationProperties 注解将属性值注入到实体类中。",-1),Y=t("p",null,'这里定义了一个 User 的实体类，并定义了 name 字段和对应的 get、set 方法，在类上添加 @Configuration 和 @ConfigurationProperties(prefix="spring") 注解，并指定前缀为 spring。',-1),Z=t("p",null,"然后在配置文件中填加 spring.name 的配置，spring.name 将会自动注入 User 实体中，由于 User 类添加了 @Configuration 注解，我们在使用时可以直接通过 @Autowired 进行注入，然后就可以访问 User 类的 getName 方法获取 name 的值了。",-1),z=t("br",null,null,-1),$=n("",8),tt=t("p",null,"首先我们需要创建一个 springboot-starter-demo 的 Spring Boot 项目，并依赖 spring-boot-starter-web，lombok 是用来简化 get、set 方法的类库，需要在开发工具中安装插件，spring-boot-configuration-processor 这个是专门配合@ConfigurationProperties 注解来使用的。",-1),ot=t("p",null,"接着编写配置类，也就是自定义的 Starter 需要的配置信息，直接使用 @ConfigurationProperties 来注入配置信息。",-1),it=t("p",null,"配置完信息后，就需要开始进行自动装配工作了，新建一个 UserAutoConfigure 类，用于装配 UserClient，类上添加 @EnableConfigurationProperties 注解，作用是启用 @ConfigurationProperties 注解的类，否则无法读取到配置信息。",-1),rt=t("p",null,"通过 @Bean 注解构建一个 UserClient，将配置信息通过 UserClient 的构造函数传入。",-1),nt=t("p",null,"UserClient 中定义了一个 getName 方法，用于读取配置中的值。",-1),et=t("br",null,null,-1),lt=t("p",null,"接下来需要让自动装配的类生效，很多 Starter 只要在 pom.xml 中依赖了，项目启动的时候就会自动装配，这是因为在项目的 resource 下的 META-INF 目录中有一个 spring.factories 文件，里面指定了需要被装配的类。",-1),at=t("br",null,null,-1),pt=t("p",null,"我们也需要创建一个 spring.factories，里面指定我们的装配类 UserAutoConfigure。",-1),st=t("br",null,null,-1),gt=t("br",null,null,-1),ct=t("p",null,"配置提示不是必须的，为了让使用体验更好，最好是编写一个 spring-configuration-metadata.json 文件，这样使用时就知道你的 Starter 有哪些配置，以及配置项的含义和默认值了。",-1),_t=t("p",null,"提示文件内容的格式也很简单，就是一个 json 数据，properties 中配置每个属性的信息，name 表示属性的名称，type 表示属性的数据类型，defaultValue 表示默认值。",-1),ht=t("br",null,null,-1),ut=t("p",null,"如果你不知道怎么编写，或者想知道其他更多的提示内容编写方式，可以通过查看 Spring Boot 自带的配置来参考编写。我们找到项目中 spring-boot-autoconfigure 这个 jar, 找到 spring-configuration-metadata.json 文件，可以看到里面定义了很多配置属性的提示信息。",-1),dt=t("br",null,null,-1),St=t("p",null,"最后一步，我们需要在使用的项目中加入我们自定义的 Starter 的依赖，然后在配置文件中增加配置 spring.user.name，这样就完成了整个流程。",-1),Bt=t("br",null,null,-1),mt=t("p",null,"项目在启动的时候会自动构建 UserClient，我们可以编写一个 Controller 来验证一下效果，在 Controller 中可以直接注入 UserClient，然后调用 getName 方法，这个方法返回的就是我们刚刚配置的值。就相当于你只依赖了一个 Starter，然后加了一些配置，就可以直接使用 UserClient，关于 UserClient 怎么构建的你不需要关心，逻辑都封装在 Starter 内部，降低了使用难度。",-1),bt=t("br",null,null,-1),At=t("p",null,"在某些场景下，我们的 Starter 不需要被依赖就开启自动装配，而是需要使用者进行手动的开启，为了满足这个需求，我们需要去掉 spring.factories，大部分手动开启都是通过在启动类上加一个注解来开启某个功能，我们同样也可以定义一个开启 UserClient 的注解 @EnableUserClient。",-1),Ct=t("p",null,"最核心的点在于使用了 @Import 注解来导入我们的自动配置类，这样只有使用者在启动类上增加了 @EnableUserClient 注解，然后通过 @Import 导入自动配置类，开启自动装配工作。",-1),ft=t("br",null,null,-1),Et=n("",11),Mt=t("p",null,"下面我们将 actuator 整合到 Spring Boot 中，整合的过程非常简单，这就是 Spring Boot 自带的魅力，只需要在项目的 pom.xml 文件中增加 spring-boot-starter-actuator 的依赖就可以将 actuator 整合到 Spring Boot 项目中。",-1),Pt=t("br",null,null,-1),Tt=t("p",null,"然后我们启动下项目, 访问 actuator/health 这个端点，可以看到返回了 status为UP，证明当前健康状态是正常的，如果 status 为 DOWN 那就是不健康的状态。",-1),vt=t("br",null,null,-1),Vt=t("p",null,"Spring Boot actuator 中内置了很多 Endpoint，也就是端点信息，刚刚访问的 health 就是一个端点。这里列举了几个常用的端点信息：",-1),qt=t("p",null,"/actuator/health 查看应用健康指标，health 端点能够及时反馈出当前应用的监控状态，health的值默认是当前磁盘的使用情况，同时也支持对很对框架的健康状态反馈。",-1),kt=t("br",null,null,-1),Ht=t("p",null,"讲到这里想必大家都应该清楚了 health 端点的原理，当我们需要在自己的项目中结合业务本身做一些健康监控时，可以实现自己的 HealthIndicator。",-1),It=t("p",null,"Spring Boot 中集成的框架基本上都有自己的 HealthIndicator，在这些框架出问题后，/health 能够及时反馈健康信息，这也是前面我们提到自定义接口返回固定的内容来做检测所欠缺的部分。",-1),xt=t("br",null,null,-1),Ut=t("p",null,"如果我们需要加入一些其他的判断来决定应用的监控状态时，可以继承 AbstractHealthIndicator 类，实现自己的 HealthIndicator。具体需要实现 doHealthCheck 方法，在 doHealthCheck 中进行健康状态的判断，健康状态使用 builder.up() 表示，不健康使用 builder.down() 方法表示，未知的状态使用 builder.unknown() 方法表示，应用已停止服务使用 builder.outOfService() 方法表示。",-1),Dt=t("br",null,null,-1),yt=t("p",null,"如果需要展示详细的信息，可以使用 withDetail 方法来添加详细信息，这样在访问 /health 端点时就可以显示这些详细信息了，前提是需要打开这个详情展示的功能，默认是关闭的，我们可以通过配置management.endpoint.health.show-details=ALWAYS 开启。",-1),Ft=t("br",null,null,-1),Gt=t("p",null,"自定义完成后，我们启动项目，访问一下actuator/health端点，可以看到自定义的信息。",-1),Rt=t("p",null,"/actuator/beans 查看 bean 及其关系列表，其他的端点也是一样的访问方式，不做过多讲解。更多端点的信息请参考官方文档。",-1),Nt=t("br",null,null,-1),Jt=t("p",null,"需要注意的是 Spring Boot1 版本和 Spring Boot2 版本对 actuator 的访问路径和默认暴露都不太一样，我们这里是 Spring Boot2 的版本，所有开放的端点的路径都以 /actuator 开头，默认很多端点是不开放的，我们可以通过配置 management.endpoints.web.exposure.include=* 暴露全部的端点。",-1),Ot=t("p",null,"上面这些端点都是actuator中内置的，在实际工作中，你会有自定义端点的需求，比如说你封装了某个框架，这个时候你需要有检查这个框架健康的端点，健康检查我们可以扩展已有的 /health 端点来实现。除了健康检查，你可能还需要一个能够展示框架内部一些信息的端点。",-1),wt=t("br",null,null,-1),Wt=n("",8),jt=t("p",null,"接下来体验一下 Spring Boot Admin，首先我们需要创建一个 Spring Boot 项目，我这里创建了一个 Spring Boot Admin 的项目，然后在 pom 中加入 spring-boot-admin-starter-server",-1),Kt=t("p",null,"的依赖。然后创建一个启动类，在启动类上增加 @EnableAdminServer 的注解，启用 Spring Boot Admin Server。",-1),Qt=t("p",null,[o("启动项目后，访问 "),t("a",{href:"http://localhost:8080",target:"_blank",rel:"noreferrer"},"http://localhost:8080"),o("，这就是 Spring Boot Admin 的主页面，目前没有服务注册上来。")],-1),Lt=t("br",null,null,-1),Xt=t("p",null,[o("刚刚介绍的时候有讲过，Spring Boot 项目需要集成 Spring Boot Admin Client 向 Spring Boot Admin Server 进行注册，那我们就在项目中增加 spring-boot-admin-starter-client 的依赖，光增加依赖可不行，需要用户必须得知道注册到哪里去了，所以我们需要在配置文件中指定 Spring Boot Admin Server 的地址才行，配置为 spring.boot.admin.client.url="),t("a",{href:"http://localhost:8080",target:"_blank",rel:"noreferrer"},"http://localhost:8080")],-1),Yt=t("br",null,null,-1),Zt=n("",22),zt=t("p",null,"在这一课时我们主要巩固了 Spring Boot 的基础知识，主要包括 Spring Boot 的基础介绍，解决的问题，以及亮点和常用的 Starter 包，并手把手的带你创建了 Spring Boot 项目，并学会了打包编译和配置管理，还自定义了 Spring Boot Starter 包，添加了自定义的 Spring Boot actuator 监控，并学习了使用了开源的 Spring Boot Admin Web 项目，了解了 Spring Boot 的常用功能点。",-1);function $t(to,oo,io,ro,no,eo){const i=l("Image");return a(),p("div",null,[g,r(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/B8/CgoB5l16CcGASwhHAACb19MWf5Y813.png"}),o(),c,_,r(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/C0/CgoB5l16F5CANbFZAMhzV5onKV0396.gif"}),o(),h,u,r(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/C0/CgoB5l16F7yAfj3KAINssw4qZtI832.gif"}),o(),d,r(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/E0/CgotOV16F8KAMXJ_AGVdCQqkM-0530.gif"}),o(),S,r(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/C0/CgoB5l16F-iASQEGAQ-_KSlfEgg265.gif"}),o(),B,m,b,A,C,f,r(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/C3/CgoB5l16IDyAJGK5ADq0_nQL4t8907.gif"}),o(),E,M,P,T,v,V,q,k,r(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/E0/CgotOV16GBaAGEOiAH_Dc2S7jJ0705.gif"}),o(),H,I,r(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/C0/CgoB5l16GBeAVp78AIMD4WizaMw065.gif"}),o(),x,U,r(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/C3/CgoB5l16HdGAEcguADyOblBXdxk142.gif"}),o(),D,r(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/E0/CgotOV16GGiADV0UANCdt_kBzKo893.gif"}),o(),y,F,G,R,N,J,O,r(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/C0/CgoB5l16GHiAP27rAMoepDQ1FXI596.gif"}),o(),w,W,j,K,r(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/C3/CgoB5l16HeyABtn8AE5Ic7f5ZlA175.gif"}),o(),Q,L,X,r(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/C0/CgoB5l16GHyAHUb1ANhD9ySCkrI105.gif"}),o(),Y,Z,z,r(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/E0/CgotOV16GIaAIfPXACGjQ0529lk579.gif"}),o(),$,r(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/E3/CgotOV16HfaAI3bcAGA3upBSYqM629.gif"}),o(),tt,ot,r(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/E5/CgotOV16JqeAV7NkAClhxNljPA4771.gif"}),o(),it,rt,nt,et,r(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/C3/CgoB5l16Hp-AZy8aAGR-zCc9Gc8937.gif"}),o(),lt,at,pt,st,gt,ct,_t,ht,r(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/C3/CgoB5l16HtiAEZE3AC6E2sTHc-4083.gif"}),o(),ut,dt,r(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/E3/CgotOV16HvWAUv8UAFBYdAsnN2Y247.gif"}),o(),St,Bt,r(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/C3/CgoB5l16HwWAURJJAEi-bnY39_0581.gif"}),o(),mt,bt,r(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/E3/CgotOV16HweAcDlpAF9VpJeeMRQ119.gif"}),o(),At,Ct,ft,r(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/E3/CgotOV16HwKALWE1AHNGVxBJkVI623.gif"}),o(),Et,r(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/C3/CgoB5l16HxWAXRe-ACFqVH78k3Y399.gif"}),o(),Mt,Pt,r(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/E2/CgotOV16HAOARrhIAI1UMPi_4Kc713.gif"}),o(),Tt,vt,Vt,qt,kt,Ht,It,xt,r(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/E3/CgotOV16HzeAS0fdADQaFXwau68863.gif"}),o(),Ut,Dt,r(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/C2/CgoB5l16G9uAbVYEAHy-CeWcRWg801.gif"}),o(),yt,Ft,r(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/E2/CgotOV16G-CAfpHfAFvvUPKrgJE402.gif"}),o(),Gt,Rt,Nt,r(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/C3/CgoB5l16H0KAXtw_AD9Zu3LQPW8808.gif"}),o(),Jt,Ot,wt,r(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/C3/CgoB5l16H0iAVqguADsKdZyzlXg815.gif"}),o(),Wt,r(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/E3/CgotOV16H1GAWLFkAEFaRNGGwc8148.gif"}),o(),jt,Kt,Qt,Lt,r(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/C3/CgoB5l16H1OAAdE6ADSt7V6hKic032.gif"}),o(),Xt,Yt,r(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/C2/CgoB5l16G1mASUWEAF93SfdZYCk697.gif"}),o(),Zt,r(i,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/8B/C5/CgoB5l16KS-AaroPAAM--cSCVG0340.png"}),o(),zt])}const po=e(s,[["render",$t]]);export{ao as __pageData,po as default};
