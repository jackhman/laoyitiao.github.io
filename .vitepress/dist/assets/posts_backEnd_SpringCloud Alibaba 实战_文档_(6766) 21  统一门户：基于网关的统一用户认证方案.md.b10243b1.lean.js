import{_ as o,j as e,o as t,g as c,k as l,h as n,Q as p,s}from"./chunks/framework.4e7d56ce.js";const O=JSON.parse('{"title":"传统的用户认证方案 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/SpringCloud Alibaba 实战_文档/(6766) 21  统一门户：基于网关的统一用户认证方案.md","filePath":"posts/backEnd/SpringCloud Alibaba 实战_文档/(6766) 21  统一门户：基于网关的统一用户认证方案.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/SpringCloud Alibaba 实战_文档/(6766) 21  统一门户：基于网关的统一用户认证方案.md"},E=p("",5),y=s("p",null,"用户认证",-1),i=s("p",null,"在传统的单体单点应用时代，我们会开发用户认证的服务类，从登录界面提交的用户名密码等信息通过用户认证类进行校验，然后获取该用户对象将其保存在 Tomcat 的 Session 中，如下所示：",-1),u=s("p",null,"单点应用认证方案",-1),d=s("p",null,"随着系统流量的增高，单点应用以无法支撑业务运行，应用出现高延迟、宕机等状况，此时很多公司会将应用改为 Nginx 软负载集群，通过水平扩展提高系统的性能，于是应用架构就变成了这个样子。",-1),g=s("p",null,"Java Web 应用集群",-1),F=s("p",null,"虽然改造后系统性能显著提高，但你发现了么，因为之前用户登录的会话数据都保存在本地，当 Nginx 将请求转发到其他节点后，因为其他节点没有此会话数据，系统就会认为没有登录过，请求的业务就会被拒绝。从使用者的角度会变成一刷新页面后，系统就让我重新登录，这个使用体验非常糟糕。",-1),h=s("p",null,"我们来分析下，这个问题的根本原因在于利用 Session 本地保存用户数据会让 Java Web 应用变成有状态的，在集群环境下必须保证每一个 Tomcat 节点的会话状态一致的才不会出问题。因此基于 Redis 的分布式会话存储方案应运而生，在原有架构后端增加 Redis 服务器，将用户会话统一转存至 Redis 中，因为该会话数据是集中存储的，所以不会出现数据一致性的问题。",-1),q=s("p",null,"Redis 统一存储用户会话",-1),C=s("p",null,"但是，传统方案在互联网环境下就会遇到瓶颈，Redis 充当了会话数据源，这也意味着 Redis 承担了所有的外部压力，在互联网数以亿计的庞大用户群规模下，如果出现突发流量洪峰，Redis 能否经受考验就会成为系统的关键风险，稍有差池系统就会崩溃。",-1),J=s("p",null,"那如何解决呢？其实还有一种巧妙的设计，在用户认证成功，后用户数据不再存储在后端，而改为在客户端存储，客户端每一次发送请求时附带用户数据到 Web 应用端，Java 应用读取用户数据进行业务处理，因为用户数据分散存储在客户端中，因此并不会对后端产生额外的负担，此时认证架构会变成下面的情况。",-1),A=p("",40),b=p("",12),B=p("",8),I=s("p",null,"某个 JWT 在 3600 秒后过期",-1),m=s("ul",null,[s("li",null,"对于上面两种认证方案，还有优化的空间，比如在服务A第一次对某个 JWT 进行验签后获取用户与权限数据，那在 JWT 的有效期内便可将数据在本地内存或者 Redis 中进行缓存，这样下一次同样的 JWT 访问时直接从缓存中提取即可，可以节省大量服务间通信时间。但引入缓存后你也要时刻关注缓存与用户数据的一致性问题，是要性能还是要数据可靠，这又是一个架构师需要面对的抉择。")],-1),_=s("h3",{id:"小结与预告",tabindex:"-1"},[n("小结与预告 "),s("a",{class:"header-anchor",href:"#小结与预告","aria-label":'Permalink to "小结与预告"'},"​")],-1),v=s("p",null,"本讲咱们学习了三方面内容，首先咱们回顾了基于 Session 的有状态用户认证解决方案，其次介绍了 JWT 与 JJWT 的使用，最后讲解了利用 JWT 实现微服务架构认证的两种方案，对产生的新问题也进行了梳理。",-1),T=s("p",null,"在多年的架构生涯中，我自己也在不断感慨，架构是一门取舍的艺术，没有完美的架构，只有适合的场景，希望未来同学们可以多学习一些前沿技术，兴许随着技术发展没准鱼和熊掌真的可以兼得呢。",-1),D=s("p",null,"下一讲，咱们学习在微服务架构中，有哪些成熟的一致性方案可以为我所用。",-1);function W(k,j,S,w,f,x){const a=e("Image");return t(),c("div",null,[E,l(a,{alt:"图片1.png",src:"https://s0.lgstatic.com/i/image6/M00/38/6C/CioPOWB5OhSAKQaJABYIev3QiUE757.png"}),n(),y,i,l(a,{alt:"图片2.png",src:"https://s0.lgstatic.com/i/image6/M00/38/64/Cgp9HWB5Oh-ANQieAALBlYD72j0702.png"}),n(),u,d,l(a,{alt:"图片3.png",src:"https://s0.lgstatic.com/i/image6/M00/38/64/Cgp9HWB5OiiAUBiSAAEie5jZpD4532.png"}),n(),g,F,h,l(a,{alt:"图片4.png",src:"https://s0.lgstatic.com/i/image6/M00/38/64/Cgp9HWB5OjKAbiQDAAFw6rK2PgI811.png"}),n(),q,C,J,l(a,{alt:"图片5.png",src:"https://s0.lgstatic.com/i/image6/M00/38/6C/CioPOWB5OjyAekTuAAE_RTg-3O8505.png"}),n(),A,l(a,{alt:"图片6.png",src:"https://s0.lgstatic.com/i/image6/M00/38/6C/CioPOWB5OlCAfQy7AAJ62nTplCo660.png"}),n(),b,l(a,{alt:"图片7.png",src:"https://s0.lgstatic.com/i/image6/M00/38/64/Cgp9HWB5OlyAf4suAAJT3t1mTSg690.png"}),n(),B,l(a,{alt:"图片8.png",src:"https://s0.lgstatic.com/i/image6/M00/38/6C/CioPOWB5OmaAIYLtAAHj_0Wi_3w900.png"}),n(),I,m,_,v,T,D])}const P=o(r,[["render",W]]);export{O as __pageData,P as default};
