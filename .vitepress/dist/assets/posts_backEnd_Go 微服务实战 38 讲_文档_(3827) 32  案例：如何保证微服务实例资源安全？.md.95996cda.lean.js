import{_ as o,j as e,o as t,g as r,k as l,h as s,Q as p,s as n}from"./chunks/framework.4e7d56ce.js";const q=JSON.parse('{"title":"整体结构 ","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/Go 微服务实战 38 讲_文档/(3827) 32  案例：如何保证微服务实例资源安全？.md","filePath":"posts/backEnd/Go 微服务实战 38 讲_文档/(3827) 32  案例：如何保证微服务实例资源安全？.md","lastUpdated":1696417798000}'),c={name:"posts/backEnd/Go 微服务实战 38 讲_文档/(3827) 32  案例：如何保证微服务实例资源安全？.md"},E=p("",5),y=n("p",null,"资源服务器中请求流程图",-1),i=n("p",null,[s("请求在进入具体的资源端点之前，会至少经过"),n("strong",null,"令牌认证拦截器"),s(" 和"),n("strong",null,"权限检查拦截器"),s("这两个拦截器，以及其他发挥重要功能的拦截器，比如限流拦截器等。令牌认证拦截器会解析请求中携带的访问令牌，请求授权服务器验证访问令牌的有效性，明确当前请求的客户端和用户信息，并把这些信息写入请求上下文中，如果访问令牌无效，将会拒绝请求，返回认证错误。权限检查拦截器会按照预设的权限规则对请求上下文中的客户端和用户信息进行权限检查，如果权限不足也会拒绝访问，返回鉴权错误。")],-1),u=n("p",null,"对此我们可以将资源服务器设计为以下几个模块，如图所示：",-1),d=p("",50);function h(F,A,g,C,k,D){const a=e("Image");return t(),r("div",null,[E,l(a,{alt:"图片11.png",src:"https://s0.lgstatic.com/i/image/M00/5F/77/Ciqc1F-JYciAXOBBAACNYK3Blio069.png"}),s(),y,i,u,l(a,{alt:"图片12.png",src:"https://s0.lgstatic.com/i/image/M00/5F/82/CgqCHl-JYdCAXd-5AACLyd4sStg095.png"}),s(),d])}const m=o(c,[["render",h]]);export{q as __pageData,m as default};
