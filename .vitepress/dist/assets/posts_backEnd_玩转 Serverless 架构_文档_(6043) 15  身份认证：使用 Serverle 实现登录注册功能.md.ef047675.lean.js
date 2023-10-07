import{_ as o,j as e,o as c,g as t,k as p,h as n,Q as l,s}from"./chunks/framework.4e7d56ce.js";const f=JSON.parse('{"title":"15身份认证：使用Serverle实现登录注册功能","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/玩转 Serverless 架构_文档/(6043) 15  身份认证：使用 Serverle 实现登录注册功能.md","filePath":"posts/backEnd/玩转 Serverless 架构_文档/(6043) 15  身份认证：使用 Serverle 实现登录注册功能.md","lastUpdated":1696417798000}'),r={name:"posts/backEnd/玩转 Serverless 架构_文档/(6043) 15  身份认证：使用 Serverle 实现登录注册功能.md"},E=l("",11),y=s("p",null,"Cookie-Session 身份认证流程",-1),i=s("p",null,"这种方案存在两个主要问题：",-1),F=s("ul",null,[s("li",null,[s("p",null,"服务端的 Session ID 是直接存储在内存中的，在分布式系统中无法共享登录状态；")]),s("li",null,[s("p",null,"cookie 是浏览器的功能，手机 App 等客户端并不支持 cookie，所以该方案不适用于非浏览器的应用。")])],-1),u=s("p",null,[n("第一个问题也是 Cookie-Session 方案应用于 Serverless 架构的主要问题，因为 Serverless 应用是无状态的，内存中的数据用完即销毁，多个请求间无法共享 Session。"),s("strong",null,"解决该问题也比较容易，"),n(" 就是用一个共享存储来保存 Session 信息，最常见的就是 Redis，因为 Redis 是一个内存数据库，读写速度很快。")],-1),d=s("p",null,"于是 Cookie-Session 的身份认证方案就发生了变化：",-1),h=l("",6),C=l("",58),A=s("p",null,"当然了，除了自己实现应用的身份认证，你也可以使用第三方的身份认证服务，比如 AWS Cognito、Google Firebase 等，基于它们，你就不用自己开发用户管理及身份认证功能了。",-1),g=s("p",null,"关于这一讲，我想强调这样几点：",-1),D=s("ul",null,[s("li",null,[s("p",null,"Cookie-Session 的身份认证方式，是在服务端存储 Session 信息，客户端（浏览器）通过 cookie 存储 Session ID；")]),s("li",null,[s("p",null,"JWT 的身份认证方式，是在服务端根据用户信息生成 token，客户端保存 token；")]),s("li",null,[s("p",null,"Cookie-Session 的认证方案通常是有状态的，对于分布式、无状态的应用，需要将 Session 保存在共享存储中；")]),s("li",null,[s("p",null,"JWT 的认证方式通常是无状态的，所以比较适合 Serverless 应用。")])],-1),v=s("p",null,"最后，希望通过今天的学习，你能深入了解 Serverless 应用的身份认证，今天留给你的作业就是：亲自动手实现一个 Serverless 的登录注册应用，我们下一讲见。",-1);function q(m,k,b,B,S,T){const a=e("Image");return c(),t("div",null,[E,p(a,{alt:"Drawing 0.png",src:"https://s0.lgstatic.com/i/image/M00/94/3B/Ciqc1GAXxNGAVJ2eAAHjY3afYhk253.png"}),n(),y,i,F,u,d,p(a,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/94/3B/Ciqc1GAXxOKAJBiFAALzfxQb7r8244.png"}),n(),h,p(a,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/94/46/CgqCHmAXxOyAImLQAAHmAyEZuFk591.png"}),n(),C,p(a,{alt:"玩转 Serverless 架构15金句.png",src:"https://s0.lgstatic.com/i/image6/M01/04/32/CioPOWAj2_2AUoDKAAEU4YVNqFA780.png"}),n(),A,g,D,v])}const j=o(r,[["render",q]]);export{f as __pageData,j as default};
