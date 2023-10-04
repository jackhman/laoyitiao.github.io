import{_ as o,j as e,o as t,g as r,k as a,h as p,Q as l,s}from"./chunks/framework.e0c66c3f.js";const B=JSON.parse('{"title":"构建 OAuth2 授权服务器 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4771) 26  服务授权：如何基于 Spring Cloud Security 集成 OAuth2 协议？.md","filePath":"posts/backEnd/Spring Cloud 原理与实战_文档/(4771) 26  服务授权：如何基于 Spring Cloud Security 集成 OAuth2 协议？.md","lastUpdated":1696338709000}'),c={name:"posts/backEnd/Spring Cloud 原理与实战_文档/(4771) 26  服务授权：如何基于 Spring Cloud Security 集成 OAuth2 协议？.md"},E=l("",12),i=s("p",null,"密码模式示意图",-1),y=s("p",null,"请注意，授权服务器在这里执行认证操作的目的，是验证所传入的用户名和密码是否正确。在密码模式下，这一步是必须的，而如果采用其他授权模式，则不一定会有用户认证这一环节。",-1),u=s("p",null,"确定了采用密码模式之后，我们来看为了实现这一授权模式，我们需要对授权服务器做哪些开发工作。首先我们需要设置一些基础数据，包括客户端信息和用户信息。然后基于这些基础数据，就可以通过 HTTP 请求获取所需的 Token。如下所示：",-1),d=l("",24),h=s("p",null,"客户端信息设置示意图",-1),g=s("p",null,'我们在"Authorization"请求头中指定认证类型为"Basic Auth"，然后设置客户端名称和客户端安全码分别为"springhealth"和"springhealth_secret"。',-1),F=s("p",null,'接下去我们来指定针对授权模式的专用配置信息，首当其冲的是用于指定授权模式的 grant_type 属性，以及用于指定客户端访问范围的 scope 属性，这里分别设置为"password"和"webclient"。当然，既然设置了密码模式，所以也需要指定用户名和密码用于识别用户身份。这里，我们以"springhealth_user"这个用户为例进行设置，如下所示：',-1),A=l("",8);function C(v,S,D,_,q,b){const n=e("Image");return t(),r("div",null,[E,a(n,{alt:"1.png",src:"https://s0.lgstatic.com/i/image/M00/8B/01/CgqCHl_bCSOAXCQEAAF6rchmB6E579.png"}),p(),i,y,u,a(n,{alt:"Drawing 1.png",src:"https://s0.lgstatic.com/i/image/M00/89/6F/Ciqc1F_YZ5yAa21GAAA5jcj4Wlw391.png"}),p(),d,a(n,{alt:"Drawing 2.png",src:"https://s0.lgstatic.com/i/image/M00/89/7A/CgqCHl_YZ76AOxeuAABMSQ09CHU759.png"}),p(),h,g,F,a(n,{alt:"Drawing 3.png",src:"https://s0.lgstatic.com/i/image/M00/89/6F/Ciqc1F_YZ8aAQ2VVAAA9E6V7PEk267.png"}),p(),A])}const f=o(c,[["render",C]]);export{B as __pageData,f as default};
